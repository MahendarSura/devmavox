
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
    title: 'Grafana Fundamentals',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['What is Grafana?', 'Grafana architecture', 'Use cases in DevOps', 'Grafana vs Prometheus', 'Dashboard and panel concepts'],
    task: 'Explain how Grafana helps an SRE monitor a production application.',
  },
  {
    id: 2,
    title: 'Installation and Setup',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['Install Grafana on Linux', 'Run Grafana using Docker', 'Understand default port 3000', 'Initial admin setup', 'Configuration files and logs'],
    task: 'Run Grafana locally and open its web interface.',
  },
  {
    id: 3,
    title: 'Grafana UI Navigation',
    level: 'Beginner',
    duration: '1 hour',
    topics: ['Home page', 'Connections menu', 'Dashboards menu', 'Explore view', 'Administration and users'],
    task: 'Explore the UI and identify where data sources and dashboards are managed.',
  },
  {
    id: 4,
    title: 'Data Sources',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['What is a data source?', 'Add Prometheus', 'Configure the endpoint URL', 'Test connectivity', 'Troubleshoot connection failures'],
    task: 'Connect Grafana to a running Prometheus server.',
  },
  {
    id: 5,
    title: 'PromQL in Grafana',
    level: 'Intermediate',
    duration: '3 hours',
    topics: ['Write PromQL queries', 'CPU and memory metrics', 'Request rate queries', 'Error-rate queries', 'Query editor and labels'],
    task: 'Create queries for CPU usage, memory usage and HTTP request rate.',
  },
  {
    id: 6,
    title: 'Build Your First Dashboard',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['Create a dashboard', 'Add a panel', 'Select a data source', 'Choose visualization', 'Save and organize dashboards'],
    task: 'Build a dashboard with CPU, memory and request-rate panels.',
  },
  {
    id: 7,
    title: 'Panels and Visualizations',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['Time series', 'Stat panels', 'Gauge panels', 'Bar charts and tables', 'Panel options and field configuration'],
    task: 'Show CPU utilization as a time series and current utilization as a gauge.',
  },
  {
    id: 8,
    title: 'Variables and Templates',
    level: 'Intermediate',
    duration: '3 hours',
    topics: ['Dashboard variables', 'Query variables', 'Label-based filtering', 'Environment selection', 'Reusable dashboards'],
    task: 'Create a dashboard variable to switch between development and production.',
  },
  {
    id: 9,
    title: 'Dashboard Design',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['Panel layout', 'Rows and sections', 'Units and thresholds', 'Legends and tooltips', 'Readable dashboard design'],
    task: 'Design a dashboard that an on-call engineer can understand quickly.',
  },
  {
    id: 10,
    title: 'Time Ranges and Transformations',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['Relative time ranges', 'Refresh intervals', 'Query transformations', 'Organize fields', 'Reduce and filter data'],
    task: 'Create a dashboard with a useful time range and automatic refresh.',
  },
  {
    id: 11,
    title: 'Alerting Fundamentals',
    level: 'Intermediate',
    duration: '3 hours',
    topics: ['Alert rules', 'Query conditions', 'Evaluation intervals', 'Pending periods', 'Alert state and labels'],
    task: 'Create an alert rule for sustained high CPU usage.',
  },
  {
    id: 12,
    title: 'Contact Points and Notifications',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['Contact points', 'Email notifications', 'Notification policies', 'Grouping alerts', 'Test notification delivery'],
    task: 'Configure a test notification channel and verify delivery.',
  },
  {
    id: 13,
    title: 'Alert Troubleshooting',
    level: 'Advanced',
    duration: '2 hours',
    topics: ['No data state', 'Datasource errors', 'Incorrect query results', 'Notification failures', 'Avoid noisy alerts'],
    task: 'Troubleshoot an alert that remains in No Data state.',
  },
  {
    id: 14,
    title: 'Linux and Infrastructure Monitoring',
    level: 'Advanced',
    duration: '3 hours',
    topics: ['Node Exporter metrics', 'CPU and load', 'Memory and swap', 'Disk capacity', 'Network traffic'],
    task: 'Create a Linux server dashboard using Prometheus and Node Exporter.',
  },
  {
    id: 15,
    title: 'Docker Monitoring',
    level: 'Advanced',
    duration: '3 hours',
    topics: ['Container metrics', 'CPU and memory limits', 'Restart monitoring', 'Container availability', 'Service-level dashboards'],
    task: 'Build a dashboard for container resource usage and availability.',
  },
  {
    id: 16,
    title: 'Kubernetes Monitoring',
    level: 'Advanced',
    duration: '4 hours',
    topics: ['Cluster overview', 'Node and pod metrics', 'Namespace filtering', 'Workload health', 'Capacity and resource dashboards'],
    task: 'Design a Kubernetes dashboard that highlights unhealthy workloads.',
  },
  {
    id: 17,
    title: 'Dashboard Provisioning',
    level: 'Production',
    duration: '3 hours',
    topics: ['Provisioning concepts', 'Datasource provisioning', 'Dashboard JSON', 'Version-controlled dashboards', 'Repeatable configuration'],
    task: 'Store a dashboard definition in Git and provision it in a test environment.',
  },
  {
    id: 18,
    title: 'Users, Roles and Security',
    level: 'Production',
    duration: '3 hours',
    topics: ['Organizations and teams', 'Viewer and editor access', 'Least privilege', 'Authentication options', 'Secrets and secure configuration'],
    task: 'Design role-based access for developers, operators and administrators.',
  },
  {
    id: 19,
    title: 'Production Troubleshooting',
    level: 'Production',
    duration: '3 hours',
    topics: ['Slow dashboard loading', 'High-cardinality queries', 'Datasource timeouts', 'Missing metrics', 'Grafana logs and service health'],
    task: 'Investigate a slow dashboard and document the root cause.',
  },
  {
    id: 20,
    title: 'Production Capstone and Interview Prep',
    level: 'Production',
    duration: '4 hours',
    topics: ['End-to-end monitoring design', 'SLO and error-rate dashboards', 'Alert strategy', 'Operational documentation', 'Interview questions and scenarios'],
    task: 'Build and document a monitoring solution for a sample production application.',
  },
];

const projects = [
  {
    title: 'Project 1 — Linux Server Dashboard',
    difficulty: 'Beginner',
    tools: 'Grafana, Prometheus, Node Exporter',
    details: 'Monitor CPU, memory, disk usage, network traffic and server availability.',
  },
  {
    title: 'Project 2 — Docker Monitoring',
    difficulty: 'Intermediate',
    tools: 'Grafana, Prometheus, Docker',
    details: 'Visualize container resource consumption and identify unhealthy containers.',
  },
  {
    title: 'Project 3 — Application Monitoring',
    difficulty: 'Intermediate',
    tools: 'Grafana, Prometheus, application metrics',
    details: 'Track request rate, error rate, latency and application availability.',
  },
  {
    title: 'Project 4 — Kubernetes Observability',
    difficulty: 'Advanced',
    tools: 'Grafana, Prometheus, Kubernetes',
    details: 'Create cluster, node, namespace and workload dashboards.',
  },
  {
    title: 'Project 5 — Production Alerting',
    difficulty: 'Advanced',
    tools: 'Grafana Alerting, Prometheus',
    details: 'Configure actionable alerts and test notification delivery for key service failures.',
  },
];

const interviewQuestions = [
  'What is Grafana, and why is it used in DevOps?',
  'What is the difference between Grafana and Prometheus?',
  'What is a Grafana data source?',
  'How do you connect Grafana to Prometheus?',
  'What is a dashboard panel?',
  'What is a dashboard variable?',
  'What is PromQL?',
  'How do you troubleshoot a No Data panel?',
  'What is the difference between a time series and a Stat panel?',
  'How does Grafana alerting work?',
  'What are contact points and notification policies?',
  'How do you monitor Linux servers using Grafana?',
  'How do you monitor Kubernetes workloads?',
  'How can dashboards be stored and version-controlled?',
  'How do you secure Grafana in production?',
];

const levels: Array<'All' | Level> = [
  'All',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Production',
];

export default function GrafanaRoadmapPage() {
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
        <section className="relative overflow-hidden rounded-3xl border border-orange-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/40 p-6 shadow-2xl sm:p-10">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative">
            <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
              DevOps Learning Roadmap
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
              Master <span className="text-orange-400">Grafana</span>
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              Learn monitoring dashboards, Prometheus integration, alerting,
              Linux and Kubernetes observability, and production troubleshooting
              through a structured, hands-on roadmap.
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
                  <p className="text-3xl font-black text-orange-300">
                    {value}
                  </p>
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
                Mark a module complete after finishing its learning task.
              </p>
            </div>
            <span className="text-2xl font-black text-orange-300">
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
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-300 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-slate-500">
            {completed.length} of {modules.length} modules completed. Progress
            is held in the current page session and is not saved permanently.
          </p>
        </section>

        <section className="mt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-black sm:text-3xl">
                Learning Modules
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Follow the modules in order, from fundamentals to production.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search modules or topics..."
                aria-label="Search modules"
                className="min-w-0 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none transition focus:border-orange-400 sm:w-72"
              />

              <select
                value={level}
                onChange={(event) =>
                  setLevel(event.target.value as 'All' | Level)
                }
                aria-label="Filter by level"
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-orange-400"
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
                            : 'bg-orange-400/10 text-orange-300'
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
                      <h3 className="text-sm font-bold uppercase tracking-wider text-orange-300">
                        Topics to Learn
                      </h3>

                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {module.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex items-start gap-2 text-sm leading-6 text-slate-300"
                          >
                            <span className="mt-0.5 text-orange-400">•</span>
                            {topic}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 rounded-xl border border-orange-400/15 bg-orange-400/5 p-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-orange-300">
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
                  className="mt-4 rounded-xl bg-orange-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-orange-400"
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
              <span className="block text-2xl font-black">
                Real-World Projects
              </span>
              <span className="mt-1 block text-sm text-slate-400">
                Apply Grafana skills to realistic monitoring scenarios.
              </span>
            </span>
            <span className="text-2xl text-orange-300">
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
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-300">
                    {project.difficulty}
                  </span>
                  <h3 className="mt-3 font-bold leading-6">
                    {project.title}
                  </h3>
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
                Practice common Grafana interview questions.
              </span>
            </span>
            <span className="text-2xl text-orange-300">
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
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-400/10 text-xs font-bold text-orange-300">
                    {index + 1}
                  </span>
                  {question}
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="mt-8 rounded-2xl border border-orange-400/20 bg-gradient-to-r from-orange-950/30 to-slate-900 p-6 sm:p-8">
          <h2 className="text-2xl font-black">
            Ready for Production Monitoring?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Complete the modules, build the five projects, practise alert
            troubleshooting, and explain your dashboard design decisions.
            Learn how Grafana and Prometheus work together rather than treating
            dashboards as isolated charts.
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
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-orange-400/50"
            >
              Reset Learning Progress
            </button>
            <button
              type="button"
              onClick={() => {
                setCompleted(modules.map((module) => module.id));
                setExpanded([]);
              }}
              className="rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-orange-400"
            >
              Mark All Complete
            </button>
          </div>
        </section>

        <footer className="py-8 text-center text-xs text-slate-500">
          DevMavox · Grafana Learning Roadmap · Learn, Build, Monitor, Improve
        </footer>
      </div>
    </main>
  );
}
