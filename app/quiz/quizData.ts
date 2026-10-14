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
    category: 'AWS',
    question: 'Which AWS service is used for serverless computing?',
    options: ['Amazon EC2', 'AWS Lambda', 'Amazon S3', 'Amazon RDS'],
    answer: 1,
  },
  {
    id: 2,
    category: 'Docker',
    question: 'Which command is used to build a Docker image from a Dockerfile?',
    options: ['docker run', 'docker build', 'docker push', 'docker pull'],
    answer: 1,
  },
  {
    id: 3,
    category: 'Kubernetes',
    question: 'What is the smallest deployable unit in Kubernetes?',
    options: ['Pod', 'Node', 'Cluster', 'Container'],
    answer: 0,
  },
  {
    id: 4,
    category: 'Terraform',
    question: 'Which command is used to apply the changes required to reach the desired state?',
    options: ['terraform init', 'terraform plan', 'terraform apply', 'terraform destroy'],
    answer: 2,
  },
];
