export const jenkinsQuestions = [
  {
    question: 'What file defines a Jenkins Pipeline configuration?',
    options: ['Dockerfile', 'Jenkinsfile', 'pipeline.yaml', 'build.xml'],
    answer: 1
  },
  {
    question: 'What is the primary concept for running tasks in Jenkins?',
    options: ['Jobs / Pipelines', 'Pods', 'Playbooks', 'Recipes'],
    answer: 0
  },
  {
    question: 'Which pipeline syntax block defines the executable stages of a CI/CD build?',
    options: ['stages {}', 'steps {}', 'jobs {}', 'tasks {}'],
    answer: 0
  },
  {
    question: 'Where are credentials securely stored and accessed within Jenkins?',
    options: ['Credentials Store', 'Environment Variables', 'ConfigMap', 'Secret Manager'],
    answer: 0
  },
  {
    question: 'What type of pipeline syntax was introduced to write robust and scalable scripts?',
    options: ['Declarative Pipeline', 'Scripted Pipeline', 'Graphical Pipeline', 'Static Pipeline'],
    answer: 0
  },
  {
    question: 'Which plugin is essential for integrating Git repositories with Jenkins webhooks?',
    options: ['Git Plugin', 'GitHub Integration Plugin', 'Webhook Plugin', 'SCM Plugin'],
    answer: 1
  },
  {
    question: 'How do you distribute build workloads across multiple machines in Jenkins?',
    options: ['Jenkins Agents / Slaves', 'Workers', 'Nodes Cluster', 'Pods'],
    answer: 0
  },
  {
    question: 'What keyword defines shell commands inside a Jenkinsfile stage step?',
    options: ['sh', 'cmd', 'run', 'exec'],
    answer: 0
  },
  {
    question: 'Which tool creates automated CI/CD builds triggered by code commits?',
    options: ['Jenkins', 'Terraform', 'Ansible', 'Nagios'],
    answer: 0
  },
  {
    question: 'How do you backup Jenkins configurations and job histories?',
    options: ['ThinBackup Plugin', 'Git Backup', 'Manual Copy', 'S3 Sync'],
    answer: 0
  },
  {
    question: 'Which block in a Declarative pipeline defines global environment variables or timeouts?',
    options: ['options {}', 'environment {}', 'parameters {}', 'settings {}'],
    answer: 0
  },
  {
    question: 'What command-line tool or interface allows interacting with Jenkins programmatically?',
    options: ['Jenkins CLI / REST API', 'jcli', 'kubectl', 'jenkins-adm'],
    answer: 0
  },
  {
    question: 'Which build trigger polls the SCM repository at regular intervals for changes?',
    options: ['Poll SCM', 'GitHub Hook Trigger', 'Build Periodically', 'Webhook Trigger'],
    answer: 0
  },
  {
    question: 'What block allows executing post-build actions like success or failure notifications?',
    options: ['post {}', 'finally {}', 'notify {}', 'cleanup {}'],
    answer: 0
  },
  {
    question: 'Which workspace directory stores job execution checkouts and build files by default?',
    options: ['workspace/', 'jobs/', 'builds/', 'target/'],
    answer: 0
  },
  {
    question: 'What is a Shared Library used for in Jenkins?',
    options: ['Reusing pipeline code across multiple projects', 'Storing database credentials', 'Managing plugin updates', 'Hosting container images'],
    answer: 0
  },
  {
    question: 'Which agent parameter restricts a pipeline to run on a specific node label?',
    options: ['agent { label \'node-name\' }', 'node: \'node-name\'', 'target: \'node-name\'', 'run-on: \'node-name\''],
    answer: 0
  },
  {
    question: 'What plugin allows visualizing test results graphically inside Jenkins builds?',
    options: ['JUnit Plugin', 'TestResults Plugin', 'ReportNG Plugin', 'Grafana Plugin'],
    answer: 0
  },
  {
    question
