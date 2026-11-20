# DevMavox Real Monitoring & Kubernetes Labs

This repository folder provides reproducible, local, real-infrastructure exercises. It is separate from the browser-based simulator.

## Prerequisites
- Docker Desktop / Docker Engine with Compose v2
- kubectl and k3d
- Bash (or Windows PowerShell scripts supplied below)

## Start the observability stack
From this folder:
```bash
docker compose up -d --build
docker compose ps
./scripts/smoke-test.sh
```
Grafana: http://localhost:3000 (local training login: admin / devmavox-lab). Prometheus: http://localhost:9090. Alertmanager: http://localhost:9093. Checkout API: http://localhost:8080.

Generate traffic:
```bash
curl http://localhost:8080/health
curl http://localhost:8080/checkout
curl 'http://localhost:8080/checkout?delay=1800'
curl http://localhost:8080/fail
```
Metrics endpoint: http://localhost:8080/metrics.

## Start Kubernetes
```bash
./scripts/create-cluster.sh
kubectl get nodes -o wide
kubectl get namespaces
kubectl -n production get deploy,rs,pods,svc
```
Windows: `scripts/windows-setup.ps1`.

## Six guided labs
Complete the student tasks and evidence checks in `guides/README.md`:
1. Prometheus + PromQL against live checkout metrics.
2. Grafana dashboard panels backed by Prometheus.
3. Loki log search and incident correlation.
4. OpenTelemetry traces in Tempo.
5. Prometheus alert Pending → Firing → Resolved lifecycle.
6. Kubernetes fault reproduction, investigation and recovery.

## Kubernetes fault drills
Apply one fault at a time:
```bash
kubectl apply -f kubernetes/faults/oomkilled.yaml
kubectl -n production get pods -w
kubectl -n production describe pod -l app=checkout
kubectl -n production get events --sort-by=.lastTimestamp
```
Repeat for `crashloopbackoff.yaml` and `pending.yaml`. Recover with `kubectl apply -f kubernetes/recovery/checkout-resources.yaml` and verify `kubectl -n production rollout status deployment/checkout`.

For a genuine NodeNotReady exercise on a disposable k3d cluster only, run `scripts/node-not-ready-drill.sh` (PowerShell: `scripts/node-not-ready-drill.ps1`). It stops and restarts a k3d agent container, not the host kubelet. Watch `kubectl get nodes -w` in another terminal. Never run against production or a shared cluster.

## Reset
```bash
kubectl delete namespace production --ignore-not-found
kubectl apply -f kubernetes/base/
docker compose down -v
k3d cluster delete devmavox-lab
```

## Honest implementation boundaries
- Docker Compose services are real local containers. Prometheus scrapes the checkout service; Grafana is provisioned with Prometheus/Loki/Tempo datasources; Alertmanager receives Prometheus alerts.
- Kubernetes runs in a real local k3d cluster. The node drill targets only a disposable k3d agent.
- These files do **not** make Vercel host Docker or Kubernetes. A public website needs a separately deployed, authenticated lab controller/agent to provision isolated per-student clusters. Never expose Docker socket, kubeconfig or cluster credentials to browser JavaScript.
- The browser-based six-lab simulator remains a simulator until the authenticated lab-controller integration is implemented.
- Default credentials are local-training-only. Do not expose this stack to the public internet with defaults.
