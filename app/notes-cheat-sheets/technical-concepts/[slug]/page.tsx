import { notFound } from "next/navigation";
import NotesRenderer from "../../NotesRenderer";
import howItWorks from "../how-it-works";
import architectureFlow from "../Architecture & Flow";
import realTimeExamples from "../Real-Time Examples";

const topics = {
  "how-it-works": howItWorks,
  "architecture-flow": architectureFlow,
  "real-time-examples": realTimeExamples,
};

export function generateStaticParams() {
  return Object.keys(topics).map((slug) => ({ slug }));
}

export default async function TechnicalTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = topics[slug as keyof typeof topics];
  if (!data) notFound();
  return (
    <NotesRenderer
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

