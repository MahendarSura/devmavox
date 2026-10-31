import type { NoteData } from "../types";

const noteData: NoteData = {
  title: "Ansible Production Operations – Complete DevOps Engineer Technical Notes",
  description: "My detailed personal study notes covering production Ansible architecture, enterprise automation standards, inventory design, multi-environment deployments, rolling updates, zero-downtime deployment, configuration management, security, secrets, monitoring, backups, disaster recovery, rollback, incident response, root cause analysis, CI/CD integration and senior DevOps engineering practices.",
  sections: [
    {
      heading: "1. My Technical Notes – Understanding Ansible in Production",
      explanation: `Ansible is widely used in production environments to automate infrastructure configuration, application deployment, server maintenance, and operational tasks.

In a real company, infrastructure may contain hundreds or thousands of servers.

Managing each server manually creates several problems:
- Configuration differences.
- Human errors.
- Repeated manual work.
- Slow deployments.
- Difficult auditing.
- Inconsistent security settings.
- Delayed incident recovery.

Ansible helps standardize these operations.

A production automation system may manage:

Linux servers:
Install packages, configure users, manage files, update services, and apply security settings.

Application servers:
Deploy application files, configure services, and perform health checks.

Web servers:
Configure Nginx or Apache, virtual hosts, certificates, and reverse proxies.

Cloud infrastructure:
Manage supported AWS, Azure, and other cloud resources through appropriate collections.

Containers and Kubernetes:
Automate supported cluster and workload operations.

Monitoring:
Configure agents, exporters, alerting integrations, and monitoring services.

Security:
Apply approved security baselines, permissions, and configuration policies.

Production automation must be predictable and controlled.

A successful playbook execution does not automatically mean the application is healthy.

Production engineers must verify:
- Infrastructure state.
- Configuration correctness.
- Application health.
- Network connectivity.
- Security settings.
- Logs and metrics.
- Rollback readiness.

A production Ansible design should be repeatable, idempotent, secure, observable, and maintainable.

The goal is not merely to automate commands. The goal is to create reliable operational processes that can be safely executed by the engineering team.`,
      steps: [
        "Understand the production infrastructure.",
        "Create a controlled inventory.",
        "Separate development, staging, and production.",
        "Define reusable roles and playbooks.",
        "Manage dependencies and secrets securely.",
        "Validate changes before deployment.",
        "Execute changes in controlled batches.",
        "Monitor application health.",
        "Maintain rollback and recovery procedures."
      ],
      commands: `# Check Ansible version
ansible --version

# Check inventory structure
ansible-inventory -i inventory/production.ini --graph

# Test production connectivity
ansible all -i inventory/production.ini -m ansible.builtin.ping

# Check playbook syntax
ansible-playbook -i inventory/production.ini site.yml --syntax-check

# Inspect effective Ansible configuration
ansible-config dump --only-changed

# Execute with controlled verbosity
ansible-playbook -i inventory/production.ini site.yml -v

# Execute only one host
ansible-playbook -i inventory/production.ini site.yml --limit web01`,
      config: `# Example production inventory
[webservers]
web01 ansible_host=10.10.1.11
web02 ansible_host=10.10.1.12

[appservers]
app01 ansible_host=10.10.2.11
app02 ansible_host=10.10.2.12

[databases]
db01 ansible_host=10.10.3.11

[production:children]
webservers
appservers
databases

# Production credentials should be supplied securely.
# Avoid storing passwords or private keys directly in inventory.`,
      problems: [
        {
          issue: "Production servers have different configurations even though the same application is deployed.",
          rootCause: "Manual changes, inconsistent playbook execution, uncontrolled variable differences, or configuration drift have created different server states.",
          solution: "Create a standard baseline role, execute controlled configuration playbooks, inspect differences, and monitor configuration drift."
        },
        {
          issue: "An automation run succeeds but users still cannot access the application.",
          rootCause: "The playbook may have completed file deployment without validating application health, network access, backend dependencies, or load balancer routing.",
          solution: "Add service validation, application health checks, network checks, and post-deployment verification before marking the release successful."
        }
      ]
    },
    {
      heading: "2. Production Architecture – Control Node, Managed Nodes and Automation Flow",
      explanation: `A production Ansible architecture separates the automation controller from managed infrastructure.

Control node:
The machine or execution environment where Ansible commands and playbooks run.

Managed nodes:
The Linux, Unix, network, or other supported systems being automated.

Inventory:
Defines the hosts and groups Ansible manages.

Playbooks:
Define the desired automation workflow.

Roles:
Organize reusable automation tasks, handlers, templates, and variables.

Collections:
Distribute reusable modules, plugins, and roles.

Ansible configuration:
Controls settings such as inventory, privilege escalation, connection behavior, and collection paths.

Credentials:
Provide authentication to managed systems and external services.

Execution environment:
A controlled environment containing Ansible and its required dependencies.

Typical Linux workflow:

1. An engineer commits an automation change.
2. CI/CD validates the repository.
3. The pipeline selects the correct execution environment.
4. Ansible loads inventory and variables.
5. Ansible connects to managed nodes.
6. Tasks execute according to the playbook.
7. Handlers perform required service actions.
8. Results are collected.
9. Health checks validate the final state.
10. Logs and execution results are retained.

For Linux SSH automation, Ansible commonly uses SSH.

For Windows, Ansible commonly uses WinRM or supported connection methods.

The controller should have controlled access to managed nodes.

Do not expose SSH or automation endpoints unnecessarily.

Use approved network routes, bastion hosts, or private connectivity where required.

Production automation should use dedicated identities and least-privilege access.

For large environments, use a managed automation platform or controlled execution infrastructure.

Avoid allowing every engineer to execute unrestricted production automation from an unmanaged laptop.`,
      steps: [
        "Prepare the automation controller.",
        "Install a supported Ansible environment.",
        "Configure managed-node connectivity.",
        "Create production inventories.",
        "Configure secure credentials.",
        "Install approved collections.",
        "Create version-controlled playbooks and roles.",
        "Execute through an approved operational workflow.",
        "Collect logs and verify execution results."
      ],
      commands: `# Check Ansible runtime
ansible --version

# Check configured inventory
ansible-inventory -i inventory/production.ini --list

# Test SSH-based Ansible connectivity
ansible all -i inventory/production.ini -m ansible.builtin.ping

# Run a command on managed nodes
ansible webservers -i inventory/production.ini -m ansible.builtin.command -a "hostname"

# Check privilege escalation
ansible webservers -i inventory/production.ini -b -m ansible.builtin.command -a "id"

# List installed collections
ansible-galaxy collection list

# Check configuration
ansible-config dump --only-changed`,
      config: `# ansible.cfg
[defaults]
inventory = ./inventory/production.ini
host_key_checking = True
retry_files_enabled = False
timeout = 30
forks = 10
interpreter_python = auto_silent

[privilege_escalation]
become = False
become_method = sudo
become_ask_pass = False

# Example project structure
production-automation/
  ansible.cfg
  requirements.yml
  inventory/
    development.ini
    staging.ini
    production.ini
  group_vars/
  host_vars/
  playbooks/
  roles/
  templates/
  tests/
  README.md

# Review configuration for the installed Ansible version.
# Keep privileged execution explicit and controlled.`,
      problems: [
        {
          issue: "The controller cannot connect to production managed nodes.",
          rootCause: "SSH routing, firewall rules, DNS, authentication, host key verification, or remote SSH configuration may be incorrect.",
          solution: "Verify network reachability, SSH authentication, approved host keys, routing, and the configured Ansible connection settings."
        },
        {
          issue: "Production playbooks behave differently on two controllers.",
          rootCause: "The controllers may use different Ansible versions, collections, Python dependencies, configuration files, or environment variables.",
          solution: "Standardize the execution environment, pin dependencies, compare ansible.cfg settings, and execute through a controlled automation runtime."
        }
      ]
    },
    {
      heading: "3. Multi-Environment Production Management",
      explanation: `Companies usually maintain separate environments.

Development:
Used by developers to test application and infrastructure changes.

Testing:
Used for integration and automated testing.

Staging:
Designed to resemble production as closely as practical.

Production:
Handles real users and business workloads.

The same Ansible roles and playbooks can be reused across these environments.

The environment-specific configuration is maintained separately.

For example:

Development:
- Smaller instance sizes.
- Test database.
- Development hostname.
- Debug logging.

Staging:
- Production-like configuration.
- Test data.
- Release validation.

Production:
- Approved resource sizes.
- Production database endpoints.
- Restricted credentials.
- Production monitoring.
- Controlled change approval.

Do not copy production secrets into development.

Use separate credentials and access policies.

Keep the automation logic consistent while supplying environment-specific values through inventory and variable files.

This avoids maintaining multiple unrelated playbook versions.

Ansible variable precedence can cause unexpected overrides.

Always understand where a variable is defined and which source wins.

Use explicit environment inventories and avoid accidentally executing a production deployment with development values.

For critical systems, require a deployment approval step before production execution.`,
      steps: [
        "Create separate environment inventories.",
        "Define environment-specific group variables.",
        "Use shared roles and playbooks.",
        "Maintain separate credentials.",
        "Validate changes in development.",
        "Run integration tests in staging.",
        "Obtain production approval.",
        "Execute against the production inventory.",
        "Verify final application health."
      ],
      commands: `# Development
ansible-playbook -i inventory/development.ini site.yml

# Testing
ansible-playbook -i inventory/testing.ini site.yml

# Staging
ansible-playbook -i inventory/staging.ini site.yml

# Production after approval
ansible-playbook -i inventory/production.ini site.yml

# Limit deployment to one host
ansible-playbook -i inventory/production.ini site.yml --limit web01

# Inspect production inventory
ansible-inventory -i inventory/production.ini --graph

# Check effective variables for a host
ansible-inventory -i inventory/production.ini --host web01`,
      config: `# group_vars/development.yml
environment: development
application_port: 8081
log_level: debug
replica_count: 1

# group_vars/staging.yml
environment: staging
application_port: 8080
log_level: info
replica_count: 2

# group_vars/production.yml
environment: production
application_port: 8080
log_level: warn
replica_count: 4

# Separate inventory files should define environment membership.
# Secrets must come from separate approved secret sources.
# These values are examples, not universal production settings.`,
      problems: [
        {
          issue: "A production deployment accidentally uses development configuration.",
          rootCause: "The wrong inventory was selected or environment variables were overridden by an unexpected variable source.",
          solution: "Use explicit inventory paths, validate the target environment before execution, and add assertions that prevent deployment with incorrect environment values."
        },
        {
          issue: "Staging passes but production deployment fails.",
          rootCause: "Production may have different network access, permissions, dependencies, resource limits, or secret configuration.",
          solution: "Compare environment differences, validate production dependencies, and use a controlled pre-deployment readiness checklist."
        }
      ]
    },
    {
      heading: "4. Rolling Deployments and Zero-Downtime Deployment",
      explanation: `A rolling deployment updates a group of servers in smaller batches rather than updating every server simultaneously.

This is important for production applications that must remain available during deployment.

Consider a web application running on four servers behind a load balancer.

A dangerous deployment would update all four servers at the same time.

If the deployment fails, the entire application may become unavailable.

A rolling deployment updates one server or a small group at a time.

Example workflow:

1. Select a small batch of servers.
2. Remove or drain them from traffic.
3. Deploy the application.
4. Validate application health.
5. Return healthy servers to traffic.
6. Continue with the next batch.

Ansible supports serial execution.

The serial keyword controls how many hosts are processed in each batch.

Example:

serial: 1

This processes one host at a time.

Example:

serial: "25%"

This processes a percentage of the play's hosts per batch.

The correct batch size depends on:
- Number of servers.
- Application capacity.
- Traffic levels.
- Deployment duration.
- Failure tolerance.
- Load balancer behavior.

A rolling deployment alone does not guarantee zero downtime.

The application architecture must support continued traffic while individual nodes are updated.

Health checks and load balancer integration are essential.

Use max_fail_percentage carefully to control when Ansible stops after failures.

Use any_errors_fatal where a failure should stop the play across the environment.

Do not automatically continue a deployment when an unhealthy node may affect production traffic.

For critical services, test deployment and rollback procedures in staging.`,
      steps: [
        "Identify healthy application servers.",
        "Confirm load balancer integration.",
        "Choose a safe deployment batch size.",
        "Drain the selected server from traffic.",
        "Deploy the application.",
        "Run service and application health checks.",
        "Return the healthy server to traffic.",
        "Continue with the next batch.",
        "Stop the deployment when a batch fails.",
        "Verify the entire application after rollout."
      ],
      commands: `# Execute a rolling deployment playbook
ansible-playbook -i inventory/production.ini rolling-deploy.yml

# Run against a selected host
ansible-playbook -i inventory/production.ini rolling-deploy.yml --limit web01

# Validate syntax
ansible-playbook -i inventory/production.ini rolling-deploy.yml --syntax-check

# Inspect web server status
ansible webservers -i inventory/production.ini -b -m ansible.builtin.service -a "name=nginx state=started"

# Check application health endpoint from a suitable monitoring host
curl -fsS https://app.example.com/health

# Inspect deployment output
ansible-playbook -i inventory/production.ini rolling-deploy.yml -v`,
      config: `# rolling-deploy.yml
---
- name: Rolling application deployment
  hosts: appservers
  become: true
  serial: 1
  max_fail_percentage: 0

  tasks:
    - name: Deploy application package
      ansible.builtin.copy:
        src: files/application.jar
        dest: /opt/application/application.jar
        owner: application
        group: application
        mode: '0644'
      notify: Restart application

    - name: Apply notified handlers before health validation
      ansible.builtin.meta: flush_handlers

    - name: Check application service
      ansible.builtin.service:
        name: application
        state: started

  handlers:
    - name: Restart application
      ansible.builtin.service:
        name: application
        state: restarted

# This is a simplified illustration.
# Integrate actual load balancer drain and enable operations.
# Add application-specific health checks before returning nodes to traffic.
# A production rollout must account for application compatibility and capacity.`,
      problems: [
        {
          issue: "The rolling deployment causes application downtime.",
          rootCause: "The deployment may remove too many servers from service, lack load balancer draining, or update incompatible application components.",
          solution: "Reduce batch size, implement traffic draining, verify remaining capacity, and perform application health checks before continuing."
        },
        {
          issue: "Ansible continues deploying after a server becomes unhealthy.",
          rootCause: "The playbook does not fail on the health check or does not use an appropriate failure policy.",
          solution: "Make health checks fail explicitly, configure an appropriate failure policy, and stop rollout when a batch does not pass validation."
        }
      ]
    },
    {
      heading: "5. Production Configuration Management and Drift Control",
      explanation: `Configuration drift occurs when servers gradually become different from the approved configuration.

Drift can happen because of:
- Manual SSH changes.
- Emergency fixes.
- Untracked package installation.
- Different configuration files.
- Uncontrolled automation runs.
- Operating system updates.
- Application-specific modifications.

Example:

The approved Nginx configuration specifies a timeout of 60 seconds.

An engineer manually changes one production server to 120 seconds.

The other servers still use 60 seconds.

The infrastructure is now inconsistent.

Ansible helps enforce the desired configuration.

A configuration management playbook describes the expected state.

Running the playbook can restore a server to the approved configuration.

This is called configuration convergence.

However, blindly overwriting a manual production change can be dangerous.

Emergency changes should be documented and incorporated into the approved configuration before the next automation run.

Production configuration management should include:
- Baseline roles.
- Approved variables.
- Version-controlled templates.
- File permissions.
- Package versions.
- Service states.
- Configuration validation.
- Drift reporting.

Use check mode and diff output to inspect potential changes before applying them.

Be careful when using --diff because configuration differences may expose sensitive values.

Use scheduled compliance checks where appropriate.

For important systems, maintain an approved configuration baseline and change history.`,
      steps: [
        "Define the approved infrastructure baseline.",
        "Store desired configuration in Git.",
        "Create reusable Ansible roles.",
        "Run configuration checks.",
        "Review drift differences.",
        "Approve corrective changes.",
        "Apply the desired state.",
        "Verify configuration convergence.",
        "Document exceptions and emergency changes."
      ],
      commands: `# Preview potential configuration changes
ansible-playbook -i inventory/production.ini baseline.yml --check

# Review configuration differences carefully
ansible-playbook -i inventory/production.ini baseline.yml --check --diff

# Apply approved baseline
ansible-playbook -i inventory/production.ini baseline.yml

# Check installed packages
ansible webservers -i inventory/production.ini -b -m ansible.builtin.package_facts

# Check service state
ansible webservers -i inventory/production.ini -b -m ansible.builtin.service_facts

# Check a configuration file
ansible webservers -i inventory/production.ini -m ansible.builtin.stat -a "path=/etc/nginx/nginx.conf"

# Inspect execution history in the approved automation platform.`,
      config: `# roles/linux_baseline/tasks/main.yml
---
- name: Ensure required packages are installed
  ansible.builtin.package:
    name:
      - curl
      - vim
      - chrony
    state: present

- name: Ensure time synchronization is running
  ansible.builtin.service:
    name: chronyd
    state: started
    enabled: true

- name: Deploy approved SSH configuration
  ansible.builtin.template:
    src: sshd_config.j2
    dest: /etc/ssh/sshd_config
    owner: root
    group: root
    mode: '0600'
    validate: 'sshd -t -f %s'
  notify: Restart SSH

# Validate platform-specific package and service names.
# Test SSH changes before applying them broadly.
# Maintain an approved recovery method for remote access.`,
      problems: [
        {
          issue: "A server repeatedly changes configuration after every automation run.",
          rootCause: "The desired state may conflict with another automation process, manual changes, unstable variables, or another configuration management tool.",
          solution: "Identify the competing configuration owner, standardize ownership, and ensure only the approved automation process manages the affected settings."
        },
        {
          issue: "Ansible overwrites an emergency production change.",
          rootCause: "The emergency modification was not incorporated into the version-controlled desired state.",
          solution: "Follow emergency change control, document the temporary change, update the approved baseline, and test the permanent configuration."
        }
      ]
    },
    {
      heading: "6. Production Security, Privilege Escalation and Secret Management",
      explanation: `Production automation has access to important infrastructure.

Ansible may manage:
- Root-owned system files.
- Application credentials.
- Database access.
- Cloud resources.
- Network configuration.
- Deployment keys.
- Service accounts.

A compromised automation controller can become a major security risk.

Production security must cover both the controller and managed nodes.

Important practices:

Least privilege:
Use dedicated identities with only the required permissions.

SSH security:
Use approved SSH keys, host key verification, and restricted network access.

Privilege escalation:
Use become only for tasks that require elevated privileges.

Secret management:
Use Ansible Vault or approved external secret managers.

Credential separation:
Use separate identities for development, staging, and production.

Auditability:
Record who executed production automation and which changes were applied.

Repository security:
Do not commit passwords, private keys, access tokens, or unencrypted secret files.

Execution security:
Restrict who can launch production jobs.

Log security:
Avoid printing credentials in task output.

Ansible Vault encrypts sensitive data.

Vault can protect variable files or individual encrypted values.

The password or secret used to unlock Vault must itself be stored securely.

Do not put the Vault password directly into a Git repository.

Use an approved credential system or secure password file with appropriate access controls.

Cloud automation should use least-privilege IAM roles or equivalent identity mechanisms wherever supported.

Security configuration changes should be tested carefully because incorrect SSH or firewall settings can lock administrators out of production servers.`,
      steps: [
        "Create dedicated automation identities.",
        "Restrict controller access.",
        "Use SSH host key verification.",
        "Use privilege escalation only when necessary.",
        "Encrypt sensitive variables.",
        "Use separate production credentials.",
        "Protect Vault password handling.",
        "Restrict production job execution.",
        "Audit automation activity.",
        "Review security configuration after deployment."
      ],
      commands: `# Create an encrypted Ansible Vault file
ansible-vault create group_vars/production/vault.yml

# Edit encrypted variables
ansible-vault edit group_vars/production/vault.yml

# View encrypted content securely
ansible-vault view group_vars/production/vault.yml

# Encrypt an existing file
ansible-vault encrypt secrets.yml

# Decrypt a file when explicitly required
ansible-vault decrypt secrets.yml

# Run a playbook using a Vault prompt
ansible-playbook -i inventory/production.ini site.yml --ask-vault-pass

# Run using a protected Vault password file
ansible-playbook -i inventory/production.ini site.yml --vault-password-file /secure/path/vault-pass

# Review SSH connectivity
ansible all -i inventory/production.ini -m ansible.builtin.ping`,
      config: `# group_vars/production/vault.yml
database_password: !vault |
  $ANSIBLE_VAULT;1.1;AES256
  ENCRYPTED_CONTENT_PLACEHOLDER

# Example secure task
- name: Configure protected application file
  ansible.builtin.template:
    src: application.env.j2
    dest: /opt/application/.env
    owner: application
    group: application
    mode: '0600'
  no_log: true

# ansible.cfg
[defaults]
host_key_checking = True

[privilege_escalation]
become = False
become_method = sudo

# Placeholder encrypted content is illustrative and is not a valid Vault secret.
# Generate actual encrypted values using ansible-vault.
# Do not commit real Vault passwords or plaintext credentials.`,
      problems: [
        {
          issue: "Ansible Vault reports that the password is incorrect.",
          rootCause: "The supplied password does not match the encryption password or the password source is incorrect.",
          solution: "Verify the approved Vault credential source, check the correct vault ID if multiple IDs are used, and use the authorized recovery procedure."
        },
        {
          issue: "Ansible task logs expose a sensitive application value.",
          rootCause: "The task may print a secret through debug output, returned data, verbose logging, or diff output.",
          solution: "Use no_log for sensitive tasks, remove secret debugging, restrict log access, and rotate any credential that may have been exposed."
        }
      ]
    },
    {
      heading: "7. Production Monitoring, Health Checks and Observability",
      explanation: `Production automation should include monitoring and verification.

A service can be installed successfully but still fail after deployment.

Monitoring helps identify:
- Service downtime.
- High CPU usage.
- Memory pressure.
- Disk exhaustion.
- Network errors.
- Application failures.
- Deployment regressions.
- Unhealthy backend nodes.

Common monitoring technologies include:
- Prometheus.
- Grafana.
- Node Exporter.
- Cloud monitoring services.
- Centralized logging platforms.

Ansible can automate installation and configuration of monitoring agents.

It can also configure service definitions and scrape targets.

Health checks should be part of deployment workflows.

A health check may verify:
- Service state.
- HTTP response.
- TCP port availability.
- Application readiness endpoint.
- Database connectivity.
- Process status.

For an HTTP service, a health endpoint can be checked using uri.

A successful HTTP response should be interpreted according to the application's health contract.

For example, HTTP 200 alone may not prove that all dependencies are healthy.

Use application-specific readiness endpoints.

After deployment, compare monitoring signals with the pre-deployment baseline.

A sudden increase in latency or error rates may indicate a regression.

Production automation should produce useful execution logs without exposing secrets.

Observability should connect automation changes with application behavior.`,
      steps: [
        "Identify critical application health indicators.",
        "Configure monitoring agents.",
        "Configure application readiness endpoints.",
        "Deploy monitoring configuration.",
        "Run post-deployment health checks.",
        "Inspect service logs.",
        "Review CPU, memory, and disk metrics.",
        "Compare metrics before and after deployment.",
        "Escalate failures through the incident process."
      ],
      commands: `# Check service status
ansible appservers -i inventory/production.ini -b -m ansible.builtin.service_facts

# Check HTTP application health
ansible appservers -i inventory/production.ini -m ansible.builtin.uri -a "url=http://127.0.0.1:8080/health status_code=200"

# Check disk usage
ansible all -i inventory/production.ini -m ansible.builtin.command -a "df -h"

# Check memory
ansible all -i inventory/production.ini -m ansible.builtin.command -a "free -h"

# Check CPU and load
ansible all -i inventory/production.ini -m ansible.builtin.command -a "uptime"

# Check listening ports
ansible appservers -i inventory/production.ini -m ansible.builtin.command -a "ss -lntp"

# Inspect application logs
ansible appservers -i inventory/production.ini -b -m ansible.builtin.command -a "journalctl -u application -n 100 --no-pager"`,
      config: `# Example application health-check tasks
- name: Check application service
  ansible.builtin.service:
    name: application
    state: started

- name: Wait for application HTTP readiness
  ansible.builtin.uri:
    url: http://127.0.0.1:8080/health
    method: GET
    status_code: 200
  register: application_health
  retries: 10
  delay: 5
  until: application_health.status == 200

- name: Report application readiness
  ansible.builtin.debug:
    msg: "Application health check passed"

# Use a real application readiness endpoint.
# Add authentication if the endpoint requires it.
# Avoid printing sensitive health-check response data.`,
      problems: [
        {
          issue: "Ansible reports the service as started but the health check fails.",
          rootCause: "The process may be running while the application is still initializing, listening on another port, or failing to connect to its dependencies.",
          solution: "Use a readiness endpoint, wait for application initialization, inspect logs, and verify the correct host and port."
        },
        {
          issue: "Monitoring shows high application errors after deployment.",
          rootCause: "The release may have introduced configuration errors, dependency failures, resource exhaustion, or incompatible application behavior.",
          solution: "Compare release timing with monitoring data, inspect logs, stop further rollout, and roll back when the release is confirmed as the cause."
        }
      ]
    },
    {
      heading: "8. Production Backup, Disaster Recovery and Rollback",
      explanation: `Production automation must include recovery planning.

A deployment can fail because of:
- Invalid application configuration.
- Corrupted deployment artifact.
- Database migration failure.
- Infrastructure failure.
- Network changes.
- Human error.
- Unexpected application behavior.

A backup is a recovery copy of important data or configuration.

A rollback restores a previously working application or configuration version.

Disaster recovery is the broader process of restoring services after a major failure.

Important backup targets may include:
- Application configuration.
- Database backups.
- Deployment artifacts.
- Infrastructure definitions.
- Certificates and protected key material.
- Important service configuration.
- Automation repositories.

Database backups should be handled using database-specific backup procedures.

Copying a live database directory is not automatically a consistent backup.

A production backup strategy should define:
- Backup frequency.
- Retention.
- Encryption.
- Access control.
- Offsite or separate failure-domain storage.
- Restore testing.
- Recovery time objective.
- Recovery point objective.

RTO:
The target time required to restore service.

RPO:
The acceptable amount of data loss measured in time.

Ansible can automate parts of backup and recovery workflows.

It should not replace tested database-native backup mechanisms.

For application rollback, use versioned artifacts.

Avoid relying only on copying a file from an arbitrary old directory.

A reliable rollback procedure should restore the previous known-good artifact, restore compatible configuration, restart or reload services, and validate application health.

Database schema rollback requires special planning because some migrations are not safely reversible.`,
      steps: [
        "Identify critical application and data assets.",
        "Define RTO and RPO targets.",
        "Select application-specific backup methods.",
        "Encrypt and protect backups.",
        "Store copies in separate failure domains.",
        "Test restoration regularly.",
        "Keep versioned deployment artifacts.",
        "Document rollback commands.",
        "Verify service recovery after restoration.",
        "Record the incident and recovery results."
      ],
      commands: `# Create a configuration backup directory
ansible webservers -i inventory/production.ini -b -m ansible.builtin.file -a "path=/var/backups/application state=directory owner=root group=root mode=0700"

# Back up a configuration file
ansible webservers -i inventory/production.ini -b -m ansible.builtin.copy -a "src=/etc/nginx/nginx.conf dest=/var/backups/application/nginx.conf.backup remote_src=true"

# Check available disk space
ansible all -i inventory/production.ini -m ansible.builtin.command -a "df -h"

# Inspect backup files
ansible webservers -i inventory/production.ini -b -m ansible.builtin.find -a "paths=/var/backups/application file_type=file"

# Restore a known-good configuration only through an approved recovery playbook.

# Validate restored Nginx configuration
ansible webservers -i inventory/production.ini -b -m ansible.builtin.command -a "nginx -t"

# Verify service status
ansible webservers -i inventory/production.ini -b -m ansible.builtin.service -a "name=nginx state=started"`,
      config: `# Example application artifact release layout
/opt/releases/
  payment-service-1.4.0.jar
  payment-service-1.5.0.jar
  payment-service-1.6.0.jar

/opt/application/
  current -> /opt/releases/payment-service-1.5.0.jar

# Example Ansible rollback task
- name: Restore previous application release
  ansible.builtin.file:
    src: /opt/releases/payment-service-1.5.0.jar
    dest: /opt/application/current
    state: link
    force: true
  notify: Restart application

# Keep actual release versions in deployment variables.
# Do not assume that a database migration can be reversed automatically.
# Test restore and rollback workflows before relying on them in production.`,
      problems: [
        {
          issue: "A backup exists but cannot be restored.",
          rootCause: "The backup may be corrupted, incomplete, encrypted with unavailable credentials, or incompatible with the target application version.",
          solution: "Perform regular restore tests, verify backup integrity, maintain recovery credentials securely, and document supported restore procedures."
        },
        {
          issue: "Application rollback succeeds but the application still fails.",
          rootCause: "The database schema, configuration, cache, or external dependencies may be incompatible with the previous application release.",
          solution: "Use compatible release artifacts and configuration, plan backward-compatible database migrations, and validate the full application dependency chain."
        }
      ]
    },
    {
      heading: "9. CI/CD Integration and Controlled Production Releases",
      explanation: `Ansible is commonly integrated with CI/CD systems.

Examples include:
- Jenkins.
- GitHub Actions.
- GitLab CI.
- Azure DevOps.
- Ansible Automation Platform.

The automation repository is stored in Git.

A developer submits a change through a pull request.

The pipeline can run:
- YAML validation.
- Ansible syntax checks.
- Ansible lint.
- Unit tests.
- Molecule tests.
- Security checks.
- Dependency checks.

After validation, the automation can be deployed to development.

Staging provides additional integration testing.

Production execution should require appropriate approval and credentials.

A pipeline should not expose production credentials to untrusted pull-request code.

Production jobs should use restricted identities and controlled execution environments.

Collection dependencies should be pinned in requirements.yml.

Python dependencies should be managed separately.

Execution environments help maintain consistent Ansible versions and collection dependencies.

The pipeline should retain:
- Git commit identifier.
- Playbook name.
- Target environment.
- Execution result.
- Approved change reference.
- Deployment version.
- Relevant logs.

A failed production deployment should stop further rollout.

For important applications, use staged releases and health checks.

Do not assume that a green pipeline guarantees application correctness. Monitor the service after deployment.`,
      steps: [
        "Store automation in Git.",
        "Create a reviewable change.",
        "Run YAML and syntax validation.",
        "Run lint and automated tests.",
        "Install pinned collections.",
        "Build or select a controlled execution environment.",
        "Deploy to development.",
        "Validate in staging.",
        "Obtain production approval.",
        "Deploy using controlled credentials.",
        "Run post-deployment health checks.",
        "Retain release and audit records."
      ],
      commands: `# Install Ansible dependencies
ansible-galaxy collection install -r requirements.yml

# Validate playbook syntax
ansible-playbook -i inventory/staging.ini site.yml --syntax-check

# Run lint if installed
ansible-lint .

# Run Molecule tests if configured
molecule test

# Preview production changes
ansible-playbook -i inventory/production.ini site.yml --check

# Execute approved production deployment
ansible-playbook -i inventory/production.ini site.yml

# Validate application health
curl -fsS https://app.example.com/health

# Inspect Git release history
git log --oneline -10`,
      config: `# Generic CI workflow illustration
steps:
  - name: Checkout automation
    run: git checkout main

  - name: Install Python requirements
    run: python -m pip install -r requirements.txt

  - name: Install Ansible collections
    run: ansible-galaxy collection install -r requirements.yml

  - name: Validate syntax
    run: ansible-playbook -i inventory/staging.ini site.yml --syntax-check

  - name: Run lint
    run: ansible-lint .

  - name: Deploy staging
    run: ansible-playbook -i inventory/staging.ini site.yml

  - name: Production deployment
    run: ansible-playbook -i inventory/production.ini site.yml

# This is a generic workflow illustration.
# Implement approval gates, environment protection, credential controls,
# and trusted-runner restrictions in the actual CI platform.`,
      problems: [
        {
          issue: "The CI pipeline succeeds but the production deployment fails.",
          rootCause: "The pipeline may use different credentials, inventory, network routes, dependencies, or permissions from the production execution environment.",
          solution: "Compare execution environments, validate production connectivity and credentials, and run a controlled pre-deployment readiness check."
        },
        {
          issue: "A pull request can access production credentials.",
          rootCause: "The CI platform may expose sensitive credentials to untrusted workflow execution.",
          solution: "Restrict production credentials to protected environments and trusted branches, require approval, and prevent untrusted pull requests from executing privileged jobs."
        }
      ]
    },
    {
      heading: "10. Production Incident Management and Root Cause Analysis",
      explanation: `Production incidents require a structured response.

An incident may include:
- Application downtime.
- Deployment failure.
- Database connectivity failure.
- Disk exhaustion.
- High CPU or memory usage.
- SSH connectivity failure.
- Configuration corruption.
- Security-related events.

Ansible can support incident response by executing controlled diagnostic tasks.

However, automation must not make an incident worse.

During a critical incident:

1. Confirm the impact.
2. Identify affected systems.
3. Stop unsafe deployments.
4. Preserve useful logs.
5. Check recent changes.
6. Verify infrastructure health.
7. Identify the immediate cause.
8. Restore service using the approved recovery procedure.
9. Confirm application health.
10. Conduct root cause analysis.

Root cause analysis should identify the underlying reason for the incident.

Example:

Incident:
Application returns HTTP 502.

Immediate symptom:
Nginx cannot successfully communicate with the application backend.

Possible causes:
- Application service stopped.
- Wrong backend port.
- Firewall blocking traffic.
- Backend process crashed.
- Application startup failed.

Do not assume the first error message is the complete root cause.

Collect evidence from:
- Ansible execution logs.
- Application logs.
- Nginx logs.
- System logs.
- Monitoring data.
- Recent deployment records.

After recovery, create permanent corrective actions.

Examples:
- Add a pre-deployment health check.
- Add backend port validation.
- Improve service restart handling.
- Add deployment rollback.
- Improve monitoring alerts.
- Fix variable validation.

An incident is not fully resolved until the service is healthy and follow-up actions are assigned.`,
      steps: [
        "Declare and classify the incident.",
        "Identify the affected hosts and services.",
        "Stop additional risky deployments.",
        "Collect Ansible and application logs.",
        "Inspect system health.",
        "Compare the last successful release.",
        "Identify the root cause.",
        "Apply the approved recovery action.",
        "Validate service recovery.",
        "Document corrective and preventive actions."
      ],
      commands: `# Check affected hosts
ansible affected_servers -i inventory/production.ini -m ansible.builtin.ping

# Check uptime
ansible affected_servers -i inventory/production.ini -m ansible.builtin.command -a "uptime"

# Check disk
ansible affected_servers -i inventory/production.ini -m ansible.builtin.command -a "df -h"

# Check memory
ansible affected_servers -i inventory/production.ini -m ansible.builtin.command -a "free -h"

# Check application service
ansible affected_servers -i inventory/production.ini -b -m ansible.builtin.command -a "systemctl status application"

# Inspect application logs
ansible affected_servers -i inventory/production.ini -b -m ansible.builtin.command -a "journalctl -u application -n 200 --no-pager"

# Inspect Nginx error logs
ansible affected_servers -i inventory/production.ini -b -m ansible.builtin.command -a "tail -n 200 /var/log/nginx/error.log"

# Run an approved recovery playbook after identifying the failure.`,
      config: `# Example incident diagnostic playbook
---
- name: Production application diagnostics
  hosts: affected_servers
  gather_facts: true

  tasks:
    - name: Check application service state
      ansible.builtin.command: systemctl is-active application
      register: application_state
      changed_when: false
      failed_when: false

    - name: Check disk usage
      ansible.builtin.command: df -h
      register: disk_state
      changed_when: false

    - name: Check system uptime
      ansible.builtin.command: uptime
      register: uptime_state
      changed_when: false

    - name: Display application state
      ansible.builtin.debug:
        var: application_state.stdout

    - name: Display disk state
      ansible.builtin.debug:
        var: disk_state.stdout

    - name: Display uptime
      ansible.builtin.debug:
        var: uptime_state.stdout

# Avoid collecting or displaying secret-bearing files.
# Restrict incident diagnostic output to authorized responders.`,
      problems: [
        {
          issue: "An incident diagnostic playbook cannot connect to affected hosts.",
          rootCause: "The incident may involve a network failure, SSH service outage, firewall change, or controller connectivity issue.",
          solution: "Use the approved alternate access path, inspect network and SSH health, and follow the infrastructure recovery procedure."
        },
        {
          issue: "A temporary recovery fixes the incident but the same failure returns.",
          rootCause: "The underlying configuration, resource, dependency, or deployment problem was not permanently corrected.",
          solution: "Complete root cause analysis, implement preventive automation and monitoring, and validate the permanent fix in staging."
        }
      ]
    },
    {
      heading: "11. Production Performance, Capacity and Operational Maintenance",
      explanation: `Production automation should also support routine maintenance.

Operational maintenance includes:
- Package updates.
- Security patching.
- Disk cleanup.
- Log rotation.
- Service restarts.
- Certificate renewal.
- Monitoring agent maintenance.
- Backup verification.
- Capacity checks.

Maintenance windows are important for systems that cannot tolerate unexpected service disruption.

Before maintenance:
- Check application health.
- Check server capacity.
- Confirm backups.
- Review active incidents.
- Confirm the rollback plan.
- Obtain approval where required.

During maintenance:
- Process servers in controlled batches.
- Avoid restarting every node simultaneously.
- Check application capacity.
- Validate after each batch.

After maintenance:
- Verify package versions.
- Check services.
- Check monitoring.
- Validate application response.
- Record the result.

Ansible forks control how many hosts Ansible can work on concurrently for applicable operations.

Serial controls play-level batch execution.

These settings solve different problems.

For production maintenance, select concurrency based on infrastructure capacity and service availability.

Do not increase forks blindly.

Too much parallel execution can overload controllers, networks, APIs, or managed systems.

A safe automation design should balance speed with reliability.`,
      steps: [
        "Review maintenance requirements.",
        "Check system and application health.",
        "Confirm backups and recovery readiness.",
        "Choose a safe execution batch size.",
        "Apply updates in controlled groups.",
        "Validate each updated host.",
        "Check service availability.",
        "Review monitoring and logs.",
        "Document maintenance results."
      ],
      commands: `# Check package updates on Debian-based systems
ansible all -i inventory/production.ini -b -m ansible.builtin.command -a "apt list --upgradable"

# Check disk usage
ansible all -i inventory/production.ini -m ansible.builtin.command -a "df -h"

# Check memory usage
ansible all -i inventory/production.ini -m ansible.builtin.command -a "free -h"

# Check uptime
ansible all -i inventory/production.ini -m ansible.builtin.command -a "uptime"

# Check service state
ansible webservers -i inventory/production.ini -b -m ansible.builtin.service -a "name=nginx state=started"

# Execute maintenance playbook with a controlled batch
ansible-playbook -i inventory/production.ini maintenance.yml

# Limit to one server
ansible-playbook -i inventory/production.ini maintenance.yml --limit web01`,
      config: `# maintenance.yml
---
- name: Controlled production maintenance
  hosts: webservers
  become: true
  serial: 1
  max_fail_percentage: 0

  tasks:
    - name: Check disk usage
      ansible.builtin.command: df -h
      changed_when: false

    - name: Ensure Nginx is running
      ansible.builtin.service:
        name: nginx
        state: started
        enabled: true

    - name: Check Nginx configuration
      ansible.builtin.command: nginx -t
      changed_when: false

# This is an illustrative maintenance playbook.
# Add approved patching, reboot coordination, and health checks.
# Never reboot all production nodes without a capacity and recovery plan.`,
      problems: [
        {
          issue: "Maintenance automation overloads production infrastructure.",
          rootCause: "Too many hosts are processed simultaneously or maintenance tasks create excessive CPU, memory, disk, or network activity.",
          solution: "Reduce concurrency, use serial batches, schedule maintenance windows, and monitor system capacity during execution."
        },
        {
          issue: "A server becomes unavailable after a package update.",
          rootCause: "The package update may introduce a service regression, kernel change, dependency conflict, or required reboot.",
          solution: "Stop further rollout, inspect package and service logs, restore or roll back using the approved procedure, and validate the package set in staging."
        }
      ]
    },
    {
      heading: "12. Senior DevOps Engineer Checklist, Interview Questions and Verification",
      explanation: `A senior DevOps engineer should understand how Ansible fits into the complete production operating model.

Production automation is not only about writing tasks.

It includes:
- Infrastructure architecture.
- Inventory design.
- Dependency management.
- Security controls.
- Change management.
- CI/CD.
- Observability.
- Reliability.
- Capacity management.
- Backup and recovery.
- Incident response.
- Auditability.

Important interview questions:

Q: What is Ansible used for in production?

A: It automates infrastructure configuration, application deployment, system maintenance, and operational tasks across managed systems.

Q: What is configuration drift?

A: Configuration drift occurs when actual infrastructure configuration differs from the approved desired state.

Q: What is a rolling deployment?

A: A deployment that updates hosts in controlled batches instead of updating all hosts simultaneously.

Q: Does serial guarantee zero downtime?

A: No. It controls execution batches. Zero downtime also requires suitable application architecture, load balancing, capacity, traffic draining, and health checks.

Q: How do you deploy safely to production?

A: Validate changes, test in lower environments, use approval gates, deploy in controlled batches, verify health, and maintain rollback readiness.

Q: How do you manage secrets?

A: Use Ansible Vault or an approved external secret manager, restrict access, and avoid exposing sensitive data in logs.

Q: What is configuration convergence?

A: Bringing managed systems toward the desired state defined by automation.

Q: How do you troubleshoot a failed deployment?

A: Inspect Ansible output, identify the failed task, inspect service and application logs, verify dependencies, and compare against the previous known-good release.

Q: What is RTO?

A: Recovery Time Objective is the target time for restoring a service after an outage.

Q: What is RPO?

A: Recovery Point Objective defines the acceptable data loss measured in time.

Q: Why are health checks important?

A: They verify actual application readiness instead of relying only on successful task execution.

Q: How do you prevent configuration drift?

A: Use version-controlled desired state, controlled automation runs, baseline checks, and change management.

Senior production checklist:

1. Approved automation repository.
2. Controlled Ansible execution environment.
3. Version-pinned dependencies.
4. Separate environment inventories.
5. Protected credentials.
6. Least-privilege identities.
7. SSH host key verification.
8. Tested roles and playbooks.
9. Controlled deployment batches.
10. Application health checks.
11. Monitoring and alerting.
12. Backup and restore testing.
13. Rollback procedures.
14. Incident response documentation.
15. Audit records.
16. Regular security review.
17. Capacity and maintenance planning.
18. Configuration drift detection.

The final objective is reliable production infrastructure.

A good production automation system should make deployments repeatable, reduce human error, protect infrastructure, and help engineers recover quickly when failures occur.`,
      steps: [
        "Review production architecture.",
        "Verify inventories and dependencies.",
        "Review security and credential controls.",
        "Validate playbooks and roles.",
        "Run lower-environment tests.",
        "Approve production changes.",
        "Execute controlled deployments.",
        "Verify application health.",
        "Review monitoring and logs.",
        "Confirm backup and rollback readiness.",
        "Document incidents and lessons learned."
      ],
      commands: `# Final production pre-check
ansible --version

# Validate production inventory
ansible-inventory -i inventory/production.ini --graph

# Check host connectivity
ansible all -i inventory/production.ini -m ansible.builtin.ping

# Validate playbook syntax
ansible-playbook -i inventory/production.ini site.yml --syntax-check

# Check proposed changes
ansible-playbook -i inventory/production.ini site.yml --check

# Execute approved deployment
ansible-playbook -i inventory/production.ini site.yml

# Verify application health
curl -fsS https://app.example.com/health

# Review deployment logs and monitoring.

# Verify rollback readiness using the approved recovery procedure.
# Never test destructive rollback operations against production without authorization.`,
      config: `# Recommended production repository
production-automation/
  ansible.cfg
  requirements.yml
  requirements.txt
  inventory/
    development.ini
    testing.ini
    staging.ini
    production.ini
  group_vars/
    all.yml
    webservers.yml
    appservers.yml
    production/
      vault.yml
  host_vars/
  playbooks/
    site.yml
    deploy.yml
    rolling-deploy.yml
    maintenance.yml
    diagnostics.yml
    rollback.yml
  roles/
    linux_baseline/
    nginx/
    application/
    monitoring/
    backup/
  templates/
  files/
  tests/
  README.md

# Production principles:
# Keep code version-controlled.
# Keep secrets encrypted or externally managed.
# Pin tested dependencies.
# Validate before deployment.
# Use controlled rollout batches.
# Verify actual application health.
# Keep backups and tested recovery procedures.
# Audit production changes.`,
      problems: [
        {
          issue: "Production automation is difficult to maintain as infrastructure grows.",
          rootCause: "Playbooks may contain duplicated tasks, inconsistent inventories, hardcoded values, missing ownership standards, and uncontrolled dependencies.",
          solution: "Create reusable roles, standardize inventories, manage dependencies, document operational workflows, and establish code review and release practices."
        },
        {
          issue: "A deployment causes a major incident and the team cannot recover quickly.",
          rootCause: "Rollback procedures, backups, monitoring, and incident ownership may not have been tested or documented.",
          solution: "Establish tested recovery procedures, define RTO and RPO, retain known-good artifacts, improve health monitoring, and conduct regular recovery exercises."
        }
      ]
    }
  ]
};

export default noteData;
