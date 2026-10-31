import { notFound } from "next/navigation";
import NotesRenderer from "../../../NotesRenderer";

import topic_502_503_errors from "../topics/502-503-errors";
import topic_dns_routing from "../topics/dns-routing";
import topic_fundamentals from "../topics/fundamentals";
import topic_installation from "../topics/installation";
import topic_load_balancing from "../topics/load-balancing";
import topic_logs from "../topics/logs";
import topic_performance from "../topics/performance";
import topic_permissions from "../topics/permissions";
import topic_production from "../topics/production";
import topic_reverse_proxy from "../topics/reverse-proxy";
import topic_security from "../topics/security";
import topic_ssl_tls from "../topics/ssl-tls";
import topic_virtual_hosts from "../topics/virtual-hosts";
import topic_web_server_configuration from "../topics/web-server-configuration";

const topics = {
  "502-503-errors": topic_502_503_errors,
  "dns-routing": topic_dns_routing,
  "fundamentals": topic_fundamentals,
  "installation": topic_installation,
  "load-balancing": topic_load_balancing,
  "logs": topic_logs,
  "performance": topic_performance,
  "permissions": topic_permissions,
  "production": topic_production,
  "reverse-proxy": topic_reverse_proxy,
  "security": topic_security,
  "ssl-tls": topic_ssl_tls,
  "virtual-hosts": topic_virtual_hosts,
  "web-server-configuration": topic_web_server_configuration,
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
      backHref="/notes-cheat-sheets/troubleshooting/nginx-apache"
      backLabel="nginx-apache Troubleshooting"
    />
  );
}
