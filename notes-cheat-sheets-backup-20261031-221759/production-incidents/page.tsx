import Link from "next/link";

const topics = [
  { title: "Production Incidents Application Down", slug: "application-down" },
  { title: "Production Incidents Cloud Outages", slug: "cloud-outages" },
  { title: "Production Incidents Container Failure", slug: "container-failure" },
  { title: "Production Incidents Database Failure", slug: "database-failure" },
  { title: "Production Incidents Deployment Failure", slug: "deployment-failure" },
  { title: "Production Incidents Disaster Recovery", slug: "disaster-recovery" },
  { title: "Production Incidents Disk Full", slug: "disk-full" },
  { title: "Production Incidents High Cpu", slug: "high-cpu" },
  { title: "Production Incidents High Memory", slug: "high-memory" },
  { title: "Production Incidents Incident Management", slug: "incident-management" },
  { title: "Production Incidents Kubernetes Incidents", slug: "kubernetes-incidents" },
  { title: "Production Incidents Network Outage", slug: "network-outage" },
  { title: "Production Incidents Postmortems", slug: "postmortems" },
  { title: "Production Incidents Root Cause Analysis", slug: "root-cause-analysis" },
  { title: "Production Incidents Security Incidents", slug: "security-incidents" },
  { title: "Production Incidents Server Down", slug: "server-down" },
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
          Production Incidents Troubleshooting
        </h1>

        <p className="mt-3 text-slate-400">
          Select a topic to explore detailed explanations, practical commands,
          common errors, root causes and solutions.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {topics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={"/notes-cheat-sheets/troubleshooting/production-incidents/" + topic.slug}
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

