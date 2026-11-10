export type CicdTopicDetail = {
  overview: string;
  purpose: string;
  workflow: string[];
  productionExample: string;
  commands: string[];
  failureChecks: string[];
  bestPractices: string[];
};

export const cicdTopicContent: Record<string, Record<string, CicdTopicDetail>> = {
  fundamentals: {
    "What is Continuous Integration?": {
      overview: "Continuous Integration (CI) is the practice of frequently merging small code changes into a shared repository and automatically validating every change through builds and tests.",
      purpose: "CI detects integration problems early. It reduces the risk of combining large, untested changes immediately before a release.",
      workflow: [
        "A developer creates a feature branch and commits a small code change.",
        "The developer pushes the branch to GitHub and opens a pull request.",
        "A webhook or repository integration triggers the CI pipeline.",
        "Jenkins checks out the exact commit and installs or resolves dependencies.",
        "The pipeline compiles the application and executes automated tests.",
        "Quality and security checks run before the change is accepted.",
        "The pipeline reports success or failure against the commit or pull request."
      ],
      productionExample: "A Spring Boot team uses GitHub pull requests. Every pull request triggers Jenkins to run Maven compilation, JUnit tests and SonarQube analysis. A failed test blocks merging until the developer fixes the issue.",
      commands: [
        "git checkout -b feature/payment-validation",
        "git add .",
        "git commit -m \"Add payment validation\"",
        "git push origin feature/payment-validation",
        "mvn clean verify"
      ],
      failureChecks: [
        "Check the commit and branch that triggered the build.",
        "Inspect dependency-resolution and compilation logs.",
        "Review failed unit-test reports rather than relying only on the final build status.",
        "Check whether the failure is caused by application code, test data or the CI environment."
      ],
      bestPractices: [
        "Integrate small changes frequently.",
        "Keep the main branch buildable.",
        "Make automated tests repeatable and independent.",
        "Require CI checks before merging protected branches.",
        "Publish test reports and preserve useful build evidence."
      ]
    },
    "What is Continuous Delivery?": {
      overview: "Continuous Delivery is a software engineering approach in which every validated change is kept in a release-ready state. The pipeline automates build, testing, packaging and deployment preparation, while production release may require an authorized human approval.",
      purpose: "It makes releases predictable and reduces the amount of manual work required to deliver a tested application.",
      workflow: [
        "Commit code and trigger CI validation.",
        "Build and test the application.",
        "Create a versioned deployable artifact.",
        "Scan and publish the artifact to a trusted registry or repository.",
        "Deploy to development, QA and staging environments.",
        "Run acceptance, integration and smoke tests.",
        "Request production approval when required.",
        "Deploy the same validated artifact to production."
      ],
      productionExample: "A banking application team automatically builds and deploys every accepted change to staging. After QA approval and change authorization, the same container image is promoted to production.",
      commands: [
        "mvn clean verify",
        "docker build -t payments-api:1.4.2 .",
        "docker tag payments-api:1.4.2 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payments-api:1.4.2"
      ],
      failureChecks: [
        "Verify that the artifact passed all required tests.",
        "Confirm that staging and production configuration are not mixed.",
        "Check approval records and release evidence.",
        "Verify that the promoted artifact digest matches the tested artifact."
      ],
      bestPractices: [
        "Keep production deployment repeatable.",
        "Promote artifacts instead of rebuilding separately for each environment.",
        "Use explicit approval gates for regulated or high-risk releases.",
        "Maintain rollback instructions and release records."
      ]
    },
    "What is Continuous Deployment?": {
      overview: "Continuous Deployment automatically releases every change that passes the defined pipeline controls into production. Unlike Continuous Delivery, a separate manual production approval is not normally required for each change.",
      purpose: "It shortens the time between a validated code change and production availability.",
      workflow: [
        "A code change is committed and reviewed.",
        "Automated build, test and security checks execute.",
        "The pipeline creates and identifies the release artifact.",
        "Automated deployment controls release the change to production.",
        "Health checks and monitoring evaluate the release.",
        "Automated rollback or mitigation policies respond to defined failures."
      ],
      productionExample: "A low-risk web service uses automated tests, canary deployment and service-level monitoring. Changes that pass all quality gates are progressively released without a manual production approval.",
      commands: [
        "kubectl rollout status deployment/payments-api -n production",
        "kubectl get pods -n production",
        "kubectl get events -n production --sort-by=.lastTimestamp"
      ],
      failureChecks: [
        "Confirm that all mandatory tests and security gates ran.",
        "Check deployment health and error-rate changes.",
        "Verify automated rollback conditions.",
        "Investigate whether a faulty change reached only a canary or the full production fleet."
      ],
      bestPractices: [
        "Use strong automated test coverage.",
        "Release progressively where possible.",
        "Define measurable rollback conditions.",
        "Monitor user-facing indicators after deployment.",
        "Keep emergency release controls available."
      ]
    },
    "CI vs CD vs Continuous Deployment": {
      overview: "CI validates changes frequently. Continuous Delivery keeps validated changes ready for release. Continuous Deployment automatically releases qualifying changes to production.",
      purpose: "Understanding the distinction helps teams choose a delivery model that matches their risk, compliance and operational requirements.",
      workflow: [
        "CI focuses on integrating, building and testing code.",
        "Continuous Delivery extends automation through packaging and environment validation.",
        "Continuous Deployment extends automation through production release.",
        "All three depend on reliable source control, automated checks and traceable artifacts."
      ],
      productionExample: "A regulated financial service may use CI and Continuous Delivery with production approval. A mature low-risk SaaS service may use Continuous Deployment with progressive rollout and automated safeguards.",
      commands: [
        "mvn clean verify",
        "docker image inspect payments-api:1.4.2",
        "kubectl rollout status deployment/payments-api -n production"
      ],
      failureChecks: [
        "Identify which pipeline stage failed.",
        "Check whether the issue is a code validation failure, release-readiness failure or deployment failure.",
        "Confirm whether production approval is part of the organization's release policy."
      ],
      bestPractices: [
        "Do not confuse automated delivery with automatic production deployment.",
        "Choose controls according to business and compliance risk.",
        "Measure deployment frequency, lead time and change failure rate."
      ]
    },
    "Why organizations implement CI/CD": {
      overview: "Organizations implement CI/CD to make software delivery faster, more consistent, measurable and repeatable.",
      purpose: "Automation reduces repetitive manual work, exposes defects earlier and creates a controlled path from source code to production.",
      workflow: [
        "Standardize the build and test process.",
        "Automate repeatable quality and security checks.",
        "Package applications into identifiable artifacts.",
        "Deploy through controlled environments.",
        "Collect release evidence and production feedback."
      ],
      productionExample: "A company with several application teams uses shared Jenkins libraries and standard pipeline templates. Teams follow consistent security checks and artifact-promotion rules while retaining application-specific stages.",
      commands: [
        "mvn clean verify",
        "docker build -t orders-api:1.0.0 .",
        "docker image ls"
      ],
      failureChecks: [
        "Compare manual and automated deployment steps.",
        "Identify inconsistent environment configuration.",
        "Review recurring pipeline failures and long-running stages.",
        "Check whether automation has introduced an unsafe shortcut."
      ],
      bestPractices: [
        "Standardize common pipeline stages.",
        "Measure build duration and failure trends.",
        "Automate high-value repetitive tasks first.",
        "Keep human approval for decisions that require business authorization."
      ]
    },
    "Traditional deployment vs automated delivery": {
      overview: "Traditional deployment often relies on manual build instructions, hand-operated server changes and individual knowledge. Automated delivery uses version-controlled definitions and repeatable pipeline execution.",
      purpose: "The comparison helps identify manual steps that create release delays, configuration drift or operational risk.",
      workflow: [
        "Document the current manual release process.",
        "Identify repeatable build, test and deployment tasks.",
        "Move configuration into version control.",
        "Automate tasks in small, verifiable stages.",
        "Validate the automated process in a non-production environment."
      ],
      productionExample: "Instead of manually copying a JAR to multiple servers, a team builds a versioned container image, scans it, publishes it to ECR and deploys it through a controlled Kubernetes rollout.",
      commands: [
        "mvn clean package",
        "docker build -t catalog-api:2.1.0 .",
        "kubectl apply -f deployment.yaml"
      ],
      failureChecks: [
        "Check differences between manual and automated environment settings.",
        "Verify permissions used by the deployment identity.",
        "Confirm that deployment steps are idempotent where possible."
      ],
      bestPractices: [
        "Avoid undocumented manual production changes.",
        "Version pipeline definitions and deployment manifests.",
        "Keep a documented emergency procedure.",
        "Audit changes made outside the pipeline."
      ]
    },
    "Responsibilities of developers and DevOps engineers": {
      overview: "CI/CD is a shared engineering responsibility. Developers own application quality and delivery requirements, while platform and DevOps engineers provide reliable automation, infrastructure and operational controls.",
      purpose: "Clear ownership prevents pipeline failures from becoming hand-off problems between development, QA, security and operations.",
      workflow: [
        "Developers write code, tests and application build definitions.",
        "Reviewers validate changes and approve pull requests.",
        "DevOps or platform engineers maintain pipeline infrastructure and reusable automation.",
        "Security teams define and review security policies.",
        "Operations teams monitor production and coordinate incident response.",
        "Teams jointly improve reliability using delivery metrics and incident learning."
      ],
      productionExample: "When a deployment fails readiness checks, developers investigate application startup and health endpoints while platform engineers inspect Kubernetes events, resource limits and cluster-level dependencies.",
      commands: [
        "git status",
        "mvn test",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl logs <pod-name> -n <namespace>"
      ],
      failureChecks: [
        "Identify the system owner for the failing component.",
        "Share build IDs, commit IDs, timestamps and relevant logs.",
        "Avoid changing production configuration without an owner and audit trail."
      ],
      bestPractices: [
        "Define ownership for every pipeline stage.",
        "Use shared runbooks and incident channels.",
        "Make application and infrastructure evidence accessible.",
        "Treat pipeline reliability as a product responsibility."
      ]
    },
    "Real-time application delivery example": {
      overview: "A typical application delivery journey starts with a source-code change and ends with a verified release running in a monitored environment.",
      purpose: "Following one change across the pipeline shows how source code, tests, artifacts, registries, deployment systems and monitoring are connected.",
      workflow: [
        "A developer updates a Spring Boot endpoint.",
        "The change is pushed to a GitHub feature branch.",
        "A pull request triggers Jenkins.",
        "Maven compiles the code and runs JUnit tests.",
        "SonarQube evaluates code quality and Trivy scans for vulnerabilities.",
        "Docker builds a versioned image.",
        "The image is pushed to Amazon ECR.",
        "A deployment updates the application on Amazon EKS.",
        "Smoke tests and Prometheus metrics verify application health."
      ],
      productionExample: "For a release named 1.4.2, the pipeline records the Git commit, build number, image tag and immutable image digest. The same image digest is promoted through staging and production, allowing the team to trace exactly what is running.",
      commands: [
        "git rev-parse HEAD",
        "mvn clean verify",
        "docker build -t payments-api:1.4.2 .",
        "docker push 123456789012.dkr.ecr.ap-south-1.amazonaws.com/payments-api:1.4.2",
        "kubectl rollout status deployment/payments-api -n production"
      ],
      failureChecks: [
        "Trace the release using commit ID, build number and image digest.",
        "Check the first failed pipeline stage.",
        "Verify that ECR contains the expected image.",
        "Check Kubernetes rollout status, pod events and application health."
      ],
      bestPractices: [
        "Use immutable image tags or digests for production releases.",
        "Keep release metadata and test evidence.",
        "Separate application configuration from container images.",
        "Verify health after deployment and document rollback steps."
      ]
    }
  },

  architecture: {
    "Developer workstation and feature branches": {
      overview: "The developer workstation is where code is created, tested and committed. Feature branches isolate work so changes can be reviewed before entering the shared integration branch.",
      purpose: "Branch isolation supports parallel development and reduces accidental changes to the production-ready branch.",
      workflow: [
        "Clone the repository and create a feature branch.",
        "Implement a focused change.",
        "Run local tests and formatting checks.",
        "Commit with a meaningful message.",
        "Push the branch and open a pull request."
      ],
      productionExample: "A developer implements order validation on feature/order-validation, runs Maven tests locally and opens a pull request against main.",
      commands: [
        "git clone https://github.com/example/orders-api.git",
        "git checkout -b feature/order-validation",
        "mvn clean verify",
        "git add src/",
        "git commit -m \"Add order validation\"",
        "git push -u origin feature/order-validation"
      ],
      failureChecks: [
        "Check the current branch using git branch --show-current.",
        "Review uncommitted changes using git status.",
        "Confirm the pushed commit exists on the remote branch.",
        "Check whether local tests use the same Java and Maven versions as CI."
      ],
      bestPractices: [
        "Use short-lived feature branches.",
        "Never commit credentials or generated secrets.",
        "Keep commits focused and reviewable.",
        "Rebase or merge from the target branch according to team policy."
      ]
    },
    "GitHub repository and pull requests": {
      overview: "The GitHub repository stores source code, pipeline definitions and collaboration history. Pull requests provide a controlled review point before code is merged.",
      purpose: "Repository policies make code changes traceable and allow automated checks to run before integration.",
      workflow: [
        "Push a feature branch to GitHub.",
        "Open a pull request against the protected target branch.",
        "Review code and required status checks.",
        "Resolve comments and update the branch.",
        "Merge only after required approvals and checks pass."
      ],
      productionExample: "The orders-api repository requires one reviewer, successful Jenkins tests and a passing SonarQube quality gate before a pull request can merge into main.",
      commands: [
        "git remote -v",
        "git fetch origin",
        "git log --oneline --decorate -10"
      ],
      failureChecks: [
        "Verify branch protection and required status-check names.",
        "Check whether Jenkins reported against the latest commit.",
        "Review merge conflicts and stale approvals.",
        "Confirm the webhook or GitHub App has the required repository permissions."
      ],
      bestPractices: [
        "Protect main and release branches.",
        "Require code review and essential CI checks.",
        "Use least-privilege GitHub tokens or applications.",
        "Keep repository rules consistent across critical projects."
      ]
    },
    "GitHub webhook integration": {
      overview: "A webhook sends an event from GitHub to an endpoint when an event such as a push or pull request occurs. Jenkins can use the event to trigger the relevant pipeline.",
      purpose: "Webhooks remove the need for frequent repository polling and allow pipeline execution to start soon after a code event.",
      workflow: [
        "Configure the repository integration or webhook endpoint.",
        "Select required events such as push and pull request.",
        "GitHub sends an HTTP request when an event occurs.",
        "Jenkins validates and processes the event.",
        "The appropriate job checks out the associated commit.",
        "The pipeline reports its result back to the repository."
      ],
      productionExample: "A pull request event triggers the Jenkins multibranch pipeline for the matching feature branch. Jenkins checks out the event's commit SHA rather than an unrelated latest commit.",
      commands: [
        "curl -I https://jenkins.example.com/github-webhook/"
      ],
      failureChecks: [
        "Inspect webhook delivery history and HTTP response codes.",
        "Check Jenkins endpoint reachability and reverse-proxy rules.",
        "Review webhook secret validation and integration permissions.",
        "Confirm the job is configured to react to the selected event."
      ],
      bestPractices: [
        "Use HTTPS for webhook endpoints.",
        "Validate webhook signatures or use a trusted integration.",
        "Restrict exposed endpoints and avoid logging secrets.",
        "Monitor failed webhook deliveries."
      ]
    },
    "Jenkins controller and build agents": {
      overview: "The Jenkins controller coordinates jobs, scheduling and pipeline execution. Build agents provide the execution environments where build and test steps run.",
      purpose: "Separating orchestration from execution improves scalability and allows workloads to run on appropriately configured machines or containers.",
      workflow: [
        "A webhook or user action schedules a pipeline.",
        "The controller evaluates job configuration and available executors.",
        "An eligible agent is selected using labels and availability.",
        "The agent checks out source and executes pipeline steps.",
        "Logs, status and artifacts are returned to Jenkins.",
        "The controller records the final build result."
      ],
      productionExample: "A Jenkins controller schedules Java builds on a Maven agent and container image builds on a dedicated Docker-capable agent. Production deployment uses a separate restricted agent with limited credentials.",
      commands: [
        "java -version",
        "mvn -version",
        "docker version",
        "kubectl version --client"
      ],
      failureChecks: [
        "Check controller and agent connectivity.",
        "Inspect agent logs, disk capacity and executor availability.",
        "Verify tool versions and permissions on the selected agent.",
        "Check whether the job label matches an online agent."
      ],
      bestPractices: [
        "Keep the controller focused on orchestration.",
        "Use dedicated and isolated build agents.",
        "Avoid running untrusted pull-request code with production credentials.",
        "Monitor agent capacity and clean temporary workspaces."
      ]
    },
    "Maven build and JUnit testing": {
      overview: "Maven manages Java project dependencies and build lifecycles. JUnit provides automated tests that validate application behavior during the pipeline.",
      purpose: "Compilation and tests catch code and integration defects before an artifact is released.",
      workflow: [
        "Maven reads project settings from pom.xml.",
        "Dependencies are resolved from configured repositories.",
        "The compiler builds application classes.",
        "Surefire or Failsafe executes the configured tests.",
        "Maven packages the application when required.",
        "Test reports and build status are published."
      ],
      productionExample: "Jenkins runs mvn clean verify for a Spring Boot service. A failed JUnit test marks the build unsuccessful and prevents the Docker image from being promoted.",
      commands: [
        "mvn -version",
        "mvn clean test",
        "mvn clean verify",
        "mvn dependency:tree"
      ],
      failureChecks: [
        "Inspect the first compilation or test failure.",
        "Check Java and Maven version compatibility.",
        "Review dependency repository access and credentials.",
        "Inspect Surefire reports under target/surefire-reports."
      ],
      bestPractices: [
        "Pin supported plugin and dependency versions.",
        "Use reproducible build settings.",
        "Keep unit and integration tests distinguishable.",
        "Publish test reports even when a later stage fails."
      ]
    },
    "SonarQube quality analysis": {
      overview: "SonarQube analyzes source code for maintainability issues, reliability problems, security-related findings and configured quality metrics.",
      purpose: "Quality analysis gives teams consistent feedback and can prevent code that violates agreed standards from progressing.",
      workflow: [
        "The pipeline builds or prepares the source project.",
        "The SonarScanner submits analysis data to SonarQube.",
        "The server processes the analysis.",
        "The project quality profile and quality gate are evaluated.",
        "The pipeline retrieves the quality-gate result.",
        "A failed mandatory gate blocks the release according to policy."
      ],
      productionExample: "A Java pull request runs SonarQube analysis. Jenkins waits for the quality-gate result and stops before image creation if the configured gate fails.",
      commands: [
        "mvn sonar:sonar -Dsonar.projectKey=orders-api"
      ],
      failureChecks: [
        "Check scanner logs and server connectivity.",
        "Verify project key, token and server URL.",
        "Confirm analysis completed for the intended commit.",
        "Inspect the exact quality-gate condition that failed."
      ],
      bestPractices: [
        "Store analysis tokens in Jenkins credentials.",
        "Define quality gates that teams understand.",
        "Review new-code findings separately from legacy debt.",
        "Do not treat a successful scanner upload as proof that the quality gate passed."
      ]
    },
    "Trivy security scanning": {
      overview: "Trivy scans software artifacts such as source repositories, dependencies, container images and configuration files for known vulnerabilities and security misconfigurations.",
      purpose: "Scanning helps identify risks before vulnerable artifacts reach production.",
      workflow: [
        "Select the scan target and scan type.",
        "Update or retrieve the vulnerability database.",
        "Run the scan with the organization's severity policy.",
        "Generate readable or machine-readable results.",
        "Evaluate findings and permitted exceptions.",
        "Block or allow progression according to policy."
      ],
      productionExample: "The pipeline scans a Docker image before pushing it to ECR. Critical findings fail the release unless an approved, time-limited exception exists.",
      commands: [
        "trivy fs --scanners vuln,secret,misconfig .",
        "trivy image --severity HIGH,CRITICAL --exit-code 1 orders-api:1.4.2"
      ],
      failureChecks: [
        "Check whether the scan target and image tag are correct.",
        "Inspect database download and network errors.",
        "Review vulnerability identifiers and affected package versions.",
        "Distinguish scanner execution failures from actual policy violations."
      ],
      bestPractices: [
        "Define severity thresholds and exception ownership.",
        "Keep scan databases and scanner versions updated.",
        "Scan source dependencies and final container images.",
        "Retain scan reports as release evidence."
      ]
    },
    "Docker image creation": {
      overview: "Docker packages an application and its runtime dependencies into a container image built from a Dockerfile. The image becomes a portable unit for deployment.",
      purpose: "Container images make application packaging more consistent across development, testing and production environments.",
      workflow: [
        "Prepare the application build artifact.",
        "Read the Dockerfile and build context.",
        "Execute Dockerfile instructions to create image layers.",
        "Apply a meaningful version tag.",
        "Inspect the image and test container startup.",
        "Scan the image before release."
      ],
      productionExample: "Jenkins packages a Spring Boot JAR into a minimal runtime image. The image is tagged with the release version and commit identifier before publication.",
      commands: [
        "docker build -t orders-api:1.4.2 .",
        "docker image inspect orders-api:1.4.2",
        "docker run --rm -p 8080:8080 orders-api:1.4.2",
        "docker image ls"
      ],
      failureChecks: [
        "Check Dockerfile syntax and build context.",
        "Inspect missing files and incorrect COPY paths.",
        "Check available disk space and daemon health.",
        "Review application startup logs and exposed port configuration."
      ],
      bestPractices: [
        "Use multi-stage builds where appropriate.",
        "Use trusted minimal base images.",
        "Avoid embedding secrets in image layers.",
        "Use .dockerignore to exclude unnecessary files.",
        "Run containers as a non-root user when possible."
      ]
    },
    "Amazon ECR image registry": {
      overview: "Amazon Elastic Container Registry (ECR) is a managed container image registry used to store and distribute container images.",
      purpose: "ECR provides a controlled location for versioned images consumed by deployment systems such as Amazon EKS.",
      workflow: [
        "Create or select an ECR repository.",
        "Authenticate Docker using AWS credentials and ECR authorization.",
        "Tag the local image with the ECR repository URI.",
        "Push the image to ECR.",
        "Verify the image tag or digest in the repository.",
        "Allow the deployment identity to pull the image."
      ],
      productionExample: "Jenkins assumes a restricted AWS role, authenticates to the ap-south-1 ECR registry and pushes the release image. EKS worker nodes or authorized pod identities retrieve the image according to the configured access model.",
      commands: [
        "aws sts get-caller-identity",
        "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.ap-south-1.amazonaws.com",
        "docker tag orders-api:1.4.2 123456789012.dkr.ecr.ap-south-1.amazonaws.com/orders-api:1.4.2",
        "docker push 123456789012.dkr.ecr.ap-south-1.amazonaws.com/orders-api:1.4.2"
      ],
      failureChecks: [
        "Verify AWS account, region and repository URI.",
        "Check the identity returned by aws sts get-caller-identity.",
        "Review ECR push and pull permissions.",
        "Confirm the image tag exists and the deployment references the correct URI."
      ],
      bestPractices: [
        "Use IAM roles and short-lived credentials.",
        "Enable image scanning and lifecycle policies.",
        "Use immutable tags or digests for production deployments.",
        "Restrict repository access and retain release images according to policy."
      ]
    },
    "Amazon EKS deployment": {
      overview: "Amazon Elastic Kubernetes Service (EKS) is a managed Kubernetes service. A delivery pipeline can update Kubernetes workloads to run an approved container image.",
      purpose: "EKS provides orchestration for scheduling containers, maintaining desired replicas and supporting service discovery and rolling updates.",
      workflow: [
        "Configure authorized access to the EKS cluster.",
        "Select the correct cluster and namespace.",
        "Update the workload image to the approved release.",
        "Apply or update the Kubernetes deployment.",
        "Wait for rollout completion.",
        "Verify pods, services and application health."
      ],
      productionExample: "Jenkins uses a restricted deployment identity to update the orders-api Deployment in the staging namespace. The pipeline waits for rollout status and runs a smoke test before marking the release successful.",
      commands: [
        "aws eks update-kubeconfig --region ap-south-1 --name production-eks",
        "kubectl get nodes",
        "kubectl set image deployment/orders-api orders-api=123456789012.dkr.ecr.ap-south-1.amazonaws.com/orders-api:1.4.2 -n staging",
        "kubectl rollout status deployment/orders-api -n staging",
        "kubectl get pods -n staging"
      ],
      failureChecks: [
        "Check cluster endpoint access and authentication.",
        "Verify Kubernetes RBAC permissions and namespace.",
        "Inspect pod events for image-pull or scheduling failures.",
        "Check readiness probes, resource limits and rollout status."
      ],
      bestPractices: [
        "Use least-privilege deployment identities.",
        "Keep manifests and release configuration in version control.",
        "Use readiness and liveness probes appropriately.",
        "Set resource requests and limits based on workload behavior.",
        "Define and test rollback procedures."
      ]
    },
    "Prometheus and Grafana monitoring": {
      overview: "Prometheus collects and stores time-series metrics. Grafana queries monitoring data and presents it through dashboards and visualizations.",
      purpose: "Monitoring verifies whether the application and its infrastructure remain healthy after a release.",
      workflow: [
        "Expose application or infrastructure metrics.",
        "Configure Prometheus scrape targets and service discovery.",
        "Store metrics with timestamps and labels.",
        "Create Grafana data sources and dashboards.",
        "Define alerts for important service conditions.",
        "Compare pre-release and post-release behavior."
      ],
      productionExample: "After deploying a new API version, engineers watch request rate, error rate, latency, CPU, memory and pod restarts. A sudden increase in HTTP 5xx responses triggers investigation or rollback.",
      commands: [
        "kubectl get pods -n monitoring",
        "kubectl get servicemonitors -A",
        "kubectl port-forward svc/prometheus-operated 9090:9090 -n monitoring"
      ],
      failureChecks: [
        "Check whether Prometheus targets are up.",
        "Verify scrape configuration and network reachability.",
        "Check metric labels and query time ranges.",
        "Confirm Grafana data-source connectivity and alert evaluation."
      ],
      bestPractices: [
        "Monitor user-facing service indicators, not only CPU and memory.",
        "Use actionable alerts with clear ownership.",
        "Avoid excessive metric cardinality.",
        "Correlate deployment timestamps with metric changes.",
        "Keep dashboards and alert rules version-controlled."
      ]
    },
    "Complete request and artifact flow": {
      overview: "The end-to-end flow connects a source-code change to a tested artifact, a registry and a running production workload. Each transition should be traceable.",
      purpose: "Understanding the complete flow helps engineers identify where a release failed and prove which source revision produced a running artifact.",
      workflow: [
        "A developer pushes a commit to GitHub.",
        "A webhook triggers Jenkins.",
        "Jenkins checks out the commit and runs Maven tests.",
        "SonarQube evaluates code quality and Trivy scans for security issues.",
        "Docker builds a versioned image.",
        "Jenkins pushes the image to ECR.",
        "A deployment updates the EKS workload.",
        "Smoke tests verify application behavior.",
        "Prometheus and Grafana monitor the new release."
      ],
      productionExample: "For every release, record the Git SHA, Jenkins build URL, test reports, scan reports, image digest, deployment revision and post-deployment verification. This creates a traceable chain from source to running workload.",
      commands: [
        "git rev-parse HEAD",
        "mvn clean verify",
        "docker image inspect orders-api:1.4.2",
        "aws ecr describe-images --repository-name orders-api --region ap-south-1",
        "kubectl rollout history deployment/orders-api -n production",
        "kubectl get pods -n production"
      ],
      failureChecks: [
        "Identify the first stage that failed.",
        "Match the deployed image digest to the approved build.",
        "Check whether deployment configuration references the intended artifact.",
        "Verify application health and monitoring after rollout."
      ],
      bestPractices: [
        "Maintain traceability across source, build, artifact and deployment.",
        "Promote the same tested artifact across environments.",
        "Keep build and deployment credentials separate.",
        "Capture release evidence and rollback metadata.",
        "Make post-deployment verification a required pipeline stage."
      ]
    }
  }
};
