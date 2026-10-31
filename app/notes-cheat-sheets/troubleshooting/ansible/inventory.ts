import type { NoteData } from "../types";

const noteData: NoteData = {
  title: "Ansible Inventory Management",
  description: "Comprehensive practical guide to Ansible inventory management, including static INI and YAML inventories, host groups, child groups, host and group variables, inventory patterns, dynamic inventory plugins, AWS EC2 discovery, environment separation, validation, production operations, security, and troubleshooting.",
  sections: [
    {
      heading: "1. Inventory Architecture and Fundamentals",
      explanation: "An Ansible inventory defines which managed nodes Ansible can automate and how those nodes are grouped and addressed. It can also define connection details and variables required by playbooks. Inventory is not simply a list of IP addresses. A well-designed inventory represents application tiers, environments, regions, ownership, and operational boundaries. Ansible supports static inventory files and dynamic inventory sources. Static inventory is useful for small stable environments, while dynamic inventory is useful when cloud instances are created and removed frequently.",
      steps: [
        "Create an inventory directory inside the automation project.",
        "Separate development, staging, and production inventory.",
        "Group servers according to application roles and responsibilities.",
        "Use DNS names or stable private IP addresses.",
        "Keep credentials outside inventory files.",
        "Use group variables for shared configuration.",
        "Validate inventory before executing playbooks."
      ],
      commands: `# Create inventory structure
mkdir -p inventory/dev
mkdir -p inventory/staging
mkdir -p inventory/production

# Display inventory using default configuration
ansible-inventory --list

# Read a specific inventory file
ansible-inventory -i inventory/production/hosts.ini --list

# Display inventory groups
ansible-inventory -i inventory/production/hosts.ini --graph`,
      problems: [
        {
          issue: "Ansible reports that no inventory was parsed.",
          rootCause: "The inventory path is incorrect, the file is empty, or its syntax cannot be parsed.",
          solution: "Check the file path, permissions, and syntax. Run ansible-inventory -i inventory/hosts.ini --list to identify parsing errors."
        },
        {
          issue: "A server is missing from the inventory output.",
          rootCause: "The host was not declared correctly or the wrong inventory source is being loaded.",
          solution: "Inspect the active inventory path using ansible --version and validate the intended file directly."
        }
      ]
    },
    {
      heading: "2. Static INI Inventory",
      explanation: "INI inventory is a simple text-based format. A host can be declared under the implicit all group or under a named group. Group names are placed inside square brackets. Host-specific variables can be written after the hostname. INI inventory is easy to maintain for small environments, but large environments benefit from structured YAML inventory and separate group_vars and host_vars directories.",
      steps: [
        "Create hosts.ini.",
        "Declare application servers under an app_servers group.",
        "Declare database servers under a database_servers group.",
        "Assign host-specific connection variables only where required.",
        "Create a combined group for shared application infrastructure.",
        "Validate the parsed host list."
      ],
      config: `# inventory/hosts.ini

[web_servers]
web01 ansible_host=192.168.10.11
web02 ansible_host=192.168.10.12

[app_servers]
app01 ansible_host=192.168.20.11
app02 ansible_host=192.168.20.12

[database_servers]
db01 ansible_host=192.168.30.11
db02 ansible_host=192.168.30.12

[production:children]
web_servers
app_servers
database_servers

[production:vars]
ansible_user=ansible
ansible_port=22
ansible_python_interpreter=/usr/bin/python3`,
      commands: `# Display all hosts
ansible-inventory -i inventory/hosts.ini --list

# Display group hierarchy
ansible-inventory -i inventory/hosts.ini --graph

# Display a particular host
ansible-inventory -i inventory/hosts.ini --host web01

# Test a group
ansible web_servers -i inventory/hosts.ini -m ansible.builtin.ping`,
      problems: [
        {
          issue: "Invalid host pattern or inventory parsing warning.",
          rootCause: "A group header, host declaration, or variable assignment contains invalid INI syntax.",
          solution: "Check square brackets, group names, whitespace, and variable assignments. Validate with ansible-inventory --list."
        }
      ]
    },
    {
      heading: "3. YAML Inventory and Structured Variables",
      explanation: "YAML inventory provides a structured way to represent groups, hosts, children, and variables. It is useful when inventories contain multiple environments and complex group relationships. YAML indentation is significant. A misplaced space can change the hierarchy or cause parsing errors. Use a consistent indentation style and validate YAML before running automation.",
      steps: [
        "Create a hosts.yml inventory file.",
        "Declare top-level groups under all.children.",
        "Add hosts under the appropriate group.",
        "Define shared variables under vars.",
        "Use child groups to represent application hierarchy.",
        "Validate the YAML inventory."
      ],
      config: `# inventory/hosts.yml

all:
  children:
    production:
      children:
        web_servers:
          hosts:
            web01:
              ansible_host: 192.168.10.11
            web02:
              ansible_host: 192.168.10.12
        app_servers:
          hosts:
            app01:
              ansible_host: 192.168.20.11
            app02:
              ansible_host: 192.168.20.12
      vars:
        ansible_user: ansible
        ansible_port: 22
        ansible_python_interpreter: /usr/bin/python3`,
      commands: `# Parse YAML inventory
ansible-inventory -i inventory/hosts.yml --list

# Display inventory as graph
ansible-inventory -i inventory/hosts.yml --graph

# Export inventory in YAML format
ansible-inventory -i inventory/hosts.yml --yaml

# Inspect a specific host
ansible-inventory -i inventory/hosts.yml --host web01`,
      problems: [
        {
          issue: "YAML inventory fails to parse.",
          rootCause: "Incorrect indentation, missing colons, duplicate keys, or invalid YAML structure.",
          solution: "Correct indentation, use spaces instead of tabs, and validate the inventory using ansible-inventory --list."
        },
        {
          issue: "Host variables are not applied.",
          rootCause: "The host is declared outside the intended group or variables are placed at the wrong hierarchy level.",
          solution: "Inspect the parsed output and move variables under the correct host or group vars section."
        }
      ]
    },
    {
      heading: "4. Parent Groups, Child Groups, and Group Variables",
      explanation: "Ansible inventory supports nested groups through children. This allows teams to represent infrastructure at multiple levels. For example, a production group can contain web, application, and database groups. Variables declared at group level can be shared by all members. More specific host variables can override inherited group values according to Ansible variable precedence. Group design should reflect operational ownership and deployment boundaries rather than creating unnecessarily complicated hierarchies.",
      steps: [
        "Create functional groups such as web_servers and database_servers.",
        "Create environment-level parent groups.",
        "Use children to build the hierarchy.",
        "Place common values in group_vars.",
        "Use host_vars only for genuine host-specific differences.",
        "Inspect inherited values for representative hosts."
      ],
      config: `# inventory/hosts.ini

[web_servers]
web01
web02

[database_servers]
db01

[production:children]
web_servers
database_servers

# group_vars/production.yml
environment: production
monitoring_enabled: true

# group_vars/web_servers.yml
http_port: 8080
application_role: web

# group_vars/database_servers.yml
database_port: 5432
application_role: database

# host_vars/web01.yml
ansible_host: 192.168.10.11`,
      commands: `# Show the inventory hierarchy
ansible-inventory -i inventory/hosts.ini --graph

# Inspect host variables
ansible-inventory -i inventory/hosts.ini --host web01

# Execute against a parent group
ansible production -i inventory/hosts.ini -m ansible.builtin.ping

# Execute only web servers
ansible web_servers -i inventory/hosts.ini -m ansible.builtin.ping`,
      problems: [
        {
          issue: "A host receives an unexpected group variable.",
          rootCause: "The host belongs to multiple groups and variable precedence or group merging produces a different value.",
          solution: "Inspect the complete inventory hierarchy, group_vars, host_vars, and playbook variables. Simplify overlapping groups where possible."
        }
      ]
    },
    {
      heading: "5. Host Variables, Group Variables, and Variable Precedence",
      explanation: "Inventory variables provide connection details and application-specific values. Host variables apply to individual nodes, while group variables apply to all members of a group. Ansible has a detailed variable precedence system, and extra variables supplied with -e have very high precedence. Avoid defining the same variable in many places because this makes behavior difficult to predict. Use one clear source of truth for each environment-specific setting.",
      steps: [
        "Place common environment variables in group_vars.",
        "Place exceptional machine-specific values in host_vars.",
        "Avoid storing passwords in plain-text inventory.",
        "Document variables that can be overridden.",
        "Inspect effective host variables before deployment.",
        "Use explicit variable names to reduce collisions."
      ],
      config: `# group_vars/production.yml
app_environment: production
app_port: 8080
deployment_user: deploy
enable_monitoring: true

# host_vars/app01.yml
ansible_host: 192.168.20.11
application_node_id: app-01

# Example playbook usage
# vars:
#   deployment_environment: "{{ app_environment }}"`,
      commands: `# Inspect effective variables for a host
ansible-inventory -i inventory/hosts.ini --host app01

# Override a variable for a controlled run
ansible-playbook deploy.yml -e "app_environment=staging"

# Inspect playbook variables and tasks
ansible-playbook deploy.yml --list-tasks

# Run a specific host
ansible-playbook deploy.yml --limit app01`,
      problems: [
        {
          issue: "A playbook uses a different value than group_vars.",
          rootCause: "A higher-precedence variable is defined in host_vars, play vars, role vars, or extra variables.",
          solution: "Trace the variable definition locations and remove unnecessary duplicate definitions. Use -e only for intentional overrides."
        }
      ]
    },
    {
      heading: "6. Inventory Patterns, Limits, and Host Selection",
      explanation: "Inventory patterns determine which hosts Ansible targets. Patterns can select all hosts, a specific group, an individual host, or combinations of groups. The --limit option restricts a playbook to a smaller host set. This is especially important during production deployments because it allows engineers to validate changes on a single server before expanding the rollout. Always inspect the selected host list before executing destructive operations.",
      steps: [
        "Understand the all and ungrouped inventory groups.",
        "Use group names to target application tiers.",
        "Use host patterns to select specific machines.",
        "Use --limit for controlled deployments.",
        "Use --list-hosts to preview the target set.",
        "Use exclusions carefully.",
        "Verify the target list before production execution."
      ],
      commands: `# List all hosts
ansible all -i inventory/hosts.ini --list-hosts

# List web servers
ansible web_servers -i inventory/hosts.ini --list-hosts

# Select one server
ansible web01 -i inventory/hosts.ini --list-hosts

# Select multiple groups
ansible 'web_servers:app_servers' -i inventory/hosts.ini --list-hosts

# Exclude database servers
ansible 'production:!database_servers' -i inventory/hosts.ini --list-hosts

# Limit playbook execution
ansible-playbook deploy.yml -i inventory/hosts.ini --limit web01

# Limit to multiple hosts
ansible-playbook deploy.yml -i inventory/hosts.ini --limit 'web01,web02'`,
      problems: [
        {
          issue: "Playbook runs against more servers than expected.",
          rootCause: "A broad inventory pattern or incorrect parent-child group relationship selects additional hosts.",
          solution: "Use --list-hosts first, correct the pattern, and apply --limit during controlled rollout."
        },
        {
          issue: "No hosts matched the supplied pattern.",
          rootCause: "The group or hostname is misspelled or does not exist in the loaded inventory.",
          solution: "Run ansible-inventory --graph and compare the requested pattern with actual group names."
        }
      ]
    },
    {
      heading: "7. Static and Dynamic Inventory",
      explanation: "Static inventory is manually maintained and works well for stable infrastructure. Dynamic inventory obtains hosts from external sources such as cloud providers, virtualization platforms, and infrastructure management systems. Cloud environments change frequently because autoscaling, deployments, and temporary workloads create and remove machines. Dynamic inventory plugins query those sources and construct inventory groups and variables. Use plugin configuration files and documented authentication methods instead of manually copying changing cloud IP addresses.",
      steps: [
        "Use static inventory for stable infrastructure.",
        "Identify the cloud or infrastructure provider for dynamic discovery.",
        "Install the required inventory plugin collection.",
        "Create a plugin configuration file.",
        "Configure authentication using an approved identity mechanism.",
        "Test the plugin and inspect the returned groups.",
        "Restrict discovery to the required accounts, regions, and resources."
      ],
      config: `# Example dynamic inventory plugin configuration
# inventory/aws_ec2.yml

plugin: amazon.aws.aws_ec2
regions:
  - ap-south-1

keyed_groups:
  - key: tags.Environment
    prefix: env
  - key: tags.Role
    prefix: role

filters:
  instance-state-name: running

hostnames:
  - private-ip-address

compose:
  ansible_host: private_ip_address`,
      commands: `# Install AWS collection
ansible-galaxy collection install amazon.aws

# Test dynamic inventory
ansible-inventory -i inventory/aws_ec2.yml --list

# Display discovered groups
ansible-inventory -i inventory/aws_ec2.yml --graph

# Inspect discovered host
ansible-inventory -i inventory/aws_ec2.yml --host i-0123456789abcdef0

# Run against discovered hosts
ansible all -i inventory/aws_ec2.yml -m ansible.builtin.ping`,
      problems: [
        {
          issue: "Dynamic inventory returns no cloud instances.",
          rootCause: "Incorrect cloud account, region, filters, permissions, or instance-state conditions.",
          solution: "Verify the active cloud identity, region, resource filters, and required read permissions. Inspect plugin diagnostics."
        },
        {
          issue: "Inventory plugin cannot be loaded.",
          rootCause: "The required collection is missing or the plugin configuration uses an invalid plugin name.",
          solution: "Install the required collection, inspect ansible-galaxy collection list, and verify the plugin documentation using ansible-doc."
        }
      ]
    },
    {
      heading: "8. AWS EC2 Dynamic Inventory in Production",
      explanation: "The amazon.aws.aws_ec2 inventory plugin discovers EC2 instances through AWS APIs. It can group instances using tags, select regions, and use private IP addresses for SSH connections. A production design should use instance tags such as Environment, Application, Owner, and Role. Prefer IAM roles or temporary credentials instead of long-lived access keys. The automation identity should have only the EC2 discovery permissions required by the plugin.",
      steps: [
        "Install the amazon.aws collection.",
        "Configure the AWS region.",
        "Apply consistent tags to EC2 instances.",
        "Configure inventory grouping based on tags.",
        "Use IAM roles or temporary credentials.",
        "Restrict discovery to running instances.",
        "Verify discovered hosts and groups.",
        "Test connectivity using private network paths."
      ],
      config: `# inventory/aws_ec2.yml
plugin: amazon.aws.aws_ec2
regions:
  - ap-south-1
filters:
  instance-state-name: running

keyed_groups:
  - key: tags.Environment
    prefix: environment
  - key: tags.Application
    prefix: application
  - key: tags.Role
    prefix: role

hostnames:
  - private-ip-address

compose:
  ansible_host: private_ip_address`,
      commands: `# Install plugin collection
ansible-galaxy collection install amazon.aws

# Check AWS identity
aws sts get-caller-identity

# Validate inventory
ansible-inventory -i inventory/aws_ec2.yml --list

# View tag-based groups
ansible-inventory -i inventory/aws_ec2.yml --graph

# Target production web servers
ansible 'environment_production:&role_web' -i inventory/aws_ec2.yml --list-hosts`,
      problems: [
        {
          issue: "AWS inventory authentication fails.",
          rootCause: "The execution environment has no valid AWS identity or the credentials have expired.",
          solution: "Verify AWS identity using sts get-caller-identity and configure an IAM role, profile, or approved temporary credential source."
        },
        {
          issue: "EC2 instances are discovered but SSH fails.",
          rootCause: "Private network connectivity, security groups, SSH keys, operating-system usernames, or route configuration is incorrect.",
          solution: "Verify the private network path, port 22 access, correct login user, and approved SSH key."
        }
      ]
    },
    {
      heading: "9. Environment Separation and Production Inventory Design",
      explanation: "Development, staging, and production should have separate inventory sources and environment-specific variables. This prevents an engineer from accidentally deploying staging configuration into production. A scalable repository can keep common playbooks shared while inventory and group variables remain environment-specific. Production inventory should have stricter access controls, approval requirements, and audit logging. Avoid copying entire playbooks for each environment; reuse automation and supply environment-specific configuration.",
      steps: [
        "Create separate inventory directories for each environment.",
        "Use consistent group names across environments.",
        "Keep environment-specific values in group_vars.",
        "Use separate credentials and access policies.",
        "Require approval for production changes.",
        "Preview target hosts before deployment.",
        "Record the inventory revision used for each deployment."
      ],
      config: `# Recommended project structure
ansible-project/
  ansible.cfg
  requirements.yml
  playbooks/
    site.yml
    deploy.yml
  inventory/
    dev/
      hosts.yml
      group_vars/
    staging/
      hosts.yml
      group_vars/
    production/
      hosts.yml
      group_vars/
  roles/
    common/
    nginx/
    application/
  host_vars/
  group_vars/`,
      commands: `# Development deployment
ansible-playbook -i inventory/dev/hosts.yml playbooks/deploy.yml

# Staging deployment
ansible-playbook -i inventory/staging/hosts.yml playbooks/deploy.yml

# Preview production target hosts
ansible-playbook -i inventory/production/hosts.yml playbooks/deploy.yml --list-hosts

# Controlled production deployment
ansible-playbook -i inventory/production/hosts.yml playbooks/deploy.yml --limit web_servers`,
      problems: [
        {
          issue: "Production deployment uses staging variables.",
          rootCause: "The wrong inventory source was selected or environment variables are shared incorrectly.",
          solution: "Pass the inventory path explicitly, separate credentials, and add CI validation to confirm the selected environment."
        }
      ]
    },
    {
      heading: "10. Inventory Validation, Debugging, Security, and Recovery",
      explanation: "Inventory validation should be a standard part of every automation workflow. Inspect parsed data, group hierarchy, host variables, and target patterns before running a playbook. Inventory files should not contain plaintext passwords or private keys. Protect production inventory changes through code review and access control. If inventory becomes corrupted, restore the last approved version from Git, validate it, compare the host list, and run a connectivity test before production automation.",
      steps: [
        "Validate INI and YAML syntax.",
        "Inspect parsed inventory using --list.",
        "Inspect group relationships using --graph.",
        "Inspect host variables using --host.",
        "Preview playbook targets using --list-hosts.",
        "Keep secrets in Vault or an approved secret manager.",
        "Review inventory changes through pull requests.",
        "Restore approved inventory versions through Git when necessary.",
        "Test connectivity after restoring inventory.",
        "Keep audit records for production changes."
      ],
      commands: `# Full inventory output
ansible-inventory -i inventory/hosts.yml --list

# Inventory graph
ansible-inventory -i inventory/hosts.yml --graph

# One host's variables
ansible-inventory -i inventory/hosts.yml --host web01

# Export YAML representation
ansible-inventory -i inventory/hosts.yml --yaml

# Preview hosts
ansible-playbook -i inventory/hosts.yml deploy.yml --list-hosts

# Connectivity validation
ansible all -i inventory/hosts.yml -m ansible.builtin.ping

# Verbose inventory troubleshooting
ansible-inventory -i inventory/hosts.yml --list -vvvv

# Restore a previously committed inventory file
git log --oneline -- inventory/hosts.yml
git checkout <commit-id> -- inventory/hosts.yml
git diff -- inventory/hosts.yml`,
      problems: [
        {
          issue: "Inventory output contains duplicate or unexpected hosts.",
          rootCause: "Multiple inventory sources, overlapping groups, or inconsistent host aliases are being loaded.",
          solution: "Inspect each inventory source separately, standardize host identifiers, and remove unintended duplicate definitions."
        },
        {
          issue: "Sensitive information is exposed in inventory.",
          rootCause: "Passwords, tokens, or private key material were stored directly in inventory files.",
          solution: "Rotate exposed credentials, remove secrets from the inventory, use Ansible Vault or a secret manager, and review repository history."
        },
        {
          issue: "A production inventory change causes an incorrect deployment.",
          rootCause: "The change was not validated against the expected host list or group hierarchy.",
          solution: "Restore the approved inventory version, inspect --graph and --list-hosts output, verify connectivity, and require review before retrying."
        }
      ]
    }
  ]
};

export default noteData;
