
export const threadPoolExhaustionGuide = {
  title: "Tomcat Thread Pool Exhaustion - Production Troubleshooting",
  filePath: "app/troubleshooting-center/tomcat/ThreadPollExhaustion.ts",
  technology: [
    "Apache Tomcat",
    "Java JVM",
    "HTTP Connectors",
    "JDBC Connection Pools",
    "Linux",
    "Windows",
    "Docker",
    "Kubernetes"
  ],
  version: "1.0.0",

  objective: [
    "Diagnose Tomcat request-thread saturation using connector metrics and thread dumps.",
    "Distinguish traffic overload from slow dependencies, deadlocks, blocking I/O, and application defects.",
    "Correlate Tomcat threads with JDBC pools, HTTP clients, queues, CPU, memory, and downstream latency.",
    "Recover safely without causing a restart storm or overwhelming dependencies.",
    "Prevent recurrence through bounded concurrency, backpressure, observability, and load testing."
  ],

  incidentScenario: {
    title: "Production APIs become slow although Tomcat is running",
    timeline: [
      "14:00 - Normal traffic and request latency.",
      "14:08 - Database query latency starts increasing.",
      "14:10 - Tomcat currentThreadsBusy approaches maxThreads.",
      "14:12 - Incoming requests begin waiting; p95 and p99 latency rise.",
      "14:15 - Load balancer health checks time out and HTTP 5xx responses increase.",
      "14:18 - Thread dumps show many request threads waiting for JDBC connections or blocked in downstream calls.",
      "14:25 - The team applies an approved mitigation to reduce pressure on the dependency.",
      "14:40 - Request latency and thread utilization recover after the dependency and backlog stabilize."
    ],
    possibleCauses: [
      "Slow SQL queries or database locks hold request threads.",
      "JDBC connections are exhausted or leaked.",
      "A downstream HTTP API is slow or unavailable.",
      "A traffic spike exceeds the service's tested concurrency.",
      "An application lock or synchronized section serializes requests.",
      "A deadlock or lock convoy blocks progress.",
      "An unbounded task queue causes excessive waiting and memory retention.",
      "A connection timeout is too long, causing threads to wait unnecessarily.",
      "Large uploads, downloads, or streaming responses occupy workers for long periods.",
      "Retries amplify traffic to an unhealthy dependency.",
      "CPU saturation or long garbage-collection pauses delay request processing.",
      "Thread-pool settings are inconsistent with actual host/container capacity."
    ]
  },

  impactAndSeverity: {
    severityGuide: [
      {
        severity: "SEV-1",
        criteria: "Critical customer journeys unavailable, most replicas saturated, or sustained production outage.",
        action: "Activate incident command, protect remaining capacity, and mitigate the dominant bottleneck."
      },
      {
        severity: "SEV-2",
        criteria: "High latency, repeated timeouts, elevated 5xx responses, or one or more saturated replicas.",
        action: "Correlate thread, dependency, and traffic metrics while reducing pressure safely."
      },
      {
        severity: "SEV-3",
        criteria: "Intermittent saturation with limited customer impact and adequate spare capacity.",
        action: "Investigate the trend, capture evidence, and correct the bottleneck before peak traffic."
      }
    ],
    assess: [
      "Which endpoints, tenants, regions, and applications are affected?",
      "Are all Tomcat instances saturated or only one?",
      "What are request rate, p95/p99 latency, timeout rate, and HTTP 5xx rate?",
      "Are requests queued at the load balancer, connector, executor, or application layer?",
      "Is the database or another downstream service unhealthy?",
      "Did a deployment, traffic change, batch job, or configuration change precede the incident?",
      "Are retries increasing traffic or duplicating operations?",
      "Can healthy replicas safely absorb traffic from an affected instance?"
    ]
  },

  safetyChecks: [
    "Confirm the correct environment, host, pod, service, Tomcat instance, and JVM PID.",
    "Check production change approval and the incident response procedure.",
    "Capture connector metrics, logs, and at least one useful thread dump before restarting when safe.",
    "Do not increase maxThreads blindly; more concurrent requests can overwhelm the database or downstream APIs.",
    "Do not terminate arbitrary Java threads or kill a process without identifying its owner.",
    "Do not restart every replica simultaneously.",
    "Check spare capacity before draining or removing an instance.",
    "Check heap, CPU, file descriptors, process limits, and container memory before changing concurrency.",
    "Protect thread dumps because stack traces may expose SQL, URLs, internal hostnames, or sensitive application data.",
    "Do not disable authentication, TLS, health checks, or security controls to reduce symptoms."
  ],

  evidenceCollection: {
    metrics: [
      "Tomcat currentThreadsBusy, currentThreadCount, and maxThreads.",
      "Connector request count, processing time, connection count, and errors where available.",
      "HTTP request rate, active requests, p95/p99 latency, timeout rate, and HTTP 5xx.",
      "JDBC active, idle, maximum, waiting, acquisition latency, and timeout metrics.",
      "Downstream HTTP client active requests, pending requests, timeouts, and latency.",
      "CPU usage, load average, heap, GC pauses, process RSS, and thread count.",
      "Queue depth, task age, executor rejections, and retry rate.",
      "Database query latency, locks, active sessions, and connection utilization.",
      "Load balancer target health, connection errors, and request distribution."
    ],
    logs: [
      "Tomcat catalina logs and application logs.",
      "Access logs with timestamps, status, request duration, and safe request identifiers.",
      "JDBC pool warnings and connection-acquisition timeout messages.",
      "Downstream timeout, DNS, TLS, and connection-reset errors.",
      "GC logs and JVM warnings.",
      "Deployment pipeline logs, configuration changes, and release identifiers.",
      "Load balancer, ingress, reverse proxy, and Kubernetes events."
    ],
    timelineCorrelation: [
      "Mark the first latency increase, first saturation alert, first timeout, and first 5xx response.",
      "Overlay deployments, traffic surges, scheduled jobs, database changes, and downstream incidents.",
      "Compare healthy and unhealthy instances running the same release.",
      "Compare busy-thread count with database waits and downstream latency.",
      "Record each mitigation and the resulting metric changes."
    ]
  },

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm saturation and blast radius",
      actions: [
        "Check whether the application is running and whether requests are failing or only slow.",
        "Inspect currentThreadsBusy against maxThreads over time.",
        "Compare traffic, latency, and error rates across replicas.",
        "Check whether the connector is using its own executor or a shared executor."
      ],
      decisions: [
        "Busy threads near the configured maximum for a sustained period indicate possible saturation, but do not identify the cause.",
        "One saturated replica may indicate uneven traffic, a stuck request, or instance-specific degradation.",
        "All replicas saturated together may indicate traffic overload or a shared downstream bottleneck.",
        "If Tomcat is not saturated but requests fail, inspect other bottlenecks such as connector acceptance, application queues, CPU, or downstream failures."
      ]
    },
    {
      step: 2,
      title: "Inspect effective Tomcat connector configuration",
      commands: [
        "ps -eo pid,ppid,user,args | grep '[o]rg.apache.catalina.startup.Bootstrap'",
        "systemctl status <tomcat-service>",
        "systemctl cat <tomcat-service>",
        "grep -n -E 'Connector|Executor|maxThreads|acceptCount|connectionTimeout' <CATALINA_BASE>/conf/server.xml"
      ],
      actions: [
        "Identify the active CATALINA_BASE and actual server.xml.",
        "Check connector protocol, port, executor name, and configured thread limits.",
        "Inspect environment variables and startup scripts for configuration overrides.",
        "Verify the configuration against the exact Tomcat version.",
        "Check whether a shared executor is configured; connector-level maxThreads may not be the controlling limit in that setup."
      ],
      decisions: [
        "If an executor is shared, inspect that executor's configuration and metrics.",
        "If actual settings differ from the expected configuration, trace the deployment or environment override.",
        "If settings are correct, continue to runtime metrics and thread dumps."
      ]
    },
    {
      step: 3,
      title: "Inspect live JVM thread behavior",
      commands: [
        "jcmd <PID> Thread.print",
        "jcmd <PID> VM.version",
        "jcmd <PID> VM.command_line",
        "ps -p <PID> -o pid,ppid,%cpu,%mem,rss,nlwp,etime,args"
      ],
      actions: [
        "Capture a thread dump while the incident is occurring, if the JVM is responsive.",
        "Take a small number of timestamped dumps separated by an appropriate interval when necessary.",
        "Compare stack traces across dumps to see which operations remain blocked.",
        "Classify request threads as running, waiting, blocked, parked, or waiting on I/O.",
        "Identify repeated stack traces and the application methods where workers spend time."
      ],
      decisions: [
        "Many threads waiting for JDBC acquisition: inspect the pool and database.",
        "Many threads blocked on the same Java monitor: investigate lock contention.",
        "Many threads waiting on HTTP client calls: inspect downstream latency and client pool limits.",
        "Many threads doing CPU-heavy work: profile CPU and application hot paths.",
        "Many threads waiting for the same queue or future: inspect producer/consumer progress and task ownership."
      ],
      cautions: [
        "Thread states alone do not prove a root cause; correlate stacks with metrics and repeated samples.",
        "A thread dump can contain sensitive operational details.",
        "Do not repeatedly collect expensive diagnostics during severe instability."
      ]
    },
    {
      step: 4,
      title: "Correlate JDBC connection pool pressure",
      actions: [
        "Inspect active, idle, maximum, waiting-thread, and acquisition-time metrics.",
        "Check whether requests hold a connection while making remote calls or doing long computation.",
        "Inspect slow SQL, locks, long transactions, and database connection limits.",
        "Check for connection leaks and unclosed statements or result sets.",
        "Correlate pool wait duration with Tomcat request-thread saturation."
      ],
      decisions: [
        "Tomcat busy threads high and JDBC waiters high: database or pool pressure is a leading hypothesis.",
        "Pool fully active with long-running SQL: investigate query plans, locks, and database health.",
        "Pool active count low but acquisition time high: inspect pool configuration, validation, network, and metrics semantics.",
        "Do not increase JDBC maxActive/maxTotal/maxPoolSize without checking the database's safe connection capacity."
      ]
    },
    {
      step: 5,
      title: "Inspect downstream HTTP clients and network waits",
      actions: [
        "Review client connection-pool metrics and pending acquisitions.",
        "Check DNS resolution, TLS handshake, socket connect, response, and read timeouts separately.",
        "Inspect retry policies, retry volume, circuit-breaker state, and downstream rate limits.",
        "Compare downstream latency with request-thread stack traces.",
        "Check whether connections are returned to the client pool and response bodies are consumed or closed correctly."
      ],
      decisions: [
        "Threads waiting for a connection from the HTTP client pool: inspect client pool capacity and resource release.",
        "Threads blocked on slow response reads: investigate the dependency and read timeout.",
        "Retry volume rises with latency: reduce retry amplification using the approved policy.",
        "Connection failures with low downstream latency: investigate DNS, TLS, routing, and connection establishment."
      ]
    },
    {
      step: 6,
      title: "Check CPU, GC, memory, and operating system",
      commands: [
        "top -H -p <PID>",
        "ps -L -p <PID> -o pid,tid,pcpu,stat,comm",
        "free -h",
        "vmstat 1 10",
        "cat /proc/<PID>/limits",
        "cat /proc/<PID>/status"
      ],
      actions: [
        "Check CPU saturation and per-thread CPU usage.",
        "Review GC logs for long pauses or frequent collection.",
        "Check heap occupancy, RSS, native memory, and container limits.",
        "Inspect process limits and file-descriptor pressure.",
        "Check whether the host is under memory pressure or CPU throttling."
      ],
      decisions: [
        "CPU saturated and threads runnable: profile hot paths and reduce expensive work safely.",
        "Long GC pauses coincide with latency: investigate memory pressure and allocation patterns.",
        "CPU is low but many request threads wait: focus on I/O, locks, pools, and dependencies.",
        "Host or container throttling is severe: address resource constraints and workload before increasing thread count."
      ]
    },
    {
      step: 7,
      title: "Inspect connector queues and request backlog",
      actions: [
        "Review request arrival rate, processing duration, connection count, and queued work.",
        "Check reverse proxy and load balancer queues or pending requests.",
        "Inspect Tomcat acceptCount and connection limits in the context of the deployed version.",
        "Check whether slow requests occupy workers while incoming traffic continues to increase.",
        "Look for retry storms, traffic bursts, and unbounded application queues."
      ],
      decisions: [
        "Traffic exceeds sustainable throughput: apply approved rate limits, load shedding, or scaling.",
        "Long request duration is the dominant factor: fix the slow dependency or application path.",
        "Backlog grows despite low request rate: inspect stuck threads, lock contention, and internal task queues.",
        "Increasing acceptCount only delays rejection when the service cannot process requests quickly enough."
      ]
    },
    {
      step: 8,
      title: "Isolate the root cause",
      actions: [
        "Build a timeline from thread dumps, request latency, pool metrics, GC, and dependency telemetry.",
        "Identify the dominant waiting or running stack patterns.",
        "Compare the affected release with a healthy release or instance.",
        "Reproduce the suspected bottleneck in staging or a controlled load test.",
        "Change one relevant variable at a time and measure the result."
      ],
      decisions: [
        "Database waits dominate: focus on SQL, locks, transactions, and pool sizing.",
        "Downstream calls dominate: focus on dependency health, timeouts, retries, and concurrency limits.",
        "Lock contention dominates: inspect synchronization design and critical sections.",
        "Traffic dominates: use capacity analysis, rate limits, and controlled scaling.",
        "No single pattern dominates: collect additional time-aligned evidence before changing production settings."
      ]
    },
    {
      step: 9,
      title: "Recover and validate",
      actions: [
        "Select the lowest-risk mitigation supported by evidence.",
        "Reduce pressure on the actual bottleneck before increasing concurrency.",
        "Drain or replace an affected instance only when capacity and incident procedures permit.",
        "Monitor thread utilization, latency, error rate, dependency health, and backlog during recovery.",
        "Keep observing after traffic returns; temporary improvement after restart is not root-cause proof."
      ],
      decisions: [
        "Confirmed bad release: use the approved rollback after checking database/schema compatibility.",
        "Confirmed dependency degradation: reduce retries and expensive work, and restore dependency health.",
        "Confirmed traffic surge: use controlled load shedding or scaling with downstream capacity checks.",
        "Confirmed stuck instance: preserve evidence, drain it, and restart through its service manager if approved."
      ]
    }
  ],

  jmxAndMetrics: {
    title: "Tomcat JMX metrics to inspect",
    metrics: [
      {
        metric: "currentThreadsBusy",
        meaning: "Number of request-processing threads currently busy, where exposed by the connector MBean.",
        interpretation: "Compare over time with configured maximum and request latency."
      },
      {
        metric: "currentThreadCount",
        meaning: "Current connector thread count.",
        interpretation: "Shows thread allocation, not necessarily the number of active requests."
      },
      {
        metric: "maxThreads",
        meaning: "Configured maximum connector thread count or relevant executor limit.",
        interpretation: "Confirm the effective setting and whether a shared executor is in use."
      },
      {
        metric: "connectionCount",
        meaning: "Connector connection count where exposed.",
        interpretation: "Connections are not equivalent to active request threads, particularly with asynchronous or non-blocking I/O."
      },
      {
        metric: "requestCount",
        meaning: "Cumulative requests handled by the relevant request processor.",
        interpretation: "Use rate or deltas over time rather than treating a cumulative counter as current load."
      },
      {
        metric: "processingTime",
        meaning: "Cumulative processing time where exposed.",
        interpretation: "Use changes over time and pair with latency histograms."
      }
    ],
    collectionGuidance: [
      "Use the JMX exporter or the organization's approved metrics agent.",
      "Metric names and MBean attributes vary by Tomcat version, connector, and exporter.",
      "Do not assume every listed attribute is exported in every installation.",
      "Secure JMX endpoints; do not expose management interfaces publicly.",
      "Avoid enabling unauthenticated remote JMX in production."
    ]
  },

  rootCauseMatrix: [
    {
      symptom: "Busy threads near maxThreads; JDBC waiters increase",
      likelyCause: "Database slowdown or JDBC pool exhaustion",
      confirmWith: "Thread dumps, pool metrics, SQL latency, database lock and session data",
      fix: "Resolve query/lock issue and right-size pool based on database capacity"
    },
    {
      symptom: "Busy threads near maxThreads; HTTP client pending requests rise",
      likelyCause: "Downstream API slowness or client connection-pool exhaustion",
      confirmWith: "Client pool metrics, thread stacks, timeout and dependency latency",
      fix: "Restore dependency health, bound concurrency, correct client lifecycle"
    },
    {
      symptom: "Many threads blocked on the same monitor",
      likelyCause: "Lock contention or deadlock",
      confirmWith: "Repeated thread dumps, lock owner, JVM deadlock information",
      fix: "Reduce critical sections or correct lock ordering and synchronization"
    },
    {
      symptom: "CPU is saturated and threads are runnable",
      likelyCause: "CPU-heavy code, excessive serialization, compression, or expensive computation",
      confirmWith: "CPU profile, per-thread CPU, request traces",
      fix: "Optimize hot path and limit expensive concurrent work"
    },
    {
      symptom: "Latency rises with long GC pauses",
      likelyCause: "Memory pressure or allocation-heavy workload",
      confirmWith: "GC logs, heap metrics, allocation profile, post-GC live heap",
      fix: "Address allocation/retention and validate memory sizing"
    },
    {
      symptom: "Threads are busy streaming large requests or responses",
      likelyCause: "Slow clients, large payloads, or long-lived transfers",
      confirmWith: "Access logs, response duration, request sizes, connector metrics",
      fix: "Bound payloads, use appropriate streaming design, and manage slow clients"
    },
    {
      symptom: "Queue depth and retries grow continuously",
      likelyCause: "Unbounded backlog or retry amplification",
      confirmWith: "Queue age, retry rate, downstream latency, executor statistics",
      fix: "Apply backpressure, bounded queues, retry budgets, and load shedding"
    },
    {
      symptom: "Only one replica is saturated",
      likelyCause: "Uneven traffic, instance-specific stuck requests, or local resource degradation",
      confirmWith: "Per-replica request rate, thread dumps, CPU, dependency metrics",
      fix: "Drain or replace the affected instance if justified, then correct the imbalance"
    }
  ],

  safeRecovery: {
    principles: [
      "Recover the bottleneck before blindly increasing concurrency.",
      "Preserve enough evidence to distinguish a temporary restart benefit from a permanent fix.",
      "Use approved service managers and orchestration controls.",
      "Maintain adequate capacity on remaining replicas before draining one."
    ],
    options: [
      {
        situation: "Database or downstream dependency is unhealthy",
        actions: [
          "Coordinate with the dependency owner.",
          "Use approved timeouts, circuit breakers, and retry controls.",
          "Pause or limit noncritical work where safe.",
          "Check queue growth and avoid retry storms.",
          "Restore normal traffic gradually after dependency recovery."
        ]
      },
      {
        situation: "Traffic exceeds sustainable capacity",
        actions: [
          "Apply approved rate limits or shed noncritical requests.",
          "Scale out only if the downstream system and cluster have sufficient capacity.",
          "Check whether a rolling deployment or node shortage reduces available replicas.",
          "Monitor latency and error rates during gradual recovery."
        ]
      },
      {
        situation: "One instance is stuck",
        actions: [
          "Capture a thread dump and key metrics if safe.",
          "Remove the instance from new traffic using the approved drain process.",
          "Wait for graceful request completion where practical.",
          "Restart or replace it through the owning service manager.",
          "Verify the new instance under representative traffic."
        ]
      },
      {
        situation: "Thread pool configuration is genuinely too small",
        actions: [
          "Establish the real bottleneck and measure sustainable throughput first.",
          "Estimate the additional database, downstream, CPU, and memory concurrency.",
          "Test a controlled configuration change in staging or a canary.",
          "Roll out gradually and compare throughput, latency, pool waits, and error rates.",
          "Keep a rollback plan for the previous configuration."
        ]
      }
    ],
    cautions: [
      "Increasing maxThreads can increase simultaneous database queries and make database overload worse.",
      "Increasing acceptCount can increase waiting time and memory pressure without increasing throughput.",
      "Restarting every replica at once can turn partial degradation into a full outage.",
      "Do not treat a rising currentThreadsBusy metric alone as proof of a leak.",
      "Do not use Thread.stop or other unsafe thread termination techniques."
    ]
  },

  configurationAndCapacity: {
    capacityPrinciples: [
      "Thread-pool sizing should be based on measured workload and dependency capacity.",
      "A blocked request occupies a worker even when it uses little CPU.",
      "A larger thread pool does not fix slow SQL, deadlocks, or unbounded queues.",
      "Container CPU limits, memory limits, thread stacks, and file descriptors constrain concurrency.",
      "Keep separate limits for inbound requests and outbound dependency calls where appropriate."
    ],
    questions: [
      "What throughput can one replica sustain while meeting latency objectives?",
      "How long does a typical request hold a worker under normal and degraded conditions?",
      "What percentage of requests wait for JDBC or downstream HTTP resources?",
      "Can the database handle the concurrency implied by the proposed thread limit?",
      "Does the service have enough CPU and memory for the additional threads?",
      "What happens when a downstream dependency becomes 5x slower?",
      "Are queues bounded, and what happens when they fill?",
      "Can a single replica handle failover traffic from another replica?"
    ],
    configurationNotes: [
      "Connector and executor settings vary across Tomcat versions and deployment modes.",
      "For an Executor-backed connector, inspect the configured executor and connector reference together.",
      "acceptCount is not a universal application queue limit; behavior depends on connector and operating-system backlog semantics.",
      "Connection limits and thread limits control different resources.",
      "Do not copy thread-pool values from a different service without load testing."
    ]
  },

  kubernetesAndContainerChecks: {
    commands: [
      "kubectl get pods -n <namespace> -o wide",
      "kubectl describe pod <pod> -n <namespace>",
      "kubectl logs <pod> -n <namespace> --since=30m",
      "kubectl top pod <pod> -n <namespace> --containers",
      "kubectl get events -n <namespace> --sort-by=.lastTimestamp"
    ],
    checks: [
      "Compare thread saturation and latency across replicas.",
      "Check CPU requests/limits and CPU throttling metrics.",
      "Check memory limits, OOMKilled events, and restart counts.",
      "Inspect readiness and liveness probe failures.",
      "Check HPA metrics and whether scaling is constrained by quotas or node capacity.",
      "Check ingress or service mesh connection pools, retries, and timeouts.",
      "Confirm that scaling out will not overwhelm the shared database or downstream API."
    ],
    decisions: [
      "CPU throttling plus runnable threads may require workload or resource-limit analysis.",
      "Scaling may help traffic overload but can worsen a shared database bottleneck.",
      "Probe failures may be a symptom of worker starvation; changing probes alone does not fix the cause.",
      "Use historical metrics; kubectl top is only a point-in-time view."
    ]
  },

  prevention: {
    application: [
      "Use bounded executors and queues with explicit rejection/backpressure behavior.",
      "Set finite connect, read, request, and connection-acquisition timeouts appropriate to the operation.",
      "Avoid holding database connections or Java locks during unrelated remote calls.",
      "Close response bodies, statements, result sets, and other resources correctly.",
      "Use safe retry budgets and exponential backoff with jitter where appropriate.",
      "Avoid unbounded synchronous work in request threads.",
      "Profile hot paths and minimize expensive serialization or transformation.",
      "Test slow downstream dependencies and database lock contention."
    ],
    operations: [
      "Alert on sustained busy-thread saturation combined with latency and error increases.",
      "Track JDBC waiters, HTTP client pending requests, queue depth, and downstream latency.",
      "Use per-replica dashboards to identify imbalances.",
      "Keep thread dumps and GC logs available through approved secure diagnostics.",
      "Test graceful shutdown, connection draining, and rolling deployments.",
      "Run load tests and soak tests using realistic concurrency and dependency latency.",
      "Document a safe mitigation and rollback runbook."
    ]
  },

  postRecoveryValidation: [
    "Tomcat instances are healthy and serving requests.",
    "currentThreadsBusy returns to a sustainable range.",
    "Request latency, timeout rate, and HTTP 5xx return to acceptable levels.",
    "JDBC and downstream pool waiters decrease.",
    "Queue depth and age stop increasing and return toward normal.",
    "CPU, GC, memory, and thread count remain stable.",
    "Load balancer health checks pass.",
    "Retries are not amplifying the recovered workload.",
    "The service remains stable under representative traffic.",
    "The root cause and permanent corrective actions are recorded."
  ],

  incidentReportTemplate: {
    incidentId: "",
    service: "",
    environment: "",
    startTimeUtc: "",
    detectionTimeUtc: "",
    mitigationTimeUtc: "",
    resolutionTimeUtc: "",
    severity: "",
    customerImpact: "",
    affectedReplicas: [],
    tomcatAndJavaVersions: "",
    releaseOrCommit: "",
    connectorAndExecutorConfiguration: "",
    currentThreadsBusyAndMaxThreads: "",
    latencyAndErrorRate: "",
    jdbcPoolMetrics: "",
    downstreamMetrics: "",
    threadDumpFindings: "",
    cpuMemoryGcAndQueueEvidence: "",
    confirmedRootCause: "",
    mitigation: "",
    rollbackOrRestartDetails: "",
    validationResults: [],
    permanentFix: "",
    preventionActions: [
      {
        action: "",
        owner: "",
        dueDate: "",
        successMetric: ""
      }
    ],
    lessonsLearned: ""
  },

  handsOnLabs: [
    {
      title: "Lab 1 - Simulate request-thread saturation",
      environment: "Disposable local Tomcat or staging instance",
      steps: [
        "Create a test endpoint that waits for a controlled duration.",
        "Generate concurrent requests with a load-testing tool in an isolated environment.",
        "Observe busy threads, latency, and request errors.",
        "Capture a thread dump while requests are waiting.",
        "Reduce the artificial wait and observe recovery."
      ],
      expectedLearning: [
        "Understand the relationship between request duration and concurrent worker demand.",
        "Recognize saturation without assuming a memory leak."
      ]
    },
    {
      title: "Lab 2 - Simulate a slow dependency",
      environment: "Isolated test application",
      steps: [
        "Make a test endpoint call a deliberately slow mock dependency.",
        "Observe thread-pool and downstream latency metrics.",
        "Capture thread dumps and identify the blocking call.",
        "Add an appropriate timeout and bounded concurrency.",
        "Repeat the test and compare queue depth and latency."
      ],
      expectedLearning: [
        "Show how a dependency can exhaust request threads.",
        "Demonstrate why timeout and backpressure design matter."
      ]
    },
    {
      title: "Lab 3 - JDBC pool exhaustion",
      environment: "Disposable database and test application",
      steps: [
        "Configure a deliberately small connection pool in a test environment.",
        "Run concurrent requests that hold connections for a controlled period.",
        "Observe active connections, waiters, acquisition latency, and Tomcat busy threads.",
        "Release the bottleneck and compare recovery.",
        "Document the difference between thread-pool exhaustion and JDBC pool exhaustion."
      ],
      expectedLearning: [
        "Correlate application workers with database connection availability.",
        "Avoid increasing both pool limits blindly."
      ]
    },
    {
      title: "Lab 4 - Diagnose lock contention",
      environment: "Disposable JVM",
      steps: [
        "Create a test endpoint whose work competes for a shared lock.",
        "Generate controlled concurrent traffic.",
        "Capture repeated thread dumps.",
        "Identify the common monitor or application stack.",
        "Refactor the critical section and compare throughput."
      ],
      expectedLearning: [
        "Use repeated evidence to find lock contention.",
        "Understand why adding more threads may not improve throughput."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What is Tomcat thread pool exhaustion?",
      answer: "Request-processing workers are occupied or unavailable, so new requests wait or fail. The root cause can be slow dependencies, locks, traffic overload, or long-running application work."
    },
    {
      question: "Does currentThreadsBusy equal the number of incoming connections?",
      answer: "No. Busy request threads and open connections are different metrics, especially with asynchronous and non-blocking I/O."
    },
    {
      question: "What does currentThreadsBusy near maxThreads tell you?",
      answer: "It indicates potential worker saturation. Correlate it with request rate, latency, errors, thread dumps, and dependency metrics to identify the cause."
    },
    {
      question: "Why can increasing maxThreads make the outage worse?",
      answer: "It may increase concurrent database queries, downstream calls, CPU use, and memory pressure, overwhelming the real bottleneck."
    },
    {
      question: "How do you identify blocked request threads?",
      answer: "Capture timestamped thread dumps and inspect repeated stacks, monitor owners, JDBC acquisition waits, HTTP client waits, and blocking I/O."
    },
    {
      question: "How do you distinguish JDBC pool exhaustion from Tomcat thread exhaustion?",
      answer: "Tomcat exhaustion concerns available request workers. JDBC exhaustion concerns database connection availability. They can happen together when request threads wait for connections."
    },
    {
      question: "What is the difference between acceptCount and maxThreads?",
      answer: "maxThreads controls worker concurrency in the relevant connector/executor configuration. acceptCount relates to the incoming connection backlog when request processing capacity is unavailable; it does not create additional workers."
    },
    {
      question: "What is a thread dump and when should you capture it?",
      answer: "It records JVM thread states and stack traces. Capture it during the incident when safe, then compare samples to find persistent waits or lock contention."
    },
    {
      question: "Why are repeated thread dumps useful?",
      answer: "They help distinguish transient waits from persistent blocking and show whether the same application stacks remain stuck over time."
    },
    {
      question: "How can Kubernetes scaling fail to solve thread exhaustion?",
      answer: "If every replica overloads a shared database or downstream dependency, adding replicas may increase pressure and worsen the outage."
    },
    {
      question: "What is the safest first response to thread-pool exhaustion?",
      answer: "Assess impact, preserve key evidence, identify the dominant wait or bottleneck, and apply the lowest-risk mitigation rather than blindly increasing thread limits."
    }
  ],

  operationalChecklist: [
    "Correct environment and Tomcat instance confirmed.",
    "Customer impact and severity assessed.",
    "currentThreadsBusy, maxThreads, request latency, and errors recorded.",
    "Effective connector and executor configuration verified.",
    "Thread dumps captured safely and compared where needed.",
    "JDBC and downstream pool metrics correlated.",
    "CPU, GC, memory, queues, and traffic reviewed.",
    "Root cause supported by evidence.",
    "Mitigation approved and applied to the smallest safe scope.",
    "Service health verified under representative traffic.",
    "Permanent fix, monitoring, owner, and due date recorded."
  ],

  officialReferences: [
    {
      title: "Tomcat 10.1 HTTP Connector Configuration",
      url: "https://tomcat.apache.org/tomcat-10.1-doc/config/http.html"
    },
    {
      title: "Tomcat 10.1 Executor Configuration",
      url: "https://tomcat.apache.org/tomcat-10.1-doc/config/executor.html"
    },
    {
      title: "Tomcat 10.1 JMX Proxy",
      url: "https://tomcat.apache.org/tomcat-10.1-doc/manager-howto.html"
    },
    {
      title: "Oracle Java Troubleshooting Guide",
      url: "https://docs.oracle.com/en/java/javase/21/troubleshoot/"
    },
    {
      title: "Oracle jcmd Command Reference",
      url: "https://docs.oracle.com/en/java/javase/21/docs/specs/man/jcmd.html"
    },
    {
      title: "Kubernetes Resource Management",
      url: "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/"
    }
  ]
} as const;

export default threadPoolExhaustionGuide;
