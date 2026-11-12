import type { NoteData } from "../../types";

const data: NoteData = {
  "title": "ArgoCD Installation and Production Reference Guide",
  "description": "Comprehensive training notes covering ArgoCD installation, architecture, workflow, troubleshooting, security, and interview preparation.",
  "sections": [
    {
      "heading": "1. Introduction, Purpose and Fundamentals",
      "explanation": "ArgoCD is a declarative, GitOps continuous delivery tool for Kubernetes. It continuously monitors Git repositories and applies desired state to clusters. Understanding its core concepts—applications, sync, health, and RBAC—is essential before installing.",
      "steps": [
        "Identify the target Kubernetes cluster and ensure kubeconfig is accessible.",
        "Review the GitOps workflow: Git repo → ArgoCD Application → Cluster deployment.",
        "Set up basic prerequisites: kubectl, Helm, and a Git repository with application manifests.",
        ""
      ],
      "commands": "kubectl version --short\nhelm repo add argo https://argoproj.github.io/argo-helm\nhelm repo update\n# Verify connectivity to the cluster\nkubectl cluster-info\n",
      "config": "# Minimal ArgoCD configuration placeholder\n# argocd-cm\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: argocd-cm\n  namespace: argocd\ndata:\n  resource.exclusions: \"[\\\"apiVersion: v1, kind: Namespace, name: kube-system\\\"]\"\n",
      "problems": [
        {
          "issue": "ArgoCD cannot reach the Git repository",
          "solution": "Root cause: missing SSH key or HTTPS credentials. Investigate by running `argocd repo list` and checking the repo URL. Verify network connectivity with `kubectl exec -n argocd -it argocd-repo-server -- ping <GIT_HOST>`. Resolve by adding the correct SSH key to the repo secret or updating the HTTPS token. Verify by re-running `argocd repo add` and ensuring the repo appears in the list."
        },
        {
          "issue": "RBAC denies access to ArgoCD API server",
          "solution": "Root cause: default RBAC denies external API access. Check the `argocd-rbac-cm` ConfigMap for role definitions. Inspect logs with `kubectl logs -n argocd -l app.kubernetes.io/name=argocd-server`. Add a permissive role: `apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: argocd-rbac-cm\n  namespace: argocd\ndata:\n  policy.csv: \"p, role:admin, applications, *, */*, allow\"\n  role.yaml: \"- role: admin\n  groups: [\"admin\"]\". Verify by logging in with `argocd login` and performing an admin action."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain the difference between ArgoCD Application and Kubernetes Deployment.",
          "answer": "An ArgoCD Application is a higher‑level abstraction that defines a source Git repo, destination cluster, and sync policy. It watches the repo and ensures the desired state is applied. A Kubernetes Deployment is a native resource that manages pods. ArgoCD manages Deployments by applying the manifests defined in the Application."
        },
        {
          "question": "How would you troubleshoot a failed sync due to image pull errors?",
          "answer": "First, check the Application status in the UI or via `argocd app get <app>`. Inspect the pod logs with `kubectl logs -n <ns> <pod>`. Verify the image registry credentials: ensure the imagePullSecret is present and referenced in the Deployment. Check network connectivity to the registry from the cluster nodes. Resolve by updating the secret or registry URL, then re-sync."
        }
      ]
    },
    {
      "heading": "2. Architecture, Components and Internal Working",
      "explanation": "ArgoCD consists of several micro‑services: API Server, Application Controller, Repo Server, Redis, and optional metrics. The API Server exposes REST endpoints, the Application Controller reconciles desired state, the Repo Server fetches Git content, and Redis stores state. Understanding these components aids in scaling and troubleshooting.",
      "steps": [
        "Map each component to its Kubernetes deployment: `argocd-server`, `argocd-repo-server`, `argocd-application-controller`, `argocd-redis`.\n",
        "Verify health endpoints: `argocd-server --health` and `argocd-repo-server --health`.\n",
        "Check inter‑component communication via service accounts and RBAC rules.",
        ""
      ],
      "commands": "kubectl get pods -n argocd\nkubectl describe svc -n argocd argocd-server\nargocd server --health\nargocd repo-server --health\n",
      "config": "# Example of Redis ConfigMap for persistence\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: argocd-redis-config\n  namespace: argocd\ndata:\n  redis.conf: \"maxmemory 256mb\\nmaxmemory-policy allkeys-lru\"\n",
      "problems": [
        {
          "issue": "Application Controller stalls during sync",
          "solution": "Root cause: insufficient CPU/memory or Redis connectivity issues. Check pod metrics: `kubectl top pod -n argocd argocd-application-controller`. Inspect Redis logs: `kubectl logs -n argocd -l app.kubernetes.io/name=argocd-redis`. Resolve by scaling the controller or increasing Redis memory. Verify by re‑syncing the application."
        },
        {
          "issue": "Repo Server cannot clone a private repo",
          "solution": "Root cause: missing SSH key or HTTPS token in the repo secret. Inspect the secret: `kubectl get secret -n argocd argocd-repo-ssh-key -o yaml`. Ensure the key is correctly formatted and referenced in the repo definition. Resolve by recreating the secret with `kubectl create secret generic argocd-repo-ssh-key --from-file=ssh-privatekey=<KEY>`. Verify by running `argocd repo list`."
        }
      ],
      "interviewQuestions": [
        {
          "question": "What role does Redis play in ArgoCD's architecture?",
          "answer": "Redis stores the state of applications, including sync status, health, and history. It provides fast read/write access for the Application Controller and enables persistence across restarts."
        },
        {
          "question": "How would you scale ArgoCD for a large number of applications?",
          "answer": "Scale the Application Controller deployment by increasing replicas and allocating more CPU/memory. Use a dedicated Redis cluster for persistence. Consider sharding the API Server or deploying multiple ArgoCD instances with shared Redis."
        }
      ]
    },
    {
      "heading": "3. Installation, Setup and Configuration",
      "explanation": "Installing ArgoCD via Helm is the recommended approach. This section covers adding the Helm repo, installing the chart, and configuring the service type for external access. It also demonstrates how to customize values for production readiness.",
      "steps": [
        "Add the ArgoCD Helm repository and update it.\n",
        "Install ArgoCD with a LoadBalancer service and set the external IP.\n",
        "Verify the installation by checking pod readiness and accessing the UI.",
        ""
      ],
      "commands": "helm repo add argo https://argoproj.github.io/argo-helm\nhelm repo update\nhelm install argocd argo/argo-cd \\\n  --namespace argocd \\\n  --create-namespace \\\n  --set server.service.type=LoadBalancer \\\n  --set server.service.loadBalancerIP=<IP> \\\n  --set controller.replicaCount=2 \\\n  --set redis.enabled=true\n# Verify pods\nkubectl get pods -n argocd\n# Access UI via <IP>:80\n",
      "config": "# values.yaml snippet for production\ncontroller:\n  replicaCount: 2\n  resources:\n    limits:\n      cpu: 500m\n      memory: 512Mi\n    requests:\n      cpu: 250m\n      memory: 256Mi\nredis:\n  enabled: true\n  resources:\n    limits:\n      cpu: 200m\n      memory: 256Mi\n    requests:\n      cpu: 100m\n      memory: 128Mi\n",
      "problems": [
        {
          "issue": "LoadBalancer IP not assigned",
          "solution": "Root cause: cloud provider not supporting static IP or missing IP allocation. Check the service status: `kubectl get svc -n argocd argocd-server -o yaml`. If `EXTERNAL-IP` is `<pending>`, allocate a static IP via cloud console or use `--set server.service.type=NodePort` for local testing. Verify by accessing the UI after IP assignment."
        },
        {
          "issue": "ArgoCD pods crash due to insufficient memory",
          "solution": "Root cause: default resource limits too low for the cluster size. Inspect pod events: `kubectl describe pod -n argocd argocd-server`. Increase memory limits in the Helm values: `--set controller.resources.limits.memory=1Gi`. Re‑install or upgrade the chart. Verify by checking pod status and logs."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Why is it recommended to use Helm for ArgoCD installation?",
          "answer": "Helm provides templated, versioned deployments, easy upgrades, and the ability to customize values via a single values file. It also manages dependencies like Redis and ensures consistent resource definitions."
        },
        {
          "question": "Explain the impact of setting `controller.replicaCount` to 3 in a production environment.",
          "answer": "Increasing replicas improves availability and load distribution of the Application Controller. It also allows for better handling of concurrent syncs. However, it increases resource consumption and may require scaling Redis accordingly."
        }
      ]
    },
    {
      "heading": "4. Practical End‑to‑End Workflow",
      "explanation": "Demonstrates a full GitOps cycle: creating a Git repo, defining an ArgoCD Application, syncing, and verifying deployment. This workflow illustrates how ArgoCD automates continuous delivery.",
      "steps": [
        "Create a Git repository with Kubernetes manifests and commit them.\n",
        "Define an ArgoCD Application manifest pointing to the repo.\n",
        "Apply the Application and trigger a sync.",
        ""
      ],
      "commands": "# Create Application\ncat <<EOF > app.yaml\napiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: demo-app\n  namespace: argocd\nspec:\n  project: default\n  source:\n    repoURL: https://github.com/<USER>/demo-app.git\n    targetRevision: HEAD\n    path: manifests\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: demo\n  syncPolicy:\n    automated:\n      prune: true\n      selfHeal: true\nEOF\n\nkubectl apply -f app.yaml\n\n# Sync manually\nargocd app sync demo-app\n\n# Verify deployment\nkubectl get pods -n demo\n",
      "config": "# Example of a Deployment in the repo\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.21\n        ports:\n        - containerPort: 80\n",
      "problems": [
        {
          "issue": "Application sync fails with \"cannot find resource\" error",
          "solution": "Root cause: missing CRDs or incorrect API version. Verify the manifests are valid by running `kubectl apply -f <file> --dry-run=client`. Ensure CRDs are installed before applying. Resolve by applying CRDs first. Verify by re‑syncing."
        },
        {
          "issue": "Sync completes but pods remain in CrashLoopBackOff",
          "solution": "Root cause: misconfigured container image or missing env vars. Inspect pod logs: `kubectl logs -n demo <pod>`. Check the Deployment spec for missing fields. Update the image or env vars, then re‑sync. Verify by checking pod status."
        }
      ],
      "interviewQuestions": [
        {
          "question": "How does ArgoCD handle automated rollbacks?",
          "answer": "ArgoCD tracks sync history. If a sync fails, you can revert to a previous revision using `argocd app rollback <app> <revision>` or `argocd app set <app> --revision <rev>` followed by a sync. Automated rollback can be configured via `syncPolicy.automated.prune` and `selfHeal`."
        },
        {
          "question": "Describe how you would integrate ArgoCD with a CI pipeline that pushes new images.",
          "answer": "Configure the CI pipeline to push new container images to a registry and commit the updated image tag to the Git repo. ArgoCD watches the repo; upon detecting the change, it automatically syncs the new image to the cluster. Optionally, use ArgoCD notifications to alert on sync events."
        }
      ]
    },
    {
      "heading": "5. Real‑time Production Implementation and Scenarios",
      "explanation": "Shows advanced production patterns: multi‑cluster management, automated rollbacks, and notification integrations. These patterns ensure reliability and observability in real deployments.",
      "steps": [
        "Set up ArgoCD to manage multiple clusters via cluster contexts.\n",
        "Configure automated rollback policies for critical services.\n",
        "Integrate Slack or email notifications for sync events.",
        ""
      ],
      "commands": "# Add a new cluster\nargocd cluster add <KUBECONFIG_PATH>\n\n# Set rollback policy via Application spec\ncat <<EOF >> app.yaml\nspec:\n  syncPolicy:\n    automated:\n      prune: true\n      selfHeal: true\n    retry:\n      limit: 5\n      backoffDuration: 5s\n      backoffFactor: 2\nEOF\n\n# Configure notifications\nkubectl apply -f notifications.yaml\n\n# Example notification config\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: argocd-notifications-cm\n  namespace: argocd\ndata:\n  config.yaml: |\n    trigger:\n      - name: on-sync-succeeded\n        when: \"status.sync.status == 'Synced'\"\n    template:\n      - name: slack\n        message: \"{{.app.metadata.name}} synced successfully.\"\n",
      "config": "# notifications.yaml\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: argocd-notifications-cm\n  namespace: argocd\ndata:\n  config.yaml: |\n    trigger:\n      - name: on-sync-failed\n        when: \"status.operationState.phase == 'Failed'\"\n    template:\n      - name: email\n        message: \"Sync failed for {{.app.metadata.name}}. Check logs.\"\n",
      "problems": [
        {
          "issue": "Cluster addition fails due to RBAC errors",
          "solution": "Root cause: the service account used by ArgoCD lacks cluster‑level permissions. Create a ClusterRoleBinding: `kubectl create clusterrolebinding argocd-cluster-admin --clusterrole=cluster-admin --serviceaccount=argocd:argocd-application-controller`. Verify by re‑adding the cluster."
        },
        {
          "issue": "Notifications not delivered to Slack",
          "solution": "Root cause: missing Slack webhook URL or incorrect channel. Verify the webhook in the ConfigMap: `argocd-notifications-cm`. Ensure the `slack` template references the correct URL. Test by triggering a manual sync and checking Slack. Resolve by updating the webhook and re‑applying the ConfigMap."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain how ArgoCD can be used to manage applications across multiple namespaces and clusters.",
          "answer": "ArgoCD supports multi‑cluster by adding each cluster context via `argocd cluster add`. Applications can specify the destination cluster and namespace. ArgoCD then deploys resources to the specified cluster, enabling a single UI to manage all deployments."
        },
        {
          "question": "What strategies can you use to ensure zero‑downtime deployments with ArgoCD?",
          "answer": "Use canary or blue‑green strategies by deploying new replicas to a separate namespace or label, then shifting traffic via Ingress or Service. ArgoCD can manage multiple manifests and use `argocd app set --sync-policy automated` to promote the new version only after health checks pass."
        }
      ]
    },
    {
      "heading": "6. Troubleshooting, Logs, Errors and Solutions",
      "explanation": "Logs are central to diagnosing ArgoCD issues. They are accessible via `kubectl logs` for each component. This section covers common errors, how to inspect logs, and steps to resolve them.",
      "steps": [
        "Retrieve pod logs for the API server and Repo Server.\n",
        "Check the health endpoints and verify TLS certificates.\n",
        "Inspect the Redis logs for persistence problems.",
        ""
      ],
      "commands": "# API server logs\nkubectl logs -n argocd -l app.kubernetes.io/name=argocd-server\n# Repo server logs\nkubectl logs -n argocd -l app.kubernetes.io/name=argocd-repo-server\n# Redis logs\nkubectl logs -n argocd -l app.kubernetes.io/name=argocd-redis\n# Health check\nargocd server --health\nargocd repo-server --health\n",
      "config": "# Increase log verbosity\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: argocd-cm\n  namespace: argocd\ndata:\n  log.level: \"debug\"\n",
      "problems": [
        {
          "issue": "ArgoCD API server returns 500 Internal Server Error",
          "solution": "Root cause: corrupted state in Redis or missing CRDs. Inspect API server logs for stack traces. Restart the controller: `kubectl rollout restart deployment argocd-application-controller -n argocd`. If Redis is corrupted, delete the Redis pod to force recreation. Verify by accessing the UI again."
        },
        {
          "issue": "Repo Server cannot fetch Git repo due to rate limiting",
          "solution": "Root cause: Git provider rate limits for unauthenticated requests. Add an SSH key or HTTPS token to the repo secret. Update the repo definition: `argocd repo add https://github.com/... --ssh-private-key-path=<KEY>`. Verify by running `argocd repo list` and ensuring the repo is reachable."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Where are ArgoCD logs stored when running in a Kubernetes cluster?",
          "answer": "Logs are not persisted to a file by default; they are streamed from the container stdout/stderr. Use `kubectl logs -n argocd <pod>` to view them. For persistent logging, integrate with a logging stack like Loki or Fluentd."
        },
        {
          "question": "How would you identify a sync failure caused by a missing Kubernetes secret?",
          "answer": "Check the Application status: `argocd app get <app>`. Look for a `Sync Error` message referencing a missing secret. Inspect the pod logs for `Error from kubernetes: secret \"<name>\" not found`. Resolve by creating the secret in the target namespace and re‑syncing."
        }
      ]
    },
    {
      "heading": "7. Security, Monitoring, Best Practices and Interview Preparation",
      "explanation": "Focuses on securing ArgoCD, enabling metrics, and preparing for production. Covers RBAC, OIDC, audit logs, and performance tuning.",
      "steps": [
        "Configure RBAC to restrict access to applications.\n",
        "Enable OIDC authentication for SSO.\n",
        "Set up Prometheus metrics and Grafana dashboards.",
        ""
      ],
      "commands": "# Apply RBAC ConfigMap\nkubectl apply -f rbac.yaml\n# Enable OIDC\nargocd login <ARGOCD_SERVER> --sso\n# Expose metrics\nkubectl apply -f metrics-service.yaml\n# Prometheus scrape config\ncat <<EOF > prometheus.yaml\nscrape_configs:\n  - job_name: \"argocd\"\n    static_configs:\n      - targets: [\"argocd-server.argocd.svc.cluster.local:8083\"]\nEOF\n",
      "config": "# rbac.yaml\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: argocd-rbac-cm\n  namespace: argocd\ndata:\n  policy.csv: |\n    p, role:readonly, applications, get, */*, allow\n    p, role:readonly, projects, get, */*, allow\n    g, alice, role:readonly\n  role.yaml: |\n    - role: readonly\n      groups: [\"readonly-group\"]\n# metrics-service.yaml\napiVersion: v1\nkind: Service\nmetadata:\n  name: argocd-metrics\n  namespace: argocd\nspec:\n  selector:\n    app.kubernetes.io/name: argocd-server\n  ports:\n    - name: metrics\n      port: 8083\n      targetPort: 8083\n",
      "problems": [
        {
          "issue": "ArgoCD UI shows \"Access Denied\" for a user",
          "solution": "Root cause: RBAC policy missing the user or group. Verify the `argocd-rbac-cm` ConfigMap: `kubectl get configmap argocd-rbac-cm -n argocd -o yaml`. Add the user to the appropriate role: `g, bob, role:admin`. Apply the ConfigMap and re‑login. Verify by accessing the UI."
        },
        {
          "issue": "Prometheus scrape fails for ArgoCD metrics",
          "solution": "Root cause: metrics port not exposed or firewall blocking. Check the Service: `kubectl get svc -n argocd argocd-metrics`. Ensure the target port 8083 is correct. Verify that Prometheus can reach the service by running `curl http://argocd-metrics.argocd.svc.cluster.local:8083/metrics`. Resolve by updating the Service or Prometheus scrape config."
        }
      ],
      "interviewQuestions": [
        {
          "question": "How would you secure ArgoCD against brute‑force login attempts?",
          "answer": "Enable rate limiting via the `argocd-cm` ConfigMap: set `rateLimit.enabled=true` and configure `rateLimit.maxRequestsPerMinute`. Additionally, use OIDC with a trusted identity provider and enforce MFA. Monitor login attempts via audit logs."
        },
        {
          "question": "Describe how you would monitor ArgoCD performance in a large cluster.",
          "answer": "Expose Prometheus metrics from the ArgoCD server and controller. Use Grafana dashboards to track sync durations, pod CPU/memory usage, and request latency. Set up alerts for high sync times or error rates. Integrate with alertmanager to notify on critical thresholds."
        }
      ]
    }
  ]
}

export default data;