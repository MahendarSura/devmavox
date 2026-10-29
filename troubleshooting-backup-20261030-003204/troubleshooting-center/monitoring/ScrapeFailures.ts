export interface ScrapeFailuresGuide {
  title: string;
  slug: string;
  category: string;
  severity: string;
  estimatedTime: string;
  overview: string;
  symptoms: string[];
  incidentScenario: string;
  impactAssessment: string[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: {
    step: number;
    title: string;
    objective: string;
    commands: string[];
    interpretOutput: string[];
    nextActions: string[];
  }[];
  rootCauseMatrix: {
    symptom: string;
    likelyCause: string;
    verification: string;
    resolution: string;
  }[];
  advancedScenarios: {
    scenario: string;
    evidence: string[];
    fix: string[];
    validation: string[];
  }[];
  recoveryWorkflow: string[];
  rollbackPlan: string[];
  prevention: string[];
  alerting: string[];
  cicdValidation: string[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    successCriteria: string[];
  }[];
  incidentRunbook: string[];
  incidentReportTemplate: string[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  officialReferences: {
    title: string;
    url: string;
  }[];
}

export const scrapeFailuresGuide: ScrapeFailuresGuide = {
  title: "Prometheus Scrape Failures — Production Troubleshooting",
  slug: "scrape-failures",
  category: "Monitoring & Observability",
  severity: "SEV-2 to SEV-1 depending on monitoring coverage and impact",
  estimatedTime: "30–90 minutes for diagnosis; recovery depends on root cause",

  overview: `
Prometheus scraping is the process of collecting metrics from targets such as
applications, Kubernetes components, node_exporter, kube-state-metrics,
blackbox_exporter and custom exporters.

Prometheus periodically sends HTTP requests to configured targets and stores
the returned samples in its time-series database.

A scrape failure means Prometheus could not successfully collect metrics during
a scrape attempt. The target may be down, unreachable, incorrectly configured,
slow, unauthorized, serving invalid metrics, or excluded by discovery and
relabeling rules.

IMPORTANT:
- An unhealthy target and a missing target are different problems.
- A target showing DOWN usually means a scrape attempt failed.
- A target missing from /api/v1/targets may indicate discovery, selection,
  relabeling, configuration reload or Prometheus configuration problems.
- A successful scrape does not prove that the application is healthy.
- A failed scrape does not always mean that the application itself is down.
- Prometheus can be healthy while some or all targets are failing.
- A target can return HTTP 200 but still expose incorrect or incomplete metrics.
- Always identify whether the issue affects one target, one job, one namespace,
  one cluster, or the entire monitoring environment.

The goal is to identify the failing layer using evidence instead of restarting
components or changing scrape configuration blindly.
`,

  symptoms: [
    "Prometheus Targets page shows DOWN targets.",
    "up metric returns 0 for one or more targets.",
    "up metric series disappear after a configuration or discovery change.",
    "Service-level dashboards show No data.",
    "Application metrics stop updating while application traffic continues.",
    "Prometheus reports context deadline exceeded.",
    "Scrape errors report connection refused or connection timeout.",
    "TLS certificate validation fails.",
    "Targets return HTTP 401, 403, 404, 429, 500, 502 or 503.",
    "Prometheus logs show invalid metric or scrape parsing errors.",
    "Kubernetes ServiceMonitor or PodMonitor stops selecting targets.",
    "Targets disappear after a Helm upgrade or Prometheus Operator change.",
    "Scrape duration increases and samples scraped decrease.",
    "Some targets work while targets in another namespace or subnet fail.",
    "Alerts for missing metrics fire unexpectedly."
  ],

  incidentScenario: `
At 10:15 AM, the monitoring team notices that application latency and request
rate dashboards have stopped updating. Application users are still sending
requests, but Prometheus shows several targets as DOWN.

The incident began shortly after a monitoring configuration deployment.
Some targets show connection refused, another group reports context deadline
exceeded, and a Kubernetes ServiceMonitor no longer appears to discover its
expected endpoints.

The on-call engineer must establish whether this is a monitoring-only incident
or an application outage, identify the exact failure layer, restore metrics
collection safely, and confirm that historical and current observability
signals are trustworthy.

Do not assume that restarting Prometheus will fix the issue. If the actual
cause is a bad Service selector, network policy, certificate, authentication
secret or relabeling rule, a restart may not help and may remove useful evidence.
`,

  impactAssessment: [
    "Identify affected environment: production, staging, development or a specific cluster.",
    "Identify the affected Prometheus instance, replica, namespace, scrape job and target labels.",
    "Determine the first known failure timestamp and compare it with deployments, configuration reloads and infrastructure changes.",
    "Check whether the application itself is serving traffic successfully.",
    "Determine whether only metrics collection is affected or whether service discovery, DNS, networking or the application is also degraded.",
    "Identify affected dashboards, recording rules, alert rules, SLO calculations and automated remediation systems.",
    "Determine whether the issue affects all targets or a small subset.",
    "Check whether redundant Prometheus replicas remain healthy and are collecting the same targets.",
    "Assess whether the team has alternative telemetry such as application logs, traces, cloud metrics or load balancer metrics.",
    "Classify severity based on lost visibility, business impact and monitoring redundancy.",
    "Notify the incident owner and monitoring team when production visibility is materially degraded.",
    "Record incident start time, detection time, deployment version and recovery time."
  ],

  safetyChecks: [
    "Confirm the correct cluster, Kubernetes context, namespace and Prometheus instance before executing commands.",
    "Use read-only diagnostic commands first.",
    "Confirm whether Prometheus is managed by Prometheus Operator, Helm, a standalone deployment or another monitoring platform.",
    "Do not delete Prometheus TSDB data, WAL files, PVCs or persistent volumes to fix scrape failures.",
    "Do not disable TLS verification or authentication as a permanent workaround.",
    "Do not expose exporter endpoints publicly merely to make scraping work.",
    "Do not broadly disable NetworkPolicies, firewalls or security groups.",
    "Do not rotate production credentials until the dependent services and rollout plan are understood.",
    "Do not increase scrape intervals or timeouts globally without checking target capacity and monitoring requirements.",
    "Confirm production change approval and the approved deployment or rollback process.",
    "Preserve relevant logs, events, configuration versions and timestamps before restarting components.",
    "Avoid dumping Secret contents into terminals, logs, tickets or chat.",
    "Use a temporary debug pod only when approved, with minimal permissions and cleanup after the investigation.",
    "Do not run load tests or deliberately break production targets without an approved maintenance window."
  ],

  evidenceCollection: [
    "Incident ID, severity, incident owner and timeline.",
    "Affected cluster, namespace, Prometheus instance and scrape job.",
    "Target labels, target URL, target health and last scrape error.",
    "First failure time and last successful scrape time.",
    "Prometheus /targets page details.",
    "Prometheus logs around the first failure.",
    "Prometheus configuration and configuration reload status.",
    "ServiceMonitor, PodMonitor, Probe and scrape configuration changes.",
    "Kubernetes Services, EndpointSlices, Pods, labels and readiness conditions.",
    "NetworkPolicy, DNS, routing and firewall changes.",
    "TLS certificate issuer, SAN, expiration and trust-chain status without exposing private keys.",
    "Secret metadata and rotation timestamps without printing secret values.",
    "CPU, memory, disk, file descriptor and network utilization.",
    "Scrape duration, samples scraped, scrape errors and target count.",
    "Recent Helm releases, Git commits, image changes and CI/CD deployment records.",
    "Successful and failed requests made from the Prometheus network location.",
    "Recovery verification results and rollback decision."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm the incident scope",
      objective:
        "Determine whether Prometheus itself is down, one job is failing, or individual targets are unavailable.",
      commands: [
        "kubectl config current-context",
        "kubectl get namespaces",
        "kubectl get pods -A | grep -Ei 'prometheus|exporter|grafana'",
        "kubectl get pods -n monitoring -o wide",
        "kubectl get events -n monitoring --sort-by=.lastTimestamp"
      ],
      interpretOutput: [
        "Confirm the current context before interpreting any cluster output.",
        "A Prometheus pod in Running state does not prove that scrapes are succeeding.",
        "CrashLoopBackOff, OOMKilled, Pending or frequent restarts may indicate a broader monitoring problem.",
        "If the monitoring namespace differs, replace monitoring with the actual namespace.",
        "On Windows PowerShell, use Select-String instead of grep where necessary."
      ],
      nextActions: [
        "If Prometheus is unavailable, investigate its own health and availability first.",
        "If Prometheus is healthy but targets fail, continue with the target-level checks.",
        "If many unrelated jobs fail at the same time, prioritize shared DNS, networking, credentials, configuration and resource capacity.",
        "If only one target fails, investigate its endpoint and target-specific configuration."
      ]
    },
    {
      step: 2,
      title: "Inspect target health in the Prometheus UI",
      objective:
        "Capture the exact scrape error instead of guessing the root cause.",
      commands: [
        "Open http://<prometheus-host>:9090/targets",
        "Open http://<prometheus-host>:9090/service-discovery",
        "Open http://<prometheus-host>:9090/graph",
        "Query: up",
        "Query: up == 0",
        "Query: count by (job) (up)",
        "Query: scrape_samples_scraped",
        "Query: scrape_duration_seconds"
      ],
      interpretOutput: [
        "The Targets page displays the job, endpoint, health, last scrape, duration and last error.",
        "up == 0 identifies currently represented targets whose latest scrape failed.",
        "A missing up series is not equivalent to up == 0. The target may have disappeared from discovery or its labels may have changed.",
        "count by (job) (up) helps compare target counts by job, but compare it with a known baseline.",
        "scrape_samples_scraped indicates how many samples were collected in a scrape; it is not a universal measure of application traffic.",
        "High scrape duration near the configured timeout suggests slow target responses, resource pressure or expensive collection.",
        "An empty result may mean the metric is absent, the query range is wrong, or Prometheus is not scraping the expected target."
      ],
      nextActions: [
        "Record the complete target error and endpoint URL.",
        "Compare the target with another healthy target in the same job.",
        "If the target is absent, proceed to service discovery and relabeling.",
        "If the target is DOWN, proceed to connectivity, HTTP, TLS, authentication and exporter checks.",
        "If the target is UP but dashboards show no data, inspect metric names, labels, query ranges and recording rules."
      ]
    },
    {
      step: 3,
      title: "Inspect the Prometheus targets API",
      objective:
        "Retrieve target metadata and scrape errors for structured diagnosis.",
      commands: [
        "curl -fsS http://<prometheus-host>:9090/api/v1/targets?state=active",
        "curl -fsS http://<prometheus-host>:9090/api/v1/targets?state=dropped",
        "curl -fsS 'http://<prometheus-host>:9090/api/v1/query?query=up'",
        "curl -fsS http://<prometheus-host>:9090/-/healthy",
        "curl -fsS http://<prometheus-host>:9090/-/ready"
      ],
      interpretOutput: [
        "The targets API exposes active and dropped target details, including scrape URL, labels and last error.",
        "A target present in dropped targets may have been excluded by relabeling.",
        "An empty active target list for an expected job suggests discovery or configuration selection problems.",
        "The healthy endpoint indicates process health; the ready endpoint indicates readiness to serve requests. Neither alone proves that every target is healthy.",
        "Use authenticated access or the correct port-forward when direct network access is not available.",
        "Do not expose the Prometheus API publicly just to run these commands."
      ],
      nextActions: [
        "Compare discovered labels with relabeling rules and the expected job labels.",
        "If API access fails, verify the Prometheus endpoint, authentication and network path.",
        "If targets are dropped, inspect dropped-target labels and relabeling configuration.",
        "If targets are active but DOWN, investigate the exact lastError field."
      ]
    },
    {
      step: 4,
      title: "Verify the actual endpoint from Prometheus's network location",
      objective:
        "Distinguish target application failures from routing, DNS and policy failures.",
      commands: [
        "kubectl get svc -n <namespace> -o wide",
        "kubectl get endpointslice -n <namespace> -o wide",
        "kubectl get pods -n <namespace> -o wide --show-labels",
        "kubectl describe svc <service-name> -n <namespace>",
        "kubectl get networkpolicy -n <namespace>",
        "kubectl exec -n monitoring <prometheus-pod> -- wget -S -O- http://<target-host>:<port>/metrics"
      ],
      interpretOutput: [
        "A Service with no ready endpoints may have a selector mismatch, unready Pods or missing EndpointSlices.",
        "A target may be reachable from an administrator laptop but unreachable from the Prometheus pod.",
        "Connection refused usually means the destination is reachable but nothing accepts the connection on that address and port, or an intermediate component actively rejects it.",
        "Connection timeout can indicate dropped packets, incorrect routing, restrictive policies, overloaded targets or a network path problem.",
        "DNS errors suggest a name-resolution issue, an incorrect hostname or a DNS configuration problem.",
        "The example wget command requires wget in the Prometheus container; minimal images may not include it.",
        "Use an approved temporary debug pod when the Prometheus image lacks diagnostic tools.",
        "A successful request to /metrics confirms reachability for that request only; it does not prove that the configured Prometheus scrape path and protocol are correct."
      ],
      nextActions: [
        "Check whether the endpoint is a Pod IP, Service DNS name, node address or external hostname.",
        "Verify the correct port and metrics path.",
        "Compare the Prometheus pod's namespace and network identity with the target's allowed ingress rules.",
        "Inspect Service selectors, EndpointSlices, readiness and NetworkPolicies.",
        "Check cloud firewall rules, routes and security groups when targets cross network boundaries.",
        "Do not change network policy until the intended source and destination traffic are confirmed."
      ]
    },
    {
      step: 5,
      title: "Check exporter and application metrics endpoints",
      objective:
        "Confirm that the target is listening on the correct interface and serving valid metrics.",
      commands: [
        "kubectl logs -n <namespace> <exporter-pod> --since=30m",
        "kubectl describe pod <exporter-pod> -n <namespace>",
        "kubectl get pod <exporter-pod> -n <namespace> -o yaml",
        "curl -v http://<target-host>:<port>/metrics",
        "curl -v http://<target-host>:<port>/<configured-metrics-path>",
        "ss -lntp"
      ],
      interpretOutput: [
        "An exporter may be Running but expose metrics on a different port or path.",
        "A process listening on 127.0.0.1 may not be reachable through the Pod IP or Service.",
        "A 404 often indicates a wrong path, wrong reverse-proxy route or exporter configuration.",
        "A 500 indicates the endpoint failed while handling the request; inspect exporter logs and dependencies.",
        "A 200 response with HTML instead of metrics may indicate a proxy, login page or incorrect application route.",
        "A connection refused error can indicate that the process is not listening or that the target port is incorrect.",
        "The ss command may be unavailable in minimal containers; run it on an appropriate host or use approved debugging tools.",
        "Do not assume every exporter uses /metrics; verify the configured metrics_path."
      ],
      nextActions: [
        "Compare the configured scrape port and path with the actual endpoint.",
        "Check exporter startup arguments and container port definitions.",
        "Verify the process bind address and Service targetPort.",
        "Check exporter dependencies, logs and resource limits.",
        "If the endpoint returns invalid content, validate the metrics exposition format before changing Prometheus parsing settings."
      ]
    },
    {
      step: 6,
      title: "Investigate HTTP status codes",
      objective:
        "Use HTTP responses to narrow the failure layer.",
      commands: [
        "curl -sS -o /dev/null -w '%{http_code} %{time_total}\\n' http://<target-host>:<port>/metrics",
        "curl -v http://<target-host>:<port>/metrics",
        "curl -v -H 'Authorization: Bearer <approved-token>' http://<target-host>:<port>/metrics"
      ],
      interpretOutput: [
        "200: the request succeeded; verify that the response is valid metrics and contains expected series.",
        "301 or 302: investigate redirects, canonical host configuration and whether the scrape client follows the expected route.",
        "400: inspect request requirements and endpoint configuration.",
        "401: authentication is missing, expired or invalid.",
        "403: the caller is authenticated or identified but lacks permission, or a policy denies access.",
        "404: the configured path or route may not exist.",
        "429: rate limiting or request quotas may be affecting scrapes.",
        "500: the target application or exporter encountered an internal error.",
        "502 or 503: a proxy, gateway or upstream target may be unavailable or unhealthy.",
        "504: a gateway timed out waiting for an upstream response.",
        "Never place real production tokens in shell history, screenshots or incident tickets."
      ],
      nextActions: [
        "For 401 or 403, inspect the approved authentication method, permissions and recent credential rotations.",
        "For 404, compare metrics_path and proxy routing with the endpoint implementation.",
        "For 429, identify the rate limit owner and scrape volume before adjusting intervals.",
        "For 5xx, inspect application and proxy logs and validate upstream health.",
        "For 200 with missing metrics, inspect exposition output, application instrumentation and metric relabeling."
      ]
    },
    {
      step: 7,
      title: "Diagnose TLS, certificates and HTTPS",
      objective:
        "Identify certificate trust, hostname, protocol and expiry failures.",
      commands: [
        "curl -v https://<target-host>:<port>/metrics",
        "openssl s_client -connect <target-host>:<port> -servername <target-host> -showcerts",
        "kubectl get secret <tls-secret-name> -n <namespace> -o jsonpath='{.type}'",
        "kubectl describe certificate <certificate-name> -n <namespace>"
      ],
      interpretOutput: [
        "Certificate verification errors can indicate an untrusted CA, incomplete chain, expired certificate or hostname mismatch.",
        "The certificate SAN must match the hostname used by Prometheus.",
        "SNI may be required when a proxy serves multiple TLS virtual hosts.",
        "A successful TLS handshake does not prove that the HTTP path or authorization is correct.",
        "The Secret type command displays metadata, not the private key.",
        "Certificate resource commands apply only when a certificate controller and corresponding custom resource are installed.",
        "A TLS connection can succeed from one network location and fail from another because of different trust stores or routing."
      ],
      nextActions: [
        "Check certificate expiry, SAN, issuer, trust chain and configured server name.",
        "Check whether Prometheus uses the correct CA bundle and client certificate, if mutual TLS is required.",
        "Confirm that the scrape scheme is http or https as intended.",
        "Repair the certificate chain or configuration through the approved certificate management process.",
        "Do not permanently set insecure_skip_verify to true."
      ]
    },
    {
      step: 8,
      title: "Check Kubernetes discovery and selector matching",
      objective:
        "Find why expected targets were not discovered or were dropped.",
      commands: [
        "kubectl get servicemonitor,podmonitor -A",
        "kubectl get servicemonitor <name> -n <namespace> -o yaml",
        "kubectl get podmonitor <name> -n <namespace> -o yaml",
        "kubectl get prometheus -A",
        "kubectl get svc -n <namespace> --show-labels",
        "kubectl get pods -n <namespace> --show-labels",
        "kubectl get endpointslice -n <namespace> -o yaml"
      ],
      interpretOutput: [
        "ServiceMonitor selectors select Services, not Pods directly.",
        "PodMonitor selectors select Pods directly.",
        "The ServiceMonitor namespace selector controls which namespaces are searched for Services.",
        "The Prometheus resource's serviceMonitorSelector and serviceMonitorNamespaceSelector determine which ServiceMonitors are selected.",
        "The Prometheus resource's podMonitorSelector and podMonitorNamespaceSelector determine which PodMonitors are selected.",
        "A mismatch in labels or namespace selectors can remove an entire group of targets.",
        "A matching ServiceMonitor does not guarantee a target if the Service has no endpoints or the selected port name is wrong.",
        "CRDs and field behavior depend on the installed Prometheus Operator version."
      ],
      nextActions: [
        "Compare the selector labels with the actual labels on Services, Pods and monitor resources.",
        "Verify namespace selectors and Prometheus resource selectors.",
        "Confirm that the Service port name matches the monitor endpoint's port reference where required.",
        "Verify the endpoint path, scheme and scrape interval.",
        "Check Prometheus Operator logs and events for rejected or unselected resources.",
        "Apply only the minimal selector or namespace correction required."
      ]
    },
    {
      step: 9,
      title: "Inspect relabeling and dropped targets",
      objective:
        "Identify targets or metrics removed by relabeling rules.",
      commands: [
        "curl -fsS http://<prometheus-host>:9090/api/v1/targets?state=dropped",
        "kubectl get prometheus <prometheus-resource> -n <namespace> -o yaml",
        "kubectl get servicemonitor <name> -n <namespace> -o yaml",
        "kubectl get configmap -n monitoring"
      ],
      interpretOutput: [
        "relabel_configs can keep, drop, replace, labelmap or modify discovered target labels before scraping.",
        "A keep rule may reject targets when the source label is missing or does not match the expected expression.",
        "A drop rule may exclude the intended namespace, port, address or job.",
        "metric_relabel_configs runs on samples after scraping and can remove individual metrics without making the target DOWN.",
        "A target can be healthy while important series are missing due to metric relabeling.",
        "Do not assume a ConfigMap contains the active configuration; Operator-managed installations may generate configuration from custom resources."
      ],
      nextActions: [
        "Compare discovered labels before and after relabeling.",
        "Check recent regular-expression, label-name and keep/drop changes.",
        "Verify whether the problem affects target discovery or only individual metric samples.",
        "Test the proposed configuration before applying it.",
        "Remove or adjust only the confirmed incorrect rule and verify that target counts and expected series return."
      ]
    },
    {
      step: 10,
      title: "Validate configuration and reload status",
      objective:
        "Detect invalid scrape configuration and failed configuration reloads.",
      commands: [
        "curl -fsS http://<prometheus-host>:9090/api/v1/status/config",
        "curl -fsS http://<prometheus-host>:9090/api/v1/status/runtimeinfo",
        "kubectl logs -n monitoring <prometheus-pod> --since=30m",
        "promtool check config prometheus.yml",
        "promtool check rules rules.yml"
      ],
      interpretOutput: [
        "The status config API shows the configuration currently loaded by Prometheus; protect access because configuration can reveal internal endpoints and operational details.",
        "The runtime information API helps inspect reload-related status and runtime details.",
        "Configuration reload failures may leave the last valid configuration active.",
        "promtool must be available in the diagnostic environment and should match the deployed Prometheus version as closely as practical.",
        "The example file names are placeholders; use the actual rendered configuration and rules files.",
        "Operator-managed configuration may be generated inside the Prometheus Pod and may not match a source ConfigMap one-to-one."
      ],
      nextActions: [
        "Compare the intended configuration in Git with the configuration actually loaded.",
        "Check the Prometheus logs for reload errors, invalid fields and missing files.",
        "Validate rendered Helm or Operator configuration before rollout.",
        "Use the supported configuration reload mechanism for the installation.",
        "Do not edit generated files inside a running container as a permanent fix."
      ]
    },
    {
      step: 11,
      title: "Investigate timeouts and slow scrapes",
      objective:
        "Determine whether the target cannot respond within the scrape deadline.",
      commands: [
        "Query: scrape_duration_seconds",
        "Query: scrape_samples_scraped",
        "Query: scrape_samples_post_metric_relabeling",
        "Query: rate(prometheus_target_scrapes_exceeded_sample_limit_total[5m])",
        "kubectl top pods -n <namespace>",
        "kubectl describe pod <target-pod> -n <namespace>"
      ],
      interpretOutput: [
        "Compare scrape duration with the configured scrape timeout.",
        "Repeated durations close to the timeout suggest a slow endpoint or resource pressure.",
        "Large exporter responses, slow database queries, expensive collectors and network latency can increase scrape duration.",
        "A sample-limit violation can cause a scrape to fail; inspect the target error and the relevant sample-limit configuration.",
        "scrape_samples_post_metric_relabeling may be lower than scrape_samples_scraped because metric relabeling removes samples.",
        "A missing metric series in this workflow can also mean that the metric is unsupported by the installed version."
      ],
      nextActions: [
        "Measure target response time and identify expensive exporter collectors.",
        "Inspect target CPU, memory, garbage collection and dependency latency.",
        "Check configured scrape timeout, sample limits and response size.",
        "Optimize the exporter or reduce unnecessary collection before increasing timeout limits.",
        "Change timeout settings only after confirming the target's actual response behavior and monitoring capacity."
      ]
    },
    {
      step: 12,
      title: "Check Prometheus capacity and scrape pressure",
      objective:
        "Determine whether Prometheus is overloaded or constrained.",
      commands: [
        "kubectl top pods -n monitoring",
        "kubectl describe pod <prometheus-pod> -n monitoring",
        "kubectl get pods -n monitoring -o wide",
        "kubectl get pvc -n monitoring",
        "kubectl get events -n monitoring --sort-by=.lastTimestamp",
        "Query: prometheus_tsdb_head_series",
        "Query: process_resident_memory_bytes",
        "Query: rate(prometheus_tsdb_head_samples_appended_total[5m])",
        "Query: rate(prometheus_target_scrapes_sample_duplicate_timestamp_total[5m])"
      ],
      interpretOutput: [
        "High CPU or memory use may delay scrape processing and API responses.",
        "OOMKilled indicates a container memory limit was exceeded, but it does not identify the underlying cause by itself.",
        "High series count or sample ingestion can increase resource consumption.",
        "A full filesystem or unhealthy PVC can create broader Prometheus storage problems, distinct from target connectivity failures.",
        "Metrics availability depends on Prometheus version; verify the metric names in the installed version.",
        "Do not assume every scrape failure is caused by Prometheus capacity merely because resource usage is high."
      ],
      nextActions: [
        "Compare current resource usage with the normal baseline.",
        "Check cardinality growth, scrape frequency, target count and sample ingestion.",
        "Identify expensive queries and collectors.",
        "Review resource requests, limits, retention, storage capacity and sharding architecture.",
        "Scale or tune capacity through a reviewed change instead of making uncontrolled global changes."
      ]
    },
    {
      step: 13,
      title: "Investigate missing metrics when the target is UP",
      objective:
        "Separate scrape success from missing, renamed or filtered application metrics.",
      commands: [
        "Query: up",
        "Query: count by (job) (up)",
        "Query: scrape_samples_scraped",
        "Query: scrape_samples_post_metric_relabeling",
        "Query: absent_over_time(<expected_metric>[10m])",
        "Query: count by (__name__) ({job=\"<job-name>\"})"
      ],
      interpretOutput: [
        "up == 1 means the scrape succeeded; it does not guarantee that every expected metric exists.",
        "An absent_over_time query can identify missing samples over a window, but the exact result depends on the metric's labels and scrape interval.",
        "An expected metric can disappear because application instrumentation changed, the collector is disabled, a label changed or metric relabeling dropped it.",
        "A renamed metric can break dashboards and alerts even though scraping remains healthy.",
        "High-cardinality queries over all metric names may be expensive; use narrow selectors and an appropriate time range."
      ],
      nextActions: [
        "Compare raw endpoint output with Prometheus query results.",
        "Verify instrumentation versions and metric naming changes.",
        "Inspect metric relabeling rules and labels.",
        "Check recording rules and dashboard queries separately.",
        "Restore compatibility or update dependent rules through the normal review and deployment process."
      ]
    },
    {
      step: 14,
      title: "Confirm recovery and close the incident",
      objective:
        "Prove that the correction restored collection without creating a new failure.",
      commands: [
        "Query: up",
        "Query: up == 0",
        "Query: count by (job) (up)",
        "Query: scrape_duration_seconds",
        "Query: scrape_samples_scraped",
        "curl -fsS http://<prometheus-host>:9090/-/ready",
        "kubectl get events -n monitoring --sort-by=.lastTimestamp"
      ],
      interpretOutput: [
        "The affected targets should return to UP and remain stable across multiple scrape intervals.",
        "Expected target counts should match the known baseline or approved inventory.",
        "Scrape duration should return to a reasonable baseline.",
        "Expected application metrics should appear with correct labels and fresh timestamps.",
        "Dashboards, recording rules and alert evaluations should recover.",
        "A single successful scrape is not sufficient proof of stable recovery.",
        "A successful readiness check proves Prometheus readiness, not complete monitoring coverage."
      ],
      nextActions: [
        "Monitor the affected jobs for an agreed observation window.",
        "Confirm that no unrelated jobs became unhealthy after the change.",
        "Confirm that alert delivery and dashboards work as expected.",
        "Record the exact root cause, corrective action, validation evidence and remaining risks.",
        "Create follow-up work for prevention and update the runbook."
      ]
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Target is missing from the Targets page",
      likelyCause: "Service discovery failure, monitor selector mismatch, relabeling drop, namespace selection or configuration not loaded",
      verification: "Inspect active and dropped targets, ServiceMonitor/PodMonitor selectors, Prometheus selectors and Operator logs",
      resolution: "Correct the specific selector or relabeling rule and validate the rendered configuration"
    },
    {
      symptom: "Connection refused",
      likelyCause: "Wrong port, exporter not listening, process crash, incorrect bind address or Service targetPort mismatch",
      verification: "Check exporter logs, listening ports, Service ports and direct connectivity from the Prometheus network",
      resolution: "Restore the process or correct the port and endpoint configuration"
    },
    {
      symptom: "Context deadline exceeded",
      likelyCause: "Slow target response, network timeout, exporter overload or timeout shorter than the actual scrape duration",
      verification: "Compare scrape duration, target latency, exporter resource usage and configured timeout",
      resolution: "Remove the bottleneck or tune timeout after capacity analysis"
    },
    {
      symptom: "No such host or DNS lookup failure",
      likelyCause: "Incorrect hostname, DNS outage, invalid search domain or CoreDNS problem",
      verification: "Resolve the target name from an approved environment with the same DNS context as Prometheus",
      resolution: "Correct the hostname or restore DNS and verify service discovery"
    },
    {
      symptom: "HTTP 401",
      likelyCause: "Missing, expired or invalid authentication credentials",
      verification: "Check authentication configuration, credential rotation history and target authentication logs",
      resolution: "Restore the correct credential reference using the approved secret-management workflow"
    },
    {
      symptom: "HTTP 403",
      likelyCause: "Insufficient permissions or an authorization policy",
      verification: "Inspect authorization policy and target logs without exposing secrets",
      resolution: "Grant only the required metrics-read permission"
    },
    {
      symptom: "HTTP 404",
      likelyCause: "Wrong metrics path or proxy route",
      verification: "Compare configured metrics_path with the actual endpoint",
      resolution: "Correct the path or proxy routing"
    },
    {
      symptom: "TLS certificate error",
      likelyCause: "Expired certificate, wrong SAN, missing CA, incomplete chain or incorrect TLS settings",
      verification: "Inspect the certificate chain, hostname and configured CA",
      resolution: "Repair the certificate or scrape TLS configuration; preserve verification"
    },
    {
      symptom: "Target UP but metrics missing",
      likelyCause: "Instrumentation change, metric relabeling, changed labels, disabled collector or dashboard query issue",
      verification: "Compare raw endpoint metrics, Prometheus queries and metric relabeling rules",
      resolution: "Restore the expected metrics or update downstream queries safely"
    },
    {
      symptom: "Large group of targets fail simultaneously",
      likelyCause: "Shared network outage, DNS, credential rotation, common configuration error or Prometheus overload",
      verification: "Compare failure timestamps, target networks, jobs and recent shared changes",
      resolution: "Fix the shared dependency or roll back the confirmed bad shared change"
    },
    {
      symptom: "Scrapes fail after a Helm upgrade",
      likelyCause: "Rendered configuration change, selector change, changed labels, image version or secret reference",
      verification: "Compare Helm revisions and rendered manifests with the last known-good release",
      resolution: "Correct the chart values or roll back the affected release using the approved procedure"
    },
    {
      symptom: "Sample limit exceeded",
      likelyCause: "Target exposes too many samples or metric cardinality has increased",
      verification: "Inspect the exact scrape error, sample counts and recent metric changes",
      resolution: "Reduce unnecessary metrics/cardinality or adjust limits after capacity review"
    }
  ],

  advancedScenarios: [
    {
      scenario: "ServiceMonitor no longer selects the intended Service",
      evidence: [
        "Compare Service labels with ServiceMonitor.spec.selector.",
        "Check ServiceMonitor namespace selection.",
        "Check Prometheus serviceMonitorSelector and serviceMonitorNamespaceSelector.",
        "Inspect dropped targets and Operator logs.",
        "Compare the last known-good Git commit with the deployed manifest."
      ],
      fix: [
        "Correct the smallest confirmed label or namespace selector mismatch.",
        "Validate the rendered manifest before applying it.",
        "Use the standard deployment process to apply the change.",
        "Avoid setting selectors to match every Service as a shortcut."
      ],
      validation: [
        "The intended ServiceMonitor is selected.",
        "Expected endpoints appear in active targets.",
        "The target becomes UP.",
        "Expected metrics and labels return."
      ]
    },
    {
      scenario: "NetworkPolicy blocks Prometheus from reaching an exporter",
      evidence: [
        "Confirm the target is healthy from its own Pod.",
        "Confirm connectivity fails from the Prometheus network location.",
        "Inspect ingress and egress policies and namespace labels.",
        "Check CNI and cloud firewall logs where available.",
        "Compare the policy rollout time with the incident start."
      ],
      fix: [
        "Add a narrowly scoped policy rule for the intended Prometheus source and exporter destination.",
        "Use the correct namespace and Pod selectors.",
        "Preserve default-deny policies and unrelated restrictions.",
        "Obtain production approval before changing network policy."
      ],
      validation: [
        "Only the intended monitoring traffic is permitted.",
        "The exporter is reachable from Prometheus.",
        "Scrapes succeed across multiple intervals.",
        "No unrelated network access has been introduced."
      ]
    },
    {
      scenario: "Prometheus scrapes a reverse proxy instead of the metrics endpoint",
      evidence: [
        "Inspect the resolved target address and HTTP response headers.",
        "Check whether the response contains HTML, redirects or a login page.",
        "Compare the configured path and host with the proxy routing configuration.",
        "Check proxy access logs and upstream status."
      ],
      fix: [
        "Correct the endpoint or proxy route.",
        "Configure the intended Host or TLS server name where appropriate.",
        "Avoid scraping a general application page when a dedicated metrics endpoint is available."
      ],
      validation: [
        "The response contains valid metrics exposition.",
        "Prometheus reports UP.",
        "Expected metric families and labels are present."
      ]
    },
    {
      scenario: "Certificate rotation breaks HTTPS scraping",
      evidence: [
        "Compare certificate rotation time with scrape failure time.",
        "Inspect certificate expiry, SAN, issuer and chain.",
        "Check the configured CA bundle and whether the new certificate is trusted.",
        "Check whether the target hostname changed."
      ],
      fix: [
        "Repair the certificate chain or CA bundle through the approved process.",
        "Confirm the certificate's SAN matches the target hostname.",
        "Coordinate certificate rollout with trust-store updates where necessary.",
        "Do not disable certificate verification as a permanent solution."
      ],
      validation: [
        "TLS verification succeeds from Prometheus.",
        "The scrape endpoint returns valid metrics.",
        "The certificate renewal process has a tested future rollout."
      ]
    },
    {
      scenario: "A secret rotation breaks authenticated metrics collection",
      evidence: [
        "Check rotation timestamps and target authentication logs.",
        "Verify the configured secret reference and key name.",
        "Confirm the target expects the configured authentication scheme.",
        "Check whether all replicas received the new credential."
      ],
      fix: [
        "Correct the secret reference or rotate the credential using the established process.",
        "Ensure the monitoring configuration uses the correct authentication mechanism.",
        "Avoid printing secret values or embedding credentials in source code."
      ],
      validation: [
        "Authentication succeeds without exposing credentials.",
        "All expected targets recover.",
        "Old credentials are retired according to the security policy."
      ]
    },
    {
      scenario: "Scrape timeout caused by expensive exporter collectors",
      evidence: [
        "Compare scrape duration with target timeout.",
        "Inspect exporter logs and collector-specific latency.",
        "Check exporter CPU, memory, downstream API and database latency.",
        "Compare sample count and response size with normal behavior."
      ],
      fix: [
        "Disable or tune only confirmed expensive collectors when safe.",
        "Optimize the collector or its dependency query.",
        "Reduce unnecessary scrape frequency after assessing freshness requirements.",
        "Tune timeout only after checking the impact on Prometheus capacity."
      ],
      validation: [
        "Scrape duration returns below the configured timeout.",
        "Required metrics remain available.",
        "Exporter CPU and memory remain within expected limits."
      ]
    },
    {
      scenario: "High cardinality creates scrape and ingestion pressure",
      evidence: [
        "Inspect prometheus_tsdb_head_series and ingestion rates.",
        "Look for labels containing request IDs, session IDs, user IDs or unbounded URLs.",
        "Compare recent application releases with series growth.",
        "Inspect scrape sample counts and Prometheus memory usage."
      ],
      fix: [
        "Remove or normalize unbounded labels at instrumentation where possible.",
        "Use metric relabeling only when its behavior is understood and tested.",
        "Avoid indiscriminately dropping metrics required for incident response or SLOs.",
        "Review recording rules, retention and capacity after reducing unnecessary cardinality."
      ],
      validation: [
        "Series growth returns to an expected rate.",
        "Required business and infrastructure metrics remain queryable.",
        "Prometheus memory and ingestion latency stabilize."
      ]
    },
    {
      scenario: "Targets disappear after relabeling changes",
      evidence: [
        "Inspect active and dropped targets.",
        "Compare source labels and regular expressions.",
        "Check whether a keep rule depends on a label that no longer exists.",
        "Compare the current configuration with the last known-good version."
      ],
      fix: [
        "Correct the confirmed keep/drop or label replacement rule.",
        "Test it against representative target labels.",
        "Review the change before deploying it."
      ],
      validation: [
        "Expected targets return without unintentionally enabling unwanted targets.",
        "Target labels remain stable for dashboards and alerts.",
        "No unexpected target explosion occurs."
      ]
    },
    {
      scenario: "Scrapes succeed but dashboards report no data",
      evidence: [
        "Check up == 1 for the affected job.",
        "Query the expected raw metric directly.",
        "Compare metric labels and time ranges.",
        "Inspect recording rule health and dashboard variable filters.",
        "Review metric renames in recent application releases."
      ],
      fix: [
        "Correct the query, label selector, recording rule or instrumentation issue.",
        "Maintain backward compatibility when changing metric names.",
        "Do not restart Prometheus when the actual issue is a dashboard query."
      ],
      validation: [
        "Raw metrics return fresh samples.",
        "Dashboard panels show the intended data.",
        "Recording rules and alert expressions evaluate correctly."
      ]
    },
    {
      scenario: "Prometheus Operator does not load a monitor resource",
      evidence: [
        "Check the custom resource's namespace and labels.",
        "Inspect the Prometheus resource selectors.",
        "Review Operator logs and Kubernetes events.",
        "Verify that the resource fields are supported by the installed CRD version."
      ],
      fix: [
        "Correct the selector, namespace or unsupported field.",
        "Validate the custom resource against the deployed CRD.",
        "Apply the change through GitOps or the normal release pipeline."
      ],
      validation: [
        "The Operator accepts and reconciles the resource.",
        "The target appears in Prometheus service discovery.",
        "Scraping succeeds."
      ]
    },
    {
      scenario: "A scrape returns too many samples or malformed metrics",
      evidence: [
        "Capture the exact Prometheus scrape error.",
        "Inspect a controlled sample of the endpoint response.",
        "Check exporter version and metric exposition format.",
        "Check sample-limit and label-length settings."
      ],
      fix: [
        "Correct invalid exposition output or the exporter version.",
        "Reduce unnecessary samples at the source when possible.",
        "Adjust limits only after checking resource capacity and expected metric volume."
      ],
      validation: [
        "The target is UP.",
        "The expected metric families are ingested.",
        "No recurring parse or sample-limit errors appear."
      ]
    },
    {
      scenario: "A large number of targets fail after a shared infrastructure change",
      evidence: [
        "Group failures by job, namespace, network, node and timestamp.",
        "Compare with DNS, routing, firewall, secret and configuration deployments.",
        "Test representative targets from each affected network.",
        "Check whether unaffected targets share a different path or dependency."
      ],
      fix: [
        "Identify the shared failed dependency.",
        "Roll back the specific change if it is confirmed and rollback is safe.",
        "Restore service in a controlled manner and avoid broad security-policy bypasses."
      ],
      validation: [
        "Affected target groups recover.",
        "Unrelated targets remain healthy.",
        "The shared dependency has a corrective action and monitoring."
      ]
    }
  ],

  recoveryWorkflow: [
    "1. Preserve the incident timeline, failed target details, lastError values and relevant logs.",
    "2. Confirm the failure layer: discovery, network, DNS, endpoint, TLS, authentication, parsing, relabeling or capacity.",
    "3. Identify the last known-good configuration or deployment version.",
    "4. Choose the smallest correction that addresses the confirmed cause.",
    "5. Validate the change with promtool, rendered manifests or an equivalent pre-deployment check.",
    "6. Obtain the required approval for production changes.",
    "7. Apply the correction through the supported deployment or configuration-management workflow.",
    "8. Confirm that the intended configuration is loaded by Prometheus.",
    "9. Check target health and expected target count.",
    "10. Verify that metrics have fresh timestamps and correct labels.",
    "11. Confirm that dashboards, recording rules and alerts recover.",
    "12. Observe multiple scrape intervals and monitor for repeated failures.",
    "13. Check for secondary effects such as increased target count, cardinality or resource usage.",
    "14. Document root cause, recovery evidence, rollback decisions and prevention work."
  ],

  rollbackPlan: [
    "Define the rollback trigger before applying the production correction.",
    "Save the current Git commit, Helm revision or configuration version.",
    "Prefer reverting the specific selector, relabeling, endpoint, TLS or credential-reference change that caused the incident.",
    "For Helm-managed releases, inspect helm history and the currently deployed revision before choosing an approved rollback.",
    "For GitOps-managed clusters, revert the source change through Git rather than making an untracked manual edit.",
    "Do not roll back security fixes or credentials without reviewing their security implications.",
    "Do not delete TSDB data, WAL files, PVCs or persistent volumes as a scrape recovery procedure.",
    "After rollback, verify target health, target count, metrics freshness and application impact.",
    "If rollback does not restore service, stop repeating the same action and reassess the evidence.",
    "Record why rollback was or was not used."
  ],

  prevention: [
    "Version-control Prometheus configuration, Helm values and monitoring custom resources.",
    "Require code review for scrape configuration, relabeling, selector and authentication changes.",
    "Run promtool checks against rendered configuration before deployment.",
    "Validate Kubernetes manifests and custom resources against the installed CRDs.",
    "Add CI checks for missing endpoints, incorrect port names and unexpected selector changes.",
    "Maintain a baseline target count per job and alert on unexpected changes.",
    "Alert on persistent scrape failures and missing critical metrics.",
    "Monitor scrape duration, sample counts, target count, Prometheus resource use and ingestion rates.",
    "Test certificate renewal and secret rotation before production rollout.",
    "Document metrics endpoints, ports, paths, authentication and network requirements.",
    "Use least-privilege service accounts and narrowly scoped network policies.",
    "Keep exporter and Prometheus versions compatible and test upgrades in staging.",
    "Avoid unbounded metric labels and establish cardinality review for new instrumentation.",
    "Use redundant monitoring where required by the service's reliability objectives.",
    "Test monitoring recovery during controlled game days.",
    "Keep runbooks current with the actual deployment model and namespace names.",
    "Record known-good configuration revisions and recovery procedures.",
    "Review incident reports for repeat failures and implement durable fixes."
  ],

  alerting: [
    "Alert on persistent up == 0 for critical targets, with a duration suited to the scrape interval and service importance.",
    "Alert when critical expected targets disappear, because absent targets may not produce an up == 0 series.",
    "Monitor target counts by job against an approved baseline.",
    "Alert on sustained high scrape duration relative to the configured timeout.",
    "Alert on missing critical business metrics using appropriate absent or freshness checks.",
    "Monitor Prometheus readiness, restarts, OOM events, CPU, memory, disk and TSDB health.",
    "Monitor Prometheus Operator reconciliation errors when using the Operator.",
    "Alert on certificate expiry and authentication failures where telemetry is available.",
    "Route alerts to the responsible monitoring or application team with runbook links.",
    "Avoid paging on a single transient scrape failure unless the service requires immediate detection.",
    "Tune alert duration and thresholds to avoid both alert storms and delayed detection.",
    "Validate that alerts are delivered to the intended receiver during recovery testing."
  ],

  cicdValidation: [
    "Step 1: Check out the configuration repository and identify the target environment.",
    "Step 2: Render Helm templates using the exact environment values.",
    "Step 3: Run promtool check config against the rendered Prometheus configuration when available.",
    "Step 4: Run promtool check rules against the rendered rule files.",
    "Step 5: Validate Kubernetes manifests with the organization's approved schema and policy tools.",
    "Step 6: Check ServiceMonitor and PodMonitor selectors against the intended Service and Pod labels.",
    "Step 7: Check endpoint port names, scrape paths, schemes and namespace selectors.",
    "Step 8: Detect risky relabeling changes and unexpected drops in expected target count.",
    "Step 9: Scan configuration changes for accidentally committed tokens, passwords or private keys.",
    "Step 10: Deploy to staging and confirm targets are discovered and healthy.",
    "Step 11: Verify sample metrics, dashboards and alert rules before production promotion.",
    "Step 12: Require approval for production changes that affect critical monitoring.",
    "Step 13: Use a controlled rollout and monitor target health immediately after deployment.",
    "Step 14: Automatically stop promotion or trigger the approved rollback workflow if critical validation fails.",
    "Step 15: Save deployment metadata so incidents can be correlated with the exact configuration version."
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Diagnose an incorrect metrics path",
      objective: "Identify a target that returns HTTP 404 because the scrape path is wrong.",
      steps: [
        "Use a local test environment, not production.",
        "Configure a test scrape job with an intentionally incorrect metrics_path.",
        "Inspect the Targets page and record the exact HTTP error.",
        "Request the correct endpoint directly.",
        "Fix the path and reload the test configuration using the supported mechanism.",
        "Verify the target becomes UP and expected metrics appear."
      ],
      successCriteria: [
        "The root cause is identified from evidence.",
        "The target returns UP after the correction.",
        "The fix changes only the incorrect path."
      ]
    },
    {
      title: "Lab 2 — Diagnose a ServiceMonitor selector mismatch",
      objective: "Learn why a ServiceMonitor may exist without creating the expected target.",
      steps: [
        "Deploy a sample application, Service and ServiceMonitor in a test namespace.",
        "Intentionally mismatch the Service labels and monitor selector.",
        "Inspect active targets and service discovery.",
        "Compare the monitor selector with actual Service labels.",
        "Correct the selector and verify target discovery."
      ],
      successCriteria: [
        "The missing target is traced to selector matching.",
        "The target appears after the correction.",
        "No unrelated Services are selected."
      ]
    },
    {
      title: "Lab 3 — Investigate connection refused",
      objective: "Distinguish a wrong port from a general network outage.",
      steps: [
        "Deploy a test exporter on a known port.",
        "Configure a test job to use an incorrect port.",
        "Capture the target error and inspect the exporter listening port.",
        "Check the Service port and targetPort.",
        "Correct the port and validate the scrape."
      ],
      successCriteria: [
        "The wrong endpoint is identified.",
        "The corrected target becomes UP.",
        "The incident evidence includes the endpoint and listening-port comparison."
      ]
    },
    {
      title: "Lab 4 — Diagnose metric relabeling",
      objective: "Understand why a target can be UP while selected metrics are missing.",
      steps: [
        "Expose a small test metric set.",
        "Add a test metric_relabel_configs rule that drops one metric.",
        "Confirm that scraping succeeds but the selected metric is absent.",
        "Compare raw endpoint output with Prometheus query results.",
        "Correct the rule and verify the metric returns."
      ],
      successCriteria: [
        "Target health is distinguished from metric availability.",
        "The missing metric is traced to relabeling.",
        "The correction restores only the intended metrics."
      ]
    },
    {
      title: "Lab 5 — Investigate TLS verification failure",
      objective: "Diagnose certificate trust or hostname problems without disabling verification.",
      steps: [
        "Use a local test HTTPS endpoint with a test certificate.",
        "Configure the test scrape job with an incorrect CA or hostname.",
        "Capture the TLS error.",
        "Inspect the certificate SAN and trust chain.",
        "Correct the test CA or hostname configuration."
      ],
      successCriteria: [
        "The certificate problem is identified.",
        "TLS verification remains enabled.",
        "The test scrape succeeds after correction."
      ]
    },
    {
      title: "Lab 6 — Investigate slow scrapes",
      objective: "Identify an endpoint that approaches or exceeds its scrape timeout.",
      steps: [
        "Use a controlled test exporter with an adjustable response delay.",
        "Observe scrape_duration_seconds and target errors.",
        "Compare the measured duration with the configured timeout.",
        "Remove the artificial delay or optimize the test collector.",
        "Verify stable scraping over several intervals."
      ],
      successCriteria: [
        "The timeout relationship is understood.",
        "The target recovers without an unjustified global timeout increase.",
        "The validation includes scrape duration and error status."
      ]
    }
  ],

  incidentRunbook: [
    "DETECT: Confirm the alert, affected job and first failure timestamp.",
    "SCOPE: Identify affected clusters, namespaces, targets and business services.",
    "PRESERVE: Save target errors, logs, configuration versions and relevant events.",
    "CLASSIFY: Determine whether the issue is missing discovery, connectivity, HTTP, TLS, authentication, parsing, relabeling or capacity.",
    "COMPARE: Compare a failing target with a healthy target in the same job or environment.",
    "CORRELATE: Review deployments, secret rotations, certificate renewals and network changes.",
    "ISOLATE: Test from the Prometheus network location and inspect the actual endpoint.",
    "CORRECT: Apply the smallest evidence-based fix with the required approval.",
    "VERIFY: Confirm target recovery, expected metrics, stable scrape duration and correct labels.",
    "OBSERVE: Monitor for repeated failures across several scrape intervals.",
    "COMMUNICATE: Update stakeholders with impact, mitigation and current status.",
    "CLOSE: Document root cause, recovery time, rollback decision and preventive actions."
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Incident title: Prometheus scrape failures",
    "Severity:",
    "Environment / cluster:",
    "Affected Prometheus instance:",
    "Affected jobs and targets:",
    "Business and observability impact:",
    "Detection timestamp:",
    "First known failure timestamp:",
    "Recovery timestamp:",
    "Root cause:",
    "Evidence supporting root cause:",
    "Contributing factors:",
    "Corrective action:",
    "Rollback performed and reason:",
    "Validation evidence:",
    "Metrics and dashboards verified:",
    "Alert delivery verified:",
    "Prevention tasks and owners:",
    "Runbook or architecture documentation updated:",
    "Lessons learned:"
  ],

  interviewQuestions: [
    {
      question: "What is a Prometheus scrape failure?",
      answer:
        "It occurs when Prometheus cannot successfully collect metrics from a configured target. Common causes include connectivity, endpoint configuration, TLS, authentication, timeouts, invalid exposition and sample limits."
    },
    {
      question: "What does the up metric indicate?",
      answer:
        "For a represented target, up is 1 when the last scrape succeeded and 0 when it failed. If a target disappears from discovery, its up series may disappear rather than become zero."
    },
    {
      question: "How do you troubleshoot a target showing DOWN?",
      answer:
        "Read the exact last scrape error, verify the endpoint from Prometheus's network location, then investigate the relevant layer such as DNS, port, HTTP status, TLS, authentication, exporter health or timeout."
    },
    {
      question: "What is the difference between a missing target and a DOWN target?",
      answer:
        "A DOWN target is represented but its latest scrape failed. A missing target may not have been discovered, may have been dropped by relabeling, or may no longer match the active configuration."
    },
    {
      question: "What does connection refused usually mean?",
      answer:
        "The destination was reached but the connection was rejected, commonly because no process is listening on that address and port or an intermediate component actively rejected the connection."
    },
    {
      question: "What does context deadline exceeded mean?",
      answer:
        "The operation exceeded its deadline. Check target latency, network delays, exporter workload and configured scrape timeout before changing settings."
    },
    {
      question: "How do you troubleshoot HTTP 401 and 403?",
      answer:
        "For 401, verify the configured authentication method and credential validity. For 403, inspect authorization policies and required permissions. Do not expose credentials or grant broad access."
    },
    {
      question: "How do you troubleshoot HTTP 404?",
      answer:
        "Compare the configured metrics_path with the actual endpoint and inspect proxy routing. Confirm whether the endpoint uses a non-default metrics path."
    },
    {
      question: "Why can a target be UP while metrics are missing?",
      answer:
        "The endpoint may scrape successfully while instrumentation changes, metric relabeling, label changes, disabled collectors or dashboard queries cause expected metrics to be absent."
    },
    {
      question: "What is a ServiceMonitor?",
      answer:
        "In Prometheus Operator installations, a ServiceMonitor describes how to discover and scrape Services selected by its labels and namespace configuration."
    },
    {
      question: "What is a PodMonitor?",
      answer:
        "A PodMonitor describes how to discover and scrape Pods directly based on its selectors and namespace configuration."
    },
    {
      question: "How can a ServiceMonitor exist without creating targets?",
      answer:
        "The Prometheus resource may not select the monitor, namespace selectors may exclude it, labels may not match, or the selected Service may have no suitable endpoints."
    },
    {
      question: "What is the difference between relabel_configs and metric_relabel_configs?",
      answer:
        "Target relabeling changes or filters discovered targets before scraping. Metric relabeling changes or filters samples after collection and can remove metrics without making the target itself DOWN."
    },
    {
      question: "How do you diagnose TLS scrape failures?",
      answer:
        "Inspect the certificate chain, expiry, SAN, trust store, server name and configured CA or client certificate. Keep certificate verification enabled."
    },
    {
      question: "How do you identify a slow exporter?",
      answer:
        "Compare scrape_duration_seconds with the configured timeout, test endpoint latency from the Prometheus network, and inspect exporter logs, collectors and resource use."
    },
    {
      question: "What is a sample-limit failure?",
      answer:
        "A scrape can fail when the number of samples exceeds the configured limit. Inspect the exact error and sample count, then reduce unnecessary metrics or adjust the limit after capacity analysis."
    },
    {
      question: "How do you troubleshoot a sudden failure across many jobs?",
      answer:
        "Correlate timestamps and compare shared dependencies such as DNS, networking, credentials, configuration changes and Prometheus capacity before debugging each target individually."
    },
    {
      question: "How do you validate a Prometheus configuration?",
      answer:
        "Use a compatible promtool check config against the actual configuration file and check rules against the relevant rule files. For Operator installations, validate the rendered configuration and custom resources too."
    },
    {
      question: "Why should you avoid restarting Prometheus as the first action?",
      answer:
        "A restart may erase transient diagnostic context, cause temporary monitoring gaps and fail to correct the actual endpoint, selector, network or authentication problem."
    },
    {
      question: "How do you troubleshoot missing metrics after a deployment?",
      answer:
        "Compare the deployed instrumentation and scrape configuration with the previous version, then check endpoint output, labels, relabeling, recording rules and dashboard queries."
    },
    {
      question: "What is the difference between scrape interval and scrape timeout?",
      answer:
        "The interval determines how often a scrape is scheduled; the timeout determines how long a scrape attempt may take before failing. Timeout must be compatible with the interval and the expected endpoint latency."
    },
    {
      question: "How do you safely troubleshoot production NetworkPolicies?",
      answer:
        "Identify the exact Prometheus source, exporter destination and required port, inspect current policies and test connectivity. Apply a narrowly scoped approved rule rather than disabling policies broadly."
    },
    {
      question: "How do you confirm recovery?",
      answer:
        "Confirm expected targets are UP, target counts match the baseline, metrics are fresh, scrape durations are stable, dashboards and rules work, and no secondary failures occurred over several scrape intervals."
    },
    {
      question: "How do you prevent recurring scrape failures?",
      answer:
        "Use configuration validation, version control, staging checks, selector tests, endpoint tests, certificate and secret rotation tests, target-count alerts, runbooks and post-incident corrective actions."
    },
    {
      question: "What is the difference between Prometheus readiness and target health?",
      answer:
        "Readiness indicates that Prometheus is ready to serve requests. It does not guarantee that all configured targets are being scraped successfully."
    },
    {
      question: "How would you handle a production incident after a Helm upgrade?",
      answer:
        "Compare release revisions and rendered manifests, identify the exact changed setting, validate a correction or rollback, apply it through the approved process and verify target discovery and metric freshness."
    },
    {
      question: "What should an incident report contain?",
      answer:
        "Include impact, timeline, affected targets, root-cause evidence, corrective action, validation, rollback decisions, contributing factors, owners and prevention tasks."
    },
    {
      question: "Why is high metric cardinality dangerous?",
      answer:
        "Large numbers of unique label combinations increase series count, memory use and ingestion pressure. Unbounded labels such as request IDs or session IDs are common causes."
    }
  ],

  officialReferences: [
    {
      title: "Prometheus — Jobs and Instances",
      url: "https://prometheus.io/docs/concepts/jobs_instances/"
    },
    {
      title: "Prometheus — Configuration",
      url: "https://prometheus.io/docs/prometheus/latest/configuration/configuration/"
    },
    {
      title: "Prometheus — Querying API",
      url: "https://prometheus.io/docs/prometheus/latest/querying/api/"
    },
    {
      title: "Prometheus — Instrumentation and Exposition",
      url: "https://prometheus.io/docs/instrumenting/exposition_formats/"
    },
    {
      title: "Prometheus — promtool",
      url: "https://prometheus.io/docs/prometheus/latest/command-line/promtool/"
    },
    {
      title: "Prometheus Operator — API Reference",
      url: "https://prometheus-operator.dev/docs/api-reference/api/"
    },
    {
      title: "Kubernetes — Services and Networking",
      url: "https://kubernetes.io/docs/concepts/services-networking/"
    },
    {
      title: "Kubernetes — Network Policies",
      url: "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
    }
  ]
};
