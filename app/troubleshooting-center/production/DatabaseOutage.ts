
export const databaseOutageGuide = {
  title: "Database Outage — Real Production Troubleshooting",
  fileName: "DatabaseOutage.ts",
  category: "production",
  difficulty: "advanced",
  estimatedTime: "120–240 minutes",

  description:
    "A production incident response runbook for database unavailability, connection failures, pool exhaustion, slow queries, lock contention, storage pressure, failover, replication lag, authentication problems, and data-integrity risks.",

  objectives: [
    "Distinguish a database outage from an application, network, DNS, or connection-pool failure.",
    "Measure customer impact, incident severity, and affected database workloads.",
    "Follow a safe diagnostic sequence using read-only checks first.",
    "Identify the difference between connection failures, resource saturation, slow queries, and lock contention.",
    "Investigate database storage, memory, CPU, connection limits, replication, and failover.",
    "Choose an appropriate mitigation without creating data loss or a second outage.",
    "Verify recovery, transaction outcomes, replication health, and application behavior.",
    "Create an incident timeline, blameless RCA, and measurable prevention actions.",
  ],

  incidentScenario: {
    title: "Customer-facing application loses database connectivity",
    timeline: [
      {
        time: "10:00 UTC",
        event:
          "Application database connection failures begin increasing.",
      },
      {
        time: "10:02 UTC",
        event:
          "API latency increases; database connection pools report pending borrowers and acquisition timeouts.",
      },
      {
        time: "10:05 UTC",
        event:
          "Checkout and login requests begin returning 5xx errors.",
      },
      {
        time: "10:08 UTC",
        event:
          "Database monitoring reports high query latency and elevated active connections.",
      },
      {
        time: "10:12 UTC",
        event:
          "Some background workers fall behind and queue depth increases.",
      },
      {
        time: "10:20 UTC",
        event:
          "The database team identifies a possible connection-limit, lock, storage, failover, or query-performance issue and starts a controlled mitigation.",
      },
    ],
    symptoms: [
      "Database connection refused or connection timed out.",
      "Authentication failures after credential or secret rotation.",
      "Application connection-pool acquisition timeouts.",
      "Slow queries, lock waits, deadlocks, or long-running transactions.",
      "Database CPU, memory, storage latency, or connection count near a limit.",
      "Read replicas lagging behind the primary.",
      "Failover events, DNS changes, or clients connecting to a stale endpoint.",
      "Disk or transaction-log exhaustion.",
      "Application errors even though a database health check reports success.",
    ],
    keyPrinciple:
      "A database connection error does not automatically mean the database server is down. Identify the failing layer and preserve data before changing production state.",
  },

  impactAndSeverity: {
    principle:
      "Follow the organization's incident policy. These severity levels are illustrative and must be adapted to actual customer impact.",
    levels: [
      {
        severity: "SEV1",
        criteria:
          "Critical customer workflows unavailable, broad database outage, major transaction failures, or credible risk of data loss/corruption.",
        actions: [
          "Declare the incident and appoint an incident commander.",
          "Engage database, application, infrastructure, and cloud-provider owners.",
          "Prioritize service restoration and transaction/data safety.",
          "Use approved escalation and customer communication channels.",
        ],
      },
      {
        severity: "SEV2",
        criteria:
          "Major service degradation, sustained database errors, significant query latency, or multiple applications affected.",
        actions: [
          "Identify the shared database or connection path.",
          "Coordinate database and application mitigation.",
          "Monitor whether the incident is spreading to additional workloads.",
        ],
      },
      {
        severity: "SEV3",
        criteria:
          "Limited workload impact, partial degradation, or a reliable workaround exists.",
        actions: [
          "Assign a clear owner and investigate before impact expands.",
          "Track latency, pool waits, replication lag, and capacity trends.",
        ],
      },
      {
        severity: "SEV4",
        criteria:
          "Low-impact or isolated failure without significant service degradation.",
        actions: [
          "Record the issue and follow normal operational procedures.",
          "Review whether a resilience or monitoring improvement is required.",
        ],
      },
    ],
    questions: [
      "Which applications, databases, schemas, regions, and tenants are affected?",
      "Are reads failing, writes failing, or both?",
      "Are all connections failing or only new connections?",
      "Can existing sessions still run queries?",
      "Did the problem start after a deployment, migration, secret rotation, or infrastructure change?",
      "Are transactions stuck, partially completed, or returning uncertain outcomes?",
      "Is the primary database affected, or only a replica?",
      "Is the database unavailable or simply unable to keep up with demand?",
      "Are backups, point-in-time recovery, and replication status known?",
    ],
  },

  incidentCommand: {
    roles: [
      {
        role: "Incident Commander",
        responsibility:
          "Sets priorities, assigns owners, coordinates decisions, and maintains stakeholder communication.",
      },
      {
        role: "Database Lead / DBA",
        responsibility:
          "Owns database engine diagnostics, query/lock analysis, capacity, failover, and data-safety decisions.",
      },
      {
        role: "Application Lead",
        responsibility:
          "Investigates application errors, pool configuration, transaction behavior, retries, and recent releases.",
      },
      {
        role: "Platform / SRE",
        responsibility:
          "Checks networking, DNS, secrets, compute, storage, monitoring, and cloud infrastructure events.",
      },
      {
        role: "Scribe",
        responsibility:
          "Records timestamps, evidence, commands, decisions, approvals, and recovery milestones.",
      },
    ],
    rules: [
      "Use one authoritative incident timeline and incident channel.",
      "Assign one owner to each diagnostic area.",
      "Coordinate failover, restarts, scaling, and connection-pool changes with the database owner.",
      "Record the expected result and rollback plan before any risky operation.",
      "Do not run expensive diagnostics repeatedly on an already overloaded database.",
      "Do not restore, promote, restart, or terminate production database resources without the approved procedure.",
    ],
  },

  safetyChecks: [
    "Confirm cloud account, region, database endpoint, engine, database name, environment, and cluster/instance identity.",
    "Confirm whether the target is production, staging, primary, replica, writer, or reader endpoint.",
    "Use approved credentials and least-privilege database access.",
    "Start with monitoring, logs, connection tests, and read-only metadata queries.",
    "Capture relevant metrics, database events, error messages, and recent changes before altering state.",
    "Avoid restarting the database as the first response.",
    "Never delete database files, transaction logs, WAL files, redo logs, or data directories manually.",
    "Never promote a replica or force a failover without checking replication state, split-brain risk, and the supported recovery procedure.",
    "Do not kill sessions without understanding the transaction, lock, and business impact.",
    "Do not increase connection-pool sizes blindly; aggregate connections across all application replicas may exceed database capacity.",
    "Do not run full-table scans, expensive EXPLAIN ANALYZE operations, or heavy diagnostics on an overloaded production system without approval.",
    "Protect connection strings, passwords, certificates, access tokens, customer data, and query literals in incident evidence.",
    "Before restoring from backup or replaying transactions, establish the recovery point, data-loss window, and consistency plan.",
  ],

  evidenceCollection: {
    timeline: [
      "First known failure and last known healthy timestamp.",
      "Incident declaration, mitigation start, and recovery time.",
      "Database restart, failover, maintenance, scaling, and configuration events.",
      "Application deployment, migration, secret rotation, and connection-pool changes.",
      "Traffic changes, scheduled jobs, batch workloads, and queue consumer changes.",
    ],
    databaseMetrics: [
      "Connection count, connection limit, active/idle sessions, and rejected connections.",
      "Query latency distributions, throughput, transaction rate, and query errors.",
      "CPU, memory pressure, cache/buffer hit indicators, and I/O latency.",
      "Lock waits, deadlocks, long-running transactions, and idle-in-transaction sessions.",
      "Storage free space, inode availability where relevant, transaction-log/WAL/redo usage, and IOPS.",
      "Replication lag, replication status, replay/apply delay, and replication slot health.",
      "Failover events, database restarts, recovery state, and instance health.",
      "Connection-pool active/idle/pending counts and acquisition timeout rate.",
      "Application retry count, request latency, and database error rate.",
      "Backup freshness, backup success status, and point-in-time recovery availability.",
    ],
    applicationEvidence: [
      "Exact error class and SQLSTATE/vendor error code, if available.",
      "Application release, runtime version, driver version, and connection-pool implementation.",
      "Connection acquisition duration versus query execution duration.",
      "Request/trace ID and affected endpoint or job.",
      "Connection string host/port/database name with credentials removed.",
      "Recent transaction, schema migration, ORM, and query changes.",
    ],
    rules: [
      "Use a common UTC time window for application and database evidence.",
      "Compare with a known-good period and normal traffic pattern.",
      "Record whether each command was read-only or changed production state.",
      "Capture bounded samples rather than unlimited logs or query output.",
      "Remember that monitoring data can be delayed or unavailable during an outage.",
    ],
  },

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm the actual database failure",
      objective:
        "Establish whether the database is unavailable, slow, partially reachable, or healthy while the application is failing.",
      actions: [
        "Check database-provider health and instance/cluster status.",
        "Check database alarms and recent events.",
        "Compare application connection errors with database-side connection metrics.",
        "Test connectivity from an approved diagnostic host in the relevant network.",
        "Use a safe, read-only health query if access is available.",
      ],
      decisions: [
        {
          if: "Database provider reports an outage or instance unavailable",
          then:
            "Follow the provider's incident and recovery guidance. Preserve evidence and avoid independent failover actions that conflict with managed recovery.",
        },
        {
          if: "Database is reachable from a diagnostic host but not from the application",
          then:
            "Prioritize application network path, DNS, TLS, credentials, security rules, connection pools, and workload identity.",
        },
        {
          if: "Connections succeed but queries are slow",
          then:
            "Investigate locks, query execution, CPU/I/O pressure, memory, and workload changes.",
        },
        {
          if: "Only writes fail or hang",
          then:
            "Check transaction locks, read-only/failover state, storage/log capacity, permissions, and write endpoint routing.",
        },
        {
          if: "Only reads from replicas fail or return stale data",
          then:
            "Inspect replica health, replication lag, routing, and read-after-write consistency requirements.",
        },
      ],
    },

    {
      step: 2,
      title: "Classify the connection error",
      objective:
        "Identify whether failure occurs during name resolution, network connection, TLS, authentication, session creation, or query execution.",
      errorCategories: [
        {
          symptom: "DNS resolution failure",
          possibleCauses:
            "Wrong endpoint, private DNS issue, resolver failure, stale DNS cache, or service-discovery change.",
          next:
            "Compare DNS resolution from the application environment and an approved diagnostic host.",
        },
        {
          symptom: "Connection refused",
          possibleCauses:
            "No listener, wrong port, stopped instance, incorrect endpoint, or active rejection.",
          next:
            "Verify the intended endpoint, listener, database service state, and routing configuration.",
        },
        {
          symptom: "Connection timeout",
          possibleCauses:
            "Firewall/security group, routing, packet loss, overloaded server, or an unreachable endpoint.",
          next:
            "Test the network path and inspect database and network telemetry.",
        },
        {
          symptom: "TLS/certificate error",
          possibleCauses:
            "Expired certificate, invalid hostname, incomplete trust chain, protocol mismatch, or trust-store problem.",
          next:
            "Inspect the certificate and TLS configuration without disabling certificate validation.",
        },
        {
          symptom: "Authentication failure",
          possibleCauses:
            "Wrong credential, expired password/token, secret rotation, wrong database user, or authentication policy change.",
          next:
            "Verify the effective identity and secret version through approved secret-management procedures.",
        },
        {
          symptom: "Permission denied",
          possibleCauses:
            "Missing database/schema/table privileges, role change, or wrong effective user.",
          next:
            "Inspect the effective role and denied operation; restore only the required permissions.",
        },
        {
          symptom: "Connection pool timeout",
          possibleCauses:
            "All pool connections are busy, connection creation is failing, or the database is slow.",
          next:
            "Separate acquisition wait from query duration and inspect pool metrics and database capacity.",
        },
        {
          symptom: "Query timeout",
          possibleCauses:
            "Slow query, lock wait, network delay, statement deadline, or cancellation.",
          next:
            "Correlate the query and transaction with database-side waits and application traces.",
        },
      ],
      caution:
        "Exact error messages and codes vary by database engine, driver, proxy, and connection-pool library. Do not classify the cause from one generic message alone.",
    },

    {
      step: 3,
      title: "Verify DNS, TCP, TLS, and endpoint configuration",
      objective:
        "Confirm that the application can reach the intended database endpoint securely.",
      commands: [
        {
          command: "getent hosts <db-hostname>",
          purpose:
            "On supported Linux systems, checks name resolution using the system's configured resolver path.",
          caution:
            "The result may differ from DNS tools that query a different resolver. Run in an appropriate environment.",
        },
        {
          command: "nc -vz -w 3 <db-hostname> <db-port>",
          purpose:
            "Checks whether a TCP connection can be established within a bounded timeout when netcat is installed.",
          caution:
            "A successful TCP connection does not prove TLS, authentication, or SQL execution will succeed.",
        },
        {
          command: "openssl s_client -connect <db-hostname>:<tls-port> -servername <db-hostname> -verify_return_error",
          purpose:
            "Inspects TLS negotiation and certificate verification for endpoints that support TLS over the tested connection.",
          caution:
            "Use only when the database protocol and TLS configuration support this test. Do not expose internal certificate details unnecessarily.",
        },
      ],
      inspect: [
        "Database hostname, port, database name, and reader/writer endpoint.",
        "DNS records, private zones, resolver configuration, and endpoint changes.",
        "Security groups, firewall rules, NetworkPolicies, routes, and egress policies.",
        "TLS mode, CA chain, hostname verification, and certificate expiration.",
        "Whether the application uses a proxy, sidecar, service mesh, or connection pooler.",
        "Whether the failing application runs in a different subnet, namespace, region, or identity context.",
      ],
      decisions: [
        {
          if: "DNS resolves to an unexpected address",
          then:
            "Verify endpoint ownership, recent DNS changes, failover records, and resolver caches before changing DNS.",
        },
        {
          if: "TCP fails from the application environment",
          then:
            "Investigate routing, firewall/security rules, endpoint availability, and listener state.",
        },
        {
          if: "TCP succeeds but TLS fails",
          then:
            "Correct the trust chain, hostname, certificate, or TLS settings through the approved change process.",
        },
        {
          if: "Network and TLS are healthy but authentication fails",
          then:
            "Move to credential, user, authentication policy, and authorization checks.",
        },
      ],
    },

    {
      step: 4,
      title: "Inspect managed database or instance health",
      objective:
        "Find provider-side incidents, maintenance, restarts, failovers, or resource limits.",
      checks: [
        "Cluster/instance status and provider health events.",
        "Recent maintenance, restart, failover, resize, and parameter changes.",
        "CPU utilization, memory pressure, storage latency, IOPS, and throughput limits.",
        "Connection count and connection-limit errors.",
        "Free storage, transaction-log capacity, and storage auto-growth status.",
        "Replication health and read/write endpoint routing.",
        "Provider quotas, network limits, and regional availability.",
      ],
      decisions: [
        {
          if: "Instance is unavailable or in recovery",
          then:
            "Use the provider-supported recovery workflow and verify recovery progress before retrying disruptive actions.",
        },
        {
          if: "Instance is healthy but resource saturation is severe",
          then:
            "Identify the limiting resource and workload. Coordinate a capacity or workload mitigation with the database owner.",
        },
        {
          if: "A failover recently occurred",
          then:
            "Confirm the current writer, endpoint/DNS convergence, client reconnection behavior, and replication status.",
        },
      ],
    },

    {
      step: 5,
      title: "Check connection limits and application pools",
      objective:
        "Distinguish database connection exhaustion from the underlying cause of connections remaining occupied.",
      inspect: [
        "Database current connections versus configured limits.",
        "Application pool maximum, active, idle, pending, and acquisition timeout counts.",
        "Number of application replicas and maximum connections per replica.",
        "Connection counts from batch workers, reporting jobs, migrations, monitoring, and other applications.",
        "Connection creation failures, TLS handshakes, and reconnect storms.",
        "Long transactions, unclosed connections, and slow queries.",
      ],
      calculation:
        "Potential application connections = maximum application replicas × maximum pool connections per replica. Add background workers, migration jobs, monitoring, and other clients before comparing with the database connection budget.",
      decisions: [
        {
          if: "Database is at its connection limit",
          then:
            "Identify the largest connection consumers and why sessions remain open. Do not immediately increase all pool limits.",
        },
        {
          if: "Application pool is full but database has headroom",
          then:
            "Inspect slow queries, leaked connections, long transactions, pool configuration, and application concurrency.",
        },
        {
          if: "Connection creation fails while existing sessions work",
          then:
            "Check authentication, TLS, connection limits, listener/backlog, DNS, and database-side connection rejection.",
        },
        {
          if: "Many replicas reconnect at once after failover",
          then:
            "Use controlled reconnection and retry backoff, and verify that the database can accept new sessions sustainably.",
        },
      ],
      caution:
        "Pool attributes differ between JDBC, HikariCP, Tomcat JDBC Pool, DBCP, Node.js drivers, and other clients. Verify the exact library and version before changing configuration.",
    },

    {
      step: 6,
      title: "Inspect active sessions, locks, and long transactions",
      objective:
        "Determine whether blocked transactions or lock contention are preventing progress.",
      postgresqlReadOnlyQueries: [
        {
          name: "Connection and session overview",
          sql:
            "SELECT state, count(*) FROM pg_stat_activity GROUP BY state ORDER BY count(*) DESC;",
          purpose:
            "Summarizes PostgreSQL sessions by state.",
          caution:
            "Session visibility depends on privileges. Interpret states alongside connection limits and workload.",
        },
        {
          name: "Long-running active queries",
          sql:
            "SELECT pid, usename, application_name, state, now() - query_start AS query_age, wait_event_type, wait_event, left(query, 200) AS query_sample FROM pg_stat_activity WHERE state = 'active' AND query_start IS NOT NULL ORDER BY query_start ASC LIMIT 30;",
          purpose:
            "Lists a bounded sample of active queries and their wait information.",
          caution:
            "Query text may contain sensitive literals. Review and redact before sharing.",
        },
        {
          name: "Transactions idle in transaction",
          sql:
            "SELECT pid, usename, application_name, now() - xact_start AS transaction_age, state, wait_event_type, wait_event FROM pg_stat_activity WHERE state = 'idle in transaction' AND xact_start IS NOT NULL ORDER BY xact_start ASC LIMIT 30;",
          purpose:
            "Finds transactions that remain open while no query is currently running.",
          caution:
            "An idle transaction can hold locks or prevent cleanup. Confirm ownership and business impact before terminating any session.",
        },
        {
          name: "Lock wait overview",
          sql:
            "SELECT pid, locktype, mode, granted, relation::regclass AS relation_name FROM pg_locks WHERE NOT granted LIMIT 100;",
          purpose:
            "Shows a bounded sample of locks that have not been granted.",
          caution:
            "This is an overview, not a complete blocker-to-waiter explanation. Correlate with pg_stat_activity and supported lock diagnostics.",
        },
      ],
      decisions: [
        {
          if: "Many sessions wait on locks",
          then:
            "Identify blocking transactions and coordinate a safe resolution with the database owner. Consider rollback duration and business impact before terminating a session.",
        },
        {
          if: "Long transactions are holding locks",
          then:
            "Identify the originating application/request and assess whether it can safely complete or be cancelled.",
        },
        {
          if: "No significant lock waits exist",
          then:
            "Investigate query execution, CPU/I/O, connection pressure, network latency, and resource limits.",
        },
      ],
      otherEngines:
        "For MySQL, SQL Server, Oracle, and managed database services, use the engine's supported process, lock, wait, and transaction diagnostics. Do not run PostgreSQL queries against another engine.",
    },

    {
      step: 7,
      title: "Investigate slow queries and execution plans",
      objective:
        "Determine whether query behavior or workload changes are overwhelming the database.",
      checks: [
        "Slow-query logs and query-latency distributions.",
        "Query volume and rows scanned versus rows returned.",
        "Execution-plan changes after a deployment, statistics update, or schema change.",
        "Missing or unused indexes, inefficient joins, and large sorts.",
        "Parameter-sensitive query plans and changed data distribution.",
        "ORM-generated queries, N+1 query patterns, and unexpected query fan-out.",
        "Transaction scope and repeated queries inside loops.",
      ],
      decisions: [
        {
          if: "A small number of queries dominate database time",
          then:
            "Prioritize those queries using bounded diagnostics and coordinate plan/index changes with the database owner.",
        },
        {
          if: "Query volume rises sharply but per-query latency is normal",
          then:
            "Investigate request fan-out, retry amplification, batch jobs, polling, and cache misses.",
        },
        {
          if: "Queries become slow after a release",
          then:
            "Compare query shapes, parameters, execution plans, indexes, and transaction behavior with the known-good release.",
        },
        {
          if: "CPU is low but queries remain slow",
          then:
            "Inspect lock waits, storage latency, network delays, memory pressure, and resource contention.",
        },
      ],
      caution:
        "EXPLAIN ANALYZE executes the statement in PostgreSQL and can run expensive or modifying work. Do not execute it blindly on production. Prefer a safe plan-only analysis, a representative staging environment, or an approved bounded diagnostic.",
    },

    {
      step: 8,
      title: "Check CPU, memory, storage, and transaction-log capacity",
      objective:
        "Find resource exhaustion that can make the database unavailable or unable to commit writes.",
      inspect: [
        "Database CPU saturation and runnable work.",
        "Memory pressure, cache behavior, swapping, and out-of-memory events.",
        "Storage free space and storage latency.",
        "Transaction-log, WAL, redo-log, or binary-log growth and retention constraints.",
        "Temporary-file usage, large sorts, and spill-to-disk behavior.",
        "Filesystem capacity and inode availability where applicable.",
        "Storage auto-growth configuration and provider quota limits.",
      ],
      decisions: [
        {
          if: "Database storage is nearly full",
          then:
            "Identify the growing files or database-managed storage category and follow the engine/provider's supported expansion or cleanup procedure.",
        },
        {
          if: "Transaction logs or WAL are growing continuously",
          then:
            "Investigate long-running transactions, replication slots/consumers, archiving, backups, and log-retention configuration.",
        },
        {
          if: "Storage latency or I/O saturation is high",
          then:
            "Correlate query patterns, checkpoints, batch jobs, backups, and provider storage metrics before resizing or changing workload.",
        },
        {
          if: "Memory pressure is severe",
          then:
            "Review memory consumers and query workload. Avoid arbitrary memory parameter changes that could increase total memory use beyond safe capacity.",
        },
      ],
      guardrail:
        "Never manually delete database-managed data, WAL, redo, or transaction-log files to free disk space. Use engine-specific, provider-supported recovery procedures.",
    },

    {
      step: 9,
      title: "Investigate replication and failover",
      objective:
        "Determine whether a primary/replica problem, lag, or failover transition is affecting reads and writes.",
      checks: [
        "Current writer/primary identity and cluster role.",
        "Replica health, replay/apply lag, and replication errors.",
        "Replication slot health and retained-log growth where applicable.",
        "Read/write endpoint configuration and client DNS caching.",
        "Application reconnect behavior and stale connection handling.",
        "Transaction commit status around the failover boundary.",
        "Split-brain protection and the provider's failover state.",
      ],
      decisions: [
        {
          if: "Primary is unavailable and a managed failover is in progress",
          then:
            "Follow the managed failover procedure and wait for authoritative role and health signals before directing writes.",
        },
        {
          if: "Writes work but replica reads are stale",
          then:
            "Measure replication lag and check whether the application requires read-after-write consistency. Route critical reads appropriately through the approved design.",
        },
        {
          if: "Clients still connect to the former primary",
          then:
            "Check endpoint, DNS cache, connection pool reset, and driver behavior. Avoid manual promotion without authoritative state.",
        },
        {
          if: "Replication lag grows continuously",
          then:
            "Inspect network throughput, replica resources, query workload, replay/apply capacity, and replication errors.",
        },
      ],
      caution:
        "Replication lag, failover guarantees, and promotion semantics vary by database engine and managed service. Never assume that a replica is fully current or safe to promote without checking the documented recovery state.",
    },

    {
      step: 10,
      title: "Check credentials, TLS, and database permissions",
      objective:
        "Identify identity or configuration changes that prevent clients from connecting or executing queries.",
      inspect: [
        "Effective database user, role, and authentication method.",
        "Secret version and rotation timestamp.",
        "Certificate expiry, trust chain, and hostname verification.",
        "Database/schema/table privileges and role membership.",
        "IAM database authentication or workload identity, if used.",
        "Environment-specific connection string and secret references.",
        "Whether old and new credentials overlap during rotation as intended.",
      ],
      decisions: [
        {
          if: "Authentication errors start after rotation",
          then:
            "Verify the secret version, user, token expiry, and client refresh/restart behavior through approved secret-management procedures.",
        },
        {
          if: "Only one application or environment fails",
          then:
            "Compare its identity, secret reference, network path, driver configuration, and environment overrides with a healthy peer.",
        },
        {
          if: "Connection succeeds but statements are denied",
          then:
            "Inspect the effective database role and required object privileges. Apply only the necessary permission.",
        },
      ],
      guardrail:
        "Do not put passwords or access tokens in shell history, tickets, command-line arguments, or unredacted diagnostic output.",
    },

    {
      step: 11,
      title: "Inspect application transaction and retry behavior",
      objective:
        "Find application behavior that creates database pressure or leaves transaction outcomes uncertain.",
      checks: [
        "Connection acquisition time versus query execution time.",
        "Transactions that remain open during remote API calls.",
        "Connection leaks or missing cleanup paths.",
        "Retries after timeouts when commit status is unknown.",
        "ORM query fan-out and excessive transaction scope.",
        "Pool size, idle timeout, maximum lifetime, and connection validation.",
        "Application restart or failover behavior causing connection storms.",
      ],
      decisions: [
        {
          if: "Connection acquisition time is high but query execution is short",
          then:
            "Investigate pool saturation, leaks, connection churn, and application concurrency.",
        },
        {
          if: "Query execution time is high",
          then:
            "Correlate with database waits, query plans, locks, and resource metrics.",
        },
        {
          if: "Write requests time out after being submitted",
          then:
            "Check transaction status and idempotency before retrying; the client timeout does not prove the transaction rolled back.",
        },
        {
          if: "Pool exhaustion follows a traffic spike",
          then:
            "Check sustainable throughput, request concurrency, and downstream capacity before increasing the pool size.",
        },
      ],
    },

    {
      step: 12,
      title: "Check backups and data recovery readiness",
      objective:
        "Understand the recovery point and data-loss risk before considering restore or point-in-time recovery.",
      checks: [
        "Last successful backup and its completion status.",
        "Point-in-time recovery window and transaction-log/WAL retention.",
        "Backup encryption, access permissions, and recovery credentials.",
        "Restore test results and expected recovery time.",
        "Replication state and potential data divergence.",
        "Application write activity during the failure window.",
        "Schema migration state and compatibility with the intended restore point.",
      ],
      decisions: [
        {
          if: "Database is available and data is intact",
          then:
            "Prefer a targeted, supported recovery or workload mitigation over a full restore.",
        },
        {
          if: "Data corruption or accidental destructive change is suspected",
          then:
            "Preserve the current state, stop unsafe writes where approved, and engage the database recovery owner to evaluate restore or point-in-time recovery.",
        },
        {
          if: "Restore would discard writes after the recovery point",
          then:
            "Quantify the data-loss window and create a reconciliation plan before proceeding.",
        },
      ],
      caution:
        "A backup's existence does not prove recoverability. Restore operations can overwrite valid data and require explicit approval, a target recovery point, and a validation plan.",
    },

    {
      step: 13,
      title: "Isolate the root cause using evidence",
      objective:
        "Distinguish the initiating failure from downstream symptoms and contributing factors.",
      method: [
        "Identify the earliest abnormal signal in the UTC timeline.",
        "Compare application, database, network, and provider events.",
        "Separate connection establishment, connection acquisition, and query execution timings.",
        "Compare affected and healthy clients, replicas, or regions.",
        "Write a testable hypothesis with supporting and contradicting evidence.",
        "Use a low-risk test or bounded read-only diagnostic to distinguish alternatives.",
        "Record confidence and remaining unknowns instead of claiming certainty prematurely.",
      ],
      example:
        "The application reports connection-pool timeouts. Database metrics show normal connection counts, but query latency and lock waits rose before the application pool filled. This supports lock contention or slow query execution as the initiating issue; pool exhaustion is likely a downstream symptom.",
      rule:
        "The first visible error, the first saturated resource, and the actual initiating cause can be three different things.",
    },
  ],

  rootCauseMatrix: [
    {
      cause: "Database instance unavailable",
      evidence:
        "Provider/instance health is unhealthy, connections fail from multiple approved clients, and database events show a restart or outage.",
      recovery:
        "Follow the database engine/provider's supported recovery workflow and verify authoritative health before reconnecting workloads.",
    },
    {
      cause: "DNS, network, or TLS failure",
      evidence:
        "Application-side resolution, connection, or handshake fails while database-side health may remain normal.",
      recovery:
        "Correct the verified endpoint, network path, certificate, or trust configuration.",
    },
    {
      cause: "Connection limit exhausted",
      evidence:
        "Database connection count reaches the configured limit and new sessions are rejected.",
      recovery:
        "Identify connection consumers and the reason sessions remain open; adjust aggregate capacity only after checking safe database limits.",
    },
    {
      cause: "Application pool exhaustion",
      evidence:
        "Pool pending borrowers and acquisition timeouts increase while application requests wait for a connection.",
      recovery:
        "Find slow queries, long transactions, leaks, or concurrency mismatches before changing pool size.",
    },
    {
      cause: "Lock contention",
      evidence:
        "Lock waits and long-running transactions precede the increase in query latency and connection occupancy.",
      recovery:
        "Coordinate a safe transaction resolution with the database owner and validate the effects of cancellation or rollback.",
    },
    {
      cause: "Slow query or query-plan regression",
      evidence:
        "A small set of queries dominates database time or a release changes query volume/shape.",
      recovery:
        "Use safe plan analysis and tested query/index changes through the approved process.",
    },
    {
      cause: "Storage or transaction-log exhaustion",
      evidence:
        "Free space declines, writes fail, or logs/WAL/redo grow continuously.",
      recovery:
        "Use engine/provider-supported storage expansion, archiving, retention, or recovery procedures; never delete managed log files manually.",
    },
    {
      cause: "Failover or replication problem",
      evidence:
        "Role transitions, replication errors, stale endpoints, or rising replica lag coincide with the incident.",
      recovery:
        "Follow the documented failover process and verify writer identity, consistency, and client reconnection.",
    },
    {
      cause: "Credential or permission change",
      evidence:
        "Authentication or authorization errors begin after a secret, role, or identity change.",
      recovery:
        "Restore the correct secret or minimal required privilege after verifying the effective identity.",
    },
    {
      cause: "Application retry amplification",
      evidence:
        "Connection attempts or repeated writes rise faster than successful throughput.",
      recovery:
        "Apply bounded retries and backoff; verify transaction status and idempotency before retrying writes.",
    },
    {
      cause: "Resource saturation",
      evidence:
        "CPU, memory, I/O, or storage pressure aligns with latency and throughput degradation.",
      recovery:
        "Relieve the verified bottleneck and tune workload/capacity based on measured limits.",
    },
  ],

  safeRecoveryWorkflow: {
    principle:
      "Restore service without sacrificing data integrity. Database failover, session termination, parameter changes, and restore operations require engine-specific procedures and the correct owner.",
    sequence: [
      "1. Declare the incident, establish severity, and assign a database lead.",
      "2. Verify the exact database, environment, role, and endpoint.",
      "3. Capture the initial evidence and the last known healthy state.",
      "4. Classify the failure: connectivity, authentication, capacity, query/lock, storage, replication, or data integrity.",
      "5. Choose the smallest approved mitigation with a clear expected result.",
      "6. Preserve a rollback or recovery path before changing database state.",
      "7. Coordinate application traffic, connection pools, workers, and database capacity.",
      "8. Apply the supported fix, failover, capacity change, or workload mitigation.",
      "9. Reconnect clients gradually where possible and avoid a synchronized connection storm.",
      "10. Verify database health, write behavior, query latency, and application workflows.",
      "11. Check transaction outcomes, replication, and any uncertain customer operations.",
      "12. Monitor through the required observation window and document temporary settings.",
    ],
    actions: [
      {
        action: "Fix network, DNS, TLS, or credentials",
        when:
          "Evidence confirms that clients cannot reach or authenticate to an otherwise healthy database.",
        safety:
          "Use the approved configuration/secret process and validate the path from the affected workload.",
      },
      {
        action: "Reduce application load",
        when:
          "The database is overloaded or request volume is causing connection or query saturation.",
        safety:
          "Prioritize critical operations and ensure the change does not violate transaction correctness.",
      },
      {
        action: "Terminate a blocking session",
        when:
          "A specific blocker is identified and the database owner approves the action.",
        safety:
          "Understand transaction rollback duration, application behavior, and business impact before cancellation.",
      },
      {
        action: "Scale database capacity",
        when:
          "Metrics prove a capacity bottleneck and the supported scaling path is available.",
        safety:
          "Check failover behavior, maintenance impact, quota, storage, and whether the bottleneck is actually query/lock related.",
      },
      {
        action: "Fail over to a replica",
        when:
          "The supported recovery procedure determines that failover is necessary and the candidate is suitable.",
        safety:
          "Check replication state, potential data loss, writer identity, split-brain prevention, and application reconnection.",
      },
      {
        action: "Restore or perform point-in-time recovery",
        when:
          "Corruption or destructive data change makes restore necessary.",
        safety:
          "Agree on the recovery point, data-loss window, target, reconciliation strategy, and validation plan before execution.",
      },
    ],
    neverDo: [
      "Do not restart or fail over just because one application reports a connection error.",
      "Do not promote an arbitrary replica based only on low observed lag.",
      "Do not kill sessions indiscriminately to reduce connection count.",
      "Do not increase every application pool size without calculating aggregate connections.",
      "Do not delete WAL, redo, transaction-log, or data files manually.",
      "Do not disable TLS or authentication to make connections succeed.",
      "Do not replay writes when transaction outcomes are uncertain without idempotency or reconciliation.",
      "Do not declare recovery based only on a green database status indicator.",
    ],
  },

  recoveryVerification: [
    "Database instance/cluster reports the expected healthy role and status.",
    "Approved clients can establish authenticated, encrypted connections.",
    "Safe read-only queries succeed and have acceptable latency.",
    "Controlled write verification succeeds where permitted and is safe.",
    "Application connection pools recover without sustained pending borrowers or acquisition timeouts.",
    "Critical application workflows succeed end to end.",
    "Query latency, lock waits, and database resource usage return to acceptable levels.",
    "Storage and transaction-log growth are understood and stable.",
    "Replication is healthy and meets the application's consistency requirements.",
    "Queues and background jobs recover without unsafe duplicate processing.",
    "Uncertain transactions and possible duplicate customer operations are reconciled.",
    "Backups and point-in-time recovery readiness are rechecked if relevant.",
    "Temporary incident settings have an owner, review deadline, and rollback/removal plan.",
  ],

  prevention: {
    monitoring: [
      "Alert on connection saturation, rejected connections, and application pool acquisition timeouts.",
      "Monitor query latency, throughput, lock waits, deadlocks, and long-running transactions.",
      "Alert on free storage, transaction-log/WAL/redo growth, I/O latency, and storage limits.",
      "Monitor replication lag, failover events, and backup success/freshness.",
      "Correlate database telemetry with application traces, release IDs, and connection-pool metrics.",
      "Monitor connection counts across the maximum expected number of application replicas.",
      "Alert on certificate expiry, secret rotation failures, and authentication errors.",
    ],
    capacity: [
      "Calculate total database connections across application pools, workers, jobs, migrations, and monitoring.",
      "Load-test representative queries and concurrency before major releases.",
      "Review connection pooling and transaction scope for each client library.",
      "Set storage, I/O, CPU, and connection headroom appropriate to traffic and failover requirements.",
      "Test replica lag and recovery behavior under realistic write load.",
    ],
    resilience: [
      "Use bounded connection and query timeouts.",
      "Use finite retries with backoff and jitter where appropriate.",
      "Make retryable writes idempotent and reconcile uncertain outcomes.",
      "Keep transactions short and avoid holding database connections during unnecessary remote calls.",
      "Use controlled connection-pool recovery after failover.",
      "Use compatible schema migration patterns and tested rollback/roll-forward procedures.",
      "Document when reads can use replicas and when read-after-write consistency is required.",
    ],
    recoveryReadiness: [
      "Run restore tests and record achievable RPO/RTO.",
      "Document primary/replica roles and the approved failover procedure.",
      "Keep an incident runbook with database-owner escalation details.",
      "Test credential and certificate rotation before production rollout.",
      "Practice connection exhaustion, slow-query, lock-contention, and storage-pressure scenarios in non-production.",
      "Review incidents for recurring resource and configuration problems.",
    ],
  },

  incidentTimelineTemplate: [
    {
      time: "10:00 UTC",
      event: "First database/application failure signal",
      evidence: "Alert ID, exact error, first known failing request",
    },
    {
      time: "10:05 UTC",
      event: "Incident declared",
      evidence: "Severity, incident commander, database lead",
    },
    {
      time: "10:10 UTC",
      event: "Failure layer narrowed",
      evidence: "Connection test, database status, pool and query metrics",
    },
    {
      time: "10:20 UTC",
      event: "Root-cause hypothesis recorded",
      evidence: "Supporting and contradictory evidence",
    },
    {
      time: "10:30 UTC",
      event: "Mitigation approved and started",
      evidence: "Change ID, owner, safety plan",
    },
    {
      time: "10:45 UTC",
      event: "Database and application recovery verified",
      evidence: "Connection checks, query metrics, critical workflows",
    },
    {
      time: "After recovery",
      event: "Incident review and corrective actions assigned",
      evidence: "Data-integrity assessment, RCA owner, deadlines",
    },
  ],

  incidentReportTemplate: {
    incidentId: "",
    severity: "",
    databaseEngine: "",
    databaseIdentifier: "",
    environment: "production",
    incidentCommander: "",
    databaseLead: "",
    applicationLead: "",
    startTimeUtc: "",
    detectionTimeUtc: "",
    mitigationTimeUtc: "",
    recoveryTimeUtc: "",
    affectedApplications: [],
    affectedRegions: [],
    affectedOperations: [],
    customerImpact: "",
    confirmedRootCause: "",
    contributingFactors: [],
    evidence: [],
    timeline: [],
    mitigationApplied: "",
    failoverPerformed: false,
    restorePerformed: false,
    dataIntegrityAssessment: "",
    replicationAssessment: "",
    recoveryVerification: [],
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
      "Describe the system conditions, database behavior, operational controls, and recovery gaps that allowed the incident. Focus on improving reliability rather than assigning personal blame.",
  },

  handsOnLabs: [
    {
      lab: 1,
      title: "Diagnose a connection failure",
      environment: "Local or disposable test database",
      tasks: [
        "Connect to a test database with a valid configuration.",
        "Change the test hostname or port to create a controlled connection failure.",
        "Compare DNS failure, TCP failure, authentication failure, and query failure.",
        "Restore the correct configuration and verify recovery.",
      ],
      success:
        "Explain which layer failed and which evidence distinguishes each error category.",
    },
    {
      lab: 2,
      title: "Observe connection-pool exhaustion",
      environment: "Disposable application and database",
      tasks: [
        "Configure a small test connection pool.",
        "Create bounded concurrent test requests.",
        "Observe active connections, pending borrowers, and acquisition latency.",
        "Reduce load and inspect why connections remain occupied.",
        "Verify that the pool recovers without increasing limits blindly.",
      ],
      success:
        "Distinguish pool exhaustion from database connection-limit exhaustion and slow queries.",
    },
    {
      lab: 3,
      title: "Investigate lock contention",
      environment: "Disposable database only",
      tasks: [
        "Create two test sessions that intentionally conflict over a row.",
        "Observe lock waits with the engine's read-only diagnostic views.",
        "Identify the blocking transaction.",
        "Resolve the test transaction safely.",
        "Record the effect on latency and waiting sessions.",
      ],
      success:
        "Identify blocker and waiter relationships without running destructive commands on production.",
    },
    {
      lab: 4,
      title: "Practice replica lag and failover reasoning",
      environment: "Test cluster or managed-service lab",
      tasks: [
        "Observe primary and replica status.",
        "Measure replica lag under controlled test load.",
        "Inspect the documented failover procedure and recovery guarantees.",
        "Practice validating the writer endpoint and client reconnection in the test environment.",
      ],
      success:
        "Explain the data-loss, consistency, and connection-recovery checks required before and after failover.",
    },
    {
      lab: 5,
      title: "Write a database outage postmortem",
      environment: "Synthetic incident timeline",
      tasks: [
        "Build a timeline from application errors and database metrics.",
        "Separate initiating cause, symptoms, and contributing factors.",
        "Document the mitigation and data-integrity assessment.",
        "Assign corrective actions with owners, due dates, and success measures.",
      ],
      success:
        "Produce a blameless report that explains the failure and reduces the chance or impact of recurrence.",
    },
  ],

  interviewQuestions: [
    {
      question: "How do you troubleshoot a production database outage?",
      answer:
        "Confirm impact, verify the target and database role, classify connection versus query failures, inspect provider health and recent changes, correlate application/database/network telemetry, isolate the bottleneck, mitigate safely, verify data integrity, and document the incident.",
    },
    {
      question: "What is the difference between connection timeout and query timeout?",
      answer:
        "A connection timeout occurs while establishing a connection or waiting for a connection, depending on the configured layer. A query timeout occurs while executing or waiting for a statement. Inspect driver and pool semantics before classifying the exact phase.",
    },
    {
      question: "Why can an application pool be exhausted when the database is healthy?",
      answer:
        "Connections may be held by slow queries, long transactions, leaked connections, excessive application concurrency, or pool settings that do not match the workload.",
    },
    {
      question: "Why is increasing the connection-pool size not always the right fix?",
      answer:
        "It can exceed database connection limits, increase memory usage and scheduling overhead, and add more concurrent queries to an already saturated database.",
    },
    {
      question: "What is lock contention?",
      answer:
        "Transactions wait because another transaction holds a conflicting lock. Long transactions and hot rows can cause waiting requests to accumulate and exhaust application resources.",
    },
    {
      question: "What should you check before database failover?",
      answer:
        "Confirm the approved failover procedure, current primary, candidate replica health, replication state, possible data-loss window, split-brain protection, endpoint behavior, and client reconnection strategy.",
    },
    {
      question: "What is replication lag?",
      answer:
        "It is the delay between changes on the source and their application or visibility on a replica. Its meaning and measurement depend on the engine and replication architecture.",
    },
    {
      question: "Why can a timed-out write still have succeeded?",
      answer:
        "The client may time out after the server commits but before the response arrives. Check transaction or business-operation status and use idempotency or reconciliation before retrying.",
    },
    {
      question: "How can disk pressure cause a database outage?",
      answer:
        "The database may be unable to write data, transaction logs, temporary files, or recovery metadata. Never manually delete managed database files; use supported capacity and recovery procedures.",
    },
    {
      question: "What is the difference between RPO and RTO?",
      answer:
        "RPO describes the maximum acceptable data-loss window; RTO describes the target time to restore service. Actual recovery capability must be validated through restore and failover tests.",
    },
    {
      question: "How do you prove the database outage is resolved?",
      answer:
        "Verify database role and health, authenticated connections, safe queries, application pools, critical workflows, latency, locks, replication, storage, and uncertain transaction outcomes during the required observation window.",
    },
    {
      question: "What belongs in a database outage postmortem?",
      answer:
        "Customer impact, timeline, initiating cause, contributing factors, evidence, mitigation, recovery validation, data-integrity assessment, and corrective actions with owners and measurable outcomes.",
    },
  ],

  completionChecklist: [
    "Incident severity and customer impact are documented.",
    "Correct database, environment, endpoint, and primary/replica role are confirmed.",
    "Recent deployments, secret changes, migrations, and infrastructure events are reviewed.",
    "Connection, TLS, authentication, and query failure layers are distinguished.",
    "Database and application pool metrics are correlated.",
    "Locks, long transactions, slow queries, and resource saturation are investigated.",
    "Storage and transaction-log capacity are checked.",
    "Replication and failover state are understood.",
    "A mitigation is approved and has a safety/recovery plan.",
    "Data integrity and uncertain transaction outcomes are assessed.",
    "Application workflows and database health are verified.",
    "Backups and recovery readiness are checked when relevant.",
    "Temporary settings and operational changes have owners and review deadlines.",
    "A blameless incident report and corrective actions are recorded.",
  ],

  officialReferences: [
    {
      title: "PostgreSQL — Monitoring Database Activity",
      url: "https://www.postgresql.org/docs/current/monitoring.html",
    },
    {
      title: "PostgreSQL — Explicit Locking",
      url: "https://www.postgresql.org/docs/current/explicit-locking.html",
    },
    {
      title: "PostgreSQL — Routine Database Maintenance",
      url: "https://www.postgresql.org/docs/current/routine-vacuuming.html",
    },
    {
      title: "PostgreSQL — High Availability, Load Balancing, and Replication",
      url: "https://www.postgresql.org/docs/current/high-availability.html",
    },
    {
      title: "MySQL — Server Status and System Variables",
      url: "https://dev.mysql.com/doc/refman/8.4/en/server-status-variables.html",
    },
    {
      title: "MySQL — InnoDB Locking and Transaction Model",
      url: "https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-transaction-model.html",
    },
    {
      title: "MySQL — Replication",
      url: "https://dev.mysql.com/doc/refman/8.4/en/replication.html",
    },
    {
      title: "AWS RDS — Troubleshooting",
      url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Troubleshooting.html",
    },
    {
      title: "AWS RDS — Working with Read Replicas",
      url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html",
    },
    {
      title: "Google Cloud SQL — Troubleshoot Issues",
      url: "https://cloud.google.com/sql/docs/troubleshooting",
    },
    {
      title: "Microsoft Azure SQL — Connectivity Troubleshooting",
      url: "https://learn.microsoft.com/en-us/azure/azure-sql/database/troubleshoot-common-errors-issues",
    },
    {
      title: "Google SRE Book — Addressing Cascading Failures",
      url: "https://sre.google/sre-book/addressing-cascading-failures/",
    },
  ],

  notes: [
    "PostgreSQL queries in this guide are PostgreSQL-specific. Use the supported diagnostics for the actual database engine and version.",
    "Managed database services may restrict OS-level access and expose engine metrics through provider-specific monitoring.",
    "Some metadata queries require elevated privileges; request only the minimum access needed.",
    "Use approved diagnostic environments and bounded queries during an incident.",
    "This guide is a troubleshooting framework, not a substitute for engine-specific recovery procedures or the organization's change-control policy.",
    "No destructive production action should be taken solely because a generic runbook recommends it.",
  ],
} as const;

export default databaseOutageGuide;
