import Link from "next/link";

const topics = [
  { title: "CI/CD Artifact Management", slug: "artifact-management" },
  { title: "CI/CD Build Automation", slug: "build-automation" },
  { title: "CI/CD Deployment Strategies", slug: "deployment-strategies" },
  { title: "CI/CD Fundamentals", slug: "fundamentals" },
  { title: "CI/CD Github Actions", slug: "github-actions" },
  { title: "CI/CD Gitlab Ci", slug: "gitlab-ci" },
  { title: "CI/CD Jenkins Pipelines", slug: "jenkins-pipelines" },
  { title: "CI/CD Monitoring", slug: "monitoring" },
  { title: "CI/CD Pipeline Architecture", slug: "pipeline-architecture" },
  { title: "CI/CD Production", slug: "production" },
  { title: "CI/CD Rollback", slug: "rollback" },
  { title: "CI/CD Secrets Management", slug: "secrets-management" },
  { title: "CI/CD Security", slug: "security" },
  { title: "CI/CD Source Control", slug: "source-control" },
  { title: "CI/CD Testing", slug: "testing" },
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
          CI/CD Troubleshooting
        </h1>

        <p className="mt-3 text-slate-400">
          Select a topic to explore detailed explanations, practical commands,
          common errors, root causes and solutions.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {topics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={"/notes-cheat-sheets/troubleshooting/cicd/" + topic.slug}
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

