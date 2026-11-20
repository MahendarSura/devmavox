# Lab 03 — Logs investigation with Loki

Start the stack. Generate traffic with /health, /fail and /checkout?delay=1500. Open Grafana Explore and select Loki.

Student tasks:
1. Inspect labels using {container=~".*checkout.*"}.
2. Search checkout container logs.
3. Compare timestamps around healthy and failing requests.
4. Correlate the observed 503 response with the Prometheus 5xx spike.
5. Inspect Promtail and Loki container logs if no entries arrive.
6. Identify which diagnostic fields are missing from the service logs and propose structured JSON logging with request_id, trace_id, route and status.

Pass evidence: exact LogQL query, container and timestamps, plus a correlation explanation. Do not invent request IDs or structured fields that the current service does not emit.
