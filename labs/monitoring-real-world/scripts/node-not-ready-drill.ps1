$ErrorActionPreference = "Stop"
$cluster = "devmavox-lab"
$agent = docker ps --format "{{.Names}}" | Where-Object { $_ -match "^k3d-$cluster-agent-" } | Select-Object -First 1
if (-not $agent) { throw "No running k3d agent found for $cluster" }
Write-Host "Target disposable worker: $agent. Watch kubectl get nodes -w in another terminal."
$confirm = Read-Host "Type STOP to stop this worker for 45 seconds"
if ($confirm -ne "STOP") { Write-Host "Cancelled"; exit 0 }
docker stop $agent | Out-Null
try { Start-Sleep -Seconds 45 } finally { docker start $agent | Out-Null }
kubectl wait --for=condition=Ready "node/$agent" --timeout=180s
kubectl get nodes -o wide
