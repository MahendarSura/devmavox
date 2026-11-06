import type { GlossaryTerm } from "./glossary-data";

export const monitoringGlossaryDetails: Record<string, Partial<GlossaryTerm>> = {
  "Metrics": {
    purpose: "Metrics provide numerical, time-stamped measurements that help engineers understand system health, application performance, capacity and reliability trends. They are efficient for dashboards, alerting and long-term comparisons because measurements can be aggregated across services and time windows.",
    project: "In an e-commerce production environment, Prometheus collects CPU and memory utilization from Kubernetes nodes, request rates from application services, HTTP error counts and API latency histograms. Grafana dashboards help the operations team compare current behaviour with normal traffic patterns and identify capacity problems before customers are affected.",
    workflow: [
      "An application or exporter exposes measurements through a metrics endpoint or telemetry SDK.",
      "A collector such as Prometheus scrapes the endpoint at a configured interval and attaches labels such as service, namespace and environment.",
      "Time-series samples are stored with timestamps and queried using PromQL.",
      "Grafana visualizes trends, rates, percentiles and resource utilization for engineering teams.",
      "Alert rules evaluate important measurements and notify responders when defined conditions persist."
    ],
    commands: [
      "curl -s http://localhost:9090/api/v1/query?query=up - checks the Prometheus query API for target availability.",
      "kubectl top nodes - displays current node CPU and memory usage when Metrics Server is available.",
      "kubectl top pods -n production - displays current Pod resource usage in the production namespace.",
      "PromQL example: rate(http_requests_total[5m]) - calculates the per-second request rate over a five-minute range."
    ],
    mistakes: [
      "Using high-cardinality labels such as user IDs, request IDs or email addresses can create excessive time-series volume.",
      "Monitoring only CPU and memory while ignoring application-level latency, errors and throughput leaves important failures invisible.",
      "Comparing raw counter values instead of using rate or increase can lead to misleading interpretations.",
      "Setting alert thresholds without understanding normal traffic patterns creates noisy alerts.",
      "Assuming a metric endpoint is healthy simply because the application process is running."
    ],
    configuration: [
      "Prometheus scrape configuration should define the target, scrape interval and relevant labels for each service.",
      "Application metrics should use counters for cumulative events, gauges for values that rise and fall, and histograms for distributions such as request duration.",
      "Example PromQL: sum(rate(http_requests_total{status=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m])) calculates the proportion of server errors.",
      "Use consistent labels such as environment, cluster, namespace and service across related metrics."
    ],
    troubleshooting: [
      "If a metric is missing, inspect the exporter or application metrics endpoint and verify that it returns valid metric data.",
      "Check Prometheus Targets to identify scrape failures, connection errors, authentication failures or incorrect paths.",
      "Verify label names and values in PromQL; a label mismatch can return an empty result even when samples exist.",
      "Check scrape intervals, retention settings and ingestion limits when data appears delayed or unavailable.",
      "Compare application instrumentation with dashboard queries to identify incorrect metric names or aggregation logic."
    ],
    bestPractices: [
      "Choose metrics that represent user experience and service behaviour, not only infrastructure utilization.",
      "Use clear metric names, units and descriptions, and follow consistent label conventions.",
      "Prefer histograms for latency distributions and calculate percentiles carefully.",
      "Control label cardinality and avoid unbounded label values.",
      "Review dashboards and alert rules as part of application changes and production readiness."
    ],
    securityConsiderations: [
      "Restrict metrics endpoints to trusted monitoring networks or authenticated collectors.",
      "Do not place passwords, access tokens, personal information or other secrets in metric labels.",
      "Protect Prometheus and exporter endpoints from unauthorized access and unnecessary public exposure.",
      "Apply access controls to dashboards because metric labels and service names may reveal internal architecture.",
      "Use TLS and appropriate authentication when metrics cross untrusted network boundaries."
    ]
  },

  "Logs": {
    purpose: "Logs are timestamped records of events produced by applications, operating systems, containers and infrastructure. They provide detailed evidence about what happened during a request or failure and help engineers investigate errors that aggregate metrics cannot explain.",
    project: "A checkout service running in Kubernetes writes structured JSON logs containing timestamps, severity, service name and correlation identifiers. A centralized logging platform collects container output so engineers can investigate failed payments across application replicas without logging into individual worker nodes.",
    workflow: [
      "Applications and infrastructure components write events to standard output, standard error or configured log files.",
      "A log agent or collector discovers log sources and enriches records with metadata such as container, Pod, namespace and host.",
      "The collector forwards records to a centralized storage and indexing platform.",
      "Engineers search by time range, severity, service and correlation identifier to investigate incidents.",
      "Retention, access policies and alert rules control how log data is stored and used."
    ],
    commands: [
      "kubectl logs deployment/checkout -n production --since=30m - retrieves recent logs from a deployment.",
      "kubectl logs pod-name -n production --previous - retrieves logs from the previous container instance when available.",
      "journalctl -u nginx --since \"30 minutes ago\" - inspects recent systemd service logs.",
      "docker logs --tail 100 container-name - displays the latest container log lines.",
      "grep -i \"error\" application.log - searches a local log file for error messages."
    ],
    mistakes: [
      "Writing unstructured messages without timestamps, severity or useful context makes investigation difficult.",
      "Logging passwords, authorization headers, tokens or personal information creates serious data exposure risks.",
      "Relying only on local container files can lose evidence when containers or nodes are replaced.",
      "Using excessive debug logging in production increases storage cost and can expose sensitive implementation details.",
      "Ignoring log rotation and retention can fill disks or cause unexpected data loss."
    ],
    configuration: [
      "Configure applications to emit structured JSON with timestamp, severity, service, environment and trace correlation fields.",
      "Use Fluent Bit, Vector or another approved collector to forward container and host logs.",
      "Example Kubernetes inspection: kubectl logs deployment/api -n production --since=15m.",
      "Define retention periods, index lifecycle policies, parsing rules and field mappings according to operational and compliance requirements."
    ],
    troubleshooting: [
      "If logs are missing, verify that the application writes to the expected output stream or file.",
      "Check collector Pod health, file permissions, input paths and forwarding errors.",
      "Inspect destination connectivity, credentials, ingestion limits and index availability.",
      "Check timestamps and timezone handling when expected events do not appear in the selected search window.",
      "Use a correlation ID to follow one request across services and compare application logs with traces and metrics."
    ],
    bestPractices: [
      "Prefer structured logs with consistent field names and severity levels.",
      "Include request or trace identifiers to connect logs with distributed traces.",
      "Use appropriate log levels and avoid unnecessary high-volume messages.",
      "Centralize important production logs and establish tested retention and backup policies.",
      "Document operational queries for common incidents and recurring failure patterns."
    ],
    securityConsiderations: [
      "Redact credentials, tokens, payment information and personal data before records leave the application.",
      "Encrypt log transport and storage using approved security controls.",
      "Restrict search, export and administrative access through role-based permissions.",
      "Audit access to sensitive logs and define retention according to legal and organizational requirements.",
      "Protect log pipelines against injection and treat log content as untrusted input."
    ]
  },

  "Distributed Tracing": {
    purpose: "Distributed tracing follows a request as it travels across multiple services and records timing, parent-child relationships and dependency information. It helps engineers identify where latency, errors or unexpected behaviour occur in a distributed application.",
    project: "A customer places an order through an API gateway, checkout service, inventory service and payment service. OpenTelemetry instrumentation creates spans for each operation and exports traces to a tracing backend. Engineers inspect a slow trace to discover that the payment database call is responsible for most of the request delay.",
    workflow: [
      "A request enters an instrumented service and receives a trace context.",
      "The service creates spans for important operations such as HTTP calls, database queries and message processing.",
      "Trace context is propagated to downstream services using supported context propagation headers.",
      "Instrumentation exports spans through an OpenTelemetry Collector or another supported pipeline.",
      "A tracing backend stores and displays traces so engineers can inspect service dependencies, errors and latency."
    ],
    commands: [
      "kubectl get pods -n observability - checks the status of tracing and telemetry collector workloads.",
      "kubectl logs deployment/otel-collector -n observability --since=15m - checks collector logs.",
      "kubectl describe service otel-collector -n observability - inspects the collector Service configuration.",
      "curl -s http://localhost:13133/ - checks the OpenTelemetry Collector health endpoint when configured."
    ],
    mistakes: [
      "Failing to propagate trace context across HTTP, messaging or asynchronous boundaries breaks end-to-end traces.",
      "Creating too many spans for trivial operations increases ingestion volume without meaningful diagnostic value.",
      "Using inconsistent service names makes dependency maps difficult to interpret.",
      "Assuming every request is sampled can lead engineers to misinterpret missing traces.",
      "Recording sensitive request bodies, query parameters or headers can expose confidential information."
    ],
    configuration: [
      "Instrument supported application frameworks with OpenTelemetry SDKs or automatic instrumentation.",
      "Configure OTLP exporters and collector receivers for the protocols used by the environment.",
      "Propagate trace context using supported W3C Trace Context headers such as traceparent.",
      "Set resource attributes including service.name, service.version and deployment.environment.name.",
      "Use sampling policies that balance diagnostic coverage, backend capacity and telemetry cost."
    ],
    troubleshooting: [
      "If traces stop at a service boundary, inspect context propagation headers and instrumentation configuration.",
      "Check collector receiver, processor and exporter health and look for rejected or dropped spans.",
      "Verify that service names, endpoint addresses and OTLP protocols match the backend configuration.",
      "Compare trace timestamps and clock synchronization across services when span ordering looks incorrect.",
      "Check sampling rules before concluding that instrumentation is broken."
    ],
    bestPractices: [
      "Use consistent service identity and semantic conventions across all instrumented services.",
      "Create spans around meaningful operations and record errors with useful attributes.",
      "Propagate context through synchronous and asynchronous communication paths.",
      "Combine traces with metrics and logs using trace identifiers and exemplars where supported.",
      "Review sampling strategies and collector capacity as request volume grows."
    ],
    securityConsiderations: [
      "Avoid capturing credentials, tokens, personal data and sensitive payloads in span attributes.",
      "Restrict access to tracing backends because traces can reveal internal service topology.",
      "Use authenticated and encrypted telemetry transport across network boundaries.",
      "Validate incoming trace context and avoid trusting arbitrary external baggage values.",
      "Set retention and access policies appropriate for production telemetry."
    ]
  },

  "Prometheus": {
    purpose: "Prometheus is an open-source monitoring and alerting system that collects time-series metrics, stores samples and supports flexible querying through PromQL. Its pull-based scraping model and service discovery integrations make it widely used for monitoring Kubernetes and cloud-native workloads.",
    project: "A DevOps team deploys Prometheus into an EKS observability namespace. Prometheus discovers application endpoints and Kubernetes exporters, scrapes their metrics, evaluates recording and alerting rules, and provides data to Grafana dashboards. Alertmanager routes firing alerts to the on-call notification system.",
    workflow: [
      "Configure scrape jobs and service discovery for applications, exporters and infrastructure targets.",
      "Prometheus periodically scrapes metrics endpoints and stores samples as time series.",
      "Engineers query metrics using PromQL and build reusable recording rules for expensive expressions.",
      "Alerting rules evaluate service conditions and send firing alerts to Alertmanager.",
      "Monitor Prometheus itself, including target health, ingestion, storage capacity and rule evaluation."
    ],
    commands: [
      "promtool check config prometheus.yml - validates Prometheus configuration syntax.",
      "promtool check rules alert-rules.yml - validates alerting and recording rule files.",
      "kubectl get pods -n monitoring - checks Prometheus-related Pod status.",
      "kubectl port-forward svc/prometheus 9090:9090 -n monitoring - exposes the Prometheus UI locally when the Service exists.",
      "PromQL: up - checks whether discovered scrape targets are currently healthy."
    ],
    mistakes: [
      "Using unbounded label values creates high cardinality and increases memory and storage consumption.",
      "Incorrect scrape paths, ports or relabeling rules can silently exclude required targets.",
      "Configuring alert rules without a suitable duration can cause transient spikes to trigger incidents.",
      "Treating Prometheus as a permanent long-term archive without planning retention and remote storage.",
      "Ignoring Prometheus self-monitoring can allow monitoring failures to remain undetected."
    ],
    configuration: [
      "Define scrape_configs with targets or Kubernetes service discovery and appropriate scrape intervals.",
      "Use external_labels carefully to identify cluster, environment or Prometheus replica where required.",
      "Example query: sum(rate(http_requests_total[5m])) by (service) calculates request rate per service.",
      "Example query: histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, service)) estimates the 95th percentile latency.",
      "Configure persistent storage, retention limits, resource requests and resource limits for production deployments."
    ],
    troubleshooting: [
      "Inspect the Targets page and the up metric to identify failed scrapes.",
      "Use promtool to validate configuration and rule files before reloading or deploying changes.",
      "Check Prometheus logs for discovery errors, scrape timeouts, rejected samples and storage problems.",
      "Inspect PVC status, disk capacity and retention settings if ingestion or compaction fails.",
      "Verify PromQL labels and time ranges when queries return empty or unexpected results."
    ],
    bestPractices: [
      "Use service discovery rather than manually maintaining dynamic Kubernetes Pod addresses.",
      "Set resource requests, limits, storage capacity and retention based on measured ingestion volume.",
      "Keep metric labels bounded and use recording rules for frequently evaluated expensive queries.",
      "Monitor scrape health, rule evaluation failures, ingestion rate and storage utilization.",
      "Back up important configuration and test upgrades and rule changes before production rollout."
    ],
    securityConsiderations: [
      "Do not expose the Prometheus UI or API publicly without strong access controls.",
      "Restrict scrape access and network paths to approved targets.",
      "Protect configuration files and Kubernetes Secrets used by authenticated scrape jobs.",
      "Use TLS and authentication for remote write, federation and external integrations where supported.",
      "Limit access to administrative endpoints and apply least-privilege permissions to monitoring workloads."
    ]
  },

  "Grafana": {
    purpose: "Grafana is an observability and visualization platform that connects to data sources such as Prometheus and log or tracing backends. It helps teams build dashboards, explore telemetry, configure alerts and communicate production system health.",
    project: "An engineering team creates Grafana dashboards for an EKS-hosted application. Panels display request rate, error percentage, p95 latency, node utilization and Pod restarts. A shared operations dashboard gives developers and on-call engineers a consistent view during deployments and incidents.",
    workflow: [
      "Configure approved data sources and verify connectivity to monitoring backends.",
      "Create dashboards with panels, variables, queries and meaningful units.",
      "Organize dashboards into folders and assign role-based access.",
      "Configure alert rules and notification contact points when Grafana-managed alerting is used.",
      "Provision dashboards and data sources through version-controlled configuration for repeatable environments."
    ],
    commands: [
      "kubectl get pods -n monitoring -l app.kubernetes.io/name=grafana - checks Grafana Pod status when these labels are used.",
      "kubectl logs deployment/grafana -n monitoring --since=15m - inspects Grafana logs.",
      "kubectl port-forward svc/grafana 3000:80 -n monitoring - forwards a local port when the Service exposes port 80.",
      "curl -I http://localhost:3000/api/health - checks the local Grafana health endpoint when port forwarding is active."
    ],
    mistakes: [
      "Building dashboards with too many panels and unrelated signals makes important information difficult to find.",
      "Using incorrect units or aggregation functions can make charts misleading.",
      "Hardcoding environment-specific values prevents dashboard reuse across environments.",
      "Saving dashboards only through manual UI edits can cause configuration drift and accidental loss.",
      "Giving broad editor or administrator access to all users increases operational risk."
    ],
    configuration: [
      "Configure data sources with the correct endpoint, authentication method and TLS settings.",
      "Use dashboard variables for environment, cluster, namespace and service selection.",
      "Provision data sources and dashboards through version-controlled YAML or supported provisioning mechanisms.",
      "Use panel descriptions, units, thresholds and links to make dashboards understandable during incidents.",
      "Configure alert evaluation, contact points and notification policies according to the chosen alerting model."
    ],
    troubleshooting: [
      "Use Grafana's data source test to identify connectivity, authentication and query errors.",
      "Inspect Grafana server logs for plugin failures, database issues and provisioning errors.",
      "Check dashboard time ranges, variables and query labels when panels display no data.",
      "Verify user roles and folder permissions when dashboards are visible to some users but not others.",
      "Check backend availability and query performance when dashboards load slowly."
    ],
    bestPractices: [
      "Create dashboards around service ownership and operational questions rather than collecting unrelated charts.",
      "Provision important dashboards as code and review changes through version control.",
      "Use reusable variables, consistent naming and documented units.",
      "Build service overview dashboards that show traffic, errors, latency and saturation.",
      "Review dashboard usefulness and alert quality after production incidents."
    ],
    securityConsiderations: [
      "Use a trusted identity provider or approved authentication method and disable insecure default access.",
      "Restrict organization, folder and data-source permissions using least privilege.",
      "Store data-source credentials securely and avoid embedding secrets in dashboard JSON.",
      "Use HTTPS and secure cookies for externally accessed Grafana instances.",
      "Keep Grafana and plugins patched and install only trusted plugins."
    ]
  },

  "Alertmanager": {
    purpose: "Alertmanager receives alerts from Prometheus-compatible alerting systems and manages notification delivery. It groups related alerts, routes them to appropriate receivers, suppresses duplicates, supports silences and inhibits lower-priority alerts during known incidents.",
    project: "During a production database outage, several services generate related alerts. Alertmanager groups them into a single incident notification and routes the critical notification to the database on-call team. A silence is applied during an approved maintenance window to prevent unnecessary paging.",
    workflow: [
      "Prometheus evaluates alerting rules and sends firing or resolved alert events to Alertmanager.",
      "Alertmanager evaluates route labels and matches alerts to the configured receiver.",
      "Grouping combines related alerts into fewer notifications.",
      "Inhibition suppresses lower-priority alerts when a related higher-priority alert is active.",
      "Silences temporarily suppress matching notifications, while notification delivery and resolution are monitored."
    ],
    commands: [
      "amtool check-config alertmanager.yml - validates Alertmanager configuration.",
      "amtool alert query --alertmanager.url=http://localhost:9093 - queries active alerts when the endpoint is reachable.",
      "amtool silence query --alertmanager.url=http://localhost:9093 - lists active silences.",
      "kubectl logs deployment/alertmanager -n monitoring --since=15m - inspects Alertmanager logs."
    ],
    mistakes: [
      "Missing or overly broad route matchers send alerts to the wrong team or receiver.",
      "Incorrect grouping labels create notification floods or hide important distinctions.",
      "Long-lived silences can suppress critical alerts after maintenance has ended.",
      "Incorrect inhibition rules can suppress unrelated incidents.",
      "Failing to monitor notification delivery can leave teams unaware that paging integrations are broken."
    ],
    configuration: [
      "Define a root route with a default receiver and child routes for service, severity or team labels.",
      "Configure group_by, group_wait, group_interval and repeat_interval based on incident response needs.",
      "Store receiver credentials in protected Secrets and reference them through supported configuration mechanisms.",
      "Define inhibition rules using carefully chosen source and target matchers.",
      "Validate configuration with amtool before applying changes."
    ],
    troubleshooting: [
      "Inspect active alerts and labels to determine why a route did or did not match.",
      "Run amtool check-config and review Alertmanager logs for parsing or reload failures.",
      "Verify receiver endpoints, authentication credentials, network access and rate limits.",
      "Inspect active silences and their matchers when notifications are unexpectedly missing.",
      "Check grouping and inhibition rules when notifications are duplicated or suppressed."
    ],
    bestPractices: [
      "Route alerts according to service ownership and severity.",
      "Use grouping and inhibition to reduce duplicate notifications without hiding distinct failures.",
      "Set an explicit owner and expiry for maintenance silences.",
      "Test notification integrations and document escalation procedures.",
      "Run redundant Alertmanager instances where availability requirements justify it."
    ],
    securityConsiderations: [
      "Protect the Alertmanager API and web interface from unauthorized access.",
      "Store webhook tokens and receiver credentials in secure secret storage.",
      "Use TLS for notification integrations and restrict network egress to approved receivers.",
      "Avoid exposing sensitive internal details in alert annotations sent to external channels.",
      "Restrict who can create silences or change routing configuration."
    ]
  },

  "Dashboard": {
    purpose: "A dashboard is an organized visual presentation of metrics, logs, alerts or other operational data. It gives engineers a shared view of system behaviour, service health and trends so they can detect issues and make informed decisions quickly.",
    project: "A production operations dashboard combines application request rate, error percentage, p95 response time, Kubernetes Pod readiness, node resource usage and active alerts. During a deployment, engineers compare current values with the previous release to detect regressions.",
    workflow: [
      "Identify the operational questions and audience the dashboard must support.",
      "Select reliable data sources and define queries for each panel.",
      "Organize panels into logical sections such as traffic, errors, latency and infrastructure.",
      "Add useful variables, units, thresholds and time-range controls.",
      "Review dashboard behaviour during normal operations and incidents and update it when service architecture changes."
    ],
    commands: [
      "kubectl get pods -n production -o wide - checks workload placement and Pod readiness for dashboard investigation.",
      "kubectl top pods -n production - displays current Pod resource consumption.",
      "kubectl get events -n production --sort-by=.lastTimestamp - inspects recent namespace events.",
      "curl -s http://localhost:9090/api/v1/query?query=up - checks the Prometheus API for target availability when accessible."
    ],
    mistakes: [
      "Showing many charts without clear operational purpose makes dashboards difficult to use.",
      "Using inconsistent units or time ranges leads to incorrect comparisons.",
      "Displaying only averages can hide latency problems affecting a smaller group of users.",
      "Failing to identify the environment or service can cause engineers to investigate the wrong system.",
      "Allowing dashboards to become outdated after service changes reduces trust in monitoring."
    ],
    configuration: [
      "Organize panels by service and operational signals such as traffic, errors, latency and saturation.",
      "Use variables for environment, cluster, namespace and service where the data source supports them.",
      "Configure units, thresholds, descriptions and links to relevant runbooks.",
      "Provision critical dashboards through version-controlled configuration.",
      "Choose refresh intervals that balance operational usefulness with query load."
    ],
    troubleshooting: [
      "Check data-source connectivity when all panels show no data.",
      "Inspect individual panel queries and variables when only some panels are empty.",
      "Verify time range, timezone, units and label filters when values appear incorrect.",
      "Check query latency and backend resource utilization when dashboard loading is slow.",
      "Compare panel results with direct backend queries to isolate visualization errors from data collection problems."
    ],
    bestPractices: [
      "Design dashboards around service-level health and common incident questions.",
      "Put the most important signals near the top and use consistent units and naming.",
      "Include links to runbooks, deployment information and related dashboards.",
      "Keep dashboards reusable across environments through variables and provisioning.",
      "Review dashboards with service owners after incidents and significant architecture changes."
    ],
    securityConsiderations: [
      "Apply folder and dashboard permissions based on team responsibilities.",
      "Avoid displaying credentials, personal information or sensitive payloads in panels.",
      "Protect dashboard editing and provisioning permissions.",
      "Use authenticated data sources and secure transport.",
      "Review public-sharing settings and external links before exposing dashboards outside the organization."
    ]
  },

  "Alert": {
    purpose: "An alert is an actionable notification generated when a monitored condition indicates a possible failure, performance degradation or required operational response. Well-designed alerts help teams respond to user-impacting conditions without overwhelming them with noise.",
    project: "A checkout service alert evaluates the percentage of failed HTTP requests over a rolling window. When the error ratio remains above the agreed threshold, the monitoring platform sends a critical notification to the on-call engineer with the affected service, environment and runbook link.",
    workflow: [
      "Identify a user-impacting symptom or operational risk that requires human or automated action.",
      "Select a reliable metric or event and define an evaluation condition.",
      "Choose an evaluation window and persistence duration to avoid reacting to brief fluctuations.",
      "Attach severity, service ownership, environment and actionable runbook information.",
      "Route notifications to the correct responder and review alert quality after resolution."
    ],
    commands: [
      "promtool check rules alert-rules.yml - validates Prometheus alerting rules.",
      "kubectl get events -n production --sort-by=.lastTimestamp - reviews recent workload events during an alert.",
      "kubectl describe pod pod-name -n production - investigates a Pod-related alert.",
      "kubectl logs deployment/api -n production --since=10m - checks recent application errors."
    ],
    mistakes: [
      "Alerting on every small metric fluctuation creates alert fatigue.",
      "Using thresholds without a duration can trigger notifications for short-lived spikes.",
      "Creating alerts without an owner or runbook leaves responders unsure what to do.",
      "Using only infrastructure signals can miss real user-facing failures.",
      "Failing to test notification delivery can create a false sense of operational coverage."
    ],
    configuration: [
      "Define alert expressions using meaningful service metrics and labels.",
      "Use a persistence duration such as for: 5m when transient conditions should not page responders.",
      "Add annotations for summary, description, affected service and runbook URL.",
      "Assign severity and ownership labels that match the incident response policy.",
      "Configure notification grouping, repeat intervals and escalation through the approved alerting platform."
    ],
    troubleshooting: [
      "Inspect the evaluated expression and confirm that the underlying metric is present.",
      "Check alert state transitions and pending duration to understand why an alert has not fired.",
      "Verify label matchers and route configuration when a firing alert produces no notification.",
      "Inspect receiver logs and delivery errors when messages are delayed or rejected.",
      "Review recent deployments and correlated logs, traces and metrics to identify the actual cause."
    ],
    bestPractices: [
      "Page on symptoms that require action, especially sustained user-impacting failures.",
      "Separate urgent paging alerts from lower-priority tickets or informational notifications.",
      "Include clear descriptions, ownership and tested runbook links.",
      "Use SLO burn-rate alerts for important user-facing services where appropriate.",
      "Review false positives, missed incidents and notification volume regularly."
    ],
    securityConsiderations: [
      "Do not include passwords, tokens or sensitive customer information in alert labels or annotations.",
      "Restrict access to alert configuration and notification integrations.",
      "Store webhook and paging credentials in protected secret storage.",
      "Secure notification channels and verify recipients for sensitive operational details.",
      "Audit changes to alert rules, routing policies and silences."
    ]
  },

  "SLI": {
    purpose: "A Service Level Indicator is a measurable signal that represents an important aspect of service reliability or user experience. Examples include request success ratio, availability, latency, throughput and data freshness. A well-defined SLI uses an explicit measurement method and a clearly stated population of events.",
    project: "An online shopping platform defines request availability as the ratio of eligible successful checkout requests to all eligible checkout requests over a measurement window. Prometheus records the required counters and the team uses the resulting SLI to evaluate its reliability target.",
    workflow: [
      "Identify the user journey or service capability whose reliability matters.",
      "Define eligible good events and total eligible events precisely.",
      "Choose a trustworthy measurement source such as application metrics or request logs.",
      "Calculate the indicator over a clearly defined time window.",
      "Validate that the measurement reflects actual user experience and use it in SLO reporting."
    ],
    commands: [
      "PromQL example: sum(rate(http_requests_total{service=\"checkout\",status=~\"2..\"}[5m])) / sum(rate(http_requests_total{service=\"checkout\"}[5m])) calculates a success ratio when the metric labels represent eligible requests.",
      "PromQL example: histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le)) estimates p95 request latency.",
      "kubectl get --raw /metrics - retrieves the Kubernetes API metrics endpoint when the caller has permission and the endpoint is available."
    ],
    mistakes: [
      "Defining an indicator without specifying which requests or events are included.",
      "Counting health checks or internal retries as successful user requests without considering their meaning.",
      "Using averages when the service objective concerns tail latency.",
      "Changing the SLI calculation without documenting the effect on historical comparisons.",
      "Selecting measurements that are easy to collect but do not represent user experience."
    ],
    configuration: [
      "Define numerator, denominator, exclusions, measurement source and evaluation window in an SLI specification.",
      "Use counters for eligible good and total events where application instrumentation supports them.",
      "Create recording rules for frequently used SLI calculations.",
      "Document whether latency is measured at the gateway, service boundary or client experience.",
      "Keep SLI definitions consistent across dashboards, SLO reports and alerting rules."
    ],
    troubleshooting: [
      "Compare metric totals with access logs or independent request counts to find missing instrumentation.",
      "Inspect label filters and exclusions when the ratio changes unexpectedly.",
      "Check counter resets, duplicate events and missing scrape intervals.",
      "Verify histogram bucket configuration when latency percentile calculations look incorrect.",
      "Review changes to routing, retries and health checks that may have changed the measured request population."
    ],
    bestPractices: [
      "Choose indicators that directly represent important user journeys.",
      "Write an explicit good-event and total-event definition.",
      "Use a measurement source that is reliable and independently verifiable.",
      "Document exclusions, units and time windows.",
      "Review SLI definitions when architecture or customer usage changes."
    ],
    securityConsiderations: [
      "Aggregate measurements without exposing customer identities or sensitive request details.",
      "Restrict access to detailed telemetry used to calculate indicators.",
      "Protect metrics pipelines against unauthorized modification.",
      "Document data retention and privacy requirements for underlying measurements.",
      "Ensure SLI reporting cannot reveal confidential customer or business information."
    ]
  },

  "SLO": {
    purpose: "A Service Level Objective is an internally defined reliability target for a service level indicator over a specified measurement window. It helps teams balance reliability, release speed and operational investment by defining an agreed level of service quality.",
    project: "A checkout platform adopts a 99.9 percent successful-request SLO over a rolling 30-day window. The team monitors the SLI, tracks the remaining error budget and uses burn-rate alerts to detect when reliability is deteriorating faster than expected.",
    workflow: [
      "Select an SLI that reflects a meaningful user experience.",
      "Set a realistic target and measurement window with service stakeholders.",
      "Calculate actual performance against the objective.",
      "Calculate the error budget allowed by the target and observe how quickly it is consumed.",
      "Use reliability trends and error-budget policy to guide incident response and release decisions."
    ],
    commands: [
      "PromQL example: 1 - (sum(rate(http_requests_total{service=\"checkout\",status=~\"2..\"}[5m])) / sum(rate(http_requests_total{service=\"checkout\"}[5m]))) estimates the unsuccessful-request ratio when the metric definition is appropriate.",
      "PromQL example: sum(rate(http_requests_total{service=\"checkout\",status=~\"5..\"}[1h])) / sum(rate(http_requests_total{service=\"checkout\"}[1h])) calculates a server-error ratio over one hour.",
      "promtool check rules slo-alerts.yml - validates the SLO-related alert rules file."
    ],
    mistakes: [
      "Setting an ambitious target without considering architecture, dependencies and operational capability.",
      "Defining an SLO without a reliable SLI or clear measurement window.",
      "Treating the SLO as a contractual guarantee when it is an internal objective.",
      "Ignoring error-budget consumption until the target has already been missed.",
      "Using an SLO that is not connected to engineering decisions or incident response."
    ],
    configuration: [
      "Document the SLI formula, target percentage, rolling or calendar measurement window and eligible request population.",
      "For a 99.9 percent objective, the allowed unsuccessful-event ratio is 0.1 percent of eligible events.",
      "Create recording rules for SLI compliance and error-budget calculations.",
      "Configure burn-rate alerts using appropriate short and long windows for the service.",
      "Publish an SLO dashboard showing current performance, target and remaining error budget."
    ],
    troubleshooting: [
      "Check the underlying SLI data before investigating an apparent SLO breach.",
      "Verify the measurement window and request exclusions when reports disagree.",
      "Inspect scrape gaps and instrumentation changes that may distort compliance calculations.",
      "Compare burn-rate alerts with actual error-budget consumption.",
      "Review recent releases, dependencies and incidents that correlate with reliability degradation."
    ],
    bestPractices: [
      "Set objectives based on user needs and measured service capability.",
      "Use a small number of meaningful SLOs instead of tracking every internal metric as an objective.",
      "Make error-budget policy clear to engineering and product stakeholders.",
      "Review objectives periodically as architecture and customer expectations evolve.",
      "Use SLO results to guide prioritization rather than treating the target as a vanity dashboard number."
    ],
    securityConsiderations: [
      "Protect access to operational reliability reports where they reveal sensitive service performance.",
      "Prevent unauthorized changes to SLI queries, SLO targets and reporting configuration.",
      "Use audited, version-controlled changes for objective definitions.",
      "Avoid exposing customer-level data in SLO dashboards.",
      "Ensure monitoring data used for compliance reporting has appropriate integrity and access controls."
    ]
  },

  "SLA": {
    purpose: "A Service Level Agreement is a formal agreement between a service provider and a customer that defines measurable service commitments, measurement rules, responsibilities and possible remedies when commitments are not met. It may include availability, support response times and service-credit conditions.",
    project: "A company uses a cloud hosting provider whose contract defines monthly availability commitments and service-credit eligibility. The operations team monitors actual service performance and preserves incident records so the organization can evaluate whether the provider met its contractual obligations.",
    workflow: [
      "Review the agreement and identify the covered services, availability target and measurement period.",
      "Understand the agreement's exclusions, maintenance rules and calculation method.",
      "Collect reliable monitoring evidence for the covered service.",
      "Record incidents, duration, impact and provider communications.",
      "Compare measured performance with the contractual commitment and follow the defined claim or escalation process."
    ],
    commands: [
      "PromQL example: avg_over_time(service_availability_ratio[30d]) calculates an average over 30 days when the metric is a suitable sampled ratio; verify that this matches the contract's actual calculation method.",
      "kubectl get events -A --sort-by=.lastTimestamp - helps collect cluster event evidence during an incident.",
      "kubectl get pods -A -o wide - captures workload status across namespaces for operational investigation.",
      "date -u - provides a UTC timestamp useful when recording incident timelines."
    ],
    mistakes: [
      "Assuming an internal SLO and a contractual SLA are interchangeable.",
      "Ignoring contractual exclusions, maintenance windows or measurement definitions.",
      "Using monitoring calculations that do not match the agreement's stated method.",
      "Failing to preserve incident timelines and evidence needed for service-credit claims.",
      "Treating a service-credit remedy as a replacement for technical reliability improvements."
    ],
    configuration: [
      "Record the contractual target, covered service, measurement window and calculation method in an approved service register.",
      "Maintain monitoring dashboards that reflect the agreement's actual availability definition.",
      "Document incident start and end times using a consistent timezone.",
      "Retain approved incident evidence, provider status updates and communication records.",
      "Have the legal, procurement or service-management owner review contractual interpretations and claim deadlines."
    ],
    troubleshooting: [
      "Compare measured downtime with the agreement's definition of an eligible service outage.",
      "Check whether the incident involved an excluded component or scheduled maintenance period.",
      "Validate timestamps and monitoring gaps before calculating contractual availability.",
      "Collect provider incident reports and internal service evidence for disputed events.",
      "Escalate interpretation of contractual terms to the appropriate legal or commercial owner."
    ],
    bestPractices: [
      "Keep SLA commitments, internal SLOs and operational SLIs clearly distinguished.",
      "Use reliable monitoring and incident records to support service reviews.",
      "Review provider commitments before adopting a critical external dependency.",
      "Track renewal dates, escalation contacts and claim submission deadlines.",
      "Use SLA reviews to identify supplier risks and improve service resilience."
    ],
    securityConsiderations: [
      "Store contracts, provider reports and incident evidence in approved access-controlled repositories.",
      "Protect customer and provider information included in service reports.",
      "Maintain integrity and audit history for evidence used in contractual reviews.",
      "Share incident information with providers through approved secure channels.",
      "Do not publish confidential contractual terms or sensitive incident details in public dashboards."
    ]
  }
};
