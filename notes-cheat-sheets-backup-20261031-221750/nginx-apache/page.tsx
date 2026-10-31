import Link from "next/link";

const topics = [
  { title: "Nginx & Apache 502 503 Errors", slug: "502-503-errors" },
  { title: "Nginx & Apache Dns Routing", slug: "dns-routing" },
  { title: "Nginx & Apache Fundamentals", slug: "fundamentals" },
  { title: "Nginx & Apache Installation", slug: "installation" },
  { title: "Nginx & Apache Load Balancing", slug: "load-balancing" },
  { title: "Nginx & Apache Logs", slug: "logs" },
  { title: "Nginx & Apache Performance", slug: "performance" },
  { title: "Nginx & Apache Permissions", slug: "permissions" },
  { title: "Nginx & Apache Production", slug: "production" },
  { title: "Nginx & Apache Reverse Proxy", slug: "reverse-proxy" },
  { title: "Nginx & Apache Security", slug: "security" },
  { title: "Nginx & Apache Ssl Tls", slug: "ssl-tls" },
  { title: "Nginx & Apache Virtual Hosts", slug: "virtual-hosts" },
  { title: "Nginx & Apache Web Server Configuration", slug: "web-server-configuration" },
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
          Nginx & Apache Troubleshooting
        </h1>

        <p className="mt-3 text-slate-400">
          Select a topic to explore detailed explanations, practical commands,
          common errors, root causes and solutions.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {topics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={"/notes-cheat-sheets/troubleshooting/nginx-apache/" + topic.slug}
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

