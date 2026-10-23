export interface GitQuestion {
  question: string;
  options: string[];
  answer: number;
}

export const gitQuestions: GitQuestion[] = [
  {
    question: "1. What is Git?",
    options: [
      "A programming language",
      "A distributed version control system",
      "A database",
      "A web server"
    ],
    answer: 1
  },
  {
    question: "2. Who created Git?",
    options: [
      "James Gosling",
      "Guido van Rossum",
      "Linus Torvalds",
      "Dennis Ritchie"
    ],
    answer: 2
  },
  {
    question: "3. What is the main purpose of Git?",
    options: [
      "To track changes in source code",
      "To host websites",
      "To create virtual machines",
      "To manage databases"
    ],
    answer: 0
  },
  {
    question: "4. Which command checks the installed Git version?",
    options: [
      "git check",
      "git version-check",
      "git --version",
      "git status --version"
    ],
    answer: 2
  },
  {
    question: "5. Which command initializes a Git repository?",
    options: [
      "git start",
      "git init",
      "git create",
      "git new"
    ],
    answer: 1
  },
  {
    question: "6. Which command shows the working tree status?",
    options: [
      "git log",
      "git branch",
      "git show",
      "git status"
    ],
    answer: 3
  },
  {
    question: "7. Which command stages a specific file?",
    options: [
      "git add filename",
      "git commit filename",
      "git push filename",
      "git save filename"
    ],
    answer: 0
  },
  {
    question: "8. Which command creates a commit?",
    options: [
      "git add",
      "git push",
      "git commit",
      "git stage"
    ],
    answer: 2
  },
  {
    question: "9. Which command sets your Git username globally?",
    options: [
      "git user set",
      "git config --global user.name \"Your Name\"",
      "git username --global",
      "git profile set"
    ],
    answer: 1
  },
  {
    question: "10. Which command sets your Git email globally?",
    options: [
      "git email set",
      "git config user.email --all",
      "git set-email",
      "git config --global user.email \"you@example.com\""
    ],
    answer: 3
  },
  {
    question: "11. What is a Git repository?",
    options: [
      "A place where Git stores project history and metadata",
      "A programming framework",
      "A network cable",
      "A text editor"
    ],
    answer: 0
  },
  {
    question: "12. What does the staging area do?",
    options: [
      "Deletes old commits",
      "Uploads code to GitHub",
      "Holds selected changes for the next commit",
      "Creates a remote repository"
    ],
    answer: 2
  },
  {
    question: "13. Which command stages all changes in the current directory?",
    options: [
      "git commit -a",
      "git add .",
      "git push .",
      "git stage --all"
    ],
    answer: 1
  },
  {
    question: "14. Which command displays commit history?",
    options: [
      "git status",
      "git branch",
      "git init",
      "git log"
    ],
    answer: 3
  },
  {
    question: "15. Which command displays a compact commit history?",
    options: [
      "git log --oneline",
      "git status --shortlog",
      "git commit --short",
      "git history --compact"
    ],
    answer: 0
  },
  {
    question: "16. What is a Git commit?",
    options: [
      "A remote server",
      "A branch deletion",
      "A recorded snapshot of repository changes",
      "A file download"
    ],
    answer: 2
  },
  {
    question: "17. Which command creates a new branch named feature?",
    options: [
      "git create feature",
      "git branch feature",
      "git init feature",
      "git new-branch feature"
    ],
    answer: 1
  },
  {
    question: "18. Which command switches to an existing branch?",
    options: [
      "git merge branch",
      "git branch --switch-only",
      "git push branch",
      "git switch branch"
    ],
    answer: 3
  },
  {
    question: "19. Which command creates a new branch and switches to it?",
    options: [
      "git switch -c feature",
      "git merge -c feature",
      "git push -c feature",
      "git checkout --delete feature"
    ],
    answer: 0
  },
  {
    question: "20. Which command lists local branches?",
    options: [
      "git list",
      "git show-branches",
      "git branch",
      "git branches --remote-only"
    ],
    answer: 2
  },
  {
    question: "21. Which command merges feature into the current branch?",
    options: [
      "git push feature",
      "git merge feature",
      "git add feature",
      "git commit feature"
    ],
    answer: 1
  },
  {
    question: "22. What is a merge conflict?",
    options: [
      "A missing Git installation",
      "A successful push",
      "A deleted repository",
      "An incompatible change Git cannot automatically reconcile"
    ],
    answer: 3
  },
  {
    question: "23. Which command downloads a remote repository as a local copy?",
    options: [
      "git clone URL",
      "git copy URL",
      "git download URL",
      "git init URL"
    ],
    answer: 0
  },
  {
    question: "24. Which command uploads local commits to a remote repository?",
    options: [
      "git fetch",
      "git pull",
      "git push",
      "git status"
    ],
    answer: 2
  },
  {
    question: "25. Which command downloads remote changes without integrating them into your current branch?",
    options: [
      "git push",
      "git fetch",
      "git commit",
      "git add"
    ],
    answer: 1
  },
  {
    question: "26. Which command fetches and integrates remote changes into the current branch?",
    options: [
      "git init",
      "git branch",
      "git clean",
      "git pull"
    ],
    answer: 3
  },
  {
    question: "27. What is a remote repository?",
    options: [
      "A repository hosted at another location, such as GitHub",
      "A local text file",
      "A staging directory",
      "A deleted branch"
    ],
    answer: 0
  },
  {
    question: "28. Which command lists configured remote repositories?",
    options: [
      "git remote-delete",
      "git list-remotes",
      "git remote -v",
      "git show-config"
    ],
    answer: 2
  },
  {
    question: "29. Which command adds a remote named origin?",
    options: [
      "git origin add URL",
      "git remote add origin URL",
      "git add remote origin",
      "git push origin URL"
    ],
    answer: 1
  },
  {
    question: "30. What is GitHub?",
    options: [
      "A Git command",
      "An operating system",
      "A programming language",
      "A platform for hosting Git repositories and collaborating"
    ],
    answer: 3
  },
  {
    question: "31. What is the difference between Git and GitHub?",
    options: [
      "Git is version control software; GitHub is a hosting and collaboration platform",
      "They are exactly the same",
      "GitHub is a Linux command",
      "Git only works with databases"
    ],
    answer: 0
  },
  {
    question: "32. Which command shows the changes between the working tree and staging area?",
    options: [
      "git log",
      "git branch",
      "git diff",
      "git remote"
    ],
    answer: 2
  },
  {
    question: "33. Which command shows staged changes compared with the last commit?",
    options: [
      "git diff",
      "git diff --cached",
      "git status --remote",
      "git log --cached"
    ],
    answer: 1
  },
  {
    question: "34. Which command unstages a staged file while keeping its changes?",
    options: [
      "git clean filename",
      "git delete filename",
      "git reset --hard HEAD",
      "git restore --staged filename"
    ],
    answer: 3
  },
  {
    question: "35. Which command discards unstaged changes in a tracked file?",
    options: [
      "git restore filename",
      "git commit filename",
      "git push filename",
      "git fetch filename"
    ],
    answer: 0
  },
  {
    question: "36. Which command creates a new commit that reverses an earlier commit?",
    options: [
      "git reset",
      "git clean",
      "git revert COMMIT_ID",
      "git delete COMMIT_ID"
    ],
    answer: 2
  },
  {
    question: "37. What does git reset --soft HEAD~1 do?",
    options: [
      "Deletes the entire repository",
      "Moves HEAD back one commit and keeps changes staged",
      "Deletes all branches",
      "Pushes a commit to origin"
    ],
    answer: 1
  },
  {
    question: "38. What does git reset --hard HEAD do?",
    options: [
      "Creates a new branch",
      "Uploads all files",
      "Reverts a remote repository automatically",
      "Resets tracked files and staging to HEAD, discarding local tracked changes"
    ],
    answer: 3
  },
  {
    question: "39. Which command temporarily saves tracked modifications and optionally untracked files?",
    options: [
      "git stash",
      "git save",
      "git archive",
      "git hold"
    ],
    answer: 0
  },
  {
    question: "40. Which command reapplies the latest stash and removes it from the stash list if successful?",
    options: [
      "git stash list",
      "git stash show",
      "git stash pop",
      "git stash clear"
    ],
    answer: 2
  },
  {
    question: "41. Which command lists saved stashes?",
    options: [
      "git stash show",
      "git stash list",
      "git stash pop",
      "git stash remove-all"
    ],
    answer: 1
  },
  {
    question: "42. Which command applies a stash without removing it from the stash list?",
    options: [
      "git stash delete",
      "git stash clear",
      "git stash pop",
      "git stash apply"
    ],
    answer: 3
  },
  {
    question: "43. What is a .gitignore file used for?",
    options: [
      "Specifying intentionally untracked files for Git to ignore",
      "Storing commit messages",
      "Saving remote passwords",
      "Creating Git branches"
    ],
    answer: 0
  },
  {
    question: "44. Which command removes untracked files from the working tree?",
    options: [
      "git restore",
      "git reset",
      "git clean",
      "git revert"
    ],
    answer: 2
  },
  {
    question: "45. Which command previews which untracked files git clean would remove?",
    options: [
      "git clean -f",
      "git clean -n",
      "git clean -x",
      "git clean --delete"
    ],
    answer: 1
  },
  {
    question: "46. What does HEAD usually represent in Git?",
    options: [
      "The remote server address",
      "The Git installation directory",
      "The .gitignore file",
      "The currently checked-out commit or reference"
    ],
    answer: 3
  },
  {
    question: "47. What is a detached HEAD state?",
    options: [
      "HEAD points directly to a commit rather than a local branch",
      "Git is uninstalled",
      "The repository has no files",
      "The remote server is offline"
    ],
    answer: 0
  },
  {
    question: "48. Which command displays information about a specific commit?",
    options: [
      "git init",
      "git clean",
      "git show COMMIT_ID",
      "git remote"
    ],
    answer: 2
  },
  {
    question: "49. Which command searches commit messages for a keyword?",
    options: [
      "git grep keyword",
      "git log --grep=\"keyword\"",
      "git status keyword",
      "git branch keyword"
    ],
    answer: 1
  },
  {
    question: "50. Which command searches tracked files for a text pattern?",
    options: [
      "git find",
      "git log --search-only",
      "git locate",
      "git grep \"pattern\""
    ],
    answer: 3
  },
  {
    question: "51. What is a Git tag commonly used for?",
    options: [
      "Marking a specific point in history, often a release",
      "Deleting a remote",
      "Staging all files",
      "Resolving every merge conflict"
    ],
    answer: 0
  },
  {
    question: "52. Which command creates a lightweight tag named v1.0?",
    options: [
      "git branch v1.0",
      "git commit v1.0",
      "git tag v1.0",
      "git release v1.0"
    ],
    answer: 2
  },
  {
    question: "53. Which command pushes the v1.0 tag to origin?",
    options: [
      "git push origin --branch v1.0",
      "git push origin v1.0",
      "git tag push v1.0",
      "git upload-tag v1.0"
    ],
    answer: 1
  },
  {
    question: "54. Which command deletes a local tag named v1.0?",
    options: [
      "git branch -d v1.0",
      "git tag --remove-remote v1.0",
      "git clean v1.0",
      "git tag -d v1.0"
    ],
    answer: 3
  },
  {
    question: "55. What does git cherry-pick do?",
    options: [
      "Applies changes from a specified commit onto the current branch",
      "Deletes all commits",
      "Creates a remote repository",
      "Ignores a commit"
    ],
    answer: 0
  },
  {
    question: "56. What does git rebase do?",
    options: [
      "Removes Git history permanently in every case",
      "Uploads files without commits",
      "Replays commits onto a new base commit",
      "Creates a .gitignore file"
    ],
    answer: 2
  },
  {
    question: "57. What is one major difference between merge and rebase?",
    options: [
      "Merge cannot combine branches",
      "Merge can create a merge commit; rebase replays commits onto a new base",
      "Rebase only works with remote branches",
      "Merge always deletes the source branch"
    ],
    answer: 1
  },
  {
    question: "58. Why should you be careful rebasing commits already shared with others?",
    options: [
      "Rebase disables Git",
      "Rebase deletes every remote repository",
      "Rebase makes all files read-only",
      "Rebase rewrites commit history and can disrupt collaborators"
    ],
    answer: 3
  },
  {
    question: "59. Which command continues a rebase after conflicts are resolved and files staged?",
    options: [
      "git rebase --continue",
      "git merge --finish",
      "git commit --rebase",
      "git push --continue"
    ],
    answer: 0
  },
  {
    question: "60. Which command aborts an in-progress rebase?",
    options: [
      "git rebase --delete",
      "git reset --remote",
      "git rebase --abort",
      "git rebase --remove"
    ],
    answer: 2
  },
  {
    question: "61. Which command shows the difference between two commits?",
    options: [
      "git status COMMIT1 COMMIT2",
      "git diff COMMIT1 COMMIT2",
      "git branch COMMIT1 COMMIT2",
      "git remote COMMIT1 COMMIT2"
    ],
    answer: 1
  },
  {
    question: "62. Which command displays the history of changes to HEAD and branch references?",
    options: [
      "git reflog",
      "git clean",
      "git init",
      "git remote -v"
    ],
    answer: 0
  },
  {
    question: "63. You accidentally reset a branch. Which command may help locate the previous commit reference?",
    options: [
      "git ignore",
      "git config",
      "git clean",
      "git reflog"
    ],
    answer: 3
  },
  {
    question: "64. What is the purpose of git bisect?",
    options: [
      "To rename remote repositories",
      "To encrypt files",
      "To find the commit that introduced a bug using binary search",
      "To delete old branches automatically"
    ],
    answer: 2
  },
  {
    question: "65. Which command starts a binary-search debugging session?",
    options: [
      "git bisect start",
      "git debug begin",
      "git log --bisect-only",
      "git branch --debug"
    ],
    answer: 0
  },
  {
    question: "66. Which command applies a commit's changes without creating a commit immediately?",
    options: [
      "git cherry-pick --delete",
      "git cherry-pick --no-commit COMMIT_ID",
      "git revert --remote",
      "git merge --remove"
    ],
    answer: 1
  },
  {
    question: "67. Which command renames a local branch?",
    options: [
      "git branch --move-remote",
      "git rename branch",
      "git switch --rename",
      "git branch -m new-name"
    ],
    answer: 3
  },
  {
    question: "68. Which command deletes a local branch that has been safely merged?",
    options: [
      "git branch --delete-all",
      "git clean -b",
      "git branch -d branch-name",
      "git remove branch-name"
    ],
    answer: 2
  },
  {
    question: "69. Which command force-deletes a local branch?",
    options: [
      "git branch -D branch-name",
      "git branch -d --safe branch-name",
      "git push -D branch-name",
      "git clean branch-name"
    ],
    answer: 0
  },
  {
    question: "70. Which command deletes a remote branch from origin?",
    options: [
      "git branch -d origin/branch-name",
      "git push origin --delete branch-name",
      "git remote remove branch-name",
      "git fetch --delete branch-name"
    ],
    answer: 1
  },
  {
    question: "71. What is a pull request used for on platforms like GitHub?",
    options: [
      "Installing Git",
      "Deleting a local repository",
      "Reviewing and proposing changes to merge into another branch",
      "Changing the operating system"
    ],
    answer: 2
  },
  {
    question: "72. What is a fork in GitHub?",
    options: [
      "A commit conflict",
      "A Git command that stages files",
      "A local branch rename",
      "A separate copy of a repository under another account or namespace"
    ],
    answer: 3
  },
  {
    question: "73. What is the purpose of a code review?",
    options: [
      "To inspect proposed changes for correctness, quality, and maintainability",
      "To disable version control",
      "To delete all tests",
      "To replace Git with Docker"
    ],
    answer: 0
  },
  {
    question: "74. Which command updates remote-tracking references and prunes deleted remote branches?",
    options: [
      "git push --prune-only",
      "git branch --clean",
      "git fetch --prune",
      "git clean --remote"
    ],
    answer: 2
  },
  {
    question: "75. What does origin usually mean in a Git repository?",
    options: [
      "The first commit",
      "A conventional name for a remote repository",
      "The staging area",
      "The current Git username"
    ],
    answer: 1
  },
  {
    question: "76. What is the default branch name in many newly created repositories today?",
    options: [
      "master-only",
      "production",
      "release",
      "main"
    ],
    answer: 3
  },
  {
    question: "77. Which command changes the last commit message without changing its contents?",
    options: [
      "git commit --amend -m \"New message\"",
      "git log --change-message",
      "git push --amend",
      "git message --update"
    ],
    answer: 0
  },
  {
    question: "78. What can happen if you amend a commit that has already been pushed?",
    options: [
      "Git automatically updates every collaborator's copy",
      "The repository is always deleted",
      "The commit hash changes and updating the remote may require a history rewrite",
      "Git prevents all future commits"
    ],
    answer: 2
  },
  {
    question: "79. Which command pushes a local branch and sets its upstream tracking branch?",
    options: [
      "git pull --set-upstream origin feature",
      "git push -u origin feature",
      "git branch --set-origin feature",
      "git remote track feature"
    ],
    answer: 1
  },
  {
    question: "80. What is an upstream branch?",
    options: [
      "A deleted branch",
      "A branch that cannot be merged",
      "A branch containing only tags",
      "A branch another local branch tracks for operations such as pull and status"
    ],
    answer: 3
  },
  {
    question: "81. Which command shows the configured Git settings?",
    options: [
      "git config --list",
      "git status --config-only",
      "git settings --show",
      "git list --settings"
    ],
    answer: 0
  },
  {
    question: "82. Which command sets the default initial branch name for new repositories to main?",
    options: [
      "git branch --global main",
      "git init --branch-default main",
      "git config --global init.defaultBranch main",
      "git config --branch main"
    ],
    answer: 2
  },
  {
    question: "83. What does git diff --stat display?",
    options: [
      "All repository passwords",
      "A summary of changed files and the number of insertions and deletions",
      "Only remote branches",
      "The full content of every commit"
    ],
    answer: 1
  },
  {
    question: "84. Which command shows a list of files changed in a commit?",
    options: [
      "git branch --files",
      "git remote --files",
      "git init --files",
      "git show --name-only COMMIT_ID"
    ],
    answer: 3
  },
  {
    question: "85. Which command lists files tracked by Git?",
    options: [
      "git ls-files",
      "git list-remote-files",
      "git status --tracked-only",
      "git files --all"
    ],
    answer: 0
  },
  {
    question: "86. What happens if you add a file to .gitignore after Git already tracks it?",
    options: [
      "Git automatically stops tracking it",
      "The repository becomes invalid",
      "Git continues tracking it until it is removed from the index",
      "Git deletes the file immediately"
    ],
    answer: 2
  },
  {
    question: "87. Which command stops tracking a file but keeps the local file?",
    options: [
      "git clean filename",
      "git rm --cached filename",
      "git restore --delete filename",
      "git reset --hard filename"
    ],
    answer: 1
  },
  {
    question: "88. What is the purpose of a Git hook?",
    options: [
      "To create a GitHub account",
      "To replace all commits",
      "To store large files by default",
      "To run custom scripts at specific Git events"
    ],
    answer: 3
  },
  {
    question: "89. Where are repository-specific Git hooks commonly stored?",
    options: [
      ".git/hooks",
      ".git/branches/hooks",
      "hooks.git",
      "git/hooks.config"
    ],
    answer: 0
  },
  {
    question: "90. What is Git LFS used for?",
    options: [
      "Creating Linux file systems",
      "Replacing every Git commit",
      "Managing large files using pointers and separate storage",
      "Automatically resolving all merge conflicts"
    ],
    answer: 2
  },
  {
    question: "91. What is a shallow clone?",
    options: [
      "A clone without any files",
      "A clone that retrieves limited commit history",
      "A clone containing only tags",
      "A clone that cannot use branches"
    ],
    answer: 1
  },
  {
    question: "92. Which command creates a shallow clone with only the latest commit history depth?",
    options: [
      "git clone --single-file URL",
      "git clone --no-branches URL",
      "git clone --history-none URL",
      "git clone --depth 1 URL"
    ],
    answer: 3
  },
  {
    question: "93. Which command initializes a repository with a specified initial branch name?",
    options: [
      "git init -b main",
      "git branch init main",
      "git create --remote main",
      "git switch --init main"
    ],
    answer: 0
  },
  {
    question: "94. What is a bare Git repository?",
    options: [
      "A repository with no commits allowed",
      "A repository that ignores all files",
      "A repository containing Git data without a normal checked-out working tree",
      "A repository that only works offline"
    ],
    answer: 2
  },
  {
    question: "95. Which command creates a bare repository?",
    options: [
      "git init --empty",
      "git init --bare",
      "git clone --bare-working-tree",
      "git create --server-only"
    ],
    answer: 1
  },
  {
    question: "96. In a CI/CD pipeline, why is Git commonly used?",
    options: [
      "To replace the build server",
      "To host running containers",
      "To provision cloud networks by itself",
      "To track source changes and trigger automated build or deployment workflows"
    ],
    answer: 3
  },
  {
    question: "97. A developer committed a secret API key. What is the best immediate action?",
    options: [
      "Revoke or rotate the exposed key, then address the repository history and exposure",
      "Only rename the file",
      "Add the key to .gitignore and do nothing else",
      "Delete the local Git installation"
    ],
    answer: 0
  },
  {
    question: "98. Which authentication method is commonly used to access Git remotes securely?",
    options: [
      "A Git commit message",
      "A branch name",
      "SSH keys or an HTTPS credential/token supported by the hosting service",
      "The .gitignore file"
    ],
    answer: 2
  },
  {
    question: "99. A push is rejected because the remote branch has new commits. What is a common safe next step?",
    options: [
      "Immediately delete the remote repository",
      "Fetch and integrate the remote changes, resolve conflicts if needed, then push",
      "Run git init again in the same repository",
      "Delete every local commit"
    ],
    answer: 1
  },
  {
    question: "100. Which Git practice is recommended for a production DevOps team?",
    options: [
      "Commit passwords directly into source code",
      "Force-push shared branches whenever possible",
      "Avoid reviewing code changes",
      "Use meaningful commits, review changes, protect important branches, and never commit secrets"
    ],
    answer: 3
  }
];
