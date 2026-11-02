import { notFound } from "next/navigation";
import NotesRenderer from "../../NotesRenderer";
import interviewQA from "../interview-qa";
import quickRevision from "../quick-revision";
import importantComparisons from "../important-comparisons";

type InterviewEntry = {
  heading: string;
  explanation: string;
  interviewQuestions?: { question: string; answer: string }[];
};

type RawSection = {
  heading: string;
  explanation: string;
  steps?: string[];
  commands?: string | string[];
  config?: string | string[];
  problems?: { issue: string; solution: string }[];
  interviewQuestions?: { question: string; answer: string }[];
};

type ToolNotes = {
  sections?: RawSection[];
};

const topics = {
  "interview-qa": interviewQA,
  "quick-revision": quickRevision,
  "important-comparisons": importantComparisons,
};

export function generateStaticParams() {
  return Object.keys(topics).map((slug) => ({ slug }));
}

export default async function InterviewTopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(slug in topics)) notFound();

  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  let sections: RawSection[] = [];
  let description = "";

  if (slug === "interview-qa") {
    const entries = interviewQA as unknown as InterviewEntry[];

    sections = entries.map((entry) => ({
      heading: entry.heading,
      explanation: entry.explanation,
      interviewQuestions: entry.interviewQuestions ?? [],
    }));

    description = "Interview questions and answers organized by DevOps tool and category.";
  } else {
    const raw = topics[slug as "quick-revision" | "important-comparisons"] as unknown as ToolNotes[];

    sections = raw.flatMap((entry) => entry.sections ?? []);
    description =
      slug === "quick-revision"
        ? "Practical revision notes, commands, key concepts and troubleshooting guidance for DevOps tools."
        : "Important DevOps concepts, operational differences and troubleshooting comparisons.";
  }

  if (sections.length === 0) notFound();

  return (
    <NotesRenderer
      backHref="/notes-cheat-sheets/interview-revision"
      backLabel="Interview & Quick Revision Notes"
      data={{ title, description, sections }}
    />
  );
}
