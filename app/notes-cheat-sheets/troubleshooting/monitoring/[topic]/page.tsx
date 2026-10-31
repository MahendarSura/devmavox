import { notFound } from "next/navigation";
import NotesRenderer from "../../../NotesRenderer";

import topic_alerting from "../topics/alerting";
import topic_alertmanager from "../topics/alertmanager";
import topic_centralized_logging from "../topics/centralized-logging";
import topic_dashboards from "../topics/dashboards";
import topic_distributed_tracing from "../topics/distributed-tracing";
import topic_fundamentals from "../topics/fundamentals";
import topic_grafana from "../topics/grafana";
import topic_infrastructure_monitoring from "../topics/infrastructure-monitoring";
import topic_kubernetes_monitoring from "../topics/kubernetes-monitoring";
import topic_logs from "../topics/logs";
import topic_metrics from "../topics/metrics";
import topic_node_exporter from "../topics/node-exporter";
import topic_performance from "../topics/performance";
import topic_production from "../topics/production";
import topic_prometheus from "../topics/prometheus";

const topics = {
  "alerting": topic_alerting,
  "alertmanager": topic_alertmanager,
  "centralized-logging": topic_centralized_logging,
  "dashboards": topic_dashboards,
  "distributed-tracing": topic_distributed_tracing,
  "fundamentals": topic_fundamentals,
  "grafana": topic_grafana,
  "infrastructure-monitoring": topic_infrastructure_monitoring,
  "kubernetes-monitoring": topic_kubernetes_monitoring,
  "logs": topic_logs,
  "metrics": topic_metrics,
  "node-exporter": topic_node_exporter,
  "performance": topic_performance,
  "production": topic_production,
  "prometheus": topic_prometheus,
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
      backHref="/notes-cheat-sheets/troubleshooting/monitoring"
      backLabel="monitoring Troubleshooting"
    />
  );
}
