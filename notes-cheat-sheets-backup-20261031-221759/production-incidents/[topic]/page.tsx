import { notFound } from "next/navigation";
import NotesRenderer from "../../../NotesRenderer";

import topic_application_down from "../topics/application-down";
import topic_cloud_outages from "../topics/cloud-outages";
import topic_container_failure from "../topics/container-failure";
import topic_database_failure from "../topics/database-failure";
import topic_deployment_failure from "../topics/deployment-failure";
import topic_disaster_recovery from "../topics/disaster-recovery";
import topic_disk_full from "../topics/disk-full";
import topic_high_cpu from "../topics/high-cpu";
import topic_high_memory from "../topics/high-memory";
import topic_incident_management from "../topics/incident-management";
import topic_kubernetes_incidents from "../topics/kubernetes-incidents";
import topic_network_outage from "../topics/network-outage";
import topic_postmortems from "../topics/postmortems";
import topic_root_cause_analysis from "../topics/root-cause-analysis";
import topic_security_incidents from "../topics/security-incidents";
import topic_server_down from "../topics/server-down";

const topics = {
  "application-down": topic_application_down,
  "cloud-outages": topic_cloud_outages,
  "container-failure": topic_container_failure,
  "database-failure": topic_database_failure,
  "deployment-failure": topic_deployment_failure,
  "disaster-recovery": topic_disaster_recovery,
  "disk-full": topic_disk_full,
  "high-cpu": topic_high_cpu,
  "high-memory": topic_high_memory,
  "incident-management": topic_incident_management,
  "kubernetes-incidents": topic_kubernetes_incidents,
  "network-outage": topic_network_outage,
  "postmortems": topic_postmortems,
  "root-cause-analysis": topic_root_cause_analysis,
  "security-incidents": topic_security_incidents,
  "server-down": topic_server_down,
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
      backHref="/notes-cheat-sheets/troubleshooting/production-incidents"
      backLabel="production-incidents Troubleshooting"
    />
  );
}
