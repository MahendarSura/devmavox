export interface observabilityloggingQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export const observabilityloggingQuestions: observabilityloggingQuestion[] = [
  {
    id: "observability-1",
    question: "What is observability?",
    options: [
      "Understanding a system's internal state using its outputs",
      "Writing application code",
      "Creating virtual machines only",
      "Managing source code branches"
    ],
    answer: 0
  },
  {
    id: "observability-2",
    question: "What are the three main pillars of observability?",
    options: [
      "Build, Test, Deploy",
      "Metrics, Logs, Traces",
      "CPU, RAM, Disk",
      "Git, Docker, Kubernetes"
    ],
    answer: 1
  },
  {
    id: "observability-3",
    question: "What is monitoring?",
    options: [
      "Automatically writing application code",
      "Tracking predefined system metrics and conditions",
      "Creating Docker images",
      "Managing database schemas"
    ],
    answer: 1
  },
  {
    id: "observability-4",
    question: "What is the main difference between monitoring and observability?",
    options: [
      "They are exactly the same",
      "Monitoring is only for networks",
      "Monitoring tracks known conditions; observability helps investigate unknown issues",
      "Observability replaces application testing"
    ],
    answer: 2
  },
  {
    id: "observability-5",
    question: "What is a metric?",
    options: [
      "A numerical measurement collected over time",
      "A complete source-code repository",
      "A container image",
      "A deployment manifest"
    ],
    answer: 0
  },
  {
    id: "observability-6",
    question: "What is a log?",
    options: [
      "A Kubernetes node",
      "A record of an event that occurred in a system",
      "A CPU scheduling algorithm",
      "A load balancer"
    ],
    answer: 1
  },
  {
    id: "observability-7",
    question: "What is distributed tracing?",
    options: [
      "Tracking a request as it travels across multiple services",
      "Tracking Git commits only",
      "Monitoring disk space only",
      "Creating database backups"
    ],
    answer: 0
  },
  {
    id: "observability-8",
    question: "Which signal is best for identifying a sudden increase in CPU usage?",
    options: [
      "Application source code",
      "Git commit history",
      "CPU utilization metrics",
      "Dockerfile comments"
    ],
    answer: 2
  },
  {
    id: "observability-9",
    question: "What is an observability dashboard?",
    options: [
      "A visual display of system health and telemetry",
      "A container runtime",
      "A code compiler",
      "A package manager"
    ],
    answer: 0
  },
  {
    id: "observability-10",
    question: "What is telemetry?",
    options: [
      "Only application source code",
      "Data collected and transmitted about a system's behavior",
      "Only firewall rules",
      "Only deployment scripts"
    ],
    answer: 1
  },
  {
    id: "observability-11",
    question: "What is Prometheus primarily used for?",
    options: [
      "Collecting and querying metrics",
      "Building Java applications",
      "Managing Git branches",
      "Creating virtual networks"
    ],
    answer: 0
  },
  {
    id: "observability-12",
    question: "Which query language does Prometheus use?",
    options: [
      "SQL",
      "HCL",
      "PromQL",
      "HTML"
    ],
    answer: 2
  },
  {
    id: "observability-13",
    question: "How does Prometheus commonly collect metrics?",
    options: [
      "By scraping HTTP metrics endpoints",
      "By reading Git commits",
      "By compiling Dockerfiles",
      "By scanning source-code comments"
    ],
    answer: 0
  },
  {
    id: "observability-14",
    question: "What is a Prometheus scrape target?",
    options: [
      "A server or endpoint from which Prometheus collects metrics",
      "A GitHub pull request",
      "A Docker build stage",
      "A database table"
    ],
    answer: 0
  },
  {
    id: "observability-15",
    question: "What is a Prometheus exporter?",
    options: [
      "A tool that exposes metrics in a format Prometheus can scrape",
      "A tool that creates Git tags",
      "A Kubernetes scheduler",
      "A container image registry"
    ],
    answer: 0
  },
  {
    id: "observability-16",
    question: "What is Node Exporter commonly used for?",
    options: [
      "Monitoring Linux host-level metrics",
      "Building Node.js applications",
      "Managing Kubernetes secrets",
      "Collecting Git commit messages"
    ],
    answer: 0
  },
  {
    id: "observability-17",
    question: "What is the default Prometheus web port?",
    options: [
      "3000",
      "9090",
      "8080",
      "9100"
    ],
    answer: 1
  },
  {
    id: "observability-18",
    question: "What is the usual default Node Exporter port?",
    options: [
      "9090",
      "3000",
      "9100",
      "443"
    ],
    answer: 2
  },
  {
    id: "observability-19",
    question: "What is the purpose of prometheus.yml?",
    options: [
      "Configuring scrape jobs, targets, and related Prometheus settings",
      "Defining Docker image layers",
      "Storing Git credentials",
      "Configuring Java dependencies"
    ],
    answer: 0
  },
  {
    id: "observability-20",
    question: "What does the Prometheus up metric indicate?",
    options: [
      "Whether a scrape target was successfully scraped",
      "Whether a Git branch exists",
      "Whether a Docker image was built",
      "Whether a database backup completed"
    ],
    answer: 0
  },
  {
    id: "observability-21",
    question: "What is a Prometheus time series?",
    options: [
      "A sequence of timestamped samples identified by a metric and labels",
      "A sequence of Git commits",
      "A list of Docker layers",
      "A collection of Kubernetes manifests"
    ],
    answer: 0
  },
  {
    id: "observability-22",
    question: "What is a Prometheus label?",
    options: [
      "A key-value dimension attached to a metric",
      "A Linux user account",
      "A Docker volume",
      "A firewall protocol"
    ],
    answer: 0
  },
  {
    id: "observability-23",
    question: "What is a counter metric?",
    options: [
      "A value that generally increases and can reset when the process restarts",
      "A value that always measures current memory",
      "A metric that stores complete log files",
      "A metric that cannot be queried"
    ],
    answer: 0
  },
  {
    id: "observability-24",
    question: "What is a gauge metric?",
    options: [
      "A value that can increase or decrease",
      "A value that can only increase",
      "A log aggregation rule",
      "A tracing identifier"
    ],
    answer: 0
  },
  {
    id: "observability-25",
    question: "What is a histogram metric used for?",
    options: [
      "Observing distributions such as request durations",
      "Storing Git branches",
      "Creating Kubernetes namespaces",
      "Encrypting passwords"
    ],
    answer: 0
  },
  {
    id: "observability-26",
    question: "What does rate() commonly calculate in PromQL?",
    options: [
      "Average per-second increase of a counter over a range",
      "Total disk capacity",
      "Number of Kubernetes namespaces",
      "Application source-code size"
    ],
    answer: 0
  },
  {
    id: "observability-27",
    question: "What does the PromQL function increase() calculate?",
    options: [
      "Estimated increase of a counter over a specified range",
      "CPU temperature",
      "Number of log files on disk",
      "Number of Git branches"
    ],
    answer: 0
  },
  {
    id: "observability-28",
    question: "What is a recording rule in Prometheus?",
    options: [
      "A rule that precomputes and stores the result of an expression as a new time series",
      "A rule that records video",
      "A rule that creates containers",
      "A rule that rotates Git credentials"
    ],
    answer: 0
  },
  {
    id: "observability-29",
    question: "What is the purpose of a Prometheus alerting rule?",
    options: [
      "Evaluate an expression and activate an alert when its condition is met",
      "Automatically fix every application bug",
      "Create database tables",
      "Build container images"
    ],
    answer: 0
  },
  {
    id: "observability-30",
    question: "What is Alertmanager used for?",
    options: [
      "Grouping, routing, deduplicating, and managing Prometheus alerts",
      "Collecting application traces only",
      "Compiling source code",
      "Managing container storage"
    ],
    answer: 0
  },
  {
    id: "observability-31",
    question: "What is Grafana primarily used for?",
    options: [
      "Visualizing metrics and other observability data",
      "Replacing the Linux kernel",
      "Building Docker images",
      "Managing Git merges"
    ],
    answer: 0
  },
  {
    id: "observability-32",
    question: "What is a Grafana data source?",
    options: [
      "A configured backend from which Grafana queries data",
      "A Linux kernel module",
      "A Kubernetes deployment strategy",
      "A source-code branch"
    ],
    answer: 0
  },
  {
    id: "observability-33",
    question: "What is the commonly used default Grafana port?",
    options: [
      "9090",
      "3000",
      "9100",
      "6443"
    ],
    answer: 1
  },
  {
    id: "observability-34",
    question: "Can Grafana visualize data from Prometheus?",
    options: [
      "No, Grafana only displays text files",
      "Yes, by configuring Prometheus as a data source",
      "Only after removing Prometheus",
      "Only when Kubernetes is disabled"
    ],
    answer: 1
  },
  {
    id: "observability-35",
    question: "What is a Grafana panel?",
    options: [
      "A visualization or data display within a dashboard",
      "A Kubernetes worker node",
      "A Docker registry",
      "A Linux process"
    ],
    answer: 0
  },
  {
    id: "observability-36",
    question: "What is a Grafana dashboard variable?",
    options: [
      "A reusable input that can make dashboard queries dynamic",
      "A permanent operating system user",
      "A container image tag only",
      "A Java compiler option"
    ],
    answer: 0
  },
  {
    id: "observability-37",
    question: "Why use dashboard templates for multiple services?",
    options: [
      "To reuse visualizations with different variable values",
      "To eliminate the need for metrics",
      "To automatically repair all failures",
      "To disable authentication"
    ],
    answer: 0
  },
  {
    id: "observability-38",
    question: "What is the purpose of Grafana alerting?",
    options: [
      "Evaluate configured conditions and notify responders when rules trigger",
      "Compile application code",
      "Create container networks",
      "Replace all log storage"
    ],
    answer: 0
  },
  {
    id: "observability-39",
    question: "What should you check when a Grafana panel displays no data?",
    options: [
      "Only the dashboard title",
      "Data source health, time range, query, and available metrics",
      "Only Git branch names",
      "Only the operating system wallpaper"
    ],
    answer: 1
  },
  {
    id: "observability-40",
    question: "What is dashboard provisioning?",
    options: [
      "Managing dashboards and data sources through configuration",
      "Manually creating every dashboard after each restart",
      "Creating virtual machines only",
      "Deleting all historical metrics"
    ],
    answer: 0
  },
  {
    id: "observability-41",
    question: "What is centralized logging?",
    options: [
      "Collecting logs from multiple systems into a shared platform",
      "Saving logs only on a developer's laptop",
      "Disabling application logs",
      "Storing source code in memory"
    ],
    answer: 0
  },
  {
    id: "observability-42",
    question: "What does the ELK Stack stand for?",
    options: [
      "Elastic Load Kubernetes",
      "Elasticsearch, Logstash, Kibana",
      "Event Logging Kernel",
      "Enterprise Linux Kit"
    ],
    answer: 1
  },
  {
    id: "observability-43",
    question: "What is Elasticsearch commonly used for in logging?",
    options: [
      "Indexing, storing, and searching log data",
      "Scheduling Kubernetes pods",
      "Building Java source code",
      "Creating Git branches"
    ],
    answer: 0
  },
  {
    id: "observability-44",
    question: "What is Logstash used for?",
    options: [
      "Collecting, transforming, and forwarding data",
      "Managing cloud IAM policies only",
      "Building container images",
      "Running Kubernetes control planes"
    ],
    answer: 0
  },
  {
    id: "observability-45",
    question: "What is Kibana used for?",
    options: [
      "Searching and visualizing data stored in Elasticsearch",
      "Scraping Prometheus metrics",
      "Managing Terraform state",
      "Creating Docker volumes"
    ],
    answer: 0
  },
  {
    id: "observability-46",
    question: "What is the EFK Stack?",
    options: [
      "Elasticsearch, Fluentd, Kibana",
      "Elastic, Flux, Kubernetes",
      "Events, Files, Kernels",
      "Exporter, Fluent Bit, Kubelet"
    ],
    answer: 0
  },
  {
    id: "observability-47",
    question: "What is Fluent Bit commonly used for?",
    options: [
      "Lightweight log and telemetry collection and forwarding",
      "Managing GitHub pull requests",
      "Compiling Java code",
      "Creating cloud accounts"
    ],
    answer: 0
  },
  {
    id: "observability-48",
    question: "What is Grafana Loki?",
    options: [
      "A log aggregation system designed to work with Grafana",
      "A Kubernetes scheduler",
      "A source-code compiler",
      "A database migration tool"
    ],
    answer: 0
  },
  {
    id: "observability-49",
    question: "How does Loki differ from Elasticsearch in its typical indexing approach?",
    options: [
      "Loki indexes labels rather than the full content of every log line",
      "Loki cannot store logs",
      "Elasticsearch never indexes data",
      "Both require all logs to be stored in Git"
    ],
    answer: 0
  },
  {
    id: "observability-50",
    question: "What is a log shipper?",
    options: [
      "An agent that collects and forwards logs to a destination",
      "A tool that creates virtual machines",
      "A Git branch protection rule",
      "A database index"
    ],
    answer: 0
  },
  {
    id: "observability-51",
    question: "Why use structured JSON logging?",
    options: [
      "To make log fields easier to parse, filter, and query",
      "To encrypt all logs automatically",
      "To eliminate the need for timestamps",
      "To reduce every log to a single character"
    ],
    answer: 0
  },
  {
    id: "observability-52",
    question: "What is log rotation?",
    options: [
      "Managing log file size and retention by rotating or archiving files",
      "Changing the application programming language",
      "Restarting every server continuously",
      "Rotating encryption keys only"
    ],
    answer: 0
  },
  {
    id: "observability-53",
    question: "What is a correlation ID?",
    options: [
      "An identifier used to connect related events across components",
      "A Docker image digest",
      "A Kubernetes node name",
      "A Linux filesystem type"
    ],
    answer: 0
  },
  {
    id: "observability-54",
    question: "Why should secrets be removed or masked in logs?",
    options: [
      "To prevent credentials and sensitive data from being exposed",
      "To increase CPU utilization",
      "To make logs impossible to search",
      "To disable application monitoring"
    ],
    answer: 0
  },
  {
    id: "observability-55",
    question: "What is log retention?",
    options: [
      "The period for which logs are kept before deletion or archival",
      "The time taken to compile code",
      "The number of Kubernetes replicas",
      "The lifetime of a Git branch"
    ],
    answer: 0
  },
  {
    id: "observability-56",
    question: "What is a distributed trace?",
    options: [
      "A collection of spans representing work across services",
      "A collection of Dockerfiles",
      "A list of Linux users",
      "A sequence of database backups"
    ],
    answer: 0
  },
  {
    id: "observability-57",
    question: "What is a span in distributed tracing?",
    options: [
      "A timed unit of work within a trace",
      "A Prometheus scrape interval",
      "A Kubernetes storage class",
      "A Git repository"
    ],
    answer: 0
  },
  {
    id: "observability-58",
    question: "What is a trace ID?",
    options: [
      "An identifier that connects spans belonging to the same trace",
      "An identifier for a Docker image layer",
      "A Linux process ID only",
      "A Kubernetes service port"
    ],
    answer: 0
  },
  {
    id: "observability-59",
    question: "What is OpenTelemetry?",
    options: [
      "A vendor-neutral framework and set of tools for generating and collecting telemetry",
      "A proprietary Linux distribution",
      "A container orchestration engine",
      "A source-code hosting service"
    ],
    answer: 0
  },
  {
    id: "observability-60",
    question: "What is the OpenTelemetry Collector?",
    options: [
      "A component that receives, processes, and exports telemetry",
      "A tool used only to compile Java applications",
      "A Git repository backup service",
      "A Kubernetes ingress controller"
    ],
    answer: 0
  },
  {
    id: "observability-61",
    question: "What is the purpose of OpenTelemetry instrumentation?",
    options: [
      "To generate telemetry such as traces, metrics, and logs",
      "To encrypt every network packet automatically",
      "To provision cloud accounts",
      "To replace application testing"
    ],
    answer: 0
  },
  {
    id: "observability-62",
    question: "What is trace context propagation?",
    options: [
      "Passing trace identifiers across service boundaries",
      "Copying container images between registries",
      "Replicating databases",
      "Rotating application logs"
    ],
    answer: 0
  },
  {
    id: "observability-63",
    question: "What is sampling in distributed tracing?",
    options: [
      "Selecting which traces to record or retain",
      "Collecting every trace without exception",
      "Deleting all metrics",
      "Restarting services at random"
    ],
    answer: 0
  },
  {
    id: "observability-64",
    question: "Why is tail-based sampling useful?",
    options: [
      "It can make sampling decisions after examining trace data, such as errors or latency",
      "It samples only the first character of a log",
      "It disables distributed tracing",
      "It samples CPU temperature only"
    ],
    answer: 0
  },
  {
    id: "observability-65",
    question: "What is a common use of Jaeger?",
    options: [
      "Distributed tracing visualization and analysis",
      "Container image building",
      "Infrastructure provisioning",
      "Source-code linting"
    ],
    answer: 0
  },
  {
    id: "observability-66",
    question: "What is the purpose of Tempo in the Grafana ecosystem?",
    options: [
      "Storing and querying distributed tracing data",
      "Compiling application code",
      "Managing Git permissions",
      "Scheduling Kubernetes pods"
    ],
    answer: 0
  },
  {
    id: "observability-67",
    question: "What is trace-to-log correlation?",
    options: [
      "Using trace or span identifiers to find related log entries",
      "Converting every log into a Docker image",
      "Deleting logs after every request",
      "Replacing metrics with source code"
    ],
    answer: 0
  },
  {
    id: "observability-68",
    question: "What is an advantage of tracing microservices?",
    options: [
      "It helps identify which service or dependency adds latency",
      "It guarantees that services never fail",
      "It removes the need for health checks",
      "It automatically increases CPU capacity"
    ],
    answer: 0
  },
  {
    id: "observability-69",
    question: "What is an instrumentation library?",
    options: [
      "Code that helps an application emit telemetry",
      "A physical network cable",
      "A Kubernetes storage device",
      "A log archive format"
    ],
    answer: 0
  },
  {
    id: "observability-70",
    question: "What is a baggage item in OpenTelemetry tracing?",
    options: [
      "A key-value item propagated across distributed service calls",
      "A container image layer",
      "A Linux boot parameter",
      "A Prometheus dashboard panel"
    ],
    answer: 0
  },
  {
    id: "observability-71",
    question: "What is an SLI?",
    options: [
      "A quantitative indicator of a service's behavior or reliability",
      "A source-code license",
      "A server location identifier",
      "A storage layer image"
    ],
    answer: 0
  },
  {
    id: "observability-72",
    question: "What is an SLO?",
    options: [
      "A target value or range for a service-level indicator",
      "A mandatory source-code language",
      "A type of Docker network",
      "A log file extension"
    ],
    answer: 0
  },
  {
    id: "observability-73",
    question: "What is an SLA?",
    options: [
      "A service-level agreement that defines commitments and possible consequences",
      "A Linux service account",
      "A Prometheus query language",
      "A container storage driver"
    ],
    answer: 0
  },
  {
    id: "observability-74",
    question: "What is an error budget?",
    options: [
      "The amount of unreliability allowed by an SLO over a defined period",
      "The monthly cost of source-code licenses",
      "The number of application developers",
      "The size of a Docker image"
    ],
    answer: 0
  },
  {
    id: "observability-75",
    question: "What are the four commonly used Google SRE golden signals?",
    options: [
      "CPU, RAM, Disk, Network",
      "Latency, Traffic, Errors, Saturation",
      "Build, Test, Deploy, Release",
      "Logs, Files, Users, Groups"
    ],
    answer: 1
  },
  {
    id: "observability-76",
    question: "What does latency measure?",
    options: [
      "The time taken to complete an operation or request",
      "The number of Git branches",
      "The amount of disk space installed",
      "The number of application developers"
    ],
    answer: 0
  },
  {
    id: "observability-77",
    question: "What does traffic measure in service monitoring?",
    options: [
      "The demand placed on a service, such as requests per second",
      "The number of source-code files",
      "The size of the operating system",
      "The number of database schemas"
    ],
    answer: 0
  },
  {
    id: "observability-78",
    question: "What is saturation?",
    options: [
      "How heavily a resource is utilized relative to its capacity",
      "The number of users in a Git repository",
      "The age of a Docker image",
      "The number of log formats supported"
    ],
    answer: 0
  },
  {
    id: "observability-79",
    question: "What is p95 latency?",
    options: [
      "The latency below which approximately 95% of measured requests fall",
      "The average latency of exactly five requests",
      "The number of failed deployments",
      "The percentage of disk space remaining"
    ],
    answer: 0
  },
  {
    id: "observability-80",
    question: "Why monitor error rate?",
    options: [
      "To detect failures and evaluate service reliability",
      "To identify Git branch names",
      "To count Dockerfile comments",
      "To measure employee attendance"
    ],
    answer: 0
  },
  {
    id: "observability-81",
    question: "What is a synthetic monitoring check?",
    options: [
      "A scripted test that simulates user actions or requests",
      "A physical server replacement",
      "A Git commit signature",
      "A database schema migration"
    ],
    answer: 0
  },
  {
    id: "observability-82",
    question: "What is black-box monitoring?",
    options: [
      "Checking externally observable behavior without relying on internal implementation details",
      "Reading every line of application source code",
      "Monitoring only CPU temperature",
      "Disabling health endpoints"
    ],
    answer: 0
  },
  {
    id: "observability-83",
    question: "What is white-box monitoring?",
    options: [
      "Using internal telemetry and system instrumentation to understand behavior",
      "Checking only whether a website opens",
      "Monitoring only DNS records",
      "Checking only SSL certificate dates"
    ],
    answer: 0
  },
  {
    id: "observability-84",
    question: "What is an alert threshold?",
    options: [
      "A configured condition or limit that can trigger an alert",
      "A limit on Git branch names",
      "A Docker image repository",
      "A Kubernetes service account"
    ],
    answer: 0
  },
  {
    id: "observability-85",
    question: "What is alert fatigue?",
    options: [
      "Responders becoming less attentive because of excessive or low-value alerts",
      "A shortage of application logs",
      "A reduction in container image size",
      "A type of network encryption"
    ],
    answer: 0
  },
  {
    id: "observability-86",
    question: "What is alert deduplication?",
    options: [
      "Combining repeated notifications about the same underlying alert",
      "Deleting all alert rules",
      "Removing duplicate source-code functions",
      "Combining all server metrics into one number"
    ],
    answer: 0
  },
  {
    id: "observability-87",
    question: "What is alert grouping?",
    options: [
      "Combining related alerts into a notification group",
      "Grouping all Docker images into one file",
      "Combining Git commits into one branch automatically",
      "Removing all labels from metrics"
    ],
    answer: 0
  },
  {
    id: "observability-88",
    question: "What is a runbook in incident response?",
    options: [
      "A documented procedure for diagnosing or resolving a known operational issue",
      "A list of application dependencies only",
      "A Docker build cache",
      "A network cable inventory only"
    ],
    answer: 0
  },
  {
    id: "observability-89",
    question: "What is a postmortem after a production incident?",
    options: [
      "A review of the incident, its impact, causes, and preventive actions",
      "A process for deleting every log",
      "A routine container build",
      "A method for renaming Git branches"
    ],
    answer: 0
  },
  {
    id: "observability-90",
    question: "What is a useful principle for writing incident postmortems?",
    options: [
      "Focus on learning and improving systems rather than blaming individuals",
      "Hide the incident from all stakeholders",
      "Delete the incident timeline",
      "Avoid documenting corrective actions"
    ],
    answer: 0
  },
  {
    id: "observability-91",
    question: "Production CPU usage suddenly reaches 95%. What should you do first?",
    options: [
      "Immediately delete all application logs",
      "Inspect CPU metrics, processes, traffic, recent changes, and service impact",
      "Reinstall the operating system without investigation",
      "Disable every monitoring alert"
    ],
    answer: 1
  },
  {
    id: "observability-92",
    question: "An application returns HTTP 500 errors. Which data is most useful to investigate?",
    options: [
      "Correlated application logs, error metrics, traces, and recent deployments",
      "Only the dashboard background color",
      "Only Git branch names",
      "Only the server hostname"
    ],
    answer: 0
  },
  {
    id: "observability-93",
    question: "Prometheus reports a target as down. What should you check?",
    options: [
      "Network reachability, target health, endpoint path, port, and scrape configuration",
      "Only the Grafana dashboard title",
      "Only the application's CSS",
      "Only the number of Git tags"
    ],
    answer: 0
  },
  {
    id: "observability-94",
    question: "Grafana shows old metrics but no recent data. What is a useful next step?",
    options: [
      "Check scrape failures, target availability, timestamps, and ingestion health",
      "Delete every historical metric immediately",
      "Change all passwords without investigation",
      "Disable the Prometheus data source"
    ],
    answer: 0
  },
  {
    id: "observability-95",
    question: "A Kubernetes pod repeatedly restarts. Which evidence should you inspect?",
    options: [
      "Pod events, previous container logs, termination reason, and resource usage",
      "Only the GitHub repository description",
      "Only the Grafana logo",
      "Only the Docker image's display name"
    ],
    answer: 0
  },
  {
    id: "observability-96",
    question: "A microservice request has high latency. How can tracing help?",
    options: [
      "Identify slow spans and dependencies along the request path",
      "Automatically rewrite the entire application",
      "Replace all metrics with logs",
      "Guarantee that the network cannot fail"
    ],
    answer: 0
  },
  {
    id: "observability-97",
    question: "Centralized logging has stopped receiving logs from one server. What should you investigate?",
    options: [
      "The log agent, forwarding errors, connectivity, credentials, and destination health",
      "Only the server wallpaper",
      "Only the Git default branch",
      "Only the application's font size"
    ],
    answer: 0
  },
  {
    id: "observability-98",
    question: "Why should monitoring systems themselves be monitored?",
    options: [
      "To detect failures in telemetry collection, alert delivery, and monitoring infrastructure",
      "To make dashboards more colorful",
      "To avoid storing any metrics",
      "To prevent all application deployments"
    ],
    answer: 0
  },
  {
    id: "observability-99",
    question: "What is a good way to reduce observability storage costs?",
    options: [
      "Use appropriate retention, control metric cardinality, and apply suitable sampling",
      "Keep every signal forever without limits",
      "Remove all critical production alerts",
      "Disable error logging across all services"
    ],
    answer: 0
  },
  {
    id: "observability-100",
    question: "What is the best observability approach for a production microservices application?",
    options: [
      "Use only CPU monitoring",
      "Use correlated metrics, structured logs, distributed traces, meaningful alerts, and SLOs",
      "Collect logs without timestamps or context",
      "Depend only on users to report incidents"
    ],
    answer: 1
  }
];
