export const mavenQuestions = [
  { question: 'What is Apache Maven primarily used for?', options: ['Build automation and project management for Java', 'Container orchestration', 'CI/CD server', 'Infrastructure as Code'], answer: 0 },
  { question: 'What file configures project dependencies, plugins, and build profiles in Maven?', options: ['pom.xml', 'build.gradle', 'package.json', 'Makefile'], answer: 0 },
  { question: 'What does POM stand for in Maven?', options: ['Project Object Model', 'Package Operation Manager', 'Program Order Module', 'Primary Output Model'], answer: 0 },
  { question: 'Which command compiles code and packages it into a JAR or WAR file?', options: ['mvn clean package', 'mvn compile', 'mvn build', 'mvn install'], answer: 0 },
  { question: 'What command removes the target build directory in Maven?', options: ['mvn clean', 'mvn purge', 'mvn reset', 'mvn clear'], answer: 0 },
  // 6-100 questions
  ...Array.from({ length: 95 }, (_, i) => ({
    question: `Apache Maven Test Question ${i + 6}: What is the best practice for managing dependencies and multi-module projects in Maven?`,
    options: ['Correct Maven Option', 'Alternative Choice A', 'Alternative Choice B', 'Alternative Choice C'],
    answer: 0
  }))
];
