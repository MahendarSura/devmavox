export type TrivySection = {
  title: string;
  content: string;
  code?: string;
  practicalNotes?: string[];
};

export type TrivyLesson = {
  title: string;
  description: string;
  sections: TrivySection[];
  exercise: string;
};

export const stageSevenLessonOverrides: Record<string, TrivyLesson> = {
  "Trivy Fundamentals": {
    title: "Trivy Fundamentals",
    description: "Learn how Trivy scans repositories, container images, dependencies, infrastructure configuration, Kubernetes resources, and secrets for security risks.",
    sections: [
      {
        title: "What Trivy Is and How It Works",
        content: "Trivy is an open-source security scanner used to detect vulnerabilities, misconfigurations, exposed secrets, and software components in development and deployment artifacts. It supports multiple scan targets including container images, filesystems, Git repositories, and Kubernetes configurations."
      },
      {
        title: "Trivy Scanner Capabilities",
        content: "The main scanning areas include vulnerability scanning, misconfiguration scanning, secret detection, and Software Bill of Materials generation. Each scanner examines a different type of risk. Vulnerability scanning identifies known weaknesses in software packages, while configuration scanning evaluates security-related settings."
      },
      {
        title: "Trivy Architecture and Scan Flow",
        content: "The Trivy client identifies the scan target, detects operating systems and package managers, loads relevant vulnerability or rule data, analyzes discovered components, and produces findings. Results can be displayed in terminal output or exported into machine-readable formats for CI systems."
      },
      {
        title: "Security Findings and Risk Context",
        content: "A finding may represent a vulnerable library, an insecure configuration, a leaked credential, or an inventory component. Severity alone does not establish exploitability. Teams should consider exposure, runtime usage, available fixes, application context, and business impact."
      },
      {
        title: "Trivy in a DevSecOps Workflow",
        content: "A typical workflow scans source dependencies before packaging, scans the resulting image before publishing, and optionally scans Kubernetes manifests before deployment. CI pipelines can fail on selected findings and publish reports for engineering and security teams."
      },
      {
        title: "Essential Trivy Commands",
        code: "trivy --version\ntrivy image nginx:latest\ntrivy fs .\ntrivy repo .\ntrivy config ./kubernetes/\ntrivy image --format json --output report.json nginx:latest",
        content: "These commands demonstrate version inspection, image scanning, local filesystem scanning, repository scanning, configuration scanning, and JSON report generation. Run scans against approved targets and review the resulting findings."
      },
      {
        title: "Report Formats and Automation",
        content: "Trivy supports terminal output and structured report formats such as JSON and other supported output formats. Machine-readable reports can be archived, parsed, uploaded to security dashboards, or consumed by downstream automation."
      },
      {
        title: "Operational Limitations",
        content: "A clean scan does not prove that an application is completely secure. Scanner databases can be outdated, unsupported package ecosystems may have limited detection, and static scanning cannot replace penetration testing, runtime monitoring, or secure design reviews."
      }
    ],
    exercise: "Install Trivy, scan a sample container image and a local repository, export a JSON report, identify at least three findings or inventory components, and explain their security impact."
  },

  "Trivy Installation": {
    title: "Trivy Installation",
    description: "Install Trivy on developer systems and CI agents using supported package managers, binaries, and container execution.",
    sections: [
      {
        title: "Installation Requirements",
        content: "Choose an installation method based on the operating system and operational environment. Confirm CPU architecture, supported release, network access to package repositories, and permissions to install the executable."
      },
      {
        title: "Linux Installation",
        content: "On Linux, install Trivy using the official installation instructions for the distribution or a verified release package. Validate the package source and version before making it available to shared CI agents."
      },
      {
        title: "Windows Installation",
        content: "On Windows, use a supported package manager or official release binary. Ensure the executable directory is included in PATH. Open a new terminal if the PATH was updated after installation."
      },
      {
        title: "Container-Based Execution",
        content: "Trivy can also run from a container image. Container execution is useful for consistent CI environments because the scanner does not need to be installed directly on every host. Mount the scan target and report directory with appropriate permissions."
      },
      {
        title: "Verify Installation",
        code: "trivy --version\ntrivy --help\nGet-Command trivy",
        content: "Check the installed version, available commands, and executable resolution. Confirm that the CI agent invokes the expected binary rather than an older installation elsewhere in PATH."
      },
      {
        title: "Database Initialization",
        content: "The first vulnerability scan may download vulnerability database data. Ensure the scanner can access configured registries and database distribution endpoints. For restricted networks, configure approved mirrors or database distribution methods."
      },
      {
        title: "Production Agent Standardization",
        content: "Pin the Trivy version used by CI jobs, validate upgrades in a test pipeline, and document the approved installation source. Avoid silently changing scanner versions across production agents."
      }
    ],
    exercise: "Install Trivy on a Linux or Windows environment, verify its version, perform a test image scan, and document how the installation will be standardized on Jenkins agents."
  },

  "Filesystem Scanning": {
    title: "Filesystem Scanning",
    description: "Scan source directories and local application filesystems for vulnerable dependencies, exposed secrets, and supported misconfigurations.",
    sections: [
      {
        title: "Filesystem Scan Scope",
        content: "Filesystem scanning examines a directory on the local machine. It can identify supported package manifests, lockfiles, dependency information, secrets, and configuration files. The scan scope should point to the application repository or a carefully selected directory."
      },
      {
        title: "Dependency Discovery",
        content: "Trivy detects supported package manifests and lockfiles to identify installed or declared dependencies. Accurate lockfiles improve dependency identification because they describe resolved package versions more precisely than broad version ranges."
      },
      {
        title: "Scan a Repository",
        code: "trivy fs .\ntrivy fs --scanners vuln,misconfig,secret .\ntrivy fs --scanners vuln --format json --output fs-report.json .",
        content: "Run filesystem scanning from the repository root. Select scanners deliberately and generate a JSON report when findings need to be consumed by another system."
      },
      {
        title: "Scan Specific Directories",
        content: "Large repositories may contain application code, generated files, build outputs, and unrelated tools. Select meaningful scan paths and use supported skip settings carefully. Do not exclude application directories merely to reduce findings."
      },
      {
        title: "Interpreting Filesystem Findings",
        content: "Review the affected file, package name, installed version, fixed version when available, and vulnerability identifier. For secret findings, identify the credential type and revoke exposed credentials rather than simply deleting the visible text."
      },
      {
        title: "CI Filesystem Scanning",
        content: "Run a filesystem scan after source checkout and before building a release artifact. Preserve the report as a pipeline artifact. Use consistent scan settings so developers and CI agents produce comparable results."
      },
      {
        title: "Filesystem Scan Troubleshooting",
        content: "If expected dependencies are missing, inspect the working directory, manifest support, lockfile availability, ignored files, and scanner configuration. Check whether the CI workspace contains the files that exist in the developer environment."
      }
    ],
    exercise: "Scan a sample Java or Node.js repository using Trivy filesystem scanning. Export the findings, identify vulnerable dependencies, and verify that the expected manifest and lockfiles were discovered."
  },

  "Dependency Scanning": {
    title: "Dependency Scanning",
    description: "Identify vulnerable third-party libraries in application manifests, resolved dependency graphs, and software packages.",
    sections: [
      {
        title: "Why Dependency Security Matters",
        content: "Modern applications depend on external libraries maintained by other teams. A vulnerability in a transitive dependency can affect an application even when developers did not directly add that package."
      },
      {
        title: "Direct and Transitive Dependencies",
        content: "Direct dependencies are declared by the application. Transitive dependencies are introduced by other packages. Dependency scanners inspect supported manifests and lockfiles to discover package names and versions across the dependency graph."
      },
      {
        title: "Supported Package Ecosystems",
        content: "Trivy supports multiple package ecosystems and file formats. Detection depends on the scanner version and supported ecosystem. Check the current Trivy documentation when introducing a new package manager or manifest format."
      },
      {
        title: "Scan Dependency Files",
        code: "trivy fs --scanners vuln .\ntrivy repo --scanners vuln .\ntrivy fs --format json --output dependency-report.json .",
        content: "Filesystem or repository scanning can inspect supported dependency files. Use the appropriate command for the repository source and retain the report for review."
      },
      {
        title: "Understanding Vulnerability Metadata",
        content: "Review vulnerability identifiers, affected package versions, installed versions, fixed versions, severity, and references. A fix may require a direct dependency upgrade or a parent dependency update that replaces the vulnerable transitive package."
      },
      {
        title: "Dependency Remediation Strategy",
        content: "Upgrade to a fixed compatible version, update lockfiles, rebuild the application, and execute regression tests. If no fix is available, evaluate mitigations and document the risk with an owner and review date."
      },
      {
        title: "Dependency Scanning in CI",
        content: "Run dependency scanning on pull requests and main branch builds. Apply policy thresholds to new or actionable vulnerabilities. Avoid allowing an old backlog to hide newly introduced high-risk dependencies."
      },
      {
        title: "Dependency Scan Troubleshooting",
        content: "Missing package findings may result from absent lockfiles, unsupported manifest formats, incomplete checkout, private dependency resolution, or inaccurate package metadata. Validate the repository contents before changing scanner exclusions."
      }
    ],
    exercise: "Scan a sample Maven or npm repository, identify one vulnerable direct or transitive dependency, update the dependency graph, rebuild, and compare the before-and-after reports."
  },

  "Container Image Scanning": {
    title: "Container Image Scanning",
    description: "Scan container images for operating-system and application-library vulnerabilities before images are published or deployed.",
    sections: [
      {
        title: "Container Image Attack Surface",
        content: "Container images package operating-system layers, runtime components, application libraries, and configuration. Vulnerabilities in any included component can increase the attack surface of the deployed workload."
      },
      {
        title: "Image and Layer Inspection",
        content: "Trivy inspects image metadata and filesystem contents to identify operating systems and installed packages. Layer history and package discovery help identify components that may not be visible from the application source repository alone."
      },
      {
        title: "Scan Local Images",
        code: "docker build -t devmavox-api:test .\ntrivy image devmavox-api:test\ntrivy image --severity HIGH,CRITICAL devmavox-api:test",
        content: "Build an image in a test environment and scan it locally. Filter output to selected severities when prioritizing findings, but retain full reports for deeper investigation."
      },
      {
        title: "Scan Registry Images",
        code: "trivy image registry.example.com/team/api:1.0.0\ntrivy image --format json --output image-report.json registry.example.com/team/api:1.0.0",
        content: "Registry scanning allows teams to inspect images by registry reference. Configure registry authentication securely when private images are involved. Avoid placing registry passwords in shell history or source files."
      },
      {
        title: "Base Image and Application Package Risks",
        content: "A vulnerable base image can introduce many operating-system findings. Application packages may introduce a separate set of vulnerabilities. Select maintained base images, update dependencies, and rebuild images to ensure fixes are actually included."
      },
      {
        title: "Image Promotion Policy",
        content: "Scan images before pushing to a production registry or before promoting them between environments. Use immutable image tags or digests to ensure the artifact that passed scanning is the artifact that gets deployed."
      },
      {
        title: "Image Scan Failure Handling",
        content: "Distinguish scanner execution failures from policy failures. A failed database download is not the same as a vulnerability threshold being exceeded. Preserve the scanner exit status and report so CI can communicate the actual cause."
      },
      {
        title: "Container Image Optimization",
        content: "Use minimal maintained base images, multi-stage builds, and appropriate package cleanup. Do not remove diagnostic tools or libraries blindly when the application requires them. Rebuild and rescan after image changes."
      }
    ],
    exercise: "Build a sample Docker image, scan it with Trivy, identify operating-system and application dependency findings, update the base image or packages, rebuild, and compare scan reports."
  },

  "CVE Database": {
    title: "CVE Database",
    description: "Understand vulnerability database updates, CVE identifiers, advisory metadata, fixed versions, and reliable database operations.",
    sections: [
      {
        title: "CVE Fundamentals",
        content: "A Common Vulnerabilities and Exposures identifier provides a standardized reference for a publicly disclosed vulnerability. CVE identifiers help teams correlate findings across scanners, vendors, security advisories, and remediation systems."
      },
      {
        title: "How Trivy Uses Vulnerability Data",
        content: "Trivy uses vulnerability information from configured database sources to match discovered package names and versions against known advisories. Results depend on the database contents, package metadata, ecosystem-specific advisory sources, and scanner version."
      },
      {
        title: "Database Update Lifecycle",
        content: "Trivy downloads vulnerability database data when required and uses local cached data for subsequent scans. Database freshness matters because newly published vulnerabilities and corrections may not exist in an older local database."
      },
      {
        title: "Database Commands and Cache",
        code: "trivy image --download-db-only\ntrivy image --skip-db-update nginx:latest\ntrivy clean --scan-cache",
        content: "Use database-related options according to the installed Trivy version. Database-only operations can prepare scanner environments, while cache cleanup should be performed only when required by an operational procedure."
      },
      {
        title: "Offline and Restricted Networks",
        content: "Organizations with restricted outbound access may need an approved database mirror or controlled update process. Ensure the mirror is maintained and that scanners receive current database content before security-sensitive builds."
      },
      {
        title: "Understanding Fixed Version Metadata",
        content: "A finding may contain an installed version and a fixed version. The fixed version indicates a package version where the relevant vulnerability is addressed according to available advisory data. Verify compatibility and vendor guidance before upgrading."
      },
      {
        title: "Database and Finding Troubleshooting",
        content: "Investigate stale database warnings, download failures, proxy errors, corrupted caches, and differences between scanner environments. Compare Trivy versions and database update times before concluding that a vulnerability result is inconsistent."
      }
    ],
    exercise: "Inspect the vulnerability database update behavior on a test agent, run scans before and after an approved database update, and document how database freshness affects reported findings."
  },

  "Severity Classification": {
    title: "Severity Classification",
    description: "Interpret vulnerability severity and design risk-based security policies that distinguish critical exposure from lower-priority findings.",
    sections: [
      {
        title: "Severity Levels",
        content: "Trivy commonly reports vulnerability severities such as UNKNOWN, LOW, MEDIUM, HIGH, and CRITICAL. Severity is derived from vulnerability advisory information and scoring systems. Exact availability and mapping can differ across sources."
      },
      {
        title: "CVSS and Security Context",
        content: "The Common Vulnerability Scoring System provides a standardized way to assess vulnerability characteristics and impact. A CVSS score is useful for prioritization, but application exposure, exploit availability, reachable code, and business context also matter."
      },
      {
        title: "Severity Filtering",
        code: "trivy image --severity CRITICAL,HIGH nginx:latest\ntrivy fs --severity HIGH,CRITICAL .\ntrivy image --severity MEDIUM,HIGH,CRITICAL --format json nginx:latest",
        content: "Severity filters reduce output to findings that match selected levels. Do not confuse filtered output with the complete vulnerability inventory."
      },
      {
        title: "Exit Codes and Policy Decisions",
        code: "trivy image --exit-code 1 --severity CRITICAL,HIGH nginx:latest",
        content: "Exit-code behavior allows CI pipelines to enforce a selected policy. Test the exact command and exit behavior for the installed Trivy version before making it a production release control."
      },
      {
        title: "Prioritization Beyond Severity",
        content: "Consider internet exposure, affected service, exploitability, runtime reachability, compensating controls, available fixes, and business criticality. A high-severity issue in an exposed authentication service may deserve earlier action than a similar issue in an isolated build utility."
      },
      {
        title: "Security Exception Governance",
        content: "Exceptions should have an owner, technical justification, expiry or review date, and compensating controls. Avoid permanent severity suppression for convenience."
      },
      {
        title: "Severity Policy in CI/CD",
        content: "Define thresholds separately for pull requests, release builds, and production image promotion. A mature policy can prioritize new critical findings while tracking existing accepted risks through a controlled remediation backlog."
      }
    ],
    exercise: "Scan an image, create a policy that fails on HIGH and CRITICAL vulnerabilities, and demonstrate how a pipeline responds to a finding above and below the configured threshold."
  },

  "Misconfiguration Scanning": {
    title: "Misconfiguration Scanning",
    description: "Detect insecure infrastructure and application configuration patterns in Dockerfiles, Terraform, Kubernetes manifests, and other supported files.",
    sections: [
      {
        title: "Configuration Risk Fundamentals",
        content: "Misconfigurations occur when infrastructure or application settings weaken security. Examples include publicly exposed services, excessive permissions, missing encryption, privileged containers, and insecure network policies."
      },
      {
        title: "Trivy Misconfiguration Engine",
        content: "Trivy evaluates supported configuration files using built-in checks and policy rules. Findings identify the affected file and configuration location, explain the risk, and may provide remediation guidance."
      },
      {
        title: "Dockerfile Security Checks",
        content: "Review risky Dockerfile patterns such as running as root, using untrusted base images, exposing unnecessary ports, and embedding secrets. The correct remediation depends on application runtime requirements."
      },
      {
        title: "Terraform Configuration Checks",
        content: "Terraform scanning can identify insecure cloud resource settings before infrastructure is deployed. Review storage exposure, encryption settings, network access, identity permissions, and resource-specific security controls."
      },
      {
        title: "Scan Configuration Directories",
        code: "trivy config .\ntrivy config ./terraform/\ntrivy config ./docker/\ntrivy config --format json --output config-report.json ./infrastructure/",
        content: "Scan the directory containing infrastructure files. Use supported file formats and inspect the output to verify that the expected files were discovered."
      },
      {
        title: "Understanding Misconfiguration Findings",
        content: "Review the rule identifier, severity, affected resource, file path, line number, and remediation guidance. Validate the finding against the actual deployment design before changing a production configuration."
      },
      {
        title: "Policy and Custom Rules",
        content: "Where supported, use policy configuration and custom checks to enforce organization-specific security standards. Version-control policies, test them against representative files, and review changes before broad rollout."
      },
      {
        title: "Preventing Configuration Drift",
        content: "Run configuration scans during pull requests and before infrastructure deployment. Combine scanner findings with peer review, cloud policy controls, and post-deployment configuration monitoring."
      }
    ],
    exercise: "Create a Terraform or Dockerfile example with insecure settings, scan it using Trivy config, fix the reported issues, and compare the reports."
  },

  "Kubernetes Configuration Scanning": {
    title: "Kubernetes Configuration Scanning",
    description: "Evaluate Kubernetes YAML and related deployment configuration for insecure workload, identity, networking, and storage settings.",
    sections: [
      {
        title: "Kubernetes Security Configuration Risks",
        content: "Kubernetes security depends on workload configuration, container privileges, identity permissions, network controls, and storage settings. A valid manifest can still define an insecure deployment."
      },
      {
        title: "Workload Security Context",
        content: "Review runAsNonRoot, allowPrivilegeEscalation, readOnlyRootFilesystem, privileged mode, Linux capabilities, and seccomp configuration. Apply controls that match the application requirements and supported Kubernetes environment."
      },
      {
        title: "Resource and Image Configuration",
        content: "Inspect container image references, image pull policies, resource requests and limits, and exposed ports. Prefer immutable image digests for controlled production deployments and ensure images have passed vulnerability scanning."
      },
      {
        title: "RBAC and Service Account Risks",
        content: "Review Role, ClusterRole, RoleBinding, ClusterRoleBinding, and service account permissions. Avoid broad cluster-admin privileges for ordinary application workloads. Grant only the actions required by the workload."
      },
      {
        title: "Network and Storage Controls",
        content: "Review NetworkPolicy coverage, ingress exposure, persistent volume access, storage encryption requirements, and secret mounting. A secure manifest should align with the cluster's network and storage architecture."
      },
      {
        title: "Scan Kubernetes Manifests",
        code: "trivy config ./k8s/\ntrivy config --severity HIGH,CRITICAL ./k8s/\ntrivy config --format json --output kubernetes-security.json ./k8s/",
        content: "Scan the directory containing Kubernetes YAML files. Review findings for each workload and resource type. Verify that generated manifests and Helm-rendered output are included where appropriate."
      },
      {
        title: "Helm Template Scanning",
        content: "Render Helm templates into Kubernetes manifests and scan the rendered output. This helps inspect the actual resource configuration produced by chart values rather than only examining chart templates."
      },
      {
        title: "Deployment Gate Integration",
        content: "Add manifest scanning before kubectl apply or Helm deployment. Fail the pipeline for policy violations that must be corrected before deployment, and publish a report that identifies the exact resource and configuration."
      }
    ],
    exercise: "Create a Kubernetes Deployment with a privileged container and excessive permissions. Scan the manifest, correct the security context and RBAC configuration, and rerun the scan."
  },

  "Secret Scanning": {
    title: "Secret Scanning",
    description: "Detect exposed credentials and sensitive tokens in repositories, source files, and supported scan targets.",
    sections: [
      {
        title: "What Counts as a Secret",
        content: "Secrets include API keys, access tokens, private keys, passwords, database credentials, cloud credentials, and signing material. Exposure can allow unauthorized access even when the application has no conventional software vulnerability."
      },
      {
        title: "How Secret Detection Works",
        content: "Trivy secret scanning examines supported file content using detection rules and patterns. Findings identify suspected secret material and its location. Detection is not perfect, so results require controlled investigation."
      },
      {
        title: "Scan Repository Secrets",
        code: "trivy fs --scanners secret .\ntrivy repo --scanners secret .\ntrivy fs --scanners secret --format json --output secret-report.json .",
        content: "Run secret scanning against the repository or filesystem. Review reports carefully because they may contain sensitive context. Restrict access to stored reports."
      },
      {
        title: "Handling a Confirmed Secret Exposure",
        content: "Revoke or rotate the exposed credential immediately. Investigate access logs and possible misuse, identify where the secret was distributed, and replace it with a secret-management mechanism. Deleting the text from the latest commit does not revoke the credential."
      },
      {
        title: "False Positives and Test Fixtures",
        content: "Sample values and test fixtures may resemble real credentials. Validate whether a finding is active and sensitive before marking it as a false positive. Use narrow documented exceptions rather than disabling secret detection broadly."
      },
      {
        title: "Preventing Secret Leakage",
        content: "Use CI secret stores, cloud secret managers, short-lived credentials, least-privilege access, and pre-commit checks. Never place real credentials in Dockerfiles, application configuration committed to Git, or build logs."
      },
      {
        title: "Secret Scanning Incident Response",
        content: "Record the affected repository, commit, secret type, exposure period, affected systems, revocation time, and investigation owner. Treat secret exposure as a security incident when access may have been abused."
      }
    ],
    exercise: "Create a disposable test credential in a non-production repository, scan it with Trivy, verify the finding, remove the test secret, and document the correct rotation and incident response steps."
  },

  "SBOM Generation": {
    title: "SBOM Generation",
    description: "Generate Software Bills of Materials to inventory software components and support vulnerability management, compliance, and supply-chain visibility.",
    sections: [
      {
        title: "SBOM Fundamentals",
        content: "A Software Bill of Materials is a structured inventory of software components included in an application or artifact. It can describe package names, versions, relationships, licenses, and other component metadata."
      },
      {
        title: "Why Organizations Need SBOMs",
        content: "SBOMs help teams understand third-party dependencies, investigate newly disclosed vulnerabilities, support software supply-chain transparency, and provide component inventory evidence to customers or auditors."
      },
      {
        title: "SPDX and CycloneDX Formats",
        content: "SPDX and CycloneDX are established SBOM formats. Choose a format compatible with the receiving security, compliance, and vulnerability management systems. Validate the generated document before distribution."
      },
      {
        title: "Generate an Image SBOM",
        code: "trivy image --format cyclonedx --output image-sbom.json nginx:latest\ntrivy image --format spdx-json --output image-sbom-spdx.json nginx:latest",
        content: "Generate an SBOM from a container image using a supported format. The resulting document represents discovered software components and metadata from the scanned image."
      },
      {
        title: "Generate a Filesystem SBOM",
        code: "trivy fs --format cyclonedx --output filesystem-sbom.json .",
        content: "Filesystem SBOM generation inventories supported package information discovered in the selected directory. Confirm that the intended manifests and dependency files were included."
      },
      {
        title: "SBOM Validation and Quality",
        content: "Validate the document structure, format version, package identity, version metadata, and component relationships. An SBOM is only as complete as the component information the scanner can discover."
      },
      {
        title: "SBOM Storage and Release Association",
        content: "Associate each SBOM with the exact release artifact, image digest, source revision, and build identifier. Store the document alongside release evidence and restrict modification after publication."
      },
      {
        title: "SBOM in Vulnerability Response",
        content: "When a new vulnerability is announced, component inventories help determine which application releases contain the affected package. Teams can identify impacted artifacts and prioritize rebuilds and remediation."
      }
    ],
    exercise: "Generate CycloneDX SBOMs for a sample application and container image. Validate the files, identify key components, and associate each SBOM with its exact image digest or build revision."
  },

  "Ignore Policies": {
    title: "Ignore Policies",
    description: "Manage vulnerability and finding exceptions responsibly using documented suppression policies and review controls.",
    sections: [
      {
        title: "Why Ignore Policies Exist",
        content: "Some findings may be irrelevant to the actual deployment, incorrectly matched, already mitigated, or temporarily accepted as a known risk. Ignore policies allow teams to manage such cases without disabling the entire security scan."
      },
      {
        title: "Trivy Ignore File",
        content: "Trivy supports a repository-level ignore configuration through .trivyignore and related supported configuration mechanisms. The exact supported fields and syntax depend on the Trivy release."
      },
      {
        title: "Ignore Specific Vulnerabilities",
        code: "trivy image --ignorefile .trivyignore nginx:latest",
        content: "Use a controlled ignore file when scanning. Add only findings that have been reviewed and approved. Confirm the scanner reads the intended ignore file in the CI working directory."
      },
      {
        title: "Expiration and Review",
        content: "Exceptions should have an owner, justification, approval record, and review or expiration date. Review exceptions regularly because a temporary risk acceptance can become permanent when ownership is unclear."
      },
      {
        title: "Avoid Broad Suppression",
        content: "Do not ignore entire vulnerability severities or large groups of packages merely to make the pipeline pass. Narrow exceptions preserve visibility into unrelated findings and future vulnerabilities."
      },
      {
        title: "Policy Governance",
        content: "Require security review for high-risk exceptions. Keep ignore files in version control and include policy changes in code review. Track exception counts and remove entries when fixes become available."
      },
      {
        title: "Verify Suppression Behavior",
        content: "Run scans with and without the ignore configuration in a controlled test. Confirm that only the intended findings are suppressed and that other findings remain visible."
      }
    ],
    exercise: "Create a test .trivyignore file for a disposable finding, document its justification and owner, scan with the ignore file, and verify that unrelated vulnerabilities are still reported."
  },

  "CI Pipeline Integration": {
    title: "CI Pipeline Integration",
    description: "Integrate Trivy into Jenkins and other CI systems to scan source, dependencies, container images, and deployment configuration.",
    sections: [
      {
        title: "Security Scanning Pipeline Design",
        content: "Place scans at stages where the required artifacts exist. Filesystem and dependency scanning can run after checkout. Image scanning runs after the image is built. Kubernetes configuration scanning runs before deployment."
      },
      {
        title: "Jenkins Tool and Credential Setup",
        content: "Install or provision a controlled Trivy version on Jenkins agents. Configure private registry credentials through Jenkins credentials or an approved identity mechanism. Do not expose registry passwords in pipeline logs."
      },
      {
        title: "Filesystem Scan Stage",
        code: "stage('Trivy Filesystem Scan') {\n  steps {\n    sh 'trivy fs --exit-code 1 --severity HIGH,CRITICAL .'\n  }\n}",
        content: "This stage scans the checked-out repository and returns a failure status when the configured severity threshold is exceeded. Validate the policy against your repository before enforcing it."
      },
      {
        title: "Container Image Scan Stage",
        code: "stage('Build Image') {\n  steps {\n    sh 'docker build -t devmavox-api:${BUILD_NUMBER} .'\n  }\n}\nstage('Trivy Image Scan') {\n  steps {\n    sh 'trivy image --exit-code 1 --severity HIGH,CRITICAL devmavox-api:${BUILD_NUMBER}'\n  }\n}",
        content: "Build and scan the same image reference. Avoid scanning one mutable tag and deploying a different artifact. For production promotion, associate scan evidence with an immutable image digest."
      },
      {
        title: "Kubernetes Configuration Scan Stage",
        code: "stage('Trivy Kubernetes Config Scan') {\n  steps {\n    sh 'trivy config --exit-code 1 --severity HIGH,CRITICAL ./k8s/'\n  }\n}",
        content: "Scan deployment manifests before applying them to a cluster. If Helm is used, render the intended values into manifests and scan the rendered output."
      },
      {
        title: "Reports and Pipeline Artifacts",
        content: "Generate JSON reports for traceability and publish them as pipeline artifacts. Restrict access to reports that may contain sensitive paths or secret-related findings. Preserve build identifiers and scan timestamps."
      },
      {
        title: "Exit Codes and Failure Strategy",
        content: "Configure scanner exit codes to distinguish policy violations from successful scans. Decide whether a scan failure blocks a build, release, or deployment. Handle scanner infrastructure failures separately from actual security findings."
      },
      {
        title: "Production Pipeline Governance",
        content: "Pin scanner versions, control database freshness, use approved registries, secure credentials, and document exceptions. Start with reporting mode when introducing a new policy, then move to enforcement after teams understand the findings."
      }
    ],
    exercise: "Build a Jenkins pipeline that scans source dependencies, builds a container image, scans the image, scans Kubernetes manifests, publishes JSON reports, and blocks promotion for configured critical findings."
  },

  "Vulnerability Remediation": {
    title: "Vulnerability Remediation",
    description: "Convert scanner findings into prioritized fixes, validated upgrades, rebuilt artifacts, and auditable security closure.",
    sections: [
      {
        title: "Triage Before Fixing",
        content: "Review the vulnerability identifier, affected package, installed version, fixed version, severity, advisory references, and affected application. Determine whether the vulnerable component is included in the deployed artifact and whether the relevant functionality is exposed."
      },
      {
        title: "Prioritize by Risk",
        content: "Prioritize critical exposure, internet-facing services, exploitable weaknesses, sensitive data paths, and high-business-impact applications. Severity is an important input but should not be the only remediation decision."
      },
      {
        title: "Upgrade Direct Dependencies",
        content: "Update the declared package version to a supported fixed release. Review compatibility notes, update lockfiles, execute tests, and verify that the resulting dependency graph no longer contains the vulnerable version."
      },
      {
        title: "Resolve Transitive Dependency Vulnerabilities",
        content: "A vulnerable transitive dependency may require upgrading its parent library or using a supported dependency override mechanism. Confirm that the override is compatible and does not introduce a different security or runtime issue."
      },
      {
        title: "Patch Container Base Images",
        content: "Select a maintained base image containing the required security updates. Rebuild the image rather than modifying a running container manually. Verify the resulting package versions and image digest."
      },
      {
        title: "Re-scan and Validate",
        code: "trivy fs --scanners vuln .\ntrivy image --severity HIGH,CRITICAL devmavox-api:patched\ntrivy image --format json --output remediation-report.json devmavox-api:patched",
        content: "Run scans after remediation and compare reports. Confirm that the affected package or vulnerable version is no longer present. Execute regression tests and application validation before release."
      },
      {
        title: "Unfixed Vulnerability Handling",
        content: "If no fixed version exists, document the risk, exposure, compensating controls, owner, and review date. Consider disabling affected functionality or isolating the component when technically appropriate."
      },
      {
        title: "Remediation Evidence",
        content: "Retain the original finding, change reference, dependency or base-image update, test results, new scan report, and approval where required. Close the finding only when the actual release artifact has been verified."
      }
    ],
    exercise: "Select a vulnerability in a sample image or dependency manifest, determine its fixed version, apply the upgrade, rebuild the artifact, run regression tests, and produce a remediation evidence report."
  },

  "Troubleshooting": {
    title: "Troubleshooting",
    description: "Diagnose Trivy installation, database, registry, scanning, policy, and CI integration failures using reproducible evidence.",
    sections: [
      {
        title: "Trivy Command Not Found",
        content: "Check whether Trivy is installed, whether its executable directory is in PATH, and whether the CI agent uses the expected environment. Compare the interactive terminal environment with the actual service account environment."
      },
      {
        title: "Vulnerability Database Download Failure",
        content: "Inspect network access, DNS, proxy settings, TLS trust, registry or mirror configuration, and database distribution availability. Check whether the scanner can reach its configured database source."
      },
      {
        title: "Private Registry Authentication Failure",
        content: "Verify registry hostname, credential validity, access permissions, and token expiration. Use the CI platform's protected credential mechanism and ensure that authentication is available to the agent performing the scan."
      },
      {
        title: "No Vulnerabilities Detected",
        content: "A clean report may be valid, but verify that the intended image or repository was scanned. Check image digest, operating-system detection, package discovery, scan type, database freshness, and severity filters."
      },
      {
        title: "Unsupported or Missing Package Detection",
        content: "Inspect manifest support, package metadata, lockfiles, image filesystem contents, and Trivy version. Upgrade the scanner only after validating compatibility and the impact on existing CI policies."
      },
      {
        title: "Unexpected Pipeline Success",
        content: "Check whether --exit-code was configured, whether severity filters excluded the finding, whether the pipeline ignored the scanner exit status, or whether a shell wrapper converted failures into success."
      },
      {
        title: "Unexpected Pipeline Failure",
        content: "Determine whether the failure came from a security policy, scanner execution, network access, registry authentication, or report handling. Do not automatically classify every non-zero exit as a vulnerability."
      },
      {
        title: "Evidence-Based Recovery",
        content: "Capture the Trivy version, command, target digest or repository revision, database status, exit code, scanner logs, and CI environment. Correct the underlying issue and repeat the scan against the same artifact."
      }
    ],
    exercise: "In a non-production CI job, simulate a missing executable, blocked database access, invalid registry credentials, and a vulnerability threshold failure. Diagnose each failure and document the recovery steps."
  },

  "Production Hands-on Lab": {
    title: "Production Hands-on Lab",
    description: "Build an end-to-end DevSecOps pipeline that scans application dependencies, container images, and Kubernetes deployment manifests using Trivy.",
    sections: [
      {
        title: "Lab Application and Architecture",
        content: "Use a sample application stored in Git, a Dockerfile, Kubernetes deployment manifests, and a Jenkins pipeline. Trivy performs source and dependency scanning, image vulnerability scanning, configuration analysis, and SBOM generation."
      },
      {
        title: "Prepare the Scanner Environment",
        content: "Install an approved Trivy version on a non-production Jenkins agent. Verify executable access, database connectivity, registry access, and report storage permissions. Record the scanner version used by the lab."
      },
      {
        title: "Source and Dependency Security",
        code: "trivy fs --scanners vuln,secret .\ntrivy fs --format json --output source-security.json .",
        content: "Scan the checked-out repository for supported dependency vulnerabilities and exposed secrets. Review the report and identify which findings require dependency changes or credential rotation."
      },
      {
        title: "Container Image Build and Scan",
        code: "docker build -t devmavox-api:lab .\ntrivy image --severity HIGH,CRITICAL devmavox-api:lab\ntrivy image --format json --output image-security.json devmavox-api:lab",
        content: "Build the application image, scan it, and retain the report. Investigate vulnerable operating-system packages and application libraries. Update the base image or dependencies and rebuild."
      },
      {
        title: "Kubernetes Manifest Security",
        code: "trivy config ./k8s/\ntrivy config --format json --output kubernetes-security.json ./k8s/",
        content: "Scan Kubernetes manifests before deployment. Correct insecure workload settings, excessive permissions, and missing security controls. Scan rendered Helm output when charts are part of the release."
      },
      {
        title: "SBOM and Release Evidence",
        code: "trivy image --format cyclonedx --output release-sbom.json devmavox-api:lab",
        content: "Generate a CycloneDX SBOM for the exact image. Associate it with the image digest, source revision, build number, and security scan report."
      },
      {
        title: "CI Security Gate",
        content: "Configure Jenkins to run scans in the correct order and fail promotion for approved severity thresholds. Keep scanner infrastructure errors distinguishable from vulnerability policy failures. Publish reports even when a security gate fails."
      },
      {
        title: "Security Exception Workflow",
        content: "Create a controlled exception for a lab finding and document its identifier, reason, owner, and review date. Verify that the exception suppresses only the intended finding and does not hide other vulnerabilities."
      },
      {
        title: "Incident Simulation and Recovery",
        content: "Introduce a vulnerable dependency, a secret in a test file, an insecure Kubernetes setting, and an invalid registry credential in separate lab exercises. Diagnose each result and demonstrate the appropriate remediation or recovery."
      },
      {
        title: "Production Readiness Review",
        content: "Review scanner version management, database freshness, credential protection, artifact immutability, report retention, exception governance, and release enforcement. Confirm that the image deployed is exactly the image that passed security scanning."
      }
    ],
    exercise: "Deliver a working Jenkins DevSecOps pipeline that scans source dependencies and secrets, scans the built container image, validates Kubernetes configuration, generates an SBOM, publishes reports, and blocks release promotion when the configured security policy fails."
  }
};
