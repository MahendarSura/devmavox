"use client";

import { useMemo, useState } from "react";

type Level = "Foundation" | "Beginner" | "Intermediate" | "Advanced" | "Production";

type Lesson = {
  title: string;
  purpose: string;
  topics: string[];
};

type Module = {
  title: string;
  level: Level;
  duration: string;
  description: string;
  lessons: Lesson[];
};

const modules: Module[] = [
  {
    title: "01. GitHub Actions Fundamentals and Architecture",
    level: "Foundation",
    duration: "2–3 days",
    description: "Understand event-driven automation, the GitHub Actions architecture and how a workflow moves from a repository event to completed jobs.",
    lessons: [
      {
        title: "Introduction to CI/CD and GitHub Actions",
        purpose: "Understand why teams automate software delivery and where GitHub Actions fits in a DevOps workflow.",
        topics: [
          "What is GitHub Actions and which problems does it solve?",
          "Continuous Integration: merge small changes and validate them frequently",
          "Continuous Delivery versus Continuous Deployment",
          "How Git commits, branches and pull requests start automated validation",
          "Typical CI stages: checkout, dependency installation, lint, test and build",
          "Typical CD stages: package, publish, deploy and verify",
          "GitHub Actions compared with Jenkins and other CI platforms",
          "When GitHub Actions is a good fit and when external runners or services are needed",
        ],
      },
      {
        title: "GitHub Actions architecture and execution flow",
        purpose: "Trace a workflow from an event through the GitHub service, runner, jobs, steps and final status.",
        topics: [
          "Repository workflow files stored under .github/workflows/",
          "GitHub event payload and workflow trigger evaluation",
          "Workflow run, run attempt and individual job execution",
          "GitHub-hosted runner allocation and runner environment",
          "Job steps, shell commands and referenced actions",
          "How job dependencies and needs control execution order",
          "How exit codes determine step, job and workflow success or failure",
          "Where to inspect workflow summaries, annotations and execution logs",
        ],
      },
      {
        title: "Workflow YAML structure and syntax",
        purpose: "Read and create valid workflow files while understanding the purpose of each top-level and job-level key.",
        topics: [
          "Workflow name and the on event declaration",
          "permissions, env and concurrency at workflow scope",
          "jobs as the collection of independently scheduled units of work",
          "runs-on for selecting the runner operating system or labels",
          "steps with uses for actions and run for shell commands",
          "with inputs, env variables, id values and working-directory",
          "needs, if, timeout-minutes and continue-on-error",
          "YAML indentation, strings, arrays, mappings and common parsing mistakes",
        ],
      },
      {
        title: "Events, filters and manual execution",
        purpose: "Choose exactly when a workflow should run so validation is useful, predictable and cost-aware.",
        topics: [
          "push and pull_request event behaviour",
          "workflow_dispatch for manually started workflows and input values",
          "schedule using cron expressions and UTC scheduling considerations",
          "workflow_call for reusable workflow entry points",
          "Branch and tag filters using branches, branches-ignore and tags",
          "Path filters using paths and paths-ignore",
          "Activity types such as opened, synchronize, reopened and closed",
          "Avoiding duplicate runs and understanding event-specific limitations",
        ],
      },
    ],
  },
  {
    title: "02. Runners, Jobs, Steps and Workflow Control",
    level: "Beginner",
    duration: "3–4 days",
    description: "Build workflows that execute commands reliably, coordinate multiple jobs and use actions from the GitHub ecosystem.",
    lessons: [
      {
        title: "GitHub-hosted and self-hosted runners",
        purpose: "Select a suitable execution environment and understand the security and maintenance responsibilities of each runner type.",
        topics: [
          "GitHub-hosted runner images for Ubuntu, Windows and macOS",
          "runs-on labels and runner image selection",
          "Fresh virtual-machine environments and job isolation",
          "Self-hosted runner installation, registration and labels",
          "Runner groups, access restrictions and repository boundaries",
          "Network access, private dependencies and custom build tools",
          "Capacity, concurrency, maintenance and patching responsibilities",
          "Why untrusted pull requests must not run on sensitive self-hosted runners",
        ],
      },
      {
        title: "Jobs, steps and execution dependencies",
        purpose: "Split a pipeline into understandable units and control which jobs can run in parallel or must wait.",
        topics: [
          "Difference between workflow, job, step and action",
          "Default parallel execution of independent jobs",
          "needs to express job dependencies and execution order",
          "Passing job outputs through needs context",
          "Step id and steps context for sharing step outputs",
          "if conditions for controlling job and step execution",
          "Failure propagation, skipped jobs and always() behaviour",
          "Designing build, test, scan and package jobs as separate stages",
        ],
      },
      {
        title: "Using actions and the GitHub Marketplace",
        purpose: "Reuse maintained automation components safely instead of writing every integration from scratch.",
        topics: [
          "Difference between JavaScript, Docker and composite actions",
          "actions/checkout for retrieving repository source",
          "actions/setup-node and runtime version configuration",
          "Action inputs through with and action outputs",
          "Referencing actions by version tags versus immutable commit SHAs",
          "Reading action.yml, documentation and release notes",
          "Third-party action trust, maintenance and permission review",
          "Creating a small composite action for repeated repository steps",
        ],
      },
      {
        title: "Contexts, expressions and environment variables",
        purpose: "Use workflow data safely to make decisions and pass configuration between workflow steps.",
        topics: [
          "github context for repository, event, ref, SHA and actor information",
          "env context and workflow, job or step environment scope",
          "vars context for non-secret configuration values",
          "secrets context and safe handling of sensitive values",
          "needs, steps, runner, strategy and matrix contexts",
          "Expression syntax with [object Object] and operators such as ==, && and ||",
          "if conditions, status check functions and expression evaluation timing",
          "Avoiding unsafe expression interpolation in shell scripts",
        ],
      },
    ],
  },
  {
    title: "03. Build, Test, Artifacts and Performance",
    level: "Intermediate",
    duration: "3–4 days",
    description: "Create repeatable CI pipelines that install dependencies, validate code, preserve build outputs and reduce unnecessary execution time.",
    lessons: [
      {
        title: "Checkout, runtime setup and dependency installation",
        purpose: "Prepare a clean and reproducible runner environment for application builds.",
        topics: [
          "Checking out the correct repository revision",
          "Selecting Node.js, Python, Java or .NET runtime versions",
          "Using setup actions and supported runtime versions",
          "npm ci versus npm install and lockfile consistency",
          "Maven and Gradle dependency resolution",
          "Python virtual environments and pinned requirements",
          "Working directories for monorepos and multi-project repositories",
          "Reproducible builds and avoiding dependencies on runner leftovers",
        ],
      },
      {
        title: "Build, lint, type-check and test automation",
        purpose: "Turn code-quality requirements into automated checks that prevent broken changes from being merged.",
        topics: [
          "Running format checks and static linting",
          "Running TypeScript or language-specific type checks",
          "Executing unit tests and integration tests",
          "Building production-ready application bundles",
          "Preserving command exit codes so failures stop the pipeline",
          "Separating fast pull-request checks from longer scheduled suites",
          "Publishing test reports and coverage summaries",
          "Using branch protection and required status checks",
        ],
      },
      {
        title: "Artifacts, caches and workflow outputs",
        purpose: "Share generated files between jobs and speed up repeated dependency installation without confusing caches with deliverable artifacts.",
        topics: [
          "What an artifact is and when a workflow should upload one",
          "Uploading build packages, test reports and diagnostic files",
          "Downloading artifacts in a dependent job",
          "Artifact retention periods and naming conventions",
          "Cache keys, restore keys and dependency lockfile hashes",
          "Cache hit, cache miss and invalidation behaviour",
          "Difference between artifacts, caches, environment variables and job outputs",
          "Passing small values using GITHUB_OUTPUT and job outputs",
        ],
      },
      {
        title: "Matrix builds, parallelism and workflow efficiency",
        purpose: "Validate supported runtime and platform combinations while keeping execution time and runner usage under control.",
        topics: [
          "strategy.matrix for multiple language versions and operating systems",
          "include and exclude to customize matrix combinations",
          "fail-fast and max-parallel behaviour",
          "Matrix values in job names, environment variables and commands",
          "Concurrency groups to cancel or serialize duplicate runs",
          "Path filters and conditional jobs for monorepositories",
          "Avoiding redundant dependency installation and repeated builds",
          "Using timeouts and measuring workflow duration",
        ],
      },
    ],
  },
  {
    title: "04. Workflow Security and Supply-Chain Protection",
    level: "Advanced",
    duration: "3–4 days",
    description: "Protect credentials, restrict automation permissions and reduce risks from untrusted code and third-party dependencies.",
    lessons: [
      {
        title: "GITHUB_TOKEN and least-privilege permissions",
        purpose: "Give each workflow and job only the repository permissions it needs to complete its task.",
        topics: [
          "What GITHUB_TOKEN is and how GitHub creates it for a workflow run",
          "Default token permissions and repository-level settings",
          "Workflow-level permissions versus job-level permissions",
          "contents: read for source checkout and read-only validation",
          "contents: write, packages: write and pull-requests: write use cases",
          "Setting permissions: {} and granting only required scopes",
          "Fork pull-request token restrictions",
          "Auditing token usage and avoiding unnecessary write access",
        ],
      },
      {
        title: "Secrets, variables and environment protection",
        purpose: "Manage credentials and deployment configuration without exposing sensitive values in logs or untrusted jobs.",
        topics: [
          "Repository, organization and environment secrets",
          "GitHub Actions variables for non-sensitive configuration",
          "Secret references through the secrets context",
          "Secret masking limitations and avoiding echo or debug leakage",
          "Environment-scoped secrets and deployment protection rules",
          "Required reviewers and approval gates for production",
          "Secret rotation and minimizing credential lifetime",
          "Why secrets must not be passed to untrusted pull-request code",
        ],
      },
      {
        title: "Pull request security and untrusted workflow events",
        purpose: "Prevent attacker-controlled pull-request code from accessing privileged tokens, secrets or trusted runner infrastructure.",
        topics: [
          "Trust boundary between same-repository and fork pull requests",
          "pull_request event permissions and secret availability",
          "pull_request_target and the risk of checking out untrusted code",
          "Expression injection through titles, branch names and commit messages",
          "Safe handling of event payload values in shell commands",
          "Separating unprivileged validation from privileged automation",
          "Restricting self-hosted runners and deployment environments",
          "Reviewing workflow changes as security-sensitive code",
        ],
      },
      {
        title: "Action pinning and software supply-chain security",
        purpose: "Reduce the chance that a compromised or unexpectedly changed dependency can alter the workflow or access credentials.",
        topics: [
          "Risks of mutable action tags and unreviewed third-party actions",
          "Pinning actions to full-length commit SHAs",
          "Reviewing action source code and release changes",
          "Dependency review and vulnerable package detection",
          "Code scanning and secret scanning integrations",
          "Generating and retaining software bills of materials where required",
          "Artifact provenance, attestations and immutable image digests",
          "Keeping workflow dependencies updated through controlled reviews",
        ],
      },
    ],
  },
  {
    title: "05. Containers, Cloud Deployment and Release Management",
    level: "Production",
    duration: "4–5 days",
    description: "Connect CI results to container registries and cloud platforms, then promote verified releases through protected environments.",
    lessons: [
      {
        title: "Docker build and container image publishing",
        purpose: "Build traceable container images and publish them only after application validation succeeds.",
        topics: [
          "Building images from a reviewed Dockerfile",
          "Docker Buildx and multi-platform image builds",
          "Tagging images with commit SHA and release version",
          "Authenticating to GitHub Container Registry",
          "Using short-lived registry credentials and package permissions",
          "Pushing images only from trusted branches or release events",
          "Scanning images and dependencies before publishing",
          "Recording image digest and verifying the published artifact",
        ],
      },
      {
        title: "Cloud authentication with OpenID Connect",
        purpose: "Allow a workflow to obtain short-lived cloud credentials without storing long-lived access keys as repository secrets.",
        topics: [
          "OpenID Connect identity tokens and trust federation",
          "GitHub Actions id-token: write permission",
          "Configuring an AWS IAM OIDC identity provider",
          "IAM role trust policy conditions for repository and branch",
          "Restricting cloud access to protected environments",
          "Obtaining short-lived credentials during a workflow job",
          "Least-privilege cloud policies and audit trails",
          "Common OIDC audience, subject and trust-policy failures",
        ],
      },
      {
        title: "Deployment environments, approvals and concurrency",
        purpose: "Separate staging and production releases and prevent uncontrolled or overlapping deployments.",
        topics: [
          "Defining development, staging and production environments",
          "Environment-scoped secrets and variables",
          "Required reviewers and deployment protection rules",
          "Branch and tag restrictions for production deployment",
          "Concurrency groups for deployment serialization",
          "Preventing stale runs from overwriting newer releases",
          "Health checks and smoke tests after deployment",
          "Recording release metadata and deployment outcomes",
        ],
      },
      {
        title: "Kubernetes delivery and reusable workflow design",
        purpose: "Build maintainable delivery pipelines for Kubernetes and share common automation across repositories.",
        topics: [
          "Building and publishing an immutable application image",
          "Passing image tags or digests to deployment jobs",
          "Authenticating to a Kubernetes cluster with scoped access",
          "Applying manifests or Helm releases from a controlled job",
          "Waiting for rollout status and checking workload health",
          "Reusable workflows with workflow_call inputs and outputs",
          "Composite actions for repeated step sequences",
          "Versioning shared workflows and controlling caller permissions",
        ],
      },
    ],
  },
  {
    title: "06. Troubleshooting, Reliability and Production Capstone",
    level: "Production",
    duration: "4–5 days",
    description: "Diagnose real workflow failures, operate reliable automation and assemble a secure end-to-end CI/CD delivery project.",
    lessons: [
      {
        title: "Workflow logs, failed jobs and runner troubleshooting",
        purpose: "Find the first meaningful failure, distinguish application errors from runner problems and reproduce issues safely.",
        topics: [
          "Reading workflow run summaries and job-level logs",
          "Finding the first failing step rather than the final cascade of errors",
          "Enabling step debug logging without exposing secrets",
          "Runner image, tool version and environment differences",
          "Permission denied, missing executable and path problems",
          "Dependency download, network and rate-limit failures",
          "Timeouts, cancelled jobs and unavailable self-hosted runners",
          "Reproducing the failing command locally and validating the fix",
        ],
      },
      {
        title: "Expressions, conditions and workflow debugging",
        purpose: "Diagnose incorrect context references, skipped jobs and conditions that behave differently from expectations.",
        topics: [
          "Understanding github, env, vars, secrets, needs and steps contexts",
          "Checking job outputs and step output names",
          "Debugging if expressions and status check functions",
          "Why secrets are unavailable in some event contexts",
          "YAML syntax errors and invalid workflow schema",
          "Inspecting event payloads and safely quoting shell values",
          "Using workflow visualization and job dependency graphs",
          "Validating changes with a small test workflow before rollout",
        ],
      },
      {
        title: "Production reliability, rollback and operational controls",
        purpose: "Make workflow automation predictable during failures, releases and infrastructure incidents.",
        topics: [
          "timeout-minutes and cancellation behaviour",
          "Retrying only transient operations with bounded attempts",
          "Idempotent deployment commands and safe reruns",
          "Concurrency controls for builds and deployments",
          "Retaining logs, test reports and diagnostic artifacts",
          "Deployment health checks and release verification",
          "Rollback strategy using a known-good artifact or image digest",
          "Monitoring workflow failures, duration and operational ownership",
        ],
      },
      {
        title: "End-to-end secure CI/CD production project",
        purpose: "Combine workflow design, testing, container publishing, cloud authentication and protected deployment into one verifiable delivery pipeline.",
        topics: [
          "Create pull-request and main-branch workflow triggers",
          "Checkout source, configure runtime and install locked dependencies",
          "Run lint, type checks, unit tests and production build",
          "Build, scan and publish a Docker image tagged with commit SHA",
          "Use OIDC and least-privilege permissions for cloud authentication",
          "Deploy automatically to staging and verify application health",
          "Require approval before production deployment",
          "Inject a controlled failure, troubleshoot it and demonstrate rollback validation",
        ],
      },
    ],
  },
];

const levelStyles: Record<Level, string> = {
  Foundation: "bg-slate-100 text-slate-700",
  Beginner: "bg-sky-50 text-sky-800",
  Intermediate: "bg-indigo-50 text-indigo-800",
  Advanced: "bg-violet-50 text-violet-800",
  Production: "bg-emerald-50 text-emerald-800",
};

export default function GitHubActionsRoadmapPage() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [expanded, setExpanded] = useState<number[]>([0]);
  const [completed, setCompleted] = useState<string[]>([]);

  const allLessons = modules.flatMap((module, moduleIndex) =>
    module.lessons.map((lesson, lessonIndex) => ({
      id: `${moduleIndex}-${lessonIndex}`,
      module: module.title,
      lesson: lesson.title,
    })),
  );

  const filteredModules = useMemo(() => {
    const query = search.trim().toLowerCase();

    return modules
      .map((module, index) => ({ ...module, originalIndex: index }))
      .filter((module) => level === "All" || module.level === level)
      .map((module) => ({
        ...module,
        lessons: module.lessons.filter((lesson) => {
          const searchable = [
            lesson.title,
            lesson.purpose,
            ...lesson.topics,
            module.title,
            module.description,
          ].join(" ").toLowerCase();

          return !query || searchable.includes(query);
        }),
      }))
      .filter((module) => module.lessons.length > 0);
  }, [search, level]);

  const progress = Math.round((completed.length / allLessons.length) * 100);

  function toggleModule(index: number) {
    setExpanded((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  function toggleLesson(id: string) {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
          <p className="mb-4 inline-flex rounded-full border border-blue-300/30 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
            DevMavox · DevOps Learning Roadmap
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            GitHub Actions Learning Roadmap
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-800 sm:text-lg">
            A structured path from CI/CD fundamentals to secure, production-grade
            automation. Learn how repository events trigger workflows, how
            runners execute jobs, how build artifacts move through a pipeline
            and how teams release applications safely using protected
            environments, short-lived cloud credentials and repeatable
            deployment practices.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              [String(modules.length), "Learning modules"],
              ["5", "Learning levels"],
              ["Architecture", "Core foundation"],
              ["Production", "Final destination"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-xl font-bold sm:text-2xl">{value}</p>
                <p className="mt-1 text-sm text-slate-700">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Your learning progress</h2>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-600">Topics completed</span>
              <span className="font-bold">{completed.length}/{allLessons.length}</span>
            </div>
            <div
              className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Roadmap completion"
            >
              <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-sm text-slate-500">{progress}% of roadmap sections completed</p>
            <button type="button" onClick={() => setCompleted([])} className="mt-4 text-sm font-semibold text-blue-700 hover:text-blue-900">
              Reset progress
            </button>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold">Recommended learning order</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>1. CI/CD fundamentals and workflow architecture</li>
              <li>2. YAML, events, runners and job execution</li>
              <li>3. Build, test, artifacts and performance</li>
              <li>4. Permissions, secrets and supply-chain security</li>
              <li>5. Containers, cloud deployment and releases</li>
              <li>6. Troubleshooting and production reliability</li>
            </ol>
          </section>

          <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <h2 className="font-bold text-blue-950">Before GitHub Actions</h2>
            <p className="mt-2 text-sm leading-6 text-blue-900">
              Basic Git commands, branches, pull requests, YAML, Linux shell
              commands and application build steps will make workflow
              automation much easier to understand.
            </p>
          </section>
        </aside>

        <section className="min-w-0">
          <div className="mb-6">
            <h2 className="text-2xl font-bold sm:text-3xl">Complete learning path</h2>
            <p className="mt-2 leading-7 text-slate-600">
              Open each module to explore its lessons, explanations and practical
              topics. Mark a lesson complete after you understand the concepts
              and have practised the related workflow.
            </p>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_190px]">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search GitHub Actions topics..."
              aria-label="Search roadmap topics"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              aria-label="Filter by learning level"
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            >
              {["All", "Foundation", "Beginner", "Intermediate", "Advanced", "Production"].map((item) => (
                <option key={item} value={item}>{item === "All" ? "All levels" : item}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {filteredModules.map((module) => {
              const index = module.originalIndex;
              const isExpanded = expanded.includes(index);
              const completedInModule = module.lessons.filter((lesson) => {
                const lessonIndex = modules[index].lessons.findIndex((item) => item.title === lesson.title);
                return completed.includes(`${index}-${lessonIndex}`);
              }).length;

              return (
                <article key={module.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => toggleModule(index)}
                    aria-expanded={isExpanded}
                    className="flex w-full items-start gap-4 p-5 text-left transition hover:bg-slate-50 sm:p-6"
                  >
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-bold sm:text-lg">{module.title}</span>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${levelStyles[module.level]}`}>{module.level}</span>
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-slate-600">{module.description}</span>
                      <span className="mt-3 block text-xs font-medium text-slate-500">
                        {completedInModule}/{module.lessons.length} lessons completed · {module.duration}
                      </span>
                    </span>
                    <span aria-hidden="true" className="shrink-0 text-xl text-slate-600">{isExpanded ? "−" : "+"}</span>
                  </button>

                  {isExpanded && (
                    <div className="space-y-4 border-t border-slate-100 p-4 sm:p-6">
                      {module.lessons.map((lesson) => {
                        const lessonIndex = modules[index].lessons.findIndex((item) => item.title === lesson.title);
                        const id = `${index}-${lessonIndex}`;
                        const isComplete = completed.includes(id);
                        return (
                          <section key={lesson.title} className="rounded-xl border border-slate-200 p-4 sm:p-5">
                            <label className="flex cursor-pointer items-start gap-3">
                              <input type="checkbox" checked={isComplete} onChange={() => toggleLesson(id)} className="mt-1 h-4 w-4 accent-blue-600" />
                              <span className="min-w-0 flex-1">
                                <span className={`block font-bold ${isComplete ? "text-slate-600 line-through" : "text-slate-900"}`}>{lesson.title}</span>
                                <span className="mt-2 block text-sm leading-6 text-slate-600">{lesson.purpose}</span>
                              </span>
                            </label>
                            <div className="mt-4 border-t border-slate-100 pt-4">
                              <h3 className="text-sm font-bold text-slate-700">Topics to understand</h3>
                              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                                {lesson.topics.map((topic) => (
                                  <li key={topic} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                                    <span className="mt-0.5 text-blue-600">•</span>
                                    <span>{topic}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </section>
                        );
                      })}
                    </div>
                  )}
                </article>
              );
            })}

            {filteredModules.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <h3 className="font-bold">No matching topics found</h3>
                <p className="mt-2 text-sm text-slate-600">Try another search term or select a different learning level.</p>
                <button type="button" onClick={() => { setSearch(""); setLevel("All"); }} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                  Clear filters
                </button>
              </div>
            )}
          </div>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
            <h2 className="text-xl font-bold">What should you know by the end?</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "Explain how events trigger workflows and how runners execute jobs.",
                "Create valid workflow YAML using jobs, steps, actions and expressions.",
                "Build CI pipelines with linting, tests, type checks and artifacts.",
                "Use caches, matrices and concurrency to improve workflow efficiency.",
                "Protect secrets and configure least-privilege GITHUB_TOKEN permissions.",
                "Explain pull-request security and action supply-chain risks.",
                "Publish immutable container images and deploy with OIDC credentials.",
                "Troubleshoot failed runs and verify production releases and rollbacks.",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <p className="mt-6 text-sm leading-6 text-slate-500">
            Learning times are estimates, not guarantees. GitHub Actions capabilities,
            runner images and individual action versions can change. Verify current
            syntax and security guidance against the official GitHub documentation
            before using a workflow in production. Completion checkboxes track
            progress in the current page session; persistent progress storage is
            not implemented here.
          </p>
        </section>
      </div>
    </main>
  );
}
