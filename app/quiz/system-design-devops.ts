export interface SystemDesignDevOpsQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export const systemDesignDevOpsQuestions: SystemDesignDevOpsQuestion[] = [
  {
    id: "system-design-devops-1",
    question: "A company is designing a highly available web application across multiple availability zones. Which design choice most directly reduces the risk of a single-zone failure taking the service offline?",
    options: [
      "Run redundant application instances across multiple availability zones behind a health-checking load balancer",
      "Place every application instance in one zone and increase its CPU",
      "Store the only copy of application configuration on one virtual machine",
      "Disable health checks so traffic is never removed from an instance"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-2",
    question: "A service receives unpredictable traffic spikes during campaigns. Which architecture is generally best suited to handle changing demand without permanently paying for peak capacity?",
    options: [
      "Use horizontal autoscaling behind a load balancer and define capacity limits and scaling signals",
      "Buy enough fixed capacity for the largest imaginable event and never monitor utilization",
      "Run one very large server and disable alerts",
      "Scale only after customers report that the service is unavailable"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-3",
    question: "In a three-tier application, what is the primary responsibility of the presentation or web tier?",
    options: [
      "Accept client requests and present responses while delegating business processing and data persistence to other tiers",
      "Act as the only permanent database for all application records",
      "Manage the cloud provider's billing account",
      "Replace the network and storage layers"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-4",
    question: "Why is separating application, data, and presentation responsibilities useful in system design?",
    options: [
      "It creates clearer boundaries so each tier can be secured, scaled, tested, and changed with fewer unintended effects",
      "It guarantees that no network failures can occur",
      "It means every tier must use a different cloud provider",
      "It removes the need for monitoring and backups"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-5",
    question: "A load balancer reports that one application instance is unhealthy. What should a well-designed system normally do?",
    options: [
      "Stop sending new requests to that instance and continue routing to healthy capacity",
      "Send all traffic to the unhealthy instance to help it recover",
      "Delete the database automatically",
      "Disable every remaining instance"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-6",
    question: "What is the difference between vertical scaling and horizontal scaling?",
    options: [
      "Vertical scaling increases resources on one machine; horizontal scaling adds more machines or instances",
      "Vertical scaling adds machines; horizontal scaling only increases RAM on one machine",
      "Both mean adding more DNS records only",
      "Neither changes available compute capacity"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-7",
    question: "When is horizontal scaling particularly useful?",
    options: [
      "When a service can distribute work across multiple instances and needs to increase capacity or resilience",
      "When an application is permanently tied to one local disk and cannot share or externalize state",
      "When there is no monitoring or health checking",
      "When the workload must run on exactly one CPU core forever"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-8",
    question: "Why should application instances ideally be stateless in a horizontally scaled web tier?",
    options: [
      "Any healthy instance can handle a request without depending on session data stored only on another instance's local memory",
      "Stateless instances do not require CPU or memory",
      "It prevents the database from needing backups",
      "It means users no longer need authentication"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-9",
    question: "Where can session state be stored when web instances need to remain stateless?",
    options: [
      "In a suitable shared store or signed client token, chosen according to security and consistency requirements",
      "Only in a random application's local memory with no replication",
      "In the load balancer's access log as plain text",
      "In a developer's terminal history"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-10",
    question: "What is the main purpose of a content delivery network (CDN)?",
    options: [
      "Serve cacheable content from locations closer to users to reduce latency and origin load",
      "Replace all application databases with local browser storage",
      "Guarantee that every API request is strongly consistent",
      "Manage Jenkins build agents"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-11",
    question: "A service has low average latency but very poor 99th-percentile latency. What does this usually indicate?",
    options: [
      "A minority of requests are much slower, possibly due to contention, dependencies, queues, or uneven workload",
      "Every request has exactly the same response time",
      "The service has no users",
      "The database has no indexes by definition"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-12",
    question: "Why are p95 and p99 latency measurements often more useful than average latency alone?",
    options: [
      "They reveal slow experiences near the tail that averages can hide",
      "They report only the fastest request",
      "They replace all error-rate metrics",
      "They guarantee that every user sees the same latency"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-13",
    question: "What is the purpose of a service-level indicator (SLI)?",
    options: [
      "It is a measurable signal of service behavior, such as successful-request ratio or latency",
      "It is a contractual penalty amount only",
      "It is a server installation image",
      "It is a list of all source-code files"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-14",
    question: "How does a service-level objective (SLO) differ from an SLI?",
    options: [
      "An SLI is the measurement; an SLO is the target or goal for that measurement over a defined period",
      "An SLO is a metric and an SLI is always a legal contract",
      "They are both names for a load balancer",
      "An SLI can only measure CPU and an SLO can only measure RAM"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-15",
    question: "What is an error budget in SRE practice?",
    options: [
      "The amount of unreliability allowed by an SLO over its measurement window",
      "The maximum amount a company can spend on cloud storage",
      "The number of failed deployments that should be hidden",
      "A backup of application error logs"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-16",
    question: "A service is burning its error budget rapidly. What is a sensible response?",
    options: [
      "Investigate the causes and consider prioritizing reliability work or limiting risky changes according to the team's policy",
      "Increase the SLO target without telling anyone and ignore the failures",
      "Delete the metrics so the budget appears healthy",
      "Disable incident paging permanently"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-17",
    question: "What is the primary difference between monitoring and observability?",
    options: [
      "Monitoring checks known signals and conditions; observability uses telemetry to help explain system behavior, including unfamiliar problems",
      "Monitoring is only for cloud costs, while observability is only for source code",
      "They are identical and have no distinct purpose",
      "Observability means collecting logs but never metrics or traces"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-18",
    question: "Which telemetry signals are commonly used together to understand production behavior?",
    options: [
      "Metrics, logs, and distributed traces",
      "Only screenshots of the dashboard",
      "Only Git commit messages",
      "Only CPU temperature readings from a developer laptop"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-19",
    question: "What does distributed tracing help engineers understand in a microservices system?",
    options: [
      "How a request moves across services and where time or errors occur along that path",
      "How to increase the font size in terminal output",
      "Which users have the strongest passwords",
      "How to replace all service APIs with database tables"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-20",
    question: "Why should logs include consistent timestamps and correlation or trace identifiers?",
    options: [
      "They make it easier to connect events across components during investigation",
      "They guarantee that every log message is accurate",
      "They eliminate the need for access controls",
      "They automatically fix slow queries"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-21",
    question: "What is a useful principle for alert design in production?",
    options: [
      "Alert on actionable symptoms or risks with clear ownership and a documented response",
      "Alert on every metric change, regardless of impact",
      "Create alerts without a recipient or runbook",
      "Disable alerts during business hours"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-22",
    question: "Why can excessive alert noise be dangerous?",
    options: [
      "Responders may miss important signals or become desensitized to alerts",
      "It guarantees faster incident response",
      "It reduces the number of system failures",
      "It makes service-level objectives unnecessary"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-23",
    question: "What is the role of a runbook during an operational incident?",
    options: [
      "Provide verified steps for diagnosis, mitigation, recovery, and escalation",
      "Replace all technical monitoring",
      "Store production passwords in a shared public document",
      "Guarantee the incident cannot recur"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-24",
    question: "What is the purpose of a post-incident review or blameless postmortem?",
    options: [
      "Understand contributing factors and identify practical system improvements without reducing the event to personal blame",
      "Find one person to blame and avoid discussing system conditions",
      "Remove incident timelines from the record",
      "Prove that monitoring is never useful"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-25",
    question: "A service depends on a third-party API that sometimes becomes slow. Which design can help prevent the slow dependency from exhausting all request-handling resources?",
    options: [
      "Use bounded timeouts, concurrency limits, and an appropriate circuit breaker or fallback",
      "Wait indefinitely for every API call",
      "Increase the number of retries without any limit",
      "Make every incoming request open ten duplicate API calls"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-26",
    question: "What is the purpose of a circuit breaker pattern?",
    options: [
      "Temporarily stop calls to a failing dependency and allow controlled recovery probes after a threshold or interval",
      "Encrypt data stored in a relational database",
      "Automatically scale every service to zero",
      "Guarantee that a remote service will never fail"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-27",
    question: "Why should retries use limits and backoff when a remote dependency is failing?",
    options: [
      "Unbounded retries can amplify load and make the original outage worse",
      "Retries always reduce traffic to zero",
      "Backoff prevents every network error",
      "A retry policy removes the need for timeouts"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-28",
    question: "What is retry amplification in a distributed system?",
    options: [
      "Retries at multiple layers multiply requests to an already struggling dependency",
      "A method for compressing logs",
      "A way to reduce every request to one byte",
      "A database indexing strategy"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-29",
    question: "Why is a timeout important for network calls between services?",
    options: [
      "It bounds how long a caller waits and helps release resources when a dependency does not respond",
      "It guarantees the remote operation is canceled in every case",
      "It automatically rolls back all remote side effects",
      "It prevents all packet loss"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-30",
    question: "What is bulkheading in system design?",
    options: [
      "Isolating resources or workloads so a failure or overload in one area does not consume all capacity",
      "Combining every service into one process",
      "Storing all logs in one unprotected file",
      "Allowing one tenant to use all shared resources"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-31",
    question: "When is asynchronous messaging a good alternative to synchronous service-to-service calls?",
    options: [
      "When work can be decoupled in time and queued for reliable processing rather than requiring an immediate response",
      "When every request must return a database result in the same network round trip",
      "When the system cannot tolerate any message delay",
      "When messages must never be persisted"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-32",
    question: "What is a key benefit of a message queue between a producer and a worker service?",
    options: [
      "It can buffer bursts and decouple producer availability from consumer processing capacity",
      "It guarantees that consumers never fail",
      "It removes the need to monitor queue depth",
      "It forces all messages to be processed simultaneously"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-33",
    question: "What operational risk arises when a message queue grows continuously over time?",
    options: [
      "Consumers may be unable to keep up, causing increasing processing delay and possibly storage pressure",
      "The system is necessarily operating perfectly",
      "The producer automatically becomes faster",
      "Queue depth is unrelated to service health"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-34",
    question: "What is backpressure in a distributed service?",
    options: [
      "A way for downstream capacity limits to influence upstream production so overload does not grow without control",
      "A DNS record used for failover",
      "A process that deletes monitoring data",
      "A guarantee of zero latency"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-35",
    question: "Why should message consumers be designed to handle duplicate delivery when using at-least-once messaging?",
    options: [
      "A message may be delivered again after acknowledgement loss or a retry, so processing must avoid unintended duplicate effects",
      "At-least-once delivery guarantees every message is delivered exactly once",
      "Queues never redeliver messages",
      "Duplicate messages are always harmless regardless of business logic"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-36",
    question: "What does idempotency mean for an API operation?",
    options: [
      "Repeating the same operation with the same idempotency key or intended input does not create unintended duplicate effects",
      "Every request must create a new resource",
      "The API never returns an error",
      "The API accepts requests without authentication"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-37",
    question: "Why are idempotency keys useful for payment or order APIs?",
    options: [
      "They help safely retry requests when the client does not know whether the original request completed",
      "They remove the need for authorization",
      "They make payment processing independent of all databases",
      "They guarantee every bank transfer settles instantly"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-38",
    question: "What is the CAP theorem commonly used to discuss in distributed data systems?",
    options: [
      "Trade-offs involving consistency and availability when a network partition occurs",
      "The relationship between CPU temperature and memory size",
      "A rule that every database must use SQL",
      "A guarantee that distributed systems always provide strong consistency and full availability during partitions"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-39",
    question: "What is eventual consistency?",
    options: [
      "Replicas may temporarily disagree but are expected to converge if updates stop and propagation succeeds",
      "Every read must immediately return the newest globally committed value",
      "A database property that prevents replication",
      "A guarantee that no conflicting writes can occur"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-40",
    question: "When is strong consistency especially important?",
    options: [
      "When correctness requires reads to reflect the latest committed operation according to the system's consistency contract",
      "When serving public static images from a CDN",
      "When approximate analytics are sufficient",
      "When stale data is explicitly acceptable"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-41",
    question: "What is a read replica commonly used for?",
    options: [
      "Offloading eligible read traffic and improving read capacity, while accounting for replication lag",
      "Replacing the primary database's backups",
      "Accepting all writes without coordination in every database",
      "Serving as a firewall for the application"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-42",
    question: "What is replication lag?",
    options: [
      "The delay before changes on a primary data source are visible on a replica",
      "The time needed to compile an application",
      "The duration of a DNS record's TTL only",
      "The number of failed Jenkins jobs"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-43",
    question: "Why might a user see stale data immediately after a successful write when reads are routed to replicas?",
    options: [
      "The replica may not yet have applied the latest change because of replication lag",
      "The primary database never stores writes",
      "A load balancer always corrupts responses",
      "Strong consistency requires stale reads"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-44",
    question: "What is database sharding?",
    options: [
      "Partitioning data across multiple database nodes based on a chosen shard key or routing scheme",
      "Keeping every record on one machine only",
      "Compressing SQL queries into smaller strings",
      "Replicating the exact same full dataset to every application server without partitioning"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-45",
    question: "What is a major design risk when choosing a shard key?",
    options: [
      "A skewed key can concentrate traffic or data on one shard and create a hot spot",
      "A good shard key always makes transactions globally free",
      "The key determines the color of the monitoring dashboard",
      "Shard keys remove the need for backups"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-46",
    question: "What is a hot partition or hot key?",
    options: [
      "A small portion of data receives disproportionate traffic or writes, overloading the node or partition responsible for it",
      "A partition with no traffic",
      "A server that has high room temperature only",
      "A database table containing only archived records"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-47",
    question: "Why should database connection pools be sized carefully?",
    options: [
      "Too many connections can overload the database, while too few may queue requests unnecessarily",
      "More connections always improve throughput without limit",
      "Connection pools eliminate slow queries",
      "Pool size has no relation to database capacity"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-48",
    question: "What is connection pool exhaustion?",
    options: [
      "Requests cannot obtain a connection because all pooled connections are in use or unavailable",
      "A database has run out of disk space in every case",
      "All SQL statements have completed instantly",
      "The application has too many DNS records"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-49",
    question: "Why can adding more application instances overload a database?",
    options: [
      "Each instance may create its own connection pool and increase aggregate connection and query load",
      "Horizontal scaling always decreases database traffic",
      "Database capacity automatically scales with every application instance",
      "Application instances never communicate with databases"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-50",
    question: "What is the purpose of a database index?",
    options: [
      "It can speed up selected lookups and query patterns, at the cost of storage and write-maintenance overhead",
      "It guarantees every query uses no CPU",
      "It replaces data backups",
      "It prevents all duplicate records without constraints"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-51",
    question: "Why should engineers inspect query plans for slow database queries?",
    options: [
      "They reveal how the database plans to access data and can expose scans, inefficient joins, or missing indexes",
      "They automatically fix every SQL query",
      "They show only the application's CSS",
      "They replace capacity planning"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-52",
    question: "What is caching intended to improve in a system?",
    options: [
      "Reduce repeated computation or data retrieval by reusing results when freshness and invalidation rules allow it",
      "Make all data permanently current without coordination",
      "Replace every persistent data store",
      "Guarantee that every request is served from memory"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-53",
    question: "What is cache invalidation?",
    options: [
      "Ensuring cached entries are refreshed, expired, or removed when the underlying data changes or becomes too old",
      "Encrypting every cache key with a new password",
      "Adding more application replicas",
      "Creating a new Git branch"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-54",
    question: "Why can a cache stampede occur?",
    options: [
      "Many requests miss or expire the same cache entry at once and overwhelm the underlying dependency",
      "The cache has no entries and no traffic",
      "A database index is too selective",
      "A CDN always serves a fresh object"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-55",
    question: "Which approach can help reduce cache stampedes for popular keys?",
    options: [
      "Use request coalescing, controlled refresh, jittered expiration, or stale-while-revalidate where appropriate",
      "Expire all keys at the exact same instant",
      "Disable every cache and double the request rate",
      "Allow unlimited parallel recomputation for the same key"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-56",
    question: "What is the difference between a write-through cache and a write-back cache?",
    options: [
      "Write-through updates the backing store as part of the write path; write-back may defer persistence and needs careful durability handling",
      "Write-through never updates the database",
      "Write-back always has stronger durability without trade-offs",
      "They differ only in cache key length"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-57",
    question: "What is a single point of failure (SPOF)?",
    options: [
      "A component whose failure can cause the whole required service or critical function to fail because no adequate alternative exists",
      "Any component that has more than one replica",
      "A metric with a single sample",
      "A test that runs only once"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-58",
    question: "How can a system reduce single points of failure in its network path?",
    options: [
      "Use redundant network components and paths, test failover, and ensure routing and dependencies support the intended redundancy",
      "Connect all services through one unmonitored switch",
      "Disable health checks and failover",
      "Store all network credentials on one engineer's laptop"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-59",
    question: "What is the difference between high availability and disaster recovery?",
    options: [
      "High availability aims to maintain service through common component failures; disaster recovery restores service after larger disruptive events",
      "They are identical terms with no operational distinction",
      "Disaster recovery only means adding CPU",
      "High availability is a backup file format"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-60",
    question: "What does Recovery Time Objective (RTO) define?",
    options: [
      "The target maximum duration for restoring a service or business process after disruption",
      "The maximum amount of data that may be lost",
      "The average request payload size",
      "The number of replicas in a cluster"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-61",
    question: "What does Recovery Point Objective (RPO) define?",
    options: [
      "The acceptable amount of data loss measured in time, based on the last recoverable point",
      "The time required to restart a web server",
      "The maximum number of containers per node",
      "The length of a TLS certificate"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-62",
    question: "Why are backups not sufficient unless restore procedures are tested?",
    options: [
      "A backup may be incomplete, corrupted, inaccessible, or too slow to restore within the required objectives",
      "Backup files always restore perfectly by definition",
      "Restore tests create more outages than they prevent",
      "Backups eliminate the need for replication"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-63",
    question: "What is the difference between replication and backup?",
    options: [
      "Replication maintains additional live copies for continuity, while backups preserve recoverable points and may protect against logical deletion or corruption",
      "Replication always protects against accidental deletion better than every backup strategy",
      "Backups are only for logs and replication is only for images",
      "They are interchangeable in all recovery scenarios"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-64",
    question: "Why should backups be isolated or protected from production credentials?",
    options: [
      "An attacker or compromised production account should not be able to easily destroy both live data and its recovery copies",
      "Backups should be writable by every application process",
      "Isolation makes restoration impossible",
      "Backup access controls are unrelated to ransomware risk"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-65",
    question: "What is a multi-region architecture intended to provide?",
    options: [
      "Potential resilience to regional outages and lower latency for geographically distributed users, with added complexity and cost",
      "A guarantee that all regions have identical state instantly",
      "A way to eliminate data governance",
      "A requirement that every request be sent to every region"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-66",
    question: "What is a major challenge with active-active multi-region writes?",
    options: [
      "Coordinating conflicting updates, consistency, routing, and failure recovery across regions",
      "Regions can never accept HTTP requests",
      "It always removes the need for replication",
      "It makes latency identical for every user"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-67",
    question: "When might an active-passive disaster recovery design be preferable to active-active?",
    options: [
      "When simpler failover and lower operating complexity are more important than serving active traffic from every region",
      "When zero recovery time is guaranteed without testing",
      "When the application has no data",
      "When the team cannot monitor the standby region"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-68",
    question: "Why should failover be tested rather than assumed to work?",
    options: [
      "DNS, routing, credentials, data replication, capacity, and dependencies may behave differently during a real outage",
      "Failover is purely a documentation task",
      "Testing prevents all future regional outages",
      "Failover never changes traffic paths"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-69",
    question: "What is DNS TTL relevant to during failover?",
    options: [
      "It influences how long resolvers may cache a DNS answer, which can affect how quickly some clients use a changed destination",
      "It guarantees every client immediately refreshes DNS",
      "It sets database transaction isolation",
      "It controls container memory limits"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-70",
    question: "Why is DNS failover not a complete substitute for application-level health checks?",
    options: [
      "DNS caching and client behavior can delay changes, and a reachable destination may still be unhealthy",
      "DNS records directly inspect every business transaction",
      "DNS prevents all network partitions",
      "Application health checks cannot detect failures"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-71",
    question: "What is a blue-green deployment architecture?",
    options: [
      "Two production-like environments allow traffic to switch from the current version to a separately deployed new version",
      "A database backup stored in two colors",
      "A system where every server runs two operating systems",
      "A deployment where no rollback is possible"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-72",
    question: "What is a canary release in a system design context?",
    options: [
      "A small fraction of traffic or users receives the new version first while health and business signals are evaluated",
      "A release that skips monitoring",
      "A database partitioning method",
      "A guarantee that all users receive the new version simultaneously"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-73",
    question: "What is the key advantage of a rolling deployment?",
    options: [
      "It replaces instances gradually, potentially maintaining service capacity while the version changes",
      "It guarantees database migrations are reversible",
      "It makes all old and new versions compatible automatically",
      "It eliminates the need for readiness checks"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-74",
    question: "Why should application versions remain compatible during a rolling deployment?",
    options: [
      "Old and new instances coexist temporarily and may interact with the same clients, data, and dependencies",
      "Only one version is ever present during a rolling deployment",
      "Compatibility is handled by DNS in every case",
      "A rolling deployment never changes application behavior"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-75",
    question: "What is the purpose of readiness checks in a containerized application?",
    options: [
      "Indicate whether an instance is prepared to receive traffic, including after startup or temporary unavailability",
      "Restart a container whenever CPU usage is low",
      "Replace all authentication checks",
      "Prove the code has no vulnerabilities"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-76",
    question: "How does a liveness check differ from a readiness check?",
    options: [
      "Liveness indicates whether a process should be restarted; readiness indicates whether it should receive traffic",
      "Readiness always restarts the host and liveness only checks DNS",
      "They are identical and must always use the same endpoint",
      "Liveness proves the database backup is valid"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-77",
    question: "Why can an overly aggressive liveness probe cause an outage?",
    options: [
      "Transient slowness can trigger repeated restarts, reducing capacity and preventing the service from recovering",
      "It guarantees that every process is healthy",
      "It increases available memory without limit",
      "It disables container orchestration"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-78",
    question: "What is the purpose of graceful shutdown in a service?",
    options: [
      "Stop accepting new work, finish or safely cancel in-flight requests, and release resources within a bounded period",
      "Kill every request immediately without recording status",
      "Delete persistent data during each restart",
      "Disable load balancer health checks forever"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-79",
    question: "Why should a service handle termination signals in containers or orchestrated environments?",
    options: [
      "The platform may stop or replace instances during scaling, rollout, node maintenance, or recovery",
      "Containers can never be stopped by a platform",
      "Signals only change log formatting",
      "Handling signals replaces readiness checks"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-80",
    question: "What is a service mesh commonly used for in microservices architectures?",
    options: [
      "Provide infrastructure-level capabilities such as service-to-service traffic management, identity, encryption, and telemetry",
      "Replace all application business logic with YAML",
      "Store the only copy of customer data",
      "Compile source code into container images"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-81",
    question: "What is a potential cost of adopting microservices compared with a modular monolith?",
    options: [
      "More network interactions, operational components, deployment coordination, and distributed debugging complexity",
      "Microservices eliminate the need for APIs",
      "Microservices cannot scale independently",
      "A monolith cannot be monitored"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-82",
    question: "When may a modular monolith be a better starting point than microservices?",
    options: [
      "When the domain and team are still evolving and independent deployment or scaling boundaries are not yet justified",
      "When the application must have no tests",
      "When every feature needs a separate database cluster from day one",
      "When network calls are mandatory between all code modules"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-83",
    question: "What is an important property of a well-designed service boundary?",
    options: [
      "It groups cohesive responsibilities and minimizes unnecessary coupling to other services' internal data and implementation",
      "It requires every service to share one database schema directly",
      "It exposes all internal classes as public APIs",
      "It makes every service deploy at the same time"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-84",
    question: "Why is direct shared-database access by many microservices often problematic?",
    options: [
      "It couples services to the same schema and can make ownership, migrations, and independent change harder",
      "It guarantees perfect service isolation",
      "It removes every transaction concern",
      "It prevents accidental cross-service coupling"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-85",
    question: "What is an API gateway typically responsible for?",
    options: [
      "Providing a controlled entry point for routing, authentication integration, rate limiting, or request shaping where appropriate",
      "Replacing all internal data stores",
      "Guaranteeing every downstream service is healthy",
      "Executing every background job on one server"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-86",
    question: "Why should rate limiting be applied to public APIs?",
    options: [
      "It can protect shared capacity from excessive use and help enforce fair usage or abuse controls",
      "It guarantees all clients receive identical latency",
      "It replaces authentication and authorization",
      "It makes every API request idempotent"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-87",
    question: "What is the difference between authentication and authorization?",
    options: [
      "Authentication establishes who or what is making a request; authorization determines what that identity is allowed to do",
      "Authentication controls database indexing and authorization controls DNS TTL",
      "They are interchangeable terms",
      "Authorization proves a user's password is correct"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-88",
    question: "Why should internal service-to-service traffic also be authenticated and authorized?",
    options: [
      "Internal networks can be compromised or misconfigured, so location alone is not a reliable trust boundary",
      "Internal services are always impossible to attack",
      "Private IP addresses encrypt every payload automatically",
      "It prevents the need for network segmentation"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-89",
    question: "What is the purpose of TLS for service communication?",
    options: [
      "It helps provide confidentiality and integrity in transit and authenticates endpoints when certificate validation is configured correctly",
      "It encrypts data at rest automatically",
      "It prevents all application-layer vulnerabilities",
      "It replaces authorization checks"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-90",
    question: "Why should secrets be delivered through a managed secret mechanism rather than hard-coded into images?",
    options: [
      "Images may be copied widely and retained, making embedded credentials difficult to rotate and easy to expose",
      "Hard-coded secrets are always safer because they are compiled",
      "Managed secrets never need access control",
      "Container images cannot contain text files"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-91",
    question: "What is the principle of least privilege in a cloud-native system?",
    options: [
      "Each identity, service, and workload receives only the permissions required for its intended task",
      "Every service receives administrator rights for convenience",
      "All services share the same root credential",
      "Permissions are never reviewed after creation"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-92",
    question: "Why is network segmentation useful in a production architecture?",
    options: [
      "It limits unnecessary communication paths and can reduce lateral movement if a component is compromised",
      "It guarantees every packet is encrypted",
      "It removes the need for application authorization",
      "It makes all services publicly reachable"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-93",
    question: "What is defense in depth?",
    options: [
      "Using multiple complementary security controls so failure of one control does not expose the entire system",
      "Using one firewall and assuming it solves every risk",
      "Disabling logs to reduce data exposure",
      "Putting every service on one unrestricted network"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-94",
    question: "Why should systems validate input at trust boundaries?",
    options: [
      "Malformed or hostile input can trigger injection, resource exhaustion, or unexpected behavior in downstream components",
      "Input validation guarantees the caller is authorized",
      "It replaces output encoding and parameterized queries",
      "It makes all external requests safe automatically"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-95",
    question: "What is the purpose of a WAF in a web architecture?",
    options: [
      "Inspect and filter HTTP traffic for selected attack patterns and policy violations, as one layer of defense",
      "Replace application authentication completely",
      "Guarantee that no vulnerable code reaches production",
      "Manage database replication"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-96",
    question: "Why is a WAF not a replacement for fixing application vulnerabilities?",
    options: [
      "It may miss attacks or create false positives and cannot reliably correct every flaw in application logic",
      "A WAF cannot inspect HTTP traffic",
      "Application vulnerabilities disappear when traffic is encrypted",
      "WAF rules automatically patch source code"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-97",
    question: "What is a denial-of-service (DoS) risk in system design?",
    options: [
      "An attacker or excessive workload consumes resources so legitimate requests cannot be served reliably",
      "A harmless increase in source-code comments",
      "A guarantee that data is strongly consistent",
      "A method for reducing log retention"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-98",
    question: "Which controls can help reduce denial-of-service impact?",
    options: [
      "Rate limits, capacity controls, caching, upstream protection, and graceful degradation matched to the threat model",
      "Unlimited retries and unlimited request bodies",
      "One server with no monitoring",
      "Removing all timeouts"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-99",
    question: "What is graceful degradation?",
    options: [
      "Reducing or disabling nonessential features so critical functionality can continue during overload or dependency failure",
      "Turning off every feature whenever one dependency is slow",
      "A process that deletes user data to free disk",
      "A deployment strategy that avoids health checks"
    ],
    answer: 0
  },
  {
    id: "system-design-devops-100",
    question: "What is a fallback response in a resilient service?",
    options: [
      "A controlled alternative result or behavior used when the preferred dependency or operation is unavailable",
      "An unbounded retry loop",
      "A database password stored in logs",
      "A guarantee that users will never notice an outage"
    ],
    answer: 0
  }
];
