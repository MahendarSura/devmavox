import type { NoteData } from "../types";

const noteData: NoteData = {
  title: "Ansible Variables and Facts – Complete DevOps Engineer Technical Notes",
  description: "My detailed technical notebook for understanding Ansible variables, variable scope, precedence, facts, registered variables, magic variables, host and group variables, dynamic values, Jinja2 expressions, production automation, security, troubleshooting, and real-world DevOps workflows.",
  sections: [
    {
      heading: "1. My Technical Notes – Understanding Ansible Variables",
      explanation: `Variables are one of the most important concepts in Ansible. They allow an automation engineer to write reusable playbooks without hardcoding every value.

Imagine a company has 20 Linux servers. The company wants to install Nginx on all of them. However, development uses port 8080, staging uses port 8081, and production uses port 80.

If we hardcode the port inside every task, we need different playbooks for different environments.

Instead, we define a variable:

nginx_port: 80

The task or template reads that variable when Ansible executes.

A variable is a named value that can store information such as:
- Package names.
- Service names.
- Port numbers.
- Directory paths.
- Usernames.
- Application versions.
- Environment names.
- Database connection settings.
- Deployment configuration.

Ansible uses YAML and Jinja2 syntax to work with variables.

Variable names should be meaningful and predictable.

Good examples:
app_name
app_port
nginx_service_name
docker_package_version
deployment_directory

Avoid unclear names:
x
value1
temp
data

Variables make playbooks reusable, configurable, and easier to maintain.

There are different places to define variables:
- Inside a playbook.
- In inventory files.
- In host_vars.
- In group_vars.
- In role defaults.
- In role vars.
- Through vars_files.
- Through registered task results.
- Through set_fact.
- Through extra variables passed from the command line.

Ansible combines these values according to variable precedence.

Understanding precedence is critical. Two variables with the same name may be defined in multiple locations. The value from the higher-precedence source wins.

A variable is not automatically a secret. Passwords, API keys, tokens, and private credentials must be protected using Ansible Vault or an approved secret-management system.`,
      steps: [
        "Identify values that change between environments.",
        "Define variables instead of hardcoding those values.",
        "Use meaningful names for every variable.",
        "Choose the correct variable location.",
        "Reference variables using Jinja2 expressions.",
        "Override defaults using inventory or playbook values when required.",
        "Validate the resulting configuration.",
        "Protect sensitive values separately from ordinary configuration."
      ],
      commands: `# Run a playbook with an extra variable
ansible-playbook -i inventory.ini site.yml -e "app_port=8080"

# Pass multiple extra variables
ansible-playbook -i inventory.ini site.yml -e "app_name=payment-api app_port=8080"

# Pass variables as JSON
ansible-playbook -i inventory.ini site.yml -e '{"app_name":"payment-api","app_port":8080}'

# Pass variables from a YAML file
ansible-playbook -i inventory.ini site.yml -e @deploy-vars.yml

# Display inventory variables
ansible-inventory -i inventory.ini --list

# Display inventory in graph format
ansible-inventory -i inventory.ini --graph

# Validate playbook syntax
ansible-playbook -i inventory.ini site.yml --syntax-check`,
      config: `# group_vars/webservers.yml
---
app_name: payment-api
app_port: 8080
app_directory: /opt/payment-api
app_environment: development

# playbook
---
- name: Deploy application
  hosts: webservers
  become: true

  tasks:
    - name: Display application configuration
      ansible.builtin.debug:
        msg: "Deploying {{ app_name }} on port {{ app_port }}"

# Jinja2 expressions use double curly braces.
# Variables should be defined in a predictable location.
# Do not hardcode environment-specific values in reusable tasks.`,
      problems: [
        {
          issue: "Ansible reports that a variable is undefined.",
          rootCause: "The variable was not defined for the selected host, group, play, or task, or the expected variable file was not loaded.",
          solution: "Check the variable name, inventory group membership, vars_files, host_vars, group_vars, and role defaults. Define the missing value in the correct location."
        },
        {
          issue: "The playbook uses an unexpected variable value.",
          rootCause: "The same variable is defined in multiple locations and a higher-precedence source overrides the expected value.",
          solution: "Review variable precedence, inspect inventory and playbook definitions, and remove conflicting duplicate definitions."
        }
      ]
    },
    {
      heading: "2. Variable Types, Lists, Dictionaries and Nested Data",
      explanation: `Ansible variables support different data structures. Choosing the correct structure makes automation easier to maintain.

String:
Stores text such as application names, environment names, and file paths.

Integer:
Stores numeric values such as ports, worker counts, and retry limits.

Boolean:
Stores true or false values.

List:
Stores multiple values in an ordered sequence.

Dictionary:
Stores related key-value pairs.

Nested dictionaries:
Store structured configuration inside other dictionaries.

A list is useful when installing multiple packages or creating multiple users.

A dictionary is useful when each application has multiple configuration properties.

For example, an application dictionary may contain its name, port, directory, and service name.

Jinja2 can access dictionary values using dot notation or bracket notation.

Use bracket notation when dictionary keys contain special characters or when clarity is important.

Ansible loops can iterate over lists and dictionaries.

Keep variable structures consistent across environments. If development defines app_port as an integer but production defines it as an invalid string, tasks may fail or render incorrect configuration.

Use type-aware defaults and validation when accepting user-supplied values.`,
      steps: [
        "Use strings for text values.",
        "Use integers for numeric settings.",
        "Use booleans for enable or disable settings.",
        "Use lists for multiple related values.",
        "Use dictionaries for structured configuration.",
        "Use nested dictionaries for complex application settings.",
        "Access values with Jinja2 expressions.",
        "Validate the structure before applying production changes."
      ],
      commands: `# Display a list variable
ansible all -i inventory.ini -m ansible.builtin.debug -a "var=required_packages"

# Display a dictionary variable
ansible all -i inventory.ini -m ansible.builtin.debug -a "var=app_config"

# Display a nested value through a playbook
ansible-playbook -i inventory.ini variables-demo.yml

# Pass a list using JSON
ansible-playbook -i inventory.ini site.yml -e '{"packages":["git","curl","nginx"]}'

# Pass a dictionary using JSON
ansible-playbook -i inventory.ini site.yml -e '{"app_config":{"name":"payment-api","port":8080}}'

# Validate syntax
ansible-playbook -i inventory.ini variables-demo.yml --syntax-check`,
      config: `# group_vars/webservers.yml
---
app_name: payment-api
app_port: 8080
app_enabled: true

required_packages:
  - git
  - curl
  - nginx

app_config:
  name: payment-api
  port: 8080
  directory: /opt/payment-api
  service:
    name: payment-api
    enabled: true

# Access examples
# {{ app_name }}
# {{ app_config.port }}
# {{ app_config['service']['name'] }}

# Loop through packages
- name: Install required packages
  ansible.builtin.package:
    name: "{{ item }}"
    state: present
  loop: "{{ required_packages }}"

# Keep related settings together in dictionaries.`,
      problems: [
        {
          issue: "A loop fails because the variable is not a list.",
          rootCause: "The variable was defined as a string or dictionary instead of the expected list.",
          solution: "Correct the YAML data structure and inspect the effective variable value before running the loop."
        },
        {
          issue: "A nested dictionary lookup fails.",
          rootCause: "The expected dictionary key does not exist or the variable structure differs between environments.",
          solution: "Check the actual data structure, use correct key names, and provide required keys consistently in group_vars and host_vars."
        }
      ]
    },
    {
      heading: "3. Variable Scope and Where Variables Are Defined",
      explanation: `Variable scope describes where a variable is available during playbook execution.

Ansible variables can be defined in several locations. Understanding these locations prevents confusion when playbooks become large.

Play variables:
Defined inside a play using vars. They are available to tasks in that play.

vars_files:
Loads external variable files into a play.

Inventory variables:
Can be defined directly in inventory or in separate host_vars and group_vars directories.

Host variables:
Apply to one particular inventory host.

Group variables:
Apply to hosts belonging to an inventory group.

Role defaults:
Provide low-precedence default values for role inputs.

Role vars:
Provide higher-precedence role values.

Registered variables:
Store the result of a task.

set_fact:
Creates host-associated variables during execution.

Extra variables:
Passed through the command line using -e. These have very high precedence.

A good project avoids defining the same variable in many places.

A practical organization is:

inventory/
  development.ini
  production.ini

group_vars/
  all.yml
  webservers.yml
  databases.yml

host_vars/
  web01.yml
  db01.yml

This structure allows engineers to keep environment-specific and host-specific configuration separate.

A group variable applies to members of that group. A host variable provides configuration for one host.

If a host belongs to multiple groups, group variable interactions and group priority can become important. Define group relationships carefully and avoid relying on accidental merge behavior.

Ansible also supports variable files inside role directories and playbooks.

Use the simplest variable location that matches the scope of the value.`,
      steps: [
        "Decide whether the value belongs to one host, a group, a role, or a play.",
        "Use host_vars for host-specific configuration.",
        "Use group_vars for shared group configuration.",
        "Use role defaults for reusable role inputs.",
        "Use vars_files for organized external variable files.",
        "Use registered variables for task results.",
        "Use set_fact only when a runtime calculated value is required.",
        "Avoid defining the same setting in multiple locations without a clear reason."
      ],
      commands: `# Display inventory variables
ansible-inventory -i inventory/development.ini --list

# Display inventory group structure
ansible-inventory -i inventory/development.ini --graph

# Inspect one host's inventory data
ansible-inventory -i inventory/development.ini --host web01

# Run using a different inventory
ansible-playbook -i inventory/production.ini site.yml

# Load an extra variable file
ansible-playbook -i inventory/production.ini site.yml -e @vars/production.yml

# Override one variable
ansible-playbook -i inventory/production.ini site.yml -e "app_port=80"`,
      config: `# inventory/production.ini
[webservers]
web01 ansible_host=192.168.30.11
web02 ansible_host=192.168.30.12

[databases]
db01 ansible_host=192.168.30.21

# group_vars/webservers.yml
app_port: 80
app_environment: production

# host_vars/web01.yml
nginx_worker_connections: 2048

# group_vars/all.yml
timezone: UTC

# playbook vars
- name: Deploy application
  hosts: webservers
  vars:
    deployment_mode: rolling
  tasks:
    - name: Display deployment mode
      ansible.builtin.debug:
        var: deployment_mode

# Keep inventory-specific configuration outside reusable role tasks.`,
      problems: [
        {
          issue: "A group variable is not applied to a host.",
          rootCause: "The host may not belong to the expected inventory group or the group_vars directory is in the wrong location.",
          solution: "Inspect ansible-inventory --graph, verify inventory group names, and check the directory structure relative to the inventory or playbook."
        },
        {
          issue: "Host-specific configuration is overridden unexpectedly.",
          rootCause: "A higher-precedence value or another variable source defines the same name.",
          solution: "Review all variable sources, simplify duplicate definitions, and use host-specific names where appropriate."
        }
      ]
    },
    {
      heading: "4. Ansible Variable Precedence – Important Production Concept",
      explanation: `Variable precedence determines which value Ansible uses when the same variable name is defined in multiple places.

This is one of the most important topics for debugging large Ansible projects.

For example:

defaults/main.yml:
app_port: 8080

group_vars/webservers.yml:
app_port: 8081

host_vars/web01.yml:
app_port: 8082

Command line:
-e app_port=9090

The final value depends on the precedence of each source. Extra variables have very high precedence and can override normal inventory and role defaults.

Ansible has many precedence levels. It is better to learn the official precedence categories than to memorize an incomplete list.

Important concepts include:
- Configuration settings.
- Command-line options.
- Playbook keywords.
- Variables.
- Role defaults.
- Inventory variables.
- Registered variables.
- Facts.
- Extra variables.

Do not confuse variable precedence with playbook keyword precedence. They are separate concepts.

Within variable precedence, extra variables are among the highest-precedence sources.

Role defaults have low precedence and are intended to be overridden.

Role vars have much higher precedence than role defaults.

Inventory host variables and group variables have different precedence depending on their source and relationship.

When multiple groups define a variable, group hierarchy and group priority can affect the resulting value.

Avoid unnecessary duplicate variable definitions.

For production, document where each important variable is defined and which environment is expected to own it.

If a value is unexpectedly overridden, inspect the inventory, role, playbook, vars_files, and command-line extra variables.`,
      steps: [
        "Search the project for duplicate variable names.",
        "Identify each variable source.",
        "Check whether the value is defined as a role default or role var.",
        "Inspect host_vars and group_vars.",
        "Check playbook vars and vars_files.",
        "Check command-line -e values used by CI/CD.",
        "Simplify duplicate definitions.",
        "Verify the final rendered configuration."
      ],
      commands: `# Show inventory variables
ansible-inventory -i inventory.ini --list

# Inspect a specific host
ansible-inventory -i inventory.ini --host web01

# Display configuration changes
ansible-config dump --only-changed

# Run with a controlled variable override
ansible-playbook -i inventory.ini site.yml -e "app_port=9090"

# Run with verbose output
ansible-playbook -i inventory.ini site.yml -vvv

# Search project YAML files for a variable name
grep -R "app_port" .

# On Windows PowerShell, search files
Get-ChildItem -Recurse -Include *.yml,*.yaml,*.ini |
  Select-String -Pattern "app_port"`,
      config: `# defaults/main.yml
app_port: 8080

# group_vars/webservers.yml
app_port: 8081

# host_vars/web01.yml
app_port: 8082

# playbook.yml
- name: Configure web server
  hosts: webservers
  tasks:
    - name: Show selected value
      ansible.builtin.debug:
        var: app_port

# Command-line override
# ansible-playbook -i inventory.ini playbook.yml -e "app_port=9090"

# The final result depends on Ansible's variable precedence rules.
# Do not assume the first definition always wins.
# Extra variables have very high precedence.`,
      problems: [
        {
          issue: "A role default is ignored.",
          rootCause: "A higher-precedence variable source provides another value.",
          solution: "Inspect inventory, playbook vars, role vars, and extra variables. Keep overridable values in defaults/main.yml and remove conflicting definitions."
        },
        {
          issue: "Production deployment uses a development value.",
          rootCause: "The production inventory or CI/CD command loads the wrong variable file or supplies an overriding extra variable.",
          solution: "Verify the selected inventory, environment variable files, pipeline command, and effective configuration before deployment."
        }
      ]
    },
    {
      heading: "5. Registered Variables and set_fact",
      explanation: `Registered variables store the result returned by a task.

For example, an Ansible command task may execute a version command. We can register the output and use it in later tasks.

A registered result commonly contains fields such as:
- changed
- failed
- rc
- stdout
- stderr
- stdout_lines
- stderr_lines

The exact fields depend on the module and its return data.

Example:

- name: Check application version
  ansible.builtin.command: /opt/payment-api/bin/version
  register: app_version_result
  changed_when: false

A later task can read:

app_version_result.stdout

The register variable is associated with the host on which the task runs.

Use registered results for conditional decisions, validation, and reporting.

set_fact creates or updates a host-associated variable during execution.

For example, a playbook can calculate a deployment directory based on an application name.

Registered variables and set_fact solve different problems.

register captures a task result.

set_fact creates a variable from an expression or calculated value.

Do not use shell or command tasks when a dedicated Ansible module can perform the operation more reliably.

When registering sensitive task output, prevent accidental secret exposure and handle the data carefully.

A registered variable may be unavailable when its task is skipped in a conditional execution path. Design later tasks to account for skipped results.`,
      steps: [
        "Execute a task that returns useful information.",
        "Capture the task result using register.",
        "Inspect the returned fields.",
        "Use stdout or another appropriate result field.",
        "Apply conditions based on the result when required.",
        "Use set_fact for calculated host-specific values.",
        "Account for skipped or failed tasks.",
        "Avoid exposing sensitive registered output."
      ],
      commands: `# Run a playbook that registers command output
ansible-playbook -i inventory.ini version-check.yml

# Run a simple command through Ansible
ansible webservers -i inventory.ini -m ansible.builtin.command -a "/opt/payment-api/bin/version"

# Run a service check
ansible webservers -i inventory.ini -b -m ansible.builtin.command -a "systemctl is-active nginx"

# Execute with verbose output for debugging
ansible-playbook -i inventory.ini version-check.yml -vvv

# Validate syntax
ansible-playbook -i inventory.ini version-check.yml --syntax-check`,
      config: `# registered-variable.yml
---
- name: Check application version
  hosts: appservers
  tasks:
    - name: Read application version
      ansible.builtin.command:
        cmd: /opt/payment-api/bin/version
      register: app_version_result
      changed_when: false

    - name: Display application version
      ansible.builtin.debug:
        msg: "Installed version: {{ app_version_result.stdout }}"

    - name: Create deployment label
      ansible.builtin.set_fact:
        deployment_label: "{{ inventory_hostname }}-{{ app_version_result.stdout }}"

    - name: Display deployment label
      ansible.builtin.debug:
        var: deployment_label

# register stores the task result.
# changed_when false prevents a read-only check from reporting a change.
# set_fact creates a host-associated variable.
# stdout is a common field returned by command and shell modules.`,
      problems: [
        {
          issue: "A registered variable is undefined.",
          rootCause: "The task that should register the value did not run or the variable name is incorrect.",
          solution: "Check task order, conditions, indentation, and register name. Ensure the task executes before the variable is referenced."
        },
        {
          issue: "The registered result does not contain stdout.",
          rootCause: "The module may return data using a different structure or the task may not have executed as expected.",
          solution: "Inspect the result safely using debug, review the module documentation, and use the correct returned field."
        },
        {
          issue: "A condition fails when the registered task is skipped.",
          rootCause: "Later tasks assume a registered result exists even when the original task was skipped.",
          solution: "Handle skipped execution explicitly, structure conditions safely, and avoid referencing fields that are not available."
        }
      ]
    },
    {
      heading: "6. Ansible Facts – Automatic System Information",
      explanation: `Facts are information collected from managed nodes.

Ansible normally gathers facts at the beginning of a play when gather_facts is enabled.

Facts describe the target system.

Common facts include:
- Operating-system distribution.
- Operating-system version.
- Kernel version.
- Hostname.
- Network interfaces.
- IP addresses.
- CPU information.
- Memory information.
- Filesystem information.
- Architecture.
- Device information.

Facts are commonly accessed through the ansible_facts dictionary or compatible fact variables.

Examples:

ansible_facts['distribution']
ansible_facts['distribution_version']
ansible_facts['hostname']
ansible_facts['kernel']

Facts allow one playbook to adapt to different operating systems.

For example, a task may install a package based on the detected distribution.

Facts are gathered from managed hosts, not invented from the control node.

Fact gathering has a performance cost. In a large environment with hundreds of hosts, unnecessary fact gathering can increase execution time.

If the playbook does not need facts, use gather_facts: false.

However, do not disable fact gathering if later tasks depend on facts.

Ansible setup is the module commonly used to gather facts.

Facts can also be filtered to collect only relevant information.

Fact caching can preserve gathered facts between playbook runs. This can improve performance in suitable environments, but cached information may become stale.

Dynamic inventory and cached facts should be designed carefully so that automation does not make decisions using outdated host information.`,
      steps: [
        "Enable fact gathering when the play requires system information.",
        "Inspect facts using the setup module.",
        "Identify the facts needed by the automation.",
        "Use facts in conditions and templates.",
        "Filter fact gathering when appropriate.",
        "Disable gathering only when facts are unnecessary.",
        "Configure fact caching if it provides measurable value.",
        "Verify that cached facts are fresh enough for the task."
      ],
      commands: `# Gather facts from all hosts
ansible all -i inventory.ini -m ansible.builtin.setup

# Gather facts from one host
ansible web01 -i inventory.ini -m ansible.builtin.setup

# Gather distribution-related facts
ansible web01 -i inventory.ini -m ansible.builtin.setup -a "filter=ansible_distribution*"

# Gather network-related facts
ansible web01 -i inventory.ini -m ansible.builtin.setup -a "filter=ansible_*ipv4*"

# Gather memory-related facts
ansible web01 -i inventory.ini -m ansible.builtin.setup -a "filter=ansible_memory_mb"

# Run a playbook with fact gathering
ansible-playbook -i inventory.ini facts-report.yml

# Run a playbook without fact gathering
ansible-playbook -i inventory.ini site.yml`,
      config: `# facts-report.yml
---
- name: Display server facts
  hosts: all
  gather_facts: true

  tasks:
    - name: Display operating system
      ansible.builtin.debug:
        msg: "{{ ansible_facts['distribution'] }}"

    - name: Display OS version
      ansible.builtin.debug:
        var: ansible_facts['distribution_version']

    - name: Display hostname
      ansible.builtin.debug:
        var: ansible_facts['hostname']

    - name: Display kernel version
      ansible.builtin.debug:
        var: ansible_facts['kernel']

# Disable gathering when it is not required.
- name: Execute a simple task
  hosts: all
  gather_facts: false
  tasks:
    - name: Display inventory hostname
      ansible.builtin.debug:
        var: inventory_hostname

# inventory_hostname is an inventory variable, not an automatically gathered OS fact.`,
      problems: [
        {
          issue: "Ansible facts are undefined.",
          rootCause: "Fact gathering is disabled, the setup module did not execute, or the expected fact name is incorrect.",
          solution: "Enable gather_facts or explicitly run ansible.builtin.setup, then inspect the actual fact structure."
        },
        {
          issue: "Fact gathering makes the playbook slow.",
          rootCause: "Ansible collects more system information than the playbook needs across a large number of hosts.",
          solution: "Disable unnecessary gathering, use appropriate fact filters, and evaluate fact caching when suitable."
        },
        {
          issue: "The playbook uses outdated system facts.",
          rootCause: "Cached facts were not refreshed after the managed host changed.",
          solution: "Refresh facts when required, review cache expiration, and avoid relying on stale hardware or network information."
        }
      ]
    },
    {
      heading: "7. Magic Variables and Host-Level Information",
      explanation: `Magic variables are special variables supplied by Ansible. They provide information about the current play, host, inventory, and execution context.

Important examples:

inventory_hostname:
The current host's inventory name.

inventory_hostname_short:
The short form of the inventory hostname.

groups:
A dictionary of inventory groups and their member hosts.

hostvars:
A dictionary that provides access to variables for other hosts.

group_names:
The groups to which the current host belongs.

playbook_dir:
The directory containing the current playbook.

role_name:
The current role name in supported role execution contexts.

ansible_play_hosts:
The hosts still active in the current play.

ansible_play_batch:
The hosts in the current serial batch.

These variables are useful for multi-host automation.

For example, a web server may need to know the database server's address.

hostvars can access another host's variables, provided the relevant host and value are available.

Example:

hostvars['db01']['ansible_host']

Do not assume all remote facts are available for every host in every execution. A host may not have been contacted or its facts may not have been gathered.

Magic variables should not be redefined by users.

Use inventory_hostname when you need the inventory identity. Use ansible_facts['hostname'] when you need the hostname fact collected from the managed operating system.

These values can differ.`,
      steps: [
        "Use inventory_hostname to identify the current inventory host.",
        "Use group_names to inspect group membership.",
        "Use groups to iterate through inventory groups.",
        "Use hostvars to access other hosts' variables.",
        "Check whether required host facts have been gathered.",
        "Use ansible_play_batch for serial deployment logic.",
        "Avoid redefining special Ansible variables.",
        "Validate cross-host references before production execution."
      ],
      commands: `# Display inventory graph
ansible-inventory -i inventory.ini --graph

# Display inventory data
ansible-inventory -i inventory.ini --list

# Inspect a host's inventory variables
ansible-inventory -i inventory.ini --host db01

# Display facts for one host
ansible db01 -i inventory.ini -m ansible.builtin.setup

# Validate the playbook
ansible-playbook -i inventory.ini cluster-report.yml --syntax-check

# Show selected hosts
ansible-playbook -i inventory.ini cluster-report.yml --list-hosts`,
      config: `# cluster-report.yml
---
- name: Display inventory information
  hosts: all
  gather_facts: true

  tasks:
    - name: Display current inventory host
      ansible.builtin.debug:
        var: inventory_hostname

    - name: Display host groups
      ansible.builtin.debug:
        var: group_names

    - name: Display all web servers
      ansible.builtin.debug:
        var: groups['webservers']

    - name: Display database host address
      ansible.builtin.debug:
        msg: "{{ hostvars['db01']['ansible_host'] | default('Address not configured') }}"

# hostvars accesses another inventory host's variables.
# groups exposes inventory group membership.
# Use default for optional data.
# Ensure the referenced inventory host actually exists.`,
      problems: [
        {
          issue: "hostvars lookup fails for another server.",
          rootCause: "The referenced host name is incorrect or the expected host variable has not been defined.",
          solution: "Inspect the inventory, confirm the exact inventory_hostname, and check whether the required variable or fact is available."
        },
        {
          issue: "The playbook uses the wrong hostname.",
          rootCause: "The inventory name and the operating-system hostname are different.",
          solution: "Choose inventory_hostname for inventory identity and ansible_facts['hostname'] for the gathered operating-system hostname."
        }
      ]
    },
    {
      heading: "8. Conditional Logic, Jinja2 Filters and Dynamic Configuration",
      explanation: `Variables and facts become especially useful when combined with conditions and Jinja2 filters.

A condition allows a task to run only when a specific requirement is satisfied.

For example:
- Install a package only on Ubuntu.
- Configure a service only on web servers.
- Execute a task only when a port is enabled.
- Deploy an application only when its version changes.

Ansible uses when for conditional task execution.

Jinja2 filters transform values.

Common filters include:
- default: Supplies a fallback value.
- lower: Converts text to lowercase.
- upper: Converts text to uppercase.
- trim: Removes surrounding whitespace.
- length: Returns the number of items.
- join: Combines list elements.
- unique: Removes duplicate list values.
- int: Converts a compatible value to an integer.
- bool: Converts supported values to boolean form.
- to_json: Serializes a value as JSON.
- to_yaml: Serializes a value as YAML.
- combine: Merges dictionaries.

Use filters carefully and understand the data being transformed.

For example, converting a port to an integer can be useful for numeric comparison.

A default filter can prevent an undefined variable error, but it should not hide missing mandatory configuration.

For required production inputs, explicit validation is better than silently using an arbitrary fallback.

Use assert to validate important variables before making changes.

For example, a deployment role can assert that the application name is defined and the port is within the valid range.`,
      steps: [
        "Define the required input variables.",
        "Use when to control task execution.",
        "Use Jinja2 filters to normalize values.",
        "Use assert to validate mandatory inputs.",
        "Use default only for genuinely optional values.",
        "Check operating-system facts before platform-specific tasks.",
        "Render templates and inspect the final configuration.",
        "Test both matching and non-matching conditions."
      ],
      commands: `# Validate conditional playbook
ansible-playbook -i inventory.ini conditional-deploy.yml --syntax-check

# Display task execution plan
ansible-playbook -i inventory.ini conditional-deploy.yml --list-tasks

# Test with a specific environment value
ansible-playbook -i inventory.ini conditional-deploy.yml -e "app_environment=staging"

# Test with an alternate port
ansible-playbook -i inventory.ini conditional-deploy.yml -e "app_port=9090"

# Preview configuration changes
ansible-playbook -i inventory.ini conditional-deploy.yml --check --diff

# Execute against one host
ansible-playbook -i inventory.ini conditional-deploy.yml --limit web01`,
      config: `# conditional-deploy.yml
---
- name: Configure application
  hosts: webservers
  become: true
  gather_facts: true

  vars:
    app_name: payment-api
    app_port: 8080
    app_environment: production

  tasks:
    - name: Validate application port
      ansible.builtin.assert:
        that:
          - app_port is defined
          - app_port | int >= 1
          - app_port | int <= 65535
        fail_msg: "Application port must be between 1 and 65535."

    - name: Install Nginx on Debian-based systems
      ansible.builtin.apt:
        name: nginx
        state: present
        update_cache: true
      when: ansible_facts['os_family'] == "Debian"

    - name: Install Nginx on RedHat-based systems
      ansible.builtin.dnf:
        name: nginx
        state: present
      when: ansible_facts['os_family'] == "RedHat"

    - name: Display normalized environment
      ansible.builtin.debug:
        msg: "{{ app_environment | lower }}"

# Conditions use when without Jinja2 delimiters.
# Validate values before applying them.
# Platform-specific tasks should match supported operating systems.`,
      problems: [
        {
          issue: "A conditional task never executes.",
          rootCause: "The when expression evaluates to false because the value or fact differs from the expected condition.",
          solution: "Display the effective variable and fact values, correct the comparison, and test both branches."
        },
        {
          issue: "A default filter hides a configuration mistake.",
          rootCause: "A mandatory variable is treated as optional and silently receives a fallback value.",
          solution: "Use assert or mandatory validation for required values. Reserve defaults for genuinely optional configuration."
        }
      ]
    },
    {
      heading: "9. Real-Time Company Scenario – Environment-Aware Application Deployment",
      explanation: `Consider a company that operates a payment application in development, staging, and production.

Each environment has different settings:
- Development uses a lower resource allocation.
- Staging uses production-like configuration.
- Production uses approved service settings and stricter access controls.

The company wants one reusable deployment playbook.

Variables describe the application:
- Application name.
- Application version.
- Deployment directory.
- Service name.
- Listening port.
- Environment.
- Health-check URL.

Inventory groups identify the target systems.

Facts identify the operating system and available resources.

Registered variables capture the current application version.

set_fact can calculate a release directory.

Conditions can select platform-specific installation tasks.

Templates can generate environment-specific service configuration.

A production workflow:

1. CI builds the application artifact.
2. CI supplies a version and approved deployment inputs.
3. Ansible connects to the selected hosts.
4. Facts identify the operating system.
5. The current application version is checked.
6. The deployment directory is prepared.
7. The new release is deployed.
8. Service configuration is updated.
9. The service is restarted or reloaded when required.
10. A health check verifies the deployment.
11. The deployment result is recorded.

The playbook should fail if mandatory configuration is missing.

It should not print credentials.

It should deploy to a controlled batch of production hosts and verify application health before continuing.

Use separate inventories and variable files for each environment rather than maintaining separate copies of the entire playbook.`,
      steps: [
        "Create development, staging, and production inventories.",
        "Define application variables in environment-specific files.",
        "Validate mandatory deployment inputs.",
        "Gather operating-system facts.",
        "Capture the currently installed application version.",
        "Calculate the release directory.",
        "Deploy the application artifact.",
        "Render service configuration using templates.",
        "Restart the service only when necessary.",
        "Run application health checks.",
        "Record the deployed version and execution result."
      ],
      commands: `# Development deployment
ansible-playbook -i inventory/development.ini deploy.yml -e @vars/development.yml

# Staging deployment
ansible-playbook -i inventory/staging.ini deploy.yml -e @vars/staging.yml

# Production preview
ansible-playbook -i inventory/production.ini deploy.yml -e @vars/production.yml --check --diff

# Production deployment to one canary
ansible-playbook -i inventory/production.ini deploy.yml -e @vars/production.yml --limit app01

# Full production rollout after validation
ansible-playbook -i inventory/production.ini deploy.yml -e @vars/production.yml

# Verify application service
ansible appservers -i inventory/production.ini -b -m ansible.builtin.command -a "systemctl is-active payment-api"

# Verify application health endpoint
ansible appservers -i inventory/production.ini -m ansible.builtin.uri -a "url=http://localhost:8080/health status_code=200"`,
      config: `# vars/production.yml
---
app_name: payment-api
app_version: "2.4.1"
app_environment: production
app_port: 8080
app_directory: /opt/payment-api
app_service_name: payment-api
app_health_url: http://localhost:8080/health

# deploy.yml
---
- name: Deploy payment API
  hosts: appservers
  become: true
  gather_facts: true
  serial: 1

  tasks:
    - name: Validate required variables
      ansible.builtin.assert:
        that:
          - app_name is defined
          - app_version is defined
          - app_port is defined
          - app_directory is defined
        fail_msg: "Required deployment variables are missing."

    - name: Read installed application version
      ansible.builtin.command:
        cmd: "{{ app_directory }}/current/bin/version"
      register: current_version
      changed_when: false
      failed_when: false

    - name: Calculate release directory
      ansible.builtin.set_fact:
        release_directory: "{{ app_directory }}/releases/{{ app_version }}"

    - name: Display deployment information
      ansible.builtin.debug:
        msg: "Deploying {{ app_name }} version {{ app_version }} to {{ inventory_hostname }}"

# In a real project, add artifact retrieval and deployment tasks.
# Do not treat this sample as a complete payment application release pipeline.
# Protect deployment credentials and verify the actual service health.`,
      problems: [
        {
          issue: "The wrong application version is deployed.",
          rootCause: "The CI pipeline passes an incorrect extra variable or the environment variable file contains an outdated version.",
          solution: "Validate the artifact version, inspect pipeline inputs, verify the selected inventory, and record the deployed release identifier."
        },
        {
          issue: "Production deployment stops on one server.",
          rootCause: "The server may have a different operating system, missing prerequisite, insufficient disk space, or incorrect variable configuration.",
          solution: "Inspect the failed host, compare its facts with healthy hosts, correct the underlying issue, and resume with a controlled limit."
        }
      ]
    },
    {
      heading: "10. Fact Caching, Custom Facts and Production Performance",
      explanation: `Fact caching stores gathered facts so they can be reused in later playbook executions.

Without caching, Ansible normally gathers facts again when a play starts with fact gathering enabled.

In large environments, fact gathering can consume time and network resources.

Caching may reduce repeated work, but it introduces a freshness problem.

For example, if a server's IP address or memory allocation changes, cached facts may not immediately reflect the new state.

Choose a cache backend based on the environment and operational requirements.

Common fact cache approaches include memory and persistent backends such as JSON file or Redis, depending on the installed Ansible version and available plugins.

Memory cache is limited to the current process.

Persistent cache backends can retain facts between executions.

A custom fact is information supplied by the managed node, often through a local fact file.

Local facts can be stored under /etc/ansible/facts.d on supported Linux systems.

A local fact file can use INI or JSON format.

After creating or updating local facts, run setup again to collect them.

Use custom facts only when they provide useful host-specific information that cannot be represented more clearly through inventory variables or another data source.

Performance practices:
- Gather only the facts required.
- Use filters where appropriate.
- Tune forks based on controller and network capacity.
- Use persistent caching only when it provides value.
- Avoid unnecessary set_fact operations.
- Avoid huge nested variable structures when simpler data is sufficient.
- Measure playbook execution time before optimizing.`,
      steps: [
        "Measure current fact-gathering time.",
        "Identify whether repeated fact collection is a bottleneck.",
        "Choose an appropriate cache backend.",
        "Set a suitable cache timeout.",
        "Define how stale facts are refreshed.",
        "Use custom facts only for meaningful local metadata.",
        "Refresh facts after changing local fact files.",
        "Test cache behavior during host changes and failures."
      ],
      commands: `# Gather all facts
ansible all -i inventory.ini -m ansible.builtin.setup

# Gather facts again after a local fact change
ansible web01 -i inventory.ini -m ansible.builtin.setup

# Inspect a filtered fact
ansible web01 -i inventory.ini -m ansible.builtin.setup -a "filter=ansible_local"

# Display effective Ansible configuration
ansible-config dump --only-changed

# Run with timing information
ansible-playbook -i inventory.ini site.yml --profile-tasks

# If the installed Ansible environment does not provide the profile_tasks callback,
# configure an available callback plugin or use an approved timing method.

# Validate syntax
ansible-playbook -i inventory.ini site.yml --syntax-check`,
      config: `# Example ansible.cfg using a JSON file fact cache
[defaults]
gathering = smart
fact_caching = jsonfile
fact_caching_connection = ./fact_cache
fact_caching_timeout = 3600

# The cache directory must be protected appropriately.
# Confirm that the jsonfile cache plugin is available in your Ansible installation.
# Smart gathering and cache behavior should be tested before production use.

# Example custom fact file:
# /etc/ansible/facts.d/application.fact

[application]
name=payment-api
version=2.4.1
environment=production

# Access the local fact after gathering:
# ansible_facts['ansible_local']['application']['application']['version']

# Refresh the setup facts after updating the file.
# Protect custom fact files from unauthorized modification.`,
      problems: [
        {
          issue: "Fact caching returns old values.",
          rootCause: "The cached information has not expired or been refreshed after the managed host changed.",
          solution: "Refresh facts, adjust cache timeout, and define which facts must always be collected fresh."
        },
        {
          issue: "Fact caching fails because the cache directory is unavailable.",
          rootCause: "The configured cache path does not exist or the Ansible process cannot write to it.",
          solution: "Create the directory with appropriate permissions, verify the cache plugin, and test a new fact-gathering execution."
        },
        {
          issue: "Custom facts do not appear in ansible_facts.",
          rootCause: "The local fact file is in the wrong location, has invalid syntax, or setup has not been executed again.",
          solution: "Check /etc/ansible/facts.d, validate the INI or JSON file, and run ansible.builtin.setup."
        }
      ]
    },
    {
      heading: "11. Security, Validation and Senior Engineer Best Practices",
      explanation: `Variables often contain important infrastructure information. Some values are public configuration, while others are sensitive.

Ordinary configuration:
- Application name.
- Service port.
- Installation directory.
- Package version.
- Environment name.

Sensitive information:
- Database passwords.
- API tokens.
- Cloud credentials.
- Private keys.
- Service account passwords.
- Authentication secrets.

Do not commit plaintext secrets into Git.

Use Ansible Vault or an approved external secret manager.

Ansible Vault can encrypt files and individual strings.

Use no_log: true on tasks that may expose sensitive values in output.

Do not assume no_log encrypts stored data. It controls task output visibility.

Validate important variables using assert.

For example:
- Application name must not be empty.
- Port must be in the valid range.
- Environment must be an approved value.
- Release version must be provided.
- Deployment directory must be valid.

Use FQCN module names such as ansible.builtin.copy and ansible.builtin.template.

This improves clarity and avoids ambiguity between modules from different collections.

Senior engineers should also consider:
- Who owns the variables?
- Which source is authoritative?
- How are changes reviewed?
- How are environment values separated?
- How are secrets rotated?
- How are missing values detected?
- How are changes tested?
- How are incorrect values rolled back?

Variable validation should happen before destructive operations.

Do not rely only on successful YAML parsing. A syntactically valid variable file can still contain invalid business or infrastructure values.`,
      steps: [
        "Separate ordinary configuration from secrets.",
        "Encrypt secret files with Ansible Vault.",
        "Use no_log for sensitive task output.",
        "Validate mandatory variables before making changes.",
        "Use meaningful variable names and documented types.",
        "Avoid conflicting duplicate definitions.",
        "Use FQCN module names.",
        "Review variable changes through Git pull requests.",
        "Test invalid values and missing inputs.",
        "Verify the rendered configuration without exposing secrets."
      ],
      commands: `# Create an encrypted variable file
ansible-vault create vars/secrets.yml

# Edit an encrypted file
ansible-vault edit vars/secrets.yml

# Encrypt an existing YAML file
ansible-vault encrypt vars/secrets.yml

# Decrypt a file when explicitly required
ansible-vault decrypt vars/secrets.yml

# Run a playbook with Vault prompt
ansible-playbook -i inventory.ini site.yml --ask-vault-pass

# Run with a Vault password file
ansible-playbook -i inventory.ini site.yml --vault-password-file .vault-pass

# Validate playbook syntax
ansible-playbook -i inventory.ini site.yml --syntax-check

# Review changed configuration
ansible-playbook -i inventory.ini site.yml --check --diff`,
      config: `# Example encrypted file content after Vault decryption:
---
db_username: payment_user
db_password: "REPLACE_WITH_SECRET"

# Playbook using encrypted variables
---
- name: Deploy secure application configuration
  hosts: appservers
  become: true
  vars_files:
    - vars/secrets.yml

  tasks:
    - name: Validate application port
      ansible.builtin.assert:
        that:
          - app_port is defined
          - app_port | int >= 1
          - app_port | int <= 65535

    - name: Configure application credentials
      ansible.builtin.template:
        src: application.env.j2
        dest: /etc/payment-api/application.env
        owner: root
        group: root
        mode: "0600"
      no_log: true

# Never commit the real Vault password file to Git.
# Restrict access to encrypted data and execution logs.
# no_log protects task output; it does not replace encryption.`,
      problems: [
        {
          issue: "Vault decryption fails during CI execution.",
          rootCause: "The pipeline does not have the correct Vault password or secret-management integration.",
          solution: "Verify the authorized Vault credential source, pipeline permissions, and password file configuration without printing the secret."
        },
        {
          issue: "A required variable is missing during production deployment.",
          rootCause: "The deployment inputs were not validated before the role started changing infrastructure.",
          solution: "Add an assert validation stage at the beginning of the play and stop execution with a clear error when mandatory inputs are missing."
        },
        {
          issue: "A secret appears in Ansible logs.",
          rootCause: "A task or debug statement printed sensitive data without output protection.",
          solution: "Remove secret logging, apply no_log to sensitive tasks, restrict log access, and rotate any credential that may have been exposed."
        }
      ]
    },
    {
      heading: "12. Troubleshooting, RCA, Verification and Interview Questions",
      explanation: `When variables and facts fail, diagnose the source rather than changing random values.

Common failures:

Undefined variable:
Check spelling, scope, inventory membership, vars_files, and role defaults.

Unexpected value:
Check precedence and duplicate definitions.

Incorrect fact:
Check whether fact gathering is enabled and whether the fact name is correct.

Wrong operating-system branch:
Check ansible_facts distribution and os_family.

Registered variable missing:
Check task execution order and conditional skips.

Template rendering error:
Check undefined values, dictionary keys, and Jinja2 syntax.

Wrong environment:
Check inventory selection and CI/CD variable files.

Stale facts:
Check the configured fact cache and refresh requirements.

RCA procedure:

1. Capture the exact failing task and host.
2. Read the full error message.
3. Confirm the selected inventory.
4. Inspect group and host membership.
5. Identify every source defining the variable.
6. Check variable precedence.
7. Inspect facts when the task depends on operating-system information.
8. Reproduce the issue on one test host.
9. Correct the underlying variable or fact source.
10. Validate the playbook and rendered output.
11. Execute the playbook again.
12. Confirm the expected state on the managed node.

Verification is more than seeing a green Ansible result.

Check the actual service state, configuration, application endpoint, and deployed version.

Interview questions:

Q: What is an Ansible variable?
A: A named value used to make playbooks configurable and reusable.

Q: Where can variables be defined?
A: In playbooks, inventory, host_vars, group_vars, role defaults, role vars, vars_files, registered results, set_fact, and extra variables.

Q: What is variable precedence?
A: The ordering Ansible uses to decide which value wins when a variable is defined in multiple places.

Q: What is the difference between register and set_fact?
A: register stores a task result. set_fact creates or updates a host-associated variable.

Q: What are Ansible facts?
A: Information gathered from managed nodes, such as operating system, hostname, memory, and network details.

Q: What is gather_facts?
A: A play-level setting that controls automatic fact gathering.

Q: What is hostvars?
A: A special variable that provides access to variables associated with inventory hosts.

Q: What is group_vars?
A: A standard location for variables shared by inventory groups.

Q: What is fact caching?
A: Storing gathered facts so they can be reused across playbook executions when the configured cache supports it.

Q: How do you protect passwords?
A: Use Ansible Vault or an approved secret manager and prevent sensitive task output.

Senior engineer approach:
A production variable system should have clear ownership, predictable precedence, environment separation, validation, secret protection, and reliable verification. Never allow an unclear variable override to decide a production deployment.`,
      steps: [
        "Identify the failed host and task.",
        "Inspect the selected inventory.",
        "Review variable definitions and precedence.",
        "Inspect facts and registered results.",
        "Validate mandatory inputs.",
        "Test the correction on one host.",
        "Run syntax and execution checks.",
        "Verify service and application state.",
        "Confirm secrets are not exposed.",
        "Document the root cause and permanent fix."
      ],
      commands: `# Check syntax
ansible-playbook -i inventory.ini site.yml --syntax-check

# Inspect inventory graph
ansible-inventory -i inventory.ini --graph

# Inspect one host's variables
ansible-inventory -i inventory.ini --host web01

# Gather facts
ansible web01 -i inventory.ini -m ansible.builtin.setup

# Inspect a selected fact
ansible web01 -i inventory.ini -m ansible.builtin.setup -a "filter=ansible_distribution"

# Inspect playbook tasks
ansible-playbook -i inventory.ini site.yml --list-tasks

# Execute with detailed diagnostics
ansible-playbook -i inventory.ini site.yml --limit web01 -vvv

# Verify service state
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "systemctl is-active nginx"

# Verify application endpoint
ansible web01 -i inventory.ini -m ansible.builtin.uri -a "url=http://localhost:8080/health status_code=200"

# Review effective Ansible configuration
ansible-config dump --only-changed`,
      config: `# Final project structure
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
    web01.yml
  vars/
    development.yml
    staging.yml
    production.yml
    secrets.yml
  playbooks/
    site.yml
    deploy.yml
    facts-report.yml
  roles/
    common/
    nginx/
    payment_api/
  requirements.yml
  README.md

# Keep environment configuration separate.
# Keep sensitive variables encrypted.
# Document precedence-sensitive values.
# Validate all mandatory deployment inputs.
# Verify actual infrastructure state after execution.`,
      problems: [
        {
          issue: "A playbook succeeds but the application uses the wrong configuration.",
          rootCause: "The rendered template received an unexpected variable value due to precedence, incorrect inventory selection, or an environment file mismatch.",
          solution: "Inspect the selected inventory, review variable sources, render the configuration in a safe test environment, and verify the final file on the managed host."
        },
        {
          issue: "Facts show an unexpected operating-system version.",
          rootCause: "The wrong host was targeted, facts were cached, or the operating system was upgraded without refreshing the fact data.",
          solution: "Confirm inventory_hostname, refresh setup facts, review cache settings, and compare the actual managed-node operating-system information."
        },
        {
          issue: "A production deployment uses a default value when it should stop.",
          rootCause: "A required variable was given a permissive default instead of being validated.",
          solution: "Remove the inappropriate fallback, add assert validation, and fail before deployment when required values are missing."
        }
      ]
    }
  ]
};

export default noteData;
