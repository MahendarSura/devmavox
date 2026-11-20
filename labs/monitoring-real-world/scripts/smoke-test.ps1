$ErrorActionPreference = "Stop"
$envValues = Get-Content (Join-Path $PSScriptRoot "../.env") | Where-Object { $_ -match "=" -and $_ -notmatch "^\s*#" } | ConvertFrom-StringData
$env:LAB_TERMINAL_USERNAME = $envValues["LAB_TERMINAL_USERNAME"]
$env:LAB_TERMINAL_PASSWORD = $envValues["LAB_TERMINAL_PASSWORD"]
function Wait-Http([string]$Url, [int]$Seconds = 90) {
  $until = (Get-Date).AddSeconds($Seconds)
  do {
    try { Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 5 | Out-Null; return }
    catch { Start-Sleep -Seconds 3 }
  } while ((Get-Date) -lt $until)
  throw "Timed out waiting for $Url"
}
Write-Host "Checking checkout, Prometheus, Grafana, Loki, Tempo and Alertmanager..."
Wait-Http "http://localhost:8080/health"
Wait-Http "http://localhost:9090/-/ready"
Wait-Http "http://localhost:3000/api/health"
Wait-Http "http://localhost:3100/ready"
Wait-Http "http://localhost:3200/ready"
Wait-Http "http://localhost:9093/-/ready"
Write-Host "Checking authenticated browser terminal..."
$secure = ConvertTo-SecureString $env:LAB_TERMINAL_PASSWORD -AsPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential($env:LAB_TERMINAL_USERNAME, $secure)
Invoke-WebRequest -Uri "http://localhost:7681/" -Credential $credential -UseBasicParsing | Out-Null
Write-Host "Checking live Kubernetes CPU and memory metrics..."
for ($attempt = 0; $attempt -lt 30; $attempt++) {
  try { kubectl top nodes | Out-Null; break }
  catch { if ($attempt -eq 29) { throw "Metrics Server did not return node metrics" }; Start-Sleep -Seconds 3 }
}
kubectl top nodes
Write-Host "All HTTP and Kubernetes smoke checks passed."
