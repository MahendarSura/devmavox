export type ExpandedTopic = {
  title: string;
  overview: string;
  purpose: string;
  architecture: string;
  workflow: string[];
  example: string;
  commands: string[];
  configuration: string;
  failures: string[];
  recovery: string[];
  bestPractices: string[];
  exercise: string;
};

const syllabus: Record<number, string[]> = {
  1: [
    "Java Fundamentals", "Java Project Structure", "Object-Oriented Programming",
    "Collections and Generics", "Exception Handling", "JVM Architecture",
    "Memory Management and Garbage Collection", "Maven Project Integration",
    "Spring Boot Fundamentals", "Spring Boot Application Structure",
    "Dependency Injection", "REST API Development", "Application Properties",
    "Profiles and Environment Configuration", "Logging and Actuator",
    "Production Hands-on Lab"
  ],
  2: [
    "Git and GitHub Fundamentals", "Repository Management", "Branching Strategy",
    "Commit History", "Pull Request Lifecycle", "Code Review",
    "Branch Protection Rules", "Merge Strategies", "Merge Conflict Resolution",
    "GitHub Webhooks", "GitHub Actions Integration", "Repository Secrets",
    "Tags and Releases", "Release Approval Workflow", "Troubleshooting",
    "Production Hands-on Lab"
  ],
  3: [
    "Jenkins Fundamentals", "Jenkins Architecture", "Controller and Agents",
    "Installation and Setup", "Credentials Management", "Plugin Management",
    "Webhook Integration", "Jenkinsfile Fundamentals", "Declarative Pipeline",
    "Scripted Pipeline", "Pipeline Stages and Steps", "Parallel Execution",
    "Shared Libraries", "Artifacts and Reports", "Pipeline Security",
    "Agent Troubleshooting", "Production Hands-on Lab"
  ],
  4: [
    "Maven Fundamentals", "Maven Installation", "Project Object Model",
    "Coordinates and Packaging", "Dependency Management", "Dependency Scopes",
    "Transitive Dependencies", "Build Lifecycle", "Phases and Goals",
    "Maven Plugins", "Maven Profiles", "Repositories",
    "Spring Boot Packaging", "Surefire and Failsafe", "Build Troubleshooting",
    "Production Hands-on Lab"
  ],
  5: [
    "Testing Fundamentals", "JUnit 5 Architecture", "Test Annotations",
    "Assertions", "Test Lifecycle", "Parameterized Tests",
    "Mockito Fundamentals", "Mocking Dependencies", "Service Unit Testing",
    "Controller Testing", "Spring Boot Integration Testing",
    "Testcontainers", "Code Coverage", "Test Reports",
    "Flaky Test Troubleshooting", "Production Hands-on Lab"
  ],
  6: [
    "SonarQube Fundamentals", "SonarQube Architecture", "Installation and Setup",
    "Project Configuration", "Scanner Configuration", "Quality Profiles",
    "Quality Gates", "Bug Detection", "Vulnerability Analysis",
    "Code Smells and Maintainability", "Code Duplication",
    "Coverage Integration", "Exclusions and Inclusions",
    "Pull Request Decoration", "Jenkins Integration",
    "Troubleshooting", "Production Hands-on Lab"
  ],
  7: [
    "Trivy Fundamentals", "Trivy Installation", "Filesystem Scanning",
    "Dependency Scanning", "Container Image Scanning", "CVE Database",
    "Severity Classification", "Misconfiguration Scanning",
    "Kubernetes Configuration Scanning", "Secret Scanning",
    "SBOM Generation", "Ignore Policies", "CI Pipeline Integration",
    "Vulnerability Remediation", "Troubleshooting",
    "Production Hands-on Lab"
  ],
  8: [
    "Docker Fundamentals", "Docker Architecture", "Docker Installation",
    "Dockerfile Instructions", "Build Context and .dockerignore",
    "Image Layers and Caching", "BuildKit", "Multi-stage Builds",
    "Container Runtime", "Docker Networking", "Volumes and Storage",
    "Docker Security", "Image Tagging and Digests", "Registry Integration",
    "Troubleshooting", "Production Hands-on Lab"
  ],
  9: [
    "Amazon ECR Fundamentals", "ECR Registry Architecture",
    "Repository Creation", "AWS IAM Permissions", "Docker Authentication",
    "Image Tagging", "Image Push Workflow", "Image Pull Workflow",
    "Immutable Image Tags", "Image Digests", "Lifecycle Policies",
    "Encryption and Access Control", "Image Vulnerability Scanning",
    "Cross-account Access", "Registry Replication",
    "Troubleshooting", "Production Hands-on Lab"
  ],
  10: [
    "Kubernetes Fundamentals", "Kubernetes Architecture", "EKS Architecture",
    "Control Plane Components", "Worker Nodes", "API Server and etcd",
    "Scheduler and Kubelet", "Pods", "Deployments and ReplicaSets",
    "Services and Service Discovery", "ConfigMaps and Secrets",
    "Health Probes", "Requests and Limits", "Namespaces and RBAC",
    "Ingress and Load Balancing", "Networking and CNI",
    "Persistent Storage", "Horizontal Pod Autoscaling",
    "Rolling Updates and Rollbacks", "EKS Cluster Operations",
    "Troubleshooting", "Production Hands-on Lab"
  ],
  11: [
    "Helm Fundamentals", "Helm Architecture", "Chart Structure",
    "Chart.yaml and values.yaml", "Template Functions",
    "Template Helpers", "Chart Dependencies", "Helm Repositories",
    "Release Installation", "Upgrade and Rollback",
    "Environment-specific Values", "Argo CD Fundamentals",
    "Argo CD Architecture", "Application Resources",
    "GitOps Workflow", "Automated Sync and Self-healing",
    "Health and Sync Status", "Drift Detection",
    "RBAC and Repository Credentials", "Troubleshooting",
    "Production Hands-on Lab"
  ],
  12: [
    "Observability Fundamentals", "Metrics and Monitoring",
    "Prometheus Architecture", "Prometheus Installation",
    "Exporters", "Scrape Configuration", "Service Discovery",
    "PromQL Fundamentals", "Labels and Metric Types",
    "Recording Rules", "Alert Rules", "Alertmanager",
    "Grafana Architecture", "Data Sources",
    "Dashboard Creation", "Dashboard Variables",
    "SLI and SLO Monitoring", "Incident Alerting",
    "Troubleshooting", "Production Hands-on Lab"
  ]
};

const context: Record<number, {
  tool: string;
  architecture: string;
  commands: string[];
  config: string;
  example: string;
}> = {
  1: {
    tool: "Java / Spring Boot",
    architecture: "Developer source → Java compiler and JVM → Spring Boot application context → REST controller → service layer → repository and external dependencies.",
    commands: ["java -version", "mvn -version", "mvn clean test", "mvn clean package", "java -jar target/payment-service.jar"],
    config: "Use application.yml for non-secret defaults and environment variables or a managed secret store for credentials. Keep application profiles separate for development, staging and production.",
    example: "The payment service receives a POST /api/payments request, validates the amount, invokes the payment service layer and returns a transaction reference."
  },
  2: {
    tool: "GitHub",
    architecture: "Developer workstation → local Git repository → remote GitHub branch → pull request → review and required checks → protected main branch.",
    commands: ["git status", "git switch -c feature/payment-update", "git add .", "git commit -m \"Update payment service\"", "git push -u origin feature/payment-update", "git log --oneline --graph"],
    config: "Configure branch rules to require pull requests, reviewer approval and successful status checks. Store integration credentials in GitHub Secrets, never in repository files.",
    example: "A payment validation change is submitted through a pull request. GitHub blocks merging until review approval and Jenkins checks succeed."
  },
  3: {
    tool: "Jenkins",
    architecture: "GitHub webhook → Jenkins controller → queue and executor selection → Jenkins agent workspace → pipeline stages → archived artifacts and reports.",
    commands: ["java -version", "jenkins --version", "git --version", "mvn -version", "curl -I http://jenkins.example.com/login"],
    config: "Use a Jenkinsfile stored in source control. Define an agent, stages, tools, environment, credentials binding, post actions and explicit failure handling.",
    example: "A GitHub push starts a Jenkins pipeline. An agent checks out the commit, runs Maven tests and publishes the verified JAR."
  },
  4: {
    tool: "Apache Maven",
    architecture: "pom.xml → Maven project model → dependency resolution → lifecycle phases and plugin goals → compiled classes → packaged JAR.",
    commands: ["mvn -version", "mvn validate", "mvn dependency:tree", "mvn clean test", "mvn clean verify", "mvn help:effective-pom"],
    config: "Define Java release, dependency management, repositories and build plugins in pom.xml. Pin versions and avoid uncontrolled version ranges.",
    example: "The payment service uses Maven to resolve Spring dependencies, compile Java sources, execute tests and package an executable Spring Boot JAR."
  },
  5: {
    tool: "JUnit / Integration Tests",
    architecture: "Test source → JUnit engine → test fixtures and mocks → application code or Spring context → assertions → test reports.",
    commands: ["mvn -Dtest=PaymentServiceTest test", "mvn -Dtest=PaymentControllerTest test", "mvn test", "mvn verify"],
    config: "Keep unit tests in src/test/java. Use JUnit 5, Mockito for isolated dependencies and Spring Boot integration tests only when application wiring must be verified.",
    example: "Unit tests verify payment amount validation. Integration tests verify that the REST endpoint, service and persistence layer work together."
  },
  6: {
    tool: "SonarQube",
    architecture: "Source checkout → SonarScanner → SonarQube server → analyzers and rules → quality gate evaluation → Jenkins pipeline decision.",
    commands: ["mvn clean verify", "mvn sonar:sonar", "curl -u \"$SONAR_TOKEN:\" \"$SONAR_HOST_URL/api/qualitygates/project_status?projectKey=payment-service\""],
    config: "Configure sonar.projectKey, server URL and token through protected CI credentials. Set quality gate thresholds appropriate to the project and enforce the returned gate status.",
    example: "A payment-service pull request is analyzed for bugs, vulnerabilities, maintainability issues and coverage before it can be promoted."
  },
  7: {
    tool: "Trivy",
    architecture: "Source or image input → Trivy scanner → vulnerability and misconfiguration databases → findings by severity → CI policy decision.",
    commands: ["trivy --version", "trivy fs --scanners vuln,misconfig,secret .", "trivy image payment-service:1.0.0", "trivy image --format table payment-service:1.0.0"],
    config: "Configure approved severity thresholds, scanner types and documented exceptions. Keep the vulnerability database updated and avoid silently ignoring critical findings.",
    example: "The pipeline scans the payment service source dependencies and final container image. A critical unapproved vulnerability blocks publishing."
  },
  8: {
    tool: "Docker",
    architecture: "Dockerfile → build context → BuildKit builder → image layers → container runtime → isolated process, network and mounted storage.",
    commands: ["docker version", "docker build -t payment-service:1.0.0 .", "docker image history payment-service:1.0.0", "docker inspect payment-service:1.0.0", "docker run --rm -p 8080:8080 payment-service:1.0.0"],
    config: "Use a multi-stage Dockerfile to build the JAR and copy only the runtime artifact into a minimal final image. Add a non-root user and exclude unnecessary files through .dockerignore.",
    example: "The payment service JAR is copied into a minimal runtime image. The container starts on port 8080 and is checked with a health endpoint."
  },
  9: {
    tool: "Amazon ECR",
    architecture: "Jenkins AWS identity → IAM authorization → ECR registry authentication → repository → image manifest and layers → immutable digest.",
    commands: ["aws sts get-caller-identity", "aws ecr describe-repositories --region ap-south-1", "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com", "docker push ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/payment-service:1.0.0"],
    config: "Use an IAM role with least-privilege ECR permissions. Configure repository encryption, image scanning, lifecycle policies and immutable tags where appropriate.",
    example: "Jenkins pushes the tested payment-service image to an ECR repository and records its digest for deployment promotion."
  },
  10: {
    tool: "Kubernetes / Amazon EKS",
    architecture: "kubectl or deployment controller → Kubernetes API server → scheduler → worker node kubelet → Pod containers → Service and ingress networking.",
    commands: ["kubectl get nodes", "kubectl get pods -n production", "kubectl describe pod POD_NAME -n production", "kubectl logs POD_NAME -n production --previous", "kubectl rollout status deployment/payment-service -n production", "kubectl get events -n production --sort-by=.lastTimestamp"],
    config: "Define Deployments, Services, resource requests and limits, readiness and liveness probes, service accounts and namespace-scoped permissions. Keep secrets outside plain-text manifests.",
    example: "EKS schedules payment-service Pods across worker nodes. A Service routes traffic only to ready Pods while a Deployment maintains the requested replica count."
  },
  11: {
    tool: "Helm / Argo CD",
    architecture: "Git repository → Helm chart and values → Argo CD Application → rendered Kubernetes manifests → cluster reconciliation → healthy release.",
    commands: ["helm lint ./payment-chart", "helm template payment ./payment-chart -f values-production.yaml", "helm upgrade --install payment ./payment-chart -n production --create-namespace", "helm history payment -n production", "argocd app get payment-production", "argocd app sync payment-production"],
    config: "Keep chart templates and environment-specific values in Git. Configure Argo CD repository access, destination cluster, project permissions and an explicit sync policy.",
    example: "A reviewed values change updates the desired payment-service image digest. Argo CD detects the Git change and reconciles the production cluster."
  },
  12: {
    tool: "Prometheus / Grafana",
    architecture: "Application and exporters → Prometheus scrape targets → time-series database → PromQL queries → Grafana dashboards and Alertmanager notifications.",
    commands: ["prometheus --version", "promtool check config prometheus.yml", "promtool check rules alerts.yml", "curl http://localhost:9090/-/healthy", "curl http://localhost:9090/api/v1/targets"],
    config: "Configure scrape jobs, target labels, recording rules and alert rules. Add Prometheus as a Grafana data source and provision dashboards through version-controlled files.",
    example: "The team monitors payment request rate, error ratio and latency. An alert fires when the error ratio remains above the service threshold."
  }
};

export function buildCicdStageTopics(stageId: number): ExpandedTopic[] {
  const titles = syllabus[stageId];
  const details = context[stageId];
  if (!titles || !details) throw new Error(`Missing CI/CD syllabus for stage ${stageId}`);

  return titles.map((title, index) => ({
    title,
    overview: `${title} is a core part of ${details.tool}. This lesson explains the concept, the components involved, the inputs it consumes and the outputs that must be verified before the CI/CD pipeline proceeds.`,
    purpose: `In a production ${details.tool} workflow, ${title.toLowerCase()} helps engineers make delivery repeatable, observable and safe. Understand when this capability is required, what problem it solves and what can happen when it is configured incorrectly.`,
    architecture: `${details.architecture} This lesson focuses on the ${title.toLowerCase()} responsibility within that flow and how its result is consumed by the next stage.`,
    workflow: [
      `Identify the ${title.toLowerCase()} requirement for the ${details.tool} stage.`,
      "Verify prerequisites, tool version, permissions and environment configuration.",
      "Apply the configuration in a controlled development environment.",
      "Execute the relevant operation and capture its logs and output.",
      "Validate the result instead of assuming that a successful command means the application is healthy.",
      "Record the evidence and promote only the verified result to the next pipeline stage."
    ],
    example: `${details.example} In this lesson, examine how ${title.toLowerCase()} affects that workflow, what evidence proves it worked and which conditions should prevent an unsafe release.`,
    commands: details.commands,
    configuration: `${details.config} For ${title}, document the required settings, keep environment-specific values separate, protect credentials and validate the configuration before production use.`,
    failures: [
      `Incorrect ${title.toLowerCase()} configuration or missing prerequisites.`,
      `Insufficient permissions or unavailable network connectivity.`,
      `Incompatible tool, plugin, runtime or dependency version.`,
      "The operation reports success but its resulting artifact or runtime state is incorrect."
    ],
    recovery: [
      `Inspect the ${details.tool} logs and identify the first failing operation related to ${title.toLowerCase()}.`,
      "Verify the active account, role, permissions, endpoint and environment.",
      "Validate configuration syntax and compare it with the known-good version.",
      "Re-run the smallest safe diagnostic or test before retrying the full pipeline.",
      "Capture the corrected output and verify downstream readiness."
    ],
    bestPractices: [
      "Use version-controlled and reviewed configuration.",
      "Apply least-privilege access and never expose credentials in logs.",
      "Pin tool and dependency versions where reproducibility matters.",
      "Keep production changes observable, auditable and reversible.",
      "Promote verified artifacts and retain diagnostic evidence."
    ],
    exercise: `Create a small ${details.tool} lab for "${title}". Apply the relevant configuration, execute the listed commands, capture the expected output, deliberately reproduce one safe failure, diagnose it and document the recovery steps.`
  }));
}
