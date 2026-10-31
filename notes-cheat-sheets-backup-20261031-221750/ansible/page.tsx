import Link from "next/link";

const topics = [
  { title: "Ansible Ad Hoc Commands", slug: "ad-hoc-commands" },
  { title: "Ansible Collections", slug: "collections" },
  { title: "Ansible Error Handling", slug: "error-handling" },
  { title: "Ansible Fundamentals", slug: "fundamentals" },
  { title: "Ansible Installation Configuration", slug: "installation-configuration" },
  { title: "Ansible Inventory", slug: "inventory" },
  { title: "Ansible Loops Conditionals", slug: "loops-conditionals" },
  { title: "Ansible Playbooks", slug: "playbooks" },
  { title: "Ansible Production", slug: "production" },
  { title: "Ansible Roles", slug: "roles" },
  { title: "Ansible Ssh Connectivity", slug: "ssh-connectivity" },
  { title: "Ansible Tasks Handlers", slug: "tasks-handlers" },
  { title: "Ansible Templates", slug: "templates" },
  { title: "Ansible Variables Facts", slug: "variables-facts" },
  { title: "Ansible Vault Secrets", slug: "vault-secrets" },
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
          Ansible Troubleshooting
        </h1>

        <p className="mt-3 text-slate-400">
          Select a topic to explore detailed explanations, practical commands,
          common errors, root causes and solutions.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {topics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={"/notes-cheat-sheets/troubleshooting/ansible/" + topic.slug}
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

