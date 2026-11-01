import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Linux Performance Monitoring, Optimization and Troubleshooting",
  description: "Complete practical Linux performance engineering guide covering CPU, memory, load average, process scheduling, disk I/O, filesystem, network performance, bottleneck analysis, production incidents, monitoring, tuning, automation, and interview preparation.",
  sections: [
    {
      heading: "1. Introduction to Linux Performance Management",
      explanation: "Linux performance management is the process of measuring, analyzing, and improving how efficiently a system uses CPU, memory, storage, network, and other resources. A server may become slow because CPU utilization is high, memory is exhausted, disk operations are delayed, network connections are overloaded, or an application is blocked waiting for another service. Performance troubleshooting must identify the actual bottleneck rather than blindly increasing CPU or memory. In production environments, administrators establish normal performance baselines and compare current measurements against historical behavior. They also correlate infrastructure metrics with application response time, request rate, error rate, and workload changes. A high utilization number does not automatically indicate a problem; the impact on application behavior and resource saturation must be evaluated together.",
      steps: [
        "Identify the affected server, application, and business impact.",
        "Collect CPU, memory, load average, disk, and network metrics.",
        "Compare current measurements with the normal baseline.",
        "Identify which resource is saturated or experiencing unusual latency.",
        "Find the process, service, or workload responsible for resource consumption.",
        "Check whether the issue is temporary, recurring, or continuously increasing.",
        "Apply a targeted correction rather than changing unrelated system settings.",
        "Verify application performance after the correction.",
        "Document the root cause and preventive monitoring."
      ],
      commands: [
        "uptime",
        "top",
        "htop",
        "free -h",
        "vmstat 1 5",
        "iostat -xz 1 5",
        "mpstat -P ALL 1 5",
        "sar -u 1 5",
        "df -h",
        "ss -s"
      ],
      problems: [
        {
          issue: "Linux server responds slowly even though CPU utilization appears low.",
          rootCause: "The application may be waiting for disk I/O, network responses, locks, or an external dependency.",
          solution: "Inspect I/O wait, process states, socket connections, application latency, and dependency health instead of focusing only on CPU."
        },
        {
          issue: "A monitoring dashboard reports high CPU but users report no application issue.",
          rootCause: "The workload may be CPU-intensive but completing requests within acceptable response times.",
          solution: "Compare utilization with latency, throughput, queue depth, and service-level objectives before treating it as an incident."
        }
      ]
    },
    {
      heading: "2. Linux Performance Architecture",
      explanation: "Linux performance is influenced by several interacting kernel and hardware subsystems. The scheduler decides which runnable process receives CPU time. Memory management allocates RAM, manages page cache, handles virtual memory, and may reclaim pages under pressure. The block layer schedules storage operations, while filesystems organize data and metadata. Network stack components manage packets, sockets, buffers, routing, and connection state. Device drivers connect the kernel to hardware. Applications create workloads through system calls, threads, file operations, memory allocation, and network requests. A performance problem can originate in an application, runtime, kernel subsystem, virtual machine host, storage backend, or network path. Understanding these layers makes it easier to connect symptoms with the correct measurement.",
      steps: [
        "Identify the application process and its worker or thread model.",
        "Understand CPU scheduling and runnable task queues.",
        "Inspect memory allocation, page cache, swap, and reclaim activity.",
        "Understand storage queues, request latency, and filesystem behavior.",
        "Inspect network sockets, packet processing, and connection queues.",
        "Correlate kernel metrics with application-level measurements.",
        "Check virtualization or cloud infrastructure metrics when applicable.",
        "Trace performance problems across application and operating system layers."
      ],
      commands: [
        "uname -a",
        "lscpu",
        "lsmem",
        "cat /proc/loadavg",
        "cat /proc/meminfo",
        "cat /proc/stat",
        "cat /proc/diskstats",
        "cat /proc/net/dev",
        "cat /proc/pressure/cpu",
        "cat /proc/pressure/memory",
        "cat /proc/pressure/io"
      ],
      problems: [
        {
          issue: "Application performance is poor but operating system metrics look normal.",
          rootCause: "The bottleneck may exist inside application threads, database queries, runtime garbage collection, or an external dependency.",
          solution: "Correlate application traces, request latency, thread states, database metrics, and operating system measurements."
        },
        {
          issue: "Virtual machine reports low CPU usage while requests are delayed.",
          rootCause: "The hypervisor may be scheduling the virtual CPU slowly or storage and network backends may be constrained.",
          solution: "Inspect guest metrics and available cloud or hypervisor metrics such as CPU ready time, storage latency, and network throughput."
        }
      ]
    },
    {
      heading: "3. Internal Working of Linux Performance Monitoring",
      explanation: "Linux exposes performance information through kernel interfaces such as /proc and /sys. Monitoring tools read these interfaces and calculate utilization, rates, queues, and other metrics. For example, CPU utilization is derived from changes in CPU time counters between measurement intervals. Memory tools read values such as MemTotal, MemAvailable, cached pages, and swap usage. Disk tools use block-device counters to calculate throughput, IOPS, queue size, and latency. Network tools read interface counters and socket statistics. Some tools such as vmstat and sar report interval-based measurements, while others such as ps show a snapshot. Understanding whether a metric is a cumulative counter, a percentage, a rate, or a point-in-time value is important when interpreting monitoring output.",
      steps: [
        "Identify the kernel metric source used by the monitoring command.",
        "Determine whether the metric is cumulative or interval-based.",
        "Collect at least two measurements when calculating a rate.",
        "Compare measurements across equivalent time windows.",
        "Check whether the monitoring tool reports per-process or system-wide values.",
        "Understand the difference between utilization, saturation, and errors.",
        "Correlate multiple metrics to avoid false conclusions.",
        "Preserve raw measurements for incident analysis."
      ],
      commands: [
        "cat /proc/stat",
        "cat /proc/meminfo",
        "cat /proc/loadavg",
        "cat /proc/diskstats",
        "cat /proc/net/dev",
        "vmstat 1 10",
        "iostat -xz 1 10",
        "mpstat -P ALL 1 10",
        "sar -n DEV 1 10",
        "pidstat -u 1 10"
      ],
      problems: [
        {
          issue: "A monitoring script reports impossible CPU percentages.",
          rootCause: "The script may calculate cumulative counters incorrectly, use invalid sampling intervals, or mishandle counter resets.",
          solution: "Calculate differences between consecutive samples, handle process restarts and counter resets, and validate results against established tools."
        },
        {
          issue: "A dashboard shows a sudden memory drop without a workload change.",
          rootCause: "The metric may represent free memory rather than available memory, or the collection interval may have missed cache reclamation.",
          solution: "Inspect MemAvailable, cache, buffers, swap, and time-series collection behavior before concluding that memory is exhausted."
        }
      ]
    },
    {
      heading: "4. CPU Performance, Features and Important Metrics",
      explanation: "CPU performance depends on processor capacity, runnable workload, scheduling, clock frequency, CPU topology, interrupts, and virtualization overhead. CPU utilization is commonly divided into user time, system time, idle time, I/O wait, and other categories. User time represents execution of application code, while system time represents kernel work. I/O wait indicates time CPUs are idle while outstanding I/O operations exist; it is not a direct measurement of disk utilization. Load average represents the average number of tasks that are runnable or waiting in uninterruptible sleep, not a CPU percentage. A load average higher than the number of logical CPUs may indicate sustained scheduling pressure, but workload characteristics and I/O waits must also be considered.",
      steps: [
        "Check the number of logical CPUs and processor topology.",
        "Measure CPU utilization over an interval.",
        "Identify whether user or system CPU dominates.",
        "Inspect per-CPU imbalance and interrupt activity.",
        "Identify the processes consuming the most CPU.",
        "Compare runnable tasks and load average with available CPU capacity.",
        "Check CPU frequency and thermal throttling where supported.",
        "Inspect virtualization CPU scheduling metrics when relevant."
      ],
      commands: [
        "lscpu",
        "nproc",
        "uptime",
        "top",
        "mpstat -P ALL 1 5",
        "sar -u 1 5",
        "pidstat -u 1 5",
        "ps -eo pid,ppid,comm,%cpu,%mem --sort=-%cpu | head",
        "cat /proc/interrupts",
        "cat /proc/loadavg"
      ],
      problems: [
        {
          issue: "One CPU core is heavily utilized while other cores are mostly idle.",
          rootCause: "A single-threaded workload, CPU affinity, lock contention, or uneven interrupt distribution may concentrate work on one core.",
          solution: "Inspect process and thread CPU usage, affinity, application concurrency, and interrupt distribution before changing CPU settings."
        },
        {
          issue: "CPU usage remains high after an application deployment.",
          rootCause: "A code regression, inefficient query, retry loop, increased request volume, or background worker may be consuming CPU.",
          solution: "Compare deployment timestamps with process and application metrics, profile the workload, and inspect request rate and error retries."
        }
      ]
    },
    {
      heading: "5. Real-Time Performance Investigation Workflow",
      explanation: "A real-time performance investigation begins by establishing the scope of the incident. Administrators determine whether one application, one host, an entire cluster, or a network path is affected. They collect a short interval of system metrics, identify the dominant resource pressure, and locate the processes or services associated with the symptoms. The next step is to inspect application logs and dependencies. For example, a web server may be slow because CPU is saturated, database queries are delayed, storage latency is high, or connection pools are exhausted. Changes should be controlled and reversible. After applying a correction, administrators validate both infrastructure and application performance rather than assuming that a lower utilization number means the issue is resolved.",
      steps: [
        "Confirm the incident start time and affected services.",
        "Check uptime, load average, and logical CPU count.",
        "Capture top CPU and memory processes.",
        "Inspect memory availability and swap activity.",
        "Inspect disk utilization, latency, and queue depth.",
        "Check network throughput, errors, and connection state.",
        "Inspect application and system logs for matching timestamps.",
        "Identify the bottleneck and verify the hypothesis with measurements.",
        "Apply the smallest safe correction.",
        "Run application health checks and compare latency before and after.",
        "Continue monitoring to confirm the issue does not return.",
        "Record the incident timeline and root cause."
      ],
      commands: [
        "date",
        "uptime",
        "nproc",
        "top -b -n 1",
        "free -h",
        "vmstat 1 10",
        "iostat -xz 1 10",
        "pidstat -dur 1 10",
        "ss -s",
        "sar -n DEV 1 5",
        "journalctl -p warning --since '30 minutes ago'",
        "systemctl --failed"
      ],
      problems: [
        {
          issue: "Server performance is poor but no single process appears responsible.",
          rootCause: "The issue may involve distributed workload, kernel activity, I/O wait, network contention, or short-lived processes missed by snapshots.",
          solution: "Use interval-based tools such as pidstat, vmstat, iostat, and sar, and correlate them with application metrics."
        },
        {
          issue: "Performance returns to normal before the administrator can investigate.",
          rootCause: "The incident may be caused by a short-lived batch job, traffic spike, scheduled task, or temporary resource contention.",
          solution: "Enable time-series monitoring, process accounting where appropriate, and alerting with sufficient metric retention."
        }
      ]
    },
    {
      heading: "6. Production Performance Scenarios and Troubleshooting Examples",
      explanation: "Production performance incidents often involve several resource types at once. A web server may experience high CPU because request volume increased or a worker entered a retry loop. A database server may become slow because storage latency increased or the buffer cache is under pressure. A batch server may experience memory exhaustion because a process leaks memory. A cloud VM may show CPU throttling because it exceeds its allocated compute limits. A container may be constrained by cgroup CPU or memory limits even when the host appears healthy. Correct diagnosis requires both host-level and workload-level measurements.",
      steps: [
        "Scenario 1: Web application CPU spike - compare request rate, process CPU, and deployment changes.",
        "Scenario 2: Database latency - inspect storage latency, memory pressure, and query performance.",
        "Scenario 3: Memory leak - track process RSS over time and correlate with application workload.",
        "Scenario 4: Slow batch processing - inspect CPU scheduling, disk throughput, and input size.",
        "Scenario 5: Container throttling - inspect cgroup CPU quota and throttling counters.",
        "Scenario 6: Cloud VM slowdown - inspect instance metrics and host-level resource constraints.",
        "Scenario 7: Network delay - inspect retransmissions, connection counts, and endpoint latency.",
        "Scenario 8: Sudden load spike - identify scheduled jobs, traffic increases, and process creation patterns."
      ],
      commands: [
        "top -o %CPU",
        "ps -eo pid,comm,%cpu,%mem,rss --sort=-%mem | head",
        "pidstat -dur 1 10",
        "iostat -xz 1 10",
        "vmstat 1 10",
        "cat /proc/pressure/memory",
        "cat /proc/pressure/io",
        "systemctl status application.service",
        "journalctl -u application.service --since '1 hour ago'",
        "ss -s",
        "docker stats",
        "kubectl top pods -A"
      ],
      problems: [
        {
          issue: "Host CPU is healthy but a containerized application is slow.",
          rootCause: "The container may have CPU quota restrictions, memory limits, throttling, or resource contention with other workloads.",
          solution: "Inspect container resource limits and cgroup statistics, then compare container metrics with host-level capacity."
        },
        {
          issue: "Database response time increases while CPU remains low.",
          rootCause: "The database may be waiting for storage, locks, network responses, or connection availability.",
          solution: "Inspect database wait events, disk latency, lock contention, connection pool usage, and network dependencies."
        }
      ]
    },
    {
      heading: "7. Performance Configuration and Kernel Tuning",
      explanation: "Linux performance configuration includes process priorities, CPU affinity, scheduler behavior, memory limits, virtual memory parameters, file descriptor limits, network buffers, and storage settings. Tuning must be based on measurements and workload requirements. The sysctl interface exposes kernel parameters, while ulimit and systemd resource controls affect process limits. Nice values influence scheduling priority among normal processes, and taskset controls CPU affinity. Changes to kernel parameters can have system-wide effects, so they should be tested in a non-production environment, documented, and applied with a rollback procedure. Do not copy random tuning values from the internet without understanding the workload and kernel version.",
      steps: [
        "Establish a performance baseline before changing configuration.",
        "Identify the workload's actual resource constraint.",
        "Inspect current process limits and kernel settings.",
        "Test one configuration change at a time.",
        "Use temporary changes for controlled experiments where possible.",
        "Validate the effect using the same workload and measurement interval.",
        "Persist only changes that produce a measurable improvement.",
        "Document the setting, reason, owner, and rollback procedure."
      ],
      commands: [
        "sysctl -a",
        "sysctl vm.swappiness",
        "sysctl vm.dirty_ratio",
        "ulimit -a",
        "cat /proc/PID/limits",
        "nice -n 10 command",
        "renice 10 -p PID",
        "taskset -cp PID",
        "systemctl show application.service",
        "systemd-cgtop"
      ],
      problems: [
        {
          issue: "A tuning change improves one workload but slows another.",
          rootCause: "Kernel and process settings can affect shared resources and competing workloads differently.",
          solution: "Evaluate the complete host workload, test under representative traffic, and revert settings that do not improve the overall service objective."
        },
        {
          issue: "A sysctl setting resets after reboot.",
          rootCause: "The change was applied temporarily or the persistent configuration was written to an incorrect or overridden file.",
          solution: "Check the active value and configuration files under /etc/sysctl.d and /etc/sysctl.conf, then validate persistence after a controlled reboot."
        }
      ]
    },
    {
      heading: "8. Essential Linux Performance Commands",
      explanation: "Performance troubleshooting requires a practical toolkit. top and htop provide interactive process views. ps captures process snapshots. vmstat reports system, memory, swap, and CPU activity. iostat measures block device utilization and latency. mpstat reports per-CPU statistics. pidstat provides process-level resource usage. sar collects historical system activity when sysstat is configured. free summarizes memory. ss reports sockets, while ip and interface statistics help diagnose network behavior. perf can profile CPU events and application execution when supported. Some commands require installation of sysstat, procps, htop, or perf tools depending on the distribution.",
      steps: [
        "Use uptime to inspect load average.",
        "Use top or htop to identify active processes.",
        "Use ps for sortable process snapshots.",
        "Use free and vmstat to inspect memory and swap.",
        "Use iostat for storage performance.",
        "Use mpstat and pidstat for CPU analysis.",
        "Use sar for historical performance data.",
        "Use ss and ip for network investigation.",
        "Use perf when deeper profiling is required.",
        "Capture command output during incidents for later comparison."
      ],
      commands: [
        "uptime",
        "top",
        "htop",
        "ps aux",
        "ps -eo pid,ppid,comm,%cpu,%mem --sort=-%cpu | head",
        "free -h",
        "vmstat 1 5",
        "iostat -xz 1 5",
        "mpstat -P ALL 1 5",
        "pidstat -dur 1 5",
        "sar -u 1 5",
        "sar -r 1 5",
        "sar -d 1 5",
        "ss -s",
        "ip -s link",
        "perf top"
      ],
      problems: [
        {
          issue: "iostat or sar command is unavailable.",
          rootCause: "The sysstat package may not be installed or its collection service may not be enabled.",
          solution: "Install sysstat using the distribution package manager and configure collection where historical metrics are required."
        },
        {
          issue: "A performance command requires privileges to inspect a process.",
          rootCause: "Process ownership, kernel security settings, or restricted performance event access may limit visibility.",
          solution: "Use approved administrative privileges and follow system security policy instead of weakening global protections."
        }
      ]
    },
    {
      heading: "9. Performance Logs and Historical Analysis",
      explanation: "Historical performance analysis helps identify trends that cannot be understood from a single snapshot. Sysstat can collect CPU, memory, disk, and network statistics over time. Systemd journal records kernel and service messages. Kernel logs may show out-of-memory events, device resets, filesystem errors, or driver problems. Application logs can show slow requests, timeout patterns, retry loops, and dependency failures. Log timestamps must be correlated with monitoring metrics and deployment events. Historical data should be retained long enough to compare normal operation with incidents, while log rotation prevents diagnostic data from exhausting disk capacity.",
      steps: [
        "Identify the incident time window.",
        "Inspect historical CPU and load metrics.",
        "Inspect memory, swap, and paging trends.",
        "Inspect disk utilization and latency history.",
        "Inspect network traffic and error counters.",
        "Review kernel messages for device or memory problems.",
        "Review service and application logs for matching timestamps.",
        "Compare the incident with deployment and scheduled job history.",
        "Preserve relevant evidence before changing the system."
      ],
      commands: [
        "sar -u -f /var/log/sa/sa01",
        "sar -r -f /var/log/sa/sa01",
        "sar -d -f /var/log/sa/sa01",
        "sar -n DEV -f /var/log/sa/sa01",
        "journalctl -k --since today",
        "dmesg -T | tail -100",
        "journalctl -p warning --since '2 hours ago'",
        "journalctl -u application.service --since '2 hours ago'",
        "grep -iE 'timeout|slow|error|failed' /var/log/syslog",
        "grep -iE 'timeout|slow|error|failed' /var/log/messages"
      ],
      problems: [
        {
          issue: "Historical sar reports are missing.",
          rootCause: "Sysstat collection may be disabled, misconfigured, or unable to write data to its storage location.",
          solution: "Check sysstat package and timer or service configuration, verify collection paths and permissions, and confirm new samples are being recorded."
        },
        {
          issue: "Performance issue cannot be correlated with application logs.",
          rootCause: "Clock differences, timezone confusion, missing timestamps, or insufficient log retention may hide the event relationship.",
          solution: "Standardize time synchronization, include timestamps in logs, and retain monitoring and application data for the required investigation period."
        }
      ]
    },
    {
      heading: "10. Identifying CPU, Memory, Disk, and Network Bottlenecks",
      explanation: "A bottleneck is the resource that limits overall workload performance. CPU bottlenecks may show high runnable task counts and sustained CPU utilization. Memory bottlenecks may show low available memory, reclaim activity, swap pressure, or OOM events. Storage bottlenecks may show high device latency, queue depth, and I/O pressure. Network bottlenecks may show interface errors, packet drops, retransmissions, connection exhaustion, or throughput limits. Linux Pressure Stall Information provides CPU, memory, and I/O pressure measurements on supported kernels. No single metric should be interpreted in isolation. For example, high disk utilization may be normal for a throughput-heavy workload, while modest utilization with very high latency may indicate a serious issue.",
      steps: [
        "Measure CPU utilization, run queue, and pressure.",
        "Measure available memory, swap, and memory pressure.",
        "Measure disk latency, throughput, and queue depth.",
        "Measure network throughput, errors, drops, and retransmissions.",
        "Identify the process or service generating the workload.",
        "Compare observed values with baseline and service objectives.",
        "Confirm the bottleneck with a second independent metric.",
        "Check whether a downstream dependency is creating the apparent bottleneck."
      ],
      commands: [
        "mpstat -P ALL 1 5",
        "vmstat 1 5",
        "free -h",
        "cat /proc/pressure/cpu",
        "cat /proc/pressure/memory",
        "cat /proc/pressure/io",
        "iostat -xz 1 5",
        "pidstat -d 1 5",
        "ip -s link",
        "sar -n DEV 1 5",
        "ss -s",
        "nstat"
      ],
      problems: [
        {
          issue: "Load average is high but CPU utilization is low.",
          rootCause: "Many tasks may be waiting in uninterruptible sleep, often due to storage or other I/O operations.",
          solution: "Inspect process states, vmstat blocked tasks, iostat latency, and I/O pressure before increasing CPU capacity."
        },
        {
          issue: "Disk utilization is near 100 percent and application latency increases.",
          rootCause: "The storage device may be saturated or experiencing high request latency.",
          solution: "Identify high-I/O processes, inspect device latency and queue depth, and evaluate workload distribution or storage capacity."
        }
      ]
    },
    {
      heading: "11. Root Cause Analysis for Linux Performance Incidents",
      explanation: "Performance root cause analysis must distinguish between a primary bottleneck and secondary symptoms. High CPU can be caused by an application loop, traffic increase, excessive context switching, or kernel processing. High memory use may be normal page cache or an actual leak. High load average may be caused by CPU scheduling or blocked I/O. High disk latency may be caused by storage saturation, snapshots, backup jobs, or an overloaded cloud volume. Network delays may originate from local packet drops, DNS, remote services, or congestion. The investigation should build a timeline, compare healthy and affected hosts, correlate resource metrics with workload changes, and validate the suspected cause using repeatable evidence.",
      steps: [
        "Define the affected service and user-visible symptom.",
        "Build an incident timeline with deployments and traffic changes.",
        "Compare host metrics with historical baseline.",
        "Identify the resource showing saturation or pressure.",
        "Find the responsible process, thread, or workload.",
        "Inspect kernel, service, and application logs.",
        "Compare the affected host with a healthy peer.",
        "Test the hypothesis with controlled measurements.",
        "Implement a targeted correction and validate results.",
        "Record preventive actions and monitoring improvements."
      ],
      commands: [
        "uptime",
        "top -b -n 1",
        "vmstat 1 10",
        "iostat -xz 1 10",
        "pidstat -dur 1 10",
        "sar -u 1 10",
        "sar -r 1 10",
        "sar -d 1 10",
        "ss -s",
        "journalctl -k --since '1 hour ago'",
        "systemctl --failed"
      ],
      problems: [
        {
          issue: "Administrator restarts a service and the performance problem returns.",
          rootCause: "Restarting removed the immediate symptom but did not correct the underlying workload, leak, dependency, or resource constraint.",
          solution: "Capture metrics and process evidence before restart, identify the recurring trigger, and fix the underlying cause."
        },
        {
          issue: "A CPU scaling change is proposed without evidence.",
          rootCause: "The investigation has not established whether CPU capacity is the actual limiting resource.",
          solution: "Measure CPU saturation, run queue, application latency, and downstream waits before approving additional compute capacity."
        }
      ]
    },
    {
      heading: "12. Step-by-Step Performance Troubleshooting and Recovery",
      explanation: "Performance recovery should reduce user impact while preserving enough evidence to identify the root cause. Administrators first confirm the affected workload and collect basic measurements. They then isolate CPU, memory, disk, and network behavior. If a runaway process is identified, they investigate whether it is a legitimate workload, a faulty job, or a software defect before terminating it. If memory pressure is severe, they protect critical workloads and inspect OOM events. If storage is saturated, they identify the responsible I/O source. Changes such as restarting services, adjusting limits, or moving workloads must be controlled and validated. Recovery is complete only when application response times and error rates return to acceptable levels.",
      steps: [
        "Confirm service impact and communicate the incident.",
        "Capture top, uptime, free, vmstat, and iostat output.",
        "Identify the dominant resource pressure.",
        "Identify the processes responsible for resource consumption.",
        "Inspect recent deployments, scheduled jobs, and workload changes.",
        "Check service and kernel logs for errors.",
        "Choose a targeted mitigation with an understood impact.",
        "Apply the mitigation through the approved operational procedure.",
        "Validate service response time, error rate, and resource usage.",
        "Monitor for recurrence and document the final root cause."
      ],
      commands: [
        "uptime",
        "top -b -n 1",
        "free -h",
        "vmstat 1 10",
        "iostat -xz 1 10",
        "ps -eo pid,ppid,stat,comm,%cpu,%mem --sort=-%cpu | head",
        "pidstat -dur 1 10",
        "journalctl -p err --since '30 minutes ago'",
        "systemctl status application.service",
        "systemctl --failed",
        "curl -sS -o /dev/null -w '%{http_code} %{time_total}\\n' http://127.0.0.1/health"
      ],
      problems: [
        {
          issue: "A runaway process consumes all CPU.",
          rootCause: "A faulty loop, excessive request processing, or an unexpected background job may be continuously consuming CPU.",
          solution: "Identify the process owner and purpose, inspect its logs and workload, and use an approved service-level mitigation before terminating it."
        },
        {
          issue: "The kernel terminates an application because of memory pressure.",
          rootCause: "The system or container reaches a memory limit and the OOM killer selects a process to terminate.",
          solution: "Inspect OOM logs, process memory growth, cgroup limits, and workload demand; correct the leak or capacity constraint and validate memory behavior."
        }
      ]
    },
    {
      heading: "13. Before and After Performance Optimization",
      explanation: "Performance optimization should demonstrate measurable improvement. Before optimization, administrators collect baseline response times, CPU utilization, memory pressure, disk latency, network behavior, and error rates. They identify the specific workload and define a success criterion. After optimization, they run the same representative workload and compare the measurements. For example, reducing unnecessary application retries may lower CPU usage and improve latency. Moving a heavy batch job outside peak hours may reduce storage contention. Increasing memory without correcting a leak may only delay another incident. The goal is not to achieve the lowest resource utilization; the goal is to deliver reliable application performance within acceptable cost and capacity limits.",
      steps: [
        "Before: record application latency and error rate.",
        "Before: record CPU, memory, disk, and network baselines.",
        "Before: identify the workload and reproduce the issue.",
        "Before: define the expected improvement and risk limits.",
        "During: change one variable at a time.",
        "During: record configuration and deployment changes.",
        "After: run the same workload and measurement interval.",
        "After: compare latency, throughput, saturation, and errors.",
        "After: confirm that no secondary workload became slower.",
        "After: document the measured improvement and rollback option."
      ],
      commands: [
        "uptime",
        "sar -u 1 10",
        "sar -r 1 10",
        "iostat -xz 1 10",
        "vmstat 1 10",
        "pidstat -dur 1 10",
        "curl -sS -o /dev/null -w '%{time_connect} %{time_starttransfer} %{time_total}\\n' http://127.0.0.1/",
        "systemctl status application.service",
        "journalctl -u application.service --since today"
      ],
      problems: [
        {
          issue: "CPU utilization decreases but application response time becomes worse.",
          rootCause: "The change may have reduced concurrency, introduced queueing, or shifted the bottleneck to another resource.",
          solution: "Compare throughput, latency distribution, queue depth, and dependency timings rather than judging optimization by CPU usage alone."
        },
        {
          issue: "Optimization results cannot be reproduced.",
          rootCause: "The test workload, traffic level, environment, or measurement interval differs between runs.",
          solution: "Use a repeatable workload, fixed test conditions, multiple samples, and documented environment details."
        }
      ]
    },
    {
      heading: "14. Performance Verification and Benchmarking",
      explanation: "Performance verification checks whether a system meets its expected service behavior under representative load. Benchmarks can measure CPU, memory, disk, and network performance, but synthetic benchmark results do not always reflect real application behavior. A useful test defines workload size, concurrency, duration, warm-up, measurement interval, and success criteria. Application metrics such as p50, p95, and p99 latency are often more meaningful than average response time alone. System-level verification should include CPU saturation, memory pressure, disk latency, network errors, and service stability. Tests should be performed in controlled environments and should not create unapproved load on production systems.",
      steps: [
        "Define the workload and expected service-level objectives.",
        "Choose a representative test environment.",
        "Record baseline resource and application metrics.",
        "Warm up the application before collecting results.",
        "Run a controlled test with known concurrency and duration.",
        "Capture latency percentiles, throughput, and error rate.",
        "Correlate application results with system resource metrics.",
        "Repeat the test to check consistency.",
        "Compare results with baseline and acceptance criteria.",
        "Stop testing safely and document the results."
      ],
      commands: [
        "lscpu",
        "free -h",
        "fio --name=readtest --filename=/tmp/fio-test --size=1G --rw=read --bs=4k --iodepth=16 --runtime=30 --time_based",
        "stress-ng --cpu 2 --timeout 30s",
        "iperf3 -s",
        "iperf3 -c SERVER_IP -t 30",
        "vmstat 1 10",
        "iostat -xz 1 10",
        "sar -u 1 10",
        "curl -sS -o /dev/null -w '%{http_code} %{time_total}\\n' http://127.0.0.1/"
      ],
      problems: [
        {
          issue: "Benchmark results are much better than real production performance.",
          rootCause: "The benchmark may not reproduce real traffic patterns, application dependencies, data size, concurrency, or storage behavior.",
          solution: "Use production-like datasets and representative request patterns in a controlled test environment."
        },
        {
          issue: "Benchmark causes an unexpected outage.",
          rootCause: "The test generated excessive CPU, memory, disk, or network load on a shared or production system.",
          solution: "Use isolated test hosts, conservative limits, explicit test windows, and monitoring with an immediate stop condition."
        }
      ]
    },
    {
      heading: "15. Memory Performance, Swap, and OOM Troubleshooting",
      explanation: "Linux memory management uses physical RAM, virtual memory, page cache, buffers, anonymous memory, and swap. Free memory alone is not a reliable indicator of memory health because Linux uses available RAM for cache that can be reclaimed when needed. MemAvailable is generally more useful for estimating memory available to new workloads. Swap activity can indicate memory pressure, although configured swap may also be used for cold pages. Persistent swapping can increase latency. The OOM killer may terminate processes when the kernel cannot satisfy memory requirements. Administrators should monitor process RSS, memory growth over time, page faults, swap activity, and memory pressure. Container memory limits must also be considered because a process can be OOM-killed inside a container while the host still has free memory.",
      steps: [
        "Check total, used, available, and swap memory.",
        "Inspect the largest process memory consumers.",
        "Track RSS growth over time.",
        "Inspect swap-in and swap-out activity.",
        "Check memory pressure and OOM events.",
        "Inspect container or systemd memory limits.",
        "Identify memory leaks, excessive caches, or oversized workloads.",
        "Apply a targeted fix and verify memory stability."
      ],
      commands: [
        "free -h",
        "cat /proc/meminfo",
        "vmstat 1 10",
        "swapon --show",
        "ps aux --sort=-%mem | head",
        "ps -eo pid,comm,rss,vsz,%mem --sort=-rss | head",
        "pidstat -r 1 10",
        "cat /proc/pressure/memory",
        "journalctl -k | grep -iE 'out of memory|oom|killed process'",
        "systemctl show application.service -p MemoryCurrent -p MemoryMax"
      ],
      problems: [
        {
          issue: "A process memory footprint increases continuously.",
          rootCause: "The application may contain a memory leak, unbounded cache, retained objects, or a workload that grows without limits.",
          solution: "Track RSS over time, inspect application heap and allocation profiles, and correct the leak or configure an appropriate bounded cache."
        },
        {
          issue: "Server becomes unresponsive due to heavy swap activity.",
          rootCause: "The active workload exceeds available physical memory or memory reclaim is unable to keep up.",
          solution: "Identify memory consumers, reduce unnecessary workload, correct leaks, and evaluate appropriate capacity or application memory limits."
        }
      ]
    },
    {
      heading: "16. CPU Scheduling, Process Priority, and Security",
      explanation: "Linux scheduling determines how runnable tasks share CPU resources. Normal scheduling tasks use nice values, while real-time scheduling policies provide different priority behavior. Incorrect use of real-time scheduling can starve other tasks and make a system difficult to manage. CPU affinity restricts a process or thread to selected CPUs, which can be useful for specialized workloads but may also create imbalance. Process limits and cgroups control resource consumption. Security controls such as permissions, namespaces, and cgroups influence which processes can access resources. Performance tuning must not weaken security or give unnecessary privileges to application processes.",
      steps: [
        "Identify the process and its current scheduling policy.",
        "Inspect nice value and CPU affinity.",
        "Review process limits and cgroup resource controls.",
        "Check whether workload priority matches operational requirements.",
        "Avoid unrestricted real-time scheduling for ordinary services.",
        "Apply resource limits through approved service configuration.",
        "Verify that security permissions remain least-privilege.",
        "Measure the effect on both the target and competing workloads."
      ],
      commands: [
        "ps -eo pid,ni,cls,rtprio,comm",
        "chrt -p PID",
        "taskset -cp PID",
        "nice -n 10 command",
        "renice 10 -p PID",
        "cat /proc/PID/limits",
        "systemctl show application.service",
        "systemd-cgtop",
        "cat /proc/PID/cgroup",
        "ulimit -a"
      ],
      problems: [
        {
          issue: "A high-priority process starves other system workloads.",
          rootCause: "An inappropriate real-time scheduling policy or priority may allow one workload to dominate CPU scheduling.",
          solution: "Review scheduling policy and service requirements, then restore a safe scheduling configuration through an approved change."
        },
        {
          issue: "An application fails after a resource limit is introduced.",
          rootCause: "The configured CPU, memory, process, or file descriptor limit may be lower than the application's legitimate requirement.",
          solution: "Inspect the effective cgroup and process limits, measure actual demand, and set limits based on tested workload capacity."
        }
      ]
    },
    {
      heading: "17. Disk I/O, Filesystem, and Storage Performance",
      explanation: "Storage performance affects application startup, database transactions, logging, package operations, and file access. Important measurements include throughput, IOPS, average request size, latency, queue depth, and utilization. High utilization alone does not always mean a disk is unhealthy; the impact depends on device type and workload. A database may be sensitive to small random I/O latency, while a backup workload may be sensitive to sequential throughput. Filesystem metadata operations and inode pressure can also affect performance. Storage bottlenecks may originate from local devices, network storage, cloud volumes, snapshots, or competing workloads. Administrators should identify the actual block device and mount point before making changes.",
      steps: [
        "Map application directories to their mounted filesystems.",
        "Check filesystem capacity and inode availability.",
        "Measure device throughput, latency, and queue depth.",
        "Identify processes generating disk I/O.",
        "Inspect kernel logs for storage resets and errors.",
        "Check whether backups or batch jobs overlap with peak traffic.",
        "Inspect cloud or network storage metrics when applicable.",
        "Apply workload scheduling or storage capacity changes only after evidence.",
        "Validate application latency after the correction."
      ],
      commands: [
        "lsblk -o NAME,SIZE,TYPE,MOUNTPOINTS",
        "findmnt",
        "df -hT",
        "df -i",
        "iostat -xz 1 10",
        "iotop -o",
        "pidstat -d 1 10",
        "vmstat 1 10",
        "cat /proc/diskstats",
        "journalctl -k | grep -iE 'I/O error|reset|timeout|failed'",
        "du -xhd1 /var"
      ],
      problems: [
        {
          issue: "Database latency increases during scheduled backups.",
          rootCause: "Backup activity may compete with database reads and writes for storage bandwidth and IOPS.",
          solution: "Measure the overlapping I/O workload, adjust backup scheduling or throttling, and validate database latency during peak activity."
        },
        {
          issue: "Filesystem has free space but applications cannot create new files.",
          rootCause: "The filesystem may have exhausted inodes or reached a quota.",
          solution: "Check df -i, filesystem quotas, and the number of small files in the affected directory."
        }
      ]
    },
    {
      heading: "18. Network Performance, Monitoring, and Alerting",
      explanation: "Network performance affects application response time, remote storage, database communication, APIs, and distributed services. Important measurements include throughput, packet drops, errors, retransmissions, latency, connection counts, and socket states. A network interface can show low throughput while an application is delayed by DNS resolution or a remote service. TCP retransmissions may indicate packet loss or congestion, while large numbers of connections can indicate traffic spikes or connection leaks. Monitoring should combine host interface metrics with end-to-end application latency and dependency health. Alerts should focus on sustained service impact rather than every temporary fluctuation.",
      steps: [
        "Inspect interface counters and link state.",
        "Measure throughput over time.",
        "Check TCP socket states and connection counts.",
        "Inspect retransmissions and packet errors.",
        "Test DNS resolution and endpoint connectivity.",
        "Measure end-to-end latency from the application host.",
        "Correlate network symptoms with service and application logs.",
        "Configure alerts for sustained drops, errors, latency, and saturation.",
        "Verify alert thresholds against normal traffic patterns."
      ],
      commands: [
        "ip -s link",
        "ip addr",
        "ip route",
        "ss -s",
        "ss -tan",
        "sar -n DEV 1 10",
        "sar -n TCP,ETCP 1 10",
        "nstat",
        "getent hosts example.com",
        "ping -c 5 SERVER_IP",
        "traceroute SERVER_IP",
        "curl -sS -o /dev/null -w '%{time_namelookup} %{time_connect} %{time_total}\\n' https://example.com"
      ],
      problems: [
        {
          issue: "Application requests time out even though local CPU and disk metrics are normal.",
          rootCause: "DNS resolution, packet loss, remote service latency, routing, or connection pool exhaustion may be responsible.",
          solution: "Measure DNS, TCP connection, TLS, and endpoint response times and inspect socket and network interface statistics."
        },
        {
          issue: "Network throughput is high but application performance remains poor.",
          rootCause: "High traffic may create congestion, packet loss, retransmissions, or overload a remote dependency.",
          solution: "Inspect latency, drops, retransmissions, connection queues, and server-side processing rather than relying only on throughput."
        }
      ]
    },
    {
      heading: "19. Real-World Performance Projects and Hands-On Labs",
      explanation: "Practical performance engineering projects teach administrators how to establish baselines, reproduce resource pressure, identify bottlenecks, and validate improvements. Labs should use disposable virtual machines or isolated environments with known resource limits. A CPU lab can generate controlled load and compare process metrics. A memory lab can demonstrate memory growth and OOM behavior. A storage lab can measure IOPS and latency. A network lab can compare throughput and connection behavior. A monitoring project can collect historical metrics and generate alerts. Never run stress tests or destructive storage benchmarks against production systems or shared devices without explicit approval.",
      steps: [
        "Project 1 - Build a Linux performance baseline using uptime, top, free, vmstat, and iostat.",
        "Project 2 - Generate controlled CPU load in a disposable VM and identify the responsible process.",
        "Project 3 - Monitor memory growth and identify a test application's RSS trend.",
        "Project 4 - Compare swap activity before and after a controlled memory workload.",
        "Project 5 - Run a safe storage benchmark against a dedicated test file.",
        "Project 6 - Measure network throughput between two isolated test hosts.",
        "Project 7 - Collect sar metrics and analyze a historical performance window.",
        "Project 8 - Investigate a simulated high-load incident and write a root cause report.",
        "Project 9 - Configure systemd resource limits for a test service.",
        "Project 10 - Build a performance dashboard with CPU, memory, disk, and network metrics.",
        "Project 11 - Configure alerts for sustained resource pressure and application latency.",
        "Project 12 - Compare before-and-after performance using a repeatable workload."
      ],
      commands: [
        "stress-ng --cpu 2 --timeout 30s",
        "vmstat 1 10",
        "pidstat -u 1 10",
        "free -h",
        "iostat -xz 1 10",
        "fio --name=lab --filename=/tmp/fio-lab --size=512M --rw=randread --bs=4k --iodepth=8 --runtime=20 --time_based",
        "iperf3 -s",
        "iperf3 -c SERVER_IP -t 20",
        "sar -u 1 10",
        "systemd-cgtop",
        "journalctl -p warning --since today"
      ],
      problems: [
        {
          issue: "A stress test affects other users on a shared server.",
          rootCause: "The test was executed without isolation, resource limits, or an approved maintenance window.",
          solution: "Use disposable VMs, dedicated test filesystems, conservative limits, and explicit stop conditions."
        },
        {
          issue: "Performance dashboard values do not match command-line measurements.",
          rootCause: "Metric aggregation, sampling intervals, units, counter resets, or host labels may be inconsistent.",
          solution: "Compare raw samples, verify units and time windows, and validate metric calculations against Linux system tools."
        }
      ]
    },
    {
      heading: "20. Linux Performance Interview Questions and Answers",
      explanation: "Performance interviews evaluate whether an administrator can interpret resource metrics, identify bottlenecks, and troubleshoot real production incidents. Strong answers distinguish utilization from saturation, explain why a metric may be misleading, and describe the next diagnostic command. Candidates should explain how they correlate operating system measurements with application response time and how they avoid risky tuning changes without evidence.",
      steps: [
        "Q1. What is Linux performance monitoring? Answer: It is the continuous measurement and analysis of CPU, memory, storage, network, and application behavior.",
        "Q2. Which command shows system load average? Answer: uptime or cat /proc/loadavg.",
        "Q3. What does load average represent? Answer: It represents the average number of runnable and uninterruptible tasks over 1, 5, and 15 minutes.",
        "Q4. Is load average the same as CPU utilization? Answer: No. Load average includes runnable tasks and tasks in uninterruptible sleep, while CPU utilization measures CPU time usage.",
        "Q5. Which command provides an interactive process view? Answer: top or htop.",
        "Q6. How do you identify the process consuming the most CPU? Answer: Use top or ps with CPU sorting, and confirm with interval-based pidstat measurements.",
        "Q7. What is the difference between user CPU and system CPU? Answer: User CPU is time executing application code, while system CPU is time executing kernel code.",
        "Q8. What does I/O wait mean? Answer: It represents CPU idle time while outstanding I/O operations exist; it is not a direct measurement of disk utilization.",
        "Q9. How do you check memory usage? Answer: Use free -h, /proc/meminfo, and process-level RSS measurements.",
        "Q10. Why is free memory sometimes low on Linux? Answer: Linux uses available memory for filesystem cache and can reclaim much of it when workloads need memory.",
        "Q11. What is swap? Answer: Swap is disk-backed virtual memory used to store memory pages that are not currently resident in physical RAM.",
        "Q12. How do you identify a memory-heavy process? Answer: Use ps sorted by RSS or inspect processes through top and pidstat.",
        "Q13. What is the OOM killer? Answer: It is a kernel mechanism that selects processes to terminate when memory allocation cannot be satisfied safely.",
        "Q14. How do you investigate an OOM event? Answer: Inspect kernel journal messages, process memory, memory pressure, and container or service limits.",
        "Q15. Which command checks disk I/O performance? Answer: iostat -xz 1 5 provides device throughput, utilization, queue, and latency-related statistics.",
        "Q16. What does await represent in iostat? Answer: It represents average time for I/O requests to be completed, including queue and service time.",
        "Q17. What is IOPS? Answer: IOPS means input/output operations per second and measures storage operation rate.",
        "Q18. What is the difference between throughput and IOPS? Answer: Throughput measures data transferred per second, while IOPS measures the number of operations per second.",
        "Q19. How do you identify a disk I/O-heavy process? Answer: Use iotop or pidstat -d and correlate process activity with device-level iostat metrics.",
        "Q20. What is vmstat used for? Answer: It reports process, memory, swap, I/O, system, and CPU statistics at selected intervals.",
        "Q21. What is pidstat used for? Answer: It reports resource usage for individual processes and can show CPU, memory, and I/O activity.",
        "Q22. What is sar? Answer: It is a system activity reporting tool that can collect and display historical resource statistics.",
        "Q23. How do you check per-core CPU utilization? Answer: Use mpstat -P ALL 1 5.",
        "Q24. What is CPU affinity? Answer: CPU affinity controls which CPU cores a process or thread is allowed to execute on.",
        "Q25. What is a nice value? Answer: It influences the scheduling priority of normal Linux processes; higher nice values generally mean lower priority.",
        "Q26. How do you investigate network performance? Answer: Inspect interface counters, socket statistics, retransmissions, DNS, and end-to-end endpoint latency.",
        "Q27. What is PSI in Linux? Answer: Pressure Stall Information reports time workloads spend stalled due to CPU, memory, or I/O resource pressure.",
        "Q28. How would you troubleshoot a slow Linux production server? Answer: Establish scope, collect CPU, memory, disk, and network metrics, identify the bottleneck, inspect logs, apply a targeted fix, and validate application health.",
        "Q29. Why should administrators avoid random kernel tuning? Answer: Kernel settings can affect the entire host and may worsen other workloads; tuning must be based on measured bottlenecks and controlled tests.",
        "Q30. How do you prove that a performance optimization worked? Answer: Run the same representative workload before and after the change and compare latency, throughput, resource pressure, and error rates."
      ],
      commands: [
        "uptime",
        "top",
        "free -h",
        "vmstat 1 5",
        "iostat -xz 1 5",
        "mpstat -P ALL 1 5",
        "pidstat -dur 1 5",
        "sar -u 1 5",
        "ss -s",
        "journalctl -k --since today"
      ],
      problems: [
        {
          issue: "Candidate says that adding more CPU always fixes high load average.",
          rootCause: "The candidate has not distinguished CPU-bound work from blocked I/O tasks and other sources of load.",
          solution: "Explain runnable tasks, uninterruptible sleep, I/O wait, storage latency, and the need to establish the actual bottleneck."
        },
        {
          issue: "Candidate recommends killing the largest memory process immediately.",
          rootCause: "The candidate has not considered service ownership, business impact, process purpose, or evidence preservation.",
          solution: "Identify the process owner and service, inspect memory trends and logs, select a controlled mitigation, and validate recovery."
        }
      ]
    }
  ]
};

export default data;
