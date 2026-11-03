import Link from "next/link";
import { notFound } from "next/navigation";

const categories = [
  { name: "Basic Interview Questions", slug: "basic" },
  { name: "Intermediate Interview Questions", slug: "intermediate" },
  { name: "Advanced Interview Questions", slug: "advanced" },
  { name: "Real-Time Production Scenario Questions", slug: "production-scenarios" },
  { name: "Troubleshooting-Based Questions", slug: "troubleshooting" },
  { name: "Scenario-Based Practical Questions", slug: "practical-scenarios" },
  { name: "Frequently Asked Interview Questions", slug: "frequently-asked" }
];

const tools = [
  ["AWS", "aws"], ["Docker", "docker"], ["Kubernetes", "kubernetes"],
  ["Jenkins", "jenkins"], ["Git", "git"], ["Terraform", "terraform"],
  ["Ansible", "ansible"], ["Linux", "linux"], ["ArgoCD", "argocd"],
  ["Helm", "helm"], ["Prometheus", "prometheus"], ["Grafana", "grafana"],
  ["EKS", "eks"], ["Maven", "maven"], ["Nexus", "nexus"],
  ["Jira", "jira"], ["Tomcat", "tomcat"]
];

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const selected = categories.find((item) => item.slug === category);
  if (!selected) notFound();

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <Link href="/notes-cheat-sheets/interview-revision/interview-qa" className="text-sm text-blue-600">← All categories</Link>
      <h1 className="mt-5 text-3xl font-bold">{selected.name}</h1>
      <p className="mt-2 text-gray-600">Select a tool to open its questions and detailed answers.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map(([name, slug]) => (
          <Link key={slug} href={`/notes-cheat-sheets/interview-revision/interview-qa/${category}/${slug}`}
            className="rounded-xl border p-5 font-semibold transition hover:border-blue-500 hover:shadow-md">
            {name} <span className="float-right text-blue-600">→</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
