import { notFound } from "next/navigation";
import NotesRenderer from "../../../NotesRenderer";

import topic_chart_structure from "../topics/chart-structure";
import topic_charts from "../topics/charts";
import topic_debugging from "../topics/debugging";
import topic_dependencies from "../topics/dependencies";
import topic_fundamentals from "../topics/fundamentals";
import topic_hooks from "../topics/hooks";
import topic_installation from "../topics/installation";
import topic_production from "../topics/production";
import topic_releases from "../topics/releases";
import topic_repositories from "../topics/repositories";
import topic_security from "../topics/security";
import topic_templates from "../topics/templates";
import topic_upgrade_rollback from "../topics/upgrade-rollback";
import topic_values from "../topics/values";

const topics = {
  "chart-structure": topic_chart_structure,
  "charts": topic_charts,
  "debugging": topic_debugging,
  "dependencies": topic_dependencies,
  "fundamentals": topic_fundamentals,
  "hooks": topic_hooks,
  "installation": topic_installation,
  "production": topic_production,
  "releases": topic_releases,
  "repositories": topic_repositories,
  "security": topic_security,
  "templates": topic_templates,
  "upgrade-rollback": topic_upgrade_rollback,
  "values": topic_values,
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
      backHref="/notes-cheat-sheets/troubleshooting/helm"
      backLabel="helm Troubleshooting"
    />
  );
}
