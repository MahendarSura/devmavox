export type MonitoringSection = {
  title: string;
  content: string;
  code?: string;
  practicalNotes?: string[];
};

export type MonitoringLesson = {
  title: string;
  description: string;
  sections: MonitoringSection[];
  exercise: string;
};

const section = (
  title: string,
  content: string,
  code?: string,
  practicalNotes?: string[]
): MonitoringSection => ({
  title,
  content,
  ...(code ? { code } : {}),
  ...(practicalNotes ? { practicalNotes } : {})
});

export const stageTwelveLessonOverrides: Record<string, MonitoringLesson> = {
  "Observability Fundamentals": {
    title: "Observability Fundamentals",
    description: "Understand observability, monitoring signals, telemetry collection, and how engineering teams investigate production behavior.",
    sections: [
      section("Monitoring Versus Observability", "Monitoring tells operators whether known conditions are healthy by tracking predefined signals and thresholds. Observability helps engineers investigate unknown problems by examining the outputs of a system. Monitoring is essential for detecting symptoms; observability provides evidence to understand causes."),
      section("The Three Core Signals", "Metrics are numerical measurements collected over time, such as CPU utilization, request rate, and error percentage. Logs are timestamped records describing events. Traces show how a request travels through distributed services and where latency or failures occur."),
      section("Telemetry Collection Pipeline", "Applications and infrastructure produce telemetry. Agents, exporters, or instrumentation libraries expose or forward data. Collection systems store the data, visualization tools present it, and alerting systems notify responders when defined conditions occur."),
      section("Golden Signals", "Latency measures request duration, traffic measures workload demand, errors measure failed operations, and saturation measures how close a resource is to its capacity. These signals provide a useful starting point for service monitoring."),
      section("Infrastructure and Application Visibility", "Infrastructure monitoring covers nodes, disks, networks, containers, and cloud services. Application monitoring covers request latency, throughput, exceptions, dependencies, and business transactions. Both views are needed to diagnose distributed production incidents."),
      section("Observability Architecture", "A practical architecture can use Prometheus for metric collection and storage, Grafana for visualization, Alertmanager for alert routing, and centralized logging and tracing systems for additional evidence. Define ownership and retention for every telemetry source."),
      section("Production Observability Practices", "Instrument critical services, standardize labels, use consistent service names, monitor dependencies, protect telemetry endpoints, and test alerts. Avoid collecting unlimited high-cardinality data because it increases storage and operational costs.")
    ],
    exercise: "Design an observability architecture for an e-commerce application. Identify its important metrics, logs, traces, infrastructure signals, dashboards, and alert destinations."
  },

  "Metrics and Monitoring": {
    title: "Metrics and Monitoring",
    description: "Learn metric collection, measurement intervals, aggregation, thresholds, and useful production monitoring patterns.",
    sections: [
      section("What Is a Metric?", "A metric is a numerical measurement associated with a timestamp and optional labels. Examples include HTTP requests per second, available memory, queue depth, and request duration. Metrics help teams identify trends, compare behavior, and detect abnormal conditions."),
      section("Metric Collection Methods", "Metrics can be exposed directly by instrumented applications or collected through exporters. Infrastructure agents can gather host statistics, while cloud integrations can retrieve managed-service measurements. Select collection methods based on the system being monitored."),
      section("Time Series Data", "A time series represents one metric and its label combination over time. Each sample contains a timestamp and value. Excessive unique label combinations create many time series and can increase memory, CPU, and storage requirements."),
      section("Monitoring Intervals", "The scrape interval determines how frequently Prometheus collects samples. Short intervals provide more detail but increase collection load and storage. Select an interval based on incident detection requirements, metric behavior, and system capacity."),
      section("Threshold-based Monitoring", "A threshold can identify CPU utilization above a limit, low disk space, or excessive error rates. Thresholds should reflect operational impact rather than arbitrary values. A temporary spike may not justify paging an engineer."),
      section("Rate and Percentage Measurements", "Use rates to calculate events per second from cumulative counters. Percentages such as error rate should use a clearly defined numerator and denominator. Always verify that the selected measurements represent the same workload and time period."),
      section("Monitoring Coverage", "Every critical service should have health, traffic, error, and saturation measurements. Monitor dependencies and customer-facing behavior in addition to infrastructure. A green server dashboard does not prove that a business transaction succeeds."),
      section("Capacity and Trend Analysis", "Use historical trends to understand growth, resource saturation, and seasonal workload patterns. Capacity planning should consider peak traffic, redundancy, failover behavior, and expected growth.")
    ],
    exercise: "Define a monitoring plan for a web application with CPU, memory, disk, request rate, latency, error rate, and database connection metrics. Explain collection frequency and alert thresholds."
  },

  "Prometheus Architecture": {
    title: "Prometheus Architecture",
    description: "Understand Prometheus server components, pull-based scraping, time-series storage, querying, and alert delivery.",
    sections: [
      section("Prometheus Server Overview", "Prometheus is an open-source monitoring and alerting toolkit. Its server collects time-series metrics, stores samples, evaluates PromQL queries, and evaluates configured alerting rules."),
      section("Pull-based Collection", "Prometheus normally pulls metrics from HTTP endpoints. The server periodically requests each configured target's metrics endpoint and stores the returned samples. This model makes target configuration and scrape health visible centrally."),
      section("Exporters and Instrumented Applications", "Applications can expose Prometheus metrics directly through instrumentation libraries. Exporters translate metrics from systems such as Linux hosts, databases, and network devices into Prometheus exposition format."),
      section("Time-series Database", "Prometheus stores samples in its local time-series database using labels and timestamps. The TSDB manages chunks, indexes, and retention. Local storage is suitable for many deployments, but long-term or highly available architectures may require additional systems."),
      section("PromQL Query Engine", "PromQL retrieves and transforms stored time-series data. Operators use it for dashboards, recording rules, and alert conditions. Query performance depends on the amount of data selected and the complexity of expressions."),
      section("Rule Evaluation and Alert Flow", "Prometheus periodically evaluates recording and alerting rules. Firing alerts can be sent to Alertmanager, which groups, routes, silences, and notifies receivers."),
      section("Architecture Flow", "A typical flow is application or exporter endpoint, Prometheus scrape, local TSDB, PromQL evaluation, Grafana visualization, and Alertmanager notification. Each component needs network connectivity, suitable permissions, and operational monitoring."),
      section("Prometheus Self-monitoring", "Monitor Prometheus itself using metrics such as scrape failures, ingestion rate, query duration, rule evaluation failures, storage utilization, and process health. Monitoring the monitoring platform is essential for reliable incident detection.")
    ],
    exercise: "Draw a Prometheus architecture for an application running on Kubernetes. Show application metrics, node exporter, Prometheus, Grafana, alert rules, and Alertmanager. Explain the data flow."
  },

  "Prometheus Installation": {
    title: "Prometheus Installation",
    description: "Install and configure Prometheus in a controlled environment and verify its readiness and metric collection.",
    sections: [
      section("Installation Planning", "Choose the installation method based on the environment. Prometheus can run as a binary, container, Kubernetes Deployment, or through a monitoring Helm chart. Plan storage, retention, authentication, network exposure, and resource requirements."),
      section("Configuration File", "The prometheus.yml file defines global settings, rule files, and scrape jobs. Validate configuration before restarting the service because malformed configuration can prevent Prometheus from loading.", "global:\n  scrape_interval: 15s\n  evaluation_interval: 15s\n\nscrape_configs:\n  - job_name: prometheus\n    static_configs:\n      - targets: ['localhost:9090']"),
      section("Container-based Installation", "A container deployment can mount a configuration file and persistent storage. Pin a reviewed image version and avoid exposing the Prometheus interface publicly without authentication and network restrictions.", "docker run -d --name prometheus \\\n  -p 9090:9090 \\\n  -v ${PWD}/prometheus.yml:/etc/prometheus/prometheus.yml:ro \\\n  -v prometheus-data:/prometheus \\\n  prom/prometheus:v3.5.0"),
      section("Kubernetes Deployment", "In Kubernetes, Prometheus can be deployed using a Helm chart or operator-based stack. Configure persistent volume claims, resource requests and limits, service access, and scrape permissions. Use namespace and network policies to restrict access."),
      section("Readiness Verification", "Open the Prometheus web interface and inspect the status and targets pages. Confirm that the server is ready, the configuration loaded successfully, and expected targets are UP.", "curl http://localhost:9090/-/healthy\ncurl http://localhost:9090/-/ready\ncurl http://localhost:9090/api/v1/targets"),
      section("Storage and Retention", "Set retention based on operational needs, disk capacity, and data requirements. Estimate ingestion volume and monitor disk usage. Persistent storage is important when container or Pod replacement must not erase recent monitoring history."),
      section("Secure Deployment", "Restrict network access, use authenticated reverse proxies where appropriate, protect configuration files, and avoid placing secrets in exposed labels. Prometheus endpoints can reveal internal infrastructure information.")
    ],
    exercise: "Install Prometheus locally or in a test Kubernetes namespace. Configure a self-scrape target, verify readiness and target status, query up, and document the storage and access configuration."
  },

  "Exporters": {
    title: "Exporters",
    description: "Collect metrics from hosts, containers, databases, and external systems through Prometheus exporters.",
    sections: [
      section("Exporter Purpose", "An exporter exposes metrics for a system that does not provide Prometheus-compatible metrics natively. It collects source-system information and presents it through an HTTP metrics endpoint."),
      section("Node Exporter", "Node Exporter collects Linux host metrics such as CPU, memory, filesystem, disk, and network statistics. It is commonly used to monitor virtual machines and Kubernetes worker nodes.", "docker run -d --name node-exporter \\\n  --net=host --pid=host \\\n  prom/node-exporter:v1.9.1 \\\n  --path.rootfs=/host"),
      section("Database Exporters", "Database exporters expose measurements such as connection count, query activity, replication status, and cache performance. Use dedicated monitoring accounts with read-only permissions where supported."),
      section("Blackbox Exporter", "Blackbox Exporter checks external endpoints using probes such as HTTP, HTTPS, DNS, TCP, and ICMP. It helps determine whether a service is reachable from the monitoring system's network location."),
      section("Application Instrumentation", "Applications can expose metrics directly using Prometheus client libraries. Instrument request count, request duration, active requests, and application-specific business measurements. Use stable metric names and bounded labels."),
      section("Exporter Deployment and Scraping", "Deploy exporters close to the systems they monitor, restrict access to their endpoints, and configure Prometheus scrape jobs. Validate target availability and inspect exporter logs when collection fails."),
      section("Exporter Security and Capacity", "Do not expose exporter endpoints to untrusted networks. Use firewall rules, network policies, and least-privilege monitoring credentials. Monitor exporter CPU, memory, collection duration, and source-system load."),
      section("Choosing the Correct Exporter", "Select exporters maintained by trusted projects or vendors. Review compatibility, supported metrics, release activity, authentication support, and operational cost before production adoption.")
    ],
    exercise: "Deploy Node Exporter and configure Prometheus to scrape it. Query CPU, memory, and filesystem metrics. Identify at least three metrics useful for a production host alert."
  },

  "Scrape Configuration": {
    title: "Scrape Configuration",
    description: "Configure Prometheus scrape jobs, targets, intervals, relabeling, and metric filtering.",
    sections: [
      section("Scrape Job Structure", "Each scrape job defines how Prometheus collects metrics from a group of targets. Common fields include job_name, scrape_interval, scrape_timeout, metrics_path, scheme, and target configuration."),
      section("Static Targets", "Static configuration is suitable for a small fixed set of endpoints. Each target is listed explicitly. It is simple to operate but becomes difficult to maintain when infrastructure changes frequently.", "scrape_configs:\n  - job_name: node-exporter\n    static_configs:\n      - targets:\n          - '10.0.1.10:9100'\n          - '10.0.1.11:9100'\n        labels:\n          environment: production"),
      section("Scrape Interval and Timeout", "The scrape interval controls collection frequency. The scrape timeout controls how long Prometheus waits for a target response and must not exceed the interval. Slow endpoints can cause collection failures."),
      section("Custom Metrics Path and Scheme", "Some exporters expose metrics on a non-default path or HTTPS endpoint. Configure metrics_path and scheme correctly, and validate TLS settings when secure transport is required."),
      section("Relabeling Targets", "Target relabeling can rewrite labels, filter targets, and extract useful metadata before scraping. Use relabeling to standardize environment, region, cluster, and service labels."),
      section("Metric Relabeling", "Metric relabeling can drop or modify samples before ingestion. It can reduce unwanted data but should be applied carefully because removing important metrics can break dashboards and alert rules."),
      section("Authentication and TLS", "Prometheus supports authentication and TLS configuration for scrape targets. Reference protected credentials through secure files or supported secret mechanisms rather than embedding sensitive values in source-controlled configuration."),
      section("Configuration Validation", "Use Prometheus configuration validation before deployment. After applying a change, inspect target health and scrape error information. A syntactically valid job may still fail because of DNS, network, TLS, or endpoint problems.", "promtool check config prometheus.yml\ncurl http://localhost:9090/api/v1/targets")
    ],
    exercise: "Configure separate Prometheus jobs for Prometheus itself and Node Exporter. Add environment labels, set an interval, validate the configuration, and confirm both targets are UP."
  },

  "Service Discovery": {
    title: "Service Discovery",
    description: "Discover dynamic monitoring targets using Kubernetes, cloud, DNS, and file-based discovery mechanisms.",
    sections: [
      section("Why Dynamic Discovery Is Needed", "Modern infrastructure changes frequently. Pods are recreated, virtual machines scale, and services move between addresses. Static target lists become stale, so service discovery automatically finds eligible monitoring targets."),
      section("Kubernetes Discovery", "Prometheus can discover Kubernetes nodes, Pods, Services, and endpoints using the Kubernetes API. Discovery configuration can select resources based on namespaces, annotations, labels, and ports."),
      section("Kubernetes RBAC", "Kubernetes discovery requires API permissions to list and watch relevant resources. Grant only the necessary verbs and resource types. Missing permissions can cause discovery errors even when the Prometheus Pod is healthy."),
      section("File-based Discovery", "File-based discovery reads target definitions from JSON or YAML files. External automation can update these files when infrastructure changes. It is useful when discovery information comes from a separate inventory system."),
      section("Cloud and DNS Discovery", "Prometheus supports discovery integrations for several infrastructure providers and DNS-based target discovery. Configure credentials securely and restrict discovered targets to the intended accounts and network boundaries."),
      section("Relabeling Discovered Targets", "Discovered targets often contain many metadata labels. Relabeling can select the correct port, filter unwanted resources, and convert metadata into stable labels used by dashboards and alert rules."),
      section("Discovery Troubleshooting", "Check Prometheus target discovery status, Kubernetes API connectivity, service account permissions, label selectors, and discovered port names. A discovered target may still be DOWN if its metrics endpoint is unreachable."),
      section("Discovery Governance", "Define consistent labels and discovery rules across clusters. Avoid scraping every discovered object without filtering because unnecessary targets increase load, storage, and operational complexity.")
    ],
    exercise: "Configure Kubernetes Pod discovery in a test environment or implement file-based discovery with two targets. Apply a label filter and verify that Prometheus discovers only the intended endpoints."
  },

  "PromQL Fundamentals": {
    title: "PromQL Fundamentals",
    description: "Query Prometheus time-series data using selectors, range vectors, functions, aggregation, and operators.",
    sections: [
      section("Instant Vector Selectors", "An instant vector selector returns the latest sample for each matching time series. Selectors can match metric names and label values. Use precise selectors to avoid querying unrelated workloads.", "up\nnode_memory_MemAvailable_bytes\nhttp_requests_total{job=\"payment-api\"}"),
      section("Range Vectors", "A range vector selects samples from a time interval. It is commonly used with rate, increase, and other range functions to analyze changes over time.", "http_requests_total[5m]\nrate(http_requests_total[5m])\nincrease(http_requests_total[1h])"),
      section("Rate and Increase", "rate calculates the per-second average increase of a counter over a range and handles counter resets. increase estimates the total counter increase over that range. Use rate for throughput and increase for event totals."),
      section("Aggregation Operators", "sum, avg, min, max, count, and topk summarize time-series data. Grouping with by or without controls which labels remain in the result. Aggregation should preserve the dimensions needed for troubleshooting.", "sum by (service) (rate(http_requests_total[5m]))\navg by (instance) (node_cpu_seconds_total)\ntopk(5, process_resident_memory_bytes)"),
      section("Filtering and Comparisons", "Comparison operators such as greater than and equal to can filter or compare vector values. Logical operators combine conditions. Be aware that vector matching rules can affect results when labels differ."),
      section("Error Rate Calculation", "An error rate divides failed requests by total requests. The numerator and denominator should use matching labels and a suitable time range. Use a safe denominator to avoid division by zero.", "sum(rate(http_requests_total{status=~\"5..\"}[5m]))\n/\nsum(rate(http_requests_total[5m]))"),
      section("Latency Quantiles", "Histogram metrics can be used with histogram_quantile to estimate request latency quantiles. Bucket labels and the le boundary must be preserved during aggregation.", "histogram_quantile(0.95,\n  sum by (le) (\n    rate(http_request_duration_seconds_bucket[5m])\n  )\n)"),
      section("Query Performance and Validation", "Avoid unbounded selectors and unnecessary high-cardinality queries. Use a suitable time range, inspect labels, and validate query results in the Prometheus expression browser before building dashboards or alerts.")
    ],
    exercise: "Write PromQL queries for total requests per service, five-minute request rate, 5xx error percentage, available memory, and 95th percentile request latency. Explain each expression."
  },

  "Labels and Metric Types": {
    title: "Labels and Metric Types",
    description: "Understand Prometheus metric types and label design, including the operational risks of high cardinality.",
    sections: [
      section("Counter Metrics", "A counter is a cumulative value that normally increases over time and resets when the monitored process restarts. Use counters for requests, errors, completed jobs, and other events. Apply rate or increase to analyze counter changes."),
      section("Gauge Metrics", "A gauge can increase or decrease and represents a current value such as temperature, queue depth, active connections, or memory usage. Do not apply counter-specific rate assumptions to ordinary gauge values."),
      section("Histogram Metrics", "A histogram records observations in configurable buckets and exposes bucket counts, total count, and sum. Histograms are useful for latency and size distributions and support server-side aggregation across instances."),
      section("Summary Metrics", "A summary calculates configured quantiles within the instrumented process and exposes observation count and sum. Quantiles from separate instances generally cannot be aggregated meaningfully in the same way as histogram buckets."),
      section("Label Design", "Labels add dimensions such as service, environment, region, and status code. Use a consistent naming convention and bounded values. Labels should describe useful operational dimensions rather than arbitrary request-specific information."),
      section("Cardinality Risks", "Every unique label combination creates a separate time series. User IDs, session IDs, request IDs, and unbounded URL paths can produce huge cardinality. This increases memory, CPU, storage, and query costs."),
      section("Metric Naming Conventions", "Use meaningful metric names with units and clear semantics. Counter metrics commonly use a total suffix. Duration metrics should use seconds and byte measurements should use bytes. Document metric meaning and label expectations."),
      section("Metric Schema Governance", "Review instrumentation changes before release. Track new metrics, labels, cardinality growth, and deprecated names. Consistent metric schemas reduce dashboard breakage and simplify cross-service queries.")
    ],
    exercise: "Classify ten example measurements as counter, gauge, histogram, or summary. Design bounded labels for an API service and identify three dangerous high-cardinality label examples."
  },

  "Recording Rules": {
    title: "Recording Rules",
    description: "Precompute frequently used PromQL expressions and create reusable time series for dashboards and alerts.",
    sections: [
      section("Purpose of Recording Rules", "Recording rules evaluate PromQL expressions at regular intervals and save their results as new time series. They reduce repeated expensive calculations and provide standardized metrics for dashboards and alerts."),
      section("Rule File Structure", "Recording rules are defined inside rule groups. Each group specifies a name and evaluation interval, with one or more rules. Rule files must be referenced from Prometheus configuration."),
      section("Recording Rule Example", "This example records a five-minute request rate grouped by service. The generated metric can be reused in dashboards and alert expressions.", "groups:\n  - name: payment-api-recording\n    interval: 30s\n    rules:\n      - record: service:http_requests:rate5m\n        expr: sum by (service) (\n          rate(http_requests_total[5m])\n        )"),
      section("Naming Conventions", "Use a consistent naming pattern that communicates the aggregation level and operation. Document the source metrics, labels, units, and evaluation interval so teams understand the recorded result."),
      section("Rule Loading and Validation", "Reference rule files in prometheus.yml and validate them using promtool. After reload, inspect rule evaluation status and query the generated metric.", "promtool check rules rules/*.yml\npromtool check config prometheus.yml\ncurl -X POST http://localhost:9090/-/reload"),
      section("Performance Considerations", "Recording rules reduce repeated query work but still consume evaluation resources and storage. Avoid creating duplicate rules or unnecessarily frequent evaluations. Measure query performance before adding large rule sets."),
      section("Operational Management", "Version-control rule files, review changes, and deploy them through a controlled process. Monitor rule evaluation failures and ensure dashboards do not depend on removed or renamed recording metrics.")
    ],
    exercise: "Create recording rules for request rate by service, error rate by service, and CPU usage by instance. Validate the rule file and query the resulting recorded metrics."
  },

  "Alert Rules": {
    title: "Alert Rules",
    description: "Create Prometheus alerting rules using PromQL expressions, pending periods, labels, and annotations.",
    sections: [
      section("Alerting Rule Purpose", "An alerting rule evaluates a PromQL expression and creates an alert when the expression is true. Alerts can detect service unavailability, high error rates, latency problems, and resource exhaustion."),
      section("Alert Rule Components", "An alert rule contains an alert name, expression, optional for duration, labels, and annotations. Labels identify routing and ownership. Annotations provide descriptions, summaries, and links to runbooks."),
      section("High CPU Alert", "A CPU alert can compare the rate of non-idle CPU time against a threshold. Ensure the query matches the intended hosts and does not page responders for expected temporary spikes.", "groups:\n  - name: infrastructure-alerts\n    rules:\n      - alert: HighCPUUsage\n        expr: 100 * (1 - avg by (instance) (rate(node_cpu_seconds_total{mode=\"idle\"}[5m]))) > 85\n        for: 10m\n        labels:\n          severity: warning\n        annotations:\n          summary: High CPU on {{ $labels.instance }}"),
      section("Application Error Alert", "Alert on an elevated application error percentage over a sustained interval. Use matching label dimensions for the numerator and denominator and define a minimum traffic condition where appropriate."),
      section("Pending and Firing States", "An alert becomes pending when its expression first matches and becomes firing after the configured for duration. The pending period helps reduce notifications caused by short-lived spikes. A resolved alert no longer matches the expression."),
      section("Labels and Annotations", "Labels such as severity, team, service, and environment support routing and filtering. Annotations should explain the symptom, likely impact, and investigation steps. Do not place unique changing values in labels unnecessarily."),
      section("Rule Validation", "Use promtool check rules before deployment. Inspect Prometheus rule status after loading changes. Test alert expressions with realistic metric samples and verify that they resolve when the condition clears."),
      section("Alert Quality", "Alerts should be actionable and tied to user impact or meaningful operational risk. Avoid alerting on every metric threshold. Prefer sustained conditions, clear ownership, severity levels, and runbook references.")
    ],
    exercise: "Create alert rules for target down, high CPU, and elevated HTTP 5xx percentage. Add severity labels, pending durations, summaries, and runbook annotations. Validate the rules with promtool."
  },

  "Alertmanager": {
    title: "Alertmanager",
    description: "Configure alert grouping, routing, inhibition, silencing, and notification delivery with Alertmanager.",
    sections: [
      section("Alertmanager Responsibility", "Prometheus evaluates alert rules and sends alert notifications to Alertmanager. Alertmanager handles grouping, deduplication, routing, silencing, inhibition, and delivery to notification receivers."),
      section("Alert Routing Tree", "Routes determine which receiver gets an alert based on its labels. Teams can route production critical alerts differently from warnings or non-production notifications. Define a default receiver for unmatched alerts."),
      section("Grouping and Deduplication", "Grouping combines related alerts into a single notification. Deduplication prevents repeated delivery of unchanged alerts. Choose group labels and timing based on incident response requirements."),
      section("Receiver Configuration", "Receivers define notification integrations such as email, webhook, or supported chat and paging services. Protect credentials and webhook URLs using secure configuration mechanisms.", "route:\n  receiver: platform-team\n  group_by: ['alertname', 'cluster', 'service']\n  group_wait: 30s\n  group_interval: 5m\n  repeat_interval: 4h\n\nreceivers:\n  - name: platform-team\n    webhook_configs:\n      - url: 'https://alerts.example.com/webhook'"),
      section("Inhibition Rules", "Inhibition suppresses lower-level alerts when a related higher-severity alert is already firing. For example, a complete cluster outage may make individual service-down alerts redundant. Design matching labels carefully."),
      section("Silencing Alerts", "Silences suppress notifications for selected labels during a defined time window. They are useful for planned maintenance and known incidents. Add a clear reason and expiration so silences do not hide future problems."),
      section("High Availability", "For critical environments, run Alertmanager in a supported clustered configuration and test notification delivery during component failure. Monitor its availability, notification errors, and queue behavior."),
      section("Notification Verification", "Trigger a controlled test alert and verify routing, grouping, message content, and delivery. Confirm that responders receive actionable information and that resolved notifications behave as expected.")
    ],
    exercise: "Configure Alertmanager with a default webhook receiver, severity-based routes, grouping, and an inhibition rule. Trigger test alerts and verify the resulting notification behavior."
  },

  "Grafana Architecture": {
    title: "Grafana Architecture",
    description: "Understand Grafana components, data-source querying, dashboards, users, plugins, and production deployment considerations.",
    sections: [
      section("Grafana Overview", "Grafana is an observability and visualization platform used to query, display, and explore data from supported sources. It commonly visualizes Prometheus metrics alongside logs, traces, and other operational information."),
      section("Grafana Server", "The Grafana server provides the web interface, API, authentication, dashboard management, data-source configuration, and alerting capabilities. It connects to configured data sources to execute queries."),
      section("Data-source Query Flow", "A dashboard panel sends a query through Grafana to its configured data source. The data source returns results, and Grafana renders them using a suitable visualization. Query behavior depends on the source and selected time range."),
      section("Dashboard and Panel Model", "Dashboards contain panels, variables, annotations, and layout configuration. Panels define queries and visualization options. Reusable dashboard design helps teams maintain consistent monitoring across applications."),
      section("Storage and Provisioning", "Grafana can store dashboards, users, and settings in its configured database. Provisioning files can define data sources and dashboards through source-controlled configuration. Back up persistent state and test restore procedures."),
      section("Authentication and Authorization", "Use enterprise identity integration or supported authentication methods, role-based permissions, and folder-level access controls. Avoid shared administrator accounts and restrict access to sensitive infrastructure dashboards."),
      section("Plugins and Integrations", "Grafana plugins extend data-source and visualization capabilities. Install only trusted and compatible plugins, track versions, and review maintenance and security implications."),
      section("Production Availability", "Monitor Grafana process health, database availability, query latency, user activity, and resource usage. Use persistent storage and a supported highly available design when dashboard availability is operationally important.")
    ],
    exercise: "Deploy Grafana, connect it to Prometheus, create a test dashboard, and inspect the server configuration, data-source connection, access roles, and persistent storage."
  },

  "Data Sources": {
    title: "Data Sources",
    description: "Connect Grafana to Prometheus and other telemetry systems and configure secure, reliable data access.",
    sections: [
      section("Data-source Concept", "A Grafana data source defines how Grafana connects to an external telemetry backend. It stores connection settings and provides a query interface for dashboards and exploration."),
      section("Prometheus Data Source", "The Prometheus data source connects Grafana to the Prometheus HTTP API. Configure the correct server URL, access mode, and authentication settings. Test connectivity before building dashboards.", "http://prometheus.monitoring.svc.cluster.local:9090"),
      section("Connection Modes", "Depending on deployment architecture, Grafana may access a data source from the server or through a browser-based mode. Prefer a server-side connection for private internal endpoints that should not be exposed to users."),
      section("Authentication and TLS", "Use secure transport and supported authentication methods. Store credentials in Grafana's protected configuration and restrict administrative access. Never expose backend credentials in dashboard variables or browser-visible URLs."),
      section("Provisioning Data Sources", "Provisioning files can define data sources during startup or configuration reload. Source-control non-secret settings and inject credentials securely through the deployment environment.", "apiVersion: 1\ndatasources:\n  - name: Prometheus\n    type: prometheus\n    access: proxy\n    url: http://prometheus:9090\n    isDefault: true\n    editable: false"),
      section("Query Validation", "Use Grafana Explore to test PromQL expressions and inspect returned series. Validate time ranges, labels, query results, and data freshness before connecting a query to production dashboards."),
      section("Multiple Data Sources", "Organizations may connect metrics, logs, traces, and cloud monitoring systems. Standardize service identifiers and timestamps to make cross-signal investigation easier."),
      section("Data-source Operations", "Monitor backend availability, query failures, latency, and credentials. Document ownership and retention expectations for every data source. Remove obsolete connections to reduce confusion and security exposure.")
    ],
    exercise: "Provision a Prometheus data source in Grafana, test the connection, execute a PromQL query in Explore, and document the URL, access mode, authentication, and permissions."
  },

  "Dashboard Creation": {
    title: "Dashboard Creation",
    description: "Build useful Grafana dashboards for infrastructure, application performance, and production operations.",
    sections: [
      section("Dashboard Planning", "Start with the audience and operational questions. An executive view may focus on service availability and SLOs, while an engineer dashboard may show latency, traffic, errors, saturation, and resource-level detail."),
      section("Panel Types", "Time-series panels show trends, stat panels display current values, gauges show values against thresholds, tables show detailed series, and heatmaps visualize distributions. Choose the panel type that makes the measurement easy to interpret."),
      section("Creating a First Panel", "Create a dashboard, add a panel, select the Prometheus data source, and enter a PromQL expression. Set a useful title, unit, legend, and time range. Verify the panel at different time windows.", "sum by (service) (rate(http_requests_total[5m]))"),
      section("Application Overview Dashboard", "A service dashboard should include request rate, error percentage, latency percentiles, active requests, and dependency health. Include deployment annotations to correlate performance changes with releases."),
      section("Infrastructure Dashboard", "A host dashboard should display CPU, memory, filesystem capacity, disk throughput, network traffic, and host availability. Group panels by instance and environment to support operational comparison."),
      section("Thresholds and Visualization", "Configure thresholds that reflect operational meaning. Use clear units, legends, descriptions, and consistent naming. Avoid misleading visual scales and panels that hide missing data."),
      section("Annotations and Links", "Annotations can display deployment events, incident markers, and maintenance windows. Add links to runbooks, service documentation, and related dashboards to shorten investigation time."),
      section("Dashboard Provisioning and Versioning", "Export dashboard JSON or provision dashboards from source-controlled files. Review changes, maintain ownership, and test dashboards after metric or label changes."),
      section("Dashboard Performance", "Avoid excessive panels, broad high-cardinality queries, and unnecessarily short refresh intervals. Use recording rules for repeated expensive expressions and monitor dashboard load times.")
    ],
    exercise: "Build an application dashboard containing request rate, 5xx error percentage, p95 latency, CPU, memory, and availability panels. Add units, legends, thresholds, and a deployment annotation."
  },

  "Dashboard Variables": {
    title: "Dashboard Variables",
    description: "Create reusable dashboard filters for environments, clusters, namespaces, services, and instances.",
    sections: [
      section("Why Variables Are Useful", "Variables allow users to change dashboard context without maintaining separate dashboards for each environment or service. They support reusable views across clusters, namespaces, applications, and infrastructure."),
      section("Query Variables", "A query variable retrieves available values from a data source. Prometheus label_values can populate options from matching time series. Select labels that have stable, bounded values.", "label_values(up, job)\nlabel_values(kube_pod_info, namespace)\nlabel_values(http_requests_total, service)"),
      section("Chained Variables", "A chained variable depends on another variable. For example, selecting a cluster can filter the namespaces available in the next variable. Use dependencies carefully to avoid unnecessary query load."),
      section("Using Variables in PromQL", "Reference dashboard variables inside panel queries. Multi-value variables may require regular-expression matching, while single-value variables can use exact matching depending on configuration.", "sum by (service) (\n  rate(http_requests_total{\n    environment=~\"$environment\",\n    service=~\"$service\"\n  }[5m])\n)"),
      section("Multi-value and All Options", "Multi-value selections allow comparison across several values. An All option can represent all available values, but ensure the query uses a compatible matcher and does not unintentionally select excessive data."),
      section("Variable Refresh and Performance", "Variables can refresh on dashboard load, time-range change, or manually. Large label queries can become expensive. Use narrow selectors and bounded label sets."),
      section("Variable Troubleshooting", "If a variable is empty, verify the data source, metric availability, label name, query syntax, and selected time range. Check whether the variable depends on another variable with no matching values.")
    ],
    exercise: "Create environment, namespace, and service variables. Use them to filter request rate and CPU panels. Test single-value, multi-value, and All selections."
  },

  "SLI and SLO Monitoring": {
    title: "SLI and SLO Monitoring",
    description: "Define service-level indicators, objectives, error budgets, and monitoring queries that reflect user experience.",
    sections: [
      section("SLI Definition", "A Service Level Indicator is a measurable signal of service performance, such as successful request ratio, request latency, or availability. Choose indicators that represent what users actually experience."),
      section("SLO Definition", "A Service Level Objective is a target for an SLI over a defined period. For example, a service may target 99.9 percent successful requests over a rolling 30-day window. Targets should reflect business needs and operational capability."),
      section("SLA and SLO Difference", "An SLO is an internal reliability target. An SLA is an agreement with customers or users that may include contractual consequences. An SLI is the measurement used to evaluate whether the target is being met."),
      section("Availability SLI", "Availability can be measured as successful eligible requests divided by all eligible requests. Exclude or include traffic categories deliberately and document the measurement rules.", "sum(rate(http_requests_total{status!~\"5..\"}[5m]))\n/\nsum(rate(http_requests_total[5m]))"),
      section("Latency SLI", "Latency objectives can use a percentile such as p95 or p99, or a ratio of requests completed within a defined threshold. Choose a measurement method that matches the service's user-facing requirement."),
      section("Error Budget", "The error budget is the permitted unreliability under an SLO. A 99.9 percent availability objective allows 0.1 percent of eligible events to fail during the measurement window. Error budgets help balance reliability work and feature delivery."),
      section("Burn Rate Monitoring", "Burn rate measures how quickly an error budget is being consumed relative to the allowed rate. Multi-window burn-rate alerts can identify fast reliability deterioration while reducing noise from short-lived fluctuations."),
      section("SLO Dashboard and Review", "Display the SLI, objective, remaining error budget, burn rate, and historical trend. Review SLO performance with service owners and use results to prioritize reliability improvements.")
    ],
    exercise: "Define an availability SLO and latency SLO for a payment API. Calculate the allowed error budget for a 30-day window and create PromQL queries for the selected indicators."
  },

  "Incident Alerting": {
    title: "Incident Alerting",
    description: "Design actionable alerting, severity classification, on-call notification, and incident response workflows.",
    sections: [
      section("Alert Versus Incident", "An alert is a signal that a condition requires attention. An incident is an event that causes or threatens meaningful service impact and requires coordinated response. Not every alert should become a major incident."),
      section("Severity Classification", "Define severity based on customer impact, service criticality, scope, and urgency. Critical alerts should page the responsible on-call team. Lower-priority conditions can create tickets or appear in operational reports."),
      section("Actionable Alert Design", "Every paging alert should have a clear symptom, affected service, severity, owner, and runbook. Alerts should identify a condition that responders can investigate or act upon."),
      section("Notification Routing", "Route alerts using service, team, environment, and severity labels. Ensure critical production notifications reach an actively monitored channel and that fallback escalation exists."),
      section("Alert Fatigue Reduction", "Reduce duplicate alerts through grouping, inhibition, sensible pending durations, and clear thresholds. Review noisy alerts after incidents and remove rules that do not lead to useful action."),
      section("Incident Response Sequence", "A responder acknowledges the alert, confirms impact, gathers evidence, identifies the likely failure domain, applies a safe mitigation, and verifies recovery. Preserve timelines and important decisions."),
      section("Runbooks and Escalation", "Runbooks should contain diagnostic commands, dashboards, dependency checks, rollback guidance, and escalation contacts. Review them after infrastructure or application changes."),
      section("Post-incident Improvement", "After recovery, identify the root cause, detection gaps, response delays, and prevention opportunities. Update alerts, dashboards, tests, and runbooks based on evidence rather than blame.")
    ],
    exercise: "Design an incident alert for a production payment API with critical and warning severities. Define routing, notification content, a runbook, acknowledgement, escalation, and post-incident actions."
  },

  "Troubleshooting": {
    title: "Troubleshooting",
    description: "Diagnose common Prometheus and Grafana failures using target status, logs, configuration validation, and query inspection.",
    sections: [
      section("Start with the Failure Boundary", "Determine whether the problem is target discovery, network connectivity, scraping, ingestion, query execution, dashboard rendering, or alert delivery. Identify the earliest failing component before changing configuration."),
      section("Prometheus Target DOWN", "A DOWN target can result from DNS failure, connection refusal, incorrect port, invalid metrics path, TLS problems, firewall rules, or exporter failure. Inspect the target error and test connectivity from the Prometheus network context.", "curl -v http://node-exporter:9100/metrics\ncurl http://localhost:9090/api/v1/targets"),
      section("No Data in Prometheus", "Check whether the metric exists, whether the target is UP, whether labels match the query, and whether the selected time range contains samples. Verify that the metric has not been renamed or removed."),
      section("PromQL Query Errors", "Syntax errors, incorrect range selectors, invalid aggregation, and label mismatches can produce query failures or unexpected results. Test smaller expressions in the Prometheus expression browser and inspect the raw series."),
      section("High Prometheus Memory Usage", "Excessive time-series cardinality, frequent scrapes, large retention, and expensive queries can increase memory use. Identify high-cardinality metrics and labels, reduce unnecessary series, and review query patterns."),
      section("Grafana Data-source Failure", "Check the data-source URL, network path, authentication, TLS certificates, and Prometheus API availability. Test the data source from Grafana's server environment rather than only from a developer workstation."),
      section("Dashboard Shows Empty Panels", "Verify the selected time range, dashboard variables, query filters, data-source selection, and metric labels. A query may work in Prometheus but fail in Grafana because variable interpolation changes the expression."),
      section("Alert Not Firing or Not Delivered", "Check rule evaluation status, expression results, pending duration, alert labels, Alertmanager connectivity, routing configuration, silences, and receiver logs. Distinguish an alert that never fired from one that fired but was not delivered."),
      section("Recovery and Verification", "Fix the smallest failing layer, validate configuration, reload or restart only when necessary, and verify the target, query, dashboard, and notification end to end. Document the root cause and preventive action.")
    ],
    exercise: "Simulate three failures: stop an exporter, break a Grafana data-source URL, and create an invalid alert expression. Diagnose each failure and document evidence, recovery, and validation."
  },

  "Production Hands-on Lab": {
    title: "Production Hands-on Lab",
    description: "Build an end-to-end Prometheus and Grafana monitoring platform with exporters, alerts, SLO dashboards, and operational runbooks.",
    sections: [
      section("Lab Architecture and Scope", "Create a test environment with an application, infrastructure exporter, Prometheus server, Grafana, and Alertmanager. Define which services and resources are monitored and document the network and security boundaries."),
      section("Deploy Prometheus", "Install Prometheus using a supported deployment method. Configure persistent storage, retention, resource limits, scrape interval, and readiness checks. Verify that the Prometheus server is healthy."),
      section("Deploy Exporters", "Deploy Node Exporter or another appropriate exporter. Confirm that the metrics endpoint is reachable from Prometheus and that only authorized systems can access it."),
      section("Configure Scraping and Discovery", "Create scrape jobs for Prometheus, exporters, and the application. Add stable labels for environment, cluster, service, and instance. Use static targets or Kubernetes service discovery as appropriate."),
      section("Build PromQL Queries", "Create queries for request rate, error percentage, latency percentiles, CPU utilization, memory availability, disk capacity, and target health. Validate the results before using them in dashboards."),
      section("Create Recording and Alert Rules", "Add recording rules for frequently used service metrics. Create alerts for unavailable targets, elevated error rates, high CPU, and low disk capacity. Validate rule files with promtool."),
      section("Configure Alertmanager", "Define default and severity-based routes, grouping, inhibition, and notification receivers. Trigger test alerts and verify delivery, resolution, and silence behavior."),
      section("Connect Grafana", "Configure Prometheus as a data source. Create an application dashboard and infrastructure dashboard with meaningful units, labels, thresholds, and deployment annotations."),
      section("Add Dashboard Variables", "Create variables for environment, cluster, namespace, and service. Verify that dashboard panels update correctly when users select different values."),
      section("Define SLI and SLO", "Choose a user-facing availability and latency SLI. Set a realistic SLO, calculate its error budget, and build a dashboard showing current performance and budget consumption."),
      section("Simulate Production Incidents", "Stop an exporter, introduce a failing application endpoint, and create a resource pressure condition in the test environment. Confirm that alerts fire and responders can locate the problem using dashboards."),
      section("Incident Recovery and Verification", "Follow the runbook to identify the failing component, restore service, verify metric collection, and confirm that alerts resolve. Record the timeline and evidence."),
      section("Security and Operational Review", "Review network exposure, credentials, exporter access, Grafana roles, retention, backup, alert ownership, and monitoring-system resource usage. Remove temporary test access."),
      section("Production Readiness Evidence", "Submit architecture documentation, Prometheus configuration, exporter deployment, rule files, Alertmanager configuration, Grafana dashboards, SLO definitions, incident results, and recovery runbooks.")
    ],
    exercise: "Complete the monitoring platform lab end to end. Deploy Prometheus, an exporter, Grafana, and Alertmanager; configure scrape jobs and service discovery; build PromQL queries and dashboards; create alerts and SLOs; simulate incidents; and submit a production-readiness report."
  }
};
