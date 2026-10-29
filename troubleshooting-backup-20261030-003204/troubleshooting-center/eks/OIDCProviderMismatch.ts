
/**
 * File: app/troubleshooting-center/eks/OIDCProviderMismatch.ts
 *
 * Amazon EKS — OIDC Provider Mismatch / IRSA Authentication Failure
 *
 * Production troubleshooting runbook covering:
 * - EKS OIDC issuer discovery and IAM provider matching
 * - IAM Roles for Service Accounts (IRSA)
 * - JWT issuer, audience, and subject claims
 * - IAM role trust policy and AssumeRoleWithWebIdentity
 * - ServiceAccount annotations and Pod environment
 * - STS, DNS, proxy, and network connectivity
 * - Terraform/CloudFormation drift
 * - Deployment recovery, validation, and prevention
 *
 * Safety:
 * - Start with read-only diagnostics.
 * - Never expose JWT tokens, AWS credentials, or kubeconfig secrets.
 * - Do not broaden trust policies to "*" as a troubleshooting shortcut.
 * - Do not delete and recreate IAM OIDC providers without impact analysis.
 * - Distinguish IRSA from EKS Pod Identity before changing configuration.
 */

export const oidcProviderMismatchGuide = {
  metadata: {
    id: "eks-oidc-provider-mismatch",
    title: "Amazon EKS — OIDC Provider Mismatch and IRSA Failures",
    file: "OIDCProviderMismatch.ts",
    category: "EKS Troubleshooting",
    difficulty: "Advanced",
    audience: [
      "SRE",
      "DevOps Engineer",
      "Platform Engineer",
      "Cloud Security Engineer",
      "AWS Administrator",
    ],
    tags: [
      "Amazon EKS",
      "OIDC",
      "IRSA",
      "IAM",
      "STS",
      "ServiceAccount",
      "JWT",
      "Trust Policy",
      "Terraform",
      "CloudFormation",
      "Workload Identity",
      "Production Incident",
    ],
    estimatedDuration: "45–120 minutes",
    disclaimer:
      "Commands are diagnostic templates. Substitute actual cluster, account, region, " +
      "namespace, role, and ServiceAccount values. Validate behavior against the deployed EKS version.",
  },

  overview: {
    problem:
      "A Kubernetes workload in Amazon EKS attempts to obtain AWS credentials through " +
      "IAM Roles for Service Accounts (IRSA), but AWS STS rejects the web identity token, " +
      "the AWS SDK cannot find credentials, or the workload unexpectedly uses another identity.",

    irsaFlow: [
      "A Pod is assigned a Kubernetes ServiceAccount.",
      "The ServiceAccount is annotated with an IAM role ARN.",
      "The EKS workload identity configuration supplies a projected service-account token.",
      "The token contains issuer, audience, and subject claims.",
      "The AWS SDK reads the token and role ARN from the configured environment or credential chain.",
      "The SDK calls STS AssumeRoleWithWebIdentity.",
      "STS validates the token issuer and claims against the IAM role trust policy.",
      "If validation succeeds, STS returns temporary AWS credentials.",
      "The workload uses those credentials to call the permitted AWS service.",
    ],

    keyTerms: {
      issuer:
        "The URL identifying the OIDC issuer for the EKS cluster.",
      audience:
        "The token recipient claim. IRSA commonly uses sts.amazonaws.com.",
      subject:
        "The Kubernetes identity represented by the token, typically system:serviceaccount:<namespace>:<serviceaccount>.",
      providerArn:
        "The IAM OIDC provider resource associated with the issuer in a particular AWS account.",
      trustPolicy:
        "The IAM role policy that defines which federated identity may assume the role.",
      permissionPolicy:
        "The IAM permissions attached to the role after it is assumed.",
    },

    criticalDistinctions: [
      "A trust-policy failure is different from a missing permission on the assumed role.",
      "An issuer URL mismatch is different from a missing IAM permission for an AWS API.",
      "A ServiceAccount annotation does not by itself prove that a running Pod uses that identity.",
      "A token audience mismatch is different from an incorrect subject claim.",
      "IRSA and EKS Pod Identity use different configuration and credential-delivery mechanisms.",
      "An AWS SDK may obtain credentials from another provider in its credential chain; verify the actual caller identity.",
    ],
  },

  incidentScenario: {
    title: "Production incident: application loses access to S3 after deployment",

    timeline: [
      {
        time: "T+00",
        event:
          "A production deployment completes, but the application starts reporting AWS credential errors.",
      },
      {
        time: "T+03",
        event:
          "The application logs show AccessDenied or a web identity credential-provider error.",
      },
      {
        time: "T+07",
        event:
          "The platform team confirms that the Pod runs under the expected namespace and ServiceAccount.",
      },
      {
        time: "T+12",
        event:
          "The team compares the cluster issuer URL with the IAM OIDC provider and role trust policy.",
      },
      {
        time: "T+18",
        event:
          "A recent Terraform change is identified as a possible source of trust-policy drift.",
      },
      {
        time: "T+25",
        event:
          "The approved correction is applied and tested with STS and the actual application workload.",
      },
    ],

    impactQuestions: [
      "Which cluster, AWS account, region, namespace, and workload are affected?",
      "Does the problem affect all workloads or only one ServiceAccount?",
      "Does it affect one cluster or multiple clusters?",
      "Did a deployment, cluster replacement, account migration, or Terraform apply occur recently?",
      "Are AWS credentials unavailable, or are API calls returning AccessDenied?",
      "Is the workload failing to start, or is a background task failing after startup?",
      "Are customer transactions, deployments, backups, or data processing delayed?",
      "Is the application accidentally using node credentials or another AWS identity?",
    ],

    severityGuidance: [
      {
        severity: "SEV-1",
        condition:
          "A critical production workload cannot access required AWS resources and major customer-facing functionality is unavailable.",
        response:
          "Declare an incident, involve platform and security owners, and prioritize a safe recovery path.",
      },
      {
        severity: "SEV-2",
        condition:
          "One workload or namespace is degraded, or a production pipeline is blocked.",
        response:
          "Isolate the affected identity and role, preserve evidence, and make a targeted correction.",
      },
      {
        severity: "SEV-3",
        condition:
          "A non-production workload or an unused role has a configuration mismatch without production impact.",
        response:
          "Correct through normal change management and add a preventive check.",
      },
    ],
  },

  firstFiveMinutes: {
    objective:
      "Verify the environment, capture the exact error, and establish which credential mechanism the workload uses.",

    commands: [
      {
        purpose: "Confirm the Kubernetes context",
        command: "kubectl config current-context",
        interpretation:
          "Confirm that the commands target the intended cluster.",
      },
      {
        purpose: "Confirm AWS identity",
        command: "aws sts get-caller-identity",
        interpretation:
          "Record the diagnostic operator's account and ARN. This is not yet proof of the application's identity.",
      },
      {
        purpose: "Inspect the affected workload",
        command:
          "kubectl get pods -n \"$NAMESPACE\" -o wide",
        interpretation:
          "Identify the affected Pod, node, restart count, and current readiness.",
      },
      {
        purpose: "Inspect the ServiceAccount",
        command:
          "kubectl get serviceaccount \"$SERVICE_ACCOUNT\" -n \"$NAMESPACE\" -o yaml",
        interpretation:
          "Check the expected role annotation and other relevant metadata.",
      },
      {
        purpose: "Inspect the Pod's ServiceAccount",
        command:
          "kubectl get pod \"$POD_NAME\" -n \"$NAMESPACE\" -o jsonpath='{.spec.serviceAccountName}{\"\\n\"}'",
        interpretation:
          "Confirm the identity assigned to the actual running Pod.",
      },
      {
        purpose: "Capture the relevant application error",
        command:
          "kubectl logs \"$POD_NAME\" -n \"$NAMESPACE\" --since=30m --timestamps",
        interpretation:
          "Identify the AWS SDK error, timestamp, operation, and request context. Redact secrets before sharing.",
      },
    ],

    immediateSafety: [
      "Do not paste projected JWT tokens into tickets, chat, or public logs.",
      "Do not print AWS_SECRET_ACCESS_KEY or session tokens.",
      "Do not attach broad AdministratorAccess to the role as a test.",
      "Do not change the trust policy before comparing issuer, audience, and subject.",
      "Do not assume that the diagnostic operator's AWS identity is the workload identity.",
      "Do not delete an IAM OIDC provider merely because its URL appears incorrect.",
    ],
  },

  evidenceCollection: {
    record: [
      "Incident ID and severity",
      "Cluster name and AWS region",
      "AWS account ID",
      "EKS issuer URL",
      "IAM OIDC provider ARN",
      "IAM role ARN",
      "ServiceAccount namespace and name",
      "Pod name and assigned ServiceAccount",
      "Application image and AWS SDK version",
      "Exact error message and timestamp",
      "Recent deployment and infrastructure changes",
      "Role trust policy before remediation",
      "Relevant CloudTrail STS event details, if available",
      "Results of a safe identity test from the affected workload",
    ],

    safeCommands: [
      "kubectl config current-context",
      "aws sts get-caller-identity",
      "kubectl get serviceaccount \"$SERVICE_ACCOUNT\" -n \"$NAMESPACE\" -o yaml",
      "kubectl get pod \"$POD_NAME\" -n \"$NAMESPACE\" -o yaml",
      "aws eks describe-cluster --name \"$CLUSTER_NAME\" --region \"$AWS_REGION\" --query 'cluster.identity.oidc.issuer' --output text",
    ],

    doNotCapture: [
      "Full projected JWT token contents",
      "AWS secret access keys",
      "Session credentials",
      "Private signing keys",
      "Kubeconfig credentials",
      "Unredacted customer data",
    ],
  },

  diagnosticWorkflow: [
    {
      step: 1,
      name: "Confirm the cluster and AWS account",
      commands: [
        "kubectl config current-context",
        "aws sts get-caller-identity",
        "aws eks describe-cluster --name \"$CLUSTER_NAME\" --region \"$AWS_REGION\" --query 'cluster.{name:name,status:status,version:version,issuer:identity.oidc.issuer}' --output json",
      ],
      inspect: [
        "Expected AWS account",
        "Expected region",
        "Expected cluster name",
        "Cluster status",
        "Exact OIDC issuer URL",
      ],
      decision:
        "If the account, region, or cluster is unexpected, stop before any change.",
    },

    {
      step: 2,
      name: "Determine whether the workload uses IRSA or EKS Pod Identity",
      inspect: [
        "ServiceAccount annotation eks.amazonaws.com/role-arn",
        "Pod environment variables such as AWS_ROLE_ARN and AWS_WEB_IDENTITY_TOKEN_FILE",
        "EKS Pod Identity associations",
        "Credential-provider configuration in the application",
      ],
      commands: [
        "kubectl get serviceaccount \"$SERVICE_ACCOUNT\" -n \"$NAMESPACE\" -o yaml",
        "kubectl get pod \"$POD_NAME\" -n \"$NAMESPACE\" -o yaml",
        "aws eks list-pod-identity-associations --cluster-name \"$CLUSTER_NAME\" --region \"$AWS_REGION\"",
      ],
      decision:
        "If the workload uses EKS Pod Identity, investigate its association, agent, and role trust configuration instead of assuming an IRSA issuer mismatch.",
    },

    {
      step: 3,
      name: "Retrieve the exact EKS OIDC issuer",
      command:
        "aws eks describe-cluster --name \"$CLUSTER_NAME\" --region \"$AWS_REGION\" --query 'cluster.identity.oidc.issuer' --output text",
      inspect: [
        "Exact hostname",
        "Path after the hostname",
        "Issuer URL for the correct cluster",
        "Whether the cluster was recreated or replaced",
      ],
      decision:
        "Treat the returned issuer as the source of truth. Do not manually reconstruct the URL from a cluster name.",
    },

    {
      step: 4,
      name: "Check whether the matching IAM OIDC provider exists",
      commands: [
        "aws iam list-open-id-connect-providers",
        "aws iam get-open-id-connect-provider --open-id-connect-provider-arn \"$OIDC_PROVIDER_ARN\"",
      ],
      inspect: [
        "Provider ARN account",
        "Provider URL",
        "Client ID list",
        "Thumbprint list where applicable",
      ],
      decision:
        "The IAM provider must correspond to the expected issuer. A provider existing in another AWS account does not satisfy a role trust relationship in the target account.",
      caveat:
        "The IAM OIDC provider ARN is account-scoped and commonly contains the issuer hostname and path without the https:// prefix.",
    },

    {
      step: 5,
      name: "Compare the issuer URL exactly",
      procedure: [
        "Retrieve the EKS issuer from describe-cluster.",
        "Retrieve the IAM provider URL from get-open-id-connect-provider.",
        "Compare the hostname and path character for character.",
        "Check for an old cluster issuer after cluster recreation.",
        "Check whether the role trust policy references a provider from another cluster or account.",
      ],
      decision:
        "If the provider does not match the cluster issuer, determine whether the role should trust the current cluster before changing the provider or trust policy.",
    },

    {
      step: 6,
      name: "Inspect the IAM role trust policy",
      command:
        "aws iam get-role --role-name \"$ROLE_NAME\" --query 'Role.AssumeRolePolicyDocument' --output json",
      inspect: [
        "Federated principal ARN",
        "Action sts:AssumeRoleWithWebIdentity",
        "Issuer-specific condition key",
        "aud condition",
        "sub condition",
        "Unexpected wildcards",
      ],
      decision:
        "The federated principal must reference the intended IAM OIDC provider, and the conditions must match the token claims.",
    },

    {
      step: 7,
      name: "Validate the subject claim",
      expectedSubject:
        "system:serviceaccount:<namespace>:<serviceaccount>",
      compare: [
        "Actual Pod namespace",
        "Actual Pod ServiceAccount",
        "Trust policy sub condition",
        "Helm release namespace",
        "ServiceAccount name generated by the chart",
      ],
      decision:
        "A mismatch in namespace or ServiceAccount name can deny role assumption even when the issuer and audience are correct.",
      safety:
        "Avoid exposing the complete JWT. Prefer the known Pod and ServiceAccount configuration and trusted diagnostic methods.",
    },

    {
      step: 8,
      name: "Validate the audience claim",
      expectedAudience: "sts.amazonaws.com",
      inspect: [
        "IAM role trust policy aud condition",
        "Projected token audience configuration",
        "Any custom ServiceAccount token projection",
        "SDK web-identity token file configuration",
      ],
      decision:
        "If the token audience differs from the trust policy, correct the configuration at its source. Do not remove the audience restriction simply to make authentication succeed.",
    },

    {
      step: 9,
      name: "Inspect the actual running Pod",
      commands: [
        "kubectl get pod \"$POD_NAME\" -n \"$NAMESPACE\" -o yaml",
        "kubectl describe pod \"$POD_NAME\" -n \"$NAMESPACE\"",
        "kubectl get serviceaccount \"$SERVICE_ACCOUNT\" -n \"$NAMESPACE\" -o yaml",
      ],
      inspect: [
        "spec.serviceAccountName",
        "Pod creation timestamp",
        "Projected token volume",
        "AWS_ROLE_ARN environment variable, if injected",
        "AWS_WEB_IDENTITY_TOKEN_FILE environment variable, if injected",
        "ServiceAccount annotation",
        "Deployment and Helm values",
      ],
      decision:
        "If the ServiceAccount was corrected after the Pod started, check whether the running Pod received the expected identity configuration. A controlled rollout may be required after configuration is verified.",
    },

    {
      step: 10,
      name: "Test the STS credential exchange safely",
      command:
        "aws sts get-caller-identity",
      execution:
        "Run this inside the affected workload using its normal runtime environment, or use an approved diagnostic workload configured with the same ServiceAccount and role.",
      inspect: [
        "Returned account",
        "Returned assumed-role ARN",
        "Whether the expected role is actually being used",
      ],
      decision:
        "If credential exchange fails, investigate issuer, provider, trust policy, token claims, and STS connectivity. If it succeeds but the application API call fails, inspect the assumed role's permission policies and resource policies.",
      caution:
        "Running aws sts get-caller-identity on an administrator workstation only validates the workstation's identity. It does not validate IRSA for the Pod.",
    },

    {
      step: 11,
      name: "Distinguish credential-provider failure from permission denial",
      examples: [
        {
          error: "NoCredentialProviders or unable to locate credentials",
          interpretation:
            "The SDK may not have discovered usable credentials or may not support the expected provider configuration.",
          next:
            "Inspect SDK version, environment, token file path, and credential-provider chain.",
        },
        {
          error: "InvalidIdentityToken",
          interpretation:
            "STS rejected the supplied web identity token or could not validate it.",
          next:
            "Inspect issuer, provider, audience, token validity, and the exact STS error.",
        },
        {
          error: "AccessDenied for AssumeRoleWithWebIdentity",
          interpretation:
            "The role trust relationship, federated principal, or claim conditions may not authorize the request.",
          next:
            "Compare the actual identity claims and trust policy. Review the corresponding CloudTrail event if available.",
        },
        {
          error: "AccessDenied for s3:GetObject",
          interpretation:
            "The workload may have obtained credentials but lacks permission for the requested S3 operation or resource.",
          next:
            "Verify the actual caller identity, role permissions, bucket policy, KMS policy, and applicable organization controls.",
        },
      ],
    },

    {
      step: 12,
      name: "Check DNS and STS network reachability",
      inspect: [
        "DNS resolution for the configured STS endpoint",
        "Outbound connectivity from the Pod or node",
        "NAT gateway or egress firewall rules",
        "VPC endpoint configuration, if used",
        "Proxy environment variables",
        "Regional STS endpoint configuration",
      ],
      commands: [
        "kubectl get pods -n kube-system -o wide",
        "kubectl logs -n kube-system -l k8s-app=aws-node --since=30m",
      ],
      decision:
        "A timeout or DNS failure may indicate a network problem rather than an issuer mismatch. Use the actual AWS SDK endpoint configuration and approved network diagnostics.",
      caveat:
        "The aws-node label is common for the Amazon VPC CNI but may differ. Inspect the actual CNI DaemonSet if necessary.",
    },

    {
      step: 13,
      name: "Review CloudTrail and recent changes",
      inspect: [
        "AssumeRoleWithWebIdentity events where recorded",
        "Error code and message",
        "Event time",
        "AWS account and role involved",
        "IAM trust policy changes",
        "OIDC provider changes",
        "EKS cluster replacement",
        "Terraform or CloudFormation deployment",
      ],
      decision:
        "Correlate the first failing request with the last configuration change. Missing CloudTrail events do not, by themselves, prove that no request occurred.",
    },

    {
      step: 14,
      name: "Apply a targeted correction and validate",
      checklist: [
        "The exact mismatch has been identified.",
        "The correction preserves least privilege.",
        "The change has the required approval.",
        "The existing configuration has been captured.",
        "The change is applied through the source-of-truth workflow.",
        "The workload obtains the intended role credentials.",
        "The original AWS API operation succeeds.",
        "No unrelated workload has regressed.",
      ],
    },
  ],

  failureSignatureMatrix: [
    {
      symptom: "InvalidIdentityToken",
      likelyCauses: [
        "Issuer does not match the IAM provider",
        "Provider is missing or references the wrong cluster",
        "Token audience is incorrect",
        "Token is expired or otherwise invalid",
        "STS cannot validate the issuer or its keys",
      ],
      evidence: [
        "Exact EKS issuer",
        "IAM provider URL",
        "STS error message",
        "Token projection configuration",
        "Trust policy",
      ],
      fix:
        "Correct the specific provider or token configuration and verify with the affected workload.",
    },
    {
      symptom: "AccessDenied during AssumeRoleWithWebIdentity",
      likelyCauses: [
        "Wrong federated principal",
        "Wrong issuer-specific condition keys",
        "Incorrect sub claim",
        "Incorrect aud claim",
        "Role trust policy drift",
      ],
      evidence: [
        "IAM role trust policy",
        "ServiceAccount namespace and name",
        "Actual Pod configuration",
        "CloudTrail event where available",
      ],
      fix:
        "Restore the intended federated principal and exact claim conditions.",
    },
    {
      symptom: "No credentials found in the application",
      likelyCauses: [
        "ServiceAccount annotation missing",
        "Pod uses a different ServiceAccount",
        "Projected token or environment is missing",
        "SDK provider chain is incompatible",
        "Application overrides AWS credential configuration",
      ],
      evidence: [
        "ServiceAccount YAML",
        "Pod YAML",
        "Container environment names without printing secret values",
        "Application SDK version and configuration",
      ],
      fix:
        "Correct the workload identity setup or SDK configuration and perform a controlled rollout if needed.",
    },
    {
      symptom: "Assumed role is different from the expected role",
      likelyCauses: [
        "Pod uses another ServiceAccount",
        "Node instance profile credentials are being used",
        "Environment credentials override the expected provider",
        "A profile or custom credential provider is configured",
        "The application uses EKS Pod Identity instead of IRSA",
      ],
      evidence: [
        "STS caller identity from the workload",
        "ServiceAccount annotation",
        "Pod identity association",
        "SDK credential chain configuration",
      ],
      fix:
        "Correct the identity selection and confirm the actual caller ARN from the workload.",
    },
    {
      symptom: "S3 API call is AccessDenied but STS succeeds",
      likelyCauses: [
        "Role policy does not allow the action",
        "Bucket policy denies the request",
        "KMS key policy blocks decryption",
        "Organization SCP or permissions boundary applies",
        "Resource ARN or object prefix is wrong",
      ],
      evidence: [
        "Actual STS caller identity",
        "Requested API action and resource",
        "Role policies",
        "Resource policy",
        "KMS and organization-level restrictions",
      ],
      fix:
        "Correct the narrow missing permission or resource policy condition. Do not broaden permissions indiscriminately.",
    },
    {
      symptom: "Only newly deployed Pods fail",
      likelyCauses: [
        "New Deployment uses a different ServiceAccount",
        "Helm values changed",
        "Admission mutation or projected volume changed",
        "New image uses a different SDK or credential configuration",
      ],
      evidence: [
        "Old versus new Pod YAML",
        "ReplicaSet revision",
        "Helm values and rendered manifests",
        "Image digest and SDK version",
      ],
      fix:
        "Correct the new workload configuration and roll back the deployment if the change is causing a confirmed production outage.",
    },
    {
      symptom: "All clusters fail after a Terraform apply",
      likelyCauses: [
        "Shared IAM trust policy was changed",
        "Provider resource was replaced",
        "Role or condition keys were changed",
        "An account-level dependency changed",
      ],
      evidence: [
        "Terraform plan and apply logs",
        "IAM policy diff",
        "Provider URL and ARN",
        "Affected cluster issuer URLs",
      ],
      fix:
        "Stop further applies, identify the shared change, and restore the approved configuration through infrastructure as code.",
    },
  ],

  trustPolicyDiagnostics: {
    expectedShape: {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: {
            Federated: "<IAM_OIDC_PROVIDER_ARN>",
          },
          Action: "sts:AssumeRoleWithWebIdentity",
          Condition: {
            StringEquals: {
              "<ISSUER_HOSTPATH>:aud": "sts.amazonaws.com",
              "<ISSUER_HOSTPATH>:sub":
                "system:serviceaccount:<NAMESPACE>:<SERVICE_ACCOUNT>",
            },
          },
        },
      ],
    },

    explanation: [
      "The federated principal must identify the IAM OIDC provider associated with the intended cluster.",
      "The condition-key prefix uses the issuer host and path without https://.",
      "The aud condition should match the intended token audience.",
      "The sub condition should match the exact Kubernetes namespace and ServiceAccount.",
      "The example is a template, not a ready-to-apply trust policy.",
    ],

    validateBeforeApplying: [
      "Retrieve the actual EKS issuer URL.",
      "Retrieve the actual provider ARN.",
      "Verify the target IAM role name and account.",
      "Verify the namespace and ServiceAccount name.",
      "Check whether additional legitimate ServiceAccounts need access.",
      "Check whether the role is shared by workloads from multiple clusters.",
      "Review the proposed change for privilege expansion.",
      "Save the existing trust policy for controlled recovery.",
    ],

    dangerousPatterns: [
      {
        pattern: "sub: system:serviceaccount:*:*",
        risk:
          "May allow a much broader set of ServiceAccounts than intended when paired with the rest of the trust policy.",
      },
      {
        pattern: "Removing all claim conditions",
        risk:
          "Can allow unintended identities associated with the federated provider to assume the role.",
      },
      {
        pattern: "Using a provider ARN from another account",
        risk:
          "Can produce a trust relationship that does not represent the intended cluster identity.",
      },
    ],
  },

  providerMismatchInvestigation: {
    commonCauses: [
      {
        cause: "Cluster was recreated",
        explanation:
          "A replacement cluster may have a different OIDC issuer identifier, even if the cluster name is unchanged.",
        evidence:
          "Compare the current describe-cluster issuer with the provider URL and role trust policy.",
      },
      {
        cause: "Wrong AWS account",
        explanation:
          "The IAM provider was created in an account different from the one containing the target role.",
        evidence:
          "Compare AWS account IDs in the provider ARN and role ARN.",
      },
      {
        cause: "Wrong region or cluster context",
        explanation:
          "The operator retrieved the issuer for a different cluster.",
        evidence:
          "Check the AWS CLI region, cluster name, and kubectl context.",
      },
      {
        cause: "Issuer path mismatch",
        explanation:
          "The provider URL or condition-key prefix does not exactly match the issuer.",
        evidence:
          "Compare hostname and path, including the issuer identifier.",
      },
      {
        cause: "Infrastructure drift",
        explanation:
          "A manual edit or IaC deployment changed the provider or trust policy.",
        evidence:
          "Inspect Terraform state and plan, CloudFormation history, IAM changes, and audit events.",
      },
    ],

    comparisonCommands: [
      "aws eks describe-cluster --name \"$CLUSTER_NAME\" --region \"$AWS_REGION\" --query 'cluster.identity.oidc.issuer' --output text",
      "aws iam list-open-id-connect-providers",
      "aws iam get-open-id-connect-provider --open-id-connect-provider-arn \"$OIDC_PROVIDER_ARN\"",
      "aws iam get-role --role-name \"$ROLE_NAME\" --query 'Role.AssumeRolePolicyDocument' --output json",
    ],

    importantNote:
      "Do not delete an existing provider as an initial troubleshooting step. First determine whether other roles depend on it and whether the intended issuer has changed.",
  },

  serviceAccountAndPodInvestigation: {
    commands: [
      "kubectl get sa \"$SERVICE_ACCOUNT\" -n \"$NAMESPACE\" -o yaml",
      "kubectl get deployment \"$DEPLOYMENT_NAME\" -n \"$NAMESPACE\" -o yaml",
      "kubectl get pods -n \"$NAMESPACE\" -o wide",
      "kubectl describe pod \"$POD_NAME\" -n \"$NAMESPACE\"",
    ],

    verify: [
      "The Deployment template specifies the expected ServiceAccount.",
      "The ServiceAccount annotation references the intended IAM role ARN.",
      "The Pod was created after the intended configuration was applied, if a rollout was required.",
      "The token projection and environment match the expected credential mechanism.",
      "The application image contains a compatible AWS SDK.",
      "The application does not override the expected credential provider.",
    ],

    rolloutRecovery: {
      condition:
        "Use only after confirming that the Deployment or ServiceAccount configuration is incorrect and a rollout is necessary.",
      command:
        "kubectl rollout restart deployment/\"$DEPLOYMENT_NAME\" -n \"$NAMESPACE\"",
      validation: [
        "kubectl rollout status deployment/\"$DEPLOYMENT_NAME\" -n \"$NAMESPACE\"",
        "kubectl get pods -n \"$NAMESPACE\" -o wide",
        "Run the approved STS identity test from the new Pod.",
        "Run the original application API operation.",
      ],
      warning:
        "A rollout restart is not a generic fix for an incorrect IAM provider or trust policy. " +
        "Correct the underlying issue first and consider availability and disruption budgets.",
    },
  },

  stsAndNetworkInvestigation: {
    investigate: [
      "The application can resolve the configured STS endpoint.",
      "The Pod has the required outbound connectivity.",
      "NAT gateway or egress firewall rules are correct where applicable.",
      "The VPC has the intended STS interface endpoint if private endpoint access is used.",
      "Endpoint private DNS settings are correct where applicable.",
      "Proxy variables do not direct STS traffic to an invalid proxy.",
      "The AWS SDK is configured to use the expected region and endpoint.",
    ],

    symptoms: [
      {
        symptom: "Connection timeout",
        interpretation:
          "Likely network reachability, endpoint, proxy, DNS, or firewall issue; inspect the exact endpoint and network path.",
      },
      {
        symptom: "DNS resolution error",
        interpretation:
          "Investigate DNS configuration and the configured STS hostname.",
      },
      {
        symptom: "STS returns AccessDenied",
        interpretation:
          "Network connectivity is working sufficiently to receive an authorization response; investigate trust policy and token claims.",
      },
    ],

    warning:
      "A network fix should not weaken IAM trust. A trust-policy fix should not expose a private cluster endpoint.",
  },

  sdkAndCredentialChain: {
    inspect: [
      "AWS SDK language and version",
      "Whether the SDK supports web identity credentials",
      "AWS_ROLE_ARN environment variable presence",
      "AWS_WEB_IDENTITY_TOKEN_FILE path presence",
      "AWS_REGION or AWS_DEFAULT_REGION configuration",
      "AWS_PROFILE and shared credential file configuration",
      "Application-specific credential-provider overrides",
    ],

    safeTesting: [
      "Use a test command inside the actual workload or a controlled debug Pod with equivalent identity configuration.",
      "Call aws sts get-caller-identity without printing token contents.",
      "Verify that the returned ARN is the expected assumed role.",
      "Compare SDK behavior with AWS CLI behavior only when both use equivalent credential sources.",
    ],

    caution:
      "A successful AWS CLI test does not guarantee that an application SDK uses the same credential provider chain.",
  },

  infrastructureAsCode: {
    terraformChecks: [
      "Review the last Terraform plan and apply output.",
      "Inspect the aws_iam_openid_connect_provider resource URL.",
      "Inspect aws_iam_role.assume_role_policy.",
      "Check the source of the issuer URL and account ID variables.",
      "Check whether a cluster replacement caused a new issuer.",
      "Review state changes and resource replacement plans.",
    ],

    exampleCommands: [
      "terraform plan",
      "terraform state list",
      "terraform state show '<OIDC_PROVIDER_RESOURCE_ADDRESS>'",
    ],

    safety:
      "Run Terraform commands from the correct repository and workspace. " +
      "Do not apply a plan until the target account, workspace, resource changes, and approval are verified.",

    cloudFormationChecks: [
      "Review the stack's recent change sets.",
      "Inspect the OIDC provider URL property.",
      "Inspect the IAM role trust policy.",
      "Review stack events for failed updates.",
      "Confirm that shared roles and providers are not being replaced unexpectedly.",
    ],

    driftPrinciple:
      "Correct the infrastructure source of truth as well as the live configuration. " +
      "A manual fix can be overwritten by the next deployment.",
  },

  recoveryAndRollback: {
    principles: [
      "Preserve the current provider and trust policy before editing.",
      "Identify the exact mismatch before changing resources.",
      "Use the narrowest change that restores the intended identity.",
      "Use Terraform, CloudFormation, or the approved IAM change workflow as the source of truth.",
      "Validate both credential acquisition and the actual AWS API operation.",
      "Monitor unrelated workloads if a provider or shared role is involved.",
    ],

    recoveryOptions: [
      {
        option: "Correct the role trust policy",
        useWhen:
          "The issuer and provider are correct, but the federated principal or claim conditions are wrong.",
        steps: [
          "Capture the current trust policy.",
          "Compare the actual issuer host/path with the condition keys.",
          "Verify the namespace and ServiceAccount.",
          "Apply the least-privilege correction.",
          "Test STS identity from the affected workload.",
          "Test the required AWS API operation.",
        ],
      },
      {
        option: "Create the missing OIDC provider",
        useWhen:
          "The intended issuer is confirmed and the required provider does not exist in the target account.",
        steps: [
          "Confirm the target account and issuer.",
          "Check whether an equivalent provider already exists.",
          "Review roles and dependencies.",
          "Create the provider through the approved IaC workflow.",
          "Verify the provider URL and client ID configuration.",
          "Update or verify the intended role trust policy.",
        ],
        warning:
          "Use the supported provider creation procedure and validate all provider properties. Do not create duplicate or unrelated providers as a guess.",
      },
      {
        option: "Correct the ServiceAccount or Deployment",
        useWhen:
          "The workload uses the wrong ServiceAccount or role annotation.",
        steps: [
          "Identify the correct ServiceAccount and role.",
          "Update Helm values or the source manifest.",
          "Validate the rendered manifest.",
          "Deploy through the approved pipeline.",
          "Wait for the rollout.",
          "Verify the actual caller identity and workload operation.",
        ],
      },
      {
        option: "Restore a known-good infrastructure version",
        useWhen:
          "A recent IaC change is proven to have broken shared identity configuration.",
        steps: [
          "Stop further applies that could compound the issue.",
          "Identify the exact trust or provider change.",
          "Review the previous known-good configuration.",
          "Apply the approved rollback or corrective plan.",
          "Verify all affected clusters and roles.",
          "Add a regression test before resuming normal deployment.",
        ],
      },
    ],

    dangerousShortcuts: [
      {
        action: "Grant AdministratorAccess to the workload role",
        risk:
          "Masks the real issue and grants unnecessary privileges.",
      },
      {
        action: "Remove all trust-policy conditions",
        risk:
          "Can allow unintended ServiceAccounts to assume the role.",
      },
      {
        action: "Use wildcard sub claims without a reviewed need",
        risk:
          "Expands the identity boundary beyond the intended workload.",
      },
      {
        action: "Delete and recreate an OIDC provider immediately",
        risk:
          "May break other roles and workloads that depend on the existing provider.",
      },
      {
        action: "Restart every workload before correcting IAM",
        risk:
          "Causes disruption without resolving the underlying trust mismatch.",
      },
    ],
  },

  prevention: {
    deploymentPreflight: [
      "Retrieve the issuer from the actual EKS cluster.",
      "Verify that the expected IAM OIDC provider exists in the correct account.",
      "Compare the provider URL with the cluster issuer.",
      "Validate the role trust policy's federated principal.",
      "Validate aud and sub conditions.",
      "Verify ServiceAccount annotations and Deployment templates.",
      "Check whether the workload uses IRSA or EKS Pod Identity.",
      "Test STS identity in a non-production environment.",
      "Run the actual AWS API smoke test with least-privilege permissions.",
    ],

    ciChecks: [
      "Validate IAM trust policies against the cluster issuer.",
      "Detect unexpected wildcard subject conditions.",
      "Detect provider resources associated with the wrong account.",
      "Compare Terraform plan changes for role and provider replacements.",
      "Render Helm templates and verify ServiceAccount names.",
      "Fail deployments when required identity configuration is missing.",
      "Require approval for production trust-policy changes.",
    ],

    monitoring: [
      "Alert on credential-provider errors in application logs.",
      "Monitor AccessDenied and web identity failures.",
      "Correlate failures with deployments and IAM policy changes.",
      "Monitor critical workload health after role or provider changes.",
      "Track identity-related incident frequency by cluster and namespace.",
    ],
  },

  automation: {
    readOnlyPreflight: `#!/usr/bin/env bash
set -u

: "\${CLUSTER_NAME:?Set CLUSTER_NAME}"
: "\${AWS_REGION:?Set AWS_REGION}"

echo "=== Current Kubernetes context ==="
kubectl config current-context || exit 1

echo "=== Diagnostic operator identity ==="
aws sts get-caller-identity || exit 1

echo "=== EKS OIDC issuer ==="
ISSUER="$(aws eks describe-cluster \\
  --name "$CLUSTER_NAME" \\
  --region "$AWS_REGION" \\
  --query 'cluster.identity.oidc.issuer' \\
  --output text)" || exit 1

printf '%s\\n' "$ISSUER"

echo "=== Cluster status ==="
aws eks describe-cluster \\
  --name "$CLUSTER_NAME" \\
  --region "$AWS_REGION" \\
  --query 'cluster.{name:name,status:status,version:version}' \\
  --output json || exit 1

echo "=== Available IAM OIDC providers ==="
aws iam list-open-id-connect-providers || exit 1

echo "Preflight completed. No resources were changed."
`,

    limitations: [
      "The preflight does not prove that the workload can assume its intended role.",
      "It does not decode or print JWT tokens.",
      "It does not modify IAM or Kubernetes resources.",
      "IAM read permissions are required to inspect providers and trust policies.",
      "A separate in-workload identity test is required to verify the actual credential chain.",
    ],
  },

  rootCauseAnalysis: {
    method: [
      "Identify the first failing request and exact error.",
      "Determine the workload's credential mechanism.",
      "Verify the actual cluster issuer.",
      "Verify the IAM provider in the role's account.",
      "Compare the trust policy principal and conditions.",
      "Verify the actual Pod's ServiceAccount and token configuration.",
      "Test the caller identity from the workload.",
      "If STS succeeds, investigate resource permissions separately.",
      "Correlate the failure with recent IaC or deployment changes.",
      "Apply one targeted change and repeat the same test.",
    ],

    example: {
      observation:
        "A newly deployed workload receives AccessDenied during AssumeRoleWithWebIdentity.",
      evidence: [
        "The cluster issuer matches the IAM provider URL.",
        "The trust policy references the expected provider.",
        "The Deployment uses the payments namespace.",
        "The trust policy subject references a ServiceAccount from a different namespace.",
      ],
      rootCause:
        "The trust policy subject condition does not match the workload's Kubernetes identity.",
      remediation:
        "Update the trust policy through the approved infrastructure repository to authorize only the intended namespace and ServiceAccount.",
      validation:
        "Verify STS caller identity from the workload and execute the original least-privilege AWS operation.",
      prevention:
        "Add automated validation of issuer, audience, subject, and ServiceAccount configuration to CI.",
    },
  },

  incidentReportTemplate: {
    incidentId: "",
    severity: "",
    startTimeUTC: "",
    detectionTimeUTC: "",
    recoveryTimeUTC: "",
    clusterName: "",
    awsAccountId: "",
    awsRegion: "",
    oidcIssuer: "",
    oidcProviderArn: "",
    iamRoleArn: "",
    namespace: "",
    serviceAccount: "",
    workload: "",
    credentialMechanism: "IRSA",
    observedError: "",
    customerImpact: "",
    recentChanges: [],
    evidence: [],
    rootCause: "",
    remediation: "",
    rollbackPerformed: false,
    validationResults: [],
    preventionActions: [
      {
        action: "",
        owner: "",
        dueDate: "",
        status: "open",
      },
    ],
  },

  handsOnLabs: [
    {
      title: "Lab 1 — Verify the EKS OIDC issuer",
      tasks: [
        "Retrieve the issuer URL from describe-cluster.",
        "List IAM OIDC providers in the target account.",
        "Inspect the candidate provider URL.",
        "Document whether the URLs match exactly.",
      ],
      successCriteria:
        "Identify the correct provider without changing IAM resources.",
    },
    {
      title: "Lab 2 — Diagnose a subject mismatch",
      tasks: [
        "Create a non-production ServiceAccount.",
        "Inspect its namespace and name.",
        "Inspect a test role trust policy.",
        "Compare the sub condition with the expected Kubernetes identity.",
        "Correct the test policy using the approved method.",
      ],
      successCriteria:
        "Explain why namespace and ServiceAccount name are part of the identity boundary.",
    },
    {
      title: "Lab 3 — Verify the real workload identity",
      tasks: [
        "Deploy an approved test workload with a dedicated role.",
        "Call sts get-caller-identity from the workload.",
        "Confirm the returned assumed role.",
        "Execute a permitted test API call.",
      ],
      successCriteria:
        "Demonstrate both successful credential acquisition and least-privilege authorization.",
    },
    {
      title: "Lab 4 — Identify permission failure versus trust failure",
      tasks: [
        "Test a role with a valid trust relationship.",
        "Attempt an allowed API operation.",
        "Attempt an intentionally unauthorized operation in a test environment.",
        "Compare STS errors with service-level AccessDenied errors.",
      ],
      successCriteria:
        "Distinguish role-assumption failure from permissions on the assumed role.",
    },
    {
      title: "Lab 5 — Detect infrastructure drift",
      tasks: [
        "Review the IaC definition of a test provider and role.",
        "Compare the desired configuration with the deployed resources.",
        "Generate and review a Terraform plan or CloudFormation change set.",
        "Correct the test configuration through the source of truth.",
      ],
      successCriteria:
        "Show that the correction is reproducible and will not be overwritten by the next deployment.",
    },
  ],

  interviewQuestions: [
    {
      question: "What is IRSA in Amazon EKS?",
      answer:
        "IAM Roles for Service Accounts lets Kubernetes workloads obtain temporary AWS credentials through a federated OIDC identity and an IAM role.",
    },
    {
      question: "What are the three important JWT claims for IRSA troubleshooting?",
      answer:
        "The issuer (iss), audience (aud), and subject (sub). They identify the issuer, intended recipient, and Kubernetes identity.",
    },
    {
      question: "Why must the IAM OIDC provider match the EKS issuer?",
      answer:
        "The role's federated trust relationship must refer to the identity provider associated with the cluster that issued the token.",
    },
    {
      question: "What does a sub mismatch usually indicate?",
      answer:
        "The role trust policy expects a different namespace or ServiceAccount than the identity represented by the token.",
    },
    {
      question: "How do you distinguish trust failure from permission failure?",
      answer:
        "If STS cannot assume the role, investigate federation and trust. If STS succeeds but an AWS API returns AccessDenied, inspect role permissions and resource-level controls.",
    },
    {
      question: "Why is aws sts get-caller-identity on a laptop insufficient?",
      answer:
        "It reports the laptop's current credential identity, not the identity used by the application Pod.",
    },
    {
      question: "Can an EKS cluster recreation break IRSA?",
      answer:
        "It can, if the replacement cluster has a different issuer and the IAM provider or trust policies still refer to the old issuer.",
    },
    {
      question: "How is EKS Pod Identity different from IRSA?",
      answer:
        "It uses a different association and credential-delivery mechanism, so the relevant configuration and diagnostic path differ.",
    },
    {
      question: "Why should trust policies avoid broad wildcard subjects?",
      answer:
        "They can expand which Kubernetes identities may assume a role beyond the intended workload.",
    },
    {
      question: "What must be validated after remediation?",
      answer:
        "The expected role identity from the workload, the original AWS API operation, application health, and the absence of regressions.",
    },
  ],

  completionChecklist: [
    "Correct cluster, AWS account, and region confirmed",
    "Exact application error captured",
    "Credential mechanism identified",
    "EKS OIDC issuer retrieved from AWS",
    "IAM provider account and URL verified",
    "IAM role trust policy inspected",
    "aud condition validated",
    "sub condition validated",
    "Running Pod ServiceAccount verified",
    "SDK credential-provider configuration reviewed",
    "STS identity tested from the workload",
    "Permission failures separated from trust failures",
    "Network and DNS failures considered",
    "Recent IAM and IaC changes reviewed",
    "Targeted approved correction applied",
    "Original AWS API operation verified",
    "Monitoring returned to baseline",
    "Incident report and prevention actions recorded",
  ],

  references: [
    {
      title: "AWS — Configure a Kubernetes ServiceAccount to assume an IAM role",
      url: "https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html",
      purpose:
        "IRSA configuration, ServiceAccount annotation, and role association.",
    },
    {
      title: "AWS — Create an IAM OIDC provider for your cluster",
      url: "https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html",
      purpose:
        "Cluster OIDC provider prerequisites and identity configuration.",
    },
    {
      title: "AWS — EKS Pod Identity",
      url: "https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html",
      purpose:
        "Understand the alternative EKS Pod Identity mechanism.",
    },
    {
      title: "AWS — IAM roles and policies",
      url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html",
      purpose:
        "Role trust relationships and permissions.",
    },
    {
      title: "AWS STS — AssumeRoleWithWebIdentity",
      url: "https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRoleWithWebIdentity.html",
      purpose:
        "STS web identity exchange API and error information.",
    },
    {
      title: "AWS — Troubleshoot IAM",
      url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot.html",
      purpose:
        "IAM authorization and access troubleshooting.",
    },
  ],
} as const;

export default oidcProviderMismatchGuide;
