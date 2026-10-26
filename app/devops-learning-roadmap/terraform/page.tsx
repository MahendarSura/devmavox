
"use client";

import { useMemo, useState } from "react";

type Lesson = {
  title: string;
  topics: string[];
  outcome: string;
};

type Module = {
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Production";
  duration: string;
  objective: string;
  lessons: Lesson[];
};

const modules: Module[] = [
  {
    title: "1. Infrastructure as Code Fundamentals",
    level: "Beginner",
    duration: "3–4 hours",
    objective: "Understand why infrastructure automation is essential in modern DevOps.",
    lessons: [
      {
        title: "Infrastructure Management Concepts",
        topics: [
          "What is infrastructure and cloud infrastructure?",
          "Manual infrastructure provisioning and its limitations",
          "What is Infrastructure as Code (IaC)?",
          "Declarative versus imperative infrastructure management",
          "Benefits of repeatability, consistency and version control",
          "Infrastructure provisioning versus configuration management",
          "Terraform versus Ansible, CloudFormation and Pulumi",
          "Terraform use cases in DevOps and platform engineering",
        ],
        outcome: "Explain IaC and identify when Terraform is the right tool.",
      },
      {
        title: "Terraform Architecture and Workflow",
        topics: [
          "Terraform CLI and configuration files",
          "Providers and resource plugins",
          "Terraform configuration and dependency graph",
          "State file and resource tracking",
          "Plan and apply workflow",
          "Desired configuration versus real infrastructure",
          "Terraform execution lifecycle",
          "Declarative configuration and dependency ordering",
        ],
        outcome: "Understand how Terraform converts configuration into infrastructure changes.",
      },
    ],
  },
  {
    title: "2. Installation and Environment Setup",
    level: "Beginner",
    duration: "3–4 hours",
    objective: "Set up Terraform and a cloud environment safely.",
    lessons: [
      {
        title: "Terraform Installation",
        topics: [
          "Install Terraform on Windows, Linux and macOS",
          "Verify installation using terraform version",
          "Understand PATH and executable locations",
          "Use the Terraform CLI",
          "Terraform version constraints",
          "Terraform CLI configuration overview",
          "Understand providers and provider downloads",
        ],
        outcome: "Install Terraform and run commands from a terminal.",
      },
      {
        title: "Cloud Credentials and Setup",
        topics: [
          "Install and configure the AWS CLI",
          "Understand AWS accounts, regions and availability zones",
          "IAM users versus IAM roles",
          "Use environment-based credentials where appropriate",
          "Use AWS profiles for separate environments",
          "Avoid hardcoding access keys in configuration",
          "Verify identity using aws sts get-caller-identity",
          "Understand credential precedence and temporary credentials",
        ],
        outcome: "Connect Terraform to a cloud account using secure authentication.",
      },
    ],
  },
  {
    title: "3. Terraform Project Structure and HCL",
    level: "Beginner",
    duration: "4–5 hours",
    objective: "Write valid, readable Terraform configuration.",
    lessons: [
      {
        title: "Terraform Files and Blocks",
        topics: [
          "main.tf, variables.tf, outputs.tf and providers.tf",
          "terraform block and required_version",
          "provider blocks",
          "resource and data blocks",
          "Local values and output blocks",
          "Comments and file organization",
          "Terraform automatically loads .tf files",
          "Organize configurations by responsibility",
        ],
        outcome: "Create a structured Terraform project using standard file conventions.",
      },
      {
        title: "HCL Language Fundamentals",
        topics: [
          "HCL syntax and expressions",
          "Strings, numbers, booleans and null",
          "Lists, tuples, sets, maps and objects",
          "Interpolation and template expressions",
          "Conditional expressions",
          "For expressions and transformations",
          "Built-in functions",
          "References and expression evaluation",
        ],
        outcome: "Read and write practical HCL expressions.",
      },
      {
        title: "Formatting and Validation",
        topics: [
          "terraform fmt",
          "terraform validate",
          "terraform init",
          "Understand initialization errors",
          "Inspect Terraform configuration",
          "Use terraform console for expression testing",
          "Provider and Terraform version compatibility",
        ],
        outcome: "Validate and maintain consistent Terraform code.",
      },
    ],
  },
  {
    title: "4. Providers, Resources and Data Sources",
    level: "Beginner",
    duration: "5–6 hours",
    objective: "Learn how Terraform interacts with cloud resources.",
    lessons: [
      {
        title: "Provider Management",
        topics: [
          "Configure the AWS provider",
          "Provider source addresses and versions",
          "required_providers configuration",
          "Provider aliases",
          "Multiple AWS regions and accounts",
          "Provider configuration references",
          "Provider authentication",
          "Understand .terraform.lock.hcl",
        ],
        outcome: "Configure providers and manage their versions reliably.",
      },
      {
        title: "Resources and Dependencies",
        topics: [
          "Resource block structure",
          "Resource arguments and attributes",
          "Resource references",
          "Implicit dependencies",
          "Explicit depends_on",
          "Resource naming and tagging",
          "Resource lifecycle overview",
          "Understand creation, update and deletion plans",
        ],
        outcome: "Provision infrastructure resources and understand their relationships.",
      },
      {
        title: "Data Sources",
        topics: [
          "What are data sources?",
          "Look up an existing VPC",
          "Discover existing subnets and security groups",
          "Read AMI information",
          "Distinguish data sources from managed resources",
          "Use data-source results in resource configuration",
          "Understand when data is evaluated",
        ],
        outcome: "Reuse existing infrastructure information without managing it as a new resource.",
      },
    ],
  },
  {
    title: "5. Input Variables, Locals and Outputs",
    level: "Beginner",
    duration: "4–5 hours",
    objective: "Make Terraform configurations reusable and configurable.",
    lessons: [
      {
        title: "Input Variables",
        topics: [
          "variable blocks and descriptions",
          "Variable types and defaults",
          "Required and optional variables",
          "Validation conditions",
          "Sensitive variables and sensitive values",
          "Pass values using -var and -var-file",
          "terraform.tfvars and auto.tfvars files",
          "Environment variable naming with TF_VAR_",
          "Variable precedence",
        ],
        outcome: "Create configurable infrastructure without duplicating code.",
      },
      {
        title: "Locals and Outputs",
        topics: [
          "Define local values",
          "Reuse expressions with locals",
          "Output blocks and descriptions",
          "Sensitive outputs",
          "Reference outputs from resources",
          "Inspect outputs with terraform output",
          "Root module versus child module outputs",
        ],
        outcome: "Simplify expressions and expose useful infrastructure information.",
      },
      {
        title: "Configuration Design",
        topics: [
          "Separate environment-specific values from reusable code",
          "Use consistent naming conventions",
          "Avoid unnecessary hardcoded values",
          "Validate CIDR blocks and other input constraints",
          "Avoid exposing secrets in outputs and logs",
          "Document variable expectations",
        ],
        outcome: "Design maintainable configurations for multiple environments.",
      },
    ],
  },
  {
    title: "6. Terraform Commands and Execution Lifecycle",
    level: "Intermediate",
    duration: "4–5 hours",
    objective: "Operate Terraform through a controlled plan-and-apply workflow.",
    lessons: [
      {
        title: "Core CLI Commands",
        topics: [
          "terraform init",
          "terraform fmt",
          "terraform validate",
          "terraform plan",
          "terraform apply",
          "terraform destroy",
          "terraform output",
          "terraform show",
          "terraform providers",
        ],
        outcome: "Use the core Terraform workflow from initialization through deployment.",
      },
      {
        title: "Plan and Apply Safely",
        topics: [
          "Review planned resource changes",
          "Create and apply saved plan files",
          "Understand refresh and planning behavior",
          "Use -out for controlled deployment workflows",
          "Understand plan exit codes in automation",
          "Review replacements and destructive changes",
          "Avoid blind approval of production plans",
          "Re-plan when configuration or infrastructure changes",
        ],
        outcome: "Apply reviewed infrastructure changes predictably.",
      },
      {
        title: "Lifecycle Meta-Arguments",
        topics: [
          "create_before_destroy",
          "prevent_destroy",
          "ignore_changes",
          "replace_triggered_by",
          "Understand lifecycle behavior and limitations",
          "Manage dependencies and replacement operations",
          "Use lifecycle settings only for justified requirements",
        ],
        outcome: "Control resource lifecycle behavior with appropriate safeguards.",
      },
    ],
  },
  {
    title: "7. Terraform State Management",
    level: "Intermediate",
    duration: "5–6 hours",
    objective: "Understand the state file and protect the mapping between configuration and infrastructure.",
    lessons: [
      {
        title: "State Fundamentals",
        topics: [
          "What is terraform.tfstate?",
          "Why Terraform needs state",
          "Resource address and state mapping",
          "State metadata and serial numbers",
          "Terraform state refresh concepts",
          "terraform state list",
          "terraform state show",
          "State backups and recovery considerations",
        ],
        outcome: "Explain state and inspect managed resources safely.",
      },
      {
        title: "State Operations",
        topics: [
          "terraform state mv",
          "terraform state rm",
          "terraform state pull",
          "terraform state push and its risks",
          "terraform state replace-provider",
          "Move resource addresses after refactoring",
          "Understand state locking",
          "Why manual state-file editing is risky",
        ],
        outcome: "Perform necessary state maintenance with a recovery plan.",
      },
      {
        title: "State Drift and Refresh",
        topics: [
          "What is configuration drift?",
          "Manual changes made in the cloud console",
          "Detect drift using plans",
          "Decide whether to update code or infrastructure",
          "Refresh-only planning and applying",
          "Understand when refresh changes state",
          "Avoid overwriting legitimate external changes",
        ],
        outcome: "Identify and resolve differences between declared and actual infrastructure.",
      },
    ],
  },
  {
    title: "8. Remote Backends and Team Collaboration",
    level: "Production",
    duration: "5–6 hours",
    objective: "Share Terraform state safely across engineers and CI/CD pipelines.",
    lessons: [
      {
        title: "Remote State Fundamentals",
        topics: [
          "Local versus remote state",
          "Why local state is unsuitable for many teams",
          "Configure the S3 backend",
          "Understand backend initialization",
          "Backend configuration and partial configuration",
          "Backend migration with terraform init -migrate-state",
          "State access permissions",
          "Separate state by environment and responsibility",
        ],
        outcome: "Store Terraform state in an appropriate shared backend.",
      },
      {
        title: "State Locking and Recovery",
        topics: [
          "Why concurrent state changes are dangerous",
          "State locking and supported backend behavior",
          "DynamoDB-based locking in legacy S3 setups",
          "S3 lockfile support where available",
          "Understand lock acquisition failures",
          "terraform force-unlock and its risks",
          "Never unlock another active operation blindly",
          "State backup and incident recovery procedures",
        ],
        outcome: "Prevent conflicting operations and recover from locking issues safely.",
      },
      {
        title: "Team and Environment Isolation",
        topics: [
          "Development, staging and production state",
          "Separate backend keys or state locations",
          "Workspace concepts and limitations",
          "Use distinct credentials and permissions",
          "Avoid mixing unrelated infrastructure in one state",
          "Manage access to state files as sensitive data",
          "Document ownership and deployment procedures",
        ],
        outcome: "Establish clear boundaries for teams and environments.",
      },
    ],
  },
  {
    title: "9. Terraform Modules and Reusability",
    level: "Intermediate",
    duration: "5–6 hours",
    objective: "Build reusable infrastructure components for consistent deployments.",
    lessons: [
      {
        title: "Module Fundamentals",
        topics: [
          "Root modules and child modules",
          "Module directory structure",
          "Module input variables",
          "Module outputs",
          "Call modules using module blocks",
          "Pass provider configurations",
          "Understand module source addresses",
          "Reuse modules without duplicating resource definitions",
        ],
        outcome: "Build a reusable module and consume it from a root configuration.",
      },
      {
        title: "Module Sources and Versions",
        topics: [
          "Local module sources",
          "Git repository module sources",
          "Registry modules",
          "Pin Git module references and registry versions",
          "Module version constraints",
          "Update module versions intentionally",
          "Review module inputs and outputs",
          "Avoid unreviewed module upgrades",
        ],
        outcome: "Consume and version reusable modules responsibly.",
      },
      {
        title: "Enterprise Module Design",
        topics: [
          "Design a VPC module",
          "Design reusable security group configuration",
          "Compose modules for larger architectures",
          "Use consistent tags and naming",
          "Input validation and meaningful defaults",
          "Module documentation and examples",
          "Module testing and compatibility",
          "Avoid overly generic module interfaces",
        ],
        outcome: "Design modules that teams can maintain and reuse.",
      },
    ],
  },
  {
    title: "10. Advanced Terraform Expressions and Resource Patterns",
    level: "Advanced",
    duration: "4–5 hours",
    objective: "Handle complex infrastructure requirements with predictable resource definitions.",
    lessons: [
      {
        title: "Iteration and Dynamic Configuration",
        topics: [
          "count and count.index",
          "for_each with maps and sets",
          "Choose between count and for_each",
          "Dynamic blocks",
          "for expressions",
          "Conditional resource creation",
          "Optional object attributes",
          "Stable resource addresses and refactoring risks",
        ],
        outcome: "Create repeatable resource collections with stable identities.",
      },
      {
        title: "Advanced Resource Design",
        topics: [
          "Resource dependencies and graph ordering",
          "Multiple provider configurations",
          "Import blocks for existing resources",
          "Moved blocks for resource refactoring",
          "Removed blocks and state removal workflows",
          "Ephemeral values and write-only arguments where supported",
          "Understand unknown values during planning",
          "Avoid unnecessary provisioners",
        ],
        outcome: "Manage advanced resource relationships and configuration changes.",
      },
    ],
  },
  {
    title: "11. AWS Infrastructure with Terraform",
    level: "Intermediate",
    duration: "1–2 weeks",
    objective: "Provision common AWS infrastructure using reusable Terraform code.",
    lessons: [
      {
        title: "Networking: VPC and Subnets",
        topics: [
          "Create a VPC and define CIDR ranges",
          "Create public and private subnets",
          "Configure internet gateways",
          "Configure NAT gateways and routing",
          "Route tables and subnet associations",
          "Availability zones and subnet distribution",
          "Security groups and network ACLs",
          "Network architecture and cost considerations",
        ],
        outcome: "Build a basic AWS network with appropriate traffic boundaries.",
      },
      {
        title: "Compute and Load Balancing",
        topics: [
          "Create EC2 instances",
          "Use data sources to discover AMIs",
          "Configure instance profiles and IAM roles",
          "Attach security groups",
          "Configure Application Load Balancers",
          "Create target groups and health checks",
          "Use Auto Scaling Groups",
          "Reference networking module outputs",
        ],
        outcome: "Deploy a scalable compute environment using Terraform.",
      },
      {
        title: "Storage, Databases and DNS",
        topics: [
          "Create S3 buckets with secure defaults",
          "Configure versioning and encryption",
          "Manage EBS volumes",
          "Provision RDS resources",
          "Configure backup and retention settings",
          "Manage Route 53 records",
          "Use secrets management services",
          "Understand resource dependencies and deletion risks",
        ],
        outcome: "Provision storage, database and DNS resources with suitable safeguards.",
      },
      {
        title: "EKS Infrastructure Overview",
        topics: [
          "Provision an EKS cluster using supported modules or resources",
          "Understand cluster IAM roles",
          "Configure worker nodes or managed node groups",
          "Configure VPC networking and subnets",
          "Understand cluster endpoint access",
          "Manage add-ons and version compatibility",
          "Separate cluster infrastructure from application deployment",
          "Plan for upgrades, costs and resource cleanup",
        ],
        outcome: "Understand how Terraform can provision the infrastructure for Kubernetes.",
      },
    ],
  },
  {
    title: "12. Terraform Workspaces and Multi-Environment Design",
    level: "Advanced",
    duration: "4–5 hours",
    objective: "Choose an environment strategy that supports safe releases and clear ownership.",
    lessons: [
      {
        title: "Workspace Concepts",
        topics: [
          "Default and named workspaces",
          "terraform workspace list",
          "terraform workspace new and select",
          "Workspace-specific state",
          "Use terraform.workspace carefully",
          "Workspace limitations for strongly isolated environments",
          "Understand workspace and backend interactions",
        ],
        outcome: "Use workspaces appropriately without confusing environment isolation.",
      },
      {
        title: "Environment Architecture",
        topics: [
          "Separate environment directories",
          "Shared modules with environment-specific inputs",
          "Separate production state and credentials",
          "Environment-specific backend configuration",
          "Promote changes through review stages",
          "Manage regional differences",
          "Prevent accidental production deployments",
        ],
        outcome: "Design a repeatable multi-environment Terraform repository.",
      },
    ],
  },
  {
    title: "13. Terraform Testing and Code Quality",
    level: "Advanced",
    duration: "4–5 hours",
    objective: "Catch configuration errors before infrastructure changes reach production.",
    lessons: [
      {
        title: "Testing Fundamentals",
        topics: [
          "terraform fmt and terraform validate",
          "Plan review and automated plan checks",
          "Terraform test framework and test files",
          "Mock providers where supported",
          "Test module inputs and outputs",
          "Use disposable environments for integration tests",
          "Understand the cost and risk of real infrastructure tests",
        ],
        outcome: "Create a practical validation and testing strategy.",
      },
      {
        title: "Static Analysis and Policy",
        topics: [
          "TFLint",
          "Checkov and tfsec concepts",
          "Terraform configuration scanning",
          "Policy as code concepts",
          "OPA and Sentinel overview",
          "Enforce encryption and tagging requirements",
          "Validate public exposure and IAM permissions",
          "Handle false positives through documented review",
        ],
        outcome: "Detect insecure or inconsistent infrastructure definitions early.",
      },
    ],
  },
  {
    title: "14. Terraform with CI/CD",
    level: "Production",
    duration: "5–6 hours",
    objective: "Build a controlled infrastructure delivery workflow.",
    lessons: [
      {
        title: "Pipeline Architecture",
        topics: [
          "Terraform in Jenkins",
          "Terraform in GitHub Actions",
          "Format, validate and test stages",
          "Generate a saved plan for review",
          "Plan review and approval gates",
          "Apply the reviewed plan",
          "Manage credentials using secure pipeline integrations",
          "Pin Terraform and provider versions",
        ],
        outcome: "Create a repeatable Terraform CI/CD workflow.",
      },
      {
        title: "Pull Request and Release Controls",
        topics: [
          "Run plans for pull requests",
          "Publish plan summaries securely",
          "Avoid exposing sensitive plan information",
          "Restrict production apply permissions",
          "Use protected branches and required checks",
          "Prevent two pipelines from modifying the same state concurrently",
          "Handle stale plans and changed state",
          "Record deployment metadata and outcomes",
        ],
        outcome: "Implement reviewable and controlled infrastructure changes.",
      },
      {
        title: "Automation Reliability",
        topics: [
          "Idempotent infrastructure workflows",
          "Pipeline exit codes and failure handling",
          "Plan and apply separation",
          "Cancellation and interrupted operations",
          "Retry only safe operations",
          "State lock timeout handling",
          "Approval audit trails",
          "Post-deployment verification",
        ],
        outcome: "Improve the reliability and auditability of automated infrastructure deployments.",
      },
    ],
  },
  {
    title: "15. Terraform Security and Governance",
    level: "Production",
    duration: "5–6 hours",
    objective: "Protect credentials, state and cloud infrastructure throughout the IaC lifecycle.",
    lessons: [
      {
        title: "Identity and Access Management",
        topics: [
          "Least-privilege IAM policies",
          "Temporary credentials and role assumption",
          "OIDC-based CI authentication where supported",
          "Separate developer and deployment roles",
          "Limit production apply permissions",
          "Review provider and module sources",
          "Audit cloud activity and deployment identities",
        ],
        outcome: "Reduce the risk of excessive permissions and long-lived credentials.",
      },
      {
        title: "Secrets and State Security",
        topics: [
          "Sensitive variables do not automatically encrypt state",
          "Understand where secrets can appear in state and plan files",
          "Encrypt remote state at rest",
          "Use TLS and restrict backend access",
          "Avoid committing tfstate and plan files",
          "Use .gitignore and repository secret scanning",
          "Use a secret manager for sensitive values",
          "Define state retention and recovery procedures",
        ],
        outcome: "Protect sensitive infrastructure data and access credentials.",
      },
      {
        title: "Governance and Compliance",
        topics: [
          "Mandatory resource tags",
          "Encryption requirements",
          "Restrict public storage and network exposure",
          "Policy-as-code checks",
          "Audit changes and approvals",
          "Separate duties between plan and apply",
          "Document exceptions and remediation",
          "Cost and compliance controls",
        ],
        outcome: "Apply consistent infrastructure governance across environments.",
      },
    ],
  },
  {
    title: "16. Terraform Performance and Cost Optimization",
    level: "Advanced",
    duration: "3–4 hours",
    objective: "Improve Terraform workflow efficiency and control infrastructure spending.",
    lessons: [
      {
        title: "Workflow Optimization",
        topics: [
          "Keep state boundaries manageable",
          "Avoid unnecessary data-source lookups",
          "Understand refresh and planning overhead",
          "Review dependency graph bottlenecks",
          "Use parallelism settings carefully",
          "Cache provider downloads in CI where appropriate",
          "Pin dependencies and reduce unnecessary upgrades",
          "Use targeted operations only for justified recovery scenarios",
        ],
        outcome: "Improve workflow performance without sacrificing correctness.",
      },
      {
        title: "Cloud Cost Controls",
        topics: [
          "Estimate infrastructure cost before applying changes",
          "Understand NAT gateway and load balancer costs",
          "Tag resources for cost allocation",
          "Review expensive replacements",
          "Clean up temporary environments",
          "Set budgets and cost alerts in the cloud platform",
          "Avoid accidental resource recreation",
        ],
        outcome: "Make cost-aware infrastructure decisions.",
      },
    ],
  },
  {
    title: "17. Production Troubleshooting and Recovery",
    level: "Production",
    duration: "5–6 hours",
    objective: "Diagnose failures methodically and recover without damaging infrastructure state.",
    lessons: [
      {
        title: "Initialization and Provider Errors",
        topics: [
          "terraform init fails",
          "Provider download or registry errors",
          "Provider version conflicts",
          "Invalid provider configuration",
          "AWS credential and region errors",
          "Proxy, network and certificate issues",
          "Lock file and dependency troubleshooting",
        ],
        outcome: "Resolve initialization and provider configuration problems.",
      },
      {
        title: "Plan and Apply Failures",
        topics: [
          "Invalid configuration and type mismatch",
          "Missing required arguments",
          "Dependency cycle errors",
          "AWS AccessDenied failures",
          "Resource already exists",
          "API throttling and eventual consistency",
          "Resource replacement unexpectedly planned",
          "Interrupted or partially failed applies",
        ],
        outcome: "Identify root causes and choose safe remediation steps.",
      },
      {
        title: "State and Drift Incidents",
        topics: [
          "State lock acquisition failures",
          "Remote backend access denied",
          "Resource drift after console changes",
          "Resource missing from state",
          "State and configuration address mismatch",
          "Recovery from accidental resource deletion",
          "Safe import and state migration",
          "Escalation, backups and change documentation",
        ],
        outcome: "Recover state and infrastructure with a documented safety plan.",
      },
    ],
  },
  {
    title: "18. Import, Migration and Refactoring",
    level: "Advanced",
    duration: "4–5 hours",
    objective: "Adopt existing infrastructure and safely restructure established Terraform projects.",
    lessons: [
      {
        title: "Import Existing Resources",
        topics: [
          "Why import is needed",
          "Write configuration for existing resources",
          "Use import blocks",
          "Use terraform import where appropriate",
          "Identify the correct resource address and identifier",
          "Review plans after import",
          "Avoid duplicate resource management",
        ],
        outcome: "Bring existing infrastructure under Terraform management.",
      },
      {
        title: "Migration and Refactoring",
        topics: [
          "Move resources into modules",
          "Use moved blocks",
          "Rename resource addresses safely",
          "Change provider configurations carefully",
          "Migrate local state to a remote backend",
          "Transfer resource ownership between states with care",
          "Review migration plans before applying",
          "Document rollback and recovery steps",
        ],
        outcome: "Refactor established configurations without unintended resource recreation.",
      },
    ],
  },
  {
    title: "19. Production Projects",
    level: "Production",
    duration: "2–3 weeks",
    objective: "Demonstrate Terraform skills through realistic infrastructure projects.",
    lessons: [
      {
        title: "Project 1 — AWS VPC and EC2",
        topics: [
          "Create a dedicated Terraform repository",
          "Define a VPC and subnets",
          "Configure routing and security groups",
          "Provision an EC2 instance",
          "Use variables and outputs",
          "Validate and review the plan",
          "Deploy and verify connectivity",
          "Destroy temporary resources when finished",
        ],
        outcome: "Build and manage a basic AWS infrastructure stack.",
      },
      {
        title: "Project 2 — Reusable VPC Module",
        topics: [
          "Create a reusable VPC module",
          "Define inputs, validation and outputs",
          "Create public and private subnet configurations",
          "Use the module from a root configuration",
          "Separate development and production inputs",
          "Test module changes",
          "Document the module interface",
        ],
        outcome: "Build reusable infrastructure components for multiple environments.",
      },
      {
        title: "Project 3 — Remote State and Team Workflow",
        topics: [
          "Configure an S3 remote backend",
          "Configure state encryption and access permissions",
          "Use supported state locking",
          "Separate environment state",
          "Migrate state safely if needed",
          "Validate locking and permissions",
          "Document recovery procedures",
        ],
        outcome: "Prepare shared Terraform infrastructure for team usage.",
      },
      {
        title: "Project 4 — Terraform CI/CD Pipeline",
        topics: [
          "Connect a repository to Jenkins or GitHub Actions",
          "Run formatting and validation checks",
          "Generate a plan for pull requests",
          "Configure a protected production approval step",
          "Apply a reviewed plan",
          "Store credentials securely",
          "Capture execution logs and deployment metadata",
          "Test failure handling",
        ],
        outcome: "Build a controlled infrastructure delivery pipeline.",
      },
      {
        title: "Project 5 — Production Infrastructure Architecture",
        topics: [
          "Design a VPC, subnets and routing",
          "Provision a load balancer and compute resources",
          "Configure IAM roles and security boundaries",
          "Use reusable modules",
          "Enable remote state and state locking",
          "Add policy and security checks",
          "Review costs, backups and operational risks",
          "Document the architecture and disaster recovery approach",
        ],
        outcome: "Present an end-to-end Terraform architecture suitable for a portfolio.",
      },
    ],
  },
  {
    title: "20. Terraform Interview and Career Readiness",
    level: "Advanced",
    duration: "4–5 hours",
    objective: "Explain Terraform concepts clearly and solve scenario-based DevOps interview questions.",
    lessons: [
      {
        title: "Core Technical Questions",
        topics: [
          "What is Terraform and how does it work?",
          "Provider versus resource versus data source",
          "Variables versus locals versus outputs",
          "Terraform plan versus apply",
          "What is a state file?",
          "Local versus remote state",
          "What is state locking?",
          "Module versus workspace",
          "count versus for_each",
          "depends_on versus implicit dependencies",
        ],
        outcome: "Explain Terraform's most important concepts with examples.",
      },
      {
        title: "Advanced Scenario Questions",
        topics: [
          "How do you detect and resolve drift?",
          "How do you import existing infrastructure?",
          "How do you prevent accidental production destruction?",
          "How do you recover from a state lock error?",
          "How do you migrate local state to a remote backend?",
          "How do you secure Terraform in CI/CD?",
          "How do you handle unexpected resource replacement?",
          "How do you structure multiple environments?",
          "How do you investigate a failed apply?",
          "How do you prevent concurrent deployments?",
        ],
        outcome: "Demonstrate production-oriented reasoning in technical interviews.",
      },
    ],
  },
];

const levelStyles: Record<Module["level"], string> = {
  Beginner: "bg-emerald-100 text-emerald-800",
  Intermediate: "bg-blue-100 text-blue-800",
  Advanced: "bg-violet-100 text-violet-800",
  Production: "bg-orange-100 text-orange-800",
};

export default function TerraformRoadmapPage() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [expanded, setExpanded] = useState<number[]>([0]);
  const [completed, setCompleted] = useState<string[]>([]);

  const totalLessons = modules.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  );

  const completedCount = completed.length;
  const progress =
    totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  const visibleModules = useMemo(() => {
    const query = search.trim().toLowerCase();

    return modules
      .map((module, index) => ({ ...module, originalIndex: index }))
      .filter((module) => level === "All" || module.level === level)
      .filter((module) => {
        if (!query) return true;

        return (
          module.title.toLowerCase().includes(query) ||
          module.objective.toLowerCase().includes(query) ||
          module.lessons.some(
            (lesson) =>
              lesson.title.toLowerCase().includes(query) ||
              lesson.outcome.toLowerCase().includes(query) ||
              lesson.topics.some((topic) =>
                topic.toLowerCase().includes(query)
              )
          )
        );
      });
  }, [search, level]);

  function toggleLesson(key: string) {
    setCompleted((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key]
    );
  }

  function toggleModule(index: number) {
    setExpanded((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  }

  function toggleAllVisible() {
    const indexes = visibleModules.map((module) => module.originalIndex);
    const allExpanded = indexes.every((index) => expanded.includes(index));

    setExpanded((current) =>
      allExpanded
        ? current.filter((index) => !indexes.includes(index))
        : [...new Set([...current, ...indexes])]
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-4 py-14 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100">
            DevMavox Learning Roadmap
          </div>

          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            Terraform — Beginner to Production
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Master Infrastructure as Code, HCL, AWS provisioning, reusable
            modules, state management, remote backends, security, CI/CD and
            production troubleshooting through a structured learning path.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["20", "Learning modules"],
              [String(totalLessons), "Lesson sections"],
              ["4", "Learning levels"],
              ["5", "Practical projects"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-3xl font-bold">{value}</p>
                <p className="mt-1 text-sm text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Your learning progress</h2>
              <p className="mt-1 text-sm text-slate-500">
                Mark each lesson section as completed when you finish it.
              </p>
            </div>
            <p className="text-2xl font-bold text-emerald-700">
              {progress}%
            </p>
          </div>

          <div
            className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label="Terraform learning progress"
          >
            <div
              className="h-full rounded-full bg-emerald-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-sm text-slate-500">
            {completedCount} of {totalLessons} lesson sections completed
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Progress is held in page state and may reset when you leave or
            refresh this page.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_220px_auto]">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search Terraform topics, commands, errors..."
            aria-label="Search Terraform roadmap"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />

          <select
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            aria-label="Filter by learning level"
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-500"
          >
            <option value="All">All levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Production">Production</option>
          </select>

          <button
            type="button"
            onClick={toggleAllVisible}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold hover:bg-slate-100"
          >
            Expand / Collapse
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {(["Beginner", "Intermediate", "Advanced", "Production"] as const).map(
            (item) => (
              <span
                key={item}
                className={`rounded-full px-3 py-1.5 font-medium ${levelStyles[item]}`}
              >
                {item}
              </span>
            )
          )}
        </div>

        <div className="mt-6 space-y-4">
          {visibleModules.map((module) => {
            const index = module.originalIndex;
            const isExpanded = expanded.includes(index);
            const moduleCompleted = module.lessons.filter((lesson) =>
              completed.includes(`${index}-${lesson.title}`)
            ).length;

            return (
              <article
                key={module.title}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleModule(index)}
                  aria-expanded={isExpanded}
                  className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${levelStyles[module.level]}`}
                      >
                        {module.level}
                      </span>
                      <span className="text-xs text-slate-500">
                        {module.duration}
                      </span>
                    </div>

                    <h2 className="mt-3 text-lg font-bold sm:text-xl">
                      {module.title}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                      {module.objective}
                    </p>
                    <p className="mt-3 text-xs font-medium text-slate-500">
                      {moduleCompleted} / {module.lessons.length} lesson
                      sections completed
                    </p>
                  </div>

                  <span
                    className="mt-2 text-xl text-slate-500"
                    aria-hidden="true"
                  >
                    {isExpanded ? "−" : "+"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-100 px-5 pb-5 sm:px-6 sm:pb-6">
                    <div className="space-y-4 pt-5">
                      {module.lessons.map((lesson) => {
                        const key = `${index}-${lesson.title}`;
                        const isCompleted = completed.includes(key);

                        return (
                          <section
                            key={lesson.title}
                            className="rounded-xl border border-slate-200 p-4 sm:p-5"
                          >
                            <label className="flex cursor-pointer items-start gap-3">
                              <input
                                type="checkbox"
                                checked={isCompleted}
                                onChange={() => toggleLesson(key)}
                                className="mt-1 h-4 w-4 accent-emerald-600"
                              />
                              <span className="font-semibold">
                                {lesson.title}
                              </span>
                            </label>

                            <ul className="ml-7 mt-4 list-disc space-y-2 pl-4 text-sm leading-6 text-slate-600 marker:text-emerald-600">
                              {lesson.topics.map((topic) => (
                                <li key={topic}>{topic}</li>
                              ))}
                            </ul>

                            <div className="ml-7 mt-4 rounded-lg bg-emerald-50 p-3 text-sm leading-6 text-emerald-950">
                              <strong>Learning outcome:</strong>{" "}
                              {lesson.outcome}
                            </div>
                          </section>
                        );
                      })}
                    </div>
                  </div>
                )}
              </article>
            );
          })}

          {visibleModules.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h2 className="text-lg font-bold">No matching topics found</h2>
              <p className="mt-2 text-sm text-slate-500">
                Try another keyword or select All levels.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setLevel("All");
                }}
                className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        <section className="mt-10 rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
          <h2 className="text-2xl font-bold">Recommended learning sequence</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-300">
            Learn HCL and resource provisioning first. Then move to variables,
            state, modules and AWS infrastructure. After that, study testing,
            CI/CD, security, migration and production recovery. Finish the
            projects before preparing for interviews.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Learn", "HCL, resources and commands"],
              ["02", "Design", "State, modules and AWS"],
              ["03", "Automate", "CI/CD, testing and security"],
              ["04", "Operate", "Projects and incident recovery"],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm font-bold text-emerald-300">{number}</p>
                <h3 className="mt-2 font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
