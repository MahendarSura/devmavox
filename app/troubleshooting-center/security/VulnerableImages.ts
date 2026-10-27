
export const vulnerableImagesGuide = {
  title: "Vulnerable Container Images — Production Troubleshooting",
  filePath: "app/troubleshooting-center/security/VulnerableImages.ts",
  category: "Security",
  difficulty: "Advanced",
  estimatedTime: "90–150 minutes",

  tags: [
    "Container Security",
    "Trivy",
    "Docker",
    "Kubernetes",
    "CVE",
    "SBOM",
    "Base Images",
    "Image Digests",
    "CI/CD",
    "Supply Chain Security",
    "Vulnerability Management",
  ],

  overview: {
    summary:
      "A production runbook for identifying, prioritizing, remediating, verifying, and preventing vulnerable container images across build pipelines, registries, Kubernetes workloads, and production deployments.",
    objectives: [
      "Identify vulnerable images actually running in production.",
      "Match scan results to the exact immutable image digest.",
      "Distinguish OS packages, language dependencies, base-image packages, and application vulnerabilities.",
      "Prioritize vulnerabilities using severity, exposure, exploitability, and business impact.",
      "Rebuild images safely and verify that fixes are present.",
      "Investigate why vulnerable images remain deployed after a fix.",
      "Handle unfixed vulnerabilities, false positives, and exceptions through a controlled process.",
      "Prevent vulnerable images from reaching production through CI/CD and admission policies.",
    ],
  },

  productionIncident: {
    scenario:
      "A routine security scan reports multiple HIGH and CRITICAL CVEs in an image used by a customer-facing API. The deployment team has already promoted a release tag to production. A patched base image is available, but the current workload continues running the old digest. Meanwhile, another pipeline reports different findings for what appears to be the same image tag.",
    symptoms: [
      "Trivy reports new HIGH or CRITICAL vulnerabilities.",
      "A base image contains outdated OpenSSL, libc, curl, or other system packages.",
      "An application dependency is vulnerable even though the operating system is current.",
      "The Dockerfile uses a mutable tag such as latest.",
      "A patched image was built but production still runs the older image.",
      "CI scans one image while deployment uses another.",
      "A registry tag points to a different digest than expected.",
      "A vulnerability remains after a dependency upgrade.",
      "A scanner reports an unfixed CVE.",
      "A rollback reintroduces a previously vulnerable image.",
      "Kubernetes workloads run mixed image versions during a rollout.",
      "An exception or ignore rule hides a finding from the release gate.",
    ],
    impact: [
      "An exploitable vulnerability may be exposed to untrusted traffic.",
      "Sensitive data, application credentials, or workload identities may be at risk.",
      "A release may need to be blocked or rolled back.",
      "Emergency rebuilds can affect availability if dependencies are not validated.",
      "Uncontrolled image promotion may create supply-chain integrity concerns.",
      "Untracked exceptions can lead to audit and compliance gaps.",
    ],
    severity: {
      SEV1:
        "Confirmed exploitation, malicious image, active compromise, or a critical vulnerability with credible immediate exposure requiring incident command and security response.",
      SEV2:
        "Critical vulnerability in an internet-facing or sensitive production service, or a broad release containing a high-risk vulnerable image.",
      SEV3:
        "A vulnerable image is present in a limited environment or has elevated risk without evidence of active exploitation.",
      SEV4:
        "Low-risk finding, nonproduction exposure, or an issue already mitigated by a verified supported package fix.",
      note:
        "Severity must follow organizational policy and consider exposure, exploitability, runtime reachability, asset criticality, and available mitigations. A CVSS score alone does not determine incident severity.",
    },
  },

  safetyChecks: [
    "Confirm the affected application, production environment, cluster, namespace, workload, and service owner.",
    "Identify the image reference and immutable digest used by the running containers.",
    "Confirm whether the vulnerability exists in the deployed artifact or only in a newer candidate image.",
    "Check recent builds, base-image updates, dependency changes, and deployment history.",
    "Preserve scan reports, SBOMs, image digests, and relevant pipeline logs.",
    "Use approved registry credentials and read-only access for initial investigation.",
    "Do not delete registry tags, images, or running workloads before assessing impact and rollback requirements.",
    "Do not upgrade production dependencies directly inside running containers as the normal remediation method.",
    "Do not blindly upgrade every package to its newest version; verify compatibility and supported security fixes.",
    "Do not suppress all HIGH or CRITICAL findings just to unblock a release.",
    "Do not assume that an image is safe because the scanner returned no findings.",
    "Obtain security and change approval for emergency production rollout or exceptions.",
    "If exploitation or compromise is suspected, preserve evidence and follow the security incident response plan.",
  ],

  evidenceCollection: {
    capture: [
      "Incident ID, start time, discovery time, and timeline in UTC.",
      "Application name, environment, namespace, cluster, and workload.",
      "Container image repository, tag, platform, and digest.",
      "Trivy version, scan command, scanner settings, and report timestamp.",
      "CVE identifier, affected package, installed version, fixed version, and severity source.",
      "Image build commit, Dockerfile, base image digest, dependency lockfiles, and build logs.",
      "SBOM and image provenance where available.",
      "Whether the package is OS-managed, language-managed, or manually installed.",
      "Production exposure, network reachability, workload privileges, and data sensitivity.",
      "Deployment revision, rollout history, registry push time, and image pull events.",
      "Admission policy decisions, exception records, and image-signature verification results where configured.",
    ],
    handling: [
      "Store vulnerability reports in approved access-controlled artifacts.",
      "Do not include credentials, tokens, private keys, or raw secret findings in the incident report.",
      "Use immutable identifiers to connect scan results to deployed artifacts.",
      "Record the scanner and vulnerability database context so that later differences can be explained.",
    ],
  },

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Identify exactly which vulnerable image is running",
      goal:
        "Avoid fixing a candidate image while the affected workload continues running a different artifact.",
      commands: [
        {
          command: "kubectl config current-context",
          purpose: "Confirm the active Kubernetes context.",
        },
        {
          command: "kubectl -n production get deployments",
          purpose: "Identify relevant application deployments.",
        },
        {
          command:
            "kubectl -n production get pods -o wide",
          purpose:
            "Identify affected Pods, nodes, and rollout distribution.",
        },
        {
          command:
            "kubectl -n production get pods -o jsonpath='{range .items[*]}{.metadata.name}{\"\\t\"}{range .status.containerStatuses[*]}{.name}{\"=\"}{.image}{\" imageID=\"}{.imageID}{\"\\n\"}{end}{end}'",
          purpose:
            "Collect requested image references and runtime image IDs where available, without printing Secret data.",
        },
      ],
      decisions: [
        {
          if: "The runtime image digest differs from the scanned digest",
          then:
            "Treat the scan and production workload as different artifacts. Scan the exact running digest before choosing remediation.",
        },
        {
          if: "Some Pods use an older image",
          then:
            "Inspect Deployment, StatefulSet, DaemonSet, ReplicaSet, and rollout history to find why the rollout is incomplete.",
        },
        {
          if: "The affected workload is not found",
          then:
            "Check other namespaces, workloads, clusters, batch jobs, serverless containers, and registry consumers according to the asset inventory.",
        },
      ],
      caveat:
        "Kubernetes status.imageID formatting depends on the container runtime. Correlate it with registry metadata and runtime inventory rather than assuming every runtime exposes the same representation.",
    },

    {
      step: 2,
      title: "Reproduce the vulnerability scan",
      commands: [
        {
          command: "trivy --version",
          purpose: "Record the scanner version.",
        },
        {
          command:
            "trivy image --scanners vuln --severity HIGH,CRITICAL registry.example.com/team/api@sha256:REPLACE_WITH_DIGEST",
          purpose:
            "Scan the exact immutable artifact with the intended severity filter.",
        },
        {
          command:
            "trivy image --scanners vuln --format json --output vulnerable-image-report.json registry.example.com/team/api@sha256:REPLACE_WITH_DIGEST",
          purpose:
            "Generate a structured report for controlled analysis.",
        },
      ],
      checks: [
        "Confirm the target repository and digest.",
        "Record the scanner version and DB freshness.",
        "Confirm the intended scanner and severity configuration.",
        "Check whether ignore rules or VEX data affect the results.",
        "Confirm the report was generated successfully.",
        "Compare the report with the release pipeline's security gate.",
      ],
      decisions: [
        {
          if: "The scan reports findings",
          then:
            "Proceed to package-level triage and assess whether the findings affect the running production artifact.",
        },
        {
          if: "The scan fails to execute",
          then:
            "Resolve the scanner infrastructure problem separately; do not treat the image as vulnerability-free.",
        },
        {
          if: "The scan shows no findings",
          then:
            "Verify target digest, package coverage, DB status, enabled scanners, and report completeness before concluding that risk is low.",
        },
      ],
    },

    {
      step: 3,
      title: "Prioritize vulnerabilities using real production risk",
      checks: [
        "Review severity from the relevant advisory source.",
        "Check whether exploitation is known or credible.",
        "Determine whether the vulnerable component is reachable in the deployed application.",
        "Assess whether the service is internet-facing or exposed to untrusted inputs.",
        "Check the sensitivity of data and privileges available to the workload.",
        "Identify available fixes, mitigations, and supported package updates.",
        "Consider blast radius if the vulnerability is exploited.",
      ],
      priorityRules: [
        {
          priority: "P0 — Immediate response",
          criteria:
            "Evidence of exploitation, active compromise, malicious image, or an urgent high-impact exposure under incident policy.",
          action:
            "Engage incident response and security leadership. Contain affected workloads according to the response plan.",
        },
        {
          priority: "P1 — Urgent remediation",
          criteria:
            "Critical or high-risk vulnerability in a public-facing, sensitive, or privileged production workload.",
          action:
            "Assign an owner, confirm the fix, establish an emergency rollout plan, and monitor exposure.",
        },
        {
          priority: "P2 — Scheduled remediation",
          criteria:
            "Significant vulnerability with lower exposure or effective compensating controls.",
          action:
            "Plan a tested upgrade within the organization's defined SLA.",
        },
        {
          priority: "P3 — Tracked risk",
          criteria:
            "Lower-risk finding with limited impact and no immediate remediation requirement under policy.",
          action:
            "Track the finding, monitor advisory updates, and remediate during the normal maintenance cycle.",
        },
      ],
      caveat:
        "These are example operational priorities, not universal SLAs. Apply the organization's approved vulnerability-management policy.",
    },

    {
      step: 4,
      title: "Identify which package introduces the CVE",
      commands: [
        {
          command:
            "trivy image --scanners vuln --format table registry.example.com/team/api@sha256:REPLACE_WITH_DIGEST",
          purpose: "Review vulnerable package names and versions.",
        },
        {
          command:
            "docker image inspect registry.example.com/team/api:release-tag",
          purpose:
            "Inspect image metadata when the image is available locally.",
        },
        {
          command:
            "docker history --no-trunc registry.example.com/team/api:release-tag",
          purpose:
            "Review image build-layer history where available; do not treat it as a complete software inventory.",
        },
      ],
      packageClassification: [
        {
          type: "Operating system package",
          examples: ["OpenSSL", "glibc", "curl", "zlib"],
          investigate:
            "Identify the OS distribution and package manager. Review the vendor's security advisory and supported package update.",
        },
        {
          type: "Application dependency",
          examples: ["npm package", "Maven dependency", "Python library", "Go module"],
          investigate:
            "Check direct and transitive dependencies, lockfiles, dependency constraints, and supported patched releases.",
        },
        {
          type: "Base-image component",
          examples: ["Runtime image", "OS layer", "language runtime"],
          investigate:
            "Identify the base image digest and available patched vendor image. Rebuild the application on the approved base.",
        },
        {
          type: "Manually installed binary",
          examples: ["Downloaded CLI", "Custom native library"],
          investigate:
            "Check upstream provenance and version metadata. Package-manager updates may not update manually installed software.",
        },
      ],
      decisions: [
        {
          if: "The package comes from the base image",
          then:
            "Update the base image to an approved patched digest and rebuild the application image.",
        },
        {
          if: "The package is an application dependency",
          then:
            "Update the manifest and lockfile through the project's dependency-management workflow, then rebuild and test.",
        },
        {
          if: "The package is manually installed",
          then:
            "Update the installation source or replace the binary with a verified fixed release.",
        },
      ],
    },

    {
      step: 5,
      title: "Verify the advisory and fixed version",
      checks: [
        "Confirm the CVE identifier and affected product.",
        "Check the installed package version and distribution.",
        "Inspect the OS vendor or ecosystem advisory.",
        "Check the fixed version or vendor security release.",
        "Confirm whether the vendor backported a patch.",
        "Review whether the package is unsupported or end-of-life.",
        "Record the advisory source and date checked.",
      ],
      decisions: [
        {
          if: "A supported fixed version is available",
          then:
            "Use the supported update path and rebuild the image.",
        },
        {
          if: "The OS vendor backported a fix",
          then:
            "Verify the vendor package release and advisory evidence. Do not rely solely on upstream version comparison.",
        },
        {
          if: "No fix is available",
          then:
            "Assess mitigations, exposure reduction, alternate packages, vendor support, and a time-bound exception if approved.",
        },
        {
          if: "The package is end-of-life",
          then:
            "Plan migration to a supported runtime or OS image instead of depending indefinitely on unsupported packages.",
        },
      ],
      note:
        "Trivy may use the OS vendor's advisory for OS-managed packages because vendors can backport fixes without matching the upstream version number. Verify the package's distribution and advisory before declaring a finding false positive.",
    },

    {
      step: 6,
      title: "Investigate base-image and Dockerfile problems",
      checks: [
        "Identify the exact FROM image and its digest.",
        "Check whether the base image is supported and maintained.",
        "Inspect the image build date and dependency installation steps.",
        "Check whether package installation uses a stale repository index.",
        "Check whether package update and installation occur in the intended build layer.",
        "Inspect multi-stage builds to verify the final stage contains the patched runtime.",
        "Confirm that the final image does not copy vulnerable artifacts from an earlier stage.",
        "Review unnecessary packages, compilers, shells, and tools included in the runtime image.",
      ],
      decisions: [
        {
          if: "The base image is outdated",
          then:
            "Update to an approved patched base image and rebuild from the source Dockerfile.",
        },
        {
          if: "The package manager installs old packages",
          then:
            "Review repository configuration, distribution support, package indexes, and update instructions.",
        },
        {
          if: "A fix exists in the build stage but not in the final image",
          then:
            "Correct the final-stage dependency or copy process and rebuild.",
        },
        {
          if: "The image uses an unsupported OS release",
          then:
            "Plan migration to a supported release with security updates.",
        },
      ],
      safety:
        "Avoid unreviewed latest-tag changes in production. Select an approved base-image version or digest, test compatibility, and record the resulting artifact digest.",
    },

    {
      step: 7,
      title: "Fix vulnerable application dependencies",
      examples: [
        {
          ecosystem: "Node.js",
          checks: [
            "Inspect package.json and package-lock.json or the applicable lockfile.",
            "Determine whether the vulnerable dependency is direct or transitive.",
            "Use the package manager's supported update workflow.",
            "Run unit, integration, and compatibility tests.",
          ],
          recovery:
            "Update the dependency constraint and lockfile, rebuild the image, and rescan the resulting digest.",
        },
        {
          ecosystem: "Java / Maven",
          checks: [
            "Inspect pom.xml and dependency tree.",
            "Identify direct and transitive dependency paths.",
            "Check supported patched versions and framework compatibility.",
          ],
          recovery:
            "Update the managed dependency version or dependency management configuration, rebuild, test, and rescan.",
        },
        {
          ecosystem: "Python",
          checks: [
            "Inspect requirements files, constraints, lockfiles, or pyproject configuration.",
            "Check which package version is installed in the final image.",
            "Review dependency compatibility and the supported release.",
          ],
          recovery:
            "Update the dependency declaration and lockfile, rebuild the image, test, and rescan.",
        },
        {
          ecosystem: "Go",
          checks: [
            "Inspect go.mod and go.sum.",
            "Identify vulnerable modules and the dependency path.",
            "Check supported module updates and Go toolchain compatibility.",
          ],
          recovery:
            "Update the required module and lock data, rebuild the binary and image, and rescan.",
        },
      ],
      warning:
        "These are ecosystem-specific investigation patterns. Exact commands depend on the repository, package manager, lockfile, and supported toolchain.",
    },

    {
      step: 8,
      title: "Build and scan the corrected image",
      procedure: [
        "Update the base image, OS package, application dependency, or manually installed binary.",
        "Commit the change and lockfile updates.",
        "Build the image through the approved CI workflow.",
        "Record the source commit, build run, base-image digest, and final image digest.",
        "Scan the newly built image using the approved scanner and policy.",
        "Compare the before-and-after findings for the affected CVE.",
        "Check for newly introduced vulnerabilities and unexpected package changes.",
        "Run unit, integration, security, and application health tests.",
        "Publish the image to the approved registry only after required checks pass.",
        "Promote the same immutable artifact to staging and production.",
      ],
      commands: [
        {
          command:
            "docker build -t registry.example.com/team/api:remediated-CHANGE_ID .",
          purpose:
            "Build a candidate image using a unique candidate tag in the approved build environment.",
        },
        {
          command:
            "docker image inspect registry.example.com/team/api:remediated-CHANGE_ID",
          purpose: "Inspect candidate image metadata.",
        },
        {
          command:
            "trivy image --scanners vuln --severity HIGH,CRITICAL registry.example.com/team/api:remediated-CHANGE_ID",
          purpose: "Rescan the candidate image before promotion.",
        },
      ],
      caveat:
        "Example commands are templates. A production pipeline should push, scan, and promote the exact approved artifact; avoid rebuilding independently for each environment.",
    },

    {
      step: 9,
      title: "Verify the registry artifact and digest",
      commands: [
        {
          command:
            "docker image ls --digests registry.example.com/team/api",
          purpose:
            "Inspect available local image digest metadata.",
        },
        {
          command:
            "docker pull registry.example.com/team/api:remediated-CHANGE_ID",
          purpose:
            "Pull the candidate from the registry using approved authentication.",
        },
        {
          command:
            "docker image inspect registry.example.com/team/api:remediated-CHANGE_ID",
          purpose:
            "Inspect the pulled image metadata after publishing.",
        },
      ],
      checks: [
        "The published digest matches the artifact that passed scanning.",
        "The registry tag has not been moved unexpectedly.",
        "The image architecture matches the deployment target.",
        "The registry and repository are the expected ones.",
        "The artifact signature or provenance is verified where required.",
        "The production promotion process refers to the approved artifact.",
      ],
      decisions: [
        {
          if: "The published digest differs from the tested digest",
          then:
            "Stop promotion and investigate whether the image was rebuilt, mutated, or pushed from a different source.",
        },
        {
          if: "The image is missing from the registry",
          then:
            "Check the build/push workflow, registry permissions, and artifact retention.",
        },
        {
          if: "Signature or provenance verification fails",
          then:
            "Follow the supply-chain security process. Do not bypass required verification just to deploy.",
        },
      ],
      note:
        "Image digests identify specific image content. Tags are convenient names but can be reassigned. Prefer digest-based promotion where the platform and release process support it.",
    },

    {
      step: 10,
      title: "Deploy safely to Kubernetes",
      commands: [
        {
          command:
            "kubectl -n production rollout status deployment/api",
          purpose: "Observe the rollout of the target Deployment.",
        },
        {
          command:
            "kubectl -n production rollout history deployment/api",
          purpose: "Review rollout revisions.",
        },
        {
          command:
            "kubectl -n production get deployment api -o yaml",
          purpose:
            "Inspect the Deployment specification. Review output before sharing because configuration may expose sensitive operational details.",
        },
        {
          command:
            "kubectl -n production get pods -o wide",
          purpose: "Observe rollout distribution and Pod readiness.",
        },
      ],
      deploymentChecks: [
        "The approved image reference is present in the workload template.",
        "The new Pods become Ready.",
        "Readiness and liveness probes behave correctly.",
        "The workload uses the expected digest.",
        "No old ReplicaSet or stale workload remains unintentionally active.",
        "Autoscaling and restart behavior do not reintroduce an old image.",
        "Service endpoints route traffic to healthy replicas.",
        "Application latency and error rates remain within acceptable limits.",
      ],
      decisions: [
        {
          if: "The rollout is stuck",
          then:
            "Inspect Pod events, image pull errors, readiness probes, resource limits, admission decisions, and application startup logs.",
        },
        {
          if: "New Pods use the wrong image",
          then:
            "Check the applied workload template, GitOps reconciliation, registry digest, and admission-time image mutation.",
        },
        {
          if: "The new image causes application failures",
          then:
            "Follow the approved rollback or forward-fix procedure and verify the security impact of any rollback image.",
        },
      ],
      safety:
        "Do not assume that restarting Pods changes their image. Workload templates and image references must be updated correctly.",
    },

    {
      step: 11,
      title: "Check why a vulnerable image remains in production",
      checks: [
        "Deployment references an old image tag or digest.",
        "GitOps reconciles the cluster back to the old manifest.",
        "A StatefulSet or DaemonSet has a separate image reference.",
        "A scheduled Job or CronJob still uses the vulnerable image.",
        "Autoscaling creates Pods from an outdated template.",
        "An old ReplicaSet remains available for rollback.",
        "A second cluster or region was omitted from remediation.",
        "A registry tag moved but the workload still references a digest.",
        "A build pipeline rebuilt the image but deployment promoted a different artifact.",
        "An admission controller or deployment tool rewrites image references.",
      ],
      commands: [
        {
          command: "kubectl get deployments,statefulsets,daemonsets,jobs,cronjobs -A",
          purpose:
            "Inventory common workload types that may still reference old images.",
        },
        {
          command: "kubectl get replicasets -A",
          purpose:
            "Inspect ReplicaSets that may retain previous Pod templates.",
        },
        {
          command: "kubectl get events -A --sort-by=.lastTimestamp",
          purpose:
            "Inspect recent cluster events for rollout or admission problems.",
        },
      ],
      decisions: [
        {
          if: "GitOps reverts the change",
          then:
            "Update the source-of-truth repository and let the approved reconciler apply the desired state.",
        },
        {
          if: "A scheduled workload uses the vulnerable image",
          then:
            "Update its own template and inspect existing or queued Jobs according to operational policy.",
        },
        {
          if: "Multiple clusters are affected",
          then:
            "Coordinate a controlled multi-cluster rollout and track completion per cluster and region.",
        },
      ],
    },

    {
      step: 12,
      title: "Handle unfixed vulnerabilities and false positives",
      checks: [
        "Verify the exact package version and relevant advisory.",
        "Check the operating system vendor's security release and backport notes.",
        "Confirm whether the component is included in the deployed image.",
        "Assess runtime exposure and whether vulnerable functionality is reachable.",
        "Check whether a mitigation exists and whether it is effective.",
        "Review supported VEX or ignore mechanisms and organizational exception policy.",
      ],
      decisions: [
        {
          if: "No fixed package is available",
          then:
            "Evaluate supported alternatives, mitigation, exposure reduction, and a documented time-bound exception if approved.",
        },
        {
          if: "A vendor backported the security fix",
          then:
            "Collect vendor advisory evidence and validate the actual installed package release before requesting a false-positive disposition.",
        },
        {
          if: "The finding is confirmed false positive",
          then:
            "Use a narrow, reviewed suppression or VEX disposition supported by the installed tooling and internal policy.",
        },
        {
          if: "The finding remains uncertain",
          then:
            "Keep the risk open, collect more evidence, and escalate to the package owner or security team.",
        },
      ],
      exceptionRequirements: [
        "Affected image digest and vulnerability identifier.",
        "Technical justification and supporting evidence.",
        "Risk owner and approving security authority.",
        "Compensating controls and monitoring.",
        "Expiry date and reassessment trigger.",
        "Documented plan for remediation or review.",
      ],
      warning:
        "Do not suppress all vulnerabilities for a package or severity level to bypass the gate. A suppression must not replace an assessment of actual production risk.",
    },

    {
      step: 13,
      title: "Investigate image supply-chain integrity",
      checks: [
        "Verify the registry, repository, tag, and digest.",
        "Check the expected source commit and build workflow.",
        "Inspect artifact provenance or attestations where available.",
        "Verify image signatures when required by policy.",
        "Check who can push or overwrite release tags.",
        "Review recent unexpected registry changes.",
        "Confirm that deployment references an approved artifact.",
        "Check whether the base image came from an approved source.",
      ],
      decisions: [
        {
          if: "The image digest is unexpected",
          then:
            "Pause promotion, preserve metadata and audit logs, and investigate the build and registry chain.",
        },
        {
          if: "Signature verification fails",
          then:
            "Follow the organization's integrity verification and incident response procedure.",
        },
        {
          if: "Unauthorized image replacement is suspected",
          then:
            "Escalate to security, restrict affected publication paths as approved, and preserve evidence.",
        },
      ],
    },

    {
      step: 14,
      title: "Investigate deployment policy and admission controls",
      checks: [
        "Review image vulnerability thresholds configured in the release pipeline.",
        "Check whether the policy evaluates the same digest that will be deployed.",
        "Inspect admission controller decisions and policy events.",
        "Verify signature, provenance, and registry requirements where configured.",
        "Check whether exceptions are scoped to the correct workload and image.",
        "Confirm that protected production branches require the security checks.",
      ],
      decisions: [
        {
          if: "A vulnerable image bypasses CI",
          then:
            "Review workflow conditions, branch protection, failure semantics, artifact promotion, and exception rules.",
        },
        {
          if: "Admission rejects a patched image",
          then:
            "Inspect the exact policy violation, report age, digest mapping, and policy version before changing policy.",
        },
        {
          if: "An emergency release needs an exception",
          then:
            "Use the documented approval path, narrow the scope, add an expiry, and preserve compensating controls.",
        },
      ],
    },

    {
      step: 15,
      title: "Root-cause isolation matrix",
      rootCauseMatrix: [
        {
          symptom: "Vulnerabilities appeared after a base-image update",
          likelyCauses: [
            "New packages introduced",
            "Updated advisory data",
            "Different OS release",
            "Different image digest",
          ],
          evidence:
            "Base-image digest, package inventory, DB context, and before/after reports.",
          fix:
            "Select a supported patched base image, rebuild, test, and rescan.",
        },
        {
          symptom: "A fix was built but production remains vulnerable",
          likelyCauses: [
            "Wrong digest promoted",
            "GitOps reverted the manifest",
            "Old workload template",
            "Partial multi-cluster rollout",
          ],
          evidence:
            "Runtime image IDs, deployment templates, GitOps revision, and rollout status.",
          fix:
            "Promote the verified artifact and update every affected workload through the approved process.",
        },
        {
          symptom: "Scanner reports a CVE after an upgrade",
          likelyCauses: [
            "Wrong dependency version",
            "Transitive dependency remains",
            "Final image uses old package",
            "Vendor advisory or detection nuance",
          ],
          evidence:
            "Final image package inventory, dependency tree, installed package version, and advisory.",
          fix:
            "Correct the dependency path or verify vendor fix evidence before considering a disposition.",
        },
        {
          symptom: "A tag points to a different image",
          likelyCauses: [
            "Tag was overwritten",
            "Builds raced",
            "Different architecture manifest",
            "Wrong registry or repository",
          ],
          evidence:
            "Registry digest, build metadata, platform, and artifact provenance.",
          fix:
            "Promote the intended digest and restrict tag mutation where appropriate.",
        },
        {
          symptom: "The pipeline blocks after DB refresh",
          likelyCauses: [
            "New CVE published",
            "Severity source changed",
            "New package discovered",
            "Policy threshold changed",
          ],
          evidence:
            "Previous and current reports, scanner version, DB context, and policy diff.",
          fix:
            "Validate the new findings and remediate or handle them through approved risk policy.",
        },
        {
          symptom: "No findings are reported unexpectedly",
          likelyCauses: [
            "Wrong scan target",
            "Scanner configuration changed",
            "Filters or ignores are too broad",
            "Report artifact is stale or incomplete",
          ],
          evidence:
            "Command, image digest, scanner settings, report metadata, and expected package inventory.",
          fix:
            "Restore the intended scan coverage and verify the resulting report.",
        },
      ],
    },

    {
      step: 16,
      title: "Safe recovery and rollback",
      procedure: [
        "Confirm the affected artifact and the production blast radius.",
        "Preserve the vulnerable image digest, scan report, and deployment metadata.",
        "Choose the minimal supported remediation for the affected package or base image.",
        "Build a new image from reviewed source and dependency changes.",
        "Run security, compatibility, and application tests.",
        "Verify the new image digest and scan report.",
        "Promote the same artifact through the approved release process.",
        "Deploy in stages and monitor readiness, errors, and latency.",
        "Verify the runtime digest on affected workloads.",
        "Close the incident only after remediation evidence and risk disposition are recorded.",
      ],
      rollbackRules: [
        "Rollback is not automatically safe: a previous image may contain the same or worse vulnerabilities.",
        "Compare the proposed rollback image's security status before using it.",
        "If no safe image is available, consult incident command and security for containment or mitigation options.",
        "Do not remove a vulnerable image from every registry location until retention, forensics, and rollback needs have been assessed.",
        "If exploitation is suspected, follow the incident response plan rather than treating a rebuild as the only required action.",
      ],
    },

    {
      step: 17,
      title: "Post-recovery validation",
      checklist: [
        "The vulnerable package is fixed, removed, or formally dispositioned.",
        "The new image has a recorded immutable digest.",
        "The scan report corresponds to that exact digest.",
        "The intended vulnerability policy passes.",
        "No new unacceptable findings were introduced.",
        "The same artifact was promoted to production.",
        "All relevant workloads, clusters, regions, and scheduled jobs were checked.",
        "Runtime Pods use the expected image.",
        "Readiness, error rate, latency, and business transactions are healthy.",
        "Admission and signature policies remain enabled.",
        "Any exception has an owner, rationale, compensating controls, and expiry.",
        "Monitoring and future rescanning are configured.",
        "The incident report and follow-up actions are complete.",
      ],
    },
  ],

  commandReference: {
    productionInventory: [
      "kubectl config current-context",
      "kubectl -n production get deployments",
      "kubectl -n production get pods -o wide",
      "kubectl get deployments,statefulsets,daemonsets,jobs,cronjobs -A",
      "kubectl get replicasets -A",
    ],
    imageAndScan: [
      "trivy --version",
      "trivy image --scanners vuln --severity HIGH,CRITICAL registry.example.com/team/api@sha256:REPLACE_WITH_DIGEST",
      "trivy image --scanners vuln --format json --output report.json registry.example.com/team/api@sha256:REPLACE_WITH_DIGEST",
      "docker image inspect registry.example.com/team/api:release-tag",
      "docker image ls --digests registry.example.com/team/api",
    ],
    rollout: [
      "kubectl -n production rollout status deployment/api",
      "kubectl -n production rollout history deployment/api",
      "kubectl -n production get pods -o wide",
    ],
    cautions: [
      "Use actual approved image references and digests; examples are placeholders.",
      "Check the installed Trivy version and its help output before relying on specific options.",
      "Kubernetes runtime image IDs can differ in representation across container runtimes.",
      "A Docker image history is not a complete SBOM or proof of package inventory.",
      "Do not print Kubernetes Secret data or CI credentials during troubleshooting.",
    ],
  },

  prevention: {
    buildSecurity: [
      "Use supported, maintained base images.",
      "Pin base images by approved version or digest where practical.",
      "Update OS packages and application dependencies through reproducible builds.",
      "Maintain dependency lockfiles and review transitive dependency changes.",
      "Use multi-stage builds to keep unnecessary build tools out of runtime images.",
      "Avoid including package managers and diagnostic tools in production images when not required.",
      "Rebuild images regularly to consume vendor security updates.",
      "Record source commit, build metadata, image digest, and provenance.",
    ],
    releaseSecurity: [
      "Scan the exact artifact that will be deployed.",
      "Promote the same immutable digest across environments.",
      "Enforce severity policy in protected release workflows.",
      "Require the expected scan report and prevent execution failures from silently passing.",
      "Verify signatures or provenance when required by policy.",
      "Use admission policies to restrict unapproved images where supported.",
      "Monitor exceptions and require expiry dates.",
    ],
    runtimeSecurity: [
      "Maintain an inventory of running image digests.",
      "Monitor deployed images against new vulnerability advisories.",
      "Use least-privilege workload identities and container permissions.",
      "Avoid privileged containers unless explicitly justified.",
      "Restrict unnecessary network access.",
      "Maintain a tested rollout and rollback process.",
      "Regularly verify that all clusters and scheduled workloads use approved images.",
    ],
    monitoring: [
      "Alert on new critical vulnerabilities in production artifacts.",
      "Track remediation SLA and exception age.",
      "Monitor image age and unsupported base-image versions.",
      "Detect unapproved image digests and unexpected registry changes.",
      "Track the difference between scanned and deployed digests.",
      "Alert on admission policy bypasses and skipped security jobs.",
      "Monitor incomplete rollouts and old ReplicaSets that retain vulnerable images.",
    ],
  },

  incidentReportTemplate: {
    title: "Vulnerable Container Image Incident Report",
    fields: [
      "Incident ID, severity, and owner",
      "Discovery, mitigation, and recovery times in UTC",
      "Affected service, environment, cluster, namespace, and business impact",
      "Image repository, tag, and immutable digest",
      "CVE identifiers and package versions",
      "Scanner version, DB context, and scan report",
      "Exploitability, exposure, and affected runtime components",
      "Confirmed root cause and supporting evidence",
      "Corrective change and new image digest",
      "Build, test, scan, and deployment results",
      "Runtime verification and rollback assessment",
      "Exception details and security approval if applicable",
      "Prevention actions, owners, and deadlines",
    ],
  },

  handsOnLabs: [
    {
      title: "Lab 1 — Identify the running image",
      tasks: [
        "Inspect a test Kubernetes workload.",
        "Record the requested image and runtime image ID.",
        "Compare the result with a known scan report.",
        "Explain why image tags alone may be insufficient for artifact identity.",
      ],
    },
    {
      title: "Lab 2 — Scan a vulnerable test image",
      tasks: [
        "Use an approved disposable test image.",
        "Run a Trivy vulnerability scan.",
        "Record CVE, package, installed version, fixed version, and severity source.",
        "Decide remediation priority using exposure and exploitability.",
      ],
    },
    {
      title: "Lab 3 — Fix a base-image vulnerability",
      tasks: [
        "Update an approved test Dockerfile base image.",
        "Build a candidate image.",
        "Scan and compare reports.",
        "Record the new digest and validate application behavior.",
      ],
    },
    {
      title: "Lab 4 — Verify artifact promotion",
      tasks: [
        "Build and scan a candidate image.",
        "Publish it to a test registry.",
        "Compare the published digest with the scanned digest.",
        "Promote the same artifact to a test deployment.",
      ],
    },
    {
      title: "Lab 5 — Diagnose stale Kubernetes workloads",
      tasks: [
        "Deploy a test workload using a disposable old image.",
        "Update the workload to a verified patched image.",
        "Observe rollout status and runtime image IDs.",
        "Check whether any test scheduled workloads still reference the old image.",
      ],
    },
  ],

  interviewQuestions: [
    {
      question: "Why should a production image be scanned by digest?",
      answer:
        "Tags can be reassigned, while a digest identifies specific image content. Digest-based verification helps prove that the artifact scanned is the artifact deployed.",
    },
    {
      question: "What is the difference between an OS package CVE and an application dependency CVE?",
      answer:
        "An OS package vulnerability is assessed against the operating system vendor's package and advisory data. An application dependency vulnerability is assessed against the relevant language ecosystem and dependency version. Their remediation paths can differ.",
    },
    {
      question: "Why can a vendor package be fixed even if its version looks older than upstream?",
      answer:
        "Distributions may backport security patches without adopting the upstream version number. The vendor's package release and advisory must be checked.",
    },
    {
      question: "Why does a fixed image sometimes not reach production?",
      answer:
        "The wrong digest may have been promoted, the workload manifest may remain old, GitOps may revert the change, or the rollout may be incomplete.",
    },
    {
      question: "What is an SBOM and what does it prove?",
      answer:
        "An SBOM describes software components associated with an artifact. It helps inventory and vulnerability analysis but does not independently prove the image is secure or vulnerability-free.",
    },
    {
      question: "How do you prioritize a critical CVE?",
      answer:
        "Check advisory accuracy, exploitability, exposure, runtime reachability, asset criticality, available fixes, and the organization's risk policy.",
    },
    {
      question: "What should you do when no patched version exists?",
      answer:
        "Assess mitigations, reduce exposure, consider supported alternatives, monitor advisory updates, and use a documented time-bound exception only with appropriate approval.",
    },
    {
      question: "Why is rebuilding an image better than changing a running container?",
      answer:
        "Rebuilding produces a reproducible artifact that can be tested, scanned, promoted, and traced. Manual runtime changes are difficult to reproduce and may disappear when containers are replaced.",
    },
    {
      question: "How can Kubernetes keep running an old image?",
      answer:
        "The workload template may still reference the old image, a rollout may be incomplete, a controller may revert changes, or another workload may not have been updated.",
    },
    {
      question: "How do you prevent a vulnerable image from being deployed?",
      answer:
        "Scan the exact artifact, enforce security gates in protected pipelines, verify provenance where required, use admission policies, and monitor deployed image digests.",
    },
    {
      question: "Is rolling back always safe during a vulnerability incident?",
      answer:
        "No. The previous image may contain the same or worse vulnerabilities. Evaluate its security status and follow incident and change-management policy before rollback.",
    },
    {
      question: "What evidence closes a vulnerable-image incident?",
      answer:
        "The confirmed root cause, fixed or approved disposition, scan report tied to the new digest, successful deployment, runtime digest verification, health validation, and documented prevention actions.",
    },
  ],

  completionChecklist: [
    "Affected production workloads are identified.",
    "The exact running image digest is recorded.",
    "The scan result is reproduced with known scanner context.",
    "The vulnerability and package source are classified.",
    "Risk is prioritized using exposure and exploitability.",
    "A supported remediation or approved exception is selected.",
    "The candidate image is rebuilt, tested, and rescanned.",
    "The published artifact digest matches the scanned artifact.",
    "The approved artifact is deployed to all affected workloads.",
    "Runtime image IDs and application health are verified.",
    "Security policies and admission controls remain active.",
    "Incident report, monitoring, and prevention actions are complete.",
  ],

  officialReferences: [
    {
      title: "Trivy Vulnerability Scanning",
      url: "https://trivy.dev/docs/latest/scanner/vulnerability/",
      use:
        "Supported package types, vulnerability detection, severity sources, and package-detection behavior.",
    },
    {
      title: "Kubernetes Container Images",
      url: "https://kubernetes.io/docs/concepts/containers/images/",
      use:
        "Image tags, digests, imagePullPolicy, image pulling, and ImagePullBackOff.",
    },
    {
      title: "Docker Image Digests",
      url: "https://docs.docker.com/dhi/explore/security-concepts/digests/",
      use:
        "Understanding immutable image identifiers and artifact consistency.",
    },
    {
      title: "Docker Image Pull",
      url: "https://docs.docker.com/reference/cli/docker/image/pull/",
      use: "Pulling images by tag or digest.",
    },
    {
      title: "Docker Image Listing",
      url: "https://docs.docker.com/reference/cli/docker/image/ls/",
      use: "Inspecting local images and digest metadata.",
    },
    {
      title: "NIST National Vulnerability Database",
      url: "https://nvd.nist.gov/",
      use:
        "Additional vulnerability identifiers, references, and available analysis; verify affected products and vendor guidance too.",
    },
    {
      title: "OWASP DevSecOps Guideline",
      url: "https://owasp.org/www-project-devsecops-guideline/",
      use: "Integrating security controls into the software delivery lifecycle.",
    },
  ],
} as const;

export default vulnerableImagesGuide;
