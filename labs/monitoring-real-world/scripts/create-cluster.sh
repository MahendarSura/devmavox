#!/usr/bin/env bash
set -euo pipefail
command -v k3d >/dev/null || { echo "Install k3d: https://k3d.io/"; exit 1; }
if ! k3d cluster list | grep -q '^devmavox-lab'; then k3d cluster create devmavox-lab --servers 1 --agents 2 --wait; fi
kubectl config use-context k3d-devmavox-lab
kubectl apply -f "$(dirname "$0")/../kubernetes/base/namespace.yaml"
kubectl apply -f "$(dirname "$0")/../kubernetes/base/checkout.yaml"
kubectl -n production rollout status deployment/checkout --timeout=120s
kubectl get nodes -o wide
