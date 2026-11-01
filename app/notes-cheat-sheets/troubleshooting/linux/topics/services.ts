import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Linux Services and systemd Administration",
  description: "Complete production guide to Linux services, systemd architecture, unit files, service lifecycle, boot targets, dependencies, startup troubleshooting, journald, timers, service security, resource controls, and real-world operations.",

  sections: [
    {
      heading: "1. Introduction to Linux Services",
      explanation: "A Linux service is a background process that provides functionality to the operating system or applications. Examples include SSH, web servers, databases, monitoring agents, container runtimes, and scheduled workers. Services normally start independently of an interactive terminal and may continue running after a user logs out. Modern Linux distributions commonly use systemd to manage service startup, shutdown, dependencies, and supervision. Administrators must understand which services are required, which ports they expose, which account they run under, and how their health is monitored. A service being active does not always mean its application is healthy.",
      steps: [
        "Identify the service and its business purpose.",
        "Check whether the service is installed.",
        "Inspect its current state.",
        "Identify its process and listening ports.",
        "Review service logs.",
        "Check dependencies and configuration.",
        "Validate application-level health.",
        "Document the service owner and recovery procedure."
      ],
      commands: [
        "systemctl status sshd",
        "systemctl list-units --type=service",
        "systemctl --type=service --state=running",
        "systemctl list-unit-files --type=service",
        "ps aux",
        "ss -lntup",
        "journalctl -u sshd",
        "systemctl is-active sshd"
      ],
      problems: [
        {
          issue: "A service is not running after server startup.",
          rootCause: "The service may be disabled, failed, misconfigured, or blocked by a dependency.",
          solution: "Inspect systemctl status, journalctl logs, enabled state, and dependency failures before making a controlled correction."
        },
        {
          issue: "A service is active but the application is unavailable.",
          rootCause: "The process may be running while the application has a configuration, database, network, or readiness problem.",
          solution: "Check application health endpoints, listening sockets, dependencies, and application logs rather than relying only on the active state."
        }
      ]
    },
    {
      heading: "2. Service Management Architecture",
      explanation: "systemd is an init system and service manager used by many modern Linux distributions. It starts as PID 1 and coordinates system initialization, service supervision, mount units, sockets, timers, targets, and other unit types. The systemctl command communicates with systemd to inspect and manage units. Unit definitions describe how a service is started, stopped, restarted, and related to other units. The journal records service and system messages. Understanding the relationship between systemd, unit files, systemctl, and journald is essential for production troubleshooting.",
      steps: [
        "Confirm the distribution uses systemd.",
        "Inspect PID 1.",
        "Identify the relevant service unit.",
        "Review the unit definition and drop-in overrides.",
        "Inspect dependencies and ordering.",
        "Review service logs in the journal.",
        "Use systemctl for controlled lifecycle operations.",
        "Verify the resulting service state."
      ],
      commands: [
        "ps -p 1 -o pid,comm,args",
        "systemctl --version",
        "systemctl status",
        "systemctl list-units",
        "systemctl cat nginx",
        "systemctl show nginx",
        "systemd-analyze",
        "journalctl -b"
      ],
      problems: [
        {
          issue: "systemctl reports that the system is not booted with systemd.",
          rootCause: "The environment may use another init system or be a container without systemd as PID 1.",
          solution: "Check PID 1 and the runtime environment, then use the service-management mechanism supported by that environment."
        },
        {
          issue: "A service unit is not found.",
          rootCause: "The package may not be installed, the unit name may be incorrect, or the unit file may not be in a systemd search path.",
          solution: "Check installed packages, list matching units, inspect unit directories, and reload systemd after approved unit-file changes."
        }
      ]
    },
    {
      heading: "3. Service Lifecycle and systemctl Commands",
      explanation: "The service lifecycle includes starting, stopping, restarting, reloading, enabling, disabling, masking, and inspecting a service. start and stop control the current runtime state. enable configures a unit to start automatically during relevant boot targets, while disable removes that automatic enablement. restart stops and starts a service, potentially interrupting active connections. reload asks a service to reload its configuration without a full stop when supported. Administrators must distinguish runtime state from boot-time enablement and use the least disruptive operation suitable for the change.",
      steps: [
        "Inspect the current service state.",
        "Review the change and its expected impact.",
        "Use start or stop only when required.",
        "Use reload when the application supports it.",
        "Use restart when a full process restart is necessary.",
        "Enable or disable boot startup according to requirements.",
        "Check the service after the operation.",
        "Verify dependent applications."
      ],
      commands: [
        "systemctl status nginx",
        "sudo systemctl start nginx",
        "sudo systemctl stop nginx",
        "sudo systemctl restart nginx",
        "sudo systemctl reload nginx",
        "sudo systemctl enable nginx",
        "sudo systemctl disable nginx",
        "systemctl is-enabled nginx"
      ],
      problems: [
        {
          issue: "A restart interrupts production traffic.",
          rootCause: "The service does not support a graceful reload or the change requires a complete process restart.",
          solution: "Plan a maintenance window or rolling replacement, verify redundancy, and use the application's supported graceful configuration reload where possible."
        },
        {
          issue: "A service starts manually but does not start after reboot.",
          rootCause: "The unit is not enabled, a required target is not reached, or startup dependencies fail.",
          solution: "Check is-enabled, boot logs, dependencies, and the unit's installation configuration."
        }
      ]
    },
    {
      heading: "4. Service States and Failure Diagnosis",
      explanation: "systemd reports states such as active, inactive, activating, deactivating, failed, and unknown. A failed service may have exited with a non-zero status, exceeded a startup timeout, been killed by the operating system, or failed a prerequisite. The active state describes the unit manager's view of the service and does not prove that the application is serving requests correctly. Troubleshooting should combine status output, exit status, recent journal entries, process state, resource usage, and application-level checks.",
      steps: [
        "Run systemctl status for the failed unit.",
        "Record the main PID and exit status.",
        "Read recent journal entries.",
        "Inspect application configuration and dependencies.",
        "Check disk, memory, and CPU pressure.",
        "Check port conflicts and permissions.",
        "Correct the root cause.",
        "Start the service and verify application health."
      ],
      commands: [
        "systemctl status nginx",
        "systemctl is-failed nginx",
        "systemctl show nginx -p ActiveState -p SubState -p Result",
        "journalctl -u nginx -n 100 --no-pager",
        "journalctl -xeu nginx",
        "ps -fp PID",
        "free -h",
        "df -h"
      ],
      problems: [
        {
          issue: "A service repeatedly enters failed state.",
          rootCause: "Invalid configuration, missing dependency, permission issue, port conflict, or application crash.",
          solution: "Inspect the complete failure logs, test the application configuration, verify dependencies and permissions, then restart after correcting the root cause."
        },
        {
          issue: "A service is active but requests return errors.",
          rootCause: "The service process is alive but the application may be unable to connect to a database, access files, or process requests.",
          solution: "Inspect application logs and health checks, test dependent services, and validate the request path end to end."
        }
      ]
    },
    {
      heading: "5. Understanding systemd Unit Files",
      explanation: "A systemd unit file describes a managed resource. A service unit commonly contains Unit, Service, and Install sections. Unit defines description and dependencies. Service defines the executable, user, group, restart policy, environment, and execution behavior. Install describes how the unit is enabled. Unit files can be provided by packages under vendor directories or maintained as local configuration under administrator-controlled directories. Local changes should use drop-in overrides where appropriate so package updates do not overwrite custom configuration.",
      steps: [
        "Locate the service unit.",
        "Read the complete unit configuration.",
        "Identify the executable and arguments.",
        "Inspect user and group settings.",
        "Review restart and timeout policies.",
        "Check dependencies and ordering.",
        "Use a drop-in override for local changes where possible.",
        "Reload systemd and validate the service."
      ],
      commands: [
        "systemctl cat nginx",
        "systemctl show nginx",
        "systemctl show nginx -p FragmentPath",
        "systemctl show nginx -p DropInPaths",
        "systemd-analyze verify /etc/systemd/system/example.service",
        "systemctl daemon-reload",
        "systemctl status example.service",
        "systemctl list-dependencies nginx"
      ],
      problems: [
        {
          issue: "A custom service unit does not load.",
          rootCause: "The unit may contain invalid syntax, an incorrect executable path, or an unsupported directive.",
          solution: "Inspect the unit, run systemd-analyze verify, correct the definition, and reload the systemd manager."
        },
        {
          issue: "A package update removes a manually modified unit setting.",
          rootCause: "The administrator edited a vendor-managed unit file directly.",
          solution: "Use a supported drop-in override under the local systemd configuration directory and verify the effective configuration."
        }
      ]
    },
    {
      heading: "6. Creating and Managing Custom Services",
      explanation: "Custom systemd service units allow teams to manage internal applications, workers, exporters, and scripts consistently with operating-system services. A well-designed service uses an explicit executable path, a dedicated service identity, predictable working directory, controlled environment, appropriate restart policy, and clear dependencies. Long-running applications should remain in the foreground when managed directly by systemd. The service should report failures through its exit status and logs. Custom units must be reviewed for security and operational behavior before production deployment.",
      steps: [
        "Create a dedicated service account.",
        "Install the application in a controlled directory.",
        "Identify the application executable and working directory.",
        "Create a service unit with explicit settings.",
        "Validate unit syntax.",
        "Reload systemd configuration.",
        "Start and inspect the service.",
        "Enable startup only after successful testing."
      ],
      commands: [
        "sudo systemctl edit --full example.service",
        "systemd-analyze verify /etc/systemd/system/example.service",
        "sudo systemctl daemon-reload",
        "sudo systemctl start example.service",
        "systemctl status example.service",
        "journalctl -u example.service",
        "sudo systemctl enable example.service",
        "systemctl is-enabled example.service"
      ],
      problems: [
        {
          issue: "A custom service starts and exits immediately.",
          rootCause: "The application may run as a one-time command, daemonize unexpectedly, or fail during initialization.",
          solution: "Check the application's foreground mode, unit Type setting, executable, exit code, and journal output."
        },
        {
          issue: "A custom service cannot access its application directory.",
          rootCause: "The service account lacks directory traversal or file permissions.",
          solution: "Inspect ownership and the complete path, then grant the service account only the required access."
        }
      ]
    },
    {
      heading: "7. Service Dependencies and Startup Ordering",
      explanation: "Production services often depend on network availability, mounted filesystems, databases, sockets, or other units. systemd provides dependency directives such as Wants, Requires, After, and Before. Dependency relationships and startup ordering are different concepts. Requires expresses a stronger dependency relationship, while After controls ordering when both units are part of the transaction. A service that starts before its dependency is ready may fail even if that dependency eventually becomes active. Applications should implement connection retries and health checks rather than assuming every dependency is instantly ready.",
      steps: [
        "Identify application dependencies.",
        "Inspect existing unit relationships.",
        "Understand whether the dependency is required or optional.",
        "Configure appropriate dependency and ordering directives.",
        "Use readiness checks for external systems.",
        "Test boot and restart behavior.",
        "Inspect failed dependency units.",
        "Verify the application after startup."
      ],
      commands: [
        "systemctl list-dependencies application.service",
        "systemctl list-dependencies --reverse database.service",
        "systemctl show application.service -p Requires -p Wants -p After",
        "systemctl show application.service -p Before",
        "systemctl status network-online.target",
        "journalctl -b -u application.service",
        "systemd-analyze critical-chain",
        "systemd-analyze blame"
      ],
      problems: [
        {
          issue: "An application fails during boot because its database is not ready.",
          rootCause: "The application starts before database readiness or does not retry failed connections.",
          solution: "Review dependency ordering, use suitable readiness checks, and implement application retry behavior."
        },
        {
          issue: "Adding After=database.service does not start the database automatically.",
          rootCause: "After controls ordering but does not itself pull in the other unit.",
          solution: "Use an appropriate Wants or Requires relationship when the dependency must be included, and validate the complete startup transaction."
        }
      ]
    },
    {
      heading: "8. Service Restart Policies and Recovery",
      explanation: "systemd can restart a service after unexpected failure using Restart settings. Common policies include no, on-success, on-failure, on-abnormal, and always. RestartSec controls the delay before restart. StartLimitIntervalSec and StartLimitBurst help prevent endless rapid restart loops. Restart policies improve recovery for transient failures but cannot fix invalid configuration, exhausted storage, unavailable dependencies, or application bugs. Administrators should inspect repeated failures instead of continuously restarting the service without identifying the cause.",
      steps: [
        "Review the application's expected failure behavior.",
        "Choose a suitable restart policy.",
        "Set an appropriate restart delay.",
        "Configure start-rate limiting.",
        "Ensure logs capture the original failure.",
        "Test transient and permanent failure scenarios.",
        "Monitor repeated restart events.",
        "Escalate persistent failures to the application owner."
      ],
      commands: [
        "systemctl show application.service -p Restart",
        "systemctl show application.service -p RestartUSec",
        "systemctl show application.service -p NRestarts",
        "systemctl status application.service",
        "journalctl -u application.service",
        "systemctl reset-failed application.service",
        "systemctl cat application.service",
        "systemd-analyze verify /etc/systemd/system/application.service"
      ],
      problems: [
        {
          issue: "A service enters a continuous restart loop.",
          rootCause: "The application exits repeatedly due to configuration, dependency, permission, or runtime failures.",
          solution: "Stop uncontrolled restart attempts if necessary, inspect the first failure, correct the cause, and use suitable restart limits."
        },
        {
          issue: "A service remains failed after the underlying issue is fixed.",
          rootCause: "systemd may retain a failed state or start-rate limit condition.",
          solution: "Confirm the issue is corrected, use systemctl reset-failed when appropriate, and start the service under observation."
        }
      ]
    },
    {
      heading: "9. Service Logs and journald",
      explanation: "journald collects system and service messages and makes them searchable by unit, boot, priority, time, and other metadata. Administrators use journalctl to investigate startup errors, process exits, permission denials, and repeated restarts. Logs may be volatile or persistent depending on distribution configuration. Production systems should forward important logs to centralized storage and maintain suitable retention. When a service fails, inspect logs around the first failure rather than only the latest restart message.",
      steps: [
        "Identify the service unit name.",
        "Read recent service-specific logs.",
        "Filter by boot and time range.",
        "Review warning and error priorities.",
        "Correlate service logs with application logs.",
        "Check journal storage and retention.",
        "Forward important events centrally.",
        "Preserve relevant logs during incidents."
      ],
      commands: [
        "journalctl -u nginx",
        "journalctl -u nginx -n 100",
        "journalctl -u nginx -f",
        "journalctl -u nginx --since today",
        "journalctl -b",
        "journalctl -p err",
        "journalctl --disk-usage",
        "journalctl --list-boots"
      ],
      problems: [
        {
          issue: "journalctl does not show logs from a previous reboot.",
          rootCause: "Journal storage may be configured as volatile or previous logs may have been removed by retention policy.",
          solution: "Review journald configuration and persistent storage requirements, then forward critical logs to a centralized logging system."
        },
        {
          issue: "Service logs are too large to investigate manually.",
          rootCause: "The service produces high-volume logs or the query is not filtered.",
          solution: "Filter by unit, time, priority, and boot; correlate relevant events and use centralized log search for larger investigations."
        }
      ]
    },
    {
      heading: "10. Service Startup and Boot Targets",
      explanation: "systemd targets group units into system states such as multi-user and graphical operation. The default target determines the normal startup destination. Services can be enabled for a target and may have ordering relationships with network or filesystem targets. Boot troubleshooting should identify the point where startup slows or fails. systemd-analyze provides boot timing information, while critical-chain shows important dependencies along a startup path. Administrators should not change the default target without understanding its effect on remote administration and application availability.",
      steps: [
        "Inspect the current default target.",
        "Review enabled services.",
        "Check failed units after boot.",
        "Analyze boot duration.",
        "Inspect critical dependency chains.",
        "Identify services that delay startup.",
        "Make approved dependency or enablement changes.",
        "Test a complete reboot in a controlled environment."
      ],
      commands: [
        "systemctl get-default",
        "systemctl list-units --type=target",
        "systemctl list-unit-files --state=enabled",
        "systemctl --failed",
        "systemd-analyze",
        "systemd-analyze blame",
        "systemd-analyze critical-chain",
        "journalctl -b -p warning"
      ],
      problems: [
        {
          issue: "A production server takes too long to boot.",
          rootCause: "Slow dependencies, network timeouts, filesystem checks, or services with long startup times.",
          solution: "Use systemd-analyze and boot logs to identify the bottleneck, then fix the specific dependency or service."
        },
        {
          issue: "A required application is missing after reboot.",
          rootCause: "The service is disabled, failed during boot, or attached to an unexpected target.",
          solution: "Inspect enablement, target relationships, and boot journal entries before changing startup configuration."
        }
      ]
    },
    {
      heading: "11. Service Configuration Reload and Graceful Restart",
      explanation: "Applications often support reloading configuration without terminating the main process. This is useful for web servers, logging agents, and other services that can apply updated settings safely. A reload is not universally supported, and systemctl reload may fail when the unit has no reload action. A graceful restart may be available through application-specific commands. Before applying configuration changes, use the application's configuration validation command where available. Always verify active connections, logs, and health checks after a reload.",
      steps: [
        "Back up the current configuration.",
        "Make a reviewed configuration change.",
        "Run the application's syntax validation.",
        "Check whether the service supports reload.",
        "Apply a graceful reload if supported.",
        "Use a restart only when required.",
        "Inspect service and application logs.",
        "Verify application behavior and active traffic."
      ],
      commands: [
        "systemctl show nginx -p CanReload",
        "nginx -t",
        "apachectl configtest",
        "sudo systemctl reload nginx",
        "sudo systemctl reload-or-restart nginx",
        "systemctl status nginx",
        "journalctl -u nginx -n 50",
        "curl -I http://127.0.0.1"
      ],
      problems: [
        {
          issue: "systemctl reload fails for a service.",
          rootCause: "The service unit or application does not implement a reload operation.",
          solution: "Check CanReload and application documentation, validate the configuration, and use an approved restart procedure if necessary."
        },
        {
          issue: "A reload succeeds but the application still uses old behavior.",
          rootCause: "The application may not reload the changed setting, the wrong configuration file was edited, or a dependent process needs restarting.",
          solution: "Confirm the effective configuration path, inspect application logs, and follow the application's documented reload behavior."
        }
      ]
    },
    {
      heading: "12. Service Environment Variables and Runtime Settings",
      explanation: "Services may require environment variables for configuration, runtime behavior, and application startup. systemd unit files support Environment and EnvironmentFile directives. Environment files should be protected when they contain sensitive values. Administrators must distinguish shell environment variables from variables configured for a managed service. A variable exported in an administrator's interactive terminal is not automatically available to a system service. Changes to unit environment settings normally require a daemon reload and service restart or reload according to application behavior.",
      steps: [
        "Identify the required environment variables.",
        "Determine how the service receives its environment.",
        "Review Environment and EnvironmentFile directives.",
        "Protect files containing sensitive values.",
        "Avoid printing secrets into logs or terminals.",
        "Apply a controlled configuration change.",
        "Reload systemd and restart when required.",
        "Verify service behavior without exposing secret values."
      ],
      commands: [
        "systemctl cat application.service",
        "systemctl show application.service -p Environment",
        "systemctl show application.service -p EnvironmentFiles",
        "systemctl daemon-reload",
        "systemctl restart application.service",
        "journalctl -u application.service",
        "ps -eo pid,user,comm",
        "systemctl status application.service"
      ],
      problems: [
        {
          issue: "An application reports that a required environment variable is missing.",
          rootCause: "The variable was set in an interactive shell but not in the systemd service environment.",
          solution: "Configure the variable through the approved unit or protected environment file, reload systemd, and restart the service."
        },
        {
          issue: "A secret appears in service diagnostics.",
          rootCause: "Environment output or debug logging exposes sensitive configuration.",
          solution: "Restrict diagnostic access, remove secret logging, rotate exposed credentials, and use a protected secret-management mechanism."
        }
      ]
    },
    {
      heading: "13. Service Users, Permissions, and Security Hardening",
      explanation: "A production service should run with the minimum privileges required. systemd supports settings such as User, Group, NoNewPrivileges, PrivateTmp, ProtectSystem, ProtectHome, ReadWritePaths, and capability restrictions. These settings can reduce the impact of a compromised process. Hardening must be compatible with application requirements because restricting filesystem or kernel access can prevent legitimate operation. systemd-analyze security can provide a useful view of a unit's sandboxing posture, but its score is not a substitute for application threat modeling.",
      steps: [
        "Identify the service's effective user and group.",
        "Remove unnecessary root execution.",
        "Review filesystem write requirements.",
        "Evaluate supported systemd sandboxing options.",
        "Restrict unnecessary capabilities.",
        "Test application startup and normal workloads.",
        "Review security logs for denied operations.",
        "Document any required exceptions."
      ],
      commands: [
        "systemctl show application.service -p User -p Group",
        "systemctl cat application.service",
        "systemd-analyze security application.service",
        "getcap -r /opt/application",
        "namei -l /opt/application",
        "ps -eo pid,user,group,args",
        "journalctl -u application.service",
        "systemctl status application.service"
      ],
      problems: [
        {
          issue: "A service fails after enabling ProtectSystem.",
          rootCause: "The application needs write access to a filesystem path that has become read-only.",
          solution: "Identify the exact required write path and configure a narrow approved exception such as ReadWritePaths."
        },
        {
          issue: "A service runs as root even though it does not require it.",
          rootCause: "The unit was deployed without a dedicated service identity.",
          solution: "Create a service account, migrate file ownership carefully, set User and Group, and test all application operations."
        }
      ]
    },
    {
      heading: "14. Resource Limits and Service Performance",
      explanation: "systemd can manage service resource consumption through supported control-group settings. CPU, memory, task count, and I/O controls can help prevent one workload from exhausting the host. Resource limits must be based on observed workload requirements and capacity planning. A limit that is too restrictive can cause out-of-memory termination, latency, or failed jobs. Administrators should correlate systemd resource settings with application metrics, kernel logs, and system pressure before changing production limits.",
      steps: [
        "Measure baseline CPU and memory use.",
        "Inspect current unit resource properties.",
        "Identify service-specific capacity requirements.",
        "Choose appropriate limits.",
        "Apply changes through approved unit configuration.",
        "Monitor pressure and termination events.",
        "Test under realistic load.",
        "Review limits after application growth."
      ],
      commands: [
        "systemctl show application.service -p CPUQuota -p MemoryMax",
        "systemctl show application.service -p TasksMax",
        "systemd-cgtop",
        "systemd-cgls",
        "free -h",
        "vmstat 1 5",
        "top",
        "journalctl -k | grep -i -E 'oom|killed process'"
      ],
      problems: [
        {
          issue: "A service is terminated due to memory pressure.",
          rootCause: "The service exceeds its configured memory limit or the host has insufficient available memory.",
          solution: "Review cgroup settings, kernel OOM logs, application memory behavior, and host capacity before adjusting limits."
        },
        {
          issue: "A CPU quota causes high application latency.",
          rootCause: "The configured CPU limit is below the workload's actual processing requirement.",
          solution: "Measure workload demand, review CPU pressure, and adjust the quota through a controlled capacity change."
        }
      ]
    },
    {
      heading: "15. systemd Timers and Scheduled Services",
      explanation: "systemd timers provide scheduling for systemd services and can be used as an alternative to some cron jobs. A timer unit defines when a related service should run. Calendar timers schedule work using date and time expressions, while monotonic timers schedule relative to events such as boot or activation. Timer units can provide logging, dependency management, and service lifecycle integration. Administrators should understand missed-run behavior, time synchronization, and whether the scheduled task is safe to execute more than once.",
      steps: [
        "Identify the scheduled task and its execution requirements.",
        "Create or inspect the associated service unit.",
        "Create a timer unit with the correct schedule.",
        "Validate both unit files.",
        "Enable and start the timer.",
        "Inspect the next scheduled activation.",
        "Review service execution logs.",
        "Test duplicate and missed-run behavior."
      ],
      commands: [
        "systemctl list-timers --all",
        "systemctl status example.timer",
        "systemctl cat example.timer",
        "systemctl cat example.service",
        "systemd-analyze calendar daily",
        "sudo systemctl enable --now example.timer",
        "journalctl -u example.service",
        "systemctl show example.timer"
      ],
      problems: [
        {
          issue: "A scheduled systemd task does not execute.",
          rootCause: "The timer is inactive, the calendar expression is invalid, or the related service fails.",
          solution: "Inspect list-timers, timer status, unit syntax, next activation, and the associated service journal."
        },
        {
          issue: "A scheduled task runs more than once and duplicates work.",
          rootCause: "The application is not idempotent or multiple scheduling mechanisms trigger the same job.",
          solution: "Identify all schedulers, enforce single ownership, and make the task safe against duplicate execution."
        }
      ]
    },
    {
      heading: "16. Service Networking, Ports, and Socket Activation",
      explanation: "Services communicate through network sockets and local IPC mechanisms. Administrators should identify listening ports, bind addresses, firewall policy, and service dependencies. systemd socket activation allows a socket unit to listen and start a related service when a connection arrives. This can improve startup behavior for supported applications but requires correct service and socket configuration. A process listening only on loopback is not remotely accessible, while a wildcard bind may expose it on multiple interfaces. Verify the actual bind address and network policy before making changes.",
      steps: [
        "Identify the service's expected port and protocol.",
        "Inspect listening sockets and process ownership.",
        "Check the bind address.",
        "Review host and cloud firewall policy.",
        "Inspect socket activation configuration if used.",
        "Test local and remote connectivity.",
        "Correlate connection failures with logs.",
        "Document approved network exposure."
      ],
      commands: [
        "ss -lntup",
        "ss -lx",
        "systemctl list-sockets",
        "systemctl status example.socket",
        "systemctl cat example.socket",
        "ip addr",
        "ip route",
        "nc -vz 127.0.0.1 8080"
      ],
      problems: [
        {
          issue: "A service is reachable locally but not from another server.",
          rootCause: "The service may bind only to loopback or network controls may block remote traffic.",
          solution: "Inspect the bind address, route, firewall, cloud security policy, and application logs."
        },
        {
          issue: "A socket-activated service does not start on incoming traffic.",
          rootCause: "The socket unit may be inactive, misconfigured, or not linked to the expected service.",
          solution: "Inspect systemctl list-sockets, socket unit configuration, activation logs, and the related service definition."
        }
      ]
    },
    {
      heading: "17. Service Dependencies on Databases and External Systems",
      explanation: "Applications commonly depend on databases, message brokers, DNS, storage, APIs, and authentication systems. A Linux service can be active while an external dependency is unavailable. Service startup ordering cannot guarantee that a remote database or cloud API is fully ready. Robust applications should use connection timeouts, retry logic, health checks, and clear failure reporting. Operations teams should monitor both process health and dependency health. Troubleshooting must follow the complete request path rather than repeatedly restarting the application.",
      steps: [
        "List the application's external dependencies.",
        "Check local service state.",
        "Test DNS resolution and network reachability.",
        "Check database or API health.",
        "Inspect connection timeout and retry logs.",
        "Verify credentials and certificates.",
        "Restore the dependency or application configuration.",
        "Run end-to-end health checks."
      ],
      commands: [
        "systemctl status application.service",
        "getent hosts database.example.com",
        "nc -vz database.example.com 5432",
        "curl -v https://api.example.com/health",
        "journalctl -u application.service --since '30 minutes ago'",
        "ss -plant",
        "timedatectl status",
        "systemctl --failed"
      ],
      problems: [
        {
          issue: "An application service is active but database requests fail.",
          rootCause: "Database connectivity, credentials, DNS, TLS, or database capacity may be unavailable.",
          solution: "Test the connection from the application host, inspect application logs, validate credentials securely, and check database health."
        },
        {
          issue: "A service starts before an external API becomes available.",
          rootCause: "systemd local ordering cannot guarantee remote API readiness.",
          solution: "Implement bounded retries and health checks in the application and ensure monitoring detects prolonged dependency failure."
        }
      ]
    },
    {
      heading: "18. Service Recovery, Maintenance, and Change Management",
      explanation: "Production service operations require controlled maintenance, recovery planning, and change records. Before a change, identify the affected service, dependencies, customer impact, rollback plan, and validation criteria. A service restart should be coordinated with redundancy and traffic routing. Configuration backups should be protected and tested. After the change, validate systemd state, application health, logs, metrics, and dependent services. A successful command execution is not sufficient proof that a production change is safe.",
      steps: [
        "Identify service owner and business impact.",
        "Review the proposed change and dependencies.",
        "Back up configuration using approved procedures.",
        "Prepare a rollback or recovery plan.",
        "Schedule and communicate the maintenance.",
        "Apply the change and observe service behavior.",
        "Run application and dependency health checks.",
        "Record results and close the change."
      ],
      commands: [
        "systemctl status application.service",
        "systemctl cat application.service",
        "systemctl show application.service",
        "journalctl -u application.service --since today",
        "systemctl --failed",
        "ss -lntup",
        "curl -fsS http://127.0.0.1:8080/health",
        "systemd-analyze verify /etc/systemd/system/application.service"
      ],
      problems: [
        {
          issue: "A configuration rollout causes a production outage.",
          rootCause: "The change was not validated, dependencies were missed, or rollback procedures were incomplete.",
          solution: "Follow the incident process, restore the last approved configuration where safe, validate application health, and review the change process."
        },
        {
          issue: "A service is healthy after restart but downstream jobs fail.",
          rootCause: "Dependent workers, queues, databases, or scheduled tasks were not validated.",
          solution: "Perform end-to-end validation and monitor downstream components before declaring the maintenance complete."
        }
      ]
    },
    {
      heading: "19. Real-World Production Service Troubleshooting Runbook",
      explanation: "Consider a production NGINX service that becomes unavailable after a configuration deployment. systemctl reports a failed state, customers receive connection errors, and the monitoring system triggers an alert. The engineer checks the service status, identifies the failed configuration validation, reads journal entries, and tests the NGINX configuration. The team restores the last approved configuration, validates syntax, and performs a controlled restart or reload. After service recovery, the engineer verifies the listening port, local health endpoint, external request path, and application metrics. The root cause is recorded and the deployment validation process is improved.",
      steps: [
        "Acknowledge the alert and identify the affected service.",
        "Check systemctl status and recent logs.",
        "Identify the first failure and exit status.",
        "Validate application configuration.",
        "Check permissions, dependencies, and listening ports.",
        "Review recent deployment changes.",
        "Restore approved configuration if necessary.",
        "Start or reload the service using a safe procedure.",
        "Run local and external health checks.",
        "Monitor error rate, latency, and service restarts.",
        "Document root cause and preventive actions."
      ],
      commands: [
        "systemctl status nginx",
        "journalctl -xeu nginx",
        "nginx -t",
        "systemctl show nginx -p ActiveState -p SubState -p Result",
        "ss -lntup",
        "curl -I http://127.0.0.1",
        "systemctl --failed",
        "journalctl -u nginx --since '15 minutes ago'"
      ],
      problems: [
        {
          issue: "NGINX fails to start after a deployment.",
          rootCause: "The configuration contains an invalid directive, missing file, or unavailable certificate.",
          solution: "Run nginx -t, inspect the exact error, restore or correct the configuration, and validate before starting the service."
        },
        {
          issue: "NGINX is running but users receive connection errors.",
          rootCause: "The process may not be listening on the expected address, the firewall may block traffic, or the upstream application may be unhealthy.",
          solution: "Inspect listening sockets, firewall and routing, NGINX access and error logs, and upstream application health."
        }
      ]
    },
    {
      heading: "20. Linux Services Interview Questions and Answers",
      explanation: "Service-management interviews focus on systemd architecture, lifecycle commands, unit files, dependencies, logs, restart behavior, boot troubleshooting, security, and production recovery. Strong answers should explain the difference between runtime and boot configuration, identify the right diagnostic commands, and demonstrate safe operational judgment. Always connect the service manager's status with actual application health.",
      steps: [
        "Explain the service management objective.",
        "Identify the unit and current state.",
        "Inspect unit configuration and dependencies.",
        "Review logs and exit status.",
        "Check application and network health.",
        "Apply a controlled correction.",
        "Verify the final service behavior."
      ],
      commands: [
        "systemctl status nginx",
        "systemctl list-units --type=service",
        "systemctl list-unit-files --type=service",
        "systemctl cat nginx",
        "journalctl -u nginx",
        "systemd-analyze",
        "systemctl --failed",
        "systemctl list-timers --all"
      ],
      interviewQuestions: [
        {
          question: "1. What is a Linux service?",
          answer: "A Linux service is a background process that provides functionality such as SSH, web hosting, databases, or monitoring."
        },
        {
          question: "2. What is systemd?",
          answer: "systemd is an init system and service manager used by many Linux distributions. It manages services, dependencies, targets, sockets, timers, and system startup."
        },
        {
          question: "3. What is PID 1?",
          answer: "PID 1 is the first userspace process started by the kernel. On systemd-based systems, systemd normally runs as PID 1."
        },
        {
          question: "4. How do you check a service status?",
          answer: "I use systemctl status service-name to inspect its state, main process, recent logs, and failure information."
        },
        {
          question: "5. What is the difference between start and enable?",
          answer: "start runs the service now. enable configures it to start automatically during relevant boot targets."
        },
        {
          question: "6. What is the difference between stop and disable?",
          answer: "stop stops the currently running service. disable removes its automatic boot enablement."
        },
        {
          question: "7. What is the difference between restart and reload?",
          answer: "restart stops and starts the service process. reload asks the service to apply configuration changes without a complete restart when supported."
        },
        {
          question: "8. How do you identify failed services?",
          answer: "I use systemctl --failed and then inspect individual units with systemctl status and journalctl."
        },
        {
          question: "9. How do you view service logs?",
          answer: "I use journalctl -u service-name. I can also filter by time, priority, boot, and number of entries."
        },
        {
          question: "10. What is a systemd unit file?",
          answer: "A unit file defines how systemd manages a resource such as a service, socket, timer, mount, or target."
        },
        {
          question: "11. What are the main sections of a service unit?",
          answer: "Common sections are Unit, Service, and Install. They define metadata and dependencies, service execution behavior, and installation relationships."
        },
        {
          question: "12. What is daemon-reload?",
          answer: "systemctl daemon-reload makes systemd reload unit definitions after unit files or drop-in configuration have changed."
        },
        {
          question: "13. What is the purpose of systemd-analyze verify?",
          answer: "It checks unit files for configuration and syntax problems before they are used."
        },
        {
          question: "14. What is the difference between Wants and Requires?",
          answer: "Wants creates a weaker dependency relationship. Requires creates a stronger dependency relationship where failure or stopping of the required unit can affect the requesting unit."
        },
        {
          question: "15. What does After mean in systemd?",
          answer: "After defines startup ordering relative to another unit. It does not by itself pull that other unit into the startup transaction."
        },
        {
          question: "16. What is a restart policy?",
          answer: "A restart policy tells systemd whether to restart a service after exit or failure. Examples include on-failure and always."
        },
        {
          question: "17. What causes a service restart loop?",
          answer: "Common causes include invalid configuration, unavailable dependencies, permission errors, application crashes, and unsuitable restart settings."
        },
        {
          question: "18. How do you reset a failed service state?",
          answer: "After correcting the underlying issue, I can use systemctl reset-failed service-name and then start the service."
        },
        {
          question: "19. How do you find the service unit file path?",
          answer: "I use systemctl show service-name -p FragmentPath or systemctl cat service-name."
        },
        {
          question: "20. How do you create a custom systemd service?",
          answer: "I create a unit file with the executable, service identity, working directory, dependencies, and restart behavior, validate it, reload systemd, and test it."
        },
        {
          question: "21. What is journald?",
          answer: "journald is systemd's logging service. It collects and indexes system and service messages for querying through journalctl."
        },
        {
          question: "22. How do you analyze slow boot time?",
          answer: "I use systemd-analyze, systemd-analyze blame, and systemd-analyze critical-chain to identify slow services and startup dependencies."
        },
        {
          question: "23. What is a systemd target?",
          answer: "A target groups units into a system state or synchronization point, such as multi-user.target or graphical.target."
        },
        {
          question: "24. What is a systemd timer?",
          answer: "A timer unit schedules another unit, usually a service, based on calendar or monotonic time."
        },
        {
          question: "25. How do you check whether a service starts automatically?",
          answer: "I use systemctl is-enabled service-name and inspect the relevant unit installation configuration."
        },
        {
          question: "26. How do you secure a systemd service?",
          answer: "I run it as a dedicated user, restrict capabilities and filesystem access, use supported sandboxing settings, and review its network exposure."
        },
        {
          question: "27. What is socket activation?",
          answer: "systemd can listen on a configured socket and start the related service when a connection arrives, if the application supports it."
        },
        {
          question: "28. Why can a service be active but still unhealthy?",
          answer: "The process may be running while its database, upstream API, filesystem, or application request handling is failing. I verify application-level health."
        },
        {
          question: "29. How do you troubleshoot a service that fails after reboot?",
          answer: "I inspect systemctl status, enablement, boot journal entries, dependencies, unit configuration, and resource availability."
        },
        {
          question: "30. What is your production approach when a critical service fails?",
          answer: "I acknowledge the alert, inspect status and logs, identify the root cause, check dependencies and resources, apply an approved recovery, verify application health, and document the incident."
        }
      ]
    }
  ]
};

export default data;
