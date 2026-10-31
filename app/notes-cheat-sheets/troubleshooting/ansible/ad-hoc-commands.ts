import type { NoteData } from "../types";

const noteData: NoteData = {
  title: "Ansible Ad-Hoc Commands – Complete Technical Notes",
  description: "My practical notebook for learning and using Ansible ad-hoc commands in real DevOps projects. These notes explain the concepts from the basics, show how Ansible executes commands internally, and cover practical commands, configuration, production workflows, troubleshooting, security, and senior engineer decisions.",
  sections: [
    {
      heading: "1. My Technical Notes – Understanding Ad-Hoc Commands",
      explanation: `Ansible ad-hoc commands are single commands that we execute directly from the terminal to perform a task on one or more remote servers. We do not need to create a YAML playbook for every small operation.

For example, imagine that a company has 20 Linux servers. We want to check whether all servers are reachable. Instead of connecting to every server manually, we can execute one Ansible command from the control node.

Ansible connects to the selected servers, executes the requested module, collects the result, and displays it in the terminal.

An ad-hoc command normally contains four important parts:

1. Inventory: Where Ansible gets the server details.
2. Host pattern: Which servers should receive the command.
3. Module: What operation Ansible should perform.
4. Arguments: Additional information required by the module.

Basic syntax:

ansible <host-pattern> -i <inventory-file> -m <module> -a "<module-arguments>"

Example:

ansible webservers -i inventory.ini -m ansible.builtin.ping

Here:
- ansible is the command-line program.
- webservers is the inventory group.
- -i identifies the inventory file.
- -m selects the module.
- ansible.builtin.ping checks whether Ansible can communicate with the target.

Important: The Ansible ping module is not the same as the Linux ping command. It checks Ansible connectivity and Python-based module execution on the remote machine.

Ad-hoc commands are useful for quick checks, simple administration, service operations, package installation, file management, and collecting server information.

When an operation needs multiple dependent steps, reusable logic, variables, templates, handlers, or a repeatable deployment process, a playbook is usually the better choice.`,
      steps: [
        "Install Ansible on a Linux control node or supported development environment.",
        "Create an inventory file containing the target server addresses.",
        "Configure SSH access from the control node to the managed nodes.",
        "Verify the target group names and server connectivity.",
        "Select the correct Ansible module for the task.",
        "Execute the command first against one test server.",
        "Read the result and verify the actual state on the remote machine.",
        "Run against the remaining servers only after confirming the expected behavior."
      ],
      commands: `# Check the installed Ansible version
ansible --version

# Display available command options
ansible --help

# Check whether a group exists in inventory
ansible-inventory -i inventory.ini --graph

# Test all managed servers
ansible all -i inventory.ini -m ansible.builtin.ping

# Test only web servers
ansible webservers -i inventory.ini -m ansible.builtin.ping

# Test one server
ansible 192.168.1.20 -i inventory.ini -m ansible.builtin.ping

# Execute with verbose output
ansible all -i inventory.ini -m ansible.builtin.ping -vvv`,
      config: `[webservers]
web01 ansible_host=192.168.1.20
web02 ansible_host=192.168.1.21

[dbservers]
db01 ansible_host=192.168.1.30

[all:vars]
ansible_user=ubuntu
ansible_ssh_private_key_file=~/.ssh/devops_key

# [webservers] and [dbservers] create inventory groups.
# ansible_host provides the actual IP or DNS address.
# ansible_user specifies the SSH login account.
# ansible_ssh_private_key_file specifies the SSH private key.`,
      problems: [
        {
          issue: "Ansible command runs but no servers are selected.",
          rootCause: "The host pattern does not match an inventory group or hostname.",
          solution: "Run ansible-inventory -i inventory.ini --graph and check the exact group and hostname. Correct the host pattern before executing the command again."
        },
        {
          issue: "The ping module reports UNREACHABLE.",
          rootCause: "SSH connectivity, credentials, network access, or host configuration may be incorrect.",
          solution: "Test SSH manually, verify the IP address and private key, check port 22 access, and execute the Ansible command with -vvv to identify the connection failure."
        }
      ]
    },
    {
      heading: "2. Architecture & Internal Working – How an Ad-Hoc Command Executes",
      explanation: `Ansible normally uses an agentless architecture. We install Ansible on a control node. Managed servers do not normally need a continuously running Ansible agent.

The control node is the machine from which an engineer executes Ansible commands. The managed node is the target server where the requested task runs.

Execution flow:

1. The engineer enters an Ansible command in the terminal.
2. The Ansible command-line interface reads the command options.
3. Ansible loads configuration from the applicable ansible.cfg file and environment.
4. The inventory plugin loads the target server information.
5. The host pattern selects the matching managed nodes.
6. Ansible prepares the task and chooses the requested module.
7. Ansible establishes a connection, commonly SSH for Linux systems.
8. For normal Python-based modules, Ansible transfers the required module code to the remote host.
9. The remote host executes the module.
10. The module returns structured information, normally JSON.
11. Ansible collects the result and displays it in the control node terminal.

Ansible generally removes temporary module files after execution, subject to the connection and execution configuration.

For Linux servers, SSH is commonly used. For Windows servers, WinRM or supported SSH-based connection configurations can be used.

The ping module uses a small Ansible module to verify that the managed host can execute Ansible tasks. It does not simply send ICMP packets.

The command module executes a command without a shell. The shell module executes through a shell and supports shell features such as pipes, redirection, and environment expansion.

The raw module sends a command through the connection without requiring the normal Python module execution mechanism. It is useful for initial bootstrap situations where Python is not installed on a remote host.

The exact execution path depends on the connection plugin, selected module, privilege escalation settings, and target operating system.`,
      steps: [
        "Keep the inventory and SSH credentials available on the control node.",
        "Use ansible-inventory to verify the inventory data.",
        "Select the target group using a host pattern.",
        "Select a module that matches the required operation.",
        "Ansible establishes the configured connection.",
        "The remote operation executes under the configured user or become user.",
        "Ansible collects the result and reports success, change, failure, or unreachable status.",
        "Verify the actual remote state instead of trusting only the terminal output."
      ],
      commands: `# Display inventory structure
ansible-inventory -i inventory.ini --graph

# Display processed inventory variables
ansible-inventory -i inventory.ini --list

# Show detailed SSH and module execution information
ansible webservers -i inventory.ini -m ansible.builtin.ping -vvv

# Test an SSH connection independently
ssh -i ~/.ssh/devops_key ubuntu@192.168.1.20

# Check whether Python exists on a managed server
ansible webservers -i inventory.ini -m ansible.builtin.raw -a "python3 --version"

# Inspect operating system information
ansible webservers -i inventory.ini -m ansible.builtin.setup -a "filter=ansible_distribution*"`,
      config: `[defaults]
inventory = ./inventory.ini
remote_user = ubuntu
host_key_checking = True
timeout = 30
forks = 10

[ssh_connection]
pipelining = True

# inventory identifies the default inventory file.
# remote_user is the default remote login account.
# host_key_checking protects against unknown SSH host identities.
# timeout controls connection timeout behavior.
# forks controls how many hosts Ansible can process in parallel.
# pipelining can reduce some SSH operations and improve performance.
# Use pipelining only after checking privilege escalation and sudo configuration.`,
      problems: [
        {
          issue: "The SSH connection succeeds but a normal module fails.",
          rootCause: "The remote machine may not have a usable Python interpreter or the selected module may not support that environment.",
          solution: "Use the raw module to inspect Python availability, install a supported Python version, configure ansible_python_interpreter if necessary, and retry the normal module."
        },
        {
          issue: "Ansible takes too long to execute commands across many hosts.",
          rootCause: "Network latency, SSH connection setup, low fork count, remote load, or slow modules may increase execution time.",
          solution: "Measure execution with -vvv, review forks and timeout, check server load, and increase concurrency gradually after confirming control-node capacity."
        }
      ]
    },
    {
      heading: "3. Commands Cheat Sheet – Essential Ansible Modules",
      explanation: `Ansible modules are the building blocks used to perform operations on managed nodes. The -m option selects the module and -a passes its arguments.

Use Fully Qualified Collection Names (FQCN) in professional projects. For example, use ansible.builtin.ping instead of depending on a short module name. This makes the module source clear and reduces ambiguity.

A module normally accepts named parameters. The exact parameters depend on the module. Read the module documentation before using unfamiliar options.

Important modules:

ping: Tests Ansible connectivity.
command: Executes a command without a shell.
shell: Executes a command through a shell.
raw: Executes a command without normal module transfer and Python requirements.
setup: Collects system facts.
debug: Displays a message or variable.
copy: Copies a file from the control node to a managed node.
file: Manages file and directory properties.
service: Manages services.
package: Manages packages using the detected package manager.
apt: Manages Debian and Ubuntu packages.
dnf: Manages packages on supported Fedora and RHEL-family systems.
user: Manages local user accounts.
group: Manages local groups.
uri: Makes HTTP requests.
wait_for: Waits for a port, file, or other supported condition.

Use the command module for simple commands that do not require shell features. Use shell only when shell behavior is required.

For example, command does not interpret a pipe as a shell pipeline. The shell module can interpret it because a shell processes the command.

Prefer purpose-built modules such as file, copy, service, package, and user over shell commands whenever possible. These modules can understand the desired state and often provide better idempotence.`,
      steps: [
        "Identify the operation before selecting a module.",
        "Check the module documentation using ansible-doc.",
        "Understand the required arguments and supported operating systems.",
        "Execute a read-only operation first when possible.",
        "Use check mode when the module supports it.",
        "Verify the remote state after the operation."
      ],
      commands: `# Connectivity
ansible all -i inventory.ini -m ansible.builtin.ping

# Execute a simple command
ansible webservers -i inventory.ini -m ansible.builtin.command -a "uptime"

# Execute shell features
ansible webservers -i inventory.ini -m ansible.builtin.shell -a "df -h | grep /dev"

# Inspect operating system facts
ansible all -i inventory.ini -m ansible.builtin.setup

# Display selected facts
ansible all -i inventory.ini -m ansible.builtin.setup -a "filter=ansible_memtotal_mb"

# Display a message
ansible all -i inventory.ini -m ansible.builtin.debug -a "msg='Ansible execution started'"

# Copy a file
ansible webservers -i inventory.ini -m ansible.builtin.copy -a "src=./index.html dest=/tmp/index.html mode=0644"

# Create a directory
ansible webservers -i inventory.ini -m ansible.builtin.file -a "path=/opt/myapp state=directory owner=ubuntu group=ubuntu mode=0755" -b

# Check a service
ansible webservers -i inventory.ini -m ansible.builtin.service -a "name=nginx state=started" -b

# Install a package
ansible webservers -i inventory.ini -m ansible.builtin.package -a "name=nginx state=present" -b

# Create a user
ansible all -i inventory.ini -m ansible.builtin.user -a "name=deploy state=present create_home=yes" -b

# Check an HTTP endpoint
ansible webservers -i inventory.ini -m ansible.builtin.uri -a "url=http://localhost/ status_code=200"

# Wait for an application port
ansible webservers -i inventory.ini -m ansible.builtin.wait_for -a "port=8080 state=started timeout=60"`,
      config: `# Example: copy module arguments
src=./index.html
dest=/var/www/html/index.html
owner=www-data
group=www-data
mode=0644

# src is the source file on the control node.
# dest is the destination path on the managed node.
# owner and group define file ownership.
# mode defines Linux permission bits.

# Example: service module arguments
name=nginx
state=started
enabled=yes

# name identifies the service.
# state=started ensures the service is running.
# enabled=yes configures it to start during boot.

# Example: package module arguments
name=nginx
state=present

# state=present ensures the package is installed.
# state=absent requests package removal.
# Package names can differ across operating systems.`,
      problems: [
        {
          issue: "A shell pipeline fails when executed through command.",
          rootCause: "The command module does not invoke a shell and therefore does not interpret shell operators such as pipes and redirection.",
          solution: "Use ansible.builtin.shell when shell functionality is genuinely required. If possible, replace the pipeline with a purpose-built Ansible module."
        },
        {
          issue: "A module is reported as unavailable.",
          rootCause: "The collection containing the module may not be installed, or the module name may be incorrect.",
          solution: "Run ansible-doc with the FQCN, check installed collections using ansible-galaxy collection list, and install the required collection from an approved source."
        },
        {
          issue: "A command reports success but the desired configuration is not maintained.",
          rootCause: "A raw shell command may execute successfully without checking whether the requested state already exists.",
          solution: "Prefer an idempotent module such as file, package, service, copy, or user. When shell is necessary, design explicit state checks and carefully validate repeated execution."
        }
      ]
    },
    {
      heading: "4. Command-Line Options – Flags Every DevOps Engineer Should Know",
      explanation: `Ansible CLI options control inventory selection, target hosts, connection behavior, privilege escalation, parallel execution, output, and execution safety.

-i specifies the inventory source.
-m selects a module.
-a passes module arguments.
-u selects the remote login user.
-k asks for the SSH password.
-K asks for the privilege escalation password.
-b enables privilege escalation, commonly sudo.
--become-user selects the account used after privilege escalation.
--private-key specifies the SSH private key.
--limit restricts execution to matching hosts.
-f or --forks controls parallel workers.
-v, -vv, -vvv, and -vvvv increase diagnostic output.
--check requests check mode for supported modules.
--diff displays differences for supported modules.
--list-hosts displays the hosts selected by a pattern without executing the task.
-e supplies extra variables.
--timeout controls connection timeout.
--tree writes output to a directory in supported CLI usage.

Do not confuse -k and -K. The first is for the SSH connection password; the second is for the become password.

A powerful production habit is to preview host selection with --list-hosts before executing a potentially disruptive command.`,
      steps: [
        "Start with the least privileged account that can perform the required task.",
        "Use --list-hosts to verify the target set.",
        "Use --limit for a small deployment batch.",
        "Use -vvv only when debugging is required because verbose output can contain sensitive operational details.",
        "Use --check and --diff where the module supports them.",
        "Use --become only for tasks that require elevated privileges.",
        "Keep private keys and passwords outside source control."
      ],
      commands: `# Choose a custom inventory
ansible all -i production.ini -m ansible.builtin.ping

# Select a remote user
ansible all -i inventory.ini -u ubuntu -m ansible.builtin.ping

# Specify an SSH private key
ansible all -i inventory.ini --private-key ~/.ssh/devops_key -m ansible.builtin.ping

# Ask for an SSH password
ansible all -i inventory.ini -u admin -k -m ansible.builtin.ping

# Run with privilege escalation
ansible webservers -i inventory.ini -b -m ansible.builtin.command -a "id"

# Ask for the become password
ansible webservers -i inventory.ini -b -K -m ansible.builtin.command -a "id"

# Preview selected hosts
ansible all -i inventory.ini --list-hosts

# Limit to one host
ansible all -i inventory.ini --limit web01 -m ansible.builtin.ping

# Limit to one group
ansible all -i inventory.ini --limit webservers -m ansible.builtin.ping

# Set parallel execution
ansible all -i inventory.ini -f 20 -m ansible.builtin.ping

# Check mode
ansible webservers -i inventory.ini -b --check -m ansible.builtin.package -a "name=nginx state=present"

# Show configuration differences where supported
ansible webservers -i inventory.ini -b --diff -m ansible.builtin.copy -a "src=./nginx.conf dest=/tmp/nginx.conf"

# Increase diagnostic output
ansible all -i inventory.ini -m ansible.builtin.ping -vvv`,
      config: `[defaults]
inventory = ./inventory.ini
remote_user = ubuntu
private_key_file = ~/.ssh/devops_key
forks = 10
timeout = 30
become = False
become_method = sudo
host_key_checking = True

# These are defaults, not mandatory values.
# Command-line options can override many configuration defaults.
# Keep production inventory and credentials separate from development.
# Do not disable host key checking merely to hide SSH trust problems.`,
      problems: [
        {
          issue: "The command fails with sudo password required.",
          rootCause: "The remote account requires a password for privilege escalation and Ansible was not given the required credential.",
          solution: "Use -K for interactive execution or configure an approved secure credential mechanism for automation. Never place a plaintext sudo password directly in a command."
        },
        {
          issue: "The command runs on more servers than expected.",
          rootCause: "The host pattern matches a broader group than intended.",
          solution: "Run the same host pattern with --list-hosts, inspect the inventory graph, and use --limit to restrict execution before retrying."
        },
        {
          issue: "Check mode does not predict the exact production result.",
          rootCause: "Not every module supports check mode fully, and some operations depend on runtime state or external systems.",
          solution: "Review module check-mode support, test in staging, inspect --diff output, and verify the actual result after execution."
        }
      ]
    },
    {
      heading: "5. Configuration Reference – Practical Ansible Settings",
      explanation: `Ansible configuration controls default behavior for commands. The main configuration file is ansible.cfg.

Ansible searches for configuration in a defined order. A project-local ansible.cfg can make a project easier to reproduce, but an unexpected environment variable or configuration file can change behavior.

Use ansible --version to identify the configuration file currently in use.

Important configuration areas:

[defaults] controls inventory, remote user, forks, timeout, roles, collections, logging, and host key checking.

[ssh_connection] controls SSH-specific connection behavior.

[privilege_escalation] controls default privilege escalation behavior.

Avoid placing secrets in ansible.cfg. Use a suitable secret-management system or Ansible Vault for sensitive variables.

Configuration should be reviewed as code. A project should have predictable inventory paths, connection settings, and execution limits.`,
      steps: [
        "Create ansible.cfg in the project root.",
        "Use relative paths where they make the project portable.",
        "Set a conservative fork count initially.",
        "Keep SSH host key checking enabled in production.",
        "Configure privilege escalation only where required.",
        "Check the active configuration using ansible --version.",
        "Review configuration changes before using them against production."
      ],
      commands: `# Show Ansible version and active configuration file
ansible --version

# Display effective configuration
ansible-config dump --only-changed

# List configuration options
ansible-config list

# Inspect a specific configuration option
ansible-config dump | grep -i forks

# Validate inventory syntax and content
ansible-inventory -i inventory.ini --graph

# Check a module's documentation
ansible-doc ansible.builtin.copy

# Check the service module documentation
ansible-doc ansible.builtin.service`,
      config: `[defaults]
inventory = ./inventory.ini
remote_user = ubuntu
forks = 10
timeout = 30
host_key_checking = True
retry_files_enabled = False
interpreter_python = auto_silent
deprecation_warnings = True

[privilege_escalation]
become = False
become_method = sudo
become_user = root
become_ask_pass = False

[ssh_connection]
pipelining = True
ssh_args = -o ControlMaster=auto -o ControlPersist=60s

# inventory: default inventory location.
# remote_user: default SSH user.
# forks: number of parallel host workers.
# timeout: connection timeout in seconds.
# host_key_checking: validates SSH host identity.
# interpreter_python: Python interpreter discovery behavior.
# become: whether privilege escalation is enabled by default.
# become_method: privilege escalation mechanism.
# become_user: target account for escalation.
# pipelining: can reduce remote execution overhead.
# ControlPersist: reuses SSH connections for a limited period.
# Review SSH options against your organization's security standards.`,
      problems: [
        {
          issue: "Ansible appears to ignore the project's ansible.cfg.",
          rootCause: "Ansible may be loading a different configuration file, or the project configuration may not be in the expected working directory.",
          solution: "Run ansible --version, inspect the displayed configuration path, check the current working directory, and remove conflicting environment overrides."
        },
        {
          issue: "Production automation becomes unexpectedly slow after a configuration change.",
          rootCause: "Fork count, SSH multiplexing, timeout, or connection settings may have changed.",
          solution: "Compare ansible-config dump --only-changed with the previous configuration, measure execution time, and restore the last known good settings if required."
        }
      ]
    },
    {
      heading: "6. End-to-End Workflow – Daily Company Operations",
      explanation: `Scenario: A company runs an application on several Ubuntu web servers. An engineer must inspect the fleet, verify connectivity, check disk usage, install Nginx, ensure that the service is running, and verify the HTTP response.

A safe workflow should move from inspection to controlled changes and then verification.

Phase 1 – Inventory validation:
Confirm that the correct production servers are listed.

Phase 2 – Connectivity:
Use the ping module to confirm Ansible execution.

Phase 3 – Baseline inspection:
Collect operating system, memory, disk, uptime, and service information.

Phase 4 – Change planning:
Check whether the required package is already installed and identify the impact of the operation.

Phase 5 – Controlled execution:
Apply the change to one test host or a small batch first.

Phase 6 – Verification:
Check package state, service state, listening ports, and application response.

Phase 7 – Record keeping:
Record the execution time, target hosts, result, change reference, and any failed hosts.

Ad-hoc commands are suitable for quick operational tasks. If the workflow becomes a repeated company process, convert it into a reviewed playbook or pipeline.`,
      steps: [
        "Confirm that the production inventory is the intended inventory.",
        "Preview the webservers group with --list-hosts.",
        "Test Ansible connectivity.",
        "Collect uptime, memory, and disk information.",
        "Check the current Nginx service state.",
        "Install Nginx using the package module.",
        "Start and enable the service using the service module.",
        "Check the service and HTTP endpoint.",
        "Repeat the operation in controlled batches.",
        "Document failed hosts and remediation actions."
      ],
      commands: `# Step 1: Confirm target hosts
ansible webservers -i production.ini --list-hosts

# Step 2: Test connectivity
ansible webservers -i production.ini -m ansible.builtin.ping

# Step 3: Collect uptime
ansible webservers -i production.ini -m ansible.builtin.command -a "uptime"

# Step 4: Check disk space
ansible webservers -i production.ini -m ansible.builtin.command -a "df -h"

# Step 5: Check memory
ansible webservers -i production.ini -m ansible.builtin.command -a "free -h"

# Step 6: Install Nginx
ansible webservers -i production.ini -b -m ansible.builtin.package -a "name=nginx state=present"

# Step 7: Start and enable Nginx
ansible webservers -i production.ini -b -m ansible.builtin.service -a "name=nginx state=started enabled=yes"

# Step 8: Verify service
ansible webservers -i production.ini -b -m ansible.builtin.command -a "systemctl is-active nginx"

# Step 9: Verify HTTP response
ansible webservers -i production.ini -m ansible.builtin.uri -a "url=http://localhost/ status_code=200"

# Step 10: Verify listening port
ansible webservers -i production.ini -b -m ansible.builtin.command -a "ss -lntp"`,
      config: `[webservers]
web01 ansible_host=192.168.1.20
web02 ansible_host=192.168.1.21
web03 ansible_host=192.168.1.22

[webservers:vars]
ansible_user=ubuntu
ansible_ssh_private_key_file=~/.ssh/production_key

# Use a separate production inventory.
# Store the private key securely.
# Use the actual approved production addresses.
# Do not copy sample IP addresses into a real environment.`,
      problems: [
        {
          issue: "Nginx is installed but the HTTP check fails.",
          rootCause: "The service may not be running, the configuration may be invalid, the port may be blocked, or the application may not be listening on the expected interface.",
          solution: "Check systemctl status nginx, inspect nginx error logs, run nginx -t, verify listening sockets with ss -lntp, and check firewall and load-balancer health checks."
        },
        {
          issue: "Only some servers complete the workflow.",
          rootCause: "Individual hosts may have different operating system states, package repositories, network access, or configuration.",
          solution: "Identify failed hosts from Ansible output, use --limit to isolate them, inspect each host's logs and state, and rerun only after correcting the root cause."
        }
      ]
    },
    {
      heading: "7. Real-Time Company Scenarios – Practical Engineer Usage",
      explanation: `Scenario A: Morning server health check.

An engineer needs to check whether all Linux servers are reachable and whether disk usage is approaching a critical level. Ad-hoc commands can collect uptime and disk usage from the complete inventory.

Scenario B: Emergency service restart.

An application service has stopped on one server. The engineer identifies the affected host, checks its status, reviews logs, and restarts the service only after confirming the reason.

Scenario C: Security patch preparation.

The operations team checks operating system versions and package information before planning a patch window. A package update should not be applied blindly to every production server.

Scenario D: New deployment user.

A deployment account must be created across a controlled group of servers. The user module can create the account with the required home directory and shell. SSH key installation and sudo access should follow the organization's access policy.

Scenario E: Application endpoint verification.

After deployment, engineers can use the URI module to check whether an endpoint returns the expected HTTP status.

Scenario F: Incident investigation.

When an alert reports high disk usage, Ansible can collect filesystem usage from the affected server group. Engineers can compare results and identify which machines need immediate investigation.

Senior engineer thinking:
Do not run a destructive command on all servers simply because it works on one server. First identify the blast radius, test on a canary host, monitor the result, and expand gradually.`,
      steps: [
        "Identify the operational objective and affected application.",
        "Choose the smallest possible target group.",
        "Collect baseline information before changing anything.",
        "Check the change window and service dependencies.",
        "Execute a low-risk test on one host.",
        "Observe application health and monitoring signals.",
        "Continue in batches when the first result is healthy.",
        "Stop the rollout when error rates or service health deteriorate.",
        "Record the incident, command, affected hosts, and final result."
      ],
      commands: `# Check disk usage across application servers
ansible appservers -i production.ini -m ansible.builtin.command -a "df -h"

# Find the largest filesystem entries in a selected location
ansible appservers -i production.ini -b -m ansible.builtin.command -a "du -sh /var/log"

# Check service state
ansible appservers -i production.ini -b -m ansible.builtin.command -a "systemctl is-active myapp"

# Inspect recent service logs
ansible appservers -i production.ini -b -m ansible.builtin.command -a "journalctl -u myapp -n 50 --no-pager"

# Restart a service on one canary host
ansible all -i production.ini --limit app01 -b -m ansible.builtin.service -a "name=myapp state=restarted"

# Check application endpoint
ansible appservers -i production.ini -m ansible.builtin.uri -a "url=http://localhost:8080/health status_code=200"

# Collect operating system distribution
ansible all -i production.ini -m ansible.builtin.setup -a "filter=ansible_distribution*"

# Check deployment account
ansible appservers -i production.ini -b -m ansible.builtin.command -a "id deploy"`,
      config: `# Example operational inventory
[appservers]
app01 ansible_host=192.168.10.11
app02 ansible_host=192.168.10.12
app03 ansible_host=192.168.10.13

[monitoring]
monitor01 ansible_host=192.168.10.30

[appservers:vars]
ansible_user=deploy

# Separate groups by operational role.
# Use a canary host for initial changes.
# Keep production and staging inventories separate.
# Never store credentials in a public repository.`,
      problems: [
        {
          issue: "An emergency restart makes the incident worse.",
          rootCause: "The service may depend on another component, or restarting it may interrupt active requests and worsen an existing resource problem.",
          solution: "Inspect service dependencies and logs before restarting. Follow the incident runbook, use a canary where possible, and verify application health after the operation."
        },
        {
          issue: "A server health command produces too much output to review.",
          rootCause: "The command collects unnecessary information from too many hosts.",
          solution: "Use a narrower host pattern, select only the required facts, and use a dedicated monitoring system for continuous metrics and alerting."
        }
      ]
    },
    {
      heading: "8. Production Operations – Performance, Monitoring and Security",
      explanation: `Ad-hoc commands are useful for operational checks, but production execution requires planning.

Parallelism:
Ansible uses forks to process multiple hosts concurrently. A higher fork count can reduce total execution time, but it also increases resource use on the control node and connection load on managed nodes.

Batching:
Use --limit to operate on a small group. A canary deployment means testing the change on a small number of hosts before expanding.

Privilege escalation:
Use -b only when root-level access is necessary. Avoid running every command as root.

Credentials:
Use SSH keys, approved secret stores, and Ansible Vault where appropriate. Never commit private keys, passwords, tokens, or production secrets to Git.

Host identity:
Keep SSH host key checking enabled. An unknown or changed host key should be investigated rather than blindly trusted.

Logging:
Ansible output is useful for task-level results. Centralized logging and monitoring systems should be used for long-term operational visibility.

Idempotence:
A repeated command should ideally leave the system in the same desired state. Modules such as package, service, file, copy, and user are generally preferable to arbitrary shell commands for configuration management.

Change safety:
Use a change ticket or incident reference, confirm the host list, test in staging, use a canary, and verify the result.

Ansible is not a replacement for a monitoring platform. It can collect information when asked, while Prometheus, Grafana, and log platforms provide continuous visibility.`,
      steps: [
        "Use separate inventories for development, staging, and production.",
        "Use a dedicated automation account with limited permissions.",
        "Enable SSH host key checking.",
        "Protect SSH keys and Vault passwords.",
        "Start with a conservative forks value.",
        "Use --limit to reduce blast radius.",
        "Avoid unnecessary shell execution and root privileges.",
        "Capture execution output in the approved operational logging system.",
        "Monitor service health before and after changes.",
        "Review failed hosts and clean up temporary credentials or files."
      ],
      commands: `# Check the current configuration
ansible-config dump --only-changed

# Preview a production target group
ansible webservers -i production.ini --list-hosts

# Run a read-only check with limited concurrency
ansible webservers -i production.ini -f 5 -m ansible.builtin.command -a "uptime"

# Run against a canary
ansible webservers -i production.ini --limit web01 -m ansible.builtin.ping

# Run with elevated privilege only where required
ansible webservers -i production.ini -b -m ansible.builtin.command -a "systemctl status nginx"

# Collect service logs
ansible webservers -i production.ini -b -m ansible.builtin.command -a "journalctl -u nginx -n 100 --no-pager"

# Check SSH configuration and connectivity with verbose diagnostics
ansible webservers -i production.ini -m ansible.builtin.ping -vvv

# Check installed collections
ansible-galaxy collection list`,
      config: `[defaults]
inventory = ./production.ini
remote_user = automation
forks = 5
timeout = 30
host_key_checking = True
log_path = ./ansible-operation.log

[privilege_escalation]
become = False
become_method = sudo
become_user = root

# log_path is an example local log destination.
# Protect log files because output may contain infrastructure details.
# Use organization-approved retention and access controls.
# Increase forks only after measuring the impact.
# Do not disable SSH identity verification in production.`,
      problems: [
        {
          issue: "The control node becomes overloaded during a large execution.",
          rootCause: "Too many parallel workers, SSH sessions, or large fact-collection operations are running simultaneously.",
          solution: "Reduce forks, use smaller host batches, collect only required facts, and monitor control-node CPU, memory, and network utilization."
        },
        {
          issue: "Sensitive information appears in Ansible output or logs.",
          rootCause: "A command or module returned secret values, or verbose execution output exposed connection details.",
          solution: "Avoid printing secrets, use no_log in playbooks for sensitive tasks, restrict log access, rotate exposed credentials, and review retention policies."
        }
      ]
    },
    {
      heading: "9. Troubleshooting & Root Cause Analysis – Common Failures",
      explanation: `Ansible command failures generally fall into four categories:

UNREACHABLE:
Ansible could not establish the connection or communicate with the managed node.

FAILED:
The task reached the target but the requested operation failed.

CHANGED:
The operation completed and Ansible reports that the target was modified.

SUCCESS / OK:
The task completed without reporting a change.

A changed result is not necessarily an error. For example, installing a missing package can produce CHANGED. Running the same idempotent package command again may produce SUCCESS or OK.

UNREACHABLE is commonly related to SSH, DNS, firewall rules, routing, credentials, or host identity.

Permission failures may occur because the remote account lacks access to a file, command, package manager, or service operation.

Module failures may be caused by unsupported parameters, missing dependencies, incorrect module names, or an unavailable Python interpreter.

Quoting problems are common when command arguments contain spaces, quotes, variables, pipes, or special characters. Prefer purpose-built modules and carefully test command arguments.

RCA process:
1. Identify the exact failed host.
2. Read the complete error message.
3. Re-run only the failed host with -vvv.
4. Test the underlying connection independently.
5. Check the remote logs and permissions.
6. Identify the first failure, not just the final symptom.
7. Correct the underlying cause.
8. Re-run the smallest safe test.
9. Verify the system state.
10. Document the permanent fix.

Do not repeatedly rerun a failed command without understanding its cause. A repeated operation can make an incident worse when the operation is not idempotent.`,
      steps: [
        "Separate unreachable hosts from hosts that returned module failures.",
        "Check the target hostname and IP address.",
        "Verify DNS resolution and network reachability.",
        "Test SSH using the same user and key.",
        "Inspect sudo permissions when privilege escalation is used.",
        "Check Python availability and module compatibility.",
        "Review service logs and operating system logs.",
        "Use -vvv to identify the exact failure point.",
        "Apply the permanent fix and verify the result."
      ],
      commands: `# Diagnose one failed host
ansible all -i inventory.ini --limit web01 -m ansible.builtin.ping -vvv

# Test SSH manually
ssh -vvv -i ~/.ssh/devops_key ubuntu@192.168.1.20

# Check DNS resolution from the control node
getent hosts web01

# Check remote Python
ansible web01 -i inventory.ini -m ansible.builtin.raw -a "python3 --version"

# Check remote identity
ansible web01 -i inventory.ini -m ansible.builtin.command -a "id"

# Check sudo permissions
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "id"

# Check filesystem permissions
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "ls -ld /var/www/html"

# Check service status
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "systemctl status nginx --no-pager"

# Read recent service logs
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "journalctl -u nginx -n 50 --no-pager"

# Check disk space
ansible web01 -i inventory.ini -m ansible.builtin.command -a "df -h"`,
      config: `# Example: define a custom Python interpreter
[webservers]
web01 ansible_host=192.168.1.20 ansible_python_interpreter=/usr/bin/python3

# Example: connection settings
[webservers:vars]
ansible_user=ubuntu
ansible_connection=ssh
ansible_port=22

# Verify that the interpreter path actually exists.
# Use the correct connection type for the target operating system.
# Do not change connection settings blindly to hide a real failure.`,
      problems: [
        {
          issue: "UNREACHABLE: Permission denied (publickey).",
          rootCause: "The SSH user, private key, authorized_keys configuration, or server-side SSH policy is incorrect.",
          solution: "Verify the inventory user and private key, test SSH manually, confirm the public key is installed for the correct account, and check server-side SSH authentication logs."
        },
        {
          issue: "FAILED: Missing sudo password.",
          rootCause: "The target account requires an interactive or configured privilege escalation credential.",
          solution: "Use -K for a controlled interactive run or configure an approved Vault or secret-store integration. Do not expose passwords in shell history."
        },
        {
          issue: "FAILED: Could not find or execute the required Python interpreter.",
          rootCause: "Python is missing, located at a different path, or not detected correctly.",
          solution: "Use raw to inspect the host, install a supported Python interpreter using the approved bootstrap process, and configure ansible_python_interpreter if needed."
        },
        {
          issue: "A command works manually but fails through Ansible.",
          rootCause: "The Ansible remote user may have a different PATH, environment, working directory, shell, or permission set.",
          solution: "Compare the remote identity and environment, use absolute executable paths, avoid relying on interactive shell profiles, and use become only when required."
        }
      ]
    },
    {
      heading: "10. Best Practices, Verification and Senior Engineer Knowledge",
      explanation: `A good DevOps engineer does not simply know how to execute an Ansible command. The engineer understands the impact, security, repeatability, and verification of that command.

Best practices:

1. Use FQCN module names such as ansible.builtin.copy.
2. Prefer purpose-built modules over shell commands.
3. Use ad-hoc commands for quick operations and playbooks for repeatable workflows.
4. Validate the target host list before production changes.
5. Use a canary host before changing a large fleet.
6. Keep inventory and credentials separated by environment.
7. Use least-privilege SSH accounts.
8. Protect SSH keys and sensitive variables.
9. Use check mode and diff mode where supported.
10. Keep SSH host key checking enabled.
11. Set reasonable timeouts and fork counts.
12. Verify the resulting state on the remote host.
13. Document operational changes.
14. Stop execution when unexpected failures increase the blast radius.
15. Convert repeated operational procedures into reviewed automation.

Verification checklist:

- Did Ansible select the intended hosts?
- Did every selected host respond?
- Was the expected module executed?
- Did the module report a failure or a change?
- Is the requested package, file, user, or service in the expected state?
- Is the application healthy?
- Are logs free from new errors?
- Did monitoring remain healthy?
- Was the result documented?

Senior engineer decisions:

Question: Should we use an ad-hoc command or a playbook?
Decision: Use ad-hoc commands for quick one-time operations. Use playbooks for repeatable, multi-step, reviewed automation.

Question: Should we increase forks to 100?
Decision: Not automatically. Measure the control node, SSH capacity, network, and managed-node load. Increase concurrency gradually.

Question: Is --check a guarantee that production execution will succeed?
Decision: No. Check mode is useful but depends on module support and runtime conditions.

Question: Should every command use become?
Decision: No. Use privilege escalation only for tasks that need it.

Question: Is Ansible ping the same as ICMP ping?
Decision: No. The Ansible ping module verifies Ansible connectivity and module execution.

Question: Why prefer a module over shell?
Decision: Purpose-built modules can manage desired state, improve idempotence, and provide more predictable results.

Question: What should happen when a canary fails?
Decision: Stop the rollout, investigate the failure, protect remaining hosts, and continue only after the cause is understood and corrected.`,
      steps: [
        "Preview the exact hosts before execution.",
        "Use the correct module and fully qualified module name.",
        "Use the least privileged remote account.",
        "Test changes on a non-production or canary host.",
        "Use check mode and diff mode when supported.",
        "Inspect Ansible output for failed and unreachable hosts.",
        "Verify the actual state using an independent command or health check.",
        "Check application monitoring after the operation.",
        "Document the result and any follow-up work.",
        "Move repeated tasks into version-controlled playbooks."
      ],
      commands: `# Confirm selected hosts
ansible webservers -i production.ini --list-hosts

# Confirm Ansible version
ansible --version

# Confirm effective configuration
ansible-config dump --only-changed

# Inspect module documentation
ansible-doc ansible.builtin.package

# Verify package state
ansible webservers -i production.ini -b -m ansible.builtin.package -a "name=nginx state=present"

# Verify service state
ansible webservers -i production.ini -b -m ansible.builtin.service -a "name=nginx state=started"

# Verify HTTP response
ansible webservers -i production.ini -m ansible.builtin.uri -a "url=http://localhost/ status_code=200"

# Verify operating system facts
ansible webservers -i production.ini -m ansible.builtin.setup -a "filter=ansible_distribution*"

# Verify a specific host after a change
ansible all -i production.ini --limit web01 -m ansible.builtin.ping`,
      config: `# Example project structure
ansible-project/
  ansible.cfg
  inventory/
    development.ini
    staging.ini
    production.ini
  group_vars/
  host_vars/
  playbooks/
  roles/
  files/
  templates/

# Keep environment-specific inventory separate.
# Store reviewed automation in version control.
# Do not commit passwords or private SSH keys.
# Use playbooks for repeatable workflows.
# Use ad-hoc commands for quick operational tasks.
# Maintain a change history and operational runbook.`,
      problems: [
        {
          issue: "The same ad-hoc command is copied and manually executed differently by multiple engineers.",
          rootCause: "The operation has become a repeated process without a version-controlled standard.",
          solution: "Create a reviewed playbook with documented variables, validation, error handling, and rollback steps. Keep the ad-hoc command for quick diagnosis."
        },
        {
          issue: "Ansible reports success but the application is still unhealthy.",
          rootCause: "The command verified only the operating system operation, not the complete application behavior.",
          solution: "Add independent health checks, inspect application logs, validate dependencies, and check load-balancer or monitoring status before declaring the operation successful."
        },
        {
          issue: "A production change affects every server at once.",
          rootCause: "The engineer used a broad host pattern without canary testing or staged execution.",
          solution: "Stop further execution, assess the impact, recover affected services, and introduce host limits and staged rollout procedures for future operations."
        }
      ]
    }
  ]
};

export default noteData;
