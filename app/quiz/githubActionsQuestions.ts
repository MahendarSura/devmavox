export interface GitHubActionsQuestion {
  question: string;
  options: string[];
  answer: number;
}

export const githubActionsQuestions: GitHubActionsQuestion[] = [
  {
    question: "1. What is GitHub Actions?",
    options: [
      "A database management system",
      "A CI/CD and workflow automation platform",
      "A programming language",
      "A container runtime"
    ],
    answer: 1
  },
  {
    question: "2. What is a workflow in GitHub Actions?",
    options: [
      "A Docker image",
      "A Git branch",
      "An automated process defined in a YAML file",
      "A cloud virtual machine"
    ],
    answer: 2
  },
  {
    question: "3. Where are GitHub Actions workflow files stored?",
    options: [
      ".github/workflows/",
      ".git/actions/",
      "src/workflows/",
      "/etc/github/"
    ],
    answer: 0
  },
  {
    question: "4. Which file format is commonly used to define a GitHub Actions workflow?",
    options: [
      "JSON only",
      "XML",
      "INI",
      "YAML"
    ],
    answer: 3
  },
  {
    question: "5. Which key defines when a workflow should run?",
    options: [
      "steps",
      "on",
      "runs",
      "outputs"
    ],
    answer: 1
  },
  {
    question: "6. Which event commonly triggers a workflow when code is pushed?",
    options: [
      "schedule",
      "workflow_dispatch",
      "push",
      "release-only"
    ],
    answer: 2
  },
  {
    question: "7. Which event is commonly used to run CI checks for pull requests?",
    options: [
      "pull_request",
      "deployment_only",
      "workflow_call_only",
      "runner"
    ],
    answer: 0
  },
  {
    question: "8. Which event allows a user to start a workflow manually from GitHub?",
    options: [
      "push",
      "pull_request",
      "schedule",
      "workflow_dispatch"
    ],
    answer: 3
  },
  {
    question: "9. Which event is used to schedule a workflow using cron syntax?",
    options: [
      "workflow_run",
      "schedule",
      "issues",
      "fork"
    ],
    answer: 1
  },
  {
    question: "10. What is a job in GitHub Actions?",
    options: [
      "A GitHub repository",
      "A YAML comment",
      "A group of steps executed on a runner",
      "A Docker registry"
    ],
    answer: 2
  },
  {
    question: "11. What is a step in a GitHub Actions job?",
    options: [
      "An individual action or shell command executed as part of a job",
      "A separate GitHub organization",
      "A repository secret",
      "A runner operating system"
    ],
    answer: 0
  },
  {
    question: "12. What is a runner?",
    options: [
      "A Git tag",
      "A workflow trigger",
      "A secret store",
      "A machine that executes workflow jobs"
    ],
    answer: 3
  },
  {
    question: "13. Which key specifies the runner environment for a job?",
    options: [
      "environment",
      "runs-on",
      "machine-type",
      "runner-name-only"
    ],
    answer: 1
  },
  {
    question: "14. Which is an example of a GitHub-hosted runner label?",
    options: [
      "github-linux",
      "ubuntu-server-anywhere",
      "ubuntu-latest",
      "linux-runner-default"
    ],
    answer: 2
  },
  {
    question: "15. Which key defines the steps of a job?",
    options: [
      "steps",
      "commands",
      "tasks-list",
      "workflow_steps_only"
    ],
    answer: 0
  },
  {
    question: "16. What does the uses key do in a workflow step?",
    options: [
      "Defines a cron schedule",
      "Sets the runner's IP address",
      "Creates a new Git branch",
      "References an action to run"
    ],
    answer: 3
  },
  {
    question: "17. What does the run key do?",
    options: [
      "Selects a repository",
      "Executes shell commands",
      "Creates a GitHub account",
      "Defines an action marketplace"
    ],
    answer: 1
  },
  {
    question: "18. What is the purpose of actions/checkout?",
    options: [
      "Deploys directly to production",
      "Creates a Docker image",
      "Checks out repository code onto the runner",
      "Deletes old workflow runs"
    ],
    answer: 2
  },
  {
    question: "19. Why might a workflow use actions/setup-node?",
    options: [
      "To install or configure a Node.js version on the runner",
      "To create a GitHub organization",
      "To configure Kubernetes RBAC automatically",
      "To publish a Git branch"
    ],
    answer: 0
  },
  {
    question: "20. What is the purpose of the name field in a workflow file?",
    options: [
      "To store an access token",
      "To select a Docker image",
      "To specify the commit hash",
      "To provide a readable workflow name"
    ],
    answer: 3
  },
  {
    question: "21. What does needs do in a job definition?",
    options: [
      "Installs dependencies",
      "Defines job dependencies and execution order",
      "Creates repository secrets",
      "Starts a scheduled workflow"
    ],
    answer: 1
  },
  {
    question: "22. By default, how do independent jobs in a workflow run?",
    options: [
      "They always run one after another",
      "They run only on separate repositories",
      "They can run in parallel",
      "They cannot run in the same workflow"
    ],
    answer: 2
  },
  {
    question: "23. How can a job depend on a job named build?",
    options: [
      "needs: build",
      "depends: build",
      "after: build",
      "requires-job: build"
    ],
    answer: 0
  },
  {
    question: "24. What is the default behavior when a required job fails?",
    options: [
      "All jobs are always forced to succeed",
      "GitHub deletes the repository",
      "Every dependent job runs normally",
      "Dependent jobs are generally skipped unless their conditions allow them to run"
    ],
    answer: 3
  },
  {
    question: "25. What is the purpose of if in a job or step?",
    options: [
      "To define a Docker registry",
      "To conditionally run the job or step",
      "To install the GitHub CLI",
      "To create a repository"
    ],
    answer: 1
  },
  {
    question: "26. Which expression checks whether the previous step succeeded?",
    options: [
      "${{ failure() }}",
      "${{ always() }}",
      "${{ success() }}",
      "${{ cancelled() }}"
    ],
    answer: 2
  },
  {
    question: "27. Which expression can be used to run cleanup even if earlier steps fail or are cancelled, subject to workflow cancellation behavior?",
    options: [
      "${{ always() }}",
      "${{ success() }}",
      "${{ steps() }}",
      "${{ needs() }}"
    ],
    answer: 0
  },
  {
    question: "28. Which expression checks whether a previous step or job has failed?",
    options: [
      "${{ success() }}",
      "${{ always() }}",
      "${{ cancelled() }}",
      "${{ failure() }}"
    ],
    answer: 3
  },
  {
    question: "29. What is a GitHub Actions secret?",
    options: [
      "A public workflow log",
      "A protected value used for credentials or sensitive configuration",
      "A Git branch",
      "A Dockerfile instruction"
    ],
    answer: 1
  },
  {
    question: "30. How can a workflow reference a repository secret named API_TOKEN?",
    options: [
      "${{ token.API_TOKEN }}",
      "$API_TOKEN_SECRET",
      "${{ secrets.API_TOKEN }}",
      "${{ vars.secrets.API_TOKEN }}"
    ],
    answer: 2
  },
  {
    question: "31. What is the difference between GitHub Actions secrets and variables?",
    options: [
      "Secrets are intended for sensitive values; variables are for non-sensitive configuration",
      "Variables are always encrypted credentials and secrets are public",
      "They are identical in every way",
      "Secrets can only store filenames"
    ],
    answer: 0
  },
  {
    question: "32. What is a good practice for AWS credentials in a GitHub Actions deployment?",
    options: [
      "Commit access keys into the repository",
      "Print credentials in workflow logs",
      "Store credentials in a public YAML file",
      "Prefer OIDC-based short-lived credentials when supported and appropriately configured"
    ],
    answer: 3
  },
  {
    question: "33. What does GITHUB_TOKEN provide?",
    options: [
      "A permanent personal access token for every account",
      "A workflow-scoped token for accessing GitHub resources with configured permissions",
      "An AWS root password",
      "A Kubernetes kubeconfig for every cluster"
    ],
    answer: 1
  },
  {
    question: "34. Which key controls the permissions granted to GITHUB_TOKEN?",
    options: [
      "access",
      "credentials",
      "permissions",
      "token-policy-only"
    ],
    answer: 2
  },
  {
    question: "35. What is the principle of least privilege?",
    options: [
      "Grant only the permissions necessary for the task",
      "Give every workflow administrator access",
      "Disable all security checks",
      "Use one permanent credential for all systems"
    ],
    answer: 0
  },
  {
    question: "36. What is a GitHub Actions artifact?",
    options: [
      "A workflow trigger",
      "A repository collaborator",
      "A runner label",
      "A file or collection of files saved from a workflow run"
    ],
    answer: 3
  },
  {
    question: "37. Which action is commonly used to upload workflow artifacts?",
    options: [
      "actions/checkout",
      "actions/upload-artifact",
      "actions/setup-node",
      "actions/cache-only"
    ],
    answer: 1
  },
  {
    question: "38. Which action is commonly used to download workflow artifacts?",
    options: [
      "actions/download-cache",
      "actions/restore-source",
      "actions/download-artifact",
      "actions/pull-workflow"
    ],
    answer: 2
  },
  {
    question: "39. What is the main purpose of dependency caching?",
    options: [
      "To reduce repeated downloads and speed up workflows",
      "To permanently store production secrets",
      "To replace version control",
      "To deploy applications automatically without build steps"
    ],
    answer: 0
  },
  {
    question: "40. Which action is commonly used to cache dependencies?",
    options: [
      "actions/checkout",
      "actions/upload-artifact",
      "actions/cache-clear",
      "actions/cache"
    ],
    answer: 3
  },
  {
    question: "41. What is a cache key used for?",
    options: [
      "Encrypting all repository files",
      "Identifying a cache entry based on factors such as dependency files or platform",
      "Setting the GitHub account password",
      "Naming a pull request reviewer"
    ],
    answer: 1
  },
  {
    question: "42. What is a matrix strategy?",
    options: [
      "A method to create repository secrets",
      "A way to remove failed commits",
      "A way to run jobs across multiple combinations of configuration values",
      "A replacement for workflow triggers"
    ],
    answer: 2
  },
  {
    question: "43. Which key defines matrix configuration values?",
    options: [
      "strategy.matrix",
      "jobs.matrix-only",
      "runs-on.matrix",
      "workflow.matrix_config"
    ],
    answer: 0
  },
  {
    question: "44. What is the purpose of fail-fast in a matrix strategy?",
    options: [
      "It retries every failed job forever",
      "It disables all matrix combinations",
      "It always forces every job to succeed",
      "It can cancel remaining in-progress matrix jobs when one fails"
    ],
    answer: 3
  },
  {
    question: "45. What does max-parallel control in a matrix strategy?",
    options: [
      "The maximum number of workflow files",
      "The maximum number of matrix jobs running simultaneously",
      "The number of GitHub repositories",
      "The number of secrets per job"
    ],
    answer: 1
  },
  {
    question: "46. What is a reusable workflow?",
    options: [
      "A Docker image shared across all organizations",
      "A local Git commit template",
      "A workflow that another workflow can call",
      "A runner that cannot execute commands"
    ],
    answer: 2
  },
  {
    question: "47. Which event declaration allows a workflow to be called by another workflow?",
    options: [
      "workflow_call",
      "workflow_reuse",
      "workflow_import",
      "workflow_include"
    ],
    answer: 0
  },
  {
    question: "48. What is a composite action?",
    options: [
      "A special GitHub-hosted runner",
      "A branch protection rule",
      "A collection of repository secrets",
      "An action that combines multiple steps into one reusable action"
    ],
    answer: 3
  },
  {
    question: "49. Which file is commonly used to define an action's metadata and inputs?",
    options: [
      "workflow.yml",
      "action.yml",
      "runner.json",
      "github.config"
    ],
    answer: 1
  },
  {
    question: "50. What is the purpose of action inputs?",
    options: [
      "To list all organization members",
      "To change the Git commit history",
      "To pass configuration values into an action",
      "To define the runner's physical location"
    ],
    answer: 2
  },
  {
    question: "51. What is a self-hosted runner?",
    options: [
      "A machine managed by the user or organization to execute workflow jobs",
      "A GitHub-hosted machine that cannot be customized",
      "A YAML variable",
      "A public repository"
    ],
    answer: 0
  },
  {
    question: "52. What is one benefit of self-hosted runners?",
    options: [
      "They eliminate all security risks",
      "They always cost nothing to operate",
      "They automatically fix every workflow",
      "They can provide custom hardware, software, and network access"
    ],
    answer: 3
  },
  {
    question: "53. What is an important security risk with self-hosted runners?",
    options: [
      "They cannot run shell commands",
      "Untrusted workflow code may compromise the runner or its environment",
      "They cannot access private repositories",
      "They only work with Windows"
    ],
    answer: 1
  },
  {
    question: "54. What is a GitHub Actions environment commonly used for?",
    options: [
      "Creating local Git branches",
      "Compiling YAML into JSON",
      "Managing deployment targets, protection rules, and environment-specific secrets",
      "Replacing GitHub repositories"
    ],
    answer: 2
  },
  {
    question: "55. What can required reviewers do for a protected deployment environment?",
    options: [
      "Require approval before a deployment job proceeds",
      "Automatically expose every secret",
      "Delete the workflow history",
      "Disable all branch protections"
    ],
    answer: 0
  },
  {
    question: "56. What is a deployment protection rule intended to do?",
    options: [
      "Rename the default branch",
      "Install a programming language",
      "Upload build artifacts automatically",
      "Prevent a deployment from proceeding until configured conditions are met"
    ],
    answer: 3
  },
  {
    question: "57. What does concurrency control help manage?",
    options: [
      "GitHub account billing only",
      "Overlapping workflow runs or jobs in the same concurrency group",
      "The number of commits in the repository",
      "The syntax of Dockerfiles"
    ],
    answer: 1
  },
  {
    question: "58. Which key is used to configure workflow or job concurrency?",
    options: [
      "parallel",
      "mutex",
      "concurrency",
      "lockfile"
    ],
    answer: 2
  },
  {
    question: "59. What does workflow_dispatch require for manual triggering?",
    options: [
      "The workflow must define the workflow_dispatch event and be available on the default branch for the manual UI trigger",
      "A Dockerfile must exist",
      "The repository must be public",
      "The workflow must run every minute"
    ],
    answer: 0
  },
  {
    question: "60. What is the purpose of the schedule event?",
    options: [
      "To trigger a workflow for every pull request",
      "To deploy on every tag regardless of configuration",
      "To run a workflow only when a user comments",
      "To trigger a workflow according to a cron schedule"
    ],
    answer: 3
  },
  {
    question: "61. What timezone is used for GitHub Actions scheduled workflows?",
    options: [
      "The runner's local timezone",
      "UTC",
      "The repository owner's timezone",
      "The timezone selected in the browser"
    ],
    answer: 1
  },
  {
    question: "62. Why might a scheduled workflow not run exactly at the specified minute?",
    options: [
      "Cron syntax is never supported",
      "Scheduled workflows only run on Windows",
      "GitHub may delay scheduled workflows during periods of high load",
      "Every schedule requires a pull request"
    ],
    answer: 2
  },
  {
    question: "63. What is the purpose of workflow_run?",
    options: [
      "To trigger a workflow based on the completion or other configured activity of another workflow",
      "To start a Docker container directly",
      "To create a new GitHub user",
      "To replace the push event"
    ],
    answer: 0
  },
  {
    question: "64. Why should workflows triggered by pull_request_target be handled carefully?",
    options: [
      "They cannot access the base repository",
      "They only run on private repositories",
      "They automatically delete all secrets",
      "They can run with elevated base-repository privileges, so untrusted code must not be executed carelessly"
    ],
    answer: 3
  },
  {
    question: "65. What is a common purpose of pull_request workflows?",
    options: [
      "To rotate cloud credentials automatically in every case",
      "To run tests, linting, and validation before merging code",
      "To bypass branch protection",
      "To create production resources for every contributor automatically"
    ],
    answer: 1
  },
  {
    question: "66. What does the github context provide?",
    options: [
      "Only AWS environment variables",
      "Only Docker build output",
      "Information about the workflow run, repository, event, and related GitHub data",
      "A full database of all GitHub users"
    ],
    answer: 2
  },
  {
    question: "67. How can a workflow reference the repository name using the github context?",
    options: [
      "${{ github.repository }}",
      "${{ secrets.repository }}",
      "${{ runner.repository }}",
      "${{ jobs.repository }}"
    ],
    answer: 0
  },
  {
    question: "68. Which context is used to reference workflow or job variables defined with vars?",
    options: [
      "${{ secrets }}",
      "${{ runner }}",
      "${{ steps }}",
      "${{ vars.VARIABLE_NAME }}"
    ],
    answer: 3
  },
  {
    question: "69. Which context is used to reference a job's runner information?",
    options: [
      "${{ github }}",
      "${{ runner }}",
      "${{ secrets }}",
      "${{ matrix }} only"
    ],
    answer: 1
  },
  {
    question: "70. What does the steps context help you access?",
    options: [
      "All organization billing information",
      "The runner's private SSH key automatically",
      "Outputs and status information from identified steps",
      "Every secret in every repository"
    ],
    answer: 2
  },
  {
    question: "71. How can one step expose a value to later steps in the same job?",
    options: [
      "Write the value to $GITHUB_OUTPUT and assign an id to the producing step",
      "Add the value to the workflow name",
      "Create a new remote repository",
      "Use git push to store the value"
    ],
    answer: 0
  },
  {
    question: "72. How can a later step reference an output named result from a step with id build?",
    options: [
      "${{ github.build.result }}",
      "${{ secrets.build.result }}",
      "${{ runner.build.result }}",
      "${{ steps.build.outputs.result }}"
    ],
    answer: 3
  },
  {
    question: "73. How can a job expose an output to a dependent job?",
    options: [
      "Use git tag and read the tag",
      "Define job outputs and reference them through needs",
      "Write it only to the runner console",
      "Add the output to .gitignore"
    ],
    answer: 1
  },
  {
    question: "74. What is the purpose of GITHUB_ENV?",
    options: [
      "To store permanent repository secrets",
      "To define branch protection policies",
      "To set environment variables for subsequent steps in the same job",
      "To configure GitHub organization billing"
    ],
    answer: 2
  },
  {
    question: "75. What is a common use of GITHUB_STEP_SUMMARY?",
    options: [
      "To write a human-readable summary shown in the workflow run",
      "To change the workflow trigger",
      "To create a GitHub release automatically in every case",
      "To store private keys permanently"
    ],
    answer: 0
  },
  {
    question: "76. What is a common reason a GitHub Actions workflow fails?",
    options: [
      "The repository contains a README",
      "A workflow has a name",
      "The project uses Git",
      "Invalid YAML, missing permissions, failed commands, or incorrect configuration"
    ],
    answer: 3
  },
  {
    question: "77. What should you check first when a workflow fails?",
    options: [
      "Delete the entire repository",
      "Inspect the failed job and step logs for the actual error",
      "Disable all tests",
      "Rotate every credential without checking the cause"
    ],
    answer: 1
  },
  {
    question: "78. A workflow says a command was not found. What should you investigate?",
    options: [
      "Only the GitHub logo",
      "The repository's star count",
      "Whether the required tool is installed and available on PATH",
      "Whether the README has enough headings"
    ],
    answer: 2
  },
  {
    question: "79. A workflow cannot access a repository secret. What should you check?",
    options: [
      "Secret scope, name, event restrictions, environment rules, and permissions",
      "Only the branch's commit message",
      "The number of lines in README",
      "The repository's display color"
    ],
    answer: 0
  },
  {
    question: "80. Why might secrets not be available to a workflow triggered from a forked pull request?",
    options: [
      "All pull requests are automatically deleted",
      "Forked repositories cannot contain YAML",
      "The runner cannot execute tests",
      "GitHub restricts secrets for many fork-triggered workflows to protect the base repository"
    ],
    answer: 3
  },
  {
    question: "81. What is a common way to improve CI workflow speed?",
    options: [
      "Run all tests repeatedly without caching",
      "Cache dependencies and avoid unnecessary work",
      "Use a new runner for every command",
      "Upload every temporary file as an artifact"
    ],
    answer: 1
  },
  {
    question: "82. Why should dependency versions often be pinned in CI workflows?",
    options: [
      "Pinned versions automatically remove all vulnerabilities",
      "Pinning removes the need for testing",
      "It improves reproducibility and helps control which code is executed",
      "It makes all builds identical regardless of source code"
    ],
    answer: 2
  },
  {
    question: "83. What is a common benefit of pinning third-party actions to a full commit SHA?",
    options: [
      "It reduces the risk of an action reference changing unexpectedly",
      "It guarantees the action has no vulnerabilities",
      "It disables all permissions",
      "It eliminates the need for code review"
    ],
    answer: 0
  },
  {
    question: "84. What is Dependabot commonly used for in GitHub repositories?",
    options: [
      "Running production containers",
      "Replacing GitHub Actions",
      "Managing runner hardware",
      "Detecting dependency updates and opening update pull requests"
    ],
    answer: 3
  },
  {
    question: "85. What is CodeQL commonly used for?",
    options: [
      "Hosting Docker images",
      "Static analysis to identify potential security vulnerabilities in code",
      "Scheduling cron jobs",
      "Creating Git branches"
    ],
    answer: 1
  },
  {
    question: "86. What is the purpose of branch protection rules?",
    options: [
      "To make every branch publicly writable",
      "To prevent developers from creating commits",
      "To enforce policies such as required reviews and status checks",
      "To replace all CI pipelines"
    ],
    answer: 2
  },
  {
    question: "87. What is a required status check?",
    options: [
      "A check that must pass before a protected branch can accept a change under the configured rules",
      "A workflow that runs only once a year",
      "A GitHub account password",
      "A Docker container label"
    ],
    answer: 0
  },
  {
    question: "88. What is the purpose of a release workflow?",
    options: [
      "To delete source code after testing",
      "To disable version tags",
      "To prevent artifact generation",
      "To automate steps such as packaging, publishing, and release creation"
    ],
    answer: 3
  },
  {
    question: "89. Which event can be used to trigger a workflow when a release is published?",
    options: [
      "runner",
      "release",
      "matrix",
      "artifact"
    ],
    answer: 1
  },
  {
    question: "90. How can a workflow commonly build a Docker image?",
    options: [
      "By adding a GitHub label only",
      "By running git status repeatedly",
      "By using Docker build commands or an appropriate build action",
      "By creating a YAML comment"
    ],
    answer: 2
  },
  {
    question: "91. Which action is commonly used to log in to Docker Hub in a workflow?",
    options: [
      "docker/login-action",
      "actions/checkout",
      "actions/cache",
      "actions/upload-artifact"
    ],
    answer: 0
  },
  {
    question: "92. What is a container registry used for in a CI/CD pipeline?",
    options: [
      "Storing Git commit messages only",
      "Replacing unit tests",
      "Running GitHub-hosted runners",
      "Storing and distributing container images"
    ],
    answer: 3
  },
  {
    question: "93. In a deployment workflow, what is a good practice before deploying to production?",
    options: [
      "Skip tests and expose credentials",
      "Run required tests and checks, and apply appropriate deployment protections",
      "Allow every pull request to deploy without restrictions",
      "Commit cloud credentials to the repository"
    ],
    answer: 1
  },
  {
    question: "94. How can GitHub Actions authenticate to AWS without storing long-lived AWS access keys?",
    options: [
      "Use the repository name as a password",
      "Disable AWS authentication",
      "Configure GitHub OIDC federation with an AWS IAM role",
      "Use a public S3 bucket as a credential store"
    ],
    answer: 2
  },
  {
    question: "95. What is the purpose of an OIDC trust policy in an AWS deployment?",
    options: [
      "To define which federated identities and claims may assume an IAM role",
      "To store Docker images",
      "To configure Git branch names",
      "To disable AWS IAM"
    ],
    answer: 0
  },
  {
    question: "96. In a workflow that deploys to Kubernetes, what is a key security practice?",
    options: [
      "Give every workflow cluster-admin access",
      "Store kubeconfig publicly",
      "Disable Kubernetes authentication",
      "Use securely managed credentials and grant only the required cluster permissions"
    ],
    answer: 3
  },
  {
    question: "97. What is the purpose of a CI pipeline's test job?",
    options: [
      "To bypass quality checks",
      "To detect defects before code is merged or deployed",
      "To delete the source repository",
      "To publish secrets to workflow logs"
    ],
    answer: 1
  },
  {
    question: "98. What should you do if an action version becomes deprecated or unsupported?",
    options: [
      "Ignore every warning permanently",
      "Disable repository security",
      "Review the migration guidance and update to a supported, trusted version",
      "Remove all workflow permissions without investigation"
    ],
    answer: 2
  },
  {
    question: "99. What is a common advantage of separating build, test, and deploy jobs?",
    options: [
      "It improves clarity, allows dependency control, and can isolate deployment permissions",
      "It guarantees zero failures",
      "It removes the need for workflow logs",
      "It makes source control unnecessary"
    ],
    answer: 0
  },
  {
    question: "100. Which is a strong GitHub Actions production CI/CD practice?",
    options: [
      "Commit secrets and use unrestricted tokens",
      "Skip tests to make deployment faster",
      "Run untrusted pull-request code on privileged self-hosted runners",
      "Use least privilege, trusted action versions, testing, protected environments, and secure credentials"
    ],
    answer: 3
  }
];
