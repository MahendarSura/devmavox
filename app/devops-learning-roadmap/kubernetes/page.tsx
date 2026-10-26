
"use client";

import { useMemo, useState } from "react";

type Lesson = {
  title: string;
  topics: string[];
  purpose: string;
};

type Module = {
  title: string;
  level: "Foundation" | "Beginner" | "Intermediate" | "Advanced" | "Production";
  duration: string;
  description: string;
  lessons: Lesson[];
};

const modules: Module[] = [
  {
    title: "01. Kubernetes Fundamentals",
    level: "Foundation",
    duration: "2–3 days",
    description: "Understand container orchestration and the role Kubernetes plays in modern DevOps.",
    lessons: [
      {
        title: "Introduction to Kubernetes",
        purpose: "Understand what Kubernetes solves and when organizations use it.",
        topics: [
          "What is Kubernetes and why it was created?",
          "Container orchestration and desired state",
          "Docker containers versus Kubernetes",
          "Manual deployment versus orchestration",
          "Scaling, self-healing and service discovery",
          "Kubernetes versus Docker Swarm",
          "Kubernetes versus Amazon ECS and Amazon EKS",
          "Kubernetes use cases, benefits and limitations",
        ],
      },
      {
        title: "Kubernetes architecture",
        purpose: "Understand how cluster components work together to run applications.",
        topics: [
          "Cluster, control plane and worker nodes",
          "kube-apiserver and Kubernetes API",
          "etcd and cluster state storage",
          "kube-scheduler and pod placement",
          "kube-controller-manager and reconciliation loops",
          "Cloud controller manager",
          "kubelet and container runtime",
          "kube-proxy and service networking",
          "Container Network Interface (CNI)",
          "CoreDNS and cluster name resolution",
          "Request flow from kubectl to a running Pod",
        ],
      },
      {
        title: "Kubernetes environments",
        purpose: "Understand local development, managed clusters and production environments.",
        topics: [
          "Local clusters versus remote clusters",
          "Minikube, kind and Docker Desktop Kubernetes",
          "Self-managed versus managed Kubernetes",
          "Development, staging and production environments",
          "Cluster availability and failure domains",
          "Kubernetes versions and compatibility",
        ],
      },
    ],
  },
  {
    title: "02. Cluster Setup, kubectl and Configuration",
    level: "Beginner",
    duration: "2–3 days",
    description: "Learn cluster access, resource inspection and safe command-line management.",
    lessons: [
      {
        title: "Cluster setup and verification",
        purpose: "Understand what a healthy Kubernetes cluster looks like.",
        topics: [
          "Installing kubectl",
          "Creating a local cluster with kind or Minikube",
          "Checking nodes and namespaces",
          "Inspecting system Pods",
          "Understanding cluster information and versions",
          "Local cluster limitations compared with production",
        ],
      },
      {
        title: "kubectl command fundamentals",
        purpose: "Learn the standard interface for interacting with Kubernetes resources.",
        topics: [
          "get, describe, create, apply and delete",
          "edit, patch and replace",
          "logs, exec and port-forward",
          "get -o yaml and get -o json",
          "Labels, selectors and field selectors",
          "JSONPath and custom columns",
          "Events and resource inspection",
          "Dry-run, diff and validation workflows",
          "Understanding command errors and API responses",
        ],
      },
      {
        title: "Kubeconfig and cluster access",
        purpose: "Manage cluster contexts and understand access boundaries.",
        topics: [
          "Kubeconfig structure",
          "Clusters, users and contexts",
          "Switching contexts and namespaces",
          "API server endpoints",
          "Authentication and authorization",
          "TLS certificates and certificate authorities",
          "RBAC basics",
          "Safe context selection before production changes",
        ],
      },
    ],
  },
  {
    title: "03. Kubernetes YAML and Resource Management",
    level: "Beginner",
    duration: "2–3 days",
    description: "Understand declarative manifests and how Kubernetes maintains the desired state.",
    lessons: [
      {
        title: "YAML manifest structure",
        purpose: "Read and understand the configuration used to define Kubernetes resources.",
        topics: [
          "apiVersion, kind, metadata and spec",
          "Nested mappings, lists and indentation",
          "Labels and annotations",
          "Selectors and matching labels",
          "Namespaces and resource scope",
          "Multiple resources in one manifest",
          "Environment variables and references",
          "Resource requests, limits and policies",
          "Common YAML syntax mistakes",
        ],
      },
      {
        title: "Declarative resource management",
        purpose: "Understand how configuration changes are applied and reconciled.",
        topics: [
          "Imperative versus declarative management",
          "kubectl apply and desired state",
          "Server-side apply fundamentals",
          "Configuration drift",
          "Field ownership and conflicting changes",
          "Dry-run validation and manifest diffs",
          "Managing manifests in Git",
          "Reviewing configuration before deployment",
        ],
      },
    ],
  },
  {
    title: "04. Pods and Container Lifecycle",
    level: "Beginner",
    duration: "3–4 days",
    description: "Learn the basic runtime unit and how Kubernetes starts, monitors and restarts containers.",
    lessons: [
      {
        title: "Pods in depth",
        purpose: "Understand the smallest deployable unit in Kubernetes.",
        topics: [
          "Pod anatomy and lifecycle",
          "Pod phases and container states",
          "Single-container and multi-container Pods",
          "Init containers and sidecar containers",
          "Restart policies",
          "Commands and arguments",
          "Environment variables and configuration references",
          "Container ports",
          "Resource requests and limits",
          "Pod identity and ephemeral storage",
        ],
      },
      {
        title: "Container health and lifecycle controls",
        purpose: "Understand how Kubernetes detects and responds to application health.",
        topics: [
          "Startup probes",
          "Liveness probes",
          "Readiness probes",
          "Probe timing, thresholds and failure behaviour",
          "Graceful termination",
          "Termination grace periods",
          "Lifecycle hooks",
          "Restart behaviour and crash loops",
          "Pod termination and replacement",
        ],
      },
    ],
  },
  {
    title: "05. Workload Controllers and Deployments",
    level: "Intermediate",
    duration: "4–5 days",
    description: "Choose the right controller for stateless applications, stateful systems and scheduled jobs.",
    lessons: [
      {
        title: "ReplicaSets and Deployments",
        purpose: "Understand application replicas, rollout management and recovery.",
        topics: [
          "Desired replicas and reconciliation",
          "Deployment and ReplicaSet relationship",
          "Scaling and replica management",
          "Rolling updates",
          "Recreate deployment strategy",
          "maxSurge and maxUnavailable",
          "Rollout status and history",
          "Rollback and revision management",
          "Image tags and image pull policies",
          "Deployment selectors and immutable fields",
        ],
      },
      {
        title: "StatefulSets",
        purpose: "Understand workloads requiring stable identities and persistent storage.",
        topics: [
          "StatefulSets versus Deployments",
          "Stable Pod identity and ordering",
          "Headless Services",
          "Volume claim templates",
          "Scaling and update behaviour",
          "Ordered and parallel management policies",
          "Stateful application design considerations",
        ],
      },
      {
        title: "DaemonSets, Jobs and CronJobs",
        purpose: "Choose controllers for node-level services and finite tasks.",
        topics: [
          "DaemonSets and node-level agents",
          "Jobs and completion criteria",
          "Parallel Jobs and completions",
          "Backoff limits and failure handling",
          "CronJobs and scheduling",
          "Concurrency policies and missed schedules",
          "Job history and cleanup",
          "Selecting the correct workload controller",
        ],
      },
    ],
  },
  {
    title: "06. Services and Kubernetes Networking",
    level: "Intermediate",
    duration: "4–5 days",
    description: "Understand Pod communication, stable service discovery and external traffic routing.",
    lessons: [
      {
        title: "Services and endpoint discovery",
        purpose: "Understand how traffic reaches replaceable application Pods.",
        topics: [
          "ClusterIP, NodePort and LoadBalancer",
          "Service selectors and matching labels",
          "Endpoints and EndpointSlices",
          "port, targetPort and nodePort",
          "Named ports and protocols",
          "Service DNS names",
          "Headless Services",
          "ExternalName Services",
          "Service without endpoints",
        ],
      },
      {
        title: "Pod networking fundamentals",
        purpose: "Understand network communication between Pods and nodes.",
        topics: [
          "Pod IP addresses and network namespaces",
          "Pod-to-Pod communication",
          "Pod-to-Service communication",
          "Node networking and routing",
          "CNI plugin responsibilities",
          "Overlay and routed networking concepts",
          "IP address management",
          "Network connectivity and packet-flow concepts",
        ],
      },
      {
        title: "Ingress and Gateway API",
        purpose: "Understand HTTP and HTTPS traffic entry into a cluster.",
        topics: [
          "Ingress resources and controllers",
          "Host-based and path-based routing",
          "TLS termination and HTTPS",
          "Ingress controller responsibilities",
          "Load balancer integration",
          "Common 404 and 502 causes",
          "Gateway API fundamentals",
          "Gateway, HTTPRoute and traffic policies",
          "Ingress versus Gateway API",
        ],
      },
      {
        title: "NetworkPolicy and DNS",
        purpose: "Understand traffic restrictions and service name resolution.",
        topics: [
          "CoreDNS architecture and service discovery",
          "DNS names and search domains",
          "NetworkPolicy ingress and egress rules",
          "Pod and namespace selectors",
          "Default-deny and allow-list patterns",
          "CNI support requirements",
          "DNS failures and connectivity diagnosis",
        ],
      },
    ],
  },
  {
    title: "07. Storage and Stateful Applications",
    level: "Intermediate",
    duration: "3–4 days",
    description: "Understand persistent data, storage provisioning and application storage requirements.",
    lessons: [
      {
        title: "Volumes and persistent storage",
        purpose: "Understand how container storage differs from persistent application data.",
        topics: [
          "Container writable layer versus volumes",
          "emptyDir and temporary storage",
          "PersistentVolume and PersistentVolumeClaim",
          "StorageClass and dynamic provisioning",
          "Static versus dynamic provisioning",
          "Access modes and volume capabilities",
          "Reclaim policies and volume lifecycle",
          "Volume attachment and mount behaviour",
          "CSI drivers and storage integrations",
        ],
      },
      {
        title: "Stateful storage operations",
        purpose: "Understand storage behaviour for databases and other stateful workloads.",
        topics: [
          "PVC binding and Pending claims",
          "StatefulSet volume claim templates",
          "Storage capacity and expansion",
          "Filesystem permissions and ownership",
          "Snapshots and backup concepts",
          "Restore and disaster recovery considerations",
          "Storage performance and availability",
          "Data durability versus application availability",
        ],
      },
    ],
  },
  {
    title: "08. Configuration and Secrets",
    level: "Intermediate",
    duration: "2–3 days",
    description: "Separate application configuration from container images and manage sensitive values safely.",
    lessons: [
      {
        title: "ConfigMaps",
        purpose: "Manage non-sensitive application configuration.",
        topics: [
          "ConfigMap creation and manifest structure",
          "Environment variable references",
          "Mounted configuration files",
          "Optional configuration references",
          "Updating configuration and application reload behaviour",
          "Pod restart considerations",
          "ConfigMap size and scope limitations",
        ],
      },
      {
        title: "Secrets and sensitive configuration",
        purpose: "Understand Kubernetes Secret handling and its security limitations.",
        topics: [
          "Secret types and usage",
          "Environment variables and mounted Secret volumes",
          "Base64 encoding versus encryption",
          "Encryption at rest",
          "RBAC access restrictions",
          "External secret management integrations",
          "Secret rotation and application reload",
          "Avoiding secrets in Git and container images",
        ],
      },
    ],
  },
  {
    title: "09. Scheduling, Resources and Autoscaling",
    level: "Advanced",
    duration: "4–5 days",
    description: "Understand workload placement, resource contention and automatic scaling.",
    lessons: [
      {
        title: "Scheduling and placement",
        purpose: "Understand why workloads run on particular nodes or remain unscheduled.",
        topics: [
          "kube-scheduler and scheduling decisions",
          "CPU and memory requests",
          "Resource limits and throttling",
          "Node selectors and node affinity",
          "Pod affinity and anti-affinity",
          "Taints and tolerations",
          "Topology spread constraints",
          "PriorityClasses and preemption",
          "Pod overhead and extended resources",
          "FailedScheduling conditions",
        ],
      },
      {
        title: "Autoscaling",
        purpose: "Understand how Kubernetes adjusts workload and node capacity.",
        topics: [
          "Manual scaling",
          "Horizontal Pod Autoscaler (HPA)",
          "Vertical Pod Autoscaler (VPA) concepts",
          "Metrics Server",
          "CPU and memory utilization",
          "Custom and external metrics",
          "Cluster Autoscaler concepts",
          "Node provisioning integrations",
          "Scaling limits and stabilization",
          "Capacity planning and scaling trade-offs",
        ],
      },
      {
        title: "Resource management",
        purpose: "Understand resource guarantees, contention and namespace-level controls.",
        topics: [
          "Requests versus limits",
          "QoS classes: Guaranteed, Burstable and BestEffort",
          "CPU throttling",
          "OOMKilled and memory pressure",
          "ResourceQuota",
          "LimitRange",
          "Namespace capacity planning",
          "Eviction and node-pressure behaviour",
        ],
      },
    ],
  },
  {
    title: "10. Kubernetes Security and RBAC",
    level: "Advanced",
    duration: "4–5 days",
    description: "Understand identity, permissions, workload hardening and cluster security controls.",
    lessons: [
      {
        title: "Authentication and authorization",
        purpose: "Understand who can access the cluster and which actions they can perform.",
        topics: [
          "Users, groups and service accounts",
          "Authentication versus authorization",
          "Role and ClusterRole",
          "RoleBinding and ClusterRoleBinding",
          "Least-privilege access",
          "Service account token behaviour",
          "Namespace-scoped versus cluster-scoped permissions",
          "RBAC permission review",
          "Audit logging concepts",
        ],
      },
      {
        title: "Pod and workload security",
        purpose: "Understand how to reduce the impact of a compromised workload.",
        topics: [
          "Pod Security Standards",
          "Pod Security Admission",
          "Security contexts",
          "Run as non-root",
          "Linux capabilities",
          "Privilege escalation controls",
          "Read-only root filesystems",
          "Seccomp and AppArmor concepts",
          "Host namespaces and hostPath risks",
          "Image provenance and vulnerability scanning",
        ],
      },
      {
        title: "Cluster security controls",
        purpose: "Understand layered security for production Kubernetes environments.",
        topics: [
          "NetworkPolicy segmentation",
          "Secret encryption and key management",
          "Admission control and policy enforcement",
          "Validating and mutating admission webhooks",
          "Pod security and policy engines",
          "Supply-chain security fundamentals",
          "Kubernetes API exposure",
          "Patch management and version upgrades",
          "Audit trails and incident investigation",
        ],
      },
    ],
  },
  {
    title: "11. Helm and Application Packaging",
    level: "Advanced",
    duration: "3–4 days",
    description: "Understand reusable application packaging and environment-specific configuration.",
    lessons: [
      {
        title: "Helm fundamentals",
        purpose: "Understand how Helm packages and releases Kubernetes resources.",
        topics: [
          "Charts, releases and repositories",
          "Chart.yaml and values.yaml",
          "Templates and built-in objects",
          "Values precedence and overrides",
          "Template functions and pipelines",
          "Helm install, upgrade, rollback and uninstall",
          "Release history and status",
          "Dependencies and subcharts",
        ],
      },
      {
        title: "Production Helm design",
        purpose: "Understand how to maintain reusable and reviewable deployment charts.",
        topics: [
          "Chart directory structure",
          "Reusable templates and helpers",
          "Environment-specific values files",
          "Schema validation",
          "helm lint and helm template",
          "Dependency version pinning",
          "Chart versioning and publishing",
          "Secrets handling in Helm workflows",
          "Helm release troubleshooting",
        ],
      },
    ],
  },
  {
    title: "12. Custom Resources and Extensibility",
    level: "Advanced",
    duration: "2–3 days",
    description: "Understand how Kubernetes APIs can be extended for platform-specific requirements.",
    lessons: [
      {
        title: "Custom Resource Definitions",
        purpose: "Understand how custom API resources extend Kubernetes.",
        topics: [
          "Custom Resource Definitions (CRDs)",
          "Custom resources and schema validation",
          "API versions and conversion concepts",
          "Resource lifecycle and scope",
          "Status subresources",
          "Custom resource ownership",
        ],
      },
      {
        title: "Operators and controllers",
        purpose: "Understand how automation manages complex applications.",
        topics: [
          "Controller reconciliation loops",
          "Operator pattern",
          "Desired state and observed state",
          "Finalizers and owner references",
          "Custom controllers and automation",
          "Operator lifecycle management",
          "When to use an Operator",
        ],
      },
    ],
  },
  {
    title: "13. Observability, Logging and Monitoring",
    level: "Advanced",
    duration: "3–4 days",
    description: "Understand how to monitor cluster health and investigate application behaviour.",
    lessons: [
      {
        title: "Metrics and resource visibility",
        purpose: "Understand cluster and workload performance signals.",
        topics: [
          "Node and Pod metrics",
          "Metrics Server",
          "CPU, memory and storage monitoring",
          "Prometheus fundamentals",
          "Kubernetes metrics and exporters",
          "Grafana dashboards",
          "Capacity and saturation indicators",
        ],
      },
      {
        title: "Logging and distributed tracing",
        purpose: "Understand how application activity is investigated across services.",
        topics: [
          "Container stdout and stderr logs",
          "Centralized log aggregation",
          "Fluent Bit and OpenTelemetry concepts",
          "Structured logging",
          "Correlation IDs and trace context",
          "Distributed tracing fundamentals",
          "Log retention and access control",
        ],
      },
      {
        title: "Alerting and reliability",
        purpose: "Understand how to detect incidents and measure service health.",
        topics: [
          "Prometheus alerting and Alertmanager",
          "Alert thresholds and alert fatigue",
          "Service Level Indicators (SLIs)",
          "Service Level Objectives (SLOs)",
          "Error budgets",
          "Golden signals: latency, traffic, errors and saturation",
          "Health checks and synthetic monitoring",
          "Incident response and post-incident learning",
        ],
      },
    ],
  },
  {
    title: "14. Troubleshooting and Failure Analysis",
    level: "Production",
    duration: "Ongoing learning",
    description: "Build a systematic approach to diagnosing common and complex Kubernetes failures.",
    lessons: [
      {
        title: "Pod and workload failures",
        purpose: "Understand how to identify the root cause of workload startup and runtime failures.",
        topics: [
          "CrashLoopBackOff",
          "ImagePullBackOff and ErrImagePull",
          "Pending Pods and FailedScheduling",
          "ContainerCreating and mount failures",
          "OOMKilled and resource pressure",
          "CreateContainerConfigError",
          "Startup, liveness and readiness probe failures",
          "Deployment rollout stuck",
          "ReplicaSet not creating expected Pods",
          "Application process and container exit codes",
        ],
      },
      {
        title: "Networking and service failures",
        purpose: "Trace communication failures across the application networking path.",
        topics: [
          "Service selector mismatch",
          "Empty EndpointSlices",
          "Cluster DNS resolution failures",
          "CoreDNS health and configuration",
          "Ingress 404, 502 and 503 errors",
          "NetworkPolicy blocking traffic",
          "Pod-to-Pod connectivity failures",
          "Load balancer health checks",
          "TLS certificates and routing errors",
        ],
      },
      {
        title: "Node, storage and control-plane issues",
        purpose: "Understand infrastructure-related failures affecting workloads and clusters.",
        topics: [
          "Node NotReady",
          "Kubelet and container runtime problems",
          "Node disk and memory pressure",
          "PVC stuck in Pending",
          "Volume mount and attachment failures",
          "Control-plane and API server connectivity",
          "etcd health concepts",
          "Scheduling capacity exhaustion",
          "Certificate expiry and access failures",
          "Events, logs and timelines for root-cause analysis",
        ],
      },
    ],
  },
  {
    title: "15. High Availability, Upgrades and Cluster Operations",
    level: "Production",
    duration: "4–6 days",
    description: "Understand the operational practices needed to maintain reliable Kubernetes clusters.",
    lessons: [
      {
        title: "High availability and resilience",
        purpose: "Understand how architecture choices influence availability and recovery.",
        topics: [
          "Control-plane high availability concepts",
          "Multiple replicas and failure domains",
          "Pod disruption budgets",
          "Readiness and graceful shutdown",
          "Topology spread and anti-affinity",
          "Availability zones and node pools",
          "Fault tolerance and dependency failures",
          "Capacity headroom",
        ],
      },
      {
        title: "Cluster maintenance and upgrades",
        purpose: "Understand controlled cluster and node maintenance.",
        topics: [
          "Kubernetes version skew policy",
          "Control-plane and worker-node upgrade concepts",
          "Cordon and drain",
          "Pod disruption budgets during maintenance",
          "Deprecated APIs and manifest migration",
          "Node replacement and pool management",
          "Rollback limitations and recovery planning",
          "Upgrade validation and release notes",
        ],
      },
      {
        title: "Backup and disaster recovery",
        purpose: "Understand what must be recovered after a serious cluster or data failure.",
        topics: [
          "etcd backup concepts for self-managed clusters",
          "Application data backups",
          "Persistent volume snapshots",
          "Configuration and manifest versioning",
          "Recovery point objective (RPO)",
          "Recovery time objective (RTO)",
          "Restore validation",
          "Disaster recovery planning",
          "Cluster rebuild and dependency recovery",
        ],
      },
    ],
  },
  {
    title: "16. Kubernetes in CI/CD and GitOps",
    level: "Advanced",
    duration: "4–5 days",
    description: "Understand how application delivery, automated deployment and Git-based operations fit together.",
    lessons: [
      {
        title: "CI/CD delivery workflow",
        purpose: "Understand how source code becomes a running Kubernetes application.",
        topics: [
          "Source control and branching",
          "Build, test and container image creation",
          "Image registries and immutable image references",
          "Manifest validation and security scanning",
          "Deployment promotion across environments",
          "Release approvals and rollback planning",
          "Secrets in delivery pipelines",
          "Deployment status and verification",
        ],
      },
      {
        title: "GitOps and Argo CD",
        purpose: "Understand Git as the source of truth for cluster configuration.",
        topics: [
          "GitOps principles",
          "Desired state stored in Git",
          "Argo CD architecture and application resources",
          "Automated versus manual synchronization",
          "Drift detection and reconciliation",
          "Sync waves and health checks",
          "Rollback and Git history",
          "Multi-environment repository patterns",
          "Access control and promotion strategies",
        ],
      },
      {
        title: "Progressive delivery",
        purpose: "Understand controlled rollout approaches for reducing deployment risk.",
        topics: [
          "Rolling deployments",
          "Blue-green deployment concepts",
          "Canary releases",
          "Traffic splitting",
          "Automated rollout analysis",
          "Feature flags and release separation",
          "Rollback triggers and health criteria",
        ],
      },
    ],
  },
  {
    title: "17. Managed Kubernetes and Cloud Platforms",
    level: "Advanced",
    duration: "3–5 days",
    description: "Understand Kubernetes operations in cloud environments and the boundaries of managed services.",
    lessons: [
      {
        title: "Amazon EKS",
        purpose: "Understand managed Kubernetes architecture on AWS.",
        topics: [
          "EKS control plane and worker nodes",
          "Managed and self-managed node groups",
          "Fargate profiles",
          "IAM and Kubernetes access integration",
          "EKS access entries and RBAC",
          "VPC CNI and Pod networking",
          "EBS CSI and EFS CSI concepts",
          "AWS Load Balancer Controller",
          "EKS upgrades and add-ons",
          "CloudWatch integration and operational costs",
        ],
      },
      {
        title: "Other managed Kubernetes platforms",
        purpose: "Understand which operational concepts are shared across cloud providers.",
        topics: [
          "Google Kubernetes Engine (GKE)",
          "Azure Kubernetes Service (AKS)",
          "Managed control-plane responsibilities",
          "Node pools and cloud integrations",
          "Identity and network integration",
          "Storage and load balancer integration",
          "Portability and provider-specific dependencies",
        ],
      },
    ],
  },
  {
    title: "18. Advanced Platform Engineering",
    level: "Advanced",
    duration: "Ongoing learning",
    description: "Explore advanced patterns used by teams operating Kubernetes as an internal platform.",
    lessons: [
      {
        title: "Multi-tenancy and platform design",
        purpose: "Understand how multiple teams can safely share Kubernetes infrastructure.",
        topics: [
          "Namespace-based tenant separation",
          "RBAC and service account boundaries",
          "ResourceQuota and LimitRange",
          "Network isolation",
          "Policy enforcement",
          "Shared cluster versus dedicated cluster trade-offs",
          "Developer self-service and platform APIs",
          "Golden paths and reusable templates",
        ],
      },
      {
        title: "Service mesh and traffic management",
        purpose: "Understand advanced service-to-service networking and security.",
        topics: [
          "Service mesh concepts",
          "Sidecar and ambient data-plane approaches",
          "mTLS between services",
          "Traffic routing and retries",
          "Timeouts and circuit-breaking concepts",
          "Telemetry and service identity",
          "Operational overhead and adoption trade-offs",
        ],
      },
      {
        title: "Policy, cost and efficiency",
        purpose: "Understand how platform teams govern clusters and optimize usage.",
        topics: [
          "Policy-as-code concepts",
          "Admission policies and validation",
          "Kyverno and Gatekeeper concepts",
          "Resource requests and rightsizing",
          "Bin packing and scheduling efficiency",
          "Idle resource identification",
          "Cluster capacity and cost allocation",
          "Governance and exception management",
        ],
      },
    ],
  },
  {
    title: "19. Production Architecture and Reliability",
    level: "Production",
    duration: "Ongoing learning",
    description: "Bring architecture, security, delivery and operations together for production workloads.",
    lessons: [
      {
        title: "Production application architecture",
        purpose: "Understand the major design decisions for reliable services.",
        topics: [
          "Stateless application architecture",
          "Stateful services and external data stores",
          "Readiness and dependency health",
          "Horizontal scaling and capacity headroom",
          "Zone-aware workload placement",
          "Ingress, gateways and external dependencies",
          "Secrets and configuration separation",
          "Graceful shutdown and connection draining",
          "Deployment and rollback design",
        ],
      },
      {
        title: "Reliability and operational readiness",
        purpose: "Understand how to assess whether an application is ready for production.",
        topics: [
          "Availability, latency and error rates",
          "SLIs, SLOs and error budgets",
          "Capacity planning and load testing",
          "Failure-mode analysis",
          "Backup and restore verification",
          "Security and vulnerability management",
          "Operational runbooks",
          "On-call readiness and incident communication",
          "Postmortems and continuous improvement",
        ],
      },
    ],
  },
  {
    title: "20. Kubernetes Interview and Career Readiness",
    level: "Production",
    duration: "Ongoing revision",
    description: "Organize the knowledge needed to explain design decisions and reason about real incidents.",
    lessons: [
      {
        title: "Fundamental and intermediate concepts",
        purpose: "Build clear explanations of Kubernetes architecture and everyday behaviour.",
        topics: [
          "Pod versus Deployment versus StatefulSet",
          "Deployment versus ReplicaSet",
          "ClusterIP versus NodePort versus LoadBalancer",
          "Requests versus limits",
          "Readiness versus liveness versus startup probes",
          "ConfigMap versus Secret",
          "PersistentVolume versus PersistentVolumeClaim",
          "Role versus ClusterRole",
          "Ingress versus Gateway API",
          "Helm versus raw manifests",
        ],
      },
      {
        title: "Advanced scenario-based knowledge",
        purpose: "Explain diagnosis and trade-offs rather than memorizing definitions.",
        topics: [
          "Why a Pod remains Pending",
          "How to investigate CrashLoopBackOff",
          "How to diagnose an empty Service endpoint",
          "How to investigate DNS failures",
          "How to approach a Node NotReady incident",
          "How to plan a safe rollout and rollback",
          "How to design high availability",
          "How to restrict workload permissions",
          "How to investigate memory pressure",
          "How to plan upgrades and disaster recovery",
        ],
      },
      {
        title: "Career progression",
        purpose: "Map learning priorities to common Kubernetes responsibilities.",
        topics: [
          "Junior DevOps Engineer: core objects and kubectl",
          "DevOps Engineer: deployments, networking and storage",
          "Senior DevOps Engineer: security, reliability and automation",
          "Platform Engineer: multi-tenancy and developer platforms",
          "SRE: SLOs, incident response and resilience",
          "Cloud DevOps Engineer: EKS, IAM and cloud networking",
          "Building an explainable Kubernetes knowledge portfolio",
        ],
      },
    ],
  },
];

const levelStyles: Record<Module["level"], string> = {
  Foundation: "bg-slate-100 text-slate-700",
  Beginner: "bg-emerald-100 text-emerald-800",
  Intermediate: "bg-blue-100 text-blue-800",
  Advanced: "bg-violet-100 text-violet-800",
  Production: "bg-orange-100 text-orange-800",
};

export default function KubernetesRoadmapPage() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [expanded, setExpanded] = useState<number[]>([0]);
  const [completed, setCompleted] = useState<string[]>([]);

  const filteredModules = useMemo(() => {
    const query = search.trim().toLowerCase();

    return modules
      .map((module, index) => ({ ...module, originalIndex: index }))
      .filter((module) => level === "All" || module.level === level)
      .map((module) => ({
        ...module,
        lessons: module.lessons.filter((lesson) => {
          const text = [
            lesson.title,
            lesson.purpose,
            ...lesson.topics,
            module.title,
            module.description,
          ]
            .join(" ")
            .toLowerCase();

          return !query || text.includes(query);
        }),
      }))
      .filter((module) => module.lessons.length > 0);
  }, [search, level]);

  const allLessons = modules.flatMap((module, moduleIndex) =>
    module.lessons.map((lesson, lessonIndex) => ({
      id: `${moduleIndex}-${lessonIndex}`,
      module: module.title,
      lesson: lesson.title,
    })),
  );

  const progress = Math.round(
    (completed.length / allLessons.length) * 100,
  );

  function toggleModule(index: number) {
    setExpanded((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  function toggleLesson(id: string) {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
          <p className="mb-4 inline-flex rounded-full border border-blue-300/30 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
            DevMavox · DevOps Learning Roadmap
          </p>

          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Kubernetes Learning Roadmap
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
            A structured learning path from Kubernetes fundamentals to
            advanced architecture, cloud platforms, security, reliability
            and production operations. Learn what each topic means, why it
            matters and how it connects to the next stage.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["20", "Learning modules"],
              ["5", "Learning levels"],
              ["Architecture", "Core foundation"],
              ["Production", "Final destination"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/10 p-4"
              >
                <p className="text-xl font-bold sm:text-2xl">{value}</p>
                <p className="mt-1 text-sm text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Your learning progress</h2>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-600">Topics completed</span>
              <span className="font-bold">
                {completed.length}/{allLessons.length}
              </span>
            </div>

            <div
              className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Roadmap completion"
            >
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-2 text-sm text-slate-500">
              {progress}% of roadmap sections completed
            </p>

            <button
              type="button"
              onClick={() => setCompleted([])}
              className="mt-4 text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              Reset progress
            </button>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold">Recommended learning order</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>1. Fundamentals and architecture</li>
              <li>2. kubectl, YAML and workloads</li>
              <li>3. Networking, storage and configuration</li>
              <li>4. Scheduling, security and packaging</li>
              <li>5. Observability and troubleshooting</li>
              <li>6. CI/CD, cloud and GitOps</li>
              <li>7. Production reliability and advanced design</li>
            </ol>
          </section>

          <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <h2 className="font-bold text-blue-950">Before Kubernetes</h2>
            <p className="mt-2 text-sm leading-6 text-blue-900">
              Linux commands, networking fundamentals, Git, YAML,
              Docker images and containers will make Kubernetes much
              easier to understand.
            </p>
          </section>
        </aside>

        <section className="min-w-0">
          <div className="mb-6">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Complete learning path
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              Open any module to explore its lessons, subtopics and learning
              purpose. Mark a lesson complete as you finish studying it.
            </p>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_190px]">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search Kubernetes topics..."
              aria-label="Search roadmap topics"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              aria-label="Filter by learning level"
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
            >
              {[
                "All",
                "Foundation",
                "Beginner",
                "Intermediate",
                "Advanced",
                "Production",
              ].map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All levels" : item}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {filteredModules.map((module) => {
              const index = module.originalIndex;
              const isExpanded = expanded.includes(index);

              return (
                <article
                  key={module.title}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleModule(index)}
                    aria-expanded={isExpanded}
                    className="flex w-full items-start gap-4 p-5 text-left transition hover:bg-slate-50 sm:p-6"
                  >
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-bold sm:text-lg">
                          {module.title}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${levelStyles[module.level]}`}
                        >
                          {module.level}
                        </span>
                      </span>

                      <span className="mt-2 block text-sm leading-6 text-slate-600">
                        {module.description}
                      </span>

                      <span className="mt-3 block text-xs font-medium text-slate-500">
                        {module.lessons.length} lessons · {module.duration}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className="shrink-0 text-xl text-slate-400"
                    >
                      {isExpanded ? "−" : "+"}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="space-y-4 border-t border-slate-100 p-4 sm:p-6">
                      {module.lessons.map((lesson) => {
                        const lessonIndex = modules[index].lessons.findIndex(
                          (item) => item.title === lesson.title,
                        );
                        const id = `${index}-${lessonIndex}`;
                        const isComplete = completed.includes(id);

                        return (
                          <section
                            key={lesson.title}
                            className="rounded-xl border border-slate-200 p-4 sm:p-5"
                          >
                            <label className="flex cursor-pointer items-start gap-3">
                              <input
                                type="checkbox"
                                checked={isComplete}
                                onChange={() => toggleLesson(id)}
                                className="mt-1 h-4 w-4 accent-blue-600"
                              />

                              <span className="min-w-0 flex-1">
                                <span
                                  className={`block font-bold ${
                                    isComplete
                                      ? "text-slate-400 line-through"
                                      : "text-slate-900"
                                  }`}
                                >
                                  {lesson.title}
                                </span>
                                <span className="mt-2 block text-sm leading-6 text-slate-600">
                                  {lesson.purpose}
                                </span>
                              </span>
                            </label>

                            <div className="mt-4 border-t border-slate-100 pt-4">
                              <h3 className="text-sm font-bold text-slate-700">
                                Topics to understand
                              </h3>

                              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                                {lesson.topics.map((topic) => (
                                  <li
                                    key={topic}
                                    className="flex items-start gap-2 text-sm leading-6 text-slate-600"
                                  >
                                    <span className="mt-0.5 text-blue-600">
                                      •
                                    </span>
                                    <span>{topic}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </section>
                        );
                      })}
                    </div>
                  )}
                </article>
              );
            })}

            {filteredModules.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <h3 className="font-bold">No matching topics found</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Try another search term or select a different learning level.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setLevel("All");
                  }}
                  className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
            <h2 className="text-xl font-bold">What should you know by the end?</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "Explain Kubernetes architecture and workload lifecycle.",
                "Understand networking, storage and application configuration.",
                "Understand access control and workload security.",
                "Reason about scheduling, capacity and autoscaling.",
                "Understand monitoring and systematic failure analysis.",
                "Explain GitOps, CI/CD and managed Kubernetes architecture.",
                "Understand availability, upgrades and disaster recovery.",
                "Discuss production design choices and their trade-offs.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700"
                >
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <p className="mt-6 text-sm leading-6 text-slate-500">
            Learning times are estimates, not guarantees. This roadmap covers
            major Kubernetes learning areas; the exact tools and architecture
            used in production depend on the organization, cloud provider and
            Kubernetes distribution. The completion checkboxes track progress
            in the current page session; persistent progress storage is not
            implemented here.
          </p>
        </section>
      </div>
    </main>
  );
}
