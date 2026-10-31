import { notFound } from "next/navigation";
import NotesRenderer from "../../NotesRenderer";
import yamlFiles from "../yaml-files";
import configurationExamples from "../configuration-examples";
import bestPractices from "../best-practices";

const topics = {
  "yaml-files": yamlFiles,
  "configuration-examples": configurationExamples,
  "best-practices": bestPractices,
};

export function generateStaticParams() {
  return Object.keys(topics).map((slug) => ({ slug }));
}

export default async function YamlTopicPage({ params }: { params: Promise<{ slug: string }> }) {
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

