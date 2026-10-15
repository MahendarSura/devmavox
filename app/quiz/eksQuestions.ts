export const eksQuestions = [
  {
    question: 'What is Amazon EKS (Elastic Kubernetes Service) primarily used for?',
    options: ['Running managed Kubernetes clusters on AWS without managing control plane', 'Hosting static S3 websites', 'Serverless code execution', 'Relational database management'],
    answer: 0
  },
  {
    question: 'Which company develops and manages Amazon EKS?',
    options: ['Amazon Web Services (AWS)', 'Google Cloud', 'Microsoft Azure', 'The Apache Foundation'],
    answer: 0
  },
  {
    question: 'Which command-line tool is officially used to configure and manage Amazon EKS clusters?',
    options: ['aws eks / kubectl', 'k8s-cli', 'amazon-k8s', 'eks-tool'],
    answer: 0
  },
  {
    question: 'How do you update your local kubeconfig file to connect to an existing EKS cluster via AWS CLI?',
    options: ['aws eks update-kubeconfig --name <cluster-name>', 'aws eks connect-cluster', 'kubectl config use-eks', 'aws configure eks'],
    answer: 0
  },
  {
    question: 'What open-source tool is commonly used to create and provision EKS clusters declaratively using Infrastructure as Code?',
    options: ['Terraform / AWS CDK / eksctl', 'Ansible playbooks', 'Docker Compose', 'Jenkins pipeline'],
    answer: 0
  },
  {
    question: 'What is the specialized command-line utility created specifically for easy creation and management of EKS clusters?',
    options: ['eksctl', 'kops', 'kubeadm', 'minikube'],
    answer: 0
  },
  {
    question: 'Which AWS compute option allows running EKS worker nodes on managed EC2 instances where you manage node lifecycles?',
    options: ['Managed Node Groups / EC2 Worker Nodes', 'AWS Lambda', 'AWS Fargate', 'Lightsail instances'],
    answer: 0
  },
  {
    question: 'Which serverless compute option for EKS runs pods without managing underlying EC2 servers or nodes?',
    options: ['AWS Fargate', 'EC2 Spot Instances', 'Elastic Beanstalk', 'AWS Batch'],
    answer: 0
  },
  {
    question: 'What AWS IAM feature maps Kubernetes service accounts to IAM roles for fine-grained pod-level AWS permissions?',
    options: ['IAM Roles for Service Accounts (IRSA) / EKS Pod Identity', 'IAM Instance Profile', 'Security Groups for Pods', 'Access Key Mapping'],
    answer: 0
  },
  {
    question: 'Which AWS service integrates with EKS for container image storage and management?',
    options: ['Amazon ECR (Elastic Container Registry)', 'Docker Hub', 'Sonatype Nexus', 'GitHub Packages'],
    answer: 0
  },
  {
    question: 'What network plugin is standard for managing pod IP addresses and networking in Amazon EKS?',
    options: ['AWS VPC CNI plugin', 'Flannel', 'Calico', 'Weave Net'],
    answer: 0
  },
  {
    question: 'How do you expose an EKS cluster service to the internet using AWS load balancing?',
    options: ['AWS Load Balancer Controller (ALB / NLB)', 'NodePort only', 'Ingress proxy script', 'Route53 direct bind'],
    answer: 0
  },
  {
    question: 'What Kubernetes storage class allows provisioning dynamic AWS EBS block storage volumes for stateful pods in EKS?',
    options: ['gp2 / gp3 (AWS EBS CSI Driver)', 'local-storage', 'hostPath', 'nfs-client'],
    answer: 0
  },
  {
    question: 'Which plugin or driver enables mounting Amazon EFS shared file systems across multiple pods in EKS?',
    options: ['AWS EFS CSI Driver', 'EBS storage plugin', 'S3 mount connector', 'NFS storage tool'],
    answer: 0
  },
  {
    question: 'What feature allows monitoring cluster metrics and pod logs automatically in Amazon CloudWatch?',
    options: ['Container Insights', 'CloudWatch Logs Agent', 'AWS X-Ray tracer', 'Metrics Server extension'],
    answer: 0
  },
  {
    question: 'Which command checks the status and version of an Amazon EKS cluster via AWS CLI?',
    options: ['aws eks describe-cluster --name <cluster-name>', 'aws eks get-status', 'kubectl cluster-info', 'aws eks list'],
    answer: 0
  },
  {
    question: 'How do you manage cluster access and user authentication permissions in EKS control plane?',
    options: ['aws-auth ConfigMap / EKS Access Entries', 'IAM users list in server.xml', 'kubeconfig tokens only', 'Secret keys file'],
    answer: 0
  },
  {
    question: 'What security service scans container images stored in ECR before deployment to EKS?',
    options: ['Amazon Inspector', 'GuardDuty', 'AWS Shield', 'WAF firewall'],
    answer: 0
  },
  {
    question: 'Which feature helps protect EKS clusters against runtime threats and malicious container behavior?',
    options: ['Amazon GuardDuty EKS Protection', 'AWS Trusted Advisor', 'CloudTrail audits', 'IAM Analyzer'],
    answer: 0
  },
  {
    question: 'How do you delete an EKS cluster and its managed resources cleanly using eksctl?',
    options: ['eksctl delete cluster --name <cluster-name>', 'aws eks destroy', 'kubectl delete cluster', 'terraform destroy'],
    answer: 0
  },
  {
    question: 'EKS Test Question 21: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 21', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 22: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 22', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 23: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 23', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 24: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 24', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 25: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 25', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 26: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 26', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 27: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 27', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 28: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 28', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 29: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 29', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 30: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 30', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 31: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 31', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 32: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 32', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 33: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 33', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 34: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 34', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 35: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 35', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 36: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 36', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 37: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 37', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 38: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 38', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 39: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 39', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 40: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 40', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 41: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 41', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 42: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 42', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 43: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 43', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 44: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 44', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 45: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 45', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 46: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 46', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 47: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 47', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 48: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 48', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 49: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 49', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 50: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 50', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 51: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 51', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 52: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 52', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 53: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 53', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 54: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 54', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 55: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 55', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 56: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 56', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 57: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 57', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 58: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 58', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 59: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 59', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 60: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 60', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 61: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 61', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 62: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 62', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 63: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 63', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 64: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 64', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 65: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 65', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 66: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 66', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 67: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 67', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 68: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 68', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 69: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 69', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 70: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 70', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 71: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 71', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 72: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 72', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 73: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 73', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 74: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 74', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 75: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 75', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 76: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 76', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 77: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 77', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 78: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 78', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 79: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 79', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 80: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 80', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 81: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 81', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 82: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 82', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 83: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 83', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 84: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 84', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 85: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 85', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 86: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 86', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 87: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 87', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 88: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 88', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 89: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 89', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 90: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 90', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 91: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 91', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 92: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 92', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 93: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 93', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 94: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 94', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 95: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 95', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 96: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 96', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 97: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 97', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 98: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 98', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 99: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 99', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  },
  {
    question: 'EKS Test Question 100: What is the core best practice or command configuration for enterprise EKS workflows?',
    options: ['Standard EKS Correct Option 100', 'Alternative Choice A for EKS', 'Alternative Choice B for EKS', 'Alternative Choice C for EKS'],
    answer: 0
  }
];
