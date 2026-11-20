# Lab 03 — Logs investigation with Loki

Start the stack and generate traffic:
    curl -s http://localhost:8080/health
    curl -s -H 'x-request-id: student-503-01' http://localhost:8080/fail
    curl -s 'http://localhost:8080/checkout?delay=1500'

Open Grafana → Explore → Loki. The checkout service writes one JSON record per completed HTTP request to stdout; Promtail discovers Docker containers and forwards their logs to Loki.

Student tasks:
1. Inspect labels using {container=~".*checkout.*"}.
2. Parse the JSON records with {container=~".*checkout.*"} | json.
3. Filter failures with {container=~".*checkout.*"} | json | level="ERROR".
4. Find the record with request_id="student-503-01".
5. Record timestamp, status, duration_ms, trace_id and span_id.
6. Compare the failure timestamp with the Prometheus 5xx rate and locate the corresponding trace in Tempo using trace_id.
7. Explain why request ID and trace ID solve different correlation problems.

Pass evidence: exact LogQL query, matching JSON record, request ID, trace ID and a correlation explanation. If no log arrives, inspect Promtail targets and Loki readiness before assuming the application failed.

Assessment: start with `bash /workspace/scripts/lab-assess.sh start logs`, then submit the exact request ID you found in the real 503 log: `bash /workspace/scripts/lab-assess.sh verify logs student-503-01`. The grader queries Loki for that request ID. Evidence is stored locally in the terminal volume, not synced to Vercel.
