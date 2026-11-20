$ErrorActionPreference = "Stop"
if (-not (Get-Command k3d -ErrorAction SilentlyContinue)) { throw "Install k3d first: https://k3d.io/" }
if ((k3d cluster list) -notmatch "devmavox-lab") { k3d cluster create devmavox-lab --servers 1 --agents 2 --wait }
kubectl config use-context k3d-devmavox-lab
kubectl apply -f "$PSScriptRoot/../kubernetes/base/"
kubectl -n production rollout status deployment/checkout --timeout=120s
kubectl get nodes -o wide
