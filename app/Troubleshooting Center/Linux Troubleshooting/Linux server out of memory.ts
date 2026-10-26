
export interface OOMCommand {
  title: string;
  command: string;
  purpose: string;
  interpretation: string;
}

export interface OOMStep {
  step: number;
  title: string;
  objective: string;
  commands: string[];
  explanation: string;
  expectedResult: string;
}

const linuxOutOfMemory = {
  id: "linux-server-out-of-memory",
  title: "Linux Server Out of Memory (OOM)",
  category: "Linux Troubleshooting",
  difficulty: "Intermediate to Advanced",
  estimatedTime: "30–60 minutes",

  environment: [
    "Ubuntu",
    "RHEL",
    "Amazon Linux",
    "Linux Virtual Machines",
    "Cloud Servers",
    "Docker Hosts"
  ],

  summary:
    "Diagnose and resolve Linux memory exhaustion, investigate the Linux Out-Of-Memory (OOM) killer, and restore application stability without blindly terminating critical processes.",

  incident: {
    scenario:
      "A production Linux server becomes unresponsive. Applications crash, processes are terminated unexpectedly, SSH becomes slow, or monitoring reports critically low available memory.",

    severity:
      "Assess severity using customer impact, application availability, memory pressure, and whether critical services are failing.",

    customerImpact: [
      "Application processes may crash or restart.",
      "Requests may fail or time out.",
      "Database or application services may become unstable.",
      "Background jobs may stop unexpectedly.",
      "The operating system may experience severe memory pressure."
    ],

    immediatePriorities: [
      "Confirm available memory and swap usage.",
      "Identify whether the issue is host-wide or limited to a container.",
      "Check logs for OOM-killer activity.",
      "Identify the affected workload before changing or stopping processes.",
      "Protect critical services and preserve diagnostic evidence."
    ]
  },

  symptoms: [
    {
      symptom: "Processes are terminated unexpectedly",
      explanation:
        "The kernel may invoke the OOM killer when it cannot satisfy memory allocation demands under applicable memory constraints."
    },
    {
      symptom: "Available memory becomes critically low",
      explanation:
        "Applications, caches, kernel memory, or other workloads may be consuming available RAM. Low free memory alone does not always indicate a problem because Linux uses memory for caching."
    },
    {
      symptom: "Application restarts or crashes",
      explanation:
        "A process may have been killed by the kernel or an application may have failed to allocate memory."
    },
    {
      symptom: "Swap usage increases significantly",
      explanation:
        "The system may be under memory pressure. Swap usage alone does not prove an active memory crisis; examine swap activity and application latency."
    },
    {
      symptom: "Container exits with OOMKilled",
      explanation:
        "A container may have exceeded its memory limit even when the host still has available memory."
    },
    {
      symptom: "Server becomes slow",
      explanation:
        "Memory reclaim, swapping, allocation stalls, or heavy I/O can degrade system responsiveness."
    }
  ],

  rootCauses: [
    {
      cause: "Application memory leak",
      indicators: [
        "Resident memory grows continuously.",
        "Memory usage increases with uptime or request volume.",
        "Restarting the application temporarily reduces memory usage."
      ],
      investigation:
        "Track process RSS over time and use application-specific heap profiling or memory diagnostics."
    },
    {
      cause: "Insufficient RAM for the workload",
      indicators: [
        "Memory pressure increases during normal peak traffic.",
        "Multiple legitimate processes require more memory than available.",
        "The issue repeats during predictable workload peaks."
      ],
      investigation:
        "Compare memory demand, workload size, peak traffic, and host capacity."
    },
    {
      cause: "Sudden workload increase",
      indicators: [
        "Memory usage rises alongside request volume or batch activity.",
        "Several workers grow in memory at the same time."
      ],
      investigation:
        "Correlate application metrics, traffic, background jobs, and deployment changes."
    },
    {
      cause: "Container memory limit exceeded",
      indicators: [
        "The container exits or restarts with OOMKilled status.",
        "Container memory approaches its configured limit."
      ],
      investigation:
        "Inspect container limits, memory usage, and container-runtime or orchestrator events."
    },
    {
      cause: "Excessive worker or process count",
      indicators: [
        "Many application workers consume memory simultaneously.",
        "Process count rises during traffic spikes."
      ],
      investigation:
        "Review worker concurrency, queue sizes, process limits, and application architecture."
    },
    {
      cause: "Kernel or memory allocation constraints",
      indicators: [
        "Allocation failures occur despite some reported free memory.",
        "Kernel logs show allocation failures or constrained memory zones."
      ],
      investigation:
        "Review kernel messages and memory allocation context. Specialized kernel diagnostics may be required."
    }
  ],

  safetyRules: [
    "Never run kill -9 against arbitrary processes to free memory.",
    "Do not disable the OOM killer as a general fix.",
    "Do not assume adding swap will resolve a memory leak.",
    "Do not increase a container memory limit without checking host or cluster capacity.",
    "Preserve relevant logs before restarting affected workloads.",
    "Follow production change-management and incident-response procedures."
  ],

  diagnosticCommands: [
    {
      title: "Check total, used, and available memory",
      command: "free -h",
      purpose:
        "Get a quick summary of physical memory and swap.",
      interpretation:
        "Pay particular attention to the available column. Linux may use otherwise free RAM for reclaimable caches, so the free column alone is not enough to diagnose exhaustion."
    },
    {
      title: "Inspect memory details",
      command: "cat /proc/meminfo",
      purpose:
        "Inspect detailed kernel memory counters.",
      interpretation:
        "Review MemAvailable, MemFree, Cached, SwapTotal, SwapFree, and relevant slab metrics. Interpret these alongside workload behavior."
    },
    {
      title: "Identify processes with high resident memory",
      command:
        "ps -eo pid,ppid,user,rss,%mem,%cpu,comm --sort=-rss | head -15",
      purpose:
        "List processes sorted by resident memory size.",
      interpretation:
        "RSS is reported in KiB by this ps format. Shared pages can be counted in multiple processes, so summed RSS is not an exact measure of total physical memory consumption."
    },
    {
      title: "Check swap configuration and usage",
      command: "swapon --show",
      purpose:
        "Show configured swap devices or files.",
      interpretation:
        "No output can mean no active swap. Swap configuration should be evaluated against workload requirements and infrastructure policy."
    },
    {
      title: "Check system memory and swap activity",
      command: "vmstat 1 5",
      purpose:
        "Observe memory, swap-in/swap-out activity, blocked processes, and CPU state.",
      interpretation:
        "Repeated nonzero si and so values can indicate active swapping. Interpret the measurements alongside latency, memory pressure, and workload activity."
    },
    {
      title: "Search kernel logs for OOM events",
      command:
        "journalctl -k --since '2 hours ago' --no-pager | grep -Ei 'out of memory|oom-kill|killed process|memory cgroup'",
      purpose:
        "Find kernel messages related to OOM events.",
      interpretation:
        "Look for the affected PID, process name, memory usage, and whether a memory cgroup limit was involved. Log availability depends on journal configuration and retention."
    },
    {
      title: "Check kernel ring-buffer messages",
      command: "dmesg -T | grep -Ei 'out of memory|oom-kill|killed process'",
      purpose:
        "Search available kernel messages for OOM-related events.",
      interpretation:
        "Access may require elevated privileges. The ring buffer may not retain older events; use persistent logs or monitoring when available."
    },
    {
      title: "Inspect a process's memory mappings summary",
      command: "cat /proc/<PID>/status",
      purpose:
        "Inspect status counters for a specific process.",
      interpretation:
        "Replace <PID> with the actual process ID. Review VmRSS, VmSize, VmSwap when present, and other relevant fields. Virtual memory size is not the same as physical memory consumption."
    },
    {
      title: "Check systemd service status",
      command: "systemctl status <service-name> --no-pager",
      purpose:
        "Determine whether an affected systemd service is active, failed, or restarting.",
      interpretation:
        "Replace the placeholder with the actual service unit. A running service can still be unhealthy or experiencing memory pressure."
    },
    {
      title: "Check Docker container memory",
      command: "docker stats --no-stream",
      purpose:
        "Inspect current container resource usage when Docker is in use.",
      interpretation:
        "Compare memory usage with configured limits. Confirm the container responsible before changing limits or restarting it."
    }
  ] satisfies OOMCommand[],

  troubleshootingSteps: [
    {
      step: 1,
      title: "Confirm memory pressure",
      objective:
        "Determine whether the host is actually running short of usable memory.",

      commands: [
        "free -h",
        "cat /proc/meminfo",
        "vmstat 1 5"
      ],

      explanation:
        "Check available RAM, swap usage, and repeated swap activity. Compare current readings with a healthy baseline. Low free memory alone does not establish an incident because Linux uses RAM for caches.",

      expectedResult:
        "A clear picture of memory availability and whether active memory pressure is affecting the system."
    },
    {
      step: 2,
      title: "Find the memory-consuming workload",
      objective:
        "Identify processes or containers contributing significantly to memory usage.",

      commands: [
        "ps -eo pid,ppid,user,rss,%mem,%cpu,comm --sort=-rss | head -15",
        "docker stats --no-stream"
      ],

      explanation:
        "Use the Docker command only when Docker is present. Record process identity, owner, resident memory, and trend. Compare repeated observations instead of relying on one snapshot.",

      expectedResult:
        "A candidate process or container to investigate, supported by resource measurements."
    },
    {
      step: 3,
      title: "Confirm whether the OOM killer was invoked",
      objective:
        "Establish whether the kernel terminated a process because of memory pressure.",

      commands: [
        "journalctl -k --since '2 hours ago' --no-pager | grep -Ei 'out of memory|oom-kill|killed process|memory cgroup'",
        "dmesg -T | grep -Ei 'out of memory|oom-kill|killed process'"
      ],

      explanation:
        "Inspect timestamps, process names, PIDs, and any memory cgroup references. An application crash does not automatically mean the kernel OOM killer was responsible. If logs are unavailable, check monitoring, container events, and orchestrator history.",

      expectedResult:
        "Evidence confirming or ruling out a recorded kernel OOM event, subject to available log retention."
    },
    {
      step: 4,
      title: "Determine the scope and root cause",
      objective:
        "Distinguish a host-wide memory shortage from a workload-specific limit.",

      commands: [
        "free -h",
        "cat /proc/<PID>/status",
        "swapon --show",
        "docker stats --no-stream"
      ],

      explanation:
        "Replace <PID> with the identified process ID. Check whether memory growth is continuous, traffic-related, tied to a release, or confined to a container. For Kubernetes, inspect pod status, previous container termination details, resource limits, and events using kubectl.",

      expectedResult:
        "A defensible root-cause hypothesis supported by host, application, and container evidence."
    },
    {
      step: 5,
      title: "Apply safe immediate mitigation",
      objective:
        "Restore service stability while reducing the chance of further disruption.",

      commands: [
        "systemctl status <service-name> --no-pager"
      ],

      explanation:
        "Depending on the cause, options may include reducing incoming workload, pausing an approved non-critical batch job, shifting traffic, rolling back a problematic release, or scaling available capacity. Restart an application only after assessing its impact and preserving diagnostic evidence where possible.",

      expectedResult:
        "Reduced memory pressure and improved service stability without an uncontrolled termination of critical processes."
    },
    {
      step: 6,
      title: "Implement the permanent correction",
      objective:
        "Resolve the underlying memory consumption problem.",

      commands: [],

      explanation:
        "Possible fixes include repairing a memory leak, limiting worker concurrency, optimizing large in-memory data structures, correcting queue growth, tuning application caching, or providing suitable capacity. If the issue is container-specific, review resource requests and limits against actual workload demand and available host capacity.",

      expectedResult:
        "The identified cause is corrected and the fix is tested under a representative workload."
    },
    {
      step: 7,
      title: "Verify recovery",
      objective:
        "Confirm memory and application behavior have returned to acceptable levels.",

      commands: [
        "free -h",
        "vmstat 1 5",
        "systemctl status <service-name> --no-pager"
      ],

      explanation:
        "Compare available memory, swap activity, application health, error rates, and latency against baseline. Confirm that processes are not continuing to grow in memory and that OOM events are not recurring.",

      expectedResult:
        "Sustained recovery, healthy application behavior, and no repeated memory-exhaustion events during the observation period."
    },
    {
      step: 8,
      title: "Add prevention and document the incident",
      objective:
        "Reduce the chance and impact of future memory exhaustion.",

      commands: [],

      explanation:
        "Add memory and OOM monitoring, review capacity planning, test workloads, improve application profiling, and document the incident timeline, verified cause, mitigation, and follow-up owners.",

      expectedResult:
        "A documented incident with actionable monitoring, capacity, and application improvements."
    }
  ] satisfies OOMStep[],

  remediationScenarios: [
    {
      title: "Scenario A: Application memory leak",

      indicators: [
        "Process RSS steadily increases over time.",
        "The issue becomes worse as the application runs longer.",
        "Memory usage temporarily drops after a restart."
      ],

      actions: [
        "Capture memory trends and application diagnostics.",
        "Use the language-specific heap profiler or memory analyzer.",
        "Identify objects, caches, or references retained unexpectedly.",
        "Test the correction under representative load before deployment."
      ],

      warning:
        "Restarting may temporarily restore service but does not prove the leak is fixed."
    },
    {
      title: "Scenario B: Docker container is OOMKilled",

      indicators: [
        "The container stops unexpectedly.",
        "Container inspection or orchestration status indicates an OOM-related termination.",
        "Memory usage approaches the container limit."
      ],

      actions: [
        "Inspect the container's termination state and recent events.",
        "Compare memory usage with the configured limit.",
        "Investigate the application workload and memory trend.",
        "Adjust limits only after checking host capacity and the workload's real requirements."
      ],

      warning:
        "Increasing the container limit can move the failure to the host if sufficient physical memory is unavailable."
    },
    {
      title: "Scenario C: Memory shortage during traffic spikes",

      indicators: [
        "Memory and request volume increase together.",
        "More workers or requests remain active simultaneously.",
        "The issue occurs during peak demand."
      ],

      actions: [
        "Compare request volume, concurrency, and memory metrics.",
        "Inspect worker counts and queue lengths.",
        "Consider approved load shedding, concurrency limits, caching, or horizontal scaling.",
        "Validate downstream capacity and cost before scaling."
      ],

      warning:
        "Adding RAM alone may not fix unbounded queues or a memory leak."
    },
    {
      title: "Scenario D: Linux host has no adequate memory headroom",

      indicators: [
        "Multiple legitimate workloads consume most available memory.",
        "Memory pressure occurs during expected workloads.",
        "Application optimization alone does not provide sufficient headroom."
      ],

      actions: [
        "Measure peak workload requirements.",
        "Review unnecessary services and workload placement.",
        "Evaluate additional RAM or a larger instance using approved capacity planning.",
        "Define memory alerts and a tested recovery procedure."
      ],

      warning:
        "Swap may provide additional allocation headroom but can cause severe latency under pressure. It is not a substitute for fixing memory leaks or insufficient capacity."
    }
  ],

  verificationChecklist: [
    "Available memory has returned to an acceptable range.",
    "Swap activity is understood and not causing unacceptable latency.",
    "The responsible process or container has a known explanation for its memory usage.",
    "No new OOM-killer events are appearing.",
    "Affected services are healthy and customer-facing errors have recovered.",
    "Container memory usage is consistent with its configured limits.",
    "Recovery remains stable throughout the agreed observation period."
  ],

  monitoringRecommendations: [
    {
      metric: "Available system memory",
      purpose:
        "Detect declining memory headroom before applications fail."
    },
    {
      metric: "Process RSS and memory growth",
      purpose:
        "Identify steadily growing processes and possible memory leaks."
    },
    {
      metric: "Swap activity",
      purpose:
        "Detect sustained swapping that may affect performance."
    },
    {
      metric: "Kernel OOM events",
      purpose:
        "Alert when the operating system terminates processes because of memory pressure."
    },
    {
      metric: "Container memory usage and limits",
      purpose:
        "Detect workloads approaching configured memory constraints."
    },
    {
      metric: "Application latency and error rate",
      purpose:
        "Connect resource pressure to actual customer impact."
    }
  ],

  realTimeIncidentExample: {
    title: "Production API crashes during peak traffic",

    timeline: [
      {
        time: "10:00",
        event:
          "Application traffic begins increasing."
      },
      {
        time: "10:05",
        event:
          "Available memory drops and application latency increases."
      },
      {
        time: "10:10",
        event:
          "The engineer checks free -h, process RSS, and kernel logs."
      },
      {
        time: "10:15",
        event:
          "The team finds evidence of OOM-related process termination and investigates application memory growth."
      },
      {
        time: "10:20",
        event:
          "The team applies an approved mitigation based on the confirmed cause."
      },
      {
        time: "10:30",
        event:
          "Memory and application health are monitored while the permanent fix is prepared."
      }
    ],

    rootCause:
      "Illustrative scenario only: the application retains excessive data in memory under peak traffic. The actual cause must be confirmed from production evidence.",

    resolution:
      "Mitigate the immediate impact, identify and correct the memory-growth problem, then verify sustained recovery.",

    lessonsLearned: [
      "Distinguish host memory exhaustion from a container memory-limit failure.",
      "Use kernel logs to verify OOM-killer activity.",
      "Track memory trends rather than relying on one snapshot.",
      "Monitor application health alongside infrastructure metrics."
    ]
  },

  incidentReportTemplate: {
    incidentId: "INC-YYYY-NNNN",
    title: "Linux server memory exhaustion",
    startTime: "Record incident start time and timezone",
    endTime: "Record recovery time and timezone",
    affectedServices: "List affected applications and infrastructure",
    customerImpact: "Describe observed user impact",
    detection: "Alert, monitoring, or manual discovery",
    evidence: "Record memory metrics, logs, and process details",
    rootCause: "Record the verified technical cause",
    mitigation: "Record immediate actions taken",
    permanentFix: "Record the corrective change",
    verification: "Record memory trends and service-health checks",
    prevention: "Record monitoring and capacity improvements",
    followUpOwner: "Assign an accountable owner"
  },

  importantNotes: [
    "Example incidents and timelines are illustrative, not actual production evidence.",
    "Command output varies by distribution, kernel version, runtime, and permissions.",
    "Low free memory alone does not prove memory exhaustion; inspect available memory and workload behavior.",
    "A container can be OOMKilled while the host still has available memory.",
    "Avoid destructive actions until the affected workload and operational impact are understood."
  ]
};

export default linuxOutOfMemory;
