# Lab 01 — Prometheus and PromQL

Start the stack from this directory with docker compose up -d --build. Open http://localhost:9090/targets and confirm the checkout target is UP.

Generate traffic:
    for i in $(seq 1 30); do curl -s http://localhost:8080/checkout >/dev/null; done
    for i in $(seq 1 5); do curl -s http://localhost:8080/fail >/dev/null; done

Student tasks:
1. Run up and explain the result.
2. Query request rate: sum(rate(http_requests_total{service="checkout"}[5m])).
3. Query 5xx rate: sum(rate(http_requests_total{service="checkout",status=~"5.."}[5m])).
4. Calculate error ratio by dividing 5xx rate by total request rate.
5. Calculate p95 with histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{service="checkout"}[5m])) by (le)).
6. Generate slow traffic using curl 'http://localhost:8080/checkout?delay=1800' repeatedly and observe p95.

Pass evidence: target UP, request rate greater than zero, 5xx ratio rises after /fail, p95 rises under slow traffic. Explain counter, rate and histogram buckets.
