
import type { DevOpsTool } from "./command-types";

type CommandLevel = DevOpsTool["commands"][number]["level"];

const makeCommands = (
  level: CommandLevel,
  rows: [string, string, string][]
) =>
  rows.map(([command, english, telugu]) => ({
    command,
    level,
    english,
    telugu,
  }));

export const awsCliTool: DevOpsTool = {
  name: "AWS CLI",
  category: "Cloud & DevOps",
  commands: [
    // BASIC - 15
    ...makeCommands("Basic", [
      ["aws --version", "Displays the installed AWS CLI version.", "Install ayina AWS CLI version chupistundi."],
      ["aws help", "Displays general AWS CLI help.", "AWS CLI general help chupistundi."],
      ["aws configure", "Interactively configures AWS credentials and default settings.", "AWS credentials mariyu default settings configure chestundi."],
      ["aws configure list", "Displays the current AWS CLI configuration values and their sources.", "Current AWS CLI configuration values mariyu sources chupistundi."],
      ["aws configure get region", "Displays the configured default AWS Region.", "Configure chesina default AWS Region chupistundi."],
      ["aws sts get-caller-identity", "Displays the AWS account and identity used by the current credentials.", "Current credentials use chestunna AWS account mariyu identity chupistundi."],
      ["aws ec2 describe-instances", "Lists EC2 instance details in the selected Region.", "Selected Region lo EC2 instance details chupistundi."],
      ["aws ec2 describe-regions", "Lists AWS Regions available to the account.", "Account ki available AWS Regions list chestundi."],
      ["aws ec2 describe-availability-zones", "Lists Availability Zones in the selected Region.", "Selected Region lo Availability Zones list chestundi."],
      ["aws s3 ls", "Lists S3 buckets in the account.", "Account lo unna S3 buckets list chestundi."],
      ["aws iam list-users", "Lists IAM users in the account.", "Account lo unna IAM users list chestundi."],
      ["aws iam list-roles", "Lists IAM roles in the account.", "Account lo unna IAM roles list chestundi."],
      ["aws lambda list-functions", "Lists Lambda functions in the selected Region.", "Selected Region lo Lambda functions list chestundi."],
      ["aws rds describe-db-instances", "Displays RDS database instance details.", "RDS database instance details chupistundi."],
      ["aws cloudformation list-stacks", "Lists CloudFormation stacks.", "CloudFormation stacks list chestundi."],
    ]),

    // INTERMEDIATE - 15
    ...makeCommands("Intermediate", [
      ["aws s3 mb s3://my-example-bucket", "Creates an S3 bucket.", "S3 bucket create chestundi."],
      ["aws s3 cp ./backup.zip s3://my-example-bucket/backup.zip", "Uploads a local file to an S3 bucket.", "Local file ni S3 bucket ki upload chestundi."],
      ["aws s3 cp s3://my-example-bucket/backup.zip ./backup.zip", "Downloads an object from S3 to the local machine.", "S3 nundi file ni local machine ki download chestundi."],
      ["aws s3 sync ./website s3://my-example-bucket/website", "Synchronizes a local directory with an S3 location.", "Local directory ni S3 location tho synchronize chestundi."],
      ["aws s3 presign s3://my-example-bucket/report.pdf --expires-in 3600", "Generates a presigned URL valid for one hour.", "One hour valid ga unde presigned URL generate chestundi."],
      ["aws ec2 start-instances --instance-ids i-0123456789abcdef0", "Starts the specified EC2 instance.", "Specified EC2 instance start chestundi."],
      ["aws ec2 stop-instances --instance-ids i-0123456789abcdef0", "Stops the specified EC2 instance.", "Specified EC2 instance stop chestundi."],
      ["aws ec2 describe-security-groups", "Displays security group configurations.", "Security group configurations chupistundi."],
      ["aws ecr describe-repositories", "Lists ECR image repositories.", "ECR image repositories list chestundi."],
      ["aws ecr create-repository --repository-name my-app", "Creates an ECR repository.", "ECR repository create chestundi."],
      ["aws eks list-clusters", "Lists EKS clusters in the selected Region.", "Selected Region lo EKS clusters list chestundi."],
      ["aws eks describe-cluster --name my-cluster", "Displays details and status of an EKS cluster.", "EKS cluster details mariyu status chupistundi."],
      ["aws eks update-kubeconfig --name my-cluster", "Adds or updates the EKS cluster connection in the kubeconfig file.", "EKS cluster connection ni kubeconfig file lo add leda update chestundi."],
      ["aws logs describe-log-groups", "Lists CloudWatch Logs log groups.", "CloudWatch Logs log groups list chestundi."],
      ["aws cloudwatch describe-alarms", "Displays configured CloudWatch alarms.", "Configure chesina CloudWatch alarms chupistundi."],
    ]),

    // ADVANCED - 10
    ...makeCommands("Advanced", [
      ["aws lambda update-function-code --function-name my-function --zip-file fileb://function.zip", "Updates Lambda function code using a local ZIP package.", "Local ZIP package use chesi Lambda function code update chestundi."],
      ["aws lambda invoke --function-name my-function response.json", "Invokes a Lambda function and saves its response to a file.", "Lambda function invoke chesi response ni file lo save chestundi."],
      ["aws cloudformation deploy --template-file template.yaml --stack-name my-stack --no-execute-changeset", "Creates a CloudFormation change set without executing it.", "CloudFormation change set create chesi execute cheyakunda untundi."],
      ["aws iam simulate-principal-policy --policy-source-arn arn:aws:iam::123456789012:role/MyRole --action-names s3:ListBucket", "Simulates whether an IAM role is allowed to perform an action.", "IAM role ki action permission undho ledo simulate chestundi."],
      ["aws ssm send-command --instance-ids i-0123456789abcdef0 --document-name AWS-RunShellScript --parameters '{\"commands\":[\"uptime\"]}'", "Runs a shell command on an SSM-managed EC2 instance.", "SSM-managed EC2 instance meeda shell command run chestundi."],
      ["aws ec2 create-tags --resources i-0123456789abcdef0 --tags Key=Environment,Value=Production", "Adds a tag to an EC2 resource.", "EC2 resource ki tag add chestundi."],
      ["aws s3api put-bucket-versioning --bucket my-example-bucket --versioning-configuration Status=Enabled", "Enables versioning on an S3 bucket.", "S3 bucket lo versioning enable chestundi."],
      ["aws s3api get-bucket-policy --bucket my-example-bucket", "Retrieves the bucket policy attached to an S3 bucket.", "S3 bucket ki attach ayina bucket policy retrieve chestundi."],
      ["aws route53 list-resource-record-sets --hosted-zone-id Z1234567890ABC", "Lists DNS resource record sets in a hosted zone.", "Hosted zone lo DNS resource record sets list chestundi."],
      ["aws ecr get-login-password --region us-east-1", "Retrieves an authentication password for an Amazon ECR registry.", "Amazon ECR registry kosam authentication password retrieve chestundi."],
    ]),

    // TROUBLESHOOTING - 20
    ...makeCommands("Troubleshooting", [
      ["aws --debug sts get-caller-identity", "Runs an identity check with detailed AWS CLI debug logging.", "Detailed AWS CLI debug logs tho identity check chestundi."],
      ["aws ec2 describe-instance-status --instance-ids i-0123456789abcdef0 --include-all-instances", "Checks system and instance status checks for an EC2 instance.", "EC2 instance system mariyu instance status checks chestundi."],
      ["aws ec2 describe-instance-status --include-all-instances", "Lists status checks for all EC2 instances, including stopped instances.", "Stopped instances tho saha EC2 instances status checks list chestundi."],
      ["aws ec2 describe-instances --instance-ids i-0123456789abcdef0", "Inspects the configuration and state of a specific EC2 instance.", "Specific EC2 instance configuration mariyu state check chestundi."],
      ["aws ec2 describe-volumes --filters Name=attachment.instance-id,Values=i-0123456789abcdef0", "Finds EBS volumes attached to a specific EC2 instance.", "Specific EC2 instance ki attach ayina EBS volumes find chestundi."],
      ["aws ec2 describe-volume-status --volume-ids vol-0123456789abcdef0", "Checks status and health information for an EBS volume.", "EBS volume status mariyu health information check chestundi."],
      ["aws ec2 describe-network-interfaces --filters Name=attachment.instance-id,Values=i-0123456789abcdef0", "Inspects network interfaces attached to an EC2 instance.", "EC2 instance ki attach ayina network interfaces check chestundi."],
      ["aws ec2 describe-route-tables --filters Name=vpc-id,Values=vpc-0123456789abcdef0", "Checks route tables associated with a VPC.", "VPC ki sambandhinchina route tables check chestundi."],
      ["aws ec2 describe-security-groups --group-ids sg-0123456789abcdef0", "Inspects inbound and outbound security group rules.", "Security group inbound mariyu outbound rules check chestundi."],
      ["aws elbv2 describe-target-health --target-group-arn arn:aws:elasticloadbalancing:us-east-1:123456789012:targetgroup/my-targets/1234567890abcdef", "Checks the health status of targets in a load balancer target group.", "Load balancer target group lo targets health status check chestundi."],
      ["aws logs describe-log-streams --log-group-name /aws/lambda/my-function", "Lists log streams in a CloudWatch log group.", "CloudWatch log group lo log streams list chestundi."],
      ["aws logs get-log-events --log-group-name /aws/lambda/my-function --log-stream-name 2026/10/31/[$LATEST]example --limit 100", "Retrieves up to 100 events from a specified log stream.", "Specified log stream nundi maximum 100 log events retrieve chestundi."],
      ["aws cloudwatch describe-alarms --state-value ALARM", "Lists CloudWatch alarms currently in the ALARM state.", "Prastutam ALARM state lo unna CloudWatch alarms list chestundi."],
      ["aws ssm describe-instance-information", "Checks which managed instances are registered with Systems Manager.", "Systems Manager lo register ayina managed instances check chestundi."],
      ["aws ssm get-command-invocation --command-id command-0123456789abcdef0 --instance-id i-0123456789abcdef0", "Retrieves the result and status of an SSM command invocation.", "SSM command invocation result mariyu status retrieve chestundi."],
      ["aws lambda get-function-configuration --function-name my-function", "Checks Lambda runtime, memory, timeout, and configuration details.", "Lambda runtime, memory, timeout mariyu configuration details check chestundi."],
      ["aws lambda get-function --function-name my-function", "Retrieves Lambda function configuration and deployment package details.", "Lambda function configuration mariyu deployment package details retrieve chestundi."],
      ["aws eks describe-cluster --name my-cluster", "Checks EKS cluster status, endpoint, and configuration.", "EKS cluster status, endpoint mariyu configuration check chestundi."],
      ["aws ecr describe-images --repository-name my-app", "Lists image details and tags in an ECR repository.", "ECR repository lo image details mariyu tags list chestundi."],
      ["aws rds describe-db-snapshots --db-instance-identifier my-database", "Checks available snapshots for an RDS database instance.", "RDS database instance ki available snapshots check chestundi."],
    ]),
  ],
};
