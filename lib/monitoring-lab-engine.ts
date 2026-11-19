export type LabResult = {
  ok: boolean;
  output: string;
  detail: string;
  evidence: Record<string, string | number | boolean>;
  state?: KubernetesLabState;
};

type Sample = { metric: string; labels: Record<string, string>; values: number[] };
const baseline: Sample[] = [
  { metric: "http_requests_total", labels: { service: "checkout", status: "200" }, values: [4100, 4210, 4320, 4440, 4560, 4680] },
  { metric: "http_requests_total", labels: { service: "checkout", status: "500" }, values: [12, 13, 14, 15, 16, 17] },
  { metric: "http_request_duration_seconds_p95", labels: { service: "checkout" }, values: [0.21, 0.22, 0.24, 0.23, 0.24, 0.24] },
  { metric: "process_cpu_usage_percent", labels: { node: "worker-02" }, values: [34, 36, 37, 38, 38, 38] },
  { metric: "node_memory_usage_percent", labels: { node: "worker-02" }, values: [60, 61, 62, 62, 63, 63] },
  { metric: "up", labels: { job: "checkout-api" }, values: [1, 1, 1, 1, 1, 1] },
];
const samples = (incident: boolean): Sample[] => baseline.map((series) => {
  if (!incident) return series;
  if (series.metric === "http_requests_total" && series.labels.status === "500") return { ...series, values: [12, 18, 30, 48, 70, 96] };
  if (series.metric === "http_requests_total" && series.labels.status === "200") return { ...series, values: [4100, 4230, 4380, 4560, 4770, 5010] };
  if (series.metric === "http_request_duration_seconds_p95") return { ...series, values: [0.24, 0.42, 0.78, 1.22, 1.62, 1.84] };
  if (series.metric === "process_cpu_usage_percent") return { ...series, values: [38, 48, 61, 75, 88, 94] };
  if (series.metric === "node_memory_usage_percent") return { ...series, values: [63, 68, 72, 78, 84, 88] };
  return series;
});
type Vector = { metric: string; labels: Record<string, string>; value: number };
const splitTopLevel = (input: string, operator: string): string[] => {
  const parts: string[] = []; let depth = 0; let quote = false; let start = 0;
  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    if (char === '"' && input[i - 1] !== "\\") quote = !quote;
    if (quote) continue;
    if (char === "(" || char === "{" || char === "[") depth += 1;
    if (char === ")" || char === "}" || char === "]") depth -= 1;
    if (depth === 0 && input.slice(i, i + operator.length) === operator) {
      parts.push(input.slice(start, i).trim()); start = i + operator.length; i += operator.length - 1;
    }
  }
  if (parts.length) parts.push(input.slice(start).trim());
  return parts;
};
function selectMetric(query: string, data: Sample[]): Vector[] {
  const match = query.trim().match(/^([a-zA-Z_:][\w:]*)(?:\{(.*)\})?$/);
  if (!match) throw new Error("Invalid selector. Use metric_name or metric_name{label=\"value\"}.");
  const filters = (match[2] || "").split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).filter(Boolean).map((item) => {
    const parsed = item.trim().match(/^([a-zA-Z_][\w]*)\s*(=~|!~|!=|=)\s*"([^"]*)"$/);
    if (!parsed) throw new Error("Invalid label matcher: " + item);
    return parsed;
  });
  const found = data.filter((series) => series.metric === match[1] && filters.every((filter) => {
    const value = series.labels[filter[1]] || "";
    if (filter[2] === "=") return value === filter[3];
    if (filter[2] === "!=") return value !== filter[3];
    const regex = new RegExp(filter[3]);
    return filter[2] === "=~" ? regex.test(value) : !regex.test(value);
  }));
  if (!found.length) throw new Error("No series found for metric: " + match[1]);
  return found.map((series) => ({ metric: series.metric, labels: series.labels, value: series.values[series.values.length - 1] }));
}
function evaluateExpression(expression: string, incident: boolean): Vector[] {
  const query = expression.trim();
  if (!query) throw new Error("Expression is empty.");
  const data = samples(incident);
  const division = splitTopLevel(query, "/");
  if (division.length === 2) {
    const left = evaluateExpression(division[0], incident).reduce((sum, row) => sum + row.value, 0);
    const right = evaluateExpression(division[1], incident).reduce((sum, row) => sum + row.value, 0);
    if (right === 0) throw new Error("Division by zero.");
    return [{ metric: "expression", labels: {}, value: left / right }];
  }
  const comparison = query.match(/^(.+?)\s*(>=|<=|==|!=|>|<)\s*(\d+(?:\.\d+)?)$/);
  if (comparison) {
    const value = evaluateExpression(comparison[1], incident).reduce((sum, row) => sum + row.value, 0);
    const target = Number(comparison[3]);
    const passed = comparison[2] === ">" ? value > target : comparison[2] === "<" ? value < target : comparison[2] === ">=" ? value >= target : comparison[2] === "<=" ? value <= target : comparison[2] === "==" ? value === target : value !== target;
    return [{ metric: "comparison", labels: {}, value: passed ? 1 : 0 }];
  }
  const aggregate = query.match(/^(sum|avg|min|max|count)\((.*)\)$/);
  if (aggregate) {
    const values = evaluateExpression(aggregate[2], incident);
    const numbers = values.map((row) => row.value);
    const value = aggregate[1] === "sum" ? numbers.reduce((a, b) => a + b, 0)
      : aggregate[1] === "avg" ? numbers.reduce((a, b) => a + b, 0) / numbers.length
      : aggregate[1] === "min" ? Math.min(...numbers)
      : aggregate[1] === "max" ? Math.max(...numbers) : numbers.length;
    return [{ metric: aggregate[1], labels: {}, value }];
  }
  const range = query.match(/^(rate|irate|increase)\((.+)\[(\d+)([smhd])\]\)$/);
  if (range) {
    const rows = selectMetric(range[2], data);
    const durationSeconds = Number(range[3]) * ({ s: 1, m: 60, h: 3600, d: 86400 }[range[4]] || 1);
    return rows.map((row) => {
      const series = data.find((item) => item.metric === row.metric && JSON.stringify(item.labels) === JSON.stringify(row.labels))!;
      const delta = Math.max(0, series.values[5] - series.values[0]);
      const value = range[1] === "increase" ? delta : delta / Math.min(durationSeconds, 300);
      return { ...row, metric: range[1], value };
    });
  }
  const instant = query.match(/^(abs|ceil|floor|round)\((.*)\)$/);
  if (instant) {
    const rows = evaluateExpression(instant[2], incident);
    return rows.map((row) => ({ ...row, metric: instant[1], value: instant[1] === "abs" ? Math.abs(row.value) : instant[1] === "ceil" ? Math.ceil(row.value) : instant[1] === "floor" ? Math.floor(row.value) : Math.round(row.value) }));
  }
  return selectMetric(query, data);
}
export function runPromqlLab(code: string, incident: boolean): LabResult {
  const expressions = code.split("\n").map((line) => line.trim()).filter((line) => line && !line.startsWith("#"));
  if (!expressions.length) return { ok: false, output: "No PromQL expression entered.", detail: "Add one or more metric queries.", evidence: {} };
  const output: string[] = []; const evidence: Record<string, string | number | boolean> = {};
  let evaluated = 0; let hasRate = false; let hasLatency = false; let hasErrorRatio = false;
  expressions.forEach((query, index) => {
    try {
      const rows = evaluateExpression(query, incident); evaluated += 1;
      if (/rate\(|irate\(/.test(query)) hasRate = true;
      if (/http_request_duration_seconds_p95/.test(query)) hasLatency = true;
      if (/http_requests_total.*status=~/.test(query) && query.includes("/")) hasErrorRatio = true;
      output.push("Query " + (index + 1) + ": " + query);
      rows.forEach((row) => output.push("  " + row.metric + (Object.keys(row.labels).length ? JSON.stringify(row.labels) : "") + " = " + Number(row.value.toFixed(6))));
    } catch (error) {
      output.push("ERROR: " + query + "\n  " + (error instanceof Error ? error.message : "Query evaluation failed."));
    }
  });
  const success = evaluated === expressions.length;
  evidence.evaluated = evaluated; evidence.totalQueries = expressions.length; evidence.hasRate = hasRate; evidence.hasLatency = hasLatency; evidence.hasErrorRatio = hasErrorRatio; evidence.allValid = success;
  return { ok: success, output: output.join("\n"), detail: evaluated + "/" + expressions.length + " PromQL expressions evaluated against six samples per series. " + (incident ? "Incident telemetry is active." : "Baseline telemetry is active."), evidence };
}

type LogRow = { timestamp: string; level: string; service: string; request_id: string; trace_id: string; message: string };
const baseLogs: LogRow[] = [
  { timestamp: "12:04:01.120", level: "INFO", service: "gateway", request_id: "req-1042", trace_id: "tr-8f21", message: "Request received GET /checkout" },
  { timestamp: "12:04:01.141", level: "INFO", service: "auth", request_id: "req-1042", trace_id: "tr-8f21", message: "JWT validation succeeded" },
  { timestamp: "12:04:02.002", level: "ERROR", service: "payment-db", request_id: "req-1042", trace_id: "tr-8f21", message: "DatabaseTimeout after 3000ms" },
  { timestamp: "12:04:02.018", level: "WARN", service: "checkout", request_id: "req-1042", trace_id: "tr-8f21", message: "Retry attempt 2/3" },
  { timestamp: "12:04:03.004", level: "ERROR", service: "checkout", request_id: "req-1042", trace_id: "tr-8f21", message: "HTTP 503 returned to client" },
  { timestamp: "12:04:04.300", level: "INFO", service: "catalog", request_id: "req-1043", trace_id: "tr-8f22", message: "GET /products completed 200" },
  { timestamp: "12:05:01.100", level: "WARN", service: "payment-db", request_id: "req-1044", trace_id: "tr-8f23", message: "Connection pool at 80 percent" },
  { timestamp: "12:05:02.200", level: "INFO", service: "checkout", request_id: "req-1044", trace_id: "tr-8f23", message: "Checkout completed 200" },
  { timestamp: "12:06:10.500", level: "ERROR", service: "inventory", request_id: "req-1045", trace_id: "tr-8f24", message: "Upstream timeout after 1200ms" },
  { timestamp: "12:06:11.000", level: "ERROR", service: "gateway", request_id: "req-1045", trace_id: "tr-8f24", message: "HTTP 504 returned to client" },
];
export function runLogsLab(query: string, incident = false, recovered = false): LabResult {
  const rows = incident ? [...baseLogs, { timestamp: "12:07:02.001", level: "ERROR", service: "payment-db", request_id: "req-1050", trace_id: "tr-8f30", message: "ConnectionTimeout after 5000ms" }, { timestamp: "12:07:02.020", level: "ERROR", service: "checkout", request_id: "req-1050", trace_id: "tr-8f30", message: "HTTP 503 returned to client" }] : baseLogs;
  const recoveredLogs = recovered ? [...rows, { timestamp: "12:08:00.000", level: "INFO", service: "checkout", request_id: "req-1042", trace_id: "tr-8f21", message: "Health check passed after recovery" }] : rows;
  const filters: Record<string, string> = {}; const terms: string[] = [];
  query.trim().split(/\s+/).filter(Boolean).forEach((token) => {
    const match = token.match(/^([\w]+)(=|:)(.+)$/);
    if (match) filters[match[1].toLowerCase()] = match[3].replace(/^"|"$/g, "");
    else terms.push(token.toLowerCase());
  });
  const aliases: Record<string, keyof LogRow> = { level: "level", severity: "level", service: "service", request: "request_id", request_id: "request_id", trace: "trace_id", trace_id: "trace_id", message: "message", time: "timestamp" };
  const unknown = Object.keys(filters).filter((key) => !aliases[key] && key !== "after" && key !== "before");
  if (unknown.length) return { ok: false, output: "Invalid filter field: " + unknown.join(", "), detail: "Supported fields: level, severity, service, request_id, trace_id, message. Example: level=ERROR request_id=req-1042", evidence: {} };
  const matched = recoveredLogs.filter((row) => Object.entries(filters).every(([key, value]) => {
    if (key === "after") return row.timestamp > value;
    if (key === "before") return row.timestamp < value;
    const field = aliases[key]; return field ? row[field].toLowerCase().includes(value.toLowerCase()) : false;
  }) && terms.every((term) => (row.message + " " + row.service + " " + row.level).toLowerCase().includes(term)));
  const rootCause = matched.some((row) => row.service === "payment-db" && /DatabaseTimeout|ConnectionTimeout/.test(row.message));
  const has503 = matched.some((row) => row.message.includes("HTTP 503"));
  const output = matched.map((row) => row.timestamp + " " + row.level.padEnd(5) + " service=" + row.service + " request_id=" + row.request_id + " trace_id=" + row.trace_id + " " + row.message);
  return { ok: matched.length > 0, output: matched.length + " matching log events\n" + output.join("\n"), detail: rootCause && has503 ? "Correlated database timeout and downstream HTTP 503 events found." : "Matched events. Narrow the search by request_id or trace_id to correlate the incident.", evidence: { matches: matched.length, rootCause, has503, correlated: rootCause && has503, injectedEvents: incident, recovered } };
}

type Span = { trace_id: string; service: string; operation: string; parent: string | null; start_ms: number; duration_ms: number; status: "OK" | "ERROR" };
const traceData: Span[] = [
  { trace_id: "tr-8f21", service: "gateway", operation: "GET /checkout", parent: null, start_ms: 0, duration_ms: 1840, status: "ERROR" },
  { trace_id: "tr-8f21", service: "auth-service", operation: "validate-token", parent: "gateway", start_ms: 8, duration_ms: 42, status: "OK" },
  { trace_id: "tr-8f21", service: "cart-service", operation: "read-cart", parent: "gateway", start_ms: 55, duration_ms: 86, status: "OK" },
  { trace_id: "tr-8f21", service: "payment-service", operation: "authorize", parent: "gateway", start_ms: 160, duration_ms: 1680, status: "ERROR" },
  { trace_id: "tr-8f21", service: "payment-db", operation: "SELECT payment", parent: "payment-service", start_ms: 175, duration_ms: 1650, status: "ERROR" },
  { trace_id: "tr-8f22", service: "gateway", operation: "GET /products", parent: null, start_ms: 0, duration_ms: 128, status: "OK" },
  { trace_id: "tr-8f22", service: "catalog", operation: "list-products", parent: "gateway", start_ms: 10, duration_ms: 92, status: "OK" },
  { trace_id: "tr-8f23", service: "gateway", operation: "GET /checkout", parent: null, start_ms: 0, duration_ms: 460, status: "OK" },
  { trace_id: "tr-8f23", service: "payment-service", operation: "authorize", parent: "gateway", start_ms: 120, duration_ms: 280, status: "OK" },
];
export function runTracesLab(query: string, incident = false, recovered = false): LabResult {
  const id = query.match(/(?:trace_id|trace)\s*[=:]\s*([\w-]+)/i)?.[1];
  const service = query.match(/service\s*[=:]\s*([\w-]+)/i)?.[1];
  if (!id) return { ok: false, output: "Trace ID is required.", detail: "Try trace_id=tr-8f21 or trace_id=tr-8f22.", evidence: {} };
  const spans = traceData.filter((span) => span.trace_id === id && (!service || span.service.toLowerCase().includes(service.toLowerCase()))).map((span) => incident && id === "tr-8f21" && span.service === "payment-db" ? { ...span, duration_ms: 2650, status: "ERROR" as const } : span);
  if (!spans.length) return { ok: false, output: "No spans matched trace_id=" + id + (service ? " service=" + service : ""), detail: "Known traces: tr-8f21, tr-8f22 and tr-8f23.", evidence: { found: false } };
  const total = spans.find((span) => span.parent === null)?.duration_ms || Math.max(...spans.map((span) => span.start_ms + span.duration_ms));
  const slowest = [...spans].sort((a, b) => b.duration_ms - a.duration_ms)[0];
  const lines = spans.map((span) => (span.parent ? "  " : "") + span.service + "." + span.operation + " start=" + span.start_ms + "ms duration=" + span.duration_ms + "ms status=" + span.status);
  return { ok: true, output: "Trace " + id + " · " + total + "ms total\n" + lines.join("\n"), detail: "Slowest matching span: " + slowest.service + "." + slowest.operation + " (" + slowest.duration_ms + "ms)." + (recovered ? " Recovery health check passed; historical trace evidence retained." : ""), evidence: { found: true, totalMs: total, slowestMs: slowest.duration_ms, slowestService: slowest.service, criticalPath: id === "tr-8f21" && spans.some((span) => span.service === "payment-db" && span.duration_ms > 1000), dbMs: id === "tr-8f21" ? (incident ? 2650 : 1650) : 0, spanCount: spans.length, recovered } };
}

type Panel = { title?: string; type?: string; query?: string; thresholds?: { value?: number; color?: string }[] };
export function runGrafanaLab(code: string, parseYaml: (source: string) => unknown, incident = false): LabResult {
  try {
    const dashboard = parseYaml(code) as { title?: string; panels?: Panel[] };
    const panels = Array.isArray(dashboard.panels) ? dashboard.panels : [];
    const errors: string[] = [];
    if (!dashboard.title?.trim()) errors.push("Dashboard title is required.");
    if (panels.length < 4) errors.push("Add at least four panels.");
    const results: string[] = [];
    panels.forEach((panel, index) => {
      if (!panel.title?.trim()) errors.push("Panel " + (index + 1) + " needs a title.");
      if (!panel.query?.trim()) { errors.push("Panel " + (index + 1) + " needs a PromQL query."); return; }
      if (!["timeseries", "time series", "stat", "gauge", "bar", "table"].includes((panel.type || "").toLowerCase())) errors.push("Panel " + (index + 1) + " has an unsupported visualization type.");
      try {
        const rows = evaluateExpression(panel.query, incident);
        results.push(panel.title + " [" + panel.type + "] = " + rows.map((row) => Number(row.value.toFixed(5))).join(", "));
      } catch (error) { errors.push("Panel " + (panel.title || index + 1) + " query: " + (error instanceof Error ? error.message : "invalid query")); }
      if (panel.thresholds?.some((threshold) => typeof threshold.value !== "number")) errors.push("Panel " + (panel.title || index + 1) + " has a non-numeric threshold.");
    });
    return { ok: errors.length === 0, output: "Dashboard: " + (dashboard.title || "(untitled)") + "\n" + results.join("\n"), detail: errors.length ? errors.join(" ") : panels.length + " panels parsed, validated and evaluated against the telemetry dataset.", evidence: { valid: errors.length === 0, panelCount: panels.length, queriesEvaluated: results.length, hasLatency: panels.some((panel) => /http_request_duration_seconds_p95/.test(panel.query || "")), hasErrors: panels.some((panel) => /status=~/.test(panel.query || "")), hasCpu: panels.some((panel) => /process_cpu_usage_percent/.test(panel.query || "")), hasLatencyThreshold: panels.some((panel) => /http_request_duration_seconds_p95/.test(panel.query || "") && (panel.thresholds || []).some((threshold) => typeof threshold.value === "number" && threshold.value > 0)) } };
  } catch (error) { return { ok: false, output: "Dashboard YAML parse error.", detail: error instanceof Error ? error.message : "Invalid YAML.", evidence: { valid: false } }; }
}

type AlertRule = { alert?: string; expr?: string; for?: string; labels?: Record<string, string>; annotations?: Record<string, string> };
export function runAlertLab(code: string, incident: boolean, ticks: number, parseYaml: (source: string) => unknown, previouslyFired = false): LabResult {
  try {
    const config = parseYaml(code) as { groups?: { rules?: AlertRule[] }[] };
    const rule = config.groups?.[0]?.rules?.[0]; const errors: string[] = [];
    if (!rule?.alert?.trim()) errors.push("Alert name is required.");
    if (!rule?.expr || !/^http_request_duration_seconds_p95\s*>\s*\d+(?:\.\d+)?$/.test(rule.expr)) errors.push("Expression must compare http_request_duration_seconds_p95 with a numeric threshold.");
    if (!rule?.for || !/^\d+[smhd]$/.test(rule.for)) errors.push("Use a valid for duration such as 2m.");
    if (!rule?.labels?.severity || !rule.labels.service) errors.push("severity and service labels are required.");
    if (!rule?.annotations?.summary || !rule.annotations.runbook) errors.push("summary and runbook annotations are required.");
    if (errors.length) return { ok: false, output: "Alert rule rejected.", detail: errors.join(" "), evidence: { valid: false } };
    const threshold = Number(rule!.expr!.split(">").pop());
    const current = incident ? 1.84 : 0.24;
    const breach = current > threshold;
    const state = breach ? ticks >= 2 ? "FIRING" : "PENDING" : previouslyFired ? "RESOLVED" : "INACTIVE";
    return { ok: true, output: state + " · " + rule!.alert + "\nexpression: " + rule!.expr + "\nfor: " + rule!.for + "\nevaluation interval: 1 minute\nconsecutive evaluations: " + ticks + "\ncurrent p95: " + current + "s", detail: state === "PENDING" ? "First consecutive breach. Evaluate once more to satisfy the pending duration." : state === "FIRING" ? "Threshold breached for the required consecutive evaluations." : state === "RESOLVED" ? "Metric recovered below threshold; alert transitioned to Resolved." : "No active breach.", evidence: { valid: true, breach, firing: state === "FIRING", resolved: state === "RESOLVED", ticks, threshold, current } };
  } catch (error) { return { ok: false, output: "Alert YAML parse error.", detail: error instanceof Error ? error.message : "Invalid YAML.", evidence: { valid: false } }; }
}

export type KubernetesFault = "crashloop" | "oomkilled" | "pending" | "node-not-ready";
export type KubernetesLabState = { healthy: boolean; fault: KubernetesFault; replicas: number; ready: number; cpu: number; memory: number; restarts: number; resourcesFixed: boolean; probesFixed: boolean; nodeReady: boolean };
export function createKubernetesLabState(fault: KubernetesFault = "oomkilled"): KubernetesLabState {
  return { healthy: false, fault, replicas: 3, ready: fault === "pending" ? 1 : 2, cpu: fault === "node-not-ready" ? 96 : 91, memory: fault === "oomkilled" ? 97 : 84, restarts: fault === "crashloop" || fault === "oomkilled" ? 6 : 0, resourcesFixed: false, probesFixed: false, nodeReady: fault !== "node-not-ready" };
}
export function runKubernetesLab(code: string, state: KubernetesLabState): LabResult {
  const next: KubernetesLabState = { ...state };
  const commands = code.split("\n").map((line) => line.trim()).filter((line) => line && !line.startsWith("#"));
  const output: string[] = []; let recognized = 0; let changedState = false; let rolloutChecked = false;
  const faultStatus = () => next.healthy ? "Running" : next.fault === "pending" ? "Pending" : next.fault === "node-not-ready" ? "Pending" : "CrashLoopBackOff";
  for (const command of commands) {
    if (/^kubectl\s+get\s+namespaces(?:\s|$)/.test(command)) { recognized++; output.push("NAME              STATUS\ndefault           Active\nkube-system       Active\nmonitoring        Active\nproduction        Active\nstaging           Active"); }
    else if (/^kubectl\s+get\s+nodes(?:\s|$)/.test(command)) { recognized++; output.push("NAME       STATUS                     CPU   MEMORY\nworker-01  Ready                      42%   61%\nworker-02  "+(next.nodeReady?"Ready":"NotReady")+"                      "+next.cpu+"%   "+next.memory+"%"); }
    else if (/^kubectl\s+describe\s+node\s+worker-02/.test(command)) { recognized++; output.push("Name: worker-02\nReady: "+(next.nodeReady?"True":"False")+"\nCPU pressure: "+(next.cpu>85?"True":"False")+"\nMemory pressure: "+(next.memory>90?"True":"False")+"\nConditions: "+(next.nodeReady?"Ready":"Ready=False, KubeletNotReady")+"\nAllocated resources: CPU "+next.cpu+"%, Memory "+next.memory+"%"); }
    else if (/^kubectl\s+get\s+deployments?(?:\s|$)/.test(command)) { recognized++; output.push("NAME       READY   UP-TO-DATE   AVAILABLE\ncheckout   "+next.ready+"/"+next.replicas+"       "+next.replicas+"            "+next.ready); }
    else if (/^kubectl\s+get\s+replicasets?(?:\s|$)/.test(command)) { recognized++; output.push("NAME                  DESIRED   CURRENT   READY\ncheckout-7c9d         "+next.replicas+"         "+next.replicas+"         "+next.ready); }
    else if (/^kubectl\s+get\s+pods?(?:\s|$)/.test(command)) { recognized++; output.push("NAME                READY   STATUS             RESTARTS   NODE\ncheckout-7c9d-a1    "+(next.healthy?"1/1":"0/1")+"     "+faultStatus()+"   "+next.restarts+"          worker-02\ncheckout-7c9d-b2    1/1     Running            0          worker-01\ncheckout-7c9d-c3    "+(next.ready>=3?"1/1     Running":"0/1     "+(next.fault==="pending"?"Pending":"ContainerCreating"))+"            0          worker-02"); }
    else if (/^kubectl\s+describe\s+pod\s+checkout/.test(command)) { recognized++; const reason = next.healthy?"Completed":next.fault==="oomkilled"?"OOMKilled":next.fault==="crashloop"?"Error":next.fault==="pending"?"Unschedulable":"NodeNotReady"; output.push("Name: checkout-7c9d-a1\nNamespace: production\nNode: worker-02\nStatus: "+faultStatus()+"\nLast State: "+(next.healthy?"Running":"Terminated")+"\nReason: "+reason+"\nRestart Count: "+next.restarts+"\nLimits: cpu=500m memory=512Mi\nReadiness probe: "+(next.probesFixed?"/healthz":"connection refused")+"\nEvents: "+(next.healthy?"Started, Readiness probe passed":reason+", BackOff, Unhealthy")); }
    else if (/^kubectl\s+get\s+events?(?:\s|$)/.test(command)) { recognized++; output.push(next.healthy?"Normal Started checkout pod\nNormal Readiness probe passed\nNormal SuccessfulCreate replicaset":"Warning "+(next.fault==="oomkilled"?"OOMKilled container exceeded memory limit":next.fault==="crashloop"?"BackOff restarting failed container":next.fault==="pending"?"FailedScheduling insufficient CPU / node selector mismatch":"NodeNotReady worker-02 kubelet not reporting")+"\nWarning Unhealthy readiness probe failed\nWarning Deployment has fewer available replicas than desired"); }
    else if (/^kubectl\s+top\s+nodes?(?:\s|$)/.test(command)) { recognized++; output.push("NAME       CPU(%)   MEMORY(%)\nworker-01  42       61\nworker-02  "+next.cpu+"        "+next.memory); }
    else if (/^kubectl\s+top\s+pods?(?:\s|$)/.test(command)) { recognized++; output.push("NAME               CPU(%)   MEMORY(Mi)\ncheckout-7c9d-a1   "+(next.healthy?180:next.cpu*10)+"      "+(next.healthy?256:next.memory*10)+"\ncheckout-7c9d-b2   120      220"); }
    else if (/^sudo\s+systemctl\s+restart\s+kubelet$/.test(command)) { recognized++; next.nodeReady=true; next.cpu=Math.min(next.cpu,55); output.push("kubelet restarted on worker-02; Node condition changed to Ready"); changedState=true; }
    else if (/^kubectl\s+set\s+resources\s+deployment\/checkout\b/.test(command)) { recognized++; if (/memory=([1-9]\d{2,})Mi|memory=([1-9]\d{0,2})Gi/.test(command) && /cpu=([1-9]\d{2,})m/.test(command)) { next.resourcesFixed=true; output.push("deployment.apps/checkout resource requests and limits updated"); } else output.push("error: insufficient resources. Set limits at least cpu=1000m and memory=1024Mi (or 1Gi)."); changedState=true; }
    else if (/^kubectl\s+set\s+probe\s+deployment\/checkout\b/.test(command)) { recognized++; if (/--readiness\b/.test(command) && /--liveness\b/.test(command) && /--get-url=http:\/\/:8080\/healthz/.test(command)) { next.probesFixed=true; output.push("deployment.apps/checkout readiness and liveness probes updated"); } else output.push("error: probe paths must match the app health endpoint /healthz"); changedState=true; }
    else if (/^kubectl\s+scale\s+deployment\/checkout\s+--replicas=(\d+)/.test(command)) { recognized++; next.replicas=Number(command.match(/--replicas=(\d+)/)![1]); next.ready=Math.min(next.ready,next.replicas); output.push("deployment.apps/checkout scaled to "+next.replicas+" replicas"); changedState=true; }
    else if (/^kubectl\s+rollout\s+restart\s+deployment\/checkout/.test(command)) { recognized++; const prerequisites=next.nodeReady && (next.fault!=="oomkilled" || next.resourcesFixed) && (next.fault!=="crashloop" || next.probesFixed) && (next.fault!=="pending" || next.resourcesFixed); if (prerequisites) { next.healthy=true; next.ready=next.replicas; next.cpu=48; next.memory=62; next.restarts=0; output.push("deployment.apps/checkout restarted\nNew ReplicaSet created; "+next.ready+"/"+next.replicas+" pods Ready"); } else output.push("error: rollout blocked. Resolve node readiness, resource limits or probes before restarting."); changedState=true; }
    else if (/^kubectl\s+rollout\s+status\s+deployment\/checkout/.test(command)) { recognized++; rolloutChecked=true; output.push(next.healthy && next.ready===next.replicas && next.nodeReady ? "deployment/checkout successfully rolled out ("+next.ready+"/"+next.replicas+" available)" : "Waiting for deployment checkout rollout: "+next.ready+"/"+next.replicas+" replicas available; fault="+next.fault); }
    else if (/^kubectl\s+apply\s+-f\s+checkout-fixed\.yaml$/.test(command)) { recognized++; output.push("error: manifest file is not mounted in this browser lab. Use kubectl set resources / kubectl set probe commands to edit the simulated deployment."); }
    else output.push("error: unsupported command: "+command+"\nSupported: get namespaces/nodes/deployments/replicasets/pods/events, describe node/pod, top nodes/pods, sudo systemctl restart kubelet, set resources, set probe, scale, rollout restart/status.");
  }
  const allRecognized=recognized===commands.length && commands.length>0;
  const recovered=next.healthy && next.ready===next.replicas && next.nodeReady;
  return { ok: allRecognized, output: recognized+"/"+commands.length+" commands executed\n"+output.join("\n"), detail: !allRecognized?"One or more commands are unsupported. Correct the command and run again.":recovered?"Deployment is healthy. Confirm rollout status and all replicas are Ready.": "Fault evidence: "+next.fault+". Apply the correct resource/probe/node fix, then restart and verify the rollout.", evidence: { recognized,total:commands.length,podsHealthy:recovered,cpu:next.cpu,memory:next.memory,restarts:next.restarts,replicas:next.replicas,ready:next.ready,changedState,rolloutVerified:recovered&&rolloutChecked,resourcesFixed:next.resourcesFixed,probesFixed:next.probesFixed,nodeReady:next.nodeReady,fault:next.fault }, state: next };
}
