#!/usr/bin/env bash
# Safe NodeNotReady exercise: stops ONLY a k3d disposable agent container, never the host kubelet.
set -euo pipefail
CLUSTER="${1:-devmavox-lab}"
AGENT="$(docker ps --format '{{.Names}}' | grep "^k3d-${CLUSTER}-agent-" | head -n 1 || true)"
if [[ -z "$AGENT" ]]; then echo "No running k3d agent found for cluster $CLUSTER"; exit 1; fi
NODE="${AGENT#k3d-}"
echo "Target disposable node container: $AGENT (Kubernetes node: $NODE)"
echo "Watch in another terminal: kubectl get nodes -w"
read -r -p "Type STOP to stop this disposable worker for 45 seconds: " CONFIRM
[[ "$CONFIRM" == "STOP" ]] || { echo "Cancelled"; exit 1; }
docker stop "$AGENT"
echo "Worker stopped. Observe NodeNotReady and pod rescheduling for up to 45 seconds."
sleep 45
docker start "$AGENT"
echo "Worker restarted. Wait for Ready:"
kubectl wait --for=condition=Ready "node/$NODE" --timeout=180s
kubectl get nodes -o wide
