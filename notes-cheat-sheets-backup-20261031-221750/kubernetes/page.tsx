import Link from "next/link";

const topics = [
  { title: "Kubernetes Architecture", slug: "architecture" },
  { title: "Kubernetes Autoscaling", slug: "autoscaling" },
  { title: "Kubernetes Cluster Components", slug: "cluster-components" },
  { title: "Kubernetes Cluster Upgrades", slug: "cluster-upgrades" },
  { title: "Kubernetes ConfigMaps and Secrets", slug: "configmaps-secrets" },
  { title: "Kubernetes Deployments", slug: "deployments" },
  { title: "Kubernetes Fundamentals", slug: "fundamentals" },
  { title: "Kubernetes DNS", slug: "dns" },
  { title: "Kubernetes Helm", slug: "helm" },
  { title: "Kubernetes Ingress", slug: "ingress" },
  { title: "Installation and Cluster Access", slug: "installation-cluster-access" },
  { title: "Kubernetes Monitoring", slug: "monitoring" },
  { title: "Kubernetes Networking", slug: "networking" },
  { title: "Kubernetes Operators and CRDs", slug: "operators-crds" },
  { title: "Kubernetes Pods", slug: "pods" },
  { title: "Kubernetes Production", slug: "production" },
  { title: "Kubernetes ReplicaSets", slug: "replicasets" },
  { title: "Kubernetes Scheduling", slug: "scheduling" },
  { title: "Kubernetes Security", slug: "security" },
  { title: "Kubernetes Services", slug: "services" },
  { title: "StatefulSets and DaemonSets", slug: "statefulsets-daemonsets" },
  { title: "Kubernetes Storage", slug: "storage" },
  { title: "Troubleshooting Command Reference", slug: "troubleshooting-command-reference" },
];

export default function ToolTopicsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/notes-cheat-sheets/troubleshooting" className="text-sm text-cyan-300 hover:underline">
          ← All Troubleshooting Tools
        </Link>
        <p className="mt-8 text-sm uppercase tracking-widest text-cyan-300">
          Troubleshooting Notes
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Kubernetes Troubleshooting
        </h1>
        <p className="mt-3 text-slate-400">
          Select a topic to explore detailed explanations, practical commands,
          common errors, root causes and solutions.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {topics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={"/notes-cheat-sheets/troubleshooting/kubernetes/" + topic.slug}
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
