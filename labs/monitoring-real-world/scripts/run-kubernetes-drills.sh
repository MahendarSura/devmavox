#!/usr/bin/env bash
# Reproduce and recover three real pod faults in the disposable k3d cluster.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STATE="$HOME/.lab-state/kubernetes-drills"
mkdir -p "$STATE"
observe_fault() {
  local scenario="$1" deadline=$((SECONDS+120)) pods events found
  while ((SECONDS<deadline)); do
    pods="$(kubectl -n production get pods -l app=checkout -o json)"
    events="$(kubectl -n production get events -o json)"
    case "$scenario" in
      oomkilled) found="$(jq '[.items[]|select(any(.status.containerStatuses[]?;.lastState.terminated.reason=="OOMKilled" or .state.waiting.reason=="CrashLoopBackOff"))]|length' <<<"$pods")" ;;
      crashloopbackoff) found="$(jq '[.items[]|select(any(.status.containerStatuses[]?;.state.waiting.reason=="CrashLoopBackOff"))]|length' <<<"$pods")" ;;
      pending) found="$(jq '[.items[]|select(any(.status.conditions[]?;.type=="PodScheduled" and .status=="False"))]|length' <<<"$pods")" ;;
    esac
    if ((found>0)); then
      jq -n --arg scenario "$scenario" --argjson pods "$pods" --argjson events "$events" --argjson at "$(date +%s)" '{scenario:$scenario,fault_observed:true,pod_evidence:$pods,event_evidence:$events,verified_at:$at}' > "$STATE/$scenario-observed.json"
      return 0
    fi
    sleep 2
  done
  echo "Timed out waiting for actual $scenario pod state" >&2
  kubectl -n production get pods -o wide >&2 || true
  kubectl -n production get events --sort-by=.lastTimestamp >&2 || true
  return 1
}
recover_fault() {
  local scenario="$1" recovered
  kubectl apply -f "$ROOT/kubernetes/recovery/checkout-resources.yaml" >/dev/null
  kubectl -n production rollout status deployment/checkout --timeout=180s
  recovered="$(kubectl -n production get deployment checkout -o json | jq -r '(.status.availableReplicas // 0) == (.spec.replicas // 0) and (.spec.replicas // 0)>0')"
  [[ "$recovered" == true ]] || { echo "$scenario recovery failed" >&2; return 1; }
  jq -n --arg scenario "$scenario" --argjson at "$(date +%s)" '{scenario:$scenario,fault_observed:true,recovery_verified:true,verified_at:$at}' > "$STATE/$scenario.json"
  echo "$scenario: real fault observed and recovery verified"
}
kubectl apply -f "$ROOT/kubernetes/base/namespace.yaml" >/dev/null
kubectl apply -f "$ROOT/kubernetes/base/checkout.yaml" >/dev/null
kubectl -n production rollout status deployment/checkout --timeout=180s
for scenario in oomkilled crashloopbackoff pending; do
  echo "Injecting $scenario"
  kubectl apply -f "$ROOT/kubernetes/faults/$scenario.yaml" >/dev/null
  observe_fault "$scenario"
  recover_fault "$scenario"
done
echo "Three pod fault drills complete. Run node-not-ready-drill.sh --yes for the fourth drill."
