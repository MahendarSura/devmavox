import { notFound } from "next/navigation";
import NotesRenderer from "../../../NotesRenderer";

import topic_architecture from "../topics/architecture";
import topic_autoscaling from "../topics/autoscaling";
import topic_cluster_components from "../topics/cluster-components";
import topic_cluster_upgrades from "../topics/cluster-upgrades";
import topic_configmaps_secrets from "../topics/configmaps-secrets";
import topic_deployments from "../topics/deployments";
import topic_fundamentals from "../topics/fundamentals";
import topic_dns from "../topics/dns";
import topic_helm from "../topics/helm";
import topic_ingress from "../topics/ingress";
import topic_installation_cluster_access from "../topics/installation-cluster-access";
import topic_monitoring from "../topics/monitoring";
import topic_networking from "../topics/networking";
import topic_operators_crds from "../topics/operators-crds";
import topic_pods from "../topics/pods";
import topic_production from "../topics/production";
import topic_replicasets from "../topics/replicasets";
import topic_scheduling from "../topics/scheduling";
import topic_security from "../topics/security";
import topic_services from "../topics/services";
import topic_statefulsets_daemonsets from "../topics/statefulsets-daemonsets";
import topic_storage from "../topics/storage";
import topic_troubleshooting_command_reference from "../topics/troubleshooting-command-reference";

const topics = {
  "architecture": topic_architecture,
  "autoscaling": topic_autoscaling,
  "cluster-components": topic_cluster_components,
  "cluster-upgrades": topic_cluster_upgrades,
  "configmaps-secrets": topic_configmaps_secrets,
  "deployments": topic_deployments,
  "fundamentals": topic_fundamentals,
  "dns": topic_dns,
  "helm": topic_helm,
  "ingress": topic_ingress,
  "installation-cluster-access": topic_installation_cluster_access,
  "monitoring": topic_monitoring,
  "networking": topic_networking,
  "operators-crds": topic_operators_crds,
  "pods": topic_pods,
  "production": topic_production,
  "replicasets": topic_replicasets,
  "scheduling": topic_scheduling,
  "security": topic_security,
  "services": topic_services,
  "statefulsets-daemonsets": topic_statefulsets_daemonsets,
  "storage": topic_storage,
  "troubleshooting-command-reference": topic_troubleshooting_command_reference,
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
      backHref="/notes-cheat-sheets/troubleshooting/kubernetes"
      backLabel="Kubernetes Troubleshooting"
    />
  );
}
