import Link from "next/link";

export default function TroubleshootingCenterPage() {
  const categories = [
    {
      title: "Linux Troubleshooting",
      slug: "linux",
      description: "Diagnose and fix service startup failures, permission errors, disk space issues, and system logs.",
      icon: "🐧",
    },
    {
      title: "Git & GitHub",
      slug: "github",
      description: "Resolve merge conflicts, detached HEAD states, remote sync rejections, and branch divergence.",
      icon: "🔀",
    },
    {
      title: "Docker Containers",
      slug: "docker",
      description: "Fix container exit codes, port binding conflicts, image build failures, and volume mounts.",
      icon: "🐳",
    },
    {
      title: "Kubernetes Workloads",
      slug: "kubernetes",
      description: "Debug CrashLoopBackOff, Pending pods, service connectivity issues, and ingress routing.",
      icon: "☸️",
    },
    {
      title: "Ansible Automation",
      slug: "ansible",
      description: "Troubleshoot SSH connection failures, playbook syntax errors, permission escalations, and inventory issues.",
      icon: "🧩",
    },
    {
      title: "CI/CD Pipelines",
      slug: "jenkins",
      description: "Investigate failed build stages, missing environment variables, test failures, and artifact upload errors.",
      icon: "⚙️",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Back to Home */}
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
            Learn how to systematically diagnose, isolate, and fix common errors across Linux, Git, Docker, Kubernetes, Ansible, and CI/CD pipelines.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.title}
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

        {/* Bottom Back Button */}
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

