# Lab 06 — Kubernetes faults and recovery

Prerequisites: Docker, k3d and kubectl. Run scripts/create-cluster.sh (Windows: scripts/windows-setup.ps1).

Inspect:
    kubectl get nodes -o wide
    kubectl get namespaces
    kubectl -n production get deployments,replicasets,pods,services
    kubectl -n production get events --sort-by=.lastTimestamp
    kubectl top nodes
    kubectl top pods

Apply one fault at a time. Observe get pods -w, describe pod, logs --previous and Events.

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

Real NodeNotReady:
    kubectl get nodes -w
    # In a second terminal, from this lab folder:
    ./scripts/node-not-ready-drill.sh
    # Windows: ./scripts/node-not-ready-drill.ps1
The drill stops only one disposable k3d agent container for 45 seconds, then starts it and waits for the node Ready condition. Never stop a workstation kubelet. Never run this on a shared or production cluster.

Pass evidence: capture the actual fault reason, recovery commands, all replicas Ready, rollout complete and service responding. Metrics Server may need installation before kubectl top works.
