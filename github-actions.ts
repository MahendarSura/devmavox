export interface InterviewQA {
  question: string;
  answer: string;
}
export const githubActionsQuestions: InterviewQA[] = [
  {
    "question": "1. What is GitHub Actions?",
    "answer": "GitHub Actions is an automation and CI/CD platform integrated into GitHub repositories. It allows teams to define workflows that run automatically when events such as pushes, pull requests, releases, or scheduled times occur. Workflows contain jobs and steps that execute commands or reusable actions on hosted or self-hosted runners. DevOps teams use it to automate builds, tests, security scans, artifact creation, and deployments. For example, a push to the main branch can trigger a workflow that builds a Docker image and deploys an application."
  },
  {
    "question": "2. Why is GitHub Actions used in DevOps?",
    "answer": "GitHub Actions helps DevOps teams automate repetitive software delivery activities directly from the source code repository. It reduces manual steps, provides consistent execution, and connects code changes with validation and deployment. Teams can create workflows for testing, linting, vulnerability scanning, container image publishing, and infrastructure deployment. Because workflow definitions are stored as YAML files in the repository, pipeline changes can be reviewed alongside application code. This supports version-controlled automation and improves delivery consistency."
  },
  {
    "question": "3. What is a workflow in GitHub Actions?",
    "answer": "A workflow is an automated process defined in a YAML file inside the .github/workflows directory of a repository. It specifies the events that trigger execution and the jobs that should run. A repository can contain multiple workflows for different responsibilities, such as pull request validation, scheduled dependency checks, and production deployment. Workflows are version-controlled, so teams can review changes to automation just like changes to application source code."
  },
  {
    "question": "4. What is a GitHub Actions event?",
    "answer": "An event is an activity that triggers a GitHub Actions workflow. Common events include push, pull_request, workflow_dispatch, schedule, release, and issue-related events. A workflow can listen for one or more events and can apply filters such as branch names or file paths. For example, a pull_request event targeting the main branch can start automated tests before code is merged. Choosing appropriate triggers prevents unnecessary pipeline executions and ensures important changes receive the required validation."
  },
  {
    "question": "5. What is a job in GitHub Actions?",
    "answer": "A job is a group of steps that execute on a runner as part of a workflow. By default, jobs can run in parallel unless dependencies are configured using the needs property. Each job can have its own runner, permissions, environment, and execution conditions. For example, a workflow may contain separate build, test, security-scan, and deployment jobs. Splitting responsibilities into jobs makes pipelines easier to understand, monitor, and maintain."
  },
  {
    "question": "6. What is a step in GitHub Actions?",
    "answer": "A step is an individual task executed within a job. A step can run a shell command using run or invoke a reusable action using uses. Steps in the same job share the runner environment and execute sequentially unless conditional behavior changes the flow. For example, a build job may contain steps to check out code, install dependencies, run unit tests, and package the application. Clear step names make workflow logs easier to understand during troubleshooting."
  },
  {
    "question": "7. What is a runner in GitHub Actions?",
    "answer": "A runner is the machine or execution environment that runs the jobs defined in a GitHub Actions workflow. GitHub-hosted runners are maintained by GitHub and provide supported operating-system environments, while self-hosted runners are managed by the organization. A runner executes workflow steps, accesses required tools, and produces logs and artifacts. Teams choose runners based on operating-system requirements, network access, security boundaries, and compute needs. Self-hosted runners are useful when jobs need access to private internal infrastructure."
  },
  {
    "question": "8. What is the difference between GitHub-hosted and self-hosted runners?",
    "answer": "GitHub-hosted runners are provisioned and maintained by GitHub, which simplifies operating-system updates and runner infrastructure management. Self-hosted runners are installed and managed by the organization, providing more control over hardware, software, network access, and execution environment. Hosted runners are convenient for standard CI workloads, while self-hosted runners may be required for private network access or specialized hardware. Organizations must secure self-hosted runners carefully because untrusted workflow code can potentially affect the machine and its environment."
  },
  {
    "question": "9. What is a GitHub Actions YAML file?",
    "answer": "A GitHub Actions YAML file defines the structure and behavior of a workflow. It commonly contains a workflow name, trigger events, permissions, jobs, runner selection, and execution steps. YAML indentation and syntax are important because incorrect formatting can prevent a workflow from being parsed. The file is stored under .github/workflows with a .yml or .yaml extension. Keeping the workflow in the repository allows changes to automation to be reviewed, tested, and version-controlled."
  },
  {
    "question": "10. What is the uses keyword in GitHub Actions?",
    "answer": "The uses keyword tells GitHub Actions to execute an action rather than a direct shell command. Actions can be maintained by GitHub, community contributors, or an organization's internal teams. For example, actions/checkout is commonly used to download repository content into the runner workspace. Actions can accept inputs and produce outputs. Teams should review action source code and pin important third-party actions to trusted commit SHAs where stronger supply-chain control is required."
  },
  {
    "question": "11. What is the run keyword in GitHub Actions?",
    "answer": "The run keyword executes shell commands directly on the runner. It is commonly used for installing dependencies, running tests, building applications, executing scripts, and deploying software. The shell can be selected explicitly when necessary, and multiple commands can be written in a multiline block. For example, a Node.js workflow can run npm ci followed by npm test. Commands should be written carefully because shell failures, missing tools, and incorrect working directories can cause pipeline failures."
  },
  {
    "question": "12. What is actions/checkout?",
    "answer": "actions/checkout is a commonly used GitHub-maintained action that checks out repository content into the runner workspace. Without checking out the source code, many build and test commands would not have access to the files they need. The action supports options for selecting branches, tags, commits, fetch depth, and submodules. It is generally placed near the beginning of a job. In production workflows, teams should use a trusted version and understand the permissions required for repository access."
  },
  {
    "question": "13. What is a GitHub Actions secret?",
    "answer": "A GitHub Actions secret is a protected value used to provide sensitive information to workflows, such as deployment credentials, API tokens, and registry passwords. Secrets can be configured at repository, environment, or organization scope depending on access requirements. Workflows reference secrets through the secrets context. Secrets should not be printed in logs or stored directly in workflow files. Teams should prefer short-lived credentials and role-based authentication where available, and rotate exposed credentials immediately."
  },
  {
    "question": "14. What are GitHub Actions variables?",
    "answer": "GitHub Actions variables store configuration values that are not considered sensitive, such as environment names, deployment regions, or application identifiers. They can be defined at repository, environment, or organization level and accessed through the vars context. Variables help avoid repeating fixed configuration values across workflow files. Sensitive data should be stored as secrets instead. Clear separation between ordinary configuration and confidential credentials improves maintainability and reduces accidental exposure."
  },
  {
    "question": "15. What is the difference between secrets and variables?",
    "answer": "Secrets are intended for confidential values such as passwords, access tokens, and private keys, while variables are intended for non-sensitive configuration values. Both can be scoped at different levels and referenced by workflows. A value such as AWS deployment region can be a variable, whereas a credential should never be placed in a plain variable. Teams should review workflow logs, permissions, and environment access to ensure confidential information is not exposed through command output or generated artifacts."
  },
  {
    "question": "16. What is the needs keyword in GitHub Actions?",
    "answer": "The needs keyword defines dependencies between jobs in a workflow. A job that declares another job in needs waits until the required job completes successfully before starting, subject to workflow conditions. This allows teams to create controlled stages such as build, test, scan, and deploy. For example, a deployment job can depend on both test and security-scan jobs so that deployment cannot proceed until both validation stages pass. Job dependencies make pipeline execution order explicit."
  },
  {
    "question": "17. What is a matrix strategy?",
    "answer": "A matrix strategy allows a job to run multiple times with different combinations of configuration values. It is commonly used to test applications across several operating-system versions, programming-language versions, or dependency combinations. Instead of duplicating job definitions, teams define a matrix and GitHub Actions creates the corresponding job variations. For example, a library can be tested against multiple supported Node.js versions. Matrix execution improves coverage and can reduce workflow maintenance."
  },
  {
    "question": "18. What is a reusable workflow?",
    "answer": "A reusable workflow is a workflow that another workflow can call using the workflow_call trigger. It allows organizations to centralize common automation such as testing, security scanning, and deployment. Teams can maintain a standard workflow in one repository and reuse it across multiple application repositories. This reduces duplication and promotes consistent pipeline behavior. Reusable workflows should define their required inputs, secrets, and permissions clearly so that calling repositories understand the contract."
  },
  {
    "question": "19. What is a composite action?",
    "answer": "A composite action combines multiple workflow steps into a reusable action. It is defined using an action metadata file and can execute shell commands or call other actions. Composite actions are useful when several repositories need the same sequence of setup or validation steps. For example, an organization can create a composite action that installs required tools, configures common environment variables, and runs a standard validation script. It helps reduce duplicated step definitions across workflows."
  },
  {
    "question": "20. What is workflow_dispatch?",
    "answer": "workflow_dispatch is an event that allows a workflow to be started manually from the GitHub interface or through supported API mechanisms. It can define input parameters so users can select values such as deployment environment or release version when starting the workflow. This is useful for controlled deployments, maintenance jobs, and operational tasks that should not run automatically on every push. Teams should apply appropriate permissions and approval controls to prevent unauthorized manual production actions."
  },
  {
    "question": "21. What is a scheduled workflow?",
    "answer": "A scheduled workflow runs automatically according to a cron expression configured under the schedule event. It is useful for recurring tasks such as dependency checks, report generation, repository maintenance, and periodic security scans. Scheduled workflows run against the repository's default branch and can be affected by platform scheduling delays. Teams should avoid depending on exact execution times for critical real-time operations. They should also ensure that scheduled jobs have limited permissions and do not expose sensitive data."
  },
  {
    "question": "22. What is an environment in GitHub Actions?",
    "answer": "A GitHub Actions environment represents a deployment target such as development, staging, or production. Environments can hold environment-specific secrets and variables and support protection rules such as required reviewers and wait timers. A deployment job can declare the environment it targets, allowing GitHub to apply the associated controls. This helps organizations separate deployment configuration and approvals. For production, teams commonly require approval before a workflow can access production environment secrets and continue deployment."
  },
  {
    "question": "23. What is an artifact in GitHub Actions?",
    "answer": "An artifact is a file or collection of files produced during a workflow run and stored for later download or use by another job. Examples include compiled application packages, test reports, coverage reports, and diagnostic logs. Artifacts allow teams to preserve build outputs without rebuilding them in every subsequent job. Their retention settings and access permissions should be configured according to organizational requirements. For reliable releases, teams should identify exactly which artifact version was tested and deployed."
  },
  {
    "question": "24. What is caching in GitHub Actions?",
    "answer": "Caching stores reusable files between workflow runs so that later runs can avoid repeating expensive setup operations. Common cache targets include package-manager dependency directories and build caches. A cache key identifies the data and can include operating-system details and dependency lockfile hashes. Caching can reduce pipeline execution time, but workflows must still verify dependencies and should not treat cached data as a trusted release artifact. Incorrect cache keys can also cause stale or incompatible dependencies to be reused."
  },
  {
    "question": "25. What is a workflow status badge?",
    "answer": "A workflow status badge is a visual indicator that displays the latest status of a GitHub Actions workflow. It can be added to a repository README so developers and users can quickly see whether a build or test workflow is passing. The badge usually links to the workflow runs page, where detailed logs and execution history are available. A passing badge does not guarantee that every production behavior is correct, but it provides a quick indication of automated validation status."
  },
  {
    "question": "26. How do you deploy an application using GitHub Actions?",
    "answer": "A deployment workflow generally checks out the source code, installs dependencies, runs tests, and creates a release artifact or container image. The workflow then authenticates to the target platform using protected credentials or short-lived identity federation. It deploys the approved version to the selected environment and performs verification steps such as health checks or rollout status checks. Production deployments should use restricted permissions, environment approvals, and traceable version identifiers so that teams can determine exactly what was released."
  },
  {
    "question": "27. How do you integrate GitHub Actions with AWS?",
    "answer": "GitHub Actions can connect to AWS using credentials configured for the workflow or, preferably in many cases, OpenID Connect federation. With OIDC, GitHub obtains a short-lived identity token that AWS IAM can exchange for temporary role credentials after evaluating the trust policy. The workflow can then interact with services such as ECR, S3, ECS, or EKS according to the role's permissions. This avoids maintaining long-lived AWS access keys as repository secrets and improves credential security."
  },
  {
    "question": "28. What is OpenID Connect in GitHub Actions?",
    "answer": "OpenID Connect, or OIDC, allows a GitHub Actions workflow to obtain an identity token and exchange it with a trusted cloud provider for temporary credentials. In AWS, an IAM role trust policy can restrict which repository, branch, tag, or environment is allowed to assume the role. The workflow must request the required id-token permission. OIDC reduces the need to store long-lived cloud credentials in GitHub secrets and supports more controlled identity-based deployments."
  },
  {
    "question": "29. What are permissions in GitHub Actions?",
    "answer": "Workflow and job permissions control what the automatically provided GITHUB_TOKEN can do within a repository. Permissions can include reading repository contents, creating pull request comments, publishing packages, or updating other supported resources. Organizations should grant only the permissions required by each workflow and job. A workflow that only builds and tests source code may need read access but not write access. Restricting token permissions reduces the potential impact of compromised steps or untrusted code."
  },
  {
    "question": "30. How do you troubleshoot a failed GitHub Actions workflow?",
    "answer": "Troubleshooting begins by opening the failed workflow run and identifying the job and step that reported the error. Engineers inspect the logs for the first meaningful failure rather than focusing only on later cascading errors. They verify YAML syntax, runner operating system, tool versions, environment variables, secrets, permissions, and dependency availability. Reproducing the failing command locally can help isolate application problems from runner-specific issues. After correcting the cause, the workflow should be rerun and its successful output verified."
  },
  {
    "question": "31. What causes a GitHub Actions permission error?",
    "answer": "Permission errors commonly occur when the workflow token lacks the required repository scope, an environment restricts access, a cloud role trust policy does not match the workflow identity, or a deployment credential is missing. Engineers inspect the exact denied operation and identify which identity performed it. They then review workflow permissions, repository settings, environment protection rules, and external IAM policies. The correct solution is to grant the smallest required permission rather than giving every workflow broad administrative access."
  },
  {
    "question": "32. What is concurrency in GitHub Actions?",
    "answer": "Concurrency controls how workflow runs or jobs with the same concurrency group execute. It can prevent multiple deployments from modifying the same environment simultaneously and can optionally cancel older in-progress runs when newer runs start. For example, a production deployment workflow can use a concurrency group based on the target environment to avoid overlapping releases. Teams should choose cancellation behavior carefully because interrupting a deployment midway may leave an environment in an inconsistent state."
  },
  {
    "question": "33. How do you secure GitHub Actions workflows?",
    "answer": "Workflow security requires careful control of permissions, third-party actions, secrets, runner access, and untrusted pull request code. Teams should use least-privilege GITHUB_TOKEN permissions, review external actions, pin critical dependencies to trusted commit SHAs, and avoid exposing secrets to untrusted workflows. OIDC can replace long-lived cloud credentials, while protected environments can require approval for production deployment. Self-hosted runners should be isolated and maintained because they can provide access to internal networks and sensitive resources."
  },
  {
    "question": "34. How do you optimize GitHub Actions pipeline performance?",
    "answer": "Pipeline performance can be improved by caching dependencies, avoiding unnecessary workflow triggers, running independent jobs in parallel, using appropriate runner sizes, and reusing common workflows or actions. Matrix strategies can improve test coverage, but excessive parallelism may increase resource usage and cost. Teams should inspect job duration and identify slow steps before optimizing. Build artifacts can be shared between jobs to avoid repeated compilation. Optimization should preserve test coverage and release reliability rather than simply reducing execution time."
  },
  {
    "question": "35. Explain a real-time GitHub Actions CI/CD workflow.",
    "answer": "When a developer pushes code or opens a pull request, GitHub Actions starts a CI workflow. The runner checks out the repository, installs dependencies, performs static analysis, executes unit tests, and builds the application. After the pull request is approved and merged, a release workflow builds and scans the production image, publishes it to a container registry, and authenticates to the target cloud environment. A deployment job updates the application and verifies its health. Production approvals, restricted credentials, logs, and artifact versioning provide control and traceability throughout the release."
  }
];

