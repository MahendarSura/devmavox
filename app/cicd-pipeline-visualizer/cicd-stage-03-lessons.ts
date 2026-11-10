import type { CicdTopicLesson } from "./cicd-topic-lessons";

export const stageThreeLessonOverrides: Record<string, CicdTopicLesson> = {
  "3|Jenkins Fundamentals": {
    overview: "Jenkins is an automation server used to build, test and deliver applications. It connects source-control events with repeatable pipeline jobs. A Jenkins pipeline can compile the payment application, execute tests, inspect code quality, build a container image and publish verified artifacts.",
    purpose: "Jenkins removes the need for developers to perform every release step manually. Teams use it to make builds repeatable, expose failures early and create an auditable delivery process. A successful Jenkins job is evidence that configured automation completed, not proof by itself that production is healthy.",
    architecture: "Developer commit → GitHub repository → webhook or scheduled trigger → Jenkins controller → build queue → Jenkins agent → pipeline execution → test reports and artifacts.",
    workflow: [
      "Install Jenkins on a supported server or use a managed Jenkins platform.",
      "Configure the source-control connection and required credentials.",
      "Create a Pipeline job that reads a Jenkinsfile from the repository.",
      "Select an agent with the required Java, Maven and Docker tools.",
      "Execute checkout, build, test and packaging stages.",
      "Review the console output, test reports and archived artifact."
    ],
    example: "A developer pushes a payment-service change to GitHub. Jenkins checks out that commit, runs mvn clean verify, archives the generated JAR and marks the build failed if a test fails.",
    commands: [
      "java -version",
      "jenkins --version",
      "systemctl status jenkins",
      "sudo systemctl start jenkins",
      "sudo journalctl -u jenkins -n 100 --no-pager",
      "curl -I http://localhost:8080/login"
    ],
    configuration: "Configure the Jenkins URL, controller security, agent labels, source-control credentials and pipeline definition. Keep Jenkins home on persistent storage. Use a Jenkinsfile in source control so pipeline changes are reviewed alongside application changes.",
    failures: [
      "Jenkins service is stopped or cannot bind to its configured port.",
      "A job cannot access the Git repository because credentials or permissions are incorrect.",
      "The selected agent does not have the required build tools.",
      "A pipeline fails because a build, test or publishing command returns a non-zero exit code."
    ],
    recovery: [
      "Check service status and Jenkins system logs before restarting anything.",
      "Inspect the failed job's console output and identify the first meaningful error.",
      "Verify repository access and credential permissions without printing secrets.",
      "Check agent availability, disk space and installed tool versions.",
      "Rerun the failed build after correcting the root cause and verify its artifacts."
    ],
    bestPractices: [
      "Keep pipeline definitions in version control.",
      "Use supported Jenkins and plugin versions.",
      "Separate controller responsibilities from build workloads.",
      "Use least-privilege credentials and restrict administrative access.",
      "Monitor controller health, agent capacity, disk usage and backup status."
    ],
    exercise: "Create a Jenkins Pipeline job for a Spring Boot payment service. Connect a Git repository, execute Maven tests, archive the JAR and deliberately introduce a failing test. Verify that Jenkins reports failure and that the console log identifies the failing test."
  },

  "3|Jenkins Architecture": {
    overview: "Jenkins architecture separates job coordination from the execution of build workloads. The controller stores job configuration, schedules work and coordinates agents. Agents execute pipeline steps in workspaces and return results. Understanding this separation helps teams scale builds without placing every workload on the controller.",
    purpose: "Architecture knowledge helps engineers identify whether a failure belongs to the controller, queue, agent, workspace, plugin or external dependency. It also supports capacity planning and secure separation of build environments.",
    architecture: "Jenkins controller → queue and executor allocation → connected agent → workspace and tools → build process → controller receives status and artifacts.",
    workflow: [
      "A user or webhook submits a pipeline run.",
      "The controller evaluates job configuration and places executable work in the queue.",
      "Jenkins selects an eligible executor using labels and availability.",
      "The agent creates or reuses a workspace and executes pipeline steps.",
      "The agent returns logs, status and configured artifacts.",
      "The controller records the build result and exposes it in the job interface."
    ],
    example: "The payment-service pipeline requests an agent labelled linux-java. The controller schedules it on a matching Linux worker, where Maven builds the application and returns the test reports.",
    commands: [
      "curl -s http://localhost:8080/api/json",
      "curl -s http://localhost:8080/computer/api/json",
      "systemctl status jenkins",
      "df -h",
      "free -h",
      "ps -ef | grep -i jenkins"
    ],
    configuration: "Configure controller executors conservatively, define agent labels and connection methods, and set workspace and remote-root locations. Protect the controller-to-agent communication path and keep agent operating systems and build tools maintained.",
    failures: [
      "Controller is unavailable, preventing job scheduling and UI access.",
      "Build queue grows because eligible agents have no free executors.",
      "An agent disconnects during a pipeline step.",
      "Workspace storage or network communication becomes unavailable."
    ],
    recovery: [
      "Check controller service health and available system resources.",
      "Inspect queue reasons and identify jobs waiting for an executor.",
      "Check agent connection status, logs and network reachability.",
      "Verify workspace permissions and disk capacity.",
      "Restore the affected component and run a small validation job."
    ],
    bestPractices: [
      "Avoid running untrusted application builds on the controller.",
      "Use dedicated agents with clear labels and workload boundaries.",
      "Monitor queue wait time and executor utilization.",
      "Use persistent, backed-up controller configuration.",
      "Document network ports and agent connection requirements."
    ],
    exercise: "Inspect the Jenkins controller and computer/agent pages. Identify the controller, available agents, labels and executors. Run the same harmless pipeline on two eligible agents and compare their workspaces and execution logs."
  },

  "3|Controller and Agents": {
    overview: "The Jenkins controller coordinates pipelines, while agents perform the actual build and test work. An executor represents a slot where a task can run. Labels allow a pipeline to request a suitable environment, such as Linux with Java or a worker permitted to build container images.",
    purpose: "Separating controller and agent workloads improves scalability, limits resource contention and makes it possible to run different operating systems and toolchains. It also helps isolate workloads that need special permissions.",
    architecture: "Jenkins controller → agent connection → agent executors → isolated workspace → Java and Maven tools → pipeline result returned to controller.",
    workflow: [
      "Prepare an agent host with a supported Java runtime and required tools.",
      "Register the agent with a unique name and remote workspace directory.",
      "Choose a supported connection method and protect its credentials.",
      "Assign descriptive labels such as linux-java or docker-builder.",
      "Select the label in the Jenkinsfile agent directive.",
      "Run a test job and verify that it executes on the intended worker."
    ],
    example: "The payment-service test stage runs on linux-java, while its container-image stage uses docker-builder. The controller coordinates both stages without performing the build workload itself.",
    commands: [
      "java -version",
      "mvn -version",
      "hostname",
      "whoami",
      "df -h",
      "docker version"
    ],
    configuration: "Give each agent a unique name, remote root, connection settings and labels. Configure executors according to CPU, memory and workload requirements. Avoid granting Docker socket or cloud administrator access to general-purpose agents.",
    failures: [
      "Agent is offline because its host or connection process is unavailable.",
      "Agent connects but has no matching label for the requested pipeline.",
      "Build fails because Java, Maven or Docker is missing.",
      "Multiple jobs corrupt shared workspace files or exhaust worker resources."
    ],
    recovery: [
      "Check agent host availability and Jenkins connection logs.",
      "Compare the pipeline label with the agent's configured labels.",
      "Verify the runtime and build tools under the agent service account.",
      "Check disk, memory, CPU and workspace ownership.",
      "Restart or reconnect only the affected agent after collecting evidence."
    ],
    bestPractices: [
      "Use separate agents for different trust levels and workloads.",
      "Keep agent images or configuration reproducible.",
      "Set executor counts based on real resource capacity.",
      "Use isolated workspaces for concurrent builds.",
      "Remove unused agents and rotate their credentials."
    ],
    exercise: "Create or identify a Linux Jenkins agent with a linux-java label. Run a pipeline that prints hostname, Java version and Maven version. Confirm from the console output that execution occurred on the agent rather than the controller."
  },

  "3|Installation and Setup": {
    overview: "Jenkins installation includes preparing a supported operating system and Java runtime, installing the Jenkins package, starting the service and completing initial setup. A working installation also needs persistent storage, network access, administrator access controls and a maintenance plan.",
    purpose: "A controlled installation provides a stable automation platform. Production setup must account for service startup, upgrades, backups, network exposure, plugin compatibility and recovery rather than only making the login page available.",
    architecture: "Linux host → Java runtime → Jenkins package and service → JENKINS_HOME → web interface → configured agents and source-control integrations.",
    workflow: [
      "Select a supported operating system and Jenkins release.",
      "Install and verify the required Java runtime.",
      "Install Jenkins from its trusted package repository.",
      "Start the service and verify its process and listening port.",
      "Complete the initial unlock and administrator setup.",
      "Configure security, backup storage and a first test pipeline."
    ],
    example: "A team installs Jenkins on a dedicated Linux VM. The administrator verifies Java, starts the service, completes setup and creates a test job that builds the payment-service repository.",
    commands: [
      "java -version",
      "sudo systemctl status jenkins",
      "sudo systemctl enable --now jenkins",
      "sudo journalctl -u jenkins -n 100 --no-pager",
      "sudo ss -lntp | grep 8080",
      "curl -I http://localhost:8080/login"
    ],
    configuration: "Use the official Jenkins installation instructions for the chosen operating system and release. Configure the service account, JENKINS_HOME storage, reverse proxy or approved access path, firewall rules, TLS and backup policy. Do not expose an unsecured controller directly to the public internet.",
    failures: [
      "Jenkins package installation fails because repository metadata or signatures are invalid.",
      "Service startup fails due to unsupported Java or insufficient memory.",
      "Port 8080 is already occupied by another process.",
      "The browser cannot reach Jenkins because of firewall, proxy or DNS settings."
    ],
    recovery: [
      "Read package-manager output and verify the trusted repository configuration.",
      "Check Java compatibility and the Jenkins service journal.",
      "Identify the process listening on the configured port before changing ports.",
      "Test local access first, then check firewall, proxy and DNS paths.",
      "Complete a test login and pipeline run after service recovery."
    ],
    bestPractices: [
      "Use supported releases and trusted installation sources.",
      "Persist and back up JENKINS_HOME.",
      "Enable TLS and restrict network access.",
      "Create named administrator accounts instead of sharing credentials.",
      "Test upgrades and restoration procedures before production changes."
    ],
    exercise: "Install Jenkins in a disposable Linux VM using the official instructions. Verify Java, service status, listening port, initial administrator setup and a basic pipeline. Record the service logs and backup location."
  },

  "3|Credentials Management": {
    overview: "Jenkins credentials store sensitive values such as usernames, passwords, SSH private keys, API tokens and secret text. A pipeline retrieves a credential by its ID and uses it only for the required operation. Credentials should not be committed to source code or printed in console logs.",
    purpose: "Secure credential handling allows Jenkins to access Git repositories, container registries and cloud services without embedding secrets in Jenkinsfiles. Scope and permissions determine which jobs and users can use each credential.",
    architecture: "Administrator creates credential → Jenkins credentials store → credential ID referenced by pipeline → credentials binding → temporary environment or tool authentication → secret masking and cleanup.",
    workflow: [
      "Identify the external system and the minimum permission required.",
      "Create a dedicated identity or token for the integration.",
      "Add the secret using the correct Jenkins credential type and scope.",
      "Reference its ID from a controlled pipeline step.",
      "Use the secret only for the required command or stage.",
      "Review logs and rotate or revoke credentials according to policy."
    ],
    example: "A payment-service pipeline uses a GitHub token to check out a private repository and an AWS role to publish an image. Each integration has a separate credential identity and limited permissions.",
    commands: [
      "git ls-remote https://github.com/example/payment-service.git",
      "aws sts get-caller-identity",
      "aws ecr get-login-password --region ap-south-1",
      "docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com"
    ],
    configuration: "Create credentials under the appropriate Jenkins store and scope. Use credentialsId with the credentials binding or supported pipeline step. Prefer short-lived cloud identity federation or instance roles over long-lived access keys. Never echo secret variables or place tokens in command-line arguments that may be exposed.",
    failures: [
      "Pipeline reports that the credential ID cannot be found.",
      "Credential exists but its scope does not allow the job to access it.",
      "External service rejects an expired token or insufficient permissions.",
      "A command accidentally exposes a secret in logs or process output."
    ],
    recovery: [
      "Verify the exact credential ID and its store and scope.",
      "Check the job folder and user permissions.",
      "Validate external identity permissions without displaying secret values.",
      "Rotate a suspected exposed credential and revoke the old value.",
      "Rerun a minimal authentication test and inspect masked logs."
    ],
    bestPractices: [
      "Use one credential identity per integration or purpose.",
      "Grant only required permissions and restrict credential scope.",
      "Rotate secrets and prefer short-lived credentials.",
      "Never store secrets in Git, console output or build artifacts.",
      "Audit who can create, update and use credentials."
    ],
    exercise: "Create a test secret-text credential in a non-production Jenkins instance. Bind it to a pipeline variable, print only a harmless confirmation that the variable exists, and verify that the actual secret never appears in console output."
  },

  "3|Plugin Management": {
    overview: "Jenkins plugins extend the controller with integrations and capabilities such as Git checkout, pipeline syntax, credentials binding, artifact publishing and test reporting. Plugins interact with Jenkins core and often depend on other plugins, so compatibility and update planning matter.",
    purpose: "Correct plugin management keeps required integrations available while reducing outages and security exposure. Uncontrolled installation or updates can introduce dependency conflicts, unsupported versions or controller startup failures.",
    architecture: "Jenkins core → plugin manager → plugin files and dependencies → job and pipeline extensions → external integrations and UI features.",
    workflow: [
      "Identify the pipeline feature that requires a plugin.",
      "Check the plugin's maintenance status, security advisories and core compatibility.",
      "Review required plugin dependencies and versions.",
      "Test installation or upgrade in a non-production Jenkins instance.",
      "Apply the approved plugin version during a controlled maintenance window.",
      "Run representative pipelines and monitor controller logs."
    ],
    example: "The payment pipeline needs Git and JUnit report publishing functionality. The administrator verifies plugin compatibility, installs approved versions and tests checkout and report publication before production rollout.",
    commands: [
      "jenkins-plugin-cli --help",
      "java -version",
      "sudo journalctl -u jenkins -n 150 --no-pager",
      "sudo systemctl status jenkins",
      "curl -I http://localhost:8080/pluginManager/"
    ],
    configuration: "Maintain a reviewed plugin inventory and pin versions where reproducibility is required. Use the plugin manager or approved plugin installation process. Back up JENKINS_HOME before upgrades and keep a tested rollback or restoration plan.",
    failures: [
      "Plugin cannot be installed because a dependency is missing.",
      "Plugin version is incompatible with the installed Jenkins core.",
      "Controller fails to start after a plugin upgrade.",
      "A pipeline step disappears or changes behavior after an update."
    ],
    recovery: [
      "Review installation output and identify the incompatible dependency.",
      "Inspect Jenkins startup logs for plugin loading exceptions.",
      "Restore the last known-good controller backup if the service cannot recover safely.",
      "Disable or revert only the confirmed problematic plugin using the documented recovery procedure.",
      "Test the affected pipeline before reopening normal build traffic."
    ],
    bestPractices: [
      "Install only plugins with a clear operational need.",
      "Review security advisories and maintenance activity.",
      "Test upgrades outside production first.",
      "Back up controller state before plugin changes.",
      "Keep a documented plugin inventory and ownership."
    ],
    exercise: "Inspect the installed plugin list in a test Jenkins instance. Choose one plugin used by a pipeline, review its dependencies and compatibility, then document a safe update and rollback plan without changing production."
  },

  "3|Webhook Integration": {
    overview: "A webhook is an HTTP request sent by a source-control platform when an event occurs, such as a push or pull request. Jenkins can receive the event and start the matching pipeline. Correct webhook configuration avoids unnecessary polling and reduces the delay between code changes and validation.",
    purpose: "Webhook integration provides event-driven CI. It allows a commit to trigger automated checkout, build and testing soon after it reaches the repository. Authentication, endpoint reachability and event filtering are essential for reliable operation.",
    architecture: "GitHub repository event → webhook delivery → network and TLS endpoint → Jenkins webhook handler → job selection → pipeline run for the relevant revision.",
    workflow: [
      "Confirm that Jenkins is reachable through an approved HTTPS endpoint.",
      "Configure the source-control integration and webhook receiver.",
      "Select only the required repository events.",
      "Configure authentication or signature validation where supported.",
      "Send a test event and inspect the delivery response.",
      "Verify that Jenkins starts the correct job for the correct commit."
    ],
    example: "A developer pushes a payment-service commit. GitHub sends a push event to Jenkins, which starts the multibranch pipeline and checks out the commit identified by the event.",
    commands: [
      "curl -I https://jenkins.example.com/github-webhook/",
      "curl -s https://api.github.com/repos/ORG/REPO/hooks",
      "git rev-parse HEAD",
      "git log -1 --oneline",
      "sudo journalctl -u jenkins -n 100 --no-pager"
    ],
    configuration: "Configure the webhook URL using the correct Jenkins integration endpoint and enable only required events. Use HTTPS, validate delivery authentication where available, and restrict inbound network access to trusted source-control infrastructure when practical.",
    failures: [
      "Webhook delivery returns 404 because the endpoint path is wrong.",
      "Delivery returns 403 because access or request validation fails.",
      "Jenkins is unreachable due to DNS, TLS, firewall or reverse-proxy configuration.",
      "The event arrives but does not match the configured job or branch."
    ],
    recovery: [
      "Inspect the source-control webhook delivery response and request details.",
      "Verify the Jenkins endpoint path, TLS certificate and reverse-proxy routing.",
      "Check Jenkins logs and the relevant webhook integration configuration.",
      "Confirm that the repository, branch and event type match the job configuration.",
      "Send a new test event and compare its commit SHA with the pipeline checkout."
    ],
    bestPractices: [
      "Use HTTPS and authenticated event delivery.",
      "Subscribe only to events needed by the pipeline.",
      "Monitor failed webhook deliveries.",
      "Prevent duplicate builds through appropriate job and event configuration.",
      "Verify the checked-out revision rather than trusting the trigger alone."
    ],
    exercise: "Configure a test repository webhook for push events. Push a harmless commit, inspect the delivery response and verify that Jenkins starts a build for the same commit SHA."
  },

  "3|Jenkinsfile Fundamentals": {
    overview: "A Jenkinsfile is a text file that defines a pipeline as code. It is normally stored in the application's source repository and reviewed like other code changes. It describes the execution environment, stages, steps and post-build behavior needed to deliver the application.",
    purpose: "Pipeline as code makes CI/CD behavior version-controlled, reviewable and reproducible. Teams can track who changed a pipeline, test changes through pull requests and recover earlier definitions from Git history.",
    architecture: "Git repository → Jenkins job configuration → Jenkinsfile discovery → pipeline model and execution → stage results → reports and artifacts.",
    workflow: [
      "Create a Jenkinsfile in the repository root or configure its known path.",
      "Choose Declarative or Scripted Pipeline syntax.",
      "Define an agent and the required pipeline stages.",
      "Add checkout, build and test steps using repository commands.",
      "Configure post actions for reports and cleanup.",
      "Commit the file and run it through a Jenkins Pipeline job."
    ],
    example: "The payment-service repository contains a Jenkinsfile that checks out source, runs Maven verification and archives target/payment-service.jar only when the build succeeds.",
    commands: [
      "git add Jenkinsfile",
      "git commit -m \"Add Jenkins pipeline\"",
      "git push origin feature/jenkins-pipeline",
      "mvn clean verify",
      "git show HEAD:Jenkinsfile"
    ],
    configuration: "Keep the Jenkinsfile in source control and configure the job to load the intended repository and script path. Use credentials binding for secrets, environment blocks for non-secret settings and explicit timeouts for operations that could hang.",
    failures: [
      "Jenkins cannot find the configured Jenkinsfile path.",
      "Pipeline syntax is invalid or uses an unavailable step.",
      "The Jenkinsfile references an incorrect tool or credential ID.",
      "A pipeline works on one branch but not on another due to file differences."
    ],
    recovery: [
      "Verify the branch, repository URL and script path selected by the job.",
      "Use the pipeline syntax validator and inspect the first parser error.",
      "Check whether required plugins and configured tools are available.",
      "Compare the Jenkinsfile at the failing commit with the last working revision.",
      "Run the relevant commands locally or on a test agent before retrying."
    ],
    bestPractices: [
      "Review Jenkinsfile changes through pull requests.",
      "Keep secrets out of the file.",
      "Use clear stage names and small reusable steps.",
      "Set timeouts and meaningful post-build behavior.",
      "Test pipeline changes before production rollout."
    ],
    exercise: "Add a Jenkinsfile to a sample Spring Boot repository. Define checkout, Maven test and package stages, then run it from Jenkins and verify the stage results and archived JAR."
  },

  "3|Declarative Pipeline": {
    overview: "Declarative Pipeline is a structured Jenkins pipeline syntax built around a pipeline block, agent, stages and steps. It provides predictable sections for environment variables, tools, options, parameters, conditions and post actions. Its structure makes common CI workflows easier to read and validate.",
    purpose: "Declarative syntax helps teams standardize pipelines and enforce common controls such as timeouts, build retention, credentials usage and post-build reporting. It is usually the preferred starting point for application delivery pipelines.",
    architecture: "pipeline block → agent allocation → options and environment → stages → stage conditions and steps → post actions.",
    workflow: [
      "Create a pipeline block in the Jenkinsfile.",
      "Select an agent or define agent none with stage-specific agents.",
      "Declare tools and non-secret environment values.",
      "Create named stages with executable steps.",
      "Add conditions, timeouts and post-build actions where required.",
      "Validate the pipeline and execute it on a test agent."
    ],
    example: "The payment-service Declarative Pipeline defines Build, Unit Tests and Package stages. A post action archives test reports and sends a failure notification when the pipeline does not succeed.",
    commands: [
      "mvn clean compile",
      "mvn test",
      "mvn package",
      "git diff --check",
      "git diff -- Jenkinsfile"
    ],
    configuration: "Use valid Declarative sections such as agent, options, environment, tools, parameters, stages and post. Keep each stage's steps focused. Use when conditions for controlled stage execution and credentials binding for sensitive values.",
    failures: [
      "A required Declarative section is placed outside its allowed location.",
      "An unsupported option or step causes validation failure.",
      "A stage is skipped because its when condition is incorrect.",
      "Post actions fail while publishing reports or cleaning the workspace."
    ],
    recovery: [
      "Read the pipeline parser message and locate the invalid section.",
      "Validate braces, block nesting and supported directive names.",
      "Check the condition inputs and inspect why a stage was skipped.",
      "Verify report paths and permissions used by post actions.",
      "Run a small test pipeline after correcting the syntax."
    ],
    bestPractices: [
      "Prefer Declarative syntax for standard application pipelines.",
      "Use meaningful stage names and explicit agent selection.",
      "Keep conditions readable and test them.",
      "Set timeouts and build retention policies.",
      "Publish reports in post actions so failed tests remain visible."
    ],
    exercise: "Write a Declarative Jenkinsfile with Checkout, Build, Test and Package stages. Add a timeout and a post action for JUnit reports. Introduce a harmless test failure and verify the post action still publishes available reports."
  },

  "3|Scripted Pipeline": {
    overview: "Scripted Pipeline uses Groovy-based pipeline code and provides more direct control over execution logic. It is built around node, stage and step blocks, with Groovy conditions, loops and exception handling available for complex workflows. Greater flexibility also requires careful testing and code review.",
    purpose: "Scripted Pipeline is useful when a delivery workflow needs dynamic stage generation, complex branching or custom orchestration that is difficult to express clearly in Declarative syntax. It should not be used merely to make a simple pipeline more complicated.",
    architecture: "Groovy pipeline script → node allocation → workspace → stage blocks → conditional and iterative logic → external commands and result handling.",
    workflow: [
      "Create a Scripted Pipeline definition using node allocation.",
      "Define named stages for checkout, build and testing.",
      "Use supported Groovy conditions for required decisions.",
      "Execute shell steps and inspect their return status.",
      "Handle exceptions without hiding the original failure.",
      "Review the execution flow and test all important branches."
    ],
    example: "The payment pipeline uses a controlled condition to run a deployment validation stage only when the branch is a release branch. Build and test stages still execute for feature branches.",
    commands: [
      "mvn clean verify",
      "git branch --show-current",
      "git rev-parse --short HEAD",
      "git diff --check",
      "git show HEAD:Jenkinsfile"
    ],
    configuration: "Use node and stage blocks with supported Pipeline steps. Keep Groovy logic small and move reusable business logic into tested shared-library functions when appropriate. Avoid unsafe dynamic evaluation and do not disable script security to bypass a design problem.",
    failures: [
      "Groovy syntax or block nesting errors prevent execution.",
      "A condition evaluates incorrectly and skips required work.",
      "An exception is caught but the pipeline incorrectly reports success.",
      "Complex loops create excessive builds or consume agent capacity."
    ],
    recovery: [
      "Inspect the console stack trace and identify the failing Groovy statement.",
      "Check variable types, null values and condition inputs.",
      "Ensure caught exceptions set an appropriate build result or are rethrown.",
      "Limit loop size and verify agent allocation behavior.",
      "Test each branch using a controlled non-production pipeline."
    ],
    bestPractices: [
      "Use Scripted Pipeline only when its flexibility is needed.",
      "Keep orchestration logic readable and modular.",
      "Preserve failures instead of swallowing exceptions.",
      "Review script approvals and sandbox security.",
      "Test conditional branches and error paths."
    ],
    exercise: "Create a small Scripted Pipeline with checkout, build and test stages. Add a branch condition for a release-only validation step and verify behavior on both a feature branch and a release branch."
  },

  "3|Pipeline Stages and Steps": {
    overview: "A pipeline stage represents a major delivery activity, while steps perform the commands or operations inside that stage. Clear stages make a build understandable and help engineers identify whether checkout, compilation, testing, scanning or publishing failed.",
    purpose: "Well-designed stages provide visibility, controlled sequencing and clear ownership. They also make it easier to add approvals, timeouts and conditions at meaningful points in the delivery lifecycle.",
    architecture: "Pipeline → stage boundaries → agent and workspace → steps such as sh, checkout, junit and archiveArtifacts → stage status and build result.",
    workflow: [
      "Break the delivery process into meaningful activities.",
      "Create a named stage for each activity.",
      "Add the smallest set of related steps inside each stage.",
      "Set the correct agent and environment requirements.",
      "Configure report publication and failure handling.",
      "Review stage duration and failure history to improve the pipeline."
    ],
    example: "The payment-service pipeline has Checkout, Compile, Unit Tests, SonarQube Analysis and Package stages. The team can immediately identify whether a failed build stopped during compilation or testing.",
    commands: [
      "mvn clean compile",
      "mvn test",
      "mvn verify",
      "git status --short",
      "git rev-parse HEAD"
    ],
    configuration: "Use stable stage names and keep steps related to the stage purpose. Configure stage-level agents where different tools are required. Use timeout and retry only for operations where retrying is safe and meaningful.",
    failures: [
      "A stage contains unrelated work and makes failures difficult to isolate.",
      "A required step is missing or executes in the wrong order.",
      "A command returns a failure but the pipeline continues unexpectedly.",
      "Stage-level agent configuration causes unexpected workspace behavior."
    ],
    recovery: [
      "Identify the first failed stage and its first failed step.",
      "Inspect the exact command, working directory and environment.",
      "Verify that required preceding stages completed successfully.",
      "Check agent selection and workspace availability.",
      "Rerun the smallest failed operation before restarting the full pipeline."
    ],
    bestPractices: [
      "Use stages that represent recognizable delivery activities.",
      "Keep steps focused and avoid unnecessary shell complexity.",
      "Publish test and security reports at the appropriate stage.",
      "Use clear failure messages and controlled retry policies.",
      "Track stage duration to identify pipeline bottlenecks."
    ],
    exercise: "Create a pipeline with Checkout, Compile, Unit Test and Package stages. Make the test stage fail intentionally and identify the exact stage and step shown as failed in Jenkins."
  },

  "3|Parallel Execution": {
    overview: "Parallel execution allows independent pipeline branches to run at the same time. It can reduce total delivery time when different tests or checks do not depend on one another. Parallel branches require sufficient agent capacity and must avoid unsafe shared-file operations.",
    purpose: "Teams use parallel execution to run independent unit tests, security checks or compatibility tests faster. It is not suitable for operations that must happen in sequence or that modify the same shared resource.",
    architecture: "Pipeline stage → parallel branch allocation → separate eligible executors → independent commands → branch results collected → pipeline continues or fails.",
    workflow: [
      "Identify checks that do not depend on each other's output.",
      "Confirm that enough agent executors and resources are available.",
      "Separate each independent activity into a parallel branch.",
      "Give branches isolated workspaces or safe shared inputs.",
      "Collect results and fail the pipeline when a required branch fails.",
      "Compare total duration and resource use with sequential execution."
    ],
    example: "After compiling the payment service, Jenkins runs unit tests and dependency security scanning in parallel. Packaging proceeds only after both required checks succeed.",
    commands: [
      "mvn test",
      "mvn dependency:tree",
      "trivy fs --scanners vuln .",
      "git rev-parse HEAD",
      "df -h"
    ],
    configuration: "Use the parallel directive with clearly named branches. Ensure each branch has the required agent and tool configuration. Avoid concurrent writes to the same output file, deployment target or mutable environment.",
    failures: [
      "Parallel branches compete for limited executors and wait in the queue.",
      "Two branches overwrite the same workspace output.",
      "One branch fails but the pipeline's result handling is incorrect.",
      "External services apply rate limits to simultaneous requests."
    ],
    recovery: [
      "Inspect each branch's status and console output independently.",
      "Check executor availability and resource saturation.",
      "Separate conflicting workspaces and output paths.",
      "Apply safe concurrency limits to rate-limited integrations.",
      "Rerun the failed branch after confirming its inputs are unchanged."
    ],
    bestPractices: [
      "Parallelize only independent activities.",
      "Use isolated workspaces and unique output locations.",
      "Monitor agent capacity and external service limits.",
      "Keep branch names descriptive.",
      "Require all mandatory checks to succeed before promotion."
    ],
    exercise: "Create two independent Jenkins branches: Maven unit tests and Trivy filesystem scanning. Run them in parallel, introduce a safe failure in one branch and verify that the overall pipeline does not incorrectly report success."
  },

  "3|Shared Libraries": {
    overview: "Jenkins Shared Libraries provide reusable pipeline code that can be consumed by multiple Jenkinsfiles. A library commonly contains Groovy functions, global variables and supporting resources. It helps teams standardize repeated tasks such as checkout, build, test reporting and deployment validation.",
    purpose: "Shared libraries reduce duplicated pipeline logic and make common delivery practices easier to maintain. A central change can improve multiple pipelines, so library versioning, testing and access control are important.",
    architecture: "Shared library Git repository → Jenkins library configuration → version selection → vars and src code loading → Jenkinsfile calls reusable functions.",
    workflow: [
      "Create a dedicated repository for shared pipeline code.",
      "Organize global steps under vars and reusable classes under src.",
      "Configure the library repository and default version in Jenkins.",
      "Load the library from a Jenkinsfile using its configured name.",
      "Call a reusable function with explicit parameters.",
      "Test library changes against representative application pipelines."
    ],
    example: "Several Java services use the same buildAndTest function from a shared library. The function runs Maven verification and publishes JUnit reports consistently across repositories.",
    commands: [
      "git clone https://github.com/example/jenkins-shared-library.git",
      "git status",
      "git log --oneline -5",
      "mvn clean verify",
      "git tag -a v1.0.0 -m \"Shared library v1.0.0\""
    ],
    configuration: "Configure a trusted library repository, credentials and version strategy in Jenkins. Use immutable release tags or reviewed commit references for production pipelines. Keep function inputs explicit and avoid embedding application-specific secrets in library code.",
    failures: [
      "Jenkins cannot clone the library repository.",
      "The requested library version or branch does not exist.",
      "A vars function name or method signature is incorrect.",
      "A library update breaks multiple consuming pipelines."
    ],
    recovery: [
      "Verify library repository URL and access credentials.",
      "Confirm the selected tag, branch or commit exists.",
      "Inspect Groovy compilation and function invocation errors.",
      "Compare the current library revision with the last known-good revision.",
      "Pin consumers to a tested version while the library defect is corrected."
    ],
    bestPractices: [
      "Version and review shared library changes.",
      "Keep reusable functions small and well documented.",
      "Test library behavior before changing the default version.",
      "Use explicit parameters rather than hidden global assumptions.",
      "Maintain compatibility notes for consuming pipelines."
    ],
    exercise: "Create a small shared library with a vars/buildPaymentService.groovy function that runs Maven verification. Configure it in a test Jenkins instance and call it from a payment-service Jenkinsfile."
  },

  "3|Artifacts and Reports": {
    overview: "Build artifacts are outputs produced by a pipeline, such as JAR files, container metadata or packaged test results. Reports provide evidence about execution, including JUnit test results and other quality checks. Jenkins can archive selected files so users can inspect or retrieve them after a build.",
    purpose: "Artifact and report handling creates traceability between source revisions, build results and release candidates. It helps teams investigate failures and promote the exact tested output instead of rebuilding an unverified package later.",
    architecture: "Source commit → build output → test and quality reports → Jenkins archive or external artifact repository → release promotion and deployment.",
    workflow: [
      "Identify the expected build output and report file paths.",
      "Run the build and test commands.",
      "Verify that the expected files exist and are not empty.",
      "Publish JUnit or other supported reports.",
      "Archive the required release artifacts.",
      "Record the commit, build number and artifact checksum for traceability."
    ],
    example: "Jenkins packages payment-service.jar after tests pass, publishes the JUnit report and archives the JAR. The release process records the source commit and checksum associated with that build.",
    commands: [
      "mvn clean verify",
      "Get-ChildItem .\\target",
      "Get-FileHash .\\target\\payment-service.jar -Algorithm SHA256",
      "jar tf target/payment-service.jar",
      "git rev-parse HEAD"
    ],
    configuration: "Use archiveArtifacts with a precise include pattern and appropriate fingerprinting where required. Configure junit with the actual report path. Retain artifacts according to release, audit and storage policies; do not archive credentials, temporary secrets or unnecessary workspace files.",
    failures: [
      "Archive pattern matches no files because the build output path is wrong.",
      "JUnit reports are missing or malformed.",
      "A report is published but belongs to an older build workspace.",
      "Artifact storage fills up or retention removes a required release package."
    ],
    recovery: [
      "Inspect the workspace and confirm the actual output path.",
      "Check Maven output and test-report generation.",
      "Verify that the pipeline archives files from the current build.",
      "Review artifact retention and available storage.",
      "Rebuild from the intended commit and verify the checksum before promotion."
    ],
    bestPractices: [
      "Archive only required outputs and reports.",
      "Record source commit and build identity with every release artifact.",
      "Use checksums or immutable digests for integrity verification.",
      "Set appropriate artifact retention policies.",
      "Store long-term release artifacts in a dedicated artifact repository."
    ],
    exercise: "Build a Spring Boot JAR in Jenkins, publish its JUnit report and archive the JAR. Verify the artifact in the build page, calculate its SHA-256 checksum and confirm the source commit used for that build."
  },

  "3|Pipeline Security": {
    overview: "Pipeline security protects Jenkins controllers, agents, credentials, source code and release permissions. A pipeline executes commands, so an untrusted change can potentially access anything available to its job identity. Security controls must cover both Jenkins configuration and the code being executed.",
    purpose: "Secure pipelines reduce the risk of credential theft, unauthorized deployments, malicious build scripts and compromised agents. Production pipelines should separate trusted release operations from untrusted pull-request validation.",
    architecture: "Authenticated user or webhook → authorization and job permissions → trusted pipeline definition → isolated agent → scoped credentials → approved artifact and deployment destination.",
    workflow: [
      "Classify jobs by trust level and deployment capability.",
      "Restrict controller administration and job configuration permissions.",
      "Use isolated agents for untrusted pull-request builds.",
      "Bind credentials only to the stage that needs them.",
      "Require approval and protected identities for production deployment.",
      "Audit pipeline changes, credential use and administrative activity."
    ],
    example: "A pull request from a contributor can run unit tests on an isolated agent but cannot access production AWS credentials. A protected release job uses a separate identity after required approvals.",
    commands: [
      "whoami",
      "id",
      "git status --short",
      "aws sts get-caller-identity",
      "docker info",
      "sudo journalctl -u jenkins -n 100 --no-pager"
    ],
    configuration: "Enable supported authentication and authorization controls, use folder and job permissions, restrict script approvals and protect credentials. Separate production deployment permissions from ordinary build permissions. Do not allow untrusted code to execute with privileged host or cloud credentials.",
    failures: [
      "A job has broader permissions than its purpose requires.",
      "A pull-request build can access a sensitive credential.",
      "An agent runs untrusted code with privileged host access.",
      "An administrator or pipeline change bypasses required release approval."
    ],
    recovery: [
      "Disable or isolate the affected job if active misuse is suspected.",
      "Identify exposed credentials and rotate or revoke them.",
      "Review job permissions, agent identity and recent configuration changes.",
      "Inspect audit records and build logs for unauthorized activity.",
      "Restore least-privilege settings and validate with a controlled test."
    ],
    bestPractices: [
      "Apply least privilege to users, jobs, agents and cloud identities.",
      "Separate trusted release pipelines from untrusted pull-request builds.",
      "Use ephemeral or isolated agents for risky workloads.",
      "Protect production credentials and deployment approvals.",
      "Patch Jenkins and plugins and review security advisories."
    ],
    exercise: "Design two Jenkins jobs for the payment service: one for untrusted pull-request validation and another for protected release deployment. Document which credentials and permissions each job receives and explain why the pull-request job must not access production secrets."
  },

  "3|Agent Troubleshooting": {
    overview: "Jenkins agent troubleshooting focuses on connectivity, executor availability, workspace permissions, tool installation and resource health. An agent can appear online but still fail to execute a build correctly if its environment is incomplete or overloaded.",
    purpose: "Fast agent diagnosis reduces pipeline delays and avoids unnecessary controller restarts. Engineers should identify whether the problem is caused by the worker host, connection method, labels, Java runtime, workspace or external network dependency.",
    architecture: "Controller queue → agent connection and heartbeat → executor → workspace → build tools → external services → execution result.",
    workflow: [
      "Identify the job and agent on which the failure occurred.",
      "Check whether the agent is online and has an available executor.",
      "Verify host connectivity, service identity and Java runtime.",
      "Inspect workspace ownership, free disk and memory.",
      "Check required tools and access to source-control or artifact endpoints.",
      "Run a minimal diagnostic pipeline before returning the agent to normal workloads."
    ],
    example: "The payment-service pipeline remains queued because its linux-java agent is offline. The administrator checks the worker host, finds that its disk is full, frees approved temporary build data and runs a test job before restoring the agent.",
    commands: [
      "hostname",
      "whoami",
      "java -version",
      "mvn -version",
      "df -h",
      "free -h",
      "ps -ef | grep -i agent",
      "curl -I https://github.com"
    ],
    configuration: "Maintain documented agent labels, remote roots, connection settings and tool installations. Configure disk and resource monitoring. Use a consistent service account and ensure workspace directories are writable only by authorized build identities.",
    failures: [
      "Agent is offline because its host or connection process stopped.",
      "Agent is online but the pipeline cannot find a matching label.",
      "Workspace permission errors prevent checkout or file creation.",
      "Disk, memory or CPU exhaustion causes builds to fail or hang.",
      "Network or DNS problems block repository and artifact access."
    ],
    recovery: [
      "Check controller computer status and agent-side connection logs.",
      "Verify host reachability and the agent service process.",
      "Inspect labels, executors and the job's agent selection.",
      "Check disk, memory, ownership and installed tool versions.",
      "Test DNS and HTTPS connectivity to required endpoints.",
      "Run a small diagnostic pipeline and monitor the agent before resuming full workloads."
    ],
    bestPractices: [
      "Monitor agent availability and resource capacity.",
      "Use consistent agent configuration and documented labels.",
      "Clean workspaces safely without deleting active build data.",
      "Separate workloads with different privilege requirements.",
      "Keep a known-good agent image or rebuild procedure."
    ],
    exercise: "Use a test agent and simulate one safe issue, such as an incorrect workspace permission or missing Maven executable. Diagnose the problem using agent logs and shell commands, fix it and verify a small Jenkins pipeline."
  },

  "3|Production Hands-on Lab": {
    overview: "This lab combines Jenkins controller configuration, agents, credentials, webhooks and pipeline-as-code into a realistic CI workflow for a Spring Boot payment service. The goal is to produce a tested, traceable artifact and demonstrate safe failure handling before a release is approved.",
    purpose: "A production-style lab helps engineers understand how individual Jenkins capabilities work together. It demonstrates the operational checks required before a build can be trusted and promoted to later security, image and deployment stages.",
    architecture: "GitHub payment-service repository → webhook → Jenkins controller → Linux Java agent → checkout → Maven build and tests → reports and JAR archive → release evidence.",
    workflow: [
      "Prepare a test Jenkins controller and a dedicated Linux Java agent.",
      "Configure repository access through a scoped Jenkins credential.",
      "Create and commit a Jenkinsfile to the payment-service repository.",
      "Configure a webhook and verify its delivery.",
      "Run checkout, Maven verification and artifact packaging stages.",
      "Publish JUnit reports and archive the resulting JAR.",
      "Introduce a controlled test failure and verify that Jenkins blocks successful promotion.",
      "Restore the test and confirm that the pipeline succeeds with traceable output."
    ],
    example: "A payment-service pull request triggers Jenkins through GitHub. The controller schedules a Linux Java agent, which checks out the exact commit, runs Maven verification and archives the JAR. A failing unit test causes a failed build, while a corrected commit produces a successful build and report.",
    commands: [
      "java -version",
      "mvn -version",
      "git rev-parse HEAD",
      "mvn clean verify",
      "ls -lh target/",
      "sha256sum target/*.jar",
      "curl -I https://jenkins.example.com/login",
      "sudo journalctl -u jenkins -n 100 --no-pager"
    ],
    configuration: "Use a Jenkinsfile stored in Git, a dedicated agent label, scoped repository credentials, a verified webhook endpoint and controlled artifact retention. Configure build and test stages with clear failure behavior. Keep production deployment credentials out of this validation lab.",
    failures: [
      "Webhook delivery does not start the expected pipeline.",
      "The agent is offline or lacks Java and Maven.",
      "Repository credentials cannot access the payment-service source.",
      "Maven tests fail or reports are not generated.",
      "The expected JAR is missing or the archive pattern is incorrect."
    ],
    recovery: [
      "Inspect webhook delivery and confirm the repository event and commit.",
      "Check controller queue, agent status and available executors.",
      "Validate repository access using the configured credential without exposing it.",
      "Read Maven output and fix the first failing test or dependency issue.",
      "Confirm the artifact path, checksum and archive result.",
      "Rerun the pipeline and retain the successful build evidence."
    ],
    bestPractices: [
      "Keep the pipeline definition in source control.",
      "Use isolated agents and least-privilege credentials.",
      "Publish test evidence even when tests fail.",
      "Promote only verified artifacts associated with a known commit.",
      "Monitor controller, agent and queue health.",
      "Back up Jenkins configuration and document recovery procedures."
    ],
    exercise: "Build the complete payment-service Jenkins workflow in a test environment. Demonstrate webhook triggering, agent execution, Maven build, unit tests, JUnit report publication and JAR archiving. Intentionally fail one test, capture the evidence, correct it and prove that the final successful artifact belongs to the corrected commit."
  }
};
