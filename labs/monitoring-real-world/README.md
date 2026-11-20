# DevMavox Real Monitoring & Kubernetes Labs

This folder provides a disposable local environment with actual Docker services and a real local k3d Kubernetes cluster. It is not hosted inside Vercel.

## Prerequisites
- Docker Desktop / Docker Engine with Compose v2
- kubectl and k3d
- Bash on Linux/macOS, or Windows PowerShell

## One-command startup

Linux/macOS:
```bash
bash ./scripts/start-lab.sh
```

Windows PowerShell:
```powershell
.\scripts\start-lab.ps1
```

The startup script generates a random local terminal password in the ignored `.env`, creates a disposable 3-node k3d cluster, prepares a restricted-to-localhost browser terminal, starts the observability stack and runs HTTP smoke checks.

## Open the tools
- Grafana: http://localhost:3000 (local training login: admin / devmavox-lab)
- Prometheus: http://localhost:9090
- Alertmanager: http://localhost:9093
- Loki: http://localhost:3100
- Tempo: http://localhost:3200
- Checkout API: http://localhost:8080
- Authenticated browser terminal: http://localhost:7681 (username/password are in local `.env`)

Terminal is bound to 127.0.0.1 only. It runs as an unprivileged container user, uses a local-only password and receives a read-only kubeconfig for the disposable k3d cluster. Do not expose port 7681 publicly or share the generated password.

## Generate live telemetry
```bash
curl http://localhost:8080/health
curl http://localhost:8080/checkout
curl 'http://localhost:8080/checkout?delay=1800'
curl http://localhost:8080/fail
curl http://localhost:8080/metrics
```
Prometheus scrapes the checkout service. Grafana is provisioned with Prometheus, Loki and Tempo datasources. The checkout process emits Prometheus counters/histograms, JSON request logs and OpenTelemetry traces.

## Six guided labs
Open `guides/README.md` and complete in order:
1. Prometheus + PromQL against live checkout metrics.
2. Grafana dashboard panels backed by Prometheus.
3. Loki logs with request ID / trace ID correlation.
4. OpenTelemetry traces in Tempo.
5. Prometheus alert Pending → Firing → Resolved lifecycle.
6. Kubernetes fault reproduction, investigation and recovery.

Use the browser terminal to execute the commands. The terminal has kubectl and common shell tools. It is connected to the disposable local k3d cluster through the generated kubeconfig.

## Kubernetes fault drills
Apply one fault at a time:
```bash
kubectl apply -f /workspace/kubernetes/faults/oomkilled.yaml
kubectl -n production get pods -w
kubectl -n production describe pod -l app=checkout
kubectl -n production get events --sort-by=.lastTimestamp
```
The repository folder is mounted read-only at `/workspace` inside the browser terminal, so all Kubernetes manifests and guides are available there. Recover with `kubectl apply -f /workspace/kubernetes/recovery/checkout-resources.yaml` and verify `kubectl -n production rollout status deployment/checkout`.

For genuine NodeNotReady, use `scripts/node-not-ready-drill.sh` (PowerShell: `scripts/node-not-ready-drill.ps1`) from the host. It stops only a disposable k3d agent container and restarts it after 90 seconds. Never run against production or a shared cluster.

## Reset
```bash
kubectl delete namespace production --ignore-not-found
kubectl apply -f kubernetes/base/namespace.yaml
kubectl apply -f kubernetes/base/checkout.yaml
docker compose down -v
k3d cluster delete devmavox-lab
```

## Security and deployment boundaries
- Docker Compose and k3d run on the student's own machine. Vercel does not host Docker, privileged containers or Kubernetes clusters.
- The local terminal is authenticated and bound to localhost. Never publish its port, Docker socket or kubeconfig to the internet.
- Public multi-student labs require a separately hosted authenticated controller, isolated per-student cluster provisioning, quotas, lifecycle cleanup and server-side assessment. That shared hosted controller is not included in this local lab deliverable.
- Grafana's sample credentials are local-training-only. Change them before any non-local use.
