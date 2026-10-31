import type { NoteData } from "../types";

const noteData: NoteData = {
  title: "Ansible Installation and Configuration",
  description: "Production-focused guide to installing Ansible, preparing control nodes, configuring SSH, managing ansible.cfg, Python environments, privilege escalation, collections, execution settings, CI/CD, security, and troubleshooting.",
  sections: [
    {
      heading: "1. Architecture and Installation Planning",
      explanation: "Ansible is an agentless automation engine. A control node runs Ansible Core and connects to managed Linux nodes through SSH. The control node contains Python, inventory, playbooks, roles, collections, and ansible.cfg. Managed nodes generally do not need a permanently running Ansible agent. Production design must consider network access, Python compatibility, authentication, privilege escalation, version pinning, and secret management.",
      steps: [
        "Choose a supported Linux control node.",
        "Install Python 3 and an SSH client.",
        "Create a dedicated automation account.",
        "Confirm DNS, routing, and SSH connectivity.",
        "Separate development, staging, and production inventories.",
        "Pin Ansible and collection versions.",
        "Store automation code in version control."
      ],
      commands: `cat /etc/os-release
python3 --version
ssh -V
ip route
getent hosts server01.example.com
df -h
free -h`,
      problems: [
        {
          issue: "Control node cannot reach a managed host.",
          rootCause: "DNS, routing, firewall, security group, or network ACL configuration is incorrect.",
          solution: "Verify name resolution, route, TCP port 22, firewall rules, and SSH service status before testing Ansible."
        }
      ]
    },
    {
      heading: "2. Install Ansible and Isolate Python Dependencies",
      explanation: "Ansible Core can be installed from operating system repositories or Python package management. A virtual environment isolates dependencies and avoids modifying system-managed Python packages. Production teams should test and pin a known version so that a package update does not unexpectedly change automation behavior.",
      steps: [
        "Install Python, pip, and SSH client packages.",
        "Create a project directory.",
        "Create and activate a Python virtual environment.",
        "Install a tested Ansible Core version.",
        "Verify the executable path and version.",
        "Record the dependency version for repeatable installations."
      ],
      commands: `# Ubuntu / Debian
sudo apt update
sudo apt install -y python3 python3-pip python3-venv openssh-client

# Create project
mkdir -p ~/ansible-project
cd ~/ansible-project

# Isolated installation
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install ansible-core==2.17.7

# Verify
ansible --version
ansible-playbook --version
which ansible

# RHEL family
sudo dnf install -y python3 python3-pip openssh-clients`,
      problems: [
        {
          issue: "externally-managed-environment error during pip installation.",
          rootCause: "The operating system protects its system Python environment.",
          solution: "Use python3 -m venv .venv, activate it, and install Ansible inside that environment."
        },
        {
          issue: "ansible command not found.",
          rootCause: "The virtual environment is not activated or its bin directory is missing from PATH.",
          solution: "Activate the environment and check which ansible and python -m pip show ansible-core."
        }
      ]
    },
    {
      heading: "3. Configure ansible.cfg",
      explanation: "Ansible uses configuration settings to determine inventory location, remote user, SSH behavior, parallel execution, timeout, and other defaults. ANSIBLE_CONFIG can explicitly select a configuration file. Otherwise, Ansible searches the current project directory, the user's home directory, and the system configuration location. A project-level file makes behavior easier to reproduce across developer machines and CI runners.",
      steps: [
        "Create ansible.cfg in the repository root.",
        "Set the default inventory path.",
        "Configure remote user and connection timeout.",
        "Choose an appropriate forks value.",
        "Keep host key verification enabled.",
        "Check which configuration file is active."
      ],
      config: `[defaults]
inventory = ./inventory/hosts.ini
remote_user = ansible
host_key_checking = True
timeout = 30
forks = 20
retry_files_enabled = False
interpreter_python = auto_silent
deprecation_warnings = True

[ssh_connection]
pipelining = True
ssh_args = -o ControlMaster=auto -o ControlPersist=60s`,
      commands: `ansible --version
ansible-config list
ansible-config dump
ansible-config dump --only-changed
ANSIBLE_CONFIG=./ansible.cfg ansible --version`,
      problems: [
        {
          issue: "Expected ansible.cfg settings are not applied.",
          rootCause: "The command runs from a different directory or ANSIBLE_CONFIG selects another file.",
          solution: "Use ansible --version to identify the active configuration file and set ANSIBLE_CONFIG explicitly in CI."
        }
      ]
    },
    {
      heading: "4. SSH Keys and Managed Node Preparation",
      explanation: "SSH public-key authentication is the common connection method for Linux managed nodes. The automation account must be able to authenticate and execute required commands. SSH access and sudo privileges are different permissions. Use dedicated keys, verify host identities, restrict account access, and never commit private keys to Git.",
      steps: [
        "Create an automation account on each managed node.",
        "Generate a dedicated SSH key on the control node.",
        "Install the public key for the automation account.",
        "Verify ownership and permissions of SSH files.",
        "Test SSH manually before using Ansible.",
        "Configure sudo permissions based on actual requirements."
      ],
      commands: `# Generate a key
ssh-keygen -t ed25519 -C "ansible-automation"

# Copy public key
ssh-copy-id ansible@192.168.1.20

# Test SSH
ssh ansible@192.168.1.20

# Check SSH service on managed host
sudo systemctl status sshd

# Inspect authorized key permissions
ls -ld ~/.ssh
ls -l ~/.ssh/authorized_keys

# Test non-interactive sudo
sudo -n whoami`,
      config: `# Example ~/.ssh/config
Host app-server
    HostName 192.168.1.20
    User ansible
    IdentityFile ~/.ssh/ansible_ed25519
    IdentitiesOnly yes
    StrictHostKeyChecking yes`,
      problems: [
        {
          issue: "Permission denied (publickey).",
          rootCause: "Wrong username, wrong key, missing authorized_keys entry, or incorrect SSH file permissions.",
          solution: "Use ssh -vvv to inspect authentication, verify the public key on the server, and correct ownership and permissions."
        },
        {
          issue: "Host key verification failed.",
          rootCause: "The server identity is unknown or its recorded host key changed.",
          solution: "Verify the new fingerprint through a trusted channel and update known_hosts safely."
        }
      ]
    },
    {
      heading: "5. Privilege Escalation and Sudo Configuration",
      explanation: "Ansible connects as the configured remote user and can elevate privileges using become. The become mechanism commonly uses sudo on Linux. Use the least privilege necessary. Unrestricted passwordless sudo can create significant risk if the automation account or its private key is compromised.",
      steps: [
        "Create a dedicated automation account.",
        "Grant only the required sudo permissions.",
        "Use become at play or task level.",
        "Store become passwords in an approved secret manager or Ansible Vault.",
        "Test sudo independently before executing privileged playbooks."
      ],
      config: `[privilege_escalation]
become = False
become_method = sudo
become_user = root
become_ask_pass = False`,
      commands: `# Test sudo access
ssh ansible@192.168.1.20 "sudo -n whoami"

# Run a privileged module
ansible app_servers -i inventory/hosts.ini -m command -a "id" -b

# Inspect sudo configuration
sudo visudo -c
sudo -l -U ansible`,
      problems: [
        {
          issue: "sudo: a password is required.",
          rootCause: "The automation user requires a password but the playbook does not provide an approved become credential.",
          solution: "Configure an approved sudo policy or supply the become password securely using Ansible Vault or a secret manager."
        },
        {
          issue: "User is not allowed to run sudo.",
          rootCause: "The automation account lacks the required sudoers authorization.",
          solution: "Have an administrator grant only the required commands or privileges and validate using visudo."
        }
      ]
    },
    {
      heading: "6. Collections and Dependency Management",
      explanation: "Ansible collections package modules, plugins, roles, and supporting documentation. Ansible Core does not automatically provide every module from every community collection. A project should declare collection dependencies in requirements.yml and install tested versions consistently. This avoids a playbook working on one developer machine but failing on a CI runner.",
      steps: [
        "Identify external modules used by playbooks.",
        "Create requirements.yml.",
        "Pin collection versions.",
        "Install dependencies in the automation environment.",
        "Verify installed collections.",
        "Commit dependency files to Git."
      ],
      config: `# requirements.yml
collections:
  - name: ansible.posix
    version: "1.6.2"
  - name: community.general
    version: "10.1.0"`,
      commands: `# Install declared dependencies
ansible-galaxy collection install -r requirements.yml

# List installed collections
ansible-galaxy collection list

# Inspect collection documentation
ansible-doc ansible.posix.firewalld

# Inspect module documentation
ansible-doc ansible.builtin.copy`,
      problems: [
        {
          issue: "couldn't resolve module/action error.",
          rootCause: "The required collection is not installed or the fully qualified collection name is incorrect.",
          solution: "Install requirements.yml, verify ansible-galaxy collection list, and use the correct namespace.collection.module name."
        }
      ]
    },
    {
      heading: "7. Execution Settings, Parallelism, and Performance",
      explanation: "Ansible executes tasks across multiple managed nodes using forks. Increasing forks can reduce total execution time but also increases CPU, memory, SSH connection, and target-server load. SSH pipelining and connection reuse can reduce overhead. Select values based on control-node capacity and the impact on managed systems rather than copying a large forks value blindly.",
      steps: [
        "Measure baseline execution duration.",
        "Check CPU, memory, and network utilization.",
        "Set forks according to workload and control-node capacity.",
        "Use SSH connection reuse where supported.",
        "Configure connection timeouts for slow networks.",
        "Use serial execution for sensitive rolling deployments.",
        "Monitor managed-node load during parallel execution."
      ],
      config: `[defaults]
forks = 20
timeout = 30
host_key_checking = True

[ssh_connection]
pipelining = True
ssh_args = -o ControlMaster=auto -o ControlPersist=60s`,
      commands: `# Override forks for one run
ansible-playbook site.yml -f 10

# Limit execution to a subset
ansible-playbook site.yml --limit app01

# Check available options
ansible-playbook --help

# Measure execution time
time ansible-playbook site.yml`,
      problems: [
        {
          issue: "SSH connection failures increase when forks is raised.",
          rootCause: "The control node or target systems cannot handle the increased number of simultaneous connections.",
          solution: "Reduce forks, inspect resource utilization, check SSH limits, and increase concurrency gradually."
        },
        {
          issue: "Playbooks frequently time out.",
          rootCause: "Slow networks, overloaded hosts, DNS delays, or long-running commands exceed the configured timeout.",
          solution: "Identify the actual delay and tune timeout or task-specific asynchronous execution rather than globally increasing every timeout."
        }
      ]
    },
    {
      heading: "8. CI/CD Integration and Repeatable Execution",
      explanation: "Ansible can be integrated into Jenkins, GitHub Actions, GitLab CI, or other delivery systems. A reliable pipeline checks out automation code, prepares a pinned Python environment, installs collection dependencies, validates syntax, checks inventory, and executes approved playbooks. Production credentials must be injected through protected secrets and must not appear in pipeline logs.",
      steps: [
        "Store playbooks and dependency manifests in Git.",
        "Use a pinned Python and Ansible environment.",
        "Install collections from requirements.yml.",
        "Run syntax validation before deployment.",
        "Use separate credentials and inventories per environment.",
        "Require approval for production execution.",
        "Archive logs and execution results."
      ],
      config: `# Example Jenkins pipeline stage
stage('Validate Ansible') {
    steps {
        sh '''
          python3 -m venv .venv
          . .venv/bin/activate
          pip install ansible-core==2.17.7
          ansible-galaxy collection install -r requirements.yml
          ansible-playbook site.yml --syntax-check
          ansible-inventory -i inventory/hosts.ini --graph
        '''
    }
}`,
      commands: `# Validate a playbook
ansible-playbook site.yml --syntax-check

# Validate inventory
ansible-inventory -i inventory/hosts.ini --graph

# Execute a staging deployment
ansible-playbook -i inventory/staging/hosts.ini site.yml

# Execute approved production deployment
ansible-playbook -i inventory/production/hosts.ini site.yml --limit app_servers`,
      problems: [
        {
          issue: "Pipeline succeeds locally but fails in Jenkins.",
          rootCause: "The Jenkins agent has different Python, Ansible, collection, SSH key, or configuration versions.",
          solution: "Use a reproducible environment, pin dependencies, validate executable paths, and configure credentials explicitly."
        }
      ]
    },
    {
      heading: "9. Verification, Diagnostics, and Production Troubleshooting",
      explanation: "Installation success alone does not prove that automation is ready. Verify the active executable, Python interpreter, configuration file, collection dependencies, inventory parsing, SSH authentication, and privilege escalation. Diagnose failures in layers: control-node environment, configuration, inventory, DNS/network, SSH, Python on managed nodes, sudo, and finally task behavior. This layered method avoids changing unrelated settings when the real problem is connectivity or credentials.",
      steps: [
        "Verify Ansible and Python versions.",
        "Confirm the active ansible.cfg.",
        "Validate collection dependencies.",
        "Parse and inspect inventory.",
        "Test SSH to a representative managed node.",
        "Run the Ansible ping module.",
        "Test become access.",
        "Run a harmless playbook before production rollout."
      ],
      commands: `# Version and executable
ansible --version
which ansible
python3 --version

# Configuration
ansible-config dump --only-changed

# Inventory validation
ansible-inventory -i inventory/hosts.ini --list
ansible-inventory -i inventory/hosts.ini --graph

# Connectivity
ansible all -i inventory/hosts.ini -m ansible.builtin.ping

# Privilege escalation test
ansible all -i inventory/hosts.ini -m ansible.builtin.command -a "id" --become

# Increase diagnostic verbosity
ansible all -i inventory/hosts.ini -m ansible.builtin.ping -vvvv

# Playbook validation
ansible-playbook site.yml --syntax-check`,
      problems: [
        {
          issue: "UNREACHABLE! error.",
          rootCause: "Ansible cannot establish the remote connection due to DNS, routing, SSH authentication, firewall, or connection settings.",
          solution: "Test SSH manually, inspect verbose output, validate host and user values, and correct the network or authentication issue."
        },
        {
          issue: "The ping module fails although SSH login succeeds.",
          rootCause: "Python is missing on the managed node, or Ansible selects an incompatible interpreter.",
          solution: "Check Python on the remote host and configure ansible_python_interpreter when automatic discovery selects the wrong interpreter."
        },
        {
          issue: "Ansible uses an unexpected Python interpreter.",
          rootCause: "Multiple Python installations exist or interpreter discovery selects a different executable.",
          solution: "Inspect interpreter discovery and set ansible_python_interpreter to the supported absolute path when necessary."
        }
      ]
    },
    {
      heading: "10. Security, Recovery, and Senior Engineer Decisions",
      explanation: "Production Ansible installations should be reproducible, auditable, and least-privileged. Protect SSH private keys, encrypt sensitive variables, pin dependencies, review configuration changes, and separate environments. If an automation environment is compromised, revoke its keys and tokens, rotate exposed credentials, inspect execution logs, rebuild the control node from a trusted image, and verify managed systems. Senior engineers choose between system packages, virtual environments, and execution environments based on reproducibility, supportability, isolation, and operational ownership.",
      steps: [
        "Keep private keys and passwords outside Git.",
        "Use Ansible Vault or an enterprise secret manager.",
        "Apply least-privilege SSH and sudo access.",
        "Pin Ansible Core and collection versions.",
        "Review changes through pull requests.",
        "Restrict production inventory and deployment permissions.",
        "Retain execution logs and audit records.",
        "Rotate credentials after suspected compromise.",
        "Rebuild compromised control nodes from trusted images.",
        "Test recovery using a non-production environment."
      ],
      config: `# Example .gitignore
.venv/
*.retry
*.log
vault-password.txt
*.pem
id_rsa
id_ed25519

# Example encrypted variables workflow
ansible-vault create group_vars/production/vault.yml
ansible-vault edit group_vars/production/vault.yml
ansible-vault view group_vars/production/vault.yml`,
      commands: `# Encrypt an existing sensitive file
ansible-vault encrypt secrets.yml

# Decrypt for controlled recovery
ansible-vault decrypt secrets.yml

# Change Vault password
ansible-vault rekey secrets.yml

# Check Ansible Vault file
ansible-vault view secrets.yml

# Inspect installed versions
ansible --version
ansible-galaxy collection list

# Run with a protected Vault password prompt
ansible-playbook site.yml --ask-vault-pass`,
      problems: [
        {
          issue: "Private SSH key is accidentally committed to Git.",
          rootCause: "Credential files were stored inside the repository without appropriate ignore rules or secret scanning.",
          solution: "Revoke or rotate the exposed key immediately, remove it from repository history where appropriate, inspect access logs, and move credentials to an approved secret store."
        },
        {
          issue: "Ansible installation becomes inconsistent after an upgrade.",
          rootCause: "Unpinned package and collection dependencies changed between runs.",
          solution: "Restore the tested dependency versions, recreate the isolated environment, reinstall pinned collections, and run validation before production use."
        },
        {
          issue: "Automation control node is compromised.",
          rootCause: "An attacker gained access to automation credentials or the host.",
          solution: "Isolate the host, revoke SSH keys and tokens, rotate secrets, investigate logs, rebuild from a trusted image, and validate managed-node integrity."
        }
      ]
    }
  ]
};

export default noteData;
