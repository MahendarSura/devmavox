import { notFound } from "next/navigation";
import NotesRenderer from "../../../NotesRenderer";

import topic_compliance from "../topics/compliance";
import topic_container_security from "../topics/container-security";
import topic_devsecops from "../topics/devsecops";
import topic_fundamentals from "../topics/fundamentals";
import topic_iam_access_control from "../topics/iam-access-control";
import topic_image_scanning from "../topics/image-scanning";
import topic_incident_response from "../topics/incident-response";
import topic_kubernetes_security from "../topics/kubernetes-security";
import topic_linux_security from "../topics/linux-security";
import topic_network_security from "../topics/network-security";
import topic_production from "../topics/production";
import topic_rbac from "../topics/rbac";
import topic_secrets_management from "../topics/secrets-management";
import topic_ssh_security from "../topics/ssh-security";
import topic_tls_certificates from "../topics/tls-certificates";
import topic_vulnerability_scanning from "../topics/vulnerability-scanning";

const topics = {
  "compliance": topic_compliance,
  "container-security": topic_container_security,
  "devsecops": topic_devsecops,
  "fundamentals": topic_fundamentals,
  "iam-access-control": topic_iam_access_control,
  "image-scanning": topic_image_scanning,
  "incident-response": topic_incident_response,
  "kubernetes-security": topic_kubernetes_security,
  "linux-security": topic_linux_security,
  "network-security": topic_network_security,
  "production": topic_production,
  "rbac": topic_rbac,
  "secrets-management": topic_secrets_management,
  "ssh-security": topic_ssh_security,
  "tls-certificates": topic_tls_certificates,
  "vulnerability-scanning": topic_vulnerability_scanning,
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
      backHref="/notes-cheat-sheets/troubleshooting/security"
      backLabel="security Troubleshooting"
    />
  );
}
