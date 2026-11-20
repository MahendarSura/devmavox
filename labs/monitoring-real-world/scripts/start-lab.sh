#!/usr/bin/env bash
set -euo pipefail
LAB_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$LAB_DIR"
command -v docker >/dev/null || { echo "Docker is required"; exit 1; }
docker compose version >/dev/null || { echo "Docker Compose v2 is required"; exit 1; }
if [[ ! -f .env ]]; then
  command -v openssl >/dev/null || { echo "Install OpenSSL to generate a local terminal password"; exit 1; }
  printf 'LAB_TERMINAL_USERNAME=student\nLAB_TERMINAL_PASSWORD=%s\n' "$(openssl rand -hex 24)" > .env
  chmod 600 .env
  echo "Created local .env with a random terminal password. Keep it private."
fi
bash ./scripts/create-cluster.sh
docker compose up -d --build
docker compose ps
bash ./scripts/smoke-test.sh
echo "Grafana: http://localhost:3000"
echo "Browser terminal: http://localhost:7681 (credentials are in local .env)"
