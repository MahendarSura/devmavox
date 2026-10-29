
export const highCpuSpikeGuide = {
  title: "High CPU Spike — Real Production Troubleshooting",
  fileName: "HighCPUSpike.ts",
  category: "production",
  difficulty: "advanced",
  estimatedTime: "120–240 minutes",

  description:
    "A production incident response guide for sudden CPU saturation across Linux servers, containers, Kubernetes workloads, JVM/Tomcat applications, and cloud infrastructure. Includes evidence-driven diagnosis, safe mitigation, recovery verification, and prevention.",

  objectives: [
    "Determine whether CPU saturation affects a process, container, node, database, or the whole service.",
    "Measure customer impact and classify incident severity.",
    "Capture a time-correlated baseline before restarting or scaling workloads.",
    "Distinguish CPU saturation from memory pressure, I/O wait, CPU throttling, and load-average growth.",
    "Identify traffic spikes, inefficient code, hot loops, thread contention, garbage collection, and retry amplification.",
    "Use Linux, Kubernetes, JVM, and application observability tools safely.",
    "Choose a mitigation that protects customer traffic and avoids cascading failures.",
    "Verify service recovery and document the root cause with measurable corrective actions.",
  ],

  incidentScenario: {
    title: "Customer-facing API experiences sudden CPU saturation",
    timeline: [
      {
        time: "14:00 UTC",
        event:
          "API request rate increases after a product event or a newly deployed application version.",
      },
      {
        time: "14:02 UTC",
        event:
          "Application CPU rises from its normal baseline to sustained 90–100%.",
      },
      {
        time: "14:04 UTC",
        event:
          "Request latency and HTTP 5xx rates rise; some requests begin timing out.",
      },
      {
        time: "14:06 UTC",
        event:
          "Thread counts, queue depth, retry traffic, or garbage collection activity increase.",
      },
      {
        time: "14:10 UTC",
        event:
          "The on-call team correlates CPU metrics with traffic, deployment changes, runtime telemetry, and node/container limits.",
      },
      {
        time: "14:20 UTC",
        event:
          "A targeted mitigation is applied after the leading cause is supported by evidence.",
      },
    ],
    possibleCauses: [
      "Unexpected traffic increase, bot activity, or a traffic distribution change.",
      "New code causing a CPU-intensive loop, inefficient algorithm, or excessive serialization.",
      "A database or downstream service slowdown causing retries and extra work.",
      "JVM garbage collection overhead, excessive allocation, or JIT/runtime behavior.",
      "Thread contention, busy waiting, or high context-switch rates.",
      "A batch job, scheduled task, migration, or background worker running unexpectedly.",
      "Container CPU limits causing throttling and increased request latency.",
      "A noisy neighbor or contention on a shared node.",
      "A database query plan regression or an expensive report/query workload.",
      "Cryptographic work, compression, regular expressions, or large payload processing.",
      "A runaway process, malicious traffic, or unexpected executable.",
    ],
    keyPrinciple:
      "High CPU is a symptom, not a root cause. Preserve evidence and identify the CPU-consuming work before restarting, scaling, or changing resource limits.",
  },

  impactAndSeverity: {
    principle:
      "Use the organization's incident policy and actual customer impact. The levels below are illustrative.",
    levels: [
      {
        severity: "SEV1",
        criteria:
          "Critical customer workflows are unavailable, multiple services are failing, or CPU saturation is causing widespread timeouts and cascading failure.",
        actions: [
          "Declare an incident and appoint an incident commander.",
          "Prioritize critical customer traffic and prevent further cascading load.",
          "Engage application, platform, runtime, and downstream service owners.",
          "Use the approved mitigation and escalation procedure.",
        ],
      },
      {
        severity: "SEV2",
        criteria:
          "A major service is significantly degraded, with sustained CPU saturation, high latency, or elevated error rates.",
        actions: [
          "Identify affected versions, replicas, nodes, and regions.",
          "Correlate CPU with request rate, queue depth, throttling, and downstream latency.",
          "Assign an owner for mitigation and another for root-cause investigation.",
        ],
      },
      {
        severity: "SEV3",
        criteria:
          "A limited workload is degraded, or CPU remains elevated without major customer impact.",
        actions: [
          "Investigate before the resource margin disappears.",
          "Check capacity headroom and whether the spike is recurring.",
        ],
      },
      {
        severity: "SEV4",
        criteria:
          "A short-lived or isolated CPU spike has little or no customer impact.",
        actions: [
          "Record the event and review whether alert thresholds or capacity planning need improvement.",
        ],
      },
    ],
    questions: [
      "Which customer-facing endpoints or background jobs are affected?",
      "Is CPU high on one process, one container, one node, or every replica?",
      "Are latency, 5xx errors, timeouts, and queue depth rising too?",
      "Did traffic increase, or did CPU per request increase?",
      "Did a deployment, configuration change, scheduled job, or traffic-routing change happen recently?",
      "Is CPU usage genuinely high, or is the container being throttled?",
      "Is the service constrained by CPU, memory, disk I/O, network I/O, or a downstream dependency?",
      "Are all replicas equally affected, or is one replica a hotspot?",
      "Is the issue still progressing, stable, or already recovering?",
    ],
  },

  incidentCommand: {
    roles: [
      {
        role: "Incident Commander",
        responsibility:
          "Coordinates incident response, customer impact, priorities, escalation, and communication.",
      },
      {
        role: "Application Owner",
        responsibility:
          "Investigates request paths, release changes, CPU-heavy code, thread behavior, and application telemetry.",
      },
      {
        role: "Platform / SRE",
        responsibility:
          "Checks Linux processes, container limits, Kubernetes scheduling, node contention, and autoscaling.",
      },
      {
        role: "Runtime Specialist",
        responsibility:
          "Investigates JVM/GC/thread behavior or the relevant language runtime when evidence points to runtime overhead.",
      },
      {
        role: "Scribe",
        responsibility:
          "Records UTC timestamps, metrics, commands, evidence, approvals, mitigations, and verification results.",
      },
    ],
    rules: [
      "Use one incident channel and one authoritative timeline.",
      "Assign one owner per investigation area to avoid duplicate expensive diagnostics.",
      "Capture a short evidence window before restarting or replacing a workload whenever safe.",
      "Do not run heavyweight profilers across every production replica at once.",
      "Record the expected benefit and rollback plan before changing replicas, CPU limits, or traffic routing.",
    ],
  },

  safetyChecks: [
    "Confirm the correct cloud account, region, cluster, namespace, node, workload, process, and environment.",
    "Verify whether the affected system is production, staging, a primary workload, or a critical background worker.",
    "Use approved credentials and least-privilege diagnostic access.",
    "Capture CPU, latency, error rate, traffic, memory, throttling, and recent deployment evidence before a restart.",
    "Avoid rebooting a node or restarting every replica as the first response.",
    "Do not kill processes based only on their CPU percentage; establish ownership and service impact first.",
    "Do not run unbounded profilers, stress tests, heap dumps, or repeated thread dumps during an active outage.",
    "Do not increase CPU limits blindly; verify node capacity, quotas, scheduling, and the actual bottleneck.",
    "Do not scale replicas without checking database connection budgets, downstream capacity, queue consumers, and retry behavior.",
    "Do not disable authentication, rate limits, TLS, or security controls to reduce CPU.",
    "Treat unexpected processes or unexplained executable changes as a possible security incident; preserve evidence and follow the security response process.",
    "Redact customer data, authorization headers, secrets, and sensitive payloads from logs and profiling artifacts.",
  ],

  evidenceCollection: {
    timeWindow: [
      "Last known healthy timestamp and first abnormal metric.",
      "A short baseline before the spike, the spike interval, and the recovery interval.",
      "Deployment, configuration, traffic-routing, and autoscaling event timestamps.",
      "Scheduled jobs, batch runs, migrations, and incident actions.",
    ],
    serviceMetrics: [
      "Request rate, concurrent requests, latency percentiles, and 4xx/5xx rates.",
      "CPU usage per replica and CPU consumption per request.",
      "Queue depth, worker backlog, thread count, and request timeouts.",
      "Retry rate, circuit-breaker activity, and downstream latency.",
      "Replica count, autoscaling decisions, restarts, and readiness failures.",
      "Workload-specific metrics such as JVM GC time, allocation rate, or event-loop lag.",
    ],
    hostMetrics: [
      "Process CPU, user/system CPU, and thread-level CPU.",
      "CPU utilization per core and run queue.",
      "Load average, context switches, and runnable processes.",
      "Memory pressure, swap activity, and out-of-memory events.",
      "Disk I/O wait, storage latency, and network activity.",
      "CPU steal time on virtual machines, where available.",
      "Cgroup CPU usage, quota, throttled periods, and throttled time.",
    ],
    changeEvidence: [
      "Application version, image digest, Git commit, and release timestamp.",
      "CPU request/limit changes and autoscaler configuration.",
      "JVM flags, runtime version, pool sizes, and garbage collector configuration.",
      "Traffic policy, cache settings, feature flags, and scheduled job configuration.",
      "Recent dependency, query, schema, or external-service changes.",
    ],
    rules: [
      "Use a common UTC timeline and compare affected and healthy replicas.",
      "Prefer existing metrics and sampled profiling before enabling new instrumentation.",
      "Keep samples bounded and collect only what is needed to answer a hypothesis.",
      "Do not assume a single CPU sample represents sustained saturation.",
    ],
  },

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm customer impact and scope",
      objective:
        "Determine whether the CPU alert is an isolated metric or a real service incident.",
      actions: [
        "Check latency percentiles, error rates, request rate, and critical workflows.",
        "Identify affected services, versions, replicas, nodes, regions, and tenants.",
        "Compare current metrics with the same service's normal traffic and CPU baseline.",
        "Check whether CPU rose before or after latency and error rates.",
      ],
      decisions: [
        {
          if: "CPU is high but latency and errors remain normal",
          then:
            "Check batch work, normal traffic growth, and remaining capacity. Investigate the spike, but do not assume immediate service failure.",
        },
        {
          if: "CPU and latency rise together",
          then:
            "Investigate CPU saturation, throttling, queueing, and request processing cost.",
        },
        {
          if: "Errors rise before CPU",
          then:
            "Investigate retries, fallback logic, error logging loops, and downstream failures that may be creating CPU pressure.",
        },
        {
          if: "Only one replica is hot",
          then:
            "Compare its traffic, version, queue depth, node placement, and runtime metrics with healthy replicas.",
        },
        {
          if: "All replicas and nodes are affected",
          then:
            "Check shared traffic patterns, common dependencies, shared infrastructure, and fleet-wide releases.",
        },
      ],
    },

    {
      step: 2,
      title: "Check Linux CPU and process-level usage",
      objective:
        "Identify which processes and CPU states are consuming resources.",
      commands: [
        {
          command: "uptime",
          purpose:
            "Shows uptime and load averages.",
          interpretation:
            "Load average includes runnable tasks and certain uninterruptible tasks; it is not the same as CPU utilization.",
        },
        {
          command: "top",
          purpose:
            "Interactive view of CPU, memory, processes, and thread activity.",
          interpretation:
            "Inspect overall CPU states, top consumers, and whether processes remain hot over several samples.",
        },
        {
          command: "ps -eo pid,ppid,comm,%cpu,%mem,nlwp,etime --sort=-%cpu | head -20",
          purpose:
            "Lists a bounded sample of processes sorted by CPU, with thread count and elapsed time.",
          interpretation:
            "Use this to identify candidate processes, then verify their service ownership before action.",
        },
        {
          command: "pidstat -u -t -p <PID> 1 5",
          purpose:
            "If sysstat is installed, samples process and thread CPU usage at one-second intervals.",
          interpretation:
            "Thread-level samples can help identify whether a small number of threads dominate CPU.",
        },
        {
          command: "mpstat -P ALL 1 5",
          purpose:
            "If sysstat is installed, samples per-CPU utilization.",
          interpretation:
            "A single saturated core can affect latency even if aggregate host CPU looks moderate.",
        },
        {
          command: "vmstat 1 5",
          purpose:
            "Samples runnable tasks, memory/swap activity, and CPU states.",
          interpretation:
            "Check runnable queue, swap activity, and I/O wait alongside CPU usage.",
        },
      ],
      decisions: [
        {
          if: "One process dominates CPU",
          then:
            "Map the PID to its service, version, and workload. Continue with application/runtime profiling and request correlation.",
        },
        {
          if: "Many processes are consuming CPU",
          then:
            "Check traffic growth, worker fan-out, scheduled jobs, node contention, and shared dependencies.",
        },
        {
          if: "System CPU is unusually high",
          then:
            "Investigate kernel/network/storage work, context switching, interrupts, and container/node activity.",
        },
        {
          if: "I/O wait or uninterruptible tasks dominate",
          then:
            "Investigate storage or other I/O stalls rather than assuming a pure CPU bottleneck.",
        },
      ],
      caution:
        "Process CPU percentages and sampling behavior differ between tools. Commands may be unavailable in minimal containers; use the approved host or observability platform instead.",
    },

    {
      step: 3,
      title: "Check traffic, CPU per request, and retry amplification",
      objective:
        "Separate increased demand from increased cost per operation.",
      measurements: [
        "Requests per second before and during the incident.",
        "CPU seconds per request or CPU utilization normalized by throughput.",
        "Concurrent requests, queue depth, and worker utilization.",
        "Retries per request, failed dependency calls, and timeout rates.",
        "Payload size, serialization/compression volume, and cache hit ratio.",
        "Traffic distribution by endpoint, tenant, region, and client class.",
      ],
      decisions: [
        {
          if: "Traffic increases while CPU per request stays near baseline",
          then:
            "Investigate traffic shaping, autoscaling, capacity headroom, and whether downstream systems can support additional replicas.",
        },
        {
          if: "Traffic is stable but CPU per request rises",
          then:
            "Prioritize code changes, query behavior, payload changes, cache misses, runtime overhead, and expensive request paths.",
        },
        {
          if: "Retries increase with downstream latency",
          then:
            "Inspect retry policy, timeout alignment, circuit breakers, and dependency health. Use bounded retries with backoff and jitter.",
        },
        {
          if: "A single endpoint or tenant dominates CPU",
          then:
            "Use approved rate limiting or workload isolation while investigating the expensive request path.",
        },
      ],
      caution:
        "Scaling alone may multiply traffic to an already failing database or downstream service. Check dependency capacity before adding replicas.",
    },

    {
      step: 4,
      title: "Check container CPU requests, limits, and throttling",
      objective:
        "Determine whether CPU limits or container scheduling are contributing to latency.",
      commands: [
        {
          command: "kubectl top pods -n <namespace>",
          purpose:
            "Shows recent pod CPU and memory metrics when the Metrics API is available.",
          caution:
            "This is a snapshot and may not include the exact incident peak.",
        },
        {
          command: "kubectl top nodes",
          purpose:
            "Shows recent node CPU and memory usage when metrics are available.",
          caution:
            "Node-level metrics do not identify all workload-specific bottlenecks.",
        },
        {
          command: "kubectl describe pod <pod> -n <namespace>",
          purpose:
            "Shows container requests/limits, scheduling details, restart history, and events.",
          caution:
            "Review output for sensitive environment or configuration details before sharing.",
        },
        {
          command: "kubectl get pod <pod> -n <namespace> -o jsonpath='{.spec.containers[*].resources}'",
          purpose:
            "Inspects configured container resource requests and limits.",
          caution:
            "Configured limits are not actual usage. Compare with runtime metrics and throttling counters.",
        },
      ],
      inspect: [
        "Container CPU usage relative to its configured CPU limit.",
        "Cgroup throttled periods and throttled time.",
        "CPU requests, limits, QoS class, and node allocatable capacity.",
        "Pod placement and whether one node is disproportionately loaded.",
        "HPA target metrics, desired replicas, current replicas, and scaling events.",
        "CPU pressure from other workloads sharing the node.",
      ],
      decisions: [
        {
          if: "CPU usage is near the limit and throttling is high",
          then:
            "Check whether the workload needs more CPU, better code efficiency, or a different concurrency profile. Confirm node capacity and rollout risk before changing limits.",
        },
        {
          if: "Container CPU is low but requests remain slow",
          then:
            "Investigate downstream waits, lock contention, I/O, queueing, and per-core/runtime behavior.",
        },
        {
          if: "Node CPU is saturated across multiple workloads",
          then:
            "Check node capacity, noisy neighbors, placement, autoscaling, and critical workload priority.",
        },
        {
          if: "HPA is not adding replicas",
          then:
            "Inspect metric availability, HPA events, maximum replica limits, resource requests, quotas, and scheduling capacity.",
        },
      ],
      caution:
        "Kubernetes CPU metrics may be delayed or averaged. Confirm the monitoring backend's sampling interval and the container runtime's throttling metrics.",
    },

    {
      step: 5,
      title: "Check Kubernetes workload and rollout health",
      objective:
        "Determine whether the spike correlates with a deployment, uneven traffic, restarts, or scaling failure.",
      commands: [
        {
          command: "kubectl get deploy,rs,pods -n <namespace> -o wide",
          purpose:
            "Lists deployments, ReplicaSets, and pods to compare versions and placement.",
        },
        {
          command: "kubectl get hpa -n <namespace>",
          purpose:
            "Checks current and desired autoscaler replicas and reported metrics.",
        },
        {
          command: "kubectl get events -n <namespace> --sort-by=.lastTimestamp",
          purpose:
            "Shows recent namespace events when retained and available.",
          caution:
            "Events may expire or be incomplete; correlate with the monitoring platform.",
        },
        {
          command: "kubectl logs <pod> -n <namespace> --since=15m --timestamps",
          purpose:
            "Retrieves a bounded recent log window from the selected pod.",
          caution:
            "Logs can contain sensitive data. Use approved access and redact before sharing.",
        },
      ],
      decisions: [
        {
          if: "Only the new version has high CPU",
          then:
            "Compare code, image digest, feature flags, query patterns, and runtime settings with the known-good version. Consider an approved rollback if the release is implicated.",
        },
        {
          if: "One replica receives disproportionate traffic",
          then:
            "Inspect load balancing, sticky sessions, connection reuse, and readiness/routing behavior.",
        },
        {
          if: "HPA is at maximum replicas",
          then:
            "Check downstream capacity and node availability before raising the maximum. More replicas may increase database load.",
        },
        {
          if: "Pods cannot schedule",
          then:
            "Inspect node capacity, resource requests, quota, taints, affinity, and autoscaler constraints.",
        },
      ],
    },

    {
      step: 6,
      title: "Investigate JVM and Tomcat CPU hotspots",
      objective:
        "Find hot Java threads, garbage-collection overhead, or excessive thread activity.",
      commands: [
        {
          command: "jcmd <PID> VM.version",
          purpose:
            "Checks the JVM version when the command and permissions are available.",
        },
        {
          command: "jcmd <PID> Thread.print",
          purpose:
            "Captures a JVM thread dump for thread-state and stack inspection.",
          caution:
            "Thread dumps can briefly affect a busy JVM and contain sensitive stack/context data. Capture a small number at controlled intervals, not in a tight loop.",
        },
        {
          command: "jstat -gcutil <PID> 1000 5",
          purpose:
            "Samples selected JVM garbage-collection utilization counters when supported.",
          caution:
            "Interpret counters with the JVM version and collector in use; this is not a complete GC diagnosis.",
        },
        {
          command: "jcmd <PID> JFR.check",
          purpose:
            "Checks Java Flight Recorder status on supported JVMs.",
          caution:
            "JFR availability and command support depend on the runtime. Starting a recording requires approval and resource review.",
        },
      ],
      inspect: [
        "Hot Java threads and their stack traces.",
        "Repeated stack patterns across multiple controlled thread dumps.",
        "GC CPU/time, allocation rate, pause duration, and promotion behavior.",
        "Excessive object allocation, large payload processing, or cache churn.",
        "Busy loops, repeated exception handling, regular expressions, serialization, and compression.",
        "Thread contention, lock waiting, and high worker counts.",
        "Tomcat request thread activity, executor queues, and downstream waits.",
      ],
      decisions: [
        {
          if: "The same application stack repeatedly dominates hot threads",
          then:
            "Correlate the stack with request traces and profile the specific code path using an approved, bounded recording.",
        },
        {
          if: "GC activity is high and allocation rate is elevated",
          then:
            "Investigate allocation-heavy code, object churn, payload sizes, and cache behavior before changing heap or collector settings.",
        },
        {
          if: "Many threads are waiting on database or HTTP calls",
          then:
            "Investigate downstream latency and connection pools. Waiting threads alone do not prove they consume high CPU.",
        },
        {
          if: "Thread count is high with busy waiting",
          then:
            "Inspect concurrency loops, polling, lock contention, and executor configuration.",
        },
      ],
      caution:
        "A thread dump shows thread states and stacks, not a definitive CPU profile. Correlate it with thread-level CPU sampling or an approved profiler.",
    },

    {
      step: 7,
      title: "Investigate non-JVM runtimes and application profiling",
      objective:
        "Find CPU-heavy functions in the runtime actually used by the service.",
      options: [
        {
          runtime: "Go",
          diagnostics:
            "Use an approved pprof CPU profile and inspect the hottest functions. Confirm the profile endpoint is access-controlled and not exposed publicly.",
        },
        {
          runtime: "Node.js",
          diagnostics:
            "Inspect event-loop lag and CPU profiles using the runtime's supported profiler or diagnostic report features. Account for the impact of profiling in production.",
        },
        {
          runtime: "Python",
          diagnostics:
            "Use approved sampling profilers and inspect hot functions, serialization, loops, and concurrency behavior. Account for interpreter and native-extension behavior.",
        },
        {
          runtime: ".NET",
          diagnostics:
            "Use supported dotnet diagnostics and CPU profiling tools to inspect hot methods, thread-pool behavior, and garbage collection.",
        },
        {
          runtime: "Native/Linux process",
          diagnostics:
            "Use approved sampling tools such as perf where available, with limited duration and suitable permissions.",
        },
      ],
      decisions: [
        {
          if: "A small number of functions dominate CPU samples",
          then:
            "Optimize the hot path, reduce unnecessary work, and validate with a representative benchmark.",
        },
        {
          if: "CPU samples are spread across many functions",
          then:
            "Investigate workload volume, algorithmic complexity, fan-out, concurrency, and whether the service is simply under-provisioned.",
        },
        {
          if: "Profiling is unavailable or too risky during the incident",
          then:
            "Use existing traces, sampled telemetry, logs, and a reproduction in staging rather than enabling heavy diagnostics on the production fleet.",
        },
      ],
      caution:
        "Profiling tools and endpoints differ by runtime and version. Protect profile data, limit recording duration, and do not expose diagnostic endpoints publicly.",
    },

    {
      step: 8,
      title: "Check database and downstream dependency effects",
      objective:
        "Find cases where another service is causing extra CPU work or retry amplification.",
      inspect: [
        "Database query latency, connection-pool acquisition time, and connection count.",
        "External HTTP latency, timeout rates, and retry counts.",
        "Cache hit ratio, cache stampedes, and repeated recomputation.",
        "Queue depth, consumer concurrency, and failed-message retry loops.",
        "DNS, TLS, serialization, compression, and cryptographic overhead.",
        "Circuit-breaker state and fallback execution volume.",
      ],
      decisions: [
        {
          if: "CPU rises after downstream latency rises",
          then:
            "Inspect retries, busy polling, repeated serialization, and request fan-out. Reduce unnecessary work while protecting critical operations.",
        },
        {
          if: "Database latency and pool waits increase together",
          then:
            "Coordinate with the database owner; avoid scaling the application without checking aggregate database connections and query load.",
        },
        {
          if: "Cache misses increase sharply",
          then:
            "Investigate cache invalidation, key changes, expiration synchronization, and expensive recomputation.",
        },
        {
          if: "Queue retries dominate CPU",
          then:
            "Apply approved retry/backoff or consumer-concurrency controls and prevent unbounded redelivery loops.",
        },
      ],
    },

    {
      step: 9,
      title: "Check memory pressure, I/O, and virtualization signals",
      objective:
        "Avoid treating every high-load event as a pure CPU bottleneck.",
      commands: [
        {
          command: "free -h",
          purpose:
            "Shows memory and swap information on Linux.",
        },
        {
          command: "iostat -xz 1 5",
          purpose:
            "If sysstat is installed, samples block-device utilization and latency-related metrics.",
          caution:
            "Interpret device metrics in context; virtualization and storage layers can affect their meaning.",
        },
        {
          command: "pidstat -d -r -p <PID> 1 5",
          purpose:
            "If sysstat is installed, samples process I/O and memory behavior.",
        },
      ],
      inspect: [
        "Swap-in/swap-out activity and memory pressure.",
        "Disk latency, queue depth, and I/O wait.",
        "CPU steal time on virtual machines.",
        "Network retransmissions or excessive packet processing.",
        "OOM kills, restarts, and memory-related throttling or reclaim.",
      ],
      decisions: [
        {
          if: "I/O wait dominates",
          then:
            "Investigate storage latency and blocked I/O rather than optimizing CPU-bound code first.",
        },
        {
          if: "CPU steal time is elevated",
          then:
            "Check hypervisor/cloud host contention and provider metrics; compare with neighboring instances or another approved placement.",
        },
        {
          if: "Memory pressure or GC overhead coincides with CPU growth",
          then:
            "Investigate allocation, cache growth, swapping, and reclaim. Avoid arbitrary memory increases without capacity analysis.",
        },
      ],
    },

    {
      step: 10,
      title: "Check scheduled jobs, batch processing, and unexpected processes",
      objective:
        "Identify workload overlap or a process that should not be consuming CPU.",
      inspect: [
        "Cron/systemd timers, Kubernetes CronJobs, batch jobs, and data imports.",
        "Deployments, migrations, backup/compression tasks, and report generation.",
        "Unexpected process names, parent process, executable path, owner, and start time.",
        "Recent package or image changes and security alerts.",
        "Whether a scheduled job is running on multiple replicas unintentionally.",
      ],
      decisions: [
        {
          if: "A known batch job overlaps with the spike",
          then:
            "Check scheduling, concurrency, resource isolation, and whether the job can be paused safely under the runbook.",
        },
        {
          if: "An unknown process or suspicious executable is consuming CPU",
          then:
            "Preserve relevant evidence and involve security/on-call owners. Do not delete artifacts or terminate processes without the incident procedure.",
        },
        {
          if: "The same job runs on every replica",
          then:
            "Verify leader election, singleton-job design, scheduler configuration, and duplicate execution safeguards.",
        },
      ],
    },

    {
      step: 11,
      title: "Build a root-cause hypothesis and test it",
      objective:
        "Use evidence to distinguish initiating causes from symptoms.",
      method: [
        "Find the earliest abnormal signal in the incident timeline.",
        "Compare CPU, traffic, CPU per request, latency, errors, and downstream telemetry.",
        "Compare hot and healthy replicas, versions, and nodes.",
        "Write a testable hypothesis and identify evidence that could disprove it.",
        "Use a low-risk, bounded diagnostic or test-environment reproduction.",
        "Record confidence and remaining unknowns.",
      ],
      example:
        "CPU increases immediately after a release while request rate remains stable. CPU per request rises, and a profile shows a new serialization path dominates samples. This supports a release-related CPU regression more strongly than a simple traffic spike.",
      caution:
        "Correlation alone does not prove causation. A downstream incident can create retries that appear to be an application CPU regression.",
    },
  ],

  rootCauseMatrix: [
    {
      cause: "Traffic spike",
      evidence:
        "Request rate and concurrency increase before CPU, while CPU per request remains near baseline.",
      mitigation:
        "Use approved rate limiting, traffic shaping, caching, and safe capacity scaling after checking downstream capacity.",
    },
    {
      cause: "CPU-intensive code regression",
      evidence:
        "Traffic remains stable but CPU per request rises; profile samples identify a hot code path after a release.",
      mitigation:
        "Use an approved rollback or feature disablement, then fix and benchmark the hot path.",
    },
    {
      cause: "Retry amplification",
      evidence:
        "Dependency latency/timeouts rise first, followed by retries, CPU, and queue depth.",
      mitigation:
        "Use bounded retries with backoff and jitter, appropriate timeouts, and circuit-breaker behavior.",
    },
    {
      cause: "Container CPU throttling",
      evidence:
        "CPU usage approaches the limit, throttling counters increase, and latency worsens.",
      mitigation:
        "Review CPU requests/limits, node capacity, concurrency, and code efficiency before a controlled resource change.",
    },
    {
      cause: "JVM garbage collection overhead",
      evidence:
        "GC activity and allocation rate rise with CPU; GC logs or runtime metrics support the relationship.",
      mitigation:
        "Reduce unnecessary allocation or investigate heap/collector behavior with runtime-specific evidence.",
    },
    {
      cause: "Thread contention or busy loop",
      evidence:
        "Thread CPU samples or repeated stack traces point to a loop, polling path, or contention hotspot.",
      mitigation:
        "Fix the concurrency or polling behavior and validate under load.",
    },
    {
      cause: "Slow database or external dependency",
      evidence:
        "Downstream latency and pool waits increase before application queueing or retries.",
      mitigation:
        "Coordinate with the dependency owner and reduce unnecessary fan-out or retries.",
    },
    {
      cause: "Batch job overlap",
      evidence:
        "CPU increase aligns with a scheduled task, import, backup, or report workload.",
      mitigation:
        "Reschedule, bound concurrency, or isolate the workload under the approved procedure.",
    },
    {
      cause: "Node-level contention",
      evidence:
        "Several unrelated workloads on the same node degrade together, or CPU steal/host pressure rises.",
      mitigation:
        "Investigate placement and capacity; migrate or scale only through the approved platform procedure.",
    },
    {
      cause: "Memory or I/O pressure",
      evidence:
        "Swap, GC, I/O wait, storage latency, or reclaim activity correlates with degradation.",
      mitigation:
        "Relieve the actual resource bottleneck and verify memory/storage headroom.",
    },
    {
      cause: "Suspicious process",
      evidence:
        "Unexpected executable or process activity lacks a known workload explanation.",
      mitigation:
        "Follow the security incident process, preserve evidence, and isolate only under approved containment procedures.",
    },
  ],

  safeRecoveryWorkflow: {
    principle:
      "Mitigate the verified source of CPU pressure while preserving evidence and avoiding a cascading failure.",
    sequence: [
      "1. Declare the incident and identify the affected service and customer workflows.",
      "2. Confirm the correct host, process, container, namespace, and release.",
      "3. Capture a short baseline of CPU, latency, errors, traffic, throttling, and memory.",
      "4. Identify whether the issue is traffic-driven, code-driven, runtime-driven, or infrastructure-driven.",
      "5. Check database and downstream capacity before scaling application replicas.",
      "6. Choose the smallest approved mitigation and record the expected outcome.",
      "7. Apply a controlled rollback, feature disablement, traffic limit, concurrency reduction, or resource change as appropriate.",
      "8. Verify that the mitigation reduces CPU and improves customer-facing latency/errors.",
      "9. Watch for new bottlenecks, queue buildup, database overload, and recovery storms.",
      "10. Continue collecting bounded evidence to validate the root-cause hypothesis.",
      "11. Restore normal traffic and concurrency gradually when safe.",
      "12. Document temporary changes, owners, deadlines, and rollback/removal plans.",
    ],
    mitigations: [
      {
        action: "Rollback a release",
        when:
          "Evidence strongly links the spike to a recent deployment and the previous version is compatible with current data/schema state.",
        safety:
          "Follow the deployment rollback process and check schema changes, migrations, and mixed-version compatibility first.",
      },
      {
        action: "Disable a feature",
        when:
          "A specific optional or expensive feature is implicated and a tested feature flag exists.",
        safety:
          "Confirm business impact, flag semantics, and whether disabling it creates inconsistent state.",
      },
      {
        action: "Apply rate limiting or shed noncritical load",
        when:
          "Demand exceeds sustainable capacity or a specific request class dominates CPU.",
        safety:
          "Protect critical operations and follow approved customer-impact and security policies.",
      },
      {
        action: "Scale replicas",
        when:
          "The workload is horizontally scalable, additional node capacity exists, and downstream dependencies can absorb the traffic.",
        safety:
          "Check HPA limits, scheduling, database connections, queue semantics, and downstream capacity.",
      },
      {
        action: "Adjust CPU requests or limits",
        when:
          "Metrics demonstrate a CPU allocation/throttling problem and capacity is available.",
        safety:
          "Review scheduling, quotas, node headroom, and rollout behavior. Do not treat higher limits as a fix for inefficient code.",
      },
      {
        action: "Pause or reduce batch concurrency",
        when:
          "A known batch or background workload is consuming resources needed by critical traffic.",
        safety:
          "Check job idempotency, checkpointing, data consistency, and the effect of pausing mid-run.",
      },
      {
        action: "Restart or replace a workload",
        when:
          "An approved recovery procedure requires it or the process is irrecoverably stuck.",
        safety:
          "Capture evidence first where safe; check replicas, readiness, graceful shutdown, queue ownership, and restart-loop risk.",
      },
    ],
    neverDo: [
      "Do not restart the entire cluster as the first response.",
      "Do not kill a process without verifying ownership and impact.",
      "Do not run production stress tests to reproduce the spike.",
      "Do not enable a heavyweight profiler on every replica simultaneously.",
      "Do not scale application replicas without checking downstream capacity.",
      "Do not increase CPU or memory limits without verifying node capacity and the real bottleneck.",
      "Do not disable rate limits, authentication, or other security protections to reduce symptoms.",
      "Do not assume a successful restart proves the root cause is fixed.",
    ],
  },

  recoveryVerification: [
    "CPU utilization returns toward a known-good baseline or a justified sustainable level.",
    "CPU per request is understood and stable.",
    "Latency percentiles and error rates return to service objectives.",
    "Request rate, queue depth, and worker backlog stabilize.",
    "CPU throttling and run-queue pressure are acceptable for the workload.",
    "Memory, GC, I/O wait, and thread metrics are stable.",
    "Database and downstream services remain healthy after the mitigation.",
    "Autoscaling and replica distribution are stable.",
    "Critical customer workflows pass end-to-end checks.",
    "No duplicate batch processing or unsafe queue replay has occurred.",
    "Temporary rate limits, feature flags, or resource settings have documented owners and expiry/review dates.",
    "The service remains stable through the required observation window.",
  ],

  prevention: {
    observability: [
      "Monitor CPU utilization by process, container, node, and service.",
      "Track CPU per request and request rate to distinguish demand from efficiency regressions.",
      "Alert on sustained saturation together with latency, error rate, or queue growth.",
      "Monitor container throttling and HPA desired/current replicas.",
      "Track JVM GC, allocation rate, thread activity, or the equivalent runtime metrics.",
      "Correlate releases, feature flags, and configuration changes with performance telemetry.",
      "Monitor retries, downstream latency, circuit breakers, and cache hit ratio.",
    ],
    capacityAndDesign: [
      "Load-test realistic request mixes and concurrency before major releases.",
      "Maintain headroom for traffic spikes and node failures.",
      "Set resource requests and limits based on measured workload behavior.",
      "Calculate the downstream impact of adding replicas.",
      "Use bounded queues and backpressure where appropriate.",
      "Use timeouts, bounded retries, and backoff with jitter.",
      "Keep transactions and remote calls from holding expensive worker resources unnecessarily.",
      "Profile CPU-intensive paths and benchmark changes with representative data.",
    ],
    operations: [
      "Keep a known-good deployment and tested rollback process.",
      "Use canary or progressive delivery for risky performance changes.",
      "Control batch-job concurrency and avoid unintended duplicate scheduling.",
      "Practice CPU saturation, retry storm, dependency slowdown, and autoscaling scenarios in non-production.",
      "Document profiling permissions, sampling limits, and evidence retention.",
      "Review incidents for repeatable preventive actions and assign measurable owners.",
    ],
  },

  incidentReportTemplate: {
    incidentId: "",
    severity: "",
    service: "",
    environment: "production",
    region: "",
    cluster: "",
    namespace: "",
    workload: "",
    affectedVersion: "",
    startTimeUtc: "",
    detectionTimeUtc: "",
    mitigationTimeUtc: "",
    recoveryTimeUtc: "",
    customerImpact: "",
    baselineCpu: "",
    peakCpu: "",
    cpuPerRequestBefore: "",
    cpuPerRequestDuring: "",
    latencyBefore: "",
    latencyDuring: "",
    errorRateBefore: "",
    errorRateDuring: "",
    throttlingEvidence: "",
    runtimeEvidence: "",
    downstreamEvidence: "",
    rootCause: "",
    contributingFactors: [],
    evidence: [],
    timeline: [],
    mitigationApplied: "",
    rollbackPerformed: false,
    recoveryVerification: [],
    dataOrQueueIntegrityNotes: "",
    whatWorked: [],
    whatDidNotWork: [],
    correctiveActions: [
      {
        action: "",
        owner: "",
        priority: "",
        dueDate: "",
        successMeasure: "",
      },
    ],
    blamelessSummary:
      "Explain the system conditions, workload behavior, resource constraints, and missing safeguards that allowed the incident. Focus on system improvements rather than individual blame.",
  },

  handsOnLabs: [
    {
      lab: 1,
      title: "Diagnose a Linux CPU hotspot",
      environment: "Disposable Linux VM",
      tasks: [
        "Capture uptime, top, ps, and per-core CPU samples.",
        "Run a controlled CPU workload in the disposable VM.",
        "Identify the responsible process and observe CPU across several samples.",
        "Stop the test workload and verify that the system recovers.",
      ],
      success:
        "Explain the difference between load average, process CPU, per-core utilization, and I/O wait.",
    },
    {
      lab: 2,
      title: "Observe Kubernetes CPU throttling",
      environment: "Non-production Kubernetes cluster",
      tasks: [
        "Deploy a small test workload with a deliberately constrained CPU limit.",
        "Generate bounded test load in the test environment.",
        "Observe usage, throttling metrics, latency, and pod events.",
        "Adjust the test configuration and compare results.",
      ],
      success:
        "Explain why throttling can increase latency and why CPU usage alone may not reveal the full problem.",
    },
    {
      lab: 3,
      title: "Investigate a JVM hotspot",
      environment: "Disposable Java/Tomcat application",
      tasks: [
        "Run a controlled CPU-intensive test endpoint.",
        "Capture a small number of thread dumps and runtime metrics.",
        "Use an approved profiler in the test environment to identify the hot path.",
        "Fix the code or test workload and compare CPU per request.",
      ],
      success:
        "Distinguish thread state evidence from actual thread CPU usage and GC overhead.",
    },
    {
      lab: 4,
      title: "Simulate retry amplification",
      environment: "Local or staging service with a test dependency",
      tasks: [
        "Introduce controlled dependency latency in the test environment.",
        "Observe retries, CPU, queue depth, and request latency.",
        "Add bounded retries with backoff and appropriate timeouts.",
        "Repeat the test and compare amplification.",
      ],
      success:
        "Demonstrate how downstream latency can increase application CPU and how backpressure limits the impact.",
    },
    {
      lab: 5,
      title: "Write a CPU incident postmortem",
      environment: "Synthetic incident timeline",
      tasks: [
        "Correlate CPU, request rate, latency, errors, deployment events, and dependency metrics.",
        "Write a root-cause hypothesis supported by evidence.",
        "Document the mitigation and recovery verification.",
        "Assign preventive actions with owners and measurable success criteria.",
      ],
      success:
        "Produce a blameless incident report that distinguishes initiating cause from symptoms.",
    },
  ],

  interviewQuestions: [
    {
      question: "How do you troubleshoot 100% CPU in production?",
      answer:
        "Confirm impact and scope, capture CPU and latency baselines, identify the consuming process or container, correlate traffic and CPU per request, inspect throttling/runtime/downstream signals, test a root-cause hypothesis, apply the smallest safe mitigation, and verify recovery.",
    },
    {
      question: "What is the difference between CPU utilization and load average?",
      answer:
        "CPU utilization measures time spent in CPU states. Load average reflects tasks that are runnable and certain tasks in uninterruptible sleep, averaged over time. High load does not necessarily mean every CPU core is fully utilized.",
    },
    {
      question: "Why can CPU be high when traffic is stable?",
      answer:
        "A release regression, inefficient algorithm, increased payload size, cache misses, busy loop, garbage collection, or background job can increase CPU per request.",
    },
    {
      question: "What is CPU throttling in Kubernetes?",
      answer:
        "A container can be limited by its configured CPU quota. When it tries to use more CPU than allowed during the relevant quota period, it can be throttled, increasing latency even when the node has spare CPU.",
    },
    {
      question: "Why is scaling not always the right fix?",
      answer:
        "More replicas can overload a database or downstream service, multiply retry traffic, or fail to help a single-threaded hotspot. Verify scalability and downstream headroom first.",
    },
    {
      question: "How do you investigate high CPU in Java?",
      answer:
        "Correlate CPU and request metrics, inspect GC/allocation telemetry, sample hot threads, compare a small number of thread dumps, and use an approved bounded profiler to identify expensive code paths.",
    },
    {
      question: "Do thread dumps identify the CPU-consuming thread?",
      answer:
        "Not by themselves. They show thread state and stack snapshots. Correlate them with thread-level CPU sampling or a runtime profiler.",
    },
    {
      question: "How can a database problem cause application CPU saturation?",
      answer:
        "Slow dependency calls can trigger retries, polling, serialization, repeated work, queue buildup, and excessive concurrency. The database may be the initiating problem while application CPU saturation is a downstream symptom.",
    },
    {
      question: "What is retry amplification?",
      answer:
        "Failed or slow operations trigger additional attempts, increasing load on the application and dependency. Bounded retries, backoff, jitter, and circuit-breaker policies help control the amplification.",
    },
    {
      question: "What evidence do you collect before restarting a hot process?",
      answer:
        "CPU samples, process/thread identity, version, request rate, latency/errors, runtime metrics, throttling, recent changes, and bounded logs or profiles when safe.",
    },
    {
      question: "When is rollback appropriate?",
      answer:
        "When evidence links the incident to a release and the previous version is compatible with the current data/schema state. Use the approved rollback procedure and verify end-to-end behavior.",
    },
    {
      question: "How do you prove recovery?",
      answer:
        "Verify sustained CPU improvement, acceptable latency and errors, stable queues, healthy dependencies, acceptable throttling/runtime metrics, and successful critical workflows over the required observation window.",
    },
  ],

  completionChecklist: [
    "Incident severity and customer impact are recorded.",
    "Affected processes, containers, nodes, replicas, and versions are identified.",
    "CPU, traffic, CPU per request, latency, errors, and queues are correlated.",
    "Linux CPU states, run queue, and I/O wait are understood.",
    "Container CPU limits and throttling are checked where relevant.",
    "Runtime or application hotspots are investigated using safe evidence.",
    "Database and downstream dependency behavior is correlated.",
    "Recent releases, feature flags, and scheduled jobs are reviewed.",
    "A testable root-cause hypothesis is documented.",
    "The mitigation has an owner, approval, and recovery plan.",
    "Recovery is verified through customer-facing workflows.",
    "Temporary settings have owners and review deadlines.",
    "A blameless incident report and corrective actions are recorded.",
  ],

  officialReferences: [
    {
      title: "Linux man-pages — top",
      url: "https://man7.org/linux/man-pages/man1/top.1.html",
    },
    {
      title: "Linux man-pages — ps",
      url: "https://man7.org/linux/man-pages/man1/ps.1.html",
    },
    {
      title: "Linux man-pages — uptime",
      url: "https://man7.org/linux/man-pages/man1/uptime.1.html",
    },
    {
      title: "Linux perf documentation",
      url: "https://perf.wiki.kernel.org/",
    },
    {
      title: "Kubernetes — Resource Management for Pods and Containers",
      url: "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
    },
    {
      title: "Kubernetes — Horizontal Pod Autoscaling",
      url: "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/",
    },
    {
      title: "Kubernetes — Resource Metrics Pipeline",
      url: "https://kubernetes.io/docs/tasks/debug/debug-cluster/resource-metrics-pipeline/",
    },
    {
      title: "Java — jcmd Tool",
      url: "https://docs.oracle.com/en/java/javase/21/docs/specs/man/jcmd.html",
    },
    {
      title: "Java — Troubleshooting Guide",
      url: "https://docs.oracle.com/en/java/javase/21/troubleshoot/",
    },
    {
      title: "Go — pprof diagnostics",
      url: "https://go.dev/doc/diagnostics",
    },
    {
      title: "Node.js — Profiling",
      url: "https://nodejs.org/en/learn/getting-started/profiling",
    },
    {
      title: "Google SRE Book — Addressing Cascading Failures",
      url: "https://sre.google/sre-book/addressing-cascading-failures/",
    },
  ],

  notes: [
    "Linux commands require the relevant utilities and permissions; minimal containers may not include them.",
    "Kubernetes metrics and throttling data may be sampled or delayed. Use the monitoring backend's documented semantics.",
    "JVM, Go, Node.js, Python, and .NET profiling methods are runtime-specific; use tools compatible with the deployed version.",
    "A thread dump is not a CPU profile. Correlate stack evidence with CPU sampling and application telemetry.",
    "High CPU alone does not establish a code defect. Traffic, runtime overhead, resource throttling, and dependency failures can produce similar symptoms.",
    "This guide is a troubleshooting framework, not authorization to perform destructive production actions.",
  ],
} as const;

export default highCpuSpikeGuide;
