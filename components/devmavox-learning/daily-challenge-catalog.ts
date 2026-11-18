import type { FeatureCategory } from "./feature-catalog";

export const dailyChallengeCategories: FeatureCategory[] = [
  { name: "Linux", subcategories: [
    { name: "Linux Challenges", topics: ["File Operations", "Permissions", "Process Management", "Systemd Service Recovery"] },
    { name: "Linux Administration", topics: ["Disk Space Investigation", "Memory and Swap", "User and Group Management", "Package and Repository Repair"] },
    { name: "Linux Networking", topics: ["DNS Resolution", "Port and Socket Diagnostics", "SSH Troubleshooting", "Firewall Rules"] },
  ]},
  { name: "Git", subcategories: [
    { name: "Git Challenges", topics: ["Branching", "Merging", "Recovery", "Resolve Merge Conflicts"] },
    { name: "Git Collaboration", topics: ["Pull Request Workflow", "Rebase Safely", "Cherry-pick a Fix", "Tag and Release"] },
    { name: "Git Recovery", topics: ["Undo a Commit", "Recover Deleted Work", "Repair Detached HEAD", "Bisect a Regression"] },
  ]},
  { name: "Docker", subcategories: [
    { name: "Container Challenges", topics: ["Images", "Containers", "Networking", "Container Health Checks"] },
    { name: "Docker Build & Storage", topics: ["Dockerfile Optimization", "Multi-stage Builds", "Volumes and Persistence", "Image Size Reduction"] },
    { name: "Docker Operations", topics: ["Compose Stack Recovery", "Container Resource Limits", "Registry Authentication", "Container Log Analysis"] },
  ]},
  { name: "Kubernetes", subcategories: [
    { name: "Kubernetes Challenges", topics: ["Pods", "Deployments", "Services", "CrashLoopBackOff Recovery"] },
    { name: "Kubernetes Configuration", topics: ["ConfigMaps and Secrets", "Requests and Limits", "Probes and Health", "RBAC Permissions"] },
    { name: "Kubernetes Operations", topics: ["Scheduling and Taints", "Persistent Volumes", "Ingress Troubleshooting", "Rolling Updates and Rollbacks"] },
  ]},
  { name: "AWS", subcategories: [
    { name: "Cloud Challenges", topics: ["EC2", "S3", "IAM", "Networking"] },
    { name: "AWS Reliability", topics: ["Load Balancer Health", "Auto Scaling", "CloudWatch Alarms", "Backup and Restore"] },
    { name: "AWS Containers", topics: ["EKS Node Health", "ECR Image Pull", "EKS Access and RBAC", "Secure Workload Identity"] },
  ]},
  { name: "CI/CD", subcategories: [
    { name: "Pipeline Challenges", topics: ["Pipeline Design", "Build", "Deployment", "Pipeline Failure Diagnosis"] },
    { name: "Delivery Automation", topics: ["Jenkins Agent Recovery", "GitHub Actions Workflow", "Artifact Promotion", "Environment Approvals"] },
    { name: "Release Strategies", topics: ["Blue-Green Deployment", "Canary Release", "Rollback Automation", "Deployment Verification"] },
  ]},
  { name: "IaC", subcategories: [
    { name: "Automation Challenges", topics: ["Terraform", "Ansible", "State Management", "Configuration Drift"] },
    { name: "Terraform Operations", topics: ["Module Design", "Plan Review", "Import Existing Resources", "Remote State Locking"] },
    { name: "Ansible Operations", topics: ["Inventory and Groups", "Idempotent Playbooks", "Variables and Vault", "Privilege Escalation"] },
  ]},
  { name: "Monitoring", subcategories: [
    { name: "Observability Challenges", topics: ["PromQL", "Alert Rules", "Grafana Dashboards", "Missing Metrics"] },
    { name: "Metrics & Logging", topics: ["Node Exporter Diagnosis", "Log Search and Filtering", "Golden Signals", "Service Level Indicators"] },
    { name: "Alert Operations", topics: ["Alertmanager Routing", "Noise Reduction", "Threshold Tuning", "Incident Correlation"] },
  ]},
  { name: "Security", subcategories: [
    { name: "Security Challenges", topics: ["IAM", "Secrets", "Image Security", "Least Privilege Review"] },
    { name: "Pipeline Security", topics: ["Dependency Vulnerability Scan", "SAST Findings", "Container Image Scanning", "CI Secret Exposure"] },
    { name: "Cloud & Cluster Security", topics: ["Network Segmentation", "Kubernetes RBAC Audit", "TLS Certificate Expiry", "Audit Log Investigation"] },
  ]},
  { name: "GitOps & Automation", subcategories: [
    { name: "GitOps Challenges", topics: ["Argo CD Sync Failure", "Out-of-Sync Resources", "Application Health Degraded", "Git Repository Authentication"] },
    { name: "Helm Challenges", topics: ["Helm Values Override", "Template Rendering Failure", "Release Rollback", "Chart Dependency Repair"] },
    { name: "Automation Workflows", topics: ["Drift Reconciliation", "Promotion Between Environments", "Scheduled Automation", "Safe Automated Recovery"] },
  ]},
  { name: "Production", subcategories: [
    { name: "Production Challenges", topics: ["Incident Response", "Architecture", "Troubleshooting", "Root Cause Analysis"] },
    { name: "Reliability Incidents", topics: ["High CPU and Memory", "Latency and Timeouts", "Service Availability", "Database Connection Exhaustion"] },
    { name: "Recovery & Resilience", topics: ["Disaster Recovery Drill", "Capacity Planning", "Failover Validation", "Post-Incident Review"] },
  ]},
  { name: "Interview", subcategories: [
    { name: "Interview Challenges", topics: ["Technical Concepts", "Production Scenarios", "Command Line Tasks", "Explain an Architecture"] },
    { name: "Practical Interview Rounds", topics: ["Linux Troubleshooting Round", "Kubernetes Debugging Round", "CI/CD Design Round", "Cloud Security Round"] },
    { name: "Senior Engineer Scenarios", topics: ["Trade-off Decisions", "Incident Leadership", "Reliability Design", "Mentoring and Ownership"] },
  ]},
];
