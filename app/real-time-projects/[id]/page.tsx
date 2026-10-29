import Link from 'next/link';

const projectDetails: Record<string, { title: string; category: string; icon: string; description: string; content: string }> = {
  project1: {
    title: "Project 1: Cloud & Infrastructure",
    category: "Cloud & Infrastructure",
    icon: "☁️",
    description: "Explore the first hands-on cloud and DevOps project.",
    content: `# Project 1: Cloud & Infrastructure Setup\n\n## Overview\nExplore the foundational cloud components, IAM policies, networking setup, and secure infrastructure provisioning.\n\n## Architecture\n- Virtual Private Cloud (VPC)\n- Public and Private Subnets\n- Internet Gateway & NAT Gateway\n\n## Steps to Execute\n1. Initialize cloud provider configuration.\n2. Provision core networking resources.\n3. Verify connectivity and routing tables.`
  },
  project2: {
    title: "Project 2: DevOps Automation",
    category: "DevOps Automation",
    icon: "⚙️",
    description: "Practice automation, deployment, and infrastructure workflows.",
    content: `# Project 2: DevOps Automation\n\n## Overview\nAutomate repetitive operational tasks and configuration deployments using scripting and automation tools.\n\n## Key Objectives\n- Scripting routine backups\n- Setting up automated notifications\n- Streamlining environment provisioning`
  },
  project3: {
    title: "Project 3: Docker & Containers",
    category: "Docker & Containers",
    icon: "🐳",
    description: "Learn containerization and application delivery.",
    content: `# Project 3: Docker & Containers\n\n## Overview\nLearn how to containerize web applications, optimize multi-stage Dockerfiles, and manage container networks.\n\n## Best Practices\n- Use lightweight base images (Alpine)\n- Implement multi-stage builds to reduce image size\n- Secure container runtimes`
  },
  project4: {
    title: "Project 4: Kubernetes",
    category: "Kubernetes",
    icon: "☸️",
    description: "Practice Kubernetes deployment and orchestration.",
    content: `# Project 4: Kubernetes Orchestration\n\n## Overview\nDeploy, scale, and manage containerized applications using Kubernetes clusters and manifests.\n\n## Components\n- Deployments and Pods\n- Services and Ingress controllers\n- ConfigMaps and Secrets`
  },
  project5: {
    title: "Project 5: CI/CD",
    category: "CI/CD",
    icon: "🔄",
    description: "Build and understand a continuous integration pipeline.",
    content: `# Project 5: CI/CD Pipeline\n\n## Overview\nBuild automated build, test, and deployment pipelines using modern CI/CD tools.\n\n## Pipeline Stages\n1. Code Checkout\n2. Automated Testing\n3. Artifact Packaging\n4. Staging & Production Deployment`
  },
  project6: {
    title: "Project 6: Infrastructure as Code",
    category: "Infrastructure as Code",
    icon: "🏗️",
    description: "Work with cloud infrastructure and Infrastructure as Code.",
    content: `# Project 6: Infrastructure as Code (IaC)\n\n## Overview\nProvision reproducible cloud resources using Infrastructure as Code principles and state management.\n\n## Workflow\n- Write declarative configuration files\n- Run dry-run plans\n- Apply changes safely and track state`
  },
  project7: {
    title: "Project 7: GitOps",
    category: "GitOps",
    icon: "🚀",
    description: "Explore GitOps-based application delivery.",
    content: `# Project 7: GitOps Delivery\n\n## Overview\nImplement GitOps workflows where Git repositories serve as the single source of truth for declarative infrastructure and applications.\n\n## Tools Used\n- Git for version control\n- Automated sync controllers\n- Continuous reconciliation loops`
  },
  project8: {
    title: "Project 8: Monitoring",
    category: "Monitoring",
    icon: "📊",
    description: "Practice monitoring, metrics, and observability.",
    content: `# Project 8: Monitoring & Observability\n\n## Overview\nCollect system metrics, set up operational dashboards, and configure alerting rules for proactive incident response.\n\n## Key Metrics\n- CPU & Memory utilization\n- Request latency and error rates\n- Disk space and network I/O`
  },
  project9: {
    title: "Project 9: DevSecOps",
    category: "DevSecOps",
    icon: "🔐",
    description: "Explore security checks and DevSecOps workflows.",
    content: `# Project 9: DevSecOps Security\n\n## Overview\nIntegrate security checks, dependency scanning, and vulnerability assessments early into the software delivery lifecycle.\n\n## Focus Areas\n- Static Application Security Testing (SAST)\n- Container image vulnerability scans\n- Secret management and compliance`
  },
  project10: {
    title: "Project 10: Real-Time Project",
    category: "Real-Time Project",
    icon: "🎯",
    description: "Explore an end-to-end production-style DevOps project.",
    content: `# Project 10: End-to-End Real-Time DevOps Project\n\n## Overview\nCombine cloud infrastructure, containerization, orchestration, CI/CD pipelines, and monitoring into a complete production architecture.\n\n## Architecture Steps\n1. Provision AWS Cloud infrastructure using Terraform.\n2. Deploy containerized workloads onto Kubernetes.\n3. Configure automated CI/CD and monitoring alerts.`
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
