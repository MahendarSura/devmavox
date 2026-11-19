
"use client";

import { useMemo, useState } from "react";

type Module = {
  title: string;
  topics: string[];
  outcome: string;
};


type AwsTopicGuide = { what: string; why: string; example: string; commands: string[]; expected: string; troubleshoot: string; lab: string };

function getAwsTopicGuide(topic: string, moduleTitle: string): AwsTopicGuide {
  const t = topic.toLowerCase();
  if (/iam|policy|root account|mfa|access key|credential|least privilege|role-based/.test(t)) return {
    what: topic + " is an AWS identity and access management control. IAM authenticates principals and evaluates identity and resource policies, permission boundaries, session policies and organization controls.",
    why: "It prevents users, applications and pipelines from receiving permissions they do not need. Temporary role credentials are safer than embedding long-lived access keys.",
    example: "A GitHub Actions deployment assumes a dedicated AWS role through OIDC. The role can publish an image to one ECR repository but cannot administer IAM or unrelated production resources.",
    commands: ["aws sts get-caller-identity", "aws iam get-account-summary", "aws iam list-roles --max-items 20"],
    expected: "get-caller-identity shows the active account and ARN. IAM commands return resources visible to the caller; AccessDenied indicates missing permission or an explicit deny.",
    troubleshoot: "Inspect the denied action and resource, then evaluate identity policy, resource policy, permissions boundary, session policy and SCP. Check the CloudTrail event. Do not fix a narrow denial by granting AdministratorAccess.",
    lab: "In a sandbox account, create a read-only role, attach only required read permissions, assume it, verify the ARN, and prove an unapproved write action is denied."
  };
  if (/ec2|instance|ami|key pair|user data|ebs|snapshot|compute|launch template/.test(t)) return {
    what: topic + " is part of EC2 compute operations. An instance runs from an AMI and instance type; subnet routes and security groups control connectivity, while EBS provides persistent block storage. Status checks separate AWS host problems from guest OS problems.",
    why: "EC2 provides configurable virtual machines for application servers, agents, bastion hosts and self-managed services. Correct sizing, storage and network placement affect reliability and cost.",
    example: "A web tier runs on EC2 instances in private subnets across two Availability Zones. An Application Load Balancer receives user traffic and forwards it only to healthy instances.",
    commands: ["aws ec2 describe-instances --filters Name=instance-state-name,Values=running", "aws ec2 describe-instance-status --include-all-instances", "aws ec2 describe-volumes"],
    expected: "Instance output includes ID, state, type, subnet and security groups. Status output reports system and instance reachability. Volume output shows attachment state, size and encryption.",
    troubleshoot: "For SSH failure, check instance state and status checks, public/private IP, route table, security-group ingress, network ACLs, key pair, OS username and host firewall. Do not leave SSH open to 0.0.0.0/0.",
    lab: "Launch a small instance in an approved sandbox, inspect its AMI, type, subnet, security groups and EBS mapping, verify status checks, then terminate it and confirm cleanup."
  };
  if (/s3|bucket|object|versioning|lifecycle|storage class|static website/.test(t)) return {
    what: topic + " relates to Amazon S3 object storage. Objects live in buckets and are addressed by keys. IAM and bucket policies control access; versioning, lifecycle rules, encryption and Block Public Access govern recovery, retention and exposure.",
    why: "S3 is commonly used for build artifacts, logs, backups, static assets and data lakes. Durability does not replace access control, retention planning or recovery testing.",
    example: "A CI pipeline uploads versioned release artifacts to a private encrypted bucket. A lifecycle rule moves older artifacts to a lower-cost storage class after the retention period.",
    commands: ["aws s3 ls", "aws s3api get-bucket-versioning --bucket <bucket-name>", "aws s3api get-public-access-block --bucket <bucket-name>", "aws s3api list-object-versions --bucket <bucket-name>"],
    expected: "Commands list accessible buckets and show versioning, public-access-block settings and object versions. Empty versioning status means versioning is not enabled.",
    troubleshoot: "For AccessDenied inspect IAM and bucket policy, including explicit Deny and encryption conditions. For 403/404 verify account, Region, key and permissions. Keep Block Public Access enabled unless exposure is reviewed.",
    lab: "Create a private sandbox bucket, enable versioning and default encryption, upload two versions of a test object, inspect them and configure a safe test lifecycle rule."
  };
  if (/vpc|subnet|route|internet gateway|nat|network acl|security group|cidr|endpoint|peering|flow log|networking/.test(t)) return {
    what: topic + " is an AWS VPC networking building block. A VPC has CIDR ranges split into subnets; route tables select next hops, security groups are stateful filters on network interfaces, and network ACLs are stateless subnet-level filters.",
    why: "Correct network segmentation limits attack surface and allows application, load-balancer and database tiers to communicate only on required ports.",
    example: "A three-tier system places the load balancer in public subnets, application instances in private subnets and the database in isolated subnets. Only the application security group can reach the database port.",
    commands: ["aws ec2 describe-vpcs", "aws ec2 describe-subnets", "aws ec2 describe-route-tables", "aws ec2 describe-security-groups"],
    expected: "Review VPC CIDRs, subnet AZs, route destinations and targets, subnet associations, and inbound/outbound security-group rules. A public IPv4 route normally targets an Internet Gateway.",
    troubleshoot: "Trace source, destination, port and protocol. Check route-table association, security-group rules, both directions of network ACL rules, DNS and the listening process. Private IPv4 egress generally needs a NAT route or suitable VPC endpoint.",
    lab: "Build a sandbox VPC with one public and one private subnet. Inspect route associations and demonstrate why a private instance has no unsolicited inbound internet path."
  };
  if (/load balanc|\balb\b|\bnlb\b|target group|listener|health check|502/.test(t)) return {
    what: topic + " belongs to Elastic Load Balancing. A listener accepts traffic, listener rules choose a target group, and health checks decide which registered targets receive requests. ALB provides Layer 7 HTTP-aware routing; NLB provides Layer 4 TCP/UDP/TLS handling.",
    why: "Load balancing spreads traffic, supports health-based routing and helps applications scale across instances and Availability Zones.",
    example: "An ALB routes /api requests to an API target group and /web requests to a web target group. Targets that fail health checks stop receiving normal traffic.",
    commands: ["aws elbv2 describe-load-balancers", "aws elbv2 describe-listeners --load-balancer-arn <alb-arn>", "aws elbv2 describe-target-groups", "aws elbv2 describe-target-health --target-group-arn <target-group-arn>"],
    expected: "Inspect listener ports, rules, target-group protocol/port and each target's health state and reason code.",
    troubleshoot: "For 502/503 inspect target health, target port/protocol, app bind address, health-check path/status code, security-group path and application logs. Verify the backend responds directly.",
    lab: "Register a test service behind an ALB, configure a health endpoint, stop the service to observe unhealthy status, restore it and confirm recovery."
  };
  if (/auto scaling|scaling polic|desired|min(?:imum)? and maximum|instance replacement/.test(t)) return {
    what: topic + " is part of EC2 Auto Scaling. A launch template defines instance configuration and an Auto Scaling Group maintains capacity between minimum, desired and maximum values using health checks and scaling policies.",
    why: "It replaces unhealthy instances and adjusts capacity as demand changes, reducing manual operations while maintaining an agreed capacity target.",
    example: "A stateless web tier keeps two instances across two Availability Zones and scales out when average CPU remains above a defined threshold.",
    commands: ["aws autoscaling describe-auto-scaling-groups", "aws autoscaling describe-policies --auto-scaling-group-name <asg-name>", "aws autoscaling describe-scaling-activities --auto-scaling-group-name <asg-name>"],
    expected: "Review desired/min/max capacity, instance lifecycle states, launch-template version, scaling policy and recent activity causes.",
    troubleshoot: "If instances do not launch, inspect scaling activities, EC2 quota, subnet IP capacity, launch-template AMI, instance profile and security groups. If scaling oscillates, review metric, warmup and thresholds.",
    lab: "In a sandbox, create an ASG from a launch template with min 1, desired 1 and max 2. Review activities and test controlled scale-out, then delete lab resources."
  };
  if (/rds|database|read replica|multi-az|db subnet|backup|restor/.test(t)) return {
    what: topic + " covers managed relational database operations in Amazon RDS. DB subnet groups define network placement, security groups control client access, automated backups support point-in-time recovery, and Multi-AZ and read replicas solve different availability and read-scaling needs.",
    why: "RDS reduces database server administration, but teams still own schema design, credentials, query performance, connection management and recovery testing.",
    example: "An application in private subnets connects to an RDS endpoint. The database security group accepts traffic only from the application security group on the database port.",
    commands: ["aws rds describe-db-instances", "aws rds describe-db-subnet-groups", "aws rds describe-db-snapshots"],
    expected: "Inspect engine, endpoint, status, Multi-AZ flag, subnet group, backup retention and snapshot metadata. Never print database passwords in logs.",
    troubleshoot: "Check DB status, DNS, route path, source security group, port, subnet group AZ coverage, connection limits and secret retrieval. Do not expose a database port publicly.",
    lab: "Inspect an approved sandbox RDS instance. Document engine, subnet group, security-group source, backup retention and restore procedure without changing production data."
  };
  if (/route 53|dns|hosted zone|record|routing polic|domain/.test(t)) return {
    what: topic + " is a DNS and traffic-routing concept in Route 53. Hosted zones contain records; routing policies influence which endpoint is returned, while alias records can point supported AWS resources such as load balancers.",
    why: "DNS maps application names to service endpoints and supports health-aware, latency-aware or weighted traffic distribution when required.",
    example: "The application domain uses an alias record to route users to an ALB. A test record validates a migration before production traffic is switched.",
    commands: ["aws route53 list-hosted-zones", "aws route53 list-resource-record-sets --hosted-zone-id <zone-id>", "dig <app-domain>"],
    expected: "AWS commands list hosted zones and records. dig displays resolver response, record type and TTL; DNS changes can take time according to caching and TTL.",
    troubleshoot: "Verify authoritative hosted zone, record name/type/value, alias target, registrar delegation, resolver cache and health-check state. Compare authoritative and recursive answers.",
    lab: "Create a test hosted zone or use a sandbox domain, add a harmless record, query it with dig, and document rollback."
  };
  if (/cloudwatch|cloudtrail|alarm|monitor|log|metric|event history|agent/.test(t)) return {
    what: topic + " supports AWS observability or audit. CloudWatch collects metrics, logs, dashboards and alarms; CloudTrail records account API activity so operators can identify the principal, action, time and outcome of a change.",
    why: "Metrics reveal symptoms, logs provide application detail and audit events help reconstruct changes. Together they support incident detection and root-cause analysis.",
    example: "A CloudWatch alarm detects sustained high CPU or unhealthy targets. CloudTrail helps identify a security-group change made shortly before an outage.",
    commands: ["aws cloudwatch list-metrics --namespace AWS/EC2", "aws cloudwatch describe-alarms", "aws cloudtrail lookup-events --max-results 10", "aws logs describe-log-groups"],
    expected: "Metrics are grouped by namespace and dimensions, alarms show state and threshold, CloudTrail events include identity and event name, and Logs returns log-group metadata.",
    troubleshoot: "Check Region, account, metric namespace/dimensions, time range, log-group retention and IAM permissions. Confirm the CloudTrail event belongs to the correct Region and identity.",
    lab: "Create a sandbox alarm for a test metric, inspect alarm history, make a harmless AWS API call and find the matching CloudTrail event."
  };
  if (/ecr|ecs|container|task definition|fargate/.test(t)) return {
    what: topic + " is part of AWS container delivery. ECR stores container images; ECS schedules tasks and services using task definitions, networking, IAM task/execution roles and Fargate-managed or EC2 capacity.",
    why: "These services run containerized workloads without requiring teams to operate a separate orchestration control plane for every application.",
    example: "A CI pipeline builds an immutable image, pushes it to ECR and updates an ECS service. The service replaces tasks and registers healthy targets with an ALB.",
    commands: ["aws ecr describe-repositories", "aws ecs list-clusters", "aws ecs describe-services --cluster <cluster> --services <service>", "aws ecs describe-tasks --cluster <cluster> --tasks <task-arn>"],
    expected: "Inspect image repository metadata, service desired/running counts, deployment state, task stopped reason and target registration.",
    troubleshoot: "For stopped tasks inspect stoppedReason and exit code, image URI/tag, execution-role permissions, subnet egress, secrets access, CPU/memory and container logs.",
    lab: "Deploy a small sample container to a sandbox ECS service using an ECR image. Force a new deployment, inspect task health and remove lab resources."
  };
  if (/kms|secrets manager|session manager|security audit|encryption|secret/.test(t)) return {
    what: topic + " is an AWS security capability. KMS manages cryptographic keys, Secrets Manager stores and rotates application secrets, and Systems Manager Session Manager provides controlled instance access without exposing inbound SSH.",
    why: "Centralized encryption and secret handling reduce credential leakage and improve auditability. Access should be granted through workload roles and narrowly scoped key or secret policies.",
    example: "An application task reads one database secret at runtime using its task role. The secret is encrypted with KMS and access is recorded for audit.",
    commands: ["aws kms list-aliases", "aws secretsmanager list-secrets", "aws ssm describe-instance-information"],
    expected: "Commands list key aliases, secret metadata and managed-instance connectivity. Secret values are intentionally not printed.",
    troubleshoot: "Check IAM permission, KMS key policy, secret resource policy, Region, rotation status and network access to service endpoints. For Session Manager verify SSM Agent and instance role.",
    lab: "Store a dummy value in a sandbox secret, grant a test role read access to only that secret, retrieve it securely, then revoke access and verify denial."
  };
  if (/terraform|infrastructure as code|state|drift|provider|module|plan|apply/.test(t)) return {
    what: topic + " is part of Infrastructure as Code on AWS. Terraform providers call AWS APIs, resources describe desired infrastructure, and state maps configuration to real resource identities. A plan previews changes before apply.",
    why: "Version-controlled infrastructure makes environments repeatable and reviewable. Remote state and locking prevent concurrent operators from corrupting shared state.",
    example: "A platform team reviews a saved Terraform plan in a pull request and applies it through a pipeline role after approval. Production state is stored in a restricted remote backend.",
    commands: ["terraform init", "terraform fmt -check", "terraform validate", "terraform plan"],
    expected: "Init configures providers and backend, fmt checks formatting, validate checks configuration and plan lists resources to add/change/destroy. Review every replacement or destroy.",
    troubleshoot: "For state-lock errors verify whether another run is active before recovery. For drift inspect the plan and actual resource. Never delete or hand-edit production state as a first response.",
    lab: "Create one low-cost sandbox resource, run init/fmt/validate/plan, review the plan, apply only after approval, then destroy the lab resource and verify cleanup."
  };
  if (/ci\\/cd|pipeline|jenkins|github actions|deploy|ecr image|approval|rollback/.test(t)) return {
    what: topic + " describes a stage in a controlled AWS delivery pipeline. A pipeline retrieves source, tests and builds an artifact, publishes an immutable image or package, then deploys with an auditable identity and health verification.",
    why: "Automated delivery reduces manual drift and makes releases repeatable. OIDC or role assumption avoids storing long-lived AWS access keys in CI variables.",
    example: "GitHub Actions tests an application, assumes a restricted AWS role with OIDC, pushes a commit-tagged image to ECR and updates a staging ECS service before production approval.",
    commands: ["aws sts get-caller-identity", "aws ecr get-login-password --region <region>", "aws ecs describe-services --cluster <cluster> --services <service>"],
    expected: "The identity command confirms the assumed pipeline role. ECR authentication should succeed without printing the password. ECS output shows deployment and running-task status.",
    troubleshoot: "Check OIDC trust conditions, role permissions, repository policy, image tag, deployment task events, health checks and rollback configuration. Never echo secrets or use administrator credentials in CI.",
    lab: "Create a sandbox pipeline that builds a sample image and pushes it to a test ECR repository using a restricted role. Confirm the identity and remove test artifacts."
  };
  if (/eks|kubernetes|node group|worker node/.test(t)) return {
    what: topic + " connects AWS infrastructure with Kubernetes on Amazon EKS. EKS manages the Kubernetes control plane; worker capacity, VPC CNI networking, IAM identity, cluster access and add-ons still need correct configuration.",
    why: "EKS provides a managed Kubernetes control plane while allowing teams to use Kubernetes APIs and ecosystem tooling with AWS networking, IAM and container registry services.",
    example: "An EKS workload pulls an image from ECR, uses a pod identity mechanism to access one AWS resource and is exposed through a load balancer controller.",
    commands: ["aws eks list-clusters", "aws eks describe-cluster --name <cluster-name>", "aws eks list-nodegroups --cluster-name <cluster-name>", "kubectl get nodes -o wide"],
    expected: "AWS output shows cluster endpoint/status and node groups. kubectl shows node readiness, roles and internal IPs when kubeconfig and access are configured.",
    troubleshoot: "For nodes not joining verify node IAM role, subnet routes, endpoint reachability, security groups, bootstrap data, DNS, CNI health and cluster access entries. Separate authentication errors from network timeouts.",
    lab: "Use an approved sandbox EKS cluster to inspect status, node groups, add-ons and node readiness. Do not create a cluster without checking cost and cleanup requirements."
  };
  if (/lambda|serverless|api gateway|eventbridge|sqs|dead-letter|retry|execution role/.test(t)) return {
    what: topic + " is part of event-driven AWS architecture. Lambda runs code in response to events; API Gateway exposes HTTP APIs, EventBridge routes events and SQS buffers work between producers and consumers.",
    why: "Event-driven components decouple services and scale with demand, but retries, idempotency, concurrency, timeouts and dead-letter handling must be designed explicitly.",
    example: "An API publishes an order event. A queue buffers fulfillment work; a Lambda consumer processes each message idempotently and sends repeated failures to a dead-letter queue.",
    commands: ["aws lambda list-functions", "aws lambda get-function-configuration --function-name <function-name>", "aws sqs get-queue-attributes --queue-url <queue-url> --attribute-names All"],
    expected: "Inspect function runtime, timeout, memory and role ARN; queue attributes show visibility timeout, redrive policy and message counts.",
    troubleshoot: "Check function logs, timeout, concurrency limits, event-source mapping, queue visibility timeout, permissions and retry behavior. Use idempotency keys because event delivery can repeat.",
    lab: "In a sandbox, connect a test queue to a small Lambda consumer, process a harmless message, force a controlled failure and inspect retry and dead-letter behavior."
  };
  if (/cost|budget|savings plan|rightsiz|data-transfer|pricing|billing/.test(t)) return {
    what: topic + " is a cloud financial-management practice. AWS cost analysis groups spend by service, account, Region and usage type; rightsizing and commitment discounts must be balanced against availability and future demand.",
    why: "Unmonitored resources, oversized instances, idle storage and data transfer increase bills. Cost controls should preserve reliability and security rather than blindly minimizing capacity.",
    example: "A team reviews Cost Explorer by service, identifies idle development instances, schedules non-production shutdowns and uses lifecycle policies for retained artifacts.",
    commands: ["aws ce get-cost-and-usage --time-period Start=<YYYY-MM-DD>,End=<YYYY-MM-DD> --granularity MONTHLY --metrics UnblendedCost", "aws budgets describe-budgets --account-id <account-id>"],
    expected: "Cost Explorer returns spend grouped by time/service. Budget output shows thresholds and notification configuration; billing data can be delayed.",
    troubleshoot: "Break down charges by linked account, Region, service and usage type. Check NAT Gateway processing, data transfer, snapshots, idle load balancers and unattached volumes before deleting anything.",
    lab: "Review a sandbox cost report, identify three cost drivers, estimate safe savings, create a budget alert and document resources that must not be removed."
  };
  if (/high availability|disaster recovery|multi-az|recovery point|recovery time|cross-region|failover|backup/.test(t)) return {
    what: topic + " is a reliability and recovery design practice. High availability reduces interruption through redundancy; disaster recovery restores service after a larger failure. RPO defines acceptable data loss and RTO defines target recovery time.",
    why: "A backup is useful only when it can be restored within the business requirement. Failover, replication, dependencies and runbooks must be tested rather than assumed.",
    example: "A production service runs across two Availability Zones, takes automated database backups and maintains a tested cross-Region recovery plan with DNS and application dependencies.",
    commands: ["aws rds describe-db-instances", "aws rds describe-db-snapshots", "aws ec2 describe-volumes"],
    expected: "Review Multi-AZ configuration, backup retention, latest snapshot time and storage encryption. These checks do not prove recovery until a restore test is completed.",
    troubleshoot: "During recovery verify dependency order, DNS, secrets, KMS access, network routes, data consistency and application health. Record actual RPO/RTO and compare them with objectives.",
    lab: "Write a recovery runbook for a sandbox application. Restore a non-production snapshot into an isolated environment, time the exercise and record gaps without touching production."
  };
  if (/three-tier|architecture|production incident|http 502|root cause|real-time project|terraform-based|highly available/.test(t)) return {
    what: topic + " is a practical AWS architecture exercise. Map each component to its responsibility, trust boundary, network path, failure mode and monitoring signal before making changes.",
    why: "Production work requires more than knowing service names: engineers must explain traffic flow, validate dependencies, control blast radius and prove recovery.",
    example: "For an HTTP 502 incident, inspect ALB target health, verify target port and application listener, test security-group reachability, then correlate application logs and recent deployment events.",
    commands: ["aws elbv2 describe-target-health --target-group-arn <target-group-arn>", "aws ec2 describe-security-groups", "aws cloudwatch describe-alarms", "aws cloudtrail lookup-events --max-results 10"],
    expected: "Connect target health, network policy, alarms and recent API changes to a single incident timeline.",
    troubleshoot: "Stabilize customer impact first, collect timestamps and evidence, isolate the failing layer, make the smallest reversible change and verify recovery before writing the root-cause report.",
    lab: "Draw the architecture, introduce one controlled failure in a sandbox, collect command output and logs, restore service, and write impact, root cause, mitigation and prevention notes."
  };
  return {
    what: topic + " is a core part of " + moduleTitle + " in the AWS learning path. Understand the service or concept, its inputs and outputs, dependencies, and required AWS identity and network permissions.",
    why: "Knowing when and why to use a capability helps you choose a safe design instead of memorizing service names. Connect it to availability, security, operations and cost.",
    example: "In a DevOps environment, a team applies " + topic.toLowerCase() + " while delivering an application to AWS. The change is reviewed, performed with a least-privilege role and verified through service status and application health.",
    commands: ["aws sts get-caller-identity", "aws --version", "aws configure list"],
    expected: "The CLI returns JSON for the selected account and Region. Confirm the resource identifier, status and configuration fields rather than assuming a successful command means the application is healthy.",
    troubleshoot: "Start with the exact error, account, Region and resource ID. Check IAM authorization, resource policy, network path, service events and CloudWatch logs. Change one variable at a time and verify the result.",
    lab: "In a non-production AWS account, identify resources related to " + topic.toLowerCase() + ", inspect them with read-only CLI commands, record expected state and explain one failure scenario and safe recovery."
  };
}


type Level = {
  id: string;
  title: string;
  description: string;
  modules: Module[];
};

const levels: Level[] = [
  {
    id: "basic",
    title: "Basic",
    description: "Build strong AWS cloud fundamentals.",
    modules: [
      {
        title: "1. Cloud Computing Fundamentals",
        topics: [
          "Cloud computing and AWS overview",
          "Regions, Availability Zones and edge locations",
          "Public, private and hybrid cloud",
          "Shared Responsibility Model",
        ],
        outcome: "Explain how AWS infrastructure works.",
      },
      {
        title: "2. AWS Account and IAM",
        topics: [
          "Root account security and MFA",
          "IAM users, groups and roles",
          "Policies and least privilege",
          "IAM role versus access keys",
        ],
        outcome: "Secure AWS access using least privilege.",
      },
      {
        title: "3. AWS Global Infrastructure",
        topics: [
          "Choosing a Region",
          "Availability Zone design",
          "High availability fundamentals",
          "Regional versus global services",
        ],
        outcome: "Choose suitable infrastructure locations.",
      },
      {
        title: "4. Amazon EC2",
        topics: [
          "AMI and instance types",
          "Key pairs and security groups",
          "Launching and connecting to an instance",
          "User data and instance lifecycle",
          "EBS volumes and snapshots",
        ],
        outcome: "Understand virtual servers and their storage.",
      },
      {
        title: "5. Amazon S3",
        topics: [
          "Buckets and objects",
          "Bucket policies and IAM access",
          "Versioning and lifecycle rules",
          "Encryption and storage classes",
          "Static website hosting concepts",
        ],
        outcome: "Choose secure object storage configurations.",
      },
      {
        title: "6. VPC Networking Basics",
        topics: [
          "VPC and CIDR",
          "Public and private subnets",
          "Route tables",
          "Internet Gateway",
          "Security groups versus network ACLs",
        ],
        outcome: "Explain how an EC2 instance reaches a network.",
      },
      {
        title: "7. AWS CLI",
        topics: [
          "Installing and configuring AWS CLI",
          "Profiles and regions",
          "sts get-caller-identity",
          "Listing EC2 and S3 resources",
          "CLI permissions and credential safety",
        ],
        outcome: "Use the CLI to inspect AWS resources.",
      },
      {
        title: "8. CloudWatch Basics",
        topics: [
          "Metrics and dashboards",
          "EC2 monitoring",
          "CloudWatch Logs",
          "Alarms and notifications",
        ],
        outcome: "Understand basic AWS monitoring.",
      },
    ],
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description: "Connect AWS services into application infrastructure.",
    modules: [
      {
        title: "1. Advanced VPC Networking",
        topics: [
          "NAT Gateway and outbound internet",
          "Private subnet routing",
          "VPC endpoints",
          "VPC peering",
          "VPC Flow Logs",
        ],
        outcome: "Design private application networking.",
      },
      {
        title: "2. Elastic Load Balancing",
        topics: [
          "Application Load Balancer",
          "Network Load Balancer",
          "Listeners and listener rules",
          "Target groups",
          "Health checks and HTTP 502 troubleshooting",
        ],
        outcome: "Distribute application traffic safely.",
      },
      {
        title: "3. Auto Scaling",
        topics: [
          "Launch templates",
          "Auto Scaling Groups",
          "Desired, minimum and maximum capacity",
          "Scaling policies",
          "Instance replacement and health checks",
        ],
        outcome: "Build scalable compute capacity.",
      },
      {
        title: "4. RDS and Databases",
        topics: [
          "RDS engine selection",
          "DB subnet groups",
          "Multi-AZ versus read replicas",
          "Backups and restoration",
          "Secrets and database connectivity",
        ],
        outcome: "Plan managed relational database infrastructure.",
      },
      {
        title: "5. Route 53 and DNS",
        topics: [
          "Hosted zones and DNS records",
          "A, AAAA, CNAME and alias records",
          "Routing policies",
          "Domain-to-load-balancer mapping",
          "DNS troubleshooting",
        ],
        outcome: "Route users to application endpoints.",
      },
      {
        title: "6. CloudWatch and CloudTrail",
        topics: [
          "Logs, metrics and alarms",
          "CloudWatch Agent",
          "CloudTrail event history",
          "Event-driven notifications",
          "Troubleshooting failed AWS API calls",
        ],
        outcome: "Investigate application and account issues.",
      },
      {
        title: "7. ECR and ECS",
        topics: [
          "Container images in ECR",
          "ECS clusters and services",
          "Task definitions",
          "Fargate versus EC2 launch options",
          "Load balancer integration",
        ],
        outcome: "Understand AWS container deployment.",
      },
      {
        title: "8. AWS Security Essentials",
        topics: [
          "KMS encryption",
          "Secrets Manager",
          "Systems Manager Session Manager",
          "IAM role-based access",
          "Security auditing and least privilege",
        ],
        outcome: "Reduce exposed credentials and access risks.",
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced",
    description: "Build secure, automated and resilient cloud systems.",
    modules: [
      {
        title: "1. Terraform on AWS",
        topics: [
          "Providers and resource blocks",
          "Variables, outputs and modules",
          "Remote state and state locking",
          "Plan, apply and destroy workflow",
          "Drift detection and environment separation",
        ],
        outcome: "Manage AWS infrastructure as code.",
      },
      {
        title: "2. CI/CD with AWS",
        topics: [
          "Source, build, test and deploy stages",
          "Jenkins or GitHub Actions integration",
          "ECR image publishing",
          "IAM roles for pipelines",
          "Deployment approval and rollback strategy",
        ],
        outcome: "Automate repeatable application delivery.",
      },
      {
        title: "3. Amazon EKS",
        topics: [
          "EKS control plane and worker nodes",
          "Node groups and networking",
          "IAM and workload access",
          "ECR image deployments",
          "Load balancer integration and monitoring",
        ],
        outcome: "Understand Kubernetes on AWS.",
      },
      {
        title: "4. High Availability and Disaster Recovery",
        topics: [
          "Multi-AZ architecture",
          "Backup and restore",
          "Recovery Point Objective and Recovery Time Objective",
          "Cross-Region recovery patterns",
          "Failover planning and testing",
        ],
        outcome: "Plan for failures and recovery.",
      },
      {
        title: "5. AWS Security Architecture",
        topics: [
          "Least privilege and role separation",
          "Private subnet architecture",
          "Encryption at rest and in transit",
          "AWS Config and security auditing",
          "CloudTrail investigation",
        ],
        outcome: "Design security into cloud infrastructure.",
      },
      {
        title: "6. Serverless Architecture",
        topics: [
          "Lambda functions",
          "API Gateway",
          "EventBridge and SQS",
          "Retries and dead-letter queues",
          "Execution roles and observability",
        ],
        outcome: "Choose event-driven compute patterns.",
      },
      {
        title: "7. AWS Cost Optimization",
        topics: [
          "Cost Explorer and budgets",
          "Rightsizing EC2",
          "S3 lifecycle policies",
          "Compute Savings Plans concepts",
          "NAT Gateway and data-transfer cost awareness",
        ],
        outcome: "Identify and control avoidable cloud costs.",
      },
      {
        title: "8. Production Troubleshooting",
        topics: [
          "EC2 status check failures",
          "IAM AccessDenied errors",
          "ALB 502 and unhealthy targets",
          "Private subnet internet connectivity",
          "EKS nodes failing to join",
          "Logs, metrics and root-cause analysis",
        ],
        outcome: "Follow a structured incident investigation.",
      },
    ],
  },
  {
    id: "realtime",
    title: "Real-Time Projects",
    description: "Follow realistic end-to-end production delivery workflows.",
    modules: [
      {
        title: "1. Three-Tier Web Application",
        topics: [
          "Architecture: Route 53 → ALB → EC2",
          "Application servers in private subnets",
          "RDS in isolated database subnets",
          "Security group traffic flow",
          "CloudWatch alarms and backups",
        ],
        outcome: "Explain a secure three-tier architecture.",
      },
      {
        title: "2. Terraform-Based AWS Platform",
        topics: [
          "Create VPC and subnet resources",
          "Provision route tables and gateways",
          "Deploy EC2 and load balancer resources",
          "Use remote Terraform state",
          "Review plan and manage changes safely",
        ],
        outcome: "Reproduce infrastructure through code.",
      },
      {
        title: "3. CI/CD Deployment to AWS",
        topics: [
          "Commit application code to Git",
          "Run pipeline tests and build",
          "Build and push container to ECR",
          "Deploy to ECS or EKS",
          "Validate health and roll back failures",
        ],
        outcome: "Trace code from commit to deployment.",
      },
      {
        title: "4. Highly Available Application",
        topics: [
          "Deploy across multiple Availability Zones",
          "Configure ALB health checks",
          "Set up Auto Scaling",
          "Configure monitoring and alerts",
          "Test instance failure and recovery",
        ],
        outcome: "Understand availability and recovery behavior.",
      },
      {
        title: "5. Production Incident Scenario",
        topics: [
          "Application returns HTTP 502",
          "Check ALB target health",
          "Inspect security groups and routes",
          "Review application and system logs",
          "Identify root cause and document remediation",
        ],
        outcome: "Practice a production-style incident workflow.",
      },
    ],
  },
];

const interviewQuestions = [
  {
    q: "What is the difference between a Region and an Availability Zone?",
    a: "A Region is a geographic AWS area. An Availability Zone is an isolated location within a Region.",
  },
  {
    q: "What is the difference between a security group and a network ACL?",
    a: "Security groups are stateful and attached to network interfaces. Network ACLs are stateless and apply at the subnet boundary.",
  },
  {
    q: "Why use an IAM role instead of access keys?",
    a: "Roles provide temporary credentials and avoid embedding long-lived access keys in applications.",
  },
  {
    q: "What does an Application Load Balancer do?",
    a: "It distributes HTTP and HTTPS requests across registered targets using listener rules and health checks.",
  },
  {
    q: "What is the difference between Multi-AZ and a read replica in RDS?",
    a: "Multi-AZ primarily supports availability and failover. Read replicas primarily support read scaling and can support certain recovery strategies.",
  },
  {
    q: "Why does an EC2 instance in a public subnet have no internet access?",
    a: "Check its public IPv4 address, route to an Internet Gateway, security group, network ACL and host firewall.",
  },
  {
    q: "What is the purpose of NAT Gateway?",
    a: "It lets resources in private subnets initiate supported outbound IPv4 connections without accepting unsolicited inbound connections.",
  },
  {
    q: "What is the difference between S3 and EBS?",
    a: "S3 is object storage. EBS provides block storage volumes for supported compute workloads.",
  },
  {
    q: "What is Terraform state used for?",
    a: "It maps Terraform configuration to managed resources and tracks resource attributes.",
  },
  {
    q: "How would you investigate an ALB 502 error?",
    a: "Check target health, listener and target-group configuration, application logs, target ports, protocol settings and connectivity.",
  },
  {
    q: "What is CloudTrail used for?",
    a: "It records AWS account activity and API events for auditing and investigation.",
  },
  {
    q: "What is the difference between ECS and EKS?",
    a: "ECS is AWS's container orchestration service. EKS is AWS's managed Kubernetes service.",
  },
  {
    q: "How do you avoid storing secrets in application code?",
    a: "Use services such as Secrets Manager or Parameter Store with IAM-controlled access and rotation where appropriate.",
  },
  {
    q: "How would you troubleshoot EKS nodes that fail to join?",
    a: "Check node IAM permissions, network connectivity, cluster endpoint access, bootstrap configuration and node logs.",
  },
  {
    q: "How do you reduce AWS costs safely?",
    a: "Review usage and billing data, rightsize resources, remove unused assets, select appropriate storage tiers and monitor changes.",
  },
];

export default function AWSRoadmapPage() {
  const [activeLevel, setActiveLevel] = useState("basic");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>("0");
  const [completed, setCompleted] = useState<string[]>([]);
  const [showInterviews, setShowInterviews] = useState(false);

  const level = levels.find((item) => item.id === activeLevel)!;

  const visibleModules = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return level.modules;

    return level.modules.filter((module) =>
      [module.title, module.outcome, ...module.topics]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [level, search]);

  const totalModules = levels.reduce(
    (total, item) => total + item.modules.length,
    0,
  );
  const progress = Math.round((completed.length / totalModules) * 100);

  function toggleComplete(key: string) {
    setCompleted((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key],
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">
            DevMavox · Cloud Engineering
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            AWS Learning Roadmap
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-700">
            Learn AWS from cloud fundamentals to production architecture,
            infrastructure as code, security, CI/CD and incident troubleshooting.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-2xl font-black text-blue-600">4</p>
              <p className="text-sm text-slate-600">Learning paths</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-2xl font-black text-blue-600">
                {totalModules}
              </p>
              <p className="text-sm text-slate-600">Roadmap modules</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-2xl font-black text-blue-600">15</p>
              <p className="text-sm text-slate-600">Interview questions</p>
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Your roadmap progress</h2>
              <p className="mt-1 text-sm text-slate-600">
                Mark modules complete as you study them.
              </p>
            </div>
            <span className="text-xl font-black text-blue-600">
              {completed.length}/{totalModules}
            </span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-slate-600">{progress}% completed</p>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Choose your learning path</h2>
            <p className="mt-2 text-slate-600">
              Follow the levels in order, or revisit a topic whenever needed.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {levels.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveLevel(item.id);
                  setExpanded(null);
                  setSearch("");
                }}
                className={`rounded-2xl border p-5 text-left transition ${
                  activeLevel === item.id
                    ? "border-blue-400 bg-blue-50 ring-1 ring-blue-400/30"
                    : "border-slate-200 bg-white shadow-sm hover:border-slate-300"
                }`}
              >
                <span className="text-sm font-bold text-blue-600">
                  PATH 0{index + 1}
                </span>
                <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-slate-700">
                  {item.modules.length} modules
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Current path
            </p>
            <h2 className="mt-1 text-2xl font-bold">{level.title} AWS Roadmap</h2>
            <p className="mt-2 text-slate-600">{level.description}</p>
          </div>

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search modules, services or topics..."
            className="w-full rounded-xl border border-slate-700 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500"
          />

          <div className="space-y-3">
            {visibleModules.map((module) => {
              const originalIndex = level.modules.indexOf(module);
              const key = `${level.id}-${originalIndex}`;
              const isExpanded = expanded === key;
              const isCompleted = completed.includes(key);

              return (
                <article
                  key={key}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="flex items-start gap-3 p-4 sm:p-5">
                    <button
                      onClick={() => toggleComplete(key)}
                      aria-label={
                        isCompleted ? "Mark incomplete" : "Mark complete"
                      }
                      className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-sm ${
                        isCompleted
                          ? "border-emerald-500 bg-emerald-500 text-slate-950"
                          : "border-slate-600 text-slate-600"
                      }`}
                    >
                      {isCompleted ? "✓" : ""}
                    </button>

                    <button
                      onClick={() => setExpanded(isExpanded ? null : key)}
                      className="flex min-w-0 flex-1 items-start justify-between gap-4 text-left"
                    >
                      <span>
                        <span
                          className={`block font-bold ${
                            isCompleted ? "text-emerald-700" : "text-slate-900"
                          }`}
                        >
                          {module.title}
                        </span>
                        <span className="mt-1 block text-sm leading-6 text-slate-600">
                          {module.outcome}
                        </span>
                      </span>
                      <span className="text-xl text-blue-600">
                        {isExpanded ? "−" : "+"}
                      </span>
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-200 px-5 py-5 sm:ml-9">
                      <h3 className="font-semibold text-blue-700">
                        Topics to learn
                      </h3>
                      <ul className="mt-3 space-y-3">
                        {module.topics.map((topic) => {
                          const guide = getAwsTopicGuide(topic, module.title);
                          return (
                            <li key={topic} className="rounded-xl border border-slate-200 bg-white p-4 text-slate-800 shadow-sm">
                              <div className="flex items-start gap-2">
                                <span className="mt-0.5 font-bold text-blue-600">•</span>
                                <h4 className="font-bold text-slate-900">{topic}</h4>
                              </div>
                              <div className="mt-3 grid gap-3 text-sm leading-6 md:grid-cols-2">
                                <div><p className="font-semibold text-blue-700">What it means</p><p className="mt-1 text-slate-700">{guide.what}</p></div>
                                <div><p className="font-semibold text-blue-700">Why DevOps teams use it</p><p className="mt-1 text-slate-700">{guide.why}</p></div>
                                <div className="md:col-span-2"><p className="font-semibold text-blue-700">Practical DevOps example</p><p className="mt-1 text-slate-700">{guide.example}</p></div>
                                <div className="md:col-span-2">
                                  <p className="font-semibold text-emerald-700">AWS CLI commands</p>
                                  <div className="mt-2 space-y-2">{guide.commands.map((command) => <pre key={command} className="overflow-x-auto rounded-lg bg-slate-50 p-3 text-xs text-emerald-700"><code>{command}</code></pre>)}</div>
                                  <p className="mt-2 text-slate-600"><strong>Expected result:</strong> {guide.expected}</p>
                                </div>
                                <div><p className="font-semibold text-rose-700">Troubleshooting</p><p className="mt-1 text-slate-700">{guide.troubleshoot}</p></div>
                                <div><p className="font-semibold text-amber-700">Hands-on lab</p><p className="mt-1 text-slate-700">{guide.lab}</p></div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                      <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                        <span className="font-semibold text-slate-800">
                          Learning goal:{" "}
                        </span>
                        {module.outcome}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}

            {visibleModules.length === 0 && (
              <p className="rounded-xl border border-slate-200 p-6 text-center text-slate-600">
                No matching modules. Try another search term.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 sm:p-7">
          <h2 className="text-2xl font-bold">Recommended learning order</h2>
          <div className="mt-5 space-y-3">
            {[
              "Learn IAM, EC2, S3 and networking fundamentals.",
              "Understand load balancing, Auto Scaling, databases and monitoring.",
              "Learn Terraform, cloud security, EKS and deployment automation.",
              "Study production architecture, reliability and incident response.",
            ].map((step, index) => (
              <div key={step} className="flex gap-4 rounded-xl bg-slate-50 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-600">
                  {index + 1}
                </span>
                <p className="leading-6 text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <button
            onClick={() => setShowInterviews(!showInterviews)}
            className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-7"
          >
            <span>
              <h2 className="text-2xl font-bold">AWS Interview Preparation</h2>
              <p className="mt-2 text-sm text-slate-600">
                15 questions with concise answers for revision.
              </p>
            </span>
            <span className="text-2xl text-blue-600">
              {showInterviews ? "−" : "+"}
            </span>
          </button>

          {showInterviews && (
            <div className="space-y-3 border-t border-slate-200 p-5 sm:p-7">
              {interviewQuestions.map((item, index) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <summary className="cursor-pointer font-semibold leading-6 text-slate-800">
                    <span className="mr-2 text-blue-600">
                      Q{index + 1}.
                    </span>
                    {item.q}
                  </summary>
                  <p className="mt-3 pl-8 text-sm leading-7 text-slate-600">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          )}
        </section>

        <footer className="rounded-2xl border border-orange-500/20 bg-blue-600/5 p-5">
          <h2 className="font-bold text-blue-700">Roadmap completion goal</h2>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            Be able to explain AWS architecture, justify service choices,
            troubleshoot common failures, secure workloads and describe how
            infrastructure moves from code to production.
          </p>
          <p className="mt-3 text-xs text-slate-500">
            Progress checkboxes currently use page state and reset on refresh.
            Persistent progress requires storage or a database.
          </p>
        </footer>
      </div>
    </main>
  );
}
