export interface TerraformIacAdvancedQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export const terraformIacAdvancedQuestions: TerraformIacAdvancedQuestion[] = [
  {
    id: "terraform-iac-advanced-1",
    question: "What is the primary benefit of using Terraform modules in a large infrastructure codebase?",
    options: [
      "They encapsulate reusable infrastructure patterns behind clear inputs and outputs, reducing duplication and improving consistency",
      "They automatically approve every production change",
      "They eliminate the need for state management",
      "They make every resource deploy in parallel regardless of dependencies"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-2",
    question: "What is the purpose of Terraform state?",
    options: [
      "It maps configuration resources to real infrastructure objects and records information needed to plan changes",
      "It stores application logs from every server",
      "It replaces the provider plugin",
      "It guarantees that infrastructure can never drift"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-3",
    question: "Why should a team avoid manually editing Terraform state files?",
    options: [
      "Incorrect edits can break resource mappings or state metadata and may cause unsafe plans or resource recreation",
      "State files contain only comments and can be edited freely",
      "Manual edits automatically update cloud infrastructure safely",
      "Terraform never reads state files during planning"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-4",
    question: "What does `terraform plan` primarily do?",
    options: [
      "Compares configuration and known state with refreshed provider information to propose actions without applying them",
      "Creates every resource immediately",
      "Deletes resources not mentioned in output variables only",
      "Uploads application artifacts to a container registry"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-5",
    question: "What is the purpose of `terraform apply`?",
    options: [
      "Executes the planned infrastructure changes after the applicable approval and confirmation flow",
      "Only formats Terraform files",
      "Always destroys and recreates every resource",
      "Only downloads provider binaries"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-6",
    question: "Why should production Terraform changes use a reviewed plan?",
    options: [
      "It makes intended creates, updates, replacements, and destroys visible before execution",
      "It guarantees that providers can never fail",
      "It removes the need for backups or access controls",
      "It prevents all out-of-band changes automatically"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-7",
    question: "What is infrastructure drift?",
    options: [
      "A difference between the actual infrastructure and the configuration or state assumptions maintained by IaC",
      "A Terraform file with too many comments",
      "A change in a developer's local terminal theme",
      "A successful provider download"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-8",
    question: "How should a team investigate unexpected Terraform drift?",
    options: [
      "Refresh and inspect the plan, identify the out-of-band change, assess impact, then reconcile configuration or infrastructure deliberately",
      "Immediately apply every proposed change without reviewing it",
      "Delete the state file and rerun apply",
      "Ignore all drift because Terraform always repairs it safely"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-9",
    question: "Why use a remote Terraform backend for team-managed infrastructure?",
    options: [
      "It centralizes state storage and can support collaboration, access controls, and state locking",
      "It makes state public to all internet users",
      "It removes the need to protect credentials",
      "It converts Terraform configuration into application code"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-10",
    question: "What problem does state locking help prevent?",
    options: [
      "Concurrent operations modifying the same state at the same time",
      "All cloud provider outages",
      "Every syntax error in configuration",
      "Unapproved changes made outside Terraform"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-11",
    question: "Why should Terraform state be treated as sensitive data?",
    options: [
      "It may contain resource attributes and values that expose credentials, identifiers, or internal infrastructure details",
      "It contains no resource information",
      "It is always encrypted in every storage location by default",
      "It is safe to commit to a public repository"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-12",
    question: "What is the role of a Terraform provider?",
    options: [
      "It implements resource and data-source interactions with an API such as a cloud platform",
      "It stores Git commit history",
      "It runs application unit tests automatically",
      "It replaces Terraform variables"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-13",
    question: "Why should provider versions be constrained in production projects?",
    options: [
      "To reduce unexpected behavior changes and make runs more reproducible",
      "To prevent providers from ever receiving security updates",
      "To ensure every resource is destroyed on upgrade",
      "To eliminate the need for a dependency lock file"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-14",
    question: "What does `.terraform.lock.hcl` help record?",
    options: [
      "Selected provider versions and checksums for more reproducible provider installation",
      "The current cloud account password",
      "Every resource's runtime logs",
      "The final IP address of every future resource"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-15",
    question: "What is the difference between a Terraform resource and a data source?",
    options: [
      "A resource manages a lifecycle object; a data source reads information about an existing object",
      "A resource only reads data; a data source always creates infrastructure",
      "Both are comments with different syntax",
      "A data source is used only for secret storage"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-16",
    question: "When should `for_each` be preferred over `count` for a collection of distinct named resources?",
    options: [
      "When stable, meaningful keys help preserve resource identity as collection members change",
      "Whenever the resource must have a random name on each run",
      "Only when the collection is always empty",
      "When all resources must share the same state address"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-17",
    question: "What risk can arise when `count` indexes shift after an element is removed from a list?",
    options: [
      "Index-based resource addresses may shift and cause unintended changes to resources",
      "Terraform will automatically convert all resources to data sources",
      "The provider will stop using the API",
      "The backend state becomes a container image"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-18",
    question: "What is the purpose of a Terraform output?",
    options: [
      "Expose selected values from a configuration or module for operators or calling modules",
      "Define a cloud resource's lifecycle by itself",
      "Lock the remote state",
      "Replace all input variables"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-19",
    question: "Why should reusable modules define clear input variables and outputs?",
    options: [
      "They create a predictable interface that lets callers configure and consume the module safely",
      "They prevent the module from being used by other projects",
      "They make all values globally accessible without declarations",
      "They remove dependency relationships between resources"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-20",
    question: "What is a module versioning best practice for shared production modules?",
    options: [
      "Publish immutable, versioned releases and upgrade consumers deliberately with validation",
      "Change the implementation behind every version tag without notice",
      "Use only an unpinned moving branch in production",
      "Delete previous module versions after every release"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-21",
    question: "What is the purpose of `terraform validate`?",
    options: [
      "Check whether the configuration is syntactically valid and internally consistent",
      "Verify that every cloud resource is healthy in production",
      "Apply infrastructure changes",
      "Run a full disaster recovery exercise"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-22",
    question: "What does `terraform fmt` do?",
    options: [
      "Formats Terraform configuration into a consistent canonical style",
      "Checks cloud bills for unexpected charges",
      "Encrypts Terraform state",
      "Deploys a Kubernetes cluster"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-23",
    question: "Why should IaC changes run automated tests in CI?",
    options: [
      "They can catch formatting, validation, policy, module, and plan regressions before production changes are applied",
      "They guarantee no runtime outage is possible",
      "They eliminate review requirements",
      "They replace provider authentication"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-24",
    question: "What is a key limitation of a Terraform plan?",
    options: [
      "It is based on the information available at planning time and cannot guarantee every runtime outcome or external change",
      "It always predicts every future API response exactly",
      "It automatically validates every application feature",
      "It guarantees that no resource replacement will occur"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-25",
    question: "A Terraform plan proposes destroying a production database unexpectedly. What should the operator do?",
    options: [
      "Stop, inspect dependencies and lifecycle changes, verify configuration and state, and investigate before applying",
      "Apply immediately because the plan is authoritative",
      "Delete the state file to hide the destroy action",
      "Disable backups so the operation completes faster"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-26",
    question: "What does `prevent_destroy` do when configured in a Terraform lifecycle block?",
    options: [
      "It causes Terraform to reject plans that would destroy that resource while the rule applies",
      "It prevents all updates to the resource",
      "It automatically creates and verifies backups",
      "It prevents deletion by cloud administrators outside Terraform"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-27",
    question: "What is the purpose of `create_before_destroy`?",
    options: [
      "Where supported, create a replacement before destroying the old object to reduce downtime",
      "Always destroy the old object before any replacement begins",
      "Prevent Terraform from detecting changes",
      "Copy state into a local backup automatically"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-28",
    question: "Why can `ignore_changes` be dangerous when used too broadly?",
    options: [
      "It can hide meaningful drift or configuration changes that the team should review and manage",
      "It guarantees that all resources are immutable",
      "It disables provider authentication",
      "It causes every resource to be recreated on each plan"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-29",
    question: "What is a Terraform import used for?",
    options: [
      "Associate an existing infrastructure object with a Terraform resource address so it can be managed through configuration",
      "Copy a provider plugin into a module",
      "Convert an application log into a state file",
      "Delete an unmanaged resource from the cloud automatically"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-30",
    question: "After importing an existing resource, what should be done before applying changes?",
    options: [
      "Write matching configuration, inspect the plan carefully, and reconcile differences without unintended replacement",
      "Assume the import generated a perfect complete configuration",
      "Immediately destroy and recreate the imported resource",
      "Remove provider constraints and skip review"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-31",
    question: "What is the purpose of a `moved` block in Terraform?",
    options: [
      "Declare a resource or module address change so Terraform can update its state address without recreating the object",
      "Move a cloud resource to another region automatically in every case",
      "Move secrets into public outputs",
      "Rename a provider executable"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-32",
    question: "Why should a Terraform workspace not automatically be treated as a complete security boundary?",
    options: [
      "Workspaces may share configuration and credentials; access controls and backend isolation still need deliberate design",
      "Workspaces always use separate cloud accounts and separate permissions by default",
      "Workspaces cannot hold state",
      "Workspaces disable all provider access"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-33",
    question: "When are separate root configurations or backends often preferable to workspaces?",
    options: [
      "When environments need stronger isolation, distinct permissions, independent lifecycles, or separate state access",
      "When every environment must always share identical state",
      "When Terraform code contains no resources",
      "Only when formatting configuration"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-34",
    question: "What is a common risk of using one large Terraform state for many unrelated systems?",
    options: [
      "A change can have a broad blast radius and operations can become slower or harder to coordinate",
      "Terraform no longer supports variables",
      "All resources become read-only",
      "Provider plugins are no longer required"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-35",
    question: "How can Terraform state be partitioned responsibly?",
    options: [
      "Split by clear ownership and lifecycle boundaries while explicitly managing cross-state dependencies and interfaces",
      "Create a separate state for every single attribute",
      "Split randomly without documenting dependencies",
      "Make every state publicly readable"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-36",
    question: "What is the role of a data-only or read-only plan in an operational workflow?",
    options: [
      "Inspect current infrastructure and proposed differences without committing changes",
      "Guarantee all future infrastructure will be unchanged",
      "Replace the need for provider credentials in all cases",
      "Automatically repair every drift issue"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-37",
    question: "Why should production pipelines use least-privilege cloud credentials?",
    options: [
      "A compromised or misconfigured pipeline should have only the permissions necessary for its approved tasks",
      "Broad administrator permissions make all deployments safer",
      "Least privilege prevents all software bugs",
      "Terraform cannot work with scoped permissions"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-38",
    question: "What is a safer alternative to long-lived static cloud keys in CI where supported?",
    options: [
      "Use workload identity federation or short-lived role credentials with scoped permissions",
      "Store administrator keys in repository source files",
      "Reuse one shared key across all teams indefinitely",
      "Print credentials into build logs for debugging"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-39",
    question: "Why should secrets not be passed as plain text in Terraform command-line arguments?",
    options: [
      "They may appear in shell history, process listings, logs, or other observable places",
      "Terraform never accepts variable values",
      "Command-line values are always encrypted automatically",
      "Plain text arguments prevent state locking"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-40",
    question: "What should be considered before marking a Terraform variable as `sensitive`?",
    options: [
      "It redacts some CLI output but does not guarantee that the value is absent from state or all logs",
      "It encrypts the value in every possible backend and log automatically",
      "It prevents the provider from receiving the value",
      "It removes the value from configuration evaluation"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-41",
    question: "Why is policy as code useful for infrastructure pipelines?",
    options: [
      "It can enforce organization rules such as approved regions, encryption, tagging, and public exposure constraints before changes are applied",
      "It guarantees that application code contains no defects",
      "It replaces cloud IAM completely",
      "It automatically resolves every policy violation without review"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-42",
    question: "What is the difference between a preventive policy check and a detective control?",
    options: [
      "A preventive check blocks or constrains a change; a detective control identifies noncompliance after or as it occurs",
      "Preventive checks only run after an incident; detective controls always block deployment",
      "Both mean disabling audit logs",
      "Detective controls create infrastructure while preventive controls delete it"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-43",
    question: "A Terraform plan creates a storage bucket with public access. What is the correct CI behavior in a secure environment?",
    options: [
      "Fail the policy gate or require an explicit, reviewed exception if public access is genuinely intended",
      "Apply it automatically because Terraform produced the plan",
      "Disable the policy engine for all future runs",
      "Remove the bucket's encryption configuration"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-44",
    question: "Why should resource tags be enforced through reusable modules or policy checks?",
    options: [
      "Consistent ownership, environment, cost-center, and data-classification metadata improves governance and cost attribution",
      "Tags automatically encrypt all data",
      "Tags remove the need for access control",
      "Tags guarantee that no unused resource exists"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-45",
    question: "What is a safe approach to Terraform changes across development, staging, and production?",
    options: [
      "Promote reviewed changes through isolated environments, validate plans, and use explicit production approvals and controls",
      "Run unreviewed applies in all environments simultaneously",
      "Use different untracked code in each environment",
      "Skip lower environments to avoid discovering issues"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-46",
    question: "Why should a production apply require a controlled approval step?",
    options: [
      "It creates a deliberate checkpoint to review the exact plan, risk, and change authorization before execution",
      "Approval makes the provider API infallible",
      "It removes the need to inspect destructive actions",
      "It guarantees no one can modify infrastructure outside Terraform"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-47",
    question: "What is the value of saving and applying a specific reviewed Terraform plan in CI?",
    options: [
      "It reduces the chance that the applied action set differs from the plan that was reviewed",
      "It guarantees the cloud environment cannot change between plan and apply",
      "It bypasses all state checks",
      "It makes the plan file safe to publish publicly without review"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-48",
    question: "Why must saved plan files be protected?",
    options: [
      "They can contain sensitive configuration and planned values and should be handled as restricted build artifacts",
      "They contain only formatting instructions",
      "They cannot contain provider data",
      "They are always safe to commit to a public repository"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-49",
    question: "How should a pipeline react if the infrastructure changes between planning and applying?",
    options: [
      "Re-evaluate state and create a fresh plan for review rather than forcing a stale or unsafe apply",
      "Force the old plan regardless of state errors",
      "Delete the remote state lock permanently",
      "Ignore the provider's state consistency checks"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-50",
    question: "What is a common challenge with applying one shared Terraform state from multiple CI jobs?",
    options: [
      "Concurrent jobs can conflict or produce stale plans, so locking and pipeline coordination are needed",
      "Terraform state can only be read by one person ever",
      "CI jobs automatically merge conflicting plans safely",
      "Parallel applies guarantee faster and safer infrastructure changes"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-51",
    question: "What should be included in an IaC code review for a high-risk change?",
    options: [
      "Resource replacements and destroys, IAM changes, network exposure, data migration, cost, dependencies, and rollback or recovery considerations",
      "Only variable names and indentation",
      "Only whether the pipeline runs quickly",
      "Only the number of changed files"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-52",
    question: "Why is a Terraform destroy operation especially sensitive in production?",
    options: [
      "It can remove critical services or data, so scope, approvals, backups, and recovery options must be verified",
      "Destroy operations never affect persistent data",
      "Terraform always refuses to destroy production resources",
      "Destroy does not require provider authentication"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-53",
    question: "What does `terraform refresh` historically do, and why should teams understand their Terraform version's workflow before using it?",
    options: [
      "It updates state information from remote objects without serving as a substitute for reviewing a plan; command behavior and recommended workflows vary by version",
      "It formats HCL and changes no state",
      "It always applies all configuration changes",
      "It deletes all resources absent from the local machine"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-54",
    question: "What is the purpose of `terraform state list`?",
    options: [
      "Show resource addresses recorded in the selected state",
      "List every resource available in every cloud account",
      "Apply the current plan",
      "Show all application container logs"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-55",
    question: "What should be checked before using `terraform state rm`?",
    options: [
      "Understand that it removes the state binding without destroying the real object, and plan how ownership will be managed afterward",
      "Assume it deletes the cloud object and its backups safely",
      "Run it to refresh provider versions",
      "Use it to encrypt all state attributes"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-56",
    question: "What is the purpose of `terraform state mv`?",
    options: [
      "Change a resource address in state, commonly during refactoring, without directly moving the real infrastructure object",
      "Move a running VM to another region in all providers",
      "Create a new backend automatically",
      "Rotate every cloud credential"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-57",
    question: "Why should a Terraform refactor be validated with a plan after address changes or `moved` blocks?",
    options: [
      "To confirm Terraform recognizes the intended address mapping and does not propose unintended resource replacement",
      "To guarantee no provider API call can fail",
      "To delete resources that have moved in code",
      "To avoid reviewing the state mapping"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-58",
    question: "How should teams handle a provider upgrade that changes resource behavior?",
    options: [
      "Review upgrade notes, update constraints and lock files deliberately, test plans in a nonproduction environment, and inspect replacements or schema changes",
      "Upgrade all providers directly in production without a plan",
      "Delete the lock file and ignore every proposed replacement",
      "Assume all provider versions behave identically"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-59",
    question: "What is the benefit of pinning a Terraform CLI version in CI?",
    options: [
      "It reduces differences in command behavior and planning across developer and pipeline environments",
      "It automatically pins every cloud resource's firmware",
      "It prevents all configuration drift",
      "It removes the need for provider version constraints"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-60",
    question: "Why should a Terraform pipeline run with a controlled working directory and explicit backend configuration?",
    options: [
      "It helps ensure the intended root module, environment, and state are selected rather than accidentally targeting another environment",
      "It makes all environments share the same state automatically",
      "It guarantees that the current cloud account is correct without verification",
      "It removes the need to authenticate"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-61",
    question: "What is a safe check before running `terraform apply` in a new terminal session?",
    options: [
      "Confirm the working directory, workspace or backend, account identity, variable files, and reviewed plan",
      "Assume the last session's context is always still selected",
      "Delete local configuration to force Terraform to guess",
      "Run apply before logging in to identify errors"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-62",
    question: "Why should provider credentials and target account identity be verified in production pipelines?",
    options: [
      "A valid credential can still point to the wrong account or subscription, causing changes in the wrong environment",
      "Credential validity guarantees the account is the intended production account",
      "Account identity does not affect resource operations",
      "Terraform automatically detects every mistaken target and blocks it"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-63",
    question: "What is the role of an explicit provider alias?",
    options: [
      "Configure multiple provider instances, such as different regions or accounts, and select the intended one for resources or modules",
      "Rename the Terraform state file automatically",
      "Encrypt provider logs",
      "Make resources independent of all cloud accounts"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-64",
    question: "What risk should be reviewed when a module uses multiple provider aliases?",
    options: [
      "Ensure each resource and child module receives the correct provider configuration and target account or region",
      "Assume aliases are selected automatically by resource names",
      "Remove all provider requirements from child modules",
      "Use the same privileged provider for every target regardless of scope"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-65",
    question: "Why are explicit dependency declarations sometimes needed in Terraform?",
    options: [
      "When the dependency cannot be inferred from references but ordering is required for correct operations",
      "To make every resource depend on every other resource",
      "To disable Terraform's dependency graph",
      "To replace variables with hard-coded values"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-66",
    question: "Why can excessive `depends_on` declarations be harmful?",
    options: [
      "They can serialize operations unnecessarily and obscure the real dependency graph",
      "They automatically reduce all deployment time",
      "They eliminate the need for provider APIs",
      "They prevent resources from ever being destroyed"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-67",
    question: "What is a common use of `locals` in Terraform?",
    options: [
      "Define reusable derived values or expressions to make configuration clearer and reduce repetition",
      "Store secrets securely outside state by default",
      "Create cloud resources without resource blocks",
      "Replace all module outputs automatically"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-68",
    question: "Why should hard-coded environment-specific values be minimized in reusable Terraform code?",
    options: [
      "Inputs and environment-specific configuration improve reuse, reviewability, and reduce accidental cross-environment changes",
      "Hard-coded values make all plans deterministic under every condition",
      "Terraform does not support variables",
      "Environment separation is unnecessary when code is shared"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-69",
    question: "What is the purpose of variable validation blocks?",
    options: [
      "Reject invalid input values early with a meaningful constraint before infrastructure changes proceed",
      "Automatically correct every incorrect input silently",
      "Replace provider-side API validation completely",
      "Encrypt input variables in the state file"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-70",
    question: "What is the benefit of using type constraints for Terraform variables?",
    options: [
      "They make expected input structure explicit and catch incompatible values earlier",
      "They guarantee all cloud resources are configured securely",
      "They remove the need for module documentation",
      "They make every variable optional regardless of its declaration"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-71",
    question: "Why should default values for security-sensitive variables be chosen carefully?",
    options: [
      "A permissive default can silently create exposed or weak infrastructure when callers omit an input",
      "Defaults are never used by Terraform",
      "Security-sensitive variables cannot have defaults",
      "Defaults automatically override policy checks"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-72",
    question: "What is a useful strategy for managing secrets needed by Terraform?",
    options: [
      "Retrieve secrets from an approved secret manager or short-lived identity mechanism and minimize exposure in plans, state, and logs",
      "Commit secrets to `.tfvars` files in source control",
      "Output every secret for easier debugging",
      "Use public object storage as the shared secret store"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-73",
    question: "Why is encrypting a remote Terraform backend at rest not enough by itself?",
    options: [
      "Access controls, transport security, auditing, state locking, backups, and secret exposure in plans or logs also matter",
      "Encryption at rest makes state public by design",
      "Backend encryption prevents all unauthorized API calls automatically",
      "Encryption removes the need for recovery procedures"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-74",
    question: "What should be included in a Terraform state recovery plan?",
    options: [
      "Versioned or backed-up state, access procedures, locking considerations, validation, and a tested restore process",
      "Only a copy of the latest source files",
      "A public link to the state file",
      "A rule to delete the state after every apply"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-75",
    question: "Why should a team avoid restoring an old state backup without understanding current infrastructure?",
    options: [
      "The restored state may be stale and no longer match real resources, potentially causing unsafe operations",
      "Old state backups always update themselves to current infrastructure",
      "Terraform will always reconstruct every missing mapping perfectly",
      "Restoring state automatically rolls back cloud-side changes"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-76",
    question: "What is the value of running a drift-detection plan on a schedule?",
    options: [
      "It can reveal out-of-band changes before they become a surprise during a later deployment",
      "It prevents all out-of-band changes from occurring",
      "It automatically repairs every drift without review",
      "It replaces access logs and cloud audit events"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-77",
    question: "How should automated drift remediation be designed for critical infrastructure?",
    options: [
      "Use explicit policy, limited scope, safe change windows, review or approval for risky actions, and verification",
      "Automatically apply every drift plan regardless of impact",
      "Delete resources whenever they differ from configuration",
      "Disable drift detection after the first alert"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-78",
    question: "What is a useful way to test a Terraform module?",
    options: [
      "Validate inputs and outputs, use static checks and policy tests, and run integration tests against a controlled environment where appropriate",
      "Only inspect the module's filename",
      "Run it against production and assume success proves correctness",
      "Skip tests because Terraform plans are always correct"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-79",
    question: "Why are unit-style tests and integration tests complementary for IaC?",
    options: [
      "Static or mocked tests check logic quickly, while integration tests reveal real provider and infrastructure interactions",
      "They are identical and one should always replace the other",
      "Integration tests cannot find any provider-related issue",
      "Unit tests always prove production availability"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-80",
    question: "What is the purpose of a disposable test environment for infrastructure modules?",
    options: [
      "It allows realistic create, update, and destroy behavior to be tested without risking long-lived production resources",
      "It ensures the module never needs cleanup",
      "It replaces the need to constrain cloud permissions",
      "It is used to store production secrets permanently"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-81",
    question: "Why should test cleanup be part of an IaC test pipeline?",
    options: [
      "Temporary resources can incur cost, consume quotas, or expose attack surfaces if left behind",
      "Cleanup always deletes production resources automatically",
      "Temporary resources do not cost money",
      "Cleanup makes tests less reproducible"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-82",
    question: "What is the role of static security scanning in an IaC pipeline?",
    options: [
      "Detect risky configuration patterns such as public exposure, weak encryption settings, or excessive permissions before deployment",
      "Prove that the running infrastructure has no vulnerabilities",
      "Replace cloud audit logs completely",
      "Automatically fix every issue without review"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-83",
    question: "Why should IaC security findings be prioritized by context rather than count alone?",
    options: [
      "Severity depends on exposure, data sensitivity, reachability, exploitability, and compensating controls",
      "Every finding has exactly the same real-world risk",
      "A larger finding count always means greater customer impact",
      "Low-severity findings never matter"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-84",
    question: "What should happen when a policy scan finds a justified exception?",
    options: [
      "Record the rationale, owner, scope, expiry or review date, and required approval",
      "Disable the policy for the entire repository permanently",
      "Ignore the finding without a record",
      "Publish all infrastructure credentials as proof of approval"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-85",
    question: "What is the purpose of tagging and cost allocation in IaC?",
    options: [
      "Connect resource usage to owners, applications, environments, and budgets for reporting and accountability",
      "Automatically reduce every resource's unit price",
      "Prevent all idle resources from existing",
      "Replace billing exports with source-control commits"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-86",
    question: "How can Terraform code help reduce cloud cost without harming reliability?",
    options: [
      "Use reviewed sizing and lifecycle policies, remove unused resources safely, and validate availability and recovery requirements",
      "Always select the smallest possible instance regardless of workload",
      "Disable backups and redundancy for every production service",
      "Create extra resources in every region without a use case"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-87",
    question: "Why should resource deletion policies account for data retention requirements?",
    options: [
      "Infrastructure cleanup can otherwise delete records or backups needed for compliance, recovery, or business operations",
      "All cloud resources can be deleted without affecting stored data",
      "Retention is determined only by Terraform file names",
      "Deletion policies eliminate the need for backups"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-88",
    question: "What is the purpose of a `terraform_data` resource in modern Terraform configurations?",
    options: [
      "Represent lifecycle-triggered data or actions within Terraform's graph where that resource type is appropriate",
      "Store all remote state securely by default",
      "Replace every cloud provider resource",
      "Automatically run arbitrary shell commands on every plan"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-89",
    question: "Why should provisioners generally be used cautiously?",
    options: [
      "They can be difficult to model and recover reliably compared with provider-native resources, images, or configuration-management tools",
      "They always run before Terraform creates any resource",
      "They provide complete idempotency automatically",
      "They are required for every resource type"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-90",
    question: "What is the value of immutable infrastructure patterns?",
    options: [
      "Replace instances or artifacts with known versions rather than applying uncontrolled changes in place where feasible",
      "Modify running servers manually without recording changes",
      "Guarantee that no deployment can fail",
      "Eliminate the need for rollback versions"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-91",
    question: "Why should Terraform not usually be used as a substitute for a full application deployment system?",
    options: [
      "Terraform focuses on infrastructure lifecycle, while application rollout, health checks, and artifact promotion often need specialized deployment workflows",
      "Terraform cannot create any compute resources",
      "Terraform is unable to use modules",
      "Application deployments never depend on infrastructure"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-92",
    question: "What is a safe way to coordinate Terraform changes with Kubernetes or application deployments?",
    options: [
      "Define ownership boundaries, manage dependency ordering deliberately, and use staged workflows with health verification",
      "Have multiple pipelines mutate the same resources without coordination",
      "Make every application deploy trigger a full infrastructure destroy",
      "Ignore compatibility between infrastructure and application versions"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-93",
    question: "Why should infrastructure changes be observable after they are applied?",
    options: [
      "Post-apply checks can confirm actual resource state, service health, policy compliance, and expected operational behavior",
      "A successful apply guarantees all application workflows work",
      "Observability is needed only before deployment",
      "Cloud APIs never partially fail"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-94",
    question: "What is the best response when a Terraform apply fails halfway through?",
    options: [
      "Inspect the error, state, and actual infrastructure, then create a new reviewed plan before attempting recovery",
      "Assume all resources were rolled back automatically",
      "Delete the backend state immediately",
      "Repeat apply in a tight loop without inspecting the failure"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-95",
    question: "Why should a team avoid running `terraform apply -auto-approve` casually in production?",
    options: [
      "It removes the interactive confirmation checkpoint, so safeguards must instead come from a carefully controlled pipeline and explicit approvals",
      "It automatically creates a second independent approval",
      "It prevents Terraform from modifying infrastructure",
      "It guarantees the plan contains no destructive actions"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-96",
    question: "What should an emergency IaC change process preserve even when speed is important?",
    options: [
      "Authentication controls, audit trail, scope validation, review where feasible, and post-change verification",
      "Unrestricted credentials and unrecorded manual edits",
      "A requirement to skip all recovery planning",
      "A promise that no follow-up review is needed"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-97",
    question: "How should a team manage a resource that is intentionally managed outside Terraform after a handoff?",
    options: [
      "Document ownership, remove or transfer the state binding deliberately, and ensure another control process manages its lifecycle",
      "Leave two independent systems managing it without coordination",
      "Delete the real resource to remove ownership ambiguity",
      "Keep applying Terraform changes even when ownership is unclear"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-98",
    question: "Why is clear resource ownership important when multiple teams use IaC?",
    options: [
      "It reduces conflicting changes, clarifies approvals and incident responsibility, and defines who maintains the resource lifecycle",
      "It guarantees teams will never have incidents",
      "It removes the need for access controls",
      "It allows all teams to edit every state file freely"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-99",
    question: "What is a good criterion for splitting a large Terraform module?",
    options: [
      "A coherent lifecycle, clear ownership, manageable interface, and meaningful reuse or testing boundary justify the split",
      "Every resource must always have its own module",
      "Module count should be maximized regardless of complexity",
      "Modules should be split randomly by file size only"
    ],
    answer: 0
  },
  {
    id: "terraform-iac-advanced-100",
    question: "Why should module interfaces avoid exposing unnecessary implementation details?",
    options: [
      "A smaller stable interface reduces coupling and lets internals evolve without forcing all callers to change",
      "It prevents consumers from passing any configuration",
      "It guarantees provider APIs never change",
      "It makes module tests unnecessary"
    ],
    answer: 0
  }
];
