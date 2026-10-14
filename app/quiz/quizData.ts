export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  category: string;
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    category: 'Kubernetes',
    question: 'Which Kubernetes object is used to expose a deployment externally?',
    options: ['Pod', 'Service', 'ConfigMap', 'Namespace'],
    answer: 1,
  },
  {
    id: 2,
    category: 'Terraform',
    question: 'What command is used to preview infrastructure changes in Terraform?',
    options: ['terraform init', 'terraform apply', 'terraform plan', 'terraform destroy'],
    answer: 2,
  },
  {
    id: 3,
    category: 'Docker',
    question: 'Which instruction in a Dockerfile sets the working directory?',
    options: ['RUN', 'WORKDIR', 'ENV', 'CMD'],
    answer: 1,
  },
  {
    id: 4,
    category: 'AWS',
    question: 'Which AWS service is fully managed for running Kubernetes clusters?',
    options: ['AWS ECS', 'Amazon EKS', 'AWS EC2', 'AWS Lambda'],
    answer: 1,
  },
  {
    id: 5,
    category: 'CI/CD & GitOps',
    question: 'What is the primary role of ArgoCD in a Kubernetes environment?',
    options: [
      'Container image building',
      'Continuous declarative GitOps delivery',
      'Network traffic encryption',
      'Database provisioning'
    ],
    answer: 1,
  },
];
