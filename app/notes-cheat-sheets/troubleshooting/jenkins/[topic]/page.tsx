import { notFound } from "next/navigation";
import NotesRenderer from "../../../NotesRenderer";

import topic_agents_nodes from "../topics/agents-nodes";
import topic_build_troubleshooting from "../topics/build-troubleshooting";
import topic_credentials from "../topics/credentials";
import topic_fundamentals from "../topics/fundamentals";
import topic_installation from "../topics/installation";
import topic_integrations from "../topics/integrations";
import topic_jenkinsfile from "../topics/jenkinsfile";
import topic_jobs from "../topics/jobs";
import topic_pipelines from "../topics/pipelines";
import topic_plugins from "../topics/plugins";
import topic_production from "../topics/production";
import topic_scaling from "../topics/scaling";
import topic_security from "../topics/security";
import topic_webhooks from "../topics/webhooks";

const topics = {
  "agents-nodes": topic_agents_nodes,
  "build-troubleshooting": topic_build_troubleshooting,
  "credentials": topic_credentials,
  "fundamentals": topic_fundamentals,
  "installation": topic_installation,
  "integrations": topic_integrations,
  "jenkinsfile": topic_jenkinsfile,
  "jobs": topic_jobs,
  "pipelines": topic_pipelines,
  "plugins": topic_plugins,
  "production": topic_production,
  "scaling": topic_scaling,
  "security": topic_security,
  "webhooks": topic_webhooks,
};

export function generateStaticParams() {
  return Object.keys(topics).map((topic) => ({ topic }));
}

export default async function ToolTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const data = topics[topic as keyof typeof topics];

  if (!data) notFound();

  return (
    <NotesRenderer
      data={data}
      backHref="/notes-cheat-sheets/troubleshooting/jenkins"
      backLabel="jenkins Troubleshooting"
    />
  );
}
