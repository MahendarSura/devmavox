export interface nexusQuestion {
  question: string;
  options: string[];
  answer: number;
}

export const nexusQuestions: eexusQuestion[] = [
  {
    question: "1. What is Sonatype Nexus Repository Manager?",
    options: [
      "A source code editor",
      "An artifact repository manager",
      "A container orchestration platform",
      "A monitoring dashboard"
    ],
    answer: 1
  },
  {
    question: "2. What is the primary purpose of Nexus Repository Manager?",
    options: [
      "To replace Git completely",
      "To provision virtual machines",
      "To store, manage, and distribute software artifacts",
      "To monitor CPU temperature"
    ],
    answer: 2
  },
  {
    question: "3. Which repository type stores artifacts published by your organization?",
    options: [
      "Hosted repository",
      "Proxy repository",
      "Group repository",
      "Remote cache only"
    ],
    answer: 0
  },
  {
    question: "4. What is the main purpose of a proxy repository?",
    options: [
      "To compile application code",
      "To create user accounts",
      "To run automated tests",
      "To access and cache artifacts from an upstream repository"
    ],
    answer: 3
  },
  {
    question: "5. What does a Nexus group repository provide?",
    options: [
      "A group of operating system users",
      "A single endpoint combining multiple repositories",
      "A collection of Jenkins agents",
      "A replacement for artifact versioning"
    ],
    answer: 1
  },
  {
    question: "6. Your team wants to publish internal release artifacts. Which repository type should you use?",
    options: [
      "Proxy",
      "Group only",
      "Hosted",
      "Remote-only cache"
    ],
    answer: 2
  },
  {
    question: "7. Developers need one URL to access internal artifacts and cached public dependencies. What should you configure?",
    options: [
      "A group repository containing the required hosted and proxy repositories",
      "A separate Linux user for each dependency",
      "A Git branch for each artifact",
      "A monitoring dashboard"
    ],
    answer: 0
  },
  {
    question: "8. What is an artifact in Nexus?",
    options: [
      "A running operating system process",
      "A network route",
      "A user permission",
      "A software package or build output stored in a repository"
    ],
    answer: 3
  },
  {
    question: "9. Which component of Nexus represents a stored software package and its version?",
    options: [
      "Role",
      "Component",
      "Privilege",
      "Task"
    ],
    answer: 1
  },
  {
    question: "10. What is an asset in Nexus Repository Manager?",
    options: [
      "A Jenkins pipeline",
      "A repository user",
      "A file associated with a repository component",
      "A Linux service"
    ],
    answer: 2
  },
  {
    question: "11. What is a blob store in Nexus?",
    options: [
      "Storage used for repository content",
      "A repository access role",
      "A CI/CD stage",
      "A software license"
    ],
    answer: 0
  },
  {
    question: "12. Why might an administrator configure separate blob stores?",
    options: [
      "To remove authentication",
      "To disable artifact versioning",
      "To eliminate all backups",
      "To organize storage and apply suitable storage-management policies"
    ],
    answer: 3
  },
  {
    question: "13. What is the purpose of a Nexus cleanup policy?",
    options: [
      "To delete source code from Git",
      "To identify eligible repository content for cleanup",
      "To restart all CI servers",
      "To upgrade every stored package"
    ],
    answer: 1
  },
  {
    question: "14. What should you do before applying a cleanup policy to a production repository?",
    options: [
      "Delete the blob store manually",
      "Disable repository backups",
      "Review retention requirements and test the cleanup criteria",
      "Remove all user permissions"
    ],
    answer: 2
  },
  {
    question: "15. Which repository type is designed to hold artifacts published by your organization?",
    options: [
      "Hosted",
      "Proxy",
      "Group",
      "Remote upstream"
    ],
    answer: 0
  },
  {
    question: "16. What is a key benefit of using Nexus as a central artifact repository?",
    options: [
      "It guarantees every artifact is vulnerability-free",
      "It replaces the need for testing",
      "It automatically fixes application defects",
      "It centralizes artifact storage and access"
    ],
    answer: 3
  },
  {
    question: "17. What does a Nexus repository format determine?",
    options: [
      "The server's CPU architecture",
      "The package ecosystem and repository protocol supported",
      "The user's desktop resolution",
      "The Git commit history"
    ],
    answer: 1
  },
  {
    question: "18. What is the purpose of a Nexus repository URL?",
    options: [
      "To set a user's password",
      "To compile Java code",
      "To provide a client endpoint for repository operations",
      "To define a Linux kernel module"
    ],
    answer: 2
  },
  {
    question: "19. What is a repository's upstream endpoint used for in a proxy configuration?",
    options: [
      "To identify the remote repository from which content is retrieved",
      "To set the administrator's email",
      "To create a local operating system account",
      "To configure a Git merge strategy"
    ],
    answer: 0
  },
  {
    question: "20. Why should repository endpoints be documented for development teams?",
    options: [
      "To eliminate authentication",
      "To prevent all artifact updates",
      "To avoid keeping build logs",
      "To help clients use the correct repository consistently"
    ],
    answer: 3
  },
  {
    question: "21. What is the purpose of Nexus user management?",
    options: [
      "To create software artifacts",
      "To control which identities can access Nexus",
      "To run automated builds",
      "To allocate Kubernetes nodes"
    ],
    answer: 1
  },
  {
    question: "22. What is the principle of least privilege in Nexus administration?",
    options: [
      "Every user receives administrator access",
      "All users share one account",
      "Users receive only the permissions needed for their tasks",
      "Authentication is disabled for internal users"
    ],
    answer: 2
  },
  {
    question: "23. What is the purpose of a Nexus role?",
    options: [
      "To group permissions that can be assigned to users",
      "To store binary artifacts",
      "To cache upstream packages",
      "To configure a blob store's filesystem"
    ],
    answer: 0
  },
  {
    question: "24. A developer should download artifacts but must not upload them. What should you configure?",
    options: [
      "Full administrator access",
      "Anonymous deployment access",
      "Permission to delete all repositories",
      "Read or browse permissions appropriate to the required repositories"
    ],
    answer: 3
  },
  {
    question: "25. A CI account receives HTTP 401 from Nexus. What is the most likely area to investigate?",
    options: [
      "Disk cleanup schedules only",
      "Authentication credentials or authentication configuration",
      "Artifact retention policies only",
      "Repository display names only"
    ],
    answer: 1
  },
  {
    question: "26. A CI account receives HTTP 403 when uploading an artifact. What should you investigate?",
    options: [
      "Only the server's timezone",
      "Only the artifact filename",
      "The account's repository privileges and authorization",
      "Only the browser version"
    ],
    answer: 2
  },
  {
    question: "27. Why should Nexus administrator credentials be protected?",
    options: [
      "They may allow powerful changes to repositories, users, and system configuration",
      "They only control browser themes",
      "They are required to read every public webpage",
      "They automatically expire every minute"
    ],
    answer: 0
  },
  {
    question: "28. Where should CI/CD credentials for Nexus be stored?",
    options: [
      "In public documentation",
      "Inside a committed plaintext configuration file",
      "In build output logs",
      "In an approved secrets or credentials management system"
    ],
    answer: 3
  },
  {
    question: "29. What should you do if a Nexus service-account token is exposed?",
    options: [
      "Ignore the exposure if the build succeeds",
      "Revoke or rotate the token and investigate possible misuse",
      "Commit the token to another repository",
      "Disable all monitoring"
    ],
    answer: 1
  },
  {
    question: "30. Why is HTTPS important for Nexus client connections?",
    options: [
      "It replaces authorization rules",
      "It guarantees artifacts contain no malware",
      "It protects data in transit and supports server identity verification",
      "It removes the need for passwords or tokens"
    ],
    answer: 2
  },
  {
    question: "31. What should be considered when exposing Nexus to external networks?",
    options: [
      "Use controlled network access, TLS, strong authentication, and timely patching",
      "Expose all management interfaces without restrictions",
      "Allow anonymous uploads by default",
      "Disable access logging"
    ],
    answer: 0
  },
  {
    question: "32. What is a Nexus privilege?",
    options: [
      "A stored JAR file",
      "A repository blob",
      "A cleanup schedule",
      "A permission that allows a particular operation on a resource"
    ],
    answer: 3
  },
  {
    question: "33. What is the purpose of anonymous access in Nexus?",
    options: [
      "To give every visitor administrator privileges",
      "To allow configured access without individual login credentials",
      "To bypass every repository permission",
      "To upload artifacts without restrictions"
    ],
    answer: 1
  },
  {
    question: "34. What is a safer approach when anonymous access is not required?",
    options: [
      "Give anonymous users administrator access",
      "Share an administrator password",
      "Disable anonymous access and require authorized identities",
      "Remove all access controls"
    ],
    answer: 2
  },
  {
    question: "35. What is a good practice for Nexus service accounts?",
    options: [
      "Use dedicated accounts with limited permissions and managed credentials",
      "Give every service account full administration rights",
      "Share one account across every organization",
      "Store account secrets in public source control"
    ],
    answer: 0
  },
  {
    question: "36. Why should repository access logs be reviewed?",
    options: [
      "To change artifact formats automatically",
      "To remove the need for TLS",
      "To guarantee every user is trustworthy",
      "To investigate errors, access patterns, and potentially suspicious activity"
    ],
    answer: 3
  },
  {
    question: "37. Nexus cannot accept uploads because the disk is full. What should you check first?",
    options: [
      "Only the repository's display name",
      "Filesystem capacity, blob-store usage, and storage growth",
      "Only the browser cache",
      "Only the Git branch name"
    ],
    answer: 1
  },
  {
    question: "38. Nexus is responding slowly. Which investigation is most useful?",
    options: [
      "Change every repository name",
      "Delete random files from the data directory",
      "Inspect CPU, memory, disk I/O, network, logs, and request load",
      "Disable all access controls"
    ],
    answer: 2
  },
  {
    question: "39. What can happen if an administrator manually deletes files from a Nexus blob store?",
    options: [
      "Repository data may become inconsistent or corrupted",
      "All artifacts become more secure",
      "Every repository is automatically repaired",
      "All credentials are rotated"
    ],
    answer: 0
  },
  {
    question: "40. What is a safe way to remove unwanted repository content?",
    options: [
      "Delete arbitrary files directly from the blob-store directory",
      "Delete the entire application data directory",
      "Remove the database files manually",
      "Use supported repository administration and cleanup procedures"
    ],
    answer: 3
  },
  {
    question: "41. Why should Nexus disk usage be monitored?",
    options: [
      "Artifact repositories never grow",
      "Storage exhaustion can cause failed uploads and service disruption",
      "Disk usage determines the user's password",
      "Monitoring automatically removes every artifact"
    ],
    answer: 1
  },
  {
    question: "42. What should a Nexus backup strategy cover?",
    options: [
      "Only the browser bookmarks",
      "Only a screenshot of the UI",
      "Required application data, repository storage, configuration, and a tested recovery procedure",
      "Only the Git repository URL"
    ],
    answer: 2
  },
  {
    question: "43. Why should Nexus restoration procedures be tested?",
    options: [
      "To verify that the system and its required data can actually be recovered",
      "To remove the need for future backups",
      "To disable repository authentication",
      "To automatically upgrade all clients"
    ],
    answer: 0
  },
  {
    question: "44. What should you do before upgrading Nexus Repository Manager?",
    options: [
      "Delete all stored artifacts",
      "Disable all monitoring permanently",
      "Remove the blob-store configuration",
      "Review supported upgrade guidance, compatibility, and recovery plans"
    ],
    answer: 3
  },
  {
    question: "45. A Nexus upgrade fails. What is a sensible first response?",
    options: [
      "Delete the application data immediately",
      "Inspect upgrade logs, verify backup status, and follow supported recovery guidance",
      "Overwrite repository data with empty files",
      "Disable authentication permanently"
    ],
    answer: 1
  },
  {
    question: "46. What is a good reason to separate snapshot and release repositories?",
    options: [
      "Snapshots never change",
      "Release artifacts never need access controls",
      "Different artifact types may need different retention and publishing policies",
      "It eliminates the need for version numbers"
    ],
    answer: 2
  },
  {
    question: "47. Why should released artifacts generally be treated as immutable?",
    options: [
      "To preserve integrity, traceability, and reproducibility",
      "To make every deployment use different binaries",
      "To prevent teams from running tests",
      "To eliminate artifact checksums"
    ],
    answer: 0
  },
  {
    question: "48. What is a benefit of promoting the same verified artifact across environments?",
    options: [
      "Every environment receives an independently rebuilt binary",
      "Artifact checks become unnecessary",
      "Release history is deleted",
      "The tested artifact can be traced through development, staging, and production"
    ],
    answer: 3
  },
  {
    question: "49. Why is artifact retention planning important?",
    options: [
      "All artifacts must be stored forever",
      "Teams may need historical releases for rollback, audits, and debugging",
      "Retention automatically fixes security vulnerabilities",
      "Old artifacts cannot consume storage"
    ],
    answer: 1
  },
  {
    question: "50. What is an important consideration before deleting old release artifacts?",
    options: [
      "Delete every release on the same day",
      "Ignore legal and operational requirements",
      "Verify retention, rollback, and audit requirements",
      "Remove backups first"
    ],
    answer: 2
  },
  {
    question: "51. What should you check when a repository returns HTTP 404 for an artifact?",
    options: [
      "The requested path, artifact coordinates, version, and repository contents",
      "Only the server's CPU model",
      "Only the administrator's display name",
      "Only the browser font"
    ],
    answer: 0
  },
  {
    question: "52. What does HTTP 500 generally indicate when accessing Nexus?",
    options: [
      "The requested artifact is always correct",
      "The client is necessarily offline",
      "The repository has no artifacts",
      "An internal server error occurred and server-side logs should be investigated"
    ],
    answer: 3
  },
  {
    question: "53. A Nexus proxy cannot retrieve an artifact from upstream. What should you investigate?",
    options: [
      "Only the local user's desktop",
      "Upstream availability, network access, proxy configuration, and cached metadata",
      "Only the artifact's display label",
      "Only the browser's zoom level"
    ],
    answer: 1
  },
  {
    question: "54. An artifact exists in a hosted repository but clients cannot retrieve it. What should you check?",
    options: [
      "Only the Jenkins job description",
      "Only the system timezone",
      "The client endpoint, repository membership, permissions, and artifact path",
      "Only the administrator's username"
    ],
    answer: 2
  },
  {
    question: "55. Why should Nexus logs be inspected during troubleshooting?",
    options: [
      "They provide evidence about errors, requests, and service behavior",
      "They automatically repair corrupted data",
      "They replace all monitoring tools",
      "They eliminate the need for backups"
    ],
    answer: 0
  },
  {
    question: "56. Nexus returns an error during an upload. What should you verify?",
    options: [
      "Only the user's desktop resolution",
      "Only the Git commit message",
      "Only the artifact's icon",
      "Authentication, authorization, storage capacity, network connectivity, and server logs"
    ],
    answer: 3
  },
  {
    question: "57. What can cause repeated dependency downloads through a proxy repository?",
    options: [
      "The repository has a display name",
      "Cache configuration, metadata behavior, or clients using different endpoints",
      "The server has a hostname",
      "The user has a web browser"
    ],
    answer: 1
  },
  {
    question: "58. A client cannot connect to Nexus. Which checks are appropriate?",
    options: [
      "Only the artifact version",
      "Only the repository's description",
      "DNS resolution, network route, firewall, port, TLS, and service availability",
      "Only the artifact's file extension"
    ],
    answer: 2
  },
  {
    question: "59. Why should the Nexus server time be configured correctly?",
    options: [
      "Correct time supports reliable logs, certificate validation, and time-based operations",
      "It automatically upgrades the application",
      "It replaces repository permissions",
      "It determines every artifact's contents"
    ],
    answer: 0
  },
  {
    question: "60. What should you investigate if Nexus repeatedly restarts?",
    options: [
      "Only the repository display names",
      "Only the browser cookies",
      "Only the Git branch list",
      "Service logs, memory pressure, disk capacity, process exits, and infrastructure events"
    ],
    answer: 3
  },
  {
    question: "61. What is a Nexus task?",
    options: [
      "A Java source file",
      "An administrative operation that can be scheduled or run in Nexus",
      "A Git commit",
      "A Docker network"
    ],
    answer: 1
  },
  {
    question: "62. Why should scheduled Nexus tasks be reviewed?",
    options: [
      "They automatically replace repository backups",
      "They make access controls unnecessary",
      "To confirm that administrative jobs run safely and as intended",
      "To remove the need for monitoring"
    ],
    answer: 2
  },
  {
    question: "63. What is the purpose of repository metadata?",
    options: [
      "It helps describe and locate artifacts and their versions",
      "It replaces the actual stored files",
      "It grants administrator privileges",
      "It automatically builds application code"
    ],
    answer: 0
  },
  {
    question: "64. What should you check if a proxy repository appears to return outdated metadata?",
    options: [
      "Only the server's hostname",
      "Only the administrator's email",
      "Only the application's source indentation",
      "Upstream metadata, cache behavior, and repository configuration"
    ],
    answer: 3
  },
  {
    question: "65. What is the purpose of a Nexus repository's online or availability state?",
    options: [
      "To set the application's programming language",
      "To control whether the repository is available for relevant operations",
      "To choose the administrator's password",
      "To create new Linux partitions"
    ],
    answer: 1
  },
  {
    question: "66. Why should repository configuration changes be controlled?",
    options: [
      "To prevent users from viewing any artifacts",
      "To remove all repository endpoints",
      "To reduce accidental outages and unauthorized configuration changes",
      "To make every artifact mutable"
    ],
    answer: 2
  },
  {
    question: "67. What is a sensible way to monitor Nexus in production?",
    options: [
      "Use service checks, logs, metrics, and alerts for availability and resource issues",
      "Check the UI only after users complain",
      "Disable all alerts",
      "Monitor only the server hostname"
    ],
    answer: 0
  },
  {
    question: "68. What should you investigate if Nexus storage keeps growing unexpectedly?",
    options: [
      "Only the browser version",
      "Only the Git branch name",
      "Only the server's display name",
      "Artifact growth, retention rules, cleanup tasks, and blob-store usage"
    ],
    answer: 3
  },
  {
    question: "69. Why should you avoid exposing Nexus administration endpoints unnecessarily?",
    options: [
      "They cannot be accessed by administrators",
      "They may increase the attack surface and risk of unauthorized changes",
      "They disable all artifact downloads",
      "They automatically delete repository data"
    ],
    answer: 1
  },
  {
    question: "70. What is a good practice for documenting Nexus incidents?",
    options: [
      "Delete all logs immediately",
      "Record only that the server failed",
      "Record symptoms, timestamps, impact, evidence, root cause, and corrective actions",
      "Publish credentials in the incident report"
    ],
    answer: 2
  },
  {
    question: "71. What is the role of Nexus in a CI/CD pipeline?",
    options: [
      "Store and distribute build artifacts between pipeline stages and environments",
      "Replace every test framework",
      "Replace all source control",
      "Automatically repair every build failure"
    ],
    answer: 0
  },
  {
    question: "72. When should a CI pipeline publish a release artifact to Nexus?",
    options: [
      "Before the code is compiled",
      "Even when mandatory tests fail",
      "Before required security checks run",
      "After required build and verification checks succeed"
    ],
    answer: 3
  },
  {
    question: "73. What should a pipeline do when publishing an artifact fails because of HTTP 401?",
    options: [
      "Disable Nexus authentication",
      "Check the configured credentials and authentication method without exposing secrets",
      "Publish the password in the logs",
      "Delete the release repository"
    ],
    answer: 1
  },
  {
    question: "74. What should a pipeline do when publishing fails because of HTTP 403?",
    options: [
      "Assume the server is out of disk space",
      "Rebuild the application indefinitely",
      "Check the service account's upload privileges and repository authorization",
      "Disable all role assignments"
    ],
    answer: 2
  },
  {
    question: "75. Why should artifact versions include traceable build information when appropriate?",
    options: [
      "To link deployed binaries to the build and source revision",
      "To avoid testing artifacts",
      "To make all releases identical",
      "To remove the need for logs"
    ],
    answer: 0
  },
  {
    question: "76. Why should pipelines avoid publishing different content under the same immutable release version?",
    options: [
      "It reduces the number of repository users",
      "It makes cleanup policies unnecessary",
      "It prevents artifact downloads",
      "It protects traceability and reproducibility"
    ],
    answer: 3
  },
  {
    question: "77. What is a good approach to repository credentials in Jenkins?",
    options: [
      "Hardcode them into a public Jenkinsfile",
      "Use Jenkins credentials binding or another approved secret mechanism",
      "Print them during every build",
      "Store them in the artifact itself"
    ],
    answer: 1
  },
  {
    question: "78. What is an important benefit of using a central Nexus repository across multiple teams?",
    options: [
      "It guarantees every dependency is secure",
      "It eliminates all network failures",
      "It provides a consistent place to publish and retrieve approved artifacts",
      "It replaces the need for version control"
    ],
    answer: 2
  },
  {
    question: "79. How should artifacts be promoted through staging and production?",
    options: [
      "Promote the same verified artifact with controlled approvals and traceability",
      "Rebuild different binaries without tracking versions",
      "Overwrite releases without validation",
      "Delete the artifact after staging"
    ],
    answer: 0
  },
  {
    question: "80. What should be done when a pipeline uploads an artifact but later reports failure?",
    options: [
      "Assume the artifact is definitely corrupt",
      "Delete every repository",
      "Disable pipeline status checks",
      "Inspect the upload result, artifact presence, logs, and subsequent pipeline stages"
    ],
    answer: 3
  },
  {
    question: "81. Why should repository permissions be different for build and read-only accounts?",
    options: [
      "All accounts must be administrators",
      "Build accounts may need publishing rights, while consumer accounts may only need read access",
      "Read-only accounts must delete artifacts",
      "Repository permissions cannot be customized"
    ],
    answer: 1
  },
  {
    question: "82. What is an important security consideration when proxying external dependencies?",
    options: [
      "Trust every artifact without any checks",
      "Disable all logs",
      "Control upstream sources and use appropriate dependency security checks",
      "Allow anonymous uploads to every repository"
    ],
    answer: 2
  },
  {
    question: "83. Why should dependency integrity be verified?",
    options: [
      "To help detect corrupted or unexpectedly modified artifact content",
      "To replace authentication",
      "To eliminate the need for testing",
      "To automatically upgrade Nexus"
    ],
    answer: 0
  },
  {
    question: "84. What is a software supply-chain risk when consuming untrusted packages?",
    options: [
      "They always reduce build time",
      "They cannot contain malicious code",
      "They only affect repository storage",
      "They may introduce vulnerable or malicious code into applications"
    ],
    answer: 3
  },
  {
    question: "85. What is a sensible way to investigate a suspicious artifact?",
    options: [
      "Deploy it immediately to production",
      "Check provenance, version, source, integrity information, and security scan results",
      "Delete the logs before analysis",
      "Disable all repository permissions"
    ],
    answer: 1
  },
  {
    question: "86. Why is patch management important for Nexus Repository Manager?",
    options: [
      "It eliminates all operational monitoring",
      "It guarantees there will be no vulnerabilities",
      "It helps address known defects and security vulnerabilities in supported versions",
      "It automatically validates every uploaded artifact"
    ],
    answer: 2
  },
  {
    question: "87. What should be considered before changing Nexus repository permissions?",
    options: [
      "The affected users, required operations, least-privilege principles, and operational impact",
      "Only the repository's display color",
      "Only the server's hostname",
      "Only the artifact extension"
    ],
    answer: 0
  },
  {
    question: "88. Why should sensitive information not be included in Nexus artifact metadata unnecessarily?",
    options: [
      "Metadata is never stored",
      "Only administrators can ever see metadata",
      "Metadata is always encrypted end to end",
      "Metadata may be accessible to repository consumers and could expose confidential information"
    ],
    answer: 3
  },
  {
    question: "89. What is an appropriate response to unexpected anonymous uploads?",
    options: [
      "Grant the anonymous account more permissions",
      "Review access settings and logs, restrict unauthorized publishing, and investigate the incident",
      "Ignore the activity",
      "Delete all audit evidence"
    ],
    answer: 1
  },
  {
    question: "90. Why should repository administration actions be auditable?",
    options: [
      "To eliminate the need for user accounts",
      "To automatically prevent every incident",
      "To help establish who changed configuration and when",
      "To remove the need for backups"
    ],
    answer: 2
  },
  {
    question: "91. A Nexus service becomes unavailable after a configuration change. What should you do first?",
    options: [
      "Review logs and recent changes, then follow the approved recovery procedure",
      "Delete the data directory",
      "Disable all security settings permanently",
      "Randomly change every port"
    ],
    answer: 0
  },
  {
    question: "92. What is a key consideration when deploying Nexus in a container?",
    options: [
      "Store all critical data only in the writable container layer",
      "Disable storage monitoring",
      "Expose the management interface publicly without authentication",
      "Configure persistent storage, backups, resource limits, and supported upgrade procedures"
    ],
    answer: 3
  },
  {
    question: "93. A Nexus container restarts and repository data disappears. What is a likely cause?",
    options: [
      "The repository display name is too long",
      "Persistent storage may be missing or mounted incorrectly",
      "The artifact version contains numbers",
      "The administrator used a browser"
    ],
    answer: 1
  },
  {
    question: "94. Why should the supported Nexus deployment architecture be checked before scaling?",
    options: [
      "Scaling always removes repository data",
      "All architectures support unlimited traffic",
      "Product edition, supported architecture, storage design, and resource limits affect the solution",
      "Scaling replaces the need for backups"
    ],
    answer: 2
  },
  {
    question: "95. What should be monitored when planning Nexus capacity?",
    options: [
      "Artifact storage growth, request load, CPU, memory, disk I/O, and network usage",
      "Only the browser's font size",
      "Only the administrator's username",
      "Only the repository description"
    ],
    answer: 0
  },
  {
    question: "96. Why should restoration and disaster-recovery plans include clear recovery objectives?",
    options: [
      "They remove the need for testing",
      "They make all artifacts immutable",
      "They guarantee no outage can occur",
      "They define acceptable recovery time and data-loss limits"
    ],
    answer: 3
  },
  {
    question: "97. What should you do if Nexus disk usage rises rapidly after many CI builds?",
    options: [
      "Delete random files directly from blob storage",
      "Identify growing repositories and apply approved retention and cleanup measures",
      "Disable every pipeline permanently",
      "Remove all repository metadata manually"
    ],
    answer: 1
  },
  {
    question: "98. What is a good practice when operating Nexus in production?",
    options: [
      "Ignore server logs",
      "Use one shared administrator account",
      "Monitor health, secure access, maintain tested backups, and plan upgrades",
      "Allow all users to delete release artifacts"
    ],
    answer: 2
  },
  {
    question: "99. A team cannot find an artifact that a pipeline claims to have published. What should you verify?",
    options: [
      "The publication result, coordinates and version, destination repository, and user permissions",
      "Only the server wallpaper",
      "Only the developer's keyboard layout",
      "Only the browser's saved bookmarks"
    ],
    answer: 0
  },
  {
    question: "100. Which is the best overall production practice for Nexus Repository Manager?",
    options: [
      "Allow unrestricted uploads and skip backups",
      "Store credentials in public source control",
      "Ignore storage usage and server health",
      "Use least-privilege access, secure credentials, controlled artifact publishing, monitoring, cleanup, and tested recovery"
    ],
    answer: 3
  }
];
```
