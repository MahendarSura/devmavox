"use client";

import { useState } from "react";

const sections = [
  {
    id: "fundamentals",
    number: "01",
    title: "CI/CD Fundamentals",
    description: "Understand how modern engineering teams automate software integration, testing, delivery and production releases.",
    topics: [
      "What is Continuous Integration?",
      "What is Continuous Delivery?",
      "What is Continuous Deployment?",
      "CI vs CD vs Continuous Deployment",
      "Why organizations implement CI/CD",
      "Traditional deployment vs automated delivery",
      "Responsibilities of developers and DevOps engineers",
      "Real-time application delivery example"
    ],
    practical: "Understand the complete journey of a code change from a developer laptop to a production application."
  },
  {
    id: "architecture",
    number: "02",
    title: "End-to-End Production Architecture",
    description: "Explore a realistic enterprise delivery architecture using GitHub, Jenkins, Maven, SonarQube, Trivy, Docker, AWS ECR and EKS.",
    topics: [
      "Developer workstation and feature branches",
      "GitHub repository and pull requests",
      "GitHub webhook integration",
      "Jenkins controller and build agents",
      "Maven build and JUnit testing",
      "SonarQube quality analysis",
      "Trivy security scanning",
      "Docker image creation",
      "Amazon ECR image registry",
      "Amazon EKS deployment",
      "Prometheus and Grafana monitoring",
      "Complete request and artifact flow"
    ],
    practical: "Trace one application release through every system and identify the input and output of each integration."
  },
  {
    id: "pipeline-stages",
    number: "03",
    title: "CI/CD Pipeline Stages Deep Dive",
    description: "Learn every stage, why it exists, what it executes, what evidence it produces and what happens when it fails.",
    topics: [
      "Source code checkout",
      "Dependency installation",
      "Application compilation",
      "Unit and integration testing",
      "Code coverage analysis",
      "SonarQube quality gates",
      "Dependency and security scanning",
      "Docker image building",
      "Container image scanning",
      "Registry authentication and image push",
      "Kubernetes deployment",
      "Smoke and health checks",
      "Post-deployment monitoring",
      "Release verification and rollback"
    ],
    practical: "For every stage, understand purpose, commands, expected output, failure conditions and recovery."
  },
  {
    id: "jenkins-deep-dive",
    number: "04",
    title: "Jenkins Pipeline Deep Dive",
    description: "Understand Jenkins architecture and how production teams design, execute, secure and maintain pipelines.",
    topics: [
      "Jenkins architecture and controller",
      "Agents, nodes, labels and executors",
      "Freestyle jobs vs Pipeline jobs",
      "Declarative Pipeline vs Scripted Pipeline",
      "Jenkinsfile structure and syntax",
      "Stages, steps and post conditions",
      "Environment variables and parameters",
      "Credentials management",
      "Plugin management and configuration",
      "Parallel stages and conditional execution",
      "Input approvals and release gates",
      "Shared libraries",
      "Build artifacts and test reports",
      "Multibranch pipelines and webhooks",
      "Distributed and Kubernetes-based agents",
      "Jenkins backup, security and maintenance"
    ],
    practical: "Design a Jenkins pipeline that builds, tests, scans, packages and deploys an application."
  },
  {
    id: "jenkinsfile",
    number: "05",
    title: "Real-World Jenkinsfile Examples",
    description: "Study complete pipeline-as-code examples and understand how each Jenkinsfile instruction controls delivery.",
    topics: [
      "Basic declarative Jenkinsfile",
      "Maven application build pipeline",
      "JUnit test execution and report publishing",
      "SonarQube integration and quality gate",
      "Trivy dependency and image scanning",
      "Docker build and tagging",
      "AWS ECR authentication and image push",
      "EKS deployment using kubectl",
      "Environment-specific deployment",
      "Manual production approval",
      "Parallel execution",
      "Failure handling and post actions",
      "Reusable shared-library approach"
    ],
    practical: "Build a complete Jenkinsfile for a Java application and explain every stage."
  },
  {
    id: "configuration-files",
    number: "06",
    title: "Pipeline Configuration Files Library",
    description: "Understand the important files used in an application repository and deployment workflow.",
    topics: [
      "Jenkinsfile",
      "pom.xml",
      "Dockerfile",
      ".dockerignore",
      "deployment.yaml",
      "service.yaml",
      "ingress.yaml",
      "configmap.yaml",
      "secret.yaml and secure secret management",
      "hpa.yaml",
      "SonarQube project configuration",
      "Trivy scan configuration",
      "Environment configuration files",
      "Line-by-line configuration walkthroughs"
    ],
    practical: "Understand how application build configuration, container configuration and Kubernetes manifests work together."
  },
  {
    id: "interactive-simulator",
    number: "07",
    title: "Interactive Pipeline Simulator",
    description: "Practice pipeline execution visually. Learn how successful stages, failed gates and skipped stages affect a release.",
    topics: [
      "Pipeline execution overview",
      "Stage-by-stage execution",
      "Run, pause and resume simulation",
      "Select a stage to inspect",
      "Inject a failure into a stage",
      "View simulated console output",
      "Understand stage dependencies",
      "Retry and reset execution",
      "Understand pipeline success and failure",
      "Identify the first failing stage",
      "Understand downstream stage blocking",
      "Review release completion status"
    ],
    practical: "Simulate successful and failed builds and understand why production deployment must stop after a failed mandatory gate."
  },
  {
    id: "failure-scenarios",
    number: "08",
    title: "Production Failure Scenarios and Troubleshooting",
    description: "Learn how engineers investigate actual CI/CD incidents using logs, commands, evidence and controlled recovery.",
    topics: [
      "Git checkout and authentication failures",
      "Maven dependency resolution failures",
      "Compilation and unit test failures",
      "SonarQube quality gate failures",
      "Trivy vulnerability findings",
      "Docker build failures",
      "Docker daemon and disk issues",
      "ECR authentication and IAM failures",
      "ImagePullBackOff after deployment",
      "CrashLoopBackOff",
      "Readiness and liveness probe failures",
      "Kubernetes rollout timeout",
      "Ingress and service connectivity issues",
      "Smoke test failures",
      "Post-release latency and HTTP 5xx incidents"
    ],
    practical: "Follow symptom → evidence → investigation → root cause → recovery → verification → prevention."
  },
  {
    id: "deployment-strategies",
    number: "09",
    title: "Production Deployment Strategies",
    description: "Compare release strategies and understand how organizations reduce downtime and deployment risk.",
    topics: [
      "Rolling deployment",
      "Blue-green deployment",
      "Canary deployment",
      "Recreate deployment",
      "Traffic switching and routing",
      "Kubernetes rollout configuration",
      "Readiness probes and safe traffic admission",
      "Progressive delivery",
      "Automated rollback conditions",
      "Database migration compatibility",
      "Feature flags",
      "Choosing a strategy based on application requirements"
    ],
    practical: "Compare availability, infrastructure cost, rollback speed and operational complexity for each strategy."
  },
  {
    id: "environment-management",
    number: "10",
    title: "Environment and Release Management",
    description: "Understand how teams control application promotion from development to production.",
    topics: [
      "Development environment",
      "QA and testing environment",
      "Staging and pre-production",
      "Production environment",
      "Environment variables and configuration",
      "Secrets and credentials per environment",
      "Artifact promotion between environments",
      "Release versioning and tagging",
      "Approval workflows",
      "Change management",
      "Production access control",
      "Release evidence and audit trail"
    ],
    practical: "Promote the same tested image through multiple environments without rebuilding a different artifact."
  },
  {
    id: "monitoring",
    number: "11",
    title: "Monitoring and Observability",
    description: "Learn how engineers confirm application health after deployment and detect production regressions.",
    topics: [
      "Infrastructure and application monitoring",
      "Prometheus metrics collection",
      "Grafana dashboards",
      "Alertmanager notifications",
      "CPU and memory utilization",
      "Pod restarts and readiness",
      "Application latency and throughput",
      "HTTP error rates",
      "Centralized application logs",
      "Distributed tracing",
      "Service-level indicators and objectives",
      "Post-deployment health verification",
      "Release-aware monitoring"
    ],
    practical: "Build a monitoring checklist to decide whether a new release is healthy enough to continue serving traffic."
  },
  {
    id: "security",
    number: "12",
    title: "DevSecOps Security and Best Practices",
    description: "Understand how security controls are integrated into the delivery process without exposing credentials or weakening production systems.",
    topics: [
      "Secure source control and branch protection",
      "Jenkins credential security",
      "AWS IAM least privilege",
      "Kubernetes RBAC",
      "Dependency vulnerability scanning",
      "Container image scanning",
      "Infrastructure-as-Code scanning",
      "Secret detection and secure storage",
      "Software Bill of Materials",
      "Image signing and provenance",
      "TLS and network security",
      "Build agent isolation",
      "Audit logging and approval controls",
      "Security exceptions and remediation"
    ],
    practical: "Design a pipeline that blocks high-risk releases and protects credentials throughout the workflow."
  },
  {
    id: "hands-on-project",
    number: "13",
    title: "Complete Hands-On Production Project",
    description: "Bring all concepts together by building and delivering a sample application through a realistic DevOps workflow.",
    topics: [
      "Create a Spring Boot application",
      "Create application health endpoints",
      "Add unit tests",
      "Push source code to GitHub",
      "Configure Jenkins and webhook",
      "Build and test with Maven",
      "Integrate SonarQube",
      "Scan dependencies with Trivy",
      "Create a Docker image",
      "Push the image to Amazon ECR",
      "Deploy the application to Amazon EKS",
      "Configure Kubernetes Service and Ingress",
      "Configure Prometheus and Grafana",
      "Perform smoke tests",
      "Simulate an incident and recover",
      "Document the architecture and release"
    ],
    practical: "Complete a working non-production application delivery project from source code to monitored Kubernetes deployment."
  },
  {
    id: "interview-preparation",
    number: "14",
    title: "CI/CD Interview Preparation",
    description: "Prepare to explain pipeline architecture, Jenkins implementation, production incidents and release engineering decisions.",
    topics: [
      "Basic CI/CD interview questions",
      "Intermediate pipeline questions",
      "Advanced Jenkins questions",
      "Jenkinsfile coding questions",
      "Docker and registry integration questions",
      "Kubernetes deployment questions",
      "AWS ECR and EKS scenarios",
      "Production troubleshooting questions",
      "Deployment strategy comparisons",
      "Security and DevSecOps questions",
      "Real project explanation",
      "Architecture and design questions"
    ],
    practical: "Practice explaining a complete CI/CD project and defending technical decisions with real examples."
  },
  {
    id: "exercises",
    number: "15",
    title: "Hands-On Exercises and Final Assessment",
    description: "Validate your understanding with practical tasks, debugging exercises and a complete delivery assessment.",
    topics: [
      "Draw the end-to-end CI/CD architecture",
      "Write a declarative Jenkinsfile",
      "Configure build and test stages",
      "Fix a failed unit test",
      "Configure a quality gate",
      "Build and scan a Docker image",
      "Troubleshoot an ECR permission issue",
      "Deploy an image to a Kubernetes namespace",
      "Investigate a failed pod rollout",
      "Compare rolling, blue-green and canary",
      "Create a release monitoring dashboard",
      "Perform a controlled rollback",
      "Explain the security controls",
      "Complete the final production workflow assessment"
    ],
    practical: "Demonstrate a successful release, diagnose a failed release, recover safely and explain the evidence."
  }
];

function ArchitectureFlow() {
  const nodes = [
    "Developer",
    "GitHub",
    "Jenkins",
    "Maven + Tests",
    "SonarQube + Trivy",
    "Docker",
    "Amazon ECR",
    "Amazon EKS",
    "Prometheus + Grafana"
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-950 p-5">
      <div className="flex min-w-[850px] items-center gap-2">
        {nodes.map((node, index) => (
          <div key={node} className="flex flex-1 items-center gap-2">
            <div className="flex min-h-20 flex-1 items-center justify-center rounded-xl border border-cyan-500/30 bg-slate-900 p-3 text-center text-sm font-semibold text-cyan-100">
              {node}
            </div>
            {index !== nodes.length - 1 && (
              <span className="text-xl text-cyan-400">→</span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-400">
        Conceptual production delivery flow. Actual integrations and security
        boundaries depend on the organization.
      </p>
    </div>
  );
}

export default function CicdPipelineVisualizerPage() {
  const [active, setActive] = useState("fundamentals");
  const [expanded, setExpanded] = useState<string | null>("fundamentals");

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <header className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 p-7 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
            DevMavox Production Learning Lab
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
            CI/CD Pipeline Visualizer
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300">
            Learn how real engineering teams build, test, secure, package,
            deploy and monitor applications. Explore Jenkins Pipeline
            engineering, production deployment strategies, troubleshooting
            and a complete AWS EKS delivery workflow.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["15 Learning Sections", "Jenkins Deep Dive", "Interactive Simulator", "Production Workflows", "Hands-on Project"].map((item) => (
              <span key={item} className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-200">
                {item}
              </span>
            ))}
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["15", "Learning sections"],
            ["12+", "Pipeline stage concepts"],
            ["3", "Core deployment strategies"],
            ["1", "Complete hands-on project"]
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-3xl font-black text-cyan-300">{value}</p>
              <p className="mt-1 text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </section>

        <section className="mt-10">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
              Production architecture
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              Developer commit to monitored production
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              Reference architecture for a Java application delivered through
              Jenkins, Docker, Amazon ECR and Amazon EKS.
            </p>
          </div>
          <ArchitectureFlow />
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-2xl border border-slate-800 bg-slate-900 p-4 lg:sticky lg:top-5">
            <h2 className="px-2 pb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              Course navigation
            </h2>
            <nav className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActive(section.id);
                    setExpanded(section.id);
                  }}
                  className={`rounded-lg px-3 py-2 text-left text-xs transition ${
                    active === section.id
                      ? "bg-cyan-400/15 font-bold text-cyan-200"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="mr-2 text-cyan-400">{section.number}</span>
                  {section.title}
                </button>
              ))}
            </nav>
          </aside>

          <div className="space-y-4">`r`n            {sections.filter((section) => section.id === active).map((section) => (
              <section
                id={section.id}
                key={section.id}
                className="scroll-mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80"
              >
                <button
                  onClick={() => {
                    setExpanded(expanded === section.id ? null : section.id);
                    setActive(section.id);
                  }}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="rounded-xl border border-cyan-500/30 bg-cyan-400/10 px-3 py-2 text-sm font-black text-cyan-300">
                      {section.number}
                    </span>
                    <div>
                      <h2 className="text-lg font-bold text-white sm:text-xl">
                        {section.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-xl text-cyan-300">
                    {expanded === section.id ? "−" : "+"}
                  </span>
                </button>

                {expanded === section.id && (
                  <div className="border-t border-slate-800 px-5 pb-6 pt-5 sm:px-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                      Topics covered in this section
                    </h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {section.topics.map((topic, index) => (
                        <div key={topic} className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                          <span className="text-xs font-bold text-cyan-400">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm leading-6 text-slate-300">
                            {topic}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                        Practical learning outcome
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        {section.practical}
                      </p>
                    </div>
                    <p className="mt-4 text-xs text-slate-500">
                      Detailed explanations, architecture illustrations,
                      commands, configuration examples and exercises will be
                      added inside this section.
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>
        </section>

        <footer className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold text-white">
            Complete CI/CD learning roadmap
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            This page establishes all 15 learning sections and their production
            topics. The next content phase will add detailed real-world
            explanations, architecture diagrams, Jenkinsfiles, configuration
            files, commands, expected outputs, troubleshooting procedures,
            simulator behavior and deployment examples section by section.
          </p>
        </footer>

      </div>
    </main>
  );
}
