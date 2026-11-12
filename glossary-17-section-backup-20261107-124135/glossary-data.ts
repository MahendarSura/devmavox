import { buildBulkGlossaryLearningContent } from "./bulk-glossary-learning-content";
import { dockerGlossaryDetails } from "./docker-glossary-details";
import { kubernetesGlossaryDetails } from "./kubernetes-glossary-details";
import { cicdGlossaryDetails } from "./cicd-glossary-details";
import { gitGlossaryDetails } from "./git-glossary-details";
import { iacGlossaryDetails } from "./iac-glossary-details";
import { gitopsGlossaryDetails } from "./gitops-glossary-details";
import { monitoringGlossaryDetails } from "./monitoring-glossary-details";
import { linuxGlossaryDetails } from "./linux-glossary-details";
import { productionReliabilityGlossaryDetails } from "./production-reliability-glossary-details";
import { fundamentalsGlossaryDetails } from "./fundamentals-glossary-details";
import { devsecopsSecurityGlossaryDetails } from "./devsecops-security-glossary-details";
import { cloudAwsGlossaryDetails } from "./cloud-aws-glossary-details";
import { dockerRemainingLearningContent } from "./docker-remaining-learning-content";
import { dockerCategoryLearningContent } from "./docker-category-learning-content";
import { kubernetesCategoryLearningContent } from "./kubernetes-category-learning-content";
import { cicdCategoryLearningContent } from "./cicd-category-learning-content";
import { gitCategoryLearningContent } from "./git-category-learning-content";
import { iacCategoryLearningContent } from "./iac-category-learning-content";
import { gitopsCategoryLearningContent } from "./gitops-category-learning-content";
import { monitoringCategoryLearningContent } from "./monitoring-category-learning-content";
import { linuxCategoryLearningContent } from "./linux-category-learning-content";
import { productionReliabilityCategoryLearningContent } from "./production-reliability-category-learning-content";
import { fundamentalsCategoryLearningContent } from "./fundamentals-category-learning-content";
import { devsecopsSecurityCategoryLearningContent } from "./devsecops-security-category-learning-content";
import { cloudAwsCategoryLearningContent } from "./cloud-aws-category-learning-content";
export type GlossaryLearningSection = {
  title: string;
    teluguTitle?: string;
  items: {
    title: string;
    teluguTitle?: string;
    explanation: string;
    teluguExplanation?: string;
    example?: string;
    teluguExample?: string;
    details?: string[];
    teluguDetails?: string[];
    commands?: string[];
  }[];
};
export type GlossaryTerm = {
  name: string;
  definition: string;
  purpose: string;
  project: string;
  workflow: string[];
  commands: string[];
  mistakes: string[];
  related: string[];
  configuration?: string[];
  troubleshooting?: string[];
  bestPractices?: string[];
  securityConsiderations?: string[];
  learningContent?: GlossaryLearningSection[];
};

export type GlossaryCategory = {
  slug: string;
  title: string;
    teluguTitle?: string;
  description: string;
  purpose: string;
  icon: string;
  terms: GlossaryTerm[];
};

const makeTerms = (
  entries: [string, string, string, string[]][]
): GlossaryTerm[] =>
  entries.map(([name, definition, project, related]) => ({
    name,
    definition,
    purpose: `In a real DevOps environment, ${name} helps teams implement and operate this part of the software delivery lifecycle in a consistent and manageable way.`,
    project,
    workflow: [
      `Identify where ${name} is needed in the application delivery workflow.`,
      `Configure ${name} according to the application's environment and requirements.`,
      `Integrate it with the relevant development, infrastructure or deployment components.`,
      `Validate the result using logs, status information and application behaviour.`,
      `Document the configuration and monitor it during normal production operations.`,
    ],
    commands: [],
    mistakes: [
      `Using ${name} without understanding its role in the complete delivery workflow.`,
      "Applying configuration changes directly in production without validation.",
      "Ignoring permissions, networking and environment-specific settings.",
      "Not monitoring the result after implementation.",
    ],
    related,
    ...dockerGlossaryDetails[name],
    ...kubernetesGlossaryDetails[name],
        ...cicdGlossaryDetails[name],
        ...gitGlossaryDetails[name],
        ...iacGlossaryDetails[name],
      ...gitopsGlossaryDetails[name],
      ...monitoringGlossaryDetails[name],
      ...linuxGlossaryDetails[name],
      ...productionReliabilityGlossaryDetails[name],
      ...fundamentalsGlossaryDetails[name],
      ...cloudAwsGlossaryDetails[name],
      ...devsecopsSecurityGlossaryDetails[name],
      ...(buildBulkGlossaryLearningContent(name, definition, project, related)
        ? { learningContent: buildBulkGlossaryLearningContent(name, definition, project, related) }
        : {}),
    ...(dockerRemainingLearningContent[name]
      ? { learningContent: dockerRemainingLearningContent[name] }
      : {}),
    ...(dockerCategoryLearningContent[name]
      ? { learningContent: dockerCategoryLearningContent[name] }
      : {}),
  ...(kubernetesCategoryLearningContent[name]
    ? { learningContent: kubernetesCategoryLearningContent[name] }
    : {}),
  ...(cicdCategoryLearningContent[name]
    ? { learningContent: cicdCategoryLearningContent[name] }
    : {}),
  ...(gitCategoryLearningContent[name]
    ? { learningContent: gitCategoryLearningContent[name] }
    : {}),
  ...(iacCategoryLearningContent[name]
    ? { learningContent: iacCategoryLearningContent[name] }
    : {}),
  ...(gitopsCategoryLearningContent[name]
    ? { learningContent: gitopsCategoryLearningContent[name] }
    : {}),
  ...(monitoringCategoryLearningContent[name]
    ? { learningContent: monitoringCategoryLearningContent[name] }
    : {}),
  ...(linuxCategoryLearningContent[name]
    ? { learningContent: linuxCategoryLearningContent[name] }
    : {}),
  ...(productionReliabilityCategoryLearningContent[name]
    ? { learningContent: productionReliabilityCategoryLearningContent[name] }
    : {}),
  ...(fundamentalsCategoryLearningContent[name]
    ? { learningContent: fundamentalsCategoryLearningContent[name] }
    : {}),
  ...(devsecopsSecurityCategoryLearningContent[name]
    ? { learningContent: devsecopsSecurityCategoryLearningContent[name] }
    : {}),
  ...(cloudAwsCategoryLearningContent[name]
    ? { learningContent: cloudAwsCategoryLearningContent[name] }
    : {}),
  }));

export const glossaryCategories: GlossaryCategory[] = [
  {
    slug: "devops-fundamentals",
    title: "DevOps Fundamentals",
    description: "Understand DevOps culture, software development lifecycle and continuous software delivery.",
    purpose: "Learn how development and operations teams collaborate to plan, build, test, release and operate software.",
    icon: "workflow",
    terms: makeTerms([
      ["DevOps", "DevOps is a combination of practices, culture and automation that helps development and operations teams deliver software reliably and frequently.", "A team develops an e-commerce application, tests every code change through CI/CD and deploys approved releases to production.", ["SDLC", "CI", "CD"]],
      ["SDLC", "Software Development Life Cycle is the structured process used to plan, design, develop, test, deploy and maintain software.", "A company follows requirements, development, testing, staging, production deployment and maintenance for an online shopping application.", ["Agile", "DevOps", "CI"]],
      ["Agile", "Agile is an approach to software development that delivers work in small increments and uses regular feedback to improve the product.", "A development team delivers shopping-cart improvements in short iterations instead of waiting for one large release.", ["Scrum", "SDLC", "Sprint"]],
      ["Scrum", "Scrum is an Agile framework where teams organize work into time-boxed sprints with defined roles and regular meetings.", "A DevOps team plans infrastructure automation tasks during sprint planning and reviews completed work at the end of the sprint.", ["Agile", "Sprint", "Backlog"]],
      ["Continuous Integration", "Continuous Integration is the practice of frequently merging code changes into a shared repository and automatically building and testing them.", "Every pull request triggers compilation and automated tests before code is merged into the main branch.", ["Pipeline", "Build", "Automated Testing"]],
      ["Continuous Delivery", "Continuous Delivery keeps software in a deployable state through automated build, testing and release preparation. Production release may require approval.", "A successful pipeline deploys a tested application to staging and waits for an authorized production approval.", ["Continuous Deployment", "CI", "Release"]],
      ["Continuous Deployment", "Continuous Deployment automatically releases every change that passes the required pipeline checks into production.", "A small API change passes tests and security checks and is automatically deployed to production.", ["Continuous Delivery", "CI", "Pipeline"]],
      ["Automation", "Automation uses scripts and tools to execute repetitive tasks consistently with minimal manual intervention.", "A pipeline automatically builds an application, creates a Docker image and deploys it to Kubernetes.", ["CI/CD", "Infrastructure as Code", "Scripting"]],
      ["Collaboration", "Collaboration means development, operations, security and testing teams share responsibility, information and feedback.", "Developers and operations engineers jointly investigate a production incident using application logs and deployment history.", ["DevOps", "Agile", "Incident Management"]],
      ["Version Control", "Version control records changes to source code and configuration files so teams can review, compare and restore earlier versions.", "Developers use Git branches and pull requests to safely manage application changes.", ["Git", "Repository", "Commit"]],
    ]),
  },
  {
    slug: "cloud-computing-aws",
    title: "Cloud Computing & AWS",
    description: "Learn cloud infrastructure and the AWS services used to host production applications.",
    purpose: "Understand how applications use cloud compute, storage, networking, identity and scaling services.",
    icon: "cloud",
    terms: makeTerms([
      ["Cloud Computing", "Cloud computing provides computing, storage, networking and managed services over the internet on demand.", "A company hosts its application on AWS instead of purchasing and maintaining physical servers.", ["AWS Region", "EC2", "S3"]],
      ["AWS Region", "An AWS Region is a separate geographic area containing multiple AWS Availability Zones.", "A company selects an appropriate region to host its application close to customers and satisfy data requirements.", ["Availability Zone", "VPC", "EC2"]],
      ["Availability Zone", "An Availability Zone is an isolated location within an AWS Region designed to improve application availability.", "An application runs EC2 instances across two Availability Zones so one zone failure does not stop the entire service.", ["AWS Region", "High Availability", "Load Balancer"]],
      ["Amazon EC2", "Amazon Elastic Compute Cloud provides virtual servers where teams can install operating systems, runtimes and application software.", "A DevOps engineer launches an EC2 instance, installs Docker and runs a backend application.", ["AMI", "EBS", "Security Group"]],
      ["Amazon S3", "Amazon Simple Storage Service is object storage used to store files, backups, logs, static assets and application data.", "A deployment pipeline uploads build artifacts and backup files to an S3 bucket.", ["Bucket", "Versioning", "IAM"]],
      ["Amazon VPC", "A Virtual Private Cloud is a logically isolated network in AWS where cloud resources are launched.", "Production EC2 instances and databases run inside a VPC with controlled network access.", ["Subnet", "Route Table", "Security Group"]],
      ["Subnet", "A subnet is a range of IP addresses inside a VPC and is associated with a specific Availability Zone.", "Public subnets host internet-facing load balancers while private subnets host application servers.", ["VPC", "Route Table", "NAT Gateway"]],
      ["AWS IAM", "Identity and Access Management controls who can access AWS resources and which actions they are allowed to perform.", "A deployment pipeline assumes an IAM role that permits publishing an image without granting administrator access.", ["IAM Role", "Policy", "Least Privilege"]],
      ["Security Group", "A Security Group is a stateful virtual firewall that controls inbound and outbound traffic for supported AWS resources.", "An EC2 security group allows HTTPS traffic from users and SSH only from an approved administration network.", ["VPC", "Subnet", "Network ACL"]],
      ["Elastic Load Balancing", "Elastic Load Balancing distributes incoming application traffic across multiple registered targets.", "An Application Load Balancer distributes customer requests across healthy application instances in multiple Availability Zones.", ["Target Group", "Health Check", "Auto Scaling"]],
      ["Auto Scaling", "AWS Auto Scaling adjusts the number of running resources according to configured demand and scaling policies.", "An Auto Scaling group launches additional EC2 instances when application traffic increases.", ["EC2", "CloudWatch", "Load Balancer"]],
      ["Amazon Route 53", "Amazon Route 53 is a scalable DNS service used for domain registration, DNS routing and health checks.", "A company points its application domain to an AWS load balancer using a DNS record.", ["DNS", "Load Balancer", "Health Check"]],
    ]),
  },
  {
    slug: "containers-docker",
    title: "Containers & Docker",
    description: "Understand container technology and package applications into portable, repeatable environments.",
    purpose: "Learn how Docker images, containers, networks, storage and Compose support application delivery.",
    icon: "container",
    terms: makeTerms([
      ["Docker", "Docker is a container platform used to package and run applications with their dependencies in isolated environments.", "A team packages a Node.js backend into a Docker image and runs the same image in development, testing and production.", ["Image", "Container", "Dockerfile"]],
      ["Docker Image", "A Docker image is a read-only template containing application files, runtime dependencies and instructions required to create containers.", "A CI pipeline builds a versioned backend image and pushes it to a container registry.", ["Dockerfile", "Container", "Registry"]],
      ["Docker Container", "A Docker container is a running or stopped instance created from an image, with an isolated process environment.", "A production server runs the backend API as a container and maps its application port to a host port.", ["Image", "Docker Engine", "Port Mapping"]],
      ["Dockerfile", "A Dockerfile is a text file containing instructions used by Docker to build an image.", "The team defines the Node.js base image, copies application files, installs dependencies and specifies the startup command.", ["Image", "Build Context", "Multi-stage Build"]],
      ["Docker Engine", "Docker Engine is the client-server technology that builds and runs containers using the Docker daemon and related components.", "The Docker CLI sends build and run requests to the Docker daemon on a development or build machine.", ["Docker CLI", "Container", "Image"]],
      ["Docker Registry", "A Docker Registry stores and distributes container images so machines and deployment platforms can pull them.", "Jenkins pushes an application image to a registry and Kubernetes nodes retrieve that image during deployment.", ["Image", "Docker Hub", "Amazon ECR"]],
      ["Docker Volume", "A Docker volume provides persistent storage managed by Docker and can preserve data beyond a container's lifecycle.", "A database container stores its database files in a named volume so recreating the container does not remove the data.", ["Bind Mount", "Container", "Persistence"]],
      ["Docker Bind Mount", "A bind mount maps a specific host filesystem path into a container.", "A developer mounts the source-code directory into a development container to test changes without rebuilding the image.", ["Volume", "Container", "Filesystem"]],
      ["Docker Network", "A Docker network allows containers to communicate with each other and, when configured, with external networks.", "A frontend container communicates with a backend container by using its service name on a shared Docker network.", ["Bridge Network", "DNS", "Port Mapping"]],
      ["Docker Compose", "Docker Compose defines and runs multi-container applications using a YAML configuration file.", "A developer starts frontend, backend and database services together using one Compose project.", ["Service", "Network", "Volume"]],
      ["Multi-stage Build", "A multi-stage Docker build uses multiple build stages so the final image contains only the files and dependencies needed at runtime.", "A Node.js application is compiled in a build stage and only production output is copied into the final runtime image.", ["Dockerfile", "Image Layers", "Build Cache"]],
    ]),
  },
  {
    slug: "kubernetes",
    title: "Kubernetes & Container Orchestration",
    description: "Learn how Kubernetes schedules, exposes, scales and manages containers in production.",
    purpose: "Understand cluster architecture and the Kubernetes objects used to operate containerized workloads.",
    icon: "boxes",
    terms: makeTerms([
      ["Kubernetes Cluster", "A Kubernetes cluster is a group of control-plane and worker-node components that manage containerized workloads.", "A production application runs across several worker nodes while the control plane manages scheduling and desired state.", ["Node", "Pod", "Control Plane"]],
      ["Node", "A node is a worker machine in a Kubernetes cluster that runs Pods and the services needed to operate them.", "The scheduler places application Pods on available worker nodes according to resource requests and constraints.", ["Cluster", "Kubelet", "Pod"]],
      ["Pod", "A Pod is the smallest deployable Kubernetes unit and contains one or more containers that share networking and storage resources.", "A backend API runs inside a Pod managed by a Kubernetes Deployment.", ["Container", "Deployment", "Service"]],
      ["Deployment", "A Deployment manages stateless application Pods and provides declarative updates and rollback capabilities.", "A team updates the backend image version in a Deployment and Kubernetes gradually replaces old Pods.", ["ReplicaSet", "Pod", "Rolling Update"]],
      ["ReplicaSet", "A ReplicaSet maintains a requested number of matching Pod replicas.", "If one backend Pod stops running, the ReplicaSet creates another Pod to maintain the desired replica count.", ["Deployment", "Pod", "Replica"]],
      ["Service", "A Kubernetes Service provides a stable network endpoint for accessing a changing set of Pods.", "The frontend sends requests to the backend Service instead of depending on individual Pod IP addresses.", ["ClusterIP", "NodePort", "LoadBalancer"]],
      ["Ingress", "Ingress defines HTTP and HTTPS routing rules that direct external requests to Kubernetes Services through an Ingress controller.", "Requests for api.example.com are routed to the backend Service while app.example.com goes to the frontend Service.", ["Service", "Ingress Controller", "TLS"]],
      ["Namespace", "A Namespace provides logical separation for Kubernetes resources within a cluster.", "Development, staging and production teams organize workloads into separate namespaces with appropriate access controls.", ["RBAC", "ResourceQuota", "Cluster"]],
      ["ConfigMap", "A ConfigMap stores non-confidential configuration data that Pods can consume as environment variables or mounted files.", "A backend Pod receives its application log level and service endpoint from a ConfigMap.", ["Secret", "Pod", "Environment Variable"]],
      ["Secret", "A Kubernetes Secret stores sensitive values such as credentials and tokens for use by workloads.", "A database password is supplied to an application Pod through a Secret rather than being hardcoded in an image.", ["ConfigMap", "RBAC", "Encryption"]],
      ["Persistent Volume", "A Persistent Volume represents storage available to a Kubernetes cluster independently of an individual Pod's lifecycle.", "A database workload uses persistent storage so data remains available when its Pod is recreated.", ["PersistentVolumeClaim", "StorageClass", "StatefulSet"]],
      ["Horizontal Pod Autoscaler", "The Horizontal Pod Autoscaler adjusts the number of Pod replicas based on observed metrics and configured targets.", "The backend scales from two replicas to more replicas when CPU utilization increases.", ["Deployment", "Metrics Server", "Scaling"]],
    ]),
  },
  {
    slug: "cicd-build-automation",
    title: "CI/CD & Build Automation",
    description: "Explore pipelines, build systems, agents, artifacts and automated software delivery.",
    purpose: "Understand how source code becomes a tested, versioned and deployable application release.",
    icon: "git-branch",
    terms: makeTerms([
      ["CI/CD Pipeline", "A CI/CD pipeline is an automated sequence of stages that builds, tests, packages and may deploy application changes.", "A Jenkins pipeline checks out code, runs Maven tests, builds a Docker image and deploys it to Kubernetes.", ["Jenkins", "Build", "Deployment"]],
      ["Jenkins", "Jenkins is an automation server used to implement CI/CD pipelines and integrate development and deployment tools.", "A Jenkins controller schedules pipeline work on agents and publishes build results.", ["Pipeline", "Agent", "Plugin"]],
      ["Jenkins Agent", "A Jenkins agent is a machine or container that executes tasks assigned by the Jenkins controller.", "A Linux agent runs Maven builds and Docker commands while the controller manages pipeline scheduling.", ["Controller", "Executor", "Pipeline"]],
      ["Pipeline Stage", "A pipeline stage groups related steps into a named section such as build, test, scan or deploy.", "A pipeline uses separate Build, Unit Test, Image Scan and Deployment stages to make failures easier to identify.", ["Pipeline", "Step", "Build"]],
      ["Build", "A build is the process of compiling, packaging or assembling application source code into an output that can be tested or deployed.", "Maven compiles a Java application and packages it into a JAR or WAR artifact.", ["Maven", "Artifact", "Dependency"]],
      ["Artifact", "An artifact is a versioned output produced by a build, such as a JAR, WAR, package or container image.", "A successful pipeline stores a versioned application artifact in Nexus for later deployment.", ["Nexus", "Build", "Version"]],
      ["Maven", "Apache Maven is a build and dependency management tool commonly used for Java projects.", "A Jenkins job executes Maven goals to compile source code, run tests and package a Java application.", ["POM", "Dependency", "Artifact"]],
      ["Nexus Repository", "Nexus Repository is a repository manager used to store and distribute build artifacts and supported package formats.", "A CI pipeline uploads a versioned JAR to Nexus and deployment jobs download the approved release.", ["Artifact", "Maven", "Repository"]],
      ["Webhook", "A webhook sends an HTTP event notification from one application to another when a configured event occurs.", "A GitHub push event triggers Jenkins to start a pipeline for the updated branch.", ["GitHub", "Jenkins", "Pipeline"]],
      ["GitHub Actions", "GitHub Actions is a workflow automation platform integrated with GitHub repositories.", "A workflow runs tests and builds a Docker image whenever a pull request is opened.", ["Workflow", "Runner", "CI/CD"]],
    ]),
  },
  {
    slug: "git-version-control",
    title: "Git & Version Control",
    description: "Learn how teams track code changes, collaborate and maintain reliable source history.",
    purpose: "Understand the Git operations used in daily development and DevOps delivery workflows.",
    icon: "git-commit",
    terms: makeTerms([
      ["Git", "Git is a distributed version control system that tracks file changes and supports collaborative software development.", "Developers create branches, commit code and merge reviewed changes into the main application repository.", ["Repository", "Commit", "Branch"]],
      ["Repository", "A Git repository stores project files and their version history.", "A team maintains application source code and deployment manifests in a shared Git repository.", ["Git", "Commit", "Remote"]],
      ["Commit", "A commit is a recorded snapshot of changes in a Git repository.", "A developer commits a tested API change with a message describing the purpose of the update.", ["Branch", "Push", "History"]],
      ["Branch", "A branch is an independent line of development that allows changes to be developed without directly modifying another branch.", "A developer creates a feature branch to implement a payment feature before requesting a review.", ["Merge", "Pull Request", "Commit"]],
      ["Merge", "A merge combines changes from different Git branches into a target branch.", "After code review, a feature branch is merged into the main branch.", ["Branch", "Conflict", "Pull Request"]],
      ["Rebase", "Rebase reapplies commits on top of another base commit to create a different commit history.", "A developer updates a feature branch with the latest main branch changes before opening a pull request.", ["Merge", "Commit", "Branch"]],
      ["Pull Request", "A pull request proposes changes from one branch to another and supports review, discussion and automated checks.", "A team reviews code, runs CI checks and approves a pull request before merging it into main.", ["Branch", "Review", "CI"]],
      ["Clone", "Git clone creates a local copy of a remote repository, including its tracked history.", "A new engineer clones the application repository to begin development on a workstation.", ["Repository", "Remote", "Fetch"]],
      ["Fork", "A fork is a separate copy of a repository under another account or namespace.", "An external contributor forks a project, makes changes and submits a pull request to the original repository.", ["Clone", "Pull Request", "Remote"]],
      ["Merge Conflict", "A merge conflict occurs when Git cannot automatically combine competing changes to the same part of a file.", "Two developers edit the same Kubernetes manifest and must resolve the conflicting lines before merging.", ["Merge", "Rebase", "Pull Request"]],
      ["Git Tag", "A Git tag identifies a specific commit, often to mark a release version.", "The team tags a production release as v1.4.0 so the source version can be identified later.", ["Commit", "Release", "Version"]],
      ["GitOps", "GitOps uses Git as the source of truth for declarative infrastructure and application deployment configuration.", "Argo CD watches a Git repository and reconciles Kubernetes resources to match the committed manifests.", ["ArgoCD", "Kubernetes", "Drift Detection"]],
    ]),
  },
  {
    slug: "infrastructure-as-code",
    title: "Infrastructure as Code & Configuration Management",
    description: "Understand how infrastructure and server configuration are managed through code and automation.",
    purpose: "Learn repeatable infrastructure provisioning and configuration management practices.",
    icon: "blocks",
    terms: makeTerms([
      ["Infrastructure as Code", "Infrastructure as Code manages infrastructure through version-controlled configuration files instead of relying only on manual console operations.", "A team uses Terraform to create VPCs, subnets, security groups and compute resources consistently.", ["Terraform", "Provider", "State"]],
      ["Terraform", "Terraform is an infrastructure as code tool used to define and provision infrastructure through declarative configuration.", "A DevOps engineer defines AWS networking and compute resources in Terraform files and applies the reviewed plan.", ["Provider", "Resource", "State File"]],
      ["Terraform Provider", "A Terraform provider is a plugin that allows Terraform to interact with a platform or service API.", "The AWS provider allows Terraform to create and manage AWS infrastructure resources.", ["Terraform", "Resource", "Module"]],
      ["Terraform Resource", "A Terraform resource represents an infrastructure object that Terraform can create, update or delete.", "An aws_instance resource describes an EC2 instance and its configuration.", ["Provider", "Plan", "State File"]],
      ["Terraform State", "Terraform state records the relationship between configuration and the real infrastructure managed by Terraform.", "A team stores state securely in a remote backend and uses state locking to reduce concurrent modification risks.", ["Backend", "Resource", "Plan"]],
      ["Terraform Module", "A Terraform module is a reusable collection of Terraform configuration files that represents a logical group of infrastructure resources.", "A company creates a reusable VPC module for development, staging and production environments.", ["Resource", "Provider", "Input Variable"]],
      ["Terraform Plan", "Terraform plan previews the actions Terraform intends to take before changing infrastructure.", "An engineer reviews the plan to confirm that only the intended security group and EC2 changes will occur.", ["Apply", "State", "Resource"]],
      ["Terraform Apply", "Terraform apply executes the approved infrastructure changes described by the Terraform plan.", "After reviewing the plan, an engineer applies it to create the required production infrastructure.", ["Plan", "Provider", "State"]],
      ["Ansible", "Ansible is an automation and configuration management tool used to configure systems and orchestrate operational tasks.", "An Ansible playbook installs packages, configures services and deploys application files across Linux servers.", ["Inventory", "Playbook", "Role"]],
      ["Ansible Inventory", "Ansible inventory defines the managed hosts and groups of hosts on which automation runs.", "A team groups web servers and database servers so playbooks can target the correct machines.", ["Playbook", "Host", "Group"]],
      ["Ansible Playbook", "An Ansible playbook is a YAML file that describes automation tasks to execute against selected hosts.", "A playbook installs Nginx, copies configuration and starts the service on a group of web servers.", ["Task", "Inventory", "Role"]],
      ["Ansible Role", "An Ansible role organizes reusable tasks, variables, files, templates and handlers into a standard directory structure.", "A reusable Nginx role configures the web server consistently across multiple environments.", ["Playbook", "Task", "Handler"]],
    ]),
  },
  {
    slug: "gitops-deployment-tools",
    title: "GitOps & Deployment Tools",
    description: "Learn declarative deployments, Kubernetes packaging, synchronization and release strategies.",
    purpose: "Understand how application releases are delivered and controlled reliably in Kubernetes environments.",
    icon: "rocket",
    terms: makeTerms([
      ["Argo CD", "Argo CD is a declarative GitOps continuous delivery tool for Kubernetes that continuously compares live resources with desired configuration in Git.", "Argo CD monitors a deployment repository and synchronizes approved manifests into an EKS cluster.", ["GitOps", "Sync", "Drift Detection"]],
      ["Helm", "Helm is a package manager for Kubernetes that uses charts to define and install application resources.", "A team installs its backend application into Kubernetes using a reusable Helm chart.", ["Chart", "Release", "Values"]],
      ["Helm Chart", "A Helm chart is a package containing templates and metadata used to deploy Kubernetes resources.", "A chart defines a Deployment, Service and configuration for an application.", ["Helm", "Values.yaml", "Release"]],
      ["Helm Release", "A Helm release is an installed instance of a chart in a Kubernetes cluster.", "A team maintains separate releases of the same chart for staging and production.", ["Chart", "Upgrade", "Rollback"]],
      ["Values.yaml", "A values.yaml file supplies configuration values used by Helm chart templates.", "The production values file sets replica count, image version and resource limits for a deployment.", ["Helm Chart", "Template", "Release"]],
      ["Argo CD Sync", "Sync is the process of applying the desired Git-managed configuration to the Kubernetes cluster.", "After a reviewed manifest change is committed, Argo CD synchronizes the updated Deployment.", ["Argo CD", "GitOps", "Drift Detection"]],
      ["Configuration Drift", "Configuration drift occurs when the live system differs from the configuration defined as the intended source of truth.", "A manual production change modifies a Deployment outside Git, and Argo CD detects the difference.", ["GitOps", "Argo CD", "Reconciliation"]],
      ["Rollback", "Rollback restores an earlier known-good application or configuration version after a problematic release.", "A failed application release is reverted to the previously stable image version.", ["Release", "Helm", "Deployment"]],
      ["Canary Deployment", "A canary deployment releases a new version to a small portion of traffic or users before wider rollout.", "A new API version receives a small percentage of production traffic while engineers monitor errors and latency.", ["Blue-Green Deployment", "Rollback", "Monitoring"]],
      ["Blue-Green Deployment", "Blue-green deployment maintains two production environments and switches traffic from the old environment to the new one after validation.", "The new application version is tested in the green environment before the load balancer routes users to it.", ["Canary Deployment", "Load Balancer", "Rollback"]],
    ]),
  },
  {
    slug: "monitoring-observability",
    title: "Monitoring, Logging & Observability",
    description: "Understand how production systems expose metrics, logs, traces and actionable alerts.",
    purpose: "Learn how teams detect failures, investigate performance issues and monitor service reliability.",
    icon: "activity",
    terms: makeTerms([
      ["Metrics", "Metrics are numerical measurements collected over time to describe system or application behaviour.", "A monitoring system records CPU usage, memory consumption, request rate and API latency.", ["Prometheus", "Grafana", "SLO"]],
      ["Logs", "Logs are timestamped records of events generated by applications, operating systems and infrastructure components.", "An engineer examines backend error logs to understand why customer requests are failing.", ["Logging", "Observability", "Tracing"]],
      ["Distributed Tracing", "Distributed tracing follows a request as it travels through multiple services and records timing and dependency information.", "A trace helps identify whether a slow checkout request is delayed by the API, payment service or database.", ["Span", "Logs", "Metrics"]],
      ["Prometheus", "Prometheus is an open-source monitoring system that collects and stores time-series metrics and supports querying them with PromQL.", "Prometheus scrapes application and Kubernetes metrics for monitoring and alert evaluation.", ["PromQL", "Exporter", "Alertmanager"]],
      ["Grafana", "Grafana is an observability platform used to query, visualize and alert on metrics and other telemetry data.", "An operations team builds dashboards showing Kubernetes CPU, memory, pod health and API latency.", ["Dashboard", "Prometheus", "Alert"]],
      ["Alertmanager", "Alertmanager handles alerts generated by Prometheus, including grouping, routing, silencing and inhibition.", "Critical production alerts are routed to the on-call team while related alerts are grouped together.", ["Prometheus", "Alert", "Notification"]],
      ["Dashboard", "A dashboard is a visual collection of charts and panels that presents important system or application information.", "A production dashboard displays request rate, error rate, response time and infrastructure utilization.", ["Grafana", "Metrics", "Monitoring"]],
      ["Alert", "An alert is a notification generated when a monitored condition indicates a potential problem or required action.", "An alert notifies engineers when application error rates exceed the configured threshold.", ["Alertmanager", "Threshold", "Incident"]],
      ["SLI", "A Service Level Indicator is a measured value that represents a specific aspect of service reliability.", "A team measures the percentage of successful HTTP requests as an availability indicator.", ["SLO", "SLA", "Metrics"]],
      ["SLO", "A Service Level Objective is a target value for a service level indicator over a defined measurement period.", "A team sets a target for successful requests over a rolling 30-day period.", ["SLI", "SLA", "Error Budget"]],
      ["SLA", "A Service Level Agreement is a formal agreement that defines service expectations and may include remedies when commitments are not met.", "A cloud provider defines availability commitments and service credit conditions in its agreement.", ["SLI", "SLO", "Availability"]],
    ]),
  },
  {
    slug: "linux-networking-scripting",
    title: "Linux, Networking & Scripting",
    description: "Learn the operating system, networking and scripting concepts required for daily DevOps operations.",
    purpose: "Understand how engineers administer Linux servers, investigate connectivity and automate system tasks.",
    icon: "terminal",
    terms: makeTerms([
      ["Linux Process", "A process is a running instance of a program with its own process identifier and allocated system resources.", "An engineer checks application processes to identify whether a backend service is running or consuming excessive CPU.", ["PID", "Thread", "Systemd"]],
      ["Thread", "A thread is an execution unit within a process that shares the process's memory and resources.", "A Java application uses multiple threads to handle concurrent requests.", ["Process", "Concurrency", "CPU"]],
      ["Linux Permissions", "Linux permissions control which users and groups can read, write or execute files and directories.", "An engineer configures ownership and permissions so a service can read its configuration without exposing sensitive files.", ["chmod", "chown", "User"]],
      ["SSH", "Secure Shell is an encrypted protocol used to access remote systems and execute commands securely.", "An engineer connects to a Linux EC2 instance using an approved SSH key to investigate a deployment issue.", ["Key Pair", "Port 22", "Authentication"]],
      ["DNS", "Domain Name System translates domain names into records such as IP addresses used by clients to locate services.", "A user accesses an application domain and DNS resolves it to the configured load balancer endpoint.", ["A Record", "CNAME", "Route 53"]],
      ["TCP/IP", "TCP/IP is the network protocol suite used to communicate between systems across interconnected networks.", "An application client establishes a TCP connection to a backend service before exchanging HTTP data.", ["TCP", "IP Address", "Port"]],
      ["HTTP and HTTPS", "HTTP is an application protocol for web communication; HTTPS protects HTTP traffic using TLS encryption.", "A browser sends HTTPS requests to an application load balancer, which routes requests to backend services.", ["TLS", "Certificate", "Reverse Proxy"]],
      ["Port", "A port is a logical communication endpoint used by network protocols to direct traffic to services.", "A web server listens on port 443 for HTTPS traffic and a backend service may listen on an internal application port.", ["TCP", "Firewall", "Service"]],
      ["Firewall", "A firewall controls network traffic according to defined rules for allowed and denied connections.", "A server firewall permits approved web traffic while blocking unnecessary inbound ports.", ["Security Group", "Network ACL", "Port"]],
      ["Proxy", "A proxy is an intermediary that forwards requests between clients and destination services.", "A reverse proxy receives user requests and forwards them to backend application servers.", ["Reverse Proxy", "Load Balancer", "HTTP"]],
      ["Bash", "Bash is a command-line shell and scripting language commonly used to automate Linux administration tasks.", "A Bash script checks disk usage, validates service status and records operational results.", ["Shell Script", "Cron", "Linux"]],
      ["Cron", "Cron is a time-based job scheduler on Unix-like systems used to run commands or scripts at scheduled intervals.", "A scheduled job runs a backup script every night and records its execution status.", ["Bash", "Automation", "Backup"]],
    ]),
  },
  {
    slug: "devsecops-security",
    title: "DevSecOps & Security",
    description: "Learn security principles, identity controls, encryption and automated security checks.",
    purpose: "Understand how security is integrated into application development, infrastructure and deployment workflows.",
    icon: "shield-check",
    terms: makeTerms([
      ["Authentication", "Authentication verifies the identity of a user, service or system attempting to access a resource.", "An engineer signs in using an identity provider before accessing a cloud management console.", ["Authorization", "MFA", "Identity"]],
      ["Authorization", "Authorization determines which actions an authenticated identity is permitted to perform.", "A read-only engineer can inspect deployment status but cannot modify production infrastructure.", ["Authentication", "RBAC", "IAM"]],
      ["IAM", "Identity and Access Management defines identities, permissions and access policies for systems and cloud resources.", "A CI/CD workload receives a restricted identity that can publish an image but cannot administer the account.", ["Role", "Policy", "Least Privilege"]],
      ["RBAC", "Role-Based Access Control assigns permissions through roles associated with users or service identities.", "Kubernetes RBAC allows developers to view Pods in a namespace without granting cluster administrator permissions.", ["Role", "RoleBinding", "Authorization"]],
      ["Encryption", "Encryption transforms readable information into protected data that can only be recovered by authorized parties with the required key.", "An application encrypts sensitive data at rest and protects network communication in transit.", ["TLS", "KMS", "Key Management"]],
      ["TLS", "Transport Layer Security protects network communication by providing encryption, integrity and server authentication.", "An HTTPS endpoint uses a valid TLS certificate to protect communication between users and the application.", ["HTTPS", "Certificate", "Encryption"]],
      ["Secrets Management", "Secrets management securely stores, controls access to and rotates sensitive values such as passwords, API keys and tokens.", "A deployment workload retrieves database credentials from a managed secret store instead of storing them in source code.", ["Secret", "IAM", "Encryption"]],
      ["Vulnerability Scanning", "Vulnerability scanning checks software, dependencies, systems or images for known security weaknesses.", "A CI pipeline scans application dependencies and blocks a release when a critical vulnerability violates policy.", ["CVE", "SAST", "Image Scanning"]],
      ["Container Image Scanning", "Container image scanning examines image operating-system packages and application dependencies for known vulnerabilities and policy violations.", "A pipeline scans a Docker image before pushing it to the production registry.", ["Docker Image", "Vulnerability", "CI/CD"]],
      ["Least Privilege", "Least privilege means granting an identity only the permissions required to perform its approved responsibilities.", "A deployment role can update one application namespace but cannot delete unrelated cluster resources.", ["IAM", "RBAC", "Authorization"]],
    ]),
  },
  {
    slug: "production-reliability",
    title: "Production & Reliability Engineering",
    description: "Understand availability, resilience, disaster recovery and production incident management.",
    purpose: "Learn how engineering teams prevent failures, reduce service impact and recover production systems.",
    icon: "heart-pulse",
    terms: makeTerms([
      ["High Availability", "High Availability is the design of systems to remain accessible with minimal interruption when individual components fail.", "An application runs across multiple Availability Zones behind a load balancer with health checks.", ["Fault Tolerance", "Load Balancer", "Failover"]],
      ["Scalability", "Scalability is the ability of a system to handle increased workload by adding or improving resources.", "A backend scales horizontally by adding application replicas when customer traffic increases.", ["Horizontal Scaling", "Vertical Scaling", "Auto Scaling"]],
      ["Fault Tolerance", "Fault tolerance is the ability of a system to continue operating when one or more components fail.", "A service uses redundant instances and replicated data to continue operating during an infrastructure failure.", ["High Availability", "Redundancy", "Failover"]],
      ["Disaster Recovery", "Disaster Recovery is the set of plans and technical procedures used to restore systems after a major disruption.", "A company restores application infrastructure and data in a recovery region after a regional outage.", ["RTO", "RPO", "Backup"]],
      ["RTO", "Recovery Time Objective defines the maximum targeted time to restore a service after a disruption.", "A critical application has a recovery target of two hours, guiding the disaster recovery design.", ["RPO", "Disaster Recovery", "Recovery"]],
      ["RPO", "Recovery Point Objective defines the maximum targeted amount of data loss measured in time after a disruption.", "A database with a 15-minute RPO needs backup or replication methods that limit data loss to that window.", ["RTO", "Backup", "Replication"]],
      ["Root Cause Analysis", "Root Cause Analysis is a structured investigation to identify the underlying reasons an incident occurred.", "After an outage, engineers correlate deployment changes, metrics and logs to identify the actual failure mechanism.", ["Incident Management", "Postmortem", "MTTR"]],
      ["Incident Management", "Incident Management is the process of detecting, coordinating, communicating and resolving service-impacting events.", "An on-call engineer acknowledges a production alert, coordinates investigation and communicates recovery progress.", ["Alert", "RCA", "Postmortem"]],
      ["MTTR", "Mean Time to Recovery or Repair is a reliability measurement describing the average time required to restore service after failures.", "A team tracks incident recovery duration to evaluate whether operational improvements are reducing downtime.", ["Incident Management", "RCA", "Availability"]],
      ["Backup", "A backup is a recoverable copy of data or configuration kept separately to support restoration after loss or corruption.", "A database is backed up on a schedule and restoration is tested to confirm that recovery works.", ["Restore", "RPO", "Disaster Recovery"]],
      ["Recovery", "Recovery is the process of restoring an application, service or data to an operational state after failure.", "Engineers restore database data, validate application health and return traffic after an outage.", ["Backup", "RTO", "Disaster Recovery"]],
    ]),
  },
];

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getCategory(slug: string) {
  return glossaryCategories.find((category) => category.slug === slug);
}

export function getTerm(categorySlug: string, termSlug: string) {
  const category = getCategory(categorySlug);
  return category?.terms.find((term) => slugify(term.name) === termSlug);
}

export function getAllTermParams() {
  return glossaryCategories.flatMap((category) =>
    category.terms.map((term) => ({
      category: category.slug,
      term: slugify(term.name),
    }))
  );
}



























