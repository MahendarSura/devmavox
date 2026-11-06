import type { GlossaryTerm } from "./glossary-data";

export const cicdGlossaryDetails: Record<string, Partial<GlossaryTerm>> = {
  "CI/CD Pipeline": {
    purpose: "A CI/CD pipeline automates the journey from a source-code change to a tested, packaged and potentially deployed release. Continuous Integration validates frequent changes, while Continuous Delivery keeps software ready for release and Continuous Deployment automatically releases qualifying changes.",
    project: "A developer opens a pull request for a Java application. Jenkins checks out the commit, runs Maven tests, performs code and dependency checks, builds a Docker image, publishes the image to a registry and deploys the approved version to a Kubernetes test environment.",
    workflow: [
      "A developer pushes a commit or opens a pull request in the source-code repository.",
      "A webhook or repository integration starts the pipeline and identifies the branch, commit and event.",
      "The pipeline checks out the exact source revision and prepares the required build environment.",
      "Build and dependency-resolution steps compile the application and produce testable output.",
      "Unit tests, integration tests, code-quality checks and security scans validate the change.",
      "The pipeline packages the application and publishes versioned artifacts or container images.",
      "Deployment stages release the approved version to the target environment and perform health checks.",
      "Pipeline results, logs and release metadata are retained for investigation and auditing."
    ],
    commands: [
      "git status",
      "git log -1 --oneline",
      "mvn clean verify",
      "docker build -t myapp:1.0.0 .",
      "docker push registry.example.com/myapp:1.0.0"
    ],
    mistakes: [
      "Running deployment before required tests and quality checks have passed.",
      "Using the latest image tag instead of an immutable version or commit-based tag.",
      "Keeping passwords, tokens or cloud credentials directly in pipeline files.",
      "Allowing two deployments to modify the same environment simultaneously without release controls.",
      "Ignoring failed stages or treating a green build as proof that the production application is healthy.",
      "Using different build dependencies or tool versions across developer and CI environments."
    ],
    configuration: [
      "Define explicit stages such as Checkout, Build, Test, Scan, Package, Publish and Deploy.",
      "Use branch and pull-request conditions to control which stages execute.",
      "Store credentials in the CI platform credential store and reference them securely.",
      "Configure test reports, artifact retention, timeouts and failure notifications.",
      "Use immutable artifact versions and pass the same tested artifact between environments."
    ],
    troubleshooting: [
      "If a pipeline does not start, inspect webhook delivery, repository permissions, event filters and branch conditions.",
      "If checkout fails, verify the repository URL, credentials, network access and requested revision.",
      "If a build fails, inspect the first meaningful compiler or dependency error rather than only the final pipeline status.",
      "If tests fail intermittently, inspect test reports, shared test data, timing assumptions and external dependencies.",
      "If publishing fails, verify registry availability, authentication, repository permissions and artifact coordinates.",
      "If deployment fails, inspect deployment events, application logs, image references, configuration and readiness checks."
    ],
    bestPractices: [
      "Keep pipeline definitions version-controlled with the application.",
      "Build once and promote the same immutable artifact through environments.",
      "Make stages independently understandable and publish useful failure reports.",
      "Use parallel execution only where dependencies and resource limits allow it.",
      "Protect production deployment with approvals, environment restrictions and rollback procedures.",
      "Measure pipeline duration, failure rate, deployment frequency and recovery time."
    ],
    securityConsiderations: [
      "Use short-lived credentials and least-privilege service identities wherever supported.",
      "Never print secrets in shell output, test reports or build logs.",
      "Pin trusted third-party actions, plugins and build dependencies to controlled versions.",
      "Scan source code, dependencies, container images and generated artifacts.",
      "Restrict who can change production pipeline definitions and deployment permissions.",
      "Protect artifact repositories and retain provenance linking releases to source commits."
    ]
  },

  "Jenkins": {
    purpose: "Jenkins is an extensible automation server that executes jobs and pipelines through a controller and connected agents. It coordinates build, test, packaging and deployment activities by using pipeline definitions, plugins, credentials and integrations with development tools.",
    project: "A team runs Jenkins on a dedicated controller and connects Linux agents for Java builds. A Jenkinsfile stored in Git defines checkout, Maven verification, image creation, image publishing and Kubernetes deployment stages.",
    workflow: [
      "A developer commits a Jenkinsfile and application changes to a source repository.",
      "A webhook or scheduled trigger starts the configured Jenkins job.",
      "The controller loads the pipeline definition and determines the required execution agent.",
      "An available agent checks out source code and executes the pipeline steps.",
      "Jenkins records stage results, logs, test reports and generated artifacts.",
      "The pipeline publishes approved outputs and may trigger a deployment stage.",
      "The controller reports the final result and retains build history according to configured policies."
    ],
    commands: [
      "java -version",
      "systemctl status jenkins",
      "sudo journalctl -u jenkins -n 100 --no-pager",
      "sudo systemctl restart jenkins",
      "curl -I http://localhost:8080/login"
    ],
    mistakes: [
      "Running every build directly on the controller instead of using appropriate agents.",
      "Installing unverified plugins or updating plugins without compatibility checks.",
      "Giving Jenkins administrator permissions on cloud accounts and deployment targets unnecessarily.",
      "Storing credentials in Jenkinsfiles or exposing them through shell tracing.",
      "Ignoring controller disk usage, build retention and workspace cleanup.",
      "Treating Jenkins restart as the first response to every failed job."
    ],
    configuration: [
      "Configure controller security, user authentication, authorization and the Jenkins URL.",
      "Define agent labels that represent operating systems, tools or workload capabilities.",
      "Install only required plugins and manage plugin versions through a controlled update process.",
      "Configure credentials using the Jenkins Credentials system.",
      "Use a Jenkinsfile in source control to define repeatable pipeline behavior.",
      "Set build retention, timeout, concurrency and log-management policies."
    ],
    troubleshooting: [
      "If the Jenkins UI is unavailable, inspect service status, Java compatibility, application logs, memory and port availability.",
      "If a job remains queued, inspect executor availability, agent labels, node status and queue restrictions.",
      "If a plugin prevents startup, inspect startup logs and recent plugin changes before modifying the installation.",
      "If builds fail after an update, compare Jenkins, Java and plugin versions with the last known working configuration.",
      "If disk usage grows, identify large workspaces, archived artifacts, logs and old build records.",
      "If credentials fail, verify credential scope, identifier, permissions and target-system access."
    ],
    bestPractices: [
      "Use pipeline-as-code and review Jenkinsfile changes through pull requests.",
      "Separate controller responsibilities from build execution workloads.",
      "Keep Jenkins, Java and plugins patched through tested maintenance windows.",
      "Monitor queue time, executor utilization, controller health and build failure trends.",
      "Back up Jenkins configuration and required job metadata using a tested recovery procedure.",
      "Use folder-level permissions and separate credentials for different environments."
    ],
    securityConsiderations: [
      "Disable anonymous administrative access and enforce strong authentication.",
      "Use least-privilege permissions for users, agents and credentials.",
      "Restrict agent-to-controller communication and isolate untrusted build workloads.",
      "Treat pull-request pipeline code as untrusted when it comes from external contributors.",
      "Protect the Jenkins home directory, credential store, backup files and encryption keys.",
      "Review plugin security advisories and remove unused plugins."
    ]
  },

  "Jenkins Agent": {
    purpose: "A Jenkins agent is an execution worker that runs build and pipeline tasks assigned by the Jenkins controller. Agents provide the CPU, memory, operating system, workspace and installed tools required by a particular workload without forcing all builds to run on the controller.",
    project: "A team uses separate Linux agents for Maven builds and Docker image creation. A pipeline selects an agent with the required label, runs the build there and returns the test reports and artifacts to the configured storage location.",
    workflow: [
      "An administrator registers an agent and configures its connection method, remote root and labels.",
      "The agent connects to the controller and becomes available for scheduling.",
      "A pipeline requests an agent using a matching label or execution requirement.",
      "Jenkins allocates an executor and creates or reuses a workspace on that agent.",
      "Pipeline steps execute using the tools and permissions available on the agent.",
      "Build outputs and reports are archived or published to external repositories.",
      "The executor becomes available for another task after the build completes."
    ],
    commands: [
      "java -version",
      "hostname",
      "df -h",
      "free -h",
      "docker version",
      "sudo journalctl -u jenkins-agent -n 100 --no-pager"
    ],
    mistakes: [
      "Assigning a pipeline to a label that no connected agent provides.",
      "Assuming that tools installed on the controller are automatically available on agents.",
      "Running multiple memory-intensive builds on an undersized agent.",
      "Using a shared workspace for jobs that can overwrite each other's files.",
      "Allowing untrusted jobs to access privileged Docker sockets or host credentials.",
      "Ignoring disconnected agents, stale workspaces and disk exhaustion."
    ],
    configuration: [
      "Assign meaningful labels such as linux, maven, docker or deployment.",
      "Configure the agent remote root with sufficient disk capacity and appropriate ownership.",
      "Install and maintain the required JDK, Maven, Docker client and other build tools.",
      "Choose an appropriate connection method and secure agent communication.",
      "Set executor counts according to CPU, memory, disk and workload requirements.",
      "Use ephemeral agents for workloads that benefit from clean, disposable environments."
    ],
    troubleshooting: [
      "If an agent is offline, inspect its process, network connectivity, controller reachability and authentication.",
      "If a job cannot find an agent, compare the requested label with the labels configured on connected nodes.",
      "If a build reports a missing executable, check the agent PATH and installed tool versions.",
      "If builds fail with permission errors, inspect workspace ownership, filesystem permissions and execution identity.",
      "If builds become slow, inspect CPU, memory, disk I/O, network throughput and executor contention.",
      "If an agent repeatedly disconnects, inspect network interruptions, Java compatibility and agent logs."
    ],
    bestPractices: [
      "Use dedicated agent pools for different workload types and trust levels.",
      "Keep agent images reproducible and version-controlled.",
      "Use ephemeral agents for isolated and repeatable builds when practical.",
      "Clean workspaces safely and avoid sharing sensitive files across jobs.",
      "Set executor counts based on measured resource consumption.",
      "Monitor online status, queue delay, build duration and agent capacity."
    ],
    securityConsiderations: [
      "Run agents with dedicated non-root identities wherever possible.",
      "Do not expose host Docker sockets to untrusted jobs.",
      "Restrict agent network access to only required services.",
      "Separate trusted release agents from untrusted pull-request agents.",
      "Use short-lived credentials and remove sensitive workspace files after execution.",
      "Secure agent connection secrets and protect controller-agent communication."
    ]
  },

  "Pipeline Stage": {
    purpose: "A pipeline stage is a named logical section of a CI/CD pipeline that groups related steps into an understandable execution phase. Stages make pipeline progress visible and allow teams to apply conditions, parallel execution, timeouts and approval controls at meaningful points.",
    project: "A Jenkins pipeline defines Checkout, Build, Unit Test, Security Scan, Package and Deploy stages. When the security scan fails, the deployment stage is skipped and the failure report identifies the stage that blocked release.",
    workflow: [
      "The pipeline starts and evaluates its configured stage sequence.",
      "A stage begins when its dependencies and execution conditions are satisfied.",
      "The stage executes its individual steps on the selected agent.",
      "The stage records success, failure, skipped or unstable status as applicable.",
      "The pipeline proceeds to dependent stages or stops according to its failure-handling rules.",
      "Reports and logs help engineers identify which stage requires investigation."
    ],
    commands: [
      "grep -n 'stage(' Jenkinsfile",
      "git diff -- Jenkinsfile",
      "mvn test",
      "docker build -t myapp:1.0.0 ."
    ],
    mistakes: [
      "Creating one enormous stage containing unrelated operations.",
      "Using unclear stage names that hide the actual work being performed.",
      "Allowing deployment stages to run even when required validation stages fail.",
      "Repeating expensive dependency downloads in every stage unnecessarily.",
      "Running dependent operations in parallel when they require outputs from earlier stages.",
      "Placing secrets in stage commands or printing them in stage logs."
    ],
    configuration: [
      "Use stage names that clearly communicate purpose, such as Build, Test, Scan and Deploy.",
      "Define stage-level agents when different operating systems or tools are required.",
      "Apply timeouts and retry rules only where they are operationally appropriate.",
      "Use parallel branches for independent tests or scans.",
      "Add manual approval and environment conditions before sensitive production stages.",
      "Publish test and scan reports so stage results contain actionable evidence."
    ],
    troubleshooting: [
      "If a stage is skipped, inspect its when conditions, branch filters and upstream stage results.",
      "If a stage times out, inspect the slowest command and available CPU, memory and network resources.",
      "If parallel branches fail, inspect each branch's log independently.",
      "If a stage cannot access an earlier output, verify artifact transfer and workspace behavior.",
      "If deployment executes unexpectedly, review stage conditions and pipeline control flow.",
      "If stage logs are incomplete, inspect log retention and report publication configuration."
    ],
    bestPractices: [
      "Keep stages focused and independently understandable.",
      "Fail early on compilation, testing and security validation errors.",
      "Reuse immutable artifacts rather than rebuilding different outputs for each stage.",
      "Use parallelism for independent checks while preserving required dependencies.",
      "Publish test results and actionable diagnostics for every important stage.",
      "Keep production approvals explicit and auditable."
    ],
    securityConsiderations: [
      "Limit production credentials to deployment stages that actually require them.",
      "Do not expose secrets in stage names, environment dumps or command output.",
      "Protect approval stages against unauthorized users.",
      "Run untrusted code in isolated execution environments.",
      "Validate artifacts and image provenance before allowing deployment.",
      "Audit who changed stage conditions and production release controls."
    ]
  },

  "Build": {
    purpose: "A software build transforms source code and its dependencies into an executable or distributable output. Depending on the technology, the process may compile code, resolve dependencies, run tests, package files and generate metadata needed for deployment.",
    project: "A Java application uses Maven to compile source files, execute unit tests and package a versioned JAR. Jenkins publishes the JAR to Nexus so a deployment job can retrieve the exact build.",
    workflow: [
      "The build system checks out a specific source-code revision.",
      "The build tool reads project configuration and identifies required dependencies.",
      "Dependencies are resolved from configured repositories or caches.",
      "Source files are compiled or assembled into application output.",
      "Automated tests and validation checks run against the generated output.",
      "The build packages the result and records version and build metadata.",
      "The resulting artifact is published or passed to the next pipeline stage."
    ],
    commands: [
      "mvn clean",
      "mvn compile",
      "mvn test",
      "mvn package",
      "mvn verify"
    ],
    mistakes: [
      "Building from an unknown or uncommitted source revision.",
      "Ignoring failed tests and publishing the build anyway.",
      "Using uncontrolled dependency versions that make builds inconsistent.",
      "Assuming a successful compilation proves that an application works correctly.",
      "Rebuilding separately in each environment and producing different binaries.",
      "Ignoring build logs and dependency-resolution warnings."
    ],
    configuration: [
      "Declare project dependencies and plugin versions in the build configuration.",
      "Use controlled repositories and dependency version policies.",
      "Configure test execution, compiler settings and package formats.",
      "Set build profiles carefully for development, test and production differences.",
      "Record source commit, build number and artifact version.",
      "Configure reproducible build inputs and appropriate dependency caching."
    ],
    troubleshooting: [
      "If dependency resolution fails, inspect repository URLs, proxy configuration and credentials.",
      "If compilation fails, identify the first compiler error and check source compatibility and JDK version.",
      "If tests fail, inspect test reports and reproduce the failing test with the same inputs.",
      "If builds differ between machines, compare tool versions, environment variables and dependency resolution.",
      "If packaging fails, inspect plugin configuration, file permissions and disk space.",
      "If a build is unexpectedly slow, inspect dependency downloads, test duration and cache effectiveness."
    ],
    bestPractices: [
      "Build from a known commit and record its identifier.",
      "Use consistent toolchains and dependency versions.",
      "Run automated tests before publishing artifacts.",
      "Build once and promote the same artifact through environments.",
      "Keep dependency caches separate from authoritative artifact storage.",
      "Retain build logs and metadata for release traceability."
    ],
    securityConsiderations: [
      "Use trusted dependency repositories and verify dependency integrity.",
      "Scan dependencies for known vulnerabilities and license-policy violations.",
      "Avoid embedding credentials or environment-specific secrets in build outputs.",
      "Restrict access to build environments and artifact publishing credentials.",
      "Protect build scripts because they execute code with pipeline permissions.",
      "Generate and retain provenance information for important releases."
    ]
  },

  "Artifact": {
    purpose: "A build artifact is a versioned output produced by a build process, such as a JAR, WAR, ZIP package or container image. It is the deployable result that can be stored, scanned, promoted and retrieved without depending on a developer's local workspace.",
    project: "Jenkins builds version 2.4.1 of a Java service, publishes the JAR to Nexus and records the source commit. The release pipeline downloads that exact JAR for deployment instead of rebuilding the application.",
    workflow: [
      "The build process produces a package or image from a known source revision.",
      "The pipeline assigns a unique version or immutable identifier.",
      "Automated tests and security checks validate the artifact.",
      "The artifact is uploaded to a repository or container registry.",
      "Repository metadata records coordinates, version and associated checksums.",
      "Deployment systems retrieve the approved artifact for the target environment.",
      "Release records connect the deployed artifact to its source and build history."
    ],
    commands: [
      "mvn package",
      "ls -lh target/",
      "sha256sum target/myapp.jar",
      "docker image ls",
      "docker inspect myapp:1.0.0"
    ],
    mistakes: [
      "Overwriting an existing release version with different binary content.",
      "Using mutable latest tags as the only production artifact identifier.",
      "Rebuilding the application for each environment instead of promoting one artifact.",
      "Failing to retain checksums and source revision metadata.",
      "Publishing artifacts before required tests and security scans complete.",
      "Allowing uncontrolled deletion of artifacts needed for rollback."
    ],
    configuration: [
      "Choose a consistent versioning scheme for release artifacts.",
      "Configure repository coordinates, retention rules and access permissions.",
      "Store checksums and build metadata with published artifacts.",
      "Separate snapshot or development outputs from approved release versions.",
      "Configure image tags using release versions or commit identifiers.",
      "Define promotion rules for moving artifacts between environments."
    ],
    troubleshooting: [
      "If an artifact is missing, inspect build output paths, publication steps and repository coordinates.",
      "If downloads fail, verify repository availability, authentication and network access.",
      "If checksum verification fails, stop promotion and investigate corruption or replacement.",
      "If the wrong version is deployed, compare pipeline parameters, image digests and repository metadata.",
      "If storage fills up, inspect retention policies and identify obsolete artifacts safely.",
      "If rollback cannot find an older release, review artifact retention and backup practices."
    ],
    bestPractices: [
      "Use immutable release versions and retain the exact binary used in production.",
      "Promote artifacts between environments instead of rebuilding them.",
      "Record source commit, build identifier, checksum and dependency metadata.",
      "Keep retention policies aligned with rollback and compliance requirements.",
      "Scan artifacts before production promotion.",
      "Restrict release publication and deletion permissions."
    ],
    securityConsiderations: [
      "Use authenticated repositories with least-privilege access.",
      "Verify checksums and signatures where supported.",
      "Scan packages and images for vulnerabilities before deployment.",
      "Protect artifacts against unauthorized replacement or deletion.",
      "Do not package secrets into JARs, ZIP files or container images.",
      "Maintain traceability from deployed artifacts back to trusted source revisions."
    ]
  },

  "Maven": {
    purpose: "Apache Maven is a Java build and dependency-management tool that uses a Project Object Model file, normally pom.xml, to describe project configuration, dependencies, plugins and build behavior. Maven executes lifecycle phases such as compile, test, package, verify and install.",
    project: "A Jenkins pipeline builds a Spring Boot application using Maven. Maven resolves dependencies, compiles Java code, runs unit tests and creates a versioned JAR that is uploaded to Nexus for deployment.",
    workflow: [
      "Maven reads the project configuration from pom.xml.",
      "It identifies the project coordinates, dependencies, plugins and configured properties.",
      "Required dependencies are resolved from local or remote repositories.",
      "Lifecycle phases execute in order up to the requested goal or phase.",
      "Compilation and tests validate the application source.",
      "Packaging creates the configured output such as a JAR or WAR.",
      "The artifact can be installed locally or deployed to a remote repository."
    ],
    commands: [
      "mvn -version",
      "mvn clean",
      "mvn compile",
      "mvn test",
      "mvn package",
      "mvn clean verify",
      "mvn dependency:tree",
      "mvn deploy"
    ],
    mistakes: [
      "Using incompatible JDK and Maven compiler settings.",
      "Confusing Maven install with deploy: install places an artifact in the local repository, while deploy publishes it to a remote repository.",
      "Adding dependencies without checking their versions and transitive dependencies.",
      "Skipping tests in a release pipeline without a justified exception.",
      "Using SNAPSHOT dependencies for a release that requires immutable inputs.",
      "Hardcoding repository passwords in pom.xml."
    ],
    configuration: [
      "Define groupId, artifactId and version in pom.xml.",
      "Declare dependencies and use dependency management for consistent versions.",
      "Configure compiler source and target or release settings to match the supported JDK.",
      "Configure plugins for testing, packaging and code-quality checks.",
      "Define repository and distribution management settings without storing plaintext credentials.",
      "Use Maven settings.xml for environment-specific repository authentication."
    ],
    troubleshooting: [
      "If Maven is not recognized, verify installation and PATH configuration.",
      "If dependency downloads fail, inspect repository URLs, proxy settings and settings.xml credentials.",
      "If compilation fails, compare the active JDK with compiler configuration and application requirements.",
      "If tests fail, inspect Surefire or Failsafe reports and reproduce the failing test.",
      "If a dependency version is unexpected, inspect mvn dependency:tree.",
      "If deploy fails, verify distributionManagement coordinates and remote repository permissions."
    ],
    bestPractices: [
      "Pin important plugin and dependency versions.",
      "Use mvn clean verify in CI to run the required validation lifecycle.",
      "Manage shared dependency versions through dependencyManagement.",
      "Keep repository credentials outside source control.",
      "Use a controlled artifact repository such as Nexus.",
      "Avoid unnecessary dependency downloads by using safe and well-managed caches."
    ],
    securityConsiderations: [
      "Review dependencies for known vulnerabilities and untrusted sources.",
      "Use authenticated repositories and protect settings.xml credentials.",
      "Avoid exposing secrets through Maven debug output or build logs.",
      "Keep Maven plugins updated and review their permissions and provenance.",
      "Do not disable certificate validation to bypass repository TLS errors.",
      "Restrict who can publish release artifacts."
    ]
  },

  "Nexus Repository": {
    purpose: "Nexus Repository is a repository manager that stores and distributes software packages and build artifacts. It can host internal releases, proxy approved external repositories and provide a controlled source for dependencies used by build systems such as Maven.",
    project: "A Jenkins pipeline builds a Java application and uploads the versioned JAR to a Nexus Maven hosted repository. Deployment jobs download the approved release from Nexus, while developers resolve dependencies through configured proxy repositories.",
    workflow: [
      "An administrator creates the required hosted, proxy or group repository.",
      "Repository formats and access policies are configured for the required package types.",
      "Build tools authenticate and resolve dependencies through the configured repository URL.",
      "CI builds produce versioned artifacts and publish them to a hosted repository.",
      "Nexus stores package metadata and serves artifacts to authorized consumers.",
      "Teams promote approved versions through their release process.",
      "Cleanup and retention policies manage repository storage."
    ],
    commands: [
      "curl -I https://nexus.example.com/",
      "mvn dependency:tree",
      "mvn deploy",
      "curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" -I https://nexus.example.com/repository/maven-releases/",
      "df -h"
    ],
    mistakes: [
      "Publishing snapshots and releases into the wrong repository.",
      "Allowing anonymous write access to release repositories.",
      "Changing repository URLs without updating Maven settings and project configuration.",
      "Deleting old artifacts without checking rollback and dependency requirements.",
      "Ignoring blob-store capacity, backup status and repository health.",
      "Storing Nexus passwords directly in project files or pipeline logs."
    ],
    configuration: [
      "Create hosted repositories for internal releases and snapshots as appropriate.",
      "Configure proxy repositories for approved external dependency sources.",
      "Use group repositories to provide a consistent dependency endpoint where appropriate.",
      "Configure Maven distributionManagement for artifact publication.",
      "Store credentials securely in Maven settings.xml or the CI credential store.",
      "Define retention, cleanup, backup and repository access policies."
    ],
    troubleshooting: [
      "If Maven cannot download dependencies, verify repository URLs, Nexus availability and proxy configuration.",
      "If artifact upload returns an authorization error, inspect user roles and repository write permissions.",
      "If a version cannot be found, verify groupId, artifactId, version and repository selection.",
      "If Nexus becomes slow, inspect storage capacity, JVM health, repository load and network connectivity.",
      "If remote dependencies are stale or unavailable, inspect proxy cache behavior and upstream repository access.",
      "If artifact storage grows unexpectedly, review component retention and blob-store usage before cleanup."
    ],
    bestPractices: [
      "Separate release and snapshot repositories.",
      "Use repository groups to simplify dependency configuration.",
      "Apply least-privilege permissions for download and publishing operations.",
      "Back up repository configuration and data using a tested recovery strategy.",
      "Monitor storage, JVM resources, request failures and repository availability.",
      "Keep release artifacts immutable and define retention based on operational needs."
    ],
    securityConsiderations: [
      "Require authentication for publishing and administrative operations.",
      "Use TLS for repository communication.",
      "Restrict administrative access and review repository privileges regularly.",
      "Scan dependencies and artifacts for vulnerabilities and malicious packages.",
      "Protect backup data, blob stores and credential configuration.",
      "Avoid exposing repository credentials in shell history and CI logs."
    ]
  },

  "Webhook": {
    purpose: "A webhook is an HTTP callback that sends an event notification from one system to another when a configured action occurs. In CI/CD, webhooks commonly notify Jenkins or another automation platform about repository pushes, pull requests, releases or other events so work can start without constant polling.",
    project: "A developer pushes a commit to GitHub. GitHub sends a push event to the Jenkins webhook endpoint. Jenkins validates the event, identifies the affected repository and branch, and starts the matching pipeline.",
    workflow: [
      "The receiving application exposes an HTTP endpoint that can accept webhook events.",
      "An administrator configures the sender with the endpoint URL and selected event types.",
      "An event such as a push or pull request occurs in the source platform.",
      "The sender creates an HTTP request containing event metadata and a payload.",
      "The receiver validates the request and determines whether the event should trigger work.",
      "The receiver acknowledges the request and processes the event.",
      "Logs and delivery history help teams investigate failed or duplicated notifications."
    ],
    commands: [
      "curl -I https://jenkins.example.com/github-webhook/",
      "curl -X POST https://example.com/webhook -H \"Content-Type: application/json\" -d '{\"event\":\"push\"}'",
      "curl -sS -o /dev/null -w \"%{http_code}\\n\" https://jenkins.example.com/github-webhook/"
    ],
    mistakes: [
      "Configuring an incorrect or unreachable webhook URL.",
      "Subscribing to unnecessary event types and triggering duplicate builds.",
      "Accepting webhook requests without validating signatures or authentication.",
      "Assuming every delivery succeeds because the source platform reports an event.",
      "Performing long-running processing synchronously before acknowledging the request.",
      "Exposing internal webhook endpoints to unrestricted and unnecessary network traffic."
    ],
    configuration: [
      "Configure the exact receiver endpoint and required event types.",
      "Use HTTPS and a securely stored webhook secret where the platform supports signatures.",
      "Configure branch and event filters to prevent unrelated pipeline executions.",
      "Provide a receiver response that acknowledges valid requests promptly.",
      "Record delivery identifiers and event metadata for troubleshooting.",
      "Design processing to tolerate retries and duplicate event delivery."
    ],
    troubleshooting: [
      "If delivery fails, inspect the sender's webhook delivery status, response code and response body.",
      "If the receiver returns 404, verify the endpoint path and application routing.",
      "If the receiver returns 401 or 403, inspect authentication, signature validation and permissions.",
      "If requests time out, inspect network reachability, proxy configuration and receiver processing time.",
      "If builds trigger twice, inspect duplicate deliveries, retry behavior and event filters.",
      "If the wrong branch builds, inspect the payload's repository, ref and pull-request metadata."
    ],
    bestPractices: [
      "Validate event signatures and process only expected event types.",
      "Use idempotent event handling so retries do not create unsafe duplicate actions.",
      "Acknowledge requests quickly and move longer processing into a queue or background worker.",
      "Log delivery identifiers without exposing secrets or sensitive payload data.",
      "Monitor delivery failures and configure safe retry behavior.",
      "Restrict endpoint access and rotate webhook secrets when exposure is suspected."
    ],
    securityConsiderations: [
      "Verify cryptographic signatures using the official platform method.",
      "Use HTTPS and protect webhook secrets.",
      "Reject unexpected event types, malformed payloads and invalid signatures.",
      "Prevent replay and duplicate processing where the platform provides event identifiers or timestamps.",
      "Avoid logging authorization headers, signatures or sensitive payload values.",
      "Do not trust payload fields as authorization to deploy to production."
    ]
  },

  "GitHub Actions": {
    purpose: "GitHub Actions is a workflow automation platform integrated with GitHub repositories. It runs jobs in response to events such as pushes, pull requests, releases or scheduled triggers. Workflows define jobs, steps, runners, permissions and reusable actions for CI/CD automation.",
    project: "A repository contains a workflow under .github/workflows. When a pull request is opened, a GitHub-hosted runner checks out the source, installs dependencies, runs tests and builds a Docker image. A protected release workflow publishes the approved image.",
    workflow: [
      "A developer adds a YAML workflow file under .github/workflows.",
      "The workflow declares the events that should trigger execution.",
      "GitHub evaluates branch filters, path filters and workflow conditions.",
      "Jobs are scheduled on compatible GitHub-hosted or self-hosted runners.",
      "Each job executes its steps, actions and shell commands in the configured environment.",
      "Job outputs, logs, artifacts and test results are recorded.",
      "Protected release jobs can publish packages or deploy approved versions."
    ],
    commands: [
      "git status",
      "git add .github/workflows/ci.yml",
      "git commit -m \"Add CI workflow\"",
      "git push origin main",
      "gh run list",
      "gh run view RUN_ID --log"
    ],
    mistakes: [
      "Using broad workflow permissions when only read access is required.",
      "Referencing third-party actions without pinning trusted versions.",
      "Exposing secrets in workflow logs or passing them to untrusted pull-request code.",
      "Assuming separate jobs automatically share their filesystem.",
      "Using self-hosted runners for untrusted code without isolation.",
      "Ignoring concurrency controls and allowing outdated deployments to overwrite newer releases."
    ],
    configuration: [
      "Store workflow files in the .github/workflows directory.",
      "Configure on events such as push, pull_request, workflow_dispatch or schedule.",
      "Select runner environments using runs-on and define jobs with explicit dependencies.",
      "Use permissions to grant the minimum required GITHUB_TOKEN access.",
      "Store sensitive values in repository, organization or environment secrets.",
      "Configure job outputs, artifact upload/download, caching and concurrency where needed.",
      "Protect production environments with required reviewers and deployment restrictions."
    ],
    troubleshooting: [
      "If a workflow does not trigger, inspect event filters, branch names, path filters and workflow file placement.",
      "If a job remains queued, inspect runner availability, usage limits and self-hosted runner status.",
      "If an action fails, inspect its version, inputs, permissions and execution logs.",
      "If one job cannot find another job's files, publish and download artifacts explicitly.",
      "If a workflow cannot publish a package, inspect token permissions and package repository access.",
      "If deployments overlap, inspect concurrency groups and cancellation settings."
    ],
    bestPractices: [
      "Keep workflows small, reusable and version-controlled.",
      "Pin external actions to trusted immutable commit SHAs where practical.",
      "Set explicit minimum permissions for GITHUB_TOKEN.",
      "Use dependency caching carefully and validate cache keys.",
      "Separate validation workflows from protected production release workflows.",
      "Use environment protection, concurrency controls and immutable release identifiers.",
      "Retain useful logs and test artifacts for investigation."
    ],
    securityConsiderations: [
      "Never expose secrets to untrusted pull-request workflows.",
      "Use least-privilege workflow permissions and short-lived identity federation where supported.",
      "Pin and review third-party actions and reusable workflows.",
      "Isolate self-hosted runners and avoid persistent access to sensitive production systems.",
      "Protect production environments with reviewers and deployment restrictions.",
      "Review workflow changes because YAML steps can execute arbitrary commands with the runner's permissions."
    ]
  }
};
