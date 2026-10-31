import Link from "next/link";

const topics = [
  { title: "DevOps Security Compliance", slug: "compliance" },
  { title: "DevOps Security Container Security", slug: "container-security" },
  { title: "DevOps Security Devsecops", slug: "devsecops" },
  { title: "DevOps Security Fundamentals", slug: "fundamentals" },
  { title: "DevOps Security Iam Access Control", slug: "iam-access-control" },
  { title: "DevOps Security Image Scanning", slug: "image-scanning" },
  { title: "DevOps Security Incident Response", slug: "incident-response" },
  { title: "DevOps Security Kubernetes Security", slug: "kubernetes-security" },
  { title: "DevOps Security Linux Security", slug: "linux-security" },
  { title: "DevOps Security Network Security", slug: "network-security" },
  { title: "DevOps Security Production", slug: "production" },
  { title: "DevOps Security Rbac", slug: "rbac" },
  { title: "DevOps Security Secrets Management", slug: "secrets-management" },
  { title: "DevOps Security Ssh Security", slug: "ssh-security" },
  { title: "DevOps Security Tls Certificates", slug: "tls-certificates" },
  { title: "DevOps Security Vulnerability Scanning", slug: "vulnerability-scanning" },
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
          DevOps Security Troubleshooting
        </h1>

        <p className="mt-3 text-slate-400">
          Select a topic to explore detailed explanations, practical commands,
          common errors, root causes and solutions.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {topics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={"/notes-cheat-sheets/troubleshooting/security/" + topic.slug}
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

