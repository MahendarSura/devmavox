import type { NoteData } from "../../types";

const data: NoteData = {
  "title": "ArgoCD Architecture – DevOps Training & Production Reference",
  "description": "Comprehensive, hands‑on guide covering ArgoCD’s architecture, installation, end‑to‑end workflow, production scenarios, troubleshooting, and security best practices. Designed for senior DevOps engineers, SREs and production teams.",
  "sections": [
    {
      "heading": "1. Introduction, Purpose and Fundamentals",
      "explanation": "ArgoCD is a declarative, Git‑driven continuous delivery platform for Kubernetes. It continuously monitors Git repositories, compares the desired state with the live cluster, and applies changes automatically. Understanding its purpose, core concepts (Application, Project, Sync, Health) and the GitOps workflow is essential before diving into architecture.",
      "steps": [
        "1. Study GitOps principles and how ArgoCD implements them – read the official GitOps manifesto and ArgoCD docs.",
        "2. Identify the use‑cases in your organization (e.g., blue‑green, canary, multi‑cluster).",
        "3. Define the desired state for a sample application and commit the manifests to a Git repo."
      ],
      "commands": "argocd version\nkubectl get pods -n argocd\nargocd login <ARGOCD_SERVER> --username admin --password <PASSWORD>",
      "config": "apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: argocd-cm\n  namespace: argocd\ndata:\n  resource.track.helm.values: \"true\"\n  resource.track.kustomize: \"true\"",
      "problems": [
        {
          "issue": "ArgoCD UI is unreachable from the browser",
          "solution": "Check the service type of argocd-server. If ClusterIP, expose via LoadBalancer or Ingress. Verify DNS resolves to the correct IP. Inspect logs with kubectl logs -n argocd -l app.kubernetes.io/name=argocd-server."
        },
        {
          "issue": "Login fails with ‘invalid credentials’ after password reset",
          "solution": "Ensure the admin password was reset correctly using argocd admin reset-password. Verify the secret argocd-secret contains the new hash. Check the argocd-server logs for authentication errors and confirm the client IP is allowed by the ingress controller."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain how ArgoCD achieves idempotency in deployments.",
          "answer": "ArgoCD uses a reconciliation loop that continuously compares the desired state in Git with the live state in the cluster. It applies only the differences, ensuring that repeated syncs result in the same state. The Application controller tracks resources and uses Kubernetes API server to apply changes, guaranteeing idempotent operations."
        },
        {
          "question": "Describe a scenario where you would use a Project in ArgoCD.",
          "answer": "Projects isolate applications, enforce RBAC, and set resource quotas. For example, in a multi‑tenant environment, each team can have its own Project with specific namespace access, resource limits, and sync policies, preventing accidental cross‑team deployments."
        }
      ]
    },
    {
      "heading": "2. Architecture, Components and Internal Working",
      "explanation": "ArgoCD is composed of several tightly coupled components: the Server (web UI & API), Repo Server (Git access), Application Controller (reconciliation), Redis (cache), and optional metrics and audit services. The Server talks to the Application Controller via gRPC, while the Repo Server fetches manifests and provides them to the controller. Understanding these interactions is key to troubleshooting and scaling.",
      "steps": [
        "1. Map the component topology using kubectl get all -n argocd and identify labels such as app.kubernetes.io/name.",
        "2. Observe the sync pipeline: Repo Server → Application Controller → Kubernetes API.",
        "3. Visualize resource health by inspecting the Application status and health fields in the UI."
      ],
      "commands": "kubectl get svc -n argocd\nkubectl logs -n argocd -l app.kubernetes.io/name=argocd-repo-server\nkubectl describe pod -n argocd -l app.kubernetes.io/name=argocd-application-controller",
      "config": "apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: argocd-cm\n  namespace: argocd\ndata:\n  repo.server.timeout: \"30s\"\n  application.controller.reconciler.polling.interval: \"15s\"",
      "problems": [
        {
          "issue": "Repo Server times out when fetching a large repo",
          "solution": "Increase repo.server.timeout in argocd-cm. Verify network connectivity to the Git host and that the SSH key is valid. Check the repo server logs for timeout errors and adjust the timeout accordingly."
        },
        {
          "issue": "Application Controller stalls after a sync",
          "solution": "Inspect the controller logs for errors such as ‘failed to apply manifests’. Check for resource conflicts or missing RBAC permissions. Restart the pod if necessary and verify that the controller can access the target namespaces."
        }
      ],
      "interviewQuestions": [
        {
          "question": "What role does Redis play in ArgoCD’s architecture?",
          "answer": "Redis is used as an in‑memory cache for the Application Controller to store the state of applications and reduce API server load. It also stores the sync history and metrics. If Redis is unavailable, the controller falls back to local storage but may experience performance degradation."
        },
        {
          "question": "How does ArgoCD handle multiple Git repositories for a single Application?",
          "answer": "ArgoCD supports multi‑repo applications by specifying multiple repo URLs in the Application spec. The Repo Server fetches each repo, merges the manifests, and the Application Controller reconciles the combined desired state. This allows splitting code across repos while maintaining a single deployment pipeline."
        }
      ]
    },
    {
      "heading": "3. Installation, Setup and Configuration",
      "explanation": "Deploying ArgoCD can be done via Helm, kubectl manifests, or the official installer. Post‑install configuration includes RBAC, SSO, and custom resource definitions. Proper setup ensures secure, scalable, and maintainable deployments.",
      "steps": [
        "1. Add the Argo Helm repo and install ArgoCD with custom values for namespace and storage class.",
        "2. Patch the argocd-server service to expose it via LoadBalancer for external access.",
        "3. Configure RBAC by editing argocd-rbac-cm and set up an OIDC provider for SSO."
      ],
      "commands": "helm repo add argo https://argoproj.github.io/argo-helm\nhelm install argocd argo/argo-cd --namespace argocd --create-namespace\nkubectl patch svc argocd-server -n argocd -p '{\"spec\":{\"type\":\"LoadBalancer\"}}'\nargocd login <ARGOCD_SERVER> --username admin --password <PASSWORD>",
      "config": "apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: argocd-rbac-cm\n  namespace: argocd\ndata:\n  policy.csv: |\n    p, role:admin, applications, *, */*, allow\n    p, role:readonly, applications, get, */*, allow\n    g, alice, role:admin\n    g, bob, role:readonly",
      "problems": [
        {
          "issue": "Helm install fails due to missing CRDs",
          "solution": "Run kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/crds.yaml before installing Helm chart. Verify CRDs are present with kubectl get crds | grep argoproj.io."
        },
        {
          "issue": "RBAC misconfiguration blocks user access",
          "solution": "Check the policy.csv syntax and ensure the user is mapped to a role. Use argocd auth list to verify role assignments. Correct any typos and reload the ConfigMap with kubectl apply."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Why is it recommended to install ArgoCD in a dedicated namespace?",
          "answer": "A dedicated namespace isolates ArgoCD resources, simplifies RBAC, and prevents accidental interference with application workloads. It also allows namespace‑level resource quotas and network policies to be applied specifically to ArgoCD components."
        },
        {
          "question": "Explain how you would set up ArgoCD to use an external LDAP for authentication.",
          "answer": "Configure the argocd-cm ConfigMap with the ldap section, providing the LDAP URL, bind DN, and search base. Then update argocd-rbac-cm to map LDAP groups to ArgoCD roles. Finally, restart the argocd-server pod to apply the changes."
        }
      ]
    },
    {
      "heading": "4. Practical End-to-End Workflow",
      "explanation": "From code commit to live deployment, ArgoCD automates the entire pipeline. This section demonstrates creating an Application, syncing it, and verifying the rollout, covering common pitfalls and best practices.",
      "steps": [
        "1. Create an Application manifest pointing to the Git repo and target namespace.",
        "2. Apply the manifest and let ArgoCD sync automatically.",
        "3. Verify the deployment status and health using kubectl rollout status and the ArgoCD UI."
      ],
      "commands": "argocd app create myapp --repo https://github.com/<ORG>/myapp.git --path manifests --dest-namespace prod --dest-server https://kubernetes.default.svc\nargocd app sync myapp\nkubectl rollout status deployment/myapp -n prod",
      "config": "apiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: myapp\nspec:\n  project: default\n  source:\n    repoURL: https://github.com/<ORG>/myapp.git\n    targetRevision: HEAD\n    path: manifests\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: prod\n  syncPolicy:\n    automated:\n      prune: true\n      selfHeal: true",
      "problems": [
        {
          "issue": "Sync fails due to missing image tag",
          "solution": "Check the imagePullPolicy and ensure the image tag exists in the registry. Update the manifest or use a placeholder tag like latest for testing. Verify registry credentials in argocd-secret."
        },
        {
          "issue": "Deployment rollout stalls with CrashLoopBackOff",
          "solution": "Inspect pod logs with kubectl logs -n prod <pod-name>. Look for application errors or missing environment variables. Update the manifest to correct the issue, then sync again. Use argocd app rollback to revert if necessary."
        }
      ],
      "interviewQuestions": [
        {
          "question": "How does ArgoCD handle application health checks during sync?",
          "answer": "ArgoCD uses Kubernetes readiness and liveness probes defined in the manifests. It also supports custom health checks via annotations like argocd.argoproj.io/hook. During sync, ArgoCD waits for all resources to report healthy before marking the Application as Synced."
        },
        {
          "question": "Describe the steps to perform a blue‑green deployment with ArgoCD.",
          "answer": "Create two separate namespaces (blue and green) and deploy the same Application to both. Use ArgoCD’s sync options to target the desired namespace. Switch traffic by updating an Ingress or Service to point to the green namespace, then delete or pause the blue deployment."
        }
      ]
    },
    {
      "heading": "5. Real-Time Production Implementation and Scenarios",
      "explanation": "In production, ArgoCD is used for multi‑cluster, multi‑tenant, canary, and rollback workflows. This section covers configuring clusters, setting up canary releases, and ensuring smooth rollbacks.",
      "steps": [
        "1. Add a remote cluster to ArgoCD using argocd cluster add and provide kubeconfig credentials.",
        "2. Configure a canary Application with a Traffic Split annotation and a health check.",
        "3. Implement rollback by using argocd app rollback and verifying the previous revision is live."
      ],
      "commands": "argocd cluster add <KUBE_CONTEXT> --name prod-cluster\nargocd app set myapp --sync-policy automated\nargocd app rollback myapp --revision 2",
      "config": "apiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: myapp-canary\nspec:\n  project: default\n  source:\n    repoURL: https://github.com/<ORG>/myapp.git\n    targetRevision: v2\n    path: manifests\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: canary\n  syncPolicy:\n    automated:\n      prune: true\n      selfHeal: true\n  annotations:\n    argocd.argoproj.io/health: \"{{ .Status.Phase }}\"\n    argocd.argoproj.io/sync-wave: \"1\"",
      "problems": [
        {
          "issue": "Canary release fails due to unhealthy pod metrics",
          "solution": "Check the health annotations and ensure the application exposes the required metrics. Adjust the readiness probe or add a custom health check annotation. Verify the Service Mesh or Ingress routing is correctly split."
        },
        {
          "issue": "Rollback does not revert to the previous revision",
          "solution": "Ensure the Application has a revision history by enabling history retention in argocd-cm. Use argocd app history to list revisions and rollback to the desired one. Verify that the target namespace still contains the old resources before syncing."
        }
      ],
      "interviewQuestions": [
        {
          "question": "What considerations are there when adding a new cluster to ArgoCD?",
          "answer": "You must provide the cluster’s kubeconfig, ensure the cluster’s API server is reachable, and that ArgoCD has the necessary RBAC permissions (ClusterRoleBinding). Also, configure the cluster’s name in argocd-cm for proper display and set up any required network policies."
        },
        {
          "question": "Explain how you would implement a blue‑green deployment across two clusters with ArgoCD.",
          "answer": "Deploy the same Application to two clusters (blue and green) using the same repo and path. Use argocd app set to target the desired cluster and namespace. Switch traffic by updating the Ingress or Service in the target cluster. After verification, delete or pause the old cluster deployment."
        }
      ]
    },
    {
      "heading": "6. Troubleshooting, Logs, Errors and Solutions",
      "explanation": "Effective troubleshooting requires knowing where logs are stored, how to interpret them, and what common errors look like. This section provides a systematic approach to diagnosing and fixing issues in ArgoCD.",
      "steps": [
        "1. Identify the failing component by checking the status in the UI or using kubectl get pods -n argocd.",
        "2. Inspect logs with kubectl logs or journalctl for detailed error messages.",
        "3. Apply the recommended fix and verify by re‑syncing or restarting the pod."
      ],
      "commands": "journalctl -u argocd-server -f\nkubectl logs -n argocd -l app.kubernetes.io/name=argocd-application-controller -f\nargocd app get myapp",
      "config": "apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: argocd-cm\n  namespace: argocd\ndata:\n  log.level: \"debug\"\n  log.format: \"json\"",
      "problems": [
        {
          "issue": "Sync error: ‘failed to apply manifests: unauthorized’",
          "solution": "Check the argocd-secret for correct Docker registry credentials. Verify the imagePullSecret exists in the target namespace. Inspect the Application controller logs for the exact permission denied message and adjust RBAC accordingly."
        },
        {
          "issue": "Application controller pod crashes with OutOfMemoryError",
          "solution": "Increase the memory limits in the deployment spec. Add a resource request/limit for the argocd-application-controller container. Restart the pod and monitor memory usage with kubectl top pod."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Where are ArgoCD logs stored by default and how can you tail them?",
          "answer": "Logs are written to the container stdout/stderr of each pod. Use kubectl logs -n argocd <pod-name> or journalctl -u argocd-<component> if running as systemd services. For persistent storage, configure a sidecar or use a centralized log aggregator."
        },
        {
          "question": "Describe a method to identify a sync loop caused by a misconfigured health check.",
          "answer": "Enable debug logging (log.level=debug) and watch the Application controller logs for repeated sync attempts. Check the health annotations and ensure the application exposes the expected health endpoint. Adjust the health check or remove the annotation to break the loop."
        }
      ]
    },
    {
      "heading": "7. Security, Monitoring, Best Practices and Interview Preparation",
      "explanation": "Securing ArgoCD involves hardening RBAC, enabling audit logs, encrypting secrets, and monitoring metrics. Best practices include using least‑privilege roles, rotating credentials, and setting up Prometheus alerts.",
      "steps": [
        "1. Harden RBAC by defining granular roles in argocd-rbac-cm and removing default admin access.",
        "2. Enable audit logging in argocd-cm and ship logs to a SIEM.",
        "3. Expose Prometheus metrics and set up Grafana dashboards for sync health and latency."
      ],
      "commands": "kubectl edit configmap argocd-cm -n argocd\nargocd admin reset-password\nkubectl apply -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/metrics.yaml",
      "config": "apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: argocd-cm\n  namespace: argocd\ndata:\n  audit.log.enabled: \"true\"\n  metrics.enabled: \"true\"\n  metrics.port: \"8080\"\n  metrics.path: \"/metrics\"",
      "problems": [
        {
          "issue": "Unauthorized API access after RBAC changes",
          "solution": "Verify that the user is mapped to a role with the required permissions. Use argocd auth list to confirm role assignments. If the API still rejects, check the audit logs for denied actions and adjust the policy.csv."
        },
        {
          "issue": "Metrics endpoint not exposed",
          "solution": "Ensure the metrics.enabled flag is set to true in argocd-cm. Verify the argocd-server pod has the correct port mapping (8080). Use curl http://<ARGOCD_SERVER>:8080/metrics to confirm. If still missing, check the pod logs for startup errors."
        }
      ],
      "interviewQuestions": [
        {
          "question": "How would you secure ArgoCD against credential leakage?",
          "answer": "Store credentials in Kubernetes Secrets and reference them via imagePullSecrets or repo credentials. Use argocd-secret with base64‑encoded values. Enable audit logging and rotate secrets regularly. Avoid embedding passwords in plain text in manifests."
        },
        {
          "question": "Explain how you would monitor ArgoCD sync performance and set alerts.",
          "answer": "Expose the /metrics endpoint and scrape it with Prometheus. Create alerts for sync duration > threshold, sync failures, or high error rates. Use Grafana to visualize sync health and set up PagerDuty or Slack notifications for critical alerts."
        }
      ]
    }
  ]
}

export default data;