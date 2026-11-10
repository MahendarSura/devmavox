import type { CicdTopicLesson } from "./cicd-topic-lessons";

export const stageThreeLessonOverrides: Partial<Record<string, CicdTopicLesson>> = {
  "3|Jenkins Fundamentals": {
    overview: "Jenkins is an open-source automation server used to build, test, package, and deploy applications. It automates repetitive software delivery activities through jobs and pipelines. Jenkins integrates with Git, Maven, Docker, Kubernetes, code-quality platforms, and cloud services.",
    purpose: "Jenkins provides continuous integration and continuous delivery by automatically validating code changes and coordinating delivery tasks. When a developer pushes payment-service code to GitHub, Jenkins can check out the commit, compile Java code, execute tests, build a Docker image, and publish the image to a registry.",
    architecture: "Jenkins runs through a controller and one or more execution agents. The controller manages jobs, pipeline definitions, scheduling, credentials, and build results. Agents execute build steps. Jobs can be configured through the UI or stored as Jenkinsfiles in source control. Plugins connect Jenkins to external tools.",
    workflow: [
      "Install and start Jenkins on a supported server.",
      "Complete the initial setup and create an administrator account.",
      "Install only the required plugins.",
      "Configure source-control and build-tool integrations.",
      "Create a pipeline job connected to a Git repository.",
      "Define build, test, and packaging stages.",
      "Execute the pipeline and inspect console output.",
      "Configure triggers and notifications for team visibility."
    ],
    example: "A payment-service developer pushes a Java change to GitHub. Jenkins receives the repository event and starts a pipeline. It checks out the source, runs mvn clean verify, builds a Docker image, scans the image, and publishes an approved image to Amazon ECR. The pipeline result provides evidence of whether the change passed validation.",
    commands: [
      "java -version — verify the Java runtime used by Jenkins.",
      "jenkins --version — inspect Jenkins CLI version where supported.",
      "sudo systemctl status jenkins — inspect Jenkins service status on Linux.",
      "sudo systemctl restart jenkins — restart Jenkins after an approved configuration change.",
      "sudo journalctl -u jenkins -n 100 --no-pager — inspect recent service logs.",
      "curl -I http://localhost:8080/login — test the Jenkins HTTP endpoint.",
      "mvn clean verify — run a sample Maven build.",
      "docker --version — verify Docker CLI availability on the build environment."
    ],
    configuration: "Configure the Jenkins URL, administrator access, security realm, authorization strategy, required plugins, and build tools. Store credentials in Jenkins Credentials rather than pipeline source. Configure Git repository access, agent labels, build retention, and notification settings. Use a supported Java runtime compatible with the installed Jenkins release.",
    failures: [
      "Jenkins does not start because the Java runtime is incompatible.",
      "The login page is unavailable because the service or network port is down.",
      "A pipeline cannot check out source because Git credentials are invalid.",
      "A build fails because Maven or Java is unavailable on the execution agent.",
      "A plugin fails because of an incompatible dependency.",
      "Builds remain queued because no eligible agent is available."
    ],
    recovery: [
      "Inspect Jenkins service logs and verify the supported Java version.",
      "Check service status, listening ports, firewall rules, and reverse-proxy configuration.",
      "Validate the repository URL and credential identifier.",
      "Verify Java and Maven on the actual agent executing the job.",
      "Review plugin dependency errors before upgrading or removing plugins.",
      "Inspect queue reasons, executor availability, and agent connectivity."
    ],
    bestPractices: [
      "Store pipeline definitions in source control.",
      "Use dedicated agents instead of running every build on the controller.",
      "Apply role-based access and least privilege.",
      "Keep plugins updated through a controlled compatibility process.",
      "Store secrets in Jenkins Credentials.",
      "Use build retention and log rotation.",
      "Monitor controller health, agent availability, and queue length.",
      "Make pipelines repeatable and observable."
    ],
    exercise: "Install Jenkins in a test environment, complete the initial setup, create a pipeline job connected to a GitHub repository, and execute a Maven build. Inspect the console output, configure a build trigger, and document the controller URL, Java version, plugin list, and successful build number."
  },

  "3|Jenkins Architecture": {
    overview: "Jenkins architecture describes how the controller, agents, executors, jobs, pipelines, plugins, credentials, and workspaces cooperate to automate software delivery. The controller coordinates work while agents perform build and deployment tasks. This separation supports distributed execution and controlled resource usage.",
    purpose: "Understanding architecture helps DevOps engineers design scalable Jenkins environments, isolate workloads, secure credentials, and troubleshoot slow or failing pipelines. A production Jenkins installation should avoid using the controller as a general-purpose build machine.",
    architecture: "The controller hosts the web interface, job configuration, pipeline orchestration, queue, plugin management, and build metadata. Agents connect through supported communication methods and execute assigned work. Executors represent concurrent task capacity. Workspaces contain checked-out source and temporary build files. External systems provide source code, artifact storage, container registries, and deployment targets.",
    workflow: [
      "A developer pushes a change to the source repository.",
      "A webhook or polling trigger notifies Jenkins.",
      "The controller schedules the corresponding pipeline.",
      "The pipeline requests an agent with matching labels.",
      "The agent receives the task and prepares its workspace.",
      "Build and test commands execute on the agent.",
      "Results and logs are reported to the controller.",
      "Artifacts are archived or published to external repositories."
    ],
    example: "A payment-service Jenkins controller receives pull request events and schedules Java builds on Linux agents. Docker image builds run on a separate Docker-enabled agent. Deployment jobs use restricted agents with access to the approved Kubernetes environment. This architecture separates workloads and avoids giving every agent production permissions.",
    commands: [
      "java -version — inspect the Java runtime.",
      "sudo systemctl status jenkins — inspect the controller service.",
      "ps -ef | grep jenkins — inspect the Jenkins process on Linux.",
      "df -h — inspect filesystem capacity.",
      "free -h — inspect memory availability.",
      "uptime — inspect system load.",
      "curl -I http://jenkins.example.com/login — test the controller endpoint.",
      "sudo journalctl -u jenkins -n 100 --no-pager — inspect controller logs."
    ],
    configuration: "Set an appropriate number of controller executors, normally keeping the controller focused on orchestration. Define agent labels that describe capabilities such as linux, java, docker, and kubernetes. Configure agent connection security, workspace locations, retention, and credentials. Monitor controller memory, disk usage, queue size, and agent availability.",
    failures: [
      "The controller becomes overloaded because builds run on it.",
      "Agents disconnect because of network or authentication failures.",
      "Executors remain occupied by stuck processes.",
      "Workspaces consume disk space and cause build failures.",
      "The controller cannot schedule jobs because no matching agent exists.",
      "Builds are slow because workloads compete for limited CPU and memory."
    ],
    recovery: [
      "Inspect controller resource usage and move workloads to dedicated agents.",
      "Check agent connection logs, network reachability, and authentication configuration.",
      "Identify stuck builds and terminate them through approved job controls.",
      "Clean obsolete workspaces using safe retention policies.",
      "Verify that pipeline agent labels match available agent labels.",
      "Scale agent capacity according to measured queue and resource demand."
    ],
    bestPractices: [
      "Separate orchestration from build execution.",
      "Use dedicated and appropriately isolated agents.",
      "Assign labels based on actual execution capabilities.",
      "Monitor controller resources and build queues.",
      "Keep workspaces and artifacts under retention policies.",
      "Restrict network access between controller, agents, and production systems.",
      "Back up Jenkins configuration and critical metadata.",
      "Test architecture changes before production rollout."
    ],
    exercise: "Design a Jenkins architecture with one controller and three agents: Java, Docker, and Kubernetes. Define labels and identify which tasks each agent can execute. Create a pipeline that runs tests on the Java agent and image creation on the Docker agent. Verify that the controller coordinates execution without performing the application build."
  },

  "3|Controller and Agents": {
    overview: "The Jenkins controller manages pipeline scheduling, job configuration, build history, credentials, and the web interface. Jenkins agents are execution nodes that perform tasks assigned by the controller. An agent can be a physical server, virtual machine, container, or cloud-provisioned worker.",
    purpose: "Separating controllers and agents improves scalability, workload isolation, and security. Java compilation, Docker image creation, and Kubernetes deployment can run on different agents with different tools and permissions. This prevents one build workload from consuming all resources on the central Jenkins server.",
    architecture: "The controller maintains the queue and assigns work to eligible agents using labels and executor capacity. Agents connect through supported inbound or SSH-based methods. Each agent provides an execution environment and workspace. Pipeline agent directives determine where pipeline stages or jobs run.",
    workflow: [
      "Prepare the controller with the supported Java runtime.",
      "Create or provision a worker machine.",
      "Install or configure the required agent runtime.",
      "Register the agent with a unique name and appropriate labels.",
      "Configure a secure connection method.",
      "Verify the agent is online and has available executors.",
      "Create a pipeline that selects the agent by label.",
      "Execute a test command and verify that it runs on the intended worker."
    ],
    example: "A payment-service pipeline uses a java-agent for Maven tests, a docker-agent for image construction, and a deployment-agent for Kubernetes rollout. The deployment agent has restricted access to the production cluster, while ordinary test agents do not receive production credentials.",
    commands: [
      "java -version — verify Java on an agent.",
      "hostname — identify the machine executing a build.",
      "whoami — inspect the agent execution user.",
      "df -h — check available disk space.",
      "free -h — check available memory.",
      "ps -ef | grep agent.jar — inspect a Java agent process on Linux.",
      "nc -zv controller.example.com 50000 — test an agent communication port where that port is configured.",
      "curl -I https://controller.example.com/login — test controller HTTP connectivity."
    ],
    configuration: "Create agents with unique names, labels, remote roots, and executor counts. Choose a supported inbound or SSH launch method. Use dedicated service identities and restrict their permissions. Install only the tools required by each agent role. Configure agent availability, connection timeouts, and workspace cleanup.",
    failures: [
      "An agent remains offline because its launch configuration is incorrect.",
      "The agent cannot connect to the controller because of firewall restrictions.",
      "A pipeline waits because its requested label does not exist.",
      "The agent lacks Maven, Docker, or kubectl.",
      "Multiple executors overload the worker machine.",
      "The agent workspace has insufficient disk space."
    ],
    recovery: [
      "Inspect the agent log and verify its launch method and credentials.",
      "Test DNS, routing, firewall rules, and configured communication ports.",
      "Compare pipeline labels with labels configured on online agents.",
      "Install or configure required tools on the correct worker.",
      "Reduce executor concurrency when resource contention is observed.",
      "Clean obsolete workspaces and expand disk capacity when required."
    ],
    bestPractices: [
      "Use dedicated agents for different workload types.",
      "Avoid executing untrusted builds on privileged deployment agents.",
      "Use labels that describe actual capabilities.",
      "Apply least privilege to agent service accounts.",
      "Keep agent software and build tools maintained.",
      "Monitor online status, executors, disk, CPU, and memory.",
      "Use ephemeral agents for workloads that benefit from clean environments.",
      "Keep production credentials isolated from general build workers."
    ],
    exercise: "Create two Jenkins agents with labels java and docker. Configure one pipeline stage to run Maven commands on java and another stage to run a Docker version check on docker. Use hostname and whoami to verify the execution node and identity for each stage."
  },

  "3|Installation and Setup": {
    overview: "Jenkins installation and setup involves preparing a supported operating system and Java runtime, installing the Jenkins package, starting the service, completing the initial setup wizard, and configuring administrative access. Production setup also requires secure networking, persistent storage, backups, and a controlled upgrade process.",
    purpose: "A correctly installed Jenkins server provides a stable foundation for continuous integration and delivery. Incorrect Java versions, missing storage, insecure initial settings, or exposed network ports can make the service unreliable or vulnerable.",
    architecture: "Jenkins runs as a Java application and normally exposes a web interface through a configured HTTP port or reverse proxy. The JENKINS_HOME directory stores configuration, jobs, credentials metadata, plugins, and build records. The operating system service manager controls startup and shutdown. Agents connect to the controller through configured communication channels.",
    workflow: [
      "Select an operating system and Jenkins release supported by the organization.",
      "Install a compatible Java runtime.",
      "Install Jenkins using the official package or approved distribution method.",
      "Start the Jenkins service and verify its status.",
      "Retrieve the initial administrator password.",
      "Complete the setup wizard and create an administrator.",
      "Configure security, URL, plugins, and system settings.",
      "Configure persistent storage, firewall rules, backups, and monitoring."
    ],
    example: "A DevMavox team installs Jenkins on a Linux virtual machine for payment-service CI. The administrator installs a compatible Java runtime and Jenkins package, opens the approved access path, completes setup, configures Git integration, and connects a build agent. Jenkins stores its persistent configuration on a backed-up volume.",
    commands: [
      "java -version — verify the Java runtime.",
      "sudo systemctl enable jenkins — enable Jenkins at system startup.",
      "sudo systemctl start jenkins — start Jenkins.",
      "sudo systemctl status jenkins — inspect service status.",
      "sudo cat /var/lib/jenkins/secrets/initialAdminPassword — retrieve the initial password on a standard Linux package installation when applicable.",
      "sudo journalctl -u jenkins -n 100 --no-pager — inspect service logs.",
      "ss -lntp | grep 8080 — inspect a configured Jenkins listening port.",
      "curl -I http://localhost:8080/login — test the local web endpoint."
    ],
    configuration: "Use a supported Java runtime and Jenkins release combination. Set a persistent JENKINS_HOME location with appropriate ownership and backup coverage. Restrict network access, use HTTPS through an approved reverse proxy, configure an authorization strategy, and disable unnecessary services. Document the installation version, plugins, service settings, and recovery procedure.",
    failures: [
      "Jenkins package installation fails because repository configuration is incorrect.",
      "The service fails to start because the Java runtime is incompatible.",
      "The web page is unreachable because the port or firewall is misconfigured.",
      "The initial administrator password cannot be read due to incorrect permissions or an unexpected installation path.",
      "JENKINS_HOME is not writable by the service account.",
      "The server runs out of disk space during plugin installation or builds."
    ],
    recovery: [
      "Inspect package manager output and verify the official package repository configuration.",
      "Check Java compatibility and service logs.",
      "Verify the configured HTTP port, firewall, proxy, and listening process.",
      "Locate the actual JENKINS_HOME directory and inspect file ownership.",
      "Restore appropriate permissions for the Jenkins service account.",
      "Check filesystem usage and expand or clean storage according to retention policy."
    ],
    bestPractices: [
      "Install from trusted and approved package sources.",
      "Use a supported Java runtime.",
      "Keep JENKINS_HOME on persistent storage.",
      "Enable HTTPS and secure authentication.",
      "Restrict inbound network access.",
      "Back up configuration and critical metadata.",
      "Monitor disk, memory, service health, and logs.",
      "Test upgrades and restore procedures before production changes."
    ],
    exercise: "Install Jenkins on a Linux test virtual machine. Verify Java compatibility, start the Jenkins service, complete the setup wizard, and create an administrator account. Configure the service to start automatically, inspect its listening port, and document the JENKINS_HOME location and backup approach."
  },

  "3|Credentials Management": {
    overview: "Jenkins Credentials Management stores authentication material such as usernames, passwords, SSH private keys, API tokens, and certificates in a protected credential store. Pipelines reference credentials by identifier instead of embedding secret values in source code.",
    purpose: "CI/CD pipelines must authenticate to Git repositories, container registries, cloud platforms, artifact repositories, and deployment environments. Centralized credential storage reduces accidental exposure and makes credential rotation and access control manageable.",
    architecture: "Jenkins stores credential metadata and encrypted secret material within its protected configuration. Credentials can be scoped globally, to a folder, or to a supported item context. Pipeline steps retrieve credentials using an identifier and expose them only within the required execution scope. External identity systems can provide short-lived credentials where supported.",
    workflow: [
      "Identify the external service and required authentication method.",
      "Create a dedicated service account or token with minimum permissions.",
      "Open Jenkins Credentials management.",
      "Add the credential using the correct type and scope.",
      "Assign a clear credential identifier.",
      "Reference the identifier in the pipeline.",
      "Test access without printing the secret value.",
      "Rotate credentials and revoke unused access according to policy."
    ],
    example: "A payment-service pipeline needs to push a Docker image to Amazon ECR. The pipeline uses an approved AWS identity with permission to authenticate and push to the required repository. The credential is stored securely or supplied through short-lived role credentials, and the pipeline never writes access keys into the Jenkinsfile.",
    commands: [
      "aws sts get-caller-identity — verify the active AWS identity.",
      "git ls-remote https://github.com/organization/payment-service.git — test repository access where approved authentication is configured.",
      "docker login <registry> -u <username> --password-stdin — authenticate using standard input.",
      "mvn help:effective-settings — inspect effective Maven settings carefully without exposing credentials.",
      "env | grep -E 'TOKEN|PASSWORD|SECRET' — identify suspicious environment variable names without printing their values in production diagnostics.",
      "sudo systemctl status jenkins — inspect Jenkins service health.",
      "sudo journalctl -u jenkins -n 100 --no-pager — inspect service logs."
    ],
    configuration: "Create credentials with an appropriate type, scope, and identifier. Use folder-level credentials for team isolation where appropriate. Reference secrets through Jenkins credentials binding or supported credential-aware steps. Disable shell tracing around sensitive operations, avoid printing environment variables, and restrict who can configure or use credentials.",
    failures: [
      "A pipeline reports that the credential identifier cannot be found.",
      "Authentication fails because a token has expired.",
      "A credential has insufficient permissions for the requested operation.",
      "A secret is accidentally exposed in console output.",
      "A folder-scoped credential is unavailable to a job outside that folder.",
      "A pipeline uses a stale credential after rotation."
    ],
    recovery: [
      "Verify the credential identifier, type, and scope.",
      "Check token expiration and replace it through the approved process.",
      "Review the external service permissions required by the operation.",
      "Stop further exposure and rotate any secret that appeared in logs.",
      "Correct folder or item scope and verify the job context.",
      "Update dependent jobs and rerun the pipeline without displaying secret values."
    ],
    bestPractices: [
      "Never hard-code secrets in Jenkinsfiles.",
      "Use least-privilege service identities.",
      "Prefer short-lived credentials and federation where possible.",
      "Scope credentials to the smallest practical folder or job.",
      "Avoid shell tracing and secret echoing.",
      "Rotate credentials and revoke unused tokens.",
      "Audit credential creation and usage permissions.",
      "Separate production credentials from development build credentials."
    ],
    exercise: "Create a test Jenkins credential for a non-production Git repository or registry. Reference it from a pipeline using the credentials binding mechanism. Verify that authentication succeeds, confirm the secret value is not printed in console output, and document how the credential would be rotated."
  },

  "3|Plugin Management": {
    overview: "Jenkins plugins extend the automation server with integrations, pipeline steps, authentication providers, build tools, notifications, and user-interface features. Plugins connect Jenkins with systems such as GitHub, Maven, Docker, Kubernetes, artifact repositories, and cloud platforms.",
    purpose: "Plugins allow Jenkins to support different development and delivery technologies without implementing every integration itself. Controlled plugin management is important because incompatible or vulnerable plugins can interrupt builds, expose sensitive functionality, or affect controller stability.",
    architecture: "A plugin is installed into Jenkins and may depend on other plugins and specific Jenkins core versions. Plugin code runs within the Jenkins environment and can contribute extensions, pipeline steps, and configuration screens. Plugin updates may require a restart and should be tested against the installed Jenkins release.",
    workflow: [
      "Identify the integration or capability required by a pipeline.",
      "Check whether Jenkins already provides the required functionality.",
      "Review the plugin's maintenance status and compatibility.",
      "Check required dependencies and security advisories.",
      "Install or update the plugin in a controlled environment.",
      "Restart Jenkins when required.",
      "Validate the plugin using a representative test job.",
      "Document the installed version and rollback approach."
    ],
    example: "A payment-service team needs GitHub integration and Kubernetes deployment capabilities. The Jenkins administrator reviews compatible plugins, installs the required GitHub and Kubernetes integrations in a test environment, and validates checkout and deployment operations before applying the approved plugin set to production.",
    commands: [
      "java -version — verify the runtime used by Jenkins.",
      "sudo systemctl status jenkins — inspect service status.",
      "sudo journalctl -u jenkins -n 150 --no-pager — inspect startup and plugin errors.",
      "find /var/lib/jenkins/plugins -maxdepth 1 -type f — inspect plugin files on a standard Linux installation.",
      "ls -lh /var/lib/jenkins/plugins — inspect plugin storage usage.",
      "curl -I http://localhost:8080/pluginManager/ — check the plugin manager endpoint when authorized.",
      "df -h /var/lib/jenkins — inspect plugin and home-directory storage."
    ],
    configuration: "Maintain an approved plugin inventory with versions, owners, purpose, and compatibility notes. Review plugin dependencies and security advisories before installation. Use a test Jenkins environment to validate upgrades. Back up JENKINS_HOME before significant changes and use a documented restart and rollback process.",
    failures: [
      "Jenkins fails to start because a plugin is incompatible.",
      "A plugin remains disabled because a dependency is missing.",
      "A pipeline step is unavailable because the required plugin is not installed.",
      "Plugin updates fail because of network or repository access issues.",
      "A vulnerable plugin remains installed without an owner.",
      "A plugin update changes behavior and breaks existing pipelines."
    ],
    recovery: [
      "Inspect startup logs and identify the plugin named in the error.",
      "Check the plugin's required Jenkins core and dependency versions.",
      "Restore the previous tested plugin version or follow the documented disablement process.",
      "Validate network access to approved update sources.",
      "Remove unused plugins after confirming no jobs depend on them.",
      "Run representative pipelines after plugin changes."
    ],
    bestPractices: [
      "Install only plugins that provide a required capability.",
      "Review plugin maintenance and security advisories.",
      "Test plugin updates before production rollout.",
      "Maintain an inventory and dependency record.",
      "Back up Jenkins configuration before significant plugin changes.",
      "Remove obsolete plugins safely.",
      "Avoid uncontrolled automatic updates in production.",
      "Monitor startup logs after plugin upgrades."
    ],
    exercise: "Inspect the installed Jenkins plugin inventory. Identify the plugins required for GitHub checkout, Maven builds, credentials binding, and pipeline execution. Check compatibility and dependencies for one candidate update in a test environment. Run a representative pipeline before documenting the update decision."
  },

  "3|Webhook Integration": {
    overview: "Webhook integration allows a source-control platform such as GitHub to notify Jenkins when repository events occur. A push or pull request event can start a Jenkins pipeline automatically. This creates an event-driven connection between developer activity and CI execution.",
    purpose: "Webhooks reduce the delay between a code change and automated validation. Developers do not need to wait for a scheduled repository poll. Jenkins can run tests soon after a push, report build status, and provide rapid feedback before code is merged.",
    architecture: "GitHub sends an HTTP request to a configured Jenkins webhook endpoint when a selected event occurs. Jenkins or its integration plugin receives the request, identifies the repository and event, and schedules the appropriate job. The receiver must be reachable and protected against unauthorized or invalid requests.",
    workflow: [
      "Create a Jenkins pipeline connected to the intended GitHub repository.",
      "Install and configure the required source-control integration.",
      "Identify the correct webhook endpoint for the integration.",
      "Configure the webhook URL in GitHub repository settings.",
      "Select push and pull request events as required.",
      "Configure secure request validation and network access.",
      "Push a test commit to generate an event.",
      "Inspect GitHub delivery history and Jenkins build activity."
    ],
    example: "A developer pushes a payment-service change to GitHub. GitHub sends a push event to Jenkins. Jenkins identifies the repository and branch, checks out the commit, and runs Maven tests. The build result is associated with the source change so reviewers can see whether the proposed code passed validation.",
    commands: [
      "git push origin feature/payment-api — generate a push event.",
      "curl -I https://jenkins.example.com/github-webhook/ — test the configured endpoint.",
      "sudo systemctl status jenkins — verify Jenkins is running.",
      "sudo journalctl -u jenkins -n 100 --no-pager — inspect Jenkins logs.",
      "ss -lntp — inspect listening network ports.",
      "nslookup jenkins.example.com — verify DNS resolution.",
      "nc -zv jenkins.example.com 443 — test HTTPS connectivity.",
      "git rev-parse HEAD — identify the commit expected in the build."
    ],
    configuration: "Configure the appropriate GitHub integration and repository webhook endpoint. Use HTTPS, restrict network access, and validate event authenticity using supported integration security controls. Subscribe only to required events. Ensure reverse proxies preserve the required request path and headers.",
    failures: [
      "GitHub webhook delivery fails because Jenkins is unreachable.",
      "The webhook returns HTTP 404 because the URL path is incorrect.",
      "The event arrives but no Jenkins job starts.",
      "A reverse proxy removes required request headers.",
      "The job checks out a different branch or commit.",
      "Duplicate events create unnecessary builds."
    ],
    recovery: [
      "Inspect GitHub webhook delivery status, response code, and response body.",
      "Verify Jenkins availability, DNS, firewall, proxy, and endpoint path.",
      "Check repository and job integration configuration.",
      "Inspect event payload details and branch filtering.",
      "Verify that the build checks out the commit associated with the event.",
      "Configure appropriate duplicate-event handling and avoid unnecessary triggers."
    ],
    bestPractices: [
      "Use HTTPS and approved event validation.",
      "Subscribe only to necessary repository events.",
      "Keep webhook endpoints reachable through controlled network paths.",
      "Use branch filters to avoid irrelevant builds.",
      "Monitor webhook delivery failures.",
      "Prevent duplicate events from causing unsafe deployment actions.",
      "Keep integration plugins updated.",
      "Test webhook changes before applying them to production repositories."
    ],
    exercise: "Connect a test GitHub repository to a Jenkins pipeline using a webhook. Configure push events, push a feature branch commit, and verify that Jenkins starts a build for the correct branch and commit. Inspect GitHub delivery details and Jenkins logs if the trigger does not work."
  },

  "3|Jenkinsfile Fundamentals": {
    overview: "A Jenkinsfile is a text file that defines a Jenkins pipeline as code. It is normally stored in the root of an application repository so pipeline changes can be reviewed and versioned alongside application code. Jenkins supports Declarative and Scripted Pipeline syntax.",
    purpose: "Pipeline as code makes CI/CD workflows repeatable, reviewable, and easier to maintain. Developers can change build stages through normal pull requests instead of relying entirely on manually configured jobs. The Jenkinsfile also provides a shared record of how an application is built, tested, and delivered.",
    architecture: "Jenkins reads a Jenkinsfile from the configured source repository. The file defines pipeline execution, agent selection, stages, steps, environment variables, options, and post-build behavior. Jenkins Pipeline plugins provide the execution engine and supported pipeline steps.",
    workflow: [
      "Create a source repository for the application.",
      "Add a Jenkinsfile at the expected repository path.",
      "Define the pipeline structure and execution agent.",
      "Add checkout, build, test, and packaging stages.",
      "Commit the Jenkinsfile with the application changes.",
      "Configure a Jenkins Pipeline job to use Pipeline script from SCM.",
      "Run the pipeline and inspect stage results.",
      "Update the Jenkinsfile through reviewed source-control changes."
    ],
    example: "A payment-service Jenkinsfile checks out Java source, runs mvn clean verify, archives the generated JAR, and reports the result. When the Jenkinsfile changes, the pull request review process checks the pipeline modification just like application code.",
    commands: [
      "git add Jenkinsfile — stage the pipeline definition.",
      "git diff -- Jenkinsfile — inspect Jenkinsfile changes.",
      "git commit -m \"ci: add Jenkins pipeline\" — commit pipeline code.",
      "git push origin feature/jenkins-pipeline — publish the pipeline branch.",
      "mvn clean verify — reproduce the Java build locally.",
      "git show HEAD:Jenkinsfile — inspect the committed Jenkinsfile.",
      "git log --oneline -- Jenkinsfile — inspect pipeline-definition history.",
      "grep -nE 'pipeline|agent|stages|steps' Jenkinsfile — inspect major Declarative Pipeline keywords."
    ],
    configuration: "Configure the Jenkins job to load the Jenkinsfile from the correct repository, branch, and script path. Use a supported pipeline syntax and approved agent labels. Keep credentials outside the file and use Jenkins credentials binding. Define timeout, build retention, test reporting, and post-build behavior where appropriate.",
    failures: [
      "Jenkins cannot find the Jenkinsfile because its script path is incorrect.",
      "The pipeline fails because of invalid Groovy or Declarative syntax.",
      "A stage uses an agent label that does not exist.",
      "A pipeline references an undefined environment variable.",
      "A shell command works locally but fails on the Jenkins agent.",
      "A Jenkinsfile exposes a credential or hard-coded environment value."
    ],
    recovery: [
      "Verify the repository, branch, and Jenkinsfile path in the job configuration.",
      "Inspect the syntax error and correct the pipeline structure.",
      "Check agent availability and label configuration.",
      "Verify environment variables and their scope.",
      "Reproduce the command on the same operating system and tool versions as the agent.",
      "Move secrets into Jenkins Credentials and rotate exposed values."
    ],
    bestPractices: [
      "Store Jenkinsfiles in source control.",
      "Use clear stage and step names.",
      "Keep pipeline logic understandable and modular.",
      "Use approved agent labels.",
      "Avoid hard-coded secrets.",
      "Apply timeouts and build retention.",
      "Publish test reports and useful artifacts.",
      "Review pipeline changes through pull requests."
    ],
    exercise: "Create a Jenkinsfile in a Java application repository. Define an agent, Checkout, Build, and Test stages. Configure a Jenkins Pipeline job to load the file from SCM. Commit a change to the Jenkinsfile, push it, and verify that Jenkins executes the updated pipeline."
  },

  "3|Declarative Pipeline": {
    overview: "Declarative Pipeline is a structured Jenkins pipeline syntax that uses a defined pipeline block containing sections such as agent, stages, steps, environment, options, parameters, and post. It provides a consistent format for expressing common CI/CD workflows.",
    purpose: "Declarative Pipeline makes pipeline definitions easier to read, review, and maintain. Its structured syntax helps teams standardize build, test, packaging, and deployment workflows. It is suitable for most application delivery pipelines where the execution flow can be expressed through defined stages.",
    architecture: "The pipeline block contains global configuration and stage definitions. Each stage can select an agent and contain steps. Environment variables, options, parameters, and post conditions control execution behavior. Jenkins validates Declarative syntax and executes the defined stages through its Pipeline engine.",
    workflow: [
      "Create a Jenkinsfile using the pipeline block.",
      "Select an agent or define stage-specific agents.",
      "Configure options such as timeout and timestamps.",
      "Define environment variables without exposing secrets.",
      "Create stages for checkout, build, test, and package.",
      "Use steps to execute shell commands or supported pipeline steps.",
      "Configure post actions for reports and notifications.",
      "Run the pipeline and inspect stage-level results."
    ],
    example: "A payment-service Declarative Pipeline uses an agent labeled java. Its Build stage runs mvn clean compile, Test runs mvn test, and Package runs mvn package. A post section publishes test reports and records the build outcome. This creates a repeatable CI workflow for every validated code change.",
    commands: [
      "mvn clean compile — compile the Java application.",
      "mvn test — run unit tests.",
      "mvn package — create the application package.",
      "mvn clean verify — execute the full verification lifecycle.",
      "git diff --check — inspect whitespace errors.",
      "git show HEAD:Jenkinsfile — inspect the committed pipeline.",
      "java -version — verify the Java runtime on the build environment.",
      "mvn -version — inspect Maven and Java details."
    ],
    configuration: "Use a pipeline block with explicit agent selection, stages, and steps. Configure timeout, timestamps, build retention, environment variables, and post actions. Use credentials binding for secrets. Keep stage responsibilities focused and select agent labels that match installed tools.",
    failures: [
      "A Declarative Pipeline fails because a required section is placed incorrectly.",
      "The agent directive selects an unavailable node.",
      "A shell command exits with a non-zero status and stops the stage.",
      "Environment variables are unavailable in the expected scope.",
      "A post action references a report that was never generated.",
      "A pipeline exceeds its configured execution timeout."
    ],
    recovery: [
      "Review the Jenkinsfile structure and correct Declarative syntax.",
      "Verify agent labels and online executor availability.",
      "Inspect the failed shell command and its exit code.",
      "Check environment variable scope and credential binding.",
      "Confirm report generation paths before publishing reports.",
      "Adjust timeouts based on measured build duration and investigate unusually slow stages."
    ],
    bestPractices: [
      "Prefer Declarative Pipeline for standard delivery workflows.",
      "Use meaningful stage names.",
      "Keep each stage focused on one responsibility.",
      "Set timeouts and build retention.",
      "Publish test results even when later stages fail.",
      "Use credentials binding for sensitive values.",
      "Use parameters only when they provide a clear operational benefit.",
      "Validate Jenkinsfile changes in a test job before production rollout."
    ],
    exercise: "Write a Declarative Jenkinsfile for a Maven application with Checkout, Compile, Test, and Package stages. Add timestamps, a timeout, and post actions for test reports. Run it on a Java-labeled agent and verify the result of every stage."
  },

  "3|Scripted Pipeline": {
    overview: "Scripted Pipeline is a Jenkins pipeline approach written using Groovy-based pipeline syntax. It provides flexible control structures, variables, functions, and programmatic execution logic. The pipeline commonly uses node blocks, stages, and steps to define the work performed by Jenkins agents.",
    purpose: "Scripted Pipeline is useful when a delivery workflow requires dynamic decisions, custom iteration, or more complex control flow. It allows engineers to build advanced automation, but greater flexibility can make pipelines harder to understand and maintain.",
    architecture: "A Scripted Pipeline uses Groovy execution within Jenkins Pipeline CPS transformation. The node block allocates an executor and workspace. Stage blocks organize the build view, while steps execute commands and pipeline operations. Shared libraries can extract reusable logic from large scripts.",
    workflow: [
      "Create a Jenkinsfile with a Scripted Pipeline structure.",
      "Allocate an appropriate node and workspace.",
      "Define named stages for each delivery activity.",
      "Execute build and test commands.",
      "Use conditions for optional workflow behavior.",
      "Handle expected failures using controlled error handling.",
      "Publish artifacts and reports.",
      "Review the pipeline for readability and safe execution."
    ],
    example: "A payment-service pipeline runs standard Maven validation and conditionally executes an additional integration test stage when a release parameter is enabled. Scripted control flow evaluates the parameter, selects the required work, and records the result. The same pipeline still uses approved credentials and restricted agents.",
    commands: [
      "mvn clean verify — run the application verification.",
      "git status — inspect the source workspace.",
      "git rev-parse HEAD — record the source commit.",
      "hostname — identify the execution node.",
      "whoami — inspect the execution identity.",
      "df -h — inspect workspace storage.",
      "java -version — verify Java.",
      "mvn -version — verify Maven."
    ],
    configuration: "Use node and stage blocks to organize execution. Keep Groovy logic simple and move reusable functions into a shared library when appropriate. Avoid unsupported or unsafe operations. Use approved agent labels, credentials binding, timeouts, and explicit error handling. Be aware of Pipeline CPS restrictions when using complex Groovy objects and methods.",
    failures: [
      "A Groovy syntax error prevents the pipeline from starting.",
      "A node block waits indefinitely because no matching executor is available.",
      "A method or object is not compatible with Pipeline CPS execution.",
      "An exception is swallowed and a failed build is incorrectly reported as successful.",
      "A complex scripted pipeline becomes difficult to maintain.",
      "Unsafe script approval or sandbox restrictions block an operation."
    ],
    recovery: [
      "Inspect the pipeline error and correct the Groovy syntax.",
      "Verify node labels, executor capacity, and queue status.",
      "Simplify unsupported Groovy operations or use supported Pipeline steps.",
      "Ensure caught exceptions still produce the correct build result.",
      "Refactor repeated logic into tested shared-library methods.",
      "Follow the Jenkins script security approval process rather than disabling security controls."
    ],
    bestPractices: [
      "Use Scripted Pipeline only when its flexibility is justified.",
      "Keep Groovy logic small and readable.",
      "Use named stages for observability.",
      "Handle failures explicitly and preserve accurate build status.",
      "Use shared libraries for repeated logic.",
      "Avoid unsafe script approvals.",
      "Apply timeouts and restricted agents.",
      "Document complex branching and conditional behavior."
    ],
    exercise: "Create a Scripted Jenkinsfile that allocates a Java agent, runs Maven tests, and conditionally executes an integration-test stage based on a Boolean parameter. Add clear stages and failure handling. Verify that a failed test results in a failed build rather than a successful status."
  },

  "3|Pipeline Stages and Steps": {
    overview: "Pipeline stages organize a Jenkins workflow into visible delivery phases, while steps perform the actual operations within each phase. Typical stages include checkout, compile, test, quality analysis, package, image creation, and deployment. Clear stage boundaries make pipeline execution easier to understand and troubleshoot.",
    purpose: "Stages show where time is spent and where failures occur. Steps perform specific actions such as running Maven, executing shell commands, publishing test reports, or deploying a service. A well-organized pipeline helps engineers identify failed activities without investigating an entire unstructured script.",
    architecture: "A pipeline contains an ordered or conditional collection of stages. Each stage contains steps and may have its own agent, environment, options, and post conditions. Jenkins records stage status and execution timing. Parallel branches can execute independent stages concurrently.",
    workflow: [
      "Identify the major activities required to deliver the application.",
      "Create a stage for each meaningful delivery phase.",
      "Add the commands and Jenkins steps required within each stage.",
      "Define prerequisites between dependent activities.",
      "Publish reports and artifacts at the appropriate point.",
      "Use post actions for cleanup and notifications.",
      "Execute the pipeline and inspect stage-level results.",
      "Improve slow or frequently failing stages based on execution evidence."
    ],
    example: "A payment-service pipeline contains Checkout, Compile, Unit Tests, Quality Analysis, Package, and Image Build stages. If Unit Tests fail, the pipeline stops before packaging and image publication. The stage view identifies the failed test phase and allows the team to inspect the relevant console output.",
    commands: [
      "mvn clean compile — execute the compile activity.",
      "mvn test — execute unit tests.",
      "mvn verify — execute verification checks.",
      "mvn package — create the application package.",
      "docker build -t payment-service:local . — build a local test image.",
      "git rev-parse HEAD — identify the source commit.",
      "hostname — identify the executing agent.",
      "df -h — inspect available workspace storage."
    ],
    configuration: "Use descriptive stage names and keep steps focused. Define stage-specific agents when tool requirements differ. Configure timeouts, retry behavior for genuinely transient operations, test reports, artifact archival, and cleanup. Avoid hiding important work inside one large shell command.",
    failures: [
      "A stage fails because a command returns a non-zero exit code.",
      "A later stage runs without a required earlier artifact.",
      "A stage executes on an agent without the required tool.",
      "A report is missing because the configured path is incorrect.",
      "A cleanup step removes files needed by later stages.",
      "A long-running step blocks the pipeline indefinitely."
    ],
    recovery: [
      "Identify the failed stage and inspect its console output.",
      "Verify the exit code and reproduce the failed command.",
      "Check stage dependencies and artifact paths.",
      "Confirm the selected agent has the required tools.",
      "Review cleanup ordering and preserve required artifacts.",
      "Add appropriate timeouts and investigate the underlying slow operation."
    ],
    bestPractices: [
      "Use one clear responsibility per stage.",
      "Name stages according to the delivery activity.",
      "Separate build, test, security, packaging, and deployment.",
      "Publish reports even when later stages fail.",
      "Use stage-specific agents when appropriate.",
      "Avoid unnecessary retries for deterministic failures.",
      "Track stage duration and failure trends.",
      "Keep pipeline logs understandable and actionable."
    ],
    exercise: "Create a Jenkins pipeline with Checkout, Compile, Unit Test, Package, and Image Build stages. Intentionally introduce a test failure and verify that packaging does not run. Correct the test, rerun the pipeline, and inspect the stage results and generated artifacts."
  },

  "3|Parallel Execution": {
    overview: "Parallel execution allows independent Jenkins pipeline tasks to run simultaneously instead of waiting for each task to finish sequentially. It can reduce overall pipeline duration when sufficient agent executors and system resources are available.",
    purpose: "Parallel execution is useful when unit tests, static analysis, compatibility tests, or independent validation tasks do not depend on one another. Running these tasks concurrently can shorten feedback time and improve developer productivity without skipping required checks.",
    architecture: "Jenkins creates parallel branches inside a pipeline stage or supported parallel structure. Each branch is scheduled on an eligible executor and agent. The overall parallel stage waits for its branches according to the configured behavior. Shared workspaces, shared files, and shared external resources must be handled carefully.",
    workflow: [
      "Identify tasks that are independent of one another.",
      "Confirm that each task has the required tools and resources.",
      "Create separate parallel branches in the pipeline.",
      "Assign appropriate agents or labels.",
      "Prevent concurrent branches from overwriting shared files.",
      "Execute the parallel stage and inspect each branch result.",
      "Collect reports and combine results where necessary.",
      "Measure actual duration and resource usage."
    ],
    example: "A payment-service pipeline runs unit tests, dependency checks, and static analysis in parallel after checkout. Each task uses a suitable agent and produces its own report. The pipeline continues to packaging only after all required validation branches succeed.",
    commands: [
      "mvn test — execute the unit-test task.",
      "mvn dependency:tree — inspect dependency structure.",
      "mvn verify — execute the full verification lifecycle.",
      "docker --version — verify Docker availability on a worker.",
      "nproc — inspect available CPU count on Linux.",
      "free -h — inspect available memory.",
      "df -h — inspect disk capacity.",
      "uptime — inspect system load."
    ],
    configuration: "Use Declarative parallel stages or the supported Scripted parallel step. Allocate sufficient executors and select suitable agent labels. Give concurrent tasks isolated workspaces or output paths. Define fail-fast behavior only when it matches the team's requirements. Set timeouts and monitor resource contention.",
    failures: [
      "Parallel branches compete for CPU, memory, or disk resources.",
      "Two branches modify the same workspace files.",
      "A required branch fails while others continue consuming resources.",
      "The pipeline takes longer because agents must wait in queues.",
      "Reports overwrite one another because they share an output path.",
      "A task incorrectly depends on output from another parallel branch."
    ],
    recovery: [
      "Inspect branch-level logs and identify the actual failure.",
      "Reduce concurrency or add suitable agent capacity.",
      "Use isolated workspaces and unique report directories.",
      "Move dependent tasks into sequential stages.",
      "Configure appropriate fail-fast behavior and timeouts.",
      "Measure queue wait time and resource utilization before increasing parallelism."
    ],
    bestPractices: [
      "Parallelize only independent tasks.",
      "Use isolated workspaces and output paths.",
      "Match concurrency to actual agent capacity.",
      "Keep required quality checks mandatory.",
      "Collect branch-specific reports.",
      "Avoid uncontrolled deployment operations in parallel.",
      "Monitor resource usage and queue time.",
      "Measure whether parallel execution actually reduces delivery time."
    ],
    exercise: "Create a Jenkins pipeline that runs unit tests, dependency analysis, and a separate validation command in parallel. Use distinct stages or branches and isolated output directories. Introduce a controlled failure in one branch and observe how Jenkins reports the results and handles the overall pipeline status."
  },

  "3|Shared Libraries": {
    overview: "Jenkins Shared Libraries provide reusable pipeline code that can be shared across multiple Jenkinsfiles and repositories. They help teams centralize common build, test, notification, deployment, and security logic instead of copying the same implementation into every application pipeline.",
    purpose: "Shared libraries reduce duplication and make CI/CD behavior more consistent across teams. A common Java build function can be maintained once and reused by payment, customer, and order services. Updates can improve many pipelines, but library changes must be reviewed because they can affect multiple applications.",
    architecture: "A shared library is normally maintained in a Git repository and loaded by Jenkins through global or folder-level configuration. Common library structures include vars for global pipeline steps, src for reusable Groovy classes, and resources for supporting files. Jenkinsfiles invoke library functions using the configured library name.",
    workflow: [
      "Create a dedicated Git repository for the shared library.",
      "Add vars, src, and resources directories as required.",
      "Implement a small reusable pipeline function.",
      "Commit and push the library to source control.",
      "Configure the library in Jenkins global or folder settings.",
      "Load the library from a Jenkinsfile.",
      "Execute a test pipeline that calls the shared function.",
      "Version and review library changes before broader adoption."
    ],
    example: "Multiple DevMavox services use the same Maven validation stages. A shared library provides a standard function that executes compilation, tests, and report publication. Each service Jenkinsfile calls the shared function, ensuring consistent CI behavior while allowing application-specific configuration.",
    commands: [
      "git init — initialize the shared-library repository.",
      "mkdir -p vars src resources — create the common library structure on Linux or Git Bash.",
      "git add . — stage the library files.",
      "git commit -m \"feat: add reusable Maven pipeline step\" — commit the library.",
      "git push -u origin main — publish the library.",
      "git log --oneline — inspect library version history.",
      "mvn clean verify — validate a Java application invoked by the library.",
      "git tag -a v1.0.0 -m \"Shared library 1.0.0\" — mark a library version."
    ],
    configuration: "Configure a trusted or appropriately sandboxed shared library in Jenkins. Define its repository URL, default version, retrieval credentials, and version-selection policy. Prefer immutable tags or reviewed commits for production use. Keep library functions small, documented, tested, and compatible with supported Jenkins and plugin versions.",
    failures: [
      "Jenkins cannot retrieve the library because repository credentials are invalid.",
      "The configured library name does not match the Jenkinsfile annotation.",
      "A requested library version does not exist.",
      "A library function is unavailable because its file or method name is incorrect.",
      "A library update breaks several application pipelines.",
      "Groovy or Pipeline CPS behavior causes runtime errors."
    ],
    recovery: [
      "Verify repository access and configured retrieval credentials.",
      "Compare the Jenkinsfile library name with the configured library name.",
      "Confirm that the requested branch, tag, or commit exists.",
      "Inspect the library directory structure and exported function names.",
      "Roll back to a previously tested library version when necessary.",
      "Test changes in a representative pipeline before broad rollout."
    ],
    bestPractices: [
      "Use shared libraries for genuinely repeated pipeline behavior.",
      "Keep reusable functions small and well documented.",
      "Version libraries and review changes.",
      "Avoid unreviewed updates to production library references.",
      "Test library changes against representative application pipelines.",
      "Apply least privilege to library retrieval credentials.",
      "Keep application-specific decisions outside generic helpers where possible.",
      "Maintain a rollback version for critical shared libraries."
    ],
    exercise: "Create a shared-library repository with a vars/mavenBuild.groovy function that runs Maven validation. Configure it in Jenkins and call it from a test application's Jenkinsfile. Publish version v1.0.0, execute the pipeline, and verify that the shared function is loaded successfully."
  },

  "3|Artifacts and Reports": {
    overview: "Jenkins artifacts are files generated during a build that need to be retained or transferred, such as JAR files, test packages, deployment bundles, and diagnostic outputs. Reports present build evidence such as unit-test results, coverage, static analysis, and security findings.",
    purpose: "Artifacts allow teams to preserve and promote build outputs without rebuilding source code independently in each environment. Reports provide evidence that validation occurred and help developers understand failures. Production delivery should identify the exact artifact created from the approved source commit.",
    architecture: "Build steps create files in the agent workspace. Jenkins can archive selected files as build artifacts and publish supported test reports. External repositories such as Nexus or cloud artifact stores provide durable distribution and retention. Artifact metadata should identify the source commit, version, and digest.",
    workflow: [
      "Run the application build and test stages.",
      "Identify the exact output files and report locations.",
      "Publish test results to Jenkins.",
      "Archive required build artifacts.",
      "Publish release artifacts to the approved repository.",
      "Record version and source commit metadata.",
      "Verify artifact integrity and accessibility.",
      "Promote the same approved artifact through later environments."
    ],
    example: "A payment-service Maven build produces target/payment-service.jar and JUnit XML test reports. Jenkins publishes the test results and archives the JAR. A release pipeline publishes the versioned artifact to Nexus or builds a container image from it. The deployment stage uses the approved artifact rather than compiling a different version.",
    commands: [
      "mvn clean verify — build and execute tests.",
      "ls -lh target/ — inspect generated Maven outputs on Linux.",
      "Get-ChildItem .\target — inspect generated outputs in PowerShell.",
      "find target -name '*.jar' -type f — locate JAR files on Linux.",
      "sha256sum target/payment-service.jar — calculate a SHA-256 digest on Linux.",
      "Get-FileHash .\target\payment-service.jar -Algorithm SHA256 — calculate a SHA-256 digest in PowerShell.",
      "jar tf target/payment-service.jar — inspect JAR contents.",
      "git rev-parse HEAD — record the source commit."
    ],
    configuration: "Use archiveArtifacts for selected build outputs and junit for JUnit XML reports. Configure report paths relative to the workspace and fail appropriately when required reports are missing. Set artifact retention and external repository publishing policies. Record the source commit and artifact digest with release metadata.",
    failures: [
      "Jenkins cannot find an artifact because the configured path is incorrect.",
      "The build produces no JAR because packaging failed.",
      "Test reports are missing because the test command did not generate XML output.",
      "Artifacts are archived from the wrong branch or workspace.",
      "Storage fills because old artifacts are retained indefinitely.",
      "The deployed artifact cannot be matched to its source commit."
    ],
    recovery: [
      "Inspect the workspace and confirm the actual artifact path.",
      "Review the build logs and verify that packaging completed.",
      "Check test report configuration and output directories.",
      "Confirm that the correct agent and workspace produced the files.",
      "Apply retention policies and move long-term artifacts to approved storage.",
      "Record the artifact digest and source commit before promotion."
    ],
    bestPractices: [
      "Publish only required and validated outputs.",
      "Publish test reports for every relevant build.",
      "Use versioned artifact names.",
      "Calculate and preserve artifact digests.",
      "Use external artifact repositories for durable release storage.",
      "Avoid rebuilding separately for each environment.",
      "Configure retention according to operational requirements.",
      "Preserve source-to-artifact traceability."
    ],
    exercise: "Create a Maven pipeline that runs mvn clean verify, publishes JUnit XML results, and archives the generated JAR. Calculate the JAR SHA-256 digest and record the source commit hash. Verify that the archived artifact can be downloaded and inspected."
  },

  "3|Pipeline Security": {
    overview: "Jenkins pipeline security protects pipeline definitions, credentials, build agents, plugins, controller access, and deployment permissions. Pipeline code can execute shell commands and access external systems, so untrusted changes and overly privileged credentials can create serious security risks.",
    purpose: "Secure pipelines reduce the chance that a malicious or accidental code change can expose credentials, compromise build infrastructure, or deploy unauthorized software. Security controls must protect both Jenkins itself and the systems reached by its agents.",
    architecture: "Jenkins security includes authentication, authorization, credentials storage, agent isolation, plugin governance, script security, network restrictions, and audit visibility. Pipeline execution uses agent identities and credentials. Repository branch protection controls which pipeline changes can be merged and executed in privileged contexts.",
    workflow: [
      "Identify users, services, agents, and systems that interact with Jenkins.",
      "Configure an approved authentication provider and authorization strategy.",
      "Restrict administrative and job-configuration permissions.",
      "Store credentials in protected credential stores.",
      "Separate untrusted build agents from privileged deployment agents.",
      "Review plugins, pipeline libraries, and third-party actions or tools.",
      "Restrict production deployment permissions and require approval.",
      "Monitor access, build activity, and security events."
    ],
    example: "A pull request from an external contributor must not receive production deployment credentials. Jenkins executes its tests on an isolated agent without production access. Only an approved release pipeline can use the restricted deployment identity after required reviews and security checks pass.",
    commands: [
      "sudo systemctl status jenkins — inspect Jenkins service health.",
      "sudo journalctl -u jenkins -n 150 --no-pager — inspect service logs.",
      "find /var/lib/jenkins -maxdepth 2 -type f -name 'config.xml' — locate configuration files for an authorized audit.",
      "ss -lntp — inspect listening ports.",
      "sudo ufw status verbose — inspect UFW firewall policy where used.",
      "git log --oneline -- Jenkinsfile — review pipeline-definition changes.",
      "git diff --check — detect malformed or accidental changes.",
      "aws sts get-caller-identity — verify the AWS identity used by a deployment agent."
    ],
    configuration: "Use an approved authentication realm and role-based authorization. Restrict script approvals and administrative access. Store secrets in Jenkins Credentials and bind them only to the steps that need them. Use isolated agents, least-privilege service accounts, protected branches, HTTPS, controlled plugin updates, and production deployment approvals.",
    failures: [
      "A pipeline exposes a secret through console output or command tracing.",
      "A build agent has broad production permissions.",
      "An untrusted pull request can execute privileged deployment steps.",
      "An outdated plugin introduces a security vulnerability.",
      "Excessive users have administrator permissions.",
      "A deployment pipeline can bypass required approval controls."
    ],
    recovery: [
      "Immediately revoke and rotate any exposed credential.",
      "Restrict agent permissions and investigate affected systems.",
      "Separate untrusted validation jobs from privileged deployment workflows.",
      "Update or disable vulnerable plugins through the approved process.",
      "Review user roles and remove unnecessary administrative access.",
      "Restore deployment approval gates and investigate unauthorized execution."
    ],
    bestPractices: [
      "Use least privilege for users, agents, and credentials.",
      "Never expose secrets in logs or source code.",
      "Separate untrusted pull request builds from production deployment.",
      "Use protected branches and mandatory reviews.",
      "Restrict administrative access.",
      "Maintain supported Jenkins and plugin versions.",
      "Use isolated agents and controlled network access.",
      "Audit credential usage and deployment activity."
    ],
    exercise: "Create a test Jenkins pipeline with a non-production credential. Bind it only to the required deployment step and verify that its value is not printed. Create separate labels for untrusted test agents and deployment agents. Document which permissions each identity needs and how production approval would be enforced."
  },

  "3|Agent Troubleshooting": {
    overview: "Jenkins agent troubleshooting identifies problems that prevent a worker node from connecting, accepting jobs, executing commands, or returning build results. Common causes include Java incompatibility, network failures, incorrect launch configuration, insufficient permissions, missing tools, resource exhaustion, and workspace problems.",
    purpose: "Agent failures reduce CI capacity and can block development and releases. Engineers must distinguish controller problems from agent problems and collect evidence from both systems before changing configuration. Restoring the correct agent is often safer than restarting the entire Jenkins controller.",
    architecture: "The controller schedules work based on agent availability, labels, and executor capacity. An agent connects through its configured launch method and executes jobs using its service identity. The agent has a workspace, installed tools, network access, and resource limits. Build logs and agent connection logs provide evidence about failures.",
    workflow: [
      "Identify the failed build and the agent assigned to it.",
      "Inspect the agent's online status and connection log.",
      "Verify DNS, network reachability, and the configured connection method.",
      "Check the Java runtime and agent process.",
      "Verify filesystem permissions, disk space, and memory.",
      "Confirm that required build tools are installed.",
      "Correct the root cause and reconnect the agent.",
      "Run a small diagnostic job before resuming normal workload."
    ],
    example: "A payment-service build remains queued because the java-agent is offline. The engineer checks the agent connection log and finds that the worker cannot resolve the Jenkins controller hostname. DNS configuration is corrected, the agent reconnects, and a simple Java version job confirms that the worker can execute builds again.",
    commands: [
      "java -version — verify Java on the agent.",
      "hostname — identify the worker.",
      "whoami — identify the build execution user.",
      "df -h — inspect disk usage.",
      "free -h — inspect memory.",
      "uptime — inspect system load.",
      "ps -ef | grep -E 'agent.jar|remoting' — inspect the agent process on Linux.",
      "getent hosts jenkins.example.com — test hostname resolution on Linux.",
      "nc -zv jenkins.example.com 50000 — test the configured agent communication port where applicable.",
      "sudo journalctl -u jenkins-agent -n 100 --no-pager — inspect a systemd-managed agent service."
    ],
    configuration: "Verify the agent name, remote root, labels, executors, launch method, service identity, and controller connection details. Ensure the worker uses a supported Java runtime and has the required tools. Configure firewall access only for the required communication paths. Monitor disk, CPU, memory, and agent connection status.",
    failures: [
      "The agent is offline because the Java runtime is missing or incompatible.",
      "DNS or firewall rules prevent the worker from reaching the controller.",
      "The agent process exits because of permission or workspace errors.",
      "The worker lacks Maven, Docker, or kubectl.",
      "Disk exhaustion prevents workspace creation.",
      "The agent is online but jobs remain queued because labels do not match."
    ],
    recovery: [
      "Inspect agent connection logs and verify Java compatibility.",
      "Test DNS resolution and required network ports.",
      "Check the service identity and workspace ownership.",
      "Install the required tools using approved system configuration.",
      "Free or expand workspace storage according to retention policy.",
      "Correct agent labels and verify executor availability.",
      "Reconnect the agent and run a diagnostic job."
    ],
    bestPractices: [
      "Monitor agent availability and connection failures.",
      "Use dedicated service identities.",
      "Maintain consistent tool versions on workers.",
      "Keep workspace storage under control.",
      "Use labels that accurately describe agent capabilities.",
      "Avoid excessive executor counts on small machines.",
      "Isolate privileged agents from untrusted builds.",
      "Maintain a documented agent replacement and recovery process."
    ],
    exercise: "Create a test Jenkins agent and execute a diagnostic pipeline that prints hostname, Java version, current user, and disk capacity. Temporarily make a harmless test configuration error, such as using a nonexistent label, and inspect the queue reason. Correct the label and verify successful execution."
  },

  "3|Production Hands-on Lab": {
    overview: "This production hands-on lab builds a complete Jenkins CI pipeline for a sample Java payment-service. It combines Jenkins installation, controller and agent architecture, credentials, plugins, GitHub webhook integration, Jenkinsfile development, parallel validation, shared libraries, artifact publication, and security controls.",
    purpose: "Production DevOps engineers must understand how individual Jenkins features work together to deliver software reliably. This lab demonstrates how a source-code change becomes a tested artifact through a secure, observable, and repeatable pipeline.",
    architecture: "The lab uses a Jenkins controller for orchestration and dedicated Java and Docker agents for execution. GitHub stores the application and Jenkinsfile. A webhook triggers the pipeline. Jenkins credentials provide controlled repository access. The pipeline runs Maven tests, parallel validation tasks, and Docker image creation. Reports and artifacts are archived, while production deployment permissions remain restricted.",
    workflow: [
      "Install Jenkins on a supported Linux test server.",
      "Complete setup and configure administrator access.",
      "Create Java and Docker execution agents with appropriate labels.",
      "Install and validate the required Git, Pipeline, and credentials plugins.",
      "Create a GitHub payment-service repository.",
      "Add a Jenkinsfile with Checkout, Build, Test, and Package stages.",
      "Configure a webhook to trigger the pipeline.",
      "Store repository or registry credentials securely.",
      "Run independent validation tasks in parallel where appropriate.",
      "Publish test reports and archive the generated JAR.",
      "Create a reusable shared-library function for common build logic.",
      "Apply branch review, agent isolation, and deployment security controls."
    ],
    example: "A developer pushes a payment-service change to a GitHub feature branch. The webhook starts Jenkins. The controller schedules the pipeline on the Java agent. Maven compiles the application and runs tests. Independent quality checks execute in parallel. Jenkins publishes reports and archives the JAR. A Docker agent can create a versioned image after successful validation. The pipeline records the source commit and build result without exposing credentials.",
    commands: [
      "java -version — verify the Java runtime.",
      "sudo systemctl status jenkins — inspect the Jenkins controller.",
      "git clone <repository-url> — clone the payment-service repository.",
      "git switch -c feature/jenkins-ci — create a pipeline development branch.",
      "mvn clean verify — build and test the Java application.",
      "docker --version — verify Docker on the image-build agent.",
      "hostname — identify the execution node.",
      "df -h — inspect agent storage.",
      "git rev-parse HEAD — record the source commit.",
      "sha256sum target/*.jar — calculate artifact digests on Linux.",
      "git log --oneline -- Jenkinsfile — inspect pipeline history.",
      "sudo journalctl -u jenkins -n 100 --no-pager — inspect Jenkins service logs."
    ],
    configuration: "Configure a supported Jenkins controller and persistent JENKINS_HOME. Register isolated agents with java and docker labels. Store credentials in Jenkins Credentials and use scoped bindings. Configure the GitHub webhook and a Jenkinsfile loaded from SCM. Add timeouts, test reporting, artifact archival, and build retention. Protect production deployment credentials and require appropriate review and approval.",
    failures: [
      "Jenkins fails to start because the Java version is incompatible.",
      "The GitHub webhook does not trigger the pipeline.",
      "The controller cannot schedule the job because the requested agent is offline.",
      "Maven tests fail because the worker has an incorrect JDK or dependency configuration.",
      "A credential binding is unavailable or authentication fails.",
      "Parallel tasks overwrite each other's workspace files.",
      "The artifact is not archived because its path is incorrect.",
      "An untrusted change receives access to privileged deployment credentials."
    ],
    recovery: [
      "Inspect controller logs and verify the supported Java runtime.",
      "Review GitHub webhook delivery history and endpoint connectivity.",
      "Check agent status, labels, executors, and connection logs.",
      "Reproduce Maven failures on the same agent and inspect dependency output.",
      "Verify credential identifiers and permissions without displaying secret values.",
      "Isolate parallel task workspaces and output directories.",
      "Inspect the actual workspace and correct artifact publishing paths.",
      "Restrict privileged credentials and separate untrusted builds from deployment jobs."
    ],
    bestPractices: [
      "Keep Jenkins controller focused on orchestration.",
      "Use dedicated and isolated execution agents.",
      "Store Jenkinsfiles and shared libraries in source control.",
      "Use webhooks for event-driven CI.",
      "Protect credentials and apply least privilege.",
      "Keep plugin versions controlled and reviewed.",
      "Publish test reports and immutable build artifacts.",
      "Use parallel execution only for independent tasks.",
      "Require review and approval for production changes.",
      "Monitor agent health, queue length, build duration, and controller resources.",
      "Maintain backups and test recovery procedures."
    ],
    exercise: "Build the complete payment-service Jenkins CI workflow in a test environment. Configure a controller and Java agent, connect a GitHub repository through a webhook, and create a Jenkinsfile with Checkout, Build, Test, and Package stages. Add a parallel validation stage, bind a non-production credential securely, publish JUnit reports, and archive the JAR. Record the build number, source commit, agent name, test result, artifact digest, and any troubleshooting steps."
  }
};
