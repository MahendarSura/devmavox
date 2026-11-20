#!/usr/bin/env bash
# Stops only one disposable k3d agent; EXIT trap restores it on interruption.
set -euo pipefail
CLUSTER="${1:-devmavox-lab}"
AGENT="$(docker ps --format '{{.Names}}' | grep "^k3d-${CLUSTER}-agent-" | head -n1 || true)"
[[ -n "$AGENT" ]] || { echo "No running k3d agent for $CLUSTER"; exit 1; }
echo "Target disposable worker: $AGENT. Watch kubectl get nodes -w in another terminal."
read -r -p "Type STOP to stop this worker for 45 seconds: " CONFIRM
[[ "$CONFIRM" == STOP ]] || { echo Cancelled; exit 1; }
docker stop "$AGENT" >/dev/null
restore(){ docker start "$AGENT" >/dev/null 2>&1 || true; }
trap restore EXIT
echo "Worker stopped; observe NodeNotReady for 45 seconds."; sleep 45
docker start "$AGENT" >/dev/null; trap - EXIT
kubectl wait --for=condition=Ready "node/$AGENT" --timeout=180s
kubectl get nodes -o wide
