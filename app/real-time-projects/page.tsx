
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Project 1",
    description: "Explore the first hands-on cloud and DevOps project.",
    icon: "☁️",
    category: "Cloud & Infrastructure",
  },
  {
    id: 2,
    title: "Project 2",
    description: "Practice automation, deployment, and infrastructure workflows.",
    icon: "⚙️",
    category: "DevOps Automation",
  },
  {
    id: 3,
    title: "Project 3",
    description: "Learn containerization and application delivery.",
    icon: "🐳",
    category: "Docker & Containers",
  },
  {
    id: 4,
    title: "Project 4",
    description: "Practice Kubernetes deployment and orchestration.",
    icon: "☸️",
    category: "Kubernetes",
  },
  {
    id: 5,
    title: "Project 5",
    description: "Build and understand a continuous integration pipeline.",
    icon: "🔄",
    category: "CI/CD",
  },
  {
    id: 6,
    title: "Project 6",
    description: "Work with cloud infrastructure and Infrastructure as Code.",
    icon: "🏗️",
    category: "Infrastructure as Code",
  },
  {
    id: 7,
    title: "Project 7",
    description: "Explore GitOps-based application delivery.",
    icon: "🚀",
    category: "GitOps",
  },
  {
    id: 8,
    title: "Project 8",
    description: "Practice monitoring, metrics, and observability.",
    icon: "📊",
    category: "Monitoring",
  },
  {
    id: 9,
    title: "Project 9",
    description: "Explore security checks and DevSecOps workflows.",
    icon: "🔐",
    category: "DevSecOps",
  },
  {
    id: 10,
    title: "Project 10",
    description: "Explore an end-to-end production-style DevOps project.",
    icon: "🎯",
    category: "Real-Time Project",
  },
];

export default function RealTimeProjectsPage() {
  return (
    <main className="min-h-screen bg-[#0b0f19] px-5 py-12 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm text-cyan-400 transition hover:text-cyan-300"
        >
          ← Back to Home
        </Link>

        <header className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Learn by Building
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Real-Time DevOps Projects
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Build practical cloud, CI/CD, Kubernetes, GitOps, automation,
            monitoring, and DevSecOps projects through hands-on learning.
          </p>

          <div className="mt-6 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-300">
            10 Hands-On Projects
          </div>
        </header>

        <section
          aria-label="Real-time DevOps projects"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col rounded-2xl border border-slate-700/80 bg-slate-900/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-slate-900"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-4xl" aria-hidden="true">
                  {project.icon}
                </span>

                <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
                  Project {project.id}
                </span>
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                {project.category}
              </p>

              <h2 className="text-xl font-bold text-white">
                {project.title}
              </h2>

              <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
                {project.description}
              </p>

              <Link
                href={`/real-time-projects/project${project.id}`}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Explore Project <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </section>

        <footer className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          DevMavox · Learn DevOps by building real projects.
        </footer>
      </div>
    </main>
  );
}
