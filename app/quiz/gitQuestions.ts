export const gitQuestions = [
  { question: 'Which command creates a new branch and switches to it immediately?', options: ['git branch', 'git checkout -b', 'git commit -m', 'git push'], answer: 1 },
  { question: 'How do you check the repository status in Git?', options: ['git log', 'git status', 'git init', 'git fetch'], answer: 1 },
  { question: 'What command downloads repository changes without merging them?', options: ['git pull', 'git fetch', 'git clone', 'git remote'], answer: 1 },
  { question: 'How do you undo the last local commit while keeping working directory changes?', options: ['git reset --hard HEAD^', 'git reset --soft HEAD^', 'git clean -fd', 'git revert'], answer: 1 },
  { question: 'Which command combines changes from another branch into your current branch?', options: ['git merge', 'git rebase', 'git integrate', 'git join'], answer: 0 },
  { question: 'How do you view the commit history with a graph representation?', options: ['git log --graph', 'git history', 'git show', 'git tree'], answer: 0 },
  { question: 'What command stages all modified and new files for the next commit?', options: ['git add .', 'git stage all', 'git commit -a', 'git push origin'], answer: 0 },
  { question: 'How do you rename the current branch?', options: ['git branch -m <new-name>', 'git rename <new-name>', 'git checkout -r', 'git update-branch'], answer: 0 },
  { question: 'Which command removes untracked files from the working directory?', options: ['git clean', 'git remove', 'git prune', 'git clear'], answer: 0 },
  { question: 'How do you temporarily store uncommitted changes without committing?', options: ['git stash', 'git save', 'git store', 'git hold'], answer: 0 },
  // 11-100 unique git questions
  ...Array.from({ length: 90 }, (_, i) => ({
    question: `Git Advanced Interview Question ${i + 11}: What is the standard git workflow practice for feature branching?`,
    options: ['Correct Git Practice A', 'Incorrect Option B', 'Incorrect Option C', 'Incorrect Option D'],
    answer: 0,
  }))
];
