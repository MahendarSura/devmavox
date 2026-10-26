
export interface PortCommand {
  title: string;
  command: string;
  purpose: string;
  interpretation: string;
}

export interface PortStep {
  step: number;
  title: string;
  objective: string;
  actions: string[];
  commands?: string[];
  expectedResult: string;
  precautions?: string[];
}

export interface PortRootCause {
  cause: string;
  symptoms: string[];
  investigation: string[];
  resolution: string[];
}

export interface PortIncident {
  environment: string;
  incident: string;
  impact: string[];
  investigation: string[];
  rootCause: string;
  resolution: string[];
  prevention: string[];
}

export interface LinuxPortRunbook {
  id: string;
  title: string;
  category: string;
  severity: string;
  summary: string;
  objective: string;
  symptoms: string[];
  businessImpact: string[];
  rootCauses: string[];
  diagnosticCommands: PortCommand[];
  troubleshootingSteps: PortStep[];
  rootCauseScenarios: PortRootCause[];
  incidentScenario: PortIncident;
  verification: string[];
  prevention: string[];
  monitoring: string[];
  safetyRules: string[];
  incidentReportTemplate: string[];
  troubleshootingChecklist: string[];
}

export const linuxPortAlreadyInUse: LinuxPortRunbook = {
  id: "linux-port-already-in-use",
  title: "Linux Port Already in Use",
  category: "Linux Troubleshooting",
  severity: "Medium / High / Critical",

  summary:
    "A port conflict occurs when an application attempts to bind to an IP address and port " +
    "that another socket already occupies, or when the requested address conflicts with an " +
    "existing listener. The application may fail to start with an 'Address already in use' " +
    "error. Diagnose the listener and its network binding before stopping processes or changing ports.",

  objective:
    "Identify the process occupying the requested port, understand why it is listening, " +
    "restore the intended service safely, and prevent recurring port conflicts.",

  symptoms: [
    "An application fails to start with 'Address already in use'.",
    "A web server cannot bind to port 80 or 443.",
    "A development server reports that port 3000 is already in use.",
    "A Node.js, Python, Java, or Go application exits during startup.",
    "A service starts on an unexpected port.",
    "A health check fails because the expected port has no listener.",
    "Two application instances attempt to bind the same address and port.",
    "A container fails to start because a host port is already allocated.",
    "A deployment succeeds on one host but fails on another because of a port conflict.",
  ],

  businessImpact: [
    "The intended service may fail to start.",
    "Users may be unable to access the application.",
    "A deployment or restart may fail.",
    "Traffic may reach the wrong application if port mappings are misconfigured.",
    "Repeated restart attempts may create operational instability.",
  ],

  rootCauses: [
    "Another process is already listening on the requested port.",
    "An earlier application instance did not terminate as expected.",
    "A duplicate systemd service or manually started process exists.",
    "A container or another workload occupies the host port.",
    "The application configuration uses the wrong port.",
    "Two services are configured to use the same address and port.",
    "IPv4 and IPv6 wildcard bindings conflict in the current socket configuration.",
    "A deployment starts a second application instance before stopping the first.",
    "Socket reuse options or application binding behavior differ from expectations.",
  ],

  diagnosticCommands: [
    {
      title: "1. Inspect listening TCP and UDP sockets",
      command: "sudo ss -lntup",
      purpose:
        "List listening TCP and UDP sockets, local addresses, ports, and available process information.",
      interpretation:
        "Identify the target port and check the local address. Process details may require elevated privileges. TCP listeners and UDP sockets have different semantics.",
    },
    {
      title: "2. Find the process using a specific port",
      command: "sudo ss -lntp 'sport = :3000'",
      purpose:
        "Inspect TCP listeners on port 3000.",
      interpretation:
        "Replace 3000 with the actual port. Review the PID, process name, and local address before deciding on a fix.",
    },
    {
      title: "3. Use lsof to identify a listener",
      command: "sudo lsof -nP -iTCP:3000 -sTCP:LISTEN",
      purpose:
        "Show processes listening on TCP port 3000.",
      interpretation:
        "The output can identify the command, PID, user, and socket. lsof may not be installed by default.",
    },
    {
      title: "4. Inspect a process",
      command: "ps -p <PID> -o pid,ppid,user,stat,lstart,etime,comm,args",
      purpose:
        "Inspect the process that owns the listener.",
      interpretation:
        "Replace <PID> with the actual process ID. Check its parent, owner, start time, and command before taking action.",
    },
    {
      title: "5. Check systemd service status",
      command: "systemctl status myapp.service --no-pager -l",
      purpose:
        "Determine whether a managed service failed to start or is repeatedly restarting.",
      interpretation:
        "Replace myapp.service with the actual unit. Review startup errors and recent restart attempts.",
    },
    {
      title: "6. Review application logs",
      command: "sudo journalctl -u myapp.service --since '-30 min' --no-pager",
      purpose:
        "Find bind errors, startup failures, and application port configuration messages.",
      interpretation:
        "Correlate the error with deployment and service start times. An 'Address already in use' message strongly suggests a bind conflict.",
    },
    {
      title: "7. Inspect TCP listeners on all interfaces",
      command: "sudo ss -lntp",
      purpose:
        "Determine whether a service listens on a wildcard address or a specific IP.",
      interpretation:
        "A listener on 0.0.0.0 can accept connections on IPv4 interfaces; [::] represents an IPv6 wildcard and may also affect IPv4 depending on system configuration.",
    },
    {
      title: "8. Check container port mappings",
      command: "docker ps --format 'table {{.Names}}\\t{{.Ports}}'",
      purpose:
        "Review published host ports for running Docker containers.",
      interpretation:
        "Check whether another container has already published the required host port. Container-internal ports can be reused across separate network namespaces.",
    },
    {
      title: "9. Inspect configured application ports",
      command: "systemctl cat myapp.service",
      purpose:
        "Review the service unit and its startup configuration.",
      interpretation:
        "Inspect ExecStart, environment files, and overrides. Application ports may be defined in configuration files or environment variables rather than the unit itself.",
    },
    {
      title: "10. Check the expected endpoint",
      command: "curl -v --connect-timeout 3 http://127.0.0.1:3000/",
      purpose:
        "Test whether an HTTP service responds on the expected local port.",
      interpretation:
        "Replace the URL and path with the actual endpoint. A successful connection does not prove that the correct application is serving requests.",
    },
  ],

  troubleshootingSteps: [
    {
      step: 1,
      title: "Confirm the port conflict",
      objective:
        "Capture the exact error and identify the port and address the application needs.",
      actions: [
        "Record the application startup error.",
        "Identify the requested TCP or UDP port.",
        "Check the intended bind address, such as 127.0.0.1, a specific interface IP, or a wildcard address.",
        "Determine whether the issue affects startup, traffic routing, or health checks.",
        "Review recent deployments or configuration changes.",
      ],
      expectedResult:
        "The requested protocol, port, and bind address are known.",
      precautions: [
        "Do not assume every port conflict is caused by an old process.",
      ],
    },
    {
      step: 2,
      title: "Identify the process occupying the port",
      objective:
        "Find the owner of the conflicting socket.",
      actions: [
        "Inspect TCP and UDP sockets as appropriate.",
        "Use the listener's PID and process name to identify the workload.",
        "Check the process owner and parent process.",
        "If the port is published by a container, inspect its host port mapping.",
      ],
      commands: [
        "sudo ss -lntup",
        "sudo ss -lntp 'sport = :3000'",
        "sudo lsof -nP -iTCP:3000 -sTCP:LISTEN",
      ],
      expectedResult:
        "The process or container occupying the requested port is identified.",
      precautions: [
        "Replace port 3000 with the actual port.",
        "UDP does not use TCP LISTEN state; inspect UDP sockets separately.",
      ],
    },
    {
      step: 3,
      title: "Determine whether the listener is expected",
      objective:
        "Avoid stopping a legitimate production service.",
      actions: [
        "Inspect the process command and parent PID.",
        "Check whether systemd, Docker, Kubernetes, or another supervisor manages it.",
        "Confirm whether the listener belongs to the intended application.",
        "Review recent deployments and service ownership.",
      ],
      commands: [
        "ps -p <PID> -o pid,ppid,user,stat,lstart,etime,comm,args",
        "systemctl status myapp.service --no-pager -l",
      ],
      expectedResult:
        "The listener is classified as expected, duplicate, misconfigured, or unknown.",
      precautions: [
        "Never terminate an unknown process solely because it occupies a port.",
      ],
    },
    {
      step: 4,
      title: "Check for duplicate application instances",
      objective:
        "Determine whether a second copy of the same application is running.",
      actions: [
        "Check process listings for duplicate instances.",
        "Inspect systemd service and restart behavior.",
        "Review shell sessions, startup scripts, and deployment automation.",
        "Determine whether a previous application instance is still required.",
      ],
      commands: [
        "pgrep -af 'myapp'",
        "systemctl status myapp.service --no-pager -l",
      ],
      expectedResult:
        "Duplicate or orphaned application instances are identified if present.",
      precautions: [
        "Replace myapp with a specific, recognizable process name or pattern.",
        "Avoid broad process-kill commands.",
      ],
    },
    {
      step: 5,
      title: "Check bind address and protocol",
      objective:
        "Determine whether the conflict comes from an overlapping address binding or protocol mismatch.",
      actions: [
        "Compare the application's configured address with the active listener.",
        "Check IPv4 and IPv6 wildcard bindings.",
        "Confirm whether the application requires TCP, UDP, or both.",
        "Check whether a different port is already configured by environment variables.",
      ],
      commands: [
        "sudo ss -lntup",
        "systemctl cat myapp.service",
      ],
      expectedResult:
        "The configured socket binding is understood and matches the intended design.",
    },
    {
      step: 6,
      title: "Choose the safest corrective action",
      objective:
        "Free the intended port or correct the application's configuration.",
      actions: [
        "If a duplicate instance is confirmed, stop it through its normal service manager.",
        "If another legitimate service owns the port, coordinate a configuration change.",
        "If the application is configured incorrectly, update its port or bind address through the approved process.",
        "For containers, correct the host port mapping when appropriate.",
        "Avoid making simultaneous unreviewed changes to several services.",
      ],
      commands: [
        "sudo systemctl stop myapp.service",
      ],
      expectedResult:
        "The conflicting workload is safely stopped or the configuration is corrected.",
      precautions: [
        "The stop command is an example only; run it only after confirming that the named service is the intended target and stopping it is approved.",
        "Do not stop a critical listener merely to make room for another application.",
      ],
    },
    {
      step: 7,
      title: "Restart or start the intended application",
      objective:
        "Start the service with the corrected configuration.",
      actions: [
        "Validate the application configuration if a validation command is available.",
        "Start or restart the intended service through its normal manager.",
        "Check the startup logs for bind errors.",
        "Confirm that the application is listening on the expected address and port.",
      ],
      commands: [
        "sudo systemctl start myapp.service",
        "sudo ss -lntp 'sport = :3000'",
        "sudo journalctl -u myapp.service -n 100 --no-pager",
      ],
      expectedResult:
        "The intended application starts and binds to its configured socket.",
      precautions: [
        "Use restart instead of start only when appropriate for the current service state.",
        "Confirm the service name and port before executing commands.",
      ],
    },
    {
      step: 8,
      title: "Verify application access",
      objective:
        "Ensure that the correct service accepts requests.",
      actions: [
        "Check the listener and bind address.",
        "Test the local endpoint.",
        "Run an approved health check.",
        "Verify access from the expected client or network path.",
        "Check error logs and monitor for repeated restart attempts.",
      ],
      commands: [
        "sudo ss -lntp 'sport = :3000'",
        "curl -v --connect-timeout 3 http://127.0.0.1:3000/",
      ],
      expectedResult:
        "The expected application responds on the intended port without a recurring bind conflict.",
    },
    {
      step: 9,
      title: "Prevent recurring conflicts",
      objective:
        "Ensure that deployments and service managers do not create duplicate listeners.",
      actions: [
        "Define port ownership for each application.",
        "Use a service manager or orchestrator consistently.",
        "Make deployment procedures handle old and new instances safely.",
        "Document host-port mappings for containers.",
        "Add startup checks and useful bind-error logging.",
      ],
      expectedResult:
        "Port assignments are documented and deployments avoid conflicting listeners.",
    },
  ],

  rootCauseScenarios: [
    {
      cause: "A previous application instance is still running",
      symptoms: [
        "The new instance fails to start.",
        "The port is owned by an earlier instance of the same application.",
        "The problem follows a manual restart or deployment.",
      ],
      investigation: [
        "Inspect the listener PID and process start time.",
        "Check the parent process and service manager.",
        "Review deployment and shutdown logs.",
      ],
      resolution: [
        "Stop the duplicate through its normal manager after confirming ownership.",
        "Start the intended instance.",
        "Fix deployment logic so the previous instance exits cleanly.",
      ],
    },
    {
      cause: "Two services use the same port",
      symptoms: [
        "One service starts while another fails.",
        "The services have different process names.",
        "Both configurations specify the same host address and port.",
      ],
      investigation: [
        "Inspect both service configurations.",
        "Identify each listener's owner.",
        "Confirm the intended network architecture and port assignments.",
      ],
      resolution: [
        "Assign distinct ports when both services require independent listeners.",
        "Alternatively, use an intentional reverse-proxy or load-balancer architecture.",
        "Update health checks and client configuration together.",
      ],
    },
    {
      cause: "Docker host-port collision",
      symptoms: [
        "A container fails to start or publish its port.",
        "Another container or host process uses the requested host port.",
      ],
      investigation: [
        "Inspect running container port mappings.",
        "Check host listeners.",
        "Review the container deployment configuration.",
      ],
      resolution: [
        "Choose an available host port or remove the conflict through the approved deployment procedure.",
        "Keep container-internal and host-published ports distinct in the configuration.",
        "Verify the intended service is reachable after deployment.",
      ],
    },
    {
      cause: "IPv4/IPv6 binding overlap",
      symptoms: [
        "A bind fails even though the exact IPv4 address does not appear occupied.",
        "A wildcard IPv6 listener is present.",
      ],
      investigation: [
        "Inspect all listening addresses with ss.",
        "Check the application's IPv4 and IPv6 bind settings.",
        "Review platform-specific dual-stack socket behavior.",
      ],
      resolution: [
        "Configure the intended address family explicitly when appropriate.",
        "Avoid overlapping wildcard bindings.",
        "Test the configuration on the target operating system.",
      ],
    },
  ],

  incidentScenario: {
    environment:
      "Illustrative scenario: a Linux VM runs a Node.js application managed by systemd.",

    incident:
      "After a deployment, the new application instance fails with an 'Address already in use' error.",

    impact: [
      "The new application version does not start.",
      "The deployment health check fails.",
      "The previous application instance may still be running.",
    ],

    investigation: [
      "The engineer records the requested port from the startup log.",
      "The ss command identifies a listener on that port.",
      "Process inspection confirms that the listener belongs to a duplicate application instance.",
      "The engineer verifies how the duplicate was started and checks its service ownership.",
    ],

    rootCause:
      "The deployment process started a second instance before the previous instance released its listener. This is an illustrative scenario.",

    resolution: [
      "The team confirms which instance should own the port.",
      "The duplicate instance is stopped through the appropriate manager.",
      "The intended version is started and the listener is rechecked.",
      "A local health check and deployment verification succeed.",
    ],

    prevention: [
      "Make deployment scripts handle process shutdown and startup reliably.",
      "Use one authoritative service manager.",
      "Add port and health checks to deployment validation.",
      "Document expected port ownership.",
    ],
  },

  verification: [
    "The intended process owns the required port.",
    "The application binds to the correct address and protocol.",
    "No unintended duplicate listener remains.",
    "The service starts without bind errors.",
    "Local health checks succeed.",
    "Expected clients can reach the application.",
    "Service logs show no repeated restart or port-conflict errors.",
    "Deployment and monitoring systems report a healthy service.",
  ],

  prevention: [
    "Maintain a port-allocation inventory.",
    "Use systemd or an orchestrator to manage application lifecycle.",
    "Avoid launching duplicate instances outside the normal deployment process.",
    "Review container host-port mappings.",
    "Validate application configuration before deployment.",
    "Add health checks and useful startup error messages.",
    "Test deployment rollback and restart procedures.",
    "Document the expected bind address, protocol, and port for every service.",
  ],

  monitoring: [
    "Service startup and restart failures.",
    "Application bind errors.",
    "Unexpected changes to listeners on critical ports.",
    "Container port-publication failures.",
    "Application health-check status.",
    "Deployment failures associated with port conflicts.",
    "Availability of expected network endpoints.",
  ],

  safetyRules: [
    "Identify the process owning the port before stopping anything.",
    "Do not use kill -9 as the first response to a port conflict.",
    "Prefer the correct service manager for stopping managed workloads.",
    "Do not change a production port without coordinating dependent clients and health checks.",
    "Do not expose an application on all network interfaces unless intended and secured.",
    "Use elevated privileges only when required to inspect process details.",
    "Verify the actual listener and application health after remediation.",
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Date and time:",
    "Affected host or container:",
    "Application and service name:",
    "Requested protocol and port:",
    "Requested bind address:",
    "Conflicting process or container:",
    "User impact:",
    "Confirmed root cause:",
    "Corrective action:",
    "Health-check results:",
    "Deployment verification:",
    "Preventive actions:",
    "Owner and target date:",
  ],

  troubleshootingChecklist: [
    "Captured the exact port-binding error.",
    "Identified the requested port and protocol.",
    "Found the current listener and its owner.",
    "Checked process hierarchy and service ownership.",
    "Reviewed application and deployment logs.",
    "Checked container host-port mappings if applicable.",
    "Selected a corrective action based on evidence.",
    "Started the intended application successfully.",
    "Verified the listener and application endpoint.",
    "Documented prevention steps.",
  ],
};

export default linuxPortAlreadyInUse;

