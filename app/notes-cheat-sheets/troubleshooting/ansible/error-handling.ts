import type { NoteData } from "../types";

const noteData: NoteData = {
  title: "Ansible Error Handling – Complete DevOps Engineer Technical Notes",
  description: "My detailed personal study notes covering Ansible task failures, block rescue always, failed_when, changed_when, ignore_errors, retries, until, async execution, error propagation, production deployment recovery, logging, root cause analysis, and senior DevOps engineering practices.",
  sections: [
    {
      heading: "1. My Technical Notes – Understanding Ansible Error Handling",
      explanation: `Error handling is one of the most important parts of production Ansible automation.

A playbook may contain multiple tasks. If one task fails, Ansible normally marks that task as failed and stops running further tasks for that host in the current play.

Other hosts may continue executing their tasks depending on the play strategy and failure configuration.

A failure does not always mean that the entire playbook stops immediately. Ansible has several mechanisms to control failure behavior.

Important error-handling features:

- failed_when
- changed_when
- ignore_errors
- ignore_unreachable
- block
- rescue
- always
- any_errors_fatal
- max_fail_percentage
- until
- retries
- delay
- force_handlers
- meta: clear_host_errors
- meta: flush_handlers

Example company scenario:

An Ansible playbook deploys a payment application to five production servers.

The workflow:
1. Stop or prepare the application.
2. Download the release.
3. Extract the application.
4. Update configuration.
5. Restart the service.
6. Verify application health.

Suppose the release download fails.

Without proper error handling, the deployment may leave a host in an incomplete state.

A production-ready playbook should identify the failure, record useful diagnostics, perform safe recovery actions, and avoid reporting success when the application is unhealthy.

Error handling must not hide failures.

A good automation engineer distinguishes between:
- A task that failed.
- A task that changed nothing.
- A temporary failure that can be retried.
- A failure that requires recovery.
- A failure that must stop the entire deployment.

The goal is controlled and observable automation, not simply making a red playbook turn green.`,
      steps: [
        "Identify the expected workflow.",
        "Identify tasks that can fail.",
        "Understand the impact of each failure.",
        "Choose the correct error-handling mechanism.",
        "Capture useful diagnostic information.",
        "Define recovery actions.",
        "Verify the final system state.",
        "Ensure failures remain visible."
      ],
      commands: `# Execute a playbook
ansible-playbook -i inventory.ini site.yml

# Enable verbose output
ansible-playbook -i inventory.ini site.yml -v

# Detailed diagnostics
ansible-playbook -i inventory.ini site.yml -vvv

# Maximum verbosity for connection and execution diagnostics
ansible-playbook -i inventory.ini site.yml -vvvv

# Limit execution to one host
ansible-playbook -i inventory.ini site.yml --limit web01

# Check syntax
ansible-playbook -i inventory.ini site.yml --syntax-check

# Perform a check-mode run where supported
ansible-playbook -i inventory.ini site.yml --check

# Inspect inventory
ansible-inventory -i inventory.ini --graph`,
      config: `# site.yml
---
- name: Example application deployment
  hosts: appservers
  become: true

  tasks:
    - name: Check application service
      ansible.builtin.command:
        cmd: systemctl is-active payment-api
      register: service_status
      changed_when: false
      failed_when: false

    - name: Display service status
      ansible.builtin.debug:
        var: service_status.stdout

# failed_when: false prevents this task from being marked failed.
# Use it only when a nonzero result is an expected condition.
# Do not suppress failures from important deployment operations.`,
      problems: [
        {
          issue: "Playbook stops after one task fails.",
          rootCause: "Ansible normally stops executing subsequent tasks on the affected host after an unhandled task failure.",
          solution: "Use block and rescue for recovery workflows, retries for temporary failures, or explicit failure conditions where appropriate."
        },
        {
          issue: "Playbook reports success even though deployment failed.",
          rootCause: "The playbook may be suppressing errors through ignore_errors or failed_when configuration.",
          solution: "Review every error-suppression rule and ensure critical deployment failures are explicitly reported."
        }
      ]
    },
    {
      heading: "2. Understanding failed_when and changed_when",
      explanation: `failed_when controls whether Ansible considers a task failed.

changed_when controls whether Ansible reports that a task changed the system.

These options are especially useful with command and shell tasks.

Ansible modules often return structured information, including:
- changed
- failed
- rc
- stdout
- stderr

The rc field represents the command return code.

A conventional command return code of zero usually means success. A nonzero return code usually indicates failure, but the meaning depends on the command.

Example:

systemctl is-active nginx

This command may return a nonzero status when Nginx is inactive.

An engineer may want to inspect the result without marking the entire task as failed.

In that case, register the result and define the appropriate failed_when expression.

changed_when is useful when a command is read-only but Ansible cannot automatically determine whether it changed the system.

Example:

ansible.builtin.command:
  cmd: id
changed_when: false

This prevents a read-only diagnostic command from reporting a change.

Do not use changed_when: false for a command that actually modifies system state.

Incorrect change reporting can affect handlers, deployment reporting, audit records, and automation decisions.

failed_when can use conditions based on return codes, output, or registered variables.

Multiple expressions in a YAML list are evaluated using Ansible's conditional semantics. When the intended logic is complex, write an explicit expression to make AND/OR behavior clear.

Always test the condition against real command output.`,
      steps: [
        "Register the task result.",
        "Inspect rc, stdout, and stderr.",
        "Identify the expected success condition.",
        "Write a clear failed_when expression.",
        "Use changed_when for accurate change reporting.",
        "Test normal and failure cases.",
        "Confirm handlers trigger only when expected."
      ],
      commands: `# Run a command and inspect its return code
ansible webservers -i inventory.ini -m ansible.builtin.command -a "systemctl is-active nginx"

# Check disk usage
ansible webservers -i inventory.ini -m ansible.builtin.command -a "df -h"

# Check service state
ansible webservers -i inventory.ini -m ansible.builtin.command -a "systemctl status nginx --no-pager"

# Check syntax
ansible-playbook -i inventory.ini site.yml --syntax-check

# Execute with detailed task output
ansible-playbook -i inventory.ini site.yml -vv`,
      config: `# failed_when and changed_when example
---
- name: Validate Nginx service
  hosts: webservers
  become: true

  tasks:
    - name: Read Nginx service status
      ansible.builtin.command:
        cmd: systemctl is-active nginx
      register: nginx_status
      changed_when: false
      failed_when: nginx_status.rc != 0

    - name: Check application health
      ansible.builtin.uri:
        url: http://localhost/health
        status_code: 200
      register: health_result
      changed_when: false

    - name: Report application health
      ansible.builtin.debug:
        msg: "Application health check completed"

# The first task fails when the service is not active.
# The command itself is read-only.
# The HTTP health check is also read-only.`,
      problems: [
        {
          issue: "A read-only command always reports changed.",
          rootCause: "The command module cannot automatically determine whether the command changed system state.",
          solution: "Use changed_when: false for genuinely read-only commands and verify that the command has no side effects."
        },
        {
          issue: "An expected nonzero command result stops the playbook.",
          rootCause: "Ansible treats the command's nonzero return code as failure even though the playbook intends to inspect that condition.",
          solution: "Register the result and define a specific failed_when condition based on the expected command behavior."
        }
      ]
    },
    {
      heading: "3. ignore_errors and ignore_unreachable",
      explanation: `ignore_errors allows Ansible to continue after a task reports a normal failure.

It does not make the task successful. The task can still appear as failed or ignored in the output.

Example:

A playbook checks whether an optional package is installed.

If the package is absent, the engineer may decide to continue and install it later.

ignore_errors can be used for carefully selected tasks.

However, it is dangerous to apply ignore_errors broadly.

If a database migration fails and the playbook ignores it, later tasks may run against an inconsistent database.

ignore_unreachable handles a different situation.

It controls behavior when a host becomes unreachable.

A host can be unreachable because of:
- Network failure.
- SSH connection timeout.
- Authentication problem.
- Server shutdown.
- Firewall changes.

A normal task failure and an unreachable host are not the same event.

ignore_errors does not handle every unreachable condition.

ignore_unreachable can allow a play to continue processing other work, but it cannot magically restore connectivity.

For example, if a server is unreachable, a later task cannot execute remotely until connectivity returns.

Use these options only when the operational requirement justifies them.

Prefer explicit validation and recovery instead of hiding important errors.`,
      steps: [
        "Identify whether the failure is a task failure or unreachable host.",
        "Determine whether the failure is acceptable.",
        "Use ignore_errors only for noncritical expected failures.",
        "Use ignore_unreachable only for appropriate unreachable-host scenarios.",
        "Record the failure details.",
        "Ensure critical tasks still stop deployment.",
        "Review ignored results in the final playbook output."
      ],
      commands: `# Execute a playbook with normal failure reporting
ansible-playbook -i inventory.ini site.yml

# Run one host with verbose output
ansible-playbook -i inventory.ini site.yml --limit web01 -vvv

# Check connectivity separately
ansible all -i inventory.ini -m ansible.builtin.ping

# Inspect unreachable hosts in inventory
ansible-inventory -i inventory.ini --list

# Retry execution after correcting connectivity
ansible-playbook -i inventory.ini site.yml --limit web01`,
      config: `# Carefully selected optional task
---
- name: Optional package inspection
  hosts: webservers
  become: true

  tasks:
    - name: Check optional monitoring package
      ansible.builtin.command:
        cmd: rpm -q optional-monitoring-agent
      register: optional_agent
      failed_when: false
      changed_when: false

    - name: Install package if missing
      ansible.builtin.package:
        name: optional-monitoring-agent
        state: present
      when: optional_agent.rc != 0

# Example unreachable handling
- name: Continue processing other hosts when a host is unreachable
  hosts: webservers
  ignore_unreachable: true

  tasks:
    - name: Check remote uptime
      ansible.builtin.command:
        cmd: uptime
      changed_when: false

# ignore_unreachable does not repair the connection.
# Recheck connectivity before depending on the affected host.`,
      problems: [
        {
          issue: "A critical task fails but later tasks continue.",
          rootCause: "The task or play has ignore_errors enabled, suppressing normal failure-based stopping behavior.",
          solution: "Remove broad error suppression and allow critical deployment, security, and data integrity tasks to fail visibly."
        },
        {
          issue: "ignore_errors does not help with an unreachable server.",
          rootCause: "The host is unreachable rather than returning a normal failed task result.",
          solution: "Investigate the network or SSH problem and use ignore_unreachable only when the play's business requirement permits it."
        }
      ]
    },
    {
      heading: "4. block, rescue and always",
      explanation: `block, rescue, and always provide structured error handling.

They are useful for deployment workflows where a failure requires cleanup or recovery.

block contains the normal tasks.

rescue contains recovery tasks that execute when a task in the block fails.

always contains tasks that execute after the block and rescue processing.

Example deployment:

Block:
1. Download release.
2. Extract release.
3. Configure application.
4. Restart service.

Rescue:
1. Capture failure information.
2. Restore the previous release if appropriate.
3. Restart the previous application version.
4. Validate recovery.

Always:
1. Record deployment information.
2. Collect relevant diagnostics.
3. Report the deployment result.

Important behavior:

If a block task fails and rescue completes successfully, Ansible can consider the block recovered and continue.

The original failure is not necessarily reflected as an ordinary failed play result after successful rescue.

If the failure must remain a failed deployment, explicitly fail after collecting diagnostics and performing recovery.

A rescue task can also fail. In that case, the recovery itself becomes a failure.

always is intended for cleanup and reporting that should happen after the block workflow.

It is not a guarantee that tasks will execute after every possible interruption, such as a controller crash or abrupt process termination.

Use block/rescue/always for controlled recovery, not as a replacement for proper monitoring.`,
      steps: [
        "Place normal deployment tasks inside block.",
        "Add recovery actions inside rescue.",
        "Add cleanup and reporting inside always.",
        "Register useful task results.",
        "Capture the original error.",
        "Validate the recovered state.",
        "Explicitly fail when the deployment must remain unsuccessful.",
        "Test both successful and failed workflows."
      ],
      commands: `# Validate playbook syntax
ansible-playbook -i inventory.ini deploy.yml --syntax-check

# Execute the deployment
ansible-playbook -i inventory.ini deploy.yml

# Run a single host for recovery testing
ansible-playbook -i inventory.ini deploy.yml --limit app01 -vvv

# Check service after recovery
ansible appservers -i inventory.ini -b -m ansible.builtin.command -a "systemctl is-active payment-api"

# Review application logs
ansible appservers -i inventory.ini -b -m ansible.builtin.command -a "journalctl -u payment-api -n 50 --no-pager"`,
      config: `# block, rescue and always example
---
- name: Deploy application with recovery
  hosts: appservers
  become: true

  tasks:
    - name: Deployment transaction
      block:
        - name: Create release directory
          ansible.builtin.file:
            path: /opt/payment/releases/2026.10.31
            state: directory
            mode: "0755"

        - name: Verify deployment artifact
          ansible.builtin.stat:
            path: /opt/payment/artifacts/payment-api.jar
          register: artifact_check
          failed_when: not artifact_check.stat.exists

        - name: Copy application artifact
          ansible.builtin.copy:
            src: /opt/payment/artifacts/payment-api.jar
            dest: /opt/payment/releases/2026.10.31/payment-api.jar
            remote_src: true
            mode: "0644"

        - name: Restart payment service
          ansible.builtin.service:
            name: payment-api
            state: restarted

        - name: Verify payment service
          ansible.builtin.command:
            cmd: systemctl is-active payment-api
          register: payment_status
          changed_when: false
          failed_when: payment_status.stdout != "active"

      rescue:
        - name: Capture service diagnostics
          ansible.builtin.command:
            cmd: journalctl -u payment-api -n 100 --no-pager
          register: failure_logs
          changed_when: false
          failed_when: false

        - name: Display failure diagnostics
          ansible.builtin.debug:
            var: failure_logs.stdout_lines

        - name: Mark deployment as failed
          ansible.builtin.fail:
            msg: "Deployment failed. Review the captured service logs."

      always:
        - name: Record deployment completion time
          ansible.builtin.command:
            cmd: date -Is
          register: deployment_time
          changed_when: false

        - name: Display deployment execution time
          ansible.builtin.debug:
            var: deployment_time.stdout

# This example collects diagnostics and intentionally marks deployment failed.
# A real rollback must restore a known-good release and verify application health.
# Never assume restarting a service automatically rolls back a deployment.`,
      problems: [
        {
          issue: "Rescue does not run after a failure.",
          rootCause: "The failure may be outside the block, may be an unreachable condition, or the play may have been interrupted before recovery could execute.",
          solution: "Place the expected failure-producing tasks inside block and separately handle connectivity and controller-level failures."
        },
        {
          issue: "A failed deployment appears successful after rescue.",
          rootCause: "The rescue section completed successfully and the playbook treated the failure as recovered.",
          solution: "After collecting diagnostics and recovery information, use ansible.builtin.fail when the deployment must remain unsuccessful."
        }
      ]
    },
    {
      heading: "5. Retries, until and delay for Temporary Failures",
      explanation: `Some production failures are temporary.

Examples:
- An application needs time to start.
- A load balancer target is not healthy immediately.
- A database service is still initializing.
- An API returns HTTP 503 during startup.
- A network endpoint is temporarily unavailable.

Ansible provides until, retries, and delay.

until defines the condition that must become true.

retries defines how many attempts Ansible should make.

delay defines the waiting time between attempts.

Example:

A service is restarted.

Ansible checks its health endpoint.

If the endpoint is not healthy, Ansible waits and checks again.

The task succeeds when the condition becomes true.

If the condition never becomes true within the retry limit, the task fails.

Do not use unlimited retries as a solution to an actual configuration or infrastructure problem.

Retries should be bounded.

Choose retry intervals based on the expected startup time and service behavior.

Consider whether the operation is safe to repeat.

Read-only health checks are generally suitable for retry loops.

A database migration or payment transaction should not be blindly repeated without understanding idempotency and duplicate-operation risk.

Use retry logic to handle temporary conditions, not to conceal permanent failures.`,
      steps: [
        "Identify a temporary condition.",
        "Choose a safe operation to repeat.",
        "Register the task result.",
        "Define the until condition.",
        "Set a reasonable retry count.",
        "Set an appropriate delay.",
        "Check final failure output.",
        "Escalate if the condition never becomes healthy."
      ],
      commands: `# Check application health
curl -i http://localhost:8080/health

# Check systemd service status
systemctl is-active payment-api

# Check recent service logs
journalctl -u payment-api -n 50 --no-pager

# Execute a retry-enabled playbook
ansible-playbook -i inventory.ini health-check.yml -vv

# Test one server
ansible-playbook -i inventory.ini health-check.yml --limit app01`,
      config: `# Retry until an application becomes healthy
---
- name: Wait for application readiness
  hosts: appservers

  tasks:
    - name: Check application health endpoint
      ansible.builtin.uri:
        url: http://localhost:8080/health
        status_code: 200
      register: health_check
      until: health_check.status == 200
      retries: 10
      delay: 6
      changed_when: false

    - name: Report healthy application
      ansible.builtin.debug:
        msg: "Application is responding successfully"

# Example service readiness check
- name: Wait for payment service
  hosts: appservers
  become: true

  tasks:
    - name: Wait until service is active
      ansible.builtin.command:
        cmd: systemctl is-active payment-api
      register: service_result
      until: service_result.stdout == "active"
      retries: 12
      delay: 5
      changed_when: false

# Select retries and delays based on actual startup expectations.
# The final failed result should remain visible.`,
      problems: [
        {
          issue: "Health check fails immediately after service restart.",
          rootCause: "The application requires startup time before it can respond successfully.",
          solution: "Use a bounded until/retries/delay loop and validate the actual application health endpoint."
        },
        {
          issue: "The task keeps retrying but never succeeds.",
          rootCause: "The failure may be permanent, such as an invalid configuration, missing dependency, incorrect port, or database connectivity problem.",
          solution: "Inspect application logs and dependencies instead of simply increasing retries indefinitely."
        }
      ]
    },
    {
      heading: "6. Register, Return Codes and Conditional Error Decisions",
      explanation: `register stores a task result in a variable.

This is essential for advanced error handling.

A registered result may contain:
- stdout
- stderr
- rc
- changed
- failed
- results
- status
- elapsed
- msg

The exact fields depend on the module.

A command task commonly provides rc, stdout, and stderr.

A URI task provides HTTP-related response fields such as status.

An engineer can use these values in later tasks.

Example:

1. Execute a health check.
2. Register the result.
3. Inspect the HTTP status.
4. Continue when healthy.
5. Fail with a useful message when unhealthy.

Use when to run tasks conditionally.

Use assert to validate important assumptions.

Use fail to stop execution with a clear explanation.

Use debug to display information during diagnosis.

Avoid printing secrets in debug output.

Registered variables are host-scoped in normal task execution.

A result registered on one host should not be assumed to represent every host in the play.

For cross-host aggregation, use the appropriate hostvars and delegation patterns carefully.

Good automation makes failure messages understandable to the person operating the system.`,
      steps: [
        "Register the output of an important task.",
        "Inspect the module's returned fields.",
        "Write conditions using the correct field.",
        "Use assert for pre-deployment requirements.",
        "Use fail for explicit critical failure.",
        "Use debug for safe diagnostic output.",
        "Avoid exposing passwords and tokens.",
        "Verify behavior on every target host."
      ],
      commands: `# Execute a read-only command
ansible web01 -i inventory.ini -m ansible.builtin.command -a "df -h"

# Execute an HTTP health check
ansible app01 -i inventory.ini -m ansible.builtin.uri -a "url=http://localhost:8080/health status_code=200"

# Inspect task output
ansible-playbook -i inventory.ini health-check.yml -vv

# Validate playbook syntax
ansible-playbook -i inventory.ini health-check.yml --syntax-check

# Execute against one host
ansible-playbook -i inventory.ini health-check.yml --limit app01`,
      config: `# Register and evaluate command result
---
- name: Validate disk availability
  hosts: appservers

  tasks:
    - name: Read filesystem usage
      ansible.builtin.command:
        cmd: df -P /opt
      register: disk_result
      changed_when: false

    - name: Validate disk command result
      ansible.builtin.assert:
        that:
          - disk_result.rc == 0
        fail_msg: "Unable to read filesystem usage"
        success_msg: "Filesystem command completed"

    - name: Display filesystem information
      ansible.builtin.debug:
        var: disk_result.stdout_lines

# Validate application configuration
- name: Validate required application settings
  hosts: appservers

  tasks:
    - name: Check required application variable
      ansible.builtin.assert:
        that:
          - application_port is defined
          - application_port | int > 0
          - application_port | int <= 65535
        fail_msg: "Application port is missing or invalid"

# Avoid printing credentials or secret variables in debug output.`,
      problems: [
        {
          issue: "A conditional task references an undefined registered variable.",
          rootCause: "The task that should create the variable was skipped, failed before registration, or was not executed in the expected scope.",
          solution: "Check task execution order and use is defined checks when a variable may legitimately be absent."
        },
        {
          issue: "Ansible evaluates the wrong field in a failure condition.",
          rootCause: "Different modules return different result structures, and the condition assumes a field that the selected module does not provide.",
          solution: "Inspect the registered result with safe debug output and write conditions using fields actually returned by that module."
        }
      ]
    },
    {
      heading: "7. Handlers, force_handlers and Failure Recovery",
      explanation: `Handlers are tasks that execute when notified by another task.

They are commonly used to restart services after configuration changes.

Example:
- Update Nginx configuration.
- Notify restart Nginx.
- Restart Nginx at the appropriate point.

Normally, a host with a later task failure may not execute its pending handlers.

This can create a problem when a configuration file changed successfully but a later unrelated task failed.

force_handlers can change this behavior by forcing notified handlers to run even when a later task fails, subject to documented limitations.

Use it carefully.

A handler should not blindly restart a service using an invalid configuration.

A safe pattern is:
1. Validate configuration.
2. Update configuration.
3. Notify the handler.
4. Restart only after successful validation.
5. Verify service health.

meta: flush_handlers can execute pending handlers at a specific point in the play.

This can be useful when a service must restart before subsequent validation tasks.

Handlers should be idempotent and named clearly.

A handler failure is itself an important deployment failure.

Never assume that a notified handler has already executed.

Understand the difference between notifying a handler and flushing pending handlers.`,
      steps: [
        "Define a handler for the required service operation.",
        "Validate configuration before notification.",
        "Notify the handler only when a real change occurs.",
        "Flush handlers when immediate execution is required.",
        "Verify the service after restart.",
        "Use force_handlers only when operationally appropriate.",
        "Inspect handler failures separately."
      ],
      commands: `# Validate Nginx configuration
sudo nginx -t

# Check Nginx service
sudo systemctl status nginx

# Check Nginx logs
sudo journalctl -u nginx -n 50 --no-pager

# Execute playbook
ansible-playbook -i inventory.ini nginx.yml

# Execute with verbose handler output
ansible-playbook -i inventory.ini nginx.yml -vv

# Check syntax
ansible-playbook -i inventory.ini nginx.yml --syntax-check`,
      config: `# Handler example
---
- name: Configure Nginx
  hosts: webservers
  become: true

  tasks:
    - name: Deploy Nginx configuration
      ansible.builtin.template:
        src: nginx.conf.j2
        dest: /etc/nginx/nginx.conf
        mode: "0644"
        validate: "/usr/sbin/nginx -t -c %s"
      notify: Restart Nginx

    - name: Execute pending handlers now
      ansible.builtin.meta: flush_handlers

    - name: Verify Nginx service
      ansible.builtin.command:
        cmd: systemctl is-active nginx
      register: nginx_state
      changed_when: false
      failed_when: nginx_state.stdout != "active"

  handlers:
    - name: Restart Nginx
      ansible.builtin.service:
        name: nginx
        state: restarted

# Example play-level force_handlers
# force_handlers: true
#
# Use only after evaluating the effect of executing pending handlers
# on hosts where another task has failed.`,
      problems: [
        {
          issue: "A configuration changes but the service does not restart.",
          rootCause: "The handler was notified but not executed before the play ended or a later failure prevented normal handler execution.",
          solution: "Review task and handler flow, use meta: flush_handlers when needed, and consider force_handlers only after assessing safety."
        },
        {
          issue: "A handler restarts a service with invalid configuration.",
          rootCause: "Configuration validation was not performed before the handler was notified.",
          solution: "Use the module's validate option or a separate validation task before allowing the restart handler to execute."
        }
      ]
    },
    {
      heading: "8. Async Tasks, Long-Running Jobs and Polling",
      explanation: `Some operations take a long time.

Examples:
- Large application deployment.
- Database backup.
- Long-running system update.
- Large file transfer.
- Infrastructure initialization.

Ansible supports asynchronous task execution.

The async setting specifies the maximum allowed runtime for an asynchronous operation.

The poll setting controls how Ansible waits for the task.

A positive poll value means Ansible continues polling for completion.

poll: 0 starts the asynchronous task and moves on without waiting for completion.

When poll is zero, the playbook must manage the returned job identifier and check completion later.

The async_status module can inspect an asynchronous job.

This is useful when the playbook needs to start multiple long-running tasks before checking their results.

Async execution does not automatically make an operation safe to repeat.

A failed or interrupted operation may have partially modified the target.

For database operations, package updates, and production migrations, verify the actual system state before retrying.

Set realistic runtime limits.

Do not choose an extremely large timeout just to avoid investigating slow operations.

Use async only when it solves a real execution requirement.`,
      steps: [
        "Identify a long-running operation.",
        "Determine whether it is safe to execute asynchronously.",
        "Set a suitable async timeout.",
        "Choose an appropriate polling strategy.",
        "Capture the returned job identifier.",
        "Check completion using async_status.",
        "Inspect failed job results.",
        "Verify the final application state."
      ],
      commands: `# Execute a long-running playbook
ansible-playbook -i inventory.ini maintenance.yml -vv

# Inspect system processes
ansible appservers -i inventory.ini -m ansible.builtin.command -a "ps -ef"

# Inspect recent service logs
ansible appservers -i inventory.ini -b -m ansible.builtin.command -a "journalctl -u payment-api -n 50 --no-pager"

# Check disk space after a backup
ansible dbservers -i inventory.ini -m ansible.builtin.command -a "df -h"

# Run a single host during async testing
ansible-playbook -i inventory.ini maintenance.yml --limit db01`,
      config: `# Asynchronous task with polling
---
- name: Run long maintenance task
  hosts: appservers
  become: true

  tasks:
    - name: Execute maintenance script
      ansible.builtin.command:
        cmd: /usr/local/bin/maintenance.sh
      async: 1800
      poll: 15
      register: maintenance_result

    - name: Report maintenance completion
      ansible.builtin.debug:
        var: maintenance_result

# Fire-and-check example
- name: Start background job
  hosts: appservers

  tasks:
    - name: Start long job
      ansible.builtin.command:
        cmd: /usr/local/bin/long-job.sh
      async: 1800
      poll: 0
      register: background_job

    - name: Wait for background job
      ansible.builtin.async_status:
        jid: "{{ background_job.ansible_job_id }}"
      register: job_status
      until: job_status.finished
      retries: 120
      delay: 10

# Ensure the job command is safe and operationally controlled.
# Polling limits and total runtime should match the maintenance window.`,
      problems: [
        {
          issue: "An asynchronous job does not finish within the configured timeout.",
          rootCause: "The operation takes longer than the allowed async runtime or is blocked by a dependency.",
          solution: "Inspect the process and application logs, validate dependencies, and adjust the timeout only when the longer runtime is expected."
        },
        {
          issue: "The playbook starts a background job but never verifies it.",
          rootCause: "The task uses poll: 0 and does not perform an async_status check.",
          solution: "Capture the job identifier and use async_status with bounded polling to verify completion."
        }
      ]
    },
    {
      heading: "9. Production Deployment Failure Handling and Rollback",
      explanation: `Production deployments require stronger failure handling than simple configuration tasks.

A production release should have:
- A known-good previous version.
- A release identifier.
- Artifact verification.
- Configuration validation.
- Controlled service restart.
- Health checks.
- Deployment logs.
- A rollback plan.

A deployment should not switch traffic to an unhealthy application.

A common release layout:

/opt/payment/releases/
/opt/payment/current

Each deployment creates a new release directory.

The current symlink points to the active release.

A deployment can:
1. Record the current release.
2. Download the new artifact.
3. Verify checksum.
4. Prepare the new release.
5. Update configuration.
6. Switch the current symlink.
7. Restart the service.
8. Check application health.
9. Keep the new release if healthy.
10. Restore the previous release if unhealthy.

Rollback itself can fail.

Therefore, rollback must be followed by verification.

A database schema migration may not be reversible. Application rollback must account for backward-compatible database changes.

Do not automatically reverse database changes without a tested recovery procedure.

Use canary deployment or rolling deployment when supported.

Deploy to a small subset first, validate, and then continue.

For critical services, include approval gates and maintenance-window controls.

Ansible error handling should support a clear operational decision: continue, recover, or stop.`,
      steps: [
        "Identify the active release.",
        "Create a unique release directory.",
        "Verify the new artifact.",
        "Prepare configuration.",
        "Validate configuration.",
        "Switch to the new release.",
        "Restart the service.",
        "Run application health checks.",
        "Restore the previous release if required.",
        "Verify rollback health.",
        "Record the final deployment result."
      ],
      commands: `# Check active release
readlink -f /opt/payment/current

# Check service state
systemctl is-active payment-api

# Inspect application health
curl -f http://localhost:8080/health

# Check service logs
journalctl -u payment-api -n 100 --no-pager

# Check release directories
ls -lah /opt/payment/releases

# Verify artifact checksum
sha256sum /opt/payment/artifacts/payment-api.jar

# Execute a canary deployment
ansible-playbook -i inventory/production.ini deploy.yml --limit app01

# Execute remaining deployment after successful validation
ansible-playbook -i inventory/production.ini deploy.yml --limit appservers

# Check deployment result
ansible appservers -i inventory/production.ini -m ansible.builtin.command -a "systemctl is-active payment-api"`,
      config: `# Simplified deployment and recovery pattern
---
- name: Production deployment
  hosts: appservers
  become: true
  serial: 1

  vars:
    release_id: "2026.10.31"
    release_path: "/opt/payment/releases/{{ release_id }}"

  tasks:
    - name: Record previous release
      ansible.builtin.command:
        cmd: readlink -f /opt/payment/current
      register: previous_release
      changed_when: false
      failed_when: false

    - name: Create new release directory
      ansible.builtin.file:
        path: "{{ release_path }}"
        state: directory
        mode: "0755"

    - name: Copy verified application artifact
      ansible.builtin.copy:
        src: /opt/payment/artifacts/payment-api.jar
        dest: "{{ release_path }}/payment-api.jar"
        mode: "0644"

    - name: Verify artifact exists
      ansible.builtin.stat:
        path: "{{ release_path }}/payment-api.jar"
      register: artifact
      failed_when: not artifact.stat.exists

    - name: Switch active release
      ansible.builtin.file:
        src: "{{ release_path }}"
        dest: /opt/payment/current
        state: link
        force: true
      notify: Restart payment API

    - name: Apply restart immediately
      ansible.builtin.meta: flush_handlers

    - name: Check application health
      ansible.builtin.uri:
        url: http://localhost:8080/health
        status_code: 200
      register: health
      retries: 10
      delay: 6
      until: health.status == 200
      changed_when: false

  handlers:
    - name: Restart payment API
      ansible.builtin.service:
        name: payment-api
        state: restarted

# This is an instructional deployment pattern, not a universal rollback implementation.
# Add a tested rescue workflow that restores previous_release.stdout when needed.
# Verify service health after restoration.
# Database migrations require a separate compatibility and recovery strategy.`,
      problems: [
        {
          issue: "New release is deployed but application health check fails.",
          rootCause: "The release may contain an invalid artifact, incompatible configuration, unavailable dependency, or application startup error.",
          solution: "Capture logs, stop further rollout, restore the known-good release when safe, restart the service, and verify health."
        },
        {
          issue: "Rollback restores files but the application still fails.",
          rootCause: "The previous release may depend on changed configuration, database schema, environment variables, or external services.",
          solution: "Use a complete rollback plan that covers application files, compatible configuration, database changes, and dependency health."
        }
      ]
    },
    {
      heading: "10. Ansible Error Logs, Debugging and Root Cause Analysis",
      explanation: `Production error handling requires useful evidence.

The final FAILED message alone may not explain the root cause.

A DevOps engineer should capture:
- The failing task.
- The affected host.
- The module name.
- The return code.
- Standard output.
- Standard error.
- Application logs.
- System logs.
- Relevant configuration.
- Deployment version.
- Time of failure.

Ansible verbosity levels:

-v provides additional output.

-vv provides more detailed task information.

-vvv provides detailed connection and execution information.

-vvvv provides maximum diagnostic output.

The log_path setting in ansible.cfg can record Ansible output.

Protect log files because they may contain sensitive data.

Do not log private keys, passwords, tokens, or unmasked credentials.

For remote Linux troubleshooting, common evidence sources include:
- journalctl.
- systemd service status.
- /var/log/syslog.
- /var/log/messages.
- Application-specific logs.
- Web server access and error logs.
- Database logs.

The exact file location depends on the Linux distribution and service configuration.

A good RCA identifies the actual cause rather than describing only the symptom.

Example:

Symptom:
Application health check failed.

Weak RCA:
Ansible deployment failed.

Better RCA:
The application failed to start because the configured database hostname did not resolve from the production application subnet.

Permanent fix:
Correct the DNS record or resolver configuration, validate name resolution during pre-deployment checks, and add a dependency health check before application restart.

Record corrective and preventive actions separately.`,
      steps: [
        "Capture the full Ansible output.",
        "Identify the exact failed task.",
        "Identify the affected server.",
        "Inspect rc, stdout, and stderr.",
        "Check system and application logs.",
        "Check the deployed configuration.",
        "Compare with a healthy host.",
        "Identify the root cause.",
        "Apply a permanent correction.",
        "Add a preventive validation.",
        "Retest and document the result."
      ],
      commands: `# Verbose execution
ansible-playbook -i inventory.ini site.yml -vvv

# Maximum diagnostics
ansible-playbook -i inventory.ini site.yml -vvvv

# Record Ansible execution output
ansible-playbook -i inventory.ini site.yml -vvv 2>&1 | tee ansible-run.log

# Inspect recent system logs
sudo journalctl -n 100 --no-pager

# Inspect application service logs
sudo journalctl -u payment-api -n 100 --no-pager

# Inspect service status
sudo systemctl status payment-api

# Inspect Nginx errors
sudo tail -n 100 /var/log/nginx/error.log

# Inspect system logs on Debian/Ubuntu
sudo tail -n 100 /var/log/syslog

# Inspect system logs on RHEL-based systems
sudo tail -n 100 /var/log/messages`,
      config: `# ansible.cfg
[defaults]
inventory = ./inventory.ini
host_key_checking = True
timeout = 30
forks = 10
log_path = ./logs/ansible.log

# Create the logs directory before execution.
# Example:
# mkdir -p logs
# chmod 700 logs

# Do not commit sensitive execution logs to Git.
# Apply appropriate ownership and access permissions.
# Review output for credentials before sharing logs.

# Example diagnostic task
- name: Collect application service logs
  ansible.builtin.command:
    cmd: journalctl -u payment-api -n 100 --no-pager
  register: app_logs
  changed_when: false
  failed_when: false

- name: Display application logs
  ansible.builtin.debug:
    var: app_logs.stdout_lines

# Limit diagnostic output to authorized operators.
# Avoid exposing secrets from environment or application configuration.`,
      problems: [
        {
          issue: "Ansible output does not provide enough information to identify the failure.",
          rootCause: "The playbook was executed with low verbosity or the relevant application and system logs were not collected.",
          solution: "Reproduce the issue with appropriate verbosity, register task output, and inspect the target service logs and configuration."
        },
        {
          issue: "Diagnostic logs expose credentials.",
          rootCause: "Sensitive variables or command output were printed or written to an accessible log file.",
          solution: "Use no_log for tasks that handle secrets, restrict log access, and avoid displaying sensitive registered results."
        }
      ]
    },
    {
      heading: "11. Production Best Practices and Safe Error Handling Design",
      explanation: `A reliable Ansible playbook must be predictable and safe to operate.

Important production practices:

1. Prefer Ansible modules over shell commands when suitable modules exist.
2. Keep tasks idempotent.
3. Validate configuration before restarting services.
4. Use block/rescue/always for controlled recovery.
5. Use bounded retries for temporary failures.
6. Avoid broad ignore_errors.
7. Use meaningful failed_when conditions.
8. Use changed_when accurately.
9. Capture useful diagnostics.
10. Protect secrets with Ansible Vault or an approved secret manager.
11. Use no_log for sensitive tasks.
12. Use serial for controlled rolling deployments.
13. Verify health after every critical change.
14. Maintain a tested rollback plan.
15. Keep logs accessible to authorized operators.

Idempotency means running the same playbook repeatedly should not create unnecessary changes when the system is already in the desired state.

Ansible modules such as package, service, file, template, and user are usually preferable to manually constructed shell commands.

Use check mode where the module supports it, but do not assume every task or module fully supports check mode.

Use diff mode carefully because configuration diffs may expose sensitive values.

Use serial to reduce the number of hosts updated at the same time.

Use any_errors_fatal when a failure should stop the play across hosts.

Use max_fail_percentage when the deployment policy allows a defined failure threshold.

For production systems, failure thresholds should be based on service availability and business requirements.

A green playbook is not sufficient proof of success.

Validate the actual application, service, and business operation.`,
      steps: [
        "Use idempotent modules.",
        "Validate configuration before applying it.",
        "Protect credentials.",
        "Define bounded retry policies.",
        "Keep critical failures visible.",
        "Use controlled deployment batches.",
        "Capture diagnostic evidence.",
        "Implement and test rollback.",
        "Verify service and application health.",
        "Review the final deployment result."
      ],
      commands: `# Syntax validation
ansible-playbook -i inventory.ini site.yml --syntax-check

# Check mode
ansible-playbook -i inventory.ini site.yml --check

# Diff mode
ansible-playbook -i inventory.ini site.yml --diff

# Limit deployment to one server
ansible-playbook -i inventory.ini site.yml --limit web01

# Run a rolling deployment
ansible-playbook -i inventory.ini deploy.yml

# Validate connectivity
ansible all -i inventory.ini -m ansible.builtin.ping

# Review active configuration
ansible-config dump --only-changed

# Check application service
ansible appservers -i inventory.ini -b -m ansible.builtin.command -a "systemctl is-active payment-api"`,
      config: `# Production-oriented playbook controls
---
- name: Controlled production deployment
  hosts: appservers
  become: true
  serial: 1
  any_errors_fatal: true

  tasks:
    - name: Validate required deployment variables
      ansible.builtin.assert:
        that:
          - release_version is defined
          - release_version | length > 0
        fail_msg: "A valid release version is required"

    - name: Validate service configuration
      ansible.builtin.command:
        cmd: /usr/local/bin/validate-payment-config
      changed_when: false

    - name: Deploy application configuration
      ansible.builtin.template:
        src: payment.properties.j2
        dest: /etc/payment/payment.properties
        mode: "0640"
      no_log: true

    - name: Verify service health
      ansible.builtin.uri:
        url: http://localhost:8080/health
        status_code: 200
      register: health
      retries: 10
      delay: 5
      until: health.status == 200
      changed_when: false

# no_log prevents sensitive task output from being displayed.
# Protect the generated files and the destination system as well.
# serial controls batch size.
# any_errors_fatal stops the play when a fatal task failure occurs.`,
      problems: [
        {
          issue: "Repeated playbook execution creates unnecessary changes.",
          rootCause: "The playbook uses non-idempotent shell commands or does not check the existing system state.",
          solution: "Prefer declarative Ansible modules, define the desired state, and use changed_when only when a command's behavior is correctly understood."
        },
        {
          issue: "Production rollout continues despite a critical failure.",
          rootCause: "The playbook does not enforce the required failure policy across the deployment group.",
          solution: "Evaluate any_errors_fatal, max_fail_percentage, and serial against the service's availability requirements."
        }
      ]
    },
    {
      heading: "12. Verification, Senior Engineer Interview Questions and RCA Checklist",
      explanation: `Before completing a production automation run, verify both Ansible execution and the actual system state.

Verification checklist:

1. Did Ansible reach every intended host?
2. Did the required tasks execute?
3. Were any tasks ignored?
4. Did retries eventually succeed?
5. Did rescue execute?
6. Did any rescue operation fail?
7. Did handlers run?
8. Did the service restart successfully?
9. Did the health endpoint return the expected status?
10. Did the application connect to its dependencies?
11. Was the correct release activated?
12. Were diagnostic logs retained securely?
13. Did the final result match the actual production state?

Senior engineer interview questions:

Q: What is failed_when?
A: It defines a custom condition for when a task should be considered failed.

Q: What is changed_when?
A: It controls whether Ansible reports a task as changed.

Q: What is ignore_errors?
A: It allows execution to continue after a normal task failure, but it does not repair the failure.

Q: Does ignore_errors handle unreachable hosts?
A: No. Unreachable-host handling is separate.

Q: What is block?
A: A grouping of tasks that can share task-level behavior and recovery handling.

Q: What is rescue?
A: A set of recovery tasks executed when a task in the associated block fails.

Q: What is always?
A: A section used for cleanup or reporting after block/rescue processing.

Q: What happens when rescue succeeds?
A: The failure can be treated as recovered for play execution, so explicitly fail afterward if the overall operation must remain unsuccessful.

Q: What is until?
A: A condition used to repeat a task until the condition becomes true or retry limits are exhausted.

Q: What is the purpose of retries and delay?
A: To control the number of attempts and waiting interval between attempts.

Q: What is register?
A: It stores task output in a variable for later use.

Q: What is any_errors_fatal?
A: It causes a fatal task failure to stop the play across hosts, according to Ansible's play execution behavior.

Q: What is serial?
A: It controls how many hosts are processed in each batch.

Q: Why should errors not be ignored in production?
A: Suppressing errors can allow an incomplete or unhealthy deployment to appear successful.

Q: What is the difference between recovery and rollback?
A: Recovery restores a working operational state. Rollback specifically returns a release or change to a previous known-good version.

Q: Why is idempotency important?
A: It makes repeated automation safer and reduces unintended changes.

Senior engineer decision-making:

- Retry temporary failures.
- Recover from known recoverable failures.
- Stop on security and data-integrity failures.
- Do not hide critical failures.
- Preserve diagnostic evidence.
- Verify the actual system state.
- Document the root cause and permanent prevention.

Final RCA checklist:

Symptom:
What did the operator observe?

Impact:
Which hosts, services, and users were affected?

Timeline:
When did the failure begin and recover?

Evidence:
Which task output and logs support the diagnosis?

Root cause:
What technical condition caused the failure?

Correction:
What action restored service?

Prevention:
What monitoring, validation, or automation change will prevent recurrence?

Verification:
How was the permanent fix tested?

A production engineer should be able to explain not only how to make a playbook pass, but also why the failure occurred, how the system was recovered, and how recurrence will be prevented.`,
      steps: [
        "Check the play recap.",
        "Inspect failed, unreachable, and ignored tasks.",
        "Verify service state on every intended host.",
        "Verify application health.",
        "Confirm the expected release is active.",
        "Review relevant logs.",
        "Record the failure timeline.",
        "Identify the technical root cause.",
        "Document correction and prevention.",
        "Retest the permanent fix."
      ],
      commands: `# Run the final playbook
ansible-playbook -i inventory.ini site.yml

# Capture complete execution output
ansible-playbook -i inventory.ini site.yml -vvv 2>&1 | tee ansible-final-run.log

# Verify host reachability
ansible all -i inventory.ini -m ansible.builtin.ping

# Verify service status
ansible appservers -i inventory.ini -b -m ansible.builtin.command -a "systemctl is-active payment-api"

# Verify application endpoint
ansible appservers -i inventory.ini -m ansible.builtin.uri -a "url=http://localhost:8080/health status_code=200"

# Verify release path
ansible appservers -i inventory.ini -m ansible.builtin.command -a "readlink -f /opt/payment/current"

# Collect recent logs
ansible appservers -i inventory.ini -b -m ansible.builtin.command -a "journalctl -u payment-api -n 50 --no-pager"

# Review inventory
ansible-inventory -i inventory.ini --graph

# Final syntax check
ansible-playbook -i inventory.ini site.yml --syntax-check`,
      config: `# Example final operational checklist
# 1. Inventory
ansible-inventory -i inventory.ini --graph

# 2. Connectivity
ansible all -i inventory.ini -m ansible.builtin.ping

# 3. Syntax
ansible-playbook -i inventory.ini site.yml --syntax-check

# 4. Controlled execution
ansible-playbook -i inventory.ini site.yml --limit app01

# 5. Service verification
ansible appservers -i inventory.ini -b -m ansible.builtin.command -a "systemctl is-active payment-api"

# 6. Application health
ansible appservers -i inventory.ini -m ansible.builtin.uri -a "url=http://localhost:8080/health status_code=200"

# 7. RCA documentation
# Record:
# - Incident identifier
# - Failure time
# - Affected hosts
# - Failed task
# - Error output
# - Root cause
# - Recovery action
# - Permanent fix
# - Verification evidence

# Never report a successful deployment based only on a green task recap.
# Verify the service and application behavior independently.`,
      problems: [
        {
          issue: "Play recap is green but the application is not working.",
          rootCause: "The playbook may have suppressed a failure or checked only service process state instead of application functionality.",
          solution: "Add application-level health checks, verify dependencies, inspect logs, and fail the deployment when the real service is unhealthy."
        },
        {
          issue: "The same production failure happens repeatedly.",
          rootCause: "The immediate symptom was corrected without addressing the underlying cause or adding preventive validation.",
          solution: "Complete an RCA, implement a permanent configuration or infrastructure correction, add an automated precondition check, and verify recurrence prevention."
        }
      ]
    }
  ]
};

export default noteData;
