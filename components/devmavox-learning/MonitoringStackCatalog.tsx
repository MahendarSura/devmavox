"use client";

import { useMemo, useState } from "react";

type StackGroup = { id: string; title: string; purpose: string; tools: string[]; practice: string[] };
const groups: StackGroup[] = [
  { id: "metrics", title: "Metrics & time-series databases", purpose: "Measure what is happening: traffic, errors, latency, saturation, infrastructure capacity and trends.", tools: ["Prometheus", "InfluxDB", "OpenTSDB", "Graphite", "VictoriaMetrics"], practice: ["Expose application and host metrics", "Configure scrape or ingestion targets", "Query rates, ratios, percentiles and resource trends", "Investigate missing series and high-cardinality labels"] },
  { id: "logs", title: "Centralized logs", purpose: "Explain what happened using searchable, structured application, platform and audit events.", tools: ["Fluentd", "Graylog", "Elasticsearch", "Loki", "Logstash"], practice: ["Generate structured JSON logs", "Parse, enrich, route and index events", "Filter by service, severity, time and trace ID", "Investigate missing logs, parsing failures and sensitive fields"] },
  { id: "traces", title: "Distributed tracing", purpose: "Find where a request spent time and which dependency introduced an error or delay.", tools: ["Jaeger", "Zipkin", "Grafana Tempo", "Apache SkyWalking", "Pinpoint"], practice: ["Instrument two sample services", "Propagate W3C trace context", "Inspect traces, spans and service dependencies", "Inject downstream latency and locate the slow span"] },
  { id: "telemetry", title: "Telemetry & instrumentation", purpose: "Collect and standardize metrics, logs and traces from applications and infrastructure.", tools: ["OpenTelemetry", "Vector", "Micrometer", "Telegraf", "OpenMetrics"], practice: ["Instrument a sample API", "Configure OTLP receivers and exporters", "Set service.name, environment and version attributes", "Diagnose dropped telemetry and collector back-pressure"] },
  { id: "alerting", title: "Alerting & event management", purpose: "Turn meaningful signals into actionable notifications with ownership and response context.", tools: ["Alertmanager", "Icinga", "Bosun", "Nagios", "Sensu"], practice: ["Create warning and critical rules", "Configure grouping, routing, inhibition and silences", "Simulate firing, notification and recovery", "Reduce noisy alerts and document runbook actions"] },
  { id: "apm", title: "Application performance monitoring", purpose: "Understand user-facing application behaviour across requests, transactions and dependencies.", tools: ["OpenTelemetry instrumentation", "Micrometer", "Prometheus", "Grafana", "Jaeger / Tempo"], practice: ["Measure throughput, error rate and p50/p95/p99 latency", "Inspect slow database and outbound HTTP calls", "Correlate deployments with performance regressions", "Find memory leaks, thread-pool pressure and connection-pool saturation"] },
  { id: "infrastructure", title: "Infrastructure, network & Kubernetes monitoring", purpose: "Observe hosts, containers, clusters, storage, network paths and cloud resources.", tools: ["Node Exporter", "cAdvisor", " kube-state-metrics", "Blackbox Exporter", "CloudWatch"], practice: ["Monitor CPU, memory, disk, network and filesystem", "Inspect node, pod and container health", "Probe DNS, HTTP, TCP, TLS and endpoint availability", "Investigate resource pressure and capacity bottlenecks"] },
  { id: "cloud", title: "Cloud, cost & FinOps monitoring", purpose: "Connect operational health to cloud consumption, budgets and cost efficiency.", tools: ["AWS CloudWatch", "AWS Cost Explorer", "Kubecost", "OpenCost", "Prometheus"], practice: ["Break down spend by service, account, environment and team", "Detect cost anomalies and budget threshold breaches", "Attribute Kubernetes spend to namespaces and workloads", "Right-size over-provisioned resources and verify savings"] },
  { id: "security", title: "Security monitoring & audit", purpose: "Increase security visibility by detecting suspicious activity, configuration drift and risky access.", tools: ["Wazuh", "Elastic Security", "Falco", "CloudTrail", "Grafana / Loki audit views"], practice: ["Inspect authentication and audit events", "Detect suspicious process or container behaviour", "Create a security alert and investigate its evidence", "Protect telemetry access, redact secrets and apply retention controls"] },
  { id: "sre", title: "SRE, reliability & capacity", purpose: "Measure service reliability and make evidence-based release, scaling and incident decisions.", tools: ["Prometheus recording rules", "Grafana SLO views", "Alertmanager", "PagerDuty integrations", "Runbooks"], practice: ["Define SLIs, SLOs and error budgets", "Build multi-window burn-rate alerts", "Run capacity and saturation exercises", "Write incident timelines, ownership and post-incident actions"] },
];

const architecture = [
  ["01", "Application & infrastructure", "Generate requests, logs, host and container activity."],
  ["02", "Exporters & instrumentation", "Expose metrics and emit OTLP telemetry."],
  ["03", "Collection & processing", "Scrape, receive, parse, enrich and route telemetry."],
  ["04", "Storage & correlation", "Store time series, logs and traces with shared service context."],
  ["05", "Queries & dashboards", "Investigate trends, errors, latency and dependencies."],
  ["06", "Alerts & incident response", "Detect impact, notify owners, diagnose, recover and verify."],
];

const outcomes = [
  ["Faster issue detection", "Detect anomalies early and shorten mean time to detect (MTTD)."],
  ["Better application performance", "Find slow transactions, failing dependencies and saturation."],
  ["Infrastructure visibility", "Understand host, container, Kubernetes, network and cloud health."],
  ["Log and trace correlation", "Move from an alert to the exact event and request path."],
  ["Increased security", "Improve audit visibility, identify suspicious behaviour and protect telemetry."],
  ["Cost efficiency", "Find idle resources, waste and unexpected cloud spend."],
  ["Enhanced collaboration", "Share dashboards, incident evidence, runbooks and service ownership."],
  ["Higher reliability", "Reduce downtime through SLOs, actionable alerts and verified recovery."],
];

export default function MonitoringStackCatalog() {
  const [active, setActive] = useState("metrics");
  const [query, setQuery] = useState("");
  const selected = groups.find((group) => group.id === active) ?? groups[0];
  const filtered = useMemo(() => groups.filter((group) => (group.title + " " + group.purpose + " " + group.tools.join(" ")).toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <section className="mt-7 space-y-5">
      <header className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#10243a] via-[#11182b] to-[#251447] p-5 sm:p-7">
        <p className="text-xs font-black uppercase tracking-[.22em] text-cyan-300">Complete observability ecosystem</p>
        <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">DevOps Monitoring Stack</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">Explore the tools and workflows behind metrics, logs, traces, telemetry and alerting. Select a domain to see its tools and hands-on exercises. Tool availability and integrations depend on the environment you deploy.</p>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {groups.slice(0,5).map((group) => <button key={group.id} onClick={() => setActive(group.id)} className={`rounded-xl border px-3 py-3 text-left text-xs font-bold ${active === group.id ? "border-cyan-300 bg-cyan-300/15 text-white" : "border-white/10 bg-black/20 text-slate-300"}`}>{group.title}</button>)}
        </div>
      </header>
      <div className="grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
        <aside className="rounded-2xl border border-white/10 bg-slate-950 p-4">
          <h3 className="font-bold text-white">Monitoring domains</h3>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search domains or tools..." className="mt-3 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400" />
          <div className="mt-3 space-y-2">{filtered.map((group) => <button key={group.id} onClick={() => setActive(group.id)} className={`w-full rounded-xl border p-3 text-left ${active === group.id ? "border-cyan-400/50 bg-cyan-400/10" : "border-white/10 bg-white/[.02]"}`}><span className="block text-sm font-bold text-white">{group.title}</span><span className="mt-1 block text-xs text-slate-400">{group.tools.length} tools / technologies</span></button>)}</div>
        </aside>
        <article className="rounded-2xl border border-cyan-400/20 bg-[#0b1421] p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">Selected learning domain</p>
          <h3 className="mt-2 text-2xl font-black text-white">{selected.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">{selected.purpose}</p>
          <h4 className="mt-6 text-sm font-bold text-white">Tools and technologies</h4>
          <div className="mt-3 flex flex-wrap gap-2">{selected.tools.map((tool) => <span key={tool} className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-semibold text-cyan-100">{tool}</span>)}</div>
          <h4 className="mt-6 text-sm font-bold text-white">Hands-on practice objectives</h4>
          <ol className="mt-3 space-y-3">{selected.practice.map((step, index) => <li key={step} className="flex gap-3 text-sm leading-6 text-slate-300"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-xs font-black text-emerald-300">{index + 1}</span>{step}</li>)}</ol>
          <p className="mt-5 rounded-xl border border-amber-300/20 bg-amber-300/5 p-3 text-xs leading-5 text-amber-100">Practice safely in a lab environment. This catalog describes the ecosystem; it does not claim that every listed external product is installed or connected to this browser simulator.</p>
        </article>
      </div>
      <section className="rounded-2xl border border-violet-400/20 bg-slate-950 p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-violet-300">End-to-end reference architecture</p>
        <h3 className="mt-2 text-xl font-black text-white">From telemetry to incident recovery</h3>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{architecture.map(([number, title, detail]) => <div key={number} className="rounded-xl border border-white/10 bg-white/[.03] p-4"><span className="text-xs font-black text-violet-300">{number}</span><h4 className="mt-2 font-bold text-white">{title}</h4><p className="mt-2 text-xs leading-6 text-slate-400">{detail}</p></div>)}</div>
      </section>
      <section className="rounded-2xl border border-emerald-400/20 bg-slate-950 p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Why teams invest in observability</p>
        <h3 className="mt-2 text-xl font-black text-white">Operational and business outcomes</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{outcomes.map(([title, detail]) => <div key={title} className="rounded-xl border border-white/10 bg-white/[.03] p-4"><h4 className="text-sm font-bold text-white">{title}</h4><p className="mt-2 text-xs leading-6 text-slate-400">{detail}</p></div>)}</div>
      </section>
    </section>
  );
}
