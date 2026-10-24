import Link from "next/link";

const courses = [
  { title: "Linux & Shell Scripting", desc: "OS fundamentals, file systems, bash scripting.", icon: "🐧" },
  { title: "Git & GitHub", desc: "Version control, branching, merge conflicts, workflows.", icon: "🌿" },
  { title: "Docker & Containers", desc: "Containerization, Dockerfile, image management.", icon: "🐳" },
  { title: "Kubernetes (EKS)", desc: "Cluster architecture, pods, deployments, services.", icon: "☸️" },
  { title: "AWS Cloud", desc: "EC2, S3, IAM, VPC, real-world cloud infrastructure.", icon: "☁️" },
  { title: "Terraform & IaC", desc: "Infrastructure as Code, automation, state management.", icon: "🏗️" },
  { title: "Jenkins CI/CD", desc: "Pipeline automation, build triggers, plugins, agents.", icon: "⚙️" },
  { title: "ArgoCD (GitOps)", desc: "Declarative continuous delivery for Kubernetes.", icon: "🐙" },
  { title: "Ansible", desc: "Configuration management, playbooks, automation.", icon: "📜" },
  { title: "Prometheus & Grafana", desc: "Monitoring, alerting, metrics collection, dashboards.", icon: "📊" },
  { title: "Apache Tomcat", desc: "Java application server deployment and management.", icon: "☕" },
  { title: "Jira & Agile", desc: "Issue tracking, sprint planning, project management.", icon: "📋" },
  { title: "Slack & Collaboration", desc: "CI/CD webhook notifications and alerts integration.", icon: "💬" },
];

export default function ExploreCoursesPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300">
          ← Back to Home
        </Link>

        <header className="py-12 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-cyan-400">
            DevMavox Learning Hub
          </p>
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Explore DevOps Courses
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            From absolute zero to production-ready engineer. Explore DevOps tools and learning topics in one place.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <article
              key={course.title}
              className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/5"
            >
              <div>
                <div className="mb-4 w-fit rounded-xl border border-slate-700/50 bg-slate-800/80 p-3 text-4xl transition-transform group-hover:scale-110">
                  {course.icon}
                </div>
                <h2 className="mb-2 text-xl font-bold transition-colors group-hover:text-cyan-400">
                  {course.title}
                </h2>
                <p className="text-sm leading-relaxed text-slate-400">
                  {course.desc}
                </p>
              </div>
            </article>
          ))}
        </section>

        <footer className="mt-12 border-t border-slate-800 py-6 text-center text-sm text-slate-500">
          © 2026 DevMavox. Built with passion for learners.
        </footer>
      </div>
    </main>
  );
}
