```typescript
export interface TerraformQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
}

export const terraformQuestions: TerraformQuestion[] = [
  {
    id: 1,
    question: "What is Terraform?",
    options: [
      "A container runtime",
      "An Infrastructure as Code tool",
      "A source code repository",
      "A monitoring dashboard"
    ],
    answer: 1
  },
  {
    id: 2,
    question: "What is the primary purpose of Terraform?",
    options: [
      "To write application unit tests only",
      "To monitor CPU usage",
      "To provision and manage infrastructure using configuration",
      "To store Docker images"
    ],
    answer: 2
  },
  {
    id: 3,
    question: "Which language is used to write typical Terraform configurations?",
    options: ["HCL", "Python only", "Java", "SQL"],
    answer: 0
  },
  {
    id: 4,
    question: "What does IaC stand for?",
    options: [
      "Internet as Code",
      "Integration and Configuration",
      "Infrastructure and Containers",
      "Infrastructure as Code"
    ],
    answer: 3
  },
  {
    id: 5,
    question: "Which command initializes a Terraform working directory?",
    options: [
      "terraform start",
      "terraform init",
      "terraform create",
      "terraform install-provider"
    ],
    answer: 1
  },
  {
    id: 6,
    question: "What does terraform plan do?",
    options: [
      "Always creates every resource immediately",
      "Deletes all resources in the state",
      "Previews proposed infrastructure changes",
      "Uploads source code to GitHub"
    ],
    answer: 2
  },
  {
    id: 7,
    question: "Which command applies a Terraform configuration?",
    options: [
      "terraform apply",
      "terraform deploy-code",
      "terraform push",
      "terraform launch"
    ],
    answer: 0
  },
  {
    id: 8,
    question: "What does terraform destroy do?",
    options: [
      "Deletes only Terraform variables",
      "Removes the provider plugin cache only",
      "Deletes the Terraform configuration files",
      "Plans and applies destruction of managed infrastructure"
    ],
    answer: 3
  },
  {
    id: 9,
    question: "What is a Terraform provider?",
    options: [
      "A monitoring alert",
      "A plugin that interacts with an infrastructure platform or service",
      "A Linux package",
      "A Git branching strategy"
    ],
    answer: 1
  },
  {
    id: 10,
    question: "What is a Terraform resource?",
    options: [
      "A Terraform log message",
      "A variable declaration only",
      "An infrastructure object Terraform manages",
      "A provider download command"
    ],
    answer: 2
  },
  {
    id: 11,
    question: "What is a Terraform data source used for?",
    options: [
      "To read information about existing objects or external data",
      "To delete all existing resources",
      "To replace every resource block",
      "To initialize a Git repository"
    ],
    answer: 0
  },
  {
    id: 12,
    question: "What is the purpose of a Terraform variable?",
    options: [
      "To lock the remote backend",
      "To create provider plugins",
      "To store Terraform logs only",
      "To parameterize configuration inputs"
    ],
    answer: 3
  },
  {
    id: 13,
    question: "How do you declare an input variable in Terraform?",
    options: [
      "input_variable name {}",
      "variable \"name\" {}",
      "var name = resource",
      "terraform.input(name)"
    ],
    answer: 1
  },
  {
    id: 14,
    question: "How do you reference an input variable named region?",
    options: [
      "input.region",
      "terraform.region",
      "var.region",
      "provider.region"
    ],
    answer: 2
  },
  {
    id: 15,
    question: "What is the purpose of an output block?",
    options: [
      "To expose selected values from a Terraform configuration",
      "To install the operating system",
      "To define provider authentication only",
      "To delete a resource"
    ],
    answer: 0
  },
  {
    id: 16,
    question: "What does terraform.tfvars commonly contain?",
    options: [
      "Provider executable binaries",
      "Terraform state locking code",
      "Application container images",
      "Input variable values"
    ],
    answer: 3
  },
  {
    id: 17,
    question: "Which file extension is commonly used for Terraform configuration?",
    options: [".yaml", ".tf", ".java", ".docker"],
    answer: 1
  },
  {
    id: 18,
    question: "What is the purpose of terraform fmt?",
    options: [
      "To provision all infrastructure",
      "To import all resources automatically",
      "To format Terraform configuration files consistently",
      "To destroy a workspace"
    ],
    answer: 2
  },
  {
    id: 19,
    question: "What does terraform validate check?",
    options: [
      "Whether every production server is healthy",
      "Whether an AWS bill is paid",
      "Whether all resources already exist",
      "Whether the configuration is syntactically and structurally valid"
    ],
    answer: 3
  },
  {
    id: 20,
    question: "What is Terraform state?",
    options: [
      "A record mapping managed resources to real infrastructure objects and tracking their attributes",
      "A file containing only provider documentation",
      "A Git commit history",
      "A list of Linux processes"
    ],
    answer: 0
  },
  {
    id: 21,
    question: "What is the default local Terraform state filename?",
    options: [
      "terraform.yml",
      "terraform.tfstate",
      "state.json.lock",
      "provider.tf"
    ],
    answer: 1
  },
  {
    id: 22,
    question: "Why is Terraform state important?",
    options: [
      "It replaces the Terraform configuration",
      "It automatically tests application functionality",
      "It helps Terraform track managed objects and determine changes",
      "It stores all application logs"
    ],
    answer: 2
  },
  {
    id: 23,
    question: "Why should Terraform state be protected?",
    options: [
      "It may contain sensitive infrastructure information and values",
      "It is always a public file",
      "It contains no infrastructure details",
      "It is required to be committed to a public repository"
    ],
    answer: 0
  },
  {
    id: 24,
    question: "What is a Terraform backend?",
    options: [
      "A Linux service manager",
      "A code formatter",
      "A provider's resource block",
      "The mechanism Terraform uses to store and manage state"
    ],
    answer: 3
  },
  {
    id: 25,
    question: "What is a remote backend used for?",
    options: [
      "Running unit tests remotely only",
      "Storing Terraform state in a shared remote location or supported service",
      "Replacing all provider plugins",
      "Creating source code branches"
    ],
    answer: 1
  },
  {
    id: 26,
    question: "Why is remote state useful when multiple engineers work on infrastructure?",
    options: [
      "It eliminates the need for code reviews",
      "It guarantees that all changes are safe",
      "It can provide shared state storage and support coordinated workflows",
      "It removes the need for credentials"
    ],
    answer: 2
  },
  {
    id: 27,
    question: "What is Terraform state locking?",
    options: [
      "A mechanism that helps prevent concurrent state-changing operations",
      "A method of encrypting every .tf file",
      "A Git branch protection rule",
      "A way to lock AWS EC2 consoles"
    ],
    answer: 0
  },
  {
    id: 28,
    question: "What should you do if Terraform reports that the state is locked?",
    options: [
      "Delete the entire state file immediately",
      "Run apply repeatedly",
      "Disable all backend security",
      "Identify the lock owner and operation before safely resolving a stale lock"
    ],
    answer: 3
  },
  {
    id: 29,
    question: "What does terraform state list display?",
    options: [
      "All installed operating systems",
      "Resources tracked in the current Terraform state",
      "Every AWS resource in every account",
      "All provider versions available online"
    ],
    answer: 1
  },
  {
    id: 30,
    question: "What is terraform state mv used for?",
    options: [
      "To move EC2 instances between regions automatically",
      "To move state files into Git",
      "To move or rename addresses of objects in Terraform state",
      "To delete a provider"
    ],
    answer: 2
  },
  {
    id: 31,
    question: "What does terraform state rm do?",
    options: [
      "Removes a resource binding from state without directly destroying the real object",
      "Always deletes the real cloud resource",
      "Deletes all Terraform modules",
      "Removes the provider plugin from the registry"
    ],
    answer: 0
  },
  {
    id: 32,
    question: "What is terraform import used for?",
    options: [
      "To download every cloud resource as source code",
      "To install Terraform itself",
      "To replace a remote backend",
      "To bring an existing infrastructure object under Terraform state management"
    ],
    answer: 3
  },
  {
    id: 33,
    question: "After importing an existing resource, what should you generally do?",
    options: [
      "Immediately destroy the resource",
      "Ensure configuration matches the intended real resource and review a plan",
      "Delete all provider settings",
      "Remove the state file"
    ],
    answer: 1
  },
  {
    id: 34,
    question: "What is a Terraform module?",
    options: [
      "A provider authentication token",
      "A state lock identifier",
      "A reusable collection of Terraform configuration files",
      "A compiled application binary"
    ],
    answer: 2
  },
  {
    id: 35,
    question: "What is the root module?",
    options: [
      "The module containing the configuration Terraform starts with in the working directory",
      "The AWS root account only",
      "A module that cannot contain resources",
      "A provider download directory"
    ],
    answer: 0
  },
  {
    id: 36,
    question: "What is a child module?",
    options: [
      "A module that must always be stored in AWS",
      "A module that cannot accept variables",
      "A module that replaces the root module",
      "A module called by another module through a module block"
    ],
    answer: 3
  },
  {
    id: 37,
    question: "How do you call a module in Terraform?",
    options: [
      "resource_module \"network\" {}",
      "module \"network\" {}",
      "provider_module \"network\" {}",
      "terraform_module network"
    ],
    answer: 1
  },
  {
    id: 38,
    question: "How can a root module access an output named vpc_id from a module named network?",
    options: [
      "var.network.vpc_id",
      "provider.network.vpc_id",
      "module.network.vpc_id",
      "resource.network.vpc_id"
    ],
    answer: 2
  },
  {
    id: 39,
    question: "What is the purpose of module version pinning?",
    options: [
      "To improve reproducibility by controlling which module version is used",
      "To disable Terraform state",
      "To prevent all infrastructure updates forever",
      "To automatically upgrade every provider"
    ],
    answer: 0
  },
  {
    id: 40,
    question: "What does depends_on do?",
    options: [
      "Defines the backend credentials",
      "Changes a resource name",
      "Installs a provider",
      "Declares an explicit dependency between Terraform objects"
    ],
    answer: 3
  },
  {
    id: 41,
    question: "How does Terraform usually determine resource creation order?",
    options: [
      "Alphabetically by resource name only",
      "By analyzing dependencies between resources",
      "By the order of Git commits",
      "By cloud resource cost"
    ],
    answer: 1
  },
  {
    id: 42,
    question: "What is an implicit dependency in Terraform?",
    options: [
      "A dependency written only in README.md",
      "A provider version conflict",
      "A dependency inferred from references between resources",
      "A resource that exists outside Terraform"
    ],
    answer: 2
  },
  {
    id: 43,
    question: "What is the purpose of count in Terraform?",
    options: [
      "To create multiple instances of a resource or module using a numeric count",
      "To count Git commits",
      "To count the number of cloud accounts automatically",
      "To limit provider API permissions"
    ],
    answer: 0
  },
  {
    id: 44,
    question: "What is the purpose of for_each?",
    options: [
      "To format every Terraform file",
      "To lock the remote backend",
      "To destroy all resources in a module",
      "To create instances based on a map or set of strings"
    ],
    answer: 3
  },
  {
    id: 45,
    question: "When is for_each often preferable to count?",
    options: [
      "Whenever no resources need to be created",
      "When each instance needs a stable key tied to a specific item",
      "Only when using a local backend",
      "Only when creating one resource"
    ],
    answer: 1
  },
  {
    id: 46,
    question: "What is a Terraform local value?",
    options: [
      "A cloud resource stored on a laptop",
      "A backend lock",
      "A named expression that can be reused within a module",
      "An input variable that users must always supply"
    ],
    answer: 2
  },
  {
    id: 47,
    question: "What is a Terraform conditional expression?",
    options: [
      "An expression that selects a value based on a condition",
      "A command that always destroys resources",
      "A way to skip all validation",
      "A provider installation command"
    ],
    answer: 0
  },
  {
    id: 48,
    question: "What does the sensitive = true setting on a variable primarily do?",
    options: [
      "Encrypts the value everywhere it is stored",
      "Removes the value from Terraform state in all cases",
      "Prevents the value from being passed to providers",
      "Marks the value as sensitive and redacts it in many normal CLI displays"
    ],
    answer: 3
  },
  {
    id: 49,
    question: "Why is sensitive = true not sufficient by itself to protect a secret?",
    options: [
      "Sensitive values cannot be used in Terraform",
      "Secrets may still be stored in state or exposed through other channels",
      "It automatically makes the state public",
      "It disables all provider authentication"
    ],
    answer: 1
  },
  {
    id: 50,
    question: "What is the purpose of Terraform variable validation?",
    options: [
      "To create cloud resources before planning",
      "To replace terraform validate",
      "To reject invalid input values according to declared conditions",
      "To encrypt provider binaries"
    ],
    answer: 2
  },
  {
    id: 51,
    question: "What is a Terraform lifecycle block used for?",
    options: [
      "To control certain resource lifecycle behaviors",
      "To configure Git authentication",
      "To store remote state in a database",
      "To set the Terraform CLI installation path"
    ],
    answer: 0
  },
  {
    id: 52,
    question: "What does create_before_destroy do when supported and applicable?",
    options: [
      "Always deletes the existing resource before planning",
      "Disables dependency handling",
      "Prevents all future changes",
      "Requests that a replacement be created before the old object is destroyed"
    ],
    answer: 3
  },
  {
    id: 53,
    question: "What does prevent_destroy do?",
    options: [
      "Automatically backs up every resource",
      "Rejects planned destruction of a resource while the lifecycle rule remains in effect",
      "Prevents all in-place updates",
      "Stops Terraform from reading state"
    ],
    answer: 1
  },
  {
    id: 54,
    question: "What does ignore_changes do?",
    options: [
      "Ignores every provider error",
      "Deletes a resource from state",
      "Tells Terraform to ignore specified attribute changes when planning updates",
      "Disables all dependency tracking"
    ],
    answer: 2
  },
  {
    id: 55,
    question: "What is a Terraform workspace?",
    options: [
      "A separate state instance associated with the same configuration and working directory",
      "A separate Git hosting provider",
      "A cloud region",
      "A Terraform resource type"
    ],
    answer: 0
  },
  {
    id: 56,
    question: "Which command lists Terraform workspaces?",
    options: [
      "terraform list-workspaces",
      "terraform show workspaces",
      "terraform workspace status",
      "terraform workspace list"
    ],
    answer: 3
  },
  {
    id: 57,
    question: "What does terraform workspace new staging do?",
    options: [
      "Creates an AWS staging account",
      "Creates a Terraform workspace named staging",
      "Creates a new GitHub organization",
      "Creates a provider plugin"
    ],
    answer: 1
  },
  {
    id: 58,
    question: "Why may workspaces not be sufficient for strong production and development isolation?",
    options: [
      "Terraform cannot use workspaces with variables",
      "Workspaces always share exactly the same state",
      "They share configuration and may still share credentials or backend boundaries unless isolation is designed separately",
      "Workspaces cannot contain resources"
    ],
    answer: 2
  },
  {
    id: 59,
    question: "What is a provider version constraint used for?",
    options: [
      "To specify acceptable provider versions",
      "To determine the AWS account password",
      "To set the resource creation order",
      "To choose the Terraform state filename"
    ],
    answer: 0
  },
  {
    id: 60,
    question: "What is the purpose of .terraform.lock.hcl?",
    options: [
      "To store all infrastructure secrets",
      "To list every managed resource",
      "To lock all source files from editing",
      "To record selected provider versions and package checksums"
    ],
    answer: 3
  },
  {
    id: 61,
    question: "Should .terraform.lock.hcl generally be committed to Git for a team-managed configuration?",
    options: [
      "No, because provider versions must always change",
      "Yes, to help keep provider selections consistent across environments",
      "Only if the state file is also public",
      "No, because Terraform cannot read committed lock files"
    ],
    answer: 1
  },
  {
    id: 62,
    question: "What does terraform providers show?",
    options: [
      "Every running EC2 instance",
      "The complete AWS billing report",
      "Provider requirements associated with the configuration and state",
      "The current Git commit history"
    ],
    answer: 2
  },
  {
    id: 63,
    question: "What does terraform init -upgrade do?",
    options: [
      "Allows eligible provider and module dependencies to be upgraded within their constraints",
      "Upgrades the operating system automatically",
      "Destroys all managed resources",
      "Deletes the remote backend"
    ],
    answer: 0
  },
  {
    id: 64,
    question: "What should you review before upgrading a Terraform provider in production?",
    options: [
      "Only the provider's download size",
      "Only the Git branch name",
      "Nothing if terraform init succeeds",
      "Version compatibility, release notes, planned changes, and test results"
    ],
    answer: 3
  },
  {
    id: 65,
    question: "How should Terraform authenticate to AWS in a production pipeline?",
    options: [
      "By committing an IAM user's access keys to the repository",
      "Preferably using short-lived credentials or an approved role-based identity mechanism",
      "By storing the secret key in a resource name",
      "By disabling IAM policies"
    ],
    answer: 1
  },
  {
    id: 66,
    question: "What is the purpose of an AWS IAM role used by Terraform?",
    options: [
      "To replace Terraform state",
      "To define HCL syntax",
      "To grant an identity a controlled set of AWS permissions",
      "To store the Terraform provider plugin"
    ],
    answer: 2
  },
  {
    id: 67,
    question: "Why should Terraform use least-privilege IAM permissions?",
    options: [
      "To limit the potential impact of accidental or unauthorized infrastructure changes",
      "To allow every user to delete every AWS resource",
      "To eliminate all audit logs",
      "To bypass AWS authentication"
    ],
    answer: 0
  },
  {
    id: 68,
    question: "What is the purpose of the AWS region setting in a Terraform provider configuration?",
    options: [
      "To define the Git repository location",
      "To set the Terraform workspace name automatically",
      "To select the state encryption password",
      "To specify the AWS region for regional provider operations unless overridden"
    ],
    answer: 3
  },
  {
    id: 69,
    question: "What is a common Terraform use case for AWS VPC resources?",
    options: [
      "To compile application code",
      "To provision and manage virtual networking infrastructure",
      "To generate SonarQube reports",
      "To create Git commits"
    ],
    answer: 1
  },
  {
    id: 70,
    question: "What should you check if Terraform cannot create an AWS resource because of AccessDenied?",
    options: [
      "Only terraform fmt output",
      "Only the resource display name",
      "IAM permissions, assumed role, policies, and any relevant permission boundaries",
      "Only the Terraform workspace label"
    ],
    answer: 2
  },
  {
    id: 71,
    question: "What is the purpose of Terraform plan review in a production workflow?",
    options: [
      "To inspect proposed changes and catch unintended infrastructure modifications before applying",
      "To guarantee that AWS will never fail",
      "To remove the need for access control",
      "To replace all infrastructure testing"
    ],
    answer: 0
  },
  {
    id: 72,
    question: "Why is a saved Terraform plan sometimes used in CI/CD?",
    options: [
      "It makes every resource change reversible automatically",
      "It stores all credentials safely in plain text",
      "It eliminates provider version constraints",
      "It allows the reviewed plan artifact to be applied later, subject to state and workflow considerations"
    ],
    answer: 3
  },
  {
    id: 73,
    question: "What does terraform apply plan.out do when plan.out is a valid saved plan file?",
    options: [
      "Creates a new workspace called plan.out",
      "Applies the changes recorded in the saved plan, subject to validation and current-state constraints",
      "Deletes the state file",
      "Formats every Terraform module"
    ],
    answer: 1
  },
  {
    id: 74,
    question: "What is a potential risk of applying an outdated Terraform plan?",
    options: [
      "It automatically changes the provider version",
      "It deletes every remote backend",
      "It may no longer be applicable because the state or infrastructure has changed",
      "It converts all variables into outputs"
    ],
    answer: 2
  },
  {
    id: 75,
    question: "What should you do if a Terraform plan proposes replacing a critical production database unexpectedly?",
    options: [
      "Stop and investigate the diff, configuration, state, and replacement reason before applying",
      "Apply immediately to save time",
      "Delete the state file without review",
      "Disable all lifecycle protections"
    ],
    answer: 0
  },
  {
    id: 76,
    question: "What is configuration drift in Terraform-managed infrastructure?",
    options: [
      "A change in Terraform file formatting",
      "A change in Git commit history",
      "A provider download failure",
      "A difference between actual infrastructure and the configuration or expected managed state"
    ],
    answer: 3
  },
  {
    id: 77,
    question: "How can Terraform help identify infrastructure drift?",
    options: [
      "By reading only the README",
      "By refreshing or comparing remote object information during planning and showing detected differences",
      "By disabling all cloud APIs",
      "By ignoring the state file"
    ],
    answer: 1
  },
  {
    id: 78,
    question: "Someone manually changes an AWS security group outside Terraform. What should the team do?",
    options: [
      "Delete the whole AWS account",
      "Ignore all future plans",
      "Run a plan, review the drift, and decide whether configuration or infrastructure should be reconciled",
      "Commit the AWS console screenshot as Terraform code"
    ],
    answer: 2
  },
  {
    id: 79,
    question: "What does terraform refresh do in Terraform versions where the command is available?",
    options: [
      "Updates state with observed remote object information without making the same changes as apply",
      "Always destroys and recreates every resource",
      "Installs all cloud provider plugins",
      "Deletes every workspace"
    ],
    answer: 0
  },
  {
    id: 80,
    question: "What is the recommended modern workflow for checking remote infrastructure changes?",
    options: [
      "Run terraform destroy and inspect later",
      "Edit terraform.tfstate manually for every change",
      "Ignore remote resource changes",
      "Use terraform plan and review its proposed changes"
    ],
    answer: 3
  },
  {
    id: 81,
    question: "What is terraform taint associated with in older Terraform workflows?",
    options: [
      "Formatting variable declarations",
      "Marking a resource instance for replacement; current workflows commonly use -replace with plan/apply",
      "Deleting a provider",
      "Encrypting a state file"
    ],
    answer: 1
  },
  {
    id: 82,
    question: "What does terraform apply -replace=RESOURCE_ADDRESS request?",
    options: [
      "Rename the Terraform workspace",
      "Remove the resource from Git",
      "Replace the specified resource instance as part of the planned operation",
      "Replace the provider registry"
    ],
    answer: 2
  },
  {
    id: 83,
    question: "What is the purpose of terraform graph?",
    options: [
      "To output a dependency graph representation of Terraform configuration",
      "To generate a Grafana dashboard automatically",
      "To create a cloud network graph resource",
      "To visualize application source code coverage only"
    ],
    answer: 0
  },
  {
    id: 84,
    question: "What does terraform show commonly display?",
    options: [
      "Only the cloud provider password",
      "Every Git repository on the machine",
      "Only the Terraform installation path",
      "A human-readable view of a plan or state, depending on the supplied input"
    ],
    answer: 3
  },
  {
    id: 85,
    question: "What is terraform output used for?",
    options: [
      "To apply changes without a plan",
      "To display root module output values",
      "To list all AWS IAM users",
      "To remove resource dependencies"
    ],
    answer: 1
  },
  {
    id: 86,
    question: "What is the purpose of terraform console?",
    options: [
      "To start a remote Linux shell",
      "To log in to the AWS Console",
      "To interactively evaluate Terraform expressions",
      "To run Kubernetes pods"
    ],
    answer: 2
  },
  {
    id: 87,
    question: "What does terraform force-unlock do?",
    options: [
      "Manually removes a state lock when the operator is certain it is safe and has the correct lock ID",
      "Deletes all remote infrastructure",
      "Upgrades all providers automatically",
      "Disables locking for every future run"
    ],
    answer: 0
  },
  {
    id: 88,
    question: "Why is manually editing terraform.tfstate risky?",
    options: [
      "It changes the AWS region automatically",
      "Terraform always ignores the file afterward",
      "It makes all state changes reversible",
      "An incorrect edit can corrupt Terraform's tracking of infrastructure"
    ],
    answer: 3
  },
  {
    id: 89,
    question: "What is the purpose of terraform.tfstate.backup in applicable local-state workflows?",
    options: [
      "It is the only file Terraform ever reads",
      "It may contain a previous local state snapshot created by Terraform",
      "It stores the provider's executable code",
      "It replaces the remote backend automatically"
    ],
    answer: 1
  },
  {
    id: 90,
    question: "Why should .terraform directories generally not be committed to Git?",
    options: [
      "They contain all infrastructure definitions and must be public",
      "Terraform cannot initialize without committing them",
      "They contain local working data and downloaded dependencies that can be recreated",
      "They are required to track every AWS resource"
    ],
    answer: 2
  },
  {
    id: 91,
    question: "What is the purpose of .gitignore in a Terraform repository?",
    options: [
      "To prevent accidental commits of local artifacts, state files, and other excluded files",
      "To configure AWS IAM permissions",
      "To set the Terraform provider region",
      "To define module outputs"
    ],
    answer: 0
  },
  {
    id: 92,
    question: "How should teams handle Terraform state in CI/CD?",
    options: [
      "Print the entire state in public build logs",
      "Copy it into every pull request",
      "Allow concurrent applies with no coordination",
      "Use protected remote state, access controls, locking where supported, and secure pipeline permissions"
    ],
    answer: 3
  },
  {
    id: 93,
    question: "What is a common Terraform use case in a DevOps CI/CD pipeline?",
    options: [
      "Replacing every application test",
      "Provisioning or updating infrastructure through reviewed, repeatable automation",
      "Storing production passwords in Git",
      "Disabling infrastructure monitoring"
    ],
    answer: 1
  },
  {
    id: 94,
    question: "What should a pull request pipeline normally do with Terraform configuration?",
    options: [
      "Run terraform destroy against production",
      "Apply all changes automatically without review",
      "Run formatting, validation, and an appropriately configured plan for review",
      "Delete the remote state"
    ],
    answer: 2
  },
  {
    id: 95,
    question: "Why should production Terraform applies have controlled permissions and approvals?",
    options: [
      "To reduce the risk of unauthorized or accidental infrastructure changes",
      "To make every change impossible",
      "To eliminate the need for backups",
      "To bypass state locking"
    ],
    answer: 0
  },
  {
    id: 96,
    question: "What is the purpose of policy as code in a Terraform workflow?",
    options: [
      "To replace all HCL configuration",
      "To make all infrastructure public",
      "To remove the need for access control",
      "To enforce organizational rules on proposed infrastructure changes"
    ],
    answer: 3
  },
  {
    id: 97,
    question: "What is a Terraform security scanning tool commonly used for?",
    options: [
      "To replace the Terraform provider",
      "To identify potential misconfigurations, security risks, or policy violations in infrastructure code",
      "To create AWS accounts without permission",
      "To store Terraform state as a Docker image"
    ],
    answer: 1
  },
  {
    id: 98,
    question: "A Terraform apply partially fails after creating some resources. What should you do?",
    options: [
      "Delete the state file immediately",
      "Run destroy without reviewing the impact",
      "Inspect the error and state, correct the cause, then create and review a new plan",
      "Manually delete every resource in the account"
    ],
    answer: 2
  },
  {
    id: 99,
    question: "Terraform reports that a resource already exists but is not in state. What is a reasonable approach?",
    options: [
      "Investigate ownership and configuration, then consider importing the existing resource if appropriate",
      "Create duplicate resources repeatedly",
      "Delete the whole backend",
      "Ignore the conflict and apply continuously"
    ],
    answer: 0
  },
  {
    id: 100,
    question: "What is a strong production Terraform workflow?",
    options: [
      "Store credentials in Git and apply every change directly",
      "Use one shared local state file with no backup",
      "Skip validation and plan reviews",
      "Use version-controlled modules, secure credentials, remote state, reviewed plans, controlled applies, and backups"
    ],
    answer: 3
  }
];
```
