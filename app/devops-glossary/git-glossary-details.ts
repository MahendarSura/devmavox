import type { GlossaryTerm } from "./glossary-data";

export const gitGlossaryDetails: Record<string, Partial<GlossaryTerm>> = {

  "Git": {
    purpose: "Git is a distributed version control system that records changes to files and allows developers to collaborate through branches, commits and merges. Each developer can maintain a local repository with project history and synchronize changes with remote repositories.",
    project: "A DevOps team maintains application source code, Dockerfiles and Kubernetes manifests in Git. Developers create feature branches, commit changes, raise pull requests and merge approved updates into the main branch.",
    workflow: [
      "Initialize or clone a Git repository.",
      "Create a branch for a specific change.",
      "Modify files and inspect changes using git status and git diff.",
      "Stage the intended files and create a commit.",
      "Push the branch to a remote repository.",
      "Open a pull request and complete review and automated checks.",
      "Merge approved changes and synchronize the local repository."
    ],
    commands: [
      "git --version",
      "git init",
      "git status",
      "git add .",
      "git commit -m \"Add application configuration\"",
      "git log --oneline",
      "git remote -v",
      "git push origin main"
    ],
    mistakes: [
      "Committing generated files, build outputs or local secrets accidentally.",
      "Working directly on the main branch without appropriate review.",
      "Using unclear commit messages that make history difficult to understand.",
      "Assuming git add and git commit automatically publish changes remotely.",
      "Ignoring merge conflicts and repository status before switching branches.",
      "Force-pushing shared branches without understanding the impact."
    ],
    configuration: [
      "Configure identity using git config --global user.name and git config --global user.email.",
      "Use .gitignore to exclude build outputs, temporary files and local secrets.",
      "Configure remote repositories with git remote add origin.",
      "Use SSH keys or approved credential managers for remote authentication.",
      "Set branch protection and required review checks in the hosting platform.",
      "Choose a consistent default branch and branching strategy."
    ],
    troubleshooting: [
      "If Git is not recognized, verify installation and PATH configuration.",
      "If authentication fails, inspect SSH keys, credential-manager entries and remote URLs.",
      "If push is rejected, fetch remote changes and inspect whether the branch has diverged.",
      "If files are missing from a commit, inspect git status and the staging area.",
      "If an incorrect commit was created, inspect git log before selecting a safe correction.",
      "If a file remains ignored, inspect .gitignore rules and whether the file is already tracked."
    ],
    bestPractices: [
      "Commit small, logically related changes.",
      "Use meaningful commit messages.",
      "Review git diff before staging and committing.",
      "Protect important branches with pull requests and automated checks.",
      "Use .gitignore for generated and machine-specific files.",
      "Keep source code, infrastructure configuration and deployment manifests version-controlled."
    ],
    securityConsiderations: [
      "Never commit passwords, API keys, private keys or production credentials.",
      "Use least-privilege repository permissions.",
      "Enable branch protection and require review for sensitive changes.",
      "Rotate credentials immediately if a secret is committed.",
      "Scan repositories for exposed secrets.",
      "Protect remote access through SSH key management and approved authentication."
    ]
  },

  "Repository": {
    purpose: "A Git repository is a data structure that stores project files, commits, branches, tags and version history. A local repository supports development on a workstation, while a remote repository allows teams and automation systems to share and retrieve changes.",
    project: "A company maintains a repository containing a Next.js application, Dockerfile, CI workflow and Kubernetes manifests. Developers clone the repository, work on branches and synchronize reviewed changes with GitHub.",
    workflow: [
      "Create a repository using git init or obtain an existing repository using git clone.",
      "Add project files and configure ignore rules.",
      "Record changes through commits.",
      "Configure a remote repository when collaboration is required.",
      "Fetch and push updates between local and remote repositories.",
      "Use branches and tags to manage development and releases."
    ],
    commands: [
      "git init",
      "git clone https://github.com/example/project.git",
      "git status",
      "git remote -v",
      "git remote add origin https://github.com/example/project.git",
      "git fetch origin",
      "git log --oneline --all"
    ],
    mistakes: [
      "Initializing a repository in the wrong directory.",
      "Adding large generated folders or dependency directories.",
      "Assuming a local commit is automatically available to teammates.",
      "Configuring the wrong remote URL.",
      "Accidentally nesting one Git repository inside another.",
      "Deleting repository metadata without understanding that it contains version history."
    ],
    configuration: [
      "Create a suitable .gitignore file for the project technology.",
      "Configure the origin remote and verify its URL.",
      "Set repository-level identity when it differs from global Git identity.",
      "Configure default branches and repository access policies.",
      "Use README and contribution instructions to document the repository.",
      "Configure branch protection and required status checks on the hosting platform."
    ],
    troubleshooting: [
      "If git status reports the wrong repository, inspect the current directory and git rev-parse --show-toplevel.",
      "If remote operations fail, verify git remote -v and network access.",
      "If a directory is not tracked, inspect .gitignore and nested repository configuration.",
      "If repository history is missing, verify the clone source and selected branch.",
      "If push is denied, check authentication and repository write permissions.",
      "If repository size grows unexpectedly, inspect large tracked files and Git history."
    ],
    bestPractices: [
      "Keep repositories focused and organized.",
      "Document setup and contribution steps.",
      "Exclude generated files and local configuration.",
      "Use protected branches for important shared code.",
      "Review repository permissions regularly.",
      "Use tags and release notes to identify stable versions."
    ],
    securityConsiderations: [
      "Limit repository visibility and write permissions appropriately.",
      "Scan commits for secrets and sensitive configuration.",
      "Protect deployment workflows and repository settings.",
      "Use approved authentication rather than shared passwords.",
      "Review third-party contributions before executing their code.",
      "Treat repository history as sensitive if secrets were previously committed."
    ]
  },

  "Commit": {
    purpose: "A Git commit is a recorded snapshot of the staged changes in a repository. It has a unique identifier, author information, timestamp, commit message and parent relationship, allowing teams to inspect, compare and restore project history.",
    project: "A developer updates a Kubernetes deployment manifest and commits the change with a message explaining the image version update. The commit identifier is later used to trace which configuration was deployed.",
    workflow: [
      "Modify tracked or create new project files.",
      "Inspect modifications using git status and git diff.",
      "Stage only the intended files.",
      "Create a commit with a meaningful message.",
      "Inspect the commit using git show or git log.",
      "Push the commit to a remote branch for collaboration.",
      "Associate the commit with a pull request or release."
    ],
    commands: [
      "git status",
      "git diff",
      "git add deployment.yaml",
      "git commit -m \"Update application image version\"",
      "git show --stat HEAD",
      "git log --oneline -10",
      "git commit --amend"
    ],
    mistakes: [
      "Committing without reviewing the staged changes.",
      "Including unrelated files in one commit.",
      "Using vague messages such as update or changes.",
      "Committing secrets or environment-specific files.",
      "Amending a commit that has already been shared without coordinating with teammates.",
      "Assuming untracked files are included automatically."
    ],
    configuration: [
      "Configure author identity with git config user.name and git config user.email.",
      "Use a consistent commit message convention.",
      "Configure commit signing where organizational policy requires it.",
      "Use .gitignore to prevent unwanted files from entering commits.",
      "Configure commit hooks or repository checks for formatting and validation.",
      "Use separate commits for logically distinct changes."
    ],
    troubleshooting: [
      "If a file is absent from a commit, inspect git status and git diff --cached.",
      "If Git rejects a commit due to missing identity, configure user.name and user.email.",
      "If the wrong files were staged, use git restore --staged FILE before committing.",
      "If the latest local commit needs correction, inspect git status before using git commit --amend.",
      "If a commit is missing remotely, verify the current branch and whether it was pushed.",
      "If a commit contains a secret, rotate the secret immediately and follow repository-history remediation procedures."
    ],
    bestPractices: [
      "Keep commits focused and reviewable.",
      "Write messages that explain the reason for a change.",
      "Run relevant tests before committing.",
      "Review staged changes using git diff --cached.",
      "Use signed commits when required by release or compliance policies.",
      "Reference relevant issue or pull-request identifiers when appropriate."
    ],
    securityConsiderations: [
      "Never include secrets in commit content or messages.",
      "Protect signing keys and use verified commit signatures where required.",
      "Restrict who can modify protected release branches.",
      "Scan commits for credentials and sensitive data.",
      "Rotate exposed secrets even after deleting them from the latest commit.",
      "Review changes before accepting commits from untrusted contributors."
    ]
  },

  "Branch": {
    purpose: "A Git branch is a movable reference to a commit that represents an independent line of development. Branches allow developers to implement features, fix bugs and prepare releases without immediately changing the main development line.",
    project: "A team creates feature/payment-api from main. Developers commit the API implementation and tests on that branch, then open a pull request after validation.",
    workflow: [
      "Start from the appropriate base branch.",
      "Create a feature or bug-fix branch.",
      "Make focused changes and create commits.",
      "Fetch updates from the remote repository when needed.",
      "Integrate relevant base-branch changes.",
      "Push the branch and request review.",
      "Merge the approved branch and remove obsolete branches according to policy."
    ],
    commands: [
      "git branch",
      "git branch feature/payment-api",
      "git switch -c feature/payment-api",
      "git switch main",
      "git branch -a",
      "git push -u origin feature/payment-api",
      "git branch -d feature/payment-api"
    ],
    mistakes: [
      "Creating a branch from an outdated base commit.",
      "Committing unrelated work to the same feature branch.",
      "Deleting a branch before confirming its work is integrated.",
      "Using inconsistent branch naming conventions.",
      "Allowing long-lived branches to diverge significantly.",
      "Force-pushing shared branches without coordination."
    ],
    configuration: [
      "Choose a branching strategy appropriate for release frequency and team size.",
      "Use descriptive names such as feature, bugfix and release prefixes.",
      "Configure protected main and release branches.",
      "Set required pull-request reviews and CI status checks.",
      "Use git fetch and regular integration to reduce divergence.",
      "Configure default branch behavior in the repository hosting platform."
    ],
    troubleshooting: [
      "If a branch is not visible, inspect git branch -a and fetch remote references.",
      "If switching branches is blocked, inspect uncommitted changes and use a safe commit or stash.",
      "If a branch is behind its base, fetch and integrate the latest base branch.",
      "If push fails because no upstream is configured, use git push -u origin BRANCH.",
      "If a branch was deleted locally, inspect remote references before recovering it.",
      "If branch history diverges, inspect git log --graph --oneline --all."
    ],
    bestPractices: [
      "Create branches from an up-to-date base.",
      "Keep feature branches short-lived.",
      "Use clear naming conventions.",
      "Run CI checks before merging.",
      "Protect important branches from direct unreviewed pushes.",
      "Delete merged branches when they are no longer required."
    ],
    securityConsiderations: [
      "Protect production and release branches.",
      "Restrict force-push permissions on shared branches.",
      "Require reviews for sensitive deployment and security changes.",
      "Do not store credentials in branch-specific files.",
      "Treat untrusted branch code as potentially unsafe in CI environments.",
      "Review branch protection and access settings regularly."
    ]
  },

  "Merge": {
    purpose: "A Git merge combines the changes represented by one branch into another branch. Git may perform a fast-forward update or create a merge commit that records the integration of the two histories.",
    project: "After reviewing a feature branch that adds a monitoring endpoint, the team merges it into main. The resulting branch contains the approved feature and the shared project history.",
    workflow: [
      "Fetch the latest remote branch information.",
      "Switch to the target branch.",
      "Update the target branch with its remote changes.",
      "Merge the source branch into the target branch.",
      "Resolve conflicts if Git cannot combine changes automatically.",
      "Run tests and inspect the resulting changes.",
      "Push the integrated branch to the remote repository."
    ],
    commands: [
      "git fetch origin",
      "git switch main",
      "git pull --ff-only origin main",
      "git merge feature/payment-api",
      "git status",
      "git diff --check",
      "git push origin main",
      "git merge --abort"
    ],
    mistakes: [
      "Merging into the wrong target branch.",
      "Merging stale branches without reviewing intervening changes.",
      "Resolving conflicts without understanding the intended application behavior.",
      "Skipping tests after conflict resolution.",
      "Using force-push to hide an integration problem.",
      "Merging generated or unrelated files accidentally."
    ],
    configuration: [
      "Select merge, squash or rebase integration policies according to team workflow.",
      "Configure protected branches and required status checks.",
      "Use pull-request templates to document change purpose and testing.",
      "Enable merge restrictions for release branches.",
      "Use consistent conflict-resolution and review procedures.",
      "Configure automatic deletion of merged branches only when appropriate."
    ],
    troubleshooting: [
      "If Git reports unrelated histories, inspect repository origins before using any override option.",
      "If a merge conflict occurs, use git status to identify affected files.",
      "If a merge cannot proceed, inspect uncommitted changes and incomplete operations.",
      "If the wrong branch was merged locally, inspect the history before selecting a revert or reset strategy.",
      "If the remote rejects the merge push, fetch and reconcile remote changes.",
      "If the merged application behaves incorrectly, inspect the merge commit and run targeted tests."
    ],
    bestPractices: [
      "Review the source branch before merging.",
      "Keep branches reasonably synchronized.",
      "Run tests after resolving conflicts.",
      "Use pull requests for important shared changes.",
      "Prefer explicit integration policies rather than ad hoc history rewriting.",
      "Document exceptional merges and release decisions."
    ],
    securityConsiderations: [
      "Require approval for sensitive branch merges.",
      "Validate CI checks before production-related integration.",
      "Review changes to workflows, deployment scripts and permissions.",
      "Protect release branches against unauthorized writes.",
      "Inspect third-party contributions before executing their code.",
      "Ensure conflict resolution does not reintroduce removed credentials or insecure settings."
    ]
  },

  "Rebase": {
    purpose: "Git rebase reapplies commits from one branch onto a different base commit. It can create a more linear project history, but it rewrites commit identities and should be used carefully when commits have already been shared with others.",
    project: "A developer updates a feature branch with recent main branch changes by rebasing the feature commits onto the latest main. This helps identify integration conflicts before the pull request is merged.",
    workflow: [
      "Fetch the latest remote references.",
      "Switch to the feature branch.",
      "Start a rebase onto the updated base branch.",
      "Git reapplies feature commits in sequence.",
      "Resolve conflicts and stage the corrected files.",
      "Continue the rebase until all commits are applied.",
      "Run tests and push the updated branch using an appropriate safe policy."
    ],
    commands: [
      "git fetch origin",
      "git switch feature/payment-api",
      "git rebase origin/main",
      "git status",
      "git add src/payment.ts",
      "git rebase --continue",
      "git rebase --abort",
      "git log --oneline --graph"
    ],
    mistakes: [
      "Rebasing shared commits without coordinating with collaborators.",
      "Confusing rebase with merge and assuming they preserve identical history.",
      "Continuing a rebase before resolving all conflicts correctly.",
      "Using git push --force carelessly after rewriting history.",
      "Rebasing onto the wrong base branch.",
      "Ignoring tests after a sequence of commits has been replayed."
    ],
    configuration: [
      "Agree on whether the team uses merge commits, squash merges or rebased history.",
      "Protect shared branches from unauthorized force-push operations.",
      "Use pull-request settings that match the team's history policy.",
      "Configure rerere only when the team understands and reviews its conflict reuse behavior.",
      "Document when rebasing is acceptable for feature branches.",
      "Keep important uncommitted work safely committed or stashed before rebasing."
    ],
    troubleshooting: [
      "If rebase reports conflicts, inspect git status and resolve each affected file.",
      "If the rebase becomes too complicated, use git rebase --abort to return to the original branch state.",
      "If a commit appears missing, inspect git reflog and the rebase todo/history.",
      "If push is rejected after rebase, compare remote and local history before using any force option.",
      "If the wrong base was selected, abort when possible and restart with the correct target.",
      "If the final application is broken, inspect replayed commits and run relevant tests."
    ],
    bestPractices: [
      "Prefer rebasing private feature branches rather than shared main branches.",
      "Fetch the latest base branch before starting.",
      "Resolve conflicts one commit at a time carefully.",
      "Run tests after the rebase.",
      "Use git push --force-with-lease only when rewriting a shared feature branch is explicitly agreed.",
      "Explain history-rewriting policies to all contributors."
    ],
    securityConsiderations: [
      "Protect important shared branches from history rewriting.",
      "Review rebased commits before publishing them.",
      "Use force-with-lease instead of blind force-push when an agreed history rewrite is necessary.",
      "Do not use rebase as a substitute for secret-removal procedures.",
      "Audit changes to release and deployment history.",
      "Preserve required release evidence and signed commit policies."
    ]
  },

  "Pull Request": {
    purpose: "A pull request is a collaboration workflow that proposes changes from one branch or fork into another branch. It provides a place for code review, discussion, automated checks and approval before changes are integrated.",
    project: "A developer opens a pull request to merge a Terraform module change into main. Reviewers inspect the code, CI validates formatting and plans, and the team merges only after required approvals.",
    workflow: [
      "Create a branch and commit the proposed changes.",
      "Push the branch to the remote hosting platform.",
      "Open a pull request against the intended target branch.",
      "Review the diff, description and related issue.",
      "Run automated CI checks and security validation.",
      "Address review feedback and push additional commits.",
      "Obtain required approvals and merge using the repository policy."
    ],
    commands: [
      "git switch -c feature/monitoring-alerts",
      "git add .",
      "git commit -m \"Add monitoring alerts\"",
      "git push -u origin feature/monitoring-alerts",
      "gh pr create --base main --head feature/monitoring-alerts",
      "gh pr status",
      "gh pr checks"
    ],
    mistakes: [
      "Opening a pull request with an unclear title or missing description.",
      "Including unrelated changes in the same pull request.",
      "Ignoring failed CI checks or unresolved review comments.",
      "Changing the target branch accidentally.",
      "Approving changes without reviewing their security and operational impact.",
      "Merging while the branch is significantly behind the target."
    ],
    configuration: [
      "Define pull-request templates with purpose, impact and testing details.",
      "Configure required reviewers and approval counts.",
      "Enable required CI checks and branch protection.",
      "Restrict who can bypass protection rules.",
      "Configure CODEOWNERS for critical areas where appropriate.",
      "Choose merge, squash or rebase behavior consistently."
    ],
    troubleshooting: [
      "If a pull request cannot be merged, inspect conflict status and required checks.",
      "If CI does not run, inspect workflow triggers, permissions and branch protection configuration.",
      "If approvals are not counted, verify reviewer eligibility and approval rules.",
      "If the wrong changes appear, compare the source branch with the intended base branch.",
      "If a pull request is marked out of date, update its branch using the team's integration policy.",
      "If merge is blocked, inspect review requirements and status-check results."
    ],
    bestPractices: [
      "Keep pull requests focused and reasonably small.",
      "Describe the reason, implementation, risk and test evidence.",
      "Use automated checks for tests, formatting and security validation.",
      "Require independent review for sensitive changes.",
      "Resolve conversations before merging.",
      "Link pull requests to issues and releases for traceability."
    ],
    securityConsiderations: [
      "Review workflow and deployment changes carefully.",
      "Do not expose production secrets to untrusted pull-request code.",
      "Require approval for changes to protected branches.",
      "Use CODEOWNERS for security-sensitive configuration.",
      "Inspect dependencies and scripts introduced by external contributions.",
      "Restrict bypass permissions and audit exceptional merges."
    ]
  },

  "Clone": {
    purpose: "Git clone creates a local copy of a remote repository and normally downloads its commit history and references. It gives a developer or automation system a working copy from which branches can be created and changes can be committed.",
    project: "A new engineer clones the DevMavox repository to a workstation, installs project dependencies and creates a feature branch before modifying the application.",
    workflow: [
      "Obtain the correct remote repository URL.",
      "Run git clone using HTTPS or SSH.",
      "Git creates a local repository and downloads the selected history.",
      "Inspect available branches and remote configuration.",
      "Install project-specific dependencies outside Git's control.",
      "Create a working branch and begin development.",
      "Fetch or pull remote changes as work continues."
    ],
    commands: [
      "git clone https://github.com/example/project.git",
      "git clone git@github.com:example/project.git",
      "git clone --branch main --single-branch https://github.com/example/project.git",
      "git remote -v",
      "git branch -a",
      "git status"
    ],
    mistakes: [
      "Cloning from an incorrect repository URL.",
      "Using credentials embedded in clone URLs.",
      "Assuming cloning automatically installs application dependencies.",
      "Cloning into a directory that already contains unrelated project files.",
      "Using shallow clones without considering history-dependent build or release tasks.",
      "Ignoring repository access permissions."
    ],
    configuration: [
      "Choose HTTPS or SSH based on organizational authentication policy.",
      "Configure SSH keys or a secure credential manager.",
      "Select the required branch when a full default clone is unnecessary.",
      "Configure Git identity after cloning.",
      "Inspect the remote URL and default branch.",
      "Follow project setup instructions for local dependencies and environment configuration."
    ],
    troubleshooting: [
      "If cloning fails with repository not found, verify the URL and repository visibility.",
      "If authentication fails, inspect SSH keys, tokens and credential-manager configuration.",
      "If the connection times out, inspect DNS, proxy and network access.",
      "If the selected branch does not exist, inspect remote branch names.",
      "If checkout fails due to filesystem restrictions, inspect path length and directory permissions.",
      "If submodule content is missing, initialize and update submodules when the project requires them."
    ],
    bestPractices: [
      "Clone from the official organization repository.",
      "Verify the remote URL before pushing changes.",
      "Follow documented project setup steps.",
      "Use shallow clones only when reduced history is acceptable.",
      "Keep credentials out of command history and configuration files.",
      "Create a feature branch rather than working directly on main."
    ],
    securityConsiderations: [
      "Use trusted repository URLs.",
      "Protect SSH private keys and access tokens.",
      "Do not clone or execute unknown project scripts without review.",
      "Verify repository access permissions.",
      "Avoid storing credentials in remote URLs.",
      "Inspect submodules and dependency sources before building untrusted code."
    ]
  },

  "Fork": {
    purpose: "A fork is a separate copy of a repository hosted under another user or organization account. It allows contributors to make changes independently while keeping the original repository as an upstream source for collaboration.",
    project: "An external engineer forks an open-source deployment project, modifies a Helm chart in the fork and opens a pull request to propose the change to the original repository.",
    workflow: [
      "Create a fork using the repository hosting platform.",
      "Clone the fork to a local workstation.",
      "Configure the original repository as an upstream remote.",
      "Create a feature branch and make changes.",
      "Push changes to the contributor's fork.",
      "Open a pull request from the fork to the upstream repository.",
      "Synchronize the fork with upstream changes when needed."
    ],
    commands: [
      "git clone https://github.com/my-account/project.git",
      "git remote add upstream https://github.com/original-owner/project.git",
      "git remote -v",
      "git fetch upstream",
      "git switch main",
      "git merge upstream/main",
      "git push origin main"
    ],
    mistakes: [
      "Pushing changes to the original repository instead of the fork.",
      "Forgetting to configure the upstream remote.",
      "Allowing the fork's main branch to become outdated.",
      "Opening a pull request with the wrong source or target repository.",
      "Assuming fork permissions are identical to upstream permissions.",
      "Executing untrusted workflows from forks with privileged credentials."
    ],
    configuration: [
      "Configure origin to point to the contributor's fork.",
      "Configure upstream to point to the original repository.",
      "Choose a clear branch naming convention.",
      "Follow the upstream contribution and pull-request guidelines.",
      "Synchronize the fork with upstream using an agreed merge or rebase policy.",
      "Review repository hosting permissions and fork workflow restrictions."
    ],
    troubleshooting: [
      "If upstream is missing, inspect git remote -v and add the original repository.",
      "If push is denied, verify that origin points to the contributor's fork.",
      "If the fork is behind, fetch upstream and integrate the required changes.",
      "If a pull request targets the wrong repository, verify the base and head selections.",
      "If fork workflows do not run, inspect hosting-platform restrictions for forked repositories.",
      "If conflicts occur while synchronizing, inspect the divergent histories before integration."
    ],
    bestPractices: [
      "Keep the fork synchronized with the original repository.",
      "Use feature branches for contributions.",
      "Follow upstream contribution guidelines.",
      "Keep pull requests focused and well documented.",
      "Review upstream changes before integrating them.",
      "Delete obsolete feature branches after integration."
    ],
    securityConsiderations: [
      "Treat forked repository code as untrusted until reviewed.",
      "Do not expose upstream secrets to fork-originated workflows.",
      "Review actions and scripts introduced by external contributors.",
      "Protect credentials used to access private upstream repositories.",
      "Verify the source and destination of every pull request.",
      "Apply least-privilege permissions to automation."
    ]
  },

  "Merge Conflict": {
    purpose: "A merge conflict occurs when Git cannot automatically combine competing changes, such as two branches modifying the same lines or incompatible parts of a file. A developer must inspect the intended result, resolve the conflict and complete the merge or rebase.",
    project: "Two engineers update the same Kubernetes Deployment manifest. One changes the container image and another changes resource limits. Git reports a conflict, so the team reviews both changes and creates a correct combined manifest.",
    workflow: [
      "Attempt a merge, rebase or other integration operation.",
      "Git identifies files that cannot be combined automatically.",
      "Run git status to identify conflicted paths.",
      "Open each conflicted file and inspect conflict markers.",
      "Choose or combine the intended changes.",
      "Remove conflict markers and validate the resulting file.",
      "Stage resolved files and continue or complete the integration operation.",
      "Run tests and review the final changes."
    ],
    commands: [
      "git status",
      "git diff",
      "git diff --check",
      "git merge feature/payment-api",
      "git add deployment.yaml",
      "git merge --continue",
      "git merge --abort",
      "git rebase --continue"
    ],
    mistakes: [
      "Choosing ours or theirs without understanding the changes.",
      "Deleting conflict markers but leaving invalid application configuration.",
      "Staging a file before resolving every conflict.",
      "Aborting an operation without preserving important uncommitted work.",
      "Resolving YAML or application conflicts without syntax validation.",
      "Assuming Git conflict resolution guarantees correct runtime behavior."
    ],
    configuration: [
      "Use consistent formatting and file ownership practices to reduce unnecessary conflicts.",
      "Keep branches synchronized through regular integration.",
      "Configure suitable merge strategies for generated or specialized files only when justified.",
      "Use CODEOWNERS and review policies for important configuration files.",
      "Use merge tools when they improve visibility into both versions.",
      "Document conflict-resolution procedures for deployment-critical files."
    ],
    troubleshooting: [
      "If a merge is in progress, inspect git status to identify the current operation.",
      "If conflict markers remain, search the affected files for the marker sequences.",
      "If Git reports an unmerged path, resolve and stage that file.",
      "If a rebase cannot continue, inspect the current commit and resolve remaining conflicts.",
      "If the resolved application fails, validate syntax and compare behavior with both original versions.",
      "If the wrong resolution was staged, inspect the staged diff before continuing."
    ],
    bestPractices: [
      "Understand both sides of a conflict before editing.",
      "Resolve one file at a time and review the result.",
      "Run tests and configuration validation after resolution.",
      "Keep branches short-lived to reduce conflict frequency.",
      "Use small, focused commits.",
      "Ask the relevant code owner when a conflict changes production behavior."
    ],
    securityConsiderations: [
      "Ensure conflict resolution does not restore removed credentials or vulnerable configuration.",
      "Review security-sensitive files with an appropriate owner.",
      "Validate deployment manifests and access-control changes after resolution.",
      "Do not accept untrusted changes merely to clear a conflict.",
      "Preserve auditability through reviewed commits.",
      "Run relevant security checks after integration."
    ]
  },

  "Git Tag": {
    purpose: "A Git tag is a reference that identifies a specific commit, commonly used to mark software releases. Lightweight tags are simple references, while annotated tags store additional metadata such as the tagger, date and release message.",
    project: "After testing version 2.4.1 of a service, the release manager creates an annotated Git tag. The CI pipeline uses that tag to build and publish the corresponding release artifact.",
    workflow: [
      "Complete and review the release changes.",
      "Identify the exact commit that should represent the release.",
      "Create an annotated or lightweight tag.",
      "Inspect the tag and referenced commit.",
      "Push the tag to the remote repository.",
      "Trigger release automation based on the tag event.",
      "Record the artifact and deployment version associated with the tag."
    ],
    commands: [
      "git tag",
      "git tag -a v2.4.1 -m \"Release version 2.4.1\"",
      "git show v2.4.1",
      "git push origin v2.4.1",
      "git push origin --tags",
      "git tag -d v2.4.1",
      "git ls-remote --tags origin"
    ],
    mistakes: [
      "Tagging the wrong commit.",
      "Creating a release tag before required tests and approvals complete.",
      "Reusing an existing release tag for different source code.",
      "Assuming local tags are automatically pushed to the remote.",
      "Using inconsistent version naming.",
      "Deleting or moving published release tags without coordination."
    ],
    configuration: [
      "Use a consistent version format such as semantic versioning when appropriate.",
      "Prefer annotated tags for formal releases.",
      "Configure CI workflows to respond to approved tag patterns.",
      "Protect release tags using hosting-platform rules where supported.",
      "Associate release notes and artifact metadata with each tag.",
      "Require authorized release managers for production release tagging."
    ],
    troubleshooting: [
      "If a tag is not visible remotely, verify that it was pushed.",
      "If the wrong commit was tagged, inspect git show and coordinate correction before changing a published tag.",
      "If a release workflow does not run, inspect tag filters and event permissions.",
      "If the pipeline builds the wrong version, compare the tag's commit with the release metadata.",
      "If tag creation fails, check whether the name already exists.",
      "If a shallow clone cannot access required tag history, inspect the checkout depth configuration."
    ],
    bestPractices: [
      "Create tags only after release validation.",
      "Use annotated tags for important releases.",
      "Keep tag names consistent and immutable.",
      "Record the commit and artifact associated with each release.",
      "Protect release tags against unauthorized changes.",
      "Retain release notes and rollback references."
    ],
    securityConsiderations: [
      "Restrict release tag creation and deletion.",
      "Use signed tags where organizational policy requires verification.",
      "Verify tag signatures before trusted release operations.",
      "Protect tag-triggered workflows and deployment credentials.",
      "Prevent untrusted tag events from accessing production secrets.",
      "Maintain traceability between release tags and deployed artifacts."
    ]
  },

  "GitOps": {
    purpose: "GitOps is an operational approach in which Git repositories store the desired declarative state of applications and infrastructure. Automated controllers compare the desired state with the actual environment and reconcile differences. GitOps commonly supports reviewable, traceable and repeatable Kubernetes deployments.",
    project: "A team stores Kubernetes manifests and Helm configuration in Git. Argo CD watches the repository, detects a new approved application version and synchronizes the cluster so the deployed resources match the committed desired state.",
    workflow: [
      "Define application and infrastructure configuration declaratively.",
      "Store the desired state in a version-controlled Git repository.",
      "Review and approve changes through pull requests.",
      "Merge the approved configuration into the designated branch.",
      "A GitOps controller detects the repository revision change.",
      "The controller compares desired resources with live cluster state.",
      "The controller reconciles permitted differences and reports synchronization health.",
      "Teams inspect Git history and controller status to trace deployment changes."
    ],
    commands: [
      "git status",
      "git diff",
      "git log --oneline",
      "kubectl get applications -A",
      "kubectl get pods -n argocd",
      "argocd app list",
      "argocd app get my-application",
      "argocd app diff my-application"
    ],
    mistakes: [
      "Making manual production changes without recording the desired state in Git.",
      "Storing plaintext secrets in Git repositories.",
      "Allowing multiple deployment tools to manage the same Kubernetes resources.",
      "Giving GitOps controllers broader cluster permissions than required.",
      "Ignoring synchronization failures and health status.",
      "Changing live resources without understanding reconciliation behavior."
    ],
    configuration: [
      "Organize repositories by application, environment or platform ownership.",
      "Define declarative Kubernetes manifests, Helm values or supported configuration formats.",
      "Configure the GitOps controller with the correct repository, revision and destination cluster.",
      "Use separate overlays or values for development, staging and production.",
      "Define synchronization policies and pruning behavior carefully.",
      "Configure repository authentication, health checks and access controls."
    ],
    troubleshooting: [
      "If an application is not detected, inspect repository URL, branch, path and controller access.",
      "If synchronization fails, inspect controller events, comparison errors and Kubernetes API permissions.",
      "If an application remains OutOfSync, compare the desired manifest with live resources.",
      "If resources are repeatedly reverting, identify the controller responsible for reconciliation.",
      "If deployment fails due to invalid manifests, validate YAML and resource schemas.",
      "If repository authentication fails, inspect credentials, SSH keys, certificates and network connectivity."
    ],
    bestPractices: [
      "Treat Git as the authoritative desired-state source.",
      "Use pull requests and automated validation for production changes.",
      "Separate environment configuration clearly.",
      "Prefer immutable image references.",
      "Monitor reconciliation health and synchronization failures.",
      "Use tested rollback procedures based on known Git revisions.",
      "Avoid uncontrolled manual changes to GitOps-managed resources."
    ],
    securityConsiderations: [
      "Never commit plaintext production secrets.",
      "Use encrypted secret management or an approved external secret provider.",
      "Grant GitOps controllers least-privilege cluster permissions.",
      "Protect repositories and require review for production configuration.",
      "Restrict who can modify repository credentials and deployment policies.",
      "Audit reconciliation actions and changes to production access controls."
    ]
  }
};
