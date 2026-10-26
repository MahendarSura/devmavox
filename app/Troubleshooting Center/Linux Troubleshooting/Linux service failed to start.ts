// File: app/troubleshootingcentre/Linux Troubleshooting/Linux service failed to start.ts

export interface ServiceCommand {
  title: string;
  command: string;
  purpose: string;
  expectedOutput: string;
  interpretation: string;
}

export interface ServiceTroubleshootingStep {
  step: number;
  title: string;
  objective: string;
  actions: string[];
  commands?: string[];
  expectedResult: string;
  precautions?: string[];
}

export interface ServiceRootCause {
  cause: string;
  symptoms: string[];
  investigation: string[];
  resolution: string[];
}

export interface ServiceIncidentScenario {
  environment: string;
  incident: string;
  impact: string[];
  investigation: string[];
  rootCause: string;
  resolution: string[];
  prevention: string[];
}

export interface LinuxServiceFailureRunbook {
  id: string;
  title: string;
  category: string;
  severity: string;
  summary: string;
  objective: string;
  symptoms: string[];
  businessImpact: string[];
  rootCauses: string[];
  diagnosticCommands: ServiceCommand[];
  troubleshootingSteps: ServiceTroubleshootingStep[];
  rootCauseScenarios: ServiceRootCause[];
  incidentScenario: ServiceIncidentScenario;
  verification: string[];
  prevention: string[];
  monitoring: string[];
  safetyRules: string[];
  incidentReportTemplate: string[];
  troubleshootingChecklist: string[];
}

export const linuxServiceFailedToStart: LinuxServiceFailureRunbook = {
  id: "linux-service-failed-to-start",
  title: "Linux Service Failed to Start",
  category: "Linux Troubleshooting",
  severity: "High / Critical",
  summary:
    "A Linux service may fail to start because of invalid configuration, missing files, " +
    "permission problems, unavailable dependencies, port conflicts, resource exhaustion, " +
    "or application startup errors. The objective is to identify the actual failure " +
    "before attempting a restart.",

  objective:
    "Investigate the failed systemd service, identify the first meaningful error, " +
    "correct the underlying cause, restore service safely, and verify that it remains healthy.",

  symptoms: [
    "systemctl status shows the service as failed.",
    "A service remains inactive after a server reboot.",
    "The service enters a restart loop.",
    "An application port is not listening.",
    "Users receive HTTP 500, 502, or 503 errors.",
    "A deployment succeeds but the application process does not start.",
    "The service exits immediately after startup.",
    "The service works manually but fails when started by systemd.",
    "Logs contain configuration, permission, dependency, or address-in-use errors.",
    "Monitoring reports that the application health check is failing.",
  ],

  businessImpact: [
    "Application downtime or partial service unavailability.",
    "Failed deployments and delayed releases.",
    "Interrupted background processing.",
    "API requests and user transactions fail.",
    "Dependent services may also become unhealthy.",
    "Repeated restart attempts may increase load or hide the original error.",
  ],

  rootCauses: [
    "Invalid application configuration.",
    "Missing executable, script, library, or environment file.",
    "Incorrect ownership or file permissions.",
    "Port already in use by another process.",
    "Database, DNS, network, or other required dependency unavailable.",
    "Incorrect systemd unit configuration.",
    "Application binary or deployment artifact is incompatible.",
    "Disk space or inode exhaustion prevents startup.",
    "Out-of-memory conditions kill the process.",
    "SELinux or another security policy denies access.",
    "The configured service user does not exist or lacks required access.",
    "Startup timeout or incorrect readiness assumptions.",
    "A dependency fails during boot or starts later than expected.",
  ],

  diagnosticCommands: [
    {
      title: "1. Check service status",
      command: "sudo systemctl status nginx.service --no-pager -l",
      purpose:
        "Inspect the service state, recent log lines, process information, and failure reason.",
      expectedOutput:
        "nginx.service - A high performance web server\n" +
        "Active: failed (Result: exit-code)",
      interpretation:
        "Illustrative output. The actual error may appear in the final log lines. " +
        "Record the service state and timestamp before changing anything.",
    },
    {
      title: "2. Read service logs",
      command: "sudo journalctl -u nginx.service -b --no-pager -n 200",
      purpose:
        "Review logs for the current boot and find the earliest meaningful startup error.",
      expectedOutput:
        "nginx: [emerg] configuration file test failed",
      interpretation:
        "Illustrative output. Fix the first actionable error rather than repeatedly " +
        "restarting the service without a diagnosis.",
    },
    {
      title: "3. Review recent service logs",
      command: "sudo journalctl -u nginx.service --since '-30 min' --no-pager",
      purpose:
        "Correlate the failure with a recent deployment, configuration change, or outage.",
      expectedOutput:
        "Failed to start nginx.service",
      interpretation:
        "Use timestamps to connect the service failure to a deployment or infrastructure change.",
    },
    {
      title: "4. Inspect the unit definition",
      command: "systemctl cat nginx.service",
      purpose:
        "Inspect the service unit and any configured override files.",
      expectedOutput:
        "[Service]\n" +
        "ExecStart=/usr/sbin/nginx -g 'daemon off;'",
      interpretation:
        "Illustrative output. Check ExecStart, User, Group, EnvironmentFile, working directory, " +
        "dependencies, and override configuration. Unit contents vary by distribution and service.",
    },
    {
      title: "5. Check systemd's view of the service",
      command:
        "systemctl show nginx.service -p LoadState -p ActiveState -p SubState -p Result -p ExecMainStatus",
      purpose:
        "Read structured state and the recorded main-process exit status.",
      expectedOutput:
        "LoadState=loaded\n" +
        "ActiveState=failed\n" +
        "SubState=failed\n" +
        "Result=exit-code",
      interpretation:
        "Illustrative output. An exit code is a clue, not necessarily the root cause. " +
        "Correlate it with journal logs and application-specific diagnostics.",
    },
    {
      title: "6. Validate NGINX configuration",
      command: "sudo nginx -t",
      purpose:
        "Check NGINX configuration syntax before attempting to start or reload it.",
      expectedOutput:
        "syntax is ok\ntest is successful",
      interpretation:
        "If validation fails, inspect the reported file and line. Only use this command " +
        "for NGINX; other applications require their own configuration validation command.",
    },
    {
      title: "7. Check port conflicts",
      command: "sudo ss -ltnp",
      purpose:
        "Identify TCP listening sockets and the processes holding them.",
      expectedOutput:
        "LISTEN 0 511 0.0.0.0:80 0.0.0.0:* users:((\"apache2\",pid=1234,fd=4))",
      interpretation:
        "Illustrative output. If another process owns the required port, determine why " +
        "before changing either service.",
    },
    {
      title: "8. Check disk and inode capacity",
      command: "df -hT && df -i",
      purpose:
        "Determine whether the service cannot create files because storage capacity is exhausted.",
      expectedOutput:
        "Filesystem capacity and inode usage for mounted filesystems",
      interpretation:
        "Check the filesystem containing logs, runtime files, temporary directories, " +
        "application data, and configured PID or socket paths.",
    },
    {
      title: "9. Check memory pressure",
      command: "free -h && uptime",
      purpose:
        "Check available memory, swap, and system load when startup fails under resource pressure.",
      expectedOutput:
        "Memory totals, available memory, swap usage, and load averages",
      interpretation:
        "High load or low available memory may contribute to startup failures, but confirm " +
        "the cause using service logs and kernel messages.",
    },
    {
      title: "10. Check kernel messages",
      command: "sudo journalctl -k -b --no-pager -n 200",
      purpose:
        "Investigate kernel-level problems such as OOM kills and filesystem errors.",
      expectedOutput:
        "Kernel messages from the current boot",
      interpretation:
        "Look for relevant timestamps and messages indicating that the process was killed " +
        "or that the filesystem or device encountered errors.",
    },
    {
      title: "11. Check failed services",
      command: "systemctl --failed",
      purpose:
        "Determine whether the incident affects one service or several related services.",
      expectedOutput:
        "UNIT             LOAD   ACTIVE SUB    DESCRIPTION\n" +
        "example.service  loaded failed failed Example Service",
      interpretation:
        "Multiple failures may indicate a shared dependency, storage problem, network issue, " +
        "or incomplete boot sequence.",
    },
    {
      title: "12. Inspect the service user and executable",
      command:
        "systemctl show nginx.service -p User -p Group -p ExecStart -p WorkingDirectory",
      purpose:
        "Inspect the configured execution identity, command, and working directory.",
      expectedOutput:
        "User=www-data\n" +
        "Group=www-data",
      interpretation:
        "Illustrative output. Verify that the configured user exists and has the permissions " +
        "required by the application. Empty properties may indicate defaults or unset values.",
    },
  ],

  troubleshootingSteps: [
    {
      step: 1,
      title: "Confirm the failed service",
      objective:
        "Identify the exact service and establish the current state.",
      actions: [
        "Record the hostname, environment, service name, and failure timestamp.",
        "Check the service status without restarting it.",
        "Determine whether this is production, staging, or development.",
        "Check whether the failure began after a deployment, reboot, or configuration change.",
      ],
      commands: [
        "systemctl status nginx.service --no-pager -l",
        "systemctl show nginx.service -p ActiveState -p SubState -p Result",
      ],
      expectedResult:
        "The affected service and its current failure state are confirmed.",
      precautions: [
        "Replace nginx.service with the actual service name.",
        "Use sudo when required by the host's permissions.",
        "Do not repeatedly restart a critical service before understanding the failure.",
      ],
    },
    {
      step: 2,
      title: "Find the first actionable error",
      objective:
        "Identify the earliest error that explains why startup failed.",
      actions: [
        "Read the service journal around the failure timestamp.",
        "Look for configuration errors, missing files, permission denials, and dependency failures.",
        "Compare the logs with the previous successful startup if available.",
        "Correlate the failure with the latest deployment or system change.",
      ],
      commands: [
        "journalctl -u nginx.service -b --no-pager -n 200",
        "journalctl -u nginx.service --since '-30 min' --no-pager",
      ],
      expectedResult:
        "A specific failure message or a narrow set of causes is identified.",
      precautions: [
        "Redact passwords, tokens, private keys, and sensitive environment values before sharing logs.",
      ],
    },
    {
      step: 3,
      title: "Validate configuration and service definition",
      objective:
        "Check whether the application or systemd unit references invalid settings or missing paths.",
      actions: [
        "Inspect the service unit and override files.",
        "Confirm the executable and configuration paths exist.",
        "Run the application's supported configuration validation command.",
        "Review recent changes and restore a known-good configuration if approved.",
      ],
      commands: [
        "systemctl cat nginx.service",
        "sudo nginx -t",
      ],
      expectedResult:
        "The service configuration is valid, and all required paths are present.",
      precautions: [
        "nginx -t is specific to NGINX; use the appropriate validation command for other software.",
        "Do not overwrite production configuration with a generic example.",
      ],
    },
    {
      step: 4,
      title: "Check permissions and service identity",
      objective:
        "Determine whether the service user can access required files and directories.",
      actions: [
        "Inspect the configured User and Group settings.",
        "Verify the executable, configuration, certificate, log, and runtime paths.",
        "Check directory traversal permissions on parent directories.",
        "Inspect security-policy denials when normal Unix permissions appear correct.",
      ],
      commands: [
        "systemctl show nginx.service -p User -p Group -p ExecStart",
        "namei -l /etc/nginx/nginx.conf",
        "ls -l /etc/nginx/nginx.conf",
      ],
      expectedResult:
        "The service identity has the minimum required access to its dependencies.",
      precautions: [
        "Do not apply chmod -R 777 as a workaround.",
        "Do not recursively change ownership of system directories without confirming the required ownership.",
      ],
    },
    {
      step: 5,
      title: "Investigate port conflicts",
      objective:
        "Confirm whether another process is already using a required port.",
      actions: [
        "Identify the port the service is configured to bind.",
        "Inspect listening sockets and the owning process.",
        "Confirm whether the other process is expected to be running.",
        "Choose an approved fix: correct the service configuration or resolve the conflicting process.",
      ],
      commands: [
        "sudo ss -ltnp",
        "sudo lsof -iTCP:80 -sTCP:LISTEN",
      ],
      expectedResult:
        "The required port is available or the intended port configuration has been corrected.",
      precautions: [
        "Do not kill the process holding the port without identifying its role.",
        "The lsof command may not be installed on every Linux distribution.",
      ],
    },
    {
      step: 6,
      title: "Check dependencies and resources",
      objective:
        "Determine whether a dependency or resource limit is preventing startup.",
      actions: [
        "Check database, network, DNS, mount, and other required dependency health.",
        "Check disk capacity and inode utilization.",
        "Review memory pressure and OOM-related kernel logs.",
        "Inspect startup timeouts and dependency ordering.",
      ],
      commands: [
        "systemctl --failed",
        "df -hT",
        "df -i",
        "free -h",
        "journalctl -k -b --no-pager -n 200",
      ],
      expectedResult:
        "Required dependencies are healthy and resource exhaustion is ruled out or corrected.",
      precautions: [
        "Do not restart databases or shared infrastructure merely because an application service failed.",
        "Coordinate dependency changes with the responsible service owner.",
      ],
    },
    {
      step: 7,
      title: "Apply the smallest safe fix",
      objective:
        "Correct the confirmed root cause while minimizing production impact.",
      actions: [
        "Back up configuration files before changing them.",
        "Apply the approved configuration, permission, dependency, or resource fix.",
        "Use application-specific validation before starting the service.",
        "Record the change and its expected result.",
      ],
      expectedResult:
        "The identified cause is corrected without introducing unrelated changes.",
      precautions: [
        "Use your organization's change-management process for production systems.",
        "Avoid multiple simultaneous changes because they make the result harder to diagnose.",
      ],
    },
    {
      step: 8,
      title: "Start the service and verify recovery",
      objective:
        "Confirm the service starts correctly and handles requests.",
      actions: [
        "Start the service after confirming that its prerequisites are healthy.",
        "Check systemd status and recent logs.",
        "Verify the expected port or Unix socket is available.",
        "Run the application health check or a safe functional test.",
        "Monitor the service for repeated failures.",
      ],
      commands: [
        "sudo systemctl start nginx.service",
        "systemctl status nginx.service --no-pager -l",
        "journalctl -u nginx.service --since '-10 min' --no-pager",
        "sudo ss -ltnp",
      ],
      expectedResult:
        "The service is active, the expected endpoint is available, and logs show no recurring startup failure.",
      precautions: [
        "Use start for a stopped service. Use restart only when necessary and approved.",
        "A service showing active does not by itself prove the application is serving requests correctly.",
      ],
    },
    {
      step: 9,
      title: "Prevent recurrence",
      objective:
        "Make the failure detectable and reduce the chance of repeated downtime.",
      actions: [
        "Document the root cause and resolution.",
        "Add configuration validation to the deployment pipeline.",
        "Alert on service failures and restart loops.",
        "Add health checks for critical dependencies.",
        "Review whether rollback or recovery automation is needed.",
      ],
      expectedResult:
        "The root cause is addressed, recovery is documented, and monitoring can detect a recurrence.",
    },
  ],

  rootCauseScenarios: [
    {
      cause: "Invalid application configuration",
      symptoms: [
        "The service exits immediately after starting.",
        "Logs mention a syntax error, unknown directive, or invalid setting.",
      ],
      investigation: [
        "Inspect the exact file and line reported by the application.",
        "Compare the current configuration with the last known-good version.",
        "Run the application's configuration test.",
      ],
      resolution: [
        "Correct the invalid setting.",
        "Validate the configuration.",
        "Start or reload the service according to the application's supported procedure.",
      ],
    },
    {
      cause: "Permission denied",
      symptoms: [
        "Logs report permission denied when reading a file or creating a runtime file.",
        "The service works under one account but fails under its configured service account.",
      ],
      investigation: [
        "Check systemd's configured user and group.",
        "Inspect the file and parent-directory permissions.",
        "Review security-policy logs if normal file permissions look correct.",
      ],
      resolution: [
        "Grant the minimum required permissions.",
        "Correct ownership only for paths that the application is expected to own.",
        "Re-test startup using the service's supported execution model.",
      ],
    },
    {
      cause: "Port already in use",
      symptoms: [
        "Logs contain Address already in use or bind failure.",
        "The expected TCP port is already listening.",
      ],
      investigation: [
        "Inspect the configured listening port.",
        "Identify the process using the port.",
        "Confirm whether a duplicate instance or conflicting service is running.",
      ],
      resolution: [
        "Correct the intended port configuration or resolve the confirmed conflict.",
        "Validate the configuration and start the intended service.",
      ],
    },
    {
      cause: "Missing environment file or deployment artifact",
      symptoms: [
        "systemd reports that an executable or environment file cannot be found.",
        "The service fails after a deployment or release-directory change.",
      ],
      investigation: [
        "Inspect ExecStart and EnvironmentFile in the unit definition.",
        "Verify that the expected artifact and configuration file exist.",
        "Check release symlinks and deployment permissions.",
      ],
      resolution: [
        "Restore the approved artifact or correct the configured path.",
        "Validate deployment ownership and release layout.",
        "Re-run the startup check after the fix.",
      ],
    },
    {
      cause: "Dependency unavailable",
      symptoms: [
        "The service cannot connect to a database, API, DNS resolver, or required mount.",
        "Startup logs contain connection refused, name resolution, or timeout errors.",
      ],
      investigation: [
        "Identify the exact dependency and error timestamp.",
        "Check dependency health from the affected host.",
        "Review systemd dependency ordering and application retry behavior.",
      ],
      resolution: [
        "Restore the required dependency or correct the connection configuration.",
        "Use suitable retry and timeout behavior.",
        "Avoid treating service ordering alone as proof that a dependency is ready.",
      ],
    },
    {
      cause: "Resource exhaustion",
      symptoms: [
        "Startup fails while disk space, inodes, memory, or process limits are exhausted.",
        "Kernel or service logs report OOM kills or file-creation errors.",
      ],
      investigation: [
        "Check disk and inode usage.",
        "Review memory pressure and kernel logs.",
        "Inspect service-specific resource limits and process usage.",
      ],
      resolution: [
        "Address the confirmed resource bottleneck safely.",
        "Fix abnormal file growth or memory consumption.",
        "Verify sufficient capacity before starting the service again.",
      ],
    },
  ],

  incidentScenario: {
    environment:
      "Illustrative scenario: an Ubuntu server runs an NGINX reverse proxy in front of an application.",

    incident:
      "After a configuration deployment, NGINX fails to start and the application becomes unavailable through the proxy.",

    impact: [
      "Requests through the reverse proxy fail.",
      "The monitoring system reports the endpoint as unhealthy.",
      "The deployment cannot be considered successful.",
    ],

    investigation: [
      "The engineer checks systemctl status nginx.service.",
      "The journal identifies an NGINX configuration error.",
      "The engineer runs nginx -t and obtains the specific file and line.",
      "The change is compared with the previous known-good configuration.",
    ],

    rootCause:
      "An invalid configuration directive was introduced during the deployment.",

    resolution: [
      "The team backs up the current configuration for investigation.",
      "The invalid directive is corrected using the approved change.",
      "The engineer runs nginx -t and confirms validation succeeds.",
      "The service is started and its status and listening socket are checked.",
      "An HTTP health check confirms that the proxy is responding.",
    ],

    prevention: [
      "Run nginx -t in the deployment pipeline before applying configuration changes.",
      "Keep a known-good configuration or release available for rollback.",
      "Alert on service failure and endpoint health-check failure.",
      "Record the deployment version in incident reports.",
    ],
  },

  verification: [
    "systemctl status reports the expected active state.",
    "The latest journal entries do not show recurring startup errors.",
    "The expected TCP port or Unix socket is available.",
    "The application health endpoint or functional check succeeds.",
    "Required dependencies are reachable.",
    "The service remains healthy during an observation period.",
    "Monitoring returns to normal and users can complete the affected workflow.",
  ],

  prevention: [
    "Validate application configuration before deployment.",
    "Use automated deployment health checks.",
    "Maintain a tested rollback procedure.",
    "Monitor service states and repeated restart attempts.",
    "Document service dependencies and runtime requirements.",
    "Test service startup after planned reboots.",
    "Use least-privilege service accounts and explicit file permissions.",
    "Track disk, inode, memory, and process-limit capacity.",
    "Review application and systemd unit changes before release.",
  ],

  monitoring: [
    "Alert when a critical systemd service enters a failed state.",
    "Alert on repeated restarts or restart-loop behavior.",
    "Monitor HTTP or application-level health checks, not just process state.",
    "Capture relevant journal logs around failures.",
    "Track service startup duration and timeout failures.",
    "Correlate service failures with deployments and infrastructure changes.",
    "Monitor dependencies such as databases, mounts, DNS, and network endpoints.",
  ],

  safetyRules: [
    "Identify the root cause before repeatedly restarting the service.",
    "Do not kill a process or free a port until its role is understood.",
    "Do not use chmod -R 777 to bypass permission problems.",
    "Back up configuration files before editing production settings.",
    "Run the application's own configuration validator whenever available.",
    "Be aware that restarting a service may interrupt live traffic or active jobs.",
    "Redact credentials and secrets before sharing logs.",
    "Follow the organization's production change and rollback procedures.",
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Date and time:",
    "Hostname and environment:",
    "Service name:",
    "Service state and exit status:",
    "User-visible impact:",
    "First actionable error:",
    "Recent deployment or configuration change:",
    "Root cause:",
    "Corrective action:",
    "Configuration validation result:",
    "Service recovery timestamp:",
    "Application health-check result:",
    "Preventive action and owner:",
  ],

  troubleshootingChecklist: [
    "Confirmed the exact service name and current state.",
    "Captured service status and relevant journal logs.",
    "Identified the first actionable error.",
    "Checked unit configuration and required files.",
    "Validated configuration using the application's supported command.",
    "Checked permissions and service identity.",
    "Checked port conflicts and dependencies.",
    "Checked disk, inode, memory, and kernel errors.",
    "Applied the smallest approved corrective change.",
    "Started the service and verified application-level health.",
    "Added preventive actions and documented the incident.",
  ],
};

export default linuxServiceFailedToStart;
