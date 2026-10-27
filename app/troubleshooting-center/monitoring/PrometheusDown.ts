export interface PrometheusDownGuide {
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

export const prometheusDownGuide: PrometheusDownGuide = {
  title: "Prometheus Down — Complete Production Troubleshooting Guide",
  category: "Monitoring / Prometheus / Grafana / Kubernetes / SRE",
  severity: "SEV-1 or SEV-2 depending on monitoring coverage and business impact",

  overview: `
Prometheus Down means the Prometheus server is unavailable, unhealthy,
unable to accept queries, or unable to ingest and retain metrics reliably.

A Prometheus outage can create a monitoring blind spot. Applications may
still serve traffic even when Prometheus is down. Conversely, Prometheus may
be reachable while scraping, storage, rule evaluation, or alert delivery
is broken.

Separate these failure categories before choosing a fix:

1. Process failure: Prometheus exits, crashes, or repeatedly restarts.
2. Availability failure: DNS, load balancer, ingress, service, or network
   prevents clients from reaching the server.
3. Resource exhaustion: CPU, memory, file descriptors, or disk capacity
   prevents reliable operation.
4. Storage failure: TSDB, WAL, persistent volume, filesystem, or permissions
   prevent startup or ingestion.
5. Configuration failure: Invalid configuration, rule files, flags, or
   incompatible changes prevent startup or correct operation.
6. Kubernetes failure: Pod scheduling, probes, PVC attachment, node pressure,
   service selectors, or rollout issues affect Prometheus.
7. Query failure: The API is reachable, but expensive queries, timeouts,
   or resource pressure make it appear unavailable.
8. Scrape failure: Prometheus is running, but application metrics are missing.
9. Alerting failure: Prometheus evaluates rules but Alertmanager or the
   notification destination is unavailable.
10. High availability failure: One replica is down, or all replicas and
    shared dependencies are affected.

The correct approach is to identify the first failing layer, preserve evidence,
recover safely, and validate the complete monitoring pipeline.
`,

  incidentScenario: `
At 09:42 UTC, the operations team receives a monitoring availability alert.
Grafana panels stop refreshing and the Prometheus API times out.

The application remains reachable, but the team cannot confirm whether
the error-rate and latency alerts are evaluating correctly.

The on-call engineer must determine:
- Is the Prometheus process running?
- Is the pod healthy and ready?
- Can the API be reached directly and through the normal access path?
- Did a deployment or configuration change precede the outage?
- Is the process blocked by memory, disk, or storage problems?
- Can the TSDB and WAL be opened safely?
- Are targets being scraped?
- Are rules evaluating and notifications being delivered?
- Is another healthy Prometheus replica available?
- What is the safest recovery path without losing additional data?

Do not immediately delete the pod, PVC, WAL, or TSDB directory.
First determine whether the failure is caused by the process, configuration,
network, resources, or persistent storage.
`,

  impactAssessment: [
    "Record the incident start time in UTC and the last known successful query.",
    "Identify the affected Prometheus instance, cluster, namespace, environment, and replicas.",
    "Determine whether only Grafana access is failing or direct Prometheus API requests also fail.",
    "Check whether applications are healthy independently of the monitoring platform.",
    "Determine whether scrape ingestion, recording rules, alert evaluation, or notifications are affected.",
    "Identify critical services that have lost monitoring coverage.",
    "Check whether an independent monitoring system or healthy HA replica is available.",
    "Determine whether data collection stopped, queries became unavailable, or both occurred.",
    "Assess whether autoscaling, capacity management, incident response, or SLO reporting depends on this instance.",
    "Set severity according to business impact and internal incident policy. An outage of the only production monitoring instance may require higher severity than the loss of one redundant replica."
  ],

  safetyChecks: [
    "Confirm the correct cluster, Prometheus instance, namespace, container, and environment before running commands.",
    "Start with read-only checks and preserve relevant logs and events.",
    "Check change approvals before modifying production configuration or restarting services.",
    "Do not delete the Prometheus PVC, TSDB directory, WAL, or block files as a first response.",
    "Do not run filesystem cleanup commands against a Prometheus data directory.",
    "Do not manually edit TSDB files or use unsupported database repair techniques.",
    "Avoid repeatedly restarting a crash-looping process before collecting logs and identifying the cause.",
    "Verify available disk space and inode capacity before attempting a recovery that may write additional data.",
    "Protect credentials, TLS keys, authorization headers, and sensitive labels in logs and shared output.",
    "Use the actual configuration source of truth: Helm values, Prometheus Operator resources, manifests, or version-controlled configuration.",
    "For stateful workloads, understand PVC attachment, replica ownership, and recovery implications before rescheduling or replacing a pod.",
    "If a second replica is available, confirm that it is genuinely healthy and independently reachable before relying on it."
  ],

  evidenceCollection: [
    "Record UTC timestamps for the alert, last successful query, pod restart, and first observed error.",
    "Capture Prometheus pod status, restart count, last termination reason, and recent events.",
    "Collect current and previous container logs when a container has restarted.",
    "Capture the exact API URL, HTTP status, response time, and whether access was direct or through a proxy.",
    "Record CPU, memory, disk space, inode usage, and PVC capacity.",
    "Capture the Prometheus image version, startup flags, configuration revision, and deployment history.",
    "Collect sanitized startup errors, TSDB errors, WAL errors, and configuration parsing errors.",
    "Inspect PVC binding, mount status, filesystem permissions, and node health.",
    "Check active targets, scrape errors, rule evaluation, and Alertmanager connectivity when the API becomes available.",
    "Compare the affected instance with healthy replicas or a recent known-good deployment.",
    "Record every change, command, observed output, interpretation, and recovery result."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm the outage and define its scope",
      objective:
        "Determine whether Prometheus is truly unavailable or only a client, proxy, or dashboard path is failing.",
      commands: [
        "date -u",
        "curl -sS -o /dev/null -w 'HTTP=%{http_code} TOTAL=%{time_total}s\\n' http://<prometheus-host>:9090/-/healthy",
        "curl -sS -o /dev/null -w 'HTTP=%{http_code} TOTAL=%{time_total}s\\n' http://<prometheus-host>:9090/-/ready",
        "curl -sS -o /dev/null -w 'HTTP=%{http_code} TOTAL=%{time_total}s\\n' http://<prometheus-host>:9090/api/v1/status/buildinfo",
        "kubectl get pods,svc,endpoints -n <namespace> -o wide"
      ],
      expectedResults: [
        "The health endpoint normally responds when the Prometheus process is healthy.",
        "The readiness endpoint indicates whether the server is ready to serve requests.",
        "The build information API provides version information when the API is reachable.",
        "Kubernetes resources show whether the pod, Service, and endpoints exist."
      ],
      interpretation: [
        "Connection refused commonly means no process is listening at that address and port, or the connection is actively rejected.",
        "A timeout may indicate routing, proxy, overload, firewall, or a process that is not responding.",
        "HTTP 200 from the health endpoint alone does not prove scraping, queries, rule evaluation, or alert delivery are healthy.",
        "A direct request may succeed while the ingress or load balancer fails.",
        "A failed request from one machine does not prove that all clients or replicas are affected."
      ],
      nextActions: [
        "Test the normal production access path and an approved direct endpoint separately.",
        "Identify whether the failure is process-wide, pod-specific, replica-specific, or limited to a proxy.",
        "If Kubernetes is used, continue to pod status and logs in Step 2.",
        "If the process is healthy but clients cannot connect, investigate networking and service routing."
      ]
    },
    {
      step: 2,
      title: "Inspect process, pod status, and restart history",
      objective:
        "Determine whether Prometheus has crashed, been restarted, or failed to become ready.",
      commands: [
        "kubectl get pods -n <namespace> -o wide",
        "kubectl describe pod -n <namespace> <prometheus-pod>",
        "kubectl logs -n <namespace> <prometheus-pod> --since=30m",
        "kubectl logs -n <namespace> <prometheus-pod> --previous",
        "kubectl get events -n <namespace> --sort-by=.lastTimestamp"
      ],
      expectedResults: [
        "Pod status shows Running, Pending, CrashLoopBackOff, ImagePullBackOff, or another state.",
        "The pod description provides restart counts, probe failures, scheduling errors, and container termination details.",
        "Current and previous logs expose startup failures and recent crashes.",
        "Events provide evidence of node pressure, failed mounts, or failed scheduling."
      ],
      interpretation: [
        "CrashLoopBackOff indicates repeated container failures; it is a symptom, not a root cause.",
        "OOMKilled indicates the container was terminated for memory pressure, but the reason for the memory increase still needs investigation.",
        "A Pending pod may be waiting for resources, storage, or scheduling constraints.",
        "Previous logs can be essential because the current container may have only recently restarted.",
        "A Running pod is not necessarily Ready or able to serve queries."
      ],
      nextActions: [
        "Record the termination reason and first relevant error.",
        "If the pod is OOMKilled, continue to resource and cardinality investigation.",
        "If startup fails, inspect configuration and TSDB errors in Step 3.",
        "If the pod is Pending, inspect scheduling and PVC details before attempting a restart."
      ]
    },
    {
      step: 3,
      title: "Inspect startup errors and validate configuration",
      objective:
        "Find invalid flags, malformed configuration, invalid rule files, or incompatible changes.",
      commands: [
        "kubectl logs -n <namespace> <prometheus-pod> --previous",
        "kubectl get prometheus -n <namespace> <prometheus-resource> -o yaml",
        "kubectl get configmap -n <namespace>",
        "promtool check config <prometheus-config-file>",
        "promtool check rules <rules-file>"
      ],
      expectedResults: [
        "Startup logs identify parsing failures, unsupported flags, file access errors, or TSDB initialization problems.",
        "The Prometheus resource and ConfigMaps reveal the intended configuration where applicable.",
        "promtool reports configuration or rule validation results when the correct files and compatible tool version are used."
      ],
      interpretation: [
        "Unknown flags or invalid configuration may prevent startup after an upgrade.",
        "A file present in Git is not proof that the running pod mounts that file.",
        "promtool checks must use the actual configuration files and a compatible Prometheus version.",
        "An invalid alert or recording rule can cause rule problems without necessarily preventing the entire Prometheus process from starting.",
        "Operator-managed configuration may be generated and should be corrected through the supported source resource."
      ],
      nextActions: [
        "Compare the active configuration and image version with the last known-good revision.",
        "Validate the proposed correction before deploying it.",
        "Revert only the confirmed faulty configuration change if rollback is approved.",
        "After rollout, verify readiness, API availability, and loaded rules."
      ]
    },
    {
      step: 4,
      title: "Investigate CPU, memory, disk, and inode exhaustion",
      objective:
        "Determine whether resource exhaustion is preventing Prometheus from starting or serving queries.",
      commands: [
        "kubectl top pod -n <namespace>",
        "kubectl describe pod -n <namespace> <prometheus-pod>",
        "kubectl describe node <node-name>",
        "df -h",
        "df -i",
        "free -h",
        "ps aux --sort=-%mem | head"
      ],
      expectedResults: [
        "Resource metrics show usage when Metrics Server or an equivalent monitoring source is available.",
        "Node and pod descriptions expose memory pressure, eviction, and resource-limit events.",
        "Filesystem commands show free capacity and inode availability on the machine where they are run."
      ],
      interpretation: [
        "A full filesystem can prevent WAL writes, block creation, or other operations.",
        "High inode usage can prevent file creation even when some disk space remains.",
        "OOMKilled may be caused by high series cardinality, expensive queries, workload changes, or an undersized memory limit.",
        "kubectl top may be unavailable if Metrics Server is not installed or functioning.",
        "Commands run on an administrator's machine do not show the Prometheus node's disk state unless they are executed in the relevant environment.",
        "Increasing a memory limit without understanding the growth pattern may only delay another failure."
      ],
      nextActions: [
        "Identify the exact filesystem, node, container, or resource limit under pressure.",
        "Check series growth, query load, and recent scrape configuration changes.",
        "Free capacity only through approved cleanup of known disposable files outside the TSDB data path.",
        "Plan resource or storage adjustments using observed demand and recovery requirements."
      ]
    },
    {
      step: 5,
      title: "Inspect TSDB, WAL, persistent volume, and filesystem access",
      objective:
        "Identify storage mounting, permission, capacity, or database initialization failures.",
      commands: [
        "kubectl get pvc -n <namespace>",
        "kubectl describe pvc -n <namespace> <prometheus-pvc>",
        "kubectl describe pod -n <namespace> <prometheus-pod>",
        "kubectl get events -n <namespace> --sort-by=.lastTimestamp",
        "kubectl logs -n <namespace> <prometheus-pod> --previous"
      ],
      expectedResults: [
        "The PVC should normally be bound to the expected storage claim.",
        "Pod details show whether the volume is mounted and whether container startup reports permission errors.",
        "Logs may reveal TSDB initialization, WAL replay, disk, or file-access failures."
      ],
      interpretation: [
        "A pending or unattached volume can prevent Prometheus from starting.",
        "Permission errors may result from ownership changes, security context changes, or filesystem behavior.",
        "WAL replay can take time after an unclean shutdown; slow startup is not automatically evidence of corruption.",
        "Disk-full errors require capacity investigation before retrying startup.",
        "Do not remove WAL files, block directories, or the PVC to force a clean start."
      ],
      nextActions: [
        "Confirm the intended PVC and storage backend before modifying anything.",
        "Resolve verified mount, capacity, ownership, or storage-system problems.",
        "If TSDB corruption is suspected, follow documented, version-appropriate recovery procedures and involve the storage owner.",
        "Verify that the server can reopen the database and query recent data after recovery."
      ]
    },
    {
      step: 6,
      title: "Check Kubernetes scheduling, probes, and node health",
      objective:
        "Find whether Kubernetes is preventing Prometheus from running or routing traffic to it.",
      commands: [
        "kubectl get pods -n <namespace> -o wide",
        "kubectl describe pod -n <namespace> <prometheus-pod>",
        "kubectl get nodes",
        "kubectl describe node <node-name>",
        "kubectl get svc,endpoints -n <namespace>",
        "kubectl get networkpolicy -n <namespace>"
      ],
      expectedResults: [
        "The pod is scheduled on a healthy node.",
        "Readiness and liveness probes have appropriate paths and ports.",
        "The Service has endpoints that correspond to eligible, ready Prometheus pods.",
        "Node conditions and events explain scheduling or resource pressure when present."
      ],
      interpretation: [
        "Incorrect probes can restart a slow-starting process or prevent traffic from reaching a healthy process.",
        "A selector mismatch can leave a Service without usable endpoints.",
        "Node pressure or volume attachment failures can prevent a replacement pod from becoming ready.",
        "Network policies may block traffic between Grafana, Prometheus, and monitoring components."
      ],
      nextActions: [
        "Correct the verified selector, probe, resource, or network policy issue.",
        "Avoid disabling probes permanently as a workaround.",
        "Wait for the pod to become Ready and verify Service endpoints.",
        "Test API access through the normal production route."
      ]
    },
    {
      step: 7,
      title: "Investigate DNS, Service routing, ingress, and TLS",
      objective:
        "Separate a healthy Prometheus process from an unavailable access path.",
      commands: [
        "kubectl get svc,endpoints -n <namespace>",
        "kubectl get ingress -A",
        "kubectl describe ingress -n <namespace> <ingress-name>",
        "getent hosts <prometheus-host>",
        "curl -v --connect-timeout 5 http://<prometheus-service>:9090/-/ready",
        "curl -vk --connect-timeout 5 https://<prometheus-host>/-/ready"
      ],
      expectedResults: [
        "DNS resolves to the intended endpoint.",
        "The Service routes to the correct ready pods.",
        "The ingress or load balancer routes requests to the intended service and port.",
        "TLS negotiation and HTTP responses provide evidence of the failing layer."
      ],
      interpretation: [
        "A direct pod or Service request succeeding while ingress fails points toward the proxy, routing, TLS, or authentication path.",
        "DNS resolution does not prove that the endpoint is reachable.",
        "TLS errors may indicate certificate expiry, trust issues, or hostname mismatch.",
        "curl -k disables certificate verification for that test; it is diagnostic only and must not become a permanent security fix."
      ],
      nextActions: [
        "Fix the confirmed DNS, endpoint, routing, TLS, or authentication issue.",
        "Retest using the normal secured production URL.",
        "Verify that Grafana and other clients can connect.",
        "Continue to ingestion and alerting checks after access is restored."
      ]
    },
    {
      step: 8,
      title: "Check whether Prometheus is scraping targets",
      objective:
        "Confirm that the server is ingesting metrics after its API becomes available.",
      commands: [
        "curl -fsS 'http://<prometheus-host>:9090/api/v1/targets'",
        "curl -fsSG 'http://<prometheus-host>:9090/api/v1/query' --data-urlencode 'query=up'",
        "curl -fsSG 'http://<prometheus-host>:9090/api/v1/query' --data-urlencode 'query=count by (job) (up)'",
        "curl -fsSG 'http://<prometheus-host>:9090/api/v1/query' --data-urlencode 'query=prometheus_tsdb_head_series'"
      ],
      expectedResults: [
        "The targets API lists discovered scrape targets and their current health details.",
        "The up query returns series for configured targets.",
        "Job-level aggregation helps determine whether failures are isolated or widespread.",
        "The TSDB head-series metric may be available to assess ingestion and series activity."
      ],
      interpretation: [
        "A healthy API does not prove that scrape ingestion is healthy.",
        "A large number of up values equal to 0 suggests target-side or shared connectivity failures.",
        "A sudden drop in target count may indicate a discovery or configuration problem.",
        "If Prometheus has recovered but targets are still down, there may be a second incident."
      ],
      nextActions: [
        "Check the target lastError and scrape URL for failed targets.",
        "Compare target count and ingestion behavior with the last known-good period.",
        "Resolve shared networking, discovery, or exporter problems.",
        "Verify that critical metric families have recent samples."
      ]
    },
    {
      step: 9,
      title: "Validate rule evaluation and Alertmanager connectivity",
      objective:
        "Confirm that monitoring and alerting functions have recovered, not just the HTTP API.",
      commands: [
        "curl -fsS 'http://<prometheus-host>:9090/api/v1/rules'",
        "curl -fsS 'http://<prometheus-host>:9090/api/v1/alerts'",
        "curl -fsSG 'http://<prometheus-host>:9090/api/v1/query' --data-urlencode 'query=up'",
        "kubectl logs -n <namespace> <prometheus-pod> --since=30m"
      ],
      expectedResults: [
        "The rules API lists loaded rules and evaluation status.",
        "The alerts API lists current alert states.",
        "Logs provide evidence of rule evaluation and Alertmanager communication."
      ],
      interpretation: [
        "Prometheus can be reachable while rule evaluation is failing.",
        "An alert in a pending state is not equivalent to an alert successfully delivered to an operator.",
        "Successful rule evaluation does not prove Alertmanager or the notification destination is healthy.",
        "Some alerting configurations use a separate system; verify the actual production architecture."
      ],
      nextActions: [
        "Confirm expected recording and alert rules are loaded.",
        "Inspect rule evaluation errors and Alertmanager connectivity.",
        "Perform an approved test notification when necessary.",
        "Verify that the receiving destination gets the notification."
      ]
    },
    {
      step: 10,
      title: "Check expensive queries and capacity after recovery",
      objective:
        "Determine whether query load, cardinality, or ingestion pressure caused the outage or is likely to repeat.",
      commands: [
        "curl -fsSG 'http://<prometheus-host>:9090/api/v1/query' --data-urlencode 'query=prometheus_tsdb_head_series'",
        "curl -fsSG 'http://<prometheus-host>:9090/api/v1/query' --data-urlencode 'query=prometheus_engine_query_duration_seconds'",
        "kubectl top pod -n <namespace>",
        "kubectl logs -n <namespace> <prometheus-pod> --since=30m"
      ],
      expectedResults: [
        "Available Prometheus metrics provide evidence about series count and query behavior.",
        "Resource metrics show whether CPU and memory usage remain high.",
        "Logs may show timeouts, cancellations, or resource-related failures."
      ],
      interpretation: [
        "Metric availability depends on Prometheus version and instrumentation; an absent internal metric does not itself prove a failure.",
        "High-cardinality labels can increase memory and storage pressure.",
        "Expensive dashboard queries can contribute to saturation, especially when many users refresh dashboards simultaneously.",
        "A resource increase may restore service but should be paired with investigation of workload growth."
      ],
      nextActions: [
        "Identify expensive queries and high-cardinality metric sources.",
        "Review query ranges, dashboard refresh intervals, and recording-rule opportunities.",
        "Adjust capacity only with evidence and an approved operational plan.",
        "Add alerts for the resource and workload conditions that contributed to the outage."
      ]
    },
    {
      step: 11,
      title: "Restore service using the least disruptive verified fix",
      objective:
        "Recover Prometheus while preserving existing data and avoiding unnecessary restarts.",
      commands: [
        "kubectl rollout status statefulset/<prometheus-statefulset> -n <namespace>",
        "kubectl get pods,pvc,svc -n <namespace>",
        "curl -fsS http://<prometheus-host>:9090/-/ready"
      ],
      expectedResults: [
        "The workload reports successful rollout when a rollout is in progress.",
        "The pod, storage claim, and Service are healthy.",
        "The readiness endpoint responds successfully."
      ],
      interpretation: [
        "These checks are appropriate only after the confirmed issue has been corrected and a rollout is actually required.",
        "Prometheus may be deployed as a StatefulSet, Deployment, or another managed workload; use the real resource type.",
        "A rollout status command does not repair an unrelated storage, networking, or configuration problem."
      ],
      nextActions: [
        "Apply the specific approved correction identified by earlier evidence.",
        "Do not run a generic rollout restart just because the server is down.",
        "Wait for readiness and verify the API, targets, rules, and metrics.",
        "If recovery worsens the incident, follow the approved rollback plan."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Prometheus container repeatedly restarts",
      likelyCauses: [
        "Invalid configuration or command-line flags",
        "OOMKilled",
        "TSDB or WAL startup failure",
        "Filesystem permissions or disk exhaustion",
        "Probe failures"
      ],
      verification: [
        "Inspect current and previous container logs.",
        "Review termination reason and restart count.",
        "Validate configuration and check storage events."
      ],
      resolution: [
        "Correct the verified startup, resource, storage, or probe issue.",
        "Restart only when appropriate for the confirmed recovery plan.",
        "Verify sustained readiness."
      ]
    },
    {
      symptom: "Prometheus process is healthy but API is inaccessible",
      likelyCauses: [
        "DNS failure",
        "Incorrect Service selector or port",
        "Ingress or load balancer issue",
        "Network policy or firewall",
        "TLS or authentication problem"
      ],
      verification: [
        "Compare direct endpoint access with the production URL.",
        "Inspect Services, endpoints, ingress, DNS, and certificates.",
        "Test from an approved client in the relevant network."
      ],
      resolution: [
        "Fix the confirmed access-path issue.",
        "Validate secured access from Grafana and other clients."
      ]
    },
    {
      symptom: "Pod is OOMKilled",
      likelyCauses: [
        "High series cardinality",
        "Expensive queries",
        "Increased scrape volume",
        "Memory limit too low for workload",
        "Unexpected workload or configuration change"
      ],
      verification: [
        "Inspect pod termination details and resource history.",
        "Compare head-series count and ingestion activity where available.",
        "Review recent scrape and instrumentation changes."
      ],
      resolution: [
        "Reduce the confirmed cardinality or query pressure.",
        "Adjust memory allocation based on measured workload and capacity.",
        "Verify stability across normal and peak traffic."
      ]
    },
    {
      symptom: "Prometheus fails to open its TSDB",
      likelyCauses: [
        "Disk full",
        "PVC mount failure",
        "Permission problem",
        "Filesystem or storage issue",
        "Possible TSDB or WAL corruption"
      ],
      verification: [
        "Inspect startup logs and PVC events.",
        "Check disk capacity and mount status.",
        "Determine whether the failure is a permission, capacity, or integrity error."
      ],
      resolution: [
        "Restore storage access or capacity through supported procedures.",
        "Follow documented recovery guidance if data corruption is confirmed.",
        "Preserve the data directory and involve the storage owner."
      ]
    },
    {
      symptom: "Prometheus API works but all targets are down",
      likelyCauses: [
        "Network outage",
        "DNS or service discovery failure",
        "Scrape configuration regression",
        "Authentication or TLS changes",
        "Exporter fleet outage"
      ],
      verification: [
        "Inspect target lastError values.",
        "Compare jobs, clusters, and endpoints.",
        "Review recent configuration and network changes."
      ],
      resolution: [
        "Restore the confirmed shared dependency or configuration.",
        "Validate representative targets from each affected job."
      ]
    },
    {
      symptom: "Prometheus is healthy but alerts are not delivered",
      likelyCauses: [
        "Rule evaluation errors",
        "Alertmanager unavailable",
        "Incorrect routing or inhibition rules",
        "Receiver authentication failure",
        "Notification destination unavailable"
      ],
      verification: [
        "Inspect the rules and alerts APIs.",
        "Check Alertmanager health and logs.",
        "Test notification delivery through the approved procedure."
      ],
      resolution: [
        "Correct the confirmed rule, routing, receiver, or destination problem.",
        "Verify end-to-end delivery and recovery notifications."
      ]
    }
  ],

  advancedScenarios: [
    {
      scenario: "Prometheus crashes after a configuration deployment",
      symptoms: [
        "Outage starts immediately after a rollout.",
        "Previous logs show parsing or unsupported configuration errors.",
        "The previous image or configuration was healthy."
      ],
      investigation: [
        "Compare the deployed image digest and configuration revision.",
        "Inspect startup logs for the first fatal error.",
        "Validate configuration and rule files using compatible promtool tooling.",
        "Confirm which ConfigMap, Secret, Helm values, or operator resource generates the active configuration."
      ],
      resolution: [
        "Revert the confirmed faulty revision or correct the invalid configuration.",
        "Deploy through the normal review and approval process.",
        "Verify startup, readiness, API access, targets, and rules."
      ],
      prevention: [
        "Add configuration and rule validation to CI.",
        "Test upgrades against the actual Prometheus version.",
        "Use staged rollout and an explicit rollback plan."
      ]
    },
    {
      scenario: "Prometheus is OOMKilled after series cardinality increases",
      symptoms: [
        "Memory use rises before the outage.",
        "Restart history reports OOMKilled.",
        "A recent release adds high-cardinality labels or targets."
      ],
      investigation: [
        "Compare series growth and memory use with the incident timeline.",
        "Inspect newly added labels such as request IDs, user IDs, or arbitrary URLs.",
        "Review scrape target count and scrape volume.",
        "Inspect query load and recent dashboard changes."
      ],
      resolution: [
        "Remove or redesign inappropriate unbounded labels at the instrumentation source.",
        "Reduce unnecessary scrape volume or query load using a reviewed change.",
        "Adjust resource limits or capacity only after evaluating expected workload."
      ],
      prevention: [
        "Add cardinality reviews to code review.",
        "Monitor series growth and memory pressure.",
        "Test high-load behavior before production rollout."
      ]
    },
    {
      scenario: "PVC is pending or cannot attach",
      symptoms: [
        "Prometheus pod is Pending or stuck during startup.",
        "Events mention volume attachment, mount, or scheduling problems.",
        "The server cannot access its persistent data directory."
      ],
      investigation: [
        "Inspect the PVC and underlying storage class.",
        "Review pod scheduling and volume attachment events.",
        "Check the storage provider and node availability.",
        "Verify that no other active process is improperly using the same data volume."
      ],
      resolution: [
        "Correct the confirmed storage, scheduling, or attachment problem.",
        "Follow storage-provider procedures for recovery.",
        "Preserve the existing TSDB and WAL."
      ],
      prevention: [
        "Monitor PVC capacity and storage health.",
        "Test stateful rescheduling and recovery.",
        "Document the expected volume ownership and recovery sequence."
      ]
    },
    {
      scenario: "Prometheus readiness fails because startup takes longer",
      symptoms: [
        "The container starts but remains unready.",
        "WAL replay or TSDB initialization takes longer than expected.",
        "Kubernetes repeatedly restarts the pod due to probes."
      ],
      investigation: [
        "Inspect startup logs and actual initialization duration.",
        "Review liveness and readiness probe configuration.",
        "Check storage performance and WAL size.",
        "Determine whether the liveness probe is killing a process that is still making progress."
      ],
      resolution: [
        "Correct probe settings only if evidence confirms they are too aggressive.",
        "Resolve underlying storage or startup performance issues.",
        "Verify that probes still detect genuinely unhealthy processes."
      ],
      prevention: [
        "Test restart behavior with realistic data volumes.",
        "Use appropriate startup and readiness checks.",
        "Monitor restart count and startup duration."
      ]
    },
    {
      scenario: "One Prometheus replica is down in an HA deployment",
      symptoms: [
        "One replica is unavailable.",
        "Another replica appears healthy.",
        "Some dashboards or queries still work."
      ],
      investigation: [
        "Verify the health and data freshness of every replica independently.",
        "Check whether clients or load balancers can reach the healthy replica.",
        "Confirm replica configuration, external labels, and scrape coverage.",
        "Check whether alerts depend on one particular replica."
      ],
      resolution: [
        "Route traffic through the approved HA architecture if a healthy replica is available.",
        "Repair the failed replica using the confirmed root cause.",
        "Verify data freshness and alerting on the surviving replica."
      ],
      prevention: [
        "Test failover rather than assuming replica count guarantees availability.",
        "Alert on replica health and scrape freshness.",
        "Keep capacity and recovery procedures for loss of a replica."
      ]
    },
    {
      scenario: "All Prometheus replicas are unavailable",
      symptoms: [
        "The API is inaccessible across replicas.",
        "Dashboards and alert evaluations stop updating.",
        "A shared dependency may have failed."
      ],
      investigation: [
        "Check whether replicas share the same storage, node pool, configuration rollout, network, or upstream dependency.",
        "Inspect the most recent common change.",
        "Check independent infrastructure monitoring and platform status.",
        "Identify whether the failure is common-mode rather than two unrelated crashes."
      ],
      resolution: [
        "Restore the shared dependency or revert the common faulty change.",
        "Recover replicas using the supported deployment and storage procedures.",
        "Verify each replica and the client routing path."
      ],
      prevention: [
        "Reduce shared failure domains where feasible.",
        "Test independent monitoring and disaster recovery.",
        "Use an incident process that remains functional when Prometheus itself is unavailable."
      ]
    },
    {
      scenario: "Prometheus starts but queries time out",
      symptoms: [
        "Health endpoint responds.",
        "Some API requests time out.",
        "Large dashboards or broad queries fail more often."
      ],
      investigation: [
        "Compare a lightweight query with the failing query.",
        "Inspect resource usage and query duration metrics where available.",
        "Review dashboard refresh intervals and query ranges.",
        "Check cardinality and recent workload changes."
      ],
      resolution: [
        "Optimize expensive queries and narrow unnecessary time ranges.",
        "Use appropriate recording rules for frequently repeated expensive calculations.",
        "Adjust concurrency or capacity only after measuring the bottleneck."
      ],
      prevention: [
        "Review dashboard query cost.",
        "Set sensible refresh intervals.",
        "Monitor query latency and saturation."
      ]
    },
    {
      scenario: "Prometheus is available but metrics are no longer being scraped",
      symptoms: [
        "API and readiness checks succeed.",
        "Targets are down or missing.",
        "The latest samples become stale."
      ],
      investigation: [
        "Inspect the targets API and up metric.",
        "Review scrape errors, target discovery, network policy, and endpoint changes.",
        "Compare target count and scrape errors before and after the incident."
      ],
      resolution: [
        "Fix the verified scrape or discovery problem.",
        "Confirm expected targets and recent samples return."
      ],
      prevention: [
        "Alert on target health and expected metric presence.",
        "Test scrape configuration in CI.",
        "Monitor the monitoring pipeline independently."
      ]
    },
    {
      scenario: "Prometheus is healthy but Alertmanager is down",
      symptoms: [
        "Prometheus queries and rules work.",
        "Alerts may be firing internally but notifications are not arriving.",
        "Alertmanager endpoints or logs indicate failure."
      ],
      investigation: [
        "Inspect the Prometheus alert API.",
        "Check Alertmanager service health, endpoints, logs, and routing configuration.",
        "Test the approved notification destination."
      ],
      resolution: [
        "Repair Alertmanager or its destination using the confirmed cause.",
        "Validate routing, grouping, inhibition, and notification delivery."
      ],
      prevention: [
        "Monitor Alertmanager separately.",
        "Use independent notification-delivery checks.",
        "Document how to communicate incidents if the primary alert path fails."
      ]
    },
    {
      scenario: "Prometheus storage is full",
      symptoms: [
        "Disk usage reaches capacity.",
        "Logs show write failures or TSDB errors.",
        "Ingestion or startup becomes unreliable."
      ],
      investigation: [
        "Identify the actual Prometheus data filesystem and available capacity.",
        "Inspect retention settings, block growth, and series cardinality.",
        "Check whether temporary files or unrelated logs consume space.",
        "Review storage alerts and capacity history."
      ],
      resolution: [
        "Use the supported retention or storage-capacity procedure.",
        "Remove only verified disposable files outside the TSDB data path.",
        "Expand storage or correct retention through the approved change process when appropriate.",
        "Follow official recovery instructions if the database is damaged."
      ],
      prevention: [
        "Alert on disk capacity and growth rate.",
        "Plan capacity using actual ingestion and retention requirements.",
        "Monitor cardinality and test storage growth."
      ]
    }
  ],

  recoveryProcedures: [
    {
      situation: "Configuration or deployment caused startup failure",
      procedure: [
        "Capture startup logs, the deployed image version, and the active configuration revision.",
        "Identify the first fatal configuration or startup error.",
        "Validate the proposed configuration and rule files.",
        "Obtain approval for a correction or rollback.",
        "Deploy the known-good configuration through the source of truth.",
        "Wait for the server to become ready before restoring client traffic."
      ],
      validation: [
        "The pod remains ready without repeated restarts.",
        "Health and readiness endpoints respond.",
        "The API returns successful responses.",
        "Targets, recording rules, and alerts are loaded as expected."
      ],
      rollback: [
        "Revert the specific faulty configuration or image revision if the recovery introduces regressions.",
        "Validate the rollback configuration before deployment.",
        "Confirm the original failure does not recur."
      ]
    },
    {
      situation: "Memory or disk exhaustion",
      procedure: [
        "Identify the exact resource that is exhausted.",
        "Capture current and historical usage, restarts, and error logs.",
        "Determine whether high cardinality, expensive queries, storage growth, or a capacity change caused the problem.",
        "Apply a reviewed capacity, workload, retention, or instrumentation correction.",
        "Restart only if required by the recovery plan."
      ],
      validation: [
        "Resource utilization stabilizes.",
        "The process remains healthy.",
        "Queries and ingestion recover.",
        "The same pressure does not immediately return."
      ],
      rollback: [
        "Revert only the change that introduced the regression.",
        "Do not delete TSDB data or WAL files as a routine recovery measure.",
        "Use supported storage recovery procedures if integrity problems remain."
      ]
    },
    {
      situation: "Kubernetes service, network, or storage attachment failure",
      procedure: [
        "Inspect the pod, Service, endpoints, node, PVC, and relevant events.",
        "Locate the first failing connection, scheduling, or mount step.",
        "Correct the confirmed selector, policy, storage, or scheduling issue.",
        "Verify that the pod becomes Ready and endpoints are populated.",
        "Test the normal production access path."
      ],
      validation: [
        "The pod is scheduled and Ready.",
        "The volume is mounted as intended.",
        "The Service has healthy endpoints.",
        "Clients can access the Prometheus API."
      ],
      rollback: [
        "Revert the specific network or manifest change if it causes additional impact.",
        "Follow storage-provider recovery guidance for volume failures.",
        "Preserve data and verify endpoint health after rollback."
      ]
    },
    {
      situation: "TSDB or WAL integrity failure",
      procedure: [
        "Preserve logs and storage evidence.",
        "Confirm whether the error indicates actual corruption rather than a slow replay, permission issue, or full disk.",
        "Involve the Prometheus and storage owners.",
        "Follow the official, version-appropriate recovery process and approved backup strategy.",
        "Avoid manually editing or deleting database files."
      ],
      validation: [
        "Prometheus opens the database successfully.",
        "Recent and historical data are available to the extent supported by the recovery.",
        "Targets resume scraping.",
        "Rules and alerts evaluate successfully."
      ],
      rollback: [
        "Use the documented backup or restore procedure if the attempted recovery fails.",
        "Do not overwrite the only available copy of the data.",
        "Record any unrecoverable data gap."
      ]
    }
  ],

  cicdTroubleshooting: [
    "Keep Prometheus configuration, rule files, Kubernetes manifests, Helm values, and operator resources in version control.",
    "Run promtool check config using a compatible Prometheus version before deployment.",
    "Run promtool check rules against the intended rule files.",
    "Render and validate Helm templates before applying production changes.",
    "Validate Kubernetes manifests and review resource selectors, ports, and probe configuration.",
    "Test the Prometheus container image and configuration together in staging.",
    "Add health and readiness smoke tests to deployment validation.",
    "Verify the API, targets, critical metric queries, and rules after rollout.",
    "Check PVC binding, capacity requirements, and storage configuration before stateful changes.",
    "Use a staged rollout where supported and define an explicit rollback condition.",
    "Track image digests and configuration revisions so changes can be correlated with outages.",
    "Use least-privilege access for deployment credentials.",
    "Do not print secrets or authentication headers in pipeline logs.",
    "Add monitoring checks for restarts, readiness failures, resource pressure, and data freshness.",
    "Test recovery procedures before production incidents occur.",
    "For GitOps deployments, verify that the expected revision reconciles successfully and that the live resource matches the intended configuration."
  ],

  monitoringAndPrevention: [
    "Monitor Prometheus health and readiness endpoints independently of its own query engine.",
    "Use an external synthetic check to detect when Prometheus cannot be reached.",
    "Alert on repeated container restarts, CrashLoopBackOff, and failed readiness probes.",
    "Monitor CPU, memory, disk usage, inode availability, and PVC capacity.",
    "Track TSDB head-series growth and ingestion behavior where supported.",
    "Monitor target count, up, scrape errors, scrape duration, and sample freshness.",
    "Monitor recording-rule evaluation and alert-rule failures.",
    "Monitor Alertmanager availability and notification delivery independently.",
    "Monitor remote-write queue pressure and failures when remote write is used.",
    "Review expensive queries and dashboard refresh intervals.",
    "Review high-cardinality labels during application development.",
    "Test configuration and rules in CI before production deployment.",
    "Maintain a tested recovery process for stateful data and persistent volumes.",
    "Document how to respond when the monitoring system itself is unavailable.",
    "Use independent monitoring for critical infrastructure so Prometheus failure does not eliminate every alert.",
    "Test HA failover and disaster recovery periodically.",
    "Maintain a known-good configuration and image version.",
    "Track incidents involving monitoring blind spots and assign preventive actions."
  ],

  incidentRunbook: [
    "1. Acknowledge the incident and record the UTC start time.",
    "2. Identify affected Prometheus instances, replicas, clusters, and critical dashboards.",
    "3. Check health, readiness, API access, and the normal production URL.",
    "4. Inspect pod status, restart count, current logs, previous logs, and Kubernetes events.",
    "5. Identify whether the failure is configuration, resource, storage, scheduling, network, or query related.",
    "6. Preserve evidence before making changes.",
    "7. Check whether another healthy Prometheus replica or independent monitoring system is available.",
    "8. Follow the diagnostic workflow and identify the first failing layer.",
    "9. Apply the smallest approved fix that addresses the evidence-backed root cause.",
    "10. Avoid destructive TSDB, WAL, or PVC operations.",
    "11. Verify readiness, API access, targets, metric ingestion, rules, and notifications.",
    "12. Observe stability over multiple scrape and evaluation intervals.",
    "13. Communicate the monitoring blind spot and any data gap.",
    "14. Record the root cause, timeline, remediation, rollback decision, and recovery evidence.",
    "15. Assign follow-up actions for alerts, capacity, CI validation, and runbook improvements."
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Diagnose a Prometheus process outage",
      objective: "Identify the difference between process failure and access-path failure.",
      steps: [
        "Use a disposable Prometheus instance.",
        "Check health, readiness, and API endpoints.",
        "Stop the test instance using the lab's normal controls.",
        "Compare connection errors with a healthy instance.",
        "Restore the test instance and verify recovery."
      ],
      successCriteria: [
        "The failing layer is identified.",
        "The diagnosis is supported by endpoint and process evidence.",
        "The test instance returns to a healthy state."
      ]
    },
    {
      title: "Lab 2 — Reproduce an invalid configuration startup failure",
      objective: "Learn to identify and correct configuration errors safely.",
      steps: [
        "Create a disposable Prometheus configuration.",
        "Introduce a controlled syntax error in the test configuration.",
        "Validate it using compatible promtool tooling.",
        "Inspect the startup error.",
        "Correct the configuration and start the test instance."
      ],
      successCriteria: [
        "The invalid configuration is detected before redeployment.",
        "The corrected instance becomes ready.",
        "The validation step is documented for CI."
      ]
    },
    {
      title: "Lab 3 — Simulate a failed metrics Service endpoint",
      objective: "Understand Kubernetes Service routing.",
      steps: [
        "Deploy a sample Prometheus instance in a test namespace.",
        "Inspect its Service and endpoints.",
        "Introduce a controlled selector or port mismatch.",
        "Compare direct pod access with Service access.",
        "Correct the mismatch and test the API."
      ],
      successCriteria: [
        "The faulty routing layer is identified.",
        "The Service has the expected endpoints.",
        "The API is reachable through the intended route."
      ]
    },
    {
      title: "Lab 4 — Investigate a test PVC mount failure",
      objective: "Understand stateful workload scheduling and storage diagnostics.",
      steps: [
        "Use a disposable Kubernetes cluster and test PVC.",
        "Inspect PVC status, pod events, and volume mount messages.",
        "Introduce a controlled storage configuration problem.",
        "Follow the platform's supported correction process.",
        "Verify that the test pod can access its volume."
      ],
      successCriteria: [
        "The storage failure is identified from events.",
        "No production or real Prometheus data is modified.",
        "The test pod recovers successfully."
      ]
    },
    {
      title: "Lab 5 — Investigate resource pressure",
      objective: "Recognize memory and disk capacity symptoms.",
      steps: [
        "Run a disposable Prometheus instance with deliberately constrained resources.",
        "Observe resource usage, events, and logs.",
        "Identify the exact resource limit or capacity issue.",
        "Adjust the test workload or resource configuration.",
        "Verify stable operation."
      ],
      successCriteria: [
        "The resource bottleneck is identified.",
        "The solution addresses the cause rather than only hiding the symptom.",
        "The test instance remains stable after correction."
      ]
    },
    {
      title: "Lab 6 — Validate recovery of scraping and rules",
      objective: "Verify that a healthy API also has functional monitoring.",
      steps: [
        "Create a test scrape target and a recording rule.",
        "Stop the test target or introduce a controlled scrape failure.",
        "Restore the target and inspect the targets API.",
        "Query the metric and inspect the rules API.",
        "Verify a test alert through the approved test path."
      ],
      successCriteria: [
        "Target health returns to normal.",
        "Recent samples appear.",
        "Rules evaluate successfully and the test alert behaves as expected."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "1. What do you check first when Prometheus is down?",
      answer:
        "Check health, readiness, API access, pod status, restart history, and recent logs. Determine whether the failure is in the process, access path, or a dependent service."
    },
    {
      question: "2. What is the difference between /-/healthy and /-/ready?",
      answer:
        "The health endpoint indicates process health, while readiness indicates whether the server is ready to serve requests. Their exact behavior should be checked against the deployed Prometheus version."
    },
    {
      question: "3. What does CrashLoopBackOff mean?",
      answer:
        "Kubernetes is repeatedly restarting a container that exits or fails. Inspect current and previous logs and termination details to find the root cause."
    },
    {
      question: "4. How do you troubleshoot OOMKilled?",
      answer:
        "Inspect termination status, memory usage, limits, series cardinality, scrape volume, and expensive queries. Fix the confirmed cause and size resources using measured workload."
    },
    {
      question: "5. Why should you avoid deleting the WAL?",
      answer:
        "The WAL contains data needed for recovery and ingestion. Removing it without a supported procedure can cause data loss or worsen database recovery."
    },
    {
      question: "6. How do you troubleshoot a full Prometheus disk?",
      answer:
        "Identify the actual data filesystem, capacity, inode usage, retention settings, and series growth. Use approved retention or capacity procedures rather than deleting TSDB files."
    },
    {
      question: "7. Why can a Prometheus pod be Running but not Ready?",
      answer:
        "The process may still be initializing, failing readiness checks, or unable to serve requests correctly. Inspect probes, startup logs, and dependencies."
    },
    {
      question: "8. What causes Prometheus startup failures after an upgrade?",
      answer:
        "Possible causes include unsupported flags, invalid configuration, incompatible rules, changed permissions, and storage initialization issues."
    },
    {
      question: "9. How do you validate Prometheus configuration?",
      answer:
        "Use promtool check config with the intended file and a compatible tool version, then test the configuration in staging before production rollout."
    },
    {
      question: "10. How do you validate alert rules?",
      answer:
        "Use promtool check rules, verify the loaded rules API, inspect evaluation errors, and test alert behavior in a safe environment."
    },
    {
      question: "11. What if Prometheus is healthy but Grafana cannot connect?",
      answer:
        "Check datasource configuration, DNS, service endpoints, ingress, TLS, authentication, network policies, and connectivity from Grafana's environment."
    },
    {
      question: "12. What if the API works but every target is down?",
      answer:
        "Inspect the targets API, scrape errors, service discovery, DNS, network routing, TLS, and recent scrape configuration changes."
    },
    {
      question: "13. What if only one Prometheus replica is down?",
      answer:
        "Verify that another replica is healthy, reachable, and sufficiently fresh. Restore traffic through the approved HA design and investigate the failed replica."
    },
    {
      question: "14. What if all replicas fail together?",
      answer:
        "Look for shared failure domains such as a common configuration rollout, node pool, storage system, network, or upstream dependency."
    },
    {
      question: "15. How do you investigate slow Prometheus queries?",
      answer:
        "Compare lightweight and failing queries, inspect query duration and resource usage, review cardinality, and optimize expensive expressions and dashboard refresh behavior."
    },
    {
      question: "16. Why is high cardinality dangerous?",
      answer:
        "It increases the number of time series and can consume memory, storage, and query resources. Unbounded label values should be avoided."
    },
    {
      question: "17. What does a PVC Pending state mean?",
      answer:
        "The persistent volume claim has not been bound. Investigate storage class, capacity, access mode, provisioning, and scheduling requirements."
    },
    {
      question: "18. How do you troubleshoot TSDB or WAL errors?",
      answer:
        "Inspect exact logs, filesystem capacity, mount state, permissions, and storage health. If corruption is confirmed, use official version-appropriate recovery procedures."
    },
    {
      question: "19. How do you verify scrape recovery?",
      answer:
        "Inspect target health, query up, check the target lastError, and confirm recent samples for representative critical metric families."
    },
    {
      question: "20. Does a healthy Prometheus API guarantee alert delivery?",
      answer:
        "No. Rules may fail or Alertmanager and notification destinations may be unavailable. Verify the entire alert delivery path."
    },
    {
      question: "21. How do you recover from a bad deployment?",
      answer:
        "Identify the faulty revision, validate the previous known-good configuration, obtain approval, roll back through the source of truth, and verify service and data recovery."
    },
    {
      question: "22. How do you prevent configuration regressions?",
      answer:
        "Version-control the configuration, validate it in CI, test compatible versions in staging, review changes, and use staged deployment and rollback procedures."
    },
    {
      question: "23. How do you monitor Prometheus itself?",
      answer:
        "Use independent health checks and monitor restarts, readiness, resource usage, storage, scrape health, query performance, rule evaluation, and remote-write behavior."
    },
    {
      question: "24. Why is independent monitoring important?",
      answer:
        "If Prometheus is the only monitoring system, its failure may remove the alarms that would report its own outage. Independent checks preserve visibility."
    },
    {
      question: "25. What is the difference between Prometheus being down and metrics being missing?",
      answer:
        "Prometheus down means the server or its access path is unavailable. Missing metrics can occur while Prometheus is healthy because of scrape, instrumentation, relabeling, or query problems."
    },
    {
      question: "26. What should be included in the incident report?",
      answer:
        "Include the timeline, impact, evidence, root cause, changes made, validation, data gaps, rollback decisions, and assigned prevention actions."
    },
    {
      question: "27. How do you confirm recovery?",
      answer:
        "Verify stable readiness, API access, target health, recent metric samples, rule evaluation, alert delivery, and stability over several relevant intervals."
    },
    {
      question: "28. What should you never do during an unverified TSDB incident?",
      answer:
        "Do not blindly delete the PVC, WAL, block files, or TSDB directory. Preserve evidence and follow supported recovery procedures."
    }
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Title: Prometheus production outage",
    "Incident owner:",
    "Environment / cluster / namespace:",
    "Prometheus resource and replica:",
    "Severity and justification:",
    "Incident start time (UTC):",
    "Detection time (UTC):",
    "Recovery time (UTC):",
    "Last successful API request:",
    "Affected dashboards, targets, and services:",
    "Business impact:",
    "Monitoring blind-spot duration:",
    "Alerting and SLO impact:",
    "Pod status and termination reason:",
    "Relevant logs and Kubernetes events:",
    "Resource and storage findings:",
    "Configuration and deployment changes:",
    "Network and access-path findings:",
    "Confirmed root cause:",
    "Contributing factors:",
    "Remediation and approval:",
    "Rollback decision:",
    "API and readiness validation:",
    "Scrape and rule validation:",
    "Notification delivery validation:",
    "Data gaps or unrecovered data:",
    "Prevention actions, owners, and due dates:",
    "Runbook and CI/CD updates:",
    "Incident closure approval:"
  ],

  officialReferences: [
    {
      title: "Prometheus Overview",
      url: "https://prometheus.io/docs/introduction/overview/"
    },
    {
      title: "Prometheus Configuration",
      url: "https://prometheus.io/docs/prometheus/latest/configuration/configuration/"
    },
    {
      title: "Prometheus Command-Line Flags",
      url: "https://prometheus.io/docs/prometheus/latest/command-line/prometheus/"
    },
    {
      title: "Prometheus Storage",
      url: "https://prometheus.io/docs/prometheus/latest/storage/"
    },
    {
      title: "Prometheus HTTP API",
      url: "https://prometheus.io/docs/prometheus/latest/querying/api/"
    },
    {
      title: "Prometheus Rule Configuration",
      url: "https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/"
    },
    {
      title: "Prometheus Alerting Rules",
      url: "https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/"
    },
    {
      title: "Prometheus Operator",
      url: "https://prometheus-operator.dev/"
    },
    {
      title: "Kubernetes Debugging Applications",
      url: "https://kubernetes.io/docs/tasks/debug/debug-application/"
    },
    {
      title: "Kubernetes Persistent Volumes",
      url: "https://kubernetes.io/docs/concepts/storage/persistent-volumes/"
    },
    {
      title: "Kubernetes Probes",
      url: "https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/"
    },
    {
      title: "Grafana Troubleshooting",
      url: "https://grafana.com/docs/grafana/latest/troubleshooting/"
    }
  ]
};
