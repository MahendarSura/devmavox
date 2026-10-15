export const kubernetesQuestions = [
  {
    question: 'What is the smallest deployable object in Kubernetes?',
    options: ['Pod', 'Container', 'Node', 'Cluster'],
    answer: 0
  },
  {
    question: 'Which component is the main control plane database storing cluster state in Kubernetes?',
    options: ['etcd', 'kube-apiserver', 'kube-scheduler', 'kubelet'],
    answer: 0
  },
  {
    question: 'Which command is used to interact with a Kubernetes cluster via CLI?',
    options: ['kubectl', 'k8s', 'kube-cli', 'oc'],
    answer: 0
  },
  {
    question: 'What object ensures that a specified number of pod replicas are running at any given time?',
    options: ['Deployment / ReplicaSet', 'DaemonSet', 'StatefulSet', 'Job'],
    answer: 0
  },
  {
    question: 'Which Kubernetes controller ensures a copy of a pod runs on all or selected cluster nodes?',
    options: ['DaemonSet', 'Deployment', 'ReplicaSet', 'CronJob'],
    answer: 0
  },
  {
    question: 'What object provides stable network identification and persistent storage for stateful applications?',
    options: ['StatefulSet', 'Deployment', 'DaemonSet', 'ReplicaSet'],
    answer: 0
  },
  {
    question: 'Which Kubernetes resource exposes a set of pods internally or externally via a network service?',
    options: ['Service', 'Ingress', 'Route', 'Endpoint'],
    answer: 0
  },
  {
    question: 'What resource manages external HTTP/HTTPS traffic routing to internal cluster services?',
    options: ['Ingress', 'Service', 'NetworkPolicy', 'Gateway'],
    answer: 0
  },
  {
    question: 'Which object is used to inject configuration data as key-value pairs into pods?',
    options: ['ConfigMap', 'Secret', 'Environment', 'Volume'],
    answer: 0
  },
  {
    question: 'How are sensitive data like passwords and tokens securely stored in Kubernetes?',
    options: ['Secret', 'ConfigMap', 'Volume', 'Environment'],
    answer: 0
  },
  {
    question: 'What component runs on each worker node, maintaining running pods and reporting status?',
    options: ['kubelet', 'kube-proxy', 'etcd', 'scheduler'],
    answer: 0
  },
  {
    question: 'Which component maintains network rules and performs port-forwarding across cluster nodes?',
    options: ['kube-proxy', 'kubelet', 'coredns', 'apiserver'],
    answer: 0
  },
  {
    question: 'What tool or component provides cluster-internal DNS and service discovery?',
    options: ['CoreDNS', 'kube-dns', 'bind9', 'route53'],
    answer: 0
  },
  {
    question: 'Which command displays running pods across namespaces in Kubernetes?',
    options: ['kubectl get pods -A', 'kubectl list pods', 'kubectl show pods', 'kubectl pods-all'],
    answer: 0
  },
  {
    question: 'How do you view logs of a specific pod in Kubernetes?',
    options: ['kubectl logs <pod-name>', 'kubectl get logs', 'kubectl show log', 'kubectl pod-log'],
    answer: 0
  },
  {
    question: 'Which command opens an interactive shell session inside a running pod container?',
    options: ['kubectl exec -it <pod-name> -- /bin/bash', 'kubectl shell <pod-name>', 'kubectl connect', 'kubectl open'],
    answer: 0
  },
  {
    question: 'What Kubernetes object defines rules for restricting network traffic between pods?',
    options: ['NetworkPolicy', 'FirewallRule', 'SecurityGroup', 'AccessPolicy'],
    answer: 0
  },
  {
    question: 'Which object allows binding persistent storage volumes to pods dynamically?',
    options: ['PersistentVolumeClaim (PVC)', 'StorageBucket', 'VolumeMount', 'DiskClaim'],
    answer: 0
  },
  {
    question: 'What Kubernetes feature allows scheduling pods onto specific nodes based on node labels?',
    options: ['Node Selector / Affinity', 'Node Assignment', 'Targeting', 'Node Route'],
    answer: 0
  },
  {
    question: 'Which command applies configuration changes from a YAML manifest file?',
    options: ['kubectl apply -f <file>', 'kubectl create -f', 'kubectl update -f', 'kubectl push -f'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 21: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 21', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 22: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 22', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 23: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 23', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 24: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 24', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 25: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 25', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 26: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 26', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 27: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 27', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 28: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 28', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 29: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 29', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 30: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 30', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 31: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 31', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 32: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 32', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 33: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 33', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 34: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 34', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 35: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 35', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 36: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 36', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 37: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 37', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 38: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 38', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 39: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 39', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 40: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 40', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 41: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 41', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 42: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 42', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 43: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 43', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 44: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 44', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 45: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 45', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 46: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 46', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 47: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 47', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 48: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 48', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 49: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 49', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 50: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 50', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 51: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 51', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 52: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 52', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 53: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 53', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 54: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 54', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 55: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 55', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 56: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 56', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 57: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 57', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 58: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 58', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 59: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 59', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 60: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 60', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 61: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 61', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 62: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 62', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 63: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 63', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 64: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 64', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 65: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 65', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 66: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 66', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 67: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 67', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 68: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 68', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 69: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 69', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 70: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 70', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 71: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 71', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 72: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 72', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 73: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 73', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 74: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 74', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 75: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 75', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 76: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 76', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 77: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 77', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 78: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 78', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 79: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 79', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 80: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 80', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 81: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 81', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 82: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 82', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 83: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 83', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 84: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 84', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 85: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 85', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 86: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 86', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 87: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 87', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 88: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 88', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 89: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 89', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 90: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 90', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 91: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 91', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 92: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 92', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 93: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 93', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 94: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 94', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 95: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 95', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 96: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 96', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 97: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 97', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 98: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 98', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 99: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 99', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  },
  {
    question: 'Kubernetes Test Question 100: What is the core best practice or command configuration for enterprise Kubernetes workflows?',
    options: ['Standard Kubernetes Correct Option 100', 'Alternative Choice A for Kubernetes', 'Alternative Choice B for Kubernetes', 'Alternative Choice C for Kubernetes'],
    answer: 0
  }
];
