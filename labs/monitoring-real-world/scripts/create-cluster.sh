#!/usr/bin/env bash
set -euo pipefail
command -v k3d >/dev/null || { echo "Install k3d: https://k3d.io/"; exit 1; }
command -v kubectl >/dev/null || { echo "Install kubectl: https://kubernetes.io/docs/tasks/tools/"; exit 1; }
LAB_DIR="$(cd "$(dirname "$0")/.." && pwd)"
STATE_DIR="$LAB_DIR/.lab-state"
mkdir -p "$STATE_DIR"
if ! k3d cluster list | grep -q '^devmavox-lab'; then
  k3d cluster create devmavox-lab --servers 1 --agents 2 --api-port 0.0.0.0:6550 --wait
else
  if ! docker port k3d-devmavox-lab-serverlb 6443/tcp 2>/dev/null | grep -q .; then
    echo "Existing cluster does not expose API port 6550. Run: k3d cluster delete devmavox-lab, then rerun this script."
    exit 1
  fi
fi
kubectl config use-context k3d-devmavox-lab
kubectl apply -f "$LAB_DIR/kubernetes/base/namespace.yaml"
kubectl apply -f "$LAB_DIR/kubernetes/base/checkout.yaml"
kubectl -n production rollout status deployment/checkout --timeout=120s
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.7.2/components.yaml
kubectl patch deployment metrics-server -n kube-system --type=json -p='[{"op":"add","path":"/spec/template/spec/containers/0/args/-","value":"--kubelet-insecure-tls"}]'
kubectl -n kube-system rollout status deployment/metrics-server --timeout=180s
kubectl config view --raw --minify --flatten > "$STATE_DIR/terminal.kubeconfig"
KUBECONFIG="$STATE_DIR/terminal.kubeconfig" kubectl config set-cluster k3d-devmavox-lab --server=https://host.docker.internal:6550 --insecure-skip-tls-verify=true
chmod 600 "$STATE_DIR/terminal.kubeconfig"
kubectl get nodes -o wide
echo "Browser terminal kubeconfig written to $STATE_DIR/terminal.kubeconfig"
