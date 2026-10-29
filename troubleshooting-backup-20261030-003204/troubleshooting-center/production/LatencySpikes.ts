
export const latencySpikesGuide = {
  title: "Production Latency Spikes — Deep Troubleshooting Runbook",
  fileName: "LatencySpikes.ts",
  category: "production",
  difficulty: "advanced",
  estimatedTime: "120–240 minutes",

  description:
    "Evidence-driven incident response for sudden API, web application, database, and distributed-system latency increases across Linux, Kubernetes, JVM/Tomcat, caches, queues, and external dependencies.",

  objectives: [
    "Determine which customers, endpoints, regions, and workloads are affected.",
    "Separate p50, p95, p99, and maximum latency instead of relying on averages.",
    "Distinguish application processing time from queueing, network, database, and downstream time.",
    "Use metrics, distributed traces, structured logs, and controlled tests to locate the slow segment.",
    "Investigate CPU throttling, thread-pool exhaustion, connection pools, locks, garbage collection, and retry amplification.",
    "Choose a mitigation that reduces customer impact without overloading dependencies.",
    "Verify recovery and turn findings into actionable prevention work.",
  ],

  incidentScenario: {
    title: "Checkout API latency increases after a routine release",
    timeline: [
      {
        time: "09:00 UTC",
        event: "Checkout API p95 latency is 180 ms and p99 is 450 ms.",
      },
      {
        time: "09:05 UTC",
        event:
          "A release completes. A new request path starts calling an additional downstream service.",
      },
      {
        time: "09:08 UTC",
        event:
          "p95 rises above 1.5 seconds and p99 exceeds 5 seconds, while the median changes only slightly.",
      },
      {
        time: "09:10 UTC",
        event:
          "Request queues and timeouts grow. Some clients retry, increasing total request volume.",
      },
      {
        time: "09:13 UTC",
        event:
          "The on-call team compares traces, release versions, downstream timings, pool wait metrics, and error rates.",
      },
      {
        time: "09:20 UTC",
        event:
          "The team applies a controlled mitigation supported by evidence, then verifies customer-facing recovery.",
      },
    ],
    possibleCauses: [
      "Slow database queries, lock contention, or database connection-pool waits.",
      "A slow external API, DNS lookup, TLS handshake, or network path.",
      "Application thread-pool exhaustion or request queueing.",
      "CPU saturation or container CPU throttling.",
      "Garbage collection pauses or allocation pressure.",
      "Cache misses, cache stampedes, or expensive cache recomputation.",
      "A new release, feature flag, configuration change, or schema/query regression.",
      "Retry amplification, excessive fan-out, or cascading dependency failures.",
      "Uneven load balancing, hot tenants, sticky sessions, or one overloaded replica.",
      "Storage latency, connection setup overhead, or a slow message consumer.",
      "A traffic spike, large request payloads, or expensive serialization.",
    ],
    principle:
      "Latency is an end-to-end symptom. Identify where time is spent and what caused that delay before changing timeouts, scaling, or restarting services.",
  },

  severityAndImpact: {
    note:
      "These severity levels are illustrative. Follow the organization's incident policy and service-level objectives.",
    levels: [
      {
        severity: "SEV1",
        criteria:
          "Critical workflows are effectively unavailable, or severe latency is causing widespread timeouts and cascading failures.",
        actions: [
          "Declare an incident and appoint an incident commander.",
          "Protect critical customer flows and stop unsafe rollout activity.",
          "Coordinate application, platform, database, and dependency owners.",
          "Apply the approved mitigation and communicate impact.",
        ],
      },
      {
        severity: "SEV2",
        criteria:
          "A major service violates its latency SLO with significant customer impact or rising errors.",
        actions: [
          "Identify affected endpoints, regions, versions, and dependencies.",
          "Correlate latency percentiles with errors, queues, and trace timings.",
          "Assign mitigation and investigation owners.",
        ],
      },
      {
        severity: "SEV3",
        criteria:
          "A limited service or endpoint is slow, with manageable customer impact.",
        actions: [
          "Investigate before capacity or queueing deteriorates.",
          "Check whether the regression is recurring or isolated.",
        ],
      },
      {
        severity: "SEV4",
        criteria:
          "A brief latency anomaly has little or no measurable customer impact.",
        actions: [
          "Record the anomaly and assess whether alerting or capacity planning needs improvement.",
        ],
      },
    ],
    questions: [
      "Which endpoint, operation, customer group, and region are affected?",
      "Did p50, p95, p99, or all latency percentiles increase?",
      "Did latency rise before errors, or did errors/retries rise first?",
      "Are requests slow before reaching the application, inside the application, or downstream?",
      "Are all replicas slow or only one replica/node/version?",
      "Did traffic, payload size, concurrency, or retry rate change?",
      "Did a deployment, database change, cache invalidation, or configuration change occur?",
      "Are requests slow but eventually successful, or timing out and failing?",
      "Is the latency increase ongoing, stable, or already recovering?",
    ],
  },

  incidentCommand: {
    roles: [
      {
        role: "Incident Commander",
        responsibility:
          "Coordinates severity, impact, priorities, escalation, and communications.",
      },
      {
        role: "Application Owner",
        responsibility:
          "Investigates request paths, code changes, queues, pools, and application telemetry.",
      },
      {
        role: "Platform / SRE",
        responsibility:
          "Investigates routing, Kubernetes, resource limits, node health, and infrastructure metrics.",
      },
      {
        role: "Database / Dependency Owner",
        responsibility:
          "Investigates query latency, locks, connection capacity, and external service health.",
      },
      {
        role: "Scribe",
        responsibility:
          "Records timestamps, hypotheses, evidence, approvals, mitigations, and recovery checks.",
      },
    ],
    rules: [
      "Use one incident timeline with UTC timestamps.",
      "Assign owners for separate investigation paths to avoid duplicate work.",
      "Capture evidence before restart or rollback whenever it is safe to do so.",
      "Do not run heavy diagnostics across the entire production fleet at once.",
      "Record expected impact and a rollback plan before mitigation.",
    ],
  },

  safetyChecks: [
    "Confirm the correct account, region, cluster, namespace, service, endpoint, and environment.",
    "Check the service SLO, customer impact, current error rate, and incident severity.",
    "Verify the active release, image digest, feature flags, and recent configuration changes.",
    "Use approved read-only access first and obtain approval for production changes.",
    "Avoid restarting all replicas or changing global timeouts as the first action.",
    "Do not scale application replicas until database and downstream capacity have been assessed.",
    "Do not disable TLS, authentication, authorization, rate limits, or other security controls.",
    "Keep trace IDs, logs, and diagnostic artifacts free of secrets and unnecessary customer data.",
    "Use bounded log windows and sampled traces; avoid collecting unbounded data during an incident.",
    "Preserve evidence when an unexpected process, traffic pattern, or suspected attack is involved.",
  ],

  evidenceCollection: {
    serviceMetrics: [
      "Request rate and concurrency.",
      "p50, p90, p95, p99, and maximum latency where meaningful.",
      "Latency SLO compliance and error-budget burn rate.",
      "HTTP 4xx/5xx, timeout, cancellation, and retry rates.",
      "Queue depth, queue wait time, active workers, and rejected requests.",
      "Latency grouped by endpoint, region, tenant, client, and application version.",
      "CPU, memory, throttling, GC, thread count, and connection-pool metrics.",
    ],
    distributedTracing: [
      "End-to-end trace duration and the slowest spans.",
      "Application server processing and queueing spans.",
      "Database query spans and connection-acquisition time where instrumented.",
      "External HTTP/RPC dependency spans.",
      "DNS resolution, connection setup, and TLS handshake time when captured.",
      "Retries, fan-out, sequential dependency calls, and duplicated spans.",
      "Missing spans, sampling gaps, and instrumentation limitations.",
    ],
    infrastructureMetrics: [
      "Load balancer target latency, connection counts, and health checks.",
      "Per-pod and per-node CPU and memory usage.",
      "Container CPU throttling and scheduling delays.",
      "Network retransmissions, connection errors, and DNS health.",
      "Storage latency and I/O wait.",
      "Autoscaler decisions, replica count, node capacity, and restart events.",
    ],
    changeEvidence: [
      "Release ID, Git commit, image digest, and rollout timeline.",
      "Database schema, query, index, and connection-pool changes.",
      "Cache configuration, TTL, invalidation, and feature flag changes.",
      "Timeout, retry, concurrency, and rate-limit changes.",
      "External dependency incidents and provider status events.",
      "Batch jobs, migrations, imports, and scheduled workload overlaps.",
    ],
    collectionRules: [
      "Use the same time window and timezone for metrics, traces, logs, and deployments.",
      "Compare the affected period with a known-good baseline and unaffected replicas.",
      "Check metric definitions, aggregation windows, sampling, and clock skew.",
      "Preserve a few representative slow trace IDs for deeper investigation.",
      "Remember that missing trace spans do not prove a dependency is healthy.",
    ],
  },

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm the latency incident",
      objective:
        "Establish the affected user journeys and whether the alert represents real degradation.",
      actions: [
        "Check SLO dashboards, latency percentiles, error rate, request rate, and critical workflows.",
        "Compare current latency with the service's normal baseline.",
        "Identify affected endpoints, regions, tenants, versions, and replicas.",
        "Mark the first abnormal timestamp and compare it with deployment and dependency events.",
      ],
      decisions: [
        {
          if: "p50, p95, and p99 all increase",
          then:
            "Investigate broad service or dependency slowdown, traffic overload, and resource saturation.",
        },
        {
          if: "p50 is stable but p95/p99 increase",
          then:
            "Prioritize tail latency, queueing, uneven load, lock contention, slow outliers, and long-running dependency calls.",
        },
        {
          if: "Latency rises but errors remain low",
          then:
            "Investigate queueing, slow successful requests, timeouts not yet reached, and near-saturation conditions.",
        },
        {
          if: "Errors rise before latency",
          then:
            "Investigate dependency failures, retries, fallback paths, and error-handling overhead.",
        },
        {
          if: "Only one region or replica is affected",
          then:
            "Compare routing, placement, release version, local resource metrics, and dependency paths.",
        },
      ],
    },

    {
      step: 2,
      title: "Separate latency from throughput and traffic growth",
      objective:
        "Determine whether the service is slow because demand increased or each request now takes longer.",
      measurements: [
        "Request rate and concurrent requests before and during the incident.",
        "Latency by endpoint and request class.",
        "CPU per request and resource consumption normalized by traffic.",
        "Payload sizes and expensive request types.",
        "Cache hit ratio and downstream call count per request.",
        "Queue depth, queue wait, and active worker count.",
      ],
      decisions: [
        {
          if: "Request rate rises while latency per request is initially stable",
          then:
            "Check capacity headroom, autoscaling, rate limits, queue growth, and downstream capacity.",
        },
        {
          if: "Request rate is stable but latency rises",
          then:
            "Prioritize slow dependencies, code regressions, contention, resource limits, and configuration changes.",
        },
        {
          if: "Requests per second fall while latency rises",
          then:
            "Check saturation, queueing, timeouts, worker exhaustion, and rejected work. Falling throughput can be a symptom of overload.",
        },
        {
          if: "One tenant or endpoint dominates",
          then:
            "Investigate workload isolation, query shape, payload size, and approved per-class traffic controls.",
        },
      ],
      caution:
        "A traffic spike and a code regression can happen together. Compare CPU/request, downstream calls/request, and latency distributions instead of selecting only one explanation.",
    },

    {
      step: 3,
      title: "Trace the slow request end to end",
      objective:
        "Identify which part of the request path consumes the most time.",
      actions: [
        "Find representative slow traces for affected endpoints.",
        "Compare a slow trace with a normal trace of the same operation.",
        "Identify long spans, repeated calls, sequential calls, and queueing spans.",
        "Compare application time, database time, and external dependency time.",
        "Check whether instrumentation excludes queue wait or connection acquisition.",
        "Correlate the trace with application logs and infrastructure metrics.",
      ],
      decisions: [
        {
          if: "One downstream span dominates total duration",
          then:
            "Investigate that dependency's health, latency, connection setup, retry policy, and service limits.",
        },
        {
          if: "Many small sequential spans dominate",
          then:
            "Investigate unnecessary fan-out, sequential calls that could safely be combined, and N+1 query patterns.",
        },
        {
          if: "The trace has a long gap before application processing",
          then:
            "Investigate load balancer queues, connection acceptance, proxy behavior, request scheduling, and instrumentation coverage.",
        },
        {
          if: "Application span is long but child spans are short",
          then:
            "Investigate application CPU, locks, serialization, thread scheduling, local queues, and uninstrumented operations.",
        },
        {
          if: "No useful traces exist",
          then:
            "Use existing logs and metrics first. Enable approved, bounded sampling only after assessing overhead and data exposure.",
        },
      ],
      caution:
        "Distributed trace duration is not always a simple sum of child spans because spans may overlap. Check the trace structure and instrumentation semantics before assigning time to a component.",
    },

    {
      step: 4,
      title: "Check Linux, node, and network signals",
      objective:
        "Find host-level pressure or connection-path problems that increase request time.",
      commands: [
        {
          command: "uptime",
          purpose:
            "Shows load averages and uptime.",
          caution:
            "Load average is not identical to CPU utilization; it can include tasks waiting in uninterruptible sleep.",
        },
        {
          command: "top",
          purpose:
            "Shows processes and CPU/memory activity.",
          caution:
            "Use repeated samples and correlate with request timing rather than relying on a single snapshot.",
        },
        {
          command: "vmstat 1 5",
          purpose:
            "Samples runnable tasks, memory/swap activity, and CPU states.",
        },
        {
          command: "ss -s",
          purpose:
            "Summarizes socket usage on Linux.",
        },
        {
          command: "ss -tan",
          purpose:
            "Lists TCP sockets and states for connection-level investigation.",
          caution:
            "Output can be large and may expose endpoints. Filter or sample appropriately in production.",
        },
        {
          command: "getent hosts <hostname>",
          purpose:
            "Checks hostname resolution through the system name-service configuration.",
        },
        {
          command: "curl -sS -o /dev/null -w 'dns=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} ttfb=%{time_starttransfer} total=%{time_total}\\n' https://<approved-host>/health",
          purpose:
            "Measures client-observed DNS, connection, TLS, time-to-first-byte, and total duration for an approved endpoint.",
          caution:
            "Run only against an approved safe endpoint. Results depend on connection reuse, redirects, proxy configuration, and network path. This test does not isolate server processing by itself.",
        },
      ],
      decisions: [
        {
          if: "CPU is saturated or runnable queue grows",
          then:
            "Investigate CPU-heavy code, throttling, concurrency, and autoscaling capacity.",
        },
        {
          if: "Memory pressure or swap activity rises",
          then:
            "Investigate memory reclaim, GC, allocation, and capacity rather than assuming a network issue.",
        },
        {
          if: "Connection setup or DNS time increases",
          then:
            "Investigate DNS, connection reuse, TLS, network policy, proxies, and connection churn.",
        },
        {
          if: "Application and dependency metrics look healthy but client latency remains high",
          then:
            "Compare the client-to-edge path, load balancer, proxy, network route, and client-side behavior.",
        },
      ],
      caution:
        "Do not infer a network root cause from a single curl measurement. Compare repeated tests, existing telemetry, and multiple vantage points.",
    },

    {
      step: 5,
      title: "Investigate Kubernetes and load balancer routing",
      objective:
        "Find pod-specific latency, overloaded targets, scheduling problems, or routing imbalance.",
      commands: [
        {
          command: "kubectl top pods -n <namespace>",
          purpose:
            "Shows recent pod CPU and memory metrics if the Metrics API is available.",
        },
        {
          command: "kubectl top nodes",
          purpose:
            "Shows recent node resource metrics if available.",
        },
        {
          command: "kubectl get pods -n <namespace> -o wide",
          purpose:
            "Lists pods and node placement for comparison.",
        },
        {
          command: "kubectl get hpa -n <namespace>",
          purpose:
            "Shows autoscaler state and reported metrics.",
        },
        {
          command: "kubectl describe pod <pod> -n <namespace>",
          purpose:
            "Shows resource settings, restart information, scheduling details, and events.",
          caution:
            "Review output for sensitive configuration before sharing it.",
        },
        {
          command: "kubectl logs <pod> -n <namespace> --since=15m --timestamps",
          purpose:
            "Retrieves a bounded recent log window for one pod.",
        },
      ],
      inspect: [
        "Load balancer target latency, target health, and distribution across replicas.",
        "Per-pod p95/p99 latency, CPU, memory, and restart counts.",
        "CPU throttling and pod scheduling delays.",
        "HPA desired/current replicas, maximum replica count, and metric availability.",
        "Readiness, connection draining, sticky sessions, and keep-alive behavior.",
        "Service endpoint distribution and node-level contention.",
      ],
      decisions: [
        {
          if: "One pod has high latency while peers are healthy",
          then:
            "Compare its version, node, traffic share, local queues, connection pools, and runtime metrics.",
        },
        {
          if: "All pods are slow on one node",
          then:
            "Investigate node pressure, noisy neighbors, storage/network conditions, and placement.",
        },
        {
          if: "HPA cannot add replicas",
          then:
            "Inspect maximum replicas, missing metrics, quotas, scheduling capacity, and downstream constraints.",
        },
        {
          if: "Load balancer traffic is uneven",
          then:
            "Check target health, routing policy, sticky sessions, long-lived connections, and readiness behavior.",
        },
      ],
      caution:
        "Kubernetes resource metrics may be averaged or delayed. Correlate them with the monitoring system and load balancer telemetry.",
    },

    {
      step: 6,
      title: "Investigate application thread pools and request queues",
      objective:
        "Determine whether requests are waiting for workers or blocked by a scarce resource.",
      inspect: [
        "Active versus maximum request workers.",
        "Executor queue depth, rejected tasks, and worker utilization.",
        "Request queue wait versus actual processing duration.",
        "JDBC connection-pool acquisition time and active/idle connections.",
        "HTTP client connection pools and pending connection acquisitions.",
        "Lock waits, synchronized sections, futures, and thread contention.",
        "Long-running requests and downstream calls that hold worker threads.",
      ],
      decisions: [
        {
          if: "Workers are saturated and queue wait increases",
          then:
            "Find why work takes longer or concurrency is insufficient. Inspect downstream waits before increasing worker counts.",
        },
        {
          if: "Workers are mostly waiting on database connections",
          then:
            "Investigate database latency, pool sizing, leaked connections, and transaction duration.",
        },
        {
          if: "Workers are waiting on external HTTP calls",
          then:
            "Inspect dependency latency, timeouts, client connection pools, and retry amplification.",
        },
        {
          if: "Queue grows despite low CPU",
          then:
            "Investigate I/O waits, locks, downstream dependencies, and constrained pools. Low CPU does not prove the service is healthy.",
        },
      ],
      caution:
        "Increasing thread counts can increase context switching, memory use, and downstream concurrency. Fix the bottleneck before changing pool size.",
    },

    {
      step: 7,
      title: "Investigate database query latency and connection waits",
      objective:
        "Separate slow query execution from waiting to acquire a database connection.",
      evidence: [
        "Database query latency and active sessions.",
        "Application-side connection acquisition time.",
        "Connection-pool active, idle, pending, and timeout metrics.",
        "Lock waits, blocking transactions, and transaction age.",
        "Slow query logs and query-plan changes.",
        "Database CPU, I/O, storage latency, and connection limits.",
        "Connection counts aggregated across all application replicas.",
      ],
      safePostgresExamples: [
        {
          query:
            "SELECT state, wait_event_type, wait_event, count(*) FROM pg_stat_activity GROUP BY state, wait_event_type, wait_event ORDER BY count(*) DESC;",
          purpose:
            "Provides an aggregate view of PostgreSQL session states and reported wait events.",
          caution:
            "Requires suitable privileges. Interpret by database, role, application, and time window; do not treat the result as a complete diagnosis.",
        },
        {
          query:
            "SELECT pid, usename, application_name, state, wait_event_type, wait_event, now() - query_start AS query_age FROM pg_stat_activity WHERE state <> 'idle' ORDER BY query_start NULLS LAST LIMIT 20;",
          purpose:
            "Lists a bounded sample of non-idle sessions for investigation.",
          caution:
            "Query text is intentionally omitted. Use approved access and avoid terminating sessions without identifying transaction and business impact.",
        },
      ],
      decisions: [
        {
          if: "Connection acquisition time rises but query duration is stable",
          then:
            "Investigate pool exhaustion, long-held connections, transaction scope, and database connection capacity.",
        },
        {
          if: "Query duration rises",
          then:
            "Investigate query plans, locks, statistics, data volume, indexes, and database resource pressure.",
        },
        {
          if: "Lock waits rise",
          then:
            "Identify the blocking transaction and coordinate a safe resolution with the database owner.",
        },
        {
          if: "Database is saturated",
          then:
            "Avoid blindly scaling application replicas or increasing connection pools; that may add more database load.",
        },
      ],
      caution:
        "A query-plan change can help or hurt depending on data distribution and workload. Test changes against representative data and use approved database change procedures.",
    },

    {
      step: 8,
      title: "Check external APIs, retries, and cascading failures",
      objective:
        "Find downstream latency that is being amplified by the application.",
      inspect: [
        "Latency and error rates for every major dependency.",
        "Retry attempts per logical request.",
        "Timeout configuration across client, proxy, gateway, and server.",
        "Circuit-breaker and fallback activation.",
        "Connection reuse, DNS, TLS, and HTTP client pool behavior.",
        "Fan-out count and sequential dependency calls per request.",
        "Queue depth and backlog in asynchronous dependencies.",
      ],
      decisions: [
        {
          if: "A dependency span dominates request duration",
          then:
            "Check that dependency's metrics, status, saturation, and provider incident information.",
        },
        {
          if: "Retries rise during dependency slowdown",
          then:
            "Use bounded retries, backoff, jitter, appropriate timeouts, and circuit-breaker behavior.",
        },
        {
          if: "One request triggers many dependency calls",
          then:
            "Investigate N+1 patterns, redundant calls, caching, and safe request consolidation.",
        },
        {
          if: "A dependency is failing but the application keeps waiting",
          then:
            "Review deadline propagation and cancellation so work stops when it is no longer useful.",
        },
      ],
      caution:
        "Do not simply increase timeouts during an outage. Longer waits can retain workers and connections, increasing queueing and making recovery slower.",
    },

    {
      step: 9,
      title: "Investigate JVM, Tomcat, and garbage collection",
      objective:
        "Identify runtime pauses, thread contention, CPU saturation, or connector saturation.",
      commands: [
        {
          command: "jcmd <PID> VM.version",
          purpose:
            "Checks JVM version when supported and permitted.",
        },
        {
          command: "jcmd <PID> Thread.print",
          purpose:
            "Captures a thread dump for bounded investigation.",
          caution:
            "A thread dump can affect a busy JVM and expose sensitive stack/context information. Avoid repeated dumps in a tight loop.",
        },
        {
          command: "jstat -gcutil <PID> 1000 5",
          purpose:
            "Samples GC utilization counters when supported.",
        },
        {
          command: "jcmd <PID> JFR.check",
          purpose:
            "Checks Java Flight Recorder status on supported runtimes.",
        },
      ],
      inspect: [
        "GC pause duration, frequency, and total GC time.",
        "Allocation rate, heap occupancy, and promotion behavior.",
        "Tomcat busy threads and executor queues.",
        "Repeated thread stacks and lock contention.",
        "CPU-hot threads and request processing paths.",
        "Connection pool acquisition and downstream waiting.",
      ],
      decisions: [
        {
          if: "Latency spikes align with long GC pauses",
          then:
            "Investigate allocation, heap occupancy, object churn, and collector behavior before changing JVM flags.",
        },
        {
          if: "Tomcat workers are busy and queueing grows",
          then:
            "Inspect slow request paths, database waits, downstream calls, and worker saturation.",
        },
        {
          if: "Application CPU is high but GC is normal",
          then:
            "Use approved bounded profiling to identify hot code paths.",
        },
        {
          if: "Threads are mostly blocked",
          then:
            "Investigate locks and dependencies; blocked threads do not necessarily consume significant CPU.",
        },
      ],
      caution:
        "Use JVM diagnostics compatible with the deployed Java version. Thread dumps alone do not prove CPU consumption, and GC tuning without evidence can worsen latency.",
    },

    {
      step: 10,
      title: "Check cache behavior and expensive recomputation",
      objective:
        "Identify latency caused by cache misses, stampedes, invalidation, or poor key distribution.",
      inspect: [
        "Cache hit ratio and miss rate before and during the incident.",
        "Cache latency, connection count, and eviction rate.",
        "TTL expiration patterns and bulk invalidations.",
        "Duplicate concurrent cache fills for the same key.",
        "Hot keys and tenant-specific skew.",
        "Whether fallback behavior triggers database or API fan-out.",
      ],
      decisions: [
        {
          if: "Cache misses rise before latency",
          then:
            "Investigate key changes, invalidation, TTL synchronization, and cache capacity.",
        },
        {
          if: "Many requests recompute the same missing value",
          then:
            "Consider safe request coalescing, bounded concurrency, or a controlled cache-fill strategy.",
        },
        {
          if: "Cache service itself is slow",
          then:
            "Investigate its CPU, memory, network, hot keys, and connection pool before increasing application load.",
        },
      ],
      caution:
        "Do not flush a production cache as a generic fix. A cache flush can cause a stampede and overload the database or dependent services.",
    },

    {
      step: 11,
      title: "Check storage, queues, and background processing",
      objective:
        "Identify latency caused by disk operations, asynchronous backlogs, or overlapping batch work.",
      inspect: [
        "Storage latency and I/O wait.",
        "Queue depth, oldest message age, consumer lag, and processing duration.",
        "Scheduled jobs, imports, reports, backups, and migrations.",
        "Consumer concurrency and redelivery/retry rates.",
        "Whether synchronous API requests wait for background work.",
      ],
      decisions: [
        {
          if: "Queue backlog rises before API latency",
          then:
            "Check shared resources, synchronous waits, and consumer capacity; increase concurrency only if downstream systems can absorb it.",
        },
        {
          if: "Storage latency rises",
          then:
            "Investigate storage health, I/O patterns, and the underlying infrastructure.",
        },
        {
          if: "A batch job overlaps with the spike",
          then:
            "Review scheduling and concurrency, and pause only under the approved job recovery procedure.",
        },
      ],
    },

    {
      step: 12,
      title: "Correlate recent changes and isolate the root cause",
      objective:
        "Build a testable hypothesis and distinguish initiating causes from downstream symptoms.",
      method: [
        "Find the earliest abnormal signal in the incident timeline.",
        "Compare affected and healthy replicas, versions, regions, and request classes.",
        "Check release, feature flag, configuration, query, cache, and traffic changes.",
        "Use traces to identify the longest segments and metrics to confirm their behavior.",
        "Write a hypothesis that predicts a measurable change if it is correct.",
        "Choose the smallest safe test or mitigation.",
        "Record evidence that supports the hypothesis, evidence against it, and remaining uncertainty.",
      ],
      example:
        "Traffic remains stable, but checkout p99 increases immediately after a release. Traces show a new sequential dependency call dominating duration, and the dependency's latency is normal. This supports an application request-path regression more strongly than a dependency outage.",
      caution:
        "Temporal correlation is not proof of causation. Verify the hypothesis using multiple signals and a controlled change when possible.",
    },
  ],

  rootCauseMatrix: [
    {
      cause: "Traffic overload",
      evidence:
        "Request rate and concurrency increase, queues grow, and many endpoints degrade together.",
      response:
        "Use approved traffic shaping, load shedding, and safe scaling after checking dependency capacity.",
    },
    {
      cause: "Release regression",
      evidence:
        "Affected version has higher latency than the previous version under comparable traffic.",
      response:
        "Use an approved rollback or feature flag, after checking schema and compatibility risks.",
    },
    {
      cause: "Slow database query",
      evidence:
        "Trace query spans and database telemetry show increased execution duration.",
      response:
        "Investigate plans, locks, statistics, data volume, and database resource health.",
    },
    {
      cause: "Connection pool exhaustion",
      evidence:
        "Pool acquisition wait rises while actual query or downstream duration may remain stable.",
      response:
        "Investigate long-held connections, transaction scope, leaks, and capacity before adjusting pool size.",
    },
    {
      cause: "External dependency slowdown",
      evidence:
        "A dependency span dominates the request and dependency metrics show elevated latency.",
      response:
        "Apply bounded waits, appropriate cancellation, safe fallback, or circuit-breaker policy.",
    },
    {
      cause: "Retry amplification",
      evidence:
        "Retries increase with timeouts and failed dependency calls.",
      response:
        "Bound attempts, add backoff/jitter, and stop retries that cannot finish usefully within the request deadline.",
    },
    {
      cause: "CPU throttling",
      evidence:
        "Latency rises with CPU quota throttling or CPU saturation.",
      response:
        "Review code efficiency, resource settings, node headroom, and concurrency.",
    },
    {
      cause: "GC or runtime pause",
      evidence:
        "Runtime pause metrics align with latency spikes.",
      response:
        "Investigate allocation and runtime behavior with supported diagnostics.",
    },
    {
      cause: "Thread or queue saturation",
      evidence:
        "Queue wait rises, workers are saturated, and requests wait before processing.",
      response:
        "Find the slow operation or scarce resource; do not blindly increase worker counts.",
    },
    {
      cause: "Cache stampede",
      evidence:
        "Cache misses and backend traffic increase together, often after expiration or invalidation.",
      response:
        "Use safe cache-fill coordination and controlled concurrency.",
    },
    {
      cause: "Network or connection setup",
      evidence:
        "DNS, connect, TLS, retransmission, or proxy telemetry indicates increased setup or transfer time.",
      response:
        "Investigate the failing network segment and connection lifecycle.",
    },
    {
      cause: "Uneven load distribution",
      evidence:
        "One target is slow while comparable targets remain healthy.",
      response:
        "Inspect routing, sticky sessions, readiness, target health, and workload skew.",
    },
  ],

  safeRecoveryWorkflow: {
    principle:
      "Reduce customer impact while preserving evidence and preventing overload from spreading to dependencies.",
    sequence: [
      "1. Declare the incident and identify affected workflows and SLOs.",
      "2. Capture latency percentiles, error rates, traffic, and representative slow traces.",
      "3. Identify the slow request segment and check its metrics.",
      "4. Check whether the bottleneck is shared or isolated to a version, region, or replica.",
      "5. Check database, cache, and downstream capacity before scaling or increasing concurrency.",
      "6. Choose the smallest approved mitigation with a measurable expected outcome.",
      "7. Apply a controlled rollback, feature disablement, traffic limit, bounded concurrency change, or dependency protection.",
      "8. Verify that latency and errors improve without increasing downstream failures.",
      "9. Watch queue depth, retries, database connections, and dependency health during recovery.",
      "10. Restore normal traffic gradually when safe.",
      "11. Record temporary changes, owners, expiry/review dates, and rollback plans.",
      "12. Complete the root-cause analysis and assign preventive actions.",
    ],
    mitigationOptions: [
      {
        action: "Rollback a release",
        useWhen:
          "The regression is strongly linked to the new version and the old version is compatible with current schema/data.",
        safety:
          "Check migrations, mixed-version compatibility, and state changes before rollback.",
      },
      {
        action: "Disable an expensive feature",
        useWhen:
          "A specific optional feature is implicated and a tested feature flag exists.",
        safety:
          "Confirm the business impact and whether disabling it affects consistency or required workflows.",
      },
      {
        action: "Apply rate limiting or shed noncritical work",
        useWhen:
          "Demand exceeds sustainable capacity or one request class dominates the bottleneck.",
        safety:
          "Protect critical operations and follow approved customer-impact policies.",
      },
      {
        action: "Scale application replicas",
        useWhen:
          "The service is horizontally scalable and node plus dependency capacity are available.",
        safety:
          "Check database connections, queue consumers, downstream quotas, and scheduling capacity first.",
      },
      {
        action: "Reduce downstream fan-out",
        useWhen:
          "Traces show redundant or excessive dependency calls.",
        safety:
          "Preserve business correctness, authorization checks, and required side effects.",
      },
      {
        action: "Change timeouts or concurrency",
        useWhen:
          "Measurements show the existing limits are unsuitable for the dependency and workload.",
        safety:
          "Use coordinated deadlines and bounded concurrency. Longer timeouts can retain workers and connections, worsening overload.",
      },
      {
        action: "Restart a workload",
        useWhen:
          "An approved recovery procedure requires restart or the process is irrecoverably stuck.",
        safety:
          "Capture evidence where safe, verify replica health, and check queue ownership and graceful shutdown behavior.",
      },
    ],
    neverDo: [
      "Do not raise all timeouts just because requests are slow.",
      "Do not increase thread or connection pools without checking the scarce resource.",
      "Do not flush the cache as a generic latency fix.",
      "Do not scale the application blindly when the database or dependency is saturated.",
      "Do not terminate database sessions without identifying transaction and business impact.",
      "Do not run production load tests during an active incident.",
      "Do not enable expensive tracing/profiling across every replica simultaneously.",
      "Do not restart every service before capturing evidence when it is safe to do so.",
    ],
  },

  recoveryVerification: [
    "p50, p95, and p99 return within the agreed SLO or a justified recovery target.",
    "Error, timeout, cancellation, and retry rates return to acceptable levels.",
    "Critical customer workflows complete successfully.",
    "Queue depth and oldest-item age stabilize.",
    "Application worker pools and connection pools have adequate headroom.",
    "Database and external dependency latency remain healthy.",
    "CPU, throttling, GC, memory, and network metrics are stable.",
    "No new retry storm, cache stampede, or recovery backlog appears.",
    "Affected and unaffected replicas behave consistently.",
    "The service remains stable through the required observation window.",
    "Temporary changes have an owner, expiry/review date, and documented rollback plan.",
  ],

  prevention: {
    observability: [
      "Track latency percentiles by endpoint, region, version, and request class.",
      "Alert on SLO burn and tail latency, not only average latency.",
      "Use distributed tracing for major service and dependency boundaries.",
      "Measure queue wait, pool acquisition wait, and actual operation duration separately.",
      "Monitor database, cache, external API, and load balancer latency.",
      "Track retries, fan-out, cancellations, and circuit-breaker activity.",
      "Correlate releases and configuration changes with performance metrics.",
      "Maintain dashboards showing both traffic and CPU per request.",
    ],
    engineering: [
      "Use realistic load tests and representative payloads.",
      "Set bounded timeouts, retries, and queues.",
      "Use backpressure and cancellation to stop work that is no longer useful.",
      "Avoid N+1 database queries and unnecessary sequential dependency calls.",
      "Use connection pooling appropriately and release connections promptly.",
      "Prevent cache stampedes and expensive synchronized recomputation.",
      "Benchmark expensive serialization, regular expressions, and algorithmic hot paths.",
      "Validate database query changes with representative plans and data.",
    ],
    operations: [
      "Use canary or progressive delivery for risky changes.",
      "Keep a tested rollback path and compatibility guidance.",
      "Practice downstream slowdown and retry-storm scenarios in non-production.",
      "Define escalation paths for critical dependencies.",
      "Document profiling safety, sampling policy, and trace-data retention.",
      "Review incidents with measurable corrective actions and clear ownership.",
    ],
  },

  incidentReportTemplate: {
    incidentId: "",
    severity: "",
    service: "",
    environment: "production",
    region: "",
    affectedEndpoints: [],
    affectedVersions: [],
    startTimeUtc: "",
    detectionTimeUtc: "",
    mitigationTimeUtc: "",
    recoveryTimeUtc: "",
    customerImpact: "",
    latencySlo: "",
    baselineP50: "",
    incidentP50: "",
    baselineP95: "",
    incidentP95: "",
    baselineP99: "",
    incidentP99: "",
    requestRateBefore: "",
    requestRateDuring: "",
    errorRateBefore: "",
    errorRateDuring: "",
    retryRateDuring: "",
    slowTraceIds: [],
    longestObservedSpans: [],
    databaseEvidence: "",
    downstreamEvidence: "",
    infrastructureEvidence: "",
    recentChanges: [],
    rootCause: "",
    contributingFactors: [],
    mitigationApplied: "",
    rollbackPerformed: false,
    recoveryEvidence: [],
    customerDataOrIntegrityNotes: "",
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
      "Explain the workload, system conditions, dependency behavior, and missing safeguards that allowed the incident. Focus on system improvements rather than individual blame.",
  },

  handsOnLabs: [
    {
      lab: 1,
      title: "Compare normal and slow request traces",
      environment: "Local or staging instrumented application",
      tasks: [
        "Capture traces for normal and intentionally delayed test requests.",
        "Compare end-to-end duration and individual span timings.",
        "Identify whether delay is in application processing or a dependency.",
        "Record the hypothesis and evidence.",
      ],
      success:
        "Explain how the slowest request segment differs from the overall request duration.",
    },
    {
      lab: 2,
      title: "Simulate a slow database dependency",
      environment: "Disposable database and test application",
      tasks: [
        "Introduce a controlled delay in the test environment.",
        "Observe query duration, connection-pool wait, API latency, and timeouts.",
        "Compare a slow query with pool-acquisition delay.",
        "Restore the test environment and verify recovery.",
      ],
      success:
        "Distinguish query execution latency from waiting for a database connection.",
    },
    {
      lab: 3,
      title: "Demonstrate retry amplification",
      environment: "Local or staging application",
      tasks: [
        "Simulate bounded dependency failures.",
        "Measure request retries, queue depth, and overall latency.",
        "Add backoff and jitter with a maximum attempt count.",
        "Compare the load generated before and after the change.",
      ],
      success:
        "Explain how retries can turn a dependency slowdown into a cascading failure.",
    },
    {
      lab: 4,
      title: "Investigate Kubernetes pod latency",
      environment: "Non-production Kubernetes cluster",
      tasks: [
        "Compare latency, CPU, and throttling across replicas.",
        "Introduce a controlled resource constraint in a test workload.",
        "Observe the relationship between throttling and latency.",
        "Restore resource settings and validate the service.",
      ],
      success:
        "Explain why a single pod can be slow while other replicas remain healthy.",
    },
    {
      lab: 5,
      title: "Write a latency incident postmortem",
      environment: "Synthetic incident timeline",
      tasks: [
        "Correlate percentiles, traffic, errors, traces, and release events.",
        "Identify the earliest abnormal signal.",
        "Document a testable root-cause hypothesis and safe mitigation.",
        "Assign prevention actions with owners and success criteria.",
      ],
      success:
        "Produce an evidence-based report distinguishing cause, symptoms, and contributing factors.",
    },
  ],

  interviewQuestions: [
    {
      question: "How do you troubleshoot a production latency spike?",
      answer:
        "Confirm customer impact, inspect percentiles and errors, compare traffic, follow representative slow traces, identify the slow segment, correlate runtime and dependency metrics, apply a targeted mitigation, and verify sustained recovery.",
    },
    {
      question: "Why is p99 latency important?",
      answer:
        "It describes the slow tail of requests. A service can have a healthy median while a meaningful subset of customers experience severe delays.",
    },
    {
      question: "What is the difference between latency and throughput?",
      answer:
        "Latency is the time taken by an operation. Throughput is the number of operations completed per unit time. Under saturation, throughput may flatten or fall while latency rises.",
    },
    {
      question: "How do distributed traces help?",
      answer:
        "They show the request path and instrumented span durations across services, helping identify slow dependencies, repeated calls, and request-path gaps.",
    },
    {
      question: "Can a healthy CPU still coexist with high latency?",
      answer:
        "Yes. Requests may wait for database connections, locks, external APIs, storage, network responses, or queue slots while consuming little CPU.",
    },
    {
      question: "How do you distinguish a slow query from connection-pool exhaustion?",
      answer:
        "Compare connection acquisition wait with query execution duration and database telemetry. Pool wait can rise even if the query itself is fast.",
    },
    {
      question: "Why can increasing timeouts make an incident worse?",
      answer:
        "Longer waits retain workers and connections, increase in-flight requests, and can amplify queues when the dependency is already overloaded.",
    },
    {
      question: "Why is increasing thread count not always the solution?",
      answer:
        "It can increase contention, context switching, memory use, and downstream concurrency without fixing the underlying bottleneck.",
    },
    {
      question: "What causes tail latency?",
      answer:
        "Slow outliers such as lock contention, queueing, uneven load, GC pauses, dependency delays, retries, and resource saturation can disproportionately affect p95/p99.",
    },
    {
      question: "What is retry amplification?",
      answer:
        "Failures or timeouts cause repeated work, increasing load on the application and dependency. Bounded retries, backoff, jitter, and deadlines help control it.",
    },
    {
      question: "When should you roll back a release?",
      answer:
        "When evidence links the latency regression to the release and the previous version is compatible with current data and schema state.",
    },
    {
      question: "How do you verify recovery?",
      answer:
        "Check sustained latency-SLO compliance, error and retry rates, queues, pool headroom, dependency health, critical workflows, and stability over the required observation window.",
    },
  ],

  completionChecklist: [
    "Severity and customer impact are recorded.",
    "Affected endpoints, versions, regions, and replicas are identified.",
    "Latency percentiles, throughput, and error rates are compared with baseline.",
    "Representative slow traces are examined where available.",
    "Application processing and queue wait are distinguished where instrumentation allows.",
    "Database query time and connection-pool acquisition wait are checked.",
    "External dependencies, retries, and timeouts are investigated.",
    "CPU, throttling, GC, thread pools, memory, network, and storage are checked as relevant.",
    "Recent releases, feature flags, and configuration changes are reviewed.",
    "A testable root-cause hypothesis is documented.",
    "Mitigation approval and rollback criteria are recorded.",
    "Recovery is verified using customer-facing workflows and sustained telemetry.",
    "Temporary changes have owners and review dates.",
    "A blameless incident report and corrective actions are recorded.",
  ],

  officialReferences: [
    {
      title: "Google SRE Book — Monitoring Distributed Systems",
      url: "https://sre.google/sre-book/monitoring-distributed-systems/",
    },
    {
      title: "Google SRE Book — Addressing Cascading Failures",
      url: "https://sre.google/sre-book/addressing-cascading-failures/",
    },
    {
      title: "OpenTelemetry — Documentation",
      url: "https://opentelemetry.io/docs/",
    },
    {
      title: "OpenTelemetry — Concepts",
      url: "https://opentelemetry.io/docs/concepts/",
    },
    {
      title: "Kubernetes — Resource Management",
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
      title: "PostgreSQL — Monitoring Database Activity",
      url: "https://www.postgresql.org/docs/current/monitoring-stats.html",
    },
    {
      title: "PostgreSQL — Explicit Locking",
      url: "https://www.postgresql.org/docs/current/explicit-locking.html",
    },
    {
      title: "Linux — ss manual",
      url: "https://man7.org/linux/man-pages/man8/ss.8.html",
    },
    {
      title: "Linux — curl manual",
      url: "https://curl.se/docs/manpage.html",
    },
  ],

  notes: [
    "Latency percentiles depend on histogram boundaries, aggregation, sampling, and monitoring implementation. Compare like-for-like measurements.",
    "Distributed trace spans may overlap. Do not blindly add child span durations to calculate end-to-end latency.",
    "Kubernetes metrics may be averaged or delayed; use the monitoring system's documented semantics.",
    "Database queries and commands require appropriate permissions and should follow the database team's safety procedure.",
    "JVM diagnostics must be compatible with the deployed Java version and may affect a busy process.",
    "A single curl timing is a clue, not proof of a network or server-side root cause.",
    "This guide is a troubleshooting framework, not authorization to perform destructive production actions.",
  ],
} as const;

export default latencySpikesGuide;
