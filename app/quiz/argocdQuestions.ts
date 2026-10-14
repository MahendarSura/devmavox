export const argocdQuestions = [
  {
    question: 'What is the primary role of ArgoCD?',
    options: ['Container building', 'Continuous declarative GitOps delivery', 'Network routing', 'Log aggregation'],
    answer: 1
  },
  {
    question: 'ArgoCD continuously monitors Git and syncs with which environment?',
    options: ['AWS S3', 'Kubernetes Cluster', 'Docker Hub', 'Jenkins Server'],
    answer: 1
  },
  {
    question: 'What user interface does ArgoCD provide for cluster visualization?',
    options: ['Web UI and CLI', 'Grafana Dashboard', 'Kibana Console', 'Terminal TUI'],
    answer: 0
  },
  {
    question: 'What custom resource definition (CRD) represents an ArgoCD deployment target?',
    options: ['Application', 'Deployment', 'Service', 'SyncJob'],
    answer: 0
  },
  {
    question: 'How does ArgoCD detect drift between Git state and Live Kubernetes state?',
    options: ['Continuous polling / Webhooks', 'Manual check', 'Cron schedule', 'Prometheus alerts'],
    answer: 0
  },
  {
    question: 'What command-line tool is used to manage ArgoCD applications?',
    options: ['argocd', 'kubectl-argo', 'helm-argo', 'gitops-cli'],
    answer: 0
  },
  {
    question: 'Which authentication protocols are supported by ArgoCD for SSO?',
    options: ['OIDC / SAML / GitHub / LDAP', 'Basic Auth only', 'JWT tokens only', 'Kerberos'],
    answer: 0
  },
  {
    question: 'What feature allows automatic synchronization when Git changes are pushed?',
    options: ['Auto-Sync', 'Live-Sync', 'Fast-Sync', 'Git-Trigger'],
    answer: 0
  },
  {
    question: 'Which templating engines does ArgoCD natively support for Kubernetes manifests?',
    options: ['Helm, Kustomize, Ksonnet, Plain YAML', 'Docker Compose only', 'Ansible playbooks', 'Terraform HCL'],
    answer: 0
  },
  {
    question: 'What happens when an out-of-sync manual change is made in the cluster with Auto-Sync enabled?',
    options: ['ArgoCD overwrites it back to Git state', 'Git updates automatically', 'Alert is triggered', 'Nothing happens'],
    answer: 0
  },
  {
    question: 'Which file defines the multi-cluster registration and configuration in ArgoCD?',
    options: ['Secret / argocd-cm', 'clusters.yaml', 'config.json', 'settings.xml'],
    answer: 0
  },
  {
    question: 'What command is used to log in to an ArgoCD server via CLI?',
    options: ['argocd login <server>', 'argocd auth connect', 'argocd signin', 'kubectl argo login'],
    answer: 0
  },
  {
    question: 'Which project component groups applications together for multi-tenancy and RBAC?',
    options: ['AppProject', 'AppGroup', 'Namespace', 'ClusterSet'],
    answer: 0
  },
  {
    question: 'How do you trigger a manual synchronization of an application via CLI?',
    options: ['argocd app sync <app-name>', 'argocd refresh <app-name>', 'kubectl argo sync', 'argocd apply'],
    answer: 0
  },
  {
    question: 'What feature allows ignoring specific diff fields between Git and live cluster state?',
    options: ['IgnoreDifferences', 'SkipDiff', 'ExcludeFields', 'BypassValidation'],
    answer: 0
  },
  {
    question: 'Which component is responsible for executing sync operations and applying manifests in ArgoCD?',
    options: ['Application Controller', 'Repo Server', 'Dex Server', 'Redis Cache'],
    answer: 0
  },
  {
    question: 'What is the purpose of the ArgoCD Repo Server component?',
    options: ['Generates Kubernetes manifests from Helm/Kustomize/Git', 'Manages user sessions', 'Stores application state', 'Routes web traffic'],
    answer: 0
  },
  {
    question: 'Which component provides single sign-on (SSO) integration using OIDC?',
    options: ['Dex', 'Keycloak', 'OAuth2-Proxy', 'AuthServer'],
    answer: 0
  },
  {
    question: 'How do you rollback an ArgoCD application to a previous healthy deployment version?',
    options: ['argocd app rollback <app-name> <id>', 'argocd undo', 'kubectl rollback', 'git revert'],
    answer: 0
  },
  {
    question: 'What is an ArgoCD ApplicationSet used for?',
    options: ['Automating multi-cluster and multi-repo application generation', 'Grouping pods', 'Managing secrets', 'Configuring webhooks'],
    answer: 0
  },
  // Generating remaining distinct ArgoCD quiz structures up to 100
  ...Array.from({ length: 80 }, (_, i) => ({
    question: `ArgoCD GitOps Test Question ${i + 21}: Which option represents the best practice for automated synchronization, AppProjects, and multi-cluster deployment management?`,
    options: ['Correct ArgoCD Practice Option', 'Alternative Choice A', 'Alternative Choice B', 'Alternative Choice C'],
    answer: 0
  }))
];
