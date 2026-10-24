export interface PrometheusQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
}

export const prometheusQuestions: PrometheusQuestion[] = [
  {
    id: 1,
    question: "What is Prometheus in DevOps?",
    options: [
      "A container runtime",
      "An open-source monitoring and alerting system",
      "A source code repository",
      "A configuration management tool"
    ],
    answer: 1
  },
  {
    id: 2,
    question: "What is the primary purpose of Prometheus?",
    options: [
      "To compile Java applications",
      "To build Docker images",
      "To collect and query time-series metrics",
      "To manage Git branches"
    ],
    answer: 2
  },
  {
    id: 3,
    question: "Which query language does Prometheus use?",
    options: ["SQL", "PromQL", "HCL", "Groovy"],
    answer: 1
  },
  {
    id: 4,
    question: "How does Prometheus usually collect metrics?",
    options: [
      "By scraping HTTP metrics endpoints",
      "By reading Git commits",
      "By scanning Dockerfiles",
      "By connecting directly to source code"
    ],
    answer: 0
  },
  {
    id: 5,
    question: "What is a Prometheus target?",
    options: [
      "A Grafana dashboard",
      "A location from which Prometheus collects metrics",
      "A Kubernetes namespace only",
      "A notification email"
    ],
    answer: 1
  },
  {
    id: 6,
    question: "What is a time series in Prometheus?",
    options: [
      "A sequence of Git commits",
      "A collection of Docker images",
      "Metric samples identified by a metric name and labels",
      "A list of alert emails"
    ],
    answer: 2
  },
  {
    id: 7,
    question: "What is the default Prometheus web UI port?",
    options: ["9090", "3000", "9100", "8086"],
    answer: 0
  },
  {
    id: 8,
    question: "Which configuration file is commonly used by Prometheus?",
    options: [
      "Dockerfile",
      "pom.xml",
      "package.json",
      "prometheus.yml"
    ],
    answer: 3
  },
  {
    id: 9,
    question: "What does the scrape_interval setting control?",
    options: [
      "How often Prometheus scrapes targets",
      "How often Docker images are built",
      "How long a Git branch exists",
      "How often Kubernetes nodes reboot"
    ],
    answer: 0
  },
  {
    id: 10,
    question: "What does the scrape_timeout setting define?",
    options: [
      "The retention period for all metrics",
      "The maximum time allowed for a scrape request",
      "The Grafana login timeout",
      "The alert notification delay only"
    ],
    answer: 1
  },
  {
    id: 11,
    question: "What is a Prometheus exporter?",
    options: [
      "A tool that deletes old dashboards",
      "A tool that creates Kubernetes namespaces",
      "A service that exposes metrics in a format Prometheus can scrape",
      "A tool that compiles PromQL into Java"
    ],
    answer: 2
  },
  {
    id: 12,
    question: "What is Node Exporter commonly used for?",
    options: [
      "Monitoring Linux host and system metrics",
      "Managing Maven dependencies",
      "Creating Git repositories",
      "Deploying application releases"
    ],
    answer: 0
  },
  {
    id: 13,
    question: "Which port does Node Exporter use by default?",
    options: ["9090", "3000", "8080", "9100"],
    answer: 3
  },
  {
    id: 14,
    question: "Which endpoint does a typical Prometheus exporter expose?",
    options: ["/health", "/metrics", "/dashboard", "/deploy"],
    answer: 1
  },
  {
    id: 15,
    question: "What does the Prometheus job_name identify?",
    options: [
      "The Grafana user",
      "The alert email subject",
      "A group of scrape targets with a common job identity",
      "The operating system username"
    ],
    answer: 2
  },
  {
    id: 16,
    question: "What does the up metric represent?",
    options: [
      "Whether a scrape target was successfully scraped",
      "The number of Git commits",
      "The total number of dashboards",
      "The age of a Docker image"
    ],
    answer: 0
  },
  {
    id: 17,
    question: "What does up == 0 generally indicate?",
    options: [
      "Prometheus has no configuration",
      "The target scrape failed",
      "The target has no labels",
      "All alerts are resolved"
    ],
    answer: 1
  },
  {
    id: 18,
    question: "A target is DOWN in Prometheus. What should you check first?",
    options: [
      "The Git commit message",
      "The Maven version",
      "Target reachability, endpoint, port, and scrape errors",
      "The Grafana theme"
    ],
    answer: 2
  },
  {
    id: 19,
    question: "What is PromQL?",
    options: [
      "A container orchestration engine",
      "A Linux package manager",
      "A log file compression format",
      "The query language used to select and calculate Prometheus metrics"
    ],
    answer: 3
  },
  {
    id: 20,
    question: "Which PromQL expression selects the current value of the up metric?",
    options: [
      "SELECT up FROM metrics",
      "up",
      "GET /up",
      "show(up)"
    ],
    answer: 1
  },
  {
    id: 21,
    question: "What does rate(http_requests_total[5m]) calculate?",
    options: [
      "The total disk capacity",
      "The number of active exporters",
      "The average per-second increase rate of a counter over five minutes",
      "The number of configured alerts"
    ],
    answer: 2
  },
  {
    id: 22,
    question: "Why is rate() commonly used with counter metrics?",
    options: [
      "To estimate the counter's per-second increase over a time range",
      "To reset the counter to zero",
      "To delete old time series",
      "To change a gauge into a histogram"
    ],
    answer: 0
  },
  {
    id: 23,
    question: "What does the increase(http_requests_total[1h]) expression return?",
    options: [
      "The current CPU utilization",
      "The number of Prometheus servers",
      "The scrape interval in seconds",
      "The estimated increase in the counter over one hour"
    ],
    answer: 3
  },
  {
    id: 24,
    question: "Which metric type is suitable for a value that can increase or decrease, such as current memory usage?",
    options: ["Counter", "Gauge", "Info only", "Alert"],
    answer: 1
  },
  {
    id: 25,
    question: "Which metric type is designed for a monotonically increasing value, except for resets?",
    options: ["Gauge", "Summary", "Counter", "Label"],
    answer: 2
  },
  {
    id: 26,
    question: "What is a Prometheus histogram used for?",
    options: [
      "Recording observations in configurable buckets and tracking counts and sums",
      "Storing Git source files",
      "Creating Kubernetes secrets",
      "Managing user passwords"
    ],
    answer: 0
  },
  {
    id: 27,
    question: "What is a Prometheus summary commonly used to expose?",
    options: [
      "Docker image layers",
      "Kubernetes RBAC rules",
      "Git repository sizes only",
      "Observation counts, sums, and configured quantiles"
    ],
    answer: 3
  },
  {
    id: 28,
    question: "What are labels in Prometheus?",
    options: [
      "Dashboard background colors",
      "Key-value pairs that add dimensions to time series",
      "Linux file permissions",
      "Alert notification channels"
    ],
    answer: 1
  },
  {
    id: 29,
    question: "Why can excessive label cardinality be a problem?",
    options: [
      "It disables every exporter",
      "It automatically deletes alerts",
      "It can increase memory, storage, and query costs",
      "It changes all metrics into logs"
    ],
    answer: 2
  },
  {
    id: 30,
    question: "Which label is usually risky for cardinality when applied to every HTTP request?",
    options: [
      "A unique request ID",
      "A fixed environment name",
      "A small set of service names",
      "A fixed application name"
    ],
    answer: 0
  },
  {
    id: 31,
    question: "What does the Prometheus global section commonly configure?",
    options: [
      "Git credentials",
      "Docker registry passwords",
      "Kubernetes deployment replicas",
      "Default scrape and evaluation intervals"
    ],
    answer: 3
  },
  {
    id: 32,
    question: "What does rule_files configure in prometheus.yml?",
    options: [
      "The Node Exporter installation directory only",
      "Files containing recording and alerting rules",
      "The Grafana database",
      "The application source code"
    ],
    answer: 1
  },
  {
    id: 33,
    question: "What does evaluation_interval control?",
    options: [
      "How often Prometheus evaluates configured rules",
      "How often a user changes a password",
      "How often Kubernetes builds images",
      "How often a Git repository is cloned"
    ],
    answer: 0
  },
  {
    id: 34,
    question: "What is a Prometheus recording rule?",
    options: [
      "A rule that sends every log to email",
      "A rule that restarts Linux automatically",
      "A rule that precomputes and stores the result of a PromQL expression",
      "A rule that installs exporters"
    ],
    answer: 2
  },
  {
    id: 35,
    question: "Why are recording rules useful in production?",
    options: [
      "They replace every application metric",
      "They can precompute expensive queries for repeated use",
      "They eliminate the need for storage",
      "They disable target discovery"
    ],
    answer: 1
  },
  {
    id: 36,
    question: "What is a Prometheus alerting rule?",
    options: [
      "A Docker image build step",
      "A Git branch protection setting",
      "A database migration",
      "A rule that evaluates a condition and can produce a firing alert"
    ],
    answer: 3
  },
  {
    id: 37,
    question: "What is Alertmanager responsible for?",
    options: [
      "Handling alert grouping, routing, silencing, and notifications",
      "Scraping every application endpoint itself",
      "Building container images",
      "Running PromQL as a database engine"
    ],
    answer: 0
  },
  {
    id: 38,
    question: "What is the usual relationship between Prometheus and Alertmanager?",
    options: [
      "Alertmanager compiles Prometheus",
      "Prometheus sends firing alerts to Alertmanager",
      "Prometheus uses Alertmanager to scrape all metrics",
      "They are the same executable and process"
    ],
    answer: 1
  },
  {
    id: 39,
    question: "What does the FOR clause in an alerting rule do?",
    options: [
      "Deletes the alert after every scrape",
      "Forces a server restart",
      "Requires the condition to remain active for a duration before firing",
      "Changes the metric type"
    ],
    answer: 2
  },
  {
    id: 40,
    question: "An alert fires briefly during a small traffic spike. What can help prevent this?",
    options: [
      "Removing all metrics",
      "Disabling target scraping permanently",
      "Increasing every label's cardinality",
      "Using an appropriate for duration and a well-designed alert condition"
    ],
    answer: 3
  },
  {
    id: 41,
    question: "What is an alert label commonly used for?",
    options: [
      "Identifying and routing an alert, such as by severity or service",
      "Storing an entire application binary",
      "Replacing PromQL",
      "Setting the scrape port automatically"
    ],
    answer: 0
  },
  {
    id: 42,
    question: "What is an alert annotation commonly used for?",
    options: [
      "Changing a counter into a gauge",
      "Providing descriptive information such as a summary and troubleshooting details",
      "Changing the Prometheus storage format",
      "Creating exporter network ports"
    ],
    answer: 1
  },
  {
    id: 43,
    question: "What is an Alertmanager silence?",
    options: [
      "A command to erase every time series",
      "A method to disable PromQL",
      "A time-limited or otherwise configured suppression of matching alert notifications",
      "A way to stop all application traffic"
    ],
    answer: 2
  },
  {
    id: 44,
    question: "What is alert grouping in Alertmanager?",
    options: [
      "Combining related alerts into fewer notifications",
      "Combining all metrics into one counter",
      "Merging separate Prometheus databases automatically",
      "Grouping Docker layers into an image"
    ],
    answer: 0
  },
  {
    id: 45,
    question: "What is the purpose of Alertmanager routing?",
    options: [
      "To assign IP addresses to exporters",
      "To set every metric to zero",
      "To create Grafana panels",
      "To send matching alerts to the configured receiver or route"
    ],
    answer: 3
  },
  {
    id: 46,
    question: "A Prometheus alert is firing, but no notification arrives. What should you investigate?",
    options: [
      "Only the application CSS",
      "Alertmanager connectivity, routes, receiver settings, and delivery logs",
      "Only the Git branch name",
      "The number of Dockerfile comments"
    ],
    answer: 1
  },
  {
    id: 47,
    question: "What is service discovery in Prometheus?",
    options: [
      "A way to discover new Git commits",
      "A method of generating application binaries",
      "A way to identify scrape targets dynamically",
      "A tool for compressing metric files"
    ],
    answer: 2
  },
  {
    id: 48,
    question: "Why is Kubernetes service discovery useful for Prometheus?",
    options: [
      "It can discover eligible Kubernetes targets as cluster resources change",
      "It eliminates all authentication requirements",
      "It converts logs into source code",
      "It automatically repairs every failed pod"
    ],
    answer: 0
  },
  {
    id: 49,
    question: "What is relabeling in Prometheus configuration?",
    options: [
      "Changing Linux usernames",
      "Renaming container images in a registry",
      "Deleting all alert rules",
      "Transforming or filtering labels during target or metric processing"
    ],
    answer: 3
  },
  {
    id: 50,
    question: "What does metric_relabel_configs apply to?",
    options: [
      "Only Grafana dashboard titles",
      "Scraped samples before they are ingested into the time-series database",
      "Only Kubernetes node labels",
      "Only Alertmanager email templates"
    ],
    answer: 1
  },
  {
    id: 51,
    question: "What does honor_labels influence in a scrape configuration?",
    options: [
      "How conflicting labels from scraped samples and Prometheus are handled",
      "How many CPU cores are allocated",
      "Whether Grafana uses dark mode",
      "How many alert emails are sent"
    ],
    answer: 0
  },
  {
    id: 52,
    question: "What is the purpose of external_labels?",
    options: [
      "To change every scrape endpoint",
      "To store all metric samples in environment variables",
      "To attach labels that identify a Prometheus server or its metrics in external systems",
      "To set Node Exporter file permissions"
    ],
    answer: 2
  },
  {
    id: 53,
    question: "Which Prometheus feature can limit how long locally stored samples are retained?",
    options: [
      "scrape_timeout only",
      "External labels",
      "Alert annotations",
      "Storage retention settings"
    ],
    answer: 3
  },
  {
    id: 54,
    question: "What does --storage.tsdb.retention.time control?",
    options: [
      "The length of time samples are retained in the local TSDB",
      "The interval between alert emails",
      "The exporter HTTP port",
      "The time Kubernetes waits before scheduling a pod"
    ],
    answer: 0
  },
  {
    id: 55,
    question: "Where does a standard Prometheus server store its local time-series data?",
    options: [
      "Only in the browser cache",
      "In its configured local TSDB storage directory",
      "Only in Alertmanager memory",
      "In Git commit messages"
    ],
    answer: 1
  },
  {
    id: 56,
    question: "What is the purpose of the Prometheus TSDB?",
    options: [
      "Managing source code branches",
      "Routing alert emails",
      "Storing and indexing time-series samples",
      "Building Kubernetes container images"
    ],
    answer: 2
  },
  {
    id: 57,
    question: "Prometheus storage usage is growing rapidly. What should you investigate?",
    options: [
      "Only the dashboard font",
      "The number of Git contributors",
      "The README length",
      "Retention, scrape frequency, sample volume, and label cardinality"
    ],
    answer: 3
  },
  {
    id: 58,
    question: "What is remote_write used for?",
    options: [
      "Sending samples to a compatible remote-write destination",
      "Writing application source code to Git",
      "Creating new exporters automatically",
      "Sending alert emails directly"
    ],
    answer: 0
  },
  {
    id: 59,
    question: "What is remote_read used for?",
    options: [
      "Reading Kubernetes secrets",
      "Querying data from compatible remote-read systems",
      "Reading application source code",
      "Downloading Docker images"
    ],
    answer: 1
  },
  {
    id: 60,
    question: "What is federation in Prometheus?",
    options: [
      "A way to combine Docker networks",
      "A tool for managing Linux users",
      "Scraping selected metrics from another Prometheus server",
      "A method to compile PromQL"
    ],
    answer: 2
  },
  {
    id: 61,
    question: "Why might an organization use Prometheus federation?",
    options: [
      "To remove every metric label",
      "To avoid running any monitoring server",
      "To replace all alerting rules with scripts",
      "To aggregate selected metrics across monitoring levels"
    ],
    answer: 3
  },
  {
    id: 62,
    question: "Which endpoint is commonly used to check Prometheus readiness?",
    options: ["/-/ready", "/metrics/delete", "/ready/all", "/prometheus/start"],
    answer: 0
  },
  {
    id: 63,
    question: "Which endpoint is commonly used to check Prometheus liveness?",
    options: ["/-/healthy/all", "/-/healthy", "/live/metrics", "/health/delete"],
    answer: 1
  },
  {
    id: 64,
    question: "What is the purpose of the Prometheus /targets page?",
    options: [
      "To manage Git credentials",
      "To display only Grafana dashboards",
      "To inspect scrape targets, their states, and scrape errors",
      "To configure Kubernetes storage classes"
    ],
    answer: 2
  },
  {
    id: 65,
    question: "What is the purpose of the Prometheus /rules page?",
    options: [
      "To build container images",
      "To show only application logs",
      "To configure Linux firewall rules",
      "To inspect loaded recording and alerting rules"
    ],
    answer: 3
  },
  {
    id: 66,
    question: "A newly added target does not appear in Prometheus. What should you check?",
    options: [
      "prometheus.yml, configuration reload, service discovery, and target filters",
      "Only the Grafana logo",
      "The application's CSS files",
      "The number of Git branches"
    ],
    answer: 0
  },
  {
    id: 67,
    question: "Prometheus reports a scrape timeout. What is a sensible first investigation?",
    options: [
      "Delete every metric",
      "Check target response time, network reachability, timeout settings, and load",
      "Reinstall Git",
      "Change the dashboard color"
    ],
    answer: 1
  },
  {
    id: 68,
    question: "A target returns HTTP 404 during scraping. What is a likely cause?",
    options: [
      "The TSDB retention period is too long",
      "The alert severity is missing",
      "The configured metrics path is incorrect or unavailable",
      "The counter increased too quickly"
    ],
    answer: 2
  },
  {
    id: 69,
    question: "A target returns HTTP 401 or 403 when scraped. What should you check?",
    options: [
      "The PromQL graph color",
      "The number of recording rules",
      "The metric sample timestamp only",
      "Authentication, authorization, and endpoint access configuration"
    ],
    answer: 3
  },
  {
    id: 70,
    question: "What is the purpose of basic_auth in a Prometheus scrape configuration?",
    options: [
      "To configure HTTP basic authentication for a scrape target",
      "To create a Grafana user automatically",
      "To encrypt TSDB files at rest",
      "To change metric labels into passwords"
    ],
    answer: 0
  },
  {
    id: 71,
    question: "Why should TLS be configured for Prometheus scrape traffic where appropriate?",
    options: [
      "To increase metric cardinality",
      "To protect traffic and verify endpoints according to the TLS configuration",
      "To remove the need for authorization",
      "To make every scrape return HTTP 200"
    ],
    answer: 1
  },
  {
    id: 72,
    question: "What is the safest way to manage sensitive credentials used by Prometheus?",
    options: [
      "Commit them directly to a public repository",
      "Place them in metric labels",
      "Use controlled secret management and restrict file and access permissions",
      "Print them in every scrape response"
    ],
    answer: 2
  },
  {
    id: 73,
    question: "Why should access to the Prometheus UI and API be restricted?",
    options: [
      "To stop all time-series collection",
      "To prevent any exporter from running",
      "To remove every metric label",
      "Because metrics and operational details may be sensitive and APIs can expose powerful functionality"
    ],
    answer: 3
  },
  {
    id: 74,
    question: "What is the role of Grafana when used with Prometheus?",
    options: [
      "Visualizing Prometheus metrics in dashboards",
      "Replacing the Prometheus scrape engine",
      "Managing Prometheus TSDB blocks directly as its main role",
      "Installing every exporter automatically"
    ],
    answer: 0
  },
  {
    id: 75,
    question: "How does Grafana commonly query Prometheus?",
    options: [
      "Through Git hooks",
      "By configuring Prometheus as a data source and using PromQL queries",
      "Through Maven dependency resolution",
      "By reading Dockerfiles"
    ],
    answer: 1
  },
  {
    id: 76,
    question: "A Grafana panel shows no Prometheus data. What should you check?",
    options: [
      "Only the dashboard title",
      "The application's Git history only",
      "Data source connectivity, query syntax, time range, and metric availability",
      "The Docker image tag of an unrelated service"
    ],
    answer: 2
  },
  {
    id: 77,
    question: "What is the purpose of a Prometheus console template?",
    options: [
      "To compile Java source code",
      "To create Kubernetes network policies",
      "To route Alertmanager notifications",
      "To render metric queries and visualizations in Prometheus's console interface"
    ],
    answer: 3
  },
  {
    id: 78,
    question: "What is the Prometheus expression browser useful for?",
    options: [
      "Running PromQL queries and inspecting their results",
      "Building Docker images",
      "Managing cloud billing",
      "Editing application source code"
    ],
    answer: 0
  },
  {
    id: 79,
    question: "What does the PromQL expression sum(rate(http_requests_total[5m])) calculate?",
    options: [
      "The number of configured exporters",
      "The aggregate per-second request rate across the selected series",
      "The total disk space available",
      "The current number of Kubernetes namespaces"
    ],
    answer: 1
  },
  {
    id: 80,
    question: "Why might sum by (job) (rate(http_requests_total[5m])) be useful?",
    options: [
      "It resets all counters by job",
      "It deletes series with missing labels",
      "It aggregates request rates grouped by the job label",
      "It changes the scrape interval"
    ],
    answer: 2
  },
  {
    id: 81,
    question: "What does the PromQL operator unless do?",
    options: [
      "Calculate a moving average",
      "Convert a gauge into a counter",
      "Send alerts to email",
      "Return left-hand vector elements without matching elements on the right"
    ],
    answer: 3
  },
  {
    id: 82,
    question: "What is a range vector in PromQL?",
    options: [
      "A set of samples for each selected time series over a time range",
      "A Kubernetes list of pod replicas",
      "A list of alert receivers",
      "A file containing scrape credentials"
    ],
    answer: 0
  },
  {
    id: 83,
    question: "Which selector chooses samples from a time range?",
    options: ["{job='api'}", "http_requests_total[5m]", "up == 1", "sum(up)"],
    answer: 1
  },
  {
    id: 84,
    question: "What is the purpose of the absent() PromQL function?",
    options: [
      "To restart a failed exporter",
      "To delete missing metrics",
      "To detect when a matching series is absent",
      "To create a new metric automatically"
    ],
    answer: 2
  },
  {
    id: 85,
    question: "Why can a missing metric be difficult to detect using a normal threshold alert?",
    options: [
      "Missing metrics always have a value of one",
      "Prometheus automatically replaces all missing values with zero",
      "All missing metrics are converted to counters",
      "A missing series may produce no result, so a threshold comparison may not fire"
    ],
    answer: 3
  },
  {
    id: 86,
    question: "What is the purpose of the Prometheus blackbox exporter?",
    options: [
      "Probing endpoints over supported protocols to measure availability and response characteristics",
      "Collecting only CPU metrics from Linux",
      "Storing Prometheus backups",
      "Managing Alertmanager routing"
    ],
    answer: 0
  },
  {
    id: 87,
    question: "What can the blackbox exporter probe?",
    options: [
      "Only Java bytecode",
      "HTTP, HTTPS, DNS, TCP, and ICMP, depending on configuration and permissions",
      "Only Git repositories",
      "Only PromQL files"
    ],
    answer: 1
  },
  {
    id: 88,
    question: "What is the purpose of the cAdvisor metrics endpoint in a container environment?",
    options: [
      "To configure Alertmanager email receivers",
      "To create Kubernetes secrets",
      "To expose container resource and performance metrics",
      "To store Git commits"
    ],
    answer: 2
  },
  {
    id: 89,
    question: "In Kubernetes, what is a common way to configure Prometheus to scrape application pods?",
    options: [
      "Add every pod IP permanently by hand",
      "Use only a Dockerfile",
      "Disable Kubernetes API access for discovery",
      "Use Kubernetes service discovery and suitable pod or service scrape configuration"
    ],
    answer: 3
  },
  {
    id: 90,
    question: "What is the purpose of a ServiceMonitor in Prometheus Operator environments?",
    options: [
      "To describe services and endpoints that the Operator-managed Prometheus should monitor",
      "To replace Kubernetes Services",
      "To create Docker images",
      "To configure GitHub branch permissions"
    ],
    answer: 0
  },
  {
    id: 91,
    question: "What is the purpose of a PodMonitor in Prometheus Operator environments?",
    options: [
      "To manage container image versions",
      "To describe pod endpoints for monitoring",
      "To replace Kubernetes Deployments",
      "To configure Alertmanager SMTP credentials only"
    ],
    answer: 1
  },
  {
    id: 92,
    question: "A ServiceMonitor exists, but its target is not discovered. What should you check?",
    options: [
      "Only the Prometheus dashboard theme",
      "The number of Git commits",
      "Label selectors, namespace selectors, Prometheus selection, and Operator configuration",
      "The application's README formatting"
    ],
    answer: 2
  },
  {
    id: 93,
    question: "What is Prometheus Operator mainly responsible for?",
    options: [
      "Replacing the Kubernetes API server",
      "Compiling all application code",
      "Managing source code repositories",
      "Managing Prometheus-related resources and deployments through Kubernetes custom resources"
    ],
    answer: 3
  },
  {
    id: 94,
    question: "What is a common benefit of running Prometheus with a Kubernetes StatefulSet and persistent storage?",
    options: [
      "It can provide stable pod identity and persistent storage for local time-series data",
      "It guarantees that no metrics will ever be lost",
      "It removes the need for backups",
      "It makes Prometheus automatically multi-region"
    ],
    answer: 0
  },
  {
    id: 95,
    question: "What should be considered when backing up Prometheus data?",
    options: [
      "Copy only the Grafana dashboard title",
      "Use a consistent, supported backup approach and verify restoration",
      "Delete all TSDB blocks before backup",
      "Back up only the alert names"
    ],
    answer: 1
  },
  {
    id: 96,
    question: "What is an important limitation of a single Prometheus server?",
    options: [
      "It cannot scrape HTTP endpoints",
      "It cannot evaluate PromQL",
      "It can become a single point of failure unless redundancy and recovery are designed",
      "It cannot store time-series data"
    ],
    answer: 2
  },
  {
    id: 97,
    question: "What is a common approach to improving Prometheus availability?",
    options: [
      "Disable all health checks",
      "Store every metric as a unique label",
      "Run only one instance without backups",
      "Use redundant Prometheus instances and design alerting and storage appropriately"
    ],
    answer: 3
  },
  {
    id: 98,
    question: "What should you monitor to detect Prometheus server performance problems?",
    options: [
      "Prometheus self-metrics, resource usage, scrape health, rule evaluation, and query latency",
      "Only the number of dashboard panels",
      "Only the length of alert descriptions",
      "Only the Git repository name"
    ],
    answer: 0
  },
  {
    id: 99,
    question: "A Prometheus query is slow in production. What is a good first step?",
    options: [
      "Increase every label's cardinality",
      "Inspect the query, time range, series cardinality, and expensive aggregations",
      "Delete Alertmanager immediately",
      "Disable every scrape target"
    ],
    answer: 1
  },
  {
    id: 100,
    question: "During a production incident, CPU usage is high but Prometheus shows no application metrics. What is the best response?",
    options: [
      "Assume the application is healthy because no alert fired",
      "Delete the Prometheus data directory immediately",
      "Check target health and scrape errors, validate the metrics endpoint, and investigate exporter and discovery issues",
      "Disable all monitoring permanently"
    ],
    answer: 2
  }
];
