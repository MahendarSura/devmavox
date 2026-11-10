import type { CicdTopicLesson } from "./cicd-topic-lessons";

export const stageTwoLessonOverrides: Partial<Record<string, CicdTopicLesson>> = {
  "2|Git and GitHub Fundamentals": {
    overview: "Git is a distributed version control system that records changes to source code. GitHub is a cloud-based platform that hosts Git repositories and provides collaboration features such as pull requests, code reviews, issues, branch protection, and automation. Git runs on a developer machine and communicates with remote repositories when developers push or pull changes.",
    purpose: "Git allows multiple developers to work on the same application without overwriting one another's work. GitHub provides a central collaboration platform where teams review and approve changes. In a CI/CD pipeline, a developer commits application code and pushes it to GitHub. A webhook or GitHub Actions workflow can then trigger automated builds, tests, security scans, and deployment activities.",
    architecture: "Git maintains a working directory, staging area, local repository, and remote repository. The working directory contains files being edited. The staging area contains selected changes for the next commit. The local repository stores commits and branches. GitHub hosts the remote repository and exposes collaboration and automation capabilities. Each commit identifies a snapshot using a unique hash.",
    workflow: [
      "Install Git and verify the installed version.",
      "Configure the developer name and email used in commits.",
      "Create or clone the application repository.",
      "Modify source files in the working directory.",
      "Review changes and stage the required files.",
      "Create a commit with a meaningful message.",
      "Push commits to the remote GitHub repository.",
      "Use pull requests and code reviews to integrate team changes."
    ],
    example: "A DevMavox payment-service developer updates the payment validation logic. The developer creates a feature branch, changes the Java service, runs tests, stages the modified files, and commits the change. The branch is pushed to GitHub. A pull request allows another developer to review the implementation before it is merged into the main branch. The merge can trigger the Jenkins or GitHub Actions CI pipeline.",
    commands: [
      "git --version — verify the installed Git version.",
      "git config --global user.name \"Developer Name\" — configure the commit author name.",
      "git config --global user.email \"developer@example.com\" — configure the commit email.",
      "git init — initialize a local repository.",
      "git clone https://github.com/organization/payment-service.git — clone a remote repository.",
      "git status — inspect the current working tree.",
      "git log --oneline — view recent commits.",
      "git remote -v — inspect configured remote repositories."
    ],
    configuration: "Configure user.name and user.email for accurate commit attribution. Use SSH keys or an approved credential manager for authentication. Configure the remote origin to point to the correct GitHub repository. Add a .gitignore file to exclude generated files, IDE metadata, logs, build output, and local environment files. Never store passwords, private keys, or production credentials in the repository.",
    failures: [
      "Git commands are unavailable because Git is not installed or its executable is missing from PATH.",
      "Commits show an incorrect author because user.name or user.email is configured incorrectly.",
      "Authentication fails because the SSH key, token, or repository permissions are incorrect.",
      "Push is rejected because the remote branch contains commits not present locally.",
      "Developers accidentally commit generated build output or sensitive configuration.",
      "The local repository points to an incorrect remote URL."
    ],
    recovery: [
      "Verify Git installation with git --version and correct PATH if necessary.",
      "Inspect git config --list and correct the author configuration.",
      "Check git remote -v and confirm the remote repository URL.",
      "Verify SSH authentication or refresh the approved GitHub credential.",
      "Fetch remote changes and integrate them before retrying a rejected push.",
      "Inspect committed files and follow the repository cleanup and secret-rotation process if sensitive information was exposed."
    ],
    bestPractices: [
      "Use descriptive commit messages that explain the purpose of a change.",
      "Create feature branches instead of developing directly on the protected main branch.",
      "Keep commits focused on one logical change.",
      "Review git status before staging and committing.",
      "Use .gitignore for generated and local-only files.",
      "Protect repository access with least-privilege permissions.",
      "Require code review and automated checks before production changes.",
      "Never commit credentials or sensitive production data."
    ],
    exercise: "Create a GitHub repository named payment-service. Clone it locally, add a README.md file, configure your Git author details, and make an initial commit. Create a feature branch, add a sample application file, stage and commit the change, and push the branch to GitHub. Verify the commit history and remote repository contents."
  },

  "2|Repository Management": {
    overview: "A Git repository is the managed location where project files, commit history, branches, tags, and configuration are stored. GitHub repository management adds remote hosting, access control, repository settings, collaboration, visibility, and automation. A well-managed repository provides a reliable source of truth for application development and CI/CD execution.",
    purpose: "Repository management ensures developers work against the correct source code and follow consistent collaboration rules. DevOps teams use repositories to maintain application code, Dockerfiles, Kubernetes manifests, Helm charts, pipeline definitions, and documentation. Correct repository settings reduce accidental changes, unauthorized access, and inconsistent builds.",
    architecture: "A repository contains tracked files, commits, branches, tags, and Git metadata. A local clone communicates with a remote GitHub repository through a configured remote such as origin. GitHub stores repository settings, collaborators, teams, branch rules, webhooks, and pull request history. Organizations can group repositories and apply centralized access policies.",
    workflow: [
      "Create a repository under the correct GitHub account or organization.",
      "Choose private or public visibility based on project requirements.",
      "Initialize the repository with an appropriate README and .gitignore.",
      "Clone the repository and verify the origin remote.",
      "Configure collaborator and team permissions.",
      "Organize source code, pipeline files, deployment manifests, and documentation.",
      "Review repository settings and protect important branches.",
      "Monitor repository activity and periodically review access."
    ],
    example: "A DevMavox organization maintains separate repositories for payment-service, infrastructure, and deployment configuration. Application developers receive write access to the application repository, while production deployment permissions are restricted to an approved release team. Jenkins checks out the application repository and builds the version associated with the approved commit.",
    commands: [
      "git init — create a repository in the current directory.",
      "git clone <repository-url> — create a local copy of a remote repository.",
      "git remote -v — display remote repository URLs.",
      "git remote set-url origin <repository-url> — update the origin URL.",
      "git fetch origin — download remote references without merging.",
      "git ls-remote origin — inspect references available on the remote.",
      "git status — inspect repository changes.",
      "git log --oneline --decorate --all — inspect repository history."
    ],
    configuration: "Use a meaningful repository name and description. Select visibility carefully and use organization ownership for team-managed projects. Configure default branch settings, collaborator permissions, team access, branch protection, and repository rulesets. Add README.md, .gitignore, and contribution instructions. Store CI/CD secrets in approved secret-management settings rather than committed files.",
    failures: [
      "A developer clones the wrong repository or an outdated repository URL.",
      "A repository is accidentally made public and exposes internal source code.",
      "A team member cannot push because repository permissions are insufficient.",
      "The default branch is inconsistent across development and automation environments.",
      "Repository settings allow direct changes to critical production branches.",
      "A CI job checks out the wrong repository or branch."
    ],
    recovery: [
      "Verify the repository owner, name, URL, and configured origin.",
      "Correct visibility and immediately assess whether confidential information was exposed.",
      "Ask an organization administrator to review team and collaborator permissions.",
      "Standardize the default branch and update automation references.",
      "Enable appropriate branch protection or repository rulesets.",
      "Review pipeline checkout configuration and verify the exact commit being built."
    ],
    bestPractices: [
      "Use organization-owned repositories for business-critical applications.",
      "Choose repository visibility according to data classification.",
      "Grant permissions through teams wherever practical.",
      "Document repository purpose, setup, and contribution workflow.",
      "Keep application source and deployment configuration organized.",
      "Protect critical branches against unreviewed changes.",
      "Review inactive collaborators and access permissions periodically.",
      "Use consistent naming conventions across repositories."
    ],
    exercise: "Create a private GitHub repository named payment-service under your organization or personal account. Add a README.md and .gitignore, clone it locally, verify the origin URL, create a feature branch, and push a sample application file. Review the repository settings and identify which users have read, write, and administrative access."
  },

  "2|Branching Strategy": {
    overview: "A branching strategy defines how developers create, maintain, merge, and retire Git branches. Branches allow independent development without immediately changing the main code line. Common approaches include feature branching, GitHub Flow, Git Flow, and release branching. The selected strategy should match team size, release frequency, testing requirements, and production deployment practices.",
    purpose: "A clear branching strategy prevents unreviewed development changes from entering production. It separates feature work, bug fixes, release preparation, and emergency fixes. CI/CD pipelines can validate each branch differently, such as running pull request tests for feature branches and deployment workflows for approved release branches.",
    architecture: "The main branch represents the primary integration line. Feature branches contain isolated development work. Optional release branches stabilize a release, while hotfix branches address urgent production defects. Pull requests connect branches through review and automated validation. Branch protection enforces required checks before changes are integrated.",
    workflow: [
      "Identify the type of work: feature, bug fix, release, or hotfix.",
      "Update the local main branch from the remote repository.",
      "Create a branch using the team's naming convention.",
      "Implement the change and commit related updates.",
      "Push the branch to GitHub.",
      "Open a pull request against the intended target branch.",
      "Run automated checks and complete code review.",
      "Merge the approved change and remove the completed branch."
    ],
    example: "A developer adds refund support to a payment service. The developer creates feature/refund-api from the latest main branch. Jenkins runs compilation and unit tests for the pull request. After review and approval, the branch is merged into main. The integration pipeline builds the merged commit and creates a deployable artifact.",
    commands: [
      "git branch — list local branches.",
      "git branch -a — list local and remote-tracking branches.",
      "git switch main — switch to the main branch.",
      "git pull --ff-only origin main — update main without creating an unnecessary merge commit.",
      "git switch -c feature/refund-api — create and switch to a feature branch.",
      "git push -u origin feature/refund-api — publish the branch and configure upstream tracking.",
      "git branch -d feature/refund-api — delete a merged local branch.",
      "git push origin --delete feature/refund-api — delete a remote branch when permitted."
    ],
    configuration: "Choose a documented branch naming convention such as feature/, bugfix/, hotfix/, and release/. Define the target branch for pull requests and configure required checks on protected branches. Decide whether the team uses merge commits, squash merges, or rebase merges. Ensure CI workflows validate the branches that are allowed to enter production.",
    failures: [
      "A feature branch is created from an outdated main branch.",
      "Developers commit directly to main instead of using pull requests.",
      "Two developers create branches with unclear or conflicting names.",
      "A pull request targets the wrong base branch.",
      "A long-lived feature branch accumulates many integration conflicts.",
      "A branch is deleted before its work is safely merged or preserved."
    ],
    recovery: [
      "Fetch the latest remote references and compare the branch with main.",
      "Create a backup branch before performing risky history changes.",
      "Move unfinished work to a correctly named branch if necessary.",
      "Correct the pull request base branch after checking the intended release flow.",
      "Integrate main regularly and resolve conflicts in a controlled environment.",
      "Restore a deleted branch from a known commit when its work is recoverable."
    ],
    bestPractices: [
      "Keep feature branches short-lived.",
      "Start new work from an updated base branch.",
      "Use meaningful branch names linked to tickets or requirements.",
      "Require pull requests for protected branches.",
      "Run automated tests before merging.",
      "Avoid mixing unrelated changes in one branch.",
      "Document the team's branching and release strategy.",
      "Delete merged branches after confirming no further work depends on them."
    ],
    exercise: "Create a GitHub repository with a main branch. Create feature/payment-validation from the latest main branch, add a validation change, commit it, and push the branch. Open a pull request, review the base and compare branches, and merge it using the team's selected merge method. Confirm that the change is available in main."
  },

  "2|Commit History": {
    overview: "Git commit history records the sequence of snapshots that changed a repository. Each commit contains a unique identifier, author information, timestamp, commit message, and references to parent commits. History allows developers to understand how code evolved, identify when defects were introduced, compare changes, and restore earlier versions when necessary.",
    purpose: "Commit history provides traceability for application changes and supports incident investigation. When a payment service starts failing after a deployment, engineers can identify the commits included in the release and inspect the exact code differences. CI/CD systems can associate build artifacts and deployment records with commit hashes.",
    architecture: "Git stores commits as objects connected through parent relationships. Branches and tags point to commits. Commands such as log, show, diff, and blame expose different views of history. Remote repositories preserve shared history, while local repositories allow developers to inspect and create commits before pushing them.",
    workflow: [
      "Make a focused source-code change.",
      "Inspect the working tree with git status.",
      "Review the exact difference using git diff.",
      "Stage only the intended files.",
      "Create a commit with a meaningful message.",
      "Inspect the new commit using git show and git log.",
      "Push the commit to the remote branch.",
      "Associate the commit with a pull request, ticket, or release."
    ],
    example: "A payment-service deployment introduces a rounding defect. The engineer checks the release commit hash and uses git log to identify the commits included in the release. The engineer inspects the relevant change with git show and uses git blame to understand when the calculation line was modified. The team prepares a corrective commit and validates it through CI.",
    commands: [
      "git log --oneline — display compact commit history.",
      "git log --graph --oneline --all — visualize branch history.",
      "git show <commit-hash> — inspect a commit and its changes.",
      "git diff — inspect unstaged changes.",
      "git diff --staged — inspect staged changes.",
      "git diff <commit-a> <commit-b> — compare two commits.",
      "git blame <file> — inspect the commit associated with each line.",
      "git show --stat <commit-hash> — inspect the files changed by a commit."
    ],
    configuration: "Use commit messages that explain the reason for a change. Teams may adopt Conventional Commits such as feat:, fix:, docs:, and refactor:. Configure author identity correctly and avoid rewriting shared history after others have based work on it. Preserve commit hashes in release records so deployed artifacts can be traced to source.",
    failures: [
      "Commit history contains unclear messages such as update or changes.",
      "A developer stages unrelated files and includes them in a commit.",
      "A commit is created with an incorrect author identity.",
      "A developer cannot locate the commit that introduced a defect.",
      "A shared commit is rewritten and causes synchronization problems.",
      "A release cannot be traced to the exact source commit."
    ],
    recovery: [
      "Inspect git status and git show before changing commit contents.",
      "Use git restore --staged <file> to unstage an accidentally staged file.",
      "Correct future author configuration and follow team policy for existing commits.",
      "Use git log, git diff, and git blame to narrow down the change that introduced the defect.",
      "Prefer git revert for reversing changes already shared with other developers.",
      "Record the source commit hash alongside each build and release artifact."
    ],
    bestPractices: [
      "Make small commits that represent one logical change.",
      "Write messages that explain why the change was needed.",
      "Review staged differences before committing.",
      "Use commit hashes to identify exact source versions.",
      "Avoid force-pushing shared branches without an approved recovery plan.",
      "Use git revert for safe reversal of published changes.",
      "Link commits to pull requests and work items.",
      "Preserve source-to-build-to-deployment traceability."
    ],
    exercise: "Create a repository and make three commits: initial application setup, payment validation, and unit tests. Inspect the history using git log --graph --oneline. Use git show to inspect the payment validation commit and git blame to identify the commit responsible for a selected source line. Record the final commit hash."
  },

  "2|Pull Request Lifecycle": {
    overview: "A pull request is a GitHub collaboration mechanism used to propose changes from one branch into another. It presents the changed files, commit history, discussion, automated checks, approvals, and merge controls. The pull request lifecycle begins when a developer publishes a branch and ends when the approved changes are merged or the request is closed.",
    purpose: "Pull requests create a controlled integration point between developers and protect important branches from unreviewed changes. They allow teams to validate application logic, discuss implementation decisions, run CI checks, and approve changes before integration. Pull request events can also trigger automated build and security workflows.",
    architecture: "A source branch contains the proposed changes and a base branch receives them. GitHub calculates the difference between the branches and displays commits and changed files. Reviewers submit comments or approvals. Required status checks report CI results. Merge controls apply the selected merge strategy after all repository rules are satisfied.",
    workflow: [
      "Create a feature branch from the correct base branch.",
      "Implement and locally test the change.",
      "Commit the changes and push the branch to GitHub.",
      "Open a pull request with the correct base and compare branches.",
      "Write a description covering purpose, implementation, and testing.",
      "Allow automated CI checks to execute.",
      "Address reviewer comments and push follow-up commits.",
      "Obtain required approvals and merge the pull request.",
      "Delete the feature branch when appropriate."
    ],
    example: "A developer implements a new refund endpoint in payment-service. After pushing feature/refund-api, the developer opens a pull request into main. GitHub Actions or Jenkins runs unit tests and security checks. A reviewer identifies missing validation, so the developer pushes a correction. Once required checks pass and approval is recorded, the change is merged.",
    commands: [
      "git switch -c feature/refund-api — create the source branch.",
      "git add . — stage changes after reviewing the working tree.",
      "git commit -m \"feat: add refund API validation\" — create a commit.",
      "git push -u origin feature/refund-api — publish the source branch.",
      "git fetch origin — refresh remote references.",
      "git diff origin/main...HEAD — inspect changes relative to the target branch.",
      "git log --oneline origin/main..HEAD — list commits not yet in main.",
      "git switch main; git pull --ff-only origin main — update the local target branch."
    ],
    configuration: "Configure a pull request template containing purpose, change summary, testing evidence, deployment impact, and rollback considerations. Define required reviewers and status checks in branch protection or repository rulesets. Enable the merge methods approved by the team. Ensure CI workflows validate pull request changes before merge.",
    failures: [
      "A pull request targets the wrong base branch.",
      "Automated checks fail because the proposed code does not compile or pass tests.",
      "The pull request has merge conflicts.",
      "Required approvals are missing.",
      "A reviewer cannot understand the change because the description is incomplete.",
      "A new commit invalidates previously successful checks or approvals under repository policy."
    ],
    recovery: [
      "Verify the base and compare branches and correct the target when necessary.",
      "Read the failing CI logs and reproduce the failure locally.",
      "Update the feature branch with the latest target branch and resolve conflicts.",
      "Request review from the appropriate code owners or team members.",
      "Improve the pull request description with implementation and test details.",
      "Wait for the latest required checks to complete before merging."
    ],
    bestPractices: [
      "Keep pull requests focused and reasonably small.",
      "Use descriptive titles and complete change descriptions.",
      "Include test results and relevant screenshots or evidence.",
      "Require review for important application and infrastructure changes.",
      "Treat CI failures as merge blockers when required by policy.",
      "Resolve reviewer comments before requesting final approval.",
      "Do not merge unreviewed production changes.",
      "Record the merged commit or pull request number in release documentation."
    ],
    exercise: "Create feature/refund-api in a GitHub repository, add a sample endpoint and tests, and push the branch. Open a pull request into main with a clear description. Review the changed files, inspect the checks, add a reviewer comment, push a correction, and complete the approval and merge process."
  },

  "2|Code Review": {
    overview: "Code review is the process of examining proposed source-code changes before they are integrated into a shared branch. Reviewers evaluate correctness, readability, security, maintainability, test coverage, performance, and compatibility. GitHub provides inline comments, review states, suggestions, approvals, and code-owner workflows.",
    purpose: "Code review identifies defects before they reach production and spreads technical knowledge across the team. In a CI/CD environment, automated tests check repeatable conditions while human reviewers assess design choices and business correctness. A review process is especially important for payment logic, authentication, infrastructure configuration, and deployment workflows.",
    architecture: "A pull request displays the proposed diff between a source branch and a target branch. Reviewers can comment on individual lines or submit an overall review. Review states commonly include comment, approve, and request changes. CODEOWNERS can assign responsible reviewers for selected paths. Branch rules can require approval before merging.",
    workflow: [
      "Open the pull request and read its purpose and implementation summary.",
      "Understand the business requirement and expected behavior.",
      "Inspect changed files and compare them with the target branch.",
      "Check correctness, edge cases, error handling, and security.",
      "Review test coverage and automated CI results.",
      "Add clear comments that explain the issue and suggested improvement.",
      "Recheck the developer's updates.",
      "Approve the change only when review requirements are satisfied."
    ],
    example: "A developer changes the payment amount validation method. A reviewer checks whether negative values, zero values, decimal precision, and missing input are handled correctly. The reviewer also checks that sensitive payment details are not written to logs and that unit tests cover failure cases. The pull request is approved only after the issues are corrected.",
    commands: [
      "git diff origin/main...HEAD — inspect proposed branch changes.",
      "git diff --check — detect whitespace errors and conflict markers.",
      "git show --stat HEAD — inspect the latest commit summary.",
      "git status — confirm the developer's working tree state.",
      "git log --oneline origin/main..HEAD — inspect proposed commits.",
      "git grep \"password\" — search tracked source files for a sensitive term.",
      "mvn test — run Java project tests when applicable.",
      "git diff --name-only origin/main...HEAD — list changed files."
    ],
    configuration: "Create a pull request review policy that identifies required approvals and code owners. Use CODEOWNERS to route changes in sensitive directories to responsible teams. Configure required automated checks and prohibit bypassing review for protected branches except through a documented emergency process. Define review expectations for application code, tests, Dockerfiles, pipeline definitions, and Kubernetes manifests.",
    failures: [
      "Reviewers approve changes without reading the actual diff.",
      "Important edge cases are not covered by tests.",
      "Review comments are vague and do not explain the problem.",
      "A developer merges before resolving requested changes.",
      "Sensitive files are changed without review from the responsible team.",
      "Automated tests pass but a business rule is implemented incorrectly."
    ],
    recovery: [
      "Reopen the diff and inspect every changed file before approval.",
      "Ask for tests covering missing, invalid, and boundary inputs.",
      "Write actionable comments with a reason and an expected correction.",
      "Use repository rules to prevent merging while required changes remain.",
      "Assign the appropriate code owner to sensitive changes.",
      "Create a follow-up defect or corrective pull request if an issue is discovered after merge."
    ],
    bestPractices: [
      "Review correctness before formatting preferences.",
      "Keep comments respectful, specific, and actionable.",
      "Check tests, security, error handling, and backward compatibility.",
      "Avoid approving changes you do not understand.",
      "Use code owners for high-risk application areas.",
      "Review small changes frequently instead of large accumulated changes.",
      "Document important architectural decisions.",
      "Treat code review as a shared engineering responsibility."
    ],
    exercise: "Create a pull request that changes a sample payment validation method. Review the diff as another team member. Identify one correctness issue, one missing test case, and one maintainability improvement. Add inline review comments, update the implementation, rerun tests, and submit an approval after verifying the corrections."
  },

  "2|Branch Protection Rules": {
    overview: "Branch protection rules are GitHub repository controls that restrict how selected branches can be modified. They can require pull requests, approvals, status checks, signed commits, linear history, or restrictions on who can push. Repository rulesets provide a related policy mechanism for enforcing repository-wide or branch-targeted rules.",
    purpose: "Protected branches prevent accidental or unauthorized changes to important code lines. A production main branch should not accept untested code simply because a developer has push access. Branch policies connect code review and CI validation with the actual merge decision.",
    architecture: "GitHub evaluates branch protection or ruleset requirements when a user attempts a protected operation. Pull request requirements, approval counts, required status checks, and push restrictions determine whether the change can be merged. CI providers report status checks against commits or pull requests. Authorized administrators may have configured bypass behavior, which must be governed carefully.",
    workflow: [
      "Identify branches that require protection, such as main and release branches.",
      "Open repository settings and locate branch protection or ruleset controls.",
      "Define the target branch pattern.",
      "Require pull requests and an appropriate approval count.",
      "Select required CI status checks.",
      "Configure restrictions on direct pushes and force pushes.",
      "Save the policy and test it with a normal developer account.",
      "Review bypass permissions and periodically verify policy effectiveness."
    ],
    example: "A payment-service repository protects main with required pull requests, two approvals for high-risk changes, and successful unit-test and security-scan checks. A developer cannot push directly to main. The developer must open a pull request, obtain approval, and wait for the CI checks before GitHub permits the merge.",
    commands: [
      "git push origin main — a direct push that may be rejected by branch protection.",
      "git push -u origin feature/payment-fix — publish a feature branch.",
      "git status — inspect local changes before creating a pull request.",
      "git fetch origin — retrieve current remote references.",
      "git log --oneline origin/main..HEAD — inspect commits proposed for integration.",
      "git diff origin/main...HEAD — review proposed changes.",
      "gh repo view --json nameWithOwner,defaultBranchRef — inspect repository information using GitHub CLI.",
      "gh pr checks — inspect checks for the current pull request using GitHub CLI."
    ],
    configuration: "In GitHub repository settings, configure branch protection or rulesets for main and release branches. Require pull requests, approvals, and selected status checks. Disable force pushes and branch deletion where appropriate. Restrict bypass permissions to explicitly authorized roles. Ensure the required check names match the checks actually reported by the CI workflows.",
    failures: [
      "A direct push is rejected because the target branch is protected.",
      "A pull request cannot merge because a required status check is missing.",
      "The required check name does not match the CI provider's reported check.",
      "A developer cannot merge because the required approval count is not satisfied.",
      "An administrator bypasses controls without a documented reason.",
      "A branch pattern does not match the intended production branch."
    ],
    recovery: [
      "Use a feature branch and submit a pull request instead of bypassing protection.",
      "Inspect the pull request checks and identify the missing or failing status.",
      "Correct the CI workflow or required check configuration.",
      "Request the required approvals from eligible reviewers.",
      "Review ruleset patterns and confirm they target the intended branches.",
      "Audit bypass permissions and document any emergency exception."
    ],
    bestPractices: [
      "Protect main and production release branches.",
      "Require pull requests for production-bound changes.",
      "Require meaningful CI checks before merge.",
      "Use code owners for sensitive directories.",
      "Restrict force pushes and branch deletion.",
      "Minimize administrator bypass permissions.",
      "Test protection policies using ordinary developer permissions.",
      "Review repository rules after CI workflow changes."
    ],
    exercise: "Create a test GitHub repository and configure protection for main. Require pull requests, at least one approval, and a successful test status check. Attempt a direct push and confirm that it is blocked. Then create a feature branch, open a pull request, satisfy the configured requirements, and merge it."
  },

  "2|Merge Strategies": {
    overview: "A Git merge strategy determines how changes from one branch are integrated into another. GitHub commonly offers merge commits, squash merges, and rebase merges as pull request merge methods. The selected method affects commit history, traceability, and how individual feature changes appear in the target branch.",
    purpose: "A consistent merge strategy keeps repository history understandable and reduces confusion during troubleshooting and releases. Teams choose a strategy based on whether they need to preserve individual commits, create a single feature-level commit, or maintain a linear history. CI/CD systems use the resulting commit history to identify source versions and release changes.",
    architecture: "A merge commit connects the histories of two branches with a new commit that has multiple parents. A squash merge combines the pull request changes into one new commit on the target branch. A rebase merge replays commits onto the target branch to create a linear history. GitHub repository settings control which merge methods are available.",
    workflow: [
      "Review the pull request and identify the target branch.",
      "Confirm all required tests and approvals are complete.",
      "Check whether the team requires merge, squash, or rebase history.",
      "Inspect the final pull request diff.",
      "Select the approved merge method in GitHub.",
      "Complete the merge and verify the resulting target branch history.",
      "Delete the feature branch when appropriate.",
      "Confirm that the merged commit triggers the expected CI workflow."
    ],
    example: "A developer completes a small payment validation feature using four local commits. The team prefers a clean main history, so the pull request is squash-merged into one commit. The resulting commit represents the complete feature and triggers the main-branch CI pipeline. For a larger release integration, the team may prefer a merge commit to preserve branch structure.",
    commands: [
      "git merge feature/payment-fix — merge a branch into the current branch.",
      "git merge --no-ff feature/payment-fix — create a merge commit even when fast-forward is possible.",
      "git merge --ff-only feature/payment-fix — allow only a fast-forward merge.",
      "git rebase main — replay the current branch commits on top of main.",
      "git log --graph --oneline --all — inspect branch and merge history.",
      "git show --summary HEAD — inspect the resulting commit.",
      "git status — check for an unfinished merge or rebase.",
      "git merge --abort — cancel an in-progress merge when safe."
    ],
    configuration: "Enable only the merge methods approved by the engineering team in GitHub repository settings. Document when each method should be used. If linear history is required, configure the corresponding repository rules and avoid merge commits where policy disallows them. Ensure release tooling can identify the final merged commit.",
    failures: [
      "A merge creates an unexpected history structure.",
      "A rebase changes commit hashes and confuses collaborators using the old branch history.",
      "A merge is attempted while the working tree contains conflicting changes.",
      "A team uses inconsistent merge methods across repositories.",
      "A feature branch is deleted before the resulting merge is verified.",
      "A release process incorrectly assumes every pull request creates a merge commit."
    ],
    recovery: [
      "Inspect git log --graph --oneline --all to understand the resulting history.",
      "Coordinate before rewriting any branch history that others may have fetched.",
      "Create a backup branch before a risky rebase or merge correction.",
      "Resolve or abort an unfinished operation using the appropriate Git command.",
      "Standardize merge settings and update team documentation.",
      "Use the final target-branch commit hash when identifying the integrated source."
    ],
    bestPractices: [
      "Choose one documented default merge method.",
      "Use squash merges for focused feature work when a clean history is preferred.",
      "Use merge commits when preserving branch integration history is important.",
      "Use rebase carefully and avoid rewriting shared branch history.",
      "Review the final diff before merging.",
      "Keep pull requests focused and understandable.",
      "Verify the target branch after merging.",
      "Make release automation independent of assumptions about merge commit shape."
    ],
    exercise: "Create two feature branches in a test repository. Merge one using a merge commit and the other using a squash merge through GitHub pull requests. Inspect both results with git log --graph --oneline --all. Compare the commit history and document which strategy your team would use for routine feature work."
  },

  "2|Merge Conflict Resolution": {
    overview: "A merge conflict occurs when Git cannot automatically combine changes from different branches. Conflicts commonly happen when two developers edit the same lines, modify the same file structure, or change related content in incompatible ways. Git marks unresolved files and requires a developer to choose or combine the intended changes.",
    purpose: "Conflict resolution allows teams to integrate parallel development safely without silently losing valid changes. In CI/CD projects, unresolved conflicts can prevent pull requests from merging and delay releases. Correct resolution must preserve business behavior, not merely remove Git conflict markers.",
    architecture: "During a three-way merge, Git compares the common ancestor, the current branch, and the incoming branch. If changes can be combined automatically, Git completes the merge. Otherwise it marks conflicted files. The developer edits the files, stages the resolved versions, and completes the merge or rebase operation.",
    workflow: [
      "Fetch the latest remote changes.",
      "Update the target branch and identify the source of the conflict.",
      "Start the merge or rebase operation in a clean working tree.",
      "Run git status to identify conflicted files.",
      "Open each conflicted file and inspect both versions.",
      "Combine the intended behavior and remove conflict markers.",
      "Run relevant tests to verify the resolved implementation.",
      "Stage resolved files and complete the merge or rebase.",
      "Push the updated branch and verify the pull request."
    ],
    example: "Two developers edit the payment validation method. One changes the minimum payment rule while another adds currency validation to the same method. Git reports a conflict. The developer combines both rules, adds tests for invalid amounts and unsupported currencies, runs the test suite, and completes the merge so neither valid change is lost.",
    commands: [
      "git fetch origin — retrieve the latest remote changes.",
      "git status — identify files with unresolved conflicts.",
      "git diff --name-only --diff-filter=U — list unresolved files.",
      "git diff — inspect conflict-related changes.",
      "git diff --ours -- <file> — inspect the current branch version.",
      "git diff --theirs -- <file> — inspect the incoming version during a merge.",
      "git add <file> — mark a file as resolved after editing.",
      "git merge --continue — complete a merge after resolving conflicts.",
      "git merge --abort — abandon the current merge when appropriate."
    ],
    configuration: "Use a consistent line-ending policy through .gitattributes, especially when developers use different operating systems. Configure suitable merge tools where helpful. Keep branches reasonably short-lived and encourage frequent integration. Protect critical branches so conflicted or unreviewed changes cannot be merged without validation.",
    failures: [
      "Conflict markers such as <<<<<<< and >>>>>>> remain in the source file.",
      "A developer selects one side and accidentally removes valid functionality.",
      "The merge is completed without running tests.",
      "A file remains unresolved in the Git index.",
      "Different line-ending conventions create unnecessary conflicts.",
      "A developer aborts or restarts an operation without understanding the repository state."
    ],
    recovery: [
      "Run git status and identify the exact operation in progress.",
      "Open each conflicted file and compare both implementations with the business requirement.",
      "Remove all conflict markers after combining the intended code.",
      "Use git diff --check to detect remaining markers and whitespace problems.",
      "Run unit and integration tests relevant to the changed behavior.",
      "Stage resolved files and continue the operation, or abort and restart if the resolution is unsafe."
    ],
    bestPractices: [
      "Pull or fetch regularly to reduce long-lived branch divergence.",
      "Communicate before changing shared configuration or critical files.",
      "Understand both sides of a conflict before editing.",
      "Do not blindly select ours or theirs for business logic.",
      "Run tests after every meaningful conflict resolution.",
      "Use consistent line-ending settings.",
      "Keep conflict resolution inside a focused commit.",
      "Request a second review for high-risk conflict resolutions."
    ],
    exercise: "Create a test repository with a sample payment-rules.txt file. Create two branches and modify the same line differently in each branch. Merge one branch into the other and observe the conflict. Combine both intended changes, remove conflict markers, run git diff --check, stage the file, and complete the merge."
  },

  "2|GitHub Webhooks": {
    overview: "A GitHub webhook is an HTTP callback that sends an event payload from GitHub to an external service. Events can include push, pull request, release, issue, and workflow-related activities. Webhooks allow external systems such as Jenkins to react automatically when repository activity occurs.",
    purpose: "Webhooks connect source-code collaboration with automated delivery systems. When a developer pushes a commit or opens a pull request, GitHub can notify Jenkins or another integration service. The receiving service can then start builds, tests, quality scans, or other approved automation without requiring manual polling.",
    architecture: "A webhook is configured with a destination URL, selected event types, and optional security settings. When a selected event occurs, GitHub sends an HTTP request containing headers and a JSON payload. The receiver validates the request, processes the event, and returns an HTTP response. A shared secret can be used to verify the HMAC signature.",
    workflow: [
      "Identify the external service that should receive repository events.",
      "Expose a reachable HTTPS webhook endpoint.",
      "Configure the webhook URL in GitHub repository settings.",
      "Select only the events required by the integration.",
      "Configure a webhook secret and secure the receiving service.",
      "Trigger a test event such as a push.",
      "Inspect the delivery status, response code, and payload.",
      "Confirm that the receiving CI system processes the event correctly."
    ],
    example: "A developer pushes a payment-service feature branch to GitHub. GitHub sends a push event to the configured Jenkins webhook endpoint. Jenkins validates the event and starts the appropriate branch build. The pipeline checks out the commit identified by the event, runs Maven tests, performs security checks, and reports the result.",
    commands: [
      "git push origin feature/payment-api — generate a push event.",
      "curl -I https://ci.example.com/github-webhook/ — inspect endpoint HTTP response headers.",
      "curl -X POST https://webhook.site/example -H \"Content-Type: application/json\" -d '{\"event\":\"test\"}' — send a sample request to a controlled test endpoint.",
      "Get-Service -Name Jenkins — inspect Jenkins service status on Windows.",
      "sudo systemctl status jenkins — inspect Jenkins service status on Linux.",
      "sudo journalctl -u jenkins -n 100 --no-pager — inspect recent Jenkins service logs.",
      "git rev-parse HEAD — identify the current commit hash."
    ],
    configuration: "In GitHub repository settings, open Webhooks and add the receiver URL. Select the required event types, such as push and pull request. Use HTTPS and configure a strong shared secret. The receiving service must validate the X-Hub-Signature-256 header using the raw request body and the configured secret. Avoid exposing internal credentials in webhook payloads or logs.",
    failures: [
      "GitHub reports a connection timeout because the endpoint is unreachable.",
      "The endpoint returns HTTP 404 because the configured path is incorrect.",
      "The receiver returns HTTP 401 or 403 because authentication or signature validation fails.",
      "The webhook sends events that the integration does not need.",
      "A proxy or firewall blocks inbound requests.",
      "The receiver accepts a request but does not trigger the expected job."
    ],
    recovery: [
      "Inspect the webhook delivery history and read the response code and error.",
      "Verify DNS, HTTPS certificate, firewall, proxy, and endpoint path.",
      "Check receiver logs and confirm that the expected event type is supported.",
      "Validate the HMAC signature using the correct secret and raw payload bytes.",
      "Confirm the GitHub repository and Jenkins job integration settings.",
      "Replay a failed delivery after correcting the receiver configuration."
    ],
    bestPractices: [
      "Use HTTPS for every production webhook endpoint.",
      "Validate webhook signatures before trusting event data.",
      "Subscribe only to required event types.",
      "Make event processing idempotent where duplicate delivery is possible.",
      "Log event identifiers and processing outcomes without exposing secrets.",
      "Monitor delivery failures and receiver availability.",
      "Restrict access to webhook configuration.",
      "Test webhook changes in a non-production repository first."
    ],
    exercise: "Create a test GitHub repository and configure a webhook to a controlled request-inspection endpoint. Subscribe to push events and trigger a push. Inspect the event headers and JSON payload. Then configure a test Jenkins webhook integration and verify that a repository push starts the intended job."
  },

  "2|GitHub Actions Integration": {
    overview: "GitHub Actions is an automation platform built into GitHub. It executes workflows in response to repository events, schedules, or manual triggers. Workflows are defined as YAML files under .github/workflows and contain jobs, steps, runners, actions, and configuration. It can automate builds, tests, code checks, container creation, and deployments.",
    purpose: "GitHub Actions reduces manual work by running repeatable automation close to the source repository. A CI workflow can compile a Java application and execute tests whenever a pull request is opened. A controlled deployment workflow can publish an image or deploy to a target environment after approval. It can complement or replace external CI tools depending on the organization's architecture.",
    architecture: "A workflow is triggered by an event such as push, pull_request, workflow_dispatch, or schedule. GitHub assigns jobs to hosted or self-hosted runners. Each job executes steps that use shell commands or reusable actions. Artifacts can preserve build outputs, while secrets and variables provide controlled configuration. Job dependencies define execution order.",
    workflow: [
      "Create the .github/workflows directory in the repository.",
      "Create a workflow YAML file with a name and trigger.",
      "Define jobs and select an appropriate runner.",
      "Add checkout and required build-tool setup steps.",
      "Run compilation, tests, and quality checks.",
      "Configure required secrets or variables securely.",
      "Commit and push the workflow file.",
      "Inspect the Actions tab and review execution logs.",
      "Add deployment jobs only after validation and approval requirements are defined."
    ],
    example: "A payment-service repository uses a GitHub Actions workflow triggered by pull_request and push events. The workflow checks out source code, configures Java, runs mvn clean verify, and uploads the test report. A separate protected deployment workflow can build a Docker image and publish it to a registry after the required release approval.",
    commands: [
      "mkdir -p .github/workflows — create the workflow directory on Linux or Git Bash.",
      "git status — inspect the new workflow file.",
      "git add .github/workflows/ci.yml — stage the CI workflow.",
      "git commit -m \"ci: add GitHub Actions build workflow\" — commit the workflow.",
      "git push origin feature/actions-ci — publish the workflow branch.",
      "mvn clean verify — run the example Java build locally.",
      "gh workflow list — list repository workflows using GitHub CLI.",
      "gh run list — list recent workflow executions using GitHub CLI."
    ],
    configuration: "Create a YAML workflow under .github/workflows. Define the minimum required triggers and permissions. Use actions/checkout to retrieve source code and a suitable setup action for the build tool. Pin third-party actions to reviewed versions or immutable commit SHAs according to organizational policy. Set explicit job permissions and use GitHub secrets for sensitive values.",
    failures: [
      "A workflow does not run because its YAML file is outside .github/workflows.",
      "The workflow YAML is invalid or contains an unsupported property.",
      "A workflow runs on the wrong branch or event.",
      "A job fails because the required Java or build tool is unavailable.",
      "An action cannot be downloaded or uses an incompatible version.",
      "A deployment job lacks the required permissions or secrets."
    ],
    recovery: [
      "Confirm the workflow file path and inspect the YAML syntax.",
      "Review the workflow trigger and branch filters.",
      "Open the failed job and inspect the first meaningful error in its logs.",
      "Verify runner availability and build-tool setup.",
      "Review action versions and permissions.",
      "Confirm secret names and deployment environment approvals without printing secret values.",
      "Rerun the workflow after correcting the root cause."
    ],
    bestPractices: [
      "Keep workflows small and reusable.",
      "Use explicit triggers and least-privilege permissions.",
      "Separate CI validation from production deployment.",
      "Protect production environments with approvals.",
      "Cache dependencies only when cache keys are correct.",
      "Pin and review third-party actions.",
      "Store credentials in GitHub secrets or approved external secret managers.",
      "Preserve test reports and build artifacts for troubleshooting."
    ],
    exercise: "Create .github/workflows/ci.yml in a sample Java repository. Configure it to run on pull_request and pushes to main. Add checkout, Java setup, and mvn clean verify steps. Push the workflow, open a pull request, inspect the Actions execution logs, and correct any failing configuration."
  },

  "2|Repository Secrets": {
    overview: "GitHub repository secrets are encrypted values used by workflows to access sensitive systems without storing credentials in source code. Examples include cloud access credentials, container registry tokens, deployment keys, and API tokens. GitHub also supports organization-level and environment-level secrets with different access scopes.",
    purpose: "Secrets allow CI/CD workflows to authenticate securely with external platforms. A deployment pipeline may need permission to publish a Docker image or access a cloud environment. Keeping credentials outside source files reduces accidental exposure and allows administrators to rotate access without changing application code.",
    architecture: "A repository administrator stores an encrypted secret in GitHub settings. A workflow references it through the secrets context. GitHub makes the value available to an authorized workflow step according to its scope and access policy. Environment protection rules can require approval before environment-specific secrets are made available.",
    workflow: [
      "Identify the external system that requires authentication.",
      "Create a dedicated credential with minimum required permissions.",
      "Open repository or organization secret settings.",
      "Add the secret with a clear and consistent name.",
      "Reference the secret in the workflow without hard-coding its value.",
      "Run a controlled workflow to verify authentication.",
      "Monitor access and rotate credentials according to policy.",
      "Revoke exposed or unused credentials immediately."
    ],
    example: "A payment-service CI workflow builds a Docker image and pushes it to a private registry. The registry username and token are stored as GitHub secrets. The workflow uses those values during the login step. The credentials are not written into the Dockerfile, application source code, or committed YAML file.",
    commands: [
      "gh secret list — list repository secret names using GitHub CLI.",
      "gh secret set REGISTRY_USERNAME — securely set a secret through the interactive GitHub CLI flow.",
      "gh secret set REGISTRY_TOKEN — securely set a registry token.",
      "gh secret list --org devmavox — inspect organization secret names when authorized.",
      "git grep -n \"TOKEN\" — search tracked files for suspicious token references.",
      "git log --all --oneline -- .github/workflows — inspect workflow history.",
      "docker login <registry> -u <username> --password-stdin — authenticate using standard input rather than a command-line password."
    ],
    configuration: "Create repository secrets under Settings, Secrets and variables, Actions. Use names such as REGISTRY_USERNAME and REGISTRY_TOKEN. Reference values through expressions such as ${{ secrets.REGISTRY_TOKEN }}. Restrict secret access to the required repositories and environments. Avoid echoing secrets, passing them as visible command-line arguments, or writing them into artifacts and logs.",
    failures: [
      "A workflow reports that a required secret is empty or unavailable.",
      "The secret name in YAML does not match the configured name.",
      "A forked pull request cannot access protected repository secrets.",
      "A token has expired or lacks the required permission.",
      "A secret is accidentally printed in logs or committed to Git.",
      "An environment protection rule prevents a secret from becoming available."
    ],
    recovery: [
      "Verify the secret name and scope without displaying its value.",
      "Check whether the workflow runs from a fork or protected environment.",
      "Create or rotate a credential with the required minimum permissions.",
      "Inspect the external service's authentication logs.",
      "Immediately revoke any credential that may have been exposed.",
      "Remove exposed credentials from active code and follow the repository history cleanup process where required.",
      "Rerun the workflow after validating the corrected configuration."
    ],
    bestPractices: [
      "Never commit credentials, private keys, or access tokens.",
      "Use short-lived credentials or OIDC federation where supported.",
      "Apply least-privilege permissions to every token.",
      "Separate development, staging, and production credentials.",
      "Use environment protection for production deployments.",
      "Rotate credentials regularly and after suspected exposure.",
      "Never print secrets in workflow logs.",
      "Audit secret access and remove unused credentials."
    ],
    exercise: "Create a test GitHub Actions workflow that authenticates to a non-production container registry. Store the registry username and token as repository secrets. Reference the secrets in the workflow, perform a controlled login, and verify that the job succeeds without printing credential values. Rotate the test token and confirm the updated workflow still works."
  },

  "2|Tags and Releases": {
    overview: "A Git tag is a named reference to a specific commit. Tags are commonly used to identify application versions such as v1.0.0 or v2.3.1. GitHub Releases provide a user-facing release record associated with a tag and can include release notes, downloadable assets, and version information.",
    purpose: "Tags and releases provide stable version identifiers for builds and deployments. Instead of deploying an uncertain branch state, a release pipeline can build a specific tag. This helps teams trace production artifacts to source code, reproduce builds, identify changes, and coordinate rollback to a known version.",
    architecture: "A lightweight tag points directly to a commit, while an annotated tag stores additional metadata such as tagger information and a message. Tags can be pushed to a remote repository. GitHub Releases associate release descriptions and assets with tags. CI/CD workflows can trigger when a matching tag is pushed.",
    workflow: [
      "Complete code review and required CI validation.",
      "Confirm the intended release commit.",
      "Choose a version number using the team's versioning policy.",
      "Create an annotated Git tag.",
      "Push the tag to the remote repository.",
      "Create a GitHub Release associated with the tag.",
      "Generate release notes and attach approved artifacts if needed.",
      "Trigger the release pipeline and record the deployed version."
    ],
    example: "After payment-service version 1.4.0 passes validation, the release owner creates the v1.4.0 tag on the approved main commit. GitHub records the release notes. A tag-triggered pipeline builds the exact tagged source, creates a container image with version 1.4.0, and publishes it to the registry for controlled deployment.",
    commands: [
      "git tag — list local tags.",
      "git tag -a v1.4.0 -m \"Payment Service 1.4.0\" — create an annotated tag.",
      "git show v1.4.0 — inspect the tag and referenced commit.",
      "git push origin v1.4.0 — push a specific tag.",
      "git push origin --tags — push all local tags when intended.",
      "git tag -d v1.4.0 — delete a local tag.",
      "git push origin :refs/tags/v1.4.0 — delete a remote tag only when approved.",
      "gh release list — list GitHub Releases using GitHub CLI.",
      "gh release view v1.4.0 — inspect a GitHub Release."
    ],
    configuration: "Adopt a versioning convention such as semantic versioning: MAJOR.MINOR.PATCH. Define who can create production tags and whether tags must be signed. Configure release workflows to trigger only for approved tag patterns. Ensure the release pipeline checks out the tagged commit rather than the latest main branch.",
    failures: [
      "A release tag points to the wrong commit.",
      "The tag exists locally but was never pushed to GitHub.",
      "A tag-triggered workflow does not run because its pattern is incorrect.",
      "The same version is reused for different source code.",
      "Release notes describe changes that are not included in the tag.",
      "A production artifact cannot be traced back to its tag."
    ],
    recovery: [
      "Use git show <tag> to verify the commit associated with the tag.",
      "Check remote tags using git ls-remote --tags origin.",
      "Inspect the workflow trigger and tag filters.",
      "Follow the approved release correction process instead of silently reusing a version.",
      "Regenerate release notes from the actual commits included in the release.",
      "Record the tag, commit hash, artifact digest, and deployment details together."
    ],
    bestPractices: [
      "Use a consistent versioning policy.",
      "Create release tags only from approved commits.",
      "Prefer annotated tags for formal releases.",
      "Protect release creation permissions.",
      "Never reuse a published version for different code.",
      "Include meaningful release notes.",
      "Build immutable artifacts from the tagged source.",
      "Record artifact digests and deployed versions."
    ],
    exercise: "Create a test repository with a working application and commit history. Create an annotated tag v1.0.0 on the approved commit and push it to GitHub. Create a GitHub Release with a summary of changes. Configure a tag-triggered workflow and verify that it builds the tagged commit."
  },

  "2|Release Approval Workflow": {
    overview: "A release approval workflow defines the checks and human decisions required before a software version is promoted to a target environment. It connects source validation, artifact creation, security review, change authorization, deployment execution, and post-deployment verification. GitHub pull request approvals and protected environments can enforce parts of this process.",
    purpose: "Approval workflows reduce the risk of deploying untested or unauthorized changes to production. They provide accountability for business-critical releases and ensure that testing, security, operational readiness, and rollback planning are considered. In a payment application, production deployment may require approval from a release owner after staging validation.",
    architecture: "The workflow begins with a tagged or merged source commit. CI creates a versioned artifact and records its metadata. Validation stages execute tests and security checks. A protected deployment environment can require designated reviewers. Once approved, the deployment job receives authorized access and promotes the approved artifact to the target environment.",
    workflow: [
      "Identify the release scope and target environment.",
      "Confirm the source commit and release tag.",
      "Build an immutable artifact and record its digest.",
      "Run unit, integration, security, and deployment validation.",
      "Prepare release notes, change details, and rollback instructions.",
      "Request approval from the authorized release reviewers.",
      "Deploy the approved artifact after authorization.",
      "Verify application health and business-critical transactions.",
      "Record deployment status and close the release activity."
    ],
    example: "A payment-service version is ready for production after staging tests pass. The pipeline records the container image digest and security scan results. A release owner reviews the change summary and rollback plan. GitHub Environment protection requires approval before the production job can access its deployment credentials. After approval, the pipeline deploys the exact validated image and verifies the payment health endpoint.",
    commands: [
      "git tag --points-at HEAD — inspect tags associated with the current commit.",
      "git rev-parse HEAD — record the source commit hash.",
      "docker image inspect payment-service:1.4.0 — inspect a local image.",
      "docker image inspect payment-service:1.4.0 --format '{{.Id}}' — inspect the image identifier.",
      "gh run list — review recent workflow executions.",
      "gh run view <run-id> --log — inspect workflow logs using GitHub CLI.",
      "kubectl rollout status deployment/payment-service -n production — verify a Kubernetes rollout.",
      "kubectl get pods -n production — inspect production pod status."
    ],
    configuration: "Create a protected GitHub Environment such as production and configure required reviewers. Store production credentials as environment-scoped secrets. Separate build and deployment jobs, pass immutable artifact references between them, and require successful validation before deployment. Document emergency approval rules and maintain an auditable record of who approved each release.",
    failures: [
      "A release is blocked because the required reviewer has not approved it.",
      "The pipeline deploys a different artifact from the one validated in staging.",
      "Production secrets are unavailable because the deployment environment is misconfigured.",
      "Approval is granted without reviewing test or security evidence.",
      "A release starts before the change window or operational checks are complete.",
      "The deployment succeeds but post-deployment health checks fail."
    ],
    recovery: [
      "Inspect the workflow run and identify the approval or environment gate blocking progress.",
      "Verify that the approved artifact digest matches the artifact tested in staging.",
      "Check environment reviewer settings and secret scope.",
      "Provide reviewers with test, security, and rollback evidence before requesting approval again.",
      "Stop deployment when release authorization or change-window requirements are not satisfied.",
      "Follow the rollback plan if post-deployment health checks show unacceptable impact."
    ],
    bestPractices: [
      "Separate build validation from production deployment.",
      "Deploy the same immutable artifact that passed staging.",
      "Require appropriate approval for production changes.",
      "Provide release notes, test evidence, and rollback instructions.",
      "Use environment-scoped secrets and least-privilege credentials.",
      "Record approver, source commit, artifact digest, and deployment result.",
      "Run health checks after deployment.",
      "Define an emergency release process with an audit trail."
    ],
    exercise: "Create a GitHub Actions workflow with build, test, and production deployment jobs. Configure a protected production environment with required reviewers. Make the deployment job wait for approval and use a test artifact. Verify that deployment is blocked before approval and continues only after an authorized reviewer approves it."
  },

  "2|Troubleshooting": {
    overview: "Git and GitHub troubleshooting is the systematic process of identifying and correcting repository, authentication, branch, commit, pull request, webhook, and automation problems. Effective troubleshooting begins with the exact error message and repository state rather than repeatedly executing commands without understanding their effects.",
    purpose: "Git-related failures can stop development, block CI pipelines, prevent releases, or expose sensitive information. DevOps engineers need to diagnose whether the issue is local Git configuration, remote authentication, branch divergence, repository policy, GitHub service configuration, or a pipeline integration problem.",
    architecture: "Troubleshooting examines the developer working tree, staging area, local commits, remote-tracking references, GitHub repository settings, pull request checks, webhook delivery records, and CI execution logs. Each layer provides evidence about where the failure occurs. A safe recovery preserves valid work and avoids destructive history operations unless explicitly required.",
    workflow: [
      "Capture the exact command and error message.",
      "Run git status and identify the current branch and working-tree state.",
      "Inspect the configured remotes and relevant commit history.",
      "Determine whether the issue is local, remote, permission-related, or pipeline-related.",
      "Collect the relevant GitHub error, webhook delivery, or CI log.",
      "Identify the root cause before modifying repository state.",
      "Apply the smallest safe correction.",
      "Repeat the failed operation and verify the expected result.",
      "Document the cause and preventive action."
    ],
    example: "A Jenkins pipeline cannot check out the payment-service repository after a credential rotation. The engineer verifies the repository URL, checks the credential identifier configured in Jenkins, and reviews the checkout error. The old token is found to be expired. The team updates the approved credential, verifies repository access, and reruns the pipeline without changing application source code.",
    commands: [
      "git status — inspect repository state.",
      "git branch -vv — inspect branches and upstream tracking.",
      "git remote -v — verify remote URLs.",
      "git fetch --prune origin — update remote references and remove stale tracking references.",
      "git log --oneline --graph --decorate --all -20 — inspect recent repository history.",
      "git diff --check — detect whitespace errors and conflict markers.",
      "git config --show-origin --list — identify configuration values and their source files.",
      "git ls-remote origin — test remote reference access.",
      "git reflog --date=local -20 — inspect recent local reference movements."
    ],
    configuration: "Maintain consistent Git versions and author configuration across development machines and CI agents. Use SSH keys, credential managers, or approved tokens. Document repository URLs, default branches, branch policies, and CI credentials. Enable appropriate GitHub audit and webhook delivery visibility. Ensure logs do not expose credentials or sensitive payloads.",
    failures: [
      "fatal: not a git repository occurs because the command runs outside the repository.",
      "Authentication failed because credentials are invalid, expired, or unavailable.",
      "Updates were rejected because the remote contains commits not present locally.",
      "A merge or rebase remains incomplete because conflicts are unresolved.",
      "A branch has no upstream tracking configuration.",
      "A pull request is blocked by required checks or approvals.",
      "A webhook delivery fails because the endpoint is unreachable.",
      "A CI checkout fails because the repository URL or credential is incorrect."
    ],
    recovery: [
      "Use Get-Location or pwd and confirm the current directory contains the .git metadata.",
      "Verify git remote -v and test remote access with git ls-remote.",
      "Refresh approved credentials without exposing token values.",
      "Fetch remote changes and inspect branch divergence before integrating.",
      "Resolve conflicts carefully or abort the operation if the working state is unsafe.",
      "Configure upstream tracking with git push -u when appropriate.",
      "Inspect GitHub checks, review requirements, and webhook delivery details.",
      "Correct CI checkout configuration and rerun the failed job."
    ],
    bestPractices: [
      "Read the full error message before choosing a recovery command.",
      "Run git status before and after risky operations.",
      "Create a backup branch before destructive history changes.",
      "Prefer fetch and inspection before merge, rebase, reset, or force push.",
      "Use git revert for reversing published changes.",
      "Never share credential values in logs or screenshots.",
      "Preserve relevant error logs and commit hashes for incident records.",
      "Document recurring failures and preventive controls."
    ],
    exercise: "Create a test repository and deliberately reproduce three safe problems: an incorrect remote URL, an unconfigured upstream branch, and a merge conflict. Diagnose each using git status, git remote -v, git branch -vv, and git log. Correct the problems and document the exact root cause and recovery command for each one."
  },

  "2|Production Hands-on Lab": {
    overview: "This production hands-on lab combines Git and GitHub practices into a realistic application delivery workflow. It covers repository setup, branch creation, commits, pull requests, review, branch protection, merge conflict resolution, GitHub Actions, secrets, version tags, and release approval. The objective is to demonstrate how controlled source-code collaboration supports a reliable CI/CD pipeline.",
    purpose: "Production engineering requires more than knowing individual Git commands. Developers and DevOps engineers must coordinate changes, preserve history, protect production branches, automate validation, handle credentials safely, and produce traceable releases. This lab connects those activities into one end-to-end workflow.",
    architecture: "The lab uses a GitHub repository for a sample payment-service. Developers work on feature branches and open pull requests against main. Branch protection requires approvals and successful CI checks. GitHub Actions validates the application. Secrets are used only for approved external integrations. An annotated release tag identifies the source version, and a protected production environment controls deployment approval.",
    workflow: [
      "Create a GitHub repository named payment-service.",
      "Clone the repository and configure Git author details.",
      "Add a sample application, README, and .gitignore.",
      "Create feature/payment-validation from the updated main branch.",
      "Implement validation logic and add unit tests.",
      "Commit the changes with meaningful messages and push the branch.",
      "Open a pull request and inspect the proposed diff.",
      "Run GitHub Actions checks and complete code review.",
      "Enable branch protection and merge only after requirements pass.",
      "Create an annotated version tag and publish a GitHub Release.",
      "Configure a protected production environment and request release approval.",
      "Record the source commit, artifact version, and deployment result."
    ],
    example: "A DevMavox team develops a payment validation feature. The developer creates a feature branch, commits the implementation and tests, and pushes it to GitHub. A pull request triggers GitHub Actions to run Maven validation. A reviewer checks the payment rules and approves the change. Branch protection allows the merge only after all checks pass. The release owner creates v1.0.0 and approves the protected deployment workflow. The team records the deployed version and source commit for future incident investigation.",
    commands: [
      "git clone <repository-url> — clone the application repository.",
      "git switch -c feature/payment-validation — create the feature branch.",
      "git status — inspect the working tree.",
      "git add src/ — stage the intended application changes.",
      "git diff --staged — review staged changes.",
      "git commit -m \"feat: add payment validation\" — create a focused commit.",
      "git push -u origin feature/payment-validation — publish the feature branch.",
      "git fetch origin — retrieve the latest remote changes.",
      "git log --graph --oneline --all — inspect repository history.",
      "git tag -a v1.0.0 -m \"Payment Service 1.0.0\" — create a release tag.",
      "git push origin v1.0.0 — publish the release tag.",
      "gh pr checks — inspect pull request checks using GitHub CLI.",
      "gh run list — inspect recent workflow executions."
    ],
    configuration: "Configure the repository with a clear README, .gitignore, default branch, and documented contribution process. Add branch protection for main with required pull requests, approvals, and CI status checks. Store external integration credentials as GitHub secrets. Configure GitHub Actions with explicit permissions and protected deployment environments. Use version tags and immutable artifacts to maintain release traceability.",
    failures: [
      "The developer starts from an outdated main branch and encounters conflicts.",
      "The pull request fails because the application tests do not pass.",
      "Branch protection blocks a merge because approval or status checks are missing.",
      "A workflow cannot access a required secret.",
      "A release tag points to the wrong source commit.",
      "A production deployment uses a different artifact from the one tested.",
      "The webhook or automation integration does not start the expected job.",
      "The deployed application fails its post-deployment health checks."
    ],
    recovery: [
      "Fetch and update the feature branch from the correct target branch.",
      "Inspect CI logs and fix the underlying application or workflow failure.",
      "Complete required reviews and verify the exact status checks.",
      "Check secret names, scopes, and permissions without exposing their values.",
      "Verify the release tag and associated commit before publishing.",
      "Compare the artifact digest used in staging and production.",
      "Inspect webhook delivery history and CI trigger configuration.",
      "Follow the documented rollback plan when production health checks fail."
    ],
    bestPractices: [
      "Use feature branches and pull requests for shared development.",
      "Keep commits focused and messages meaningful.",
      "Require code review and automated validation for main.",
      "Protect production release branches and restrict bypass access.",
      "Never commit credentials or generated build artifacts.",
      "Use immutable release tags and artifact identifiers.",
      "Require approval for production deployment.",
      "Verify application health after deployment.",
      "Record the source commit, release version, artifact digest, and deployment outcome.",
      "Document lessons learned and improve the pipeline after failures."
    ],
    exercise: "Complete an end-to-end GitHub workflow using a sample payment-service repository. Create a feature branch, implement a small validation change, commit and push it, open a pull request, run automated checks, and complete code review. Configure branch protection, merge the approved change, create a v1.0.0 release tag, and configure a protected deployment environment. Submit a short release report containing the pull request number, commit hash, tag, CI result, approval status, and deployment verification evidence."
  }
};
