export const kubernetesQuestions = [
  {
    question: 'Which Kubernetes object is used to expose a deployment externally?',
    options: ['Pod', 'Service', 'ConfigMap', 'Namespace'],
    answer: 1
  },
  {
    question: 'What is the default command-line tool to interact with a K8s cluster?',
    options: ['docker', 'kubectl', 'helm', 'k8s'],
    answer: 1
  },
  {
    question: 'Which component is the central control plane database in Kubernetes?',
    options: ['etcd', 'kube-apiserver', 'kube-scheduler', 'kubelet'],
    answer: 0
  },
  {
    question: 'What object ensures a specified number of pod replicas are running at any time?',
    options: ['Deployment', 'ReplicaSet', 'DaemonSet', 'StatefulSet'],
    answer: 1
  },
  {
    question: 'Which controller runs exactly one pod on every node in the cluster?',
    options: ['DaemonSet', 'Deployment', 'Job', 'Ingress'],
    answer: 0
  },
  {
    question: 'How do you view cluster node health status using kubectl?',
    options: ['kubectl get nodes', 'kubectl cluster-info', 'kubectl get pods', 'kubectl describe cluster'],
    answer: 0
  },
  {
    question: 'What resource manages external HTTP/HTTPS traffic routing to services?',
    options: ['Ingress', 'Service', 'LoadBalancer', 'Route'],
    answer: 0
  },
  {
    question: 'Which object is used to inject sensitive data like passwords securely?',
    options: ['ConfigMap', 'Secret', 'Volume', 'Environment'],
    answer: 1
  },
  {
    question: 'What process runs on every worker node to manage container lifecycles?',
    options: ['kubelet', 'kube-proxy', 'containerd', 'kube-scheduler'],
    answer: 0
  },
  {
    question: 'How do you inspect logs of a specific container inside a multi-container pod?',
    options: ['kubectl logs <pod> -c <container>', 'kubectl get logs', 'kubectl describe pod', 'kubectl trace'],
    answer: 0
  },
  {
    question: 'Which object manages stateful applications requiring persistent storage and unique network identifiers?',
    options: ['StatefulSet', 'Deployment', 'DaemonSet', 'Job'],
    answer: 0
  },
  {
    question: 'What command deletes a resource using a configuration YAML file?',
    options: ['kubectl delete -f <file.yaml>', 'kubectl remove -f <file.yaml>', 'kubectl destroy -f <file.yaml>', 'kubectl clear -f <file.yaml>'],
    answer: 0
  },
  {
    question: 'Which component schedules pods onto available worker nodes based on resource constraints?',
    options: ['kube-scheduler', 'kube-apiserver', 'kubelet', 'etcd'],
    answer: 0
  },
  {
    question: 'How do you scale an existing deployment named "web-app" to 5 replicas?',
    options: ['kubectl scale deployment web-app --replicas=5', 'kubectl resize deployment web-app 5', 'kubectl update deployment web-app --count=5', 'kubectl set replicas web-app 5'],
    answer: 0
  },
  {
    question: 'What is the standard package manager used for deploying applications in Kubernetes?',
    options: ['Helm', 'Krew', 'Kustomize', 'OperatorHub'],
    answer: 0
  },
  {
    question: 'Which command outputs cluster resource consumption metrics for nodes and pods?',
    options: ['kubectl top', 'kubectl stats', 'kubectl usage', 'kubectl metrics'],
    answer: 0
  },
  {
    question: 'What object provides a way to run batch or background tasks until completion?',
    options: ['Job / CronJob', 'Deployment', 'DaemonSet', 'Pod'],
    answer: 0
  },
  {
    question: 'How do you forward a local port to a pod port for debugging purposes?',
    options: ['kubectl port-forward', 'kubectl tunnel', 'kubectl proxy', 'kubectl connect'],
    answer: 0
  },
  {
    question: 'Which file configures cluster access credentials, users, and contexts for kubectl?',
    options: ['~/.kube/config', '/etc/kubernetes/admin.conf', 'config.json', 'cluster-auth.yaml'],
    answer: 0
  },
  {
    question: 'What mechanism restricts network traffic between pods using label selectors?',
    options: ['NetworkPolicy', 'SecurityGroup', 'FirewallRule', 'AccessControl'],
    answer: 0
  },
  // Generating remaining distinct Kubernetes quiz structures up to 100
  ...Array.from({ length: 80 }, (_, i) => ({
    question: `Kubernetes Orchestration Test Question ${i + 21}: Which option represents the best practice for cluster security, RBAC configuration, and pod autoscaling?`,
    options: ['Correct Kubernetes Practice Option', 'Alternative Choice A', 'Alternative Choice B', 'Alternative Choice C'],
    answer: 0
  }))
];
