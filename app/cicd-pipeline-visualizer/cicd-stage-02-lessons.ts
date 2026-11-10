import type { CicdTopicLesson } from "./cicd-topic-lessons";

export const stageTwoLessonOverrides: Partial<Record<string, CicdTopicLesson>> = {

  "2|Git and GitHub Fundamentals": {
    overview: "Git is a distributed version control system that records changes to source code. Every developer can maintain a local repository with its own commit history. GitHub is a hosting platform that stores Git repositories and provides collaboration features such as pull requests, code review, branch protection, issues, and automation. Git manages version history; GitHub provides the shared collaboration environment.",
    purpose: "The payment-service source code must be shared, reviewed, and tracked before it enters the CI/CD pipeline. Git allows developers to work independently and recover earlier versions. GitHub provides a central location where teams can review changes, enforce repository policies, and trigger automated workflows.",
    architecture: "A developer works in a local working directory. The staging area selects changes for the next commit. The local Git repository stores commits and references. A remote repository on GitHub stores shared branches and tags. Git transfers commits between local and remote repositories using push, fetch, and pull operations.",
    workflow: [
      "Install Git and configure the developer identity.",
      "Create or clone the payment-service repository.",
      "Modify application source files in the working directory.",
      "Inspect changes and select files for the staging area.",
      "Create a commit with a meaningful message.",
      "Connect the local repository to the GitHub remote.",
      "Push the branch and collaborate through GitHub."
    ],
    example: "A developer changes PaymentService.java to validate payment amounts. Git records the change in a local commit. The developer pushes the feature branch to GitHub and creates a pull request. Other developers review the code before it is merged into the main branch.",
    commands: [
      "git --version — verify that Git is installed.",
      "git config --global user.name \"Developer Name\" — configure the commit author name.",
      "git config --global user.email \"developer@example.com\" — configure the commit author email.",
      "git init — initialize a new local repository.",
      "git clone <repository-url> — copy a remote repository locally.",
      "git status — inspect working-tree and staging-area changes.",
      "git add <file> — stage a selected file.",
      "git commit -m \"Add payment validation\" — create a commit.",
      "git remote -v — display configured remote repositories."
    ],
    configuration: "Configure user.name and user.email for accurate commit attribution. Use .gitignore to exclude target, IDE files, logs, generated output, and local secret files. Configure the remote URL using HTTPS or SSH. Use credential managers or SSH keys instead of storing access tokens in scripts. Protect the GitHub default branch with repository rules.",
    failures: [
      "Git is not recognized because it is not installed or its executable is missing from PATH.",
      "Git reports an unknown author because user.name or user.email is not configured.",
      "Push is rejected because the remote branch contains commits missing locally.",
      "Authentication fails because the credential or SSH key is invalid.",
      "Generated files are committed because .gitignore is incomplete.",
      "A developer accidentally commits a secret or sensitive configuration."
    ],
    recovery: [
      "Verify Git installation using git --version.",
      "Configure the correct author identity.",
      "Inspect git status and git remote -v before changing repository state.",
      "Fetch remote changes and integrate them using the team's approved strategy.",
      "Correct authentication using a credential manager or SSH key.",
      "Remove generated files from tracking and update .gitignore.",
      "Rotate any exposed credential and follow the repository's secret-removal process."
    ],
    bestPractices: [
      "Commit small, logically related changes.",
      "Write messages that explain the purpose of each commit.",
      "Use feature branches instead of committing directly to main.",
      "Review git diff before staging and committing.",
      "Never commit passwords, tokens, private keys, or production configuration.",
      "Use repository rules and pull-request review.",
      "Keep local branches synchronized with the remote repository."
    ],
    exercise: "Create a GitHub repository for payment-service. Clone it, configure the author identity, add a README and a Java source file, and create a commit. Push the branch to GitHub. Make another change, inspect it with git diff, commit it, and verify the commit history in both the terminal and GitHub."
  },

  "2|Repository Management": {
    overview: "Repository management covers creating, cloning, organizing, configuring, and maintaining a Git repository. A repository contains source files, commit history, branches, tags, and configuration. GitHub adds collaboration settings, access permissions, default-branch configuration, repository visibility, topics, descriptions, and security controls.",
    purpose: "The payment-service repository is the shared source of truth for developers and CI automation. Proper management ensures that team members access the correct project, generated files are excluded, repository permissions are controlled, and Jenkins or GitHub Actions can retrieve the expected source code.",
    architecture: "The Git repository contains tracked files and version history. GitHub hosts the remote repository and stores branch references. Repository settings define the default branch, access roles, secrets, webhooks, and rulesets. CI systems authenticate to the remote repository using an approved identity with limited permissions.",
    workflow: [
      "Create the repository under the correct GitHub organization or account.",
      "Choose a clear repository name, description, and visibility.",
      "Initialize the repository with a README and suitable .gitignore.",
      "Clone the repository to the developer workstation.",
      "Configure the default branch and repository access.",
      "Add collaborators or teams with the minimum required permissions.",
      "Review repository settings before enabling automation."
    ],
    example: "The DevMavox team creates a private payment-service repository. Developers receive write access through a team, while production automation receives only the permissions needed to read source code. The repository excludes Maven target output and local application secrets.",
    commands: [
      "git clone <repository-url> — clone the remote repository.",
      "git remote -v — verify remote configuration.",
      "git remote get-url origin — inspect the origin URL.",
      "git remote set-url origin <new-url> — update the remote URL.",
      "git ls-files — list tracked files.",
      "git check-ignore -v target/ — identify the ignore rule affecting a generated path.",
      "git status --short — inspect repository changes."
    ],
    configuration: "Set the default branch to main or the team's agreed name. Configure repository visibility deliberately. Use organization teams and least-privilege roles. Add a .gitignore suitable for Java, Maven, IntelliJ, and VS Code. Configure branch rules and required checks. Keep credentials in GitHub Actions secrets or an approved secret manager rather than repository files.",
    failures: [
      "A developer clones the wrong repository or an outdated fork.",
      "The origin remote points to an incorrect URL.",
      "The repository is accidentally public and exposes internal source code.",
      "Generated Maven output is tracked because ignore rules were added too late.",
      "A CI identity has insufficient repository permissions.",
      "A collaborator has excessive access to production source or settings."
    ],
    recovery: [
      "Confirm the repository URL and organization before making changes.",
      "Inspect git remote -v and correct the origin if necessary.",
      "Review repository visibility and organization access settings.",
      "Remove generated files from Git tracking while preserving local files.",
      "Check the CI identity's repository permissions and token scope.",
      "Review collaborator roles and remove unnecessary access.",
      "Verify that developers and automation can access only the intended repository."
    ],
    bestPractices: [
      "Use a clear naming convention for repositories.",
      "Keep one authoritative repository for the application source.",
      "Use private visibility for internal application code when appropriate.",
      "Apply least-privilege access through teams.",
      "Maintain a suitable .gitignore.",
      "Protect the default branch.",
      "Review repository access and automation permissions periodically."
    ],
    exercise: "Create a private payment-service repository. Add a README, Java/Maven .gitignore, and project description. Clone it locally and verify origin. Configure a team with appropriate access. Confirm that target output and application secrets are excluded from Git tracking."
  },

  "2|Branching Strategy": {
    overview: "A branching strategy defines how developers create, update, review, and merge parallel lines of development. Common approaches include feature branches, release branches, hotfix branches, and trunk-based development. The correct model depends on release frequency, team size, deployment risk, and review requirements.",
    purpose: "Developers should implement payment features without directly destabilizing the production branch. Feature branches isolate changes until automated checks and reviews pass. A consistent strategy allows Jenkins or GitHub Actions to validate every proposed change before it reaches the release branch.",
    architecture: "The main branch represents the accepted integration baseline. A feature branch starts from an agreed base commit and contains a focused change. A pull request compares the feature branch with the target branch. After checks and approvals, the change is merged according to repository policy.",
    workflow: [
      "Select the correct base branch for the work.",
      "Create a branch using the team's naming convention.",
      "Implement one focused feature or fix.",
      "Commit related changes with clear messages.",
      "Fetch and integrate relevant updates from the target branch.",
      "Push the feature branch and open a pull request.",
      "Merge only after required checks and reviews pass."
    ],
    example: "A developer implements payment retry handling on feature/payment-retry. Another developer works on bugfix/payment-validation. Both branches are tested independently. Their pull requests target main and must pass the required build and test checks before merging.",
    commands: [
      "git branch --show-current — display the current branch.",
      "git switch -c feature/payment-retry — create and switch to a feature branch.",
      "git branch -a — list local and remote-tracking branches.",
      "git fetch origin — retrieve remote references.",
      "git rebase origin/main — update a feature branch by replaying commits on the latest main when permitted by team policy.",
      "git push -u origin feature/payment-retry — publish a new branch and set its upstream.",
      "git branch -d feature/payment-retry — delete a merged local branch."
    ],
    configuration: "Document branch prefixes such as feature/, bugfix/, hotfix/, and release/. Define whether the team uses merge commits, squash merging, or rebase workflows. Configure branch protection on main. Require pull requests and automated checks. Avoid long-lived branches that drift far from the integration branch.",
    failures: [
      "A feature branch is created from an outdated base.",
      "Developers commit directly to main and bypass review.",
      "A branch remains open for weeks and accumulates conflicts.",
      "A developer force-pushes over shared commits.",
      "The branch name does not follow the team's automation convention.",
      "A release branch contains unreviewed or untested changes."
    ],
    recovery: [
      "Inspect the current branch and its base commit.",
      "Fetch the latest remote references.",
      "Integrate the target branch using the approved merge or rebase process.",
      "Resolve conflicts and rerun tests.",
      "Restore overwritten commits from reflog or remote references where possible.",
      "Open or update a pull request and require the normal review process.",
      "Delete stale branches only after confirming that their work is merged or safely preserved."
    ],
    bestPractices: [
      "Use short-lived feature branches.",
      "Keep each branch focused on one change.",
      "Protect the main branch.",
      "Synchronize frequently with the target branch.",
      "Avoid force-pushing shared branches.",
      "Automate branch checks and naming validation.",
      "Delete merged branches to reduce repository clutter."
    ],
    exercise: "Create feature/payment-validation from main. Implement a small validation change, commit it, and push the branch. Create a second branch for a separate change. Open pull requests for both and verify that neither branch can directly update the protected main branch."
  },

  "2|Commit History": {
    overview: "Git commit history records snapshots of repository content and links each commit to its parent commit or commits. A commit includes a unique hash, author information, timestamp, and message. Inspecting history helps developers understand why a line changed, identify regressions, compare versions, and restore earlier work.",
    purpose: "When a payment API starts failing after a code change, engineers need to identify which commit introduced the regression. Clear commit history makes code review, incident investigation, release tracking, and rollback planning more reliable.",
    architecture: "Each Git commit points to a tree representing repository content and to one or more parent commits. Branch names are references that point to commits. Git stores objects in its object database. Commands such as log, show, diff, blame, and bisect provide different ways to inspect the recorded history.",
    workflow: [
      "Make a focused source-code change.",
      "Review the staged diff before creating a commit.",
      "Create a commit with a descriptive message.",
      "Inspect the commit hash and changed files.",
      "Compare the commit with its parent or another branch.",
      "Use blame or bisect when investigating a regression.",
      "Keep commits understandable and connected to the related work item."
    ],
    example: "After deployment, payment validation starts rejecting valid requests. The engineer checks git log to identify recent commits affecting PaymentService.java, uses git show to inspect the exact change, and uses git blame to locate the author and commit responsible for the affected lines.",
    commands: [
      "git log --oneline --graph --decorate — display a compact branch history.",
      "git show <commit-hash> — inspect one commit and its changes.",
      "git diff <commit-a> <commit-b> — compare two commits.",
      "git diff --staged — inspect staged changes.",
      "git blame src/main/java/.../PaymentService.java — identify the commit associated with each line.",
      "git bisect start — begin binary-search regression investigation.",
      "git reflog — inspect recent local reference movements."
    ],
    configuration: "Use a commit-message convention such as type(scope): summary. Configure author identity correctly. Use repository templates or commit-message hooks if the team requires a format. Avoid including secrets or customer data in commit messages. Use signed commits when required by organizational policy.",
    failures: [
      "A commit message does not explain the change.",
      "A developer stages unrelated files and creates an oversized commit.",
      "A sensitive value is accidentally stored in Git history.",
      "A developer resets or rewrites history and loses a local reference.",
      "git blame points to a large formatting commit instead of the original logic change.",
      "The commit author identity is incorrect."
    ],
    recovery: [
      "Use git show and git diff to inspect the affected commit.",
      "Use git reflog to find recently moved branch references.",
      "Restore lost work from a known commit or reflog entry after reviewing the state.",
      "Use git revert for a safe corrective commit on shared history.",
      "If a secret entered history, rotate it first and follow an approved history-cleaning procedure.",
      "Create focused commits after separating unrelated changes.",
      "Verify the corrected history and run tests."
    ],
    bestPractices: [
      "Write concise messages that explain intent.",
      "Keep commits small and logically complete.",
      "Review git diff before committing.",
      "Use git revert for shared-history corrections.",
      "Use git log and git show during incident investigation.",
      "Avoid committing secrets because deleting a later file does not erase earlier history.",
      "Link commits to issues or pull requests when useful."
    ],
    exercise: "Create three commits in a sample payment-service repository. Inspect them with git log, git show, and git diff. Modify a payment validation line and use git blame to identify its history. Introduce a test regression, locate it using git bisect, and document the commit that caused the failure."
  },

  "2|Pull Request Lifecycle": {
    overview: "A pull request is a collaboration workflow for proposing changes from one branch into another. It provides a diff, discussion area, review approvals, automated checks, and merge controls. A pull request does not automatically mean code is accepted; it remains open until repository policies and team decisions are satisfied.",
    purpose: "The payment-service team needs a controlled method to review code before it reaches main. Pull requests make changes visible, provide an audit trail, and allow automated builds, tests, security checks, and quality gates to run before integration.",
    architecture: "A developer pushes a source branch to GitHub and opens a pull request against a target branch. GitHub calculates the changed-file diff and starts configured checks. Reviewers comment, request changes, or approve. After required policies pass, an authorized user merges the pull request and the target branch receives the accepted changes.",
    workflow: [
      "Create a feature branch from the correct target branch.",
      "Implement and commit the change.",
      "Push the branch to GitHub.",
      "Open a pull request with a clear title and description.",
      "Link the related issue and explain testing performed.",
      "Wait for automated checks and reviewer feedback.",
      "Update the branch to address requested changes.",
      "Merge after approvals and required checks pass."
    ],
    example: "A developer opens a pull request for payment retry handling. Jenkins runs Maven tests and a quality scan. A reviewer identifies a missing timeout test and requests changes. The developer adds the test and pushes another commit. After all checks pass and approval is recorded, the pull request is merged into main.",
    commands: [
      "git switch -c feature/payment-retry — create the pull-request branch.",
      "git add . — stage intended changes after reviewing the working tree.",
      "git commit -m \"Add payment retry handling\" — create the commit.",
      "git push -u origin feature/payment-retry — publish the branch.",
      "git fetch origin — refresh remote references.",
      "git diff origin/main...HEAD — inspect changes relative to the target branch."
    ],
    configuration: "Configure pull-request templates to request purpose, risk, test evidence, and deployment notes. Require approvals and status checks on the target branch. Define who can dismiss reviews and bypass restrictions. Enable automatic deletion of merged branches if appropriate. Ensure CI checks run against the proposed changes and report their results to GitHub.",
    failures: [
      "The pull request targets the wrong base branch.",
      "Required status checks are missing or remain pending.",
      "The source branch is behind the target branch and has conflicts.",
      "A reviewer requests changes but the developer does not update the branch.",
      "The pull request contains unrelated generated files.",
      "The pull request is merged before required approvals."
    ],
    recovery: [
      "Verify the base and compare branches before changing the pull request.",
      "Inspect the check summary and open the failed CI job logs.",
      "Fetch and integrate the latest target branch.",
      "Resolve conflicts and rerun tests.",
      "Remove unrelated changes and update the pull request.",
      "Request review again after addressing feedback.",
      "Confirm the final merge satisfies repository rules."
    ],
    bestPractices: [
      "Keep pull requests small and focused.",
      "Explain purpose, risk, and testing evidence.",
      "Require automated checks before merge.",
      "Require appropriate human review.",
      "Do not approve your own change when policy requires independent review.",
      "Resolve every important review comment.",
      "Use the pull request as the audit record for the change."
    ],
    exercise: "Create a feature/payment-retry branch and push it to GitHub. Open a pull request targeting main. Add a description, link an issue, and run the CI checks. Request a review, make a change in response to feedback, push the update, and merge only after the required checks pass."
  },

  "2|Code Review": {
    overview: "Code review is the process of examining proposed source-code changes before they are merged. Reviewers evaluate correctness, readability, security, performance, test coverage, maintainability, and compatibility. GitHub pull requests provide inline comments, review decisions, and a record of discussions.",
    purpose: "A payment-service change can affect money movement, customer data, authentication, and system availability. Code review helps detect logic defects, insecure handling of sensitive data, missing tests, and risky changes before production deployment.",
    architecture: "The author submits a pull request containing a diff. Reviewers inspect changed files and surrounding code. They can comment, approve, or request changes. Automated tools complement human review by checking compilation, tests, formatting, dependencies, and security. The final approval decision follows repository policy.",
    workflow: [
      "Read the pull-request description and understand the intended behavior.",
      "Inspect the complete diff rather than only the changed line.",
      "Check business logic, input validation, and error handling.",
      "Review security-sensitive code and data handling.",
      "Check tests for normal, boundary, and failure cases.",
      "Leave specific comments that explain the concern and expected correction.",
      "Re-review updates and submit the appropriate review decision."
    ],
    example: "A reviewer notices that a payment retry implementation logs the full request object, which may contain sensitive information. The reviewer requests removal of the unsafe logging and asks for a test proving that retry attempts do not create duplicate charges.",
    commands: [
      "git diff origin/main...HEAD — inspect the pull-request changes locally.",
      "git show <commit-hash> — inspect an individual commit.",
      "mvn clean verify — validate compilation and tests.",
      "git diff --check — detect whitespace errors and conflict markers.",
      "git grep -n \"password\\|secret\\|token\" — search tracked source for suspicious hard-coded secret terms."
    ],
    configuration: "Define review expectations in CONTRIBUTING.md or the repository pull-request template. Use CODEOWNERS to request reviewers for sensitive paths. Require approvals for protected branches. Configure automated checks for tests, static analysis, and dependency scanning. Reviewers should have enough context and permission to evaluate the change.",
    failures: [
      "Reviewers approve without reading the full change.",
      "Important security or payment correctness issues are missed.",
      "Comments are vague and do not explain the required correction.",
      "A large pull request makes meaningful review difficult.",
      "Automated tests pass but do not cover the changed business behavior.",
      "A required code owner is not included in the review."
    ],
    recovery: [
      "Reopen the diff and identify the exact unreviewed area.",
      "Split large changes into smaller pull requests where possible.",
      "Add tests for the missing boundary or failure condition.",
      "Request review from the relevant code owner.",
      "Clarify comments with a concrete example and expected behavior.",
      "Run automated checks again after changes.",
      "Record important review findings for future prevention."
    ],
    bestPractices: [
      "Review correctness before style preferences.",
      "Check security, authorization, and sensitive-data handling.",
      "Verify tests cover important success and failure paths.",
      "Keep pull requests small enough to review carefully.",
      "Use CODEOWNERS for critical application areas.",
      "Give respectful, specific, actionable feedback.",
      "Never treat a green build as a substitute for human review."
    ],
    exercise: "Open a pull request that changes PaymentService. Ask a second reviewer to inspect the diff for business logic, sensitive logging, and missing tests. Add a CODEOWNERS rule for the payment module and verify that GitHub requests the designated reviewer."
  },

  "2|Branch Protection Rules": {
    overview: "Branch protection rules and repository rulesets enforce conditions before important branches can be updated. Policies can require pull requests, approvals, status checks, signed commits, linear history, restricted push access, and restrictions on force pushes or deletion. GitHub applies these rules to protect branches such as main.",
    purpose: "The payment-service main branch must not receive unreviewed or failing code. Branch protection ensures that developers cannot bypass required reviews and automated CI checks during normal collaboration. It reduces the chance of accidental production-bound changes.",
    architecture: "GitHub evaluates repository rules when a user or automation attempts to update a protected branch. A pull request must satisfy required approvals and status checks. Authorized roles may have controlled bypass permissions. Rulesets can apply to selected branch patterns and can be managed at repository or organization level depending on the plan and configuration.",
    workflow: [
      "Identify important branches such as main and release/*.",
      "Open repository settings and locate branch protection or rulesets.",
      "Create a rule targeting the required branch pattern.",
      "Require pull requests and an appropriate approval count.",
      "Require successful CI status checks before merging.",
      "Disable force pushes and branch deletion where appropriate.",
      "Test the policy with a normal developer account and review bypass permissions."
    ],
    example: "The payment-service main branch requires one independent approval and successful Jenkins checks named build-and-test and security-scan. A developer cannot push directly to main. If a check fails, GitHub blocks the merge until the issue is corrected and the check succeeds.",
    commands: [
      "git push origin HEAD:main — a direct update that should be rejected when branch policy blocks it.",
      "git push --force origin main — a force push that should be blocked by the applicable rule.",
      "git status --short — inspect local changes before creating a pull request.",
      "git branch --show-current — confirm the branch being updated."
    ],
    configuration: "Configure a rule for main. Require pull requests, independent approvals, and named status checks. Enable stale-review dismissal when policy requires a new review after important updates. Restrict force pushes and deletion. Define bypass actors narrowly and document emergency procedures. Ensure CI check names are stable and actually report to GitHub.",
    failures: [
      "A developer cannot merge because a required status check is missing.",
      "The required check name does not match the CI workflow's reported name.",
      "A stale approval is dismissed after new commits are pushed.",
      "An administrator or automation account bypasses rules unexpectedly.",
      "A rule pattern does not match the intended branch.",
      "A branch is protected but the team has no documented emergency process."
    ],
    recovery: [
      "Open the pull request's mergeability and rules status details.",
      "Identify the exact unsatisfied rule.",
      "Verify the CI workflow reports the required status-check name.",
      "Rerun or repair failed checks rather than bypassing them.",
      "Review branch patterns and repository or organization ruleset precedence.",
      "Check bypass permissions and audit recent administrative changes.",
      "Document and test any emergency exception process."
    ],
    bestPractices: [
      "Protect main and release branches.",
      "Require independent review and passing automated checks.",
      "Block force pushes and accidental deletion.",
      "Keep bypass permissions limited and auditable.",
      "Use stable status-check names.",
      "Test rules with normal developer permissions.",
      "Review protection policies after changes to CI or team structure."
    ],
    exercise: "Configure a protection rule for main in the payment-service repository. Require one approval and two CI checks. Attempt a direct push using a developer account and confirm it is blocked. Open a pull request with a failing check and verify that GitHub prevents merging."
  },

  "2|Merge Strategies": {
    overview: "GitHub supports different ways to integrate pull-request changes. A merge commit preserves the branch history and creates a merge commit. Squash merging combines the pull-request commits into one commit on the target branch. Rebase merging places commits onto the target branch without creating a merge commit. Each strategy produces a different history shape.",
    purpose: "The payment-service team needs a consistent history that supports review, release tracking, and incident investigation. A merge strategy affects how commits appear in main and how easily teams can understand which changes entered a release.",
    architecture: "A pull request compares a head branch with a base branch. GitHub calculates whether the branches can be merged. The selected strategy determines how the source commits are represented in the target branch. Repository settings can enable or disable available merge methods.",
    workflow: [
      "Review the source branch and target branch histories.",
      "Choose the strategy agreed by the team.",
      "Confirm the pull request is mergeable and all required checks pass.",
      "Use a merge commit when preserving branch topology is important.",
      "Use squash merging when a single logical commit per pull request is preferred.",
      "Use rebase merging when a linear commit history is required.",
      "Verify the resulting main history after merging."
    ],
    example: "A developer creates eight small commits while implementing payment validation. The team chooses squash merging so main receives one commit representing the completed feature. The pull request still retains its review discussion and individual commits for investigation.",
    commands: [
      "git log --oneline --graph --decorate --all — compare branch history.",
      "git merge --no-ff feature/payment-validation — create a merge commit locally.",
      "git merge --squash feature/payment-validation — stage a combined change for a single commit.",
      "git rebase main — replay local commits on top of main when permitted.",
      "git log --first-parent --oneline main — inspect the main branch's first-parent history."
    ],
    configuration: "Enable only the merge methods supported by the team's history policy. Document when to use merge commits, squash, or rebase. Avoid rewriting shared branch history. Require pull-request checks and approvals regardless of merge method. Confirm release automation and versioning tools work with the chosen history model.",
    failures: [
      "A merge is blocked because the source branch has conflicts.",
      "A squash merge loses the individual commit structure from the target branch.",
      "A rebase changes commit hashes and confuses collaborators using the old branch history.",
      "A merge commit introduces unexpected changes from an outdated source branch.",
      "The team uses inconsistent strategies and release automation interprets history incorrectly."
    ],
    recovery: [
      "Inspect the pull request's mergeability status.",
      "Fetch the latest target branch and update the source branch.",
      "Choose the strategy required by repository policy.",
      "Avoid rebasing a branch that other developers are actively using unless coordinated.",
      "Review the resulting diff and commit graph.",
      "Run tests after resolving conflicts or rewriting local commits.",
      "Document the final strategy in the team's contribution guide."
    ],
    bestPractices: [
      "Choose a consistent merge strategy for the repository.",
      "Use squash merging for focused pull requests when a clean main history is desired.",
      "Use merge commits when branch topology is valuable.",
      "Rebase local feature work carefully and coordinate shared branches.",
      "Never use a merge strategy to bypass required checks.",
      "Inspect the resulting history after important merges.",
      "Keep release and versioning automation compatible with the history model."
    ],
    exercise: "Create a feature branch with three small commits. Compare the history before merging. In a test repository, merge one branch with a merge commit and another with squash merging. Inspect git log --graph and explain how the resulting main histories differ."
  },

  "2|Merge Conflict Resolution": {
    overview: "A merge conflict occurs when Git cannot automatically combine changes from different branches. Conflicts commonly happen when two developers modify the same lines, rename files differently, or change related code in incompatible ways. Git pauses the merge or rebase and asks the developer to resolve the affected files.",
    purpose: "Parallel payment-service development can cause conflicts in shared classes, configuration files, and Maven dependencies. Correct conflict resolution ensures that both intended changes are preserved without accidentally removing business logic or introducing invalid code.",
    architecture: "Git compares the common ancestor with each branch's changes. If changes can be combined safely, Git performs the merge automatically. When it cannot determine the correct result, it marks conflicted files. The developer edits the result, stages the resolved files, and completes the merge or rebase.",
    workflow: [
      "Fetch the latest target branch.",
      "Start the approved merge or rebase operation.",
      "Inspect git status to identify conflicted files.",
      "Open each file and inspect the conflict markers.",
      "Understand both developers' intended changes before editing.",
      "Remove conflict markers and create the correct combined implementation.",
      "Stage resolved files and complete the merge or rebase.",
      "Run tests and review the final diff before pushing."
    ],
    example: "One developer changes PaymentService.java to validate payment amounts. Another changes the same method to add retry behavior. Git reports a conflict. The resolving developer preserves both validation and retry behavior in the correct order, adds tests for both cases, and completes the merge.",
    commands: [
      "git fetch origin — update remote references.",
      "git merge origin/main — merge the latest target branch into the current branch.",
      "git status — list conflicted files and operation state.",
      "git diff --name-only --diff-filter=U — list unresolved conflict files.",
      "git diff — inspect conflict-related changes.",
      "git add <resolved-file> — mark a file as resolved.",
      "git merge --continue — continue a merge when required.",
      "git merge --abort — abandon the current merge and return to the pre-merge state."
    ],
    configuration: "Use consistent formatting and keep files focused to reduce unnecessary conflicts. Encourage short-lived branches and frequent synchronization. Configure merge or rebase policy clearly. Protect the target branch and require tests after conflict resolution. Do not automatically accept one side of a conflict in sensitive payment logic without understanding the change.",
    failures: [
      "Conflict markers remain in a Java source file and cause compilation errors.",
      "A developer chooses the wrong side and silently removes valid logic.",
      "The merge is completed without rerunning tests.",
      "A conflict occurs in pom.xml and incompatible dependency versions are combined.",
      "A developer aborts the wrong operation or loses uncommitted work.",
      "A binary file cannot be resolved using ordinary text conflict markers."
    ],
    recovery: [
      "Run git status and identify whether a merge or rebase is active.",
      "Back up uncommitted work before attempting recovery.",
      "Inspect the base, current branch, and incoming branch changes.",
      "Resolve each file according to intended application behavior.",
      "Use the appropriate Git continuation or abort command.",
      "Run compilation and tests, especially for payment business rules.",
      "Review the final diff and ask the original contributors when intent is unclear."
    ],
    bestPractices: [
      "Keep branches short-lived and synchronize regularly.",
      "Understand both sides before resolving a conflict.",
      "Never leave conflict markers in committed source code.",
      "Run tests after every important conflict resolution.",
      "Avoid blind accept-current or accept-incoming operations.",
      "Use small commits and clear ownership for shared configuration.",
      "Record complex conflict decisions in the pull request."
    ],
    exercise: "Create two branches from the same main commit. Modify the same payment validation method differently in each branch. Merge one branch into the other and resolve the conflict manually. Run Maven tests and inspect the final diff to prove both intended behaviors remain."
  },

  "2|GitHub Webhooks": {
    overview: "A GitHub webhook sends an HTTP request to a configured endpoint when a selected repository event occurs. Events can include push, pull request, release, issue, and workflow-related activity. The receiving system processes the payload and performs an action, such as starting a Jenkins job. Webhooks are event-driven integration points between GitHub and external systems.",
    purpose: "A Jenkins pipeline should start when developers push code or open a pull request. A webhook avoids unnecessary polling and provides faster feedback. It also allows GitHub events to trigger notifications, deployment workflows, and other approved automation.",
    architecture: "GitHub stores the webhook URL, selected events, and optional secret. When an event occurs, GitHub sends an HTTP request with event metadata and a JSON payload. The receiving endpoint validates the request, identifies the event, and starts the corresponding workflow. The receiver responds with an HTTP status and records processing results.",
    workflow: [
      "Create an endpoint reachable by GitHub.",
      "Configure the webhook URL in repository settings.",
      "Select only the events required by the integration.",
      "Configure a webhook secret.",
      "Receive the HTTP request and validate its signature.",
      "Process the event and trigger the intended CI action.",
      "Inspect delivery history and receiver logs when troubleshooting."
    ],
    example: "A developer pushes feature/payment-retry to GitHub. GitHub sends a push event to the Jenkins webhook endpoint. Jenkins identifies the repository and branch, starts the configured pipeline, checks out the source, and runs Maven tests. The pipeline reports its result to the team.",
    commands: [
      "curl -i -X POST <webhook-endpoint> -H 'Content-Type: application/json' -d '{\"test\":\"payload\"}' — test an endpoint in a controlled environment.",
      "Get-NetTCPConnection -LocalPort 8080 — inspect a local listener on Windows.",
      "ss -lntp — inspect listening TCP ports on Linux.",
      "curl -i <webhook-endpoint> — test endpoint reachability where a GET route is supported."
    ],
    configuration: "Configure the correct public HTTPS endpoint and select only required events. Store the webhook secret securely. Validate GitHub's X-Hub-Signature-256 header using the raw request body and HMAC SHA-256. Do not trust event payloads until signature verification succeeds. Configure delivery timeouts, retry-safe processing, and restricted network access.",
    failures: [
      "GitHub reports connection timeout because the receiver is unreachable.",
      "The endpoint returns HTTP 404 because the URL or route is incorrect.",
      "The receiver rejects requests because the webhook secret does not match.",
      "A reverse proxy removes required headers or changes request handling.",
      "Duplicate deliveries trigger duplicate builds.",
      "The receiver accepts an event but fails to process its payload."
    ],
    recovery: [
      "Inspect GitHub webhook delivery history and response details.",
      "Verify DNS, HTTPS certificate, firewall, proxy, and endpoint routing.",
      "Compare the configured secret with the receiver's secure secret value.",
      "Check signature verification against the unmodified raw request body.",
      "Inspect receiver logs and identify payload parsing or processing errors.",
      "Make event processing idempotent to handle retries safely.",
      "Send a test event and verify that the expected CI job starts exactly as designed."
    ],
    bestPractices: [
      "Use HTTPS for webhook endpoints.",
      "Verify webhook signatures before processing payloads.",
      "Subscribe only to required event types.",
      "Make processing idempotent because deliveries may be retried.",
      "Avoid logging secrets or full sensitive payloads.",
      "Monitor delivery failures and processing latency.",
      "Restrict endpoint access and rotate webhook secrets when exposed."
    ],
    exercise: "Configure a test webhook for push events in a sample GitHub repository. Point it to a controlled receiver or Jenkins endpoint. Configure a secret, push a test commit, inspect delivery status, and verify the receiver starts the expected pipeline only after signature validation."
  },

  "2|GitHub Actions Integration": {
    overview: "GitHub Actions is GitHub's automation platform for running workflows in response to repository events or manual schedules. A workflow is defined in YAML under .github/workflows. Jobs contain steps that run on hosted or self-hosted runners. Actions can check out source code, configure Java, run Maven, execute tests, and publish results.",
    purpose: "The payment-service repository needs automated feedback whenever a pull request or push occurs. GitHub Actions can run build and test workflows close to the source repository. It can complement or integrate with Jenkins while enforcing required status checks before merge.",
    architecture: "A repository event triggers a workflow. GitHub evaluates the workflow YAML and schedules jobs on compatible runners. Each job executes steps such as checkout, JDK setup, dependency caching, Maven verification, and artifact upload. The final job status is reported to the commit or pull request.",
    workflow: [
      "Create a workflow YAML file under .github/workflows.",
      "Define push and pull_request triggers for the required branches.",
      "Select a supported runner environment.",
      "Check out the repository source.",
      "Set up the required JDK version.",
      "Run mvn clean verify.",
      "Upload useful build artifacts or test reports when required.",
      "Make the workflow status a required branch-protection check."
    ],
    example: "When a pull request targets main, GitHub Actions checks out payment-service, configures the required JDK, and runs mvn clean verify. If a unit test fails, the workflow returns a failed status and GitHub blocks the merge because the workflow is a required check.",
    commands: [
      "git add .github/workflows/ci.yml — stage the workflow file.",
      "git commit -m \"Add GitHub Actions CI workflow\" — commit the automation.",
      "git push — publish the workflow to GitHub.",
      "mvn clean verify — run the same Maven verification locally.",
      "git diff --check — inspect workflow and source changes for whitespace errors."
    ],
    configuration: "Define workflow triggers carefully to avoid unnecessary runs. Use permissions to grant the minimum GITHUB_TOKEN access required. Pin third-party actions to reviewed versions or immutable commit SHAs according to organizational policy. Store credentials in GitHub Actions secrets or trusted environments. Avoid printing secrets in logs. Use concurrency controls when overlapping runs should be cancelled.",
    failures: [
      "The workflow does not run because the YAML file is in the wrong directory.",
      "A YAML indentation or syntax error prevents workflow loading.",
      "The runner uses an incompatible Java version.",
      "A Maven dependency download fails because of network or repository problems.",
      "A secret is unavailable because its scope or environment is incorrect.",
      "The workflow lacks permission to publish a required artifact.",
      "The branch-protection rule expects a different status-check name."
    ],
    recovery: [
      "Open the Actions tab and inspect the workflow run details.",
      "Verify the file path and YAML syntax.",
      "Compare the runner JDK with the project's Maven compiler release.",
      "Inspect the failing step and Maven output.",
      "Check secret scope, environment approval, and workflow permissions.",
      "Correct the required check name in branch protection if the workflow name changed.",
      "Rerun the workflow and confirm the status is reported to the pull request."
    ],
    bestPractices: [
      "Keep workflow files small and reusable.",
      "Use least-privilege workflow permissions.",
      "Pin and review third-party actions.",
      "Cache dependencies safely to improve build time.",
      "Never print secrets in logs.",
      "Require CI checks before merging.",
      "Use protected environments for sensitive deployment jobs."
    ],
    exercise: "Create .github/workflows/ci.yml for payment-service. Trigger it on pull requests and pushes to main. Configure the required JDK, check out source, and run mvn clean verify. Open a pull request and verify that the workflow status appears as a check that can be required by branch protection."
  },

  "2|Repository Secrets": {
    overview: "Repository secrets are protected values used by automation without storing them in source code. Examples include package registry credentials, cloud deployment credentials, and webhook tokens. GitHub Actions can expose authorized secrets to workflow steps through its secrets context. Secret access can also be scoped to environments or organizations.",
    purpose: "The payment-service pipeline may need credentials to access a private artifact repository or cloud deployment account. Storing those credentials in Java files, workflow YAML, or Git history exposes them to unauthorized users. Secret management reduces accidental disclosure and supports controlled credential rotation.",
    architecture: "An administrator stores a secret in GitHub repository, organization, or environment settings. An authorized workflow references it through the secrets context. GitHub provides the value to the job according to access rules. The workflow uses the credential for a specific operation and should avoid printing or persisting it.",
    workflow: [
      "Identify the exact automation operation requiring a credential.",
      "Create a dedicated credential with minimum permissions.",
      "Store the value in the appropriate repository, organization, or environment secret scope.",
      "Reference the secret only in the required workflow step.",
      "Avoid echoing or writing the value to artifacts.",
      "Restrict who can modify workflows and access protected environments.",
      "Rotate credentials according to policy and investigate any exposure."
    ],
    example: "A payment-service workflow publishes a verified artifact to a private Maven repository. The repository username and token are stored as protected GitHub secrets. The workflow passes them to the publishing step without committing them to pom.xml or the workflow file.",
    commands: [
      "git grep -n \"password\\|secret\\|token\\|api_key\" — search tracked files for suspicious credential references.",
      "git status --short — inspect whether a local secret file is accidentally staged.",
      "git diff --cached — review staged content before committing.",
      "mvn deploy — publish an artifact using credentials supplied through a secured Maven settings configuration."
    ],
    configuration: "Create secrets through GitHub repository, organization, or environment settings. Use separate credentials for development and production. Grant only the required repository and environment access. Use environment protection rules and required reviewers for sensitive deployments. Ensure workflow permissions are limited and avoid passing secrets to untrusted pull-request code.",
    failures: [
      "A workflow reports that a required secret is empty or unavailable.",
      "The secret exists at organization level but repository access is not granted.",
      "A secret is referenced using an incorrect name.",
      "A forked pull request cannot access protected secrets.",
      "A credential expires and publishing or deployment fails.",
      "A developer accidentally commits a token into Git history."
    ],
    recovery: [
      "Check the secret name and its repository, organization, or environment scope.",
      "Verify that the workflow is running in an authorized context.",
      "Check environment approval and repository access policies.",
      "Rotate expired or exposed credentials immediately.",
      "Remove the secret from active source files and follow the repository history-cleaning process if necessary.",
      "Review logs and audit events for possible unauthorized use.",
      "Rerun the workflow with the corrected credential."
    ],
    bestPractices: [
      "Never commit secrets to Git.",
      "Use short-lived credentials or workload identity where supported.",
      "Apply least privilege and separate production credentials.",
      "Restrict access to protected environments.",
      "Rotate credentials and monitor usage.",
      "Do not expose secrets to untrusted pull-request workflows.",
      "Use secret scanning and review automation changes carefully."
    ],
    exercise: "Create a test-only repository secret for a private package repository. Reference it in a controlled GitHub Actions workflow and verify the publishing step without printing the value. Then remove or rotate the test credential and confirm that the workflow fails safely when the credential is unavailable."
  },

  "2|Tags and Releases": {
    overview: "Git tags identify specific commits, commonly to mark software versions such as v1.0.0. Lightweight tags are simple references, while annotated tags store additional metadata such as tagger, date, and message. GitHub releases add release notes and downloadable assets around a tag. Tags and releases help teams identify exactly which source version was built and deployed.",
    purpose: "The payment-service team needs traceable versions for staging and production. A release tag connects a deployed artifact to a specific source commit. When an incident occurs, engineers can identify the exact version and compare it with a previous known-good release.",
    architecture: "A Git tag points to a commit in the repository. Git pushes tags to the remote when requested. GitHub can create a release associated with a tag and attach notes or build artifacts. CI pipelines can trigger on tag patterns and build versioned artifacts.",
    workflow: [
      "Confirm the target commit has passed required validation.",
      "Choose a version following the team's release convention.",
      "Create an annotated tag on the approved commit.",
      "Push the tag to the remote repository.",
      "Create a GitHub release with meaningful release notes.",
      "Attach or link the corresponding build artifact.",
      "Record the tag and artifact version in the deployment record."
    ],
    example: "After payment-service passes release validation, the team creates tag v1.4.0. GitHub creates a release containing the change summary. The CI pipeline builds the source associated with that tag and publishes payment-service:1.4.0 for deployment.",
    commands: [
      "git tag — list local tags.",
      "git tag -a v1.4.0 -m \"Payment service release 1.4.0\" — create an annotated tag.",
      "git show v1.4.0 — inspect the tag and referenced commit.",
      "git push origin v1.4.0 — push one tag to the remote.",
      "git push origin --tags — push all local tags; use only when intended.",
      "git ls-remote --tags origin — inspect remote tags."
    ],
    configuration: "Adopt a versioning convention such as semantic versioning when appropriate. Configure CI to trigger on approved tag patterns. Restrict who can create or modify release tags. Use annotated tags for important releases. Ensure artifact names and container image tags match the release identifier. Avoid moving an existing production tag to a different commit.",
    failures: [
      "The release tag points to the wrong commit.",
      "A tag exists locally but was not pushed to GitHub.",
      "A CI tag trigger pattern does not match the actual tag name.",
      "A release artifact does not correspond to the tagged source.",
      "A tag is accidentally moved or deleted.",
      "Release notes omit important compatibility or migration details."
    ],
    recovery: [
      "Inspect the tag using git show and compare its commit hash.",
      "Check remote tags with git ls-remote.",
      "Verify workflow trigger patterns and tag filters.",
      "Compare the artifact build metadata with the tagged commit.",
      "Follow the approved correction process rather than silently moving a production tag.",
      "Recreate or correct release documentation with an auditable record.",
      "Verify the final release and artifact identifiers."
    ],
    bestPractices: [
      "Use a consistent versioning policy.",
      "Create annotated tags for important releases.",
      "Protect release creation and tag modification.",
      "Build artifacts from the tagged commit.",
      "Keep release notes useful and accurate.",
      "Do not reuse production version tags.",
      "Maintain a mapping between source tag, artifact, and deployed version."
    ],
    exercise: "Create an annotated v1.0.0 tag on a validated payment-service commit. Push the tag to GitHub and create a release with a summary of changes. Configure a test workflow to run on v* tags and verify that the resulting artifact identifies the same source version."
  },

  "2|Release Approval Workflow": {
    overview: "A release approval workflow introduces explicit authorization before a build or release is promoted to a sensitive environment. Approval can be implemented through pull-request review, GitHub protected environments, required reviewers, change-management records, or an external deployment approval system. The goal is to ensure that tested changes are released through a controlled process.",
    purpose: "Payment-service production deployments may affect financial transactions and customer availability. A release should be promoted only after required testing, security checks, operational readiness, and authorized approval. A clear approval workflow creates accountability and an audit trail.",
    architecture: "A validated source change produces a versioned artifact. The release workflow records the source commit, artifact identifier, test results, and target environment. A protected environment or approval system pauses the deployment job until authorized reviewers approve. After approval, the pipeline deploys the same verified artifact.",
    workflow: [
      "Complete code review and merge the approved change.",
      "Build and test the source code.",
      "Publish an immutable, versioned artifact.",
      "Run security and quality checks.",
      "Prepare release notes and deployment evidence.",
      "Request approval from the authorized release reviewers.",
      "Deploy only after the required approval is granted.",
      "Record the deployment result and retain rollback information."
    ],
    example: "The payment-service v1.4.0 artifact passes Maven tests and security scanning. The release workflow targets production but pauses at a protected GitHub environment. The release manager reviews the commit, test report, and deployment plan, then approves. The workflow deploys the already-built artifact rather than rebuilding different source.",
    commands: [
      "git show v1.4.0 — verify the approved release tag.",
      "git rev-parse v1.4.0 — record the exact source commit.",
      "mvn clean verify — validate the application before artifact publication.",
      "gh run list — inspect recent GitHub Actions workflow runs when GitHub CLI is configured.",
      "gh run view <run-id> — inspect a particular workflow run."
    ],
    configuration: "Create a protected production environment and configure required reviewers where supported. Restrict which branches or tags can deploy. Keep deployment credentials scoped to the protected environment. Define what evidence approvers must inspect. Prevent untrusted pull-request workflows from accessing production secrets. Record approval and deployment events.",
    failures: [
      "A production deployment starts without the expected approval gate.",
      "The wrong artifact version is selected for release.",
      "The required reviewer is unavailable or lacks permission.",
      "An approval is granted but deployment credentials are missing.",
      "A workflow rebuilds the source and produces a different artifact after approval.",
      "The release record does not identify the source commit or deployment result."
    ],
    recovery: [
      "Stop the deployment if the approval gate is bypassed.",
      "Inspect environment protection settings and workflow dependencies.",
      "Verify the artifact digest, version, and source commit.",
      "Confirm reviewer permissions and environment access.",
      "Correct secret scope without exposing credentials.",
      "Redeploy only the approved artifact after required authorization.",
      "Record the incident and improve the release policy."
    ],
    bestPractices: [
      "Use separate approval controls for sensitive environments.",
      "Promote the same immutable artifact between environments.",
      "Require evidence from tests, scans, and release checks.",
      "Limit production approval to authorized roles.",
      "Keep deployment credentials environment-scoped.",
      "Record source commit, artifact digest, approver, and deployment result.",
      "Maintain a tested rollback plan."
    ],
    exercise: "Configure a protected production environment for payment-service. Create a workflow that builds and verifies an artifact, then pauses before deployment. Require a reviewer to approve. Verify that deployment cannot proceed before approval and that the workflow deploys the same artifact that passed validation."
  },

  "2|Troubleshooting": {
    overview: "Git and GitHub troubleshooting is the process of diagnosing repository, authentication, branch, commit, pull-request, and automation failures. Effective troubleshooting begins with identifying the exact operation that failed, collecting Git status and remote information, and inspecting the relevant GitHub event or check details before changing repository state.",
    purpose: "A blocked payment-service pull request can delay a release. Engineers must distinguish local Git problems from remote permissions, branch rules, webhook delivery, and CI failures. Correct diagnosis avoids destructive commands that could overwrite developer work or bypass repository controls.",
    architecture: "Local Git commands provide working-tree, staging, commit, branch, and remote information. GitHub provides repository settings, pull-request status, webhook delivery history, Actions logs, and audit information. CI systems report build status to GitHub. Troubleshooting follows the failure path from developer operation through remote repository and automation.",
    workflow: [
      "Record the exact command, error message, branch, and repository.",
      "Run git status and inspect the current branch.",
      "Check git remote -v and confirm the remote URL.",
      "Inspect local and remote commit history.",
      "Check GitHub permissions, branch rules, and pull-request status.",
      "Inspect webhook or CI logs if automation did not run.",
      "Apply the smallest safe correction and repeat the failed operation."
    ],
    example: "A developer pushes a payment-service branch and receives a non-fast-forward rejection. Instead of force-pushing, the engineer checks git status, fetches origin, inspects the remote history, and integrates the remote changes. The developer resolves any conflicts, runs Maven tests, and pushes the updated branch.",
    commands: [
      "git status — inspect working-tree state.",
      "git branch --show-current — identify the current branch.",
      "git remote -v — verify remote URLs.",
      "git fetch --all --prune — refresh remote references and remove stale remote-tracking references.",
      "git log --oneline --graph --decorate --all — inspect branch history.",
      "git reflog — inspect recent local reference changes.",
      "git diff --check — identify whitespace errors and conflict markers.",
      "git ls-remote origin — verify remote repository access."
    ],
    configuration: "Use SSH keys or a credential manager for authentication. Keep remote URLs correct. Document branch policies, merge strategy, required CI checks, and webhook endpoints. Use least-privilege GitHub access. Keep diagnostic logs available for GitHub Actions and Jenkins. Avoid storing tokens in shell history or repository files.",
    failures: [
      "Authentication failed because the credential is invalid or expired.",
      "Push is rejected because the remote contains new commits.",
      "A branch is blocked by protection rules.",
      "A pull request has a failing or missing status check.",
      "A webhook delivery fails because the endpoint is unreachable.",
      "A local branch has diverged from the remote branch.",
      "A developer loses track of uncommitted work after an incorrect reset."
    ],
    recovery: [
      "Inspect git status before executing any reset, clean, or checkout command.",
      "Verify the remote URL and authentication method.",
      "Fetch remote history and inspect divergence.",
      "Integrate changes using the team's approved merge or rebase process.",
      "Read branch protection details and satisfy the required checks.",
      "Inspect webhook delivery responses or CI job logs.",
      "Use reflog or backups to recover lost references where possible.",
      "Run tests and verify the final repository state."
    ],
    bestPractices: [
      "Collect evidence before changing repository state.",
      "Avoid blind force pushes and destructive resets.",
      "Use git status before and after risky operations.",
      "Keep authentication credentials secure.",
      "Understand branch rules and required checks.",
      "Use logs and commit history to identify the actual cause.",
      "Document recurring failures and their proven fixes."
    ],
    exercise: "Create a test repository and reproduce a non-fast-forward push rejection by updating the remote from another clone. Diagnose it using git status, git fetch, and git log. Resolve it safely, run the application tests, and push successfully. Also inspect a deliberately failing GitHub Actions check."
  },

  "2|Production Hands-on Lab": {
    overview: "This lab creates a production-style GitHub collaboration workflow for the payment-service application. It combines repository creation, Git fundamentals, branching, commits, pull requests, code review, branch protection, merge strategies, conflict resolution, webhooks, GitHub Actions, secrets, tags, and release approvals. The final result is a reviewed and traceable source version ready for Stage 03 pipeline triggering.",
    purpose: "A reliable CI/CD process begins with controlled source-code collaboration. Before Jenkins or another pipeline system builds the application, the repository must provide a clear history, protected integration branch, reviewed changes, automated validation, secure credentials, and traceable release versions.",
    architecture: "Developers work in local Git clones and publish short-lived branches to GitHub. Pull requests provide review and status checks. Branch rules protect main. GitHub Actions validates Maven builds. Webhooks can notify Jenkins of repository events. Secrets are stored securely. Annotated tags identify approved release versions, and protected environments enforce release approval.",
    workflow: [
      "Create a private GitHub repository named payment-service.",
      "Clone it locally and configure Git author identity.",
      "Add the Maven project and a suitable .gitignore.",
      "Create feature/payment-validation and implement a focused change.",
      "Commit the change and push the feature branch.",
      "Open a pull request with a clear description and test evidence.",
      "Configure a reviewer and review the complete diff.",
      "Protect main with required approvals and CI checks.",
      "Add a GitHub Actions workflow that runs mvn clean verify.",
      "Configure a test webhook and validate its delivery.",
      "Store any required automation credential as a protected secret.",
      "Merge the approved pull request using the team's chosen strategy.",
      "Create an annotated release tag and release notes.",
      "Configure a protected production approval gate for a future deployment."
    ],
    example: "A developer submits payment validation changes through feature/payment-validation. GitHub Actions runs Maven verification. A reviewer requests an additional invalid-amount test. The developer adds the test and pushes an update. After approval and successful checks, the pull request is squash-merged into main. The team creates a release tag for the verified commit and records the artifact version for the next CI/CD stage.",
    commands: [
      "git clone <repository-url> — clone the payment-service repository.",
      "git switch -c feature/payment-validation — create a feature branch.",
      "git status — inspect repository changes.",
      "git diff — review unstaged modifications.",
      "git add <file> — stage intended files.",
      "git commit -m \"Add payment validation\" — create a commit.",
      "git push -u origin feature/payment-validation — publish the branch.",
      "mvn clean verify — run the application build and tests.",
      "git log --oneline --graph --decorate --all — inspect repository history.",
      "git tag -a v1.0.0 -m \"Payment service release 1.0.0\" — create an annotated release tag.",
      "git push origin v1.0.0 — publish the release tag."
    ],
    configuration: "Use a private repository with a documented default branch. Add Java/Maven ignore rules. Require pull requests, independent approval, and successful CI checks on main. Configure a reviewed GitHub Actions workflow with least-privilege permissions. Store credentials in protected secrets or environments. Configure a webhook only when an external integration requires it. Restrict release-tag creation and production approval to authorized roles.",
    failures: [
      "Developers can push directly to main because branch protection is incomplete.",
      "The GitHub Actions workflow does not run because its YAML path or trigger is incorrect.",
      "The Maven build fails because the runner uses an incompatible JDK.",
      "The pull request cannot merge because required checks are missing.",
      "A merge conflict removes valid payment logic.",
      "A webhook fails because its endpoint or signature configuration is incorrect.",
      "A secret is unavailable to the workflow or is accidentally exposed.",
      "A release tag points to a commit that was not approved."
    ],
    recovery: [
      "Inspect repository rules and confirm main is protected.",
      "Check the Actions run logs, workflow YAML, and JDK version.",
      "Inspect pull-request status and satisfy each required check.",
      "Resolve conflicts by preserving intended behavior and rerunning tests.",
      "Inspect webhook delivery history and validate endpoint and signature handling.",
      "Rotate exposed credentials and restrict secret access.",
      "Verify the release tag points to the approved source commit.",
      "Record the final repository state and correct any policy gaps before proceeding."
    ],
    bestPractices: [
      "Keep feature branches short-lived and focused.",
      "Require independent review for important application changes.",
      "Protect main and release branches.",
      "Run build, test, and security checks before merge.",
      "Use a consistent merge strategy.",
      "Never commit secrets or generated artifacts.",
      "Use immutable versioned tags for releases.",
      "Keep an auditable mapping between pull request, commit, tag, and artifact.",
      "Use protected environments for sensitive release approval."
    ],
    exercise: "Complete the entire payment-service GitHub workflow. Demonstrate a feature branch, commit history, pull request, code review, protected main branch, passing GitHub Actions build, webhook delivery, protected test secret, and annotated release tag. Capture the approved commit hash and release version. The repository must be ready for Stage 03, where pipeline triggers will consume GitHub repository events."
  }
};