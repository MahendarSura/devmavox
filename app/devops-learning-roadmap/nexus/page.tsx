
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
    title: 'Nexus Repository Fundamentals',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['What is Nexus Repository Manager?', 'Artifact repository concepts', 'Why DevOps teams use Nexus', 'Maven Central vs private repositories', 'Nexus in CI/CD architecture'],
    task: 'Draw a CI/CD flow showing how a build downloads and publishes artifacts through Nexus.',
  },
  {
    id: 2,
    title: 'Installation and Initial Setup',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['Nexus installation options', 'Run Nexus using Docker', 'Persistent data storage', 'Web UI access', 'Initial administrator setup'],
    task: 'Run a test Nexus instance and log in using the documented initial setup process.',
  },
  {
    id: 3,
    title: 'Repository Types',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['Hosted repositories', 'Proxy repositories', 'Group repositories', 'Repository formats', 'Choosing the right repository type'],
    task: 'Explain when to use hosted, proxy and group repositories.',
  },
  {
    id: 4,
    title: 'Repository Configuration',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['Create repositories', 'Repository names and formats', 'Storage configuration', 'Repository policies', 'Configure Maven repositories'],
    task: 'Create a test hosted Maven repository and a separate proxy repository.',
  },
  {
    id: 5,
    title: 'Maven Integration',
    level: 'Intermediate',
    duration: '3 hours',
    topics: ['Maven settings.xml', 'pom.xml repository configuration', 'Download dependencies', 'Deploy build artifacts', 'Snapshot and release versions'],
    task: 'Configure a sample Maven project to publish a test artifact to Nexus.',
  },
  {
    id: 6,
    title: 'Credentials and Access',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['User accounts', 'Roles and privileges', 'Repository-specific permissions', 'Maven server credentials', 'Least-privilege access'],
    task: 'Create a restricted test account and verify only the intended repository access.',
  },
  {
    id: 7,
    title: 'Proxy Repository and Caching',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['Proxy external registries', 'Dependency caching', 'Remote repository URLs', 'Offline build benefits', 'Proxy troubleshooting'],
    task: 'Configure a Maven proxy and verify dependency retrieval in a test project.',
  },
  {
    id: 8,
    title: 'Group Repositories',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['Combine multiple repositories', 'Repository member ordering', 'Simplify client configuration', 'Hosted and proxy members', 'Troubleshoot missing artifacts'],
    task: 'Create a Maven group repository and configure a sample client to use it.',
  },
  {
    id: 9,
    title: 'Docker Registry in Nexus',
    level: 'Intermediate',
    duration: '3 hours',
    topics: ['Docker hosted repository', 'Docker proxy repository', 'Docker group repository', 'Registry ports and connectors', 'Image push and pull'],
    task: 'Publish and retrieve a sample container image from a test Nexus Docker registry.',
  },
  {
    id: 10,
    title: 'npm and Other Package Formats',
    level: 'Intermediate',
    duration: '3 hours',
    topics: ['npm registry basics', 'npm hosted and proxy repositories', 'Client configuration', 'Package publishing', 'Repository format selection'],
    task: 'Configure a test npm project to retrieve dependencies from an approved Nexus repository.',
  },
  {
    id: 11,
    title: 'Jenkins CI/CD Integration',
    level: 'Advanced',
    duration: '3 hours',
    topics: ['Jenkins credentials', 'Maven build stages', 'Publish artifacts', 'Versioning strategy', 'Build failure troubleshooting'],
    task: 'Create a test Jenkins pipeline that builds a Maven application and publishes its artifact to Nexus.',
  },
  {
    id: 12,
    title: 'GitHub Actions Integration',
    level: 'Advanced',
    duration: '3 hours',
    topics: ['Workflow secrets', 'Maven settings generation', 'Package publishing', 'Dependency retrieval', 'Secure workflow permissions'],
    task: 'Design a GitHub Actions workflow that publishes a test package using protected credentials.',
  },
  {
    id: 13,
    title: 'Artifact Versioning and Releases',
    level: 'Advanced',
    duration: '2 hours',
    topics: ['Snapshot vs release versions', 'Semantic versioning', 'Release promotion', 'Immutable release practices', 'Traceable build metadata'],
    task: 'Define a versioning policy for development snapshots and stable releases.',
  },
  {
    id: 14,
    title: 'Cleanup and Storage Management',
    level: 'Advanced',
    duration: '3 hours',
    topics: ['Cleanup policies', 'Component retention', 'Blob stores', 'Storage usage monitoring', 'Safe cleanup planning'],
    task: 'Create a cleanup policy for disposable test artifacts and review its effect before execution.',
  },
  {
    id: 15,
    title: 'High Availability and Backup',
    level: 'Production',
    duration: '3 hours',
    topics: ['Backup strategy', 'Blob storage considerations', 'Configuration backup', 'Restore testing', 'Recovery objectives'],
    task: 'Document a backup and restore plan for a non-production Nexus instance.',
  },
  {
    id: 16,
    title: 'Security and Supply Chain',
    level: 'Production',
    duration: '3 hours',
    topics: ['Repository access controls', 'Transport security', 'Secret management', 'Dependency governance', 'Audit and access review'],
    task: 'Review a test repository configuration and document security improvements.',
  },
  {
    id: 17,
    title: 'Helm and Kubernetes Artifacts',
    level: 'Advanced',
    duration: '3 hours',
    topics: ['Helm chart repository concepts', 'Chart publishing', 'Chart retrieval', 'OCI artifact concepts', 'Kubernetes delivery workflows'],
    task: 'Document a supported chart or OCI artifact publishing workflow for your Nexus version.',
  },
  {
    id: 18,
    title: 'Monitoring and Troubleshooting',
    level: 'Production',
    duration: '3 hours',
    topics: ['Application logs', 'Disk space issues', 'Authentication errors', 'Missing artifacts', 'Repository connectivity failures'],
    task: 'Investigate a simulated dependency download failure and document the root cause.',
  },
  {
    id: 19,
    title: 'Production Administration',
    level: 'Production',
    duration: '3 hours',
    topics: ['Operational checks', 'Repository naming standards', 'Access reviews', 'Upgrade planning', 'Change management'],
    task: 'Prepare an operational checklist for a team-managed artifact repository.',
  },
  {
    id: 20,
    title: 'Capstone and Interview Preparation',
    level: 'Production',
    duration: '4 hours',
    topics: ['End-to-end artifact lifecycle', 'Jenkins or GitHub Actions integration', 'Artifact promotion', 'Security controls', 'Incident scenarios'],
    task: 'Build a documented sample CI/CD flow that stores and retrieves versioned artifacts through Nexus.',
  },
];

const projects = [
  {
    title: 'Project 1 — Private Maven Repository',
    level: 'Beginner',
    tools: 'Nexus, Maven, Java',
    details: 'Create a private Maven repository and publish a sample application artifact.',
  },
  {
    title: 'Project 2 — Dependency Proxy',
    level: 'Intermediate',
    tools: 'Nexus, Maven',
    details: 'Configure a proxy and group repository to simplify dependency retrieval.',
  },
  {
    title: 'Project 3 — Docker Registry',
    level: 'Intermediate',
    tools: 'Nexus, Docker',
    details: 'Push and pull a sample image through a test Nexus Docker registry.',
  },
  {
    title: 'Project 4 — Jenkins Artifact Pipeline',
    level: 'Advanced',
    tools: 'Jenkins, Maven, Nexus',
    details: 'Build an application, run tests and publish a versioned artifact.',
  },
  {
    title: 'Project 5 — Secure Artifact Lifecycle',
    level: 'Advanced',
    tools: 'Nexus, GitHub Actions or Jenkins',
    details: 'Design repository permissions, release versioning, retention and backup procedures.',
  },
];

const interviewQuestions = [
  'What is Nexus Repository Manager?',
  'What is an artifact repository?',
  'What is the difference between hosted, proxy and group repositories?',
  'How does Nexus integrate with Maven?',
  'What is the difference between snapshot and release artifacts?',
  'How do you publish a Maven artifact to Nexus?',
  'How do you configure a Docker repository in Nexus?',
  'How can Nexus reduce external dependency downloads?',
  'How do you configure user roles and repository privileges?',
  'How do you integrate Nexus with Jenkins?',
  'How can GitHub Actions publish artifacts securely?',
  'What are blob stores?',
  'How do cleanup policies work?',
  'How would you troubleshoot an artifact download failure?',
  'What should be included in a Nexus backup and recovery plan?',
];

const levels: Array<'All' | Level> = [
  'All',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Production',
];

export default function NexusRoadmapPage() {
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
        <section className="relative overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/50 p-6 shadow-2xl sm:p-10">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative">
            <span className="inline-flex rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">
              DevOps Learning Roadmap
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
              Master <span className="text-indigo-400">Nexus</span>
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              Learn artifact management, private repositories, Maven and Docker
              integration, CI/CD publishing, versioning, security and production
              repository administration through practical tasks.
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
                  <p className="text-3xl font-black text-indigo-300">{value}</p>
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
                Mark a module complete after finishing its practical task.
              </p>
            </div>
            <span className="text-2xl font-black text-indigo-300">
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
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-300 transition-all"
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
                Start with repository fundamentals and progress to production.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search modules or topics..."
                aria-label="Search modules"
                className="min-w-0 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 sm:w-72"
              />

              <select
                value={level}
                onChange={(event) =>
                  setLevel(event.target.value as 'All' | Level)
                }
                aria-label="Filter by level"
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-indigo-400"
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
                            : 'bg-indigo-400/10 text-indigo-300'
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
                      <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-300">
                        Topics to Learn
                      </h3>

                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {module.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex items-start gap-2 text-sm leading-6 text-slate-300"
                          >
                            <span className="mt-0.5 text-indigo-400">•</span>
                            {topic}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 rounded-xl border border-indigo-400/15 bg-indigo-400/5 p-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-indigo-300">
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
                  className="mt-4 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-indigo-400"
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
                Practise artifact management in realistic CI/CD scenarios.
              </span>
            </span>
            <span className="text-2xl text-indigo-300">
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
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
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
                Practise common Nexus administration questions.
              </span>
            </span>
            <span className="text-2xl text-indigo-300">
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
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-400/10 text-xs font-bold text-indigo-300">
                    {index + 1}
                  </span>
                  {question}
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="mt-8 rounded-2xl border border-indigo-400/20 bg-gradient-to-r from-indigo-950/40 to-slate-900 p-6 sm:p-8">
          <h2 className="text-2xl font-black">
            Ready to Manage Build Artifacts?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Complete the modules and projects. Practise publishing, retrieving
            and versioning artifacts. Validate permissions, backup procedures
            and repository configuration before using them in production.
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
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-indigo-400/50"
            >
              Reset Learning Progress
            </button>
            <button
              type="button"
              onClick={() => {
                setCompleted(modules.map((module) => module.id));
                setExpanded([]);
              }}
              className="rounded-xl bg-indigo-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-indigo-400"
            >
              Mark All Complete
            </button>
          </div>
        </section>

        <footer className="py-8 text-center text-xs text-slate-500">
          DevMavox · Nexus Learning Roadmap · Store, Version, Deliver
        </footer>
      </div>
    </main>
  );
}
