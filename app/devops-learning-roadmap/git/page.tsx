
"use client";

import { useMemo, useState } from "react";

type Lesson = {
  title: string;
  topics: string[];
  outcome: string;
};

type Module = {
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Production";
  duration: string;
  objective: string;
  lessons: Lesson[];
};

const modules: Module[] = [
  {
    title: "1. Version Control Fundamentals",
    level: "Beginner",
    duration: "2–3 hours",
    objective: "Understand why Git is essential for software development and DevOps.",
    lessons: [
      {
        title: "Version Control Concepts",
        topics: [
          "What is version control?",
          "Problems with manual file backups",
          "Centralized vs distributed version control",
          "Git vs GitHub vs GitLab vs Bitbucket",
          "How Git supports DevOps and CI/CD",
        ],
        outcome: "Explain Git's purpose and its role in a development team.",
      },
      {
        title: "Git Architecture",
        topics: [
          "Working directory",
          "Staging area and index",
          "Local repository",
          "Remote repository",
          "How changes move between Git areas",
          "Git objects: blobs, trees, commits and tags",
        ],
        outcome: "Understand where changes are stored and how Git tracks them.",
      },
    ],
  },
  {
    title: "2. Installation and Initial Configuration",
    level: "Beginner",
    duration: "2–3 hours",
    objective: "Set up Git correctly on a development machine.",
    lessons: [
      {
        title: "Installation and Setup",
        topics: [
          "Install Git on Windows, Linux and macOS",
          "Verify installation using git --version",
          "Configure user.name and user.email",
          "Understand system, global and local configuration",
          "Set the default branch name",
          "Configure the default editor",
          "Inspect configuration using git config --list",
        ],
        outcome: "Configure Git for reliable daily development.",
      },
      {
        title: "Terminal and Repository Basics",
        topics: [
          "Navigate project directories",
          "Understand Git command syntax",
          "Initialize a repository with git init",
          "Inspect repository state with git status",
          "Understand the .git directory",
          "Recognize when a directory is already a repository",
        ],
        outcome: "Create and inspect a local Git repository confidently.",
      },
    ],
  },
  {
    title: "3. Files, Staging and Commits",
    level: "Beginner",
    duration: "4–5 hours",
    objective: "Learn how to track files and record meaningful changes.",
    lessons: [
      {
        title: "Track Changes",
        topics: [
          "git status",
          "git add filename",
          "git add . and its scope",
          "git diff",
          "git diff --staged",
          "Untracked, modified and staged files",
          "Remove files using git rm",
          "Stop tracking a file with git rm --cached",
        ],
        outcome: "Stage only the intended changes before committing.",
      },
      {
        title: "Commit Management",
        topics: [
          "git commit -m",
          "Write clear commit messages",
          "Inspect commits using git log",
          "Use git log --oneline --graph",
          "Inspect a commit with git show",
          "Understand commit IDs and parent commits",
          "Amend the latest commit safely",
          "Identify author and committer information",
        ],
        outcome: "Create traceable commits that teammates can review.",
      },
      {
        title: "Undo Local Changes",
        topics: [
          "Discard unstaged changes with git restore",
          "Unstage files with git restore --staged",
          "Understand git reset modes",
          "Recover a file from an earlier commit",
          "Use git reflog to find previous HEAD positions",
          "Risks of destructive commands",
        ],
        outcome: "Recover from common mistakes without losing important work.",
      },
    ],
  },
  {
    title: "4. .gitignore and Repository Hygiene",
    level: "Beginner",
    duration: "2–3 hours",
    objective: "Prevent generated files and sensitive data from entering version control.",
    lessons: [
      {
        title: "Ignore Rules",
        topics: [
          "Create and maintain .gitignore",
          "Ignore node_modules, dist and build outputs",
          "Ignore logs, caches and temporary files",
          "Understand directory and wildcard patterns",
          "Use negation rules carefully",
          "Inspect ignored files",
          "Why .gitignore does not untrack existing files",
        ],
        outcome: "Keep repositories clean and reduce accidental file commits.",
      },
      {
        title: "Repository Hygiene",
        topics: [
          "Keep secrets outside source control",
          "Avoid committing generated artifacts unnecessarily",
          "Choose a useful repository structure",
          "Review staged changes before committing",
          "Handle line endings across operating systems",
          "Use .gitattributes where appropriate",
        ],
        outcome: "Prepare repositories for reliable team collaboration.",
      },
    ],
  },
  {
    title: "5. Branching and Merging",
    level: "Intermediate",
    duration: "5–6 hours",
    objective: "Work on features independently without destabilizing shared code.",
    lessons: [
      {
        title: "Branch Fundamentals",
        topics: [
          "Why branches are useful",
          "Create branches using git branch",
          "Switch branches with git switch",
          "Create and switch using git switch -c",
          "List local and remote branches",
          "Rename branches",
          "Delete merged and unmerged branches carefully",
          "Understand HEAD and branch references",
        ],
        outcome: "Create isolated work streams for features and fixes.",
      },
      {
        title: "Merge Strategies",
        topics: [
          "Perform a basic merge",
          "Fast-forward merges",
          "Three-way merges",
          "No-fast-forward merges",
          "Merge commits and parent relationships",
          "Abort an in-progress merge",
          "Inspect merge history",
          "Understand when branches can be deleted",
        ],
        outcome: "Integrate changes while preserving the intended history.",
      },
      {
        title: "Merge Conflict Resolution",
        topics: [
          "Why conflicts occur",
          "Read conflict markers",
          "Resolve conflicts manually",
          "Use editor conflict tools",
          "Stage resolved files",
          "Complete or abort a merge",
          "Prevent repeated conflicts through smaller changes",
        ],
        outcome: "Resolve conflicts safely and verify the resulting code.",
      },
    ],
  },
  {
    title: "6. Remote Repositories and Collaboration",
    level: "Intermediate",
    duration: "4–5 hours",
    objective: "Collaborate with teams using hosted Git repositories.",
    lessons: [
      {
        title: "Remote Fundamentals",
        topics: [
          "GitHub, GitLab and Bitbucket repositories",
          "git remote -v",
          "Add and rename remotes",
          "Clone repositories",
          "Understand origin and upstream",
          "Fetch remote references",
          "Pull remote changes",
          "Push local commits",
        ],
        outcome: "Synchronize local work with a shared repository.",
      },
      {
        title: "Fetch, Pull and Push",
        topics: [
          "Difference between fetch and pull",
          "Understand pull as fetch plus integration",
          "Configure upstream tracking branches",
          "Use git push -u origin branch-name",
          "Handle non-fast-forward push rejection",
          "Understand remote-tracking branches",
          "Avoid overwriting teammates' changes",
        ],
        outcome: "Synchronize branches without creating avoidable conflicts.",
      },
      {
        title: "Forks and Team Collaboration",
        topics: [
          "Fork-based contribution workflows",
          "Clone a fork and configure upstream",
          "Sync a fork with the source repository",
          "Create feature branches",
          "Open and update pull requests",
          "Review comments and requested changes",
          "Delete merged remote branches",
        ],
        outcome: "Contribute to team and open-source repositories.",
      },
    ],
  },
  {
    title: "7. GitHub and Pull Request Workflows",
    level: "Intermediate",
    duration: "4–5 hours",
    objective: "Use code review and repository controls in a professional team.",
    lessons: [
      {
        title: "Pull Request Lifecycle",
        topics: [
          "Feature branch to pull request",
          "Pull request descriptions and templates",
          "Compare source and target branches",
          "Code review and approvals",
          "Request changes and address feedback",
          "Resolve review conversations",
          "Merge and clean up branches",
        ],
        outcome: "Follow a complete code-review workflow.",
      },
      {
        title: "Repository Protection",
        topics: [
          "Protected branches and rulesets",
          "Required reviews",
          "Required CI status checks",
          "Restrict direct pushes",
          "CODEOWNERS",
          "Repository permissions and least privilege",
          "Audit important repository changes",
        ],
        outcome: "Understand how teams protect production branches.",
      },
    ],
  },
  {
    title: "8. Rebase and Advanced History Management",
    level: "Advanced",
    duration: "5–6 hours",
    objective: "Understand advanced history operations and when to use them.",
    lessons: [
      {
        title: "Rebase Fundamentals",
        topics: [
          "Rebase vs merge",
          "Rebase feature branches onto updated main",
          "Understand replayed commits and changed commit IDs",
          "Resolve rebase conflicts",
          "Continue, skip or abort a rebase",
          "Rebase onto a specific branch or commit",
          "Why public shared history requires extra care",
        ],
        outcome: "Keep feature branches current using a suitable integration strategy.",
      },
      {
        title: "Interactive Rebase",
        topics: [
          "git rebase -i",
          "Reorder commits",
          "Squash and fixup commits",
          "Reword commit messages",
          "Edit or split commits",
          "Drop unwanted commits",
          "Recover from mistakes using reflog",
        ],
        outcome: "Clean up local commit history before sharing it.",
      },
      {
        title: "Cherry-Pick and Revert",
        topics: [
          "Apply a specific commit using cherry-pick",
          "Cherry-pick multiple commits",
          "Resolve cherry-pick conflicts",
          "Abort a cherry-pick",
          "Use git revert for a corrective commit",
          "Revert merge commits carefully",
          "Choose between reset and revert",
        ],
        outcome: "Move or reverse changes while respecting shared history.",
      },
    ],
  },
  {
    title: "9. Git Tags, Releases and Versioning",
    level: "Intermediate",
    duration: "3–4 hours",
    objective: "Identify release points and connect source history to software releases.",
    lessons: [
      {
        title: "Tags and Releases",
        topics: [
          "Lightweight and annotated tags",
          "Create and inspect tags",
          "Push tags to remote repositories",
          "Delete tags locally and remotely",
          "Semantic versioning: MAJOR.MINOR.PATCH",
          "Release branches and release notes",
          "Git tags in build and deployment pipelines",
        ],
        outcome: "Create traceable source-code release markers.",
      },
      {
        title: "Version and Change Management",
        topics: [
          "Trace deployed versions to commits",
          "Tag release candidates",
          "Use changelog conventions",
          "Understand hotfix branches",
          "Connect commits, artifacts and releases",
          "Keep release history auditable",
        ],
        outcome: "Support reliable and traceable software releases.",
      },
    ],
  },
  {
    title: "10. Git Stash and Work-in-Progress Management",
    level: "Intermediate",
    duration: "2–3 hours",
    objective: "Temporarily save incomplete work while switching tasks.",
    lessons: [
      {
        title: "Stash Operations",
        topics: [
          "git stash",
          "Stash tracked and untracked files",
          "Name stashes with messages",
          "List and inspect stashes",
          "Apply versus pop",
          "Drop and clear stashes carefully",
          "Handle stash conflicts",
          "Understand what stash does not replace",
        ],
        outcome: "Manage interrupted work without creating unnecessary commits.",
      },
    ],
  },
  {
    title: "11. Git Internals and Object Model",
    level: "Advanced",
    duration: "4–5 hours",
    objective: "Understand how Git stores content and represents history.",
    lessons: [
      {
        title: "Objects and References",
        topics: [
          "Blob, tree, commit and tag objects",
          "Content-addressed object storage",
          "SHA-based object identifiers",
          "HEAD and symbolic references",
          "Branches as references to commits",
          "Inspect objects with git cat-file",
          "Explore object history with git fsck",
        ],
        outcome: "Explain Git history beyond everyday commands.",
      },
      {
        title: "Repository Storage",
        topics: [
          "The .git directory structure",
          "Loose objects and packfiles",
          "Git index and staging behavior",
          "Object reachability",
          "Dangling and unreachable objects",
          "Garbage collection concepts",
          "Why reflog can help recover references",
        ],
        outcome: "Understand repository storage and basic recovery mechanisms.",
      },
    ],
  },
  {
    title: "12. Git Search, Diff and Investigation Tools",
    level: "Advanced",
    duration: "3–4 hours",
    objective: "Investigate changes and find the source of regressions.",
    lessons: [
      {
        title: "History Investigation",
        topics: [
          "git log with author and date filters",
          "git show and git diff",
          "Compare branches and commits",
          "Inspect file history",
          "Use git blame responsibly",
          "Search commit messages",
          "Use git grep to search tracked content",
        ],
        outcome: "Trace when, where and why code changed.",
      },
      {
        title: "Bisect and Regression Analysis",
        topics: [
          "Find a regression using git bisect",
          "Mark known-good and known-bad commits",
          "Automate checks during bisect",
          "Reset bisect after investigation",
          "Use diffs to isolate risky changes",
          "Correlate commits with CI failures",
        ],
        outcome: "Narrow down the commit that introduced a defect.",
      },
    ],
  },
  {
    title: "13. Git Hooks and Automation",
    level: "Advanced",
    duration: "3–4 hours",
    objective: "Automate repository checks at useful points in the workflow.",
    lessons: [
      {
        title: "Git Hooks",
        topics: [
          "Client-side and server-side hooks",
          "pre-commit and commit-msg",
          "pre-push hooks",
          "Hook scripts and executable permissions",
          "Validate formatting and commit messages",
          "Use hooks without making development unreliable",
          "Understand why local hooks alone are not a security boundary",
        ],
        outcome: "Automate lightweight checks before changes are shared.",
      },
      {
        title: "Git in Automation",
        topics: [
          "Use Git commands in shell scripts",
          "Check repository status in scripts",
          "Use non-interactive command patterns",
          "Handle command failures and exit codes",
          "Avoid embedding credentials in scripts",
          "Integrate repository checks with CI",
        ],
        outcome: "Use Git safely in automated workflows.",
      },
    ],
  },
  {
    title: "14. Git in CI/CD Pipelines",
    level: "Production",
    duration: "4–5 hours",
    objective: "Understand how CI/CD systems use source control to build and deploy applications.",
    lessons: [
      {
        title: "Source Checkout and Build Triggers",
        topics: [
          "Webhook-triggered builds",
          "Polling versus webhook triggers",
          "Checkout a specific branch, tag or commit",
          "Shallow clones and fetch depth",
          "Submodules and checkout configuration",
          "Pull request validation pipelines",
          "Avoid building the wrong revision",
        ],
        outcome: "Configure predictable source retrieval in a pipeline.",
      },
      {
        title: "Git with Jenkins and GitHub Actions",
        topics: [
          "Configure repository URLs and credentials",
          "Use deploy keys or managed credentials",
          "Build from feature branches and pull requests",
          "Use tags for release pipelines",
          "Capture the commit SHA in build metadata",
          "Handle detached HEAD in CI",
          "Avoid printing secrets in logs",
        ],
        outcome: "Connect Git events and revisions to CI/CD execution.",
      },
      {
        title: "GitOps and Deployment Workflows",
        topics: [
          "Git as the desired-state source of truth",
          "Separate application and deployment configuration",
          "Pull-based deployment concepts",
          "GitOps reconciliation overview",
          "Track configuration changes",
          "Rollback through versioned configuration",
          "Understand why a Git revert may not reverse external side effects",
        ],
        outcome: "Understand Git's role in GitOps and auditable deployments.",
      },
    ],
  },
  {
    title: "15. Git Security and Secret Protection",
    level: "Production",
    duration: "4–5 hours",
    objective: "Reduce the risk of credentials and sensitive data entering repositories.",
    lessons: [
      {
        title: "Access and Transport Security",
        topics: [
          "HTTPS and SSH authentication",
          "SSH key generation and permissions",
          "SSH agent basics",
          "Personal access tokens and scopes",
          "Credential helpers",
          "Deploy keys and service identities",
          "Least-privilege repository access",
        ],
        outcome: "Choose suitable authentication methods for developers and automation.",
      },
      {
        title: "Secret Leakage Response",
        topics: [
          "Recognize API keys and credentials in commits",
          "Revoke or rotate exposed credentials immediately",
          "Remove secrets from current files",
          "Understand history rewriting and its collaboration risks",
          "Coordinate rewritten history with the team",
          "Enable secret scanning and push protection where available",
          "Prevent recurrence with external secret storage",
        ],
        outcome: "Respond to accidental secret exposure instead of relying only on file deletion.",
      },
      {
        title: "Supply Chain and Repository Security",
        topics: [
          "Review third-party code changes",
          "Verify commit and tag signatures",
          "Understand signed commits and signed tags",
          "Protect release branches and tags",
          "Audit access and repository settings",
          "Generate provenance in the CI system",
        ],
        outcome: "Apply basic source-control security practices in production teams.",
      },
    ],
  },
  {
    title: "16. Large Repositories and Performance",
    level: "Advanced",
    duration: "3–4 hours",
    objective: "Manage repository size and performance challenges.",
    lessons: [
      {
        title: "Performance and Scale",
        topics: [
          "Identify large files and repository growth",
          "Use shallow clones when appropriate",
          "Partial clone concepts",
          "Sparse checkout",
          "Git LFS for large binary assets",
          "Submodules versus monorepo layouts",
          "Reduce unnecessary generated files",
          "Understand repacking and maintenance",
        ],
        outcome: "Choose practical strategies for large codebases.",
      },
    ],
  },
  {
    title: "17. Git Troubleshooting and Recovery",
    level: "Production",
    duration: "5–6 hours",
    objective: "Diagnose common source-control failures without damaging shared work.",
    lessons: [
      {
        title: "Common Errors",
        topics: [
          "fatal: not a git repository",
          "Permission denied (publickey)",
          "Authentication failed",
          "Remote repository not found",
          "Non-fast-forward push rejection",
          "Unrelated histories",
          "Detached HEAD state",
          "File permission and line-ending differences",
        ],
        outcome: "Diagnose common Git errors using evidence rather than guesswork.",
      },
      {
        title: "Advanced Recovery",
        topics: [
          "Recover deleted commits with reflog",
          "Recover lost branch references",
          "Abort a merge or rebase",
          "Restore a mistakenly modified file",
          "Recover from an incorrect reset",
          "Handle corrupted repository diagnostics",
          "Use backups before destructive recovery operations",
        ],
        outcome: "Recover repository state methodically and safely.",
      },
      {
        title: "Production Incident Scenarios",
        topics: [
          "A developer force-pushed to a shared branch",
          "A production fix is missing from the release branch",
          "A CI job checked out an unexpected commit",
          "A secret was committed and pushed",
          "A merge introduced a regression",
          "A repository clone is unexpectedly slow",
          "A deployment used the wrong Git tag",
        ],
        outcome: "Apply Git knowledge to realistic DevOps incidents.",
      },
    ],
  },
  {
    title: "18. Team Branching Strategies",
    level: "Production",
    duration: "3–4 hours",
    objective: "Choose workflows that fit team size, release frequency and delivery risk.",
    lessons: [
      {
        title: "Branching Models",
        topics: [
          "Trunk-based development",
          "Feature branch workflow",
          "GitHub Flow",
          "GitFlow overview",
          "Release and hotfix branches",
          "Short-lived versus long-lived branches",
          "Choose a model based on delivery needs",
        ],
        outcome: "Explain the trade-offs between common branching models.",
      },
      {
        title: "Team Standards",
        topics: [
          "Branch naming conventions",
          "Commit message conventions",
          "Small, reviewable pull requests",
          "Merge, squash and rebase policies",
          "Required CI checks",
          "Release approvals and traceability",
          "Document team workflow rules",
        ],
        outcome: "Design a consistent and maintainable team Git workflow.",
      },
    ],
  },
  {
    title: "19. Production Projects and Practice",
    level: "Production",
    duration: "1–2 weeks",
    objective: "Apply Git concepts to realistic software delivery scenarios.",
    lessons: [
      {
        title: "Project 1 — Team Feature Workflow",
        topics: [
          "Create a shared repository",
          "Set up main and feature branches",
          "Make focused commits",
          "Open a pull request",
          "Review and resolve feedback",
          "Resolve a simulated merge conflict",
          "Merge and clean up the branch",
        ],
        outcome: "Demonstrate a complete collaborative development workflow.",
      },
      {
        title: "Project 2 — Release and Hotfix",
        topics: [
          "Create a version tag",
          "Simulate a production bug",
          "Prepare a hotfix branch",
          "Apply and validate the fix",
          "Merge or cherry-pick the fix as appropriate",
          "Tag the corrected release",
          "Document the change history",
        ],
        outcome: "Manage a release correction with traceable history.",
      },
      {
        title: "Project 3 — Git and CI/CD",
        topics: [
          "Connect a repository to Jenkins or GitHub Actions",
          "Trigger validation on pull requests",
          "Build from a specific commit",
          "Store the source SHA in build metadata",
          "Run required status checks",
          "Trigger a release from a tag",
          "Document failure recovery",
        ],
        outcome: "Connect source changes to repeatable build and release processes.",
      },
      {
        title: "Project 4 — Repository Security",
        topics: [
          "Create an appropriate .gitignore",
          "Configure branch protection",
          "Set up a secret scanning strategy",
          "Use managed credentials in CI",
          "Practice safe credential rotation",
          "Document access and review policies",
        ],
        outcome: "Demonstrate baseline security controls for a team repository.",
      },
    ],
  },
  {
    title: "20. Git Interview and Career Readiness",
    level: "Advanced",
    duration: "3–4 hours",
    objective: "Explain Git clearly in interviews and troubleshoot real-world scenarios.",
    lessons: [
      {
        title: "Core Interview Topics",
        topics: [
          "Git vs GitHub",
          "fetch vs pull",
          "merge vs rebase",
          "reset vs revert",
          "working tree vs staging area",
          "HEAD and detached HEAD",
          "branch vs tag",
          "cherry-pick vs merge",
        ],
        outcome: "Explain core Git concepts with accurate examples.",
      },
      {
        title: "Scenario-Based Interview Practice",
        topics: [
          "Resolve a merge conflict",
          "Undo a pushed commit safely",
          "Recover a deleted branch",
          "Fix a rejected push",
          "Find a regression with bisect",
          "Handle a leaked secret",
          "Choose a branching strategy for a team",
          "Explain Git's role in CI/CD and GitOps",
        ],
        outcome: "Answer scenario-based questions using safe, practical reasoning.",
      },
    ],
  },
];

const levelStyles: Record<Module["level"], string> = {
  Beginner: "bg-emerald-100 text-emerald-800",
  Intermediate: "bg-blue-100 text-blue-800",
  Advanced: "bg-violet-100 text-violet-800",
  Production: "bg-orange-100 text-orange-800",
};

export default function GitRoadmapPage() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [expanded, setExpanded] = useState<number[]>([0]);
  const [completed, setCompleted] = useState<string[]>([]);

  const visibleModules = useMemo(() => {
    const query = search.trim().toLowerCase();

    return modules
      .map((module, index) => ({ ...module, originalIndex: index }))
      .filter((module) => level === "All" || module.level === level)
      .filter((module) => {
        if (!query) return true;

        return (
          module.title.toLowerCase().includes(query) ||
          module.objective.toLowerCase().includes(query) ||
          module.lessons.some(
            (lesson) =>
              lesson.title.toLowerCase().includes(query) ||
              lesson.outcome.toLowerCase().includes(query) ||
              lesson.topics.some((topic) =>
                topic.toLowerCase().includes(query)
              )
          )
        );
      });
  }, [search, level]);

  const totalLessons = modules.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  );

  const completedCount = completed.length;
  const progress =
    totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  function toggleLesson(key: string) {
    setCompleted((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key]
    );
  }

  function toggleModule(index: number) {
    setExpanded((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  }

  function toggleAllVisible() {
    const indexes = visibleModules.map((module) => module.originalIndex);
    const allExpanded = indexes.every((index) => expanded.includes(index));

    setExpanded((current) =>
      allExpanded
        ? current.filter((index) => !indexes.includes(index))
        : [...new Set([...current, ...indexes])]
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 px-4 py-14 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 inline-flex rounded-full border border-orange-300/30 bg-orange-300/10 px-4 py-2 text-sm text-orange-100">
            DevMavox Learning Roadmap
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            Git — Beginner to Production
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Master version control, branching, collaboration, advanced history
            management, repository security, CI/CD integration and production
            troubleshooting through a structured learning path.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["20", "Learning modules"],
              [String(totalLessons), "Lesson sections"],
              ["4", "Learning levels"],
              ["4", "Practical projects"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-3xl font-bold">{value}</p>
                <p className="mt-1 text-sm text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Your learning progress</h2>
              <p className="mt-1 text-sm text-slate-500">
                Mark each lesson section as completed when you finish it.
              </p>
            </div>
            <p className="text-2xl font-bold text-orange-700">
              {progress}%
            </p>
          </div>

          <div
            className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label="Learning progress"
          >
            <div
              className="h-full rounded-full bg-orange-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-sm text-slate-500">
            {completedCount} of {totalLessons} lesson sections completed
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Progress is held in page state and may reset when you leave or
            refresh this page.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_220px_auto]">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search Git topics, commands, errors..."
            aria-label="Search Git roadmap"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />

          <select
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            aria-label="Filter by learning level"
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-orange-500"
          >
            <option value="All">All levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Production">Production</option>
          </select>

          <button
            type="button"
            onClick={toggleAllVisible}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold hover:bg-slate-100"
          >
            Expand / Collapse
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {(["Beginner", "Intermediate", "Advanced", "Production"] as const).map(
            (item) => (
              <span
                key={item}
                className={`rounded-full px-3 py-1.5 font-medium ${levelStyles[item]}`}
              >
                {item}
              </span>
            )
          )}
        </div>

        <div className="mt-6 space-y-4">
          {visibleModules.map((module) => {
            const index = module.originalIndex;
            const isExpanded = expanded.includes(index);
            const moduleCompleted = module.lessons.filter((lesson) =>
              completed.includes(`${index}-${lesson.title}`)
            ).length;

            return (
              <article
                key={module.title}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleModule(index)}
                  aria-expanded={isExpanded}
                  className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${levelStyles[module.level]}`}
                      >
                        {module.level}
                      </span>
                      <span className="text-xs text-slate-500">
                        {module.duration}
                      </span>
                    </div>

                    <h2 className="mt-3 text-lg font-bold sm:text-xl">
                      {module.title}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                      {module.objective}
                    </p>
                    <p className="mt-3 text-xs font-medium text-slate-500">
                      {moduleCompleted} / {module.lessons.length} lesson
                      sections completed
                    </p>
                  </div>

                  <span
                    className="mt-2 text-xl text-slate-500"
                    aria-hidden="true"
                  >
                    {isExpanded ? "−" : "+"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-100 px-5 pb-5 sm:px-6 sm:pb-6">
                    <div className="space-y-4 pt-5">
                      {module.lessons.map((lesson) => {
                        const key = `${index}-${lesson.title}`;
                        const isCompleted = completed.includes(key);

                        return (
                          <section
                            key={lesson.title}
                            className="rounded-xl border border-slate-200 p-4 sm:p-5"
                          >
                            <label className="flex cursor-pointer items-start gap-3">
                              <input
                                type="checkbox"
                                checked={isCompleted}
                                onChange={() => toggleLesson(key)}
                                className="mt-1 h-4 w-4 accent-orange-600"
                              />
                              <span className="font-semibold">
                                {lesson.title}
                              </span>
                            </label>

                            <ul className="ml-7 mt-4 list-disc space-y-2 pl-4 text-sm leading-6 text-slate-600 marker:text-orange-600">
                              {lesson.topics.map((topic) => (
                                <li key={topic}>{topic}</li>
                              ))}
                            </ul>

                            <div className="ml-7 mt-4 rounded-lg bg-orange-50 p-3 text-sm leading-6 text-orange-950">
                              <strong>Learning outcome:</strong>{" "}
                              {lesson.outcome}
                            </div>
                          </section>
                        );
                      })}
                    </div>
                  </div>
                )}
              </article>
            );
          })}

          {visibleModules.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h2 className="text-lg font-bold">No matching topics found</h2>
              <p className="mt-2 text-sm text-slate-500">
                Try another keyword or select All levels.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setLevel("All");
                }}
                className="mt-4 rounded-xl bg-orange-600 px-4 py-2 font-semibold text-white hover:bg-orange-700"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        <section className="mt-10 rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
          <h2 className="text-2xl font-bold">Recommended learning sequence</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-300">
            Start with version control fundamentals and daily commands. Then
            practise branches, merges, remote collaboration and pull requests.
            Move on to rebase, history investigation, security, CI/CD and
            production recovery. Complete the projects before interview
            preparation.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Learn", "Commands, commits and branches"],
              ["02", "Collaborate", "Remotes and pull requests"],
              ["03", "Operate", "Security, CI/CD and recovery"],
              ["04", "Demonstrate", "Projects and interviews"],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm font-bold text-orange-300">{number}</p>
                <h3 className="mt-2 font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
