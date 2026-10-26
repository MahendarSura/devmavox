// File: app/troubleshootingcentre/Linux Troubleshooting/Linux server slow response.ts

export interface SlowServerCommand {
  title: string;
  command: string;
  purpose: string;
  expectedOutput: string;
  interpretation: string;
}

export interface SlowServerStep {
  step: number;
  title: string;
  objective: string;
  actions: string[];
  commands?: string[];
  expectedResult: string;
  precautions?: string[];
}

export interface SlowServerRootCause {
  cause: string;
  symptoms: string[];
  investigation: string[];
  resolution: string[];
}

export interface SlowServerIncident {
  environment: string;
  incident: string;
  impact: string[];
  investigation: string[];
  rootCause: string;
  resolution: string[];
  prevention: string[];
}

export interface LinuxSlowServerRunbook {
  id: string;
  title: string;
  category: string;
  severity: string;
  summary: string;
  objective: string;
  symptoms: string[];
  businessImpact: string[];
  rootCauses: string[];
  diagnosticCommands: SlowServerCommand[];
  troubleshootingSteps: SlowServerStep[];
  rootCauseScenarios: SlowServerRootCause[];
  incidentScenario: SlowServerIncident;
  verification: string[];
  prevention: string[];
  monitoring: string[];
  safetyRules: string[];
  incidentReportTemplate: string[];
  troubleshootingChecklist: string[];
}

export const linuxServerSlowResponse: LinuxSlowServerRunbook = {
  id: "linux-server-slow-response",
  title: "Linux Server Slow Response",
  category: "Linux Troubleshooting",
  severity: "Medium / High / Critical",

  summary:
    "A Linux server may respond slowly because of CPU saturation, memory pressure, " +
    "disk I/O latency, filesystem exhaustion, network problems, overloaded applications, " +
    "database latency, excessive processes, or resource limits. Diagnose the bottleneck " +
    "using measurements before restarting services or changing system configuration.",

  objective:
    "Identify the resource or dependency causing slow responses, restore acceptable service " +
    "performance, verify recovery using measurable indicators, and prevent recurrence.",

  symptoms: [
    "SSH login takes unusually long.",
    "Commands take several seconds to complete.",
    "Web requests return slowly or time out.",
    "Application response times increase during peak traffic.",
    "CPU usage or system load remains elevated.",
    "Processes spend time waiting for disk I/O.",
    "The server starts using swap heavily.",
    "Database queries or background jobs become slow.",
    "A service responds slowly even though CPU usage appears low.",
    "Multiple services on the same host experience delays.",
    "Response times worsen after a deployment, scheduled job, or traffic spike.",
  ],

  businessImpact: [
    "Users experience slow page loads or failed requests.",
    "Transactions and background jobs take longer to complete.",
    "Service-level objectives may be breached.",
    "Deployment and administrative tasks are delayed.",
    "Retries can increase traffic and make the incident worse.",
    "Prolonged degradation may lead to outages.",
  ],

  rootCauses: [
    "CPU saturation caused by application processes or inefficient workloads.",
    "High load average caused by runnable tasks or tasks blocked on I/O.",
    "Memory pressure, swapping, or an out-of-memory condition.",
    "High disk latency, saturated storage, or excessive I/O.",
    "Filesystem or inode exhaustion affecting application writes.",
    "Network latency, packet loss, DNS delays, or connection exhaustion.",
    "Slow database queries or an overloaded downstream dependency.",
    "Excessive process count or thread contention.",
    "A recent deployment introduced inefficient code or configuration.",
    "Container CPU, memory, or I/O limits are too restrictive.",
    "Virtual machine host contention or cloud storage performance limits.",
    "Scheduled backups, log processing, or batch jobs compete with production workloads.",
  ],

  diagnosticCommands: [
    {
      title: "1. Check uptime and load average",
      command: "uptime",
      purpose:
        "Check system uptime, logged-in users, and 1-, 5-, and 15-minute load averages.",
      expectedOutput:
        "load average: 4.20, 3.70, 2.90",
      interpretation:
        "Illustrative output. Load average includes runnable tasks and tasks in uninterruptible sleep, " +
        "often associated with I/O. Compare it with CPU count and historical baseline; it is not a CPU percentage.",
    },
    {
      title: "2. Check CPU count",
      command: "nproc",
      purpose:
        "Find the number of processing units available to the current environment.",
      expectedOutput:
        "4",
      interpretation:
        "Illustrative output. Containers and CPU affinity may restrict available CPUs. " +
        "Compare with the effective resources assigned to the workload.",
    },
    {
      title: "3. Inspect process activity",
      command: "top",
      purpose:
        "Identify processes consuming CPU or memory and inspect system-wide activity.",
      expectedOutput:
        "A live process and CPU/memory summary",
      interpretation:
        "Check CPU usage, memory usage, process state, and whether high usage is sustained. " +
        "A single snapshot may not identify a transient or intermittent bottleneck.",
    },
    {
      title: "4. Find CPU-intensive processes",
      command: "ps -eo pid,ppid,user,stat,%cpu,%mem,etime,comm --sort=-%cpu | head -n 15",
      purpose:
        "List processes currently ranked by CPU usage.",
      expectedOutput:
        "PID PPID USER STAT %CPU %MEM ELAPSED COMMAND",
      interpretation:
        "Illustrative column heading. High CPU may be legitimate workload activity or a runaway process. " +
        "Investigate before terminating anything.",
    },
    {
      title: "5. Check memory and swap",
      command: "free -h",
      purpose:
        "Inspect memory availability and swap usage.",
      expectedOutput:
        "Mem: total 7.7Gi used 5.2Gi available 1.8Gi",
      interpretation:
        "Illustrative output. Pay attention to available memory, swap activity, and trends. " +
        "Linux uses otherwise-unused memory for cache, so the used column alone is not proof of memory pressure.",
    },
    {
      title: "6. Inspect virtual memory activity",
      command: "vmstat 1 10",
      purpose:
        "Observe run queue, blocked tasks, swap activity, I/O, and CPU state over time.",
      expectedOutput:
        "Repeated samples containing r, b, si, so, wa, and CPU columns",
      interpretation:
        "Illustrative description. Sustained nonzero si/so can indicate swap activity; high wa may indicate CPU time waiting for I/O. " +
        "Interpret all columns alongside application latency and storage metrics.",
    },
    {
      title: "7. Check disk capacity",
      command: "df -hT",
      purpose:
        "Identify filesystems approaching capacity limits.",
      expectedOutput:
        "Filesystem Type Size Used Avail Use%",
      interpretation:
        "A filesystem near 100% can disrupt logs, temporary files, and application writes. " +
        "Check inode usage separately using df -i.",
    },
    {
      title: "8. Check inode capacity",
      command: "df -i",
      purpose:
        "Find filesystems that have exhausted their inode allocation.",
      expectedOutput:
        "Filesystem Inodes IUsed IFree IUse%",
      interpretation:
        "A filesystem may have free disk bytes but no free inodes for new files. " +
        "Inspect the affected mount and locate directories containing excessive small files.",
    },
    {
      title: "9. Check disk I/O latency and utilization",
      command: "iostat -xz 1 5",
      purpose:
        "Measure storage throughput, queueing, latency, and device utilization where supported.",
      expectedOutput:
        "Device statistics including await, aqu-sz, and %util",
      interpretation:
        "Illustrative description. High await and growing queues may indicate storage contention. " +
        "Do not use %util alone as a universal saturation threshold, especially with modern parallel storage.",
    },
    {
      title: "10. Check filesystem mounts",
      command: "findmnt",
      purpose:
        "Inspect mounted filesystems and their source and options.",
      expectedOutput:
        "A list of mount targets, devices, filesystem types, and options",
      interpretation:
        "Look for unexpected mount changes, remote filesystems, or read-only mounts that may affect application operations.",
    },
    {
      title: "11. Inspect network connections",
      command: "ss -s",
      purpose:
        "Summarize TCP and other socket states.",
      expectedOutput:
        "Socket statistics and TCP state counts",
      interpretation:
        "A high number of connections or sockets in particular states can point to connection churn or backlog issues. " +
        "Compare with application and network metrics before drawing conclusions.",
    },
    {
      title: "12. Inspect service logs",
      command: "sudo journalctl -u myapp.service --since '-30 min' --no-pager",
      purpose:
        "Look for slow requests, timeouts, retries, errors, and recent service restarts.",
      expectedOutput:
        "Recent application or service log messages",
      interpretation:
        "Search for latency increases and correlate them with deployment times, resource spikes, and downstream failures.",
    },
    {
      title: "13. Check service health and resource limits",
      command: "systemctl status myapp.service --no-pager -l",
      purpose:
        "Check service state, recent failures, and restart behavior.",
      expectedOutput:
        "Active: active (running)",
      interpretation:
        "Illustrative output. An active service can still be slow. Check its logs, configured limits, and application-level metrics.",
    },
    {
      title: "14. Check recent kernel messages",
      command: "sudo journalctl -k --since '-30 min' --no-pager",
      purpose:
        "Look for OOM events, device errors, filesystem warnings, and other kernel-level problems.",
      expectedOutput:
        "Recent kernel log entries",
      interpretation:
        "Correlate warnings with the slowdown. Kernel logs may require elevated privileges and can contain sensitive information.",
    },
    {
      title: "15. Check name resolution timing",
      command: "time getent hosts example.com",
      purpose:
        "Measure whether name resolution is unexpectedly slow for the selected hostname.",
      expectedOutput:
        "Resolved address followed by elapsed timing",
      interpretation:
        "Illustrative description. Compare repeated results and use the actual dependency hostname. " +
        "One lookup alone does not prove DNS is the root cause.",
    },
  ],

  troubleshootingSteps: [
    {
      step: 1,
      title: "Establish the incident scope",
      objective:
        "Determine which users, services, hosts, and requests are affected.",
      actions: [
        "Record when the slowdown began.",
        "Check whether one application or the entire host is slow.",
        "Compare affected requests with a known-good request or host.",
        "Check recent deployments, scheduled jobs, configuration changes, and traffic spikes.",
        "Capture baseline latency and error-rate metrics if available.",
      ],
      commands: [
        "uptime",
        "systemctl status myapp.service --no-pager -l",
      ],
      expectedResult:
        "The scope and approximate start time of the performance incident are established.",
      precautions: [
        "Do not assume the Linux host is the cause; the bottleneck may be a database, DNS, or external service.",
      ],
    },
    {
      step: 2,
      title: "Check CPU saturation and load",
      objective:
        "Determine whether CPU demand is exceeding available processing capacity.",
      actions: [
        "Compare load average with the number of available CPUs.",
        "Inspect top and process-level CPU usage.",
        "Observe whether high CPU is sustained or transient.",
        "Identify the specific process or workload responsible.",
        "If a container is involved, inspect its effective CPU limits.",
      ],
      commands: [
        "uptime",
        "nproc",
        "top",
        "ps -eo pid,ppid,user,stat,%cpu,%mem,etime,comm --sort=-%cpu | head -n 15",
      ],
      expectedResult:
        "CPU pressure is confirmed or ruled out with supporting measurements.",
      precautions: [
        "A high load average does not necessarily mean CPU saturation.",
        "Do not kill a production process merely because it has high CPU usage.",
      ],
    },
    {
      step: 3,
      title: "Investigate memory pressure",
      objective:
        "Determine whether memory exhaustion or swapping is contributing to latency.",
      actions: [
        "Inspect available memory and swap.",
        "Observe vmstat samples over several intervals.",
        "Check for OOM-killer messages.",
        "Inspect process memory usage and container limits where relevant.",
        "Compare memory metrics with the time latency increased.",
      ],
      commands: [
        "free -h",
        "vmstat 1 10",
        "sudo journalctl -k --since '-30 min' --no-pager",
      ],
      expectedResult:
        "Memory pressure, swap activity, or an OOM event is identified if present.",
      precautions: [
        "Do not drop filesystem caches as a generic performance fix.",
        "Do not add swap blindly without evaluating workload and storage performance.",
      ],
    },
    {
      step: 4,
      title: "Investigate disk I/O and filesystem capacity",
      objective:
        "Find storage latency, capacity exhaustion, or filesystem errors.",
      actions: [
        "Check filesystem capacity and inode availability.",
        "Inspect disk latency and queueing.",
        "Check for heavy backup, logging, or batch workloads.",
        "Review kernel messages for storage and filesystem errors.",
        "Investigate remote filesystem latency when NFS or another network mount is involved.",
      ],
      commands: [
        "df -hT",
        "df -i",
        "iostat -xz 1 5",
        "sudo journalctl -k --since '-30 min' --no-pager",
      ],
      expectedResult:
        "Storage contention or filesystem problems are confirmed or ruled out.",
      precautions: [
        "The iostat command may require the sysstat package.",
        "Do not delete files or run filesystem repair commands without identifying the affected data and recovery plan.",
      ],
    },
    {
      step: 5,
      title: "Check network and dependency latency",
      objective:
        "Determine whether requests are delayed by networking or downstream services.",
      actions: [
        "Compare client-side latency with server-side request latency.",
        "Inspect socket states and connection counts.",
        "Measure DNS lookup timing for the actual dependency.",
        "Review database, cache, API, and message-queue latency metrics.",
        "Check packet loss and network path health using approved tools.",
      ],
      commands: [
        "ss -s",
        "time getent hosts example.com",
      ],
      expectedResult:
        "Network and dependency bottlenecks are isolated where possible.",
      precautions: [
        "Do not treat ping success or failure as a complete test of application connectivity.",
        "Avoid generating heavy network tests against production dependencies without approval.",
      ],
    },
    {
      step: 6,
      title: "Investigate the application itself",
      objective:
        "Identify slow endpoints, thread contention, retries, and inefficient operations.",
      actions: [
        "Review request latency percentiles and error rates.",
        "Inspect slow-query logs or application traces where available.",
        "Look for connection-pool exhaustion and thread or worker saturation.",
        "Compare the current release with the last known-good release.",
        "Check whether retry loops are increasing workload during dependency failures.",
      ],
      expectedResult:
        "The slow application path or downstream dependency is identified with supporting evidence.",
      precautions: [
        "Avoid repeatedly restarting the service without preserving logs and evidence.",
        "A healthy systemd status does not prove the application is performing normally.",
      ],
    },
    {
      step: 7,
      title: "Check service and container limits",
      objective:
        "Determine whether resource controls are constraining the workload.",
      actions: [
        "Inspect systemd CPU and memory limits.",
        "Check container CPU throttling and memory limits.",
        "Review process and file-descriptor limits when relevant.",
        "Compare configured limits with actual workload requirements.",
      ],
      commands: [
        "systemctl show myapp.service -p CPUQuota -p MemoryMax -p TasksMax",
        "cat /proc/$(pgrep -o -x myapp)/limits",
      ],
      expectedResult:
        "Unexpected or restrictive resource limits are identified if they contribute to the slowdown.",
      precautions: [
        "Replace the example service and process names with the actual values.",
        "Do not increase resource limits without checking host capacity and neighboring workloads.",
      ],
    },
    {
      step: 8,
      title: "Apply a controlled mitigation",
      objective:
        "Reduce user impact while preserving system stability.",
      actions: [
        "Use the mitigation that matches the confirmed bottleneck.",
        "Reduce or pause a noncritical batch job if authorized.",
        "Scale application capacity when the architecture and capacity allow it.",
        "Roll back a problematic release through the approved procedure if evidence supports it.",
        "Escalate storage, network, or database issues to the relevant owners.",
      ],
      expectedResult:
        "User-facing latency improves without creating additional instability.",
      precautions: [
        "Do not restart or terminate critical processes without assessing impact.",
        "Record changes and retain a rollback path.",
      ],
    },
    {
      step: 9,
      title: "Verify performance recovery",
      objective:
        "Prove that the service has returned to its expected performance level.",
      actions: [
        "Repeat the original slow request or approved health check.",
        "Compare latency percentiles and error rates with the baseline.",
        "Recheck CPU, memory, I/O, and network indicators.",
        "Confirm the relevant dependency has recovered.",
        "Monitor for recurrence after the immediate mitigation.",
      ],
      commands: [
        "uptime",
        "free -h",
        "df -hT",
        "systemctl status myapp.service --no-pager -l",
      ],
      expectedResult:
        "Application latency and resource indicators return to acceptable, measured levels.",
    },
    {
      step: 10,
      title: "Implement permanent prevention",
      objective:
        "Prevent the same performance incident from recurring.",
      actions: [
        "Document the measured bottleneck and root cause.",
        "Add monitoring and alerts for the relevant resource or dependency.",
        "Optimize inefficient queries or application code where confirmed.",
        "Review capacity planning and service limits.",
        "Add deployment checks and load tests where appropriate.",
        "Assign an owner and deadline to every follow-up action.",
      ],
      expectedResult:
        "A documented corrective plan reduces recurrence risk and improves detection.",
    },
  ],

  rootCauseScenarios: [
    {
      cause: "CPU saturation",
      symptoms: [
        "CPU usage remains high during the slowdown.",
        "One or more processes dominate CPU time.",
        "Request latency increases as runnable work grows.",
      ],
      investigation: [
        "Compare uptime load average with available CPUs.",
        "Inspect process-level CPU usage over time.",
        "Correlate CPU spikes with request volume, deployments, and scheduled jobs.",
      ],
      resolution: [
        "Optimize the identified workload.",
        "Reduce unnecessary background work when safe.",
        "Scale capacity if the measured workload legitimately exceeds current capacity.",
      ],
    },
    {
      cause: "Memory pressure and swap activity",
      symptoms: [
        "Available memory declines.",
        "Swap-in or swap-out activity persists.",
        "Applications experience unpredictable pauses.",
      ],
      investigation: [
        "Inspect free -h and vmstat output.",
        "Identify processes with increasing resident memory.",
        "Review kernel logs for OOM events.",
        "Check container memory limits.",
      ],
      resolution: [
        "Fix a confirmed memory leak or excessive allocation.",
        "Adjust application memory limits based on measured demand and host capacity.",
        "Scale memory if the workload genuinely requires it.",
      ],
    },
    {
      cause: "Disk I/O bottleneck",
      symptoms: [
        "Processes spend time waiting for storage.",
        "Disk latency and queues rise.",
        "Application requests involving storage become slow.",
      ],
      investigation: [
        "Inspect iostat output over time.",
        "Identify heavy I/O processes using approved tools.",
        "Check for backups, log storms, or storage errors.",
      ],
      resolution: [
        "Reschedule competing workloads where appropriate.",
        "Optimize storage access patterns.",
        "Address storage capacity or performance limits with the storage owner.",
      ],
    },
    {
      cause: "Slow database or external dependency",
      symptoms: [
        "The host has spare CPU capacity but requests remain slow.",
        "Application traces show long database or HTTP calls.",
        "Timeouts and retries increase.",
      ],
      investigation: [
        "Inspect distributed traces and dependency latency metrics.",
        "Check database query duration and connection-pool saturation.",
        "Review external API availability and network errors.",
      ],
      resolution: [
        "Optimize the confirmed slow query or request path.",
        "Correct connection-pool configuration when evidence supports it.",
        "Use bounded timeouts and controlled retries to avoid retry storms.",
      ],
    },
    {
      cause: "Filesystem or inode exhaustion",
      symptoms: [
        "Applications fail to create logs, temporary files, or cache entries.",
        "Disk capacity or inode usage approaches 100%.",
        "Services show write errors and degraded response times.",
      ],
      investigation: [
        "Check df -hT and df -i.",
        "Identify the affected mount and large or high-count directories.",
        "Check for deleted-but-open files when reported usage and visible files disagree.",
      ],
      resolution: [
        "Apply approved cleanup or log-retention procedures.",
        "Fix excessive temporary-file creation.",
        "Increase capacity or inode availability when required by the workload design.",
      ],
    },
    {
      cause: "Resource limits or container throttling",
      symptoms: [
        "The host appears healthy but one application remains slow.",
        "CPU throttling or container memory pressure is reported.",
        "The workload repeatedly hits configured limits.",
      ],
      investigation: [
        "Inspect systemd resource limits.",
        "Check container metrics and effective CPU/memory limits.",
        "Compare workload demand with allocated capacity.",
      ],
      resolution: [
        "Correct unreasonable limits through a reviewed change.",
        "Optimize resource consumption.",
        "Scale the workload or host where appropriate.",
      ],
    },
  ],

  incidentScenario: {
    environment:
      "Illustrative scenario: a Linux VM hosts a production web application and a local application worker.",

    incident:
      "Users report slow page loads during a period of increased traffic.",

    impact: [
      "Page response times rise above the service target.",
      "Some requests time out.",
      "The support team receives an increase in user complaints.",
    ],

    investigation: [
      "The engineer compares application latency with the previous baseline.",
      "CPU usage is elevated but does not fully explain the observed delays.",
      "Memory availability remains acceptable.",
      "Storage metrics show elevated write latency during a scheduled batch job.",
      "Application traces confirm that requests are waiting on a storage-dependent operation.",
    ],

    rootCause:
      "The scheduled batch job competes with latency-sensitive application operations for storage resources. This is an illustrative example, not a claim about a real production system.",

    resolution: [
      "The team pauses or reschedules the noncritical batch workload through the approved process.",
      "Application latency and storage latency are measured again.",
      "The batch schedule and storage workload are reviewed.",
      "Monitoring is updated to detect the same contention earlier.",
    ],

    prevention: [
      "Separate latency-sensitive and batch workloads where feasible.",
      "Monitor storage latency and application response-time percentiles.",
      "Load-test scheduled jobs against expected production traffic.",
      "Document performance baselines and escalation thresholds.",
    ],
  },

  verification: [
    "The original user-facing request completes within the expected latency target.",
    "Error rates and timeout counts return to the normal baseline.",
    "CPU, memory, swap, and I/O indicators have been reviewed.",
    "Network and downstream dependency latency are within expected ranges.",
    "The service remains healthy during representative traffic.",
    "The mitigation does not introduce new errors or capacity problems.",
    "Monitoring remains stable for an agreed observation period.",
  ],

  prevention: [
    "Establish CPU, memory, disk, network, and application latency baselines.",
    "Monitor p50, p95, and p99 request latency where applicable.",
    "Set alerts based on service objectives and historical behavior.",
    "Review slow database queries and dependency latency.",
    "Load-test production-like workloads before major releases.",
    "Use capacity planning for CPU, memory, storage, and network demand.",
    "Set reasonable timeouts and bounded retries.",
    "Control scheduled jobs and batch workloads during peak traffic.",
    "Monitor container throttling and memory limits.",
    "Document incident findings and track corrective actions.",
  ],

  monitoring: [
    "CPU utilization and load average.",
    "Available memory, swap activity, and OOM events.",
    "Disk latency, queue depth, and filesystem capacity.",
    "Inode utilization and filesystem errors.",
    "Network latency, packet loss, and connection counts.",
    "Application request latency percentiles and error rates.",
    "Database query latency and connection-pool saturation.",
    "Container CPU throttling and memory pressure.",
    "Service restarts, health-check failures, and dependency timeouts.",
  ],

  safetyRules: [
    "Measure first; do not assume CPU is the cause of every slowdown.",
    "A high load average is not automatically CPU saturation.",
    "Do not kill processes or restart production services without assessing impact.",
    "Do not delete logs or application files blindly to free storage.",
    "Do not drop caches as a generic fix for slow performance.",
    "Avoid unbounded diagnostic loops or high-overhead tracing on production systems.",
    "Do not increase resource limits without checking host capacity.",
    "Use approved change control and retain a rollback plan.",
    "Protect sensitive application logs and process arguments.",
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Date and time detected:",
    "Affected host and environment:",
    "Affected application or endpoint:",
    "User impact:",
    "Latency before incident:",
    "Latency during incident:",
    "Error rate and timeout count:",
    "CPU and load observations:",
    "Memory and swap observations:",
    "Disk I/O and filesystem observations:",
    "Network and dependency observations:",
    "Recent changes or scheduled jobs:",
    "Confirmed root cause:",
    "Mitigation applied:",
    "Recovery verification:",
    "Permanent corrective action:",
    "Owner and target date:",
  ],

  troubleshootingChecklist: [
    "Established incident scope and start time.",
    "Captured application latency and error-rate evidence.",
    "Checked load average and process CPU usage.",
    "Checked memory availability and swap activity.",
    "Checked disk capacity, inode availability, and I/O latency.",
    "Reviewed network connections and dependency latency.",
    "Inspected application and kernel logs.",
    "Reviewed service and container resource limits.",
    "Applied a controlled mitigation based on evidence.",
    "Verified application response times and error rates recovered.",
    "Documented root cause and preventive actions.",
  ],
};

export default linuxServerSlowResponse;
