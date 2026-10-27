
export const trivyErrorGuide = {
  title: "Trivy Errors — Real-World Production Troubleshooting",
  filePath: "app/troubleshooting-center/security/TrivyError.ts",
  category: "Security",
  difficulty: "Advanced",
  estimatedTime: "90–150 minutes",

  tags: [
    "Trivy",
    "Container Security",
    "Vulnerability Scanning",
    "SBOM",
    "CI/CD",
    "Registry Authentication",
    "Secrets Scanning",
    "IaC Scanning",
    "Kubernetes",
    "Supply Chain Security",
    "DevSecOps",
  ],

  overview: {
    summary:
      "A production-focused runbook for diagnosing Trivy scanner failures, vulnerability findings, image and registry problems, database download errors, cache conflicts, CI/CD security gate failures, secret and misconfiguration findings, SBOM generation issues, and deployment policy problems.",
    objectives: [
      "Distinguish scanner execution errors from genuine security findings.",
      "Identify whether the failure comes from the image, registry, runner, network, scanner version, vulnerability database, cache, or policy.",
      "Collect reproducible evidence without exposing credentials or secrets.",
      "Diagnose image reference, digest, platform, and registry authentication problems.",
      "Investigate vulnerability DB download failures, TLS errors, rate limits, timeouts, and disk exhaustion.",
      "Understand severity filtering, exit codes, ignored findings, and false-positive investigations.",
      "Scan container images, source files, infrastructure configuration, secrets, and SBOMs using the appropriate Trivy command.",
      "Recover without silently bypassing security gates.",
      "Prevent recurring failures through CI validation, monitoring, policy ownership, and incident reviews.",
    ],
  },

  productionIncident: {
    scenario:
      "A production deployment pipeline that previously passed now fails during the Trivy stage. Some runs report a database download error; others report CRITICAL vulnerabilities or cannot access the private container registry. Developers report that the same image worked yesterday.",
    symptoms: [
      "FATAL failed to download vulnerability DB.",
      "DENIED while pulling a Trivy database or private container image.",
      "UNAUTHORIZED or MANIFEST_UNKNOWN from a registry.",
      "Cannot connect to Docker daemon or another container runtime.",
      "context deadline exceeded during scanning.",
      "No space left on device while analyzing image layers.",
      "cache may be in use by another process.",
      "A scan passes locally but fails in CI.",
      "The same tag produces different findings on different days.",
      "A pipeline reports vulnerabilities and blocks deployment.",
      "The scanner produces an empty or unexpectedly small report.",
      "A secret or infrastructure misconfiguration finding appears in source code.",
    ],
    businessImpact: [
      "Production release is delayed or blocked.",
      "Security findings may be introduced into a deployable image.",
      "A scanner infrastructure outage can stop otherwise healthy builds.",
      "Stale vulnerability data can reduce confidence in scan results.",
      "A misconfigured exception can allow a real vulnerability to reach production.",
      "Incorrectly disabling the scanner can create an audit or compliance gap.",
    ],
    severity: {
      SEV1:
        "Suspected credential compromise, confirmed exploitation, malicious image, or critical exposure requiring immediate security incident response.",
      SEV2:
        "A widespread release-blocking scanner failure, critical vulnerability in a production-bound image, or broad security gate bypass.",
      SEV3:
        "A limited pipeline, image, team, or environment is affected without evidence of active compromise.",
      SEV4:
        "A nonblocking report issue, minor configuration warning, or isolated development failure.",
      note:
        "Set the actual severity using customer impact, exploitability, exposure, affected assets, and organizational incident policy. A CRITICAL finding is not automatically proof of exploitation.",
    },
  },

  criticalDistinction: {
    scannerError: {
      description:
        "The scanner cannot reliably complete its intended work.",
      examples: [
        "Database download failed.",
        "Registry authentication failed.",
        "Image cannot be resolved.",
        "Timeout or insufficient disk space.",
        "Invalid configuration or incompatible scanner version.",
      ],
      response:
        "Repair the scanner execution environment and rerun the intended scan. Do not report a failed scan as a clean scan.",
    },
    securityFinding: {
      description:
        "The scan completed and identified a potential vulnerability, secret, or misconfiguration.",
      examples: [
        "A package has a known CVE.",
        "A container runs with an insecure configuration.",
        "A committed file contains a possible credential.",
        "Infrastructure configuration violates a security rule.",
      ],
      response:
        "Validate the finding, assess exposure and exploitability, apply the security policy, and remediate or document a time-bound approved exception.",
    },
    warning:
      "A successful process exit is meaningful only when the intended scanner, targets, scanners, filters, policy, and report were actually configured. An empty report is not proof that all relevant assets were scanned.",
  },

  safetyChecks: [
    "Confirm repository, branch, commit SHA, environment, runner, and deployment target.",
    "Verify the exact container image repository, tag, digest, architecture, and registry.",
    "Confirm the active Trivy version and the version expected by the pipeline.",
    "Check whether the pipeline is intended to scan an image, filesystem, repository, configuration, root filesystem, or SBOM.",
    "Check the configured scanners and severity threshold before interpreting results.",
    "Record whether the run failed before scanning, during scanning, or after generating findings.",
    "Confirm whether the vulnerability database was downloaded or loaded from an approved local mirror.",
    "Do not expose registry tokens, cloud credentials, CI secrets, or private keys in logs.",
    "Do not grant broad administrator privileges to fix a registry or runner permission problem.",
    "Do not disable TLS verification or use insecure registry settings as a permanent fix.",
    "Do not add a broad ignore rule or set exit-code to zero simply to make the pipeline green.",
    "Preserve the failing report, command, scanner version, image digest, and relevant timestamps before cleaning caches.",
    "Obtain the required security and release approval before changing production gates.",
  ],

  evidenceCollection: {
    collect: [
      "Pipeline URL, run ID, job name, runner type, and timestamp in UTC.",
      "Repository, commit SHA, branch, and Dockerfile or build configuration revision.",
      "Exact sanitized Trivy command and its exit code.",
      "Trivy version, installation source, and runner image version.",
      "Target image reference and immutable digest where available.",
      "Scanner types, severity filters, ignore configuration, and policy settings.",
      "Sanitized stderr and stdout around the first failure.",
      "Vulnerability DB download or cache initialization status.",
      "Registry hostname, authentication method, and permission result without credentials.",
      "Runner disk space, memory, temporary-directory capacity, and network status.",
      "Image build time, base image, package lockfiles, and SBOM metadata where applicable.",
      "Recent scanner, DB mirror, proxy, registry, policy, and workflow changes.",
      "A known-good run for comparison, including its scanner version and image digest.",
    ],
    redaction: [
      "Never print registry passwords, access tokens, GitHub tokens, cloud credentials, or private keys.",
      "Treat raw secret-scan findings as sensitive; use restricted artifacts and access controls.",
      "Avoid --trace-http in production or CI because HTTP traces may expose sensitive information.",
      "Do not publish full environment dumps or unredacted configuration files.",
      "Use least-privilege access when sharing scan reports, especially when they include repository paths or secret findings.",
    ],
  },

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Classify the failure before changing anything",
      goal:
        "Identify whether Trivy failed to run, failed to retrieve its inputs, completed with findings, or generated an incomplete report.",
      commands: [
        {
          command: "trivy --version",
          purpose:
            "Record the installed Trivy version and compare it with the version pinned in CI.",
        },
        {
          command: "trivy --help",
          purpose:
            "Inspect available top-level commands and flags for the installed version.",
        },
        {
          command: "git status --short",
          purpose:
            "Check whether local changes may explain a difference between the workstation and CI.",
        },
      ],
      decisions: [
        {
          if: "The command exits before scanning begins",
          then:
            "Inspect installation, configuration parsing, DB initialization, target resolution, network, and registry access.",
        },
        {
          if: "The scan completes but returns a nonzero exit code",
          then:
            "Inspect findings, configured exit-code behavior, and the security gate before classifying the run as an execution error.",
        },
        {
          if: "The report is empty or unexpectedly small",
          then:
            "Verify the target, scanner selection, filters, file exclusions, image digest, and report contents.",
        },
        {
          if: "Only CI fails",
          then:
            "Compare runner image, credentials, environment variables, CA bundle, proxy, filesystem permissions, cache, and tool version.",
        },
      ],
    },

    {
      step: 2,
      title: "Verify the exact scan target",
      commands: [
        {
          command:
            "trivy image --scanners vuln registry.example.com/team/api:release-tag",
          purpose:
            "Run an image vulnerability scan against the intended registry reference.",
        },
        {
          command:
            "trivy fs --scanners vuln,secret .",
          purpose:
            "Scan the current directory for supported filesystem vulnerabilities and secrets.",
        },
        {
          command:
            "trivy config .",
          purpose:
            "Scan supported configuration files for infrastructure and configuration misconfigurations.",
        },
      ],
      decisions: [
        {
          if: "The image tag cannot be found",
          then:
            "Check registry hostname, repository path, tag spelling, build/push completion, and image visibility.",
        },
        {
          if: "The tag exists but resolves to an unexpected image",
          then:
            "Compare the resolved digest with the artifact produced by the build job; prefer digest-based artifact promotion.",
        },
        {
          if: "A filesystem scan reports no relevant packages",
          then:
            "Confirm the intended directory, supported package manifests, lockfiles, exclusions, and file permissions.",
        },
      ],
      notes: [
        "Use image scanning for container images, filesystem scanning for source and local files, and config scanning for supported infrastructure configuration.",
        "Do not treat these commands as interchangeable; they inspect different target types.",
      ],
    },

    {
      step: 3,
      title: "Check the registry and image pull path",
      commands: [
        {
          command: "docker image inspect registry.example.com/team/api:release-tag",
          purpose:
            "Inspect a locally available image when Docker is the configured runtime.",
        },
        {
          command: "docker login registry.example.com",
          purpose:
            "Authenticate interactively when Docker registry authentication is required and this method is approved.",
        },
        {
          command:
            "docker manifest inspect registry.example.com/team/api:release-tag",
          purpose:
            "Inspect manifest availability when supported by the installed Docker CLI and registry.",
        },
      ],
      decisions: [
        {
          if: "The registry returns UNAUTHORIZED",
          then:
            "Verify the intended identity, token expiry, scope, and pull permission for the exact repository.",
        },
        {
          if: "The registry returns DENIED",
          then:
            "Check repository-level permissions and whether the identity can pull the image or required artifact.",
        },
        {
          if: "The registry returns MANIFEST_UNKNOWN or not found",
          then:
            "Verify the tag or digest and confirm the build job pushed the artifact to the expected repository.",
        },
        {
          if: "A local image scan works but remote scanning fails",
          then:
            "Compare local image availability, registry connectivity, credentials, manifest platform, and runner permissions.",
        },
      ],
      safety:
        "Use an approved short-lived credential or CI identity. Do not embed registry passwords in workflow YAML or command-line arguments that may be logged.",
    },

    {
      step: 4,
      title: "Troubleshoot vulnerability database download errors",
      symptoms: [
        "FATAL failed to download vulnerability DB.",
        "GHCR token endpoint returns DENIED.",
        "TLS certificate validation fails while fetching DB assets.",
        "Network connection times out.",
        "A corporate proxy or firewall blocks the registry.",
      ],
      checks: [
        "Confirm the runner can resolve and reach the required registry endpoints.",
        "Check proxy configuration and outbound firewall policy.",
        "Validate the runner's CA bundle and system clock.",
        "Check whether a mirror is configured and accessible.",
        "Determine whether the failure affects all jobs or one runner.",
        "Inspect whether an expired or incorrect registry credential is being applied.",
        "Confirm the DB asset and scanner versions are compatible.",
      ],
      decisions: [
        {
          if: "GHCR returns DENIED",
          then:
            "Inspect the configured credential source and registry access. Verify that the token is valid and has the required scope, if authentication is required.",
        },
        {
          if: "TLS certificate validation fails",
          then:
            "Fix the trusted CA configuration or approved proxy certificate chain. Do not disable TLS verification.",
        },
        {
          if: "The request times out",
          then:
            "Investigate DNS, egress policy, proxy, connectivity, and registry availability before increasing timeouts.",
        },
        {
          if: "A private mirror is used",
          then:
            "Verify that the mirror contains current, compatible DB assets and that synchronization is healthy.",
        },
      ],
      recovery: [
        "Restore the intended registry connectivity and authentication.",
        "Use an approved DB mirror when direct access is restricted.",
        "Update cached databases through the normal supported mechanism.",
        "For air-gapped environments, follow the official Trivy air-gapped deployment procedure.",
        "Record the age and provenance of the DB used for every security-gated scan.",
      ],
      warning:
        "Do not use a stale DB silently for a security gate. If an emergency exception is approved, document the limitation, risk, owner, and expiry.",
    },

    {
      step: 5,
      title: "Investigate TLS and proxy problems",
      commands: [
        {
          command: "date -u",
          purpose: "Check the runner's current UTC time.",
        },
        {
          command: "curl -I https://ghcr.io/",
          purpose:
            "Perform a basic connectivity test from an approved diagnostic environment; an HTTP response alone does not prove DB access is authorized.",
        },
        {
          command: "env | grep -iE '^(HTTP_PROXY|HTTPS_PROXY|NO_PROXY)='",
          purpose:
            "Inspect proxy variable names and values only in a controlled environment; redact internal addresses if logs are shared.",
        },
      ],
      decisions: [
        {
          if: "TLS validation fails",
          then:
            "Check the CA trust chain, system clock, proxy interception, and Trivy's CA configuration.",
        },
        {
          if: "The proxy is configured incorrectly",
          then:
            "Correct the runner's approved proxy settings and required host allowlist.",
        },
        {
          if: "The registry endpoint is reachable but DB access is denied",
          then:
            "Investigate the actual asset path, registry token scope, and configured DB repository.",
        },
      ],
      safety:
        "Never solve proxy TLS errors with --insecure or by disabling certificate validation. Avoid tracing HTTP request/response bodies in production.",
    },

    {
      step: 6,
      title: "Diagnose cache locks and stale cache behavior",
      symptoms: [
        "cache may be in use by another process.",
        "vulnerability database may be in use by another process.",
        "Concurrent CI jobs fail intermittently.",
        "A previously successful runner starts failing after interrupted scans.",
      ],
      commands: [
        {
          command: "ps aux | grep '[t]rivy'",
          purpose:
            "Check for active Trivy processes on a Linux runner before terminating anything.",
        },
        {
          command: "trivy clean --help",
          purpose:
            "Inspect supported cache-cleaning options for the installed version.",
        },
        {
          command: "trivy clean --scan-cache",
          purpose:
            "Remove scan cache only when appropriate for the installed version and the incident evidence supports this action.",
        },
      ],
      decisions: [
        {
          if: "Multiple jobs share a filesystem cache concurrently",
          then:
            "Use isolated cache directories or a supported cache backend and avoid concurrent writes to the same filesystem cache.",
        },
        {
          if: "A previous scan was interrupted",
          then:
            "Confirm no active process owns the cache before considering cleanup.",
        },
        {
          if: "The cache is stale but there is no lock error",
          then:
            "Check DB update behavior, cache configuration, and scan reproducibility before deleting data.",
        },
      ],
      safety:
        "Do not kill arbitrary processes or delete shared cache files while a scan is active. Cache cleanup can increase scan duration and network load.",
    },

    {
      step: 7,
      title: "Resolve timeouts and runner resource exhaustion",
      commands: [
        {
          command: "df -h",
          purpose: "Inspect filesystem capacity.",
        },
        {
          command: "df -i",
          purpose: "Inspect inode exhaustion on Linux.",
        },
        {
          command: "free -h",
          purpose: "Inspect memory capacity on Linux.",
        },
        {
          command: "du -sh /tmp",
          purpose:
            "Estimate temporary-directory usage where permissions allow.",
        },
        {
          command:
            "trivy image --timeout 15m registry.example.com/team/api:release-tag",
          purpose:
            "Use a longer timeout only when evidence shows a legitimate slow scan and the installed version supports the flag.",
        },
      ],
      decisions: [
        {
          if: "No space left on device",
          then:
            "Inspect the temporary directory, image layers, runner disk limits, and retained artifacts; provision sufficient ephemeral storage.",
        },
        {
          if: "Memory or CPU pressure is high",
          then:
            "Reduce parallel work or increase runner capacity according to measured resource usage.",
        },
        {
          if: "Only Java-heavy images time out",
          then:
            "Inspect Java dependency analysis time, image size, network lookups, and cache behavior before changing timeouts.",
        },
        {
          if: "The network is slow but resources are healthy",
          then:
            "Investigate registry latency, proxy behavior, DB downloads, and external dependency lookups.",
        },
      ],
      notes: [
        "Increasing a timeout is not a fix for invalid credentials, missing images, disk exhaustion, or blocked egress.",
        "Temporary files can consume significant space during image analysis; monitor runner ephemeral storage.",
      ],
    },

    {
      step: 8,
      title: "Understand exit codes and security gates",
      example: {
        command:
          "trivy image --scanners vuln --severity HIGH,CRITICAL --exit-code 1 registry.example.com/team/api:release-tag",
        meaning:
          "Configure a nonzero exit code when matching findings are present, subject to the installed version's supported options.",
      },
      checks: [
        "Identify the exact scanner command used by CI.",
        "Check the selected severity levels.",
        "Check whether the pipeline distinguishes scanner execution failure from findings.",
        "Check the report and exit status independently.",
        "Verify whether ignore files, VEX data, or other filters affect the results.",
        "Confirm that the target image and scanner actually ran.",
      ],
      decisions: [
        {
          if: "The scan completed and returned findings with a configured nonzero exit code",
          then:
            "Treat this as a policy gate result. Triage the vulnerabilities and follow the approved remediation or exception process.",
        },
        {
          if: "The scan failed before producing reliable results",
          then:
            "Treat it as a scanner execution failure; do not convert it into a passing security result.",
        },
        {
          if: "The pipeline succeeds despite findings",
          then:
            "Inspect exit-code configuration, workflow conditionals, report parsing, ignored findings, and whether the scan step is allowed to fail.",
        },
      ],
      warning:
        "Do not set --exit-code 0 or mark the scan step continue-on-error merely to bypass a production gate. Any exception must be explicit, approved, scoped, and time-bound.",
    },

    {
      step: 9,
      title: "Triage vulnerability findings correctly",
      commands: [
        {
          command:
            "trivy image --scanners vuln --severity CRITICAL,HIGH --format table registry.example.com/team/api:release-tag",
          purpose:
            "Review high-priority vulnerability findings in a readable report.",
        },
        {
          command:
            "trivy image --scanners vuln --format json --output trivy-report.json registry.example.com/team/api:release-tag",
          purpose:
            "Generate a structured report for controlled analysis and downstream tooling.",
        },
      ],
      checks: [
        "Confirm the finding belongs to the actual image digest being deployed.",
        "Identify the affected package, installed version, fixed version if known, and vulnerability identifier.",
        "Determine whether the package is in the runtime image or only in build/development layers.",
        "Assess exposure, reachable functionality, exploitability, and compensating controls.",
        "Check whether the image is internet-facing or handles sensitive data.",
        "Review the package owner's remediation guidance and supported upgrade path.",
        "Record the DB timestamp or provenance and scanner version for reproducibility.",
      ],
      decisions: [
        {
          if: "A fixed version is available",
          then:
            "Upgrade the dependency or base image, rebuild the image, rescan it, and validate application behavior.",
        },
        {
          if: "No fixed version is available",
          then:
            "Assess exposure, mitigation, upstream guidance, and whether a temporary approved exception is appropriate.",
        },
        {
          if: "A package is not used at runtime",
          then:
            "Verify this with build and runtime evidence; use the organization's documented risk policy rather than assuming the finding is irrelevant.",
        },
        {
          if: "A finding appears inconsistent with package metadata",
          then:
            "Verify the exact package version, distribution, advisory data, and current scanner DB before escalating as a possible false positive.",
        },
      ],
      warning:
        "A CRITICAL severity label alone does not establish exploitability. Likewise, a package being present in a container does not automatically prove the vulnerable code path is reachable.",
    },

    {
      step: 10,
      title: "Investigate false positives and ignored findings",
      checks: [
        "Verify package name, ecosystem, installed version, distribution, and advisory identifier.",
        "Check the upstream advisory and fixed-version information.",
        "Confirm that the scanned image digest is correct.",
        "Check whether a package was rebuilt or backported by the distribution vendor.",
        "Review approved VEX data or documented vendor statements where applicable.",
        "Inspect .trivyignore or policy exclusions for scope and expiry.",
        "Check whether a broad ignore rule hides additional findings.",
      ],
      recovery: [
        "Prefer upgrading or replacing the affected package when feasible.",
        "Use supported VEX or ignore mechanisms only after review and evidence collection.",
        "Scope exceptions to the specific vulnerability and affected package when supported.",
        "Require an owner, rationale, compensating controls, approval, and expiry for temporary exceptions.",
        "Re-evaluate exceptions when the image, package version, advisory, or exposure changes.",
      ],
      safety:
        "Do not globally suppress an entire severity class or ignore all findings from a package family just to obtain a green pipeline.",
    },

    {
      step: 11,
      title: "Troubleshoot filesystem, secret, and IaC scans",
      checks: [
        "Confirm the intended repository root and working directory.",
        "Check which scanners are enabled for the command.",
        "Inspect file exclusions and ignored paths.",
        "Confirm manifests and lockfiles exist and are current.",
        "Verify that generated files, vendored dependencies, and nested directories are handled intentionally.",
        "Review secret-scan findings through a restricted process.",
        "Check whether the configuration file format and rule are supported by the installed version.",
      ],
      decisions: [
        {
          if: "A committed credential is detected",
          then:
            "Treat it as potentially exposed: revoke or rotate it, investigate usage, and remove it from active code and history according to incident policy.",
        },
        {
          if: "A configuration finding is reported",
          then:
            "Inspect the affected resource, security context, rule, and deployment environment before changing the configuration.",
        },
        {
          if: "Expected dependencies are missing from results",
          then:
            "Check manifests, lockfiles, scan target, file permissions, supported ecosystem, and exclusions.",
        },
        {
          if: "A secret finding may be a false positive",
          then:
            "Validate it without exposing the suspected value and use a narrowly scoped approved suppression only if justified.",
        },
      ],
      warning:
        "Deleting a credential from the latest commit does not guarantee that it was not exposed. Rotation and incident assessment are separate from source cleanup.",
    },

    {
      step: 12,
      title: "Troubleshoot SBOM generation and consumption",
      commands: [
        {
          command:
            "trivy image --format cyclonedx --output sbom.cdx.json registry.example.com/team/api:release-tag",
          purpose:
            "Generate a CycloneDX-format SBOM using a supported Trivy version and command configuration.",
        },
        {
          command:
            "trivy sbom --help",
          purpose:
            "Inspect supported SBOM input and analysis options for the installed version.",
        },
      ],
      checks: [
        "Confirm the intended image digest or filesystem is the SBOM source.",
        "Confirm the chosen SBOM format is supported by downstream tooling.",
        "Check whether expected packages appear in the generated document.",
        "Validate JSON or XML syntax using the appropriate parser.",
        "Check whether the report belongs to the current build and not a stale artifact.",
        "Review CI artifact retention and access permissions.",
      ],
      decisions: [
        {
          if: "The SBOM is empty or incomplete",
          then:
            "Recheck the input target, supported package metadata, scanner options, and image digest.",
        },
        {
          if: "Downstream tooling rejects the SBOM",
          then:
            "Check the format, schema version, required fields, and the consumer's supported profile.",
        },
        {
          if: "The SBOM belongs to another build",
          then:
            "Bind the report to the commit, image digest, pipeline run, and artifact provenance.",
        },
      ],
      safety:
        "Do not treat a syntactically valid SBOM as proof that all packages were discovered or that the image is vulnerability-free.",
    },

    {
      step: 13,
      title: "Compare local and CI behavior",
      comparisonPoints: [
        "Trivy version and installation source.",
        "Runner operating system and architecture.",
        "Image tag and resolved digest.",
        "Registry identity and pull permissions.",
        "Vulnerability DB source, freshness, and mirror configuration.",
        "CA bundle, proxy, DNS, and egress rules.",
        "Cache directory and concurrency model.",
        "Timeout, parallelism, memory, and temporary storage.",
        "Scanner selection, severity filters, ignore rules, and exit-code policy.",
        "Build commit, base image, lockfiles, and generated artifacts.",
      ],
      procedure: [
        "Collect the same metadata from a working and failing run.",
        "Compare the immutable image digest first.",
        "Compare scanner version and configuration.",
        "Determine whether the discrepancy is caused by changed image contents or changed scanning inputs.",
        "Repeat the test using an approved reproducible runner and configuration.",
        "Record the smallest confirmed difference that explains the behavior.",
      ],
    },

    {
      step: 14,
      title: "Inspect GitHub Actions integration",
      checks: [
        "Pin the Trivy installation or action to an approved version.",
        "Ensure the image build and push complete before scanning the published image.",
        "Use explicit image references rather than ambiguous tags when possible.",
        "Confirm that the scan job receives the required registry permissions.",
        "Separate report generation from the policy gate if that makes failure handling clearer.",
        "Upload reports as restricted artifacts when they contain sensitive repository details.",
        "Avoid exposing credentials through debug output.",
        "Check whether workflow conditions accidentally skip the security job.",
        "Ensure a scanner infrastructure failure cannot silently become a passing result.",
      ],
      decisions: [
        {
          if: "The scan job is skipped",
          then:
            "Inspect job dependencies, if/needs conditions, branch filters, and workflow expressions.",
        },
        {
          if: "The image is not available to the scanner",
          then:
            "Check build/push ordering, registry credentials, and whether the exact tag or digest exists.",
        },
        {
          if: "The scanner step fails but the workflow passes",
          then:
            "Review continue-on-error, shell behavior, conditional steps, and downstream report parsing.",
        },
      ],
      note:
        "Use the official action documentation and pin dependencies according to your organization's supply-chain policy. Do not assume an action's default inputs remain unchanged across versions.",
    },

    {
      step: 15,
      title: "Isolate the root cause using evidence",
      rootCauseMatrix: [
        {
          symptom: "Vulnerability DB download failed",
          likelyCauses: [
            "Network or proxy restriction",
            "Registry authentication failure",
            "CA trust issue",
            "Unavailable or misconfigured mirror",
          ],
          evidence:
            "Sanitized error, connectivity checks, runner CA configuration, DB source, and authentication status.",
          fix:
            "Restore approved connectivity, trust, and mirror configuration.",
        },
        {
          symptom: "Image cannot be found",
          likelyCauses: [
            "Wrong image reference",
            "Missing tag",
            "Build/push failed",
            "Wrong repository permissions",
          ],
          evidence:
            "Build logs, registry manifest, image digest, and authenticated pull result.",
          fix:
            "Correct the target or complete the expected build and push.",
        },
        {
          symptom: "Scan runs out of disk",
          likelyCauses: [
            "Insufficient ephemeral storage",
            "Large image layers",
            "High parallelism",
            "Temporary files consuming capacity",
          ],
          evidence:
            "Filesystem usage, runner limits, image size, and failure path.",
          fix:
            "Provision adequate storage and tune parallelism based on measurements.",
        },
        {
          symptom: "Cache lock error",
          likelyCauses: [
            "Concurrent processes share a filesystem cache",
            "An earlier scan did not exit cleanly",
            "A long-running process owns the cache",
          ],
          evidence:
            "Active process list, cache configuration, and job concurrency.",
          fix:
            "Use isolated cache paths or a supported shared cache architecture.",
        },
        {
          symptom: "CRITICAL findings block release",
          likelyCauses: [
            "New vulnerable dependency",
            "Base image change",
            "Updated vulnerability data",
            "Changed scanner or policy configuration",
          ],
          evidence:
            "Image digest, package metadata, advisory, DB provenance, and policy diff.",
          fix:
            "Remediate the affected package or use an approved time-bound exception where justified.",
        },
        {
          symptom: "Local scan passes but CI fails",
          likelyCauses: [
            "Different image digest",
            "Different scanner version",
            "Different DB or filters",
            "CI-only network, auth, or resource issue",
          ],
          evidence:
            "Side-by-side metadata comparison and reproducible scan commands.",
          fix:
            "Align the intended inputs or repair the environment-specific failure.",
        },
        {
          symptom: "Secret scanner detects a credential",
          likelyCauses: [
            "Credential committed to source",
            "Test fixture resembling a secret",
            "Generated file included in scan",
          ],
          evidence:
            "Restricted finding details, file history, credential validity, and usage audit.",
          fix:
            "Rotate potentially exposed credentials and remediate the source or narrowly document a verified false positive.",
        },
        {
          symptom: "SBOM or report is empty",
          likelyCauses: [
            "Wrong target",
            "Unsupported input",
            "Scanner selection or exclusions",
            "Wrong or stale artifact",
          ],
          evidence:
            "Command, target digest, scan metadata, and parsed report.",
          fix:
            "Correct the scan input and artifact pipeline, then verify expected package coverage.",
        },
      ],
    },

    {
      step: 16,
      title: "Safe recovery and controlled rerun",
      procedure: [
        "Confirm the failing command and the first actual error.",
        "Record the scanner version, target digest, configuration, and report status.",
        "Fix the confirmed cause rather than changing multiple settings at once.",
        "For registry errors, restore the correct least-privilege authentication.",
        "For DB failures, restore approved DB retrieval or mirror synchronization.",
        "For cache conflicts, stop conflicting work safely or isolate cache directories.",
        "For resource exhaustion, correct runner capacity or measured parallelism problems.",
        "For vulnerability findings, patch the image or follow the documented exception process.",
        "Run the exact intended scan again using the intended scanners and policy.",
        "Verify that a complete report was produced and that the exit status matches policy.",
        "Test the exact artifact digest intended for deployment.",
        "Obtain release approval and monitor the deployment after rollout.",
      ],
      rollbackRules: [
        "If a newly built image introduces a vulnerability, consider reverting to an approved known-good digest only after checking that it does not reintroduce known risk.",
        "If scanner infrastructure is unavailable, do not silently treat the pipeline as clean; use the documented security exception and release policy.",
        "If a policy change causes unexpected failures, review the diff and roll back only through the approved policy change process.",
        "If a credential may have leaked, revoke or rotate it and investigate usage before treating the incident as resolved.",
        "Do not delete all caches or restart every runner as the first response.",
      ],
    },

    {
      step: 17,
      title: "Post-recovery validation",
      checklist: [
        "The scanner starts successfully using the approved version.",
        "The intended target image or filesystem was scanned.",
        "The exact image digest is recorded.",
        "The vulnerability database or mirror is available and sufficiently current for policy.",
        "No registry, TLS, timeout, cache, or storage error remains.",
        "The report contains expected scan results.",
        "Severity thresholds and exit-code behavior match policy.",
        "Ignore rules and exceptions are reviewed and scoped.",
        "The security gate cannot silently pass after an execution failure.",
        "The application image was rebuilt and rescanned after remediation.",
        "The deployment uses the scanned artifact rather than rebuilding a different image later.",
        "Reports and logs do not expose credentials or raw secrets.",
        "The service owner and security owner confirm the outcome.",
      ],
    },
  ],

  commandReference: {
    versionAndHelp: [
      "trivy --version",
      "trivy --help",
      "trivy image --help",
      "trivy clean --help",
    ],
    imageScanning: [
      "trivy image registry.example.com/team/api:release-tag",
      "trivy image --scanners vuln --severity HIGH,CRITICAL registry.example.com/team/api:release-tag",
      "trivy image --format json --output trivy-report.json registry.example.com/team/api:release-tag",
    ],
    filesystemAndConfig: [
      "trivy fs --scanners vuln,secret .",
      "trivy config .",
    ],
    sbom: [
      "trivy image --format cyclonedx --output sbom.cdx.json registry.example.com/team/api:release-tag",
      "trivy sbom --help",
    ],
    troubleshooting: [
      "df -h",
      "df -i",
      "free -h",
      "ps aux | grep '[t]rivy'",
      "trivy clean --help",
    ],
    cautions: [
      "Confirm supported flags using the installed version's help output.",
      "Example registry names and tags are placeholders.",
      "A report's format, schema, and available fields depend on the chosen output format and Trivy version.",
      "Do not use --trace-http in production or CI.",
      "Do not use --insecure or disable TLS verification as a permanent workaround.",
      "Do not treat a successful command exit as proof of complete coverage without checking the target and report.",
    ],
  },

  prevention: {
    pipeline: [
      "Pin the scanner version and review upgrades through a controlled process.",
      "Scan the exact immutable image digest intended for deployment.",
      "Keep scanner execution errors separate from policy findings.",
      "Require the expected report and validate that the scan covered the intended target.",
      "Use explicit severity and exit-code policies.",
      "Review policy and workflow changes in code review.",
      "Store security reports with appropriate access controls.",
      "Use approved CI identities and least-privilege registry permissions.",
      "Keep security scanning mandatory for protected release paths.",
    ],
    databaseAndCache: [
      "Monitor vulnerability DB retrieval and mirror synchronization.",
      "Track DB provenance and freshness.",
      "Provide approved egress and CA trust configuration.",
      "Avoid concurrent use of the same filesystem cache by independent processes.",
      "Monitor runner storage and memory.",
      "Test scanner and DB updates before broad rollout.",
    ],
    vulnerabilityManagement: [
      "Define remediation SLAs by severity, exposure, and exploitability.",
      "Track findings by immutable image digest and package version.",
      "Rebuild images after dependency or base-image remediation.",
      "Use narrow, reviewed, time-bound exceptions.",
      "Review findings after DB, scanner, base-image, and dependency changes.",
      "Rotate exposed credentials rather than merely deleting their source text.",
    ],
    monitoring: [
      "Alert on repeated scanner infrastructure failures.",
      "Alert when the vulnerability DB cannot be refreshed.",
      "Track scan duration, runner disk pressure, and failure rates.",
      "Monitor newly introduced critical findings.",
      "Detect skipped or bypassed security jobs.",
      "Track exception age and overdue remediation.",
      "Monitor registry permission and authentication failures.",
    ],
  },

  incidentReportTemplate: {
    title: "Trivy Production Incident Report",
    fields: [
      "Incident ID, severity, and incident owner",
      "First failure, detection, mitigation, and recovery times in UTC",
      "Affected repository, pipeline, branch, environment, and image digest",
      "Customer or release impact",
      "Scanner version and exact sanitized command",
      "Failure classification: execution error or security finding",
      "Relevant logs and report artifacts",
      "DB source, freshness, registry access, and cache status",
      "Root cause and supporting evidence",
      "Corrective action and approval",
      "Post-fix scan results and policy outcome",
      "Deployment validation",
      "Credential exposure or security-impact assessment",
      "Prevention tasks, owners, and due dates",
    ],
  },

  handsOnLabs: [
    {
      title: "Lab 1 — Baseline image scan",
      tasks: [
        "Record the Trivy version.",
        "Scan an approved test image.",
        "Generate a JSON report.",
        "Identify the image digest, scanner settings, findings, and exit status.",
      ],
    },
    {
      title: "Lab 2 — Registry access failure",
      tasks: [
        "Use a disposable test registry and least-privilege identity.",
        "Observe an unauthorized pull.",
        "Correct the identity or permission.",
        "Confirm that the exact target image can be scanned.",
      ],
    },
    {
      title: "Lab 3 — CI scanner failure",
      tasks: [
        "Compare a working local run with a failing CI run.",
        "Record version, target digest, DB source, and environment differences.",
        "Identify the smallest confirmed difference.",
        "Rerun with matching approved inputs.",
      ],
    },
    {
      title: "Lab 4 — Vulnerability gate",
      tasks: [
        "Run a scan with an explicit severity threshold.",
        "Inspect the report and exit code.",
        "Patch a test dependency or base image.",
        "Rebuild, rescan, and compare results.",
      ],
    },
    {
      title: "Lab 5 — Secret and configuration findings",
      tasks: [
        "Use a disposable repository containing a clearly fake test secret.",
        "Run secret scanning without exposing the finding in shared logs.",
        "Inspect a deliberately insecure test configuration.",
        "Fix the test artifacts and rerun the scan.",
      ],
    },
  ],

  interviewQuestions: [
    {
      question: "What is the difference between a Trivy execution error and a vulnerability finding?",
      answer:
        "An execution error means the scanner could not complete its intended work. A vulnerability finding is a result from a completed scan. A failed scan must not be treated as a clean security result.",
    },
    {
      question: "Why can Trivy fail to download its vulnerability database?",
      answer:
        "Possible causes include registry authentication, network egress, proxy configuration, TLS trust, a broken mirror, rate limits, and unavailable or incompatible assets.",
    },
    {
      question: "Why should production images be scanned by digest?",
      answer:
        "A mutable tag can point to different image contents over time. A digest identifies the specific image artifact used for scanning and deployment verification.",
    },
    {
      question: "How would you troubleshoot a cache lock error?",
      answer:
        "Check active Trivy processes and the cache directory configuration. Avoid concurrent filesystem-cache use, isolate cache directories, or adopt a supported cache backend.",
    },
    {
      question: "Why is an empty report not proof of a clean image?",
      answer:
        "The wrong target may have been scanned, scanners may be disabled, files may be excluded, package metadata may be missing, or report generation may have failed.",
    },
    {
      question: "How should a critical vulnerability be triaged?",
      answer:
        "Verify the image digest, package version, advisory, fixed version, exposure, exploitability, and runtime context. Patch where possible or use a documented, approved, time-bound exception.",
    },
    {
      question: "Why is setting the scanner exit code to zero dangerous?",
      answer:
        "It can allow findings to pass the security gate. A scanner execution failure or policy violation must be handled explicitly rather than silently converted into success.",
    },
    {
      question: "How do you investigate a secret finding?",
      answer:
        "Treat the value as potentially exposed, avoid printing it, assess whether it is genuine, rotate or revoke it if necessary, inspect usage, and remove it from active code and history according to policy.",
    },
    {
      question: "Why can local scans pass while CI fails?",
      answer:
        "The image digest, scanner version, database, credentials, network, CA bundle, cache, filters, runner resources, or exit-code policy may differ.",
    },
    {
      question: "What is the purpose of an SBOM?",
      answer:
        "A Software Bill of Materials records software components associated with an artifact. It supports inventory and supply-chain analysis but does not itself prove that the artifact is vulnerability-free.",
    },
    {
      question: "How should scanner database freshness be managed?",
      answer:
        "Use approved update or mirror mechanisms, monitor refresh failures, record DB provenance, and define a policy for scans when fresh data is unavailable.",
    },
    {
      question: "How do you prevent a security gate from being bypassed accidentally?",
      answer:
        "Use protected workflow paths, explicit failure semantics, required reports, policy-as-code review, restricted permissions, and monitoring for skipped or nonblocking scan jobs.",
    },
  ],

  completionChecklist: [
    "Incident severity and affected pipeline are identified.",
    "Scanner execution error is distinguished from security findings.",
    "Exact target and immutable image digest are recorded.",
    "Scanner version and effective options are verified.",
    "Registry, DB, proxy, TLS, cache, and runner resources are checked as applicable.",
    "Report completeness and exit-code behavior are verified.",
    "Vulnerability, secret, or misconfiguration findings are triaged with evidence.",
    "Fixes are minimal, approved, and validated.",
    "The exact artifact intended for deployment is rescanned.",
    "No credential or security gate was silently bypassed.",
    "Prevention actions, monitoring, and incident notes are complete.",
  ],

  officialReferences: [
    {
      title: "Trivy Troubleshooting",
      url: "https://trivy.dev/docs/latest/references/troubleshooting/",
      use:
        "Database download errors, cache locks, timeouts, registry issues, and storage troubleshooting.",
    },
    {
      title: "Trivy Installation",
      url: "https://trivy.dev/docs/latest/getting-started/installation/",
      use: "Supported installation methods and official container images.",
    },
    {
      title: "Trivy CLI Reference",
      url: "https://trivy.dev/docs/latest/references/configuration/cli/trivy/",
      use: "CLI configuration and supported options.",
    },
    {
      title: "Trivy Vulnerability Scanning",
      url: "https://trivy.dev/docs/latest/scanner/vulnerability/",
      use: "Vulnerability scanning concepts and configuration.",
    },
    {
      title: "Trivy Secret Scanning",
      url: "https://trivy.dev/docs/latest/scanner/secret/",
      use: "Secret detection and configuration.",
    },
    {
      title: "Trivy Misconfiguration Scanning",
      url: "https://trivy.dev/docs/latest/scanner/misconfiguration/",
      use: "Infrastructure and configuration scanning.",
    },
    {
      title: "Trivy Cache",
      url: "https://trivy.dev/docs/latest/configuration/cache/",
      use: "Cache storage and cache-cleaning options.",
    },
    {
      title: "Trivy GitHub Repository",
      url: "https://github.com/aquasecurity/trivy",
      use: "Official source, releases, issues, and project updates.",
    },
    {
      title: "GitHub Actions Security Hardening",
      url: "https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions",
      use: "CI workflow security, permissions, and dependency pinning practices.",
    },
    {
      title: "OWASP DevSecOps Guideline",
      url: "https://owasp.org/www-project-devsecops-guideline/",
      use: "Integrating security controls into the software delivery lifecycle.",
    },
  ],
} as const;

export default trivyErrorGuide;

