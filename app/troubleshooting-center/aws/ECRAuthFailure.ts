export interface ECRAuthFailureGuide {
  title: string;
  slug: string;
  category: string;
  severity: string[];
  overview: string;
  incidentScenario: string;
  impactAssessment: string[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: {
    step: number;
    title: string;
    objective: string;
    commands: string[];
    interpretation: string[];
    nextAction: string;
  }[];
  rootCauseMatrix: {
    symptom: string;
    likelyCause: string;
    evidence: string;
    resolution: string;
  }[];
  recoveryProcedures: {
    scenario: string;
    steps: string[];
    validation: string[];
  }[];
  advancedScenarios: {
    scenario: string;
    investigation: string[];
    resolution: string[];
  }[];
  prevention: string[];
  monitoringAndAlerting: string[];
  incidentReportTemplate: string[];
  handsOnLabs: {
    lab: string;
    steps: string[];
    expectedResult: string;
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  officialReferences: {
    title: string;
    url: string;
  }[];
}

export const ecrAuthFailureGuide: ECRAuthFailureGuide = {
  title: "AWS ECR Authentication Failure — Production Troubleshooting",
  slug: "ecr-auth-failure",
  category: "AWS / ECR / Docker / Kubernetes / CI-CD",

  severity: [
    "SEV-1: Production deployments or critical workloads are failing across multiple services, and recovery capacity is at risk.",
    "SEV-2: A production pipeline cannot push or pull images, blocking a critical release or workload recovery.",
    "SEV-3: One repository, runner, cluster, or service has an image authentication failure with a workaround available.",
    "SEV-4: Development or test image access is failing without production impact."
  ],

  overview: `
Amazon Elastic Container Registry (ECR) stores container images used by
Docker, Kubernetes, Amazon EKS, Amazon ECS, and CI/CD pipelines.

An ECR authentication failure can happen during:

1. Docker login.
2. Docker image push.
3. Docker image pull.
4. GitHub Actions or Jenkins image publishing.
5. Kubernetes Pod startup.
6. ECS task startup.
7. Cross-account image access.
8. Pulling images encrypted with a customer-managed KMS key.
9. Accessing ECR through a private VPC endpoint.
10. Using an incorrect AWS account, Region, registry URI, or execution role.

Important distinction:

- Authentication: Can the client obtain and use an ECR authorization token?
- Authorization: Does the IAM identity have permission to perform the requested operation?
- Repository access: Does the repository policy allow the relevant principal?
- Network connectivity: Can the client reach the ECR API, registry endpoint, and required image-layer endpoints?
- Image reference: Does the repository and image tag or digest exist?

A successful docker login does not prove that image push, image pull, or
deployment will succeed. Each operation must be tested independently.
`,

  incidentScenario: `
INCIDENT:

A production deployment worked yesterday. Today, the CI/CD pipeline fails
while pushing an image to ECR:

denied: User is not authorized to perform ecr:PutImage

Another pipeline might fail with:

no basic auth credentials
ExpiredToken
AccessDeniedException
unauthorized: authentication required
manifest unknown
ImagePullBackOff
CannotPullContainerError

The first task is to identify which operation fails:

- AWS identity resolution
- ECR authorization-token retrieval
- Docker login
- Layer upload
- Image manifest publication
- Runtime image pull
- Application deployment

Do not immediately attach AdministratorAccess or regenerate every credential.
Capture the identity, account, Region, repository, operation, and exact error
first. Apply the smallest correction supported by evidence.
`,

  impactAssessment: [
    "Identify the affected AWS account, Region, ECR registry ID, repository, image tag or digest, and environment.",
    "Determine whether image push, image pull, or both are failing.",
    "Check whether one developer, one runner, one cluster, or every deployment is affected.",
    "Determine whether the failure blocks a new release, autoscaling, recovery, or replacement of existing workloads.",
    "Check whether already-running containers remain healthy; a pull failure does not necessarily stop containers that are already running.",
    "Determine whether a deployment partially succeeded and whether some services now run different image versions.",
    "Record the incident start time, last successful push or pull, pipeline run ID, and recent IAM or repository policy changes.",
    "Confirm whether the workflow uses an IAM user, assumed role, GitHub Actions OIDC, Jenkins role, EC2 instance profile, EKS node role, EKS workload identity, or ECS execution role.",
    "Check whether the issue affects a single Region or cross-Region replication and access.",
    "Estimate the risk of rollback if the previous image digest is unavailable or cannot be pulled."
  ],

  safetyChecks: [
    "Confirm AWS account and Region before making IAM, repository, KMS, or network changes.",
    "Use read-only commands to establish the current identity, repository, image, and permissions before changing policies.",
    "Never paste AWS secret access keys, ECR authorization tokens, Docker config.json contents, or OIDC tokens into logs, tickets, or chat.",
    "Do not print the output of get-login-password or decode ECR authorization tokens for troubleshooting.",
    "Do not attach AdministratorAccess as a temporary fix.",
    "Do not grant ecr:* on every repository if the workload needs access to only one repository.",
    "Do not make an ECR repository public to bypass private registry authentication.",
    "Do not delete image tags or repositories during an active deployment incident without confirming retention and rollback requirements.",
    "Before changing repository or KMS policies, capture the current policy and obtain the required production approval.",
    "Distinguish the CI role from the runtime pull identity; they are often different principals.",
    "For EKS, distinguish the node image-pull identity from the application's Kubernetes service account identity.",
    "For ECS, distinguish the task execution role from the task role.",
    "Verify that a proposed permission change does not unintentionally grant access to unrelated repositories or accounts.",
    "If a credential may have leaked, follow the credential-compromise response process rather than merely retrying the login."
  ],

  evidenceCollection: [
    "Incident ID, timestamp, affected environment, pipeline run ID, cluster, service, and workload.",
    "Exact failing command and sanitized error output.",
    "AWS caller identity, account ID, assumed-role ARN, and Region.",
    "ECR registry URI, repository name, image tag, and immutable image digest if known.",
    "Whether the failure occurs at get-login-password, docker login, docker push, docker pull, or deployment.",
    "Recent changes to IAM policies, permission boundaries, SCPs, repository policies, KMS policies, VPC endpoints, and credential configuration.",
    "CI runner type, execution identity, Docker version, AWS CLI version, and authentication mechanism.",
    "EKS Pod events, node identity, node readiness, and container runtime messages when Kubernetes is involved.",
    "ECS stopped-task reason and relevant service deployment events when ECS is involved.",
    "Repository encryption configuration and customer-managed KMS key status where applicable.",
    "ECR API and registry endpoint connectivity, DNS resolution, proxy configuration, and VPC endpoint state.",
    "Relevant CloudTrail events, with timestamps and principal details, subject to available logging and retention.",
    "Image tag and digest availability in the intended repository and Region.",
    "The last known-good deployment image digest and the tested rollback image."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm AWS identity and account",
      objective:
        "Determine which principal is attempting to authenticate to ECR.",
      commands: [
        "aws sts get-caller-identity",
        "aws configure list",
        "aws sts get-caller-identity --profile production",
        "aws --version",
        "docker version"
      ],
      interpretation: [
        "Run only the profile command appropriate to your environment; do not assume the production profile exists.",
        "The Account field identifies the active AWS account, while Arn identifies the current IAM user or assumed role.",
        "If the caller identity command fails, troubleshoot credential resolution, role assumption, or expired credentials before ECR.",
        "A valid identity does not imply that the principal has ECR permissions.",
        "In CI, confirm the identity from the actual job step that performs the push or pull. A developer laptop's identity may be different.",
        "Check whether environment variables, profiles, role chaining, or credential helpers override the expected credentials."
      ],
      nextAction:
        "Record the exact caller ARN, account, Region, and credential source used by the failing operation."
    },
    {
      step: 2,
      title: "Confirm the Region and registry URI",
      objective:
        "Prevent authentication against the wrong registry or Region.",
      commands: [
        "aws configure get region",
        "aws ecr describe-registry --region ap-south-1",
        "aws ecr describe-repositories --region ap-south-1 --repository-names my-app",
        "aws ecr describe-images --region ap-south-1 --repository-name my-app --query 'imageDetails[].{Tags:imageTags,Digest:imageDigest,PushedAt:imagePushedAt}' --output table"
      ],
      interpretation: [
        "Replace ap-south-1 and my-app with the intended Region and repository.",
        "The private ECR registry URI generally follows ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com.",
        "The registry account and Region must match the intended destination.",
        "A repository-not-found result may mean the repository does not exist, the Region is wrong, the account is wrong, or the caller cannot access it.",
        "A successful describe-images call confirms that the queried image metadata is accessible; it does not prove Docker authentication or layer download will work.",
        "If the pipeline uses a full image URI, compare its account, Region, repository, and tag with the deployment configuration."
      ],
      nextAction:
        "Verify the intended registry URI and image reference before changing permissions."
    },
    {
      step: 3,
      title: "Test ECR authorization-token retrieval",
      objective:
        "Separate AWS credential problems from Docker registry authentication.",
      commands: [
        "aws ecr get-authorization-token --region ap-south-1 --query 'authorizationData[].{ProxyEndpoint:proxyEndpoint,ExpiresAt:expiresAt}' --output table",
        "aws ecr get-login-password --region ap-south-1 > $null"
      ],
      interpretation: [
        "The first command intentionally excludes the authorizationToken field so the secret token is not printed.",
        "The second command discards the token output rather than displaying it. A successful exit indicates that token retrieval succeeded.",
        "ECR authorization tokens are temporary; they are valid for up to 12 hours, and access is based on the IAM principal that requested them.",
        "AccessDenied at this stage commonly points to missing ecr:GetAuthorizationToken or an explicit deny from a higher-level policy.",
        "ExpiredToken from AWS indicates that the underlying AWS credentials or session need attention; it is not the same as an expired Docker registry session.",
        "The token is Region-specific for the intended registry endpoint. Use the correct Region consistently."
      ],
      nextAction:
        "If token retrieval fails, investigate IAM and AWS credentials. If it succeeds, proceed to Docker login and repository-specific access."
    },
    {
      step: 4,
      title: "Perform a safe Docker login",
      objective:
        "Validate registry authentication without exposing the authorization token.",
      commands: [
        "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com",
        "docker logout ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com"
      ],
      interpretation: [
        "Use the login command first. Replace ACCOUNT_ID and Region with the correct private registry values.",
        "The username for the standard ECR Docker login flow is AWS.",
        "A successful login proves that Docker accepted credentials for the registry endpoint; it does not prove permission to push to a particular repository.",
        "If the login fails with a credential helper or Docker configuration error, inspect the configured Docker credential store without printing secret contents.",
        "The logout command removes the local registry login and is a cleanup step, not a fix for authentication failure. Run it only when you intend to sign out.",
        "In automation, authenticate immediately before the registry operation so a temporary token is not reused beyond its lifetime."
      ],
      nextAction:
        "If login succeeds, test the exact required repository operation. If it fails, compare Region, registry hostname, token retrieval, Docker configuration, and network connectivity."
    },
    {
      step: 5,
      title: "Check the minimum required IAM permissions",
      objective:
        "Identify whether the principal is missing token, pull, or push permissions.",
      commands: [
        "aws iam get-role --role-name CI-ECR-Role",
        "aws iam list-attached-role-policies --role-name CI-ECR-Role",
        "aws iam list-role-policies --role-name CI-ECR-Role",
        "aws iam simulate-principal-policy --policy-source-arn arn:aws:iam::ACCOUNT_ID:role/CI-ECR-Role --action-names ecr:GetAuthorizationToken ecr:BatchCheckLayerAvailability ecr:InitiateLayerUpload ecr:UploadLayerPart ecr:CompleteLayerUpload ecr:PutImage --resource-arns arn:aws:ecr:ap-south-1:ACCOUNT_ID:repository/my-app"
      ],
      interpretation: [
        "These IAM inspection commands require permission to inspect the relevant IAM resources; a denied inspection is not proof that the ECR operation itself is denied.",
        "The role ARN and repository ARN are examples. Replace them with the actual principal and repository.",
        "ecr:GetAuthorizationToken requires Resource: \"*\" in its IAM policy because it is not repository-scoped.",
        "Repository push permissions typically include BatchCheckLayerAvailability, InitiateLayerUpload, UploadLayerPart, CompleteLayerUpload, and PutImage, along with GetAuthorizationToken.",
        "Pull permissions typically include BatchCheckLayerAvailability, BatchGetImage, and GetDownloadUrlForLayer, along with GetAuthorizationToken.",
        "The simulator is useful evidence but may not fully represent every organization SCP, resource policy, session policy, endpoint policy, or runtime condition.",
        "A broad explicit deny can override an otherwise allowing identity policy."
      ],
      nextAction:
        "Compare the missing action with the actual failing API operation, then request the narrowest required permission."
    },
    {
      step: 6,
      title: "Separate push permissions from pull permissions",
      objective:
        "Avoid granting upload permissions to workloads that only need to pull images.",
      commands: [
        "aws ecr describe-repositories --region ap-south-1 --repository-names my-app",
        "aws ecr describe-images --region ap-south-1 --repository-name my-app --image-ids imageTag=latest",
        "aws ecr batch-get-image --region ap-south-1 --repository-name my-app --image-ids imageTag=latest --query 'images[].{ImageId:imageId,FailureCode:failureCode,FailureReason:failureReason}' --output json"
      ],
      interpretation: [
        "describe-repositories and describe-images test ECR API access, not the complete Docker pull path.",
        "batch-get-image can help establish whether a manifest is accessible; it does not download all image layers.",
        "If a pull-only runtime receives a push permission error, verify whether the wrong identity or operation is being used.",
        "If a push succeeds but deployment fails, investigate the runtime's pull identity separately.",
        "The latest tag may be absent, mutable, or point to an unexpected image. Prefer a known-good digest for incident recovery when possible."
      ],
      nextAction:
        "Assign permissions according to the actual actor: publisher, deployment controller, node, or task execution role."
    },
    {
      step: 7,
      title: "Inspect the ECR repository policy",
      objective:
        "Determine whether repository-level policy permits the intended principal.",
      commands: [
        "aws ecr get-repository-policy --region ap-south-1 --repository-name my-app",
        "aws ecr get-registry-policy --region ap-south-1",
        "aws ecr describe-registry --region ap-south-1"
      ],
      interpretation: [
        "The registry policy command is relevant only when registry-level policy features are configured and the caller has permission to inspect them.",
        "Cross-account access often requires appropriate identity permissions in the caller account and a repository policy in the owner account.",
        "A repository policy that names the wrong account, role, or condition can block access even if the caller's identity policy appears correct.",
        "Do not replace the whole repository policy with a guessed JSON document during an incident.",
        "Capture and review the current policy before any approved modification."
      ],
      nextAction:
        "Verify the exact principal ARN, repository ARN, allowed actions, and policy conditions. Change only the demonstrated policy defect."
    },
    {
      step: 8,
      title: "Investigate cross-account ECR access",
      objective:
        "Confirm that the publisher or runtime in one AWS account can access the repository owned by another.",
      commands: [
        "aws sts get-caller-identity",
        "aws ecr describe-repositories --region ap-south-1 --registry-id ECR_OWNER_ACCOUNT_ID --repository-names my-app",
        "aws ecr get-repository-policy --region ap-south-1 --registry-id ECR_OWNER_ACCOUNT_ID --repository-name my-app"
      ],
      interpretation: [
        "ECR_OWNER_ACCOUNT_ID identifies the account that owns the repository, not necessarily the account running the pipeline.",
        "The image URI must use the owner account ID and correct Region.",
        "Cross-account push and pull require the appropriate identity-side and repository-side authorization arrangements.",
        "Cross-account KMS encryption can introduce an additional key-policy and grant requirement.",
        "Do not add an entire AWS account or all principals to a repository policy unless the architecture and security approval explicitly require it."
      ],
      nextAction:
        "Validate both account identities, repository policy, role permissions, and KMS access if customer-managed encryption is used."
    },
    {
      step: 9,
      title: "Check Docker push and image manifest publication",
      objective:
        "Determine whether the failure happens during layer upload or manifest publication.",
      commands: [
        "docker image ls",
        "docker image inspect ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/my-app:BUILD_TAG --format '{{.Id}}'",
        "docker push ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/my-app:BUILD_TAG",
        "aws ecr describe-images --region ap-south-1 --repository-name my-app --image-ids imageTag=BUILD_TAG"
      ],
      interpretation: [
        "Use the actual built image and a unique approved build tag.",
        "A local image inspection confirms that the image exists on the runner; it does not prove the remote repository is writable.",
        "A push may upload some layers and then fail at a later step. Review the exact denied operation and subsequent repository state.",
        "PutImage denial points toward manifest publication permissions or policy restrictions.",
        "Layer upload errors can indicate missing upload permissions, expired credentials, network interruption, or other service errors.",
        "Do not blindly rerun a partially failed release using a mutable production tag without checking what is already published."
      ],
      nextAction:
        "Identify the exact failed push stage, verify the expected image digest, and retry only after the cause is corrected."
    },
    {
      step: 10,
      title: "Check image tag, digest, and repository existence",
      objective:
        "Separate authorization failure from an image that does not exist.",
      commands: [
        "aws ecr describe-images --region ap-south-1 --repository-name my-app --image-ids imageTag=BUILD_TAG",
        "aws ecr list-images --region ap-south-1 --repository-name my-app --filter tagStatus=TAGGED --query 'imageIds[].imageTag' --output text",
        "docker manifest inspect ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/my-app:BUILD_TAG"
      ],
      interpretation: [
        "manifest unknown often indicates a missing tag or manifest, but first confirm the repository and registry identity.",
        "An authorization error and a missing image are different failures even when they appear in the same deployment pipeline.",
        "A tag may have been overwritten, expired by lifecycle policy, or pushed to a different Region.",
        "The Docker manifest command needs the relevant registry access and a compatible Docker setup.",
        "For rollback, prefer a previously verified image digest rather than assuming that latest still points to the correct release."
      ],
      nextAction:
        "Confirm the exact image reference and publish or select the intended immutable digest through the release process."
    },
    {
      step: 11,
      title: "Check network connectivity and private endpoints",
      objective:
        "Find DNS, proxy, firewall, or VPC endpoint issues that can resemble authentication failures.",
      commands: [
        "nslookup api.ecr.ap-south-1.amazonaws.com",
        "nslookup ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com",
        "curl -sS -o /dev/null -w '%{http_code}\\n' https://api.ecr.ap-south-1.amazonaws.com/",
        "aws ec2 describe-vpc-endpoints --region ap-south-1 --filters Name=vpc-id,Values=vpc-VPCID --output table"
      ],
      interpretation: [
        "The curl request is a connectivity probe, not an authenticated ECR API test. An HTTP response such as 400 or 403 can still prove that an endpoint was reached.",
        "ECR API and Docker registry traffic use different endpoints. Image layer downloads may also use S3 connectivity.",
        "Private ECR access commonly requires the relevant ECR API and Docker registry interface endpoints, plus S3 access for image layers where applicable.",
        "Check VPC endpoint policies, private DNS, security groups on endpoint network interfaces, route configuration, DNS resolution, and proxy behavior.",
        "A proxy can interfere with Docker registry traffic even when AWS CLI calls succeed.",
        "Do not assume that a NAT Gateway is required if the architecture is designed around private endpoints."
      ],
      nextAction:
        "Test each required endpoint from the actual runner or node network and correct the first proven connectivity or policy failure."
    },
    {
      step: 12,
      title: "Investigate GitHub Actions OIDC and temporary role credentials",
      objective:
        "Determine whether CI is assuming the intended IAM role and refreshing credentials correctly.",
      commands: [
        "aws sts get-caller-identity",
        "aws configure list",
        "aws ecr get-login-password --region ap-south-1 > $null"
      ],
      interpretation: [
        "Run these checks inside the same GitHub Actions job context that performs the ECR operation.",
        "If the role ARN differs from the expected role, inspect the workflow's credential configuration and role assumption step.",
        "OIDC trust conditions may restrict repository, branch, tag, environment, or audience.",
        "An expired temporary session can break later operations if the workflow does not refresh credentials correctly.",
        "Do not print OIDC tokens, secret values, or temporary access keys into the job log.",
        "A successful role assumption still requires the role's ECR permissions and any required repository policy."
      ],
      nextAction:
        "Confirm the actual assumed role and OIDC trust conditions, then verify that the role has the minimum permissions for the requested push or pull."
    },
    {
      step: 13,
      title: "Investigate Jenkins, EC2, or other CI runner identity",
      objective:
        "Find credential-source differences between the developer workstation and automation runner.",
      commands: [
        "aws sts get-caller-identity",
        "aws configure list",
        "aws ecr get-login-password --region ap-south-1 > $null",
        "docker info"
      ],
      interpretation: [
        "Run the commands on the actual runner under the same account and execution context as the failing job.",
        "A local developer login may use a different IAM identity from Jenkins, EC2 instance profiles, or assumed roles.",
        "Docker credential helpers and per-user Docker configuration can differ between an interactive shell and a service account.",
        "If a pipeline runs as a service user, verify the intended Docker configuration and credential-store behavior without dumping credentials.",
        "Avoid long-lived static AWS keys when an approved role-based credential mechanism is available."
      ],
      nextAction:
        "Align the automation's credential source and Docker authentication context with the intended role and registry."
    },
    {
      step: 14,
      title: "Troubleshoot Kubernetes EKS ImagePullBackOff",
      objective:
        "Determine whether the node can authenticate to ECR and pull the image.",
      commands: [
        "kubectl get pods -n production -o wide",
        "kubectl describe pod POD_NAME -n production",
        "kubectl get events -n production --sort-by=.lastTimestamp",
        "kubectl get nodes -o wide",
        "aws eks describe-cluster --region ap-south-1 --name CLUSTER_NAME --query 'cluster.{Name:name,Status:status,Version:version}'"
      ],
      interpretation: [
        "Use the actual namespace, Pod name, cluster, and Region.",
        "Pod events frequently reveal whether the problem is image not found, registry authorization, network timeout, or rate limiting.",
        "For standard EKS EC2 nodes, verify the node IAM role and the ECR pull permissions required by the node image-pull path.",
        "For Fargate, inspect the relevant Fargate execution role configuration and platform requirements.",
        "Do not assume that granting ECR permissions to the application's IRSA or Pod Identity role automatically fixes image pulls; image pulls happen before the application container starts.",
        "Check node readiness, DNS, private endpoints, and S3 image-layer connectivity when events show network errors.",
        "If only one node fails, compare its subnet, role, runtime, and network path with a healthy node."
      ],
      nextAction:
        "Use the Pod event and actual node/runtime architecture to identify the pull identity and failing network or authorization layer."
    },
    {
      step: 15,
      title: "Troubleshoot ECS CannotPullContainerError",
      objective:
        "Identify the task execution identity and image retrieval failure.",
      commands: [
        "aws ecs describe-services --region ap-south-1 --cluster CLUSTER_NAME --services SERVICE_NAME --query 'services[].{Status:status,Events:events[0:10],Tasks:runningCount,Desired:desiredCount}' --output json",
        "aws ecs list-tasks --region ap-south-1 --cluster CLUSTER_NAME --service-name SERVICE_NAME --desired-status STOPPED",
        "aws ecs describe-tasks --region ap-south-1 --cluster CLUSTER_NAME --tasks TASK_ARN --query 'tasks[].{StoppedReason:stoppedReason,Containers:containers[].{Name:name,Reason:reason,ExitCode:exitCode}}' --output json"
      ],
      interpretation: [
        "Stopped task details may no longer be available indefinitely; collect evidence promptly.",
        "Inspect the task definition's executionRoleArn, image URI, Region, and registry account.",
        "The ECS task execution role is commonly used for image retrieval. The application task role is intended for application API calls and is not interchangeable with it.",
        "Check whether the image tag exists and whether the execution role has the required ECR permissions.",
        "For private subnets, verify ECR endpoints, S3 image-layer connectivity, DNS, and the intended egress path.",
        "For cross-account images, inspect repository policy and KMS permissions where applicable."
      ],
      nextAction:
        "Correct the execution role, repository policy, image reference, or network path supported by the stopped-task reason."
    },
    {
      step: 16,
      title: "Check KMS encryption permissions",
      objective:
        "Investigate ECR failures involving customer-managed encryption keys.",
      commands: [
        "aws ecr describe-repositories --region ap-south-1 --repository-names my-app --query 'repositories[].{Repository:repositoryName,Encryption:encryptionConfiguration}' --output json",
        "aws kms describe-key --region ap-south-1 --key-id KEY_ID",
        "aws kms get-key-policy --region ap-south-1 --key-id KEY_ID --policy-name default"
      ],
      interpretation: [
        "This step applies when the repository uses a customer-managed KMS key.",
        "A disabled key, incorrect key Region, deleted key, restrictive key policy, or missing grant may prevent the required operation.",
        "Cross-account scenarios can require permissions in both the identity and key policy, subject to the supported ECR/KMS configuration.",
        "Do not change the key policy or disable encryption as an incident shortcut.",
        "Some KMS authorization checks and failures may appear in CloudTrail; correlate them with the ECR operation timestamp."
      ],
      nextAction:
        "Validate key status and the supported ECR encryption requirements, then request the smallest approved KMS policy or grant correction."
    },
    {
      step: 17,
      title: "Inspect CloudTrail and recent access-policy changes",
      objective:
        "Correlate denied ECR API calls with the identity and configuration changes.",
      commands: [
        "aws cloudtrail lookup-events --region ap-south-1 --lookup-attributes AttributeKey=EventSource,AttributeValue=ecr.amazonaws.com --max-results 50",
        "aws cloudtrail lookup-events --region ap-south-1 --lookup-attributes AttributeKey=EventSource,AttributeValue=sts.amazonaws.com --max-results 50",
        "aws cloudtrail lookup-events --region ap-south-1 --lookup-attributes AttributeKey=EventSource,AttributeValue=kms.amazonaws.com --max-results 50"
      ],
      interpretation: [
        "These commands search available CloudTrail management event history; logging scope and retention affect what is available.",
        "Review the event time, event name, principal, error code, and resource details.",
        "ECR image push/pull operations can involve registry API traffic and not every data-plane detail is necessarily represented in the same way as a management event.",
        "An empty search result does not prove that no relevant event occurred.",
        "For large investigations, use the organization's approved CloudTrail Lake or centralized logging query process.",
        "Redact account identifiers and internal resource details before sharing evidence externally."
      ],
      nextAction:
        "Correlate the denied operation with the actual principal and recent changes before modifying IAM or repository policy."
    },
    {
      step: 18,
      title: "Recover safely and validate the release",
      objective:
        "Restore the required image operation and confirm that the deployment uses the correct artifact.",
      commands: [
        "aws sts get-caller-identity",
        "aws ecr get-login-password --region ap-south-1 > $null",
        "aws ecr describe-images --region ap-south-1 --repository-name my-app --image-ids imageTag=BUILD_TAG",
        "docker pull ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/my-app:BUILD_TAG",
        "docker image inspect ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com/my-app:BUILD_TAG --format '{{.Id}}'"
      ],
      interpretation: [
        "Use the intended identity and actual image reference.",
        "A successful token retrieval tests AWS-to-ECR authentication but does not prove repository access.",
        "A successful Docker pull validates more of the registry and image-layer path than a login alone.",
        "Compare the resulting image digest or image identity with the expected release artifact.",
        "For a push incident, additionally verify that the intended tag/digest appears in ECR after publication.",
        "For ECS or EKS, validate the workload rollout, health checks, and application version separately."
      ],
      nextAction:
        "Declare recovery only after the required registry operation, artifact identity, workload health, and security posture are verified."
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "AccessDenied for ecr:GetAuthorizationToken",
      likelyCause: "Missing token permission or an explicit deny",
      evidence: "The token retrieval command fails under the actual caller identity.",
      resolution: "Grant the minimum required token permission with Resource set to * and review applicable explicit denies."
    },
    {
      symptom: "Docker login succeeds but push fails",
      likelyCause: "Missing repository push permission, repository policy denial, expired session, or upload-path failure",
      evidence: "Login succeeds but the exact push stage reports a denied action or transport error.",
      resolution: "Identify the failed API action and correct the repository-scoped permissions or demonstrated network issue."
    },
    {
      symptom: "Docker login succeeds but pull fails",
      likelyCause: "Missing pull permissions, incorrect image URI, absent image, or layer-download connectivity problem",
      evidence: "Token retrieval and login succeed but pull reports an authorization, manifest, or transport error.",
      resolution: "Verify repository identity, image existence, pull permissions, and required endpoints."
    },
    {
      symptom: "ExpiredToken",
      likelyCause: "Underlying AWS session credentials expired or were not refreshed",
      evidence: "STS or an AWS API rejects the current temporary credentials.",
      resolution: "Repair the role-assumption or credential-refresh mechanism and obtain a fresh session."
    },
    {
      symptom: "no basic auth credentials",
      likelyCause: "Docker has no usable registry credentials for the exact registry hostname",
      evidence: "Docker pull/push reports missing credentials while the expected registry login was absent, used a different endpoint, or occurred in another execution context.",
      resolution: "Authenticate to the exact Region-specific registry in the same Docker context immediately before the operation."
    },
    {
      symptom: "manifest unknown",
      likelyCause: "Repository or requested tag/digest is absent or incorrect",
      evidence: "ECR image inspection cannot find the requested image reference.",
      resolution: "Publish the intended image or correct the image reference to a verified tag/digest."
    },
    {
      symptom: "Cross-account AccessDenied",
      likelyCause: "Caller IAM policy or repository resource policy does not allow the intended cross-account operation",
      evidence: "The actual caller belongs to a different account from the repository owner.",
      resolution: "Validate the principal, repository policy, required identity permissions, and KMS access if applicable."
    },
    {
      symptom: "EKS ImagePullBackOff",
      likelyCause: "Node/runtime pull identity, image reference, registry permissions, or network access failure",
      evidence: "Pod events identify a registry authentication, manifest, or network error.",
      resolution: "Diagnose the node/runtime pull path; do not assume application workload IAM is the image-pull identity."
    },
    {
      symptom: "ECS CannotPullContainerError",
      likelyCause: "Execution-role permission, image URI, repository policy, or network connectivity failure",
      evidence: "Stopped task reason and service events show image retrieval failed.",
      resolution: "Correct the execution role, image reference, repository access, or endpoint connectivity."
    },
    {
      symptom: "ECR login hangs or times out",
      likelyCause: "DNS, proxy, firewall, VPC endpoint, or network egress issue",
      evidence: "Endpoint probes or runner network diagnostics fail while AWS identity may still be valid.",
      resolution: "Restore the intended endpoint connectivity and verify the ECR API and registry paths separately."
    },
    {
      symptom: "ECR works in one Region but not another",
      likelyCause: "Wrong registry URI, missing regional repository, different IAM/resource policy, or cross-Region image not replicated",
      evidence: "Region-specific repository and image checks differ.",
      resolution: "Authenticate and publish/pull in the intended Region and verify repository/replication configuration."
    },
    {
      symptom: "Only one runner fails",
      likelyCause: "Different credentials, Docker configuration, proxy, DNS, network path, or local cache",
      evidence: "A healthy runner succeeds under a different execution context.",
      resolution: "Compare identities, versions, credential stores, environment, and endpoint connectivity."
    }
  ],

  recoveryProcedures: [
    {
      scenario: "ECR authorization-token retrieval is denied",
      steps: [
        "Capture the caller ARN using STS.",
        "Confirm the target Region and registry.",
        "Identify whether the failure is ecr:GetAuthorizationToken or a higher-level explicit deny.",
        "Inspect the applicable role policy, permission boundary, session policy, SCP, and relevant endpoint policy.",
        "Request the minimum required permission from the authorized AWS administrator.",
        "Retry token retrieval without printing the token."
      ],
      validation: [
        "The correct principal can retrieve an ECR authorization token.",
        "No broad administrator policy was introduced.",
        "The token is not written to logs or tickets."
      ]
    },
    {
      scenario: "Docker login works but ECR push is denied",
      steps: [
        "Identify the exact repository and image tag.",
        "Confirm the caller identity in the publishing job.",
        "Inspect the failed push output and relevant authorization evidence.",
        "Verify repository-scoped push actions and repository policy.",
        "Check whether the repository uses customer-managed encryption and whether the relevant configuration is valid.",
        "Make the approved minimal policy change.",
        "Retry using the intended image and unique build tag."
      ],
      validation: [
        "The push completes successfully.",
        "ECR reports the expected tag and digest.",
        "The image can be pulled using the intended runtime identity.",
        "No unnecessary repository or account-wide permissions were added."
      ]
    },
    {
      scenario: "EKS Pod cannot pull an ECR image",
      steps: [
        "Inspect Pod events and identify the exact image URI and error.",
        "Determine whether the Pod runs on EC2-backed nodes or Fargate.",
        "Identify the actual node or Fargate image-pull identity.",
        "Check repository existence, pull permissions, account, Region, and image digest.",
        "Verify DNS, ECR endpoints, S3 layer connectivity, and node readiness.",
        "Correct the proven issue and allow the workload controller to retry according to its normal behavior.",
        "Avoid repeatedly deleting Pods when the underlying image access failure is unchanged."
      ],
      validation: [
        "The replacement Pod pulls the expected image.",
        "The rollout reaches its desired available state.",
        "The application health check passes.",
        "The deployed digest matches the approved release."
      ]
    },
    {
      scenario: "ECS service fails to launch tasks due to ECR access",
      steps: [
        "Capture service events and stopped-task reasons.",
        "Inspect the task definition image URI and execution role.",
        "Check the execution role's ECR permissions and the repository policy.",
        "Check image existence and the network path from the task's subnet.",
        "Verify KMS requirements if the repository uses a customer-managed key.",
        "Correct the demonstrated cause and start a controlled deployment or task replacement.",
        "Retain the last known-good task definition and image digest for rollback."
      ],
      validation: [
        "New tasks start and retrieve the intended image.",
        "The service reaches its expected running and healthy counts.",
        "Load balancer target health and application health checks pass.",
        "The rollback image remains accessible."
      ]
    },
    {
      scenario: "Cross-account ECR access fails",
      steps: [
        "Record the caller account, caller role ARN, registry owner account, and Region.",
        "Confirm the image URI uses the repository owner's registry ID.",
        "Inspect caller identity permissions and the owner repository policy.",
        "Check explicit denies and applicable organization controls.",
        "Validate KMS key access if required by the repository's encryption setup.",
        "Make a narrowly scoped approved change on the relevant account or resource.",
        "Retest the exact pull or push operation from the original caller."
      ],
      validation: [
        "The intended cross-account operation succeeds.",
        "Unrelated principals remain unauthorized.",
        "The policy change and business justification are recorded."
      ]
    },
    {
      scenario: "ECR access fails because the runner cannot reach the registry",
      steps: [
        "Check DNS resolution for the ECR API and registry endpoints.",
        "Determine whether the runner is inside a VPC, behind a proxy, or on an external hosted runner.",
        "Inspect required VPC endpoints, endpoint policies, DNS settings, security groups, and egress paths.",
        "Check the S3 path required for image layer downloads.",
        "Compare the failing runner with a known-good runner.",
        "Correct the proven DNS, proxy, endpoint, route, or firewall issue.",
        "Retry the exact registry operation and inspect the result."
      ],
      validation: [
        "The runner reaches the required endpoints.",
        "Docker login and image transfer succeed.",
        "Private access controls remain intact.",
        "No unnecessary public endpoint or firewall exposure was introduced."
      ]
    }
  ],

  advancedScenarios: [
    {
      scenario: "GitHub Actions suddenly cannot push to ECR",
      investigation: [
        "Inspect the failed job step and exact AWS error.",
        "Run STS caller identity within the publishing job.",
        "Confirm the expected role ARN and the role-assumption step.",
        "Review the workflow's permissions needed for OIDC token issuance.",
        "Inspect the IAM OIDC trust conditions for repository, branch, tag, environment, and audience restrictions.",
        "Check whether a repository rename, branch change, environment change, or trust-policy update occurred.",
        "Check the target ECR repository policy and the exact failed push action."
      ],
      resolution: [
        "Correct the trust condition or role selection only after confirming the intended repository and workflow identity.",
        "Grant the minimum ECR publishing permissions to the publishing role.",
        "Use temporary role credentials rather than embedding long-lived AWS keys in workflow YAML.",
        "Retry with a unique build tag and validate the resulting digest.",
        "Add a workflow identity check before the push step."
      ]
    },
    {
      scenario: "Jenkins ECR login succeeds interactively but fails in the pipeline",
      investigation: [
        "Compare STS identity in the interactive session and Jenkins job.",
        "Check which OS account runs the Jenkins agent.",
        "Inspect AWS credential provider configuration and Docker credential-helper setup.",
        "Check whether the job uses a different Region or registry URI.",
        "Inspect the exact failing pipeline step without printing credentials.",
        "Determine whether temporary credentials expire during a long build."
      ],
      resolution: [
        "Configure the intended role or approved credential provider for the Jenkins execution identity.",
        "Run login immediately before push/pull using the correct Region.",
        "Avoid storing authorization tokens as long-lived Jenkins secrets.",
        "Validate a clean agent workspace and the expected image digest."
      ]
    },
    {
      scenario: "ECR pull fails only in private subnets",
      investigation: [
        "Inspect DNS resolution and VPC endpoint configuration.",
        "Verify ECR API and registry endpoint access.",
        "Check S3 image-layer connectivity using the architecture's approved network path.",
        "Review endpoint policies and endpoint security groups.",
        "Compare subnet routes, DNS settings, and network ACLs with a working subnet.",
        "Separate endpoint connection errors from IAM authorization errors."
      ],
      resolution: [
        "Restore the required endpoint, DNS, or network configuration.",
        "Keep the private subnet's intended security boundary.",
        "Validate both manifest retrieval and full image-layer download.",
        "Add a private-subnet image-pull smoke test."
      ]
    },
    {
      scenario: "Image push succeeds but production deploys the wrong image",
      investigation: [
        "Compare the build output digest, ECR digest, deployment manifest, and running workload image.",
        "Check whether mutable tags such as latest or production were overwritten.",
        "Inspect CI job ordering and concurrent publication behavior.",
        "Check whether the deployment references another account or Region.",
        "Review rollout history and determine whether some instances use a previous image."
      ],
      resolution: [
        "Deploy a verified immutable image digest when supported by the release design.",
        "Use unique build tags and record the build-to-digest mapping.",
        "Roll back through the approved deployment mechanism if the wrong image is active.",
        "Validate every target's running image and application health before closing the incident."
      ]
    },
    {
      scenario: "ECR access breaks after IAM policy or SCP changes",
      investigation: [
        "Capture the actual caller ARN and denied action.",
        "Compare the last known-good policy version with the current policy.",
        "Inspect role policies, permission boundaries, session policies, and applicable SCPs.",
        "Review available CloudTrail evidence for the change timeline.",
        "Check whether only one OU, account, role, or Region is affected."
      ],
      resolution: [
        "Restore the approved least-privilege permission through change control.",
        "Do not bypass an organization-level deny by creating an unapproved identity.",
        "Test the affected operation under the original execution identity.",
        "Add policy-change review and regression checks."
      ]
    },
    {
      scenario: "ECR image pull fails after credential rotation",
      investigation: [
        "Determine whether AWS API credentials, Docker credentials, or another credential source was rotated.",
        "Run STS caller identity using the actual runtime or CI identity.",
        "Check whether a new role or key has the expected permissions.",
        "Check whether Docker is still using a stale registry login.",
        "Review rotation timestamps and failed operation timestamps."
      ],
      resolution: [
        "Refresh AWS credentials using the approved provider.",
        "Perform a fresh ECR login for the correct registry.",
        "Remove stale credentials through the approved credential-store process.",
        "Validate the required pull or push operation without exposing token contents."
      ]
    },
    {
      scenario: "ECR access is denied despite apparently correct IAM permissions",
      investigation: [
        "Verify the principal ARN at the time of the failed operation.",
        "Identify the exact API action and repository resource.",
        "Check resource policy, permission boundary, session policy, SCP, VPC endpoint policy, and condition keys.",
        "Check cross-account policy requirements and KMS access where applicable.",
        "Compare policy evaluation evidence with the exact request context."
      ],
      resolution: [
        "Fix the specific explicit deny, missing condition, wrong resource ARN, or wrong principal.",
        "Avoid granting wildcard permissions as a diagnostic shortcut.",
        "Retest with the same role, Region, repository, and operation.",
        "Record the evidence that proved the root cause."
      ]
    }
  ],

  prevention: [
    "Use separate IAM roles for image publishing and runtime image pulling.",
    "Grant ecr:GetAuthorizationToken separately with the required Resource: * scope, and scope repository operations to the intended repositories.",
    "Use GitHub Actions OIDC or another approved role-based credential mechanism instead of long-lived AWS keys when possible.",
    "Validate AWS caller identity and Region before publishing images.",
    "Authenticate to ECR immediately before the registry operation.",
    "Use unique build tags and record immutable image digests for releases.",
    "Verify the published image can be pulled by the intended runtime identity before promoting it.",
    "Keep repository policies narrowly scoped for cross-account access.",
    "Review KMS key status, policy, and required permissions when using customer-managed encryption.",
    "Test private ECR endpoint connectivity from the actual runner or cluster subnet.",
    "Enable appropriate CloudTrail and security monitoring with suitable retention.",
    "Add CI preflight checks for identity, Region, repository existence, and image publication permissions.",
    "Avoid exposing authorization tokens or Docker credential configuration in logs.",
    "Monitor EKS image-pull errors and ECS stopped-task reasons.",
    "Test rollback using a known-good digest and verify that it remains accessible under lifecycle policies.",
    "Review ECR lifecycle policies and replication configuration so required rollback images are retained in the correct Regions.",
    "Document the distinct pull identities for EKS EC2 nodes, EKS Fargate, and ECS tasks.",
    "Periodically test cross-account and private-subnet access from the real execution context."
  ],

  monitoringAndAlerting: [
    "Alert on repeated ECR AccessDenied, failed Docker pushes, and failed image pulls in CI/CD.",
    "Monitor EKS ImagePullBackOff and ErrImagePull events.",
    "Monitor ECS task startup failures and CannotPullContainerError reasons.",
    "Track pipeline failures by AWS account, Region, repository, caller role, and operation.",
    "Alert on unexpected broad ECR repository-policy or IAM changes where supported.",
    "Review relevant CloudTrail activity for denied ECR, STS, and KMS operations.",
    "Monitor deployment availability and image digest consistency after a registry incident.",
    "Track whether the previous known-good image remains pullable for rollback.",
    "Use synthetic push/pull tests in a dedicated test repository rather than repeatedly modifying production tags.",
    "Ensure monitoring logs never include ECR authorization tokens, secret access keys, or private credential files."
  ],

  incidentReportTemplate: [
    "Incident title: ECR authentication or image access failure",
    "Incident ID:",
    "AWS account and Region:",
    "ECR registry owner account:",
    "Repository and image tag/digest:",
    "Affected environment, pipeline, cluster, or service:",
    "Incident start and detection timestamp:",
    "Exact failing operation:",
    "Sanitized error message:",
    "Caller ARN and credential source:",
    "Token retrieval and Docker login results:",
    "Required IAM action and policy findings:",
    "Repository policy and cross-account findings:",
    "Network, DNS, endpoint, and S3 path findings:",
    "KMS encryption findings, if applicable:",
    "Evidence from CloudTrail and runtime events:",
    "Evidence-backed root cause:",
    "Approved corrective action:",
    "Image digest and deployment validation:",
    "Rollback validation:",
    "Security impact and credential exposure review:",
    "Recovery duration:",
    "Prevention action, owner, and due date:"
  ],

  handsOnLabs: [
    {
      lab: "Lab 1 — Diagnose a missing ECR token permission",
      steps: [
        "Create a disposable test role and ECR test repository in a sandbox account.",
        "Grant the role only the permissions required for the initial test.",
        "Attempt ECR token retrieval and capture the sanitized result.",
        "Add the minimum required token permission through the approved test change.",
        "Retry token retrieval without printing the token.",
        "Inspect the caller identity and policy result."
      ],
      expectedResult:
        "You can distinguish an AWS credential problem from a missing ECR authorization-token permission."
    },
    {
      lab: "Lab 2 — Separate push permission from pull permission",
      steps: [
        "Create a test repository and build a small container image.",
        "Configure one test role for publishing and another for pulling.",
        "Authenticate each role using the intended Region.",
        "Test push and pull separately.",
        "Remove one required permission in the sandbox and observe the failure.",
        "Restore the minimum required permission and verify the expected digest."
      ],
      expectedResult:
        "You can identify the failing registry operation and apply permissions to the correct role."
    },
    {
      lab: "Lab 3 — Troubleshoot a private-subnet ECR pull",
      steps: [
        "Use a disposable private-subnet workload with a documented ECR access path.",
        "Verify ECR API and registry endpoint connectivity.",
        "Verify the required S3 image-layer path.",
        "Inspect DNS, endpoint policies, and security groups.",
        "Use a test image to verify the full pull operation.",
        "Record the expected image digest and cleanup test resources."
      ],
      expectedResult:
        "You can distinguish network endpoint failures from ECR authorization failures."
    },
    {
      lab: "Lab 4 — Simulate an EKS image-pull incident",
      steps: [
        "Deploy a test Pod using an image in a private ECR repository.",
        "Inspect Pod events and identify the actual error.",
        "Verify the node/runtime pull identity and image URI.",
        "Check repository permissions, DNS, and network access.",
        "Apply one controlled test correction.",
        "Verify the Pod starts and the running image matches the expected digest."
      ],
      expectedResult:
        "You can troubleshoot ImagePullBackOff using workload events and the actual node/runtime access path."
    },
    {
      lab: "Lab 5 — Run a production-style ECR incident drill",
      steps: [
        "Choose a non-production repository and document the last known-good image digest.",
        "Record the AWS identity, Region, repository, and current policy.",
        "Introduce one controlled test failure, such as a missing push permission.",
        "Capture the exact error and inspect policy evidence.",
        "Apply the narrowest correction.",
        "Retry the operation with a unique test tag.",
        "Validate the digest, runtime pull, and rollback image.",
        "Write an incident report with the cause, corrective action, and prevention task."
      ],
      expectedResult:
        "You can restore registry access using evidence, least privilege, controlled retries, and a documented rollback strategy."
    }
  ],

  interviewQuestions: [
    {
      question: "What is AWS ECR authentication?",
      answer:
        "ECR authentication lets a Docker-compatible client obtain and use temporary registry credentials. The requesting AWS identity still needs the permissions required for the intended repository operation."
    },
    {
      question: "Why does docker login succeed but docker push fail?",
      answer:
        "Login proves that the registry accepted the credentials. Push also requires repository publishing permissions and can fail because of repository policy, explicit denies, network issues, or upload/manifest publication failures."
    },
    {
      question: "Which IAM permission is required to obtain an ECR authorization token?",
      answer:
        "ecr:GetAuthorizationToken. This action requires Resource: * in an identity-based policy. Repository-specific push or pull permissions are additional requirements."
    },
    {
      question: "What is the difference between ECR push and pull permissions?",
      answer:
        "Push commonly requires layer-check and upload actions plus ecr:PutImage. Pull commonly requires ecr:BatchGetImage, ecr:GetDownloadUrlForLayer, and layer availability checks. Both flows need token retrieval."
    },
    {
      question: "How long is an ECR authorization token valid?",
      answer:
        "An ECR authorization token is valid for up to 12 hours. Automation should obtain fresh credentials as needed rather than assuming an old Docker login remains valid indefinitely."
    },
    {
      question: "Why can cross-account ECR access fail?",
      answer:
        "The caller's identity permissions, repository policy in the owner account, principal ARN, Region, organization controls, and any required KMS permissions must all be compatible."
    },
    {
      question: "What causes no basic auth credentials?",
      answer:
        "Docker may not have credentials for the exact registry hostname, may be running under a different user or configuration, or may be using the wrong Region. I verify the execution context and authenticate immediately before the operation."
    },
    {
      question: "How do you troubleshoot EKS ImagePullBackOff?",
      answer:
        "I inspect Pod events and the exact image URI, identify the actual node/runtime pull identity, check repository and image existence, then verify IAM permissions, private endpoints, DNS, and layer-download connectivity."
    },
    {
      question: "Which role is used for image pulls in ECS?",
      answer:
        "The ECS task execution role is commonly used for image retrieval. The task role is intended for API access by the application and is not interchangeable with the execution role."
    },
    {
      question: "Does granting permissions to an application's EKS service account automatically fix image pulls?",
      answer:
        "Not necessarily. For standard EC2-backed EKS nodes, the image pull generally uses the node's container-runtime access path. Fargate and other configurations have their own supported execution requirements."
    },
    {
      question: "How do you troubleshoot ECR access from a private subnet?",
      answer:
        "I verify DNS, ECR API and registry endpoints, endpoint policies, endpoint security groups, and the S3 path needed for image layers. I test from the actual runner or node network."
    },
    {
      question: "How do you investigate ECR AccessDenied when the IAM role looks correct?",
      answer:
        "I confirm the actual caller and failed action, then review identity policies, repository policy, SCPs, permission boundaries, session policies, endpoint policies, conditions, and KMS requirements."
    },
    {
      question: "How do you avoid deploying the wrong image after an ECR incident?",
      answer:
        "I use a verified build tag and compare the published image digest with the approved release artifact. For rollback, I use a known-good digest and verify that the runtime can pull it."
    },
    {
      question: "What is the safe approach to an ECR production incident?",
      answer:
        "Establish impact, identity, Region, repository, exact error, and the failing operation; collect evidence; isolate the cause; make the smallest approved correction; retry in a controlled manner; and validate both the artifact and application."
    }
  ],

  officialReferences: [
    {
      title: "Private registry authentication in Amazon ECR",
      url: "https://docs.aws.amazon.com/AmazonECR/latest/userguide/registry_auth.html"
    },
    {
      title: "Amazon ECR IAM permissions",
      url: "https://docs.aws.amazon.com/AmazonECR/latest/userguide/security_iam_id-based-policy-examples.html"
    },
    {
      title: "Amazon ECR repository policies",
      url: "https://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-policies.html"
    },
    {
      title: "Cross-account ECR access",
      url: "https://docs.aws.amazon.com/AmazonECR/latest/userguide/security_iam_service-with-iam.html"
    },
    {
      title: "Amazon ECR VPC endpoints",
      url: "https://docs.aws.amazon.com/AmazonECR/latest/userguide/vpc-endpoints.html"
    },
    {
      title: "EKS container image guidance",
      url: "https://docs.aws.amazon.com/eks/latest/userguide/eks-using-container-images.html"
    },
    {
      title: "Amazon ECS task execution IAM role",
      url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html"
    },
    {
      title: "GitHub Actions OIDC with AWS",
      url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp_oidc.html"
    },
    {
      title: "AWS CLI ECR get-login-password",
      url: "https://docs.aws.amazon.com/cli/latest/reference/ecr/get-login-password.html"
    },
    {
      title: "AWS CloudTrail lookup-events",
      url: "https://docs.aws.amazon.com/cli/latest/reference/cloudtrail/lookup-events.html"
    }
  ]
};
