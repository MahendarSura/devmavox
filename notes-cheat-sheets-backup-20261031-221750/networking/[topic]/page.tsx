import { notFound } from "next/navigation";
import NotesRenderer from "../../../NotesRenderer";

import topic_connectivity_troubleshooting from "../topics/connectivity-troubleshooting";
import topic_dhcp from "../topics/dhcp";
import topic_dns from "../topics/dns";
import topic_firewalls from "../topics/firewalls";
import topic_fundamentals from "../topics/fundamentals";
import topic_http_https from "../topics/http-https";
import topic_ip_addressing from "../topics/ip-addressing";
import topic_load_balancing from "../topics/load-balancing";
import topic_osi_tcp_ip from "../topics/osi-tcp-ip";
import topic_ports_protocols from "../topics/ports-protocols";
import topic_production from "../topics/production";
import topic_routing from "../topics/routing";
import topic_subnetting from "../topics/subnetting";
import topic_tcp_udp from "../topics/tcp-udp";
import topic_vpn from "../topics/vpn";

const topics = {
  "connectivity-troubleshooting": topic_connectivity_troubleshooting,
  "dhcp": topic_dhcp,
  "dns": topic_dns,
  "firewalls": topic_firewalls,
  "fundamentals": topic_fundamentals,
  "http-https": topic_http_https,
  "ip-addressing": topic_ip_addressing,
  "load-balancing": topic_load_balancing,
  "osi-tcp-ip": topic_osi_tcp_ip,
  "ports-protocols": topic_ports_protocols,
  "production": topic_production,
  "routing": topic_routing,
  "subnetting": topic_subnetting,
  "tcp-udp": topic_tcp_udp,
  "vpn": topic_vpn,
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
      backHref="/notes-cheat-sheets/troubleshooting/networking"
      backLabel="networking Troubleshooting"
    />
  );
}
