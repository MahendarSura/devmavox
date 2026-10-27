
export const portConflictGuide = {
  title: "Tomcat Port Conflict - Production Troubleshooting",
  filePath: "app/troubleshooting-center/tomcat/PortConflict.ts",
  technology: ["Apache Tomcat", "Java", "Linux", "Windows", "Docker", "Kubernetes"],
  version: "1.0.0",

  objective: [
    "Identify why Tomcat cannot bind to an HTTP, HTTPS, shutdown, or AJP port.",
    "Find the exact process listening on a port and determine its owner.",
    "Distinguish a genuine port conflict from bind-address, permission, firewall, and container-mapping problems.",
    "Recover safely without killing unrelated production processes.",
    "Validate application health and prevent recurring deployment conflicts."
  ],

  incidentScenario: {
    title: "Tomcat fails to start after a production deployment",
    timeline: [
      "10:05 - Deployment pipeline installs the new application release.",
      "10:07 - Tomcat service restart fails.",
      "10:08 - catalina logs show java.net.BindException: Address already in use.",
      "10:10 - The load balancer reports the instance as unhealthy.",
      "10:12 - Investigation finds that another Java process is listening on the expected HTTP port.",
      "10:20 - The team confirms the process owner, identifies a duplicate Tomcat startup, and restores the intended service."
    ],
    possibleCauses: [
      "An older Tomcat process did not stop during deployment.",
      "A second Tomcat instance uses the same connector port.",
      "A Java application or another service owns the port.",
      "Two containers publish the same host port.",
      "The HTTP connector and another service are configured to use the same port.",
      "A deployment script starts Tomcat twice.",
      "A systemd service, manual startup, and container runtime manage competing instances.",
      "A Kubernetes hostPort or hostNetwork configuration creates a node-level conflict.",
      "The configured IP address is not assigned to the host.",
      "A privileged or restricted port cannot be bound by the service user.",
      "The conflict is on the HTTPS, shutdown, or AJP port rather than the main HTTP port."
    ]
  },

  impactAndSeverity: {
    severityGuide: [
      {
        severity: "SEV-1",
        criteria: "Production service unavailable across all instances or critical customer journeys are down.",
        action: "Activate the incident process, protect customer traffic, and prioritize safe restoration."
      },
      {
        severity: "SEV-2",
        criteria: "One or more production instances fail to start, leaving reduced capacity or elevated latency.",
        action: "Identify the conflicting owner and restore capacity using the approved procedure."
      },
      {
        severity: "SEV-3",
        criteria: "A staging or development deployment fails, with no material customer impact.",
        action: "Diagnose configuration and deployment ownership before retrying."
      }
    ],
    assess: [
      "Which environment, application, host, pod, and release are affected?",
      "Which exact port and protocol failed?",
      "Is the service completely down or are other replicas healthy?",
      "Did the deployment stop before startup, or did some application changes already take effect?",
      "Is the load balancer still routing traffic to the affected instance?",
      "Are other applications sharing the same host?",
      "Did a recent configuration or infrastructure change introduce the conflict?"
    ]
  },

  safetyChecks: [
    "Confirm the correct environment, server, namespace, container, and service.",
    "Identify the intended Tomcat instance and its service owner.",
    "Check production change approvals before changing ports or stopping processes.",
    "Record the current release, connector configuration, PID, and service status.",
    "Check whether the process occupying the port serves live traffic.",
    "Verify spare capacity before draining or restarting a production instance.",
    "Capture logs and process details before stopping anything.",
    "Do not run broad kill commands against Java processes.",
    "Do not disable security controls or firewall rules to fix a local bind conflict.",
    "Do not change the port without checking load balancer, firewall, monitoring, service discovery, and client configuration."
  ],

  evidenceCollection: {
    capture: [
      "Full exception and stack trace from Tomcat logs.",
      "Timestamp of the first failed startup.",
      "Tomcat version, Java version, CATALINA_HOME, and CATALINA_BASE.",
      "Effective HTTP, HTTPS, AJP, and shutdown port configuration.",
      "PID, command line, executable, user, and parent process of the port owner.",
      "Service manager status and recent service logs.",
      "Deployment pipeline logs and startup scripts.",
      "Docker port mappings or Kubernetes Service, hostPort, and hostNetwork configuration.",
      "Load balancer health-check result and recent configuration changes.",
      "Recent changes to server.xml, environment variables, systemd units, or deployment manifests."
    ],
    timelineCorrelation: [
      "Compare the failed startup timestamp with deployment and restart events.",
      "Check whether an old process remained after the previous release.",
      "Determine whether a second service manager or manual startup launched another instance.",
      "Compare affected and healthy hosts for connector configuration differences.",
      "Record every corrective action and its effect on service health."
    ]
  },

  errorClassification: [
    {
      signature: "java.net.BindException: Address already in use",
      meaning: "The requested local address and port cannot be bound because it conflicts with an existing socket or listener.",
      nextChecks: [
        "Inspect the exact port and protocol in the surrounding Tomcat log.",
        "Find listening sockets and identify the owning process.",
        "Check for duplicate Tomcat instances or another application using the port."
      ]
    },
    {
      signature: "java.net.BindException: Cannot assign requested address",
      meaning: "The requested local IP address may not be assigned to the host or available in that network namespace.",
      nextChecks: [
        "Inspect the configured address in server.xml.",
        "Check local interface addresses.",
        "Verify container network and interface configuration."
      ]
    },
    {
      signature: "Permission denied while binding",
      meaning: "The process may lack permission to bind to the requested port or address.",
      nextChecks: [
        "Inspect service user and operating system restrictions.",
        "Check whether the port is privileged on the operating system.",
        "Review capabilities and security policy without weakening controls blindly."
      ]
    },
    {
      signature: "Tomcat starts but clients cannot connect",
      meaning: "The connector may be listening on the wrong interface, or a firewall, proxy, routing, or health-check issue may exist.",
      nextChecks: [
        "Check the actual listening address.",
        "Test locally and from a separate host.",
        "Inspect firewall rules, routing, security groups, and load balancer configuration."
      ]
    },
    {
      signature: "Docker reports host port allocation failure",
      meaning: "Another container or host process may already own the published host port.",
      nextChecks: [
        "Inspect running containers and published ports.",
        "Identify the host listener.",
        "Check Compose projects and deployment overlap."
      ]
    },
    {
      signature: "Kubernetes pod fails to start or schedule with a port conflict",
      meaning: "A host-level port allocation, hostPort, hostNetwork, or node placement constraint may be involved.",
      nextChecks: [
        "Inspect pod events and workload configuration.",
        "Check hostPort and hostNetwork usage.",
        "Check node placement and other workloads using the same host port."
      ]
    }
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Read the exact Tomcat startup failure",
      actions: [
        "Find the first BindException in the startup log.",
        "Record the connector name and configured port.",
        "Determine whether failure occurred while creating the HTTP, HTTPS, AJP, or shutdown endpoint.",
        "Check whether Tomcat itself stopped or only one connector failed."
      ],
      commands: [
        "grep -n -B 10 -A 20 -E 'BindException|Address already in use|Cannot assign requested address|Failed to start connector' <catalina-log>",
        "journalctl -u <tomcat-service> --since '30 minutes ago'"
      ],
      decision: [
        "If a port number is visible, inspect that exact port first.",
        "If no port is visible, inspect server.xml and the full exception context.",
        "If Tomcat is running but a connector failed, assess whether the service is partially available."
      ]
    },
    {
      step: 2,
      title: "Verify the effective Tomcat configuration",
      actions: [
        "Identify the actual CATALINA_BASE and CATALINA_HOME.",
        "Inspect the server.xml used by the running service.",
        "Check startup scripts, environment variables, systemd configuration, and container arguments.",
        "Look for duplicate connector definitions or environment-specific substitutions."
      ],
      commands: [
        "ps -eo pid,ppid,user,args | grep '[o]rg.apache.catalina.startup.Bootstrap'",
        "systemctl cat <tomcat-service>",
        "grep -n -E '<Server|<Service|<Connector|port=|address=' <CATALINA_BASE>/conf/server.xml"
      ],
      decision: [
        "If the configured port differs from the expected port, trace which deployment configuration supplied it.",
        "If multiple Tomcat processes exist, map each process to its service and CATALINA_BASE.",
        "If the configuration is correct, continue to socket ownership."
      ]
    },
    {
      step: 3,
      title: "Find the process listening on the port",
      linuxCommands: [
        "sudo ss -ltnp",
        "sudo ss -ltnp 'sport = :8080'",
        "sudo lsof -nP -iTCP:8080 -sTCP:LISTEN",
        "sudo fuser -v 8080/tcp",
        "ps -p <PID> -o pid,ppid,user,lstart,etime,args"
      ],
      windowsCommands: [
        "netstat -ano | findstr :8080",
        "tasklist /FI \"PID eq <PID>\"",
        "Get-NetTCPConnection -LocalPort 8080 -State Listen",
        "Get-Process -Id <PID>"
      ],
      actions: [
        "Replace 8080 with the exact port from the exception.",
        "Record the PID and listening address.",
        "Inspect the full command line, service owner, start time, and parent process.",
        "Confirm whether the listener is the expected application, an old Tomcat, or an unrelated service."
      ],
      decision: [
        "If the expected Tomcat already owns the port, investigate duplicate startup or stale deployment orchestration.",
        "If another service owns it, confirm ownership and business impact before any change.",
        "If no listener appears, verify the port, protocol, network namespace, and whether the failing socket is a UDP socket or a transient connection rather than a TCP listener."
      ]
    },
    {
      step: 4,
      title: "Check for duplicate or stale Tomcat processes",
      actions: [
        "Compare the PID with systemd, service manager, container runtime, or orchestration records.",
        "Check whether the process is still serving requests.",
        "Check whether deployment scripts launched Tomcat manually in addition to the service manager.",
        "Review previous shutdown logs and whether the old process exited successfully."
      ],
      commands: [
        "pgrep -af 'org.apache.catalina.startup.Bootstrap'",
        "systemctl status <tomcat-service>",
        "ps -eo pid,ppid,user,lstart,etime,args | grep '[o]rg.apache.catalina.startup.Bootstrap'"
      ],
      decision: [
        "If the old process is healthy and owns production traffic, do not kill it just to start a second copy.",
        "If an obsolete instance is confirmed, drain it where applicable and stop it through its owning service manager.",
        "If a process is unmanaged, identify its owner and launch mechanism before terminating it."
      ]
    },
    {
      step: 5,
      title: "Check other connector ports",
      actions: [
        "Inspect all connector ports, not only the main HTTP port.",
        "Check HTTPS and AJP configuration and any enabled shutdown listener.",
        "Confirm whether the shutdown port is enabled or disabled in the actual configuration.",
        "Check whether a monitoring agent or another application uses the same configured port."
      ],
      decision: [
        "If only HTTPS fails, investigate the HTTPS connector and certificate/configuration rollout separately.",
        "If AJP fails, check whether AJP is needed and whether its configuration is intentional.",
        "If the shutdown listener conflicts, follow the approved Tomcat configuration procedure rather than editing random port values."
      ]
    },
    {
      step: 6,
      title: "Investigate Docker and Kubernetes networking",
      dockerCommands: [
        "docker ps --format 'table {{.Names}}\\t{{.Ports}}\\t{{.Status}}'",
        "docker inspect <container>",
        "docker logs --since 30m <container>"
      ],
      kubernetesCommands: [
        "kubectl get pods -n <namespace> -o wide",
        "kubectl describe pod <pod> -n <namespace>",
        "kubectl get svc -n <namespace>",
        "kubectl get events -n <namespace> --sort-by=.lastTimestamp",
        "kubectl get deploy,statefulset -n <namespace> -o yaml"
      ],
      actions: [
        "Separate the port inside the container from the published host port.",
        "Inspect Docker Compose or deployment manifests for duplicate host-port mappings.",
        "Check Kubernetes hostPort and hostNetwork settings.",
        "Check pod scheduling and node-level port ownership where host networking is used.",
        "Remember that a normal Kubernetes Service can expose the same service port across many pods without requiring the same host port on every node."
      ],
      decision: [
        "If only the host port conflicts, consider a controlled host-port change or removal of unnecessary host-port publishing.",
        "If the container's internal connector conflicts, inspect processes and configuration inside that network namespace.",
        "If a normal Service is used without hostPort or hostNetwork, investigate the application listener and service endpoints rather than assuming a node-level conflict."
      ]
    },
    {
      step: 7,
      title: "Distinguish binding from network reachability",
      commands: [
        "sudo ss -ltnp",
        "curl -v --connect-timeout 3 http://127.0.0.1:8080/",
        "curl -v --connect-timeout 3 http://<server-ip>:8080/",
        "ip addr",
        "ip route"
      ],
      actions: [
        "Test loopback and the server's actual IP separately.",
        "Check whether the listener is bound to 127.0.0.1, a specific interface, or all interfaces.",
        "Use the correct protocol: HTTP for HTTP connectors and HTTPS for TLS connectors.",
        "If local access works but remote access fails, inspect routing, firewalls, security groups, proxies, and load balancer health checks."
      ],
      decision: [
        "No listener: return to startup logs and connector configuration.",
        "Loopback works but remote access fails: investigate bind address and network controls.",
        "TCP connects but HTTP fails: inspect application readiness, connector protocol, TLS, and application logs."
      ]
    },
    {
      step: 8,
      title: "Confirm the root cause before changing anything",
      actions: [
        "Document the exact port, owning PID, process command, service owner, and timeline.",
        "Compare the findings with the deployment change.",
        "Determine whether the conflict is caused by an old instance, duplicate startup, a different service, or incorrect configuration.",
        "Select a recovery action that affects the smallest possible scope."
      ],
      decision: [
        "Confirmed stale instance: stop the correct service through its manager.",
        "Confirmed wrong connector port: change the intended configuration and all dependent references.",
        "Confirmed host-port conflict: update the deployment mapping under change control.",
        "No confirmed cause: do not kill processes or change multiple ports speculatively."
      ]
    }
  ],

  safeRecovery: {
    staleTomcat: [
      "Check service status and determine whether the old instance is receiving traffic.",
      "Drain the instance from the load balancer if supported and appropriate.",
      "Capture logs and process details.",
      "Use the owning service manager to stop the obsolete instance gracefully.",
      "Wait for shutdown and confirm the PID has exited.",
      "Recheck the target port and start the intended service.",
      "Validate the new process, connector, and application health."
    ],
    systemdExample: [
      "sudo systemctl status <tomcat-service>",
      "sudo systemctl stop <obsolete-tomcat-service>",
      "sudo systemctl status <obsolete-tomcat-service>",
      "sudo ss -ltnp 'sport = :8080'",
      "sudo systemctl start <intended-tomcat-service>",
      "sudo systemctl status <intended-tomcat-service>"
    ],
    important: [
      "Use the real service names discovered on the host; do not assume they are identical.",
      "Do not stop a shared or unrelated service without its owner's approval.",
      "Do not use kill -9 as the first action. If graceful shutdown fails, follow the incident runbook and escalation policy.",
      "If the process is managed by Kubernetes or Docker, use the owning orchestrator rather than manually killing a host process.",
      "If changing a port, update clients, health checks, firewall rules, monitoring, service discovery, and load balancer settings together.",
      "After recovery, confirm the intended process owns the port and the application serves valid responses."
    ]
  },

  commonRootCauses: [
    {
      cause: "Old Tomcat process still running",
      evidence: "A previous JVM PID owns the port and its start time predates the failed deployment.",
      fix: "Gracefully stop the obsolete instance using its owning service manager."
    },
    {
      cause: "Duplicate startup command",
      evidence: "Logs or process parentage show systemd and a deployment script both launching Tomcat.",
      fix: "Use one lifecycle owner and make deployment scripts idempotent."
    },
    {
      cause: "Wrong connector configuration",
      evidence: "server.xml or environment-specific settings assign the same port to competing listeners.",
      fix: "Correct the intended connector configuration and validate dependent settings."
    },
    {
      cause: "Unrelated service owns the port",
      evidence: "Socket tools identify a process unrelated to the intended Tomcat service.",
      fix: "Coordinate with the service owner or select an approved unused port."
    },
    {
      cause: "Container host-port collision",
      evidence: "Another container or host service publishes the same host port.",
      fix: "Adjust the host-port mapping or remove unnecessary publishing."
    },
    {
      cause: "Incorrect bind address",
      evidence: "The configured address is not assigned to the local network namespace.",
      fix: "Use an appropriate local address and verify the intended exposure."
    },
    {
      cause: "Port permission restriction",
      evidence: "The service user lacks permission under the host's port-binding rules.",
      fix: "Use an approved unprivileged port or an approved capability/proxy design."
    }
  ],

  prevention: {
    deployment: [
      "Ensure one service manager owns the Tomcat lifecycle.",
      "Make startup and shutdown scripts idempotent.",
      "Wait for the old process to exit before starting the replacement.",
      "Use canary or rolling deployment with adequate spare capacity.",
      "Add a pre-deployment check for required ports and process ownership.",
      "Fail deployment early when a port is already occupied by an unexpected process.",
      "Keep configuration changes version-controlled and environment-specific."
    ],
    monitoring: [
      "Alert on failed Tomcat startup and repeated restart loops.",
      "Monitor connector availability and application readiness separately.",
      "Track process PID, service status, and deployment version.",
      "Monitor load balancer health-check failures and the number of healthy replicas.",
      "Record port ownership and deployment timestamps in diagnostic logs."
    ],
    ciChecks: [
      "Validate server.xml and deployment manifests before release.",
      "Detect duplicate connector ports in generated configuration.",
      "Check container port mappings for collisions within the same deployment target.",
      "Run a startup smoke test in an isolated environment.",
      "Test graceful shutdown and redeployment behavior.",
      "Verify that a rollback restores the expected connector configuration."
    ]
  },

  postRecoveryValidation: [
    "The intended Tomcat service is running under the expected service manager.",
    "The expected PID and command line match the intended deployment.",
    "The correct process owns each required listening port.",
    "HTTP and HTTPS connectors respond using the correct protocol.",
    "The application health endpoint reports healthy.",
    "The load balancer marks the instance healthy and routes traffic correctly.",
    "Error rate and latency return to acceptable levels.",
    "Other applications on the host remain healthy.",
    "No duplicate Tomcat process or repeated startup loop remains.",
    "The deployment pipeline completes successfully and records the recovery."
  ],

  incidentReportTemplate: {
    incidentId: "",
    environment: "",
    service: "",
    affectedHostOrPod: "",
    affectedPortAndProtocol: "",
    startTimeUtc: "",
    detectionTimeUtc: "",
    recoveryTimeUtc: "",
    severity: "",
    customerImpact: "",
    tomcatVersion: "",
    javaVersion: "",
    releaseOrCommit: "",
    exactError: "",
    listenerPidAndCommand: "",
    listenerServiceOwner: "",
    rootCause: "",
    evidenceCollected: [],
    mitigation: "",
    rollbackPerformed: "",
    validationResults: [],
    permanentFix: "",
    preventionActions: [
      {
        action: "",
        owner: "",
        dueDate: ""
      }
    ],
    lessonsLearned: ""
  },

  handsOnLabs: [
    {
      title: "Lab 1 - Reproduce a local port conflict",
      steps: [
        "Start a local test server on port 8080 in a disposable environment.",
        "Attempt to start a second server on the same address and port.",
        "Capture the bind error.",
        "Use ss or lsof on Linux, or netstat on Windows, to identify the listener.",
        "Stop the test server gracefully and retry."
      ],
      expectedLearning: [
        "A bind failure is not proof that the port owner is an old Tomcat.",
        "Socket ownership must be correlated with process and service ownership."
      ]
    },
    {
      title: "Lab 2 - Simulate a duplicate Tomcat deployment",
      steps: [
        "Use a disposable test environment with two Tomcat instances configured for the same connector port.",
        "Start the first instance and record its PID.",
        "Start the second instance and inspect the startup logs.",
        "Correct the configuration or stop the intended obsolete test instance.",
        "Verify both intended instances can run when configured with distinct ports and base directories."
      ],
      expectedLearning: [
        "Different CATALINA_BASE values do not automatically prevent connector conflicts.",
        "Deployment lifecycle ownership should be explicit."
      ]
    },
    {
      title: "Lab 3 - Docker host-port mapping",
      steps: [
        "Publish a disposable container port to a chosen host port.",
        "Attempt to publish another container to the same host port.",
        "Inspect docker ps and docker inspect.",
        "Change the test mapping and validate connectivity."
      ],
      expectedLearning: [
        "Container-internal ports and host-published ports are different concepts.",
        "A host-port collision can occur even if the applications use separate containers."
      ]
    },
    {
      title: "Lab 4 - Bind address versus firewall",
      steps: [
        "Run a disposable HTTP server bound only to loopback.",
        "Test it from the same machine and from another test host.",
        "Inspect the listening address.",
        "Change the bind address only in the lab and retest.",
        "Keep firewall rules unchanged to distinguish binding from network reachability."
      ],
      expectedLearning: [
        "A service can listen successfully while still being unreachable remotely.",
        "Port conflicts, bind-address problems, and firewall problems require different fixes."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What does Address already in use mean?",
      answer: "The process could not bind the requested local address and port because of a socket conflict or an existing listener. Confirm the exact port and process owner before taking action."
    },
    {
      question: "How do you find which process owns port 8080 on Linux?",
      answer: "Use sudo ss -ltnp 'sport = :8080' or sudo lsof -nP -iTCP:8080 -sTCP:LISTEN, then inspect the PID, command line, user, and service manager."
    },
    {
      question: "Why should you not immediately use kill -9?",
      answer: "The listener may be serving production traffic or belong to an unrelated service. Forced termination can interrupt requests, lose diagnostic evidence, or cause data-processing issues."
    },
    {
      question: "Can two Tomcat instances run on one host?",
      answer: "Yes, if their listening addresses and ports are compatible and their runtime configuration is properly separated. Their HTTP, HTTPS, shutdown, and other enabled listeners must not conflict."
    },
    {
      question: "What is the difference between a port conflict and a firewall issue?",
      answer: "A port conflict prevents binding to a local socket. A firewall or routing issue usually affects connectivity to a listener that may already be running."
    },
    {
      question: "Why can Tomcat fail even if port 8080 is free?",
      answer: "The failing connector may use another port or IP address, or the error may involve permissions, address assignment, a different network namespace, or a transient socket condition."
    },
    {
      question: "How do Docker port conflicts differ from container ports?",
      answer: "Two containers can listen on the same internal port in isolated network namespaces. A collision often occurs when both attempt to publish the same host IP and port."
    },
    {
      question: "Does a Kubernetes Service require every pod to use a unique application port?",
      answer: "No. Multiple pods can listen on the same container port. Host-level conflicts are more relevant when hostPort or hostNetwork is used, or when a node-level port is otherwise reserved."
    },
    {
      question: "What should be checked after the port conflict is resolved?",
      answer: "Verify the intended PID, listening socket, connector response, application health, load balancer status, error rate, and absence of duplicate startup processes."
    },
    {
      question: "How can port conflicts be prevented during deployments?",
      answer: "Use a single lifecycle owner, idempotent deployment scripts, preflight port checks, validated configuration, controlled rolling deployments, and startup smoke tests."
    }
  ],

  operationalChecklist: [
    "Correct environment and target service confirmed.",
    "Exact port, protocol, and bind address identified.",
    "Full startup exception and timestamp captured.",
    "Listener PID, command, user, and owner verified.",
    "Duplicate startup and stale-process possibilities checked.",
    "HTTP, HTTPS, AJP, and shutdown ports reviewed as applicable.",
    "Docker or Kubernetes networking checked when relevant.",
    "Root cause supported by evidence.",
    "Recovery approved and performed through the owning service manager.",
    "Connector, application, and load balancer health validated.",
    "Permanent prevention action assigned."
  ],

  officialReferences: [
    {
      title: "Apache Tomcat 10.1 Configuration Reference",
      url: "https://tomcat.apache.org/tomcat-10.1-doc/config/"
    },
    {
      title: "Apache Tomcat Server Configuration",
      url: "https://tomcat.apache.org/tomcat-10.1-doc/config/server.html"
    },
    {
      title: "Apache Tomcat HTTP Connector",
      url: "https://tomcat.apache.org/tomcat-10.1-doc/config/http.html"
    },
    {
      title: "Apache Tomcat SSL/TLS Configuration",
      url: "https://tomcat.apache.org/tomcat-10.1-doc/ssl-howto.html"
    },
    {
      title: "Docker Port Publishing",
      url: "https://docs.docker.com/engine/network/port-publishing/"
    },
    {
      title: "Kubernetes Pods and Host Networking",
      url: "https://kubernetes.io/docs/concepts/pods/"
    },
    {
      title: "Linux ss Manual",
      url: "https://man7.org/linux/man-pages/man8/ss.8.html"
    },
    {
      title: "Linux lsof Manual",
      url: "https://man7.org/linux/man-pages/man8/lsof.8.html"
    }
  ]
} as const;

export default portConflictGuide;
