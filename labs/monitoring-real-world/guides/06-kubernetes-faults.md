# Lab 06 — Kubernetes fault reproduction and recovery

Use only the disposable DevMavox k3d cluster. Start the lab attempt first.

## Inspect the healthy baseline
```bash
kubectl get namespaces
kubectl get nodes -o wide
kubectl -n production get deployments,replicasets,pods -o wide
kubectl top nodes
kubectl top pods -n production
kubectl -n production get events --sort-by=.lastTimestamp
```

## Run three pod-level fault drills
From the host or browser terminal with the repository mounted, run:
```bash
bash /workspace/scripts/run-kubernetes-drills.sh
```
The runner applies OOMKilled, CrashLoopBackOff and Pending manifests one at a time, captures actual Pod/Warning Event evidence, applies the recovery manifest, and waits for all checkout replicas to become available. Each drill is recorded in `~/.lab-state/kubernetes-drills/`.

For each failure, inspect:
```bash
kubectl -n production get pods -o wide
kubectl -n production describe pods -l app=checkout
kubectl -n production get events --sort-by=.lastTimestamp
kubectl -n production rollout history deployment/checkout
```

## Genuine NodeNotReady drill
This drill must be run from the host because it stops a Docker container. It only targets one disposable k3d agent:
```bash
bash ./scripts/node-not-ready-drill.sh
```
Type STOP when prompted. It waits for the node to report NotReady, restores the worker even on interruption, waits for Ready, and stores evidence. Never run this against production/shared clusters.

## Final verification
After all four drill evidence files exist and the checkout deployment is healthy:
```bash
bash /workspace/scripts/lab-assess.sh verify kubernetes
bash /workspace/scripts/lab-assess.sh report
```
A Kubernetes pass requires four separate fault-and-recovery records, at least three Ready nodes, and all desired checkout replicas available. The grader does not award marks for a healthy baseline alone.
