export interface GrafanaQuestion {
  question: string;
  options: string[];
  answer: number;
}

export const grafanaQuestions: GrafanaQuestion[] = [
  {
    question: "1. What is Grafana?",
    options: [
      "A container runtime",
      "A visualization and observability platform",
      "A programming language",
      "A source control system"
    ],
    answer: 1
  },
  {
    question: "2. What is the primary purpose of Grafana in DevOps?",
    options: [
      "To compile application code",
      "To create virtual machines",
      "To visualize metrics, logs, traces, and other data",
      "To replace Kubernetes"
    ],
    answer: 2
  },
  {
    question: "3. Which tool is commonly integrated with Grafana for metrics monitoring?",
    options: [
      "Prometheus",
      "Git",
      "Terraform",
      "Dockerfile"
    ],
    answer: 0
  },
  {
    question: "4. What is a Grafana dashboard?",
    options: [
      "A Linux package manager",
      "A database backup",
      "A CI/CD pipeline",
      "A collection of panels displaying data"
    ],
    answer: 3
  },
  {
    question: "5. What is a panel in Grafana?",
    options: [
      "A Kubernetes namespace",
      "A visualization of data from one or more queries",
      "A Git branch",
      "A Docker container"
    ],
    answer: 1
  },
  {
    question: "6. What is a Grafana data source?",
    options: [
      "A dashboard theme",
      "A user account",
      "A system Grafana queries to retrieve data",
      "A notification message"
    ],
    answer: 2
  },
  {
    question: "7. Which data source is commonly used to monitor Kubernetes metrics with Grafana?",
    options: [
      "Prometheus",
      "Microsoft Word",
      "GitHub Pages",
      "Notepad"
    ],
    answer: 0
  },
  {
    question: "8. Which query language is commonly used to query Prometheus from Grafana?",
    options: [
      "SQL only",
      "HTML",
      "YAML",
      "PromQL"
    ],
    answer: 3
  },
  {
    question: "9. What does Prometheus primarily collect and store?",
    options: [
      "Source code",
      "Time-series metrics",
      "Images",
      "PDF documents"
    ],
    answer: 1
  },
  {
    question: "10. What is the relationship between Grafana and Prometheus?",
    options: [
      "Grafana replaces Prometheus completely",
      "Prometheus is a Grafana dashboard",
      "Prometheus collects and stores metrics; Grafana queries and visualizes them",
      "Both are container image formats"
    ],
    answer: 2
  },
  {
    question: "11. What is a time-series metric?",
    options: [
      "A measurement recorded with timestamps",
      "A static image",
      "A source code comment",
      "A user password"
    ],
    answer: 0
  },
  {
    question: "12. Which Grafana visualization is suitable for showing metric changes over time?",
    options: [
      "Pie chart in every case",
      "Text panel only",
      "A file browser",
      "Time series panel"
    ],
    answer: 3
  },
  {
    question: "13. Which visualization is useful for comparing values across categories?",
    options: [
      "Login form",
      "Bar chart",
      "Source code editor",
      "Terminal"
    ],
    answer: 1
  },
  {
    question: "14. What is a Stat panel commonly used for?",
    options: [
      "Writing Prometheus exporters",
      "Creating Kubernetes clusters",
      "Displaying a single key value or summary statistic",
      "Managing Git commits"
    ],
    answer: 2
  },
  {
    question: "15. What does a Gauge panel commonly display?",
    options: [
      "A value in relation to a configured range",
      "A Git history",
      "A Dockerfile",
      "A database schema"
    ],
    answer: 0
  },
  {
    question: "16. What is a heatmap useful for?",
    options: [
      "Managing user permissions only",
      "Editing YAML files",
      "Creating Git branches",
      "Visualizing distributions and value patterns over time"
    ],
    answer: 3
  },
  {
    question: "17. What is a Grafana dashboard variable?",
    options: [
      "A permanent operating system variable",
      "A configurable value used to make dashboards dynamic",
      "A Prometheus server",
      "A container registry"
    ],
    answer: 1
  },
  {
    question: "18. Why are dashboard variables useful?",
    options: [
      "They automatically repair all servers",
      "They replace data sources",
      "They let users filter or switch values such as cluster, namespace, or instance",
      "They disable dashboard queries"
    ],
    answer: 2
  },
  {
    question: "19. What is a dashboard template variable commonly used for in Kubernetes monitoring?",
    options: [
      "Selecting a namespace or cluster",
      "Changing the Linux kernel",
      "Building a Docker image",
      "Creating Git commits"
    ],
    answer: 0
  },
  {
    question: "20. What is a dashboard time range selector used for?",
    options: [
      "Changing the server password",
      "Restarting Prometheus",
      "Installing Grafana plugins",
      "Selecting the time interval of data displayed"
    ],
    answer: 3
  },
  {
    question: "21. What does dashboard auto-refresh do?",
    options: [
      "Automatically upgrades Grafana",
      "Refreshes dashboard queries at a configured interval",
      "Deletes old metrics",
      "Restarts the host machine"
    ],
    answer: 1
  },
  {
    question: "22. What is an annotation in Grafana?",
    options: [
      "A database password",
      "A metric exporter",
      "An event marker shown on a dashboard, often at a particular time",
      "A Kubernetes deployment"
    ],
    answer: 2
  },
  {
    question: "23. How can annotations help during incident investigation?",
    options: [
      "They can mark deployments, incidents, or other events alongside metrics",
      "They automatically fix every outage",
      "They replace application logs",
      "They prevent all alerts"
    ],
    answer: 0
  },
  {
    question: "24. What is a Grafana alert rule?",
    options: [
      "A dashboard color setting",
      "A Linux shell alias",
      "A database backup policy",
      "A condition evaluated to detect a situation requiring attention"
    ],
    answer: 3
  },
  {
    question: "25. What is alert evaluation used for?",
    options: [
      "Installing data sources",
      "Checking an alert rule's conditions over time",
      "Creating repository branches",
      "Compiling dashboard images"
    ],
    answer: 1
  },
  {
    question: "26. What is a contact point in Grafana alerting?",
    options: [
      "A metric label",
      "A panel title",
      "A destination or integration for sending alert notifications",
      "A dashboard variable"
    ],
    answer: 2
  },
  {
    question: "27. Which is an example of a Grafana alert notification destination?",
    options: [
      "Email",
      "A Dockerfile instruction",
      "A Git commit hash",
      "A Kubernetes pod name alone"
    ],
    answer: 0
  },
  {
    question: "28. What is a notification policy used for?",
    options: [
      "Changing chart colors",
      "Installing Prometheus",
      "Creating dashboards automatically in every case",
      "Routing alert notifications based on matching labels and rules"
    ],
    answer: 3
  },
  {
    question: "29. What is alert grouping?",
    options: [
      "Combining all dashboard panels into one",
      "Combining related alerts into fewer notification messages",
      "Deleting duplicate metrics from Prometheus",
      "Creating multiple Grafana servers"
    ],
    answer: 1
  },
  {
    question: "30. What is alert silencing used for?",
    options: [
      "Deleting alert rules permanently",
      "Removing all historical metrics",
      "Temporarily suppressing notifications for matching alerts",
      "Disabling every dashboard"
    ],
    answer: 2
  },
  {
    question: "31. What is a mute timing in Grafana alerting?",
    options: [
      "A configured time interval when matching notifications are muted",
      "A metric collection frequency",
      "A data source URL",
      "A Linux process priority"
    ],
    answer: 0
  },
  {
    question: "32. What does a pending period in an alert rule help determine?",
    options: [
      "How long Grafana remains installed",
      "How long a dashboard is cached",
      "How many users can log in",
      "How long a condition must remain true before the alert fires"
    ],
    answer: 3
  },
  {
    question: "33. What is the purpose of a notification summary in an alert rule?",
    options: [
      "To replace the query",
      "To provide a short description of the alert for responders",
      "To store all metric samples",
      "To define the server's IP address"
    ],
    answer: 1
  },
  {
    question: "34. What is a Grafana alert label used for?",
    options: [
      "Setting the Linux hostname",
      "Changing a chart's font only",
      "Classifying alerts and supporting notification routing or grouping",
      "Storing application binaries"
    ],
    answer: 2
  },
  {
    question: "35. What does the PromQL expression up generally represent?",
    options: [
      "Whether a monitored target was successfully scraped",
      "The number of Grafana users",
      "The total size of a dashboard",
      "The number of Docker images"
    ],
    answer: 0
  },
  {
    question: "36. In Prometheus, what does up = 0 usually indicate?",
    options: [
      "The target is always healthy",
      "Grafana has no dashboards",
      "The target has no labels",
      "The scrape of that target failed"
    ],
    answer: 3
  },
  {
    question: "37. Which PromQL function is commonly used to calculate a per-second rate from a counter?",
    options: [
      "sum_over_time()",
      "rate()",
      "label_replace_only()",
      "count_values()"
    ],
    answer: 1
  },
  {
    question: "38. Which PromQL expression can show CPU usage as a rate of increase of a CPU counter?",
    options: [
      "cpu_usage = dashboard",
      "up{cpu=\"all\"}",
      "rate(node_cpu_seconds_total[5m])",
      "grafana_cpu_total()"
    ],
    answer: 2
  },
  {
    question: "39. What is the purpose of the sum() function in PromQL?",
    options: [
      "To aggregate values by addition",
      "To restart a target",
      "To delete a metric",
      "To create a Grafana user"
    ],
    answer: 0
  },
  {
    question: "40. What does the by(label) clause do in a PromQL aggregation?",
    options: [
      "Deletes every label from the database",
      "Changes the scrape interval",
      "Renames the metric automatically",
      "Groups aggregation results by the specified label or labels"
    ],
    answer: 3
  },
  {
    question: "41. What is the difference between a counter and a gauge?",
    options: [
      "A gauge can only increase",
      "A counter generally accumulates and resets; a gauge can increase or decrease",
      "A counter stores dashboard layouts",
      "A gauge is a notification policy"
    ],
    answer: 1
  },
  {
    question: "42. What is a histogram metric commonly used for?",
    options: [
      "Storing user passwords",
      "Counting dashboard panels only",
      "Observing distributions such as request durations or response sizes",
      "Tracking Git branches"
    ],
    answer: 2
  },
  {
    question: "43. What does the PromQL function histogram_quantile() help calculate?",
    options: [
      "An estimated quantile from histogram bucket data",
      "A Grafana user count",
      "The number of dashboards",
      "A Kubernetes node's hostname"
    ],
    answer: 0
  },
  {
    question: "44. What does a label in Prometheus identify?",
    options: [
      "A Grafana login password",
      "A Docker registry credential",
      "A workflow file",
      "A key-value dimension attached to a time series"
    ],
    answer: 3
  },
  {
    question: "45. What is a risk of using too many unique label combinations in Prometheus?",
    options: [
      "All queries become free",
      "High cardinality can increase storage use and query load",
      "Grafana automatically deletes the server",
      "The metric names become invalid in every case"
    ],
    answer: 1
  },
  {
    question: "46. What is a Grafana query editor used for?",
    options: [
      "Creating cloud accounts",
      "Restarting Kubernetes",
      "Writing and configuring queries against a data source",
      "Managing Linux users"
    ],
    answer: 2
  },
  {
    question: "47. What is the purpose of a query legend format?",
    options: [
      "To control the displayed series names in a visualization",
      "To change the Prometheus retention period",
      "To install a plugin",
      "To encrypt the data source"
    ],
    answer: 0
  },
  {
    question: "48. What does a query interval influence?",
    options: [
      "The number of Grafana administrators",
      "The repository's branch name",
      "The dashboard background color",
      "The time spacing or evaluation step used for query data, depending on the query configuration"
    ],
    answer: 3
  },
  {
    question: "49. What is the purpose of a query's time range?",
    options: [
      "To set a user's password expiry",
      "To specify the period of data to retrieve",
      "To configure a Docker network",
      "To change an alert contact point"
    ],
    answer: 1
  },
  {
    question: "50. What does the $__interval variable generally represent in Grafana?",
    options: [
      "The Grafana server's installation date",
      "The number of data sources",
      "A dynamically calculated query interval based on the dashboard time range and resolution",
      "The number of dashboard users"
    ],
    answer: 2
  },
  {
    question: "51. What is the purpose of the $__rate_interval variable in Grafana Prometheus queries?",
    options: [
      "To provide a dynamically calculated range suitable for rate calculations",
      "To define a Grafana password",
      "To set an alert notification email",
      "To choose a dashboard theme"
    ],
    answer: 0
  },
  {
    question: "52. What is a transformation in Grafana?",
    options: [
      "A method for installing Prometheus",
      "A way to create Kubernetes nodes",
      "A replacement for every data source query",
      "A post-query operation that modifies or combines returned data for visualization"
    ],
    answer: 3
  },
  {
    question: "53. When might you use an Organize fields transformation?",
    options: [
      "To change the server's IP address",
      "To rename, reorder, hide, or organize fields in query results",
      "To restart a data source",
      "To install Grafana plugins"
    ],
    answer: 1
  },
  {
    question: "54. What is a data link in Grafana?",
    options: [
      "A link that always deletes a dashboard",
      "A Prometheus scrape configuration",
      "A clickable link from a visualization to related information or another view",
      "A Linux symbolic link only"
    ],
    answer: 2
  },
  {
    question: "55. What is a drill-down dashboard useful for?",
    options: [
      "Navigating from a high-level overview to more detailed metrics",
      "Deleting historical metrics",
      "Changing Grafana's source code",
      "Disabling every alert"
    ],
    answer: 0
  },
  {
    question: "56. What is Grafana Explore primarily used for?",
    options: [
      "Creating operating system users",
      "Managing cloud billing",
      "Installing a Kubernetes cluster",
      "Ad hoc querying and investigating data sources"
    ],
    answer: 3
  },
  {
    question: "57. What is the purpose of Grafana dashboard folders?",
    options: [
      "To store Prometheus time series directly",
      "To organize dashboards and help manage access",
      "To run Linux shell commands",
      "To replace data sources"
    ],
    answer: 1
  },
  {
    question: "58. What is a Grafana organization?",
    options: [
      "A Prometheus metric",
      "A Kubernetes pod",
      "A logical boundary for managing users, dashboards, and resources in Grafana",
      "A type of alert query"
    ],
    answer: 2
  },
  {
    question: "59. What does a Viewer role generally allow?",
    options: [
      "Viewing permitted dashboards and data without editing them",
      "Managing all server configuration",
      "Deleting every organization",
      "Changing all user permissions"
    ],
    answer: 0
  },
  {
    question: "60. What is the principle of least privilege in Grafana access management?",
    options: [
      "Give all users administrator access",
      "Share one admin account with everyone",
      "Disable authentication",
      "Grant users only the access needed for their responsibilities"
    ],
    answer: 3
  },
  {
    question: "61. What is Single Sign-On (SSO)?",
    options: [
      "A Prometheus query",
      "An authentication approach allowing users to access supported applications through a common identity provider",
      "A dashboard visualization",
      "A Linux filesystem"
    ],
    answer: 1
  },
  {
    question: "62. What is LDAP commonly used for in Grafana deployments?",
    options: [
      "Collecting CPU metrics",
      "Building Docker images",
      "Integrating with a directory service for authentication and user or group lookup",
      "Creating PromQL functions"
    ],
    answer: 2
  },
  {
    question: "63. What is a Grafana service account commonly used for?",
    options: [
      "Programmatic access by automation or integrations using assigned permissions",
      "Replacing Prometheus storage",
      "Creating Linux kernel modules",
      "Running every dashboard without authentication"
    ],
    answer: 0
  },
  {
    question: "64. Why should a Grafana data source use secure credentials?",
    options: [
      "To make dashboard titles longer",
      "To increase metric cardinality",
      "To disable all queries",
      "To prevent unauthorized access to the underlying monitoring data"
    ],
    answer: 3
  },
  {
    question: "65. What is Grafana provisioning?",
    options: [
      "A process for manually drawing charts only",
      "Managing resources such as data sources and dashboards through configuration files or automation",
      "A PromQL aggregation",
      "A Docker container networking mode"
    ],
    answer: 1
  },
  {
    question: "66. What is a benefit of dashboard provisioning?",
    options: [
      "It guarantees that no dashboard can ever change",
      "It removes the need for data sources",
      "It enables repeatable dashboard deployment and version-controlled configuration",
      "It automatically fixes all metric errors"
    ],
    answer: 2
  },
  {
    question: "67. What is a common way to back up Grafana dashboards?",
    options: [
      "Export or provision dashboard definitions and keep them in version control",
      "Only take a screenshot of each panel",
      "Delete the Grafana database",
      "Store dashboard JSON inside application logs only"
    ],
    answer: 0
  },
  {
    question: "68. What is the purpose of Grafana plugins?",
    options: [
      "To remove all data sources",
      "To replace authentication",
      "To disable dashboard panels",
      "To extend Grafana with additional data sources, visualizations, or application features"
    ],
    answer: 3
  },
  {
    question: "69. Why should Grafana plugins be obtained from trusted sources and kept updated?",
    options: [
      "Plugins never execute code",
      "To reduce security and compatibility risks",
      "To make every dashboard public",
      "To eliminate the need for backups"
    ],
    answer: 1
  },
  {
    question: "70. What does Grafana's health endpoint commonly help check?",
    options: [
      "Whether every monitored application is healthy",
      "Whether all alert notifications were delivered",
      "The health of the Grafana service itself",
      "The total number of Git commits"
    ],
    answer: 2
  },
  {
    question: "71. Grafana shows 'No data'. What should you check first?",
    options: [
      "The query, time range, labels, data source, and whether data exists",
      "The dashboard's display name only",
      "The number of folders",
      "The color of the browser theme"
    ],
    answer: 0
  },
  {
    question: "72. Grafana cannot connect to Prometheus. What should you investigate?",
    options: [
      "Only the dashboard title",
      "The number of users in Grafana",
      "The chart's legend position",
      "The data source URL, network connectivity, service status, and access configuration"
    ],
    answer: 3
  },
  {
    question: "73. A Grafana panel query is very slow. What is a useful troubleshooting step?",
    options: [
      "Increase every dashboard refresh rate",
      "Inspect query complexity, time range, label cardinality, and data source performance",
      "Delete all dashboards",
      "Disable all monitoring"
    ],
    answer: 1
  },
  {
    question: "74. Why can a very short dashboard refresh interval cause problems?",
    options: [
      "It automatically corrupts all metrics",
      "It deletes Prometheus targets",
      "It can increase query load on Grafana and the data source",
      "It disables the time picker"
    ],
    answer: 2
  },
  {
    question: "75. What should you check when Grafana dashboards display incorrect timestamps?",
    options: [
      "Dashboard time settings, timezone configuration, and source timestamp behavior",
      "Only the dashboard title",
      "The number of dashboard folders",
      "The Git repository name"
    ],
    answer: 0
  },
  {
    question: "76. What is a common cause of an alert not firing as expected?",
    options: [
      "The dashboard has a logo",
      "The user selected a dark theme",
      "The repository has a README",
      "The query, threshold, evaluation interval, pending period, or rule condition is incorrect"
    ],
    answer: 3
  },
  {
    question: "77. An alert fires but no notification arrives. What should you check?",
    options: [
      "Only the visualization type",
      "Contact point configuration, notification policies, silences, mute timings, and delivery errors",
      "The number of dashboard rows",
      "The panel background color"
    ],
    answer: 1
  },
  {
    question: "78. What does an alert state of No Data generally indicate?",
    options: [
      "The application is definitely healthy",
      "The alert was permanently deleted",
      "The evaluation did not receive usable data for the query",
      "Every notification has been delivered"
    ],
    answer: 2
  },
  {
    question: "79. What is the purpose of a recording rule in Prometheus?",
    options: [
      "To precompute and store frequently used expressions as new time series",
      "To create Grafana users",
      "To send email notifications directly",
      "To generate dashboard images"
    ],
    answer: 0
  },
  {
    question: "80. How can recording rules help Grafana dashboards?",
    options: [
      "They eliminate all metric storage",
      "They replace every exporter",
      "They automatically fix bad labels",
      "They can reduce repeated query work for expensive calculations"
    ],
    answer: 3
  },
  {
    question: "81. What is the RED method commonly used to monitor?",
    options: [
      "Repository, Environment, Deployment",
      "Rate, Errors, Duration",
      "Read, Execute, Delete",
      "Resources, Events, Dashboards"
    ],
    answer: 1
  },
  {
    question: "82. What is the USE method commonly used to monitor?",
    options: [
      "Users, Services, Environments",
      "Updates, Security, Errors",
      "Utilization, Saturation, Errors",
      "Uptime, Storage, Events"
    ],
    answer: 2
  },
  {
    question: "83. Which metric is especially useful for understanding API latency?",
    options: [
      "Request duration distribution, including relevant percentiles",
      "Number of Grafana folders",
      "Git branch count",
      "Dashboard title length"
    ],
    answer: 0
  },
  {
    question: "84. What is a good practice when alerting on CPU usage?",
    options: [
      "Alert whenever CPU usage is greater than zero",
      "Never monitor CPU usage",
      "Use the same threshold for every system without context",
      "Choose meaningful thresholds and durations based on workload and impact"
    ],
    answer: 3
  },
  {
    question: "85. Which metric is useful for monitoring available memory on Linux servers?",
    options: [
      "grafana_dashboard_count",
      "node_memory_MemAvailable_bytes",
      "git_commits_total",
      "docker_image_title"
    ],
    answer: 1
  },
  {
    question: "86. Which exporter is commonly used to expose Linux host metrics to Prometheus?",
    options: [
      "Blackbox Exporter only",
      "Grafana Agent UI",
      "Node Exporter",
      "Git Exporter"
    ],
    answer: 2
  },
  {
    question: "87. Which tool is commonly used to collect Kubernetes cluster state metrics?",
    options: [
      "kube-state-metrics",
      "GitHub Actions",
      "Terraform state viewer",
      "Docker Hub"
    ],
    answer: 0
  },
  {
    question: "88. What is the purpose of Kubernetes resource metrics dashboards in Grafana?",
    options: [
      "To replace Kubernetes scheduling",
      "To create cluster nodes",
      "To store container images",
      "To visualize information such as pod restarts, CPU usage, memory, and resource requests"
    ],
    answer: 3
  },
  {
    question: "89. What is Loki commonly used for in the Grafana ecosystem?",
    options: [
      "Managing source code branches",
      "Log aggregation and querying",
      "Building container images",
      "Replacing Kubernetes networking"
    ],
    answer: 1
  },
  {
    question: "90. Which query language is commonly used to query Loki logs?",
    options: [
      "PromQL",
      "SQL only",
      "LogQL",
      "Dockerfile"
    ],
    answer: 2
  },
  {
    question: "91. What is Grafana Tempo used for?",
    options: [
      "Distributed tracing storage and querying",
      "Managing Git branches",
      "Creating Linux users",
      "Building container images"
    ],
    answer: 0
  },
  {
    question: "92. What is distributed tracing useful for?",
    options: [
      "Changing dashboard themes",
      "Creating repository secrets",
      "Monitoring only disk capacity",
      "Following a request across services to investigate latency and failures"
    ],
    answer: 3
  },
  {
    question: "93. What is exemplars support useful for in monitoring?",
    options: [
      "Replacing every Prometheus metric",
      "Connecting metric observations to related traces when supported",
      "Creating Grafana organizations",
      "Deleting alert rules"
    ],
    answer: 1
  },
  {
    question: "94. What is a service-level objective (SLO)?",
    options: [
      "A Grafana plugin",
      "A Kubernetes node label",
      "A target level of service reliability measured by a defined indicator over a time window",
      "A type of dashboard folder"
    ],
    answer: 2
  },
  {
    question: "95. What is an error budget?",
    options: [
      "The acceptable amount of unreliability under an SLO over a defined period",
      "The money spent on Grafana licenses only",
      "A Prometheus label",
      "The number of dashboards in a folder"
    ],
    answer: 0
  },
  {
    question: "96. What is the purpose of dashboard permissions in a production environment?",
    options: [
      "To increase metric cardinality",
      "To disable authentication",
      "To make all dashboards publicly editable",
      "To control who can view or modify monitoring dashboards"
    ],
    answer: 3
  },
  {
    question: "97. Why should production dashboards avoid embedding credentials in queries or links?",
    options: [
      "It makes charts too colorful",
      "Credentials could be exposed through dashboard access, browser history, or logs",
      "It prevents Prometheus from collecting CPU metrics",
      "It disables all Grafana panels"
    ],
    answer: 1
  },
  {
    question: "98. What is an important practice when upgrading Grafana in production?",
    options: [
      "Upgrade without checking compatibility",
      "Delete all dashboards first",
      "Review release notes, back up configuration, and test the upgrade where practical",
      "Disable monitoring permanently"
    ],
    answer: 2
  },
  {
    question: "99. What should a production monitoring dashboard provide?",
    options: [
      "Clear service health, key metrics, useful time ranges, and actionable signals",
      "Only decorative charts",
      "Unfiltered metrics with no labels",
      "Every available metric regardless of relevance"
    ],
    answer: 0
  },
  {
    question: "100. Which is a strong Grafana production monitoring practice?",
    options: [
      "Create alerts for every metric without thresholds",
      "Give all users administrator access",
      "Ignore missing data and failed queries",
      "Build actionable dashboards, configure meaningful alerts, secure access, and regularly validate monitoring"
    ],
    answer: 3
  }
];
