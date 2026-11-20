# DevMavox Real Monitoring & Kubernetes Labs

This folder provisions a **real, disposable lab stack**. Unlike the browser simulator, these exercises run real containers, Kubernetes workloads, Prometheus scrapes, Grafana dashboards, Loki logs, Tempo traces and Alertmanager rules.

## Prerequisites
- Docker Desktop (or Docker Engine + Compose v2)
- kubectl
- k3d
- Node is not required on the host; the checkout service runs in Docker

## Start the observability stack
```bash
docker compose up -d --build
docker compose ps
```
Open Grafana at http://localhost:3000 (admin / devmavox-lab). Prometheus: http://localhost:9090. Alertmanager: http://localhost:9093. Checkout API: http://localhost:8080.

Generate traffic:
```bash
curl http://localhost:8080/health
curl http://localhost:8080/checkout
```
Metrics: http://localhost:8080/metrics. Send a slow request: `curl 'http://localhost:8080/checkout?delay=1800'`. Send an error: `curl http://localhost:8080/fail`.

## Start the real Kubernetes practice cluster
```bash
./scripts/create-cluster.sh
kubectl get nodes
kubectl apply -f kubernetes/base/
kubectl -n production get deploy,pods,svc
```
Windows PowerShell users can run the equivalent commands in `scripts/windows-setup.ps1`.

## Six real labs
1. **Prometheus + PromQL:** query live `http_requests_total`, request rate, error ratio, CPU and latency histogram quantiles.
2. **Grafana:** import the provisioned Checkout Operations dashboard and build panels from real Prometheus queries.
3. **Logs:** inspect real container logs in Grafana Explore (Loki); filter by service, level and request ID.
4. **Traces:** inspect OpenTelemetry traces in Grafana Explore (Tempo); follow gateway → checkout → database spans.
5. **Alerts:** trigger the provided p95 latency alert with slow requests; observe Pending → Firing → Resolved in Prometheus/Alertmanager.
6. **Kubernetes:** use kubectl against the k3d cluster. Apply one fault manifest at a time from `kubernetes/faults/`, inspect Pods/Events/metrics, repair the Deployment, and verify rollout.

## Kubernetes fault exercises
```bash
kubectl apply -f kubernetes/faults/oomkilled.yaml
kubectl -n production get pods -w
kubectl -n production describe pod -l app=checkout
kubectl -n production get events --sort-by=.lastTimestamp
```
Repeat with `crashloopbackoff.yaml`, `pending.yaml`, and `node-not-ready-lab.yaml` (the last uses a deliberately unhealthy workload/node-condition exercise; do not stop a host kubelet on your workstation). Recovery examples are in `kubernetes/recovery/`.

## Reset
```bash
kubectl delete namespace production --ignore-not-found
kubectl apply -f kubernetes/base/
docker compose down -v
```

## Safety and scope
- Everything is local and disposable; do not point these exercises at a production cluster.
- The Docker Compose stack is a real observability environment. The Kubernetes cluster is a real k3d cluster on the student's machine.
- The Vercel-hosted Next.js site cannot itself host a privileged Kubernetes cluster or Docker daemon. A future authenticated lab-agent integration is required to launch isolated per-student clusters from the website. Never expose a host Docker socket or kubeconfig to a public browser client.
- Default credentials are for local training only. Change them before any shared or internet-accessible deployment.
