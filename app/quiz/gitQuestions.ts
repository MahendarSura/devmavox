export interface gitQuestion {
  question: string;
  options: string[];
  answer: number;
}

export const gitQuestions: gitQuestion[] = [
  {
    id: "q-1",
    question: "You accidentally committed a production password and pushed it to the remote repository. What should you do first?",
    options: [
      "Delete the repository immediately",
      "Revoke or rotate the exposed password and investigate the exposure",
      "Rename the password variable",
      "Run git pull"
    ],
    answer: 1
  },
  {
    id: "q-2",
    question: "Your push is rejected because the remote branch contains commits missing from your local branch. What should you do?",
    options: [
      "Force-push immediately",
      "Delete the remote branch",
      "Fetch and integrate the remote changes, resolve conflicts, and push",
      "Run git init"
    ],
    answer: 2
  },
  {
    id: "q-3",
    question: "You accidentally ran git reset --hard and lost a recent commit. Which command can help you locate the previous commit reference?",
    options: [
      "git reflog",
      "git clean -fd",
      "git remote -v",
      "git status"
    ],
    answer: 0
  },
  {
    id: "q-4",
    question: "A merge stops because two developers changed the same lines. What should you do?",
    options: [
      "Delete the conflicted files",
      "Force-push the branch",
      "Restart the computer",
      "Resolve the conflicts, test the changes, stage the files, and complete the merge"
    ],
    answer: 3
  },
  {
    id: "q-5",
    question: "You need to switch branches while keeping your uncommitted work. Which command can temporarily save your changes?",
    options: [
      "git clean -fd",
      "git stash push",
      "git reset --hard",
      "git branch -D"
    ],
    answer: 1
  },
  {
    id: "q-6",
    question: "Your latest local commit contains an incorrect commit message and has not been pushed. What can you use?",
    options: [
      "git fetch",
      "git clean",
      "git commit --amend",
      "git remote remove origin"
    ],
    answer: 2
  },
  {
    id: "q-7",
    question: "Your feature branch has several commits, but the team wants one clean commit before merging. What can you use?",
    options: [
      "Interactive rebase to squash commits",
      "git clean -fd",
      "git remote prune",
      "git init"
    ],
    answer: 0
  },
  {
    id: "q-8",
    question: "A faulty commit has already been shared with your team. You need to undo its changes without rewriting shared history. What should you use?",
    options: [
      "git reset --hard",
      "git clean -fd",
      "git branch -D",
      "git revert"
    ],
    answer: 3
  },
  {
    id: "q-9",
    question: "You staged a log file accidentally but have not committed it. How do you unstage it without deleting the file?",
    options: [
      "git clean -fd",
      "git restore --staged application.log",
      "git reset --hard",
      "git remote remove origin"
    ],
    answer: 1
  },
  {
    id: "q-10",
    question: "Before committing a production fix, you want to inspect exactly what is staged. Which command should you run?",
    options: [
      "git branch -a",
      "git remote -v",
      "git diff --cached",
      "git init"
    ],
    answer: 2
  },
  {
    id: "q-11",
    question: "A pull request is blocked because a required CI status check failed. What should the developer do?",
    options: [
      "Inspect the failed check, fix the problem, and rerun the validation",
      "Disable all branch protection rules",
      "Merge using an administrator bypass immediately",
      "Delete the pull request"
    ],
    answer: 0
  },
  {
    id: "q-12",
    question: "A deployment workflow prints a cloud access token in its logs. What is the safest immediate response?",
    options: [
      "Only rename the workflow",
      "Delete the log link and do nothing else",
      "Wait until the next deployment",
      "Revoke or rotate the token, assess exposure, and fix the logging issue"
    ],
    answer: 3
  },
  {
    id: "q-13",
    question: "Your feature branch needs the latest changes from main. What is a reasonable approach?",
    options: [
      "Delete main",
      "Fetch the latest changes and merge or rebase main according to team policy",
      "Force-push main",
      "Run git clean -fd"
    ],
    answer: 1
  },
  {
    id: "q-14",
    question: "A workflow cannot publish a release because GitHub returns a permissions error. What should you inspect?",
    options: [
      "The repository logo",
      "The README title",
      "The workflow token permissions and required release permissions",
      "The number of repository stars"
    ],
    answer: 2
  },
  {
    id: "q-15",
    question: "A hotfix commit exists on another branch, but you do not want to merge the entire branch. Which command can apply just that commit?",
    options: [
      "git cherry-pick",
      "git clean",
      "git stash clear",
      "git remote prune"
    ],
    answer: 0
  },
  {
    id: "q-16",
    question: "A production deployment health check fails after a new version is released. What should the pipeline do?",
    options: [
      "Ignore the failure",
      "Continue deploying to every environment",
      "Delete the production database",
      "Stop promotion, investigate the failure, and roll back when appropriate"
    ],
    answer: 3
  },
  {
    id: "q-17",
    question: "A file remains tracked even after you add it to .gitignore. What is the likely reason?",
    options: [
      "Git does not support ignore rules",
      "The file is already tracked, so you must untrack it if appropriate",
      "The remote server is offline",
      "The branch name is invalid"
    ],
    answer: 1
  },
  {
    id: "q-18",
    question: "A self-hosted CI runner is unavailable, and jobs remain queued. What should you investigate?",
    options: [
      "The README formatting",
      "The repository description",
      "Runner availability, labels, service health, and capacity",
      "The pull request title"
    ],
    answer: 2
  },
  {
    id: "q-19",
    question: "A deployment regression appeared sometime during the last twenty commits. Which Git tool can help identify the offending commit?",
    options: [
      "git bisect",
      "git stash",
      "git remote",
      "git config"
    ],
    answer: 0
  },
  {
    id: "q-20",
    question: "A workflow deploys successfully but uses an older container image than expected. What should you verify?",
    options: [
      "The README title",
      "The repository avatar",
      "The number of open issues",
      "The image tag or digest, registry path, and deployment configuration"
    ],
    answer: 3
  },
  {
    id: "q-21",
    question: "Your local branch and origin/main have diverged. Which command updates remote-tracking references without merging changes?",
    options: [
      "git commit",
      "git fetch origin",
      "git clean -fd",
      "git tag -d"
    ],
    answer: 1
  },
  {
    id: "q-22",
    question: "A workflow needs cloud access but your organization does not want long-lived cloud keys stored as secrets. What should you consider?",
    options: [
      "Commit the credentials into YAML",
      "Share a personal password",
      "Use OpenID Connect federation with a narrowly scoped cloud role",
      "Disable cloud authentication"
    ],
    answer: 2
  },
  {
    id: "q-23",
    question: "You need to apply a specific change to a release branch while preserving the original branch. Which command is suitable?",
    options: [
      "git cherry-pick <commit>",
      "git clean -fd",
      "git branch -D main",
      "git init"
    ],
    answer: 0
  },
  {
    id: "q-24",
    question: "A pull request from a fork attempts to access repository secrets. What is the safest approach?",
    options: [
      "Expose all secrets to the fork",
      "Give the contributor administrator access",
      "Store credentials in the workflow file",
      "Treat fork code as untrusted and restrict permissions and secret access"
    ],
    answer: 3
  },
  {
    id: "q-25",
    question: "You accidentally deleted a local branch containing unmerged work. What should you investigate?",
    options: [
      "git clean -fd",
      "git reflog and available references to recover the commit",
      "git config --list",
      "git remote remove origin"
    ],
    answer: 1
  },
  {
    id: "q-26",
    question: "A GitHub Actions workflow runs twice for one change because it listens to push and pull_request events. What should you inspect?",
    options: [
      "The repository logo",
      "The README formatting",
      "The event triggers and job conditions",
      "The license badge"
    ],
    answer: 2
  },
  {
    id: "q-27",
    question: "You want to inspect the history of a file that was renamed several times. Which command can help?",
    options: [
      "git log --follow -- path/to/file",
      "git clean -fd",
      "git stash clear",
      "git remote remove origin"
    ],
    answer: 0
  },
  {
    id: "q-28",
    question: "A workflow downloads dependencies on every run, making CI slow. What is a useful improvement?",
    options: [
      "Delete the test job",
      "Skip dependency installation",
      "Commit downloaded packages without review",
      "Cache dependencies using keys based on lockfiles and relevant tool versions"
    ],
    answer: 3
  },
  {
    id: "q-29",
    question: "Your push fails because the repository rejects a file that exceeds its size limit. What should you do?",
    options: [
      "Retry the same push indefinitely",
      "Remove the oversized file from the commit/history as needed or use approved large-file storage",
      "Rename the file only",
      "Delete the remote URL"
    ],
    answer: 1
  },
  {
    id: "q-30",
    question: "A workflow succeeds on staging but fails in production because a configuration variable is missing. What should you check?",
    options: [
      "The repository avatar",
      "The pull request title",
      "Environment-specific variables, secrets, and job environment configuration",
      "The number of contributors"
    ],
    answer: 2
  },
  {
    id: "q-31",
    question: "You need to see which commit introduced a suspicious line in a source file. Which command is useful?",
    options: [
      "git blame path/to/file",
      "git remote -v",
      "git clean -fd",
      "git init"
    ],
    answer: 0
  },
  {
    id: "q-32",
    question: "A production deployment must wait for approval from an authorized reviewer. What should be configured?",
    options: [
      "A README checklist alone",
      "A repository description",
      "A local Git alias",
      "A protected deployment environment with required reviewers"
    ],
    answer: 3
  },
  {
    id: "q-33",
    question: "A developer accidentally pushed an incorrect commit to a shared branch. What is generally safer than rewriting shared history?",
    options: [
      "Delete the entire branch",
      "Create a revert commit and validate the resulting code",
      "Run git clean -fd",
      "Remove the remote repository"
    ],
    answer: 1
  },
  {
    id: "q-34",
    question: "A workflow fails because an external package registry returns HTTP 429. What should you do?",
    options: [
      "Retry continuously without delays",
      "Disable authentication",
      "Respect rate limits and use bounded retries with backoff and appropriate authentication",
      "Delete the repository"
    ],
    answer: 2
  },
  {
    id: "q-35",
    question: "You want to inspect which files changed in a particular commit before deployment. Which command can help?",
    options: [
      "git show --stat <commit>",
      "git remote -v",
      "git stash list",
      "git branch -a"
    ],
    answer: 0
  },
  {
    id: "q-36",
    question: "A deployment workflow runs from an untrusted pull request and can access production credentials. What should you do?",
    options: [
      "Give it more permissions",
      "Print credentials for debugging",
      "Allow deployment from every branch",
      "Restrict production deployment to trusted events, branches, permissions, and protected environments"
    ],
    answer: 3
  },
  {
    id: "q-37",
    question: "You need to rename a local branch without losing its commits. Which command can do this?",
    options: [
      "git clean -fd",
      "git branch -m new-name",
      "git reset --hard",
      "git init"
    ],
    answer: 1
  },
  {
    id: "q-38",
    question: "A dependency security alert identifies a vulnerable package. What should the developer do?",
    options: [
      "Ignore the alert permanently",
      "Disable dependency scanning",
      "Review the advisory, upgrade or mitigate the dependency, and run tests",
      "Delete all workflow files"
    ],
    answer: 2
  },
  {
    id: "q-39",
    question: "You want to compare your feature branch with main before requesting review. Which command is useful?",
    options: [
      "git diff main...feature",
      "git clean -fd",
      "git config --list",
      "git stash clear"
    ],
    answer: 0
  },
  {
    id: "q-40",
    question: "A GitHub Actions job has permission to write to every repository resource, but only needs to read source code. What should you do?",
    options: [
      "Keep broad permissions permanently",
      "Commit a personal access token",
      "Disable all access controls",
      "Set least-privilege GITHUB_TOKEN permissions"
    ],
    answer: 3
  },
  {
    id: "q-41",
    question: "A developer accidentally staged a secret but has not committed it. What should they do?",
    options: [
      "Push it and remove it later",
      "Unstage it, remove it from the intended change, and rotate it if exposure occurred",
      "Rename the repository",
      "Run git branch -D"
    ],
    answer: 1
  },
  {
    id: "q-42",
    question: "A workflow uploads a build artifact, but the deployment job cannot find it. What should you verify?",
    options: [
      "The pull request title",
      "The repository avatar",
      "Artifact name, upload path, workflow scope, and download configuration",
      "The README heading"
    ],
    answer: 2
  },
  {
    id: "q-43",
    question: "Your local branch contains a commit that should be removed, but the file changes must remain available for editing. Which command can help?",
    options: [
      "git reset --mixed HEAD~1",
      "git reset --hard",
      "git clean -fd",
      "git remote prune"
    ],
    answer: 0
  },
  {
    id: "q-44",
    question: "Two production deployment workflows start at the same time and may overwrite each other's changes. What should you implement?",
    options: [
      "Allow both deployments without checks",
      "Disable health checks",
      "Delete release tags",
      "Use concurrency controls and a clear deployment promotion policy"
    ],
    answer: 3
  },
  {
    id: "q-45",
    question: "You need to verify which URL your local origin remote uses before pushing. Which command should you run?",
    options: [
      "git clean -fd",
      "git remote -v",
      "git reset --hard",
      "git stash clear"
    ],
    answer: 1
  },
  {
    id: "q-46",
    question: "A code-scanning alert appears on a pull request. What is the correct response?",
    options: [
      "Close every alert without review",
      "Disable scanning",
      "Assess the finding, fix or mitigate the issue, and document any justified exception",
      "Delete the workflow"
    ],
    answer: 2
  },
  {
    id: "q-47",
    question: "You accidentally deleted a file from the working tree and want its committed version back without discarding other changes. What can you use?",
    options: [
      "git restore path/to/file",
      "git clean -fd",
      "git push --force",
      "git branch -D"
    ],
    answer: 0
  },
  {
    id: "q-48",
    question: "A production pipeline deploys an artifact different from the one tested in CI. What is the strongest improvement?",
    options: [
      "Rebuild from the newest branch during deployment",
      "Skip artifact verification",
      "Manually copy files without tracking them",
      "Promote the same verified immutable artifact between environments and record its digest"
    ],
    answer: 3
  },
  {
    id: "q-49",
    question: "A local branch tracks the wrong remote branch. How can you correct its upstream configuration?",
    options: [
      "git reset --hard",
      "git branch --set-upstream-to=origin/correct-branch",
      "git clean -fd",
      "git stash drop"
    ],
    answer: 1
  },
  {
    id: "q-50",
    question: "A critical production fix is ready. What should you do before pushing it?",
    options: [
      "Force-push before testing",
      "Delete and recreate the branch",
      "Review the diff, run relevant tests, commit the intended changes, and push to the correct branch",
      "Run git clean -fd without checking its effects"
    ],
    answer: 2
  },
  {
    id: "q-51",
    question: "A production deployment fails because cloud credentials configured for the workflow are rejected. What should you investigate?",
    options: [
      "Rename the repository",
      "Disable authentication",
      "Delete the workflow immediately",
      "Check credential validity, secret or OIDC configuration, permissions, and sanitized logs"
    ],
    answer: 3
  },
  {
    id: "q-52",
    question: "A required status check is missing from a pull request, so merging is blocked. What should you inspect?",
    options: [
      "The repository logo",
      "Workflow triggers, job conditions, and the exact required check name",
      "The README title",
      "The number of repository stars"
    ],
    answer: 1
  },
  {
    id: "q-53",
    question: "A workflow prints an API key in its logs. What should the team do first?",
    options: [
      "Only rename the environment variable",
      "Delete the workflow file and stop there",
      "Revoke or rotate the key, investigate exposure, and prevent further secret logging",
      "Wait for the next release"
    ],
    answer: 2
  },
  {
    id: "q-54",
    question: "A pull request is blocked because required reviewers have not approved it. What should the author do?",
    options: [
      "Request the required reviews and address the feedback",
      "Disable branch protection",
      "Force-push to the protected branch",
      "Delete the pull request"
    ],
    answer: 0
  },
  {
    id: "q-55",
    question: "A production workflow should deploy only after reviewed changes reach main. What is a suitable design?",
    options: [
      "Deploy every pull request immediately",
      "Store credentials in source code",
      "Disable testing on main",
      "Separate validation and deployment triggers and restrict deployment to the approved branch or environment"
    ],
    answer: 3
  },
  {
    id: "q-56",
    question: "A workflow cannot access a secret when triggered by a pull request from a fork. What is the likely reason?",
    options: [
      "GitHub never supports pull requests from forks",
      "Fork pull-request workflows generally do not receive ordinary repository secrets for security",
      "The repository name is invalid",
      "Secrets must be written into YAML"
    ],
    answer: 1
  },
  {
    id: "q-57",
    question: "A deployment job cannot push a container image to a registry. What should you verify?",
    options: [
      "The README title",
      "The issue labels",
      "Registry authentication, token permissions, image naming, and publishing logs",
      "The number of contributors"
    ],
    answer: 2
  },
  {
    id: "q-58",
    question: "A workflow uses a third-party action with excessive permissions. What is a stronger security practice?",
    options: [
      "Pin the action to a verified full commit SHA and review its permissions",
      "Grant unlimited permissions",
      "Print all secrets in the logs",
      "Disable all dependency updates"
    ],
    answer: 0
  },
  {
    id: "q-59",
    question: "An external contractor only needs access to one repository. What is the safer access configuration?",
    options: [
      "Make the contractor an organization owner",
      "Share an administrator's password",
      "Make the organization public",
      "Grant the minimum required repository access and review or expire it when appropriate"
    ],
    answer: 3
  },
  {
    id: "q-60",
    question: "A webhook integration stops receiving deployment events. What should you inspect?",
    options: [
      "The README heading",
      "Webhook delivery history, endpoint response codes, secret verification, and subscribed events",
      "The number of stars",
      "The repository avatar"
    ],
    answer: 1
  },
  {
    id: "q-61",
    question: "A pull request contains a vulnerable dependency detected by an automated alert. What should the developer do?",
    options: [
      "Close the alert without checking it",
      "Disable dependency updates",
      "Review the advisory, update or mitigate the dependency, and validate the application",
      "Delete the source repository"
    ],
    answer: 2
  },
  {
    id: "q-62",
    question: "A deployment succeeds, but the application is unreachable. What should you check?",
    options: [
      "The deployment target, network connectivity, service health, and application logs",
      "Only the green workflow status",
      "Only the README",
      "The number of open issues"
    ],
    answer: 0
  },
  {
    id: "q-63",
    question: "You need to remove a stale remote-tracking branch from your local repository. Which command is useful?",
    options: [
      "git reset --hard",
      "git commit --amend",
      "git branch -D main",
      "git fetch --prune"
    ],
    answer: 3
  },
  {
    id: "q-64",
    question: "A production workflow should require manual approval before deployment. The job currently deploys immediately. What should you check?",
    options: [
      "The pull request title",
      "Whether the job references the correct protected environment and its required reviewers are configured",
      "The README line count",
      "The repository avatar"
    ],
    answer: 1
  },
  {
    id: "q-65",
    question: "A workflow fails because an API request returns HTTP 429. What is the appropriate response?",
    options: [
      "Send unlimited immediate retries",
      "Disable authentication",
      "Respect rate-limit information and use bounded retries with backoff",
      "Delete the repository"
    ],
    answer: 2
  },
  {
    id: "q-66",
    question: "A team wants to prevent direct pushes to main and require reviewed changes. What should be configured?",
    options: [
      "Branch protection or repository rules requiring pull requests and appropriate reviews",
      "A README badge",
      "A repository description",
      "A new release tag"
    ],
    answer: 0
  },
  {
    id: "q-67",
    question: "A workflow uses a floating version tag for a third-party action, and the action changes unexpectedly. What reduces this risk?",
    options: [
      "Give the action more permissions",
      "Store secrets in the action source",
      "Disable workflow logs",
      "Pin the action to a verified full commit SHA and update it through reviewed changes"
    ],
    answer: 3
  },
  {
    id: "q-68",
    question: "A self-hosted runner may have executed untrusted pull-request code. What is the main concern?",
    options: [
      "The repository will lose its stars",
      "Untrusted code may access runner files, credentials, or network resources",
      "The repository name will change",
      "The README may become shorter"
    ],
    answer: 1
  },
  {
    id: "q-69",
    question: "A release workflow publishes an older image even though a new build passed. What should you investigate?",
    options: [
      "The issue title",
      "The repository avatar",
      "Artifact upload/download, image tags or digests, and the deployment checkout reference",
      "The README language"
    ],
    answer: 2
  },
  {
    id: "q-70",
    question: "An employee leaves the organization, but their personal access token may still work. What should the administrator do?",
    options: [
      "Revoke or expire the token and audit the associated access",
      "Only rename the repository",
      "Delete the README",
      "Wait for the token to be used"
    ],
    answer: 0
  },
  {
    id: "q-71",
    question: "A workflow matrix creates too many jobs and exceeds available runner capacity. What is a sensible solution?",
    options: [
      "Delete all tests",
      "Disable branch protection",
      "Create a new account",
      "Refine the matrix combinations and control parallelism based on required coverage"
    ],
    answer: 3
  },
  {
    id: "q-72",
    question: "A repository accidentally becomes public and contains internal information. What should the organization do?",
    options: [
      "Only change the repository description",
      "Restrict visibility promptly, investigate what was exposed, and rotate affected secrets",
      "Assume changing visibility removes every existing copy",
      "Wait for a report"
    ],
    answer: 1
  },
  {
    id: "q-73",
    question: "A deployment workflow needs to create an issue but receives a permissions error. What should you inspect?",
    options: [
      "The repository logo",
      "The pull request title",
      "GITHUB_TOKEN permissions, event restrictions, and the API request context",
      "The number of stars"
    ],
    answer: 2
  },
  {
    id: "q-74",
    question: "A team needs to identify which source commit produced a deployed container image. What should the pipeline record?",
    options: [
      "The immutable image digest and traceable source revision metadata",
      "Only the branch name",
      "Only the developer username",
      "Only the workflow start time"
    ],
    answer: 0
  },
  {
    id: "q-75",
    question: "A scheduled workflow does not run at the expected time. What should you check?",
    options: [
      "The README line count",
      "The repository avatar",
      "The latest pull request title",
      "The cron expression, default-branch requirements, workflow syntax, and Actions status"
    ],
    answer: 3
  },
  {
    id: "q-76",
    question: "A workflow deployment uses a personal access token belonging to one employee. What is a better long-term approach?",
    options: [
      "Share the employee's password",
      "Use a narrowly scoped GITHUB_TOKEN, GitHub App, or OIDC approach when appropriate",
      "Commit the token into YAML",
      "Never rotate the token"
    ],
    answer: 1
  },
  {
    id: "q-77",
    question: "A workflow succeeds in CI but the deployment job starts before its artifact is available. What should you configure?",
    options: [
      "A longer repository description",
      "A random sleep as the only safeguard",
      "Explicit job dependencies and reliable artifact upload/download steps",
      "A second unrelated repository"
    ],
    answer: 2
  },
  {
    id: "q-78",
    question: "A pull request changes a critical directory and must request review from a specific team. What can help automate this?",
    options: [
      "A CODEOWNERS file",
      "A repository topic",
      "A README badge",
      "A release draft"
    ],
    answer: 0
  },
  {
    id: "q-79",
    question: "A workflow's required check is no longer recognized after the job was renamed. What should you do?",
    options: [
      "Disable all required checks",
      "Delete main",
      "Force-merge all pull requests",
      "Update the required status-check configuration to match the correct check and validate it"
    ],
    answer: 3
  },
  {
    id: "q-80",
    question: "A dependency cache causes CI to use outdated packages after the lockfile changes. What should you improve?",
    options: [
      "Use the same cache key forever",
      "Include lockfile hashes in cache keys and manage restore-key behavior carefully",
      "Disable tests",
      "Rename the repository"
    ],
    answer: 1
  },
  {
    id: "q-81",
    question: "A deployment pipeline must not release an unreviewed commit. Which controls provide a stronger safeguard?",
    options: [
      "A README checklist alone",
      "A chat message alone",
      "Required reviews and checks, protected branches, and restricted deployment environments",
      "A repository topic"
    ],
    answer: 2
  },
  {
    id: "q-82",
    question: "A GitHub App integration has more permissions than it needs. What should the administrator do?",
    options: [
      "Reduce its permissions to the minimum required and rotate credentials if exposure is suspected",
      "Grant organization-owner access",
      "Share its private key with every developer",
      "Disable audit logging"
    ],
    answer: 0
  },
  {
    id: "q-83",
    question: "A workflow fails because a command behaves differently on Windows and Linux runners. What should you do?",
    options: [
      "Remove all CI jobs",
      "Use the same incompatible command everywhere",
      "Disable tests permanently",
      "Use platform-appropriate commands or a deliberate cross-platform matrix"
    ],
    answer: 3
  },
  {
    id: "q-84",
    question: "A workflow allows a failed security scan to continue without blocking the release. What is the risk?",
    options: [
      "It automatically improves security",
      "A failed security gate may not block the pipeline, allowing risky code to be released",
      "It rotates every credential",
      "It prevents all logs from being created"
    ],
    answer: 1
  },
  {
    id: "q-85",
    question: "A webhook receives duplicate delivery attempts and creates duplicate deployment tickets. What should the integration implement?",
    options: [
      "A larger issue title",
      "Disable all logs",
      "Idempotent processing and deduplication using delivery identifiers",
      "A new repository for every event"
    ],
    answer: 2
  },
  {
    id: "q-86",
    question: "A workflow uploads a package successfully, but the later deployment step fails. What should you inspect?",
    options: [
      "Publishing results, artifact coordinates or digest, credentials, and deployment logs",
      "The repository description",
      "The issue labels",
      "The README heading"
    ],
    answer: 0
  },
  {
    id: "q-87",
    question: "A release is associated with the wrong source commit. What should you verify?",
    options: [
      "The release author's avatar",
      "The number of open issues",
      "The repository description",
      "The selected tag, tag target commit, workflow checkout reference, and artifact provenance"
    ],
    answer: 3
  },
  {
    id: "q-88",
    question: "A repository needs a repeatable template for testing, deployment, and rollback information in every pull request. What should you use?",
    options: [
      "A repository topic",
      "A pull request template",
      "A profile biography",
      "A release tag"
    ],
    answer: 1
  },
  {
    id: "q-89",
    question: "A production deployment must be rolled back to a known-good version. What should the workflow support?",
    options: [
      "Rebuilding from the newest unreviewed branch",
      "Deleting release history",
      "Redeploying a previously verified immutable artifact and checking application health",
      "Disabling monitoring"
    ],
    answer: 2
  },
  {
    id: "q-90",
    question: "A workflow's test job fails, but its deployment job still runs. What should you inspect?",
    options: [
      "The needs dependencies, job conditions, and whether failures are being ignored",
      "The repository logo",
      "The README title",
      "The number of stars"
    ],
    answer: 0
  },
  {
    id: "q-91",
    question: "A workflow cannot download a private package. What should you verify?",
    options: [
      "The repository avatar",
      "The pull request title",
      "The number of contributors",
      "Package access, token permissions, authentication, and registry URL"
    ],
    answer: 3
  },
  {
    id: "q-92",
    question: "A team wants production deployment records linked to approvals and source changes. What is a good approach?",
    options: [
      "Rely only on developer memory",
      "Use deployment and environment records, workflow logs, approvals, and source commit metadata",
      "Delete all workflow history immediately",
      "Share production credentials in chat"
    ],
    answer: 1
  },
  {
    id: "q-93",
    question: "A workflow is failing intermittently even though the source code has not changed. What should you do?",
    options: [
      "Mark all failures as successful",
      "Delete the test suite",
      "Inspect logs, reproduce the issue, isolate flaky dependencies, and fix or quarantine it under policy",
      "Disable CI permanently"
    ],
    answer: 2
  },
  {
    id: "q-94",
    question: "A deployment succeeds in one cloud region but fails in another. What should you investigate?",
    options: [
      "Region-specific variables, credentials, permissions, networking, quotas, and health-check logs",
      "The README title",
      "The repository avatar",
      "The number of pull requests"
    ],
    answer: 0
  },
  {
    id: "q-95",
    question: "You need to identify who changed repository permissions. Where should an administrator look?",
    options: [
      "Only the README history",
      "Only the commit graph",
      "The repository's social preview",
      "Available organization or enterprise audit logs and access-management records"
    ],
    answer: 3
  },
  {
    id: "q-96",
    question: "A release workflow attempts to publish the same package version twice. What should you implement?",
    options: [
      "Ignore registry errors",
      "Validate version uniqueness and make publishing steps safely idempotent where possible",
      "Delete all release records",
      "Use random versions without recording them"
    ],
    answer: 1
  },
  {
    id: "q-97",
    question: "A reusable workflow fails because a required input was not passed by the calling workflow. What should you inspect?",
    options: [
      "The README badge",
      "The organization avatar",
      "The reusable workflow's input declarations and the caller's with configuration",
      "The number of open issues"
    ],
    answer: 2
  },
  {
    id: "q-98",
    question: "A workflow uses an untrusted pull request event to execute code with privileged credentials. What should you do?",
    options: [
      "Avoid executing untrusted code in a privileged context and restrict tokens, secrets, and event permissions",
      "Give it more permissions",
      "Print secrets for debugging",
      "Allow deployments from every branch"
    ],
    answer: 0
  },
  {
    id: "q-99",
    question: "A production deployment workflow reports success even though the application health check fails. What should you change?",
    options: [
      "Remove the health check",
      "Ignore application failures",
      "Delete deployment logs",
      "Make successful post-deployment health verification a requirement for reporting success"
    ],
    answer: 3
  },
  {
    id: "q-100",
    question: "Your team is building a production-ready CI/CD pipeline. Which overall approach is strongest?",
    options: [
      "Deploy every commit with broad credentials and no tests",
      "Use reviewed changes, required checks, least-privilege credentials, protected deployments, verified artifacts, monitoring, and a tested rollback plan",
      "Store cloud keys in source code and allow direct pushes",
      "Skip security checks to release faster"
    ],
    answer: 1
  }
];
