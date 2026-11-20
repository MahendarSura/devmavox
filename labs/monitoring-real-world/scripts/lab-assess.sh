#!/usr/bin/env bash
set -euo pipefail
ACTION="${1:-}"
LAB="${2:-}"
case "$ACTION" in start|verify) ;; *) echo "Usage: bash /workspace/scripts/lab-assess.sh start|verify <promql|grafana|logs|traces|alerts|kubernetes>"; exit 2;; esac
case "$LAB" in promql|grafana|logs|traces|alerts|kubernetes) ;; *) echo "Unknown lab: $LAB"; exit 2;; esac
STATE="$HOME/.lab-state"
mkdir -p "$STATE"
ATTEMPT="$STATE/$LAB-attempt.json"
RECORDS="$STATE/assessment.json"
now="$(date +%s)"
if [[ "$ACTION" == "start" ]]; then
  attempts=0
  if [[ -f "$ATTEMPT" ]]; then attempts="$(jq -r '.attempts // 0' "$ATTEMPT")"; fi
  jq -n --arg lab "$LAB" --argjson started "$now" --argjson attempts "$((attempts+1))" '{lab:$lab,started_at:$started,attempts:$attempts}' > "$ATTEMPT"
  echo "Started $LAB attempt $((attempts+1)) at $(date -u -d "@$now" +%FT%TZ)"
  exit 0
fi
[[ -f "$ATTEMPT" ]] || { echo "Run start first: bash /workspace/scripts/lab-assess.sh start $LAB"; exit 2; }
started="$(jq -r '.started_at' "$ATTEMPT")"
attempts="$(jq -r '.attempts' "$ATTEMPT")"
elapsed="$((now-started))"
passed=false
detail=""
case "$LAB" in
  promql)
    q='sum(rate(http_requests_total{service="checkout"}[5m]))'
    data="$(curl -fsSG --data-urlencode "query=$q" http://prometheus:9090/api/v1/query)"
    if [[ "$(echo "$data" | jq -r '.status')" == success && "$(echo "$data" | jq -r '.data.result|length')" -gt 0 ]]; then passed=true; detail="Prometheus returned live checkout request-rate series"; else detail="No checkout request-rate series; generate traffic and check scrape target"; fi
    ;;
  grafana)
    data="$(curl -fsS http://grafana:3000/api/dashboards/uid/devmavox-checkout)"
    if [[ "$(echo "$data" | jq -r '.dashboard.panels|length')" -ge 4 ]]; then passed=true; detail="Provisioned Grafana dashboard and four live panels are available"; else detail="Expected dashboard panels not found"; fi
    ;;
  logs)
    data="$(curl -fsSG --data-urlencode 'query={service="checkout"}' --data-urlencode 'limit=20' http://loki:3100/loki/api/v1/query_range)"
    if [[ "$(echo "$data" | jq -r '.data.result|length')" -gt 0 ]]; then passed=true; detail="Loki returned checkout log streams"; else detail="No checkout logs found; generate requests and check Promtail"; fi
    ;;
  traces)
    data="$(curl -fsS 'http://tempo:3200/api/search?limit=20')"
    if [[ "$(echo "$data" | jq -r '.traces|length')" -gt 0 ]]; then passed=true; detail="Tempo returned real trace records"; else detail="No traces found; generate requests and inspect OpenTelemetry Collector"; fi
    ;;
  alerts)
    data="$(curl -fsS http://prometheus:9090/api/v1/rules)"
    if [[ "$(echo "$data" | jq -r '[.data.groups[].rules[]|select(.name=="CheckoutHighP95Latency" or .name=="CheckoutHigh5xxRate")]|length')" -ge 2 ]]; then passed=true; detail="Both checkout alert rules are loaded in Prometheus"; else detail="Checkout alert rules are not loaded"; fi
    ;;
  kubernetes)
    nodes="$(kubectl get nodes -o json)"
    ready="$(echo "$nodes" | jq '[.items[]|select(any(.status.conditions[]; .type=="Ready" and .status=="True"))]|length')"
    pods="$(kubectl -n production get pods -o json)"
    healthy="$(echo "$pods" | jq '[.items[]|select(.status.phase=="Running" and ([.status.containerStatuses[]?.ready] | all))]|length')"
    if [[ "$ready" -ge 3 && "$healthy" -ge 3 ]]; then passed=true; detail="At least three Kubernetes nodes Ready and three production pods healthy"; else detail="Cluster recovery incomplete: ready_nodes=$ready ready_pods=$healthy"; fi
    ;;
esac
score=0
if [[ "$passed" == true ]]; then score=100; fi
[[ -f "$RECORDS" ]] || echo '{"entries":[]}' > "$RECORDS"
tmp="$RECORDS.tmp"
jq --arg lab "$LAB" --arg detail "$detail" --argjson attempts "$attempts" --argjson elapsed "$elapsed" --argjson score "$score" --argjson passed "$passed" --argjson at "$now" '.entries += [{lab:$lab,attempts:$attempts,elapsed_seconds:$elapsed,score:$score,verified:$passed,detail:$detail,verified_at:$at}]' "$RECORDS" > "$tmp"
mv "$tmp" "$RECORDS"
echo "Lab: $LAB | Attempt: $attempts | Elapsed: ${elapsed}s | Score: $score/100 | Verified: $passed"
echo "$detail"
echo "Evidence saved to $RECORDS"
