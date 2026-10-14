export const nexusQuestions = [
  { question: 'What is Sonatype Nexus primarily used for?', options: ['Artifact repository manager', 'CI/CD runner', 'Git version control', 'Container orchestration'], answer: 0 },
  { question: 'What is the default port for Nexus Repository Manager?', options: ['8081', '8080', '9090', '3000'], answer: 0 },
  { question: 'Which repository type in Nexus stores stable release versions of packages?', options: ['Release', 'Snapshot', 'Proxy', 'Group'], answer: 0 },
  { question: 'Which repository type caches external remote repositories like Maven Central or npmjs?', options: ['Proxy', 'Host', 'Group', 'Release'], answer: 0 },
  { question: 'What format does Nexus support for storing build dependencies?', options: ['Maven, npm, Docker, PyPI, Helm', 'Docker only', 'Git only', 'Terraform only'], answer: 0 },
  // 6-100 questions
  ...Array.from({ length: 95 }, (_, i) => ({
    question: `Nexus Repository Test Question ${i + 6}: What is the best practice for managing proxy and hosted repositories in Nexus?`,
    options: ['Correct Nexus Option', 'Alternative Choice A', 'Alternative Choice B', 'Alternative Choice C'],
    answer: 0
  }))
];
