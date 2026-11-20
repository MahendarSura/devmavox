#!/usr/bin/env bash
# Run three disposable-cluster pod fault/recovery drills and retain evidence.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STATE="$HOME/.lab-state/kubernetes-drills"
mkdir -p "$STATE"
record() {
  local name="$1" pod_json="$2" event_json="$3" bad events recovered
  bad="$(jq '[.items[] | select(any(.status.containerStatuses[]?; .state.waiting.reason=="CrashLoopBackOff" or .lastState.terminated.reason=="OOMKilled") or any(.status.conditions[]?; .type=="PodScheduled" and .status=="False"))] | length' <<<"$pod_json")"
  events="$(jq '[.items[] | select(.type=="Warning" or .reason=="BackOff" or .reason=="OOMKilling" or .reason=="FailedScheduling")] | length' <<<"$event_json")"
  if ((bad<1 && events<1)); then echo "No observable fault evidence for $name" >&2; return 1; fi
  kubectl apply -f "$ROOT/kubernetes/recovery/checkout-resources.yaml" >/dev/null
  kubectl -n production rollout status deployment/checkout --timeout=180s
  recovered="$(kubectl -n production get deployment checkout -o json | jq -r '(.status.availableReplicas // 0) == (.spec.replicas // 0) and (.spec.replicas // 0)>0')"
  [[ "$recovered" == true ]] || { echo "$name recovery not verified" >&2; return 1; }
  jq -n --arg scenario "$name" --argjson affected_pods "$bad" --argjson warning_events "$events" --argjson at "$(date +%s)" '{scenario:$scenario,fault_observed:true,affected_pods:$affected_pods,warning_events:$warning_events,recovery_verified:true,verified_at:$at}' > "$STATE/$name.json"
  echo "$name: fault observed; recovery verified"
}
kubectl apply -f "$ROOT/kubernetes/base/namespace.yaml" >/dev/null
for scenario in oomkilled crashloopbackoff pending; do
  kubectl apply -f "$ROOT/kubernetes/faults/$scenario.yaml" >/dev/null
  sleep 25
  pods="$(kubectl -n production get pods -l app=checkout -o json)"
  events="$(kubectl -n production get events -o json)"
  record "$scenario" "$pods" "$events"
done
echo "Pod fault drills complete. Run the host-only node-not-ready-drill.sh for the fourth drill."
