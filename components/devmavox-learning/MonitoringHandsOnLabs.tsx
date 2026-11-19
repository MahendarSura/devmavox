"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { parse as parseYaml } from "yaml";
import { runAlertLab, runGrafanaLab, runKubernetesLab, runLogsLab, runPromqlLab, runTracesLab } from "@/lib/monitoring-lab-engine";

type LabId = "promql" | "grafana" | "logs" | "traces" | "alerts" | "kubernetes";
type Lab = { id: LabId; title: string; description: string; task: string; starter: string; };
const labs: Lab[] = [
  { id: "promql", title: "Prometheus + PromQL Lab", description: "Scrape targets, explore time-series metrics, write PromQL and investigate service health.", task: "Checkout API traffic has increased. Calculate request rate and 5xx error ratio, then identify whether the service is healthy.", starter: "# 1. Request rate\nsum(rate(http_requests_total[5m]))\n\n# 2. p95 latency\nhttp_request_duration_seconds_p95\n\n# 3. 5xx error ratio\nsum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m]))" },
  { id: "grafana", title: "Grafana Dashboard Lab", description: "Build a dashboard from metrics, choose visualizations and verify panels against service signals.", task: "Create an operations dashboard with request rate, error ratio, p95 latency and CPU panels. Set a useful threshold for latency.", starter: "title: Checkout Operations\npanels:\n  - title: Request rate\n    type: timeseries\n    query: sum(rate(http_requests_total[5m]))\n  - title: 5xx error ratio\n    type: timeseries\n    query: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))\n  - title: p95 latency\n    type: gauge\n    query: http_request_duration_seconds_p95\n    thresholds:\n      - value: 1\n        color: red\n  - title: CPU utilization\n    type: timeseries\n    query: process_cpu_usage_percent" },
  { id: "logs", title: "Logs Investigation Lab", description: "Search structured logs, filter by severity and correlate request IDs, services and trace IDs.", task: "Users report intermittent checkout failures. Find the ERROR event, correlate the request ID and identify the database timeout as the root cause.", starter: "request_id=req-1042" },
  { id: "traces", title: "Distributed Tracing Lab", description: "Inspect trace waterfalls, compare spans and locate the dependency causing latency.", task: "A checkout request takes 1.84 seconds. Inspect the spans and identify which downstream dependency consumes most of the time.", starter: "trace_id=tr-8f21" },
  { id: "alerts", title: "Alerting & Incident Lab", description: "Write alert conditions, inject incidents, inspect firing state and verify recovery.", task: "Create a critical alert when checkout p95 latency exceeds one second for two evaluations. Inject a latency incident, investigate and recover.", starter: "groups:\n  - name: checkout.rules\n    rules:\n      - alert: CheckoutHighLatency\n        expr: http_request_duration_seconds_p95 > 1\n        for: 2m\n        labels:\n          severity: critical\n          service: checkout\n        annotations:\n          summary: Checkout p95 latency is too high\n          runbook: https://runbooks.example/checkout-latency" },
  { id: "kubernetes", title: "Kubernetes Monitoring Lab", description: "Inspect node, pod and container signals; investigate restarts, resource pressure and unavailable replicas.", task: "The checkout deployment has one unavailable replica and repeated restarts. Inspect pod events and node pressure, then restore healthy replicas.", starter: "kubectl get nodes\nkubectl get pods -n production\nkubectl describe pod checkout-7c9d -n production\nkubectl get events -n production --sort-by=.lastTimestamp\nkubectl rollout status deployment/checkout -n production" },
];

const logRows = [
  { time: "12:04:01.120", level: "INFO", service: "gateway", request: "req-1042", message: "Request received GET /checkout", trace: "tr-8f21" },
  { time: "12:04:01.141", level: "INFO", service: "auth", request: "req-1042", message: "JWT validation succeeded", trace: "tr-8f21" },
  { time: "12:04:02.002", level: "ERROR", service: "payment-db", request: "req-1042", message: "DatabaseTimeout after 3000ms", trace: "tr-8f21" },
  { time: "12:04:02.018", level: "WARN", service: "checkout", request: "req-1042", message: "Retry attempt 2/3", trace: "tr-8f21" },
  { time: "12:04:03.004", level: "ERROR", service: "checkout", request: "req-1042", message: "HTTP 503 returned to client", trace: "tr-8f21" },
  { time: "12:04:04.300", level: "INFO", service: "catalog", request: "req-1043", message: "GET /products completed 200", trace: "tr-8f22" },
];

export default function MonitoringHandsOnLabs() {
  const [active, setActive] = useState<LabId>("promql");
  const [code, setCode] = useState(labs[0].starter);
  const [incident, setIncident] = useState(false);
  const [incidentObserved, setIncidentObserved] = useState(false);
  const [recoveryApplied, setRecoveryApplied] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [result, setResult] = useState("");
  const [resultDetail, setResultDetail] = useState("");
  const [passed, setPassed] = useState<string[]>([]);
  const [panels, setPanels] = useState(["Request rate", "5xx error ratio", "p95 latency"]);
  const [panelMetric, setPanelMetric] = useState("CPU utilization");
  const [logFilter, setLogFilter] = useState("ERROR");
  const [alertThreshold, setAlertThreshold] = useState(1);
  const [alertTicks, setAlertTicks] = useState(0);
  const [alertWasFiring, setAlertWasFiring] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [lastEvidence, setLastEvidence] = useState<Record<string, string | number | boolean>>({});
  const [podHealthy, setPodHealthy] = useState(true);
  const [notes, setNotes] = useState("Investigate the signal, correlate evidence, apply a safe fix, and verify service recovery.");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("devmavox-monitoring-labs-v1");
      if (!saved) return;
      const parsed = JSON.parse(saved) as { passed?: string[]; notes?: string; drafts?: Record<string, string> };
      if (Array.isArray(parsed.passed)) setPassed(parsed.passed.filter((id): id is LabId => labs.some((item) => item.id === id)));
      if (typeof parsed.notes === "string") setNotes(parsed.notes);
      if (parsed.drafts && typeof parsed.drafts === "object") setDrafts(parsed.drafts);
    } catch {
      // Storage is optional; the simulator remains usable without it.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("devmavox-monitoring-labs-v1", JSON.stringify({ passed, notes, drafts }));
    } catch {
      // Ignore browser storage restrictions.
    }
  }, [passed, notes, drafts]);

  useEffect(() => { setDrafts((current) => ({ ...current, [active]: code })); }, [active, code]);

  const lab = labs.find((item) => item.id === active)!;
  const logMatches = useMemo(() => logRows.filter((row) => (!logFilter || row.level.includes(logFilter.toUpperCase()) || row.service.includes(logFilter.toLowerCase()) || row.request.includes(logFilter) || row.trace.includes(logFilter))), [logFilter]);
  const metrics = [
    { name: "Request rate", value: incident ? "42.6" : "18.4", unit: "req/s", width: incident ? "82%" : "38%" },
    { name: "5xx error ratio", value: incident ? "4.8" : "0.32", unit: "%", width: incident ? "78%" : "8%" },
    { name: "p95 latency", value: incident ? "1.84" : "0.24", unit: "s", width: incident ? "92%" : "16%" },
    { name: "CPU utilization", value: incident ? "94" : "38", unit: "%", width: incident ? "94%" : "38%" },
  ];

  function choose(id: LabId) {
    setActive(id); setCode(drafts[id] ?? labs.find((item) => item.id === id)!.starter);
    setIncident(false); setIncidentObserved(false); setRecoveryApplied(false); setPodHealthy(true); setAlertTicks(0); setAlertWasFiring(false); setLastEvidence({});
    setExecuted(false); setResult(""); setResultDetail("");
    document.getElementById("active-lab-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function execute() {
    setExecuted(true);
    let execution;
    if (active === "promql") execution = runPromqlLab(code, incident);
    else if (active === "grafana") execution = runGrafanaLab(code, parseYaml);
    else if (active === "logs") execution = runLogsLab(code, incident, recoveryApplied);
    else if (active === "traces") execution = runTracesLab(code, incident, recoveryApplied);
    else if (active === "alerts") {
      const nextTicks = incident ? alertTicks + 1 : 0;
      setAlertTicks(nextTicks);
      execution = runAlertLab(code, incident, nextTicks, parseYaml, alertWasFiring);
      if (execution.evidence.firing === true) setAlertWasFiring(true);
    } else execution = runKubernetesLab(code, podHealthy);
    setResult(execution.output);
    setResultDetail(execution.detail);
    setLastEvidence(execution.evidence);
    if (active === "grafana") {
      const parsed = (() => { try { return parseYaml(code) as {panels?: {title?: string}[]}; } catch { return {panels: []}; } })();
      setPanels((parsed.panels ?? []).map((panel) => panel.title ?? "Untitled"));
    }
  }
  function verify() {
    if (!executed || !Object.keys(lastEvidence).length) { setResultDetail("Execute the submitted work first. Verification only evaluates fresh simulator evidence."); return; }
    const success = active === "promql"
      ? incidentObserved && recoveryApplied && lastEvidence.allValid === true && lastEvidence.hasRate === true && lastEvidence.hasLatency === true && lastEvidence.hasErrorRatio === true
      : active === "grafana" ? incidentObserved && recoveryApplied && lastEvidence.valid === true && Number(lastEvidence.panelCount) >= 4 && lastEvidence.hasLatencyThreshold === true
      : active === "logs" ? incidentObserved && recoveryApplied && lastEvidence.rootCause === true && lastEvidence.has503 === true && lastEvidence.recovered === true
      : active === "traces" ? incidentObserved && recoveryApplied && lastEvidence.criticalPath === true && Number(lastEvidence.dbMs) > 1000 && lastEvidence.recovered === true
      : active === "alerts" ? lastEvidence.resolved === true
      : incidentObserved && recoveryApplied && lastEvidence.podsHealthy === true && Number(lastEvidence.recognized) === Number(lastEvidence.total) && result.includes("successfully rolled out");
    if (success) setPassed((current) => current.includes(active) ? current : [...current, active]);
    setResultDetail((current) => current + (success ? " · Verification passed from simulator evidence." : " · Verification failed: simulator evidence does not satisfy the task yet."));
  }

  function addGrafanaPanel() {
    try {
      const parsed = parseYaml(code) as { title?: string; panels?: { title?: string; type?: string; query?: string; thresholds?: { value?: number; color?: string }[] }[] };
      const existing = Array.isArray(parsed.panels) ? parsed.panels : [];
      const queryByTitle: Record<string, string> = {
        "CPU utilization": "process_cpu_usage_percent",
        "Request rate": "sum(rate(http_requests_total[5m]))",
        "p95 latency": "http_request_duration_seconds_p95",
        "5xx error ratio": 'sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))',
        "Memory utilization": "node_memory_usage_percent",
      };
      const panel = { title: panelMetric, type: panelMetric === "p95 latency" ? "gauge" : "timeseries", query: queryByTitle[panelMetric] || "up", ...(panelMetric === "p95 latency" ? { thresholds: [{ value: 1, color: "red" }] } : {}) };
      const next = existing.some((item) => item.title === panel.title) ? existing : [...existing, panel];
      const yaml = "title: " + (parsed.title || "Checkout Operations") + "\npanels:\n" + next.map((item) => "  - title: " + (item.title || "Untitled") + "\n    type: " + (item.type || "timeseries") + "\n    query: " + (item.query || "up") + (item.thresholds?.length ? "\n    thresholds:\n" + item.thresholds.map((threshold) => "      - value: " + threshold.value + "\n        color: " + (threshold.color || "red")).join("\n") : "")).join("\n");
      setCode(yaml);
      setPanels(next.map((item) => item.title || "Untitled"));
      setExecuted(false);
      setResultDetail("Panel added to the editable dashboard YAML. Execute to validate and evaluate every panel.");
    } catch (error) {
      setResultDetail(error instanceof Error ? error.message : "Fix the dashboard YAML before adding a panel.");
    }
  }

  return (
    <main className="min-h-screen bg-[#080b13] px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><Link href="/monitoring-playground" className="text-sm text-cyan-300 hover:text-cyan-200">← Monitoring Playground</Link><p className="mt-3 text-xs font-bold uppercase tracking-[.25em] text-emerald-300">Observability training environment</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Monitoring Playground – Hands-on Labs</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">Production-style scenarios with editable practice, executable browser simulation, telemetry views, fault injection and verification.</p></div><div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3"><p className="text-2xl font-black text-emerald-300">{passed.length}/6</p><p className="text-xs text-slate-400">Labs verified</p></div></div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{labs.map((item, index) => <button key={item.id} onClick={() => choose(item.id)} className={`rounded-2xl border p-4 text-left transition ${active === item.id ? "border-cyan-300/70 bg-cyan-300/10" : "border-white/10 bg-slate-900/70 hover:border-white/25"}`}><div className="flex items-center justify-between"><span className="text-xs font-black text-cyan-300">LAB 0{index + 1}</span><span className={`rounded-full px-2 py-1 text-[10px] ${passed.includes(item.id) ? "bg-emerald-400/15 text-emerald-300" : "bg-white/5 text-slate-400"}`}>{passed.includes(item.id) ? "VERIFIED" : "NOT STARTED"}</span></div><h2 className="mt-3 font-bold text-white">{item.title}</h2><p className="mt-2 text-xs leading-5 text-slate-400">{item.description}</p></button>)}</div>
        <section id="active-lab-workspace" className="mt-5 scroll-mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,.85fr)]">
          <div className="space-y-4">
            <article className="rounded-2xl border border-orange-400/20 bg-slate-900/70 p-5"><p className="text-xs font-black uppercase tracking-widest text-orange-300">01 · Task</p><h2 className="mt-2 text-xl font-bold text-white">{lab.title}</h2><p className="mt-3 text-sm leading-7 text-slate-300">{lab.task}</p><div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4"><p className="text-xs font-bold uppercase tracking-wider text-amber-300">Student workflow</p><ol className="mt-2 list-decimal space-y-1 pl-5 text-xs leading-5 text-slate-300"><li>Read the task and inspect the dashboard or evidence panel.</li><li>Edit the starter query, YAML or kubectl commands in the workspace.</li><li>Run it and read every line of the output; use Inject production failure to compare unhealthy signals.</li><li>Write your finding in investigation notes, apply recovery, run again and verify.</li></ol><p className="mt-3 text-xs text-slate-400">Tip: the starter workspace is intentionally configured to meet this lab task. Change one value at a time to learn how validation and output respond.</p></div></article>
            <article className="rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-5"><div className="flex flex-wrap items-center justify-between gap-2"><div><p className="text-xs font-black uppercase tracking-widest text-cyan-300">02 · Practice</p><h2 className="mt-2 text-lg font-bold text-white">Configuration / query editor</h2></div><span className="text-xs text-slate-500">Editable workspace</span></div>
              <textarea value={code} onChange={(event) => { setCode(event.target.value); setExecuted(false); }} rows={active === "kubernetes" ? 6 : 5} spellCheck={false} className="mt-4 w-full rounded-xl border border-white/10 bg-[#050811] p-4 font-mono text-xs leading-6 text-emerald-200 outline-none focus:border-cyan-400" />
              <div className="mt-3 flex flex-wrap gap-2"><button onClick={execute} className="rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-black text-slate-950 hover:bg-emerald-300">▶ Run / Execute</button><button onClick={() => { setIncident((value) => !value); if (!incident) { setIncidentObserved(true); setRecoveryApplied(false); } setAlertTicks(0); if (active === "kubernetes") setPodHealthy(incident); setExecuted(false); setLastEvidence({}); setResult(""); setResultDetail(""); }} className={`rounded-xl border px-4 py-2.5 text-sm font-bold ${incident ? "border-rose-400/40 bg-rose-400/10 text-rose-200" : "border-rose-400/30 text-rose-200"}`}>{incident ? "Clear injected incident" : "Inject production failure"}</button><button onClick={verify} className="rounded-xl border border-cyan-400/30 px-4 py-2.5 text-sm font-bold text-cyan-200">✓ Verify task</button></div>
            </article>
            <article className="rounded-2xl border border-violet-400/20 bg-slate-900/70 p-5"><p className="text-xs font-black uppercase tracking-widest text-violet-300">05 · Troubleshoot</p><h2 className="mt-2 text-lg font-bold text-white">Incident investigation notes</h2><textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} className="mt-3 w-full rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-slate-200 outline-none focus:border-violet-400" /><div className="mt-3 flex flex-wrap items-center gap-3"><button onClick={() => { setIncident(false); setRecoveryApplied(true); setPodHealthy(true); setAlertTicks(0); setExecuted(false); setLastEvidence({}); setResult(""); setResultDetail("Recovery action applied in the training simulator. Execute again to verify the healthy state."); }} className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-200">Apply recovery action</button><span className="text-xs text-slate-500">Use evidence from outputs before recovery.</span></div></article>
          </div>
          <div className="space-y-4">
            <article className="rounded-2xl border border-white/10 bg-[#0d1421] p-5"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-widest text-slate-400">Live telemetry view</p><h2 className="mt-1 text-lg font-bold text-white">Service health dashboard</h2></div><span className="flex items-center gap-2 text-[10px] font-bold text-emerald-300"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"/>SIMULATED LIVE</span></div><div className="mt-4 grid grid-cols-2 gap-2">{metrics.map((metric) => <div key={metric.name} className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-[11px] text-slate-400">{metric.name}</p><p className="mt-1 text-xl font-black text-white">{metric.value}<span className="ml-1 text-[10px] text-slate-500">{metric.unit}</span></p><div className="mt-3 h-1.5 rounded-full bg-slate-800"><div className={`h-full rounded-full ${incident ? "bg-rose-400" : "bg-emerald-400"}`} style={{ width: metric.width }}/></div></div>)}</div><div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3"><div className="flex items-center justify-between"><span className="text-xs font-bold text-slate-300">Metric trend · last 5 intervals</span><span className="text-[10px] text-slate-500">CPU %</span></div><div className="mt-3 flex h-20 items-end gap-2">{(incident ? [35,42,55,74,94] : [30,34,32,36,38]).map((v,i)=><div key={i} className="flex-1 rounded-t bg-cyan-400/70" style={{height:v+"%"}} title={v+"%"}/>)}</div></div></article>
            {active === "grafana" && <article className="rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-4"><h3 className="font-bold text-white">Dashboard panel builder</h3><div className="mt-3 flex gap-2"><select value={panelMetric} onChange={(event) => setPanelMetric(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/30 p-2 text-xs text-white"><option>CPU utilization</option><option>Request rate</option><option>p95 latency</option><option>5xx error ratio</option><option>Memory utilization</option></select><button onClick={addGrafanaPanel} className="rounded-lg bg-cyan-400 px-3 py-2 text-xs font-bold text-slate-950">Add panel</button></div><div className="mt-3 grid grid-cols-2 gap-2">{panels.map((panel)=><div key={panel} className="rounded-lg border border-white/10 bg-black/20 p-3 text-xs text-cyan-100">{panel}<div className="mt-3 flex h-8 items-end gap-1">{[30,50,42,70,58,85].map((v,i)=><span key={i} className="flex-1 rounded-t bg-cyan-400/60" style={{height:v+"%"}}/>)}</div></div>)}</div></article>}
            {active === "logs" && <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><h3 className="font-bold text-white">Logs explorer</h3><input value={active === "logs" ? code : logFilter} onChange={(event)=>{ setLogFilter(event.target.value); setCode(event.target.value); setExecuted(false); }} placeholder="level=ERROR service=payment-db request_id=req-1042" className="mt-3 w-full rounded-lg border border-white/10 bg-black/30 p-2 text-xs text-white"/><div className="mt-3 space-y-2">{logMatches.map((row)=><div key={row.time} className="rounded-lg border border-white/5 bg-black/20 p-2 font-mono text-[10px] leading-5"><span className={row.level==="ERROR"?"text-rose-300":row.level==="WARN"?"text-amber-300":"text-emerald-300"}>{row.level}</span> <span className="text-slate-500">{row.time} {row.service}</span><p className="text-slate-200">{row.message}</p><span className="text-cyan-300">{row.request} · {row.trace}</span></div>)}</div></article>}
            {active === "traces" && <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><h3 className="font-bold text-white">Trace waterfall · tr-8f21</h3><div className="mt-4 space-y-3">{[{name:"gateway GET /checkout",ms:1840,w:"100%"},{name:"auth-service.validate",ms:42,w:"8%"},{name:"cart-service.read",ms:86,w:"15%"},{name:"payment-db.query",ms:1650,w:"90%"}].map((span)=><div key={span.name}><div className="flex justify-between gap-2 text-xs"><span className="text-slate-300">{span.name}</span><span className="text-slate-500">{span.ms} ms</span></div><div className="mt-1 h-2 rounded-full bg-slate-800"><div className={`h-full rounded-full ${span.ms>1000?"bg-rose-400":"bg-cyan-400"}`} style={{width:span.w}}/></div></div>)}</div></article>}
            {active === "alerts" && <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><h3 className="font-bold text-white">Alert rule evaluator</h3><label className="mt-3 block text-xs text-slate-400">p95 threshold: {alertThreshold.toFixed(1)} seconds<input type="range" min=".2" max="2.5" step=".1" value={alertThreshold} onChange={(event)=>{ const value = Number(event.target.value); setAlertThreshold(value); setCode((current) => current.replace(/http_request_duration_seconds_p95\s*>\s*\d+(?:\.\d+)?/, "http_request_duration_seconds_p95 > " + value.toFixed(1))); setExecuted(false); }} className="mt-2 w-full accent-cyan-400"/></label><p className="mt-3 rounded-lg bg-black/20 p-3 font-mono text-xs text-emerald-200">p95_latency &gt; {alertThreshold.toFixed(1)} for 2m</p></article>}
            {active === "kubernetes" && <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><h3 className="font-bold text-white">Kubernetes cluster explorer</h3><div className="mt-3 space-y-2 text-xs"><div className="flex justify-between rounded-lg bg-black/20 p-3"><span>worker-01 · Ready</span><span className="text-emerald-300">CPU 42% · MEM 61%</span></div><div className="flex justify-between rounded-lg bg-black/20 p-3"><span>worker-02 · Ready</span><span className="text-amber-300">CPU {podHealthy?"48":"94"}% · MEM 78%</span></div><div className="flex justify-between rounded-lg bg-black/20 p-3"><span>checkout-7c9d · {podHealthy?"Running":"CrashLoopBackOff"}</span><span className={podHealthy?"text-emerald-300":"text-rose-300"}>{podHealthy?"0":"5"} restarts</span></div></div></article>}
            <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><p className="text-xs font-black uppercase tracking-widest text-emerald-300">03 · Execute / 04 · Output / 06 · Verify</p><h3 className="mt-2 font-bold text-white">Execution results</h3>{executed ? <><pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-black/30 p-3 text-sm font-medium leading-6 text-cyan-100">{result}</pre><p className="mt-2 text-xs leading-6 text-slate-300">{resultDetail}</p></> : <p className="mt-3 text-sm text-slate-500">Run your query or configuration to display execution results, matching events and diagnostic evidence here.</p>}</article>
            <article className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4"><p className="text-xs font-black uppercase tracking-widest text-emerald-300">07 · Complete</p><p className="mt-2 text-sm text-slate-300">Verified labs are tracked in this active browser session.</p><div className="mt-3 h-2 rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-400" style={{width:(passed.length/6*100)+"%"}}/></div><p className="mt-2 text-xs text-slate-400">{passed.length} of 6 labs verified · progress, notes and lab drafts are saved in this browser.</p></article>
          </div>
        </section>
        <p className="mt-6 text-center text-[11px] leading-5 text-slate-500">Training simulator: execution logic operates on an included deterministic observability dataset in your browser. It does not connect to a live Prometheus, Grafana, Elasticsearch, tracing backend or Kubernetes cluster. Production dashboards require your own authenticated data sources.</p>
      </div>
    </main>
  );
}
