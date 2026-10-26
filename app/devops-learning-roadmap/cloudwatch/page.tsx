
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
    title: 'AWS CloudWatch Fundamentals',
    level: 'Beginner',
    duration: '1 hour',
    topics: ['What is Amazon CloudWatch?', 'Metrics, logs and alarms', 'AWS service integration', 'CloudWatch console', 'Monitoring use cases'],
    task: 'Identify the monitoring requirements for a sample AWS application.',
  },
  {
    id: 2,
    title: 'AWS IAM and CloudWatch Access',
    level: 'Beginner',
    duration: '1 hour',
    topics: ['IAM policies and roles', 'Read-only monitoring access', 'Least privilege', 'CloudWatch permissions', 'AccessDenied troubleshooting'],
    task: 'Design a read-only IAM policy approach for a monitoring team.',
  },
  {
    id: 3,
    title: 'CloudWatch Metrics',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['Metrics and namespaces', 'Dimensions', 'Timestamps and units', 'Metric statistics', 'Period and aggregation'],
    task: 'Explore EC2 CPU utilization and document its metric namespace and dimensions.',
  },
  {
    id: 4,
    title: 'EC2 Monitoring',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['Default EC2 metrics', 'CPU utilization', 'Network metrics', 'Status check metrics', 'Detailed monitoring'],
    task: 'Create a monitoring checklist for an EC2 instance.',
  },
  {
    id: 5,
    title: 'CloudWatch Dashboards',
    level: 'Beginner',
    duration: '2 hours',
    topics: ['Dashboard widgets', 'Metric graphs', 'Cross-service visibility', 'Dashboard variables', 'Operational dashboards'],
    task: 'Design a dashboard showing EC2 health, application latency and error rates.',
  },
  {
    id: 6,
    title: 'CloudWatch Alarms',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['Alarm states', 'Thresholds', 'Evaluation periods', 'Missing data handling', 'Composite alarms'],
    task: 'Design an alarm for sustained high CPU utilization and define its evaluation behavior.',
  },
  {
    id: 7,
    title: 'SNS Notifications and Alerting',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['Amazon SNS topics', 'Email subscriptions', 'Alarm actions', 'Notification permissions', 'Alert routing'],
    task: 'Plan an alarm notification workflow for an operations team.',
  },
  {
    id: 8,
    title: 'CloudWatch Logs Fundamentals',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['Log groups and streams', 'Log events', 'Retention settings', 'Log ingestion', 'Log permissions'],
    task: 'Design log groups and retention periods for an application and its services.',
  },
  {
    id: 9,
    title: 'CloudWatch Agent',
    level: 'Intermediate',
    duration: '2 hours',
    topics: ['Agent installation', 'Agent configuration', 'Memory and disk metrics', 'Log collection', 'Agent troubleshooting'],
    task: 'Prepare a CloudWatch Agent configuration plan for a Linux EC2 instance.',
  },
  {
    id: 10,
    title: 'CloudWatch Logs Insights',
    level: 'Intermediate',
    duration: '3 hours',
    topics: ['Query syntax', 'Filtering events', 'Parsing log messages', 'Aggregations', 'Finding application errors'],
    task: 'Write a Logs Insights query to count application errors by time interval.',
  },
  {
    id: 11,
    title: 'Custom Metrics and PutMetricData',
    level: 'Advanced',
    duration: '2 hours',
    topics: ['Custom namespaces', 'Publishing metrics', 'Dimensions and cardinality', 'Metric units', 'Custom application telemetry'],
    task: 'Design a custom metric for application request failures.',
  },
  {
    id: 12,
    title: 'CloudWatch Metric Math',
    level: 'Advanced',
    duration: '2 hours',
    topics: ['Metric expressions', 'Combining metrics', 'Error-rate calculations', 'Metric graphs', 'Alarm expressions'],
    task: 'Plan a metric expression for application error percentage using request and failure counts.',
  },
  {
    id: 13,
    title: 'CloudWatch Synthetics',
    level: 'Advanced',
    duration: '2 hours',
    topics: ['Synthetics canaries', 'Endpoint availability checks', 'Browser-based checks', 'Failure diagnostics', 'Canary schedules'],
    task: 'Design a synthetic check for a public application health endpoint.',
  },
  {
    id: 14,
    title: 'CloudWatch and Lambda',
    level: 'Advanced',
    duration: '2 hours',
    topics: ['Lambda metrics and logs', 'Invocation errors', 'Duration and throttles', 'Log troubleshooting', 'Alarm design'],
    task: 'Define alerts for Lambda errors, throttles and elevated execution duration.',
  },
  {
    id: 15,
    title: 'CloudWatch and EKS',
    level: 'Advanced',
    duration: '3 hours',
    topics: ['EKS control plane logs', 'Container Insights', 'Node and Pod visibility', 'Workload troubleshooting', 'CloudWatch integration'],
    task: 'Design a monitoring plan for EKS nodes, Pods and application logs.',
  },
  {
    id: 16,
    title: 'CloudWatch with CI/CD',
    level: 'Production',
    duration: '2 hours',
    topics: ['Deployment monitoring', 'Release health checks', 'Alarm-based rollback concepts', 'Pipeline notifications', 'Change correlation'],
    task: 'Define post-deployment checks that evaluate application errors and latency.',
  },
  {
    id: 17,
    title: 'EventBridge and Automated Responses',
    level: 'Production',
    duration: '3 hours',
    topics: ['CloudWatch alarm events', 'Amazon EventBridge rules', 'Lambda targets', 'Automated response design', 'Safe remediation'],
    task: 'Design a controlled response workflow for a recurring non-production alert.',
  },
  {
    id: 18,
    title: 'Monitoring Security and Cost',
    level: 'Production',
    duration: '2 hours',
    topics: ['Log retention and access', 'Sensitive-data redaction', 'Metric cardinality', 'Log ingestion cost', 'Monitoring budgets'],
    task: 'Create a monitoring cost review covering log volume, retention and unnecessary metrics.',
  },
  {
    id: 19,
    title: 'Production Troubleshooting',
    level: 'Production',
    duration: '3 hours',
    topics: ['Missing metrics', 'Missing log events', 'Incorrect alarm state', 'Agent failures', 'Notification delivery issues'],
    task: 'Write a troubleshooting runbook for an alarm that triggers without an expected notification.',
  },
  {
    id: 20,
    title: 'Production Monitoring Capstone',
    level: 'Production',
    duration: '4 hours',
    topics: ['Service-level indicators', 'Dashboards and alarms', 'Logs and metrics correlation', 'Incident response', 'Monitoring review'],
    task: 'Design an end-to-end monitoring solution for a sample AWS-hosted application.',
  },
];

const projects = [
  {
    title: 'Project 1 — EC2 Monitoring Dashboard',
    level: 'Beginner',
    tools: 'EC2, CloudWatch Metrics',
    details: 'Build a dashboard plan for instance health, CPU and network activity.',
  },
  {
    title: 'Project 2 — Alarm and Notification System',
    level: 'Intermediate',
    tools: 'CloudWatch Alarms, SNS',
    details: 'Design threshold alarms and a notification workflow for operations.',
  },
  {
    title: 'Project 3 — Application Log Analysis',
    level: 'Intermediate',
    tools: 'CloudWatch Logs, Logs Insights',
    details: 'Search application logs, identify errors and summarize recurring failures.',
  },
  {
    title: 'Project 4 — EKS Observability',
    level: 'Advanced',
    tools: 'EKS, CloudWatch, Container Insights',
    details: 'Plan monitoring for cluster health, workloads and application logs.',
  },
  {
    title: 'Project 5 — Automated Monitoring Response',
    level: 'Production',
    tools: 'CloudWatch, EventBridge, Lambda, SNS',
    details: 'Design a guarded event-driven response with logging and failure handling.',
  },
];

const interviewQuestions = [
  'What is Amazon CloudWatch?',
  'What is the difference between a metric, a log and an alarm?',
  'What is a CloudWatch namespace?',
  'How do CloudWatch alarm states work?',
  'What is the difference between standard and detailed EC2 monitoring?',
  'How do you collect memory and disk metrics from EC2?',
  'What are CloudWatch Logs Insights?',
  'How do you configure log retention?',
  'What is the purpose of Amazon SNS in alerting?',
  'What are custom metrics and dimensions?',
  'What is CloudWatch metric math?',
  'How can CloudWatch monitor an EKS cluster?',
  'How do EventBridge and Lambda support automated responses?',
  'How do you troubleshoot missing CloudWatch metrics?',
  'How can you reduce CloudWatch monitoring costs?',
];

const levels: Array<'All' | Level> = [
  'All',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Production',
];

export default function CloudWatchRoadmapPage() {
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
        <section className="relative overflow-hidden rounded-3xl border border-sky-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 p-6 shadow-2xl sm:p-10">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="relative">
            <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
              DevOps Learning Roadmap
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">
              Master <span className="text-sky-400">AWS CloudWatch</span>
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              Learn AWS monitoring, metrics, logs, dashboards, alarms,
              Logs Insights, custom metrics, automated responses and production
              observability.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ['20', 'Learning Modules'],
                ['5', 'Practical Projects'],
                ['15', 'Interview Questions'],
                ['4', 'Learning Levels'],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-3xl font-black text-sky-300">{value}</p>
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
                Mark a module complete after learning its topics and task.
              </p>
            </div>
            <span className="text-2xl font-black text-sky-300">
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
              className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-300 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-slate-500">
            {completed.length} of {modules.length} modules completed.
            Progress is held only in the current page session.
          </p>
        </section>

        <section className="mt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-black sm:text-3xl">
                Learning Modules
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Progress from monitoring basics to production observability.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search modules or topics..."
                aria-label="Search modules"
                className="min-w-0 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none transition focus:border-sky-400 sm:w-72"
              />

              <select
                value={level}
                onChange={(event) =>
                  setLevel(event.target.value as 'All' | Level)
                }
                aria-label="Filter by level"
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-sky-400"
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
                            : 'bg-sky-400/10 text-sky-300'
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
                      <h3 className="text-sm font-bold uppercase tracking-wider text-sky-300">
                        Topics to Learn
                      </h3>

                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {module.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex items-start gap-2 text-sm leading-6 text-slate-300"
                          >
                            <span className="mt-0.5 text-sky-400">•</span>
                            {topic}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 rounded-xl border border-sky-400/15 bg-sky-400/5 p-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-sky-300">
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
                  className="mt-4 rounded-xl bg-sky-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-sky-400"
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
              <span className="block text-2xl font-black">Practical Projects</span>
              <span className="mt-1 block text-sm text-slate-400">
                Apply CloudWatch to real-world monitoring scenarios.
              </span>
            </span>
            <span className="text-2xl text-sky-300">
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
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
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
                Practise common AWS monitoring and troubleshooting questions.
              </span>
            </span>
            <span className="text-2xl text-sky-300">
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
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-400/10 text-xs font-bold text-sky-300">
                    {index + 1}
                  </span>
                  {question}
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="mt-8 rounded-2xl border border-sky-400/20 bg-gradient-to-r from-sky-950/30 to-slate-900 p-6 sm:p-8">
          <h2 className="text-2xl font-black">
            Ready for Production Monitoring?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Practise metrics, logs, alarms and incident response. Review AWS
            pricing before enabling paid monitoring features, increasing log
            ingestion or retaining large volumes of data.
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
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-sky-400/50"
            >
              Reset Learning Progress
            </button>
            <button
              type="button"
              onClick={() => {
                setCompleted(modules.map((module) => module.id));
                setExpanded([]);
              }}
              className="rounded-xl bg-sky-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-400"
            >
              Mark All Complete
            </button>
          </div>
        </section>

        <footer className="py-8 text-center text-xs text-slate-500">
          DevMavox · AWS CloudWatch Learning Roadmap · Monitor, Alert, Improve
        </footer>
      </div>
    </main>
  );
}
