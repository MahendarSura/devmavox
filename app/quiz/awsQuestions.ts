export interface AWSQuestion {
  question: string;
  options: string[];
  answer: number;
}

export const awsQuestions: AWSQuestion[] = [
  {
    question: "1. What is AWS primarily used for?",
    options: [
      "Cloud computing and infrastructure services",
      "Frontend development only",
      "Creating programming languages",
      "Managing physical printers"
    ],
    answer: 0
  },
  {
    question: "2. What does AWS stand for?",
    options: [
      "Advanced Web Software",
      "Amazon Web Services",
      "Automated Work System",
      "Amazon Website Solutions"
    ],
    answer: 1
  },
  {
    question: "3. What is an AWS Region?",
    options: [
      "A single EC2 instance",
      "A user account",
      "A separate geographic area containing multiple Availability Zones",
      "A type of S3 bucket"
    ],
    answer: 2
  },
  {
    question: "4. What is an Availability Zone in AWS?",
    options: [
      "An IAM policy",
      "A billing dashboard",
      "A DNS record",
      "An isolated location within an AWS Region"
    ],
    answer: 3
  },
  {
    question: "5. Which AWS service provides virtual servers?",
    options: [
      "Amazon EC2",
      "Amazon S3",
      "Amazon Route 53",
      "AWS CloudTrail"
    ],
    answer: 0
  },
  {
    question: "6. What is Amazon S3 primarily used for?",
    options: [
      "Running virtual machines",
      "Object storage",
      "Managing user permissions only",
      "Creating private networks"
    ],
    answer: 1
  },
  {
    question: "7. Which AWS service manages identities and permissions?",
    options: [
      "Amazon EBS",
      "Amazon CloudFront",
      "AWS IAM",
      "Amazon VPC"
    ],
    answer: 2
  },
  {
    question: "8. What is an IAM policy?",
    options: [
      "A virtual server",
      "A storage volume",
      "A load balancer",
      "A document defining permissions"
    ],
    answer: 3
  },
  {
    question: "9. Which AWS service provides a logically isolated virtual network?",
    options: [
      "Amazon VPC",
      "Amazon S3",
      "AWS Lambda",
      "Amazon SNS"
    ],
    answer: 0
  },
  {
    question: "10. What is the purpose of an EC2 key pair?",
    options: [
      "To increase instance storage",
      "To support authentication, commonly SSH access to Linux instances",
      "To create an S3 bucket",
      "To configure CloudWatch alarms"
    ],
    answer: 1
  },
  {
    question: "11. What is an Amazon Machine Image (AMI)?",
    options: [
      "A VPC route table",
      "An IAM user",
      "A template used to launch EC2 instances",
      "A DNS hosting zone"
    ],
    answer: 2
  },
  {
    question: "12. Which AWS service provides block storage volumes for EC2?",
    options: [
      "Amazon S3",
      "Amazon EFS",
      "Amazon Glacier",
      "Amazon EBS"
    ],
    answer: 3
  },
  {
    question: "13. What happens when an EC2 instance is stopped?",
    options: [
      "The instance is stopped, and instance-store data is lost; EBS data generally persists",
      "All associated EBS volumes are always deleted",
      "The instance is automatically terminated",
      "The AMI is deleted"
    ],
    answer: 0
  },
  {
    question: "14. What is the difference between stopping and terminating an EC2 instance?",
    options: [
      "There is no difference",
      "Stopping allows an instance to be started again; terminating permanently ends that instance",
      "Terminating only restarts the instance",
      "Stopping deletes the AWS account"
    ],
    answer: 1
  },
  {
    question: "15. Which AWS service automatically adjusts EC2 capacity based on configured conditions?",
    options: [
      "AWS CloudTrail",
      "Amazon Route 53",
      "EC2 Auto Scaling",
      "AWS Artifact"
    ],
    answer: 2
  },
  {
    question: "16. What is an Elastic Load Balancer used for?",
    options: [
      "Creating IAM users",
      "Storing backups only",
      "Compiling application code",
      "Distributing incoming traffic across targets"
    ],
    answer: 3
  },
  {
    question: "17. Which AWS service is commonly used for managed relational databases?",
    options: [
      "Amazon RDS",
      "Amazon S3",
      "Amazon SQS",
      "AWS IAM"
    ],
    answer: 0
  },
  {
    question: "18. Which AWS service runs code without requiring you to manage servers?",
    options: [
      "Amazon EC2",
      "AWS Lambda",
      "Amazon EBS",
      "AWS Direct Connect"
    ],
    answer: 1
  },
  {
    question: "19. Which AWS service provides monitoring metrics and alarms?",
    options: [
      "AWS IAM",
      "Amazon Route 53",
      "Amazon CloudWatch",
      "Amazon ECR"
    ],
    answer: 2
  },
  {
    question: "20. Which AWS service records account activity and API events for auditing?",
    options: [
      "Amazon EFS",
      "Amazon Inspector",
      "AWS Glue",
      "AWS CloudTrail"
    ],
    answer: 3
  },
  {
    question: "21. What is the principle of least privilege in AWS IAM?",
    options: [
      "Grant only the permissions required to perform a task",
      "Give every user administrator access",
      "Disable all authentication",
      "Share the root account with developers"
    ],
    answer: 0
  },
  {
    question: "22. What is an IAM role?",
    options: [
      "A physical server",
      "An identity with permissions that trusted entities can assume",
      "A type of VPC subnet",
      "A storage class"
    ],
    answer: 1
  },
  {
    question: "23. What is the AWS account root user?",
    options: [
      "An ordinary IAM group",
      "A read-only monitoring role",
      "The identity created when the AWS account is established",
      "An EC2 operating-system user"
    ],
    answer: 2
  },
  {
    question: "24. What is recommended for protecting the AWS root user?",
    options: [
      "Share its credentials with the team",
      "Use it for everyday application deployments",
      "Disable all security controls",
      "Enable MFA and avoid routine use"
    ],
    answer: 3
  },
  {
    question: "25. Which AWS feature helps applications access AWS services without embedding long-term credentials?",
    options: [
      "IAM roles and temporary credentials",
      "Publicly exposing access keys",
      "Hardcoding passwords in source code",
      "Disabling IAM policies"
    ],
    answer: 0
  },
  {
    question: "26. What is a security group in AWS?",
    options: [
      "A database backup",
      "A stateful virtual firewall for supported resources",
      "An S3 storage class",
      "A DNS resolver"
    ],
    answer: 1
  },
  {
    question: "27. What is a Network ACL (NACL)?",
    options: [
      "A type of IAM user",
      "An application load balancer",
      "A stateless traffic filter associated with a VPC subnet",
      "A container registry"
    ],
    answer: 2
  },
  {
    question: "28. What is a key difference between security groups and network ACLs?",
    options: [
      "Both are always stateless",
      "Security groups apply only to S3 buckets",
      "Network ACLs cannot have deny rules",
      "Security groups are stateful; network ACLs are stateless"
    ],
    answer: 3
  },
  {
    question: "29. What is a public subnet in a VPC?",
    options: [
      "A subnet whose route table has a route to an internet gateway",
      "A subnet without any route table",
      "A subnet that automatically exposes every instance",
      "A subnet used only for RDS"
    ],
    answer: 0
  },
  {
    question: "30. What is a private subnet commonly used for?",
    options: [
      "Hosting resources that must all have public IP addresses",
      "Hosting resources that do not need direct inbound internet access",
      "Replacing IAM roles",
      "Storing CloudTrail logs only"
    ],
    answer: 1
  },
  {
    question: "31. What does an Internet Gateway provide to a VPC?",
    options: [
      "Automatic database backups",
      "Private DNS records only",
      "A connection path between a VPC and the internet when routing and other requirements are met",
      "Automatic encryption for every resource"
    ],
    answer: 2
  },
  {
    question: "32. What is a NAT Gateway commonly used for?",
    options: [
      "Allowing unsolicited internet connections directly into private instances",
      "Replacing all security groups",
      "Providing IAM credentials",
      "Allowing private subnet resources to initiate outbound IPv4 internet connections"
    ],
    answer: 3
  },
  {
    question: "33. What is a VPC route table used for?",
    options: [
      "Determining where network traffic is directed",
      "Storing EC2 passwords",
      "Managing S3 lifecycle rules",
      "Creating database schemas"
    ],
    answer: 0
  },
  {
    question: "34. What is a CIDR block such as 10.0.1.0/24 used to represent?",
    options: [
      "An IAM permission",
      "An IP address range",
      "An EC2 instance type",
      "A database engine"
    ],
    answer: 1
  },
  {
    question: "35. What is VPC peering used for?",
    options: [
      "Sharing one IAM password",
      "Copying Docker images",
      "Connecting two VPCs privately using their private IP addresses",
      "Automatically merging their CIDR ranges"
    ],
    answer: 2
  },
  {
    question: "36. What is AWS Site-to-Site VPN commonly used for?",
    options: [
      "Creating S3 storage classes",
      "Managing Lambda versions",
      "Creating IAM policies automatically",
      "Establishing encrypted network connectivity between a VPC and an external network"
    ],
    answer: 3
  },
  {
    question: "37. What is AWS Direct Connect?",
    options: [
      "A dedicated network connection between an organization and AWS",
      "A serverless database",
      "An EC2 backup tool",
      "An S3 encryption algorithm"
    ],
    answer: 0
  },
  {
    question: "38. Which AWS service provides DNS domain registration and DNS routing?",
    options: [
      "Amazon EBS",
      "Amazon Route 53",
      "AWS IAM",
      "Amazon ECR"
    ],
    answer: 1
  },
  {
    question: "39. What is Amazon CloudFront?",
    options: [
      "A relational database",
      "A virtual machine service",
      "A content delivery network (CDN)",
      "A secrets management service"
    ],
    answer: 2
  },
  {
    question: "40. What is AWS WAF used for?",
    options: [
      "Managing EBS snapshots",
      "Creating VPC subnets",
      "Running container images",
      "Filtering web requests using configured security rules"
    ],
    answer: 3
  },
  {
    question: "41. What is an S3 bucket?",
    options: [
      "A container for storing objects in Amazon S3",
      "A virtual private server",
      "A VPC route table",
      "An IAM group"
    ],
    answer: 0
  },
  {
    question: "42. What is an S3 object?",
    options: [
      "An EC2 instance",
      "Data stored in S3 along with its key and metadata",
      "A subnet route",
      "An IAM role"
    ],
    answer: 1
  },
  {
    question: "43. What does S3 Versioning help with?",
    options: [
      "Increasing EC2 CPU capacity",
      "Creating VPC peering connections",
      "Keeping multiple versions of an object",
      "Automatically fixing application bugs"
    ],
    answer: 2
  },
  {
    question: "44. What is the purpose of an S3 lifecycle policy?",
    options: [
      "To create IAM users",
      "To assign public IP addresses",
      "To configure EC2 instance types",
      "To transition or expire objects according to configured rules"
    ],
    answer: 3
  },
  {
    question: "45. Which S3 storage class is designed for frequently accessed data?",
    options: [
      "S3 Standard",
      "S3 Glacier Deep Archive",
      "S3 Glacier Flexible Retrieval",
      "S3 One Zone-IA"
    ],
    answer: 0
  },
  {
    question: "46. Which S3 storage class is designed for long-term archival with very low storage cost and slower retrieval?",
    options: [
      "S3 Standard",
      "S3 Glacier Deep Archive",
      "S3 Express One Zone",
      "S3 Standard-IA"
    ],
    answer: 1
  },
  {
    question: "47. What does S3 Block Public Access help prevent?",
    options: [
      "All authorized access to every bucket",
      "All object uploads",
      "Public exposure of S3 data through covered public access settings",
      "All lifecycle transitions"
    ],
    answer: 2
  },
  {
    question: "48. What is an S3 presigned URL?",
    options: [
      "A permanent public URL that never expires",
      "An EC2 login credential",
      "A VPC endpoint",
      "A time-limited URL that grants specified access to an S3 operation"
    ],
    answer: 3
  },
  {
    question: "49. What is S3 server-side encryption?",
    options: [
      "Encryption of object data by S3 after receiving it",
      "Encryption of EC2 CPU instructions",
      "A method of assigning IP addresses",
      "A type of DNS routing"
    ],
    answer: 0
  },
  {
    question: "50. Which AWS service helps centrally manage encryption keys?",
    options: [
      "Amazon Route 53",
      "AWS Key Management Service (KMS)",
      "Amazon ECR",
      "AWS CloudShell"
    ],
    answer: 1
  },
  {
    question: "51. What is Amazon EFS?",
    options: [
      "A DNS management service",
      "A serverless function runtime",
      "A managed elastic file storage service",
      "A container image registry"
    ],
    answer: 2
  },
  {
    question: "52. What is an EBS snapshot?",
    options: [
      "An IAM access key",
      "A DNS routing policy",
      "A running container",
      "A point-in-time backup of an EBS volume"
    ],
    answer: 3
  },
  {
    question: "53. What is Amazon RDS Multi-AZ primarily designed to improve?",
    options: [
      "Database availability and failover resilience",
      "Frontend page rendering",
      "IAM user creation speed",
      "S3 object compression"
    ],
    answer: 0
  },
  {
    question: "54. What is an RDS read replica primarily used for?",
    options: [
      "Replacing every database backup",
      "Scaling read workloads and supporting certain replication use cases",
      "Providing DNS hosting",
      "Running EC2 operating systems"
    ],
    answer: 1
  },
  {
    question: "55. Which AWS database service is a managed relational database service?",
    options: [
      "Amazon SQS",
      "Amazon CloudFront",
      "Amazon RDS",
      "Amazon SNS"
    ],
    answer: 2
  },
  {
    question: "56. Which AWS database service is a managed NoSQL key-value and document database?",
    options: [
      "Amazon RDS",
      "Amazon Redshift",
      "Amazon EBS",
      "Amazon DynamoDB"
    ],
    answer: 3
  },
  {
    question: "57. What is Amazon Aurora?",
    options: [
      "A relational database engine compatible with MySQL and PostgreSQL",
      "A container orchestration service",
      "A DNS resolver",
      "A file transfer protocol"
    ],
    answer: 0
  },
  {
    question: "58. What is the purpose of automated RDS backups?",
    options: [
      "To create additional IAM users",
      "To support point-in-time recovery within the configured backup retention period",
      "To publish database ports publicly",
      "To replace database access controls"
    ],
    answer: 1
  },
  {
    question: "59. Which AWS service is designed for data warehousing and analytics?",
    options: [
      "Amazon Route 53",
      "Amazon EBS",
      "Amazon Redshift",
      "AWS IAM"
    ],
    answer: 2
  },
  {
    question: "60. What is a database parameter group in RDS?",
    options: [
      "A collection of IAM users",
      "A VPC subnet group only",
      "A container image repository",
      "A collection of database engine configuration parameters"
    ],
    answer: 3
  },
  {
    question: "61. What triggers an AWS Lambda function?",
    options: [
      "An event or invocation request from a supported source",
      "Only an EC2 instance reboot",
      "Only a manual operating system login",
      "Only a VPC route table update"
    ],
    answer: 0
  },
  {
    question: "62. What is an API Gateway commonly used for with Lambda?",
    options: [
      "Creating EBS snapshots",
      "Exposing and managing APIs that invoke backend integrations",
      "Encrypting EC2 disks automatically",
      "Creating IAM users"
    ],
    answer: 1
  },
  {
    question: "63. Which AWS service provides a managed message queue?",
    options: [
      "Amazon CloudFront",
      "Amazon Route 53",
      "Amazon SQS",
      "Amazon EBS"
    ],
    answer: 2
  },
  {
    question: "64. Which AWS service provides a publish/subscribe notification service?",
    options: [
      "Amazon EFS",
      "Amazon EC2",
      "Amazon RDS",
      "Amazon SNS"
    ],
    answer: 3
  },
  {
    question: "65. What is the main purpose of Amazon EventBridge?",
    options: [
      "Routing events between event sources and targets",
      "Hosting virtual machines only",
      "Managing EBS disk partitions",
      "Replacing IAM authentication"
    ],
    answer: 0
  },
  {
    question: "66. What is AWS Step Functions used for?",
    options: [
      "Creating DNS records only",
      "Orchestrating workflows across services and tasks",
      "Replacing S3 storage",
      "Managing physical networking cables"
    ],
    answer: 1
  },
  {
    question: "67. Which AWS service manages Kubernetes clusters?",
    options: [
      "Amazon Inspector",
      "AWS Config",
      "Amazon EKS",
      "Amazon SES"
    ],
    answer: 2
  },
  {
    question: "68. Which AWS service provides a managed container image registry?",
    options: [
      "Amazon EFS",
      "Amazon Route 53",
      "Amazon CloudWatch",
      "Amazon ECR"
    ],
    answer: 3
  },
  {
    question: "69. Which AWS service provides a managed container orchestration option based on ECS?",
    options: [
      "Amazon ECS",
      "Amazon S3",
      "AWS KMS",
      "Amazon SNS"
    ],
    answer: 0
  },
  {
    question: "70. What is AWS Fargate?",
    options: [
      "A DNS routing policy",
      "A serverless compute engine for supported containers",
      "An object storage class",
      "A relational database engine"
    ],
    answer: 1
  },
  {
    question: "71. What is an ECS task definition?",
    options: [
      "A VPC internet gateway",
      "An IAM password policy",
      "A blueprint describing containers and their runtime configuration for ECS tasks",
      "An S3 lifecycle rule"
    ],
    answer: 2
  },
  {
    question: "72. What does an EKS node group provide?",
    options: [
      "An S3 bucket policy",
      "A CloudTrail event",
      "A DNS hosted zone",
      "A group of worker nodes managed for an EKS cluster"
    ],
    answer: 3
  },
  {
    question: "73. Which AWS service can help manage application configuration and secrets?",
    options: [
      "AWS Systems Manager Parameter Store",
      "Amazon Route 53",
      "Amazon EBS",
      "Amazon CloudFront"
    ],
    answer: 0
  },
  {
    question: "74. Which AWS service is specifically designed to manage secrets such as database credentials?",
    options: [
      "Amazon ECR",
      "AWS Secrets Manager",
      "Amazon VPC",
      "Amazon SQS"
    ],
    answer: 1
  },
  {
    question: "75. What is AWS Systems Manager Session Manager useful for?",
    options: [
      "Creating S3 storage classes",
      "Registering domain names",
      "Managing supported instances through a browser or CLI session without requiring inbound SSH access",
      "Building container images"
    ],
    answer: 2
  },
  {
    question: "76. Which AWS service can assess workloads for software vulnerabilities and unintended network exposure?",
    options: [
      "Amazon Route 53",
      "Amazon SNS",
      "Amazon EFS",
      "Amazon Inspector"
    ],
    answer: 3
  },
  {
    question: "77. What is AWS Config used for?",
    options: [
      "Recording resource configurations and evaluating them against rules",
      "Running containers without servers",
      "Creating DNS domain registrations",
      "Compiling application source code"
    ],
    answer: 0
  },
  {
    question: "78. Which AWS service provides threat detection by analyzing relevant activity and data sources?",
    options: [
      "Amazon EBS",
      "Amazon GuardDuty",
      "Amazon EFS",
      "Amazon Route 53"
    ],
    answer: 1
  },
  {
    question: "79. What is AWS Security Hub used for?",
    options: [
      "Hosting relational databases",
      "Building Docker images",
      "Aggregating and prioritizing security findings from supported services and checks",
      "Assigning private IP addresses"
    ],
    answer: 2
  },
  {
    question: "80. What is AWS Organizations used for?",
    options: [
      "Running individual Linux processes",
      "Creating container images only",
      "Replacing all IAM policies",
      "Centrally managing multiple AWS accounts"
    ],
    answer: 3
  },
  {
    question: "81. What is an AWS Organizations Service Control Policy (SCP) used for?",
    options: [
      "Setting permission guardrails for accounts or organizational units",
      "Granting every user administrator permissions",
      "Creating S3 object versions",
      "Increasing EC2 CPU speed"
    ],
    answer: 0
  },
  {
    question: "82. Which AWS service helps estimate expected AWS charges before deploying resources?",
    options: [
      "AWS CloudTrail",
      "AWS Pricing Calculator",
      "Amazon ECR",
      "AWS Config"
    ],
    answer: 1
  },
  {
    question: "83. Which AWS service helps track spending and analyze costs?",
    options: [
      "Amazon EKS",
      "Amazon SNS",
      "AWS Cost Explorer",
      "Amazon EBS"
    ],
    answer: 2
  },
  {
    question: "84. What is AWS Budgets used for?",
    options: [
      "Creating security groups",
      "Deploying Kubernetes pods",
      "Storing database records",
      "Setting cost or usage thresholds and receiving alerts"
    ],
    answer: 3
  },
  {
    question: "85. Which AWS service supports creating infrastructure using templates and stacks?",
    options: [
      "AWS CloudFormation",
      "Amazon Route 53",
      "Amazon EFS",
      "AWS CloudTrail"
    ],
    answer: 0
  },
  {
    question: "86. What is AWS CodeBuild used for?",
    options: [
      "Managing DNS records",
      "Building and testing source code in a managed build environment",
      "Storing relational database backups only",
      "Creating IAM users automatically"
    ],
    answer: 1
  },
  {
    question: "87. What is AWS CodePipeline used for?",
    options: [
      "Assigning EC2 public IP addresses",
      "Managing S3 encryption keys only",
      "Automating stages in a software release pipeline",
      "Replacing all source control systems"
    ],
    answer: 2
  },
  {
    question: "88. Which AWS service provides managed Git-based source repositories as part of AWS developer tools?",
    options: [
      "Amazon CloudFront",
      "Amazon RDS",
      "Amazon EBS",
      "AWS CodeCommit"
    ],
    answer: 3
  },
  {
    question: "89. What is AWS CloudFormation drift detection used for?",
    options: [
      "Identifying differences between a stack's expected configuration and actual resource configuration",
      "Automatically repairing every application bug",
      "Creating DNS zones",
      "Increasing database storage automatically in all cases"
    ],
    answer: 0
  },
  {
    question: "90. Which AWS service provides centralized collection and analysis of logs, metrics, and traces?",
    options: [
      "Amazon ECR",
      "Amazon CloudWatch",
      "Amazon VPC",
      "AWS Organizations"
    ],
    answer: 1
  },
  {
    question: "91. An EC2 instance cannot be reached over SSH. What should you check first?",
    options: [
      "Only the instance name",
      "Only the S3 bucket region",
      "Instance state, network routes, public IP or access path, security groups, NACLs, and SSH credentials",
      "Only the CloudWatch dashboard color"
    ],
    answer: 2
  },
  {
    question: "92. An EC2 instance has no internet access from a private subnet. What should you investigate?",
    options: [
      "Only the EC2 instance tag",
      "Only the S3 object version",
      "Only the IAM group name",
      "Route tables, NAT Gateway, subnet configuration, and security rules"
    ],
    answer: 3
  },
  {
    question: "93. An application behind an Application Load Balancer returns unhealthy targets. What should you investigate?",
    options: [
      "Health-check path and port, target application health, security rules, and response codes",
      "Only the S3 bucket name",
      "Only the AWS account alias",
      "Only the EC2 AMI description"
    ],
    answer: 0
  },
  {
    question: "94. An application receives AccessDenied when accessing an S3 object. What should you check?",
    options: [
      "Only the EC2 instance size",
      "IAM permissions, bucket policy, object ownership, encryption permissions, and applicable access controls",
      "Only the Route 53 record type",
      "Only the VPC CIDR length"
    ],
    answer: 1
  },
  {
    question: "95. An RDS database connection fails from an EC2 application. What should you check?",
    options: [
      "Only the database display name",
      "Only the EC2 AMI creation date",
      "Database endpoint and port, security groups, subnet routing, credentials, and database availability",
      "Only the S3 lifecycle policy"
    ],
    answer: 2
  },
  {
    question: "96. An AWS Lambda function fails repeatedly. Which information is useful for troubleshooting?",
    options: [
      "Only the AWS account nickname",
      "Only the function's display color",
      "Only the S3 bucket creation date",
      "CloudWatch logs, error messages, timeout, permissions, configuration, and downstream dependencies"
    ],
    answer: 3
  },
  {
    question: "97. An EC2 instance's CPU usage is consistently high. What is a good response?",
    options: [
      "Review CloudWatch metrics and application processes, then scale or optimize based on evidence",
      "Delete all IAM roles immediately",
      "Disable monitoring",
      "Make the instance publicly accessible without restrictions"
    ],
    answer: 0
  },
  {
    question: "98. How can an application improve availability across an AWS Region?",
    options: [
      "Run everything in one Availability Zone without backups",
      "Deploy across multiple Availability Zones and configure suitable load balancing and recovery",
      "Disable health checks",
      "Store all persistent data only on temporary instance storage"
    ],
    answer: 1
  },
  {
    question: "99. What is a key benefit of Infrastructure as Code in AWS?",
    options: [
      "It eliminates the need for security reviews",
      "It guarantees zero failures",
      "It enables repeatable, reviewable, and automated infrastructure provisioning",
      "It replaces application monitoring"
    ],
    answer: 2
  },
  {
    question: "100. What should be considered when running production workloads on AWS?",
    options: [
      "Only the EC2 instance name",
      "Only the number of S3 buckets",
      "Only the region selected during account creation",
      "Security, high availability, monitoring, backups, cost, scaling, and disaster recovery"
    ],
    answer: 3
  }
];
