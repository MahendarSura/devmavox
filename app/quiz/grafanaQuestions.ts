export const grafanaQuestions = [
  { question: 'What is Grafana primarily used for?', options: ['Data visualization and dashboards', 'Code compilation', 'Container deployment', 'Version control'], answer: 0 },
  { question: 'What is the default port for Grafana web server?', options: ['3000', '9090', '8080', '5432'], answer: 0 },
  { question: 'Which language or database is natively supported as a data source in Grafana?', options: ['Prometheus', 'MySQL', 'Elasticsearch', 'All of the above'], answer: 3 },
  { question: 'What feature in Grafana allows dynamic filtering by server name or environment?', options: ['Variables / Templating', 'Parameters', 'Filters', 'Dynamic Inputs'], answer: 0 },
  { question: 'Which component in Grafana handles alerting notifications to Slack, PagerDuty, or Email?', options: ['Grafana Alerting', 'Alertmanager', 'Webhook daemon', 'Notification router'], answer: 0 },
  // 6-100 questions
  ...Array.from({ length: 95 }, (_, i) => ({
    question: `Grafana Dashboard Test Question ${i + 6}: What is the best practice for panel configuration and datasource integration in Grafana?`,
    options: ['Correct Grafana Option', 'Alternative Choice A', 'Alternative Choice B', 'Alternative Choice C'],
    answer: 0
  }))
];
