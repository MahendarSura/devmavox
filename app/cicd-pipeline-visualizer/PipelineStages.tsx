"use client";

import { useState } from "react";

type Stage = {
  title: string;
  description: string;
  why: string;
  workflow: string[];
  inputs: string[];
  outputs: string[];
  practical: string[];
  failures: string[];
  tools: string[];
};

const stages: Stage[] = [
  {
    title: "Developer Code",
    description: "Developers create and maintain application source code.",
    why: "The pipeline starts with application code. Developers implement business requirements, fix defects, and prepare changes for integration.",
    workflow: [
      "Understand the business requirement.",
      "Create or update application source files.",
      "Implement application logic.",
      "Configure dependencies and environment settings.",
      "Run the application locally.",
      "Perform initial code validation."
    ],
    inputs: ["Business requirements", "Application source code", "Dependencies", "Configuration files"],
    outputs: ["Updated source code", "Application configuration", "Dependency definitions", "Locally validated changes"],
    practical: [
      "Create a sample Spring Boot application.",
      "Understand the src and resources directories.",
      "Create application.properties.",
      "Run the application locally.",
      "Test an application API endpoint."
    ],
    failures: [
      "Compilation errors",
      "Missing dependencies",
      "Incorrect configuration",
      "Application startup failures",
      "Hardcoded credentials"
    ],
    tools: ["VS Code", "IntelliJ IDEA", "Java", "Node.js"]
  },
  {
    title: "Git / GitHub",
    description: "Application code is version-controlled and shared with the engineering team.",
    why: "Git tracks source code changes. GitHub hosts repositories and supports branches, pull requests, code reviews, and collaboration.",
    workflow: [
      "Initialize or clone the Git repository.",
      "Create a feature branch.",
      "Review modified and untracked files.",
      "Stage application changes.",
      "Commit changes with a meaningful message.",
      "Push the feature branch to GitHub.",
      "Create a pull request.",
      "Complete code review and merge approved changes."
    ],
    inputs: ["Developer source code", "Git repository", "Feature branch", "Commit changes"],
    outputs: ["Version-controlled source code", "Remote GitHub branch", "Pull request", "Merged application changes"],
    practical: [
      "Create a GitHub repository.",
      "Configure Git locally.",
      "Create and switch branches.",
      "Commit and push changes.",
      "Create and merge a pull request.",
      "Understand merge conflicts."
    ],
    failures: [
      "Git authentication failure",
      "Push rejected",
      "Merge conflicts",
      "Incorrect branch selection",
      "Webhook not triggered after repository events"
    ],
    tools: ["Git", "GitHub", "GitHub Pull Requests"]
  },
  {
    title: "Jenkins Trigger",
    description: "A repository event starts the automated Jenkins pipeline.",
    why: "Jenkins automates build, test, validation, and delivery activities. Webhooks or polling can trigger pipelines when code changes.",
    workflow: [
      "Configure Jenkins and required plugins.",
      "Connect Jenkins to the Git repository.",
      "Configure webhook or polling triggers.",
      "Receive a repository event.",
      "Identify the branch and commit.",
      "Load the Jenkinsfile.",
      "Start the pipeline execution."
    ],
    inputs: ["GitHub repository", "Branch and commit", "Webhook event", "Jenkinsfile"],
    outputs: ["Pipeline execution", "Build number", "Commit metadata", "Pipeline logs"],
    practical: [
      "Install Jenkins.",
      "Configure GitHub credentials.",
      "Create a Pipeline job.",
      "Connect the GitHub repository.",
      "Configure a webhook.",
      "Trigger a build using a commit."
    ],
    failures: [
      "Webhook delivery failure",
      "Invalid repository URL",
      "Jenkins credentials failure",
      "Missing Jenkinsfile",
      "Incorrect branch configuration",
      "Jenkins agent unavailable"
    ],
    tools: ["Jenkins", "GitHub Webhooks", "Jenkins Plugins"]
  },
  {
    title: "Maven / Gradle Build",
    description: "The build system resolves dependencies and compiles application source code.",
    why: "Build tools convert source code into executable application artifacts and manage external dependencies consistently.",
    workflow: [
      "Read pom.xml or build.gradle.",
      "Resolve required dependencies.",
      "Compile application source code.",
      "Process application resources.",
      "Package the application.",
      "Generate a JAR or WAR artifact.",
      "Publish build reports."
    ],
    inputs: ["Source code", "pom.xml or build.gradle", "Dependency repositories", "Build configuration"],
    outputs: ["Compiled classes", "JAR or WAR artifact", "Build reports", "Dependency information"],
    practical: [
      "Understand Maven project structure.",
      "Inspect pom.xml dependencies.",
      "Run mvn clean.",
      "Run mvn compile.",
      "Run mvn package.",
      "Locate the generated artifact in target."
    ],
    failures: [
      "Dependency resolution failure",
      "Compilation errors",
      "Incorrect Java version",
      "Maven repository unavailable",
      "Gradle plugin incompatibility",
      "Packaging failure"
    ],
    tools: ["Apache Maven", "Gradle", "JDK", "Nexus Repository"]
  },
  {
    title: "Automated Tests",
    description: "Automated tests verify application functionality before release.",
    why: "Testing detects defects early. Failed mandatory tests should prevent an unsafe artifact from progressing to deployment.",
    workflow: [
      "Prepare the test environment.",
      "Execute unit tests.",
      "Execute integration tests.",
      "Validate API behavior.",
      "Collect test reports.",
      "Evaluate pass and failure counts.",
      "Stop the pipeline when required tests fail."
    ],
    inputs: ["Compiled application", "Test source code", "Test configuration", "Test data"],
    outputs: ["Test results", "Coverage reports", "Failure logs", "Validated build status"],
    practical: [
      "Create unit tests.",
      "Run tests locally.",
      "Configure Maven Surefire.",
      "Generate test reports.",
      "Introduce a controlled failing test.",
      "Verify Jenkins stops after test failure."
    ],
    failures: [
      "Unit test failure",
      "Integration test failure",
      "Flaky tests",
      "Unavailable test database",
      "Incorrect test configuration",
      "Insufficient test coverage"
    ],
    tools: ["JUnit", "TestNG", "Mockito", "Maven Surefire"]
  },
  {
    title: "SonarQube Quality Gate",
    description: "Static code analysis evaluates maintainability, reliability, and code quality.",
    why: "Quality gates help teams identify bugs, vulnerabilities, code smells, and insufficient test coverage before release.",
    workflow: [
      "Configure SonarQube server.",
      "Create or configure the project.",
      "Generate an analysis token.",
      "Run the SonarScanner analysis.",
      "Upload analysis results.",
      "Evaluate quality gate conditions.",
      "Block the pipeline if mandatory conditions fail."
    ],
    inputs: ["Source code", "SonarQube project configuration", "Analysis token", "Coverage reports"],
    outputs: ["Quality analysis", "Bug and vulnerability findings", "Code smell results", "Quality gate status"],
    practical: [
      "Start a SonarQube instance.",
      "Create a project.",
      "Configure the scanner.",
      "Run code analysis.",
      "Inspect the project dashboard.",
      "Test a failed quality gate."
    ],
    failures: [
      "SonarQube server unavailable",
      "Invalid authentication token",
      "Scanner configuration error",
      "Coverage report missing",
      "Quality gate failed",
      "Incorrect project key"
    ],
    tools: ["SonarQube", "SonarScanner", "Jenkins"]
  },
  {
    title: "Security Scanning",
    description: "Security tools inspect application dependencies, source code, and container risks.",
    why: "Security validation helps prevent vulnerable dependencies, exposed secrets, and unsafe images from reaching production.",
    workflow: [
      "Inspect source code for security issues.",
      "Scan dependencies for known vulnerabilities.",
      "Detect exposed secrets.",
      "Build or inspect the container image.",
      "Generate vulnerability reports.",
      "Evaluate configured security thresholds.",
      "Block releases that violate mandatory security policies."
    ],
    inputs: ["Source code", "Dependency manifests", "Container image", "Security policies"],
    outputs: ["Vulnerability report", "Dependency risk report", "Secret detection results", "Security gate status"],
    practical: [
      "Run a dependency vulnerability scan.",
      "Scan source code using a security tool.",
      "Inspect a Docker image.",
      "Review vulnerability severity.",
      "Fix a vulnerable dependency.",
      "Verify the security gate."
    ],
    failures: [
      "Critical vulnerability detected",
      "Secret exposed in source code",
      "Scanner database unavailable",
      "Security policy violation",
      "Unsupported image format",
      "Security report generation failure"
    ],
    tools: ["Trivy", "OWASP Dependency-Check", "SonarQube", "Snyk"]
  },
  {
    title: "Docker Build",
    description: "The validated application is packaged into a reproducible container image.",
    why: "Docker packages application code and runtime dependencies so the application behaves consistently across environments.",
    workflow: [
      "Prepare the Dockerfile.",
      "Select an appropriate base image.",
      "Copy application artifacts.",
      "Install required runtime dependencies.",
      "Configure the container startup command.",
      "Build the Docker image.",
      "Tag the image with a version.",
      "Run a local container validation."
    ],
    inputs: ["JAR or application artifact", "Dockerfile", "Base image", "Build arguments"],
    outputs: ["Docker image", "Image tag", "Container metadata", "Local validation result"],
    practical: [
      "Create a Dockerfile.",
      "Build an image using docker build.",
      "List images using docker images.",
      "Run a container.",
      "Inspect container logs.",
      "Tag the image with a release version."
    ],
    failures: [
      "Docker daemon unavailable",
      "Dockerfile syntax error",
      "Base image pull failure",
      "Missing application artifact",
      "Incorrect container port",
      "Container exits immediately"
    ],
    tools: ["Docker", "Dockerfile", "Docker Build"]
  },
  {
    title: "Amazon ECR",
    description: "The container image is stored in a private Amazon Elastic Container Registry repository.",
    why: "ECR provides a managed image registry. Kubernetes clusters can retrieve approved images from the registry during deployment.",
    workflow: [
      "Create or identify the ECR repository.",
      "Configure AWS credentials and permissions.",
      "Authenticate Docker with ECR.",
      "Tag the local image with the ECR repository URI.",
      "Push the image to ECR.",
      "Verify the uploaded image and tag.",
      "Record the immutable image digest."
    ],
    inputs: ["Docker image", "AWS account", "ECR repository", "AWS IAM permissions"],
    outputs: ["Stored container image", "Image tag", "Image digest", "Registry reference"],
    practical: [
      "Create an ECR repository.",
      "Configure AWS CLI.",
      "Authenticate Docker with ECR.",
      "Tag the image.",
      "Push the image.",
      "Verify the image in the AWS console."
    ],
    failures: [
      "AWS authentication failure",
      "ECR repository not found",
      "AccessDenied authorization error",
      "Docker login failure",
      "Image push interrupted",
      "Incorrect repository URI"
    ],
    tools: ["Amazon ECR", "AWS CLI", "Docker", "IAM"]
  },
  {
    title: "Kubernetes / EKS",
    description: "Kubernetes deploys and manages application containers across a cluster.",
    why: "Kubernetes provides scheduling, service discovery, scaling, health checks, and self-healing for containerized applications.",
    workflow: [
      "Prepare Kubernetes deployment manifests.",
      "Configure cluster access.",
      "Reference the approved ECR image.",
      "Apply the Deployment configuration.",
      "Create or update the Service.",
      "Wait for Pods to become Ready.",
      "Validate rollout status.",
      "Verify application availability."
    ],
    inputs: ["ECR image URI", "Kubernetes manifests", "EKS cluster", "Namespace and configuration"],
    outputs: ["Running Pods", "Kubernetes Deployment", "Service endpoint", "Rollout status"],
    practical: [
      "Create a Kubernetes Deployment YAML.",
      "Configure kubectl access to EKS.",
      "Deploy the application.",
      "Inspect Pods using kubectl get pods.",
      "Check logs using kubectl logs.",
      "Validate using kubectl rollout status."
    ],
    failures: [
      "ImagePullBackOff",
      "CrashLoopBackOff",
      "Insufficient cluster resources",
      "Pod scheduling failure",
      "Incorrect Service selector",
      "Worker node NotReady"
    ],
    tools: ["Kubernetes", "Amazon EKS", "kubectl", "Amazon ECR"]
  },
  {
    title: "Helm / Argo CD",
    description: "Helm manages Kubernetes application packages and Argo CD automates GitOps deployment.",
    why: "Helm standardizes Kubernetes configuration. Argo CD continuously compares the desired Git state with the actual cluster state.",
    workflow: [
      "Prepare Helm charts and values.",
      "Store deployment configuration in Git.",
      "Configure an Argo CD application.",
      "Connect Argo CD to the Git repository.",
      "Compare desired and live states.",
      "Review synchronization differences.",
      "Synchronize approved changes.",
      "Verify application health."
    ],
    inputs: ["Helm chart", "values.yaml", "Git repository", "Argo CD application configuration"],
    outputs: ["Kubernetes release", "Synchronized cluster state", "Deployment history", "Application health status"],
    practical: [
      "Create a Helm chart.",
      "Configure values.yaml.",
      "Render templates using helm template.",
      "Install or upgrade a release.",
      "Connect a Git repository to Argo CD.",
      "Perform a controlled synchronization."
    ],
    failures: [
      "Helm template rendering error",
      "Invalid values configuration",
      "Argo CD OutOfSync state",
      "Git repository authentication failure",
      "Synchronization failure",
      "Unhealthy application resources"
    ],
    tools: ["Helm", "Argo CD", "Git", "Kubernetes"]
  },
  {
    title: "Prometheus / Grafana",
    description: "Monitoring tools collect metrics and provide dashboards and alerts for production systems.",
    why: "A deployment is not complete simply because Pods are running. Teams must validate application health, resource usage, availability, and error rates.",
    workflow: [
      "Configure application metrics endpoints.",
      "Configure Prometheus scrape targets.",
      "Collect infrastructure and application metrics.",
      "Create PromQL queries.",
      "Build Grafana dashboards.",
      "Configure alerting rules.",
      "Review application health after deployment.",
      "Trigger rollback when release health criteria require it."
    ],
    inputs: ["Application metrics", "Prometheus configuration", "Cluster metrics", "Alerting thresholds"],
    outputs: ["Metrics database", "Grafana dashboards", "Alerts", "Production health evidence"],
    practical: [
      "Install Prometheus.",
      "Configure a scrape target.",
      "Verify targets are healthy.",
      "Create a Grafana data source.",
      "Build an application dashboard.",
      "Configure a high CPU alert."
    ],
    failures: [
      "Prometheus target down",
      "Metrics endpoint unavailable",
      "Incorrect scrape configuration",
      "Grafana data source failure",
      "Alert not firing",
      "Application latency increased"
    ],
    tools: ["Prometheus", "Grafana", "Alertmanager", "Kubernetes"]
  }
];

export default function PipelineStages() {
  const [active, setActive] = useState(0);
  const stage = stages[active];

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-500">
          CI/CD learning module
        </p>
        <h2 className="mt-2 text-3xl font-bold">
          Pipeline Stages
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Select a stage to explore its production workflow.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {stages.map((item, index) => (
          <button
            key={item.title}
            onClick={() => setActive(index)}
            className={`rounded-xl border p-3 text-left transition ${
              active === index
                ? "border-blue-500 bg-blue-500/10"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            <span className="text-xs text-gray-500">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mt-1 block text-sm font-semibold">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-300 p-5 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-medium text-blue-500">
            Production pipeline stage {String(active + 1).padStart(2, "0")}
          </span>
          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm">
            Stage {active + 1} of {stages.length}
          </span>
        </div>

        <h3 className="mt-3 text-2xl font-bold">{stage.title}</h3>
        <p className="mt-2 text-sm leading-7 text-gray-500">
          {stage.description}
        </p>

        <div className="mt-7">
          <h4 className="font-bold">Why this stage is required</h4>
          <p className="mt-2 text-sm leading-7 text-gray-500">
            {stage.why}
          </p>
        </div>

        <div className="mt-7">
          <h4 className="font-bold">Real production workflow</h4>
          <ol className="mt-3 space-y-3">
            {stage.workflow.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-6">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl bg-gray-500/5 p-4">
            <h4 className="font-bold">Inputs</h4>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
              {stage.inputs.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="rounded-xl bg-gray-500/5 p-4">
            <h4 className="font-bold">Outputs</h4>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
              {stage.outputs.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-7">
          <h4 className="font-bold">Practical learning</h4>
          <ol className="mt-3 space-y-2 text-sm leading-6">
            {stage.practical.map((item, index) => (
              <li key={item}>
                <span className="mr-2 font-bold text-blue-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-7 rounded-xl border border-red-500/20 p-4">
          <h4 className="font-bold text-red-500">
            Common production failures
          </h4>
          <ul className="mt-3 grid gap-2 text-sm md:grid-cols-2">
            {stage.failures.map(item => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-7">
          <h4 className="font-bold">Tools used in this stage</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {stage.tools.map(tool => (
              <span
                key={tool}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-gray-300 pt-5">
          <button
            onClick={() => setActive(value => Math.max(0, value - 1))}
            disabled={active === 0}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous Stage
          </button>

          <span className="text-sm text-gray-500">
            {active + 1} / {stages.length}
          </span>

          <button
            onClick={() => setActive(value => Math.min(stages.length - 1, value + 1))}
            disabled={active === stages.length - 1}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next Stage →
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-300 p-5">
        <h3 className="text-xl font-bold">
          Complete Developer to Production Workflow
        </h3>
        <p className="mt-2 text-sm leading-7 text-gray-500">
          Developer Code → GitHub → Jenkins → Maven / Gradle → Automated Tests
          → SonarQube → Security Scanning → Docker → Amazon ECR → Kubernetes /
          EKS → Helm / Argo CD → Prometheus / Grafana.
        </p>
        <p className="mt-3 text-sm leading-7 text-gray-500">
          This is a representative architecture. Organizations may use
          different tools. Required build, test, quality, and security gates
          must pass before dependent release stages proceed.
        </p>
      </div>
    </section>
  );
}
