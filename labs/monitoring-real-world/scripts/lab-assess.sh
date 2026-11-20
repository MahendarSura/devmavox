#!/usr/bin/env bash
set -euo pipefail
ACTION="${1:-}" LAB="${2:-}" STUDENT_INPUT="${3:-}" STATE="$HOME/.lab-state"
mkdir -p "$STATE"
if [[ "$ACTION" == report ]]; then
  REC="$STATE/assessment.json"
  [[ -f "$REC" ]] || { echo "No assessment evidence yet."; exit 1; }
  jq -r '.entries | group_by(.lab) | map(max_by(.verified_at)) | sort_by(.lab) | .[] | [.lab, (if .verified then "PASS" else "NOT PASSED" end), ((.score|tostring)+"/100"), ((.elapsed_seconds|tostring)+"s"), .detail] | @tsv' "$REC"
  COUNT="$(jq '[.entries|group_by(.lab)[]|max_by(.verified_at)|select(.verified==true)]|length' "$REC")"
  echo "FINAL RESULT: $COUNT / 6 labs verified"
  [[ "$COUNT" -eq 6 ]]
  exit
fi
case "$ACTION:$LAB" in start:promql|start:grafana|start:logs|start:traces|start:alerts|start:kubernetes|verify:promql|verify:grafana|verify:logs|verify:traces|verify:alerts|verify:kubernetes) ;; *) echo "Usage: lab-assess.sh start <lab-id> | verify promql <query> | verify logs <request-id> | verify traces <trace-id> | verify <grafana|alerts|kubernetes> | report"; exit 2;; esac
ATT="$STATE/$LAB-attempt.json"; REC="$STATE/assessment.json"; NOW="$(date +%s)"
if [[ "$ACTION" == start ]]; then
  N=0; [[ ! -f "$ATT" ]] || N="$(jq -r '.attempts // 0' "$ATT")"
  jq -n --arg lab "$LAB" --argjson at "$NOW" --argjson attempts "$((N+1))" '{lab:$lab,started_at:$at,attempts:$attempts}' > "$ATT"
  echo "Started $LAB attempt $((N+1))"; exit 0
fi
[[ -f "$ATT" ]] || { echo "Start the lab attempt first."; exit 2; }
START="$(jq -r .started_at "$ATT")"; N="$(jq -r .attempts "$ATT")"; ELAPSED=$((NOW-START)); PASS=false; DETAIL=""; EVIDENCE='{}'
case "$LAB" in
promql)
  Q="$STUDENT_INPUT"
  [[ -n "$Q" ]] || { echo "Submit your PromQL query: verify promql '<your PromQL>'"; exit 2; }
  D="$(curl -fsSG --data-urlencode "query=$Q" http://prometheus:9090/api/v1/query)"
  V="$(jq -r '.data.result[0].value[1] // empty' <<<"$D")"
  if [[ "$(jq -r .status <<<"$D")" == success && -n "$V" && "$V" != NaN && "$V" != 0 ]]; then PASS=true; DETAIL="Live checkout request rate query returned $V req/s"; EVIDENCE="$(jq -n --arg q "$Q" --arg value "$V" '{query:$q,request_rate:$value}')"; else DETAIL="No non-zero live request rate. Generate traffic and inspect Prometheus targets."; fi;;
grafana)
  D="$(curl -fsSu admin:devmavox-lab 'http://grafana:3000/api/search?type=dash-db')"
  DASH_UID="$(jq -r '.[]|select((.title|ascii_downcase|contains("student")) or (.title|ascii_downcase|contains("lab submission")))|.uid' <<<"$D"|head -n1)"
  if [[ -n "$DASH_UID" ]]; then
    X="$(curl -fsSu admin:devmavox-lab "http://grafana:3000/api/dashboards/uid/$DASH_UID")"
    C="$(jq '[.dashboard.panels[]? | select((.targets // [])|length>0)]|length' <<<"$X")"
    if ((C>=4)); then PASS=true; DETAIL="Student dashboard $DASH_UID has $C query-backed panels"; EVIDENCE="$(jq -n --arg uid "$DASH_UID" --argjson panels "$C" '{dashboard_uid:$uid,query_backed_panels:$panels}')"; else DETAIL="Student dashboard needs at least four panels with queries (found $C)."; fi
  else DETAIL="Create and save your own dashboard with Student in its title; the provisioned demo dashboard does not count."; fi;;
logs)
  D="$(curl -fsSG --data-urlencode "query={container=~\".*devmavox-checkout.*\"} | json | request_id=\"$STUDENT_INPUT\"" --data-urlencode limit=100 http://loki:3100/loki/api/v1/query_range)"
  C="$(jq '[.data.result[].values[]?]|length' <<<"$D")"
  if [[ -n "$STUDENT_INPUT" && "$C" -gt 0 ]]; then PASS=true; DETAIL="Loki confirmed student request ID $STUDENT_INPUT in $C matching log lines"; EVIDENCE="$(jq -n --arg id "$STUDENT_INPUT" --argjson count "$C" '{request_id:$id,matching_log_lines:$count}')"; else DETAIL="Supply an exact request ID from a real 503 log: verify logs <request-id>. Trigger /fail with x-request-id header."; fi;;
traces)
  [[ -n "$STUDENT_INPUT" ]] || { echo "Submit the real trace ID: verify traces <trace-id>"; exit 2; }
  D="$(curl -fsS "http://tempo:3200/api/traces/$STUDENT_INPUT")"
  C="$(jq '[.batches[]?.scopeSpans[]?.spans[]?]|length' <<<"$D")"
  if ((C>0)); then PASS=true; DETAIL="Tempo confirmed student trace $STUDENT_INPUT with $C spans"; EVIDENCE="$(jq -n --arg id "$STUDENT_INPUT" --argjson count "$C" '{trace_id:$id,span_count:$count}')"; else DETAIL="Trace ID not found in Tempo. Copy a real checkout trace ID from Grafana Explore."; fi;;
alerts)
  R="$(curl -fsS 'http://prometheus:9090/api/v1/rules?type=alert')"; A="$(curl -fsS http://alertmanager:9093/api/v2/alerts)"
  ACTIVE="$(jq '[.[]|select(.status.state=="active")]|length' <<<"$A")"; RULES="$(jq '[.data.groups[].rules[]|select(.type=="alerting")]|length' <<<"$R")"
  H="$STATE/alert-lifecycle.json"; STATES=""; [[ ! -f "$H" ]] || STATES="$(jq -r '[.[].state]|unique|join(",")' "$H")"
  if ((RULES>0 && ACTIVE==0)) && [[ "$STATES" == *pending* && "$STATES" == *firing* && "$STATES" == *inactive* ]]; then PASS=true; DETAIL="Recorded real pending, firing and inactive alert states; Alertmanager is clear"; EVIDENCE="$(jq -n --arg states "$STATES" --argjson rules "$RULES" '{observed_states:$states,alert_rules:$rules}')"; else DETAIL="Lifecycle not proven. Run watch-alert-lifecycle.sh during incident and recovery; require pending, firing and inactive."; fi;;
kubernetes)
  NODES="$(kubectl get nodes -o json)"; READY="$(jq '[.items[]|select(any(.status.conditions[];.type=="Ready" and .status=="True"))]|length' <<<"$NODES")"
  EV="$(kubectl get events -A -o json)"; FAULT="$(jq '[.items[]|select(.reason=="BackOff" or .reason=="OOMKilling" or .reason=="FailedScheduling" or .reason=="NodeNotReady" or .reason=="Killing")]|length' <<<"$EV")"
  DEP="$(kubectl -n production get deployment checkout -o json 2>/dev/null || echo '{}')"; WANT="$(jq -r '.spec.replicas // 0' <<<"$DEP")"; HAVE="$(jq -r '.status.availableReplicas // 0' <<<"$DEP")"
  if ((READY>=3 && WANT>0 && HAVE==WANT && FAULT>0)); then PASS=true; DETAIL="Ready nodes=$READY; checkout replicas=$HAVE/$WANT; retained fault events=$FAULT"; EVIDENCE="$(jq -n --argjson nodes "$READY" --argjson desired "$WANT" --argjson available "$HAVE" --argjson faults "$FAULT" '{ready_nodes:$nodes,desired_replicas:$desired,available_replicas:$available,fault_events:$faults}')"; else DETAIL="Not passed: nodes=$READY replicas=$HAVE/$WANT fault_events=$FAULT. Reproduce, investigate and recover a fault."; fi;;
esac
SCORE=0; [[ "$PASS" != true ]] || SCORE=100
[[ -f "$REC" ]] || echo '{"entries":[]}' > "$REC"
TMP="$REC.tmp"; jq --arg lab "$LAB" --arg detail "$DETAIL" --argjson attempts "$N" --argjson elapsed "$ELAPSED" --argjson score "$SCORE" --argjson passed "$PASS" --argjson at "$NOW" --argjson evidence "$EVIDENCE" '.entries += [{lab:$lab,attempts:$attempts,elapsed_seconds:$elapsed,score:$score,verified:$passed,detail:$detail,evidence:$evidence,verified_at:$at}]' "$REC" > "$TMP"; mv "$TMP" "$REC"
echo "$LAB | $SCORE/100 | verified=$PASS | ${ELAPSED}s"; echo "$DETAIL"; echo "Evidence: $REC"
[[ "$PASS" == true ]]
