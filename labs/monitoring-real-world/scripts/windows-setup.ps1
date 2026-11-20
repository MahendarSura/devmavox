$ErrorActionPreference = "Stop"
if (-not (Get-Command k3d -ErrorAction SilentlyContinue)) { throw "Install k3d first: https://k3d.io/" }
if (-not (Get-Command kubectl -ErrorAction SilentlyContinue)) { throw "Install kubectl first: https://kubernetes.io/docs/tasks/tools/" }
$LabDir = Split-Path -Parent $PSScriptRoot
$StateDir = Join-Path $LabDir ".lab-state"
New-Item -ItemType Directory -Force -Path $StateDir | Out-Null
if ((k3d cluster list) -notmatch "devmavox-lab") {
  k3d cluster create devmavox-lab --servers 1 --agents 2 --api-port 0.0.0.0:6550 --wait
} else {
  Write-Host "Using existing devmavox-lab cluster; it must expose API port 6550 for the browser terminal."
}
kubectl config use-context k3d-devmavox-lab
kubectl apply -f (Join-Path $LabDir "kubernetes/base/namespace.yaml")
kubectl apply -f (Join-Path $LabDir "kubernetes/base/checkout.yaml")
kubectl -n production rollout status deployment/checkout --timeout=120s
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.7.2/components.yaml
kubectl patch deployment metrics-server -n kube-system --type=json -p='[{"op":"add","path":"/spec/template/spec/containers/0/args/-","value":"--kubelet-insecure-tls"}]'
kubectl -n kube-system rollout status deployment/metrics-server --timeout=180s
kubectl config set-cluster k3d-devmavox-lab --server=https://host.docker.internal:6550 --insecure-skip-tls-verify=true
$KubeConfig = Join-Path $StateDir "terminal.kubeconfig"
kubectl config view --raw --minify --flatten | Set-Content -Encoding ascii $KubeConfig
Write-Host "Browser terminal kubeconfig written to $KubeConfig"
kubectl get nodes -o wide
