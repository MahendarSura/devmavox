
export const failedScansGuide = {
  title: "Failed Security Scans - Production Troubleshooting",
  category: "Security",
  summary:
    "Diagnose failed, incomplete, stale, or policy-blocked security scans across CI/CD, source code, dependencies, containers, infrastructure, and cloud workloads.",

  incidentScenario: {
    title: "Production deployment blocked because the security scan failed",
    symptoms: [
      "A deployment pipeline suddenly starts failing at the security scanning stage.",
      "A scanner exits with a non-zero status even though no vulnerabilities are visible.",
      "The vulnerability database cannot be downloaded.",
      "The scan times out or runs out of memory or disk space.",
      "A code-scanning job reports that no source code was analyzed.",
      "The report is empty, stale, incomplete, or missing expected languages and targets.",
      "A scan succeeds locally but fails on the CI runner.",
      "A pipeline incorrectly passes because scanner failures are ignored.",
      "A new policy threshold blocks a previously successful release.",
      "Registry authentication, proxy, TLS, API rate limits, or permissions prevent scanning.",
    ],
    businessImpact: [
      "Production releases may be delayed or blocked.",
      "A fail-open pipeline may deploy an artifact without valid security evidence.",
      "An incomplete scan may hide vulnerabilities in unscanned components.",
      "Repeated retries may increase CI costs and overload shared scanners.",
      "A rushed policy bypass may create an undocumented security exception.",
      "An unverified report may create false confidence in release safety.",
    ],
    firstPrinciple:
      "A failed scan is not the same as a vulnerability finding. A successful process is not necessarily a complete scan, and a clean report is not proof that every intended target was analyzed.",
  },

  severityAndImpact: {
    sev1: [
      "A critical production release is proceeding without required security checks and there is evidence of active exploitation or a serious exposure.",
      "A broad security-control failure affects multiple production pipelines and cannot be contained.",
      "Scanner failures are silently treated as successful security approvals for high-risk deployments.",
    ],
    sev2: [
      "A production deployment is blocked by a widespread scanner, identity, or database failure.",
      "Required scan coverage is incomplete for a critical application or container image.",
      "The security gate cannot establish whether the release meets the required policy.",
    ],
    sev3: [
      "A non-production scan fails on a reproducible configuration issue.",
      "A local scan fails while protected production gates remain healthy.",
      "A confirmed false positive or approved policy exception requires review.",
    ],
    assessment: [
      "Determine the number of affected repositories, teams, environments, and release pipelines.",
      "Identify whether a deployment is blocked, already running, or already exposed to users.",
      "Determine whether the scanner failed before analysis, during analysis, or after findings were generated.",
      "Check whether the last successful report belongs to the exact commit and artifact being deployed.",
      "Assess whether an existing bypass or fallback allowed an unscanned artifact to reach production.",
    ],
  },

  safetyChecks: [
    "Confirm repository, commit SHA, workflow run ID, branch, environment, and target artifact digest.",
    "Confirm the correct scanner, version, configuration, ruleset, policy threshold, and expected scan scope.",
    "Preserve job logs, exit codes, timestamps, report metadata, and the last known successful run.",
    "Do not print access tokens, registry credentials, private source code, or secret-bearing environment variables into logs.",
    "Do not disable required security gates simply to unblock a release.",
    "Do not upgrade, downgrade, or replace scanner versions without checking compatibility and reproducibility.",
    "Do not clear caches or delete artifacts before determining whether they contain useful diagnostic evidence.",
    "Confirm production changes and emergency exceptions follow the organization's approval process.",
    "Use a trusted runner and approved credentials; do not execute unknown scripts from an untrusted pull request.",
    "If a scan is incomplete, treat coverage as unknown rather than interpreting missing findings as zero vulnerabilities.",
  ],

  evidenceCollection: {
    pipeline: [
      "Workflow run ID, job ID, step name, runner image, actor, trigger event, and timestamps.",
      "Exit code, signal, cancellation reason, timeout, and retry history.",
      "Commit SHA, branch, pull request, release tag, and workflow revision.",
      "Relevant pipeline changes, scanner configuration changes, and policy updates.",
      "Whether later deployment steps executed despite the scan failure.",
    ],
    scanner: [
      "Scanner name and exact version.",
      "Effective command, configuration file path, enabled scanners, rulesets, and exclusions.",
      "Target path, package manifests, source languages, image digest, and scanned file counts.",
      "Report format, report creation time, report status, and completeness indicators.",
      "Vulnerability database version, update timestamp, and scanner asset versions where supported.",
      "Resource usage, scan duration, concurrency, cache location, and temporary directory capacity.",
    ],
    infrastructure: [
      "Runner OS, CPU, memory, disk space, temporary directory, and container runtime health.",
      "DNS resolution, proxy configuration, TLS certificate chain, and registry connectivity.",
      "Authentication principal, permission scope, token expiry, and API rate-limit responses.",
      "Registry image digest, tag resolution, and artifact availability.",
      "Concurrent scanner processes, cache locks, and shared filesystem behavior.",
    ],
    securityPolicy: [
      "Severity thresholds, fail-on-findings settings, ignore rules, suppression expiry, and baseline configuration.",
      "Whether the report was generated from the exact source revision and artifact digest.",
      "Required language, dependency, image, IaC, secret, and configuration coverage.",
      "Any manual approval, exception, or push-protection bypass.",
    ],
    evidenceHandling: [
      "Use restricted storage for reports that contain source paths, package details, or sensitive metadata.",
      "Redact tokens, authorization headers, private registry credentials, and sensitive request data.",
      "Record evidence timestamps in UTC and correlate them with deployment events.",
      "Preserve the original failure output before changing scanner configuration.",
      "Avoid collecting full debug traces if they could expose credentials or proprietary data.",
    ],
  },

  diagnosticWorkflow: [
    {
      step: 1,
      name: "Establish the failure boundary",
      checks: [
        "Identify the exact failed job and step.",
        "Read the first meaningful error before the final generic pipeline failure.",
        "Record the process exit code and whether the scanner actually started.",
        "Determine whether the failure is a tool error, policy rejection, runner termination, or external service error.",
      ],
      commands: [
        "git status --short",
        "git rev-parse HEAD",
        "git log -1 --format='%H %cI %s'",
        "trivy --version",
      ],
      decision:
        "If the scanner did not start, investigate installation, runtime, permissions, and configuration. If analysis completed and the policy rejected findings, investigate the report and policy separately.",
      note:
        "Commands are examples for a local checkout. Run equivalent read-only checks in the actual CI runner. Use scanner-specific version commands for other tools.",
    },
    {
      step: 2,
      name: "Validate the target and scan scope",
      checks: [
        "Confirm the working directory and expected repository checkout.",
        "Confirm that dependency manifests, lockfiles, source files, Dockerfiles, and IaC files are present.",
        "Verify the image digest or immutable artifact identifier instead of trusting a mutable tag alone.",
        "Check configured exclusions, ignore files, monorepo paths, and language selection.",
        "Compare scanned file counts and languages with the last known good run.",
      ],
      commands: [
        "pwd",
        "git rev-parse --show-toplevel",
        "git ls-files",
        "find . -maxdepth 3 -type f \\( -name 'package.json' -o -name 'pom.xml' -o -name 'go.mod' -o -name 'requirements.txt' -o -name 'Dockerfile' -o -name '*.tf' \\) -print",
      ],
      decision:
        "If expected files or languages are missing, fix checkout, build, path, or scan configuration before interpreting the report.",
      note:
        "The find command is intended for Linux runners. Adapt it for PowerShell or other environments. Avoid commands that dump secret-bearing file contents.",
    },
    {
      step: 3,
      name: "Validate scanner configuration and exit semantics",
      checks: [
        "Check whether the tool's version supports the configured flags and report format.",
        "Confirm the configured exit code for policy violations.",
        "Determine whether a non-zero exit means a finding, runtime error, timeout, or malformed report.",
        "Inspect shell pipelines and error handling for masked exit codes.",
        "Confirm that a missing or empty report cannot be treated as a clean scan.",
      ],
      commands: [
        "trivy fs --help",
        "trivy image --help",
      ],
      decision:
        "If the tool completed with findings, follow the security policy. If the process failed, correct the underlying execution issue. If the report is incomplete, fail the security gate.",
    },
    {
      step: 4,
      name: "Check identity and permissions",
      checks: [
        "Verify that the runner uses the intended service identity.",
        "Check token expiry, registry pull permissions, API scopes, and repository security permissions.",
        "Confirm that forked pull requests or untrusted branches are not given privileged secrets.",
        "Review access-denied responses separately from network and rate-limit errors.",
      ],
      decision:
        "Use the minimum permissions needed for the scan. Refresh or replace credentials through the approved identity workflow; do not paste tokens into commands or logs.",
    },
    {
      step: 5,
      name: "Check network, DNS, proxy, and TLS",
      checks: [
        "Resolve the scanner database, registry, and API hostnames from the runner.",
        "Check proxy variables and approved egress rules.",
        "Verify system time and certificate trust.",
        "Inspect HTTP status codes such as 401, 403, 429, and 5xx.",
        "Check whether the failure affects all runners or one network segment.",
      ],
      commands: [
        "getent hosts ghcr.io",
        "curl -sS -o /dev/null -w '%{http_code}\\n' https://ghcr.io/v2/",
        "date -u",
      ],
      decision:
        "A registry response that requests authentication may still prove basic connectivity. Investigate authentication, rate limits, proxy policy, and TLS trust separately.",
      note:
        "These commands assume a Linux runner with curl and getent. Do not use curl options that disable TLS verification as a production workaround.",
    },
    {
      step: 6,
      name: "Check vulnerability databases and scanner assets",
      checks: [
        "Determine whether database updates completed successfully.",
        "Inspect database age, schema compatibility, download errors, and registry access.",
        "Check whether the runner is using a stale persisted cache.",
        "Review approved mirror, air-gapped, and offline-scanning configuration.",
      ],
      decision:
        "If the database is unavailable or stale beyond policy, do not report the scan as fully current. Restore a trusted database source or follow the formally approved offline procedure.",
      note:
        "Database flags and update behavior vary by scanner and version. Do not skip updates simply to make the pipeline green.",
    },
    {
      step: 7,
      name: "Investigate timeout, memory, disk, and concurrency",
      checks: [
        "Compare scan duration with baseline and configured timeout.",
        "Inspect runner memory pressure, disk space, temporary files, and termination signals.",
        "Check whether multiple processes share a lock-sensitive cache directory.",
        "Determine whether image size, repository size, or language-specific analysis changed.",
        "Check whether a runner was terminated by its orchestrator or CI service.",
      ],
      commands: [
        "df -h",
        "free -h",
        "ps -eo pid,etime,%cpu,%mem,cmd",
        "ulimit -a",
      ],
      decision:
        "Fix the proven resource or concurrency constraint. Increase timeout or runner capacity only after verifying the bottleneck; avoid unlimited retries and indiscriminate cache deletion.",
    },
    {
      step: 8,
      name: "Verify build and language extraction",
      checks: [
        "For compiled languages, confirm that the required build completed.",
        "Review CodeQL or equivalent extraction errors.",
        "Check whether generated code, monorepo modules, or language matrices were omitted.",
        "Compare expected and actual analyzed source counts.",
      ],
      decision:
        "A successful build does not guarantee successful security extraction. Configure the supported build steps and confirm that the intended source was actually analyzed.",
    },
    {
      step: 9,
      name: "Separate findings from execution errors",
      checks: [
        "Validate the report schema and report-generation timestamp.",
        "Inspect vulnerability counts by severity and package or resource.",
        "Compare findings with the configured baseline and ignore rules.",
        "Review newly introduced vulnerabilities separately from existing debt.",
        "Verify suppressions, exception owners, justifications, and expiry dates.",
      ],
      decision:
        "A complete scan that finds policy-blocking issues requires remediation or an approved exception. A failed or partial scan requires execution recovery and a complete rerun.",
    },
    {
      step: 10,
      name: "Recover and verify the gate",
      checks: [
        "Apply the smallest supported fix to the identified failure.",
        "Rerun the scan on the same commit and exact artifact digest.",
        "Verify the report exists, is current, covers expected targets, and has a valid exit status.",
        "Confirm the pipeline blocks deployment on scanner errors and incomplete coverage.",
        "Confirm deployment proceeds only after the required policy passes or an authorized exception is recorded.",
      ],
      decision:
        "Do not close the incident until both scanner execution and security policy enforcement are verified.",
    },
  ],

  commonFailureSignatures: [
    {
      symptom: "Scanner executable not found",
      likelyCauses: [
        "Tool installation step was skipped.",
        "PATH changed between jobs or containers.",
        "Runner image or scanner packaging changed.",
      ],
      diagnostics: [
        "Check the installation step and executable path.",
        "Print the scanner version.",
        "Compare runner image and tool versions with the last successful run.",
      ],
      recovery:
        "Pin or install a supported scanner version in the correct job and verify the binary before scanning.",
    },
    {
      symptom: "Vulnerability database download failed",
      likelyCauses: [
        "Registry or database endpoint unavailable.",
        "Proxy or firewall blocks required traffic.",
        "Expired registry authentication.",
        "Rate limiting or incompatible database schema.",
      ],
      diagnostics: [
        "Review the first download error and HTTP status.",
        "Test DNS and approved endpoint connectivity.",
        "Check registry credentials and database version metadata.",
      ],
      recovery:
        "Restore approved connectivity or authentication, update the trusted database, and rerun the scan.",
    },
    {
      symptom: "HTTP 401 or 403",
      likelyCauses: [
        "Expired token.",
        "Missing repository, registry, or API permission.",
        "Wrong identity or organization policy restriction.",
      ],
      diagnostics: [
        "Identify the exact endpoint and principal.",
        "Check the minimum required permissions and token expiry.",
        "Compare behavior between authorized and unauthorized workflow events.",
      ],
      recovery:
        "Correct the identity or grant only the required permissions. Never solve an authorization failure by exposing a broader token.",
    },
    {
      symptom: "HTTP 429 or rate limit exceeded",
      likelyCauses: [
        "Too many parallel scans.",
        "Shared unauthenticated API quota.",
        "Repeated retries or database refreshes.",
      ],
      diagnostics: [
        "Inspect response headers and retry guidance where available.",
        "Compare failure timestamps across runners.",
        "Measure request volume and retry frequency.",
      ],
      recovery:
        "Use bounded backoff, reduce unnecessary parallel requests, and configure approved authentication or mirrors where supported.",
    },
    {
      symptom: "TLS certificate or connection error",
      likelyCauses: [
        "Incorrect system time.",
        "Missing enterprise CA certificate.",
        "TLS interception or proxy misconfiguration.",
        "DNS or egress issue.",
      ],
      diagnostics: [
        "Check UTC time and certificate trust.",
        "Inspect proxy configuration without revealing credentials.",
        "Compare connectivity from the runner and a trusted control host.",
      ],
      recovery:
        "Correct the trusted CA chain, proxy, DNS, or egress configuration. Do not disable TLS verification.",
    },
    {
      symptom: "Scan timed out",
      likelyCauses: [
        "Large repository or container image.",
        "Slow network or database download.",
        "Resource starvation.",
        "A language-specific analysis step is expensive.",
      ],
      diagnostics: [
        "Compare scan duration and runner utilization.",
        "Separate database download time from analysis time where supported.",
        "Check the tool's timeout and resource limits.",
      ],
      recovery:
        "Optimize target scope without excluding required assets, resolve the bottleneck, and adjust timeout only when justified.",
    },
    {
      symptom: "Out of disk or memory",
      likelyCauses: [
        "Large image layers or temporary extraction.",
        "Oversized report or workspace.",
        "Concurrent scans sharing a small runner.",
        "Cache growth or insufficient runner capacity.",
      ],
      diagnostics: [
        "Inspect filesystem usage, available memory, and runner termination reason.",
        "Measure workspace, cache, and temporary directory sizes.",
        "Compare runner resources with previous successful runs.",
      ],
      recovery:
        "Use an appropriately sized runner, manage caches safely, and reduce unnecessary concurrency.",
    },
    {
      symptom: "Cache lock or database lock",
      likelyCauses: [
        "Concurrent processes sharing a lock-sensitive cache.",
        "A previous process did not terminate cleanly.",
        "A scanner server holds the cache open.",
      ],
      diagnostics: [
        "Inspect running scanner processes.",
        "Identify shared cache paths and job concurrency.",
        "Check the scanner's documented cache backend behavior.",
      ],
      recovery:
        "Serialize access or use supported isolated cache directories or a suitable shared backend. Stop only confirmed stale processes.",
    },
    {
      symptom: "CodeQL reports no source code seen",
      likelyCauses: [
        "Required build steps did not run.",
        "The wrong project or working directory was selected.",
        "Build or language extraction failed.",
        "The configured language matrix omitted a language.",
      ],
      diagnostics: [
        "Review build logs and extraction diagnostics.",
        "Confirm the project files and selected languages.",
        "Compare analyzed source counts with expectations.",
      ],
      recovery:
        "Fix the build and analysis configuration, then verify that the intended source was extracted. Do not interpret this result as a clean code scan.",
    },
    {
      symptom: "Scan completes but CI exits non-zero",
      likelyCauses: [
        "The scanner found vulnerabilities above the configured threshold.",
        "A policy or compliance check failed.",
        "The tool is configured to return a failure code when findings exist.",
      ],
      diagnostics: [
        "Inspect the report and the exact exit-code configuration.",
        "Compare findings with policy thresholds.",
        "Check whether a new rule or baseline change caused the result.",
      ],
      recovery:
        "Remediate the finding or use an authorized, time-limited exception with documented risk acceptance. Do not change the exit code to zero just to pass the pipeline.",
    },
    {
      symptom: "Empty or unexpectedly small report",
      likelyCauses: [
        "Wrong directory or image was scanned.",
        "Exclusions removed required files.",
        "Analysis did not complete.",
        "Report generation or upload failed.",
      ],
      diagnostics: [
        "Verify target identifiers and report timestamps.",
        "Compare file counts, languages, package counts, and image digest.",
        "Check the scanner completion status and upload step.",
      ],
      recovery:
        "Correct the scope or report workflow and require a complete scan before accepting the result.",
    },
    {
      symptom: "Local scan passes but CI fails",
      likelyCauses: [
        "Different tool version or database.",
        "Different permissions, environment variables, or proxy.",
        "Runner resource limits.",
        "Different checkout depth, target path, or policy configuration.",
      ],
      diagnostics: [
        "Compare scanner version, config hash, target digest, and database version.",
        "Compare CI and local scan scope.",
        "Review the first failing step in the CI log.",
      ],
      recovery:
        "Reproduce with a controlled environment matching CI, then fix the environmental difference rather than weakening production policy.",
    },
  ],

  trivyExamples: {
    versionAndHelp: [
      "trivy --version",
      "trivy fs --help",
      "trivy image --help",
    ],
    filesystemScan: {
      command:
        "trivy fs --scanners vuln,misconfig,secret --format json --output trivy-report.json .",
      purpose:
        "Run filesystem scanning and produce a JSON report for inspection.",
      note:
        "Check the installed version for supported scanners and options. The JSON report may contain sensitive file paths or findings and must be protected.",
    },
    imageScan: {
      command:
        "trivy image --format json --output image-report.json registry.example.com/team/app:release",
      purpose:
        "Scan a container image and save structured output.",
      note:
        "Use the approved immutable image digest in release verification where possible. Registry access and scanner flags depend on the environment and installed version.",
    },
    policyGateExample: {
      command:
        "trivy image --exit-code 1 --severity HIGH,CRITICAL registry.example.com/team/app:release",
      purpose:
        "Example of failing the command when findings at configured severities are present.",
      note:
        "Validate the exit-code and severity behavior for the installed version. This is a policy example, not a universal production threshold. Scanner execution errors must also fail the job.",
    },
    cautions: [
      "Do not use --skip-db-update as a blanket workaround for a failed database download.",
      "Do not delete all caches until cache corruption or stale state is supported by evidence.",
      "Do not enable HTTP tracing in production CI; traces may contain sensitive request or response data.",
      "Do not set insecure TLS options to bypass certificate validation.",
      "Use the scanner's version-specific documentation before changing command-line flags.",
    ],
  },

  githubCodeScanning: {
    checks: [
      "Inspect the failed workflow run and identify whether checkout, build, analysis, upload, or policy evaluation failed.",
      "Confirm code-scanning permissions and whether the repository has the required security feature enabled.",
      "For compiled languages, verify that the configured build step successfully compiles and exposes source code for analysis.",
      "Check language matrices, monorepo paths, generated code, and analysis exclusions.",
      "Confirm analysis upload completed and the report corresponds to the intended commit.",
      "Check runner disk and memory capacity when analysis is terminated.",
      "Check whether a transient platform-side error is confirmed by workflow logs or service-status information before retrying.",
    ],
    recoveryRules: [
      "Correct build or extraction errors instead of interpreting missing source as a clean result.",
      "Correct repository permissions instead of granting broad organization-wide access.",
      "Retry transient infrastructure failures only after checking the failed dependency.",
      "Do not allow deployment to bypass a required analysis job because an upload step failed.",
    ],
    officialDocs: [
      "https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors",
      "https://docs.github.com/en/code-security/code-scanning",
    ],
  },

  ciCdGateDesign: {
    requiredStages: [
      "Checkout the exact source revision.",
      "Validate scanner version and configuration.",
      "Resolve trusted scanner databases and required assets.",
      "Run all required scan types against the intended targets.",
      "Validate report existence, schema, freshness, and coverage.",
      "Evaluate findings against the approved policy.",
      "Publish a restricted report and retain the relevant metadata.",
      "Allow deployment only after required checks pass or an approved exception is recorded.",
    ],
    designRules: [
      "Separate scanner execution failure from vulnerability policy failure.",
      "Treat missing reports, invalid JSON, partial analysis, and stale evidence as failures.",
      "Use explicit job dependencies so deployment cannot race ahead of security checks.",
      "Avoid shell constructs that swallow a scanner's exit status.",
      "Do not pipe scanner output through another command without preserving the scanner's exit status.",
      "Keep policy thresholds version-controlled and reviewed.",
      "Require exception owner, justification, scope, expiry, and compensating controls.",
      "Use protected environments and deployment approvals for production.",
      "Keep logs and artifacts restricted and redact sensitive data.",
    ],
    conceptualWorkflow: [
      "checkout",
      "validate-scanner",
      "scan-all-required-targets",
      "validate-report-and-coverage",
      "evaluate-security-policy",
      "publish-evidence",
      "approved-deployment",
    ],
    exampleShell: [
      "set -eu",
      "trivy --version",
      "trivy fs --scanners vuln,misconfig,secret --format json --output trivy-report.json .",
      "test -s trivy-report.json",
    ],
    exampleShellNotes: [
      "This example demonstrates basic failure propagation and a non-empty report check; it is not a complete report-schema or coverage validator.",
      "Add a version-appropriate policy evaluation step and validate the report against the required targets.",
      "If the scan command exits non-zero because findings are present, the shell may stop before report publication. Design the pipeline deliberately so findings and runtime errors are both recorded without allowing deployment to proceed incorrectly.",
      "Use a dedicated report validation step that distinguishes an expected policy rejection from a scanner crash or incomplete scan.",
    ],
  },

  safeRecovery: {
    scannerExecutionFailure: [
      "Preserve logs, exit code, scanner version, target identifier, and report metadata.",
      "Fix the confirmed issue: tool installation, permission, network, database, build, or resource capacity.",
      "Rerun the scan against the same source revision and immutable artifact where possible.",
      "Verify completeness and report freshness.",
      "Re-evaluate the security policy before deployment.",
    ],
    vulnerabilityPolicyFailure: [
      "Confirm the finding is valid and relevant to the deployed artifact.",
      "Prioritize by exploitability, exposure, severity, business impact, and available mitigations.",
      "Upgrade or patch the vulnerable dependency, correct the IaC configuration, or remediate the code.",
      "Rebuild the artifact and rescan the new immutable digest.",
      "If remediation cannot be immediate, use only the formal exception process with an owner and expiry.",
    ],
    suspectedFalsePositive: [
      "Collect the finding identifier, package or code location, version, and supporting evidence.",
      "Check the scanner's advisory, rule documentation, and affected-version range.",
      "Validate the finding using approved methods without disabling the whole scanner.",
      "Apply a narrow suppression only when supported by evidence and policy.",
      "Set an expiry or review date and rescan after relevant tool or rule updates.",
    ],
    incompleteScan: [
      "Identify exactly which targets, languages, packages, or image layers were not analyzed.",
      "Correct scope, extraction, database, or report-generation problems.",
      "Run the missing coverage and the required full scan.",
      "Verify expected coverage counts and the correct commit or artifact digest.",
      "Keep the release blocked until the required scan is complete or a formally authorized exception applies.",
    ],
    emergencyException: [
      "Document why the release is urgent and what security evidence is unavailable.",
      "Identify the exact release, environment, and scope of the exception.",
      "Record approver, expiry, compensating controls, and follow-up owner.",
      "Use a separate protected approval path rather than changing the scanner to always pass.",
      "Complete the missing scan as soon as possible and review the exception afterward.",
    ],
  },

  rootCauseMatrix: [
    {
      rootCause: "Scanner or database service unavailable",
      evidence:
        "Multiple runners fail at the same external dependency with consistent network or service errors.",
      correction:
        "Restore connectivity or approved service access, apply bounded retry, and verify database freshness.",
    },
    {
      rootCause: "Runner resource exhaustion",
      evidence:
        "Out-of-memory, disk-full, timeout, or runner termination events align with the failure.",
      correction:
        "Resize the runner, manage temporary storage, or reduce unnecessary concurrency based on measurements.",
    },
    {
      rootCause: "Incorrect target or exclusion",
      evidence:
        "Scanned files, languages, packages, or artifact digests differ from expectations.",
      correction:
        "Fix checkout, path selection, exclusions, or target identity and confirm coverage.",
    },
    {
      rootCause: "Build or language extraction failure",
      evidence:
        "Build logs or scanner extraction diagnostics show missing source or failed compilation.",
      correction:
        "Correct the build process and supported analysis configuration.",
    },
    {
      rootCause: "Authentication or authorization",
      evidence:
        "The endpoint returns 401 or 403 or the runner uses the wrong identity.",
      correction:
        "Correct credential lifecycle and grant least-privilege access.",
    },
    {
      rootCause: "Policy threshold or baseline change",
      evidence:
        "The scan completes, but findings exceed the configured threshold or differ after a policy update.",
      correction:
        "Review the policy change and findings; remediate or approve a narrow documented exception.",
    },
    {
      rootCause: "Exit code masked by shell or pipeline",
      evidence:
        "The scanner failed but a later command returned success, or deployment continued.",
      correction:
        "Preserve command status, enable correct shell error handling, and test the protected deployment dependency.",
    },
    {
      rootCause: "Stale or invalid report",
      evidence:
        "Report timestamp, commit SHA, artifact digest, schema, or expected coverage does not match.",
      correction:
        "Generate and validate a fresh report and reject stale or incomplete evidence.",
    },
    {
      rootCause: "Scanner version or configuration drift",
      evidence:
        "CI and local versions, flags, rule sets, or policy files differ.",
      correction:
        "Pin supported versions, review configuration changes, and maintain reproducible scan environments.",
    },
  ],

  prevention: {
    engineering: [
      "Pin scanner versions and review upgrades in controlled changes.",
      "Use reproducible runner images and explicitly configured scan targets.",
      "Keep scanner configuration and policy thresholds in version control.",
      "Validate report format, freshness, and coverage in CI.",
      "Maintain separate test cases for scanner execution errors and vulnerability findings.",
      "Use isolated caches or a supported shared backend when concurrent scans require it.",
    ],
    platform: [
      "Monitor runner CPU, memory, disk, temporary storage, network, and job queue delays.",
      "Track scanner success rate, timeout rate, database age, report freshness, and mean recovery time.",
      "Monitor API quotas, registry availability, and security platform incidents.",
      "Maintain a tested offline or mirror strategy where required by the environment.",
      "Retain a last-known-good report for comparison, but never treat it as proof that a new artifact was scanned.",
    ],
    security: [
      "Define fail-closed behavior for required production security gates.",
      "Separate scanner infrastructure errors from policy violations in dashboards and alerts.",
      "Set risk-based remediation SLAs for critical and high findings.",
      "Review suppressions and exceptions periodically and expire them automatically where supported.",
      "Test the emergency exception path and ensure it leaves a complete audit trail.",
      "Run tabletop exercises for scanner outage, incomplete coverage, and false-green deployments.",
    ],
  },

  postRecoveryValidation: [
    "The original failure has a documented root cause supported by evidence.",
    "The scanner starts and completes with the expected version and configuration.",
    "Required targets, languages, packages, and image digest are confirmed.",
    "Database and scanner assets satisfy freshness requirements.",
    "The report is present, valid, current, and securely stored.",
    "Policy evaluation behaves correctly for both clean and vulnerable test fixtures.",
    "Scanner runtime errors cannot be mistaken for a successful security gate.",
    "Deployment is blocked when required checks fail or coverage is incomplete.",
    "A controlled deployment passes only after required checks and approvals succeed.",
    "Monitoring confirms no unscanned artifact bypassed the gate during the incident.",
  ],

  incidentReport: {
    fields: [
      "Incident ID, severity, commander, and affected services",
      "Detection time, failure start, recovery time, and duration",
      "Workflow run ID, commit SHA, target digest, scanner version, and configuration",
      "First meaningful error, exit code, and supporting evidence",
      "Affected repositories, branches, environments, and release windows",
      "Whether deployment was blocked, partially executed, or allowed through",
      "Root cause and contributing factors",
      "Immediate mitigation and permanent corrective action",
      "Report completeness and security-policy verification results",
      "Exception approvals, residual risk, action owners, and due dates",
      "Lessons learned and follow-up validation plan",
    ],
    closureCriteria: [
      "The scanner execution issue is resolved or safely contained.",
      "The required scan is complete for the intended artifact.",
      "The security policy has been evaluated and enforced.",
      "Any release exception is documented, scoped, approved, and time-limited.",
      "No known unscanned artifact has bypassed the required gate without an approved decision.",
      "Preventive actions have owners and verification criteria.",
    ],
  },

  handsOnLabs: [
    {
      title: "Lab 1 - Simulate a scanner execution failure",
      tasks: [
        "Use a disposable repository and a test-only scanner environment.",
        "Simulate a missing executable or invalid configuration.",
        "Capture the exit code and first meaningful error.",
        "Verify that the deployment stage remains blocked.",
      ],
      success:
        "The failure is classified as an execution problem, and no deployment is approved.",
    },
    {
      title: "Lab 2 - Simulate a policy failure",
      tasks: [
        "Use an approved sandbox and a known vulnerable test dependency or fixture.",
        "Run the scanner with a documented test threshold.",
        "Verify that the report is generated and the policy gate rejects the test artifact.",
        "Correct the dependency or configuration and rerun the scan.",
      ],
      success:
        "The team distinguishes a valid policy rejection from a scanner runtime failure.",
    },
    {
      title: "Lab 3 - Simulate incomplete coverage",
      tasks: [
        "Create a test repository with multiple languages or a monorepo layout.",
        "Intentionally omit one required target from the scan configuration.",
        "Compare expected coverage with the generated report.",
        "Update validation so incomplete coverage fails the pipeline.",
      ],
      success:
        "A missing target cannot be misreported as a clean scan.",
    },
    {
      title: "Lab 4 - Simulate an expired registry credential",
      tasks: [
        "Use a disposable registry and a short-lived test identity.",
        "Trigger an authentication failure.",
        "Identify the endpoint, response status, and required permission.",
        "Replace the credential using the approved identity workflow and rerun.",
      ],
      success:
        "Authentication is repaired without exposing tokens or granting unnecessary permissions.",
    },
    {
      title: "Lab 5 - Test a fail-closed deployment gate",
      tasks: [
        "Create a disposable CI workflow with a scan job and a dependent deployment-test job.",
        "Simulate scanner crash, missing report, policy rejection, and successful scan outcomes.",
        "Verify the deployment-test job runs only for the approved outcome.",
        "Test the documented emergency exception path and its audit record.",
      ],
      success:
        "Runtime errors, incomplete scans, and policy violations cannot silently authorize deployment.",
    },
  ],

  interviewQuestions: [
    {
      question: "A security scan failed. Does that mean the application has vulnerabilities?",
      answer:
        "Not necessarily. The scanner may have failed before analysis, timed out, lacked permissions, or encountered a network issue. Inspect the failure stage and report completeness.",
    },
    {
      question: "What is the difference between a scanner error and a policy failure?",
      answer:
        "A scanner error means the tool could not reliably produce the required analysis. A policy failure means the scan produced findings that violate the configured release policy.",
    },
    {
      question: "Why is an empty report not automatically a pass?",
      answer:
        "The wrong target may have been scanned, analysis may be incomplete, exclusions may be excessive, or report generation may have failed.",
    },
    {
      question: "What does fail-closed mean for a security gate?",
      answer:
        "Required deployment remains blocked if the security result is missing, invalid, incomplete, or failing, except through an explicitly authorized exception process.",
    },
    {
      question: "How do you troubleshoot a Trivy database download failure?",
      answer:
        "Inspect the first download error, endpoint connectivity, proxy and TLS configuration, registry authentication, rate limits, and database compatibility. Restore a trusted database source before relying on the scan.",
    },
    {
      question: "Why can CodeQL report that no source code was seen?",
      answer:
        "The expected build may not have run, extraction may have failed, the wrong directory may have been selected, or the language configuration may not cover the source.",
    },
    {
      question: "How do you diagnose a scan that passes locally but fails in CI?",
      answer:
        "Compare tool and database versions, runner resources, permissions, network configuration, checkout depth, target digest, and policy configuration.",
    },
    {
      question: "Should you increase the timeout immediately?",
      answer:
        "No. First determine whether the cause is resource pressure, network delay, a large target, or an unexpectedly expensive analysis step. Adjust the timeout only when evidence supports it.",
    },
    {
      question: "How do you safely handle a false positive?",
      answer:
        "Validate the finding with evidence, use the narrowest supported suppression, record the owner and reason, set a review or expiry date, and keep the rest of the security gate active.",
    },
    {
      question: "How do you prove the deployed artifact was scanned?",
      answer:
        "Bind the scan evidence to the exact commit and immutable artifact digest, verify report freshness and coverage, and ensure the deployment depends on the required successful checks.",
    },
  ],

  officialReferences: [
    {
      title: "Trivy Troubleshooting",
      url: "https://www.trivy.dev/docs/latest/references/troubleshooting/",
    },
    {
      title: "Trivy Cache Configuration",
      url: "https://trivy.dev/docs/latest/guide/configuration/cache/",
    },
    {
      title: "GitHub Code Scanning Analysis Errors",
      url: "https://docs.github.com/en/code-security/reference/code-scanning/troubleshoot-analysis-errors",
    },
    {
      title: "GitHub Code Scanning",
      url: "https://docs.github.com/en/code-security/code-scanning",
    },
    {
      title: "OWASP DevSecOps Guideline",
      url: "https://owasp.org/www-project-devsecops-guideline/",
    },
    {
      title: "OWASP CI/CD Security Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/CI_CD_Security_Cheat_Sheet.html",
    },
    {
      title: "Semgrep Documentation",
      url: "https://semgrep.dev/docs/",
    },
  ],

  completionChecklist: [
    "Correct repository, commit, environment, and target confirmed",
    "Failure stage and exit code identified",
    "Logs and evidence preserved securely",
    "Scanner version and configuration verified",
    "Network, identity, database, and runner resources checked",
    "Expected targets and coverage confirmed",
    "Execution errors distinguished from policy findings",
    "Report freshness, validity, and artifact identity verified",
    "Required security gate enforced",
    "Recovery validated on the correct artifact",
    "Root cause and preventive actions documented",
    "Incident closure approved by the responsible owner",
  ],
} as const;

export default failedScansGuide;
