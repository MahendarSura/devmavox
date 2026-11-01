import Link from "next/link";
import { notFound } from "next/navigation";
import interviewQA from "../../../interview-qa";
import NotesRenderer from "../../../../NotesRenderer";

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
  return categories.flatMap((category) =>
    tools.map((tool) => ({ category: category.slug, tool: tool[1] }))
  );
}

export default async function ToolInterviewPage({
  params
}: {
  params: Promise<{ category: string; tool: string }>
}) {
  const { category, tool } = await params;
  const selectedCategory = categories.find((item) => item.slug === category);
  const selectedTool = tools.find((item) => item[1] === tool);

  if (!selectedCategory || !selectedTool) notFound();

  const heading = `${selectedTool[0]} - ${selectedCategory.name}`;
  const section = interviewQA.sections.find((item: { heading: string }) => item.heading === heading);

  if (!section) notFound();

  return (
    <main className="mx-auto max-w-6xl px-5 py-8">
      <Link href={`/notes-cheat-sheets/interview-revision/interview-qa/${category}`} className="text-sm text-blue-600">
        ← Back to {selectedCategory.name}
      </Link>
      <h1 className="mt-5 mb-6 text-3xl font-bold">{heading}</h1>
      <NotesRenderer data={{ title: heading, description: interviewQA.description, sections: [section] }} />
    </main>
  );
}
