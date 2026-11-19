"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { parse as parseYaml } from "yaml";

type LabId = "promql" | "grafana" | "logs" | "traces" | "alerts" | "kubernetes";
type Lab = { id: LabId; title: string; description: string; task: string; starter: string; };
const labs: Lab[] = [
  { id: "promql", title: "Prometheus + PromQL Lab", description: "Scrape targets, explore time-series metrics, write PromQL and investigate service health.", task: "Checkout API traffic has increased. Calculate request rate and 5xx error ratio, then identify whether the service is healthy.", starter: "sum(rate(http_requests_total[5m]))" },
  { id: "grafana", title: "Grafana Dashboard Lab", description: "Build a dashboard from metrics, choose visualizations and verify panels against service signals.", task: "Create an operations dashboard with request rate, error ratio, p95 latency and CPU panels. Set a useful threshold for latency.", starter: "Panel: Request rate\nMetric: http_requests_total\nVisualization: Time series\nTitle: Checkout traffic" },
  { id: "logs", title: "Logs Investigation Lab", description: "Search structured logs, filter by severity and correlate request IDs, services and trace IDs.", task: "Users report intermittent checkout failures. Find the ERROR event, correlate the request ID and identify the database timeout as the root cause.", starter: "service=checkout level=ERROR" },
  { id: "traces", title: "Distributed Tracing Lab", description: "Inspect trace waterfalls, compare spans and locate the dependency causing latency.", task: "A checkout request takes 1.84 seconds. Inspect the spans and identify which downstream dependency consumes most of the time.", starter: "trace_id=tr-8f21 service=checkout" },
  { id: "alerts", title: "Alerting & Incident Lab", description: "Write alert conditions, inject incidents, inspect firing state and verify recovery.", task: "Create a critical alert when checkout p95 latency exceeds one second for two evaluations. Inject a latency incident, investigate and recover.", starter: "alert: CheckoutHighLatency\nexpr: http_request_duration_seconds_p95 > 1\nfor: 2m\nlabels:\n  severity: critical" },
  { id: "kubernetes", title: "Kubernetes Monitoring Lab", description: "Inspect node, pod and container signals; investigate restarts, resource pressure and unavailable replicas.", task: "The checkout deployment has one unavailable replica and repeated restarts. Inspect pod events and node pressure, then restore healthy replicas.", starter: "kubectl get nodes\nkubectl get pods -n production\nkubectl describe pod checkout-7c9d -n production\nkubectl get events -n production --sort-by=.lastTimestamp" },
];

const logRows = [
  { time: "12:04:01.120", level: "INFO", service: "gateway", request: "req-1042", message: "Request received GET /checkout", trace: "tr-8f21" },
  { time: "12:04:01.141", level: "INFO", service: "auth", request: "req-1042", message: "JWT validation succeeded", trace: "tr-8f21" },
  { time: "12:04:02.002", level: "ERROR", service: "payment-db", request: "req-1042", message: "DatabaseTimeout after 3000ms", trace: "tr-8f21" },
  { time: "12:04:02.018", level: "WARN", service: "checkout", request: "req-1042", message: "Retry attempt 2/3", trace: "tr-8f21" },
  { time: "12:04:03.004", level: "ERROR", service: "checkout", request: "req-1042", message: "HTTP 503 returned to client", trace: "tr-8f21" },
  { time: "12:04:04.300", level: "INFO", service: "catalog", request: "req-1043", message: "GET /products completed 200", trace: "tr-8f22" },
];

function evaluatePromql(code: string, incident: boolean) {
  const q = code.trim();
  if (!q) return { ok: false, value: "No expression", detail: "Enter a PromQL expression." };
  if (/up\b/.test(q)) return { ok: true, value: "1", detail: "1 active scrape target (job=checkout-api)." };
  if (/http_requests_total/.test(q) && /rate|increase|sum/.test(q)) return { ok: true, value: incident ? "42.6 req/s" : "18.4 req/s", detail: "Calculated from the sample counter series over the selected 5-minute window." };
  if (/http_request_duration_seconds_p95/.test(q)) return { ok: true, value: incident ? "1.84 s" : "0.24 s", detail: "p95 latency from the checkout API sample histogram." };
  if (/http_requests_5xx_total/.test(q) && q.includes("/")) return { ok: true, value: incident ? "4.8 %" : "0.32 %", detail: "5xx counter rate divided by total request counter rate." };
  if (/process_cpu_usage_percent|node_cpu/.test(q)) return { ok: true, value: incident ? "94 %" : "38 %", detail: "Current CPU utilization for worker-02." };
  return { ok: false, value: "Query error", detail: "Unknown metric or unsupported expression. Try up, rate(http_requests_total[5m]), http_request_duration_seconds_p95, or an error-ratio expression." };
}

export default function MonitoringHandsOnLabs() {
  const [active, setActive] = useState<LabId>("promql");
  const [code, setCode] = useState(labs[0].starter);
  const [incident, setIncident] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [result, setResult] = useState("");
  const [resultDetail, setResultDetail] = useState("");
  const [passed, setPassed] = useState<string[]>([]);
  const [panels, setPanels] = useState(["Request rate", "5xx error ratio", "p95 latency"]);
  const [panelMetric, setPanelMetric] = useState("CPU utilization");
  const [logFilter, setLogFilter] = useState("ERROR");
  const [alertThreshold, setAlertThreshold] = useState(1);
  const [podHealthy, setPodHealthy] = useState(false);
  const [notes, setNotes] = useState("Investigate the signal, correlate evidence, apply a safe fix, and verify service recovery.");

  const lab = labs.find((item) => item.id === active)!;
  const logMatches = useMemo(() => logRows.filter((row) => (!logFilter || row.level.includes(logFilter.toUpperCase()) || row.service.includes(logFilter.toLowerCase()) || row.request.includes(logFilter) || row.trace.includes(logFilter))), [logFilter]);
  const metrics = [
    { name: "Request rate", value: incident ? "42.6" : "18.4", unit: "req/s", width: incident ? "82%" : "38%" },
    { name: "5xx error ratio", value: incident ? "4.8" : "0.32", unit: "%", width: incident ? "78%" : "8%" },
    { name: "p95 latency", value: incident ? "1.84" : "0.24", unit: "s", width: incident ? "92%" : "16%" },
    { name: "CPU utilization", value: incident ? "94" : "38", unit: "%", width: incident ? "94%" : "38%" },
  ];

  function choose(id: LabId) {
    setActive(id); setCode(labs.find((item) => item.id === id)!.starter);
    setExecuted(false); setResult(""); setResultDetail("");
  }
  function execute() {
    setExecuted(true);
    if (active === "promql") {
      const lines = code.split("\n").map((line) => line.trim()).filter(Boolean);
      const results = lines.map((query) => {
        if (query.startsWith("#")) return "Comment skipped";
        if (/^up(?:\\{|$)/.test(query)) return "up{job=\"checkout-api\"} = " + (incident ? "0 · target DOWN" : "1 · target UP");
        if (/http_request_duration_seconds_p95/.test(query)) return "http_request_duration_seconds_p95 = " + (incident ? "1.84" : "0.24") + " seconds";
        if (/process_cpu_usage_percent|node_cpu/.test(query)) return "process_cpu_usage_percent = " + (incident ? "94" : "38") + "%";
        if (/http_requests_total/.test(query) && query.includes("/") && /5xx|status/.test(query)) return "checkout_5xx_error_ratio = " + (incident ? "4.8" : "0.32") + "% (counter samples evaluated)";
        if (/http_requests_total/.test(query) && /rate\\s*\\(/.test(query)) return "checkout_request_rate = " + (incident ? "42.6" : "18.4") + " requests/sec (5m range)";
        if (/http_requests_total/.test(query) && /sum\\s*\\(/.test(query)) return "http_requests_total = " + (incident ? "5160" : "4920") + " samples";
        return "ERROR: PromQL parse/evaluation failed for: " + query + ". Supported metrics: up, http_requests_total, http_request_duration_seconds_p95, process_cpu_usage_percent.";
      });
      const ok = results.some((line) => !line.startsWith("ERROR:"));
      setResult(results.join("\n")); setResultDetail((ok ? "Query engine evaluated " : "No valid expression. ") + lines.length + " expression(s) against the six-sample training time-series dataset. Use rate(), sum(), metric selectors and label matchers.");
    } else if (active === "grafana") {
      try {
        const dashboard = parseYaml(code) as { title?: string; panels?: { title?: string; query?: string; type?: string }[] };
        const supported = ["timeseries", "time series", "stat", "gauge", "bar", "table"];
        const panelsFromYaml = Array.isArray(dashboard?.panels) ? dashboard.panels : [];
        const errors: string[] = [];
        if (!dashboard?.title) errors.push("Dashboard title is required.");
        if (panelsFromYaml.length < 4) errors.push("Add at least four panels for throughput, errors, latency and resources.");
        panelsFromYaml.forEach((panel, index) => {
          if (!panel.title || !panel.query) errors.push("Panel " + (index + 1) + " needs title and query.");
          if (!supported.includes((panel.type ?? "").toLowerCase())) errors.push("Panel " + (index + 1) + " has an unsupported visualization type.");
        });
        setPanels(panelsFromYaml.map((panel) => panel.title ?? "Untitled"));
        setResult((errors.length ? "Dashboard validation FAILED" : "Dashboard validation PASSED") + "\n" + panelsFromYaml.map((panel) => "Panel: " + panel.title + " | " + panel.type + " | " + panel.query).join("\n"));
        setResultDetail(errors.length ? errors.join(" ") : "YAML parsed successfully. " + panelsFromYaml.length + " panel definitions validated and rendered in the dashboard preview.");
      } catch (error) {
        setResult("YAML parse error"); setResultDetail(error instanceof Error ? error.message : "Invalid dashboard YAML.");
      }
    } else if (active === "logs") {
      const filters = Object.fromEntries(code.trim().split(/\\s+/).filter((part) => part.includes("=")).map((part) => { const [key, ...value] = part.split("="); return [key.toLowerCase(), value.join("=")]; }));
      const terms = code.trim().split(/\\s+/).filter((part) => !part.includes("=")).map((part) => part.toLowerCase());
      const matches = logRows.filter((row) =>
        (!filters.service || row.service === filters.service) &&
        (!filters.level || row.level.toLowerCase() === filters.level.toLowerCase()) &&
        (!filters.request_id || row.request === filters.request_id) &&
        (!filters.trace_id || row.trace === filters.trace_id) &&
        terms.every((term) => (row.message + " " + row.service + " " + row.request + " " + row.trace).toLowerCase().includes(term))
      );
      setResult(matches.length + " matching log events\n" + matches.map((row) => row.time + " " + row.level + " " + row.service + " [" + row.request + "/" + row.trace + "] " + row.message).join("\n"));
      setResultDetail(matches.some((row) => row.message.includes("DatabaseTimeout")) ? "Root cause located: payment-db timeout occurs before checkout returns HTTP 503. Correlate trace tr-8f21." : "No database timeout in current result. Try service=checkout level=ERROR request=req-1042 or trace=tr-8f21.");
    } else if (active === "traces") {
      const traceId = code.match(/(?:trace_id|trace)\\s*=\\s*([\\w-]+)/i)?.[1];
      if (traceId !== "tr-8f21") { setResult("No trace matched"); setResultDetail("Try trace_id=tr-8f21. Trace search accepts a trace ID and optional min_duration filter."); }
      else { setResult("Trace tr-8f21 · GET /checkout · 1,840 ms · ERROR\ngateway.GET /checkout 1840ms\nauth-service.validate-token 42ms\ncart-service.read-cart 86ms\npayment-service.authorize 1680ms ERROR\npayment-db.SELECT payment 1650ms ERROR"); setResultDetail("Critical path identified: payment-db query consumes 1,650ms (89.7% of end-to-end duration), causing payment-service and checkout to fail."); }
    } else if (active === "alerts") {
      try {
        const parsed = parseYaml(code) as { groups?: { rules?: { alert?: string; expr?: string; for?: string; labels?: Record<string,string>; annotations?: Record<string,string> }[] }[] };
        const rule = parsed?.groups?.[0]?.rules?.[0];
        const errors: string[] = [];
        if (!rule?.alert) errors.push("Missing alert name.");
        if (!rule?.expr?.includes("http_request_duration_seconds_p95") || !rule.expr.includes(">")) errors.push("Expression must compare checkout p95 latency with a threshold.");
        if (!rule?.for || !/^\\d+[smhd]$/.test(rule.for)) errors.push("Use a valid for duration such as 5m.");
        if (!rule?.labels?.severity || !rule?.labels?.service) errors.push("Add severity and service labels.");
        if (!rule?.annotations?.summary || !rule?.annotations?.runbook) errors.push("Add summary and runbook annotations.");
        if (errors.length) { setResult("Alert rule validation FAILED"); setResultDetail(errors.join(" ")); }
        else { const firing = incident && alertThreshold <= 1.84; setResult(firing ? "FIRING · " + rule.alert : "INACTIVE · " + rule.alert); setResultDetail("Rule parsed and evaluated. Current p95=" + (incident ? "1.84s" : "0.24s") + ", threshold=" + alertThreshold + "s. " + (firing ? "Critical alert would route to payments-on-call." : "No threshold breach; inject a latency incident to test firing.")); }
      } catch (error) { setResult("Alert YAML parse error"); setResultDetail(error instanceof Error ? error.message : "Invalid YAML."); }
    } else {
      const commands = code.split("\n").map((line) => line.trim()).filter(Boolean);
      const recognized = commands.filter((command) => /^(kubectl get nodes|kubectl get pods|kubectl describe pod|kubectl get events|kubectl top nodes|kubectl top pods|kubectl rollout status)/.test(command));
      const output = recognized.map((command) => {
        if (command.startsWith("kubectl get nodes")) return "worker-01 Ready · CPU 42% · MEM 61%\nworker-02 Ready · CPU " + (podHealthy ? "48%" : "94%") + " · MEM " + (podHealthy ? "62%" : "88%");
        if (command.startsWith("kubectl get pods")) return "checkout-7c9d  " + (podHealthy ? "1/1 Running 0 restarts" : "0/1 CrashLoopBackOff 5 restarts");
        if (command.startsWith("kubectl describe pod")) return "Last State: " + (podHealthy ? "Running" : "Terminated · OOMKilled") + "\nEvents: " + (podHealthy ? "Started, Ready" : "BackOff, OOMKilled");
        if (command.startsWith("kubectl get events")) return podHealthy ? "Normal Started · Ready" : "Warning BackOff · restarting failed container";
        if (command.startsWith("kubectl top")) return "worker-02 CPU " + (podHealthy ? "48%" : "94%") + " · memory " + (podHealthy ? "62%" : "88%");
        return "deployment/checkout rollout status: " + (podHealthy ? "3/3 successfully rolled out" : "2/3 replicas available · waiting for rollout");
      });
      setResult(recognized.length + "/" + commands.length + " kubectl commands recognized by the training shell\n" + output.join("\n"));
      setResultDetail(commands.length === recognized.length ? (podHealthy ? "Cluster is healthy. Verify all replicas and node resources." : "Evidence: checkout pod OOMKilled, BackOff events, worker-02 resource pressure and unavailable replica.") : "One or more commands are unsupported. Use get nodes, get pods, describe pod, get events, top nodes/pods or rollout status.");
    }
  }
  function verify() {
    const success = active === "promql" ? executed && result.includes("http_request_duration_seconds_p95") && result.includes("http_requests_total")
      : active === "grafana" ? executed && result.includes("Dashboard validation PASSED") && panels.length >= 4
      : active === "logs" ? executed && result.includes("DatabaseTimeout") && result.includes("HTTP 503")
      : active === "traces" ? executed && result.includes("payment-db.SELECT payment") && resultDetail.includes("Critical path")
      : active === "alerts" ? executed && result.includes("FIRING") && resultDetail.includes("parsed and evaluated")
      : executed && podHealthy && result.includes("3/3 successfully rolled out");
    if (success) setPassed((current) => current.includes(active) ? current : [...current, active]);
    setResultDetail((current) => current + (success ? " · Verification passed. Lab completed." : " · Verification failed: complete the task requirements, apply recovery if needed, and execute again."));
  }

  return (
    <main className="min-h-screen bg-[#080b13] px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div><Link href="/monitoring-playground" className="text-sm text-cyan-300 hover:text-cyan-200">← Monitoring Playground</Link><p className="mt-3 text-xs font-bold uppercase tracking-[.25em] text-emerald-300">Observability training environment</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Monitoring Playground – Hands-on Labs</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">Production-style scenarios with editable practice, executable browser simulation, telemetry views, fault injection and verification.</p></div><div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3"><p className="text-2xl font-black text-emerald-300">{passed.length}/6</p><p className="text-xs text-slate-400">Labs verified</p></div></div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{labs.map((item, index) => <button key={item.id} onClick={() => choose(item.id)} className={`rounded-2xl border p-4 text-left transition ${active === item.id ? "border-cyan-300/70 bg-cyan-300/10" : "border-white/10 bg-slate-900/70 hover:border-white/25"}`}><div className="flex items-center justify-between"><span className="text-xs font-black text-cyan-300">LAB 0{index + 1}</span><span className={`rounded-full px-2 py-1 text-[10px] ${passed.includes(item.id) ? "bg-emerald-400/15 text-emerald-300" : "bg-white/5 text-slate-400"}`}>{passed.includes(item.id) ? "VERIFIED" : "NOT STARTED"}</span></div><h2 className="mt-3 font-bold text-white">{item.title}</h2><p className="mt-2 text-xs leading-5 text-slate-400">{item.description}</p></button>)}</div>
        <section className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,.85fr)]">
          <div className="space-y-4">
            <article className="rounded-2xl border border-orange-400/20 bg-slate-900/70 p-5"><p className="text-xs font-black uppercase tracking-widest text-orange-300">01 · Task</p><h2 className="mt-2 text-xl font-bold text-white">{lab.title}</h2><p className="mt-3 text-sm leading-7 text-slate-300">{lab.task}</p></article>
            <article className="rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-5"><div className="flex flex-wrap items-center justify-between gap-2"><div><p className="text-xs font-black uppercase tracking-widest text-cyan-300">02 · Practice</p><h2 className="mt-2 text-lg font-bold text-white">Configuration / query editor</h2></div><span className="text-xs text-slate-500">Editable workspace</span></div>
              <textarea value={code} onChange={(event) => { setCode(event.target.value); setExecuted(false); }} rows={active === "kubernetes" ? 6 : 5} spellCheck={false} className="mt-4 w-full rounded-xl border border-white/10 bg-[#050811] p-4 font-mono text-xs leading-6 text-emerald-200 outline-none focus:border-cyan-400" />
              <div className="mt-3 flex flex-wrap gap-2"><button onClick={execute} className="rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-black text-slate-950 hover:bg-emerald-300">▶ Run / Execute</button><button onClick={() => { setIncident((value) => !value); setExecuted(false); setResult(""); }} className={`rounded-xl border px-4 py-2.5 text-sm font-bold ${incident ? "border-rose-400/40 bg-rose-400/10 text-rose-200" : "border-rose-400/30 text-rose-200"}`}>{incident ? "Clear injected incident" : "Inject production failure"}</button><button onClick={verify} className="rounded-xl border border-cyan-400/30 px-4 py-2.5 text-sm font-bold text-cyan-200">✓ Verify task</button></div>
            </article>
            <article className="rounded-2xl border border-violet-400/20 bg-slate-900/70 p-5"><p className="text-xs font-black uppercase tracking-widest text-violet-300">05 · Troubleshoot</p><h2 className="mt-2 text-lg font-bold text-white">Incident investigation notes</h2><textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} className="mt-3 w-full rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-slate-200 outline-none focus:border-violet-400" /><div className="mt-3 flex flex-wrap items-center gap-3"><button onClick={() => { setIncident(false); setPodHealthy(true); setExecuted(false); setResult(""); setResultDetail("Recovery action applied in the training simulator. Execute again to verify the healthy state."); }} className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-200">Apply recovery action</button><span className="text-xs text-slate-500">Use evidence from outputs before recovery.</span></div></article>
          </div>
          <div className="space-y-4">
            <article className="rounded-2xl border border-white/10 bg-[#0d1421] p-5"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-widest text-slate-400">Live telemetry view</p><h2 className="mt-1 text-lg font-bold text-white">Service health dashboard</h2></div><span className="flex items-center gap-2 text-[10px] font-bold text-emerald-300"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"/>SIMULATED LIVE</span></div><div className="mt-4 grid grid-cols-2 gap-2">{metrics.map((metric) => <div key={metric.name} className="rounded-xl border border-white/10 bg-black/20 p-3"><p className="text-[11px] text-slate-400">{metric.name}</p><p className="mt-1 text-xl font-black text-white">{metric.value}<span className="ml-1 text-[10px] text-slate-500">{metric.unit}</span></p><div className="mt-3 h-1.5 rounded-full bg-slate-800"><div className={`h-full rounded-full ${incident ? "bg-rose-400" : "bg-emerald-400"}`} style={{ width: metric.width }}/></div></div>)}</div><div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3"><div className="flex items-center justify-between"><span className="text-xs font-bold text-slate-300">Metric trend · last 5 intervals</span><span className="text-[10px] text-slate-500">CPU %</span></div><div className="mt-3 flex h-20 items-end gap-2">{(incident ? [35,42,55,74,94] : [30,34,32,36,38]).map((v,i)=><div key={i} className="flex-1 rounded-t bg-cyan-400/70" style={{height:v+"%"}} title={v+"%"}/>)}</div></div></article>
            {active === "grafana" && <article className="rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-4"><h3 className="font-bold text-white">Dashboard panel builder</h3><div className="mt-3 flex gap-2"><select value={panelMetric} onChange={(event) => setPanelMetric(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/30 p-2 text-xs text-white"><option>CPU utilization</option><option>Request rate</option><option>p95 latency</option><option>5xx error ratio</option><option>Memory utilization</option></select><button onClick={() => { const name=panelMetric; setPanels((current)=>current.includes(name)?current:[...current,name]); }} className="rounded-lg bg-cyan-400 px-3 py-2 text-xs font-bold text-slate-950">Add panel</button></div><div className="mt-3 grid grid-cols-2 gap-2">{panels.map((panel)=><div key={panel} className="rounded-lg border border-white/10 bg-black/20 p-3 text-xs text-cyan-100">{panel}<div className="mt-3 flex h-8 items-end gap-1">{[30,50,42,70,58,85].map((v,i)=><span key={i} className="flex-1 rounded-t bg-cyan-400/60" style={{height:v+"%"}}/>)}</div></div>)}</div></article>}
            {active === "logs" && <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><h3 className="font-bold text-white">Logs explorer</h3><input value={logFilter} onChange={(event)=>setLogFilter(event.target.value)} placeholder="Filter level, service, request or trace" className="mt-3 w-full rounded-lg border border-white/10 bg-black/30 p-2 text-xs text-white"/><div className="mt-3 space-y-2">{logMatches.map((row)=><div key={row.time} className="rounded-lg border border-white/5 bg-black/20 p-2 font-mono text-[10px] leading-5"><span className={row.level==="ERROR"?"text-rose-300":row.level==="WARN"?"text-amber-300":"text-emerald-300"}>{row.level}</span> <span className="text-slate-500">{row.time} {row.service}</span><p className="text-slate-200">{row.message}</p><span className="text-cyan-300">{row.request} · {row.trace}</span></div>)}</div></article>}
            {active === "traces" && <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><h3 className="font-bold text-white">Trace waterfall · tr-8f21</h3><div className="mt-4 space-y-3">{[{name:"gateway GET /checkout",ms:1840,w:"100%"},{name:"auth-service.validate",ms:42,w:"8%"},{name:"cart-service.read",ms:86,w:"15%"},{name:"payment-db.query",ms:1650,w:"90%"}].map((span)=><div key={span.name}><div className="flex justify-between gap-2 text-xs"><span className="text-slate-300">{span.name}</span><span className="text-slate-500">{span.ms} ms</span></div><div className="mt-1 h-2 rounded-full bg-slate-800"><div className={`h-full rounded-full ${span.ms>1000?"bg-rose-400":"bg-cyan-400"}`} style={{width:span.w}}/></div></div>)}</div></article>}
            {active === "alerts" && <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><h3 className="font-bold text-white">Alert rule evaluator</h3><label className="mt-3 block text-xs text-slate-400">p95 threshold: {alertThreshold.toFixed(1)} seconds<input type="range" min=".2" max="2.5" step=".1" value={alertThreshold} onChange={(event)=>setAlertThreshold(Number(event.target.value))} className="mt-2 w-full accent-cyan-400"/></label><p className="mt-3 rounded-lg bg-black/20 p-3 font-mono text-xs text-emerald-200">p95_latency &gt; {alertThreshold.toFixed(1)} for 2m</p></article>}
            {active === "kubernetes" && <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><h3 className="font-bold text-white">Kubernetes cluster explorer</h3><div className="mt-3 space-y-2 text-xs"><div className="flex justify-between rounded-lg bg-black/20 p-3"><span>worker-01 · Ready</span><span className="text-emerald-300">CPU 42% · MEM 61%</span></div><div className="flex justify-between rounded-lg bg-black/20 p-3"><span>worker-02 · Ready</span><span className="text-amber-300">CPU {podHealthy?"48":"94"}% · MEM 78%</span></div><div className="flex justify-between rounded-lg bg-black/20 p-3"><span>checkout-7c9d · {podHealthy?"Running":"CrashLoopBackOff"}</span><span className={podHealthy?"text-emerald-300":"text-rose-300"}>{podHealthy?"0":"5"} restarts</span></div></div></article>}
            <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"><p className="text-xs font-black uppercase tracking-widest text-emerald-300">03 · Execute / 04 · Output / 06 · Verify</p><h3 className="mt-2 font-bold text-white">Execution results</h3>{executed ? <><p className="mt-3 text-xl font-black text-cyan-200">{result}</p><p className="mt-2 text-xs leading-6 text-slate-300">{resultDetail}</p></> : <p className="mt-3 text-sm text-slate-500">Run your query or configuration to display execution results, matching events and diagnostic evidence here.</p>}</article>
            <article className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4"><p className="text-xs font-black uppercase tracking-widest text-emerald-300">07 · Complete</p><p className="mt-2 text-sm text-slate-300">Verified labs are tracked in this active browser session.</p><div className="mt-3 h-2 rounded-full bg-slate-800"><div className="h-full rounded-full bg-emerald-400" style={{width:(passed.length/6*100)+"%"}}/></div><p className="mt-2 text-xs text-slate-400">{passed.length} of 6 labs verified · progress is session-local, not account-persisted.</p></article>
          </div>
        </section>
        <p className="mt-6 text-center text-[11px] leading-5 text-slate-500">Training simulator: execution logic operates on an included deterministic observability dataset in your browser. It does not connect to a live Prometheus, Grafana, Elasticsearch, tracing backend or Kubernetes cluster. Production dashboards require your own authenticated data sources.</p>
      </div>
    </main>
  );
}
