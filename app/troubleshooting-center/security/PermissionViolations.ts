
export const permissionViolationsGuide = {
  id: "security-permission-violations",
  title: "Permission Violations",
  category: "security",
  difficulty: "advanced",
  estimatedTime: "60-120 minutes",
  summary:
    "Diagnose production authorization failures across Kubernetes RBAC, cloud IAM, CI/CD identities, filesystem permissions, secrets, and admission policies without granting excessive privileges.",

  incidentScenario: {
    title: "Production deployment suddenly fails with Forbidden / AccessDenied",
    description:
      "A deployment pipeline that worked previously now fails while applying Kubernetes resources or accessing a cloud API. The application may still be serving traffic, but new releases, scaling, secret retrieval, or automated recovery can be blocked.",
    symptoms: [
      "kubectl apply returns Forbidden.",
      "Cloud API calls return AccessDenied or an authorization error.",
      "CI/CD can build an artifact but cannot deploy it.",
      "A workload cannot access an expected secret or mounted file.",
      "A service account can read resources but cannot update them.",
      "A policy engine rejects an otherwise authorized deployment.",
      "A previously successful identity suddenly loses access after a policy change.",
      "Unexpectedly broad permissions or an unknown privileged identity are discovered.",
    ],
    businessImpact: [
      "Deployment delays or failed releases.",
      "Potential application degradation if a required dependency becomes inaccessible.",
      "Risk of unauthorized access if permissions were broadened incorrectly.",
      "Compliance violations or audit findings.",
      "Potential security incident if credentials or privileged identities are compromised.",
    ],
    firstPrinciple:
      "A permission error proves that an operation was denied. It does not, by itself, prove that RBAC is the cause or that administrator privileges are needed.",
  },

  severityAndImpact: [
    {
      severity: "SEV-1",
      conditions: [
        "Confirmed credential compromise or unauthorized privileged access.",
        "Critical production outage caused by a shared identity or policy failure.",
        "Sensitive data exposure or an active privilege-escalation incident.",
      ],
      actions: [
        "Activate the security incident response process.",
        "Assign an incident commander and security owner.",
        "Preserve audit evidence and establish a UTC timeline.",
        "Contain confirmed compromised identities using the approved incident procedure.",
        "Avoid destructive cleanup until required forensic evidence is preserved.",
      ],
    },
    {
      severity: "SEV-2",
      conditions: [
        "Critical production deployment is blocked.",
        "A shared IAM, identity-provider, or authorization change affects multiple services.",
        "Production recovery is blocked by an access-control failure.",
      ],
      actions: [
        "Freeze unrelated access-control changes.",
        "Identify affected accounts, clusters, workloads, and deployment pipelines.",
        "Coordinate the smallest approved corrective change.",
      ],
    },
    {
      severity: "SEV-3",
      conditions: [
        "One noncritical application, namespace, or development workflow is affected.",
      ],
      actions: [
        "Collect evidence and reproduce in a safe environment.",
        "Correct the specific permission or identity mismatch.",
        "Add a regression test to prevent recurrence.",
      ],
    },
  ],

  safetyChecks: [
    "Confirm the correct cloud account, subscription/project, cluster, namespace, repository, and environment.",
    "Identify the exact principal making the denied request.",
    "Distinguish a human identity from a CI runner, workload identity, service account, and application identity.",
    "Record the exact denied action before changing permissions.",
    "Use read-only diagnostics before attempting a production fix.",
    "Check for active credential compromise before treating the issue as an ordinary misconfiguration.",
    "Obtain the required security and production approvals.",
    "Never grant cluster-admin, administrator, Owner, or wildcard access merely to make the error disappear.",
    "Never print bearer tokens, private keys, kubeconfigs, passwords, or secret values into pipeline logs.",
    "Preserve relevant audit logs, timestamps, request IDs, and the last known-good configuration.",
    "Do not revoke every credential indiscriminately if doing so could worsen an outage; coordinate containment based on the incident scope.",
  ],

  evidenceCollection: {
    timeline: [
      "Incident start time in UTC.",
      "First failed request and most recent failed request.",
      "Last known successful deployment or API call.",
      "Commit SHA, pull request, pipeline run, and actor.",
      "Identity-provider, IAM, RBAC, policy, or infrastructure changes around the failure time.",
    ],
    technicalEvidence: [
      "Exact error message and HTTP status.",
      "Request/correlation ID and provider-specific error code.",
      "Principal, role/session, tenant/account/project, and target resource.",
      "Requested action, resource scope, and namespace.",
      "Relevant Kubernetes audit events or cloud audit logs.",
      "Current role/binding/policy metadata and reviewed Git diff.",
      "Runner identity, token audience, issuer, expiry metadata, and authentication method where applicable.",
      "Whether the same operation succeeds under the intended identity in a controlled test.",
    ],
    redactBeforeSharing: [
      "Authorization headers and bearer tokens.",
      "Cloud access keys and session credentials.",
      "Secret values and private keys.",
      "Sensitive personal or customer data.",
      "Full environment dumps that might contain credentials.",
    ],
  },

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm the target environment",
      purpose:
        "Prevent troubleshooting or modifying the wrong cluster, account, repository, or production environment.",
      commands: [
        "kubectl config current-context",
        "kubectl version --client",
        "git rev-parse --show-toplevel",
        "git rev-parse HEAD",
      ],
      inspect: [
        "Expected cluster and context.",
        "Expected namespace and deployment target.",
        "Repository root and current commit.",
        "Pipeline environment and approved release revision.",
      ],
      decisionBranches: [
        {
          condition: "Context or target is incorrect",
          action:
            "Stop. Select the approved target through the normal deployment process and repeat the read-only checks.",
        },
        {
          condition: "Target is correct",
          action:
            "Continue by identifying the principal that actually made the denied request.",
        },
      ],
    },
    {
      step: 2,
      title: "Classify authentication versus authorization",
      purpose:
        "Separate invalid identity or token problems from a genuine permission denial.",
      inspect: [
        "401 or invalid-token errors often indicate authentication problems.",
        "403 or Forbidden often indicates authorization denial, but provider-specific semantics must be checked.",
        "Expired tokens, wrong audience, invalid issuer, clock skew, or an incorrect endpoint can appear as access failures.",
        "A successful login does not prove permission to perform the requested operation.",
      ],
      decisionBranches: [
        {
          condition: "Identity cannot be authenticated",
          action:
            "Inspect issuer, audience, expiry, trust relationship, endpoint, and identity-provider logs without exposing credentials.",
        },
        {
          condition: "Identity is authenticated but operation is denied",
          action:
            "Record the exact principal, action, resource, and scope; then inspect effective authorization.",
        },
        {
          condition: "Error does not clearly distinguish the cause",
          action:
            "Use provider request IDs and audit logs instead of guessing from the HTTP status alone.",
        },
      ],
    },
    {
      step: 3,
      title: "Identify the effective principal",
      purpose:
        "Confirm which user, role, service account, or workload identity is actually being used.",
      kubernetesCommands: [
        "kubectl auth whoami",
        "kubectl get serviceaccounts -n production",
        "kubectl get pods -n production -o wide",
      ],
      notes: [
        "kubectl auth whoami depends on client/server support and the current authentication setup.",
        "A local administrator's identity is not equivalent to the identity used by a CI runner.",
        "A Kubernetes service account and a cloud IAM role are different identity systems, even when workload identity connects them.",
        "Do not dump complete credential files or all environment variables to identify a principal.",
      ],
      decisionBranches: [
        {
          condition: "The principal is unexpected",
          action:
            "Investigate kubeconfig selection, CI credential configuration, OIDC claims, role assumption, and recent identity changes.",
        },
        {
          condition: "The principal is expected",
          action:
            "Proceed to the exact denied permission and resource scope.",
        },
      ],
    },
    {
      step: 4,
      title: "Build the denied-operation tuple",
      purpose:
        "Reduce the issue to a concrete, testable authorization request.",
      fields: [
        "Principal: which identity made the request?",
        "Action: which verb or API permission was requested?",
        "Resource: which API group, resource, object, or cloud resource?",
        "Scope: which namespace, account, project, subscription, or resource hierarchy?",
        "Context: which environment, region, runner, and timestamp?",
      ],
      example:
        "CI deployment identity -> patch -> apps/deployments -> production namespace -> request timestamp in UTC.",
      decisionBranches: [
        {
          condition: "The denied action or resource is unknown",
          action:
            "Retrieve the complete redacted error and corresponding audit event before editing any policy.",
        },
        {
          condition: "The tuple is known",
          action:
            "Test the exact operation with the affected identity where safe and supported.",
        },
      ],
    },
    {
      step: 5,
      title: "Test Kubernetes effective permissions",
      purpose:
        "Determine whether Kubernetes authorization permits the exact requested operation.",
      commands: [
        "kubectl auth can-i get deployments -n production",
        "kubectl auth can-i patch deployments -n production",
        "kubectl auth can-i list pods -n production",
        "kubectl auth can-i --list -n production",
      ],
      notes: [
        "Run the check as the affected identity whenever possible.",
        "A result from a different administrator account does not establish the CI identity's access.",
        "The check answers an authorization question; it does not guarantee that admission, validation, quotas, or the actual API operation will succeed.",
        "Avoid secret-reading tests unless explicitly approved and necessary.",
      ],
      decisionBranches: [
        {
          condition: "can-i returns no",
          action:
            "Inspect the applicable Role, ClusterRole, RoleBinding, ClusterRoleBinding, group mapping, and service-account identity.",
        },
        {
          condition: "can-i returns yes but the real operation fails",
          action:
            "Inspect admission policy, API validation, resource scope, audit logs, webhook errors, and whether the actual request used the same identity.",
        },
        {
          condition: "The result is unknown or the check itself is denied",
          action:
            "Record the limitation and use approved audit evidence or an authorized administrator to inspect the effective policy.",
        },
      ],
    },
    {
      step: 6,
      title: "Inspect Kubernetes RBAC bindings",
      purpose:
        "Identify missing or mismatched subjects, namespaces, verbs, resources, and role references.",
      readOnlyCommands: [
        "kubectl get rolebindings -n production",
        "kubectl get roles -n production",
        "kubectl get clusterrolebindings",
        "kubectl get clusterroles",
      ],
      inspect: [
        "Does the subject match the actual user, group, or service account?",
        "Does the service account belong to the expected namespace?",
        "Does the referenced role contain the required API group, resource, and verb?",
        "Is the requested operation namespaced or cluster-scoped?",
        "Does the RoleBinding refer to the intended Role or ClusterRole?",
        "Was a binding recently deleted, renamed, or changed by GitOps?",
      ],
      decisionBranches: [
        {
          condition: "The RoleBinding points to the wrong subject or role",
          action:
            "Propose a narrowly scoped correction in the approved source of truth and review the diff.",
        },
        {
          condition: "A namespace-scoped permission is missing",
          action:
            "Prefer a namespace-scoped Role and RoleBinding if they satisfy the actual requirement.",
        },
        {
          condition: "A cluster-scoped API operation is required",
          action:
            "Confirm the requirement and obtain security approval before adding a cluster-scoped permission.",
        },
      ],
      criticalNotes: [
        "A Role is namespace-scoped.",
        "A ClusterRole can be referenced by a RoleBinding to grant its permissions within that RoleBinding's namespace.",
        "A ClusterRoleBinding grants the referenced permissions at cluster scope; it is not automatically required for every deployment.",
      ],
    },
    {
      step: 7,
      title: "Check service-account and workload identity",
      purpose:
        "Diagnose workloads that authenticate successfully but use the wrong Kubernetes or cloud identity.",
      inspect: [
        "Pod spec.serviceAccountName.",
        "Pod namespace and service-account namespace.",
        "Projected token audience and expiry configuration where relevant.",
        "Cloud workload-identity annotations or labels, if the platform uses them.",
        "OIDC issuer, subject conditions, federated credential, and trust relationship.",
        "Recent workload template or service-account changes.",
      ],
      commands: [
        "kubectl get pod <pod-name> -n production -o yaml",
        "kubectl describe pod <pod-name> -n production",
        "kubectl get serviceaccount <service-account-name> -n production -o yaml",
      ],
      decisionBranches: [
        {
          condition: "The workload uses the wrong service account",
          action:
            "Correct the workload template in the approved source repository and redeploy through the normal pipeline.",
        },
        {
          condition: "The Kubernetes identity is correct but cloud access fails",
          action:
            "Inspect the cloud role, trust relationship, token audience, and cloud audit event.",
        },
        {
          condition: "The token is invalid or expired",
          action:
            "Follow the platform's supported token renewal or identity configuration procedure; do not expose token contents.",
        },
      ],
    },
    {
      step: 8,
      title: "Investigate cloud IAM denials",
      purpose:
        "Find the effective role and the specific denied cloud API action.",
      awsChecks: [
        "Verify the account and role/session used by the failing process.",
        "Inspect the denied action and resource in CloudTrail or the applicable audit event.",
        "Check identity policies, resource policies, trust policies, permissions boundaries, session policies, and explicit denies where relevant.",
        "Check organization-level controls and service-specific conditions.",
      ],
      azureChecks: [
        "Verify tenant, subscription, principal, managed identity, or workload identity.",
        "Inspect role assignments at the relevant scope.",
        "Check deny assignments, policy restrictions, federated credentials, and audit activity where applicable.",
      ],
      gcpChecks: [
        "Verify project, service account, and active principal.",
        "Inspect the denied permission and target resource.",
        "Check IAM bindings, inherited policy, service-account impersonation, organization policy, and relevant audit logs.",
      ],
      decisionBranches: [
        {
          condition: "The process assumed the wrong role or identity",
          action:
            "Correct the approved role-assumption or workload-identity configuration.",
        },
        {
          condition: "The intended principal lacks one required action",
          action:
            "Request the minimum action on the narrowest valid resource scope.",
        },
        {
          condition: "An explicit deny or organization-level restriction applies",
          action:
            "Resolve the governing policy with its owner; do not attempt to bypass the restriction with a broader identity.",
        },
      ],
    },
    {
      step: 9,
      title: "Separate RBAC failures from admission and policy failures",
      purpose:
        "Determine whether the API accepted authorization but rejected the requested object for security or validation reasons.",
      commands: [
        "kubectl get events -n production --sort-by=.lastTimestamp",
        "kubectl describe <resource-kind> <resource-name> -n production",
        "kubectl get validatingwebhookconfigurations",
      ],
      inspect: [
        "Pod Security Admission labels and enforcement level.",
        "OPA Gatekeeper or Kyverno policy violations.",
        "Validating or mutating webhook availability and error messages.",
        "Resource quota, LimitRange, schema, required labels, and securityContext.",
        "Webhook timeout versus an explicit policy rejection.",
      ],
      decisionBranches: [
        {
          condition: "A policy explicitly rejects the object",
          action:
            "Correct the manifest or request a documented, approved exception.",
        },
        {
          condition: "A webhook times out or is unavailable",
          action:
            "Investigate webhook service health, endpoints, certificates, and network connectivity.",
        },
        {
          condition: "The object violates quota or schema",
          action:
            "Correct the resource request or manifest according to the applicable policy and API schema.",
        },
      ],
      safety:
        "Do not disable admission, Pod Security, TLS validation, or policy enforcement as a shortcut to a successful deployment.",
    },
    {
      step: 10,
      title: "Investigate filesystem and secret access",
      purpose:
        "Distinguish operating-system file permissions and mount configuration from API authorization.",
      inspect: [
        "Process UID and GID.",
        "File owner, group, mode, and parent-directory permissions.",
        "Container securityContext and read-only root filesystem.",
        "Volume mount path and read-only mount settings.",
        "Secret/config reference, volume projection, and file existence.",
        "SELinux or AppArmor restrictions where applicable.",
      ],
      commands: [
        "kubectl exec -n production <pod-name> -- id",
        "kubectl exec -n production <pod-name> -- sh -c 'id; pwd; ls -ld <path>'",
      ],
      decisionBranches: [
        {
          condition: "The process UID/GID cannot access the file",
          action:
            "Correct ownership, group membership, mount configuration, or application access pattern using the approved least-privilege design.",
        },
        {
          condition: "The container has no shell or exec access is prohibited",
          action:
            "Use approved debug tooling, image metadata, or runtime diagnostics instead of weakening production security.",
        },
        {
          condition: "The problem concerns a secret value",
          action:
            "Verify authorized access and reference configuration without printing the secret itself.",
        },
      ],
      safety:
        "Do not use chmod 777, privileged containers, or disabled security profiles as a generic fix.",
    },
    {
      step: 11,
      title: "Inspect CI/CD and repository permissions",
      purpose:
        "Resolve failures that occur only in GitHub Actions or another deployment runner.",
      inspect: [
        "Repository and environment permissions.",
        "Workflow token permissions and organization/repository policy.",
        "OIDC trust conditions and intended cloud role.",
        "Protected environments, required reviewers, and deployment branch restrictions.",
        "Runner identity, network route, clock, and credential expiry.",
        "Whether the failing action is attempting to read, write, publish, or deploy.",
      ],
      decisions: [
        "If the pipeline token is read-only but a write is required, request only the specific supported permission.",
        "If OIDC role assumption fails, compare the expected issuer, audience, repository, branch, and subject claims.",
        "If local works but CI fails, compare effective identities rather than copying a developer's credentials into the runner.",
        "If the environment requires approval, follow the approval process instead of bypassing protection.",
      ],
      exampleWorkflowPermissions: {
        description:
          "Illustrative GitHub Actions permissions block. Select only the permissions required by the actual workflow and action versions.",
        yaml: `permissions:
  contents: read
  # Add id-token: write only when the workflow
  # must request an OIDC token for a trusted identity.
  # Add other permissions only for documented requirements.`,
        warning:
          "This example is not a complete deployment workflow. The required permissions depend on checkout, artifact, package, security-scan, and deployment steps.",
      },
    },
    {
      step: 12,
      title: "Correlate audit logs and change history",
      purpose:
        "Establish why the denial began and whether it is a configuration incident or a security event.",
      inspect: [
        "Kubernetes audit user, verb, objectRef, responseStatus, and timestamp.",
        "Cloud audit principal, denied action, target resource, and request ID.",
        "Git diff, pull request approval, and infrastructure-as-code change.",
        "Identity-provider group synchronization and membership changes.",
        "Credential issuance, revocation, expiry, and trust-policy updates.",
      ],
      decisionBranches: [
        {
          condition: "Failure started immediately after a permission change",
          action:
            "Compare the previous and current effective policy and identify the exact rule responsible.",
        },
        {
          condition: "Many unrelated workloads fail together",
          action:
            "Investigate shared identity-provider, role, organization policy, or control-plane changes.",
        },
        {
          condition: "Unexpected privileged activity is observed",
          action:
            "Treat it as a potential security incident and follow evidence-preservation and containment procedures.",
        },
      ],
    },
    {
      step: 13,
      title: "Isolate the root cause with controlled comparisons",
      comparisons: [
        "Affected identity versus approved known-good identity.",
        "Affected namespace versus a comparable namespace.",
        "Failing runner versus another runner with the intended role.",
        "Last known-good policy versus current policy.",
        "Expected permission versus the exact denied action.",
        "Kubernetes authorization result versus admission/API result.",
      ],
      rules: [
        "Change one variable at a time where practical.",
        "Use a disposable environment for reproduction when possible.",
        "Do not use a privileged identity to conceal a broken production permission model.",
        "Record evidence that rules out competing explanations.",
      ],
    },
    {
      step: 14,
      title: "Apply the smallest approved fix",
      actions: [
        "Document the exact principal, denied action, resource, scope, and evidence.",
        "Prepare a minimal policy, binding, trust-condition, or workload configuration change.",
        "Review the diff and required approvals.",
        "Apply through version-controlled IaC or the approved identity-management workflow.",
        "Repeat the exact authorization test.",
        "Run a controlled deployment or low-impact operation.",
        "Verify workload health and ensure no unrelated access was added.",
      ],
      decisionBranches: [
        {
          condition: "The minimal change resolves the denied operation",
          action:
            "Proceed with post-recovery validation and regression prevention.",
        },
        {
          condition: "The same error remains",
          action:
            "Re-check the actual principal and audit event; do not stack broader permissions onto an unverified diagnosis.",
        },
        {
          condition: "The change causes wider access or unexpected impact",
          action:
            "Use the approved rollback procedure, verify effective permissions, and escalate if exposure occurred.",
        },
      ],
    },
  ],

  leastPrivilegeExample: {
    title: "Example: allow a deployment identity to manage Deployments in one namespace",
    description:
      "This Kubernetes manifest is illustrative. It intentionally does not grant Secret access, Pod deletion, or cluster-wide permissions.",
    yaml: `apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: deployment-operator
  namespace: production
rules:
  - apiGroups: ["apps"]
    resources: ["deployments"]
    verbs: ["get", "list", "watch", "patch", "update"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: deployment-operator-binding
  namespace: production
subjects:
  - kind: ServiceAccount
    name: deployment-runner
    namespace: production
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: deployment-operator`,
    validation: [
      "Confirm the actual workload identity and namespace.",
      "Confirm the required verbs from the deployment operation.",
      "Review whether additional resources are genuinely required.",
      "Validate the manifest and review the diff before applying.",
      "Test allowed operations and verify unrelated operations remain denied.",
    ],
    cautions: [
      "The example does not automatically cover Services, Ingresses, ConfigMaps, Jobs, custom resources, or cluster-scoped resources.",
      "Do not add create/delete verbs unless the workflow actually needs them.",
      "If GitOps manages this binding, update its source of truth instead of making an unmanaged live-only change.",
    ],
  },

  rootCauseMatrix: [
    {
      symptom: "Kubernetes Forbidden",
      likelyCauses: [
        "Missing verb/resource rule",
        "Wrong namespace",
        "Wrong subject or group",
        "Wrong cluster identity",
      ],
      evidence:
        "Exact API error, effective identity, can-i result, matching bindings, and audit event.",
      fix:
        "Correct the specific binding or target configuration using least privilege.",
    },
    {
      symptom: "Cloud AccessDenied",
      likelyCauses: [
        "Missing action",
        "Wrong role or resource scope",
        "Explicit deny",
        "Trust policy or permission boundary",
      ],
      evidence:
        "Provider request ID, audit event, assumed principal, and effective policy evaluation.",
      fix:
        "Correct the intended role, trust relationship, or narrow permission with approval.",
    },
    {
      symptom: "Works locally but fails in CI",
      likelyCauses: [
        "Different principal",
        "Token expiry or audience mismatch",
        "Protected environment approval",
        "Different context or target",
      ],
      evidence:
        "Redacted workflow logs, principal metadata, OIDC configuration, and target context.",
      fix:
        "Correct the runner identity or workflow permissions instead of copying personal credentials.",
    },
    {
      symptom: "can-i says yes but API operation fails",
      likelyCauses: [
        "Admission policy",
        "Schema validation",
        "Quota",
        "Webhook failure",
        "Different identity used by actual request",
      ],
      evidence:
        "Full API error, resource events, audit logs, and actual caller identity.",
      fix:
        "Address the failing policy or request validation rather than broadening RBAC blindly.",
    },
    {
      symptom: "Permission denied on a mounted file",
      likelyCauses: [
        "UID/GID mismatch",
        "Wrong path",
        "Read-only mount",
        "SELinux/AppArmor restriction",
      ],
      evidence:
        "Process identity, mount metadata, file ownership, and runtime logs.",
      fix:
        "Correct the least-privilege ownership, mount, or security-context configuration.",
    },
    {
      symptom: "Multiple workloads lose access simultaneously",
      likelyCauses: [
        "Identity-provider outage",
        "Group sync issue",
        "Shared role or policy change",
        "Credential rotation",
      ],
      evidence:
        "Cross-service timestamps, identity logs, audit events, and change history.",
      fix:
        "Recover the shared identity/policy dependency with the owner and validate the affected scope.",
    },
    {
      symptom: "Unexpected administrator access is found",
      likelyCauses: [
        "Overly broad binding",
        "Role assumption misconfiguration",
        "Stale privileged identity",
        "Compromised credentials",
      ],
      evidence:
        "Audit logs, effective permissions, identity ownership, and change history.",
      fix:
        "Assess whether this is an active incident; preserve evidence and follow the approved containment process.",
    },
  ],

  safeRecovery: {
    ordinaryMisconfiguration: [
      "Confirm the root cause with an exact denied request and supporting evidence.",
      "Prepare the smallest approved change.",
      "Review blast radius and rollback instructions.",
      "Apply through the source of truth.",
      "Verify the intended operation succeeds.",
      "Verify unrelated sensitive operations remain denied.",
      "Check application health and close the incident only after validation.",
    ],
    suspectedCompromise: [
      "Activate the organization's security incident response process.",
      "Preserve relevant audit logs and identity evidence.",
      "Contain or revoke confirmed compromised credentials using the approved procedure.",
      "Assess persistence, privilege escalation, and affected resources.",
      "Rotate dependent credentials where necessary and coordinate service owners.",
      "Validate that access has been removed and legitimate workloads have recovered.",
    ],
    neverDo: [
      "Do not grant administrator access as a temporary universal fix.",
      "Do not add wildcard permissions without a justified, approved requirement.",
      "Do not disable TLS verification or admission policy to bypass the error.",
      "Do not print credentials or secret values while debugging.",
      "Do not delete audit evidence.",
      "Do not assume a successful login means the requested action is authorized.",
      "Do not assume a denied operation proves a credential has been compromised.",
    ],
  },

  prevention: [
    "Keep Kubernetes RBAC and cloud IAM policies in reviewed version control.",
    "Prefer namespace-scoped and resource-scoped permissions where appropriate.",
    "Use short-lived workload identity instead of static credentials where supported.",
    "Restrict CI token permissions to the workflow's documented needs.",
    "Use protected environments and required reviewers for production changes.",
    "Test both allowed and denied actions in CI.",
    "Validate RBAC manifests and cloud policy changes before deployment.",
    "Alert on unexpected privileged grants, policy changes, and repeated authorization failures.",
    "Review service-account usage and remove stale bindings.",
    "Separate deployer, approver, auditor, and break-glass roles.",
    "Document emergency access, ownership, approval, and rollback processes.",
    "Review access periodically and after team, project, or service ownership changes.",
    "Maintain an incident runbook with provider-specific audit-log locations.",
  ],

  postRecoveryValidation: [
    "The correct principal is being used.",
    "The exact intended operation now succeeds.",
    "Unrelated or sensitive operations remain denied.",
    "No wildcard or administrator permissions were added unnecessarily.",
    "Production deployment or workload operation completes successfully.",
    "Application health, logs, and relevant SLOs are back to normal.",
    "Audit events show the expected principal and action.",
    "The source-of-truth repository reflects the approved change.",
    "No unexplained privilege grants or suspicious activity remain.",
    "The incident report and preventive actions are assigned.",
  ],

  incidentReportTemplate: [
    "Incident ID, severity, owner, and UTC timeline",
    "Affected account, cluster, namespace, repository, application, and environment",
    "Exact denied operation and effective principal",
    "Error code, request ID, and relevant audit-event references",
    "Recent policy, identity, and infrastructure changes",
    "Evidence-supported root cause and contributing factors",
    "Approved fix and source-control change reference",
    "Validation results and remaining risk",
    "Security review outcome, if applicable",
    "Preventive actions, owners, and due dates",
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Kubernetes RoleBinding mismatch",
      tasks: [
        "Create a disposable namespace and service account.",
        "Bind a Role to a different subject than the test identity.",
        "Use can-i and binding inspection to find the mismatch.",
        "Correct the binding and test allowed and denied actions.",
      ],
    },
    {
      title: "Lab 2 — Missing Kubernetes verb",
      tasks: [
        "Allow get but omit patch in a test Role.",
        "Reproduce the authorization denial.",
        "Use the exact denied verb to design the minimum correction.",
      ],
    },
    {
      title: "Lab 3 — CI-only identity failure",
      tasks: [
        "Compare a local identity with a test runner identity.",
        "Inspect principal and token metadata without exposing credentials.",
        "Identify a trust-condition or scope mismatch.",
      ],
    },
    {
      title: "Lab 4 — Admission versus RBAC",
      tasks: [
        "Use a disposable cluster with a test admission policy.",
        "Compare authorization checks with an actual rejected request.",
        "Identify the policy rejection from the API error and events.",
      ],
    },
    {
      title: "Lab 5 — Least-privilege regression tests",
      tasks: [
        "Define required deployment operations.",
        "Write a namespace-scoped Role and RoleBinding.",
        "Test required actions and confirm unrelated sensitive actions remain denied.",
      ],
    },
    {
      title: "Lab 6 — Audit timeline",
      tasks: [
        "Collect synthetic or sanitized audit events.",
        "Correlate the denial with a test policy change.",
        "Write a concise incident timeline and corrective-action report.",
      ],
    },
  ],

  interviewQuestions: [
    {
      question: "401 and 403 madhya difference enti?",
      answer:
        "401 generally indicates authentication is missing or invalid; 403 generally indicates access is denied. Exact semantics depend on the API and provider.",
    },
    {
      question: "Role and ClusterRole difference enti?",
      answer:
        "Role is namespace-scoped. ClusterRole defines cluster-level rules and can also be referenced by a RoleBinding to grant those rules within that binding's namespace.",
    },
    {
      question: "can-i yes ani cheppina deployment enduku fail avvachu?",
      answer:
        "Admission policies, schema validation, quotas, webhooks, resource conflicts, or a different identity used by the real request can still cause failure.",
    },
    {
      question: "Local lo work ayyi CI lo fail aithe first em check chesthav?",
      answer:
        "Compare the actual principal, target context, token audience/expiry, trust conditions, workflow permissions, and audit logs.",
    },
    {
      question: "Immediate ga cluster-admin ivvacha?",
      answer:
        "No. Find the exact denied operation, identify the effective principal, and grant only the approved minimum permission.",
    },
    {
      question: "Permission denied ante credential compromise aa?",
      answer:
        "Not necessarily. It may be a normal policy/configuration error. Check audit evidence and identity history for indicators of compromise.",
    },
    {
      question: "Kubernetes RBAC and cloud IAM same aa?",
      answer:
        "No. Kubernetes RBAC controls Kubernetes API actions. Cloud IAM controls cloud resource/API access. Workload identity may connect the two systems, but each authorization boundary must be diagnosed separately.",
    },
    {
      question: "Least privilege ela prove chesthav?",
      answer:
        "Test required operations as the intended identity and verify that unrelated sensitive operations remain denied.",
    },
  ],

  completionChecklist: [
    "Correct production target confirmed",
    "Impact and severity assessed",
    "Exact principal and denied action recorded",
    "Authentication and authorization distinguished",
    "Relevant RBAC/IAM/policy layer identified",
    "Audit evidence collected and secrets redacted",
    "Root cause supported by evidence",
    "Smallest approved fix applied",
    "Expected access succeeds and unrelated access remains denied",
    "Workload health and security posture verified",
    "Incident report and preventive actions completed",
  ],

  references: [
    {
      title: "Kubernetes RBAC authorization",
      url: "https://kubernetes.io/docs/reference/access-authn-authz/rbac/",
    },
    {
      title: "Kubernetes authorization",
      url: "https://kubernetes.io/docs/reference/access-authn-authz/authorization/",
    },
    {
      title: "Kubernetes service accounts",
      url: "https://kubernetes.io/docs/concepts/security/service-accounts/",
    },
    {
      title: "Kubernetes Pod Security Admission",
      url: "https://kubernetes.io/docs/concepts/security/pod-security-admission/",
    },
    {
      title: "AWS IAM troubleshooting access denied",
      url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_access-denied.html",
    },
    {
      title: "GitHub Actions token authentication and permissions",
      url: "https://docs.github.com/en/actions/security-for-github-actions/security-guides/automatic-token-authentication",
    },
    {
      title: "OWASP DevSecOps Guideline",
      url: "https://owasp.org/www-project-devsecops-guideline/",
    },
  ],
} as const;

export default permissionViolationsGuide;
