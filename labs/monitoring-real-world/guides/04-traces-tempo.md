# Lab 04 — Distributed tracing with Tempo

Start the stack and confirm the OpenTelemetry Collector and Tempo containers are running. Generate normal and delayed checkout requests. Open Grafana Explore and select Tempo; search for service checkout.

Student tasks:
1. Find a trace from the real checkout service.
2. Inspect its span waterfall, duration and status.
3. Compare normal and delayed request traces.
4. Explain trace context propagation and the traceparent header.
5. Correlate trace time with Prometheus p95 changes.
6. If no trace appears, inspect Collector logs and OTLP receiver health. Do not use simulator fixture trace IDs as evidence.

Pass evidence: a trace emitted by the running service and a clear explanation of the slow span. This lab must be runtime-tested before being marked passed.
