import { notFound } from "next/navigation";
import NotesRenderer from "../../../NotesRenderer";

import topic_backup_restore from "../topics/backup-restore";
import topic_connections from "../topics/connections";
import topic_fundamentals from "../topics/fundamentals";
import topic_indexing_performance from "../topics/indexing-performance";
import topic_installation_configuration from "../topics/installation-configuration";
import topic_mongodb from "../topics/mongodb";
import topic_monitoring from "../topics/monitoring";
import topic_mysql from "../topics/mysql";
import topic_postgresql from "../topics/postgresql";
import topic_production from "../topics/production";
import topic_redis from "../topics/redis";
import topic_replication from "../topics/replication";
import topic_security from "../topics/security";
import topic_storage from "../topics/storage";
import topic_users_permissions from "../topics/users-permissions";

const topics = {
  "backup-restore": topic_backup_restore,
  "connections": topic_connections,
  "fundamentals": topic_fundamentals,
  "indexing-performance": topic_indexing_performance,
  "installation-configuration": topic_installation_configuration,
  "mongodb": topic_mongodb,
  "monitoring": topic_monitoring,
  "mysql": topic_mysql,
  "postgresql": topic_postgresql,
  "production": topic_production,
  "redis": topic_redis,
  "replication": topic_replication,
  "security": topic_security,
  "storage": topic_storage,
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
      backHref="/notes-cheat-sheets/troubleshooting/database"
      backLabel="database Troubleshooting"
    />
  );
}
