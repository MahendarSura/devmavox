$ErrorActionPreference = "Stop"
$LabDir = Split-Path -Parent $PSScriptRoot
Set-Location $LabDir
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) { throw "Docker Desktop is required." }
docker compose version | Out-Null
if (-not (Test-Path ".env")) {
  $bytes = New-Object byte[] 32
  $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
  $rng.GetBytes($bytes)
  $rng.Dispose()
  $password = ([BitConverter]::ToString($bytes) -replace "-", "").ToLowerInvariant()
  @("LAB_TERMINAL_USERNAME=student", "LAB_TERMINAL_PASSWORD=$password") | Set-Content -Encoding ascii ".env"
  Write-Host "Created local .env with a random terminal password. Keep it private."
}
if (-not (Select-String -Path ".env" -Pattern "^LAB_ALLOWED_ORIGINS=" -Quiet)) {
  Add-Content -Path ".env" -Value "LAB_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,https://devmavox.vercel.app,https://devmavox-mahendras-projects-215526d8.vercel.app,https://devmavox-kphpy9yr0-mahendras-projects-215526d8.vercel.app"
}
& "$PSScriptRoot/windows-setup.ps1"
docker compose up -d --build
docker compose ps
& "$PSScriptRoot/smoke-test.ps1"
Write-Host "Grafana: http://localhost:3000"
Write-Host "Browser terminal: http://localhost:7681 (credentials are in local .env)"
