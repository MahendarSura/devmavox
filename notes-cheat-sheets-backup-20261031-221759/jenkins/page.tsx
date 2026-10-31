import Link from "next/link";

const topics = [
  { title: "Jenkins Agents Nodes", slug: "agents-nodes" },
  { title: "Jenkins Build Troubleshooting", slug: "build-troubleshooting" },
  { title: "Jenkins Credentials", slug: "credentials" },
  { title: "Jenkins Fundamentals", slug: "fundamentals" },
  { title: "Jenkins Installation", slug: "installation" },
  { title: "Jenkins Integrations", slug: "integrations" },
  { title: "Jenkins Jenkinsfile", slug: "jenkinsfile" },
  { title: "Jenkins Jobs", slug: "jobs" },
  { title: "Jenkins Pipelines", slug: "pipelines" },
  { title: "Jenkins Plugins", slug: "plugins" },
  { title: "Jenkins Production", slug: "production" },
  { title: "Jenkins Scaling", slug: "scaling" },
  { title: "Jenkins Security", slug: "security" },
  { title: "Jenkins Webhooks", slug: "webhooks" },
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
          Jenkins Troubleshooting
        </h1>

        <p className="mt-3 text-slate-400">
          Select a topic to explore detailed explanations, practical commands,
          common errors, root causes and solutions.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {topics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={"/notes-cheat-sheets/troubleshooting/jenkins/" + topic.slug}
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

