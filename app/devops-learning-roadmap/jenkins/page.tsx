
"use client";

import { useMemo, useState } from "react";

type Lesson = {
  title: string;
  purpose: string;
  topics: string[];
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
    title: "01. CI/CD and Jenkins Fundamentals",
    level: "Foundation",
    duration: "2–3 days",
    description: "Understand continuous integration, continuous delivery and Jenkins' role in software delivery.",
    lessons: [
      {
        title: "CI/CD fundamentals",
        purpose: "Understand the delivery problems automation solves.",
        topics: [
          "Software development lifecycle",
          "Continuous Integration (CI)",
          "Continuous Delivery versus Continuous Deployment",
          "Build, test, package and release stages",
          "Manual deployment versus automated delivery",
          "Feedback loops and fast failure detection",
          "CI/CD pipeline architecture",
          "Jenkins compared with GitHub Actions, GitLab CI and Azure Pipelines",
        ],
      },
      {
        title: "Introduction to Jenkins",
        purpose: "Understand Jenkins architecture, capabilities and common use cases.",
        topics: [
          "What is Jenkins?",
          "Jenkins automation server",
          "Jenkins community and plugin ecosystem",
          "Freestyle jobs versus Pipeline jobs",
          "Declarative versus Scripted Pipeline",
          "Jenkins in DevOps workflows",
          "Jenkins strengths, limitations and alternatives",
        ],
      },
    ],
  },
  {
    title: "02. Installation and Initial Configuration",
    level: "Beginner",
    duration: "2–3 days",
    description: "Understand Jenkins setup, system requirements and initial administration.",
    lessons: [
      {
        title: "Jenkins installation",
        purpose: "Understand the components required to run Jenkins.",
        topics: [
          "JDK and supported Java versions",
          "Jenkins installation on Linux",
          "Jenkins installation on Windows",
          "Jenkins using Docker",
          "Jenkins package repositories",
          "Jenkins home directory",
          "Initial administrator password",
          "Unlocking Jenkins and setup wizard",
          "Service management and startup configuration",
        ],
      },
      {
        title: "Initial configuration",
        purpose: "Understand how to configure Jenkins for a development team.",
        topics: [
          "Jenkins web interface",
          "System configuration",
          "Global tools configuration",
          "Build executors and labels",
          "Time zone and system environment",
          "Plugin installation and updates",
          "System logs and diagnostics",
          "Jenkins URL and reverse proxy considerations",
        ],
      },
    ],
  },
  {
    title: "03. Jenkins Architecture and Core Concepts",
    level: "Beginner",
    duration: "2–3 days",
    description: "Understand how Jenkins schedules work and executes builds.",
    lessons: [
      {
        title: "Controller and agents",
        purpose: "Understand the separation between orchestration and build execution.",
        topics: [
          "Jenkins controller responsibilities",
          "Build scheduling and queue management",
          "Jenkins agents and executors",
          "Built-in node considerations",
          "Inbound and SSH agent connection concepts",
          "Agent labels and workload assignment",
          "Controller versus agent responsibilities",
          "Distributed build architecture",
        ],
      },
      {
        title: "Jenkins objects and execution",
        purpose: "Understand the resources used to organize automation.",
        topics: [
          "Jobs and projects",
          "Build numbers and build history",
          "Workspaces",
          "Console output",
          "Build triggers",
          "Build parameters",
          "Artifacts and archived files",
          "Environment variables",
          "Build status and result",
        ],
      },
    ],
  },
  {
    title: "04. Source Control and Build Integration",
    level: "Beginner",
    duration: "2–3 days",
    description: "Understand how Jenkins obtains source code and starts automated builds.",
    lessons: [
      {
        title: "Git and source control",
        purpose: "Understand source-code checkout and version-controlled pipelines.",
        topics: [
          "Git repository integration",
          "Branch selection and branch discovery",
          "Credentials for private repositories",
          "Checkout and revision selection",
          "Pull request and merge request workflows",
          "Commit-based build identification",
          "Shallow clone and checkout optimization",
          "Submodules and repository access",
        ],
      },
      {
        title: "Build tools integration",
        purpose: "Understand how Jenkins invokes application build tools.",
        topics: [
          "Maven integration",
          "Gradle integration",
          "Node.js and npm builds",
          "Python build and test workflows",
          "Docker CLI and BuildKit concepts",
          "Tool versions and reproducibility",
          "Dependency caching",
          "Build environment configuration",
        ],
      },
    ],
  },
  {
    title: "05. Freestyle Jobs and Build Management",
    level: "Beginner",
    duration: "2 days",
    description: "Understand basic job configuration before moving to pipeline-as-code.",
    lessons: [
      {
        title: "Freestyle project configuration",
        purpose: "Understand traditional Jenkins job configuration.",
        topics: [
          "Source Code Management settings",
          "Build triggers",
          "Build environment configuration",
          "Build steps and shell commands",
          "Build post-actions",
          "Parameters and environment variables",
          "Workspace management",
          "Artifact archiving",
        ],
      },
      {
        title: "Build lifecycle and job organization",
        purpose: "Understand how jobs are scheduled, tracked and maintained.",
        topics: [
          "Manual and automated builds",
          "Build queue and executor availability",
          "Build history and console logs",
          "Retention and build discarding",
          "Upstream and downstream jobs",
          "Job folders and naming conventions",
          "Build result interpretation",
          "Why Freestyle jobs become difficult to maintain at scale",
        ],
      },
    ],
  },
  {
    title: "06. Jenkins Pipeline and Jenkinsfile",
    level: "Intermediate",
    duration: "4–5 days",
    description: "Learn pipeline-as-code, stages, steps and reusable delivery workflows.",
    lessons: [
      {
        title: "Pipeline fundamentals",
        purpose: "Understand how CI/CD logic is represented as code.",
        topics: [
          "What is a Jenkins Pipeline?",
          "Pipeline jobs versus Freestyle jobs",
          "Jenkinsfile purpose and structure",
          "Declarative Pipeline syntax",
          "Scripted Pipeline fundamentals",
          "pipeline, agent, stages and steps",
          "stage and post sections",
          "Pipeline execution flow",
          "Pipeline visualization",
        ],
      },
      {
        title: "Declarative Pipeline features",
        purpose: "Understand common building blocks used in production Jenkinsfiles.",
        topics: [
          "agent any, none and labeled agents",
          "stage and nested stages",
          "environment variables",
          "parameters",
          "when conditions",
          "options and timeout",
          "retry and timestamps",
          "post conditions: always, success, failure and cleanup",
          "tools and tool configuration",
          "input and approval steps",
        ],
      },
      {
        title: "Pipeline scripting and flow control",
        purpose: "Understand conditional execution and dynamic pipeline logic.",
        topics: [
          "Groovy fundamentals for Jenkins",
          "Variables and string interpolation",
          "Conditional logic and loops",
          "Parallel stages",
          "Sequential stages",
          "Error handling with try/catch concepts",
          "Return status and build results",
          "Scripted Pipeline and node blocks",
          "Pipeline syntax validation",
        ],
      },
      {
        title: "Pipeline workspace and data flow",
        purpose: "Understand how files and execution context move between stages.",
        topics: [
          "Workspace allocation",
          "stash and unstash",
          "Archive artifacts",
          "Unarchive artifacts",
          "Directory context",
          "Environment propagation",
          "Artifact naming and traceability",
          "Workspace cleanup",
        ],
      },
    ],
  },
  {
    title: "07. Webhooks and Pipeline Triggers",
    level: "Intermediate",
    duration: "2–3 days",
    description: "Understand how code changes automatically start the correct Jenkins workflow.",
    lessons: [
      {
        title: "Automated triggers",
        purpose: "Understand event-driven CI execution.",
        topics: [
          "Manual, scheduled and SCM polling triggers",
          "GitHub webhooks",
          "GitLab webhook concepts",
          "Webhook endpoints and connectivity",
          "Credential and token configuration",
          "Branch-based trigger behaviour",
          "Duplicate build prevention",
          "Webhook event troubleshooting",
        ],
      },
      {
        title: "Multibranch pipelines",
        purpose: "Understand how Jenkins discovers and builds repository branches.",
        topics: [
          "Multibranch Pipeline jobs",
          "Branch indexing",
          "Branch-specific Jenkinsfiles",
          "Pull request validation",
          "Branch discovery strategies",
          "Orphaned item management",
          "Organization folders",
          "Repository and branch permissions",
        ],
      },
    ],
  },
  {
    title: "08. Testing and Quality Gates",
    level: "Intermediate",
    duration: "3–4 days",
    description: "Understand how automated quality checks prevent defective software from reaching production.",
    lessons: [
      {
        title: "Automated testing",
        purpose: "Understand how tests fit into the pipeline lifecycle.",
        topics: [
          "Unit testing",
          "Integration testing",
          "API and end-to-end testing",
          "Test execution and exit codes",
          "JUnit report publishing",
          "Test result trends",
          "Flaky test identification",
          "Test parallelization",
          "Failure handling and retry trade-offs",
        ],
      },
      {
        title: "Code quality and security checks",
        purpose: "Understand automated code analysis and release gates.",
        topics: [
          "SonarQube integration concepts",
          "Static Application Security Testing (SAST)",
          "Software Composition Analysis (SCA)",
          "Dependency vulnerability scanning",
          "Container image scanning",
          "Quality gates and thresholds",
          "Failing builds on policy violations",
          "Generating and publishing reports",
        ],
      },
    ],
  },
  {
    title: "09. Credentials and Jenkins Security",
    level: "Advanced",
    duration: "3–4 days",
    description: "Understand safe credential handling and access control in CI/CD systems.",
    lessons: [
      {
        title: "Credentials management",
        purpose: "Understand how pipelines securely access external systems.",
        topics: [
          "Jenkins credentials store",
          "Username/password credentials",
          "Secret text and secret files",
          "SSH private key credentials",
          "Credentials binding",
          "Credential scope and folders",
          "Secret masking limitations",
          "Credential rotation",
          "Avoiding secrets in logs and Jenkinsfiles",
        ],
      },
      {
        title: "Access control and hardening",
        purpose: "Understand how to limit who can administer Jenkins and execute jobs.",
        topics: [
          "Authentication and authorization",
          "Matrix-based security concepts",
          "Role-based access control concepts",
          "Folder-level permissions",
          "Least-privilege service accounts",
          "CSRF protection and API tokens",
          "Plugin risk and updates",
          "Controller exposure and network security",
          "Auditability and administrative access",
        ],
      },
      {
        title: "Pipeline security",
        purpose: "Understand the risks of running untrusted code in automation.",
        topics: [
          "Untrusted pull request builds",
          "Credential exposure through scripts",
          "Agent isolation",
          "Trusted and untrusted pipeline libraries",
          "Script approval and sandbox concepts",
          "Shared agent risks",
          "Supply-chain security",
          "Secure artifact provenance",
        ],
      },
    ],
  },
  {
    title: "10. Agents, Distributed Builds and Scalability",
    level: "Advanced",
    duration: "3–4 days",
    description: "Understand how Jenkins scales build capacity and isolates workloads.",
    lessons: [
      {
        title: "Agent management",
        purpose: "Understand how to assign builds to suitable execution environments.",
        topics: [
          "Permanent and on-demand agents",
          "Agent labels and expressions",
          "Executor capacity",
          "SSH and inbound agent concepts",
          "Agent connection failures",
          "Tool availability on agents",
          "Workspace and filesystem permissions",
          "Agent lifecycle management",
        ],
      },
      {
        title: "Containerized and ephemeral agents",
        purpose: "Understand reproducible build environments and elastic capacity.",
        topics: [
          "Docker-based build agents",
          "Kubernetes plugin concepts",
          "Ephemeral agent provisioning",
          "Pod templates and container selection",
          "Build isolation",
          "Image versioning for build environments",
          "Resource requests and limits",
          "Agent cleanup and cost control",
        ],
      },
      {
        title: "Scaling and performance",
        purpose: "Understand how to increase throughput without destabilizing Jenkins.",
        topics: [
          "Queue time and executor utilization",
          "Controller resource sizing",
          "Build concurrency",
          "Parallel pipelines",
          "Shared agent bottlenecks",
          "Workspace and disk utilization",
          "Dependency caching",
          "Large artifact handling",
          "Build duration analysis",
        ],
      },
    ],
  },
  {
    title: "11. Artifacts, Registries and Release Management",
    level: "Intermediate",
    duration: "3 days",
    description: "Understand how built software is versioned, stored and promoted between environments.",
    lessons: [
      {
        title: "Artifact management",
        purpose: "Understand the difference between build outputs and deployable releases.",
        topics: [
          "Build artifacts and archived artifacts",
          "Nexus Repository concepts",
          "JFrog Artifactory concepts",
          "Maven and npm repositories",
          "Docker and OCI registries",
          "Artifact versioning",
          "Checksums and integrity",
          "Retention policies",
          "Artifact traceability",
        ],
      },
      {
        title: "Release promotion",
        purpose: "Understand how the same tested artifact progresses through environments.",
        topics: [
          "Build once, promote many times",
          "Development, staging and production",
          "Immutable artifact versions",
          "Release metadata",
          "Approval gates",
          "Deployment manifests and version references",
          "Release notes and traceability",
          "Rollback and previous artifact selection",
        ],
      },
    ],
  },
  {
    title: "12. Docker and Container CI/CD",
    level: "Intermediate",
    duration: "3–4 days",
    description: "Understand how Jenkins builds, verifies and distributes container images.",
    lessons: [
      {
        title: "Container image pipeline",
        purpose: "Understand the path from source code to a deployable image.",
        topics: [
          "Docker build and image tagging",
          "Dockerfile and build context",
          "BuildKit and layer caching concepts",
          "Multi-stage builds",
          "Image registries and authentication",
          "Immutable tags and image digests",
          "Image vulnerability scanning",
          "Image signing and provenance concepts",
          "Registry cleanup and retention",
        ],
      },
      {
        title: "Container build environments",
        purpose: "Understand the operational requirements of building images safely.",
        topics: [
          "Docker daemon access considerations",
          "Docker socket security risks",
          "Rootless build concepts",
          "BuildKit and alternative builders",
          "Agent permissions",
          "Build cache management",
          "Network access and dependency downloads",
          "Reproducible image builds",
        ],
      },
    ],
  },
  {
    title: "13. Deployment Automation",
    level: "Advanced",
    duration: "4–5 days",
    description: "Understand safe application deployment across servers, containers and Kubernetes.",
    lessons: [
      {
        title: "Deployment fundamentals",
        purpose: "Understand how to deploy an approved build consistently.",
        topics: [
          "Deployment stages and approvals",
          "Environment-specific configuration",
          "SSH-based deployment concepts",
          "Configuration management integration",
          "Deployment credentials and permissions",
          "Pre-deployment validation",
          "Post-deployment verification",
          "Health checks and rollback conditions",
        ],
      },
      {
        title: "Kubernetes deployment integration",
        purpose: "Understand how Jenkins can deliver workloads to Kubernetes.",
        topics: [
          "kubectl integration",
          "Kubeconfig and cluster credentials",
          "Manifest-based deployments",
          "Helm-based deployment concepts",
          "Image version updates",
          "Rollout status verification",
          "Namespace and environment separation",
          "Deployment approvals",
          "Rollback limitations and recovery",
        ],
      },
      {
        title: "Deployment strategies",
        purpose: "Understand ways to reduce risk during application releases.",
        topics: [
          "Rolling deployments",
          "Blue-green deployments",
          "Canary releases",
          "Traffic switching concepts",
          "Feature flags",
          "Smoke tests and acceptance checks",
          "Automated rollback criteria",
          "Release coordination and change management",
        ],
      },
    ],
  },
  {
    title: "14. Shared Libraries and Reusable Pipelines",
    level: "Advanced",
    duration: "2–3 days",
    description: "Understand how teams standardize pipeline logic across many repositories.",
    lessons: [
      {
        title: "Shared Library fundamentals",
        purpose: "Understand how reusable pipeline components reduce duplication.",
        topics: [
          "Jenkins Shared Libraries",
          "Global and folder-level libraries",
          "vars, src and resources directories",
          "Global variables and custom steps",
          "Library version selection",
          "Loading libraries in Jenkinsfiles",
          "Trusted library security considerations",
          "Documentation and maintainability",
        ],
      },
      {
        title: "Pipeline standardization",
        purpose: "Understand how to build common delivery patterns for engineering teams.",
        topics: [
          "Reusable build and test stages",
          "Standard security gates",
          "Centralized deployment logic",
          "Pipeline templates",
          "Versioned shared components",
          "Backward compatibility",
          "Testing shared libraries",
          "Governance and controlled adoption",
        ],
      },
    ],
  },
  {
    title: "15. Jenkins Administration and Operations",
    level: "Production",
    duration: "3–4 days",
    description: "Understand ongoing maintenance, performance and recovery of a Jenkins service.",
    lessons: [
      {
        title: "Jenkins home and configuration",
        purpose: "Understand which files and settings keep Jenkins operational.",
        topics: [
          "JENKINS_HOME structure",
          "Job and build metadata",
          "Credentials and configuration storage",
          "Plugin and tool configuration",
          "Workspace and artifact storage",
          "Configuration as code concepts",
          "Filesystem permissions",
          "Configuration change management",
        ],
      },
      {
        title: "Backup and disaster recovery",
        purpose: "Understand how to recover Jenkins configuration and critical automation.",
        topics: [
          "Backup scope and exclusions",
          "JENKINS_HOME backup strategies",
          "Credentials and secret key considerations",
          "Plugin and version compatibility",
          "Restore procedures",
          "Recovery time objective and recovery point objective",
          "Backup validation",
          "Disaster recovery documentation",
        ],
      },
      {
        title: "Monitoring and maintenance",
        purpose: "Understand how to keep Jenkins reliable and maintainable.",
        topics: [
          "System logs and metrics",
          "Queue and executor monitoring",
          "Disk space and workspace growth",
          "Build retention and cleanup",
          "Plugin update planning",
          "Java and Jenkins upgrade compatibility",
          "Controller health and resource usage",
          "Configuration drift and operational documentation",
        ],
      },
    ],
  },
  {
    title: "16. Jenkins Troubleshooting and Root Cause Analysis",
    level: "Production",
    duration: "Ongoing learning",
    description: "Learn to reason about common failures across source control, builds, agents and deployments.",
    lessons: [
      {
        title: "Pipeline and build failures",
        purpose: "Understand how to identify the failing stage and its underlying cause.",
        topics: [
          "Jenkins pipeline fails at a stage",
          "Syntax errors in Jenkinsfile",
          "Missing tools or environment variables",
          "Maven dependency resolution failures",
          "Gradle build failures",
          "Tests pass locally but fail in CI",
          "Artifact not published or missing",
          "Webhook does not trigger a build",
          "Pipeline timeout and stuck execution",
        ],
      },
      {
        title: "Agent and infrastructure failures",
        purpose: "Understand how build infrastructure problems affect delivery.",
        topics: [
          "Jenkins agent disconnected or offline",
          "Build stuck in queue",
          "No matching agent label",
          "Insufficient executors",
          "Workspace permission failures",
          "Disk space exhaustion",
          "Java version mismatch",
          "Docker daemon unavailable",
          "Network and DNS failures",
        ],
      },
      {
        title: "Credentials and deployment failures",
        purpose: "Understand failures that occur while accessing repositories or target environments.",
        topics: [
          "Credentials binding failure",
          "Expired tokens and SSH keys",
          "Repository access denied",
          "Registry authentication failure",
          "Deployment fails after successful build",
          "Kubernetes access denied",
          "TLS and certificate failures",
          "Application health check failure",
          "Rollback and failed release recovery",
        ],
      },
    ],
  },
  {
    title: "17. Jenkins Configuration as Code and Automation",
    level: "Advanced",
    duration: "2–3 days",
    description: "Understand reproducible Jenkins configuration and administrative automation.",
    lessons: [
      {
        title: "Configuration as Code",
        purpose: "Understand how Jenkins configuration can be versioned and reproduced.",
        topics: [
          "Jenkins Configuration as Code plugin concepts",
          "YAML-based configuration",
          "Managing system and security settings",
          "Tool and cloud configuration",
          "Secret references and external secret management",
          "Configuration validation",
          "Environment-specific configuration",
          "Bootstrap and reproducibility",
        ],
      },
      {
        title: "Jenkins APIs and automation",
        purpose: "Understand how external systems interact with Jenkins.",
        topics: [
          "REST API fundamentals",
          "API tokens and access permissions",
          "Job and build automation",
          "Build parameters and remote triggers",
          "Build status integration",
          "Crumb and CSRF considerations",
          "Automation auditing",
          "Safe administrative scripting",
        ],
      },
    ],
  },
  {
    title: "18. Jenkins on Cloud and Kubernetes",
    level: "Advanced",
    duration: "3–4 days",
    description: "Understand deployment choices and execution models for cloud-based Jenkins environments.",
    lessons: [
      {
        title: "Cloud-hosted Jenkins",
        purpose: "Understand infrastructure choices for running Jenkins on cloud platforms.",
        topics: [
          "Jenkins on AWS EC2",
          "Network and security group design",
          "Persistent storage for Jenkins data",
          "Load balancer and HTTPS concepts",
          "IAM roles and service identities",
          "Cloud backup and monitoring integration",
          "Availability and cost considerations",
          "Infrastructure as Code for Jenkins infrastructure",
        ],
      },
      {
        title: "Jenkins on Kubernetes",
        purpose: "Understand the trade-offs of running Jenkins in a Kubernetes environment.",
        topics: [
          "Jenkins controller deployment concepts",
          "PersistentVolumeClaims and persistent data",
          "Helm-based installation concepts",
          "Dynamic Kubernetes agents",
          "Service accounts and RBAC",
          "Secrets and external access",
          "Ingress and TLS",
          "Resource sizing and scheduling",
          "Upgrade, backup and recovery considerations",
        ],
      },
    ],
  },
  {
    title: "19. Production CI/CD Architecture and Reliability",
    level: "Production",
    duration: "Ongoing learning",
    description: "Understand the design principles behind secure, reliable and maintainable delivery platforms.",
    lessons: [
      {
        title: "Pipeline architecture",
        purpose: "Understand how to design delivery pipelines that scale across teams.",
        topics: [
          "Pipeline separation and responsibility boundaries",
          "Build once, promote many times",
          "Immutable artifacts",
          "Environment promotion and approval gates",
          "Parallel execution and stage dependencies",
          "Pipeline templates and shared libraries",
          "Deployment traceability",
          "Release rollback and recovery",
        ],
      },
      {
        title: "Reliability, security and governance",
        purpose: "Understand how production delivery platforms control risk.",
        topics: [
          "Controller and agent isolation",
          "Least-privilege credentials",
          "Plugin governance and compatibility",
          "Audit trails and change management",
          "Build reproducibility",
          "Supply-chain security",
          "Backup and restore testing",
          "Capacity planning and queue latency",
          "Operational ownership and incident response",
        ],
      },
    ],
  },
  {
    title: "20. Jenkins Interview and Career Readiness",
    level: "Production",
    duration: "Ongoing revision",
    description: "Organize the knowledge needed to explain Jenkins architecture and delivery decisions clearly.",
    lessons: [
      {
        title: "Core interview concepts",
        purpose: "Explain common Jenkins features and their practical purpose.",
        topics: [
          "Jenkins controller versus agent",
          "Freestyle job versus Pipeline",
          "Declarative versus Scripted Pipeline",
          "Jenkinsfile and pipeline stages",
          "Webhook versus polling",
          "Credentials store and credentials binding",
          "Build artifacts versus container images",
          "Shared Libraries",
          "Build parameters and environment variables",
          "Pipeline post conditions",
        ],
      },
      {
        title: "Advanced scenario-based knowledge",
        purpose: "Reason about failures and architecture instead of memorizing definitions.",
        topics: [
          "Why a Jenkins build remains queued",
          "How to investigate an offline agent",
          "How to diagnose a pipeline syntax failure",
          "How to secure pull request builds",
          "How to handle credentials safely",
          "How to design an artifact promotion workflow",
          "How to recover Jenkins after data loss",
          "How to improve slow pipelines",
          "How to deploy safely to Kubernetes",
          "How to maintain plugin and Java compatibility",
        ],
      },
      {
        title: "Career progression",
        purpose: "Connect Jenkins knowledge to common DevOps responsibilities.",
        topics: [
          "Junior DevOps Engineer: jobs, Git and basic pipelines",
          "DevOps Engineer: CI/CD, testing and deployments",
          "Senior DevOps Engineer: reusable pipelines and security",
          "Platform Engineer: shared delivery platforms and governance",
          "SRE: reliability, monitoring and incident response",
          "Cloud DevOps Engineer: cloud infrastructure and Kubernetes integration",
          "Explaining design decisions and operational trade-offs",
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

export default function JenkinsRoadmapPage() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [expanded, setExpanded] = useState<number[]>([0]);
  const [completed, setCompleted] = useState<string[]>([]);

  const allLessons = modules.flatMap((module, moduleIndex) =>
    module.lessons.map((lesson, lessonIndex) => ({
      id: `${moduleIndex}-${lessonIndex}`,
      title: lesson.title,
    })),
  );

  const filteredModules = useMemo(() => {
    const query = search.trim().toLowerCase();

    return modules
      .map((module, index) => ({ ...module, originalIndex: index }))
      .filter((module) => level === "All" || module.level === level)
      .map((module) => ({
        ...module,
        lessons: module.lessons.filter((lesson) => {
          const searchableText = [
            module.title,
            module.description,
            lesson.title,
            lesson.purpose,
            ...lesson.topics,
          ]
            .join(" ")
            .toLowerCase();

          return !query || searchableText.includes(query);
        }),
      }))
      .filter((module) => module.lessons.length > 0);
  }, [search, level]);

  const progress = Math.round((completed.length / allLessons.length) * 100);

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
            Jenkins Learning Roadmap
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
            Learn Jenkins from CI/CD fundamentals to pipeline engineering,
            automation, security, distributed builds, cloud integration and
            production delivery architecture.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["20", "Learning modules"],
              ["5", "Learning levels"],
              ["CI/CD", "Core focus"],
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
              <span className="text-slate-600">Lessons completed</span>
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
              {progress}% of roadmap lessons completed
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
              <li>1. CI/CD and Jenkins architecture</li>
              <li>2. Git, jobs and build management</li>
              <li>3. Jenkinsfile and Pipeline</li>
              <li>4. Testing and quality gates</li>
              <li>5. Credentials and distributed builds</li>
              <li>6. Artifacts and deployment automation</li>
              <li>7. Administration and cloud integration</li>
              <li>8. Production reliability and security</li>
            </ol>
          </section>

          <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <h2 className="font-bold text-blue-950">Prerequisites</h2>
            <p className="mt-2 text-sm leading-6 text-blue-900">
              Learn basic Linux commands, Git, shell scripting, networking,
              and one application build tool. Docker knowledge is important
              for container-based CI/CD workflows.
            </p>
          </section>
        </aside>

        <section className="min-w-0">
          <div className="mb-6">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Complete learning path
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              Expand a module to explore its lessons, learning purpose and
              detailed subtopics. Mark lessons complete as you study them.
            </p>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_190px]">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search Jenkins topics..."
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

                    <span aria-hidden="true" className="shrink-0 text-xl text-slate-400">
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
                                    <span className="mt-0.5 text-blue-600">•</span>
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
            <h2 className="text-xl font-bold">
              What should you understand by the end?
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "Explain CI/CD and Jenkins architecture.",
                "Understand Jenkinsfiles and reusable pipelines.",
                "Understand Git integration, triggers and automated testing.",
                "Understand artifact versioning and release promotion.",
                "Understand credentials, permissions and pipeline security.",
                "Understand distributed builds and scalable agents.",
                "Understand cloud and Kubernetes deployment integration.",
                "Reason about production reliability and build failures.",
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
            Learning durations are estimates. Jenkins capabilities and
            integrations depend on the installed Jenkins version, Java
            compatibility and plugin versions. The checklist tracks progress
            in the current page session; persistent progress storage is not
            implemented in this page.
          </p>
        </section>
      </div>
    </main>
  );
}
