import Link from "next/link";

const tools = [
  { title: "Linux", slug: "linux" },
  { title: "Git & GitHub", slug: "git-github" },
  { title: "Docker", slug: "docker" },
  { title: "Kubernetes", slug: "kubernetes" },
  { title: "AWS", slug: "aws" },
  { title: "Terraform", slug: "terraform" },
  { title: "Jenkins", slug: "jenkins" },
  { title: "CI/CD", slug: "cicd" },
  { title: "Ansible", slug: "ansible" },
  { title: "Nginx & Apache", slug: "nginx-apache" },
  { title: "Networking", slug: "networking" },
  { title: "Monitoring", slug: "monitoring" },
  { title: "ArgoCD", slug: "argocd" },
  { title: "Helm", slug: "helm" },
  { title: "DevOps Security", slug: "security" },
  { title: "Databases", slug: "database" },
  { title: "Production Incidents", slug: "production-incidents" },
];

const generalTopics = [
  { title: "Error Messages", slug: "error-messages" },
  { title: "Root Causes", slug: "root-causes" },
  { title: "Troubleshooting Steps", slug: "troubleshooting-steps" },
];

export default function TroubleshootingPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-6xl">

        <p className="mt-8 text-sm uppercase tracking-widest text-cyan-300">
          DevOps Learning Notes
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Troubleshooting Notes
        </h1>

        <p className="mt-3 text-slate-400">
          Select a DevOps tool to explore topic-wise troubleshooting guides,
          commands, root causes, solutions and production incidents.
        </p>

        <h2 className="mt-10 text-xl font-bold text-cyan-200">
          DevOps Tools
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <Link
              key={tool.slug}
              href={"/notes-cheat-sheets/troubleshooting/" + tool.slug}
              className="rounded-xl border border-slate-700 bg-slate-900 p-5 transition hover:border-cyan-500 hover:bg-slate-800"
            >
              <p className="text-xs text-cyan-400">
                TOOL {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-cyan-200">
                {tool.title} Troubleshooting →
              </h3>
            </Link>
          ))}
        </div>

        <h2 className="mt-12 text-xl font-bold text-cyan-200">
          General Troubleshooting Resources
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {generalTopics.map((topic) => (
            <Link
              key={topic.slug}
              href={"/notes-cheat-sheets/troubleshooting/" + topic.slug}
              className="rounded-xl border border-slate-700 bg-slate-900 p-5 text-cyan-200 hover:border-cyan-500"
            >
              {topic.title} →
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
