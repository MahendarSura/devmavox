

## ☁️ 🚀🏗️ PROJECT 06 - AWS Infrastructure as Code with Terrafom 

<img width="1100" height="733" alt="image" src="https://github.com/user-attachments/assets/002ff9ad-6fdd-4aa3-bed1-eaae9a193d43" />


## ☁️ Terraform + AWS + IAM + VPC + EC2

image

🏢 Real-World DevOps • Infrastructure Automation • Cloud Networking • Secure Provisioning

Terraform AWS IAM VPC EC2 GitHub Actions DevOps Learning

**Level:** Beginner → Intermediate → Advanced  
**Project type:** Practical Infrastructure as Code lab  
**Build order:** Local Terraform validation → AWS plan review → controlled deployment → optional CI/CD and remote state

---

## 🟦 Project mission

Build repeatable AWS infrastructure using Terraform instead of manually creating every resource in the AWS Console. Learn how to define infrastructure as code, review proposed changes, provision a network and compute resources, protect Terraform state, and clean up resources safely.

## 🌈 1. First Understand the Project — Simple Words

Imagine a company called ShopEasy. It needs a network, a server, and security rules for a small application.

Without Infrastructure as Code, an engineer may create each resource manually in the AWS Console. That can be slow, difficult to reproduce, and easy to configure differently between environments.

With Terraform, the engineer describes the desired infrastructure in `.tf` files. Terraform compares the configuration with the current state and creates a plan showing what it intends to change.

### 🧠 The simplest analogy

Think of Terraform like a building plan:

| Building work | AWS / Terraform meaning | What it tells us |
|---|---|---|
| 📝 Building blueprint | Terraform configuration | What should exist |
| 🧱 Plot and roads | VPC, subnet, routes | Where resources connect |
| 🚪 Entry permissions | Security groups and IAM | Who can access what |
| 🏢 Building | EC2 instance | Compute resource to run a workload |
| 🔍 Engineer reviews the plan | `terraform plan` | What Terraform intends to change |
| 🛠️ Construction | `terraform apply` | Apply the reviewed changes |
| 🗂️ Project records | Terraform state | What Terraform manages |

The analogy is not exact, but it helps explain the workflow: define, review, apply, verify, and maintain infrastructure.

## 🏢 2. Real-World Company Scenario — The Story

### 📦 Company situation

ShopEasy needs a small AWS environment for a demo application. The team wants a predictable network, a compute instance, and restricted access.

Before IaC, an engineer might manually create the VPC, subnet, internet gateway, route table, security group, and EC2 instance. Rebuilding the same environment later can require repeating many steps.

With Terraform, the desired configuration is version-controlled and can be reviewed before changes are applied.

### 🔴 10:00 AM — Requirement arrives
- Create an isolated VPC.
- Add a subnet and route resources.
- Create a security group with restricted inbound access.
- Provision an EC2 instance.
- Tag resources so the team can identify ownership and purpose.

### 🟠 10:10 AM — Terraform plan is reviewed
- Terraform reads the configuration and current state.
- The engineer reviews resource creation, modification, and deletion.
- The team checks the region, AMI, permissions, network exposure, and estimated cost.

### 🔴 10:15 AM — A configuration issue is found
The plan shows SSH access open to `0.0.0.0/0`. The engineer stops and changes the rule to a specific trusted IP or chooses Systems Manager Session Manager instead.

### 🟢 10:25 AM — Infrastructure is applied and verified
After approval, Terraform applies the reviewed plan. The engineer checks the AWS resources and confirms that networking and access settings match the requirement.

**Important:** This is an illustrative scenario, not evidence that AWS resources have already been created.

## 🎯 3. What Exactly Will We Build?

We will design a small AWS infrastructure lab managed by Terraform.

| Component | Responsibility | Simple explanation |
|---|---|---|
| 🧰 Terraform | Infrastructure as Code | Defines and manages resources through configuration |
| ☁️ AWS Provider | Connects Terraform to AWS APIs | Lets Terraform manage supported AWS resources |
| 🌐 VPC | Network boundary | Provides a logically isolated AWS network |
| 🧩 Public Subnet | Subnet inside the VPC | Places the demo instance in a selected network range |
| 🚪 Internet Gateway | Internet route target | Enables internet routing when routes and public addressing are configured |
| 🛣️ Route Table | Network routes | Decides where matching traffic is sent |
| 🛡️ Security Group | Instance traffic rules | Controls allowed inbound and outbound traffic |
| 🖥️ EC2 | Compute | Provides a virtual machine for the demo |
| 🔐 IAM | Identity and access | Controls which identities can perform AWS actions |
| 📤 Outputs | Useful resource values | Prints IDs and addresses after deployment |
| ⚙️ GitHub Actions | CI validation | Checks Terraform formatting and configuration on changes |

**Safety note:** The example is a learning lab. AWS resources can incur charges. Review pricing, permissions, region, and the plan before applying. No resources are created automatically by this README.

## 🗺️ 4. Colourful Architecture Diagrams

### 4.1 Full system view

```text
Developer
   |
   v
Git Repository (Terraform files)
   |
   v
GitHub Actions: fmt / init / validate
   |
   v
Terraform Plan + Human Review
   |
   v
AWS Provider / AWS APIs
   |
   +-------------------- AWS Account --------------------+
   |                                                     |
   |   VPC: 10.20.0.0/16                                 |
   |     |                                               |
   |     +--> Public Subnet: 10.20.1.0/24                |
   |     |       |                                       |
   |     |       +--> Security Group (restricted SSH)     |
   |     |       |       |                               |
   |     |       |       +--> EC2 Demo Instance           |
   |     |       |                                       |
   |     +--> Internet Gateway + Route Table              |
   |                                                     |
   |   IAM identity / permissions                         |
   +-----------------------------------------------------+
```

### 4.2 Terraform workflow

```text
Write .tf files
      |
      v
terraform fmt
      |
      v
terraform init
      |
      v
terraform validate
      |
      v
terraform plan
      |
      v
Review every proposed change
      |
      v
terraform apply
      |
      v
Verify AWS resources
      |
      v
terraform destroy (when lab is finished)
```

### 4.3 What each stage does

| Stage | Purpose | Why it matters |
|---|---|---|
| `fmt` | Formats configuration | Keeps code consistent |
| `init` | Installs providers and initializes backend | Prepares the working directory |
| `validate` | Checks configuration structure | Finds many configuration errors |
| `plan` | Previews intended changes | Gives the engineer a chance to catch mistakes |
| `apply` | Applies approved changes | Creates or updates infrastructure |
| `destroy` | Plans and removes managed resources | Helps clean up a temporary lab |

## 🧠 5. Infrastructure as Code — The Main Concept

Infrastructure as Code (IaC) means defining infrastructure through machine-readable configuration instead of relying only on manual console steps.

### Why use IaC?
- **Repeatability:** Recreate an environment from reviewed configuration.
- **Version control:** Track who changed the infrastructure definition and when.
- **Review:** Inspect proposed changes before applying them.
- **Consistency:** Reuse modules and variables across environments.
- **Automation:** Run formatting and validation in CI.
- **Recovery:** Rebuild supported resources from code and state, subject to data and dependency requirements.

### Declarative vs imperative

Terraform is primarily declarative. You describe the desired end state, and Terraform determines the actions needed to move managed resources toward that state.

For example, you declare an EC2 instance resource. You do not need to write every low-level AWS API call to create it.

### Desired state vs state file

- **Configuration:** What you want Terraform to manage.
- **State:** Terraform's record mapping configuration resources to real objects.
- **Plan:** A proposed set of changes based on configuration, state, and refreshed information.

State can contain sensitive values. Protect it like sensitive infrastructure data.

## 🔍 6. Tool-by-Tool Explanation

### 🧰 6.1 Terraform — Infrastructure Automation

**What is Terraform?**  
Terraform is an Infrastructure as Code tool that uses configuration files to provision and manage infrastructure through providers.

**How does it work?**
1. Write resources and variables in `.tf` files.
2. Run `terraform init` to initialize the project.
3. Run `terraform validate` to check the configuration.
4. Run `terraform plan` to preview changes.
5. Review the plan and apply only when authorized.
6. Verify the result and manage future changes through code.

**What does a DevOps Engineer do?**
- Write and review Terraform configuration.
- Manage variables, outputs, modules, and provider versions.
- Review plans and unexpected replacements.
- Protect state and manage concurrent changes.
- Troubleshoot permissions, quotas, networking, and provider errors.
- Remove temporary resources safely.

### ☁️ 6.2 AWS Provider

The AWS provider translates Terraform resource configuration into AWS API operations.

Example:

```hcl
provider "aws" {
  region = var.aws_region
}
```

The provider region controls where regional resources are created. Some AWS services and resources are global or have different regional behaviour, so check the scope of each resource.

### 🌐 6.3 VPC — Virtual Private Cloud

A VPC is a logically isolated network in AWS.

**Why use it?** It provides IP address ranges and a network boundary for resources.

Example CIDR: `10.20.0.0/16`.

A VPC alone does not make a workload public or private. Subnets, route tables, gateways, addressing, and security controls determine connectivity.

### 🧩 6.4 Subnet

A subnet is a range of IP addresses inside a VPC, associated with one Availability Zone.

Example: `10.20.1.0/24`.

A subnet is commonly called public when its route table has a route to an internet gateway; an instance also needs suitable public addressing and security rules to be reachable from the internet.

### 🚪 6.5 Internet Gateway and Route Table

An internet gateway provides a target for routes between a VPC and the internet. A route table decides where traffic is sent.

Example default route:

```text
0.0.0.0/0 -> Internet Gateway
```

That route alone does not guarantee an instance is reachable. Public addressing, security groups, network ACLs, OS firewall rules, and the service listening on the port also matter.

### 🛡️ 6.6 Security Groups

Security groups act as stateful virtual firewalls attached to supported AWS resources.

For this demo, SSH should be limited to a known administrator IP, such as `YOUR_PUBLIC_IP/32`, or replaced with Session Manager access.

Avoid opening SSH to the whole internet. Never assume a security group is the only security control needed.

### 🖥️ 6.7 EC2

Amazon EC2 provides virtual compute instances. Terraform can define the AMI, instance type, subnet, security groups, storage settings, and tags.

The AMI ID must exist in the selected region. Instance types and pricing vary by region and account eligibility.

### 🔐 6.8 IAM — Identity and Access Management

IAM controls who can call AWS APIs and what actions they can perform.

Use least privilege:
- Grant only the actions needed for the task.
- Prefer short-lived credentials or an approved role-assumption workflow.
- Avoid hardcoding access keys in Terraform files.
- Never commit secrets to Git.
- Review permissions before allowing CI to create or delete resources.

## 🗂️ 7. Complete Repository Structure

Create a repository named:

`aws-infrastructure-as-code-terraform`

```text
aws-infrastructure-as-code-terraform/
│
├── README.md
├── .gitignore
├── versions.tf
├── provider.tf
├── variables.tf
├── main.tf
├── outputs.tf
├── terraform.tfvars.example
│
├── modules/
│   └── README.md
│
├── environments/
│   ├── dev/
│   │   └── README.md
│   └── prod/
│       └── README.md
│
├── scripts/
│   ├── validate.sh
│   └── validate.ps1
│
├── .github/
│   └── workflows/
│       └── terraform-check.yml
│
└── docs/
    ├── architecture.md
    ├── security.md
    └── screenshots/
        └── README.md
```

### 📂 Folder-by-folder explanation

| File/folder | What belongs there? | Why do we need it? |
|---|---|---|
| `versions.tf` | Terraform and provider constraints | Keeps tool/provider compatibility explicit |
| `provider.tf` | AWS provider configuration | Selects the AWS region and provider |
| `variables.tf` | Typed input variables | Avoids hardcoding environment settings |
| `main.tf` | VPC, routes, security group, EC2 | Defines the demo infrastructure |
| `outputs.tf` | Resource IDs and addresses | Makes useful values easy to inspect |
| `terraform.tfvars.example` | Example variable values | Shows required inputs without secrets |
| `.gitignore` | State, plans, local values, cache | Prevents sensitive/local artifacts being committed |
| `modules/` | Reusable infrastructure components | Helps avoid repeated configuration |
| `environments/` | Environment design notes or root configurations | Separates environment-specific decisions |
| `.github/workflows/` | Automated validation workflow | Catches formatting and configuration problems |
| `docs/` | Architecture, security, evidence | Makes the project understandable and reviewable |

## 🧑‍💻 8. Example Terraform Configuration

The following is a small teaching example. Review and adapt every value before using it in an AWS account.

### 8.1 `versions.tf`

```hcl
terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
```

Provider versions should be tested and updated deliberately. Commit the dependency lock file (`.terraform.lock.hcl`) for reproducible provider selection.

### 8.2 `provider.tf`

```hcl
provider "aws" {
  region = var.aws_region
}
```

Terraform can use credentials supplied through the AWS CLI profile, environment, or an approved role-assumption setup. Do not place access keys in the provider block.

### 8.3 `variables.tf`

```hcl
variable "aws_region" {
  description = "AWS region for this learning environment"
  type        = string
  default     = "ap-south-1"
}

variable "project_name" {
  description = "Short resource tag/name prefix"
  type        = string
  default     = "terraform-demo"
}

variable "instance_type" {
  description = "EC2 instance type; check current pricing"
  type        = string
  default     = "t3.micro"
}

variable "ami_id" {
  description = "Valid Linux AMI ID in the selected region"
  type        = string
}

variable "my_ip_cidr" {
  description = "Trusted administrator IPv4 CIDR, ideally a single IP /32"
  type        = string

  validation {
    condition     = can(cidrhost(var.my_ip_cidr, 0))
    error_message = "Provide a valid IPv4 CIDR block."
  }
}
```

### 8.4 `main.tf`

```hcl
data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_vpc" "main" {
  cidr_block           = "10.20.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name    = "${var.project_name}-vpc"
    Project = var.project_name
  }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.20.1.0/24"
  availability_zone       = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = true

  tags = {
    Name    = "${var.project_name}-public-subnet"
    Project = var.project_name
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "${var.project_name}-public-rt"
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

resource "aws_security_group" "ec2" {
  name        = "${var.project_name}-ec2-sg"
  description = "Restricted SSH for a learning demo"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "SSH from trusted administrator IP only"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.my_ip_cidr]
  }

  egress {
    description = "Outbound connections for the demo"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-ec2-sg"
  }
}

resource "aws_instance" "demo" {
  ami                         = var.ami_id
  instance_type               = var.instance_type
  subnet_id                   = aws_subnet.public.id
  vpc_security_group_ids      = [aws_security_group.ec2.id]
  associate_public_ip_address = true

  metadata_options {
    http_endpoint               = "enabled"
    http_tokens                 = "required"
    http_put_response_hop_limit = 1
  }

  root_block_device {
    encrypted = true
  }

  tags = {
    Name    = "${var.project_name}-ec2"
    Project = var.project_name
  }
}
```

**Production improvement:** Prefer private subnets and Systems Manager Session Manager where suitable, rather than exposing SSH. A production VPC usually needs a deliberate multi-AZ design, private application subnets, egress strategy, logging, and additional controls.

### 8.5 `outputs.tf`

```hcl
output "vpc_id" {
  description = "Created VPC ID"
  value       = aws_vpc.main.id
}

output "public_subnet_id" {
  description = "Created public subnet ID"
  value       = aws_subnet.public.id
}

output "instance_id" {
  description = "Created EC2 instance ID"
  value       = aws_instance.demo.id
}

output "instance_public_ip" {
  description = "Public IP of the demo instance"
  value       = aws_instance.demo.public_ip
}
```

### 8.6 `terraform.tfvars.example`

```hcl
aws_region    = "ap-south-1"
project_name  = "terraform-demo"
instance_type = "t3.micro"

# Replace with a currently valid Linux AMI ID in this region.
ami_id = "ami-REPLACE_WITH_VALID_AMI_ID"

# Replace with your own public IPv4 address, limited to one IP.
my_ip_cidr = "203.0.113.10/32"
```

`203.0.113.10/32` is an example documentation address, not your real IP. Replace it and the AMI ID before running the project.

### 8.7 `.gitignore`

```gitignore
.terraform/
*.tfstate
*.tfstate.*
*.tfplan
terraform.tfvars
crash.log
crash.*.log
override.tf
override.tf.json
*_override.tf
*_override.tf.json
```

Do not commit state files, plans, credentials, or environment-specific secret values. Keep `.terraform.lock.hcl` under version control.

## ⚙️ 9. GitHub Actions — Terraform Validation

Create `.github/workflows/terraform-check.yml`:

```yaml
name: Terraform Checks

on:
  pull_request:
    paths:
      - "**/*.tf"
      - ".github/workflows/terraform-check.yml"
  push:
    branches: [main]
    paths:
      - "**/*.tf"
      - ".github/workflows/terraform-check.yml"
  workflow_dispatch:

permissions:
  contents: read

jobs:
  validate:
    name: Format and Validate
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: "1.6.6"

      - name: Terraform Format
        run: terraform fmt -check -recursive

      - name: Terraform Init
        run: terraform init -backend=false

      - name: Terraform Validate
        run: terraform validate
```

This workflow validates configuration; it does **not** authenticate to AWS, create resources, or prove that a deployment works. For stronger supply-chain controls, review third-party actions and pin them to verified full commit SHAs.

## 🗂️ 10. Terraform State — Why It Matters

Terraform state maps configuration resources to real infrastructure objects. Terraform uses it to determine what it manages and to calculate future changes.

### Local state
- Easy to start with for a personal lab.
- Stored on the local machine.
- Risky for teams if it is lost, exposed, or used concurrently.

### Remote state
For team use, configure a secured remote backend such as S3, with appropriate encryption, versioning, restricted IAM access, and a supported locking mechanism. Create and secure the backend separately before using it.

Example backend block to adapt after a bucket has been created:

```hcl
terraform {
  backend "s3" {
    bucket       = "REPLACE_WITH_YOUR_UNIQUE_STATE_BUCKET"
    key          = "terraform-demo/terraform.tfstate"
    region       = "ap-south-1"
    encrypt      = true
    use_lockfile = true
  }
}
```

Backend configuration is initialized separately from ordinary input variables. Run `terraform init` again after adding or changing a backend. Confirm that the selected Terraform and backend versions support the locking configuration you use.

## 🧪 11. Run the Project — Step by Step

### Step 1 — Check the tools

```bash
terraform version
aws --version
aws sts get-caller-identity
```

The final command should identify the AWS identity currently configured. If it fails, fix credentials or profile selection before proceeding.

### Step 2 — Prepare the variable file

Copy `terraform.tfvars.example` to `terraform.tfvars`. Replace the AMI placeholder with a valid Linux AMI ID in the selected region, and replace the example CIDR with your trusted public IP `/32`.

Do not commit the real `terraform.tfvars` file.

### Step 3 — Initialize Terraform

```bash
terraform init
```

This downloads the required provider and initializes the working directory.

### Step 4 — Format and validate

```bash
terraform fmt -recursive
terraform validate
```

Resolve any errors before planning.

### Step 5 — Create and inspect a plan

```bash
terraform plan -out=tfplan
```

Review every proposed resource and setting. Confirm the region, AMI, instance type, network exposure, tags, permissions, and cost implications.

### Step 6 — Apply only when ready

```bash
terraform apply tfplan
```

Run this only if you intentionally want to create the resources and have reviewed the plan. The example can create billable AWS resources.

### Step 7 — Inspect outputs and AWS resources

```bash
terraform output
```

Compare the IDs and settings with the AWS Console or AWS CLI. Verify that the security group permits only the access you intended.

### Step 8 — Clean up when finished

```bash
terraform plan -destroy
```

Review the destroy plan. If it only removes resources you intend to delete:

```bash
terraform destroy
```

Do not run `apply` or `destroy` blindly. Check the plan and the active AWS account first.

## 🧑‍💻 12. What DevOps Engineers Actually Do in This Project

| Responsibility | Daily task | Why it matters |
|---|---|---|
| IaC development | Write and review Terraform resources | Makes infrastructure repeatable |
| Network design | Plan VPCs, subnets, routes, and egress | Controls connectivity |
| Access control | Review IAM and security groups | Reduces unauthorized access |
| Change management | Review Terraform plans | Catches unintended changes |
| State management | Protect state and handle locking | Prevents state loss and conflicting operations |
| CI validation | Run format and validation checks | Finds configuration problems early |
| Cost control | Review resource sizes and usage | Avoids unexpected bills |
| Incident troubleshooting | Diagnose API, quota, route, or provider failures | Restores expected operation |
| Documentation | Record architecture and deployment steps | Makes the project maintainable |
| Cleanup | Remove lab resources safely | Prevents unnecessary cost |

## 🧯 13. Troubleshooting — Common Problems

| Symptom | Possible cause | What to check |
|---|---|---|
| `No valid credential sources found` | Missing AWS credentials or wrong profile | `aws sts get-caller-identity`, profile and role configuration |
| `AccessDenied` | Identity lacks required permissions | IAM policies, permission boundaries, SCPs, and resource policies |
| Invalid AMI ID | AMI does not exist in selected region | Verify the AMI and region |
| Insufficient capacity | Requested instance type unavailable in an AZ | Try an approved AZ or instance type |
| SSH timeout | Wrong CIDR, route, public IP, or instance state | Security group, route table, addressing, OS firewall |
| `terraform init` fails | Provider, backend, or network problem | Read the first error; check versions and backend |
| Unexpected resource replacement | Immutable field changed or resource drift | Inspect the plan before applying |
| State lock error | Another run is using the state | Confirm no active operation; never force-unlock blindly |
| Terraform says resource already exists | Resource created outside this state or duplicate name | Inspect AWS and state; import only after review |
| Unexpected cost | Resources still running or storage/IP charges | Review billing and inventory; destroy only intended lab resources |

Useful commands:

```bash
terraform fmt -check -recursive
terraform validate
terraform plan
terraform state list
terraform output
aws sts get-caller-identity
```

Be careful when sharing state or command output: it can contain sensitive infrastructure details.

## 🔐 14. Security and Production Readiness

This project is a learning example, not a complete production architecture.

### Security checklist

- [ ] Use least-privilege IAM permissions.
- [ ] Prefer short-lived credentials or approved role assumption.
- [ ] Never commit AWS access keys, state files, plan files, or secrets.
- [ ] Restrict SSH to a trusted IP, or use Session Manager.
- [ ] Require IMDSv2 on EC2 instances where supported.
- [ ] Encrypt storage where appropriate.
- [ ] Review all inbound and outbound network rules.
- [ ] Protect remote state with access controls, encryption, versioning, and locking.
- [ ] Review Terraform plans before applying changes.
- [ ] Scan infrastructure configuration with a tool such as Checkov or tfsec.
- [ ] Pin and review provider and CI action versions.
- [ ] Use budgets and alerts to control cloud spending.
- [ ] Test backups, recovery, and cleanup procedures.

### What changes in production?

| Learning lab | Production consideration |
|---|---|
| One VPC and one public subnet | Multi-AZ network design and private application subnets |
| One demo EC2 instance | Auto Scaling or managed compute when appropriate |
| Local state | Secured remote state with collaboration controls |
| Manual apply | Reviewed change process and protected approvals |
| Simple security group | Deliberate least-privilege ingress and egress |
| One region | Documented availability and disaster recovery strategy |
| Example values | Validated environment-specific configuration |
| No monitoring configured | Cloud monitoring, logs, alarms, and operational runbooks |

## 📸 15. Real-Work Screenshots — Genuine Portfolio Evidence

Capture screenshots from your own environment after each step actually works. Do not use sample images as if they prove your deployment succeeded.

| Screenshot filename | What to capture | What it proves |
|---|---|---|
| `01-project-structure.png` | VS Code Explorer | Repository structure |
| `02-terraform-init.png` | Successful `terraform init` | Provider initialization |
| `03-terraform-validate.png` | `terraform validate` output | Configuration validation at capture time |
| `04-terraform-plan.png` | Reviewed plan summary | Planned resource changes |
| `05-aws-vpc.png` | VPC in AWS Console | VPC exists in that account at capture time |
| `06-aws-ec2.png` | EC2 instance details | Instance state and selected configuration |
| `07-security-group.png` | Security group inbound rules | Access rules currently configured |
| `08-github-actions.png` | Workflow run | CI checks actually ran |
| `09-terraform-output.png` | Sanitized Terraform outputs | Resource values returned by Terraform |
| `10-cleanup.png` | Destroy result and AWS inventory check | Cleanup was performed and verified |

Create `docs/screenshots/README.md`:

```markdown
# Project Screenshot Evidence

Store genuine screenshots from this project's own execution.

For each screenshot, record:
- The command or action performed
- The actual observed result
- Any error or troubleshooting note
- What the screenshot proves and does not prove

Before publishing, redact account identifiers, public IPs if sensitive,
credentials, tokens, and organization-sensitive information. Never invent results.
```

## ⚙️ 16. CI/CD Improvements — Beyond Basic Validation

After basic validation works, extend the workflow carefully:

1. Run Terraform formatting and validation on pull requests.
2. Add YAML and infrastructure security scanning.
3. Generate a plan for review using a controlled identity.
4. Require approval before any infrastructure-changing operation.
5. Use OpenID Connect (OIDC) or another approved short-lived credential method rather than long-lived AWS keys in GitHub secrets.
6. Restrict the CI role to the required account, resources, and actions.
7. Keep production apply jobs protected and auditable.

A CI workflow that runs `terraform validate` is not the same as a workflow that deploys infrastructure. Document which stages are actually implemented and tested.

## 📊 17. Acceptance Criteria — How Do We Know It Works?

| Test | How to verify | Success condition |
|---|---|---|
| Terraform initializes | `terraform init` | Providers and backend initialize successfully |
| Formatting passes | `terraform fmt -check -recursive` | No formatting differences |
| Configuration validates | `terraform validate` | Terraform reports valid configuration |
| Plan is reviewed | Inspect `terraform plan` | Every planned change is understood |
| VPC is provisioned | AWS Console or CLI | VPC matches expected CIDR and tags |
| Subnet and routes exist | Inspect subnet and route table | Network configuration matches design |
| Security group is restricted | Inspect inbound rules | Only approved access is allowed |
| EC2 is provisioned | EC2 Console or CLI | Instance matches the intended settings |
| Outputs are correct | `terraform output` | Values correspond to created resources |
| CI runs | GitHub Actions tab | Validation jobs complete successfully |
| Cleanup works | Review destroy plan and AWS inventory | Intended lab resources are removed |

Do not claim a successful AWS deployment if you only ran formatting and validation locally. These are separate stages with separate evidence.

## 🧹 18. Cleanup — Stop Cloud Costs Safely

First inspect the resources Terraform plans to remove:

```bash
terraform plan -destroy
```

If the plan is correct and the lab resources are no longer needed:

```bash
terraform destroy
```

Then inspect the AWS account to verify the intended resources were removed. Resources created outside this Terraform state, retained remote state buckets, or unrelated resources may need separate handling.

**Warning:** `terraform destroy` is destructive. Always verify the active AWS account, workspace, state, and plan before confirming.

## 🎤 19. DevOps Interview Questions — With Clear Answers

**Q1. What is Infrastructure as Code?**  
IaC is the practice of defining and managing infrastructure through version-controlled configuration instead of relying only on manual changes.

**Q2. What is Terraform?**  
Terraform is an IaC tool that uses declarative configuration and providers to manage infrastructure.

**Q3. What is a Terraform provider?**  
A provider is a plugin that lets Terraform interact with an API, such as AWS.

**Q4. What is the difference between `terraform plan` and `terraform apply`?**  
`plan` previews the changes Terraform intends to make. `apply` performs the changes after the plan is approved.

**Q5. What is Terraform state?**  
State records the mapping between Terraform configuration and the real resources Terraform manages. It can contain sensitive information and must be protected.

**Q6. Why use remote state?**  
Remote state supports team collaboration and centralized state storage. It should be protected with access controls, encryption, versioning, and an appropriate locking mechanism.

**Q7. What is a VPC?**  
A VPC is a logically isolated network in AWS where resources can be placed in defined IP address ranges.

**Q8. What is the difference between a public and private subnet?**  
A public subnet typically has a
