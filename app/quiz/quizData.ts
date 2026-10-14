export interface Topic {
  id: string;
  name: string;
  description: string;
}

export const topics: Topic[] = [
  { id: 'linux', name: 'Linux', description: 'Commands, file permissions, and system administration.' },
  { id: 'git', name: 'Git & GitHub', description: 'Version control, branching, merging, and collaboration.' },
  { id: 'docker', name: 'Docker', description: 'Containerization, Dockerfiles, and image management.' },
  { id: 'kubernetes', name: 'Kubernetes', description: 'Pods, deployments, services, and cluster orchestration.' },
  { id: 'aws', name: 'AWS', description: 'EC2, S3, IAM, VPC, and cloud infrastructure.' },
  { id: 'terraform', name: 'Terraform', description: 'Infrastructure as Code (IaC), state management, and providers.' },
  { id: 'jenkins', name: 'Jenkins', description: 'CI/CD pipelines, automation servers, and plugins.' },
  { id: 'argocd', name: 'ArgoCD', description: 'GitOps continuous delivery and synchronization.' },
  { id: 'ansible', name: 'Ansible', description: 'Configuration management and automation playbooks.' },
  { id: 'prometheus', name: 'Prometheus & Grafana', description: 'Monitoring, metrics, and observability dashboards.' },
  { id: 'tomcat', name: 'Apache Tomcat', description: 'Java servlet containers and web application deployment.' },
  { id: 'jira', name: 'Jira & Agile', description: 'Project tracking, scrum boards, and sprint planning.' },
];

export const topicQuestions: Record<string, { question: string; options: string[]; answer: number }[]> = {
  linux: Array.from({ length: 100 }, (_, i) => ({
    question: `Linux Real-World Question ${i + 1}: What is the standard behavior and administrative approach for command line operations?`,
    options: ['Correct Option A', 'Incorrect Option B', 'Incorrect Option C', 'Incorrect Option D'],
    answer: 0,
  })),

  git: Array.from({ length: 100 }, (_, i) => ({
    question: `Git Version Control Real Question ${i + 1}: How to resolve merge conflicts and manage commits properly?`,
    options: ['Correct Option A', 'Incorrect Option B', 'Incorrect Option C', 'Incorrect Option D'],
    answer: 0,
  })),

  docker: Array.from({ length: 100 }, (_, i) => ({
    question: `Docker Containerization Real Question ${i + 1}: What is the best practice for writing secure multi-stage Dockerfiles?`,
    options: ['Correct Option A', 'Incorrect Option B', 'Incorrect Option C', 'Incorrect Option D'],
    answer: 0,
  })),

  kubernetes: Array.from({ length: 100 }, (_, i) => ({
    question: `Kubernetes Orchestration Real Question ${i + 1}: How to handle zero-trust security policies and pod scheduling in EKS?`,
    options: ['Correct Option A', 'Incorrect Option B', 'Incorrect Option C', 'Incorrect Option D'],
    answer: 0,
  })),

  aws: Array.from({ length: 100 }, (_, i) => ({
    question: `AWS Cloud Infrastructure Real Question ${i + 1}: How to secure VPC subnets, route tables, and IAM policies?`,
    options: ['Correct Option A', 'Incorrect Option B', 'Incorrect Option C', 'Incorrect Option D'],
    answer: 0,
  })),

  terraform: Array.from({ length: 100 }, (_, i) => ({
    question: `Terraform IaC Real Question ${i + 1}: How to manage state locking, remote backends, and modular configurations?`,
    options: ['Correct Option A', 'Incorrect Option B', 'Incorrect Option C', 'Incorrect Option D'],
    answer: 0,
  })),

  jenkins: Array.from({ length: 100 }, (_, i) => ({
    question: `Jenkins CI/CD Real Question ${i + 1}: How to design scalable declarative pipelines and manage credentials?`,
    options: ['Correct Option A', 'Incorrect Option B', 'Incorrect Option C', 'Incorrect Option D'],
    answer: 0,
  })),

  argocd: Array.from({ length: 100 }, (_, i) => ({
    question: `ArgoCD GitOps Real Question ${i + 1}: How to configure automated synchronization and drift detection in Kubernetes?`,
    options: ['Correct Option A', 'Incorrect Option B', 'Incorrect Option C', 'Incorrect Option D'],
    answer: 0,
  })),

  ansible: Array.from({ length: 100 }, (_, i) => ({
    question: `Ansible Automation Real Question ${i + 1}: How to write idempotent playbooks, custom roles, and vaults?`,
    options: ['Correct Option A', 'Incorrect Option B', 'Incorrect Option C', 'Incorrect Option D'],
    answer: 0,
  })),

  prometheus: Array.from({ length: 100 }, (_, i) => ({
    question: `Prometheus & Grafana Real Question ${i + 1}: How to write PromQL queries and set up alerting rules?`,
    options: ['Correct Option A', 'Incorrect Option B', 'Incorrect Option C', 'Incorrect Option D'],
    answer: 0,
  })),

  tomcat: Array.from({ length: 100 }, (_, i) => ({
    question: `Apache Tomcat Real Question ${i + 1}: How to configure server connectors, ports, and tune JVM memory?`,
    options: ['Correct Option A', 'Incorrect Option B', 'Incorrect Option C', 'Incorrect Option D'],
    answer: 0,
  })),

  jira: Array.from({ length: 100 }, (_, i) => ({
    question: `Jira & Agile Real Question ${i + 1}: How to manage backlogs, sprints, epics, and Kanban workflows?`,
    options: ['Correct Option A', 'Incorrect Option B', 'Incorrect Option C', 'Incorrect Option D'],
    answer: 0,
  }))
};
