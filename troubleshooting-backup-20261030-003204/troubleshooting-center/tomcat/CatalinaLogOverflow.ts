
export const catalinaLogOverflowGuide = {
  title: "Tomcat Catalina Log Overflow - Production Troubleshooting",
  slug: "catalina-log-overflow",
  category: "Tomcat",
  difficulty: "Advanced",
  estimatedTime: "60-120 minutes",
  description:
    "Production incident runbook for diagnosing Tomcat Catalina and application log growth, filesystem exhaustion, failed log rotation, logging loops, container log overflow, and safe recovery.",

  incidentScenario: {
    title: "Production server disk usage suddenly reaches 100%",
    scenario: [
      "A production Tomcat instance starts returning HTTP 500/503 errors.",
      "Monitoring reports that /var/log or the application filesystem is almost full.",
      "catalina.out has grown to several gigabytes within a short period.",
      "The application team reports slow responses, failed deployments, or an unavailable service.",
      "A logrotate job may have failed, a logging loop may be generating huge volumes, or an application exception may be repeating continuously.",
      "The incident commander needs to restore service without destroying important forensic evidence."
    ],
    possibleSymptoms: [
      "No space left on device",
      "catalina.out grows continuously",
      "Tomcat startup or shutdown messages stop appearing in the expected file",
      "Application returns HTTP 500 or 503",
      "Log files stop rotating",
      "A deleted log file still consumes disk space",
      "High I/O wait or elevated disk latency",
      "Container or pod restarts after ephemeral storage exhaustion",
      "Logging framework reports appender or file-write errors",
      "New deployments fail because temporary or application files cannot be written"
    ],
    firstPrinciple:
      "Preserve evidence, establish the blast radius, stop the cause of excessive writes when safe, and recover capacity before making permanent logging changes."
  },

  impactAndSeverity: {
    severityGuide: [
      {
        level: "SEV-1",
        condition:
          "Production service unavailable, filesystem full on critical hosts, multiple instances affected, or database/application writes failing."
      },
      {
        level: "SEV-2",
        condition:
          "One production instance degraded, requests failing intermittently, or disk capacity approaching exhaustion with rapid growth."
      },
      {
        level: "SEV-3",
        condition:
          "Log growth is abnormal but sufficient disk headroom remains and service is healthy."
      },
      {
        level: "SEV-4",
        condition:
          "A non-production environment has excessive logs with no immediate customer impact."
      }
    ],
    questionsToAsk: [
      "Which environment is affected: production, staging, or development?",
      "Is one Tomcat host affected or every node behind the load balancer?",
      "Is the full filesystem the root filesystem, a dedicated log volume, or container ephemeral storage?",
      "Are HTTP 5xx rates, latency, or JVM health deteriorating?",
      "Did the issue begin after a deployment, configuration change, traffic increase, or scheduled task?",
      "Has the filesystem reached 100%, or is it growing rapidly toward that threshold?",
      "Is the application still writing business data successfully?",
      "Are security, audit, or compliance logs at risk of being lost?"
    ]
  },

  safetyChecks: {
    beforeChanges: [
      "Confirm the target host, cluster, environment, application, and Tomcat instance.",
      "Check whether the service is behind a load balancer and whether healthy capacity remains.",
      "Identify the incident owner and obtain production approval where required.",
      "Determine whether the affected filesystem also contains application data, database files, or deployment artifacts.",
      "Preserve a small sample of representative logs, timestamps, and relevant errors before cleanup, following retention and privacy rules.",
      "Do not copy sensitive logs to personal machines or public paste sites.",
      "Check whether the log file is actively written by Tomcat or an external logging process.",
      "Check available disk capacity before attempting a log copy, archive, or compression.",
      "Never remove audit records or required security evidence merely to free disk space.",
      "Prefer load-balancer draining or controlled failover if a node must be restarted or taken out of service."
    ],
    prohibitedShortcuts: [
      "Do not run rm -rf against an entire log directory.",
      "Do not truncate every .log file without identifying its owner and purpose.",
      "Do not restart all production Tomcat instances simultaneously.",
      "Do not disable all application logging as a permanent fix.",
      "Do not assume a successful logrotate command means the application is writing to the new file.",
      "Do not delete a log file and assume the disk space has been released.",
      "Do not change log retention or audit settings without approval."
    ]
  },

  evidenceCollection: {
    capture: [
      "Incident start time and time zone",
      "Hostname, environment, Tomcat version, Java version",
      "Filesystem capacity and inode utilization",
      "Largest files and their growth rate",
      "File owner, permissions, modification time, and open file descriptors",
      "Recent deployment and configuration changes",
      "Tomcat stdout/stderr destination and service manager configuration",
      "Logrotate configuration, timer, and execution history",
      "Application logging framework configuration",
      "JVM GC logs, crash logs, and repeated exception signatures",
      "Container or Kubernetes events when applicable",
      "Load balancer health, HTTP status distribution, latency, and restart history"
    ],
    initialCommands: [
      "date -Is",
      "hostname -f",
      "id",
      "df -hT",
      "df -ih",
      "free -h",
      "uptime",
      "ps -eo pid,ppid,user,%cpu,%mem,etime,args --sort=-%cpu | head -30"
    ],
    interpretation: {
      df:
        "Shows filesystem capacity and filesystem type. Identify the exact mount containing the affected log.",
      dfInodes:
        "Shows inode exhaustion. A filesystem may be unable to create new files even when byte capacity remains.",
      processList:
        "Helps identify whether Tomcat, a logging agent, compression job, or another process is consuming resources.",
      timestamps:
        "Correlate log growth with deployments, traffic changes, scheduled jobs, and the first customer-visible symptom."
    }
  },

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm the actual failure and blast radius",
      commands: [
        "systemctl status tomcat --no-pager -l",
        "journalctl -u tomcat --since '-30 minutes' --no-pager",
        "df -hT",
        "df -ih"
      ],
      decision:
        "If the filesystem is full, prioritize restoring safe write capacity. If disk and inode usage are healthy, investigate log destination, permissions, rotation, and logging configuration instead.",
      notes: [
        "The service unit may be named tomcat9, tomcat10, or something organization-specific.",
        "Use the real service name; do not assume tomcat.",
        "A failed service status is evidence, not proof that the logs caused the failure."
      ]
    },
    {
      step: 2,
      title: "Locate the affected filesystem and largest files",
      commands: [
        "du -xhd1 /var/log 2>/dev/null | sort -h",
        "du -xhd1 /opt 2>/dev/null | sort -h",
        "find /var/log -xdev -type f -printf '%s %TY-%Tm-%TdT%TH:%TM %p\\n' 2>/dev/null | sort -nr | head -30"
      ],
      decision:
        "If Catalina or application logs dominate usage, investigate their writer and rotation. If another directory dominates, do not treat Catalina logging as the confirmed root cause.",
      notes: [
        "Run directory scans against the relevant mounted filesystem.",
        "Large directory scans can add I/O load on busy production servers.",
        "If permissions block inspection, use approved elevated access rather than changing directory permissions broadly."
      ]
    },
    {
      step: 3,
      title: "Find Tomcat log destinations",
      commands: [
        "ps -ef | grep '[o]rg.apache.catalina.startup.Bootstrap'",
        "systemctl cat tomcat",
        "find /opt /var/log -type f \\( -name 'catalina.out' -o -name 'catalina*.log' -o -name 'localhost*.log' \\) 2>/dev/null"
      ],
      inspect: [
        "CATALINA_BASE and CATALINA_HOME",
        "Systemd StandardOutput and StandardError settings",
        "Tomcat logging.properties",
        "JULI handlers and file patterns",
        "Application Logback or Log4j configuration",
        "Container runtime stdout/stderr destination"
      ],
      decision:
        "catalina.out is commonly associated with redirected process output. Catalina, localhost, access, GC, and application logs may use different mechanisms and require separate fixes."
    },
    {
      step: 4,
      title: "Measure whether the log is actively growing",
      commands: [
        "stat /path/to/catalina.out",
        "sleep 10",
        "stat /path/to/catalina.out",
        "tail -n 100 /path/to/catalina.out"
      ],
      decision:
        "Compare file size and modification time across the observation window. If the file is growing quickly, inspect repeated exception signatures and the process generating output.",
      notes: [
        "Replace the example path with the verified log path.",
        "Avoid continuously tailing a multi-gigabyte file from its beginning.",
        "Do not publish unredacted logs containing tokens, credentials, session IDs, or personal data."
      ]
    },
    {
      step: 5,
      title: "Identify repeated errors and logging loops",
      commands: [
        "tail -n 500 /path/to/catalina.out",
        "grep -E 'ERROR|Exception|OutOfMemoryError|No space left on device|Permission denied' /path/to/catalina.out | tail -n 200"
      ],
      inspect: [
        "The same exception repeating every second",
        "Retry loops without backoff",
        "A failing downstream service producing repeated stack traces",
        "Recursive logging or an appender failure",
        "A health-check or scheduled task repeatedly failing",
        "Excessive DEBUG or TRACE logging enabled in production",
        "High request volume combined with per-request stack traces"
      ],
      decision:
        "If one error signature dominates, correlate it with application traces and recent changes. Fix the repeated failure or retry loop rather than only reducing log output."
    },
    {
      step: 6,
      title: "Inspect log rotation",
      commands: [
        "systemctl status logrotate.timer --no-pager",
        "journalctl -u logrotate.service --since '-24 hours' --no-pager",
        "grep -R -n -E 'catalina|tomcat|copytruncate|rotate|size|daily|compress' /etc/logrotate.conf /etc/logrotate.d 2>/dev/null"
      ],
      inspect: [
        "Is the correct log path covered by a rotation rule?",
        "Is rotation configured for the correct owner and group?",
        "Is the rotation frequency appropriate for the observed growth rate?",
        "Did the rotation job fail due to permissions, filesystem exhaustion, or invalid configuration?",
        "Does the application reopen its file after rotation?",
        "Is the file actually managed by logrotate, or by Tomcat/JULI/application logging?"
      ],
      decision:
        "If rotation is missing or failing, correct the responsible logging mechanism. Do not add a second rotation system to a file already managed by another component without understanding the interaction."
    },
    {
      step: 7,
      title: "Check for deleted files still consuming disk",
      commands: [
        "lsof +L1"
      ],
      decision:
        "If a large deleted file remains open, the owning process still holds its file descriptor. The filesystem space is generally released only after the descriptor is closed.",
      recovery:
        "Identify the exact process and descriptor. Prefer the application's documented reopen mechanism or a controlled restart of the affected instance after assessing service impact. Do not kill arbitrary processes or blindly write to /proc/PID/fd entries."
    },
    {
      step: 8,
      title: "Check permissions, ownership, and read-only mounts",
      commands: [
        "namei -l /path/to/catalina.out",
        "stat /path/to/catalina.out",
        "findmnt -T /path/to/catalina.out",
        "journalctl -k --since '-30 minutes' --no-pager"
      ],
      inspect: [
        "Can the Tomcat service account traverse parent directories?",
        "Can it write to the configured destination?",
        "Did a deployment or manual cleanup change ownership?",
        "Is the filesystem mounted read-only?",
        "Are kernel or storage errors present?"
      ],
      decision:
        "Correct only the affected path and expected ownership. If the filesystem became read-only because of storage errors, investigate the underlying storage and kernel messages before attempting remounts."
    },
    {
      step: 9,
      title: "Inspect JVM and application logging",
      inspect: [
        "JVM GC log configuration and rotation",
        "Heap dumps and fatal error logs",
        "Logback or Log4j rolling policies",
        "Asynchronous appender queue saturation",
        "Logging levels changed by environment variables or remote configuration",
        "Duplicate appenders writing the same events multiple times",
        "A retry storm or exception loop producing excessive messages"
      ],
      commands: [
        "jcmd <PID> VM.command_line",
        "jcmd <PID> VM.flags"
      ],
      notes: [
        "Run jcmd as an authorized account with access to the target JVM.",
        "Some JVM diagnostic commands can have operational impact; follow the team's production policy.",
        "Do not create a heap dump on a nearly full filesystem without first checking capacity and expected dump size."
      ]
    },
    {
      step: 10,
      title: "Check containers and Kubernetes if applicable",
      commands: [
        "kubectl get pods -n <namespace> -o wide",
        "kubectl describe pod <pod> -n <namespace>",
        "kubectl logs <pod> -n <namespace> --tail=200",
        "kubectl get events -n <namespace> --sort-by=.lastTimestamp"
      ],
      inspect: [
        "Container stdout/stderr log size",
        "Pod ephemeral-storage requests and limits",
        "Node filesystem and inode pressure",
        "Pod restarts and OOMKilled events",
        "Node-level log rotation and container runtime settings",
        "Whether logs are written both to stdout and to a file inside the container"
      ],
      decision:
        "If container logs are the source, fix node/runtime log management and application output volume. If a file inside the container is growing, inspect its mount and persistence model separately.",
      caution:
        "Deleting a pod or container can remove local evidence and ephemeral data. Preserve required logs before replacing workloads."
    },
    {
      step: 11,
      title: "Check centralized logging and agents",
      inspect: [
        "Fluent Bit, Fluentd, Filebeat, or OpenTelemetry Collector health",
        "Agent buffer growth and retry backlog",
        "Network failures to the logging backend",
        "Disk buffer or queue limits",
        "Duplicate collection paths",
        "Dropped-event and backpressure metrics"
      ],
      decision:
        "If local logs are growing because shipping is blocked, restore the pipeline or apply an approved buffer policy. Do not delete unshipped logs without understanding retention and recovery requirements."
    },
    {
      step: 12,
      title: "Correlate with changes and prove the root cause",
      evidence: [
        "Deployment timestamp",
        "Configuration and logging-level changes",
        "Traffic and request-rate changes",
        "Application exception frequency",
        "Filesystem growth rate",
        "Rotation job result",
        "Deleted-open-file evidence",
        "Central logging delivery status"
      ],
      decision:
        "The root cause should explain both why log volume increased and why the existing retention or rotation controls failed to contain it."
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "catalina.out grows rapidly",
      likelyCause: "Repeated exceptions, excessive stdout logging, retry loop, or missing rotation",
      confirmation: "Growth measurements, repeated stack traces, process output configuration",
      fix: "Correct the failing code/configuration and establish a tested rotation or bounded logging strategy"
    },
    {
      symptom: "Disk is full after a log was deleted",
      likelyCause: "An active process still holds the deleted file open",
      confirmation: "lsof +L1 identifies the open descriptor",
      fix: "Reopen the file or perform an approved controlled restart of the owning process"
    },
    {
      symptom: "Rotation runs but disk usage stays high",
      likelyCause: "Wrong path, another writer, retained archives, or deleted-open-file issue",
      confirmation: "Inspect active descriptors, archive sizes, and actual log destinations",
      fix: "Correct the responsible rotation policy and retention"
    },
    {
      symptom: "Tomcat cannot write new logs",
      likelyCause: "Filesystem full, inode exhaustion, permissions, or read-only mount",
      confirmation: "df -hT, df -ih, namei, stat, findmnt, kernel logs",
      fix: "Address the actual filesystem or permission failure"
    },
    {
      symptom: "Kubernetes pod restarts under log load",
      likelyCause: "Ephemeral storage pressure, node disk pressure, or memory exhaustion",
      confirmation: "Pod events, restart reason, node conditions, runtime logs",
      fix: "Bound log volume, correct runtime rotation, and right-size storage where appropriate"
    },
    {
      symptom: "Centralized logs are missing while local files grow",
      likelyCause: "Shipping agent failure, network failure, or buffer backlog",
      confirmation: "Agent status, queue metrics, destination connectivity",
      fix: "Restore delivery and manage buffers without silently discarding required evidence"
    },
    {
      symptom: "Only one application instance is affected",
      likelyCause: "Node-specific config drift, permissions, local disk issue, or uneven traffic",
      confirmation: "Compare healthy and affected instances",
      fix: "Correct the instance-specific cause and reconcile configuration"
    },
    {
      symptom: "All instances start overflowing after a release",
      likelyCause: "Logging-level change, shared application bug, or retry storm",
      confirmation: "Release correlation and matching error signatures",
      fix: "Roll back or correct the release using the approved deployment process"
    }
  ],

  safeRecoveryWorkflow: {
    phase1: {
      title: "Stabilize service and preserve evidence",
      actions: [
        "Declare the incident and identify the affected hosts.",
        "Check load-balancer health and remaining serving capacity.",
        "Capture filesystem usage, file metadata, representative errors, and relevant service logs.",
        "If one node is unhealthy and capacity allows, drain it according to the load-balancer or orchestration runbook.",
        "Avoid restarts that would interrupt all serving instances."
      ]
    },
    phase2: {
      title: "Restore safe disk capacity",
      actions: [
        "Identify the exact files consuming space.",
        "Confirm retention requirements and whether archives must be preserved.",
        "Use approved log archival or deletion procedures only for files confirmed safe to remove.",
        "If the file is actively written, use the application's supported rotation or reopen mechanism.",
        "If a deleted-open file is confirmed, close the owning descriptor through a supported, controlled process.",
        "If the disk is full because of a non-log file, do not remove logs as a substitute for diagnosing that file."
      ],
      warning:
        "A copytruncate rotation can lose log lines during the copy/truncate window and can race with writers. Use it only when the logging architecture requires it and the risk is accepted."
    },
    phase3: {
      title: "Fix the source of excess log volume",
      actions: [
        "Correct the recurring application error, failing dependency, or retry loop.",
        "Restore an appropriate production logging level.",
        "Fix logrotate or the application's rolling policy.",
        "Set explicit size-based and age-based retention appropriate to the expected log rate.",
        "Ensure GC logs, access logs, application logs, and container stdout are all covered by their correct mechanisms.",
        "Validate ownership and permissions without broad chmod 777 changes."
      ]
    },
    phase4: {
      title: "Validate before returning to service",
      checks: [
        "Filesystem usage is below the operational recovery threshold.",
        "Inode usage is healthy.",
        "Tomcat is healthy and remains stable.",
        "The application passes an approved health check.",
        "HTTP 5xx rates and latency return to normal.",
        "The active log file is receiving new entries.",
        "Rotation creates the expected new file and retention behaves as designed.",
        "Centralized logging resumes and backlog is controlled.",
        "No repeated exception storm remains.",
        "The load balancer or orchestrator reports the instance healthy before traffic is restored."
      ]
    }
  },

  productionCommands: {
    inspectDisk: [
      "df -hT",
      "df -ih",
      "findmnt -T /var/log",
      "du -xhd1 /var/log 2>/dev/null | sort -h"
    ],
    inspectLogs: [
      "stat /path/to/catalina.out",
      "tail -n 200 /path/to/catalina.out",
      "lsof +L1",
      "journalctl -u tomcat --since '-1 hour' --no-pager"
    ],
    inspectRotation: [
      "systemctl status logrotate.timer --no-pager",
      "journalctl -u logrotate.service --since '-24 hours' --no-pager",
      "logrotate --debug /etc/logrotate.conf"
    ],
    safeCommandNotes: [
      "Replace placeholder paths, service names, namespace names, and PIDs with verified values.",
      "logrotate --debug is intended to inspect behavior without performing the normal rotation actions; confirm the local version and configuration before relying on it.",
      "Do not run logrotate -f against production configuration until the target files, ownership, rotation method, and impact are reviewed.",
      "Avoid large recursive scans during severe I/O saturation; narrow the search to the affected mount and directory."
    ]
  },

  logrotateExample: {
    description:
      "Illustrative example only. Use this only if the verified Catalina output file is managed by logrotate and the chosen rotation method is compatible with its writer.",
    config: String.raw`/var/log/tomcat/catalina.out {
    daily
    rotate 14
    maxsize 200M
    compress
    delaycompress
    missingok
    notifempty
    create 0640 tomcat adm
}`,
    notes: [
      "Replace the path, owner, group, size threshold, and retention with values appropriate for the host.",
      "The example is not universally safe for catalina.out. If Tomcat or systemd keeps writing to the old file descriptor, rename-and-create rotation may not redirect output as expected.",
      "For a file descriptor that cannot be reopened, choose a documented strategy for that exact service; do not copy a generic logrotate snippet blindly.",
      "Validate the configuration with the installed logrotate version and test it in a non-production environment.",
      "If systemd journald owns stdout/stderr collection, configure and monitor journald retention instead of rotating an unrelated file."
    ]
  },

  prevention: {
    loggingStandards: [
      "Define a clear owner for each log destination.",
      "Set production logging levels deliberately; avoid persistent DEBUG/TRACE unless justified.",
      "Configure rolling policies with size and age limits.",
      "Define retention by operational, security, and compliance requirements.",
      "Use structured logs and rate-limit repetitive error messages where appropriate.",
      "Apply exponential backoff and bounded retries to prevent retry storms.",
      "Avoid duplicate logging through overlapping appenders or collectors.",
      "Use stdout/stderr consistently in containers and let the platform manage collection where appropriate."
    ],
    monitoring: [
      "Filesystem usage percentage and free bytes",
      "Filesystem inode utilization",
      "Growth rate of critical log files",
      "Time since last successful rotation",
      "Log rotation failures",
      "Tomcat process health and restart count",
      "HTTP 5xx rate and application latency",
      "Repeated exception frequency",
      "Log shipping backlog and dropped-event count",
      "Container ephemeral-storage and node disk pressure"
    ],
    alertingRecommendations: [
      "Warn before the filesystem reaches critical capacity; choose thresholds based on growth rate and recovery time.",
      "Alert on sudden log-growth acceleration, not only a static disk percentage.",
      "Alert when a required rotation job fails.",
      "Alert when the central logging pipeline stops receiving expected events.",
      "Ensure alerts include host, filesystem, log path, growth rate, and owning service."
    ],
    ciAndReleaseChecks: [
      "Review changes to logging levels and rolling policies.",
      "Validate log configuration before deployment.",
      "Run a load test that checks log volume under repeated errors.",
      "Verify that logs remain bounded during dependency outages.",
      "Test rotation, retention, ownership, and reopen behavior in staging.",
      "Include rollback instructions for releases that cause logging storms."
    ]
  },

  incidentReportTemplate: {
    incidentId: "",
    severity: "",
    environment: "",
    affectedHosts: [],
    affectedFilesystem: "",
    startTime: "",
    detectionTime: "",
    mitigationTime: "",
    recoveryTime: "",
    customerImpact: "",
    initialDiskUsage: "",
    peakDiskUsage: "",
    affectedLogFiles: [],
    growthRate: "",
    rootCause: "",
    contributingFactors: [],
    evidence: [],
    recoveryActions: [],
    dataLossOrRetentionImpact: "",
    validationResults: [],
    preventionActions: [],
    actionOwners: [],
    followUpDeadline: ""
  },

  handsOnLabs: [
    {
      title: "Lab 1 - Identify the largest log safely",
      goal:
        "Practice checking disk and inode usage, locating large files, and measuring growth without deleting anything.",
      tasks: [
        "Record df -hT and df -ih output.",
        "Identify the filesystem that contains the test log.",
        "Compare the log's metadata at two timestamps.",
        "Write down the observed growth rate and likely impact."
      ]
    },
    {
      title: "Lab 2 - Reproduce and diagnose a rotation mismatch",
      goal:
        "Use a disposable VM to observe how a writer behaves after a log is renamed.",
      tasks: [
        "Create a test service that writes to a log file.",
        "Rotate the file using a test configuration.",
        "Verify which inode the writer continues to use.",
        "Implement the correct reopen or rotation mechanism.",
        "Confirm that the new file receives entries."
      ]
    },
    {
      title: "Lab 3 - Simulate an exception storm",
      goal:
        "Learn to distinguish the underlying application failure from excessive log output.",
      tasks: [
        "Generate a controlled repeated exception in a test application.",
        "Measure file growth over a fixed interval.",
        "Identify the repeated error signature.",
        "Apply a bounded retry or logging-level correction.",
        "Verify that both application behavior and log volume improve."
      ]
    },
    {
      title: "Lab 4 - Diagnose a deleted-open file",
      goal:
        "Understand why removing a pathname may not free disk space immediately.",
      tasks: [
        "Use a disposable Linux VM and a test process holding a file open.",
        "Remove the test file through the supported lab procedure.",
        "Inspect lsof +L1 and filesystem usage.",
        "Close the descriptor normally and verify space recovery."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What is catalina.out?",
      answer:
        "It commonly captures Tomcat process stdout and stderr when the service startup mechanism redirects those streams. Its existence and management depend on the installation and service configuration."
    },
    {
      question: "Why does disk space remain used after deleting a log file?",
      answer:
        "A process may still hold the deleted inode open. Identify the process and descriptor, then close it through a supported application or service lifecycle operation."
    },
    {
      question: "What is the difference between disk exhaustion and inode exhaustion?",
      answer:
        "Disk exhaustion means there is insufficient filesystem capacity in bytes. Inode exhaustion means the filesystem cannot allocate additional file metadata entries, even if some byte capacity remains."
    },
    {
      question: "Why can log rotation fail to reduce disk usage?",
      answer:
        "The rule may target the wrong file, the writer may continue writing to an old descriptor, archives may be retained indefinitely, rotation may fail, or another log destination may be responsible."
    },
    {
      question: "Is copytruncate always safe?",
      answer:
        "No. It can lose records during the copy-and-truncate window and may race with active writes. Select the method based on the actual writer and logging architecture."
    },
    {
      question: "How do you troubleshoot a log storm?",
      answer:
        "Measure growth, identify repeated messages, correlate them with traffic and deployments, inspect retry behavior and downstream failures, correct the underlying cause, and then validate log volume."
    },
    {
      question: "How should Tomcat logs be managed in Kubernetes?",
      answer:
        "Prefer a consistent stdout/stderr collection model when suitable, configure runtime log rotation, monitor node and pod ephemeral storage, and avoid uncontrolled duplicate file logging."
    },
    {
      question: "What evidence should be preserved during a disk-full incident?",
      answer:
        "Capture timestamps, filesystem usage, file metadata, representative errors, process descriptors, rotation results, deployment changes, and service impact while respecting data-retention requirements."
    }
  ],

  completionChecklist: [
    "Correct host, environment, and filesystem confirmed",
    "Customer and service impact documented",
    "Disk bytes and inode usage checked",
    "Largest files and actual log destinations identified",
    "Log growth rate and repeated errors investigated",
    "Rotation and open-file descriptor behavior verified",
    "Underlying application or infrastructure cause identified",
    "Recovery completed with required approvals",
    "Tomcat and application health validated",
    "Log delivery and rotation tested",
    "Retention and audit requirements respected",
    "Monitoring, alerting, and prevention actions assigned",
    "Incident report and follow-up actions completed"
  ],

  officialReferences: [
    {
      title: "Apache Tomcat Logging",
      url: "https://tomcat.apache.org/tomcat-10.1-doc/logging.html"
    },
    {
      title: "Apache Tomcat Configuration Reference",
      url: "https://tomcat.apache.org/tomcat-10.1-doc/config/"
    },
    {
      title: "Linux logrotate manual",
      url: "https://man7.org/linux/man-pages/man8/logrotate.8.html"
    },
    {
      title: "Linux lsof manual",
      url: "https://man7.org/linux/man-pages/man8/lsof.8.html"
    },
    {
      title: "systemd journal configuration",
      url: "https://www.freedesktop.org/software/systemd/man/latest/journald.conf.html"
    },
    {
      title: "Kubernetes Logging Architecture",
      url: "https://kubernetes.io/docs/concepts/cluster-administration/logging/"
    },
    {
      title: "Kubernetes Resource Management",
      url: "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/"
    }
  ]
} as const;

export default catalinaLogOverflowGuide;
