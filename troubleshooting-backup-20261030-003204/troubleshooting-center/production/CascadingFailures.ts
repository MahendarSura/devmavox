
export const cascadingFailuresGuide = {
  title: "Cascading Failures — Real Production Troubleshooting",
  fileName: "CascadingFailures.ts",
  category: "production",
  difficulty: "advanced",
  estimatedTime: "120–240 minutes",

  description:
    "Production incident runbook for diagnosing failures that spread across dependent services. Covers overload propagation, retry storms, connection-pool exhaustion, queue backlogs, dependency failures, Kubernetes, cloud infrastructure, traffic containment, recovery sequencing, and blameless post-incident reviews.",

  objectives: [
    "Understand how a local failure becomes a multi-service outage.",
    "Identify the original bottleneck separately from downstream symptoms.",
    "Measure blast radius, customer impact, and incident severity.",
    "Use metrics, logs, traces, dependency maps, and timelines together.",
    "Detect retry amplification, queue growth, pool exhaustion, and resource saturation.",
    "Contain cascading failures without causing a second outage.",
    "Recover dependencies in a safe order and prevent overload from returning.",
    "Design resilience controls and validate them through controlled failure testing.",
  ],

  incidentScenario: {
    title: "One slow dependency takes down several customer-facing services",
    timeline: [
      {
        time: "10:00 UTC",
        event:
          "A database or third-party dependency begins responding slowly.",
      },
      {
        time: "10:03 UTC",
        event:
          "Application requests wait longer for connections and downstream responses.",
      },
      {
        time: "10:05 UTC",
        event:
          "Worker pools fill with blocked requests; API latency and timeout rates rise.",
      },
      {
        time: "10:07 UTC",
        event:
          "Clients and services retry failed requests, adding more load to the struggling dependency.",
      },
      {
        time: "10:10 UTC",
        event:
          "Queue depth grows, healthy target counts fall, and unrelated endpoints begin failing.",
      },
      {
        time: "10:15 UTC",
        event:
          "Autoscaling creates more application replicas, but aggregate database connections and downstream traffic increase further.",
      },
    ],
    impact: [
      "Multiple APIs return 5xx responses or time out.",
      "A previously healthy service becomes unavailable because it shares a dependency or resource pool.",
      "Queue consumers fall behind and asynchronous jobs accumulate.",
      "Customer operations may be delayed, duplicated, or left in an uncertain state.",
      "Recovery becomes slower because restarting services or replaying work increases load.",
    ],
    keyPrinciple:
      "The first visible failure is not necessarily the initiating failure. Find the earliest abnormal signal in the dependency chain and identify the resource that limits recovery.",
  },

  cascadingFailureModel: {
    exampleChain: [
      "Database query latency increases.",
      "Database connections remain occupied for longer.",
      "Application connection pools become saturated.",
      "Requests wait for connections and occupy worker threads.",
      "API latency and timeout rates rise.",
      "Clients retry requests and create additional work.",
      "Database, caches, and downstream APIs receive even more load.",
      "More services become unhealthy and the outage spreads.",
    ],
    propagationMechanisms: [
      {
        mechanism: "Resource contention",
        explanation:
          "Services compete for CPU, memory, threads, connections, file descriptors, or network capacity.",
      },
      {
        mechanism: "Synchronous dependency chains",
        explanation:
          "A slow downstream call keeps upstream requests active and consumes limited concurrency.",
      },
      {
        mechanism: "Retry amplification",
        explanation:
          "Retries add traffic precisely when the target has less capacity to process it.",
      },
      {
        mechanism: "Queue accumulation",
        explanation:
          "Arrival rate exceeds processing rate; queue age and memory usage grow until deadlines or capacity limits are reached.",
      },
      {
        mechanism: "Shared dependencies",
        explanation:
          "Multiple services fail together because they share a database, cache, identity provider, network, or external API.",
      },
      {
        mechanism: "Autoscaling feedback",
        explanation:
          "Additional replicas may increase downstream connections, cache misses, synchronization traffic, and dependency pressure.",
      },
      {
        mechanism: "Health-check feedback",
        explanation:
          "Transient dependency failures make replicas fail readiness checks, removing capacity and pushing more traffic to the remaining replicas.",
      },
      {
        mechanism: "Recovery storm",
        explanation:
          "Restarting many replicas simultaneously can cause cold-cache traffic, connection storms, simultaneous initialization, and additional load.",
      },
    ],
  },

  impactAndSeverity: {
    principle:
      "Use the organization's formal severity policy. The levels below are examples and must be adapted to actual customer impact and contractual obligations.",
    levels: [
      {
        severity: "SEV1",
        criteria:
          "Major customer-facing outage across critical services, broad transaction failures, significant data-integrity risk, or no viable workaround.",
        actions: [
          "Declare the incident and assign an incident commander.",
          "Engage service owners and dependency owners immediately.",
          "Prioritize containment and critical customer journeys.",
          "Provide updates through approved communication channels.",
        ],
      },
      {
        severity: "SEV2",
        criteria:
          "Multiple services degraded, high error rates, substantial latency, or a critical workflow failing for a large subset of users.",
        actions: [
          "Coordinate application, platform, database, and networking investigations.",
          "Identify and contain the shared bottleneck.",
          "Monitor whether the failure is spreading to additional services.",
        ],
      },
      {
        severity: "SEV3",
        criteria:
          "Limited blast radius, partial degradation, or an effective workaround exists.",
        actions: [
          "Assign a clear owner and investigate before the impact expands.",
          "Track leading indicators such as queue age and pool wait time.",
        ],
      },
      {
        severity: "SEV4",
        criteria:
          "Low-impact or isolated failure with no significant service degradation.",
        actions: [
          "Record the issue and resolve it through the standard process.",
          "Review whether resilience gaps warrant preventive work.",
        ],
      },
    ],
    measure: [
      "Which services and customer journeys are affected?",
      "How many regions, tenants, endpoints, and customers are affected?",
      "Are errors increasing across services or only within one component?",
      "Which service first showed abnormal latency, saturation, or errors?",
      "Are database writes, payment-like operations, or queued jobs in an uncertain state?",
      "Is customer impact still expanding?",
      "Are retries, queue depth, and resource consumption increasing faster than throughput?",
      "Is there a safe degraded mode that preserves critical operations?",
    ],
  },

  incidentCommand: {
    responsibilities: [
      {
        role: "Incident Commander",
        duties:
          "Sets priorities, coordinates the response, approves the mitigation plan, and ensures clear communication.",
      },
      {
        role: "Technical Lead",
        duties:
          "Maintains the dependency failure hypothesis, coordinates investigation, and recommends containment.",
      },
      {
        role: "Service Owners",
        duties:
          "Inspect their service's metrics, logs, traces, resource pools, and dependency behavior.",
      },
      {
        role: "Platform / SRE",
        duties:
          "Investigates infrastructure, traffic routing, autoscaling, Kubernetes, and observability.",
      },
      {
        role: "Data / Dependency Owner",
        duties:
          "Checks database, cache, message broker, or third-party service capacity and recovery safety.",
      },
      {
        role: "Scribe / Communications Owner",
        duties:
          "Records timestamps, actions, evidence, decisions, and stakeholder updates.",
      },
    ],
    rules: [
      "Establish one incident channel and one authoritative timeline.",
      "Assign parallel investigations with explicit owners and expected findings.",
      "Record the hypothesis and expected effect before a risky change.",
      "Coordinate traffic shifting, retry changes, scaling, and restarts across teams.",
      "Do not allow independent teams to increase load on the same struggling dependency without coordination.",
      "Preserve evidence while prioritizing customer-impact reduction.",
    ],
  },

  safetyChecks: [
    "Confirm the exact production account, region, cluster, namespace, service, and dependency.",
    "Verify current deployment, configuration, feature-flag, and infrastructure versions.",
    "Use approved incident access and production change controls.",
    "Capture baseline metrics and recent events before changing state, when practical.",
    "Avoid restarting all replicas, consumers, or dependency instances simultaneously.",
    "Do not blindly increase retries, timeouts, thread counts, pool sizes, or replicas.",
    "Do not purge queues, delete persistent data, or replay non-idempotent operations without an approved data-safety plan.",
    "Do not disable authentication, TLS verification, rate limiting, or security policies to restore superficial health.",
    "Protect credentials, customer information, tokens, and sensitive topology in logs and screenshots.",
    "Define an abort condition and rollback plan for every significant mitigation.",
  ],

  evidenceCollection: {
    serviceMetrics: [
      "Request rate, successful throughput, HTTP error rate, and latency percentiles.",
      "In-flight requests, active workers, queue wait time, and rejected requests.",
      "CPU usage, CPU throttling, memory pressure, garbage collection, and process restarts.",
      "Connection-pool active, idle, pending, and acquisition-timeout counts.",
      "Database query latency, lock waits, connection limits, and storage performance.",
      "Queue depth, oldest message age, consumer lag, and dead-letter volume.",
      "Dependency latency, error rate, timeout rate, and retry count.",
      "Autoscaler desired replicas versus actual ready replicas.",
      "Load-balancer healthy targets and traffic distribution.",
      "Circuit-breaker state, bulkhead rejections, and rate-limit counters.",
    ],
    evidenceRules: [
      "Use the same time range across services and normalize timestamps to UTC.",
      "Compare against a known-good period and the normal daily traffic pattern.",
      "Separate customer-facing symptoms from internal dependency symptoms.",
      "Correlate traces by trace ID and logs by request or correlation ID.",
      "Identify whether telemetry gaps result from the outage itself.",
      "Capture deployment IDs, configuration versions, dependency status, and change events.",
      "Avoid unbounded log dumps or expensive diagnostic queries during an active overload incident.",
    ],
  },

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm the blast radius",
      objective:
        "Establish whether the incident is isolated, regional, or spreading across services.",
      actions: [
        "Check customer-facing SLIs and synthetic checks.",
        "List affected services, endpoints, regions, tenants, and workflows.",
        "Compare failing services with healthy services that use similar dependencies.",
        "Determine whether the incident is expanding over time.",
      ],
      decisions: [
        {
          if: "Only one endpoint is failing",
          then:
            "Investigate route-specific code, data, authorization, and dependency calls before assuming a system-wide cascade.",
        },
        {
          if: "Several services using the same dependency fail together",
          then:
            "Prioritize the shared dependency, connection path, credentials, and resource limits.",
        },
        {
          if: "Unrelated services fail across the same nodes or region",
          then:
            "Investigate shared infrastructure such as networking, DNS, node pressure, regional services, or identity.",
        },
        {
          if: "The number of affected services keeps increasing",
          then:
            "Treat containment as an immediate priority while maintaining a parallel root-cause investigation.",
        },
      ],
    },

    {
      step: 2,
      title: "Build a dependency map and failure timeline",
      objective:
        "Find the earliest abnormal component and the direction in which failures propagated.",
      actions: [
        "Draw the request path from client to edge, application, database, and external services.",
        "Include asynchronous queues, caches, identity providers, DNS, and shared network paths.",
        "Mark the first abnormal metric, first error, first timeout, and first capacity change.",
        "Compare the timeline with deployments, traffic changes, secret rotation, and infrastructure events.",
        "Identify services that share the same dependency or connection pool.",
      ],
      decisions: [
        {
          if: "Dependency latency rises before upstream errors",
          then:
            "Investigate the dependency and its resource limits as a likely initiating bottleneck.",
        },
        {
          if: "Upstream request volume or retries rise before dependency saturation",
          then:
            "Investigate traffic amplification, retry policy, client behavior, and overload protection.",
        },
        {
          if: "Several components change at the same time",
          then:
            "Use traces, per-instance comparisons, and controlled tests to distinguish competing hypotheses.",
        },
      ],
    },

    {
      step: 3,
      title: "Inspect service-level metrics",
      objective:
        "Distinguish increased demand, degraded throughput, and resource saturation.",
      metrics: [
        {
          metric: "Traffic",
          signal:
            "Incoming requests rise sharply, or traffic distribution changes between regions or instances.",
          next:
            "Check customer demand, retries, scheduled jobs, bot traffic, and routing changes.",
        },
        {
          metric: "Errors",
          signal:
            "5xx, timeout, connection reset, or dependency-specific failures increase.",
          next:
            "Classify errors by route, dependency, instance, and release.",
        },
        {
          metric: "Latency",
          signal:
            "p95/p99 increases before or alongside errors.",
          next:
            "Use traces to identify queueing, application time, network time, and dependency time.",
        },
        {
          metric: "Saturation",
          signal:
            "Worker pools, connection pools, queues, CPU, memory, or file descriptors approach configured limits.",
          next:
            "Identify the constrained resource and determine whether the load is legitimate or amplified.",
        },
        {
          metric: "Throughput",
          signal:
            "Completed requests per second fall even while incoming traffic stays high.",
          next:
            "Check blocked workers, downstream latency, locks, throttling, and retry overhead.",
        },
      ],
      rules: [
        "A high CPU value alone does not prove CPU is the root cause.",
        "Low CPU with high latency may indicate I/O waits, locks, queues, or blocked threads.",
        "A green health endpoint does not prove critical customer workflows work.",
        "Averages can hide severe tail latency; inspect percentiles and distributions.",
      ],
    },

    {
      step: 4,
      title: "Trace a failed request across services",
      objective:
        "Identify the span or boundary where the request starts waiting or failing.",
      actions: [
        "Select representative failed traces and comparable successful traces.",
        "Inspect the first failing or unusually slow span.",
        "Compare server processing time with client-observed duration.",
        "Inspect retry spans, repeated calls, queue waits, and connection acquisition.",
        "Check whether the same dependency is slow across several callers.",
      ],
      decisions: [
        {
          if: "A database span dominates request duration",
          then:
            "Inspect query performance, locks, pool waits, connection limits, and database saturation.",
        },
        {
          if: "A remote HTTP span dominates request duration",
          then:
            "Inspect downstream status, latency, timeouts, retries, quotas, and network path.",
        },
        {
          if: "No downstream span is slow but application latency is high",
          then:
            "Investigate local worker queues, locks, garbage collection, CPU, serialization, and event-loop delay.",
        },
        {
          if: "Traces are missing or sampled away",
          then:
            "Use logs, edge timing, dependency metrics, and bounded diagnostics; absence of traces is not proof that a call did not occur.",
        },
      ],
    },

    {
      step: 5,
      title: "Detect retry storms and amplification",
      objective:
        "Determine whether retries are adding load faster than the failing service can recover.",
      signals: [
        "Request volume at a dependency rises even though successful throughput falls.",
        "The same logical operation appears repeatedly in logs or traces.",
        "Retries happen immediately or at synchronized intervals.",
        "Several layers retry the same request independently.",
        "Queue depth and downstream error rate rise together.",
        "Timeouts occur after work may already have completed.",
      ],
      checks: [
        "Count attempts per logical request and identify which layer owns each retry.",
        "Inspect retryable status codes and exception types.",
        "Check whether retries have a bounded attempt count and total deadline.",
        "Check for exponential backoff and jitter where appropriate.",
        "Verify idempotency for writes and external side effects.",
        "Check whether client, gateway, application, SDK, and job runner all retry the same operation.",
      ],
      decisions: [
        {
          if: "Retries are amplifying dependency load",
          then:
            "Reduce unnecessary attempts through the approved configuration or traffic-control mechanism. Preserve retries only where safe and useful.",
        },
        {
          if: "A timeout occurs but operation completion is uncertain",
          then:
            "Check transaction or operation status before retrying non-idempotent work.",
        },
        {
          if: "Retries are already bounded and low",
          then:
            "Investigate the original dependency failure and resource saturation instead of changing retry policy unnecessarily.",
        },
      ],
      caution:
        "Disabling every retry can also reduce resilience. Change retry behavior based on operation semantics, total deadlines, dependency health, and measured amplification.",
    },

    {
      step: 6,
      title: "Inspect connection-pool and worker saturation",
      objective:
        "Determine whether requests are blocked waiting for a finite resource.",
      inspect: [
        "Active and idle database connections.",
        "Connection acquisition latency and timeout counts.",
        "HTTP client connection-pool usage and pending requests.",
        "Worker-thread utilization and blocked-thread stacks.",
        "Event-loop delay and event-loop blocking for asynchronous runtimes.",
        "File descriptor usage and socket state.",
        "Connection creation rate and database connection churn.",
      ],
      decisions: [
        {
          if: "Pool pending count rises while active connections remain at maximum",
          then:
            "Determine whether connections are held by slow queries, leaks, long transactions, or an undersized pool relative to safe downstream capacity.",
        },
        {
          if: "Worker threads are blocked on a dependency",
          then:
            "Reduce or contain new work where safe and address the dependency or blocking call. More worker threads may only move the queue elsewhere.",
        },
        {
          if: "Connections repeatedly open and close",
          then:
            "Inspect pooling, connection churn, TLS handshakes, and restart behavior.",
        },
        {
          if: "All local pools look healthy",
          then:
            "Continue to remote dependency, network, routing, and data-specific investigation.",
        },
      ],
    },

    {
      step: 7,
      title: "Inspect databases and shared data stores",
      objective:
        "Find whether query execution, locks, connection limits, or storage latency initiated the cascade.",
      inspect: [
        "Database availability and connection failures.",
        "Query latency distributions and slow-query samples.",
        "Lock waits, deadlocks, long transactions, and transaction age.",
        "Connection limits across all application replicas and other clients.",
        "CPU, memory, storage latency, IOPS, and replication lag.",
        "Cache hit ratio, evictions, connection saturation, and cold-cache effects.",
        "Recent schema, index, query, credential, and network changes.",
      ],
      decisions: [
        {
          if: "Lock waits and long transactions dominate",
          then:
            "Identify the blocking transaction and coordinate a safe database-owner-approved intervention.",
        },
        {
          if: "Connection limits are reached",
          then:
            "Calculate total possible connections across all replicas and clients before changing pool sizes.",
        },
        {
          if: "Queries become slow after a release",
          then:
            "Compare query plans, query volume, index changes, and parameter distributions.",
        },
        {
          if: "Cache failure causes a sudden database traffic increase",
          then:
            "Restore cache health or use a controlled fallback that protects database capacity; avoid an uncontrolled cache warm-up.",
        },
      ],
    },

    {
      step: 8,
      title: "Inspect message brokers and asynchronous processing",
      objective:
        "Determine whether queued work is accumulating or failing repeatedly.",
      inspect: [
        "Queue depth and oldest-message age.",
        "Producer rate versus consumer processing rate.",
        "Consumer group lag and active consumer count.",
        "Redelivery count, poison messages, and dead-letter queue growth.",
        "Consumer restarts, concurrency, batch size, and downstream latency.",
        "Message ordering, acknowledgement timing, and duplicate-processing risk.",
      ],
      decisions: [
        {
          if: "Producer rate exceeds consumer throughput",
          then:
            "Reduce incoming work where possible, fix the bottleneck, and scale consumers only when downstream capacity supports it.",
        },
        {
          if: "One message repeatedly fails and is redelivered",
          then:
            "Use the approved poison-message or dead-letter workflow; do not purge the queue indiscriminately.",
        },
        {
          if: "Consumer scaling overloads a downstream database",
          then:
            "Reduce consumer concurrency or batch size to a sustainable level and recover downstream health first.",
        },
        {
          if: "Queue depth is high but oldest-message age is falling",
          then:
            "Check whether the backlog is draining at a sustainable rate before making additional scaling changes.",
        },
      ],
    },

    {
      step: 9,
      title: "Check Kubernetes, nodes, and autoscaling feedback",
      objective:
        "Identify whether scheduling, readiness, resource limits, or scale-out behavior is worsening the cascade.",
      commands: [
        {
          command: "kubectl config current-context",
          meaning:
            "Shows the active Kubernetes context. Verify the target before any production write action.",
        },
        {
          command: "kubectl get deploy,rs,pods,hpa -n <namespace> -o wide",
          meaning:
            "Shows workload state, pod placement, restart counts, and HPA status for the namespace.",
        },
        {
          command: "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
          meaning:
            "Helps correlate scheduling, probe, image, eviction, and scaling events.",
        },
        {
          command: "kubectl top pods -n <namespace>",
          meaning:
            "Shows pod resource usage when Metrics Server and permissions are available.",
          caution:
            "Usage snapshots do not show all throttling, memory pressure, or historical trends.",
        },
        {
          command: "kubectl describe hpa <hpa-name> -n <namespace>",
          meaning:
            "Shows autoscaling metrics, desired replicas, and scaling conditions.",
        },
        {
          command: "kubectl describe pod <pod-name> -n <namespace>",
          meaning:
            "Shows container states, probe failures, resource-related events, and termination reasons.",
        },
      ],
      decisions: [
        {
          if: "HPA scales up but database load increases further",
          then:
            "Reassess concurrency and aggregate connection limits; reduce scale or request concurrency if needed and approved.",
        },
        {
          if: "Pods cannot schedule",
          then:
            "Check node capacity, resource requests, quotas, affinity, taints, and cluster autoscaler limits.",
        },
        {
          if: "Pods fail readiness during dependency degradation",
          then:
            "Confirm whether readiness semantics are correct. Avoid making pods appear ready if they cannot serve requests safely.",
        },
        {
          if: "Nodes are under pressure or pods are being evicted",
          then:
            "Inspect node memory/disk pressure, resource limits, workload density, and recent scheduling changes.",
        },
      ],
      caution:
        "Kubernetes commands can expose internal metadata. Use the approved context, namespace, and read-only diagnostics first.",
    },

    {
      step: 10,
      title: "Check network, DNS, TLS, and service discovery",
      objective:
        "Identify failures that affect multiple services despite healthy processes.",
      checks: [
        "DNS lookup errors, record changes, and service-discovery health.",
        "TCP resets, connect timeouts, packet loss, and connection tracking pressure.",
        "TLS handshake failures, certificate expiration, and trust-chain problems.",
        "Load-balancer target health and routing changes.",
        "NetworkPolicies, firewall rules, security groups, and service-mesh policies.",
        "NAT, ephemeral-port, file-descriptor, and connection-tracking limits where applicable.",
      ],
      decisions: [
        {
          if: "Multiple callers cannot resolve the same dependency",
          then:
            "Investigate the shared DNS resolver, record, private zone, or service-discovery path.",
        },
        {
          if: "Connection establishment fails before application processing",
          then:
            "Investigate routing, firewall, DNS, TLS, and network resource limits.",
        },
        {
          if: "Only one source workload cannot connect",
          then:
            "Compare its identity, network policy, namespace, node, DNS configuration, and egress path.",
        },
      ],
    },

    {
      step: 11,
      title: "Check recent deployments, configuration, and secrets",
      objective:
        "Identify whether a change triggered the initial failure or removed a resilience safeguard.",
      inspect: [
        "Release and artifact versions across affected services.",
        "Connection pool, timeout, retry, concurrency, and queue configuration.",
        "Feature flags and remote configuration.",
        "Secret rotation, certificate renewal, IAM and workload-identity changes.",
        "Database schema changes and backward compatibility.",
        "Autoscaling thresholds and health-check changes.",
        "Infrastructure, routing, firewall, and DNS changes.",
      ],
      decisions: [
        {
          if: "Failures align with a release and the new version uses more dependency capacity",
          then:
            "Compare request patterns, concurrency, queries, pool settings, and rollout health with the known-good version.",
        },
        {
          if: "Multiple services fail after a shared secret or certificate change",
          then:
            "Inspect the shared credential path and rotation sequence before independently changing every service.",
        },
        {
          if: "No recent change aligns with the first failure",
          then:
            "Prioritize demand spikes, dependency incidents, latent capacity limits, external provider changes, and scheduled work.",
        },
      ],
    },

    {
      step: 12,
      title: "Identify the initiating bottleneck",
      objective:
        "Separate the original cause from resources exhausted later in the cascade.",
      method: [
        "Find the earliest abnormal metric or error in the timeline.",
        "Trace backward from the first saturated resource to its callers and inputs.",
        "Compare dependency latency with upstream request volume and retries.",
        "Check whether the suspected dependency was unhealthy before callers began failing.",
        "Use a low-risk test to distinguish the leading hypotheses.",
        "Record supporting evidence and contradictory evidence.",
        "Confirm the cause with the owning team where the system is outside your operational scope.",
      ],
      example:
        "A database pool is saturated, but traces show database query latency rose several minutes before the pool filled. The likely initiating issue is slow query execution or database contention; pool exhaustion is a downstream symptom. Increasing pool size without checking database capacity may worsen the incident.",
      rule:
        "A resource being full explains where requests are blocked, not necessarily why the cascade began.",
    },

    {
      step: 13,
      title: "Contain the cascade",
      objective:
        "Stop overload propagation while preserving critical business operations.",
      options: [
        {
          action: "Reduce or shed noncritical traffic",
          useWhen:
            "The system is overloaded and the service supports an approved priority or rate-limiting mechanism.",
          risks:
            "May reject valid customer requests or violate contractual behavior if the policy is too broad.",
          verify:
            "Check reduced arrival rate, preserved critical throughput, and improving dependency saturation.",
        },
        {
          action: "Reduce retries",
          useWhen:
            "Measured retry amplification is adding substantial load.",
          risks:
            "May reduce eventual success for transient failures; write operations may have uncertain outcomes.",
          verify:
            "Measure attempts per logical request, downstream traffic, and error rate.",
        },
        {
          action: "Limit concurrency",
          useWhen:
            "A dependency needs bounded concurrent requests to recover.",
          risks:
            "Throughput may decrease temporarily; queueing can move elsewhere.",
          verify:
            "Check dependency latency, queue age, request rejection, and overall customer impact.",
        },
        {
          action: "Enable circuit breaking or a safe fallback",
          useWhen:
            "The dependency is failing and the application has a tested fallback or fail-fast behavior.",
          risks:
            "Fallback results may be stale or incomplete; unsafe fallback may violate business semantics.",
          verify:
            "Check breaker state, fallback correctness, critical workflows, and downstream traffic.",
        },
        {
          action: "Reduce consumer concurrency",
          useWhen:
            "Queue consumers are overwhelming a shared dependency.",
          risks:
            "Backlog can grow; time-sensitive processing may be delayed.",
          verify:
            "Check dependency health, oldest-message age, processing rate, and redelivery count.",
        },
        {
          action: "Scale capacity carefully",
          useWhen:
            "A verified capacity shortage exists and dependencies have sufficient headroom.",
          risks:
            "More replicas can increase database connections, cache misses, and remote traffic.",
          verify:
            "Check ready replicas, throughput, dependency capacity, and queue depth.",
        },
        {
          action: "Roll back a causative release",
          useWhen:
            "Evidence implicates the release and rollback is compatible with current data and infrastructure.",
          risks:
            "Schema changes, message formats, and in-flight operations may make rollback unsafe.",
          verify:
            "Confirm active artifact, customer journeys, service-level indicators, and dependency recovery.",
        },
      ],
      rule:
        "Select the smallest reversible action that reduces the measured overload. Coordinate any change that affects a shared dependency across service owners.",
    },

    {
      step: 14,
      title: "Recover services in a controlled order",
      objective:
        "Avoid causing a second cascade while dependencies and queues recover.",
      sequence: [
        "Confirm that the initiating dependency is stable enough to accept work.",
        "Maintain rate limits, concurrency caps, or circuit breakers while recovery begins.",
        "Restore critical paths and verify successful transactions.",
        "Bring consumers and noncritical workloads back gradually.",
        "Increase traffic or concurrency in measured increments.",
        "Watch connection creation, query latency, queue age, retry counts, and resource usage.",
        "Check for stale cache effects, duplicate messages, partial transactions, and delayed jobs.",
        "Remove temporary controls only after the system demonstrates sustainable headroom.",
      ],
      decisions: [
        {
          if: "Dependency latency rises again during recovery",
          then:
            "Pause the ramp-up and return to the last stable traffic/concurrency level.",
        },
        {
          if: "Queues drain but oldest-message age remains high",
          then:
            "Measure remaining backlog and processing rate; do not declare recovery based only on falling queue depth.",
        },
        {
          if: "Errors fall but data-integrity concerns remain",
          then:
            "Keep the incident open for reconciliation and transaction verification.",
        },
      ],
    },

    {
      step: 15,
      title: "Verify recovery and monitor for recurrence",
      objective:
        "Prove that the cascade has stopped and that the system can sustain normal traffic.",
      checks: [
        "Customer-facing availability and critical synthetic checks.",
        "Request error rate and latency percentiles.",
        "Dependency latency and successful throughput.",
        "Connection-pool waits and active connection counts.",
        "Retry rate and attempts per logical request.",
        "Queue depth, oldest-message age, and consumer lag.",
        "Ready replicas, healthy targets, restarts, and autoscaling stability.",
        "Database locks, storage latency, and transaction health.",
        "Data consistency and uncertain customer operations.",
        "Alert recurrence and error-budget burn during the observation window.",
      ],
      resolvedDefinition:
        "Resolve only after critical customer journeys and service indicators remain healthy for the required observation window, dependencies have sustainable headroom, backlogs are understood, and data-integrity risks have an owner and a documented plan.",
    },
  ],

  rootCauseMatrix: [
    {
      cause: "Slow database queries",
      evidence:
        "Database latency increases before application pool exhaustion; traces show slow query spans or lock waits.",
      containment:
        "Reduce noncritical query load, protect database capacity, and coordinate a safe query or transaction mitigation.",
      permanentFix:
        "Optimize queries, execution plans, indexing, transaction scope, and capacity monitoring.",
    },
    {
      cause: "Retry storm",
      evidence:
        "Attempts per logical request rise; downstream traffic increases while successful throughput falls.",
      containment:
        "Reduce unnecessary retries, enforce deadlines, and apply controlled concurrency or rate limits.",
      permanentFix:
        "Use bounded retries, backoff, jitter, idempotency, and a single clear retry ownership policy.",
    },
    {
      cause: "Connection-pool exhaustion",
      evidence:
        "Pending borrowers and acquisition timeouts rise; active connections remain at the configured limit.",
      containment:
        "Reduce incoming concurrency and investigate long-held connections or slow operations.",
      permanentFix:
        "Fix leaks and slow operations, then tune pools against actual downstream capacity.",
    },
    {
      cause: "Queue backlog",
      evidence:
        "Arrival rate exceeds processing rate; oldest-message age and consumer lag rise.",
      containment:
        "Control producers, limit consumer concurrency, and isolate poison messages through approved procedures.",
      permanentFix:
        "Tune consumer throughput, idempotency, backpressure, queue limits, and alerting.",
    },
    {
      cause: "Cache outage or cold cache",
      evidence:
        "Cache errors or misses rise before database load increases.",
      containment:
        "Use a safe fallback, request coalescing, or controlled traffic reduction.",
      permanentFix:
        "Improve cache resilience, warm-up strategy, TTL design, and database protection.",
    },
    {
      cause: "Autoscaling feedback",
      evidence:
        "Replica count rises while aggregate database connections or dependency load worsen.",
      containment:
        "Limit concurrency or scale to a sustainable level using the approved controls.",
      permanentFix:
        "Scale with dependency-aware limits, realistic load tests, and aggregate connection budgets.",
    },
    {
      cause: "Shared DNS, TLS, or networking issue",
      evidence:
        "Multiple callers fail to establish connections to a shared endpoint despite healthy processes.",
      containment:
        "Restore the verified routing, certificate, DNS, or network configuration.",
      permanentFix:
        "Add expiry alerts, configuration validation, dependency-path monitoring, and tested failover.",
    },
    {
      cause: "Worker or event-loop starvation",
      evidence:
        "Requests queue locally, blocked stacks or event-loop delay increase, and throughput falls.",
      containment:
        "Reduce new work and restore the blocked dependency or offending execution path.",
      permanentFix:
        "Use bounded concurrency, nonblocking operations where appropriate, and contention testing.",
    },
    {
      cause: "Resource exhaustion",
      evidence:
        "OOM events, CPU throttling, file descriptor exhaustion, or node pressure correlate with failures.",
      containment:
        "Relieve the verified resource bottleneck without triggering a synchronized restart.",
      permanentFix:
        "Set realistic resource requests/limits, capacity thresholds, and leak detection.",
    },
    {
      cause: "Unsafe recovery or replay",
      evidence:
        "Errors recur during restart, queue replay, cache warm-up, or rapid traffic restoration.",
      containment:
        "Pause the ramp-up and return to the last stable state.",
      permanentFix:
        "Use staged recovery, idempotent processing, explicit replay plans, and game-day exercises.",
    },
  ],

  safeCommandReference: [
    {
      command: "kubectl config current-context",
      purpose:
        "Verify the active Kubernetes context before investigating a production incident.",
      warning:
        "A correct context does not prove the namespace, account, or target service is correct.",
    },
    {
      command: "kubectl get deploy,pods,hpa -n <namespace> -o wide",
      purpose:
        "Inspect rollout state, pod status, placement, and autoscaler behavior.",
      warning:
        "Use a bounded namespace and inspect events for the underlying reason.",
    },
    {
      command: "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
      purpose:
        "Correlate scheduling, probe, image, eviction, and scaling events.",
      warning:
        "Events may expire or be incomplete.",
    },
    {
      command: "kubectl top pods -n <namespace>",
      purpose:
        "Get a current resource-usage snapshot when Metrics Server is available.",
      warning:
        "A snapshot is not a historical trend or a full diagnosis of CPU throttling and memory pressure.",
    },
    {
      command: "curl -sS -o /dev/null -w 'status=%{http_code} total=%{time_total}s\\n' --max-time 10 https://api.example.com/health",
      purpose:
        "Perform a bounded health request and report status and total duration.",
      warning:
        "Use only an approved safe endpoint; a shallow health check does not validate the full business journey.",
    },
    {
      command: "ss -s",
      purpose:
        "Summarize socket statistics on a Linux host.",
      warning:
        "Interpret results with host, container, and network-namespace context.",
    },
    {
      command: "df -h && df -i",
      purpose:
        "Check filesystem capacity and inode exhaustion on a Linux host.",
      warning:
        "Do not delete arbitrary files to free space during an incident.",
    },
  ],

  prevention: {
    resiliencePatterns: [
      {
        pattern: "Timeout budgets",
        guidance:
          "Set connect, read, and overall deadlines according to the end-to-end latency budget. Ensure downstream calls cannot occupy resources indefinitely.",
      },
      {
        pattern: "Bounded retries",
        guidance:
          "Use a finite attempt budget, exponential backoff, and jitter where appropriate. Ensure the overall deadline accounts for all attempts.",
      },
      {
        pattern: "Idempotency",
        guidance:
          "Make retryable writes safe using idempotency keys or equivalent deduplication and transaction semantics.",
      },
      {
        pattern: "Circuit breakers",
        guidance:
          "Fail fast during sustained dependency failures and use deliberate half-open recovery rather than sending unrestricted traffic.",
      },
      {
        pattern: "Bulkheads",
        guidance:
          "Isolate critical workflows and dependencies with separate bounded concurrency or resource pools where appropriate.",
      },
      {
        pattern: "Backpressure",
        guidance:
          "Bound queues and in-flight work; reject, defer, or shed noncritical requests when the system cannot safely process more.",
      },
      {
        pattern: "Load shedding",
        guidance:
          "Preserve critical operations and return explicit failure responses for lower-priority work instead of allowing total collapse.",
      },
      {
        pattern: "Dependency-aware scaling",
        guidance:
          "Coordinate application replicas, worker concurrency, database connections, and downstream quotas.",
      },
      {
        pattern: "Graceful degradation",
        guidance:
          "Provide tested fallback behavior only when correctness, authorization, and data consistency remain safe.",
      },
      {
        pattern: "Staged recovery",
        guidance:
          "Restore traffic and workers gradually, measuring dependency headroom before increasing load.",
      },
    ],
    observability: [
      "Define availability, latency, traffic, error, and saturation indicators for critical services.",
      "Alert on dependency latency and connection-pool wait time before customer-facing errors spike.",
      "Monitor queue age, retries per logical request, and autoscaler desired-versus-ready replicas.",
      "Use distributed tracing with consistent service and deployment metadata.",
      "Create dependency maps and document service owners and escalation paths.",
      "Alert on certificate expiry, quota exhaustion, and database connection budgets.",
      "Keep dashboards usable during telemetry ingestion or logging failures.",
    ],
    testing: [
      "Run controlled load tests that include slow dependencies and partial failures.",
      "Test retry behavior and verify that retries remain bounded.",
      "Simulate database latency, cache unavailability, and queue consumer slowdown in non-production environments.",
      "Practice recovery without synchronized restarts or uncontrolled replay.",
      "Run game days with clear abort conditions and rollback plans.",
      "Validate that critical customer journeys remain correct in degraded mode.",
    ],
  },

  incidentReportTemplate: {
    incidentId: "",
    severity: "",
    incidentCommander: "",
    technicalLead: "",
    startTimeUtc: "",
    detectionTimeUtc: "",
    mitigationTimeUtc: "",
    recoveryTimeUtc: "",
    affectedServices: [],
    affectedRegions: [],
    customerImpact: "",
    initialSymptom: "",
    initiatingFailure: "",
    propagationChain: [],
    contributingFactors: [],
    evidence: [],
    containmentActions: [],
    recoverySequence: [],
    dataIntegrityAssessment: "",
    customerCommunication: "",
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
      "Describe the system conditions, resilience gaps, and recovery barriers. Focus on how the system allowed the failure to propagate rather than blaming an individual.",
  },

  handsOnLabs: [
    {
      lab: 1,
      title: "Model a dependency-induced cascade",
      environment: "Local or disposable test environment only",
      tasks: [
        "Create a test API that calls a mock dependency.",
        "Introduce controlled dependency latency.",
        "Observe API latency and in-flight request growth.",
        "Add bounded concurrency and a finite timeout.",
        "Compare behavior before and after the controls.",
      ],
      success:
        "Explain how dependency latency propagates into upstream saturation and demonstrate a measurable containment improvement.",
    },
    {
      lab: 2,
      title: "Identify retry amplification",
      environment: "Local test environment only",
      tasks: [
        "Configure a mock dependency to return transient errors.",
        "Record attempts per logical request and total downstream traffic.",
        "Compare immediate retries with bounded backoff and jitter.",
        "Test an overall deadline and idempotent operation behavior.",
      ],
      success:
        "Demonstrate how retry policy changes load and explain which operations are safe to retry.",
    },
    {
      lab: 3,
      title: "Simulate connection-pool exhaustion",
      environment: "Disposable application and database",
      tasks: [
        "Set a deliberately small test connection pool.",
        "Introduce slow queries or long-running test transactions.",
        "Observe active connections, pending borrowers, and timeouts.",
        "Resolve the cause and verify the pool recovers.",
      ],
      success:
        "Distinguish pool saturation from the underlying reason connections remain occupied.",
    },
    {
      lab: 4,
      title: "Practice queue backpressure",
      environment: "Disposable queue and worker deployment",
      tasks: [
        "Make producer throughput exceed consumer throughput.",
        "Track queue depth, oldest-message age, and processing rate.",
        "Reduce incoming work and tune consumer concurrency.",
        "Verify the downstream dependency can handle the recovery ramp.",
      ],
      success:
        "Explain when scaling consumers helps and when it overloads the next dependency.",
    },
    {
      lab: 5,
      title: "Run a controlled recovery exercise",
      environment: "Non-production environment with a documented abort plan",
      tasks: [
        "Introduce a reversible failure in a test dependency.",
        "Record the blast radius and earliest abnormal signal.",
        "Apply one approved containment action.",
        "Restore dependency health and ramp traffic gradually.",
        "Verify customer journeys, queues, and data consistency.",
      ],
      success:
        "Recover without synchronized restarts, uncontrolled retries, or unsafe queue replay.",
    },
  ],

  interviewQuestions: [
    {
      question: "What is a cascading failure?",
      answer:
        "A failure in one component causes dependent components to degrade, often through shared resource exhaustion, retries, queue growth, or synchronous waits, until the impact spreads across the system.",
    },
    {
      question: "How do you identify the original bottleneck?",
      answer:
        "Build a UTC timeline, correlate service metrics and traces, find the earliest abnormal signal, trace the dependency path, and test the leading hypothesis. The first saturated resource may be a downstream symptom rather than the initiating cause.",
    },
    {
      question: "Why can increasing replicas make an outage worse?",
      answer:
        "More replicas can create more database connections, cache misses, startup traffic, and downstream requests. Scaling helps only when the constrained dependency and its quotas have sufficient capacity.",
    },
    {
      question: "How does a retry storm happen?",
      answer:
        "A slow or failing dependency triggers repeated attempts from one or more layers. Added requests consume the remaining capacity, cause more failures, and trigger still more retries.",
    },
    {
      question: "What is backpressure?",
      answer:
        "A mechanism that bounds incoming work when downstream processing cannot keep up, using controls such as bounded queues, concurrency limits, rejection, or demand reduction.",
    },
    {
      question: "What is the purpose of a circuit breaker?",
      answer:
        "It stops repeated calls to a persistently failing dependency, allowing fast failure or a safe fallback while limiting additional load. It must still be configured and monitored correctly.",
    },
    {
      question: "Why are timeouts alone insufficient?",
      answer:
        "Timeouts bound how long callers wait, but do not necessarily cancel work already running downstream. Poorly chosen timeouts can cause retries and duplicate work while the original request continues.",
    },
    {
      question: "When should you scale consumers?",
      answer:
        "When the backlog is caused by insufficient consumer capacity and the downstream services can tolerate the additional concurrency. Otherwise, scaling may move or worsen the bottleneck.",
    },
    {
      question: "What is a bulkhead?",
      answer:
        "A resource-isolation pattern that prevents one workload or dependency from consuming all shared concurrency or capacity needed by other critical workflows.",
    },
    {
      question: "How do you safely recover a queue backlog?",
      answer:
        "Stabilize the dependency, control producers and consumer concurrency, verify idempotency and redelivery semantics, then ramp processing gradually while monitoring queue age and downstream health.",
    },
    {
      question: "Why is restarting every service at once dangerous?",
      answer:
        "It can create connection storms, cold-cache load, simultaneous initialization, lost volatile evidence, and temporary loss of all available capacity.",
    },
    {
      question: "How do you know the cascade has stopped?",
      answer:
        "Critical customer journeys succeed, errors and latency return to acceptable ranges, retries and queue age decline sustainably, resource pools recover, dependencies have headroom, and no new services are becoming unhealthy.",
    },
  ],

  completionChecklist: [
    "Incident severity and customer impact are documented.",
    "Affected services and shared dependencies are mapped.",
    "A UTC timeline identifies the earliest abnormal signals.",
    "Logs, metrics, traces, and change events are correlated.",
    "The initiating bottleneck is distinguished from downstream symptoms.",
    "Retry amplification and timeout behavior are evaluated.",
    "Connection pools, workers, queues, and downstream limits are checked.",
    "Containment is approved, scoped, and reversible where possible.",
    "Recovery is gradual and does not overload shared dependencies.",
    "Critical customer journeys and data integrity are verified.",
    "Service-level indicators remain healthy during the observation window.",
    "A blameless post-incident review is prepared.",
    "Corrective actions have owners, deadlines, and measurable outcomes.",
    "Runbooks, alerts, and resilience tests are updated.",
  ],

  officialReferences: [
    {
      title: "Google SRE Book — Addressing Cascading Failures",
      url: "https://sre.google/sre-book/addressing-cascading-failures/",
    },
    {
      title: "Google SRE Book — Handling Overload",
      url: "https://sre.google/sre-book/handling-overload/",
    },
    {
      title: "Google SRE Book — Monitoring Distributed Systems",
      url: "https://sre.google/sre-book/monitoring-distributed-systems/",
    },
    {
      title: "Google SRE Workbook — Incident Response",
      url: "https://sre.google/workbook/incident-response/",
    },
    {
      title: "Kubernetes — Debugging Applications",
      url: "https://kubernetes.io/docs/tasks/debug/debug-application/",
    },
    {
      title: "Kubernetes — Horizontal Pod Autoscaling",
      url: "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/",
    },
    {
      title: "Kubernetes — Resource Management for Pods and Containers",
      url: "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
    },
    {
      title: "OpenTelemetry — Documentation",
      url: "https://opentelemetry.io/docs/",
    },
    {
      title: "Prometheus — Alerting Rules",
      url: "https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/",
    },
    {
      title: "AWS Builders' Library — Timeouts, retries, and backoff with jitter",
      url: "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/",
    },
  ],

  notes: [
    "This is a troubleshooting framework, not a universal command sequence. Adapt it to the actual application runtime, cloud provider, database, queue, and deployment platform.",
    "All commands containing placeholders must be adapted to verified targets. Start with read-only diagnostics and approved access.",
    "Do not run load tests, fault injection, chaos experiments, or destructive commands against production unless explicitly approved under a controlled procedure.",
    "A cascade can have multiple contributing causes. Do not force a single-root-cause explanation when evidence supports several interacting failures.",
    "Temporary containment settings must be documented, monitored, and removed or converted into a reviewed permanent configuration after recovery.",
  ],
} as const;

export default cascadingFailuresGuide;
