import type { NoteData } from "../types";

const noteData: NoteData = {
  title: "Ansible Playbooks – Complete DevOps Engineer Technical Notes",
  description: "My detailed study notebook for understanding Ansible Playbooks from the basics to production automation. Learn YAML structure, plays, tasks, modules, variables, handlers, conditions, loops, tags, error handling, deployment workflows, security, troubleshooting, and real company practices with practical examples.",
  sections: [
    {
      heading: "1. My Technical Notes – What Is an Ansible Playbook?",
      explanation: `An Ansible playbook is a YAML file that describes the work Ansible must perform on managed servers.

An ad-hoc command is useful for one quick operation. A playbook is useful when we need multiple operations in a defined order.

Example: Imagine a company has five application servers. Every time a new application version is released, engineers must install packages, create directories, copy configuration files, deploy application files, restart a service, and verify application health.

Executing each operation manually is slow and can produce mistakes. We can write all these operations in one playbook and execute the same workflow whenever required.

A playbook is written in YAML. YAML is a human-readable data format that uses indentation to represent relationships between data.

A playbook generally contains one or more plays.

A play describes:
- Which managed hosts should receive the tasks.
- Which variables are required.
- Whether privilege escalation is needed.
- Which tasks must execute.
- Which handlers may run.
- How errors and execution behavior should be controlled.

A task represents one operation. Each task normally calls an Ansible module.

For example, a task can install Nginx, create a directory, copy a file, create a user, or start a service.

Important terms:

Playbook: The complete YAML automation file.

Play: A group of tasks applied to a selected host pattern.

Task: One unit of work inside a play.

Module: The component that performs an operation.

Inventory: The list of managed hosts and groups.

Variable: A reusable value used by tasks.

Handler: A task that normally runs when notified by another task.

Facts: Information collected from managed nodes.

Role: A reusable structure for organizing automation.

Ansible normally executes tasks in the order in which they appear. By default, hosts in a play execute tasks in parallel according to Ansible's execution strategy and fork settings.

A playbook is not just a list of shell commands. It describes the desired operations using modules, variables, and execution logic.

One important concept is idempotence. If a playbook is executed repeatedly, it should ideally leave the system in the same desired state without making unnecessary changes.

For example, the package module with state: present ensures that a package is installed. If the package is already installed, Ansible normally reports that no change is needed.

This makes playbooks suitable for repeatable infrastructure configuration and application deployment.`,
      steps: [
        "Create a project directory for Ansible automation.",
        "Create an inventory file with the target servers.",
        "Create a YAML playbook file ending in .yml or .yaml.",
        "Define the target hosts using the hosts keyword.",
        "Add required variables and privilege escalation settings.",
        "Write tasks using suitable Ansible modules.",
        "Validate YAML syntax before execution.",
        "Preview the selected hosts and run the playbook.",
        "Verify the final application or server state."
      ],
      commands: `# Check Ansible installation
ansible --version

# Create a project directory
mkdir -p ansible-project
cd ansible-project

# Create a playbook file
touch site.yml

# Check the playbook syntax
ansible-playbook -i inventory.ini --syntax-check site.yml

# Display hosts selected by a playbook
ansible-playbook -i inventory.ini --list-hosts site.yml

# Execute the playbook
ansible-playbook -i inventory.ini site.yml

# Execute with detailed output
ansible-playbook -i inventory.ini site.yml -v

# Execute with high diagnostic detail
ansible-playbook -i inventory.ini site.yml -vvv`,
      config: `---
- name: My first Ansible playbook
  hosts: webservers
  become: true

  tasks:
    - name: Check server uptime
      ansible.builtin.command:
        cmd: uptime

    - name: Display a message
      ansible.builtin.debug:
        msg: "Ansible playbook executed successfully"

# --- begins a YAML document.
# name describes the play.
# hosts selects the inventory group.
# become enables privilege escalation.
# tasks contains the operations.
# Each task has a readable name and a module.
# The command module executes uptime on the managed host.
# The debug module displays a message.`,
      problems: [
        {
          issue: "The playbook file is not recognized.",
          rootCause: "The file path, filename, or command argument may be incorrect.",
          solution: "Check the current working directory, confirm the file exists, and pass the correct path to ansible-playbook."
        },
        {
          issue: "The playbook executes on an unexpected server group.",
          rootCause: "The hosts pattern does not select the intended inventory group.",
          solution: "Use ansible-inventory --graph and ansible-playbook --list-hosts to verify the selected hosts before execution."
        }
      ]
    },
    {
      heading: "2. YAML Fundamentals – Syntax and Indentation",
      explanation: `YAML is the language commonly used to write Ansible playbooks. YAML is designed to be readable, but indentation is very important.

Ansible playbooks normally use spaces for indentation. Do not use tab characters to indent YAML.

A colon separates a key from its value. A hyphen starts an item in a YAML list.

Example:

name: Install Nginx

Here, name is the key and Install Nginx is its value.

A list:

packages:
  - nginx
  - curl
  - git

A mapping:

application:
  name: payment-api
  port: 8080
  environment: production

A Boolean value can be written as true or false.

A list is an ordered collection of items. A mapping is a collection of key-value pairs.

In an Ansible playbook, tasks is a list. Each task is a mapping containing a task name and module configuration.

Prefer the module's structured YAML form:

ansible.builtin.copy:
  src: app.conf
  dest: /etc/myapp/app.conf

This is generally easier to read than placing every argument into one long string.

Use quotes when values contain special YAML characters, leading symbols, ambiguous values, or expressions that should be treated as strings.

YAML supports comments beginning with #. Comments are useful for documenting why a setting exists, but they should not replace clear task names.

Ansible also supports YAML block strings. The | symbol preserves line breaks, while > folds many lines into a paragraph. These are useful for configuration content and scripts.

The most common YAML problems are incorrect indentation, missing colons, incorrect list structure, and values interpreted with an unintended data type.`,
      steps: [
        "Use spaces instead of tabs.",
        "Keep indentation consistent at every nesting level.",
        "Use hyphens for list items.",
        "Use key-value pairs for task and module arguments.",
        "Quote values that may be interpreted unexpectedly.",
        "Use comments to explain non-obvious decisions.",
        "Run ansible-playbook --syntax-check before execution.",
        "Review the complete file when YAML reports an indentation error."
      ],
      commands: `# Validate YAML through Ansible
ansible-playbook -i inventory.ini --syntax-check site.yml

# Display the parsed inventory
ansible-inventory -i inventory.ini --list

# Validate a selected playbook before execution
ansible-playbook -i inventory.ini --syntax-check deploy.yml

# Display the playbook's selected hosts
ansible-playbook -i inventory.ini --list-hosts deploy.yml`,
      config: `---
- name: YAML example
  hosts: webservers
  become: true

  vars:
    app_name: payment-api
    app_port: 8080
    packages:
      - nginx
      - curl
      - git

  tasks:
    - name: Display application details
      ansible.builtin.debug:
        msg: "Application {{ app_name }} uses port {{ app_port }}"

    - name: Display package list
      ansible.builtin.debug:
        var: packages

    - name: Display multiline information
      ansible.builtin.debug:
        msg: |
          Application: {{ app_name }}
          Port: {{ app_port }}
          Environment: production

# vars defines a mapping of reusable values.
# packages is a YAML list.
# {{ variable }} is Ansible variable interpolation.
# The | indicator preserves multiline text.`,
      problems: [
        {
          issue: "Syntax error: mapping values are not allowed here.",
          rootCause: "A colon or indentation is incorrect, or a string containing a colon was not quoted.",
          solution: "Inspect the reported line and nearby indentation. Quote the value if it contains YAML-special characters and validate again."
        },
        {
          issue: "The playbook reports that a task has an unexpected structure.",
          rootCause: "The task list or module arguments may be indented at the wrong level.",
          solution: "Check that every task is an item under tasks and that the module arguments are nested under the module name."
        },
        {
          issue: "A variable is treated as a Boolean or number instead of text.",
          rootCause: "YAML interprets unquoted values according to YAML data types.",
          solution: "Quote values that must be strings, especially version identifiers, leading-zero values, and ambiguous words."
        }
      ]
    },
    {
      heading: "3. Playbook Architecture – Plays, Tasks, Modules and Execution Flow",
      explanation: `A playbook can contain multiple plays. Each play targets an inventory group or host pattern and defines its own execution behavior.

For example, a deployment may contain:
- One play for database servers.
- One play for application servers.
- One play for web servers.

Ansible normally processes plays in the order written in the playbook.

Inside a play, tasks normally run in sequence for each host. Ansible can process multiple hosts concurrently.

A module performs the actual work. Examples include package, service, copy, file, template, user, command, and uri.

The control node reads the playbook, resolves variables, selects hosts, connects to managed nodes, executes tasks, and collects results.

For a normal Linux connection, Ansible commonly uses SSH. Many modules require Python on the managed node. The raw module can help bootstrap a host where Python is not yet installed.

Facts may be collected automatically at the start of a play when fact gathering is enabled. Facts contain information such as operating system, IP addresses, memory, processor details, and network interfaces.

The gather_facts setting controls automatic fact collection.

A play can use become to perform tasks with elevated privileges.

Execution strategies affect how tasks are scheduled across hosts. The default linear strategy generally keeps hosts moving through the same task sequence. The free strategy allows hosts to proceed independently through their task sequence.

Use serial when you want to process hosts in batches. This is particularly useful for rolling deployments.

The order of tasks matters. For example, a service should not start before its required configuration file exists.

A well-designed playbook separates responsibilities, uses descriptive task names, and avoids unnecessary shell commands.`,
      steps: [
        "Identify the infrastructure groups required by the workflow.",
        "Create a separate play for each operational stage where it improves clarity.",
        "Define the correct host pattern for each play.",
        "Choose whether facts are needed.",
        "Select modules for each operation.",
        "Arrange tasks according to their dependencies.",
        "Choose a suitable execution strategy and batch size.",
        "Run the playbook in a test environment.",
        "Inspect task results and verify the application."
      ],
      commands: `# List the hosts selected by a playbook
ansible-playbook -i inventory.ini --list-hosts site.yml

# List tasks without executing them
ansible-playbook -i inventory.ini --list-tasks site.yml

# Execute only a particular host
ansible-playbook -i inventory.ini --limit web01 site.yml

# Execute with a specific number of forks
ansible-playbook -i inventory.ini -f 10 site.yml

# Run in check mode
ansible-playbook -i inventory.ini --check site.yml

# Show configuration changes where supported
ansible-playbook -i inventory.ini --check --diff site.yml`,
      config: `---
- name: Configure database servers
  hosts: dbservers
  become: true
  gather_facts: true

  tasks:
    - name: Check database server operating system
      ansible.builtin.debug:
        var: ansible_distribution

- name: Configure application servers
  hosts: appservers
  become: true
  gather_facts: true

  tasks:
    - name: Check application server uptime
      ansible.builtin.command:
        cmd: uptime

- name: Configure web servers
  hosts: webservers
  become: true
  gather_facts: false

  tasks:
    - name: Check web server connectivity
      ansible.builtin.ping:

# Plays are processed in their written order.
# Each play selects its own host group.
# gather_facts controls automatic fact collection.
# The ping module is an Ansible connectivity test.`,
      problems: [
        {
          issue: "A task executes before a required service or file is ready.",
          rootCause: "The playbook task order does not represent the real dependency order.",
          solution: "Rearrange tasks so prerequisites are configured first. Use handlers or explicit readiness checks when one operation depends on another."
        },
        {
          issue: "A deployment updates all hosts simultaneously.",
          rootCause: "The play does not define a staged execution approach.",
          solution: "Use serial batches and a canary strategy for production deployments. Monitor application health before moving to the next batch."
        }
      ]
    },
    {
      heading: "4. Variables and Facts – Making Playbooks Reusable",
      explanation: `Variables allow us to store values once and reuse them in multiple tasks.

Without variables, the same application name, port, package version, directory, or environment value may be repeated in many places.

Example:

app_name: payment-api

The value can be referenced using:

{{ app_name }}

Common variable sources include:
- Variables defined inside a play.
- Variables in group_vars.
- Variables in host_vars.
- Variables supplied through inventory.
- Variables passed through extra variables.
- Variables provided by roles and included task files.

Ansible also collects facts from managed hosts. Facts describe the actual server environment.

Examples:
ansible_distribution
ansible_distribution_version
ansible_hostname
ansible_default_ipv4.address
ansible_memtotal_mb

Facts are useful when one playbook must support different Linux distributions or different server configurations.

For example, a company may use Ubuntu in one environment and Red Hat Enterprise Linux in another. Facts can help determine which package manager or configuration path should be used.

Variable precedence is important. Ansible supports multiple places where the same variable can be defined. Higher-precedence sources can override lower-precedence sources.

Extra variables passed using -e have very high precedence. This is powerful but should be used carefully.

Do not store passwords or API tokens as ordinary plaintext variables in Git. Use Ansible Vault or an approved secret manager.

Avoid defining the same variable in many locations. Keep configuration understandable and document where environment-specific values are maintained.`,
      steps: [
        "Identify values that change between environments.",
        "Move reusable values into variables.",
        "Use group_vars for shared group configuration.",
        "Use host_vars only for genuine host-specific settings.",
        "Gather facts when operating-system or hardware information is required.",
        "Use extra variables carefully for controlled overrides.",
        "Store sensitive values securely.",
        "Verify the final variable value during testing without printing secrets."
      ],
      commands: `# Display all collected facts
ansible webservers -i inventory.ini -m ansible.builtin.setup

# Display distribution information
ansible webservers -i inventory.ini -m ansible.builtin.setup -a "filter=ansible_distribution*"

# Display memory information
ansible webservers -i inventory.ini -m ansible.builtin.setup -a "filter=ansible_memtotal_mb"

# Run with an extra variable
ansible-playbook -i inventory.ini deploy.yml -e "app_version=2.5.0"

# Pass multiple extra variables
ansible-playbook -i inventory.ini deploy.yml -e "app_name=payment-api app_port=8080"

# Display task and variable-related diagnostics
ansible-playbook -i inventory.ini deploy.yml -vvv`,
      config: `---
- name: Deploy using variables
  hosts: appservers
  become: true

  vars:
    app_name: payment-api
    app_port: 8080
    app_directory: /opt/payment-api

  tasks:
    - name: Create application directory
      ansible.builtin.file:
        path: "{{ app_directory }}"
        state: directory
        owner: deploy
        group: deploy
        mode: "0755"

    - name: Display application settings
      ansible.builtin.debug:
        msg: "Deploying {{ app_name }} on port {{ app_port }}"

# Example group_vars/appservers.yml
app_environment: production
app_user: deploy

# Example host_vars/app01.yml
app_port: 8081

# Keep environment-specific settings outside the main task logic.
# Use appropriate variable precedence and avoid unnecessary overrides.`,
      problems: [
        {
          issue: "Ansible reports that a variable is undefined.",
          rootCause: "The variable was not defined, the variable file was not loaded, or the name was misspelled.",
          solution: "Check the spelling, variable scope, group_vars and host_vars paths, and the inventory group membership."
        },
        {
          issue: "The wrong application version is deployed.",
          rootCause: "A variable with higher precedence overrides the expected value.",
          solution: "Review inventory variables, play variables, role defaults, extra variables, and command-line arguments. Establish one documented source of truth."
        },
        {
          issue: "A fact is unavailable in a task.",
          rootCause: "Fact gathering may be disabled or the expected fact may not exist on the target platform.",
          solution: "Enable gather_facts where required, inspect the setup module output, and handle platform-specific facts explicitly."
        }
      ]
    },
    {
      heading: "5. Tasks, Handlers, Conditions and Loops",
      explanation: `Tasks are the individual operations inside a play. Every task should have a meaningful name so engineers can understand execution output.

Handlers are special tasks that normally run only when another task notifies them. They are commonly used for service restarts or reloads after a configuration change.

For example, copying a new Nginx configuration file can notify a handler that reloads Nginx. If the file has not changed, the handler is not notified and no unnecessary reload is required.

A handler normally runs at the end of the play. The meta: flush_handlers operation can run notified handlers earlier when a workflow requires it.

Conditions allow a task to run only when a Boolean expression is true.

Use when for conditions. For example, a task can run only on Ubuntu or only when a variable has a particular value.

Loops allow one task definition to process multiple items. Use loop for packages, users, directories, or other repeated operations.

register stores a task result in a variable. The result can be used in a later task or condition.

changed_when and failed_when allow engineers to define how Ansible interprets command results. Use them carefully because incorrect conditions can hide real failures.

A common mistake is using shell loops when Ansible's loop feature can express the operation more clearly.`,
      steps: [
        "Give every task a descriptive name.",
        "Use a handler for actions triggered by configuration changes.",
        "Use when for platform-specific or state-specific execution.",
        "Use loop for repeated operations.",
        "Register results only when later tasks need them.",
        "Use changed_when and failed_when only when their logic is understood.",
        "Test both the change and no-change execution paths.",
        "Verify that handlers restart or reload only when needed."
      ],
      commands: `# Execute a playbook with selected tags
ansible-playbook -i inventory.ini site.yml --tags configure

# Skip selected tags
ansible-playbook -i inventory.ini site.yml --skip-tags monitoring

# Start execution at a named task
ansible-playbook -i inventory.ini site.yml --start-at-task "Install Nginx"

# List available task tags
ansible-playbook -i inventory.ini site.yml --list-tags

# List all tasks
ansible-playbook -i inventory.ini site.yml --list-tasks`,
      config: `---
- name: Configure web server
  hosts: webservers
  become: true

  vars:
    required_packages:
      - nginx
      - curl
      - git

  tasks:
    - name: Install required packages
      ansible.builtin.package:
        name: "{{ item }}"
        state: present
      loop: "{{ required_packages }}"
      tags:
        - packages

    - name: Install Nginx configuration
      ansible.builtin.copy:
        src: files/nginx.conf
        dest: /etc/nginx/nginx.conf
        owner: root
        group: root
        mode: "0644"
      notify: Reload Nginx
      tags:
        - configure

    - name: Check whether this is Ubuntu
      ansible.builtin.debug:
        msg: "Ubuntu server detected"
      when: ansible_distribution == "Ubuntu"

    - name: Check Nginx configuration
      ansible.builtin.command:
        cmd: nginx -t
      register: nginx_test
      changed_when: false

  handlers:
    - name: Reload Nginx
      ansible.builtin.service:
        name: nginx
        state: reloaded

# loop repeats the task for each package.
# item contains the current loop value.
# notify requests a handler run after a change.
# when controls whether a task executes.
# register stores the command result.
# changed_when: false prevents a read-only validation command from reporting a change.
# Tags allow selected task groups to be executed.`,
      problems: [
        {
          issue: "A handler does not run after a configuration task.",
          rootCause: "The task did not report a change, the notify name does not match the handler name, or the task failed.",
          solution: "Check the task result and ensure the notify value exactly matches the handler name. Confirm that the configuration file actually changed."
        },
        {
          issue: "A condition skips a task unexpectedly.",
          rootCause: "The condition evaluates to false because the variable or fact does not have the expected value.",
          solution: "Inspect the relevant fact or variable and correct the expression. Avoid changing a condition merely to force a task to execute."
        },
        {
          issue: "A command task always reports changed.",
          rootCause: "Command modules often cannot determine whether a command changed the system.",
          solution: "Prefer an idempotent module. For read-only commands, use changed_when: false. For state-changing commands, define accurate change detection."
        }
      ]
    },
    {
      heading: "6. Configuration Reference – Complete Nginx Playbook",
      explanation: `This example demonstrates how a playbook can install and configure a web server.

The workflow includes package installation, directory creation, configuration deployment, configuration validation, service activation, and HTTP verification.

The package module installs Nginx. The file module creates a directory with the required permissions. The copy module transfers a configuration file from the control node to the managed node.

A validation command checks the Nginx configuration before the service is reloaded.

A handler reloads Nginx only when the configuration file changes and the task notifies the handler.

The URI module checks the HTTP endpoint. This verifies more than package installation because it checks whether the service responds to an HTTP request.

This example is suitable for learning. In a production environment, use organization-approved configuration, TLS, firewall rules, monitoring, backups, and deployment approvals.

The source configuration file must exist on the control node at the path supplied to the copy module.`,
      steps: [
        "Create the project directory and inventory.",
        "Create the Nginx configuration file on the control node.",
        "Create the playbook file.",
        "Validate the YAML syntax.",
        "Run the playbook against a test server.",
        "Check the Nginx configuration validation output.",
        "Verify that the service is active.",
        "Check the HTTP response.",
        "Run the playbook again and confirm that unnecessary changes are not reported."
      ],
      commands: `# Check playbook syntax
ansible-playbook -i inventory.ini nginx.yml --syntax-check

# Preview target hosts
ansible-playbook -i inventory.ini nginx.yml --list-hosts

# Preview the tasks
ansible-playbook -i inventory.ini nginx.yml --list-tasks

# Test the playbook in check mode
ansible-playbook -i inventory.ini nginx.yml --check --diff

# Execute the playbook
ansible-playbook -i inventory.ini nginx.yml

# Execute against one test server
ansible-playbook -i inventory.ini nginx.yml --limit web01

# Verify Nginx from the managed node
ansible webservers -i inventory.ini -b -m ansible.builtin.command -a "systemctl is-active nginx"

# Verify the HTTP endpoint
ansible webservers -i inventory.ini -m ansible.builtin.uri -a "url=http://localhost/ status_code=200"`,
      config: `---
- name: Install and configure Nginx
  hosts: webservers
  become: true
  gather_facts: true

  vars:
    nginx_package: nginx
    nginx_config_path: /etc/nginx/nginx.conf

  tasks:
    - name: Install Nginx
      ansible.builtin.package:
        name: "{{ nginx_package }}"
        state: present

    - name: Create application web directory
      ansible.builtin.file:
        path: /var/www/html
        state: directory
        owner: root
        group: root
        mode: "0755"

    - name: Deploy Nginx configuration
      ansible.builtin.copy:
        src: files/nginx.conf
        dest: "{{ nginx_config_path }}"
        owner: root
        group: root
        mode: "0644"
        backup: true
      notify: Reload Nginx

    - name: Validate Nginx configuration
      ansible.builtin.command:
        cmd: nginx -t
      changed_when: false

    - name: Ensure Nginx is enabled and running
      ansible.builtin.service:
        name: nginx
        state: started
        enabled: true

    - name: Verify local HTTP response
      ansible.builtin.uri:
        url: http://localhost/
        status_code: 200
      register: nginx_http_check
      retries: 5
      delay: 3
      until: nginx_http_check.status == 200

  handlers:
    - name: Reload Nginx
      ansible.builtin.service:
        name: nginx
        state: reloaded

# become enables elevated privileges for system configuration.
# package ensures the package is installed.
# file manages the web directory.
# copy deploys a configuration file and creates a backup.
# notify triggers the reload handler when the copy task changes.
# nginx -t validates the configuration.
# service ensures the service is running and enabled.
# uri checks the HTTP response.
# retries, delay, and until repeat the HTTP check until it succeeds or retries are exhausted.`,
      problems: [
        {
          issue: "Nginx configuration validation fails.",
          rootCause: "The configuration file may contain invalid directives, missing semicolons, incorrect paths, or references to missing files.",
          solution: "Inspect nginx -t output, correct the configuration, validate again, and reload only after successful validation."
        },
        {
          issue: "The playbook reports an HTTP connection error.",
          rootCause: "Nginx may not be listening, the configuration may be invalid, or the application port may not be available.",
          solution: "Check systemctl status nginx, nginx -t, ss -lntp, and journalctl -u nginx. Correct the actual service or network problem."
        }
      ]
    },
    {
      heading: "7. End-to-End Company Workflow – Application Deployment",
      explanation: `Consider a company deploying a Java application called payment-api to multiple Linux application servers.

The deployment process may involve:
1. Confirming the target environment.
2. Checking application server connectivity.
3. Creating the application directory.
4. Ensuring the deployment account exists.
5. Copying the application artifact.
6. Installing or verifying the required runtime.
7. Deploying application configuration.
8. Starting or restarting the service.
9. Waiting for the application port.
10. Checking the health endpoint.

The playbook should not blindly restart every service without checking whether a deployment is required.

Use versioned artifacts. A deployment should identify the exact application version being installed.

For production, use a canary or rolling deployment approach. Ansible's serial setting can control how many hosts are processed in each batch.

Before deployment, keep the previous artifact or another tested rollback mechanism available.

The playbook should fail when a required validation fails. Continuing after a failed configuration test can leave the application in an unpredictable state.

A real deployment pipeline may run automated tests, build an artifact, publish it to an artifact repository, approve a release, and then call Ansible to deploy the approved version.

Ansible should not be responsible for every stage of the software lifecycle. It can be one part of a larger CI/CD process.`,
      steps: [
        "Build and test the application in the CI pipeline.",
        "Publish a versioned artifact to an approved repository.",
        "Select the staging or production inventory.",
        "Validate the target host list.",
        "Check application server connectivity and runtime requirements.",
        "Create or verify the deployment directory.",
        "Deploy the approved artifact and configuration.",
        "Validate the service configuration before restart.",
        "Restart or reload the application service.",
        "Wait for the application port and health endpoint.",
        "Monitor application health during the rollout.",
        "Stop the rollout and follow the rollback plan if validation fails."
      ],
      commands: `# Validate deployment playbook
ansible-playbook -i production.ini deploy.yml --syntax-check

# Preview the target hosts
ansible-playbook -i production.ini deploy.yml --list-hosts

# Deploy a specific application version
ansible-playbook -i production.ini deploy.yml -e "app_version=2.5.0"

# Deploy to one canary host
ansible-playbook -i production.ini deploy.yml --limit app01 -e "app_version=2.5.0"

# Run the complete rolling deployment
ansible-playbook -i production.ini deploy.yml -e "app_version=2.5.0"

# Check the application service
ansible appservers -i production.ini -b -m ansible.builtin.command -a "systemctl is-active payment-api"

# Check application port
ansible appservers -i production.ini -m ansible.builtin.wait_for -a "port=8080 state=started timeout=60"

# Verify the health endpoint
ansible appservers -i production.ini -m ansible.builtin.uri -a "url=http://localhost:8080/health status_code=200"`,
      config: `---
- name: Deploy payment API
  hosts: appservers
  become: true
  serial: 1

  vars:
    app_name: payment-api
    app_version: "2.5.0"
    app_directory: /opt/payment-api
    app_user: deploy
    app_port: 8080

  tasks:
    - name: Create application directory
      ansible.builtin.file:
        path: "{{ app_directory }}"
        state: directory
        owner: "{{ app_user }}"
        group: "{{ app_user }}"
        mode: "0750"

    - name: Copy application artifact
      ansible.builtin.copy:
        src: "artifacts/{{ app_name }}-{{ app_version }}.jar"
        dest: "{{ app_directory }}/{{ app_name }}.jar"
        owner: "{{ app_user }}"
        group: "{{ app_user }}"
        mode: "0640"
        backup: true
      notify: Restart payment API

    - name: Ensure application service is running
      ansible.builtin.service:
        name: payment-api
        state: started
        enabled: true

    - name: Wait for application port
      ansible.builtin.wait_for:
        port: "{{ app_port }}"
        state: started
        timeout: 60

    - name: Verify application health
      ansible.builtin.uri:
        url: "http://localhost:{{ app_port }}/health"
        status_code: 200
      register: health_result
      retries: 10
      delay: 5
      until: health_result.status == 200

  handlers:
    - name: Restart payment API
      ansible.builtin.service:
        name: payment-api
        state: restarted

# serial: 1 processes one host at a time.
# app_version identifies the artifact version.
# copy deploys the versioned JAR.
# backup creates a backup of an existing destination file.
# notify triggers the service restart when the artifact changes.
# wait_for checks whether the application port becomes available.
# uri checks the application health endpoint.
# Adapt service management to the actual application runtime and deployment design.`,
      problems: [
        {
          issue: "The deployment succeeds on the first server but fails on the next server.",
          rootCause: "The second server may have a different runtime, permission, configuration, or disk-space condition.",
          solution: "Stop the rollout, inspect the failed host, compare its facts and logs with the canary, correct the difference, and resume only after validation."
        },
        {
          issue: "The application artifact is missing.",
          rootCause: "The CI pipeline did not publish the expected version or the source path is incorrect.",
          solution: "Verify the artifact repository, build version, download process, and control-node source path before running the deployment."
        },
        {
          issue: "The service restarts but never becomes healthy.",
          rootCause: "The application may have a startup failure, missing dependency, invalid configuration, or port conflict.",
          solution: "Inspect application logs and service status, validate configuration and dependencies, check port usage, and follow the rollback plan if the new version is unhealthy."
        }
      ]
    },
    {
      heading: "8. Production Control – Tags, Check Mode, Serial and Error Handling",
      explanation: `Production playbooks must control which operations run and how failures affect the deployment.

Tags allow engineers to select a group of tasks. For example, configure, deploy, verify, and monitoring can be separate tags.

Check mode requests a dry-run style execution for modules that support it. It is not a guarantee that every real operation can be predicted.

Diff mode displays changes for supported modules. Review its output carefully because configuration files can contain sensitive values.

Serial controls how many hosts are processed in each batch. It is useful for rolling deployments.

Any_errors_fatal can stop a play across hosts when a task fails. max_fail_percentage controls how many failures are tolerated before the play is stopped.

Block, rescue, and always provide structured error handling. A block contains normal tasks, rescue contains recovery or alternate tasks, and always contains tasks that should run regardless of success or failure.

Ignore_errors should not be used to hide important failures. If a task fails, the playbook should either stop or follow an intentional recovery path.

A failed deployment should have a defined rollback plan. A rollback should restore a known good application version or configuration, not simply repeat the failed operation.

For production, always test error handling. A playbook that works only on the success path is incomplete.`,
      steps: [
        "Separate operational stages using tags.",
        "Use check mode and diff mode during review where supported.",
        "Use serial for controlled deployment batches.",
        "Define which failures must stop the rollout.",
        "Use block, rescue, and always for intentional recovery.",
        "Avoid ignoring failures without a clear reason.",
        "Test failure scenarios in staging.",
        "Document rollback procedures and verify recovery."
      ],
      commands: `# Execute only deployment tasks
ansible-playbook -i inventory.ini site.yml --tags deploy

# Execute configuration and verification tasks
ansible-playbook -i inventory.ini site.yml --tags configure,verify

# Skip monitoring tasks
ansible-playbook -i inventory.ini site.yml --skip-tags monitoring

# Preview changes
ansible-playbook -i inventory.ini site.yml --check --diff

# Run from a named task
ansible-playbook -i inventory.ini site.yml --start-at-task "Deploy application"

# Execute against one host
ansible-playbook -i inventory.ini site.yml --limit app01

# Show available tags
ansible-playbook -i inventory.ini site.yml --list-tags

# Show available tasks
ansible-playbook -i inventory.ini site.yml --list-tasks`,
      config: `---
- name: Controlled production deployment
  hosts: appservers
  become: true
  serial: 2
  max_fail_percentage: 0

  tasks:
    - name: Deploy application configuration
      ansible.builtin.copy:
        src: files/app.conf
        dest: /etc/payment-api/app.conf
        mode: "0640"
      tags:
        - configure

    - name: Validate application configuration
      ansible.builtin.command:
        cmd: /usr/local/bin/payment-api --check-config
      changed_when: false
      tags:
        - verify

    - name: Check application health
      ansible.builtin.uri:
        url: http://localhost:8080/health
        status_code: 200
      tags:
        - verify

# serial: 2 processes two hosts in each batch.
# max_fail_percentage: 0 stops the rollout when a failure is detected.
# tags select logical groups of tasks.
# The validation command is marked unchanged because it checks state.
# Adapt failure thresholds to the organization's deployment policy.`,
      problems: [
        {
          issue: "A tagged playbook unexpectedly skips a required task.",
          rootCause: "The task does not have the expected tag or a dependent task was excluded.",
          solution: "Review --list-tags and --list-tasks, verify task dependencies, and execute the required tag combination."
        },
        {
          issue: "The playbook continues after a critical failure.",
          rootCause: "The failure may have been ignored or the task may have been incorrectly marked as successful.",
          solution: "Remove inappropriate ignore_errors or incorrect failed_when logic. Define explicit failure conditions and test them in staging."
        },
        {
          issue: "A rolling deployment stops halfway through.",
          rootCause: "A host failed during the current batch or the configured failure threshold was reached.",
          solution: "Inspect the failed host and current application health. Do not blindly rerun the complete rollout. Correct the problem and resume using a controlled recovery procedure."
        }
      ]
    },
    {
      heading: "9. Security, Performance, Logging and Troubleshooting",
      explanation: `Ansible playbooks often control important infrastructure. A mistake in a playbook can affect many servers, so security and operational discipline are essential.

Security:

Use dedicated automation accounts. Give them only the permissions required for their tasks.

Use SSH keys and protect private keys with appropriate filesystem permissions.

Do not store plaintext passwords, cloud credentials, API tokens, or private keys in Git.

Use Ansible Vault for encrypted variables and files. Protect the Vault password with an approved secret-management mechanism.

Use no_log: true for tasks that may expose secrets in output. Remember that no_log hides task details, so operational logging and verification must still be designed.

Validate external inputs. Do not directly insert untrusted input into shell commands.

Performance:

Gather facts only when needed. Fact gathering can consume time on large inventories.

Use suitable forks, SSH connection reuse, and smaller deployment batches.

Avoid unnecessary shell processes and repeated package operations.

Use purpose-built modules and templates.

Logging:

Use readable task names and appropriate verbosity.

Keep execution logs in a protected location. Do not expose secrets in log files.

Use centralized monitoring to verify service health, CPU, memory, disk, network, and application metrics.

Troubleshooting:

Start with syntax validation.

Check the inventory and host selection.

Run a limited test against one host.

Use verbose output to identify connection and task failures.

Inspect remote service logs and operating-system logs.

Verify the actual state independently.

RCA should identify why the failure happened, why existing controls did not prevent it, and what permanent changes will prevent recurrence.`,
      steps: [
        "Use least-privilege automation accounts.",
        "Encrypt sensitive variables with Vault or an approved secret store.",
        "Keep host key verification enabled.",
        "Use no_log for sensitive task output.",
        "Gather only required facts.",
        "Set concurrency according to control-node and target capacity.",
        "Use structured modules rather than unnecessary shell commands.",
        "Review logs and task results after execution.",
        "Verify application health through monitoring.",
        "Document the root cause and preventive action."
      ],
      commands: `# Validate syntax
ansible-playbook -i inventory.ini site.yml --syntax-check

# Run against one test host
ansible-playbook -i inventory.ini site.yml --limit web01

# Enable verbose troubleshooting
ansible-playbook -i inventory.ini site.yml -vvv

# Create an encrypted Vault file
ansible-vault create group_vars/production/vault.yml

# Edit an encrypted Vault file
ansible-vault edit group_vars/production/vault.yml

# View encrypted content when authorized
ansible-vault view group_vars/production/vault.yml

# Run a playbook using an interactive Vault password prompt
ansible-playbook -i inventory.ini site.yml --ask-vault-pass

# Run using a protected Vault password file
ansible-playbook -i inventory.ini site.yml --vault-password-file /secure/path/vault-pass

# Check active Ansible configuration
ansible-config dump --only-changed

# Inspect a task's module documentation
ansible-doc ansible.builtin.template`,
      config: `---
- name: Secure application configuration
  hosts: appservers
  become: true

  vars:
    app_config_path: /etc/payment-api/app.conf

  tasks:
    - name: Deploy protected application configuration
      ansible.builtin.template:
        src: templates/app.conf.j2
        dest: "{{ app_config_path }}"
        owner: root
        group: payment
        mode: "0640"
      no_log: true
      notify: Restart payment API

  handlers:
    - name: Restart payment API
      ansible.builtin.service:
        name: payment-api
        state: restarted

# template renders a Jinja2 template on the control node and deploys the result.
# mode 0640 limits access to the owner and group.
# no_log hides task output that may contain sensitive values.
# Protect the source template and Vault data as well.
# Do not print secret variables through debug tasks.`,
      problems: [
        {
          issue: "Vault-encrypted variables cannot be loaded.",
          rootCause: "The password is incorrect, the encrypted file is damaged, or the file is not included in the playbook variable-loading path.",
          solution: "Verify the Vault password source, file integrity, and group_vars or vars_files configuration. Use the approved secret recovery process."
        },
        {
          issue: "Playbook execution becomes slow when the inventory grows.",
          rootCause: "Fact gathering, connection overhead, excessive forks, or expensive tasks may be increasing execution time.",
          solution: "Measure with verbose output, reduce unnecessary fact collection, review forks, use connection reuse, and execute large changes in batches."
        },
        {
          issue: "An application secret appears in task output.",
          rootCause: "A task or debug operation printed sensitive data without output protection.",
          solution: "Remove the secret from logs where possible, rotate exposed credentials, use no_log for sensitive tasks, and review access to stored logs."
        }
      ]
    },
    {
      heading: "10. Verification, Best Practices and Senior Engineer Interview Notes",
      explanation: `A production-ready playbook must be understandable, repeatable, secure, testable, and recoverable.

Best practices:

1. Use descriptive names for plays and tasks.
2. Use FQCN module names such as ansible.builtin.copy.
3. Prefer idempotent modules.
4. Keep environment configuration in variables and inventory.
5. Separate reusable automation into roles when the project grows.
6. Use handlers for service reloads and restarts triggered by changes.
7. Validate syntax before execution.
8. Preview host selection.
9. Use a canary before production rollout.
10. Use serial for rolling changes.
11. Protect credentials and sensitive output.
12. Keep playbooks in version control.
13. Test failure and recovery paths.
14. Verify the application, not just the task result.
15. Maintain an approved rollback process.

Verification checklist:

- Is the correct inventory loaded?
- Are the intended hosts selected?
- Does the playbook pass syntax validation?
- Are variables resolved correctly?
- Are required packages and files present?
- Are permissions correct?
- Are services running?
- Are handlers triggered only when needed?
- Are application health checks successful?
- Are monitoring and logs healthy?
- Does a second execution avoid unnecessary changes?
- Can the deployment be recovered safely?

Interview questions and practical decisions:

Q: What is an Ansible playbook?
A: A YAML file that defines plays, target hosts, variables, and tasks for repeatable automation.

Q: What is the difference between an ad-hoc command and a playbook?
A: Ad-hoc commands perform quick one-time operations. Playbooks define structured, reusable, multi-step automation.

Q: What is a play?
A: A set of tasks applied to a selected group of hosts.

Q: What is a task?
A: An individual operation that generally uses an Ansible module.

Q: What is a handler?
A: A special task that normally runs when notified by another task.

Q: What is idempotence?
A: Repeating an operation leaves the system in the same desired state without unnecessary changes.

Q: What are facts?
A: Information collected from managed nodes, such as operating system, IP address, and memory.

Q: What is serial?
A: A play-level setting that controls how many hosts are processed in each batch.

Q: What is check mode?
A: A mode that asks supported modules to predict changes without applying normal changes. It is not a complete guarantee of production behavior.

Q: Why use FQCN?
A: It identifies the exact collection and module, improving clarity and reducing ambiguity.

Q: When should we use a role?
A: When automation needs reusable structure for tasks, handlers, defaults, variables, templates, and files.

Q: How do you debug a failed deployment?
A: Identify the failed host and task, inspect verbose output and remote logs, find the root cause, correct it, and verify recovery.

Senior engineer decision:
A successful playbook run is not the same as a successful application release. Always verify the application behavior, dependencies, logs, and monitoring signals.`,
      steps: [
        "Keep playbooks readable and organized.",
        "Use roles when automation becomes reusable or large.",
        "Run syntax checks in CI before merging changes.",
        "Test playbooks against development and staging environments.",
        "Use a canary deployment in production.",
        "Verify the application health endpoint after deployment.",
        "Run the playbook a second time to test idempotence.",
        "Review the final output and failed-host list.",
        "Maintain backups and rollback instructions.",
        "Record lessons learned and improve the automation."
      ],
      commands: `# Validate syntax
ansible-playbook -i inventory.ini site.yml --syntax-check

# Review the selected hosts
ansible-playbook -i inventory.ini site.yml --list-hosts

# Review tasks and tags
ansible-playbook -i inventory.ini site.yml --list-tasks
ansible-playbook -i inventory.ini site.yml --list-tags

# Preview supported changes
ansible-playbook -i inventory.ini site.yml --check --diff

# Run against staging
ansible-playbook -i staging.ini site.yml

# Run against a canary production host
ansible-playbook -i production.ini site.yml --limit app01

# Run the production playbook
ansible-playbook -i production.ini site.yml

# Execute again to check idempotence
ansible-playbook -i production.ini site.yml

# Inspect the final application service state
ansible appservers -i production.ini -b -m ansible.builtin.command -a "systemctl is-active payment-api"

# Verify the application endpoint
ansible appservers -i production.ini -m ansible.builtin.uri -a "url=http://localhost:8080/health status_code=200"`,
      config: `# Recommended project layout
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
    app01.yml
  playbooks/
    site.yml
    deploy.yml
    configure-web.yml
  roles/
    common/
    nginx/
    payment-api/
  files/
  templates/
  README.md

# ansible.cfg contains project-level defaults.
# inventory contains environment-specific hosts.
# group_vars contains shared group configuration.
# host_vars contains genuine host-specific configuration.
# playbooks contains top-level automation workflows.
# roles contains reusable automation components.
# files contains static files.
# templates contains Jinja2 templates.
# README.md documents execution and operational requirements.
# Never commit plaintext production credentials or private keys.`,
      problems: [
        {
          issue: "The playbook reports success, but the application is not available.",
          rootCause: "The playbook may have completed operating-system tasks without verifying application startup, dependencies, or external connectivity.",
          solution: "Add service readiness checks and application health checks. Inspect logs, ports, dependencies, and load-balancer health before declaring deployment success."
        },
        {
          issue: "Running the same playbook repeatedly produces unexpected changes.",
          rootCause: "Tasks may use non-idempotent commands, unstable templates, timestamps, or incorrect state definitions.",
          solution: "Replace shell commands with purpose-built modules where possible, normalize configuration values, and compare the first and second execution results."
        },
        {
          issue: "The playbook is difficult for another engineer to maintain.",
          rootCause: "Tasks may have unclear names, repeated values, hardcoded environment details, or too much logic in one file.",
          solution: "Separate variables, use meaningful task names, introduce roles for reusable components, document prerequisites, and keep examples in version control."
        }
      ]
    }
  ]
};

export default noteData;
