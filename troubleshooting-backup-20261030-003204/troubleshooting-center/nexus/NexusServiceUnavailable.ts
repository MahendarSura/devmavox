
export const nexusServiceUnavailableGuide = {
  title: "Nexus Repository Service Unavailable",
  fileName: "NexusServiceUnavailable.ts",
  technology: "Sonatype Nexus Repository",
  category: "Nexus",
  severity: ["SEV-1", "SEV-2", "SEV-3", "SEV-4"],

  overview: {
    summary:
      "Diagnose and recover Nexus Repository outages by isolating client, DNS, TLS, load balancer, reverse proxy, application, database, storage, JVM, container, and infrastructure failures.",

    incidentScenario: `
A production CI/CD pipeline suddenly cannot download Maven dependencies,
npm packages, Docker images, or other artifacts from Nexus Repository.

Developers report browser errors, pipelines receive HTTP 503 or 504, and
some requests time out. The Nexus UI may be unavailable, or the UI may work
while repository APIs and artifact downloads fail.

The incident may be caused by an unhealthy Nexus process, exhausted resources,
database connectivity, blob-store failures, a full disk, reverse-proxy routing,
DNS/TLS changes, excessive traffic, or a failed upgrade.
`,

    businessImpact: [
      "Production deployments and CI/CD builds are blocked.",
      "Build agents cannot download required dependencies.",
      "Container image pulls fail and application rollouts stall.",
      "Artifact publishing and release promotion are delayed.",
      "Developers experience intermittent repository failures.",
      "A storage or database incident may threaten artifact availability.",
      "An unsafe restart or recovery action may increase downtime.",
    ],

    objectives: [
      "Determine the outage scope and business impact.",
      "Identify which layer is failing using evidence.",
      "Preserve logs and state before disruptive actions.",
      "Restore service using the smallest safe correction.",
      "Validate artifact downloads, uploads, and dependent pipelines.",
      "Prevent recurrence through monitoring and operational controls.",
    ],

    principles: [
      "A 503 response does not automatically mean the Nexus application itself is down.",
      "A 502 or 504 may originate from a reverse proxy or gateway.",
      "A successful UI request does not prove every repository format is healthy.",
      "A running process or healthy container does not prove artifact operations work.",
      "Do not restart, fail over, or delete storage data before understanding the failure.",
      "Distinguish a temporary recovery from a verified root-cause fix.",
    ],
  },

  severityAndIncidentCommand: {
    severityGuidance: [
      {
        severity: "SEV-1",
        condition:
          "Production-wide Nexus outage, critical release disruption, multiple business services affected, or potential artifact/storage integrity risk.",
        response:
          "Activate incident command, stop risky maintenance, notify platform/release owners, preserve evidence, and follow the critical-service recovery procedure.",
      },
      {
        severity: "SEV-2",
        condition:
          "A critical repository or a major set of pipelines is unavailable, with limited workarounds.",
        response:
          "Assign application, infrastructure, and pipeline owners; isolate the failure layer and restore the affected service.",
      },
      {
        severity: "SEV-3",
        condition:
          "A single repository format, environment, or limited group of consumers is affected.",
        response:
          "Investigate the affected endpoint, repository configuration, and specific dependency.",
      },
      {
        severity: "SEV-4",
        condition:
          "Intermittent or non-production issue without immediate release impact.",
        response:
          "Collect evidence, correct the cause through normal change control, and improve monitoring.",
      },
    ],

    roles: [
      "Incident commander: owns severity, coordination, communications, and change decisions.",
      "Nexus administrator: checks application health, repository behavior, tasks, and configuration.",
      "Platform/SRE engineer: investigates compute, network, DNS, storage, database, and orchestration.",
      "CI/CD owner: checks build-agent errors, credentials, endpoints, and pipeline impact.",
      "Security/IAM owner: investigates identity, certificates, access controls, and security events.",
      "Application/release owner: validates dependency availability and deployment recovery.",
    ],

    immediateActions: [
      "Record incident start time, affected environments, endpoint, and initial symptoms.",
      "Check whether the outage is global, regional, repository-specific, or client-specific.",
      "Pause deployments or releases that cannot safely obtain required artifacts.",
      "Stop destructive cleanup or maintenance jobs if they may be contributing to the outage.",
      "Preserve application, gateway, infrastructure, and task logs before rotation removes them.",
      "Notify service owners and communicate known impact without guessing the root cause.",
      "Avoid repeated restarts, uncontrolled failovers, and simultaneous changes across multiple layers.",
    ],
  },

  safetyChecks: [
    {
      check: "Confirm the target environment",
      action:
        "Verify production versus non-production, Nexus hostname, cluster, namespace, VM, and current maintenance/change window.",
    },
    {
      check: "Confirm the actual deployment model",
      action:
        "Determine whether Nexus runs on a VM, bare metal, Docker, Kubernetes, or another supported deployment arrangement.",
    },
    {
      check: "Confirm the expected service topology",
      action:
        "Identify DNS, load balancer, reverse proxy, Nexus nodes, database, blob store, and monitoring endpoints.",
    },
    {
      check: "Check change history",
      action:
        "Review recent upgrades, configuration changes, certificate rotation, DNS changes, firewall changes, and secret rotations.",
    },
    {
      check: "Assess data integrity",
      action:
        "Check database and blob-store health before failover, restore, or storage repair.",
    },
    {
      check: "Check approval and rollback",
      action:
        "Confirm approval requirements, maintenance windows, backup status, and the documented recovery procedure before disruptive actions.",
    },
    {
      check: "Protect credentials",
      action:
        "Do not expose passwords, bearer tokens, private keys, cookies, or complete secret-bearing environment variables in logs.",
    },
  ],

  evidenceCollection: {
    incidentMetadata: [
      "Incident ID, severity, start time, detection time, and timezone.",
      "Nexus version, deployment type, node identity, and recent upgrades.",
      "Affected hostnames, repository formats, repository names, and environments.",
      "First failing timestamp and last known successful request.",
      "Affected CI/CD jobs, build IDs, and deployment releases.",
    ],

    applicationEvidence: [
      "Nexus application logs for the affected time window.",
      "Startup, shutdown, crash, and out-of-memory messages.",
      "Repository and API error responses.",
      "Background task status, duration, and failure details.",
      "Database connectivity and blob-store error messages.",
    ],

    infrastructureEvidence: [
      "CPU, memory, JVM heap, garbage collection, and process status.",
      "Disk capacity, inode usage, filesystem read/write errors, and mount state.",
      "Database health, connection saturation, latency, and failover events.",
      "Blob-store connectivity, capacity, and backend errors.",
      "DNS lookup results, TLS certificate details, and network connection failures.",
      "Load balancer health checks, proxy logs, upstream response times, and target health.",
      "Container/pod restarts, events, resource limits, and node pressure where applicable.",
    ],

    pipelineEvidence: [
      "Pipeline run ID, timestamp, endpoint, repository, and artifact coordinates.",
      "Sanitized HTTP status and error body.",
      "Whether metadata lookup, download, upload, or authentication failed.",
      "Build-agent DNS, TLS, proxy, and connectivity results.",
      "Recent changes to endpoint variables, credentials, and dependency configuration.",
    ],

    securityAndRedaction: [
      "Redact authorization headers, cookies, passwords, and secret values.",
      "Avoid uploading full process environments or unrestricted debug traces.",
      "Use approved access controls for logs and incident evidence.",
      "Record request IDs and timestamps so teams can correlate evidence across layers.",
    ],
  },

  diagnosticSequence: [
    {
      step: 1,
      title: "Establish the scope and failure pattern",
      purpose:
        "Determine whether the problem affects all users, one client, one repository, or the entire service.",
      actions: [
        "Test the approved Nexus URL from an affected client.",
        "Compare one affected client with a known-good client or network, if available.",
        "Check whether the UI, status endpoint, REST API, artifact download, and artifact upload behave differently.",
        "Identify affected formats such as Maven, npm, Docker, NuGet, or raw repositories.",
        "Record exact status codes, timestamps, and whether the problem is continuous or intermittent.",
      ],
      decisionBranches: [
        {
          condition: "Only one build agent is affected",
          next:
            "Investigate that agent's DNS, proxy, TLS trust, network, credentials, and endpoint configuration.",
        },
        {
          condition: "All clients fail through the public endpoint",
          next:
            "Investigate DNS, load balancer, reverse proxy, shared network path, and Nexus health.",
        },
        {
          condition: "UI works but artifact downloads fail",
          next:
            "Test the affected repository API and artifact path; inspect repository state, storage, permissions, and proxy routing.",
        },
        {
          condition: "Only one repository format fails",
          next:
            "Investigate format-specific configuration, routing, metadata, and consumer behavior.",
        },
        {
          condition: "All operations fail and the process is unhealthy",
          next:
            "Inspect application startup, crash logs, JVM resources, database, and storage dependencies.",
        },
      ],
    },

    {
      step: 2,
      title: "Check DNS resolution",
      purpose:
        "Find stale records, incorrect DNS responses, split-DNS problems, or endpoint changes.",
      commands: [
        {
          name: "Resolve Nexus hostname",
          command: "getent hosts nexus.example.com",
          notes:
            "Run from an affected Linux client and, if permitted, from the relevant server or build agent.",
        },
        {
          name: "Inspect DNS records",
          command: "nslookup nexus.example.com",
          notes:
            "Use available DNS tools in the actual environment. Compare results with the approved endpoint configuration.",
        },
      ],
      decisionBranches: [
        {
          condition: "DNS lookup fails",
          next:
            "Check resolver health, DNS zone configuration, network reachability, and recent record changes.",
        },
        {
          condition: "Different clients resolve different addresses",
          next:
            "Check split-horizon DNS, caching, resolver configuration, and intended load-balancer addresses.",
        },
        {
          condition: "DNS resolves correctly",
          next:
            "Continue with TCP, TLS, and HTTP checks; DNS success does not prove the service is reachable.",
        },
      ],
      caution:
        "Do not change production DNS records until the intended target, TTL, traffic routing, and rollback plan are verified.",
    },

    {
      step: 3,
      title: "Check TCP connectivity and TLS",
      purpose:
        "Separate connection refusal, network timeout, and certificate failures from application errors.",
      commands: [
        {
          name: "Check HTTPS response",
          command:
            'curl --silent --show-error --output /dev/null --write-out "HTTP %{http_code} connect=%{time_connect}s tls=%{time_appconnect}s total=%{time_total}s\\n" "https://nexus.example.com/"',
          notes:
            "This reports an HTTP code and timing information without displaying the response body. An HTTP code of 000 indicates curl did not obtain a usable HTTP response.",
        },
        {
          name: "Inspect certificate chain",
          command:
            "openssl s_client -connect nexus.example.com:443 -servername nexus.example.com </dev/null",
          notes:
            "Inspect certificate validity, hostname/SNI behavior, trust chain, and handshake errors. Exact output varies by OpenSSL version.",
        },
      ],
      decisionBranches: [
        {
          condition: "Connection is refused",
          next:
            "Check listener status, service endpoints, host firewall, load balancer targets, and whether the application is listening on the expected port.",
        },
        {
          condition: "Connection times out",
          next:
            "Check routing, firewall/security rules, network path, packet drops, overloaded targets, and proxy timeouts.",
        },
        {
          condition: "TLS handshake or certificate validation fails",
          next:
            "Check expiry, SAN hostname, intermediate certificates, client trust store, SNI, and recent certificate rotation.",
        },
        {
          condition: "TLS and connection succeed but HTTP returns 5xx",
          next:
            "Investigate gateway behavior and the Nexus application response.",
        },
      ],
      safety:
        "Do not use curl -k or disable certificate verification as a production fix. Correct the certificate or trust configuration.",
    },

    {
      step: 4,
      title: "Interpret HTTP status codes carefully",
      purpose:
        "Use the response as a clue, not as a final root-cause conclusion.",
      statusGuide: [
        {
          status: "502 Bad Gateway",
          meaning:
            "A gateway could not obtain a valid upstream response or another intermediary returned the status.",
          checks:
            "Gateway upstream logs, connection resets, upstream port, TLS, and target health.",
        },
        {
          status: "503 Service Unavailable",
          meaning:
            "The responding layer reports that the service is unavailable; it may be the proxy, load balancer, or application.",
          checks:
            "Response headers, gateway logs, application health, maintenance state, and backend availability.",
        },
        {
          status: "504 Gateway Timeout",
          meaning:
            "A gateway did not receive an upstream response within its configured timeout.",
          checks:
            "Upstream latency, Nexus resource pressure, database/storage delays, proxy timeouts, and long-running requests.",
        },
        {
          status: "401 or 403",
          meaning:
            "Authentication or authorization may be failing rather than the service being unavailable.",
          checks:
            "Credentials, identity provider, service account, repository permissions, and recent IAM changes.",
        },
        {
          status: "404",
          meaning:
            "The endpoint, resource, or route may be incorrect or unavailable.",
          checks:
            "URL path, repository name, API route, proxy rewriting, and supported endpoint.",
        },
        {
          status: "429",
          meaning:
            "A rate limit or throttling mechanism may be rejecting requests.",
          checks:
            "Client concurrency, gateway limits, retry storms, and request rates.",
        },
        {
          status: "000 from curl",
          meaning:
            "No usable HTTP status was obtained by curl.",
          checks:
            "DNS, TCP connectivity, TLS, timeout, client proxy, and curl error output.",
        },
      ],
      next:
        "Correlate the client response with gateway logs and Nexus application logs at the same timestamp.",
    },

    {
      step: 5,
      title: "Check the load balancer and reverse proxy",
      purpose:
        "Find unhealthy targets, incorrect upstream routes, TLS termination problems, and gateway timeouts.",
      checks: [
        "Review load balancer target health and health-check history.",
        "Check whether all Nexus targets are unhealthy or only one target.",
        "Inspect proxy access and error logs for upstream connect failures and timeouts.",
        "Verify the configured upstream hostname, port, TLS settings, and path rewriting.",
        "Check whether the proxy is returning its own 502/503/504.",
        "Compare upstream response times with Nexus request and application logs.",
        "Check for recent ingress, proxy, firewall, or certificate changes.",
      ],
      decisionBranches: [
        {
          condition: "Gateway logs show no healthy targets",
          next:
            "Verify backend process health, listener port, health-check path, and target registration.",
        },
        {
          condition: "One target fails while other targets are healthy",
          next:
            "Investigate that node's health, configuration drift, storage access, and recent restart history.",
        },
        {
          condition: "Gateway times out while Nexus is processing requests",
          next:
            "Investigate Nexus latency, resource pressure, downstream dependencies, and the request's expected duration.",
        },
        {
          condition: "Nexus logs do not show the failed request",
          next:
            "Investigate DNS, client networking, load balancer, proxy, and request routing before assuming an application failure.",
        },
      ],
      caution:
        "Do not increase proxy timeouts as a substitute for diagnosing a slow or unhealthy Nexus backend.",
    },

    {
      step: 6,
      title: "Check Nexus process and startup health",
      purpose:
        "Determine whether the application is running, restarting, starting slowly, or failing during initialization.",
      actions: [
        "Check the process or container status using the approved operational interface.",
        "Inspect application logs around startup, shutdown, and the first failing request.",
        "Look for JVM out-of-memory events, fatal errors, repeated restarts, or failed initialization.",
        "Check whether the listening port matches the expected service configuration.",
        "Review recent Nexus upgrades, plugins, configuration changes, and certificate updates.",
        "Check whether a previous restart is still in progress or the application is recovering.",
      ],
      decisionBranches: [
        {
          condition: "Nexus process is stopped",
          next:
            "Read the shutdown/crash evidence and dependency health before starting it through the supported service manager.",
        },
        {
          condition: "Nexus is repeatedly restarting",
          next:
            "Investigate crash logs, memory limits, disk errors, configuration failures, and container health checks.",
        },
        {
          condition: "Process is running but requests fail",
          next:
            "Check listener binding, application health, request threads, database connectivity, blob-store health, and resource saturation.",
        },
        {
          condition: "Startup is blocked on a dependency",
          next:
            "Restore the verified dependency or follow the supported startup recovery procedure; avoid repeated restarts.",
        },
      ],
      caution:
        "Do not kill the JVM or delete lock files, cache directories, or internal data files to force startup.",
    },

    {
      step: 7,
      title: "Inspect Nexus logs",
      purpose:
        "Correlate user-facing errors with the server-side failure.",
      actions: [
        "Find the exact timestamp and timezone of a failed request.",
        "Review the relevant application log and request/access log if available.",
        "Search for exceptions, failed database operations, blob-store errors, thread starvation, and memory pressure.",
        "Correlate request IDs across the gateway, application, and monitoring systems.",
        "Compare successful and failed requests for the same endpoint.",
        "Check whether errors began after a configuration change, deployment, or maintenance task.",
      ],
      exampleCommands: [
        {
          name: "Search a known application log",
          command:
            'grep -Ei "ERROR|FATAL|OutOfMemory|blob|database|timeout" /path/to/nexus.log | tail -n 200',
          notes:
            "Replace the path with the actual log location. Review access controls before sharing output.",
        },
        {
          name: "Inspect systemd service logs",
          command:
            "journalctl -u nexus --since '30 minutes ago' --no-pager",
          notes:
            "Use only when the service is managed by systemd and the unit name is actually nexus.",
        },
      ],
      decisionBranches: [
        {
          condition: "Logs show database connection failures",
          next:
            "Proceed to database health and connection-pool investigation.",
        },
        {
          condition: "Logs show blob-store or filesystem failures",
          next:
            "Proceed to storage reachability, capacity, permissions, and backend health.",
        },
        {
          condition: "Logs show memory pressure or long pauses",
          next:
            "Inspect JVM and host/container metrics before considering a controlled restart.",
        },
        {
          condition: "No matching request appears in Nexus logs",
          next:
            "Return to the network, proxy, load balancer, and routing path.",
        },
      ],
    },

    {
      step: 8,
      title: "Check CPU, memory, JVM, and thread pressure",
      purpose:
        "Identify resource saturation that can make a running service effectively unavailable.",
      checks: [
        "Review CPU usage, load average, memory pressure, and process state.",
        "Check JVM heap usage, garbage-collection pauses, and out-of-memory events.",
        "Inspect container memory limits and OOM-kill events when applicable.",
        "Check request latency, thread-pool saturation, and connection-pool pressure using supported monitoring.",
        "Compare metrics before, during, and after the incident.",
        "Identify traffic spikes, large uploads/downloads, indexing activity, or scheduled tasks that coincide with the failure.",
      ],
      decisionBranches: [
        {
          condition: "Host CPU is saturated",
          next:
            "Identify the responsible workload and traffic/task pattern before scaling or reducing work.",
        },
        {
          condition: "Memory pressure or OOM kills occur",
          next:
            "Verify heap configuration, container limits, host memory, workload patterns, and supported sizing guidance.",
        },
        {
          condition: "Long garbage-collection pauses occur",
          next:
            "Correlate JVM metrics and heap behavior with latency; do not increase heap blindly without capacity analysis.",
        },
        {
          condition: "Resources look healthy but requests stall",
          next:
            "Investigate database, blob storage, network, request queues, and connection pools.",
        },
      ],
      safety:
        "Capture relevant metrics before changing JVM options or restarting the process. Avoid speculative heap increases that leave insufficient host memory.",
    },

    {
      step: 9,
      title: "Investigate database health",
      purpose:
        "Identify database unavailability, connection saturation, latency, or failover problems.",
      checks: [
        "Determine which database backend and topology the deployment actually uses.",
        "Check database health, connection availability, latency, and recent failover events.",
        "Inspect Nexus logs for connection refusal, authentication errors, timeouts, and transaction failures.",
        "Review database connection saturation and resource limits using supported monitoring.",
        "Check recent database maintenance, certificate rotation, firewall changes, or endpoint changes.",
        "Confirm network connectivity from the Nexus runtime to the configured database endpoint.",
      ],
      decisionBranches: [
        {
          condition: "Database endpoint is unreachable",
          next:
            "Investigate DNS, routing, firewall rules, service health, and the configured endpoint.",
        },
        {
          condition: "Connections are exhausted",
          next:
            "Investigate pool sizing, connection leaks, slow queries, workload spikes, and database limits.",
        },
        {
          condition: "Database is healthy but Nexus still reports failures",
          next:
            "Check Nexus credentials, TLS, pool configuration, and whether the application is using the intended endpoint.",
        },
      ],
      safety:
        "Do not manually edit Nexus database tables or terminate database sessions without an approved, evidence-based recovery plan.",
    },

    {
      step: 10,
      title: "Investigate blob store and filesystem",
      purpose:
        "Identify storage problems that prevent artifact reads, writes, or repository operations.",
      checks: [
        "Check available disk space and inode usage.",
        "Verify required filesystems are mounted and writable by the expected service identity.",
        "Check blob-store backend availability and credentials.",
        "Review filesystem I/O errors, latency, permission failures, and storage alerts.",
        "Check object-storage connectivity, throttling, and backend status if using remote storage.",
        "Review recent storage migrations, mount changes, credential rotations, or lifecycle-policy changes.",
      ],
      exampleCommands: [
        {
          name: "Check filesystem capacity",
          command: "df -h",
          notes:
            "Run on the relevant host or container environment where permitted.",
        },
        {
          name: "Check inode usage",
          command: "df -i",
          notes:
            "A filesystem can run out of inodes even when free byte capacity remains.",
        },
        {
          name: "Inspect mount state",
          command: "findmnt",
          notes:
            "Use on Linux hosts where the command is available. Confirm expected mounts without modifying them.",
        },
      ],
      decisionBranches: [
        {
          condition: "Disk is full or nearly exhausted",
          next:
            "Identify the consuming filesystem and follow approved capacity recovery. Do not delete Nexus blob files manually.",
        },
        {
          condition: "Expected storage mount is missing",
          next:
            "Verify the intended mount and backend state, then follow the approved storage restoration procedure.",
        },
        {
          condition: "Remote blob store is unavailable",
          next:
            "Check network, backend health, access policy, credentials, and provider-side throttling.",
        },
        {
          condition: "Storage is healthy but downloads fail",
          next:
            "Check repository metadata, artifact path, permissions, format behavior, and application logs.",
        },
      ],
      caution:
        "Never manually remove blob files, database records, or internal storage metadata to free space or repair a repository.",
    },

    {
      step: 11,
      title: "Check Docker or Kubernetes deployment health",
      purpose:
        "Find unhealthy containers, failed probes, scheduling problems, or node-level resource pressure.",
      applicability:
        "Run only if Nexus is deployed in Docker or Kubernetes. For VM/bare-metal deployments, use the appropriate service manager and host diagnostics instead.",
      dockerCommands: [
        {
          name: "Inspect container status",
          command: "docker ps -a",
          notes:
            "Identify the correct Nexus container before running container-specific diagnostics.",
        },
        {
          name: "Inspect recent container logs",
          command: "docker logs --since 30m <nexus-container>",
          notes:
            "Review output securely; do not share secrets or sensitive application data.",
        },
        {
          name: "Inspect restart and exit details",
          command:
            'docker inspect --format "{{.State.Status}} {{.State.ExitCode}} {{.State.OOMKilled}} {{.RestartCount}}" <nexus-container>',
          notes:
            "Confirm the container name and Docker version before using the format expression.",
        },
      ],
      kubernetesCommands: [
        {
          name: "Inspect pods",
          command: "kubectl -n <namespace> get pods -o wide",
          notes:
            "Use the approved context and namespace. Do not assume the current context is production or non-production.",
        },
        {
          name: "Inspect service endpoints",
          command:
            "kubectl -n <namespace> get svc,endpoints",
          notes:
            "Check whether the Service has healthy, expected endpoints. Newer clusters may represent backend targets using EndpointSlices.",
        },
        {
          name: "Inspect pod events",
          command:
            "kubectl -n <namespace> describe pod <nexus-pod>",
          notes:
            "Look for failed probes, OOM kills, mount errors, scheduling problems, and node pressure.",
        },
        {
          name: "Read recent container logs",
          command:
            "kubectl -n <namespace> logs <nexus-pod> --since=30m",
          notes:
            "Specify the correct container if the pod contains multiple containers.",
        },
        {
          name: "Check rollout state",
          command:
            "kubectl -n <namespace> rollout status deployment/<deployment-name>",
          notes:
            "Use the actual workload type and name. Stateful workloads may require a different inspection command.",
        },
      ],
      decisionBranches: [
        {
          condition: "CrashLoopBackOff or repeated container restarts",
          next:
            "Inspect prior container logs, exit code, OOM status, probes, configuration, and dependency availability.",
        },
        {
          condition: "Pods are healthy but Service has no endpoints",
          next:
            "Check selectors, readiness status, labels, target ports, and endpoint discovery.",
        },
        {
          condition: "Pod is Pending or unscheduled",
          next:
            "Check node capacity, scheduling constraints, persistent-volume binding, and cluster events.",
        },
        {
          condition: "Liveness probes repeatedly restart Nexus",
          next:
            "Validate probe path, thresholds, startup time, and actual application health before changing probes.",
        },
      ],
      safety:
        "Do not delete persistent volumes, remove storage claims, or force-delete stateful workloads as a first-line troubleshooting action.",
    },

    {
      step: 12,
      title: "Investigate configuration and certificate changes",
      purpose:
        "Find configuration drift or changes that made an otherwise healthy service unavailable.",
      checks: [
        "Compare the current configuration with the last known good version.",
        "Review recent changes to ports, context paths, reverse proxy settings, certificates, trust stores, and service credentials.",
        "Check whether environment variables or secret references changed.",
        "Verify the active configuration is the one expected by the running process.",
        "Check file permissions and ownership where configuration files are used.",
        "Review upgrade compatibility and supported settings for the installed Nexus version.",
      ],
      decisionBranches: [
        {
          condition: "Failure started immediately after a configuration change",
          next:
            "Validate the diff and consider a reviewed rollback of the specific change.",
        },
        {
          condition: "Certificate rotation caused TLS failures",
          next:
            "Correct certificate chain, hostname, trust, or client trust-store configuration.",
        },
        {
          condition: "Configuration appears correct but behavior differs",
          next:
            "Check whether the service actually loaded the configuration and inspect startup/reload logs.",
        },
      ],
      safety:
        "Do not copy production secrets into tickets or revert unrelated configuration changes as part of an outage fix.",
    },

    {
      step: 13,
      title: "Check background tasks and workload pressure",
      purpose:
        "Determine whether maintenance, indexing, cleanup, or high artifact traffic is contributing to the incident.",
      checks: [
        "Review scheduled tasks and recent task failures.",
        "Check cleanup, compaction, indexing, backup, and maintenance activity where applicable.",
        "Correlate task start/end times with application latency and resource usage.",
        "Check large uploads, download bursts, dependency refresh storms, and excessive CI concurrency.",
        "Identify overlapping maintenance tasks or unexpected repeated jobs.",
      ],
      decisionBranches: [
        {
          condition: "A task aligns with the start of the outage",
          next:
            "Review its logs, scope, resource consumption, and documented stop/pause procedure before changing task state.",
        },
        {
          condition: "Traffic surge overwhelms the service",
          next:
            "Apply approved traffic shaping, client concurrency controls, or capacity measures while preserving critical release traffic.",
        },
        {
          condition: "No task or traffic correlation exists",
          next:
            "Continue investigating application dependencies, network, and infrastructure.",
        },
      ],
      safety:
        "Do not run blob-store compaction or other destructive maintenance merely because Nexus is unavailable.",
    },

    {
      step: 14,
      title: "Use a controlled comparison to isolate the failing layer",
      purpose:
        "Avoid making unrelated changes by comparing results across the service path.",
      comparisonMatrix: [
        {
          test: "Affected client to public URL",
          interpretation:
            "Failure may be in client configuration, DNS, network, gateway, or backend.",
        },
        {
          test: "Known-good client to public URL",
          interpretation:
            "If it works, investigate client-specific DNS, trust, proxy, credentials, and network differences.",
        },
        {
          test: "Approved internal route to Nexus",
          interpretation:
            "If internal routing works but public routing fails, investigate DNS, load balancer, gateway, or TLS termination.",
        },
        {
          test: "UI versus repository artifact endpoint",
          interpretation:
            "If only artifact operations fail, investigate repository format, storage, permissions, and request routing.",
        },
        {
          test: "Gateway logs versus Nexus logs",
          interpretation:
            "Gateway-only failures suggest a path or upstream issue; application-side errors point to Nexus or its dependencies.",
        },
      ],
      safety:
        "Only use internal routes and diagnostic endpoints that are approved for the environment. Do not bypass security controls or expose Nexus directly to the internet.",
    },

    {
      step: 15,
      title: "Select the smallest safe remediation",
      purpose:
        "Correct the verified root cause rather than performing broad recovery actions.",
      remediationOptions: [
        {
          cause: "Incorrect DNS record",
          action:
            "Correct the approved record, verify TTL/caching behavior, and validate resolution from affected clients.",
        },
        {
          cause: "Invalid or expired certificate",
          action:
            "Install the correct certificate chain or trust configuration using the approved change procedure.",
        },
        {
          cause: "Unhealthy proxy target",
          action:
            "Correct target registration, listener, route, or health-check configuration after verifying the backend.",
        },
        {
          cause: "Nexus process stopped",
          action:
            "Investigate crash evidence and dependency health, then use the supported service manager to start it under change control.",
        },
        {
          cause: "Disk capacity exhausted",
          action:
            "Identify the consuming filesystem and use an approved cleanup or capacity-expansion plan. Never manually delete internal Nexus blob data.",
        },
        {
          cause: "Database unavailable",
          action:
            "Restore database connectivity or follow the supported database recovery/failover procedure with the database owner.",
        },
        {
          cause: "Blob store unavailable",
          action:
            "Restore backend access, credentials, mounts, or network connectivity through the approved storage recovery procedure.",
        },
        {
          cause: "Resource saturation",
          action:
            "Reduce excessive workload safely, correct the bottleneck, and scale only after verifying capacity and supported sizing.",
        },
        {
          cause: "Bad recent configuration change",
          action:
            "Review and roll back only the verified change, then validate the service path.",
        },
      ],
      decisionRules: [
        "Prefer a reversible and narrowly scoped change.",
        "Capture pre-change evidence and the current configuration.",
        "Obtain the required approval before production changes.",
        "Change one causal layer at a time where feasible.",
        "Define a success check and a rollback condition before execution.",
      ],
    },

    {
      step: 16,
      title: "Controlled restart or failover, only if justified",
      purpose:
        "Use restart/failover as a controlled recovery measure rather than a diagnostic guess.",
      preconditions: [
        "The failure evidence supports a restart or failover as an appropriate recovery action.",
        "The service owner confirms the correct instance and procedure.",
        "Database and blob-store health are understood.",
        "Persistent storage and backup/recovery assumptions are verified.",
        "The impact of interrupting active uploads, downloads, or releases is assessed.",
        "Logs, metrics, and recent failure evidence are captured.",
        "Required production approval and rollback/abort criteria are available.",
      ],
      actions: [
        "Notify affected owners and pause unsafe release operations.",
        "Confirm whether the topology is single-node or clustered and identify the correct recovery sequence.",
        "Follow the supported procedure for the actual VM, container, or Kubernetes deployment.",
        "Observe startup logs and health checks instead of repeatedly restarting.",
        "If the service does not recover, stop repeating the action and investigate the blocking dependency.",
      ],
      stopConditions: [
        "Database or storage integrity is uncertain.",
        "The wrong instance or environment may be targeted.",
        "A previous restart is still in progress.",
        "Persistent volume, mount, or backend state is inconsistent.",
        "Restarting could worsen an ongoing recovery or cause data loss.",
      ],
      caution:
        "Do not delete pods, volumes, database files, blob-store files, or internal lock files as a substitute for the supported recovery process.",
    },

    {
      step: 17,
      title: "Validate recovery end to end",
      purpose:
        "Prove that users can perform the repository operations they need, not merely that a process is running.",
      validationSteps: [
        "Check DNS resolution from affected clients.",
        "Verify TCP and TLS connectivity to the intended endpoint.",
        "Confirm the load balancer reports healthy intended targets.",
        "Check the Nexus application status and relevant logs.",
        "Perform a read-only repository lookup or artifact metadata request.",
        "Download a known, approved test artifact using the normal client path.",
        "Where required, publish a disposable test artifact only in an approved test repository.",
        "Validate affected Maven/npm/Docker or other format-specific operations.",
        "Run a representative CI/CD pipeline and confirm dependency resolution.",
        "Monitor error rates, latency, resource usage, and storage/database health.",
        "Confirm no unexpected artifact changes occurred during recovery.",
      ],
      decisionBranches: [
        {
          condition: "Health endpoint responds but artifact download fails",
          next:
            "Continue investigating repository format, blob-store access, authorization, and artifact path.",
        },
        {
          condition: "Direct test works but CI/CD still fails",
          next:
            "Investigate build-agent DNS, proxy, certificate trust, credentials, and pipeline configuration.",
        },
        {
          condition: "Service works but latency remains high",
          next:
            "Keep the incident under observation and investigate remaining saturation or dependency latency.",
        },
      ],
      exitCriteria: [
        "The affected repository operations are successful.",
        "Representative consumers and pipelines recover.",
        "The service remains stable through the agreed observation period.",
        "No unresolved storage or database integrity risk remains.",
        "The incident report and prevention actions are recorded.",
      ],
    },
  ],

  exampleCommands: {
    disclaimer:
      "These commands are examples, not a universal Nexus configuration. Confirm the host, service name, namespace, endpoint, and deployment model before execution. Start with read-only diagnostics.",

    clientChecks: [
      {
        name: "Check HTTP response and latency",
        command:
          'curl --silent --show-error --output /dev/null --write-out "HTTP %{http_code} connect=%{time_connect}s tls=%{time_appconnect}s first_byte=%{time_starttransfer}s total=%{time_total}s\\n" "https://nexus.example.com/"',
        interpretation:
          "Compare response status and timing with a known-good observation. Use a real repository endpoint when diagnosing repository-specific failures.",
      },
      {
        name: "Check DNS",
        command: "getent hosts nexus.example.com",
        interpretation:
          "Confirms whether the local resolver returns addresses; it does not confirm those addresses are healthy.",
      },
      {
        name: "Check certificate handshake",
        command:
          "openssl s_client -connect nexus.example.com:443 -servername nexus.example.com </dev/null",
        interpretation:
          "Inspect TLS negotiation and certificate chain; use the actual endpoint port.",
      },
    ],

    linuxChecks: [
      {
        name: "Inspect disk usage",
        command: "df -h",
        interpretation:
          "Find full or nearly full filesystems relevant to Nexus, database, and logs.",
      },
      {
        name: "Inspect inode usage",
        command: "df -i",
        interpretation:
          "Detect inode exhaustion that may prevent file creation.",
      },
      {
        name: "Inspect process",
        command: "ps -eo pid,ppid,%cpu,%mem,stat,etime,cmd",
        interpretation:
          "Identify relevant process state and resource usage. Avoid publishing sensitive command arguments.",
      },
      {
        name: "Inspect service logs",
        command:
          "journalctl -u nexus --since '30 minutes ago' --no-pager",
        interpretation:
          "Applicable only when systemd manages a service named nexus.",
      },
    ],

    safetyNotes: [
      "Use approved access and monitoring interfaces.",
      "Do not run destructive filesystem commands during initial diagnosis.",
      "Avoid collecting full environment dumps or secret-bearing command output.",
      "Do not assume a service name, port, health path, or log path without checking the deployment.",
    ],
  },

  rootCauseMatrix: [
    {
      symptom: "503 from public URL",
      likelyCauses:
        "No healthy backend, maintenance state, overloaded application, gateway-generated 503, or backend dependency failure.",
      evidence:
        "Response headers, load balancer health, proxy logs, Nexus logs, dependency health.",
      remediation:
        "Identify the layer generating 503 and correct that layer only.",
    },
    {
      symptom: "502 from reverse proxy",
      likelyCauses:
        "Connection refusal, invalid upstream response, TLS mismatch, or target routing problem.",
      evidence:
        "Gateway error log, upstream address, backend listener, TLS and target health.",
      remediation:
        "Restore correct upstream connectivity or target configuration.",
    },
    {
      symptom: "504 timeout",
      likelyCauses:
        "Slow Nexus response, overloaded dependency, network delay, or gateway timeout.",
      evidence:
        "Upstream timing, Nexus logs, JVM metrics, database latency, storage latency.",
      remediation:
        "Fix the measured bottleneck and tune timeouts only when justified.",
    },
    {
      symptom: "Connection refused",
      likelyCauses:
        "Service stopped, wrong port, listener absent, firewall reject, or unhealthy target.",
      evidence:
        "Process state, listener, service status, firewall and target health.",
      remediation:
        "Restore the correct listener or routing after identifying the actual cause.",
    },
    {
      symptom: "Connection timeout",
      likelyCauses:
        "Network path failure, firewall drop, overloaded backend, or unresponsive dependency.",
      evidence:
        "DNS, routing, network telemetry, proxy logs, server health and latency.",
      remediation:
        "Repair the failing network path or service dependency.",
    },
    {
      symptom: "TLS certificate error",
      likelyCauses:
        "Expired certificate, wrong hostname, missing intermediate, trust-store issue, or SNI mismatch.",
      evidence:
        "Certificate dates/SAN, chain output, endpoint configuration, client trust settings.",
      remediation:
        "Correct the certificate chain or trust configuration.",
    },
    {
      symptom: "Nexus process repeatedly restarts",
      likelyCauses:
        "Out-of-memory event, startup failure, dependency outage, bad configuration, or container probe behavior.",
      evidence:
        "Prior logs, exit code, OOM status, events, startup sequence and dependency health.",
      remediation:
        "Correct the verified cause and follow the supported startup procedure.",
    },
    {
      symptom: "Nexus starts but repositories fail",
      likelyCauses:
        "Database/blob-store connectivity, permissions, repository configuration, or incomplete recovery.",
      evidence:
        "Repository-specific API response, application logs, database and storage telemetry.",
      remediation:
        "Restore the affected dependency or repository operation and validate actual artifact access.",
    },
    {
      symptom: "Disk or inode exhaustion",
      likelyCauses:
        "Growing artifacts, logs, backups, temporary files, or inode-heavy workloads.",
      evidence:
        "Filesystem capacity, inode metrics, growth history and storage ownership.",
      remediation:
        "Use an approved retention/capacity plan; never manually delete internal blob-store files.",
    },
    {
      symptom: "Only CI/CD agents fail",
      likelyCauses:
        "Agent DNS, proxy, TLS trust, credentials, network policy, or outdated endpoint.",
      evidence:
        "Agent-side connection tests, sanitized logs, endpoint variables, trust store and secret rotation history.",
      remediation:
        "Correct the agent-specific issue and validate using the normal pipeline.",
    },
    {
      symptom: "One format or repository fails",
      likelyCauses:
        "Format-specific routing, repository configuration, metadata, authorization, or storage access.",
      evidence:
        "Exact repository endpoint, known-good repository comparison, request logs and artifact metadata.",
      remediation:
        "Correct the affected repository or format configuration.",
    },
  ],

  prevention: {
    monitoring: [
      "Monitor service availability from both internal and consumer network paths.",
      "Alert on 5xx rate, request latency, and sustained connection failures.",
      "Monitor load balancer target health and reverse-proxy upstream errors.",
      "Track CPU, memory, JVM heap, garbage-collection pauses, and process restarts.",
      "Alert on filesystem capacity, inode exhaustion, storage latency, and blob-store reachability.",
      "Monitor database availability, connection saturation, and query latency.",
      "Track repository-format-specific download and upload failures.",
      "Correlate CI/CD failures with Nexus service telemetry and change events.",
    ],

    reliabilityControls: [
      "Document service topology, dependency ownership, and supported recovery procedures.",
      "Test backup and restoration procedures in an approved environment.",
      "Use controlled upgrades and certificate rotation with verification and rollback plans.",
      "Validate health checks against meaningful service behavior.",
      "Avoid excessive retry storms in CI/CD clients.",
      "Use bounded retries with backoff only where the operation is safe to retry.",
      "Capacity-plan storage, database, JVM, and build traffic.",
      "Review cleanup tasks and maintenance windows for resource impact.",
      "Keep incident runbooks and escalation contacts current.",
      "Run periodic outage exercises without risking production artifacts.",
    ],

    changeManagement: [
      "Require review and approval for production changes.",
      "Capture the last known-good configuration and the change diff.",
      "Define rollback criteria before deployment.",
      "Avoid changing DNS, proxy, JVM, database, and storage settings simultaneously.",
      "Record who changed what and when.",
    ],
  },

  incidentReportTemplate: {
    incidentId: "",
    severity: "",
    startTime: "",
    detectionTime: "",
    resolutionTime: "",
    affectedEnvironment: "",
    nexusVersion: "",
    deploymentType: "",
    affectedEndpoints: [],
    affectedRepositories: [],
    affectedConsumers: [],
    businessImpact: "",
    initialSymptoms: [],
    httpStatuses: [],
    evidence: [],
    rootCauseLayer: "",
    rootCause: "",
    correctiveAction: "",
    rollbackOrRecovery: "",
    validationResults: [],
    preventionActions: [],
    actionOwners: [],
    followUpDate: "",
  },

  handsOnLabs: [
    {
      name: "Lab 1 - DNS and TLS diagnosis",
      objective:
        "Distinguish endpoint resolution errors from TLS trust failures.",
      tasks: [
        "Use a non-production endpoint.",
        "Record DNS resolution and certificate details.",
        "Compare an approved client with a test client.",
        "Document how DNS, TCP, TLS, and HTTP failures differ.",
      ],
    },
    {
      name: "Lab 2 - Gateway versus application failure",
      objective:
        "Identify which layer generates an HTTP 502, 503, or 504.",
      tasks: [
        "Use a controlled test environment with gateway and application logs.",
        "Correlate timestamps across the client, proxy, and Nexus.",
        "Compare upstream target health with application status.",
        "Document evidence that distinguishes a gateway error from an application error.",
      ],
    },
    {
      name: "Lab 3 - Resource saturation",
      objective:
        "Understand how CPU, memory, disk, and JVM pressure affect repository availability.",
      tasks: [
        "Observe baseline host and application metrics.",
        "Use a controlled load test against a non-production instance.",
        "Correlate latency and error rates with resource metrics.",
        "Stop the test when the safety threshold is reached.",
        "Document the measured bottleneck and the recovery behavior.",
      ],
    },
    {
      name: "Lab 4 - Container and Kubernetes health",
      objective:
        "Diagnose restart loops and missing service endpoints.",
      tasks: [
        "Inspect pod/container state and recent events.",
        "Review startup logs, exit codes, and readiness behavior.",
        "Compare Service selectors and ready endpoints.",
        "Document the smallest safe correction for a simulated fault.",
      ],
    },
    {
      name: "Lab 5 - End-to-end recovery drill",
      objective:
        "Validate more than a process or status endpoint.",
      tasks: [
        "Create a test artifact in a non-production repository.",
        "Verify metadata lookup and artifact download.",
        "Simulate a controlled network or configuration issue.",
        "Restore the approved configuration.",
        "Re-run the artifact operation and a representative test pipeline.",
        "Complete an incident report and prevention checklist.",
      ],
    },
  ],

  interviewQuestions: [
    {
      question: "Does HTTP 503 always mean Nexus is down?",
      expectedAnswer:
        "No. The response may originate from the application, reverse proxy, or load balancer. Correlate response headers, gateway logs, target health, and application logs.",
    },
    {
      question: "What is the difference between 502 and 504?",
      expectedAnswer:
        "502 commonly indicates an invalid or failed upstream response; 504 indicates that a gateway timed out waiting for an upstream response. Confirm the actual generating layer.",
    },
    {
      question:
        "Why can the Nexus UI work while artifact downloads fail?",
      expectedAnswer:
        "UI routing and repository operations may exercise different endpoints, permissions, storage paths, or format-specific behavior.",
    },
    {
      question: "Why should repeated restarts be avoided?",
      expectedAnswer:
        "They can erase transient evidence, increase downtime, interrupt recovery, and fail to fix a database, storage, configuration, or network problem.",
    },
    {
      question:
        "How do you distinguish a client-side issue from a Nexus outage?",
      expectedAnswer:
        "Compare affected and known-good clients, inspect DNS/TLS/network behavior, correlate gateway and application logs, and test approved endpoints.",
    },
    {
      question:
        "What should be checked before a production failover?",
      expectedAnswer:
        "Topology, data consistency, database and blob-store health, target readiness, recovery procedure, change approval, and rollback criteria.",
    },
    {
      question:
        "What evidence suggests storage rather than network failure?",
      expectedAnswer:
        "Storage errors in application logs, mount/backend health problems, filesystem errors, capacity alerts, and correlated artifact read/write failures.",
    },
    {
      question:
        "How do you confirm Nexus recovery?",
      expectedAnswer:
        "Verify endpoint and target health, application status, repository lookup, real artifact download, representative pipeline success, and stable monitoring.",
    },
  ],

  completionChecklist: [
    "Incident scope, severity, and business impact are documented.",
    "The target environment and deployment model are confirmed.",
    "DNS, TCP, TLS, and HTTP behavior are recorded.",
    "Gateway and Nexus logs are correlated.",
    "Application, database, storage, and resource health are checked.",
    "The actual root-cause layer is supported by evidence.",
    "The correction is approved and narrowly scoped.",
    "Restart or failover is performed only when justified.",
    "Artifact lookup/download and affected pipelines are validated.",
    "Service stability is monitored after recovery.",
    "The incident report, prevention actions, and owners are recorded.",
  ],

  officialReferences: [
    {
      title: "Sonatype Nexus Repository Documentation",
      url: "https://help.sonatype.com/en/sonatype-nexus-repository.html",
    },
    {
      title: "Nexus Repository API Reference",
      url: "https://help.sonatype.com/en/api-reference.html",
    },
    {
      title: "Nexus Repository System Requirements",
      url: "https://help.sonatype.com/en/sonatype-nexus-repository-system-requirements.html",
    },
    {
      title: "Nexus Repository Installation and Upgrade",
      url: "https://help.sonatype.com/en/installation-and-upgrade.html",
    },
    {
      title: "Nexus Repository Tasks",
      url: "https://help.sonatype.com/en/tasks.html",
    },
    {
      title: "Kubernetes Documentation",
      url: "https://kubernetes.io/docs/",
    },
    {
      title: "Docker Documentation",
      url: "https://docs.docker.com/",
    },
  ],
} as const;

export default nexusServiceUnavailableGuide;
