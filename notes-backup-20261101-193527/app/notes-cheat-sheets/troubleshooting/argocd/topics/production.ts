import type { NoteData } from "../../types";

const data: NoteData = {
  "title": "ArgoCD Production Reference Notes",
  "description": "Comprehensive, production‑ready documentation for ArgoCD covering architecture, installation, workflow, troubleshooting, security and interview prep.",
  "sections": [
    {
      "heading": "1. Introduction, Purpose and Fundamentals",
      "explanation": "ArgoCD is a declarative, Git‑centric continuous delivery platform for Kubernetes. It continuously monitors Git repositories, compares the desired state defined in manifests with the live cluster state, and applies changes automatically or on demand. In production, ArgoCD enables teams to enforce GitOps principles, achieve auditability, and reduce manual drift.",
      "steps": [
        "Understand the core GitOps concepts: Git as single source of truth, declarative manifests, automated reconciliation.",
        "Identify the role of ArgoCD in the CI/CD pipeline: source of truth, sync engine, policy enforcement.",
        "Set up a minimal local environment to validate GitOps principles before scaling to production."
      ],
      "commands": "argocd version\n# Expected output: ArgoCD client and server version information",
      "config": "# No configuration required for this introductory step",
      "problems": [
        {
          "issue": "ArgoCD CLI cannot connect to the server",
          "solution": "Root cause: incorrect server URL or missing TLS certificate. Verify the server endpoint with `argocd login` using the correct URL and TLS flag. Inspect `kubectl get svc -n argocd` to confirm the service IP. Once corrected, re‑run `argocd login` and verify connectivity with `argocd version`."
        },
        {
          "issue": "Git repository authentication fails during sync",
          "solution": "Root cause: missing or expired SSH key or HTTPS token. Check the repo URL in the application spec. For SSH, ensure the key is added to the ArgoCD repo server via `argocd repo add` with `--ssh-private-key-path`. For HTTPS, use `--username` and `--password` or a personal access token. Verify by running `argocd repo list` and inspecting the status."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Explain how ArgoCD implements GitOps principles.",
          "answer": "ArgoCD treats Git as the single source of truth. It watches a Git repo for changes, parses the Kubernetes manifests, and continuously reconciles the cluster state to match the desired state. This declarative approach ensures auditability, rollback capability, and reduces drift."
        },
        {
          "question": "What are the key benefits of using ArgoCD in a production environment?",
          "answer": "Key benefits include automated, repeatable deployments; built‑in rollback; policy enforcement via RBAC and SSO; observability through sync status and metrics; and integration with existing Git workflows, enabling teams to manage infrastructure as code."
        }
      ]
    },
    {
      "heading": "2. Architecture, Components and Internal Working",
      "explanation": "ArgoCD consists of several tightly coupled components: the API server, the application controller, the repo server, the redis cache, and the UI. The API server exposes REST endpoints and the web UI. The application controller watches ArgoCD resources and performs sync operations. The repo server fetches Git repositories and renders manifests. Redis stores state for efficient reconciliation. All components communicate over gRPC and HTTP within the cluster.",
      "steps": [
        "Identify the running pods: `kubectl get pods -n argocd` to confirm all components are healthy.",
        "Inspect inter‑component communication: use `kubectl exec` to check gRPC endpoints and verify TLS certificates.",
        "Review the internal state: `kubectl exec -n argocd -it argocd-application-controller-0 -- cat /var/log/argocd/redis.log` to see cache activity."
      ],
      "commands": "kubectl get pods -n argocd\n# Expected output: list of pods including argocd-server, argocd-repo-server, argocd-application-controller, argocd-dex-server, argocd-redis\nkubectl logs -n argocd argocd-repo-server\n# Expected output: logs showing Git fetch operations",
      "config": "# Example of argocd-cm config map showing repository settings\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: argocd-cm\n  namespace: argocd\ndata:\n  repositories:\n    - url: https://github.com/example/repo.git\n      type: git\n      name: example-repo\n      sshPrivateKeySecretRef: \"ssh-key-secret\"\n",
      "problems": [
        {
          "issue": "API server unreachable from external network",
          "solution": "Root cause: Ingress or LoadBalancer not exposing port 80/443. Verify service type with `kubectl get svc -n argocd`. If using LoadBalancer, ensure the cloud provider has provisioned an IP. If using Ingress, confirm Ingress controller is running and the host/SSL certs are correct. After fixing, test connectivity with `curl https://<argocd-host>/api/v1/applications`."
        },
        {
          "issue": "Application controller stuck in sync loop",
          "solution": "Root cause: resource quota exceeded or missing RBAC permissions. Check the controller logs: `kubectl logs -n argocd -l app.kubernetes.io/name=argocd-application-controller`. Look for permission errors. Update the RBAC config map `argocd-rbac-cm` to grant necessary roles. Verify by re‑syncing the application."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Describe how ArgoCD components communicate internally.",
          "answer": "Components communicate over gRPC and HTTP. The API server exposes REST endpoints; the application controller uses gRPC to talk to the repo server for fetching manifests. Redis acts as a shared cache, accessed via gRPC. All traffic is secured with mutual TLS using certificates stored in the cluster."
        },
        {
          "question": "What is the role of the repo server in ArgoCD?",
          "answer": "The repo server is responsible for cloning Git repositories, rendering Helm charts, and providing the application controller with the desired manifests. It caches repository data in Redis and serves manifests over gRPC to the controller."
        }
      ]
    },
    {
      "heading": "3. Installation, Setup and Configuration",
      "explanation": "Deploying ArgoCD in production typically uses Helm for reproducibility. After installation, expose the API server via a LoadBalancer or Ingress, configure the admin password, and set up RBAC and SSO for secure access. Production deployments also require persistent storage for the ArgoCD database and proper TLS termination.",
      "steps": [
        "Deploy ArgoCD with Helm: `helm repo add argo https://argoproj.github.io/argo-helm && helm install argocd argo/argo-cd -n argocd --create-namespace`.",
        "Expose the API server: create a LoadBalancer service or Ingress resource pointing to `argocd-server`.",
        "Set the admin password: `kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath='{.data.password}' | base64 -d` and then `argocd account update-password --account admin --current-password <old> --new-password <new>`."
      ],
      "commands": "helm repo add argo https://argoproj.github.io/argo-helm\nhelm install argocd argo/argo-cd -n argocd --create-namespace\nkubectl expose svc -n argocd argocd-server --type=LoadBalancer --name=argocd-lb\nargocd login <argocd-host> --username admin --password <initial>\nargocd account update-password --account admin --current-password <initial> --new-password <new>",
      "config": "# Example of argocd-rbac-cm for role‑based access\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: argocd-rbac-cm\n  namespace: argocd\ndata:\n  policy.csv: |\n    p, role:admin, applications, *, *, allow\n    p, role:readonly, applications, get, *, allow\n    g, alice, role:admin\n    g, bob, role:readonly\n",
      "problems": [
        {
          "issue": "Admin password reset fails with \"invalid credentials\"",
          "solution": "Root cause: using wrong initial password or the secret was not decoded correctly. Verify the initial password by decoding the secret again. Ensure the `argocd` CLI is pointing to the correct server URL and TLS flag. After correcting, retry the password update."
        },
        {
          "issue": "Helm install fails due to missing CRDs",
          "solution": "Root cause: Helm chart version <3.5 does not install CRDs automatically. Run `helm repo update` and upgrade to the latest chart. Alternatively, manually apply CRDs with `kubectl apply -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/crds.yaml` before installing the chart."
        }
      ],
      "interviewQuestions": [
        {
          "question": "How would you secure the ArgoCD admin account in a production environment?",
          "answer": "Set a strong, unique password and rotate it regularly. Disable the default admin account after creating dedicated RBAC roles. Use SSO (OIDC or SAML) to delegate authentication. Enable two‑factor authentication if supported by the identity provider."
        },
        {
          "question": "Explain the steps to expose ArgoCD securely to external users.",
          "answer": "Create a TLS‑terminated Ingress with a wildcard or dedicated domain. Use cert‑manager to provision Let's Encrypt certificates. Restrict access with network policies or firewall rules. Enable authentication via OIDC and enforce HTTPS only. Optionally, use a reverse proxy with IP whitelisting."
        }
      ]
    },
    {
      "heading": "4. Practical End‑to‑End Workflow",
      "explanation": "A typical production GitOps workflow with ArgoCD involves committing manifests to a Git repo, triggering a CI pipeline that builds container images, pushing them to a registry, and updating the image tag in the repo. ArgoCD automatically detects the change, syncs the application, and reports the status.",
      "steps": [
        "Create a Git repository with a Helm chart or plain Kubernetes manifests.",
        "Define an ArgoCD application: `argocd app create myapp --repo https://github.com/example/repo.git --path ./charts/myapp --dest-namespace prod --dest-server https://kubernetes.default.svc`.",
        "Sync the application: `argocd app sync myapp` and monitor status with `argocd app status myapp`."
      ],
      "commands": "argocd app create myapp --repo https://github.com/example/repo.git --path ./charts/myapp --dest-namespace prod --dest-server https://kubernetes.default.svc\nargocd app sync myapp\nargocd app status myapp\n# Expected output: sync status, health status, and any errors",
      "config": "# Example of a simple application.yaml\napiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: myapp\nspec:\n  project: default\n  source:\n    repoURL: https://github.com/example/repo.git\n    targetRevision: HEAD\n    path: charts/myapp\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: prod\n  syncPolicy:\n    automated:\n      prune: true\n      selfHeal: true\n",
      "problems": [
        {
          "issue": "Sync fails due to missing image tag",
          "solution": "Root cause: the image tag in the Helm values or manifest does not exist in the registry. Verify the tag with `docker pull <registry>/<image>:<tag>`. Update the Git repo with the correct tag and commit. ArgoCD will detect the change and re‑sync."
        },
        {
          "issue": "Application health shows \"Degraded\" after sync",
          "solution": "Root cause: liveness or readiness probes failing. Inspect pod logs: `kubectl logs -n prod <pod>` and events: `kubectl describe pod -n prod <pod>`. Fix the probe configuration or application code. After resolution, re‑sync or wait for ArgoCD to auto‑heal if self‑heal is enabled."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Walk through the steps ArgoCD takes when syncing an application.",
          "answer": "ArgoCD fetches the manifests from the Git repo via the repo server, renders them (Helm, Kustomize), compares the desired state to the live cluster state, and applies changes via the Kubernetes API. It then monitors the resources until they reach the desired health state, reporting success or failure."
        },
        {
          "question": "How would you handle a scenario where a new image tag is pushed but the application does not sync automatically?",
          "answer": "Ensure the application’s sync policy is set to automated with `selfHeal: true`. Verify that the Git repo path and targetRevision are correct. Check the repo server logs for fetch errors. If using Helm, confirm that the values file is updated. If the issue persists, manually trigger `argocd app sync`."
        }
      ]
    },
    {
      "heading": "5. Real‑time Production Implementation and Scenarios",
      "explanation": "In production, ArgoCD is often deployed across multiple clusters, uses App‑of‑Apps patterns for hierarchical management, and integrates with CI pipelines for automated rollbacks and blue‑green deployments. Advanced scenarios include canary releases, feature flags, and multi‑environment promotion.",
      "steps": [
        "Set up multi‑cluster access: add cluster credentials with `argocd cluster add <kubeconfig>` for each target cluster.",
        "Create an App‑of‑Apps: a root application that deploys child applications to each environment.",
        "Implement automated rollback: configure `argocd app set myapp --rollback-to <revision>` and use `argocd app rollback myapp` when needed."
      ],
      "commands": "argocd cluster add <kubeconfig>\nargocd app create root-app --repo https://github.com/example/root.git --path ./apps --dest-namespace argocd --dest-server https://kubernetes.default.svc\nargocd app set myapp --rollback-to 1234567890abcdef\nargocd app rollback myapp\n# Expected output: confirmation of rollback and sync status",
      "config": "# Example of App‑of‑Apps YAML\napiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: root-app\nspec:\n  project: default\n  source:\n    repoURL: https://github.com/example/root.git\n    targetRevision: HEAD\n    path: apps\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: argocd\n  syncPolicy:\n    automated:\n      prune: true\n      selfHeal: true\n",
      "problems": [
        {
          "issue": "Rollback fails due to missing revision",
          "solution": "Root cause: the specified revision does not exist in the Git history or the repo server cannot access it. Verify the commit hash with `git rev-parse <hash>`. If the commit was pruned, use a previous hash or re‑push the commit. After correction, run `argocd app rollback` again."
        },
        {
          "issue": "App‑of‑Apps sync fails for child applications",
          "solution": "Root cause: child application manifests reference a namespace that does not exist or lack necessary RBAC. Ensure the target namespace is created and the service account used by ArgoCD has permissions. Check the child application logs for errors. Once resolved, re‑sync the root application."
        }
      ],
      "interviewQuestions": [
        {
          "question": "Describe how you would implement a blue‑green deployment using ArgoCD.",
          "answer": "Create two separate namespaces or deployments for blue and green. Use ArgoCD to sync the desired version to the green namespace while the blue remains live. Once health checks pass, switch traffic via a service selector or Ingress rule. If issues arise, rollback to blue by re‑syncing the blue deployment."
        },
        {
          "question": "Explain the App‑of‑Apps pattern and its benefits.",
          "answer": "App‑of‑Apps allows a root application to deploy multiple child applications, enabling hierarchical management, consistent policy enforcement, and easier promotion across environments. It reduces duplication and centralizes configuration."
        }
      ]
    },
    {
      "heading": "6. Troubleshooting, Logs, Errors and Solutions",
      "explanation": "Effective troubleshooting requires understanding where logs are stored, how to interpret error messages, and how to verify fixes. ArgoCD logs are accessible via Kubernetes logs, and the application controller provides diagnostics. Common issues include sync failures, authentication errors, and resource conflicts.",
      "steps": [
        "Identify the failing pod: `kubectl get pods -n argocd | grep -i error`.",
        "Inspect logs: `kubectl logs -n argocd <pod>` and `kubectl logs -n argocd -l app.kubernetes.io/name=argocd-application-controller`.",
        "Use ArgoCD diagnostics: `argocd app diagnostics <app>` to get detailed sync and health information."
      ],
      "commands": "kubectl logs -n argocd argocd-repo-server\nargocd app diagnostics myapp\n# Expected output: detailed error messages and suggested fixes",
      "config": "# No additional config needed for troubleshooting",
      "problems": [
        {
          "issue": "Sync error: \"invalid YAML\"",
          "solution": "Root cause: syntax error in a manifest. Use `kubectl apply -f <file> --dry-run=client` to validate. Check the ArgoCD app logs for the exact line number. Correct the YAML, commit, and re‑sync."
        },
        {
          "issue": "Authentication to Git repo fails after token rotation",
          "solution": "Root cause: the stored token in the ArgoCD repo secret is stale. Update the secret: `argocd repo add https://github.com/example/repo.git --username <user> --password <new-token> --name example-repo`. Verify with `argocd repo list`. After update, re‑sync the application."
        }
      ],
      "interviewQuestions": [
        {
          "question": "How do you identify the root cause of a sync failure in ArgoCD?",
          "answer": "Check the application status with `argocd app get <app>`. Inspect the sync error message and the detailed diagnostics via `argocd app diagnostics`. Review the repo server logs for fetch errors and the application controller logs for reconciliation errors. Correlate with Kubernetes events and pod logs."
        },
        {
          "question": "What steps would you take if ArgoCD reports \"Unauthorized\" when accessing a Git repo?",
          "answer": "Verify the repo URL and credentials. Ensure the SSH key or HTTPS token is still valid. Update the repo secret with `argocd repo add` using the correct credentials. Check the repo server logs for authentication errors and confirm that the ArgoCD service account has permission to access the secret."
        }
      ]
    },
    {
      "heading": "7. Security, Monitoring, Best Practices and Interview Preparation",
      "explanation": "Securing ArgoCD involves hardening the API server, enforcing RBAC, integrating SSO, and monitoring metrics and logs. Best practices include using TLS, rotating secrets, enabling audit logs, and setting up alerting for sync failures. Interview questions often probe knowledge of these security and operational aspects.",
      "steps": [
        "Configure RBAC: edit `argocd-rbac-cm` to define roles and permissions.",
        "Enable SSO: set up OIDC provider in `argocd-cm` and configure `argocd-server` to use it.",
        "Set up monitoring: expose Prometheus metrics via `argocd-server` and configure alerts for sync failures."
      ],
      "commands": "kubectl edit configmap argocd-rbac-cm -n argocd\nkubectl edit configmap argocd-cm -n argocd\n# Add OIDC config\nargocd app list --output yaml | grep -i \"health\"\n# Expected: health status of all apps",
      "config": "# Example of OIDC configuration in argocd-cm\napiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: argocd-cm\n  namespace: argocd\ndata:\n  oidc.config: |\n    name: \"ExampleOIDC\"\n    issuer: \"https://idp.example.com/\"\n    clientID: \"argocd-client\"\n    clientSecret: \"<PLACEHOLDER>\"\n    requestedIDTokenClaims:\n      groups:\n        essential: true\n",
      "problems": [
        {
          "issue": "Unauthorized access to ArgoCD UI after SSO configuration",
          "solution": "Root cause: OIDC client ID or secret misconfigured, or the issuer URL is incorrect. Verify the OIDC provider logs for authentication attempts. Update the `argocd-cm` with correct values and restart the `argocd-server` pod. After restart, test login via the SSO URL."
        },
        {
          "issue": "Metrics endpoint not exposed",
          "solution": "Root cause: metrics are disabled in the `argocd-cm`. Add `metrics.enabled: \"true\"` to the config map and restart the `argocd-server`. Verify by accessing `https://<argocd-host>/metrics`. If still unavailable, check the pod logs for errors."
        }
      ],
      "interviewQuestions": [
        {
          "question": "How would you secure ArgoCD against brute‑force login attempts?",
          "answer": "Implement rate limiting on the API server, use a reverse proxy with authentication throttling, enable two‑factor authentication via the SSO provider, and monitor failed login attempts in the audit logs. Additionally, restrict access to the API server using network policies."
        },
        {
          "question": "Describe how you would monitor ArgoCD health and set up alerts.",
          "answer": "Expose Prometheus metrics by enabling `metrics.enabled: \"true\"` in `argocd-cm`. Use Prometheus queries to detect sync failures, health degradation, or high latency. Configure Alertmanager to send notifications to Slack or PagerDuty. Also, enable ArgoCD audit logs and forward them to a SIEM for security monitoring."
        }
      ]
    }
  ]
}

export default data;