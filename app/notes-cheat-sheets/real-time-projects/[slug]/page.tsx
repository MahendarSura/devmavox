import { notFound } from "next/navigation";
import NotesRenderer from "../../NotesRenderer";
import projectWorkflows from "../project-workflows";
import deploymentChecklists from "../deployment-checklists";
import cicdRollback from "../cicd-rollback";

const topics = {
  "project-workflows": projectWorkflows,
  "deployment-checklists": deploymentChecklists,
  "cicd-rollback": cicdRollback,
};

export function generateStaticParams() {
  return Object.keys(topics).map((slug) => ({ slug }));
}

export default async function ProjectTopicPage({ params }: { params: Promise<{ slug: string }> }) {
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

