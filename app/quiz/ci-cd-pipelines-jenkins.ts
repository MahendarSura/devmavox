export interface CiCdPipelinesJenkinsQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export const ciCdPipelinesJenkinsQuestions: CiCdPipelinesJenkinsQuestion[] = [
  {
    id: "ci-cd-pipelines-jenkins-1",
    question: "In a production Jenkins setup, why should the controller avoid running ordinary build workloads whenever possible?",
    options: [
      "To keep controller resources focused on orchestration and reduce the impact of builds on scheduling and UI/API responsiveness",
      "Because Jenkins controllers cannot store job configuration",
      "To make every build run as root",
      "Because agents cannot connect to a controller"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-2",
    question: "Which Jenkins component normally executes the shell steps and compilation commands of a Pipeline?",
    options: [
      "The controller's browser session",
      "A Jenkins agent/executor allocated to the build",
      "The Git server only",
      "The artifact repository"
    ],
    answer: 1
  },
  {
    id: "ci-cd-pipelines-jenkins-3",
    question: "What is the main purpose of a Jenkinsfile stored in a source repository?",
    options: [
      "To define the pipeline as version-controlled code alongside the application",
      "To store production credentials in plain text",
      "To replace Git commits",
      "To configure the developer's IDE theme"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-4",
    question: "Which statement best describes a Declarative Pipeline?",
    options: [
      "A pipeline format with a structured `pipeline {}` block and defined directives",
      "A Jenkins plugin used only for log rotation",
      "A shell script that cannot use stages",
      "A Git branching strategy"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-5",
    question: "What is the role of `agent any` in a Declarative Jenkins Pipeline?",
    options: [
      "It requests an available agent for the pipeline without pinning it to a specific label",
      "It forces the build to run on every agent simultaneously",
      "It disables all executors",
      "It makes the pipeline run outside Jenkins"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-6",
    question: "When should a team use an agent label such as `linux-docker` instead of `agent any`?",
    options: [
      "When a stage requires a specific operating system, toolset, or execution capability",
      "Whenever the repository has a README",
      "Only when the job has no stages",
      "To prevent Jenkins from recording logs"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-7",
    question: "What does the `stages` block represent in a Declarative Pipeline?",
    options: [
      "The major phases of work, such as checkout, test, package, and deploy",
      "The list of Jenkins user accounts",
      "The controller's network interfaces",
      "The artifact repository's retention policy"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-8",
    question: "What is the difference between a stage and a step in Jenkins Pipeline?",
    options: [
      "A stage groups a phase of work; steps are the individual operations performed within it",
      "A step contains multiple Jenkins controllers; a stage is a shell variable",
      "They are unrelated to pipeline execution",
      "A stage is always a Git branch and a step is always a Docker image"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-9",
    question: "Why should pipeline code be reviewed like application code?",
    options: [
      "It controls build and deployment behavior and can expose production systems or secrets if changed unsafely",
      "It cannot change system behavior",
      "It is never executed automatically",
      "Jenkins ignores changes to Jenkinsfiles"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-10",
    question: "Which Git event is commonly used to trigger a CI build soon after developers push changes?",
    options: [
      "A webhook from the source-control platform",
      "A manual reboot of the Jenkins controller",
      "A database vacuum operation",
      "A DNS zone transfer"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-11",
    question: "What is a key advantage of webhooks over frequent SCM polling?",
    options: [
      "They can notify Jenkins of changes promptly without repeatedly checking the repository on a fixed interval",
      "They guarantee every test will pass",
      "They remove the need for source control",
      "They encrypt every artifact automatically"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-12",
    question: "When might SCM polling still be useful?",
    options: [
      "When webhook delivery is unavailable or restricted and periodic change detection is acceptable",
      "When a pipeline must never inspect Git",
      "Only for deploying databases",
      "When the repository contains no commits"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-13",
    question: "What is the purpose of a multibranch Pipeline job?",
    options: [
      "To discover branches or pull requests containing a Jenkinsfile and create corresponding jobs",
      "To merge all branches without review",
      "To store Docker layers",
      "To replace branch protection rules"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-14",
    question: "Why should pull-request builds usually avoid deploying directly to production?",
    options: [
      "Untrusted or unreviewed changes should not receive production deployment authority",
      "Pull requests cannot run tests",
      "Jenkins does not support stages in pull requests",
      "Production deployment requires no credentials"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-15",
    question: "What is the main purpose of a Jenkins shared library?",
    options: [
      "To reuse tested pipeline steps and conventions across multiple repositories",
      "To share a single workspace between all users",
      "To replace artifact versioning",
      "To bypass authorization"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-16",
    question: "Which shared-library design is generally safer and easier to maintain?",
    options: [
      "Small, documented reusable steps with tests and explicit inputs",
      "One enormous function with hidden global state and hard-coded credentials",
      "Dynamic execution of arbitrary pull-request text as privileged code",
      "A library that disables all error handling"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-17",
    question: "What does `post { always { ... } }` commonly help ensure?",
    options: [
      "Cleanup or reporting steps run regardless of the pipeline's final status, subject to execution context",
      "A deployment always succeeds",
      "A build skips its tests",
      "The agent never disconnects"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-18",
    question: "What is the purpose of `post { failure { ... } }`?",
    options: [
      "To perform failure-specific actions such as notifications or diagnostic collection",
      "To mark failed tests as passed without investigation",
      "To delete the source repository",
      "To grant production access to every contributor"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-19",
    question: "Why is `timeout` useful in a pipeline stage?",
    options: [
      "It limits how long a potentially stuck operation can occupy build resources",
      "It guarantees the command succeeds before the limit",
      "It disables pipeline logs",
      "It permanently stops all future builds"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-20",
    question: "What is the purpose of `retry` around a pipeline operation?",
    options: [
      "To rerun an operation that may fail transiently, when repeating it is safe",
      "To make non-idempotent deployments safe automatically",
      "To hide every failure from the team",
      "To increase a user's Jenkins permissions"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-21",
    question: "Why should retries be used cautiously for deployment steps?",
    options: [
      "Repeating a non-idempotent action may create duplicate resources or apply changes more than once",
      "Retries always corrupt the Jenkins controller",
      "Deployment commands can never be retried",
      "Retries remove the need for monitoring"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-22",
    question: "What is an idempotent deployment operation?",
    options: [
      "An operation that can be applied repeatedly and leaves the system in the same intended state",
      "An operation that always creates a new copy on every run",
      "A build that runs only on Fridays",
      "A pipeline with no stages"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-23",
    question: "What does `when { branch 'main' }` do in a Declarative Pipeline stage?",
    options: [
      "It restricts that stage to builds matching the specified branch condition, subject to job/SCM context",
      "It renames the main branch",
      "It merges every branch into main",
      "It disables all tests on main"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-24",
    question: "Why should a team use `input` gates carefully in automated delivery?",
    options: [
      "Manual approvals can be useful for controlled promotion but can also stall pipelines and need clear authorization",
      "An input gate encrypts artifacts",
      "It automatically performs a rollback",
      "It replaces all automated tests"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-25",
    question: "What is the purpose of `environment` in Declarative Pipeline?",
    options: [
      "To define environment variables for the pipeline or a scoped block",
      "To create AWS IAM users automatically",
      "To set Git commit history",
      "To change the Jenkins controller's operating system"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-26",
    question: "Why should secrets not be placed directly in a Jenkinsfile's `environment` block as literal values?",
    options: [
      "They can be exposed through source control, logs, or job configuration instead of being managed as credentials",
      "Jenkins cannot read environment variables",
      "Environment variables are always encrypted at rest",
      "Secrets must be compiled into the application"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-27",
    question: "What is the preferred way to reference a stored Jenkins credential in a pipeline?",
    options: [
      "Use the Credentials system and a supported binding such as `credentials()` or `withCredentials`",
      "Paste the token into a shell command in the Jenkinsfile",
      "Commit the private key to the repository",
      "Print the credential before using it"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-28",
    question: "Why should credential scope be kept as narrow as practical?",
    options: [
      "It reduces the number of jobs, stages, and users that can access the secret",
      "It makes tokens never expire",
      "It removes the need for audit logs",
      "It grants every agent administrator rights"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-29",
    question: "What is a major risk of exposing secrets in build logs?",
    options: [
      "Logs may be retained or accessible to users who should not have the secret",
      "Logs become impossible to search",
      "The source code stops compiling",
      "Jenkins automatically rotates every leaked key"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-30",
    question: "What is the purpose of Jenkins credential masking?",
    options: [
      "It attempts to avoid displaying recognized secret values in logs, but does not replace safe handling",
      "It guarantees secrets can never leak",
      "It encrypts the repository history",
      "It blocks every network connection"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-31",
    question: "Why should shell tracing such as `set -x` be avoided around secret-handling commands?",
    options: [
      "It can echo expanded commands and values into logs",
      "It makes shell scripts run only once",
      "It disables exit codes",
      "It prevents Jenkins from allocating an agent"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-32",
    question: "What does `withCredentials` commonly provide?",
    options: [
      "A scoped binding of stored credentials to variables or files for a block of pipeline execution",
      "A permanent administrator account",
      "A new Git branch for every build",
      "A replacement for code review"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-33",
    question: "Why is it dangerous to let untrusted pull-request code run on an agent that has production credentials?",
    options: [
      "The code may deliberately exfiltrate those credentials or misuse the agent's permissions",
      "Pull-request code cannot execute shell commands",
      "Jenkins automatically blocks all outbound traffic",
      "Credentials cannot be read by build processes"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-34",
    question: "What is the purpose of a Jenkins agent ephemeral workspace?",
    options: [
      "It limits leftover state between builds and can reduce cross-build contamination when disposed safely",
      "It stores all build outputs forever",
      "It replaces artifact repositories",
      "It guarantees zero build failures"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-35",
    question: "Why can sharing a workspace between unrelated builds be problematic?",
    options: [
      "Files and generated state can leak across builds or cause nondeterministic results",
      "It always speeds up tests with no trade-offs",
      "It makes Git commits immutable",
      "It disables concurrent builds globally"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-36",
    question: "What does the `deleteDir()` step commonly do when run in a workspace?",
    options: [
      "It removes the current workspace directory contents within the step's execution context",
      "It deletes the Jenkins controller installation",
      "It removes remote Git tags",
      "It rotates all credentials"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-37",
    question: "Why should workspace cleanup be placed thoughtfully in a pipeline?",
    options: [
      "Cleaning too early can remove files needed by later stages, while skipping cleanup may leave stale data",
      "Cleanup is unrelated to build correctness",
      "Cleanup always deletes the source repository",
      "Cleanup makes artifacts impossible to archive"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-38",
    question: "What is the purpose of `stash` and `unstash` in Jenkins Pipeline?",
    options: [
      "To transfer selected files between stages or agents within the same pipeline run",
      "To publish artifacts permanently to the public internet",
      "To create a Git tag automatically",
      "To store secrets in the Jenkinsfile"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-39",
    question: "When is archiving artifacts in Jenkins useful?",
    options: [
      "For retaining build outputs and making them accessible for later inspection or downstream use",
      "For replacing source control completely",
      "For storing passwords in plain text",
      "For skipping the packaging stage"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-40",
    question: "Why is an external artifact repository often preferable for long-term release artifacts?",
    options: [
      "It offers dedicated retention, immutability, access control, and promotion workflows beyond temporary build storage",
      "Jenkins cannot create files",
      "Artifacts must never be versioned",
      "It guarantees all builds are secure"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-41",
    question: "What is the difference between a CI build artifact and a deployment environment?",
    options: [
      "An artifact is a versioned build output; an environment is a target where that output is run or validated",
      "They are two names for the Jenkins controller",
      "An environment is always a ZIP file",
      "An artifact is a production database"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-42",
    question: "Why should a pipeline build once and promote the same immutable artifact through environments?",
    options: [
      "It reduces differences between tested and deployed binaries and improves traceability",
      "It ensures every environment compiles different code",
      "It prevents rollback",
      "It removes the need to test"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-43",
    question: "What does artifact immutability mean in a release pipeline?",
    options: [
      "A published version is not silently replaced with different content under the same identity",
      "Artifacts can be edited after production release without a record",
      "The build output has no checksum",
      "Every deployment uses the latest unpinned version"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-44",
    question: "Why record a checksum or digest for a release artifact?",
    options: [
      "To verify content identity and detect unexpected changes during transfer or promotion",
      "To make the file smaller automatically",
      "To grant the artifact administrator privileges",
      "To replace all tests"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-45",
    question: "What is the purpose of a software bill of materials (SBOM) in CI/CD?",
    options: [
      "To describe software components and dependencies for visibility, vulnerability response, and compliance",
      "To list only Jenkins users",
      "To store production passwords",
      "To replace application source code"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-46",
    question: "Where should dependency vulnerability scanning normally fit in a mature pipeline?",
    options: [
      "Early enough to give developers feedback and again at relevant release or policy gates",
      "Only after an incident, never during builds",
      "Only on the Jenkins controller's operating system",
      "Only after deleting the dependency manifest"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-47",
    question: "What is the purpose of static application security testing (SAST)?",
    options: [
      "To inspect source or compiled code for potential security weaknesses without requiring a live deployed application",
      "To measure only network latency",
      "To test database backup restore speed",
      "To provision cloud load balancers"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-48",
    question: "What does dynamic application security testing (DAST) generally evaluate?",
    options: [
      "A running application by sending requests and examining its behavior for security issues",
      "Only the Git commit message",
      "Only the Dockerfile formatting",
      "The physical temperature of build agents"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-49",
    question: "Why should security scan findings be assigned severity and policy thresholds?",
    options: [
      "Teams need consistent criteria for triage, exceptions, and deciding whether a release may proceed",
      "Every finding has identical risk",
      "It eliminates the need to investigate false positives",
      "It makes scanner results confidential automatically"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-50",
    question: "What is a sensible approach to a scanner false positive?",
    options: [
      "Validate the finding, document evidence and rationale, and use a controlled exception process with expiry or review",
      "Disable all future scanning",
      "Delete the audit trail",
      "Mark every critical issue as safe without review"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-51",
    question: "What is the main goal of continuous integration?",
    options: [
      "Frequently integrate changes and automatically validate them to detect defects early",
      "Deploy every change to production without checks",
      "Avoid version control merges",
      "Replace developers with build agents"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-52",
    question: "What is the main goal of continuous delivery?",
    options: [
      "Keep software in a releasable state with an automated path to production, while release may require approval",
      "Require every release to be manually compiled on a laptop",
      "Prevent rollback options",
      "Run tests only once per project"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-53",
    question: "How does continuous deployment differ from continuous delivery?",
    options: [
      "Continuous deployment automatically releases every qualifying change to production, while continuous delivery can retain a release decision gate",
      "Continuous delivery never uses automation",
      "Continuous deployment means deploying only once a year",
      "There is no practical distinction"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-54",
    question: "Why should unit tests generally run before slow end-to-end tests?",
    options: [
      "Fast feedback catches many defects earlier and avoids spending time on expensive tests when basic checks fail",
      "Unit tests require a production deployment",
      "End-to-end tests cannot fail",
      "It prevents tests from being parallelized"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-55",
    question: "What is a flaky test?",
    options: [
      "A test that sometimes passes and sometimes fails under apparently equivalent conditions",
      "A test that is permanently disabled",
      "A test that checks code formatting only",
      "A test that always runs on the controller"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-56",
    question: "How should teams handle flaky tests in a quality pipeline?",
    options: [
      "Investigate and fix the source, track flakiness, and use controlled quarantining rather than hiding failures indefinitely",
      "Ignore all failures on weekdays",
      "Delete all test reports",
      "Automatically promote every build with a flaky test"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-57",
    question: "Why should test reports be published even when a test stage fails?",
    options: [
      "They preserve diagnostic details that help identify failed cases and trends",
      "They turn failed tests into passed tests",
      "They remove the need for logs",
      "They create production credentials"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-58",
    question: "What is the value of code coverage metrics?",
    options: [
      "They indicate which code was exercised by tests, but do not by themselves prove test quality",
      "They guarantee there are no bugs",
      "They measure only deployment speed",
      "They replace code review"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-59",
    question: "What is a quality gate in a CI/CD pipeline?",
    options: [
      "A defined condition, such as tests or security thresholds, that must pass before a later action proceeds",
      "A network switch in the data center",
      "A Git remote URL",
      "A way to disable audit records"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-60",
    question: "Why should quality gates be explicit and version-controlled where practical?",
    options: [
      "They make release decisions reproducible, reviewable, and less dependent on undocumented manual judgment",
      "They guarantee no incident can happen",
      "They remove the need for monitoring",
      "They prevent all configuration changes"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-61",
    question: "What does `failFast true` commonly mean for parallel Declarative Pipeline branches?",
    options: [
      "A failure in one parallel branch can cause other branches to be interrupted rather than all continuing normally",
      "Every branch is guaranteed to pass",
      "Parallel branches run sequentially",
      "The controller restarts on every test failure"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-62",
    question: "When is parallel execution useful in Jenkins?",
    options: [
      "Independent checks can run concurrently to reduce feedback time without creating unsafe shared-state conflicts",
      "When steps must strictly happen in order",
      "When every test uses the same mutable file without isolation",
      "Only when no agents are available"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-63",
    question: "What is a key risk of running too many builds concurrently?",
    options: [
      "Resource contention can increase queue time, destabilize agents, and overload shared services",
      "It guarantees all jobs finish faster",
      "It makes test results deterministic",
      "It prevents dependency downloads"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-64",
    question: "How can Jenkins build executors affect throughput?",
    options: [
      "Executor capacity influences how many tasks can run at once, but must be balanced against available CPU, memory, and workload",
      "More executors always improve performance without limit",
      "Executors determine Git commit IDs",
      "Executors encrypt artifact files"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-65",
    question: "What is the Jenkins queue?",
    options: [
      "The set of tasks waiting for suitable execution capacity or required resources",
      "A list of deleted credentials",
      "A copy of the source repository",
      "The list of production database rows"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-66",
    question: "What should be checked when a build stays queued for a long time?",
    options: [
      "Agent availability, matching labels, executor capacity, cloud provisioning, and any throttling or lock constraints",
      "Only the developer's desktop wallpaper",
      "Whether the artifact has a checksum",
      "Only the Git commit author"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-67",
    question: "What is the purpose of the Lockable Resources plugin in some pipelines?",
    options: [
      "To coordinate access to scarce shared resources so conflicting jobs do not use them simultaneously",
      "To encrypt all source code automatically",
      "To create additional cloud accounts",
      "To make every build run in parallel"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-68",
    question: "Why can a pipeline deadlock or wait indefinitely on a resource lock?",
    options: [
      "Jobs may acquire locks in conflicting orders or a resource may never become available or be released",
      "Git commits are immutable",
      "Docker images have layers",
      "Jenkins stages always time out automatically"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-69",
    question: "What is the role of a deployment strategy such as blue-green?",
    options: [
      "It runs two production-like environments and switches traffic between them to enable controlled release and rollback",
      "It changes source code colors",
      "It removes the need for health checks",
      "It always requires stopping all traffic for hours"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-70",
    question: "What is a canary deployment?",
    options: [
      "A release strategy that exposes a small portion of traffic or users to a new version before broader rollout",
      "A process that compiles code without tests",
      "A backup format for Jenkins logs",
      "A Git strategy that deletes main"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-71",
    question: "What is the purpose of a rolling deployment?",
    options: [
      "To replace instances gradually while keeping some capacity serving traffic during the update",
      "To deploy all versions to one host at the same instant",
      "To remove health checks",
      "To rebuild the Jenkins controller for every release"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-72",
    question: "What is an important prerequisite for a safe rolling deployment?",
    options: [
      "Compatible application behavior, readiness checks, and sufficient capacity during the transition",
      "Every instance must share an unversioned mutable binary",
      "No monitoring may be enabled",
      "The old version must be deleted before validation"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-73",
    question: "Why should database schema changes be designed for backward compatibility during rolling releases?",
    options: [
      "Old and new application versions may overlap temporarily and need to operate against the same schema",
      "Databases never change during releases",
      "Backward compatibility disables transactions",
      "It guarantees zero query latency"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-74",
    question: "What is the expand-and-contract approach for database migrations?",
    options: [
      "Add compatible schema first, migrate usage/data, then remove obsolete schema after old versions are gone",
      "Drop every table before deploying the application",
      "Run migrations only from developer laptops",
      "Rename columns without coordinating versions"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-75",
    question: "Why should database migrations be treated carefully in automated deployment pipelines?",
    options: [
      "They may be hard to reverse and can lock tables, lose data, or break mixed application versions",
      "They never affect availability",
      "They are always fully transactional on every database",
      "They eliminate the need for backups"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-76",
    question: "What is the purpose of a post-deployment smoke test?",
    options: [
      "To quickly verify essential application paths and service health after a release",
      "To benchmark every possible user interaction exhaustively",
      "To replace pre-merge unit tests",
      "To remove deployment history"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-77",
    question: "What is the difference between a smoke test and a full regression suite?",
    options: [
      "Smoke tests cover a small set of critical checks; regression suites test a broader range of existing behavior",
      "Smoke tests always take longer",
      "Regression suites run only before coding begins",
      "They are identical by definition"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-78",
    question: "Why should deployment health checks be based on meaningful signals?",
    options: [
      "A process being alive does not necessarily mean it can serve correct requests or reach its dependencies",
      "Health checks are only decorative",
      "A TCP port always proves business functionality",
      "Health checks make logs unnecessary"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-79",
    question: "What should a pipeline do if a post-deployment health check fails?",
    options: [
      "Stop or limit further rollout, capture diagnostics, and follow a defined rollback or mitigation procedure",
      "Continue promoting all regions regardless",
      "Delete all monitoring data",
      "Mark the release successful to avoid noise"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-80",
    question: "What is the difference between rollback and roll-forward remediation?",
    options: [
      "Rollback restores a previous known version; roll-forward deploys a new corrective version",
      "Rollback means deleting all source control history",
      "Roll-forward means disabling tests permanently",
      "Both require rebuilding the controller"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-81",
    question: "Why is rollback not always as simple as redeploying the previous application binary?",
    options: [
      "Data and schema changes, external side effects, or incompatible state may not be reversible",
      "Application binaries never contain code",
      "Jenkins cannot retrieve prior artifacts",
      "Previous releases never had configuration"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-82",
    question: "What is the purpose of a deployment approval step for production?",
    options: [
      "To enforce an intentional release decision with appropriate authorization and auditability where policy requires it",
      "To guarantee the release has no bugs",
      "To give all developers administrator rights",
      "To skip security checks"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-83",
    question: "Why should production deployment permissions be separated from routine build permissions?",
    options: [
      "Compromise of a test build should not automatically grant authority to change production systems",
      "Builds never execute code",
      "Separation makes audit logs impossible",
      "Every developer must have root access"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-84",
    question: "What does the principle of least privilege mean for Jenkins service accounts?",
    options: [
      "Grant only the permissions required for the account's specific tasks",
      "Give every service account full administrator access",
      "Share one account and password across every team",
      "Disable authentication to simplify automation"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-85",
    question: "Why should Jenkins plugins be managed carefully?",
    options: [
      "Plugins extend the attack surface and can introduce compatibility, reliability, and security risks",
      "Plugins never execute code",
      "All plugins are maintained by one vendor",
      "Installing more plugins always reduces memory use"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-86",
    question: "What is a good plugin lifecycle practice?",
    options: [
      "Use only needed plugins, monitor advisories, test updates, and keep a recovery plan",
      "Install every available plugin automatically in production",
      "Never update plugins under any circumstances",
      "Download plugin binaries from untrusted mirrors"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-87",
    question: "Why should the Jenkins controller and agents be patched regularly?",
    options: [
      "Updates address vulnerabilities and defects, but should be tested and rolled out with appropriate operational controls",
      "Patching eliminates the need for backups",
      "Agents cannot contain vulnerable software",
      "Jenkins versions never change"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-88",
    question: "What should be included in a Jenkins backup and recovery plan?",
    options: [
      "Jenkins configuration and required state, credentials protection, plugin/version awareness, and tested restore procedures",
      "Only a screenshot of the dashboard",
      "Only current console output",
      "No backup, because jobs are reproducible"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-89",
    question: "Why is testing a Jenkins restore important?",
    options: [
      "A backup is useful only if required data and configuration can actually be restored within recovery objectives",
      "Restore tests automatically fix all pipeline code",
      "It prevents agents from connecting",
      "It removes the need for disaster recovery planning"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-90",
    question: "What is the purpose of monitoring Jenkins queue length and build duration?",
    options: [
      "It helps identify capacity bottlenecks, slow stages, and changes in delivery performance",
      "It replaces application observability",
      "It guarantees builds never fail",
      "It records only source code formatting"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-91",
    question: "Which metric is useful for understanding CI reliability over time?",
    options: [
      "Build failure rate and failure causes segmented by job or stage",
      "The number of emojis in commit messages",
      "The desktop resolution of developers",
      "The number of browser tabs open"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-92",
    question: "Why should pipeline logs include context but avoid excessive sensitive output?",
    options: [
      "Useful timestamps, stage names, and error details aid diagnosis while reducing leakage and noise",
      "Logs should contain every credential value",
      "Context prevents all bugs",
      "Sensitive output is required for every successful build"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-93",
    question: "What is the purpose of correlating a deployed release with its commit and artifact digest?",
    options: [
      "It supports traceability, incident investigation, and confidence about exactly what was deployed",
      "It makes the code open source automatically",
      "It removes the need for release notes",
      "It changes the Git history"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-94",
    question: "What is a deployment manifest or release record useful for?",
    options: [
      "Recording the version, configuration references, approvals, and relevant evidence associated with a release",
      "Storing passwords in public source control",
      "Replacing health checks",
      "Increasing compiler optimization automatically"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-95",
    question: "Why should build inputs be pinned or otherwise controlled?",
    options: [
      "Uncontrolled dependency or tool changes can make the same commit produce different outcomes",
      "Pinning makes tests unnecessary",
      "It ensures dependencies never have vulnerabilities",
      "It removes artifact versioning"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-96",
    question: "What is a reproducible build?",
    options: [
      "A build whose controlled inputs and process can produce the same output or verifiably equivalent output",
      "A build that must fail on every second run",
      "A deployment with no source commit",
      "A build executed only by a person"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-97",
    question: "Why are container images commonly referenced by digest for high-assurance deployments?",
    options: [
      "A digest identifies image content more precisely than a mutable tag such as `latest`",
      "A digest automatically scans every package",
      "Tags cannot be used in any registry",
      "Digests grant deployment permissions"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-98",
    question: "Why should production pipelines avoid relying on the mutable `latest` image tag?",
    options: [
      "The tag may point to different content over time, reducing repeatability and auditability",
      "The tag cannot contain Linux software",
      "It prevents Docker from downloading layers",
      "It makes rollback impossible in all cases"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-99",
    question: "What is the purpose of signing build artifacts or container images?",
    options: [
      "To provide verifiable evidence about artifact origin and integrity when verification is enforced",
      "To compress image layers",
      "To make the artifact anonymous",
      "To replace all vulnerability scans"
    ],
    answer: 0
  },
  {
    id: "ci-cd-pipelines-jenkins-100",
    question: "Why should signature verification occur before production deployment?",
    options: [
      "It can reject artifacts that do not meet expected identity, integrity, or provenance requirements",
      "It guarantees the application has no logic defects",
      "It replaces runtime monitoring",
      "It changes the source branch name"
    ],
    answer: 0
  }
];
