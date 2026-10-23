export interface AWSQuestion {
  question: string;
  options: string[];
  answer: number;
}

export const awsQuestions: AWSQuestion[] = [
  // 1–10: AWS Fundamentals and Compute
  {
    question: "Which AWS service provides resizable virtual servers?",
    options: ["Amazon S3", "Amazon EC2", "AWS Lambda", "Amazon Route 53"],
    answer: 1
  },
  {
    question: "Which EC2 purchasing option is best for fault-tolerant workloads with flexible timing?",
    options: ["On-Demand", "Dedicated Hosts", "Spot Instances", "Reserved Instances"],
    answer: 2
  },
  {
    question: "Which EC2 feature automatically replaces unhealthy instances to maintain capacity?",
    options: ["Auto Scaling group", "Elastic IP", "Placement group", "AMI"],
    answer: 0
  },
  {
    question: "What is an Amazon Machine Image (AMI) used for?",
    options: ["Monitoring CPU metrics", "Managing DNS records", "Encrypting API requests", "Launching EC2 instances with a predefined configuration"],
    answer: 3
  },
  {
    question: "Which AWS service runs code in response to events without requiring server management?",
    options: ["Amazon EC2", "AWS Lambda", "AWS Direct Connect", "Amazon EBS"],
    answer: 1
  },
  {
    question: "Which AWS service provides managed container orchestration?",
    options: ["Amazon EFS", "Amazon Athena", "Amazon ECS", "AWS Artifact"],
    answer: 2
  },
  {
    question: "Which option lets Amazon ECS run containers without managing the underlying servers?",
    options: ["AWS Fargate", "Amazon EBS", "AWS CloudTrail", "Amazon Route 53"],
    answer: 0
  },
  {
    question: "What is an Availability Zone?",
    options: ["A global DNS service", "An AWS billing category", "A type of IAM policy", "An isolated location within an AWS Region"],
    answer: 3
  },
  {
    question: "What is the primary benefit of deploying an application across multiple Availability Zones?",
    options: ["Automatic code compilation", "Improved availability and fault tolerance", "Unlimited database storage", "Elimination of all network latency"],
    answer: 1
  },
  {
    question: "Which AWS service provides a managed application platform for deploying web applications?",
    options: ["AWS KMS", "Amazon Inspector", "AWS Elastic Beanstalk", "Amazon SQS"],
    answer: 2
  },

  // 11–20: Storage and Backup
  {
    question: "Which AWS service provides scalable object storage?",
    options: ["Amazon S3", "Amazon EBS", "Amazon EFS", "Amazon EC2"],
    answer: 0
  },
  {
    question: "Which storage service provides persistent block storage for EC2 instances?",
    options: ["Amazon S3 Glacier", "Amazon EBS", "Amazon SQS", "Amazon CloudFront"],
    answer: 1
  },
  {
    question: "Which AWS service provides a managed shared file system for Linux workloads?",
    options: ["Amazon EBS", "Amazon S3", "Amazon EFS", "Amazon SQS"],
    answer: 2
  },
  {
    question: "Which S3 storage class is designed for frequently accessed data?",
    options: ["S3 Glacier Deep Archive", "S3 One Zone-IA", "S3 Glacier Flexible Retrieval", "S3 Standard"],
    answer: 3
  },
  {
    question: "Which S3 feature automatically moves objects between storage classes based on rules?",
    options: ["S3 Lifecycle", "S3 Object Lock", "S3 Transfer Acceleration", "S3 Inventory"],
    answer: 0
  },
  {
    question: "Which S3 feature helps protect objects from deletion or overwrite for a retention period?",
    options: ["S3 Select", "S3 Object Lock", "S3 Transfer Acceleration", "S3 Event Notifications"],
    answer: 1
  },
  {
    question: "What is the main purpose of S3 versioning?",
    options: ["Assign public IP addresses", "Increase EC2 CPU capacity", "Keep multiple versions of an object", "Create VPC peering connections"],
    answer: 2
  },
  {
    question: "Which AWS service centrally manages backups across supported AWS resources?",
    options: ["AWS CloudTrail", "Amazon Route 53", "AWS CodeBuild", "AWS Backup"],
    answer: 3
  },
  {
    question: "What does an EBS snapshot primarily capture?",
    options: ["A point-in-time backup of an EBS volume", "An IAM user's password", "A Route 53 hosted zone", "A live packet capture of a VPC"],
    answer: 0
  },
  {
    question: "Which storage service is designed for long-term archival with very low storage cost?",
    options: ["Amazon EFS Standard", "Amazon S3 Glacier Deep Archive", "Amazon EBS Provisioned IOPS", "EC2 Instance Store"],
    answer: 1
  },

  // 21–30: Networking and VPC
  {
    question: "Which AWS service creates a logically isolated virtual network?",
    options: ["AWS IAM", "Amazon S3", "Amazon VPC", "Amazon SQS"],
    answer: 2
  },
  {
    question: "What enables a public subnet to route traffic to the internet?",
    options: ["A route to an internet gateway", "An S3 bucket policy", "An EBS snapshot", "An IAM permissions boundary"],
    answer: 0
  },
  {
    question: "What is the primary purpose of a NAT Gateway?",
    options: ["Allow unsolicited inbound connections to private instances", "Provide managed database backups", "Replace all security groups", "Allow private subnet resources to initiate outbound IPv4 internet connections"],
    answer: 3
  },
  {
    question: "How do security groups differ from network ACLs?",
    options: ["Both are always stateless", "Security groups are stateful; network ACLs are stateless", "Network ACLs apply only to IAM users", "Security groups cannot filter traffic"],
    answer: 1
  },
  {
    question: "Which AWS load balancer supports HTTP host-based and path-based routing?",
    options: ["Gateway Load Balancer", "Network Load Balancer", "Application Load Balancer", "NAT Gateway"],
    answer: 2
  },
  {
    question: "Which load balancer is suited to high-performance TCP and UDP traffic at Layer 4?",
    options: ["Network Load Balancer", "Application Load Balancer", "Amazon CloudFront", "AWS WAF"],
    answer: 0
  },
  {
    question: "Which AWS service provides managed DNS and domain routing?",
    options: ["AWS Config", "Amazon CloudWatch", "AWS KMS", "Amazon Route 53"],
    answer: 3
  },
  {
    question: "What is VPC peering primarily used for?",
    options: ["Automatically merging two VPCs into one", "Private IP connectivity between two VPCs, subject to routing constraints", "Replacing IAM policies", "Providing object storage"],
    answer: 1
  },
  {
    question: "Which service simplifies connectivity between multiple VPCs and on-premises networks?",
    options: ["Amazon Athena", "Amazon EBS", "AWS Transit Gateway", "AWS Artifact"],
    answer: 2
  },
  {
    question: "Which AWS service provides dedicated private network connectivity from an on-premises data center to AWS?",
    options: ["AWS Direct Connect", "Amazon CloudFront", "Amazon SQS", "AWS WAF"],
    answer: 0
  },

  // 31–40: IAM and Security
  {
    question: "Which AWS service manages identities, roles, and permissions?",
    options: ["AWS Config", "AWS IAM", "Amazon EFS", "Amazon Redshift"],
    answer: 1
  },
  {
    question: "What does the principle of least privilege mean?",
    options: ["Give every user administrator access", "Share one access key across all teams", "Grant only the permissions required for a task", "Disable all audit logging"],
    answer: 2
  },
  {
    question: "What is the primary purpose of an IAM role?",
    options: ["Create a public subnet", "Store database records", "Assign a permanent password to every service", "Provide temporary credentials to an authorized principal"],
    answer: 3
  },
  {
    question: "Which AWS service manages encryption keys?",
    options: ["AWS Key Management Service (KMS)", "Amazon Route 53", "AWS CodeDeploy", "Amazon EFS"],
    answer: 0
  },
  {
    question: "Which service helps detect potentially malicious or anomalous activity in AWS accounts?",
    options: ["AWS Glue", "Amazon GuardDuty", "AWS Artifact", "Amazon Lightsail"],
    answer: 1
  },
  {
    question: "Which AWS service assesses supported workloads for software vulnerabilities?",
    options: ["AWS Organizations", "Amazon SQS", "Amazon Inspector", "Amazon Route 53"],
    answer: 2
  },
  {
    question: "Which service filters HTTP and HTTPS requests to protect web applications?",
    options: ["AWS KMS", "Amazon EBS", "AWS Backup", "AWS WAF"],
    answer: 3
  },
  {
    question: "Which service helps protect AWS applications against distributed denial-of-service attacks?",
    options: ["AWS Shield", "AWS Glue", "Amazon Athena", "AWS CodeArtifact"],
    answer: 0
  },
  {
    question: "Which service records AWS API activity for auditing?",
    options: ["Amazon CloudWatch", "AWS CloudTrail", "Amazon EFS", "AWS Fargate"],
    answer: 1
  },
  {
    question: "What is the primary purpose of AWS Secrets Manager?",
    options: ["Create container images", "Configure DNS routing", "Store, retrieve, and manage secrets such as database credentials", "Provision VPC subnets"],
    answer: 2
  },

  // 41–50: Databases and Analytics
  {
    question: "Which AWS service provides managed relational databases?",
    options: ["Amazon RDS", "Amazon S3", "Amazon SQS", "Amazon CloudFront"],
    answer: 0
  },
  {
    question: "Which AWS service provides a managed NoSQL key-value and document database?",
    options: ["Amazon Redshift", "Amazon DynamoDB", "Amazon EBS", "Amazon Route 53"],
    answer: 1
  },
  {
    question: "Which AWS service is designed for cloud data warehousing and analytical SQL queries?",
    options: ["Amazon SQS", "Amazon EFS", "Amazon Redshift", "AWS IAM"],
    answer: 2
  },
  {
    question: "Which service queries data in Amazon S3 using SQL without managing query servers?",
    options: ["Amazon RDS", "Amazon EKS", "AWS Direct Connect", "Amazon Athena"],
    answer: 3
  },
  {
    question: "What is the main purpose of an RDS Multi-AZ deployment?",
    options: ["Improve database availability through standby infrastructure and failover", "Automatically make every database table public", "Replace database authentication", "Eliminate the need for database backups"],
    answer: 0
  },
  {
    question: "Which Amazon RDS feature helps distribute read traffic across database replicas?",
    options: ["IAM Access Analyzer", "Read replicas", "VPC peering", "S3 Lifecycle"],
    answer: 1
  },
  {
    question: "Which AWS service is designed for managed Apache Spark processing?",
    options: ["Amazon Route 53", "AWS Shield", "Amazon EMR", "Amazon EBS"],
    answer: 2
  },
  {
    question: "Which AWS service helps build, operate, and govern data pipelines and data catalogs?",
    options: ["Amazon CloudFront", "AWS WAF", "AWS Shield", "AWS Glue"],
    answer: 3
  },
  {
    question: "Which AWS service provides a managed, MySQL- and PostgreSQL-compatible relational database engine?",
    options: ["Amazon Aurora", "Amazon SQS", "Amazon EFS", "Amazon CloudWatch"],
    answer: 0
  },
  {
    question: "Which AWS service provides a managed in-memory cache compatible with Redis or Memcached engines?",
    options: ["Amazon Athena", "Amazon ElastiCache", "Amazon EBS", "AWS Config"],
    answer: 1
  },

  // 51–60: Monitoring and Messaging
  {
    question: "Which AWS service collects metrics, logs, and alarms for AWS resources?",
    options: ["AWS CloudTrail", "AWS Artifact", "Amazon CloudWatch", "Amazon Inspector"],
    answer: 2
  },
  {
    question: "Which service can notify subscribers when a CloudWatch alarm changes state?",
    options: ["Amazon EBS", "Amazon EFS", "AWS Config", "Amazon SNS"],
    answer: 3
  },
  {
    question: "Which AWS service provides a durable message queue for decoupling application components?",
    options: ["Amazon SQS", "Amazon Route 53", "Amazon EBS", "AWS KMS"],
    answer: 0
  },
  {
    question: "What is the primary purpose of Amazon SNS?",
    options: ["Provision virtual machines", "Publish messages to subscribers using a publish/subscribe model", "Create relational database indexes", "Manage Kubernetes worker nodes"],
    answer: 1
  },
  {
    question: "Which AWS service helps capture distributed traces across application components?",
    options: ["AWS Artifact", "Amazon S3 Glacier", "AWS X-Ray", "AWS Backup"],
    answer: 2
  },
  {
    question: "Which service evaluates AWS resource configurations against desired rules?",
    options: ["Amazon SQS", "AWS Lambda@Edge", "Amazon EFS", "AWS Config"],
    answer: 3
  },
  {
    question: "Which AWS service can route events from AWS services and applications to targets based on rules?",
    options: ["Amazon EventBridge", "Amazon EBS", "AWS Direct Connect", "Amazon EFS"],
    answer: 0
  },
  {
    question: "Which AWS service provides centralized visibility into security findings from multiple AWS services?",
    options: ["Amazon Route 53", "AWS Security Hub", "Amazon EFS", "AWS CodeDeploy"],
    answer: 1
  },
  {
    question: "Which AWS service provides recommendations to improve cost, performance, security, and reliability?",
    options: ["Amazon SQS", "AWS WAF", "AWS Trusted Advisor", "Amazon EBS"],
    answer: 2
  },
  {
    question: "Which AWS service helps manage operational tasks and automate runbooks across AWS resources?",
    options: ["Amazon CloudFront", "AWS Artifact", "Amazon Redshift", "AWS Systems Manager"],
    answer: 3
  },

  // 61–70: Infrastructure as Code and DevOps
  {
    question: "Which AWS service provisions infrastructure using declarative templates?",
    options: ["AWS CloudFormation", "Amazon CloudWatch", "AWS Shield", "Amazon Athena"],
    answer: 0
  },
  {
    question: "Which AWS service provides a managed Git-based repository for source code?",
    options: ["AWS CodeDeploy", "AWS CodeCommit", "Amazon Inspector", "AWS Config"],
    answer: 1
  },
  {
    question: "Which AWS service builds and tests source code in a managed build environment?",
    options: ["AWS CodeArtifact", "Amazon CloudFront", "AWS CodeBuild", "Amazon Route 53"],
    answer: 2
  },
  {
    question: "Which AWS service automates application deployments to supported compute environments?",
    options: ["Amazon Athena", "AWS KMS", "Amazon EFS", "AWS CodeDeploy"],
    answer: 3
  },
  {
    question: "Which AWS service orchestrates build, test, and deployment stages in a release pipeline?",
    options: ["AWS CodePipeline", "AWS CloudTrail", "Amazon EBS", "AWS Shield"],
    answer: 0
  },
  {
    question: "Which AWS service manages private package repositories for software dependencies?",
    options: ["AWS Config", "AWS CodeArtifact", "Amazon Route 53", "Amazon CloudWatch"],
    answer: 1
  },
  {
    question: "Which AWS service provides a managed Kubernetes control plane?",
    options: ["Amazon ECS", "AWS Batch", "Amazon EKS", "AWS Elastic Beanstalk"],
    answer: 2
  },
  {
    question: "Which AWS service provides a managed container image registry?",
    options: ["Amazon EFS", "Amazon SQS", "AWS CloudTrail", "Amazon ECR"],
    answer: 3
  },
  {
    question: "What is the main purpose of an AWS CloudFormation change set?",
    options: ["Preview proposed stack changes before applying them", "Rotate every IAM user's password automatically", "Delete all resources in a Region", "Create a public DNS zone"],
    answer: 0
  },
  {
    question: "What is the primary purpose of Terraform state when managing AWS infrastructure?",
    options: ["Store application passwords in plain text", "Track managed resources and map configuration to real infrastructure", "Replace all AWS APIs", "Act as a load balancer"],
    answer: 1
  },

  // 71–80: Advanced Networking and Access
  {
    question: "Which AWS service provides an application-level content delivery network?",
    options: ["Amazon EBS", "AWS Config", "Amazon CloudFront", "Amazon SQS"],
    answer: 2
  },
  {
    question: "What is the primary purpose of an S3 VPC endpoint?",
    options: ["Create a public IP for every EC2 instance", "Replace S3 bucket policies in all cases", "Provide a managed SQL database", "Allow VPC resources to access S3 through AWS network paths without requiring an internet gateway or NAT for that access"],
    answer: 3
  },
  {
    question: "Which AWS service provides private connectivity to supported AWS services without using public IP addresses?",
    options: ["AWS PrivateLink", "Amazon CloudFront", "AWS Shield", "Amazon S3 Glacier"],
    answer: 0
  },
  {
    question: "What is the purpose of an Elastic IP address?",
    options: ["Encrypt an EBS volume", "Provide a static public IPv4 address that can be associated with supported resources", "Create a database replica", "Store CloudTrail logs"],
    answer: 1
  },
  {
    question: "Which service helps distribute incoming DNS requests across endpoints using health checks and routing policies?",
    options: ["Amazon EFS", "AWS KMS", "Amazon Route 53", "Amazon ECR"],
    answer: 2
  },
  {
    question: "What is the purpose of a VPC flow log?",
    options: ["Record all application source code changes", "Store EC2 AMIs", "Replace CloudTrail API auditing", "Capture information about IP traffic to and from network interfaces"],
    answer: 3
  },
  {
    question: "Which AWS service establishes an encrypted connection between an on-premises network and a VPC over the internet?",
    options: ["AWS Site-to-Site VPN", "Amazon CloudFront", "AWS CodeBuild", "Amazon Athena"],
    answer: 0
  },
  {
    question: "What is the purpose of a route table in a VPC?",
    options: ["Manage IAM passwords", "Determine where network traffic is directed", "Store application logs", "Encrypt database columns"],
    answer: 1
  },
  {
    question: "Which VPC component allows instances in a private subnet to communicate with resources in a public subnet when routes and security rules permit?",
    options: ["S3 bucket", "IAM permission boundary", "VPC local route", "CloudWatch alarm"],
    answer: 2
  },
  {
    question: "What is the primary purpose of AWS Network Firewall?",
    options: ["Compile application source code", "Create managed SQL databases", "Store long-term backups", "Inspect and filter network traffic for VPC protection"],
    answer: 3
  },

  // 81–90: Governance, Cost, and Resilience
  {
    question: "Which AWS service helps centrally manage multiple AWS accounts?",
    options: ["AWS Organizations", "Amazon EFS", "Amazon Athena", "AWS CodeDeploy"],
    answer: 0
  },
  {
    question: "Which AWS service helps set up and govern a multi-account landing zone?",
    options: ["Amazon SQS", "AWS Control Tower", "Amazon EBS", "Amazon CloudFront"],
    answer: 1
  },
  {
    question: "Which AWS feature can restrict the maximum permissions available to principals in member accounts?",
    options: ["S3 Lifecycle rules", "CloudWatch dashboards", "Service control policies (SCPs)", "EBS snapshots"],
    answer: 2
  },
  {
    question: "Which AWS service provides access to compliance reports and agreements?",
    options: ["Amazon Inspector", "Amazon Athena", "AWS Fargate", "AWS Artifact"],
    answer: 3
  },
  {
    question: "Which AWS service helps estimate expected costs before deploying a planned architecture?",
    options: ["AWS Pricing Calculator", "AWS CloudTrail", "Amazon GuardDuty", "Amazon ECR"],
    answer: 0
  },
  {
    question: "Which AWS tool helps analyze historical spending and usage patterns?",
    options: ["AWS CodeBuild", "AWS Cost Explorer", "Amazon Route 53", "AWS WAF"],
    answer: 1
  },
  {
    question: "What does an AWS budget alert help you do?",
    options: ["Automatically eliminate every AWS charge", "Guarantee zero future spending", "Receive notifications when spending or usage approaches defined thresholds", "Replace IAM policies"],
    answer: 2
  },
  {
    question: "What does a Recovery Point Objective (RPO) define?",
    options: ["The maximum number of EC2 instances", "The maximum network bandwidth", "The time required to deploy a container", "The acceptable amount of data loss measured in time"],
    answer: 3
  },
  {
    question: "What does a Recovery Time Objective (RTO) define?",
    options: ["The target time to restore a service after disruption", "The number of retained S3 versions", "The maximum IAM policy size", "The number of Availability Zones in a Region"],
    answer: 0
  },
  {
    question: "Which AWS capability helps replicate supported resources and recover workloads in another Region?",
    options: ["Security groups only", "Cross-Region disaster recovery architecture", "IAM access keys only", "CloudWatch dashboards only"],
    answer: 1
  },

  // 91–100: Serverless, Integration, and Real-World Scenarios
  {
    question: "Which AWS service helps coordinate multiple serverless functions into workflows?",
    options: ["Amazon EBS", "AWS Artifact", "AWS Step Functions", "Amazon Route 53"],
    answer: 2
  },
  {
    question: "Which AWS service provides managed message streaming using Apache Kafka?",
    options: ["Amazon SQS", "Amazon SNS", "AWS CodeArtifact", "Amazon MSK"],
    answer: 3
  },
  {
    question: "Which AWS service provides a managed Apache Kafka-compatible streaming platform based on Kafka?",
    options: ["Amazon MSK", "Amazon EFS", "AWS Backup", "Amazon Inspector"],
    answer: 0
  },
  {
    question: "Which AWS service lets applications publish and consume events through a managed event bus?",
    options: ["Amazon EBS", "Amazon EventBridge", "AWS KMS", "Amazon Redshift"],
    answer: 1
  },
  {
    question: "An application needs to process uploaded S3 objects automatically. Which approach is suitable?",
    options: ["Manually restart the EC2 instance for every upload", "Disable S3 event notifications", "Trigger a Lambda function from an S3 object-created event", "Store the object in an IAM policy"],
    answer: 2
  },
  {
    question: "An EC2 instance must access S3 without storing long-term access keys on the server. What should you use?",
    options: ["Hardcoded root credentials", "A shared access key in source code", "An unrestricted public bucket", "An IAM role attached to the EC2 instance"],
    answer: 3
  },
  {
    question: "A web application must scale automatically and distribute requests across healthy EC2 instances. Which combination is appropriate?",
    options: ["Application Load Balancer and EC2 Auto Scaling", "CloudTrail and AWS Artifact", "EBS snapshots and S3 Lifecycle", "IAM users and Route 53 private hosted zones only"],
    answer: 0
  },
  {
    question: "An application in a private subnet needs outbound internet access for software updates. What is a common solution?",
    options: ["Assign every instance a private IP only", "Configure a NAT Gateway and appropriate route tables", "Remove the subnet route table", "Disable all security groups"],
    answer: 1
  },
  {
    question: "A company needs to preserve audit evidence of AWS API calls for security investigations. Which service should it configure?",
    options: ["Amazon EFS", "AWS Elastic Beanstalk", "AWS CloudTrail", "Amazon ElastiCache"],
    answer: 2
  },
  {
    question: "A production workload needs highly available architecture across Availability Zones. Which design is most appropriate?",
    options: ["Run everything on one EC2 instance in one AZ", "Keep the only backup on the same instance", "Use a single database without recovery planning", "Distribute supported application components across multiple AZs and design for failover"],
    answer: 3
  }
];
