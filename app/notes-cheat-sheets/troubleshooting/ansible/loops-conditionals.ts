import type { NoteData } from "../types";

const noteData: NoteData = {
  title: "Ansible Loops and Conditionals – Complete DevOps Engineer Technical Notes",
  description: "My detailed technical notebook covering Ansible loops, loop controls, conditions, when expressions, nested iterations, dictionaries, retries, until, failed_when, changed_when, Jinja2 tests, production automation, real-world workflows, troubleshooting, and senior DevOps interview knowledge.",
  sections: [
    {
      heading: "1. My Technical Notes – Why Loops and Conditions Are Important",
      explanation: `Loops and conditions are important features in Ansible because they allow an automation engineer to execute tasks repeatedly or selectively.

Imagine a company manages 100 Linux servers. Every server needs five packages:
- Git
- Curl
- Nginx
- Java
- Unzip

One approach is to create five separate package installation tasks. This works, but it creates repetitive YAML.

A loop allows one task to process all five package names.

The same concept applies to:
- Creating Linux users.
- Creating directories.
- Managing services.
- Copying files.
- Adding firewall rules.
- Creating application configuration.
- Deploying multiple applications.

A condition controls whether a task should execute.

For example:
- Install Nginx only on web servers.
- Install Apache only on servers that require Apache.
- Restart a service only when configuration changes.
- Deploy a new application version only when the requested version differs.
- Execute a task only when a disk usage threshold is exceeded.

Loops answer the question: how many items should this task process?

Conditions answer the question: under which circumstances should this task execute?

Ansible commonly uses loop and when for these purposes.

A loop uses item by default to represent the current element. A custom loop variable can be defined using loop_control.loop_var.

Conditions use when expressions. Do not wrap the complete when expression in Jinja2 delimiters.

Correct:
when: app_environment == "production"

Incorrect:
when: "{{ app_environment == 'production' }}"

Loops and conditions can be combined. For example, a task can iterate over application services and execute only for services marked as enabled.

Use loops to reduce repetition, but do not hide complicated business logic inside deeply nested YAML. Clear task files are easier to maintain and debug.`,
      steps: [
        "Identify repetitive operations in the playbook.",
        "Represent repeated values using a list or dictionary.",
        "Use loop to process the collection.",
        "Use item or a custom loop variable to access each value.",
        "Add conditions using when where required.",
        "Test the task with different input values.",
        "Inspect changed, skipped, and failed results.",
        "Verify the final state on managed nodes."
      ],
      commands: `# Validate playbook syntax
ansible-playbook -i inventory.ini loops-demo.yml --syntax-check

# Display all tasks
ansible-playbook -i inventory.ini loops-demo.yml --list-tasks

# Execute a loop example
ansible-playbook -i inventory.ini loops-demo.yml

# Execute on one host
ansible-playbook -i inventory.ini loops-demo.yml --limit web01

# Run with a different application environment
ansible-playbook -i inventory.ini loops-demo.yml -e "app_environment=staging"

# Preview supported changes
ansible-playbook -i inventory.ini loops-demo.yml --check --diff

# Enable verbose diagnostics
ansible-playbook -i inventory.ini loops-demo.yml -vvv`,
      config: `# Example variables
---
required_packages:
  - git
  - curl
  - nginx
  - unzip

# Example task
- name: Install required packages
  ansible.builtin.package:
    name: "{{ item }}"
    state: present
  loop: "{{ required_packages }}"

# item represents the current loop element.
# package installs each package through the appropriate package manager.
# A loop reduces duplicate task definitions.`,
      problems: [
        {
          issue: "A task executes only once instead of processing every value.",
          rootCause: "The loop is missing, the collection is empty, or the variable is not the expected list.",
          solution: "Inspect the variable structure, confirm the loop expression, and validate the playbook with a small test collection."
        },
        {
          issue: "A conditional task is skipped unexpectedly.",
          rootCause: "The when expression evaluates to false because the variable value or data type differs from the expected condition.",
          solution: "Display the effective value, inspect its type, and correct the comparison or variable definition."
        }
      ]
    },
    {
      heading: "2. Basic Loops Using loop",
      explanation: `The loop keyword is the standard way to repeat an Ansible task over a list of items.

Example:

required_packages:
  - git
  - curl
  - nginx

Task:

- name: Install packages
  ansible.builtin.package:
    name: "{{ item }}"
    state: present
  loop: "{{ required_packages }}"

Ansible executes the package task once for each element.

During the first iteration, item is git.

During the second iteration, item is curl.

During the third iteration, item is nginx.

The task result contains information about each iteration.

Use loop with:
- Package names.
- Usernames.
- Directory paths.
- Service names.
- Firewall ports.
- File names.
- Application names.

A loop should receive a list or another supported iterable structure.

When a variable contains one string instead of a list, the result may not be what the engineer expects.

Use YAML lists to represent multiple items.

You can also define a list directly in a task, but storing reusable lists in variables is easier to maintain.

The loop keyword is preferred over many older loop forms for normal iteration.

For a simple list, loop is generally clearer than creating separate tasks for each item.`,
      steps: [
        "Create a YAML list.",
        "Store the list in a variable.",
        "Reference the list using loop.",
        "Access the current element using item.",
        "Review each iteration's result.",
        "Test the loop with one item and multiple items.",
        "Verify the installed packages or created resources."
      ],
      commands: `# Run package installation loop
ansible-playbook -i inventory.ini package-loop.yml

# Run against one host
ansible-playbook -i inventory.ini package-loop.yml --limit web01

# Preview changes
ansible-playbook -i inventory.ini package-loop.yml --check --diff

# Validate syntax
ansible-playbook -i inventory.ini package-loop.yml --syntax-check

# Inspect available hosts
ansible-playbook -i inventory.ini package-loop.yml --list-hosts`,
      config: `# package-loop.yml
---
- name: Install packages using a loop
  hosts: webservers
  become: true
  gather_facts: true

  vars:
    required_packages:
      - git
      - curl
      - nginx
      - unzip

  tasks:
    - name: Install required packages
      ansible.builtin.package:
        name: "{{ item }}"
        state: present
      loop: "{{ required_packages }}"

# The package module supports the target system's package manager.
# Each list element becomes item.
# state present ensures the package is installed.
# Repeated execution should not reinstall an already installed package.`,
      problems: [
        {
          issue: "Ansible reports that the loop value must be a list.",
          rootCause: "The variable contains a scalar value or a structure that is not compatible with the task.",
          solution: "Define the variable as a YAML list and inspect its effective value before execution."
        },
        {
          issue: "One package fails while the remaining package operations continue.",
          rootCause: "The package name may be unavailable, the repository may be inaccessible, or the operating system may not support it.",
          solution: "Inspect the failed iteration, confirm package availability and repository health, then correct the package list for the target platform."
        }
      ]
    },
    {
      heading: "3. Loops with Dictionaries and Complex Data",
      explanation: `Real company automation often needs more than a simple list.

For example, a company may create multiple Linux users. Every user has a username, shell, and group.

A dictionary represents related key-value data.

A list of dictionaries represents multiple records.

Example:

application_users:
  - name: deploy
    shell: /bin/bash
    groups: wheel
  - name: monitoring
    shell: /bin/bash
    groups: monitoring

Each loop iteration provides a dictionary.

Access values using:
item.name
item.shell
item.groups

For complex dictionaries, bracket notation is also useful.

Example:
item['name']

When a list contains dictionaries, each dictionary represents one logical record.

This is useful for:
- Linux users.
- Application services.
- Firewall rules.
- Mount points.
- Database definitions.
- Monitoring targets.
- Scheduled jobs.

Do not use one huge nested structure for unrelated information. Keep variables organized by responsibility.

For nested loops, use loop_control.loop_var to give each loop a meaningful variable name.

This avoids confusion when an outer loop and an included task both use item.

For example:
application
database
user_record

Meaningful loop variable names make automation easier to read.`,
      steps: [
        "Design a list of dictionaries.",
        "Define the keys required for each record.",
        "Use loop to process each dictionary.",
        "Access fields using dot or bracket notation.",
        "Use loop_control.loop_var for nested loop clarity.",
        "Validate that every record contains required fields.",
        "Test missing and optional dictionary keys."
      ],
      commands: `# Validate dictionary loop example
ansible-playbook -i inventory.ini users.yml --syntax-check

# Execute user management tasks
ansible-playbook -i inventory.ini users.yml

# Execute on one server
ansible-playbook -i inventory.ini users.yml --limit web01

# Preview user changes
ansible-playbook -i inventory.ini users.yml --check --diff

# Inspect user accounts on a managed host
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "getent passwd deploy"`,
      config: `# users.yml
---
- name: Create company users
  hosts: linuxservers
  become: true

  vars:
    application_users:
      - name: deploy
        shell: /bin/bash
        groups: wheel
      - name: monitoring
        shell: /bin/bash
        groups: monitoring

  tasks:
    - name: Create application users
      ansible.builtin.user:
        name: "{{ user_record.name }}"
        shell: "{{ user_record.shell }}"
        groups: "{{ user_record.groups }}"
        append: true
        state: present
      loop: "{{ application_users }}"
      loop_control:
        loop_var: user_record
        label: "{{ user_record.name }}"

# loop_var replaces the default item name for this task.
# label keeps output readable.
# append true adds the specified supplementary group without replacing existing groups.
# Verify group names exist before creating users.`,
      problems: [
        {
          issue: "Ansible reports that a dictionary key is undefined.",
          rootCause: "A record does not contain the expected key or the task uses the wrong key name.",
          solution: "Inspect the list of dictionaries, standardize key names, and validate required fields before executing the user or application task."
        },
        {
          issue: "Nested loops use the wrong item value.",
          rootCause: "The inner and outer loops both use the default item variable.",
          solution: "Assign a distinct loop_control.loop_var to each loop and use meaningful variable names."
        }
      ]
    },
    {
      heading: "4. Loop Control, Index, Labels, Pause and Extended Results",
      explanation: `Ansible loop_control provides additional control over loop execution and output.

Important options include:

loop_var:
Changes the variable name used for the current item.

label:
Controls the value shown in task output for each iteration.

index_var:
Stores the current loop index in a variable.

pause:
Adds a delay between loop iterations.

extended:
Provides additional loop metadata.

extended_allitems:
Controls whether all loop items are included in extended metadata.

Loop indexes normally start at zero.

For example, index_var can be used when creating numbered configuration entries.

A label is useful when each dictionary contains many fields. Instead of printing the full dictionary in output, Ansible can display a short username or application name.

Pause can be useful when an API or external system requires requests to be spaced apart.

Do not use pause as a substitute for proper rate limiting or deployment orchestration.

For production deployments, serial at play level may be more appropriate than looping over individual hosts through an ordinary task.

Extended loop information can increase the amount of returned data. Use it only when the additional information is useful.

Loop control should improve readability and operational behavior, not make the playbook unnecessarily complicated.`,
      steps: [
        "Choose a meaningful loop variable.",
        "Add label when task output contains too much information.",
        "Use index_var when the iteration number is required.",
        "Use pause only when a delay is operationally necessary.",
        "Use extended metadata only when required.",
        "Inspect output to confirm the intended item is being processed.",
        "Keep production loops predictable and observable."
      ],
      commands: `# Validate loop control syntax
ansible-playbook -i inventory.ini loop-control.yml --syntax-check

# Execute loop control example
ansible-playbook -i inventory.ini loop-control.yml

# Display tasks
ansible-playbook -i inventory.ini loop-control.yml --list-tasks

# Run with verbose output
ansible-playbook -i inventory.ini loop-control.yml -vv

# Preview changes
ansible-playbook -i inventory.ini loop-control.yml --check --diff`,
      config: `# loop-control.yml
---
- name: Demonstrate loop control
  hosts: localhost
  connection: local
  gather_facts: false

  vars:
    services:
      - nginx
      - ssh
      - cron

  tasks:
    - name: Process service list
      ansible.builtin.debug:
        msg: "Processing {{ service_name }} at index {{ service_index }}"
      loop: "{{ services }}"
      loop_control:
        loop_var: service_name
        index_var: service_index
        label: "{{ service_name }}"
        extended: true

    - name: Demonstrate a controlled pause
      ansible.builtin.debug:
        msg: "Processed {{ item }}"
      loop:
        - first
        - second
      loop_control:
        pause: 1

# pause is measured in seconds.
# index_var starts at zero.
# localhost example does not modify remote infrastructure.`,
      problems: [
        {
          issue: "The loop output is difficult to understand.",
          rootCause: "Ansible displays large dictionaries or complex records for each iteration.",
          solution: "Use loop_control.label with a concise identifying field such as a username or service name."
        },
        {
          issue: "The loop index starts from an unexpected number.",
          rootCause: "The playbook assumes a one-based index, while the loop index is zero-based.",
          solution: "Adjust the expression intentionally when a human-readable one-based number is needed."
        }
      ]
    },
    {
      heading: "5. Conditions Using when, Facts and Comparisons",
      explanation: `The when keyword controls whether a task, block, or play executes.

Ansible evaluates the expression before running the task.

Examples:

when: app_environment == "production"

when: ansible_facts['os_family'] == "Debian"

when: nginx_enabled | bool

when: app_port | int > 1024

Conditions are useful for environment-specific and platform-specific automation.

Common comparison operators:
== equals.
!= not equal.
> greater than.
< less than.
>= greater than or equal.
<= less than or equal.

Logical operators:
and
or
not

A condition can check multiple requirements.

Example:
when:
  - app_enabled | bool
  - app_environment == "production"

A list of conditions under when is evaluated as a logical AND.

For logical OR, write an expression using or.

Conditions can also use Jinja2 tests.

Examples:
variable is defined
variable is undefined
variable is string
variable is number
variable is boolean
variable is iterable

Use type conversion carefully.

If app_port is stored as a string, convert it to an integer before numeric comparison.

Facts allow platform-specific execution.

For example, Debian-based systems commonly use apt, while Red Hat-family systems commonly use dnf or yum depending on platform and version.

Do not assume every distribution uses the same package manager or service names.

Use facts to choose the correct operation, and test all supported distributions.`,
      steps: [
        "Identify the requirement for executing a task.",
        "Select the correct variable or fact.",
        "Write a when expression.",
        "Use explicit type conversion when necessary.",
        "Combine conditions using and or or.",
        "Use defined and undefined tests for optional values.",
        "Test the true and false execution paths.",
        "Review skipped task output."
      ],
      commands: `# Execute for a specific environment
ansible-playbook -i inventory.ini site.yml -e "app_environment=production"

# Test a different operating system path
ansible-playbook -i inventory.ini site.yml --limit ubuntu01

# Display gathered OS facts
ansible all -i inventory.ini -m ansible.builtin.setup -a "filter=ansible_distribution*"

# Display OS family
ansible all -i inventory.ini -m ansible.builtin.setup -a "filter=ansible_os_family"

# Preview conditional tasks
ansible-playbook -i inventory.ini site.yml --list-tasks

# Run a syntax check
ansible-playbook -i inventory.ini site.yml --syntax-check`,
      config: `# conditional-tasks.yml
---
- name: Configure platform-specific packages
  hosts: all
  become: true
  gather_facts: true

  vars:
    install_web_server: true
    app_environment: production
    app_port: 8080

  tasks:
    - name: Install Nginx on Debian family
      ansible.builtin.apt:
        name: nginx
        state: present
        update_cache: true
      when:
        - ansible_facts['os_family'] == "Debian"
        - install_web_server | bool

    - name: Install Nginx on RedHat family
      ansible.builtin.dnf:
        name: nginx
        state: present
      when:
        - ansible_facts['os_family'] == "RedHat"
        - install_web_server | bool

    - name: Display production-only message
      ansible.builtin.debug:
        msg: "Production configuration selected"
      when: app_environment == "production"

    - name: Validate application port
      ansible.builtin.assert:
        that:
          - app_port | int >= 1
          - app_port | int <= 65535

# when expressions are not wrapped in {{ }}.
# Use facts gathered from the target host.
# Validate platform support before using distribution-specific modules.`,
      problems: [
        {
          issue: "A task is skipped even though the condition looks correct.",
          rootCause: "The variable contains a different value, capitalization, whitespace, or data type than expected.",
          solution: "Display the actual variable, normalize strings where appropriate, and explicitly convert numeric or boolean values."
        },
        {
          issue: "The operating-system condition fails on a supported server.",
          rootCause: "The condition checks a distribution name instead of the correct OS family or the facts were not gathered.",
          solution: "Inspect ansible_facts, enable fact gathering, and write a condition that matches the actual supported platform."
        }
      ]
    },
    {
      heading: "6. Combining Loops and Conditions",
      explanation: `Loops and conditions can be used together to process only selected items.

Imagine a company has three application services:
- Nginx enabled.
- Redis enabled.
- Legacy service disabled.

The playbook should manage only enabled services.

A list of dictionaries can contain an enabled field.

A loop processes every service record.

A condition checks the current record.

Example:

when: service.enabled | bool

Only records with enabled set to true execute the task.

This pattern is useful for:
- Optional services.
- Environment-specific packages.
- Selected users.
- Firewall rules.
- Monitoring agents.
- Application components.

A condition can also depend on the current loop item.

Be careful with undefined fields. If some dictionary records do not contain the enabled key, the expression may fail.

A safe data model defines the expected keys consistently or uses a valid default.

You can also filter a list before looping.

For example, select only enabled services using a Jinja2 selectattr filter.

Filtering can reduce the number of iterations, but it may make a complex expression harder to understand.

For a simple condition, use a task-level when.

For complicated filtering logic, calculate a clearly named list first and then loop over it.

Do not put critical business logic into one long Jinja2 expression. Make the input structure understandable and testable.`,
      steps: [
        "Create a list of structured records.",
        "Add an enabled or selected field to each record.",
        "Use loop to process records.",
        "Use when to select eligible records.",
        "Handle missing optional keys.",
        "Test both enabled and disabled items.",
        "Verify that disabled resources remain unchanged."
      ],
      commands: `# Run service selection playbook
ansible-playbook -i inventory.ini service-selection.yml

# Run with a different environment
ansible-playbook -i inventory.ini service-selection.yml -e "app_environment=staging"

# Preview selected changes
ansible-playbook -i inventory.ini service-selection.yml --check --diff

# Display selected tasks
ansible-playbook -i inventory.ini service-selection.yml --list-tasks

# Validate syntax
ansible-playbook -i inventory.ini service-selection.yml --syntax-check`,
      config: `# service-selection.yml
---
- name: Manage selected application services
  hosts: appservers
  become: true
  gather_facts: true

  vars:
    application_services:
      - name: nginx
        enabled: true
      - name: redis
        enabled: true
      - name: legacy-worker
        enabled: false

  tasks:
    - name: Manage enabled services
      ansible.builtin.service:
        name: "{{ service_record.name }}"
        state: started
        enabled: true
      loop: "{{ application_services }}"
      loop_control:
        loop_var: service_record
        label: "{{ service_record.name }}"
      when: service_record.enabled | bool

# Only enabled records reach the service task.
# Ensure service packages already exist.
# Validate the service names for the target operating system.`,
      problems: [
        {
          issue: "The task fails because an enabled field is missing.",
          rootCause: "Some dictionaries do not follow the expected data structure.",
          solution: "Make the data structure consistent or use a carefully chosen default for an optional field."
        },
        {
          issue: "A disabled service is unexpectedly started.",
          rootCause: "The condition uses the wrong dictionary field or a string value is interpreted incorrectly.",
          solution: "Inspect each record, use boolean values, and validate the exact expression with a small test playbook."
        }
      ]
    },
    {
      heading: "7. Retry Logic Using until, retries and delay",
      explanation: `In real infrastructure, not every operation succeeds immediately.

A service may take time to start. An application may need several seconds before its health endpoint becomes available.

Ansible supports retry logic through:
- until
- retries
- delay

until defines the condition that must become true.

retries controls how many attempts Ansible makes.

delay defines the waiting period between attempts in seconds.

Example:

- name: Wait for application health
  ansible.builtin.uri:
    url: http://localhost:8080/health
    status_code: 200
  register: health_result
  until: health_result.status == 200
  retries: 10
  delay: 5

The task keeps trying until the condition succeeds or the retry limit is reached.

Retry logic is useful for:
- Service startup.
- API readiness.
- Database availability.
- Cloud resource provisioning.
- Load balancer health checks.
- Temporary network conditions.

Do not use retries to hide permanent errors.

If the URL is incorrect, credentials are invalid, or the service cannot start, repeated attempts may only waste time.

Use a meaningful delay and retry count based on the expected system behavior.

A retry task should have a clear final failure message or a follow-up diagnostic task.

For critical production operations, combine retry logic with monitoring and rollback planning.`,
      steps: [
        "Identify an operation that may need time to complete.",
        "Capture its result using register.",
        "Define a precise until condition.",
        "Choose an appropriate retry count.",
        "Choose a realistic delay.",
        "Inspect the final result when retries are exhausted.",
        "Add diagnostic checks for persistent failure.",
        "Verify the service or resource independently."
      ],
      commands: `# Run application readiness check
ansible-playbook -i inventory.ini health-check.yml

# Run only against one application host
ansible-playbook -i inventory.ini health-check.yml --limit app01

# Enable detailed retry output
ansible-playbook -i inventory.ini health-check.yml -vvv

# Validate syntax
ansible-playbook -i inventory.ini health-check.yml --syntax-check

# Check the application endpoint manually
ansible app01 -i inventory.ini -m ansible.builtin.uri -a "url=http://localhost:8080/health status_code=200"`,
      config: `# health-check.yml
---
- name: Wait for application readiness
  hosts: appservers
  gather_facts: false

  tasks:
    - name: Check application health
      ansible.builtin.uri:
        url: http://localhost:8080/health
        method: GET
        status_code: 200
        return_content: true
      register: health_result
      until: health_result.status == 200
      retries: 10
      delay: 5

    - name: Display health result
      ansible.builtin.debug:
        msg: "Application health check passed."

# The uri module returns an HTTP status.
# until checks the registered result.
# retries and delay define the retry behavior.
# The example assumes the health endpoint returns HTTP 200.`,
      problems: [
        {
          issue: "Ansible exhausts all retries while waiting for the application.",
          rootCause: "The application may not be running, the endpoint may be incorrect, or the service requires more time to become ready.",
          solution: "Inspect service status and application logs, verify the URL and port, and adjust retry settings only after identifying the actual startup behavior."
        },
        {
          issue: "A retry loop takes too long.",
          rootCause: "The retry count and delay are larger than necessary or the task is retrying a permanent failure.",
          solution: "Use realistic retry settings, fail quickly on permanent configuration errors, and monitor the service startup process."
        }
      ]
    },
    {
      heading: "8. Error Control Using failed_when and changed_when",
      explanation: `Ansible modules normally report whether a task changed the system and whether it failed.

Some command-line operations do not return status information in a way that matches the intended automation logic.

failed_when allows an engineer to define a custom failure condition.

changed_when allows an engineer to define when a task should be reported as changed.

Example:
A command checks an application's version. It only reads information and should not report a change.

changed_when: false

Another command checks service output. If a specific error string appears, the task may be considered failed.

failed_when: "'ERROR' in result.stderr"

These controls are useful when using command and shell modules.

However, prefer dedicated Ansible modules wherever possible.

A common mistake is to set failed_when: false on every task. This hides real failures and produces misleading successful playbook output.

Another mistake is to use changed_when: true for read-only commands. This makes every run appear to modify the system.

A good task should report accurate state.

For example:
- Version checks should normally be unchanged.
- Configuration deployment should change only when content differs.
- Service status checks should not report changes.
- A failed validation should stop deployment.

You can use registered variables in changed_when and failed_when expressions.

Be careful with return codes, stdout, and stderr because their contents depend on the command or module.`,
      steps: [
        "Identify the expected success and failure behavior.",
        "Capture command results using register.",
        "Define failed_when for custom failure conditions.",
        "Define changed_when for accurate change reporting.",
        "Prefer native modules over shell commands.",
        "Test successful, failed, and unchanged outcomes.",
        "Avoid suppressing failures without a recovery strategy.",
        "Run the playbook twice to verify accurate reporting."
      ],
      commands: `# Validate error-handling playbook
ansible-playbook -i inventory.ini result-control.yml --syntax-check

# Execute with verbose output
ansible-playbook -i inventory.ini result-control.yml -vv

# Execute against one host
ansible-playbook -i inventory.ini result-control.yml --limit web01

# Preview supported changes
ansible-playbook -i inventory.ini result-control.yml --check --diff

# Check a command return code manually
ansible web01 -i inventory.ini -m ansible.builtin.command -a "systemctl is-active nginx"`,
      config: `# result-control.yml
---
- name: Validate application state
  hosts: appservers
  gather_facts: false

  tasks:
    - name: Read application version
      ansible.builtin.command:
        cmd: /opt/payment-api/bin/version
      register: version_result
      changed_when: false
      failed_when: version_result.rc != 0

    - name: Display version
      ansible.builtin.debug:
        msg: "Version: {{ version_result.stdout }}"

    - name: Validate service output
      ansible.builtin.command:
        cmd: systemctl is-active payment-api
      register: service_result
      changed_when: false
      failed_when: service_result.rc != 0

# Read-only checks should normally use changed_when false.
# failed_when defines a meaningful failure condition.
# Prefer service_facts or service modules where they meet the requirement.`,
      problems: [
        {
          issue: "A playbook reports changed on every run.",
          rootCause: "A command task is not idempotent or changed_when is not configured for a read-only operation.",
          solution: "Use a native Ansible module where possible and define changed_when accurately for read-only commands."
        },
        {
          issue: "A playbook reports success even though a critical operation failed.",
          rootCause: "failed_when was disabled or errors were ignored without validation.",
          solution: "Restore meaningful failure conditions, remove unnecessary error suppression, and verify the actual service state."
        }
      ]
    },
    {
      heading: "9. Blocks, Rescue, Always and Structured Error Recovery",
      explanation: `Ansible blocks group tasks together and allow structured error handling.

A block contains the main operations.

A rescue section contains recovery operations that run when a task in the block fails.

An always section contains cleanup or reporting operations that run after the block or rescue processing.

This is useful for deployment workflows.

Example:
1. Stop or prepare an application.
2. Deploy a new release.
3. Validate the configuration.
4. Restart the service.
5. Check application health.

If a deployment task fails, rescue can restore a previous release or perform diagnostic operations.

Always can record the deployment result or remove temporary files.

Important behavior:
A successful rescue can cause Ansible to continue as though the block failure was recovered. It does not mean the original failed operation succeeded.

Use explicit failure reporting when a recovery operation cannot restore the intended state.

Blocks can also apply common settings such as become, when, and tags to grouped tasks.

Do not build a complicated recovery mechanism without testing failure scenarios.

A rollback should be based on a known-good release and should itself be verified.

Rescue is not a replacement for monitoring, backups, or a formal disaster recovery process.`,
      steps: [
        "Group related deployment operations inside a block.",
        "Identify recoverable failure scenarios.",
        "Define rescue actions.",
        "Use always for cleanup or reporting.",
        "Capture important results for diagnosis.",
        "Verify the rollback or recovery operation.",
        "Fail clearly when recovery is unsuccessful.",
        "Test the recovery path in a non-production environment."
      ],
      commands: `# Validate block and rescue syntax
ansible-playbook -i inventory.ini deployment-recovery.yml --syntax-check

# Run deployment recovery workflow
ansible-playbook -i inventory.ini deployment-recovery.yml

# Test against one host
ansible-playbook -i inventory.ini deployment-recovery.yml --limit app01

# Enable detailed diagnostics
ansible-playbook -i inventory.ini deployment-recovery.yml -vvv

# Preview supported changes
ansible-playbook -i inventory.ini deployment-recovery.yml --check --diff`,
      config: `# deployment-recovery.yml
---
- name: Deploy application with recovery
  hosts: appservers
  become: true

  tasks:
    - name: Deployment workflow
      block:
        - name: Deploy release
          ansible.builtin.debug:
            msg: "Deploying new release"

        - name: Validate application configuration
          ansible.builtin.command:
            cmd: /usr/local/bin/payment-api-validate
          changed_when: false

      rescue:
        - name: Record deployment failure
          ansible.builtin.debug:
            msg: "Deployment failed. Starting recovery procedure."

        - name: Execute approved rollback
          ansible.builtin.command:
            cmd: /usr/local/bin/payment-api-rollback
          register: rollback_result
          changed_when: rollback_result.rc == 0
          failed_when: rollback_result.rc != 0

      always:
        - name: Record workflow completion
          ansible.builtin.debug:
            msg: "Deployment workflow finished."

# Replace sample scripts with approved company deployment commands.
# A successful rescue does not prove the new release was deployed.
# Verify the application after recovery.`,
      problems: [
        {
          issue: "Rescue does not run after a task fails.",
          rootCause: "The failure may be an unreachable host or another condition that is not handled as an ordinary task failure.",
          solution: "Inspect the exact failure type and design host recovery or connection handling separately where necessary."
        },
        {
          issue: "A failed deployment is reported as successful after rescue.",
          rootCause: "The rescue task completed successfully, allowing the play to continue.",
          solution: "Record the original failure state and explicitly fail the workflow if the business requirement is that a failed deployment must remain failed after rollback."
        },
        {
          issue: "The rollback executes but the application remains unavailable.",
          rootCause: "The rollback restored files but did not restore service state, configuration, or dependent resources.",
          solution: "Include release verification, service checks, and health endpoint validation in the recovery workflow."
        }
      ]
    },
    {
      heading: "10. Real-Time Company Scenario – Multi-Service Deployment",
      explanation: `Imagine a company operates a business application with multiple components:

- Nginx reverse proxy.
- Payment API.
- Redis cache.
- Monitoring exporter.
- Background worker.

Each component has different configuration and operational requirements.

Ansible variables describe the required services and their configuration.

Loops process the service definitions.

Conditions select services enabled in the current environment.

Retries wait for application readiness.

failed_when validates critical commands.

changed_when prevents read-only checks from reporting false changes.

Blocks and rescue provide controlled recovery.

A real deployment workflow:

1. CI builds and publishes the application artifact.
2. CI supplies the release version.
3. Ansible validates required variables.
4. Ansible checks target host facts.
5. Required packages are installed using loops.
6. Enabled services are configured conditionally.
7. Application templates are rendered.
8. Service handlers reload changed configuration.
9. The application is deployed.
10. A retry loop waits for the health endpoint.
11. A failure triggers the recovery workflow.
12. The deployment result is verified.

Production deployments should use controlled batches.

serial can limit the number or percentage of hosts processed at a time.

Do not confuse serial with a task loop. serial controls play execution batches across hosts; loop repeats a task over items on a host.

For a large application fleet, use canary deployments and health verification before expanding to the next batch.`,
      steps: [
        "Prepare environment-specific inventories.",
        "Validate application and release variables.",
        "Gather required host facts.",
        "Install common packages through loops.",
        "Select enabled services using conditions.",
        "Deploy configuration templates.",
        "Restart only services whose configuration changed.",
        "Wait for the health endpoint using retries.",
        "Use rescue for approved rollback actions.",
        "Deploy to remaining hosts after canary verification."
      ],
      commands: `# Validate production deployment
ansible-playbook -i inventory/production.ini deploy.yml --syntax-check

# Review the hosts
ansible-playbook -i inventory/production.ini deploy.yml --list-hosts

# Preview the tasks
ansible-playbook -i inventory/production.ini deploy.yml --list-tasks

# Deploy to one canary
ansible-playbook -i inventory/production.ini deploy.yml --limit app01

# Deploy to a staging environment
ansible-playbook -i inventory/staging.ini deploy.yml

# Deploy to production
ansible-playbook -i inventory/production.ini deploy.yml

# Verify application health
ansible appservers -i inventory/production.ini -m ansible.builtin.uri -a "url=http://localhost:8080/health status_code=200"

# Inspect service logs
ansible appservers -i inventory/production.ini -b -m ansible.builtin.command -a "journalctl -u payment-api -n 50 --no-pager"`,
      config: `# deploy.yml
---
- name: Deploy payment platform
  hosts: appservers
  become: true
  gather_facts: true
  serial: 1

  vars:
    required_packages:
      - curl
      - unzip
    application_services:
      - name: payment-api
        enabled: true
      - name: background-worker
        enabled: true
      - name: legacy-worker
        enabled: false
    app_version: "2.4.1"

  tasks:
    - name: Validate deployment version
      ansible.builtin.assert:
        that:
          - app_version is defined
          - app_version | length > 0

    - name: Install required packages
      ansible.builtin.package:
        name: "{{ item }}"
        state: present
      loop: "{{ required_packages }}"

    - name: Display enabled services
      ansible.builtin.debug:
        msg: "Service selected: {{ service_record.name }}"
      loop: "{{ application_services }}"
      loop_control:
        loop_var: service_record
        label: "{{ service_record.name }}"
      when: service_record.enabled | bool

    - name: Check application health
      ansible.builtin.uri:
        url: http://localhost:8080/health
        status_code: 200
      register: health_result
      until: health_result.status == 200
      retries: 10
      delay: 5

# This is a workflow structure example.
# Add actual artifact deployment and service management for the target platform.
# serial 1 processes one host at a time.
# Verify health before continuing with a larger rollout.`,
      problems: [
        {
          issue: "One service fails while the other services are healthy.",
          rootCause: "The failing service may have a missing dependency, invalid configuration, incorrect port, or incompatible release.",
          solution: "Inspect the failed service independently, review its logs and variables, correct the dependency or configuration, and rerun only the necessary deployment scope."
        },
        {
          issue: "A rollout continues even though the health check is failing.",
          rootCause: "The health check is not a required task, the failure is ignored, or the recovery logic masks the original failure.",
          solution: "Make health validation mandatory, remove unnecessary error suppression, and stop expansion of the rollout until the service is healthy."
        }
      ]
    },
    {
      heading: "11. Performance, Security and Production Best Practices",
      explanation: `Loops and conditions can make automation powerful, but poor design can increase execution time and operational risk.

Performance:
- Avoid unnecessary loops over very large collections.
- Use package modules with a list of package names when supported by the module.
- Avoid repeating fact gathering.
- Use serial for controlled host batches.
- Tune forks according to controller and network capacity.
- Avoid unnecessary pauses.
- Keep nested data structures understandable.

Reliability:
- Validate loop input structures.
- Use meaningful loop variable names.
- Handle missing dictionary keys.
- Make retry conditions precise.
- Distinguish temporary failures from permanent failures.
- Keep changed_when accurate.
- Keep failed_when meaningful.

Security:
- Do not place passwords in ordinary loop data.
- Use Vault or a secure secret manager.
- Protect sensitive output with no_log.
- Restrict privilege escalation.
- Review commands before executing them on production hosts.

Maintainability:
- Store reusable lists in variables.
- Split complex workflows into task files.
- Use clear task names.
- Avoid deeply nested conditions.
- Document why a task is conditional.
- Test both true and false branches.

Production verification:
- Run syntax checks.
- Preview changes where supported.
- Test on one host.
- Check service state.
- Verify application health.
- Inspect logs.
- Confirm that the second execution is idempotent.

A green playbook is not sufficient evidence that the application is healthy.`,
      steps: [
        "Keep loop data structures small and clear.",
        "Use native modules instead of shell loops.",
        "Use conditions only when needed.",
        "Validate all mandatory inputs.",
        "Avoid unnecessary error suppression.",
        "Protect sensitive task data.",
        "Use controlled production batches.",
        "Test retry and rollback behavior.",
        "Verify the actual application state.",
        "Document operational decisions."
      ],
      commands: `# Validate syntax
ansible-playbook -i inventory.ini site.yml --syntax-check

# Preview supported changes
ansible-playbook -i inventory.ini site.yml --check --diff

# Review task structure
ansible-playbook -i inventory.ini site.yml --list-tasks

# Deploy to a canary
ansible-playbook -i inventory.ini site.yml --limit app01

# Check service health
ansible appservers -i inventory.ini -b -m ansible.builtin.command -a "systemctl is-active payment-api"

# Check HTTP health
ansible appservers -i inventory.ini -m ansible.builtin.uri -a "url=http://localhost:8080/health status_code=200"

# Inspect service logs
ansible appservers -i inventory.ini -b -m ansible.builtin.command -a "journalctl -u payment-api -n 50 --no-pager"`,
      config: `# ansible.cfg
[defaults]
inventory = ./inventory.ini
forks = 10
timeout = 30
host_key_checking = True
retry_files_enabled = False

# Example production play
---
- name: Controlled application rollout
  hosts: appservers
  become: true
  serial: 2
  max_fail_percentage: 0

  tasks:
    - name: Validate required input
      ansible.builtin.assert:
        that:
          - app_version is defined
          - app_version | length > 0

# Tune forks and serial according to the actual environment.
# Keep host key checking enabled.
# Do not suppress critical failures to obtain a green pipeline.`,
      problems: [
        {
          issue: "A loop creates too many remote operations and deployment takes too long.",
          rootCause: "The playbook repeats individual operations that could be grouped or handled more efficiently.",
          solution: "Use modules that accept lists where appropriate, reduce unnecessary iterations, and measure the impact before changing concurrency."
        },
        {
          issue: "A production condition accidentally skips a required security task.",
          rootCause: "The condition is too broad or depends on an unreliable variable.",
          solution: "Use explicit approved conditions, validate required variables, and test both matching and non-matching cases before production rollout."
        }
      ]
    },
    {
      heading: "12. Troubleshooting, RCA, Verification and Interview Questions",
      explanation: `When a loop or condition fails, inspect the actual input and the result of each iteration.

Common problems:

Loop expects a list:
The variable is a string, dictionary, or missing value.

Dictionary key missing:
A loop record does not contain the required field.

Wrong loop variable:
Nested loops reuse item and overwrite the expected reference.

Condition always false:
The value or data type does not match the expression.

Retry never succeeds:
The service is unhealthy or the until expression checks the wrong result field.

Task always changed:
changed_when is inaccurate or the underlying command is not idempotent.

Failure is hidden:
failed_when or ignore_errors suppresses a genuine error.

RCA process:

1. Identify the failed task.
2. Identify the affected host.
3. Inspect the loop input.
4. Inspect the current item.
5. Review the condition.
6. Check data types.
7. Inspect registered output.
8. Verify the remote service.
9. Fix the input or logic.
10. Run the task again on one host.
11. Verify the expected state.

Useful debugging techniques include:
- ansible-playbook -vvv
- debug with var
- assert
- registered results
- setup facts
- inventory inspection

Interview questions:

Q: What is a loop in Ansible?
A: A mechanism for repeating a task over a collection of items.

Q: What is the difference between loop and when?
A: loop repeats a task over items. when decides whether the task executes.

Q: What is item?
A: The default variable representing the current loop element.

Q: What is loop_control?
A: It controls loop behavior and metadata, including loop_var, label, index_var, and pause.

Q: What is the difference between retries and until?
A: until defines the success condition. retries defines the maximum number of attempts.

Q: What is delay?
A: The waiting period between retry attempts.

Q: What is failed_when?
A: A custom expression that determines whether a task should be treated as failed.

Q: What is changed_when?
A: A custom expression that determines whether a task should report a change.

Q: What are block, rescue, and always?
A: They group tasks, define recovery operations, and define operations that should run after the block processing.

Q: What is serial?
A: A play-level setting that controls how many hosts are processed in each batch.

Q: Can loops and conditions be combined?
A: Yes. A task can iterate over a collection and execute only when the current item satisfies a condition.

Senior engineer decision:
Use loops for repeated operations, conditions for explicit decisions, retries for temporary conditions, and failure controls for accurate task results. Always verify the final application state rather than relying only on playbook status.`,
      steps: [
        "Run syntax validation.",
        "Inspect the selected hosts.",
        "Inspect loop input and variable types.",
        "Review the exact when expression.",
        "Inspect registered task results.",
        "Check retry conditions and final status.",
        "Review changed and failed reporting.",
        "Reproduce the issue on one host.",
        "Correct the root cause.",
        "Verify service health and idempotence."
      ],
      commands: `# Syntax validation
ansible-playbook -i inventory.ini site.yml --syntax-check

# Inspect hosts
ansible-playbook -i inventory.ini site.yml --list-hosts

# Inspect tasks
ansible-playbook -i inventory.ini site.yml --list-tasks

# Inspect inventory variables
ansible-inventory -i inventory.ini --list

# Inspect one host
ansible-inventory -i inventory.ini --host web01

# Execute with detailed diagnostics
ansible-playbook -i inventory.ini site.yml --limit web01 -vvv

# Inspect OS facts
ansible web01 -i inventory.ini -m ansible.builtin.setup

# Verify service state
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "systemctl is-active nginx"

# Verify application endpoint
ansible web01 -i inventory.ini -m ansible.builtin.uri -a "url=http://localhost:8080/health status_code=200"

# Review effective configuration
ansible-config dump --only-changed`,
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
  playbooks/
    site.yml
    deploy.yml
    health-check.yml
  roles/
    common/
    nginx/
    payment_api/
  vars/
    development.yml
    staging.yml
    production.yml
  requirements.yml
  README.md

# Keep loops and conditions close to the tasks they control.
# Store reusable input data in well-named variable files.
# Separate environment configuration.
# Validate all deployment inputs before changing production.
# Record the root cause and permanent fix for recurring failures.`,
      problems: [
        {
          issue: "A loop executes against the wrong resource.",
          rootCause: "The loop variable references the wrong field or the input data contains an unexpected record.",
          solution: "Inspect each record, use loop_control.loop_var, validate the data structure, and test the task with a small known collection."
        },
        {
          issue: "A task is skipped unexpectedly in production.",
          rootCause: "The condition uses a development value, an undefined fact, or an incorrect comparison.",
          solution: "Inspect the effective variable and fact values, verify inventory selection, and test the condition against the production data."
        },
        {
          issue: "A deployment continues after a failed health check.",
          rootCause: "The health-check task is ignored or its failure condition is incorrectly defined.",
          solution: "Make the health check mandatory, define accurate failure behavior, and stop the rollout when the application is unhealthy."
        }
      ]
    }
  ]
};

export default noteData;
