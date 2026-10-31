import Link from "next/link";

const topics = [
  { title: "Docker Fundamentals", slug: "fundamentals", description: "Docker concepts, architecture, CLI, daemon, containerd and runc." },
  { title: "Docker Installation", slug: "installation", description: "Install Docker and prepare the host environment." },
  { title: "Docker Images", slug: "images", description: "Image layers, tags, digests and build cache." },
  { title: "Docker Containers", slug: "containers", description: "Container lifecycle, run options and health checks." },
  { title: "Dockerfile", slug: "dockerfile", description: "Dockerfile instructions, BuildKit and Buildx." },
  { title: "Docker Networking", slug: "networking", description: "Bridge, host, none and overlay networking." },
  { title: "Docker Volumes", slug: "volumes", description: "Volumes, bind mounts, tmpfs and storage troubleshooting." },
  { title: "Docker Compose", slug: "compose", description: "Multi-container application troubleshooting." },
  { title: "Docker Registry", slug: "registry", description: "Login, pull, push and private registry failures." },
  { title: "Docker Security", slug: "security", description: "Non-root users, capabilities and secrets." },
  { title: "Docker Performance", slug: "performance", description: "CPU, memory, OOM, logs and disk diagnostics." },
  { title: "Docker Production Issues", slug: "production", description: "Production incidents, RCA and deployment troubleshooting." },
];

export default function DockerTopicsPage() {
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
          Docker Troubleshooting
        </h1>

        <p className="mt-3 text-slate-400">
          Detailed Docker explanations, commands, root causes, solutions
          and production troubleshooting.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {topics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={`/notes-cheat-sheets/troubleshooting/docker/${topic.slug}`}
              className="rounded-xl border border-slate-700 bg-slate-900 p-5 transition hover:border-cyan-500 hover:bg-slate-800"
            >
              <p className="text-xs text-cyan-400">
                TOPIC {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-cyan-200">
                {topic.title} →
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {topic.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
