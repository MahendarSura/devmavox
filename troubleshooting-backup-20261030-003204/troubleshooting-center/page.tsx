import Link from "next/link";

export default function TroubleshootingCenterPage() {
  const categories = [
    {
      title: "Linux Troubleshooting",
      slug: "linux",
      description: "Diagnose service failures, CPU and RAM spikes, disk issues, permissions, DNS, and SSH errors.",
      icon: "🐧",
    },
    {
      title: "Git & GitHub Troubleshooting",
      slug: "github",
      description: "Resolve merge conflicts, authentication failures, rejected pushes, branches, and repository sync issues.",
      icon: "🔀",
    },
    {
      title: "Docker Troubleshooting",
      slug: "docker",
      description: "Fix container crashes, image pulls, build errors, port mappings, networking, and volumes.",
      icon: "🐳",
    },
    {
      title: "Kubernetes Troubleshooting",
      slug: "kubernetes",
      description: "Debug pod failures, scheduling, services, ingress, probes, storage, and cluster connectivity.",
      icon: "☸️",
    },
    {
      title: "Ansible Troubleshooting",
      slug: "ansible",
      description: "Resolve inventory, SSH, playbook, variable, privilege escalation, and execution errors.",
      icon: "🧩",
    },
    {
      title: "Jenkins & CI/CD Troubleshooting",
      slug: "jenkins",
      description: "Investigate failed pipeline stages, agents, credentials, builds, artifacts, and deployments.",
      icon: "⚙️",
    },
    {
      title: "AWS Troubleshooting",
      slug: "aws",
      description: "Diagnose EC2, IAM, S3, networking, load balancers, storage, and cloud access failures.",
      icon: "☁️",
    },
    {
      title: "Terraform Troubleshooting",
      slug: "terraform",
      description: "Fix provider, validation, state locking, drift, backend, module, and infrastructure deployment errors.",
      icon: "🏗️",
    },
    {
      title: "Argo CD Troubleshooting",
      slug: "argocd",
      description: "Investigate sync failures, OutOfSync resources, health issues, repository access, and deployments.",
      icon: "🔄",
    },
    {
      title: "Monitoring Troubleshooting",
      slug: "monitoring",
      description: "Debug monitoring, metrics collection, dashboards, alert rules, and observability problems.",
      icon: "📊",
    },
    {
      title: "Networking Troubleshooting",
      slug: "networking",
      description: "Diagnose DNS, routing, connectivity, ports, firewalls, and network communication failures.",
      icon: "🌐",
    },
    {
      title: "Nginx Troubleshooting",
      slug: "nginx",
      description: "Resolve reverse proxy, HTTP errors, configuration, TLS, upstream, and web server failures.",
      icon: "🖥️",
    },
    {
      title: "Helm Troubleshooting",
      slug: "helm",
      description: "Fix chart rendering, values, release, upgrade, rollback, and Kubernetes deployment problems.",
      icon: "⎈",
    },
    {
      title: "Amazon EKS Troubleshooting",
      slug: "eks",
      description: "Investigate worker nodes, cluster access, networking, IAM integration, and workload failures.",
      icon: "☸️",
    },
    {
      title: "Database Troubleshooting",
      slug: "databases",
      description: "Diagnose database connectivity, authentication, performance, resource, and query problems.",
      icon: "🗄️",
    },
    {
      title: "Maven Troubleshooting",
      slug: "maven",
      description: "Fix dependency resolution, compilation, repository, plugin, and build lifecycle errors.",
      icon: "📦",
    },
    {
      title: "Gradle Troubleshooting",
      slug: "gradle",
      description: "Resolve Gradle build failures, dependency conflicts, plugin issues, and configuration errors.",
      icon: "🛠️",
    },
    {
      title: "Nexus Repository Troubleshooting",
      slug: "nexus",
      description: "Investigate artifact publishing, repository access, credentials, and dependency download issues.",
      icon: "📚",
    },
    {
      title: "Tomcat Troubleshooting",
      slug: "tomcat",
      description: "Diagnose application deployment, startup, ports, memory, thread pools, and server errors.",
      icon: "🐱",
    },
    {
      title: "Security Troubleshooting",
      slug: "security",
      description: "Investigate access control, permissions, certificates, secrets, and DevSecOps security failures.",
      icon: "🔐",
    },
    {
      title: "Production Troubleshooting",
      slug: "production",
      description: "Work through production incidents, service outages, reliability, recovery, and root-cause analysis.",
      icon: "🚨",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-5 pt-5 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 font-bold text-white transition hover:bg-cyan-700"
        >
          ← Back to Main Menu
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
            Diagnostic Guides · Production Support
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
            Troubleshooting <span className="text-cyan-600 dark:text-cyan-400">Center</span>
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-7 text-slate-600 dark:text-slate-300">
            Browse troubleshooting guides for 21 DevOps tools and technologies. Diagnose errors, follow practical checks, and find recovery steps for common development, infrastructure, and production issues.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <div className="text-3xl">{cat.icon}</div>
                <h2 className="mt-4 text-xl font-extrabold text-slate-900 dark:text-white">
                  {cat.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                <Link
                  href={`/troubleshooting-center/${cat.slug}`}
                  className="inline-flex font-bold text-cyan-600 hover:underline dark:text-cyan-400"
                >
                  View guides →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 font-bold text-white transition hover:bg-slate-700"
          >
            ← Back to Main Menu
          </Link>
        </div>
      </section>
    </main>
  );
}
