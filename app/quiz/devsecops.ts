
export interface TopicQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export const topicQuestions: TopicQuestion[] = [
  {
    id: "devsecops-1",
    question: "What is DevSecOps?",
    options: [
      "Integrating security throughout the software development and delivery lifecycle",
      "Performing security checks only after production deployment",
      "Replacing developers with security tools",
      "Disabling CI/CD automation"
    ],
    answer: 0
  },
  {
    id: "devsecops-2",
    question: "What does shift-left security mean?",
    options: [
      "Moving security teams away from development",
      "Identifying and addressing security issues earlier in the development lifecycle",
      "Scanning only production servers",
      "Running security checks only during rollback"
    ],
    answer: 1
  },
  {
    id: "devsecops-3",
    question: "What is the primary purpose of a Secure SDLC?",
    options: [
      "Increase the number of manual deployments",
      "Remove code reviews",
      "Build security activities into each stage of software development",
      "Store credentials inside source code"
    ],
    answer: 2
  },
  {
    id: "devsecops-4",
    question: "A team wants to introduce DevSecOps. What is the best starting approach?",
    options: [
      "Block every release permanently",
      "Scan only after a security incident",
      "Give all pipeline jobs administrator permissions",
      "Identify risks and integrate automated security checks into the existing CI/CD workflow"
    ],
    answer: 3
  },
  {
    id: "devsecops-5",
    question: "What is the principle of least privilege?",
    options: [
      "Grant only the permissions required to perform a specific task",
      "Give every developer full production access",
      "Use the same administrator account for every service",
      "Disable authentication between systems"
    ],
    answer: 0
  },
  {
    id: "devsecops-6",
    question: "What is threat modeling?",
    options: [
      "Measuring application CPU usage",
      "Identifying potential threats, attack paths, and mitigations before or during system design",
      "Building Docker images",
      "Creating Git branches without reviewing risk"
    ],
    answer: 1
  },
  {
    id: "devsecops-7",
    question: "What is the purpose of a security gate in a CI/CD pipeline?",
    options: [
      "Automatically approve every commit",
      "Replace all application tests",
      "Prevent promotion when defined security requirements are not met",
      "Disable artifact versioning"
    ],
    answer: 2
  },
  {
    id: "devsecops-8",
    question: "What is the difference between a vulnerability and a threat?",
    options: [
      "They always mean exactly the same thing",
      "A vulnerability is an attacker's identity",
      "A threat is always a software defect",
      "A vulnerability is a weakness; a threat is a potential cause of harm that may exploit a weakness"
    ],
    answer: 3
  },
  {
    id: "devsecops-9",
    question: "What is risk-based vulnerability management?",
    options: [
      "Prioritizing findings based on severity, exploitability, exposure, and business impact",
      "Fixing findings only by their alphabetical order",
      "Ignoring vulnerabilities without public exploits forever",
      "Patching production without testing"
    ],
    answer: 0
  },
  {
    id: "devsecops-10",
    question: "What is defense in depth?",
    options: [
      "Using only one firewall",
      "Using multiple complementary security controls across system layers",
      "Relying only on passwords",
      "Removing monitoring to simplify operations"
    ],
    answer: 1
  },
  {
    id: "devsecops-11",
    question: "What does SAST stand for?",
    options: [
      "Secure Application Server Testing",
      "System Access Security Tracking",
      "Static Application Security Testing",
      "Software Automation System Testing"
    ],
    answer: 2
  },
  {
    id: "devsecops-12",
    question: "When is SAST commonly performed?",
    options: [
      "Only after a production outage",
      "Only against a running production server",
      "Only when the application is retired",
      "During development or CI by analyzing source code or related artifacts without requiring a running application"
    ],
    answer: 3
  },
  {
    id: "devsecops-13",
    question: "What does DAST test?",
    options: [
      "An application while it is running, by sending requests and analyzing responses",
      "Only Git commit messages",
      "Only container operating system packages",
      "Only Terraform formatting"
    ],
    answer: 0
  },
  {
    id: "devsecops-14",
    question: "What is Software Composition Analysis (SCA) used for?",
    options: [
      "Load balancing application traffic",
      "Identifying third-party dependencies and relevant risks such as known vulnerabilities and license issues",
      "Managing Kubernetes replicas",
      "Replacing source-code review entirely"
    ],
    answer: 1
  },
  {
    id: "devsecops-15",
    question: "What is a key difference between SAST and DAST?",
    options: [
      "SAST always requires production traffic",
      "DAST analyzes only source code without executing the application",
      "SAST examines code or artifacts, while DAST probes a running application",
      "Both tools only scan Docker registries"
    ],
    answer: 2
  },
  {
    id: "devsecops-16",
    question: "A SAST scan reports a possible SQL injection. What should the developer do?",
    options: [
      "Delete the scanner configuration",
      "Ignore every finding from that tool",
      "Disable all database access",
      "Review the code path, validate exploitability, and remediate or document a justified false positive"
    ],
    answer: 3
  },
  {
    id: "devsecops-17",
    question: "What is IAST?",
    options: [
      "Interactive Application Security Testing that observes application behavior during execution with instrumentation",
      "Infrastructure Automation and Storage Tracking",
      "A container image compression format",
      "A DNS security record"
    ],
    answer: 0
  },
  {
    id: "devsecops-18",
    question: "What is a limitation of SAST?",
    options: [
      "It cannot analyze source code",
      "It may produce false positives and may miss issues requiring runtime context",
      "It always detects every business-logic flaw",
      "It replaces penetration testing in every situation"
    ],
    answer: 1
  },
  {
    id: "devsecops-19",
    question: "What is a false positive in security scanning?",
    options: [
      "A confirmed exploitable vulnerability",
      "A newly disclosed CVE",
      "A finding reported as a problem that is not actually a vulnerability in the assessed context",
      "A successful security test"
    ],
    answer: 2
  },
  {
    id: "devsecops-20",
    question: "What is the purpose of a DAST test environment?",
    options: [
      "Store production passwords in the test application",
      "Disable application authentication permanently",
      "Allow unrestricted attacks against unrelated systems",
      "Test runtime behavior in an authorized, controlled environment"
    ],
    answer: 3
  },
  {
    id: "devsecops-21",
    question: "What does SonarQube commonly help identify?",
    options: [
      "Code-quality issues, bugs, and supported security findings",
      "All network routing failures",
      "Every cloud billing error",
      "Every production database outage"
    ],
    answer: 0
  },
  {
    id: "devsecops-22",
    question: "What is a SonarQube Quality Gate?",
    options: [
      "A Kubernetes ingress rule",
      "A set of conditions used to evaluate whether analyzed code meets configured quality criteria",
      "A Docker networking mode",
      "An AWS firewall"
    ],
    answer: 1
  },
  {
    id: "devsecops-23",
    question: "A Jenkins pipeline must stop if the SonarQube Quality Gate fails. What should it do?",
    options: [
      "Ignore the analysis result",
      "Delete the SonarQube project",
      "Wait for or retrieve the Quality Gate result and fail the pipeline when policy requires it",
      "Deploy first and scan later in every case"
    ],
    answer: 2
  },
  {
    id: "devsecops-24",
    question: "What is a sensible policy for new critical security findings?",
    options: [
      "Always suppress them",
      "Allow production release without review",
      "Delete the scan report",
      "Block promotion according to policy and require remediation or an authorized exception"
    ],
    answer: 3
  },
  {
    id: "devsecops-25",
    question: "Why should a team baseline existing security findings?",
    options: [
      "To distinguish pre-existing issues from new findings and prioritize remediation without hiding new risk",
      "To make all vulnerabilities disappear",
      "To disable future scans",
      "To allow every new critical issue automatically"
    ],
    answer: 0
  },
  {
    id: "devsecops-26",
    question: "What should a team do when a scanner finds a false positive?",
    options: [
      "Disable all security scanning across every repository",
      "Verify the finding and use a documented, narrowly scoped suppression with appropriate review",
      "Delete all application tests",
      "Make the repository public"
    ],
    answer: 1
  },
  {
    id: "devsecops-27",
    question: "What is a dependency lockfile useful for in software supply-chain security?",
    options: [
      "Encrypting every dependency automatically",
      "Replacing dependency review",
      "Recording resolved dependency versions to improve reproducibility and support integrity checks",
      "Making every dependency vulnerability-free"
    ],
    answer: 2
  },
  {
    id: "devsecops-28",
    question: "What should happen when a dependency has a known exploitable critical vulnerability?",
    options: [
      "Ignore it because it is external code",
      "Delete the vulnerability database",
      "Disable all CI checks",
      "Assess exposure and reachability, prioritize remediation, test an update or mitigation, and track closure"
    ],
    answer: 3
  },
  {
    id: "devsecops-29",
    question: "What is fuzz testing?",
    options: [
      "Providing varied or malformed inputs to discover crashes and unexpected behavior",
      "A method for assigning cloud IP addresses",
      "A Git branching strategy",
      "A technique for compressing source code"
    ],
    answer: 0
  },
  {
    id: "devsecops-30",
    question: "What is penetration testing?",
    options: [
      "A test that checks only code formatting",
      "An authorized assessment that attempts to exploit weaknesses to evaluate security",
      "A routine Docker image build",
      "A DNS cache cleanup"
    ],
    answer: 1
  },
  {
    id: "devsecops-31",
    question: "What is a CVE?",
    options: [
      "A Kubernetes resource type",
      "A container image format",
      "A publicly cataloged identifier for a disclosed vulnerability",
      "A firewall protocol"
    ],
    answer: 2
  },
  {
    id: "devsecops-32",
    question: "What does CVSS help communicate?",
    options: [
      "The number of Kubernetes nodes",
      "The application's monthly revenue",
      "The number of source files",
      "A standardized severity assessment of a vulnerability"
    ],
    answer: 3
  },
  {
    id: "devsecops-33",
    question: "Why is CVSS alone insufficient for prioritizing every vulnerability?",
    options: [
      "Actual risk also depends on exploitability, exposure, asset importance, and business context",
      "CVSS measures CPU utilization",
      "CVSS only applies to DNS",
      "CVSS automatically patches all affected systems"
    ],
    answer: 0
  },
  {
    id: "devsecops-34",
    question: "What is the purpose of a vulnerability remediation SLA?",
    options: [
      "Guarantee that vulnerabilities never occur",
      "Define expected remediation timelines based on risk or severity",
      "Replace incident response",
      "Allow indefinite delays without approval"
    ],
    answer: 1
  },
  {
    id: "devsecops-35",
    question: "A vulnerability scanner reports a vulnerable library, but the affected feature is not used. What is the correct response?",
    options: [
      "Assume the application is automatically safe",
      "Ignore every future finding for that library",
      "Verify version, reachability, exploitability, and context, then remediate or document an approved risk decision",
      "Delete the dependency inventory"
    ],
    answer: 2
  },
  {
    id: "devsecops-36",
    question: "What is the purpose of an emergency security patch process?",
    options: [
      "Bypass all validation forever",
      "Deploy arbitrary untested code without records",
      "Disable audit logging",
      "Enable expedited, risk-appropriate remediation with required validation, authorization, and traceability"
    ],
    answer: 3
  },
  {
    id: "devsecops-37",
    question: "What is a container image vulnerability scan intended to find?",
    options: [
      "Known vulnerabilities in detectable operating system packages and application dependencies",
      "Every possible runtime attack",
      "Every incorrect business requirement",
      "All cloud network routing problems"
    ],
    answer: 0
  },
  {
    id: "devsecops-38",
    question: "Which tool is commonly used to scan container images for vulnerabilities?",
    options: [
      "Jira",
      "Trivy",
      "Grafana",
      "Apache Maven only"
    ],
    answer: 1
  },
  {
    id: "devsecops-39",
    question: "What is a good practice for building secure container images?",
    options: [
      "Install every debugging package in production",
      "Run every container as root without justification",
      "Use trusted base images, minimize unnecessary packages, and patch dependencies",
      "Embed cloud administrator credentials in the image"
    ],
    answer: 2
  },
  {
    id: "devsecops-40",
    question: "Why should production containers avoid running as root when possible?",
    options: [
      "Root automatically encrypts the image",
      "It makes every vulnerability impossible",
      "It replaces network policies",
      "It reduces potential impact if the application or container is compromised"
    ],
    answer: 3
  },
  {
    id: "devsecops-41",
    question: "What is the risk of using the latest tag for production container images?",
    options: [
      "The tag can refer to different image content over time, reducing reproducibility",
      "It guarantees image integrity",
      "It disables all vulnerability scanning",
      "It prevents registry authentication"
    ],
    answer: 0
  },
  {
    id: "devsecops-42",
    question: "Why use an immutable image digest in a deployment?",
    options: [
      "To make the image editable at runtime",
      "To identify specific image content for reproducible deployment",
      "To guarantee that the image has no vulnerabilities",
      "To remove the need for image signing"
    ],
    answer: 1
  },
  {
    id: "devsecops-43",
    question: "What is a multi-stage Docker build useful for?",
    options: [
      "Embedding secrets in intermediate layers permanently",
      "Disabling dependency updates",
      "Keeping build tools out of the final image when they are not needed at runtime",
      "Giving the container administrator access automatically"
    ],
    answer: 2
  },
  {
    id: "devsecops-44",
    question: "A Trivy scan reports critical vulnerabilities in a base image. What should the team do?",
    options: [
      "Delete the scan output and deploy",
      "Ignore all critical findings because they are in the base image",
      "Disable the scanner for every future build",
      "Assess affected packages, select a patched trusted base image, rebuild, rescan, and test"
    ],
    answer: 3
  },
  {
    id: "devsecops-45",
    question: "What is an SBOM?",
    options: [
      "A Software Bill of Materials listing software components and related metadata",
      "A Kubernetes load balancer",
      "A Git branch protection rule",
      "A DNS routing algorithm"
    ],
    answer: 0
  },
  {
    id: "devsecops-46",
    question: "Why generate an SBOM for a release artifact?",
    options: [
      "To guarantee the artifact is secure without testing",
      "To improve component visibility and support vulnerability and license assessments",
      "To replace artifact signing",
      "To hide dependency versions"
    ],
    answer: 1
  },
  {
    id: "devsecops-47",
    question: "What is container image signing used for?",
    options: [
      "Automatically remove vulnerabilities",
      "Increase container CPU limits",
      "Verify artifact authenticity and integrity against a trusted signing identity",
      "Replace Kubernetes RBAC"
    ],
    answer: 2
  },
  {
    id: "devsecops-48",
    question: "What should a deployment system do if an image's signature fails verification?",
    options: [
      "Ignore the failure if the image starts",
      "Disable signature checks globally",
      "Copy the image to another registry and trust it automatically",
      "Reject or quarantine the artifact according to policy and investigate its provenance"
    ],
    answer: 3
  },
  {
    id: "devsecops-49",
    question: "What is software supply-chain security?",
    options: [
      "Protecting source code, dependencies, build systems, artifacts, and delivery processes against compromise",
      "Only increasing the number of Git branches",
      "Only monitoring application CPU",
      "Only encrypting website traffic"
    ],
    answer: 0
  },
  {
    id: "devsecops-50",
    question: "Why should build artifacts be promoted between environments rather than rebuilt independently each time?",
    options: [
      "Rebuilding always makes artifacts more trustworthy",
      "Promoting the same verified artifact improves consistency and traceability",
      "It eliminates the need for testing",
      "It automatically fixes runtime configuration errors"
    ],
    answer: 1
  },
  {
    id: "devsecops-51",
    question: "What is the safest way to provide a secret to a CI/CD pipeline?",
    options: [
      "Commit it to a public configuration file",
      "Print it in the pipeline logs",
      "Use an approved secret store or protected secret mechanism with restricted access",
      "Include it in the container image label"
    ],
    answer: 2
  },
  {
    id: "devsecops-52",
    question: "A CI/CD job accidentally prints an API token in its logs. What should happen?",
    options: [
      "Keep using the token until it expires",
      "Only delete the local terminal history",
      "Make the logs public for easier investigation",
      "Revoke or rotate the token, assess exposure, restrict log access, and prevent recurrence"
    ],
    answer: 3
  },
  {
    id: "devsecops-53",
    question: "Why is short-lived authentication preferable to long-lived static credentials where practical?",
    options: [
      "It reduces the time a stolen credential can remain useful",
      "It eliminates the need for authorization",
      "It makes every pipeline job public",
      "It prevents all phishing attacks"
    ],
    answer: 0
  },
  {
    id: "devsecops-54",
    question: "What is OpenID Connect (OIDC) commonly used for in cloud CI/CD authentication?",
    options: [
      "Building container layers",
      "Exchanging a trusted workload identity token for short-lived cloud credentials",
      "Replacing every firewall rule",
      "Storing passwords in source code"
    ],
    answer: 1
  },
  {
    id: "devsecops-55",
    question: "Why should a GitHub Actions workflow restrict the permissions of its GITHUB_TOKEN?",
    options: [
      "Every workflow requires organization-owner permissions",
      "It makes workflow logs impossible to read",
      "It limits the damage a compromised or malicious workflow can cause",
      "It prevents all unit tests from running"
    ],
    answer: 2
  },
  {
    id: "devsecops-56",
    question: "What is a major risk of running untrusted pull-request code with privileged secrets?",
    options: [
      "The pull request cannot contain YAML",
      "The repository loses its commit history",
      "The runner automatically becomes a DNS server",
      "The code may exfiltrate secrets or abuse the permissions available to the workflow"
    ],
    answer: 3
  },
  {
    id: "devsecops-57",
    question: "What is a safer approach to GitHub Actions workflow permissions?",
    options: [
      "Grant only the required permissions and separate untrusted validation from privileged deployment jobs",
      "Set every permission to write",
      "Expose production secrets to all pull requests",
      "Disable branch protection"
    ],
    answer: 0
  },
  {
    id: "devsecops-58",
    question: "Why should third-party CI/CD actions be pinned to reviewed immutable commit SHAs when practical?",
    options: [
      "It guarantees the action has no bugs",
      "It reduces the risk of an action reference changing to unreviewed code",
      "It removes the need to review permissions",
      "It makes secret rotation unnecessary"
    ],
    answer: 1
  },
  {
    id: "devsecops-59",
    question: "A Jenkins agent needs access to a deployment credential. What is the preferred approach?",
    options: [
      "Hard-code the credential in the Jenkinsfile",
      "Print the credential before deployment",
      "Use an approved credential store and scope access to the required job or identity",
      "Share one administrator password with all agents"
    ],
    answer: 2
  },
  {
    id: "devsecops-60",
    question: "What should a pipeline do if its mandatory security scanner is unavailable?",
    options: [
      "Always report the scan as passed",
      "Delete all security checks permanently",
      "Deploy without recording the failure",
      "Fail or pause the protected release according to policy, while reporting the scanner outage clearly"
    ],
    answer: 3
  },
  {
    id: "devsecops-61",
    question: "What is the purpose of Kubernetes RBAC?",
    options: [
      "Control which identities can perform actions on Kubernetes resources",
      "Scan application source code for SQL injection",
      "Encrypt every network packet automatically",
      "Replace container image registries"
    ],
    answer: 0
  },
  {
    id: "devsecops-62",
    question: "Why should Kubernetes workloads avoid unnecessary cluster-admin permissions?",
    options: [
      "Cluster-admin automatically improves application availability",
      "Excessive permissions increase the impact of a compromised workload",
      "It disables DNS resolution",
      "It prevents application monitoring"
    ],
    answer: 1
  },
  {
    id: "devsecops-63",
    question: "What does a Kubernetes NetworkPolicy help enforce?",
    options: [
      "Source-code formatting rules",
      "Cloud billing limits",
      "Allowed Pod ingress and egress traffic when supported by the network implementation",
      "Artifact signing policies"
    ],
    answer: 2
  },
  {
    id: "devsecops-64",
    question: "How should production applications access cloud secrets?",
    options: [
      "Embed cloud administrator credentials in the image",
      "Store all passwords in Git commits",
      "Use the same permanent access key in every namespace",
      "Use an approved secret manager and workload identity with narrowly scoped permissions where supported"
    ],
    answer: 3
  },
  {
    id: "devsecops-65",
    question: "What is Kubernetes Pod Security Admission used for?",
    options: [
      "Enforce Pod security standards at namespace or policy configuration boundaries",
      "Build Docker images",
      "Manage GitHub pull requests",
      "Replace cloud IAM"
    ],
    answer: 0
  },
  {
    id: "devsecops-66",
    question: "A container needs access to the host filesystem. What is the correct security response?",
    options: [
      "Mount the entire host filesystem read-write by default",
      "Question the requirement and use the narrowest justified mount and permissions",
      "Run every container as privileged",
      "Disable all audit logging"
    ],
    answer: 1
  },
  {
    id: "devsecops-67",
    question: "What is the purpose of a read-only root filesystem for a container?",
    options: [
      "Guarantee that the application cannot be exploited",
      "Encrypt every mounted volume",
      "Reduce opportunities for unauthorized changes to the container's root filesystem",
      "Replace network access controls"
    ],
    answer: 2
  },
  {
    id: "devsecops-68",
    question: "A Kubernetes workload is using a service account but does not need Kubernetes API access. What is a good practice?",
    options: [
      "Grant cluster-admin",
      "Mount every available secret",
      "Share the default service account across all applications",
      "Disable automatic service-account token mounting when appropriate and avoid unnecessary API permissions"
    ],
    answer: 3
  },
  {
    id: "devsecops-69",
    question: "What is admission control used for in Kubernetes security?",
    options: [
      "Validate or mutate API requests before resources are persisted",
      "Replace the container runtime",
      "Generate all application source code",
      "Route every internet packet"
    ],
    answer: 0
  },
  {
    id: "devsecops-70",
    question: "A production Kubernetes cluster accepts privileged Pods from an application team. What should be reviewed?",
    options: [
      "Only the application's replica count",
      "RBAC, Pod Security Admission settings, admission policies, and workload requirements",
      "Only the Git repository description",
      "Only the node's display name"
    ],
    answer: 1
  },
  {
    id: "devsecops-71",
    question: "What is infrastructure-as-code security scanning intended to detect?",
    options: [
      "Only application runtime errors",
      "Only container image size",
      "Misconfigurations and policy violations in infrastructure definitions",
      "Only DNS query latency"
    ],
    answer: 2
  },
  {
    id: "devsecops-72",
    question: "Which tool can scan Terraform configurations for common security misconfigurations?",
    options: [
      "Grafana",
      "Apache Tomcat",
      "Jira",
      "Checkov"
    ],
    answer: 3
  },
  {
    id: "devsecops-73",
    question: "A Terraform plan proposes making an S3 bucket publicly readable. What should the pipeline do?",
    options: [
      "Block or require explicit authorized review according to policy and business requirements",
      "Apply it automatically because Terraform generated the plan",
      "Delete all infrastructure security rules",
      "Store AWS secret keys in the bucket"
    ],
    answer: 0
  },
  {
    id: "devsecops-74",
    question: "What is the purpose of cloud IAM policy review?",
    options: [
      "Increase every user's permissions",
      "Identify excessive permissions and reduce access to required actions and resources",
      "Replace application monitoring",
      "Disable audit trails"
    ],
    answer: 1
  },
  {
    id: "devsecops-75",
    question: "What does AWS CloudTrail help security teams investigate?",
    options: [
      "Only website CSS changes",
      "Only container CPU utilization",
      "Recorded AWS account and API activity useful for auditing and investigations",
      "Every application's business logic"
    ],
    answer: 2
  },
  {
    id: "devsecops-76",
    question: "Why enable encryption at rest for sensitive data?",
    options: [
      "It prevents every authorized user from reading data",
      "It eliminates the need for IAM",
      "It guarantees protection against compromised applications",
      "It helps protect stored data against unauthorized access to underlying storage, depending on key and access controls"
    ],
    answer: 3
  },
  {
    id: "devsecops-77",
    question: "What is the purpose of a key management service such as AWS KMS?",
    options: [
      "Manage cryptographic keys and supported cryptographic operations under defined permissions",
      "Replace all application authentication",
      "Create Kubernetes Pods",
      "Scan every source-code file for bugs"
    ],
    answer: 0
  },
  {
    id: "devsecops-78",
    question: "What should happen when a cloud access key is suspected to be compromised?",
    options: [
      "Leave it active until the next quarterly review",
      "Contain and revoke or rotate it, inspect audit activity, and investigate affected resources",
      "Publish it for peer review",
      "Disable all backups"
    ],
    answer: 1
  },
  {
    id: "devsecops-79",
    question: "What is a secure approach to Terraform state?",
    options: [
      "Commit production state containing sensitive values to a public repository",
      "Allow every developer to overwrite state",
      "Use an appropriately secured remote backend, access controls, encryption, and locking where supported",
      "Delete the state after every deployment"
    ],
    answer: 2
  },
  {
    id: "devsecops-80",
    question: "Why should cloud security findings be prioritized using asset context?",
    options: [
      "All findings have the same impact",
      "Public resources are always harmless",
      "An unpatched vulnerability never matters if monitoring is enabled",
      "Exposure, data sensitivity, exploitability, and business criticality influence real-world risk"
    ],
    answer: 3
  },
  {
    id: "devsecops-81",
    question: "What is a security incident response plan?",
    options: [
      "A defined approach to prepare for, detect, contain, eradicate, and recover from security incidents",
      "A list of unreviewed dependencies",
      "A container image build command",
      "A DNS caching policy"
    ],
    answer: 0
  },
  {
    id: "devsecops-82",
    question: "A production server may be compromised. What should the team do first?",
    options: [
      "Immediately erase every log",
      "Follow the incident response plan to assess impact, contain the threat, and preserve evidence",
      "Publish the suspected credentials",
      "Disable every security control permanently"
    ],
    answer: 1
  },
  {
    id: "devsecops-83",
    question: "What is the purpose of a post-incident root cause analysis?",
    options: [
      "Find an individual to blame and stop the investigation",
      "Delete incident records",
      "Identify contributing causes and corrective actions that reduce recurrence",
      "Replace vulnerability management"
    ],
    answer: 2
  },
  {
    id: "devsecops-84",
    question: "A critical vulnerability is discovered in a production dependency. What is the best response?",
    options: [
      "Wait until the next annual upgrade",
      "Disable all monitoring",
      "Assume a firewall makes the issue irrelevant",
      "Assess exposure and impact, apply a tested fix or mitigation, verify remediation, and document the incident"
    ],
    answer: 3
  },
  {
    id: "devsecops-85",
    question: "Why is centralized security logging valuable?",
    options: [
      "It supports correlation, alerting, investigations, and evidence retention",
      "It guarantees that no attacker can enter",
      "It replaces all access controls",
      "It makes log integrity irrelevant"
    ],
    answer: 0
  },
  {
    id: "devsecops-86",
    question: "What should security logs avoid recording?",
    options: [
      "Timestamps and event identifiers",
      "Unnecessary sensitive data such as passwords, access tokens, or private keys",
      "Relevant authentication failure events",
      "Security policy violations"
    ],
    answer: 1
  },
  {
    id: "devsecops-87",
    question: "What is the purpose of a WAF?",
    options: [
      "Build application binaries",
      "Replace all identity management",
      "Inspect and filter web requests according to configured application-layer security rules",
      "Guarantee that all source code is secure"
    ],
    answer: 2
  },
  {
    id: "devsecops-88",
    question: "A web application shows signs of SQL injection attempts. What should the team investigate?",
    options: [
      "Only the DNS TTL",
      "Only the Kubernetes node name",
      "Only the Docker image size",
      "Application logs, affected endpoints, parameterized queries, input handling, and relevant WAF alerts"
    ],
    answer: 3
  },
  {
    id: "devsecops-89",
    question: "What is the purpose of rate limiting as a security control?",
    options: [
      "Reduce abuse and excessive request volume within defined limits",
      "Encrypt database backups",
      "Replace authentication",
      "Automatically patch dependencies"
    ],
    answer: 0
  },
  {
    id: "devsecops-90",
    question: "What is a good response to repeated failed login attempts?",
    options: [
      "Store passwords in logs",
      "Apply suitable detection and rate-limiting controls, investigate patterns, and protect accounts without enabling easy denial of service",
      "Disable all account security",
      "Publish user credentials"
    ],
    answer: 1
  },
  {
    id: "devsecops-91",
    question: "What is the principle of separation of duties?",
    options: [
      "Every developer must approve their own production release",
      "All production permissions belong to one shared account",
      "Critical responsibilities and approvals are divided to reduce misuse and errors",
      "Security reviewers cannot access audit records"
    ],
    answer: 2
  },
  {
    id: "devsecops-92",
    question: "Why should security exceptions have an owner and expiration date?",
    options: [
      "To make exceptions permanent by default",
      "To eliminate risk assessments",
      "To prevent future vulnerability scans",
      "To ensure accepted risk is accountable, reviewed, and reconsidered"
    ],
    answer: 3
  },
  {
    id: "devsecops-93",
    question: "What is security compliance evidence in a CI/CD pipeline?",
    options: [
      "Recorded scan results, approvals, artifact identities, and relevant execution logs",
      "A developer's verbal assurance only",
      "An untracked screenshot of a terminal",
      "A container tag without provenance"
    ],
    answer: 0
  },
  {
    id: "devsecops-94",
    question: "How should a team respond when a security scan fails because its vulnerability database cannot be updated?",
    options: [
      "Mark the scan as passed automatically",
      "Report the scan as inconclusive and follow the release policy for retrying, pausing, or explicitly approving a documented exception",
      "Delete all historical scan reports",
      "Disable future database updates"
    ],
    answer: 1
  },
  {
    id: "devsecops-95",
    question: "What is a good strategy for reducing noisy security alerts?",
    options: [
      "Disable all alerts",
      "Ignore every low-severity finding without review",
      "Tune detection rules, remove verified false positives carefully, and prioritize actionable risk",
      "Send all credentials to the alert channel"
    ],
    answer: 2
  },
  {
    id: "devsecops-96",
    question: "A security scanner passes, but a production breach still occurs. What does this demonstrate?",
    options: [
      "Security scanners should never be used",
      "Every scanner result is fraudulent",
      "Security testing eliminates the need for monitoring",
      "Automated scanning is one layer of defense and cannot identify every vulnerability or prevent every attack"
    ],
    answer: 3
  },
  {
    id: "devsecops-97",
    question: "What is a practical way to measure DevSecOps effectiveness?",
    options: [
      "Track meaningful metrics such as remediation time, recurring findings, coverage, and policy violations",
      "Count only how many tools are installed",
      "Measure success by the number of blocked builds alone",
      "Stop tracking vulnerabilities after deployment"
    ],
    answer: 0
  },
  {
    id: "devsecops-98",
    question: "What should be done before allowing a security tool to block every production release?",
    options: [
      "Disable developer feedback",
      "Validate the policy, severity thresholds, false-positive handling, exceptions, and recovery process",
      "Grant the scanner administrator access to all systems",
      "Ignore pipeline reliability"
    ],
    answer: 1
  },
  {
    id: "devsecops-99",
    question: "What is the best long-term approach to prevent secrets from leaking through CI/CD?",
    options: [
      "Rely only on developers remembering not to print them",
      "Commit encrypted-looking plaintext and never rotate it",
      "Use managed secrets, short-lived credentials, least privilege, secret scanning, and safe log handling",
      "Give every pipeline the same permanent administrator key"
    ],
    answer: 2
  },
  {
    id: "devsecops-100",
    question: "A release passes tests but fails a mandatory security policy. What should happen?",
    options: [
      "Deploy it because functional tests passed",
      "Delete the policy file",
      "Hide the scanner result",
      "Block promotion until the issue is remediated or an authorized, documented exception is granted"
    ],
    answer: 3
  }
];
