#!/usr/bin/env bash
set -euo pipefail
BASE="${1:-http://localhost}"
LAB_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$LAB_DIR"
set -a
. ./.env
set +a
wait_http() {
  local url="$1"
  for attempt in $(seq 1 30); do
    if curl --fail --silent "$url" >/dev/null; then return 0; fi
    sleep 3
  done
  echo "Timed out waiting for $url" >&2
  return 1
}
echo "Checking checkout, Prometheus, Grafana, Loki, Tempo and Alertmanager..."
wait_http "$BASE:8080/health"
curl --fail --silent "$BASE:8080/metrics" | grep -q 'http_requests_total'
wait_http "$BASE:9090/-/ready"
wait_http "$BASE:3000/api/health"
wait_http "$BASE:3100/ready"
wait_http "$BASE:3200/ready"
wait_http "$BASE:9093/-/ready"
echo "Checking authenticated browser terminal..."
for attempt in $(seq 1 30); do
  if curl --fail --silent --user "$LAB_TERMINAL_USERNAME:$LAB_TERMINAL_PASSWORD" "$BASE:7681/" >/dev/null; then break; fi
  if [[ "$attempt" == "30" ]]; then echo "Terminal did not become ready" >&2; exit 1; fi
  sleep 3
done
echo "Checking live Kubernetes CPU and memory metrics..."
kubectl top nodes
echo "All HTTP and Kubernetes smoke checks passed."
