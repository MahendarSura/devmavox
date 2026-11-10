/**
 * DEVMAVOX - STAGE 12
 * Production Monitoring - Prometheus and Grafana
 * 20 complete topic lessons.
 */

const createLesson = (
  topic: string,
  detail: string,
  command: string,
  configuration: string,
  failure: string,
  recovery: string,
  practice: string,
  exercise: string
) => ({
  overview: detail,
  purpose: `Understand ${topic} and apply it to monitor a production Spring Boot payment-service running in Kubernetes. Monitoring must help engineers identify service degradation before it becomes a major customer-facing incident.`,
  architecture: `The payment application exposes application and JVM telemetry. Prometheus collects measurements from configured targets and stores timestamped samples with labels. Grafana queries Prometheus and presents the results as dashboards. Alerting rules evaluate important conditions and route notifications to the responsible team.`,
  workflow: [
    `Identify the monitoring requirement for ${topic} and decide which application, infrastructure, or business signals must be observed.`,
    `Configure the application or monitoring component to expose the required telemetry. Verify that the endpoint or target is reachable.`,
    `Collect the data in Prometheus, validate labels and sample values, and query the result before building dashboards or alerts.`,
    `Use Grafana or alerting rules to identify abnormal behavior, investigate the related service, and record the incident findings.`
  ],
  example: `For the Spring Boot payment-service, monitor request volume, error rate, response latency, JVM memory, CPU usage, and successful or failed payment transactions. Correlate application metrics with pod health and infrastructure metrics instead of relying on a single dashboard number.`,
  commands: [command],
  configuration,
  failures: [failure],
  recovery: [recovery],
  bestPractices: [practice],
  exercise
});

export const stageTwelveLessonOverrides = {
  "12|Observability Fundamentals": createLesson(
    "Observability Fundamentals",
    "Observability is the ability to understand the internal condition of a system by examining the telemetry it produces. The three common signals are metrics, logs, and traces. Metrics show numerical behavior over time, logs provide event details, and traces show how a request travels across services.",
    "kubectl get pods -n payments -o wide",
    "Instrument the Spring Boot service with Actuator and Micrometer. Expose only the required metrics endpoint to the monitoring network. Keep application logs structured and propagate a request or trace ID so an incident can be correlated across telemetry sources.",
    "A dashboard shows that requests are failing, but engineers cannot identify the affected service or correlate the failure with logs and traces.",
    "Check whether metrics, logs, and traces are being collected. Verify timestamps, service names, environment labels, request IDs, and connectivity between the application and telemetry systems.",
    "Use consistent service, environment, namespace, and version attributes. Avoid putting user IDs, payment IDs, or other high-cardinality values into metric labels.",
    "Create an observability checklist for the payment-service. Identify three metrics, useful log fields, and one request-flow trace that would help investigate a failed payment."
  ),

  "12|Metrics and Monitoring": createLesson(
    "Metrics and Monitoring",
    "A metric is a numerical measurement recorded over time. Monitoring collects and evaluates metrics to understand system health. Common service indicators include request rate, error rate, response duration, CPU usage, memory consumption, and business transaction counts.",
    "curl -s http://localhost:8080/actuator/prometheus | Select-String 'http_server_requests|jvm_memory|process_cpu'",
    "Enable Spring Boot Actuator and Micrometer Prometheus registry. Expose the Prometheus endpoint and configure a scrape job. Select measurements that represent service behavior, infrastructure capacity, and business outcomes.",
    "The monitoring dashboard is empty, metrics are missing, or the team monitors CPU while overlooking increasing payment failures.",
    "Verify the Actuator endpoint, registry dependency, application port, Prometheus target status, and metric names. Compare application metrics with Kubernetes pod and node metrics.",
    "Monitor the four golden signals: latency, traffic, errors, and saturation. Define useful thresholds from service objectives and normal production behavior.",
    "Run the payment-service and identify its request count, request duration, JVM memory, and CPU metrics. Explain what each measurement tells an on-call engineer."
  ),

  "12|Prometheus Architecture": createLesson(
    "Prometheus Architecture",
    "Prometheus is a monitoring and time-series database system. Its main components include the Prometheus server, scrape and service-discovery configuration, time-series storage, PromQL query engine, rule evaluation, and integrations for alert delivery.",
    "prometheus --version",
    "Prometheus configuration defines scrape jobs, targets, intervals, labels, and rule files. The server periodically scrapes HTTP metrics endpoints and stores samples with timestamps and label sets. Alertmanager is commonly used to group and route firing alerts.",
    "Prometheus starts but targets are unavailable, samples are not stored, or rule evaluation does not produce expected alerts.",
    "Inspect Prometheus startup logs, configuration syntax, target health, storage permissions, rule loading, and Alertmanager connectivity. Use the web status pages to identify the failing component.",
    "Provide persistent storage for production metrics, secure the Prometheus interface, monitor Prometheus itself, and plan retention according to storage capacity and operational needs.",
    "Draw the flow from a Spring Boot metrics endpoint to Prometheus storage, PromQL, alert rules, Alertmanager, and Grafana. Explain the responsibility of each component."
  ),

  "12|Prometheus Installation": createLesson(
    "Prometheus Installation",
    "Prometheus can run as a standalone service, container, or Kubernetes workload. In Kubernetes environments, Helm charts or maintained manifests simplify deployment, configuration, service exposure, and persistent storage.",
    "helm repo add prometheus-community https://prometheus-community.github.io/helm-charts; helm repo update; helm show values prometheus-community/prometheus",
    "Create a dedicated monitoring namespace. Configure the Prometheus chart values for resource requests, retention, persistent volume claims, service access, scrape jobs, and security settings. Review chart values before installing into production.",
    "The Prometheus pod remains Pending, enters CrashLoopBackOff, or starts without the expected scrape configuration.",
    "Run kubectl describe pod and kubectl logs in the monitoring namespace. Check storage provisioning, resource limits, configuration mounts, image availability, and Helm release status.",
    "Pin chart versions, use reviewed values files, configure persistent storage, and restrict access to monitoring endpoints. Avoid exposing Prometheus publicly without authentication and network controls.",
    "Install Prometheus in a test Kubernetes namespace. Verify its pod, service, web interface, storage, and at least one healthy scrape target."
  ),

  "12|Exporters": createLesson(
    "Exporters",
    "An exporter exposes metrics from a system that does not directly provide Prometheus-format telemetry. Node Exporter exposes Linux host metrics, while other exporters can expose database, application, or infrastructure measurements.",
    "kubectl get pods -n monitoring -o wide",
    "Deploy exporters close to the systems they monitor and configure Prometheus to scrape their metrics endpoints. Node Exporter commonly exposes host CPU, memory, filesystem, and network measurements. Use suitable exporters for databases and other services.",
    "An exporter pod is running but Prometheus reports its target as DOWN or dashboards show missing host measurements.",
    "Check exporter logs, service selectors, endpoint objects, network policies, ports, and the metrics endpoint. Confirm that the exporter is reporting the intended host or service.",
    "Use trusted exporter images, restrict unnecessary metric exposure, and avoid deploying multiple exporters that collect the same measurements without a clear reason.",
    "Deploy or inspect Node Exporter in a test environment. Find a CPU or memory metric and explain which host it represents."
  ),

  "12|Scrape Configuration": createLesson(
    "Scrape Configuration",
    "A scrape configuration tells Prometheus where and how frequently to collect metrics. Each scrape job defines targets, scrape intervals, optional timeouts, labels, and discovery behavior.",
    "curl -s http://localhost:9090/api/v1/targets",
    "Example configuration: scrape_configs: - job_name: payment-service; scrape_interval: 15s; metrics_path: /actuator/prometheus; static_configs: - targets: ['payment-service:8080']. In production, use the correct Kubernetes service DNS name and namespace.",
    "A target is DOWN because the endpoint path, port, DNS name, service selector, or network route is incorrect.",
    "Open Prometheus Status and Targets. Inspect the last scrape error, test the endpoint from the Prometheus network, and correct the target address, path, or service configuration.",
    "Set scrape intervals according to metric importance and system load. Keep scrape timeouts below the interval and avoid collecting unnecessary high-volume metrics.",
    "Add a payment-service scrape job in a test Prometheus configuration. Reload the configuration and verify that the target becomes UP."
  ),

  "12|Service Discovery": createLesson(
    "Service Discovery",
    "Service discovery allows Prometheus to find monitoring targets automatically. Kubernetes service discovery can identify pods, services, and endpoints using cluster API information and label-based selection.",
    "kubectl get services,endpoints,pods -n payments --show-labels",
    "Configure Kubernetes service discovery with the required RBAC permissions. Use relabeling rules to select the intended namespaces, pods, annotations, or service labels. Ensure the discovered metrics port and path match the application.",
    "Prometheus does not discover new pods, discovers unwanted workloads, or reports targets with incorrect addresses.",
    "Check Kubernetes API connectivity, service-account permissions, namespace filters, pod labels, annotations, and relabeling rules. Compare discovered targets with actual Kubernetes services and endpoints.",
    "Use narrow discovery selectors and least-privilege RBAC. Apply consistent labels to workloads so monitoring configuration remains predictable during deployments and scaling.",
    "Scale the payment-service from two to three replicas. Verify whether Prometheus discovers the new pod without manually editing static target addresses."
  ),

  "12|PromQL Fundamentals": createLesson(
    "PromQL Fundamentals",
    "PromQL is Prometheus Query Language. It selects time-series data, filters by labels, performs calculations, and evaluates measurements over time. Engineers use it to calculate traffic, errors, latency, resource use, and service health.",
    "rate(http_server_requests_seconds_count[5m])",
    "Examples: sum(rate(http_server_requests_seconds_count[5m])); sum(rate(http_server_requests_seconds_count{status=~'5..'}[5m])); histogram_quantile(0.95, sum by (le) (rate(http_server_requests_seconds_bucket[5m]))). Confirm the actual metric and label names exposed by the application.",
    "A query returns no data, an incorrect rate, or a misleading latency result because the metric name, labels, or aggregation is wrong.",
    "Search the Prometheus metric browser for the exact metric. Inspect its labels and type, test a simple selector first, then add filters, range functions, and aggregation one step at a time.",
    "Use rate for counter growth over a range, preserve meaningful labels during aggregation, and use histogram buckets for quantile calculations. Do not assume every application exports identical metric names.",
    "Write PromQL queries for total request rate, five-hundred response rate, and p95 request latency. Explain the purpose of each query."
  ),

  "12|Labels and Metric Types": createLesson(
    "Labels and Metric Types",
    "Prometheus identifies a time series by its metric name and complete label set. The main metric types are counter, gauge, histogram, and summary. Counters increase, gauges can move up or down, and histograms record observations in configurable buckets.",
    "curl -s http://localhost:8080/actuator/prometheus | Select-String 'payment_transactions|jvm_memory|http_server_requests'",
    "A counter such as payment_transactions_total records cumulative events. A gauge such as jvm_memory_used_bytes represents a current value. Histogram metrics expose bucket, sum, and count series. Labels such as method, status, and outcome help filter measurements.",
    "Metric cardinality grows rapidly because unique customer IDs, transaction IDs, or request IDs are used as labels. Prometheus memory and storage usage increase as a result.",
    "Remove unbounded labels from instrumentation, review metric label combinations, and use logs or traces for per-request identifiers. Check metric type before applying PromQL functions.",
    "Use bounded labels such as method, status, and payment outcome. Never use customer email, payment reference, session ID, or other unique values as Prometheus labels.",
    "Classify request count, current JVM memory, request duration histogram, and active worker count by metric type. Identify which labels are safe for a payment application."
  ),

  "12|Recording Rules": createLesson(
    "Recording Rules",
    "Recording rules let Prometheus evaluate frequently used or expensive PromQL expressions at regular intervals and store the result as a new time series. Dashboards and alerts can then query the precomputed metric.",
    "promtool check rules prometheus-rules.yml",
    "Example rule: groups: - name: payment-recording-rules; rules: - record: payment:http_requests:rate5m; expr: sum(rate(http_server_requests_seconds_count[5m])). Store rules in a version-controlled file and load it through Prometheus configuration.",
    "A recording rule is not loaded, produces no samples, or stores a result with unexpected labels.",
    "Run promtool check rules, inspect Prometheus rule status, check the expression in the query interface, and verify that the rule file is mounted and referenced by the server configuration.",
    "Use clear metric names, document the expression, review label retention, and create recording rules for repeated expensive queries rather than every dashboard expression.",
    "Create a recording rule for payment-service request rate. Validate the file and confirm that the generated time series appears in Prometheus."
  ),

  "12|Alert Rules": createLesson(
    "Alert Rules",
    "Prometheus alert rules evaluate PromQL expressions and create alerts when defined conditions are true. A for duration can require a condition to remain true before an alert fires, reducing noise from short-lived spikes.",
    "promtool check rules payment-alerts.yml",
    "Example: alert: PaymentServiceHighErrorRate; expr: sum(rate(http_server_requests_seconds_count{status=~'5..'}[5m])) / clamp_min(sum(rate(http_server_requests_seconds_count[5m])), 1) > 0.05; for: 5m; labels: severity: critical. Add an actionable summary and description.",
    "An alert never fires, fires continuously, or triggers during normal traffic because the query or threshold is unsuitable.",
    "Test the PromQL expression directly, inspect the rule evaluation state, validate labels, and compare the threshold with real service behavior. Check the for duration and evaluation interval.",
    "Alert on user impact and service objectives. Include severity, service, environment, and actionable runbook information. Avoid creating one alert for every individual pod metric.",
    "Create a high payment error-rate alert. Test its expression with sample data and explain the difference between pending and firing states."
  ),

  "12|Alertmanager": createLesson(
    "Alertmanager",
    "Alertmanager receives alerts from Prometheus and handles grouping, deduplication, routing, silencing, and inhibition. It sends notifications to configured receivers such as email, chat systems, or incident-management platforms.",
    "amtool check-config alertmanager.yml",
    "Configure Prometheus to send alerts to Alertmanager. Define route matching rules for severity and team, group related alerts, and configure receivers with credentials stored securely. Configure inhibition so a broad outage can suppress redundant child alerts.",
    "Alerts are firing in Prometheus but no notification reaches the on-call team, or duplicate notifications overwhelm responders.",
    "Check the Prometheus alerting configuration, Alertmanager service reachability, receiver configuration, routing labels, notification logs, and silence or inhibition rules.",
    "Group related alerts, define sensible repeat intervals, protect receiver credentials, and test notification delivery before production rollout. Maintain a documented escalation path.",
    "Create a test route for critical payment-service alerts. Trigger a test alert and verify that Alertmanager routes it to the intended receiver."
  ),

  "12|Grafana Architecture": createLesson(
    "Grafana Architecture",
    "Grafana is an observability platform used to query data sources and present metrics through dashboards and panels. It supports users, teams, folders, permissions, alerting, plugins, and data-source configuration.",
    "kubectl get pods,services -n monitoring",
    "Grafana connects to Prometheus through a configured data source. Dashboard panels execute queries and visualize the results. In production, use persistent storage for dashboards and settings or manage dashboards as code.",
    "Grafana is unavailable, dashboards disappear after restart, or users cannot query the Prometheus data source.",
    "Inspect Grafana pod logs, service endpoints, readiness probes, persistent volume status, data-source health, and network connectivity to Prometheus.",
    "Use persistent storage or provisioned dashboards, restrict administrator access, use role-based permissions, and keep credentials in Kubernetes Secrets or an approved secret manager.",
    "Deploy or inspect Grafana in the monitoring namespace. Identify its service, configured data source, dashboard storage method, and user access controls."
  ),

  "12|Data Sources": createLesson(
    "Data Sources",
    "A Grafana data source connects dashboards to an external system that stores or provides telemetry. Prometheus is a common metrics data source. Grafana sends queries to the configured endpoint and displays the returned time-series data.",
    "kubectl get svc -n monitoring",
    "Configure a Prometheus data source using the internal service URL, for example http://prometheus-server.monitoring.svc.cluster.local. Select the correct access mode and configure authentication or TLS when required.",
    "The data source test fails because Grafana cannot resolve the service name, reach the port, authenticate, or communicate through TLS.",
    "Use Grafana's data-source test, inspect the configured URL, test DNS and network connectivity from the Grafana pod, and review Prometheus service endpoints and access controls.",
    "Prefer internal service DNS over hard-coded pod IP addresses. Use secure connections and least-privilege access, and avoid storing credentials in dashboard JSON.",
    "Configure a Prometheus data source in a test Grafana instance. Run a simple up query and verify that the result is returned."
  ),

  "12|Dashboard Creation": createLesson(
    "Dashboard Creation",
    "A Grafana dashboard groups panels that show related service and infrastructure measurements. A useful production dashboard answers operational questions quickly, including whether the service is available, whether requests are failing, and whether latency or resource pressure is increasing.",
    "kubectl get deployments,pods,services -n payments",
    "Create panels for request rate, error percentage, p95 latency, JVM memory, CPU, pod restarts, and payment transaction outcomes. Use clear panel names, units, descriptions, and time ranges. Save dashboard definitions in version control.",
    "Dashboard panels show no data, display incorrect units, or provide conflicting values that make incident diagnosis difficult.",
    "Inspect each panel's query and data source. Verify the selected time range, label filters, aggregation, units, and metric availability in Prometheus.",
    "Organize dashboards around service ownership and operational decisions. Include deployment version and environment context, and avoid excessive panels that obscure the main signals.",
    "Build a payment-service dashboard with request rate, error rate, p95 latency, JVM memory, and pod restart panels. Explain what action each panel helps an engineer take."
  ),

  "12|Dashboard Variables": createLesson(
    "Dashboard Variables",
    "Dashboard variables make Grafana dashboards reusable by allowing users to select values such as cluster, namespace, service, or environment. A selected variable is substituted into panel queries so one dashboard can inspect multiple workloads.",
    "kubectl get namespaces",
    "Create variables from Prometheus label values, such as label_values(up, namespace), where the selected metric and labels exist. Use a namespace variable in panel queries with a safe matcher such as namespace=~'$namespace'.",
    "A dashboard variable dropdown is empty, displays stale values, or causes panels to return no data after a selection.",
    "Check the variable query, data source, refresh behavior, label availability, and variable formatting. Test the resulting PromQL expression directly in Grafana Explore.",
    "Use bounded, meaningful variable choices and sensible defaults. Avoid variables that expand into thousands of combinations or allow users to select unrelated environments accidentally.",
    "Create environment and namespace variables. Switch between test and production namespaces and verify that panel queries change to the selected workloads."
  ),

  "12|SLI and SLO Monitoring": createLesson(
    "SLI and SLO Monitoring",
    "A Service Level Indicator is a measured value representing service behavior, such as successful request ratio or latency. A Service Level Objective is the target for that indicator over a defined period. Error budgets help teams understand how much unreliability remains within the objective.",
    "sum(rate(http_server_requests_seconds_count{status!~'5..'}[5m])) / clamp_min(sum(rate(http_server_requests_seconds_count[5m])), 1)",
    "Define an availability SLI using successful requests divided by eligible total requests. Define the SLO target and measurement window with product and operations teams. Exclude health checks or non-user traffic only when the SLO policy explicitly requires it.",
    "The SLO dashboard reports misleading availability because health checks, excluded routes, missing metrics, or low traffic distort the calculation.",
    "Validate numerator and denominator definitions, inspect status labels, check missing samples, and compare calculated values with application request logs and known test traffic.",
    "Choose indicators that reflect customer experience. Document the measurement window, eligible traffic, target, and error-budget policy. Do not treat infrastructure uptime as a complete substitute for service availability.",
    "Define a sample payment API availability SLI and a 99.9 percent SLO. Calculate the successful request ratio and explain what an exhausted error budget means."
  ),

  "12|Incident Alerting": createLesson(
    "Incident Alerting",
    "Incident alerting turns monitoring signals into notifications that require investigation or action. A good alert identifies user impact, severity, affected service, and the next operational step. Alerts should be actionable rather than simply reporting every metric change.",
    "kubectl get pods -n payments; kubectl get events -n payments --sort-by=.lastTimestamp",
    "Combine service-level alert rules with Alertmanager routing. Include labels for service, environment, and severity. Add a concise summary, diagnostic description, and runbook reference. Route critical production incidents to the on-call team.",
    "Responders receive too many low-value notifications, critical failures are missed, or an alert has no clear owner or action.",
    "Review alert history, firing conditions, notification routes, ownership labels, and silence rules. Compare alerts with incident timelines to identify missing or noisy conditions.",
    "Use severity levels consistently, group related symptoms, define ownership, and test escalation paths. Keep alert messages short but actionable and link to the relevant dashboard and runbook.",
    "Simulate a payment-service error-rate incident. Trace the alert from Prometheus through Alertmanager to the responder and list the first three investigation steps."
  ),

  "12|Troubleshooting": createLesson(
    "Troubleshooting",
    "Monitoring troubleshooting follows the telemetry path from the application to Prometheus and then Grafana or Alertmanager. Engineers should identify whether the problem is metric exposure, scraping, storage, querying, visualization, or notification delivery.",
    "kubectl get pods,svc,endpoints -n monitoring; kubectl logs deployment/prometheus-server -n monitoring --tail=100",
    "Check the Spring Boot Actuator endpoint, Prometheus target status, Prometheus rules, Grafana data source, dashboard query, and Alertmanager receiver. Use component logs and status pages to isolate the failing layer.",
    "A dashboard is empty, a Prometheus target is DOWN, an alert is missing, or Grafana cannot connect to Prometheus.",
    "Start at the source metric endpoint. Confirm it returns metrics, verify Prometheus can reach it, inspect target scrape errors, test PromQL, validate Grafana data-source connectivity, and finally test notification routing.",
    "Change one component at a time and preserve incident evidence. Do not restart every monitoring component before identifying the failing layer. Record the root cause and corrective action.",
    "Troubleshoot a deliberately broken payment-service scrape target. Identify the exact failing layer, repair it, and verify recovery in Prometheus and Grafana."
  ),

  "12|Production Hands-on Lab": createLesson(
    "Production Hands-on Lab",
    "This lab combines application instrumentation, Prometheus collection, PromQL, Grafana dashboards, and alert delivery. The goal is to build an operational monitoring flow for a containerized Spring Boot payment-service deployed on Kubernetes.",
    "kubectl create namespace monitoring; kubectl create namespace payments; kubectl get pods -n monitoring; kubectl get pods -n payments",
    "Expose Spring Boot Actuator Prometheus metrics. Deploy Prometheus and Grafana with persistent storage and reviewed configuration. Configure Kubernetes service discovery or a service scrape target, add recording and alert rules, and provision a payment-service dashboard.",
    "The lab may fail because the metrics endpoint is disabled, the service selector is incorrect, Prometheus lacks RBAC, storage is unavailable, Grafana cannot reach Prometheus, or alert routing is incomplete.",
    "Validate each layer independently: application endpoint, Kubernetes service and endpoints, Prometheus target, PromQL query, Grafana data source, dashboard panels, alert rule, and Alertmanager receiver. Keep configuration backups before changing the environment.",
    "Use version-controlled Helm values and monitoring rules. Apply least-privilege access, persistent storage, bounded metric labels, tested alerts, clear ownership, and documented runbooks before production use.",
    "Complete the end-to-end lab: generate payment requests, observe request rate and latency, simulate application errors, verify the alert, investigate the dashboard, restore the service, and document the incident timeline."
  )
};