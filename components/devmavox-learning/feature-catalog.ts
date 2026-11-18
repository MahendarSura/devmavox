export type FeatureTopic = string;

export type FeatureSubcategory = {
  name: string;
  topics: FeatureTopic[];
};

export type FeatureCategory = {
  name: string;
  subcategories: FeatureSubcategory[];
};

export type FeatureDefinition = {
  id: string;
  title: string;
  description: string;
  style: string;
  label: string;
  categories: FeatureCategory[];
};

export const featureCatalog: Record<string, FeatureDefinition> = {
  "yaml-config-playground": {
    "id": "yaml-config-playground",
    "title": "YAML Config Playground",
    "description": "Explore configuration types and YAML resource structures.",
    "style": "editor",
    "label": "Configuration Workbench",
    "categories": [
      {
        "name": "YAML Fundamentals",
        "subcategories": [
          {
            "name": "Core Syntax",
            "topics": [
              "Syntax and Structure",
              "Data Types",
              "Lists",
              "Objects",
              "Indentation"
            ]
          }
        ]
      },
      {
        "name": "Kubernetes Workloads",
        "subcategories": [
          {
            "name": "Workload Resources",
            "topics": [
              "Pod",
              "Deployment",
              "StatefulSet",
              "DaemonSet",
              "Job",
              "CronJob"
            ]
          }
        ]
      },
      {
        "name": "Kubernetes Networking",
        "subcategories": [
          {
            "name": "Network Resources",
            "topics": [
              "Service",
              "Ingress",
              "NetworkPolicy"
            ]
          }
        ]
      },
      {
        "name": "Kubernetes Configuration",
        "subcategories": [
          {
            "name": "Configuration and Access",
            "topics": [
              "ConfigMap",
              "Secret",
              "RBAC"
            ]
          }
        ]
      },
      {
        "name": "Kubernetes Storage",
        "subcategories": [
          {
            "name": "Storage Resources",
            "topics": [
              "PersistentVolume",
              "PersistentVolumeClaim",
              "StorageClass"
            ]
          }
        ]
      },
      {
        "name": "Kubernetes Operations",
        "subcategories": [
          {
            "name": "Runtime Configuration",
            "topics": [
              "Liveness Probe",
              "Readiness Probe",
              "Startup Probe",
              "Resource Requests and Limits",
              "HPA"
            ]
          }
        ]
      },
      {
        "name": "CI/CD Configurations",
        "subcategories": [
          {
            "name": "Pipeline Files",
            "topics": [
              "Jenkinsfile",
              "GitHub Actions Workflow",
              "GitLab CI Pipeline"
            ]
          }
        ]
      },
      {
        "name": "Container Configurations",
        "subcategories": [
          {
            "name": "Container Files",
            "topics": [
              "Docker Compose",
              "Dockerfile"
            ]
          }
        ]
      },
      {
        "name": "GitOps Configurations",
        "subcategories": [
          {
            "name": "GitOps Resources",
            "topics": [
              "Argo CD Application",
              "Helm Values"
            ]
          }
        ]
      },
      {
        "name": "Automation Configurations",
        "subcategories": [
          {
            "name": "Ansible Files",
            "topics": [
              "Ansible Playbook",
              "Ansible Inventory"
            ]
          }
        ]
      }
    ]
  },
  "incident-simulator": {
    "id": "incident-simulator",
    "title": "Incident Simulator",
    "description": "Practice realistic production incident response across infrastructure, platforms, applications and security.",
    "style": "incident",
    "label": "Incident Response Center",
    "categories": [
      { "name": "Linux Incidents", "subcategories": [
        { "name": "System Resource Incidents", "topics": ["High CPU Usage", "Memory Exhaustion", "Disk Full", "Service Down"] }
      ]},
      { "name": "Docker Incidents", "subcategories": [
        { "name": "Container Incidents", "topics": ["Container Exited", "OOMKilled", "Container Network Failure"] }
      ]},
      { "name": "Kubernetes Incidents", "subcategories": [
        { "name": "Workload Incidents", "topics": ["CrashLoopBackOff", "ImagePullBackOff", "Pending Pods", "Node NotReady"] }
      ]},
      { "name": "CI/CD Incidents", "subcategories": [
        { "name": "Pipeline Incidents", "topics": ["Jenkins Build Failure", "Agent Offline", "Deployment Failure"] }
      ]},
      { "name": "AWS Incidents", "subcategories": [
        { "name": "Cloud Infrastructure Incidents", "topics": ["EC2 Unreachable", "EKS Cluster Failure", "IAM Access Denied"] }
      ]},
      { "name": "Networking Incidents", "subcategories": [
        { "name": "Connectivity Incidents", "topics": ["DNS Failure", "Connection Timeout", "Port Unreachable"] }
      ]},
      { "name": "Application Incidents", "subcategories": [
        { "name": "Application Availability", "topics": ["HTTP 500", "HTTP 502", "HTTP 503", "Database Connectivity Failure"] }
      ]},
      { "name": "Security Incidents", "subcategories": [
        { "name": "Security Response", "topics": ["Exposed Secrets", "Unauthorized Access", "Suspicious Activity"] }
      ]},
      { "name": "Database Incidents", "subcategories": [
        { "name": "Database Availability Incidents", "topics": ["Database Connection Failure", "Database Server Down", "Too Many Connections", "Database Authentication Failure"] },
        { "name": "Database Performance Incidents", "topics": ["Slow SQL Queries", "High Database CPU", "Lock Contention", "Deadlocks"] },
        { "name": "Replication & Recovery Incidents", "topics": ["Replication Lag", "Replica Failure", "Database Corruption", "Point-in-Time Recovery Failure"] },
        { "name": "Database Capacity & Storage Incidents", "topics": ["Database Storage Full", "Connection Pool Exhaustion", "Transaction Log Full", "Backup Job Failure"] }
      ]},
      { "name": "Storage & Backup Incidents", "subcategories": [
        { "name": "Block & File Storage Incidents", "topics": ["EBS Volume Full", "EBS Attachment Failure", "EFS Mount Timeout", "Persistent Volume Unavailable"] },
        { "name": "Object Storage Incidents", "topics": ["S3 Access Denied", "S3 Upload Failure", "Object Lifecycle Misconfiguration", "Bucket Policy Blocks Application"] },
        { "name": "Backup & Restore Incidents", "topics": ["Backup Job Failed", "Snapshot Creation Failure", "Restore Validation Failure", "Backup Retention Misconfiguration"] },
        { "name": "Storage Performance & Integrity", "topics": ["High Disk Latency", "IOPS Throttling", "Filesystem Corruption", "Storage Capacity Exhaustion"] }
      ]},
      { "name": "Monitoring & Observability Incidents", "subcategories": [
        { "name": "Prometheus Incidents", "topics": ["Prometheus Target Down", "Scrape Failure", "High Cardinality", "TSDB Storage Full"] },
        { "name": "Grafana Incidents", "topics": ["Dashboard Not Loading", "Data Source Connection Failure", "Missing Metrics", "Dashboard Query Timeout"] },
        { "name": "Alerting Incidents", "topics": ["Alert Rule Evaluation Failure", "Alertmanager Notification Failure", "Duplicate Alert Storm", "Silenced Critical Alert"] },
        { "name": "Logging & Tracing Incidents", "topics": ["Log Ingestion Failure", "Elasticsearch Cluster Red", "Missing Application Logs", "Distributed Trace Gaps"] }
      ]},
      { "name": "Messaging & Integration Incidents", "subcategories": [
        { "name": "Kafka Incidents", "topics": ["Kafka Broker Unavailable", "Consumer Lag Increasing", "Under-Replicated Partitions", "Producer Publish Failure"] },
        { "name": "RabbitMQ Incidents", "topics": ["RabbitMQ Node Down", "Queue Backlog Growing", "Unacked Messages Accumulating", "Publisher Confirm Failure"] },
        { "name": "Redis Incidents", "topics": ["Redis Connection Failure", "Redis Memory Limit Reached", "Cache Eviction Storm", "Redis Replication Failure"] },
        { "name": "Event & Integration Incidents", "topics": ["Webhook Delivery Failure", "Event Processing Stalled", "Dead-Letter Queue Growth", "Message Schema Mismatch"] }
      ]}
    ]
  },
  // Keep the separator above: monitoring-playground is a sibling catalog entry.
  "monitoring-playground": {
    "id": "monitoring-playground",
    "title": "Monitoring Playground",
    "description": "Explore metrics, logs, Prometheus, Grafana and observability.",
    "style": "observability",
    "label": "Observability Console",
    "categories": [
      {
        "name": "Monitoring Fundamentals",
        "subcategories": [
          {
            "name": "Observability Signals",
            "topics": [
              "Metrics",
              "Logs",
              "Traces",
              "Observability"
            ]
          }
        ]
      },
      {
        "name": "Prometheus",
        "subcategories": [
          {
            "name": "Prometheus Platform",
            "topics": [
              "Architecture",
              "Installation",
              "Configuration"
            ]
          }
        ]
      },
      {
        "name": "Exporters",
        "subcategories": [
          {
            "name": "Metrics Collection",
            "topics": [
              "Node Exporter",
              "Blackbox Exporter",
              "Application Exporters"
            ]
          }
        ]
      },
      {
        "name": "PromQL",
        "subcategories": [
          {
            "name": "Query Language",
            "topics": [
              "Selectors",
              "Functions",
              "Aggregations",
              "Practical Queries"
            ]
          }
        ]
      },
      {
        "name": "Grafana",
        "subcategories": [
          {
            "name": "Dashboard Platform",
            "topics": [
              "Dashboards",
              "Panels",
              "Variables",
              "Data Sources"
            ]
          }
        ]
      },
      {
        "name": "Alerting",
        "subcategories": [
          {
            "name": "Alert Management",
            "topics": [
              "Alert Rules",
              "Alertmanager",
              "Notification Channels"
            ]
          }
        ]
      },
      {
        "name": "Kubernetes Monitoring",
        "subcategories": [
          {
            "name": "Cluster Visibility",
            "topics": [
              "Cluster Metrics",
              "Node Metrics",
              "Pod Metrics",
              "Container Metrics"
            ]
          }
        ]
      },
      {
        "name": "Application Monitoring",
        "subcategories": [
          {
            "name": "Application Signals",
            "topics": [
              "JVM Metrics",
              "API Metrics",
              "Response Time",
              "Error Rates"
            ]
          }
        ]
      },
      {
        "name": "Advanced Observability",
        "subcategories": [
          {
            "name": "Reliability Measurement",
            "topics": [
              "Distributed Tracing",
              "SLI",
              "SLO",
              "SLA",
              "Golden Signals"
            ]
          }
        ]
      }
    ]
  },
  "devops-knowledge-base": {
    "id": "devops-knowledge-base",
    "title": "DevOps Knowledge Base",
    "description": "Explore interconnected DevOps engineering concepts in depth.",
    "style": "knowledge",
    "label": "Engineering Knowledge Index",
    "categories": [
      {
        "name": "DevOps Foundations",
        "subcategories": [
          {
            "name": "Engineering Foundations",
            "topics": [
              "DevOps",
              "SDLC",
              "Agile",
              "DevOps Culture"
            ]
          }
        ]
      },
      {
        "name": "Operating Systems",
        "subcategories": [
          {
            "name": "Linux Internals",
            "topics": [
              "Linux Architecture",
              "Processes",
              "Filesystems"
            ]
          }
        ]
      },
      {
        "name": "Networking",
        "subcategories": [
          {
            "name": "Network Concepts",
            "topics": [
              "TCP and IP",
              "DNS",
              "HTTP",
              "TLS",
              "Load Balancing"
            ]
          }
        ]
      },
      {
        "name": "Cloud Computing",
        "subcategories": [
          {
            "name": "Cloud Platforms",
            "topics": [
              "Cloud Service Models",
              "AWS Fundamentals",
              "Azure Fundamentals",
              "GCP Fundamentals"
            ]
          }
        ]
      },
      {
        "name": "Source Control",
        "subcategories": [
          {
            "name": "Version Control",
            "topics": [
              "Git Internals",
              "GitHub",
              "Branching Strategies"
            ]
          }
        ]
      },
      {
        "name": "Containers",
        "subcategories": [
          {
            "name": "Container Engineering",
            "topics": [
              "Docker Architecture",
              "Container Runtime"
            ]
          }
        ]
      },
      {
        "name": "Orchestration",
        "subcategories": [
          {
            "name": "Container Orchestration",
            "topics": [
              "Kubernetes Architecture",
              "Helm"
            ]
          }
        ]
      },
      {
        "name": "CI/CD",
        "subcategories": [
          {
            "name": "Delivery Engineering",
            "topics": [
              "CI Pipelines",
              "Build Engineering",
              "Testing",
              "Deployment Strategies"
            ]
          }
        ]
      },
      {
        "name": "IaC and Automation",
        "subcategories": [
          {
            "name": "Infrastructure Automation",
            "topics": [
              "Terraform Internals",
              "Ansible Architecture"
            ]
          }
        ]
      },
      {
        "name": "GitOps",
        "subcategories": [
          {
            "name": "GitOps Engineering",
            "topics": [
              "GitOps Principles",
              "Argo CD Reconciliation"
            ]
          }
        ]
      },
      {
        "name": "Reliability Engineering",
        "subcategories": [
          {
            "name": "SRE Concepts",
            "topics": [
              "SRE",
              "High Availability",
              "Disaster Recovery",
              "SLI and SLO"
            ]
          }
        ]
      },
      {
        "name": "Production Engineering",
        "subcategories": [
          {
            "name": "Production Systems",
            "topics": [
              "Scaling",
              "Reliability Patterns",
              "Progressive Delivery"
            ]
          }
        ]
      }
    ]
  },
  "daily-devops-challenge": {
    "id": "daily-devops-challenge",
    "title": "Daily DevOps Challenge",
    "description": "Explore practical challenges across tools and production scenarios.",
    "style": "challenge",
    "label": "Challenge Arena",
    "categories": [
      {
        "name": "Linux",
        "subcategories": [
          {
            "name": "Linux Challenges",
            "topics": [
              "File Operations",
              "Permissions",
              "Process Management"
            ]
          }
        ]
      },
      {
        "name": "Git",
        "subcategories": [
          {
            "name": "Git Challenges",
            "topics": [
              "Branching",
              "Merging",
              "Recovery"
            ]
          }
        ]
      },
      {
        "name": "Docker",
        "subcategories": [
          {
            "name": "Container Challenges",
            "topics": [
              "Images",
              "Containers",
              "Networking"
            ]
          }
        ]
      },
      {
        "name": "Kubernetes",
        "subcategories": [
          {
            "name": "Kubernetes Challenges",
            "topics": [
              "Pods",
              "Deployments",
              "Services"
            ]
          }
        ]
      },
      {
        "name": "AWS",
        "subcategories": [
          {
            "name": "Cloud Challenges",
            "topics": [
              "EC2",
              "S3",
              "IAM",
              "Networking"
            ]
          }
        ]
      },
      {
        "name": "CI/CD",
        "subcategories": [
          {
            "name": "Pipeline Challenges",
            "topics": [
              "Pipeline Design",
              "Build",
              "Deployment"
            ]
          }
        ]
      },
      {
        "name": "IaC",
        "subcategories": [
          {
            "name": "Automation Challenges",
            "topics": [
              "Terraform",
              "Ansible"
            ]
          }
        ]
      },
      {
        "name": "Monitoring",
        "subcategories": [
          {
            "name": "Observability Challenges",
            "topics": [
              "PromQL",
              "Alert Rules"
            ]
          }
        ]
      },
      {
        "name": "Security",
        "subcategories": [
          {
            "name": "Security Challenges",
            "topics": [
              "IAM",
              "Secrets",
              "Image Security"
            ]
          }
        ]
      },
      {
        "name": "Production",
        "subcategories": [
          {
            "name": "Production Challenges",
            "topics": [
              "Incident Response",
              "Architecture",
              "Troubleshooting"
            ]
          }
        ]
      },
      {
        "name": "Interview",
        "subcategories": [
          {
            "name": "Interview Challenges",
            "topics": [
              "Technical Concepts",
              "Production Scenarios"
            ]
          }
        ]
      }
    ]
  },
  "devops-career-center": {
    "id": "devops-career-center",
    "title": "DevOps Career Center",
    "description": "Explore career paths, role expectations and job-readiness topics.",
    "style": "career",
    "label": "Career Pathways",
    "categories": [
      {
        "name": "Career Paths",
        "subcategories": [
          {
            "name": "Engineering Roles",
            "topics": [
              "DevOps Engineer",
              "Cloud Engineer",
              "SRE",
              "Platform Engineer",
              "DevSecOps Engineer"
            ]
          }
        ]
      },
      {
        "name": "Experience Levels",
        "subcategories": [
          {
            "name": "Career Stages",
            "topics": [
              "Fresher",
              "Junior Engineer",
              "Mid-Level Engineer",
              "Senior Engineer"
            ]
          }
        ]
      },
      {
        "name": "Skill Roadmaps",
        "subcategories": [
          {
            "name": "Core Skills",
            "topics": [
              "Linux",
              "Cloud",
              "Git",
              "CI/CD",
              "Kubernetes",
              "IaC"
            ]
          }
        ]
      },
      {
        "name": "Resume Preparation",
        "subcategories": [
          {
            "name": "Resume Sections",
            "topics": [
              "Resume Structure",
              "Technical Skills",
              "Projects",
              "Experience"
            ]
          }
        ]
      },
      {
        "name": "Interview Preparation",
        "subcategories": [
          {
            "name": "Interview Types",
            "topics": [
              "Technical Interviews",
              "Scenario-Based Interviews",
              "HR Interviews"
            ]
          }
        ]
      },
      {
        "name": "System Design",
        "subcategories": [
          {
            "name": "Engineering Design",
            "topics": [
              "Architecture Design",
              "Scalability",
              "Reliability"
            ]
          }
        ]
      },
      {
        "name": "Practical Projects",
        "subcategories": [
          {
            "name": "Project Levels",
            "topics": [
              "Beginner Projects",
              "Intermediate Projects",
              "Production-Style Projects"
            ]
          }
        ]
      },
      {
        "name": "Job Readiness",
        "subcategories": [
          {
            "name": "Readiness Assessment",
            "topics": [
              "Skill Gap Analysis",
              "Preparation Checklist"
            ]
          }
        ]
      }
    ]
  },
  "devops-ai-assistant": {
    "id": "devops-ai-assistant",
    "title": "DevOps AI Assistant",
    "description": "Explore assistant capabilities for learning, commands and engineering.",
    "style": "assistant",
    "label": "DevOps Assistant Workspace",
    "categories": [
      {
        "name": "Learning Assistant",
        "subcategories": [
          {
            "name": "Concept Support",
            "topics": [
              "Concept Explanation",
              "Technology Comparisons"
            ]
          }
        ]
      },
      {
        "name": "Command Assistant",
        "subcategories": [
          {
            "name": "Command Support",
            "topics": [
              "Command Explanation",
              "Command Generation"
            ]
          }
        ]
      },
      {
        "name": "Configuration Assistant",
        "subcategories": [
          {
            "name": "Configuration Support",
            "topics": [
              "YAML Assistance",
              "Dockerfile Assistance",
              "Jenkinsfile Assistance"
            ]
          }
        ]
      },
      {
        "name": "Infrastructure Assistant",
        "subcategories": [
          {
            "name": "IaC Support",
            "topics": [
              "Terraform Assistance",
              "Ansible Assistance"
            ]
          }
        ]
      },
      {
        "name": "Kubernetes Assistant",
        "subcategories": [
          {
            "name": "Kubernetes Support",
            "topics": [
              "Manifest Review",
              "Resource Explanation"
            ]
          }
        ]
      },
      {
        "name": "Troubleshooting Assistant",
        "subcategories": [
          {
            "name": "Diagnostic Support",
            "topics": [
              "Log Analysis",
              "Error Explanation",
              "RCA Suggestions"
            ]
          }
        ]
      },
      {
        "name": "Architecture Assistant",
        "subcategories": [
          {
            "name": "Design Support",
            "topics": [
              "Architecture Suggestions",
              "Component Selection"
            ]
          }
        ]
      },
      {
        "name": "Interview Assistant",
        "subcategories": [
          {
            "name": "Interview Practice",
            "topics": [
              "Mock Questions",
              "Answer Feedback"
            ]
          }
        ]
      }
    ]
  },
  "architecture-diagram-library": {
    "id": "architecture-diagram-library",
    "title": "Architecture Diagram Library",
    "description": "Explore real-world cloud, infrastructure and production architecture designs.",
    "style": "atlas",
    "label": "Architecture Atlas",
    "categories": [
      {
        "name": "Cloud Architecture",
        "subcategories": [
          {
            "name": "Cloud Providers",
            "topics": [
              "AWS Architecture",
              "Azure Architecture",
              "GCP Architecture",
              "Hybrid Cloud",
              "Multi-Cloud"
            ]
          }
        ]
      },
      {
        "name": "AWS Infrastructure",
        "subcategories": [
          {
            "name": "Core Networking",
            "topics": [
              "VPC",
              "Public and Private Subnets",
              "Route Tables",
              "Internet Gateway",
              "NAT Gateway"
            ]
          },
          {
            "name": "Compute and Traffic",
            "topics": [
              "EC2",
              "Application Load Balancer",
              "Auto Scaling",
              "S3"
            ]
          }
        ]
      },
      {
        "name": "Container Architecture",
        "subcategories": [
          {
            "name": "Container Platforms",
            "topics": [
              "Docker",
              "Docker Compose",
              "ECS",
              "EKS",
              "Kubernetes"
            ]
          }
        ]
      },
      {
        "name": "CI/CD Architecture",
        "subcategories": [
          {
            "name": "Delivery Platforms",
            "topics": [
              "Jenkins",
              "GitHub Actions",
              "GitLab CI",
              "Argo CD"
            ]
          }
        ]
      },
      {
        "name": "Infrastructure as Code",
        "subcategories": [
          {
            "name": "Automation Tools",
            "topics": [
              "Terraform",
              "Ansible",
              "CloudFormation"
            ]
          }
        ]
      },
      {
        "name": "Application Architecture",
        "subcategories": [
          {
            "name": "Application Patterns",
            "topics": [
              "Three-Tier Architecture",
              "Microservices",
              "Serverless",
              "Event-Driven Architecture"
            ]
          }
        ]
      },
      {
        "name": "Production Architecture",
        "subcategories": [
          {
            "name": "Reliability Designs",
            "topics": [
              "High Availability",
              "Disaster Recovery",
              "Multi-AZ",
              "Multi-Region"
            ]
          }
        ]
      },
      {
        "name": "Observability and Security",
        "subcategories": [
          {
            "name": "Operations Design",
            "topics": [
              "Monitoring Architecture",
              "Logging Architecture",
              "IAM Architecture",
              "Network Security"
            ]
          }
        ]
      }
    ]
  },
  "git-workflow-simulator": {
    "id": "git-workflow-simulator",
    "title": "Git Workflow Simulator",
    "description": "Explore branching, collaboration, merge and recovery workflows.",
    "style": "git",
    "label": "Git Workflow Studio",
    "categories": [
      {
        "name": "Git Basics",
        "subcategories": [
          {
            "name": "Repository Fundamentals",
            "topics": [
              "Repository",
              "Working Tree",
              "Staging Area",
              "Commits"
            ]
          }
        ]
      },
      {
        "name": "Branching",
        "subcategories": [
          {
            "name": "Branch Operations",
            "topics": [
              "Create Branch",
              "Switch Branch",
              "Rename Branch",
              "Delete Branch"
            ]
          }
        ]
      },
      {
        "name": "Collaboration",
        "subcategories": [
          {
            "name": "Remote Workflows",
            "topics": [
              "Pull",
              "Push",
              "Fetch",
              "Remote Tracking"
            ]
          }
        ]
      },
      {
        "name": "Merge Workflows",
        "subcategories": [
          {
            "name": "Merge Strategies",
            "topics": [
              "Fast-Forward Merge",
              "Three-Way Merge",
              "Merge Conflicts"
            ]
          }
        ]
      },
      {
        "name": "Rebase Workflows",
        "subcategories": [
          {
            "name": "Rebase Operations",
            "topics": [
              "Interactive Rebase",
              "Rebase vs Merge",
              "Rebase Conflicts"
            ]
          }
        ]
      },
      {
        "name": "Recovery",
        "subcategories": [
          {
            "name": "Recover Git Changes",
            "topics": [
              "Reset",
              "Revert",
              "Restore",
              "Reflog"
            ]
          }
        ]
      },
      {
        "name": "Team Workflows",
        "subcategories": [
          {
            "name": "Branching Models",
            "topics": [
              "Feature Branch Workflow",
              "Git Flow",
              "Trunk-Based Development"
            ]
          }
        ]
      },
      {
        "name": "Release Management",
        "subcategories": [
          {
            "name": "Release Operations",
            "topics": [
              "Git Tags",
              "Hotfix Workflow",
              "Release Branches"
            ]
          }
        ]
      }
    ]
  },
  "tech-version-compatibility": {
    "id": "tech-version-compatibility",
    "title": "Tech Version Compatibility",
    "description": "Explore technology versions, dependencies and upgrade planning.",
    "style": "matrix",
    "label": "Compatibility Matrix",
    "categories": [
      {
        "name": "Kubernetes Ecosystem",
        "subcategories": [
          {
            "name": "Kubernetes Components",
            "topics": [
              "Kubernetes",
              "kubectl",
              "Amazon EKS"
            ]
          }
        ]
      },
      {
        "name": "Container Ecosystem",
        "subcategories": [
          {
            "name": "Container Components",
            "topics": [
              "Docker Engine",
              "Docker Compose",
              "containerd"
            ]
          }
        ]
      },
      {
        "name": "CI/CD Ecosystem",
        "subcategories": [
          {
            "name": "Pipeline Components",
            "topics": [
              "Jenkins Core",
              "Jenkins Plugins"
            ]
          }
        ]
      },
      {
        "name": "IaC Ecosystem",
        "subcategories": [
          {
            "name": "Infrastructure Tools",
            "topics": [
              "Terraform",
              "Terraform Providers"
            ]
          }
        ]
      },
      {
        "name": "Automation",
        "subcategories": [
          {
            "name": "Automation Runtime",
            "topics": [
              "Ansible",
              "Python"
            ]
          }
        ]
      },
      {
        "name": "GitOps",
        "subcategories": [
          {
            "name": "GitOps Components",
            "topics": [
              "Argo CD",
              "Helm"
            ]
          }
        ]
      },
      {
        "name": "Monitoring",
        "subcategories": [
          {
            "name": "Monitoring Components",
            "topics": [
              "Prometheus",
              "Grafana",
              "Exporters"
            ]
          }
        ]
      },
      {
        "name": "Build Ecosystem",
        "subcategories": [
          {
            "name": "Build Tools",
            "topics": [
              "Java",
              "Maven",
              "Node.js",
              "npm"
            ]
          }
        ]
      },
      {
        "name": "Operating Systems",
        "subcategories": [
          {
            "name": "Linux Platforms",
            "topics": [
              "Linux Distributions"
            ]
          }
        ]
      },
      {
        "name": "Upgrade Planning",
        "subcategories": [
          {
            "name": "Upgrade Lifecycle",
            "topics": [
              "Breaking Changes",
              "Deprecations",
              "Upgrade Steps",
              "Rollback Planning"
            ]
          }
        ]
      }
    ]
  },
  "study-planner": {
    "id": "study-planner",
    "title": "Study Planner & Progress Tracker",
    "description": "Organize learning goals, study tasks, revision and milestones.",
    "style": "planner",
    "label": "Learning Planner",
    "categories": [
      {
        "name": "Learning Goals",
        "subcategories": [
          {
            "name": "Goal Setup",
            "topics": [
              "Career Goal",
              "Skill Goal",
              "Certification Goal"
            ]
          }
        ]
      },
      {
        "name": "Roadmaps",
        "subcategories": [
          {
            "name": "Learning Levels",
            "topics": [
              "Beginner Roadmap",
              "Intermediate Roadmap",
              "Advanced Roadmap"
            ]
          }
        ]
      },
      {
        "name": "Daily Plan",
        "subcategories": [
          {
            "name": "Daily Study Tasks",
            "topics": [
              "Topics",
              "Tasks",
              "Study Time"
            ]
          }
        ]
      },
      {
        "name": "Weekly Plan",
        "subcategories": [
          {
            "name": "Weekly Tracking",
            "topics": [
              "Weekly Targets",
              "Weekly Completion"
            ]
          }
        ]
      },
      {
        "name": "Practical Labs",
        "subcategories": [
          {
            "name": "Hands-on Practice",
            "topics": [
              "Lab Tasks",
              "Lab Status"
            ]
          }
        ]
      },
      {
        "name": "Revision",
        "subcategories": [
          {
            "name": "Revision Management",
            "topics": [
              "Revision Schedule",
              "Weak Topics"
            ]
          }
        ]
      },
      {
        "name": "Assessments",
        "subcategories": [
          {
            "name": "Knowledge Checks",
            "topics": [
              "Quizzes",
              "Performance Review"
            ]
          }
        ]
      },
      {
        "name": "Projects",
        "subcategories": [
          {
            "name": "Project Tracking",
            "topics": [
              "Project Milestones",
              "Project Completion"
            ]
          }
        ]
      },
      {
        "name": "Analytics",
        "subcategories": [
          {
            "name": "Learning Analytics",
            "topics": [
              "Progress",
              "Streaks",
              "Milestones"
            ]
          }
        ]
      }
    ]
  },
  "command-explorer": {
    "id": "command-explorer",
    "title": "Command Explorer",
    "description": "A practical DevOps command library organized by technology, operational task and command family, with safe examples and production troubleshooting workflows.",
    "style": "terminal",
    "label": "Command Terminal",
    "categories": [
      {
        "name": "Linux",
        "subcategories": [
          {
            "name": "Navigation and File Operations",
            "topics": [
              "pwd",
              "ls",
              "cd",
              "find",
              "locate",
              "tree",
              "mkdir",
              "touch",
              "cp",
              "mv",
              "rm",
              "ln",
              "readlink",
              "file",
              "stat"
            ]
          },
          {
            "name": "Text Processing and Search",
            "topics": [
              "cat",
              "less",
              "head",
              "tail",
              "grep",
              "egrep",
              "sed",
              "awk",
              "cut",
              "sort",
              "uniq",
              "wc",
              "tr",
              "xargs",
              "tee",
              "diff",
              "cmp"
            ]
          },
          {
            "name": "Permissions and Access",
            "topics": [
              "chmod",
              "chown",
              "chgrp",
              "umask",
              "getfacl",
              "setfacl",
              "namei",
              "id",
              "groups",
              "sudo"
            ]
          },
          {
            "name": "Archives and Transfers",
            "topics": [
              "tar",
              "gzip",
              "gunzip",
              "zip",
              "unzip",
              "rsync",
              "scp",
              "sftp",
              "ssh",
              "sha256sum"
            ]
          }
        ]
      },
      {
        "name": "Linux Administration",
        "subcategories": [
          {
            "name": "Processes and Services",
            "topics": [
              "ps",
              "top",
              "htop",
              "pgrep",
              "pkill",
              "kill",
              "killall",
              "nice",
              "renice",
              "systemctl",
              "service",
              "journalctl"
            ]
          },
          {
            "name": "System Resources and Storage",
            "topics": [
              "df",
              "du",
              "lsblk",
              "blkid",
              "mount",
              "umount",
              "free",
              "vmstat",
              "iostat",
              "iotop",
              "uptime",
              "nproc",
              "lscpu",
              "dmesg"
            ]
          },
          {
            "name": "Users, Packages and Scheduling",
            "topics": [
              "useradd",
              "usermod",
              "userdel",
              "passwd",
              "chage",
              "getent",
              "apt",
              "apt-cache",
              "dpkg",
              "yum",
              "dnf",
              "rpm",
              "crontab",
              "at",
              "timedatectl"
            ]
          }
        ]
      },
      {
        "name": "Networking",
        "subcategories": [
          {
            "name": "Interfaces, Routes and Sockets",
            "topics": [
              "ip addr",
              "ip link",
              "ip route",
              "ip neigh",
              "ss",
              "netstat",
              "ethtool",
              "nmcli",
              "route",
              "arp"
            ]
          },
          {
            "name": "Connectivity and Packet Diagnostics",
            "topics": [
              "ping",
              "traceroute",
              "tracepath",
              "mtr",
              "tcpdump",
              "tshark",
              "nc",
              "nmap",
              "telnet",
              "curl",
              "wget"
            ]
          },
          {
            "name": "DNS, TLS and HTTP",
            "topics": [
              "dig",
              "nslookup",
              "host",
              "resolvectl",
              "openssl s_client",
              "curl HTTP checks",
              "HTTP status diagnostics",
              "TLS certificate checks"
            ]
          }
        ]
      },
      {
        "name": "Git",
        "subcategories": [
          {
            "name": "Daily Repository Workflow",
            "topics": [
              "git clone",
              "git status",
              "git add",
              "git commit",
              "git push",
              "git pull",
              "git fetch",
              "git log",
              "git diff",
              "git show"
            ]
          },
          {
            "name": "Branches, Tags and Collaboration",
            "topics": [
              "git branch",
              "git switch",
              "git checkout",
              "git merge",
              "git rebase",
              "git tag",
              "git stash",
              "git cherry-pick",
              "git remote",
              "git worktree"
            ]
          },
          {
            "name": "Undo, Recovery and Inspection",
            "topics": [
              "git restore",
              "git reset",
              "git revert",
              "git reflog",
              "git bisect",
              "git blame",
              "git clean",
              "git fsck",
              "git reflog recovery"
            ]
          }
        ]
      },
      {
        "name": "Docker",
        "subcategories": [
          {
            "name": "Images and Containers",
            "topics": [
              "docker pull",
              "docker build",
              "docker images",
              "docker ps",
              "docker run",
              "docker create",
              "docker start",
              "docker stop",
              "docker restart",
              "docker rm",
              "docker rmi",
              "docker exec",
              "docker logs",
              "docker inspect",
              "docker stats"
            ]
          },
          {
            "name": "Networks, Volumes and Compose",
            "topics": [
              "docker network",
              "docker volume",
              "docker compose up",
              "docker compose down",
              "docker compose logs",
              "docker compose exec",
              "docker compose config",
              "docker port",
              "docker cp"
            ]
          },
          {
            "name": "Registry, Build and Troubleshooting",
            "topics": [
              "docker login",
              "docker push",
              "docker tag",
              "docker history",
              "docker system df",
              "docker system prune",
              "docker events",
              "docker save",
              "docker load"
            ]
          }
        ]
      },
      {
        "name": "Kubernetes",
        "subcategories": [
          {
            "name": "Cluster, Nodes and Namespaces",
            "topics": [
              "kubectl cluster-info",
              "kubectl get nodes",
              "kubectl get namespaces",
              "kubectl config",
              "kubectl version",
              "kubectl api-resources",
              "kubectl auth can-i"
            ]
          },
          {
            "name": "Workloads and Deployments",
            "topics": [
              "kubectl get pods",
              "kubectl get deployments",
              "kubectl apply",
              "kubectl create",
              "kubectl rollout",
              "kubectl scale",
              "kubectl autoscale",
              "kubectl set image",
              "kubectl delete"
            ]
          },
          {
            "name": "Debugging and Logs",
            "topics": [
              "kubectl describe",
              "kubectl logs",
              "kubectl exec",
              "kubectl events",
              "kubectl top",
              "kubectl debug",
              "kubectl port-forward",
              "kubectl cp"
            ]
          },
          {
            "name": "Services, Storage and Configuration",
            "topics": [
              "kubectl get services",
              "kubectl get ingress",
              "kubectl get endpoints",
              "kubectl get configmaps",
              "kubectl get secrets",
              "kubectl get pvc",
              "kubectl get pv",
              "kubectl get networkpolicies"
            ]
          }
        ]
      },
      {
        "name": "AWS CLI",
        "subcategories": [
          {
            "name": "Identity, Profiles and Access",
            "topics": [
              "aws configure",
              "aws sts get-caller-identity",
              "aws configure list",
              "AWS CLI profiles",
              "IAM users and roles CLI",
              "IAM policy inspection"
            ]
          },
          {
            "name": "Compute and Containers",
            "topics": [
              "EC2 instance commands",
              "Auto Scaling commands",
              "ELB and Target Group commands",
              "EKS cluster commands",
              "ECR repository commands",
              "ECS service commands"
            ]
          },
          {
            "name": "Storage, Database and Networking",
            "topics": [
              "S3 bucket commands",
              "EBS volume commands",
              "RDS commands",
              "VPC and subnet commands",
              "Security Group commands",
              "Route 53 commands"
            ]
          },
          {
            "name": "Logs, Monitoring and Operations",
            "topics": [
              "CloudWatch log commands",
              "CloudWatch metrics commands",
              "CloudWatch alarms commands",
              "AWS CLI query and output",
              "AWS CLI pagination and filters"
            ]
          }
        ]
      },
      {
        "name": "Terraform",
        "subcategories": [
          {
            "name": "Core Workflow and Planning",
            "topics": [
              "terraform init",
              "terraform fmt",
              "terraform validate",
              "terraform plan",
              "terraform apply",
              "terraform destroy",
              "terraform output"
            ]
          },
          {
            "name": "State, Modules and Workspaces",
            "topics": [
              "terraform state",
              "terraform import",
              "terraform workspace",
              "terraform module commands",
              "terraform providers",
              "terraform graph"
            ]
          },
          {
            "name": "Debugging and Automation",
            "topics": [
              "terraform show",
              "terraform refresh",
              "terraform console",
              "terraform force-unlock",
              "terraform -chdir",
              "Terraform logging and TRACE"
            ]
          }
        ]
      },
      {
        "name": "Ansible",
        "subcategories": [
          {
            "name": "Ad-hoc and Inventory",
            "topics": [
              "ansible",
              "ansible-inventory",
              "ansible-doc",
              "ansible-config",
              "ansible-vault"
            ]
          },
          {
            "name": "Playbooks, Roles and Collections",
            "topics": [
              "ansible-playbook",
              "ansible-galaxy",
              "ansible-pull",
              "ansible-lint",
              "ansible-navigator"
            ]
          },
          {
            "name": "Execution and Troubleshooting",
            "topics": [
              "Ansible check mode",
              "Ansible diff mode",
              "Ansible tags",
              "Ansible limit",
              "Ansible verbosity",
              "Ansible connection diagnostics"
            ]
          }
        ]
      },
      {
        "name": "Helm and Argo CD",
        "subcategories": [
          {
            "name": "Helm Chart Lifecycle",
            "topics": [
              "helm repo",
              "helm search",
              "helm show",
              "helm lint",
              "helm template",
              "helm install",
              "helm upgrade",
              "helm rollback",
              "helm history",
              "helm uninstall"
            ]
          },
          {
            "name": "Helm Debugging and Release Management",
            "topics": [
              "helm list",
              "helm status",
              "helm get values",
              "helm get manifest",
              "helm dependency",
              "helm package",
              "helm test"
            ]
          },
          {
            "name": "Argo CD Application Operations",
            "topics": [
              "argocd login",
              "argocd app list",
              "argocd app get",
              "argocd app diff",
              "argocd app sync",
              "argocd app wait",
              "argocd app history",
              "argocd app rollback",
              "argocd app terminate-op"
            ]
          }
        ]
      },
      {
        "name": "CI/CD Platforms",
        "subcategories": [
          {
            "name": "Jenkins CLI and Pipeline Operations",
            "topics": [
              "jenkins CLI",
              "jenkins build",
              "jenkins console",
              "jenkins safe-restart",
              "jenkins reload-configuration",
              "Jenkins agent diagnostics",
              "Jenkins pipeline replay"
            ]
          },
          {
            "name": "GitHub Actions and GitHub CLI",
            "topics": [
              "gh auth",
              "gh repo",
              "gh workflow",
              "gh run list",
              "gh run view",
              "gh run watch",
              "gh run rerun",
              "gh secret",
              "gh variable"
            ]
          },
          {
            "name": "GitLab CI and Runner Operations",
            "topics": [
              "glab auth",
              "glab pipeline",
              "glab job",
              "glab runner",
              "GitLab CI lint",
              "GitLab artifacts and trace"
            ]
          }
        ]
      },
      {
        "name": "Build and Artifact Tools",
        "subcategories": [
          {
            "name": "Maven and Gradle",
            "topics": [
              "mvn clean",
              "mvn compile",
              "mvn test",
              "mvn package",
              "mvn install",
              "mvn dependency:tree",
              "mvn help:effective-pom",
              "gradle tasks",
              "gradle build",
              "gradle test",
              "gradle dependencies",
              "gradle wrapper"
            ]
          },
          {
            "name": "Nexus and Artifact Repositories",
            "topics": [
              "Nexus repository inspection",
              "Nexus component upload",
              "Nexus component search",
              "Nexus cleanup tasks",
              "Nexus REST API",
              "Artifact checksum verification"
            ]
          }
        ]
      },
      {
        "name": "Monitoring and Observability",
        "subcategories": [
          {
            "name": "Prometheus and PromQL",
            "topics": [
              "promtool check config",
              "promtool check rules",
              "promtool query",
              "PromQL selectors",
              "PromQL rate and increase",
              "PromQL aggregation",
              "Prometheus targets API",
              "Prometheus TSDB commands"
            ]
          },
          {
            "name": "Grafana and Alertmanager",
            "topics": [
              "grafana-cli",
              "Grafana API dashboards",
              "Grafana data source API",
              "amtool check-config",
              "amtool alert query",
              "amtool silence add",
              "Alertmanager API"
            ]
          },
          {
            "name": "Host and Application Observability",
            "topics": [
              "journal log filtering",
              "process resource diagnostics",
              "HTTP health checks",
              "JVM diagnostics",
              "jcmd",
              "jstack",
              "jmap",
              "jstat"
            ]
          }
        ]
      },
      {
        "name": "DevSecOps and Security",
        "subcategories": [
          {
            "name": "SSH, Keys and Certificates",
            "topics": [
              "ssh-keygen",
              "ssh-add",
              "ssh-agent",
              "ssh-keyscan",
              "ssh config checks",
              "openssl x509",
              "openssl s_client",
              "openssl req",
              "certbot"
            ]
          },
          {
            "name": "Image, Dependency and IaC Scanning",
            "topics": [
              "trivy image",
              "trivy fs",
              "trivy config",
              "grype",
              "syft",
              "checkov",
              "tfsec",
              "snyk CLI"
            ]
          },
          {
            "name": "Code Quality and Secret Detection",
            "topics": [
              "sonar-scanner",
              "gitleaks",
              "git-secrets",
              "semgrep",
              "cosign verify",
              "cosign sign"
            ]
          }
        ]
      },
      {
        "name": "Databases and Caching",
        "subcategories": [
          {
            "name": "MySQL and PostgreSQL",
            "topics": [
              "mysql client",
              "mysqldump",
              "mysqladmin",
              "psql",
              "pg_dump",
              "pg_restore",
              "pg_isready",
              "PostgreSQL activity queries"
            ]
          },
          {
            "name": "Redis and Database Diagnostics",
            "topics": [
              "redis-cli ping",
              "redis-cli info",
              "redis-cli monitor",
              "redis-cli scan",
              "Redis memory diagnostics",
              "Database connection checks",
              "Database slow query checks"
            ]
          }
        ]
      },
      {
        "name": "Scripting and Automation",
        "subcategories": [
          {
            "name": "Bash and Shell Utilities",
            "topics": [
              "bash",
              "sh",
              "bash -x",
              "set -euo pipefail",
              "source",
              "export",
              "env",
              "printenv",
              "read",
              "getopts",
              "trap",
              "timeout"
            ]
          },
          {
            "name": "PowerShell for DevOps",
            "topics": [
              "Get-Process",
              "Get-Service",
              "Get-ChildItem",
              "Get-Content",
              "Select-String",
              "Test-NetConnection",
              "Invoke-WebRequest",
              "Invoke-RestMethod",
              "Get-Command",
              "Get-Help"
            ]
          },
          {
            "name": "Python and JSON/YAML Utilities",
            "topics": [
              "python -m",
              "pip",
              "venv",
              "jq",
              "yq",
              "yq eval",
              "json.tool",
              "YAML validation commands"
            ]
          }
        ]
      },
      {
        "name": "Java and Tomcat",
        "subcategories": [
          {
            "name": "Java Runtime and Diagnostics",
            "topics": [
              "java -version",
              "javac",
              "jar",
              "jps",
              "jcmd",
              "jstack",
              "jmap",
              "jstat",
              "jinfo"
            ]
          },
          {
            "name": "Tomcat Service and Deployment",
            "topics": [
              "catalina.sh",
              "startup.sh",
              "shutdown.sh",
              "version.sh",
              "Tomcat service status",
              "Tomcat logs",
              "Tomcat thread dump",
              "WAR deployment checks"
            ]
          }
        ]
      },
      {
        "name": "Container Runtime and Platform Tools",
        "subcategories": [
          {
            "name": "containerd and CRI",
            "topics": [
              "crictl ps",
              "crictl pods",
              "crictl images",
              "crictl logs",
              "crictl inspect",
              "ctr containers",
              "ctr images",
              "ctr tasks"
            ]
          },
          {
            "name": "Kubernetes Node and Bootstrap Tools",
            "topics": [
              "kubeadm init",
              "kubeadm join",
              "kubeadm token",
              "kubeadm certs",
              "kubelet status",
              "kubelet logs",
              "CNI diagnostics"
            ]
          }
        ]
      }
    ]
  },
  "portfolio-builder": {
    "id": "portfolio-builder",
    "title": "Portfolio Builder",
    "description": "Organize professional skills, projects and portfolio evidence.",
    "style": "portfolio",
    "label": "Portfolio Studio",
    "categories": [
      {
        "name": "Profile",
        "subcategories": [
          {
            "name": "Professional Introduction",
            "topics": [
              "Professional Summary",
              "Career Objective"
            ]
          }
        ]
      },
      {
        "name": "Skills",
        "subcategories": [
          {
            "name": "Technical Skills",
            "topics": [
              "Cloud Skills",
              "DevOps Skills",
              "Programming Skills",
              "Automation Skills"
            ]
          }
        ]
      },
      {
        "name": "Projects",
        "subcategories": [
          {
            "name": "Project Presentation",
            "topics": [
              "Project Overview",
              "Architecture",
              "Responsibilities"
            ]
          }
        ]
      },
      {
        "name": "Project Evidence",
        "subcategories": [
          {
            "name": "Proof of Work",
            "topics": [
              "GitHub Repositories",
              "Screenshots",
              "Architecture Diagrams",
              "Documentation"
            ]
          }
        ]
      },
      {
        "name": "Achievements",
        "subcategories": [
          {
            "name": "Professional Achievements",
            "topics": [
              "Certifications",
              "Open Source Contributions"
            ]
          }
        ]
      },
      {
        "name": "Case Studies",
        "subcategories": [
          {
            "name": "Project Case Studies",
            "topics": [
              "Problem Statement",
              "Solution",
              "Results and Impact"
            ]
          }
        ]
      },
      {
        "name": "Resume",
        "subcategories": [
          {
            "name": "Resume Preparation",
            "topics": [
              "Resume Structure",
              "Skills Section",
              "Experience Section"
            ]
          }
        ]
      },
      {
        "name": "Portfolio Output",
        "subcategories": [
          {
            "name": "Portfolio Publishing",
            "topics": [
              "Portfolio Preview",
              "Export Portfolio",
              "Share Portfolio"
            ]
          }
        ]
      }
    ]
  },
  "devsecops-security-lab": {
    "id": "devsecops-security-lab",
    "title": "DevSecOps Security Lab",
    "description": "Explore secure engineering practices across the delivery lifecycle.",
    "style": "security",
    "label": "Security Control Center",
    "categories": [
      {
        "name": "Security Foundations",
        "subcategories": [
          {
            "name": "Core Principles",
            "topics": [
              "CIA Triad",
              "Threat Modeling",
              "Risk Assessment"
            ]
          }
        ]
      },
      {
        "name": "Source Code Security",
        "subcategories": [
          {
            "name": "Repository Protection",
            "topics": [
              "Secure Git",
              "Branch Protection",
              "Code Review"
            ]
          }
        ]
      },
      {
        "name": "Secrets Security",
        "subcategories": [
          {
            "name": "Credential Protection",
            "topics": [
              "Secrets Management",
              "Token Protection"
            ]
          }
        ]
      },
      {
        "name": "Application Security",
        "subcategories": [
          {
            "name": "Application Testing",
            "topics": [
              "SAST",
              "DAST",
              "API Security"
            ]
          }
        ]
      },
      {
        "name": "Dependency Security",
        "subcategories": [
          {
            "name": "Software Dependencies",
            "topics": [
              "Software Composition Analysis",
              "Vulnerability Management"
            ]
          }
        ]
      },
      {
        "name": "Container Security",
        "subcategories": [
          {
            "name": "Image Protection",
            "topics": [
              "Image Scanning",
              "Dockerfile Security"
            ]
          }
        ]
      },
      {
        "name": "Kubernetes Security",
        "subcategories": [
          {
            "name": "Cluster Protection",
            "topics": [
              "RBAC",
              "Service Accounts",
              "Network Policies"
            ]
          }
        ]
      },
      {
        "name": "Cloud Security",
        "subcategories": [
          {
            "name": "Cloud Access Controls",
            "topics": [
              "IAM",
              "Least Privilege",
              "Security Groups"
            ]
          }
        ]
      },
      {
        "name": "IaC Security",
        "subcategories": [
          {
            "name": "Infrastructure Checks",
            "topics": [
              "Terraform Scanning",
              "Infrastructure Misconfiguration"
            ]
          }
        ]
      },
      {
        "name": "Pipeline Security",
        "subcategories": [
          {
            "name": "CI/CD Protection",
            "topics": [
              "Pipeline Permissions",
              "Secure Runners"
            ]
          }
        ]
      },
      {
        "name": "Supply Chain",
        "subcategories": [
          {
            "name": "Artifact Integrity",
            "topics": [
              "SBOM",
              "Image Signing",
              "Provenance"
            ]
          }
        ]
      },
      {
        "name": "Runtime Security",
        "subcategories": [
          {
            "name": "Runtime Protection",
            "topics": [
              "Threat Detection",
              "Audit Logs"
            ]
          }
        ]
      },
      {
        "name": "Compliance",
        "subcategories": [
          {
            "name": "Governance and Evidence",
            "topics": [
              "Security Audits",
              "Evidence Collection",
              "Security Policies"
            ]
          }
        ]
      }
    ]
  },
  "cloud-cost-lab": {
    "id": "cloud-cost-lab",
    "title": "Cloud Cost Lab",
    "description": "Explore cloud billing, cost drivers and FinOps optimization.",
    "style": "finance",
    "label": "FinOps Workspace",
    "categories": [
      {
        "name": "Cloud Billing",
        "subcategories": [
          {
            "name": "Billing Fundamentals",
            "topics": [
              "Cloud Billing Models",
              "Pricing Factors",
              "Cost Allocation"
            ]
          }
        ]
      },
      {
        "name": "Compute Costs",
        "subcategories": [
          {
            "name": "Compute Services",
            "topics": [
              "EC2 Pricing",
              "Instance Families",
              "Auto Scaling Costs"
            ]
          }
        ]
      },
      {
        "name": "Storage Costs",
        "subcategories": [
          {
            "name": "Storage Services",
            "topics": [
              "EBS Costs",
              "S3 Storage Classes",
              "Snapshot Costs",
              "Lifecycle Policies"
            ]
          }
        ]
      },
      {
        "name": "Networking Costs",
        "subcategories": [
          {
            "name": "Network Services",
            "topics": [
              "NAT Gateway Costs",
              "Load Balancer Costs",
              "Data Transfer Costs"
            ]
          }
        ]
      },
      {
        "name": "Container Costs",
        "subcategories": [
          {
            "name": "Container Platforms",
            "topics": [
              "EKS Costs",
              "ECS Costs",
              "Kubernetes Resource Costs"
            ]
          }
        ]
      },
      {
        "name": "Database Costs",
        "subcategories": [
          {
            "name": "Database Services",
            "topics": [
              "RDS Costs",
              "DynamoDB Costs",
              "Database Backup Costs"
            ]
          }
        ]
      },
      {
        "name": "Cost Optimization",
        "subcategories": [
          {
            "name": "Optimization Methods",
            "topics": [
              "Right-Sizing",
              "Spot Instances",
              "Reserved Instances",
              "Savings Plans"
            ]
          }
        ]
      },
      {
        "name": "Cost Governance",
        "subcategories": [
          {
            "name": "FinOps Controls",
            "topics": [
              "Budgets and Alerts",
              "Cost Explorer",
              "Cost Allocation Tags",
              "FinOps Practices"
            ]
          }
        ]
      }
    ]
  }
};
