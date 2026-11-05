import Link from "next/link";
import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import path from "node:path";
import NotesRenderer from "../../../../NotesRenderer";

const categories = [
  { name: "Basic Interview Questions", slug: "basic", dataCategory: "Basic Interview Questions" },
  { name: "Intermediate Interview Questions", slug: "intermediate", dataCategory: "Intermediate Interview Questions" },
  { name: "Advanced Interview Questions", slug: "advanced", dataCategory: "Advanced Interview Questions" },
  { name: "Real-Time Production Scenario Questions", slug: "production-scenarios", dataCategory: "Production Scenarios" },
  { name: "Troubleshooting-Based Questions", slug: "troubleshooting", dataCategory: "Troubleshooting" },
  { name: "Scenario-Based Practical Questions", slug: "practical-scenarios", dataCategory: "Practical Scenarios" },
  { name: "Frequently Asked Interview Questions", slug: "frequently-asked", dataCategory: "FAQs" },
];

const tools = [
  ["AWS", "aws"], ["Docker", "docker"], ["Kubernetes", "kubernetes"],
  ["Jenkins", "jenkins"], ["Git", "git"], ["Terraform", "terraform"],
  ["Ansible", "ansible"], ["Linux", "linux"], ["ArgoCD", "argocd"],
  ["Helm", "helm"], ["Prometheus", "prometheus"], ["Grafana", "grafana"],
  ["EKS", "eks"], ["Maven", "maven"], ["Nexus", "nexus"],
  ["Jira", "jira"], ["Tomcat", "tomcat"],
];

type DatasetQuestion = {
  number: number;
  question: string;
  answer: string;
};

type DatasetGroup = {
  tool: string;
  category: string;
  questions: DatasetQuestion[];
};

export function generateStaticParams() {
  return categories.flatMap((category) =>
    tools.map((tool) => ({
      category: category.slug,
      tool: tool[1],
    }))
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

  const jsonPath = path.join(
    process.cwd(),
    "data",
    "basic-interview-qa-aws-docker-kubernetes.json"
  );

  const fileContent = await readFile(jsonPath, "utf8");
  const dataset = JSON.parse(fileContent) as DatasetGroup[];

  const entry = dataset.find(
    (item) =>
      item.tool === selectedTool[0] &&
      item.category === selectedCategory.dataCategory
  );

  if (!entry || !Array.isArray(entry.questions)) notFound();

  const heading = `${selectedTool[0]} - ${selectedCategory.name}`;

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
          description: `${selectedTool[0]} - ${selectedCategory.name}. ${entry.questions.length} interview questions with detailed answers.`,
          sections: [
            {
              heading,
              explanation: `${entry.questions.length} questions and detailed answers.`,
              interviewQuestions: entry.questions.map((item) => ({
                question: item.question,
                answer: item.answer,
              })),
            },
          ],
        }}
      />
    </main>
  );
}
