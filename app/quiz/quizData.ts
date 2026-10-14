import { linuxQuestions } from './linuxQuestions';
import { gitQuestions } from './gitQuestions';
import { dockerQuestions } from './dockerQuestions';
import { kubernetesQuestions } from './kubernetesQuestions';
import { awsQuestions } from './awsQuestions';
import { terraformQuestions } from './terraformQuestions';
import { jenkinsQuestions } from './jenkinsQuestions';
import { argocdQuestions } from './argocdQuestions';
import { ansibleQuestions } from './ansibleQuestions';
import { prometheusQuestions } from './prometheusQuestions';
import { tomcatQuestions } from './tomcatQuestions';
import { jiraQuestions } from './jiraQuestions';
import { grafanaQuestions } from './grafanaQuestions';
import { githubActionsQuestions } from './githubActionsQuestions';
import { nexusQuestions } from './nexusQuestions';
import { helmQuestions } from './helmQuestions';
import { eksQuestions } from './eksQuestions';
import { mavenQuestions } from './mavenQuestions';

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
  { id: 'prometheus', name: 'Prometheus', description: 'Monitoring, metrics, and time-series data.' },
  { id: 'tomcat', name: 'Apache Tomcat', description: 'Java servlet containers and web application deployment.' },
  { id: 'jira', name: 'Jira & Agile', description: 'Project tracking, scrum boards, and sprint planning.' },
  { id: 'grafana', name: 'Grafana', description: 'Data visualization, dashboards, and monitoring.' },
  { id: 'github-actions', name: 'GitHub Actions', description: 'CI/CD workflows integrated directly inside GitHub.' },
  { id: 'nexus', name: 'Sonatype Nexus', description: 'Artifact repository manager for dependencies and packages.' },
  { id: 'helm', name: 'Helm', description: 'Kubernetes package manager and templating charts.' },
  { id: 'eks', name: 'Amazon EKS', description: 'Managed Kubernetes service on AWS cloud.' },
  { id: 'maven', name: 'Apache Maven', description: 'Java build automation and dependency management.' },
];

export const topicQuestions: Record<string, { question: string; options: string[]; answer: number }[]> = {
  linux: linuxQuestions,
  git: gitQuestions,
  docker: dockerQuestions,
  kubernetes: kubernetesQuestions,
  aws: awsQuestions,
  terraform: terraformQuestions,
  jenkins: jenkinsQuestions,
  argocd: argocdQuestions,
  ansible: ansibleQuestions,
  prometheus: prometheusQuestions,
  tomcat: tomcatQuestions,
  jira: jiraQuestions,
  grafana: grafanaQuestions,
  'github-actions': githubActionsQuestions,
  nexus: nexusQuestions,
  helm: helmQuestions,
  eks: eksQuestions,
  maven: mavenQuestions,
};
