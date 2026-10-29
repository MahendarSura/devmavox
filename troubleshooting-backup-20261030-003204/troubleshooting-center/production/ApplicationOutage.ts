
export const applicationOutageGuide = {
  title: "Application Outage — Real Production Troubleshooting",
  fileName: "ApplicationOutage.ts",
  category: "production",
  difficulty: "advanced",
  estimatedTime: "90–180 minutes",
  description:
    "A production-grade runbook for diagnosing a completely unavailable or partially degraded application. Covers incident command, customer impact, logs, metrics, traces, deployments, infrastructure, Kubernetes, VMs, DNS, TLS, load balancers, databases, downstream dependencies, safe recovery, and prevention.",

  objectives: [
    "Detect and classify complete outages versus partial degradation.",
    "Establish customer impact and incident severity using measurable evidence.",
    "Stabilize the service before attempting risky changes.",
    "Follow a branching diagnostic sequence instead of running random commands.",
    "Correlate deployment events, logs, metrics, traces, and infrastructure changes.",
    "Identify the failing layer and prove the root cause.",
    "Recover safely using rollback, roll-forward, traffic shifting, or dependency mitigation.",
    "Verify recovery from the customer perspective.",
    "Produce a blameless RCA with measurable corrective actions.",
  ],

  incidentScenario: {
    title: "Production API becomes unavailable immediately after a release",
    situation:
      "At 10:05 UTC, the monitoring system reports a sharp increase in HTTP 5xx responses. Customers report login failures and checkout requests timing out. A release completed shortly before the incident. Some application instances appear healthy, but the load balancer reports unhealthy targets. The database is reachable from an operations host, yet application requests are failing.",
    initialSymptoms: [
      "HTTP 500, 502, 503, or 504 responses.",
      "Health-check failures or a sudden drop in healthy targets.",
      "Login, checkout, or critical API requests timing out.",
      "Latency increases while successful request volume falls.",
      "Application logs contain exceptions, connection failures, or startup errors.",
      "A recent deployment, configuration change, secret rotation, certificate change, or infrastructure change.",
    ],
    importantRule:
      "A recent deployment is a hypothesis, not proof. Correlate the first failure timestamp with release events, configuration changes, infrastructure events, and dependency telemetry before selecting a fix.",
  },

  impactAndSeverity: {
    principle:
      "Use the organization's incident policy and customer impact. The following SEV levels are examples, not universal definitions.",
    levels: [
      {
        severity: "SEV1",
        meaning:
          "Critical service unavailable, major customer or revenue impact, critical security exposure, or no viable workaround.",
        response:
          "Declare the incident, engage the incident commander and service owners, provide frequent updates, and prioritize safe restoration.",
      },
      {
        severity: "SEV2",
        meaning:
          "Major functionality degraded, substantial error rates, or a critical workflow failing for many users.",
        response:
          "Engage application, platform, and dependency owners; mitigate the highest-impact failure first.",
      },
      {
        severity: "SEV3",
        meaning:
          "Limited scope, partial degradation, or a reliable workaround exists.",
        response:
          "Assign an owner, assess trends, and follow the service's response-time policy.",
      },
      {
        severity: "SEV4",
        meaning:
          "Low-impact defect or isolated failure without meaningful service degradation.",
        response:
          "Track and resolve through the normal operational process.",
      },
    ],
    measure: [
      "Which customer journeys are broken: login, search, checkout, payments, or all requests?",
      "Is the outage global, regional, tenant-specific, endpoint-specific, or limited to one client version?",
      "What percentage of requests fail, and how many users are affected?",
      "When did the first failure occur, and when was the last known healthy state?",
      "Are writes partially completed, duplicated, or inconsistent?",
      "Are data loss, unauthorized access, or security concerns suspected?",
      "Is a documented workaround available?",
    ],
  },

  rolesAndIncidentCommand: {
    principle:
      "For a significant incident, separate coordination from technical execution where staffing allows. Avoid multiple people making conflicting production changes.",
    roles: [
      {
        role: "Incident Commander",
        responsibility:
          "Sets priorities, assigns owners, approves the response plan, tracks decisions, and coordinates escalation.",
      },
      {
        role: "Technical Lead",
        responsibility:
          "Owns the diagnostic hypothesis, coordinates technical investigations, and recommends mitigations.",
      },
      {
        role: "Operations / SRE",
        responsibility:
          "Checks monitoring, traffic routing, infrastructure health, capacity, and safe recovery options.",
      },
      {
        role: "Application Owner",
        responsibility:
          "Investigates code, runtime, configuration, feature flags, and application-level failures.",
      },
      {
        role: "Communications Owner",
        responsibility:
          "Provides consistent customer, stakeholder, and internal updates using approved channels.",
      },
      {
        role: "Scribe",
        responsibility:
          "Records timestamps, evidence, decisions, commands that changed state, and recovery milestones.",
      },
    ],
    operatingRules: [
      "Declare the incident in the approved incident-management system.",
      "Name one technical lead and assign explicit owners to parallel investigations.",
      "Keep a UTC timeline of alerts, deployments, changes, and recovery actions.",
      "Communicate what is known, unknown, and being tested.",
      "Do not delay a necessary mitigation while waiting for a perfect root-cause explanation.",
      "Do not make unrelated infrastructure or security changes during recovery.",
    ],
  },

  safetyChecks: [
    {
      check: "Confirm the target",
      detail:
        "Verify account, cluster, namespace, host, region, application, repository, and environment. Never assume the current shell or cloud profile targets production.",
    },
    {
      check: "Confirm authorization",
      detail:
        "Use the approved incident change process, least-privilege credentials, and required production approvals.",
    },
    {
      check: "Preserve evidence",
      detail:
        "Capture timestamps, release IDs, logs, metrics, traces, configuration versions, and deployment events before restarting or replacing instances.",
    },
    {
      check: "Avoid destructive actions",
      detail:
        "Do not delete databases, persistent volumes, queues, state files, or production resources to clear an error.",
    },
    {
      check: "Avoid blind restarts",
      detail:
        "Restarting may erase volatile evidence, trigger a thundering herd, interrupt in-flight transactions, or make recovery harder.",
    },
    {
      check: "Protect sensitive data",
      detail:
        "Redact tokens, passwords, session cookies, authorization headers, private keys, and personal data before sharing evidence.",
    },
    {
      check: "Assess data safety",
      detail:
        "Before rollback, consider schema compatibility, irreversible migrations, message replay, duplicate writes, and in-flight transactions.",
    },
  ],

  evidenceCollection: {
    capture: [
      "Incident ID, declaration time, reporter, service owner, and severity.",
      "Affected regions, tenants, endpoints, customer journeys, and percentage of failed requests.",
      "Last known good timestamp and first known bad timestamp.",
      "Deployment ID, commit SHA, artifact/image digest, configuration version, and feature-flag changes.",
      "Request rate, error rate, p50/p95/p99 latency, saturation, and healthy-target count.",
      "Application logs with timestamps, request/correlation IDs, exception types, and stack traces.",
      "Distributed traces for representative successful and failed requests.",
      "Load-balancer, ingress, DNS, TLS, firewall, and network events.",
      "Database connection counts, pool wait times, query latency, locks, and availability.",
      "CPU, memory, disk, file descriptors, process restarts, and container termination reasons.",
      "Recent secret, certificate, IAM, network policy, autoscaling, and infrastructure changes.",
      "Actions taken, command outputs, approvals, and their observed results.",
    ],
    logRules: [
      "Use a bounded time window around the first failure and compare it with the previous healthy period.",
      "Prefer structured logs and filter by request ID, release ID, instance, region, or trace ID.",
      "Sample representative failures rather than dumping unlimited production logs.",
      "Record timezone and clock skew when correlating events from different systems.",
      "Do not conclude that a missing log means the application never received the request; logging itself may be unavailable.",
    ],
  },

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm the outage from the customer perspective",
      objective:
        "Distinguish a real application outage from a broken dashboard, synthetic-monitoring issue, or isolated client failure.",
      actions: [
        "Check the service's primary synthetic check and a separate independent signal.",
        "Inspect request success rate, 5xx rate, latency, and traffic volume.",
        "Test a safe, read-only health endpoint from an approved location.",
        "Compare affected and unaffected regions, tenants, and endpoints.",
      ],
      commands: [
        {
          command: "curl -sS -D - -o /dev/null --max-time 10 https://api.example.com/health",
          meaning:
            "Shows response headers and HTTP status while discarding the body; the request has a bounded timeout.",
          caution:
            "Replace the example hostname. Run only an approved, safe endpoint. A 200 from a shallow health endpoint does not prove business workflows work.",
        },
        {
          command: "curl -sS -o /dev/null -w 'http=%{http_code} connect=%{time_connect}s total=%{time_total}s\\n' --max-time 10 https://api.example.com/health",
          meaning:
            "Reports HTTP status, connection time, and total duration for a quick availability check.",
          caution:
            "This is one sample, not a load test or proof of global availability.",
        },
      ],
      decisions: [
        {
          if: "Multiple independent checks fail and customer errors rise",
          then:
            "Declare or escalate the incident and continue to isolate the failing layer.",
        },
        {
          if: "Only one probe fails but customer traffic is healthy",
          then:
            "Investigate probe DNS, network path, credentials, and health-check configuration before changing the application.",
        },
        {
          if: "Only one region, tenant, or endpoint fails",
          then:
            "Narrow the investigation to that scope and compare its configuration, release, routing, and dependencies with a healthy scope.",
        },
      ],
    },

    {
      step: 2,
      title: "Establish a timeline and inspect recent changes",
      objective:
        "Find changes that temporally correlate with the first observed failure.",
      actions: [
        "Identify the last known good release and first known bad request.",
        "Review deployment history, configuration rollout, feature flags, secret rotation, certificate renewal, and infrastructure changes.",
        "Compare the failing release with the previous healthy revision.",
        "Check whether failures began before or after the change completed.",
      ],
      commands: [
        {
          command: "git log -n 10 --oneline --decorate",
          meaning:
            "Shows recent commits in the current checkout; useful for local repository history only.",
          caution:
            "This does not prove what is running in production. Confirm the deployed commit and artifact separately.",
        },
        {
          command: "kubectl rollout history deployment/<deployment> -n <namespace>",
          meaning:
            "Shows available rollout history for a Kubernetes Deployment.",
          caution:
            "Requires the correct cluster context and namespace. History availability depends on retained ReplicaSets and cluster configuration.",
        },
        {
          command: "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
          meaning:
            "Lists namespace events in timestamp order to help correlate scheduling, image, probe, and rollout failures.",
          caution:
            "Events are best-effort and expire; absence of an event is not proof that nothing happened.",
        },
      ],
      decisions: [
        {
          if: "Failures begin immediately after a release and the previous release was healthy",
          then:
            "Prioritize release diff, application exceptions, configuration changes, and rollback feasibility.",
        },
        {
          if: "Failures precede the release",
          then:
            "Do not assume the release is the cause; inspect infrastructure, dependencies, traffic, certificates, and external events.",
        },
        {
          if: "No change is apparent",
          then:
            "Investigate demand spikes, exhausted resources, dependency incidents, expiring credentials, DNS changes, and latent defects.",
        },
      ],
    },

    {
      step: 3,
      title: "Classify the HTTP error and identify where it originates",
      objective:
        "Determine whether the failure originates at the client, edge, load balancer, ingress, application, or downstream dependency.",
      signatures: [
        {
          symptom: "DNS resolution failure",
          likelyAreas:
            "DNS records, resolver, private zone, service discovery, network configuration.",
          next:
            "Compare authoritative records and resolver results from affected and healthy locations.",
        },
        {
          symptom: "TLS handshake or certificate error",
          likelyAreas:
            "Certificate expiry, trust chain, hostname mismatch, protocol/cipher configuration, SNI.",
          next:
            "Inspect the presented certificate and handshake from the failing network path.",
        },
        {
          symptom: "HTTP 502",
          likelyAreas:
            "Proxy cannot obtain a valid upstream response, connection reset, invalid upstream response, or upstream crash.",
          next:
            "Correlate proxy error logs with upstream connection errors and application logs.",
        },
        {
          symptom: "HTTP 503",
          likelyAreas:
            "No healthy upstreams, overload, maintenance response, queue saturation, or application rejection.",
          next:
            "Check healthy target count, readiness, capacity, and load-shedding behavior.",
        },
        {
          symptom: "HTTP 504",
          likelyAreas:
            "Upstream response exceeded a proxy or gateway timeout, often because of slow application or dependency calls.",
          next:
            "Use traces and dependency metrics to find where time is spent; do not simply increase the timeout.",
        },
        {
          symptom: "HTTP 500",
          likelyAreas:
            "Application exception, configuration error, unhandled dependency error, or failed business operation.",
          next:
            "Correlate the request ID with application logs, traces, and release changes.",
        },
        {
          symptom: "HTTP 401 or 403",
          likelyAreas:
            "Authentication, authorization, token validation, policy, or identity configuration.",
          next:
            "Check identity and policy changes; do not disable authorization as a workaround.",
        },
        {
          symptom: "HTTP 429",
          likelyAreas:
            "Rate limiting, quota, overload protection, or provider throttling.",
          next:
            "Identify the limiting layer and request pattern; use bounded retries and backoff where appropriate.",
        },
      ],
      commands: [
        {
          command: "curl -v --max-time 10 https://api.example.com/health",
          meaning:
            "Shows connection, DNS/TLS negotiation, request, and response details.",
          caution:
            "Verbose output can expose headers or cookies. Do not use production credentials or share unredacted output.",
        },
        {
          command: "curl -sS -o /dev/null -w 'status=%{http_code} dns=%{time_namelookup}s tls=%{time_appconnect}s first_byte=%{time_starttransfer}s total=%{time_total}s\\n' --max-time 10 https://api.example.com/health",
          meaning:
            "Separates name lookup, TLS connection, first-byte latency, and total duration.",
          caution:
            "Interpret timings in context; connection reuse, proxies, and client environment affect the result.",
        },
      ],
    },

    {
      step: 4,
      title: "Check DNS, TLS, and edge routing",
      objective:
        "Verify that clients can resolve the intended destination and establish a trusted connection.",
      commands: [
        {
          command: "dig api.example.com",
          meaning: "Checks DNS answers using the configured resolver.",
          caution:
            "Compare resolver paths and authoritative records when results differ; one response does not prove all clients see the same record.",
        },
        {
          command: "dig +trace api.example.com",
          meaning:
            "Traces DNS delegation from the root toward the requested name.",
          caution:
            "May be blocked or behave differently in restricted networks; it does not replicate every client's recursive resolver.",
        },
        {
          command: "openssl s_client -connect api.example.com:443 -servername api.example.com -verify_return_error",
          meaning:
            "Inspects the TLS handshake, SNI-selected certificate, and certificate verification behavior.",
          caution:
            "Network policies may block direct access. Review output for internal names and certificate details before sharing.",
        },
      ],
      inspect: [
        "DNS TTL, record changes, split-horizon DNS, and private/public zones.",
        "Certificate expiration, SAN hostname, chain completeness, and trust store.",
        "Load-balancer listeners, target groups, routing rules, and security groups/firewalls.",
        "WAF rules, rate limits, edge provider health, and origin connectivity.",
        "Whether the issue affects only IPv4, IPv6, a region, or a specific resolver.",
      ],
      decisions: [
        {
          if: "DNS answer differs from the intended record",
          then:
            "Check recent DNS changes, zone ownership, TTL, resolver cache, and private-zone associations. Change records only after confirming the intended target.",
        },
        {
          if: "TLS verification fails",
          then:
            "Fix the certificate, hostname, chain, or trust configuration. Do not disable certificate verification in production.",
        },
        {
          if: "Edge is healthy but upstream connections fail",
          then:
            "Move to load-balancer target health, network reachability, listener configuration, and application bind-port checks.",
        },
      ],
    },

    {
      step: 5,
      title: "Inspect load balancer, ingress, and upstream health",
      objective:
        "Determine whether traffic reaches the application and whether the routing layer has healthy targets.",
      checks: [
        "Healthy versus unhealthy target count and its change over time.",
        "Health-check path, expected status, port, timeout, and success threshold.",
        "Target registration, readiness, routing rules, and backend protocol.",
        "Connection resets, upstream connect errors, and response-time distributions.",
        "Firewall/security-group rules and network policy between the edge and the application.",
        "Whether a deployment temporarily removed all healthy targets.",
      ],
      decisions: [
        {
          if: "Healthy target count is zero",
          then:
            "Inspect target registration, readiness/liveness failures, process startup, port binding, and network reachability. Do not assume the load balancer itself is broken.",
        },
        {
          if: "Targets are healthy but 5xx responses continue",
          then:
            "Inspect application exceptions, route-specific behavior, dependencies, and whether the health check tests only a shallow endpoint.",
        },
        {
          if: "Only one target fails",
          then:
            "Compare that instance's image digest, configuration, node, zone, resource pressure, and recent events against healthy targets.",
        },
      ],
    },

    {
      step: 6,
      title: "Check application process and runtime",
      objective:
        "Verify that the process is alive, listening on the expected interface and port, and able to serve requests.",
      linuxCommands: [
        {
          command: "ps -eo pid,ppid,%cpu,%mem,etime,args --sort=-%cpu | head -n 20",
          meaning:
            "Lists processes with CPU, memory, age, and command details, sorted by CPU usage.",
          caution:
            "Process arguments can contain sensitive data. Container process visibility may differ from host visibility.",
        },
        {
          command: "ss -lntp",
          meaning:
            "Shows listening TCP sockets and associated process details when permissions allow.",
          caution:
            "Run in the correct host or network namespace; missing process details may be a permissions issue.",
        },
        {
          command: "journalctl -u <service> --since '30 minutes ago' --no-pager",
          meaning:
            "Reads recent systemd journal entries for a service.",
          caution:
            "Replace the unit name and time window. Service logs may instead be collected by a container or centralized logging platform.",
        },
      ],
      inspect: [
        "Process restart count, exit code, crash loops, and startup duration.",
        "Application bind address and port versus the configured target port.",
        "Configuration parsing errors and missing environment variables.",
        "Secrets, certificates, credentials, and external service endpoints.",
        "Runtime compatibility, dependency versions, and failed initialization.",
        "Thread count, event-loop delay, garbage collection, heap pressure, and file descriptor usage where applicable.",
      ],
      decisions: [
        {
          if: "Process is absent or repeatedly restarting",
          then:
            "Inspect exit codes, startup logs, OOM events, image/artifact, configuration, and resource limits before restarting it again.",
        },
        {
          if: "Process is running but not listening",
          then:
            "Investigate startup failure, wrong bind address/port, deadlock, or delayed initialization.",
        },
        {
          if: "Process is listening but requests fail",
          then:
            "Test locally using an approved endpoint and inspect request handlers, thread/event-loop saturation, and downstream dependencies.",
        },
      ],
    },

    {
      step: 7,
      title: "For Kubernetes, inspect the workload and rollout",
      objective:
        "Identify whether pods are unscheduled, not ready, crash-looping, image-pull failing, or unable to reach dependencies.",
      commands: [
        {
          command: "kubectl config current-context",
          meaning: "Shows the active Kubernetes context.",
          caution: "Confirm the expected production context before any write operation.",
        },
        {
          command: "kubectl get deploy,rs,pods,svc,endpointslices -n <namespace> -o wide",
          meaning:
            "Shows deployments, ReplicaSets, pods, services, and EndpointSlices in the selected namespace.",
          caution:
            "Large clusters may return substantial output; use the correct namespace and scope.",
        },
        {
          command: "kubectl describe deployment <deployment> -n <namespace>",
          meaning:
            "Shows Deployment conditions, rollout state, and related events.",
          caution:
            "Review output for internal metadata before sharing.",
        },
        {
          command: "kubectl get pods -n <namespace> -o wide",
          meaning:
            "Shows pod status, restart counts, node placement, and pod IPs.",
          caution:
            "A Running pod is not necessarily Ready or able to serve customer requests.",
        },
        {
          command: "kubectl describe pod <pod> -n <namespace>",
          meaning:
            "Shows container states, probe failures, scheduling events, and termination details.",
          caution:
            "Use the exact affected pod and capture evidence before deleting it.",
        },
        {
          command: "kubectl logs <pod> -n <namespace> --all-containers=true --since=30m --timestamps",
          meaning:
            "Retrieves recent logs from all containers in the pod.",
          caution:
            "For a restarted container, inspect previous logs with --previous where supported. Logs may contain sensitive data.",
        },
        {
          command: "kubectl rollout status deployment/<deployment> -n <namespace> --timeout=120s",
          meaning:
            "Waits for the Deployment rollout to complete, bounded by the specified timeout.",
          caution:
            "A timeout does not fix the rollout. Inspect Deployment conditions, ReplicaSets, pod events, and readiness before acting.",
        },
      ],
      decisions: [
        {
          if: "Pods are Pending",
          then:
            "Check scheduling events, node capacity, resource requests, taints/tolerations, affinity, PVC binding, and quota.",
        },
        {
          if: "Pods are ImagePullBackOff or ErrImagePull",
          then:
            "Check image reference/digest, registry availability, image pull credentials, and node network access.",
        },
        {
          if: "Pods are CrashLoopBackOff",
          then:
            "Inspect current and previous container logs, exit code, startup configuration, dependencies, and OOM termination details.",
        },
        {
          if: "Pods are Running but not Ready",
          then:
            "Inspect readiness probe path, port, timeout, startup duration, application dependencies, and readiness-gate configuration.",
        },
        {
          if: "Pods are Ready but Service has no usable endpoints",
          then:
            "Check Service selectors, pod labels, EndpointSlices, readiness, and namespace/port configuration.",
        },
        {
          if: "Pods and endpoints are healthy but requests fail",
          then:
            "Inspect ingress/gateway routing, NetworkPolicies, service mesh, application routes, and downstream dependencies.",
        },
      ],
    },

    {
      step: 8,
      title: "For virtual machines or bare-metal hosts",
      objective:
        "Check host reachability, process health, resources, and the path from the load balancer to the application.",
      commands: [
        {
          command: "uptime",
          meaning: "Shows uptime and load averages.",
          caution:
            "Load average is not CPU utilization; interpret it alongside CPU, runnable tasks, and I/O wait.",
        },
        {
          command: "free -h",
          meaning: "Shows memory and swap usage.",
          caution:
            "Linux page cache is normally reclaimable; do not treat all used memory as a memory leak.",
        },
        {
          command: "df -h",
          meaning: "Shows filesystem capacity.",
          caution:
            "Also check inode exhaustion with df -i when file creation fails.",
        },
        {
          command: "df -i",
          meaning: "Shows inode utilization.",
          caution:
            "A filesystem can have free space but no available inodes.",
        },
        {
          command: "vmstat 1 5",
          meaning: "Samples CPU, runnable processes, memory, and I/O-related counters.",
          caution:
            "Interpret several samples and the correct platform's field semantics, not one line alone.",
        },
        {
          command: "iostat -xz 1 5",
          meaning:
            "When sysstat is installed, samples device I/O latency and utilization.",
          caution:
            "Device metrics and availability depend on the operating system and storage stack.",
        },
      ],
      decisions: [
        {
          if: "CPU is saturated and runnable work grows",
          then:
            "Identify hot processes, recent traffic changes, inefficient code, and CPU throttling. Avoid scaling blindly before checking capacity and bottlenecks.",
        },
        {
          if: "Memory pressure or OOM events appear",
          then:
            "Correlate memory usage with process/container limits, GC, recent release, and kernel OOM logs. Capture diagnostics when safe.",
        },
        {
          if: "Disk is full or inode usage is exhausted",
          then:
            "Identify the responsible filesystem and safe-to-remove artifacts. Do not delete active database files, logs needed for evidence, or arbitrary files.",
        },
        {
          if: "Host looks healthy but the service is unavailable",
          then:
            "Continue to process, port, local endpoint, firewall, load-balancer, and downstream checks.",
        },
      ],
    },

    {
      step: 9,
      title: "Correlate logs, metrics, and distributed traces",
      objective:
        "Locate the slow or failing operation rather than relying on a single error message.",
      actions: [
        "Filter logs by request/correlation ID, release ID, and failure time.",
        "Compare latency distributions and error rates with the previous healthy window.",
        "Inspect traces for failed spans, retry loops, queue waits, and downstream call duration.",
        "Separate errors caused by the application from errors returned by a dependency.",
        "Compare healthy and unhealthy instances using the same request path.",
      ],
      diagnosticQuestions: [
        "Did errors rise before latency, or did latency rise before errors?",
        "Are all endpoints affected, or only routes using one dependency?",
        "Does the first failing trace show time spent in the gateway, application, database, or remote service?",
        "Are retries increasing request volume and making the incident worse?",
        "Did logging, tracing, or metrics ingestion itself become unavailable?",
      ],
      decisions: [
        {
          if: "Most latency is inside one downstream span",
          then:
            "Investigate that dependency's health, timeout, pool, quota, and network path; use bounded retries and fallback only if designed and safe.",
        },
        {
          if: "Application time is high but downstream spans are fast",
          then:
            "Inspect CPU, locks, thread pools, event-loop delay, serialization, garbage collection, and local contention.",
        },
        {
          if: "Failures correlate with a particular release or instance",
          then:
            "Compare the deployed artifact, configuration, node, and dependency versions against a known-good instance.",
        },
        {
          if: "Telemetry is incomplete",
          then:
            "Use independent signals such as edge metrics, synthetic checks, process status, and platform events. Do not infer health from missing telemetry.",
        },
      ],
    },

    {
      step: 10,
      title: "Investigate database and connection-pool failures",
      objective:
        "Determine whether the application cannot connect, is waiting for connections, or is blocked by database execution.",
      inspect: [
        "Database availability, DNS, TLS, network reachability, and authentication.",
        "Connection-pool active/idle counts, pending borrowers, acquisition latency, and timeouts.",
        "Database connection limits and whether other applications consume capacity.",
        "Slow queries, lock waits, deadlocks, replication lag, and storage pressure.",
        "Credential rotation, expired certificates, changed endpoints, and firewall rules.",
        "Transaction duration, unclosed connections, and retry amplification.",
      ],
      decisions: [
        {
          if: "Connection acquisition waits are high",
          then:
            "Determine whether connections are leaked, occupied by slow queries, or capped by database capacity before changing pool size.",
        },
        {
          if: "Connection attempts fail immediately",
          then:
            "Check DNS, endpoint, TLS, credentials, network policy, and database availability.",
        },
        {
          if: "Connections succeed but queries stall",
          then:
            "Inspect query latency, locks, execution plans, database CPU/I/O, and transaction behavior.",
        },
        {
          if: "Database connection limits are reached",
          then:
            "Calculate aggregate pool limits across all replicas and other clients. Do not increase every pool simultaneously.",
        },
      ],
    },

    {
      step: 11,
      title: "Check downstream APIs, queues, caches, and identity providers",
      objective:
        "Identify a dependency that is failing or responding slowly and causing the application to cascade into failure.",
      inspect: [
        "Dependency error rates, latency, quota, availability, and regional status.",
        "HTTP connection/read timeouts and retry policies.",
        "Queue depth, consumer lag, dead-letter queue growth, and poison messages.",
        "Cache availability, connection saturation, eviction, and cold-cache effects.",
        "Token issuer availability, JWKS refresh, clock skew, and identity-provider changes.",
        "Circuit-breaker state, bulkheads, concurrency limits, and fallback behavior.",
      ],
      decisions: [
        {
          if: "Only workflows using one dependency fail",
          then:
            "Correlate traces with dependency telemetry and test from the application's actual network and identity context.",
        },
        {
          if: "Retries and queue depth increase together",
          then:
            "Check retry amplification, consumer capacity, idempotency, and downstream recovery before replaying work.",
        },
        {
          if: "A dependency is unavailable and a safe fallback exists",
          then:
            "Enable only the documented fallback or degraded mode, with owner approval and explicit monitoring.",
        },
        {
          if: "No safe fallback exists",
          then:
            "Protect the system with bounded timeouts, concurrency controls, and clear user-facing failure behavior rather than pretending the operation succeeded.",
        },
      ],
    },

    {
      step: 12,
      title: "Inspect capacity, autoscaling, and overload",
      objective:
        "Find whether traffic exceeds available capacity or whether scaling is blocked or too slow.",
      inspect: [
        "Request rate, concurrency, queue depth, and arrival rate versus service rate.",
        "CPU/memory utilization, CPU throttling, file descriptors, worker threads, and connection pools.",
        "Autoscaler desired versus actual replicas and scaling events.",
        "Quota, node capacity, scheduling constraints, image pull time, and startup time.",
        "Hot partitions, uneven traffic, large payloads, and expensive endpoints.",
        "Retry storms, cache stampedes, and synchronized scheduled jobs.",
      ],
      decisions: [
        {
          if: "Demand is above sustainable service capacity",
          then:
            "Apply approved load shedding, rate limits, queueing, or capacity scaling while checking downstream limits.",
        },
        {
          if: "Autoscaler wants more replicas but cannot schedule them",
          then:
            "Check node capacity, quotas, resource requests, affinity, taints, and cluster autoscaling.",
        },
        {
          if: "More replicas worsen database or dependency failures",
          then:
            "Reduce concurrency or scale back to a safe level; coordinate application replica count with downstream capacity.",
        },
        {
          if: "CPU is low but latency is high",
          then:
            "Investigate I/O waits, lock contention, thread/connection pools, network delays, and downstream timeouts.",
        },
      ],
    },

    {
      step: 13,
      title: "Inspect secrets, identity, configuration, and feature flags",
      objective:
        "Identify configuration drift or access changes that prevent the application from starting or completing requests.",
      inspect: [
        "Environment-variable names and required settings.",
        "Secret version, rotation timestamp, mounted-secret refresh behavior, and restart requirements.",
        "IAM roles, workload identity, service-account permissions, and token expiry.",
        "Feature flags, remote configuration, endpoint URLs, and environment-specific overrides.",
        "Certificate/key matching, file permissions, trust stores, and clock synchronization.",
        "Configuration differences between healthy and unhealthy replicas.",
      ],
      decisions: [
        {
          if: "Only new replicas fail after a secret rotation",
          then:
            "Check secret version, mount/update semantics, restart behavior, and whether old and new credentials overlap safely.",
        },
        {
          if: "Access denied begins after an IAM or policy change",
          then:
            "Inspect the effective principal and denied action/resource. Restore only the required least-privilege permission.",
        },
        {
          if: "A feature flag correlates with the failing workflow",
          then:
            "Use the approved flag rollback procedure, verify blast radius, and preserve evidence of the prior value.",
        },
      ],
    },

    {
      step: 14,
      title: "Form and test a root-cause hypothesis",
      objective:
        "Use evidence to isolate a cause before applying a change.",
      method: [
        "Write the hypothesis in one sentence.",
        "List the evidence that supports it and the evidence that would disprove it.",
        "Choose the smallest safe, read-only test that distinguishes it from alternatives.",
        "Compare affected and healthy instances or regions.",
        "Change one variable at a time when operationally safe.",
        "Record the result and update the hypothesis.",
        "Escalate to the owner of the failing layer when the evidence points outside your scope.",
      ],
      example:
        "Hypothesis: the new release is failing because it expects a configuration key that is absent in production. Evidence: only new replicas fail at startup, logs identify that key, and the previous artifact starts successfully with the current configuration. Next: compare the deployed configuration contract and test the release in a safe environment before choosing rollback or roll-forward.",
      rule:
        "Correlation narrows the search; reproducible evidence and a successful controlled test provide stronger causal confidence.",
    },
  ],

  rootCauseMatrix: [
    {
      cause: "Bad release or incompatible application configuration",
      evidence:
        "Failures begin after a release; startup errors or stack traces match the change; healthy old version behaves differently.",
      fix:
        "Use a validated rollback or a corrected forward release after checking schema and data compatibility.",
    },
    {
      cause: "DNS or TLS failure",
      evidence:
        "Resolution differs from expected values or handshake verification fails from affected clients.",
      fix:
        "Correct records, certificate chain, hostname, trust configuration, or routing through the approved change process.",
    },
    {
      cause: "No healthy load-balancer targets",
      evidence:
        "Target health drops to zero; application readiness, port, or target registration fails.",
      fix:
        "Restore the process, readiness, port, network path, or target configuration based on the verified cause.",
    },
    {
      cause: "Database saturation or pool exhaustion",
      evidence:
        "Connection wait time, pool pending count, DB locks, or connection-limit errors rise with application failures.",
      fix:
        "Address the bottleneck or leak and adjust capacity using aggregate pool and database limits.",
    },
    {
      cause: "Resource exhaustion",
      evidence:
        "OOM kills, CPU throttling, disk/inode exhaustion, file descriptor errors, or growing queue depth.",
      fix:
        "Relieve pressure safely, identify the source, and restore sustainable capacity.",
    },
    {
      cause: "Downstream outage",
      evidence:
        "Failed traces concentrate in a dependency span and dependency metrics show elevated errors or latency.",
      fix:
        "Apply a designed fallback, bounded retries, load shedding, or dependency recovery.",
    },
    {
      cause: "Permission or secret change",
      evidence:
        "Authentication/authorization errors begin after identity or credential changes.",
      fix:
        "Restore the correct secret or minimal required access; never disable security checks broadly.",
    },
    {
      cause: "Autoscaling or capacity limit",
      evidence:
        "Demand exceeds service capacity, replicas cannot schedule, or quotas block scale-out.",
      fix:
        "Address quota/capacity constraints and control demand without overwhelming dependencies.",
    },
    {
      cause: "Health-check mismatch",
      evidence:
        "Application serves requests locally but targets fail due to incorrect path, port, protocol, or expected status.",
      fix:
        "Correct the health-check contract and ensure it reflects the intended readiness semantics.",
    },
    {
      cause: "Network policy or firewall change",
      evidence:
        "Connection failures occur between specific components despite healthy processes and correct service configuration.",
      fix:
        "Restore the required, narrowly scoped network path and validate connectivity from the affected workload.",
    },
  ],

  recoveryDecisionFramework: {
    principle:
      "Restore customer service safely; do not wait for a perfect RCA when a low-risk mitigation is clear. Every action needs an owner, expected result, and rollback plan.",
    options: [
      {
        option: "Rollback",
        useWhen:
          "A recent release is strongly implicated, a known-good version exists, and rollback is compatible with current data and infrastructure.",
        before:
          "Check database migrations, API compatibility, queue/message formats, feature flags, and rollback automation.",
        after:
          "Confirm the previous artifact/digest is active, healthy targets recover, and customer error rates fall.",
      },
      {
        option: "Roll forward",
        useWhen:
          "The defect is understood, a tested correction is available, and rollback would be unsafe or ineffective.",
        before:
          "Validate the fix in an appropriate environment and confirm compatibility and approval.",
        after:
          "Verify deployment status, critical journeys, metrics, and logs.",
      },
      {
        option: "Traffic shifting",
        useWhen:
          "A known-good region, pool, or version can safely handle redirected traffic.",
        before:
          "Check capacity, data locality, session behavior, replication lag, and routing implications.",
        after:
          "Monitor the destination and the original pool for overload and recovery.",
      },
      {
        option: "Scale or reduce load",
        useWhen:
          "Capacity is the verified bottleneck and downstream dependencies can tolerate the change.",
        before:
          "Check quotas, database pool totals, cost limits, and scheduling capacity.",
        after:
          "Confirm queue depth, latency, error rate, and dependency health improve.",
      },
      {
        option: "Disable a feature or use degraded mode",
        useWhen:
          "A specific feature causes the outage and an approved, safe fallback exists.",
        before:
          "Check data consistency, customer impact, authorization, and whether in-flight writes are affected.",
        after:
          "Verify critical paths remain correct and the disabled feature is clearly tracked.",
      },
    ],
    guardrails: [
      "Do not run a blind database restore or destructive migration during initial triage.",
      "Do not replay queues or retry non-idempotent transactions without understanding duplicate effects.",
      "Do not restart every instance simultaneously unless the runbook explicitly calls for it.",
      "Do not bypass TLS verification, authentication, authorization, or admission controls to make a probe pass.",
      "Do not increase timeouts without understanding queueing and resource occupancy.",
      "Do not scale application replicas without checking downstream connection and quota limits.",
      "Do not roll back across an incompatible schema change without an approved data plan.",
      "Do not mark the incident resolved just because a deployment command succeeded.",
    ],
  },

  safeRecoveryWorkflow: [
    "1. State the mitigation hypothesis and expected measurable result.",
    "2. Confirm the target environment, owner, approval, and scope.",
    "3. Capture the current release, configuration version, and baseline metrics.",
    "4. Select the least risky reversible action that addresses the evidenced cause.",
    "5. Execute using the approved deployment or operations mechanism.",
    "6. Verify application health, target health, and critical customer journeys.",
    "7. Compare error rate, latency, traffic, and dependency metrics against the baseline.",
    "8. Stop or reverse the mitigation if it worsens the incident or creates data risk.",
    "9. Continue monitoring for a policy-defined observation window.",
    "10. Record the exact change, owner, timestamps, and evidence of recovery.",
  ],

  recoveryVerification: {
    checks: [
      "Synthetic checks succeed from more than one appropriate vantage point.",
      "Critical customer journeys complete successfully, including important write operations where safe.",
      "HTTP 5xx and timeout rates return to the service's acceptable range.",
      "p95/p99 latency and saturation recover without causing a secondary incident.",
      "Load-balancer targets, Kubernetes readiness, or service process health are stable.",
      "Database pools, queue depth, consumer lag, and downstream dependencies recover.",
      "No repeated crashes, restart loops, or new error signatures appear.",
      "Data integrity and transaction outcomes are checked when writes may have failed partway.",
      "Customer support and incident communications reflect the verified state.",
    ],
    resolvedDefinition:
      "Resolve only after the agreed service-level indicators and critical customer journeys are healthy for the required observation window, no active rollback/recovery action remains incomplete, and the incident owner accepts the evidence.",
  },

  preventionAndOperationalReadiness: [
    {
      area: "Observability",
      actions: [
        "Define service-level indicators for availability, latency, traffic, and errors.",
        "Alert on customer impact and error-budget burn, not only CPU or host availability.",
        "Use synthetic tests for critical workflows and independent monitoring paths.",
        "Correlate deployment IDs, trace IDs, release metadata, and configuration versions.",
        "Monitor dependency latency, pool waits, queue depth, restarts, and healthy-target counts.",
      ],
    },
    {
      area: "Deployment safety",
      actions: [
        "Use staged rollouts, canaries, progressive delivery, and automated health gates where appropriate.",
        "Keep immutable artifact references and record the deployed image digest or package version.",
        "Validate configuration and secret references before rollout.",
        "Use backward-compatible database migration patterns and explicit rollback plans.",
        "Automate rollback only when its trigger and data-safety assumptions are well defined.",
      ],
    },
    {
      area: "Resilience",
      actions: [
        "Set connection and request timeouts based on latency budgets.",
        "Use bounded retries with exponential backoff and jitter where safe.",
        "Use circuit breakers, bulkheads, and concurrency limits for appropriate dependencies.",
        "Design idempotency for retryable writes and payment-like operations.",
        "Use load shedding and degraded modes that preserve critical functions.",
        "Test failure behavior instead of assuming redundant components eliminate outages.",
      ],
    },
    {
      area: "Capacity and dependencies",
      actions: [
        "Load-test realistic traffic and failure scenarios.",
        "Calculate aggregate database connections across maximum replicas.",
        "Review autoscaling delay, quotas, warm-up time, and startup readiness.",
        "Monitor certificate and secret expiration with enough renewal lead time.",
        "Document dependency owners, escalation paths, status pages, and recovery expectations.",
      ],
    },
    {
      area: "Incident readiness",
      actions: [
        "Maintain an incident command structure and service ownership map.",
        "Keep runbooks executable, versioned, reviewed, and tested.",
        "Run game days for dependency outage, bad release, DNS/TLS failure, and resource exhaustion.",
        "Ensure logs and diagnostics are accessible without exposing secrets.",
        "Track corrective actions with an owner, deadline, and measurable completion criterion.",
      ],
    },
  ],

  incidentTimelineTemplate: [
    {
      time: "10:05 UTC",
      event: "First customer-impacting alert",
      evidence: "Alert ID, dashboard link, initial error rate",
    },
    {
      time: "10:08 UTC",
      event: "Incident declared",
      evidence: "Severity, incident commander, technical lead",
    },
    {
      time: "10:12 UTC",
      event: "Initial scope established",
      evidence: "Affected endpoints, regions, customer journeys",
    },
    {
      time: "10:20 UTC",
      event: "Primary hypothesis recorded",
      evidence: "Supporting and contradicting evidence",
    },
    {
      time: "10:30 UTC",
      event: "Mitigation approved and started",
      evidence: "Change ID, owner, rollback plan",
    },
    {
      time: "10:40 UTC",
      event: "Service recovery verified",
      evidence: "Synthetic checks, SLI graphs, critical workflow results",
    },
    {
      time: "After recovery",
      event: "Incident closed and follow-up assigned",
      evidence: "Customer communication, RCA owner, corrective actions",
    },
  ],

  incidentReportTemplate: {
    incidentId: "",
    service: "",
    environment: "production",
    severity: "",
    incidentCommander: "",
    technicalLead: "",
    startTimeUtc: "",
    detectionTimeUtc: "",
    mitigationTimeUtc: "",
    recoveryTimeUtc: "",
    affectedRegionsAndTenants: [],
    affectedCustomerJourneys: [],
    customerImpact: "",
    detectionSource: "",
    timeline: [],
    confirmedRootCause: "",
    contributingFactors: [],
    evidence: [],
    mitigationApplied: "",
    rollbackPerformed: false,
    dataIntegrityAssessment: "",
    recoveryVerification: [],
    whatWentWell: [],
    whatWentPoorly: [],
    correctiveActions: [
      {
        action: "",
        owner: "",
        dueDate: "",
        priority: "",
        successMeasure: "",
      },
    ],
    blamelessSummary:
      "Describe the system conditions and process gaps that allowed the incident. Avoid attributing the incident to an individual's mistake.",
  },

  handsOnLabs: [
    {
      lab: 1,
      title: "Simulate an application outage in a local test environment",
      objective:
        "Practice distinguishing a stopped process, a wrong port, and an HTTP error without touching production.",
      tasks: [
        "Start a disposable local test service.",
        "Record a successful health-check response.",
        "Stop the test service and observe the connection failure.",
        "Start a service on a different port and compare the result.",
        "Restore the expected service and verify recovery.",
      ],
      success:
        "The learner can distinguish connection refusal, timeout, and application-level HTTP errors.",
    },
    {
      lab: 2,
      title: "Diagnose a failed Kubernetes rollout",
      objective:
        "Use a disposable cluster or test namespace to inspect rollout and readiness failures.",
      tasks: [
        "Deploy a test application in a non-production namespace.",
        "Introduce an invalid image reference or a deliberately failing readiness probe.",
        "Inspect rollout status, pods, events, logs, and endpoints.",
        "Correct the test manifest or restore the known-good revision.",
        "Verify that ready endpoints and synthetic requests recover.",
      ],
      success:
        "The learner can explain whether the failure is scheduling, image pull, startup, readiness, or routing related.",
    },
    {
      lab: 3,
      title: "Trace a slow downstream dependency",
      objective:
        "Understand how one slow dependency can cause timeouts and worker exhaustion.",
      tasks: [
        "Use a local mock dependency with configurable latency.",
        "Capture response latency and error rate before and during the delay.",
        "Inspect traces or request timing to locate the slow span.",
        "Test a bounded timeout and a safe fallback.",
        "Verify that retries do not amplify the load.",
      ],
      success:
        "The learner can locate the slow dependency and explain the recovery trade-offs.",
    },
    {
      lab: 4,
      title: "Practice a release rollback decision",
      objective:
        "Choose between rollback and roll-forward using evidence and data compatibility.",
      tasks: [
        "Compare a known-good release and a deliberately faulty test release.",
        "Identify the first failure time and the changed behavior.",
        "Review the migration and API compatibility assumptions.",
        "Choose and execute the approved recovery path in the test environment.",
        "Verify customer-facing behavior and document the decision.",
      ],
      success:
        "The learner documents the safety assumptions and proves recovery rather than relying on deployment status alone.",
    },
    {
      lab: 5,
      title: "Write a blameless post-incident review",
      objective:
        "Turn the investigation into measurable prevention work.",
      tasks: [
        "Create a UTC timeline from synthetic events.",
        "Separate trigger, root cause, and contributing factors.",
        "Identify missing detection or unsafe recovery assumptions.",
        "Create corrective actions with owners, deadlines, and success metrics.",
        "Define how the fix will be tested in a future game day.",
      ],
      success:
        "The report explains the technical failure and includes trackable actions that reduce recurrence or impact.",
    },
  ],

  interviewQuestions: [
    {
      question: "How do you troubleshoot a complete production outage?",
      answer:
        "Confirm customer impact, declare severity, preserve evidence, inspect recent changes, identify the failing layer using independent signals, form and test hypotheses, mitigate safely, verify critical journeys, and complete a blameless review.",
    },
    {
      question: "What is the difference between HTTP 502, 503, and 504?",
      answer:
        "502 generally indicates an invalid or failed upstream response; 503 indicates temporary unavailability or lack of capacity; 504 indicates an upstream response timeout. The exact meaning depends on which component generated the response, so correlate proxy and application logs.",
    },
    {
      question: "Why can a health endpoint return 200 while customers still experience an outage?",
      answer:
        "The endpoint may check only process liveness and not routing, authentication, database access, downstream dependencies, or business functionality. Use layered health checks and synthetic critical-journey tests.",
    },
    {
      question: "When should you roll back a production release?",
      answer:
        "When evidence implicates the release, a known-good version exists, rollback is tested or understood, and data/schema/API compatibility makes it safe. If rollback would worsen data integrity, consider a validated forward fix or another mitigation.",
    },
    {
      question: "Why should you not blindly restart all application instances?",
      answer:
        "A restart can erase volatile evidence, interrupt transactions, cause a thundering herd, increase cold-start pressure, and temporarily remove all healthy capacity.",
    },
    {
      question: "How can a database issue cause an application-wide outage?",
      answer:
        "Slow queries or connection exhaustion can block request workers. Queues grow, requests time out, retries amplify traffic, and even endpoints that do not directly query the database may become unavailable if they share saturated workers.",
    },
    {
      question: "What does a high p99 latency tell you?",
      answer:
        "A small fraction of requests is much slower than the rest. It may indicate tail latency, contention, queues, dependency slowness, or uneven instance behavior. It does not identify the root cause without traces and correlated metrics.",
    },
    {
      question: "How do you distinguish an application problem from a network problem?",
      answer:
        "Compare DNS, TCP, TLS, proxy, and application-layer evidence from the actual affected path. A successful test from an operations host does not prove the application's network or identity context works.",
    },
    {
      question: "What is retry amplification?",
      answer:
        "Retries create additional work while the dependency is already unhealthy. Without limits, backoff, jitter, and idempotency, retries can increase overload and extend the outage.",
    },
    {
      question: "What evidence is needed before declaring recovery?",
      answer:
        "Healthy synthetic checks, successful critical workflows, restored SLIs, stable target/readiness status, recovered dependencies, and an observation window without recurring failures.",
    },
    {
      question: "What is the difference between trigger and root cause?",
      answer:
        "The trigger is the event that starts the incident, such as a release. Root cause describes the system condition that made the failure possible, while contributing factors explain why detection, containment, or recovery was delayed.",
    },
    {
      question: "What should a good postmortem contain?",
      answer:
        "Impact, timeline, detection, confirmed cause, contributing factors, mitigation, recovery evidence, what worked, what did not, and prioritized corrective actions with owners and measurable success criteria.",
    },
  ],

  completionChecklist: [
    "Incident severity and customer impact are documented.",
    "Incident commander and technical owners are assigned.",
    "Target environment and production authorization are confirmed.",
    "Timeline, release ID, logs, metrics, and traces are captured safely.",
    "The failing layer is identified using evidence.",
    "The root-cause hypothesis has supporting and contradicting evidence.",
    "The recovery action has an owner, approval, and rollback plan.",
    "Data and transaction safety have been considered.",
    "Critical customer journeys and service indicators are verified.",
    "The observation window completes without unacceptable regression.",
    "Stakeholders receive an evidence-based recovery update.",
    "A blameless incident report is prepared.",
    "Corrective actions have owners, deadlines, and measurable outcomes.",
    "The runbook and relevant alerts are updated.",
  ],

  officialReferences: [
    {
      title: "Google SRE Book — Managing Incidents",
      url: "https://sre.google/sre-book/managing-incidents/",
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
      title: "Kubernetes — Debugging Services",
      url: "https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/",
    },
    {
      title: "Kubernetes — Deployments",
      url: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/",
    },
    {
      title: "Kubernetes — Liveness, Readiness, and Startup Probes",
      url: "https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/",
    },
    {
      title: "Prometheus — Alerting Rules",
      url: "https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/",
    },
    {
      title: "OpenTelemetry — Documentation",
      url: "https://opentelemetry.io/docs/",
    },
    {
      title: "curl — Manual",
      url: "https://curl.se/docs/manpage.html",
    },
    {
      title: "OpenSSL — s_client",
      url: "https://docs.openssl.org/master/man1/openssl-s_client/",
    },
    {
      title: "Linux — ss manual",
      url: "https://man7.org/linux/man-pages/man8/ss.8.html",
    },
  ],

  notes: [
    "This guide is a diagnostic framework; exact commands and recovery actions depend on the runtime, cloud provider, load balancer, deployment system, and application architecture.",
    "Use placeholders such as <namespace>, <deployment>, and example.com only after substituting verified values.",
    "Run read-only diagnostics first when possible. Production write operations require the organization's approval and change controls.",
    "A single successful curl, healthy process, or green deployment does not prove the entire customer journey is healthy.",
    "SEV definitions, observation windows, and response targets must follow the organization's incident policy.",
    "Do not expose credentials, tokens, customer data, private keys, or sensitive internal topology in incident evidence.",
  ],
} as const;

export default applicationOutageGuide;
