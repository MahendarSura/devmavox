import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Linux Process Management and Production Troubleshooting",
  description: "Complete practical Linux process management guide covering process architecture, lifecycle, PID, PPID, threads, states, signals, foreground and background jobs, scheduling, systemd, resource limits, logs, production troubleshooting, security, performance, monitoring, and interview preparation.",

  sections: [
    {
      heading: "1. Introduction to Linux Processes",
      explanation: "A process is an executing instance of a program. A program is stored instructions, while a process is the active execution managed by the Linux kernel. Every process has a PID, parent PID, credentials, memory mappings, open file descriptors, environment variables, working directory, and scheduling information. Linux processes run web servers, databases, application runtimes, deployment agents, monitoring tools, and operating-system services. Process management is essential because an uncontrolled process can exhaust CPU, memory, process IDs, disk I/O, network connections, or file descriptors.",
      steps: [
        "Identify the application or command that is executing.",
        "Find its PID using ps, pgrep, or pidof.",
        "Check the process owner and parent process.",
        "Inspect CPU, memory, and process state.",
        "Determine whether it is interactive or service-managed.",
        "Inspect application and system logs.",
        "Choose a safe process-control operation.",
        "Verify application health after the action."
      ],
      commands: [
        "ps aux",
        "ps -ef",
        "top",
        "pgrep -a nginx",
        "pidof sshd",
        "pstree -p",
        "ps -p PID -o pid,ppid,user,stat,%cpu,%mem,cmd",
        "cat /proc/PID/status"
      ],
      problems: [
        {
          issue: "An expected process is not visible after starting a command.",
          rootCause: "The command may have exited immediately, failed during initialization, or started under a different executable name.",
          solution: "Run the command interactively, inspect its exit code and logs, and search using pgrep, systemctl, and the executable path."
        },
        {
          issue: "It is unclear which processes belong to an application.",
          rootCause: "The application may use worker processes, wrappers, renamed executables, or a supervisor.",
          solution: "Inspect the process tree, command line, executable link, parent PID, service unit, and process owner."
        }
      ]
    },
    {
      heading: "2. Linux Process Architecture",
      explanation: "The kernel maintains task information for processes and threads. It includes identifiers, scheduling data, credentials, signal handling information, memory-management references, and open-resource references. A process can create a child using fork. The exec family replaces the current program image with another executable. Threads are schedulable execution units that normally share the address space and many resources of their process. The process tree represents parent-child relationships. On most modern systemd-based distributions, PID 1 is the initial userspace process and service manager. The /proc virtual filesystem exposes process information through directories named with PIDs.",
      steps: [
        "Understand the difference between a program, process, and thread.",
        "Inspect PID, PPID, and thread identifiers.",
        "Understand how fork creates a child process.",
        "Understand how exec loads a new program image.",
        "Inspect process memory and file descriptors.",
        "Identify the role of PID 1.",
        "Inspect cgroups and namespaces.",
        "Correlate process details with kernel resource usage."
      ],
      commands: [
        "ps -eLf",
        "ps -eo pid,ppid,tid,comm",
        "pstree -ap",
        "cat /proc/PID/status",
        "cat /proc/PID/cmdline",
        "readlink -f /proc/PID/exe",
        "ls -l /proc/PID/fd",
        "cat /proc/PID/cgroup"
      ],
      problems: [
        {
          issue: "A process appears multiple times in monitoring output.",
          rootCause: "The command may be displaying individual threads rather than only process leaders.",
          solution: "Compare PID and TID fields and use a process-only view when counting processes."
        },
        {
          issue: "A process has an unexpected parent PID.",
          rootCause: "Its original parent may have exited and the child may have been adopted by PID 1 or another subreaper.",
          solution: "Inspect the current process tree and service supervisor instead of assuming the current PPID identifies the original launcher."
        }
      ]
    },
    {
      heading: "3. Process Lifecycle and Internal Working",
      explanation: "A typical process lifecycle begins when an existing process creates a child. The kernel assigns the child a PID and establishes its execution context. The child may continue executing the same program or use exec to load another executable. The scheduler allocates CPU time when the task is runnable. A process may sleep while waiting for disk I/O, network activity, a timer, a lock, or another event. When the process exits, its termination status becomes available to its parent. The parent normally collects that status using wait. A terminated child whose status has not been collected remains a zombie. If the parent exits first, the child becomes an orphan and is adopted by an appropriate reaper.",
      steps: [
        "A parent process creates a child process.",
        "The kernel assigns the child a PID.",
        "The child continues execution or loads another executable.",
        "The scheduler selects runnable tasks for CPU execution.",
        "The process may sleep while waiting for resources.",
        "The process exits and records its termination status.",
        "The parent collects the status using wait.",
        "An uncollected terminated child may remain a zombie."
      ],
      commands: [
        "ps -eo pid,ppid,stat,comm",
        "pstree -p",
        "strace -f -e trace=process command",
        "cat /proc/PID/status",
        "ps -o pid,ppid,state,etimes,cmd -p PID",
        "echo $?",
        "journalctl -u application.service"
      ],
      problems: [
        {
          issue: "A terminated child remains in the process table.",
          rootCause: "The parent has not collected the child's exit status.",
          solution: "Identify the parent process and investigate its child-management logic. Correct or safely restart the responsible application."
        },
        {
          issue: "A child process continues after its original parent exits.",
          rootCause: "The child became an orphan and was adopted by a reaper process.",
          solution: "Inspect its current PPID, command line, owner, and service relationship before deciding whether it should continue running."
        }
      ]
    },
    {
      heading: "4. Process States and Signals",
      explanation: "Linux process state codes describe a task's execution condition. R means running or runnable, S means interruptible sleep, D means uninterruptible sleep, T means stopped or traced, and Z means zombie. Additional flags may appear in the STAT column. Signals notify or control processes. SIGTERM requests graceful termination. SIGKILL forces termination and cannot be caught or ignored. SIGHUP is used by some daemons to reload configuration, but behavior depends on the application. SIGSTOP pauses a process and SIGCONT resumes it. Signals must be used carefully because forced termination can interrupt transactions or leave temporary data.",
      steps: [
        "Inspect the STAT column using ps.",
        "Determine whether the process is running, sleeping, stopped, or zombie.",
        "Check the process owner and parent relationship.",
        "Use SIGTERM for graceful termination.",
        "Allow time for application cleanup.",
        "Use SIGKILL only when necessary and approved.",
        "Use documented application reload mechanisms.",
        "Verify service health after sending a signal."
      ],
      commands: [
        "ps -eo pid,ppid,stat,comm",
        "kill -TERM PID",
        "kill -HUP PID",
        "kill -STOP PID",
        "kill -CONT PID",
        "kill -KILL PID",
        "kill -l",
        "ps -p PID -o pid,stat,cmd"
      ],
      problems: [
        {
          issue: "A process does not exit after SIGTERM.",
          rootCause: "It may be blocked, performing slow shutdown work, or not responding to the signal.",
          solution: "Inspect logs and process state, check I/O waits, allow the documented shutdown period, and escalate only after impact assessment."
        },
        {
          issue: "A daemon does not reload after SIGHUP.",
          rootCause: "The application may not implement SIGHUP reload behavior.",
          solution: "Consult the application documentation and use its supported reload command or systemctl reload."
        }
      ]
    },
    {
      heading: "5. Foreground and Background Processes",
      explanation: "A foreground process runs attached to the current terminal and normally receives interactive input. A background job runs without occupying the shell's foreground job slot. Shell job control supports starting commands with an ampersand, suspending foreground jobs with Ctrl+Z, listing jobs, and moving jobs between foreground and background. Background execution does not automatically create a reliable production service. Terminal closure, shell exit behavior, input, output redirection, and session handling can affect the process. Use systemd or an appropriate process supervisor for persistent production workloads.",
      steps: [
        "Run a command normally for foreground execution.",
        "Append ampersand to start a background job.",
        "Press Ctrl+Z to suspend a foreground job.",
        "Use jobs to list jobs managed by the current shell.",
        "Use bg to resume a suspended job.",
        "Use fg to return a job to the foreground.",
        "Redirect output and errors to log files.",
        "Use systemd for persistent production workloads."
      ],
      commands: [
        "sleep 300",
        "sleep 300 &",
        "jobs -l",
        "bg %1",
        "fg %1",
        "nohup command > application.log 2>&1 &",
        "disown %1",
        "tail -f application.log"
      ],
      problems: [
        {
          issue: "A background job stops when the terminal closes.",
          rootCause: "The process is associated with the shell session and may receive a hangup signal.",
          solution: "Use appropriate session handling for temporary work and create a systemd service for production."
        },
        {
          issue: "A background command loses important output.",
          rootCause: "Standard output or standard error was not redirected.",
          solution: "Redirect both output streams to a controlled log file and configure log rotation."
        }
      ]
    },
    {
      heading: "6. Process Identification and Inspection",
      explanation: "ps provides a snapshot of process information. top and htop provide continuously refreshed views. pgrep searches process names and selected attributes, while pkill sends signals to matching processes. pidof finds PIDs for known executable names. pstree displays parent-child relationships. The /proc filesystem exposes command lines, environment, memory mappings, file descriptors, status, and limits. Always verify the process identity before sending a signal, especially when a search pattern can match multiple applications.",
      steps: [
        "List processes and locate the target command.",
        "Search by a carefully selected process name.",
        "Inspect PID, PPID, owner, state, and elapsed time.",
        "Inspect command-line arguments and executable path.",
        "Check the process tree for worker processes.",
        "Inspect open file descriptors when resource leaks are suspected.",
        "Check thread count and resource limits.",
        "Reconfirm process identity before taking action."
      ],
      commands: [
        "ps aux",
        "ps -ef",
        "ps -eo pid,ppid,user,stat,etime,cmd",
        "pgrep -a -f java",
        "pidof nginx",
        "pstree -ap",
        "readlink -f /proc/PID/exe",
        "ls -l /proc/PID/fd"
      ],
      problems: [
        {
          issue: "A process search returns unrelated processes.",
          rootCause: "A broad pattern matches command arguments or similarly named processes.",
          solution: "Use an exact executable match where possible and inspect the full command line and owner."
        },
        {
          issue: "A PID changes between inspection and action.",
          rootCause: "The original process exited and the PID may have been reused.",
          solution: "Recheck the process identity immediately before action and prefer service-manager operations for managed applications."
        }
      ]
    },
    {
      heading: "7. Process Configuration and Environment",
      explanation: "A process receives configuration from command-line arguments, environment variables, configuration files, inherited file descriptors, working directory, user credentials, and service-manager settings. Environment variables are generally established at process startup; changing a shell variable does not update an existing process. systemd units can define the executable, user, working directory, environment files, restart policy, resource limits, and dependencies. Configuration changes may require reload or restart. Passwords and API tokens should not be exposed through command lines or unrestricted process inspection.",
      steps: [
        "Identify the executable and command-line arguments.",
        "Inspect the service unit and environment-file references.",
        "Confirm the working directory and service account.",
        "Validate configuration syntax before applying changes.",
        "Check file permissions and ownership.",
        "Use a supported reload or restart procedure.",
        "Inspect startup logs for configuration errors.",
        "Verify application health after configuration changes."
      ],
      commands: [
        "systemctl cat application.service",
        "systemctl show application.service",
        "systemctl show application.service -p Environment",
        "cat /proc/PID/environ",
        "readlink -f /proc/PID/cwd",
        "readlink -f /proc/PID/exe",
        "systemd-analyze verify /etc/systemd/system/application.service",
        "systemctl daemon-reload"
      ],
      problems: [
        {
          issue: "A configuration change does not affect the running application.",
          rootCause: "The application reads configuration only during startup or requires a documented reload.",
          solution: "Validate the configuration, use the supported reload operation, or perform a controlled restart."
        },
        {
          issue: "A service cannot read its configuration file.",
          rootCause: "Incorrect permissions, ownership, file path, or service sandbox restrictions.",
          solution: "Inspect the service account and file access permissions, correct the minimum required access, and review logs."
        }
      ]
    },
    {
      heading: "8. CPU Scheduling and Process Priority",
      explanation: "The Linux scheduler decides which runnable task receives CPU time. Scheduling behavior depends on policy, priority, CPU affinity, system load, cgroups, and kernel decisions. The nice value influences the relative priority of normal scheduling tasks: lower nice values generally mean higher priority, while higher values mean lower priority. Real-time scheduling policies behave differently and require careful administration. CPU affinity restricts a process to selected CPUs. Containers may impose CPU quotas or cpusets. Raising priority does not fix inefficient application code or blocked I/O.",
      steps: [
        "Measure CPU usage over time.",
        "Identify the process or thread consuming CPU.",
        "Inspect scheduling policy and nice value.",
        "Check CPU affinity and cgroup restrictions.",
        "Identify application workload and contention.",
        "Change priority only with an operational reason.",
        "Recheck latency and system responsiveness.",
        "Document scheduling changes."
      ],
      commands: [
        "top",
        "ps -eo pid,ni,pri,psr,pcpu,comm --sort=-pcpu",
        "nice -n 10 command",
        "renice 10 -p PID",
        "chrt -p PID",
        "taskset -pc PID",
        "taskset -c 0,1 command",
        "cat /proc/PID/sched"
      ],
      problems: [
        {
          issue: "An application has high CPU usage and slow response.",
          rootCause: "An infinite loop, inefficient workload, excessive threads, traffic spike, or CPU contention.",
          solution: "Identify the hottest process and thread, inspect application metrics and profiles, review deployments, and correct the workload."
        },
        {
          issue: "A process cannot use all available CPUs.",
          rootCause: "CPU affinity, cpuset configuration, container quotas, or service restrictions.",
          solution: "Inspect taskset output, cgroup CPU settings, container configuration, and service restrictions."
        }
      ]
    },
    {
      heading: "9. Process Logs and Journal Analysis",
      explanation: "Process failures are investigated by correlating application logs, system logs, service-manager messages, kernel messages, and exit information. The systemd journal records service startup, shutdown, restart, and failure events. Application logs may reveal invalid configuration, missing dependencies, permission errors, or failed connections. Kernel messages can reveal out-of-memory events and resource failures. Correlate timestamps with deployment events and monitoring alerts. A process disappearing is not enough evidence to identify the cause.",
      steps: [
        "Identify the process and its service unit.",
        "Check current and previous service status.",
        "Read journal entries around the failure timestamp.",
        "Inspect application-specific log files.",
        "Check kernel messages for OOM or resource failures.",
        "Compare timestamps with deployments and configuration changes.",
        "Identify the first meaningful error.",
        "Record evidence before recovery."
      ],
      commands: [
        "journalctl -u application.service",
        "journalctl -u application.service -n 100",
        "journalctl -u application.service --since '1 hour ago'",
        "journalctl -xe",
        "dmesg -T | tail -100",
        "tail -f /var/log/application/application.log",
        "grep -iE 'error|failed|fatal|killed' /var/log/application/application.log",
        "systemctl status application.service"
      ],
      problems: [
        {
          issue: "A process repeatedly exits but the reason is unclear.",
          rootCause: "Output may be redirected elsewhere, journal retention may be limited, or the process may be terminated externally.",
          solution: "Inspect service logging configuration, journal entries, kernel logs, exit status, and deployment history."
        },
        {
          issue: "Logs show that a process was killed unexpectedly.",
          rootCause: "Possible OOM action, administrator termination, service timeout, container limit, or supervisor action.",
          solution: "Correlate journal and kernel logs, inspect memory limits and service settings, and identify the termination source."
        }
      ]
    },
    {
      heading: "10. Process Error Identification",
      explanation: "Common process-related errors include high CPU consumption, memory exhaustion, uninterruptible sleep, unexpected termination, permission denial, process-count exhaustion, file descriptor exhaustion, and failed child-process creation. Symptoms may appear in application health checks, service status, dashboards, or user reports. Distinguish the process itself from the resource or dependency causing the problem. A D-state process may be waiting on storage rather than consuming CPU. A process unable to create children may have reached a process limit.",
      steps: [
        "Capture the exact error and incident timestamp.",
        "Identify the affected PID and parent process.",
        "Inspect process state, CPU, memory, and elapsed time.",
        "Check open files and thread count.",
        "Inspect service and kernel logs.",
        "Check system-wide resource limits.",
        "Determine whether one process or the host is affected.",
        "Choose a fix based on verified evidence."
      ],
      commands: [
        "ps -p PID -o pid,ppid,stat,%cpu,%mem,etime,cmd",
        "top -H -p PID",
        "free -h",
        "vmstat 1 5",
        "cat /proc/PID/limits",
        "ls /proc/PID/fd | wc -l",
        "ps -e --no-headers | wc -l",
        "journalctl -k -n 100"
      ],
      problems: [
        {
          issue: "A process is stuck in D state.",
          rootCause: "It may be waiting for uninterruptible kernel I/O, commonly related to storage or filesystem operations.",
          solution: "Inspect kernel logs, storage health, mount status, and I/O latency. SIGKILL may not take effect until the kernel wait completes."
        },
        {
          issue: "A process cannot create another child.",
          rootCause: "A user process limit, system PID limit, memory shortage, or cgroup task limit may have been reached.",
          solution: "Inspect ulimit, limits.conf, cgroup pids.max, system capacity, and application process creation behavior."
        }
      ]
    },
    {
      heading: "11. Root Cause Analysis",
      explanation: "Root cause analysis separates symptoms from the underlying failure. A process consuming CPU may be a symptom of a retry storm, bad query, traffic spike, or application defect. A process that exits may be responding to a dependency failure or being killed by the kernel. A useful investigation combines process snapshots, service logs, kernel logs, resource metrics, recent change history, and health checks. Capture evidence before restarting because a restart can erase transient state. Build a timeline connecting the first failure, resource changes, alerts, and recovery actions.",
      steps: [
        "Define the user-visible impact and affected service.",
        "Capture process information before changing anything.",
        "Record CPU, memory, I/O, and process counts.",
        "Inspect application, service, and kernel logs.",
        "Compare the incident timeline with recent changes.",
        "Test likely causes using read-only diagnostics.",
        "Identify the first causal event, not just the final symptom.",
        "Document corrective action and preventive controls."
      ],
      commands: [
        "date",
        "uptime",
        "ps aux --sort=-%cpu | head",
        "ps aux --sort=-%mem | head",
        "free -h",
        "vmstat 1 10",
        "iostat -xz 1 5",
        "journalctl --since '30 minutes ago'",
        "dmesg -T | tail -100"
      ],
      problems: [
        {
          issue: "Restarting a service temporarily fixes the issue, but it returns.",
          rootCause: "The restart removes the symptom without fixing a leak, resource exhaustion, bad configuration, or recurring dependency failure.",
          solution: "Capture evidence before restart, inspect resource trends, and fix the underlying application or infrastructure problem."
        },
        {
          issue: "Monitoring tools show different resource values.",
          rootCause: "Tools may use different sampling intervals, units, aggregation rules, or process/thread views.",
          solution: "Compare the same PID and time window and use repeated observations instead of a single snapshot."
        }
      ]
    },
    {
      heading: "12. Step-by-Step Process Troubleshooting",
      explanation: "A safe recovery procedure begins with identification and evidence collection. Verify the service owner, inspect status, and review logs before taking action. For systemd-managed services, use systemctl stop, restart, or reload instead of killing arbitrary worker PIDs. For unmanaged processes, send SIGTERM first and allow a reasonable shutdown period. Forced termination is an escalation step. After recovery, verify process state, application health, dependencies, logs, and alerts. Production actions should follow change-control and incident procedures.",
      steps: [
        "Confirm the affected application and business impact.",
        "Identify its PID and service unit.",
        "Capture process details and recent logs.",
        "Check dependencies, resource usage, and health endpoints.",
        "Choose reload, graceful stop, or restart based on evidence.",
        "Use forced termination only when justified and approved.",
        "Confirm the application starts successfully.",
        "Run health checks and monitor for recurrence."
      ],
      commands: [
        "systemctl status application.service",
        "systemctl reload application.service",
        "systemctl stop application.service",
        "systemctl start application.service",
        "systemctl restart application.service",
        "kill -TERM PID",
        "ps -p PID -o pid,stat,cmd",
        "journalctl -u application.service -n 100"
      ],
      problems: [
        {
          issue: "A restart succeeds but the application remains unhealthy.",
          rootCause: "The process started but dependencies, initialization, or health checks are still failing.",
          solution: "Inspect startup logs, verify listening ports and dependencies, test the application endpoint, and confirm readiness."
        },
        {
          issue: "A worker remains after its service is stopped.",
          rootCause: "The service may not track the worker correctly or the application may have created detached children.",
          solution: "Inspect the process tree and service cgroup, correct supervision configuration, and terminate only verified leftovers."
        }
      ]
    },
    {
      heading: "13. Before and After: Reliable Process Management",
      explanation: "Before proper process management, teams may start applications in terminal sessions, lose logs, manually kill processes, and discover failures through user complaints. After adopting systemd units, health checks, structured logs, restart policies, resource limits, and monitoring, process behavior becomes predictable. A service definition documents how an application starts, which user runs it, where it works, and how it restarts. Monitoring provides early warning for CPU, memory, process count, and service availability. Automation should still include restart limits and alerting so a broken application does not restart forever without investigation.",
      steps: [
        "Replace undocumented terminal commands with service units.",
        "Define a dedicated service account.",
        "Set working directory and configuration paths.",
        "Configure restart behavior and restart limits.",
        "Configure logs and log rotation.",
        "Set resource limits appropriate to the workload.",
        "Add health checks and alerts.",
        "Document rollback and recovery procedures."
      ],
      commands: [
        "systemctl status application.service",
        "systemctl cat application.service",
        "systemctl enable application.service",
        "systemctl restart application.service",
        "systemctl show application.service",
        "journalctl -u application.service -f"
      ],
      problems: [
        {
          issue: "A service restarts continuously.",
          rootCause: "A startup error, invalid configuration, missing dependency, or aggressive restart policy creates a restart loop.",
          solution: "Inspect journal logs, correct the underlying error, and configure an appropriate restart delay and start limit."
        },
        {
          issue: "An application runs as root without needing privileged access.",
          rootCause: "The service was created without a dedicated service account.",
          solution: "Create a least-privilege account, grant only required file and network permissions, and configure the service User and Group."
        }
      ]
    },
    {
      heading: "14. Process Verification and Health Checks",
      explanation: "A process existing does not prove that an application is healthy. Verification should include process identity, service state, listening sockets, application endpoints, dependencies, recent logs, and monitoring signals. A web server may have a running master process while all workers are stuck. A database process may be active while refusing connections. Use service-specific health checks and test from the same network path as clients when possible. Record the result before and after a change so recovery can be demonstrated.",
      steps: [
        "Confirm the expected process exists.",
        "Check the systemd service state.",
        "Verify expected listening ports.",
        "Call the application health endpoint.",
        "Test database and dependency connectivity.",
        "Inspect recent errors and restart counts.",
        "Check resource consumption and latency.",
        "Record verification evidence."
      ],
      commands: [
        "pgrep -a application",
        "systemctl is-active application.service",
        "systemctl status application.service",
        "ss -lntp",
        "curl -fsS http://127.0.0.1:8080/health",
        "journalctl -u application.service -n 50",
        "ps -p PID -o pid,stat,%cpu,%mem,etime,cmd"
      ],
      problems: [
        {
          issue: "The process exists but the health endpoint fails.",
          rootCause: "The application may not have completed startup or may be unable to reach a dependency.",
          solution: "Inspect application logs, readiness state, listening sockets, and dependency connectivity."
        },
        {
          issue: "A service is active but users cannot connect.",
          rootCause: "Firewall rules, routing, DNS, reverse proxy configuration, or application binding may be incorrect.",
          solution: "Test locally and remotely, inspect ss output, firewall rules, proxy logs, and network routes."
        }
      ]
    },
    {
      heading: "15. Process Prevention and Operational Best Practices",
      explanation: "Preventive process management reduces recurring incidents. Use service managers instead of unmanaged shell sessions. Set realistic resource limits, monitor restart loops, rotate logs, patch applications, and remove obsolete processes. Applications should handle termination signals, close resources, flush logs, and exit with meaningful status codes. Process supervisors need clear restart policies and alerting. Regularly review process counts, zombie counts, file descriptors, memory trends, and service failures. Maintain a runbook that explains safe inspection and recovery actions.",
      steps: [
        "Use systemd or an approved supervisor for persistent workloads.",
        "Run services under dedicated least-privilege users.",
        "Set appropriate memory, CPU, and task limits.",
        "Implement graceful shutdown handling in applications.",
        "Configure log rotation and retention.",
        "Alert on restart loops and unusual process counts.",
        "Review zombie and D-state processes.",
        "Test recovery procedures during planned maintenance."
      ],
      commands: [
        "systemctl list-units --type=service --state=failed",
        "ps -eo stat= | sort | uniq -c",
        "ps -e --no-headers | wc -l",
        "ulimit -a",
        "cat /proc/PID/limits",
        "journalctl -p warning -b"
      ],
      problems: [
        {
          issue: "The host repeatedly reaches its process limit.",
          rootCause: "An application may create excessive workers or fail to reap child processes.",
          solution: "Measure process growth, inspect the parent tree, review application worker settings, and configure appropriate limits."
        },
        {
          issue: "Logs fill the filesystem and disrupt applications.",
          rootCause: "Unbounded output or missing log rotation causes log files to grow continuously.",
          solution: "Configure logrotate or journald retention, monitor disk capacity, and correct excessive application logging."
        }
      ]
    },
    {
      heading: "16. Process Security and Permissions",
      explanation: "Processes execute with user and group credentials and may receive additional capabilities. Running every application as root increases the impact of vulnerabilities. Linux permissions, capabilities, namespaces, seccomp, SELinux, AppArmor, and systemd sandboxing can restrict what a process can access. Process command lines and environments may expose secrets to users with sufficient access. Administrators should protect credentials, limit ptrace access, restrict service files, and audit unexpected privileged processes. Security controls should be tested with application requirements before production enforcement.",
      steps: [
        "Identify the user and group running each service.",
        "Remove unnecessary root execution.",
        "Review executable and configuration permissions.",
        "Protect secrets from command-line arguments and world-readable files.",
        "Review Linux capabilities and service sandbox settings.",
        "Check SELinux or AppArmor denials.",
        "Audit unexpected privileged processes.",
        "Apply least privilege and verify application behavior."
      ],
      commands: [
        "ps -eo pid,user,group,comm",
        "id serviceuser",
        "getcap -r /usr/bin 2>/dev/null",
        "sudo -l -U serviceuser",
        "getenforce",
        "aa-status",
        "ls -l /proc/PID/exe",
        "cat /proc/PID/status"
      ],
      problems: [
        {
          issue: "A service fails after being moved to a non-root account.",
          rootCause: "It may rely on privileged ports, protected files, or directories owned by root.",
          solution: "Identify the exact denied operation and grant only the required capability or file access instead of restoring unrestricted root privileges."
        },
        {
          issue: "A process environment exposes credentials.",
          rootCause: "Secrets were passed as environment variables or command-line arguments and are visible to privileged inspection tools.",
          solution: "Use a supported secret manager or protected credential file and restrict access to process inspection and service configuration."
        }
      ]
    },
    {
      heading: "17. Process Performance and Resource Optimization",
      explanation: "Process performance depends on CPU scheduling, memory pressure, disk I/O, network waits, locks, thread count, and application behavior. High CPU usage may indicate expensive computation or a busy loop. High memory usage may indicate a large workload, cache growth, or a leak. High I/O wait can make processes appear slow even when CPU is available. Excessive threads and workers can increase context switching and memory overhead. Use measurements over time and correlate them with application latency before changing worker counts or priority. Optimization should address the measured bottleneck rather than simply increasing server resources.",
      steps: [
        "Capture baseline CPU, memory, load, and I/O metrics.",
        "Identify the most resource-intensive processes.",
        "Inspect per-thread CPU when needed.",
        "Measure I/O latency and memory pressure.",
        "Review worker and thread configuration.",
        "Profile the application where appropriate.",
        "Apply one controlled optimization at a time.",
        "Compare performance before and after."
      ],
      commands: [
        "top",
        "htop",
        "pidstat -u -r -d 1",
        "vmstat 1 10",
        "iostat -xz 1 5",
        "free -h",
        "ps -eo pid,nlwp,%cpu,%mem,comm --sort=-%cpu",
        "sar -u 1 5"
      ],
      problems: [
        {
          issue: "CPU load is high but no single process explains it.",
          rootCause: "Many runnable tasks, kernel work, interrupt activity, or short-lived processes may contribute.",
          solution: "Use pidstat, vmstat, top thread view, and system metrics to identify the source over repeated samples."
        },
        {
          issue: "Application latency rises while CPU usage remains low.",
          rootCause: "The process may be waiting on storage, network dependencies, locks, or connection pools.",
          solution: "Inspect I/O latency, network behavior, thread stacks, dependency health, and application traces."
        }
      ]
    },
    {
      heading: "18. Process Monitoring and Production Operations",
      explanation: "Production process monitoring tracks service availability, restart counts, CPU, memory, thread counts, file descriptors, and application-level health. Tools such as Prometheus exporters, node monitoring agents, systemd, and centralized logging provide historical visibility. Alerts should identify actionable conditions rather than every temporary spike. A useful alert includes the host, service, time window, impact, and diagnostic link. Dashboards should distinguish process existence from application readiness. Monitoring data helps detect gradual leaks, abnormal worker growth, recurring crashes, and resource saturation before they cause an outage.",
      steps: [
        "Define service availability and readiness checks.",
        "Collect CPU, memory, process, and file descriptor metrics.",
        "Monitor restart counts and service failures.",
        "Create thresholds based on normal workload behavior.",
        "Send actionable alerts to the operations team.",
        "Correlate metrics with logs and deployments.",
        "Review trends for leaks and capacity problems.",
        "Test alert delivery and runbook instructions."
      ],
      commands: [
        "systemctl is-active application.service",
        "systemctl show application.service -p NRestarts",
        "ps -eo pid,ppid,stat,%cpu,%mem,comm",
        "pidstat 1",
        "journalctl -u application.service --since today",
        "ss -s",
        "cat /proc/sys/kernel/pid_max"
      ],
      problems: [
        {
          issue: "Monitoring reports the process as healthy while users see failures.",
          rootCause: "The check only tests process existence and not application readiness or dependencies.",
          solution: "Add an application health endpoint and dependency checks, then monitor user-facing latency and errors."
        },
        {
          issue: "Alerts fire repeatedly for brief CPU spikes.",
          rootCause: "Thresholds are too sensitive or lack a suitable evaluation window.",
          solution: "Use sustained-duration conditions, baselines, and severity levels while retaining alerts for genuine saturation."
        }
      ]
    },
    {
      heading: "19. Real-World Production Projects and Scenarios",
      explanation: "Process management is used in practical DevOps operations. In a web application deployment, systemd starts the application runtime, monitors its main process, and records logs. During a high-CPU incident, engineers identify the hottest process and thread, compare traffic and deployment timelines, and roll back a defective release if evidence supports it. During a memory incident, they inspect RSS, cgroup limits, and OOM messages. During a failed deployment, they inspect service exit status, configuration, permissions, and dependency availability. These workflows combine Linux commands with application metrics, monitoring, and change control.",
      steps: [
        "Project 1: Create a systemd unit for a sample web application.",
        "Project 2: Configure a dedicated service user and working directory.",
        "Project 3: Simulate a CPU-intensive process and identify it.",
        "Project 4: Inspect memory use and investigate an OOM event.",
        "Project 5: Diagnose a zombie process using its parent PID.",
        "Project 6: Investigate a D-state process using kernel and storage logs.",
        "Project 7: Configure restart behavior and journal monitoring.",
        "Project 8: Create a runbook and verify recovery after a controlled restart."
      ],
      commands: [
        "systemctl cat demo-app.service",
        "systemctl status demo-app.service",
        "journalctl -u demo-app.service -f",
        "ps -eo pid,ppid,stat,%cpu,%mem,cmd",
        "pidstat -u -r 1",
        "dmesg -T | grep -i -E 'oom|killed process'",
        "systemctl show demo-app.service -p NRestarts"
      ],
      problems: [
        {
          issue: "A deployment starts a new application process but the health check fails.",
          rootCause: "The process may have incorrect configuration, missing environment, permission problems, or unavailable dependencies.",
          solution: "Inspect the service unit, startup logs, environment configuration, listening port, and dependency connectivity; roll back if required."
        },
        {
          issue: "An application is repeatedly killed during peak traffic.",
          rootCause: "Memory consumption may exceed host or container limits under load.",
          solution: "Correlate OOM logs with memory metrics, inspect worker concurrency and memory growth, then optimize or resize based on measured demand."
        }
      ]
    },
    {
      heading: "20. Linux Process Interview Questions and Answers",
      explanation: "These interview questions cover practical Linux process administration, architecture, process states, signals, job control, scheduling, systemd, resource troubleshooting, and production incident handling. Answers are written in simple technical English for DevOps and Linux administrator interviews.",
      interviewQuestions: [
        { question: "What is a process in Linux?", answer: "A process is an executing instance of a program managed by the Linux kernel. It has a PID, memory, credentials, open files, and execution state." },
        { question: "What is the difference between a program and a process?", answer: "A program is a file containing instructions. A process is the running instance of those instructions." },
        { question: "What is a PID?", answer: "PID means Process ID. It is the numeric identifier assigned to a process by the kernel." },
        { question: "What is a PPID?", answer: "PPID means Parent Process ID. It identifies the process that created the child process, subject to later adoption if the parent exits." },
        { question: "What is PID 1?", answer: "PID 1 is the initial userspace process. On most modern Linux distributions it is systemd, which manages system services." },
        { question: "What is the difference between fork and exec?", answer: "fork creates a child process. exec replaces the current process program image with another executable." },
        { question: "What is a thread?", answer: "A thread is a schedulable execution unit. Threads in one process generally share memory and many process resources." },
        { question: "How do you list all processes?", answer: "Use ps aux or ps -ef to display process information." },
        { question: "How do you find a process by name?", answer: "Use pgrep -a process_name or pidof executable_name. Verify the result before sending signals." },
        { question: "What does the R process state mean?", answer: "R means the task is running on a CPU or is runnable and waiting for CPU time." },
        { question: "What does S state mean?", answer: "S means interruptible sleep. The process is waiting for an event and can generally be awakened by a signal." },
        { question: "What does D state mean?", answer: "D means uninterruptible sleep, commonly while waiting for kernel I/O. Investigate storage and kernel messages." },
        { question: "What is a zombie process?", answer: "A zombie is a terminated child whose parent has not yet collected its exit status." },
        { question: "What is an orphan process?", answer: "An orphan is a process whose parent has exited. It is adopted by an appropriate reaper process." },
        { question: "How do you identify zombie processes?", answer: "Use ps -eo pid,ppid,stat,comm and look for Z in the state column." },
        { question: "Can you kill a zombie process directly?", answer: "No. It has already terminated. Investigate its parent and why the parent is not collecting the exit status." },
        { question: "What is SIGTERM?", answer: "SIGTERM requests graceful termination and allows an application to clean up resources." },
        { question: "What is SIGKILL?", answer: "SIGKILL forces termination and cannot be caught, blocked, or ignored by the target process." },
        { question: "What is the difference between SIGTERM and SIGKILL?", answer: "SIGTERM allows graceful shutdown handling. SIGKILL immediately requests forced termination without application cleanup." },
        { question: "How do you suspend and resume a process?", answer: "Use Ctrl+Z for a foreground job, bg to resume it in the background, and fg to bring it to the foreground. SIGSTOP and SIGCONT are signal alternatives." },
        { question: "What is the difference between foreground and background jobs?", answer: "A foreground job uses the terminal as the active job. A background job runs without holding the shell's foreground terminal slot." },
        { question: "What does nohup do?", answer: "nohup runs a command with hangup-signal handling adjusted so it can continue after a terminal session ends, subject to other process and session behavior." },
        { question: "What is a nice value?", answer: "A nice value influences the scheduling priority of normal tasks. A higher nice value generally means lower scheduling priority." },
        { question: "How do you change process priority?", answer: "Use nice when starting a command or renice to change the nice value of an existing process, subject to permissions." },
        { question: "How do you check process CPU and memory usage?", answer: "Use top, ps, or pidstat. For example, ps -eo pid,%cpu,%mem,cmd --sort=-%cpu." },
        { question: "How do you inspect a systemd-managed process?", answer: "Use systemctl status service_name and journalctl -u service_name to inspect service state and logs." },
        { question: "What is a process file descriptor?", answer: "A file descriptor is a per-process handle referring to an open file, socket, pipe, or another I/O resource." },
        { question: "How do you investigate a process using too much memory?", answer: "Inspect RSS and memory metrics with ps and top, check cgroup limits and OOM logs, and correlate growth with application workload." },
        { question: "How do you investigate a process consuming high CPU?", answer: "Identify the process and hot threads using top or pidstat, then inspect workload, traffic, recent deployments, and application profiling data." },
        { question: "What is the safest way to restart a production service?", answer: "Check impact and logs, use the service manager's controlled restart, verify readiness and dependencies, and monitor for recurrence." }
      ]
    }
  ]
};

export default data;
