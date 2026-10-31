import { notFound } from "next/navigation";
import NotesRenderer from "../../../NotesRenderer";

import topic_applications from "../topics/applications";
import topic_applicationsets from "../topics/applicationsets";
import topic_architecture from "../topics/architecture";
import topic_automated_deployment from "../topics/automated-deployment";
import topic_fundamentals from "../topics/fundamentals";
import topic_health_status from "../topics/health-status";
import topic_installation from "../topics/installation";
import topic_notifications from "../topics/notifications";
import topic_production from "../topics/production";
import topic_projects_rbac from "../topics/projects-rbac";
import topic_repositories from "../topics/repositories";
import topic_rollback from "../topics/rollback";
import topic_secrets from "../topics/secrets";
import topic_sync_waves_hooks from "../topics/sync-waves-hooks";
import topic_sync from "../topics/sync";

const topics = {
  "applications": topic_applications,
  "applicationsets": topic_applicationsets,
  "architecture": topic_architecture,
  "automated-deployment": topic_automated_deployment,
  "fundamentals": topic_fundamentals,
  "health-status": topic_health_status,
  "installation": topic_installation,
  "notifications": topic_notifications,
  "production": topic_production,
  "projects-rbac": topic_projects_rbac,
  "repositories": topic_repositories,
  "rollback": topic_rollback,
  "secrets": topic_secrets,
  "sync-waves-hooks": topic_sync_waves_hooks,
  "sync": topic_sync,
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
      backHref="/notes-cheat-sheets/troubleshooting/argocd"
      backLabel="argocd Troubleshooting"
    />
  );
}
