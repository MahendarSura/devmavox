#!/usr/bin/env bash
set -euo pipefail
BASE="${BASE_URL:-http://127.0.0.1}"
fail(){ echo "FAIL: $*" >&2; exit 1; }
wait_for(){ local url="$1"; for _ in $(seq 1 40); do curl -fsS "$url" >/dev/null 2>&1 && return 0; sleep 3; done; fail "service did not become ready: $url"; }
echo "[1/8] Wait for application and observability APIs"
for url in "$BASE:8080/health" "$BASE:9090/-/ready" "$BASE:3000/api/health" "$BASE:3100/ready" "$BASE:3200/ready" "$BASE:9093/-/ready"; do wait_for "$url"; done
echo "[2/8] Generate successful, slow and failed checkout requests"
curl -fsS "$BASE:8080/checkout?delay=120" >/dev/null
curl -fsS "$BASE:8080/checkout?delay=1600" >/dev/null
REQUEST_ID="ci-failure-$(date +%s)"
STATUS="$(curl -sS -o /dev/null -w '%{http_code}' -H "x-request-id: $REQUEST_ID" "$BASE:8080/fail")"
[[ "$STATUS" == 503 ]] || fail "expected /fail to return 503, got $STATUS"
echo "[3/8] Verify Prometheus scraped checkout request metrics"
sleep 12
PROM="$(curl -fsSG --data-urlencode 'query=http_requests_total{service="checkout"}' "$BASE:9090/api/v1/query")"
jq -e '.status=="success" and (.data.result|length)>0' <<<"$PROM" >/dev/null || fail "checkout request counter missing from Prometheus"
echo "[4/8] Verify Prometheus target health"
TARGETS="$(curl -fsS "$BASE:9090/api/v1/targets")"
jq -e '[.data.activeTargets[]|select(.labels.job=="checkout" and .health=="up")]|length>0' <<<"$TARGETS" >/dev/null || fail "checkout Prometheus target is not UP"
echo "[5/8] Verify Grafana provisioned datasources"
for ds in prometheus loki tempo; do
  curl -fsSu admin:devmavox-lab "$BASE:3000/api/datasources/uid/$ds" | jq -e '.uid=="'"$ds"'"' >/dev/null || fail "Grafana datasource $ds missing"
done
echo "[6/8] Verify Loki ingested the correlated 503 request log"
FOUND=false
for _ in $(seq 1 30); do
  QUERY="$(curl -fsSG --data-urlencode 'query={container=~".*devmavox-checkout.*"}' --data-urlencode 'limit=200' "$BASE:3100/loki/api/v1/query_range" || true)"
  if jq -e --arg id "$REQUEST_ID" '[.data.result[].values[]?[1] | fromjson? | select(.request_id==$id and .status==503)]|length>0' <<<"$QUERY" >/dev/null 2>&1; then FOUND=true; break; fi
  sleep 3
done
[[ "$FOUND" == true ]] || fail "Loki did not return request $REQUEST_ID with status 503"
echo "[7/8] Verify trace export reached Tempo"
TRACE_FOUND=false
for _ in $(seq 1 30); do
  TRACE_ID="$(jq -r --arg id "$REQUEST_ID" '[.data.result[].values[]?[1] | fromjson? | select(.request_id==$id) | .trace_id // empty][0] // empty' <<<"$QUERY")"
  if [[ -n "$TRACE_ID" && "$TRACE_ID" != null ]]; then
    TRACE="$(curl -fsS "$BASE:3200/api/traces/$TRACE_ID" || true)"
    if jq -e '[.batches[]?.scopeSpans[]?.spans[]?]|length>0' <<<"$TRACE" >/dev/null 2>&1; then TRACE_FOUND=true; break; fi
  fi
  sleep 3
done
[[ "$TRACE_FOUND" == true ]] || fail "Tempo trace for request $REQUEST_ID was not found (check OTel exporter and Promtail correlation)"
echo "[8/10] Verify local website bridge API"
wait_for "$BASE:8787/api/health"
curl -fsS "$BASE:8787/api/metrics?query=up" | jq -e '.status=="success"' >/dev/null || fail "bridge Prometheus query endpoint failed"
curl -fsS "$BASE:8787/api/dashboards" | jq -e 'type=="array"' >/dev/null || fail "bridge Grafana dashboard endpoint failed"
curl -fsS "$BASE:8787/api/traces" | jq -e 'type=="object"' >/dev/null || fail "bridge Tempo trace search endpoint failed"
curl -fsS "$BASE:8787/api/alerts" | jq -e 'type=="array"' >/dev/null || fail "bridge Alertmanager endpoint failed"
curl -fsS "$BASE:8787/api/assessment/report" | jq -e '.total==6 and .maximum==600' >/dev/null || fail "bridge assessment report endpoint failed"
echo "[9/10] Verify Alertmanager API and print evidence IDs"
curl -fsS "$BASE:9093/api/v2/status" | jq -e '.cluster' >/dev/null || fail "Alertmanager API unavailable"
echo "[10/10] Website bridge endpoints passed"
echo "PASS: Docker observability integration checks passed"
echo "REQUEST_ID=$REQUEST_ID"
echo "TRACE_ID=$TRACE_ID"
