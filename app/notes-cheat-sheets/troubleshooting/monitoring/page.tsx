import Link from "next/link";

const topics = [
  { title: "Monitoring Alerting", slug: "alerting" },
  { title: "Monitoring Alertmanager", slug: "alertmanager" },
  { title: "Monitoring Centralized Logging", slug: "centralized-logging" },
  { title: "Monitoring Dashboards", slug: "dashboards" },
  { title: "Monitoring Distributed Tracing", slug: "distributed-tracing" },
  { title: "Monitoring Fundamentals", slug: "fundamentals" },
  { title: "Monitoring Grafana", slug: "grafana" },
  { title: "Monitoring Infrastructure Monitoring", slug: "infrastructure-monitoring" },
  { title: "Monitoring Kubernetes Monitoring", slug: "kubernetes-monitoring" },
  { title: "Monitoring Logs", slug: "logs" },
  { title: "Monitoring Metrics", slug: "metrics" },
  { title: "Monitoring Node Exporter", slug: "node-exporter" },
  { title: "Monitoring Performance", slug: "performance" },
  { title: "Monitoring Production", slug: "production" },
  { title: "Monitoring Prometheus", slug: "prometheus" },
];

export default function ToolTopicsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/notes-cheat-sheets/troubleshooting"
          className="text-sm text-cyan-300 hover:underline"
        >
          ← All Troubleshooting Tools
        </Link>

        <p className="mt-8 text-sm uppercase tracking-widest text-cyan-300">
          Troubleshooting Notes
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Monitoring Troubleshooting
        </h1>

        <p className="mt-3 text-slate-400">
          Select a topic to explore detailed explanations, practical commands,
          common errors, root causes and solutions.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {topics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={"/notes-cheat-sheets/troubleshooting/monitoring/" + topic.slug}
              className="rounded-xl border border-slate-700 bg-slate-900 p-5 transition hover:border-cyan-500 hover:bg-slate-800"
            >
              <p className="text-xs text-cyan-400">
                TOPIC {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-cyan-200">
                {topic.title} →
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

