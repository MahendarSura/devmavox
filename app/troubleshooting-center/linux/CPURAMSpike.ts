
export interface CPURAMCommandStep {
  id: string;
  title: string;
  purpose: string;
  commands: string[];
  interpret: string[];
  nextDecision: string[];
  safety: string;
}

export interface CPURAMFailureCase {
  id: string;
  scenario: string;
  symptoms: string[];
  likelyCauses: string[];
  diagnostics: string[];
  interpretation: string[];
  remediation: string[];
  verification: string[];
  prevention: string[];
}

export interface CPURAMProductionIncident {
  id: string;
  title: string;
  severity: string;
  environment: string;
  impact: string[];
  timeline: string[];
  investigation: string[];
  rootCause: string;
  recovery: string[];
  validation: string[];
  followUp: string[];
}

export interface CPURAMSpikeGuide {
  slug: string;
  title: string;
  category: string;
  description: string;
  overview: string[];
  severityMatrix: {
    severity: string;
    criteria: string[];
    response: string;
  }[];
  symptoms: string[];
  safetyChecks: string[];
  diagnosticWorkflow: CPURAMCommandStep[];
  failureCases: CPURAMFailureCase[];
  productionIncidents: CPURAMProductionIncident[];
  recoveryRunbook: string[];
  preventionChecklist: string[];
  monitoring: {
    metric: string;
    investigateWhen: string;
    usefulLabels: string[];
    alertGuidance: string;
  }[];
  ciCdChecks: string[];
  incidentReportTemplate: string[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    expectedLearning: string;
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  references: string[];
}

export const cpuRamSpikeGuide: CPURAMSpikeGuide = {
  slug: "cpu-ram-spike",
  title: "Linux CPU and RAM Spike: Real Production Troubleshooting",
  category: "Linux",
  description:
    "An evidence-driven production runbook for investigating CPU saturation, memory pressure, swap activity, OOM kills, application latency, container resource limits, and unexpected Linux host utilization.",

  overview: [
    "CPU utilization measures how much processing capacity is being consumed. High CPU is not automatically a fault: the important questions are whether the workload is expected, whether latency is affected, and whether capacity is sufficient.",
    "RAM pressure occurs when applications and the kernel compete for physical memory. Linux uses free memory for caches, so low free memory alone does not prove a memory incident. Check MemAvailable, swap activity, reclaim behavior, OOM events, and application-level memory.",
    "Load average is not the same as CPU utilization. It includes runnable tasks and tasks in uninterruptible sleep, commonly associated with I/O waits. Interpret it alongside CPU count, per-core utilization, I/O metrics, and task states.",
    "A CPU or RAM spike may be the primary failure or a symptom of another problem, such as a retry storm, slow database, traffic surge, runaway logging, deployment regression, memory leak, or a container limit.",
    "The goal is not simply to reduce utilization. It is to identify the workload responsible, establish the causal mechanism, restore service safely, and prevent recurrence.",
    "Capture evidence before restarting or killing processes whenever possible. A restart can temporarily hide a leak or runaway process and destroy useful diagnostic evidence.",
    "Use the commands in this guide on the affected host or the appropriate container/VM. Some commands require root privileges or optional tools such as sysstat, procps, lsof, perf, and cgroup inspection utilities."
  ],

  severityMatrix: [
    {
      severity: "SEV-1 / Critical",
      criteria: [
        "Customer-facing service is unavailable or broadly failing.",
        "Multiple production nodes are saturated or repeatedly being OOM-killed.",
        "Critical workloads are failing and there is no healthy capacity."
      ],
      response:
        "Declare the incident, engage the on-call team, preserve evidence, stabilize customer impact using the approved incident procedure, and communicate status. Do not run broad destructive commands."
    },
    {
      severity: "SEV-2 / High",
      criteria: [
        "Severe latency or elevated 5xx errors.",
        "One critical production node is repeatedly hitting resource limits.",
        "Deployments, workers, or scheduled jobs are falling behind."
      ],
      response:
        "Investigate the affected service and host together. Consider approved traffic shifting, scaling, or rollback after confirming capacity and change safety."
    },
    {
      severity: "SEV-3 / Medium",
      criteria: [
        "Intermittent CPU or memory spikes with limited user impact.",
        "Background jobs are delayed but the service remains available.",
        "A recurring resource trend is approaching a known limit."
      ],
      response:
        "Collect time-series evidence, identify the responsible workload, create a tracked remediation, and add monitoring if the risk is not already covered."
    },
    {
      severity: "SEV-4 / Low",
      criteria: [
        "Short, expected utilization spikes without degraded service.",
        "A non-production workload temporarily consumes more resources than usual."
      ],
      response:
        "Verify that the workload is expected and bounded. Record the baseline and investigate if the pattern is new or capacity headroom is shrinking."
    }
  ],

  symptoms: [
    "Linux host CPU remains near 100% and application requests become slow.",
    "Load average rises sharply after a deployment, scheduled task, or traffic increase.",
    "SSH sessions become slow, commands take longer than usual, or monitoring agents stop responding.",
    "The host has little available memory and swap-in/swap-out activity increases.",
    "A process's resident memory grows continuously over hours or days.",
    "The kernel logs an out-of-memory event and kills a process.",
    "A container restarts repeatedly with an OOMKilled reason.",
    "A JVM, Node.js process, Python worker, database, or monitoring agent suddenly consumes excessive resources.",
    "CPU is not fully utilized, but load average is high and tasks are blocked on storage or another resource.",
    "A node appears healthy at the host level, but one container is throttled by its CPU quota.",
    "The spike occurs at a predictable time, suggesting cron, backup, log rotation, indexing, batch jobs, or a scheduled scan.",
    "CPU and memory rise together after request latency increases, possibly because of retries, queued work, or a growing backlog."
  ],

  safetyChecks: [
    "Confirm the exact host, instance ID, hostname, cluster, namespace, environment, and affected service before making changes.",
    "Confirm whether this is production, staging, or development. Never assume the shell is connected to the intended host.",
    "Check whether an incident, deployment, scaling event, traffic change, batch job, backup, or maintenance window is active.",
    "Identify the service owner and follow the incident severity, approval, change-management, and communication process.",
    "Prefer read-only evidence collection first. Commands such as top, ps, free, vmstat, uptime, journalctl, and systemctl status are usually non-disruptive.",
    "Do not run kill -9, reboot, systemctl restart, drop_caches, swapoff, or bulk process termination merely because CPU or memory is high.",
    "Before restarting a service, determine whether it is stateful, whether it has in-flight work, whether it participates in a quorum, and whether a restart could cause data loss or an outage.",
    "Before scaling out, verify that downstream databases, queues, network capacity, licenses, and rate limits can handle additional load.",
    "Avoid collecting secrets, customer payloads, environment-variable contents, or unrestricted process command lines into public tickets. Redact sensitive data.",
    "Capture timestamps and use UTC or a clearly documented timezone when correlating host logs, application logs, dashboards, and deployment events.",
    "If the host is severely unstable, prioritize approved service restoration. Capture the minimum useful evidence that can be safely collected without delaying recovery."
  ],

  diagnosticWorkflow: [
    {
      id: "step-01",
      title: "Establish the incident boundary and timeline",
      purpose:
        "Determine what is affected, when it started, and whether the spike correlates with a change.",
      commands: [
        "date -Is",
        "hostnamectl",
        "uptime",
        "who -b",
        "last -x | head -20",
        "systemctl --failed",
        "journalctl --since '-30 min' --no-pager | tail -200"
      ],
      interpret: [
        "Record the host identity, current time, uptime, recent reboot history, and failed systemd units.",
        "Compare the first abnormal metric timestamp with deployment, traffic, configuration, scheduled-task, and infrastructure-change timestamps.",
        "A recent reboot does not prove the incident is resolved. Check whether the workload has restarted and whether the original cause remains."
      ],
      nextDecision: [
        "If many hosts are affected at the same time, investigate shared deployments, traffic, dependencies, and infrastructure.",
        "If one host is affected, compare it with a healthy peer running the same workload.",
        "If the issue began immediately after a release, preserve the release identifier and investigate the changed code, configuration, traffic, and resource limits."
      ],
      safety:
        "Do not reboot or restart services simply to clear the symptoms before establishing the incident scope."
    },
    {
      id: "step-02",
      title: "Determine whether CPU, memory, or another resource is the bottleneck",
      purpose:
        "Separate CPU saturation, memory pressure, I/O wait, blocked tasks, and a load-only increase.",
      commands: [
        "uptime",
        "nproc",
        "lscpu",
        "free -h",
        "vmstat 1 10",
        "cat /proc/pressure/cpu",
        "cat /proc/pressure/memory",
        "cat /proc/pressure/io",
        "df -h"
      ],
      interpret: [
        "Compare load average with the number of available CPUs and with historical host-specific baselines. A load average greater than CPU count is a signal to investigate, not a universal failure threshold.",
        "In vmstat, the r column indicates runnable tasks and b indicates blocked tasks. Sustained si and so values indicate swap activity; the wa column helps identify I/O wait.",
        "Use MemAvailable rather than the free column alone to estimate memory available without swapping.",
        "Pressure Stall Information (PSI) reports time tasks are stalled because of CPU, memory, or I/O contention. Sustained pressure can be more informative than utilization alone.",
        "A high load average with moderate CPU utilization may indicate blocked I/O or other tasks that cannot make progress."
      ],
      nextDecision: [
        "If CPU utilization is sustained and CPU pressure is elevated, inspect processes and threads.",
        "If MemAvailable is falling and memory pressure or swap activity rises, inspect process RSS, cgroups, and kernel OOM events.",
        "If I/O pressure and blocked tasks dominate, inspect storage latency, filesystem capacity, and device-level metrics.",
        "If host metrics look normal but an application is slow, inspect network, dependency latency, connection pools, and application queues."
      ],
      safety:
        "Use repeated samples. A single vmstat or free snapshot may miss a transient spike or misrepresent a rapidly changing incident."
    },
    {
      id: "step-03",
      title: "Identify the CPU-consuming process",
      purpose:
        "Find the processes responsible for CPU consumption and distinguish a real workload from a short-lived spike.",
      commands: [
        "top",
        "ps -eo pid,ppid,user,stat,ni,psr,pcpu,pmem,rss,etime,comm --sort=-pcpu | head -25",
        "ps -eo pid,ppid,user,stat,pcpu,pmem,etime,args --sort=-pcpu | head -25",
        "pidstat -u 1 10",
        "mpstat -P ALL 1 5"
      ],
      interpret: [
        "In top, press P to sort by CPU and inspect whether one process or many processes dominate.",
        "Compare repeated samples and elapsed time. A short compiler burst is different from one process consuming a core continuously for hours.",
        "Use mpstat to check whether all cores are busy or one core is saturated by a single-threaded workload.",
        "The process-level %CPU display can exceed 100% on multicore systems depending on the tool's convention. Understand the tool's units before comparing values.",
        "If the top process is a runtime such as java, node, python, or a database, correlate it with the application's own thread, request, query, or worker metrics."
      ],
      nextDecision: [
        "If one application process dominates, inspect its threads, logs, recent changes, and workload.",
        "If many workers consume CPU, investigate traffic volume, concurrency, queue backlog, and autoscaling.",
        "If a kernel thread or softirq dominates, investigate kernel activity, interrupts, networking, drivers, and recent kernel or infrastructure changes.",
        "If the process exits before it can be sampled, use historical monitoring, process accounting, or approved short-interval telemetry."
      ],
      safety:
        "Do not kill a process just because it appears at the top of the list. Identify its owner, role, and customer impact first."
    },
    {
      id: "step-04",
      title: "Investigate CPU saturation, run queues, and throttling",
      purpose:
        "Determine whether the workload needs more CPU, has inefficient execution, or is constrained by a quota.",
      commands: [
        "mpstat -P ALL 1 10",
        "pidstat -u -t -p <PID> 1 10",
        "ps -L -p <PID> -o pid,tid,psr,stat,pcpu,comm --sort=-pcpu | head -25",
        "cat /proc/<PID>/status",
        "cat /proc/<PID>/cgroup",
        "cat /proc/pressure/cpu"
      ],
      interpret: [
        "Sustained high user CPU can indicate application computation, inefficient algorithms, serialization, compression, encryption, or excessive request processing.",
        "High system CPU can indicate kernel work, system calls, networking, filesystem activity, or memory-management overhead.",
        "High iowait means the CPU is waiting on I/O; it does not mean that the application itself is necessarily CPU-bound.",
        "High steal time in virtualized environments can indicate the hypervisor is not giving the VM the CPU time it expects.",
        "A single hot thread may limit throughput even when other cores are mostly idle.",
        "In containers, CPU throttling can create latency even when the host has unused CPU capacity."
      ],
      nextDecision: [
        "For a hot thread, inspect application profiling and thread dumps using runtime-specific, approved procedures.",
        "For high system CPU, inspect kernel/network/filesystem evidence before changing application concurrency.",
        "For virtual-machine steal time, compare host or instance metrics and investigate provider-side contention.",
        "For container throttling, inspect CPU limits, throttled periods, and request/limit configuration."
      ],
      safety:
        "Profilers, tracing, and thread dumps can add overhead or expose sensitive information. Use approved sampling settings and protect collected artifacts."
    },
    {
      id: "step-05",
      title: "Identify memory-heavy processes",
      purpose:
        "Find which processes consume physical memory and determine whether the growth is sustained.",
      commands: [
        "free -h",
        "ps -eo pid,ppid,user,stat,rss,vsz,%mem,etime,comm --sort=-rss | head -25",
        "ps -eo pid,ppid,user,stat,rss,vsz,%mem,etime,args --sort=-rss | head -25",
        "vmstat 1 10",
        "cat /proc/meminfo",
        "cat /proc/pressure/memory"
      ],
      interpret: [
        "RSS is resident physical memory currently mapped into a process. VSZ is virtual address space and should not be interpreted as physical RAM consumption.",
        "RSS can double-count shared pages across processes, so summing process RSS does not necessarily equal total system memory use.",
        "Cache and buffers are normal Linux behavior. Low free memory with healthy MemAvailable and no sustained pressure may be expected.",
        "A process with steadily growing RSS across equivalent workload periods may have a leak, unbounded cache, growing queue, or increasing working set.",
        "Memory pressure can trigger reclaim, swapping, latency, and OOM termination before the host appears to have zero free memory."
      ],
      nextDecision: [
        "If one process is responsible, investigate its heap, native memory, caches, buffers, and workload size.",
        "If many processes grow, check for duplicated workers, a deployment that increased replica count, or a system-wide workload increase.",
        "If process RSS is modest but system memory is exhausted, inspect kernel memory, shared memory, page cache, slab usage, and cgroup accounting.",
        "If memory pressure occurs only inside a container, compare container limits and cgroup memory counters with host-level totals."
      ],
      safety:
        "Do not assume that clearing the page cache or disabling swap is a safe fix. Those actions can worsen performance or trigger OOM failures."
    },
    {
      id: "step-06",
      title: "Investigate swap activity and memory reclaim",
      purpose:
        "Establish whether memory pressure is causing swapping, reclaim stalls, or application latency.",
      commands: [
        "swapon --show",
        "grep -E 'MemAvailable|SwapTotal|SwapFree|Dirty|Writeback|Slab|SReclaimable|SUnreclaim|PageTables|Committed_AS' /proc/meminfo",
        "vmstat 1 15",
        "sar -W 1 10",
        "cat /proc/pressure/memory"
      ],
      interpret: [
        "Swap being allocated does not automatically indicate a current incident. Determine whether swap-in/swap-out activity is sustained and correlated with latency.",
        "A growing unreclaimable slab or kernel memory footprint can indicate a system-level issue rather than a conventional application heap leak.",
        "Dirty pages and writeback may contribute to memory pressure when storage cannot flush data quickly enough.",
        "Sustained memory PSI indicates tasks are losing time to memory contention and reclaim."
      ],
      nextDecision: [
        "If swap activity is sustained, identify the memory consumers and assess whether capacity or application behavior changed.",
        "If kernel memory is unusually high, inspect slab statistics and relevant kernel metrics using approved diagnostics.",
        "If the host is under severe memory pressure, prioritize service protection and approved capacity or workload reduction over speculative tuning."
      ],
      safety:
        "Do not run swapoff on a pressured production host without capacity analysis and an approved recovery plan. Moving swapped pages back into RAM can itself cause an OOM event."
    },
    {
      id: "step-07",
      title: "Correlate OOM events with process and service restarts",
      purpose:
        "Find whether the kernel or a cgroup terminated a workload due to memory pressure.",
      commands: [
        "journalctl -k --since '-2 hours' --no-pager | grep -Ei 'out of memory|oom|killed process|memory cgroup'",
        "dmesg -T | grep -Ei 'out of memory|oom|killed process|memory cgroup' | tail -100",
        "systemctl status <service> --no-pager",
        "journalctl -u <service> --since '-2 hours' --no-pager",
        "systemctl show <service> -p NRestarts -p MemoryCurrent -p MemoryPeak -p MemoryMax"
      ],
      interpret: [
        "An OOM record can identify the killed process and may include memory statistics, but the victim is not necessarily the original cause of system-wide pressure.",
        "Distinguish a host-wide OOM from a cgroup or container-level OOM. A container can hit its own memory limit while the host still has available memory.",
        "Correlate OOM timestamps with service restarts, deployment changes, traffic increases, and memory growth.",
        "If the system has rebooted, previous kernel logs may no longer be available locally unless persistent journaling or remote logging is configured."
      ],
      nextDecision: [
        "If the host experienced global OOM, identify all major memory consumers and evaluate host capacity.",
        "If a container exceeded its limit, compare actual working set and peak usage with the configured limit and workload requirements.",
        "If a systemd service is repeatedly restarting, inspect restart policy, failure reason, and whether the restart loop increases load."
      ],
      safety:
        "Do not blindly increase a memory limit or restart a repeatedly OOM-killed service. Confirm that the host and downstream dependencies have enough capacity."
    },
    {
      id: "step-08",
      title: "Inspect systemd service resource controls",
      purpose:
        "Determine whether a service has explicit memory or CPU limits and whether restart behavior is contributing to the incident.",
      commands: [
        "systemctl status <service> --no-pager",
        "systemctl cat <service>",
        "systemctl show <service> -p CPUQuotaPerSecUSec -p CPUWeight -p MemoryHigh -p MemoryMax -p TasksMax -p Restart -p NRestarts",
        "systemd-cgtop",
        "systemd-cgls"
      ],
      interpret: [
        "CPUQuota, MemoryHigh, MemoryMax, and TasksMax can constrain a service even when the host has spare capacity.",
        "A low limit may be intentional isolation. Do not change it without checking the capacity plan and service owner expectations.",
        "An aggressive restart policy can cause repeated initialization, cache warming, dependency load, and alert noise.",
        "A systemd property may be unset or reported differently depending on systemd version. Check the effective unit configuration and cgroup counters."
      ],
      nextDecision: [
        "If limits are responsible, propose a limit adjustment supported by measured peak usage and host capacity.",
        "If a restart loop exists, determine the original exit reason and fix it rather than masking it by changing restart behavior.",
        "If systemd controls appear normal, continue to container, application, or host-level investigation."
      ],
      safety:
        "Do not edit production unit files or apply daemon-reload/restart operations without following the change process."
    },
    {
      id: "step-09",
      title: "Investigate container CPU and memory limits",
      purpose:
        "Separate host resource exhaustion from container resource constraints.",
      commands: [
        "docker stats --no-stream",
        "docker inspect <container>",
        "docker inspect -f '{{.State.OOMKilled}} {{.State.ExitCode}} {{.RestartCount}}' <container>",
        "docker logs --since 30m <container>",
        "cat /proc/<PID>/cgroup",
        "kubectl top pod -n <namespace>",
        "kubectl describe pod <pod> -n <namespace>",
        "kubectl get pod <pod> -n <namespace> -o yaml"
      ],
      interpret: [
        "Docker stats and Kubernetes metrics are useful snapshots but depend on the runtime and metrics pipeline. Confirm suspected spikes with repeated samples or historical telemetry.",
        "A container's memory limit can trigger OOM termination independently of host-wide memory exhaustion.",
        "CPU limits can throttle a container. Check cgroup throttling counters or Kubernetes/container metrics if available.",
        "Kubernetes requests affect scheduling and resource guarantees; limits constrain consumption. A pod can be throttled or OOM-killed even if the node appears healthy.",
        "kubectl top requires a functioning metrics pipeline and may not capture a short transient spike."
      ],
      nextDecision: [
        "If one pod is affected, compare it with peer replicas, recent pod changes, and per-container metrics.",
        "If all replicas are affected, investigate common application changes, traffic, dependencies, and shared resource limits.",
        "If a node is under pressure, inspect other workloads on that node and consider approved rescheduling or capacity changes."
      ],
      safety:
        "Do not delete all pods or raise every container limit. Preserve pod descriptions and previous-container logs before changing the workload."
    },
    {
      id: "step-10",
      title: "Check disk I/O, filesystem capacity, and blocked tasks",
      purpose:
        "Determine whether storage latency or a full filesystem is creating high load or indirect memory/CPU pressure.",
      commands: [
        "iostat -xz 1 10",
        "pidstat -d 1 10",
        "df -hT",
        "df -i",
        "findmnt",
        "ps -eo pid,stat,wchan:32,comm --sort=stat | head -40",
        "cat /proc/pressure/io"
      ],
      interpret: [
        "Use iostat latency, queue depth, utilization, and throughput together. Device utilization alone is not a universal indicator of storage saturation, especially on modern or virtualized storage.",
        "A filesystem can fail writes because it is out of space or inodes even when CPU and RAM are not the primary problem.",
        "Tasks in D state are in uninterruptible sleep, commonly associated with I/O. A large number of such tasks warrants investigation of storage, mounts, or kernel waits.",
        "High I/O wait and memory pressure can occur together when dirty-page writeback or reclaim is delayed."
      ],
      nextDecision: [
        "If one device is slow, compare cloud disk metrics, storage latency, throughput, and queue limits.",
        "If disk space or inodes are exhausted, identify the responsible files safely before removing anything.",
        "If blocked tasks dominate, collect process and storage evidence and involve the platform/storage team when necessary."
      ],
      safety:
        "Do not delete logs, database files, or persistent volumes just to free space. Identify ownership, retention requirements, and recovery implications first."
    },
    {
      id: "step-11",
      title: "Check scheduled jobs, retry storms, and workload changes",
      purpose:
        "Determine whether a spike is driven by a scheduled task, increased traffic, duplicated workers, or repeated failures.",
      commands: [
        "systemctl list-timers --all",
        "journalctl --since '-2 hours' --no-pager | grep -Ei 'cron|backup|rotate|failed|retry|timeout|oom'",
        "ps -eo pid,ppid,user,pcpu,pmem,etime,comm --sort=-pcpu | head -30",
        "ss -s",
        "journalctl -u <service> --since '-30 min' --no-pager"
      ],
      interpret: [
        "A backup, compression job, index rebuild, security scan, or log-processing task may create a predictable spike.",
        "A downstream outage can cause retry storms, increased concurrent work, queue growth, and additional CPU/RAM consumption.",
        "A rise in worker count can multiply memory usage even if each worker's footprint is unchanged.",
        "A sudden increase in open connections, queue depth, or request rate may explain why a previously healthy workload now saturates the host."
      ],
      nextDecision: [
        "If a scheduled job is responsible, validate whether it is expected and coordinate any rescheduling or throttling with its owner.",
        "If retries dominate, fix retry limits, backoff, timeout configuration, or dependency health rather than simply adding CPU.",
        "If traffic increased, compare request rate and concurrency with capacity and scaling policies."
      ],
      safety:
        "Do not disable cron, scheduled backups, or security tasks globally without confirming their operational requirements."
    },
    {
      id: "step-12",
      title: "Capture application-specific evidence",
      purpose:
        "Connect host-level resource consumption to the runtime, request path, thread, heap, query, or queue responsible.",
      commands: [
        "journalctl -u <service> --since '-30 min' --no-pager",
        "systemctl show <service> -p MainPID -p ActiveState -p SubState",
        "ps -L -p <PID> -o pid,tid,stat,pcpu,comm --sort=-pcpu | head -25",
        "cat /proc/<PID>/status",
        "cat /proc/<PID>/smaps_rollup",
        "ss -tpn"
      ],
      interpret: [
        "For JVM applications, correlate heap used, garbage-collection time, thread count, native memory, and thread dumps.",
        "For Node.js, inspect heap usage, event-loop delay, worker count, and heap snapshots using the team's approved diagnostic procedure.",
        "For Python, inspect worker count, queue size, allocation trends, and approved profiling output.",
        "For databases, correlate CPU and memory with query latency, connection count, cache behavior, locks, and execution plans.",
        "For network services, investigate connection churn, retries, timeouts, and downstream latency.",
        "A process can have stable heap usage but growing native memory or RSS. Heap-only metrics do not explain every memory incident."
      ],
      nextDecision: [
        "If a specific code path or request is responsible, correlate it with release and request-level telemetry.",
        "If a memory leak is suspected, compare repeated heap or allocation profiles over time under comparable workload.",
        "If application metrics do not explain the host usage, inspect native libraries, kernel resources, sidecars, and other processes."
      ],
      safety:
        "Heap dumps, core dumps, process maps, and thread dumps may contain credentials or customer data. Store them only in approved, access-controlled locations."
    },
    {
      id: "step-13",
      title: "Compare with a healthy peer and recent release",
      purpose:
        "Avoid treating correlation as causation and isolate host-specific versus release-wide failures.",
      commands: [
        "uname -a",
        "cat /etc/os-release",
        "systemctl show <service> -p FragmentPath -p ExecMainStartTimestamp",
        "journalctl -u <service> --since '-4 hours' --no-pager",
        "git log -10 --oneline",
        "git diff <known-good-revision>..<candidate-revision> --"
      ],
      interpret: [
        "Compare equivalent workload, traffic, process count, configuration, runtime version, resource limits, and instance type.",
        "If only one node is affected, investigate local drift, noisy neighbors, a bad process, disk issues, or different configuration.",
        "If all nodes become unhealthy after one release, prioritize shared code, configuration, dependency, and traffic changes.",
        "Git commands are meaningful only in the correct repository and working directory. Production hosts may not contain the deployment repository."
      ],
      nextDecision: [
        "If the release is the strongest supported cause, assess rollback against the last known-good version and current data/schema compatibility.",
        "If the host is an outlier, investigate its local state and replace or repair it only under the infrastructure recovery procedure.",
        "If the cause remains unclear, keep the incident open and gather targeted evidence instead of declaring a speculative root cause."
      ],
      safety:
        "Do not run git reset, checkout, or deployment commands on production systems as a diagnostic shortcut."
    },
    {
      id: "step-14",
      title: "Apply a controlled mitigation and verify recovery",
      purpose:
        "Restore service using the least risky action supported by evidence.",
      commands: [
        "date -Is",
        "uptime",
        "free -h",
        "vmstat 1 5",
        "systemctl status <service> --no-pager",
        "journalctl -u <service> --since '-10 min' --no-pager"
      ],
      interpret: [
        "Use the same metrics and time window used to establish the incident so that before/after comparisons are meaningful.",
        "A lower CPU number does not prove recovery if request failures, queue backlog, or latency remain elevated.",
        "A restart may temporarily reduce RSS but does not prove that the underlying leak or workload problem is fixed.",
        "Validate healthy replicas, successful requests, error rates, dependency behavior, queue drain rate, and resource headroom."
      ],
      nextDecision: [
        "If the mitigation improves customer metrics and resource behavior, continue monitoring through a representative workload period.",
        "If the symptom returns, stop repeating the same restart and investigate the unresolved cause.",
        "If the mitigation worsens the service, execute the approved rollback or recovery plan and communicate the impact."
      ],
      safety:
        "Use approved deployment, scaling, restart, and rollback procedures. Ensure an owner is monitoring service health during the change."
    }
  ],

  failureCases: [
    {
      id: "case-01",
      scenario: "CPU stays near saturation on a Linux VM",
      symptoms: [
        "High CPU for several minutes.",
        "Request latency and queue depth increase.",
        "One process dominates top output."
      ],
      likelyCauses: [
        "Runaway loop or inefficient code.",
        "Unexpected traffic or batch processing.",
        "Excessive concurrency or retry storm.",
        "Single-thread bottleneck."
      ],
      diagnostics: [
        "top",
        "pidstat -u 1 10",
        "ps -eo pid,ppid,pcpu,pmem,etime,comm --sort=-pcpu | head -20",
        "pidstat -u -t -p <PID> 1 10"
      ],
      interpretation: [
        "Confirm that the same process remains hot across samples.",
        "Compare request rate, worker count, and latency with the normal baseline.",
        "Check whether the hottest thread maps to a known application workload."
      ],
      remediation: [
        "Apply an approved traffic limit or concurrency reduction if overload is established.",
        "Roll back a confirmed regression using the deployment team's procedure.",
        "Optimize the responsible code path or scale only after validating dependency capacity."
      ],
      verification: [
        "CPU and CPU pressure return toward baseline.",
        "Latency, error rate, and backlog improve.",
        "The same workload no longer reproduces sustained saturation."
      ],
      prevention: [
        "Add request-rate and concurrency dashboards.",
        "Add CPU saturation and latency alerts.",
        "Load-test the changed code path and define rollback criteria."
      ]
    },
    {
      id: "case-02",
      scenario: "RAM steadily grows until the process is OOM-killed",
      symptoms: [
        "Process RSS rises over time.",
        "MemAvailable falls.",
        "Kernel logs show an OOM event."
      ],
      likelyCauses: [
        "Memory leak.",
        "Unbounded cache or queue.",
        "Increasing concurrency.",
        "Native memory growth.",
        "Insufficient memory limit."
      ],
      diagnostics: [
        "free -h",
        "ps -eo pid,rss,vsz,%mem,etime,comm --sort=-rss | head -25",
        "cat /proc/<PID>/smaps_rollup",
        "journalctl -k --since '-2 hours' --no-pager | grep -Ei 'oom|killed process|out of memory'",
        "cat /proc/pressure/memory"
      ],
      interpretation: [
        "Establish whether RSS growth is sustained under comparable workload.",
        "Check whether the OOM was host-wide or constrained to a container/cgroup.",
        "Correlate memory growth with request count, cache size, queue length, and release time."
      ],
      remediation: [
        "Reduce workload or concurrency using the approved service controls if safe.",
        "Apply a validated rollback if a recent release introduced the regression.",
        "Increase capacity or a resource limit only after verifying host headroom and expected working-set requirements.",
        "Fix the leak or bound the cache/queue; treat a restart as temporary mitigation, not proof of resolution."
      ],
      verification: [
        "RSS remains bounded under representative load.",
        "OOM events stop and memory pressure declines.",
        "The service maintains healthy latency and throughput."
      ],
      prevention: [
        "Track process RSS, working set, OOM events, and memory growth rate.",
        "Add load tests that run long enough to expose leaks.",
        "Set realistic memory requests and limits with measured headroom."
      ]
    },
    {
      id: "case-03",
      scenario: "High load average but moderate CPU usage",
      symptoms: [
        "Load average rises.",
        "CPU utilization is not consistently saturated.",
        "Many tasks are blocked or in D state."
      ],
      likelyCauses: [
        "Slow storage.",
        "Network filesystem or mount stall.",
        "Kernel wait or device latency.",
        "Tasks blocked on an external resource."
      ],
      diagnostics: [
        "vmstat 1 10",
        "iostat -xz 1 10",
        "ps -eo pid,stat,wchan:32,comm | grep ' D '",
        "cat /proc/pressure/io",
        "journalctl -k --since '-30 min' --no-pager"
      ],
      interpretation: [
        "Compare blocked-task counts with storage latency and I/O pressure.",
        "Inspect mount, disk, and kernel errors.",
        "Do not assume that adding CPU will resolve a storage bottleneck."
      ],
      remediation: [
        "Follow the storage or platform team's recovery process for the failing device or mount.",
        "Reduce nonessential I/O workload if the workload owner approves it.",
        "Restore storage service and validate blocked work drains safely."
      ],
      verification: [
        "Blocked-task count and I/O pressure decline.",
        "Load average trends downward over time.",
        "Application latency and queue depth recover."
      ],
      prevention: [
        "Monitor disk latency, queue depth, filesystem capacity, and I/O PSI.",
        "Set alerts for sustained blocked tasks and storage errors.",
        "Test storage failure and recovery behavior where appropriate."
      ]
    },
    {
      id: "case-04",
      scenario: "Container is CPU-throttled while host CPU looks healthy",
      symptoms: [
        "One container has high request latency.",
        "Host CPU utilization is moderate.",
        "Container CPU usage reaches its quota."
      ],
      likelyCauses: [
        "CPU limit too low for burst workload.",
        "Concurrency increased without limit review.",
        "CPU-heavy release or inefficient worker.",
        "Quota configuration differs between environments."
      ],
      diagnostics: [
        "docker stats --no-stream",
        "docker inspect <container>",
        "kubectl top pod <pod> -n <namespace>",
        "kubectl describe pod <pod> -n <namespace>",
        "cat /proc/<PID>/cgroup"
      ],
      interpretation: [
        "Inspect configured CPU quota and observed throttling counters where available.",
        "Compare requests, limits, replica count, and workload with a healthy peer.",
        "Check whether the host has enough allocatable CPU before proposing higher limits."
      ],
      remediation: [
        "Tune the CPU limit based on measured demand and capacity.",
        "Scale replicas only after confirming scheduler capacity and downstream safety.",
        "Optimize CPU-heavy code or reduce excessive concurrency where appropriate."
      ],
      verification: [
        "Throttling falls and latency improves.",
        "Node CPU headroom remains healthy.",
        "No new contention is introduced for neighboring workloads."
      ],
      prevention: [
        "Track throttled time, latency, CPU requests, and limits.",
        "Load-test representative bursts.",
        "Review resource limits during application changes."
      ]
    },
    {
      id: "case-05",
      scenario: "A service restart loop causes repeated resource spikes",
      symptoms: [
        "Service restarts repeatedly.",
        "CPU spikes during initialization.",
        "Requests fail or readiness never stabilizes."
      ],
      likelyCauses: [
        "Startup configuration failure.",
        "Dependency unavailable.",
        "Health check mismatch.",
        "Memory exhaustion.",
        "Restart policy amplifies repeated initialization."
      ],
      diagnostics: [
        "systemctl status <service> --no-pager",
        "systemctl show <service> -p NRestarts -p Restart -p ExecMainStatus",
        "journalctl -u <service> --since '-30 min' --no-pager",
        "systemctl cat <service>"
      ],
      interpretation: [
        "Find the first failure in each restart cycle, not only the final systemd message.",
        "Compare startup logs with dependency health and resource usage.",
        "Determine whether initialization work is repeated because the service never becomes healthy."
      ],
      remediation: [
        "Fix the startup error or dependency condition.",
        "Adjust health checks and restart behavior only when the current policy is demonstrably inappropriate.",
        "Use an approved rollback if the issue began with a release."
      ],
      verification: [
        "Restart count stabilizes.",
        "The service reaches healthy state and remains healthy.",
        "Initialization-related CPU and memory spikes return to expected levels."
      ],
      prevention: [
        "Alert on restart-rate increases.",
        "Test startup failure and dependency-unavailable scenarios.",
        "Make health checks reflect real readiness and dependency requirements."
      ]
    },
    {
      id: "case-06",
      scenario: "A scheduled task causes predictable CPU and RAM spikes",
      symptoms: [
        "Spikes occur at a consistent time.",
        "A batch, backup, scan, or compression process becomes active.",
        "Interactive services slow during the job."
      ],
      likelyCauses: [
        "Scheduled jobs overlap.",
        "Batch concurrency is excessive.",
        "Backup or compression is resource-intensive.",
        "Traffic peaks overlap with maintenance work."
      ],
      diagnostics: [
        "systemctl list-timers --all",
        "ps -eo pid,ppid,pcpu,pmem,etime,comm --sort=-pcpu | head -25",
        "journalctl --since '-2 hours' --no-pager",
        "vmstat 1 10",
        "iostat -xz 1 10"
      ],
      interpretation: [
        "Correlate job start times with host metrics and service latency.",
        "Check whether multiple scheduled jobs overlap or run longer than their interval.",
        "Determine whether the workload is expected and whether it has exceeded historical resource demand."
      ],
      remediation: [
        "Coordinate rescheduling or staggering jobs with their owners.",
        "Use approved job concurrency limits or resource controls.",
        "Preserve mandatory backup and security coverage while reducing unnecessary contention."
      ],
      verification: [
        "The scheduled task completes successfully.",
        "Interactive workload latency stays within target.",
        "Resource spikes remain within agreed capacity limits."
      ],
      prevention: [
        "Maintain a schedule inventory.",
        "Monitor job duration, resource usage, and overlap.",
        "Test batch workload against production-like traffic."
      ]
    },
    {
      id: "case-07",
      scenario: "Kernel or networking activity consumes excessive CPU",
      symptoms: [
        "System CPU or softirq activity rises.",
        "Application process CPU does not explain total usage.",
        "Network throughput or packet rate changes sharply."
      ],
      likelyCauses: [
        "High packet rate or connection churn.",
        "Interrupt imbalance.",
        "Kernel regression or driver issue.",
        "Excessive context switching."
      ],
      diagnostics: [
        "mpstat -P ALL 1 10",
        "cat /proc/softirqs",
        "cat /proc/interrupts",
        "sar -n DEV 1 10",
        "ss -s",
        "journalctl -k --since '-30 min' --no-pager"
      ],
      interpretation: [
        "Compare per-CPU system and softirq behavior with packet rate and network metrics.",
        "Check whether a single CPU handles disproportionate interrupt work.",
        "Correlate the spike with network configuration, traffic changes, or kernel/driver changes."
      ],
      remediation: [
        "Involve the platform/network team when kernel or interrupt behavior is suspected.",
        "Apply only tested and approved driver, kernel, or network configuration changes.",
        "Use traffic controls only when the traffic source and customer impact are understood."
      ],
      verification: [
        "System CPU and softirq activity return toward baseline.",
        "Network throughput and packet processing remain healthy.",
        "Application latency and errors recover."
      ],
      prevention: [
        "Monitor system CPU, packet rates, errors, drops, and per-core utilization.",
        "Test kernel and network changes in a representative environment.",
        "Maintain a rollback plan for host-level changes."
      ]
    },
    {
      id: "case-08",
      scenario: "Host has low free RAM but no visible application failure",
      symptoms: [
        "The free column is small.",
        "Cached memory is large.",
        "MemAvailable and application performance may remain healthy."
      ],
      likelyCauses: [
        "Normal filesystem page cache.",
        "Kernel cache usage.",
        "Expected memory utilization."
      ],
      diagnostics: [
        "free -h",
        "grep -E 'MemAvailable|Cached|Buffers|SReclaimable|SUnreclaim' /proc/meminfo",
        "cat /proc/pressure/memory",
        "vmstat 1 10"
      ],
      interpretation: [
        "Linux uses otherwise idle memory for caches that can often be reclaimed.",
        "Low free memory alone does not prove a leak or an OOM emergency.",
        "Check MemAvailable, sustained swap activity, memory PSI, and workload latency before declaring a problem."
      ],
      remediation: [
        "Do not clear caches just to increase the free-memory number.",
        "If there is no pressure or impact, record the baseline and continue monitoring.",
        "Investigate only when evidence indicates sustained contention or a resource limit problem."
      ],
      verification: [
        "MemAvailable remains adequate for the workload.",
        "Memory pressure and swap activity remain within expected ranges.",
        "Application latency and error rates are healthy."
      ],
      prevention: [
        "Alert on memory pressure and OOM events rather than free memory alone.",
        "Document host-specific memory baselines.",
        "Include application working-set measurements in capacity planning."
      ]
    },
    {
      id: "case-09",
      scenario: "CPU and RAM increase together after a release",
      symptoms: [
        "A new release is followed by elevated CPU and memory.",
        "Request latency or errors increase.",
        "Multiple replicas show similar behavior."
      ],
      likelyCauses: [
        "Application regression.",
        "New cache or background worker.",
        "Increased request fan-out.",
        "Dependency retries or queue growth.",
        "Configuration or runtime change."
      ],
      diagnostics: [
        "git log -10 --oneline",
        "git diff <known-good-revision>..<candidate-revision> --",
        "journalctl -u <service> --since '-2 hours' --no-pager",
        "ps -eo pid,pcpu,rss,etime,comm --sort=-pcpu | head -25",
        "free -h",
        "vmstat 1 10"
      ],
      interpretation: [
        "Establish whether the resource increase began after the release and whether the same pattern appears across replicas.",
        "Compare traffic and request mix to avoid blaming a release for an unrelated workload increase.",
        "Identify the changed code or configuration and connect it to a measurable mechanism."
      ],
      remediation: [
        "If evidence supports a release regression, follow the approved rollback process.",
        "Check database schema and data compatibility before rolling back application code.",
        "If rollback is unsafe, use a targeted feature flag, concurrency reduction, or compatible forward fix."
      ],
      verification: [
        "CPU and memory normalize under comparable traffic.",
        "Error rate, latency, and backlog return to target.",
        "The regression cannot be reproduced with the corrected version."
      ],
      prevention: [
        "Add resource and latency comparisons to release dashboards.",
        "Use canary deployment and automated rollback criteria where supported.",
        "Load-test new background workers, caching behavior, and request fan-out."
      ]
    },
    {
      id: "case-10",
      scenario: "Container hits its memory limit while the host has spare RAM",
      symptoms: [
        "Container restarts or reports OOMKilled.",
        "Host MemAvailable remains reasonable.",
        "The workload's configured memory limit is lower than its actual requirement."
      ],
      likelyCauses: [
        "Container limit is too low.",
        "Memory leak within the workload.",
        "Unexpected peak workload.",
        "Memory usage outside the language heap."
      ],
      diagnostics: [
        "docker inspect <container>",
        "docker stats --no-stream",
        "kubectl describe pod <pod> -n <namespace>",
        "kubectl get pod <pod> -n <namespace> -o yaml",
        "cat /proc/<PID>/cgroup"
      ],
      interpretation: [
        "Check the container's effective memory limit and peak usage.",
        "Separate normal peak demand from unbounded growth.",
        "Account for native memory, buffers, sidecars, and runtime overhead."
      ],
      remediation: [
        "Fix leaks or unbounded data structures when identified.",
        "Tune the memory limit based on measured peaks and node capacity.",
        "Adjust requests, limits, and replica placement through the approved deployment workflow."
      ],
      verification: [
        "The container survives representative peak workload.",
        "OOM events stop.",
        "The node retains sufficient memory headroom."
      ],
      prevention: [
        "Track container working set and OOM events.",
        "Use realistic resource requests and limits.",
        "Test peak load and long-running memory behavior."
      ]
    }
  ],

  productionIncidents: [
    {
      id: "incident-01",
      title: "Production API latency rises after a deployment",
      severity: "SEV-2",
      environment: "Production Linux application hosts",
      impact: [
        "API latency increases and some requests time out.",
        "CPU rises across multiple replicas.",
        "The deployment pipeline reports success, but application performance degrades."
      ],
      timeline: [
        "T+00: Monitoring detects a latency and CPU increase.",
        "T+05: On-call confirms the affected service, release identifier, and customer impact.",
        "T+10: Process metrics show the application process is the dominant CPU consumer.",
        "T+15: The team compares request rate and release changes with the previous healthy version.",
        "T+20: A changed code path or concurrency setting is identified as the supported cause.",
        "T+30: The service owner approves rollback or a targeted mitigation."
      ],
      investigation: [
        "Confirm whether all replicas or only one host are affected.",
        "Compare request rate, error rate, CPU, memory, and queue depth before and after release.",
        "Run top, pidstat, vmstat, and application-specific profiling as permitted.",
        "Inspect the deployment diff and verify that the suspected change explains the observed CPU behavior.",
        "Check downstream database and API latency so that a dependency failure is not mistaken for an application CPU regression."
      ],
      rootCause:
        "Example hypothesis: a newly introduced request-processing path performs excessive computation or increases request fan-out. Treat this as a confirmed root cause only when profiling, logs, or controlled comparison support it.",
      recovery: [
        "Preserve release identifiers, timestamps, and relevant metrics.",
        "Obtain the required incident/change approval.",
        "Roll back to the known-good release if compatibility and data-safety checks pass.",
        "If rollback is unsafe, use a targeted feature flag or concurrency reduction approved by the service owner.",
        "Avoid adding replicas without checking downstream capacity."
      ],
      validation: [
        "Check request latency, 5xx rate, throughput, and queue backlog.",
        "Verify CPU and CPU pressure under comparable request load.",
        "Confirm that all replicas are healthy and no new dependency saturation occurs.",
        "Monitor through a representative traffic period."
      ],
      followUp: [
        "Add resource regression checks to release review.",
        "Create a canary comparison for CPU and latency.",
        "Add a regression test or profile for the expensive path.",
        "Document the trigger, detection gap, mitigation, and prevention owner."
      ]
    },
    {
      id: "incident-02",
      title: "Worker memory growth causes repeated OOM kills",
      severity: "SEV-1 or SEV-2 depending on impact",
      environment: "Linux worker fleet or containerized background workers",
      impact: [
        "Jobs are retried or delayed.",
        "Workers restart repeatedly.",
        "Queue backlog grows and downstream processing falls behind."
      ],
      timeline: [
        "T+00: Memory alert fires or worker restarts increase.",
        "T+05: On-call checks host memory, process RSS, container limits, and OOM logs.",
        "T+10: The team establishes whether the OOM is host-wide or limited to one cgroup.",
        "T+15: Memory growth is compared with job size, concurrency, queue depth, and release time.",
        "T+25: The team reduces risk using an approved concurrency or workload control.",
        "T+40: The suspected leak or unbounded buffer is isolated for a durable fix."
      ],
      investigation: [
        "Run free -h, vmstat, process RSS inspection, and memory PSI checks.",
        "Read kernel logs for OOM events and inspect container status or systemd service state.",
        "Compare memory growth across workers performing equivalent jobs.",
        "Check whether memory grows per job, per request, per cache entry, or over elapsed time.",
        "Determine whether restarting a worker is losing in-flight work or causing duplicate processing."
      ],
      rootCause:
        "Example hypothesis: a worker retains job data in an unbounded collection or cache. Confirm with memory profiling or repeatable growth measurements instead of relying only on the OOM victim name.",
      recovery: [
        "Protect the queue and customer data first.",
        "Reduce worker concurrency or pause noncritical producers only through the approved process.",
        "Ensure retry behavior is bounded and idempotent.",
        "Use a compatible rollback if a recent release introduced the issue.",
        "Increase memory limits only if measured demand is legitimate and the host has sufficient capacity."
      ],
      validation: [
        "Worker memory remains bounded during representative jobs.",
        "OOM and restart rates fall.",
        "Queue backlog decreases without duplicate or lost work.",
        "Downstream dependencies remain healthy."
      ],
      followUp: [
        "Add memory-growth monitoring by worker and workload.",
        "Set bounded queues and cache eviction policies.",
        "Add long-running worker tests.",
        "Document retry and dead-letter handling for interrupted jobs."
      ]
    },
    {
      id: "incident-03",
      title: "High load average caused by blocked storage operations",
      severity: "SEV-2",
      environment: "Linux VM using local or network-attached storage",
      impact: [
        "SSH and application operations become slow.",
        "Load average rises despite moderate CPU usage.",
        "Database or file-processing requests experience long delays."
      ],
      timeline: [
        "T+00: Monitoring reports elevated load average and latency.",
        "T+05: On-call checks CPU, vmstat, task states, and I/O pressure.",
        "T+10: iostat indicates increased device latency or queueing.",
        "T+15: The platform team correlates host evidence with storage metrics.",
        "T+25: Approved workload reduction or storage recovery begins.",
        "T+40: The team verifies that blocked tasks drain and latency recovers."
      ],
      investigation: [
        "Compare load average, runnable and blocked task counts, CPU utilization, and I/O PSI.",
        "Run iostat -xz 1 10 and pidstat -d 1 10.",
        "Inspect D-state tasks, mount health, disk errors, and filesystem capacity.",
        "Compare cloud storage latency, throughput, and queue metrics when applicable.",
        "Check whether backups, snapshots, or batch jobs overlap with the incident."
      ],
      rootCause:
        "Example hypothesis: storage latency is delaying operations and leaving many tasks blocked. Confirm through device or storage-service metrics and time correlation.",
      recovery: [
        "Follow the storage/platform recovery procedure.",
        "Reduce nonessential I/O workload only with owner approval.",
        "Do not force-kill blocked tasks or delete data to reduce load average.",
        "If storage remains unhealthy, follow the approved failover or restore procedure."
      ],
      validation: [
        "Device latency and queueing return toward baseline.",
        "Blocked-task count and I/O PSI fall.",
        "Application latency and backlog recover.",
        "No filesystem or data-integrity issue remains."
      ],
      followUp: [
        "Alert on storage latency and I/O pressure.",
        "Review storage capacity and workload isolation.",
        "Test backup scheduling and storage failure recovery."
      ]
    },
    {
      id: "incident-04",
      title: "Container CPU throttling causes latency while the node appears healthy",
      severity: "SEV-2",
      environment: "Container platform or Kubernetes worker nodes",
      impact: [
        "One workload becomes slow.",
        "Host CPU appears to have spare capacity.",
        "Application latency is higher than expected for the observed host utilization."
      ],
      timeline: [
        "T+00: Application latency alert fires.",
        "T+05: Host-level CPU and memory are checked.",
        "T+10: Container metrics reveal CPU throttling or a tight quota.",
        "T+15: The team compares workload demand, configured limits, and healthy replicas.",
        "T+25: A tested resource adjustment or workload optimization is approved.",
        "T+35: The team validates latency and node headroom."
      ],
      investigation: [
        "Inspect per-container usage, throttling metrics, pod limits, and node allocatable capacity.",
        "Compare affected and healthy replicas.",
        "Check whether request rate, concurrency, or release behavior changed.",
        "Confirm that increasing the limit will not starve neighboring workloads or overload downstream services."
      ],
      rootCause:
        "Example hypothesis: the container's CPU quota is insufficient for the new workload peak. Confirm using throttling data and measured demand.",
      recovery: [
        "Tune resource limits through the normal deployment process.",
        "Scale replicas only after checking scheduler and dependency capacity.",
        "Optimize hot code or reduce unnecessary concurrency when the quota is not the underlying design problem."
      ],
      validation: [
        "Throttling and application latency decrease.",
        "Node utilization and neighboring workload performance remain healthy.",
        "The change survives a representative traffic peak."
      ],
      followUp: [
        "Add container throttling dashboards and alerts.",
        "Review resource sizing during release changes.",
        "Load-test burst traffic and document capacity assumptions."
      ]
    }
  ],

  recoveryRunbook: [
    "1. Declare or update the incident and confirm host, service, environment, owner, severity, and customer impact.",
    "2. Capture the incident start time and compare it with deployment, traffic, scheduled-task, and infrastructure-change timelines.",
    "3. Collect read-only evidence: uptime, free -h, vmstat, top/ps, pressure metrics, service status, and relevant logs.",
    "4. Determine whether the dominant constraint is CPU, memory, I/O, a container quota, or an external dependency.",
    "5. Identify the specific process, thread, container, workload, or scheduled job responsible.",
    "6. Form a root-cause hypothesis and test it against logs, repeated metrics, healthy peers, and recent changes.",
    "7. Select the least risky mitigation supported by evidence: reduce approved workload, shift traffic, scale safely, roll back a compatible release, or correct a confirmed resource limit.",
    "8. Obtain the required approval and confirm the recovery action's owner, scope, expected effect, and rollback path.",
    "9. Execute one controlled change at a time where practical. Record timestamps and the observed result.",
    "10. Validate customer metrics, process behavior, resource pressure, queue backlog, dependency health, and service readiness.",
    "11. If the mitigation fails or worsens the situation, follow the rollback/recovery plan rather than repeating the same action blindly.",
    "12. Continue monitoring for recurrence through a representative workload period.",
    "13. Preserve relevant evidence securely and prepare the incident report, prevention tasks, and owners."
  ],

  preventionChecklist: [
    "Maintain CPU, memory, load average, PSI, swap, disk latency, and OOM dashboards.",
    "Monitor application latency, request rate, error rate, queue depth, worker count, and dependency latency alongside host metrics.",
    "Set alerts on sustained symptoms and user impact rather than one noisy instantaneous threshold.",
    "Track CPU and RSS by process, service, container, and deployment version where feasible.",
    "Set resource requests, limits, and systemd controls using measured demand and documented headroom.",
    "Add load tests and soak tests to reveal CPU regressions and long-lived memory leaks.",
    "Bound caches, queues, retries, concurrency, and batch sizes.",
    "Use canary releases and clear rollback criteria for high-risk changes.",
    "Keep persistent or centralized logs so that OOM and kernel events survive host restarts.",
    "Ensure production hosts have synchronized clocks and consistent timestamps.",
    "Review scheduled jobs for overlap, duration growth, and peak-hour contention.",
    "Validate autoscaling signals and maximum capacity; scaling should not overload downstream systems.",
    "Test service restart, node replacement, and worker recovery behavior.",
    "Document how to collect sensitive diagnostic artifacts safely.",
    "Review every significant incident for detection gaps, response delays, and preventive engineering actions."
  ],

  monitoring: [
    {
      metric: "CPU utilization by host and core",
      investigateWhen:
        "Utilization is sustained above the host's established baseline or customer-facing latency rises.",
      usefulLabels: ["instance", "service", "environment", "cpu"],
      alertGuidance:
        "Use a sustained window and correlate with latency, traffic, CPU pressure, and available capacity. A single short spike is not necessarily actionable."
    },
    {
      metric: "Load average and runnable tasks",
      investigateWhen:
        "Load grows relative to available CPU capacity or blocked-task counts rise.",
      usefulLabels: ["instance", "environment"],
      alertGuidance:
        "Interpret alongside CPU utilization, task state, and I/O metrics; do not use one universal load threshold for every host."
    },
    {
      metric: "Memory available and memory pressure",
      investigateWhen:
        "MemAvailable trends down while memory PSI or swap activity rises.",
      usefulLabels: ["instance", "service", "environment"],
      alertGuidance:
        "Prefer available memory, pressure, and workload impact over free memory alone."
    },
    {
      metric: "Process or container working set",
      investigateWhen:
        "RSS or container working set grows persistently, approaches its limit, or diverges from the normal workload baseline.",
      usefulLabels: ["instance", "service", "container", "pod", "namespace"],
      alertGuidance:
        "Compare with workload volume and configured limits; use growth-rate alerts for suspected leaks."
    },
    {
      metric: "Swap-in and swap-out activity",
      investigateWhen:
        "Sustained swapping correlates with memory pressure or application latency.",
      usefulLabels: ["instance", "environment"],
      alertGuidance:
        "Swap allocation alone is not proof of a problem; alert on active pressure and impact."
    },
    {
      metric: "OOM events and restart rate",
      investigateWhen:
        "An OOM event occurs, or service/container restarts increase unexpectedly.",
      usefulLabels: ["instance", "service", "container", "pod", "namespace"],
      alertGuidance:
        "Treat production OOM events as high-signal evidence and correlate with memory limits, RSS, and release timestamps."
    },
    {
      metric: "CPU throttling",
      investigateWhen:
        "A container's throttled periods or throttled time rise with application latency.",
      usefulLabels: ["pod", "container", "namespace", "cluster"],
      alertGuidance:
        "Inspect quota, actual demand, node capacity, and downstream limits before raising CPU limits."
    },
    {
      metric: "I/O latency and I/O pressure",
      investigateWhen:
        "Device latency, queueing, blocked tasks, or I/O PSI increase.",
      usefulLabels: ["instance", "device", "mount", "environment"],
      alertGuidance:
        "Use device-appropriate baselines and correlate with filesystem errors, throughput, and blocked-task counts."
    },
    {
      metric: "Application latency and error rate",
      investigateWhen:
        "SLOs are breached or request failures increase, even if host utilization appears normal.",
      usefulLabels: ["service", "route", "environment", "version"],
      alertGuidance:
        "Customer impact is a primary signal. Correlate with resource metrics rather than treating utilization as the only measure of health."
    }
  ],

  ciCdChecks: [
    "Run application unit and integration tests before deployment.",
    "Use load tests or benchmarks for changes affecting request processing, concurrency, caching, serialization, or background workers.",
    "Build a release dashboard that compares CPU, memory, latency, and error rates between canary and baseline versions.",
    "Use deployment health gates based on agreed service-level indicators, not only successful process startup.",
    "Validate container resource requests and limits against policy and measured workload requirements.",
    "Check that worker concurrency, retry limits, and queue bounds are explicit and reviewed.",
    "Ensure rollback criteria are documented and compatible with schema, data, and external side effects.",
    "Use gradual rollout or canary strategies for high-risk performance changes.",
    "Run dependency-failure tests to verify retries do not create a resource-amplifying storm.",
    "Add long-running tests for suspected memory leaks and unbounded resource growth.",
    "Ensure alerts and dashboards identify service, environment, release version, and affected instance.",
    "Keep runbooks accessible to on-call engineers and review them after incidents."
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Severity and incident commander:",
    "Affected service, host, environment, cluster, and release:",
    "Customer impact and SLO/SLA impact:",
    "Incident start, detection, mitigation, and resolution timestamps:",
    "CPU, memory, PSI, swap, I/O, and application metrics observed:",
    "Relevant logs, process snapshots, and OOM evidence:",
    "Changes and events correlated with the incident:",
    "Root cause supported by evidence:",
    "Contributing factors:",
    "Mitigation applied and approval:",
    "Recovery validation and monitoring window:",
    "What worked well:",
    "What delayed diagnosis or recovery:",
    "Corrective actions with owners and due dates:",
    "Detection, alerting, and runbook improvements:"
  ],

  handsOnLabs: [
    {
      title: "Lab 1: Understand CPU and load average",
      objective:
        "Learn to distinguish CPU saturation from runnable-task and I/O-related load.",
      steps: [
        "Run uptime, nproc, top, and vmstat 1 10 on a non-production Linux host.",
        "Record load average, CPU count, runnable tasks, blocked tasks, and I/O wait.",
        "Compare the values over repeated samples.",
        "Explain whether the observed bottleneck is CPU, I/O, or inconclusive."
      ],
      expectedLearning:
        "Load average is not a direct CPU utilization percentage; use multiple metrics to identify the bottleneck."
    },
    {
      title: "Lab 2: Identify a CPU-heavy process",
      objective:
        "Practice finding a process responsible for high CPU.",
      steps: [
        "Use a disposable test VM and create a controlled CPU workload approved for the lab.",
        "Observe top and pidstat at one-second intervals.",
        "Identify the process ID and compare its CPU usage with the host metrics.",
        "Stop only the lab workload using its documented cleanup procedure."
      ],
      expectedLearning:
        "Repeated process-level samples provide better evidence than a single snapshot."
    },
    {
      title: "Lab 3: Observe memory pressure safely",
      objective:
        "Understand MemAvailable, RSS, swap activity, and pressure metrics.",
      steps: [
        "Use a disposable VM with sufficient headroom and no production workloads.",
        "Record free -h, vmstat 1 10, and /proc/pressure/memory before the test.",
        "Run a bounded memory test with an explicit limit and timeout.",
        "Observe the changes and stop the test before the host becomes unstable.",
        "Record the before/after results and clean up the test process."
      ],
      expectedLearning:
        "Low free memory is not automatically a fault; sustained pressure and application impact matter."
    },
    {
      title: "Lab 4: Inspect container resource limits",
      objective:
        "Understand how container CPU and memory constraints differ from host capacity.",
      steps: [
        "Use a local disposable container or non-production Kubernetes namespace.",
        "Inspect configured CPU and memory limits.",
        "Compare container metrics with host or node metrics.",
        "Review throttling and OOM status where supported.",
        "Change limits only in the lab and verify behavior under a controlled workload."
      ],
      expectedLearning:
        "A container can be resource-constrained even when the host has spare capacity."
    },
    {
      title: "Lab 5: Write an evidence-based incident report",
      objective:
        "Practice root-cause reasoning rather than guessing from symptoms.",
      steps: [
        "Use a recorded or simulated CPU/RAM incident.",
        "Build a timeline from metrics, logs, and deployment events.",
        "List at least three plausible causes.",
        "For each cause, record evidence that supports or rejects it.",
        "Choose the least risky supported mitigation and define measurable recovery criteria."
      ],
      expectedLearning:
        "A useful incident report connects impact, timeline, evidence, root cause, recovery, and preventive actions."
    }
  ],

  interviewQuestions: [
    {
      question: "What is the difference between CPU utilization and load average?",
      answer:
        "CPU utilization describes how busy CPU time is. Load average estimates the average number of tasks that are runnable or in uninterruptible sleep. A high load average can be caused by CPU contention or blocked tasks, so it must be interpreted with CPU count, task states, and I/O metrics."
    },
    {
      question: "Why is low free RAM not always a problem on Linux?",
      answer:
        "Linux uses available memory for page cache and other reclaimable caches. MemAvailable is usually a more useful estimate of memory that can be used without swapping. Check memory pressure, swap activity, and workload impact before declaring an incident."
    },
    {
      question: "How do you find the process consuming the most CPU?",
      answer:
        "Start with top or ps sorted by CPU, then sample with pidstat. Correlate the process with service logs and application metrics. If needed, inspect its threads or use an approved profiler."
    },
    {
      question: "How do you identify the process consuming the most memory?",
      answer:
        "Use free -h and ps sorted by RSS, then inspect /proc/PID/status or smaps_rollup for the candidate. Remember that RSS may include shared pages and that process memory totals do not necessarily equal total system memory."
    },
    {
      question: "What is an OOM killer event?",
      answer:
        "When the kernel cannot satisfy memory demands under relevant constraints, it may terminate a process to protect system operation. Determine whether the event was host-wide or limited to a cgroup, and do not assume the killed process was the original source of the pressure."
    },
    {
      question: "How do you troubleshoot a memory leak?",
      answer:
        "Establish a repeatable growth pattern using RSS, working-set, or runtime allocation metrics under comparable workload. Correlate the trend with releases, caches, queues, and concurrency. Use approved heap or allocation profiling to isolate the leak and validate that growth remains bounded after the fix."
    },
    {
      question: "Why can load average be high while CPU usage is low?",
      answer:
        "Tasks may be blocked on I/O or another uninterruptible wait. Check vmstat, I/O PSI, iostat, and D-state tasks before concluding that CPU capacity is insufficient."
    },
    {
      question: "What is CPU throttling in containers?",
      answer:
        "A container can be limited by a CPU quota even when the host has spare capacity. Compare configured limits, actual usage, throttling counters, latency, and node capacity before adjusting resources."
    },
    {
      question: "Would you restart a service immediately when RAM is high?",
      answer:
        "Not automatically. First establish the impact, capture safe evidence, identify the service owner and restart risk, and determine whether a restart is an approved mitigation. A restart may hide a memory leak without fixing it."
    },
    {
      question: "What is PSI in Linux?",
      answer:
        "Pressure Stall Information estimates the time tasks are stalled because of CPU, memory, or I/O contention. It helps connect resource contention to lost progress and complements utilization and capacity metrics."
    },
    {
      question: "How would you troubleshoot a production CPU spike after deployment?",
      answer:
        "Confirm the timeline and affected scope, compare the release with a known-good version, inspect CPU and application metrics, identify the hot process or thread, and check traffic and dependencies. If the release is the supported cause, use the approved rollback or targeted mitigation and validate recovery."
    },
    {
      question: "Why should you not simply increase RAM or CPU limits?",
      answer:
        "The spike may be caused by a leak, runaway loop, retry storm, blocked storage, or excessive concurrency. More capacity can delay failure or move pressure to downstream systems. Establish the bottleneck and capacity headroom before resizing."
    },
    {
      question: "What is the difference between RSS and VSZ?",
      answer:
        "RSS is the resident memory currently mapped into a process; VSZ is its virtual address space. VSZ can be much larger than physical RAM usage and should not be treated as actual RAM consumption."
    },
    {
      question: "How do you determine whether a scheduled task caused the incident?",
      answer:
        "Correlate the incident timeline with systemd timers, cron activity, process start times, CPU/RAM samples, and service latency. Check whether jobs overlap and whether the observed workload explains the resource pattern."
    },
    {
      question: "What makes a production troubleshooting report useful?",
      answer:
        "It records impact and timeline, the exact evidence collected, hypotheses tested, confirmed root cause, approved mitigation, recovery validation, contributing factors, and corrective actions with owners and due dates."
    }
  ],

  references: [
    "Linux man-pages: https://man7.org/linux/man-pages/",
    "proc(5): https://man7.org/linux/man-pages/man5/proc.5.html",
    "top(1): https://man7.org/linux/man-pages/man1/top.1.html",
    "free(1): https://man7.org/linux/man-pages/man1/free.1.html",
    "vmstat(8): https://man7.org/linux/man-pages/man8/vmstat.8.html",
    "systemd.resource-control: https://www.freedesktop.org/software/systemd/man/latest/systemd.resource-control.html",
    "Docker resource constraints: https://docs.docker.com/engine/containers/resource_constraints/",
    "Kubernetes resource management: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
    "Prometheus documentation: https://prometheus.io/docs/introduction/overview/",
    "Linux kernel PSI documentation: https://docs.kernel.org/accounting/psi.html"
  ]
};
