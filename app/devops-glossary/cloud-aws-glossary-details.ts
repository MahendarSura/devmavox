import type { GlossaryTerm } from "./glossary-data";

export const cloudAwsGlossaryDetails: Record<string, Partial<GlossaryTerm>> = {
  "cloud-computing": {
    purpose: "Cloud computing provides on-demand access to computing resources such as servers, storage, databases, networking, and managed platforms over a network. Organizations can provision resources when needed, scale capacity, and pay according to the selected service and usage model.",
    project: "A DevOps team hosts an e-commerce application on AWS. The frontend uses a load balancer, application servers run on EC2, product images are stored in S3, and a managed database stores orders.",
    workflow: ["Identify application compute, storage, database, and network requirements.", "Choose suitable cloud services and deployment regions.", "Provision resources using reviewed infrastructure code.", "Deploy and monitor the application.", "Track usage, security, availability, and cost."],
    commands: ["aws sts get-caller-identity", "aws configure list", "aws ec2 describe-regions --output table", "aws s3 ls"],
    mistakes: ["Assuming cloud resources are automatically secure.", "Leaving unused resources running and increasing costs.", "Deploying without backup and recovery planning.", "Choosing services without considering availability, performance, and operational needs."],
    configuration: ["Choose an account structure and approved regions.", "Define network boundaries and identity permissions.", "Use infrastructure as code for repeatable provisioning.", "Configure monitoring, budgets, backups, and security policies."],
    troubleshooting: ["Check service health and regional availability.", "Verify identity permissions and resource configuration.", "Inspect networking, DNS, and security rules.", "Review service metrics, logs, quotas, and billing data."],
    bestPractices: ["Automate provisioning and configuration.", "Apply least privilege and resource tagging.", "Use multiple Availability Zones for critical workloads.", "Monitor cost, reliability, security, and performance continuously."],
    securityConsiderations: ["Secure account root access and privileged identities.", "Encrypt sensitive data and protect secrets.", "Enable audit logging and security monitoring.", "Apply shared-responsibility controls to every deployed service."]
  },
  "aws-region": {
    purpose: "An AWS Region is a separate geographic area containing multiple isolated Availability Zones. Selecting a region determines where resources are deployed and influences latency, service availability, compliance, and data residency.",
    project: "A company serving customers in India deploys its primary application in an AWS Region close to its users. Its disaster recovery design uses a second approved region for critical backups and recovery resources.",
    workflow: ["Identify customer locations and latency requirements.", "Review regional service availability and compliance needs.", "Select the primary deployment region.", "Provision resources consistently in that region.", "Plan cross-region backup or recovery where required."],
    commands: ["aws configure get region", "aws ec2 describe-regions --output table", "aws ec2 describe-availability-zones --region ap-south-1", "aws s3api list-buckets"],
    mistakes: ["Assuming every AWS service is available in every region.", "Creating resources in the wrong region.", "Ignoring data residency requirements.", "Assuming regional separation automatically provides disaster recovery."],
    configuration: ["Set the intended region in CLI profiles and deployment pipelines.", "Use explicit region configuration in infrastructure code.", "Define approved regions through organizational policies.", "Document cross-region replication and recovery requirements."],
    troubleshooting: ["Confirm the CLI or SDK is using the expected region.", "Check whether the service is available in that region.", "Verify that the resource identifier belongs to the selected region.", "Inspect regional service health and quota limits."],
    bestPractices: ["Standardize approved deployment regions.", "Keep region selection configurable in automation.", "Test recovery procedures in the target recovery region.", "Evaluate latency, cost, and compliance before deployment."],
    securityConsiderations: ["Respect data residency and regulatory requirements.", "Restrict deployment to approved regions where necessary.", "Protect cross-region replication permissions.", "Audit resources created outside approved locations."]
  },
  "availability-zone": {
    purpose: "An Availability Zone (AZ) is an isolated location within an AWS Region containing independent infrastructure such as power, networking, and facilities. Multiple AZs allow applications to distribute workloads and reduce dependence on a single location.",
    project: "A production web application runs EC2 instances across two Availability Zones behind an Application Load Balancer. If one zone becomes unavailable, healthy instances in the other zone can continue serving traffic.",
    workflow: ["Select a region with the required Availability Zones.", "Create subnets in separate zones.", "Deploy redundant application resources across zones.", "Configure load balancing and health checks.", "Test failure handling and recovery."],
    commands: ["aws ec2 describe-availability-zones --region ap-south-1", "aws ec2 describe-subnets --query 'Subnets[*].[SubnetId,AvailabilityZone,CidrBlock]' --output table", "aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,Placement.AvailabilityZone]' --output table"],
    mistakes: ["Deploying every critical instance in one AZ.", "Assuming multiple subnets automatically provide application redundancy.", "Ignoring dependencies such as databases and shared storage.", "Failing to test zone-level failure scenarios."],
    configuration: ["Create separate subnets in selected AZs.", "Distribute load-balanced application instances across zones.", "Configure database replication or multi-AZ options where supported.", "Use health checks and automated replacement."],
    troubleshooting: ["Check the AZ placement of each resource.", "Inspect load-balancer target health.", "Review subnet routes and network ACLs.", "Check service events and capacity constraints in the affected zone."],
    bestPractices: ["Distribute production workloads across multiple AZs.", "Avoid unnecessary single-zone dependencies.", "Test application behavior when a zone becomes unhealthy.", "Monitor capacity and health in every deployed zone."],
    securityConsiderations: ["Apply consistent security controls across zones.", "Protect replicated data and backup access.", "Avoid assuming AZ redundancy replaces backups.", "Monitor configuration drift between zones."]
  },
  "amazon-ec2": {
    purpose: "Amazon Elastic Compute Cloud (EC2) provides resizable virtual servers called instances. Teams select an instance type, operating system image, storage, networking, and security configuration to run applications and workloads in AWS.",
    project: "A DevOps team provisions EC2 instances for a Java application. A launch template defines the AMI, instance type, IAM instance profile, security groups, and bootstrap configuration.",
    workflow: ["Select an approved Amazon Machine Image.", "Choose an instance type based on CPU, memory, and workload needs.", "Configure VPC subnet, security group, and IAM role.", "Launch and configure the instance.", "Monitor health, patch the operating system, and manage backups."],
    commands: ["aws ec2 describe-instances --output table", "aws ec2 run-instances --image-id ami-xxxxxxxx --instance-type t3.micro --subnet-id subnet-xxxxxxxx --security-group-ids sg-xxxxxxxx --count 1", "aws ec2 describe-instance-status --include-all-instances", "aws ec2 stop-instances --instance-ids i-xxxxxxxx", "aws ec2 terminate-instances --instance-ids i-xxxxxxxx"],
    mistakes: ["Opening SSH or RDP to the entire internet.", "Choosing undersized or oversized instance types.", "Launching instances without monitoring and backups.", "Embedding credentials in user-data scripts."],
    configuration: ["Use approved AMIs and instance types.", "Attach least-privilege IAM instance profiles.", "Place instances in appropriate public or private subnets.", "Configure encrypted storage, security groups, and monitoring."],
    troubleshooting: ["Check instance state and system status checks.", "Verify security group, route table, and network ACL rules.", "Inspect system and application logs.", "Confirm IAM permissions, disk capacity, and CPU or memory pressure."],
    bestPractices: ["Use launch templates and infrastructure as code.", "Prefer private subnets for backend instances.", "Patch and rebuild instances regularly.", "Use Auto Scaling and load balancing for scalable services."],
    securityConsiderations: ["Restrict administrative ports to trusted networks.", "Use Systems Manager or controlled access paths where suitable.", "Encrypt EBS volumes and protect snapshots.", "Avoid long-lived access keys on instances."]
  },
  "amazon-s3": {
    purpose: "Amazon Simple Storage Service (S3) is an object storage service used to store and retrieve files called objects in buckets. It supports application assets, backups, logs, data lakes, and static website content.",
    project: "A CI pipeline uploads versioned application artifacts to a private S3 bucket. The bucket uses encryption, restricted IAM access, and lifecycle rules to manage older build artifacts.",
    workflow: ["Create a bucket in the intended region.", "Define bucket ownership and access controls.", "Enable encryption, versioning, and logging as required.", "Upload and retrieve objects through approved identities.", "Apply lifecycle and recovery policies."],
    commands: ["aws s3 ls", "aws s3 mb s3://my-company-artifacts-example", "aws s3 cp build.zip s3://my-company-artifacts-example/releases/build.zip", "aws s3api get-bucket-versioning --bucket my-company-artifacts-example", "aws s3api get-public-access-block --bucket my-company-artifacts-example"],
    mistakes: ["Making buckets public unintentionally.", "Assuming bucket names are private access controls.", "Deleting objects without understanding versioning and retention.", "Granting broad s3:* permissions."],
    configuration: ["Enable S3 Block Public Access unless public access is explicitly required.", "Use bucket policies and IAM policies with narrow resource scopes.", "Enable encryption and versioning where appropriate.", "Configure lifecycle, logging, and replication based on requirements."],
    troubleshooting: ["Check bucket region and object key.", "Inspect IAM and bucket policy evaluation.", "Verify encryption key permissions.", "Review versioning, lifecycle, and access logs when objects are missing or inaccessible."],
    bestPractices: ["Use separate buckets or prefixes for clear ownership.", "Enable versioning for important data.", "Use lifecycle policies to control storage cost.", "Test backup restoration and object recovery."],
    securityConsiderations: ["Block unintended public access.", "Encrypt sensitive objects and restrict key usage.", "Audit bucket policy changes and access.", "Use presigned URLs with short expiry when temporary sharing is required."]
  },
  "amazon-vpc": {
    purpose: "Amazon Virtual Private Cloud (VPC) provides a logically isolated network in AWS. It allows teams to define IP address ranges, subnets, route tables, gateways, and network security controls for cloud resources.",
    project: "A production application uses a VPC with public subnets for internet-facing load balancers and private subnets for application servers and databases. Route tables control traffic between these network layers.",
    workflow: ["Choose a non-overlapping CIDR range.", "Create the VPC and required subnets.", "Configure route tables and gateways.", "Attach security groups and network ACLs.", "Test connectivity and monitor network flow."],
    commands: ["aws ec2 describe-vpcs --output table", "aws ec2 describe-subnets --filters Name=vpc-id,Values=vpc-xxxxxxxx", "aws ec2 describe-route-tables", "aws ec2 describe-internet-gateways", "aws ec2 describe-nat-gateways"],
    mistakes: ["Choosing overlapping CIDR ranges.", "Placing databases in public subnets unnecessarily.", "Creating routes without understanding traffic paths.", "Assuming a VPC alone blocks all unwanted traffic."],
    configuration: ["Plan CIDR ranges before deployment.", "Separate public, private application, and database subnets.", "Use route tables and gateways intentionally.", "Apply security groups and network ACLs according to traffic requirements."],
    troubleshooting: ["Check subnet route-table associations.", "Verify internet or NAT gateway routes.", "Inspect security groups and network ACLs.", "Use VPC Flow Logs and reachability analysis to investigate traffic."],
    bestPractices: ["Use clear network segmentation.", "Avoid broad inbound and outbound rules.", "Plan for future subnet and IP capacity.", "Manage VPC resources through infrastructure as code."],
    securityConsiderations: ["Keep internal workloads in private subnets where appropriate.", "Restrict network paths between application tiers.", "Enable and protect VPC Flow Logs.", "Review peering, transit, and endpoint access boundaries."]
  },
  "subnet": {
    purpose: "A subnet is a subdivision of a VPC IP address range. Each subnet belongs to one Availability Zone and provides a network location for resources such as EC2 instances, load balancers, and databases.",
    project: "A three-tier application uses public subnets for its load balancer, private subnets for EC2 application instances, and isolated database subnets for data services.",
    workflow: ["Plan the VPC CIDR range.", "Divide the range into non-overlapping subnet CIDRs.", "Choose an Availability Zone for each subnet.", "Associate the correct route table.", "Deploy resources and verify network reachability."],
    commands: ["aws ec2 describe-subnets --output table", "aws ec2 describe-subnets --filters Name=vpc-id,Values=vpc-xxxxxxxx", "aws ec2 describe-route-tables", "aws ec2 describe-network-acls"],
    mistakes: ["Creating overlapping subnet CIDRs.", "Assuming every subnet is public by default.", "Associating a private subnet with an internet gateway route unintentionally.", "Ignoring available IP address capacity."],
    configuration: ["Use distinct CIDR ranges for each subnet.", "Create subnets across multiple AZs for critical systems.", "Associate route tables according to intended traffic.", "Choose public IP assignment only when required."],
    troubleshooting: ["Check subnet CIDR and available IP addresses.", "Inspect route-table association.", "Verify network ACL and security-group rules.", "Confirm the resource is deployed in the intended subnet and AZ."],
    bestPractices: ["Separate tiers by trust boundary.", "Use multiple AZs for resilient applications.", "Reserve address space for future growth.", "Document subnet purpose and ownership with tags."],
    securityConsiderations: ["Avoid public IP assignment for internal workloads.", "Restrict inbound routes and network ACLs.", "Keep database subnets isolated from direct internet access.", "Monitor changes to subnet routes and associations."]
  },
  "aws-iam": {
    purpose: "AWS Identity and Access Management (IAM) controls authentication and authorization for AWS resources. IAM users, groups, roles, and policies define which identities can perform actions on which resources.",
    project: "A GitHub Actions deployment workflow assumes an AWS IAM role through federation. The role can update a specific application service but cannot modify unrelated production resources.",
    workflow: ["Identify the human or workload identity.", "Choose a role, user, or federation method.", "Define a least-privilege permissions policy.", "Configure trust relationships and conditions.", "Test access and audit activity with CloudTrail."],
    commands: ["aws sts get-caller-identity", "aws iam list-users", "aws iam list-roles", "aws iam get-role --role-name DeploymentRole", "aws iam list-attached-role-policies --role-name DeploymentRole"],
    mistakes: ["Using root credentials for daily work.", "Attaching AdministratorAccess to deployment roles.", "Confusing trust policies with permissions policies.", "Creating long-lived access keys for workloads."],
    configuration: ["Use IAM roles for AWS services and federated workloads.", "Define scoped actions and resource ARNs.", "Use conditions to restrict role assumption.", "Enable MFA and centralized identity federation for human access."],
    troubleshooting: ["Confirm the active identity using get-caller-identity.", "Inspect attached and inline policies.", "Review trust relationships and explicit denies.", "Use policy simulation and CloudTrail to identify authorization failures."],
    bestPractices: ["Apply least privilege.", "Prefer temporary credentials.", "Separate administrator, deployment, and runtime roles.", "Review unused users, access keys, and permissions regularly."],
    securityConsiderations: ["Protect root credentials and privileged roles.", "Require MFA for privileged human access.", "Audit policy and trust-policy changes.", "Revoke exposed credentials and investigate unexpected role assumptions."]
  },
  "security-group": {
    purpose: "An AWS Security Group is a stateful virtual firewall attached to supported resources such as EC2 instances and network interfaces. It controls allowed inbound and outbound traffic using protocol, port, and source or destination rules.",
    project: "An application load balancer accepts HTTPS from the internet. Its application EC2 instances accept traffic only from the load balancer security group, while the database accepts connections only from the application tier.",
    workflow: ["Identify required application traffic.", "Create a security group in the correct VPC.", "Add narrow inbound and outbound rules.", "Attach it to the intended resource.", "Test connectivity and review rule usage."],
    commands: ["aws ec2 describe-security-groups --output table", "aws ec2 describe-security-group-rules", "aws ec2 authorize-security-group-ingress --group-id sg-xxxxxxxx --protocol tcp --port 443 --cidr 203.0.113.0/24", "aws ec2 revoke-security-group-ingress --group-id sg-xxxxxxxx --protocol tcp --port 22 --cidr 0.0.0.0/0"],
    mistakes: ["Allowing SSH or RDP from 0.0.0.0/0.", "Opening all ports to simplify troubleshooting.", "Confusing security groups with network ACLs.", "Forgetting that security groups are stateful."],
    configuration: ["Create separate groups for load balancers, application servers, and databases.", "Reference other security groups as sources where suitable.", "Allow only required ports and protocols.", "Review outbound rules as well as inbound rules."],
    troubleshooting: ["Verify the security group is attached to the correct network interface.", "Check source and destination rules.", "Confirm route tables and network ACLs also permit traffic.", "Test the actual destination port and service listener."],
    bestPractices: ["Use application-tier-specific security groups.", "Prefer security-group references over broad CIDR ranges.", "Remove unused rules.", "Manage rules through reviewed infrastructure code."],
    securityConsiderations: ["Avoid unrestricted administrative ports.", "Audit rules that allow public access.", "Limit outbound access where required.", "Monitor security-group changes and unexpected exposure."]
  },
  "elastic-load-balancing": {
    purpose: "Elastic Load Balancing automatically distributes incoming traffic across registered targets such as EC2 instances, containers, and IP addresses. It improves application availability and supports health checks and traffic routing.",
    project: "An e-commerce application uses an Application Load Balancer to route HTTPS requests to healthy EC2 instances across multiple Availability Zones. Unhealthy targets are removed from traffic until they recover.",
    workflow: ["Choose an appropriate load balancer type.", "Create listeners and routing rules.", "Register targets in target groups.", "Configure health checks and security groups.", "Monitor target health and request metrics."],
    commands: ["aws elbv2 describe-load-balancers", "aws elbv2 describe-listeners --load-balancer-arn arn:aws:elasticloadbalancing:region:account:loadbalancer/app/example/id", "aws elbv2 describe-target-groups", "aws elbv2 describe-target-health --target-group-arn arn:aws:elasticloadbalancing:region:account:targetgroup/example/id"],
    mistakes: ["Configuring an incorrect health-check path or port.", "Registering targets that cannot receive traffic.", "Forgetting load-balancer subnet or security-group requirements.", "Assuming a load balancer replaces application redundancy."],
    configuration: ["Select Application, Network, or Gateway Load Balancer based on traffic needs.", "Configure listeners, certificates, and target groups.", "Set meaningful health-check paths and thresholds.", "Enable access logs and relevant metrics."],
    troubleshooting: ["Inspect target health reason codes.", "Verify application listener and health-check endpoint.", "Check load-balancer and target security groups.", "Review listener rules, DNS, and subnet configuration."],
    bestPractices: ["Deploy across multiple AZs.", "Use realistic health checks.", "Enable access logs and monitoring.", "Use TLS listeners and controlled backend communication."],
    securityConsiderations: ["Use secure TLS policies and managed certificates.", "Restrict target access to the load balancer where appropriate.", "Protect administrative endpoints.", "Review public exposure, WAF integration, and access logs."]
  },
  "auto-scaling": {
    purpose: "AWS Auto Scaling automatically adjusts the number of compute resources according to demand, schedules, or health conditions. EC2 Auto Scaling groups maintain a desired capacity and replace unhealthy instances.",
    project: "An online shopping application increases its EC2 instance count during high traffic and scales down during quieter periods. The Auto Scaling group distributes instances across multiple Availability Zones.",
    workflow: ["Create a launch template for application instances.", "Define an Auto Scaling group and subnet placement.", "Set minimum, maximum, and desired capacity.", "Configure scaling policies and health checks.", "Monitor scaling activity and application performance."],
    commands: ["aws autoscaling describe-auto-scaling-groups", "aws autoscaling describe-scaling-activities", "aws autoscaling describe-policies", "aws autoscaling set-desired-capacity --auto-scaling-group-name web-asg --desired-capacity 3"],
    mistakes: ["Setting an insufficient maximum capacity.", "Using scaling thresholds that cause constant scale-in and scale-out.", "Ignoring application startup time.", "Failing to make application instances stateless or safely replaceable."],
    configuration: ["Use launch templates and multiple subnets.", "Set minimum, maximum, and desired capacity carefully.", "Choose metrics such as CPU or request count.", "Configure health checks, cooldown behavior, and instance refresh."],
    troubleshooting: ["Review scaling activities and failure messages.", "Check launch-template versions and instance quotas.", "Inspect subnet IP capacity and instance health.", "Verify CloudWatch metrics and scaling policy thresholds."],
    bestPractices: ["Use metrics that reflect real application demand.", "Test scaling under realistic load.", "Use lifecycle hooks when graceful initialization or shutdown is needed.", "Monitor capacity, cost, and scaling events."],
    securityConsiderations: ["Attach least-privilege instance roles.", "Use approved and patched AMIs.", "Keep security groups consistent across launched instances.", "Protect launch templates and scaling configuration from unauthorized changes."]
  },
  "amazon-route-53": {
    purpose: "Amazon Route 53 is a scalable Domain Name System (DNS) and domain registration service. It routes domain queries to resources such as load balancers, endpoints, and other DNS records using supported routing policies and health checks.",
    project: "A production application uses a Route 53 hosted zone to resolve app.example.com to an Application Load Balancer. Health checks and routing policies support controlled traffic distribution and recovery.",
    workflow: ["Create or use a hosted zone for the domain.", "Add the required DNS records.", "Point records to the application endpoint.", "Configure routing policies or health checks if required.", "Verify DNS resolution and monitor record changes."],
    commands: ["aws route53 list-hosted-zones", "aws route53 list-resource-record-sets --hosted-zone-id ZXXXXXXXXXXXXX", "aws route53 get-health-check-status --health-check-id xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "nslookup app.example.com", "dig app.example.com"],
    mistakes: ["Creating records in the wrong hosted zone.", "Using incorrect record types or target values.", "Ignoring DNS TTL and caching behavior.", "Assuming DNS health checks replace application monitoring."],
    configuration: ["Use alias records for supported AWS resources where appropriate.", "Choose simple, weighted, latency, failover, or geolocation routing based on requirements.", "Set appropriate TTL values.", "Protect hosted-zone change permissions."],
    troubleshooting: ["Verify the authoritative hosted zone.", "Check record names, types, and target values.", "Use dig or nslookup to inspect DNS responses.", "Review propagation, TTL caching, and health-check status."],
    bestPractices: ["Manage DNS records through reviewed automation.", "Use health checks for supported failover scenarios.", "Keep records and domain ownership documented.", "Monitor unexpected DNS changes."],
    securityConsiderations: ["Restrict hosted-zone modification permissions.", "Use DNSSEC where supported and required.", "Protect domain registrar accounts with MFA.", "Audit DNS changes and investigate unauthorized record updates."]
  }
};
