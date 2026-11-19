import type { AtoZLesson } from "../lessons";

// Complete topic-specific Git and GitHub lessons for the DevOps A–Z Telugu learning library.
export const gitGithubAtoZLessons: Record<string, AtoZLesson> = {
  "git-github/version-control-concepts": {
    "summary": "Version Control Concepts Git and GitHub workflow lo important concept. Version control system source code and configuration changes history ni track chesthundi. Git distributed VCS; each clone local repository history maintain chesthundi.",
    "diagram": {
      "title": "Version Control Concepts workflow",
      "nodes": [
        "Working files",
        "change tracking",
        "commit snapshot",
        "shared remote collaboration"
      ],
      "explanation": "Version Control Concepts lo data/state ela move avuthundo ee flow chupisthundi: Working files → change tracking → commit snapshot → shared remote collaboration. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. Version Control Concepts ante enti?",
        "paragraphs": [
          "Version control system source code and configuration changes history ni track chesthundi. Git distributed VCS; each clone local repository history maintain chesthundi.",
          "Simple ga cheppalante, Version Control Concepts source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "VCS",
          "distributed",
          "commit",
          "snapshot",
          "repository",
          "working tree",
          "remote",
          "history."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Team collaboration, audit trail, rollback and parallel development kosam.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Working files → change tracking → commit snapshot → shared remote collaboration. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "VCS",
          "distributed",
          "commit",
          "snapshot",
          "repository",
          "working tree",
          "remote",
          "history."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git --version; git init; git status; git log --oneline; git diff; git show HEAD",
        "note": "Git commit automatically remote ki upload cheyyadu; commit local history lo matrame untundi."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Multiple engineers same application meeda branches lo work chesi reviewed commits merge chestharu.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Git commit automatically remote ki upload cheyyadu; commit local history lo matrame untundi.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Commit secrets cheyyakandi, signed commits and protected branches use cheyyandi, backups maintain cheyyandi.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is Version Control Concepts?",
          "Answer: Version control system source code and configuration changes history ni track chesthundi. Git distributed VCS; each clone local repository history maintain chesthundi. Team collaboration, audit trail, rollback and parallel development kosam.",
          "Question: What is a safe way to troubleshoot Version Control Concepts?",
          "Answer: Git commit automatically remote ki upload cheyyadu; commit local history lo matrame untundi. Commit secrets cheyyakandi, signed commits and protected branches use cheyyandi, backups maintain cheyyandi."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Create local repository, modify a file, inspect diff, commit and view history.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Version Control Concepts?",
        "answer": "Version control system source code and configuration changes history ni track chesthundi. Git distributed VCS; each clone local repository history maintain chesthundi. Team collaboration, audit trail, rollback and parallel development kosam."
      },
      {
        "question": "How would you use or troubleshoot Version Control Concepts in a team repository?",
        "answer": "Multiple engineers same application meeda branches lo work chesi reviewed commits merge chestharu. Git commit automatically remote ki upload cheyyadu; commit local history lo matrame untundi. Commit secrets cheyyakandi, signed commits and protected branches use cheyyandi, backups maintain cheyyandi."
      }
    ],
    "handsOn": [
      "Create local repository, modify a file, inspect diff, commit and view history.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/git-architecture": {
    "summary": "Git Architecture Git and GitHub workflow lo important concept. Git architecture working directory, staging/index, local object database and refs/branches ni separate ga maintain chesthundi.",
    "diagram": {
      "title": "Git Architecture workflow",
      "nodes": [
        "Working tree",
        "index/staging area",
        "commit object",
        "branch reference",
        "remote reference"
      ],
      "explanation": "Git Architecture lo data/state ela move avuthundo ee flow chupisthundi: Working tree → index/staging area → commit object → branch reference → remote reference. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. Git Architecture ante enti?",
        "paragraphs": [
          "Git architecture working directory, staging/index, local object database and refs/branches ni separate ga maintain chesthundi.",
          "Simple ga cheppalante, Git Architecture source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "blob",
          "tree",
          "commit object",
          "index",
          "HEAD",
          "ref",
          "branch",
          "object hash."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Changes exactly em commit avuthayo understand chesi safe workflows use cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Working tree → index/staging area → commit object → branch reference → remote reference. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "blob",
          "tree",
          "commit object",
          "index",
          "HEAD",
          "ref",
          "branch",
          "object hash."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git status; git ls-files; git add file.txt; git diff; git diff --cached; git cat-file -p HEAD; git branch -avv",
        "note": "`git add .` unintended files stage cheyochu; staged and unstaged diff separate ga review cheyyali."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Developer only selected files stage chesi unrelated local changes commit lo include kakunda control chesthadu.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "`git add .` unintended files stage cheyochu; staged and unstaged diff separate ga review cheyyali.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Inspect staged diff before commit and avoid force-push on shared branch.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is Git Architecture?",
          "Answer: Git architecture working directory, staging/index, local object database and refs/branches ni separate ga maintain chesthundi. Changes exactly em commit avuthayo understand chesi safe workflows use cheyadaniki.",
          "Question: What is a safe way to troubleshoot Git Architecture?",
          "Answer: `git add .` unintended files stage cheyochu; staged and unstaged diff separate ga review cheyyali. Inspect staged diff before commit and avoid force-push on shared branch."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Change two files, stage one, compare git diff and git diff --cached, then commit.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Git Architecture?",
        "answer": "Git architecture working directory, staging/index, local object database and refs/branches ni separate ga maintain chesthundi. Changes exactly em commit avuthayo understand chesi safe workflows use cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot Git Architecture in a team repository?",
        "answer": "Developer only selected files stage chesi unrelated local changes commit lo include kakunda control chesthadu. `git add .` unintended files stage cheyochu; staged and unstaged diff separate ga review cheyyali. Inspect staged diff before commit and avoid force-push on shared branch."
      }
    ],
    "handsOn": [
      "Change two files, stage one, compare git diff and git diff --cached, then commit.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/git-installation-and-configuration": {
    "summary": "Git Installation and Configuration Git and GitHub workflow lo important concept. Git install ayyaka user identity, default branch, editor, credential helper and line-ending behavior configure cheyyali.",
    "diagram": {
      "title": "Git Installation and Configuration workflow",
      "nodes": [
        "Install binary",
        "system/global/local config precedence",
        "repository commands read effective settings"
      ],
      "explanation": "Git Installation and Configuration lo data/state ela move avuthundo ee flow chupisthundi: Install binary → system/global/local config precedence → repository commands read effective settings. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. Git Installation and Configuration ante enti?",
        "paragraphs": [
          "Git install ayyaka user identity, default branch, editor, credential helper and line-ending behavior configure cheyyali.",
          "Simple ga cheppalante, Git Installation and Configuration source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "system config",
          "global ~/.gitconfig",
          "local .git/config",
          "user.name",
          "user.email",
          "credential helper."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Commits correct author details tho create avvadam and consistent developer environment maintain cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Install binary → system/global/local config precedence → repository commands read effective settings. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "system config",
          "global ~/.gitconfig",
          "local .git/config",
          "user.name",
          "user.email",
          "credential helper."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git --version; git config --global user.name \"Dev User\"; git config --global user.email \"dev@example.com\"; git config --show-origin --list; git config --global init.defaultBranch main",
        "note": "Wrong email commits author attribution affect chesthundi; credential plaintext storage avoid cheyyali."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "New CI runner lo bot identity configure chesi automation commits attributable ga maintain chestham.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Wrong email commits author attribution affect chesthundi; credential plaintext storage avoid cheyyali.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use organization-approved identity, secure credential manager and per-repo config when needed.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is Git Installation and Configuration?",
          "Answer: Git install ayyaka user identity, default branch, editor, credential helper and line-ending behavior configure cheyyali. Commits correct author details tho create avvadam and consistent developer environment maintain cheyadaniki.",
          "Question: What is a safe way to troubleshoot Git Installation and Configuration?",
          "Answer: Wrong email commits author attribution affect chesthundi; credential plaintext storage avoid cheyyali. Use organization-approved identity, secure credential manager and per-repo config when needed."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Set local test repo identity and inspect which config file supplies each value.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Git Installation and Configuration?",
        "answer": "Git install ayyaka user identity, default branch, editor, credential helper and line-ending behavior configure cheyyali. Commits correct author details tho create avvadam and consistent developer environment maintain cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot Git Installation and Configuration in a team repository?",
        "answer": "New CI runner lo bot identity configure chesi automation commits attributable ga maintain chestham. Wrong email commits author attribution affect chesthundi; credential plaintext storage avoid cheyyali. Use organization-approved identity, secure credential manager and per-repo config when needed."
      }
    ],
    "handsOn": [
      "Set local test repo identity and inspect which config file supplies each value.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/repositories": {
    "summary": "Repositories Git and GitHub workflow lo important concept. Git repository project files and complete commit history ni `.git` database lo store chesthundi. Bare repository working tree lekunda sharing/server hosting ki use avuthundi.",
    "diagram": {
      "title": "Repositories workflow",
      "nodes": [
        "Repository initialization/clone",
        "object database and refs",
        "working tree checkout",
        "commits"
      ],
      "explanation": "Repositories lo data/state ela move avuthundo ee flow chupisthundi: Repository initialization/clone → object database and refs → working tree checkout → commits. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. Repositories ante enti?",
        "paragraphs": [
          "Git repository project files and complete commit history ni `.git` database lo store chesthundi. Bare repository working tree lekunda sharing/server hosting ki use avuthundi.",
          "Simple ga cheppalante, Repositories source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "working repository",
          "bare repository",
          ".git directory",
          "object database",
          "refs",
          "remote."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Project history, branches, tags and collaboration metadata preserve cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Repository initialization/clone → object database and refs → working tree checkout → commits. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "working repository",
          "bare repository",
          ".git directory",
          "object database",
          "refs",
          "remote."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git init; git clone URL; git rev-parse --show-toplevel; git status; git remote -v; git fsck --full",
        "note": "`.git` directory delete chesthe local history/config lost avvachu; repo nested inside another repo accidental ga create cheyyakandi."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Team GitHub repo clone chesi feature branch create chesi changes push chesthundi.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "`.git` directory delete chesthe local history/config lost avvachu; repo nested inside another repo accidental ga create cheyyakandi.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Protect repository access, backup remotes and review `.gitignore` for secrets/build outputs.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is Repositories?",
          "Answer: Git repository project files and complete commit history ni `.git` database lo store chesthundi. Bare repository working tree lekunda sharing/server hosting ki use avuthundi. Project history, branches, tags and collaboration metadata preserve cheyadaniki.",
          "Question: What is a safe way to troubleshoot Repositories?",
          "Answer: `.git` directory delete chesthe local history/config lost avvachu; repo nested inside another repo accidental ga create cheyyakandi. Protect repository access, backup remotes and review `.gitignore` for secrets/build outputs."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Initialize a repo, create file and commit, inspect .git metadata and repository root.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Repositories?",
        "answer": "Git repository project files and complete commit history ni `.git` database lo store chesthundi. Bare repository working tree lekunda sharing/server hosting ki use avuthundi. Project history, branches, tags and collaboration metadata preserve cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot Repositories in a team repository?",
        "answer": "Team GitHub repo clone chesi feature branch create chesi changes push chesthundi. `.git` directory delete chesthe local history/config lost avvachu; repo nested inside another repo accidental ga create cheyyakandi. Protect repository access, backup remotes and review `.gitignore` for secrets/build outputs."
      }
    ],
    "handsOn": [
      "Initialize a repo, create file and commit, inspect .git metadata and repository root.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/working-tree-and-staging-area": {
    "summary": "Working Tree and Staging Area Git and GitHub workflow lo important concept. Working tree current checked-out files; staging area/index next commit lo include cheyyaboye exact snapshot ni hold chesthundi.",
    "diagram": {
      "title": "Working Tree and Staging Area workflow",
      "nodes": [
        "Edit working file",
        "inspect unstaged diff",
        "stage selected change",
        "inspect staged diff",
        "commit"
      ],
      "explanation": "Working Tree and Staging Area lo data/state ela move avuthundo ee flow chupisthundi: Edit working file → inspect unstaged diff → stage selected change → inspect staged diff → commit. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. Working Tree and Staging Area ante enti?",
        "paragraphs": [
          "Working tree current checked-out files; staging area/index next commit lo include cheyyaboye exact snapshot ni hold chesthundi.",
          "Simple ga cheppalante, Working Tree and Staging Area source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "unstaged",
          "staged",
          "index",
          "cached diff",
          "partial staging",
          "restore --staged."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "One commit lo logically related changes matrame include cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Edit working file → inspect unstaged diff → stage selected change → inspect staged diff → commit. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "unstaged",
          "staged",
          "index",
          "cached diff",
          "partial staging",
          "restore --staged."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git status --short; git diff; git add src/app.ts; git diff --cached; git restore --staged src/app.ts",
        "note": "Staging area ni inspect cheyakunda commit chesthe unrelated config or generated files enter avvachu."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Developer bug fix and formatting change same file lo chesina bug fix lines matrame stage chesthadu.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Staging area ni inspect cheyakunda commit chesthe unrelated config or generated files enter avvachu.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use `git add -p`, review cached diff and keep commits focused.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is Working Tree and Staging Area?",
          "Answer: Working tree current checked-out files; staging area/index next commit lo include cheyyaboye exact snapshot ni hold chesthundi. One commit lo logically related changes matrame include cheyadaniki.",
          "Question: What is a safe way to troubleshoot Working Tree and Staging Area?",
          "Answer: Staging area ni inspect cheyakunda commit chesthe unrelated config or generated files enter avvachu. Use `git add -p`, review cached diff and keep commits focused."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Modify two sections, stage interactively one hunk, verify staged versus unstaged changes.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Working Tree and Staging Area?",
        "answer": "Working tree current checked-out files; staging area/index next commit lo include cheyyaboye exact snapshot ni hold chesthundi. One commit lo logically related changes matrame include cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot Working Tree and Staging Area in a team repository?",
        "answer": "Developer bug fix and formatting change same file lo chesina bug fix lines matrame stage chesthadu. Staging area ni inspect cheyakunda commit chesthe unrelated config or generated files enter avvachu. Use `git add -p`, review cached diff and keep commits focused."
      }
    ],
    "handsOn": [
      "Modify two sections, stage interactively one hunk, verify staged versus unstaged changes.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/git-init-and-clone": {
    "summary": "git init and clone Git and GitHub workflow lo important concept. `git init` current directory lo new local repository create chesthundi; `git clone` existing remote repository and history copy chesi working tree create chesthundi.",
    "diagram": {
      "title": "git init and clone workflow",
      "nodes": [
        "init: directory",
        ".git metadata; clone: remote URL",
        "objects/refs",
        "checkout default branch"
      ],
      "explanation": "git init and clone lo data/state ela move avuthundo ee flow chupisthundi: init: directory → .git metadata; clone: remote URL → objects/refs → checkout default branch. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. git init and clone ante enti?",
        "paragraphs": [
          "`git init` current directory lo new local repository create chesthundi; `git clone` existing remote repository and history copy chesi working tree create chesthundi.",
          "Simple ga cheppalante, git init and clone source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "working directory",
          "origin",
          "default branch",
          "shallow clone",
          "checkout",
          "remote tracking branch."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "New project start cheyadaniki or existing team project local machine ki tecchukodaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: init: directory → .git metadata; clone: remote URL → objects/refs → checkout default branch. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "working directory",
          "origin",
          "default branch",
          "shallow clone",
          "checkout",
          "remote tracking branch."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "mkdir demo && cd demo && git init; git clone https://github.com/org/repo.git; git clone --depth 1 URL; git remote -v",
        "note": "Shallow clone history limited; wrong parent directory lo init nested repository create chesthundi."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "New microservice repo init chesi GitHub remote add chestham; existing service debugging kosam clone chestham.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Shallow clone history limited; wrong parent directory lo init nested repository create chesthundi.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Verify URL, branch and repository root; use approved authentication and avoid embedding tokens in clone URL.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is git init and clone?",
          "Answer: `git init` current directory lo new local repository create chesthundi; `git clone` existing remote repository and history copy chesi working tree create chesthundi. New project start cheyadaniki or existing team project local machine ki tecchukodaniki.",
          "Question: What is a safe way to troubleshoot git init and clone?",
          "Answer: Shallow clone history limited; wrong parent directory lo init nested repository create chesthundi. Verify URL, branch and repository root; use approved authentication and avoid embedding tokens in clone URL."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Create local repo and clone a public/demo repo; compare .git and remote -v.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is git init and clone?",
        "answer": "`git init` current directory lo new local repository create chesthundi; `git clone` existing remote repository and history copy chesi working tree create chesthundi. New project start cheyadaniki or existing team project local machine ki tecchukodaniki."
      },
      {
        "question": "How would you use or troubleshoot git init and clone in a team repository?",
        "answer": "New microservice repo init chesi GitHub remote add chestham; existing service debugging kosam clone chestham. Shallow clone history limited; wrong parent directory lo init nested repository create chesthundi. Verify URL, branch and repository root; use approved authentication and avoid embedding tokens in clone URL."
      }
    ],
    "handsOn": [
      "Create local repo and clone a public/demo repo; compare .git and remote -v.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/git-add-and-commit": {
    "summary": "git add and commit Git and GitHub workflow lo important concept. `git add` selected working-tree changes ni staging index ki prepare chesthundi; `git commit` staged snapshot ni message and metadata tho local history lo record chesthundi.",
    "diagram": {
      "title": "git add and commit workflow",
      "nodes": [
        "Edit",
        "stage",
        "review staged snapshot",
        "commit object create",
        "branch pointer advance"
      ],
      "explanation": "git add and commit lo data/state ela move avuthundo ee flow chupisthundi: Edit → stage → review staged snapshot → commit object create → branch pointer advance. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. git add and commit ante enti?",
        "paragraphs": [
          "`git add` selected working-tree changes ni staging index ki prepare chesthundi; `git commit` staged snapshot ni message and metadata tho local history lo record chesthundi.",
          "Simple ga cheppalante, git add and commit source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "staging",
          "commit message",
          "author",
          "committer",
          "parent commit",
          "snapshot",
          "hook."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Small auditable changes and reliable rollback history create cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Edit → stage → review staged snapshot → commit object create → branch pointer advance. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "staging",
          "commit message",
          "author",
          "committer",
          "parent commit",
          "snapshot",
          "hook."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git add README.md; git add -p; git diff --cached; git commit -m \"Add health check documentation\"; git show --stat HEAD",
        "note": "Empty/unclear messages and committing secrets reduce auditability; commit local only, push separate action."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Bug fix commit lo code and related test matrame include chesi unrelated local config exclude chestham.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Empty/unclear messages and committing secrets reduce auditability; commit local only, push separate action.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Review staged diff, use imperative descriptive messages, scan secrets and run tests before commit.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is git add and commit?",
          "Answer: `git add` selected working-tree changes ni staging index ki prepare chesthundi; `git commit` staged snapshot ni message and metadata tho local history lo record chesthundi. Small auditable changes and reliable rollback history create cheyadaniki.",
          "Question: What is a safe way to troubleshoot git add and commit?",
          "Answer: Empty/unclear messages and committing secrets reduce auditability; commit local only, push separate action. Review staged diff, use imperative descriptive messages, scan secrets and run tests before commit."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Create two files, stage one, commit it and verify second file remains uncommitted.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is git add and commit?",
        "answer": "`git add` selected working-tree changes ni staging index ki prepare chesthundi; `git commit` staged snapshot ni message and metadata tho local history lo record chesthundi. Small auditable changes and reliable rollback history create cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot git add and commit in a team repository?",
        "answer": "Bug fix commit lo code and related test matrame include chesi unrelated local config exclude chestham. Empty/unclear messages and committing secrets reduce auditability; commit local only, push separate action. Review staged diff, use imperative descriptive messages, scan secrets and run tests before commit."
      }
    ],
    "handsOn": [
      "Create two files, stage one, commit it and verify second file remains uncommitted.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/git-status-and-log": {
    "summary": "git status and log Git and GitHub workflow lo important concept. `git status` working tree/index/branch synchronization state show chesthundi; `git log` commit history inspect cheyadaniki use avuthundi.",
    "diagram": {
      "title": "git status and log workflow",
      "nodes": [
        "Repository state snapshot",
        "commit graph/history query",
        "inspect selected change"
      ],
      "explanation": "git status and log lo data/state ela move avuthundo ee flow chupisthundi: Repository state snapshot → commit graph/history query → inspect selected change. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. git status and log ante enti?",
        "paragraphs": [
          "`git status` working tree/index/branch synchronization state show chesthundi; `git log` commit history inspect cheyadaniki use avuthundi.",
          "Simple ga cheppalante, git status and log source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "HEAD",
          "upstream",
          "ahead/behind",
          "decorated refs",
          "reflog",
          "author/date",
          "patch."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Before/after every Git operation repository state understand cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Repository state snapshot → commit graph/history query → inspect selected change. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "HEAD",
          "upstream",
          "ahead/behind",
          "decorated refs",
          "reflog",
          "author/date",
          "patch."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git status; git status --short --branch; git log --oneline --graph --decorate -15; git log --stat; git show COMMIT; git reflog",
        "note": "`git log` default current branch history matrame show chesthundi; reflog local and expires over time."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Failed deployment taruvatha current branch and recent commits identify chesi known-good revision compare chestham.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "`git log` default current branch history matrame show chesthundi; reflog local and expires over time.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Capture status before destructive commands and use reflog only as recovery aid, not permanent backup.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is git status and log?",
          "Answer: `git status` working tree/index/branch synchronization state show chesthundi; `git log` commit history inspect cheyadaniki use avuthundi. Before/after every Git operation repository state understand cheyadaniki.",
          "Question: What is a safe way to troubleshoot git status and log?",
          "Answer: `git log` default current branch history matrame show chesthundi; reflog local and expires over time. Capture status before destructive commands and use reflog only as recovery aid, not permanent backup."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Create three commits and inspect graph, author, date, changed files and current branch.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is git status and log?",
        "answer": "`git status` working tree/index/branch synchronization state show chesthundi; `git log` commit history inspect cheyadaniki use avuthundi. Before/after every Git operation repository state understand cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot git status and log in a team repository?",
        "answer": "Failed deployment taruvatha current branch and recent commits identify chesi known-good revision compare chestham. `git log` default current branch history matrame show chesthundi; reflog local and expires over time. Capture status before destructive commands and use reflog only as recovery aid, not permanent backup."
      }
    ],
    "handsOn": [
      "Create three commits and inspect graph, author, date, changed files and current branch.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/branches": {
    "summary": "Branches Git and GitHub workflow lo important concept. Branch Git lo movable reference to commit. Feature branches isolated work allow chesthayi while main branch stable integration line ga untundi.",
    "diagram": {
      "title": "Branches workflow",
      "nodes": [
        "Create branch at current commit",
        "add commits",
        "compare with base",
        "merge/rebase",
        "delete after integration"
      ],
      "explanation": "Branches lo data/state ela move avuthundo ee flow chupisthundi: Create branch at current commit → add commits → compare with base → merge/rebase → delete after integration. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. Branches ante enti?",
        "paragraphs": [
          "Branch Git lo movable reference to commit. Feature branches isolated work allow chesthayi while main branch stable integration line ga untundi.",
          "Simple ga cheppalante, Branches source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "branch ref",
          "HEAD",
          "upstream",
          "tracking branch",
          "feature branch",
          "protected branch."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Parallel development and controlled review/release workflow kosam.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Create branch at current commit → add commits → compare with base → merge/rebase → delete after integration. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "branch ref",
          "HEAD",
          "upstream",
          "tracking branch",
          "feature branch",
          "protected branch."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git branch; git switch -c feature/login; git switch main; git branch -d feature/login; git branch -vv",
        "note": "Branch create chesina alone changes copy avvavu; branch switch time uncommitted changes conflict avvachu."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Engineer feature branch lo API work chesthu main branch release-ready ga maintain chesthadu.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Branch create chesina alone changes copy avvavu; branch switch time uncommitted changes conflict avvachu.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Short-lived branches, branch protection, review and CI checks use cheyyandi.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is Branches?",
          "Answer: Branch Git lo movable reference to commit. Feature branches isolated work allow chesthayi while main branch stable integration line ga untundi. Parallel development and controlled review/release workflow kosam.",
          "Question: What is a safe way to troubleshoot Branches?",
          "Answer: Branch create chesina alone changes copy avvavu; branch switch time uncommitted changes conflict avvachu. Short-lived branches, branch protection, review and CI checks use cheyyandi."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Create feature branch, make commit, switch branches and observe independent history.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Branches?",
        "answer": "Branch Git lo movable reference to commit. Feature branches isolated work allow chesthayi while main branch stable integration line ga untundi. Parallel development and controlled review/release workflow kosam."
      },
      {
        "question": "How would you use or troubleshoot Branches in a team repository?",
        "answer": "Engineer feature branch lo API work chesthu main branch release-ready ga maintain chesthadu. Branch create chesina alone changes copy avvavu; branch switch time uncommitted changes conflict avvachu. Short-lived branches, branch protection, review and CI checks use cheyyandi."
      }
    ],
    "handsOn": [
      "Create feature branch, make commit, switch branches and observe independent history.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/merge-strategies": {
    "summary": "Merge Strategies Git and GitHub workflow lo important concept. Merge strategy branches histories ni integrate chesthundi. Fast-forward pointer move; three-way merge common ancestor use chesi merge commit or squash result create chesthundi.",
    "diagram": {
      "title": "Merge Strategies workflow",
      "nodes": [
        "Find common ancestor",
        "compare branch changes",
        "combine trees",
        "create commit or move ref"
      ],
      "explanation": "Merge Strategies lo data/state ela move avuthundo ee flow chupisthundi: Find common ancestor → compare branch changes → combine trees → create commit or move ref. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. Merge Strategies ante enti?",
        "paragraphs": [
          "Merge strategy branches histories ni integrate chesthundi. Fast-forward pointer move; three-way merge common ancestor use chesi merge commit or squash result create chesthundi.",
          "Simple ga cheppalante, Merge Strategies source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "fast-forward",
          "three-way merge",
          "merge commit",
          "squash",
          "conflict",
          "merge base."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Team policy and history readability batti feature work integrate cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Find common ancestor → compare branch changes → combine trees → create commit or move ref. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "fast-forward",
          "three-way merge",
          "merge commit",
          "squash",
          "conflict",
          "merge base."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git merge --ff-only feature; git merge --no-ff feature; git merge --squash feature; git log --graph --oneline --all",
        "note": "Squash original commit graph flatten chesthundi; `--ff-only` fail avvadam expected if divergence undi."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Release team audit kosam merge commits preserve chesthundi; small feature team squash merge use chesthundi.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Squash original commit graph flatten chesthundi; `--ff-only` fail avvadam expected if divergence undi.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Choose repository-wide policy, run tests after merge and preserve traceability for releases.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is Merge Strategies?",
          "Answer: Merge strategy branches histories ni integrate chesthundi. Fast-forward pointer move; three-way merge common ancestor use chesi merge commit or squash result create chesthundi. Team policy and history readability batti feature work integrate cheyadaniki.",
          "Question: What is a safe way to troubleshoot Merge Strategies?",
          "Answer: Squash original commit graph flatten chesthundi; `--ff-only` fail avvadam expected if divergence undi. Choose repository-wide policy, run tests after merge and preserve traceability for releases."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Create diverged branches and practice ff-only, no-ff and squash in separate lab repos.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Merge Strategies?",
        "answer": "Merge strategy branches histories ni integrate chesthundi. Fast-forward pointer move; three-way merge common ancestor use chesi merge commit or squash result create chesthundi. Team policy and history readability batti feature work integrate cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot Merge Strategies in a team repository?",
        "answer": "Release team audit kosam merge commits preserve chesthundi; small feature team squash merge use chesthundi. Squash original commit graph flatten chesthundi; `--ff-only` fail avvadam expected if divergence undi. Choose repository-wide policy, run tests after merge and preserve traceability for releases."
      }
    ],
    "handsOn": [
      "Create diverged branches and practice ff-only, no-ff and squash in separate lab repos.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/rebase": {
    "summary": "Rebase Git and GitHub workflow lo important concept. `git rebase` current branch commits ni new base meeda replay chesi linear history create chesthundi. Replay valla commit IDs change avuthayi.",
    "diagram": {
      "title": "Rebase workflow",
      "nodes": [
        "Select commits",
        "find new base",
        "replay each commit",
        "resolve conflicts",
        "update branch ref"
      ],
      "explanation": "Rebase lo data/state ela move avuthundo ee flow chupisthundi: Select commits → find new base → replay each commit → resolve conflicts → update branch ref. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. Rebase ante enti?",
        "paragraphs": [
          "`git rebase` current branch commits ni new base meeda replay chesi linear history create chesthundi. Replay valla commit IDs change avuthayi.",
          "Simple ga cheppalante, Rebase source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "replay",
          "upstream",
          "conflict",
          "rewritten commit hash",
          "rebase todo",
          "continue/abort."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Feature branch ni latest main changes meeda update chesi clean history maintain cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Select commits → find new base → replay each commit → resolve conflicts → update branch ref. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "replay",
          "upstream",
          "conflict",
          "rewritten commit hash",
          "rebase todo",
          "continue/abort."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git fetch origin; git switch feature; git rebase origin/main; git rebase --continue; git rebase --abort; git log --graph --oneline",
        "note": "Shared/public branch rebase chesthe collaborators history diverge avuthundi; pushed commits rewrite dangerous."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Private feature branch lo latest main changes incorporate chesi PR review clean ga maintain chestham.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Shared/public branch rebase chesthe collaborators history diverge avuthundi; pushed commits rewrite dangerous.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Rebase only private/unshared branches unless team explicitly coordinates; backup branch before complex rewrite.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is Rebase?",
          "Answer: `git rebase` current branch commits ni new base meeda replay chesi linear history create chesthundi. Replay valla commit IDs change avuthayi. Feature branch ni latest main changes meeda update chesi clean history maintain cheyadaniki.",
          "Question: What is a safe way to troubleshoot Rebase?",
          "Answer: Shared/public branch rebase chesthe collaborators history diverge avuthundi; pushed commits rewrite dangerous. Rebase only private/unshared branches unless team explicitly coordinates; backup branch before complex rewrite."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Rebase a private feature branch onto updated main and compare commit graph before/after.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Rebase?",
        "answer": "`git rebase` current branch commits ni new base meeda replay chesi linear history create chesthundi. Replay valla commit IDs change avuthayi. Feature branch ni latest main changes meeda update chesi clean history maintain cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot Rebase in a team repository?",
        "answer": "Private feature branch lo latest main changes incorporate chesi PR review clean ga maintain chestham. Shared/public branch rebase chesthe collaborators history diverge avuthundi; pushed commits rewrite dangerous. Rebase only private/unshared branches unless team explicitly coordinates; backup branch before complex rewrite."
      }
    ],
    "handsOn": [
      "Rebase a private feature branch onto updated main and compare commit graph before/after.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/cherry-pick": {
    "summary": "Cherry-pick Git and GitHub workflow lo important concept. `git cherry-pick` selected commit changes ni current branch meeda new commit ga apply chesthundi; original commit remains in source history.",
    "diagram": {
      "title": "Cherry-pick workflow",
      "nodes": [
        "Select source commit",
        "apply patch to current HEAD",
        "resolve conflicts",
        "create new commit"
      ],
      "explanation": "Cherry-pick lo data/state ela move avuthundo ee flow chupisthundi: Select source commit → apply patch to current HEAD → resolve conflicts → create new commit. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. Cherry-pick ante enti?",
        "paragraphs": [
          "`git cherry-pick` selected commit changes ni current branch meeda new commit ga apply chesthundi; original commit remains in source history.",
          "Simple ga cheppalante, Cherry-pick source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "commit hash",
          "patch",
          "duplicate logical change",
          "conflict",
          "sequencer state."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Full branch merge cheyakunda urgent fix or specific change another release branch ki port cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Select source commit → apply patch to current HEAD → resolve conflicts → create new commit. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "commit hash",
          "patch",
          "duplicate logical change",
          "conflict",
          "sequencer state."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git log --oneline; git switch release/1.x; git cherry-pick abc1234; git cherry-pick --continue; git cherry-pick --abort",
        "note": "Same change multiple branches lo cherry-pick chesthe duplicate commits/conflict later merge lo ravachu."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Production hotfix commit ni maintenance release branch ki cherry-pick chestham.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Same change multiple branches lo cherry-pick chesthe duplicate commits/conflict later merge lo ravachu.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Track original commit reference in message and test target branch independently.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is Cherry-pick?",
          "Answer: `git cherry-pick` selected commit changes ni current branch meeda new commit ga apply chesthundi; original commit remains in source history. Full branch merge cheyakunda urgent fix or specific change another release branch ki port cheyadaniki.",
          "Question: What is a safe way to troubleshoot Cherry-pick?",
          "Answer: Same change multiple branches lo cherry-pick chesthe duplicate commits/conflict later merge lo ravachu. Track original commit reference in message and test target branch independently."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Create fix commit on main and cherry-pick into release branch; compare hashes and content.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Cherry-pick?",
        "answer": "`git cherry-pick` selected commit changes ni current branch meeda new commit ga apply chesthundi; original commit remains in source history. Full branch merge cheyakunda urgent fix or specific change another release branch ki port cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot Cherry-pick in a team repository?",
        "answer": "Production hotfix commit ni maintenance release branch ki cherry-pick chestham. Same change multiple branches lo cherry-pick chesthe duplicate commits/conflict later merge lo ravachu. Track original commit reference in message and test target branch independently."
      }
    ],
    "handsOn": [
      "Create fix commit on main and cherry-pick into release branch; compare hashes and content.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/tags-and-releases": {
    "summary": "Tags and Releases Git and GitHub workflow lo important concept. Git tag specific commit ki stable named reference. Annotated tags metadata/message store chesthayi; releases platform lo source artifacts and notes package cheyochu.",
    "diagram": {
      "title": "Tags and Releases workflow",
      "nodes": [
        "Validated commit",
        "version tag",
        "push tag",
        "CI release workflow",
        "artifact publication"
      ],
      "explanation": "Tags and Releases lo data/state ela move avuthundo ee flow chupisthundi: Validated commit → version tag → push tag → CI release workflow → artifact publication. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. Tags and Releases ante enti?",
        "paragraphs": [
          "Git tag specific commit ki stable named reference. Annotated tags metadata/message store chesthayi; releases platform lo source artifacts and notes package cheyochu.",
          "Simple ga cheppalante, Tags and Releases source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "lightweight tag",
          "annotated tag",
          "semantic version",
          "release notes",
          "signed tag."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Versioned releases and deployment provenance identify cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Validated commit → version tag → push tag → CI release workflow → artifact publication. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "lightweight tag",
          "annotated tag",
          "semantic version",
          "release notes",
          "signed tag."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git tag; git tag -a v1.2.0 -m \"Release 1.2.0\"; git show v1.2.0; git push origin v1.2.0; git ls-remote --tags origin",
        "note": "Moving/deleting published release tag breaks traceability; lightweight tag no annotation."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Production deployment image tag and Git tag v1.2.0 mapping record chestham.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Moving/deleting published release tag breaks traceability; lightweight tag no annotation.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Protect release tags, sign where required and never reuse version tags for different source.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is Tags and Releases?",
          "Answer: Git tag specific commit ki stable named reference. Annotated tags metadata/message store chesthayi; releases platform lo source artifacts and notes package cheyochu. Versioned releases and deployment provenance identify cheyadaniki.",
          "Question: What is a safe way to troubleshoot Tags and Releases?",
          "Answer: Moving/deleting published release tag breaks traceability; lightweight tag no annotation. Protect release tags, sign where required and never reuse version tags for different source."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Create annotated v0.1.0 tag on test commit and inspect metadata.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Tags and Releases?",
        "answer": "Git tag specific commit ki stable named reference. Annotated tags metadata/message store chesthayi; releases platform lo source artifacts and notes package cheyochu. Versioned releases and deployment provenance identify cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot Tags and Releases in a team repository?",
        "answer": "Production deployment image tag and Git tag v1.2.0 mapping record chestham. Moving/deleting published release tag breaks traceability; lightweight tag no annotation. Protect release tags, sign where required and never reuse version tags for different source."
      }
    ],
    "handsOn": [
      "Create annotated v0.1.0 tag on test commit and inspect metadata.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/remote-repositories": {
    "summary": "Remote Repositories Git and GitHub workflow lo important concept. Remote repository network location reference. `origin` conventional default remote; fetch/push/pull operations local and remote refs synchronize chesthayi.",
    "diagram": {
      "title": "Remote Repositories workflow",
      "nodes": [
        "Local commit",
        "authenticate remote",
        "negotiate refs/objects",
        "fetch or update remote branch"
      ],
      "explanation": "Remote Repositories lo data/state ela move avuthundo ee flow chupisthundi: Local commit → authenticate remote → negotiate refs/objects → fetch or update remote branch. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. Remote Repositories ante enti?",
        "paragraphs": [
          "Remote repository network location reference. `origin` conventional default remote; fetch/push/pull operations local and remote refs synchronize chesthayi.",
          "Simple ga cheppalante, Remote Repositories source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "remote name",
          "fetch URL",
          "push URL",
          "upstream",
          "remote-tracking branch",
          "fetch vs pull."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Team members code share and CI pipelines source fetch cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Local commit → authenticate remote → negotiate refs/objects → fetch or update remote branch. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "remote name",
          "fetch URL",
          "push URL",
          "upstream",
          "remote-tracking branch",
          "fetch vs pull."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git remote -v; git remote add origin URL; git fetch origin; git pull --ff-only; git push -u origin feature; git remote show origin",
        "note": "Pull can merge/rebase depending config; force push shared branch overwrite cheyochu."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Developer feature branch push chesi PR create chesthadu; CI remote branch checkout chesthundi.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Pull can merge/rebase depending config; force push shared branch overwrite cheyochu.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use SSH/OAuth credential manager, least access, review remote URL and avoid force push protected branches.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is Remote Repositories?",
          "Answer: Remote repository network location reference. `origin` conventional default remote; fetch/push/pull operations local and remote refs synchronize chesthayi. Team members code share and CI pipelines source fetch cheyadaniki.",
          "Question: What is a safe way to troubleshoot Remote Repositories?",
          "Answer: Pull can merge/rebase depending config; force push shared branch overwrite cheyochu. Use SSH/OAuth credential manager, least access, review remote URL and avoid force push protected branches."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Add a local bare repo as remote, push feature branch, fetch and inspect origin refs.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Remote Repositories?",
        "answer": "Remote repository network location reference. `origin` conventional default remote; fetch/push/pull operations local and remote refs synchronize chesthayi. Team members code share and CI pipelines source fetch cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot Remote Repositories in a team repository?",
        "answer": "Developer feature branch push chesi PR create chesthadu; CI remote branch checkout chesthundi. Pull can merge/rebase depending config; force push shared branch overwrite cheyochu. Use SSH/OAuth credential manager, least access, review remote URL and avoid force push protected branches."
      }
    ],
    "handsOn": [
      "Add a local bare repo as remote, push feature branch, fetch and inspect origin refs.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/github-repositories": {
    "summary": "GitHub Repositories Git and GitHub workflow lo important concept. GitHub repository Git source plus collaboration features such as issues, pull requests, actions, branch protection, releases and permissions provide chesthundi.",
    "diagram": {
      "title": "GitHub Repositories workflow",
      "nodes": [
        "Local Git commits",
        "push to GitHub",
        "repository policies and collaboration workflows"
      ],
      "explanation": "GitHub Repositories lo data/state ela move avuthundo ee flow chupisthundi: Local Git commits → push to GitHub → repository policies and collaboration workflows. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. GitHub Repositories ante enti?",
        "paragraphs": [
          "GitHub repository Git source plus collaboration features such as issues, pull requests, actions, branch protection, releases and permissions provide chesthundi.",
          "Simple ga cheppalante, GitHub Repositories source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "owner",
          "collaborator",
          "visibility",
          "default branch",
          "ruleset",
          "branch protection",
          "CODEOWNERS."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Distributed team source code review, automation and project governance kosam.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Local Git commits → push to GitHub → repository policies and collaboration workflows. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "owner",
          "collaborator",
          "visibility",
          "default branch",
          "ruleset",
          "branch protection",
          "CODEOWNERS."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git clone URL; git remote -v; gh repo view; gh repo clone ORG/REPO; gh repo fork; gh repo create",
        "note": "Public/private visibility and token scopes careless ga configure chesthe code/data expose avvachu."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "DevMavox source repository lo branch protection and CI checks successful ayyaka merge allow chestham.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Public/private visibility and token scopes careless ga configure chesthe code/data expose avvachu.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Enable MFA, least privilege, secret scanning, protected main and required status checks.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is GitHub Repositories?",
          "Answer: GitHub repository Git source plus collaboration features such as issues, pull requests, actions, branch protection, releases and permissions provide chesthundi. Distributed team source code review, automation and project governance kosam.",
          "Question: What is a safe way to troubleshoot GitHub Repositories?",
          "Answer: Public/private visibility and token scopes careless ga configure chesthe code/data expose avvachu. Enable MFA, least privilege, secret scanning, protected main and required status checks."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Create test GitHub repository and inspect visibility, default branch, collaborators and rules.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is GitHub Repositories?",
        "answer": "GitHub repository Git source plus collaboration features such as issues, pull requests, actions, branch protection, releases and permissions provide chesthundi. Distributed team source code review, automation and project governance kosam."
      },
      {
        "question": "How would you use or troubleshoot GitHub Repositories in a team repository?",
        "answer": "DevMavox source repository lo branch protection and CI checks successful ayyaka merge allow chestham. Public/private visibility and token scopes careless ga configure chesthe code/data expose avvachu. Enable MFA, least privilege, secret scanning, protected main and required status checks."
      }
    ],
    "handsOn": [
      "Create test GitHub repository and inspect visibility, default branch, collaborators and rules.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/pull-requests": {
    "summary": "Pull Requests Git and GitHub workflow lo important concept. Pull Request proposed branch changes ni target branch lo merge cheyadaniki review and CI workflow create chesthundi.",
    "diagram": {
      "title": "Pull Requests workflow",
      "nodes": [
        "Push branch",
        "open PR",
        "diff/review",
        "CI checks",
        "approval",
        "merge",
        "branch cleanup"
      ],
      "explanation": "Pull Requests lo data/state ela move avuthundo ee flow chupisthundi: Push branch → open PR → diff/review → CI checks → approval → merge → branch cleanup. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. Pull Requests ante enti?",
        "paragraphs": [
          "Pull Request proposed branch changes ni target branch lo merge cheyadaniki review and CI workflow create chesthundi.",
          "Simple ga cheppalante, Pull Requests source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "base/head branch",
          "diff",
          "reviewer",
          "required checks",
          "draft PR",
          "merge queue",
          "review state."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Code integration mundu discussion, automated tests and approval collect cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Push branch → open PR → diff/review → CI checks → approval → merge → branch cleanup. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "base/head branch",
          "diff",
          "reviewer",
          "required checks",
          "draft PR",
          "merge queue",
          "review state."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "gh pr create; gh pr status; gh pr view; gh pr checks; gh pr review --approve; gh pr merge --squash",
        "note": "PR title/context poor ga unte review quality fall avuthundi; approval alone passing tests substitute kaadu."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Feature engineer PR open chesthadu; reviewer diff inspect chesthadu; CI unit tests and build run ayyaka merge chestharu.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "PR title/context poor ga unte review quality fall avuthundi; approval alone passing tests substitute kaadu.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Small PRs, linked issue, test evidence, required checks and CODEOWNERS enforce cheyyandi.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is Pull Requests?",
          "Answer: Pull Request proposed branch changes ni target branch lo merge cheyadaniki review and CI workflow create chesthundi. Code integration mundu discussion, automated tests and approval collect cheyadaniki.",
          "Question: What is a safe way to troubleshoot Pull Requests?",
          "Answer: PR title/context poor ga unte review quality fall avuthundi; approval alone passing tests substitute kaadu. Small PRs, linked issue, test evidence, required checks and CODEOWNERS enforce cheyyandi."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Open sample PR, add description and inspect checks/review timeline before merge.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Pull Requests?",
        "answer": "Pull Request proposed branch changes ni target branch lo merge cheyadaniki review and CI workflow create chesthundi. Code integration mundu discussion, automated tests and approval collect cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot Pull Requests in a team repository?",
        "answer": "Feature engineer PR open chesthadu; reviewer diff inspect chesthadu; CI unit tests and build run ayyaka merge chestharu. PR title/context poor ga unte review quality fall avuthundi; approval alone passing tests substitute kaadu. Small PRs, linked issue, test evidence, required checks and CODEOWNERS enforce cheyyandi."
      }
    ],
    "handsOn": [
      "Open sample PR, add description and inspect checks/review timeline before merge.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/code-reviews": {
    "summary": "Code Reviews Git and GitHub workflow lo important concept. Code review peers proposed changes correctness, readability, security, tests and maintainability evaluate chese process.",
    "diagram": {
      "title": "Code Reviews workflow",
      "nodes": [
        "Author submits focused diff",
        "reviewer checks context/tests/risk",
        "feedback",
        "revision",
        "approval"
      ],
      "explanation": "Code Reviews lo data/state ela move avuthundo ee flow chupisthundi: Author submits focused diff → reviewer checks context/tests/risk → feedback → revision → approval. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. Code Reviews ante enti?",
        "paragraphs": [
          "Code review peers proposed changes correctness, readability, security, tests and maintainability evaluate chese process.",
          "Simple ga cheppalante, Code Reviews source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "review comment",
          "suggestion",
          "approval",
          "change request",
          "CODEOWNERS",
          "static analysis."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Production defects and security issues merge mundu catch cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Author submits focused diff → reviewer checks context/tests/risk → feedback → revision → approval. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "review comment",
          "suggestion",
          "approval",
          "change request",
          "CODEOWNERS",
          "static analysis."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git diff main...feature; gh pr diff; gh pr review --comment; gh pr review --request-changes; gh pr checks",
        "note": "Style-only feedback core correctness/security review ni replace cheyyakudadhu; large PRs review miss avvachu."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Reviewer database migration rollback path and secret handling inspect chesi merge mundu correction request chesthadu.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Style-only feedback core correctness/security review ni replace cheyyakudadhu; large PRs review miss avvachu.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Review behavior not people, require tests and threat-sensitive review, document accepted risk.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is Code Reviews?",
          "Answer: Code review peers proposed changes correctness, readability, security, tests and maintainability evaluate chese process. Production defects and security issues merge mundu catch cheyadaniki.",
          "Question: What is a safe way to troubleshoot Code Reviews?",
          "Answer: Style-only feedback core correctness/security review ni replace cheyyakudadhu; large PRs review miss avvachu. Review behavior not people, require tests and threat-sensitive review, document accepted risk."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Review a sample change list and write findings for correctness, security, tests and operations.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Code Reviews?",
        "answer": "Code review peers proposed changes correctness, readability, security, tests and maintainability evaluate chese process. Production defects and security issues merge mundu catch cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot Code Reviews in a team repository?",
        "answer": "Reviewer database migration rollback path and secret handling inspect chesi merge mundu correction request chesthadu. Style-only feedback core correctness/security review ni replace cheyyakudadhu; large PRs review miss avvachu. Review behavior not people, require tests and threat-sensitive review, document accepted risk."
      }
    ],
    "handsOn": [
      "Review a sample change list and write findings for correctness, security, tests and operations.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/merge-conflicts": {
    "summary": "Merge Conflicts Git and GitHub workflow lo important concept. Merge conflict ante Git same file regions changes ni automatic ga combine cheyalekapovadam. Human intended final content choose cheyyali.",
    "diagram": {
      "title": "Merge Conflicts workflow",
      "nodes": [
        "Common base",
        "conflicting edits",
        "conflict markers",
        "human resolution",
        "stage resolved file",
        "complete merge"
      ],
      "explanation": "Merge Conflicts lo data/state ela move avuthundo ee flow chupisthundi: Common base → conflicting edits → conflict markers → human resolution → stage resolved file → complete merge. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. Merge Conflicts ante enti?",
        "paragraphs": [
          "Merge conflict ante Git same file regions changes ni automatic ga combine cheyalekapovadam. Human intended final content choose cheyyali.",
          "Simple ga cheppalante, Merge Conflicts source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "<<<<<<<",
          "=======",
          ">>>>>>>",
          "ours",
          "theirs",
          "merge base",
          "conflict resolution."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Parallel branch changes integrate chesetappudu correct behavior preserve cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Common base → conflicting edits → conflict markers → human resolution → stage resolved file → complete merge. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "<<<<<<<",
          "=======",
          ">>>>>>>",
          "ours",
          "theirs",
          "merge base",
          "conflict resolution."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git status; git diff; git diff --ours; git diff --theirs; edit file; git add file; git merge --continue; git merge --abort",
        "note": "Blind ga ours/theirs choose chesthe other branch valid changes lost avvachu."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Two developers same deployment YAML replicas and image version change chesaru; intended values coordinate chesi resolve chestham.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Blind ga ours/theirs choose chesthe other branch valid changes lost avvachu.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Understand both changes, communicate with author, run tests and inspect final diff before continue.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is Merge Conflicts?",
          "Answer: Merge conflict ante Git same file regions changes ni automatic ga combine cheyalekapovadam. Human intended final content choose cheyyali. Parallel branch changes integrate chesetappudu correct behavior preserve cheyadaniki.",
          "Question: What is a safe way to troubleshoot Merge Conflicts?",
          "Answer: Blind ga ours/theirs choose chesthe other branch valid changes lost avvachu. Understand both changes, communicate with author, run tests and inspect final diff before continue."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Create same-line conflict in two branches; resolve manually and verify final file and tests.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Merge Conflicts?",
        "answer": "Merge conflict ante Git same file regions changes ni automatic ga combine cheyalekapovadam. Human intended final content choose cheyyali. Parallel branch changes integrate chesetappudu correct behavior preserve cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot Merge Conflicts in a team repository?",
        "answer": "Two developers same deployment YAML replicas and image version change chesaru; intended values coordinate chesi resolve chestham. Blind ga ours/theirs choose chesthe other branch valid changes lost avvachu. Understand both changes, communicate with author, run tests and inspect final diff before continue."
      }
    ],
    "handsOn": [
      "Create same-line conflict in two branches; resolve manually and verify final file and tests.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/reset-revert-and-restore": {
    "summary": "Reset, Revert and Restore Git and GitHub workflow lo important concept. `reset` branch/index state move/change chesthundi; `revert` new inverse commit create chesthundi; `restore` working tree or index file content restore chesthundi.",
    "diagram": {
      "title": "Reset, Revert and Restore workflow",
      "nodes": [
        "Choose target commit/state",
        "select history rewrite or inverse commit",
        "inspect status/diff",
        "validate"
      ],
      "explanation": "Reset, Revert and Restore lo data/state ela move avuthundo ee flow chupisthundi: Choose target commit/state → select history rewrite or inverse commit → inspect status/diff → validate. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. Reset, Revert and Restore ante enti?",
        "paragraphs": [
          "`reset` branch/index state move/change chesthundi; `revert` new inverse commit create chesthundi; `restore` working tree or index file content restore chesthundi.",
          "Simple ga cheppalante, Reset, Revert and Restore source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "soft keeps index",
          "mixed resets index",
          "hard resets working tree",
          "revert inverse commit",
          "restore file."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Local mistakes correct cheyadaniki and shared history safely undo cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Choose target commit/state → select history rewrite or inverse commit → inspect status/diff → validate. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "soft keeps index",
          "mixed resets index",
          "hard resets working tree",
          "revert inverse commit",
          "restore file."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git reset --soft HEAD~1; git reset --mixed HEAD~1; git restore --staged file; git restore file; git revert COMMIT",
        "note": "`reset --hard` uncommitted work delete chesthundi; revert merge commit needs parent selection."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Already deployed bad commit shared main lo undi; `git revert` use chesi audited rollback commit create chestham.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "`reset --hard` uncommitted work delete chesthundi; revert merge commit needs parent selection.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Shared branches lo revert prefer cheyyandi; destructive reset mundu backup/stash and status verify.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is Reset, Revert and Restore?",
          "Answer: `reset` branch/index state move/change chesthundi; `revert` new inverse commit create chesthundi; `restore` working tree or index file content restore chesthundi. Local mistakes correct cheyadaniki and shared history safely undo cheyadaniki.",
          "Question: What is a safe way to troubleshoot Reset, Revert and Restore?",
          "Answer: `reset --hard` uncommitted work delete chesthundi; revert merge commit needs parent selection. Shared branches lo revert prefer cheyyandi; destructive reset mundu backup/stash and status verify."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Practice soft/mixed reset and restore in disposable repo; use revert for a committed change.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Reset, Revert and Restore?",
        "answer": "`reset` branch/index state move/change chesthundi; `revert` new inverse commit create chesthundi; `restore` working tree or index file content restore chesthundi. Local mistakes correct cheyadaniki and shared history safely undo cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot Reset, Revert and Restore in a team repository?",
        "answer": "Already deployed bad commit shared main lo undi; `git revert` use chesi audited rollback commit create chestham. `reset --hard` uncommitted work delete chesthundi; revert merge commit needs parent selection. Shared branches lo revert prefer cheyyandi; destructive reset mundu backup/stash and status verify."
      }
    ],
    "handsOn": [
      "Practice soft/mixed reset and restore in disposable repo; use revert for a committed change.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/stash": {
    "summary": "Stash Git and GitHub workflow lo important concept. Git stash tracked working changes temporary stack lo save chesi working tree clean cheyadaniki use avuthundi; later apply/pop cheyochu.",
    "diagram": {
      "title": "Stash workflow",
      "nodes": [
        "Dirty working tree",
        "stash snapshot",
        "clean checkout",
        "apply saved changes",
        "resolve conflicts"
      ],
      "explanation": "Stash lo data/state ela move avuthundo ee flow chupisthundi: Dirty working tree → stash snapshot → clean checkout → apply saved changes → resolve conflicts. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. Stash ante enti?",
        "paragraphs": [
          "Git stash tracked working changes temporary stack lo save chesi working tree clean cheyadaniki use avuthundi; later apply/pop cheyochu.",
          "Simple ga cheppalante, Stash source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "stash stack",
          "untracked files",
          "include-untracked",
          "apply vs pop",
          "stash ref."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Urgent branch switch or hotfix kosam incomplete work temporarily park cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Dirty working tree → stash snapshot → clean checkout → apply saved changes → resolve conflicts. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "stash stack",
          "untracked files",
          "include-untracked",
          "apply vs pop",
          "stash ref."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git stash push -m \"wip login\"; git stash list; git stash show -p; git stash apply stash@{0}; git stash pop; git stash drop",
        "note": "Default stash untracked files include cheyyadu; pop conflict ayithe stash entry remain avvachu."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Engineer feature work half-complete ga undaga urgent production hotfix branch ki switch avuthadu.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Default stash untracked files include cheyyadu; pop conflict ayithe stash entry remain avvachu.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Stash permanent backup kaadu; meaningful work commits/remote branches lo preserve cheyyandi.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is Stash?",
          "Answer: Git stash tracked working changes temporary stack lo save chesi working tree clean cheyadaniki use avuthundi; later apply/pop cheyochu. Urgent branch switch or hotfix kosam incomplete work temporarily park cheyadaniki.",
          "Question: What is a safe way to troubleshoot Stash?",
          "Answer: Default stash untracked files include cheyyadu; pop conflict ayithe stash entry remain avvachu. Stash permanent backup kaadu; meaningful work commits/remote branches lo preserve cheyyandi."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Stash tracked and untracked test files separately, switch branch, apply and verify.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Stash?",
        "answer": "Git stash tracked working changes temporary stack lo save chesi working tree clean cheyadaniki use avuthundi; later apply/pop cheyochu. Urgent branch switch or hotfix kosam incomplete work temporarily park cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot Stash in a team repository?",
        "answer": "Engineer feature work half-complete ga undaga urgent production hotfix branch ki switch avuthadu. Default stash untracked files include cheyyadu; pop conflict ayithe stash entry remain avvachu. Stash permanent backup kaadu; meaningful work commits/remote branches lo preserve cheyyandi."
      }
    ],
    "handsOn": [
      "Stash tracked and untracked test files separately, switch branch, apply and verify.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/gitignore": {
    "summary": ".gitignore Git and GitHub workflow lo important concept. `.gitignore` untracked files matching patterns ni Git status nundi ignore chesthundi. Already tracked file ni ignore rule automatically untrack cheyyadu.",
    "diagram": {
      "title": ".gitignore workflow",
      "nodes": [
        "Pattern rules read",
        "untracked path match",
        "status/add excludes ignored path"
      ],
      "explanation": ".gitignore lo data/state ela move avuthundo ee flow chupisthundi: Pattern rules read → untracked path match → status/add excludes ignored path. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. .gitignore ante enti?",
        "paragraphs": [
          "`.gitignore` untracked files matching patterns ni Git status nundi ignore chesthundi. Already tracked file ni ignore rule automatically untrack cheyyadu.",
          "Simple ga cheppalante, .gitignore source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "glob pattern",
          "directory slash",
          "negation `!`",
          "root anchoring",
          "global excludes",
          "tracked file."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Build outputs, local env files, IDE settings and generated artifacts commits lo enter kakunda prevent cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Pattern rules read → untracked path match → status/add excludes ignored path. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "glob pattern",
          "directory slash",
          "negation `!`",
          "root anchoring",
          "global excludes",
          "tracked file."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "printf 'node_modules/\\n.env\\n.next/\\n' >> .gitignore; git check-ignore -v .env; git rm --cached .env; git status --short",
        "note": "`.env` already committed aithe ignore add cheyyadam history nundi secret remove cheyyadu; credential rotate cheyyali."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Next.js repo lo node_modules, `.next` and local `.env` ignore chestham; tracked secret remove and rotate separately.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "`.env` already committed aithe ignore add cheyyadam history nundi secret remove cheyyadu; credential rotate cheyyali.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Add secret patterns, use secret manager, scan history and rotate any exposed credentials.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is .gitignore?",
          "Answer: `.gitignore` untracked files matching patterns ni Git status nundi ignore chesthundi. Already tracked file ni ignore rule automatically untrack cheyyadu. Build outputs, local env files, IDE settings and generated artifacts commits lo enter kakunda prevent cheyadaniki.",
          "Question: What is a safe way to troubleshoot .gitignore?",
          "Answer: `.env` already committed aithe ignore add cheyyadam history nundi secret remove cheyyadu; credential rotate cheyyali. Add secret patterns, use secret manager, scan history and rotate any exposed credentials."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Create test files and verify ignore matching with git check-ignore; untrack a dummy file.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is .gitignore?",
        "answer": "`.gitignore` untracked files matching patterns ni Git status nundi ignore chesthundi. Already tracked file ni ignore rule automatically untrack cheyyadu. Build outputs, local env files, IDE settings and generated artifacts commits lo enter kakunda prevent cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot .gitignore in a team repository?",
        "answer": "Next.js repo lo node_modules, `.next` and local `.env` ignore chestham; tracked secret remove and rotate separately. `.env` already committed aithe ignore add cheyyadam history nundi secret remove cheyyadu; credential rotate cheyyali. Add secret patterns, use secret manager, scan history and rotate any exposed credentials."
      }
    ],
    "handsOn": [
      "Create test files and verify ignore matching with git check-ignore; untrack a dummy file.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/ssh-keys": {
    "summary": "SSH Keys Git and GitHub workflow lo important concept. SSH key authentication public/private key pair use chesi GitHub or Git server access authorize chesthundi. Private key secret; public key server/account lo register chestharu.",
    "diagram": {
      "title": "SSH Keys workflow",
      "nodes": [
        "Client offers public-key proof",
        "server matches authorized public key",
        "signed challenge verification",
        "encrypted session"
      ],
      "explanation": "SSH Keys lo data/state ela move avuthundo ee flow chupisthundi: Client offers public-key proof → server matches authorized public key → signed challenge verification → encrypted session. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. SSH Keys ante enti?",
        "paragraphs": [
          "SSH key authentication public/private key pair use chesi GitHub or Git server access authorize chesthundi. Private key secret; public key server/account lo register chestharu.",
          "Simple ga cheppalante, SSH Keys source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "public key",
          "private key",
          "passphrase",
          "ssh-agent",
          "known_hosts",
          "deploy key",
          "host fingerprint."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "HTTPS password/token repeated ga enter cheyakunda secure Git operations automate cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Client offers public-key proof → server matches authorized public key → signed challenge verification → encrypted session. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "public key",
          "private key",
          "passphrase",
          "ssh-agent",
          "known_hosts",
          "deploy key",
          "host fingerprint."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "ssh-keygen -t ed25519 -C \"dev@example.com\"; ssh-add ~/.ssh/id_ed25519; ssh -T git@github.com; ssh-keyscan github.com",
        "note": "Private key repository lo commit cheyyadam or host verification disable cheyyadam severe security risk."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "CI deploy job protected secret store nundi private key load chesi repository fetch chesthundi.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Private key repository lo commit cheyyadam or host verification disable cheyyadam severe security risk.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use passphrase/agent, scoped deploy keys, pinned host keys, rotation and secret masking.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is SSH Keys?",
          "Answer: SSH key authentication public/private key pair use chesi GitHub or Git server access authorize chesthundi. Private key secret; public key server/account lo register chestharu. HTTPS password/token repeated ga enter cheyakunda secure Git operations automate cheyadaniki.",
          "Question: What is a safe way to troubleshoot SSH Keys?",
          "Answer: Private key repository lo commit cheyyadam or host verification disable cheyyadam severe security risk. Use passphrase/agent, scoped deploy keys, pinned host keys, rotation and secret masking."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Generate lab key pair, add public key to test account/repo, verify SSH auth and never upload private key.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is SSH Keys?",
        "answer": "SSH key authentication public/private key pair use chesi GitHub or Git server access authorize chesthundi. Private key secret; public key server/account lo register chestharu. HTTPS password/token repeated ga enter cheyakunda secure Git operations automate cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot SSH Keys in a team repository?",
        "answer": "CI deploy job protected secret store nundi private key load chesi repository fetch chesthundi. Private key repository lo commit cheyyadam or host verification disable cheyyadam severe security risk. Use passphrase/agent, scoped deploy keys, pinned host keys, rotation and secret masking."
      }
    ],
    "handsOn": [
      "Generate lab key pair, add public key to test account/repo, verify SSH auth and never upload private key.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/github-actions-overview": {
    "summary": "GitHub Actions Overview Git and GitHub workflow lo important concept. GitHub Actions GitHub repository events base chesukoni workflows, jobs and steps execute chese CI/CD automation platform.",
    "diagram": {
      "title": "GitHub Actions Overview workflow",
      "nodes": [
        "Git event",
        "workflow YAML",
        "runner allocates job",
        "steps execute",
        "checks/artifacts/deployment"
      ],
      "explanation": "GitHub Actions Overview lo data/state ela move avuthundo ee flow chupisthundi: Git event → workflow YAML → runner allocates job → steps execute → checks/artifacts/deployment. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. GitHub Actions Overview ante enti?",
        "paragraphs": [
          "GitHub Actions GitHub repository events base chesukoni workflows, jobs and steps execute chese CI/CD automation platform.",
          "Simple ga cheppalante, GitHub Actions Overview source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "workflow",
          "event",
          "job",
          "step",
          "runner",
          "action",
          "artifact",
          "secret",
          "environment",
          "concurrency."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Pull request tests, build, security scans and deployment automate cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Git event → workflow YAML → runner allocates job → steps execute → checks/artifacts/deployment. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "workflow",
          "event",
          "job",
          "step",
          "runner",
          "action",
          "artifact",
          "secret",
          "environment",
          "concurrency."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "gh workflow list; gh workflow view build.yml; gh run list; gh run view RUN_ID; gh run watch RUN_ID",
        "note": "Untrusted PR code ki production secrets expose cheyyakudadhu; third-party actions pinning review cheyyali."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Pull request open ayinappudu Node tests and Next.js build run ayi branch merge gate provide chesthayi.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Untrusted PR code ki production secrets expose cheyyakudadhu; third-party actions pinning review cheyyali.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Use least-privilege GITHUB_TOKEN, pin actions to full SHA, protect environments and review logs for secrets.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is GitHub Actions Overview?",
          "Answer: GitHub Actions GitHub repository events base chesukoni workflows, jobs and steps execute chese CI/CD automation platform. Pull request tests, build, security scans and deployment automate cheyadaniki.",
          "Question: What is a safe way to troubleshoot GitHub Actions Overview?",
          "Answer: Untrusted PR code ki production secrets expose cheyyakudadhu; third-party actions pinning review cheyyali. Use least-privilege GITHUB_TOKEN, pin actions to full SHA, protect environments and review logs for secrets."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Create simple workflow triggered by push and pull_request; inspect job and step logs.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is GitHub Actions Overview?",
        "answer": "GitHub Actions GitHub repository events base chesukoni workflows, jobs and steps execute chese CI/CD automation platform. Pull request tests, build, security scans and deployment automate cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot GitHub Actions Overview in a team repository?",
        "answer": "Pull request open ayinappudu Node tests and Next.js build run ayi branch merge gate provide chesthayi. Untrusted PR code ki production secrets expose cheyyakudadhu; third-party actions pinning review cheyyali. Use least-privilege GITHUB_TOKEN, pin actions to full SHA, protect environments and review logs for secrets."
      }
    ],
    "handsOn": [
      "Create simple workflow triggered by push and pull_request; inspect job and step logs.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/git-flow": {
    "summary": "Git Flow Git and GitHub workflow lo important concept. Git Flow branching model main, develop, feature, release and hotfix branches use chesi planned release lifecycle organize chesthundi.",
    "diagram": {
      "title": "Git Flow workflow",
      "nodes": [
        "develop",
        "feature branches",
        "release stabilization",
        "main tag",
        "hotfix back-merge"
      ],
      "explanation": "Git Flow lo data/state ela move avuthundo ee flow chupisthundi: develop → feature branches → release stabilization → main tag → hotfix back-merge. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. Git Flow ante enti?",
        "paragraphs": [
          "Git Flow branching model main, develop, feature, release and hotfix branches use chesi planned release lifecycle organize chesthundi.",
          "Simple ga cheppalante, Git Flow source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "main",
          "develop",
          "feature",
          "release",
          "hotfix",
          "release tag",
          "back-merge."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Scheduled releases, parallel feature work and urgent production fixes ki defined branch roles ivvadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: develop → feature branches → release stabilization → main tag → hotfix back-merge. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "main",
          "develop",
          "feature",
          "release",
          "hotfix",
          "release tag",
          "back-merge."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git switch develop; git switch -c feature/login; git switch -c release/1.2.0; git switch -c hotfix/1.2.1; git merge --no-ff",
        "note": "Small continuous deployment teams ki Git Flow overhead create cheyochu; stale long-lived branches conflicts increase chesthayi."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Enterprise product monthly release prepare chesthundi; release branch QA fixes accept chesthundi while feature work develop lo continue avuthundi.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Small continuous deployment teams ki Git Flow overhead create cheyochu; stale long-lived branches conflicts increase chesthayi.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Choose branching model based on release cadence and team size; automate merge-back and release tags.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is Git Flow?",
          "Answer: Git Flow branching model main, develop, feature, release and hotfix branches use chesi planned release lifecycle organize chesthundi. Scheduled releases, parallel feature work and urgent production fixes ki defined branch roles ivvadaniki.",
          "Question: What is a safe way to troubleshoot Git Flow?",
          "Answer: Small continuous deployment teams ki Git Flow overhead create cheyochu; stale long-lived branches conflicts increase chesthayi. Choose branching model based on release cadence and team size; automate merge-back and release tags."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Draw Git Flow branch lifecycle and simulate one feature and one hotfix in lab.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Git Flow?",
        "answer": "Git Flow branching model main, develop, feature, release and hotfix branches use chesi planned release lifecycle organize chesthundi. Scheduled releases, parallel feature work and urgent production fixes ki defined branch roles ivvadaniki."
      },
      {
        "question": "How would you use or troubleshoot Git Flow in a team repository?",
        "answer": "Enterprise product monthly release prepare chesthundi; release branch QA fixes accept chesthundi while feature work develop lo continue avuthundi. Small continuous deployment teams ki Git Flow overhead create cheyochu; stale long-lived branches conflicts increase chesthayi. Choose branching model based on release cadence and team size; automate merge-back and release tags."
      }
    ],
    "handsOn": [
      "Draw Git Flow branch lifecycle and simulate one feature and one hotfix in lab.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/trunk-based-development": {
    "summary": "Trunk-Based Development Git and GitHub workflow lo important concept. Trunk-based development lo developers short-lived branches or direct guarded commits main/trunk ki frequently integrate chestharu. Feature flags incomplete functionality hide chesthayi.",
    "diagram": {
      "title": "Trunk-Based Development workflow",
      "nodes": [
        "Small change",
        "short-lived branch",
        "automated tests",
        "rapid merge to trunk",
        "deploy behind feature flag"
      ],
      "explanation": "Trunk-Based Development lo data/state ela move avuthundo ee flow chupisthundi: Small change → short-lived branch → automated tests → rapid merge to trunk → deploy behind feature flag. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. Trunk-Based Development ante enti?",
        "paragraphs": [
          "Trunk-based development lo developers short-lived branches or direct guarded commits main/trunk ki frequently integrate chestharu. Feature flags incomplete functionality hide chesthayi.",
          "Simple ga cheppalante, Trunk-Based Development source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "trunk",
          "short-lived branch",
          "feature flag",
          "CI gate",
          "continuous integration",
          "release train."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Continuous integration speed and long-lived merge conflict reduce cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Small change → short-lived branch → automated tests → rapid merge to trunk → deploy behind feature flag. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "trunk",
          "short-lived branch",
          "feature flag",
          "CI gate",
          "continuous integration",
          "release train."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git switch -c feature/short-change; git fetch origin; git rebase origin/main; git push -u origin feature/short-change; gh pr create; gh pr checks",
        "note": "Weak tests or long-lived branches trunk unstable chesthayi; feature flags stale ga unte complexity పెరుగుతుంది."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Team daily multiple small PRs merge chesthundi; incomplete feature flag behind off state lo untundi.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Weak tests or long-lived branches trunk unstable chesthayi; feature flags stale ga unte complexity పెరుగుతుంది.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Fast reliable tests, branch protection, small changes, flag ownership and rollback mechanisms maintain cheyyandi.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is Trunk-Based Development?",
          "Answer: Trunk-based development lo developers short-lived branches or direct guarded commits main/trunk ki frequently integrate chestharu. Feature flags incomplete functionality hide chesthayi. Continuous integration speed and long-lived merge conflict reduce cheyadaniki.",
          "Question: What is a safe way to troubleshoot Trunk-Based Development?",
          "Answer: Weak tests or long-lived branches trunk unstable chesthayi; feature flags stale ga unte complexity పెరుగుతుంది. Fast reliable tests, branch protection, small changes, flag ownership and rollback mechanisms maintain cheyyandi."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Split a large hypothetical change into three small PR-sized tasks and identify feature-flag boundary.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Trunk-Based Development?",
        "answer": "Trunk-based development lo developers short-lived branches or direct guarded commits main/trunk ki frequently integrate chestharu. Feature flags incomplete functionality hide chesthayi. Continuous integration speed and long-lived merge conflict reduce cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot Trunk-Based Development in a team repository?",
        "answer": "Team daily multiple small PRs merge chesthundi; incomplete feature flag behind off state lo untundi. Weak tests or long-lived branches trunk unstable chesthayi; feature flags stale ga unte complexity పెరుగుతుంది. Fast reliable tests, branch protection, small changes, flag ownership and rollback mechanisms maintain cheyyandi."
      }
    ],
    "handsOn": [
      "Split a large hypothetical change into three small PR-sized tasks and identify feature-flag boundary.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  },
  "git-github/git-troubleshooting": {
    "summary": "Git Troubleshooting Git and GitHub workflow lo important concept. Git troubleshooting repository state, refs, remotes, credentials, history and conflict evidence inspect chesi safe recovery select chesthundi.",
    "diagram": {
      "title": "Git Troubleshooting workflow",
      "nodes": [
        "Symptom",
        "inspect status/config/refs",
        "identify local vs remote state",
        "backup",
        "safe correction",
        "verify"
      ],
      "explanation": "Git Troubleshooting lo data/state ela move avuthundo ee flow chupisthundi: Symptom → inspect status/config/refs → identify local vs remote state → backup → safe correction → verify. Command output verify chesi safe next step select cheyyali."
    },
    "sections": [
      {
        "heading": "1. Git Troubleshooting ante enti?",
        "paragraphs": [
          "Git troubleshooting repository state, refs, remotes, credentials, history and conflict evidence inspect chesi safe recovery select chesthundi.",
          "Simple ga cheppalante, Git Troubleshooting source code history and team collaboration ni predictable ga maintain cheyadaniki help chesthundi."
        ],
        "bullets": [
          "detached HEAD",
          "non-fast-forward",
          "credential helper",
          "upstream",
          "reflog",
          "dangling commit",
          "shallow clone."
        ]
      },
      {
        "heading": "2. Enduku use chestham?",
        "paragraphs": [
          "Push rejected, detached HEAD, missing commit, auth failure or accidental file changes resolve cheyadaniki.",
          "DevOps pipeline lo source changes build, test, review and deployment stages ki input ga untayi. Ee concept correct ga use chesthe release traceability improve avuthundi."
        ]
      },
      {
        "heading": "3. Ela work avuthundi? Step-by-step",
        "paragraphs": [
          "Workflow: Symptom → inspect status/config/refs → identify local vs remote state → backup → safe correction → verify. Git local state and remote state difference ni inspect chesi operation select cheyyali.",
          "Commands run cheyadaniki mundu current branch, working tree status and remote target verify cheyyandi."
        ]
      },
      {
        "heading": "4. Important components and terminology",
        "paragraphs": [
          "Ee topic lo key terms:"
        ],
        "bullets": [
          "detached HEAD",
          "non-fast-forward",
          "credential helper",
          "upstream",
          "reflog",
          "dangling commit",
          "shallow clone."
        ]
      },
      {
        "heading": "5. Practical commands with explanation",
        "paragraphs": [
          "Commands ni disposable repository lo practice cheyyandi. Destructive operations (reset --hard, force push, delete) mundu backup and status verification mandatory."
        ],
        "code": "git status; git remote -v; git branch -vv; git log --graph --oneline --all -20; git reflog; git fsck --lost-found; GIT_SSH_COMMAND='ssh -v' git fetch",
        "note": "Force push, reset hard or deleting .git before diagnosis can destroy recoverable work."
      },
      {
        "heading": "6. Real-time DevOps example",
        "paragraphs": [
          "Push rejected because remote main advanced; fetch, inspect divergence, rebase private branch and push normally.",
          "Production delivery lo commit SHA, PR, CI run, artifact and deployment version madhya traceability maintain cheyyali."
        ]
      },
      {
        "heading": "7. Common mistakes and troubleshooting",
        "paragraphs": [
          "Force push, reset hard or deleting .git before diagnosis can destroy recoverable work.",
          "Troubleshooting start lo `git status`, `git log` and `git remote -v` inspect cheyyandi. Evidence lekunda history rewrite cheyyakandi."
        ]
      },
      {
        "heading": "8. Security and best practices",
        "paragraphs": [
          "Capture status and reflog, create backup branch, avoid credential leaks and choose revert/rebase based on shared history.",
          "Never commit credentials; least-privilege access, protected branches and required CI checks enforce cheyyandi."
        ]
      },
      {
        "heading": "9. Interview questions and answers",
        "paragraphs": [
          "Interview lo definition, command, workflow and team-level production impact explain cheyyali."
        ],
        "bullets": [
          "Question: What is Git Troubleshooting?",
          "Answer: Git troubleshooting repository state, refs, remotes, credentials, history and conflict evidence inspect chesi safe recovery select chesthundi. Push rejected, detached HEAD, missing commit, auth failure or accidental file changes resolve cheyadaniki.",
          "Question: What is a safe way to troubleshoot Git Troubleshooting?",
          "Answer: Force push, reset hard or deleting .git before diagnosis can destroy recoverable work. Capture status and reflog, create backup branch, avoid credential leaks and choose revert/rebase based on shared history."
        ]
      },
      {
        "heading": "10. Hands-on practice",
        "paragraphs": [
          "Disposable local repository or GitHub test repository use cheyyandi."
        ],
        "bullets": [
          "Simulate non-fast-forward push rejection in local bare repo; recover with fetch/rebase and verify graph.",
          "Run relevant commands and capture status/log/diff output before and after.",
          "Write a mini runbook with pre-check, safe action, validation and rollback."
        ]
      }
    ],
    "interview": [
      {
        "question": "What is Git Troubleshooting?",
        "answer": "Git troubleshooting repository state, refs, remotes, credentials, history and conflict evidence inspect chesi safe recovery select chesthundi. Push rejected, detached HEAD, missing commit, auth failure or accidental file changes resolve cheyadaniki."
      },
      {
        "question": "How would you use or troubleshoot Git Troubleshooting in a team repository?",
        "answer": "Push rejected because remote main advanced; fetch, inspect divergence, rebase private branch and push normally. Force push, reset hard or deleting .git before diagnosis can destroy recoverable work. Capture status and reflog, create backup branch, avoid credential leaks and choose revert/rebase based on shared history."
      }
    ],
    "handsOn": [
      "Simulate non-fast-forward push rejection in local bare repo; recover with fetch/rebase and verify graph.",
      "Practice the commands in a disposable repository and explain each state transition.",
      "Document a failure scenario, evidence, safe recovery and verification."
    ]
  }
};
