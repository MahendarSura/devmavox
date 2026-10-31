import { notFound } from "next/navigation";
import NotesRenderer from "../../../NotesRenderer";

import topic_artifact_management from "../topics/artifact-management";
import topic_build_automation from "../topics/build-automation";
import topic_deployment_strategies from "../topics/deployment-strategies";
import topic_fundamentals from "../topics/fundamentals";
import topic_github_actions from "../topics/github-actions";
import topic_gitlab_ci from "../topics/gitlab-ci";
import topic_jenkins_pipelines from "../topics/jenkins-pipelines";
import topic_monitoring from "../topics/monitoring";
import topic_pipeline_architecture from "../topics/pipeline-architecture";
import topic_production from "../topics/production";
import topic_rollback from "../topics/rollback";
import topic_secrets_management from "../topics/secrets-management";
import topic_security from "../topics/security";
import topic_source_control from "../topics/source-control";
import topic_testing from "../topics/testing";

const topics = {
  "artifact-management": topic_artifact_management,
  "build-automation": topic_build_automation,
  "deployment-strategies": topic_deployment_strategies,
  "fundamentals": topic_fundamentals,
  "github-actions": topic_github_actions,
  "gitlab-ci": topic_gitlab_ci,
  "jenkins-pipelines": topic_jenkins_pipelines,
  "monitoring": topic_monitoring,
  "pipeline-architecture": topic_pipeline_architecture,
  "production": topic_production,
  "rollback": topic_rollback,
  "secrets-management": topic_secrets_management,
  "security": topic_security,
  "source-control": topic_source_control,
  "testing": topic_testing,
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
      backHref="/notes-cheat-sheets/troubleshooting/cicd"
      backLabel="cicd Troubleshooting"
    />
  );
}
