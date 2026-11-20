#!/usr/bin/env bash
# Stop one disposable k3d worker, capture the NotReady transition, restore it.
set -euo pipefail
CLUSTER="${1:-devmavox-lab}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STATE="$HOME/.lab-state/kubernetes-drills"; mkdir -p "$STATE"
AGENT="$(docker ps --format '{{.Names}}' | grep "^k3d-${CLUSTER}-agent-" | head -n1 || true)"
[[ -n "$AGENT" ]] || { echo "No running k3d agent for $CLUSTER"; exit 1; }
read -r -p "Type STOP to stop disposable worker $AGENT for 45 seconds: " CONFIRM
[[ "$CONFIRM" == STOP ]] || exit 1
restore(){ docker start "$AGENT" >/dev/null 2>&1 || true; }
docker stop "$AGENT" >/dev/null
trap restore EXIT
sleep 15
NOTREADY="$(kubectl get nodes -o json | jq '[.items[]|select(any(.status.conditions[]?;.type=="Ready" and (.status=="False" or .status=="Unknown")))]|length')"
((NOTREADY>0)) || { echo "NodeNotReady was not observed"; exit 1; }
restore
trap - EXIT
kubectl wait --for=condition=Ready "node/$AGENT" --timeout=180s
kubectl annotate node "$AGENT" devmavox.io/node-not-ready-observed=true devmavox.io/node-not-ready-recovered=true --overwrite
jq -n --arg node "$AGENT" --argjson observed true --argjson recovered true --argjson at "$(date +%s)" '{scenario:"node-not-ready",node:$node,fault_observed:$observed,recovery_verified:$recovered,verified_at:$at}' > "$STATE/node-not-ready.json"
echo "NodeNotReady observed and worker recovered."
