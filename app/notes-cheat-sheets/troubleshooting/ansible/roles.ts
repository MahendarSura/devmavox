import type { NoteData } from "../types";

const noteData: NoteData = {
  title: "Ansible Roles – Complete DevOps Engineer Technical Notes",
  description: "My practical study notebook for understanding Ansible Roles from basic concepts to reusable production automation. Learn role architecture, directory structure, tasks, handlers, defaults, variables, templates, files, dependencies, collections, testing, CI/CD integration, security, troubleshooting, and real company workflows.",
  sections: [
    {
      heading: "1. My Technical Notes – What Are Ansible Roles?",
      explanation: `Ansible roles are a standard way to organize automation into reusable and maintainable components.

When we start learning Ansible, we may write all our tasks inside one large playbook. This is fine for a small example. But in a real company, automation can contain hundreds of tasks for Linux configuration, Nginx installation, application deployment, monitoring, security, and database configuration.

Keeping everything inside one large playbook becomes difficult to understand, debug, reuse, and maintain.

Ansible Roles solve this problem by dividing automation into logical directories.

For example, a company may have:
- A common role for Linux server configuration.
- An Nginx role for web server installation and configuration.
- A Docker role for container runtime installation.
- A monitoring role for Prometheus exporters.
- An application role for deploying business applications.

Each role has a defined responsibility. The same role can be called from different playbooks and environments.

A role can contain:
- tasks: The operations to execute.
- handlers: Actions triggered by task notifications.
- defaults: Default variable values.
- vars: Role variables.
- files: Static files copied to managed nodes.
- templates: Jinja2 templates rendered with variables.
- meta: Role metadata and dependencies.
- tests: Optional testing files and inventory.
- README.md: Documentation.

The main advantage is reusability.

Suppose five different application playbooks need Nginx. Instead of writing the same installation and configuration tasks five times, we can create one Nginx role and reuse it.

Roles also improve consistency. If the organization changes its approved Nginx configuration, engineers can update the role instead of manually changing multiple playbooks.

A role is not a separate Ansible agent or service. It is an organized collection of automation content that Ansible executes through a playbook.

A role is normally invoked from a play using the roles keyword, or through supported dynamic or static inclusion mechanisms.

Important distinction:

A playbook defines the workflow and target hosts.

A role organizes reusable implementation details.

A task performs one operation.

A handler performs an action when notified.

A collection packages Ansible content such as roles, modules, plugins, and other resources.

Use roles when automation needs clear ownership, reuse, testing, and maintainability.`,
      steps: [
        "Identify repeated automation tasks in the project.",
        "Group related tasks according to one responsibility.",
        "Create a role using the standard Ansible directory structure.",
        "Move task definitions into tasks/main.yml.",
        "Move service restart operations into handlers/main.yml.",
        "Move reusable default values into defaults/main.yml.",
        "Use templates and files for configuration deployment.",
        "Call the role from a playbook.",
        "Test the role in development before production use.",
        "Document role inputs, outputs, dependencies, and supported platforms."
      ],
      commands: `# Check Ansible installation
ansible --version

# Create a role directory using ansible-galaxy
ansible-galaxy role init nginx

# Create another role
ansible-galaxy role init common

# Display role directory contents
find nginx -maxdepth 3 -type f

# List available installed roles
ansible-galaxy role list

# Validate the playbook that calls a role
ansible-playbook -i inventory.ini site.yml --syntax-check

# Execute the role through a playbook
ansible-playbook -i inventory.ini site.yml`,
      config: `# Standard role structure

roles/
  nginx/
    defaults/
      main.yml
    files/
    handlers/
      main.yml
    meta/
      main.yml
    tasks/
      main.yml
    templates/
    tests/
      inventory
      test.yml
    vars/
      main.yml

# defaults/main.yml contains overridable default values.
# tasks/main.yml contains the role's main task list.
# handlers/main.yml contains notified handlers.
# files/ contains static files.
# templates/ contains Jinja2 templates.
# vars/main.yml contains role variables with higher precedence than defaults.
# meta/main.yml contains metadata and role dependencies.
# tests/ can contain a simple role test playbook and inventory.
# README.md documents the role's purpose and usage.`,
      problems: [
        {
          issue: "Ansible reports that a role cannot be found.",
          rootCause: "The role directory is not in the configured role search path or the role name is incorrect.",
          solution: "Check the project directory, roles_path configuration, role directory name, and ansible-galaxy role list. Use the expected role search path."
        },
        {
          issue: "The role executes but some expected tasks are missing.",
          rootCause: "The tasks may not be included from tasks/main.yml, or the role may have been called with tags or conditions that skip those tasks.",
          solution: "Inspect tasks/main.yml, review included task files, run --list-tasks and --list-tags, and verify the playbook invocation."
        }
      ]
    },
    {
      heading: "2. Role Architecture and Internal Working",
      explanation: `Ansible roles follow a predictable directory convention. Ansible uses that convention to locate the role's tasks, handlers, variables, templates, files, and metadata.

When a playbook calls a role, Ansible resolves the role name using configured role search paths.

The role's main task entry point is normally tasks/main.yml.

The main task file can include other task files. This allows large roles to be separated into logical units.

For example:
tasks/
  main.yml
  install.yml
  configure.yml
  service.yml

The main.yml file can include install.yml, configure.yml, and service.yml.

Handlers are loaded from handlers/main.yml. A task can notify a handler by name. The handler normally runs when notified and after the task execution phase, unless handlers are explicitly flushed earlier.

Variables are loaded from different locations. Defaults in defaults/main.yml are designed to be easily overridden. Variables in vars/main.yml have higher precedence and are generally intended for values that should not be overridden casually.

Files and templates have different purposes.

Files are static. Ansible copies the file as it exists on the control node.

Templates use Jinja2 expressions. Ansible renders them using variables and facts before deploying the result.

Metadata in meta/main.yml can describe the role and define role dependencies.

A role can depend on another role. For example, an application role may depend on a common Linux configuration role.

The dependency relationship should be designed carefully to avoid unnecessary coupling and circular dependencies.

Execution flow:

1. An engineer starts a playbook.
2. Ansible loads the playbook.
3. Ansible resolves the role name.
4. Role defaults, variables, tasks, handlers, and metadata are processed according to Ansible's role behavior.
5. The role tasks execute against selected managed hosts.
6. Tasks may notify handlers.
7. Handlers execute when notified.
8. Results are returned to the control node.

Static role inclusion and dynamic role inclusion are different.

The roles keyword and import_role are static-style mechanisms. include_role is dynamic and is evaluated during execution.

Use import_role when the role should be included as part of the playbook structure. Use include_role when runtime conditions or loops require dynamic inclusion.

The exact behavior of tags, variables, and task listing can differ depending on the inclusion mechanism, so test the intended execution path.`,
      steps: [
        "Resolve the role directory from the configured role search path.",
        "Check the role's tasks/main.yml entry point.",
        "Inspect supporting task files and their inclusion order.",
        "Review defaults and variables.",
        "Inspect template and file sources.",
        "Check handlers and notification names.",
        "Review role metadata and dependencies.",
        "Execute the role through a test playbook.",
        "Inspect task output and verify the final managed-node state."
      ],
      commands: `# Display the current role search paths
ansible-config dump | grep -i DEFAULT_ROLES_PATH

# Display Ansible configuration
ansible --version

# List installed Galaxy roles
ansible-galaxy role list

# Create a role
ansible-galaxy role init payment_api

# Validate a playbook
ansible-playbook -i inventory.ini site.yml --syntax-check

# Display tasks included by a playbook
ansible-playbook -i inventory.ini site.yml --list-tasks

# Display role-related execution details
ansible-playbook -i inventory.ini site.yml -vvv`,
      config: `# ansible.cfg
[defaults]
inventory = ./inventory.ini
roles_path = ./roles:~/.ansible/roles
collections_path = ./collections
host_key_checking = True
forks = 10

# roles_path defines where Ansible searches for roles.
# collections_path defines where Ansible searches for collections.
# A project-local roles directory improves portability.
# Separate project dependencies from globally installed content.
# Confirm the effective paths with ansible-config dump.`,
      problems: [
        {
          issue: "A role works on one engineer's machine but fails on another machine.",
          rootCause: "The role may be installed globally on one system but missing from the project's dependency setup.",
          solution: "Use a project-local role structure or a documented requirements.yml file. Pin required versions and install dependencies during environment setup."
        },
        {
          issue: "A role dependency executes in an unexpected order.",
          rootCause: "The dependency relationship or role invocation structure is not understood correctly.",
          solution: "Inspect meta/main.yml, review the role dependency graph, remove circular dependencies, and validate execution using a small test playbook."
        }
      ]
    },
    {
      heading: "3. Creating Roles and Understanding Every Directory",
      explanation: `Ansible Galaxy provides a command to create a role skeleton.

The command ansible-galaxy role init creates a standard directory structure. Engineers can then add tasks, handlers, variables, templates, files, and metadata.

Example:

ansible-galaxy role init nginx

This creates the nginx role directory with the standard subdirectories and sample files.

The role should have one clear responsibility.

A common role should manage shared operating-system configuration. An Nginx role should manage Nginx. A database role should manage database-specific operations.

Avoid creating one role called everything that installs all tools, configures all services, and deploys every application. Such a role becomes difficult to test and reuse.

Directory responsibilities:

tasks:
Contains operations. main.yml is the standard task entry point.

handlers:
Contains tasks triggered by notifications. Typical examples are restarting or reloading services.

defaults:
Contains default variable values. These are normally the best location for user-configurable role inputs.

vars:
Contains role variables with higher precedence. Avoid putting values here if users should easily override them.

files:
Contains static files used by modules such as copy.

templates:
Contains Jinja2 templates used by the template module.

meta:
Contains role metadata and dependencies.

tests:
Contains optional test inventory and test playbooks.

README.md:
Documents supported operating systems, variables, dependencies, execution, and examples.

A role is easier to maintain when its directory names are standard and its entry points are clear.`,
      steps: [
        "Run ansible-galaxy role init with a meaningful role name.",
        "Open the generated role directory.",
        "Write the main tasks in tasks/main.yml.",
        "Add service handlers in handlers/main.yml.",
        "Define overridable values in defaults/main.yml.",
        "Place static configuration files in files/.",
        "Place dynamic configuration templates in templates/.",
        "Document role dependencies in meta/main.yml.",
        "Write a README explaining how the role is used."
      ],
      commands: `# Create the role
ansible-galaxy role init nginx

# Create a common role
ansible-galaxy role init common

# Create an application role
ansible-galaxy role init payment_api

# View role structure
tree nginx

# List role files
find nginx -type f

# Check Galaxy role command options
ansible-galaxy role init --help

# Validate the playbook that uses the role
ansible-playbook -i inventory.ini site.yml --syntax-check`,
      config: `# Example role directory
roles/
  nginx/
    README.md
    defaults/
      main.yml
    files/
      maintenance.html
    handlers/
      main.yml
    meta/
      main.yml
    tasks/
      main.yml
      install.yml
      configure.yml
    templates/
      nginx.conf.j2
    vars/
      main.yml

# tasks/main.yml
---
- name: Install Nginx
  ansible.builtin.import_tasks: install.yml

- name: Configure Nginx
  ansible.builtin.import_tasks: configure.yml

# Task files are split according to their responsibility.
# import_tasks provides static task inclusion.
# Keep the main entry point easy to understand.`,
      problems: [
        {
          issue: "The generated role does not contain the expected implementation.",
          rootCause: "The Galaxy init command creates a skeleton, not a completed production role.",
          solution: "Implement the required tasks, variables, handlers, templates, files, metadata, tests, and documentation according to the role's responsibility."
        },
        {
          issue: "A role directory contains unrelated tasks from multiple tools.",
          rootCause: "The role does not have a clearly defined responsibility.",
          solution: "Split the automation into smaller roles such as common, nginx, docker, monitoring, and application deployment."
        }
      ]
    },
    {
      heading: "4. Defaults, Variables and Role Customization",
      explanation: `Role variables make automation reusable across environments.

Imagine the Nginx role is used in development, staging, and production. The package name may be the same, but the allowed ports, worker settings, site configuration, and application paths may differ.

Instead of hardcoding every value inside tasks, define configurable variables.

defaults/main.yml is normally the correct place for role input defaults.

Example:

nginx_package_name: nginx
nginx_service_name: nginx
nginx_worker_connections: 1024

A playbook can override default variables:

vars:
  nginx_worker_connections: 2048

An inventory group can also provide environment-specific values.

Ansible variable precedence is important. A value from a higher-precedence source may override a role default.

The role should document its supported variables and their expected types.

Use descriptive variable names that indicate their purpose.

Avoid using generic names such as port, user, or path when they may conflict with other roles or project variables. Prefer names such as nginx_listen_port or payment_api_directory.

The vars directory has higher precedence than defaults. Do not place every configurable value in vars/main.yml because doing so makes customization more difficult.

Avoid excessive variable indirection. A role should be easy to understand by reading its defaults and README.`,
      steps: [
        "Identify values that users may need to customize.",
        "Define sensible defaults in defaults/main.yml.",
        "Use clear role-specific variable names.",
        "Override defaults through playbooks or inventory.",
        "Use environment-specific group_vars where appropriate.",
        "Document allowed values and expected data types.",
        "Avoid hardcoding secrets in role variables.",
        "Test the role with default values and overridden values."
      ],
      commands: `# Execute with a custom role variable
ansible-playbook -i inventory.ini site.yml -e "nginx_worker_connections=2048"

# Override multiple values
ansible-playbook -i inventory.ini site.yml -e "nginx_listen_port=8080 nginx_worker_connections=2048"

# Inspect inventory variables
ansible-inventory -i inventory.ini --list

# Display selected role tasks
ansible-playbook -i inventory.ini site.yml --list-tasks

# Run with verbose diagnostics
ansible-playbook -i inventory.ini site.yml -vvv`,
      config: `# roles/nginx/defaults/main.yml
---
nginx_package_name: nginx
nginx_service_name: nginx
nginx_listen_port: 80
nginx_worker_connections: 1024
nginx_document_root: /var/www/html

# playbook
---
- name: Configure web servers
  hosts: webservers
  become: true

  vars:
    nginx_listen_port: 8080

  roles:
    - nginx

# group_vars/webservers.yml
nginx_worker_connections: 2048

# Defaults are intended to be easily overridden.
# Play and inventory values can provide environment-specific configuration.
# Extra variables have very high precedence.
# Avoid using secrets as ordinary plaintext values.`,
      problems: [
        {
          issue: "A custom variable does not override the role value.",
          rootCause: "The value may be defined in a higher-precedence location such as role vars or extra variables.",
          solution: "Review the variable's source and Ansible precedence. Keep user-configurable inputs in defaults/main.yml whenever possible."
        },
        {
          issue: "A role behaves differently in staging and production.",
          rootCause: "Environment-specific variables may be missing, inconsistent, or overridden unexpectedly.",
          solution: "Maintain documented group_vars for each environment and verify the effective variable values during a controlled test."
        }
      ]
    },
    {
      heading: "5. Tasks, Handlers, Files and Templates",
      explanation: `The tasks directory contains the actual work performed by the role.

A good role separates installation, configuration, and service management into understandable task files.

For example:
install.yml installs the package.
configure.yml deploys configuration.
service.yml ensures the service is running.

The files directory is used for static files. A file copied from this directory is transferred without Jinja2 rendering.

The templates directory is used for dynamic configuration. Templates can include variables, conditions, and loops.

Example:

server {
    listen {{ nginx_listen_port }};
    server_name {{ nginx_server_name }};
}

Ansible renders the template using the variable values before copying the result to the managed node.

The copy module is suitable for static content. The template module is suitable for dynamic configuration.

Handlers are used for actions that should happen only when a relevant task changes something.

For example, deploying a new Nginx configuration can notify a handler to reload Nginx.

A configuration should be validated before applying a reload or restart. For important services, a bad configuration can cause downtime.

Use a backup option when replacing important files, and ensure a recovery plan exists.

Task names should explain the intended operation, not simply say task 1 or execute command.`,
      steps: [
        "Write installation tasks in a separate file.",
        "Use package modules for package management.",
        "Use files for static content.",
        "Use templates for variable-driven configuration.",
        "Validate configuration before applying it.",
        "Notify a handler only when the configuration changes.",
        "Use service modules to manage services.",
        "Verify the resulting service state and application response."
      ],
      commands: `# Execute only the Nginx role
ansible-playbook -i inventory.ini site.yml --tags nginx

# Validate the playbook
ansible-playbook -i inventory.ini site.yml --syntax-check

# Preview supported file changes
ansible-playbook -i inventory.ini site.yml --check --diff

# Run against one host
ansible-playbook -i inventory.ini site.yml --limit web01

# Verify Nginx service
ansible webservers -i inventory.ini -b -m ansible.builtin.command -a "systemctl is-active nginx"

# Validate Nginx configuration
ansible webservers -i inventory.ini -b -m ansible.builtin.command -a "nginx -t"

# Check HTTP endpoint
ansible webservers -i inventory.ini -m ansible.builtin.uri -a "url=http://localhost/ status_code=200"`,
      config: `# roles/nginx/tasks/main.yml
---
- name: Install Nginx
  ansible.builtin.package:
    name: "{{ nginx_package_name }}"
    state: present

- name: Deploy Nginx configuration
  ansible.builtin.template:
    src: nginx.conf.j2
    dest: /etc/nginx/nginx.conf
    owner: root
    group: root
    mode: "0644"
    backup: true
    validate: "nginx -t -c %s"
  notify: Reload Nginx

- name: Ensure Nginx is enabled
  ansible.builtin.service:
    name: "{{ nginx_service_name }}"
    enabled: true
    state: started

# roles/nginx/handlers/main.yml
---
- name: Reload Nginx
  ansible.builtin.service:
    name: "{{ nginx_service_name }}"
    state: reloaded

# roles/nginx/templates/nginx.conf.j2
worker_processes auto;

events {
    worker_connections {{ nginx_worker_connections }};
}

http {
    server {
        listen {{ nginx_listen_port }};
        server_name {{ nginx_server_name | default('_') }};
        root {{ nginx_document_root }};
    }
}

# The template is rendered using Jinja2.
# validate checks a temporary candidate configuration before replacement.
# notify triggers the handler if the template task changes the file.
# Verify validate command compatibility with the target Nginx installation.`,
      problems: [
        {
          issue: "The template is copied but variable placeholders remain in the file.",
          rootCause: "The copy module was used instead of the template module.",
          solution: "Move dynamic content into templates/ and use ansible.builtin.template."
        },
        {
          issue: "The Nginx handler does not execute.",
          rootCause: "The configuration task did not report a change or the handler notification name does not match.",
          solution: "Check the task result, compare the notification and handler names, and verify that the template actually changed."
        },
        {
          issue: "A configuration deployment breaks the service.",
          rootCause: "The new configuration was invalid or incompatible with the installed service version.",
          solution: "Use the template validate option where supported, retain a backup, test in staging, and restore the last known good configuration if necessary."
        }
      ]
    },
    {
      heading: "6. Role Dependencies and Reusable Project Architecture",
      explanation: `Role dependencies allow one role to declare that another role must be executed before it.

For example, a payment application role may depend on a common role that prepares the operating system and creates the deployment account.

Dependencies are defined in meta/main.yml.

A role dependency can pass variables to the dependent role.

However, dependencies should not be used to create unnecessary coupling. If every role depends on every other role, the project becomes difficult to understand and change.

A good project separates infrastructure responsibilities.

Example:
common: prepares standard Linux configuration.
nginx: installs and configures the web server.
docker: installs and configures Docker.
monitoring: configures exporters.
payment_api: deploys the application.

A top-level playbook can call these roles in a logical order.

The same roles can be reused in staging and production with different inventories and variable values.

Ansible collections are related but different. A collection is a package of Ansible content. It can include roles, modules, plugins, and documentation.

Roles can be distributed through Ansible Galaxy or included in collections.

A project should pin external role and collection versions to avoid unexpected behavior when dependencies change.

Use requirements.yml to describe external role or collection dependencies.

Keep third-party dependencies reviewed and updated according to company policy.`,
      steps: [
        "Identify common prerequisites between roles.",
        "Define dependencies only when one role genuinely requires another.",
        "Document dependencies in meta/main.yml.",
        "Create a top-level playbook to orchestrate roles.",
        "Use separate inventory files for each environment.",
        "Pin external dependency versions.",
        "Install dependencies in a reproducible setup process.",
        "Test the complete project after changing a dependency."
      ],
      commands: `# Install roles listed in requirements.yml
ansible-galaxy role install -r requirements.yml

# Install collections listed in requirements.yml
ansible-galaxy collection install -r requirements.yml

# List installed roles
ansible-galaxy role list

# List installed collections
ansible-galaxy collection list

# Install a role into a project-local directory
ansible-galaxy role install geerlingguy.nginx -p ./roles

# Install a collection into a project-local directory
ansible-galaxy collection install community.general -p ./collections

# Validate the complete site playbook
ansible-playbook -i inventory.ini site.yml --syntax-check`,
      config: `# roles/payment_api/meta/main.yml
---
galaxy_info:
  role_name: payment_api
  author: DevOps Team
  description: Deploy and manage the payment API
  license: MIT
  min_ansible_version: "2.14"

dependencies:
  - role: common
    vars:
      common_timezone: UTC

# requirements.yml for roles
---
roles:
  - name: geerlingguy.nginx
    version: "3.1.0"

# requirements.yml for collections
---
collections:
  - name: community.general
    version: "10.0.0"

# Pin versions to make installations reproducible.
# Review third-party role source code before using it in production.
# Confirm compatibility with your installed Ansible version.`,
      problems: [
        {
          issue: "A dependent role is not installed.",
          rootCause: "The dependency was declared but the project did not install the required role.",
          solution: "Run ansible-galaxy role install -r requirements.yml and verify that the role exists in the configured search path."
        },
        {
          issue: "An external role update breaks an existing deployment.",
          rootCause: "The project used an unpinned dependency or accepted a new version without compatibility testing.",
          solution: "Pin the known-good version, test updates in a separate branch and staging environment, and update the dependency only after review."
        }
      ]
    },
    {
      heading: "7. Real-Time Company Scenario – Building a Reusable Web Server Platform",
      explanation: `Imagine a company operating 30 web servers across development, staging, and production.

The company wants all servers to use a consistent Nginx installation and configuration.

Without roles, engineers may create separate playbooks for every environment. Over time, the configurations can become inconsistent.

A reusable Nginx role solves this problem.

The role contains:
- Package installation.
- Nginx configuration template.
- Service management.
- Configuration validation.
- Service reload handler.
- Default values for ports and paths.

The development inventory may use a different port or server name. Production may use a different worker configuration and domain name.

The role remains the same. Only environment-specific values change.

A typical company workflow:

1. An engineer updates the Nginx role in Git.
2. A pull request is opened.
3. CI checks YAML syntax and runs automated tests.
4. The change is reviewed by another engineer.
5. The role is tested against development servers.
6. The staging environment is updated.
7. Application and infrastructure health are verified.
8. Production deployment is approved.
9. A canary server is updated.
10. The remaining servers are updated in controlled batches.

This structure improves consistency and reduces duplicate code.

A role should not assume that every server has identical operating-system packages, service names, or filesystem paths. Use facts and documented variables when supporting multiple platforms.`,
      steps: [
        "Create a common role and an Nginx role.",
        "Define environment-specific inventories.",
        "Configure the Nginx role through defaults and group variables.",
        "Write configuration templates.",
        "Add validation and reload handlers.",
        "Test the role in development.",
        "Review the change through Git.",
        "Deploy to staging and verify the web endpoint.",
        "Deploy to one production canary.",
        "Continue in batches after health checks pass."
      ],
      commands: `# Run common and Nginx roles in development
ansible-playbook -i inventory/development.ini site.yml

# Run against staging
ansible-playbook -i inventory/staging.ini site.yml

# Preview production hosts
ansible-playbook -i inventory/production.ini site.yml --list-hosts

# Execute against one production canary
ansible-playbook -i inventory/production.ini site.yml --limit web01

# Execute the production rollout
ansible-playbook -i inventory/production.ini site.yml

# Verify Nginx service
ansible webservers -i inventory/production.ini -b -m ansible.builtin.command -a "systemctl is-active nginx"

# Verify HTTP status
ansible webservers -i inventory/production.ini -m ansible.builtin.uri -a "url=http://localhost/ status_code=200"

# Inspect recent Nginx logs
ansible webservers -i inventory/production.ini -b -m ansible.builtin.command -a "journalctl -u nginx -n 50 --no-pager"`,
      config: `# site.yml
---
- name: Prepare all Linux servers
  hosts: all
  become: true
  roles:
    - common

- name: Configure web servers
  hosts: webservers
  become: true
  serial: 2
  roles:
    - nginx

# inventory/development.ini
[webservers]
dev-web01 ansible_host=192.168.10.11

# inventory/staging.ini
[webservers]
stage-web01 ansible_host=192.168.20.11

# inventory/production.ini
[webservers]
web01 ansible_host=192.168.30.11
web02 ansible_host=192.168.30.12
web03 ansible_host=192.168.30.13

# Use the same role across environments.
# Inventory and variables determine environment-specific behavior.
# serial controls deployment batch size.
# Adapt host addresses and group names to the real environment.`,
      problems: [
        {
          issue: "Development works but production deployment fails.",
          rootCause: "Production may have different package repositories, permissions, network restrictions, operating-system versions, or variable values.",
          solution: "Compare production and staging facts and variables, inspect the failed task, validate prerequisites, and test the correction on a production-like environment."
        },
        {
          issue: "Different teams modify the same role and introduce regressions.",
          rootCause: "The role has no ownership, review, testing, or release process.",
          solution: "Use Git pull requests, code owners, automated tests, versioned releases, and documented compatibility requirements."
        }
      ]
    },
    {
      heading: "8. Production Operations – Security, Performance and Maintenance",
      explanation: `Production roles should be designed with least privilege, predictable behavior, and operational recovery in mind.

Security:
Use a dedicated automation account. Use become only for tasks that require elevated permissions.

Protect SSH private keys and Vault passwords. Never commit plaintext credentials to a Git repository.

Use no_log for tasks that handle sensitive values. Do not print secrets using debug tasks.

Review third-party roles before using them. External roles can execute commands and modify infrastructure, so their source code should be trusted.

Performance:
Avoid collecting facts when they are not needed. Use appropriate forks and deployment batches.

Prefer idempotent modules over shell commands.

Use templates for configuration rather than repeatedly executing commands to edit files.

Avoid installing packages or restarting services unnecessarily.

Reliability:
Validate configuration before reloading services.

Use backups for important configuration files.

Use handlers to avoid unnecessary restarts.

Test role behavior when the target is already configured.

Monitoring:
Verify services after role execution. Use application health endpoints and infrastructure monitoring.

A successful Ansible task does not guarantee that the complete application is healthy.

Maintenance:
Keep dependencies pinned and review updates.

Test roles after changes to supported operating systems.

Document required variables, dependencies, and execution steps.

Keep a tested rollback process.

Operational ownership:
Every production role should have an owner, a documented purpose, supported platform information, and a way to test its behavior.`,
      steps: [
        "Use dedicated service accounts with minimum permissions.",
        "Protect credentials and encrypted variables.",
        "Review third-party role source before installation.",
        "Use validated templates and safe service handlers.",
        "Control concurrency with forks and serial.",
        "Test idempotence using repeated execution.",
        "Verify service health after every production change.",
        "Keep role versions and dependencies under control.",
        "Maintain backups and rollback instructions.",
        "Review execution logs without exposing secrets."
      ],
      commands: `# Validate role playbook
ansible-playbook -i production.ini site.yml --syntax-check

# Review role tasks
ansible-playbook -i production.ini site.yml --list-tasks

# Preview supported changes
ansible-playbook -i production.ini site.yml --check --diff

# Run on a canary
ansible-playbook -i production.ini site.yml --limit web01

# Check configuration
ansible webservers -i production.ini -b -m ansible.builtin.command -a "nginx -t"

# Check service state
ansible webservers -i production.ini -b -m ansible.builtin.command -a "systemctl is-active nginx"

# Verify application endpoint
ansible webservers -i production.ini -m ansible.builtin.uri -a "url=http://localhost/ status_code=200"

# Inspect active configuration
ansible-config dump --only-changed

# Review installed dependencies
ansible-galaxy role list
ansible-galaxy collection list`,
      config: `# ansible.cfg
[defaults]
inventory = ./inventory/production.ini
roles_path = ./roles:~/.ansible/roles
host_key_checking = True
forks = 5
timeout = 30
retry_files_enabled = False

[privilege_escalation]
become = False
become_method = sudo
become_user = root

# Keep host key checking enabled.
# Use conservative concurrency for production.
# Enable become at play or task level only where required.
# Store credentials outside source control.
# Protect execution logs and CI/CD artifacts.`,
      problems: [
        {
          issue: "A role takes too long across a large server fleet.",
          rootCause: "Excessive fact gathering, unnecessary tasks, low concurrency, or slow remote connections may increase execution time.",
          solution: "Measure execution, disable unnecessary fact gathering, tune forks gradually, use connection reuse, and divide deployments into suitable batches."
        },
        {
          issue: "A role exposes credentials in output.",
          rootCause: "Sensitive task arguments or results were printed without output protection.",
          solution: "Use no_log for sensitive tasks, remove secret debug output, rotate exposed credentials, and restrict access to retained logs."
        },
        {
          issue: "A third-party role changes an unexpected system configuration.",
          rootCause: "The role source or defaults were not reviewed before production execution.",
          solution: "Inspect the role tasks, variables, handlers, and dependencies. Pin the reviewed version and test it in an isolated environment before approval."
        }
      ]
    },
    {
      heading: "9. Troubleshooting and RCA – Role Execution Failures",
      explanation: `Role-related errors can occur during role resolution, variable loading, task execution, template rendering, handler execution, or dependency installation.

Role not found:
Ansible cannot resolve the role name from its configured search path.

Undefined variable:
A required variable was not defined or the expected variable file was not loaded.

Template error:
A Jinja2 expression is incorrect or references a missing variable.

Handler not executed:
The task did not report a change, the notification name is incorrect, or the task failed.

Permission denied:
The automation account lacks the required access or privilege escalation is not configured.

Dependency error:
A required role or collection is missing or incompatible.

Platform mismatch:
The role assumes a package name, service name, or filesystem path that does not match the managed operating system.

RCA approach:

First identify the exact role and task that failed.

Second inspect the full Ansible error message.

Third verify the target host and operating-system facts.

Fourth inspect the effective variables and role search path.

Fifth reproduce the failure against one test host.

Sixth inspect the remote logs and permissions.

Seventh fix the underlying issue rather than hiding the failure.

Finally run the role again and verify the desired state.

Do not use ignore_errors to hide a broken role. A green playbook result is not useful if critical operations silently fail.

Use ansible-playbook -vvv when additional execution detail is needed. Protect verbose logs because they may expose infrastructure details.`,
      steps: [
        "Run syntax validation.",
        "Confirm the role directory and search path.",
        "Check the selected hosts.",
        "Identify the failed role task.",
        "Inspect role variables and defaults.",
        "Check template syntax and source files.",
        "Verify SSH and privilege escalation.",
        "Inspect the managed service logs.",
        "Correct the root cause.",
        "Retest on one host before a larger rollout."
      ],
      commands: `# Check the active role search path
ansible-config dump | grep -i DEFAULT_ROLES_PATH

# Check the playbook syntax
ansible-playbook -i inventory.ini site.yml --syntax-check

# Display the selected hosts
ansible-playbook -i inventory.ini site.yml --list-hosts

# Display all selected tasks
ansible-playbook -i inventory.ini site.yml --list-tasks

# Run against one failed host
ansible-playbook -i inventory.ini site.yml --limit web01 -vvv

# Check installed roles
ansible-galaxy role list

# Check installed collections
ansible-galaxy collection list

# Inspect Nginx service status
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "systemctl status nginx --no-pager"

# Inspect Nginx logs
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "journalctl -u nginx -n 100 --no-pager"

# Verify file permissions
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "ls -ld /etc/nginx"`,
      config: `# Example: configure role search path
[defaults]
roles_path = ./roles:~/.ansible/roles

# Example: group variables
# group_vars/webservers.yml
nginx_package_name: nginx
nginx_service_name: nginx
nginx_listen_port: 80

# Example: role defaults
# roles/nginx/defaults/main.yml
nginx_worker_connections: 1024

# Keep role inputs documented.
# Do not define the same configuration in many unrelated locations.
# Use the correct variable precedence intentionally.`,
      problems: [
        {
          issue: "ERROR! the role was not found.",
          rootCause: "The role name is incorrect or the role directory is outside the search path.",
          solution: "Inspect roles_path, check the directory name, install the dependency if necessary, and retry syntax validation."
        },
        {
          issue: "Ansible reports an undefined variable inside a template.",
          rootCause: "The template references a variable that was not defined for the selected host or group.",
          solution: "Define the variable in defaults or the appropriate inventory variable file, and use a sensible default only when that behavior is valid."
        },
        {
          issue: "The handler is skipped even though a configuration task runs.",
          rootCause: "The task may not have changed the file or the notification does not match the handler.",
          solution: "Inspect the task result, verify the handler name, and test with an actual configuration change."
        },
        {
          issue: "The role works on Ubuntu but fails on another Linux distribution.",
          rootCause: "Package names, service names, configuration paths, or platform assumptions differ.",
          solution: "Use gathered facts and supported platform variables, add distribution-specific tasks when necessary, and test each supported operating system."
        }
      ]
    },
    {
      heading: "10. Best Practices, Verification and Senior Engineer Knowledge",
      explanation: `A well-designed Ansible role should be reusable, predictable, secure, easy to test, and easy for another engineer to understand.

Best practices:

1. Give each role one clear responsibility.
2. Use the standard role directory structure.
3. Put configurable values in defaults/main.yml.
4. Use descriptive variable names.
5. Separate installation and configuration tasks.
6. Use handlers for change-triggered service actions.
7. Use templates for dynamic configuration.
8. Use files for static content.
9. Document dependencies in meta/main.yml.
10. Pin third-party dependencies.
11. Keep secrets encrypted or in a secure secret store.
12. Test on supported operating systems.
13. Verify idempotence.
14. Use CI to validate role changes.
15. Use canary and rolling deployments in production.
16. Maintain clear rollback instructions.

Verification checklist:

- Is the role in the correct search path?
- Does the role have tasks/main.yml?
- Are all dependencies installed?
- Are default variables documented?
- Are templates valid?
- Are file permissions correct?
- Do handlers execute only when needed?
- Does the role work in staging?
- Does the second run avoid unnecessary changes?
- Is the application healthy after execution?
- Are logs and monitoring healthy?
- Is the rollback procedure tested?

Interview questions:

Q: What is an Ansible role?
A: A reusable structure that organizes tasks, handlers, variables, templates, files, and metadata.

Q: Why use roles instead of one large playbook?
A: Roles improve modularity, reusability, testing, and maintenance.

Q: What is defaults/main.yml?
A: The standard location for role default variables that users can override.

Q: What is the difference between defaults and vars?
A: Role defaults have lower precedence and are intended for customization. Role vars have higher precedence and should be used for values that should not be casually overridden.

Q: What is handlers/main.yml?
A: The standard location for handlers that are triggered by notifications.

Q: What is the difference between files and templates?
A: Files are static content. Templates are rendered using Jinja2 variables and expressions.

Q: What is meta/main.yml?
A: It contains role metadata and can declare role dependencies.

Q: What is the difference between a role and a collection?
A: A role is one reusable automation structure. A collection packages multiple kinds of Ansible content, including roles, modules, and plugins.

Q: How do you test a role?
A: Validate syntax, run it against test infrastructure, verify results, test idempotence, and use automated testing tools where appropriate.

Q: How do you deploy roles safely to production?
A: Review changes, test in staging, deploy to a canary, monitor health, and expand in controlled batches.

Senior engineer decision:
Do not create roles merely to split files. Create roles around clear responsibilities and stable reusable interfaces. A role that cannot explain its inputs, supported platforms, dependencies, and expected results is not ready for production.`,
      steps: [
        "Keep the role small and focused.",
        "Document all supported inputs and defaults.",
        "Use FQCN module names.",
        "Validate YAML and Jinja2 syntax.",
        "Test the role against its supported platforms.",
        "Run the role twice to check idempotence.",
        "Review dependency versions.",
        "Use pull requests and automated CI checks.",
        "Deploy to staging and then a production canary.",
        "Verify the final service and application state."
      ],
      commands: `# Validate role playbook syntax
ansible-playbook -i inventory.ini site.yml --syntax-check

# Review hosts
ansible-playbook -i inventory.ini site.yml --list-hosts

# Review tasks
ansible-playbook -i inventory.ini site.yml --list-tasks

# Preview supported changes
ansible-playbook -i inventory.ini site.yml --check --diff

# Execute the role
ansible-playbook -i inventory.ini site.yml

# Execute again to verify idempotence
ansible-playbook -i inventory.ini site.yml

# Execute on a single host
ansible-playbook -i inventory.ini site.yml --limit web01

# Verify service status
ansible webservers -i inventory.ini -b -m ansible.builtin.command -a "systemctl is-active nginx"

# Verify HTTP response
ansible webservers -i inventory.ini -m ansible.builtin.uri -a "url=http://localhost/ status_code=200"

# Inspect installed role dependencies
ansible-galaxy role list`,
      config: `# Recommended reusable project layout
ansible-project/
  ansible.cfg
  inventory/
    development.ini
    staging.ini
    production.ini
  group_vars/
    all.yml
    webservers.yml
  host_vars/
  playbooks/
    site.yml
    deploy.yml
  roles/
    common/
      defaults/main.yml
      tasks/main.yml
      handlers/main.yml
      meta/main.yml
    nginx/
      defaults/main.yml
      files/
      handlers/main.yml
      meta/main.yml
      tasks/main.yml
      templates/
      vars/main.yml
    payment_api/
      defaults/main.yml
      handlers/main.yml
      meta/main.yml
      tasks/main.yml
      templates/
  requirements.yml
  README.md

# ansible.cfg controls project defaults.
# inventory contains environment-specific managed hosts.
# group_vars contains shared group values.
# playbooks contains top-level automation workflows.
# roles contains reusable components.
# requirements.yml describes external dependencies.
# README.md explains setup, execution, and operational expectations.
# Keep secrets outside ordinary source files.`,
      problems: [
        {
          issue: "A role becomes difficult to reuse across projects.",
          rootCause: "The role contains hardcoded environment values, undocumented inputs, or dependencies on another project's directory structure.",
          solution: "Define a clear variable interface, use role-relative file paths, document dependencies, and test the role in a clean project."
        },
        {
          issue: "A role passes syntax checks but fails during execution.",
          rootCause: "Syntax validation does not verify every runtime condition, remote package, permission, template value, or service dependency.",
          solution: "Run integration tests against real test infrastructure, inspect remote state, and test both successful and failure scenarios."
        },
        {
          issue: "A role works on the first run but reports unexpected changes on every later run.",
          rootCause: "The role may generate unstable configuration, use non-idempotent commands, or compare files inconsistently.",
          solution: "Normalize template values, use idempotent modules, remove unnecessary timestamps, and compare the first and second execution outputs."
        }
      ]
    }
  ]
};

export default noteData;
