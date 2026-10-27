

export const deploymentFailureGuide = {
  title: "Apache Tomcat Deployment Failure",
  slug: "deployment-failure",
  category: "Tomcat",
  difficulty: "Advanced",
  estimatedTime: "60-120 minutes",
  description:
    "Production-grade incident runbook for failed, partial, slow, or unhealthy Tomcat application deployments across standalone servers, CI/CD pipelines, and containerized environments.",

  incidentScenario: {
    title: "Production deployment fails halfway through release",
    scenario: [
      "A release pipeline uploads a new WAR file to a production Tomcat instance.",
      "The deployment job reports failure or times out while Tomcat is processing the application.",
      "The application context becomes unavailable, returns HTTP 404/500/503, or starts but fails its readiness checks.",
      "Some servers may run the new version while others still run the previous version.",
      "The team does not yet know whether the failure came from the artifact, Tomcat configuration, Java compatibility, filesystem permissions, application initialization, or a downstream dependency.",
      "The incident responder must restore a consistent and healthy service without overwriting evidence or causing a second outage."
    ],
    firstPrinciple:
      "Stop uncontrolled rollout, determine exactly which instances and versions are running, preserve deployment evidence, and choose recovery based on the observed failure."
  },

  impactAndSeverity: {
    levels: [
      {
        severity: "SEV-1",
        condition:
          "Production service unavailable, widespread 5xx errors, data integrity risk, or a release has affected all serving instances."
      },
      {
        severity: "SEV-2",
        condition:
          "Some production instances are unhealthy, capacity is reduced, or requests fail intermittently because versions are inconsistent."
      },
      {
        severity: "SEV-3",
        condition:
          "Deployment failed but the previous version remains healthy and customer impact is minimal."
      },
      {
        severity: "SEV-4",
        condition:
          "A non-production deployment fails with no customer impact."
      }
    ],
    questions: [
      "Which environment and application are affected?",
      "Which release ID, artifact checksum, and Git commit were deployed?",
      "Did the deployment fail before upload, during upload, during Tomcat deployment, or during application initialization?",
      "How many instances are healthy, unhealthy, or running a different version?",
      "Is the previous version still available and known to be compatible with current database state?",
      "Did any database migration or external side effect already occur?",
      "Is traffic still being sent to the failed instance?",
      "Does the pipeline failure mean deployment failed, or did only the health-check stage fail?",
      "Is the application unavailable, or is only the management/deployment endpoint failing?"
    ]
  },

  safetyChecks: {
    beforeChanges: [
      "Confirm the exact host, environment, Tomcat instance, application context, and release.",
      "Pause or halt further rollout when a production release is causing active impact.",
      "Check load-balancer health and remaining capacity before draining an instance.",
      "Record the currently running application version on every affected node.",
      "Preserve deployment logs, Tomcat logs, the failed artifact, checksums, and relevant configuration.",
      "Confirm whether database migrations or other irreversible changes have already executed.",
      "Verify the previous artifact is trusted, intact, and compatible with the current schema.",
      "Obtain production approval for rollback, traffic changes, or service restarts when required.",
      "Use a tested recovery procedure rather than manually copying files into a live deployment directory.",
      "Avoid simultaneous restarts or redeployments across all production nodes."
    ],
    prohibitedShortcuts: [
      "Do not delete the deployed application directory before preserving required evidence.",
      "Do not assume that restarting Tomcat fixes a broken artifact or application initialization failure.",
      "Do not deploy an unverified WAR from a developer workstation.",
      "Do not disable authentication, TLS, or security filters to make a health check pass.",
      "Do not roll back application code blindly if a database migration has changed the schema incompatibly.",
      "Do not expose Tomcat Manager or deployment credentials to the public internet.",
      "Do not run destructive database rollback commands without a separately approved recovery plan."
    ]
  },

  evidenceCollection: {
    capture: [
      "Incident start time and time zone",
      "Hostnames, environment, Tomcat version, and Java runtime version",
      "Application name, context path, release ID, and artifact checksum",
      "CI/CD job URL or identifier and complete deployment-stage logs",
      "Tomcat service logs and application startup exceptions",
      "Filesystem capacity, inode availability, file ownership, and permissions",
      "Artifact size, timestamp, and expected checksum",
      "Current deployed version and previous known-good version on each node",
      "Relevant server.xml, context.xml, web.xml, and application logging configuration",
      "Recent code, configuration, secret, certificate, and database changes",
      "Load-balancer health checks, HTTP status rates, and application latency",
      "Dependency health, database connection failures, and external service errors",
      "Deployment mechanism: Manager API, CI/CD copy, host automation, or container image rollout"
    ],
    initialCommands: [
      "date -Is",
      "hostname -f",
      "id",
      "java -version",
      "df -hT",
      "df -ih",
      "systemctl status tomcat --no-pager -l",
      "journalctl -u tomcat --since '-30 minutes' --no-pager"
    ],
    notes: [
      "Use the actual service name; it may be tomcat9, tomcat10, or a custom unit.",
      "Use the correct log path for the installation. Tomcat logs may be in CATALINA_BASE/logs, journald, container stdout, or a centralized logging system.",
      "Redact passwords, tokens, cookies, connection strings, and personal information before sharing logs."
    ]
  },

  deploymentLifecycle: {
    stages: [
      {
        stage: "Build",
        failures: [
          "Compilation errors",
          "Missing dependencies",
          "Tests fail",
          "Wrong artifact assembled"
        ]
      },
      {
        stage: "Artifact publication",
        failures: [
          "Artifact upload incomplete",
          "Checksum mismatch",
          "Wrong version or branch",
          "Repository credentials or network failure"
        ]
      },
      {
        stage: "Transfer",
        failures: [
          "SSH or deployment credentials fail",
          "Insufficient disk space",
          "Wrong destination path",
          "Partial upload or permission denied"
        ]
      },
      {
        stage: "Tomcat deployment",
        failures: [
          "WAR expansion failure",
          "Invalid archive",
          "Context path conflict",
          "Deployment descriptor error",
          "Application class-loading conflict"
        ]
      },
      {
        stage: "Application initialization",
        failures: [
          "Unsupported Java version",
          "Missing environment configuration",
          "Database or dependency unavailable",
          "Bean initialization failure",
          "Port binding or resource initialization failure"
        ]
      },
      {
        stage: "Validation",
        failures: [
          "Health endpoint returns an error",
          "Readiness timeout",
          "Wrong application version responds",
          "Load balancer continues sending traffic to an unhealthy instance"
        ]
      }
    ]
  },

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Determine whether the failure is deployment, startup, or health-check related",
      commands: [
        "systemctl status tomcat --no-pager -l",
        "journalctl -u tomcat --since '-30 minutes' --no-pager",
        "curl -sS -o /dev/null -w '%{http_code}\\n' http://127.0.0.1:8080/<context>/health"
      ],
      decision:
        "If Tomcat itself is down, investigate service startup first. If Tomcat is up but the application endpoint fails, investigate context deployment and initialization. If the application responds locally but the pipeline fails, inspect pipeline permissions, remote connectivity, and the health-check target.",
      caution:
        "Replace the sample context and endpoint with the application's actual health endpoint. A missing health endpoint does not itself prove deployment failure."
    },
    {
      step: 2,
      title: "Identify the exact release and deployment method",
      inspect: [
        "Release ID and Git commit",
        "Artifact repository coordinates",
        "WAR checksum and file size",
        "Target host list and deployment strategy",
        "Tomcat CATALINA_HOME and CATALINA_BASE",
        "Whether deployment uses Manager, filesystem copy, Ansible, a CI/CD agent, or a container image"
      ],
      commands: [
        "ps -ef | grep '[o]rg.apache.catalina.startup.Bootstrap'",
        "systemctl cat tomcat",
        "find /opt /srv /var/lib/tomcat -maxdepth 4 -type f -name '*.war' 2>/dev/null"
      ],
      decision:
        "If the artifact or release identity does not match the pipeline, stop before retrying. Resolve the artifact selection problem first."
    },
    {
      step: 3,
      title: "Check artifact integrity and archive structure",
      commands: [
        "ls -lh /path/to/application.war",
        "sha256sum /path/to/application.war",
        "unzip -t /path/to/application.war",
        "jar tf /path/to/application.war | head -80"
      ],
      decision:
        "If archive validation fails or the checksum differs from the trusted build output, reject the artifact and obtain a verified copy from the approved artifact repository.",
      inspect: [
        "Expected WEB-INF/classes and WEB-INF/lib entries",
        "WEB-INF/web.xml when used",
        "Application resources and configuration packaging",
        "Unexpected nested WAR files or incomplete packaging",
        "Whether the file was fully transferred before deployment"
      ],
      caution:
        "A structurally valid WAR can still contain incompatible classes, missing runtime configuration, or faulty application code."
    },
    {
      step: 4,
      title: "Check disk, inode, permissions, and ownership",
      commands: [
        "df -hT",
        "df -ih",
        "namei -l /path/to/application.war",
        "stat /path/to/application.war",
        "ls -ld /path/to/tomcat /path/to/tomcat/webapps"
      ],
      decision:
        "If disk or inode capacity is exhausted, or the Tomcat account cannot read the artifact or write to its required directories, correct that specific issue before retrying.",
      notes: [
        "Use the actual installation paths and service account.",
        "Do not use chmod -R 777 as a permission fix.",
        "Check temporary directories and the filesystem containing the expanded application as well as the WAR destination."
      ]
    },
    {
      step: 5,
      title: "Read Tomcat deployment and application startup errors",
      commands: [
        "tail -n 300 /path/to/tomcat/logs/catalina.out",
        "grep -E 'SEVERE|ERROR|Exception|Caused by:|LifecycleException|ClassNotFoundException|NoClassDefFoundError' /path/to/tomcat/logs/catalina.out | tail -n 200"
      ],
      inspect: [
        "The first meaningful exception, not only the final stack-trace line",
        "Nested Caused by sections",
        "Context initialization and listener failures",
        "Servlet/filter initialization failures",
        "ClassNotFoundException and NoClassDefFoundError",
        "UnsupportedClassVersionError",
        "Address already in use",
        "Connection refused, authentication failure, or database timeout",
        "OutOfMemoryError and filesystem write errors"
      ],
      decision:
        "Find the earliest causal error around the deployment timestamp and follow its nested causes. Later errors may only be consequences of the first failure.",
      caution:
        "Replace the sample log path with the real destination. If logs go to journald or container stdout, query that source instead."
    },
    {
      step: 6,
      title: "Validate Java and Tomcat compatibility",
      commands: [
        "java -version",
        "readlink -f \"$(command -v java)\"",
        "systemctl show tomcat -p Environment",
        "systemctl cat tomcat"
      ],
      inspect: [
        "JDK/JRE version used by the running service, not only the interactive shell",
        "JAVA_HOME and service-specific environment overrides",
        "Application bytecode target and dependencies",
        "Tomcat major version and Servlet/Jakarta API compatibility",
        "javax.* versus jakarta.* package expectations",
        "Unsupported or removed JVM flags"
      ],
      decision:
        "If the artifact targets a newer Java release or a different Servlet/Jakarta API generation than the server supports, rebuild or deploy to a compatible runtime after confirming the supported version matrix.",
      caution:
        "Tomcat 9 and Tomcat 10 have important javax-to-jakarta API differences. Do not treat a major-version upgrade as a drop-in replacement without compatibility testing."
    },
    {
      step: 7,
      title: "Investigate context path and deployment descriptor conflicts",
      inspect: [
        "WAR filename and expected context path",
        "Existing exploded application directory",
        "ROOT application conflicts",
        "Explicit Context configuration",
        "Duplicate application deployment names",
        "Malformed web.xml or unsupported descriptor elements",
        "Incorrect application base or deployment configuration"
      ],
      commands: [
        "find /path/to/tomcat/conf/Catalina -maxdepth 3 -type f -print 2>/dev/null",
        "find /path/to/tomcat/webapps -maxdepth 2 -type d -print 2>/dev/null",
        "find /path/to/tomcat/webapps -maxdepth 1 -type f -name '*.war' -print 2>/dev/null"
      ],
      decision:
        "If two artifacts or configuration files claim the same context, determine which deployment source is authoritative. Use the documented deployment procedure to resolve the conflict.",
      caution:
        "Tomcat auto-deployment behavior depends on configuration. Do not delete an exploded directory or context descriptor without understanding which artifact and configuration will be loaded next."
    },
    {
      step: 8,
      title: "Check application configuration and secrets",
      inspect: [
        "Environment variables expected by the application",
        "Configuration files mounted or injected at runtime",
        "Secret references and certificate paths",
        "Database URL, TLS trust, and credentials",
        "External service endpoints",
        "Feature flags and profile selection",
        "Differences between staging and production"
      ],
      commands: [
        "systemctl show tomcat -p Environment",
        "journalctl -u tomcat --since '-30 minutes' --no-pager"
      ],
      decision:
        "If configuration is missing or invalid, compare required configuration keys and secret references without printing secret values. Restore the approved configuration source rather than embedding credentials in the WAR."
    },
    {
      step: 9,
      title: "Check downstream dependencies and initialization",
      inspect: [
        "Database connectivity and connection pool startup",
        "DNS resolution and network routes",
        "TLS certificate validity and trust chain",
        "Message broker availability",
        "External API timeouts",
        "Schema migration completion",
        "Application startup hooks and scheduled tasks"
      ],
      decision:
        "If application initialization fails because a dependency is unavailable, determine whether the application should fail fast, start in a degraded state, or retry with bounded backoff. Do not repeatedly redeploy while the dependency remains unhealthy."
    },
    {
      step: 10,
      title: "Distinguish local application failure from load-balancer failure",
      commands: [
        "curl -sS -o /dev/null -w '%{http_code} %{time_total}\\n' http://127.0.0.1:8080/<context>/health",
        "curl -sS -o /dev/null -w '%{http_code} %{time_total}\\n' https://<application-host>/<context>/health"
      ],
      inspect: [
        "Local Tomcat response versus public endpoint response",
        "Load-balancer target health",
        "Reverse-proxy routing and context path",
        "TLS termination and upstream protocol",
        "Readiness and liveness probe configuration",
        "Application version reported by each instance"
      ],
      decision:
        "If local health succeeds but the external route fails, investigate the proxy, routing, TLS, or target registration rather than redeploying the application again."
    },
    {
      step: 11,
      title: "Check partial rollout and version consistency",
      inspect: [
        "Deployment status for every target host",
        "Version or build ID returned by each instance",
        "Healthy and unhealthy target counts",
        "Pipeline retries and timeout behavior",
        "Whether a second deployment started before the first completed"
      ],
      decision:
        "If instances are running mixed versions, halt further rollout and establish a known-good, compatible version across the fleet using the approved rolling recovery procedure."
    },
    {
      step: 12,
      title: "Inspect resource pressure and startup timeouts",
      commands: [
        "free -h",
        "uptime",
        "df -hT",
        "ps -eo pid,%cpu,%mem,etime,args --sort=-%mem | head -25",
        "journalctl -u tomcat --since '-30 minutes' --no-pager"
      ],
      inspect: [
        "JVM heap pressure and garbage collection pauses",
        "CPU saturation",
        "Memory limits and OOM kills",
        "Disk latency and temporary storage",
        "Thread or connection pool exhaustion",
        "Health-check timeout too short for legitimate startup"
      ],
      decision:
        "If the deployment is merely slow, establish whether startup is progressing or deadlocked before increasing timeouts. A longer timeout will not fix an infinite initialization loop or an unavailable dependency."
    },
    {
      step: 13,
      title: "Correlate changes and identify the first causal failure",
      evidence: [
        "Last known-good release and checksum",
        "Failed release and checksum",
        "First deployment error timestamp",
        "Java/Tomcat configuration changes",
        "Application configuration and secret changes",
        "Database migration events",
        "Load-balancer health transition",
        "Filesystem and resource metrics"
      ],
      decision:
        "A defensible root cause explains why the release failed, why the failure produced the observed symptoms, and why existing rollout or health controls did not prevent customer impact."
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "WAR upload or deployment stage fails immediately",
      likelyCauses: [
        "Wrong destination path",
        "Network or SSH failure",
        "Insufficient permissions",
        "Disk full",
        "Artifact repository authentication failure"
      ],
      proof:
        "Pipeline logs, target path inspection, artifact checksum, filesystem capacity, and service-account permissions",
      recovery:
        "Correct the exact transfer or permission problem and retry only after artifact integrity is verified."
    },
    {
      symptom: "Tomcat starts but application context fails",
      likelyCauses: [
        "Application initialization exception",
        "Invalid configuration",
        "Missing dependency",
        "Database or external service unavailable"
      ],
      proof:
        "First causal exception and nested stack trace around the deployment timestamp",
      recovery:
        "Fix the application or dependency issue; roll back if production health cannot be restored within the incident recovery objective."
    },
    {
      symptom: "UnsupportedClassVersionError",
      likelyCauses: [
        "Application compiled for a newer Java release than the runtime supports"
      ],
      proof:
        "Exception bytecode version and the Java version used by the Tomcat service",
      recovery:
        "Deploy a compatible build or update the runtime through an approved compatibility-tested change."
    },
    {
      symptom: "ClassNotFoundException or NoClassDefFoundError",
      likelyCauses: [
        "Missing library",
        "Incorrect WAR packaging",
        "Conflicting class loaders",
        "Provided dependency missing from the runtime"
      ],
      proof:
        "Stack trace, WAR contents, dependency tree, and class-loading configuration",
      recovery:
        "Correct packaging or dependency scope and rebuild a verified artifact."
    },
    {
      symptom: "HTTP 404 after deployment",
      likelyCauses: [
        "Incorrect context path",
        "Missing route or servlet mapping",
        "Deployment did not complete",
        "Proxy route mismatch"
      ],
      proof:
        "Tomcat deployment logs, application mappings, local endpoint, and proxy configuration",
      recovery:
        "Correct the context or route and verify both local and external requests."
    },
    {
      symptom: "HTTP 500 after deployment",
      likelyCauses: [
        "Unhandled application exception",
        "Missing configuration",
        "Dependency failure",
        "Schema incompatibility"
      ],
      proof:
        "Correlated application stack trace and request/dependency telemetry",
      recovery:
        "Correct the cause or restore the previous compatible release and schema state."
    },
    {
      symptom: "HTTP 503 or unhealthy target",
      likelyCauses: [
        "Application not ready",
        "Dependency unavailable",
        "Readiness probe misconfigured",
        "Insufficient serving capacity"
      ],
      proof:
        "Application health, load-balancer target status, dependency health, and probe history",
      recovery:
        "Restore readiness and safe capacity before returning the instance to traffic."
    },
    {
      symptom: "Deployment times out but app responds",
      likelyCauses: [
        "Health check targets the wrong URL",
        "Pipeline timeout is too short",
        "Deployment API response is delayed",
        "A post-deployment stage failed after a successful deployment"
      ],
      proof:
        "Pipeline stage boundaries, actual version endpoint, Tomcat logs, and deployment API result",
      recovery:
        "Determine the actual deployed state before retrying; do not assume timeout means no changes occurred."
    },
    {
      symptom: "Only one node fails",
      likelyCauses: [
        "Configuration drift",
        "Node-specific permissions",
        "Disk or memory pressure",
        "Different Java runtime or artifact"
      ],
      proof:
        "Side-by-side comparison with a healthy node",
      recovery:
        "Reconcile the affected node with the approved configuration and release."
    },
    {
      symptom: "Every node fails after the same release",
      likelyCauses: [
        "Bad artifact",
        "Incompatible runtime",
        "Shared configuration error",
        "Database migration incompatibility"
      ],
      proof:
        "Identical exception signatures and release correlation across nodes",
      recovery:
        "Stop rollout and restore a known-good compatible release or configuration."
    }
  ],

  safeRecoveryWorkflow: {
    phase1: {
      title: "Contain the incident",
      actions: [
        "Pause the release pipeline or deployment controller.",
        "Identify healthy instances and current version distribution.",
        "Drain only the affected instances if healthy capacity is sufficient.",
        "Preserve deployment logs, artifact metadata, and the first causal exception.",
        "Stop automated retries that could repeatedly redeploy the same broken artifact."
      ]
    },
    phase2: {
      title: "Choose the recovery path",
      decisionBranches: [
        {
          condition: "Artifact is corrupt or checksum is wrong",
          action:
            "Reject it and retrieve the trusted artifact from the approved repository."
        },
        {
          condition: "Application defect or incompatible runtime",
          action:
            "Roll back to a verified compatible artifact or perform an approved forward fix."
        },
        {
          condition: "Configuration or secret problem",
          action:
            "Restore the correct versioned configuration or secret reference and validate access without exposing secret values."
        },
        {
          condition: "Dependency unavailable",
          action:
            "Restore dependency health or use an approved degraded-mode strategy; avoid repeated deployments."
        },
        {
          condition: "Only proxy or health-check routing is wrong",
          action:
            "Correct routing or probe configuration after confirming local application health."
        },
        {
          condition: "Database migration has already run",
          action:
            "Check schema compatibility before code rollback. Use the database recovery plan if the migration is destructive or irreversible."
        }
      ]
    },
    phase3: {
      title: "Perform controlled recovery",
      actions: [
        "Use the approved deployment mechanism and known-good artifact.",
        "Deploy to one canary or drained instance first when the architecture supports it.",
        "Wait for startup and readiness validation before proceeding to additional instances.",
        "Confirm the application build ID and artifact checksum.",
        "Verify that the expected application context is available.",
        "Check logs for fresh startup exceptions and repeated failures.",
        "Restore traffic gradually according to the deployment runbook."
      ]
    },
    phase4: {
      title: "Validate service restoration",
      checks: [
        "All intended instances run the expected version.",
        "Tomcat service and application context remain healthy.",
        "Local and external health checks pass.",
        "HTTP 5xx rate and latency return to baseline.",
        "Authentication and authorization behave correctly.",
        "Database reads and writes are verified through approved application checks.",
        "Background jobs, messaging, and scheduled tasks behave as expected.",
        "No duplicate deployment or unexpected context remains.",
        "Logs and metrics show no new initialization failure.",
        "The release pipeline reports a result consistent with the actual deployed state."
      ]
    }
  },

  deploymentAndRollbackSafety: {
    preferredPractices: [
      "Build immutable artifacts once and promote the same checksum between environments.",
      "Use versioned artifact repositories rather than copying arbitrary local WAR files.",
      "Maintain a documented known-good artifact and its configuration version.",
      "Use rolling or blue-green deployment where the architecture supports it.",
      "Keep database changes backward-compatible across the rollback window where possible.",
      "Use canary validation before broad rollout.",
      "Keep application and infrastructure changes observable and auditable.",
      "Ensure a pipeline timeout triggers state inspection, not an unconditional second deployment."
    ],
    rollbackChecklist: [
      "Previous artifact checksum verified",
      "Previous application configuration available",
      "Database schema compatible with previous code",
      "Required secrets and certificates still valid",
      "Background jobs and external side effects considered",
      "Rollback approved and target instances identified",
      "Health checks and monitoring ready",
      "Post-rollback version and data validation completed"
    ]
  },

  prevention: {
    buildAndCi: [
      "Run unit, integration, and packaging tests before artifact publication.",
      "Validate WAR structure and required runtime configuration.",
      "Record artifact checksum, Git commit, build ID, Java target, and dependency metadata.",
      "Run dependency and security checks.",
      "Reject empty, corrupt, unsigned where signing is required, or unexpected artifacts.",
      "Validate deployment configuration before production promotion.",
      "Make deployment stages idempotent where practical and ensure retries are safe."
    ],
    releaseControls: [
      "Use approval gates for production changes.",
      "Use canary or rolling deployment with explicit health gates.",
      "Verify version consistency across instances.",
      "Stop rollout automatically when error rates or readiness checks exceed defined thresholds.",
      "Use bounded retries with backoff.",
      "Prevent overlapping deployments to the same application unless explicitly supported.",
      "Separate deployment success from application readiness and business validation."
    ],
    monitoring: [
      "Deployment success/failure rate",
      "Time to startup and readiness",
      "HTTP 5xx rate and latency",
      "Healthy load-balancer target count",
      "JVM heap, GC pauses, CPU, and memory pressure",
      "Disk and inode usage",
      "Dependency health and connection pool failures",
      "Application version by instance",
      "Error-rate changes after each release",
      "Database migration status"
    ],
    operationalReadiness: [
      "Maintain a production deployment runbook.",
      "Document rollback prerequisites and owners.",
      "Test rollback in a non-production environment.",
      "Keep logs and metrics available across failed deployments.",
      "Define who can approve production recovery actions.",
      "Run periodic failure simulations for corrupt artifacts, missing configuration, and dependency outages.",
      "Review every production deployment incident for corrective actions."
    ]
  },

  incidentReportTemplate: {
    incidentId: "",
    severity: "",
    environment: "",
    application: "",
    affectedInstances: [],
    releaseId: "",
    gitCommit: "",
    artifactChecksum: "",
    previousKnownGoodVersion: "",
    incidentStartTime: "",
    detectionTime: "",
    mitigationTime: "",
    recoveryTime: "",
    customerImpact: "",
    deploymentStageFailed: "",
    firstCausalError: "",
    rootCause: "",
    contributingFactors: [],
    databaseMigrationStatus: "",
    evidenceLinks: [],
    containmentActions: [],
    recoveryActions: [],
    postRecoveryValidation: [],
    preventionActions: [],
    actionOwners: [],
    followUpDeadline: ""
  },

  handsOnLabs: [
    {
      title: "Lab 1 - Diagnose a corrupt WAR",
      tasks: [
        "Create a disposable test WAR and calculate its SHA-256 checksum.",
        "Create a deliberately invalid archive in a lab environment.",
        "Run unzip -t and compare the checksum with the expected artifact.",
        "Document the evidence and reject the invalid artifact before deployment."
      ]
    },
    {
      title: "Lab 2 - Diagnose Java compatibility",
      tasks: [
        "Build a sample application with a known Java target.",
        "Run it against a compatible and an incompatible test runtime.",
        "Capture the startup exception.",
        "Document the correct remediation and compatibility checks."
      ]
    },
    {
      title: "Lab 3 - Simulate a missing configuration",
      tasks: [
        "Deploy a test application requiring a non-secret configuration key.",
        "Remove that key in the test environment.",
        "Capture the first causal initialization exception.",
        "Restore the configuration through the approved configuration mechanism.",
        "Validate startup and readiness."
      ]
    },
    {
      title: "Lab 4 - Simulate a failed rolling deployment",
      tasks: [
        "Run at least two disposable application instances.",
        "Deploy a test release that fails readiness on one instance.",
        "Pause rollout and compare version and health state.",
        "Restore a known-good release.",
        "Verify that only healthy instances receive traffic."
      ]
    },
    {
      title: "Lab 5 - Test a deployment timeout",
      tasks: [
        "Use a test pipeline with a deliberately short timeout.",
        "Allow the test deployment to complete while the pipeline times out.",
        "Inspect the actual application version and health.",
        "Document why the correct next step is state inspection rather than blind redeployment."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What is the first step when a production deployment fails?",
      answer:
        "Contain further rollout, establish impact and current version distribution, preserve evidence, and determine whether the failure occurred during artifact transfer, Tomcat deployment, application initialization, or health validation."
    },
    {
      question: "Why should you inspect the first causal exception?",
      answer:
        "Later stack traces may be consequences of the original initialization failure. The earliest meaningful exception around the deployment timestamp often identifies the actual cause."
    },
    {
      question: "What causes UnsupportedClassVersionError?",
      answer:
        "The runtime cannot load bytecode compiled for a newer Java class-file version. Verify the Java runtime used by the Tomcat service and the application's compilation target."
    },
    {
      question: "What is the difference between Tomcat being up and an application being healthy?",
      answer:
        "Tomcat can be running while a specific application context fails to initialize or its downstream dependencies remain unavailable."
    },
    {
      question: "Why can a deployment pipeline time out after a successful deployment?",
      answer:
        "The application may deploy successfully while the pipeline's response, health-check, or post-deployment stage times out. Inspect the actual deployed version and health before retrying."
    },
    {
      question: "What should be checked before rolling back application code?",
      answer:
        "Verify the previous artifact, configuration, secrets, database schema compatibility, migrations, and external side effects. Code rollback alone may not reverse data changes."
    },
    {
      question: "How do you troubleshoot HTTP 404 after deployment?",
      answer:
        "Verify the context path, WAR filename, servlet mappings, deployment status, and proxy routing. Compare local Tomcat responses with external requests."
    },
    {
      question: "How do you prevent bad releases from reaching every node?",
      answer:
        "Use immutable artifacts, canary or rolling deployment, readiness gates, automated rollback criteria, error-rate monitoring, and a tested recovery runbook."
    },
    {
      question: "Why is deleting the exploded deployment directory risky?",
      answer:
        "It may remove active application files or evidence and may trigger unexpected redeployment behavior. Confirm the deployment mechanism and use the documented undeploy or redeploy procedure."
    },
    {
      question: "How do you prove the root cause rather than guess?",
      answer:
        "Correlate the first causal error with artifact identity, configuration changes, runtime compatibility, dependency status, and the affected instance timeline."
    }
  ],

  completionChecklist: [
    "Correct environment, application, and release identified",
    "Customer impact and severity documented",
    "Further unsafe rollout stopped",
    "Current version on each instance recorded",
    "Artifact integrity and checksum verified",
    "Tomcat logs and first causal exception inspected",
    "Java and Tomcat compatibility checked",
    "Disk, inode, permissions, and context conflicts checked",
    "Configuration, secrets, and dependencies validated",
    "Local health separated from proxy/load-balancer health",
    "Database migration and rollback compatibility reviewed",
    "Recovery performed through the approved deployment process",
    "All instances report the intended version",
    "Application and business health checks pass",
    "Prevention actions, owners, and deadlines recorded"
  ],

  officialReferences: [
    {
      title: "Apache Tomcat 10.1 - Application Developer Guide",
      url: "https://tomcat.apache.org/tomcat-10.1-doc/appdev/"
    },
    {
      title: "Apache Tomcat 10.1 - Manager Application",
      url: "https://tomcat.apache.org/tomcat-10.1-doc/manager-howto.html"
    },
    {
      title: "Apache Tomcat 10.1 - Deployment",
      url: "https://tomcat.apache.org/tomcat-10.1-doc/deployer-howto.html"
    },
    {
      title: "Apache Tomcat 10.1 - Class Loader",
      url: "https://tomcat.apache.org/tomcat-10.1-doc/class-loader-howto.html"
    },
    {
      title: "Apache Tomcat 10.1 - Logging",
      url: "https://tomcat.apache.org/tomcat-10.1-doc/logging.html"
    },
    {
      title: "Java Troubleshooting Guide",
      url: "https://docs.oracle.com/en/java/javase/21/troubleshoot/"
    },
    {
      title: "Kubernetes Deployments",
      url: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/"
    }
  ]
} as const;

export default deploymentFailureGuide;
