import { notFound } from "next/navigation";
import NotesRenderer from "../../../NotesRenderer";

import topic_data_sources from "../topics/data-sources";
import topic_fundamentals from "../topics/fundamentals";
import topic_import_migration from "../topics/import-migration";
import topic_installation from "../topics/installation";
import topic_lifecycle from "../topics/lifecycle";
import topic_modules from "../topics/modules";
import topic_outputs from "../topics/outputs";
import topic_production from "../topics/production";
import topic_providers from "../topics/providers";
import topic_provisioners from "../topics/provisioners";
import topic_remote_backend from "../topics/remote-backend";
import topic_resources from "../topics/resources";
import topic_security from "../topics/security";
import topic_state_management from "../topics/state-management";
import topic_variables from "../topics/variables";
import topic_workspaces from "../topics/workspaces";

const topics = {
  "data-sources": topic_data_sources,
  "fundamentals": topic_fundamentals,
  "import-migration": topic_import_migration,
  "installation": topic_installation,
  "lifecycle": topic_lifecycle,
  "modules": topic_modules,
  "outputs": topic_outputs,
  "production": topic_production,
  "providers": topic_providers,
  "provisioners": topic_provisioners,
  "remote-backend": topic_remote_backend,
  "resources": topic_resources,
  "security": topic_security,
  "state-management": topic_state_management,
  "variables": topic_variables,
  "workspaces": topic_workspaces,
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
      backHref="/notes-cheat-sheets/troubleshooting/terraform"
      backLabel="terraform Troubleshooting"
    />
  );
}
