export interface JenkinsQuestion {
  question: string;
  options: string[];
  answer: number;
}

export const jenkinsQuestions: JenkinsQuestion[] = [
  {
    question: "1. A Jenkins pipeline fails at the deployment stage after the build and tests succeed. What should you check first?",
    options: [
      "Reinstall Jenkins immediately",
      "Check deployment-stage logs, credentials, target connectivity, and permissions",
      "Delete the source repository",
      "Disable all pipeline stages"
    ],
    answer: 1
  },
  {
    question: "2. Why is a Jenkinsfile preferred over configuring an entire pipeline only through the UI?",
    options: [
      "It automatically fixes every build failure",
      "It eliminates the need for source control",
      "It stores the pipeline definition as code, enabling versioning and review",
      "It guarantees that every build succeeds"
    ],
    answer: 2
  },
  {
    question: "3. In a Declarative Pipeline, which section defines the stages of the pipeline?",
    options: [
      "stages",
      "steps",
      "environment",
      "post"
    ],
    answer: 0
  },
  {
    question: "4. What is the purpose of the `agent` directive in a Jenkins Declarative Pipeline?",
    options: [
      "To configure Git branch protection",
      "To define email recipients",
      "To configure only the build's timeout",
      "To specify where the pipeline or stage executes"
    ],
    answer: 3
  },
  {
    question: "5. A pipeline must run on any available Jenkins agent. Which directive is appropriate?",
    options: [
      "agent { label 'none' }",
      "agent any",
      "agent { dockerfile true }",
      "agent { disabled true }"
    ],
    answer: 1
  },
  {
    question: "6. What does `agent none` mean in a Declarative Pipeline?",
    options: [
      "The pipeline cannot contain stages",
      "Jenkins automatically runs everything on the controller",
      "No global agent is allocated; stages can declare their own agents",
      "All Jenkins agents are permanently disabled"
    ],
    answer: 2
  },
  {
    question: "7. How can you prevent a pipeline from running indefinitely?",
    options: [
      "Use the `timeout` option",
      "Use `echo` repeatedly",
      "Remove all stage names",
      "Disable the build queue"
    ],
    answer: 0
  },
  {
    question: "8. What is the purpose of the `post` section in Declarative Pipeline?",
    options: [
      "To install Jenkins plugins",
      "To configure Git credentials only",
      "To define agent labels",
      "To run actions based on the pipeline or stage completion status"
    ],
    answer: 3
  },
  {
    question: "9. Which `post` condition runs when a pipeline finishes successfully?",
    options: [
      "failure",
      "success",
      "aborted",
      "unstable"
    ],
    answer: 1
  },
  {
    question: "10. Which `post` condition is suitable for cleanup that should run regardless of the final result?",
    options: [
      "success",
      "failure",
      "always",
      "changed"
    ],
    answer: 2
  },
  {
    question: "11. A pipeline should deploy only from the main branch. What is a suitable approach?",
    options: [
      "Use a `when` condition to check the branch before deployment",
      "Rename every build to main",
      "Disable source control",
      "Add a sleep command before deployment"
    ],
    answer: 0
  },
  {
    question: "12. What is the purpose of `when { expression { ... } }`?",
    options: [
      "To create a Jenkins agent",
      "To install a plugin dynamically",
      "To archive every file automatically",
      "To conditionally execute a stage based on a Groovy expression"
    ],
    answer: 3
  },
  {
    question: "13. Which step is commonly used to execute a shell command on a Unix-like Jenkins agent?",
    options: [
      "powershell",
      "sh",
      "bat",
      "checkout"
    ],
    answer: 1
  },
  {
    question: "14. Which pipeline step executes a Windows batch command?",
    options: [
      "sh",
      "shell",
      "bat",
      "cmdline"
    ],
    answer: 2
  },
  {
    question: "15. What does the `checkout scm` step commonly do in a multibranch pipeline?",
    options: [
      "Checks out the source revision associated with the pipeline's SCM configuration",
      "Creates a Docker image automatically",
      "Deploys to Kubernetes",
      "Deletes the workspace"
    ],
    answer: 0
  },
  {
    question: "16. A Jenkins build uses an outdated source revision. What should you investigate?",
    options: [
      "The Jenkins UI theme",
      "The number of archived artifacts",
      "The email notification format",
      "SCM polling or webhook delivery, branch selection, and checkout configuration"
    ],
    answer: 3
  },
  {
    question: "17. What is a Multibranch Pipeline designed to do?",
    options: [
      "Run only one hardcoded branch forever",
      "Discover branches containing a Jenkinsfile and create corresponding jobs",
      "Replace Git repositories",
      "Automatically merge every branch into production"
    ],
    answer: 1
  },
  {
    question: "18. What is the main benefit of a Jenkins Shared Library?",
    options: [
      "It removes the need for testing",
      "It stores build artifacts permanently",
      "It enables reusable pipeline code across multiple jobs",
      "It replaces the Jenkins controller"
    ],
    answer: 2
  },
  {
    question: "19. In a Jenkins Shared Library, what is commonly stored under `vars/`?",
    options: [
      "Globally accessible pipeline steps and variables",
      "Jenkins controller binaries",
      "Docker daemon configuration only",
      "Build logs only"
    ],
    answer: 0
  },
  {
    question: "20. What is commonly stored under `src/` in a Jenkins Shared Library?",
    options: [
      "Build artifacts",
      "Jenkins user passwords",
      "Archived test reports",
      "Reusable Groovy classes organized by package"
    ],
    answer: 3
  },
  {
    question: "21. A Shared Library change breaks many pipelines. What is a good prevention strategy?",
    options: [
      "Allow every pipeline to use an unreviewed branch",
      "Version the library, test changes, and control which versions pipelines use",
      "Delete all pipeline definitions",
      "Store library code only in build logs"
    ],
    answer: 1
  },
  {
    question: "22. What is the purpose of the Jenkins `stash` step?",
    options: [
      "To publish an artifact to a public repository",
      "To encrypt the Jenkins controller",
      "To save selected workspace files for later use within the same pipeline run",
      "To permanently back up every Jenkins job"
    ],
    answer: 2
  },
  {
    question: "23. What is the purpose of the `unstash` step?",
    options: [
      "To retrieve files previously saved with `stash`",
      "To delete the Jenkins workspace",
      "To restart an agent",
      "To retrieve Git credentials"
    ],
    answer: 0
  },
  {
    question: "24. When is `archiveArtifacts` useful?",
    options: [
      "When configuring a Kubernetes Service",
      "When creating Jenkins users",
      "When assigning agent labels",
      "When retaining build output files as artifacts associated with a build"
    ],
    answer: 3
  },
  {
    question: "25. What is the difference between `stash` and `archiveArtifacts`?",
    options: [
      "They are always identical",
      "Stash transfers selected files within a pipeline run; archived artifacts are retained as build outputs according to Jenkins configuration",
      "ArchiveArtifacts transfers files only between stages",
      "Stash publishes packages to every external registry"
    ],
    answer: 1
  },
  {
    question: "26. A later stage needs a file generated by an earlier stage running on another agent. What is a suitable solution?",
    options: [
      "Assume both agents share the same workspace",
      "Restart the Jenkins controller",
      "Use `stash` and `unstash`, or transfer the file through an artifact repository",
      "Disable agent isolation"
    ],
    answer: 2
  },
  {
    question: "27. What is the purpose of `parallel` in a Jenkins Pipeline?",
    options: [
      "To execute independent branches of work concurrently",
      "To run all commands on the controller only",
      "To disable stage-level logging",
      "To skip source checkout"
    ],
    answer: 0
  },
  {
    question: "28. When should pipeline stages be parallelized?",
    options: [
      "Always, regardless of dependencies",
      "Only when the stages have identical names",
      "Only when there is one Jenkins executor",
      "When tasks can safely run concurrently and sufficient resources are available"
    ],
    answer: 3
  },
  {
    question: "29. What does `failFast true` do in a Declarative parallel stage context where supported?",
    options: [
      "Makes all stages succeed",
      "Requests cancellation of other parallel branches when one branch fails",
      "Retries every stage indefinitely",
      "Disables parallel execution"
    ],
    answer: 1
  },
  {
    question: "30. A pipeline is slow because several independent test suites run sequentially. What is a possible improvement?",
    options: [
      "Increase the timeout without investigation",
      "Remove all tests",
      "Run independent test suites in parallel, subject to resource limits",
      "Run all tests on the controller"
    ],
    answer: 2
  },
  {
    question: "31. What is the purpose of Jenkins credentials?",
    options: [
      "To store and manage sensitive authentication information for jobs",
      "To replace source control",
      "To define Kubernetes replicas",
      "To create application dashboards"
    ],
    answer: 0
  },
  {
    question: "32. What is the recommended way to use a stored secret in a pipeline?",
    options: [
      "Hardcode the password in the Jenkinsfile",
      "Print the secret before using it",
      "Commit the secret to Git",
      "Use an appropriate credentials binding or credentials-aware pipeline step"
    ],
    answer: 3
  },
  {
    question: "33. Why is storing secrets directly in a Jenkinsfile unsafe?",
    options: [
      "Jenkins cannot parse string values",
      "The secret can be exposed through source control, logs, or job access",
      "Secrets cannot be used in pipelines",
      "It automatically disables agent execution"
    ],
    answer: 1
  },
  {
    question: "34. Does Jenkins masking guarantee that a secret can never appear in logs?",
    options: [
      "Yes, in every possible situation",
      "Yes, even if a program transforms the secret",
      "No; masking is a safeguard, and secrets can still leak through scripts or transformed output",
      "No, because Jenkins has no credential features"
    ],
    answer: 2
  },
  {
    question: "35. What is a credential ID in Jenkins?",
    options: [
      "A reference used by pipeline code to identify a stored credential",
      "The actual password shown in the UI",
      "The ID of a Kubernetes Pod",
      "A Git commit hash"
    ],
    answer: 0
  },
  {
    question: "36. What is the principle of least privilege in Jenkins?",
    options: [
      "Give every developer administrator access",
      "Share one administrator account with all agents",
      "Disable authorization",
      "Grant users and jobs only the permissions they need"
    ],
    answer: 3
  },
  {
    question: "37. Why should untrusted pull requests be handled carefully in Jenkins?",
    options: [
      "They always contain valid code",
      "They may execute malicious pipeline code and attempt to access secrets or infrastructure",
      "They cannot be checked out",
      "They automatically disable branch protection"
    ],
    answer: 1
  },
  {
    question: "38. What is a safer strategy for builds from untrusted pull requests?",
    options: [
      "Expose all production credentials to every pull request",
      "Run them as Jenkins administrators",
      "Isolate execution and avoid exposing privileged credentials or sensitive agents",
      "Automatically deploy every pull request to production"
    ],
    answer: 2
  },
  {
    question: "39. What is the purpose of Jenkins authorization configuration?",
    options: [
      "To control which users can perform specific actions",
      "To select Docker image layers",
      "To set the application port",
      "To compile Java source code"
    ],
    answer: 0
  },
  {
    question: "40. What should you do if a Jenkins credential is accidentally exposed in a build log?",
    options: [
      "Ignore it if the build succeeded",
      "Only delete the console output and take no other action",
      "Move the credential to a Jenkinsfile",
      "Revoke or rotate the credential, restrict exposure, and investigate affected systems"
    ],
    answer: 3
  },
  {
    question: "41. What is the role of a Jenkins agent?",
    options: [
      "To replace the source repository",
      "To execute builds and pipeline steps assigned to it",
      "To serve as the only place where Jenkins users log in",
      "To replace the artifact repository"
    ],
    answer: 1
  },
  {
    question: "42. Why use separate agents for different workloads?",
    options: [
      "To ensure every job uses the same operating system",
      "To remove the need for build tools",
      "To isolate workloads and provide suitable tools, resources, and permissions",
      "To force all builds to run on the controller"
    ],
    answer: 2
  },
  {
    question: "43. What is the purpose of a Jenkins node label?",
    options: [
      "To select agents with suitable capabilities for a job or stage",
      "To store user passwords",
      "To name a Git commit",
      "To define the application's URL path"
    ],
    answer: 0
  },
  {
    question: "44. A stage remains queued because no agent is available. What should you inspect?",
    options: [
      "Only the chart version",
      "Only the email subject",
      "The README file's formatting",
      "Agent online status, labels, executors, resource availability, and queue restrictions"
    ],
    answer: 3
  },
  {
    question: "45. What is an executor in Jenkins?",
    options: [
      "A Git branch",
      "A slot that allows a node to run a build task",
      "A Docker registry credential",
      "A Kubernetes namespace"
    ],
    answer: 1
  },
  {
    question: "46. Why should the Jenkins controller generally not execute untrusted builds?",
    options: [
      "The controller cannot display logs",
      "The controller cannot access plugins",
      "Build workloads can consume resources or compromise the controller's security boundary",
      "Jenkins requires all jobs to run on Windows"
    ],
    answer: 2
  },
  {
    question: "47. A Jenkins agent repeatedly disconnects during long builds. What should you check?",
    options: [
      "Agent logs, network stability, memory pressure, process termination, and connection configuration",
      "Only the Jenkins logo",
      "Only the Git commit message",
      "Only the artifact filename"
    ],
    answer: 0
  },
  {
    question: "48. What is a key benefit of ephemeral Jenkins agents?",
    options: [
      "They keep every build workspace forever",
      "They eliminate the need for authentication",
      "They prevent every possible pipeline failure",
      "They provide clean, short-lived build environments that can reduce cross-build contamination"
    ],
    answer: 3
  },
  {
    question: "49. A Docker build stage must run on an agent with Docker available. What should you configure?",
    options: [
      "Only a Jenkins job description",
      "An appropriate agent label or Docker-capable agent configuration",
      "A new Git branch for every shell command",
      "An email notification"
    ],
    answer: 1
  },
  {
    question: "50. Why can excessive Jenkins executors on a small agent reduce performance?",
    options: [
      "Jenkins disables all logs",
      "The agent loses its hostname",
      "Concurrent builds may compete for CPU, memory, disk, and network resources",
      "The Git repository becomes read-only"
    ],
    answer: 2
  },
  {
    question: "51. How can a Git provider notify Jenkins about new commits without relying only on periodic polling?",
    options: [
      "Configure a webhook to the appropriate Jenkins endpoint",
      "Restart Jenkins after every commit",
      "Delete and recreate the job",
      "Manually copy every commit to the workspace"
    ],
    answer: 0
  },
  {
    question: "52. A webhook is delivered, but Jenkins does not start a build. What should you check?",
    options: [
      "Only the application CSS",
      "Only the number of archived files",
      "Only the agent's screen resolution",
      "Webhook delivery response, endpoint, authentication, job triggers, branch filters, and Jenkins logs"
    ],
    answer: 3
  },
  {
    question: "53. What is a benefit of webhook-triggered CI compared with frequent SCM polling?",
    options: [
      "Webhooks guarantee every deployment is correct",
      "Webhooks can trigger builds promptly when source events occur",
      "Webhooks remove the need for Git credentials",
      "Webhooks eliminate all network failures"
    ],
    answer: 1
  },
  {
    question: "54. Why might a multibranch pipeline fail to discover a new branch?",
    options: [
      "Jenkins cannot support branch discovery",
      "Every branch must have a different Jenkins controller",
      "Branch indexing, SCM permissions, repository configuration, or Jenkinsfile availability may be incorrect",
      "A branch cannot contain a Jenkinsfile"
    ],
    answer: 2
  },
  {
    question: "55. What is a suitable approach to prevent duplicate builds triggered by overlapping mechanisms?",
    options: [
      "Review webhook and polling configuration and apply appropriate job or concurrency controls",
      "Create more webhooks without reviewing existing ones",
      "Disable source control",
      "Run a new Jenkins controller for every commit"
    ],
    answer: 0
  },
  {
    question: "56. What is the purpose of the `disableConcurrentBuilds()` Declarative Pipeline option?",
    options: [
      "To disable every agent",
      "To prevent all future builds",
      "To disable pipeline logging",
      "To prevent concurrent executions of the same pipeline job"
    ],
    answer: 3
  },
  {
    question: "57. When might `disableConcurrentBuilds(abortPrevious: true)` be useful?",
    options: [
      "When all builds must run to completion regardless of newer changes",
      "When a newer run should abort a previous running build of the same job",
      "When Jenkins should permanently disable the job",
      "When no pipeline stages are required"
    ],
    answer: 1
  },
  {
    question: "58. What is a risk of blindly retrying every failed pipeline stage?",
    options: [
      "Retries always remove all artifacts",
      "Retries always make deployments atomic",
      "Non-idempotent actions may run multiple times and create duplicate or inconsistent changes",
      "Retries automatically fix incorrect source code"
    ],
    answer: 2
  },
  {
    question: "59. When is a pipeline retry particularly appropriate?",
    options: [
      "For transient failures when repeating the operation is safe",
      "For every syntax error",
      "For every failed authorization check without investigation",
      "For destructive operations with unknown side effects"
    ],
    answer: 0
  },
  {
    question: "60. What is an idempotent deployment operation?",
    options: [
      "An operation that always fails the second time",
      "An operation that must create a duplicate resource each time",
      "An operation that requires a manual restart every time",
      "An operation that can be repeated without causing additional unintended changes"
    ],
    answer: 3
  },
  {
    question: "61. How can Jenkins build and publish a Docker image securely?",
    options: [
      "Hardcode registry credentials in the Dockerfile",
      "Use protected credentials, build the image, and authenticate to the registry without exposing secrets",
      "Print the registry password before login",
      "Disable image access controls"
    ],
    answer: 1
  },
  {
    question: "62. Why should production Docker images generally use immutable version identifiers rather than only `latest`?",
    options: [
      "The `latest` tag always points to a secure image",
      "Immutable identifiers eliminate the need for vulnerability scanning",
      "Versioned tags or digests improve traceability and reproducibility",
      "Kubernetes does not support tagged images"
    ],
    answer: 2
  },
  {
    question: "63. A Docker image builds locally but fails in Jenkins. What should you investigate?",
    options: [
      "Agent Docker availability, build context, permissions, network access, and environment differences",
      "Only the Jenkins job icon",
      "Only the pipeline stage name",
      "Only the repository description"
    ],
    answer: 0
  },
  {
    question: "64. What is a good practice when publishing an image to a container registry?",
    options: [
      "Publish every build under the same mutable tag only",
      "Disable authentication",
      "Store registry passwords in the image",
      "Use controlled credentials and identifiable tags, and capture the resulting image digest when appropriate"
    ],
    answer: 3
  },
  {
    question: "65. Why is it useful to separate build and deploy stages?",
    options: [
      "It guarantees that deployment never fails",
      "It makes artifact creation, validation, promotion, and deployment controls clearer",
      "It removes the need for testing",
      "It prevents version control"
    ],
    answer: 1
  },
  {
    question: "66. How should a pipeline promote an artifact from staging to production?",
    options: [
      "Rebuild different source code manually in production",
      "Always deploy an untested image",
      "Promote the same verified, traceable artifact through controlled approval and deployment steps",
      "Delete the artifact after staging"
    ],
    answer: 2
  },
  {
    question: "67. What is the benefit of storing build artifacts in an artifact repository?",
    options: [
      "Centralized retention, versioning, access control, and reuse across pipeline stages",
      "Automatic elimination of every test failure",
      "Automatic creation of Kubernetes nodes",
      "Replacement of source control history"
    ],
    answer: 0
  },
  {
    question: "68. What is a deployment approval gate used for?",
    options: [
      "To increase Docker image size",
      "To disable all notifications",
      "To skip the test stage",
      "To require a specified approval before a protected deployment proceeds"
    ],
    answer: 3
  },
  {
    question: "69. What is a common purpose of the `input` step in a Jenkins Pipeline?",
    options: [
      "To retrieve CPU metrics from Kubernetes",
      "To pause execution and request human input or approval",
      "To create a Docker image automatically",
      "To create a Git repository"
    ],
    answer: 1
  },
  {
    question: "70. What should happen when a production deployment fails health checks?",
    options: [
      "Disable monitoring permanently",
      "Continue routing traffic regardless of health",
      "Stop or roll back according to the deployment strategy, then investigate the failure",
      "Delete the source repository"
    ],
    answer: 2
  },
  {
    question: "71. What is Jenkins Configuration as Code (JCasC) used for?",
    options: [
      "Defining Jenkins configuration declaratively in configuration files",
      "Writing application CSS",
      "Creating Docker images only",
      "Replacing every Jenkins plugin"
    ],
    answer: 0
  },
  {
    question: "72. What is a key benefit of Configuration as Code?",
    options: [
      "It removes the need to protect configuration files",
      "It guarantees every plugin is compatible",
      "It prevents all configuration errors automatically",
      "It supports repeatable configuration, review, and recovery"
    ],
    answer: 3
  },
  {
    question: "73. What is a Jenkins plugin compatibility concern during an upgrade?",
    options: [
      "Plugins never depend on Jenkins versions",
      "A plugin version may require a different Jenkins core version or dependency version",
      "Plugins cannot be updated",
      "Every plugin update deletes source repositories"
    ],
    answer: 1
  },
  {
    question: "74. What should you do before upgrading Jenkins in a production environment?",
    options: [
      "Upgrade without reviewing the release notes",
      "Delete all jobs and users",
      "Back up critical data, review compatibility, test the upgrade, and plan recovery",
      "Disable authentication"
    ],
    answer: 2
  },
  {
    question: "75. Which data is especially important to back up when planning Jenkins recovery?",
    options: [
      "The Jenkins home data, including job configuration, relevant credentials/configuration, and required build metadata",
      "Only the browser cache",
      "Only the Jenkins login page screenshot",
      "Only temporary shell history"
    ],
    answer: 0
  },
  {
    question: "76. What is the purpose of Jenkins build retention settings?",
    options: [
      "To keep every build forever regardless of disk capacity",
      "To remove source control branches automatically",
      "To change the application's replica count",
      "To limit retained build records and artifacts according to configured policies"
    ],
    answer: 3
  },
  {
    question: "77. Jenkins reports that disk space is running low. What is a sensible response?",
    options: [
      "Delete arbitrary Jenkins home files while Jenkins is running",
      "Inspect disk usage, workspaces, build history, and artifacts; apply safe retention and cleanup policies",
      "Disable all builds permanently",
      "Delete the credential store"
    ],
    answer: 1
  },
  {
    question: "78. What is the purpose of the Workspace Cleanup plugin or equivalent cleanup steps?",
    options: [
      "To delete all Jenkins job configurations",
      "To erase the source repository permanently",
      "To remove unnecessary workspace files and reduce disk usage or contamination",
      "To disable pipeline stages"
    ],
    answer: 2
  },
  {
    question: "79. Why should a Jenkins upgrade be tested against representative pipelines first?",
    options: [
      "To identify core, plugin, agent, and pipeline compatibility problems before production impact",
      "To guarantee all deployments become faster",
      "To remove all existing credentials",
      "To avoid documenting the upgrade"
    ],
    answer: 0
  },
  {
    question: "80. What is the purpose of a Jenkins health monitoring and alerting setup?",
    options: [
      "To automatically guarantee no failures occur",
      "To replace build logs entirely",
      "To eliminate the need for backups",
      "To detect service, queue, executor, disk, and agent problems early"
    ],
    answer: 3
  },
  {
    question: "81. A Jenkins pipeline fails because a required tool is missing on the agent. What is the best long-term solution?",
    options: [
      "Install it manually on a random agent every time",
      "Use a reproducible agent image or managed tool installation with explicit versioning",
      "Skip every stage that needs the tool",
      "Store the tool password in the Jenkinsfile"
    ],
    answer: 1
  },
  {
    question: "82. Why can a pipeline work on one agent but fail on another?",
    options: [
      "Jenkins pipelines never depend on their environment",
      "Agent names always determine application behavior",
      "Tool versions, OS, permissions, environment variables, and dependencies may differ",
      "Jenkins automatically changes Git history between agents"
    ],
    answer: 2
  },
  {
    question: "83. What is a good way to make build environments reproducible?",
    options: [
      "Use controlled agent images, pinned tools, and explicitly declared dependencies",
      "Install unpinned tools at random during every build",
      "Depend on undocumented settings from a developer laptop",
      "Use different compilers for each retry without recording versions"
    ],
    answer: 0
  },
  {
    question: "84. A pipeline fails only when multiple builds run concurrently. What should you investigate?",
    options: [
      "Only the Jenkins theme",
      "Only the repository's license",
      "Only the agent hostname",
      "Shared workspace files, port conflicts, resource contention, and non-isolated test dependencies"
    ],
    answer: 3
  },
  {
    question: "85. How can you avoid concurrent pipeline runs interfering with each other?",
    options: [
      "Make every build write to the same temporary files",
      "Isolate workspaces and resources, and use concurrency controls where necessary",
      "Share mutable deployment state without locking",
      "Disable all test reporting"
    ],
    answer: 1
  },
  {
    question: "86. What is the purpose of JUnit test reporting in Jenkins?",
    options: [
      "To create container images",
      "To provision cloud instances",
      "To publish test results so Jenkins can display trends and test outcomes",
      "To configure user permissions"
    ],
    answer: 2
  },
  {
    question: "87. A pipeline succeeds despite test failures. What should you review?",
    options: [
      "Whether the test command's exit status is handled correctly and whether the pipeline improperly ignores failures",
      "Only the archived artifact name",
      "Only the Jenkins UI theme",
      "Only the Git remote URL"
    ],
    answer: 0
  },
  {
    question: "88. What is a quality gate in a CI pipeline?",
    options: [
      "A mechanism that forces all jobs to deploy immediately",
      "A method for storing administrator passwords in code",
      "A replacement for source control",
      "A condition such as passing tests, coverage, or security checks that must be met before proceeding"
    ],
    answer: 3
  },
  {
    question: "89. Why should a pipeline fail when a mandatory security scan fails its policy?",
    options: [
      "Security tools must always be ignored",
      "It prevents known policy violations from progressing to later delivery stages",
      "It makes the source repository private automatically",
      "It guarantees the application has no vulnerabilities"
    ],
    answer: 1
  },
  {
    question: "90. What is a suitable way to handle flaky tests?",
    options: [
      "Delete every failing test immediately",
      "Mark all tests successful regardless of results",
      "Identify root causes, improve test isolation, and use limited retries only where justified",
      "Disable all quality gates permanently"
    ],
    answer: 2
  },
  {
    question: "91. What is the purpose of a Jenkins pipeline `environment` block?",
    options: [
      "To define environment variables for the pipeline or applicable scope",
      "To create a Kubernetes cluster",
      "To configure Git branch protection automatically",
      "To publish Docker images without credentials"
    ],
    answer: 0
  },
  {
    question: "92. Why should production deployment credentials be scoped carefully?",
    options: [
      "Every developer should access production by default",
      "Credential IDs must be public",
      "Credentials are not sensitive when stored in Jenkins",
      "Limiting access reduces the impact of compromised jobs or users"
    ],
    answer: 3
  },
  {
    question: "93. How can Jenkins deploy an application to Kubernetes?",
    options: [
      "Only by logging into every worker node manually",
      "Use an appropriately authorized Kubernetes deployment method, such as `kubectl`, Helm, or a suitable plugin",
      "By changing the Jenkins UI theme",
      "By archiving the Jenkinsfile only"
    ],
    answer: 1
  },
  {
    question: "94. A Jenkins-to-Kubernetes deployment fails with `Forbidden`. What should you inspect?",
    options: [
      "Only the container image size",
      "Only the Jenkins workspace folder name",
      "The Kubernetes identity, namespace, Role/ClusterRole, and RoleBinding permissions",
      "Only the pipeline display name"
    ],
    answer: 2
  },
  {
    question: "95. What is a key benefit of deploying to Kubernetes using Helm from Jenkins?",
    options: [
      "Repeatable, parameterized application releases with support for upgrade and rollback workflows",
      "Automatic elimination of all Kubernetes incidents",
      "Replacement of Kubernetes RBAC",
      "Automatic encryption of every Jenkins credential"
    ],
    answer: 0
  },
  {
    question: "96. What should you verify after Jenkins deploys an application to Kubernetes?",
    options: [
      "Only whether the Helm command printed output",
      "Only whether the Jenkins job turned blue",
      "Only whether the image exists in the registry",
      "Rollout status, Pod readiness, service availability, and application health"
    ],
    answer: 3
  },
  {
    question: "97. What is a major risk of allowing every Jenkins job to run arbitrary privileged Docker commands?",
    options: [
      "Docker images become smaller",
      "Jobs may gain excessive host or infrastructure access, depending on the execution setup",
      "Pipeline stages automatically become parallel",
      "Git commits cannot be fetched"
    ],
    answer: 1
  },
  {
    question: "98. Which practice helps secure a Jenkins deployment pipeline?",
    options: [
      "Run all jobs with administrator permissions",
      "Disable audit logs",
      "Use least privilege, protected credentials, trusted code, isolated agents, and controlled approvals",
      "Commit all deployment secrets to Git"
    ],
    answer: 2
  },
  {
    question: "99. A deployment job sometimes deploys an older artifact than the build that triggered it. What should you improve?",
    options: [
      "Pass an explicit, immutable artifact version or digest between pipeline stages",
      "Use a mutable `latest` tag without verification",
      "Choose an arbitrary file from the workspace",
      "Remove artifact metadata"
    ],
    answer: 0
  },
  {
    question: "100. Which approach best describes a reliable production Jenkins CI/CD pipeline?",
    options: [
      "Build and deploy directly to production without tests or approvals",
      "Store secrets in source control and ignore security scans",
      "Run every job on the controller with unlimited permissions",
      "Use versioned pipeline code, reproducible builds, automated tests, security gates, controlled deployment, monitoring, and recovery plans"
    ],
    answer: 3
  }
];
