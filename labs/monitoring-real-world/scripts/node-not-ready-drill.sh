#!/usr/bin/env bash
# Stop one disposable k3d worker, observe NotReady, restore it and verify Ready.
set -euo pipefail
CLUSTER="${1:-devmavox-lab}"
AUTO="${2:-}"
STATE="$HOME/.lab-state/kubernetes-drills"; mkdir -p "$STATE"
AGENT="$(docker ps --format '{{.Names}}' | grep "^k3d-${CLUSTER}-agent-" | head -n1 || true)"
[[ -n "$AGENT" ]] || { echo "No running k3d agent for $CLUSTER"; exit 1; }
if [[ "$AUTO" != "--yes" ]]; then
  read -r -p "Type STOP to stop disposable worker $AGENT for up to 90 seconds: " CONFIRM
  [[ "$CONFIRM" == STOP ]] || exit 1
fi
restore(){ docker start "$AGENT" >/dev/null 2>&1 || true; }
docker stop "$AGENT" >/dev/null
trap restore EXIT
DEADLINE=$((SECONDS+90)); NODE=""
while ((SECONDS<DEADLINE)); do
  NODE="$(kubectl get nodes -o json | jq -r --arg n "$AGENT" '.items[]|select(.metadata.name==$n)|.metadata.name' | head -n1)"
  if [[ -n "$NODE" ]]; then
    NOTREADY="$(kubectl get node "$NODE" -o json | jq -r 'any(.status.conditions[]?;.type=="Ready" and (.status=="False" or .status=="Unknown"))')"
    [[ "$NOTREADY" == true ]] && break
  fi
  sleep 3
done
[[ -n "$NODE" ]] || { echo "Node object $AGENT not found"; exit 1; }
NOTREADY="$(kubectl get node "$NODE" -o json | jq -r 'any(.status.conditions[]?;.type=="Ready" and (.status=="False" or .status=="Unknown"))')"
[[ "$NOTREADY" == true ]] || { echo "NodeNotReady transition was not observed"; exit 1; }
restore
trap - EXIT
kubectl wait --for=condition=Ready "node/$NODE" --timeout=180s
kubectl annotate node "$NODE" devmavox.io/node-not-ready-observed=true devmavox.io/node-not-ready-recovered=true --overwrite
jq -n --arg node "$NODE" --argjson at "$(date +%s)" '{scenario:"node-not-ready",node:$node,fault_observed:true,recovery_verified:true,verified_at:$at}' > "$STATE/node-not-ready.json"
echo "NodeNotReady observed on $NODE and worker recovery verified."
