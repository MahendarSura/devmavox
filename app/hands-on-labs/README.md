💻 Go Mastery — Complete Hands-on Learning Roadmap
<p align="center">
<img src="https://go.dev/blog/go-brand/Go-Logo/PNG/Go-Logo_Blue.png" alt="Go Programming Language Logo" width="200" />
</p>

<p align="center">
<strong>From Go Fundamentals to Production-Ready Backend, Cloud-Native, SRE and Platform Engineering</strong>
</p>

<p align="center">
<img src="https://img.shields.io/badge/Language-Go-00ADD8?logo=go&logoColor=white" alt="Go" />
<img src="https://img.shields.io/badge/Roadmap-25%20Parts-7C3AED" alt="Roadmap" />
<img src="https://img.shields.io/badge/Levels-5-16A34A" alt="Levels" />
<img src="https://img.shields.io/badge/Hands--On-Practical%20Labs-F97316" alt="Hands-on Labs" />
<img src="https://img.shields.io/badge/Backend-Engineering-2563EB" alt="Backend Engineering" />
<img src="https://img.shields.io/badge/Docker-Containerization-2496ED?logo=docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/Kubernetes-Cloud--Native-326CE5?logo=kubernetes&logoColor=white" alt="Kubernetes" />
<img src="https://img.shields.io/badge/CI%2FCD-Automation-2088FF?logo=githubactions&logoColor=white" alt="CI/CD" />
</p>

# 🚀 DevMavox — Professional DevOps Hands-on Labs

> **Learn by Doing. Build Real Projects. Troubleshoot Like a DevOps Engineer.**

![DevOps](https://img.shields.io/badge/DevOps-Practical%20Learning-0891b2?style=for-the-badge)
![Linux](https://img.shields.io/badge/Linux-Administration-black?style=flat-square&logo=linux)
![Docker](https://img.shields.io/badge/Docker-Containers-2496ED?style=flat-square&logo=docker)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestration-326CE5?style=flat-square&logo=kubernetes)
![AWS](https://img.shields.io/badge/AWS-Cloud%20Engineering-FF9900?style=flat-square&logo=amazonaws)
![Terraform](https://img.shields.io/badge/Terraform-IaC-844FBA?style=flat-square&logo=terraform)

---

## 📌 1. Project Overview

DevMavox Hands-on Labs is a practical DevOps learning platform designed to help students, aspiring engineers, system administrators, cloud engineers, and software professionals develop real-world technical skills.

The platform follows the workflows used by engineering teams to build, test, deploy, operate, secure, monitor, and troubleshoot applications and infrastructure.

Instead of memorizing commands, learners practise completing tasks, understanding system behavior, analyzing failures, identifying root causes, verifying solutions, and documenting their work.

### 🎯 Primary objective

Help learners progress from beginner-level technical foundations to integrated DevOps projects and production-style troubleshooting exercises.

The platform should gradually teach learners to:

- Understand Linux servers and operating systems.
- Work confidently with Git and collaborative development.
- Automate repetitive work using shell scripting and configuration management.
- Package and run applications using Docker.
- Build automated CI/CD pipelines.
- Provision infrastructure using AWS and Terraform.
- Deploy and operate applications on Kubernetes.
- Implement GitOps using Argo CD.
- Monitor applications and infrastructure.
- Troubleshoot incidents using logs, metrics, events, and system evidence.
- Apply security controls throughout the delivery lifecycle.
- Document projects professionally for portfolios and interviews.

**Important:** The current website page provides sample guided labs and learning content. A live terminal, isolated cloud sandbox, automatic grading, and persistent learner progress are separate capabilities that must be implemented before they can be advertised as available.

---

## 🧭 2. Professional DevOps Engineering Workflow

A professional lab should teach a repeatable workflow rather than simply provide commands.

```text
Understand the Requirement
          |
          v
Review Architecture and Prerequisites
          |
          v
Prepare the Lab Environment
          |
          v
Execute the Task
          |
          v
Inspect Output, Logs and Metrics
          |
          v
Troubleshoot Unexpected Behavior
          |
          v
Identify the Root Cause
          |
          v
Apply a Safe Fix
          |
          v
Verify the Expected Result
          |
          v
Document Findings and Lessons
          |
          v
Clean Up Lab Resources
```

### The engineering habits learners should develop

1. **Observe before changing:** Gather facts before modifying configuration.
2. **Understand before executing:** Know what each command does and its potential impact.
3. **Investigate systematically:** Use logs, events, metrics, status information, and configuration.
4. **Fix the root cause:** Avoid repeatedly treating only the visible symptom.
5. **Verify objectively:** Use test results, health checks, deployment status, and expected outputs.
6. **Prevent recurrence:** Add monitoring, automation, validation, documentation, or tests.
7. **Clean up responsibly:** Remove temporary resources and avoid unnecessary cloud costs.

---

## 📚 3. Complete Hands-on Labs Curriculum

The following curriculum defines the recommended coverage for the platform. Each topic can contain multiple individual exercises, from basic command practice to integrated troubleshooting challenges.

## Module 01 — Linux System Administration

**Goal:** Learn to administer and troubleshoot Linux servers used by applications and DevOps tools.

### Topics

- Linux architecture and distributions
- Filesystem hierarchy and directory navigation
- File creation, copying, moving, searching, and permissions
- Users, groups, ownership, and `sudo`
- File permissions, special permissions, and access troubleshooting
- Processes, signals, background jobs, and process inspection
- CPU, memory, disk, and inode utilization
- Filesystem mounts and storage inspection
- Package installation and updates
- systemd services and service dependencies
- `systemctl`, `journalctl`, and log analysis
- SSH access and key-based authentication
- Environment variables and shell profiles
- Cron jobs and scheduled tasks
- Bash scripting fundamentals
- Exit codes, pipes, redirection, and text processing
- Disk space and log rotation troubleshooting
- Linux server hardening fundamentals

### Practical labs

1. Create users and configure appropriate permissions.
2. Diagnose a service that refuses to start.
3. Identify a process consuming excessive CPU.
4. Investigate a filesystem running out of space.
5. Locate relevant errors in system logs.
6. Configure and verify a scheduled job.
7. Diagnose SSH authentication failure.
8. Write a script that checks disk usage and reports threshold violations.
9. Investigate a permission-denied application error.
10. Perform a basic Linux server health assessment.

**Expected outcome:** Learners can inspect system state, diagnose common failures, apply appropriate fixes, and verify system health.

---

## Module 02 — Git and GitHub

**Goal:** Understand version control and collaborative workflows used by engineering teams.

### Topics

- Repositories, commits, branches, and remotes
- Working tree, staging area, and commit history
- Feature branches and pull requests
- Merge and rebase workflows
- Merge conflict resolution
- `.gitignore` and repository hygiene
- Tags, releases, and version history
- Reverting commits and recovering lost work
- Branch protection and code reviews
- GitHub Issues and project collaboration
- Pull request checks and branch policies
- GitHub Actions fundamentals
- Secure handling of credentials and secrets

### Practical labs

1. Create a repository and publish a local project.
2. Implement a feature branch workflow.
3. Resolve a controlled merge conflict.
4. Recover a file from Git history.
5. Undo an incorrect commit safely.
6. Review a pull request and address requested changes.
7. Configure a basic branch validation workflow.
8. Investigate a failed CI check on a pull request.
9. Identify and remediate an accidentally committed test secret.
10. Tag a release and explain how to return to a known version.

**Expected outcome:** Learners can collaborate through Git, investigate repository problems, and maintain a reliable source history.

---

## Module 03 — Shell Scripting and Automation

**Goal:** Automate repetitive operational tasks reliably.

### Topics

- Bash variables, quoting, and environment variables
- Conditional statements and loops
- Functions and reusable scripts
- Command-line arguments
- Exit codes and error handling
- Pipes, redirection, and text processing
- Input validation and safe defaults
- Logging and timestamps
- Scheduling with cron
- Script testing and debugging
- Idempotent automation principles

### Practical labs

1. Create a system health report.
2. Check disk and memory thresholds.
3. Parse application logs for errors.
4. Automate backup creation and validation.
5. Build a service health-check script.
6. Generate a daily server report.
7. Handle missing arguments and invalid input.
8. Implement logging and meaningful exit codes.
9. Schedule a maintenance task.
10. Make a script safe to rerun without duplicating changes.

**Expected outcome:** Learners can write maintainable scripts with predictable behavior and useful failure messages.

---

## Module 04 — Networking and Troubleshooting

**Goal:** Diagnose connectivity problems between clients, servers, services, and cloud resources.

### Topics

- IP addressing and subnetting
- Public and private IP addresses
- DNS resolution
- TCP and UDP
- Ports and listening sockets
- HTTP and HTTPS
- TLS certificates and basic certificate troubleshooting
- Routing tables and default gateways
- Firewalls and security groups
- Reverse proxies and load balancers
- Network troubleshooting tools
- Application connectivity and timeout diagnosis

### Practical labs

1. Diagnose a DNS resolution failure.
2. Identify a service listening on the wrong port.
3. Investigate a connection timeout.
4. Diagnose a connection refused error.
5. Troubleshoot an HTTP 502 response.
6. Inspect TLS certificate expiration.
7. Investigate a service that is reachable locally but not remotely.
8. Verify connectivity between two application components.
9. Diagnose an incorrect route or firewall rule in a test environment.
10. Document the network path between a user and an application.

**Expected outcome:** Learners can distinguish DNS, routing, firewall, TLS, and application-level failures.

---

## Module 05 — Docker and Containerization

**Goal:** Package applications into containers and operate them reliably.

### Topics

- Images, containers, registries, and layers
- Dockerfiles and image builds
- Build context and `.dockerignore`
- Port publishing and container networking
- Environment variables and configuration
- Bind mounts and named volumes
- Container logs and inspection
- Image tagging and registry workflows
- Multi-stage builds
- Non-root containers
- Image size optimization
- Container resource limits
- Docker Compose
- Container health checks
- Container security fundamentals

### Practical labs

1. Build and run a sample web application.
2. Publish a container port and verify access.
3. Investigate a container that exits immediately.
4. Diagnose an image pull failure.
5. Resolve an application-to-container networking issue.
6. Persist application data using a volume.
7. Run a multi-container application with Docker Compose.
8. Optimize a Docker image using a multi-stage build.
9. Investigate a container running out of memory.
10. Configure a health check and verify container status.
11. Build and tag an image for a registry.
12. Review a container for excessive privileges or embedded secrets.

**Expected outcome:** Learners can build, run, inspect, troubleshoot, and secure containerized applications.

---

## Module 06 — CI/CD Pipelines

**Goal:** Automate application validation, packaging, and delivery.

### Topics

- Continuous integration and continuous delivery/deployment
- Pipeline stages and jobs
- Build dependencies and caching
- Automated tests and quality checks
- Artifact creation and versioning
- Environment variables and secret management
- Pipeline permissions and access controls
- Deployment approvals
- Environment promotion
- Rollback strategies
- Pipeline failure analysis
- GitHub Actions, Jenkins, or equivalent CI/CD systems

### Practical labs

1. Build a pipeline triggered by a Git commit.
2. Run tests automatically on pull requests.
3. Build and publish a Docker image.
4. Add dependency caching.
5. Diagnose a failed build stage.
6. Fix a pipeline that works locally but fails in CI.
7. Configure secrets without printing them to logs.
8. Add a container or dependency security scan.
9. Deploy to a test environment after successful validation.
10. Simulate a failed deployment and perform a rollback.
11. Publish build artifacts with traceable versions.
12. Add approval controls before a production-like deployment.

**Expected outcome:** Learners can design, troubleshoot, and explain an automated software delivery pipeline.

---

## Module 07 — Jenkins

**Goal:** Understand Jenkins-based automation used by many enterprise DevOps teams.

### Topics

- Jenkins installation and initial setup
- Jobs, pipelines, and Jenkinsfiles
- Declarative pipeline syntax
- Agents, executors, and build queues
- Credentials management
- Build parameters and environment variables
- Maven or Gradle integration
- Artifact archiving
- Webhook triggers
- Pipeline logs and test reports
- Agent connectivity
- Plugin maintenance and access controls

### Practical labs

1. Create a Jenkins freestyle job.
2. Build a Declarative Pipeline.
3. Connect a pipeline to a Git repository.
4. Build a Java application with Maven.
5. Diagnose a Jenkins agent marked offline.
6. Troubleshoot a credentials binding failure.
7. Fix a pipeline stuck in a build queue.
8. Publish an artifact after a successful build.
9. Diagnose a webhook that does not trigger a pipeline.
10. Implement a test and deployment pipeline with protected credentials.

**Expected outcome:** Learners can build and troubleshoot common Jenkins workflows.

---

## Module 08 — AWS Cloud Engineering

**Goal:** Understand the cloud infrastructure and security controls commonly used by DevOps engineers.

### Topics

- AWS accounts, Regions, and Availability Zones
- IAM users, roles, policies, and least privilege
- VPCs, subnets, route tables, and gateways
- Security groups and network access
- EC2 instances and status checks
- EBS storage and snapshots
- S3 buckets, object access, and bucket policies
- Application Load Balancers and target groups
- Auto Scaling fundamentals
- CloudWatch metrics, logs, and alarms
- AWS CLI profiles and credential handling
- AWS cost awareness and resource cleanup
- Basic EKS architecture

### Practical labs

1. Launch a test EC2 instance with restricted access.
2. Diagnose an EC2 status check failure.
3. Investigate SSH connectivity using approved access methods.
4. Troubleshoot an instance with no outbound connectivity.
5. Diagnose an IAM `AccessDenied` error.
6. Investigate an S3 access policy conflict.
7. Configure an Application Load Balancer and healthy targets.
8. Diagnose a failing target group health check.
9. Review VPC routing and subnet configuration.
10. Create a CloudWatch alarm for a selected metric.
11. Inspect AWS CLI profile and Region configuration.
12. Review cloud resource usage and clean up test infrastructure.

**Expected outcome:** Learners can investigate common AWS infrastructure issues while applying secure access and cost-control practices.

---

## Module 09 — Terraform and Infrastructure as Code

**Goal:** Provision and manage infrastructure through version-controlled configuration.

### Topics

- Infrastructure as Code concepts
- Providers, resources, and data sources
- Input variables and outputs
- Locals and expressions
- Resource dependencies
- Modules and reusable configurations
- `terraform fmt`, `validate`, and `plan`
- State files and state locking
- Remote backends and collaboration
- Drift detection
- Importing existing resources
- Lifecycle rules and resource replacement
- Sensitive values and secret handling
- Environment separation and reusable modules

### Practical labs

1. Write a Terraform configuration for a test resource.
2. Format and validate a configuration.
3. Review a plan before applying changes.
4. Build a reusable infrastructure module.
5. Diagnose provider initialization errors.
6. Investigate a state lock failure.
7. Detect and explain infrastructure drift.
8. Diagnose an unexpected resource replacement.
9. Troubleshoot a remote backend access failure.
10. Separate development and test configurations.
11. Import a suitable existing resource into Terraform management.
12. Review a plan for security, cost, and unintended changes.

**Expected outcome:** Learners can manage infrastructure changes predictably and understand the risks of state and resource replacement.

**Safety requirement:** Use disposable test environments. Never apply unreviewed plans to production infrastructure.

---

## Module 10 — Ansible Configuration Management

**Goal:** Automate server configuration consistently and repeatably.

### Topics

- Inventory files and host groups
- Ad hoc commands
- Playbooks and YAML syntax
- Tasks, handlers, and variables
- Templates and configuration files
- Roles and reusable automation
- Privilege escalation
- Ansible Vault
- Idempotency
- Error handling and check mode
- Configuration drift

### Practical labs

1. Create an inventory for test machines.
2. Run a basic playbook.
3. Install and configure a web server.
4. Deploy an application configuration file.
5. Use handlers to restart a service only when needed.
6. Create a reusable role.
7. Secure sensitive variables.
8. Investigate a failed task and correct the cause.
9. Run a playbook repeatedly and verify idempotency.
10. Generate a server configuration report.

**Expected outcome:** Learners can automate repeatable configuration tasks across multiple hosts.

---

## Module 11 — Kubernetes Administration

**Goal:** Deploy, operate, and troubleshoot containerized applications in a Kubernetes cluster.

### Topics

- Cluster architecture and control plane
- Nodes, Pods, and namespaces
- Deployments and ReplicaSets
- Services and service discovery
- ConfigMaps and Secrets
- Resource requests and limits
- Liveness, readiness, and startup probes
- Scheduling, taints, and tolerations
- PersistentVolumes and PersistentVolumeClaims
- Ingress and traffic routing
- DNS and CoreDNS
- RBAC and service accounts
- Rolling updates and rollbacks
- Events, logs, and debugging
- Cluster capacity and node health

### Practical labs

1. Deploy a sample application.
2. Scale a Deployment and verify replica health.
3. Diagnose `CrashLoopBackOff`.
4. Investigate `ImagePullBackOff`.
5. Diagnose a Pod stuck in `Pending`.
6. Investigate `OOMKilled`.
7. Troubleshoot a Service that cannot reach Pods.
8. Diagnose an Ingress returning HTTP 404 or 502.
9. Investigate failing readiness and liveness probes.
10. Troubleshoot a PersistentVolumeClaim stuck in `Pending`.
11. Diagnose a ConfigMap or Secret not being applied as expected.
12. Investigate CoreDNS or cluster DNS failures.
13. Troubleshoot a node marked `NotReady`.
14. Diagnose a Deployment rollout that is stuck.
15. Investigate resource constraints and failed scheduling.
16. Review Kubernetes access permissions using RBAC.

**Expected outcome:** Learners can use `kubectl`, events, logs, resource definitions, and health information to diagnose Kubernetes problems systematically.

---

## Module 12 — Helm and Kubernetes Package Management

**Goal:** Manage repeatable Kubernetes application deployments.

### Topics

- Helm charts and chart structure
- Templates and values files
- Chart dependencies
- Release lifecycle
- Upgrade and rollback
- Environment-specific configuration
- Chart validation
- Secret management considerations
- Release troubleshooting

### Practical labs

1. Install a sample application with Helm.
2. Customize a chart using a values file.
3. Validate chart templates.
4. Upgrade an application release.
5. Roll back an unsuccessful release.
6. Diagnose an invalid chart configuration.
7. Maintain separate development and test values.
8. Document chart installation and cleanup procedures.

**Expected outcome:** Learners can package, configure, upgrade, and troubleshoot Helm-based deployments.

---

## Module 13 — GitOps and Argo CD

**Goal:** Manage Kubernetes desired state through Git-based workflows.

### Topics

- GitOps principles
- Desired state versus live state
- Argo CD applications and repositories
- Sync policies
- Automated and manual synchronization
- Drift detection
- Health status
- Rollback and recovery
- Repository credentials and access control
- Environment promotion

### Practical labs

1. Register a test application with Argo CD.
2. Synchronize a Git-managed deployment.
3. Investigate an OutOfSync application.
4. Diagnose a failed synchronization.
5. Update an application through a Git commit.
6. Investigate a healthy deployment with an unhealthy application.
7. Implement a controlled promotion between environments.
8. Document GitOps rollback and recovery procedures.

**Expected outcome:** Learners can explain how Git changes become deployed workloads and how drift is identified and corrected.

---

## Module 14 — Monitoring, Observability, and SRE

**Goal:** Understand service health, detect incidents, and improve reliability.

### Topics

- Metrics, logs, traces, and events
- Prometheus architecture
- Exporters and scrape configuration
- PromQL fundamentals
- Grafana dashboards
- Alert rules and Alertmanager
- Application health checks
- Service Level Indicators and Objectives
- Error budgets
- Incident severity and response
- Alert noise and actionable alerts
- Capacity and performance investigation

### Practical labs

1. Configure monitoring for a sample service.
2. Diagnose a target marked down.
3. Build a Grafana dashboard.
4. Create an alert for high resource usage.
5. Investigate an alert that fires unexpectedly.
6. Diagnose missing metrics.
7. Investigate elevated application latency.
8. Simulate an application outage and follow an incident checklist.
9. Write a basic incident timeline.
10. Create a blameless post-incident review with corrective actions.

**Expected outcome:** Learners can connect telemetry to service behavior and use evidence to investigate reliability problems.

---

## Module 15 — DevSecOps and Supply Chain Security

**Goal:** Integrate security checks into software development and deployment.

### Topics

- Secure software delivery principles
- Least-privilege access
- Secrets management
- Dependency vulnerability scanning
- Static application security testing
- Container image scanning
- Infrastructure as Code scanning
- Software bill of materials concepts
- Image provenance and artifact integrity
- Kubernetes security fundamentals
- CI/CD permissions and protected environments
- Vulnerability prioritization and remediation

### Practical labs

1. Add a dependency scan to a CI pipeline.
2. Scan a sample container image.
3. Detect and fix an insecure configuration in a test project.
4. Identify a secret in a controlled sample repository.
5. Add an IaC security check to a pipeline.
6. Investigate a vulnerability report and prioritize remediation.
7. Review container user privileges.
8. Restrict pipeline permissions to the minimum necessary.
9. Generate and review a software bill of materials.
10. Verify that sensitive information does not appear in build logs.

**Expected outcome:** Learners understand how security checks fit into the delivery workflow and how to handle findings responsibly.

---

## Module 16 — Maven, Gradle, and Artifact Management

**Goal:** Understand build tools and the lifecycle of application artifacts.

### Topics

- Maven and Gradle fundamentals
- Dependency resolution
- Build lifecycle
- Unit and integration tests
- Build reproducibility
- Artifact versioning
- Repository management concepts
- Nexus or equivalent artifact repositories
- Build cache and dependency troubleshooting
- Artifact integrity

### Practical labs

1. Build a sample Java application.
2. Diagnose a missing dependency.
3. Investigate a failed unit test.
4. Configure artifact versioning.
5. Publish a test artifact to an authorized repository.
6. Diagnose a missing or unpublished artifact.
7. Compare local and CI build environments.
8. Trace an artifact from source commit to deployment.

**Expected outcome:** Learners understand how source code becomes a versioned, deployable artifact.

---

## Module 17 — Production Troubleshooting and Incident Response

**Goal:** Develop the systematic diagnostic skills expected of a DevOps or Site Reliability Engineer.

### Incident scenarios

- Linux service fails after a configuration change.
- Disk utilization reaches a critical threshold.
- Application returns HTTP 500, 502, or 503.
- DNS resolution fails intermittently.
- Docker container repeatedly restarts.
- Kubernetes Pod enters `CrashLoopBackOff`.
- Kubernetes workloads cannot be scheduled.
- CI/CD pipeline fails after a dependency update.
- AWS instance becomes unreachable.
- Load balancer health checks fail.
- Terraform proposes an unexpected replacement.
- Monitoring targets disappear.
- Deployment succeeds but the application is unhealthy.
- Application latency increases after a release.
- A certificate is expired or incorrectly configured.

### Required investigation workflow

1. Establish the impact and scope.
2. Collect relevant logs, metrics, events, and status information.
3. Identify recent changes.
4. Form a testable hypothesis.
5. Validate the hypothesis with evidence.
6. Choose a safe remediation.
7. Verify service recovery.
8. Document the timeline and root cause.
9. Identify preventive actions.
10. Communicate findings clearly.

**Expected outcome:** Learners develop repeatable incident investigation and root-cause analysis habits rather than relying on trial and error.

---

## Module 18 — Cloud Cost Optimization and Reliability

**Goal:** Understand how engineering decisions affect cloud spending and service availability.

### Topics

- Resource utilization
- Rightsizing concepts
- Storage lifecycle and retention
- Unused resources
- Budget alerts
- Environment shutdown policies
- High availability fundamentals
- Backup and recovery
- Resource tagging
- Cost-aware architecture decisions

### Practical labs

1. Review a sample cloud resource inventory.
2. Identify unused test resources.
3. Estimate the cost implications of a proposed architecture.
4. Configure budget monitoring in an authorized test account.
5. Create a cleanup checklist.
6. Review backup and recovery assumptions.
7. Compare availability and cost trade-offs in a sample design.

**Expected outcome:** Learners can discuss cost and reliability as part of everyday engineering decisions.

---

## 🏗️ 4. End-to-End Capstone Projects

Individual labs teach individual skills. Capstone projects combine multiple tools into complete engineering workflows.

### Project 01 — Application CI/CD with Docker

**Technologies:** Git, GitHub, application build tools, Docker, CI/CD.

Tasks:

- Maintain source code in Git.
- Run automated tests.
- Build a container image.
- Scan the image.
- Publish a versioned artifact.
- Deploy to a test environment.
- Verify application health.
- Document rollback and cleanup procedures.

**Deliverables:** Source repository, Dockerfile, pipeline configuration, test evidence, deployment instructions, and troubleshooting notes.

### Project 02 — AWS Infrastructure with Terraform

**Technologies:** AWS, Terraform, IAM, VPC, compute, networking.

Tasks:

- Design a small test architecture.
- Define infrastructure as code.
- Review the execution plan.
- Provision resources with appropriate permissions.
- Verify network and application access.
- Inspect state and configuration drift.
- Document infrastructure changes.
- Destroy temporary resources safely.

**Deliverables:** Terraform configuration, architecture diagram, deployment guide, validation evidence, and cleanup instructions.

### Project 03 — Kubernetes Application Platform

**Technologies:** Docker, Kubernetes, Helm, networking, monitoring.

Tasks:

- Package an application.
- Deploy it to a suitable test cluster.
- Configure resources and health probes.
- Expose the application through an appropriate Service or Ingress.
- Perform a rolling update.
- Investigate a deliberately introduced failure.
- Restore healthy service.
- Document recovery and rollback.

**Deliverables:** Container configuration, Kubernetes manifests or Helm chart, validation steps, troubleshooting guide, and deployment diagram.

### Project 04 — GitOps Deployment with Argo CD

**Technologies:** Git, Kubernetes, Helm, Argo CD.

Tasks:

- Store deployment configuration in Git.
- Register the application with Argo CD.
- Synchronize a test deployment.
- Make a controlled configuration change.
- Detect and investigate drift.
- Recover from a failed update.
- Document environment promotion.

**Deliverables:** Git repository, deployment configuration, Argo CD setup instructions, change history, and recovery notes.

### Project 05 — Monitoring and Incident Response

**Technologies:** Prometheus, Grafana, Alertmanager, application metrics.

Tasks:

- Deploy a sample application.
- Configure metrics collection.
- Create a useful dashboard.
- Define actionable alerts.
- Simulate an application problem.
- Investigate metrics and logs.
- Restore service and validate recovery.
- Prepare a post-incident review.

**Deliverables:** Monitoring configuration, dashboard definitions, alert rules, incident timeline, and corrective-action list.

### Project 06 — Integrated DevSecOps Pipeline

**Technologies:** GitHub Actions or Jenkins, Docker, security scanners, artifact management, Kubernetes.

Tasks:

- Validate source changes.
- Run automated tests.
- Scan dependencies and container images.
- Build and publish an identifiable artifact.
- Deploy to a test environment.
- Verify the deployment.
- Investigate a simulated security or release failure.
- Document release controls and rollback.

**Deliverables:** Pipeline configuration, security-check results, deployment evidence, artifact version information, and operational documentation.

---

## 🧪 5. Standard Format for Every Individual Lab

Every fully developed lab should follow a consistent professional structure.

### 1. Lab overview
- Lab title
- Module and category
- Difficulty level
- Estimated duration
- Scenario summary
- Real-world relevance

### 2. Learning objectives
State what the learner should be able to explain or perform after completing the lab.

### 3. Prerequisites
- Required tools and versions
- Required access and permissions
- Prior knowledge
- Network and infrastructure requirements
- Estimated resource cost, if applicable

### 4. Architecture and environment
Provide an architecture diagram or clear topology description. Explain the role of each component.

### 5. Task and success criteria
Describe the expected result and how success will be measured.

### 6. Step-by-step instructions
Explain each step, the reason for performing it, and any important safety considerations.

### 7. Commands and configuration
Provide tested examples, explain placeholders, and describe expected behavior.

### 8. Expected output
Show representative output or define a reliable verification procedure. Clearly label illustrative output when it has not been tested.

### 9. Troubleshooting
Include common errors, diagnostic commands, possible causes, and evidence-based remediation steps.

### 10. Validation
Use health checks, tests, resource status, logs, or other objective evidence to confirm success.

### 11. Cleanup
Explain how to remove temporary resources and confirm that unnecessary infrastructure is no longer running.

### 12. Knowledge check
Include questions that test understanding rather than memorization.

### 13. Reflection
Ask learners to document the root cause, the fix, and how they would prevent the problem in the future.

### 14. Completion checklist
Use a checklist that learners can follow. Persistent completion tracking requires additional application functionality.

---

## 📊 6. Difficulty and Assessment Standards

| Level | Expected work |
|---|---|
| Beginner | Follow guided instructions, run commands, understand output, and verify a simple task. |
| Intermediate | Investigate a failure, interpret evidence, make a configuration change, and validate the result. |
| Advanced | Solve a multi-component problem, justify trade-offs, apply security controls, and document recovery. |
| Capstone | Combine multiple tools into a complete, reproducible workflow with testing, monitoring, and documentation. |

### Recommended assessment criteria

- Task completion and correctness
- Technical understanding
- Quality of troubleshooting
- Security and operational safety
- Validation evidence
- Documentation quality
- Cleanup and cost awareness

Assessment scores, saved progress, and automatic grading should only be described as platform features after they are implemented.

---

## 🔐 7. Security and Operational Safety

Hands-on labs must teach safe operational habits.

- Use authorized local, test, or isolated lab environments.
- Never commit credentials, private keys, passwords, or access tokens.
- Follow least-privilege access principles.
- Review infrastructure plans before applying changes.
- Avoid destructive commands against production systems.
- Do not expose administrative ports or services publicly without a justified and controlled design.
- Use temporary credentials and appropriate secret-management mechanisms.
- Protect sensitive information in logs and screenshots.
- Set resource limits, budgets, and cleanup procedures for cloud labs.
- Clearly identify commands that change or delete resources.
- Validate recovery procedures before relying on them.

### Platform security requirements for future interactive labs

If DevMavox later provides browser-based terminals or cloud sandboxes, these should run in isolated environments with controlled permissions, resource limits, timeouts, credential protection, and automatic cleanup.

A web page containing commands is not, by itself, a secure terminal or execution sandbox.

---

## 🖥️ 8. Website and Platform Requirements

The learner-facing Hands-on Labs page should make it easy to discover and complete practical exercises.

### Core website experience

- Professional, responsive layout for desktop and mobile.
- Search by lab title, technology, skill, or problem.
- Filters for category and difficulty.
- Clear lab duration and prerequisites.
- Expandable lab instructions.
- Copyable commands and configuration examples.
- Expected results and verification guidance.
- Troubleshooting scenarios.
- Related labs and recommended learning paths.
- Capstone project descriptions.
- Visible safety and cleanup instructions.

### Recommended future enhancements

- Dedicated pages for individual labs.
- Detailed command outputs and architecture diagrams.
- Knowledge checks with explanations.
- User accounts and saved progress.
- Lab bookmarks and completion history.
- Downloadable starter repositories.
- Secure, isolated interactive environments.
- Automated validation and feedback.
- Administrative tools for managing lab content.

These enhancements are a roadmap, not a claim that they already exist.

---

## 🗂️ 9. Recommended Project Structure

The following is a suggested structure for future expansion. Existing project files should be reviewed before introducing or moving files.

```text
app/
└── hands-on-labs/
    ├── page.tsx
    ├── README.md
    ├── labs/
    │   ├── linux/
    │   ├── git-github/
    │   ├── shell-scripting/
    │   ├── networking/
    │   ├── docker/
    │   ├── cicd/
    │   ├── jenkins/
    │   ├── aws/
    │   ├── terraform/
    │   ├── ansible/
    │   ├── kubernetes/
    │   ├── helm/
    │   ├── argocd/
    │   ├── monitoring/
    │   ├── devsecops/
    │   └── production-troubleshooting/
    └── projects/
        ├── docker-cicd/
        ├── aws-terraform/
        ├── kubernetes-platform/
        ├── gitops-deployment/
        ├── monitoring-incident-response/
        └── devsecops-pipeline/
```

This structure is illustrative. Individual lab files can instead live in a shared data directory or content system, depending on the existing Next.js architecture.

### File responsibilities

- `page.tsx`: User-facing page and interactive components.
- `README.md`: Developer documentation, curriculum, standards, and implementation notes.
- Lab content files: Detailed instructions, prerequisites, steps, outputs, and troubleshooting.
- Project content: Integrated capstone requirements and deliverables.

A Markdown README does not automatically appear as a rendered website page.

---

## ▶️ 10. Local Development and Deployment

Run the existing project from its root directory.

```bash
npm install
npm run dev
```

Open the local route:

`http://localhost:3000/hands-on-labs`

Before deploying:

1. Check the existing `package.json` scripts.
2. Confirm the page uses dependencies available in the project.
3. Run the project's lint and build checks where configured.
4. Resolve TypeScript and build errors.
5. Test search, category filters, difficulty filters, and interactive controls.
6. Check responsive layouts and accessibility.
7. Commit the intended changes to Git.
8. Deploy through the connected Vercel project.
9. Verify the deployed route and inspect browser and build logs.

The exact deployment process depends on the existing repository and Vercel project configuration.

---

## 📈 11. Content Quality Standards

Before publishing a complete lab, confirm that:

- The scenario is realistic and technically coherent.
- Prerequisites are accurate.
- Commands and configuration have been tested where possible.
- Expected outputs are accurate or clearly marked as illustrative.
- Placeholders are explained.
- Security risks are identified.
- Destructive steps include warnings and recovery guidance.
- Troubleshooting advice is evidence-based.
- Verification steps demonstrate success.
- Cleanup instructions are provided.
- The lab has a clear learning outcome.
- Related topics and next steps are identified.

Do not label a lab production-tested unless it has actually been tested under the stated conditions.

---

## 🏁 12. Final Vision

DevMavox Hands-on Labs should grow into a structured, practical DevOps learning platform where learners progress from Linux fundamentals to cloud infrastructure, automated delivery, Kubernetes, GitOps, monitoring, security, and end-to-end engineering projects.

The defining principle is simple:

**Do not just teach learners which command to run. Teach them why it is needed, how to interpret the result, how to investigate failures, how to verify a solution, and how to prevent the same issue from recurring.**

That is the difference between a collection of tutorials and a professional hands-on learning platform.
