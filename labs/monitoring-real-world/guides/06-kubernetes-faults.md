# Lab 06 — Kubernetes faults and recovery

Start: `bash /workspace/scripts/lab-assess.sh start kubernetes`. Inspect nodes, namespaces, deployments, ReplicaSets, pods, events and live CPU/memory:
```bash
kubectl get nodes -o wide
kubectl get namespaces
kubectl -n production get deployments,replicasets,pods,services
kubectl -n production get events --sort-by=.lastTimestamp
kubectl top nodes
kubectl top pods -n production
``

Apply ONE fault, capture `get pods -w`, `describe pod`, `logs --previous` and Events, then recover and verify rollout.

OOMKilled:
```bash
kubectl apply -f /workspace/kubernetes/faults/oomkilled.yaml
kubectl -n production describe pod -l app=checkout
kubectl apply -f /workspace/kubernetes/recovery/checkout-resources.yaml
kubectl -n production rollout status deployment/checkout
``
CrashLoopBackOff:
```bash
kubectl apply -f /workspace/kubernetes/faults/crashloopbackoff.yaml
kubectl -n production logs deployment/checkout --previous
kubectl -n production describe pod -l app=checkout
kubectl apply -f /workspace/kubernetes/recovery/checkout-resources.yaml
kubectl -n production rollout status deployment/checkout
``
Pending:
```bash
kubectl apply -f /workspace/kubernetes/faults/pending.yaml
kubectl -n production describe pod -l app=checkout
kubectl -n production get events --sort-by=.lastTimestamp
kubectl apply -f /workspace/kubernetes/recovery/checkout-resources.yaml
kubectl -n production rollout status deployment/checkout
``

NodeNotReady is HOST TERMINAL ONLY (browser terminal has no Docker CLI/socket):
`bash ./scripts/node-not-ready-drill.sh` (Windows: `./scripts/node-not-ready-drill.ps1`). It stops only one disposable k3d worker for 45 seconds and restores it on interruption. Never use a production/shared cluster.

Final: recover all drills, confirm desired replicas available and nodes Ready, then run `bash /workspace/scripts/lab-assess.sh verify kubernetes`. Assessment requires retained fault Events plus healthy recovery; a healthy baseline alone does not pass. Evidence stays in the student's local terminal volume and is not synced to Vercel.
