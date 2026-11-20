$ErrorActionPreference = "Stop"
# Stops only a disposable k3d agent container; never stops the host kubelet.
$cluster = "devmavox-lab"
$agent = docker ps --format "{{.Names}}" | Where-Object { $_ -match "^k3d-$cluster-agent-" } | Select-Object -First 1
if (-not $agent) { throw "No running k3d agent found for $cluster" }
$node = $agent
Write-Host "Target disposable node: $node"
Write-Host "In another terminal run: kubectl get nodes -w"
$confirm = Read-Host "Type STOP to stop this disposable worker for 45 seconds"
if ($confirm -ne "STOP") { Write-Host "Cancelled"; exit 0 }
docker stop $agent
Start-Sleep -Seconds 90
docker start $agent
kubectl wait --for=condition=Ready "node/$node" --timeout=180s
kubectl get nodes -o wide
