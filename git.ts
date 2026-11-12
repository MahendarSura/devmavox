export interface InterviewQA {
  question: string;
  answer: string;
}
export const gitQuestions: InterviewQA[] = [
  {
    "question": "1. What is Git?",
    "answer": "Git is a distributed version control system used to track changes in source code and other files. It allows multiple developers to work on the same project while maintaining a history of modifications. Each developer can maintain a local repository and synchronize changes with shared remote repositories. Git supports branching, merging, collaboration, and recovery of previous versions. In a DevOps workflow, developers commit changes to Git and those changes can trigger automated testing, security checks, and application deployment through CI/CD pipelines."
  },
  {
    "question": "2. Why is Git important in DevOps?",
    "answer": "Git provides the version history and collaboration foundation used by modern DevOps teams. Infrastructure definitions, application code, configuration files, and pipeline definitions can all be stored in repositories. This makes changes reviewable, traceable, and repeatable. Teams can connect Git events to automated build, test, and deployment workflows. For example, when a developer opens a pull request, the CI pipeline can run unit tests and code quality checks before the change is approved and merged into the main branch."
  },
  {
    "question": "3. What is a Git repository?",
    "answer": "A Git repository is a storage location that contains project files and the history of changes tracked by Git. It includes metadata maintained inside the .git directory, such as commits, branches, tags, and configuration. A repository can exist locally on a developer's machine or remotely on platforms such as GitHub and GitLab. Developers use repositories to collaborate and preserve project history. For example, a DevOps team may maintain application code, Dockerfiles, Kubernetes manifests, and deployment scripts in one repository."
  },
  {
    "question": "4. What is the difference between Git and GitHub?",
    "answer": "Git is the version control software that tracks changes in files, while GitHub is a hosting and collaboration platform for Git repositories. Git can operate locally without GitHub, but GitHub provides features such as pull requests, code reviews, issue tracking, repository permissions, and hosted automation. A developer uses Git commands to commit and push code, while GitHub provides the remote location where teammates can review and collaborate on those changes. They work together but are not the same product."
  },
  {
    "question": "5. What is a working directory in Git?",
    "answer": "The working directory is the checked-out project area where a developer views and edits files. Changes made in this directory are not automatically committed to repository history. Git compares the working directory with the index and the latest commit to determine which files have been modified, added, or deleted. Developers use git status to understand the current state of their files. For example, after modifying an application configuration file, the change appears as an unstaged modification until it is added to the staging area."
  },
  {
    "question": "6. What is the staging area in Git?",
    "answer": "The staging area, also called the index, is an intermediate area where developers prepare changes before creating a commit. It allows a developer to select specific file changes rather than committing every modification in the working directory. The git add command places changes into the staging area, and git status shows which changes are staged. This is useful when a developer works on multiple tasks but wants to create a focused commit containing only one logical change."
  },
  {
    "question": "7. What is a Git commit?",
    "answer": "A commit is a saved snapshot of the staged changes in a Git repository. Each commit contains information such as a unique identifier, author, timestamp, commit message, and references to its parent commit or commits. Commits create the project's historical record and allow developers to inspect or restore earlier states. A good commit should represent one logical change and have a clear message. For example, a commit named Fix payment API timeout handling communicates its purpose more effectively than a message such as update."
  },
  {
    "question": "8. What is a Git branch?",
    "answer": "A branch is a movable reference that points to a commit in a Git repository. Branches allow developers to work on separate features, fixes, or releases without directly changing the main development line. A developer can create a feature branch, commit changes, and later merge the work after review. Branching supports parallel development and reduces the risk of unfinished code affecting production. Teams commonly use branches such as main, develop, feature, release, and hotfix according to their workflow."
  },
  {
    "question": "9. What is the main branch?",
    "answer": "The main branch is commonly used as the primary branch representing the accepted or stable project history. Teams often protect it with pull request reviews, automated tests, and required status checks. Direct pushes may be restricted so that changes are reviewed before integration. In a production delivery process, merging an approved pull request into main can trigger a release pipeline. The exact meaning of main depends on the team's branching strategy, but it generally represents an important integration or release line."
  },
  {
    "question": "10. What is the difference between git fetch and git pull?",
    "answer": "git fetch downloads new commits and references from a remote repository without automatically integrating those changes into the current branch. This allows developers to inspect incoming changes before deciding how to apply them. git pull performs a fetch and then integrates the changes into the current branch, typically through merge or rebase depending on configuration and options. Fetch is useful when a developer wants to review remote updates safely, while pull is convenient when the developer is ready to update the current branch."
  },
  {
    "question": "11. What is git push?",
    "answer": "git push sends local commits to a remote repository and updates the corresponding remote branch when the operation is accepted. It allows teammates and CI/CD systems to access the latest committed changes. A push may be rejected if the remote branch contains changes that the local branch does not have or if repository permissions and branch protection rules prevent the update. Developers should review the branch state and synchronize changes carefully rather than force-pushing shared branches without understanding the impact."
  },
  {
    "question": "12. What is git clone?",
    "answer": "git clone creates a local copy of an existing remote Git repository. It downloads the repository data and creates a working directory with the relevant files and Git metadata. Cloning is commonly the first step when a new developer joins a project or a build agent needs source code for a pipeline. For example, a CI runner clones a repository before executing build and test commands. After cloning, developers can create branches, commit changes, and synchronize with the remote repository."
  },
  {
    "question": "13. What is git init?",
    "answer": "git init initializes a new Git repository in the current directory or in a specified directory. It creates the .git metadata directory that Git uses to manage commits, branches, configuration, and repository history. It is useful when starting version control for an existing project that is not yet tracked by Git. After initialization, developers add files, create the first commit, and optionally connect the local repository to a remote hosting platform."
  },
  {
    "question": "14. What is git status?",
    "answer": "git status displays the current state of the working directory and staging area. It identifies modified files, untracked files, staged changes, and the relationship between the current branch and its upstream branch. This command helps developers understand what will be included in the next commit and whether remote changes are available. It is especially useful before committing or switching branches because it helps prevent accidental loss or mixing of unfinished work."
  },
  {
    "question": "15. What is git log?",
    "answer": "git log displays the commit history of a repository. It can show commit identifiers, authors, dates, and commit messages, with options to filter or format the output. Engineers use it to investigate when a change was introduced, understand the sequence of modifications, and identify commits related to a defect. Options such as --oneline and --graph provide compact or visual representations of history. In production troubleshooting, commit history can help identify the code change associated with a newly introduced issue."
  },
  {
    "question": "16. What is git diff?",
    "answer": "git diff displays differences between file versions or repository states. It can compare working directory changes with the staging area, staged changes with the latest commit, or different commits and branches. Developers use it to review exactly what has changed before committing or merging. This is important because a developer may unintentionally modify unrelated configuration or application files. Reviewing diffs helps improve commit quality and reduces the chance of introducing accidental changes into a shared codebase."
  },
  {
    "question": "17. What is git merge?",
    "answer": "git merge integrates changes from one branch into another. Git combines the histories and changes of the branches, creating a merge commit when necessary or using a fast-forward update when possible. Teams commonly merge a reviewed feature branch into main after tests pass. If both branches modify the same lines in incompatible ways, Git reports a merge conflict that must be resolved manually. Developers should test the resulting code after resolving conflicts to ensure that the combined changes behave correctly."
  },
  {
    "question": "18. What is git rebase?",
    "answer": "git rebase moves or reapplies commits from one branch onto another base commit. It can create a cleaner, more linear history by replaying feature branch commits on top of the latest target branch. Developers often rebase a feature branch before opening or completing a pull request. Rebase rewrites commit history, so it must be used carefully on branches shared with other developers. Teams should agree on safe practices and avoid rewriting published shared history without coordination."
  },
  {
    "question": "19. What is a merge conflict?",
    "answer": "A merge conflict occurs when Git cannot automatically combine changes from different branches or commits. This commonly happens when multiple developers modify the same lines of a file or when one branch deletes content that another branch changes. Git marks the conflicting sections so the developer can review both versions and decide on the correct result. After editing the file, the developer stages the resolution and completes the merge or rebase. Tests should be run because a conflict-free resolution is not automatically a correct application change."
  },
  {
    "question": "20. What is git stash?",
    "answer": "git stash temporarily saves uncommitted changes so a developer can move to another branch or perform another task without creating a commit. It can save tracked file modifications and staged changes, with options for including untracked files. Later, the developer can reapply the saved changes using stash apply or restore and remove them using stash pop. Stash is useful when an urgent production fix requires switching branches while the current feature work is incomplete."
  },
  {
    "question": "21. What is git reset?",
    "answer": "git reset moves the current branch reference to another commit and can also change the staging area or working directory depending on the selected mode. The --soft option keeps changes staged, --mixed resets the staging area while preserving working directory changes, and --hard resets both the index and working directory. Because --hard can discard local modifications, it should be used carefully. Developers should understand the target commit and preserve important work before performing destructive reset operations."
  },
  {
    "question": "22. What is git revert?",
    "answer": "git revert creates a new commit that reverses the changes introduced by an earlier commit. Unlike reset, it does not remove the original commit from history. This makes revert particularly useful for shared branches and production repositories where history should remain traceable. For example, if a recently deployed feature introduces a serious defect, a team can revert the problematic commit and deploy the resulting change. The original commit remains visible, helping reviewers understand what happened and why it was reversed."
  },
  {
    "question": "23. What is the difference between git reset and git revert?",
    "answer": "git reset changes the current branch reference and may remove commits from the visible branch history, depending on how it is used. git revert preserves the existing history and creates a new commit that reverses earlier changes. Reset is commonly used for local cleanup before changes are shared, while revert is generally safer for undoing changes already pushed to a shared branch. In production repositories, revert is often preferred because it provides an auditable record of the corrective action."
  },
  {
    "question": "24. What is .gitignore?",
    "answer": "The .gitignore file specifies intentionally untracked files and directories that Git should ignore. It commonly excludes build output, dependency folders, temporary files, local environment configuration, and generated logs. For example, a Node.js project may ignore node_modules and local environment files. A .gitignore rule does not automatically remove files that are already tracked by Git, so previously committed sensitive or generated files require separate handling. Teams should maintain ignore rules to keep repositories clean and avoid accidentally committing local-only content."
  },
  {
    "question": "25. What is a remote repository?",
    "answer": "A remote repository is a version of a Git repository hosted outside the local working environment, commonly on GitHub, GitLab, or Bitbucket. It provides a shared location for developers and automation systems to exchange commits. Git stores remote names and URLs so commands such as fetch, pull, and push can communicate with the correct repository. The default remote is often named origin. Access permissions and authentication determine whether a user or pipeline can read from or write to the remote repository."
  },
  {
    "question": "26. What is the origin in Git?",
    "answer": "origin is the conventional default name assigned to the remote repository when a local repository is cloned. It is simply a remote alias and not a special Git server or mandatory name. Developers use commands such as git fetch origin and git push origin main to synchronize with that remote. A repository can have multiple remotes with different names. Understanding remote configuration is useful when working with forks, upstream repositories, and separate company or personal repositories."
  },
  {
    "question": "27. What is a pull request?",
    "answer": "A pull request is a collaboration mechanism used by hosting platforms such as GitHub to propose changes from one branch into another. It provides a place for reviewers to inspect code differences, discuss implementation details, request changes, and verify automated checks. A pull request can also trigger CI pipelines that run tests and security analysis. Once required approvals and checks are complete, the changes can be merged. This review process improves code quality and reduces the risk of untested changes entering important branches."
  },
  {
    "question": "28. What is a Git tag?",
    "answer": "A Git tag is a reference used to identify a specific commit, commonly for marking releases or important project milestones. Lightweight tags are simple references, while annotated tags contain additional metadata such as a message, tagger, and date. Teams often create tags such as v1.0.0 when releasing an application. CI/CD pipelines can use tags to trigger release builds and publish versioned artifacts. Tags provide a stable way to identify the source code associated with a particular release."
  },
  {
    "question": "29. What is cherry-pick in Git?",
    "answer": "git cherry-pick applies the changes introduced by a specific commit onto the current branch. It is useful when a team needs one targeted fix from another branch without merging all of that branch's history. For example, a critical bug fix committed to a development branch may need to be applied to a maintenance release branch. Cherry-picking creates a new commit with the selected change, so teams should track the operation carefully to avoid duplicated or conflicting changes later."
  },
  {
    "question": "30. What is a detached HEAD state?",
    "answer": "A detached HEAD state occurs when Git checks out a specific commit rather than a branch reference. The developer can inspect files and run tests at that historical point, but new commits will not automatically belong to an existing branch. If the developer creates useful commits in this state, they should create a branch to preserve them. Detached HEAD is often encountered when checking out tags or historical commits during debugging and release investigation."
  },
  {
    "question": "31. What is git bisect?",
    "answer": "git bisect is a debugging tool that uses binary search to identify the commit that introduced a defect. The developer marks a known bad commit and a known good commit, and Git checks out intermediate commits for testing. By repeatedly identifying whether each tested version is good or bad, the search narrows down the problematic change. This is useful in large repositories where many commits have been introduced between the last known working version and the first observed failure."
  },
  {
    "question": "32. What is a fork in Git hosting platforms?",
    "answer": "A fork is a separate copy of a repository under another user or organization account on a hosting platform. It allows contributors to make changes without having direct write access to the original repository. After making and testing changes in the fork, a contributor can propose them through a pull request. Forks are common in open-source collaboration and can also be used in enterprise workflows where teams maintain controlled contribution boundaries."
  },
  {
    "question": "33. How do you resolve a rejected Git push?",
    "answer": "A push may be rejected because the remote branch contains commits that are missing locally, branch protection rules block the update, or the user lacks permission. Engineers first inspect the error message and current branch state using git status and git log. If remote changes are the cause, they fetch and integrate them through an appropriate merge or rebase workflow, resolve conflicts, test the result, and push again. They should not immediately use force push because it may overwrite teammates' work."
  },
  {
    "question": "34. How do you recover a deleted commit in Git?",
    "answer": "A commit that is no longer referenced by a branch may still be recoverable for some time through Git's object database and reflog. The reflog records recent changes to local references, including branch movements and resets. Engineers inspect it using git reflog, identify the required commit identifier, and create a recovery branch or reset a reference to that commit. Recovery becomes harder after unreachable objects are pruned, so important work should be recovered promptly and backed up."
  },
  {
    "question": "35. Explain a real-time Git workflow in a DevOps team.",
    "answer": "A typical workflow begins when a developer clones the repository and creates a feature branch from the agreed base branch. The developer makes focused changes, reviews the diff, stages the required files, and creates meaningful commits. The branch is pushed to the remote repository and a pull request is opened. Automated pipelines run tests, linting, security checks, and builds while reviewers inspect the changes. After approval, the branch is merged, and the merge event can trigger packaging and deployment to the next environment."
  }
];

