import Link from 'next/link';

const projectDetails: Record<string, { title: string; category: string; icon: string; description: string; content: string }> = {
  project1: {
    title: "AWS Cloud Infrastructure Setup",
    category: "Cloud & Infrastructure",
    icon: "☁️",
    description: "Build scalable and secure cloud infrastructure using AWS services, VPC architecture, and IAM security policies.",
    content: `# Project 1: AWS Cloud Infrastructure Setup\n\n## Overview\nLearn how to provision foundational cloud components, set up secure networking, and manage IAM access controls following cloud-native best practices.\n\n## Architecture & Components\n- **Virtual Private Cloud (VPC)** with public and private subnets across multiple Availability Zones.\n- **Internet Gateway & NAT Gateways** for secure inbound and outbound traffic routing.\n- **IAM Roles & Policies** enforcing the principle of least privilege.\n\n## Step-by-Step Execution\n1. Initialize your AWS provider configurations and set up remote state storage.\n2. Provision core networking infrastructure using Terraform or AWS Console.\n3. Configure security groups, route tables, and NACLs.\n4. Verify end-to-end connectivity and test routing tables.`
  },
  project2: {
    title: "DevOps Automation & Scripting",
    category: "DevOps Automation",
    icon: "⚙️",
    description: "Automate repetitive operational workflows, server configurations, and routine deployment tasks using robust scripts.",
    content: `# Project 2: DevOps Automation & Scripting\n\n## Overview\nEliminate manual toil by building automated operational pipelines and configuration scripts for routine system maintenance.\n\n## Key Objectives\n- Writing automated backup scripts for critical system volumes.\n- Setting up webhooks and Slack/Discord notifications for system alerts.\n- Streamlining environment provisioning and dependency checks.`
  },
  project3: {
    title: "Docker & Containerization",
    category: "Docker & Containers",
    icon: "🐳",
    description: "Master application containerization, optimize multi-stage Dockerfiles, and manage container networks securely.",
    content: `# Project 3: Docker & Containerization\n\n## Overview\nPackage web applications into lightweight containers, optimize image sizes using multi-stage builds, and handle persistent volumes.\n\n## Best Practices Implemented\n- Using lightweight base images (Alpine Linux).\n- Implementing multi-stage builds to strip build-time dependencies.\n- Managing secure container networks and data volumes.`
  },
  project4: {
    title: "Kubernetes Orchestration",
    category: "Kubernetes",
    icon: "☸️",
    description: "Deploy, scale, and manage containerized applications using Kubernetes clusters, Pods, Deployments, and Services.",
    content: `# Project 4: Kubernetes Orchestration\n\n## Overview\nGain hands-on experience orchestrating microservices across a Kubernetes cluster with production-ready manifests.\n\n## Core Concepts Covered\n- Deployments, ReplicaSets, and Pod lifecycle management.\n- Cluster IP, NodePort, and LoadBalancer Services.\n- Managing configuration data via ConfigMaps and Secrets.`
  },
  project5: {
    title: "CI/CD Pipeline Engineering",
    category: "CI/CD",
    icon: "🔄",
    description: "Build automated continuous integration and continuous deployment pipelines using modern tools and testing frameworks.",
    content: `# Project 5: CI/CD Pipeline Engineering\n\n## Overview\nAutomate your software release lifecycle from code commit to staging and production environments seamlessly.\n\n## Pipeline Stages\n1. Automated Code Checkout & Linting.\n2. Running Unit and Integration Tests.\n3. Packaging Artifacts & Building Container Images.\n4. Automated Deployment to Target Environments.`
  },
  project6: {
    title: "Infrastructure as Code (IaC)",
    category: "Infrastructure as Code",
    icon: "🏗️",
    description: "Provision and manage cloud resources declaratively using Infrastructure as Code principles and state tracking.",
    content: `# Project 6: Infrastructure as Code (IaC)\n\n## Overview\nTreat infrastructure code like application code to achieve complete reproducibility and environment parity.\n\n## Workflow Implementation\n- Writing clean, modular declarative configuration files.\n- Executing dry-run plans to review infrastructure changes.\n- Managing state files securely and avoiding drift.`
  },
  project7: {
    title: "GitOps Application Delivery",
    category: "GitOps",
    icon: "🚀",
    description: "Implement GitOps workflows using Git as the single source of truth for declarative infrastructure and application deployments.",
    content: `# Project 7: GitOps Delivery\n\n## Overview\nAutomate cluster synchronization and ensure continuous reconciliation between your Git repository and target environments.\n\n## Tools & Workflow\n- Version controlling all cluster manifests in GitHub.\n- Configuring automated sync controllers to apply changes safely.\n- Tracking operational health states and rollbacks.`
  },
  project8: {
    title: "Monitoring & Observability",
    category: "Monitoring",
    icon: "📊",
    description: "Collect system metrics, set up operational dashboards, and configure alerting rules for proactive incident response.",
    content: `# Project 8: Monitoring & Observability\n\n## Overview\nEnsure high availability and rapid issue identification by setting up comprehensive observability stacks.\n\n## Key Metrics Monitored\n- CPU, Memory, and Disk utilization tracking.\n- Request latency, throughput, and error rate tracking.\n- Setting up proactive alert rules and notification channels.`
  },
  project9: {
    title: "DevSecOps & Security Scanning",
    category: "DevSecOps",
    icon: "🔐",
    description: "Integrate security checks, vulnerability assessments, and dependency scanning early into the software delivery pipeline.",
    content: `# Project 9: DevSecOps Security\n\n## Overview\nShift security to the left by embedding automated scanning and compliance checks into your daily workflows.\n\n## Focus Areas\n- Static Application Security Testing (SAST) on codebases.\n- Container image vulnerability scanning.\n- Secret management and compliance auditing.`
  },
  project10: {
    title: "End-to-End Real-Time DevOps Project",
    category: "Real-Time Project",
    icon: "🎯",
    description: "Combine cloud infrastructure, containerization, Kubernetes, CI/CD pipelines, and monitoring into a complete production architecture.",
    content: `# Project 10: End-to-End Real-Time DevOps Project\n\n## Overview\nAn all-encompassing enterprise capstone project tying together all core DevOps domains into a unified production architecture.\n\n## Implementation Architecture\n1. Provision AWS Cloud infrastructure via Terraform.\n2. Containerize the application and deploy workloads onto Kubernetes (EKS).\n3. Automate releases with a complete CI/CD pipeline and configure operational monitoring dashboards.`
  },
};

export default async function RealTimeProjectDetailPage({ params }: { params: Promise<{ id?: string }> }) {
  const resolvedParams = await params;
  const projectId = resolvedParams?.id ?? '';
  
  const project = projectDetails[projectId] || {
    title: `Project: ${projectId ? projectId.toUpperCase() : 'Unknown'}`,
    category: "Real-Time DevOps Project",
    icon: "🚀",
    description: "Detailed guide and documentation for this enterprise project.",
    content: `# ${projectId}\n\nDetailed implementation steps, configuration files, and architectural guidelines for this project are currently being updated.`
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <nav className="mb-8">
        <Link 
          href="/real-time-projects" 
          className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-bold text-cyan-400 hover:bg-slate-800 transition"
        >
          ← Back to Real-Time Projects
        </Link>
      </nav>

      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl">{project.icon}</span>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">{project.category}</span>
            <h1 className="text-3xl font-black text-white mt-1">{project.title}</h1>
          </div>
        </div>

        <p className="text-slate-300 text-base mb-8 border-b border-slate-800 pb-4">
          {project.description}
        </p>

        <div className="prose prose-invert max-w-none text-slate-300 space-y-4 leading-relaxed whitespace-pre-line bg-slate-950/60 p-6 rounded-xl border border-slate-800/80 font-mono text-sm">
          {project.content}
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return [
    { id: 'project1' },
    { id: 'project2' },
    { id: 'project3' },
    { id: 'project4' },
    { id: 'project5' },
    { id: 'project6' },
    { id: 'project7' },
    { id: 'project8' },
    { id: 'project9' },
    { id: 'project10' },
  ];
}
