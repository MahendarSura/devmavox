
'use client';

import { useMemo, useState } from 'react';

type Level = 'Beginner' | 'Intermediate' | 'Advanced' | 'Production';

type Module = {
  id: number;
  title: string;
  level: Level;
  duration: string;
  topics: string[];
  task: string;
};

const modules: Module[] = [
  {
    id: 1,
    title: 'GitHub Actions Fundamentals',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['What is GitHub Actions?', 'CI and CD concepts', 'Workflow automation', 'GitHub Actions use cases', 'GitHub Actions vs Jenkins'],
    task: 'Explain how a workflow automatically tests code after a Git push.',
  },
  {
    id: 2,
    title: 'GitHub Repository Setup',
    level: 'Beginner',
    duration: '1 hour',
    topics: ['Create a repository', 'Understand branches', 'Pull requests', 'Commit and push changes', 'Repository settings'],
    task: 'Create a practice repository and push a sample application.',
  },
  {
    id: 3,
    title: 'Your First Workflow',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['.github/workflows directory', 'YAML workflow files', 'Workflow name', 'on triggers', 'Run a basic shell command'],
    task: 'Create a workflow that runs automatically when code is pushed.',
  },
  {
    id: 4,
    title: 'Events and Workflow Triggers',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['push event', 'pull_request event', 'workflow_dispatch', 'schedule event', 'Branch and path filters'],
    task: 'Configure separate triggers for pushes to main and manual execution.',
  },
  {
    id: 5,
    title: 'Jobs, Steps and Runners',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['Workflow jobs', 'Step execution', 'GitHub-hosted runners', 'Runner operating systems', 'Job dependencies using needs'],
    task: 'Create a workflow with build and test jobs running in the correct order.',
  },
  {
    id: 6,
    title: 'Actions and Marketplace',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['Use an existing action', 'actions/checkout', 'actions/setup-node', 'Action inputs and outputs', 'Pin actions to full commit SHAs'],
    task: 'Check out a repository, configure Node.js and run a test command.',
  },
  {
    id: 7,
    title: 'YAML and Workflow Expressions',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['YAML indentation', 'Contexts and expressions', 'if conditions', 'Environment variables', 'Step outputs'],
    task: 'Use a conditional step to run an extra check only on the main branch.',
  },
  {
    id: 8,
    title: 'Build and Test Automation',
    level: 'Intermediate',
    duration: '3 hours',
    topics: ['Install dependencies', 'Compile an application', 'Unit tests', 'Linting', 'Fail a workflow on test errors'],
    task: 'Build and test a sample Node.js application on every pull request.',
  },
  {
    id: 9,
    title: 'Artifacts and Build Outputs',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['Upload artifacts', 'Download artifacts', 'Share outputs between jobs', 'Artifact retention', 'Build reports'],
    task: 'Build an application and pass its output from the build job to another job.',
  },
  {
    id: 10,
    title: 'Caching and Performance',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['Dependency caching', 'Cache keys', 'Restore keys', 'Cache invalidation', 'Reduce workflow execution time'],
    task: 'Cache package dependencies and compare workflow execution times.',
  },
  {
    id: 11,
    title: 'Secrets and Permissions',
    level: 'Advanced',
    duration: '3 hours',
    topics: ['Repository and environment secrets', 'GitHub variables', 'GITHUB_TOKEN', 'Least-privilege permissions', 'Prevent secret exposure'],
    task: 'Use a test secret securely without printing its value in workflow logs.',
  },
  {
    id: 12,
    title: 'Matrix Builds and Parallel Jobs',
    level: 'Advanced',
    duration: '2 hours',
    topics: ['Strategy matrix', 'Multiple Node.js versions', 'Operating-system matrix', 'fail-fast behavior', 'Parallel execution'],
    task: 'Test an application across multiple supported Node.js versions.',
  },
  {
    id: 13,
    title: 'Reusable Workflows',
    level: 'Advanced',
    duration: '3 hours',
    topics: ['workflow_call', 'Reusable workflow inputs', 'Secrets passing', 'Reusable job design', 'Workflow maintenance'],
    task: 'Create a reusable testing workflow and call it from another workflow.',
  },
  {
    id: 14,
    title: 'Docker Image CI',
    level: 'Advanced',
    duration: '3 hours',
    topics: ['Docker build', 'Image tags', 'Docker buildx', 'Container registry authentication', 'Push images to GHCR'],
    task: 'Build and publish a test image to GitHub Container Registry using secure credentials.',
  },
  {
    id: 15,
    title: 'AWS Deployment with OIDC',
    level: 'Production',
    duration: '4 hours',
    topics: ['AWS IAM roles', 'GitHub OIDC federation', 'Short-lived credentials', 'Configure AWS permissions', 'Deploy to a test environment'],
    task: 'Design an AWS deployment workflow using OIDC instead of long-lived AWS access keys.',
  },
  {
    id: 16,
    title: 'Kubernetes Deployment Pipeline',
    level: 'Production',
    duration: '4 hours',
    topics: ['Build and publish container images', 'Kubernetes deployment manifests', 'Cluster authentication', 'Deployment rollout checks', 'Environment separation'],
    task: 'Create a deployment pipeline for a test Kubernetes cluster with restricted permissions.',
  },
  {
    id: 17,
    title: 'Environments and Approvals',
    level: 'Production',
    duration: '2 hours',
    topics: ['Development and production environments', 'Environment-scoped secrets', 'Deployment protection rules', 'Required reviewers where supported', 'Release gates'],
    task: 'Separate staging and production deployments and protect production with approval rules.',
  },
  {
    id: 18,
    title: 'Security and Supply Chain',
    level: 'Production',
    duration: '3 hours',
    topics: ['Dependency review', 'Code scanning integration', 'Action pinning', 'Minimal token permissions', 'Software supply-chain security'],
    task: 'Review workflow permissions and pin third-party actions to verified full commit SHAs.',
  },
  {
    id: 19,
    title: 'Self-Hosted Runners and Troubleshooting',
    level: 'Production',
    duration: '3 hours',
    topics: ['Self-hosted runner concepts', 'Runner labels', 'Runner maintenance', 'Failed jobs and logs', 'Timeouts and concurrency'],
    task: 'Troubleshoot a deliberately failing workflow and document the root cause.',
  },
  {
    id: 20,
    title: 'Production Capstone and Interview Prep',
    level: 'Production',
    duration: '4 hours',
    topics: ['End-to-end CI/CD design', 'Build-test-scan-release flow', 'Rollback strategy', 'Pipeline documentation', 'Production troubleshooting scenarios'],
    task: 'Build a complete CI/CD pipeline for a sample application and document each stage.',
  },
];

const projects = [
  {
    title: 'Project 1 — Automated Code Testing',
    level: 'Beginner',
    tools: 'GitHub Actions, Git, Node.js',
    details: 'Run linting, unit tests and build checks automatically on pull requests.',
  },
  {
    title: 'Project 2 — Docker CI Pipeline',
    level: 'Intermediate',
    tools: 'GitHub Actions, Docker, GHCR',
    details: 'Build a container image, tag it and publish it securely to GitHub Container Registry.',
  },
  {
    title: 'Project 3 — Secure AWS Deployment',
    level: 'Advanced',
    tools: 'GitHub Actions, AWS IAM, OIDC',
    details: 'Deploy to a test AWS environment without storing long-lived AWS access keys.',
  },
  {
    title: 'Project 4 — Kubernetes CD Pipeline',
    level: 'Advanced',
    tools: 'GitHub Actions, Docker, Kubernetes',
    details: 'Build an image, deploy to a test cluster and verify rollout health.',
  },
  {
    title: 'Project 5 — Production Release Pipeline',
    level: 'Advanced',
    tools: 'GitHub Actions, security scans, environments',
    details: 'Create a pipeline with testing, security checks, staging validation and protected production approval.',
  },
];

const interviewQuestions = [
  'What is GitHub Actions?',
  'What are workflows, jobs and steps?',
  'What is the purpose of the .github/workflows directory?',
  'What is the difference between GitHub-hosted and self-hosted runners?',
  'How do push and pull_request triggers differ?',
  'How does the needs keyword work?',
  'What is a matrix strategy?',
  'How do you share artifacts between jobs?',
  'How does dependency caching work?',
  'How do you store and access secrets safely?',
  'What is GITHUB_TOKEN and how can its permissions be restricted?',
  'What is a reusable workflow?',
  'How do you build and publish Docker images?',
  'How does GitHub OIDC authentication with AWS work?',
  'How would you troubleshoot a failed production deployment?',
];

const levels: Array<'All' | Level> = [
  'All',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Production',
];

export default function GitHubActionsRoadmapPage() {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState<'All' | Level>('All');
  const [expanded, setExpanded] = useState<number[]>([1]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [showProjects, setShowProjects] = useState(true);
  const [showInterview, setShowInterview] = useState(false);

  const filteredModules = useMemo(() => {
    const query = search.trim().toLowerCase();

    return modules.filter((module) => {
      const matchesLevel = level === 'All' || module.level === level;
      const searchableText = [
        module.title,
        module.level,
        ...module.topics,
        module.task,
      ]
        .join(' ')
        .toLowerCase();

      return matchesLevel && searchableText.includes(query);
    });
  }, [search, level]);

  const progress = Math.round((completed.length / modules.length) * 100);

  function toggleExpanded(id: number) {
    setExpanded((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function toggleCompleted(id: number) {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/50 p-6 shadow-2xl sm:p-10">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative">
            <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
              DevOps Learning Roadmap
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
              Master <span className="text-blue-400">GitHub Actions</span>
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              Learn CI/CD automation, workflow YAML, automated testing, Docker
              publishing, secure cloud deployments and production release
              pipelines through practical projects.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ['20', 'Learning Modules'],
                ['5', 'Real-World Projects'],
                ['15', 'Interview Questions'],
                ['4', 'Learning Levels'],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-3xl font-black text-blue-300">{value}</p>
                  <p className="mt-1 text-sm text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Your Learning Progress</h2>
              <p className="mt-1 text-sm text-slate-400">
                Mark each module complete after finishing its task.
              </p>
            </div>
            <span className="text-2xl font-black text-blue-300">
              {progress}%
            </span>
          </div>

          <div
            className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Learning progress"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-300 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-slate-500">
            {completed.length} of {modules.length} modules completed. Progress
            lasts only for the current page session and is not saved permanently.
          </p>
        </section>

        <section className="mt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-black sm:text-3xl">
                Learning Modules
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Start with fundamentals and progress toward production CI/CD.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search modules or topics..."
                aria-label="Search modules"
                className="min-w-0 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none transition focus:border-blue-400 sm:w-72"
              />

              <select
                value={level}
                onChange={(event) =>
                  setLevel(event.target.value as 'All' | Level)
                }
                aria-label="Filter by level"
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-400"
              >
                {levels.map((item) => (
                  <option key={item} value={item}>
                    {item === 'All' ? 'All Levels' : item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {filteredModules.map((module) => {
              const isExpanded = expanded.includes(module.id);
              const isCompleted = completed.includes(module.id);

              return (
                <article
                  key={module.id}
                  className={`overflow-hidden rounded-2xl border transition ${
                    isCompleted
                      ? 'border-emerald-500/30 bg-emerald-950/10'
                      : 'border-slate-800 bg-slate-900'
                  }`}
                >
                  <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <button
                      type="button"
                      onClick={() => toggleExpanded(module.id)}
                      aria-expanded={isExpanded}
                      className="flex min-w-0 flex-1 items-start gap-4 text-left"
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                          isCompleted
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : 'bg-blue-400/10 text-blue-300'
                        }`}
                      >
                        {isCompleted ? '✓' : String(module.id).padStart(2, '0')}
                      </span>

                      <span className="min-w-0">
                        <span className="block font-bold text-slate-100">
                          {module.title}
                        </span>
                        <span className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                          <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-300">
                            {module.level}
                          </span>
                          <span className="text-slate-500">
                            {module.duration}
                          </span>
                        </span>
                      </span>
                    </button>

                    <div className="flex items-center gap-3 sm:pl-4">
                      <button
                        type="button"
                        onClick={() => toggleCompleted(module.id)}
                        className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                          isCompleted
                            ? 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {isCompleted ? 'Completed' : 'Mark Complete'}
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleExpanded(module.id)}
                        aria-label={
                          isExpanded ? 'Collapse module' : 'Expand module'
                        }
                        className="rounded-lg px-2 py-2 text-lg text-slate-400 hover:bg-slate-800 hover:text-white"
                      >
                        {isExpanded ? '−' : '+'}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-800 px-5 py-5 sm:px-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-blue-300">
                        Topics to Learn
                      </h3>

                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {module.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex items-start gap-2 text-sm leading-6 text-slate-300"
                          >
                            <span className="mt-0.5 text-blue-400">•</span>
                            {topic}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 rounded-xl border border-blue-400/15 bg-blue-400/5 p-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-blue-300">
                          Hands-on Task
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {module.task}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}

            {filteredModules.length === 0 && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
                <h3 className="font-bold">No modules found</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Try another search term or choose a different level.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setLevel('All');
                  }}
                  className="mt-4 rounded-xl bg-blue-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-blue-400"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <button
            type="button"
            onClick={() => setShowProjects((value) => !value)}
            aria-expanded={showProjects}
            className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
          >
            <span>
              <span className="block text-2xl font-black">Real-World Projects</span>
              <span className="mt-1 block text-sm text-slate-400">
                Build practical CI/CD pipelines for your DevOps portfolio.
              </span>
            </span>
            <span className="text-2xl text-blue-300">
              {showProjects ? '−' : '+'}
            </span>
          </button>

          {showProjects && (
            <div className="grid gap-4 border-t border-slate-800 p-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                    {project.level}
                  </span>
                  <h3 className="mt-3 font-bold leading-6">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {project.details}
                  </p>
                  <p className="mt-4 border-t border-slate-800 pt-3 text-xs leading-5 text-slate-500">
                    Tools: {project.tools}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <button
            type="button"
            onClick={() => setShowInterview((value) => !value)}
            aria-expanded={showInterview}
            className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
          >
            <span>
              <span className="block text-2xl font-black">
                Interview Preparation
              </span>
              <span className="mt-1 block text-sm text-slate-400">
                Prepare for common GitHub Actions interview questions.
              </span>
            </span>
            <span className="text-2xl text-blue-300">
              {showInterview ? '−' : '+'}
            </span>
          </button>

          {showInterview && (
            <ol className="space-y-3 border-t border-slate-800 p-5 sm:p-6">
              {interviewQuestions.map((question, index) => (
                <li
                  key={question}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-300"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-400/10 text-xs font-bold text-blue-300">
                    {index + 1}
                  </span>
                  {question}
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="mt-8 rounded-2xl border border-blue-400/20 bg-gradient-to-r from-blue-950/40 to-slate-900 p-6 sm:p-8">
          <h2 className="text-2xl font-black">
            Ready to Build CI/CD Pipelines?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Complete the modules and projects. Practise secure credentials,
            automated testing, image publishing and deployment verification.
            Always use least-privilege permissions and test deployment workflows
            in a non-production environment before production use.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setCompleted([]);
                setExpanded([1]);
                setSearch('');
                setLevel('All');
              }}
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-blue-400/50"
            >
              Reset Learning Progress
            </button>
            <button
              type="button"
              onClick={() => {
                setCompleted(modules.map((module) => module.id));
                setExpanded([]);
              }}
              className="rounded-xl bg-blue-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-400"
            >
              Mark All Complete
            </button>
          </div>
        </section>

        <footer className="py-8 text-center text-xs text-slate-500">
          DevMavox · GitHub Actions Learning Roadmap · Automate, Test, Deploy
        </footer>
      </div>
    </main>
  );
}
