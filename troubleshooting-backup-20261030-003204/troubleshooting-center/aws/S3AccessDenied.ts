export interface S3AccessDeniedGuide {
  title: string;
  category: string;
  severity: string;
  estimatedTime: string;
  overview: string;
  incidentScenario: string;
  impactAssessment: string[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: {
    step: number;
    title: string;
    purpose: string;
    commands: string[];
    interpretOutput: string[];
    nextAction: string;
  }[];
  errorMatrix: {
    symptom: string;
    likelyCauses: string[];
    verification: string[];
    resolution: string[];
  }[];
  recoveryProcedures: {
    scenario: string;
    procedure: string[];
    validation: string[];
    rollback: string[];
  }[];
  advancedScenarios: {
    title: string;
    symptoms: string[];
    investigation: string[];
    resolution: string[];
  }[];
  prevention: string[];
  monitoringAndAlerting: string[];
  incidentReportTemplate: string[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    successCriteria: string[];
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  references: {
    title: string;
    url: string;
  }[];
}

export const s3AccessDeniedGuide: S3AccessDeniedGuide = {
  title: "Amazon S3 AccessDenied — Real Production Troubleshooting",
  category: "AWS S3, IAM, Bucket Policies, KMS, VPC Endpoints, Cross-Account Access",
  severity: "SEV-1 to SEV-3 depending on data and service impact",
  estimatedTime: "15–60 minutes for initial isolation; complex organization or KMS policies may take longer",

  overview: `
Amazon S3 AccessDenied occurs when the effective authorization or a required
access condition prevents an operation. The failure may come from identity
policies, bucket policies, access-point policies, permissions boundaries, session
policies, AWS Organizations SCPs, VPC endpoint policies, KMS permissions,
Object Ownership, or an explicit deny.

The first task is to identify the exact API operation, caller identity, bucket,
object key, AWS account, Region, and request timestamp. Listing a bucket,
reading an object, uploading an object, deleting an object, and decrypting an
encrypted object require different permissions.

An AccessDenied response does not automatically mean the IAM user or role lacks
s3:GetObject. The request may be blocked by an explicit deny, a resource policy,
a network condition, an organization control, or KMS authorization.

Do not solve this incident by attaching AdministratorAccess or making the bucket
public. Trace the authorization path and apply the smallest permission change
that allows the intended principal to perform the intended operation.
`,

  incidentScenario: `
At 09:30 AM, a production deployment pipeline starts failing while downloading
an application artifact from S3. The previous pipeline succeeded. The new run
reports AccessDenied even though the engineer believes the IAM role already has
S3 access.

The artifact bucket contains production deployment packages, and multiple
environments may depend on it. An engineer recently modified an IAM policy,
moved the pipeline to an OIDC-based role, and enabled a VPC endpoint.

The incident responder must identify the actual caller, failing S3 operation,
object key, encryption configuration, recent policy changes, and any explicit
deny. The responder must restore only the required access and prove that
unintended principals still cannot access the bucket.
`,

  impactAssessment: [
    "Identify the affected application, pipeline, account, Region, bucket, object prefix, and environment.",
    "Determine whether the failure affects ListBucket, GetObject, PutObject, DeleteObject, multipart upload, replication, or another S3 operation.",
    "Determine whether one principal, one object prefix, one account, or all workloads are affected.",
    "Check whether production deployments are blocked, artifact downloads fail, backups are incomplete, or applications cannot read runtime configuration.",
    "Identify whether the bucket contains sensitive data, customer records, backups, deployment artifacts, or compliance-controlled objects.",
    "Record the first failure timestamp and compare it with IAM, bucket-policy, KMS, VPC endpoint, SCP, and deployment changes.",
    "Determine whether the issue affects new objects only, existing objects only, a specific prefix, or objects encrypted with a particular KMS key.",
    "Check whether a failed upload partially completed or whether a deployment already changed production resources.",
    "Set severity according to customer impact, data availability, data integrity, security exposure, and recovery time.",
    "If a security control intentionally denied access, treat it as a possible policy enforcement success until evidence proves otherwise.",
  ],

  safetyChecks: [
    "Confirm the AWS account, Region, caller identity, bucket name, object key, and environment before investigation.",
    "Use read-only commands first and follow production change-approval requirements.",
    "Never attach AdministratorAccess or broad s3:* permissions as a troubleshooting shortcut.",
    "Never change a private bucket to public merely to bypass AccessDenied.",
    "Do not remove an explicit deny until the business requirement and security purpose are understood.",
    "Do not disable encryption, bucket-owner-enforced Object Ownership, organization controls, or endpoint restrictions to make a request succeed.",
    "Do not copy production data to a personal account or public bucket as a workaround.",
    "Redact access keys, session tokens, presigned URLs, sensitive object keys, customer identifiers, and data from logs.",
    "Do not run DeleteObject, PutBucketPolicy, PutBucketPublicAccessBlock, or other mutating commands during diagnosis without authorization.",
    "Capture the current policy and configuration before approved changes so that the exact change can be reverted.",
    "For cross-account access, verify both the caller's permissions and the resource owner's authorization requirements.",
    "If evidence suggests an unexpected principal or credential compromise, follow the security incident process instead of merely granting access.",
  ],

  evidenceCollection: [
    "Exact AWS error code, error message, request ID, extended request ID when supplied, and timestamp.",
    "Caller identity ARN, assumed-role session ARN, account ID, role session name, and credential source.",
    "Bucket name, object key or prefix, Region, endpoint hostname, and operation attempted.",
    "The exact command or SDK operation that failed, including whether it was ListBucket, GetObject, PutObject, DeleteObject, or a multipart operation.",
    "IAM identity policies, permissions boundary, session policy, bucket policy, access-point policy, endpoint policy, and relevant SCPs.",
    "Object encryption mode, KMS key ARN, KMS key policy, grants, and required KMS permissions.",
    "S3 Object Ownership configuration, ACL state where applicable, and Block Public Access configuration.",
    "VPC endpoint ID, endpoint policy, route configuration, DNS behavior, and source network where applicable.",
    "CloudTrail event history or data events where configured and available, including the principal, action, resource, error, and request context.",
    "Recent IAM, bucket-policy, KMS, SCP, endpoint, workload identity, and deployment changes.",
    "Application logs, CI/CD logs, SDK version, AWS CLI version, environment variables, and credential-provider selection.",
    "Whether the same operation succeeds with an approved principal from another environment or network path.",
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm account and caller identity",
      purpose:
        "Establish which principal actually makes the failing S3 request.",
      commands: [
        "aws sts get-caller-identity --output json",
        "aws configure list",
        "aws --version",
      ],
      interpretOutput: [
        "Verify Account and Arn against the intended AWS account and workload role.",
        "An assumed-role ARN indicates temporary role credentials; identify which role and session the workload uses.",
        "The AWS CLI configuration output helps identify the selected profile and credential source, but do not expose secret values.",
        "A developer's local identity may differ from the identity used by GitHub Actions, Jenkins, ECS, EC2, or EKS.",
        "If the identity is unexpected, investigate profile selection, environment variables, OIDC trust, instance/task role credentials, or credential-provider precedence.",
      ],
      nextAction:
        "Record the exact caller ARN and repeat subsequent diagnosis in the same approved identity context as the failing workload.",
    },
    {
      step: 2,
      title: "Identify the exact failing S3 operation",
      purpose:
        "Avoid granting permissions for the wrong action or resource.",
      commands: [
        "aws s3api head-bucket --bucket YOUR_BUCKET --region ap-south-1",
        "aws s3api list-objects-v2 --bucket YOUR_BUCKET --prefix approved-prefix/ --max-keys 5 --region ap-south-1",
        "aws s3api head-object --bucket YOUR_BUCKET --key approved-prefix/example.zip --region ap-south-1",
        "aws s3api get-object --bucket YOUR_BUCKET --key approved-prefix/example.zip --range bytes=0-15 NUL --region ap-south-1",
      ],
      interpretOutput: [
        "Replace YOUR_BUCKET, prefix, key, and Region with approved values. Use a harmless test object whenever possible.",
        "The Windows NUL output target is specific to Windows Command Prompt behavior and may not work identically in PowerShell or other shells. For a real download test, use a secure temporary file with approved handling and cleanup.",
        "HeadBucket errors may not reveal the exact missing permission; cross-account or nonexistent buckets can produce responses that intentionally avoid revealing resource existence.",
        "ListObjectsV2 generally requires s3:ListBucket on the bucket ARN.",
        "HeadObject and GetObject generally require s3:GetObject on the object ARN; encrypted objects may additionally require KMS authorization.",
        "PutObject and multipart operations have their own authorization requirements. DeleteObject and version-specific operations require separate review.",
        "A successful bucket listing does not prove that the caller can read every object, especially when prefixes or encryption keys differ.",
      ],
      nextAction:
        "Write down the exact failed action, resource ARN, and error. Use the operation-specific authorization requirements in the next steps.",
    },
    {
      step: 3,
      title: "Verify bucket name, Region, and endpoint",
      purpose:
        "Rule out wrong bucket, wrong Region, endpoint, or environment selection.",
      commands: [
        "aws s3api get-bucket-location --bucket YOUR_BUCKET --output json",
        "aws s3api get-bucket-policy-status --bucket YOUR_BUCKET --region ap-south-1 --output json",
        "aws s3api get-bucket-ownership-controls --bucket YOUR_BUCKET --region ap-south-1 --output json",
      ],
      interpretOutput: [
        "Some inspection APIs require permissions of their own. An AccessDenied from a diagnostic API does not necessarily prove that the original S3 operation has the same cause.",
        "The bucket's Region must match the intended deployment configuration. S3's legacy location response can represent the default Region as null.",
        "A wrong bucket name or environment can produce a misleading access failure.",
        "Bucket-policy-status reports whether a bucket policy grants public access according to the API's assessment; it does not prove that a specific caller is authorized.",
        "Ownership controls help determine whether ACLs are disabled through Bucket owner enforced Object Ownership.",
      ],
      nextAction:
        "Confirm the intended bucket, Region, endpoint, and ownership model before inspecting authorization policies.",
    },
    {
      step: 4,
      title: "Inspect IAM identity policies",
      purpose:
        "Check whether the actual caller has the required S3 action on the correct resource.",
      commands: [
        "aws iam list-attached-role-policies --role-name YOUR_ROLE",
        "aws iam list-role-policies --role-name YOUR_ROLE",
        "aws iam get-role --role-name YOUR_ROLE --query 'Role.{Arn:Arn,Boundary:PermissionsBoundary,Trust:AssumeRolePolicyDocument}' --output json",
        "aws iam simulate-principal-policy --policy-source-arn arn:aws:iam::ACCOUNT_ID:role/YOUR_ROLE --action-names s3:GetObject --resource-arns arn:aws:s3:::YOUR_BUCKET/approved-prefix/example.zip",
      ],
      interpretOutput: [
        "Replace role, account, bucket, and object values with actual identifiers.",
        "Use the action that failed. For listing, test s3:ListBucket against the bucket ARN, not the object ARN.",
        "For object access, test s3:GetObject against the exact object ARN or an appropriately scoped object prefix.",
        "IAM policy simulation is useful but does not fully prove the result of every real request involving all resource policies, organization controls, endpoint conditions, and service-specific behavior.",
        "A missing allow may explain a failure, but a separate explicit deny can still block access even when an allow exists.",
        "Inspect inline policies, attached managed policies, permissions boundaries, and role session restrictions.",
      ],
      nextAction:
        "Compare the required action and resource against the effective policy path. Do not add permissions until the missing authorization is confirmed.",
    },
    {
      step: 5,
      title: "Inspect bucket policy for explicit deny",
      purpose:
        "Identify resource-policy conditions that override otherwise valid identity permissions.",
      commands: [
        "aws s3api get-bucket-policy --bucket YOUR_BUCKET --region ap-south-1 --query Policy --output text",
        "aws s3api get-public-access-block --bucket YOUR_BUCKET --region ap-south-1 --output json",
      ],
      interpretOutput: [
        "These commands require appropriate permissions; inability to read the policy is not proof that the policy itself is wrong.",
        "Inspect Deny statements, Principal, NotPrincipal, Action, NotAction, Resource, NotResource, and Condition blocks.",
        "Look for conditions involving aws:PrincipalArn, aws:PrincipalOrgID, aws:SourceVpce, aws:SourceVpc, aws:SecureTransport, source IP, or encryption headers.",
        "A Deny statement can block the request even when the role has a matching Allow.",
        "Check whether a recent security change intentionally restricts access to a VPC endpoint or approved organization.",
        "Block Public Access is a security control, not a generic explanation for every private-object AccessDenied. Verify the exact request and policy interaction.",
      ],
      nextAction:
        "Identify the specific statement and condition that matches the failing request. Preserve the intended security boundary while correcting only the proven mismatch.",
    },
    {
      step: 6,
      title: "Separate bucket listing from object access",
      purpose:
        "Correctly scope bucket-level and object-level permissions.",
      commands: [
        "aws iam simulate-principal-policy --policy-source-arn arn:aws:iam::ACCOUNT_ID:role/YOUR_ROLE --action-names s3:ListBucket --resource-arns arn:aws:s3:::YOUR_BUCKET",
        "aws iam simulate-principal-policy --policy-source-arn arn:aws:iam::ACCOUNT_ID:role/YOUR_ROLE --action-names s3:GetObject --resource-arns arn:aws:s3:::YOUR_BUCKET/approved-prefix/example.zip",
      ],
      interpretOutput: [
        "s3:ListBucket is authorized against the bucket ARN and can be constrained using s3:prefix conditions.",
        "s3:GetObject is authorized against an object ARN, commonly arn:aws:s3:::bucket-name/prefix/*.",
        "A policy that grants ListBucket on an object ARN will not correctly grant bucket listing.",
        "A policy that grants GetObject only on the bucket ARN does not correctly scope object reads.",
        "A command such as aws s3 ls s3://bucket/prefix/ may need ListBucket even if a subsequent direct object download only needs object access.",
        "Avoid granting DeleteObject, PutObject, or broad wildcard access to resolve a read-only failure.",
      ],
      nextAction:
        "Create or correct only the action/resource pairing required by the application's real workflow.",
    },
    {
      step: 7,
      title: "Check KMS encryption permissions",
      purpose:
        "Determine whether SSE-KMS authorization prevents reading or writing an object.",
      commands: [
        "aws s3api head-object --bucket YOUR_BUCKET --key approved-prefix/example.zip --region ap-south-1 --query '{Encryption:ServerSideEncryption,KMSKey:SSEKMSKeyId}' --output json",
        "aws kms describe-key --key-id YOUR_KMS_KEY_ARN --region ap-south-1 --output json",
        "aws kms get-key-policy --key-id YOUR_KMS_KEY_ARN --policy-name default --region ap-south-1 --output text",
        "aws kms list-grants --key-id YOUR_KMS_KEY_ARN --region ap-south-1 --output table",
      ],
      interpretOutput: [
        "Inspect the encryption mode and KMS key identifier where the caller has permission to read object metadata.",
        "For SSE-KMS reads, the principal generally needs the required S3 object permission and kms:Decrypt authorization under the KMS key policy and applicable IAM policies.",
        "For SSE-KMS writes, kms:GenerateDataKey is commonly required; additional permissions may be required for multipart operations or the specific encryption workflow.",
        "A KMS key policy can prevent IAM permissions from being sufficient. Cross-account KMS use requires correct authorization on both sides.",
        "A disabled key, pending deletion, wrong key ARN, or missing grant can also cause access or decryption failures.",
        "Do not change the key policy or disable encryption as a shortcut. Determine the exact key and authorization path first.",
      ],
      nextAction:
        "Correct the specific KMS key-policy, IAM permission, grant, or key-state problem under the key owner's change process.",
    },
    {
      step: 8,
      title: "Investigate cross-account access",
      purpose:
        "Verify the caller-side and bucket-owner-side authorization.",
      commands: [
        "aws sts get-caller-identity --output json",
        "aws s3api get-bucket-policy --bucket YOUR_BUCKET --region ap-south-1 --output text",
        "aws iam get-role --role-name YOUR_ROLE --query 'Role.AssumeRolePolicyDocument' --output json",
      ],
      interpretOutput: [
        "Record the caller account and bucket-owner account separately.",
        "For common cross-account access patterns, the caller's identity policy must allow the action and the resource owner's bucket or access-point policy must authorize the caller.",
        "A role trust policy controls who can assume the role; it does not itself grant S3 data access.",
        "For SSE-KMS, the key policy and any required cross-account KMS authorization must also be correct.",
        "If the bucket belongs to a different account, do not assume a same-account identity-policy setup is sufficient.",
        "Some service-managed access patterns have additional requirements; verify the exact architecture.",
      ],
      nextAction:
        "Coordinate with the bucket and KMS key owners to correct the narrowly scoped caller and resource policies.",
    },
    {
      step: 9,
      title: "Check AWS Organizations SCPs and permissions boundaries",
      purpose:
        "Find organization-level or role-level controls that restrict an otherwise allowed action.",
      commands: [
        "aws iam get-role --role-name YOUR_ROLE --query 'Role.PermissionsBoundary' --output json",
        "aws organizations list-policies-for-target --target-id ACCOUNT_ID --filter SERVICE_CONTROL_POLICY --output json",
        "aws organizations describe-policy --policy-id p-EXAMPLE --output json",
      ],
      interpretOutput: [
        "Organizations APIs require the appropriate management or delegated permissions and may not be available to an ordinary workload role.",
        "An SCP defines the maximum permissions available to affected principals; it does not itself grant S3 access.",
        "A permissions boundary limits the permissions a role or user can exercise.",
        "A session policy can further restrict the assumed-role session.",
        "Inspect inherited organizational policies and explicit Deny statements before concluding that an identity policy is missing.",
        "Do not ask for an SCP removal simply because an operation is blocked. Confirm whether the restriction is intentional and security-approved.",
      ],
      nextAction:
        "Escalate to the account or organization policy owner with the failing action, resource, caller ARN, timestamp, and evidence of the matching restriction.",
    },
    {
      step: 10,
      title: "Inspect VPC endpoint policy and network path",
      purpose:
        "Determine whether a private-network S3 request is restricted by endpoint configuration.",
      commands: [
        "aws ec2 describe-vpc-endpoints --filters Name=service-name,Values=com.amazonaws.ap-south-1.s3 --region ap-south-1 --output json",
        "aws ec2 describe-vpc-endpoints --vpc-endpoint-ids vpce-EXAMPLE --region ap-south-1 --query 'VpcEndpoints[0].{State:State,Policy:PolicyDocument,RouteTables:RouteTableIds,Subnets:SubnetIds}' --output json",
      ],
      interpretOutput: [
        "Replace the Region, VPC endpoint ID, and service name with the environment's actual values.",
        "Verify that the workload uses the intended endpoint and that the endpoint is available.",
        "A restrictive endpoint policy can block an action even when IAM and bucket policies appear to allow it.",
        "A bucket policy requiring aws:SourceVpce can deny requests that arrive through a different endpoint or through an unintended network path.",
        "Gateway and interface endpoints have different routing and DNS behavior. Confirm the actual endpoint type and architecture.",
        "A connectivity timeout differs from an authorization denial; collect both network evidence and the exact AWS error.",
      ],
      nextAction:
        "Correct the specific endpoint-policy or source-endpoint mismatch without removing required private-access controls.",
    },
    {
      step: 11,
      title: "Inspect CloudTrail for the failed request",
      purpose:
        "Correlate the denied API call with principal, resource, request time, and recent changes.",
      commands: [
        "aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=GetObject --start-time 2026-10-27T09:00:00Z --end-time 2026-10-27T10:00:00Z --region ap-south-1 --max-results 20 --output json",
        "aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=PutObject --start-time 2026-10-27T09:00:00Z --end-time 2026-10-27T10:00:00Z --region ap-south-1 --max-results 20 --output json",
      ],
      interpretOutput: [
        "Replace the example UTC timestamps and Region with the incident window.",
        "CloudTrail Event History primarily covers management events. S3 object-level data events must be configured for the relevant bucket and are not automatically available for every historical object request.",
        "The absence of an event in Event History does not prove that the request never occurred.",
        "Inspect event source, event name, principal, resources, error code, request parameters, and any policy-change events.",
        "CloudTrail records can help identify a role change, bucket-policy update, KMS modification, or denied request around the incident.",
        "Protect audit records and avoid copying sensitive request data into public tickets.",
      ],
      nextAction:
        "Correlate the denied request with policy changes and workload logs. Enable appropriate data-event logging for future investigations through the approved logging process.",
    },
    {
      step: 12,
      title: "Investigate GitHub Actions OIDC or CI/CD credentials",
      purpose:
        "Verify whether the deployment pipeline assumes the expected AWS role.",
      commands: [
        "aws sts get-caller-identity --output json",
        "aws iam get-role --role-name YOUR_CI_ROLE --query 'Role.{Arn:Arn,Trust:AssumeRolePolicyDocument}' --output json",
      ],
      interpretOutput: [
        "Run get-caller-identity inside the same pipeline job and execution context as the failed S3 command.",
        "For OIDC, inspect the role trust policy's federated provider and conditions such as audience and repository/branch subject.",
        "A successful AssumeRoleWithWebIdentity does not automatically mean the assumed role has S3 permissions.",
        "Verify that the workflow uses the intended role ARN, account, Region, bucket, and prefix.",
        "Do not print access keys or session tokens in pipeline logs.",
        "A recent workflow change can switch the caller role without changing the S3 bucket policy.",
      ],
      nextAction:
        "Correct the role trust configuration or S3 permissions that evidence identifies, and rerun a least-privilege read/write test in the appropriate environment.",
    },
    {
      step: 13,
      title: "Investigate ECS, EC2, and EKS workload identities",
      purpose:
        "Find identity-provider or credential-chain differences between local and deployed workloads.",
      commands: [
        "aws sts get-caller-identity --output json",
        "aws ecs describe-task-definition --task-definition YOUR_TASK_DEFINITION --region ap-south-1 --output json",
        "aws iam get-role --role-name YOUR_TASK_ROLE --output json",
        "kubectl get serviceaccount -n production",
        "kubectl describe serviceaccount YOUR_SERVICE_ACCOUNT -n production",
      ],
      interpretOutput: [
        "Run AWS CLI commands in the actual workload context whenever possible. Local shell identity is not proof of the application's runtime identity.",
        "For ECS, distinguish task role permissions from task execution role permissions. Application S3 calls normally use the task role.",
        "For EC2, verify the intended instance profile and whether the application is overriding role credentials with static environment credentials.",
        "For EKS, inspect the configured workload identity mechanism, service account, role association, and trust conditions.",
        "Do not expose token contents or credential endpoint responses during investigation.",
      ],
      nextAction:
        "Make the workload use the intended role and grant only the S3 and KMS permissions its documented function requires.",
    },
    {
      step: 14,
      title: "Inspect object ownership, ACLs, and versioning",
      purpose:
        "Investigate object-specific failures, especially when another account uploads the object.",
      commands: [
        "aws s3api get-bucket-ownership-controls --bucket YOUR_BUCKET --region ap-south-1 --output json",
        "aws s3api get-bucket-versioning --bucket YOUR_BUCKET --region ap-south-1 --output json",
        "aws s3api head-object --bucket YOUR_BUCKET --key approved-prefix/example.zip --region ap-south-1 --output json",
      ],
      interpretOutput: [
        "With Bucket owner enforced Object Ownership, ACLs are disabled and access is controlled through policies rather than legacy object ACL grants.",
        "If ACLs are enabled in a legacy setup, object ownership and ACLs may affect cross-account access.",
        "A particular object version may behave differently from the current version. Version-specific reads require the appropriate version permission.",
        "Do not enable ACLs or change ownership settings merely because one object is inaccessible.",
      ],
      nextAction:
        "Correct the policy, ownership, or version-specific authorization issue that is proven to affect the object.",
    },
    {
      step: 15,
      title: "Investigate prefix conditions and object-key encoding",
      purpose:
        "Determine whether a policy condition or key mismatch blocks access to specific objects.",
      commands: [
        "aws s3api list-objects-v2 --bucket YOUR_BUCKET --prefix approved-prefix/ --max-keys 10 --region ap-south-1 --output json",
        "aws s3api head-object --bucket YOUR_BUCKET --key 'approved-prefix/example file.zip' --region ap-south-1 --output json",
      ],
      interpretOutput: [
        "S3 object keys are case-sensitive and are not filesystem paths. Spaces, Unicode characters, slashes, and URL encoding must be handled correctly by the client.",
        "Bucket-policy conditions using s3:prefix can restrict listing independently from object reads.",
        "A list command that fails does not prove that direct GetObject is denied, and a successful list does not prove every object can be read.",
        "Compare the exact requested key with the actual stored key without exposing sensitive filenames unnecessarily.",
      ],
      nextAction:
        "Correct the key or narrowly scope the prefix condition to the intended application path.",
    },
    {
      step: 16,
      title: "Check presigned URL behavior",
      purpose:
        "Determine whether a presigned URL is expired, malformed, or signed by a principal without sufficient permissions.",
      commands: [
        "aws sts get-caller-identity --output json",
        "curl -sS -D - -o /dev/null 'PRESIGNED_URL'",
      ],
      interpretOutput: [
        "Treat a presigned URL as a bearer credential. Do not paste it into chat, source control, shell history, or public logs.",
        "Run the request only in an approved secure context and redact the full URL from recorded evidence.",
        "Verify expiry, object key, signing Region, HTTP method, required headers, and whether the signing credentials remain valid.",
        "A presigned URL cannot grant more access than the signing principal is permitted to exercise.",
        "Bucket policies may restrict signature age, network source, encryption context, or other request conditions.",
      ],
      nextAction:
        "Generate a new URL using the correct approved role only after confirming that the principal is authorized for the intended object and method.",
    },
    {
      step: 17,
      title: "Investigate upload and multipart failures",
      purpose:
        "Identify which part of the upload workflow lacks permission or violates a policy condition.",
      commands: [
        "aws s3api head-bucket --bucket YOUR_BUCKET --region ap-south-1",
        "aws s3api list-multipart-uploads --bucket YOUR_BUCKET --prefix approved-prefix/ --region ap-south-1 --output json",
        "aws s3api get-bucket-encryption --bucket YOUR_BUCKET --region ap-south-1 --output json",
      ],
      interpretOutput: [
        "Upload workflows may involve multipart initiation, part uploads, completion, abort, and KMS operations. Required permissions vary by operation.",
        "Some multipart inspection commands require permissions that the application does not need for ordinary uploads.",
        "SSE-KMS encryption may require additional KMS authorization.",
        "Bucket policies may require TLS, specific encryption headers, or an approved encryption key.",
        "A failed multipart workflow may leave incomplete uploads that require lifecycle cleanup or an approved cleanup process.",
      ],
      nextAction:
        "Identify the exact failing API call in SDK or pipeline logs. Correct only the permissions and encryption requirements needed by that workflow.",
    },
    {
      step: 18,
      title: "Validate recovery and prevent regression",
      purpose:
        "Prove that the intended workflow works without broadening access unnecessarily.",
      commands: [
        "aws sts get-caller-identity --output json",
        "aws s3api head-object --bucket YOUR_BUCKET --key approved-prefix/example.zip --region ap-south-1 --output json",
        "aws s3api get-object --bucket YOUR_BUCKET --key approved-prefix/example.zip NUL --region ap-south-1",
        "git diff --check",
      ],
      interpretOutput: [
        "Use the correct target shell and a safe output destination. NUL is a Windows null device convention; use an approved temporary file or /dev/null on Linux where appropriate.",
        "Validate with the same workload identity that originally failed, not an administrator's credentials.",
        "Check the actual required operations: listing, reading, uploading, multipart completion, or decryption.",
        "Verify that unauthorized prefixes, objects, and principals remain denied.",
        "Confirm that the deployment or application has recovered and that logs show no new authorization errors.",
        "Review the exact policy diff and remove any temporary permissions that are no longer needed.",
      ],
      nextAction:
        "Record the confirmed root cause, policy change, test results, security validation, and follow-up actions in the incident report.",
    },
  ],

  errorMatrix: [
    {
      symptom: "AccessDenied on GetObject",
      likelyCauses: [
        "Missing s3:GetObject permission.",
        "Bucket policy explicit Deny or restrictive condition.",
        "KMS decryption permission missing.",
        "SCP, permissions boundary, or session policy restriction.",
        "Cross-account resource authorization failure.",
      ],
      verification: [
        "Confirm caller ARN and exact object key.",
        "Inspect identity and bucket policies, including explicit Deny statements.",
        "Inspect SSE-KMS key configuration and authorization.",
        "Correlate the request with CloudTrail data events where enabled.",
      ],
      resolution: [
        "Grant only the required object-read permission on the intended object prefix.",
        "Correct the proven policy condition or KMS authorization issue.",
        "Retest with the original workload role and confirm unrelated objects remain protected.",
      ],
    },
    {
      symptom: "AccessDenied on ListBucket or aws s3 ls",
      likelyCauses: [
        "Missing s3:ListBucket on the bucket ARN.",
        "s3:prefix condition does not match the requested prefix.",
        "Bucket policy denies listing from the caller or source network.",
        "Wrong account, bucket, or credential profile.",
      ],
      verification: [
        "Run get-caller-identity in the failing context.",
        "Inspect the exact list prefix and identity/bucket policy resource ARNs.",
        "Compare the requested prefix with any s3:prefix conditions.",
      ],
      resolution: [
        "Grant scoped ListBucket access to the intended prefix if listing is required.",
        "Avoid granting unrestricted bucket listing if the workload only needs direct object reads.",
      ],
    },
    {
      symptom: "S3 access fails only for SSE-KMS objects",
      likelyCauses: [
        "Missing kms:Decrypt for reads.",
        "Missing kms:GenerateDataKey for writes.",
        "KMS key policy or grant does not authorize the principal.",
        "KMS key is disabled, inaccessible, or in an unexpected account or Region.",
      ],
      verification: [
        "Inspect object encryption metadata and key ARN.",
        "Review the KMS key policy, grants, key state, and caller identity.",
        "Correlate S3 and KMS errors in available audit logs.",
      ],
      resolution: [
        "Correct the specific KMS authorization or key-state issue.",
        "Keep the intended encryption key and security controls in place.",
      ],
    },
    {
      symptom: "AccessDenied after moving to another AWS account",
      likelyCauses: [
        "Caller identity policy does not allow the action.",
        "Bucket policy does not authorize the external account or role.",
        "KMS key policy does not permit cross-account use.",
        "An SCP or boundary blocks the request.",
      ],
      verification: [
        "Record caller and resource-owner account IDs.",
        "Inspect both identity and resource policies.",
        "Check the KMS key's owner and authorization model.",
      ],
      resolution: [
        "Coordinate a least-privilege policy change with the resource owner.",
        "Verify access using the intended cross-account role.",
      ],
    },
    {
      symptom: "AccessDenied only from a private subnet",
      likelyCauses: [
        "VPC endpoint policy denies the operation.",
        "Bucket policy requires a different aws:SourceVpce.",
        "The workload uses a different route, endpoint, or credential identity.",
        "The request is going to an unexpected S3 endpoint.",
      ],
      verification: [
        "Inspect VPC endpoints, endpoint policies, DNS, and routes.",
        "Compare caller identity and request context with a known-good environment.",
        "Review bucket policy source-endpoint conditions.",
      ],
      resolution: [
        "Correct the specific endpoint or bucket-policy mismatch.",
        "Preserve private-access restrictions and validate from the workload network.",
      ],
    },
    {
      symptom: "CI/CD pipeline gets AccessDenied but local CLI succeeds",
      likelyCauses: [
        "Pipeline uses a different role.",
        "OIDC trust or role assumption changed.",
        "Local profile has broader permissions than the workload role.",
        "Pipeline Region, bucket, prefix, or encryption settings differ.",
      ],
      verification: [
        "Compare get-caller-identity from local and pipeline contexts.",
        "Inspect the pipeline's role ARN and exact failing operation.",
        "Review OIDC trust conditions and recent deployment configuration changes.",
      ],
      resolution: [
        "Use the intended pipeline role and grant only the required S3/KMS permissions.",
        "Never copy long-lived developer credentials into CI/CD as a workaround.",
      ],
    },
    {
      symptom: "Upload fails while download succeeds",
      likelyCauses: [
        "Missing s3:PutObject.",
        "Bucket policy requires encryption headers or a particular KMS key.",
        "KMS write permissions are missing.",
        "The workflow requires multipart-specific permissions.",
      ],
      verification: [
        "Inspect the failing PutObject or multipart API call.",
        "Check bucket encryption configuration and policy conditions.",
        "Review the caller's effective write and KMS permissions.",
      ],
      resolution: [
        "Grant only the required write permissions for the approved prefix.",
        "Meet the bucket's encryption requirements and validate a harmless test upload.",
      ],
    },
    {
      symptom: "AccessDenied started after a policy deployment",
      likelyCauses: [
        "New explicit Deny statement.",
        "Changed Principal, Resource, or Condition.",
        "Policy resource ARN no longer matches the object prefix.",
        "SCP, endpoint, or permissions-boundary update.",
      ],
      verification: [
        "Compare the current policy with the last known-good version.",
        "Inspect CloudTrail for policy changes and the denied request.",
        "Identify the exact statement that matches the caller and resource.",
      ],
      resolution: [
        "Revert or correct only the policy change responsible for the denial.",
        "Retest both allowed and intentionally denied access paths.",
      ],
    },
  ],

  recoveryProcedures: [
    {
      scenario: "Production pipeline cannot download a deployment artifact",
      procedure: [
        "Confirm the exact pipeline role with get-caller-identity.",
        "Identify the exact GetObject operation, object key, and bucket Region.",
        "Inspect the role policy, bucket policy, KMS key, and any endpoint restrictions relevant to that request.",
        "Compare the current policy and role configuration with the last known-good version.",
        "Apply the approved least-privilege correction or roll back the faulty policy change.",
        "Rerun a single controlled artifact download before restarting the full deployment.",
      ],
      validation: [
        "The same pipeline role downloads the expected artifact.",
        "The downloaded artifact's version or checksum matches the approved release artifact.",
        "The pipeline proceeds through the intended stages without authorization errors.",
        "Unrelated buckets, prefixes, and principals remain denied.",
      ],
      rollback: [
        "Revert the specific IAM, bucket-policy, or endpoint-policy change if it introduced the outage.",
        "Remove temporary diagnostic permissions.",
        "Do not replace the production pipeline role with an administrator role to restore deployment speed.",
      ],
    },
    {
      scenario: "Application cannot read SSE-KMS encrypted objects",
      procedure: [
        "Confirm the caller identity and exact object key.",
        "Inspect the object's encryption mode and KMS key ARN.",
        "Check the key state, key policy, grants, and caller permissions.",
        "Confirm whether the workload is in the same account as the key.",
        "Make the smallest approved KMS authorization correction.",
      ],
      validation: [
        "The intended workload can read the encrypted object.",
        "The expected key remains enabled and encryption stays in place.",
        "Other principals remain unable to decrypt data unless explicitly authorized.",
      ],
      rollback: [
        "Revert the precise KMS policy or grant change if it causes unexpected access.",
        "Do not disable encryption or re-encrypt production data as an initial troubleshooting step.",
      ],
    },
    {
      scenario: "AccessDenied appears after enabling an S3 VPC endpoint",
      procedure: [
        "Confirm whether the workload is actually using the new endpoint.",
        "Inspect the endpoint policy and bucket-policy source conditions.",
        "Compare the failing workload's request path with the known-good path.",
        "Determine whether the restriction is intentional security policy or an unintended configuration mismatch.",
        "Apply an approved narrowly scoped endpoint or bucket-policy correction.",
      ],
      validation: [
        "The intended workload succeeds from the expected private network path.",
        "Requests from unapproved paths remain restricted as required.",
        "No broad public-access exception was introduced.",
      ],
      rollback: [
        "Restore the last known-good endpoint or bucket-policy configuration when the new change is proven responsible.",
        "Avoid deleting the endpoint or removing source restrictions without security review.",
      ],
    },
  ],

  advancedScenarios: [
    {
      title: "Explicit Deny overrides an Allow",
      symptoms: [
        "IAM simulation or identity policy appears to allow the operation.",
        "The real S3 request still returns AccessDenied.",
      ],
      investigation: [
        "Inspect bucket, access-point, endpoint, and organization policies.",
        "Search for Deny statements and conditions matching the caller, resource, source endpoint, organization, encryption headers, or transport security.",
        "Check permissions boundaries and session policies.",
        "Compare the request context with a known-good request.",
      ],
      resolution: [
        "Correct the exact conflicting condition if the deny is unintended and the change is approved.",
        "Preserve intentional guardrails and document why the request should be allowed.",
      ],
    },
    {
      title: "S3 read fails after moving from IAM user credentials to an IAM role",
      symptoms: [
        "Local developer access works but application access fails.",
        "The role ARN differs from the principal previously authorized by the bucket policy.",
      ],
      investigation: [
        "Capture the role session identity from the running application.",
        "Inspect the role's identity policy and the bucket policy Principal and conditions.",
        "Check the trust policy separately from S3 data permissions.",
      ],
      resolution: [
        "Authorize the intended role through the approved policy design.",
        "Remove obsolete long-lived credentials according to the credential-rotation process.",
      ],
    },
    {
      title: "Only one prefix is inaccessible",
      symptoms: [
        "Objects in one prefix can be read but objects in another prefix return AccessDenied.",
        "The application recently changed its object-key naming convention.",
      ],
      investigation: [
        "Compare the exact requested key with the intended object key.",
        "Inspect resource ARN patterns and s3:prefix conditions.",
        "Check key casing, encoded characters, trailing slashes, and tenant-specific prefix construction.",
      ],
      resolution: [
        "Correct the application key construction or narrow policy mismatch.",
        "Avoid granting access to the entire bucket when only one prefix is needed.",
      ],
    },
    {
      title: "Presigned URL returns AccessDenied",
      symptoms: [
        "A URL generated by the backend fails for the user.",
        "The backend's own S3 access appears to work.",
      ],
      investigation: [
        "Verify the signing principal, HTTP method, object key, Region, expiry, and required headers.",
        "Check whether the signing credentials expired or were revoked.",
        "Inspect bucket policy conditions and network restrictions.",
        "Test the request securely without recording the full URL in logs.",
      ],
      resolution: [
        "Generate a fresh URL from the correct authorized principal.",
        "Ensure the requested method and headers match the signature.",
        "Keep the URL short-lived and avoid exposing it in application logs.",
      ],
    },
    {
      title: "Object uploaded by another account cannot be read",
      symptoms: [
        "New objects fail while older objects remain accessible.",
        "The failure began when a partner or separate account started uploading files.",
      ],
      investigation: [
        "Inspect bucket Object Ownership configuration.",
        "Check the uploader's role, bucket policy, and any legacy ACL behavior.",
        "Inspect KMS key ownership and encryption settings.",
      ],
      resolution: [
        "Use the intended bucket ownership model and approved cross-account access design.",
        "Correct the uploader or resource policy rather than broadly enabling ACLs.",
      ],
    },
    {
      title: "S3 access denied after organization policy change",
      symptoms: [
        "Several roles or accounts suddenly fail for the same action.",
        "Identity policies appear unchanged.",
      ],
      investigation: [
        "Compare the incident start time with SCP and organization policy changes.",
        "Inspect inherited policies and applicable explicit Deny statements.",
        "Determine whether the restriction is account-wide or limited to specific organizational units.",
      ],
      resolution: [
        "Escalate to the organization policy owner with evidence and business justification.",
        "Apply a narrowly scoped, approved policy correction only if the restriction is unintended.",
      ],
    },
    {
      title: "KMS permission is present but decryption still fails",
      symptoms: [
        "The role policy includes kms:Decrypt but SSE-KMS reads still fail.",
        "Only objects encrypted with one key are affected.",
      ],
      investigation: [
        "Verify the exact key ARN used by the object.",
        "Inspect key policy, grants, key state, account ownership, and Region.",
        "Check whether the object was encrypted using a different customer-managed key.",
      ],
      resolution: [
        "Correct the actual key authorization or key-state problem.",
        "Do not grant access to every KMS key in the account as a workaround.",
      ],
    },
    {
      title: "A security policy requires TLS or a specific encryption header",
      symptoms: [
        "A new client or SDK fails while another client succeeds.",
        "Uploads are denied even though the role has PutObject permission.",
      ],
      investigation: [
        "Inspect bucket-policy conditions involving aws:SecureTransport and encryption-related request headers.",
        "Compare the exact API request and SDK configuration.",
        "Verify the bucket's default encryption and any required customer-managed KMS key.",
      ],
      resolution: [
        "Make the client meet the approved transport and encryption requirements.",
        "Change the security policy only when its requirements are incorrect and the owner approves.",
      ],
    },
  ],

  prevention: [
    "Use dedicated IAM roles for applications, pipelines, and operational tasks.",
    "Grant only the required S3 actions on the intended bucket and object prefixes.",
    "Separate ListBucket permissions from object-level read/write permissions.",
    "Use short-lived role credentials instead of long-lived access keys wherever possible.",
    "Review bucket policies for explicit Deny statements and conditions before deployment.",
    "Use policy-as-code checks and IAM Access Analyzer where appropriate.",
    "Test the actual workload role in non-production before promoting IAM or bucket-policy changes.",
    "Manage IAM, bucket policies, KMS policies, and VPC endpoints through reviewed infrastructure-as-code.",
    "Keep production buckets private and retain appropriate S3 Block Public Access controls.",
    "Use the intended Object Ownership configuration and avoid unnecessary ACL complexity.",
    "Document KMS key ownership, authorized principals, key rotation arrangements, and recovery responsibilities.",
    "Enable appropriate CloudTrail management-event logging and S3 object-level data events for critical buckets where justified.",
    "Alert on unusual denied requests, unexpected policy changes, and abnormal access patterns.",
    "Review SCPs, permissions boundaries, endpoint policies, and cross-account assumptions as part of change reviews.",
    "Use secure secret handling in CI/CD and redact presigned URLs and credential data from logs.",
    "Maintain an incident runbook with exact caller-identity, operation, resource, policy, and KMS investigation steps.",
  ],

  monitoringAndAlerting: [
    "Monitor application and pipeline AccessDenied errors by operation and resource.",
    "Alert when critical artifact downloads, backups, or runtime configuration reads fail repeatedly.",
    "Use CloudTrail to audit IAM, bucket-policy, KMS, endpoint, and relevant S3 data-access events.",
    "Enable S3 object-level data events for selected critical buckets when the security and cost model supports it.",
    "Monitor unexpected changes to bucket policies, public-access controls, ownership controls, and encryption settings.",
    "Monitor KMS key disablement, deletion scheduling, policy changes, and relevant authorization failures.",
    "Review organization policy changes that affect production accounts.",
    "Track the success rate of critical backup, restore, artifact publication, and deployment workflows.",
    "Avoid alerting on a single harmless denied request without context; use severity based on resource criticality and repeated impact.",
    "Test notification routing and ensure the on-call team can retrieve the necessary audit evidence.",
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Start time, detection time, and recovery time:",
    "Severity and customer/business impact:",
    "Affected AWS account, Region, bucket, prefix, and object:",
    "Exact failing API operation:",
    "Caller identity ARN and credential source:",
    "Error code, message, request ID, and timestamp:",
    "Relevant IAM and resource-policy findings:",
    "KMS encryption and key authorization findings:",
    "SCP, permissions boundary, session policy, and endpoint-policy findings:",
    "Relevant CloudTrail events and policy changes:",
    "Confirmed root cause and supporting evidence:",
    "Approved remediation and change reference:",
    "Validation using the original workload identity:",
    "Verification that unrelated access remains denied:",
    "Temporary permissions removed:",
    "Preventive actions, owners, and due dates:",
    "Runbook, alerting, and policy-test improvements:",
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Diagnose missing GetObject permission",
      objective:
        "Learn to identify the exact object-read permission failure.",
      steps: [
        "Use a dedicated non-production account and a private test bucket.",
        "Create a test role with a deliberately incomplete read policy.",
        "Attempt to read one harmless test object and record the error.",
        "Run get-caller-identity and identify the exact role.",
        "Compare the object ARN with the policy resource.",
        "Add only the required read permission through an approved test change.",
        "Retry with the same role and test an unrelated object that should remain inaccessible.",
      ],
      successCriteria: [
        "The learner identifies the missing action/resource pairing.",
        "The intended object becomes readable without granting broad bucket access.",
      ],
    },
    {
      title: "Lab 2 — Find an explicit Deny",
      objective:
        "Understand how resource-policy conditions can block an allowed identity.",
      steps: [
        "Create a sandbox bucket and role.",
        "Grant a test read permission through an identity policy.",
        "Add a controlled bucket-policy Deny condition in the sandbox.",
        "Observe the denied request and inspect the exact policy condition.",
        "Correct the test condition and retest.",
        "Restore the lab's intended final policy.",
      ],
      successCriteria: [
        "The learner explains why an identity-policy Allow did not override the explicit Deny.",
        "The learner corrects the intended condition without making the bucket public.",
      ],
    },
    {
      title: "Lab 3 — Diagnose SSE-KMS access failure",
      objective:
        "Separate S3 permissions from KMS decrypt permissions.",
      steps: [
        "Use a sandbox object encrypted with a customer-managed KMS key.",
        "Grant the test role S3 object-read permission but initially withhold the required KMS authorization.",
        "Attempt the read and capture the exact failure.",
        "Inspect the object encryption metadata and KMS key policy.",
        "Grant the intended test principal the required KMS authorization.",
        "Retry the read and verify the object's encryption remains enabled.",
      ],
      successCriteria: [
        "The learner identifies the S3 and KMS authorization requirements separately.",
        "The object can be read without weakening encryption.",
      ],
    },
    {
      title: "Lab 4 — Investigate cross-account access",
      objective:
        "Understand the interaction between caller-side and resource-side authorization.",
      steps: [
        "Use two sandbox AWS accounts and a private test bucket.",
        "Create an approved test role in the caller account.",
        "Configure a narrowly scoped bucket policy in the resource account.",
        "Attempt the intended read and inspect the caller identity.",
        "Correct one deliberately missing authorization element.",
        "Retest using the approved cross-account role.",
      ],
      successCriteria: [
        "The learner distinguishes role trust from S3 data permissions.",
        "The learner verifies that only the intended principal can access the test prefix.",
      ],
    },
    {
      title: "Lab 5 — Troubleshoot CI/CD identity mismatch",
      objective:
        "Identify why local credentials succeed while a pipeline role fails.",
      steps: [
        "Create a non-production CI workflow that assumes a dedicated test role.",
        "Print get-caller-identity without printing credentials.",
        "Use a test bucket and a deliberately restricted role.",
        "Compare local and pipeline caller identities.",
        "Inspect role trust conditions and the exact S3 operation.",
        "Apply a least-privilege correction and rerun the test.",
      ],
      successCriteria: [
        "The learner identifies the actual runtime principal.",
        "The pipeline succeeds using short-lived credentials and narrowly scoped permissions.",
      ],
    },
  ],

  interviewQuestions: [
    {
      question: "How do you troubleshoot S3 AccessDenied in production?",
      answer:
        "I first confirm the caller identity, account, Region, bucket, object key, exact operation, timestamp, and error. Then I inspect identity and resource policies, explicit denies, permissions boundaries, SCPs, session restrictions, endpoint policies, KMS authorization, and the workload credential source. I make the smallest approved correction and validate using the original workload role.",
    },
    {
      question: "What is the difference between s3:ListBucket and s3:GetObject?",
      answer:
        "s3:ListBucket applies to the bucket ARN and allows listing objects, subject to policy conditions. s3:GetObject applies to object ARNs and allows reading object contents. Listing permission does not automatically grant object-read permission.",
    },
    {
      question: "Why can S3 AccessDenied happen when IAM already allows the operation?",
      answer:
        "An explicit Deny, bucket or access-point policy condition, SCP, permissions boundary, session policy, VPC endpoint policy, or KMS authorization requirement can still block the request. The caller may also be using a different role than expected.",
    },
    {
      question: "How does an explicit Deny behave?",
      answer:
        "An applicable explicit Deny overrides an Allow. I inspect the statement's principal, action, resource, and condition and verify whether the intended request matches it before changing the policy.",
    },
    {
      question: "Why does S3 access work locally but fail in Jenkins or GitHub Actions?",
      answer:
        "The local user and pipeline may use different identities, permissions, Regions, buckets, or network paths. I compare get-caller-identity from both contexts, inspect the assumed role and OIDC trust, and validate the exact failing API operation.",
    },
    {
      question: "What additional permissions are needed for SSE-KMS objects?",
      answer:
        "For SSE-KMS reads, the caller generally needs the appropriate S3 object-read permission and kms:Decrypt authorization. Writes commonly require kms:GenerateDataKey, with additional requirements depending on the upload workflow. The key policy and account relationship must also authorize the request.",
    },
    {
      question: "How do you troubleshoot cross-account S3 access?",
      answer:
        "I verify the caller account and role, caller-side identity permissions, bucket or access-point policy, applicable organization controls, and KMS key authorization. I also distinguish role trust, which governs assuming a role, from permissions that govern accessing S3 resources.",
    },
    {
      question: "What is the role of an S3 VPC endpoint policy?",
      answer:
        "It restricts the S3 requests that can pass through the endpoint. A request can be blocked by the endpoint policy even when identity and bucket policies appear to allow it. Bucket policies can also require a particular source endpoint.",
    },
    {
      question: "Does a successful ListBucket operation prove that GetObject will succeed?",
      answer:
        "No. Listing and object reads use different actions and resource scopes. Object reads can also fail because of KMS authorization, object-specific conditions, version permissions, or resource-policy restrictions.",
    },
    {
      question: "How would you use CloudTrail for S3 AccessDenied?",
      answer:
        "I correlate the incident timestamp with the principal, API event, resource, error, and recent policy changes. S3 object-level data events must be enabled for the relevant bucket to capture those data events; their absence from ordinary Event History is not proof that no request occurred.",
    },
    {
      question: "Should you attach AdministratorAccess to fix an S3 issue?",
      answer:
        "No. I identify the exact missing permission or restrictive condition and apply a narrowly scoped, approved change. Broad administrator permissions can increase data exposure and hide the real cause.",
    },
    {
      question: "How do you troubleshoot a presigned URL failure?",
      answer:
        "I check the signing principal, URL expiry, object key, HTTP method, signing Region, required headers, credential validity, and bucket-policy conditions. A presigned URL cannot grant more access than the signing principal is allowed to exercise, and the URL must be treated as a secret.",
    },
    {
      question: "What is the difference between role trust and an IAM permission policy?",
      answer:
        "The trust policy controls who or what can assume the role. The role's permission policies control what the assumed identity can do after it obtains credentials. Successful role assumption does not automatically grant S3 access.",
    },
    {
      question: "How do you safely recover a production deployment blocked by S3 AccessDenied?",
      answer:
        "I identify the actual pipeline role and artifact operation, inspect the relevant policy and encryption path, correct the confirmed issue, and test a single artifact download using the same role. I then rerun the deployment under change controls, verify the artifact, remove temporary permissions, and document the root cause.",
    },
  ],

  references: [
    {
      title: "Troubleshoot Access Denied errors in Amazon S3",
      url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/troubleshoot-403-errors.html",
    },
    {
      title: "Amazon S3 policy examples",
      url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-policies-s3.html",
    },
    {
      title: "IAM policy evaluation logic",
      url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html",
    },
    {
      title: "IAM policy simulator",
      url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html",
    },
    {
      title: "Using SSE-KMS with Amazon S3",
      url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingKMSEncryption.html",
    },
    {
      title: "Amazon S3 CloudTrail logging",
      url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/cloudtrail-logging.html",
    },
    {
      title: "Amazon S3 VPC endpoints",
      url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/privatelink-interface-endpoints.html",
    },
    {
      title: "IAM Access Analyzer",
      url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html",
    },
    {
      title: "Amazon S3 Object Ownership",
      url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/about-object-ownership.html",
    },
  ],
};
