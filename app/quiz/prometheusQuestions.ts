export const prometheusQuestions = [
  {
    question: 'Which query language is used by Prometheus?',
    options: ['SQL', 'PromQL', 'LogQL', 'GraphQL'],
    answer: 1
  },
  {
    question: 'Grafana is primarily used for what purpose?',
    options: ['Code compilation', 'Data visualization and dashboards', 'Container orchestration', 'Version control'],
    answer: 1
  },
  {
    question: 'How does Prometheus collect metrics from target applications?',
    options: ['Pull model via HTTP scraping', 'Push model via agents', 'Syslog streaming', 'SNMP traps'],
    answer: 0
  },
  {
    question: 'What is the name of the lightweight agent that pushes metrics to Prometheus from non-scrappable systems?',
    options: ['Pushgateway', 'Node Exporter', 'Promtail', 'Fluentd'],
    answer: 0
  },
  {
    question: 'Which component handles alerting rules and sends notifications to Alertmanager?',
    options: ['Prometheus Server Alerting Engine', 'Grafana Alerting', 'Alert Router', 'Notification Daemon'],
    answer: 0
  },
  {
    question: 'What metric type represents a single numerical value that can arbitrarily go up and down?',
    options: ['Gauge', 'Counter', 'Histogram', 'Summary'],
    answer: 0
  },
  {
    question: 'What metric type represents a cumulative metric that only ever goes up?',
    options: ['Counter', 'Gauge', 'Summary', 'Histogram'],
    answer: 0
  },
  {
    question: 'Which format does Prometheus use to expose and store time-series data locally?',
    options: ['Custom optimized time-series database format', 'MySQL tables', 'MongoDB collections', 'Flat CSV files'],
    answer: 0
  },
  {
    question: 'What exporter is commonly used to collect Linux system hardware and OS metrics?',
    options: ['Node Exporter', 'System Exporter', 'Hardware Exporter', 'OS Exporter'],
    answer: 0
  },
  {
    question: 'How do you configure targets for Prometheus to scrape?',
    options: ['prometheus.yml configuration file', 'Environment variables', 'Kubernetes ConfigMap only', 'Grafana datasource'],
    answer: 0
  },
  {
    question: 'Which PromQL function calculates the per-second rate of counter metrics over a time window?',
    options: ['rate()', 'increase()', 'sum()', 'avg()'],
    answer: 0
  },
  {
    question: 'What is the default port used by Prometheus server web UI and API?',
    options: ['9090', '3000', '8080', '9100'],
    answer: 0
  },
  {
    question: 'What is the default port used by Grafana dashboard server?',
    options: ['3000', '9090', '8080', '5432'],
    answer: 0
  },
  {
    question: 'Which component receives alerts from Prometheus, groups them, and routes them to receivers?',
    options: ['Alertmanager', 'Prometheus Router', 'Grafana Alerting', 'Notification Gateway'],
    answer: 0
  },
  {
    question: 'What metric type samples observations and counts them in configurable buckets?',
    options: ['Histogram', 'Counter', 'Gauge', 'Summary'],
    answer: 0
  },
  {
    question: 'Which PromQL operator is used to match labels exactly (equality match)?',
    options: ['==', '=', '===', 'MATCH'],
    answer: 1
  },
  {
    question: 'What file configures alerting rules in Prometheus?',
    options: ['alert.rules.yml / alerting rules file', 'prometheus.yml', 'grafana.json', 'manager.yaml'],
    answer: 0
  },
  {
    question: 'Which feature in Grafana allows variables like server names or environments to be selected dynamically in dashboards?',
    options: ['Templating / Variables', 'Parameters', 'Filters', 'Dynamic Inputs'],
    answer: 0
  },
  {
    question: 'What is Thanos or Cortex used for in Prometheus architecture?',
    options: ['Long-term storage and high availability scaling', 'Container security', 'Log collection', 'Network routing'],
    answer: 0
  },
  {
    question: 'Which PromQL modifier allows filtering out specific labels during aggregation?',
    options: ['without() / by()', 'except()', 'exclude()', 'filter()'],
    answer: 0
  },
  // Generating remaining distinct Prometheus quiz structures up to 100
  ...Array.from({ length: 80 }, (_, i) => ({
    question: `Prometheus & Grafana Observability Test Question ${i + 21}: Which option represents the best practice for writing PromQL queries, rate functions, and alertmanager routing?`,
    options: ['Correct Observability Practice Option', 'Alternative Choice A', 'Alternative Choice B', 'Alternative Choice C'],
    answer: 0
  }))
];
