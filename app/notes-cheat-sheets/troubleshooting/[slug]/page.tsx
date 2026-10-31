import { notFound } from "next/navigation";
import NotesRenderer from "../../NotesRenderer";
import errorMessages from "../error-messages";
import rootCauses from "../root-causes";
import troubleshootingSteps from "../troubleshooting-steps";

const topics = {
  "error-messages": errorMessages,
  "root-causes": rootCauses,
  "troubleshooting-steps": troubleshootingSteps,
};

export function generateStaticParams() {
  return Object.keys(topics).map((slug) => ({ slug }));
}

export default async function TroubleshootingTopicPage({ params }: { params: Promise<{ slug: string }> }) {
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

