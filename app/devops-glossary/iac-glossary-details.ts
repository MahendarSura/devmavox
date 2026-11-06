import type { GlossaryTerm } from "./glossary-data";

export const iacGlossaryDetails: Record<string, Partial<GlossaryTerm>> = {

  "Infrastructure as Code": {
    purpose: "Infrastructure as Code (IaC) manages infrastructure through machine-readable configuration files instead of relying on repeated manual console operations. Teams can review, version, test and reproduce infrastructure changes using tools such as Terraform, CloudFormation and other provisioning systems.",
    project: "A DevOps team defines an AWS VPC, public and private subnets, security groups and application compute resources in Terraform. The configuration is reviewed through a pull request before the infrastructure is provisioned.",
    workflow: [
      "Define infrastructure requirements such as networking, compute, storage and access controls.",
      "Write declarative configuration files describing the desired infrastructure.",
      "Store the configuration in a version-controlled repository.",
      "Run formatting, validation and security checks.",
      "Generate a plan or preview of proposed infrastructure changes.",
      "Review and approve the changes before applying them.",
      "Monitor the deployed infrastructure and detect configuration drift."
    ],
    commands: [
      "terraform init",
      "terraform fmt -check -recursive",
      "terraform validate",
      "terraform plan",
      "terraform apply",
      "terraform output",
      "terraform plan -refresh-only"
    ],
    mistakes: [
      "Making manual production changes that are not reflected in the IaC configuration.",
      "Applying infrastructure changes without reviewing the execution plan.",
      "Storing state files or credentials in an unsecured source repository.",
      "Hardcoding passwords, access keys or environment-specific values.",
      "Using broad permissions for infrastructure automation identities.",
      "Ignoring dependencies and resource replacement warnings in plans."
    ],
    configuration: [
      "Organize configuration into reusable files and modules.",
      "Separate development, staging and production configuration.",
      "Configure remote state storage and locking where supported by the backend.",
      "Use variables and outputs instead of hardcoding environment-specific values.",
      "Pin provider and module versions according to a controlled upgrade policy.",
      "Configure CI validation and approval gates before production applies."
    ],
    troubleshooting: [
      "If provisioning fails, inspect the provider error and identify the resource operation that failed.",
      "If configuration is invalid, run terraform validate and inspect the relevant file and line.",
      "If actual infrastructure differs from configuration, inspect the plan for drift and unexpected changes.",
      "If concurrent operations are blocked, inspect backend state locking before taking recovery action.",
      "If a resource cannot be found, verify account, region, provider configuration and permissions.",
      "If a deployment proposes resource replacement, inspect immutable attributes and dependencies before applying."
    ],
    bestPractices: [
      "Treat infrastructure configuration as reviewed application code.",
      "Use reusable modules for common infrastructure patterns.",
      "Keep production changes behind approval controls.",
      "Use remote state with appropriate locking and access restrictions.",
      "Run formatting, validation, policy and security checks in CI.",
      "Review destructive changes and replacement operations carefully.",
      "Maintain a documented recovery process for state and infrastructure failures."
    ],
    securityConsiderations: [
      "Never commit cloud credentials, private keys or plaintext secrets.",
      "Restrict state-file access because it may contain sensitive values.",
      "Use short-lived workload identities or role assumption where supported.",
      "Apply least-privilege permissions to provisioning pipelines.",
      "Encrypt remote state and use secure backend access policies.",
      "Scan IaC files for public exposure, excessive permissions and insecure defaults."
    ]
  },

  "Terraform": {
    purpose: "Terraform is an infrastructure provisioning tool that uses declarative configuration to describe resources and their desired relationships. It compares configuration with recorded state and provider information to determine the actions required to create, update or destroy infrastructure.",
    project: "A platform team uses Terraform with the AWS provider to create an application VPC, subnets, security groups, an EKS cluster and supporting resources. Engineers review the plan and apply approved changes through a controlled pipeline.",
    workflow: [
      "Write Terraform configuration using resources, variables, outputs and modules.",
      "Configure required providers and version constraints.",
      "Initialize the working directory with terraform init.",
      "Format and validate the configuration.",
      "Generate a plan and review proposed changes.",
      "Apply the approved configuration.",
      "Store and manage state securely.",
      "Review drift and update configuration as infrastructure requirements change."
    ],
    commands: [
      "terraform version",
      "terraform init",
      "terraform fmt -recursive",
      "terraform validate",
      "terraform plan -out=tfplan",
      "terraform show tfplan",
      "terraform apply tfplan",
      "terraform destroy"
    ],
    mistakes: [
      "Running terraform apply without reviewing the plan.",
      "Sharing one local state file across multiple engineers.",
      "Ignoring provider version constraints.",
      "Changing resource names without understanding Terraform address changes.",
      "Using terraform destroy in the wrong workspace or environment.",
      "Committing sensitive tfvars files or state files to Git."
    ],
    configuration: [
      "Declare required_providers and provider version constraints.",
      "Configure provider region, authentication and required account settings.",
      "Use variables for environment-specific inputs.",
      "Use outputs to expose selected resource attributes.",
      "Configure remote backends for shared environments.",
      "Separate environments using a deliberate directory, workspace or state-management strategy."
    ],
    troubleshooting: [
      "If terraform init fails, inspect backend configuration, provider sources and network connectivity.",
      "If validation fails, inspect resource arguments and variable types.",
      "If credentials fail, verify the active identity and provider authentication method.",
      "If a plan shows unexpected deletion, inspect state, configuration changes and lifecycle settings.",
      "If state locking fails, verify whether another operation is active before considering lock recovery.",
      "If provider behavior changes after an upgrade, inspect provider release notes and test the version change."
    ],
    bestPractices: [
      "Pin provider versions and review upgrades.",
      "Use modules for repeated infrastructure patterns.",
      "Run plan and policy checks before production changes.",
      "Use remote state and locking for shared environments.",
      "Keep secrets outside source-controlled configuration.",
      "Use separate state boundaries for independent environments.",
      "Review resource replacement and deletion carefully."
    ],
    securityConsiderations: [
      "Use IAM roles or short-lived credentials instead of embedded access keys.",
      "Protect state files and plan files because they may contain sensitive data.",
      "Restrict who can execute production applies.",
      "Scan Terraform configuration for insecure network and identity settings.",
      "Protect backend credentials and state encryption keys.",
      "Do not expose sensitive outputs in logs or CI artifacts."
    ]
  },

  "Terraform Provider": {
    purpose: "A Terraform provider is a plugin that allows Terraform to communicate with an external platform or service API. Providers define the resources and data sources Terraform can manage, including their arguments, attributes and lifecycle behavior.",
    project: "A team configures the AWS provider so Terraform can create EC2 instances, VPC resources and security groups. A separate Kubernetes provider may manage Kubernetes resources after the cluster becomes available.",
    workflow: [
      "Declare the provider source and version requirement.",
      "Configure provider settings such as region or endpoint.",
      "Initialize the working directory to download provider plugins.",
      "Authenticate using an approved identity mechanism.",
      "Define resources and data sources supported by the provider.",
      "Validate and plan the configuration.",
      "Apply changes and monitor provider/API errors."
    ],
    commands: [
      "terraform providers",
      "terraform init",
      "terraform init -upgrade",
      "terraform providers lock",
      "terraform validate",
      "terraform plan",
      "terraform version"
    ],
    mistakes: [
      "Using an incorrect provider source address.",
      "Upgrading provider versions without reviewing breaking changes.",
      "Configuring the wrong cloud region or account.",
      "Hardcoding provider credentials in configuration files.",
      "Assuming one provider manages resources owned by another platform.",
      "Ignoring provider lock-file changes in a reviewed repository."
    ],
    configuration: [
      "Declare required_providers with source and version constraints.",
      "Configure aliases when multiple accounts, regions or provider configurations are needed.",
      "Use environment-based authentication or role assumption where supported.",
      "Commit .terraform.lock.hcl to preserve selected provider versions and checksums.",
      "Use explicit provider references for resources that require an aliased provider.",
      "Review provider documentation before using resource arguments or data sources."
    ],
    troubleshooting: [
      "If a provider cannot be installed, inspect registry connectivity and source address.",
      "If authentication fails, verify the identity and credentials used by the provider.",
      "If a resource is created in the wrong region, inspect provider configuration and aliases.",
      "If an argument is unsupported, verify the installed provider version and resource documentation.",
      "If provider initialization reports checksum issues, inspect the lock file and approved dependency sources.",
      "If API rate limits occur, inspect request volume and provider retry behavior."
    ],
    bestPractices: [
      "Use explicit provider source addresses and version constraints.",
      "Review provider upgrades in a separate change.",
      "Commit the dependency lock file.",
      "Use provider aliases deliberately and document account boundaries.",
      "Prefer supported authentication mechanisms over static secrets.",
      "Test provider changes in non-production environments first."
    ],
    securityConsiderations: [
      "Download providers from trusted sources.",
      "Review provider permissions and required API access.",
      "Protect authentication tokens and cloud credentials.",
      "Use least-privilege roles for each provider configuration.",
      "Validate provider checksums through the lock file.",
      "Review third-party providers before allowing them into production pipelines."
    ]
  },

  "Terraform Resource": {
    purpose: "A Terraform resource represents an infrastructure object that Terraform manages through a provider. Its configuration describes the desired properties of the object, while Terraform state tracks the relationship between the configuration and the real infrastructure.",
    project: "An engineer defines an AWS security group resource with approved inbound HTTPS access and references it from an EC2 instance configuration. Terraform creates and manages both resources according to their dependencies.",
    workflow: [
      "Select the provider resource type required for the infrastructure object.",
      "Define a unique resource label within the module.",
      "Configure required and optional resource arguments.",
      "Reference other resources to express dependencies.",
      "Run formatting, validation and planning.",
      "Review create, update, replacement or destroy actions.",
      "Apply the approved plan and inspect resulting attributes."
    ],
    commands: [
      "terraform validate",
      "terraform plan",
      "terraform state list",
      "terraform state show aws_instance.app",
      "terraform show",
      "terraform plan -refresh-only",
      "terraform apply"
    ],
    mistakes: [
      "Using an incorrect resource type or unsupported argument.",
      "Creating duplicate resources because existing infrastructure was not imported.",
      "Ignoring implicit and explicit resource dependencies.",
      "Changing immutable arguments without understanding replacement behavior.",
      "Hardcoding sensitive values in resource arguments.",
      "Removing a resource block without considering the planned destruction."
    ],
    configuration: [
      "Use meaningful resource labels and consistent naming conventions.",
      "Reference resource attributes rather than duplicating values.",
      "Use depends_on only when an implicit dependency is insufficient.",
      "Configure lifecycle rules only when their behavior is understood.",
      "Use variables and locals to avoid repeated hardcoded values.",
      "Define tags, labels and ownership metadata where supported."
    ],
    troubleshooting: [
      "If Terraform cannot find a resource type, verify provider installation and resource naming.",
      "If creation fails, inspect provider API errors and required arguments.",
      "If a resource is replaced unexpectedly, inspect changes to immutable fields.",
      "If Terraform wants to create an existing object, investigate import and state association.",
      "If dependencies are ordered incorrectly, inspect references and dependency declarations.",
      "If a resource is missing from state, inspect state carefully before importing or recreating it."
    ],
    bestPractices: [
      "Keep resource definitions focused and readable.",
      "Use references to establish resource relationships.",
      "Review destructive and replacement actions before applying.",
      "Import existing infrastructure when bringing it under Terraform management.",
      "Use consistent tags and resource naming.",
      "Test lifecycle behavior in a non-production environment."
    ],
    securityConsiderations: [
      "Avoid hardcoded credentials and sensitive resource arguments.",
      "Restrict resource permissions to the required infrastructure scope.",
      "Review security group, firewall and public-access settings.",
      "Protect state values that may contain sensitive resource attributes.",
      "Require review for changes to IAM and network resources.",
      "Inspect plans for accidental exposure or destruction of critical resources."
    ]
  },

  "Terraform State": {
    purpose: "Terraform state records the mapping between resource addresses in configuration and the real objects managed by Terraform. It also stores resource attributes used to calculate future changes. State is essential for reliable planning and must be protected against corruption, concurrent modification and unauthorized access.",
    project: "A team stores Terraform state in an approved remote backend with access restrictions and locking support. Multiple engineers can collaborate while Terraform coordinates state updates and tracks AWS resource identifiers.",
    workflow: [
      "Initialize Terraform with the configured backend.",
      "Read the current state before planning changes.",
      "Compare configuration, state and provider-observed infrastructure.",
      "Generate a plan based on the current state.",
      "Apply approved changes and update state.",
      "Use locking to coordinate concurrent operations where supported.",
      "Back up and recover state through a documented procedure."
    ],
    commands: [
      "terraform state list",
      "terraform state show aws_instance.app",
      "terraform state pull",
      "terraform state mv OLD_ADDRESS NEW_ADDRESS",
      "terraform state rm aws_instance.app",
      "terraform force-unlock LOCK_ID",
      "terraform plan -refresh-only"
    ],
    mistakes: [
      "Committing state files containing sensitive information to a public repository.",
      "Allowing multiple engineers to modify shared state without locking.",
      "Manually editing state JSON without a recovery plan.",
      "Deleting state because Terraform reports an error.",
      "Running state commands against the wrong workspace or backend.",
      "Using force-unlock while another legitimate operation is active."
    ],
    configuration: [
      "Configure a remote backend appropriate for the organization.",
      "Enable backend encryption and access restrictions.",
      "Use backend locking where supported by the selected backend.",
      "Define backup and recovery procedures.",
      "Separate state for environments that require independent ownership.",
      "Restrict state access to authorized infrastructure operators and automation."
    ],
    troubleshooting: [
      "If state locking fails, identify the lock owner and confirm whether an operation is still running.",
      "If resources appear missing, verify the selected backend and workspace.",
      "If state and infrastructure differ, inspect a refresh-only plan before making changes.",
      "If a state operation fails, preserve a backup and inspect the exact resource address.",
      "If state is corrupted, follow the backend recovery process rather than manually recreating resources.",
      "If a resource address changed after refactoring, use a controlled state move or migration."
    ],
    bestPractices: [
      "Use remote state for team-managed infrastructure.",
      "Enable locking where supported.",
      "Back up state and test recovery procedures.",
      "Separate state by environment and ownership boundary.",
      "Review state operations before executing them.",
      "Keep state access restricted and auditable."
    ],
    securityConsiderations: [
      "Treat state as sensitive data even when configuration marks values as sensitive.",
      "Encrypt state at rest and protect transport.",
      "Restrict read and write access to authorized identities.",
      "Never commit state files or state backups to public repositories.",
      "Audit state access and administrative recovery operations.",
      "Protect backend credentials and encryption keys."
    ]
  },

  "Terraform Module": {
    purpose: "A Terraform module is a collection of Terraform configuration files managed together as a reusable unit. Modules help teams standardize infrastructure patterns, expose input variables and outputs, and reduce repeated resource definitions across projects and environments.",
    project: "A platform team creates a reusable VPC module that accepts CIDR ranges, subnet definitions and tags as inputs. Development, staging and production environments call the same module with different approved values.",
    workflow: [
      "Identify a reusable infrastructure pattern.",
      "Create a module directory containing resource, variable and output definitions.",
      "Define a clear input and output interface.",
      "Reference the module from a root configuration.",
      "Pin module versions or source revisions.",
      "Initialize, validate and plan the root configuration.",
      "Review module changes and test them before reuse across environments."
    ],
    commands: [
      "terraform init",
      "terraform get",
      "terraform validate",
      "terraform plan",
      "terraform providers",
      "terraform fmt -recursive",
      "terraform apply"
    ],
    mistakes: [
      "Building modules with too many unrelated responsibilities.",
      "Exposing unnecessary internal implementation details.",
      "Changing module inputs without considering existing consumers.",
      "Using unpinned external module versions in production.",
      "Duplicating configuration instead of using an existing approved module.",
      "Assuming a module automatically creates isolation between environments."
    ],
    configuration: [
      "Define variables with descriptions, types and validation rules.",
      "Expose only useful outputs.",
      "Use clear module source paths and version constraints.",
      "Document required providers and provider configurations.",
      "Keep module examples and README documentation current.",
      "Separate reusable module code from environment-specific root configuration."
    ],
    troubleshooting: [
      "If a module source cannot be downloaded, inspect its source address, version and credentials.",
      "If a required input is missing, inspect the module variable definitions and calling configuration.",
      "If an output is unavailable, verify that it is declared and referenced correctly.",
      "If a module upgrade changes resources unexpectedly, compare plans between versions.",
      "If provider configuration is incorrect, inspect provider inheritance and aliases.",
      "If a module path is invalid, verify the directory structure and source reference."
    ],
    bestPractices: [
      "Design modules around clear infrastructure responsibilities.",
      "Use typed inputs and validation.",
      "Document examples, inputs and outputs.",
      "Pin versions for production use.",
      "Test module changes before publishing them.",
      "Use consistent naming and tagging conventions."
    ],
    securityConsiderations: [
      "Review modules from external sources before adoption.",
      "Avoid exposing sensitive values through outputs.",
      "Keep credentials outside module source code.",
      "Use least-privilege provider permissions.",
      "Scan module resources for insecure defaults.",
      "Review module upgrades for IAM, network and data-access changes."
    ]
  },

  "Terraform Plan": {
    purpose: "Terraform plan compares the desired configuration with the current state and observed infrastructure to preview proposed changes. It identifies resources that Terraform intends to create, update, replace or destroy without applying those changes.",
    project: "Before changing a production security group, an engineer runs terraform plan and saves the result. The team reviews the exact inbound-rule changes and confirms that unrelated infrastructure will not be modified.",
    workflow: [
      "Update the Terraform configuration.",
      "Initialize providers and backend when required.",
      "Run validation and formatting checks.",
      "Generate a plan against the selected workspace and backend.",
      "Inspect resource actions, dependencies and sensitive changes.",
      "Save a plan file when a controlled approval workflow requires it.",
      "Apply the reviewed plan through the approved process."
    ],
    commands: [
      "terraform fmt -check",
      "terraform validate",
      "terraform plan",
      "terraform plan -out=tfplan",
      "terraform show tfplan",
      "terraform show -json tfplan",
      "terraform plan -refresh-only"
    ],
    mistakes: [
      "Applying changes without reviewing destructive actions.",
      "Reviewing a plan generated for the wrong workspace or account.",
      "Assuming a saved plan can be safely reused indefinitely.",
      "Ignoring replacement actions and dependency changes.",
      "Publishing plan files that contain sensitive information.",
      "Treating a successful plan as proof that the infrastructure change cannot fail at runtime."
    ],
    configuration: [
      "Use explicit workspace and environment selection in automation.",
      "Save plan files when approval must apply to the exact reviewed actions.",
      "Configure CI checks for formatting, validation and policy compliance.",
      "Protect plan artifacts and restrict access.",
      "Require approval for production plans containing destructive actions.",
      "Regenerate plans when the underlying configuration or state changes."
    ],
    troubleshooting: [
      "If the plan cannot refresh resources, inspect provider credentials and API connectivity.",
      "If unexpected resources are destroyed, inspect configuration removals and state mappings.",
      "If the plan reports drift, compare live infrastructure with declared configuration.",
      "If a saved plan is stale, generate a new plan using current configuration and state.",
      "If a data source lookup fails, verify filters, permissions and resource availability.",
      "If the plan is too large, separate unrelated infrastructure changes into smaller reviewable units."
    ],
    bestPractices: [
      "Review every create, update, replacement and destroy action.",
      "Generate plans using the correct environment identity.",
      "Use saved plans for controlled approval workflows.",
      "Protect plan artifacts and logs.",
      "Run policy checks before production approval.",
      "Keep infrastructure changes small and explain their expected impact."
    ],
    securityConsiderations: [
      "Treat saved plan files as sensitive artifacts.",
      "Restrict access to plan outputs and JSON representations.",
      "Review public exposure and permission changes carefully.",
      "Do not allow untrusted pull requests to access production credentials.",
      "Require approval for high-risk infrastructure changes.",
      "Verify the identity and environment used to generate and apply a plan."
    ]
  },

  "Terraform Apply": {
    purpose: "Terraform apply executes the infrastructure actions described by a Terraform plan. It communicates with configured providers to create, modify or delete resources and updates state after successful operations. Apply should be controlled carefully because it changes real infrastructure.",
    project: "After reviewing a Terraform plan that adds an application subnet and updates a security group, the platform engineer applies the approved plan through a production deployment pipeline.",
    workflow: [
      "Confirm the correct environment, workspace and backend.",
      "Initialize the required providers.",
      "Generate and review the infrastructure plan.",
      "Obtain the required approval for sensitive changes.",
      "Apply the approved saved plan or execute the approved interactive workflow.",
      "Inspect command output and resulting resource state.",
      "Validate the application and infrastructure after provisioning.",
      "Record the change and monitor for unexpected behavior."
    ],
    commands: [
      "terraform plan -out=tfplan",
      "terraform show tfplan",
      "terraform apply tfplan",
      "terraform apply",
      "terraform output",
      "terraform state list",
      "terraform plan -refresh-only"
    ],
    mistakes: [
      "Applying to production from the wrong workspace or account.",
      "Using automatic approval without appropriate controls.",
      "Applying an outdated plan after configuration or state has changed.",
      "Ignoring partial failures and assuming all resources were created.",
      "Running concurrent applies against shared infrastructure without locking.",
      "Using destroy or replacement operations without a recovery plan."
    ],
    configuration: [
      "Use controlled CI/CD stages for plan approval and apply.",
      "Configure remote state and locking where supported.",
      "Use separate deployment identities for different environments.",
      "Require manual approval for high-impact production operations.",
      "Protect plan artifacts and deployment logs.",
      "Define timeouts and recovery procedures for long-running resource operations."
    ],
    troubleshooting: [
      "If apply fails with access denied, inspect the provider identity and required API permissions.",
      "If a resource times out, inspect provider output and the actual cloud resource status.",
      "If only some resources succeed, inspect state and the remaining planned actions before retrying.",
      "If state locking blocks the operation, verify whether another apply is active.",
      "If the wrong resource was modified, stop further changes and assess recovery or rollback options.",
      "If infrastructure is created but the application fails, inspect network paths, security rules and service health separately."
    ],
    bestPractices: [
      "Apply only reviewed and approved changes.",
      "Use saved plans when approval must match exact planned actions.",
      "Apply production changes through controlled automation.",
      "Validate the deployed infrastructure after apply.",
      "Keep logs and change records for auditing.",
      "Use small changes to simplify recovery and diagnosis."
    ],
    securityConsiderations: [
      "Use least-privilege deployment identities.",
      "Protect apply permissions and production credentials.",
      "Require approvals for sensitive infrastructure changes.",
      "Prevent untrusted code from executing production applies.",
      "Secure state, plan files and deployment logs.",
      "Audit changes to IAM, network exposure and data-storage resources."
    ]
  },

  "Ansible": {
    purpose: "Ansible is an automation and configuration-management tool used to configure servers, install packages, manage services and orchestrate operational tasks. It commonly connects to Linux hosts through SSH and uses YAML playbooks to describe tasks. Many Ansible modules are designed to be idempotent, meaning repeated execution should maintain the requested state rather than create unnecessary changes.",
    project: "A DevOps engineer uses Ansible to configure a group of Linux application servers. A playbook installs Nginx, deploys a configuration template, creates required directories and ensures the service is running.",
    workflow: [
      "Define managed hosts in an inventory.",
      "Create a playbook describing the required configuration.",
      "Configure connection details and approved authentication.",
      "Run syntax checks and inspect the target hosts.",
      "Execute the playbook against the intended inventory group.",
      "Review task results and failed hosts.",
      "Verify the resulting server configuration and service health."
    ],
    commands: [
      "ansible --version",
      "ansible all -i inventory.ini -m ping",
      "ansible-inventory -i inventory.ini --list",
      "ansible-playbook -i inventory.ini site.yml --syntax-check",
      "ansible-playbook -i inventory.ini site.yml --list-hosts",
      "ansible-playbook -i inventory.ini site.yml --check --diff",
      "ansible-playbook -i inventory.ini site.yml"
    ],
    mistakes: [
      "Running playbooks against all hosts when only one group should be targeted.",
      "Using shell commands unnecessarily instead of suitable Ansible modules.",
      "Hardcoding passwords or sensitive values in playbooks.",
      "Ignoring privilege escalation requirements.",
      "Writing non-idempotent tasks that repeatedly modify systems.",
      "Skipping syntax checks and testing before production execution."
    ],
    configuration: [
      "Configure ansible.cfg for inventory, roles and connection behavior.",
      "Define inventories for development, staging and production.",
      "Use variables and templates for environment-specific configuration.",
      "Store sensitive variables using Ansible Vault or an approved secret manager.",
      "Use roles to organize reusable automation.",
      "Configure SSH access and privilege escalation according to host policy."
    ],
    troubleshooting: [
      "If hosts are unreachable, inspect inventory addresses, SSH connectivity and authentication.",
      "If a module is unavailable, verify the Ansible version and required collections.",
      "If privilege escalation fails, inspect sudo permissions and become configuration.",
      "If variables are undefined, inspect variable names, precedence and scope.",
      "If tasks behave differently across hosts, inspect operating-system differences and facts.",
      "If a playbook repeatedly changes the same resource, review task idempotency."
    ],
    bestPractices: [
      "Prefer idempotent Ansible modules over ad hoc shell commands.",
      "Use roles for reusable configuration.",
      "Test with check mode where module support is appropriate.",
      "Keep inventories and environment variables organized.",
      "Use tags to support controlled execution of selected tasks.",
      "Review playbook output and validate service health after changes."
    ],
    securityConsiderations: [
      "Protect SSH private keys and connection credentials.",
      "Use Ansible Vault or a managed secret provider for sensitive variables.",
      "Limit sudo and become permissions.",
      "Restrict which hosts and users automation can manage.",
      "Avoid logging passwords and secret values.",
      "Review third-party collections before installing them in production."
    ]
  },

  "Ansible Inventory": {
    purpose: "Ansible inventory defines the managed hosts and groups of hosts that automation targets. It can be written in INI or YAML format, generated dynamically from cloud platforms or other sources, and enriched with host and group variables that control connection and configuration behavior.",
    project: "A team maintains separate inventory groups for web servers, application servers and database servers. The deployment playbook targets only the application group during an application release.",
    workflow: [
      "Create a static inventory or configure a dynamic inventory source.",
      "Define hostnames, addresses and logical groups.",
      "Add group and host variables where required.",
      "Validate the inventory structure and resolved host list.",
      "Test connectivity to selected hosts.",
      "Execute playbooks against the correct group or host pattern.",
      "Review inventory changes when infrastructure membership changes."
    ],
    commands: [
      "ansible-inventory -i inventory.ini --list",
      "ansible-inventory -i inventory.ini --graph",
      "ansible all -i inventory.ini --list-hosts",
      "ansible webservers -i inventory.ini -m ping",
      "ansible-inventory -i inventory.yml --host app01",
      "ansible-playbook -i inventory.ini site.yml --list-hosts"
    ],
    mistakes: [
      "Using incorrect hostnames or IP addresses.",
      "Defining a group but targeting a different group name in the playbook.",
      "Placing variables at the wrong inventory level.",
      "Mixing production and development hosts without clear separation.",
      "Storing plaintext connection passwords in inventory files.",
      "Assuming every inventory source resolves the same way."
    ],
    configuration: [
      "Use clear group names such as webservers, appservers and databases.",
      "Define group_vars and host_vars for appropriate configuration.",
      "Configure ansible_host when inventory names differ from connection addresses.",
      "Use dynamic inventory plugins for cloud environments where appropriate.",
      "Keep environment inventories separate or use clearly defined grouping.",
      "Store connection secrets outside plaintext inventory files."
    ],
    troubleshooting: [
      "If no hosts are matched, inspect the inventory graph and playbook host pattern.",
      "If a host is unreachable, verify DNS, IP address, SSH port and routing.",
      "If the wrong variables are applied, inspect group membership and variable precedence.",
      "If dynamic inventory returns no hosts, verify cloud credentials and plugin configuration.",
      "If an inventory file cannot be parsed, inspect its syntax and selected inventory plugin.",
      "If a host uses the wrong connection user, inspect ansible_user and applicable variables."
    ],
    bestPractices: [
      "Group hosts by role and environment.",
      "Use dynamic inventory when cloud membership changes frequently.",
      "Validate inventory before executing production playbooks.",
      "Use consistent host naming and variable conventions.",
      "Keep sensitive values in a secure secret-management system.",
      "Review inventory changes as operationally significant code."
    ],
    securityConsiderations: [
      "Do not store plaintext passwords or private keys in inventory files.",
      "Restrict inventory access because it reveals infrastructure details.",
      "Use least-privilege connection accounts.",
      "Protect dynamic inventory credentials.",
      "Separate production targets from lower environments.",
      "Review host membership before executing privileged playbooks."
    ]
  },

  "Ansible Playbook": {
    purpose: "An Ansible playbook is a YAML document that describes automation tasks to execute against selected hosts. It can define plays, tasks, handlers, variables, roles and execution conditions, allowing teams to automate repeatable server configuration and application operations.",
    project: "A playbook configures application servers by installing required packages, creating directories, deploying an Nginx configuration template and restarting the service only when the configuration changes.",
    workflow: [
      "Define the target hosts for each play.",
      "Set required variables, connection options and privilege escalation.",
      "Create ordered tasks using appropriate Ansible modules.",
      "Add handlers for actions that should occur after notified changes.",
      "Run syntax validation and inspect the target host list.",
      "Execute in a test environment or check mode where suitable.",
      "Review failures and verify the final server state."
    ],
    commands: [
      "ansible-playbook site.yml --syntax-check",
      "ansible-playbook -i inventory.ini site.yml --list-tasks",
      "ansible-playbook -i inventory.ini site.yml --list-hosts",
      "ansible-playbook -i inventory.ini site.yml --check --diff",
      "ansible-playbook -i inventory.ini site.yml --limit appservers",
      "ansible-playbook -i inventory.ini site.yml --tags deploy",
      "ansible-playbook -i inventory.ini site.yml -vv"
    ],
    mistakes: [
      "Writing invalid YAML indentation or incorrect task structure.",
      "Using undefined variables or incorrect variable names.",
      "Targeting the wrong hosts through the hosts pattern.",
      "Using shell commands when a reliable idempotent module is available.",
      "Restarting services on every run instead of using handlers.",
      "Running destructive tasks without conditions or safeguards."
    ],
    configuration: [
      "Use descriptive play and task names.",
      "Define variables with clear defaults and validation.",
      "Use handlers for controlled service restarts.",
      "Use roles to separate reusable configuration responsibilities.",
      "Configure privilege escalation only for tasks that require it.",
      "Use tags and limits for controlled execution when appropriate."
    ],
    troubleshooting: [
      "If YAML parsing fails, inspect indentation, quoting and list structure.",
      "If a task fails, inspect the failed task output and target host.",
      "If a variable is undefined, inspect variable names, scope and precedence.",
      "If a service does not restart, verify handler notification and service-module behavior.",
      "If a playbook targets no hosts, inspect inventory selection and the hosts pattern.",
      "If check mode differs from real execution, verify module support and task side effects."
    ],
    bestPractices: [
      "Use descriptive task names and small logical plays.",
      "Prefer built-in modules over shell commands.",
      "Keep playbooks idempotent.",
      "Use roles for reusable and maintainable automation.",
      "Test changes before production execution.",
      "Use handlers to avoid unnecessary service restarts.",
      "Capture execution output and verify the resulting system state."
    ],
    securityConsiderations: [
      "Protect secrets with Ansible Vault or an approved secret provider.",
      "Limit privilege escalation to required tasks.",
      "Avoid printing credentials in task output.",
      "Restrict playbook execution permissions.",
      "Review commands that modify firewall, users or access controls.",
      "Validate external roles and collections before use."
    ]
  },

  "Ansible Role": {
    purpose: "An Ansible role is a reusable directory structure that organizes related tasks, variables, handlers, templates, files and metadata. Roles help teams package common configuration logic so the same operational standard can be applied across multiple playbooks and environments.",
    project: "A platform team creates an Nginx role that installs the package, deploys a standard virtual-host template, configures service startup and validates the service. Multiple application environments reuse the role with different variables.",
    workflow: [
      "Create a role using the standard Ansible role directory structure.",
      "Define tasks under the tasks directory.",
      "Store defaults and role variables in their appropriate directories.",
      "Add templates, static files and handlers as required.",
      "Reference the role from a playbook.",
      "Pass environment-specific variables to the role.",
      "Test the role against representative hosts before production use."
    ],
    commands: [
      "ansible-galaxy role init nginx",
      "ansible-playbook -i inventory.ini site.yml --syntax-check",
      "ansible-playbook -i inventory.ini site.yml --list-tasks",
      "ansible-playbook -i inventory.ini site.yml --check --diff",
      "ansible-galaxy role list",
      "ansible-playbook -i inventory.ini site.yml --tags nginx"
    ],
    mistakes: [
      "Placing files in incorrect role directories.",
      "Using defaults and variables without understanding their precedence.",
      "Creating roles that combine unrelated responsibilities.",
      "Hardcoding environment-specific values inside role tasks.",
      "Failing to notify handlers when configuration changes.",
      "Using unreviewed external roles in production."
    ],
    configuration: [
      "Use tasks for execution logic and handlers for event-driven actions.",
      "Place low-priority defaults in defaults/main.yml.",
      "Use vars/main.yml for role variables that require stronger precedence.",
      "Store Jinja2 templates in templates and static assets in files.",
      "Define dependencies and metadata where required.",
      "Version and document reusable roles."
    ],
    troubleshooting: [
      "If a role cannot be found, inspect the configured roles path and directory name.",
      "If a task is skipped unexpectedly, inspect conditions, tags and host selection.",
      "If the wrong variable value is used, inspect Ansible variable precedence.",
      "If a template fails, inspect Jinja2 syntax and the variables supplied to it.",
      "If a handler does not run, verify that the task notified the correct handler name.",
      "If an external role is unavailable, inspect its source, version and installation configuration."
    ],
    bestPractices: [
      "Keep roles focused on one operational responsibility.",
      "Use defaults to support safe customization.",
      "Document role inputs and expected behavior.",
      "Test roles using representative operating systems and environments.",
      "Pin external role versions.",
      "Use handlers for controlled restarts and reloads.",
      "Keep role dependencies explicit and reviewable."
    ],
    securityConsiderations: [
      "Do not include passwords or private keys in role files.",
      "Use secure variable sources for credentials.",
      "Review tasks that modify users, SSH, sudo and firewall configuration.",
      "Limit role execution to approved hosts.",
      "Inspect third-party roles before installation.",
      "Avoid logging sensitive template variables or connection information."
    ]
  }
};
