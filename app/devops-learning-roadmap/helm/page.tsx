
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
    title: 'Helm Fundamentals',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['What is Helm?', 'Why Kubernetes needs package management', 'Helm charts and releases', 'Helm architecture', 'Helm vs raw Kubernetes YAML'],
    task: 'Explain how Helm simplifies deploying the same application to multiple Kubernetes environments.',
  },
  {
    id: 2,
    title: 'Install Helm and Connect to Kubernetes',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['Install Helm CLI', 'Verify Helm version', 'Configure kubectl', 'Connect to a test cluster', 'Check cluster access'],
    task: 'Install Helm and verify that kubectl can access your test cluster.',
  },
  {
    id: 3,
    title: 'Helm Commands',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['helm version', 'helm list', 'helm search', 'helm install', 'helm status and helm uninstall'],
    task: 'Practise installing, inspecting and removing a sample chart in a test namespace.',
  },
  {
    id: 4,
    title: 'Understand Helm Chart Structure',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['Chart.yaml', 'values.yaml', 'templates directory', 'charts directory', '.helmignore'],
    task: 'Create a chart and identify the purpose of its main files and directories.',
  },
  {
    id: 5,
    title: 'Create Your First Helm Chart',
    level: 'Beginner',
    duration: '3 hours',
    topics: ['helm create', 'Chart metadata', 'Deployment template', 'Service template', 'Default values'],
    task: 'Generate a chart and deploy a simple application into a test cluster.',
  },
  {
    id: 6,
    title: 'Helm Templates',
    level: 'Intermediate',
    duration: '3 hours',
    topics: ['Go template syntax', 'Template expressions', 'if and with blocks', 'range loops', 'Template whitespace control'],
    task: 'Create a template that conditionally includes a Kubernetes resource.',
  },
  {
    id: 7,
    title: 'Values and Configuration',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['values.yaml', 'Override values with --set', 'Custom values files', 'Default values', 'Configuration precedence'],
    task: 'Deploy the same chart with different replica counts and image tags.',
  },
  {
    id: 8,
    title: 'Template Functions and Pipelines',
    level: 'Intermediate',
    duration: '3 hours',
    topics: ['Common template functions', 'Quote and default', 'Required values', 'String formatting', 'Pipelines and expressions'],
    task: 'Use template functions to validate and format application configuration.',
  },
  {
    id: 9,
    title: 'Deployments, Services and Ingress',
    level: 'Intermediate',
    duration: '3 hours',
    topics: ['Deployment templates', 'ClusterIP and NodePort Services', 'Ingress configuration', 'Labels and selectors', 'Resource references'],
    task: 'Package a web application with a Deployment and Service using Helm templates.',
  },
  {
    id: 10,
    title: 'ConfigMaps and Secrets',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['ConfigMap templates', 'Secret references', 'Environment variables', 'External secret management', 'Avoid committing credentials'],
    task: 'Configure a test application using a ConfigMap and a safely managed secret reference.',
  },
  {
    id: 11,
    title: 'Helm Dependencies',
    level: 'Advanced',
    duration: '3 hours',
    topics: ['Chart dependencies', 'Chart.yaml dependencies', 'helm dependency update', 'Version constraints', 'Subcharts and shared values'],
    task: 'Add a chart dependency and render the resulting templates locally.',
  },
  {
    id: 12,
    title: 'Linting and Template Validation',
    level: 'Advanced',
    duration: '2 hours',
    topics: ['helm lint', 'helm template', 'Kubernetes schema validation', 'Debug template errors', 'Dry-run installation'],
    task: 'Find and fix a deliberate chart template error before deployment.',
  },
  {
    id: 13,
    title: 'Helm Upgrade and Rollback',
    level: 'Advanced',
    duration: '3 hours',
    topics: ['helm upgrade', 'helm history', 'helm rollback', 'Release revisions', 'Safe deployment changes'],
    task: 'Upgrade a test release and roll back to an earlier revision.',
  },
  {
    id: 14,
    title: 'Namespaces and Environment Values',
    level: 'Advanced',
    duration: '2 hours',
    topics: ['Namespace-specific releases', 'Development values', 'Staging values', 'Production values', 'Configuration separation'],
    task: 'Prepare separate values files for development and staging deployments.',
  },
  {
    id: 15,
    title: 'Helm Hooks and Lifecycle',
    level: 'Advanced',
    duration: '3 hours',
    topics: ['Helm hook annotations', 'Pre-install and post-install hooks', 'Upgrade hooks', 'Hook deletion policies', 'Lifecycle troubleshooting'],
    task: 'Create and validate a test hook that runs before an installation.',
  },
  {
    id: 16,
    title: 'Helm in CI/CD Pipelines',
    level: 'Production',
    duration: '3 hours',
    topics: ['Helm in Jenkins', 'Helm in GitHub Actions', 'Chart linting in CI', 'Package and publish charts', 'Deployment approval gates'],
    task: 'Build a pipeline that validates a chart before deploying it to a test cluster.',
  },
  {
    id: 17,
    title: 'Chart Repositories and OCI',
    level: 'Production',
    duration: '3 hours',
    topics: ['Chart repositories', 'Package charts', 'Publish and retrieve charts', 'OCI-based chart distribution', 'Artifact versioning'],
    task: 'Package a chart and practise publishing and retrieving it from an approved test registry.',
  },
  {
    id: 18,
    title: 'Helm Security and Best Practices',
    level: 'Production',
    duration: '3 hours',
    topics: ['Least-privilege Kubernetes RBAC', 'Image pinning', 'Resource requests and limits', 'Secret handling', 'Review rendered manifests'],
    task: 'Review a chart for risky permissions, exposed credentials and missing resource limits.',
  },
  {
    id: 19,
    title: 'Production Troubleshooting',
    level: 'Production',
    duration: '3 hours',
    topics: ['Pending Pods', 'ImagePullBackOff', 'Failed upgrades', 'Readiness probe failures', 'helm status and kubectl debugging'],
    task: 'Troubleshoot a failed test release and document the root cause and fix.',
  },
  {
    id: 20,
    title: 'Production Capstone and Interview Prep',
    level: 'Production',
    duration: '4 hours',
    topics: ['Reusable chart design', 'Environment-specific deployments', 'Release rollback strategy', 'CI/CD integration', 'Operational documentation'],
    task: 'Create a reusable chart and deploy it to a test environment through a validated pipeline.',
  },
];

const projects = [
  {
    title: 'Project 1 — Web Application Chart',
    level: 'Beginner',
    tools: 'Helm, Kubernetes',
    details: 'Create a reusable chart with a Deployment, Service and configurable replica count.',
  },
  {
    title: 'Project 2 — Multi-Environment Deployment',
    level: 'Intermediate',
    tools: 'Helm, Kubernetes, YAML',
    details: 'Use separate values files to configure development and staging environments.',
  },
  {
    title: 'Project 3 — Helm Upgrade and Rollback',
    level: 'Intermediate',
    tools: 'Helm, kubectl',
    details: 'Deploy an application, upgrade its version, inspect history and practise rollback.',
  },
  {
    title: 'Project 4 — CI/CD with Helm',
    level: 'Advanced',
    tools: 'Helm, Jenkins or GitHub Actions',
    details: 'Lint and validate charts in CI, then deploy to a test cluster through a controlled pipeline.',
  },
  {
    title: 'Project 5 — Production-Ready Chart',
    level: 'Advanced',
    tools: 'Helm, Kubernetes, OCI registry',
    details: 'Create a documented chart with configurable resources, probes, security settings and versioned distribution.',
  },
];

const interviewQuestions = [
  'What is Helm, and why is it used in Kubernetes?',
  'What is a Helm chart?',
  'What is the purpose of Chart.yaml and values.yaml?',
  'What is the difference between a chart and a release?',
  'How do you override values during installation?',
  'What does helm template do?',
  'What is the purpose of helm lint?',
  'How do helm install and helm upgrade differ?',
  'How do you roll back a Helm release?',
  'What are chart dependencies and subcharts?',
  'How do you manage environment-specific configuration?',
  'What are Helm hooks?',
  'How do you publish and distribute Helm charts?',
  'How do you integrate Helm into a CI/CD pipeline?',
  'How would you troubleshoot a failed Helm deployment?',
];

const levels: Array<'All' | Level> = [
  'All',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Production',
];

export default function HelmRoadmapPage() {
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
        <section className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-6 shadow-2xl sm:p-10">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative">
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
              DevOps Learning Roadmap
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
              Master <span className="text-cyan-400">Helm</span>
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              Learn Kubernetes package management, Helm charts, templates,
              environment configuration, release upgrades, rollback and
              production CI/CD deployment through hands-on tasks.
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
                  <p className="text-3xl font-black text-cyan-300">{value}</p>
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
                Mark each module complete after finishing its practical task.
              </p>
            </div>
            <span className="text-2xl font-black text-cyan-300">
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
              className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-teal-300 transition-all"
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
                Follow the roadmap from Helm basics to production deployments.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search modules or topics..."
                aria-label="Search modules"
                className="min-w-0 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none transition focus:border-cyan-400 sm:w-72"
              />

              <select
                value={level}
                onChange={(event) =>
                  setLevel(event.target.value as 'All' | Level)
                }
                aria-label="Filter by level"
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-cyan-400"
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
                            : 'bg-cyan-400/10 text-cyan-300'
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
                      <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                        Topics to Learn
                      </h3>

                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {module.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex items-start gap-2 text-sm leading-6 text-slate-300"
                          >
                            <span className="mt-0.5 text-cyan-400">•</span>
                            {topic}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 rounded-xl border border-cyan-400/15 bg-cyan-400/5 p-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
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
                  className="mt-4 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400"
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
                Practise Helm in realistic Kubernetes deployment scenarios.
              </span>
            </span>
            <span className="text-2xl text-cyan-300">
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
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
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
                Practise common Helm and Kubernetes interview questions.
              </span>
            </span>
            <span className="text-2xl text-cyan-300">
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
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-xs font-bold text-cyan-300">
                    {index + 1}
                  </span>
                  {question}
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="mt-8 rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-950/30 to-slate-900 p-6 sm:p-8">
          <h2 className="text-2xl font-black">
            Ready for Kubernetes Deployments?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Finish the modules, practise the projects and learn to validate
            rendered manifests before deployment. Use separate environment
            configurations, review security settings and test rollback
            procedures in a non-production cluster first.
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
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-400/50"
            >
              Reset Learning Progress
            </button>
            <button
              type="button"
              onClick={() => {
                setCompleted(modules.map((module) => module.id));
                setExpanded([]);
              }}
              className="rounded-xl bg-cyan-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-400"
            >
              Mark All Complete
            </button>
          </div>
        </section>

        <footer className="py-8 text-center text-xs text-slate-500">
          DevMavox · Helm Learning Roadmap · Package, Deploy, Upgrade
        </footer>
      </div>
    </main>
  );
}
