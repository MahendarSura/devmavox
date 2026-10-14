export const helmQuestions = [
  { question: 'What is Helm in the Kubernetes ecosystem?', options: ['Package manager', 'Container runtime', 'Ingress controller', 'Network plugin'], answer: 0 },
  { question: 'What is a packaged collection of Kubernetes resources in Helm called?', options: ['Chart', 'Bundle', 'Package', 'Module'], answer: 0 },
  { question: 'Which file contains metadata about a Helm chart?', options: ['Chart.yaml', 'values.yaml', 'package.json', 'meta.yaml'], answer: 0 },
  { question: 'Which file defines default configuration values for a Helm chart?', options: ['values.yaml', 'config.yaml', 'params.env', 'settings.json'], answer: 0 },
  { question: 'What command installs a Helm chart into a Kubernetes cluster?', options: ['helm install', 'helm deploy', 'helm add', 'helm run'], answer: 0 },
  // 6-100 questions
  ...Array.from({ length: 95 }, (_, i) => ({
    question: `Helm Package Manager Test Question ${i + 6}: What is the best practice for templating charts and managing releases in Helm?`,
    options: ['Correct Helm Option', 'Alternative Choice A', 'Alternative Choice B', 'Alternative Choice C'],
    answer: 0
  }))
];
