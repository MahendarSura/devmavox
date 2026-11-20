# Lab 02 — Grafana dashboard

Start the stack and open http://localhost:3000. Sign in using the local credentials in the main README. Open folder DevMavox Hands-on Labs and dashboard DevMavox - Checkout Operations.

Student tasks:
1. Confirm the Prometheus datasource is healthy.
2. Inspect Request rate, 5xx error ratio, p95 latency and Process memory.
3. Generate baseline traffic and then 503 traffic using curl /checkout and /fail.
4. Observe the corresponding dashboard panels change.
5. Add a panel for sum(rate(http_requests_total{service="checkout"}[5m])).
6. Add a p95 panel using histogram_quantile and save the dashboard.
7. Explain empty panels caused by a down target, wrong time range or mismatched label selector.

Pass evidence: live request, error and latency panels plus two saved student-created panels and their PromQL.

Assessment: start with `bash /workspace/scripts/lab-assess.sh start grafana`, then finish with `bash /workspace/scripts/lab-assess.sh verify <lab-id>`. Evidence is stored locally in the terminal volume, not synced to Vercel.
