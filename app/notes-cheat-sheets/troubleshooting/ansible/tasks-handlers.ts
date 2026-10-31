import type { NoteData } from "../types";

const noteData: NoteData = {
  title: "Ansible Tasks and Handlers – Complete DevOps Engineer Technical Notes",
  description: "My detailed personal technical notebook covering Ansible tasks, handlers, notify, listen, handler execution order, conditional execution, loops, service management, configuration deployment, production workflows, troubleshooting, root cause analysis, and senior DevOps engineering practices.",
  sections: [
    {
      heading: "1. My Technical Notes – Understanding Tasks and Handlers",
      explanation: `Tasks and handlers are fundamental building blocks of Ansible automation.

A task represents one operation that Ansible should perform on a managed host.

Examples:
- Install Nginx.
- Create a Linux user.
- Copy an application file.
- Create a directory.
- Configure a firewall.
- Start a service.
- Validate an application endpoint.
- Deploy a configuration file.

A playbook contains one or more plays. A play contains tasks. Each task normally invokes an Ansible module.

A handler is a special type of task that normally executes only when another task notifies it.

The most common use case is restarting or reloading a service after its configuration changes.

Imagine a company manages 50 Nginx servers.

Ansible deploys an Nginx configuration file to each server.

If the configuration is identical to the existing file, the copy or template task reports unchanged. The restart handler is not notified.

If the configuration content changes, the task reports changed and notifies the handler.

The handler restarts or reloads Nginx.

This is important because restarting services unnecessarily can cause connection interruptions, consume resources, and create operational risk.

Main difference:

Task:
Executes as part of normal playbook task processing when its conditions are satisfied.

Handler:
Is normally scheduled through notification and executed at a handler execution point.

Important concepts:
- notify connects a task to a handler.
- handlers run after the normal task section at a handler execution point.
- multiple notifications to the same handler normally result in one handler execution per host per flush cycle.
- handlers run in the order in which they are defined, not necessarily in the order in which they are notified.
- a handler can listen to a topic using listen.
- meta: flush_handlers forces pending handlers to execute at that point.

Handlers are particularly useful for:
- Restarting services.
- Reloading Nginx.
- Restarting application processes.
- Reloading systemd configuration.
- Restarting monitoring agents.
- Applying configuration changes.

Do not use handlers for every operation. A task that must always execute should normally be a regular task.

Think of a handler as a controlled reaction to a change.`,
      steps: [
        "Identify the operation that changes the system.",
        "Create a task using the appropriate Ansible module.",
        "Add notify to connect the task to a handler.",
        "Define the handler under the play's handlers section.",
        "Use the correct service state such as restarted or reloaded.",
        "Execute the playbook and inspect changed status.",
        "Execute it again to verify idempotence.",
        "Confirm that the service is healthy after the handler runs."
      ],
      commands: `# Validate playbook syntax
ansible-playbook -i inventory.ini site.yml --syntax-check

# Display available tasks
ansible-playbook -i inventory.ini site.yml --list-tasks

# Run the playbook
ansible-playbook -i inventory.ini site.yml

# Run against one server
ansible-playbook -i inventory.ini site.yml --limit web01

# Preview supported configuration changes
ansible-playbook -i inventory.ini site.yml --check --diff

# Display detailed handler execution
ansible-playbook -i inventory.ini site.yml -vv

# Check Nginx service status
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "systemctl status nginx --no-pager"`,
      config: `# site.yml
---
- name: Configure Nginx
  hosts: webservers
  become: true

  tasks:
    - name: Deploy Nginx configuration
      ansible.builtin.template:
        src: templates/nginx.conf.j2
        dest: /etc/nginx/nginx.conf
        owner: root
        group: root
        mode: "0644"
      notify: Restart Nginx

  handlers:
    - name: Restart Nginx
      ansible.builtin.service:
        name: nginx
        state: restarted

# The template task changes the file only when its content differs.
# notify schedules the handler after a change.
# The handler runs at a handler execution point.
# A second unchanged playbook run should not restart Nginx.`,
      problems: [
        {
          issue: "The handler does not execute.",
          rootCause: "The notifying task did not report a change, the handler name does not match, or the handler was not notified.",
          solution: "Inspect the task result, verify the exact handler name, and confirm that the deployed file actually differs from the existing content."
        },
        {
          issue: "The service restarts during every playbook run.",
          rootCause: "The task always reports changed or uses a command that modifies the configuration on every execution.",
          solution: "Use an idempotent module such as template or copy and verify that the task reports unchanged when the desired configuration already exists."
        }
      ]
    },
    {
      heading: "2. Task Structure, Names, Modules and Execution Order",
      explanation: `A task is an individual unit of work inside a playbook.

A well-written task should have:
- A clear name.
- An appropriate module.
- Required module parameters.
- Optional privilege escalation.
- Conditions where necessary.
- A notification when a successful change should trigger a handler.

Example:

- name: Install Nginx
  ansible.builtin.package:
    name: nginx
    state: present

The name makes playbook output understandable.

The module performs the actual operation.

state: present describes the desired package state.

Ansible checks the current state and makes the required change.

Task execution normally follows the order in which tasks appear in the play.

Handlers are defined separately and are normally executed after the regular task section reaches a handler execution point.

Task execution can be influenced by:
- when conditions.
- loops.
- blocks and rescue.
- tags.
- includes and imports.
- task failures.
- strategy settings.
- serial host batches.

A task can use register to save its result.

The registered result can be used by a later task or condition.

Example:

register: nginx_install_result

Then a later task can inspect:

nginx_install_result.changed

Do not use a shell command for something already supported by a dedicated module.

For example, use the service module instead of running systemctl commands for ordinary service management.

Native modules provide more predictable state management and idempotence.

Use command or shell only when the required operation cannot reasonably be represented by an appropriate module.`,
      steps: [
        "Give each task a descriptive name.",
        "Select the most appropriate Ansible module.",
        "Declare the desired state.",
        "Use variables instead of unnecessary hardcoded values.",
        "Register results only when later logic needs them.",
        "Use conditions for selective execution.",
        "Notify handlers after successful changes.",
        "Validate task order and dependencies."
      ],
      commands: `# Show all tasks in the playbook
ansible-playbook -i inventory.ini site.yml --list-tasks

# Show hosts
ansible-playbook -i inventory.ini site.yml --list-hosts

# Run only tasks with a selected tag
ansible-playbook -i inventory.ini site.yml --tags nginx

# Skip selected tasks
ansible-playbook -i inventory.ini site.yml --skip-tags database

# Run with detailed task output
ansible-playbook -i inventory.ini site.yml -vv

# Run with maximum diagnostic verbosity
ansible-playbook -i inventory.ini site.yml -vvvv`,
      config: `# task-structure.yml
---
- name: Prepare web server
  hosts: webservers
  become: true
  gather_facts: true

  tasks:
    - name: Install Nginx
      ansible.builtin.package:
        name: nginx
        state: present
      register: nginx_install_result
      tags:
        - packages
        - nginx

    - name: Display installation result
      ansible.builtin.debug:
        var: nginx_install_result.changed

    - name: Ensure Nginx is enabled and running
      ansible.builtin.service:
        name: nginx
        state: started
        enabled: true
      tags:
        - services
        - nginx

# register stores the task result.
# tags allow selected task execution.
# service state started does not force a restart when already running.`,
      problems: [
        {
          issue: "A task fails because the selected module is unavailable.",
          rootCause: "The module name is incorrect, the Ansible installation is incompatible, or the module belongs to a collection that is not installed.",
          solution: "Check the fully qualified module name, installed Ansible version, and required collection dependencies."
        },
        {
          issue: "Tasks execute in an unexpected order.",
          rootCause: "The playbook uses includes, imports, handlers, tags, or conditional execution that changes the expected execution flow.",
          solution: "Inspect the task list, review include and import behavior, and run the playbook with verbose output."
        }
      ]
    },
    {
      heading: "3. Handlers, notify and Handler Naming",
      explanation: `The notify keyword connects a task to a handler.

Example:

- name: Deploy Nginx configuration
  ansible.builtin.template:
    src: nginx.conf.j2
    dest: /etc/nginx/nginx.conf
  notify: Restart Nginx

The handler must be defined in the handlers section.

handlers:
  - name: Restart Nginx
    ansible.builtin.service:
      name: nginx
      state: restarted

The notification name must match the handler name or a handler topic that the handler listens to.

Handler names are strings. Use consistent spelling and capitalization.

A notification is generated when the notifying task reports changed.

If the task reports ok instead of changed, the handler is not notified.

If the task is skipped, it does not normally notify the handler.

If a task fails before successfully completing, its notification is not normally generated.

A handler can be notified by multiple tasks.

For example, both the main Nginx configuration and a virtual-host configuration may notify the same restart handler.

The handler normally executes once per host at the relevant handler execution point, even if multiple tasks notify it.

This avoids multiple unnecessary service restarts.

Handler execution order is based on handler definition order.

It is not based on the order in which notification events were generated.

Use unique handler names and meaningful actions.

For large projects, separate handlers into task files or roles while keeping notification names consistent.`,
      steps: [
        "Create the configuration-changing task.",
        "Add a notify value.",
        "Define a handler with the matching name.",
        "Use a service module for restart or reload.",
        "Check whether the task reports changed.",
        "Observe handler execution in playbook output.",
        "Verify the service after the handler runs.",
        "Run again to confirm no unnecessary restart."
      ],
      commands: `# Validate handler definitions
ansible-playbook -i inventory.ini nginx.yml --syntax-check

# Run and inspect notification output
ansible-playbook -i inventory.ini nginx.yml -vv

# Run only the Nginx host group
ansible-playbook -i inventory.ini nginx.yml --limit webservers

# Preview file changes
ansible-playbook -i inventory.ini nginx.yml --check --diff

# Verify configuration
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "nginx -t"

# Verify service state
ansible web01 -i inventory.ini -b -m ansible.builtin.command -a "systemctl is-active nginx"`,
      config: `# nginx.yml
---
- name: Configure Nginx using handlers
  hosts: webservers
  become: true

  tasks:
    - name: Deploy main configuration
      ansible.builtin.template:
        src: templates/nginx.conf.j2
        dest: /etc/nginx/nginx.conf
        owner: root
        group: root
        mode: "0644"
      notify: Restart Nginx

    - name: Deploy virtual host
      ansible.builtin.template:
        src: templates/app.conf.j2
        dest: /etc/nginx/conf.d/app.conf
        owner: root
        group: root
        mode: "0644"
      notify: Restart Nginx

  handlers:
    - name: Restart Nginx
      ansible.builtin.service:
        name: nginx
        state: restarted

# Both configuration tasks can notify the same handler.
# If both change on one host, the handler normally executes once for that host.
# A second unchanged run should not trigger the handler.`,
      problems: [
        {
          issue: "The notify value does not match the handler.",
          rootCause: "The task and handler use different names or an unintended whitespace or spelling difference.",
          solution: "Use one consistent handler name and inspect the playbook with syntax checking and verbose execution."
        },
        {
          issue: "Two configuration tasks cause multiple service restarts.",
          rootCause: "Different handlers are defined for the same service operation or notifications are flushed at separate points.",
          solution: "Use one shared handler for the same operation when appropriate and review all flush_handlers locations."
        }
      ]
    },
    {
      heading: "4. Handler Execution Order, Deduplication and flush_handlers",
      explanation: `Handlers normally run at specific execution points after the regular tasks in a play.

This behavior is different from ordinary task execution.

Suppose a playbook has:
1. Deploy Nginx configuration.
2. Deploy application virtual host.
3. Update a monitoring configuration.
4. Execute normal tasks.
5. Run pending handlers.

If the first two tasks notify Restart Nginx, Ansible normally schedules that handler once per host for that handler flush cycle.

This is handler deduplication.

Handler order follows the handler definition order.

meta: flush_handlers is used to execute pending notified handlers immediately at a chosen point in the play.

Example:

- name: Deploy configuration
  template:
    ...
  notify: Restart Nginx

- name: Execute pending handlers now
  ansible.builtin.meta: flush_handlers

- name: Verify application
  uri:
    url: http://localhost/health
    status_code: 200

This pattern is useful when a later task depends on a service having already reloaded its configuration.

Without flush_handlers, the verification task may execute before the pending handler runs.

Use flush_handlers carefully.

It changes the timing of service operations and can cause additional handler execution cycles if later tasks notify the same handler again.

Handlers can also notify other handlers, but complex chains should be kept understandable.

A handler that notifies another handler may cause the second handler to execute at a later handler processing point. Avoid relying on complicated chains when a simple explicit workflow is clearer.

For critical deployments, explicitly control the sequence and verify the service before continuing.`,
      steps: [
        "Identify tasks that notify handlers.",
        "Understand the normal handler execution point.",
        "Review handler definition order.",
        "Use flush_handlers only when immediate execution is required.",
        "Verify service state after flushing.",
        "Check whether later tasks generate new notifications.",
        "Avoid unnecessarily complicated handler chains."
      ],
      commands: `# Inspect handler execution
ansible-playbook -i inventory.ini deployment.yml -vv

# Execute a controlled deployment
ansible-playbook -i inventory.ini deployment.yml --limit app01

# Validate syntax
ansible-playbook -i inventory.ini deployment.yml --syntax-check

# Preview configuration changes
ansible-playbook -i inventory.ini deployment.yml --check --diff

# Inspect Nginx configuration
ansible app01 -i inventory.ini -b -m ansible.builtin.command -a "nginx -t"

# Check the application endpoint
ansible app01 -i inventory.ini -m ansible.builtin.uri -a "url=http://localhost/health status_code=200"`,
      config: `# immediate-handler.yml
---
- name: Deploy and verify Nginx
  hosts: webservers
  become: true

  tasks:
    - name: Deploy Nginx configuration
      ansible.builtin.template:
        src: templates/nginx.conf.j2
        dest: /etc/nginx/nginx.conf
        owner: root
        group: root
        mode: "0644"
      notify: Restart Nginx

    - name: Run pending handlers immediately
      ansible.builtin.meta: flush_handlers

    - name: Verify Nginx configuration
      ansible.builtin.command:
        cmd: nginx -t
      changed_when: false

    - name: Verify application endpoint
      ansible.builtin.uri:
        url: http://localhost/health
        status_code: 200

  handlers:
    - name: Restart Nginx
      ansible.builtin.service:
        name: nginx
        state: restarted

# flush_handlers executes pending notifications at this point.
# The subsequent verification runs after the restart.
# A failed validation should stop normal progression.`,
      problems: [
        {
          issue: "A handler runs later than expected.",
          rootCause: "Handlers are deferred until a handler execution point and the playbook has no explicit flush before the dependent task.",
          solution: "Use meta: flush_handlers before the dependent verification task when immediate handler execution is required."
        },
        {
          issue: "A handler executes more than once during a play.",
          rootCause: "The playbook flushes handlers at multiple points or generates a new notification after an earlier flush.",
          solution: "Review notification locations and handler flush points, and consolidate service operations where possible."
        }
      ]
    },
    {
      heading: "5. listen Topics and Shared Handler Notifications",
      explanation: `The listen keyword allows a handler to subscribe to a notification topic.

This separates the notification topic from the handler's actual name.

Example:

tasks:
  - name: Deploy application configuration
    template:
      src: app.conf.j2
      dest: /etc/app/app.conf
    notify: Restart application services

handlers:
  - name: Restart Nginx
    service:
      name: nginx
      state: restarted
    listen: Restart application services

A task notifies the topic.

One or more handlers can listen to the same topic.

This is useful when one configuration change requires multiple related actions.

For example:
- Restart the application service.
- Reload a reverse proxy.
- Restart a worker process.

A shared topic can trigger all handlers listening to it.

Use descriptive topic names such as:
- Reload web configuration.
- Restart payment platform.
- Refresh monitoring services.

A topic should describe the operational event rather than one specific implementation.

This improves modularity when roles or task files are maintained by different engineers.

Do not confuse listen with a handler name.

notify can target a handler name or a listening topic.

Keep topic names consistent and test the notification path.

A topic that does not match a handler name or listening topic will not trigger the intended operation.`,
      steps: [
        "Choose a meaningful notification topic.",
        "Use the topic in notify.",
        "Add listen to the relevant handlers.",
        "Define each handler's actual operation.",
        "Test that all intended handlers execute.",
        "Check that unrelated handlers do not execute.",
        "Document shared topics for the team."
      ],
      commands: `# Validate listening handler definitions
ansible-playbook -i inventory.ini application.yml --syntax-check

# Execute the application configuration workflow
ansible-playbook -i inventory.ini application.yml -vv

# Execute on one application host
ansible-playbook -i inventory.ini application.yml --limit app01

# Inspect service state
ansible app01 -i inventory.ini -b -m ansible.builtin.command -a "systemctl is-active nginx"

# Inspect application service
ansible app01 -i inventory.ini -b -m ansible.builtin.command -a "systemctl is-active payment-api"`,
      config: `# shared-topic.yml
---
- name: Configure application platform
  hosts: appservers
  become: true

  tasks:
    - name: Deploy application configuration
      ansible.builtin.template:
        src: templates/application.yml.j2
        dest: /etc/payment/application.yml
        owner: root
        group: payment
        mode: "0640"
      notify: Restart payment platform

  handlers:
    - name: Restart payment API
      ansible.builtin.service:
        name: payment-api
        state: restarted
      listen: Restart payment platform

    - name: Restart payment worker
      ansible.builtin.service:
        name: payment-worker
        state: restarted
      listen: Restart payment platform

# One notification topic can notify multiple listening handlers.
# Validate whether both services actually depend on this configuration.
# Avoid restarting unrelated services.`,
      problems: [
        {
          issue: "A handler listening to a topic does not execute.",
          rootCause: "The notify topic and listen value do not match or the notifying task did not report changed.",
          solution: "Compare the topic names exactly and inspect the notifying task's changed status."
        },
        {
          issue: "An unrelated service restarts after a configuration update.",
          rootCause: "Multiple handlers subscribe to an overly broad topic.",
          solution: "Use specific topics and ensure each handler subscribes only to the events it needs."
        }
      ]
    },
    {
      heading: "6. Handlers with Loops, Conditions and Registered Results",
      explanation: `Handlers can work with loops and conditional logic, but engineers must understand what causes a notification.

A task that loops over multiple configuration files may notify a handler when one or more iterations report changed.

For example, a loop can deploy multiple application configuration files.

If at least one iteration changes, the task can notify the relevant handler.

The handler normally runs once for that host at the handler execution point, not once for every changed item.

This is useful when several configuration files belong to one service.

Conditions can also control whether a task runs.

Example:

when: application_enabled | bool

A skipped task does not normally generate a notification.

Registered results are useful for diagnostics.

A loop with register produces a result structure that includes information about individual iterations.

The individual results are commonly available under the registered variable's results list.

For example:

register: config_results

Then inspect:

config_results.results

A later task can examine individual results.

Use this when the workflow needs to know which configuration files changed.

Do not assume every registered result has the same fields. The fields depend on the module and execution path.

When a handler must be triggered based on a complex multi-task decision, consider using a dedicated validation or state task rather than creating confusing notification logic.

Use loop_control.loop_var for readable variable names.

For production service operations, avoid restarting the same service independently for every configuration file.`,
      steps: [
        "Define a list of configuration files.",
        "Deploy them using a loop.",
        "Notify one shared service handler.",
        "Use conditions for optional configuration items.",
        "Register results when later inspection is required.",
        "Inspect individual iteration results.",
        "Verify that the handler runs once at the intended point.",
        "Check the final service configuration."
      ],
      commands: `# Validate loop and handler syntax
ansible-playbook -i inventory.ini configs.yml --syntax-check

# Run configuration deployment
ansible-playbook -i inventory.ini configs.yml -vv

# Preview all configuration differences
ansible-playbook -i inventory.ini configs.yml --check --diff

# Execute on one host
ansible-playbook -i inventory.ini configs.yml --limit app01

# Verify Nginx configuration
ansible app01 -i inventory.ini -b -m ansible.builtin.command -a "nginx -t"`,
      config: `# multiple-configs.yml
---
- name: Deploy multiple application configurations
  hosts: appservers
  become: true

  vars:
    application_configs:
      - source: templates/api.conf.j2
        destination: /etc/payment/api.conf
      - source: templates/worker.conf.j2
        destination: /etc/payment/worker.conf
      - source: templates/queue.conf.j2
        destination: /etc/payment/queue.conf

  tasks:
    - name: Deploy application configuration files
      ansible.builtin.template:
        src: "{{ config_file.source }}"
        dest: "{{ config_file.destination }}"
        owner: root
        group: payment
        mode: "0640"
      loop: "{{ application_configs }}"
      loop_control:
        loop_var: config_file
        label: "{{ config_file.destination }}"
      register: config_results
      notify: Restart payment API

    - name: Display configuration change summary
      ansible.builtin.debug:
        var: config_results.results

  handlers:
    - name: Restart payment API
      ansible.builtin.service:
        name: payment-api
        state: restarted

# A loop can notify one handler.
# The handler is not normally repeated for every changed item.
# Protect configuration files that contain sensitive values.`,
      problems: [
        {
          issue: "The service restarts for every file in a configuration loop.",
          rootCause: "Different handlers or explicit flush points are causing repeated service operations.",
          solution: "Use one shared handler and avoid flushing after every configuration item."
        },
        {
          issue: "The registered loop result is not available in the expected format.",
          rootCause: "The task was skipped, failed before producing the expected result, or the engineer is reading the wrong result field.",
          solution: "Inspect the complete registered variable with debug and account for the module's actual return structure."
        }
      ]
    },
    {
      heading: "7. Service Management, Restart, Reload and systemd",
      explanation: `Service management is one of the most common real-world uses of handlers.

Linux services are managed through service managers such as systemd on many modern distributions.

Ansible provides service and systemd_service modules for service operations.

Common desired states:

started:
Ensure the service is running. It does not force a restart when the service is already running.

stopped:
Ensure the service is stopped.

restarted:
Restart the service.

reloaded:
Reload the service where the service manager and service support it.

enabled:
Configure the service to start automatically during boot.

A configuration change often requires a reload rather than a full restart.

For Nginx, a reload can apply supported configuration changes while avoiding a complete service restart.

However, always validate the configuration before reloading.

For systemd unit-file changes, systemd may need daemon-reload before restarting the service.

Example:
ansible.builtin.systemd_service:
  daemon_reload: true

This updates systemd's understanding of unit files.

A typical production sequence:
1. Deploy a systemd unit file.
2. Run daemon-reload.
3. Restart the application service.
4. Check service status.
5. Verify application health.

Do not assume every service supports reload.

Use documentation or service-specific operational procedures to confirm behavior.

A restart handler should not replace health validation.

After restarting, verify the application process, logs, listening port, and health endpoint.`,
      steps: [
        "Identify the service manager used by the target host.",
        "Install the service package if necessary.",
        "Deploy the service configuration.",
        "Validate configuration syntax.",
        "Notify the appropriate reload or restart handler.",
        "Run daemon-reload when systemd unit files change.",
        "Verify service state.",
        "Check application health and logs."
      ],
      commands: `# Check Nginx configuration
nginx -t

# Check service status
systemctl status nginx

# Reload Nginx
systemctl reload nginx

# Restart Nginx
systemctl restart nginx

# Check service enablement
systemctl is-enabled nginx

# Check service activity
systemctl is-active nginx

# Review recent service logs
journalctl -u nginx -n 100 --no-pager

# Follow service logs
journalctl -u nginx -f

# Check listening ports
ss -tulpn

# Run Ansible service validation
ansible webservers -i inventory.ini -b -m ansible.builtin.command -a "systemctl is-active nginx"`,
      config: `# service-handlers.yml
---
- name: Manage application service
  hosts: appservers
  become: true

  tasks:
    - name: Deploy systemd unit
      ansible.builtin.template:
        src: templates/payment-api.service.j2
        dest: /etc/systemd/system/payment-api.service
        owner: root
        group: root
        mode: "0644"
      notify:
        - Reload systemd
        - Restart payment API

    - name: Ensure application is enabled
      ansible.builtin.systemd_service:
        name: payment-api
        enabled: true
        state: started

  handlers:
    - name: Reload systemd
      ansible.builtin.systemd_service:
        daemon_reload: true

    - name: Restart payment API
      ansible.builtin.systemd_service:
        name: payment-api
        state: restarted

# Handlers execute in definition order.
# Define Reload systemd before Restart payment API.
# Validate the unit file and application dependencies before production rollout.`,
      problems: [
        {
          issue: "A service fails immediately after restart.",
          rootCause: "The application configuration is invalid, required files are missing, or dependencies are unavailable.",
          solution: "Inspect systemctl status and journalctl output, validate configuration, and correct the underlying dependency or file issue."
        },
        {
          issue: "A new systemd unit file is not recognized.",
          rootCause: "systemd has not reloaded its unit-file configuration.",
          solution: "Run daemon_reload through systemd_service before restarting or starting the affected service."
        },
        {
          issue: "A reload operation is unsupported.",
          rootCause: "The target service does not implement a reload operation.",
          solution: "Use the service's documented restart behavior after validating its configuration and operational impact."
        }
      ]
    },
    {
      heading: "8. Real-Time Company Workflow – Nginx and Application Deployment",
      explanation: `Consider a company running an online payment platform.

The architecture contains:
- An internet-facing load balancer.
- Nginx reverse proxies.
- Payment API services.
- Background workers.
- Redis.
- Monitoring agents.

An application release may require configuration updates on multiple servers.

A production-ready automation workflow should separate configuration deployment, validation, service activation, and health checks.

Typical sequence:

1. CI builds the application artifact.
2. CI publishes the artifact to a trusted repository.
3. Deployment automation selects a release version.
4. Ansible validates required variables.
5. Ansible connects to the selected application servers.
6. Configuration templates are deployed.
7. Changed files notify service handlers.
8. Configuration validation runs.
9. Pending handlers are flushed when immediate activation is required.
10. Application health checks run.
11. Monitoring verifies the new release.
12. The rollout proceeds to the next host batch.

A handler can restart a service only when a configuration task reports changed.

A handler should not be used to deploy the application artifact itself if the deployment operation must always happen in the normal task sequence.

The deployment task and service restart handler have different responsibilities.

For high-availability services:
- Use serial batches.
- Use load balancer draining where required.
- Check health before returning a host to traffic.
- Stop the rollout if a canary fails.
- Keep a known-good release for rollback.

The exact integration with a load balancer depends on the platform and the available Ansible modules.

Do not assume that restarting one service automatically makes the application ready for traffic.`,
      steps: [
        "Prepare a production inventory.",
        "Validate the release version and artifact location.",
        "Deploy the application artifact using the approved deployment method.",
        "Render configuration templates.",
        "Run application and proxy configuration validation.",
        "Notify the required handlers.",
        "Flush handlers before dependent health checks.",
        "Verify application endpoints.",
        "Review service logs and monitoring.",
        "Continue rollout only after successful validation."
      ],
      commands: `# Syntax validation
ansible-playbook -i inventory/production.ini deploy.yml --syntax-check

# Inspect the rollout scope
ansible-playbook -i inventory/production.ini deploy.yml --list-hosts

# Preview changes
ansible-playbook -i inventory/production.ini deploy.yml --check --diff

# Deploy to one canary
ansible-playbook -i inventory/production.ini deploy.yml --limit app01

# Validate Nginx configuration
ansible app01 -i inventory/production.ini -b -m ansible.builtin.command -a "nginx -t"

# Verify application service
ansible app01 -i inventory/production.ini -b -m ansible.builtin.command -a "systemctl is-active payment-api"

# Verify application health
ansible app01 -i inventory/production.ini -m ansible.builtin.uri -a "url=http://localhost:8080/health status_code=200"

# Inspect recent logs
ansible app01 -i inventory/production.ini -b -m ansible.builtin.command -a "journalctl -u payment-api -n 50 --no-pager"`,
      config: `# deploy.yml
---
- name: Deploy payment API configuration
  hosts: appservers
  become: true
  serial: 1
  gather_facts: true

  vars:
    app_environment: production
    app_port: 8080

  tasks:
    - name: Validate deployment variables
      ansible.builtin.assert:
        that:
          - app_environment == "production"
          - app_port | int > 0
          - app_port | int <= 65535

    - name: Deploy application configuration
      ansible.builtin.template:
        src: templates/payment-api.yml.j2
        dest: /etc/payment-api/application.yml
        owner: root
        group: payment
        mode: "0640"
      notify: Restart payment API

    - name: Execute pending service handlers
      ansible.builtin.meta: flush_handlers

    - name: Validate application health
      ansible.builtin.uri:
        url: "http://localhost:{{ app_port }}/health"
        status_code: 200
      register: health_result
      until: health_result.status == 200
      retries: 10
      delay: 5

  handlers:
    - name: Restart payment API
      ansible.builtin.service:
        name: payment-api
        state: restarted

# This example demonstrates configuration activation and verification.
# Add the company's approved artifact deployment and load balancer integration.
# serial 1 processes one host at a time.
# Do not continue the rollout if health verification fails.`,
      problems: [
        {
          issue: "The new application configuration is deployed but the service still uses old settings.",
          rootCause: "The service was not reloaded or restarted, or the application does not read the changed configuration at runtime.",
          solution: "Confirm the configuration path, validate the handler notification, and perform the documented activation operation."
        },
        {
          issue: "The service is running but the application endpoint returns an error.",
          rootCause: "A running process does not guarantee that the application is ready or that its dependencies are available.",
          solution: "Inspect application logs, dependency connectivity, listening ports, and health endpoint behavior."
        },
        {
          issue: "A production rollout affects too many servers at once.",
          rootCause: "The playbook has no appropriate host batching or canary strategy.",
          solution: "Use serial and a controlled deployment process, validate each batch, and integrate load balancer draining where required."
        }
      ]
    },
    {
      heading: "9. Roles, Task Files, Imports and Handler Reuse",
      explanation: `Large Ansible projects should organize tasks and handlers into roles.

A role can contain:
- tasks/main.yml
- handlers/main.yml
- templates/
- files/
- defaults/main.yml
- vars/main.yml
- meta/main.yml

The tasks directory contains normal operations.

The handlers directory contains event-driven operations.

A role can notify a handler defined in the same role.

A role can also notify a handler made available through another loaded role or play context, depending on how the role and handlers are included.

Use fully qualified module names.

Keep handler names unique and meaningful across the play.

A role should have a clear responsibility.

For example:
- nginx role manages the Nginx package and configuration.
- payment_api role manages the API service.
- monitoring role manages monitoring agents.

A role can notify a handler using a shared topic with listen.

This is useful when multiple roles need to trigger a common operation.

For example, multiple configuration roles may notify a topic that reloads a shared reverse proxy.

Use include_tasks when tasks need dynamic inclusion.

Use import_tasks when tasks can be statically imported.

Handler behavior and task loading can become complex when using dynamic includes, imports, and tags. Test the exact playbook execution path.

Do not create cross-role notification dependencies without documenting them.

Keep role interfaces explicit through variables and documented notification topics.`,
      steps: [
        "Create a role for each clear responsibility.",
        "Put regular tasks in tasks/main.yml.",
        "Put event-driven operations in handlers/main.yml.",
        "Store reusable configuration templates in templates/.",
        "Define default variables in defaults/main.yml.",
        "Use listen topics for shared events where appropriate.",
        "Document cross-role dependencies.",
        "Test the complete playbook rather than isolated role syntax only."
      ],
      commands: `# Create an example role structure
ansible-galaxy init roles/nginx

# Validate the complete playbook
ansible-playbook -i inventory.ini site.yml --syntax-check

# Display task list
ansible-playbook -i inventory.ini site.yml --list-tasks

# Run only the Nginx role tag
ansible-playbook -i inventory.ini site.yml --tags nginx

# Run the role against one host
ansible-playbook -i inventory.ini site.yml --limit web01

# Inspect role dependencies and installed collections
ansible-galaxy collection list`,
      config: `# roles/nginx/tasks/main.yml
---
- name: Install Nginx
  ansible.builtin.package:
    name: nginx
    state: present

- name: Deploy Nginx configuration
  ansible.builtin.template:
    src: nginx.conf.j2
    dest: /etc/nginx/nginx.conf
    owner: root
    group: root
    mode: "0644"
  notify: Reload Nginx configuration

- name: Ensure Nginx is enabled
  ansible.builtin.service:
    name: nginx
    enabled: true
    state: started

# roles/nginx/handlers/main.yml
---
- name: Reload Nginx
  ansible.builtin.service:
    name: nginx
    state: reloaded
  listen: Reload Nginx configuration

# site.yml
---
- name: Configure web infrastructure
  hosts: webservers
  become: true
  roles:
    - nginx

# Keep task and handler responsibilities separate.
# The listen topic provides a stable notification interface.`,
      problems: [
        {
          issue: "A role task cannot find the expected handler.",
          rootCause: "The handler is not loaded in the play context, its name is incorrect, or the role execution order is not what the engineer expects.",
          solution: "Inspect the loaded roles and handlers, use consistent notification topics, and validate the full playbook."
        },
        {
          issue: "A role change unexpectedly affects another application.",
          rootCause: "A shared handler topic is too broad or a role has undocumented cross-role dependencies.",
          solution: "Use specific notification topics, document dependencies, and test role combinations in staging."
        }
      ]
    },
    {
      heading: "10. Production Operations, Security and Idempotence",
      explanation: `A production handler must be safe, predictable, and easy to troubleshoot.

Idempotence:
Ansible should converge the host to the requested state without unnecessary repeated changes.

A template task should report changed only when the rendered content differs.

A service task with state started should not restart an already-running service unnecessarily.

A handler should execute only when notified.

Operational safety:
- Validate configuration before activation.
- Prefer reload over restart when supported and appropriate.
- Use serial deployment for controlled batches.
- Check service health after activation.
- Maintain a rollback plan.
- Review logs after failures.

Security:
- Protect secrets using Ansible Vault or a supported secret manager.
- Use no_log for tasks whose output may contain credentials.
- Restrict become permissions.
- Keep configuration file ownership and permissions correct.
- Do not expose secret values in debug output.
- Validate templates that contain sensitive settings.

Monitoring:
- Check service status.
- Check process health.
- Check listening ports.
- Check application health endpoints.
- Review system logs.
- Review application logs.
- Check infrastructure monitoring.

Avoid:
- Restarting services on every run.
- Using shell commands when native modules exist.
- Ignoring all task errors.
- Using broad notification topics.
- Running untested handlers in production.
- Treating a successful restart as proof of application health.

A good production automation workflow should report what changed, which handlers ran, whether health checks passed, and whether the release is safe to continue.`,
      steps: [
        "Use idempotent modules.",
        "Validate configuration before service activation.",
        "Protect sensitive configuration values.",
        "Use correct ownership and file permissions.",
        "Choose reload or restart based on service behavior.",
        "Deploy in controlled batches.",
        "Verify application health after handler execution.",
        "Inspect logs and monitoring.",
        "Test a second run for idempotence.",
        "Document rollback and recovery procedures."
      ],
      commands: `# Validate Nginx configuration
nginx -t

# Check service state
systemctl is-active nginx

# Check service enablement
systemctl is-enabled nginx

# Inspect service logs
journalctl -u nginx -n 100 --no-pager

# Check listening ports
ss -tulpn

# Inspect file ownership and permissions
stat /etc/nginx/nginx.conf

# Preview changes
ansible-playbook -i inventory/production.ini site.yml --check --diff

# Execute a controlled host batch
ansible-playbook -i inventory/production.ini site.yml --limit web01

# Inspect detailed execution
ansible-playbook -i inventory/production.ini site.yml -vv`,
      config: `# Production configuration task
---
- name: Deploy protected application configuration
  ansible.builtin.template:
    src: templates/application.yml.j2
    dest: /etc/payment/application.yml
    owner: root
    group: payment
    mode: "0640"
  no_log: true
  notify: Restart payment API

# Production handler
- name: Restart payment API
  ansible.builtin.service:
    name: payment-api
    state: restarted

# no_log prevents sensitive task output from being exposed.
# Apply no_log selectively because it also hides useful debugging output.
# The service operation should be followed by independent health validation.`,
      problems: [
        {
          issue: "Sensitive values appear in playbook logs.",
          rootCause: "A task prints secret variables or returns sensitive configuration data without output protection.",
          solution: "Use no_log selectively, protect secret storage, and remove unnecessary debug statements that expose credentials."
        },
        {
          issue: "A handler reports success but the application is not healthy.",
          rootCause: "The service manager accepted the restart operation, but the application failed during initialization or cannot reach dependencies.",
          solution: "Add application-level health checks, inspect logs, and validate dependencies after the handler completes."
        }
      ]
    },
    {
      heading: "11. Troubleshooting and Root Cause Analysis",
      explanation: `Handler troubleshooting should begin with the task that was expected to notify the handler.

Common issue: handler does not run.

Check:
- Did the task execute?
- Was it skipped?
- Did it report changed?
- Is notify spelled correctly?
- Is the handler loaded?
- Is the notification topic correct?
- Did a previous task failure affect execution?

Common issue: service restart fails.

Check:
- Does the service exist?
- Is the configuration valid?
- Does the service user have access?
- Are dependencies available?
- Is the unit file valid?
- Is the service manager working?
- Are there port conflicts?

Common issue: service restarts repeatedly.

Check:
- Does the configuration task always report changed?
- Is the template nondeterministic?
- Does the template include timestamps or changing values?
- Is a command modifying the file every run?
- Are multiple handlers performing the same operation?

Common issue: service is active but endpoint is unavailable.

Check:
- Listening address.
- Listening port.
- Firewall rules.
- Reverse proxy configuration.
- Application logs.
- Database connectivity.
- Dependency readiness.
- Health endpoint behavior.

A practical RCA process:

1. Capture the exact failed task.
2. Identify the host and environment.
3. Inspect the task's changed result.
4. Confirm whether the handler was notified.
5. Inspect handler execution output.
6. Check service status.
7. Review service logs.
8. Validate configuration syntax.
9. Identify the actual root cause.
10. Apply a permanent correction.
11. Rerun on one host.
12. Verify service and application health.
13. Run the playbook again to check idempotence.
14. Document the incident and prevention steps.

Do not fix only the visible symptom.

For example, repeatedly restarting Nginx will not fix an invalid configuration file. Validate the configuration and correct the source before activation.`,
      steps: [
        "Capture the complete Ansible error.",
        "Identify the task that should have generated the notification.",
        "Inspect changed, skipped, and failed status.",
        "Verify the handler name or listening topic.",
        "Inspect service manager status.",
        "Review journal and application logs.",
        "Validate configuration syntax.",
        "Check ports and dependencies.",
        "Fix the actual root cause.",
        "Repeat deployment and verify idempotence."
      ],
      commands: `# Detailed Ansible diagnostics
ansible-playbook -i inventory.ini site.yml -vvvv

# Validate playbook syntax
ansible-playbook -i inventory.ini site.yml --syntax-check

# Inspect task list
ansible-playbook -i inventory.ini site.yml --list-tasks

# Check service status
systemctl status nginx --no-pager

# Validate Nginx configuration
nginx -t

# Review recent logs
journalctl -u nginx -n 100 --no-pager

# Follow logs during service restart
journalctl -u nginx -f

# Check port availability
ss -tulpn

# Check process
ps aux | grep nginx

# Inspect configuration permissions
namei -l /etc/nginx/nginx.conf

# Verify HTTP response
curl -I http://localhost`,
      config: `# Diagnostic playbook
---
- name: Diagnose web service
  hosts: webservers
  become: true
  gather_facts: false

  tasks:
    - name: Check service state
      ansible.builtin.command:
        cmd: systemctl is-active nginx
      register: nginx_state
      changed_when: false
      failed_when: false

    - name: Display service state
      ansible.builtin.debug:
        var: nginx_state.stdout

    - name: Validate Nginx configuration
      ansible.builtin.command:
        cmd: nginx -t
      register: nginx_validation
      changed_when: false
      failed_when: false

    - name: Display configuration validation
      ansible.builtin.debug:
        var: nginx_validation.stderr

# This diagnostic example captures failures without changing service state.
# failed_when false is used only to collect diagnostic output here.
# Production deployment tasks should retain meaningful failure behavior.`,
      problems: [
        {
          issue: "The handler is notified but service activation fails.",
          rootCause: "The service configuration is invalid or the service cannot initialize.",
          solution: "Run the service's configuration validation command, inspect journal logs, fix the invalid configuration, and retry activation."
        },
        {
          issue: "The handler never appears in execution output.",
          rootCause: "The notifying task did not change the host or the notification does not point to a loaded handler.",
          solution: "Inspect task status and notification spelling, then test with an actual configuration change."
        },
        {
          issue: "The second playbook run still reports changes.",
          rootCause: "The configuration generation is not deterministic or another task modifies the same file.",
          solution: "Compare rendered content, remove changing values that are not required, and ensure one authoritative task manages the file."
        }
      ]
    },
    {
      heading: "12. Verification, Senior Engineer Decisions and Interview Questions",
      explanation: `A senior DevOps engineer should understand not only how to create a handler but also when to use one.

Verification checklist:

- Playbook syntax is valid.
- Target inventory is correct.
- Configuration templates render correctly.
- File ownership and permissions are correct.
- Changed tasks notify the correct handlers.
- Handlers execute in the intended order.
- No unnecessary restart occurs on an unchanged run.
- Service status is healthy.
- Application health endpoint succeeds.
- Logs do not show new errors.
- Rollback procedure is available.

Important interview questions:

Q: What is an Ansible task?
A: A unit of work that executes a module or action on managed hosts.

Q: What is a handler?
A: A special task that is normally triggered by a notification from another task.

Q: What is notify?
A: It connects a task to a handler or listening topic.

Q: When does a handler execute?
A: Normally at a handler execution point after regular tasks, if it was notified.

Q: What happens if a task does not change anything?
A: It normally does not notify the handler.

Q: Can multiple tasks notify one handler?
A: Yes. The handler normally runs once per host in that handler flush cycle.

Q: What determines handler execution order?
A: Handler definition order.

Q: What is listen?
A: A topic that allows one or more handlers to subscribe to a notification.

Q: What is meta: flush_handlers?
A: It forces pending notified handlers to execute at that point.

Q: What is the difference between started and restarted?
A: started ensures a service is running. restarted performs a restart operation.

Q: Why is reload often preferred?
A: When supported, reload can apply configuration without a full service restart.

Q: What is idempotence?
A: Repeated execution converges to the desired state without unnecessary changes.

Q: Can a handler be conditional?
A: Yes. A handler can use conditions like other tasks.

Q: Can a handler use a loop?
A: Yes, handlers can use task features such as loops where supported by the module and task structure.

Q: Why can a service be active but an application unavailable?
A: The process may be running while its dependencies, configuration, port, or application initialization are unhealthy.

Senior engineer decision-making:

Use tasks for normal operations.

Use handlers for actions that should happen only after a meaningful change.

Use listen topics to decouple notification events from handler names.

Use flush_handlers when a later task must run after a pending handler.

Use configuration validation before restart or reload.

Use health checks after service activation.

Use serial and canary deployment for production safety.

Use logs and monitoring to verify the actual application state.

The final rule: Ansible reporting a successful handler does not prove the business application is healthy. Verify the service, endpoint, dependencies, and monitoring signals.`,
      steps: [
        "Run syntax check.",
        "Review target hosts and tasks.",
        "Run against one canary host.",
        "Confirm the configuration task's changed status.",
        "Confirm the handler notification.",
        "Verify handler execution order.",
        "Validate service status.",
        "Check application health endpoint.",
        "Inspect logs and monitoring.",
        "Run the playbook a second time.",
        "Confirm no unnecessary handler execution.",
        "Document the final production result."
      ],
      commands: `# Final syntax validation
ansible-playbook -i inventory/production.ini site.yml --syntax-check

# Review hosts
ansible-playbook -i inventory/production.ini site.yml --list-hosts

# Review tasks
ansible-playbook -i inventory/production.ini site.yml --list-tasks

# Preview changes
ansible-playbook -i inventory/production.ini site.yml --check --diff

# Canary execution
ansible-playbook -i inventory/production.ini site.yml --limit web01

# Production execution
ansible-playbook -i inventory/production.ini site.yml

# Verify Nginx
ansible webservers -i inventory/production.ini -b -m ansible.builtin.command -a "systemctl is-active nginx"

# Verify configuration
ansible webservers -i inventory/production.ini -b -m ansible.builtin.command -a "nginx -t"

# Verify application health
ansible appservers -i inventory/production.ini -m ansible.builtin.uri -a "url=http://localhost:8080/health status_code=200"

# Inspect recent application logs
ansible appservers -i inventory/production.ini -b -m ansible.builtin.command -a "journalctl -u payment-api -n 50 --no-pager"

# Run again to confirm idempotence
ansible-playbook -i inventory/production.ini site.yml`,
      config: `# Recommended Ansible project structure
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
    verify.yml
  roles/
    nginx/
      tasks/
        main.yml
      handlers/
        main.yml
      templates/
        nginx.conf.j2
      defaults/
        main.yml
    payment_api/
      tasks/
        main.yml
      handlers/
        main.yml
      templates/
        application.yml.j2
  requirements.yml
  README.md

# Keep task responsibilities clear.
# Keep handlers focused on event-driven actions.
# Use consistent notification topics.
# Validate before activating configuration.
# Verify the application after activation.
# Keep production changes controlled, observable, and reversible.`,
      problems: [
        {
          issue: "A production deployment is marked successful but the application is not serving traffic.",
          rootCause: "The playbook verified only service-manager status and did not validate the application endpoint or its dependencies.",
          solution: "Add application-level health checks, dependency checks, and monitoring validation before considering the rollout successful."
        },
        {
          issue: "An unchanged deployment still causes service interruption.",
          rootCause: "The configuration task reports changed unnecessarily or the playbook performs a restart as an ordinary task.",
          solution: "Use idempotent configuration modules, notify a handler only on meaningful changes, and verify the second run has no unnecessary restart."
        }
      ]
    }
  ]
};

export default noteData;
