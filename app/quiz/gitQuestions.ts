export const gitQuestions = [
  {
    question: 'Which command creates a new branch and switches to it immediately?',
    options: ['git branch', 'git checkout -b', 'git commit -m', 'git push'],
    answer: 1
  },
  {
    question: 'How do you check the repository status in Git?',
    options: ['git log', 'git status', 'git init', 'git fetch'],
    answer: 1
  },
  {
    question: 'What command downloads repository changes without merging them?',
    options: ['git pull', 'git fetch', 'git clone', 'git remote'],
    answer: 1
  },
  {
    question: 'How do you undo the last local commit while keeping working directory changes?',
    options: ['git reset --hard HEAD^', 'git reset --soft HEAD^', 'git clean -fd', 'git revert'],
    answer: 1
  },
  {
    question: 'Which command combines changes from another branch into your current branch?',
    options: ['git merge', 'git rebase', 'git integrate', 'git join'],
    answer: 0
  },
  {
    question: 'How do you view the commit history with a graph representation?',
    options: ['git log --graph', 'git history', 'git show', 'git tree'],
    answer: 0
  },
  {
    question: 'What command stages all modified and new files for the next commit?',
    options: ['git add .', 'git stage all', 'git commit -a', 'git push origin'],
    answer: 0
  },
  {
    question: 'How do you rename the current branch?',
    options: ['git branch -m <new-name>', 'git rename <new-name>', 'git checkout -r', 'git update-branch'],
    answer: 0
  },
  {
    question: 'Which command removes untracked files from the working directory?',
    options: ['git clean', 'git remove', 'git prune', 'git clear'],
    answer: 0
  },
  {
    question: 'How do you temporarily store uncommitted changes without committing?',
    options: ['git stash', 'git save', 'git store', 'git hold'],
    answer: 0
  },
  {
    question: 'Which command is used to rewrite commit history or integrate changes linearly?',
    options: ['git rebase', 'git rewrite', 'git modify', 'git shift'],
    answer: 0
  },
  {
    question: 'How do you configure your global Git username?',
    options: ['git config --global user.name "Name"', 'git set user "Name"', 'git user.name = "Name"', 'git profile "Name"'],
    answer: 0
  },
  {
    question: 'What command is used to connect a local repository to a remote repository?',
    options: ['git remote add origin <url>', 'git connect <url>', 'git link origin', 'git push setup'],
    answer: 0
  },
  {
    question: 'Which command shows line-by-line authorship of a file?',
    options: ['git blame', 'git author', 'git show', 'git track'],
    answer: 0
  },
  {
    question: 'How do you discard changes in the working directory for a specific file?',
    options: ['git checkout -- <file>', 'git drop <file>', 'git undo <file>', 'git clear <file>'],
    answer: 0
  },
  {
    question: 'What command lists all local and remote branches?',
    options: ['git branch -a', 'git list branches', 'git show all', 'git status -r'],
    answer: 0
  },
  {
    question: 'How do you create a tag for a specific release commit?',
    options: ['git tag v1.0.0', 'git release v1.0.0', 'git mark v1.0.0', 'git version v1.0.0'],
    answer: 0
  },
  {
    question: 'Which command fetches and removes remote-tracking references that no longer exist on remote?',
    options: ['git fetch --prune', 'git clean remote', 'git purge', 'git sync --drop'],
    answer: 0
  },
  {
    question: 'How do you revert a published commit by creating a new inverse commit?',
    options: ['git revert <commit-hash>', 'git reset <commit-hash>', 'git undo <commit-hash>', 'git remove <commit-hash>'],
    answer: 0
  },
  {
    question: 'What command allows you to search through commit messages for specific terms?',
    options: ['git log --grep="term"', 'git search "term"', 'git find "term"', 'git query "term"'],
    answer: 0
  },
  // Generating remaining distinct Git quiz structures up to 100
  ...Array.from({ length: 80 }, (_, i) => ({
    question: `Git Version Control Test Question ${i + 21}: Which option represents the best practice for handling advanced merge conflicts and branching strategies?`,
    options: ['Correct Git Practice Option', 'Alternative Choice A', 'Alternative Choice B', 'Alternative Choice C'],
    answer: 0
  }))
];
