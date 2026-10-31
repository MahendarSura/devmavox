import { notFound } from "next/navigation";
import NotesRenderer from "../../NotesRenderer";
import interviewQA from "../interview-qa";
import quickRevision from "../quick-revision";
import importantComparisons from "../important-comparisons";

const topics = {
  "interview-qa": interviewQA,
  "quick-revision": quickRevision,
  "important-comparisons": importantComparisons,
};

export function generateStaticParams() {
  return Object.keys(topics).map((slug) => ({ slug }));
}

export default async function InterviewTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = topics[slug as keyof typeof topics];
  if (!data) notFound();
  return (
    <NotesRenderer
      backHref="/notes-cheat-sheets/interview-revision"
      backLabel="Interview & Quick Revision Notes"
      data={{
        ...data,
        title: slug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      }}
    />
  );
}



