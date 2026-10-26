
export interface TroubleshootingCommand {
  title: string;
  command: string;
  purpose: string;
  expectedOutput: string;
  interpretation: string;
}

export interface TroubleshootingStep {
  step: number;
  title: string;
  objective: string;
  commands: string[];
  explanation: string;
  expectedResult: string;
}

const linuxHighCPU = {
  id: "linux-high-cpu-usage",
  title: "Linux Server High CPU Usage",
  category: "Linux Troubleshooting",
  difficulty: "Intermediate to Advanced",
  estimatedTime: "20–45 minutes",
  environment: ["Linux", "Ubuntu", "RHEL", "Amazon Linux", "Cloud VMs"],

  summary:
    "Investigate and resolve sustained high CPU utilization on a Linux server using a structured production incident-response workflow.",

  incident: {
    scenario:
      "A production application running on a Linux server becomes slow. API requests take longer than usual, SSH sessions respond slowly, and monitoring reports CPU utilization above 90%.",

    severity:
      "Severity depends on customer impact, service criticality, redundancy, and the duration of the incident. High CPU alone does not determine severity.",

    customerImpact: [
      "Increased API response time",
      "Application timeouts or failed requests",
      "Slow SSH and administrative operations",
      "Delayed background jobs",
      "Potential health-check failures and service degradation"
    ],

    immediatePriorities: [
      "Confirm the impact and scope of the incident.",
      "Check whether one server or multiple instances are affected.",
      "Preserve useful logs and metrics before changing the system.",
      "Apply the least disruptive mitigation that addresses the confirmed cause."
    ]
  },

  symptoms: [
    {
      symptom: "Sustained CPU utilization above 90%",
      meaning:
        "The server may be close to its available CPU capacity. Confirm utilization over time rather than relying on one sample."
    },
    {
      symptom: "High application latency",
      meaning:
        "CPU contention may be delaying request processing, although network, storage, database, and downstream services can also cause latency."
    },
    {
      symptom: "High load average",
      meaning:
        "Processes may be waiting for CPU or in uninterruptible sleep, commonly associated with I/O. Compare load average with CPU count and process states."
    },
    {
      symptom: "SSH becomes slow",
      meaning:
        "System resource contention may affect interactive sessions. Use an existing management channel or cloud console if SSH is unavailable."
    },
    {
      symptom: "CPU usage rises after deployment",
      meaning:
        "A new application version, configuration change, or background job may have introduced additional workload or a performance regression."
    }
  ],

  rootCauses: [
    {
      cause: "Application bug or infinite loop",
      indicators: [
        "One application process repeatedly consumes a large share of CPU.",
        "CPU usage increases after a particular request or code path.",
        "The issue started after an application change."
      ],
      investigation:
        "Inspect process activity, application logs, request patterns, and recent releases. Use application profiling where appropriate."
    },
    {
      cause: "Traffic spike",
      indicators: [
        "Request rate increases significantly.",
        "Multiple application workers consume CPU.",
        "Latency and request volume increase together."
      ],
      investigation:
        "Compare request metrics, access logs, load balancer metrics, and CPU utilization over the same time window."
    },
    {
      cause: "Background job or scheduled task",
      indicators: [
        "CPU spikes at a predictable time.",
        "A batch process or scheduled task appears near the top of CPU consumers."
      ],
      investigation:
        "Inspect cron schedules, systemd timers, batch jobs, and application worker logs."
    },
    {
      cause: "Excessive process or thread count",
      indicators: [
        "Many workers compete for CPU.",
        "Process or thread counts rise unexpectedly.",
        "Application queue length increases."
      ],
      investigation:
        "Inspect process and thread counts, service configuration, worker limits, and application queue metrics."
    },
    {
      cause: "CPU throttling in a container or virtual machine",
      indicators: [
        "The application is slow despite apparently available host CPU.",
        "Container CPU quota or cloud instance CPU limits are reached.",
        "CPU throttling metrics increase."
      ],
      investigation:
        "Check container CPU limits, cgroup throttling counters, VM specifications, and provider-specific CPU credit metrics."
    },
    {
      cause: "High I/O wait mistaken for CPU saturation",
      indicators: [
        "Load average is high but user and system CPU utilization are not proportionately high.",
        "The iowait metric is elevated.",
        "Storage latency or blocked processes are present."
      ],
      investigation:
        "Inspect CPU breakdown, disk latency, process states, and storage metrics before deciding on a CPU-related fix."
    }
  ],

  prerequisites: [
    "Access to the Linux server or an approved management console",
    "Permission to inspect processes, logs, and service status",
    "Monitoring data for CPU, latency, traffic, and errors when available",
    "Knowledge of the affected application and its service name"
  ],

  safetyRules: [
    "Do not kill a process solely because it has high CPU usage.",
    "Do not run kill -9 as the first response.",
    "Do not restart a production service without assessing availability and redundancy.",
    "Do not assume a high load average always means CPU saturation.",
    "Do not change CPU limits or instance sizes without checking capacity, cost, and application requirements.",
    "Follow your organization's incident, change-management, and access-control procedures."
  ],

  diagnosticCommands: [
    {
      title: "Check uptime and load average",
      command: "uptime",
      purpose:
        "Inspect system uptime, logged-in users, and one-, five-, and fifteen-minute load averages.",
      expectedOutput:
        "Example: load average: 8.20, 7.10, 6.40",
      interpretation:
        "Compare the load average with the available logical CPU count. A load average of 8 has different implications on a 2-vCPU machine versus a 16-vCPU machine. Load includes runnable tasks and tasks in uninterruptible sleep."
    },
    {
      title: "Check CPU count",
      command: "nproc",
      purpose:
        "Find the number of processing units available to the current environment.",
      expectedOutput:
        "Example: 4",
      interpretation:
        "This reports the processing units visible to the environment. Container CPU quotas and cloud-specific limits can further restrict effective CPU capacity."
    },
    {
      title: "Inspect live CPU usage",
      command: "top",
      purpose:
        "View CPU utilization, memory, process states, and the processes currently consuming resources.",
      expectedOutput:
        "A live process table with PID, user, CPU percentage, memory, and process name.",
      interpretation:
        "Press P to sort by CPU usage. In the CPU summary, examine user time, system time, idle time, and iowait. Interpret CPU percentages according to the tool's display mode and the number of CPUs."
    },
    {
      title: "List the highest CPU-consuming processes",
      command:
        "ps -eo pid,ppid,user,stat,comm,%cpu,%mem --sort=-%cpu | head -15",
      purpose:
        "Identify processes reporting the highest CPU consumption.",
      expectedOutput:
        "A process table sorted by the reported CPU percentage.",
      interpretation:
        "Record the PID, parent PID, owner, state, and command. A snapshot may miss short spikes; compare it with repeated samples."
    },
    {
      title: "Monitor per-core CPU usage",
      command: "mpstat -P ALL 1 5",
      purpose:
        "Sample CPU utilization across individual cores.",
      expectedOutput:
        "Per-CPU utilization rows, usually including %usr, %sys, %iowait, and %idle.",
      interpretation:
        "A single saturated core can cause application delays even when average utilization across all cores looks moderate. Requires the sysstat package."
    },
    {
      title: "Monitor per-process CPU over time",
      command: "pidstat -u 1 5",
      purpose:
        "Observe CPU usage by process over repeated intervals.",
      expectedOutput:
        "Process IDs and CPU usage sampled over time.",
      interpretation:
        "Use repeated samples to distinguish a sustained CPU consumer from a short-lived spike. Requires the sysstat package."
    },
    {
      title: "Check process and system activity",
      command: "vmstat 1 5",
      purpose:
        "Inspect runnable processes, blocked processes, memory activity, CPU utilization, and I/O-related indicators.",
      expectedOutput:
        "Repeated rows containing fields such as r, b, us, sy, id, and wa.",
      interpretation:
        "The r field represents runnable processes; b represents processes blocked waiting for I/O. High wa suggests investigating storage or I/O rather than assuming a pure CPU bottleneck."
    },
    {
      title: "Inspect a specific process",
      command: "ps -p <PID> -o pid,ppid,user,stat,etime,%cpu,%mem,args",
      purpose:
        "Inspect details of a process identified during the investigation.",
      expectedOutput:
        "The selected process's identity, elapsed time, CPU, memory, and command arguments.",
      interpretation:
        "Replace <PID> with the actual process ID. Treat command arguments as potentially sensitive because they may contain operational details."
    },
    {
      title: "Review recent system logs",
      command: "journalctl --since '30 minutes ago' --no-pager",
      purpose:
        "Look for recent system messages and errors around the incident.",
      expectedOutput:
        "Journal entries from the requested time range, if available.",
      interpretation:
        "Correlate timestamps with the start of high CPU usage. Application logs may be stored elsewhere. Access and journal retention depend on system configuration."
    },
    {
      title: "Inspect a specific service",
      command: "systemctl status <service-name> --no-pager",
      purpose:
        "Check the state and recent messages for a systemd-managed service.",
      expectedOutput:
        "Service state, main PID, and available recent log messages.",
      interpretation:
        "Replace <service-name> with the actual service unit. A service can be active while its application is unhealthy or consuming excessive CPU."
    }
  ] satisfies TroubleshootingCommand[],

  troubleshootingSteps: [
    {
      step: 1,
      title: "Confirm the incident and its impact",
      objective:
        "Determine whether the issue is real, sustained, and affecting customers.",

      commands: [
        "uptime",
        "nproc",
        "top"
      ],

      explanation:
        "Check CPU utilization, load average, available CPU count, and the application's observed behavior. Compare current measurements with a normal baseline. Confirm whether the incident affects one host, one service, or the entire fleet.",

      expectedResult:
        "A clear understanding of the incident's scope, duration, and initial severity."
    },
    {
      step: 2,
      title: "Identify the process consuming CPU",
      objective:
        "Find the workload responsible for the resource pressure.",

      commands: [
        "top",
        "ps -eo pid,ppid,user,stat,comm,%cpu,%mem --sort=-%cpu | head -15",
        "pidstat -u 1 5"
      ],

      explanation:
        "Record the process ID, owner, executable, parent process, and CPU trend. Identify whether the process belongs to the application, a database, a monitoring agent, a backup, or a scheduled job. Do not assume the top process is automatically the root cause.",

      expectedResult:
        "A candidate process or workload supported by repeatable observations."
    },
    {
      step: 3,
      title: "Determine what type of CPU pressure exists",
      objective:
        "Differentiate application computation, kernel activity, I/O waiting, and capacity constraints.",

      commands: [
        "mpstat -P ALL 1 5",
        "vmstat 1 5",
        "top"
      ],

      explanation:
        "High user CPU can indicate application computation. High system CPU may indicate kernel work, system calls, networking, or other operating-system activity. High iowait suggests storage investigation. Per-core metrics can reveal one saturated core. Check container throttling and cloud CPU credit metrics when applicable.",

      expectedResult:
        "A more precise bottleneck hypothesis rather than a generic 'CPU is high' diagnosis."
    },
    {
      step: 4,
      title: "Correlate the issue with logs and changes",
      objective:
        "Find the event or workload that triggered the incident.",

      commands: [
        "journalctl --since '30 minutes ago' --no-pager",
        "systemctl status <service-name> --no-pager"
      ],

      explanation:
        "Replace the service placeholder with the affected service. Compare log timestamps with deployments, configuration changes, traffic spikes, scheduled tasks, and error-rate increases. Check application-specific logs and distributed traces when available.",

      expectedResult:
        "Evidence linking the CPU increase to a code path, workload, configuration, infrastructure limit, or another plausible cause."
    },
    {
      step: 5,
      title: "Choose a safe mitigation",
      objective:
        "Reduce customer impact while minimizing operational risk.",

      commands: [
        "systemctl status <service-name> --no-pager"
      ],

      explanation:
        "Choose mitigation based on the confirmed cause. Options may include reducing incoming load, pausing a non-critical batch job, shifting traffic to healthy instances, scaling within approved limits, or rolling back a recent deployment. Restarting a service is not a universal fix.",

      expectedResult:
        "A documented action with a clear reason, expected impact, owner, and rollback plan."
    },
    {
      step: 6,
      title: "Implement the permanent fix",
      objective:
        "Address the underlying cause so the incident does not recur.",

      commands: [],

      explanation:
        "Examples include fixing an application loop, optimizing an expensive query, tuning worker concurrency, correcting a scheduled job, addressing CPU throttling, or increasing capacity after validating demand. Test changes safely and follow the required release or change process.",

      expectedResult:
        "The root cause has been addressed, not merely hidden by a temporary restart."
    },
    {
      step: 7,
      title: "Verify recovery",
      objective:
        "Prove that system and application health have returned to acceptable levels.",

      commands: [
        "top",
        "uptime",
        "systemctl status <service-name> --no-pager"
      ],

      explanation:
        "Compare CPU usage, load average, application latency, error rates, request volume, and service health against the pre-incident baseline. Check that recovery is sustained over an appropriate observation period.",

      expectedResult:
        "CPU and application metrics return to expected ranges, and the original customer impact is resolved."
    },
    {
      step: 8,
      title: "Document the incident and prevent recurrence",
      objective:
        "Capture the cause, resolution, and improvements for future incidents.",

      commands: [],

      explanation:
        "Record the timeline, customer impact, diagnostic evidence, root cause, mitigation, permanent fix, and follow-up owners. Add or refine alerts, dashboards, runbooks, and capacity thresholds where appropriate.",

      expectedResult:
        "An actionable incident report and preventive tasks with owners."
    }
  ] satisfies TroubleshootingStep[],

  remediationScenarios: [
    {
      title: "Scenario A: Application process is consuming excessive CPU",

     indicators: [
        "One application process remains near the top of CPU usage over repeated samples.",
        "Application latency increases at the same time.",
        "Logs or profiling indicate an expensive code path."
      ],

      actions: [
        "Identify the application and the affected endpoint or workload.",
        "Review logs, traces, and profiler output.",
        "If the issue began after a release, assess rollback through the approved deployment process.",
        "Deploy a tested correction and compare metrics."
      ],

      avoid:
        "Do not kill the process without understanding whether it is handling critical requests or maintaining important work."
    },
    {
      title: "Scenario B: Traffic spike overwhelms available capacity",

      indicators: [
        "Request rate rises sharply.",
        "Multiple workers consume CPU.",
        "Latency and queue depth increase with traffic."
      ],

      actions: [
        "Check load balancer, application, and request-rate metrics.",
        "Determine whether the traffic is expected, abusive, or caused by retries.",
        "Use approved load shedding, rate limiting, caching, or horizontal scaling where appropriate.",
        "Verify that downstream dependencies can handle additional traffic."
      ],

      avoid:
        "Do not scale blindly without checking quotas, downstream capacity, cost, and whether the traffic pattern is legitimate."
    },
    {
      title: "Scenario C: Scheduled job causes recurring CPU spikes",

      indicators: [
        "The incident repeats at a similar time.",
        "A batch process or scheduled task appears in process monitoring."
      ],

      actions: [
        "Inspect cron entries, systemd timers, and job scheduler history.",
        "Compare the schedule with CPU metrics and application latency.",
        "Optimize the workload, adjust concurrency, or move it to a suitable time window.",
        "Confirm that any scheduling change does not violate business requirements."
      ],

      avoid:
        "Do not disable a business-critical job without confirming its purpose and arranging an approved alternative."
    },
    {
      title: "Scenario D: Container CPU throttling",

      indicators: [
        "The containerized application is slow under load.",
        "CPU throttling counters rise.",
        "Host-level CPU utilization may not appear fully saturated."
      ],

      actions: [
        "Inspect the container CPU limit and request.",
        "Check cgroup throttling counters and container metrics.",
        "Compare throttling with request latency and traffic.",
        "Adjust limits or workload placement only after capacity and scheduling implications are understood."
      ],

      avoid:
        "Do not assume increasing a container limit will help if the host or cluster lacks spare CPU capacity."
    }
  ],

  verificationChecklist: [
    "CPU utilization is within the expected operating range.",
    "Load average and runnable-process count are improving.",
    "The identified process no longer shows abnormal sustained CPU usage.",
    "Application latency and error rates have recovered.",
    "Health checks pass and critical services are healthy.",
    "No new resource or dependency bottleneck has appeared.",
    "Recovery remains stable during the agreed observation period."
  ],

  monitoringRecommendations: [
    {
      metric: "CPU utilization",
      purpose:
        "Detect sustained CPU saturation and abnormal changes from baseline."
    },
    {
      metric: "Load average and runnable processes",
      purpose:
        "Understand system contention relative to available CPU capacity."
    },
    {
      metric: "Application latency and error rate",
      purpose:
        "Measure customer impact instead of relying on host CPU alone."
    },
    {
      metric: "Per-process CPU usage",
      purpose:
        "Identify recurring high-consumption workloads."
    },
    {
      metric: "Container CPU throttling",
      purpose:
        "Detect workloads restricted by CPU quotas."
    },
    {
      metric: "Cloud CPU credits or instance metrics",
      purpose:
        "Check provider-specific CPU constraints when applicable."
    }
  ],

  realTimeIncidentExample: {
    title: "Production API becomes slow after deployment",

    timeline: [
      {
        time: "09:00",
        event:
          "A new application release is deployed."
      },
      {
        time: "09:05",
        event:
          "CPU utilization rises and API response times increase."
      },
      {
        time: "09:10",
        event:
          "The on-call engineer confirms the affected hosts and identifies a high-CPU application process."
      },
      {
        time: "09:15",
        event:
          "Logs and traces indicate repeated expensive processing introduced by the release."
      },
      {
        time: "09:20",
        event:
          "The team follows its rollback procedure to restore the previous healthy version."
      },
      {
        time: "09:30",
        event:
          "CPU and latency return toward baseline. The team continues monitoring and prepares a permanent code fix."
      }
    ],

    rootCause:
      "Illustrative example: a regression in the new release causes excessive computation for certain requests. Actual root cause must be established from production evidence.",

    resolution:
      "Mitigate customer impact through the approved rollback process, confirm recovery with metrics, then fix and test the faulty code before redeployment.",

    lessonsLearned: [
      "Correlate infrastructure metrics with release timestamps.",
      "Use application logs and traces to establish root cause.",
      "Maintain a tested rollback procedure.",
      "Monitor both infrastructure health and customer-facing service indicators."
    ]
  },

  incidentReportTemplate: {
    incidentId: "INC-YYYY-NNNN",
    title: "Sustained high CPU utilization on Linux server",
    startTime: "Record incident start time and timezone",
    endTime: "Record recovery time and timezone",
    impact: "Describe affected services and customer impact",
    detection: "Alert, dashboard, customer report, or manual discovery",
    rootCause: "Record the verified technical cause",
    mitigation: "Record immediate actions taken",
    permanentFix: "Record the corrective change",
    verification: "Record before/after metrics and health checks",
    prevention: "Record monitoring, testing, or capacity improvements",
    followUpOwner: "Assign an accountable owner"
  },

  referenceCommands: [
    {
      title: "Check whether sysstat tools are installed",
      command: "command -v mpstat; command -v pidstat",
      note:
        "If a tool is unavailable, install the sysstat package through your approved package-management process."
    },
    {
      title: "Inspect CPU information",
      command: "lscpu",
      note:
        "Review CPU count and topology. Virtualized environments may expose only part of the underlying host."
    }
  ],

  importantNotes: [
    "Example output and incident timelines are illustrative, not captured from a real production server.",
    "Command availability and output can vary by Linux distribution and installed packages.",
    "Run diagnostic commands with the minimum required privileges.",
    "Review service names, log access, and production change procedures before remediation.",
    "CPU thresholds should be based on service objectives and workload baselines rather than one universal number."
  ]
};

export default linuxHighCPU;
