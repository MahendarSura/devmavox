import Link from "next/link";

const sections = [
  {
    number: "01",
    title: "Revised Commands List",
    description: "Linux, Git, Docker, Kubernetes, AWS, Terraform and other DevOps tools with commands for daily practice.",
    href: "/notes-cheat-sheets/revised-commands",
    icon: "⌘",
    details: [
      { title: "Basic Commands", href: "/notes-cheat-sheets/revised-commands" },
      { title: "Intermediate Commands", href: "/notes-cheat-sheets/revised-commands" },
      { title: "Advanced Commands", href: "/notes-cheat-sheets/revised-commands" },
      { title: "Troubleshooting Commands", href: "/notes-cheat-sheets/revised-commands" }
    ]
  },
  {
    number: "02",
    title: "Technical Concepts",
    description: "Understand important DevOps concepts with simple explanations and real-time examples.",
    href: "/notes-cheat-sheets/technical-concepts",
    icon: "◈",
    details: [
      { title: "How It Works", href: "/notes-cheat-sheets/technical-concepts/how-it-works" },
      { title: "Architecture & Flow", href: "/notes-cheat-sheets/technical-concepts/architecture-flow" },
      { title: "Real-Time Examples", href: "/notes-cheat-sheets/technical-concepts/real-time-examples" }
    ]
  },
  {
    number: "03",
    title: "YAML & Configuration Notes",
    description: "Quick references for Kubernetes YAML, Docker Compose, Jenkinsfiles, GitHub Actions and Terraform HCL.",
    href: "/notes-cheat-sheets/yaml-configuration",
    icon: "{}",
    details: [
      { title: "YAML Files", href: "/notes-cheat-sheets/yaml-configuration/yaml-files" },
      { title: "Configuration Examples", href: "/notes-cheat-sheets/yaml-configuration/configuration-examples" },
      { title: "Best Practices", href: "/notes-cheat-sheets/yaml-configuration/best-practices" }
    ]
  },
  {
    number: "04",
    title: "Troubleshooting Notes",
    description: "Common DevOps errors, diagnostic commands, root causes and step-by-step fixes.",
    href: "/notes-cheat-sheets/troubleshooting",
    icon: "⚙",
    details: [
      { title: "Error Messages", href: "/notes-cheat-sheets/troubleshooting/error-messages" },
      { title: "Root Causes", href: "/notes-cheat-sheets/troubleshooting/root-causes" },
      { title: "Troubleshooting Steps", href: "/notes-cheat-sheets/troubleshooting/troubleshooting-steps" }
    ]
  },
  {
    number: "05",
    title: "Interview & Quick Revision Notes",
    description: "Revise important interview questions, key terms, comparisons and production scenarios.",
    href: "/notes-cheat-sheets/interview-revision",
    icon: "▤",
    details: [
      { title: "Interview Q&A", href: "/notes-cheat-sheets/interview-revision/interview-qa" },
      { title: "Quick Revision", href: "/notes-cheat-sheets/interview-revision/quick-revision" },
      { title: "Important Comparisons", href: "/notes-cheat-sheets/interview-revision/important-comparisons" }
    ]
  },
  {
    number: "06",
    title: "Real-Time Project Notes",
    description: "Follow practical DevOps workflows, deployment checklists, CI/CD pipelines, monitoring and rollback.",
    href: "/notes-cheat-sheets/real-time-projects",
    icon: "⇧",
    details: [
      { title: "Project Workflows", href: "/notes-cheat-sheets/real-time-projects/project-workflows" },
      { title: "Deployment Checklists", href: "/notes-cheat-sheets/real-time-projects/deployment-checklists" },
      { title: "CI/CD & Rollback", href: "/notes-cheat-sheets/real-time-projects/cicd-rollback" }
    ]
  }
];

export default function NotesCheatSheetsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="mb-8 inline-flex text-sm text-slate-400 hover:text-white">
          ← Back to Home
        </Link>

        <header className="relative mb-10 overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/50 p-6 sm:p-10">
          <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-300">
            DevMavox Learning Hub
          </span>
          <h1 className="mt-5 text-3xl font-extrabold sm:text-5xl">
            Notes &amp; Cheat Sheets
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Practice DevOps commands, understand technical concepts, revise configuration files and learn practical project workflows.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm">
            <span className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2">06 Learning Sections</span>
            <span className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2">English + Telugu</span>
          </div>
        </header>

        <section>
          <h2 className="mb-2 text-2xl font-bold">Explore Notes</h2>
          <p className="mb-5 text-sm text-slate-400">
            Select a topic to open its dedicated learning page.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {sections.map((section) => (
              <article
                key={section.number}
                className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-slate-900 sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-xl font-bold text-cyan-300">
                    {section.icon}
                  </span>
                  <span className="text-sm font-semibold tracking-widest text-slate-500">
                    {section.number}
                  </span>
                </div>

                <Link href={section.href} className="mt-5 text-xl font-bold hover:text-cyan-300">
                  {section.title}
                </Link>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
                  {section.description}
                </p>

                <ul className="mt-5 space-y-2 border-t border-slate-800 pt-4">
                  {section.details.map((detail) => (
                    <li key={detail.href + detail.title}>
                      <Link
                        href={detail.href}
                        className="flex items-center gap-2 text-sm text-slate-300 transition hover:text-cyan-300"
                      >
                        <span className="text-cyan-400" aria-hidden="true">✓</span>
                        {detail.title}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link href={section.href} className="mt-5 flex items-center justify-between text-sm font-semibold text-cyan-300">
                  <span>Explore section</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <footer className="py-10 text-center text-xs text-slate-500">
          DevMavox · Learn DevOps in Telugu &amp; English
        </footer>
      </div>
    </main>
  );
}
