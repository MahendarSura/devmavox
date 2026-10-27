
export const outOfMemoryErrorGuide = {
  title: "Tomcat OutOfMemoryError - Production Troubleshooting",
  technology: "Apache Tomcat, Java JVM, Linux, Containers, Kubernetes",
  filePath: "app/troubleshooting-center/tomcat/OutOfMemoryError.ts",
  guideVersion: "1.0.0",

  objective: [
    "Identify the exact JVM memory failure instead of treating every OOM as a heap problem.",
    "Protect production traffic and preserve diagnostic evidence.",
    "Correlate JVM metrics, GC logs, heap dumps, thread dumps, deployment changes, and OS/container limits.",
    "Find the retaining object, allocation path, native-memory consumer, or capacity bottleneck.",
    "Recover safely, verify stability, and prevent recurrence."
  ],

  incidentScenario: {
    title: "Tomcat production application starts returning 500 errors",
    timeline: [
      "09:10 - A new application version is deployed.",
      "09:18 - API latency rises and some requests return HTTP 500.",
      "09:21 - Logs show java.lang.OutOfMemoryError: Java heap space.",
      "09:22 - Garbage collection becomes frequent; old-generation occupancy stays high.",
      "09:25 - The health check fails and the load balancer removes one instance.",
      "09:28 - Restart temporarily restores service, but memory grows again after traffic returns."
    ],
    possibleCauses: [
      "A collection or cache retains more objects than expected.",
      "A recent release introduces an unbounded buffer, response aggregation, or object-retention bug.",
      "A traffic increase or unusually large request exceeds the application's memory capacity.",
      "Slow downstream services cause requests and associated objects to remain live longer.",
      "A database result set or generated report is loaded entirely into memory.",
      "The JVM heap is undersized for the legitimate workload.",
      "A redeployment leaves classloaders or application threads alive.",
      "The Java heap is healthy, but native memory, direct buffers, metaspace, or OS limits are exhausted."
    ],
    initialResponse: [
      "Declare or link the incident and assign an incident commander.",
      "Confirm the affected service, environment, region, and number of instances.",
      "Check whether the failure is isolated to one JVM or affects all replicas.",
      "Stop risky deployments and configuration changes until the cause is understood.",
      "If multiple replicas exist, verify remaining capacity before removing or restarting any instance.",
      "Capture logs and available metrics before restarting the affected JVM.",
      "Do not automatically increase -Xmx or repeatedly restart without identifying the failure type."
    ]
  },

  impactAndSeverity: {
    severityGuide: [
      {
        severity: "SEV-1",
        criteria: "Critical customer journey unavailable, most or all replicas failing, sustained outage, or data-processing backlog threatening business operations.",
        action: "Page the owning team and incident commander; prioritize service restoration and preserve essential evidence."
      },
      {
        severity: "SEV-2",
        criteria: "Partial outage, repeated JVM crashes, major latency, frequent OOMs, or a reduced replica pool with little spare capacity.",
        action: "Mitigate quickly while collecting targeted diagnostic evidence."
      },
      {
        severity: "SEV-3",
        criteria: "One noncritical instance affected, automatic recovery is working, and customer impact is limited.",
        action: "Investigate promptly, track recurrence, and prevent the issue from spreading."
      }
    ],
    assess: [
      "Which endpoints and customer journeys are failing?",
      "Are requests timing out, returning 500, or being retried repeatedly?",
      "How many healthy instances remain, and can they handle current traffic?",
      "Did the JVM exit, become unresponsive, or recover after GC?",
      "Is the issue limited to one deployment, tenant, endpoint, or request size?",
      "Are queues, scheduled jobs, or asynchronous tasks accumulating?",
      "Is there any risk of duplicate processing if work is retried after a restart?",
      "Are disk space and inode availability sufficient for heap dumps and GC logs?"
    ]
  },

  safetyChecks: {
    beforeAnyChange: [
      "Confirm the correct host, pod, container, namespace, application, and JVM PID.",
      "Confirm whether this is production, staging, or a local environment.",
      "Check the deployment/change window and obtain required production approval.",
      "Record the current release, image digest, Java version, Tomcat version, and JVM arguments.",
      "Confirm the current -Xms, -Xmx, container memory limit, and available node memory.",
      "Check replica count, traffic distribution, autoscaling behavior, and remaining capacity.",
      "Check whether a heap dump or crash dump could contain passwords, tokens, customer data, or personal information.",
      "Check filesystem free space before enabling heap dumps or verbose GC logging.",
      "Confirm that dump storage has restricted permissions and an approved retention/deletion policy.",
      "Do not run multiple heap dumps or expensive diagnostic commands concurrently on a distressed JVM."
    ],
    prohibitedShortcuts: [
      "Do not blindly increase -Xmx beyond the container or host memory budget.",
      "Do not kill the process before collecting available evidence unless immediate recovery requires it.",
      "Do not copy heap dumps to an unapproved location or upload them to public services.",
      "Do not delete JVM logs, crash files, or dumps before checking retention and incident requirements.",
      "Do not disable health checks or restart loops simply to make the service appear healthy.",
      "Do not enable aggressive heap-dump-on-OOM behavior without assessing disk, security, and restart impact.",
      "Do not use System.gc() as a permanent memory-leak fix.",
      "Do not call jmap, jcmd, or other diagnostic tools against a guessed PID.",
      "Do not run a heap dump during peak traffic without considering pause time and disk impact."
    ]
  },

  failureTypeClassification: {
    title: "First classify the exact OutOfMemoryError",
    rules: [
      {
        signature: "java.lang.OutOfMemoryError: Java heap space",
        meaning: "A Java heap allocation could not be satisfied. This can be caused by a leak, large allocation, excessive concurrency, or insufficient heap capacity.",
        nextChecks: [
          "GC logs and post-GC old-generation occupancy",
          "Heap dump dominator tree and retained size",
          "Allocation size, request size, caches, collections, and release history"
        ]
      },
      {
        signature: "java.lang.OutOfMemoryError: GC overhead limit exceeded",
        meaning: "The JVM is spending excessive time in garbage collection while reclaiming too little memory.",
        nextChecks: [
          "GC frequency and pause time",
          "Post-GC live heap trend",
          "Heap dump retaining paths and allocation rate"
        ]
      },
      {
        signature: "java.lang.OutOfMemoryError: Metaspace",
        meaning: "Class metadata allocation is exhausted or cannot expand within configured or process limits.",
        nextChecks: [
          "Class loading and unloading metrics",
          "Classloader count and retained classloaders",
          "Repeated deployments, generated classes, proxy generation, and metaspace limits"
        ]
      },
      {
        signature: "java.lang.OutOfMemoryError: Compressed class space",
        meaning: "The JVM's compressed class pointer metadata area cannot satisfy an allocation.",
        nextChecks: [
          "Compressed class space usage and JVM configuration",
          "Class loading volume and classloader retention",
          "Actual JVM version and relevant memory flags"
        ]
      },
      {
        signature: "java.lang.OutOfMemoryError: Direct buffer memory",
        meaning: "Direct ByteBuffer allocation cannot be satisfied under the relevant direct-memory limit or available native memory.",
        nextChecks: [
          "Direct buffer pool usage and capacity",
          "Network and NIO buffer allocation/release paths",
          "Native memory and container limit"
        ]
      },
      {
        signature: "java.lang.OutOfMemoryError: unable to create native thread",
        meaning: "The JVM or operating system cannot create another native thread. Memory pressure is one possible cause, but process and OS thread limits also matter.",
        nextChecks: [
          "Thread count and thread creation rate",
          "Process/thread limits and cgroup PID limits",
          "Native memory, stack size, and thread-pool configuration"
        ]
      },
      {
        signature: "java.lang.OutOfMemoryError: Requested array size exceeds VM limit",
        meaning: "An array request exceeds the JVM's supported maximum array size. Simply increasing heap may not fix it.",
        nextChecks: [
          "Array length calculation and integer overflow",
          "Input size, decompression expansion, and aggregation logic",
          "Chunking or streaming design"
        ]
      },
      {
        signature: "java.lang.OutOfMemoryError: Out of swap space?",
        meaning: "Native allocation failed; the operating system may be unable to provide sufficient memory or swap.",
        nextChecks: [
          "OS and kernel logs",
          "RSS, swap, cgroup memory, and native allocations",
          "Other processes and host pressure"
        ]
      },
      {
        signature: "Container killed / exit code 137 / OOMKilled",
        meaning: "The container runtime or kernel may have killed the process because of a memory limit. A Java heap OutOfMemoryError message is not guaranteed.",
        nextChecks: [
          "Container termination reason and previous container state",
          "Container memory usage and limit",
          "Node pressure, kernel OOM evidence, and JVM native overhead"
        ]
      }
    ],
    caution: [
      "The exact message and JVM version matter. Preserve the full exception, cause chain, and surrounding logs.",
      "Exit code 137 alone does not prove a memory OOM; correlate it with runtime status and kernel evidence.",
      "A heap dump can be unavailable after an abrupt native or kernel kill."
    ]
  },

  evidenceCollection: {
    captureFirst: [
      "UTC/local timestamps and timezone",
      "Application release, Git commit, image digest, and deployment history",
      "Full OutOfMemoryError message and stack trace",
      "Tomcat catalina.out, application logs, access logs, and service-manager logs",
      "GC logs covering the minutes before and after the first symptom",
      "JVM heap/non-heap, process RSS, CPU, thread count, and container memory metrics",
      "Traffic rate, request latency, error rate, request sizes, and endpoint distribution",
      "Database latency, pool saturation, downstream timeouts, queue depth, and retry volume",
      "Host memory, swap, disk, inode, PID/thread limits, and kernel OOM messages",
      "Heap dump, class histogram, thread dump, or native-memory report when safe and available"
    ],
    timelineCorrelation: [
      "Mark the first alert, first OOM, last successful request, and first failed health check.",
      "Overlay deployment, traffic changes, batch jobs, cache warm-up, and configuration changes.",
      "Compare the affected JVM with a healthy peer running the same release.",
      "Compare memory slope before and after the suspected change.",
      "Record every mitigation and its measurable effect."
    ],
    redaction: [
      "Treat heap dumps as sensitive production data.",
      "Restrict access using approved IAM/RBAC and storage encryption.",
      "Avoid sharing raw dumps, request bodies, credentials, session data, or customer identifiers in tickets.",
      "Prefer summarized heap-analysis findings and redacted logs when collaborating."
    ]
  },

  diagnosticCommands: {
    note: "Run only the commands applicable to the actual runtime. Replace placeholders carefully. Commands are examples, not proof that every utility exists on every host or image.",
    identifyProcess: [
      "ps -eo pid,ppid,rss,vsz,nlwp,etime,args --sort=-rss | head -n 20",
      "pgrep -af 'org.apache.catalina.startup.Bootstrap|catalina'",
      "jcmd -l",
      "ps -p <PID> -o pid,ppid,rss,vsz,nlwp,etime,args"
    ],
    javaVersionAndFlags: [
      "java -version",
      "jcmd <PID> VM.version",
      "jcmd <PID> VM.command_line",
      "jcmd <PID> VM.flags"
    ],
    liveJVM: [
      "jcmd <PID> GC.heap_info",
      "jcmd <PID> GC.class_histogram",
      "jcmd <PID> Thread.print",
      "jstat -gcutil <PID> 1000 10"
    ],
    linuxHost: [
      "free -h",
      "vmstat 1 10",
      "df -h",
      "df -i",
      "ps -p <PID> -o pid,rss,vsz,nlwp,etime,args",
      "cat /proc/<PID>/status",
      "cat /proc/<PID>/limits",
      "dmesg -T | grep -Ei 'out of memory|oom-kill|killed process' ",
      "journalctl -k --since '30 minutes ago' "
    ],
    commandSafety: [
      "Use the PID of the target JVM, not the shell or a different Tomcat instance.",
      "jcmd generally needs compatible JDK tooling, OS permissions, and the correct user context.",
      "A class histogram or thread dump can add overhead. Measure risk before running repeatedly.",
      "jmap -dump and jcmd GC.heap_dump can pause or stress a production JVM; follow the team's diagnostic policy.",
      "Some commands may be unavailable in minimal containers. Use approved host-level or ephemeral diagnostic tooling instead.",
      "Never paste secrets or unredacted production output into a public issue."
    ]
  },

  diagnosticWorkflow: [
    {
      step: 1,
      name: "Confirm the incident and scope",
      actions: [
        "Check alert timestamps, service health, HTTP 5xx, latency, and JVM restarts.",
        "Determine whether one instance or the whole fleet is affected.",
        "Check if the service is actively failing or merely showing high but stable memory."
      ],
      decision: [
        "If all replicas fail together, investigate shared traffic, release, configuration, or downstream changes.",
        "If one replica is affected, compare its traffic distribution, age, release, and memory history with healthy peers.",
        "If the process was OOMKilled, inspect runtime and kernel evidence before assuming Java heap exhaustion."
      ]
    },
    {
      step: 2,
      name: "Identify the exact memory failure",
      actions: [
        "Read the full exception and first occurrence timestamp.",
        "Separate Java heap, GC overhead, metaspace, direct memory, native thread, array-size, and container OOM cases.",
        "Confirm Java version, collector, effective flags, heap limits, and container awareness."
      ],
      decision: [
        "Heap error: investigate live heap, allocation rate, and retained objects.",
        "Metaspace error: investigate class loading and classloader lifecycle.",
        "Direct/native/thread error: inspect native pools, process limits, thread growth, and cgroup usage.",
        "Container kill: correlate memory working set, RSS, limit, and kernel/runtime evidence."
      ]
    },
    {
      step: 3,
      name: "Establish memory and GC trends",
      actions: [
        "Compare heap used before GC, after GC, and maximum heap.",
        "Review GC frequency, pause duration, allocation rate, promotion, and post-GC live set.",
        "Compare heap trends with RSS, non-heap memory, direct buffers, and container usage.",
        "Check whether memory grows steadily, spikes under load, or fails to return to baseline."
      ],
      decision: [
        "Post-GC live heap rises continuously under comparable traffic: possible retention or leak.",
        "Live heap is stable but short-lived allocation and GC are high: possible allocation churn or workload burst.",
        "Heap is moderate while RSS approaches the limit: investigate native memory, threads, direct buffers, and JVM overhead.",
        "Memory rises only after large requests or reports: inspect request-level allocation and streaming."
      ]
    },
    {
      step: 4,
      name: "Check recent changes and workload",
      actions: [
        "Compare the current release with the last known-good release.",
        "Inspect changes to caches, collections, session state, serialization, reports, image processing, and response aggregation.",
        "Check new libraries, Java/Tomcat versions, JVM flags, container limits, and thread-pool changes.",
        "Correlate memory growth with traffic, tenant, endpoint, batch jobs, retries, and downstream latency."
      ],
      decision: [
        "Strong release correlation plus healthy prior version: prepare a controlled rollback if policy and compatibility permit.",
        "Traffic or payload correlation: rate-limit or reduce expensive work safely while investigating capacity.",
        "No release correlation: investigate long-running retention, periodic jobs, cache growth, and environmental changes."
      ]
    },
    {
      step: 5,
      name: "Capture safe diagnostic evidence",
      actions: [
        "Preserve logs and existing GC data first.",
        "Capture one thread dump if the JVM is responsive and it will help diagnose blocked work or excessive concurrency.",
        "Capture a heap dump only when storage, privacy, and pause-time risks are acceptable.",
        "If heap-dump-on-OOM was already configured, locate the dump and confirm it is complete before analysis.",
        "If the JVM has already exited, preserve crash files and use the last available logs or monitoring history."
      ],
      decision: [
        "Dump cannot be captured safely: prioritize mitigation and use existing telemetry.",
        "Dump is captured: analyze dominators, retained size, paths to GC roots, and class histogram.",
        "No Java OOM but runtime killed the process: prioritize container and kernel evidence."
      ]
    },
    {
      step: 6,
      name: "Isolate the retaining owner or exhausted resource",
      actions: [
        "Identify the classes with the largest retained heap, not just the largest shallow object size.",
        "Inspect dominator trees and paths to GC roots.",
        "Map objects to application-owned caches, static fields, sessions, thread locals, queues, listeners, or request processing.",
        "For native memory, correlate Native Memory Tracking where available with RSS, direct buffers, thread count, and process limits.",
        "Validate the hypothesis with a controlled reproduction, metric change, or before/after comparison."
      ],
      decision: [
        "One cache dominates retention: verify intended size, eviction, key cardinality, and value size.",
        "Many request objects retained by queues: inspect queue bounds, consumer throughput, retries, and backpressure.",
        "Classloaders retained after redeploy: inspect application threads, ThreadLocal values, JDBC drivers, and static references.",
        "No obvious retained heap: inspect allocation churn, native memory, direct buffers, thread stacks, and oversized allocations."
      ]
    },
    {
      step: 7,
      name: "Mitigate, verify, and prevent recurrence",
      actions: [
        "Choose the lowest-risk mitigation supported by evidence.",
        "Verify service health, error rate, latency, GC behavior, and remaining capacity after mitigation.",
        "Keep the incident open until memory remains stable under representative traffic.",
        "Create a follow-up with the root cause, code/configuration fix, tests, alerts, and an owner."
      ],
      decision: [
        "Rollback is safe and release-linked: follow the approved rollback plan.",
        "A single instance is unhealthy and spare capacity exists: drain and replace it after evidence capture.",
        "Fleet-wide memory pressure exists: reduce load or expensive work safely before adding capacity.",
        "A leak is confirmed: fix object lifecycle or retention; a restart alone is only temporary mitigation."
      ]
    }
  ],

  heapAnalysis: {
    collectHistogram: {
      command: "jcmd <PID> GC.class_histogram",
      purpose: "Shows class instance counts and shallow sizes at collection time; it is a clue, not a full leak proof.",
      cautions: [
        "Histogram generation may have noticeable overhead.",
        "Options and collection behavior vary by JDK version.",
        "Do not assume the largest shallow-size class is the root cause."
      ]
    },
    captureHeapDump: {
      command: "jcmd <PID> GC.heap_dump /secure-diagnostics/tomcat-heap.hprof",
      prerequisites: [
        "Confirm the path exists and is writable by the JVM user.",
        "Confirm sufficient free disk space and inode availability.",
        "Ensure the destination is access-controlled and encrypted according to policy.",
        "Estimate pause and disk impact; use an approved maintenance or diagnostic window when needed.",
        "Record the command, timestamp, PID, release, and whether the dump completed."
      ],
      cautions: [
        "Heap dumps can be very large and may pause or destabilize the JVM.",
        "A live-object dump may trigger a full GC depending on command options and JDK version.",
        "Check the installed JDK's jcmd documentation for exact syntax and behavior.",
        "Do not run repeated dumps just because the first analysis is inconclusive."
      ]
    },
    analysisSteps: [
      "Open the dump with an approved Java heap analyzer such as Eclipse MAT or another organization-approved tool.",
      "Check whether the dump is complete and whether the analyzer reports parse errors.",
      "Review the leak suspects report as a lead, not a final verdict.",
      "Sort the dominator tree by retained heap and inspect large retained subgraphs.",
      "Follow paths to GC roots to find why objects remain reachable.",
      "Check collection sizes, cache keys, session objects, ThreadLocal values, queue backlogs, and static fields.",
      "Compare two dumps from different times only if capture overhead and production risk are acceptable.",
      "Map findings to source code and the exact release; validate before changing production."
    ],
    interpretationExamples: [
      {
        finding: "A map holds millions of entries and dominates the heap.",
        likelyDirection: "Cache growth, missing eviction, high-cardinality keys, or incorrect tenant scoping.",
        validation: "Compare entry count, key cardinality, cache metrics, and retained paths."
      },
      {
        finding: "Large byte arrays are retained by response or upload objects.",
        likelyDirection: "Whole-file buffering, duplicate copies, unbounded aggregation, or oversized payloads.",
        validation: "Inspect allocation paths, payload sizes, and whether streaming/chunking is possible."
      },
      {
        finding: "Many session objects retain application data.",
        likelyDirection: "Session bloat, long session lifetime, large per-user state, or missing cleanup.",
        validation: "Review session metrics and the actual retained path without exposing session data."
      },
      {
        finding: "Runnable, Future, or task objects accumulate.",
        likelyDirection: "Unbounded executor queue, stuck consumers, repeated retries, or tasks retaining request context.",
        validation: "Compare queue depth, task age, executor saturation, and downstream latency."
      },
      {
        finding: "Classloader instances remain after redeployment.",
        likelyDirection: "Application threads, ThreadLocal values, static registries, JDBC drivers, or libraries retaining the old classloader.",
        validation: "Inspect classloader roots and thread ownership; compare repeated redeployments."
      }
    ]
  },

  garbageCollection: {
    enableForFutureRuns: {
      jdk9AndLater: "Use supported unified logging options, for example: -Xlog:gc*,safepoint:file=/var/log/tomcat/gc.log:time,uptime,level,tags",
      jdk8: "Use JVM-version-appropriate flags such as -XX:+PrintGCDetails -XX:+PrintGCDateStamps -Xloggc:/var/log/tomcat/gc.log",
      notes: [
        "Verify the flags against the exact Java build before rollout.",
        "Configure log rotation and size limits; avoid filling the root filesystem.",
        "Use the organization's standard observability agent when it already captures GC safely."
      ]
    },
    questionsToAnswer: [
      "How frequently does GC run, and how much time does it consume?",
      "Does the old-generation or post-GC live heap keep increasing?",
      "Are pauses correlated with latency spikes?",
      "Is allocation rate high because of normal traffic, retries, serialization, or a regression?",
      "Does memory recover after a traffic burst, or remain elevated?",
      "Did the collector, heap sizing, or Java version change recently?"
    ],
    interpretation: [
      "High heap before GC alone does not prove a leak.",
      "Persistently high post-GC live heap is stronger evidence of retention but still needs workload context.",
      "High allocation rate with stable live heap suggests churn or insufficient headroom, not necessarily a leak.",
      "Frequent long pauses can be a symptom of memory pressure and can also amplify request queues and timeouts.",
      "Do not switch garbage collectors during an incident without compatibility testing and a controlled change plan."
    ]
  },

  memoryAreasAndNativeMemory: {
    javaHeap: {
      symptoms: ["Java heap space", "GC overhead limit exceeded", "High old-generation occupancy"],
      checks: [
        "Effective -Xms and -Xmx",
        "GC logs and live heap",
        "Heap dump retained size and GC roots",
        "Object allocation rate and payload sizes"
      ]
    },
    metaspace: {
      symptoms: ["Metaspace", "Compressed class space", "Class metadata usage grows over time"],
      checks: [
        "Class loading/unloading counts",
        "Metaspace used and committed",
        "Classloader lifecycle and repeated redeployments",
        "Runtime-generated classes and proxy generation"
      ],
      warning: "Raising MaxMetaspaceSize can delay failure but will not fix classloader leaks or unbounded class generation."
    },
    directBuffers: {
      symptoms: ["Direct buffer memory", "RSS grows while heap is comparatively stable"],
      checks: [
        "BufferPoolMXBean metrics for direct and mapped buffers",
        "NIO/network library allocation and release lifecycle",
        "Direct-memory limit and total process memory",
        "Native allocator behavior and library-specific metrics"
      ],
      warning: "Do not assume every direct-memory allocation is owned by Tomcat; inspect the actual network, database, or application library."
    },
    threads: {
      symptoms: ["unable to create native thread", "Rapidly increasing thread count", "High RSS"],
      checks: [
        "Thread dump and thread count over time",
        "Tomcat connector and executor settings",
        "Application-created executors and scheduled tasks",
        "Process limits, cgroup PID limit, and stack-size settings",
        "Blocked threads and downstream calls that hold request workers"
      ],
      warning: "Reducing -Xss may lower per-thread stack reservation but requires testing and does not fix uncontrolled thread creation."
    },
    nativeMemoryTracking: {
      enableForFutureRuns: [
        "Add -XX:NativeMemoryTracking=summary at JVM startup if its overhead is acceptable.",
        "Restart under the approved change process because this option generally requires startup configuration.",
        "Use jcmd <PID> VM.native_memory summary when NMT is enabled.",
        "Use jcmd <PID> VM.native_memory baseline and jcmd <PID> VM.native_memory summary.diff for supported comparisons."
      ],
      limitations: [
        "NMT is not enabled retroactively for allocations made before startup tracking.",
        "NMT adds overhead and does not account for every third-party native allocation.",
        "NMT output is not identical to RSS and should be correlated with OS metrics.",
        "Verify command availability and syntax for the installed JDK."
      ]
    }
  },

  tomcatSpecificChecks: {
    configuration: [
      "Inspect the active CATALINA_BASE and CATALINA_HOME; multiple Tomcat instances may exist.",
      "Inspect the effective startup command and environment rather than assuming a local setenv.sh is loaded.",
      "On Linux, review the instance's bin/setenv.sh if used by the deployment.",
      "For systemd, inspect the actual service unit, drop-ins, environment files, and service status.",
      "For containers, inspect the image entrypoint, environment variables, resource limits, and runtime arguments.",
      "Check for duplicate or conflicting JVM flags injected by scripts, systemd, Helm, or deployment tooling.",
      "Check application-specific pool, cache, session, and executor configuration.",
      "Confirm that GC logs and dump paths are writable by the actual service user."
    ],
    commands: [
      "systemctl status <tomcat-service>",
      "systemctl cat <tomcat-service>",
      "journalctl -u <tomcat-service> --since '30 minutes ago'",
      "ps -p <PID> -o pid,ppid,rss,vsz,nlwp,etime,args"
    ],
    commonApplicationPatterns: [
      "Loading an entire CSV, Excel file, PDF, archive, or database result into memory.",
      "Generating a large report or export entirely in a byte array.",
      "Caching responses without bounds or expiry.",
      "Storing large objects in HTTP session state.",
      "Using ThreadLocal to hold request or application objects without cleanup.",
      "Queueing unlimited asynchronous tasks when a database or downstream API is slow.",
      "Keeping JDBC results, streams, or response buffers open longer than intended.",
      "Repeated redeployments leaking threads or references to an old application classloader."
    ],
    notes: [
      "Tomcat is not automatically the cause simply because the exception appears in catalina.out.",
      "Identify whether the retaining objects belong to Tomcat internals, a web application, a framework, or a library.",
      "Configuration names and defaults differ across Tomcat versions and pool implementations."
    ]
  },

  containerAndKubernetesChecks: {
    kubectl: [
      "kubectl get pods -n <namespace> -o wide",
      "kubectl describe pod <pod> -n <namespace>",
      "kubectl logs <pod> -n <namespace> --since=30m",
      "kubectl logs <pod> -n <namespace> --previous",
      "kubectl get events -n <namespace> --sort-by=.lastTimestamp",
      "kubectl top pod <pod> -n <namespace> --containers"
    ],
    checks: [
      "Check last termination reason, restart count, OOMKilled status, and previous-container logs.",
      "Compare container memory usage against the actual memory limit, not just node capacity.",
      "Check pod requests and limits, node memory pressure, and neighboring workloads.",
      "Check whether heap sizing is container-aware for the deployed Java version.",
      "Account for heap, metaspace, direct buffers, thread stacks, code cache, JVM native allocations, and other process memory.",
      "Check whether a sidecar contributes to pod-level memory consumption.",
      "Check readiness/liveness probe failures and whether probe timeouts are a symptom of long GC pauses.",
      "Review HPA behavior and whether scaling out is possible under current quotas and capacity."
    ],
    interpretation: [
      "kubectl top shows a point-in-time measurement; use historical metrics for trends.",
      "A pod memory limit applies to the container or pod configuration according to the runtime setup; verify the actual enforcement model.",
      "An OOMKilled container may exit before Java writes a heap dump.",
      "Do not raise pod limits without checking node capacity, scheduling, quota, and the full process memory budget."
    ]
  },

  rootCauseMatrix: [
    {
      signal: "Post-GC heap grows steadily across comparable load periods",
      likelyCause: "Object retention or a growing live working set",
      confirmWith: "Heap dump, dominator tree, paths to GC roots, repeated measurements",
      fixDirection: "Bound or release the retaining structure; verify with a regression test"
    },
    {
      signal: "Heap spike occurs only during report/export endpoints",
      likelyCause: "Large in-memory aggregation or duplicate buffers",
      confirmWith: "Endpoint-level heap/latency, payload sizes, allocation profile",
      fixDirection: "Stream results, chunk processing, enforce safe payload limits"
    },
    {
      signal: "Old generation stable but GC runs constantly",
      likelyCause: "High allocation churn, traffic surge, or inefficient hot path",
      confirmWith: "Allocation profiling, GC logs, request rate and latency",
      fixDirection: "Reduce unnecessary allocations, tune bounded concurrency, capacity-test"
    },
    {
      signal: "Metaspace grows after every redeployment",
      likelyCause: "Classloader leak or repeated class generation",
      confirmWith: "Classloader metrics, heap roots, redeployment test",
      fixDirection: "Stop leaked threads and unregister/release app-owned resources correctly"
    },
    {
      signal: "Heap is below maximum but container is OOMKilled",
      likelyCause: "Native memory, direct buffers, threads, or total container budget",
      confirmWith: "RSS, NMT if enabled, direct buffer metrics, cgroup and kernel evidence",
      fixDirection: "Budget total process memory and address the specific native consumer"
    },
    {
      signal: "Native thread creation fails and thread count rises",
      likelyCause: "Unbounded thread creation, stuck work, or OS/PID limit",
      confirmWith: "Thread dump, process limits, cgroup PID metrics, executor statistics",
      fixDirection: "Bound executors, fix blocked calls, review limits and stack sizing"
    },
    {
      signal: "Memory rises with downstream latency and queue depth",
      likelyCause: "Backlog retaining request/task objects",
      confirmWith: "Queue age/depth, thread dumps, dependency latency, retry metrics",
      fixDirection: "Apply backpressure, bound queues, limit retries, fix downstream bottleneck"
    },
    {
      signal: "Only one tenant or endpoint triggers the problem",
      likelyCause: "Payload/cardinality outlier or tenant-specific workload",
      confirmWith: "Redacted request metadata, size distribution, tenant-level metrics",
      fixDirection: "Set fair resource limits and fix the expensive processing path"
    }
  ],

  mitigationAndRecovery: {
    decisionPrinciples: [
      "Prefer mitigation that reduces load or removes the faulty release without destroying evidence.",
      "Do not change heap size until the JVM and container memory budget is calculated.",
      "Do not assume restart equals resolution; it clears process state and can temporarily hide a leak.",
      "Use the team's approved deployment, traffic-drain, rollback, and incident-command procedures."
    ],
    options: [
      {
        situation: "A new release strongly correlates with the incident",
        action: [
          "Verify the previous release is compatible with current database/schema changes.",
          "Use the approved rollback or traffic-shift procedure.",
          "Preserve current logs and any safely available diagnostic evidence.",
          "Monitor memory slope and error rate on the restored release."
        ]
      },
      {
        situation: "One instance is unhealthy and healthy spare capacity exists",
        action: [
          "Capture required evidence if it is safe to do so.",
          "Drain the instance using the load balancer or orchestrator.",
          "Replace or restart it through the normal lifecycle procedure.",
          "Verify the replacement is healthy and receives traffic normally."
        ]
      },
      {
        situation: "Traffic or large requests overwhelm the service",
        action: [
          "Apply approved rate limits or shed noncritical work.",
          "Limit payload sizes and expensive concurrency where safe.",
          "Pause or reschedule memory-intensive batch jobs if the owner approves.",
          "Monitor queue age, customer impact, and downstream recovery."
        ]
      },
      {
        situation: "A downstream dependency is slow and queues are growing",
        action: [
          "Use approved circuit-breaker, timeout, retry, and concurrency controls.",
          "Stop retry storms and unbounded queue growth.",
          "Restore downstream health before gradually increasing traffic.",
          "Check for duplicate or lost work when resuming queued processing."
        ]
      },
      {
        situation: "The service is out of memory and cannot recover",
        action: [
          "If the incident commander approves, restart or replace the affected instance.",
          "Do not restart all replicas at once unless the recovery plan explicitly requires it.",
          "Confirm spare capacity and preserve evidence first when practical.",
          "After restart, observe memory growth under representative traffic rather than declaring success immediately."
        ]
      }
    ],
    rollbackCautions: [
      "A rollback can be unsafe if a database migration or persistent data format has changed.",
      "A rolling restart can temporarily reduce capacity and increase pressure on remaining replicas.",
      "Increasing heap can worsen host or container OOM risk if native memory is not budgeted.",
      "A restart is a mitigation, not proof of root-cause correction."
    ]
  },

  heapSizingAndCapacity: {
    principles: [
      "Choose heap sizing from measured live-set, allocation, pause-time, and traffic behavior.",
      "Budget total process memory, not only Java heap.",
      "For a container, leave headroom for metaspace, direct buffers, thread stacks, code cache, JVM native memory, agents, and other processes sharing the limit.",
      "Do not copy -Xmx values from another service without measuring its workload and memory profile.",
      "Validate the proposed settings under realistic load and failure conditions before production rollout."
    ],
    roughBudgetModel: [
      "Container or host budget",
      "minus target Java heap maximum",
      "minus measured native memory and direct-buffer demand",
      "minus thread-stack and code-cache budget",
      "minus agents, sidecars, and operational headroom",
      "equals remaining safety margin"
    ],
    capacityQuestions: [
      "What is the 95th/99th percentile live heap under expected peak traffic?",
      "What allocation spike occurs during cache warm-up or batch jobs?",
      "How much RSS remains outside the Java heap?",
      "How much spare memory must remain for deployment overlap and rolling restarts?",
      "Can a single replica absorb the traffic of a failed peer?",
      "Does autoscaling have enough node capacity and quota to add replicas?",
      "Does the application remain stable during the largest supported request?"
    ],
    warnings: [
      "The budget is a planning model, not a formula for blindly selecting -Xmx.",
      "Container-aware JVM ergonomics vary by Java version and vendor build.",
      "Changing -Xms, -Xmx, MaxMetaspaceSize, MaxDirectMemorySize, or -Xss requires controlled testing.",
      "More replicas do not fix a per-request unbounded allocation bug."
    ]
  },

  configurationExamples: {
    heapDumpOnOutOfMemory: {
      example: "-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/secure-diagnostics",
      notes: [
        "This is an example for future startup configuration, not a live fix.",
        "Confirm directory permissions, disk capacity, privacy controls, and dump retention before enabling.",
        "If a container is killed by the OS, the JVM may not get the chance to write the dump.",
        "Check the exact Java version's supported options."
      ]
    },
    jdk9PlusGcLogging: {
      example: "-Xlog:gc*,safepoint:file=/var/log/tomcat/gc.log:time,uptime,level,tags",
      notes: [
        "Use a writable path and configure log rotation.",
        "Confirm the flag works with the exact Java runtime.",
        "Do not add flags to production without change review and restart planning."
      ]
    },
    jdk8GcLogging: {
      example: "-XX:+PrintGCDetails -XX:+PrintGCDateStamps -Xloggc:/var/log/tomcat/gc.log",
      notes: [
        "Java 8 builds differ; verify the exact vendor/version and available flags.",
        "Keep log volume bounded."
      ]
    },
    nativeMemoryTracking: {
      example: "-XX:NativeMemoryTracking=summary",
      notes: [
        "Normally requires JVM startup configuration.",
        "Use only when the overhead is acceptable.",
        "Correlate NMT output with RSS and container metrics; NMT does not explain every native allocation."
      ]
    }
  },

  prevention: {
    codeAndArchitecture: [
      "Use bounded caches with documented maximum size, expiry, and eviction metrics.",
      "Stream large files, database results, and reports instead of accumulating the whole payload in heap.",
      "Enforce request-size, decompression, pagination, and export limits.",
      "Use bounded executors and queues with explicit backpressure and rejection behavior.",
      "Ensure streams, result sets, statements, buffers, and resources have clear lifecycle ownership.",
      "Avoid retaining request/session objects in static fields, long-lived caches, or background tasks.",
      "Review ThreadLocal cleanup and application-owned thread lifecycle.",
      "Review retry policies so dependency failure does not create unlimited in-memory work.",
      "Use load tests that include peak traffic, large payloads, slow dependencies, and long-duration soak periods."
    ],
    observability: [
      "Alert on post-GC live heap trend, not only instantaneous heap percentage.",
      "Track heap used/max, non-heap, GC pause time, allocation rate, and GC frequency.",
      "Track process RSS, container memory working set, memory limit, and OOMKilled events.",
      "Track direct buffer usage, thread count, executor queue depth, and active request count.",
      "Track cache size, session count, request-size percentiles, and report/export concurrency.",
      "Correlate memory metrics with release version and deployment timestamps.",
      "Ensure alerts include instance/pod identity and the first-seen timestamp."
    ],
    operations: [
      "Maintain a tested rollback plan and a safe instance replacement procedure.",
      "Set up restricted diagnostic storage and a documented heap-dump analysis process.",
      "Document Java/Tomcat version-specific diagnostic commands.",
      "Use canary deployments and memory-focused post-deployment checks.",
      "Run periodic capacity reviews and long-running leak tests.",
      "Test alerting for heap OOM, native/container OOM, and memory growth after redeployment.",
      "Assign owners and due dates to every confirmed leak or capacity defect."
    ]
  },

  validationAfterRecovery: [
    "All expected Tomcat instances are healthy and registered with the load balancer.",
    "HTTP 5xx, latency, and timeout rates return to acceptable levels.",
    "No new OutOfMemoryError or OOMKilled event occurs during the observation window.",
    "Post-GC live heap is stable under representative traffic.",
    "GC pauses and frequency return to an acceptable range.",
    "Process RSS remains safely below the host/container limit.",
    "Thread count, direct buffer usage, queue depth, and cache sizes are stable.",
    "Database and downstream pools have recovered without retry storms.",
    "Background jobs and queued work are progressing without duplication or loss.",
    "The service remains stable through a representative peak or soak test before closing the incident."
  ],

  incidentReportTemplate: {
    incidentId: "",
    serviceAndEnvironment: "",
    incidentCommander: "",
    startTimeUtc: "",
    detectionTimeUtc: "",
    mitigationTimeUtc: "",
    resolutionTimeUtc: "",
    severityAndCustomerImpact: "",
    affectedInstancesOrPods: "",
    javaTomcatAndReleaseVersions: "",
    exactOomSignature: "",
    heapAndContainerLimits: "",
    gcAndMemoryEvidence: "",
    heapDumpOrNativeEvidenceLocation: "Restricted location only; do not attach sensitive dumps to a public ticket",
    rootCause: "",
    contributingFactors: "",
    mitigationPerformed: "",
    rollbackOrRestartDetails: "",
    dataIntegrityChecks: "",
    validationResults: "",
    permanentFix: "",
    preventionActions: [
      {
        action: "",
        owner: "",
        dueDate: "",
        validationMethod: ""
      }
    ],
    lessonsLearned: ""
  },

  handsOnLabs: [
    {
      title: "Lab 1 - Reproduce a bounded heap exhaustion safely",
      environment: "Local disposable JVM only",
      steps: [
        "Create a small Java program that retains byte arrays in a bounded test collection.",
        "Run it with a deliberately small -Xmx in a disposable environment.",
        "Capture the exact OOM signature and GC logs.",
        "Generate a heap dump only if the test environment has sufficient disk space.",
        "Analyze the retaining path and explain why the collection keeps objects reachable."
      ],
      successCriteria: [
        "Correctly identify Java heap exhaustion.",
        "Explain the difference between shallow size and retained size.",
        "Show that removing the retention path or bounding the collection prevents recurrence."
      ]
    },
    {
      title: "Lab 2 - Distinguish a leak from allocation churn",
      environment: "Load-test or staging environment",
      steps: [
        "Generate repeated short-lived allocations with no long-term retention.",
        "Compare the behavior with a test that retains objects across requests.",
        "Record allocation rate, GC frequency, and post-GC live heap.",
        "Explain which metrics distinguish the two patterns."
      ],
      successCriteria: [
        "Do not label high allocation rate alone as a memory leak.",
        "Use trends and retained-object evidence to support the diagnosis."
      ]
    },
    {
      title: "Lab 3 - Container memory budget",
      environment: "Disposable container or test Kubernetes namespace",
      steps: [
        "Run a small Java application with a deliberately constrained memory limit.",
        "Observe heap metrics alongside process/container memory.",
        "Compare a Java heap OOM with a runtime/container kill.",
        "Review previous container logs and termination reason."
      ],
      successCriteria: [
        "Explain why heap maximum and container limit are not interchangeable.",
        "Identify the evidence needed to distinguish JVM OOM from OOMKilled."
      ]
    },
    {
      title: "Lab 4 - Thread growth and native memory",
      environment: "Local or isolated test JVM",
      steps: [
        "Use a test executor with intentionally unsafe thread creation only in the isolated lab.",
        "Record thread count, process memory, and executor queue behavior.",
        "Replace it with a bounded executor and an explicit rejection/backpressure policy.",
        "Compare the measurements."
      ],
      successCriteria: [
        "Identify thread growth as a separate failure mode from Java heap exhaustion.",
        "Demonstrate a bounded concurrency design."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What is the difference between Java heap space and native-memory exhaustion?",
      answer: "Java heap space concerns allocations in the managed Java heap. Native-memory exhaustion can involve direct buffers, thread stacks, metaspace, JNI/native libraries, or OS/container limits. Correlate the exact error with heap, RSS, thread, and container metrics."
    },
    {
      question: "Does every OutOfMemoryError mean there is a memory leak?",
      answer: "No. A leak is one possibility. Large allocations, legitimate workload growth, excessive concurrency, allocation churn, undersized capacity, native-memory exhaustion, and OS limits can also cause failures."
    },
    {
      question: "How do you confirm a Java heap leak?",
      answer: "Look for a rising post-GC live set under comparable load, then inspect a heap dump's dominator tree, retained sizes, and paths to GC roots. Map retained objects to application code and validate the hypothesis."
    },
    {
      question: "Why can a pod be OOMKilled while Java heap is below -Xmx?",
      answer: "The container budget includes process memory beyond the Java heap, such as metaspace, direct buffers, thread stacks, code cache, JVM/native allocations, and possibly other processes. The kernel may kill the process when the enforced limit is exceeded."
    },
    {
      question: "What does GC overhead limit exceeded indicate?",
      answer: "The JVM is spending excessive time collecting garbage while reclaiming too little memory. Inspect GC logs, post-GC live heap, allocation rate, and retained objects."
    },
    {
      question: "What is the difference between shallow and retained heap size?",
      answer: "Shallow size is the object's own memory footprint. Retained size estimates the memory that would become collectible if that object and the objects dominated by it became unreachable."
    },
    {
      question: "When should you capture a heap dump in production?",
      answer: "When the diagnostic value justifies the pause, disk, security, and availability risks. Check storage, access controls, dump size, and the incident procedure first."
    },
    {
      question: "Why is restarting Tomcat not a permanent fix for a leak?",
      answer: "Restarting clears the process's memory state, so symptoms may disappear temporarily. If the same retaining path or workload returns, memory can grow again."
    },
    {
      question: "How do you troubleshoot Metaspace exhaustion after repeated deployments?",
      answer: "Review class loading/unloading, classloader counts and retention, application threads, ThreadLocal values, static references, JDBC driver registration, and generated classes."
    },
    {
      question: "How do you troubleshoot unable to create native thread?",
      answer: "Measure thread count and growth, inspect thread dumps and executor settings, check process and cgroup PID limits, review stack sizing, and investigate native memory pressure and blocked downstream calls."
    },
    {
      question: "Why might increasing -Xmx make an incident worse?",
      answer: "It can leave insufficient memory for native allocations under the container or host limit, increasing the risk of kernel OOM termination. It can also delay failure without fixing a leak."
    },
    {
      question: "What evidence should be captured before restarting?",
      answer: "The exact exception, timestamps, release and JVM flags, GC logs, memory and thread metrics, relevant logs, and—if safe—targeted thread or heap diagnostics. Protect sensitive data and prioritize service recovery if collection is unsafe."
    }
  ],

  operationalChecklist: [
    "Correct service, environment, host/pod, and JVM PID confirmed.",
    "Incident severity, customer impact, and remaining capacity assessed.",
    "Exact OOM signature or container-kill evidence captured.",
    "Java version, Tomcat version, JVM flags, heap maximum, and memory limits recorded.",
    "Logs, GC trends, RSS, thread count, and container metrics preserved.",
    "Recent deployment, traffic, request-size, and downstream changes correlated.",
    "Heap dump or native evidence collected only if safe and authorized.",
    "Root cause supported by evidence rather than assumption.",
    "Mitigation and rollback compatibility checked.",
    "Recovery validated under representative traffic.",
    "Permanent fix, regression test, alert, owner, and due date recorded."
  ],

  officialReferences: [
    {
      title: "Oracle Java Troubleshooting Guide",
      url: "https://docs.oracle.com/en/java/javase/21/troubleshoot/"
    },
    {
      title: "Java Launcher and JVM Options",
      url: "https://docs.oracle.com/en/java/javase/21/docs/specs/man/java.html"
    },
    {
      title: "jcmd Command Reference",
      url: "https://docs.oracle.com/en/java/javase/21/docs/specs/man/jcmd.html"
    },
    {
      title: "jstat Command Reference",
      url: "https://docs.oracle.com/en/java/javase/21/docs/specs/man/jstat.html"
    },
    {
      title: "jmap Command Reference",
      url: "https://docs.oracle.com/en/java/javase/21/docs/specs/man/jmap.html"
    },
    {
      title: "Tomcat JMX Proxy",
      url: "https://tomcat.apache.org/tomcat-10.1-doc/manager-howto.html"
    },
    {
      title: "Tomcat Configuration Reference",
      url: "https://tomcat.apache.org/tomcat-10.1-doc/config/"
    },
    {
      title: "Kubernetes Resource Management for Pods and Containers",
      url: "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/"
    },
    {
      title: "Kubernetes Pod Lifecycle and Container States",
      url: "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/"
    },
    {
      title: "Eclipse Memory Analyzer (MAT)",
      url: "https://eclipse.dev/mat/"
    }
  ]
} as const;

export default outOfMemoryErrorGuide;
