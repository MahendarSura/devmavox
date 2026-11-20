# DevMavox Real Monitoring & Kubernetes Labs

This folder provides a disposable local environment with actual Docker services and a real local k3d Kubernetes cluster. It is not hosted inside Vercel. The Monitoring Hands-on Labs page includes a separate **Live infrastructure workspace** that connects to this local bridge for real metrics, dashboards, logs, traces, Kubernetes inventory and evidence-based assessment; the student workspace uses live service APIs and a restricted local Kubernetes bridge; it does not award marks for simulated output.

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
- Website live-data bridge: http://localhost:8787/api/health

Terminal is bound to 127.0.0.1 only. It runs as an unprivileged container user and uses a local-only password. The kubeconfig file is mounted read-only, but its credential has cluster-admin access to this disposable k3d cluster; read-only mounting does NOT mean Kubernetes read-only RBAC. Never point it at a shared or production cluster. Do not expose port 7681 publicly or share the generated password.

## Connect the website to live infrastructure\n\nThe Compose stack starts `monitoring-bridge` on `127.0.0.1:8787`. The website workspace polls service health, Prometheus query results, Loki logs, Grafana dashboards and Kubernetes inventory. It can generate real checkout success/slow/failure traffic, execute allowlisted kubectl inspection/recovery commands, and apply the OOMKilled, CrashLoopBackOff and Pending fault manifests to the disposable cluster. It submits PromQL, Grafana dashboard UID, Loki request ID and Tempo trace ID to a local evidence verifier; the six-lab report is persisted in the shared local Docker volume. This report is local to that student's machine and is not synchronized to Vercel or a central student account.\n\nFor local Next.js development, the default CORS allowlist permits `http://localhost:3000` and `http://127.0.0.1:3000`. If the website is hosted on a different origin, add that exact origin to `LAB_ALLOWED_ORIGINS` in the ignored `.env` file, comma-separated, then recreate the bridge service. Do not use `*`; the bridge can read a disposable cluster-admin kubeconfig and must only trust the DevMavox site origin. The bridge and all lab ports are bound to localhost and must not be exposed publicly.\n\n## Generate live telemetry
```bash
curl http://localhost:8080/health
curl http://localhost:8080/checkout
curl 'http://localhost:8080/checkout?delay=1800'
curl http://localhost:8080/fail
curl http://localhost:8080/metrics
```
Prometheus scrapes the checkout service. Grafana is provisioned with Prometheus, Loki and Tempo datasources. The built-in dashboard is a reference dashboard; the Grafana assessment requires a separate student-created dashboard titled with `Student` and at least four query-backed panels. The checkout process emits Prometheus counters/histograms, JSON request logs and OpenTelemetry traces.

## Six guided labs
Open `guides/README.md` and complete in order:
1. Prometheus + PromQL against live checkout metrics.
2. Grafana dashboard panels backed by Prometheus.
3. Loki logs with request ID / trace ID correlation.
4. OpenTelemetry traces in Tempo.
5. Prometheus alert Pending → Firing → Resolved lifecycle.
6. Kubernetes fault reproduction, investigation and recovery.

Use the authenticated browser terminal to execute the commands. The terminal has kubectl, curl, jq and common shell tools. Each lab has a real-service evidence check; run `bash /workspace/scripts/lab-assess.sh start <lab-id>` before work and `bash /workspace/scripts/lab-assess.sh verify <lab-id>` afterward. For PromQL, pass your query as the third argument; for Logs, pass the request ID; for Traces, pass the trace ID. Example: `bash /workspace/scripts/lab-assess.sh verify promql 'sum(rate(http_requests_total{service="checkout"}[5m]))'`. After all six, run `bash /workspace/scripts/lab-assess.sh report` for the final six-lab result. A pass is based on the live service API checks and retained cluster evidence, not on the browser simulator. Start each attempt with `bash /workspace/scripts/lab-assess.sh start <lab-id>` and verify with the same ID after finishing. For Alert lifecycle, run `bash /workspace/scripts/watch-alert-lifecycle.sh` during the incident and recovery so the actual pending, firing and inactive transitions are recorded. For the NodeNotReady drill, use `bash /workspace/scripts/node-not-ready-drill.sh` in the authenticated local terminal; this stops and restores only one disposable k3d agent. It is connected to the disposable local k3d cluster through the generated kubeconfig. Start and verify evidence with `bash /workspace/scripts/lab-assess.sh start promql` and `bash /workspace/scripts/lab-assess.sh verify promql` (replace the ID for each lab). Evidence is persisted in a Docker volume on the student's machine.

## Kubernetes fault drills
Apply one fault at a time:
```bash
kubectl apply -f /workspace/kubernetes/faults/oomkilled.yaml
kubectl -n production get pods -w
kubectl -n production describe pod -l app=checkout
kubectl -n production get events --sort-by=.lastTimestamp
```
The repository folder is mounted read-only at `/workspace` inside the browser terminal, so all Kubernetes manifests and guides are available there. Recover with `kubectl apply -f /workspace/kubernetes/recovery/checkout-resources.yaml` and verify `kubectl -n production rollout status deployment/checkout`.

For genuine NodeNotReady, use `bash scripts/node-not-ready-drill.sh` (PowerShell: `scripts/node-not-ready-drill.ps1`) from the host. It stops only a disposable k3d agent container for 45 seconds and restores it even if the drill is interrupted. Never run against production or a shared cluster.

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
- Promtail needs access to the Docker Engine socket to discover container logs. Docker socket access is highly privileged even when the socket mount is marked read-only; run this stack only on a trusted local development machine.
- The k3d API is published on host port 6550 so the browser-terminal container can reach it. Restrict inbound access to this port with the host firewall; do not expose it to public networks.
- Public multi-student labs require a separately hosted authenticated controller, isolated per-student cluster provisioning, quotas, lifecycle cleanup and server-side assessment. That shared hosted controller is not included in this local lab deliverable.
- Grafana's sample credentials are local-training-only. Change them before any non-local use.
