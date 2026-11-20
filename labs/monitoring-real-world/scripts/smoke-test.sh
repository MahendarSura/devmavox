#!/usr/bin/env bash
set -euo pipefail
BASE="${1:-http://localhost}"
echo "Checking checkout health and metrics..."
curl --fail --silent "$BASE:8080/health" >/dev/null
curl --fail --silent "$BASE:8080/metrics" | grep -q 'http_requests_total'
echo "Checking Prometheus readiness..."
curl --fail --silent "$BASE:9090/-/ready" >/dev/null
echo "Checking Grafana health..."
curl --fail --silent "$BASE:3000/api/health" >/dev/null
echo "Checking Loki readiness..."
curl --fail --silent "$BASE:3100/ready" >/dev/null
echo "Checking Tempo readiness..."
curl --fail --silent "$BASE:3200/ready" >/dev/null
echo "Checking authenticated browser terminal..."
set -a
. ./.env
set +a
curl --fail --silent --user "$LAB_TERMINAL_USERNAME:$LAB_TERMINAL_PASSWORD" "$BASE:7681/" >/dev/null
echo "Checking Alertmanager readiness..."
curl --fail --silent "$BASE:9093/-/ready" >/dev/null
echo "Checking Kubernetes Metrics Server..."
kubectl top nodes >/dev/null
echo "All HTTP smoke checks passed."
