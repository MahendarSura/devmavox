
export const jndiConnectionLeakGuide = {
  title: "Tomcat JNDI Database Connection Leak",
  slug: "jndi-connection-leak",
  category: "Tomcat",
  difficulty: "Advanced",
  estimatedTime: "60-120 minutes",
  description:
    "Production incident runbook for diagnosing JNDI datasource failures, JDBC connection leaks, connection pool exhaustion, long-running transactions, database saturation, and redeployment-related resource leaks.",

  incidentScenario: {
    title: "Production requests start timing out because the JDBC pool is exhausted",
    scenario: [
      "A Java application running on Apache Tomcat uses a JNDI datasource to access a relational database.",
      "After several hours of normal traffic, requests begin timing out while waiting for database connections.",
      "Application logs show connection acquisition timeouts, JDBC exceptions, or SQL query delays.",
      "Tomcat itself remains RUNNING, but API latency increases and HTTP 500/503 responses rise.",
      "The database may still be healthy, or it may be experiencing slow queries, locks, or connection-limit pressure.",
      "The incident responder must distinguish a genuine connection leak from legitimate long-running work before changing pool settings or restarting production."
    ],
    firstPrinciple:
      "Establish whether connections are leaked, busy, blocked, or unable to reach the database. Preserve evidence before recycling the pool or restarting the application."
  },

  impactAndSeverity: {
    severityLevels: [
      {
        severity: "SEV-1",
        condition:
          "Critical production transactions fail broadly, all database connections are exhausted, or customer-facing services are unavailable."
      },
      {
        severity: "SEV-2",
        condition:
          "A major application is degraded, connection acquisition timeouts are increasing, or multiple instances are affected."
      },
      {
        severity: "SEV-3",
        condition:
          "One instance shows rising active connections or intermittent pool waits while service remains available."
      },
      {
        severity: "SEV-4",
        condition:
          "A non-production environment shows a suspected leak without customer impact."
      }
    ],
    questions: [
      "Which application, Tomcat instance, environment, and datasource are affected?",
      "Did the issue start after a deployment, traffic spike, database change, or configuration update?",
      "Are all application instances affected or only one?",
      "Are active connections continuously increasing, or are they rising only during peak traffic?",
      "Are connections idle, active, abandoned, or waiting to be borrowed?",
      "Is the database reachable and accepting new connections?",
      "Are slow SQL statements, lock waits, or long transactions present?",
      "Are HTTP 5xx errors, request latency, and thread counts increasing?",
      "Did a recent redeployment leave old database connections or background threads behind?",
      "Has anyone already increased the pool maximum or restarted Tomcat?"
    ]
  },

  safetyChecks: {
    beforeChanges: [
      "Confirm the target host, environment, application, JNDI resource name, and database.",
      "Identify the exact pool implementation and version before applying pool-specific settings.",
      "Check remaining healthy application capacity and database connection headroom.",
      "Capture pool metrics, database sessions, thread dumps, and representative exceptions before restarting.",
      "Confirm production approval before draining an instance, recycling a pool, or restarting Tomcat.",
      "Check whether active transactions are performing critical writes or financial operations.",
      "Do not terminate database sessions based solely on their age; identify transaction state and business impact.",
      "Do not increase maxActive or maxTotal without calculating the database-wide connection budget.",
      "Do not enable verbose JDBC logging indefinitely in production.",
      "Redact passwords, connection strings containing credentials, tokens, customer data, and SQL parameter values from evidence."
    ],
    prohibitedShortcuts: [
      "Do not assume every pool timeout proves a connection leak.",
      "Do not restart every Tomcat instance simultaneously.",
      "Do not kill all database sessions belonging to the application.",
      "Do not close a shared JDBC connection while another thread may be using it.",
      "Do not fix leaks by simply increasing the pool size.",
      "Do not enable abandoned-connection reclamation without checking transaction and query duration.",
      "Do not edit global JNDI resources without identifying every application that consumes them."
    ]
  },

  evidenceCollection: {
    capture: [
      "Incident start time and time zone",
      "Tomcat, Java, JDBC driver, database, and pool implementation versions",
      "Application release ID and recent configuration changes",
      "JNDI resource name and configuration source",
      "Pool active, idle, maximum, wait, timeout, and abandoned-connection metrics",
      "Database session count, connection limit, active queries, and lock waits",
      "Application request rate, latency, error rate, and thread utilization",
      "Thread dumps captured during the incident, following production policy",
      "Connection acquisition timeout messages and stack traces",
      "Long-running SQL and transaction evidence",
      "Deployment and redeployment timestamps",
      "Datasource ownership, resource scope, and pool configuration",
      "JVM memory, garbage collection, CPU, and thread counts"
    ],
    initialCommands: [
      "date -Is",
      "hostname -f",
      "java -version",
      "systemctl status tomcat --no-pager -l",
      "journalctl -u tomcat --since '-30 minutes' --no-pager",
      "df -hT",
      "free -h",
      "uptime"
    ],
    notes: [
      "Use the correct Tomcat service name and log destination for the environment.",
      "JNDI configuration may be defined in context.xml, server.xml, META-INF/context.xml, an external context descriptor, or a platform-managed configuration source.",
      "Datasource properties and monitoring capabilities differ between Tomcat JDBC Pool, Apache Commons DBCP, HikariCP, application-server integrations, and managed database services."
    ]
  },

  keyConcepts: {
    jndi:
      "JNDI lets an application look up a configured resource by name, such as java:comp/env/jdbc/AppDB. The lookup name and actual datasource configuration must agree.",
    connectionPool:
      "A pool reuses physical database connections. Applications borrow a logical Connection and must close it to return it to the pool.",
    leak:
      "A leak occurs when borrowed connections are not reliably returned after their work completes. The pool gradually loses available capacity.",
    exhaustion:
      "Exhaustion means callers cannot obtain a connection within the configured wait period. A leak is only one possible cause.",
    activeConnections:
      "Connections currently borrowed from the pool. High active count can mean high legitimate concurrency, slow queries, blocked transactions, or a leak.",
    idleConnections:
      "Available pooled connections. Zero idle connections alone is not proof of a leak if active work is legitimate.",
    waiters:
      "Threads waiting to borrow a connection. A growing waiter count often indicates contention or inadequate database capacity.",
    abandonedConnections:
      "Connections held longer than a configured threshold. A long-held connection can be legitimate; abandonment thresholds require careful interpretation."
  },

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm the symptom and the affected scope",
      commands: [
        "systemctl status tomcat --no-pager -l",
        "journalctl -u tomcat --since '-30 minutes' --no-pager"
      ],
      inspect: [
        "Connection acquisition timeout messages",
        "HTTP 500/503 and request latency",
        "Affected application context and datasource",
        "Whether all instances fail or one instance is isolated",
        "Whether errors began immediately after a release or increased gradually"
      ],
      decision:
        "If Tomcat is down, troubleshoot service availability first. If Tomcat is running but requests cannot obtain connections, continue with pool and database diagnostics. If only one node is affected, compare it with a healthy peer."
    },
    {
      step: 2,
      title: "Identify the actual datasource and pool implementation",
      inspect: [
        "JNDI name referenced by the application",
        "Datasource definition and resource scope",
        "Pool implementation and version",
        "JDBC driver version",
        "Connection URL and database target, without exposing credentials",
        "Validation query or connection validation settings",
        "maxActive/maxTotal, maxIdle, maxWait, and timeout configuration",
        "Whether configuration is supplied by Tomcat, the application, or an external platform"
      ],
      commands: [
        "grep -R -n 'jdbc/' /path/to/tomcat/conf /path/to/application/META-INF 2>/dev/null",
        "grep -R -n -E 'maxActive|maxTotal|maxIdle|maxWait|removeAbandoned|validationQuery' /path/to/tomcat/conf 2>/dev/null"
      ],
      decision:
        "If the application references a JNDI name that is not defined in the effective runtime configuration, investigate lookup and deployment errors before diagnosing pool exhaustion.",
      caution:
        "Do not print or share unredacted resource configuration; it may contain credentials or sensitive connection details."
    },
    {
      step: 3,
      title: "Check pool metrics and their trend",
      metrics: [
        "Active connections",
        "Idle connections",
        "Maximum connections",
        "Connection acquisition wait time",
        "Connection acquisition timeout count",
        "Borrowed connection duration",
        "Pool waiter count",
        "Connection creation and validation failures",
        "Abandoned connection warnings, if supported"
      ],
      decision:
        "A steadily increasing active count with declining idle capacity across multiple observation windows is suspicious. Compare the trend against request rate, SQL latency, transaction duration, and database waits before declaring a leak.",
      notes: [
        "Use the supported JMX, metrics endpoint, pool instrumentation, or approved monitoring integration.",
        "Avoid enabling a public JMX endpoint or exposing unauthenticated management interfaces.",
        "Not every pool exposes the same metrics or names."
      ]
    },
    {
      step: 4,
      title: "Check database availability and connection limits",
      inspect: [
        "Database endpoint reachability and DNS resolution",
        "TLS handshake and certificate errors",
        "Database authentication failures",
        "Database-wide connection count and connection limit",
        "Connections by application, user, host, and state",
        "Database CPU, I/O, and resource pressure",
        "Connection storms from other applications"
      ],
      decision:
        "If the database is unreachable or rejecting connections, investigate the network, credentials, service health, and database capacity. A failed connection creation path can look similar to a pool leak.",
      databaseSpecificNote:
        "Use the database's approved monitoring queries and DBA runbooks. PostgreSQL, MySQL, Oracle, and SQL Server expose different session and lock diagnostics; do not run vendor-specific SQL without confirming the engine."
    },
    {
      step: 5,
      title: "Measure SQL latency and transaction duration",
      inspect: [
        "Long-running SQL statements",
        "Database lock waits and blocked sessions",
        "Transactions left open or idle in transaction",
        "Slow commits and rollbacks",
        "Connection pool wait time versus query execution time",
        "External network calls performed while a transaction remains open"
      ],
      decision:
        "If connections are legitimately busy with slow SQL or blocked transactions, resolve the database or application bottleneck. Increasing pool size can increase database contention rather than solve the problem.",
      caution:
        "Do not terminate sessions without identifying blockers, transaction consequences, and obtaining the required database approval."
    },
    {
      step: 6,
      title: "Inspect application connection lifecycle",
      inspect: [
        "Every DataSource.getConnection() call has a guaranteed close path",
        "Connections are closed in finally blocks or try-with-resources",
        "Statements and ResultSets are closed reliably",
        "Exceptions do not bypass cleanup",
        "Transaction rollback occurs when required",
        "Connection ownership is not shared incorrectly across threads",
        "Async callbacks do not outlive the transaction or request lifecycle",
        "Background jobs return connections after processing"
      ],
      codeExample: String.raw`try (Connection connection = dataSource.getConnection();
     PreparedStatement statement =
         connection.prepareStatement("SELECT status FROM orders WHERE id = ?")) {
    statement.setLong(1, orderId);

    try (ResultSet resultSet = statement.executeQuery()) {
        while (resultSet.next()) {
            // Process the result.
        }
    }
}`,
      explanation:
        "In JDBC, closing a pooled Connection normally returns it to the pool. try-with-resources ensures cleanup even when an exception occurs. Do not retain the Connection beyond the intended unit of work."
    },
    {
      step: 7,
      title: "Capture thread dumps during the failure",
      commands: [
        "jcmd <PID> Thread.print"
      ],
      inspect: [
        "Many threads waiting inside connection-pool borrow methods",
        "Threads blocked in JDBC driver calls",
        "Threads blocked on database locks or application locks",
        "Requests holding connections while waiting on remote HTTP calls",
        "Deadlocked application threads",
        "Long-running scheduled jobs or message consumers",
        "A rising number of threads with similar connection-acquisition stack traces"
      ],
      decision:
        "If threads are waiting to borrow connections, correlate those stacks with pool metrics and database activity. If threads hold connections while blocked elsewhere, investigate the operation occurring inside the connection's lifetime.",
      notes: [
        "Capture thread dumps through an approved diagnostic procedure.",
        "Take more than one dump at a controlled interval when needed to determine whether stacks are progressing.",
        "Treat dumps as sensitive operational evidence because they may contain SQL, identifiers, or application data."
      ]
    },
    {
      step: 8,
      title: "Enable pool leak diagnostics carefully",
      inspect: [
        "Whether the configured pool supports abandoned-connection detection",
        "Whether it can log the borrow stack trace",
        "The abandoned timeout relative to legitimate query and transaction duration",
        "Log volume and CPU overhead",
        "Whether the diagnostic option changes reclamation behavior or only reports suspects"
      ],
      decision:
        "Use the least disruptive supported diagnostic mode first. Compare suspected connection age with application traces and database sessions before enabling automatic reclamation.",
      caution:
        "An abandoned-connection threshold that is too short can reclaim a valid long-running connection and disrupt active work. Exact settings and behavior are pool-version dependent."
    },
    {
      step: 9,
      title: "Check JNDI naming, resource scope, and lifecycle",
      inspect: [
        "Application resource-ref name",
        "java:comp/env lookup path",
        "Tomcat Resource name and type",
        "Global resource and ResourceLink mappings, if used",
        "Resource factory class and driver visibility",
        "Credential source and configuration precedence",
        "Context reload and redeployment behavior"
      ],
      decision:
        "If JNDI lookup fails or returns a different datasource than expected, fix the resource mapping or classpath/configuration. Do not treat a naming error as a connection leak.",
      notes: [
        "A JNDI lookup failure usually appears as a naming or resource initialization error, whereas pool exhaustion usually occurs during connection acquisition.",
        "A datasource can initialize successfully but later fail because the database is unreachable or the pool is exhausted."
      ]
    },
    {
      step: 10,
      title: "Investigate redeployment and classloader leaks",
      inspect: [
        "Old application threads still running after undeploy",
        "Scheduled executors or timers not stopped",
        "JDBC drivers registered by the application but not deregistered where required",
        "Static caches retaining application classloaders",
        "Listeners that do not release resources",
        "Background tasks holding datasource references",
        "Repeated redeployments increasing memory or thread counts"
      ],
      commands: [
        "jcmd <PID> VM.classloader_stats",
        "jcmd <PID> Thread.print"
      ],
      decision:
        "If old application threads or classloaders remain after redeployment, identify the component that failed to stop and clean up. A datasource connection leak and a classloader leak can coexist but require different fixes.",
      caution:
        "Do not forcefully terminate arbitrary threads. Correct application lifecycle cleanup and use controlled redeployment or restart procedures."
    },
    {
      step: 11,
      title: "Check transaction management and asynchronous work",
      inspect: [
        "Transaction boundaries and commit/rollback behavior",
        "Framework-managed versus manually managed transactions",
        "Nested transaction configuration",
        "Async tasks launched before the current transaction completes",
        "Message consumers holding transactions while waiting",
        "Connection acquisition inside synchronized sections",
        "Remote service calls performed while a database transaction is open"
      ],
      decision:
        "If connections remain checked out during non-database work, shorten the transaction or restructure resource ownership. If a transaction is stuck, coordinate application and DBA recovery rather than forcibly closing arbitrary borrowed connections."
    },
    {
      step: 12,
      title: "Check pool configuration and capacity planning",
      inspect: [
        "Pool maximum and minimum idle values",
        "Acquisition wait timeout",
        "Connection validation behavior",
        "Idle eviction and lifetime settings where supported",
        "Maximum database connections available to the application",
        "Number of Tomcat replicas or instances",
        "Connections consumed by migrations, monitoring, batch jobs, and other applications"
      ],
      decision:
        "Calculate the aggregate connection budget before increasing the per-instance maximum. Pool limits across all replicas and other clients must remain below the database's safe capacity with operational headroom.",
      calculationExample: {
        formula:
          "Total possible application connections = instance count × pool maximum",
        example:
          "6 Tomcat instances × 30 connections = 180 possible application connections",
        warning:
          "This is only the application's theoretical pool total. Include other clients, administrative reserve, failover behavior, and database limits before choosing a safe maximum."
      }
    },
    {
      step: 13,
      title: "Correlate deployment, traffic, and database events",
      evidence: [
        "Application release ID and code changes",
        "Connection-pool configuration changes",
        "Request rate and concurrency",
        "Pool active/idle/waiter trends",
        "Slow-query and lock-wait timelines",
        "Database connection limit events",
        "Background job schedules",
        "Redeployment and JVM restart history"
      ],
      decision:
        "A confirmed root cause should explain the observed pool behavior and show why other explanations, such as slow queries or database unavailability, are less likely."
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Active connections steadily increase and do not return to idle",
      possibleCauses: [
        "Application connection leak",
        "Long-running transactions",
        "Slow SQL",
        "Blocked database sessions"
      ],
      evidence:
        "Pool trend, connection borrow stacks, transaction duration, database session states, and application traces",
      fix:
        "Close borrowed connections reliably or address the verified query/transaction bottleneck."
    },
    {
      symptom: "Active equals maximum and waiting threads increase",
      possibleCauses: [
        "Connection leak",
        "Traffic spike",
        "Slow database",
        "Pool too small for measured legitimate concurrency"
      ],
      evidence:
        "Active/idle/waiter metrics correlated with request rate and query duration",
      fix:
        "Resolve the actual bottleneck and size the pool against database capacity."
    },
    {
      symptom: "Connection creation fails across all instances",
      possibleCauses: [
        "Database outage",
        "Invalid credentials",
        "DNS or network failure",
        "TLS failure",
        "Database connection limit reached"
      ],
      evidence:
        "Connection creation errors, database health, DNS/TLS tests, and server-side connection metrics",
      fix:
        "Restore database connectivity or correct the verified authentication/capacity issue."
    },
    {
      symptom: "One instance has timeouts while peers remain healthy",
      possibleCauses: [
        "Instance-specific configuration drift",
        "Stuck application threads",
        "Different artifact or driver",
        "Node-specific network issue"
      ],
      evidence:
        "Configuration comparison, thread dumps, pool metrics, and connectivity tests",
      fix:
        "Correct the instance-specific fault and return it to service only after validation."
    },
    {
      symptom: "Timeouts start after a release",
      possibleCauses: [
        "Missing connection close path",
        "Longer transaction scope",
        "New query regression",
        "Background task retaining connections"
      ],
      evidence:
        "Release diff, pool trend, borrow stacks, and query latency comparison",
      fix:
        "Roll back or correct the offending code after verifying database and data compatibility."
    },
    {
      symptom: "Tomcat redeployments gradually increase threads or memory",
      possibleCauses: [
        "Unstopped application threads",
        "Classloader retention",
        "JDBC driver registration leak",
        "Listeners or static resources not cleaned up"
      ],
      evidence:
        "Thread dumps, classloader statistics, redeployment timeline, and JVM diagnostics",
      fix:
        "Correct application shutdown hooks and resource lifecycle cleanup."
    },
    {
      symptom: "JNDI lookup or datasource initialization fails",
      possibleCauses: [
        "Wrong resource name",
        "Missing driver",
        "Invalid resource factory",
        "Incorrect resource scope",
        "Malformed configuration"
      ],
      evidence:
        "Naming exceptions, effective Tomcat configuration, classpath, and startup logs",
      fix:
        "Correct the JNDI mapping or resource definition before investigating runtime exhaustion."
    },
    {
      symptom: "Pool is exhausted during peak traffic but recovers afterward",
      possibleCauses: [
        "Legitimate concurrency spike",
        "Slow queries",
        "Insufficient database capacity",
        "Pool configuration mismatch"
      ],
      evidence:
        "Traffic, request concurrency, query duration, and pool utilization during peak and normal periods",
      fix:
        "Optimize database work, apply admission control where appropriate, and size the pool using measured capacity."
    }
  ],

  safeRecoveryWorkflow: {
    phase1: {
      title: "Contain impact and capture evidence",
      actions: [
        "Pause risky releases or batch jobs if they correlate with the incident.",
        "Capture pool metrics, database session data, application logs, and thread dumps.",
        "Check whether all instances or only one are affected.",
        "Protect healthy serving capacity and follow the load-balancer drain procedure where needed.",
        "Avoid recycling the pool before capturing evidence unless immediate service recovery requires it."
      ]
    },
    phase2: {
      title: "Select the recovery based on the evidence",
      branches: [
        {
          condition: "Confirmed application connection leak",
          action:
            "Fix connection lifecycle management, deploy the reviewed correction, and validate that connections return to idle."
        },
        {
          condition: "Slow queries or blocked transactions",
          action:
            "Work with the database owner to resolve the query or blocker and shorten excessive transaction duration."
        },
        {
          condition: "Database unavailable or rejecting new connections",
          action:
            "Restore database/network/authentication health and verify connection creation before returning traffic."
        },
        {
          condition: "One instance is stuck or unhealthy",
          action:
            "Drain that instance if capacity permits, capture diagnostics, and perform an approved controlled restart only when justified."
        },
        {
          condition: "Incorrect JNDI resource mapping",
          action:
            "Correct the authoritative datasource configuration, validate it in staging, and perform a controlled deployment or reload."
        },
        {
          condition: "Pool maximum is too high for database capacity",
          action:
            "Reduce or rebalance connection budgets and tune query/concurrency behavior rather than increasing the limit."
        }
      ]
    },
    phase3: {
      title: "Perform controlled recovery",
      actions: [
        "Deploy the verified fix or restore the known-good configuration.",
        "If a restart is necessary, restart one affected instance at a time when architecture permits.",
        "Confirm the old process has released its resources.",
        "Verify successful JNDI lookup and a test connection through the application's approved health mechanism.",
        "Confirm that active connections stabilize and idle capacity recovers.",
        "Restore traffic gradually after application and database health checks pass."
      ]
    },
    phase4: {
      title: "Validate service restoration",
      checks: [
        "Connection acquisition timeouts return to baseline.",
        "Pool active, idle, and waiter metrics behave normally under traffic.",
        "Database connection count remains within the agreed budget.",
        "HTTP 5xx rate and latency recover.",
        "No long-running or abandoned transaction remains unexplained.",
        "Application requests complete successfully.",
        "Connections return to the pool after both successful and failed requests.",
        "Background jobs and message consumers behave normally.",
        "No old application threads or classloader leaks appear after redeployment.",
        "Monitoring alerts clear and incident evidence is retained."
      ]
    }
  },

  safeJndiExample: {
    description:
      "Illustrative Tomcat JDBC datasource example. Confirm the installed Tomcat version, pool implementation, resource scope, database limits, and security requirements before adopting settings.",
    xml: String.raw`<Resource
    name="jdbc/AppDB"
    auth="Container"
    type="javax.sql.DataSource"
    factory="org.apache.tomcat.jdbc.pool.DataSourceFactory"
    driverClassName="com.example.jdbc.Driver"
    url="jdbc:vendor://db-host:1234/appdb"
    username="app_user"
    password="REPLACE_WITH_SECURE_SECRET_REFERENCE"
    maxActive="30"
    maxIdle="10"
    maxWait="5000"
    testOnBorrow="true"
    validationQuery="SELECT 1" />`,
    notes: [
      "This is a template, not a universal production configuration.",
      "Replace the driver, URL, validation query, and credentials with values for the actual database and environment.",
      "Do not commit real passwords into source control. Use an approved secret-management mechanism supported by the deployment architecture.",
      "Tomcat JDBC Pool attributes differ from Apache Commons DBCP and other pools. Verify property names against the exact installed version.",
      "A validation query must be supported by the target database and should be inexpensive.",
      "maxActive and maxWait values are examples only; derive limits from concurrency measurements and the database connection budget.",
      "For Jakarta-based applications, verify the expected API namespace and Tomcat version compatibility."
    ]
  },

  codeReviewChecklist: [
    "Every successful DataSource.getConnection() has a guaranteed close path",
    "try-with-resources is used where suitable",
    "Statements and ResultSets are closed",
    "Exception paths do not skip cleanup",
    "Transactions commit or roll back correctly",
    "Connections are not stored in static fields or shared between request threads",
    "No network call or long wait unnecessarily holds a database transaction",
    "Async work owns and closes its own resources",
    "Background executors stop during application shutdown",
    "Application-managed JDBC drivers and listeners are cleaned up appropriately",
    "Pool settings are version-correct and documented",
    "Secrets are not hardcoded in configuration"
  ],

  prevention: {
    application: [
      "Use try-with-resources for JDBC resource management.",
      "Keep transaction boundaries short and explicit.",
      "Do not hold connections while waiting for unrelated remote services.",
      "Use bounded retries with backoff for transient dependency failures.",
      "Review connection lifecycle changes during code review.",
      "Add integration tests for exception paths and rollback behavior.",
      "Ensure application threads, schedulers, and listeners stop during undeploy."
    ],
    poolAndDatabase: [
      "Set pool maximum based on the aggregate database connection budget.",
      "Configure connection acquisition timeout and validation based on workload.",
      "Monitor active, idle, waiting, abandoned, and failed connection metrics where supported.",
      "Monitor slow queries, lock waits, open transactions, and database connection utilization.",
      "Review connection leak diagnostics in staging before enabling them in production.",
      "Avoid automatic reclamation thresholds shorter than valid query or transaction duration.",
      "Document the owner and operational limits of each datasource."
    ],
    monitoring: [
      "Connection acquisition timeout rate",
      "Active and idle connection trends",
      "Pool waiters and borrow latency",
      "Borrowed connection duration",
      "Database connection usage and remaining headroom",
      "Slow-query latency and lock waits",
      "Application request latency and HTTP 5xx rate",
      "Tomcat thread count and JVM health",
      "Redeployment-related thread and classloader growth",
      "Database connectivity and authentication failures"
    ],
    ciAndRelease: [
      "Run static analysis and tests for JDBC resource lifecycle.",
      "Test exception paths and transaction rollback.",
      "Verify JNDI names and datasource configuration per environment.",
      "Compare effective Java, Tomcat, JDBC driver, and pool versions.",
      "Load-test connection usage at expected peak concurrency.",
      "Test behavior during database latency and temporary outages.",
      "Require approval for production pool-limit changes.",
      "Include rollback and post-deployment pool validation in the release runbook."
    ]
  },

  incidentReportTemplate: {
    incidentId: "",
    severity: "",
    environment: "",
    application: "",
    tomcatInstances: [],
    jndiResourceName: "",
    poolImplementationAndVersion: "",
    databaseEngine: "",
    incidentStartTime: "",
    detectionTime: "",
    mitigationTime: "",
    recoveryTime: "",
    customerImpact: "",
    activeConnectionsAtPeak: "",
    idleConnectionsAtPeak: "",
    poolMaximum: "",
    waiterCountAtPeak: "",
    databaseConnectionUsage: "",
    firstObservedException: "",
    slowQueryOrLockEvidence: "",
    releaseId: "",
    rootCause: "",
    contributingFactors: [],
    evidenceLinks: [],
    containmentActions: [],
    recoveryActions: [],
    validationResults: [],
    preventionActions: [],
    actionOwners: [],
    followUpDeadline: ""
  },

  handsOnLabs: [
    {
      title: "Lab 1 - Reproduce a connection leak",
      tasks: [
        "Use a disposable application and test database.",
        "Create a controlled code path that borrows a connection without closing it.",
        "Observe active and idle pool metrics across repeated requests.",
        "Capture pool diagnostics and the relevant application stack.",
        "Fix the code with try-with-resources and confirm the pool recovers."
      ]
    },
    {
      title: "Lab 2 - Distinguish a leak from slow SQL",
      tasks: [
        "Run a controlled long-running query in a test environment.",
        "Observe active connections, waiters, and query duration.",
        "Compare the results with a deliberate connection leak.",
        "Document which metrics distinguish the two conditions."
      ]
    },
    {
      title: "Lab 3 - Validate JNDI configuration",
      tasks: [
        "Configure a test datasource with a known JNDI name.",
        "Change the name in the test application's resource reference.",
        "Capture the resulting naming exception.",
        "Restore the correct mapping and verify successful lookup.",
        "Document how naming failures differ from pool exhaustion."
      ]
    },
    {
      title: "Lab 4 - Calculate a safe connection budget",
      tasks: [
        "Choose a test instance count and per-instance pool maximum.",
        "Calculate the theoretical total connection capacity.",
        "Include other applications and database administrative reserve.",
        "Propose a limit with headroom and validate it using a load test."
      ]
    },
    {
      title: "Lab 5 - Diagnose a redeployment leak",
      tasks: [
        "Use a disposable Tomcat environment.",
        "Deploy a test application that creates a background thread.",
        "Observe thread behavior during undeploy and redeploy.",
        "Implement a lifecycle cleanup hook.",
        "Verify that old threads stop and resources are released."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What is a JDBC connection leak?",
      answer:
        "A connection leak occurs when borrowed database connections are not reliably returned to the pool after use, gradually reducing available capacity."
    },
    {
      question: "Does pool exhaustion always mean there is a leak?",
      answer:
        "No. High legitimate concurrency, slow queries, blocked transactions, database connection limits, or failed connection creation can also exhaust a pool."
    },
    {
      question: "Why use try-with-resources?",
      answer:
        "It closes JDBC resources reliably even when exceptions occur. For pooled connections, close normally returns the logical connection to the pool."
    },
    {
      question: "What is JNDI in Tomcat?",
      answer:
        "JNDI provides a naming mechanism through which applications look up configured resources, such as a datasource exposed under java:comp/env."
    },
    {
      question: "What is the difference between active and idle connections?",
      answer:
        "Active connections are currently borrowed from the pool. Idle connections are available for reuse. The exact metric semantics should be verified for the pool implementation."
    },
    {
      question: "How can you prove a connection leak?",
      answer:
        "Correlate a sustained increase in active connections and falling idle capacity with request load, pool waiters, borrow diagnostics, application lifecycle evidence, and database session information."
    },
    {
      question: "Why is increasing maxActive not always the right fix?",
      answer:
        "It can exceed database capacity, increase contention, and worsen latency. Calculate the aggregate connection budget and address slow queries or leaks first."
    },
    {
      question: "What is abandoned-connection detection?",
      answer:
        "It identifies connections held longer than a configured threshold, and some pool implementations can log or reclaim them. Long duration alone does not prove a leak."
    },
    {
      question: "How do slow queries create pool exhaustion?",
      answer:
        "Queries retain borrowed connections longer, so fewer connections become available to new requests even if every connection is eventually closed."
    },
    {
      question: "How do you troubleshoot a JNDI lookup failure?",
      answer:
        "Check the application's resource reference, effective Tomcat Resource definition, resource scope, factory, driver visibility, and startup exception."
    },
    {
      question: "What should you check before restarting Tomcat?",
      answer:
        "Capture pool metrics, database sessions, thread dumps, logs, affected instance scope, and service capacity. Confirm restart approval and consider active transactions."
    },
    {
      question: "How do you prevent datasource leaks during redeployment?",
      answer:
        "Close connections reliably, stop application-owned executors and threads, clean up listeners and driver registrations where required, and test repeated deployment cycles."
    }
  ],

  completionChecklist: [
    "Correct application, environment, and JNDI datasource confirmed",
    "Severity and customer impact documented",
    "Pool implementation and version identified",
    "Active, idle, waiter, and timeout trends captured",
    "Database health and connection limits checked",
    "Slow queries and lock waits investigated",
    "Application connection lifecycle reviewed",
    "Thread dumps captured when appropriate",
    "JNDI mapping and resource scope verified",
    "Redeployment and background-thread lifecycle checked",
    "Aggregate database connection budget calculated",
    "Root cause supported by evidence",
    "Recovery performed with appropriate approval",
    "Connection pool and application health validated",
    "Monitoring and prevention actions assigned",
    "Incident report completed"
  ],

  officialReferences: [
    {
      title: "Apache Tomcat JNDI Datasource HOW-TO",
      url: "https://tomcat.apache.org/tomcat-10.1-doc/jndi-datasource-examples-howto.html"
    },
    {
      title: "Apache Tomcat JNDI Resources",
      url: "https://tomcat.apache.org/tomcat-10.1-doc/jndi-resources-howto.html"
    },
    {
      title: "Apache Tomcat JDBC Connection Pool",
      url: "https://tomcat.apache.org/tomcat-10.1-doc/jdbc-pool.html"
    },
    {
      title: "Java JDBC Basics - Using Transactions",
      url: "https://docs.oracle.com/javase/tutorial/jdbc/basics/transactions.html"
    },
    {
      title: "Java JDBC Basics - Using Prepared Statements",
      url: "https://docs.oracle.com/javase/tutorial/jdbc/basics/prepared.html"
    },
    {
      title: "Java Troubleshooting Guide",
      url: "https://docs.oracle.com/en/java/javase/21/troubleshoot/"
    },
    {
      title: "Apache Commons DBCP Documentation",
      url: "https://commons.apache.org/proper/commons-dbcp/"
    }
  ]
} as const;

export default jndiConnectionLeakGuide;
