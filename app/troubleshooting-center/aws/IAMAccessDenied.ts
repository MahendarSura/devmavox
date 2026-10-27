export interface IAMAccessDeniedGuide {
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
  rootCauseMatrix: {
    symptom: string;
    likelyCause: string;
    verification: string;
    resolution: string;
  }[];
  recoveryProcedures: {
    scenario: string;
    procedure: string[];
    validation: string[];
    rollback: string;
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

export const iamAccessDeniedGuide: IAMAccessDeniedGuide = {
  title: "AWS IAM AccessDenied — Production Troubleshooting",
  category: "AWS Identity and Access Management",
  severity: "SEV-1 to SEV-3 depending on business impact",
  estimatedTime: "15–60 minutes for initial isolation; complex policy conflicts may take longer",

  overview: `
AWS IAM AccessDenied occurs when an AWS API request cannot be authorized.
The request may come from a human user, an assumed role, an EC2 instance,
an ECS task, an EKS workload, a Lambda function, a CI/CD pipeline, Terraform,
CloudFormation, or another AWS service.

Do not assume every denial is caused by a missing Allow statement. Investigate
the actual caller, requested action, resource, active account and Region,
identity policies, resource policies, permissions boundaries, session policies,
service control policies (SCPs), resource control policies (RCPs) where applicable,
VPC endpoint policies, and service-specific authorization requirements.

An IAM policy simulator can help explain many authorization decisions, but it
does not reproduce every real request context. Validate the final fix with a
controlled request using the affected principal and environment.
`,

  incidentScenario: `
A production deployment suddenly fails with AccessDenied. The pipeline worked
yesterday, but today's Terraform apply cannot create an IAM role and the
deployment cannot update an S3 artifact. An engineer sees that the attached
policy contains an Allow statement and assumes AWS IAM is broken.

Possible changes include a new permissions boundary, an AWS Organizations SCP,
a changed trust relationship, a different CI/CD role, a resource policy update,
a session policy, a Region change, or an expired or incorrectly selected identity.

The engineer must identify which exact API request failed, which principal
made it, which resource was targeted, and which authorization control prevented
the request before changing any permissions.
`,

  impactAssessment: [
    "Identify the affected AWS account, account alias, Region, application, environment, and deployment pipeline.",
    "Determine whether only one API action failed or multiple services are affected.",
    "Confirm whether production traffic is impacted, a deployment is blocked, or a scheduled job is failing.",
    "Check whether any earlier deployment steps already changed infrastructure or application state.",
    "Determine whether the failure affects one role, one workload, one account, or multiple accounts.",
    "Identify the last successful run and compare its principal, commit, parameters, and deployment environment with the failed run.",
    "Assign severity based on customer impact, security exposure, outage duration, and available workarounds.",
    "Stop automatic retries if they could cause duplicate resources, repeated destructive operations, throttling, or partial deployment.",
  ],

  safetyChecks: [
    "Confirm the active AWS account and assumed role before executing diagnostic or recovery commands.",
    "Use the approved production change process and obtain required approval before changing production policies.",
    "Do not attach AdministratorAccess or PowerUserAccess as a shortcut.",
    "Do not remove an explicit Deny, permissions boundary, SCP, or resource policy restriction without understanding why it exists.",
    "Never paste access keys, secret keys, session tokens, authorization headers, or unredacted credentials into logs or incident tickets.",
    "Do not disable CloudTrail, organization guardrails, MFA requirements, or security monitoring to make a request succeed.",
    "Prefer read-only diagnostics first. Some IAM operations and service APIs themselves may be denied to the investigating principal.",
    "Do not assume a successful IAM policy simulation proves that the live request will succeed.",
    "Before retrying Terraform or CloudFormation, inspect state and the deployment plan to understand whether earlier resources were created.",
    "Use a separate approved break-glass process if access is lost during a production emergency.",
  ],

  evidenceCollection: [
    "Exact error message, including AccessDenied, AccessDeniedException, UnauthorizedOperation, or explicit-deny details.",
    "Timestamp with timezone, AWS account ID, Region, service name, API action, and resource ARN.",
    "Caller identity from aws sts get-caller-identity, collected in the same execution environment as the failure.",
    "Pipeline run ID, commit SHA, deployment parameters, selected role ARN, and environment variables that influence AWS configuration.",
    "Relevant CloudTrail event, including eventName, eventSource, userIdentity, requestParameters, resources, errorCode, and errorMessage.",
    "Identity policies, permissions boundary, role trust policy, session policy, resource policy, and relevant organization guardrails.",
    "Recent changes to IAM, AWS Organizations, resource policies, VPC endpoints, KMS keys, and CI/CD role configuration.",
    "Whether the request used an AWS CLI profile, environment credentials, EC2 instance profile, ECS task role, EKS workload identity, or OIDC federation.",
    "Terraform plan, CloudFormation events, deployment logs, and any successful requests immediately before the denied request.",
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Capture the exact failure before changing anything",
      purpose:
        "Preserve the original authorization failure and establish a timeline.",
      commands: [
        "aws sts get-caller-identity --output json",
        "aws configure list",
        "aws --version",
        "aws sts get-caller-identity --profile production --output json",
      ],
      interpretOutput: [
        "Account shows the account in which the caller is operating. Compare it with the intended account.",
        "Arn identifies the active principal. An assumed-role ARN commonly looks like arn:aws:sts::123456789012:assumed-role/DeploymentRole/session-name.",
        "The account ID and role can differ from the values expected by the pipeline configuration.",
        "aws configure list helps identify the credential source and configured Region. Do not publish sensitive credential material.",
        "If the profile-specific command fails but the default command succeeds, investigate profile selection and credential configuration.",
        "If get-caller-identity itself fails because credentials are invalid or unavailable, investigate authentication before authorization.",
      ],
      nextAction:
        "Record the identity, account, Region, timestamp, and original API error. Continue using the same execution environment that produced the failure.",
    },
    {
      step: 2,
      title: "Identify the exact denied action and resource",
      purpose:
        "Translate a broad error into the specific authorization decision that failed.",
      commands: [
        "aws sts get-caller-identity --query '{Account:Account,Arn:Arn,UserId:UserId}' --output json",
        "aws iam get-role --role-name DeploymentRole",
        "aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=PutObject --max-results 10 --output json",
      ],
      interpretOutput: [
        "Replace DeploymentRole with the actual role name. The get-role command is only applicable when investigating an IAM role and requires permission to inspect it.",
        "Replace PutObject with the actual failed API event name. CloudTrail LookupEvents searches management events and does not provide a universal search for all data events.",
        "For S3 object operations, verify whether the relevant data events were enabled and delivered. S3 object-level operations may not appear in ordinary management-event lookups.",
        "Capture the service's exact action name, resource ARN, Region, and error code. A console message may summarize several failed API calls.",
        "Some services report an authorization error without naming the specific missing permission. CloudTrail and service-specific logs may provide more detail.",
      ],
      nextAction:
        "Build an incident record containing principal ARN, API action, resource ARN, Region, and timestamp. Investigate each distinct denied action separately.",
    },
    {
      step: 3,
      title: "Find the corresponding CloudTrail event",
      purpose:
        "Determine who called the API, when it happened, and which authorization context was recorded.",
      commands: [
        "aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=CreateRole --max-results 20 --output json",
        "aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventSource,AttributeValue=iam.amazonaws.com --max-results 20 --output json",
      ],
      interpretOutput: [
        "The first command searches for CreateRole management events. Change the event name to the failed operation.",
        "The second command searches IAM management events, not every service event that might have been denied.",
        "Inspect CloudTrailEvent for userIdentity, eventSource, eventName, awsRegion, requestParameters, resources, errorCode, and errorMessage where present.",
        "CloudTrail event history normally provides recent management events for the selected account and Region. Availability, retention, and event type depend on the configuration.",
        "Cross-account events may need to be examined in the account that recorded the event. Organization trails or CloudTrail Lake may be needed for broader investigations.",
        "If the event is absent, verify the correct account, Region, event type, trail configuration, delivery delay, and whether the operation is recorded as a data event.",
      ],
      nextAction:
        "Correlate the event with the pipeline timestamp and request. Do not infer that an event is absent simply because one lookup returned no results.",
    },
    {
      step: 4,
      title: "Verify identity-based policies",
      purpose:
        "Check whether the principal's identity policies allow the required action on the intended resource.",
      commands: [
        "aws iam list-attached-role-policies --role-name DeploymentRole",
        "aws iam list-role-policies --role-name DeploymentRole",
        "aws iam get-role-policy --role-name DeploymentRole --policy-name InlinePolicyName",
        "aws iam get-policy --policy-arn arn:aws:iam::123456789012:policy/DeploymentPolicy",
        "aws iam get-policy-version --policy-arn arn:aws:iam::123456789012:policy/DeploymentPolicy --version-id v3",
      ],
      interpretOutput: [
        "Replace all sample role, policy, account, and version names with the actual values.",
        "list-attached-role-policies shows managed policies attached directly to the role; list-role-policies shows inline policies.",
        "get-policy identifies the default version of a managed policy. Confirm that you inspect the version marked as default rather than assuming v3 is current.",
        "An Allow for one action does not imply permission for a different API action required by the same workflow.",
        "Resource ARNs, account IDs, Regions, object paths, and condition keys must match the actual request context.",
        "The role's identity policy is only one part of the authorization decision. An Allow may still be blocked by other controls.",
      ],
      nextAction:
        "Compare the exact action and resource against the effective policy documents. Identify the smallest missing permission without adding broad wildcard access.",
    },
    {
      step: 5,
      title: "Inspect explicit Deny statements and conditions",
      purpose:
        "Identify explicit denies and policy conditions that reject the request.",
      commands: [
        "aws iam get-role --role-name DeploymentRole --query 'Role.{Arn:Arn,Boundary:PermissionsBoundary,Trust:AssumeRolePolicyDocument}' --output json",
        "aws iam list-attached-role-policies --role-name DeploymentRole --output json",
        "aws iam get-account-authorization-details --filter Role --output json",
      ],
      interpretOutput: [
        "Search the relevant policy documents for Effect: Deny, including conditions that restrict source IP, requested Region, principal ARN, organization ID, VPC endpoint, tags, MFA, or transport security.",
        "get-account-authorization-details can expose broad IAM account authorization details and may require elevated read permissions. Use it only when approved.",
        "A Deny that matches the request overrides an Allow from another applicable policy.",
        "A condition may evaluate differently in CI/CD than in a developer workstation because the principal, session tags, source IP, endpoint, or request context differs.",
        "The absence of a Deny in the role's attached policies does not rule out a Deny in an SCP, boundary, session policy, resource policy, or endpoint policy.",
      ],
      nextAction:
        "Determine whether the Deny actually matches the failed request. If it does, identify the security or business requirement behind it before requesting a policy change.",
    },
    {
      step: 6,
      title: "Check permissions boundaries and session policies",
      purpose:
        "Investigate restrictions on the maximum permissions available to the principal.",
      commands: [
        "aws iam get-role --role-name DeploymentRole --query 'Role.PermissionsBoundary' --output json",
        "aws iam list-attached-role-policies --role-name DeploymentRole --output json",
        "aws sts assume-role --role-arn arn:aws:iam::123456789012:role/DeploymentRole --role-session-name AccessCheck",
      ],
      interpretOutput: [
        "The role response may contain PermissionsBoundary with the policy ARN.",
        "A permissions boundary limits the permissions that identity-based policies can grant. Adding an Allow to the role may not be sufficient.",
        "A session policy supplied during AssumeRole can further restrict the resulting session.",
        "The example AssumeRole command creates a new session if successful. Do not run it casually in production; it is included to illustrate the API and may change audit records or consume session capacity.",
        "You generally cannot reconstruct every effective session restriction from the role definition alone. Inspect the code or configuration that creates the actual session.",
      ],
      nextAction:
        "Compare the role's policies, boundary, and the actual session configuration. Request the smallest approved change to the restrictive control, if a change is justified.",
    },
    {
      step: 7,
      title: "Inspect AWS Organizations SCP and RCP controls",
      purpose:
        "Determine whether organization-level policies restrict the account or resource.",
      commands: [
        "aws organizations describe-organization",
        "aws organizations list-parents --child-id 123456789012",
        "aws organizations list-policies-for-target --target-id 123456789012 --filter SERVICE_CONTROL_POLICY",
        "aws organizations list-policies-for-target --target-id 123456789012 --filter RESOURCE_CONTROL_POLICY",
      ],
      interpretOutput: [
        "Replace the account ID with the affected account ID.",
        "These Organizations operations require appropriate Organizations permissions and are commonly unavailable to ordinary workload roles.",
        "Follow the hierarchy from account to parent organizational unit and root, and inspect applicable policies at each level.",
        "SCPs set permission guardrails for member accounts; they do not grant permissions by themselves.",
        "Where supported and configured, RCPs can restrict access to resources. Check service support and policy applicability rather than assuming every resource is governed identically.",
        "The absence of a policy directly attached to the account does not mean that no inherited organization policy applies.",
      ],
      nextAction:
        "Ask the authorized Organizations administrator to evaluate inherited guardrails. Do not detach organization policies as a quick workaround.",
    },
    {
      step: 8,
      title: "Check resource-based policies",
      purpose:
        "Determine whether the target resource policy permits or denies the caller.",
      commands: [
        "aws s3api get-bucket-policy --bucket company-deployment-artifacts",
        "aws kms get-key-policy --key-id arn:aws:kms:ap-south-1:123456789012:key/EXAMPLE-KEY-ID --policy-name default",
        "aws lambda get-policy --function-name production-function",
        "aws secretsmanager get-resource-policy --secret-id production/application-secret",
      ],
      interpretOutput: [
        "Run only the command appropriate to the affected resource and replace placeholders.",
        "Not all AWS services support the same resource-policy model or command syntax.",
        "A resource policy may allow only selected principals, organizations, source accounts, source ARNs, VPC endpoints, or network contexts.",
        "Cross-account access often requires both appropriate permissions in the caller's account and a resource-side policy or grant in the target account.",
        "Some same-account resource-policy scenarios have authorization semantics that differ from the common identity-policy model, especially for IAM users, role sessions, and explicit denies. Evaluate the actual principal type and policy combination.",
      ],
      nextAction:
        "Validate the resource policy against the exact caller principal and resource. Keep existing security restrictions unless the owner approves a justified adjustment.",
    },
    {
      step: 9,
      title: "Verify cross-account role assumption and trust",
      purpose:
        "Separate permission to assume a role from permission to use the assumed role.",
      commands: [
        "aws sts get-caller-identity --output json",
        "aws iam get-role --role-name CrossAccountDeploymentRole --query 'Role.AssumeRolePolicyDocument' --output json",
        "aws sts assume-role --role-arn arn:aws:iam::210987654321:role/CrossAccountDeploymentRole --role-session-name DeploymentDebug",
      ],
      interpretOutput: [
        "The caller needs authorization to call sts:AssumeRole, and the target role trust policy must permit the caller under the applicable conditions.",
        "Successful AssumeRole does not automatically grant permission to perform the subsequent action against S3, ECR, EC2, or another service.",
        "A failed AssumeRole request is an authentication/trust/authorization investigation; a later S3 AccessDenied is a separate authorization investigation.",
        "MFA requirements, external IDs, principal ARNs, session tags, and organization conditions may affect trust evaluation.",
        "AssumeRole returns temporary credentials. Never print or commit the returned credentials.",
      ],
      nextAction:
        "Identify whether the failure occurs while assuming the role or after assuming it. Investigate trust and action permissions as separate steps.",
    },
    {
      step: 10,
      title: "Check VPC endpoint policies and network-specific restrictions",
      purpose:
        "Investigate authorization restrictions introduced by private network paths.",
      commands: [
        "aws ec2 describe-vpc-endpoints --region ap-south-1 --output table",
        "aws ec2 describe-vpc-endpoints --region ap-south-1 --query 'VpcEndpoints[].{Id:VpcEndpointId,Service:ServiceName,State:State,Policy:PolicyDocument}' --output json",
      ],
      interpretOutput: [
        "Replace the Region and filter to the endpoint used by the affected workload.",
        "Endpoint policies can restrict requests passing through supported VPC endpoints, even when IAM permissions appear sufficient.",
        "A workload using a different route, proxy, or endpoint may evaluate under a different network or policy context.",
        "Network connectivity errors and IAM authorization errors are different failure classes, although both can appear during the same incident.",
        "Some endpoint or service policies may not expose all details to the current principal.",
      ],
      nextAction:
        "Verify the actual endpoint used by the request and inspect its policy. Do not broaden endpoint access without confirming the required services and resources.",
    },
    {
      step: 11,
      title: "Investigate IAM policy simulation carefully",
      purpose:
        "Use the policy simulator as supporting evidence for an identity-policy decision.",
      commands: [
        "aws iam simulate-principal-policy --policy-source-arn arn:aws:iam::123456789012:role/DeploymentRole --action-names s3:PutObject --resource-arns arn:aws:s3:::company-deployment-artifacts/releases/build.zip",
      ],
      interpretOutput: [
        "Replace the principal, action, and resource ARN with the actual values.",
        "Inspect EvalDecision, MatchedStatements, MissingContextValues, and OrganizationsDecisionDetail where returned.",
        "An explicitDeny result indicates a matching deny in the simulated policy context. Identify the policy source before changing it.",
        "A denied result can indicate a missing Allow, but a simulation must be interpreted with the supplied resource and context.",
        "The simulator may not evaluate every resource policy, service-specific authorization rule, live session policy, network condition, or organization context exactly as the real request does.",
        "A simulated allowed result does not prove that the real API request will succeed.",
      ],
      nextAction:
        "Use the simulator to narrow the investigation, then confirm the relevant real-world policies and reproduce the request safely.",
    },
    {
      step: 12,
      title: "Validate resource ARN and action-level permissions",
      purpose:
        "Catch common mistakes involving wildcard scope, resource types, and dependent actions.",
      commands: [
        "aws iam get-policy --policy-arn arn:aws:iam::123456789012:policy/DeploymentPolicy",
        "aws iam list-policy-versions --policy-arn arn:aws:iam::123456789012:policy/DeploymentPolicy",
      ],
      interpretOutput: [
        "Different APIs for the same service can require different IAM actions and different resource types.",
        "Some list and describe actions require Resource: '*' because the service does not support resource-level authorization for those actions.",
        "S3 bucket-level and object-level actions use different ARN patterns. For example, bucket access and object access are not interchangeable.",
        "An action that creates a resource may require permissions for related resources or dependent operations.",
        "Tag-based conditions can reject resource creation if required request tags or tag keys are missing.",
      ],
      nextAction:
        "Use the service authorization reference to verify the exact action, supported resource types, condition keys, and dependent permissions.",
    },
    {
      step: 13,
      title: "Investigate KMS-related AccessDenied errors",
      purpose:
        "Separate access to an encrypted resource from permission to use its encryption key.",
      commands: [
        "aws kms describe-key --key-id arn:aws:kms:ap-south-1:123456789012:key/EXAMPLE-KEY-ID",
        "aws kms get-key-policy --key-id arn:aws:kms:ap-south-1:123456789012:key/EXAMPLE-KEY-ID --policy-name default",
      ],
      interpretOutput: [
        "An S3, EBS, Secrets Manager, or other encrypted-resource operation may fail because the caller cannot use the associated KMS key.",
        "Inspect key state, key policy, IAM policies, grants, encryption context, and cross-account requirements.",
        "The exact required KMS actions depend on the service and operation. Do not add Encrypt, Decrypt, or GenerateDataKey permissions indiscriminately.",
        "A key disabled, pending deletion, or inaccessible across accounts can cause failures that look like a generic application authorization issue.",
      ],
      nextAction:
        "Identify the actual key and service integration. Request only the KMS permissions and key-policy changes required by the documented workflow.",
    },
    {
      step: 14,
      title: "Compare the failing pipeline with a known-good execution",
      purpose:
        "Find identity or context changes that explain a sudden regression.",
      commands: [
        "git log -5 --oneline",
        "git diff -- .",
        "aws sts get-caller-identity --output json",
        "aws configure list",
      ],
      interpretOutput: [
        "Compare the last successful commit, deployment configuration, role ARN, Region, profile selection, and relevant environment settings.",
        "Check whether a pipeline changed from OIDC federation to static credentials, or began assuming a different role.",
        "Review recent infrastructure changes that modify permissions boundaries, IAM policies, trust relationships, SCPs, resource policies, or endpoints.",
        "A local workstation succeeding does not prove the pipeline identity has the same effective permissions.",
        "Do not print environment variables indiscriminately: they may contain secrets or session credentials.",
      ],
      nextAction:
        "Document the smallest meaningful difference between successful and failed requests, then test that hypothesis against CloudTrail and policy evidence.",
    },
    {
      step: 15,
      title: "Determine whether the failure is authentication or authorization",
      purpose:
        "Avoid editing policies when the real problem is missing or invalid credentials.",
      commands: [
        "aws sts get-caller-identity --output json",
        "aws configure list",
        "aws sts get-caller-identity --profile production --output json",
      ],
      interpretOutput: [
        "InvalidClientTokenId, ExpiredToken, and Unable to locate credentials commonly point to credential availability or validity rather than a missing service permission.",
        "AccessDenied for a validly authenticated principal often points toward authorization, although the exact service error matters.",
        "A pipeline can silently select credentials from environment variables instead of the intended profile or workload identity.",
        "For OIDC, verify token audience, subject claims, trust conditions, role ARN, and the actual role session selected by the workflow.",
      ],
      nextAction:
        "Fix credential selection or federation if authentication is the issue. Investigate authorization policies only after establishing the actual caller.",
    },
    {
      step: 16,
      title: "Validate the fix with a controlled request",
      purpose:
        "Prove the specific denied operation now works without granting unrelated permissions.",
      commands: [
        "aws sts get-caller-identity --output json",
        "aws s3api put-object --bucket company-deployment-artifacts --key incident-tests/authorization-check.txt --body ./authorization-check.txt",
      ],
      interpretOutput: [
        "The S3 example creates or overwrites an object at the specified key and is not a read-only test. Use only an approved test key and a known test file.",
        "Do not run a write test against a production path unless the resource owner has approved it.",
        "For APIs that can create, update, delete, or incur cost, use a dedicated test resource or a safe service-specific validation.",
        "A successful identity check confirms the caller but does not prove that the target action is authorized.",
        "A successful controlled request validates only that action, resource, and context; it does not prove all pipeline steps are fixed.",
      ],
      nextAction:
        "Run the smallest safe request, then rerun the deployment in a controlled manner. Verify application health and check for partial changes.",
    },
    {
      step: 17,
      title: "Check for partial deployment and reconcile state",
      purpose:
        "Prevent duplicate or inconsistent infrastructure changes after an authorization failure.",
      commands: [
        "terraform plan",
        "terraform state list",
        "aws cloudformation describe-stack-events --stack-name production-stack --region ap-south-1",
      ],
      interpretOutput: [
        "Run Terraform commands from the correct repository and workspace with the intended backend and credentials.",
        "terraform plan may contact AWS and fail if the role still lacks read permissions. Do not assume a failed plan means no changes were made.",
        "Inspect Terraform state and the actual resources before retrying. Do not edit state manually as an initial response.",
        "CloudFormation events can show which resource failed and which earlier operations succeeded.",
        "A partially successful deployment may require a controlled continuation, rollback, or reconciliation depending on the tool and resource.",
      ],
      nextAction:
        "Determine the actual deployed state, select a recovery plan, and obtain approval for rollback or forward-fix operations when required.",
    },
  ],

  rootCauseMatrix: [
    {
      symptom: "The role policy has Allow, but the request still fails.",
      likelyCause:
        "An explicit Deny, permissions boundary, session policy, SCP, RCP, resource policy, or endpoint policy restricts the request.",
      verification:
        "Correlate the CloudTrail event with applicable policies, role boundary, session creation configuration, organization hierarchy, resource policy, and request context.",
      resolution:
        "Correct the specific restrictive control only after confirming the request is legitimate and the security owner approves the change.",
    },
    {
      symptom: "A developer workstation succeeds but CI/CD fails.",
      likelyCause:
        "Different caller identity, assumed role, session policy, OIDC claims, Region, profile, or source network.",
      verification:
        "Compare sts get-caller-identity, credential source, Region, role ARN, session tags, pipeline configuration, and CloudTrail event.",
      resolution:
        "Correct the intended workload identity or its narrowly scoped permissions. Do not copy a developer's personal credentials into the pipeline.",
    },
    {
      symptom: "AssumeRole fails before deployment starts.",
      likelyCause:
        "Missing sts:AssumeRole permission, trust-policy mismatch, external ID, MFA, or federation-condition mismatch.",
      verification:
        "Inspect the source identity, target trust policy, role ARN, OIDC subject/audience claims, and CloudTrail STS event.",
      resolution:
        "Update the trust or caller policy only to match the approved principal and required conditions.",
    },
    {
      symptom: "S3 GetObject or PutObject fails.",
      likelyCause:
        "Incorrect bucket/object ARN, missing S3 action, bucket-policy restriction, cross-account access issue, or KMS denial.",
      verification:
        "Inspect the exact object key, caller ARN, bucket policy, identity policy, KMS key, and applicable endpoint restrictions.",
      resolution:
        "Grant only the required object or bucket action to the approved resource scope and satisfy encryption requirements.",
    },
    {
      symptom: "AccessDenied started after an organization policy change.",
      likelyCause:
        "An inherited SCP or another organization-level guardrail now blocks the request.",
      verification:
        "Compare policy versions and attachment changes with the incident timeline; inspect the full account-to-root hierarchy.",
      resolution:
        "Request a controlled policy correction from the Organizations owner without bypassing organization-wide security controls.",
    },
    {
      symptom: "CreateResource fails even though the create action is allowed.",
      likelyCause:
        "Missing dependent action, required request tag, iam:PassRole, service-linked-role permission, or permission to use an associated KMS key.",
      verification:
        "Inspect the exact service API, error details, service authorization reference, CloudTrail event, and resource-specific requirements.",
      resolution:
        "Add only the required dependent permission and valid conditions for the specific workflow.",
    },
    {
      symptom: "A role can deploy in one Region but not another.",
      likelyCause:
        "Region condition, wrong configured Region, resource ARN mismatch, or service/resource availability differences.",
      verification:
        "Compare --region, AWS_REGION, policy conditions, CloudTrail awsRegion, and resource ARNs.",
      resolution:
        "Use the intended Region or update the approved policy condition to the required Regions.",
    },
    {
      symptom: "The error mentions iam:PassRole.",
      likelyCause:
        "The caller can create or update a service resource but cannot pass the selected IAM role to that service.",
      verification:
        "Identify the exact role ARN being passed, the service principal, and the caller's iam:PassRole policy conditions.",
      resolution:
        "Allow iam:PassRole only for the specific approved role ARN and, where appropriate, restrict it with iam:PassedToService.",
    },
    {
      symptom: "The policy simulator says allowed, but the live request fails.",
      likelyCause:
        "The simulator context differs from the real request or another authorization layer is involved.",
      verification:
        "Compare actual principal/session, resource policy, SCP/RCP, endpoint, encryption key, condition context, and CloudTrail event.",
      resolution:
        "Reproduce the actual request context and correct the authorization layer proven to cause the failure.",
    },
    {
      symptom: "The error appears after credentials are rotated or a pipeline is edited.",
      likelyCause:
        "Expired credentials, wrong credential source, incorrect role ARN, missing OIDC trust, or a changed session policy.",
      verification:
        "Check the identity from the failed runner and compare workflow, trust policy, secret configuration, and STS events.",
      resolution:
        "Restore the approved credential or federation path and remove obsolete credentials securely.",
    },
  ],

  recoveryProcedures: [
    {
      scenario: "A required identity permission is missing",
      procedure: [
        "Capture the exact API action, resource ARN, and failed caller identity.",
        "Verify the required action and resource type in the service authorization reference.",
        "Draft a narrowly scoped policy statement with the minimum necessary action and resource.",
        "Add required conditions and dependent actions only when supported by evidence.",
        "Submit the change for the normal review and approval process.",
        "Apply the policy through the approved infrastructure-as-code or IAM change workflow.",
      ],
      validation: [
        "Confirm the intended policy version is active and attached to the intended principal.",
        "Run a safe test using the same role and request context.",
        "Confirm CloudTrail records the expected principal and successful operation.",
        "Rerun the failed workflow and verify service health and deployment completion.",
      ],
      rollback:
        "If the change grants unintended access or causes another issue, revert to the last approved policy version through the controlled change process. Validate that the revert does not break unrelated production workloads.",
    },
    {
      scenario: "An SCP, boundary, or other guardrail blocks the request",
      procedure: [
        "Identify the applicable guardrail and the specific matching restriction.",
        "Confirm the request is authorized by the application and security owners.",
        "Ask the organization or IAM control owner to review the policy's intent.",
        "Propose a narrow exception or corrected condition only if the business requirement justifies it.",
        "Test the approved change in a non-production account when feasible.",
      ],
      validation: [
        "Verify the intended request succeeds after the approved change.",
        "Verify unrelated restricted actions remain blocked.",
        "Confirm organization monitoring and audit records remain intact.",
      ],
      rollback:
        "Restore the previous approved guardrail configuration if the change causes unintended access or violates the control requirement.",
    },
    {
      scenario: "Cross-account access or role assumption fails",
      procedure: [
        "Establish the source account and exact source principal.",
        "Identify the target account, role ARN, resource ARN, and failing API stage.",
        "Check caller permission to assume the role and the target trust policy separately.",
        "Verify external ID, MFA, OIDC claims, session tags, and organization conditions where applicable.",
        "Check the target role's effective permissions for the later resource operation.",
      ],
      validation: [
        "Confirm AssumeRole succeeds with the intended identity.",
        "Confirm get-caller-identity reports the expected assumed role.",
        "Test the exact target operation with the approved resource.",
      ],
      rollback:
        "Revert the trust or identity-policy change if it permits unintended principals or expands cross-account access beyond the approved scope.",
    },
    {
      scenario: "The denial is caused by an incorrect CI/CD identity",
      procedure: [
        "Inspect the workflow's credential provider and role assumption configuration.",
        "Verify repository, branch, environment, OIDC audience, and subject claims where relevant.",
        "Remove dependency on unintended developer or long-lived credentials.",
        "Restore the approved workload identity configuration.",
        "Re-run the pipeline in a controlled environment.",
      ],
      validation: [
        "Confirm the runner assumes the expected role.",
        "Confirm no access key or session token is printed or stored in source control.",
        "Verify the deployment succeeds with the intended least-privilege identity.",
      ],
      rollback:
        "Restore the previous approved identity configuration if the new federation setup prevents deployment, while ensuring any compromised or obsolete credentials are revoked through the incident process.",
    },
  ],

  advancedScenarios: [
    {
      title: "Terraform fails with AccessDenied during apply",
      symptoms: [
        "terraform plan succeeds but apply fails on CreateRole, CreatePolicy, PassRole, or resource creation.",
        "Some resources were created before the failure.",
        "The pipeline fails on a provider operation that was not obvious from the original Terraform resource.",
      ],
      investigation: [
        "Record the provider version, workspace, backend, account, Region, commit SHA, and exact failed resource.",
        "Inspect the detailed Terraform error and CloudTrail event for the underlying API action.",
        "Check whether the deployment role requires iam:PassRole, iam:CreateServiceLinkedRole, or another dependent action.",
        "Inspect state and the actual AWS resource inventory before retrying.",
        "Check whether a permissions boundary or SCP was introduced after the last successful deployment.",
      ],
      resolution: [
        "Correct the specific missing permission or restrictive control after approval.",
        "Re-run terraform plan and inspect all planned changes before applying.",
        "Use the intended workspace and backend and reconcile partial resources.",
        "Do not delete state files or use terraform state rm as a generic AccessDenied fix.",
      ],
    },
    {
      title: "EKS workload receives AccessDenied when calling AWS APIs",
      symptoms: [
        "A pod runs successfully but fails when accessing S3, Secrets Manager, KMS, or DynamoDB.",
        "The node role works for image pulls, but the application cannot access its AWS resource.",
        "The workload unexpectedly uses the EC2 node instance profile.",
      ],
      investigation: [
        "Determine whether the cluster uses EKS Pod Identity, IAM Roles for Service Accounts (IRSA), or another credential mechanism.",
        "Check the Kubernetes ServiceAccount and workload configuration.",
        "Use the supported identity diagnostic for the configured mechanism; avoid printing credential environment variables.",
        "For IRSA, check the OIDC provider, role trust conditions, audience, and ServiceAccount subject.",
        "For EKS Pod Identity, inspect the association, agent status, role trust relationship, and workload identity configuration.",
        "Confirm the resulting role has the specific required service permissions.",
      ],
      resolution: [
        "Correct the workload-to-role association and trust policy for the chosen mechanism.",
        "Grant the minimum required resource permissions to the workload role.",
        "Restart or roll out the workload only when required for updated identity configuration.",
        "Verify the application operation and CloudTrail caller identity after recovery.",
      ],
    },
    {
      title: "GitHub Actions OIDC federation stops working",
      symptoms: [
        "A pipeline fails during AssumeRoleWithWebIdentity.",
        "A repository or branch rename breaks deployment.",
        "The workflow uses a different role than expected.",
      ],
      investigation: [
        "Inspect the workflow permissions and confirm id-token: write is configured where needed.",
        "Verify the configured role ARN and AWS account.",
        "Check the IAM OIDC provider and the role trust policy.",
        "Compare the token audience and subject claims with the trust conditions.",
        "Check whether the workflow moved to a different branch, tag, repository, or GitHub environment.",
        "Inspect CloudTrail STS events and the workflow run logs without printing the token.",
      ],
      resolution: [
        "Restore the intended role ARN and OIDC provider configuration.",
        "Align trust conditions with the approved repository and branch or environment.",
        "Avoid wildcard trust conditions that permit untrusted repositories or branches.",
        "Confirm the pipeline assumes the expected role before retrying deployment.",
      ],
    },
    {
      title: "iam:PassRole denial during ECS, Lambda, or EC2 deployment",
      symptoms: [
        "Creating or updating a service fails while other deployment operations work.",
        "The error names iam:PassRole.",
        "The caller has permission to create the service resource but not to pass its execution or task role.",
      ],
      investigation: [
        "Capture the exact role ARN supplied in the service API request.",
        "Determine which AWS service must receive the role.",
        "Check the caller's iam:PassRole statement and any iam:PassedToService condition.",
        "Verify that the role trust policy allows the intended service principal to assume the role.",
        "Separate permission to pass the role from permission for the service to use the role.",
      ],
      resolution: [
        "Allow iam:PassRole only on the specific intended role or narrowly scoped approved role set.",
        "Apply a service condition where appropriate and supported.",
        "Verify the target role's trust relationship and workload permissions independently.",
        "Retry the service deployment and verify the service reaches its healthy state.",
      ],
    },
    {
      title: "S3 and KMS permissions fail together",
      symptoms: [
        "An application can list a bucket but cannot download an encrypted object.",
        "A deployment artifact upload fails when using SSE-KMS.",
        "Cross-account object access fails despite an S3 bucket policy.",
      ],
      investigation: [
        "Check whether the denied operation is bucket-level or object-level.",
        "Inspect the bucket policy, identity policy, and exact object ARN.",
        "Identify the KMS key used to encrypt the object.",
        "Check key state, key policy, grants, encryption context, and cross-account access requirements.",
        "Review CloudTrail evidence for both the S3 request and related KMS activity where available.",
      ],
      resolution: [
        "Correct the S3 authorization for the intended object path.",
        "Grant only the required KMS usage actions and key access.",
        "Validate using a known test object and the same workload identity.",
        "Confirm no unrelated bucket paths or KMS keys became accessible.",
      ],
    },
    {
      title: "AccessDenied after a security policy rollout",
      symptoms: [
        "Multiple applications fail at the same time.",
        "Failures span several accounts or services.",
        "The issue started shortly after a central security policy change.",
      ],
      investigation: [
        "Build a timeline of organization policy, permission-boundary, endpoint-policy, and resource-policy changes.",
        "Identify the common account, OU, resource tag, network path, or principal characteristic.",
        "Compare affected and unaffected workloads to isolate the common control.",
        "Ask the security control owner to review the relevant policy versions and inherited attachments.",
        "Prioritize customer impact and avoid broad permission changes while the cause is unknown.",
      ],
      resolution: [
        "Have the authorized owner correct the specific erroneous condition or deploy a narrow approved exception.",
        "Validate against representative affected and unaffected workloads.",
        "Monitor denied requests and application health after the change.",
        "Document the control gap and add regression tests for policy changes.",
      ],
    },
    {
      title: "AccessDenied caused by source-network or endpoint conditions",
      symptoms: [
        "A request works from one network but fails from a private subnet.",
        "A resource policy restricts access to a specific VPC endpoint or source IP.",
        "A workload's network path changed after infrastructure updates.",
      ],
      investigation: [
        "Identify the actual route, proxy, VPC endpoint, and network path used by the request.",
        "Inspect resource-policy conditions and endpoint policy restrictions.",
        "Compare source context with the intended security requirement.",
        "Separate network reachability failures from an API request that reached AWS and was denied.",
      ],
      resolution: [
        "Restore the intended network path or adjust only the approved source condition.",
        "Preserve private connectivity and network security requirements.",
        "Validate from the affected workload environment rather than only from a workstation.",
      ],
    },
  ],

  prevention: [
    "Use least-privilege IAM roles for applications, developers, deployment pipelines, and automation.",
    "Prefer short-lived role sessions and supported workload identity federation over long-lived access keys.",
    "Manage IAM policies, trust policies, and role attachments through reviewed infrastructure-as-code.",
    "Use pull requests and policy-diff reviews for permission changes.",
    "Add automated policy checks using tools such as IAM Access Analyzer and approved policy-validation tools.",
    "Validate trust policies for GitHub Actions, EKS workloads, Lambda, ECS, and cross-account roles.",
    "Test deployments in a non-production account with the same identity pattern used in production.",
    "Review SCPs, RCPs where used, permissions boundaries, endpoint policies, and resource policies as part of change review.",
    "Monitor changes to sensitive roles, attached policies, trust relationships, permission boundaries, and organization guardrails.",
    "Use policy conditions and resource scoping where supported, but test them against the actual workload context.",
    "Create a runbook with the first five diagnostic steps, escalation contacts, and the approved recovery process.",
    "Review IAM Access Analyzer findings and remove unused permissions through a controlled change process.",
    "Do not use production administrator credentials as a routine deployment identity.",
  ],

  monitoringAndAlerting: [
    "Use CloudTrail to audit IAM changes and relevant denied management API calls.",
    "Where relevant data events are enabled, monitor object-level and other supported data-plane operations.",
    "Create EventBridge rules for selected high-risk IAM changes and authorization failures where the event type supports them.",
    "Send high-risk security findings to the approved monitoring and incident-management system.",
    "Alert on repeated deployment failures and correlated AccessDenied errors across services.",
    "Track the identity ARN, account, Region, API action, resource, and error code in structured logs while redacting secrets.",
    "Monitor changes to AssumeRole trust policies, attached policies, inline policies, permissions boundaries, and sensitive resource policies.",
    "Verify CloudTrail coverage, event selectors, log retention, access controls, and alert delivery periodically.",
    "Use AWS Config or approved policy-compliance tooling where applicable to detect configuration drift.",
    "Avoid creating noisy alerts for every expected denied request. Tune alert severity based on resource sensitivity and business impact.",
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Start time and detection time:",
    "Severity and customer impact:",
    "Affected account, Region, environment, and application:",
    "Failed API action and target resource ARN:",
    "Caller principal ARN and credential mechanism:",
    "Last successful request and first failed request:",
    "CloudTrail event IDs and relevant policy evidence:",
    "Confirmed root cause:",
    "Approved remediation and change reference:",
    "Validation steps and observed results:",
    "Partial deployment state or rollback decision:",
    "Security impact and access-scope review:",
    "Preventive action, owner, and due date:",
    "Runbook or monitoring improvements:",
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Identify the active AWS identity",
      objective:
        "Learn how to distinguish a wrong account or role from a permission problem.",
      steps: [
        "Run aws sts get-caller-identity.",
        "Compare the account and ARN with the intended deployment role.",
        "Run aws configure list and identify the credential source without exposing secrets.",
        "Repeat from the actual CI runner or workload environment when available.",
        "Record the intended and actual identity in the incident notes.",
      ],
      successCriteria: [
        "The learner can identify the active account and principal.",
        "The learner can explain why local credentials may differ from CI/CD credentials.",
      ],
    },
    {
      title: "Lab 2 — Diagnose a missing S3 permission safely",
      objective:
        "Understand bucket-level permissions, object-level permissions, and least privilege.",
      steps: [
        "Use a dedicated sandbox AWS account and a non-production test bucket.",
        "Create a test role with only the permissions required by the exercise.",
        "Attempt a permitted operation and a deliberately restricted operation.",
        "Inspect the returned error and the relevant CloudTrail event.",
        "Compare the exact action and resource ARN with the policy.",
        "Add the smallest approved policy correction and repeat the test.",
      ],
      successCriteria: [
        "The learner distinguishes bucket-level and object-level actions.",
        "The learner fixes the sandbox denial without granting administrator access.",
      ],
    },
    {
      title: "Lab 3 — Investigate AssumeRole trust",
      objective:
        "Separate the permission to assume a role from the permissions of the assumed role.",
      steps: [
        "Create two sandbox accounts or use an approved cross-account training environment.",
        "Configure a test source principal and a narrowly scoped target role trust policy.",
        "Attempt AssumeRole with the expected and an unauthorized principal.",
        "Inspect the assumed identity using sts get-caller-identity.",
        "Test a target action separately from role assumption.",
      ],
      successCriteria: [
        "The learner can identify trust-policy failures.",
        "The learner can explain why successful role assumption does not guarantee target resource access.",
      ],
    },
    {
      title: "Lab 4 — Simulate and investigate an explicit Deny",
      objective:
        "Learn how explicit denies and policy conditions affect authorization.",
      steps: [
        "Use an isolated sandbox role and test resource.",
        "Create an approved test policy with a controlled deny condition.",
        "Run the IAM policy simulator with the exact action and resource.",
        "Compare simulator output with a controlled real API request.",
        "Remove the test restriction through the approved lab cleanup procedure.",
      ],
      successCriteria: [
        "The learner identifies the effect of an applicable explicit Deny.",
        "The learner explains why simulator output is not a universal proof of live authorization.",
      ],
    },
    {
      title: "Lab 5 — Debug a CI/CD identity mismatch",
      objective:
        "Find why a pipeline uses a different role than the developer expects.",
      steps: [
        "Use a sandbox pipeline configured with an approved short-lived identity mechanism.",
        "Record the caller identity at the beginning of the pipeline.",
        "Compare role ARN, Region, workflow conditions, and credential source.",
        "Inspect trust-policy and CloudTrail evidence for a controlled failed run.",
        "Correct the identity configuration and repeat the run.",
      ],
      successCriteria: [
        "The learner can identify a wrong principal or trust condition.",
        "The learner validates the corrected identity without exposing credentials.",
      ],
    },
  ],

  interviewQuestions: [
    {
      question: "What does AWS AccessDenied mean?",
      answer:
        "The request was not authorized under the applicable AWS authorization rules. The cause may be a missing Allow, an explicit Deny, a boundary, session policy, SCP, resource policy, endpoint policy, or service-specific requirement. Identify the actual caller and failed API action before changing permissions.",
    },
    {
      question: "What is the first command you run during an AccessDenied incident?",
      answer:
        "I usually run aws sts get-caller-identity in the same environment as the failure. It confirms the active account and principal. I then capture the exact error, action, resource ARN, Region, and timestamp.",
    },
    {
      question: "If an IAM role has an Allow policy, why can it still receive AccessDenied?",
      answer:
        "An Allow in one policy does not override an applicable explicit Deny or all other restrictions. Permissions boundaries, session policies, organization policies, resource policies, endpoint policies, and service-specific authorization requirements may still block the request.",
    },
    {
      question: "What is the difference between an identity policy and a resource policy?",
      answer:
        "An identity policy is attached to a user, group, or role and governs what that identity can do. A resource policy is attached to a supported resource and specifies which principals can access it and under what conditions. Cross-account access commonly requires coordinated permissions on both sides.",
    },
    {
      question: "What is an IAM permissions boundary?",
      answer:
        "A permissions boundary sets the maximum permissions that identity-based policies can grant to a principal. It does not grant permissions by itself, and adding an Allow to the role may not help if the boundary excludes the action.",
    },
    {
      question: "What is the difference between an SCP and an IAM policy?",
      answer:
        "An IAM policy can grant permissions to an identity within the applicable authorization rules. An SCP defines permission guardrails for principals in member accounts; it does not grant permissions by itself. An applicable SCP restriction can prevent an otherwise allowed action.",
    },
    {
      question: "How do you troubleshoot AccessDenied in Terraform?",
      answer:
        "I capture the exact failed API action and caller identity, inspect CloudTrail, verify the provider account and Region, examine the required identity and resource permissions, and check boundaries and organization controls. I then inspect Terraform state and the plan before applying a narrowly scoped fix.",
    },
    {
      question: "What is iam:PassRole?",
      answer:
        "iam:PassRole authorizes a principal to pass an IAM role to an AWS service for that service to use. It is different from sts:AssumeRole. The caller's permission to pass the role, the target role's trust policy, and the target role's own permissions must be considered separately.",
    },
    {
      question: "How do you troubleshoot AccessDenied in EKS?",
      answer:
        "I identify whether the application uses EKS Pod Identity, IRSA, or another credential mechanism. I verify the workload's actual role, association or trust configuration, and then investigate the role's permissions for the requested resource. I do not assume the node role is the correct application identity.",
    },
    {
      question: "How do you troubleshoot cross-account AccessDenied?",
      answer:
        "I verify the source identity, source permission to assume the target role, target trust policy, any external ID or federation conditions, and then the target role's permissions for the resource operation. I check the resource policy and organization guardrails where applicable.",
    },
    {
      question: "Can the IAM policy simulator prove that a request will succeed?",
      answer:
        "No. It is useful supporting evidence, but the simulated context may differ from the live request and it does not reproduce every service-specific or resource-side authorization detail. I validate the actual caller, policies, context, and controlled live request.",
    },
    {
      question: "What is the safest way to fix an AccessDenied error?",
      answer:
        "Determine the exact denied action and resource, collect CloudTrail and policy evidence, identify the specific missing permission or restrictive control, obtain approval, apply the minimum necessary change, test safely, validate the workload, and document the result. I never grant administrator access as a shortcut.",
    },
    {
      question: "How do you distinguish invalid credentials from an authorization failure?",
      answer:
        "I inspect the exact error and call sts get-caller-identity. Errors such as ExpiredToken or Unable to locate credentials commonly indicate credential issues, while AccessDenied may indicate authorization. I confirm the actual credential source and do not modify service permissions until the identity is established.",
    },
    {
      question: "Why might S3 access fail even when the bucket policy allows it?",
      answer:
        "The caller may lack the required identity permission, the object ARN may not match, an organization or endpoint policy may restrict access, or SSE-KMS may require additional key authorization. I inspect the exact operation, resource path, caller, bucket policy, KMS key, and CloudTrail evidence.",
    },
    {
      question: "What do you do after an authorization fix if deployment partially failed?",
      answer:
        "I inspect the deployment tool's events and state, compare planned and actual resources, and decide whether a controlled retry, forward fix, or rollback is appropriate. I do not assume that a failed deployment made no changes, and I do not delete Terraform state as a generic fix.",
    },
  ],

  references: [
    {
      title: "AWS IAM policy evaluation logic",
      url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html",
    },
    {
      title: "AWS IAM policy simulator",
      url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html",
    },
    {
      title: "IAM Access Analyzer",
      url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html",
    },
    {
      title: "AWS CloudTrail Event history",
      url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html",
    },
    {
      title: "AWS Organizations service control policies",
      url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html",
    },
    {
      title: "AWS IAM permissions boundaries",
      url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html",
    },
    {
      title: "AWS IAM PassRole",
      url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html",
    },
    {
      title: "AWS IAM cross-account role access",
      url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html",
    },
    {
      title: "AWS IAM AccessDenied troubleshooting",
      url: "https://repost.aws/knowledge-center/iam-permission-issues",
    },
  ],
};
