import type { CicdTopicLesson } from "./cicd-topic-lessons";

function makeLesson(
  overview: string,
  purpose: string,
  architecture: string,
  workflow: string[],
  example: string,
  commands: string[],
  configuration: string,
  failures: string[],
  recovery: string[],
  bestPractices: string[],
  exercise: string
): CicdTopicLesson {
  return {
    overview,
    purpose,
    architecture,
    workflow,
    example,
    commands,
    configuration,
    failures,
    recovery,
    bestPractices,
    exercise
  };
}

export const stageSevenLessonOverrides: Record<string, CicdTopicLesson> = {

  "7|Trivy Fundamentals": makeLesson(
    "Trivy is an open-source security scanner used to inspect container images, filesystems, source repositories, Kubernetes configuration and other supported targets. It can identify operating-system package vulnerabilities, language dependency vulnerabilities, exposed secrets and configuration weaknesses. The scanner uses vulnerability intelligence and configuration checks to report findings with severity and remediation information.",
    "Trivy helps a DevOps team discover security risks before an application is packaged, published or deployed. In a payment-service pipeline, it can prevent a container image with unacceptable critical vulnerabilities or exposed credentials from reaching Amazon ECR and Kubernetes.",
    "Source repository or Docker image → Trivy scanner → vulnerability database and security checks → findings with package, severity and fix information → CI policy evaluation → pass, fail or approved exception.",
    [
      "Select the target to scan, such as a repository, filesystem or image.",
      "Install or use a supported Trivy release.",
      "Ensure the vulnerability database is available and current.",
      "Choose the required scanners and severity levels.",
      "Execute the scan and save machine-readable results when needed.",
      "Review findings and determine their application impact.",
      "Fix vulnerabilities or apply an approved, documented exception.",
      "Run the scan again before promoting the artifact."
    ],
    "The payment-service pipeline scans its source dependencies and final Docker image. A critical vulnerability in an operating-system package is detected before the image is pushed to ECR, so the pipeline blocks promotion until the base image is updated.",
    [
      "trivy --version",
      "trivy fs --scanners vuln,misconfig,secret .",
      "trivy image devmavox/payment-service:1.0.0",
      "trivy repo .",
      "trivy image --format json --output trivy-report.json devmavox/payment-service:1.0.0"
    ],
    "Select scanners explicitly when a predictable scan scope is required. Configure severity filters, report format, ignored findings and exit-code policy deliberately. Keep the scanner version controlled in CI and protect any private registry credentials used for image scanning.",
    [
      "The vulnerability database cannot be downloaded.",
      "The scanner version does not support a requested option.",
      "A private image cannot be pulled.",
      "The scan reports vulnerabilities in an outdated base image.",
      "The pipeline fails because findings exceed the configured severity policy."
    ],
    [
      "Check the installed Trivy version and command help.",
      "Verify network access to the configured database and registry.",
      "Authenticate to the private registry using a protected credential.",
      "Inspect the affected package, installed version and available fixed version.",
      "Update the vulnerable package or base image.",
      "Repeat the scan and verify that the finding is resolved."
    ],
    [
      "Scan source, dependencies and final images at appropriate stages.",
      "Keep Trivy and its vulnerability database updated.",
      "Use severity policies that match release risk.",
      "Store reports as CI artifacts.",
      "Do not suppress findings without a documented reason and owner."
    ],
    "Run Trivy against the payment-service filesystem and Docker image. Save JSON reports, identify one vulnerable package and demonstrate that a policy-controlled pipeline fails when a critical finding is present."
  ),

  "7|Trivy Installation": makeLesson(
    "Trivy installation provides the scanner executable or container image required by the CI environment. It can be installed through supported operating-system packages, release binaries or a container image. The selected installation method should provide a known version and a predictable executable path.",
    "A controlled installation prevents inconsistent scan results caused by different scanner versions on developer machines and Jenkins agents. It also makes pipeline execution reproducible and easier to troubleshoot.",
    "Jenkins agent or developer workstation → approved installation method → Trivy executable or scanner container → vulnerability database access → scan target → report.",
    [
      "Choose the installation method supported by the operating system.",
      "Select an approved Trivy version.",
      "Install the executable or pull the scanner container.",
      "Verify the executable is available in PATH.",
      "Run a version check.",
      "Verify vulnerability database connectivity.",
      "Execute a small test scan."
    ],
    "A Linux Jenkins agent installs a pinned Trivy release during agent image creation. The pipeline verifies the version before scanning the payment-service image, ensuring that all builds use the expected scanner.",
    [
      "trivy --version",
      "trivy --help",
      "which trivy",
      "docker pull aquasec/trivy:latest",
      "docker run --rm aquasec/trivy:latest --version"
    ],
    "For production CI, pin a tested scanner version or immutable container image digest rather than relying on an uncontrolled latest tag. Verify downloaded binaries using the official release verification process. Restrict installation permissions on shared agents.",
    [
      "The Trivy executable is missing from PATH.",
      "The installed version is older than the required feature.",
      "A download fails because of proxy or network restrictions.",
      "The scanner container cannot start.",
      "The agent has insufficient permissions to execute the binary."
    ],
    [
      "Check the executable path and PATH environment variable.",
      "Compare the installed version with the approved version.",
      "Verify proxy, DNS and TLS connectivity.",
      "Inspect container runtime availability and image pull errors.",
      "Reinstall using the approved installation method.",
      "Run the version and test-scan checks again."
    ],
    [
      "Pin scanner versions in build infrastructure.",
      "Verify release checksums or signatures where provided.",
      "Avoid installing tools dynamically in every production build when a controlled agent image is possible.",
      "Keep scanner installation separate from application source code.",
      "Test upgrades before rolling them out to all agents."
    ],
    "Install Trivy on a test Jenkins agent using the approved method. Verify its version, database access and ability to scan a sample filesystem before adding it to the payment-service pipeline."
  ),

  "7|Filesystem Scanning": makeLesson(
    "Filesystem scanning examines files and directories in a checked-out repository or local workspace. Trivy can inspect supported dependency manifests and lock files, configuration files and secrets. The scan can identify vulnerable application dependencies, exposed credentials and certain infrastructure configuration problems without building a container image first.",
    "Filesystem scanning gives developers early feedback while source code is still being changed. It can catch a vulnerable Java dependency or accidentally committed credential before the application is packaged.",
    "Git checkout → Trivy filesystem scanner → manifest, lock-file, secret and configuration inspection → findings → developer remediation → CI policy result.",
    [
      "Check out the repository at the intended commit.",
      "Identify the directories that should be scanned.",
      "Select the required scanners.",
      "Run Trivy filesystem scanning.",
      "Review dependency, secret and configuration findings separately.",
      "Fix the source or configuration problem.",
      "Rerun the scan and archive the report."
    ],
    "The payment-service repository contains a Maven pom.xml and application configuration. A filesystem scan identifies a vulnerable dependency version and a test credential accidentally added to a configuration file before Docker image creation.",
    [
      "trivy fs .",
      "trivy fs --scanners vuln,secret,misconfig .",
      "trivy fs --severity HIGH,CRITICAL .",
      "trivy fs --format json --output filesystem-report.json .",
      "trivy fs --exit-code 1 --severity CRITICAL ."
    ],
    "Set the scan target to the repository root or a deliberately selected directory. Choose scanners and severity filters explicitly. Keep generated build output and unrelated directories out of scope only when justified, and ensure dependency manifests and lock files remain included.",
    [
      "A manifest is not detected because the scan starts in the wrong directory.",
      "A secret finding is missed because secret scanning is disabled.",
      "The report includes unrelated build output.",
      "A scan fails because the vulnerability database is unavailable.",
      "A critical finding is reported but the pipeline does not fail."
    ],
    [
      "Verify the working directory and repository checkout.",
      "Check the selected scanner types and target paths.",
      "Inspect Trivy debug output for skipped files when necessary.",
      "Verify database availability.",
      "Set an explicit exit-code policy for blocking findings.",
      "Rerun the scan after correcting the source."
    ],
    [
      "Scan the actual commit used by the build.",
      "Enable the scanners required by the security policy.",
      "Keep manifests and lock files in the repository.",
      "Use report artifacts for audit and review.",
      "Avoid broad exclusions that hide application files."
    ],
    "Run filesystem scanning on the payment-service repository. Identify one dependency issue and one controlled secret finding, correct both and verify that the second scan meets the selected policy."
  ),

  "7|Dependency Scanning": makeLesson(
    "Dependency scanning checks third-party libraries used by an application against known vulnerability information. Trivy supports several package ecosystems and reads supported dependency manifests and lock files. For Java projects, Maven dependency information can be used to identify vulnerable libraries and their versions.",
    "Modern applications depend on external libraries for HTTP, database, logging and security functions. A vulnerable transitive dependency can expose the payment-service even when developers did not directly declare that library.",
    "pom.xml and dependency metadata → dependency resolution or manifest analysis → package and version identification → vulnerability database matching → CVE findings → upgrade or mitigation.",
    [
      "Inspect the project's dependency declarations and lock or resolved dependency data.",
      "Run Trivy filesystem dependency scanning.",
      "Identify the package name and installed version.",
      "Review CVE identifiers, severity and fixed-version information.",
      "Trace whether the dependency is direct or transitive.",
      "Update the dependency or its parent dependency management.",
      "Run tests and scan again."
    ],
    "The payment-service directly uses Spring Boot but receives a vulnerable transitive library through another dependency. The team inspects the Maven dependency tree, upgrades the compatible dependency version and validates the application before release.",
    [
      "trivy fs --scanners vuln .",
      "mvn dependency:tree",
      "mvn dependency:tree -Dincludes=org.example:sample-library",
      "mvn clean verify",
      "trivy fs --format json --output dependency-report.json ."
    ],
    "Keep Maven dependency declarations and dependency management under version control. Use compatible patched versions and review the dependency tree before excluding or overriding transitive dependencies. Configure Trivy to scan the relevant manifests and dependency data supported by the selected version.",
    [
      "The vulnerable library is transitive and not obvious in pom.xml.",
      "The scanner cannot identify a dependency because metadata is missing.",
      "A suggested fixed version conflicts with the Spring Boot dependency set.",
      "A dependency update breaks application tests.",
      "A vulnerable dependency remains because an older version is resolved."
    ],
    [
      "Use mvn dependency:tree to locate the dependency path.",
      "Inspect the resolved version and dependency management.",
      "Choose a compatible patched release.",
      "Use a targeted exclusion only when a safe replacement is provided.",
      "Run unit and integration tests.",
      "Rescan the repository and verify the resolved version."
    ],
    [
      "Review direct and transitive dependencies.",
      "Prefer supported patched releases.",
      "Use dependency management to centralize versions.",
      "Avoid arbitrary exclusions without replacement.",
      "Track vulnerability remediation with owners and due dates."
    ],
    "Scan the payment-service Maven project. Use dependency:tree to trace a vulnerable transitive library, update it safely, run tests and confirm the vulnerability no longer appears."
  ),

  "7|Container Image Scanning": makeLesson(
    "Container image scanning examines the packages and configuration inside a built image. Trivy can identify vulnerabilities in operating-system packages and supported application dependencies. It can also inspect image metadata and report findings associated with the image's software contents.",
    "A source repository can be clean while the final image still contains vulnerable operating-system packages or outdated runtime libraries. Scanning the exact image intended for release provides an important final security check.",
    "Dockerfile and application build → image creation → Trivy image scan → package and vulnerability analysis → severity policy → registry promotion or block.",
    [
      "Build the payment-service image using the intended Dockerfile.",
      "Assign a unique build tag.",
      "Scan the exact local image or registry image.",
      "Review operating-system and application package findings.",
      "Identify fixed versions and affected image layers.",
      "Update the base image or application dependencies.",
      "Rebuild and rescan the new image.",
      "Push only the image that passed the required policy."
    ],
    "Jenkins builds devmavox/payment-service:build-125 and scans it before pushing to ECR. The scan identifies a vulnerable operating-system package, so the team updates the base image and rebuilds before registry promotion.",
    [
      "docker build -t devmavox/payment-service:build-125 .",
      "trivy image devmavox/payment-service:build-125",
      "trivy image --severity HIGH,CRITICAL devmavox/payment-service:build-125",
      "trivy image --exit-code 1 --severity CRITICAL devmavox/payment-service:build-125",
      "trivy image --format json --output image-report.json devmavox/payment-service:build-125"
    ],
    "Scan the immutable image identifier used by the release process. Configure severity and exit-code policies explicitly. Use a protected registry credential for private images and retain the scan report with the image digest and build metadata.",
    [
      "The image cannot be found locally.",
      "The private registry denies image access.",
      "The image contains vulnerable base operating-system packages.",
      "The scanner reports an application dependency that was not updated.",
      "The pipeline scans one tag but pushes a different image."
    ],
    [
      "Verify the exact image tag and digest.",
      "Authenticate to the registry using a protected credential.",
      "Inspect the vulnerable package and base image layer.",
      "Update the base image or dependency and rebuild.",
      "Compare the scanned digest with the digest being pushed.",
      "Repeat the scan and retain the new report."
    ],
    [
      "Scan the final image, not only the source repository.",
      "Use maintained and minimal base images.",
      "Pin base images by digest where appropriate.",
      "Keep image tags and digests tied to build metadata.",
      "Block promotion when policy-critical vulnerabilities remain."
    ],
    "Build the payment-service image, scan it with Trivy and save a JSON report. Demonstrate a critical vulnerability blocking the push, update the image and verify the replacement image passes."
  ),

  "7|CVE Database": makeLesson(
    "A CVE is a publicly documented identifier for a known cybersecurity vulnerability. Trivy uses vulnerability intelligence sources and its local database to match installed package names and versions against known issues. Database freshness affects whether newly published vulnerability information is available during a scan.",
    "An accurate and current vulnerability database helps the team make informed release decisions. A scan performed with stale intelligence may not include newly disclosed vulnerabilities affecting the payment-service.",
    "Trivy scanner → local vulnerability database → package and version detection → advisory matching → CVE, severity and fix information → report.",
    [
      "Check the Trivy version.",
      "Allow the scanner to obtain its required vulnerability database.",
      "Run a scan against the selected target.",
      "Review CVE identifiers and affected package versions.",
      "Check the advisory and available fixed version.",
      "Apply the appropriate package update.",
      "Rescan after database and application updates."
    ],
    "The payment-service uses an operating-system package that receives a new CVE advisory. The CI agent refreshes its Trivy database, rescans the image and identifies the newly reported issue before release.",
    [
      "trivy --version",
      "trivy image devmavox/payment-service:1.0.0",
      "trivy image --download-db-only",
      "trivy fs --download-db-only .",
      "trivy image --format json --output cve-report.json devmavox/payment-service:1.0.0"
    ],
    "Use the database update options supported by the installed Trivy release. Configure approved database mirrors when CI agents have restricted internet access. Understand database cache behavior and avoid assuming that every scan automatically downloads a fresh database.",
    [
      "The database download fails because the network is restricted.",
      "The local database is outdated.",
      "A scanner cannot access an approved mirror.",
      "A package is reported with no available fixed version.",
      "Different CI agents produce different results due to different database states."
    ],
    [
      "Check Trivy database update output and cache status.",
      "Verify DNS, proxy and registry access for database sources.",
      "Configure an approved mirror or controlled database refresh process.",
      "Compare scanner and database versions across agents.",
      "Review vendor advisories when no fixed version is available.",
      "Rescan after the database has been refreshed."
    ],
    [
      "Maintain a controlled database refresh strategy.",
      "Record scanner version and scan time with reports.",
      "Use approved mirrors for restricted environments.",
      "Do not interpret absence of a finding as proof of zero risk.",
      "Review vendor advisories for important production packages."
    ],
    "Run a Trivy scan on a sample image and inspect the vulnerability database update behavior. Record the scanner version, CVE identifiers and fixed-version information in the payment-service security report."
  ),

  "7|Severity Classification": makeLesson(
    "Severity classification groups vulnerability findings according to their assessed impact. Trivy commonly reports severity levels such as UNKNOWN, LOW, MEDIUM, HIGH and CRITICAL when available from vulnerability data. Severity is useful for prioritization, but actual business risk also depends on exposure, exploitability, application usage and available mitigations.",
    "A severity policy helps CI pipelines decide which findings require immediate action and which can be tracked for planned remediation. A payment application exposed to the internet may need stricter treatment for exploitable critical issues.",
    "Scanner findings → advisory severity → policy filter → application and exposure assessment → remediation priority → pipeline decision.",
    [
      "Run a scan and collect the full findings report.",
      "Group findings by severity.",
      "Identify the affected component and application exposure.",
      "Check whether a fixed version exists.",
      "Apply the organization's blocking and warning policy.",
      "Document accepted exceptions with owners and expiry dates.",
      "Track remediation and rescan."
    ],
    "The payment-service policy blocks CRITICAL vulnerabilities and requires security review for HIGH findings. MEDIUM findings are recorded with remediation deadlines instead of being ignored.",
    [
      "trivy image --severity CRITICAL devmavox/payment-service:1.0.0",
      "trivy image --severity HIGH,CRITICAL devmavox/payment-service:1.0.0",
      "trivy image --severity UNKNOWN,LOW,MEDIUM,HIGH,CRITICAL devmavox/payment-service:1.0.0",
      "trivy image --exit-code 1 --severity CRITICAL devmavox/payment-service:1.0.0"
    ],
    "Define severity thresholds in a reviewed pipeline policy. Configure the desired exit code and severity filters explicitly. Do not treat severity alone as a complete risk assessment; use exploitability, reachable code, internet exposure and vendor guidance where available.",
    [
      "A critical finding is ignored because severity filtering is incorrect.",
      "The pipeline blocks every medium finding and becomes unusable.",
      "An UNKNOWN severity finding is silently excluded.",
      "An accepted exception has no expiry date.",
      "Teams disagree because policies differ between environments."
    ],
    [
      "Inspect the complete report and command-line severity filter.",
      "Confirm the intended exit-code behavior.",
      "Review UNKNOWN findings instead of silently discarding them.",
      "Align policy with security and application owners.",
      "Record exceptions with justification and review date.",
      "Rerun the scan using the approved policy."
    ],
    [
      "Use consistent severity thresholds across release pipelines.",
      "Prioritize internet-exposed and exploitable vulnerabilities.",
      "Keep exceptions time-bound and auditable.",
      "Report lower-severity findings rather than hiding them.",
      "Review blocking policies as application risk changes."
    ],
    "Create a payment-service Trivy policy that blocks CRITICAL findings and reports HIGH findings. Run sample scans and demonstrate the difference between reporting and blocking behavior."
  ),

  "7|Misconfiguration Scanning": makeLesson(
    "Misconfiguration scanning checks supported configuration files for insecure or non-compliant settings. Trivy can examine files such as Dockerfiles, Terraform configurations and other supported infrastructure definitions. Rules can identify issues such as privileged containers, overly permissive network settings and unsafe infrastructure defaults.",
    "Configuration mistakes can expose production systems even when application code contains no known vulnerability. Detecting these problems before infrastructure or containers are deployed reduces avoidable security risks.",
    "Dockerfile, Terraform or configuration repository → Trivy misconfiguration checks → rule evaluation → finding and remediation guidance → policy decision.",
    [
      "Identify infrastructure and application configuration files.",
      "Select the repository or directory to scan.",
      "Enable the misconfiguration scanner.",
      "Review the rule identifier and affected line.",
      "Understand the security impact of the configuration.",
      "Correct the configuration and validate its behavior.",
      "Rerun the scan and review the result."
    ],
    "A payment-service Dockerfile runs the application as root. Trivy identifies the insecure configuration. The team creates a dedicated non-root user, adjusts file permissions and rebuilds the image.",
    [
      "trivy config .",
      "trivy config --severity HIGH,CRITICAL .",
      "trivy config --format json --output misconfig-report.json .",
      "trivy config Dockerfile"
    ],
    "Enable the misconfiguration scanner for the relevant target and use supported policy checks. Keep infrastructure files in version control and review scanner rule identifiers against the tool version. Do not assume that every custom configuration format is automatically understood.",
    [
      "A configuration file is not recognized by the scanner.",
      "A security rule reports an unsafe container setting.",
      "A policy exception hides a real risk.",
      "A finding refers to an outdated configuration line.",
      "The pipeline scans the wrong directory."
    ],
    [
      "Verify the file format and scan target.",
      "Inspect the rule identifier and affected source line.",
      "Correct the configuration using the platform's supported secure setting.",
      "Review exceptions and remove unnecessary suppressions.",
      "Rerun the scanner against the updated files."
    ],
    [
      "Scan infrastructure and container configuration before deployment.",
      "Use non-root containers where practical.",
      "Avoid privileged execution unless specifically justified.",
      "Review policy exceptions regularly.",
      "Keep configuration changes subject to pull request review."
    ],
    "Create a controlled insecure Dockerfile setting in the payment-service. Run Trivy configuration scanning, correct the finding and verify the updated Dockerfile passes the selected policy."
  ),

  "7|Kubernetes Configuration Scanning": makeLesson(
    "Kubernetes configuration scanning evaluates supported Kubernetes manifests and related configuration for insecure settings and policy violations. Trivy can inspect manifest files for issues such as privileged containers, missing security controls and risky configuration. This analysis happens before the manifest is applied to a cluster.",
    "Scanning manifests before deployment helps prevent unsafe workload definitions from reaching EKS. A payment-service should use appropriate security contexts, resource limits and restricted privileges instead of relying only on runtime monitoring.",
    "Kubernetes YAML in Git → Trivy configuration scanner → Kubernetes policy checks → findings → manifest correction → Git review and deployment.",
    [
      "Collect the Kubernetes manifests or Helm-rendered manifests.",
      "Select the directory containing deployment configuration.",
      "Run Trivy configuration scanning.",
      "Inspect the affected resource and YAML line.",
      "Review security context, privileges and exposed settings.",
      "Correct the manifest.",
      "Render or validate the updated manifest.",
      "Rescan before deployment."
    ],
    "The payment-service Deployment manifest sets privileged: true without a valid operational requirement. Trivy flags the risky configuration. The team removes unnecessary privilege and configures a non-root security context before applying the Deployment to EKS.",
    [
      "trivy config ./k8s",
      "trivy config --severity HIGH,CRITICAL ./k8s",
      "kubectl apply --dry-run=client -f ./k8s/",
      "kubectl diff -f ./k8s/"
    ],
    "Scan the same manifests that will be deployed. For Helm-based deployments, render the chart with the intended values before scanning. Configure namespace, security context, service account and resource settings according to the organization's Kubernetes security baseline.",
    [
      "The scanner does not inspect the generated Helm output.",
      "A manifest uses privileged mode or host namespace access.",
      "The scanner reports an insecure container security context.",
      "A configuration exception hides an unsafe workload.",
      "The scanned YAML differs from the deployed manifest."
    ],
    [
      "Render the exact Helm chart and values used for deployment.",
      "Inspect the affected Kubernetes resource and rule.",
      "Correct the security context or risky configuration.",
      "Validate the manifest with Kubernetes client-side checks.",
      "Compare the reviewed manifest with the deployment artifact.",
      "Rescan before applying to the cluster."
    ],
    [
      "Scan rendered manifests before deployment.",
      "Use least-privilege service accounts.",
      "Avoid privileged containers and host access unless justified.",
      "Set resource requests and limits.",
      "Keep scanned manifests identical to release manifests."
    ],
    "Scan the payment-service Kubernetes Deployment and Service manifests. Introduce a controlled privileged-container issue, correct it, validate the YAML and rerun Trivy before EKS deployment."
  ),

  "7|Secret Scanning": makeLesson(
    "Secret scanning searches supported files for credentials and sensitive values such as API tokens, passwords, private keys and access keys. Trivy can identify patterns that resemble exposed secrets in source repositories and filesystem targets. A finding must be treated as a possible credential exposure even when the value appears to belong to a test environment.",
    "Committed secrets can allow unauthorized access to cloud accounts, registries, databases and production systems. Preventing credentials from entering Git is safer than trying to remove them after they have been distributed.",
    "Repository checkout → Trivy secret scanner → pattern and secret detection → finding review → credential revocation and rotation → source cleanup and verification.",
    [
      "Scan the repository with secret detection enabled.",
      "Review each finding without copying the secret into logs or chat.",
      "Identify the credential owner and affected system.",
      "Revoke or rotate an exposed credential immediately.",
      "Remove the secret from current source files.",
      "Review Git history and distribution scope.",
      "Move the replacement secret to a secure secret manager.",
      "Rerun scanning and verify that no active credential remains exposed."
    ],
    "A developer accidentally commits a cloud access key in a payment-service properties file. The team revokes the key, checks cloud audit logs, removes the secret from the repository and stores the replacement in Jenkins credentials or an approved secret manager.",
    [
      "trivy fs --scanners secret .",
      "trivy fs --scanners secret --format json --output secret-report.json .",
      "git grep -n -I -E 'password|secret|token|access_key'",
      "git log --all --oneline"
    ],
    "Enable secret scanning for the intended repository scope. Configure narrow, documented exclusions only for verified test fixtures. Use secret managers or CI credential stores for runtime values. Treat a confirmed exposed credential as compromised even after deleting its current file.",
    [
      "A real secret is committed to the current branch.",
      "A credential remains in older Git commits.",
      "A scanner reports a false positive in test data.",
      "A secret is printed in a build log.",
      "A rotated credential remains active in another environment."
    ],
    [
      "Revoke or rotate the exposed credential before other cleanup.",
      "Review cloud, registry or database audit activity.",
      "Remove the secret from the current source and assess Git history exposure.",
      "Use approved history-rewriting procedures if repository cleanup is required.",
      "Move the replacement to a secure credential store.",
      "Verify old credentials are no longer valid.",
      "Rerun secret scanning."
    ],
    [
      "Never commit credentials or private keys.",
      "Use short-lived credentials where supported.",
      "Restrict secret access by job and environment.",
      "Avoid printing secret values in logs.",
      "Rotate confirmed exposed credentials immediately."
    ],
    "Create a harmless dummy credential pattern in a test branch. Run Trivy secret scanning, inspect the finding safely, remove the dummy value and verify that the repository scan is clean."
  ),

  "7|SBOM Generation": makeLesson(
    "A Software Bill of Materials is a structured inventory of software components included in an application or artifact. It can identify packages, versions and relationships so teams can understand what is inside a release. Trivy supports generating SBOM output in formats such as CycloneDX and SPDX for supported targets.",
    "An SBOM improves software supply-chain visibility. If a new vulnerability is disclosed, the payment-service team can use its component inventory to determine whether the affected package exists in a released image.",
    "Source or built image → Trivy package discovery → component inventory → CycloneDX or SPDX SBOM → artifact storage and release metadata → vulnerability investigation.",
    [
      "Choose the source directory or final image to inventory.",
      "Select an SBOM format supported by the scanner.",
      "Generate the SBOM.",
      "Validate that expected application and operating-system components appear.",
      "Associate the SBOM with the exact build and image digest.",
      "Store it with the release artifact.",
      "Use the inventory for later vulnerability and compliance reviews."
    ],
    "After building the payment-service image, Jenkins generates a CycloneDX SBOM and stores it beside the image digest and Trivy vulnerability report. When a new CVE is announced, the team searches the inventory for affected package versions.",
    [
      "trivy image --format cyclonedx --output payment-service-sbom.cdx.json devmavox/payment-service:1.0.0",
      "trivy fs --format cyclonedx --output source-sbom.cdx.json .",
      "trivy image --format spdx-json --output payment-service-sbom.spdx.json devmavox/payment-service:1.0.0",
      "Get-Item .\\payment-service-sbom.cdx.json"
    ],
    "Choose a format accepted by downstream inventory and compliance systems. Generate the SBOM from the exact release image or source revision. Retain the image digest, build identifier, generation time and scanner version alongside the SBOM.",
    [
      "The SBOM is generated from source rather than the final release image.",
      "Expected components are missing because the target was incomplete.",
      "The SBOM is not associated with an image digest.",
      "The output format is not accepted by a downstream system.",
      "The generated file is overwritten by another build."
    ],
    [
      "Verify the target and selected output format.",
      "Inspect the SBOM for expected application and operating-system packages.",
      "Generate the inventory from the final image when image contents matter.",
      "Associate the SBOM with an immutable digest.",
      "Store each build's SBOM using a unique artifact name.",
      "Validate it with the intended downstream consumer."
    ],
    [
      "Generate SBOMs for release artifacts.",
      "Use a standard machine-readable format.",
      "Keep SBOMs tied to immutable image digests.",
      "Retain SBOMs for supported release-retention periods.",
      "Use inventories to investigate newly disclosed vulnerabilities."
    ],
    "Generate a CycloneDX SBOM for the payment-service image. Verify that application and operating-system packages are represented and archive the SBOM with the image digest and vulnerability report."
  ),

  "7|Ignore Policies": makeLesson(
    "Trivy ignore policies allow selected findings to be suppressed from normal scan output. They can be useful for documented false positives, accepted risks or temporary exceptions while remediation is planned. Ignore mechanisms must be controlled because suppressing a finding does not remove the vulnerable component or fix the underlying security problem.",
    "A controlled exception process prevents false positives from blocking every build while preserving visibility of accepted risk. For a payment-service, an exception should have a technical reason, owner, review date and clear scope.",
    "Trivy finding → validation and risk review → approved exception → scoped ignore policy → scan report and audit trail → periodic reassessment.",
    [
      "Run a full scan and identify the exact finding.",
      "Confirm whether the finding is valid or a false positive.",
      "Review exploitability, exposure and available fixes.",
      "Obtain approval from the responsible security owner.",
      "Add the narrowest supported ignore entry.",
      "Document the reason, owner and expiry date.",
      "Verify the ignore affects only the intended finding.",
      "Review and remove the exception after remediation."
    ],
    "A payment-service test fixture triggers a verified false-positive secret finding. The team documents the specific finding and adds a narrowly scoped exception rather than disabling secret scanning for the entire repository.",
    [
      "trivy fs .",
      "trivy image devmavox/payment-service:1.0.0",
      "trivy fs --ignorefile .trivyignore .",
      "Get-Content .\\.trivyignore"
    ],
    "Use the ignore-file format supported by the installed Trivy version. Prefer specific vulnerability identifiers and narrowly scoped exceptions. Use expiry and review metadata through the organization's policy process where supported. Do not ignore entire severities or scanner categories to make builds pass.",
    [
      "An ignore entry suppresses more findings than intended.",
      "A vulnerability exception remains after a patch is available.",
      "The ignore file is not loaded because its path is wrong.",
      "A finding is suppressed without security approval.",
      "Different scanner versions interpret exception metadata differently."
    ],
    [
      "Inspect the full report before applying an exception.",
      "Verify the ignore file path and supported syntax.",
      "Narrow the exception to the exact finding.",
      "Record approval and a review deadline.",
      "Remove the exception after upgrading the affected package.",
      "Rerun the scan and confirm the finding is visible or resolved as expected."
    ],
    [
      "Never use ignore policies as a substitute for remediation.",
      "Require an owner and documented justification.",
      "Keep exceptions narrow and time-bound.",
      "Review exceptions regularly.",
      "Retain full scan reports for audit."
    ],
    "Create a controlled test finding and apply a narrowly scoped Trivy ignore entry. Verify the intended finding is suppressed, confirm unrelated findings remain visible and remove the exception after the test."
  ),

  "7|CI Pipeline Integration": makeLesson(
    "CI pipeline integration runs security scans automatically during software delivery. A Jenkins pipeline can scan the repository, dependencies and final container image, save reports and enforce a security policy using scanner exit codes. Each scan should be placed at a stage where its target already exists.",
    "Automated scanning makes security checks repeatable for every relevant code change and release. It prevents known unacceptable vulnerabilities and exposed secrets from silently moving into the registry or production cluster.",
    "Git checkout → filesystem and dependency scan → Maven build and tests → Docker image build → image and configuration scan → policy evaluation → ECR push or pipeline block.",
    [
      "Check out the exact commit.",
      "Verify the pinned Trivy version.",
      "Run filesystem, dependency and secret scans.",
      "Build and test the payment-service.",
      "Build the Docker image with a unique tag.",
      "Scan the exact image.",
      "Save JSON or other required reports.",
      "Apply the approved severity and exit-code policy.",
      "Push only an image that meets the release policy."
    ],
    "Jenkins scans the payment-service repository before Maven packaging and scans the final Docker image before ECR push. A critical vulnerability causes a non-zero scanner exit code and fails the security stage.",
    [
      "trivy fs --scanners vuln,secret,misconfig --exit-code 1 --severity CRITICAL .",
      "mvn clean verify",
      "docker build -t devmavox/payment-service:$env:BUILD_NUMBER .",
      "trivy image --exit-code 1 --severity CRITICAL devmavox/payment-service:$env:BUILD_NUMBER",
      "docker image inspect devmavox/payment-service:$env:BUILD_NUMBER"
    ],
    "Pin the Trivy version and define scanner commands in the Jenkinsfile. Bind private registry credentials only for the required steps. Archive reports even when a scan fails, using pipeline post actions where appropriate. Make the blocking policy explicit and keep it separate from report-only scans.",
    [
      "The scanner is not installed on the Jenkins agent.",
      "A scan failure is ignored by shell error handling.",
      "The image scan runs before the image is built.",
      "A report is lost when the stage fails.",
      "The pipeline scans a different tag from the one pushed.",
      "Registry credentials are exposed in build logs."
    ],
    [
      "Verify the scanner executable and version on the agent.",
      "Check the exact command exit code and pipeline shell behavior.",
      "Place image scanning after image creation and before push.",
      "Archive reports in failure and success paths.",
      "Compare the scanned image digest with the pushed image digest.",
      "Move registry credentials to protected Jenkins credentials.",
      "Rerun the pipeline after correcting the stage."
    ],
    [
      "Scan before registry promotion.",
      "Use immutable build identifiers and image digests.",
      "Keep scan reports with build artifacts.",
      "Fail the pipeline explicitly for policy violations.",
      "Test both successful and failing security paths.",
      "Avoid exposing credentials in shell output."
    ],
    "Implement filesystem and image scanning in a Jenkins pipeline for the payment-service. Save reports, fail on a critical finding and verify that ECR push happens only after the security stage passes."
  ),

  "7|Vulnerability Remediation": makeLesson(
    "Vulnerability remediation is the process of reducing or removing risk identified by security scanning. Typical actions include upgrading a vulnerable dependency, rebuilding from a patched base image, removing an unused package, changing an insecure configuration or rotating an exposed secret. Remediation must be validated because a version change can affect application behavior.",
    "A scan report is useful only when findings are investigated and addressed. The payment-service release process needs a clear way to prioritize vulnerabilities, apply fixes, test the application and prove that the resulting artifact is safer.",
    "Trivy finding → package and CVE investigation → fix selection → dependency or image update → automated tests → rebuild and rescan → approved artifact promotion.",
    [
      "Collect the complete finding and affected package information.",
      "Determine whether the package is direct, transitive or part of the base image.",
      "Check vendor advisories and available fixed versions.",
      "Select a compatible update or mitigation.",
      "Change the dependency declaration or Docker base image.",
      "Run unit and integration tests.",
      "Rebuild the final container image.",
      "Rescan the new image and compare results.",
      "Record the remediation evidence."
    ],
    "Trivy reports a high-severity vulnerability in a Java library used by the payment-service. The developer traces the dependency through Maven, updates the compatible Spring Boot dependency set, runs regression tests and scans the rebuilt image before release.",
    [
      "mvn dependency:tree",
      "mvn clean verify",
      "trivy fs --scanners vuln .",
      "docker build -t devmavox/payment-service:remediated .",
      "trivy image devmavox/payment-service:remediated",
      "docker image inspect devmavox/payment-service:remediated"
    ],
    "Track vulnerability identifier, affected component, installed version, fixed version, severity, owner and remediation status. Use dependency management for Maven updates and maintained base images for container fixes. Keep exceptions separate from completed remediation.",
    [
      "No fixed version is currently available.",
      "A dependency upgrade breaks application compatibility.",
      "A vulnerable transitive dependency remains resolved.",
      "The Docker image still contains the old package.",
      "A scan report is marked resolved without rebuilding the artifact.",
      "A secret is deleted but its credential remains active."
    ],
    [
      "Check vendor advisory and package maintenance status.",
      "Trace the dependency path and update the correct version source.",
      "Run tests to detect compatibility problems.",
      "Rebuild the image and verify its package inventory.",
      "Compare the new scan report with the original.",
      "Rotate exposed credentials and review audit activity.",
      "Document temporary mitigations when no fix exists."
    ],
    [
      "Prioritize actively exploitable and internet-exposed risks.",
      "Patch dependencies through controlled version management.",
      "Rebuild artifacts after changing base packages.",
      "Verify remediation with a new scan.",
      "Keep evidence of fixes and approved exceptions.",
      "Do not mark a finding resolved only because its source file changed."
    ],
    "Select a vulnerable dependency in a test payment-service branch. Trace its origin, upgrade to a compatible fixed version, run regression tests, rebuild the image and verify the vulnerability is resolved."
  ),

  "7|Troubleshooting": makeLesson(
    "Trivy troubleshooting covers scanner installation, database updates, target discovery, private registry authentication, dependency detection, false positives, report generation and CI exit-code behavior. A reliable diagnosis separates scanner execution problems from actual security findings.",
    "Security stages must be dependable. If the scanner cannot access its database or the pipeline ignores its exit code, the team may mistakenly believe that an artifact passed security validation.",
    "Jenkins agent → Trivy executable and configuration → database access → target discovery → scanner execution → report creation → exit-code policy → pipeline result.",
    [
      "Record the scanner version and exact command.",
      "Identify the target and build identifier.",
      "Find the first meaningful scanner error.",
      "Verify database availability and update status.",
      "Check private registry authentication when scanning images.",
      "Inspect scanner selection and target discovery.",
      "Validate report output and exit-code handling.",
      "Correct the cause and repeat the scan."
    ],
    "The payment-service security stage unexpectedly passes despite a critical finding. The engineer discovers that the command used report-only behavior without the required exit code. The pipeline is corrected and tested with a controlled critical finding.",
    [
      "trivy --version",
      "trivy image --debug devmavox/payment-service:1.0.0",
      "trivy fs --debug .",
      "trivy image --download-db-only devmavox/payment-service:1.0.0",
      "docker image inspect devmavox/payment-service:1.0.0",
      "Write-Host $LASTEXITCODE"
    ],
    "Use explicit scanner selection, severity filters and exit-code policy. Configure database mirrors and registry credentials for restricted agents. Preserve JSON reports and scanner logs without exposing credentials or sensitive source values.",
    [
      "Database update fails because of proxy or DNS restrictions.",
      "Private image pull fails with unauthorized access.",
      "The scanner cannot find the intended image tag.",
      "Dependency findings are missing because the manifest is outside scan scope.",
      "A pipeline reports success despite a policy violation.",
      "JSON report generation fails because of an invalid path."
    ],
    [
      "Verify scanner version and executable path.",
      "Check network connectivity to database sources.",
      "Authenticate to the registry using protected credentials.",
      "Confirm image tag and digest.",
      "Inspect scan scope and enabled scanners.",
      "Check the command exit code and Jenkins error handling.",
      "Verify that the report file exists and contains findings.",
      "Rerun the scan after correcting the root cause."
    ],
    [
      "Keep a known-good scanner version available.",
      "Test pipeline exit-code behavior with controlled findings.",
      "Retain reports for failed security stages.",
      "Monitor database update health.",
      "Never convert scanner errors into successful security results.",
      "Document false-positive and exception handling."
    ],
    "Troubleshoot a payment-service security pipeline by simulating an unavailable database or incorrect exit-code policy. Identify the cause, correct the configuration and prove that a critical finding fails the stage."
  ),

  "7|Production Hands-on Lab": makeLesson(
    "This production lab builds a complete security scanning stage for a Spring Boot payment-service. It combines repository filesystem scanning, Maven dependency inspection, secret detection, Docker image scanning, Kubernetes configuration checks, SBOM generation, severity policies and controlled remediation. The final artifact is promoted only after required security checks pass.",
    "The goal is to integrate repeatable security validation into the CI/CD release process. The pipeline should detect vulnerable dependencies, unsafe configuration, exposed credentials and image vulnerabilities before an artifact is published or deployed to EKS.",
    "GitHub source → Jenkins checkout → Trivy filesystem and dependency scan → Maven tests and package → Docker build → image scan → Kubernetes manifest scan → SBOM generation → security policy → ECR push → later deployment.",
    [
      "Prepare the payment-service repository and Dockerfile.",
      "Install a pinned Trivy version on the Jenkins agent.",
      "Configure database access and private registry credentials.",
      "Run filesystem vulnerability and secret scanning.",
      "Run Maven dependency inspection and tests.",
      "Build the payment-service image using a unique build tag.",
      "Scan the exact image and evaluate severity policy.",
      "Scan Kubernetes manifests or rendered Helm output.",
      "Generate a CycloneDX or SPDX SBOM.",
      "Archive scan reports and SBOM with build metadata.",
      "Introduce a controlled critical finding and prove that the pipeline blocks ECR push.",
      "Remediate the issue, rebuild, rescan and verify the final image digest."
    ],
    "A developer submits a payment-service change. Jenkins scans the source for vulnerable dependencies and exposed secrets, runs Maven tests, builds the container image and scans its operating-system and application packages. Trivy finds a critical vulnerability, so the image is not pushed to ECR. The team updates the vulnerable package, reruns tests and scans, generates a new SBOM and promotes only the passing image.",
    [
      "trivy --version",
      "trivy fs --scanners vuln,secret,misconfig .",
      "mvn dependency:tree",
      "mvn clean verify",
      "docker build -t devmavox/payment-service:$env:BUILD_NUMBER .",
      "trivy image --exit-code 1 --severity CRITICAL devmavox/payment-service:$env:BUILD_NUMBER",
      "trivy config ./k8s",
      "trivy image --format cyclonedx --output payment-service-sbom.cdx.json devmavox/payment-service:$env:BUILD_NUMBER",
      "docker image inspect devmavox/payment-service:$env:BUILD_NUMBER"
    ],
    "Pin Trivy and application build versions. Store registry credentials in Jenkins credentials. Configure scanner severity and exit-code policies explicitly. Archive reports even when security checks fail. Associate every report and SBOM with the source commit, build number and immutable image digest. Do not push or deploy an image that has not passed the required checks.",
    [
      "The Jenkins agent cannot download the Trivy database.",
      "The repository scan misses a dependency manifest.",
      "A secret is detected in the current branch or Git history.",
      "The image scanner cannot authenticate to a private registry.",
      "A critical vulnerability does not fail the pipeline.",
      "The Kubernetes scan uses different manifests from the deployment.",
      "The SBOM is associated with the wrong image.",
      "The image pushed to ECR differs from the scanned image."
    ],
    [
      "Verify the scanner version, agent network and database status.",
      "Confirm that the repository root and dependency manifests are included.",
      "Rotate any confirmed exposed credential and inspect access logs.",
      "Verify registry authentication without printing secret values.",
      "Check scanner exit-code handling and Jenkins stage conditions.",
      "Render and scan the exact Kubernetes manifests used for deployment.",
      "Generate the SBOM from the final image.",
      "Compare the scanned and pushed image digests.",
      "Rebuild and repeat all required checks after remediation."
    ],
    [
      "Scan source code, dependencies, infrastructure configuration and final images.",
      "Use immutable build identifiers and image digests.",
      "Keep vulnerability reports and SBOMs as release evidence.",
      "Block promotion for policy-critical findings.",
      "Rotate exposed secrets immediately.",
      "Keep exceptions narrow, approved and time-bound.",
      "Test both passing and failing pipeline paths.",
      "Promote exactly the image that passed security validation."
    ],
    "Implement the complete Trivy security stage for the payment-service in Jenkins. Demonstrate filesystem scanning, dependency scanning, secret detection, Docker image scanning, Kubernetes configuration scanning and SBOM generation. Introduce a controlled critical vulnerability, prove that ECR push is blocked, remediate it and verify that the rebuilt image passes the policy."
  )
};
