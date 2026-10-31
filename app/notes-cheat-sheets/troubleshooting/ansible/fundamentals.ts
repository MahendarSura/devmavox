import type { NoteData } from "../types";

const noteData: NoteData = {
  title: "Ansible Fundamentals",
  description:
    "Complete engineering notes covering Ansible architecture, agentless automation, control nodes, managed nodes, inventory, modules, playbooks, execution flow, production automation and troubleshooting.",

  sections: [
    {
      heading: "1. What Ansible Is and Why DevOps Engineers Use It",
      explanation: `Ansible is an open-source IT automation and configuration-management engine. DevOps engineers use it to configure Linux servers, install software, manage users, deploy applications, update configuration files, execute operational tasks and maintain consistent environments.

Without automation, engineers manually connect to multiple servers and repeat the same commands. This creates configuration drift: two servers that should be identical gradually become different because of manual changes.

Ansible describes the desired operations in YAML playbooks and executes them against selected machines. Its normal Linux connection method is SSH. It does not require a continuously running Ansible agent on every managed Linux server.

Ansible is commonly used for configuration management, application deployment, infrastructure provisioning workflows, patch management, security hardening and disaster-recovery procedures.`,
      steps: [
        "Identify repetitive server administration tasks that should be automated.",
        "Create a central Ansible control node.",
        "Add managed servers to an inventory.",
        "Configure secure SSH authentication.",
        "Write reusable playbooks using Ansible modules.",
        "Test changes against development servers before production.",
        "Run automation and review the results returned by each host.",
        "Store automation code in Git for review, history and rollback."
      ],
      commands: `# Check installed Ansible version
ansible --version

# Display available command-line options
ansible --help

# List installed modules
ansible-doc -l

# Read documentation for the package module
ansible-doc ansible.builtin.apt

# Check whether localhost is reachable through Ansible
ansible localhost -i localhost, -c local -m ansible.builtin.ping

# Check syntax of a playbook
ansible-playbook site.yml --syntax-check`,
      config: `[defaults]
inventory = ./inventory.ini
remote_user = ansible
host_key_checking = True
timeout = 30
forks = 10
retry_files_enabled = False

[privilege_escalation]
become = True
become_method = sudo
become_ask_pass = False

# Explanation:
# inventory: default managed-host inventory.
# remote_user: SSH account used for remote connections.
# host_key_checking: validates SSH host identity.
# timeout: connection timeout in seconds.
# forks: maximum parallel worker processes.
# become: enables privilege escalation where required.
# become_method: uses sudo for privilege escalation.`,
      problems: [
        {
          issue: "Ansible command is not recognized",
          rootCause: "Ansible is not installed, its executable is not in PATH, or the wrong Python environment is active.",
          solution: "Check python3 --version, install Ansible in the intended environment, activate the virtual environment if used, and verify ansible --version."
        },
        {
          issue: "Managed host is unreachable",
          rootCause: "SSH connectivity, DNS resolution, firewall rules, authentication or remote account configuration is incorrect.",
          solution: "Test name resolution, verify TCP port 22, run ssh -vvv ansible@server.example.com and validate the inventory connection variables."
        },
        {
          issue: "Automation changes the same resource on every run",
          rootCause: "The playbook uses non-idempotent shell commands or tasks that always report a change.",
          solution: "Use purpose-built Ansible modules, define the desired state and validate that a second playbook run reports no unexpected changes."
        }
      ]
    },
    {
      heading: "2. Ansible Architecture and Internal Components",
      explanation: `Ansible automation follows a control-node and managed-node architecture.

Control node:
The machine where Ansible is installed. Engineers execute ansible and ansible-playbook commands here. It stores project files, inventory, configuration, roles, collections and credentials.

Managed node:
A remote server that Ansible configures. For common Linux automation, the control node connects through SSH. The managed node generally needs Python for most POSIX modules, although some modules and raw operations have different requirements.

Inventory:
Defines which hosts Ansible can manage and how those hosts are grouped. Inventory can also provide connection variables and environment-specific values.

Modules:
Small units of work that perform operations such as installing packages, creating files, managing services and configuring users. Prefer modules because they understand resource state.

Tasks:
Individual operations inside a play. Tasks call modules and execute in order for each selected host.

Play:
Connects a group of hosts with a list of tasks and execution settings.

Playbook:
A YAML file containing one or more plays. It describes an automation workflow.

Plugins:
Extend Ansible behavior. Examples include connection plugins, callback plugins, inventory plugins, lookup plugins and filter plugins.

Roles:
Reusable directory structures that package tasks, handlers, templates, files, variables and defaults.

Collections:
Distribution units that package related modules, plugins, roles and documentation under a namespace.`,
      steps: [
        "The engineer starts ansible-playbook from the control node.",
        "Ansible loads configuration and resolves command-line overrides.",
        "Ansible parses the playbook and loads the required inventory.",
        "The host pattern selects the target managed nodes.",
        "Variables and applicable facts are made available to task execution.",
        "The connection plugin establishes the required connection, commonly SSH.",
        "Ansible executes the selected module on the managed node.",
        "The module returns structured execution results.",
        "Ansible evaluates the result and decides whether to continue, notify handlers or report failure.",
        "The control node displays a recap for successful, changed, failed, skipped and unreachable hosts."
      ],
      commands: `# Show the active configuration file and Ansible version
ansible --version

# Show inventory hosts
ansible-inventory -i inventory.ini --list

# Display inventory as a graph
ansible-inventory -i inventory.ini --graph

# Inspect facts returned by a managed node
ansible webservers -i inventory.ini -m ansible.builtin.setup

# Execute a read-only command through Ansible
ansible webservers -i inventory.ini -m ansible.builtin.command -a "uptime"

# Display task execution details
ansible-playbook -i inventory.ini site.yml -v`,
      problems: [
        {
          issue: "A task executes on an unexpected server",
          rootCause: "The inventory group or playbook host pattern selects more machines than intended.",
          solution: "Inspect ansible-inventory --graph, review the hosts declaration and test with --limit against a known test host."
        },
        {
          issue: "A module fails because Python is missing",
          rootCause: "The managed host does not have a suitable Python interpreter for the selected module.",
          solution: "Bootstrap Python using an appropriate method, or use the raw module for the initial installation where appropriate."
        },
        {
          issue: "A playbook stops after one host fails",
          rootCause: "The play's failure strategy, serial configuration or task failure behavior affects execution.",
          solution: "Inspect the failed task and host recap. Use serial, max_fail_percentage or explicit error handling only when the deployment design requires it."
        }
      ]
    },
    {
      heading: "3. Agentless Automation and SSH Execution",
      explanation: `Agentless means Ansible does not normally require a permanent Ansible service running on each managed Linux machine. The control node initiates connections when automation runs.

For Linux hosts, SSH is the standard connection method. Authentication can use SSH keys, an SSH agent or approved credential-management integrations. The remote account must have the permissions needed for the requested operation.

Many POSIX modules are transferred to the managed host, executed there and cleaned up according to the module execution process. Pipelining can reduce some transfer overhead when the remote environment supports it.

Agentless does not mean credentialless or dependency-free. SSH access, remote permissions, Python requirements for many modules and network connectivity still matter.`,
      steps: [
        "Create a dedicated automation user on each managed server.",
        "Generate an SSH key pair on the control node using an approved key-management policy.",
        "Install the public key in the managed account's authorized_keys file.",
        "Verify SSH connectivity before running a playbook.",
        "Configure sudo permissions according to least privilege.",
        "Use Ansible become only for tasks that require elevated privileges.",
        "Protect private keys and vault passwords from source-control exposure.",
        "Audit automation access and rotate credentials according to policy."
      ],
      commands: `# Generate an SSH key pair
ssh-keygen -t ed25519 -C "ansible-automation"

# Test SSH authentication
ssh -i ~/.ssh/ansible_ed25519 ansible@192.0.2.10

# Verbose SSH diagnosis
ssh -vvv ansible@192.0.2.10

# Test Ansible connectivity
ansible webservers -i inventory.ini -m ansible.builtin.ping

# Test privilege escalation
ansible webservers -i inventory.ini -b -m ansible.builtin.command -a "id"

# Check remote identity without privilege escalation
ansible webservers -i inventory.ini -m ansible.builtin.command -a "id"`,
      config: `[webservers]
web01 ansible_host=192.0.2.10
web02 ansible_host=192.0.2.11

[webservers:vars]
ansible_user=ansible
ansible_ssh_private_key_file=~/.ssh/ansible_ed25519
ansible_become=true
ansible_become_method=sudo

# Use real host addresses and a protected private key.
# Do not commit private keys to Git.`,
      problems: [
        {
          issue: "Permission denied (publickey)",
          rootCause: "The wrong private key is selected, the public key is missing on the server, or SSH file permissions are incorrect.",
          solution: "Use ssh -vvv to identify the key offered. Verify authorized_keys, account name, key ownership and restrictive permissions."
        },
        {
          issue: "Sudo requires a password",
          rootCause: "The automation account requires interactive authentication for privilege escalation.",
          solution: "Use an approved become-password mechanism or configure narrowly scoped sudo permissions according to organizational security policy."
        },
        {
          issue: "SSH host key verification fails",
          rootCause: "The host key is new, changed or does not match the known_hosts entry.",
          solution: "Verify the server identity through a trusted channel and update known_hosts. Do not disable host-key checking as a routine workaround."
        }
      ]
    },
    {
      heading: "4. Idempotency, Desired State and Change Management",
      explanation: `Idempotency is a core configuration-management principle. An operation is idempotent when repeating it with the same desired input does not keep changing the system after the desired state has been reached.

For example, the apt module can ensure that nginx is installed. After the first successful run, subsequent runs should normally report that no change is required.

A shell command such as appending a line to a file on every run can create duplicates. A purpose-built module such as lineinfile can manage the intended line more safely.

Idempotency makes automation repeatable, predictable and suitable for scheduled execution. It also makes code review and production change management easier.`,
      steps: [
        "Describe the desired final state instead of writing a sequence of blind commands.",
        "Prefer package, service, user, file, template and configuration modules.",
        "Use creates, removes or changed_when carefully when command execution is unavoidable.",
        "Use check mode to identify supported changes before applying them.",
        "Use diff output to review configuration modifications.",
        "Run the playbook again and verify that unnecessary changes do not occur.",
        "Investigate modules that do not support check mode or diff mode as expected."
      ],
      commands: `# Install nginx using an idempotent module
ansible webservers -i inventory.ini -b -m ansible.builtin.apt -a "name=nginx state=present update_cache=yes"

# Ensure nginx service is running and enabled
ansible webservers -i inventory.ini -b -m ansible.builtin.service -a "name=nginx state=started enabled=yes"

# Preview supported changes
ansible-playbook -i inventory.ini site.yml --check --diff

# Run the playbook
ansible-playbook -i inventory.ini site.yml

# Run it again to validate idempotency
ansible-playbook -i inventory.ini site.yml`,
      config: `- name: Ensure nginx package is installed
  ansible.builtin.apt:
    name: nginx
    state: present
    update_cache: true

- name: Ensure nginx service is enabled and running
  ansible.builtin.service:
    name: nginx
    state: started
    enabled: true

# state: present ensures the package exists.
# state: started ensures the service is running.
# enabled: true enables startup during system boot.`,
      problems: [
        {
          issue: "Every run reports changed",
          rootCause: "The task uses a command that always changes state or does not accurately report whether a change occurred.",
          solution: "Use an idempotent module. If a command is unavoidable, define creates, removes or a justified changed_when expression."
        },
        {
          issue: "Check mode does not predict a task correctly",
          rootCause: "Some modules or command tasks cannot fully predict changes in check mode.",
          solution: "Review module documentation and validate in a disposable environment. Never assume check mode simulates every external side effect."
        }
      ]
    },
    {
      heading: "5. End-to-End Company Workflow: Configure a Web Server Fleet",
      explanation: `A company operates separate development, staging and production web-server groups. Engineers need a consistent nginx installation, approved service state and managed configuration.

The automation repository contains inventory files, a playbook and templates. A pull request is reviewed before deployment. The pipeline first validates YAML and Ansible syntax, then runs against staging. Production deployment uses an approved inventory and controlled rollout.

This workflow prevents engineers from manually configuring every server and provides a repeatable audit trail.`,
      steps: [
        "Create separate inventory groups for development, staging and production.",
        "Store the Ansible project in a Git repository.",
        "Create a playbook that installs nginx and manages its configuration.",
        "Validate YAML formatting and playbook syntax.",
        "Run check mode and inspect the proposed diff.",
        "Deploy to staging and verify the service and HTTP response.",
        "Obtain the required production approval.",
        "Deploy to production in controlled batches.",
        "Check service health and application response after deployment.",
        "Record the release revision and deployment result."
      ],
      commands: `# Validate playbook syntax
ansible-playbook -i inventory/staging.ini site.yml --syntax-check

# Preview staging changes
ansible-playbook -i inventory/staging.ini site.yml --check --diff

# Deploy to staging
ansible-playbook -i inventory/staging.ini site.yml

# Deploy to production in batches of two hosts
ansible-playbook -i inventory/production.ini site.yml --limit webservers --forks 2

# Verify service status
ansible webservers -i inventory/production.ini -b -m ansible.builtin.service -a "name=nginx state=started"

# Verify HTTP response from the control node
curl -I https://your-approved-application.example.com`,
      config: `- name: Configure web server fleet
  hosts: webservers
  become: true
  serial: 2

  tasks:
    - name: Install nginx
      ansible.builtin.apt:
        name: nginx
        state: present
        update_cache: true

    - name: Ensure nginx is running
      ansible.builtin.service:
        name: nginx
        state: started
        enabled: true

# hosts selects inventory targets.
# become requests privilege escalation.
# serial limits the number of hosts handled in a batch.
# Validate the actual OS package manager before using apt.`,
      problems: [
        {
          issue: "Staging succeeds but production deployment fails",
          rootCause: "Production differs in operating system, package repository, permissions, network access or variable values.",
          solution: "Compare host facts and environment variables. Use environment-specific inventory variables and test representative production-like systems."
        },
        {
          issue: "Service is active but users cannot reach the application",
          rootCause: "The application listener, firewall, reverse proxy, DNS or upstream dependency may be unhealthy.",
          solution: "Check systemctl status, listening sockets, service logs, firewall rules and HTTP response from both the host and an external client."
        }
      ]
    },
    {
      heading: "6. Production Safety, Security and Operational Best Practices",
      explanation: `Production automation must be predictable, auditable and recoverable. Use a dedicated automation identity, SSH key authentication, least-privilege sudo permissions and encrypted secret storage.

Keep playbooks in Git and require code review for production changes. Separate environment inventories and protect production credentials. Pin tested collection versions and document the Ansible version used by the automation platform.

Use serial deployments for workloads that cannot tolerate simultaneous restarts. Add health checks and stop a rollout when the application becomes unhealthy. A successful Ansible task does not automatically prove that the business application is healthy.

Avoid storing passwords, tokens and private keys in plaintext. Use Ansible Vault or an approved external secret manager. Use no_log selectively for tasks that handle sensitive values, while ensuring operational diagnostics remain useful.`,
      steps: [
        "Use a dedicated automation account instead of a personal administrator account.",
        "Apply least privilege to SSH and sudo access.",
        "Encrypt sensitive variables and protect vault password delivery.",
        "Keep secrets out of Git history, logs and terminal output.",
        "Pin and review Ansible collections and execution-environment dependencies.",
        "Use separate inventories and credentials for each environment.",
        "Require peer review and approval for production changes.",
        "Use serial batches and health checks for critical services.",
        "Maintain backups or rollback procedures for configuration changes.",
        "Review automation logs and access permissions regularly."
      ],
      commands: `# Inspect effective configuration
ansible-config dump --only-changed

# List installed collections
ansible-galaxy collection list

# Validate a playbook
ansible-playbook -i inventory/production.ini site.yml --syntax-check

# Preview changes
ansible-playbook -i inventory/production.ini site.yml --check --diff

# Execute with limited parallelism
ansible-playbook -i inventory/production.ini site.yml --forks 2

# Inspect host facts for operating-system validation
ansible webservers -i inventory/production.ini -m ansible.builtin.setup`,
      config: `- name: Deploy application safely
  hosts: application_servers
  become: true
  serial: 1
  any_errors_fatal: true

  tasks:
    - name: Apply approved configuration
      ansible.builtin.template:
        src: application.conf.j2
        dest: /etc/example/application.conf
        owner: root
        group: root
        mode: "0640"
      notify: Restart application

  handlers:
    - name: Restart application
      ansible.builtin.service:
        name: example
        state: restarted

# serial: 1 processes one host at a time.
# any_errors_fatal stops the play after a fatal failure.
# template manages configuration from a Jinja2 template.
# handler runs only when notified by a changed task.
# Confirm service health before considering a rollout successful.`,
      problems: [
        {
          issue: "A production rollout causes service downtime",
          rootCause: "All hosts were updated together or the application cannot tolerate the restart sequence.",
          solution: "Use a controlled serial rollout, load-balancer draining where appropriate, readiness checks and a documented rollback plan."
        },
        {
          issue: "Sensitive information appears in automation logs",
          rootCause: "A task prints secret variables or a module result containing sensitive data.",
          solution: "Use no_log: true on the sensitive task, protect CI logs and rotate any credential that was exposed."
        },
        {
          issue: "Ansible reports success but the application is unhealthy",
          rootCause: "Task success confirms the automation operation, not necessarily end-to-end application behavior.",
          solution: "Add application-level health checks, verify dependencies and monitor the service after deployment."
        }
      ]
    },
    {
      heading: "7. Debugging, Logs and Root Cause Analysis",
      explanation: `When automation fails, begin with the exact failed host and task. Do not immediately rerun the entire production playbook. Determine whether the failure is caused by inventory selection, DNS, SSH, privilege escalation, missing dependencies, module arguments, permissions or application behavior.

Ansible verbosity provides additional execution detail. The managed host's system logs and service logs are also important because a task may successfully execute a command while the application itself fails afterward.

A good RCA records the symptom, timeline, affected hosts, evidence, root cause, corrective action and preventive action.`,
      steps: [
        "Capture the failed task name, target host and exact error message.",
        "Check whether the host is unreachable or the task itself failed.",
        "Validate inventory variables and SSH connectivity.",
        "Inspect privilege escalation and remote permissions.",
        "Check the managed host's system and application logs.",
        "Reproduce the problem on a test host where possible.",
        "Apply the smallest safe corrective change.",
        "Rerun only the required scope after assessing task dependencies.",
        "Verify the final application state.",
        "Document the RCA and add a preventive test."
      ],
      commands: `# Run with one level of verbosity
ansible-playbook -i inventory.ini site.yml -v

# Increase diagnostic detail
ansible-playbook -i inventory.ini site.yml -vvv

# Limit execution to one host
ansible-playbook -i inventory.ini site.yml --limit web01

# Start execution at a named task
ansible-playbook -i inventory.ini site.yml --start-at-task="Install nginx"

# Inspect service logs on a Linux host
journalctl -u nginx --since "30 minutes ago"

# Inspect service state
systemctl status nginx

# Check disk and memory pressure
df -h
free -h`,
      problems: [
        {
          issue: "Task fails with a module argument error",
          rootCause: "The module parameter is invalid, unsupported by the installed collection version or has an incorrect data type.",
          solution: "Read ansible-doc for the exact module, verify installed collection versions and correct the task input."
        },
        {
          issue: "Task hangs during remote execution",
          rootCause: "Network stalls, SSH problems, long-running commands or application operations without suitable timeouts.",
          solution: "Use verbose output, inspect SSH connectivity and process state, and define appropriate timeouts for the operation."
        },
        {
          issue: "Only some hosts fail",
          rootCause: "Host-specific differences such as package versions, disk capacity, permissions, network access or OS releases.",
          solution: "Compare gathered facts and host variables between successful and failed machines before changing shared automation."
        }
      ]
    },
    {
      heading: "8. Verification Checklist and Senior Engineer Decisions",
      explanation: `Senior engineers evaluate automation beyond whether a playbook exits with code zero. They consider idempotency, security, blast radius, recovery, observability, environment differences and maintainability.

A production-ready playbook should have a clearly defined target scope, predictable state changes, safe secret handling, meaningful failure behavior and post-deployment validation.

Before production execution, verify the exact inventory, selected hosts, variable values, dependencies, expected changes and rollback procedure.`,
      steps: [
        "Confirm the active Ansible version and configuration file.",
        "Review the inventory graph and confirm the target host count.",
        "Check SSH access and privilege escalation.",
        "Validate playbook syntax and required collections.",
        "Review variables and secret references.",
        "Run check mode and inspect the diff where supported.",
        "Deploy to a representative non-production environment.",
        "Use controlled rollout settings for production.",
        "Verify service health and business-level functionality.",
        "Confirm a second run produces no unexpected changes.",
        "Record execution results and update operational documentation."
      ],
      commands: `# Version and configuration
ansible --version
ansible-config dump --only-changed

# Inventory validation
ansible-inventory -i inventory.ini --graph
ansible-inventory -i inventory.ini --list

# Connectivity validation
ansible all -i inventory.ini -m ansible.builtin.ping

# Syntax and preview
ansible-playbook -i inventory.ini site.yml --syntax-check
ansible-playbook -i inventory.ini site.yml --check --diff

# Execute and review the recap
ansible-playbook -i inventory.ini site.yml

# Repeat to validate idempotency
ansible-playbook -i inventory.ini site.yml`,
      problems: [
        {
          issue: "The playbook is correct but the deployment scope is too large",
          rootCause: "The inventory pattern includes unintended groups or the production limit is missing.",
          solution: "Review the inventory graph, use an explicit approved host pattern and verify the target count before execution."
        },
        {
          issue: "A deployment cannot be rolled back safely",
          rootCause: "The automation changes data or configuration without retaining a recoverable previous state.",
          solution: "Design backups, versioned artifacts, reversible configuration changes and application-specific rollback procedures before rollout."
        }
      ]
    }
  ]
};

export default noteData;
