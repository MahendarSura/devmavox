import type { AtoZLesson } from "../lessons";

export const argocdAtoZLessons: Record<string, AtoZLesson> = {
  "argocd/gitops-fundamentals": {
    "summary": "GitOps uses Git as the declarative source of truth for desired infrastructure and application state, with controllers reconciling clusters to repository definitions.",
    "diagram": {
      "title": "GitOps Fundamentals GitOps flow",
      "nodes": [
        "Git repository desired state",
        "GitOps controller",
        "diff and reconciliation",
        "Kubernetes API",
        "observed cluster state"
      ],
      "explanation": "Git repository desired state → GitOps controller → diff and reconciliation → Kubernetes API → observed cluster state. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "GitOps uses Git as the declarative source of truth for desired infrastructure and application state, with controllers reconciling clusters to repository definitions.",
          "This capability supports gitops fundamentals in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use GitOps Fundamentals when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git repository desired state → GitOps controller → diff and reconciliation → Kubernetes API → observed cluster state. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app list\nargocd app get YOUR_APP\nkubectl get applications -n argocd",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "GitOps uses Git as the declarative source of truth for desired infrastructure and application state, with controllers reconciling clusters to repository definitions. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain GitOps Fundamentals with a real GitOps deployment example.",
        "answer": "GitOps uses Git as the declarative source of truth for desired infrastructure and application state, with controllers reconciling clusters to repository definitions. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/argo-cd-introduction": {
    "summary": "Argo CD is a declarative GitOps continuous delivery tool for Kubernetes that watches Git repositories and synchronizes manifests to clusters.",
    "diagram": {
      "title": "Argo CD Introduction GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Argo CD is a declarative GitOps continuous delivery tool for Kubernetes that watches Git repositories and synchronizes manifests to clusters.",
          "This capability supports argo cd introduction in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Argo CD Introduction when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd version\nargocd app list",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Argo CD is a declarative GitOps continuous delivery tool for Kubernetes that watches Git repositories and synchronizes manifests to clusters. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Argo CD Introduction with a real GitOps deployment example.",
        "answer": "Argo CD is a declarative GitOps continuous delivery tool for Kubernetes that watches Git repositories and synchronizes manifests to clusters. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/argo-cd-architecture": {
    "summary": "Argo CD separates API/UI access, repository rendering, application reconciliation and Kubernetes cluster communication.",
    "diagram": {
      "title": "Argo CD Architecture GitOps flow",
      "nodes": [
        "Git repository",
        "repo-server renders manifests",
        "application controller compares state",
        "API server sync",
        "cluster resources"
      ],
      "explanation": "Git repository → repo-server renders manifests → application controller compares state → API server sync → cluster resources. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Argo CD separates API/UI access, repository rendering, application reconciliation and Kubernetes cluster communication.",
          "This capability supports argo cd architecture in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Argo CD Architecture when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git repository → repo-server renders manifests → application controller compares state → API server sync → cluster resources. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app list\nargocd app get YOUR_APP\nkubectl get applications -n argocd",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Argo CD separates API/UI access, repository rendering, application reconciliation and Kubernetes cluster communication. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Argo CD Architecture with a real GitOps deployment example.",
        "answer": "Argo CD separates API/UI access, repository rendering, application reconciliation and Kubernetes cluster communication. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/installation": {
    "summary": "Argo CD installation deploys its controller and supporting components into a Kubernetes namespace.",
    "diagram": {
      "title": "Installation GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Argo CD installation deploys its controller and supporting components into a Kubernetes namespace.",
          "This capability supports installation in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Installation when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app list\nargocd app get YOUR_APP\nkubectl get applications -n argocd",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Argo CD installation deploys its controller and supporting components into a Kubernetes namespace. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Installation with a real GitOps deployment example.",
        "answer": "Argo CD installation deploys its controller and supporting components into a Kubernetes namespace. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/argo-cd-ui-and-cli": {
    "summary": "The Argo CD UI and CLI provide interfaces to inspect applications, sync state, health and deployment operations.",
    "diagram": {
      "title": "Argo CD UI and CLI GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The Argo CD UI and CLI provide interfaces to inspect applications, sync state, health and deployment operations.",
          "This capability supports argo cd ui and cli in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Argo CD UI and CLI when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd version\nargocd app list\nargocd app get YOUR_APP",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The Argo CD UI and CLI provide interfaces to inspect applications, sync state, health and deployment operations. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Argo CD UI and CLI with a real GitOps deployment example.",
        "answer": "The Argo CD UI and CLI provide interfaces to inspect applications, sync state, health and deployment operations. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/application-resource": {
    "summary": "An Argo CD Application custom resource connects a source repository and path to a destination cluster and namespace.",
    "diagram": {
      "title": "Application Resource GitOps flow",
      "nodes": [
        "Application CR",
        "source repo/path/revision",
        "destination cluster/namespace",
        "rendered manifests",
        "sync"
      ],
      "explanation": "Application CR → source repo/path/revision → destination cluster/namespace → rendered manifests → sync. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "An Argo CD Application custom resource connects a source repository and path to a destination cluster and namespace.",
          "This capability supports application resource in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Application Resource when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Application CR → source repo/path/revision → destination cluster/namespace → rendered manifests → sync. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "kubectl get applications -n argocd\nkubectl describe application YOUR_APP -n argocd",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "An Argo CD Application custom resource connects a source repository and path to a destination cluster and namespace. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Application Resource with a real GitOps deployment example.",
        "answer": "An Argo CD Application custom resource connects a source repository and path to a destination cluster and namespace. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/git-repository-connection": {
    "summary": "A repository connection configures how Argo CD authenticates to and retrieves application manifests from Git.",
    "diagram": {
      "title": "Git Repository Connection GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "A repository connection configures how Argo CD authenticates to and retrieves application manifests from Git.",
          "This capability supports git repository connection in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Git Repository Connection when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd repo list\nargocd repo get YOUR_REPO",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "A repository connection configures how Argo CD authenticates to and retrieves application manifests from Git. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Git Repository Connection with a real GitOps deployment example.",
        "answer": "A repository connection configures how Argo CD authenticates to and retrieves application manifests from Git. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/application-projects": {
    "summary": "AppProjects group applications and constrain allowed repositories, destinations and resource kinds.",
    "diagram": {
      "title": "Application Projects GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "AppProjects group applications and constrain allowed repositories, destinations and resource kinds.",
          "This capability supports application projects in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Application Projects when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd proj list\nargocd proj get YOUR_PROJECT",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "AppProjects group applications and constrain allowed repositories, destinations and resource kinds. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Application Projects with a real GitOps deployment example.",
        "answer": "AppProjects group applications and constrain allowed repositories, destinations and resource kinds. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/application-sync": {
    "summary": "Sync applies the rendered desired manifests from the configured source to the destination cluster.",
    "diagram": {
      "title": "Application Sync GitOps flow",
      "nodes": [
        "Git revision",
        "manifest render",
        "diff",
        "sync phases/waves",
        "Kubernetes API",
        "health assessment"
      ],
      "explanation": "Git revision → manifest render → diff → sync phases/waves → Kubernetes API → health assessment. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Sync applies the rendered desired manifests from the configured source to the destination cluster.",
          "This capability supports application sync in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Application Sync when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → manifest render → diff → sync phases/waves → Kubernetes API → health assessment. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app get YOUR_APP\nargocd app diff YOUR_APP\nargocd app sync YOUR_APP --dry-run",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Sync applies the rendered desired manifests from the configured source to the destination cluster. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Application Sync with a real GitOps deployment example.",
        "answer": "Sync applies the rendered desired manifests from the configured source to the destination cluster. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/automated-sync": {
    "summary": "Automated sync lets Argo CD apply repository changes without an operator manually initiating each synchronization.",
    "diagram": {
      "title": "Automated Sync GitOps flow",
      "nodes": [
        "Git commit",
        "repo refresh",
        "out-of-sync detection",
        "automated sync policy",
        "cluster convergence"
      ],
      "explanation": "Git commit → repo refresh → out-of-sync detection → automated sync policy → cluster convergence. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Automated sync lets Argo CD apply repository changes without an operator manually initiating each synchronization.",
          "This capability supports automated sync in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Automated Sync when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git commit → repo refresh → out-of-sync detection → automated sync policy → cluster convergence. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "kubectl get application YOUR_APP -n argocd -o yaml",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Automated sync lets Argo CD apply repository changes without an operator manually initiating each synchronization. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Automated Sync with a real GitOps deployment example.",
        "answer": "Automated sync lets Argo CD apply repository changes without an operator manually initiating each synchronization. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/manual-sync": {
    "summary": "Manual sync lets an operator review and explicitly trigger an application synchronization.",
    "diagram": {
      "title": "Manual Sync GitOps flow",
      "nodes": [
        "operator review",
        "selected revision/resources",
        "sync request",
        "Kubernetes apply",
        "health check"
      ],
      "explanation": "operator review → selected revision/resources → sync request → Kubernetes apply → health check. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Manual sync lets an operator review and explicitly trigger an application synchronization.",
          "This capability supports manual sync in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Manual Sync when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "operator review → selected revision/resources → sync request → Kubernetes apply → health check. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app diff YOUR_APP\nargocd app sync YOUR_APP",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Manual sync lets an operator review and explicitly trigger an application synchronization. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Manual Sync with a real GitOps deployment example.",
        "answer": "Manual sync lets an operator review and explicitly trigger an application synchronization. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/prune-and-self-heal": {
    "summary": "Prune removes managed resources no longer present in Git; self-heal reverts live drift toward Git state when enabled.",
    "diagram": {
      "title": "Prune and Self-heal GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Prune removes managed resources no longer present in Git; self-heal reverts live drift toward Git state when enabled.",
          "This capability supports prune and self-heal in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Prune and Self-heal when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app list\nargocd app get YOUR_APP\nkubectl get applications -n argocd",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Prune removes managed resources no longer present in Git; self-heal reverts live drift toward Git state when enabled. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Prune and Self-heal with a real GitOps deployment example.",
        "answer": "Prune removes managed resources no longer present in Git; self-heal reverts live drift toward Git state when enabled. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/sync-waves-and-hooks": {
    "summary": "Sync waves and hooks control ordering and lifecycle actions during an application sync.",
    "diagram": {
      "title": "Sync Waves and Hooks GitOps flow",
      "nodes": [
        "PreSync hook",
        "wave 0 resources",
        "later waves",
        "PostSync hook",
        "final health status"
      ],
      "explanation": "PreSync hook → wave 0 resources → later waves → PostSync hook → final health status. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Sync waves and hooks control ordering and lifecycle actions during an application sync.",
          "This capability supports sync waves and hooks in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Sync Waves and Hooks when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "PreSync hook → wave 0 resources → later waves → PostSync hook → final health status. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app list\nargocd app get YOUR_APP\nkubectl get applications -n argocd",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Sync waves and hooks control ordering and lifecycle actions during an application sync. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Sync Waves and Hooks with a real GitOps deployment example.",
        "answer": "Sync waves and hooks control ordering and lifecycle actions during an application sync. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/health-status": {
    "summary": "Health status summarizes whether application resources are progressing, healthy, degraded or suspended.",
    "diagram": {
      "title": "Health Status GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Health status summarizes whether application resources are progressing, healthy, degraded or suspended.",
          "This capability supports health status in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Health Status when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app get YOUR_APP\nkubectl get pods -n YOUR_NAMESPACE",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Health status summarizes whether application resources are progressing, healthy, degraded or suspended. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Health Status with a real GitOps deployment example.",
        "answer": "Health status summarizes whether application resources are progressing, healthy, degraded or suspended. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/sync-status": {
    "summary": "Sync status compares live cluster resources with the desired manifests rendered from Git.",
    "diagram": {
      "title": "Sync Status GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Sync status compares live cluster resources with the desired manifests rendered from Git.",
          "This capability supports sync status in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Sync Status when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app get YOUR_APP\nargocd app diff YOUR_APP",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Sync status compares live cluster resources with the desired manifests rendered from Git. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Sync Status with a real GitOps deployment example.",
        "answer": "Sync status compares live cluster resources with the desired manifests rendered from Git. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/app-of-apps-pattern": {
    "summary": "The App of Apps pattern uses a parent Argo CD Application to manage child Application resources.",
    "diagram": {
      "title": "App of Apps Pattern GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "The App of Apps pattern uses a parent Argo CD Application to manage child Application resources.",
          "This capability supports app of apps pattern in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use App of Apps Pattern when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app list\nargocd app get YOUR_APP\nkubectl get applications -n argocd",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "The App of Apps pattern uses a parent Argo CD Application to manage child Application resources. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain App of Apps Pattern with a real GitOps deployment example.",
        "answer": "The App of Apps pattern uses a parent Argo CD Application to manage child Application resources. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/applicationsets": {
    "summary": "ApplicationSets generate and manage multiple Argo CD Applications from cluster, Git or other generators.",
    "diagram": {
      "title": "ApplicationSets GitOps flow",
      "nodes": [
        "ApplicationSet generator",
        "template parameters",
        "child Application resources",
        "app controller reconciliation"
      ],
      "explanation": "ApplicationSet generator → template parameters → child Application resources → app controller reconciliation. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "ApplicationSets generate and manage multiple Argo CD Applications from cluster, Git or other generators.",
          "This capability supports applicationsets in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use ApplicationSets when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "ApplicationSet generator → template parameters → child Application resources → app controller reconciliation. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "kubectl get applicationsets -n argocd\nkubectl describe applicationset YOUR_SET -n argocd",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "ApplicationSets generate and manage multiple Argo CD Applications from cluster, Git or other generators. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain ApplicationSets with a real GitOps deployment example.",
        "answer": "ApplicationSets generate and manage multiple Argo CD Applications from cluster, Git or other generators. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/generators": {
    "summary": "ApplicationSet generators discover input data and produce parameter sets for generated Applications.",
    "diagram": {
      "title": "Generators GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "ApplicationSet generators discover input data and produce parameter sets for generated Applications.",
          "This capability supports generators in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Generators when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app list\nargocd app get YOUR_APP\nkubectl get applications -n argocd",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "ApplicationSet generators discover input data and produce parameter sets for generated Applications. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Generators with a real GitOps deployment example.",
        "answer": "ApplicationSet generators discover input data and produce parameter sets for generated Applications. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/helm-applications": {
    "summary": "Argo CD can render Helm charts and synchronize the resulting Kubernetes resources from chart sources and values.",
    "diagram": {
      "title": "Helm Applications GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Argo CD can render Helm charts and synchronize the resulting Kubernetes resources from chart sources and values.",
          "This capability supports helm applications in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Helm Applications when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app list\nargocd app get YOUR_APP\nkubectl get applications -n argocd",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Argo CD can render Helm charts and synchronize the resulting Kubernetes resources from chart sources and values. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Helm Applications with a real GitOps deployment example.",
        "answer": "Argo CD can render Helm charts and synchronize the resulting Kubernetes resources from chart sources and values. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/kustomize-applications": {
    "summary": "Argo CD can render Kustomize overlays and apply environment-specific Kubernetes configuration.",
    "diagram": {
      "title": "Kustomize Applications GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Argo CD can render Kustomize overlays and apply environment-specific Kubernetes configuration.",
          "This capability supports kustomize applications in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Kustomize Applications when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app list\nargocd app get YOUR_APP\nkubectl get applications -n argocd",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Argo CD can render Kustomize overlays and apply environment-specific Kubernetes configuration. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Kustomize Applications with a real GitOps deployment example.",
        "answer": "Argo CD can render Kustomize overlays and apply environment-specific Kubernetes configuration. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/multi-cluster-deployments": {
    "summary": "Argo CD can deploy applications to multiple registered Kubernetes clusters using destination configuration and policy.",
    "diagram": {
      "title": "Multi-cluster Deployments GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Argo CD can deploy applications to multiple registered Kubernetes clusters using destination configuration and policy.",
          "This capability supports multi-cluster deployments in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Multi-cluster Deployments when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app list\nargocd app get YOUR_APP\nkubectl get applications -n argocd",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Argo CD can deploy applications to multiple registered Kubernetes clusters using destination configuration and policy. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Multi-cluster Deployments with a real GitOps deployment example.",
        "answer": "Argo CD can deploy applications to multiple registered Kubernetes clusters using destination configuration and policy. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/rbac-and-sso": {
    "summary": "Argo CD RBAC maps authenticated identities or groups to application and project permissions, often integrated with SSO.",
    "diagram": {
      "title": "RBAC and SSO GitOps flow",
      "nodes": [
        "Identity provider",
        "OIDC login",
        "group claims",
        "Argo CD RBAC policy",
        "application action authorization"
      ],
      "explanation": "Identity provider → OIDC login → group claims → Argo CD RBAC policy → application action authorization. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Argo CD RBAC maps authenticated identities or groups to application and project permissions, often integrated with SSO.",
          "This capability supports rbac and sso in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use RBAC and SSO when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Identity provider → OIDC login → group claims → Argo CD RBAC policy → application action authorization. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "kubectl get configmap argocd-rbac-cm -n argocd -o yaml\nkubectl get configmap argocd-cm -n argocd -o yaml",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Argo CD RBAC maps authenticated identities or groups to application and project permissions, often integrated with SSO. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain RBAC and SSO with a real GitOps deployment example.",
        "answer": "Argo CD RBAC maps authenticated identities or groups to application and project permissions, often integrated with SSO. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/secrets-management": {
    "summary": "Argo CD secrets management integrates external secret systems or encrypted Git workflows so plaintext credentials are not committed.",
    "diagram": {
      "title": "Secrets Management GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Argo CD secrets management integrates external secret systems or encrypted Git workflows so plaintext credentials are not committed.",
          "This capability supports secrets management in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Secrets Management when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app list\nargocd app get YOUR_APP\nkubectl get applications -n argocd",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Argo CD secrets management integrates external secret systems or encrypted Git workflows so plaintext credentials are not committed. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Secrets Management with a real GitOps deployment example.",
        "answer": "Argo CD secrets management integrates external secret systems or encrypted Git workflows so plaintext credentials are not committed. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/notifications": {
    "summary": "Argo CD notifications send application sync and health events to configured channels and recipients.",
    "diagram": {
      "title": "Notifications GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Argo CD notifications send application sync and health events to configured channels and recipients.",
          "This capability supports notifications in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Notifications when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app list\nargocd app get YOUR_APP\nkubectl get applications -n argocd",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Argo CD notifications send application sync and health events to configured channels and recipients. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Notifications with a real GitOps deployment example.",
        "answer": "Argo CD notifications send application sync and health events to configured channels and recipients. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/progressive-delivery": {
    "summary": "Progressive delivery gradually shifts traffic or releases versions using rollout controllers and analysis gates alongside GitOps.",
    "diagram": {
      "title": "Progressive Delivery GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Progressive delivery gradually shifts traffic or releases versions using rollout controllers and analysis gates alongside GitOps.",
          "This capability supports progressive delivery in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Progressive Delivery when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app list\nargocd app get YOUR_APP\nkubectl get applications -n argocd",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Progressive delivery gradually shifts traffic or releases versions using rollout controllers and analysis gates alongside GitOps. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Progressive Delivery with a real GitOps deployment example.",
        "answer": "Progressive delivery gradually shifts traffic or releases versions using rollout controllers and analysis gates alongside GitOps. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/rollback": {
    "summary": "Rollback restores a previous known-good application revision or manifest state through controlled Git or Argo CD operations.",
    "diagram": {
      "title": "Rollback GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Rollback restores a previous known-good application revision or manifest state through controlled Git or Argo CD operations.",
          "This capability supports rollback in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Rollback when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app list\nargocd app get YOUR_APP\nkubectl get applications -n argocd",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Rollback restores a previous known-good application revision or manifest state through controlled Git or Argo CD operations. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Rollback with a real GitOps deployment example.",
        "answer": "Rollback restores a previous known-good application revision or manifest state through controlled Git or Argo CD operations. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/disaster-recovery": {
    "summary": "Argo CD disaster recovery restores controller configuration, repository access, cluster registrations and application definitions.",
    "diagram": {
      "title": "Disaster Recovery GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Argo CD disaster recovery restores controller configuration, repository access, cluster registrations and application definitions.",
          "This capability supports disaster recovery in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Disaster Recovery when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app list\nargocd app get YOUR_APP\nkubectl get applications -n argocd",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Argo CD disaster recovery restores controller configuration, repository access, cluster registrations and application definitions. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Disaster Recovery with a real GitOps deployment example.",
        "answer": "Argo CD disaster recovery restores controller configuration, repository access, cluster registrations and application definitions. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/argo-cd-security": {
    "summary": "Argo CD security protects API access, repository credentials, Kubernetes RBAC, projects and controller permissions.",
    "diagram": {
      "title": "Argo CD Security GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Argo CD security protects API access, repository credentials, Kubernetes RBAC, projects and controller permissions.",
          "This capability supports argo cd security in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Argo CD Security when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app list\nargocd app get YOUR_APP\nkubectl get applications -n argocd",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Argo CD security protects API access, repository credentials, Kubernetes RBAC, projects and controller permissions. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Argo CD Security with a real GitOps deployment example.",
        "answer": "Argo CD security protects API access, repository credentials, Kubernetes RBAC, projects and controller permissions. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  },
  "argocd/troubleshooting-argo-cd": {
    "summary": "Argo CD troubleshooting inspects repository rendering, application conditions, sync operations, controller logs and Kubernetes resource health.",
    "diagram": {
      "title": "Troubleshooting Argo CD GitOps flow",
      "nodes": [
        "Git revision",
        "repo-server manifest generation",
        "application controller comparison",
        "Kubernetes API sync",
        "resource health"
      ],
      "explanation": "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD continuously observes the source and destination; sync status and health status answer different questions."
    },
    "sections": [
      {
        "heading": "1. What it is and why it matters",
        "paragraphs": [
          "Argo CD troubleshooting inspects repository rendering, application conditions, sync operations, controller logs and Kubernetes resource health.",
          "This capability supports troubleshooting argo cd in a GitOps delivery model. Git provides review history and desired state, while Argo CD reports whether the cluster matches that state and whether deployed resources are healthy."
        ],
        "bullets": [
          "Keep desired manifests and application configuration in Git.",
          "Separate sync status from health status.",
          "Use projects and RBAC to constrain what an application may deploy."
        ]
      },
      {
        "heading": "2. When and where to use it",
        "paragraphs": [
          "Use Troubleshooting Argo CD when teams deploy Kubernetes applications through a Git-based workflow. A pull request reviews manifest changes; after merge, Argo CD detects the new revision and synchronizes the target cluster according to the application's policy.",
          "For production, define repository allowlists, destination restrictions, sync windows or approvals as required, and safe prune behavior."
        ],
        "bullets": [
          "Development: test a new Application against a non-production namespace.",
          "Staging: validate sync, health and rollback behavior.",
          "Production: protect Git branches, projects, credentials and cluster destinations."
        ]
      },
      {
        "heading": "3. How it works step by step",
        "paragraphs": [
          "Git revision → repo-server manifest generation → application controller comparison → Kubernetes API sync → resource health. Argo CD retrieves source content, renders manifests with the configured tool, compares desired and live resources, then syncs changes through the Kubernetes API. It subsequently evaluates resource health.",
          "A resource can be Synced but Degraded, or OutOfSync while still running. Diagnose the comparison and health conditions independently."
        ],
        "bullets": [
          "Source: repository, revision and path or chart.",
          "Destination: registered cluster and namespace.",
          "Sync: apply, prune and hooks according to policy.",
          "Health: assess resource conditions and application readiness."
        ]
      },
      {
        "heading": "4. Practical commands",
        "paragraphs": [
          "Use a non-production Application and replace placeholders with the configured app, repository and namespace. Inspect the diff before triggering a sync; verify the resulting Kubernetes resources afterward."
        ],
        "code": "argocd app get YOUR_APP\nargocd app diff YOUR_APP\nkubectl get events -n argocd --sort-by=.lastTimestamp\nkubectl logs deploy/argocd-application-controller -n argocd --tail=100",
        "note": "Do not commit plaintext repository credentials or Kubernetes secrets to Git. Prune can delete live resources, so enable it only with ownership boundaries and review."
      },
      {
        "heading": "5. Production practices",
        "paragraphs": [
          "Use least-privilege project destinations and resource allowlists, protect repository branches, secure repo credentials and restrict Argo CD administrative access. Keep application manifests declarative and avoid unmanaged live edits.",
          "Use automated sync only when repository review and validation gates are reliable. Test prune, hooks, waves and rollback in staging before enabling them for critical applications."
        ],
        "bullets": [
          "Use separate projects and cluster destinations for environment boundaries.",
          "Protect production Git branches with required reviews and checks.",
          "Monitor sync status, health status, controller logs and notifications.",
          "Keep secrets encrypted or externally managed.",
          "Back up declarative configuration and test controller recovery."
        ]
      },
      {
        "heading": "6. Troubleshooting",
        "paragraphs": [
          "Start with argocd app get and app diff. Determine whether the issue is repository authentication, manifest generation, destination permissions, sync failure, hook failure or workload health. Then inspect the relevant Argo CD component logs and Kubernetes events.",
          "For unhealthy resources, use kubectl describe and application logs to diagnose scheduling, image, probe, storage or network problems. Avoid repeatedly syncing without understanding the failed operation."
        ],
        "bullets": [
          "Comparison error: check repo URL, revision, path and Helm/Kustomize rendering.",
          "Permission denied: inspect project destination rules and cluster RBAC.",
          "OutOfSync: inspect diff and determine whether drift is expected.",
          "Degraded: inspect resource conditions, events and container logs.",
          "Sync stuck: inspect hooks, waves, finalizers and controller logs."
        ]
      },
      {
        "heading": "7. Interview explanation",
        "paragraphs": [
          "Argo CD troubleshooting inspects repository rendering, application conditions, sync operations, controller logs and Kubernetes resource health. In production, I would keep desired state in protected Git, constrain deployments with AppProjects and RBAC, monitor sync and health separately, and test rollback and recovery."
        ],
        "bullets": [
          "Explain the Git-to-cluster reconciliation path.",
          "Describe sync versus health status.",
          "Explain safe prune, secrets and production access controls."
        ]
      }
    ],
    "interview": [
      {
        "question": "Explain Troubleshooting Argo CD with a real GitOps deployment example.",
        "answer": "Argo CD troubleshooting inspects repository rendering, application conditions, sync operations, controller logs and Kubernetes resource health. A team stores Kubernetes manifests in Git, reviews changes through pull requests, and lets Argo CD render and reconcile the approved revision to a controlled cluster destination. Health checks and notifications confirm the result."
      },
      {
        "question": "How do you troubleshoot an Argo CD application that is OutOfSync or Degraded?",
        "answer": "Run argocd app get and argocd app diff to distinguish desired/live drift from health failure. Verify repository credentials and manifest rendering, then inspect project permissions and destination access. For unhealthy resources, use kubectl describe, events and logs to find the underlying workload issue."
      }
    ],
    "handsOn": [
      "Create a lab Git repository with a simple Deployment and Service manifest and connect it to Argo CD.",
      "Create an Application targeting a test namespace; inspect rendered manifests, diff, sync and health.",
      "Make a safe Git change and observe reconciliation; then create controlled drift and observe self-heal behavior if enabled.",
      "Write a runbook covering repository access, sync, health, prune safety and rollback."
    ]
  }
};
