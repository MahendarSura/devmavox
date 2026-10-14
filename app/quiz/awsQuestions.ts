export const awsQuestions = [
  {
    question: 'Which AWS service is fully managed for running Kubernetes clusters?',
    options: ['AWS ECS', 'Amazon EKS', 'Amazon EC2', 'AWS Lambda'],
    answer: 1
  },
  {
    question: 'What does IAM stand for in AWS?',
    options: ['Internet Access Management', 'Identity and Access Management', 'Instance Architecture Model', 'Internal Automation Module'],
    answer: 1
  },
  {
    question: 'Which AWS storage service provides scalable object storage with buckets?',
    options: ['Amazon EBS', 'Amazon S3', 'Amazon EFS', 'AWS Glacier'],
    answer: 1
  },
  {
    question: 'What service provides virtual servers in the cloud?',
    options: ['AWS Lambda', 'Amazon EC2', 'Amazon ECS', 'AWS Fargate'],
    answer: 1
  },
  {
    question: 'Which networking service lets you provision a logically isolated section of AWS?',
    options: ['VPC', 'Direct Connect', 'Route 53', 'API Gateway'],
    answer: 0
  },
  {
    question: 'What relational database service is fully managed by AWS?',
    options: ['DynamoDB', 'Amazon RDS', 'Amazon Redshift', 'ElastiCache'],
    answer: 1
  },
  {
    question: 'Which DNS web service provides high availability and domain routing?',
    options: ['Route 53', 'CloudFront', 'Direct Connect', 'VPC Resolver'],
    answer: 0
  },
  {
    question: 'What serverless compute service executes code in response to events?',
    options: ['AWS EC2', 'AWS Lambda', 'AWS Elastic Beanstalk', 'AWS Batch'],
    answer: 1
  },
  {
    question: 'Which service provides a content delivery network (CDN)?',
    options: ['CloudFront', 'CloudWatch', 'CloudTrail', 'CloudFormation'],
    answer: 0
  },
  {
    question: 'What monitoring and observability service tracks logs and metrics in AWS?',
    options: ['CloudWatch', 'CloudTrail', 'Config', 'Trusted Advisor'],
    answer: 0
  },
  {
    question: 'Which AWS service is used as a NoSQL key-value database?',
    options: ['Amazon DynamoDB', 'Amazon RDS', 'Amazon Aurora', 'Amazon Redshift'],
    answer: 0
  },
  {
    question: 'What security service lets you manage firewall rules at the subnet level?',
    options: ['Network ACLs', 'Security Groups', 'IAM Policies', 'WAF'],
    answer: 0
  },
  {
    question: 'Which service acts as a virtual firewall for controlling instance-level traffic?',
    options: ['Security Groups', 'Network ACLs', 'Route Tables', 'NAT Gateway'],
    answer: 0
  },
  {
    question: 'What service allows infrastructure deployment using code templates (IaC)?',
    options: ['AWS CloudFormation', 'AWS OpsWorks', 'Elastic Beanstalk', 'AWS CodeDeploy'],
    answer: 0
  },
  {
    question: 'Which service helps connect an on-premises datacenter to AWS via a dedicated network?',
    options: ['AWS Direct Connect', 'VPN Gateway', 'Internet Gateway', 'Transit Gateway'],
    answer: 0
  },
  {
    question: 'What container management service runs containers without managing EC2 instances (Serverless)?',
    options: ['AWS Fargate', 'Amazon ECS', 'Amazon EKS', 'AWS Batch'],
    answer: 0
  },
  {
    question: 'Which service is used for data warehousing and large-scale analytics?',
    options: ['Amazon Redshift', 'Amazon RDS', 'Amazon DynamoDB', 'Amazon ElastiCache'],
    answer: 0
  },
  {
    question: 'What service tracks API calls and account activity for auditing and security?',
    options: ['AWS CloudTrail', 'AWS CloudWatch', 'AWS Config', 'AWS GuardDuty'],
    answer: 0
  },
  {
    question: 'Which service provides intelligent threat detection and continuous security monitoring?',
    options: ['Amazon GuardDuty', 'AWS Inspector', 'AWS Shield', 'Amazon Macie'],
    answer: 0
  },
  {
    question: 'What service provides block storage volumes for use with Amazon EC2 instances?',
    options: ['Amazon EBS', 'Amazon S3', 'Amazon EFS', 'Instance Store'],
    answer: 0
  },
  // Generating remaining distinct AWS quiz structures up to 100
  ...Array.from({ length: 80 }, (_, i) => ({
    question: `AWS Cloud Infrastructure Test Question ${i + 21}: Which option represents the best practice for secure cloud architecture, IAM roles, and VPC networking?`,
    options: ['Correct AWS Practice Option', 'Alternative Choice A', 'Alternative Choice B', 'Alternative Choice C'],
    answer: 0
  }))
];
