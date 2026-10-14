export const eksQuestions = [
  { question: 'What does EKS stand for in AWS?', options: ['Elastic Kubernetes Service', 'Elastic Kernel System', 'Enterprise Kubernetes Solution', 'Elastic Key Store'], answer: 0 },
  { question: 'Who manages the Kubernetes control plane in Amazon EKS?', options: ['AWS fully manages it', 'The user manages it on EC2', 'Managed by Docker', 'Managed by Terraform'], answer: 0 },
  { question: 'What command-line tool configures authentication context for EKS clusters?', options: ['aws eks update-kubeconfig', 'kubectl auth eks', 'aws configure eks', 'eksctl login'], answer: 0 },
  { question: 'Which utility is commonly used to create and manage EKS clusters easily via CLI?', options: ['eksctl', 'awscli', 'helm', 'kops'], answer: 0 },
  { question: 'What IAM feature maps Kubernetes service accounts to AWS IAM roles securely?', options: ['IRSA (IAM Roles for Service Accounts)', 'IAM Instance Profiles', 'Security Groups', 'Access Keys'], answer: 0 },
  // 6-100 questions
  ...Array.from({ length: 95 }, (_, i) => ({
    question: `Amazon EKS Test Question ${i + 6}: What is the best practice for node groups, IRSA, and cluster networking in EKS?`,
    options: ['Correct EKS Option', 'Alternative Choice A', 'Alternative Choice B', 'Alternative Choice C'],
    answer: 0
  }))
];
