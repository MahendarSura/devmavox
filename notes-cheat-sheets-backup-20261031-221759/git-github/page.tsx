import Link from "next/link";

const topics = [
  { title: "Git & GitHub Authentication Ssh", slug: "authentication-ssh" },
  { title: "Git & GitHub Branches Merging", slug: "branches-merging" },
  { title: "Git & GitHub Fundamentals", slug: "fundamentals" },
  { title: "Git & GitHub Git Workflows", slug: "git-workflows" },
  { title: "Git & GitHub Github Actions", slug: "github-actions" },
  { title: "Git & GitHub Installation Configuration", slug: "installation-configuration" },
  { title: "Git & GitHub Merge Conflicts", slug: "merge-conflicts" },
  { title: "Git & GitHub Production", slug: "production" },
  { title: "Git & GitHub Pull Requests", slug: "pull-requests" },
  { title: "Git & GitHub Recovery", slug: "recovery" },
  { title: "Git & GitHub Remote Repositories", slug: "remote-repositories" },
  { title: "Git & GitHub Repositories", slug: "repositories" },
  { title: "Git & GitHub Security", slug: "security" },
  { title: "Git & GitHub Staging Commits", slug: "staging-commits" },
  { title: "Git & GitHub Tags Releases", slug: "tags-releases" },
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
          Git & GitHub Troubleshooting
        </h1>

        <p className="mt-3 text-slate-400">
          Select a topic to explore detailed explanations, practical commands,
          common errors, root causes and solutions.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {topics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={"/notes-cheat-sheets/troubleshooting/git-github/" + topic.slug}
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

