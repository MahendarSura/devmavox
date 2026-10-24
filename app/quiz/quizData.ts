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

import { kubernetesAdvancedQuestions } from './kubernetes-advanced';
import { terraformIacAdvancedQuestions } from './terraform-iac-advanced';
import { productionIncidentsSreQuestions } from './production-incidents-sre';
import { ciCdPipelinesJenkinsQuestions } from './ci-cd-pipelines-jenkins';
import { systemDesignDevOpsQuestions } from './system-design-devops';
import { cloudCostOptimizationQuestions } from './cloud-cost-optimization';
import { gitopsInterviewQA as gitopsQuestions } from './gitops';
import { linuxtroubleshootingQuestions } from './linux-troubleshooting';
import { devsecopsQuestions } from './devsecops';
import { observabilityloggingQuestions } from './observability-logging';
import { awsAdvancedQuestions } from './aws-advanced';
import { pythonBashScriptingQuestions } from './python-bash-scripting';
import { nginxLoadBalancingQuestions } from './nginx-load-balancing';
import { networkingdnsQuestions } from './networking-dns';

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

  { id: 'kubernetes-advanced', name: 'Kubernetes Advanced', description: 'PDBs, Probes, StatefulSets, Taints, Tolerations, and scheduling.' },
  { id: 'terraform-iac-advanced', name: 'Terraform Advanced (IaC)', description: 'State management, modules, drift detection, and refactoring.' },
  { id: 'production-incidents-sre', name: 'Production Incidents & SRE', description: 'SLOs, SLIs, error budgets, postmortems, and incident response.' },
  { id: 'ci-cd-pipelines-jenkins', name: 'CI/CD Pipelines (Jenkins Advanced)', description: 'Shared libraries, declarative pipelines, and security.' },
  { id: 'system-design-devops', name: 'System Design DevOps', description: 'Scalability, high availability, CAP theorem, and distributed systems.' },
  { id: 'cloud-cost-optimization', name: 'Cloud Cost Optimization (FinOps)', description: 'Right-sizing, spot instances, tagging, and financial governance.' },
  { id: 'gitops', name: 'GitOps & ArgoCD Advanced', description: 'Declarative continuous delivery, sync policies, and patterns.' },
  { id: 'linux-troubleshooting', name: 'Linux Troubleshooting', description: 'Kernel diagnostics, performance tuning, and deep debugging.' },
  { id: 'devsecops', name: 'DevSecOps', description: 'Container security scanning, SAST/DAST, and vulnerability management.' },
  { id: 'observability-logging', name: 'Observability & Logging', description: 'Advanced tracing, centralized logging, and metrics telemetry.' },
  { id: 'aws-advanced', name: 'AWS Advanced Architecture', description: 'Complex cloud networking, IAM, VPC peering, and high availability.' },
  { id: 'python-bash-scripting', name: 'Python & Bash Scripting', description: 'Automation scripts, file handling, and DevOps tooling.' },
  { id: 'nginx-load-balancing', name: 'Nginx & Load Balancing', description: 'Reverse proxy configurations, SSL termination, and traffic routing.' },
  { id: 'networking-dns', name: 'Networking & DNS', description: 'Subnetting, TCP/IP, DNS resolution, and routing troubleshooting.' },
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

  'kubernetes-advanced': kubernetesAdvancedQuestions,
  'terraform-iac-advanced': terraformIacAdvancedQuestions,
  'production-incidents-sre': productionIncidentsSreQuestions,
  'ci-cd-pipelines-jenkins': ciCdPipelinesJenkinsQuestions,
  'system-design-devops': systemDesignDevOpsQuestions,
  'cloud-cost-optimization': cloudCostOptimizationQuestions,
  gitops: gitopsQuestions,
  'linux-troubleshooting': linuxtroubleshootingQuestions,
  devsecops: devSecOpsQuestions,
  'observability-logging': observabilityLoggingQuestions,
  'aws-advanced': awsAdvancedQuestions,
  'python-bash-scripting': pythonBashScriptingQuestions,
  'nginx-load-balancing': nginxLoadBalancingQuestions,
  'networking-dns': networkingDnsQuestions,
};
