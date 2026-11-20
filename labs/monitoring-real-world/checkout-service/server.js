const { NodeSDK } = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");
const { trace, context } = require("@opentelemetry/api");
const { randomUUID } = require("node:crypto");

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({ url: "http://otel-collector:4318/v1/traces" }),
  instrumentations: [getNodeAutoInstrumentations()]
});
sdk.start();

const express = require("express");
const client = require("prom-client");
const app = express();
const register = new client.Registry();
client.collectDefaultMetrics({ register, labels: { service: "checkout" } });
const requests = new client.Counter({
  name: "http_requests_total",
  help: "HTTP requests",
  labelNames: ["service", "method", "route", "status"],
  registers: [register]
});
const duration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Request duration seconds",
  labelNames: ["service", "route", "status"],
  buckets: [0.05, 0.1, 0.2, 0.3, 0.5, 0.75, 1, 1.5, 2, 3, 5],
  registers: [register]
});

app.use((req, res, next) => {
  const startedAt = Date.now();
  const endTimer = duration.startTimer();
  const requestId = req.header("x-request-id") || randomUUID();
  const activeSpan = trace.getSpan(context.active());
  const spanContext = activeSpan?.spanContext();
  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);
  res.on("finish", () => {
    const status = String(res.statusCode);
    requests.inc({ service: "checkout", method: req.method, route: req.path, status });
    endTimer({ service: "checkout", route: req.path, status });
    // JSON stdout is collected by Promtail from the Docker container.
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: res.statusCode >= 500 ? "ERROR" : res.statusCode >= 400 ? "WARN" : "INFO",
      service: "checkout",
      method: req.method,
      route: req.path,
      status: res.statusCode,
      duration_ms: Date.now() - startedAt,
      request_id: requestId,
      trace_id: spanContext?.traceId || null,
      span_id: spanContext?.spanId || null
    }));
  });
  next();
});

app.get("/health", (_req, res) => res.json({ status: "ok", service: "checkout" }));
app.get("/checkout", async (req, res) => {
  const delay = Math.min(Number(req.query.delay || 80), 6000);
  await new Promise(resolve => setTimeout(resolve, delay));
  res.json({ status: "accepted", service: "checkout", delay_ms: delay, request_id: req.requestId });
});
app.get("/fail", (_req, res) => res.status(503).json({
  error: "simulated downstream payment dependency failure",
  service: "checkout"
}));
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(8080, "0.0.0.0", () => console.log(JSON.stringify({
  timestamp: new Date().toISOString(), level: "INFO", service: "checkout", message: "checkout listening on :8080"
})));

process.on("SIGTERM", async () => {
  await sdk.shutdown();
  process.exit(0);
});
