"use client";

import { useMemo, useState } from "react";

type Mode = "metrics" | "targets" | "promql" | "dashboard" | "alerts";
type MetricRow = { name: string; value: number; unit: string; help: string };

const baseMetrics: MetricRow[] = [
  { name: "http_requests_total", value: 12840, unit: "requests", help: "Total HTTP requests received by the sample API." },
  { name: "http_requests_5xx_total", value: 42, unit: "requests", help: "Server-side HTTP errors." },
  { name: "http_request_duration_seconds_p95", value: 0.24, unit: "seconds", help: "95th percentile request duration." },
  { name: "process_cpu_usage_percent", value: 38, unit: "%", help: "Sample application CPU usage." },
  { name: "node_memory_used_percent", value: 67, unit: "%", help: "Sample node memory utilization." },
  { name: "up", value: 1, unit: "state", help: "Whether the sample scrape target is reachable." },
];

const queryExamples = [
  "up",
  "rate(http_requests_total[5m])",
  "sum(rate(http_requests_total[5m]))",
  "sum(rate(http_requests_5xx_total[5m])) / sum(rate(http_requests_total[5m]))",
  "http_request_duration_seconds_p95",
  "process_cpu_usage_percent",
  "node_memory_used_percent",
];

function evaluateQuery(query: string, cpu: number, latency: number, targetUp: boolean, requestCount: number, errors: number) {
  const q = query.trim();
  if (!q) return { ok: false, message: "Enter a PromQL expression before running the query.", value: "", unit: "", rows: [] as { metric: string; value: string }[] };
  if (/\b(up)\b/.test(q)) return { ok: true, message: "Query executed against the sample Prometheus dataset.", value: targetUp ? "1" : "0", unit: "target state", rows: [{ metric: 'up{job="sample-api",instance="api-01:8080"}', value: targetUp ? "1" : "0" }] };
  if (q.includes("http_request_duration_seconds_p95") || q.includes("histogram_quantile")) return { ok: true, message: "p95 latency from the sample histogram.", value: latency.toFixed(3), unit: "seconds", rows: [{ metric: 'http_request_duration_seconds_p95{service="sample-api"}', value: latency.toFixed(3) }] };
  if (q.includes("process_cpu_usage_percent") || q.includes("node_cpu")) return { ok: true, message: "Current CPU utilization from the sample host.", value: cpu.toFixed(1), unit: "%", rows: [{ metric: 'process_cpu_usage_percent{instance="node-01"}', value: cpu.toFixed(1) }] };
  if (q.includes("node_memory_used_percent")) return { ok: true, message: "Current memory utilization from the sample host.", value: "67.0", unit: "%", rows: [{ metric: 'node_memory_used_percent{instance="node-01"}', value: "67.0" }] };
  if (q.includes("http_requests_5xx_total") && q.includes("/")) {
    const ratio = requestCount ? errors / requestCount : 0;
    return { ok: true, message: "5xx error ratio calculated from the sample request counters.", value: (ratio * 100).toFixed(2), unit: "%", rows: [{ metric: 'http_5xx_error_ratio{service="sample-api"}', value: (ratio * 100).toFixed(2) + "%" }] };
  }
  if (q.includes("http_requests_total")) {
    const rate = requestCount / 300;
    return { ok: true, message: "Request rate calculated over the five-minute sample window.", value: rate.toFixed(2), unit: "requests/sec", rows: [{ metric: 'http_requests_per_second{service="sample-api"}', value: rate.toFixed(2) }] };
  }
  return { ok: false, message: "This learning simulator supports the listed sample expressions. Try an example query or inspect the metric names.", value: "", unit: "", rows: [] as { metric: string; value: string }[] };
}

export default function MonitoringInteractiveLab({ topic, category }: { topic: string; category: string }) {
  const lower = topic.toLowerCase();
  const categoryLower = category.toLowerCase();
  const initialMode: Mode = lower.includes("metric") || lower.includes("golden signal") ? "metrics"
    : lower.includes("promql") || lower.includes("query") || lower.includes("error rate") || lower.includes("response time") ? "promql"
    : lower.includes("dashboard") || lower.includes("grafana") ? "dashboard"
    : lower.includes("alert") || lower.includes("slo") || lower.includes("sli") ? "alerts"
    : lower.includes("prometheus") || lower.includes("install") || lower.includes("exporter") || categoryLower.includes("exporter") ? "targets"
    : categoryLower.includes("alert") ? "alerts"
    : categoryLower.includes("grafana") ? "dashboard"
    : categoryLower.includes("promql") ? "promql"
    : categoryLower.includes("prometheus") || categoryLower.includes("exporter") ? "targets" : "metrics";

  const [mode, setMode] = useState<Mode>(initialMode);
  const [targetUp, setTargetUp] = useState(true);
  const [targetName, setTargetName] = useState("sample-api");
  const [scrapeMessage, setScrapeMessage] = useState("Target is UP. Last scrape succeeded 8 seconds ago.");
  const [cpu, setCpu] = useState(38);
  const [latency, setLatency] = useState(0.24);
  const [requestCount, setRequestCount] = useState(12840);
  const [errors, setErrors] = useState(42);
  const [query, setQuery] = useState("sum(rate(http_requests_total[5m]))");
  const [queryResult, setQueryResult] = useState<ReturnType<typeof evaluateQuery> | null>(null);
  const [panels, setPanels] = useState(["Request rate", "5xx error ratio", "p95 latency"]);
  const [panelChoice, setPanelChoice] = useState("CPU utilization");
  const [threshold, setThreshold] = useState(80);
  const [alertState, setAlertState] = useState<"inactive" | "firing" | "resolved">("inactive");
  const [eventLog, setEventLog] = useState<string[]>(["12:00:00  sample-api target discovered", "12:00:08  scrape completed successfully"]);

  const metricRows = useMemo(() => baseMetrics.map((item) => ({
    ...item,
    value: item.name === "up" ? (targetUp ? 1 : 0)
      : item.name === "process_cpu_usage_percent" ? cpu
      : item.name === "http_request_duration_seconds_p95" ? latency
      : item.name === "http_requests_total" ? requestCount
      : item.name === "http_requests_5xx_total" ? errors : item.value,
  })), [targetUp, cpu, latency, requestCount, errors]);

  function log(message: string) {
    setEventLog((current) => [new Date().toLocaleTimeString(), ...current].slice(0, 7).map((line, index) => index === 0 ? `${new Date().toLocaleTimeString()}  ${message}` : line));
  }
  function inject(kind: string) {
    if (kind === "cpu") { setCpu(94); setLatency(0.82); setErrors(240); log("INCIDENT injected: CPU saturation and latency increase"); }
    else if (kind === "latency") { setLatency(1.45); setErrors(95); log("INCIDENT injected: elevated API latency"); }
    else if (kind === "target") { setTargetUp(false); log("INCIDENT injected: scrape target is DOWN"); }
    else { setCpu(38); setLatency(0.24); setErrors(42); setTargetUp(true); log("Incident cleared: sample service returned to baseline"); }
    setAlertState(kind === "none" ? "resolved" : "inactive");
  }

  const tabs: { id: Mode; label: string; hint: string }[] = [
    { id: "metrics", label: "Metrics Explorer", hint: "Inspect live sample metrics" },
    { id: "targets", label: "Targets & Exporters", hint: "Scrape health and configuration" },
    { id: "promql", label: "PromQL Query Lab", hint: "Run expressions and inspect results" },
    { id: "dashboard", label: "Dashboard Builder", hint: "Build configurable panels" },
    { id: "alerts", label: "Alerts & Incidents", hint: "Inject failures and verify alerts" },
  ];

  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-cyan-400/25 bg-[#080f1b] shadow-2xl shadow-cyan-950/20">
      <div className="border-b border-white/10 bg-gradient-to-r from-[#10243a] via-[#11182b] to-[#102c2a] p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><p className="text-xs font-black uppercase tracking-[.22em] text-cyan-300">Interactive observability lab</p><h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">Practice · Run · Observe · Fix</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">Work with a deterministic sample monitoring stack. Change metrics, run queries, build panels, inject incidents and verify recovery.</p></div>
          <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-xs font-bold text-cyan-200">Browser simulation</span>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {tabs.map((tab) => <button key={tab.id} type="button" onClick={() => setMode(tab.id)} className={`rounded-xl border px-3 py-2 text-left transition ${mode === tab.id ? "border-cyan-300 bg-cyan-300/15 text-white" : "border-white/10 bg-black/20 text-slate-400 hover:text-white"}`}><span className="block text-xs font-bold">{tab.label}</span><span className="mt-1 block text-[10px] text-slate-500">{tab.hint}</span></button>)}
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,.6fr)]">
        <div className="min-w-0">
          {mode === "metrics" && <div className="space-y-4">
            <div><p className="text-xs font-bold uppercase tracking-widest text-cyan-300">Metrics & monitoring / sample service</p><h3 className="mt-1 text-xl font-bold text-white">Metric Explorer</h3><p className="mt-2 text-sm text-slate-400">Inspect metric names, current values, units and labels. Inject a controlled incident to see how telemetry changes.</p></div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[{ label: "Request rate", value: (requestCount / 300).toFixed(2), unit: "req/sec" }, { label: "5xx error ratio", value: (errors / requestCount * 100).toFixed(2), unit: "%" }, { label: "p95 latency", value: latency.toFixed(3), unit: "seconds" }].map((card) => <div key={card.label} className="rounded-2xl border border-white/10 bg-slate-900 p-4"><p className="text-xs text-slate-400">{card.label}</p><p className="mt-2 text-2xl font-black text-white">{card.value}<span className="ml-1 text-xs font-semibold text-slate-500">{card.unit}</span></p></div>)}
            </div>
            <div className="overflow-hidden rounded-xl border border-white/10"><div className="grid grid-cols-[1.2fr_.55fr_.45fr] bg-white/5 px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400"><span>Metric</span><span>Value</span><span>Unit</span></div>{metricRows.map((row) => <div key={row.name} className="grid grid-cols-[1.2fr_.55fr_.45fr] gap-2 border-t border-white/5 px-4 py-3 text-xs"><div><p className="font-mono font-bold text-cyan-200">{row.name}</p><p className="mt-1 text-[10px] text-slate-500">{row.help}</p></div><span className="font-mono text-white">{typeof row.value === "number" ? row.value.toLocaleString(undefined, { maximumFractionDigits: 3 }) : row.value}</span><span className="text-slate-400">{row.unit}</span></div>)}</div>
            <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4"><p className="text-sm font-bold text-white">Change the system load</p><label className="mt-3 block text-xs text-slate-400">CPU usage: {cpu}%<input aria-label="CPU usage" type="range" min="0" max="100" value={cpu} onChange={(e) => setCpu(Number(e.target.value))} className="mt-2 w-full accent-cyan-400" /></label><label className="mt-3 block text-xs text-slate-400">p95 latency: {latency.toFixed(2)}s<input aria-label="p95 latency" type="range" min="0.05" max="2" step="0.05" value={latency} onChange={(e) => setLatency(Number(e.target.value))} className="mt-2 w-full accent-cyan-400" /></label></div>
          </div>}

          {mode === "targets" && <div className="space-y-4"><div><p className="text-xs font-bold uppercase tracking-widest text-orange-300">Prometheus / exporters</p><h3 className="mt-1 text-xl font-bold text-white">Scrape Targets</h3><p className="mt-2 text-sm text-slate-400">Configure a sample scrape target, run a scrape and inspect target health. No external server is contacted.</p></div>
            <label className="block text-xs text-slate-400">Job / target name<input value={targetName} onChange={(e) => setTargetName(e.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-3 font-mono text-sm text-white outline-none focus:border-cyan-400" /></label>
            <pre className="overflow-x-auto rounded-xl border border-white/10 bg-[#050a12] p-4 text-xs leading-6 text-emerald-200"><code>{`scrape_configs:\n  - job_name: "${targetName || "sample-api"}"\n    metrics_path: /metrics\n    scrape_interval: 15s\n    static_configs:\n      - targets: ["api-01:8080"]`}</code></pre>
            <div className="flex flex-wrap gap-2"><button type="button" onClick={() => { setTargetUp(true); setScrapeMessage("Scrape succeeded. 6 sample time series collected."); log("Scrape succeeded for " + (targetName || "sample-api")); }} className="rounded-lg bg-emerald-400 px-4 py-2 text-sm font-bold text-slate-950">Run scrape</button><button type="button" onClick={() => { setTargetUp(false); setScrapeMessage("Scrape failed: connection refused at api-01:8080."); log("Scrape failed: connection refused"); }} className="rounded-lg border border-rose-400/40 px-4 py-2 text-sm font-bold text-rose-200">Simulate target failure</button></div>
            <div className={`rounded-xl border p-4 text-sm ${targetUp ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "border-rose-400/30 bg-rose-400/10 text-rose-200"}`}><p className="font-bold">Target {targetUp ? "UP" : "DOWN"}</p><p className="mt-1 text-xs">{scrapeMessage}</p></div>
          </div>}

          {mode === "promql" && <div className="space-y-4"><div><p className="text-xs font-bold uppercase tracking-widest text-fuchsia-300">PromQL / query execution</p><h3 className="mt-1 text-xl font-bold text-white">PromQL Query Editor</h3><p className="mt-2 text-sm text-slate-400">Edit an expression, run it against the sample time-series dataset and inspect the returned vector.</p></div>
            <div className="flex flex-wrap gap-2">{queryExamples.map((example) => <button key={example} type="button" onClick={() => { setQuery(example); setQueryResult(null); }} className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-left font-mono text-[10px] text-cyan-200 hover:border-cyan-400/40">{example}</button>)}</div>
            <textarea value={query} onChange={(e) => setQuery(e.target.value)} rows={4} spellCheck={false} aria-label="PromQL query editor" className="w-full rounded-xl border border-fuchsia-400/30 bg-[#050a12] p-4 font-mono text-sm leading-6 text-emerald-200 outline-none focus:border-fuchsia-300" />
            <button type="button" onClick={() => setQueryResult(evaluateQuery(query, cpu, latency, targetUp, requestCount, errors))} className="rounded-lg bg-fuchsia-400 px-5 py-2.5 text-sm font-black text-slate-950">▶ Run query</button>
            {queryResult && <div className={`rounded-xl border p-4 ${queryResult.ok ? "border-emerald-400/30 bg-emerald-400/10" : "border-rose-400/30 bg-rose-400/10"}`}><p className={`text-sm font-bold ${queryResult.ok ? "text-emerald-200" : "text-rose-200"}`}>{queryResult.ok ? "Query successful" : "Query error"}</p><p className="mt-1 text-xs text-slate-300">{queryResult.message}</p>{queryResult.ok && <><p className="mt-4 text-3xl font-black text-white">{queryResult.value}<span className="ml-2 text-sm text-slate-400">{queryResult.unit}</span></p><div className="mt-3 overflow-x-auto"><table className="w-full text-left text-xs"><thead className="text-slate-500"><tr><th className="py-2">Returned series</th><th className="py-2">Value</th></tr></thead><tbody>{queryResult.rows.map((row) => <tr key={row.metric} className="border-t border-white/10"><td className="py-2 font-mono text-cyan-200">{row.metric}</td><td className="py-2 font-mono text-white">{row.value}</td></tr>)}</tbody></table></div></>}</div>}
          </div>}

          {mode === "dashboard" && <div className="space-y-4"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-300">Grafana / visualization</p><h3 className="mt-1 text-xl font-bold text-white">Dashboard Builder</h3><p className="mt-2 text-sm text-slate-400">Add and remove panels, select visualizations and see the dashboard update from sample telemetry.</p></div>
            <div className="flex flex-wrap gap-2"><select value={panelChoice} onChange={(e) => setPanelChoice(e.target.value)} className="min-w-0 flex-1 rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white"><option>CPU utilization</option><option>Memory utilization</option><option>Request rate</option><option>5xx error ratio</option><option>p95 latency</option><option>Target availability</option></select><button type="button" onClick={() => setPanels((current) => current.includes(panelChoice) ? current : [...current, panelChoice])} className="rounded-lg bg-amber-300 px-4 py-2 text-sm font-bold text-slate-950">＋ Add panel</button></div>
            <div className="grid gap-3 sm:grid-cols-2">{panels.map((panel) => { const value = panel === "CPU utilization" ? cpu : panel === "Memory utilization" ? 67 : panel === "Request rate" ? requestCount / 300 : panel === "5xx error ratio" ? errors / requestCount * 100 : panel === "p95 latency" ? latency : targetUp ? 100 : 0; const unit = panel.includes("latency") ? "s" : panel.includes("rate") ? "req/s" : panel.includes("ratio") || panel.includes("utilization") || panel.includes("availability") ? "%" : ""; const pct = Math.max(2, Math.min(100, panel.includes("availability") ? value : panel.includes("latency") ? value / 2 * 100 : panel.includes("rate") ? value / 100 * 100 : value)); return <div key={panel} className="rounded-xl border border-white/10 bg-slate-900 p-4"><div className="flex items-center justify-between gap-2"><p className="text-sm font-bold text-white">{panel}</p><button type="button" onClick={() => setPanels((current) => current.filter((item) => item !== panel))} className="text-xs text-rose-300">Remove</button></div><p className="mt-3 text-2xl font-black text-cyan-200">{typeof value === "number" ? value.toFixed(2) : value}{unit && <span className="ml-1 text-xs text-slate-500">{unit}</span>}</p><div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ width: `${pct}%` }} /></div><p className="mt-2 text-[10px] text-slate-500">Sample data · last 5 minutes</p></div>; })}</div>
          </div>}

          {mode === "alerts" && <div className="space-y-4"><div><p className="text-xs font-bold uppercase tracking-widest text-rose-300">Alerting / reliability engineering</p><h3 className="mt-1 text-xl font-bold text-white">Alert Rule & Incident Lab</h3><p className="mt-2 text-sm text-slate-400">Set a CPU threshold, inject a controlled incident, evaluate the alert and restore normal service.</p></div>
            <div className="rounded-xl border border-white/10 bg-slate-900 p-4"><label className="block text-xs text-slate-400">Alert when CPU is above {threshold}%<input type="range" min="40" max="99" value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} className="mt-3 w-full accent-rose-400" /></label><pre className="mt-3 rounded-lg bg-black/40 p-3 font-mono text-xs leading-6 text-rose-200"><code>{`alert: HighCPU\nexpr: process_cpu_usage_percent > ${threshold}\nfor: 2m\nlabels:\n  severity: warning`}</code></pre><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => inject("cpu")} className="rounded-lg border border-rose-400/40 px-3 py-2 text-xs font-bold text-rose-200">Inject high CPU</button><button type="button" onClick={() => inject("latency")} className="rounded-lg border border-amber-400/40 px-3 py-2 text-xs font-bold text-amber-200">Inject high latency</button><button type="button" onClick={() => inject("target")} className="rounded-lg border border-orange-400/40 px-3 py-2 text-xs font-bold text-orange-200">Stop target</button><button type="button" onClick={() => inject("none")} className="rounded-lg bg-emerald-400 px-3 py-2 text-xs font-bold text-slate-950">Restore baseline</button></div><button type="button" onClick={() => { const firing = cpu > threshold || !targetUp || latency > 1; setAlertState(firing ? "firing" : "resolved"); log(firing ? "ALERT FIRING: sample rule condition is true" : "Alert evaluation: condition is false; alert resolved"); }} className="mt-4 rounded-lg bg-rose-400 px-4 py-2 text-sm font-black text-slate-950">Evaluate alert rule</button><div className={`mt-3 rounded-lg border p-3 text-sm font-bold ${alertState === "firing" ? "border-rose-400/40 bg-rose-400/10 text-rose-200" : "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"}`}>Alert state: {alertState.toUpperCase()}</div></div>
          </div>}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">System health</p><div className="mt-4 space-y-3">{[{ label: "Prometheus scrape", ok: targetUp, value: targetUp ? "UP" : "DOWN" }, { label: "CPU utilization", ok: cpu < 85, value: cpu + "%" }, { label: "API latency", ok: latency < 1, value: latency.toFixed(2) + "s" }].map((item) => <div key={item.label} className="flex items-center justify-between gap-2 text-xs"><span className="text-slate-400">{item.label}</span><span className={item.ok ? "font-bold text-emerald-300" : "font-bold text-rose-300"}>{item.value}</span></div>)}</div></div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Activity / event log</p><div className="mt-3 space-y-2">{eventLog.map((event, index) => <p key={index} className="border-l border-cyan-400/40 pl-3 font-mono text-[10px] leading-5 text-slate-400">{event}</p>)}</div></div>
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4"><p className="text-xs font-bold text-amber-200">Learning challenge</p><p className="mt-2 text-xs leading-5 text-slate-300">Inject a failure, identify which signal changed, run a query, add a dashboard panel and evaluate the alert. Restore baseline before leaving.</p><button type="button" onClick={() => { setMode("alerts"); inject("cpu"); }} className="mt-3 w-full rounded-lg border border-amber-300/30 px-3 py-2 text-xs font-bold text-amber-200">Start incident challenge →</button></div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4"><p className="text-xs font-bold text-cyan-200">Simulator scope</p><p className="mt-2 text-[11px] leading-5 text-slate-400">All values and outputs are generated locally in this browser for safe practice. This is not connected to a production Prometheus server, Grafana instance or external cluster.</p></div>
        </aside>
      </div>
    </section>
  );
}
