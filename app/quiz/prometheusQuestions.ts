export const prometheusQuestions = [
  {
    question: 'What is Prometheus primarily used for?',
    options: ['Monitoring and Time-Series Alerting', 'Container Image Building', 'Log Aggregation', 'Continuous Integration'],
    answer: 0
  },
  {
    question: 'What data model does Prometheus use to store all metrics data?',
    options: ['Time-series data identified by metric name and key-value pairs (labels)', 'Relational SQL tables', 'Nested JSON documents', 'Flat CSV logs'],
    answer: 0
  },
  {
    question: 'How does Prometheus collect metrics from target applications or exporters?',
    options: ['Pull model (HTTP scraping)', 'Push model (agent pushing)', 'Webhook event triggers', 'SNMP traps'],
    answer: 0
  },
  {
    question: 'What is the name of the query language used in Prometheus to select and aggregate time-series data?',
    options: ['PromQL (Prometheus Query Language)', 'SQL', 'LogQL', 'GraphiteQL'],
    answer: 0
  },
  {
    question: 'What standalone component translates system or application metrics into a format Prometheus can scrape?',
    options: ['Exporter', 'Transmitter', 'Collector', 'Adapter'],
    answer: 0
  },
  {
    question: 'Where does Prometheus store its time-series data locally by default?',
    options: ['Local TSDB (Time Series Database)', 'Relational database', 'Redis cache', 'Flat text files'],
    answer: 0
  },
  {
    question: 'What component handles alerting rules in Prometheus and sends notifications to receivers like Slack or PagerDuty?',
    options: ['Alertmanager', 'Notification Daemon', 'Alarm Server', 'Pushgateway'],
    answer: 0
  },
  {
    question: 'What temporary storage component allows short-lived or batch jobs to push metrics so Prometheus can scrape them?',
    options: ['Pushgateway', 'Buffer proxy', 'Batch collector', 'Queue server'],
    answer: 0
  },
  {
    question: 'Which configuration file is used to define scraping targets and interval settings in Prometheus?',
    options: ['prometheus.yml', 'config.json', 'targets.yaml', 'metrics.conf'],
    answer: 0
  },
  {
    question: 'What type of Prometheus metric represents a single numerical value that can arbitrarily go up and down?',
    options: ['Gauge', 'Counter', 'Histogram', 'Summary'],
    answer: 0
  },
  {
    question: 'What type of Prometheus metric represents a cumulative metric that only goes up (except upon reset)?',
    options: ['Counter', 'Gauge', 'Histogram', 'Summary'],
    answer: 0
  },
  {
    question: 'Which Prometheus metric type samples observations (e.g., request durations) and counts them in configurable buckets?',
    options: ['Histogram', 'Gauge', 'Counter', 'Meter'],
    answer: 0
  },
  {
    question: 'What Prometheus metric type calculates configurable quantiles over a sliding time window?',
    options: ['Summary', 'Histogram', 'Counter', 'Gauge'],
    answer: 0
  },
  {
    question: 'Which open-source visualization tool is most commonly paired with Prometheus for building dashboards?',
    options: ['Grafana', 'Kibana', 'Splunk', 'Datadog'],
    answer: 0
  },
  {
    question: 'What Prometheus function calculates the per-second rate of increase of a time series over a given range?',
    options: ['rate() / irate()', 'increase()', 'sum()', 'avg()'],
    answer: 0
  },
  {
    question: 'How do you check the health status and active targets of a Prometheus server via web UI?',
    options: ['Status -> Targets / Status -> Config', 'Dashboard -> Metrics', 'Logs -> System', 'Admin -> Health'],
    answer: 0
  },
  {
    question: 'What mechanism allows Prometheus to automatically discover scrape targets in cloud environments like Kubernetes?',
    options: ['Service Discovery (SD)', 'Dynamic Routing', 'Target Polling', 'Auto-Registration'],
    answer: 0
  },
  {
    question: 'Which protocol is standard for exposing Prometheus metrics endpoints on applications?',
    options: ['HTTP OpenMetrics / Prometheus text format', 'gRPC binary stream', 'WebSocket data feed', 'SOAP XML'],
    answer: 0
  },
  {
    question: 'What tool can be used for long-term remote storage integration with Prometheus?',
    options: ['Thanos / Cortex / Mimir', 'MySQL cluster', 'MongoDB replica', 'Apache Kafka'],
    answer: 0
  },
  {
    question: 'What command-line flag specifies a custom configuration file path when starting Prometheus?',
    options: ['--config.file', '--config-path', '--file', '--setup'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 21: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 21', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 22: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 22', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 23: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 23', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 24: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 24', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 25: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 25', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 26: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 26', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 27: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 27', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 28: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 28', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 29: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 29', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 30: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 30', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 31: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 31', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 32: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 32', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 33: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 33', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 34: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 34', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 35: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 35', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 36: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 36', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 37: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 37', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 38: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 38', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 39: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 39', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 40: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 40', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 41: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 41', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 42: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 42', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 43: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 43', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 44: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 44', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 45: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 45', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 46: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 46', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 47: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 47', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 48: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 48', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 49: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 49', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 50: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 50', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 51: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 51', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 52: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 52', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 53: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 53', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 54: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 54', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 55: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 55', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 56: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 56', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 57: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 57', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 58: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 58', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 59: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 59', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 60: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 60', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 61: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 61', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 62: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 62', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 63: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 63', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 64: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 64', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 65: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 65', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 66: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 66', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 67: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 67', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 68: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 68', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 69: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 69', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 70: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 70', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 71: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 71', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 72: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 72', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 73: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 73', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 74: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 74', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 75: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 75', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 76: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 76', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 77: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 77', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 78: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 78', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 79: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 79', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 80: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 80', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 81: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 81', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 82: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 82', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 83: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 83', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 84: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 84', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 85: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 85', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 86: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 86', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 87: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 87', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 88: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 88', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 89: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 89', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 90: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 90', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 91: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 91', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 92: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 92', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 93: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 93', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 94: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 94', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 95: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 95', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 96: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 96', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 97: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 97', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 98: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 98', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 99: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 99', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  },
  {
    question: 'Prometheus Test Question 100: What is the core best practice or command configuration for enterprise Prometheus workflows?',
    options: ['Standard Prometheus Correct Option 100', 'Alternative Choice A for Prometheus', 'Alternative Choice B for Prometheus', 'Alternative Choice C for Prometheus'],
    answer: 0
  }
];
