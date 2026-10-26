export interface SonarQubeQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
}

export const sonarqubeQuestions: SonarQubeQuestion[] = [
  {
    id: 1,
    question: "What is SonarQube?",
    options: [
      "A container orchestration tool",
      "A code quality and security analysis platform",
      "A source code version control system",
      "A container image registry"
    ],
    answer: 1
  },
  {
    id: 2,
    question: "What is the primary purpose of SonarQube in a DevOps pipeline?",
    options: [
      "To provision cloud infrastructure",
      "To deploy applications to Kubernetes",
      "To analyze source code for bugs, vulnerabilities, and code smells",
      "To store Docker images"
    ],
    answer: 2
  },
  {
    id: 3,
    question: "What is a SonarQube project?",
    options: [
      "A logical unit used to organize and analyze a codebase",
      "A Kubernetes node",
      "A Docker network",
      "A Git hosting server"
    ],
    answer: 0
  },
  {
    id: 4,
    question: "What is SonarScanner used for?",
    options: [
      "Creating container images",
      "Managing Linux users",
      "Deploying Helm charts",
      "Analyzing source code and sending analysis data to SonarQube"
    ],
    answer: 3
  },
  {
    id: 5,
    question: "What is a Quality Gate in SonarQube?",
    options: [
      "A firewall rule",
      "A set of conditions used to determine whether code meets quality requirements",
      "A Git branching strategy",
      "A Kubernetes admission controller"
    ],
    answer: 1
  },
  {
    id: 6,
    question: "What happens when a SonarQube Quality Gate fails in a properly configured CI pipeline?",
    options: [
      "The source code is automatically deleted",
      "The application is always deployed anyway",
      "The pipeline can be configured to fail and block progression",
      "SonarQube automatically fixes every issue"
    ],
    answer: 2
  },
  {
    id: 7,
    question: "What is a code smell?",
    options: [
      "A code pattern that may indicate maintainability problems",
      "A confirmed production outage",
      "A Docker image vulnerability only",
      "A failed Git clone"
    ],
    answer: 0
  },
  {
    id: 8,
    question: "What is a vulnerability in static code analysis?",
    options: [
      "A missing README file",
      "A slow Git branch checkout",
      "An unused dashboard",
      "A coding weakness that may introduce a security risk"
    ],
    answer: 3
  },
  {
    id: 9,
    question: "What is a bug in SonarQube analysis?",
    options: [
      "A code formatting preference only",
      "A coding issue that may cause incorrect behavior",
      "A successful deployment",
      "A repository permission"
    ],
    answer: 1
  },
  {
    id: 10,
    question: "What is static application security testing (SAST)?",
    options: [
      "Testing only a running application's network traffic",
      "Testing the physical server hardware",
      "Analyzing source code or compiled representations for security weaknesses",
      "Testing database backups only"
    ],
    answer: 2
  },
  {
    id: 11,
    question: "What does technical debt represent in SonarQube?",
    options: [
      "Estimated effort required to fix maintainability issues",
      "The monthly cloud bill",
      "The number of Git contributors",
      "The number of running containers"
    ],
    answer: 0
  },
  {
    id: 12,
    question: "What is code coverage?",
    options: [
      "The percentage of servers running Linux",
      "The percentage of Docker images scanned",
      "The percentage of pull requests approved",
      "The proportion of code exercised by tests, according to the coverage tool"
    ],
    answer: 3
  },
  {
    id: 13,
    question: "Does SonarQube automatically generate unit test coverage data for every language?",
    options: [
      "Yes, for all languages without external tools",
      "No, coverage is generally imported from compatible coverage reports",
      "Yes, but only when Docker is installed",
      "No, SonarQube cannot display coverage"
    ],
    answer: 1
  },
  {
    id: 14,
    question: "What is the purpose of new code analysis in SonarQube?",
    options: [
      "To delete all legacy source code",
      "To analyze only deployment YAML files",
      "To focus quality evaluation on code added or changed within the configured new-code period",
      "To replace unit testing"
    ],
    answer: 2
  },
  {
    id: 15,
    question: "What is a project key in SonarQube?",
    options: [
      "A unique identifier used to identify a project",
      "The server's SSH private key",
      "A Docker registry password",
      "A Kubernetes service account token"
    ],
    answer: 0
  },
  {
    id: 16,
    question: "What is a project token used for?",
    options: [
      "Encrypting every source file",
      "Replacing the project's Git history",
      "Creating a Quality Gate",
      "Authenticating an authorized analysis or integration request"
    ],
    answer: 3
  },
  {
    id: 17,
    question: "Where should a SonarQube analysis token be stored in a CI/CD pipeline?",
    options: [
      "Inside publicly committed source code",
      "In a protected CI/CD secret or credential store",
      "In the project README",
      "As a source code comment"
    ],
    answer: 1
  },
  {
    id: 18,
    question: "Why should a SonarQube token not be hardcoded in a Jenkinsfile committed to Git?",
    options: [
      "Jenkins cannot run SonarQube",
      "Tokens cannot be used by CI systems",
      "It can expose credentials to unauthorized users",
      "SonarQube requires passwords in plain text"
    ],
    answer: 2
  },
  {
    id: 19,
    question: "Which permission is generally required to submit analysis for a SonarQube project?",
    options: [
      "Execute Analysis",
      "Administer System",
      "Delete Every Project",
      "Administer Quality Profiles only"
    ],
    answer: 0
  },
  {
    id: 20,
    question: "What is the purpose of SonarQube Quality Profiles?",
    options: [
      "To configure Kubernetes replicas",
      "To store CI/CD pipeline logs",
      "To define Git merge strategies",
      "To determine which coding rules are used during analysis"
    ],
    answer: 3
  },
  {
    id: 21,
    question: "What is the difference between a Quality Profile and a Quality Gate?",
    options: [
      "They are exactly the same feature",
      "A profile defines analysis rules; a gate evaluates configured quality conditions",
      "A profile stores Docker images; a gate deploys them",
      "A profile controls Git access; a gate manages Linux users"
    ],
    answer: 1
  },
  {
    id: 22,
    question: "What is the purpose of assigning a Quality Profile to a language?",
    options: [
      "To set the server's IP address",
      "To create a new database",
      "To determine which language rules apply during analysis",
      "To configure Jenkins agents"
    ],
    answer: 2
  },
  {
    id: 23,
    question: "What is a rule in SonarQube?",
    options: [
      "A check that identifies a particular code issue or undesirable pattern",
      "A Docker network",
      "A Kubernetes storage volume",
      "A Git remote URL"
    ],
    answer: 0
  },
  {
    id: 24,
    question: "What is an issue severity or impact classification used for?",
    options: [
      "Choosing the server's operating system",
      "Setting the Git commit author",
      "Defining a Docker image tag",
      "Communicating the importance or impact of a detected issue"
    ],
    answer: 3
  },
  {
    id: 25,
    question: "What does the SonarQube scanner typically do before server-side processing?",
    options: [
      "Deploys the application to production",
      "Collects and analyzes source files according to the configured analysis",
      "Restarts the database",
      "Deletes all existing issues"
    ],
    answer: 1
  },
  {
    id: 26,
    question: "What is the purpose of sonar-project.properties?",
    options: [
      "To define Kubernetes NetworkPolicies",
      "To store GitHub passwords",
      "To configure project analysis properties for SonarScanner",
      "To define a Docker Compose network"
    ],
    answer: 2
  },
  {
    id: 27,
    question: "Which property identifies the project in a typical SonarScanner configuration?",
    options: [
      "sonar.projectKey",
      "sonar.dockerImage",
      "sonar.gitPassword",
      "sonar.kubernetesNode"
    ],
    answer: 0
  },
  {
    id: 28,
    question: "Which property specifies the SonarQube server URL for a scanner?",
    options: [
      "sonar.projectName",
      "sonar.java.binaries",
      "sonar.sourceEncoding",
      "sonar.host.url"
    ],
    answer: 3
  },
  {
    id: 29,
    question: "What is the purpose of sonar.sources?",
    options: [
      "To specify the database backup location",
      "To identify source directories to analyze",
      "To configure the server's SMTP host",
      "To select Docker registries"
    ],
    answer: 1
  },
  {
    id: 30,
    question: "What is the purpose of sonar.tests?",
    options: [
      "To specify the SonarQube server's test port",
      "To configure a Quality Gate",
      "To identify test source directories",
      "To define a production deployment environment"
    ],
    answer: 2
  },
  {
    id: 31,
    question: "What is sonar.exclusions used for?",
    options: [
      "Excluding matching files from source analysis",
      "Disabling all Quality Gates",
      "Deleting project history",
      "Changing a user's permissions"
    ],
    answer: 0
  },
  {
    id: 32,
    question: "What is the risk of excluding too many source files from SonarQube analysis?",
    options: [
      "The Git repository automatically becomes private",
      "Jenkins loses all its plugins",
      "The application cannot compile",
      "Important code quality and security issues may go undetected"
    ],
    answer: 3
  },
  {
    id: 33,
    question: "Why can Java analysis require compiled class files?",
    options: [
      "Java source files cannot be read by any scanner",
      "Some Java analysis rules need bytecode information",
      "Compiled classes are required to configure Git",
      "SonarQube only analyzes JAR filenames"
    ],
    answer: 1
  },
  {
    id: 34,
    question: "What is sonar.java.binaries used for in Java analysis?",
    options: [
      "To specify a Docker binary",
      "To specify a Maven repository password",
      "To identify directories containing compiled Java bytecode",
      "To configure Java application runtime ports"
    ],
    answer: 2
  },
  {
    id: 35,
    question: "A Java SonarQube scan fails because compiled classes are missing. What should you do?",
    options: [
      "Build the project first and configure the scanner to locate compiled classes",
      "Delete the SonarQube database",
      "Disable source control",
      "Replace the Java application with a Dockerfile"
    ],
    answer: 0
  },
  {
    id: 36,
    question: "Why is scanner compatibility with the SonarQube server important?",
    options: [
      "It determines the Git commit message format",
      "It changes the application's programming language",
      "It automatically upgrades all dependencies",
      "Incompatible versions can cause analysis failures or unsupported behavior"
    ],
    answer: 3
  },
  {
    id: 37,
    question: "What is the purpose of SonarScanner for Maven?",
    options: [
      "To replace Maven's dependency resolution",
      "To run SonarQube analysis as part of a Maven build",
      "To host Docker images",
      "To create Kubernetes clusters"
    ],
    answer: 1
  },
  {
    id: 38,
    question: "What is the purpose of SonarScanner for Gradle?",
    options: [
      "To replace Gradle completely",
      "To manage GitHub organization permissions",
      "To integrate SonarQube analysis into a Gradle build",
      "To deploy the application to every cloud provider"
    ],
    answer: 2
  },
  {
    id: 39,
    question: "How can Jenkins integrate with SonarQube?",
    options: [
      "By configuring scanner execution, server details, credentials, and Quality Gate handling",
      "By treating SonarQube as a Docker registry only",
      "By removing all source code from the workspace",
      "By disabling Jenkins agents"
    ],
    answer: 0
  },
  {
    id: 40,
    question: "What is the purpose of the SonarQube Jenkins plugin?",
    options: [
      "To replace the Jenkins controller",
      "To build Linux kernels",
      "To manage cloud DNS records",
      "To help integrate SonarQube analysis and related pipeline features with Jenkins"
    ],
    answer: 3
  },
  {
    id: 41,
    question: "In a Jenkins pipeline, what is withSonarQubeEnv commonly used for?",
    options: [
      "Creating a Kubernetes cluster",
      "Providing configured SonarQube environment details for a pipeline step",
      "Deleting all Jenkins credentials",
      "Starting a database migration"
    ],
    answer: 1
  },
  {
    id: 42,
    question: "What is the purpose of waitForQualityGate in a supported Jenkins SonarQube integration?",
    options: [
      "To wait until Docker finishes building",
      "To wait for a Git branch to be deleted",
      "To wait for the SonarQube Quality Gate result",
      "To wait for every Kubernetes pod to terminate"
    ],
    answer: 2
  },
  {
    id: 43,
    question: "What is needed for Jenkins to receive SonarQube webhook notifications reliably?",
    options: [
      "A correctly configured webhook endpoint that the SonarQube server can reach",
      "A second Git repository with the same name",
      "A public source code token committed to Git",
      "A Docker image with no exposed ports"
    ],
    answer: 0
  },
  {
    id: 44,
    question: "A Jenkins pipeline finishes scanning, but waitForQualityGate never completes. What should you investigate?",
    options: [
      "Only the Maven project name",
      "The Git branch color",
      "The Docker image creation timestamp",
      "Webhook configuration, network reachability, pipeline integration, and analysis completion"
    ],
    answer: 3
  },
  {
    id: 45,
    question: "Where should a SonarQube scan usually occur in a CI pipeline?",
    options: [
      "Only after the application has been decommissioned",
      "During or after the build/test stage and before release decisions",
      "Only after deleting the source repository",
      "Before the source code exists"
    ],
    answer: 1
  },
  {
    id: 46,
    question: "Why should a Quality Gate be checked before production deployment?",
    options: [
      "To guarantee the application has zero runtime defects",
      "To eliminate the need for monitoring",
      "To enforce configured quality conditions before release progression",
      "To replace integration and security testing"
    ],
    answer: 2
  },
  {
    id: 47,
    question: "What is pull request analysis used for in SonarQube?",
    options: [
      "To provide code analysis feedback on changes proposed in a pull request",
      "To merge every pull request automatically",
      "To replace Git hosting",
      "To restart production servers"
    ],
    answer: 0
  },
  {
    id: 48,
    question: "Why can SonarQube branch analysis be useful?",
    options: [
      "It removes the need for version control",
      "It automatically resolves all merge conflicts",
      "It replaces code review",
      "It allows code quality to be evaluated for supported branches separately"
    ],
    answer: 3
  },
  {
    id: 49,
    question: "A pull request does not show SonarQube analysis results. What should you check?",
    options: [
      "Only the Docker image size",
      "Branch or PR analysis configuration, permissions, CI execution, and supported edition/features",
      "The number of Linux users",
      "The Grafana dashboard title"
    ],
    answer: 1
  },
  {
    id: 50,
    question: "Why should you verify SonarQube edition and version before planning branch or pull request analysis?",
    options: [
      "Every edition has exactly the same feature set",
      "The edition changes the application's programming language",
      "Available analysis features can depend on edition, version, and integration",
      "The edition determines the Git commit hash"
    ],
    answer: 2
  },
  {
    id: 51,
    question: "What is the purpose of a SonarQube webhook?",
    options: [
      "To notify an external system when configured SonarQube events occur",
      "To store source code in the database",
      "To compile every project automatically",
      "To replace the scanner"
    ],
    answer: 0
  },
  {
    id: 52,
    question: "What is a common use of SonarQube web APIs?",
    options: [
      "To replace the operating system",
      "To run every application's unit tests automatically",
      "To create physical servers",
      "To retrieve project, issue, and analysis information or perform authorized actions"
    ],
    answer: 3
  },
  {
    id: 53,
    question: "Why should API access to SonarQube be protected?",
    options: [
      "API access cannot return any project data",
      "Unauthorized access can expose information or permit actions beyond intended privileges",
      "APIs only work on private networks",
      "Every API request automatically fixes vulnerabilities"
    ],
    answer: 1
  },
  {
    id: 54,
    question: "What is the purpose of user groups in SonarQube?",
    options: [
      "To group source files by extension only",
      "To create Docker networks",
      "To simplify permission management for multiple users",
      "To replace Quality Profiles"
    ],
    answer: 2
  },
  {
    id: 55,
    question: "What is the principle of least privilege?",
    options: [
      "Grant users only the permissions necessary for their responsibilities",
      "Give every user system administrator access",
      "Share one token across every team",
      "Disable authentication for convenience"
    ],
    answer: 0
  },
  {
    id: 56,
    question: "What should an administrator do when a CI token is suspected to be compromised?",
    options: [
      "Publish the token so everyone knows it",
      "Ignore it if the pipeline is working",
      "Put the token in source code comments",
      "Revoke or rotate it, investigate exposure, and update authorized secret stores"
    ],
    answer: 3
  },
  {
    id: 57,
    question: "What is the purpose of SonarQube project permissions?",
    options: [
      "To set application CPU limits",
      "To control which users or groups can perform project-level actions",
      "To create Git commits",
      "To change a server's IP address"
    ],
    answer: 1
  },
  {
    id: 58,
    question: "Why should a SonarQube server be kept up to date using a planned upgrade process?",
    options: [
      "To guarantee that all custom code is automatically rewritten",
      "To remove all security controls",
      "To receive supported fixes and features while managing compatibility and migration risks",
      "To eliminate the need for backups"
    ],
    answer: 2
  },
  {
    id: 59,
    question: "What should be done before upgrading a production SonarQube instance?",
    options: [
      "Review upgrade requirements, back up relevant data, and test the upgrade plan",
      "Delete the database without a backup",
      "Disable all authentication permanently",
      "Upgrade directly without reviewing version requirements"
    ],
    answer: 0
  },
  {
    id: 60,
    question: "Why is database compatibility important when upgrading SonarQube?",
    options: [
      "The database controls Git branch names",
      "The database determines every application's source language",
      "All database versions are always interchangeable",
      "The new SonarQube version may require a supported database version and migration path"
    ],
    answer: 3
  },
  {
    id: 61,
    question: "Which database is commonly used for supported self-managed SonarQube installations?",
    options: [
      "Redis as the only supported database for every edition",
      "PostgreSQL, subject to the requirements of the particular SonarQube version",
      "A Git repository used as a database",
      "A browser's local storage"
    ],
    answer: 1
  },
  {
    id: 62,
    question: "What is the purpose of the SonarQube database?",
    options: [
      "To store all application runtime logs indefinitely",
      "To replace source control",
      "To persist SonarQube application data and analysis-related information",
      "To build every Docker image"
    ],
    answer: 2
  },
  {
    id: 63,
    question: "What should be included in a practical SonarQube recovery plan?",
    options: [
      "Appropriate backups, compatible versions, recovery procedures, and restoration tests",
      "Only a screenshot of the dashboard",
      "Only the Jenkins build number",
      "Only a copy of the README"
    ],
    answer: 0
  },
  {
    id: 64,
    question: "SonarQube fails to start after a configuration change. What is a sensible first step?",
    options: [
      "Delete the source repository",
      "Disable every project Quality Gate",
      "Rebuild every application image",
      "Inspect SonarQube logs, configuration, resource availability, and database connectivity"
    ],
    answer: 3
  },
  {
    id: 65,
    question: "SonarQube displays a database connection error. What should you check?",
    options: [
      "Only the project description",
      "Database availability, connection settings, credentials, network, and compatibility",
      "Only the number of Git branches",
      "Only the scanner's source exclusions"
    ],
    answer: 1
  },
  {
    id: 66,
    question: "A SonarScanner job cannot connect to the server. What should you investigate?",
    options: [
      "Only the application's CSS",
      "Only the Quality Gate name",
      "Server URL, DNS, network connectivity, TLS, and authentication",
      "The Docker image's README"
    ],
    answer: 2
  },
  {
    id: 67,
    question: "What is a common cause of a SonarScanner authentication failure?",
    options: [
      "An invalid, expired, revoked, or insufficiently privileged token",
      "A successful unit test",
      "A valid project key by itself",
      "A low number of source files"
    ],
    answer: 0
  },
  {
    id: 68,
    question: "What should you do if SonarQube analysis fails because the scanner cannot identify the project?",
    options: [
      "Delete the SonarQube database",
      "Change the server's operating system",
      "Disable the CI pipeline",
      "Verify the project key, server URL, and analysis configuration"
    ],
    answer: 3
  },
  {
    id: 69,
    question: "Why might SonarQube report zero analyzed source files?",
    options: [
      "The project always has perfect code",
      "Source paths, file patterns, exclusions, or language settings may be incorrect",
      "SonarQube cannot analyze source files",
      "The database is necessarily corrupted"
    ],
    answer: 1
  },
  {
    id: 70,
    question: "A scan succeeds but coverage is missing. What should you check?",
    options: [
      "Only the project logo",
      "The server's keyboard layout",
      "Whether tests generated a coverage report and the configured report path is correct",
      "Whether Git has any branches"
    ],
    answer: 2
  },
  {
    id: 71,
    question: "What is the purpose of importing an LCOV report in a compatible SonarQube JavaScript or TypeScript analysis?",
    options: [
      "To provide coverage information generated by a compatible test coverage tool",
      "To upload a Docker image",
      "To configure database credentials",
      "To create new Git branches"
    ],
    answer: 0
  },
  {
    id: 72,
    question: "A SonarQube scan is taking too long. What is a reasonable investigation?",
    options: [
      "Increase all source exclusions without review",
      "Delete the Quality Profiles",
      "Disable all authentication",
      "Inspect scanner logs, project size, analysis scope, server resources, and network delays"
    ],
    answer: 3
  },
  {
    id: 73,
    question: "What is the purpose of scanner debug logging during troubleshooting?",
    options: [
      "To expose secrets in public logs",
      "To obtain more detailed information about analysis steps and failures",
      "To automatically fix all code smells",
      "To replace server logs permanently"
    ],
    answer: 1
  },
  {
    id: 74,
    question: "What should you do if a SonarQube background task remains pending or fails?",
    options: [
      "Delete all project source files",
      "Ignore the task status permanently",
      "Inspect background task details, server logs, queue pressure, and available resources",
      "Disable every Quality Gate"
    ],
    answer: 2
  },
  {
    id: 75,
    question: "Why are SonarQube background tasks important?",
    options: [
      "They process submitted analysis reports and related server-side work",
      "They build all Docker images",
      "They replace the database",
      "They manage Git credentials only"
    ],
    answer: 0
  },
  {
    id: 76,
    question: "What should you investigate when SonarQube becomes slow under heavy usage?",
    options: [
      "Only the browser's font",
      "Only Git commit messages",
      "Only the project icon",
      "CPU, memory, database performance, concurrent analyses, and background task load"
    ],
    answer: 3
  },
  {
    id: 77,
    question: "Why should SonarQube server logs be monitored?",
    options: [
      "To replace automated tests",
      "To identify errors, performance issues, and operational problems",
      "To remove the need for database backups",
      "To generate source code automatically"
    ],
    answer: 1
  },
  {
    id: 78,
    question: "What is an important consideration when exposing SonarQube to a network?",
    options: [
      "Make every endpoint publicly writable",
      "Disable HTTPS everywhere",
      "Use appropriate network restrictions, authentication, and TLS",
      "Share administrator credentials with all developers"
    ],
    answer: 2
  },
  {
    id: 79,
    question: "What is the purpose of a reverse proxy in front of SonarQube?",
    options: [
      "It can provide controlled routing and TLS termination when configured correctly",
      "It replaces SonarQube's analysis engine",
      "It automatically fixes source code vulnerabilities",
      "It replaces all database backups"
    ],
    answer: 0
  },
  {
    id: 80,
    question: "What should you consider when running SonarQube in Docker?",
    options: [
      "Store every important file only in a disposable container layer",
      "Disable all health checks",
      "Run without considering resource requirements",
      "Use supported images, persistent storage where required, proper configuration, and resource limits"
    ],
    answer: 3
  },
  {
    id: 81,
    question: "Why should persistent storage be considered for a containerized SonarQube deployment?",
    options: [
      "To guarantee that no backup is needed",
      "To preserve required data across container replacement or recreation",
      "To replace the external database in every setup",
      "To make the scanner run inside every developer's browser"
    ],
    answer: 1
  },
  {
    id: 82,
    question: "What is a key concern when deploying SonarQube on Kubernetes?",
    options: [
      "Every pod must use a unique source language",
      "The scanner must run as the Kubernetes control plane",
      "Database persistence, configuration, resource sizing, and supported deployment requirements",
      "All workloads must run without persistent storage"
    ],
    answer: 2
  },
  {
    id: 83,
    question: "Why should you review the supported deployment requirements before installing SonarQube on Kubernetes?",
    options: [
      "Resource, storage, security, and platform requirements can differ by version and deployment method",
      "SonarQube never works outside a laptop",
      "Kubernetes automatically configures every database correctly",
      "It eliminates the need for monitoring"
    ],
    answer: 0
  },
  {
    id: 84,
    question: "What is the role of Elasticsearch in many self-managed SonarQube installations?",
    options: [
      "To build Java application artifacts",
      "To replace Git repositories",
      "To run Jenkins pipelines",
      "To support search and indexing of SonarQube data"
    ],
    answer: 3
  },
  {
    id: 85,
    question: "SonarQube fails to start because its search engine cannot start. What should you investigate?",
    options: [
      "Only the Quality Gate name",
      "Relevant logs, memory, file limits, permissions, and documented system requirements",
      "The application's CSS",
      "The Git branch protection setting"
    ],
    answer: 1
  },
  {
    id: 86,
    question: "What is the purpose of SonarQube's new-code definition?",
    options: [
      "To determine the operating system version",
      "To define Docker build arguments",
      "To establish which code changes count as new code for quality evaluation",
      "To select the database administrator"
    ],
    answer: 2
  },
  {
    id: 87,
    question: "Why can focusing on new code improve code quality over time?",
    options: [
      "It encourages teams to meet quality expectations for new changes while improving existing code incrementally",
      "It guarantees all legacy issues disappear immediately",
      "It eliminates the need for code reviews",
      "It automatically upgrades all libraries"
    ],
    answer: 0
  },
  {
    id: 88,
    question: "What should a developer do when SonarQube identifies a genuine security vulnerability?",
    options: [
      "Ignore the issue if the pipeline passes",
      "Delete the analysis history",
      "Disable the relevant rule for every project",
      "Investigate the finding, fix the underlying weakness, and verify with analysis and tests"
    ],
    answer: 3
  },
  {
    id: 89,
    question: "What is the difference between marking an issue as False Positive and fixing it?",
    options: [
      "Both actions always change the source code in the same way",
      "A False Positive classification says the finding is not a valid issue; fixing changes the underlying code",
      "A False Positive always means the server is down",
      "Fixing an issue only changes a dashboard color"
    ],
    answer: 1
  },
  {
    id: 90,
    question: "When is marking a SonarQube issue as Accepted or otherwise formally acknowledged appropriate?",
    options: [
      "Whenever a scanner fails to connect",
      "For every vulnerability without review",
      "When a reviewed issue is intentionally accepted according to the team's process and supported workflow",
      "To avoid all future code analysis"
    ],
    answer: 2
  },
  {
    id: 91,
    question: "What is the purpose of code duplication detection in SonarQube?",
    options: [
      "To identify repeated code blocks that may be candidates for refactoring",
      "To detect duplicate Docker images only",
      "To delete Git branches",
      "To compare server CPU temperatures"
    ],
    answer: 0
  },
  {
    id: 92,
    question: "What is cyclomatic complexity generally used to indicate?",
    options: [
      "The number of Docker containers",
      "The amount of database storage",
      "The number of SonarQube users",
      "The number of independent paths through a code component, as estimated by control flow"
    ],
    answer: 3
  },
  {
    id: 93,
    question: "Why are maintainability metrics useful to a development team?",
    options: [
      "They guarantee zero production incidents",
      "They help identify code areas that may be difficult or costly to maintain",
      "They replace application performance monitoring",
      "They determine the cloud provider automatically"
    ],
    answer: 1
  },
  {
    id: 94,
    question: "What should a team do when the Quality Gate fails due to new-code issues?",
    options: [
      "Disable SonarQube permanently",
      "Delete the branch without reviewing the findings",
      "Review the reported issues, fix or appropriately disposition them, and rerun analysis",
      "Deploy directly without considering the team's release policy"
    ],
    answer: 2
  },
  {
    id: 95,
    question: "How should a team handle false positives consistently?",
    options: [
      "Review evidence, follow team policy, document the rationale, and use supported issue-management workflows",
      "Mark every security issue as false positive",
      "Disable every security rule globally",
      "Ignore all scan results"
    ],
    answer: 0
  },
  {
    id: 96,
    question: "What is an effective way to manage SonarQube across many projects?",
    options: [
      "Give every developer system administrator access",
      "Use one shared token in public repositories",
      "Disable Quality Gates across the organization",
      "Standardize Quality Profiles, Quality Gates, permissions, and CI integration where appropriate"
    ],
    answer: 3
  },
  {
    id: 97,
    question: "Why should SonarQube analysis be run consistently in CI?",
    options: [
      "It guarantees that developers never introduce bugs",
      "It gives teams repeatable feedback and helps enforce quality requirements on changes",
      "It removes the need for unit tests",
      "It replaces production monitoring"
    ],
    answer: 1
  },
  {
    id: 98,
    question: "What is a major limitation of relying only on SonarQube?",
    options: [
      "It cannot report code issues",
      "It cannot be integrated with CI",
      "Static analysis cannot replace all runtime testing, threat modeling, and operational monitoring",
      "It cannot analyze any programming language"
    ],
    answer: 2
  },
  {
    id: 99,
    question: "A production release passed SonarQube but later had a runtime outage. What is the correct conclusion?",
    options: [
      "SonarQube is one quality control, not a guarantee against every runtime failure",
      "All SonarQube findings should be deleted",
      "Static analysis should replace monitoring",
      "The source repository must be removed"
    ],
    answer: 0
  },
  {
    id: 100,
    question: "In a production DevOps pipeline, what is a strong SonarQube implementation strategy?",
    options: [
      "Run scans occasionally and ignore their results",
      "Store analysis tokens in source code",
      "Use SonarQube only after a production outage",
      "Integrate scans into CI, protect credentials, enforce appropriate Quality Gates, and review findings"
    ],
    answer: 3
  }
];
