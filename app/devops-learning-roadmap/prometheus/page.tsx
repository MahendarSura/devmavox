
'use client';

import { useMemo, useState } from 'react';

type Module = {
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Production';
  duration: string;
  topics: string[];
  outcome: string;
};

const modules: Module[] = [
  {
    title: 'Monitoring Fundamentals',
    level: 'Beginner',
    duration: '1 day',
    topics: [
      'What is monitoring and why DevOps teams need it',
      'Metrics vs logs vs traces',
      'Availability, latency, traffic, errors and saturation',
      'Monitoring vs observability',
      'Infrastructure, application and business metrics',
    ],
    outcome: 'Understand monitoring fundamentals and identify useful metrics.',
  },
  {
    title: 'Prometheus Architecture',
    level: 'Beginner',
    duration: '1 day',
    topics: [
      'Prometheus server and its major components',
      'Time-series database and metric samples',
      'Scraping targets and service discovery',
      'Exporters, instrumentation and client libraries',
      'Pull-based monitoring architecture',
    ],
    outcome: 'Explain how Prometheus collects, stores and exposes metrics.',
  },
  {
    title: 'Installation and First Monitoring Setup',
    level: 'Beginner',
    duration: '1–2 days',
    topics: [
      'Install Prometheus on Linux or run it using a container',
      'Understand prometheus.yml configuration',
      'Configure scrape intervals and evaluation intervals',
      'Open the Prometheus web interface',
      'Verify targets and inspect initial metrics',
    ],
    outcome: 'Run Prometheus and monitor a first target successfully.',
  },
  {
    title: 'Metrics and Prometheus Data Model',
    level: 'Beginner',
    duration: '1–2 days',
    topics: [
      'Understand metric names, labels and samples',
      'Counter, gauge, histogram and summary metrics',
      'Labels and time-series cardinality',
      'Metric naming and labeling conventions',
      'Avoid unbounded labels such as request IDs',
    ],
    outcome: 'Choose suitable metric types and design useful time series.',
  },
  {
    title: 'PromQL Fundamentals',
    level: 'Beginner',
    duration: '2 days',
    topics: [
      'Select metrics using instant vector selectors',
      'Filter series using label matchers',
      'Use range vectors and time ranges',
      'Apply arithmetic and comparison operators',
      'Understand aggregation with sum, avg, min and max',
      'Use rate and increase for counters',
    ],
    outcome: 'Write PromQL queries for common monitoring questions.',
  },
  {
    title: 'Advanced PromQL and Query Analysis',
    level: 'Intermediate',
    duration: '2–3 days',
    topics: [
      'Use rate, irate, increase and resets appropriately',
      'Calculate request rates and error ratios',
      'Analyze latency histograms with histogram_quantile',
      'Use grouping and aggregation operators',
      'Understand vector matching and join-style operations',
      'Use absent and other functions to detect missing metrics',
      'Recognize expensive queries and high-cardinality problems',
    ],
    outcome: 'Build useful service-level queries and investigate metric patterns.',
  },
  {
    title: 'Node Exporter and Linux Monitoring',
    level: 'Intermediate',
    duration: '1–2 days',
    topics: [
      'Install and configure Node Exporter',
      'Monitor CPU utilization, load and memory',
      'Monitor filesystem capacity and disk utilization',
      'Monitor network traffic and errors',
      'Understand node exporter collectors',
      'Troubleshoot unreachable targets and missing metrics',
    ],
    outcome: 'Monitor Linux servers using standard infrastructure metrics.',
  },
  {
    title: 'Application and Custom Metrics',
    level: 'Intermediate',
    duration: '2 days',
    topics: [
      'Instrument applications with Prometheus client libraries',
      'Expose metrics through an application metrics endpoint',
      'Understand request counters and latency histograms',
      'Monitor application-specific gauges and counters',
      'Use labels carefully and control cardinality',
      'Validate metric output and scrape configuration',
    ],
    outcome: 'Expose application metrics that help diagnose real incidents.',
  },
  {
    title: 'Service Discovery and Scrape Configuration',
    level: 'Intermediate',
    duration: '2 days',
    topics: [
      'Configure static_configs and target labels',
      'Understand file-based service discovery',
      'Explore cloud and orchestrator discovery concepts',
      'Use relabel_configs and metric_relabel_configs',
      'Configure scrape authentication and TLS where supported',
      'Organize targets across environments',
    ],
    outcome: 'Manage changing monitoring targets with maintainable configuration.',
  },
  {
    title: 'Recording Rules and Alerting Rules',
    level: 'Intermediate',
    duration: '2 days',
    topics: [
      'Create recording rules for reusable queries',
      'Define alerting rules using PromQL',
      'Configure pending periods and alert labels',
      'Use annotations to explain alert meaning and response',
      'Validate rules with promtool',
      'Avoid noisy alerts and duplicate notifications',
    ],
    outcome: 'Create reliable alerts and reusable expressions for dashboards.',
  },
  {
    title: 'Alertmanager and Notification Routing',
    level: 'Intermediate',
    duration: '2 days',
    topics: [
      'Understand Prometheus-to-Alertmanager flow',
      'Configure receivers and routing trees',
      'Group, inhibit and silence alerts',
      'Route alerts by severity, service and environment',
      'Integrate supported email or chat notification receivers',
      'Protect notification credentials and test delivery',
    ],
    outcome: 'Route meaningful alerts to the appropriate responders.',
  },
  {
    title: 'Grafana Dashboards with Prometheus',
    level: 'Intermediate',
    duration: '2 days',
    topics: [
      'Add Prometheus as a Grafana data source',
      'Build panels using PromQL',
      'Choose appropriate visualizations and units',
      'Create dashboard variables and reusable views',
      'Display CPU, memory, disk, request rate and latency',
      'Set dashboard time ranges and refresh intervals',
    ],
    outcome: 'Build operational dashboards for infrastructure and applications.',
  },
  {
    title: 'Kubernetes Monitoring',
    level: 'Advanced',
    duration: '3 days',
    topics: [
      'Understand Kubernetes metrics collection architecture',
      'Monitor nodes, pods, containers and namespaces',
      'Understand kube-state-metrics and its role',
      'Monitor resource requests, limits and utilization',
      'Use Prometheus Operator concepts and custom resources',
      'Configure service monitors and pod monitors where supported',
      'Investigate missing targets and scrape failures',
    ],
    outcome: 'Understand how Prometheus-based monitoring works in Kubernetes.',
  },
  {
    title: 'Prometheus Operator and Helm',
    level: 'Advanced',
    duration: '2–3 days',
    topics: [
      'Understand the Prometheus Operator architecture',
      'Deploy a monitoring stack using a maintained Helm chart',
      'Configure scrape targets, rules and alert routing',
      'Understand ServiceMonitor and PodMonitor selectors',
      'Manage configuration through version control',
      'Plan chart upgrades and validate generated resources',
    ],
    outcome: 'Deploy and maintain a Kubernetes monitoring stack reproducibly.',
  },
  {
    title: 'SLOs, SLIs and Error Budgets',
    level: 'Advanced',
    duration: '2 days',
    topics: [
      'Define service-level indicators and objectives',
      'Calculate availability and request success ratios',
      'Understand latency objectives and histogram limitations',
      'Estimate error budget consumption',
      'Use burn-rate alerting concepts',
      'Connect monitoring signals to incident response',
    ],
    outcome: 'Use metrics to reason about service reliability and user impact.',
  },
  {
    title: 'Security and Access Control',
    level: 'Advanced',
    duration: '1–2 days',
    topics: [
      'Restrict network access to Prometheus endpoints',
      'Understand reverse proxy authentication options',
      'Configure TLS and authentication at suitable boundaries',
      'Protect credentials used by scrape targets',
      'Limit access to configuration and administrative endpoints',
      'Apply least privilege to monitoring infrastructure',
    ],
    outcome: 'Reduce exposure of monitoring systems and sensitive telemetry.',
  },
  {
    title: 'Storage, Retention and Performance',
    level: 'Advanced',
    duration: '2 days',
    topics: [
      'Understand local time-series storage and retention',
      'Estimate storage requirements and ingestion rates',
      'Monitor Prometheus memory and disk usage',
      'Control cardinality and reduce unnecessary series',
      'Tune scrape intervals based on monitoring needs',
      'Understand remote write and remote read use cases',
    ],
    outcome: 'Keep monitoring systems efficient as workloads and metrics grow.',
  },
  {
    title: 'High Availability and Long-Term Metrics',
    level: 'Production',
    duration: '2–3 days',
    topics: [
      'Understand Prometheus replicas and alert deduplication',
      'Plan for monitoring-system failure and recovery',
      'Understand federation and its appropriate use cases',
      'Evaluate remote storage architectures',
      'Understand Thanos and Cortex/Mimir at a high level',
      'Plan retention, backup and disaster recovery',
    ],
    outcome: 'Design a monitoring architecture suited to production requirements.',
  },
  {
    title: 'Troubleshooting and Production Operations',
    level: 'Production',
    duration: '2–3 days',
    topics: [
      'Troubleshoot targets that are down or returning scrape errors',
      'Investigate missing, stale or unexpected time series',
      'Debug incorrect PromQL results and label mismatches',
      'Diagnose alert rules that do not fire',
      'Investigate high memory usage, disk growth and slow queries',
      'Validate configuration and rules before applying changes',
      'Create runbooks and incident-response procedures',
    ],
    outcome: 'Diagnose common monitoring failures methodically.',
  },
  {
    title: 'Production Architecture and Interview Preparation',
    level: 'Production',
    duration: '2–3 days',
    topics: [
      'Design monitoring for multi-environment applications',
      'Plan metric ownership and label conventions',
      'Separate actionable alerts from informational signals',
      'Document dashboards, alert rules and service dependencies',
      'Explain PromQL, exporters, Alertmanager and Kubernetes monitoring',
      'Practise scenario-based monitoring and incident questions',
    ],
    outcome: 'Explain monitoring architecture and defend production design choices.',
  },
];

const projects = [
  {
    title: 'Project 1 — Linux Server Monitoring',
    level: 'Beginner',
    details:
      'Deploy Prometheus and Node Exporter. Collect CPU, memory, filesystem and network metrics from a Linux server.',
    deliverable: 'Scrape configuration, verified targets and useful PromQL queries.',
  },
  {
    title: 'Project 2 — Application Metrics',
    level: 'Intermediate',
    details:
      'Instrument a sample application with request counts and latency metrics. Query traffic, error ratios and latency.',
    deliverable: 'Application metrics endpoint, scrape configuration and query notes.',
  },
  {
    title: 'Project 3 — Alerting and Notifications',
    level: 'Intermediate',
    details:
      'Create alerts for target availability, disk capacity and application error rate. Route alerts through Alertmanager.',
    deliverable: 'Validated alert rules, routing configuration and response notes.',
  },
  {
    title: 'Project 4 — Kubernetes Observability',
    level: 'Advanced',
    details:
      'Deploy a Prometheus-based monitoring stack in a test Kubernetes cluster and monitor nodes, workloads and resource usage.',
    deliverable: 'Version-controlled configuration, dashboards and troubleshooting guide.',
  },
  {
    title: 'Project 5 — Production Monitoring Design',
    level: 'Production',
    details:
      'Design a monitoring approach for a web service with SLIs, SLOs, alert routing, retention planning and incident runbooks.',
    deliverable: 'Architecture diagram, service objectives, alert rules and operational documentation.',
  },
];

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Production'] as const;

export default function PrometheusRoadmapPage() {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<(typeof levels)[number]>('All');
  const [completed, setCompleted] = useState<number[]>([]);
  const [expanded, setExpanded] = useState<number[]>([0]);

  const filteredModules = useMemo(() => {
    const q = query.trim().toLowerCase();

    return modules
      .map((module, index) => ({ ...module, index }))
      .filter((module) => level === 'All' || module.level === level)
      .filter(
        (module) =>
          !q ||
          module.title.toLowerCase().includes(q) ||
          module.topics.some((topic) => topic.toLowerCase().includes(q)) ||
          module.outcome.toLowerCase().includes(q),
      );
  }, [query, level]);

  const toggleCompleted = (index: number) => {
    setCompleted((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  const toggleExpanded = (index: number) => {
    setExpanded((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  const progress = Math.round((completed.length / modules.length) * 100);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/40 p-6 shadow-2xl sm:p-10">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-semibold text-orange-300">
              DEVOPS LEARNING ROADMAP
            </span>
            <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
              Beginner to Production
            </span>
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
            Prometheus Roadmap
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            Learn metrics, PromQL, exporters, alerting, Grafana integration,
            Kubernetes monitoring and production observability practices in a
            structured progression.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Learning modules</p>
              <p className="mt-1 text-3xl font-bold">{modules.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Portfolio projects</p>
              <p className="mt-1 text-3xl font-bold">{projects.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">Your progress</p>
              <p className="mt-1 text-3xl font-bold">{progress}%</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-orange-400 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
          <h2 className="text-xl font-bold">How to use this roadmap</h2>
          <ol className="mt-3 grid gap-3 text-sm leading-6 text-slate-300 sm:grid-cols-2">
            <li>1. Follow the modules in order, from fundamentals to production.</li>
            <li>2. Practise queries and monitoring concepts in a test environment.</li>
            <li>3. Mark modules complete as you finish learning them.</li>
            <li>4. Build the projects and document what your metrics reveal.</li>
          </ol>
          <p className="mt-3 text-sm text-slate-400">
            Progress is held in the current page session and may reset when you
            refresh or leave the page.
          </p>
        </section>

        <section className="mt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Learning path</h2>
              <p className="mt-1 text-sm text-slate-400">
                Search concepts or filter by skill level.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search topics..."
                aria-label="Search roadmap topics"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-orange-400 sm:w-64"
              />
              <select
                value={level}
                onChange={(event) =>
                  setLevel(event.target.value as (typeof levels)[number])
                }
                aria-label="Filter modules by level"
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-orange-400"
              >
                {levels.map((item) => (
                  <option key={item} value={item}>
                    {item === 'All' ? 'All levels' : item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {filteredModules.map((module) => {
              const isExpanded = expanded.includes(module.index);
              const isCompleted = completed.includes(module.index);

              return (
                <article
                  key={module.title}
                  className={`overflow-hidden rounded-2xl border bg-slate-900/80 transition ${
                    isCompleted
                      ? 'border-emerald-700/70'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
                    <div className="flex flex-1 gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-400/10 font-bold text-orange-300">
                        {String(module.index + 1).padStart(2, '0')}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-bold">{module.title}</h3>
                          <span className="rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-300">
                            {module.level}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-400">
                          Suggested time: {module.duration}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {module.outcome}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          onChange={() => toggleCompleted(module.index)}
                          className="h-4 w-4 accent-emerald-500"
                        />
                        Done
                      </label>
                      <button
                        type="button"
                        onClick={() => toggleExpanded(module.index)}
                        aria-expanded={isExpanded}
                        className="rounded-lg border border-slate-700 px-3 py-2 text-sm transition hover:border-orange-400"
                      >
                        {isExpanded ? 'Hide topics' : 'View topics'}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-800 bg-slate-950/40 px-5 py-5 sm:pl-20">
                      <h4 className="text-sm font-semibold text-orange-300">
                        Concepts to cover
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {module.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex gap-3 text-sm leading-6 text-slate-300"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              );
            })}

            {filteredModules.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center">
                <p className="font-semibold">No matching modules</p>
                <p className="mt-2 text-sm text-slate-400">
                  Try another search term or select All levels.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setLevel('All');
                  }}
                  className="mt-4 rounded-lg bg-orange-400 px-4 py-2 text-sm font-semibold text-slate-950"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="mt-12">
          <div>
            <h2 className="text-2xl font-bold">Portfolio projects</h2>
            <p className="mt-1 text-sm text-slate-400">
              Build these after learning the related modules.
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold">{project.title}</h3>
                  <span className="rounded-full border border-orange-400/30 bg-orange-400/10 px-2.5 py-1 text-xs text-orange-300">
                    {project.level}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {project.details}
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  <span className="font-semibold text-slate-200">
                    Deliverable:
                  </span>{' '}
                  {project.deliverable}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-orange-400/20 bg-orange-400/5 p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Interview preparation checklist</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Practise explaining the concepts, writing queries and diagnosing
            realistic monitoring failures.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              'Prometheus architecture and pull-based scraping',
              'Counter, gauge, histogram and summary',
              'PromQL selectors, rate and aggregation',
              'Histogram quantiles and latency analysis',
              'Node Exporter and Linux monitoring',
              'Service discovery and relabeling',
              'Recording rules and alerting rules',
              'Alertmanager routing, grouping and silencing',
              'Grafana dashboards and data sources',
              'Kubernetes monitoring and Prometheus Operator',
              'Cardinality, retention and storage sizing',
              'Troubleshooting missing metrics and failed alerts',
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-sm text-slate-300"
              >
                <span className="text-orange-300">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-10 border-t border-slate-800 pt-5 text-sm text-slate-500">
          DevMavox · Prometheus Learning Roadmap · Learn, monitor, investigate and improve.
        </footer>
      </div>
    </main>
  );
}
