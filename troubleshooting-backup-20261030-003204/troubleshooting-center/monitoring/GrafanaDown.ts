export interface GrafanaDownGuide {
  title: string;
  category: string;
  severity: string;
  overview: string;
  incidentScenario: string;
  impactAssessment: string[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: {
    step: number;
    title: string;
    objective: string;
    commands: string[];
    expectedResults: string[];
    interpretation: string[];
    nextActions: string[];
  }[];
  rootCauseMatrix: {
    symptom: string;
    likelyCauses: string[];
    verification: string[];
    resolution: string[];
  }[];
  advancedScenarios: {
    scenario: string;
    symptoms: string[];
    investigation: string[];
    resolution: string[];
    prevention: string[];
  }[];
  recoveryProcedures: {
    situation: string;
    procedure: string[];
    validation: string[];
    rollback: string[];
  }[];
  cicdTroubleshooting: string[];
  monitoringAndPrevention: string[];
  incidentRunbook: string[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    successCriteria: string[];
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  incidentReportTemplate: string[];
  officialReferences: {
    title: string;
    url: string;
  }[];
}

export const grafanaDownGuide: GrafanaDownGuide = {
  title: "Grafana Down — Complete Production Troubleshooting Guide",
  category: "Monitoring / Grafana / Observability / SRE",
  severity: "SEV-1 or SEV-2 depending on monitoring impact",

  overview: `
Grafana Down means the Grafana user interface or API is unavailable,
unresponsive, returning HTTP errors, failing to start, or unable to serve
dashboards reliably.

Grafana Down does not automatically mean the application itself is down.
The monitoring interface, metrics collection, alert evaluation, and
application workloads are separate components and must be investigated
independently.

Typical architecture:

Users / SRE
    |
    v
DNS -> Load Balancer / Ingress -> Grafana
                                  |
                                  +--> Grafana database
                                  |
                                  +--> Prometheus / Other data sources

Prometheus collection and alert evaluation may continue even when the
Grafana UI is unavailable. However, this depends on the deployment design.
Prometheus alert rules and Alertmanager should be checked independently.

Primary objectives:
1. Restore safe access to dashboards.
2. Preserve evidence before restarting or changing configuration.
3. Determine the exact failed component.
4. Confirm whether alerting and metrics collection remain operational.
5. Restore service with a controlled, verified change.
6. Prevent recurrence through monitoring, capacity management, and runbooks.
`,

  incidentScenario: `
At 10:15 AM, engineers report that the Grafana URL is returning HTTP 502.
The on-call engineer cannot open production dashboards. The application
team is unsure whether the application itself is experiencing failures.

The incident responder must determine:
- Is the problem limited to DNS, TLS, ingress, load balancing, or Grafana?
- Is the Grafana process running and listening on the expected port?
- Can Grafana reach its database and configured data sources?
- Are Prometheus metrics and alert rules still functioning?
- Did a deployment, configuration change, plugin installation, or
  infrastructure event occur immediately before the failure?
- Can the service be restored without losing data or changing production
  configuration unnecessarily?

The initial symptom is not the root cause. Every conclusion must be
supported by command output, logs, health checks, or a reproducible test.
`,

  impactAssessment: [
    "Confirm the affected Grafana URL, region, cluster, namespace, and environment.",
    "Identify whether all users are affected or only a particular network, browser, tenant, or authentication group.",
    "Determine whether the homepage, login page, dashboard pages, and API endpoints fail in the same way.",
    "Check whether dashboards are unavailable while the underlying applications continue to operate.",
    "Verify Prometheus targets, rule evaluation, Alertmanager delivery, and any independent alerting path.",
    "Check whether on-call engineers have another approved source of metrics, logs, traces, or cloud health information.",
    "Identify recent deployments, restarts, configuration edits, certificate renewals, DNS changes, or infrastructure scaling events.",
    "Estimate the monitoring blind spot and document the start time, affected teams, and business impact.",
    "Assign severity according to internal incident policy. Loss of a monitoring UI alone is not automatically SEV-1; inability to detect or respond to a critical outage may increase severity."
  ],

  safetyChecks: [
    "Confirm the exact production environment and Grafana instance before running commands.",
    "Verify the host, Kubernetes context, namespace, container, and service name.",
    "Use read-only commands first. Do not restart, delete, scale, or modify resources before collecting evidence.",
    "Check maintenance windows, deployment freezes, incident ownership, and approval requirements.",
    "Do not print passwords, API keys, cookies, session tokens, database connection strings, or secret values into shared logs.",
    "Do not disable authentication, TLS validation, authorization, or firewall rules to make Grafana accessible.",
    "Do not delete Grafana database files, persistent volumes, or SQLite lock files as a first-line fix.",
    "Before database recovery, backup restoration, migration rollback, or volume changes, confirm the supported recovery procedure and backup integrity.",
    "Check whether Grafana is managed by systemd, Docker Compose, Kubernetes, Helm, an operator, or a cloud service. Use the correct control plane.",
    "Capture UTC timestamps when correlating logs from multiple hosts and systems.",
    "Avoid repeatedly restarting a crash-looping service. Repeated restarts may erase useful evidence and worsen database, migration, or dependency failures."
  ],

  evidenceCollection: [
    "Record incident start time, first alert time, last known healthy time, and time of the latest change.",
    "Capture the exact URL, HTTP status, response headers, browser error, and whether the failure reproduces from an approved second network.",
    "Collect Grafana application logs and service-manager events around the failure window.",
    "Collect CPU, memory, disk space, inode usage, disk latency, and process restart information.",
    "Collect container state, exit code, restart count, health-check results, and recent container events where applicable.",
    "For Kubernetes, collect pod descriptions, previous container logs, events, readiness state, service endpoints, and ingress controller logs.",
    "Capture load balancer target health, ingress status, DNS answers, TLS certificate details, and network connectivity tests.",
    "Check Grafana database availability, storage permissions, connection pool errors, and migration errors.",
    "Capture datasource health and connectivity failures without exposing credentials.",
    "Record installed plugin changes, Grafana version changes, provisioning changes, environment variable changes, and recent Git commits.",
    "Preserve a sanitized copy of relevant logs and command output in the approved incident record."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Establish the failure boundary",
      objective:
        "Determine whether the problem is global, network-specific, browser-specific, or limited to a single Grafana component.",
      commands: [
        "date -u",
        "curl -sS -o /dev/null -w 'HTTP=%{http_code} DNS=%{time_namelookup}s CONNECT=%{time_connect}s TLS=%{time_appconnect}s TOTAL=%{time_total}s\\n' https://grafana.example.com/",
        "curl -sS -D - -o /dev/null https://grafana.example.com/api/health",
        "getent hosts grafana.example.com"
      ],
      expectedResults: [
        "The timestamp provides a correlation point for logs.",
        "HTTP 200 or another expected response indicates that the tested route is responding.",
        "A healthy Grafana API response normally includes a JSON status indicating database health.",
        "DNS lookup should return the expected endpoint addresses."
      ],
      interpretation: [
        "HTTP 502 or 504 commonly points to an upstream or gateway problem, but Grafana logs and upstream health must confirm the cause.",
        "HTTP 503 may indicate no healthy upstream, overload, maintenance, or a service-level rejection.",
        "Connection refused often means no listener is available at the tested address and port, or a network policy actively rejects the connection.",
        "A timeout can indicate routing, firewall, overload, an unresponsive service, or a broken upstream connection.",
        "HTTP 401 or 403 indicates an authentication or authorization path that must be investigated separately from process availability.",
        "DNS failure with a healthy direct endpoint suggests DNS or resolver trouble; confirm the expected endpoint before bypassing DNS."
      ],
      nextActions: [
        "If DNS fails, continue to the DNS and endpoint checks in Step 5.",
        "If the public URL fails but local Grafana health succeeds, investigate ingress, reverse proxy, load balancer, TLS, and network routing.",
        "If local health also fails, investigate the service or pod in Steps 2 through 4.",
        "If the API is healthy but dashboards fail, investigate authentication, plugins, provisioning, browser errors, and datasource queries."
      ]
    },
    {
      step: 2,
      title: "Identify the deployment type and service state",
      objective:
        "Use the actual installation method to inspect the correct Grafana instance.",
      commands: [
        "systemctl status grafana-server --no-pager -l",
        "systemctl show grafana-server -p ActiveState -p SubState -p ExecMainStatus -p NRestarts",
        "docker ps --format 'table {{.Names}}\\t{{.Status}}\\t{{.Ports}}'",
        "docker compose ps",
        "kubectl config current-context",
        "kubectl get pods -A -o wide"
      ],
      expectedResults: [
        "systemd reports whether the service is active, failed, or repeatedly restarting.",
        "Docker output shows container state and published ports.",
        "Kubernetes output shows pod status, placement, readiness, and restart counts."
      ],
      interpretation: [
        "Use only the commands relevant to the real deployment. A missing systemd service does not prove Grafana is down if it runs in Kubernetes or a managed service.",
        "A failed service with a nonzero exit code needs log investigation before a restart.",
        "A running container can still be unhealthy or unable to accept requests.",
        "A Running Kubernetes pod can fail readiness probes or be unreachable through its Service.",
        "Repeated restarts may indicate configuration errors, failed dependencies, memory pressure, or plugin incompatibility."
      ],
      nextActions: [
        "For systemd, collect journal logs and unit configuration.",
        "For Docker, inspect the correct container logs, state, health, and mounts.",
        "For Kubernetes, identify the exact namespace and pod, then inspect events and current and previous logs.",
        "For a managed Grafana service, check the provider's service health, access policy, and platform diagnostics instead of attempting host-level commands."
      ]
    },
    {
      step: 3,
      title: "Collect application logs and failure details",
      objective:
        "Identify the first meaningful error and correlate it with the incident timeline.",
      commands: [
        "journalctl -u grafana-server --since '30 minutes ago' --no-pager",
        "journalctl -u grafana-server -p warning --since '1 hour ago' --no-pager",
        "docker logs --since 30m <grafana-container>",
        "kubectl logs -n <namespace> <grafana-pod> --since=30m",
        "kubectl logs -n <namespace> <grafana-pod> --previous --tail=300"
      ],
      expectedResults: [
        "Logs show startup messages, request failures, dependency errors, plugin loading, database access, or shutdown events.",
        "Previous container logs may explain a crash that is not visible in the current container.",
        "Timestamps help associate errors with deployments and infrastructure changes."
      ],
      interpretation: [
        "Database connection failures suggest database reachability, authentication, capacity, or connection pool problems.",
        "Permission denied suggests a file, directory, certificate, or secret permission issue.",
        "Plugin initialization or panic errors may point to a plugin or version compatibility issue.",
        "Migration errors require careful database investigation; do not delete or recreate the database.",
        "Out-of-memory termination requires checking memory limits and host or container OOM evidence.",
        "No application logs alongside a failed public URL may indicate traffic never reaches Grafana."
      ],
      nextActions: [
        "Identify the earliest causal error, not merely the last repeated message.",
        "Correlate the error with the precise deployment, restart, configuration change, or resource event.",
        "Redact credentials and tokens before sharing log excerpts.",
        "Follow the relevant root-cause branch in the matrix below."
      ]
    },
    {
      step: 4,
      title: "Check CPU, memory, disk, and process health",
      objective:
        "Determine whether resource exhaustion is preventing Grafana from starting or responding.",
      commands: [
        "uptime",
        "free -h",
        "df -h",
        "df -i",
        "ps -eo pid,ppid,%cpu,%mem,rss,etime,cmd --sort=-%mem | head -20",
        "vmstat 1 5",
        "dmesg -T | grep -Ei 'out of memory|oom|killed process' | tail -50"
      ],
      expectedResults: [
        "Disk and inode availability remain above operational safety thresholds.",
        "Memory pressure and CPU saturation are not persistently excessive.",
        "The Grafana process exists and has a plausible resource profile.",
        "Kernel logs do not show an OOM kill of Grafana or a critical dependency."
      ],
      interpretation: [
        "A full disk can prevent writes, database operations, log rotation, and application startup.",
        "Inodes can be exhausted even when df -h shows free capacity.",
        "High CPU can result from expensive dashboard queries, large result sets, plugins, or contention.",
        "High memory usage can lead to container OOM kills or process termination.",
        "High I/O wait may indicate storage contention or a slow database backend."
      ],
      nextActions: [
        "Identify the actual disk, mount, process, or container consuming resources before removing anything.",
        "Use approved retention and cleanup procedures; do not delete database files or active data directories.",
        "If resource limits are too low, compare current usage with capacity plans and change limits through the normal deployment configuration.",
        "Recheck health and logs after a controlled remediation."
      ]
    },
    {
      step: 5,
      title: "Validate DNS, listening ports, TLS, and network path",
      objective:
        "Distinguish a healthy Grafana process from a broken network or proxy path.",
      commands: [
        "ss -lntp",
        "curl -sS -v http://127.0.0.1:3000/api/health",
        "getent hosts grafana.example.com",
        "curl -sS -o /dev/null -w '%{http_code}\\n' https://grafana.example.com/api/health",
        "openssl s_client -connect grafana.example.com:443 -servername grafana.example.com </dev/null",
        "kubectl get svc,endpoints -n <namespace>",
        "kubectl get ingress -n <namespace>"
      ],
      expectedResults: [
        "Grafana listens on the configured interface and port.",
        "Local health and external health can be compared.",
        "DNS returns the intended endpoint.",
        "The TLS handshake presents the expected certificate chain.",
        "Kubernetes Services have the expected ready endpoints."
      ],
      interpretation: [
        "A local success and external failure strongly narrows the problem to the network or proxy path.",
        "A listener bound only to loopback may not accept traffic from another host or container.",
        "An empty Kubernetes endpoint list often indicates selector mismatch or no ready matching pods.",
        "Certificate expiry, hostname mismatch, or incomplete certificate chains can cause client failures.",
        "A successful TCP connection alone does not prove that the HTTP route, authentication, or application is healthy."
      ],
      nextActions: [
        "Compare the Grafana configured port, Service targetPort, container port, and proxy upstream.",
        "Inspect load balancer target health and ingress controller logs.",
        "Correct DNS, routing, certificate, or service configuration only after confirming the intended target.",
        "Avoid permanently bypassing TLS verification or publishing Grafana directly to the internet."
      ]
    },
    {
      step: 6,
      title: "Inspect reverse proxy, ingress, and load balancer",
      objective:
        "Find failures between the client-facing endpoint and Grafana.",
      commands: [
        "kubectl describe ingress -n <namespace> <ingress-name>",
        "kubectl logs -n <ingress-namespace> <ingress-controller-pod> --since=30m",
        "kubectl get endpoints -n <namespace> <service-name> -o yaml",
        "nginx -t",
        "nginx -T"
      ],
      expectedResults: [
        "Ingress rules point to the intended Service and port.",
        "Upstream endpoints are healthy and reachable.",
        "Nginx configuration tests pass if Nginx is the active proxy.",
        "Load balancer health checks use a suitable path, protocol, and port."
      ],
      interpretation: [
        "502 often means the proxy cannot establish a valid upstream response.",
        "504 commonly indicates an upstream timeout.",
        "Repeated upstream connection failures can indicate an incorrect port, no listener, network restrictions, or overloaded Grafana.",
        "An incorrect path prefix or subpath configuration can cause redirects, missing assets, or route failures.",
        "Configuration output may contain sensitive details; redact before sharing."
      ],
      nextActions: [
        "Compare the proxy upstream with the actual Grafana Service and listener.",
        "Check readiness and target health before changing proxy settings.",
        "Use nginx -t before any approved Nginx reload.",
        "For Kubernetes-managed ingress, update the source manifests or Helm values rather than manually editing a generated pod."
      ]
    },
    {
      step: 7,
      title: "Check database connectivity and storage",
      objective:
        "Determine whether Grafana can access its configured database safely.",
      commands: [
        "grep -nE '^type[[:space:]]*=|^path[[:space:]]*=|^url[[:space:]]*=' /etc/grafana/grafana.ini",
        "systemctl status postgresql --no-pager",
        "pg_isready -h <database-host> -p 5432",
        "kubectl get pvc,pv -n <namespace>",
        "kubectl describe pvc -n <namespace> <pvc-name>"
      ],
      expectedResults: [
        "The effective database type and storage configuration are known.",
        "The database service or managed endpoint is reachable.",
        "Persistent volumes are bound and mounted as expected.",
        "Storage capacity and access permissions are adequate."
      ],
      interpretation: [
        "Grafana may use SQLite, PostgreSQL, MySQL, or a managed database depending on deployment configuration.",
        "Do not assume PostgreSQL is used simply because Grafana is unavailable.",
        "A reachable database port does not guarantee valid credentials, a healthy connection pool, or successful migrations.",
        "SQLite deployments may fail when the database path is unavailable, unwritable, or on unsuitable shared storage.",
        "A pending PVC can prevent a pod from starting or mounting its data."
      ],
      nextActions: [
        "Verify the configured database backend and supported connectivity test.",
        "Check database logs, connection limits, credentials, permissions, storage health, and migration status.",
        "Never print secrets or copy a live database file without following its consistency requirements.",
        "Before restoring a backup or rolling back a schema change, confirm the recovery point, compatibility, and data-loss implications."
      ]
    },
    {
      step: 8,
      title: "Investigate plugins, configuration, and recent changes",
      objective:
        "Determine whether a deployment or configuration change introduced the outage.",
      commands: [
        "grafana-server -v",
        "git status --short",
        "git log -10 --oneline",
        "kubectl rollout history deployment/<grafana-deployment> -n <namespace>",
        "kubectl describe deployment -n <namespace> <grafana-deployment>"
      ],
      expectedResults: [
        "The installed Grafana version is known.",
        "Recent commits and deployment revisions can be correlated with the incident.",
        "The running deployment's image and configuration source can be identified."
      ],
      interpretation: [
        "A newly introduced plugin can cause startup failures or compatibility issues.",
        "Configuration mistakes may affect the HTTP port, root URL, database, authentication, or data sources.",
        "An unexpected image tag or configuration revision can explain a sudden failure.",
        "A clean local Git tree does not prove that the running production configuration matches the repository."
      ],
      nextActions: [
        "Compare the deployed revision with the last known-good revision.",
        "Validate plugin compatibility against the deployed Grafana version.",
        "Check provisioning files, environment variables, mounted ConfigMaps, and secret references without exposing secret values.",
        "Prefer a reviewed rollback to a known-good deployment when evidence points to a recent release."
      ]
    },
    {
      step: 9,
      title: "Validate the recovery and close the incident",
      objective:
        "Confirm that service is restored and the original failure will not immediately recur.",
      commands: [
        "curl -fsS https://grafana.example.com/api/health",
        "kubectl get pods,svc,endpoints -n <namespace>",
        "kubectl get events -n <namespace> --sort-by=.lastTimestamp",
        "systemctl is-active grafana-server"
      ],
      expectedResults: [
        "The health endpoint returns the expected healthy status.",
        "The service has ready endpoints and stable pod or process state.",
        "No new crash loops, storage failures, or repeated dependency errors appear.",
        "Representative dashboards, queries, and authenticated user access work."
      ],
      interpretation: [
        "A healthy health endpoint alone does not prove that every dashboard, plugin, datasource, or user workflow is working.",
        "A service that recovers briefly and fails again may still have a resource, dependency, or configuration issue.",
        "The monitoring and alerting path must be verified independently."
      ],
      nextActions: [
        "Test critical dashboards and representative datasource queries.",
        "Confirm Prometheus target health, rule evaluation, and Alertmanager delivery.",
        "Monitor restart counts, latency, error rates, CPU, memory, disk, and dependency health through an observation window.",
        "Document the verified root cause, remediation, rollback decision, and follow-up actions."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Browser reports DNS_PROBE_FINISHED_NXDOMAIN or name resolution failure",
      likelyCauses: [
        "Incorrect DNS record",
        "Resolver failure",
        "Recent DNS change not propagated",
        "Wrong hostname or environment URL"
      ],
      verification: [
        "Run getent hosts grafana.example.com.",
        "Compare resolver results from affected and unaffected networks.",
        "Inspect authoritative DNS and recent DNS changes."
      ],
      resolution: [
        "Correct the record or resolver issue through the approved DNS process.",
        "Validate the expected endpoint before testing direct IP access.",
        "Confirm resolution from the affected client network."
      ]
    },
    {
      symptom: "HTTP 502 or 504 from ingress or load balancer",
      likelyCauses: [
        "Grafana is not listening",
        "Incorrect Service port or proxy upstream",
        "No healthy endpoints",
        "Network policy or firewall restriction",
        "Grafana overloaded or unresponsive"
      ],
      verification: [
        "Compare local Grafana health with public endpoint health.",
        "Inspect Service endpoints and ingress controller logs.",
        "Check listener ports and load balancer target health."
      ],
      resolution: [
        "Fix the confirmed upstream, endpoint, routing, or capacity problem.",
        "Validate proxy configuration before reload.",
        "Verify external health and critical dashboard access."
      ]
    },
    {
      symptom: "systemd reports Grafana failed",
      likelyCauses: [
        "Invalid configuration",
        "Database unavailable",
        "File permission failure",
        "Plugin loading failure",
        "Missing or incompatible binary or dependency"
      ],
      verification: [
        "Inspect journalctl output around the first failure.",
        "Check service exit status and configured paths.",
        "Validate the effective configuration and recent changes."
      ],
      resolution: [
        "Correct the confirmed configuration or dependency issue.",
        "Use the package or deployment's supported recovery method.",
        "Restart only after preserving evidence and verifying the fix."
      ]
    },
    {
      symptom: "Kubernetes Grafana pod is CrashLoopBackOff",
      likelyCauses: [
        "Application startup error",
        "OOMKilled container",
        "Invalid mounted configuration",
        "Database migration or connectivity failure",
        "Plugin incompatibility"
      ],
      verification: [
        "Run kubectl describe pod and inspect events.",
        "Read current and previous container logs.",
        "Inspect restart count, termination reason, resource limits, and mounts."
      ],
      resolution: [
        "Correct the specific startup, dependency, resource, or configuration issue.",
        "Change Helm values or source manifests through the approved workflow.",
        "Verify readiness and stability after rollout."
      ]
    },
    {
      symptom: "Grafana loads but dashboards are empty",
      likelyCauses: [
        "Datasource unavailable",
        "Prometheus query returns no data",
        "Incorrect time range",
        "Dashboard variables or labels changed",
        "Datasource permissions or query errors"
      ],
      verification: [
        "Inspect datasource health and dashboard query errors.",
        "Check Prometheus targets and query the metric independently.",
        "Verify the time range, labels, variables, and datasource selection."
      ],
      resolution: [
        "Restore the datasource or correct the query or variable based on evidence.",
        "Confirm the metric exists in the selected time range.",
        "Retest critical panels and alerts independently."
      ]
    },
    {
      symptom: "Grafana database errors or migration failures",
      likelyCauses: [
        "Database unreachable",
        "Invalid credentials",
        "Connection limit exhausted",
        "Storage full or permissions incorrect",
        "Incompatible or incomplete migration"
      ],
      verification: [
        "Inspect database connection errors and database service health.",
        "Check storage capacity, permissions, connection usage, and recent upgrades.",
        "Confirm the Grafana version and migration history."
      ],
      resolution: [
        "Restore the database dependency or correct the confirmed configuration.",
        "Follow vendor-supported backup and migration recovery procedures.",
        "Do not delete database files or manually reverse schema migrations without an approved recovery plan."
      ]
    },
    {
      symptom: "Grafana repeatedly runs out of memory",
      likelyCauses: [
        "Insufficient container or host memory",
        "Large dashboard queries",
        "Plugin leak or abnormal resource consumption",
        "Concurrent workload increase"
      ],
      verification: [
        "Check cgroup or container memory metrics and OOM events.",
        "Compare memory usage with request volume and recent dashboard changes.",
        "Identify the affected process and inspect version and plugin changes."
      ],
      resolution: [
        "Reduce excessive query load or concurrency where appropriate.",
        "Correct resource limits based on measured demand and capacity planning.",
        "Test plugin upgrades or rollbacks in a controlled environment."
      ]
    }
  ],

  advancedScenarios: [
    {
      scenario: "Kubernetes readiness probe fails while the container is running",
      symptoms: [
        "Pod status remains Running but READY is 0/1.",
        "Service endpoints are empty or exclude the Grafana pod.",
        "Ingress returns 502 or 503."
      ],
      investigation: [
        "Run kubectl describe pod -n <namespace> <grafana-pod>.",
        "Inspect readiness probe path, port, timeout, initial delay, and failure threshold.",
        "Check whether Grafana is bound to the expected interface and port.",
        "Review startup time and database initialization logs."
      ],
      resolution: [
        "Correct the probe path or port only when it does not match the actual application configuration.",
        "Tune probe timing based on measured startup behavior, not simply to hide an unhealthy application.",
        "Check endpoints after the pod becomes ready."
      ],
      prevention: [
        "Test probes in staging.",
        "Alert on readiness failures and sustained zero ready replicas.",
        "Use startup probes where appropriate for slow-starting workloads."
      ]
    },
    {
      scenario: "Grafana is healthy locally but unavailable through Ingress",
      symptoms: [
        "Local API health succeeds.",
        "External URL returns 502, 503, or 504.",
        "Application logs show few or no corresponding requests."
      ],
      investigation: [
        "Inspect Service selectors and endpoint addresses.",
        "Compare service port, targetPort, container listener, and ingress backend.",
        "Review network policies and ingress controller logs.",
        "Check load balancer health checks and routing."
      ],
      resolution: [
        "Correct the confirmed Service, ingress, routing, or health-check mismatch.",
        "Apply the change through the source configuration and approved rollout."
      ],
      prevention: [
        "Add synthetic external health checks.",
        "Validate Service endpoints and ingress routes in CI/CD.",
        "Monitor proxy upstream error rates."
      ]
    },
    {
      scenario: "Database connection pool exhaustion",
      symptoms: [
        "Grafana logs show database connection errors or timeouts.",
        "Login, dashboard loading, or API requests become slow.",
        "Database connections approach the configured limit."
      ],
      investigation: [
        "Confirm the actual Grafana database backend.",
        "Inspect database connection count, server limits, and Grafana connection settings.",
        "Correlate connection usage with request volume and other applications sharing the database."
      ],
      resolution: [
        "Restore database availability and address the actual connection bottleneck.",
        "Tune connection limits only after checking total database capacity.",
        "Avoid increasing connection pools blindly because this may overload the database."
      ],
      prevention: [
        "Monitor database connections, latency, and errors.",
        "Set capacity limits and test peak concurrency.",
        "Review query and connection behavior after upgrades."
      ]
    },
    {
      scenario: "Disk full prevents Grafana from starting",
      symptoms: [
        "Logs show write failures or database errors.",
        "Grafana restarts or fails to initialize.",
        "Disk usage or inode usage reaches the operational limit."
      ],
      investigation: [
        "Run df -h and df -i.",
        "Use du -xhd1 <approved-path> to identify large directories on supported systems.",
        "Inspect log growth, temporary files, container storage, and database volume usage."
      ],
      resolution: [
        "Identify the actual consumer before cleanup.",
        "Use approved log rotation, retention, or capacity expansion procedures.",
        "Never remove active database files, WAL files, or persistent data as generic cleanup."
      ],
      prevention: [
        "Alert before filesystem capacity reaches critical thresholds.",
        "Monitor inode usage and log growth.",
        "Set retention policies and capacity forecasts."
      ]
    },
    {
      scenario: "TLS certificate expired or hostname mismatch",
      symptoms: [
        "Browsers show certificate warnings.",
        "Synthetic probes report TLS handshake errors.",
        "Clients fail even when Grafana is healthy internally."
      ],
      investigation: [
        "Run openssl s_client -connect grafana.example.com:443 -servername grafana.example.com </dev/null.",
        "Inspect certificate expiry, subject alternative names, and certificate chain.",
        "Check certificate controller or renewal logs."
      ],
      resolution: [
        "Renew or replace the certificate using the approved certificate management process.",
        "Verify the complete certificate chain and hostname.",
        "Confirm external clients trust the endpoint."
      ],
      prevention: [
        "Alert on certificate expiry.",
        "Monitor renewal failures.",
        "Test certificate deployment and reload procedures."
      ]
    },
    {
      scenario: "Grafana upgrade or plugin change causes startup failure",
      symptoms: [
        "The outage starts immediately after a new image or plugin rollout.",
        "Logs contain plugin initialization, compatibility, or migration errors.",
        "The previous version was healthy."
      ],
      investigation: [
        "Compare the deployed image digest and release revision.",
        "Review plugin versions and supported Grafana compatibility.",
        "Inspect startup logs and migration status.",
        "Check whether configuration or database schema changes accompanied the release."
      ],
      resolution: [
        "Follow the approved rollback procedure if the new release is the confirmed cause.",
        "Use a compatible image and plugin set.",
        "Treat database migrations as a separate recovery concern before downgrading."
      ],
      prevention: [
        "Pin tested image versions and plugin versions.",
        "Run upgrade tests against a representative backup or staging environment.",
        "Define rollback compatibility and database recovery plans before production upgrades."
      ]
    },
    {
      scenario: "Grafana UI works but Prometheus data is missing",
      symptoms: [
        "Grafana homepage and dashboards open.",
        "Panels show No data or datasource errors.",
        "Some metrics or targets are missing."
      ],
      investigation: [
        "Check datasource health and the configured Prometheus URL.",
        "Inspect Prometheus targets and scrape errors.",
        "Run the relevant PromQL query directly in Prometheus.",
        "Verify time range, labels, recording rules, and authentication."
      ],
      resolution: [
        "Fix the confirmed datasource, scraping, query, or permissions issue.",
        "Verify that the metric exists for the selected time range.",
        "Do not treat a working Grafana UI as proof that monitoring data is healthy."
      ],
      prevention: [
        "Monitor Prometheus target availability and scrape failures.",
        "Create synthetic queries for critical metrics.",
        "Alert on missing telemetry for important services."
      ]
    },
    {
      scenario: "Grafana is unavailable during a wider infrastructure outage",
      symptoms: [
        "Grafana, database, DNS, or shared infrastructure becomes unavailable together.",
        "Multiple monitoring tools show correlated failures.",
        "The incident coincides with a region, cluster, or network event."
      ],
      investigation: [
        "Check cloud or infrastructure provider health.",
        "Use an independent monitoring path if available.",
        "Compare failures across regions and shared dependencies.",
        "Confirm whether the outage affects Grafana alone or the entire observability stack."
      ],
      resolution: [
        "Follow the provider or infrastructure disaster-recovery procedure.",
        "Use an approved alternate monitoring path while the primary stack is unavailable.",
        "Avoid making broad infrastructure changes based only on incomplete telemetry."
      ],
      prevention: [
        "Separate critical alerting from the Grafana UI dependency.",
        "Document alternate dashboards, logs, and escalation paths.",
        "Test observability disaster recovery."
      ]
    }
  ],

  recoveryProcedures: [
    {
      situation: "systemd-managed Grafana failed after a confirmed configuration fix",
      procedure: [
        "Preserve logs and identify the exact configuration error.",
        "Back up the affected configuration using the organization's approved process.",
        "Validate the configuration against the deployed version and service setup.",
        "Confirm dependencies are healthy before restarting.",
        "Use systemctl restart grafana-server only after approval and evidence collection."
      ],
      validation: [
        "Run systemctl is-active grafana-server.",
        "Check journalctl for new errors.",
        "Test the local health endpoint and the public URL.",
        "Verify dashboards, authentication, datasource queries, and alerting independently."
      ],
      rollback: [
        "If the new configuration makes the service worse, restore the known-good configuration using the approved procedure.",
        "Validate file ownership and permissions.",
        "Restart only after the rollback configuration has been reviewed."
      ]
    },
    {
      situation: "Docker-managed Grafana container is unhealthy",
      procedure: [
        "Identify the exact container and compose project.",
        "Collect docker inspect output, logs, exit code, mounts, and health status.",
        "Check whether the container is unhealthy due to Grafana or an incorrect health check.",
        "Correct the source configuration or dependency issue.",
        "Recreate the service only through the approved Compose or deployment workflow."
      ],
      validation: [
        "Confirm the intended image, mounts, network, and environment configuration.",
        "Check container health and application logs.",
        "Test the published endpoint and representative dashboard workflows."
      ],
      rollback: [
        "Restore the previous known-good image or Compose revision if the deployment caused the outage.",
        "Preserve persistent volumes and database state.",
        "Do not use docker compose down -v as a generic recovery command."
      ]
    },
    {
      situation: "Kubernetes Grafana deployment is unhealthy",
      procedure: [
        "Capture pod descriptions, current and previous logs, events, and rollout history.",
        "Identify whether the failure is in the image, configuration, dependency, probe, resource limit, or storage.",
        "Correct the source manifests, Helm values, or GitOps configuration.",
        "Apply the reviewed change through the standard delivery mechanism.",
        "Wait for the deployment to become available and investigate any new failures."
      ],
      validation: [
        "Run kubectl rollout status deployment/<grafana-deployment> -n <namespace>.",
        "Check ready replicas, pod restarts, Service endpoints, and ingress health.",
        "Test API health, authentication, critical dashboards, and datasource queries."
      ],
      rollback: [
        "If the rollout is confirmed to be faulty, use the approved rollback procedure.",
        "For Helm-managed deployments, review the release history and values before rollback.",
        "For GitOps-managed deployments, reconcile the repository state so the controller does not reapply the faulty revision.",
        "Assess database migration compatibility before reverting the application image."
      ]
    },
    {
      situation: "Database or persistent storage failure",
      procedure: [
        "Confirm the backend type and identify the affected database or volume.",
        "Check storage capacity, mount state, database health, permissions, and logs.",
        "Confirm backup availability and recovery-point objectives.",
        "Use the database or storage team's approved recovery procedure.",
        "Obtain approval before restore, failover, or destructive storage operations."
      ],
      validation: [
        "Confirm database connectivity and successful Grafana initialization.",
        "Check dashboard definitions, users, folders, datasource configuration, and required metadata.",
        "Verify the service remains stable after recovery."
      ],
      rollback: [
        "Do not delete or recreate a persistent volume as a troubleshooting shortcut.",
        "Document possible data loss and restore point before restoring backups.",
        "Use a compatible backup and vendor-supported database recovery procedure."
      ]
    }
  ],

  cicdTroubleshooting: [
    "Store Grafana provisioning files, dashboard definitions, datasource definitions, and deployment configuration in version control where appropriate.",
    "Run YAML, JSON, Helm, and Kubernetes manifest validation before deployment.",
    "Check Grafana image and plugin compatibility before upgrading.",
    "Use immutable image tags or digests rather than relying on an uncontrolled latest tag.",
    "Run smoke tests against the deployed health endpoint after rollout.",
    "Validate Service selectors, ports, probes, ingress routes, and persistent storage configuration.",
    "Use environment-specific configuration and keep secrets in an approved secret manager.",
    "Require code review and production approval for configuration, database, and infrastructure changes.",
    "Deploy to staging first and test startup, authentication, datasource connectivity, dashboard provisioning, and rollback.",
    "Use canary or progressive rollout strategies when supported by the deployment architecture.",
    "Check rollout status and health gates before allowing downstream deployment stages to continue.",
    "Fail the pipeline when required health checks fail; do not automatically mark an unhealthy Grafana deployment successful.",
    "Keep a known-good image and configuration revision available for recovery.",
    "For GitOps deployments, investigate reconciliation status and the actual applied revision.",
    "After recovery, add a regression test for the confirmed root cause."
  ],

  monitoringAndPrevention: [
    "Monitor Grafana API health from an external synthetic probe.",
    "Alert on sustained endpoint failures rather than a single transient probe failure.",
    "Monitor HTTP 5xx rates, request latency, process restarts, ready replicas, CPU, memory, and disk capacity.",
    "Monitor database availability, connection exhaustion, latency, and storage errors.",
    "For Kubernetes, alert on unavailable replicas, readiness failures, crash loops, pending PVCs, and repeated restarts.",
    "Monitor ingress upstream failures, load balancer target health, DNS resolution, and TLS certificate expiry.",
    "Monitor Prometheus target availability and alert-rule evaluation independently of the Grafana UI.",
    "Use Alertmanager or another independent alert-delivery path for critical alerts where feasible.",
    "Create a synthetic datasource query to detect Grafana-up-but-no-data incidents.",
    "Test on-call notifications and escalation policies regularly.",
    "Maintain a known-good deployment revision and tested recovery instructions.",
    "Set disk, inode, memory, connection, and request-capacity thresholds based on actual workload.",
    "Review dashboard queries that return excessive data or cause high latency.",
    "Review plugins and upgrades for compatibility before production rollout.",
    "Run periodic backup restoration tests for Grafana's database and other persistent state.",
    "Conduct observability disaster-recovery exercises and document the expected monitoring blind spot."
  ],

  incidentRunbook: [
    "1. Acknowledge the incident and record the UTC start time.",
    "2. Identify the affected Grafana instance, URL, environment, and business services.",
    "3. Assign an incident owner and notify the relevant platform or SRE team.",
    "4. Test external health and determine whether the failure is DNS, proxy, Grafana, database, or a wider infrastructure problem.",
    "5. Capture logs, events, deployment revisions, resource metrics, and recent changes before altering the system.",
    "6. Verify whether independent monitoring, Prometheus rule evaluation, and alert delivery remain functional.",
    "7. Choose a remediation supported by evidence and obtain the required approval.",
    "8. Apply one controlled change at a time and record the timestamp and outcome.",
    "9. Validate endpoint health, authentication, critical dashboards, datasource queries, and alert delivery.",
    "10. Observe service stability and confirm no repeated restarts or resource failures.",
    "11. Communicate recovery status and any remaining monitoring limitations.",
    "12. Document root cause, contributing factors, recovery actions, and prevention work.",
    "13. Hold a blameless review for significant incidents and track follow-up actions to completion."
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Diagnose a stopped systemd service",
      objective: "Learn to distinguish service state from the original failure.",
      steps: [
        "Use a disposable Linux VM with Grafana installed.",
        "Inspect systemctl status grafana-server.",
        "Review journalctl logs and identify the first meaningful error.",
        "Correct the lab's deliberately introduced configuration error.",
        "Start the service and verify the health endpoint."
      ],
      successCriteria: [
        "The root cause is supported by log evidence.",
        "The service becomes active without repeated restarts.",
        "The health endpoint returns the expected result."
      ]
    },
    {
      title: "Lab 2 — Diagnose a Docker health-check failure",
      objective: "Differentiate a running container from a healthy application.",
      steps: [
        "Use a disposable Compose environment.",
        "Inspect docker compose ps and docker inspect health information.",
        "Read container logs and compare the health-check URL and port with the actual listener.",
        "Correct the lab configuration and recreate the service through Compose."
      ],
      successCriteria: [
        "The container reports healthy.",
        "The health check tests the actual service rather than an unrelated process.",
        "The service remains available after recreation."
      ]
    },
    {
      title: "Lab 3 — Investigate Kubernetes CrashLoopBackOff",
      objective: "Use events and previous logs to isolate startup failures.",
      steps: [
        "Deploy Grafana into a disposable Kubernetes namespace.",
        "Inspect kubectl describe pod and current and previous logs.",
        "Identify the intentionally introduced startup problem.",
        "Correct the source configuration and perform a controlled rollout.",
        "Check readiness and rollout status."
      ],
      successCriteria: [
        "The cause is identified from evidence.",
        "The pod becomes ready and restart counts stop increasing.",
        "The Service has ready endpoints."
      ]
    },
    {
      title: "Lab 4 — Simulate a reverse proxy 502",
      objective: "Trace a request through the proxy to the upstream service.",
      steps: [
        "Use a local or disposable test proxy and Grafana instance.",
        "Introduce an incorrect upstream port in the lab.",
        "Compare local API health with proxy health.",
        "Inspect proxy logs and validate the corrected configuration before reload."
      ],
      successCriteria: [
        "The proxy failure is reproduced and explained.",
        "The upstream port is corrected.",
        "The external health endpoint succeeds."
      ]
    },
    {
      title: "Lab 5 — Diagnose a full filesystem",
      objective: "Investigate disk and inode pressure safely.",
      steps: [
        "Use a disposable VM or test filesystem only.",
        "Inspect df -h and df -i.",
        "Identify the directory consuming capacity.",
        "Use a controlled test cleanup or expand the test filesystem.",
        "Recheck service health and filesystem usage."
      ],
      successCriteria: [
        "The exact resource constraint is identified.",
        "No live database or production data is deleted.",
        "Capacity alerts are proposed."
      ]
    },
    {
      title: "Lab 6 — Simulate datasource failure",
      objective: "Separate Grafana UI health from metrics availability.",
      steps: [
        "Use a test Grafana and Prometheus deployment.",
        "Temporarily configure an invalid datasource URL in the lab.",
        "Observe Grafana health, datasource health, and panel errors.",
        "Correct the URL and run a representative PromQL query."
      ],
      successCriteria: [
        "The UI and datasource failures are distinguished.",
        "The correct metric query returns data.",
        "A datasource failure alert is documented."
      ]
    },
    {
      title: "Lab 7 — Practice a controlled rollback",
      objective: "Recover from a faulty test deployment without losing persistent data.",
      steps: [
        "Deploy two known-good test revisions.",
        "Introduce a reversible failure in the newer revision.",
        "Collect evidence and identify the faulty revision.",
        "Perform the approved rollback in the disposable environment.",
        "Check application health and database compatibility."
      ],
      successCriteria: [
        "The rollback target is verified.",
        "Persistent state is preserved.",
        "The rollback and validation steps are documented."
      ]
    },
    {
      title: "Lab 8 — Build independent monitoring",
      objective: "Detect Grafana outages even when its UI is unavailable.",
      steps: [
        "Configure an external synthetic health probe.",
        "Create a test alert for sustained health-check failure.",
        "Send the test notification through an independent alert-delivery path.",
        "Simulate a test outage and restore the service.",
        "Verify alert firing and recovery notifications."
      ],
      successCriteria: [
        "The outage is detected independently of the Grafana UI.",
        "The notification reaches the intended test destination.",
        "The alert returns to normal after recovery."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "1. Grafana is down. What do you check first?",
      answer:
        "Confirm impact and environment, test the external health endpoint, compare it with local health, and identify the deployment type. Then inspect service state, logs, resources, and dependencies before making changes."
    },
    {
      question: "2. What does HTTP 502 mean?",
      answer:
        "A gateway or proxy received an invalid response from its upstream or could not complete the upstream exchange. Check upstream health, ports, routing, and proxy logs to identify the actual cause."
    },
    {
      question: "3. What is the difference between 502 and 504?",
      answer:
        "502 generally indicates an invalid or failed upstream response. 504 indicates that a gateway did not receive a timely upstream response. Exact behavior depends on the proxy and application."
    },
    {
      question: "4. Grafana process is active, but the URL is down. Why?",
      answer:
        "The listener may be incorrect, the proxy upstream may be misconfigured, DNS or TLS may fail, or network policy may block traffic. Compare local and external health."
    },
    {
      question: "5. What does /api/health check?",
      answer:
        "It provides a Grafana health endpoint, including application and database health information depending on the version. It does not prove every dashboard, datasource, or user workflow works."
    },
    {
      question: "6. What do you check for CrashLoopBackOff?",
      answer:
        "Use pod descriptions, events, current and previous logs, termination reason, restart count, resource limits, probes, mounted configuration, and dependency health."
    },
    {
      question: "7. How do you troubleshoot OOMKilled?",
      answer:
        "Check container termination details, memory metrics, Kubernetes events, host OOM logs where available, and recent workload changes. Fix the measured memory bottleneck or resource configuration."
    },
    {
      question: "8. What is the first step when the database is unavailable?",
      answer:
        "Confirm which database Grafana actually uses, inspect connectivity and database health, and review logs. Do not assume the backend or delete database files."
    },
    {
      question: "9. Why can a Kubernetes pod be Running but unavailable?",
      answer:
        "The pod may fail readiness probes, have no ready endpoints, listen on the wrong port, or be blocked by network policy. Running and Ready are different conditions."
    },
    {
      question: "10. How do you troubleshoot an empty dashboard?",
      answer:
        "Check datasource health, query errors, Prometheus targets, the selected time range, metric existence, labels, variables, permissions, and transformations."
    },
    {
      question: "11. Does Grafana going down mean Prometheus is down?",
      answer:
        "No. They are separate components. Check Prometheus targets, rule evaluation, and Alertmanager independently."
    },
    {
      question: "12. How do you check a DNS problem?",
      answer:
        "Use getent hosts or an approved DNS diagnostic, compare resolver results, inspect the intended record, and correlate with recent DNS changes."
    },
    {
      question: "13. How do you investigate TLS failure?",
      answer:
        "Inspect the certificate chain, expiry, hostname, SNI, and renewal-controller logs. Renew through the approved certificate-management process."
    },
    {
      question: "14. Why should you collect evidence before restarting?",
      answer:
        "Restarting can erase transient process state and complicate log correlation. Capture status, logs, events, resource metrics, and recent changes first when safe."
    },
    {
      question: "15. What do you do when the disk is full?",
      answer:
        "Identify the full mount or inode pool and determine what consumes space. Use approved cleanup or capacity expansion. Never delete database or persistent files blindly."
    },
    {
      question: "16. What causes database connection pool exhaustion?",
      answer:
        "High concurrency, leaked connections, slow operations, or insufficient backend capacity may exhaust the pool. Inspect actual connection usage before changing limits."
    },
    {
      question: "17. How do plugins cause Grafana outages?",
      answer:
        "An incompatible or faulty plugin can fail during startup or execution. Correlate plugin changes with logs and version compatibility, then test a supported fix or rollback."
    },
    {
      question: "18. How do you troubleshoot a proxy 502?",
      answer:
        "Compare local and external health, inspect upstream address and port, service endpoints, listener state, proxy logs, and network restrictions."
    },
    {
      question: "19. What is a safe production rollback?",
      answer:
        "A reviewed return to a known-good deployment and configuration revision, with compatibility checks for persistent data and migrations, followed by health validation."
    },
    {
      question: "20. What is the risk of rolling back after a database migration?",
      answer:
        "The older application may not support the newer schema. Confirm version compatibility and use an approved backup or migration recovery plan before rollback."
    },
    {
      question: "21. How can you detect Grafana being down if Grafana itself is unavailable?",
      answer:
        "Use an external synthetic probe and independent alert-delivery path, such as a separately monitored Prometheus and Alertmanager deployment or another monitoring platform."
    },
    {
      question: "22. What is the difference between liveness and readiness probes?",
      answer:
        "Liveness helps determine whether a container should be restarted. Readiness determines whether it should receive traffic. Incorrect probes can create unnecessary restarts or hide failures."
    },
    {
      question: "23. How do you investigate a sudden outage after deployment?",
      answer:
        "Correlate incident time with image, configuration, plugin, dependency, and infrastructure changes. Compare the last known-good revision and roll back only when evidence supports it."
    },
    {
      question: "24. What should a post-incident report include?",
      answer:
        "Impact, timeline, detection method, evidence, root cause, contributing factors, recovery actions, validation, communication, and owned prevention actions with deadlines."
    },
    {
      question: "25. How do you prevent recurrence?",
      answer:
        "Use independent synthetic monitoring, dependency alerts, capacity thresholds, tested backups, controlled upgrades, CI validation, runbooks, and disaster-recovery exercises."
    },
    {
      question: "26. Why can Grafana be healthy while monitoring is incomplete?",
      answer:
        "The UI may respond while datasource queries, Prometheus scraping, alert-rule evaluation, or notification delivery are failing. Validate each layer separately."
    },
    {
      question: "27. What is a monitoring blind spot?",
      answer:
        "A period when telemetry or alerting cannot reliably reveal system health. Document its duration and use an independent monitoring path during recovery."
    },
    {
      question: "28. How do you confirm a Grafana incident is fully resolved?",
      answer:
        "Confirm health endpoint, external access, authentication, critical dashboards, datasource queries, stable resources, no repeated restarts, and independent alert delivery."
    }
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Incident title: Grafana unavailable",
    "Environment / cluster / namespace:",
    "Incident commander / owner:",
    "Severity and justification:",
    "Start time (UTC):",
    "Detection time (UTC):",
    "Recovery time (UTC):",
    "Affected users, teams, and services:",
    "Monitoring and alerting blind spot:",
    "Initial symptoms and HTTP status:",
    "Evidence collected:",
    "Diagnostic commands and important outputs:",
    "Confirmed root cause:",
    "Contributing factors:",
    "Recent changes investigated:",
    "Remediation applied and approval:",
    "Rollback or recovery decision:",
    "Validation performed:",
    "Prometheus and Alertmanager verification:",
    "Data loss or security impact:",
    "What went well:",
    "What could be improved:",
    "Corrective actions, owners, and due dates:",
    "Runbook or CI/CD changes required:",
    "Incident closure approval:"
  ],

  officialReferences: [
    {
      title: "Grafana Documentation",
      url: "https://grafana.com/docs/grafana/latest/"
    },
    {
      title: "Grafana HTTP API — Health API",
      url: "https://grafana.com/docs/grafana/latest/developer-resources/api-reference/http-api/health/"
    },
    {
      title: "Grafana Configuration",
      url: "https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/"
    },
    {
      title: "Grafana Troubleshooting",
      url: "https://grafana.com/docs/grafana/latest/troubleshooting/"
    },
    {
      title: "Prometheus Documentation",
      url: "https://prometheus.io/docs/introduction/overview/"
    },
    {
      title: "Kubernetes Debugging Applications",
      url: "https://kubernetes.io/docs/tasks/debug/debug-application/"
    },
    {
      title: "Kubernetes Probes",
      url: "https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/"
    },
    {
      title: "Docker Container Logs",
      url: "https://docs.docker.com/reference/cli/docker/container/logs/"
    },
    {
      title: "systemd Journal",
      url: "https://www.freedesktop.org/software/systemd/man/latest/journalctl.html"
    }
  ]
};
