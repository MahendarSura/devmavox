import { notFound } from "next/navigation";
import NotesRenderer from "../../../NotesRenderer";

import topic_disk_storage from "../topics/disk-storage";
import topic_filesystem from "../topics/filesystem";
import topic_fundamentals from "../topics/fundamentals";
import topic_installation from "../topics/installation";
import topic_logs from "../topics/logs";
import topic_networking from "../topics/networking";
import topic_package_management from "../topics/package-management";
import topic_performance from "../topics/performance";
import topic_processes from "../topics/processes";
import topic_production from "../topics/production";
import topic_security from "../topics/security";
import topic_services from "../topics/services";
import topic_shell_scripting from "../topics/shell-scripting";
import topic_users_permissions from "../topics/users-permissions";

const topics = {
  "disk-storage": topic_disk_storage,
  "filesystem": topic_filesystem,
  "fundamentals": topic_fundamentals,
  "installation": topic_installation,
  "logs": topic_logs,
  "networking": topic_networking,
  "package-management": topic_package_management,
  "performance": topic_performance,
  "processes": topic_processes,
  "production": topic_production,
  "security": topic_security,
  "services": topic_services,
  "shell-scripting": topic_shell_scripting,
  "users-permissions": topic_users_permissions,
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
      backHref="/notes-cheat-sheets/troubleshooting/linux"
      backLabel="linux Troubleshooting"
    />
  );
}
