import type { NoteData } from "../types";

const noteData: NoteData = {
  title: "Ansible SSH Connectivity – Complete DevOps Engineer Technical Notes",
  description: "My detailed personal technical notebook covering Ansible SSH architecture, passwordless authentication, public and private keys, inventory connection variables, SSH configuration, privilege escalation, bastion hosts, proxy jump, connection plugins, production security, troubleshooting, root cause analysis, and senior DevOps engineering practices.",
  sections: [
    {
      heading: "1. My Technical Notes – Understanding SSH Connectivity in Ansible",
      explanation: `SSH means Secure Shell. It is a secure network protocol used to connect to remote Linux and Unix systems.

Ansible commonly uses SSH to communicate with Linux managed nodes.

An Ansible control node is the machine from which an engineer executes Ansible commands and playbooks.

Managed nodes are the remote machines that Ansible configures.

Example company environment:

- Ansible control node: 10.10.1.10
- Web server 1: 10.10.2.11
- Web server 2: 10.10.2.12
- Application server: 10.10.3.21
- Database server: 10.10.4.31

The control node connects to the managed nodes using SSH.

The normal connection process:

1. The engineer executes an Ansible playbook.
2. Ansible reads the inventory.
3. Ansible identifies the target hosts.
4. Ansible determines the connection user and SSH settings.
5. The SSH connection is established.
6. Authentication is performed.
7. Ansible executes the required module on the managed node.
8. The managed node returns the result.
9. Ansible displays the task result.

Ansible generally does not require an agent to be installed on ordinary Linux managed nodes.

Python is required on managed nodes for many Ansible modules. Some raw or network-oriented operations have different requirements.

SSH connectivity is one of the first things to verify when a playbook reports UNREACHABLE.

Important distinction:

SSH authentication answers whether the control node can log in.

Privilege escalation answers whether the connected user can obtain the permissions required for an operation.

A successful SSH login does not automatically mean that Ansible can install packages or modify root-owned files.

For example, an engineer may successfully log in as deploy but still need sudo privileges to install Nginx.

SSH connectivity should be tested independently before debugging application-level playbook failures.`,
      steps: [
        "Identify the Ansible control node.",
        "Identify the managed node addresses.",
        "Confirm network reachability.",
        "Confirm that the SSH service is running on managed nodes.",
        "Identify the remote SSH username.",
        "Configure password or key-based authentication.",
        "Test SSH manually.",
        "Test the Ansible ping module.",
        "Verify privilege escalation separately."
      ],
      commands: `# Check SSH client version
ssh -V

# Connect to a remote Linux server
ssh deploy@10.10.2.11

# Connect using a custom SSH port
ssh -p 2222 deploy@10.10.2.11

# Connect using a specific private key
ssh -i ~/.ssh/id_ed25519 deploy@10.10.2.11

# Test Ansible connectivity
ansible webservers -i inventory.ini -m ansible.builtin.ping

# Test connectivity with verbose diagnostics
ansible webservers -i inventory.ini -m ansible.builtin.ping -vvv

# Check SSH service on a Linux server
sudo systemctl status sshd

# Debian-based systems may use the ssh service name
sudo systemctl status ssh`,
      config: `# inventory.ini
[webservers]
web01 ansible_host=10.10.2.11
web02 ansible_host=10.10.2.12

[webservers:vars]
ansible_user=deploy
ansible_connection=ssh
ansible_port=22

# ansible_host is the address Ansible connects to.
# ansible_user is the remote SSH account.
# ansible_connection selects the connection plugin.
# ansible_port defines the SSH port.
# The ping module tests Ansible connectivity, not ICMP ping.`,
      problems: [
        {
          issue: "Ansible reports UNREACHABLE for a managed node.",
          rootCause: "The control node cannot establish the SSH connection because of network restrictions, an incorrect address, an unavailable SSH service, or authentication failure.",
          solution: "Test SSH manually, verify the host address and port, inspect firewall rules, and confirm the remote SSH account and authentication method."
        },
        {
          issue: "SSH login works but Ansible tasks fail.",
          rootCause: "The SSH connection is successful, but the managed node may lack Python or required module dependencies, or the task may require additional privileges.",
          solution: "Test with the Ansible ping module, inspect the Python interpreter, and verify become permissions independently."
        }
      ]
    },
    {
      heading: "2. SSH Architecture and Authentication Process",
      explanation: `SSH uses client-server architecture.

The SSH client runs on the Ansible control node.

The SSH server, commonly OpenSSH sshd, runs on the managed node.

The standard SSH service port is TCP 22, although administrators can configure a different port.

A simplified connection sequence:

1. The client opens a TCP connection to the SSH server.
2. The client and server negotiate protocol and cryptographic algorithms.
3. The server presents its host key.
4. The client verifies the server identity using its known_hosts information.
5. The user authentication process begins.
6. The server verifies the user's authentication method.
7. An authenticated session is established.
8. Ansible performs its remote operations.

SSH host keys and user authentication keys have different purposes.

Host key:
Identifies the SSH server to the client.

User public key:
Is stored on the remote account, normally in authorized_keys.

User private key:
Remains on the control node and proves possession of the corresponding public key.

The private key must be protected. Never copy a private key into a public repository or share it with unrelated users.

The known_hosts file helps the client remember server identities.

If a server's host key changes unexpectedly, SSH may report a host identification warning.

Do not automatically disable host key checking to bypass that warning.

First verify whether the server was rebuilt, its host key was legitimately rotated, or a possible interception event is occurring.

Production environments should use controlled host key management.`,
      steps: [
        "Understand the control node and managed node roles.",
        "Check the SSH server process.",
        "Understand host key verification.",
        "Understand public-key authentication.",
        "Protect the private key.",
        "Maintain trusted known_hosts entries.",
        "Verify authentication before executing playbooks.",
        "Use approved cryptographic algorithms."
      ],
      commands: `# Show SSH client version
ssh -V

# Display SSH connection diagnostics
ssh -vvv deploy@10.10.2.11

# Show the known host entry
ssh-keygen -F 10.10.2.11

# Display local SSH public key
cat ~/.ssh/id_ed25519.pub

# Display SSH host keys on the server
sudo ls -l /etc/ssh/ssh_host_*

# Check SSH daemon configuration syntax
sudo sshd -t

# Reload SSH daemon after approved configuration changes
sudo systemctl reload sshd`,
      config: `# Example SSH client configuration
Host web01
    HostName 10.10.2.11
    User deploy
    Port 22
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
    ServerAliveInterval 30

# Example server configuration settings
# /etc/ssh/sshd_config

Port 22
PubkeyAuthentication yes
PasswordAuthentication no
PermitRootLogin no

# Validate the server configuration before reloading.
# Actual supported directives depend on the installed OpenSSH version.
# Keep a recovery session available when changing SSH server settings.`,
      problems: [
        {
          issue: "SSH reports REMOTE HOST IDENTIFICATION HAS CHANGED.",
          rootCause: "The server host key differs from the key previously recorded by the client. This can happen after a legitimate rebuild or because of a security problem.",
          solution: "Verify the new host key through a trusted channel. Only after confirmation, update the relevant known_hosts entry."
        },
        {
          issue: "SSH authentication fails even though the public key exists.",
          rootCause: "The key may belong to another account, authorized_keys permissions may be incorrect, or the client may be offering a different private key.",
          solution: "Inspect the remote user's authorized_keys file, check ownership and permissions, and use ssh -vvv to identify the key being offered."
        }
      ]
    },
    {
      heading: "3. Passwordless SSH Authentication Using SSH Keys",
      explanation: `Passwordless SSH normally means public-key authentication rather than a connection with no authentication.

The engineer generates a key pair on the control node.

The key pair contains:

Private key:
Must remain protected on the control node.

Public key:
Can be installed on the managed node in the remote user's authorized_keys file.

Authentication process:

1. Generate a key pair.
2. Protect the private key.
3. Install the public key for the intended remote user.
4. Connect using the matching private key.
5. SSH verifies that the client possesses the corresponding private key.
6. The server accepts or rejects the authentication.

Modern OpenSSH installations commonly support Ed25519 keys.

Example:

ssh-keygen -t ed25519 -C "ansible-control"

The command creates a private key and a public key.

ssh-copy-id can install the public key on a remote account when the command is available and initial authentication is possible.

A private key can also be protected with a passphrase.

When a passphrase is used, ssh-agent can hold the unlocked key for an authenticated session.

Do not use an empty passphrase automatically in every production environment. Follow the company's security policy.

Key distribution should be limited to the exact users and servers that require access.

Avoid using one shared private key across unrelated teams and environments.

Use separate keys or managed credentials according to the organization's access model.

Key rotation and revocation are important parts of SSH lifecycle management.`,
      steps: [
        "Generate an SSH key pair on the control node.",
        "Choose an approved key type.",
        "Protect the private key with suitable permissions.",
        "Install the public key for the remote account.",
        "Test key-based authentication.",
        "Configure Ansible to use the intended private key.",
        "Verify that password authentication is not unexpectedly required.",
        "Document key ownership and rotation."
      ],
      commands: `# Generate an Ed25519 key pair
ssh-keygen -t ed25519 -C "ansible-control"

# Generate a key with an explicit file name
ssh-keygen -t ed25519 -f ~/.ssh/ansible_ed25519 -C "ansible-production"

# Copy public key to a remote account
ssh-copy-id -i ~/.ssh/ansible_ed25519.pub deploy@10.10.2.11

# Test authentication using the generated key
ssh -i ~/.ssh/ansible_ed25519 deploy@10.10.2.11

# Check private key permissions
chmod 600 ~/.ssh/ansible_ed25519

# Check SSH directory permissions
chmod 700 ~/.ssh

# Display public key
cat ~/.ssh/ansible_ed25519.pub

# List local SSH keys
ls -la ~/.ssh`,
      config: `# inventory.ini
[webservers]
web01 ansible_host=10.10.2.11
web02 ansible_host=10.10.2.12

[webservers:vars]
ansible_user=deploy
ansible_ssh_private_key_file=~/.ssh/ansible_ed25519
ansible_connection=ssh
ansible_port=22

# The private key path must exist on the control node.
# The public key must be authorized for the remote deploy account.
# Do not place the private key contents in the inventory.
# Use secure credential management for production environments.`,
      problems: [
        {
          issue: "Permission denied (publickey).",
          rootCause: "The server does not recognize the offered public key, the wrong private key is being used, or the remote account's authorized_keys configuration is incorrect.",
          solution: "Use ssh -vvv with the intended key, verify the public key on the server, and inspect remote account ownership and permissions."
        },
        {
          issue: "SSH asks for a password even though a key was installed.",
          rootCause: "The client is not offering the expected key, the server rejects it, or another authentication method is being attempted.",
          solution: "Specify the private key using -i, inspect verbose authentication output, and verify the server's public-key authentication settings."
        }
      ]
    },
    {
      heading: "4. Ansible Inventory SSH Connection Variables",
      explanation: `Ansible inventory defines which managed nodes are available and how to connect to them.

SSH-related variables can be configured at host or group level.

Important variables:

ansible_host:
The actual hostname or IP address to connect to.

ansible_user:
The remote SSH account.

ansible_port:
The SSH port. The usual default is 22.

ansible_connection:
The connection plugin. For normal SSH access, this is commonly ssh.

ansible_ssh_private_key_file:
The private key file used for SSH authentication.

ansible_ssh_common_args:
Additional SSH arguments.

ansible_ssh_extra_args:
Additional arguments passed to the SSH executable.

ansible_python_interpreter:
The Python interpreter used for remote modules.

ansible_become:
Whether privilege escalation is enabled.

ansible_become_method:
The privilege escalation method, commonly sudo.

ansible_become_user:
The account to become, commonly root.

Variables can be configured in inventory, group_vars, host_vars, playbooks, or other supported variable sources.

Ansible variable precedence matters when the same variable is defined in multiple locations.

For maintainability, define shared connection settings at group level and override only host-specific values.

Never place plaintext production passwords in an ordinary inventory file.

Use Ansible Vault or an approved secret manager for sensitive values.

Ansible inventory is not only a list of server names. It is also an important part of connection configuration and environment separation.`,
      steps: [
        "Create an inventory file.",
        "Define groups for web, application, and database servers.",
        "Set ansible_host for each host.",
        "Set the remote SSH user.",
        "Configure the correct SSH port.",
        "Configure the private key path.",
        "Test connectivity for each group.",
        "Inspect effective inventory variables."
      ],
      commands: `# List inventory hosts
ansible-inventory -i inventory.ini --list

# Show one host's inventory variables
ansible-inventory -i inventory.ini --host web01

# Test web server connectivity
ansible webservers -i inventory.ini -m ansible.builtin.ping

# Test application server connectivity
ansible appservers -i inventory.ini -m ansible.builtin.ping

# Test one host with detailed SSH diagnostics
ansible web01 -i inventory.ini -m ansible.builtin.ping -vvv

# Display inventory graph
ansible-inventory -i inventory.ini --graph`,
      config: `# inventory/production.ini
[webservers]
web01 ansible_host=10.10.2.11
web02 ansible_host=10.10.2.12

[appservers]
app01 ansible_host=10.10.3.21
app02 ansible_host=10.10.3.22

[dbservers]
db01 ansible_host=10.10.4.31

[linux_servers:children]
webservers
appservers
dbservers

[linux_servers:vars]
ansible_connection=ssh
ansible_user=deploy
ansible_port=22
ansible_ssh_private_key_file=~/.ssh/ansible_production

# Group-level variables are inherited by child groups.
# Host-specific values can override group values.
# Use separate inventory files for development, staging, and production.`,
      problems: [
        {
          issue: "Ansible connects to the wrong server.",
          rootCause: "The inventory hostname or ansible_host value is incorrect, or a variable override changes the effective address.",
          solution: "Inspect ansible-inventory --host output and verify the effective host variables and environment inventory."
        },
        {
          issue: "A private key path works manually but not through Ansible.",
          rootCause: "The path is interpreted differently, the file is inaccessible to the controller user, or inventory precedence selects another key.",
          solution: "Use an absolute path, inspect effective variables, and test with ansible -vvv."
        }
      ]
    },
    {
      heading: "5. SSH Client Configuration, known_hosts and SSH Agent",
      explanation: `OpenSSH supports a client configuration file that stores reusable connection settings.

The common user configuration file is:

~/.ssh/config

This file can define:
- Host aliases.
- HostName.
- User.
- Port.
- IdentityFile.
- ProxyJump.
- ServerAliveInterval.
- IdentitiesOnly.

An engineer can connect using a short alias instead of typing a full address and options.

Example:

ssh web01

The SSH client reads the matching configuration block.

The known_hosts file stores previously trusted server host keys.

The SSH agent manages unlocked private keys for the user's session.

ssh-agent starts an agent process.

ssh-add loads a private key into the agent.

This can reduce repeated passphrase prompts during a working session.

However, an agent does not eliminate the need to protect the private key.

For automation, Ansible can use a key file directly or use the available SSH agent depending on the connection configuration.

The SSH client configuration can also simplify access through a bastion host.

Keep permissions restrictive on SSH configuration and private key files.

The SSH client may reject a configuration file or key with unsafe permissions.

Do not confuse the control node's ~/.ssh/config with the remote server's /etc/ssh/sshd_config.

The first controls client behavior.

The second controls the SSH server.`,
      steps: [
        "Create or inspect ~/.ssh/config.",
        "Define reusable host aliases.",
        "Set the correct identity file.",
        "Check known_hosts entries.",
        "Start ssh-agent if required.",
        "Load the intended key using ssh-add.",
        "Test the SSH alias.",
        "Verify Ansible uses the expected connection settings."
      ],
      commands: `# View SSH client configuration
cat ~/.ssh/config

# Test a configured host alias
ssh web01

# Display SSH agent environment
ssh-add -l

# Start an SSH agent in a shell session
eval "$(ssh-agent -s)"

# Add a private key to the agent
ssh-add ~/.ssh/ansible_ed25519

# List loaded keys
ssh-add -l

# Remove all identities from the agent
ssh-add -D

# Inspect a known host
ssh-keygen -F web01

# Test the resolved SSH configuration
ssh -G web01`,
      config: `# ~/.ssh/config
Host web01
    HostName 10.10.2.11
    User deploy
    Port 22
    IdentityFile ~/.ssh/ansible_ed25519
    IdentitiesOnly yes

Host production-bastion
    HostName 10.10.1.5
    User jumpuser
    IdentityFile ~/.ssh/bastion_ed25519

Host private-app01
    HostName 10.10.3.21
    User deploy
    ProxyJump production-bastion
    IdentityFile ~/.ssh/ansible_production

# ~/.ssh/config is a client-side file.
# ProxyJump routes the connection through the bastion.
# The required keys must be available to the SSH client.
# Protect this file and all private keys appropriately.`,
      problems: [
        {
          issue: "SSH uses the wrong private key.",
          rootCause: "Multiple keys are loaded in ssh-agent or the client configuration offers identities that do not match the intended account.",
          solution: "Set IdentityFile and IdentitiesOnly yes, inspect ssh -vvv output, and remove unnecessary agent identities where appropriate."
        },
        {
          issue: "SSH agent reports that no identities are loaded.",
          rootCause: "The intended private key has not been added to the active agent or the agent environment is not available in the current shell.",
          solution: "Start the agent, add the key using ssh-add, and verify with ssh-add -l."
        }
      ]
    },
    {
      heading: "6. Privilege Escalation Using become and sudo",
      explanation: `SSH login and privilege escalation are two different operations.

Ansible first connects to the remote server using SSH.

After connection, it may need additional permissions to execute a task.

For example:
- Installing Nginx.
- Editing /etc/hosts.
- Creating system users.
- Managing system services.
- Changing firewall rules.
- Updating system configuration.

These operations commonly require root privileges.

Ansible uses become for privilege escalation.

Common variables:

ansible_become=true

ansible_become_method=sudo

ansible_become_user=root

A playbook can also configure:

become: true

A task can override the play-level behavior when necessary.

The SSH account does not need to be root.

A common production pattern is:
1. SSH login as deploy.
2. Use sudo for approved administrative operations.
3. Execute the required task as root.
4. Return to the original remote user context.

The remote account must have the required sudo permissions.

Some environments require a sudo password.

Ansible can obtain that password through a secure prompt or protected variable.

Do not put a plaintext sudo password in a public inventory file.

Use the appropriate privilege escalation policy.

become does not repair an SSH authentication failure. It operates after the SSH connection is established.`,
      steps: [
        "Create an approved remote deployment account.",
        "Install its SSH public key.",
        "Configure the required sudo permissions.",
        "Set become at play or task level.",
        "Test a simple privileged operation.",
        "Verify the effective user.",
        "Limit privilege escalation to required operations.",
        "Protect sudo credentials."
      ],
      commands: `# Test normal SSH login
ssh deploy@10.10.2.11

# Check remote user
whoami

# Check sudo permissions
sudo -l

# Test Ansible connectivity
ansible webservers -i inventory.ini -m ansible.builtin.ping

# Test privileged command
ansible webservers -i inventory.ini -b -m ansible.builtin.command -a "id"

# Ask for the become password
ansible-playbook -i inventory.ini site.yml --ask-become-pass

# Use verbose diagnostics
ansible-playbook -i inventory.ini site.yml -b -vvv`,
      config: `# inventory.ini
[webservers]
web01 ansible_host=10.10.2.11

[webservers:vars]
ansible_user=deploy
ansible_ssh_private_key_file=~/.ssh/ansible_production
ansible_become=true
ansible_become_method=sudo
ansible_become_user=root

# site.yml
---
- name: Configure web servers
  hosts: webservers
  become: true

  tasks:
    - name: Install Nginx
      ansible.builtin.package:
        name: nginx
        state: present

    - name: Display effective user
      ansible.builtin.command:
        cmd: id
      register: identity_result
      changed_when: false

    - name: Show identity
      ansible.builtin.debug:
        var: identity_result.stdout

# Use the deployment account for SSH.
# become escalates permissions for tasks.
# The remote user needs appropriate sudo rights.`,
      problems: [
        {
          issue: "SSH succeeds but package installation fails with permission denied.",
          rootCause: "The playbook connects successfully but does not enable privilege escalation or the remote user lacks sudo rights.",
          solution: "Enable become for the required task or play and verify that the deployment account has the approved sudo permissions."
        },
        {
          issue: "Ansible reports that a sudo password is required.",
          rootCause: "The remote account requires password authentication for sudo and Ansible was not supplied with the required credential.",
          solution: "Use --ask-become-pass or a secure secret-management mechanism according to the company's policy."
        }
      ]
    },
    {
      heading: "7. Bastion Hosts, Jump Servers and ProxyJump",
      explanation: `A bastion host is a controlled server used to access private infrastructure.

Companies often keep application and database servers in private networks without direct internet access.

The Ansible control node may not be able to connect directly to those private nodes.

A bastion or jump host provides an approved access path.

Example architecture:

Ansible control node:
10.10.1.10

Bastion:
10.10.1.5

Private application server:
10.10.3.21

Connection path:

Control node -> Bastion -> Private application server

OpenSSH supports ProxyJump.

A client can use:

ssh -J jumpuser@10.10.1.5 deploy@10.10.3.21

Ansible can use SSH arguments or an SSH client configuration that defines ProxyJump.

A common pattern is to configure ProxyJump in ~/.ssh/config and reference the private target in inventory.

The bastion must be able to reach the private target on the required SSH port.

The control node must be able to reach the bastion.

Security groups, network ACLs, firewalls, routing tables, and SSH authentication must all permit the connection.

A bastion is not simply another username or a different SSH port. It is an intermediate network hop.

Production bastions should have restricted access, monitoring, auditing, and appropriate key management.

Do not expose private application servers directly to the internet just to simplify Ansible connectivity.`,
      steps: [
        "Identify the private network architecture.",
        "Identify the approved bastion host.",
        "Verify control node to bastion connectivity.",
        "Verify bastion to private target connectivity.",
        "Configure ProxyJump.",
        "Configure inventory for the private host.",
        "Test SSH manually through the jump host.",
        "Run the Ansible ping module through the same path.",
        "Verify firewall and security group rules."
      ],
      commands: `# Connect through a jump host
ssh -J jumpuser@10.10.1.5 deploy@10.10.3.21

# Connect using an SSH config alias
ssh private-app01

# Test bastion reachability
ssh jumpuser@10.10.1.5

# Test private target through bastion
ssh -vvv -J jumpuser@10.10.1.5 deploy@10.10.3.21

# Test Ansible connectivity
ansible private_app -i inventory.ini -m ansible.builtin.ping -vvv

# Check the effective SSH configuration
ssh -G private-app01`,
      config: `# ~/.ssh/config
Host production-bastion
    HostName 10.10.1.5
    User jumpuser
    IdentityFile ~/.ssh/bastion_ed25519
    IdentitiesOnly yes

Host private-app01
    HostName 10.10.3.21
    User deploy
    ProxyJump production-bastion
    IdentityFile ~/.ssh/ansible_production
    IdentitiesOnly yes

# inventory.ini
[private_app]
app01 ansible_host=10.10.3.21 ansible_user=deploy

[private_app:vars]
ansible_connection=ssh
ansible_ssh_common_args='-o ProxyJump=jumpuser@10.10.1.5'

# This is an example network configuration.
# Confirm key availability and authentication on both hops.
# Avoid conflicting ProxyJump definitions in inventory and SSH config.`,
      problems: [
        {
          issue: "The control node reaches the bastion but cannot reach the private server.",
          rootCause: "The bastion may lack a route to the target, the private server firewall may reject SSH, or the target address may be incorrect.",
          solution: "Test the second network hop from the bastion, verify routing and security group rules, and confirm that the private server listens on the expected port."
        },
        {
          issue: "SSH works directly from the bastion but Ansible fails.",
          rootCause: "The Ansible connection arguments or SSH client configuration differ from the manually tested command.",
          solution: "Inspect Ansible's verbose SSH command, use a consistent ProxyJump configuration, and verify the effective inventory variables."
        }
      ]
    },
    {
      heading: "8. SSH Ports, Firewall, DNS and Network Connectivity",
      explanation: `SSH connectivity depends on several infrastructure components.

A successful SSH connection requires:
- Correct target address.
- Correct TCP port.
- Valid routing.
- Firewall permission.
- An active SSH server.
- Successful authentication.
- Trusted server identity.

The default SSH port is 22, but companies may use a custom port.

Ansible can configure the port through ansible_port.

DNS can also affect connectivity.

A hostname may resolve to an incorrect IP address or may not resolve at all.

Network troubleshooting should identify the exact failure stage.

Connection refused usually means the target was reachable but no service accepted the connection on that port, or a network device actively rejected it.

Connection timed out often indicates dropped packets, routing problems, security group restrictions, or an unreachable destination.

Name or service not known indicates a name resolution or hostname problem.

Permission denied indicates an authentication or authorization problem rather than a basic routing failure.

A firewall may exist on:
- The managed server.
- The cloud security group.
- The network firewall.
- The subnet network ACL.
- The bastion host.

Do not open SSH to every internet address to fix an automation issue.

Restrict SSH access to approved control nodes and bastions.

Use packet and socket diagnostics to identify the actual problem.`,
      steps: [
        "Resolve the target hostname.",
        "Check the target IP address.",
        "Check the configured SSH port.",
        "Test TCP reachability.",
        "Inspect server firewall rules.",
        "Inspect cloud security groups and network ACLs.",
        "Verify the SSH daemon is listening.",
        "Test SSH authentication after network access succeeds."
      ],
      commands: `# Resolve hostname
getent hosts web01

# Check DNS resolution
nslookup web01

# Test TCP port reachability
nc -vz 10.10.2.11 22

# Test a custom SSH port
nc -vz 10.10.2.11 2222

# Check SSH daemon listening sockets
sudo ss -tlnp | grep ssh

# Check firewall status with UFW
sudo ufw status verbose

# Check firewalld
sudo firewall-cmd --list-all

# Check route
ip route

# Test SSH with a custom port
ssh -p 2222 deploy@10.10.2.11

# Test Ansible with a custom port
ansible web01 -i inventory.ini -m ansible.builtin.ping -vvv`,
      config: `# inventory.ini
[webservers]
web01 ansible_host=10.10.2.11 ansible_port=2222
web02 ansible_host=10.10.2.12 ansible_port=2222

[webservers:vars]
ansible_user=deploy
ansible_connection=ssh
ansible_ssh_private_key_file=~/.ssh/ansible_production

# Example SSH daemon settings
# /etc/ssh/sshd_config

Port 2222
PubkeyAuthentication yes
PermitRootLogin no

# Before applying SSH server configuration:
# 1. Validate with sshd -t.
# 2. Confirm firewall permits the new port.
# 3. Keep an existing administrative session open.
# 4. Reload the SSH service.
# 5. Test a new connection before closing the old session.`,
      problems: [
        {
          issue: "SSH connection times out.",
          rootCause: "A firewall, security group, network ACL, routing problem, or unavailable network path is preventing the TCP connection.",
          solution: "Check routing and TCP reachability, inspect all relevant network controls, and allow the required source-to-destination SSH path."
        },
        {
          issue: "SSH connection is refused.",
          rootCause: "The target is reachable but SSH is not listening on the requested port, or a device actively rejects the connection.",
          solution: "Verify the SSH daemon status, listening port, service configuration, and firewall behavior."
        },
        {
          issue: "Ansible cannot resolve the target hostname.",
          rootCause: "DNS records or local name resolution configuration are missing or incorrect.",
          solution: "Check DNS resolution, inventory hostnames, search domains, and the configured ansible_host value."
        }
      ]
    },
    {
      heading: "9. SSH Server Security and Production Hardening",
      explanation: `SSH is a critical administrative access path. Production SSH access must be protected.

Important hardening practices:

1. Use public-key authentication where appropriate.
2. Disable root SSH login when the access model permits.
3. Restrict SSH access to approved networks.
4. Use strong key protection.
5. Rotate and revoke keys according to policy.
6. Monitor authentication attempts.
7. Keep OpenSSH patched.
8. Use controlled bastion access.
9. Maintain trusted host key verification.
10. Audit administrative sessions.

PasswordAuthentication can be disabled when public-key access is properly tested and operationally supported.

Do not disable password authentication before confirming that approved administrators can still access the server.

PermitRootLogin should follow the organization's security standard.

Use a dedicated automation account with only the required permissions.

Avoid giving every automation account unrestricted sudo rights when more limited access is possible.

The exact sudo policy depends on which modules and commands the automation needs.

Protect:
- Private keys.
- SSH agent access.
- authorized_keys.
- SSH client configuration.
- SSH server configuration.
- Vault passwords.
- CI/CD credentials.

Host key checking should remain enabled in production.

When a host key changes, verify the new fingerprint through an approved channel.

Use fail-safe SSH configuration changes.

A broken SSH configuration can lock administrators out of a remote machine.

Keep console or out-of-band recovery access available for important production systems.`,
      steps: [
        "Review the organization's SSH security baseline.",
        "Use dedicated automation identities.",
        "Restrict administrative network access.",
        "Configure approved authentication methods.",
        "Protect private keys and passphrases.",
        "Use trusted host key verification.",
        "Restrict sudo permissions.",
        "Monitor SSH authentication logs.",
        "Patch OpenSSH regularly.",
        "Test recovery access before major SSH changes."
      ],
      commands: `# Validate SSH daemon configuration
sudo sshd -t

# Check SSH daemon service
sudo systemctl status sshd

# Review recent SSH authentication logs
sudo journalctl -u sshd -n 100 --no-pager

# Debian/Ubuntu systems may log through ssh service
sudo journalctl -u ssh -n 100 --no-pager

# Check authorized key permissions
ls -ld ~/.ssh
ls -l ~/.ssh/authorized_keys

# Check private key permissions on control node
chmod 600 ~/.ssh/ansible_production

# Inspect SSH host keys
sudo ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub

# Review effective SSH client configuration
ssh -G web01`,
      config: `# Example hardened SSH server configuration
# /etc/ssh/sshd_config

Port 22
PubkeyAuthentication yes
PasswordAuthentication no
PermitRootLogin no
PermitEmptyPasswords no

# Additional controls should be evaluated against the installed OpenSSH version.
# AllowUsers deploy adminuser

# Validate before reload:
# sudo sshd -t

# Reload after approved validation:
# sudo systemctl reload sshd

# Keep an existing session open.
# Verify a new administrative connection before ending the old session.
# Do not copy this configuration blindly into every environment.`,
      problems: [
        {
          issue: "Administrators are locked out after an SSH configuration change.",
          rootCause: "The SSH daemon configuration or firewall was changed without validating a new connection or preserving recovery access.",
          solution: "Use cloud console or out-of-band access, inspect sshd configuration and firewall rules, restore a valid configuration, and test before ending recovery access."
        },
        {
          issue: "The SSH private key is exposed in a repository.",
          rootCause: "A secret key was committed or uploaded to an unauthorized location.",
          solution: "Treat the key as compromised, revoke its corresponding public-key authorization, generate a replacement, rotate dependent credentials, and review repository history and access."
        }
      ]
    },
    {
      heading: "10. Ansible Connection Plugins, Configuration and Advanced Options",
      explanation: `Ansible uses connection plugins to communicate with managed nodes.

For standard Linux administration, the SSH connection plugin is commonly used.

The connection can be configured using inventory variables or Ansible configuration.

Important settings include:
- ansible_connection.
- ansible_host.
- ansible_user.
- ansible_port.
- ansible_ssh_private_key_file.
- ansible_ssh_common_args.
- ansible_ssh_extra_args.
- ansible_python_interpreter.

The Ansible configuration file can define defaults for the project.

Common sections include:
[defaults]
[privilege_escalation]
[ssh_connection]

The exact supported settings depend on the installed Ansible version.

SSH connection multiplexing can improve performance by reusing connections.

OpenSSH ControlMaster and ControlPersist can reduce repeated connection setup overhead.

Ansible's SSH connection plugin supports SSH arguments and connection behavior.

Do not enable custom connection options without understanding how they affect security and reliability.

Pipelining can reduce some remote operations, but it must be compatible with the remote privilege escalation configuration and security policy.

Ansible may use different connection mechanisms for network devices, Windows systems, local execution, or other platforms.

Do not assume every managed node uses ordinary SSH.

For Linux servers, SSH is common.

For Windows hosts, WinRM or supported SSH-based configurations may be used depending on the environment.`,
      steps: [
        "Check the installed Ansible version.",
        "Inspect the active Ansible configuration.",
        "Review inventory connection variables.",
        "Confirm the connection plugin.",
        "Configure SSH arguments only when needed.",
        "Test connection reuse and performance.",
        "Verify that security controls remain enabled.",
        "Document project-specific connection settings."
      ],
      commands: `# Show Ansible version
ansible --version

# Display active configuration file and paths
ansible --version

# Show changed configuration values
ansible-config dump --only-changed

# List all configuration options
ansible-config list

# Inspect inventory connection variables
ansible-inventory -i inventory.ini --host web01

# Test SSH connection
ansible web01 -i inventory.ini -m ansible.builtin.ping -vvv

# Check SSH client configuration
ssh -G web01

# Run a playbook with connection diagnostics
ansible-playbook -i inventory.ini site.yml -vvvv`,
      config: `# ansible.cfg
[defaults]
inventory = ./inventory.ini
host_key_checking = True
timeout = 30
forks = 10
retry_files_enabled = False

[ssh_connection]
pipelining = True
ssh_args = -o ControlMaster=auto -o ControlPersist=60s

# Example inventory connection configuration
[linux_servers:vars]
ansible_connection=ssh
ansible_user=deploy
ansible_port=22

# These are example settings.
# Confirm compatibility with the installed Ansible version.
# Pipelining may require sudo configuration changes in some environments.
# Keep host key checking enabled for trusted production environments.`,
      problems: [
        {
          issue: "Ansible uses unexpected SSH arguments.",
          rootCause: "Connection settings are defined in multiple configuration locations or variable precedence selects another value.",
          solution: "Inspect ansible-config dump, ansible-inventory --host, and verbose SSH output to identify the effective settings."
        },
        {
          issue: "SSH connection multiplexing creates confusing connection behavior.",
          rootCause: "Existing control sockets or conflicting SSH options are being reused.",
          solution: "Inspect effective SSH arguments, use an appropriate control path configuration, and test with a clean connection when diagnosing the issue."
        }
      ]
    },
    {
      heading: "11. Real-Time Company Scenario – Secure Ansible Access to AWS Private Servers",
      explanation: `Imagine a company runs its application in a private AWS VPC.

Architecture:

Ansible control node:
A controlled automation server.

Bastion:
A hardened access gateway in a public subnet.

Private application servers:
EC2 instances in private subnets.

Database servers:
Private instances that should not accept direct internet SSH access.

The control node connects to the bastion.

The bastion provides the approved network route to private application servers.

The Ansible inventory contains private IP addresses.

The SSH client uses ProxyJump.

The automation account uses a dedicated key.

The playbook enables become only for tasks that require administrative privileges.

Security groups should permit:
- Control node to bastion on the approved SSH port.
- Bastion to private application servers on the approved SSH port.
- Only required application traffic between application and database layers.

The database servers should not receive broad public SSH access.

A secure deployment workflow:

1. CI/CD pipeline requests a deployment.
2. The automation controller selects the production inventory.
3. Ansible reads the SSH connection configuration.
4. The SSH client reaches the bastion.
5. The bastion forwards the connection to the private instance.
6. The remote deploy user authenticates.
7. Ansible executes the deployment tasks.
8. become provides required administrative privileges.
9. Application health is checked.
10. Deployment results are recorded.

Operational controls:
- Restrict key access.
- Rotate keys.
- Audit bastion access.
- Maintain host key verification.
- Use separate environments.
- Limit production permissions.
- Monitor connection failures.

The exact design may use a managed session service or another approved access mechanism instead of a traditional bastion.

Choose the access architecture based on the company's security and network standards.`,
      steps: [
        "Prepare the automation control node.",
        "Create a hardened bastion.",
        "Create private application instances.",
        "Configure routing and security groups.",
        "Generate approved SSH credentials.",
        "Configure ProxyJump.",
        "Create production inventory.",
        "Test private host connectivity.",
        "Run a controlled deployment.",
        "Verify application health and access logs."
      ],
      commands: `# Test bastion connection
ssh jumpuser@10.10.1.5

# Test private application through bastion
ssh -J jumpuser@10.10.1.5 deploy@10.10.3.21

# Test Ansible connectivity
ansible appservers -i inventory/production.ini -m ansible.builtin.ping -vvv

# Check inventory
ansible-inventory -i inventory/production.ini --graph

# Execute a canary deployment
ansible-playbook -i inventory/production.ini deploy.yml --limit app01

# Execute with privilege escalation
ansible-playbook -i inventory/production.ini deploy.yml --ask-become-pass

# Check application health
ansible appservers -i inventory/production.ini -m ansible.builtin.uri -a "url=http://localhost:8080/health status_code=200"

# Review service logs
ansible appservers -i inventory/production.ini -b -m ansible.builtin.command -a "journalctl -u payment-api -n 50 --no-pager"`,
      config: `# ~/.ssh/config
Host company-bastion
    HostName 10.10.1.5
    User jumpuser
    IdentityFile ~/.ssh/company_bastion
    IdentitiesOnly yes

Host production-app01
    HostName 10.10.3.21
    User deploy
    ProxyJump company-bastion
    IdentityFile ~/.ssh/company_production
    IdentitiesOnly yes

# inventory/production.ini
[appservers]
app01 ansible_host=10.10.3.21

[appservers${":"}vars]
ansible_user=deploy
ansible_connection=ssh
ansible_ssh_private_key_file=~/.ssh/company_production
ansible_become=true
ansible_become_method=sudo

# Example only. Use the company's approved key and network paths.
# The bastion must reach the private instance.
# The control node must reach the bastion.
# Keep private SSH keys outside the Git repository.`,
      problems: [
        {
          issue: "The production control node cannot access private EC2 instances.",
          rootCause: "The network path through the bastion is incomplete or the security group and route configuration does not permit the required SSH traffic.",
          solution: "Verify the control node-to-bastion and bastion-to-instance paths separately, then inspect routes, security groups, network ACLs, and host firewalls."
        },
        {
          issue: "A deployment works in staging but fails in production.",
          rootCause: "Production may use different SSH keys, inventory variables, bastion routes, host key records, or sudo policies.",
          solution: "Compare effective connection settings without exposing secrets, test production connectivity independently, and verify the production access policy."
        }
      ]
    },
    {
      heading: "12. Troubleshooting, RCA, Verification and Senior Interview Knowledge",
      explanation: `SSH troubleshooting should follow the connection path step by step.

Stage 1: Inventory
Check the host address, username, port, and private key path.

Stage 2: Network
Check DNS, routes, security groups, firewalls, and TCP reachability.

Stage 3: SSH server
Check that sshd is running and listening on the expected port.

Stage 4: Host identity
Check known_hosts and verify the server host key.

Stage 5: Authentication
Check public keys, private key selection, authorized_keys, and SSH server authentication settings.

Stage 6: Remote execution
Check Python, shell, permissions, and module dependencies.

Stage 7: Privilege escalation
Check sudo permissions and become configuration.

Useful error interpretation:

UNREACHABLE:
Ansible could not communicate with the host.

Connection timed out:
Network path or filtering problem is likely.

Connection refused:
The target is reachable but the requested service port is not accepting the connection.

Permission denied:
Authentication or authorization failed.

Host key verification failed:
The server identity is not trusted by the client.

Missing Python interpreter:
The SSH connection may work, but Python-based modules cannot execute normally.

Sudo password required:
SSH authentication worked, but privilege escalation needs a credential.

RCA process:

1. Capture the complete error.
2. Identify the target host.
3. Inspect effective inventory variables.
4. Resolve the hostname.
5. Test TCP connectivity.
6. Test SSH manually.
7. Inspect SSH verbose output.
8. Check remote SSH logs.
9. Test Ansible ping.
10. Test become independently.
11. Correct the root cause.
12. Retest one host.
13. Expand to the full group.

Interview questions:

Q: What is SSH?
A: Secure Shell is a protocol for secure remote access and command execution.

Q: What is the default SSH port?
A: TCP 22 by default.

Q: What is the difference between a public and private key?
A: The public key is installed on the remote account. The private key is protected on the client and proves possession of the matching key pair.

Q: What is authorized_keys?
A: A file that contains public keys authorized for a remote user.

Q: What is known_hosts?
A: A client-side file that stores trusted SSH server host keys.

Q: What is ansible_host?
A: The address Ansible uses to connect to a host.

Q: What is ansible_user?
A: The remote SSH username.

Q: What is ansible_port?
A: The SSH port for the target.

Q: What is become?
A: Ansible privilege escalation after the remote connection is established.

Q: What is a bastion host?
A: A controlled intermediate server used to access private network resources.

Q: What is ProxyJump?
A: An OpenSSH feature that routes a connection through a jump host.

Q: What is ssh-agent?
A: A process that manages unlocked private keys for an SSH client session.

Q: Why can ping module work without ICMP ping?
A: Ansible ping is an application-level connectivity test, not the operating system's ICMP ping command.

Q: What is the difference between SSH and sudo?
A: SSH establishes remote access. sudo changes the effective permissions after login.

Senior engineer approach:
Never disable security controls just to make a connection work.

Identify the failing layer, verify the access path, protect credentials, and test the exact connection configuration that Ansible uses.

A successful SSH login is only the beginning. The final validation must include Ansible module execution, privilege escalation where needed, and the actual application operation.`,
      steps: [
        "Inspect the target inventory.",
        "Inspect effective connection variables.",
        "Verify DNS and routing.",
        "Test the SSH port.",
        "Test SSH with verbose output.",
        "Verify host key trust.",
        "Check remote SSH authentication logs.",
        "Test the Ansible ping module.",
        "Verify Python and module execution.",
        "Test become and sudo permissions.",
        "Apply the permanent correction.",
        "Retest the affected host.",
        "Run against the full group after validation."
      ],
      commands: `# Ansible connectivity test
ansible all -i inventory.ini -m ansible.builtin.ping

# Detailed SSH diagnostics
ansible web01 -i inventory.ini -m ansible.builtin.ping -vvvv

# Test SSH manually
ssh -vvv deploy@10.10.2.11

# Inspect effective inventory
ansible-inventory -i inventory.ini --host web01

# Inspect inventory groups
ansible-inventory -i inventory.ini --graph

# Test network port
nc -vz 10.10.2.11 22

# Inspect SSH service
sudo systemctl status sshd

# Inspect SSH authentication logs
sudo journalctl -u sshd -n 100 --no-pager

# Test remote Python
ansible web01 -i inventory.ini -m ansible.builtin.command -a "python3 --version"

# Test privilege escalation
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "id"

# Inspect active Ansible configuration
ansible-config dump --only-changed

# Run a controlled playbook
ansible-playbook -i inventory.ini site.yml --limit web01 -vvv`,
      config: `# Recommended project structure
ansible-project/
  ansible.cfg
  inventory/
    development.ini
    staging.ini
    production.ini
  group_vars/
    all.yml
    webservers.yml
    appservers.yml
  host_vars/
  playbooks/
    connectivity-test.yml
    site.yml
    deploy.yml
  roles/
    common/
    nginx/
    application/
  requirements.yml
  README.md

# Recommended connectivity baseline
# ansible.cfg
[defaults]
inventory = ./inventory/production.ini
host_key_checking = True
timeout = 30
forks = 10
retry_files_enabled = False

# Production rules:
# - Keep SSH private keys outside source control.
# - Use dedicated automation accounts.
# - Use approved bastion or private access paths.
# - Maintain host key verification.
# - Restrict sudo permissions.
# - Rotate and revoke credentials.
# - Monitor SSH authentication and automation activity.
# - Test connectivity before application deployment.`,
      problems: [
        {
          issue: "Ansible reports UNREACHABLE although the server is online.",
          rootCause: "The server may be online but SSH access is blocked, the wrong username or key is selected, or the SSH daemon is not listening on the configured port.",
          solution: "Verify the complete connection path using TCP testing, manual SSH diagnostics, effective inventory variables, and server-side SSH logs."
        },
        {
          issue: "The connection succeeds but privileged tasks fail.",
          rootCause: "The SSH account lacks the required sudo permission or Ansible is not configured to use the correct become method.",
          solution: "Verify sudo policy and configure become at the appropriate play or task level."
        },
        {
          issue: "Production SSH access breaks after key rotation.",
          rootCause: "The replacement public key was not installed on every required target or the automation controller still references the previous private key.",
          solution: "Use a controlled key rotation procedure, distribute the replacement public key, update the protected controller credential, test access, and revoke the old key only after successful validation."
        }
      ]
    }
  ]
};

export default noteData;
