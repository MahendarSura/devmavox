# Lab 06 — Kubernetes faults and recovery

Prerequisites: k3d, kubectl and a disposable local cluster. Run scripts/create-cluster.sh (Windows: scripts/windows-setup.ps1).

Inspect:
    kubectl get nodes -o wide
    kubectl get namespaces
    kubectl -n production get deployments,replicasets,pods,services
    kubectl -n production get events --sort-by=.lastTimestamp
    kubectl top nodes
    kubectl top pods

Apply one fault at a time. Observe with get pods -w, describe pod, logs --previous and Events.

OOMKilled:
    kubectl apply -f kubernetes/faults/oomkilled.yaml
    kubectl -n production describe pod -l app=checkout
    kubectl apply -f kubernetes/recovery/checkout-resources.yaml
    kubectl -n production rollout status deployment/checkout

CrashLoopBackOff:
    kubectl apply -f kubernetes/faults/crashloopbackoff.yaml
    kubectl -n production logs deployment/checkout --previous
    kubectl apply -f kubernetes/recovery/checkout-resources.yaml
    kubectl -n production rollout status deployment/checkout

Pending:
    kubectl apply -f kubernetes/faults/pending.yaml
    kubectl -n production describe pod -l app=checkout
    kubectl apply -f kubernetes/recovery/checkout-resources.yaml
    kubectl -n production rollout status deployment/checkout

NodeNotReady status: the current node-not-ready-lab.yaml uses a nonexistent node label and produces unschedulable pods. This is NOT a genuine NodeNotReady node condition. A real node failure lab requires a dedicated disposable multi-node VM cluster where a worker can safely be isolated and recovered. Never stop a workstation kubelet or run these faults against production.

Pass evidence: capture fault reason, recovery command, all replicas Ready, rollout complete and service responding. Metrics Server may need installation before kubectl top works.
