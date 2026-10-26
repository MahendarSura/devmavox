
"use client";

import { useMemo, useState } from "react";

type Lesson = {
  title: string;
  topics: string[];
  outcome: string;
};

type Module = {
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Production";
  duration: string;
  objective: string;
  lessons: Lesson[];
};

const modules: Module[] = [
  {
    title: "1. GitOps Fundamentals",
    level: "Beginner",
    duration: "3–4 hours",
    objective: "Understand GitOps and why Argo CD is used in modern Kubernetes delivery.",
    lessons: [
      {
        title: "Introduction to GitOps",
        topics: [
          "What is GitOps?",
          "Declarative infrastructure and application configuration",
          "Git as the source of truth",
          "Push-based versus pull-based deployment",
          "Continuous Integration versus Continuous Delivery",
          "GitOps benefits: auditability, repeatability and rollback",
          "GitOps limitations and operational trade-offs",
          "Argo CD versus Flux",
        ],
        outcome: "Explain GitOps and identify when Argo CD is appropriate.",
      },
      {
        title: "Argo CD Architecture",
        topics: [
          "Argo CD API server",
          "Application controller",
          "Repo server",
          "Redis and caching concepts",
          "ApplicationSet controller",
          "Notifications controller",
          "How Argo CD communicates with Kubernetes",
          "Reconciliation loops and desired state",
        ],
        outcome: "Understand the major Argo CD components and their responsibilities.",
      },
    ],
  },
  {
    title: "2. Kubernetes and Git Prerequisites",
    level: "Beginner",
    duration: "3–4 hours",
    objective: "Prepare the Kubernetes and Git knowledge required for Argo CD.",
    lessons: [
      {
        title: "Kubernetes Prerequisites",
        topics: [
          "Pods, Deployments and ReplicaSets",
          "Services and Ingress",
          "Namespaces and labels",
          "ConfigMaps and Secrets",
          "Kubernetes YAML manifests",
          "kubectl apply and kubectl get",
          "Kubernetes RBAC basics",
          "Kubeconfig and cluster contexts",
        ],
        outcome: "Recognize the Kubernetes resources Argo CD manages.",
      },
      {
        title: "Git Repository Prerequisites",
        topics: [
          "Git repositories, branches and commits",
          "GitHub, GitLab and Bitbucket overview",
          "Application source code versus deployment manifests",
          "Pull requests and code review",
          "Repository access using HTTPS or SSH",
          "Versioned Kubernetes manifests",
          "Commit history and release tags",
        ],
        outcome: "Prepare a Git repository that can serve as the desired-state source.",
      },
    ],
  },
  {
    title: "3. Argo CD Installation and Setup",
    level: "Beginner",
    duration: "4–5 hours",
    objective: "Install Argo CD and connect to its user interface and CLI.",
    lessons: [
      {
        title: "Installation Methods",
        topics: [
          "Install Argo CD in a dedicated namespace",
          "Install using official installation manifests",
          "Understand Helm-based installation",
          "Inspect Argo CD installation resources",
          "Verify Pods and Services",
          "Check controller logs",
          "Understand version compatibility",
          "Plan installation upgrades",
        ],
        outcome: "Install Argo CD and verify its core components are running.",
      },
      {
        title: "Access and Initial Configuration",
        topics: [
          "Access the Argo CD web interface",
          "Install the argocd CLI",
          "Understand initial admin credentials",
          "Log in and inspect server settings",
          "Port forwarding for temporary access",
          "Expose the UI through a suitable ingress or load balancer",
          "Configure TLS for external access",
          "Secure or disable default administrative access appropriately",
        ],
        outcome: "Access Argo CD through a suitable development or production method.",
      },
    ],
  },
  {
    title: "4. Git Repository Structure for GitOps",
    level: "Beginner",
    duration: "4–5 hours",
    objective: "Organize application code and Kubernetes manifests for reliable deployments.",
    lessons: [
      {
        title: "Repository Design",
        topics: [
          "Application repository versus GitOps repository",
          "Store plain Kubernetes manifests",
          "Organize base and environment overlays",
          "Separate application and platform configuration",
          "Use meaningful directory structures",
          "Version manifests with application releases",
          "Review deployment changes through pull requests",
        ],
        outcome: "Design a maintainable repository for Kubernetes desired state.",
      },
      {
        title: "Environment Management",
        topics: [
          "Development, staging and production directories",
          "Kustomize base and overlays",
          "Helm chart references and values files",
          "Environment-specific replicas and configuration",
          "Avoid copying entire manifests unnecessarily",
          "Promote tested versions between environments",
          "Prevent unreviewed production configuration changes",
        ],
        outcome: "Manage multiple environments with controlled configuration differences.",
      },
    ],
  },
  {
    title: "5. Argo CD Applications",
    level: "Beginner",
    duration: "4–5 hours",
    objective: "Create Applications that connect a Git repository to a Kubernetes destination.",
    lessons: [
      {
        title: "Application Resource",
        topics: [
          "What is an Argo CD Application?",
          "Application metadata and namespace",
          "Source repository URL",
          "Target revision: branch, tag or commit",
          "Path within the repository",
          "Destination cluster and namespace",
          "Application project association",
          "Create an Application using YAML and CLI",
        ],
        outcome: "Define an Application that points to the intended source and destination.",
      },
      {
        title: "Supported Configuration Sources",
        topics: [
          "Plain Kubernetes YAML",
          "Kustomize applications",
          "Helm charts and values",
          "Directory-based manifest generation",
          "Multiple source configurations where supported",
          "Private repository access",
          "Validate rendered manifests",
          "Understand source repository revision resolution",
        ],
        outcome: "Choose the appropriate manifest source for an application.",
      },
    ],
  },
  {
    title: "6. Sync, Refresh and Reconciliation",
    level: "Intermediate",
    duration: "4–5 hours",
    objective: "Understand how Argo CD compares desired state with live Kubernetes resources.",
    lessons: [
      {
        title: "Application Status",
        topics: [
          "Synced versus OutOfSync",
          "Healthy versus Degraded",
          "Progressing, Suspended and Missing states",
          "Unknown application health",
          "Repository refresh and manifest generation",
          "Live state versus desired state",
          "Application events and resource trees",
          "Inspect differences between Git and the cluster",
        ],
        outcome: "Interpret application status and identify deployment discrepancies.",
      },
      {
        title: "Sync Operations",
        topics: [
          "Manual synchronization",
          "Automatic synchronization",
          "Self-heal behavior",
          "Prune behavior",
          "Retry behavior and sync options",
          "Sync waves and ordering",
          "Hooks and lifecycle operations",
          "Understand why automatic sync is not identical to automatic rollback",
        ],
        outcome: "Choose appropriate synchronization settings for an application.",
      },
    ],
  },
  {
    title: "7. Health Checks, Drift and Resource Management",
    level: "Intermediate",
    duration: "4–5 hours",
    objective: "Keep deployed resources consistent with the desired state.",
    lessons: [
      {
        title: "Drift Detection",
        topics: [
          "Manual changes made using kubectl",
          "Changes made through the cloud console",
          "Detect drift through OutOfSync status",
          "Self-heal configuration",
          "Pruning resources removed from Git",
          "Understand resources excluded from management",
          "Avoid conflicting field ownership",
          "Investigate repeated reconciliation differences",
        ],
        outcome: "Detect configuration drift and restore intended state safely.",
      },
      {
        title: "Resource Health and Sync Behavior",
        topics: [
          "Built-in Kubernetes resource health",
          "Deployment readiness and progress",
          "Custom health assessment concepts",
          "Resource dependency ordering",
          "Sync waves and hook phases",
          "Prune propagation policies",
          "Respectful handling of persistent resources",
          "Diagnose applications that remain Progressing",
        ],
        outcome: "Improve deployment ordering and health evaluation.",
      },
    ],
  },
  {
    title: "8. Helm and Argo CD",
    level: "Intermediate",
    duration: "4–5 hours",
    objective: "Deploy and manage Helm-based applications through GitOps.",
    lessons: [
      {
        title: "Helm Integration",
        topics: [
          "Helm chart structure",
          "Chart versions and repositories",
          "values.yaml and environment-specific values",
          "Set values through supported Argo CD source configuration",
          "Use external and private chart repositories",
          "Pin chart versions",
          "Render and inspect manifests",
          "Understand Argo CD's Helm rendering workflow",
        ],
        outcome: "Deploy versioned Helm charts through Argo CD Applications.",
      },
      {
        title: "Helm Release Management",
        topics: [
          "Separate chart defaults from environment overrides",
          "Review rendered resource differences",
          "Upgrade chart versions through Git changes",
          "Rollback by reverting desired-state changes",
          "Manage chart dependencies",
          "Handle CRDs and resource ordering",
          "Troubleshoot missing values and rendering errors",
        ],
        outcome: "Manage Helm-based deployments with repeatable Git changes.",
      },
    ],
  },
  {
    title: "9. Kustomize and Environment Overlays",
    level: "Intermediate",
    duration: "3–4 hours",
    objective: "Manage environment-specific Kubernetes configuration without duplicating manifests.",
    lessons: [
      {
        title: "Kustomize Fundamentals",
        topics: [
          "kustomization.yaml",
          "Resources and bases",
          "Overlays",
          "Image transformations",
          "Namespace transformations",
          "Labels and annotations",
          "Patches and replacements",
          "Render output using kubectl kustomize",
        ],
        outcome: "Create reusable Kustomize configuration for multiple environments.",
      },
      {
        title: "Kustomize with Argo CD",
        topics: [
          "Point an Application to a Kustomize path",
          "Select the correct overlay",
          "Promote image versions through Git",
          "Manage environment-specific replicas",
          "Apply configuration patches",
          "Inspect rendered output before sync",
          "Troubleshoot invalid Kustomize builds",
        ],
        outcome: "Deploy consistent environment overlays through GitOps.",
      },
    ],
  },
  {
    title: "10. Application Projects and Multi-Tenancy",
    level: "Advanced",
    duration: "4–5 hours",
    objective: "Separate application ownership and control what teams can deploy.",
    lessons: [
      {
        title: "AppProject Configuration",
        topics: [
          "Default project limitations",
          "Create dedicated AppProjects",
          "Source repository allowlists",
          "Destination cluster and namespace restrictions",
          "Allowed and denied resource kinds",
          "Project roles",
          "Application ownership and naming standards",
          "Prevent unrestricted deployment access",
        ],
        outcome: "Create project boundaries for teams and applications.",
      },
      {
        title: "Multi-Tenant Design",
        topics: [
          "Team-specific namespaces",
          "Separate repository permissions",
          "Cluster-scoped versus namespace-scoped resources",
          "Least-privilege deployment roles",
          "Shared cluster and dedicated cluster trade-offs",
          "Prevent privilege escalation through manifests",
          "Audit application ownership",
        ],
        outcome: "Design safer shared Argo CD environments.",
      },
    ],
  },
  {
    title: "11. ApplicationSet and Fleet Management",
    level: "Advanced",
    duration: "4–5 hours",
    objective: "Manage many applications or clusters using generated Application resources.",
    lessons: [
      {
        title: "ApplicationSet Fundamentals",
        topics: [
          "Why ApplicationSet is useful",
          "ApplicationSet controller",
          "List generator",
          "Git directory and file generators",
          "Cluster generator",
          "Matrix and merge generator concepts",
          "Template Application configuration",
          "Generator and template troubleshooting",
        ],
        outcome: "Generate Applications from reusable templates.",
      },
      {
        title: "Multi-Cluster Operations",
        topics: [
          "Register destination clusters",
          "Cluster labels and selection",
          "Deploy applications across clusters",
          "Separate regional and environment configuration",
          "Manage application fleets",
          "Control generated Application lifecycle",
          "Understand generator changes and deletion implications",
        ],
        outcome: "Manage deployments across multiple Kubernetes clusters.",
      },
    ],
  },
  {
    title: "12. CI/CD Integration and Image Delivery",
    level: "Production",
    duration: "5–6 hours",
    objective: "Connect application builds to GitOps-based deployment safely.",
    lessons: [
      {
        title: "CI and CD Responsibilities",
        topics: [
          "CI builds and tests application code",
          "Build and publish container images",
          "Keep credentials in secure CI storage",
          "Update image references in Git",
          "Let Argo CD reconcile the desired state",
          "Separate build permissions from deployment permissions",
          "Avoid direct cluster deployments from CI where GitOps is intended",
          "Trace image versions back to source commits",
        ],
        outcome: "Design a clear CI-to-GitOps delivery workflow.",
      },
      {
        title: "Jenkins and GitHub Actions",
        topics: [
          "Build images with Jenkins",
          "Build images using GitHub Actions",
          "Push images to a container registry",
          "Update Helm values or Kustomize image tags",
          "Use pull requests for deployment changes",
          "Validate manifests before merge",
          "Trigger or await Argo CD reconciliation",
          "Capture build and deployment metadata",
        ],
        outcome: "Connect automated builds with reviewed GitOps deployment changes.",
      },
      {
        title: "Image Update Strategies",
        topics: [
          "Immutable image tags",
          "Commit SHA-based tags",
          "Semantic version tags",
          "Image Updater concepts",
          "Automated image update policies",
          "Digest-based image pinning",
          "Promotion of tested images between environments",
          "Avoid using mutable latest tags for controlled production releases",
        ],
        outcome: "Manage application image versions predictably.",
      },
    ],
  },
  {
    title: "13. Secrets and Configuration Security",
    level: "Production",
    duration: "4–5 hours",
    objective: "Protect credentials and sensitive application configuration in GitOps workflows.",
    lessons: [
      {
        title: "Secrets Management",
        topics: [
          "Why plain-text secrets in Git are unsafe",
          "Kubernetes Secret limitations",
          "External secret manager integration concepts",
          "External Secrets Operator",
          "Sealed Secrets concepts",
          "SOPS-based encryption workflows",
          "Secret rotation and synchronization",
          "Avoid exposing secret values in logs and diffs",
        ],
        outcome: "Choose an appropriate approach for managing secrets through GitOps.",
      },
      {
        title: "Secure Access",
        topics: [
          "Repository authentication",
          "SSH deploy keys and tokens",
          "Restrict repository credentials",
          "Argo CD RBAC policies",
          "Kubernetes service accounts",
          "Destination cluster permissions",
          "TLS and trusted certificates",
          "Audit access and rotate credentials",
        ],
        outcome: "Reduce unauthorized access to repositories and clusters.",
      },
    ],
  },
  {
    title: "14. Argo CD RBAC and Production Hardening",
    level: "Production",
    duration: "4–5 hours",
    objective: "Protect the Argo CD control plane and limit deployment privileges.",
    lessons: [
      {
        title: "Identity and Authorization",
        topics: [
          "Built-in administrative access",
          "Local users and account capabilities",
          "SSO integration concepts",
          "OIDC and identity provider integration",
          "RBAC policies and roles",
          "Project roles and scoped permissions",
          "Least-privilege access",
          "Audit administrative actions",
        ],
        outcome: "Implement role-based access suitable for team environments.",
      },
      {
        title: "Hardening and Operational Safety",
        topics: [
          "Protect the Argo CD API endpoint",
          "TLS and network restrictions",
          "Restrict repository and destination access",
          "Secure controller service accounts",
          "Keep Argo CD patched",
          "Review exposed services and ingress rules",
          "Back up important configuration",
          "Plan upgrades and recovery",
        ],
        outcome: "Establish a practical production hardening baseline.",
      },
    ],
  },
  {
    title: "15. Progressive Delivery and Deployment Strategies",
    level: "Advanced",
    duration: "5–6 hours",
    objective: "Understand safer release strategies beyond a simple deployment update.",
    lessons: [
      {
        title: "Release Strategies",
        topics: [
          "Rolling updates",
          "Blue-green deployments",
          "Canary releases",
          "Traffic shifting concepts",
          "Readiness and health checks",
          "Rollback and roll-forward decisions",
          "Feature flags and application compatibility",
          "Limitations of Kubernetes readiness alone",
        ],
        outcome: "Choose a release strategy based on application risk and traffic needs.",
      },
      {
        title: "Argo Rollouts Integration",
        topics: [
          "Argo Rollouts overview",
          "Rollout custom resources",
          "Canary steps and analysis",
          "Blue-green services",
          "Metric-based analysis concepts",
          "Prometheus integration",
          "Integrate Rollouts with Argo CD",
          "Understand the distinction between Argo CD and Argo Rollouts",
        ],
        outcome: "Understand how progressive delivery can extend GitOps deployments.",
      },
    ],
  },
  {
    title: "16. Observability, Notifications and Auditing",
    level: "Production",
    duration: "4–5 hours",
    objective: "Monitor application synchronization and detect deployment failures.",
    lessons: [
      {
        title: "Monitoring Argo CD",
        topics: [
          "Inspect controller and repo-server logs",
          "Argo CD metrics overview",
          "Prometheus scraping concepts",
          "Grafana dashboard concepts",
          "Monitor sync status and application health",
          "Detect reconciliation delays",
          "Track API and repository errors",
          "Monitor resource consumption",
        ],
        outcome: "Identify operational problems using logs, metrics and application status.",
      },
      {
        title: "Notifications and Audit",
        topics: [
          "Argo CD Notifications concepts",
          "Notify on sync failures",
          "Notify on health degradation",
          "Integrate Slack or supported messaging systems",
          "Audit Git commits and deployment history",
          "Record approvals and release metadata",
          "Create actionable alerts",
        ],
        outcome: "Improve deployment visibility and incident response.",
      },
    ],
  },
  {
    title: "17. High Availability, Backup and Upgrades",
    level: "Advanced",
    duration: "4–5 hours",
    objective: "Prepare Argo CD for reliable operation in important environments.",
    lessons: [
      {
        title: "Availability and Scaling",
        topics: [
          "Argo CD component responsibilities",
          "Controller and repository-server scaling concepts",
          "High availability configuration",
          "Redis and caching considerations",
          "Repository polling and webhook behavior",
          "Large repository and application fleet considerations",
          "Resource requests and limits",
          "Capacity planning and performance testing",
        ],
        outcome: "Understand how to scale Argo CD for larger workloads.",
      },
      {
        title: "Backup and Upgrade Planning",
        topics: [
          "Back up Application and AppProject definitions",
          "Version-control declarative Argo CD configuration",
          "Protect repository credentials and secret material",
          "Review upgrade compatibility",
          "Test upgrades in non-production",
          "Validate controllers and application health after upgrade",
          "Recovery and rollback planning",
        ],
        outcome: "Plan maintenance without losing critical deployment configuration.",
      },
    ],
  },
  {
    title: "18. Production Troubleshooting",
    level: "Production",
    duration: "5–6 hours",
    objective: "Diagnose common GitOps failures using evidence and safe recovery practices.",
    lessons: [
      {
        title: "Repository and Manifest Errors",
        topics: [
          "Repository authentication failed",
          "Repository URL or revision not found",
          "Manifest path does not exist",
          "YAML parsing and schema errors",
          "Helm rendering failures",
          "Kustomize build failures",
          "Missing CRDs or unsupported APIs",
          "Inspect repo-server logs and generated manifests",
        ],
        outcome: "Find and fix configuration source failures.",
      },
      {
        title: "Synchronization and Health Errors",
        topics: [
          "Application remains OutOfSync",
          "Application remains Progressing",
          "Sync operation failed",
          "Kubernetes RBAC denied resource creation",
          "Admission webhook rejected a resource",
          "Resource pruning blocked",
          "Immutable field change requires replacement",
          "Inspect events, diffs and controller logs",
        ],
        outcome: "Diagnose why resources fail to synchronize or become healthy.",
      },
      {
        title: "Incident Scenarios",
        topics: [
          "An incorrect Git commit reaches production",
          "An application points to the wrong branch",
          "Self-heal restores an unwanted change",
          "A secret rotation breaks an application",
          "A destination cluster becomes unreachable",
          "A chart upgrade changes resource behavior",
          "A sync wave blocks later resources",
          "Recover through reviewed Git changes and verified reconciliation",
        ],
        outcome: "Respond to production incidents without making uncontrolled cluster changes.",
      },
    ],
  },
  {
    title: "19. Production Projects",
    level: "Production",
    duration: "2–3 weeks",
    objective: "Build a portfolio demonstrating practical GitOps deployment skills.",
    lessons: [
      {
        title: "Project 1 — Deploy an Application",
        topics: [
          "Create a Git repository for Kubernetes manifests",
          "Deploy a sample application",
          "Install and configure Argo CD",
          "Create an Application resource",
          "Sync the application",
          "Verify Pods and Services",
          "Change the desired image version in Git",
          "Observe reconciliation and health status",
        ],
        outcome: "Demonstrate a complete basic GitOps deployment.",
      },
      {
        title: "Project 2 — Multi-Environment GitOps",
        topics: [
          "Create development, staging and production overlays",
          "Use Kustomize or Helm",
          "Keep shared configuration reusable",
          "Promote tested versions between environments",
          "Protect production changes through reviews",
          "Verify environment-specific settings",
          "Document the promotion workflow",
        ],
        outcome: "Build a multi-environment deployment repository.",
      },
      {
        title: "Project 3 — CI with Jenkins or GitHub Actions",
        topics: [
          "Build and test a sample application",
          "Build and publish a container image",
          "Update deployment configuration in Git",
          "Open a deployment pull request",
          "Validate manifests",
          "Let Argo CD deploy the merged revision",
          "Track the image digest and source commit",
          "Document rollback and failure handling",
        ],
        outcome: "Connect CI automation to GitOps-based continuous delivery.",
      },
      {
        title: "Project 4 — Secure Multi-Cluster Deployment",
        topics: [
          "Configure separate destination clusters",
          "Create AppProjects with restricted destinations",
          "Use ApplicationSet to generate Applications",
          "Configure repository access securely",
          "Apply least-privilege RBAC",
          "Deploy environment-specific configuration",
          "Monitor sync and health status",
          "Document cluster access and recovery",
        ],
        outcome: "Demonstrate controlled application delivery across clusters.",
      },
      {
        title: "Project 5 — Production Observability and Recovery",
        topics: [
          "Monitor Argo CD application health",
          "Configure deployment failure notifications",
          "Inspect sync and controller logs",
          "Simulate an invalid manifest",
          "Recover from a failed synchronization",
          "Revert an incorrect desired-state change",
          "Verify the final cluster state",
          "Prepare an incident report",
        ],
        outcome: "Demonstrate GitOps troubleshooting and operational readiness.",
      },
    ],
  },
  {
    title: "20. Argo CD Interview and Career Readiness",
    level: "Advanced",
    duration: "4–5 hours",
    objective: "Prepare for DevOps interviews with architecture explanations and production scenarios.",
    lessons: [
      {
        title: "Core Technical Questions",
        topics: [
          "What is GitOps?",
          "How does Argo CD work?",
          "What are the main Argo CD components?",
          "What is an Application resource?",
          "Synced versus OutOfSync",
          "Healthy versus Degraded",
          "Manual sync versus automated sync",
          "What do prune and self-heal do?",
          "Helm versus Kustomize in Argo CD",
          "What is ApplicationSet?",
        ],
        outcome: "Explain Argo CD architecture and everyday workflows clearly.",
      },
      {
        title: "Advanced Scenario Questions",
        topics: [
          "How do you manage multiple clusters?",
          "How do you prevent unauthorized deployments?",
          "How do you store secrets in GitOps?",
          "How do you investigate OutOfSync resources?",
          "How do you promote an image between environments?",
          "How do you recover from a bad deployment commit?",
          "How do you scale Argo CD for many applications?",
          "How do you monitor GitOps operations?",
          "How do you upgrade Argo CD safely?",
          "How do you design a production GitOps architecture?",
        ],
        outcome: "Demonstrate production-level troubleshooting and design reasoning.",
      },
    ],
  },
];

const levelStyles: Record<Module["level"], string> = {
  Beginner: "bg-emerald-100 text-emerald-800",
  Intermediate: "bg-blue-100 text-blue-800",
  Advanced: "bg-violet-100 text-violet-800",
  Production: "bg-orange-100 text-orange-800",
};

export default function ArgoCDRoadmapPage() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [expanded, setExpanded] = useState<number[]>([0]);
  const [completed, setCompleted] = useState<string[]>([]);

  const totalLessons = modules.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  );

  const completedCount = completed.length;
  const progress =
    totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  const visibleModules = useMemo(() => {
    const query = search.trim().toLowerCase();

    return modules
      .map((module, index) => ({ ...module, originalIndex: index }))
      .filter((module) => level === "All" || module.level === level)
      .filter((module) => {
        if (!query) return true;

        return (
          module.title.toLowerCase().includes(query) ||
          module.objective.toLowerCase().includes(query) ||
          module.lessons.some(
            (lesson) =>
              lesson.title.toLowerCase().includes(query) ||
              lesson.outcome.toLowerCase().includes(query) ||
              lesson.topics.some((topic) =>
                topic.toLowerCase().includes(query)
              )
          )
        );
      });
  }, [search, level]);

  function toggleLesson(key: string) {
    setCompleted((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key]
    );
  }

  function toggleModule(index: number) {
    setExpanded((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  }

  function toggleAllVisible() {
    const indexes = visibleModules.map((module) => module.originalIndex);
    const allExpanded = indexes.every((index) => expanded.includes(index));

    setExpanded((current) =>
      allExpanded
        ? current.filter((index) => !indexes.includes(index))
        : [...new Set([...current, ...indexes])]
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-14 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 inline-flex rounded-full border border-indigo-300/30 bg-indigo-300/10 px-4 py-2 text-sm text-indigo-100">
            DevMavox Learning Roadmap
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            Argo CD — Beginner to Production
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Master GitOps, Kubernetes application delivery, automated
            reconciliation, Helm, Kustomize, multi-cluster management,
            security, CI/CD integration and production troubleshooting.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["20", "Learning modules"],
              [String(totalLessons), "Lesson sections"],
              ["4", "Learning levels"],
              ["5", "Practical projects"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-3xl font-bold">{value}</p>
                <p className="mt-1 text-sm text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Your learning progress</h2>
              <p className="mt-1 text-sm text-slate-500">
                Mark each lesson section as completed when you finish it.
              </p>
            </div>
            <p className="text-2xl font-bold text-indigo-700">{progress}%</p>
          </div>

          <div
            className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label="Argo CD learning progress"
          >
            <div
              className="h-full rounded-full bg-indigo-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-sm text-slate-500">
            {completedCount} of {totalLessons} lesson sections completed
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Progress is held in page state and may reset when you leave or
            refresh this page.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_220px_auto]">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search GitOps topics, settings, errors..."
            aria-label="Search Argo CD roadmap"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          <select
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            aria-label="Filter by learning level"
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500"
          >
            <option value="All">All levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Production">Production</option>
          </select>

          <button
            type="button"
            onClick={toggleAllVisible}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold hover:bg-slate-100"
          >
            Expand / Collapse
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {(["Beginner", "Intermediate", "Advanced", "Production"] as const).map(
            (item) => (
              <span
                key={item}
                className={`rounded-full px-3 py-1.5 font-medium ${levelStyles[item]}`}
              >
                {item}
              </span>
            )
          )}
        </div>

        <div className="mt-6 space-y-4">
          {visibleModules.map((module) => {
            const index = module.originalIndex;
            const isExpanded = expanded.includes(index);
            const moduleCompleted = module.lessons.filter((lesson) =>
              completed.includes(`${index}-${lesson.title}`)
            ).length;

            return (
              <article
                key={module.title}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleModule(index)}
                  aria-expanded={isExpanded}
                  className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${levelStyles[module.level]}`}
                      >
                        {module.level}
                      </span>
                      <span className="text-xs text-slate-500">
                        {module.duration}
                      </span>
                    </div>

                    <h2 className="mt-3 text-lg font-bold sm:text-xl">
                      {module.title}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                      {module.objective}
                    </p>
                    <p className="mt-3 text-xs font-medium text-slate-500">
                      {moduleCompleted} / {module.lessons.length} lesson
                      sections completed
                    </p>
                  </div>

                  <span
                    className="mt-2 text-xl text-slate-500"
                    aria-hidden="true"
                  >
                    {isExpanded ? "−" : "+"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-100 px-5 pb-5 sm:px-6 sm:pb-6">
                    <div className="space-y-4 pt-5">
                      {module.lessons.map((lesson) => {
                        const key = `${index}-${lesson.title}`;
                        const isCompleted = completed.includes(key);

                        return (
                          <section
                            key={lesson.title}
                            className="rounded-xl border border-slate-200 p-4 sm:p-5"
                          >
                            <label className="flex cursor-pointer items-start gap-3">
                              <input
                                type="checkbox"
                                checked={isCompleted}
                                onChange={() => toggleLesson(key)}
                                className="mt-1 h-4 w-4 accent-indigo-600"
                              />
                              <span className="font-semibold">
                                {lesson.title}
                              </span>
                            </label>

                            <ul className="ml-7 mt-4 list-disc space-y-2 pl-4 text-sm leading-6 text-slate-600 marker:text-indigo-600">
                              {lesson.topics.map((topic) => (
                                <li key={topic}>{topic}</li>
                              ))}
                            </ul>

                            <div className="ml-7 mt-4 rounded-lg bg-indigo-50 p-3 text-sm leading-6 text-indigo-950">
                              <strong>Learning outcome:</strong>{" "}
                              {lesson.outcome}
                            </div>
                          </section>
                        );
                      })}
                    </div>
                  </div>
                )}
              </article>
            );
          })}

          {visibleModules.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h2 className="text-lg font-bold">No matching topics found</h2>
              <p className="mt-2 text-sm text-slate-500">
                Try another keyword or select All levels.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setLevel("All");
                }}
                className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        <section className="mt-10 rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
          <h2 className="text-2xl font-bold">Recommended learning sequence</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-300">
            Start with GitOps, Kubernetes and installation fundamentals. Then
            learn Applications, synchronization, Helm and Kustomize. Move on
            to multi-tenancy, ApplicationSet, CI/CD, security and observability.
            Finish with production projects and incident troubleshooting.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Learn", "GitOps and Argo CD architecture"],
              ["02", "Deploy", "Applications, Helm and Kustomize"],
              ["03", "Secure", "CI/CD, RBAC and multi-cluster"],
              ["04", "Operate", "Monitoring and incident recovery"],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm font-bold text-indigo-300">{number}</p>
                <h3 className="mt-2 font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
