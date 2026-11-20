$ErrorActionPreference = "Stop"
$LabDir = Split-Path -Parent $PSScriptRoot
Set-Location $LabDir
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) { throw "Docker Desktop is required." }
docker compose version | Out-Null
if (-not (Test-Path ".env")) {
  $bytes = New-Object byte[] 32
  [System.Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
  $password = [Convert]::ToHexString($bytes)
  @("LAB_TERMINAL_USERNAME=student", "LAB_TERMINAL_PASSWORD=$password") | Set-Content -Encoding ascii ".env"
  Write-Host "Created local .env with a random terminal password. Keep it private."
}
& "$PSScriptRoot/windows-setup.ps1"
docker compose up -d --build
docker compose ps
& "$PSScriptRoot/smoke-test.ps1"
Write-Host "Grafana: http://localhost:3000"
Write-Host "Browser terminal: http://localhost:7681 (credentials are in local .env)"
