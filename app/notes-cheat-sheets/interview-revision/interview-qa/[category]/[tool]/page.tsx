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
  { name: "Frequently Asked Interview Questions", slug: "frequently-asked" },
];

const tools = [
  ["Ansible", "ansible"],
  ["ArgoCD", "argocd"],
  ["AWS", "aws"],
  ["Docker", "docker"],
  ["EKS", "eks"],
  ["Git", "git"],
  ["Grafana", "grafana"],
  ["Helm", "helm"],
  ["Jenkins", "jenkins"],
  ["Jira", "jira"],
  ["Kubernetes", "kubernetes"],
  ["Linux", "linux"],
  ["Maven", "maven"],
  ["Nexus", "nexus"],
  ["Prometheus", "prometheus"],
  ["Terraform", "terraform"],
  ["Tomcat", "tomcat"],
];

type InterviewEntry = {
  heading: string;
  explanation: string;
  interviewQuestions?: { question: string; answer: string }[];
};

export function generateStaticParams() {
  return categories.flatMap((category) =>
    tools.map((tool) => ({ category: category.slug, tool: tool[1] }))
  );
}

export default async function ToolInterviewPage({
  params,
}: {
  params: Promise<{ category: string; tool: string }>;
}) {
  const { category, tool } = await params;
  const selectedCategory = categories.find((item) => item.slug === category);
  const selectedTool = tools.find((item) => item[1] === tool);

  if (!selectedCategory || !selectedTool) notFound();

  const heading = `${selectedTool[0]} - ${selectedCategory.name}`;
  const entries = interviewQA as unknown as InterviewEntry[];
  const entry = entries.find((item) => item.heading === heading);

  if (!entry) notFound();

  return (
    <main className="mx-auto max-w-6xl px-5 py-8">
      <Link
        href={`/notes-cheat-sheets/interview-revision/interview-qa/${category}`}
        className="text-sm text-blue-600"
      >
        ← Back to {selectedCategory.name}
      </Link>

      <h1 className="mt-5 mb-6 text-3xl font-bold">{heading}</h1>

      <NotesRenderer
        data={{
          title: heading,
          description: entry.explanation,
          sections: [
            {
              heading: entry.heading,
              explanation: entry.explanation,
              interviewQuestions: entry.interviewQuestions ?? [],
            },
          ],
        }}
      />
    </main>
  );
}
