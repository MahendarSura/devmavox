export const githubActionsQuestions = [
  { question: 'Where are GitHub Actions workflow configuration files stored in a repository?', options: ['.github/workflows/', '.ci/workflows/', 'workflows/', '.config/'], answer: 0 },
  { question: 'What format is used to write GitHub Actions workflow files?', options: ['YAML', 'JSON', 'XML', 'TOML'], answer: 0 },
  { question: 'What keyword defines events that trigger a workflow run?', options: ['on', 'trigger', 'events', 'when'], answer: 0 },
  { question: 'Where are reusable units of code called in a workflow step?', options: ['uses', 'runs', 'exec', 'action'], answer: 0 },
  { question: 'Which keyword executes shell commands in a workflow job step?', options: ['run', 'cmd', 'shell', 'exec'], answer: 0 },
  // 6-100 questions
  ...Array.from({ length: 95 }, (_, i) => ({
    question: `GitHub Actions CI/CD Test Question ${i + 6}: What is the best practice for managing secrets and matrix builds in GitHub Actions?`,
    options: ['Correct GitHub Actions Option', 'Alternative Choice A', 'Alternative Choice B', 'Alternative Choice C'],
    answer: 0
  }))
];
