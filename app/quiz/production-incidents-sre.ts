export interface ProductionIncidentSreQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export const productionIncidentsSreQuestions: ProductionIncidentSreQuestion[] = [
  {
    id: "production-incidents-sre-1",
    question: "A production API's 5xx error rate rises sharply immediately after a deployment, while traffic remains normal. What is the safest initial response?",
    options: [
      "Confirm the affected scope, correlate the change with the start time, inspect rollout health and key metrics, then mitigate or roll back if evidence supports it",
      "Restart every server and database at the same time before collecting evidence",
      "Disable all alerts so the team can focus without notifications",
      "Increase every timeout and retry count to hide the errors"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-2",
    question: "A major incident affects customers across several regions. What should the incident commander prioritize?",
    options: [
      "Coordinate the response, establish incident roles and priorities, maintain a shared timeline, and ensure clear stakeholder updates",
      "Personally debug every service and approve every shell command",
      "Ask all teams to investigate independently without a shared channel",
      "Wait until the root cause is proven before communicating any impact"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-3",
    question: "A service's availability SLO is 99.9% over a rolling 30-day window. What does the error budget represent?",
    options: [
      "The amount of unreliability permitted by that SLO during the measurement window",
      "The maximum number of bugs developers may merge each month",
      "The amount of money reserved for emergency cloud spending",
      "The number of errors that may be ignored regardless of customer impact"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-4",
    question: "What is the most useful distinction between an SLI, an SLO, and an SLA?",
    options: [
      "An SLI measures service behavior, an SLO sets a target for that measure, and an SLA is an agreement with defined commitments",
      "An SLI is a contract, an SLO is a log file, and an SLA is a dashboard",
      "An SLI defines the on-call schedule, an SLO defines server size, and an SLA defines source-control policy",
      "They are interchangeable names for the same metric"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-5",
    question: "A team receives hundreds of alerts during a dependency outage, including many alerts from downstream services. What should it improve?",
    options: [
      "Use symptom- and impact-oriented alerts, deduplicate related notifications, and define dependency-aware alerting",
      "Create a separate page for every individual exception and every affected replica",
      "Raise every threshold until no alerts occur during outages",
      "Remove monitoring from downstream services"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-6",
    question: "The average request latency is healthy, but p99 latency is several seconds. What is the best interpretation?",
    options: [
      "A small but important portion of requests is experiencing very high latency that the average conceals",
      "Every request is taking exactly the average latency",
      "The service cannot be overloaded because the average is healthy",
      "The percentile metric proves that the monitoring system is incorrect"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-7",
    question: "A service has low CPU usage but high request latency. Which investigation is most appropriate?",
    options: [
      "Check dependency latency, lock contention, queueing, connection pools, disk/network I/O, and traces for slow request paths",
      "Immediately double the CPU limit because latency always means CPU starvation",
      "Delete old logs before looking at the request path",
      "Assume the latency is harmless because CPU usage is low"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-8",
    question: "A database connection pool is exhausted and API requests are timing out. Which mitigation is generally safest to evaluate first?",
    options: [
      "Check database health and pool wait metrics, reduce excess concurrency or traffic if needed, and restore capacity carefully",
      "Increase the pool to an unlimited value without checking database connection limits",
      "Retry every failed query immediately and indefinitely",
      "Restart all application instances repeatedly without checking connection leaks"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-9",
    question: "During an incident, engineers disagree about the root cause and several hypotheses remain unverified. How should updates be written?",
    options: [
      "Separate confirmed facts from hypotheses, describe current impact and actions, and state when the next update will be provided",
      "Choose the most popular hypothesis and report it as confirmed",
      "Publish raw logs containing credentials so everyone can inspect them",
      "Send no updates until every uncertainty has been eliminated"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-10",
    question: "What is the primary purpose of a blameless postmortem after a serious incident?",
    options: [
      "Understand technical and organizational contributing factors and create actionable changes that reduce recurrence",
      "Identify the individual who should be punished for the outage",
      "Prove that the incident was unavoidable and close the discussion",
      "Replace operational metrics with personal opinions"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-11",
    question: "An alert fires because the request failure ratio is high, but the service has almost no traffic. What should the alert design consider?",
    options: [
      "Use a meaningful request-volume condition or window alongside the error ratio so tiny samples do not cause misleading pages",
      "Page on every single failed request regardless of traffic",
      "Ignore all errors whenever traffic is low",
      "Replace the error ratio with server uptime only"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-12",
    question: "What is the best definition of Mean Time to Detect (MTTD) in incident analysis?",
    options: [
      "The average elapsed time from incident onset to detection, according to the team's defined measurement points",
      "The average time required to deploy a new release",
      "The maximum duration of a single customer request",
      "The time between two scheduled backups"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-13",
    question: "Why should a team define Mean Time to Restore (MTTR) precisely before comparing incident reports?",
    options: [
      "Teams use MTTR to mean different endpoints, such as repair, recovery, or resolution, so consistent definitions are required",
      "MTTR always measures only the time needed to identify a developer",
      "MTTR is a fixed Kubernetes metric with one universal definition",
      "MTTR excludes customer impact by definition"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-14",
    question: "Several systems report events with inconsistent timestamps during an outage. What operational improvement helps correlate those events?",
    options: [
      "Synchronize clocks across hosts and services and preserve timestamps with timezone or UTC context",
      "Sort log lines alphabetically by message text",
      "Remove timestamps from logs to avoid confusion",
      "Use each host's local time without documenting its timezone"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-15",
    question: "A new release causes errors in one availability zone but not others. What is the most useful next step?",
    options: [
      "Compare deployment versions, configuration, dependency health, and traffic by zone, then isolate or roll back the affected slice if appropriate",
      "Roll back every region immediately without checking scope",
      "Assume the load balancer is broken because only one zone is affected",
      "Disable zone-level telemetry so the results look consistent"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-16",
    question: "What information should a high-quality incident status update normally contain?",
    options: [
      "Customer impact and scope, what is known, mitigation underway, current risks, and the time of the next update",
      "Only the names of engineers who are online",
      "Unverified root-cause guesses presented as facts",
      "Internal credentials and complete customer records"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-17",
    question: "What makes an incident runbook useful during a stressful production event?",
    options: [
      "It gives clear, reviewed steps for detection, diagnosis, safe mitigation, verification, escalation, and rollback",
      "It contains a long list of commands without prerequisites or expected outcomes",
      "It assumes every incident has the same root cause",
      "It replaces the need to monitor the service"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-18",
    question: "A proposed mitigation may affect all customers and is not yet tested. What should the responder do?",
    options: [
      "Estimate blast radius, validate the change where possible, use a controlled rollout, and prepare a rollback path",
      "Apply the change globally immediately because speed is the only concern",
      "Disable audit logging before applying it",
      "Make several unrelated changes together to save time"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-19",
    question: "What does blast radius describe in reliability engineering?",
    options: [
      "The set of users, requests, services, regions, or data that a failure or change can affect",
      "The physical size of the server room",
      "The number of lines in the incident report",
      "The number of alerts configured for one host"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-20",
    question: "A feature introduced behind a feature flag is causing checkout failures. Why can the flag be valuable?",
    options: [
      "It can disable or limit the problematic feature quickly while leaving unrelated application functionality running",
      "It automatically repairs database corruption and restores lost data",
      "It guarantees that the service will never need a rollback",
      "It replaces access controls and release testing"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-21",
    question: "When is rolling back a release a reasonable incident mitigation?",
    options: [
      "When evidence connects the release to customer impact and reverting to a known-good version is safer than available alternatives",
      "Whenever any metric changes, even if the change is unrelated and harmless",
      "Only after deleting the old release artifacts",
      "Never, because production changes must always be fixed forward"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-22",
    question: "What is a canary deployment intended to accomplish?",
    options: [
      "Expose a new version to a limited subset first, compare health signals, and expand only if it behaves acceptably",
      "Send every customer to the new version before collecting metrics",
      "Run a backup process on a single server",
      "Disable monitoring until the release is complete"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-23",
    question: "How does progressive delivery reduce release risk?",
    options: [
      "It expands exposure in controlled stages using health checks, metrics, and defined promotion or rollback criteria",
      "It removes all automated checks so deployment finishes faster",
      "It guarantees that application bugs cannot reach production",
      "It requires every release to be deployed to all regions at once"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-24",
    question: "Why should rollback procedures be tested before an emergency?",
    options: [
      "To confirm that artifacts, configuration, data compatibility, permissions, and operational steps work when recovery is urgent",
      "To prove that the newest release can never fail",
      "To remove the need for versioned artifacts",
      "To ensure that rollback always reverses irreversible database changes automatically"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-25",
    question: "What is the purpose of a change freeze during a severe incident?",
    options: [
      "Reduce additional change-related risk while responders stabilize the service, with explicit exceptions for necessary mitigations",
      "Prevent responders from applying any fix even when customers remain affected",
      "Erase recent deployment history from the system",
      "Guarantee that the existing fault will resolve by itself"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-26",
    question: "A user-facing service is failing, but host CPU, memory, and uptime dashboards appear normal. What should be investigated next?",
    options: [
      "User-journey synthetic checks, application logs, dependency health, DNS/network behavior, and gaps in observability",
      "Only the host uptime metric, because green infrastructure metrics prove the application is healthy",
      "The office Wi-Fi password",
      "Nothing until the infrastructure dashboard turns red"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-27",
    question: "Which of the four golden signals measures how long a request takes to complete?",
    options: [
      "Latency",
      "Traffic",
      "Errors",
      "Saturation"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-28",
    question: "In the four golden signals model, what does traffic represent?",
    options: [
      "The demand placed on a system, such as requests per second or transactions per second",
      "The number of source-code files in a repository",
      "The amount of unused memory on a host",
      "The number of engineers subscribed to an alert"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-29",
    question: "What does saturation help an SRE team understand?",
    options: [
      "How heavily a constrained resource or service is loaded relative to its capacity",
      "Whether a code comment uses correct grammar",
      "How many pull requests are open",
      "Whether the service has a registered domain name"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-30",
    question: "Why are p50, p95, and p99 latency metrics often more informative than average latency alone?",
    options: [
      "They expose the distribution and tail behavior of requests that averages can hide",
      "They guarantee that every request completes within the p99 value",
      "They directly measure the number of database rows",
      "They can be calculated accurately without any request observations"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-31",
    question: "A service's p99 latency rises only during traffic bursts. Which set of causes is worth investigating?",
    options: [
      "Queue buildup, concurrency limits, connection pools, resource saturation, and downstream capacity",
      "Only source-code formatting and comment length",
      "DNS registration expiry as the only possible explanation",
      "The number of branches in the Git repository"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-32",
    question: "A sudden increase in HTTP 5xx responses can indicate which class of problem?",
    options: [
      "Application exceptions, unavailable dependencies, overload, misconfiguration, or a faulty deployment",
      "Only successful cache hits",
      "Only an increase in documentation changes",
      "That all customer requests are succeeding"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-33",
    question: "What is the safest way to investigate a possible memory leak in a production service?",
    options: [
      "Correlate memory trends with traffic and release changes, inspect heap or runtime diagnostics safely, and mitigate before resource exhaustion",
      "Repeatedly increase memory limits without collecting evidence",
      "Disable memory metrics because they may create noise",
      "Delete the process immediately every time memory rises slightly"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-34",
    question: "A service is being OOM-killed after traffic increases. What should the response include?",
    options: [
      "Confirm container and node memory evidence, assess request patterns and memory behavior, then apply a tested mitigation and fix",
      "Assume CPU throttling is the direct cause of every OOM kill",
      "Remove all memory limits from every workload permanently",
      "Disable restart policies so the container cannot restart"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-35",
    question: "What is CPU throttling in a containerized service, and why can it matter?",
    options: [
      "The container is restricted by CPU quota, which can increase latency when the workload needs more CPU time",
      "The container has unlimited CPU access and therefore cannot slow down",
      "The container's memory is encrypted by the kernel",
      "The container's network packets are always dropped"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-36",
    question: "A Kubernetes Pod is repeatedly entering CrashLoopBackOff during an incident. What is a useful first diagnostic sequence?",
    options: [
      "Inspect Pod events, current and previous container logs, exit code, probe failures, resource limits, and recent changes",
      "Delete the namespace immediately without preserving evidence",
      "Increase replicas indefinitely and ignore the failing container",
      "Change the cluster DNS domain before checking the application"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-37",
    question: "A Kubernetes Pod remains Pending during a production scale-out. What should be checked first?",
    options: [
      "Scheduling events, resource requests, node capacity, affinity rules, taints and tolerations, and PVC binding",
      "Only the container's application logs, even though it has not started",
      "The Ingress URL alone",
      "The Git branch name without checking cluster state"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-38",
    question: "A new Pod shows ImagePullBackOff during a deployment. What should responders verify?",
    options: [
      "Image repository and tag, registry reachability, imagePullSecrets, permissions, and relevant Pod events",
      "Only the Service's ClusterIP",
      "The PodDisruptionBudget's minimum availability",
      "The application's HTTP route after the container has started"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-39",
    question: "A readiness probe fails while a container remains running. What is the usual effect?",
    options: [
      "The Pod is generally removed from ready Service endpoints until it becomes ready again",
      "The container is always restarted immediately by the readiness probe",
      "The worker node is automatically deleted",
      "The Deployment and its ReplicaSets are permanently removed"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-40",
    question: "Why can an overly aggressive liveness probe worsen an incident?",
    options: [
      "It can restart a slow or overloaded but recoverable process repeatedly, adding instability instead of allowing recovery",
      "It automatically improves throughput in every case",
      "It prevents Kubernetes from scheduling new Pods",
      "It disables all Service routing permanently"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-41",
    question: "When is a startup probe especially helpful?",
    options: [
      "When an application needs a longer initialization period before liveness checks should begin enforcing restarts",
      "When a service needs to select an external load balancer",
      "When a PersistentVolumeClaim must be deleted",
      "When every request must be retried forever"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-42",
    question: "During node maintenance, `kubectl drain` is blocked by a PodDisruptionBudget. What does this usually indicate?",
    options: [
      "Evicting the selected Pod would violate the configured disruption allowance, so availability and the maintenance plan must be reviewed",
      "The PodDisruptionBudget automatically doubled the cluster size",
      "The node's container runtime has definitely failed",
      "The API server is unable to read any resource types"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-43",
    question: "What is the practical difference between cordoning and draining a Kubernetes node?",
    options: [
      "Cordon prevents new ordinary scheduling onto the node; drain attempts to evict eligible existing Pods for maintenance",
      "Cordon deletes every existing Pod; drain only changes a node label",
      "They are identical commands with different names",
      "Drain creates a new worker node while cordon restarts kubelet"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-44",
    question: "A Kubernetes Service has no ready backend endpoints during an outage. What should be examined?",
    options: [
      "Service selectors and labels, Pod readiness, EndpointSlices, namespace, and relevant network policy",
      "Only the Service object's creation timestamp",
      "Only the cluster's node names",
      "The Helm chart license without checking endpoints"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-45",
    question: "A service name fails to resolve inside Pods, but direct Pod IP access works. What should be investigated?",
    options: [
      "CoreDNS health and configuration, the Service name and namespace, Pod DNS settings, and DNS network connectivity",
      "The application's CPU request only",
      "The database schema version only",
      "The Deployment's image tag as the only possible cause"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-46",
    question: "A NetworkPolicy was added shortly before service-to-service calls began failing. What is the best investigation?",
    options: [
      "Review policy selectors and ingress/egress rules, confirm CNI policy enforcement, and test the required traffic paths",
      "Delete all cluster network components immediately",
      "Increase container memory limits",
      "Assume NetworkPolicy affects only persistent storage"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-47",
    question: "A Kubernetes HPA is not scaling a workload despite high CPU usage. What should be checked?",
    options: [
      "Metrics API availability, CPU requests, HPA events and conditions, target configuration, and current metric values",
      "Only whether the Service is type LoadBalancer",
      "The number of ConfigMaps in another namespace",
      "Whether the Deployment's name contains the word production"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-48",
    question: "The HPA has increased replicas, but Pods cannot be scheduled because the cluster lacks capacity. What component or mechanism should be examined?",
    options: [
      "Node capacity and the cluster autoscaling or node-provisioning configuration, including scheduling constraints",
      "Only the HPA's replica count, without examining pending Pods",
      "The Ingress TLS certificate only",
      "The application's source-control tags"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-49",
    question: "How do Horizontal Pod Autoscaler and Cluster Autoscaler differ?",
    options: [
      "HPA adjusts workload replica counts based on metrics; Cluster Autoscaler can adjust node capacity in supported environments",
      "HPA provisions physical nodes, while Cluster Autoscaler changes application code",
      "They both only rotate Kubernetes Secrets",
      "They always make the same scaling decision at the same time"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-50",
    question: "A queue-based worker service falls behind even though its Pods are healthy. Which indicators are most useful?",
    options: [
      "Queue depth and age, message processing rate, worker concurrency, processing errors, and downstream limits",
      "Only the number of Kubernetes namespaces",
      "Only the latest container image size",
      "The number of open source files on each worker"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-51",
    question: "A message consumer starts processing the same job repeatedly after timeouts. What should be examined?",
    options: [
      "Acknowledgement timing, visibility or lease timeout, retry policy, idempotency, and dead-letter handling",
      "Only the dashboard's background color",
      "Disable acknowledgements and retries for every queue",
      "Increase log verbosity without inspecting queue semantics"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-52",
    question: "Why should retry logic usually include limits and backoff?",
    options: [
      "Unbounded or immediate retries can amplify overload and keep a failing dependency under pressure",
      "Retries guarantee that a failed dependency recovers instantly",
      "Backoff removes the need for timeouts",
      "Retrying forever guarantees that no request will fail"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-53",
    question: "What is the purpose of a circuit breaker in a distributed system?",
    options: [
      "Temporarily stop calls to a failing dependency, allowing recovery and preventing repeated work against it",
      "Encrypt every network connection automatically",
      "Guarantee that all downstream services remain available",
      "Replace all application-level metrics"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-54",
    question: "How should timeouts be designed across a chain of dependent services?",
    options: [
      "Set realistic bounded timeouts so downstream work cannot consume more time than the caller's overall deadline",
      "Remove timeouts so slow dependencies have unlimited time",
      "Use a longer timeout for every downstream call regardless of the request deadline",
      "Choose random timeout values for each replica"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-55",
    question: "A downstream dependency is slow and incoming requests are accumulating. What does bulkheading help with?",
    options: [
      "Isolate resource pools or concurrency so one failing dependency does not consume all capacity for unrelated work",
      "Merge every resource pool into one unlimited pool",
      "Remove all admission control",
      "Make every dependency share the same failure mode"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-56",
    question: "What does idempotency mean for an operation retried after a timeout?",
    options: [
      "Repeating the same operation with the same key or request does not create unintended additional effects",
      "The operation must always return an HTTP 200 response",
      "The operation cannot access a database",
      "The operation must execute only on one physical server forever"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-57",
    question: "A payment request times out after the provider may have processed it. What is a safer recovery strategy?",
    options: [
      "Use an idempotency key or reconciliation query to determine the outcome before issuing a potentially duplicate payment",
      "Repeat the payment immediately with a new identifier every time",
      "Assume a timeout proves that the provider did not process it",
      "Delete the payment record to clear the alert"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-58",
    question: "A database primary fails over, but the application continues receiving connection errors. What should be checked?",
    options: [
      "Client connection pool behavior, stale connections, DNS or endpoint discovery, retry/backoff, and failover readiness",
      "Only the frontend CSS bundle",
      "The number of application source files",
      "Disable database authentication to speed up recovery"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-59",
    question: "Database query latency increases while connection count is near its limit. What is a useful diagnostic path?",
    options: [
      "Inspect slow queries, query plans, lock waits, pool saturation, connection churn, and database resource metrics",
      "Increase all connection pools without checking the database's maximum capacity",
      "Delete the query logs immediately",
      "Assume every slow query is caused by DNS"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-60",
    question: "A database migration is required to roll back an application release. What should be evaluated before reverting?",
    options: [
      "Schema and data compatibility, migration reversibility, backup status, and whether old and new versions can safely coexist",
      "Only the application server's hostname",
      "Whether the rollback command is shorter than the deploy command",
      "Ignore the database because application rollback always reverses data changes"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-61",
    question: "What is the primary value of point-in-time recovery for a database?",
    options: [
      "It can restore data to a selected time using an appropriate backup and transaction-log or journal chain",
      "It automatically prevents every future data corruption event",
      "It replaces access control and audit logging",
      "It guarantees zero data loss without any recovery-point constraints"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-62",
    question: "Why must backup restoration be tested rather than only checking that backup jobs succeed?",
    options: [
      "A successful backup job does not prove the data is complete, consistent, accessible, or restorable within recovery objectives",
      "Restoration tests are only needed when the backup job reports success",
      "Backup files cannot become corrupted",
      "Testing restoration automatically improves query performance"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-63",
    question: "What is the difference between Recovery Time Objective (RTO) and Recovery Point Objective (RPO)?",
    options: [
      "RTO is the target time to restore service; RPO is the acceptable amount of data loss measured in time",
      "RTO is the acceptable data loss; RPO is the server restart duration",
      "Both are measurements of average request latency",
      "RTO applies only to logs and RPO applies only to CPU"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-64",
    question: "A regional outage affects the primary service region. What should a team verify before failing over?",
    options: [
      "Failover readiness, replicated data state, traffic-routing behavior, dependency capacity, and risks such as split brain",
      "Only that the standby region has a different name",
      "That the primary region is deleted first",
      "That monitoring is disabled to avoid duplicate alerts"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-65",
    question: "What is a split-brain risk in a replicated system?",
    options: [
      "Two sides may both act as authoritative leaders and accept conflicting writes during a partition",
      "A replica has a different log format from another replica",
      "A dashboard has two charts on one page",
      "Two engineers are assigned to the same incident"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-66",
    question: "A cache outage sends nearly all requests to the database. What failure pattern does this resemble, and what can help?",
    options: [
      "A cache stampede or cascading overload; use request coalescing, bounded concurrency, controlled fallback, and load shedding",
      "A successful cache warm-up; increase database traffic further",
      "A DNS-only outage; rotate every TLS certificate",
      "A storage snapshot; delete the database index"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-67",
    question: "Why can a cache TTL change cause a sudden backend load increase?",
    options: [
      "Many keys may expire around the same time, causing a burst of cache misses and backend requests",
      "TTL controls CPU scheduling on all application nodes",
      "A longer TTL always increases misses immediately",
      "Cache expiry automatically increases database connection limits"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-68",
    question: "What is load shedding during overload?",
    options: [
      "Deliberately reject or defer lower-priority work to preserve capacity for critical requests",
      "Accept every request and queue it indefinitely",
      "Disable all health checks to make capacity appear available",
      "Increase traffic to the most overloaded dependency"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-69",
    question: "What is graceful degradation in a production service?",
    options: [
      "Preserve core user journeys while temporarily disabling or simplifying nonessential functionality",
      "Return fabricated success responses for all failed operations",
      "Shut down every feature whenever one dependency is slow",
      "Ignore customer-visible errors until capacity returns"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-70",
    question: "Why is backpressure important in a streaming or queue-based architecture?",
    options: [
      "It communicates overload upstream so producers or intermediaries can slow down rather than overwhelm consumers",
      "It guarantees that producers always run at maximum speed",
      "It removes the need to monitor queue depth",
      "It makes message processing synchronous in every architecture"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-71",
    question: "A deployment succeeds, but a key business workflow fails because a required downstream service is unavailable. What should release verification include?",
    options: [
      "End-to-end smoke tests and dependency-aware health checks for critical user workflows, not just deployment status",
      "Only checking that the deployment command returned exit code zero",
      "Only checking that all Pods are Running",
      "Checking source-code formatting and nothing else"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-72",
    question: "What is the difference between liveness and readiness checks in service operations?",
    options: [
      "Liveness indicates whether a process should be restarted; readiness indicates whether it should receive normal traffic",
      "Liveness checks user permissions, while readiness rotates database passwords",
      "They are identical checks with different names",
      "Readiness always restarts the process, while liveness only changes DNS"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-73",
    question: "A service reports healthy at the process level, but a critical dependency is unusable. What should the health-check design consider?",
    options: [
      "Expose dependency or workflow health appropriately without making transient dependency problems trigger destructive restart loops",
      "Make liveness fail for every temporary downstream delay so all instances restart together",
      "Return healthy unconditionally from every endpoint",
      "Remove readiness checks and route traffic to all instances"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-74",
    question: "Why should synthetic monitoring test important user journeys from outside the service?",
    options: [
      "It can detect user-visible failures across DNS, TLS, routing, authentication, and application dependencies that internal host metrics may miss",
      "It replaces the need for application telemetry entirely",
      "It proves that every possible user request will succeed",
      "It measures only disk temperature"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-75",
    question: "What is distributed tracing especially useful for during a latency incident?",
    options: [
      "Following a request across services and identifying where time is spent or errors originate",
      "Showing the exact source code of every dependency automatically",
      "Replacing all logs, metrics, and incident notes in every situation",
      "Determining employee performance rankings"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-76",
    question: "What is the key advantage of correlating metrics, logs, and traces?",
    options: [
      "Metrics reveal trends, logs provide event details, and traces show request paths across components",
      "All three contain identical information and one can always replace the others",
      "Correlation removes the need to synchronize clocks",
      "They guarantee the root cause will be obvious without investigation"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-77",
    question: "Why should production logs avoid storing secrets and unnecessary personal data?",
    options: [
      "To reduce credential exposure, privacy risk, and the impact of log access or retention failures",
      "Because logs must never contain timestamps",
      "Because secrets in logs improve authentication reliability",
      "To make incident investigations impossible"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-78",
    question: "An incident requires collecting debug logs that may contain sensitive fields. What is the safer approach?",
    options: [
      "Use approved access controls, redact sensitive values, limit collection and retention, and share only what responders need",
      "Copy all raw production data into a public chat room",
      "Disable access controls until the incident is resolved",
      "Store credentials in the incident title for quick reference"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-79",
    question: "What is the purpose of an audit log during incident response?",
    options: [
      "Provide a traceable record of important actions and access for investigation and accountability",
      "Replace application performance metrics",
      "Automatically reverse every production change",
      "Guarantee that no unauthorized action can ever occur"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-80",
    question: "A cloud provider reports elevated errors in a managed dependency. How should the team respond?",
    options: [
      "Confirm whether the dependency issue matches observed symptoms, apply documented mitigations, and communicate impact while tracking recovery",
      "Assume the provider is the cause without validating any local evidence",
      "Delete all local telemetry because the dependency is external",
      "Make unrelated infrastructure changes immediately"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-81",
    question: "A DNS change appears to have caused an outage. What should responders inspect?",
    options: [
      "Authoritative records, TTLs, resolver caches, propagation, health of targets, and whether rollback is safe",
      "Only the application's memory limit",
      "The database table schema only",
      "Only the number of users logged into source control"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-82",
    question: "A TLS certificate expires and clients reject connections. What is the best immediate operational response?",
    options: [
      "Validate the certificate chain and affected endpoints, renew or restore a valid certificate safely, then verify client connectivity",
      "Disable TLS validation for all clients permanently",
      "Change all application ports without checking the certificate",
      "Delete DNS records to suppress certificate warnings"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-83",
    question: "A secret or API key may have been exposed in logs. What should the response prioritize?",
    options: [
      "Contain access, rotate or revoke the exposed credential, assess use, remove exposure where feasible, and preserve investigation evidence",
      "Delete the logs only and keep using the same credential",
      "Post the credential in the incident channel to confirm it",
      "Wait for proof of abuse before taking any containment step"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-84",
    question: "A security incident and a reliability incident overlap. What should responders do?",
    options: [
      "Coordinate incident command, preserve evidence, contain risk safely, and involve the appropriate security and service owners",
      "Prioritize uptime by destroying all forensic evidence",
      "Allow unrelated teams to change production independently",
      "Publish all incident details publicly before assessing exposure"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-85",
    question: "Why should emergency production access be time-bound and audited?",
    options: [
      "It limits the duration and scope of elevated privileges while retaining a record of sensitive actions",
      "It ensures that every engineer has permanent administrator access",
      "It removes the need for identity verification",
      "It guarantees that emergency changes cannot fail"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-86",
    question: "What is the purpose of a game day or controlled failure exercise?",
    options: [
      "Practice response procedures and test resilience assumptions in a planned, bounded environment",
      "Create an unannounced outage in the busiest production period",
      "Replace backups with simulations",
      "Measure how quickly a team can assign blame"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-87",
    question: "How does chaos engineering differ from randomly breaking production systems?",
    options: [
      "It uses explicit hypotheses, controlled experiments, safeguards, and measurable observations to test resilience",
      "It intentionally has no hypothesis, monitoring, or rollback plan",
      "It means deleting resources until something fails",
      "It focuses only on generating more alerts"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-88",
    question: "What should be established before running a fault-injection experiment?",
    options: [
      "Scope, hypothesis, steady-state metrics, abort conditions, blast-radius limits, and a recovery plan",
      "Only a list of servers to delete",
      "An agreement to ignore customer-impact alerts",
      "A requirement to run it during a major incident"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-89",
    question: "A postmortem lists 'human error' as the only root cause. What is the better follow-up?",
    options: [
      "Examine system design, safeguards, workload, documentation, detection, and decision context that made the error possible",
      "Close the report because no technical changes are needed",
      "Remove the person from all future incident channels",
      "Prohibit all manual operations without designing safer alternatives"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-90",
    question: "What makes a postmortem action item effective?",
    options: [
      "It names an owner, a measurable outcome, a priority, and a due date, and addresses a contributing factor",
      "It says 'be more careful' without any owner or verification",
      "It is limited to improving the report's formatting",
      "It is assigned to an unspecified team with no follow-up"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-91",
    question: "Why should incident reviews distinguish root causes from contributing factors?",
    options: [
      "Complex incidents usually arise from interacting conditions, so understanding multiple contributors leads to stronger mitigations",
      "Every incident must have exactly one cause",
      "Contributing factors are never actionable",
      "Root causes are always individual mistakes"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-92",
    question: "A recurring alert has been acknowledged many times but never leads to useful action. What should the team do?",
    options: [
      "Review whether it signals actionable user impact, then tune, redesign, or remove it with appropriate safeguards",
      "Keep it unchanged because frequent alerts prove it is important",
      "Route it to every engineer in the company",
      "Disable all alerting for the affected service"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-93",
    question: "How should an on-call handoff be performed during an unresolved incident?",
    options: [
      "Share impact, timeline, hypotheses and confidence, actions taken, current risks, owners, and the next planned steps",
      "Transfer only the dashboard URL without context",
      "Delete temporary notes before handing over",
      "Assume the incoming engineer can infer all details from memory"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-94",
    question: "What is a sensible approach when an incident spans multiple service teams?",
    options: [
      "Assign clear ownership and incident roles, maintain one shared timeline, and coordinate dependencies and communication",
      "Let each team publish conflicting status updates independently",
      "Wait for one team to accept blame before acting",
      "Ask every team to make simultaneous uncoordinated changes"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-95",
    question: "What does a service dependency map help responders do?",
    options: [
      "Understand upstream and downstream relationships to estimate impact and prioritize investigations",
      "Automatically fix every dependency failure",
      "Replace service-level objectives with hostnames",
      "Prove that services have no shared failure modes"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-96",
    question: "Why are single points of failure important in a reliability review?",
    options: [
      "They can turn a component failure into a broader outage unless redundancy or a safe fallback exists",
      "They always improve performance by reducing complexity",
      "They matter only in development environments",
      "They eliminate the need for disaster recovery"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-97",
    question: "What is the purpose of bulkhead isolation between critical and noncritical workloads?",
    options: [
      "Prevent resource exhaustion in one workload from consuming all capacity needed by another",
      "Force every workload to use the same shared thread pool",
      "Ensure a failure in one service immediately stops all services",
      "Remove capacity limits from the platform"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-98",
    question: "A service is overloaded and requests are queued faster than they can be processed. What is a safer response than allowing an unbounded queue?",
    options: [
      "Bound the queue, apply backpressure or load shedding, and protect critical work while scaling or fixing the bottleneck",
      "Increase queue length without limit so no request is rejected",
      "Disable latency monitoring until the queue drains",
      "Retry every queued request concurrently"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-99",
    question: "Why can increasing replicas fail to fix a production bottleneck?",
    options: [
      "The bottleneck may be a shared database, external dependency, lock, quota, or downstream capacity limit",
      "Replicas never improve service capacity under any conditions",
      "Replica count changes only log retention",
      "Adding replicas always reduces the available database connections"
    ],
    answer: 0
  },
  {
    id: "production-incidents-sre-100",
    question: "A service has a high request rate but low successful throughput. Which investigation is most useful?",
    options: [
      "Compare offered load with completed requests, error and timeout rates, queue depth, retries, and resource constraints",
      "Check only the number of code comments",
      "Assume that high request rate proves the service is healthy",
      "Disable request accounting to reduce metric cardinality"
    ],
    answer: 0
  }
];
