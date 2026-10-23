export interface AwsAdvancedQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export const aws-advancedQuestions: aws-advancedQuestion[] = [
  {
    id: "aws-advanced-1",
    question: "What is the main purpose of an AWS Transit Gateway?",
    options: [
      "To connect multiple VPCs and on-premises networks through a central hub",
      "To store objects in S3",
      "To build Docker images",
      "To manage application source code"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-2",
    question: "What is VPC Peering?",
    options: [
      "A connection between two VPCs using private IP routing",
      "A method for copying AMIs",
      "A database replication service",
      "A service for managing IAM users"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-3",
    question: "Can VPC Peering provide transitive routing through a third VPC?",
    options: [
      "Yes, automatically",
      "Only within the same subnet",
      "No, VPC Peering does not support transitive routing",
      "Only when using S3"
    ],
    answer: 2
  },
  {
    id: "aws-advanced-4",
    question: "What is AWS Direct Connect used for?",
    options: [
      "Establishing a dedicated network connection between on-premises infrastructure and AWS",
      "Creating IAM policies automatically",
      "Deploying Kubernetes pods",
      "Encrypting S3 objects only"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-5",
    question: "What is the purpose of an AWS Site-to-Site VPN?",
    options: [
      "Creating an encrypted tunnel between networks over the internet",
      "Creating a private S3 bucket",
      "Compiling application code",
      "Managing DNS records only"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-6",
    question: "What is a Virtual Private Gateway?",
    options: [
      "A VPN endpoint attached to a VPC for connectivity with external networks",
      "A container registry",
      "An IAM permission boundary",
      "An S3 storage class"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-7",
    question: "What is a Customer Gateway in AWS VPN architecture?",
    options: [
      "An AWS database endpoint",
      "A representation of the customer-side VPN device or gateway",
      "An EC2 launch template",
      "A Route 53 hosted zone"
    ],
    answer: 1
  },
  {
    id: "aws-advanced-8",
    question: "What is the purpose of an AWS Network ACL?",
    options: [
      "To control subnet traffic using stateless allow and deny rules",
      "To manage IAM passwords",
      "To store application logs",
      "To create EBS snapshots"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-9",
    question: "How does a Security Group differ from a Network ACL?",
    options: [
      "Security Groups are stateful; Network ACLs are stateless",
      "Both are always stateless",
      "Network ACLs apply only to IAM users",
      "Security Groups manage DNS records"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-10",
    question: "What is VPC Flow Logs used for?",
    options: [
      "Capturing information about IP traffic to and from network interfaces",
      "Recording Git commits",
      "Creating application backups",
      "Managing AWS billing contacts"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-11",
    question: "What is the purpose of a NAT Gateway?",
    options: [
      "Allowing private-subnet resources to initiate outbound internet connections",
      "Providing inbound internet access directly to every private instance",
      "Replacing IAM policies",
      "Storing container images"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-12",
    question: "Where should a public NAT Gateway generally be placed?",
    options: [
      "In a public subnet with a route to an Internet Gateway",
      "In an isolated subnet without routing",
      "Inside an S3 bucket",
      "In an IAM group"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-13",
    question: "What is the purpose of an Internet Gateway?",
    options: [
      "Providing internet connectivity for appropriately routed VPC resources",
      "Encrypting database backups",
      "Creating private hosted zones only",
      "Managing EKS node versions"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-14",
    question: "What is an AWS VPC endpoint?",
    options: [
      "A way to privately connect a VPC to supported AWS services or endpoint services",
      "A public IP address assigned to every resource",
      "A replacement for every IAM role",
      "A tool for building AMIs"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-15",
    question: "What is the difference between Gateway and Interface VPC Endpoints?",
    options: [
      "Gateway endpoints support S3 and DynamoDB; interface endpoints use AWS PrivateLink and endpoint network interfaces",
      "Gateway endpoints support only EC2; interface endpoints support only IAM",
      "Both require public IP addresses",
      "There is no difference"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-16",
    question: "What is AWS PrivateLink primarily used for?",
    options: [
      "Privately accessing supported services through private network connectivity",
      "Making all VPC resources publicly accessible",
      "Creating database passwords",
      "Managing CloudWatch dashboards"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-17",
    question: "What does split-horizon DNS mean?",
    options: [
      "Returning different DNS answers depending on the querying network or context",
      "Disabling DNS in every VPC",
      "Using only public IP addresses",
      "Deleting private hosted zones"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-18",
    question: "What is Amazon Route 53 Resolver used for?",
    options: [
      "Resolving DNS queries and supporting DNS forwarding between networks",
      "Creating EC2 snapshots",
      "Managing container registries",
      "Encrypting EBS volumes"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-19",
    question: "What is a Route 53 private hosted zone?",
    options: [
      "A DNS zone for domains intended to resolve within associated VPCs",
      "A public website hosting service",
      "A database replication group",
      "An IAM permission policy"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-20",
    question: "What does Route 53 failover routing support?",
    options: [
      "Routing DNS queries between primary and secondary resources based on health checks and configuration",
      "Automatic replication of every database",
      "Automatic encryption of all traffic",
      "Replacing an application's load balancer"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-21",
    question: "What is the purpose of an Application Load Balancer?",
    options: [
      "Routing HTTP and HTTPS traffic at Layer 7",
      "Managing physical network cables",
      "Storing database backups",
      "Replacing IAM roles"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-22",
    question: "When is a Network Load Balancer a suitable choice?",
    options: [
      "When Layer 4 TCP, UDP, or TLS traffic handling and high performance are required",
      "When managing Git commits",
      "When storing objects in S3",
      "When creating IAM users"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-23",
    question: "What is a target group in Elastic Load Balancing?",
    options: [
      "A collection of registered targets that receive forwarded traffic",
      "A collection of IAM passwords",
      "An S3 lifecycle rule",
      "A billing report"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-24",
    question: "What is the purpose of an ALB listener rule?",
    options: [
      "Routing requests according to conditions such as hostnames and URL paths",
      "Creating EBS snapshots",
      "Managing AWS Organizations",
      "Encrypting application source code"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-25",
    question: "What happens when an ALB target fails its health checks?",
    options: [
      "The load balancer generally stops routing new requests to that unhealthy target",
      "The target is always automatically terminated",
      "The entire AWS account is disabled",
      "All other targets are deleted"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-26",
    question: "What is an Auto Scaling group?",
    options: [
      "A group of EC2 instances whose capacity can adjust according to configured policies",
      "A group of S3 buckets",
      "A collection of IAM policies only",
      "A Route 53 DNS record"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-27",
    question: "What is the purpose of an EC2 launch template?",
    options: [
      "Defining instance launch settings such as AMI, instance type, and networking",
      "Managing DNS queries",
      "Creating CloudTrail events",
      "Storing application logs"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-28",
    question: "What is target tracking scaling?",
    options: [
      "Adjusting capacity to maintain a selected metric near a target value",
      "Scaling only at a fixed time regardless of demand",
      "Manually changing every instance",
      "Scaling based on Git commit count only"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-29",
    question: "What is scheduled scaling?",
    options: [
      "Changing desired capacity according to a predefined schedule",
      "Scaling based only on CPU measurements",
      "Automatically changing IAM permissions",
      "Creating a database snapshot every request"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-30",
    question: "What is predictive scaling?",
    options: [
      "Using historical patterns to forecast demand and plan capacity",
      "Scaling only after an administrator clicks a button",
      "Predicting application bugs from source-code comments",
      "Disabling Auto Scaling"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-31",
    question: "What is the purpose of an EC2 Auto Scaling lifecycle hook?",
    options: [
      "Pausing an instance launch or termination workflow for custom actions",
      "Changing Route 53 domain ownership",
      "Creating an IAM root user",
      "Encrypting all S3 objects automatically"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-32",
    question: "What is an EC2 Spot Instance?",
    options: [
      "An instance using spare AWS capacity that can be interrupted",
      "An instance with guaranteed uninterrupted availability",
      "An instance that never incurs charges",
      "An instance used only for DNS"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-33",
    question: "When are Spot Instances commonly appropriate?",
    options: [
      "Fault-tolerant batch jobs and workloads that can handle interruptions",
      "A single workload that cannot tolerate interruption or recovery",
      "Managing root account credentials",
      "Hosting only private DNS zones"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-34",
    question: "What is an EC2 Capacity Reservation?",
    options: [
      "A way to reserve compute capacity for supported EC2 configurations in a specific Availability Zone",
      "A discount that always applies to every AWS service",
      "A method for reserving S3 bucket names",
      "A tool for rotating IAM access keys"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-35",
    question: "What is an AMI?",
    options: [
      "A template used to launch EC2 instances",
      "An AWS network firewall rule",
      "A database query language",
      "A DNS health check"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-36",
    question: "What is the main purpose of IAM roles?",
    options: [
      "Providing temporary credentials and permissions to trusted identities or services",
      "Storing passwords in application source code",
      "Replacing all network security controls",
      "Creating S3 storage classes"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-37",
    question: "What is the principle of least privilege?",
    options: [
      "Granting only the permissions necessary for a task",
      "Giving every user administrator access",
      "Sharing one root account across teams",
      "Disabling audit logging"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-38",
    question: "What is an IAM permissions boundary?",
    options: [
      "A policy that sets the maximum permissions an identity-based policy can grant",
      "A VPC subnet firewall",
      "A database backup policy",
      "A DNS routing policy"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-39",
    question: "What is an IAM service control policy (SCP)?",
    options: [
      "A policy that sets maximum available permissions for accounts in AWS Organizations",
      "A policy that grants permissions directly to every user by itself",
      "A Security Group rule",
      "An S3 replication configuration"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-40",
    question: "Does an SCP grant permissions to IAM users or roles?",
    options: [
      "Yes, every SCP automatically grants administrator permissions",
      "No, it defines permission guardrails but does not grant permissions by itself",
      "Only when attached to a Security Group",
      "Only in the root account"
    ],
    answer: 1
  },
  {
    id: "aws-advanced-41",
    question: "What is cross-account IAM role access?",
    options: [
      "Allowing a trusted identity from another AWS account to assume a role when authorized",
      "Sharing root passwords between accounts",
      "Copying all resources automatically between accounts",
      "Making every bucket public"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-42",
    question: "What is AWS STS AssumeRole used for?",
    options: [
      "Obtaining temporary security credentials for an IAM role",
      "Creating permanent passwords for every user",
      "Managing DNS zones",
      "Building AMIs"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-43",
    question: "What is IAM Access Analyzer used for?",
    options: [
      "Identifying external access and validating supported policy configurations",
      "Measuring EC2 CPU utilization",
      "Creating RDS replicas",
      "Managing container image layers"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-44",
    question: "What is the recommended way for an EC2 application to access AWS services?",
    options: [
      "Use an attached IAM role through an instance profile",
      "Hardcode long-term access keys in source code",
      "Store the root password in user data",
      "Disable IAM permissions"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-45",
    question: "What is AWS IAM Identity Center used for?",
    options: [
      "Centralized workforce access to AWS accounts and supported applications",
      "Managing EC2 disk performance",
      "Creating public S3 websites only",
      "Replacing CloudTrail"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-46",
    question: "What is AWS Organizations?",
    options: [
      "A service for centrally managing multiple AWS accounts",
      "A tool for building container images",
      "A service for hosting Git repositories",
      "A DNS resolver"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-47",
    question: "What is an organizational unit (OU) in AWS Organizations?",
    options: [
      "A logical grouping of accounts for management and policy application",
      "A single EC2 instance",
      "An EBS volume",
      "A Route 53 record"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-48",
    question: "What is AWS Control Tower designed to do?",
    options: [
      "Set up and govern a multi-account AWS environment using landing-zone controls",
      "Replace every application load balancer",
      "Build Docker images",
      "Manage only S3 object versions"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-49",
    question: "Why separate production and development AWS accounts?",
    options: [
      "To improve isolation, access control, governance, and cost visibility",
      "To eliminate all AWS costs",
      "To avoid using IAM",
      "To disable monitoring"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-50",
    question: "What is AWS CloudTrail?",
    options: [
      "A service that records AWS account activity and API events",
      "A service for compiling applications",
      "A service for hosting container images",
      "A database caching engine"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-51",
    question: "What is the difference between CloudTrail and CloudWatch?",
    options: [
      "CloudTrail records account/API activity; CloudWatch handles metrics, logs, and alarms",
      "CloudWatch records only IAM changes; CloudTrail stores only CPU metrics",
      "Both are database engines",
      "CloudTrail replaces all application monitoring"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-52",
    question: "What is AWS Config used for?",
    options: [
      "Recording resource configuration changes and evaluating configuration compliance",
      "Building Docker images",
      "Creating IAM passwords",
      "Managing application source code"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-53",
    question: "What is AWS Security Hub used for?",
    options: [
      "Aggregating and prioritizing supported security findings and security posture checks",
      "Managing only DNS records",
      "Creating EC2 launch templates",
      "Replacing all IAM policies"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-54",
    question: "What is Amazon GuardDuty?",
    options: [
      "A threat detection service that analyzes supported data sources for suspicious activity",
      "A managed SQL database",
      "A container image builder",
      "A DNS hosting service"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-55",
    question: "What is AWS WAF used for?",
    options: [
      "Filtering HTTP and HTTPS requests using web access rules",
      "Encrypting EBS volumes only",
      "Creating IAM roles",
      "Managing VPC route tables"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-56",
    question: "What is AWS Shield designed to protect against?",
    options: [
      "Distributed denial-of-service (DDoS) attacks",
      "Accidental Git merges",
      "Application compilation failures",
      "Database schema errors"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-57",
    question: "What is Amazon Inspector used for?",
    options: [
      "Identifying supported software vulnerabilities and unintended exposure in workloads",
      "Managing DNS records only",
      "Creating S3 buckets",
      "Scheduling EC2 backups only"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-58",
    question: "What is AWS KMS?",
    options: [
      "A managed service for creating and controlling cryptographic keys",
      "A Kubernetes package manager",
      "A DNS routing service",
      "A container orchestration platform"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-59",
    question: "What is envelope encryption?",
    options: [
      "Encrypting data with a data key and protecting that key with another key",
      "Encrypting data without using any key",
      "Storing passwords in plaintext",
      "Encrypting only DNS records"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-60",
    question: "What is AWS Secrets Manager used for?",
    options: [
      "Storing, retrieving, and supporting rotation of secrets",
      "Managing EC2 instance types",
      "Creating VPC subnets",
      "Collecting CPU metrics only"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-61",
    question: "What is AWS Systems Manager Parameter Store used for?",
    options: [
      "Storing and managing configuration parameters and supported secrets",
      "Creating public DNS domains",
      "Replacing all IAM roles",
      "Managing Git pull requests"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-62",
    question: "What is S3 Object Lock used for?",
    options: [
      "Protecting objects against deletion or overwrite according to retention and legal-hold settings",
      "Increasing EC2 CPU capacity",
      "Creating load balancer listeners",
      "Managing Route 53 records"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-63",
    question: "What is S3 Versioning?",
    options: [
      "Maintaining multiple versions of an object in a bucket",
      "Creating multiple AWS accounts automatically",
      "Encrypting every network connection",
      "Replicating EC2 instances"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-64",
    question: "What is S3 Cross-Region Replication?",
    options: [
      "Automatically replicating eligible objects between configured buckets in different AWS Regions",
      "Synchronizing all IAM passwords between accounts",
      "Replicating EC2 memory continuously",
      "Creating DNS records from object names"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-65",
    question: "What is S3 Lifecycle Management used for?",
    options: [
      "Transitioning or expiring objects according to configured rules",
      "Managing EC2 Auto Scaling policies",
      "Creating IAM users",
      "Changing VPC CIDR blocks"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-66",
    question: "What is S3 Object Ownership used for?",
    options: [
      "Controlling object ownership and supported ACL behavior",
      "Choosing an EC2 instance family",
      "Creating private subnets",
      "Managing CloudTrail retention only"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-67",
    question: "What is S3 Transfer Acceleration designed to improve?",
    options: [
      "Transfers to S3 over long distances using AWS edge network infrastructure",
      "Database query execution",
      "IAM policy evaluation",
      "Kubernetes pod scheduling"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-68",
    question: "What is Amazon CloudFront?",
    options: [
      "A content delivery network that caches content at edge locations",
      "A managed relational database",
      "A source-code repository",
      "A VPC firewall"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-69",
    question: "How can you restrict access to private S3 content through CloudFront?",
    options: [
      "Use Origin Access Control with an appropriate S3 bucket policy",
      "Make the S3 bucket public to everyone",
      "Disable HTTPS",
      "Store the AWS root password in the URL"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-70",
    question: "What is AWS Certificate Manager commonly used for?",
    options: [
      "Provisioning and managing supported TLS/SSL certificates",
      "Managing EC2 CPU scheduling",
      "Creating DynamoDB indexes",
      "Storing application logs only"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-71",
    question: "What is Amazon RDS Multi-AZ primarily designed to provide?",
    options: [
      "Higher availability through a standby or supported multi-AZ deployment architecture",
      "Automatic public access to every database",
      "A guaranteed reduction in every query's latency",
      "Unlimited database storage without configuration"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-72",
    question: "What is an RDS read replica primarily used for?",
    options: [
      "Offloading read traffic and supporting read scaling",
      "Replacing all database backups",
      "Managing IAM users",
      "Providing a guaranteed synchronous standby in every configuration"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-73",
    question: "What is Amazon Aurora?",
    options: [
      "A relational database engine compatible with MySQL and PostgreSQL",
      "A container image registry",
      "A DNS resolver",
      "A serverless log visualization tool"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-74",
    question: "What is Amazon RDS Proxy used for?",
    options: [
      "Pooling and managing database connections for supported databases",
      "Routing internet traffic to S3",
      "Creating IAM permission boundaries",
      "Building application container images"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-75",
    question: "What is Amazon DynamoDB?",
    options: [
      "A managed NoSQL key-value and document database",
      "A relational database that requires SQL joins for all queries",
      "A network firewall",
      "A container orchestration engine"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-76",
    question: "What is a DynamoDB Global Table?",
    options: [
      "A multi-Region, multi-active replication capability for DynamoDB tables",
      "A table stored only in one Availability Zone",
      "A Route 53 hosted zone",
      "An IAM user group"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-77",
    question: "What is DynamoDB point-in-time recovery (PITR)?",
    options: [
      "A capability to restore a table to a selected time within its supported recovery window",
      "A method for changing an AWS Region instantly",
      "A way to eliminate all database latency",
      "A tool for creating EC2 AMIs"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-78",
    question: "What is Amazon ElastiCache used for?",
    options: [
      "Managed in-memory caching using supported engines such as Redis OSS and Memcached",
      "Creating IAM permission boundaries",
      "Hosting static websites only",
      "Managing VPC route tables"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-79",
    question: "What is Amazon EKS?",
    options: [
      "A managed Kubernetes service",
      "A managed DNS service",
      "A relational database engine",
      "A source-code version control tool"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-80",
    question: "What is the purpose of the EKS IAM role used by the cluster control plane?",
    options: [
      "Allowing EKS to manage required AWS resources for the cluster",
      "Giving every application pod administrator access automatically",
      "Replacing Kubernetes RBAC completely",
      "Storing all container images"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-81",
    question: "What is EKS Pod Identity used for?",
    options: [
      "Associating Kubernetes service accounts with IAM permissions for AWS workloads",
      "Assigning a public IP to every pod",
      "Replacing Kubernetes namespaces",
      "Creating RDS read replicas"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-82",
    question: "What is IRSA in Amazon EKS?",
    options: [
      "IAM Roles for Service Accounts",
      "Internet Routing Service Architecture",
      "Instance Recovery and Storage Automation",
      "Integrated Registry Security Agent"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-83",
    question: "What is the purpose of an EKS managed node group?",
    options: [
      "Managing the lifecycle of a group of EC2 worker nodes for an EKS cluster",
      "Managing Route 53 public hosted zones",
      "Creating S3 lifecycle rules",
      "Replacing Kubernetes Deployments"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-84",
    question: "What is AWS Fargate?",
    options: [
      "A serverless compute engine for supported container workloads",
      "A relational database engine",
      "A DNS filtering service",
      "An IAM policy simulator"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-85",
    question: "What is Amazon ECR?",
    options: [
      "A managed container image registry",
      "A network load balancer",
      "A database migration service",
      "A DNS resolver"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-86",
    question: "What is AWS Backup used for?",
    options: [
      "Centralizing and automating backups for supported AWS services",
      "Managing application source code",
      "Replacing every disaster recovery plan",
      "Creating public IP addresses"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-87",
    question: "What is the AWS Well-Architected Framework?",
    options: [
      "Guidance for designing secure, reliable, efficient, cost-effective, and sustainable workloads",
      "A programming language",
      "A database storage engine",
      "A replacement for CloudTrail"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-88",
    question: "What is a Recovery Point Objective (RPO)?",
    options: [
      "The maximum acceptable amount of data loss measured in time",
      "The maximum acceptable time to restore service",
      "The monthly AWS bill",
      "The number of required Availability Zones"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-89",
    question: "What is a Recovery Time Objective (RTO)?",
    options: [
      "The target or maximum acceptable time to restore a service after disruption",
      "The maximum amount of data that can be lost",
      "The number of EC2 instances",
      "The duration of an IAM session only"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-90",
    question: "Which disaster recovery strategy generally provides the lowest recovery time?",
    options: [
      "Backup and restore only",
      "Pilot light",
      "Warm standby",
      "Multi-site active-active"
    ],
    answer: 3
  },
  {
    id: "aws-advanced-91",
    question: "An application in a private subnet cannot access S3. What should you investigate first?",
    options: [
      "VPC endpoint or NAT routing, endpoint policy, bucket policy, and IAM permissions",
      "Only the EC2 instance name",
      "Only the Grafana dashboard",
      "Only the application's CSS"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-92",
    question: "An EC2 instance cannot be reached through SSH. What should you check?",
    options: [
      "Route table, subnet, Security Group, NACL, instance status, and SSH configuration",
      "Only the S3 lifecycle policy",
      "Only the RDS read replica",
      "Only the CloudFront cache TTL"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-93",
    question: "An ALB returns HTTP 502 errors. What is a useful troubleshooting approach?",
    options: [
      "Inspect target health, application responses, protocol and port configuration, and load balancer logs",
      "Delete the entire AWS account",
      "Disable all Security Groups",
      "Make every backend publicly accessible"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-94",
    question: "An application receives AccessDenied when reading an S3 object. What should you inspect?",
    options: [
      "IAM identity policy, bucket policy, explicit denies, and encryption-key permissions",
      "Only the EC2 instance type",
      "Only the Route 53 TTL",
      "Only the number of Availability Zones"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-95",
    question: "A Lambda function cannot access a private RDS database. What should you check?",
    options: [
      "VPC subnet placement, Security Groups, routes, database connectivity, and credentials",
      "Only the public website's CSS",
      "Only the S3 object version",
      "Only the AWS account alias"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-96",
    question: "Your application must survive an Availability Zone failure. What architecture is appropriate?",
    options: [
      "Deploy across multiple Availability Zones with suitable health checks and failover",
      "Run everything on one EC2 instance in one subnet",
      "Store all data only on instance store",
      "Disable health checks"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-97",
    question: "AWS costs increase unexpectedly. Which approach is best?",
    options: [
      "Review Cost Explorer, usage dimensions, billing alerts, resource utilization, and cost allocation tags",
      "Delete all production resources immediately",
      "Disable CloudTrail",
      "Increase every instance size"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-98",
    question: "What is AWS Compute Optimizer used for?",
    options: [
      "Providing resource optimization recommendations based on supported usage data",
      "Managing source-code branches",
      "Creating public DNS records",
      "Replacing AWS Organizations"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-99",
    question: "What is AWS Trusted Advisor used for?",
    options: [
      "Providing recommendations across supported cost, security, performance, fault-tolerance, and service-limit checks",
      "Running Kubernetes pods",
      "Storing relational database tables",
      "Replacing every monitoring tool"
    ],
    answer: 0
  },
  {
    id: "aws-advanced-100",
    question: "What is the best approach for a secure, highly available production AWS architecture?",
    options: [
      "Use one public EC2 instance and shared root credentials",
      "Use multi-AZ design, least-privilege IAM, encryption, monitoring, backups, and tested recovery procedures",
      "Disable audit logs to reduce costs",
      "Keep all application data in a public S3 bucket"
    ],
    answer: 1
  }
];
```
