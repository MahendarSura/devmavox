export interface SecretMissingGuide {
  title: string;
  category: string;
  severity: string;
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
    interpretOutput: string[];
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
    actions: string[];
    validation: string[];
    rollbackDecision: string;
  }[];
  advancedScenarios: {
    title: string;
    symptoms: string[];
    investigation: string[];
    resolution: string[];
  }[];
  prevention: string[];
  monitoring: string[];
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
  officialReferences: string[];
}

export const secretMissingGuide: SecretMissingGuide = {
  title: "GitHub Actions Secret Missing — Production Troubleshooting",
  category: "GitHub Actions / Secrets Management / CI/CD Security",
  severity: "SEV-1 to SEV-3 depending on credential exposure and deployment impact",

  overview: `
A missing GitHub Actions secret can cause authentication failures,
dependency downloads to fail, deployments to stop, cloud access to fail,
or a workflow to receive an empty value.

A secret can be unavailable because it is stored at the wrong scope,
the workflow references the wrong name, the secret is not authorized
for the selected environment, the run originates from a forked PR,
the workflow is triggered by Dependabot, or the organization restricts
secret access.

A secret can also exist but be invalid, expired, revoked, incorrectly
formatted, or associated with the wrong account or cloud environment.

Important distinctions:
- Missing secret: the expected value is unavailable to the workflow.
- Empty secret: the expression resolves to an empty value or a value is
  explicitly configured as empty.
- Invalid credential: a value is present but authentication rejects it.
- Insufficient permissions: authentication succeeds but the operation
  is not authorized.
- Environment protection block: the job has not received access to
  environment-scoped secrets because required approvals or conditions
  are not satisfied.
- OIDC failure: the workflow cannot obtain or exchange a federated
  identity token; this does not necessarily involve a stored secret.

Never print a secret to prove it exists. Verify availability through
safe metadata checks and validate it by performing the intended
authentication operation without logging the credential.
`,

  incidentScenario: `
Production incident:

A GitHub Actions workflow deploys the payment API to AWS. The latest
release fails at the cloud authentication step with an error indicating
that the expected credential is missing.

The same workflow succeeded yesterday. The team recently moved the
credential from repository settings to an environment called production.
The deployment job references the production environment, but a different
workflow job attempts authentication before environment approval.

A developer suggests printing all environment variables to locate the
secret. This would risk exposing credentials in CI logs.

The incident owner must verify the secret's name and scope, determine
which job consumes it, inspect environment protection and workflow
permissions, and restore authentication without disclosing the secret.

The team must also determine whether the failed deployment changed any
resources, whether credentials were exposed, and whether a rollback or
credential rotation is necessary.
`,

  impactAssessment: [
    "Identify the repository, organization, workflow, run ID, job, step and target environment.",
    "Determine whether the failure affects one workflow, multiple repositories, one environment or all deployments.",
    "Record the first failing timestamp, last known successful run and relevant configuration changes.",
    "Determine whether the secret is used for a test registry, artifact repository, cloud deployment, database migration or production service.",
    "Check whether a deployment started or partially changed infrastructure before authentication failed.",
    "Assess whether the failure is caused by missing configuration, invalid credentials, insufficient permissions or an external identity provider.",
    "Determine whether any secret was printed, uploaded as an artifact, committed to Git or exposed through an unsafe debug step.",
    "If exposure is suspected, follow the credential-compromise process immediately rather than treating the incident as a simple missing-secret error.",
    "Identify the credential owner and the authorized repository, organization, cloud or security administrator.",
    "Classify severity according to business impact, production availability, privilege level and evidence of credential exposure."
  ],

  safetyChecks: [
    "Confirm the repository, workflow run and target environment before changing any configuration.",
    "Never use echo \"$SECRET\", printenv, env or debugging output to reveal credential values.",
    "Do not place secrets directly in shell command arguments, URLs, Git remotes or command-line history.",
    "Do not upload .env files, credential files, cloud configuration files or raw authentication logs as workflow artifacts.",
    "Do not commit secrets to workflow YAML, source code, Dockerfiles, Terraform files or repository configuration.",
    "Use GitHub's masked secrets feature, but never assume masking makes deliberate secret disclosure safe.",
    "Avoid printing encoded, transformed, truncated or derived secret values; masking may not recognize them.",
    "Use least-privilege credentials and avoid broad write permissions for a deployment workflow.",
    "Do not copy production credentials into a developer's local machine just to test the workflow.",
    "Before rotating credentials, identify consumers and the approved rotation procedure to avoid breaking other production services.",
    "For suspected exposure, revoke or rotate the affected credential through its issuer and follow incident-response procedures.",
    "Use protected environments and required reviewers for production deployments.",
    "Do not switch to pull_request_target and execute untrusted pull-request code with privileged secrets.",
    "Prefer short-lived OIDC credentials over long-lived cloud access keys when the provider and architecture support it."
  ],

  evidenceCollection: [
    "Repository name, workflow file path, run ID, attempt number, job name and failing step.",
    "Exact error message with credential values, tokens and sensitive URLs redacted.",
    "Workflow event type: push, pull_request, workflow_dispatch, schedule, workflow_call or another supported event.",
    "Base repository and head repository details when the run originates from a pull request.",
    "Secret name referenced by the workflow; never record the secret value.",
    "Secret scope: repository, organization or environment.",
    "Whether the job declares the correct environment and whether its protection rules have been satisfied.",
    "Recent changes to secret names, scope, environment configuration, workflow YAML or repository ownership.",
    "Relevant workflow permissions and the identity used by the authentication step.",
    "Cloud identity, registry, package manager or API error category without sensitive response headers.",
    "Last known successful workflow run and the credential/configuration state at that time.",
    "Whether the failure is reproducible on a trusted event and whether the credential owner confirms its validity.",
    "Deployment logs, changed resource identifiers and rollback status if the deployment partially executed.",
    "Audit evidence for secret changes, access changes or suspected exposure where available."
  ],

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm the repository and failing workflow run",
      objective: "Ensure that the investigation targets the correct repository and job.",
      commands: [
        "gh auth status",
        "gh repo view OWNER/REPO",
        "gh run list --repo OWNER/REPO --limit 20",
        "gh run view RUN_ID --repo OWNER/REPO",
        "gh run view RUN_ID --repo OWNER/REPO --log-failed"
      ],
      interpretOutput: [
        "Replace OWNER/REPO and RUN_ID with the actual repository and run ID.",
        "Record the failing step and its error category.",
        "Compare the failed run with the last successful run.",
        "Check whether the failure occurs before authentication, during authentication or after authentication.",
        "If logs contain credentials, restrict access and follow the organization's exposure-response process."
      ],
      nextAction: "Identify the exact secret reference and the job that consumes it. Do not print the secret value."
    },
    {
      step: 2,
      title: "Inspect the workflow's secret reference",
      objective: "Find spelling errors, incorrect expressions and unexpected secret scope assumptions.",
      commands: [
        "git grep -n -E 'secrets\\.|environment:|permissions:|id-token:|AWS_ACCESS_KEY_ID|AWS_SECRET_ACCESS_KEY|GITHUB_TOKEN' .github/workflows",
        "git diff -- .github/workflows",
        "git log -10 --oneline -- .github/workflows"
      ],
      interpretOutput: [
        "Confirm the referenced secret name exactly matches the configured name.",
        "Secret names are case-insensitive in GitHub Actions, but spelling and the selected secret identifier must still be correct.",
        "Check for a renamed secret, a stale reference or an unexpected reusable-workflow input.",
        "A secret used in one job is not automatically available as a variable in every other job.",
        "Check whether the workflow expects a secret but the authentication method was changed to OIDC.",
        "Do not infer the secret's existence or value from the workflow YAML alone."
      ],
      nextAction: "Record the secret identifier and every consuming job. Compare these references with the authorized secret configuration."
    },
    {
      step: 3,
      title: "Determine the correct secret scope",
      objective: "Establish whether the credential belongs at repository, organization or environment scope.",
      commands: [
        "gh secret list --repo OWNER/REPO",
        "gh secret list --org ORG",
        "gh secret list --env production --repo OWNER/REPO"
      ],
      interpretOutput: [
        "These commands list secret names and metadata, not secret values.",
        "Replace ORG and production with the actual organization and environment.",
        "Organization secret visibility and access policy can limit which repositories may use an organization secret.",
        "Environment secrets are available to jobs that reference the relevant environment and satisfy its protection rules.",
        "A repository-scoped secret is not the same configuration object as an environment-scoped secret.",
        "A missing entry in one scope does not prove the credential is absent from all scopes.",
        "Access to list secret metadata depends on the authenticated user's permissions and GitHub's endpoint support."
      ],
      nextAction: "Confirm the authoritative scope with the credential owner. Avoid creating duplicate credentials in multiple scopes unless that is the intended design."
    },
    {
      step: 4,
      title: "Check environment declaration and protection rules",
      objective: "Verify that the consuming job targets the environment containing the secret.",
      commands: [
        "gh api repos/OWNER/REPO/environments",
        "gh api repos/OWNER/REPO/environments/production",
        "git grep -n -A 12 -B 5 'environment:' .github/workflows"
      ],
      interpretOutput: [
        "Replace production with the exact configured environment name.",
        "Environment names must match the intended environment; accidental naming differences can route the job to a different environment.",
        "A job without the required environment declaration cannot be assumed to receive that environment's secrets.",
        "Required reviewers, wait timers, deployment branch restrictions and other protection rules may prevent the job from proceeding.",
        "An environment API response may expose configuration metadata but never the secret value.",
        "A 403 or 404 can reflect permissions, endpoint behavior or an incorrect environment name."
      ],
      nextAction: "Correct the environment association or complete the approved protection requirements before retrying the deployment."
    },
    {
      step: 5,
      title: "Determine whether the workflow event is allowed to access secrets",
      objective: "Find event-specific restrictions that explain why the secret is unavailable.",
      commands: [
        "gh run view RUN_ID --repo OWNER/REPO --json event,headSha,headBranch,headRepository,workflowName,status,conclusion",
        "gh pr view PR_NUMBER --repo OWNER/REPO --json headRefName,headRefOid,baseRefName,url",
        "git grep -n -E 'pull_request:|pull_request_target:|push:|workflow_dispatch:|workflow_call:|schedule:' .github/workflows"
      ],
      interpretOutput: [
        "Forked pull-request workflows generally do not receive ordinary repository secrets.",
        "Dependabot-triggered workflows also have specific restrictions on secrets and tokens.",
        "A secret available to a trusted push workflow may not be available to a fork PR workflow.",
        "Do not use a privileged event to execute untrusted contributor code.",
        "workflow_dispatch can use secrets only within the permissions and environment conditions that apply to the run.",
        "Check the actual run event rather than assuming the workflow ran through the event you expected."
      ],
      nextAction: "Separate safe validation of untrusted changes from trusted publishing/deployment jobs. Use an approved trusted event for privileged operations."
    },
    {
      step: 6,
      title: "Check reusable workflow inputs and secret forwarding",
      objective: "Identify secrets that exist in the caller but are not forwarded to the called workflow.",
      commands: [
        "git grep -n -E 'workflow_call:|secrets:|secrets: inherit|uses: .*\\.github/workflows' .github/workflows"
      ],
      interpretOutput: [
        "A reusable workflow should declare the expected secrets under workflow_call when explicit secret declarations are used.",
        "The caller must pass the expected secret or use an approved inheritance pattern where supported.",
        "Nested reusable workflows may need the secret passed onward; availability in the first workflow does not automatically guarantee availability in every nested workflow.",
        "Check the called workflow's actual secret identifier and its use in the relevant job.",
        "Use explicit secret mappings when they make access easier to audit."
      ],
      nextAction: "Correct the caller-to-reusable-workflow mapping and validate with a non-production test workflow."
    },
    {
      step: 7,
      title: "Verify secret availability without exposing its value",
      objective: "Test whether a secret reference is non-empty without revealing it.",
      commands: [
        "Add a temporary guarded step to the relevant workflow.",
        "Run the check only in a trusted, non-production test workflow where the relevant secret should be available.",
        "Remove the diagnostic step after verification."
      ],
      interpretOutput: [
        "A safe availability check can test whether a value is empty without printing the value.",
        "An empty result confirms that the current expression did not provide a usable value to that step; it does not by itself identify why.",
        "A non-empty result does not prove the credential is valid or has adequate permissions.",
        "Do not test secrets from untrusted fork pull requests.",
        "Do not emit lengths, prefixes, suffixes, hashes or encoded versions of secret values as a routine debugging technique."
      ],
      nextAction: "If empty, return to scope, event, environment and forwarding checks. If non-empty, validate the credential through the intended authentication operation."
    },
    {
      step: 8,
      title: "Check token permissions and distinguish authentication from authorization",
      objective: "Determine whether the workflow identity can perform the intended operation.",
      commands: [
        "gh api repos/OWNER/REPO/actions/permissions",
        "gh api repos/OWNER/REPO/actions/permissions/workflow",
        "gh run view RUN_ID --repo OWNER/REPO"
      ],
      interpretOutput: [
        "The GITHUB_TOKEN is separate from custom repository, organization and environment secrets.",
        "A valid token can still receive 403 because the required permission is missing.",
        "A 401 commonly indicates missing or invalid authentication; a 403 commonly indicates authorization or policy restrictions, but the complete error must be examined.",
        "For GITHUB_TOKEN, declare only the permissions the workflow needs.",
        "A token permission failure should not automatically trigger the creation of a long-lived personal access token.",
        "Repository policy and organization settings may impose restrictions beyond the YAML permissions block."
      ],
      nextAction: "Grant the minimum required permission through the approved workflow configuration or use the intended identity mechanism."
    },
    {
      step: 9,
      title: "Investigate AWS or another cloud provider authentication",
      objective: "Distinguish missing cloud secrets from invalid credentials, trust-policy failures and authorization errors.",
      commands: [
        "grep -n -A 8 -B 3 'configure-aws-credentials\\|id-token:\\|AWS_ROLE_ARN' .github/workflows/*.yml",
        "aws sts get-caller-identity",
        "aws configure list"
      ],
      interpretOutput: [
        "These are examples for AWS/Linux runners; adapt commands to the actual cloud provider and shell.",
        "Do not print credentials or expose configuration values containing secrets.",
        "If access keys are intended, verify the expected secret names and rotation status with the credential owner.",
        "If OIDC is intended, verify id-token: write, the role ARN, audience and the cloud trust policy.",
        "AccessDenied after successful identity resolution points toward authorization rather than a missing secret.",
        "A successful identity call proves that identity resolution worked; it does not prove the identity can perform the deployment operation."
      ],
      nextAction: "Use either the approved stored-credential approach or OIDC consistently. Correct the specific trust or permission failure before rerunning."
    },
    {
      step: 10,
      title: "Check registry, package manager and deployment authentication",
      objective: "Find failures caused by credentials for container registries or artifact repositories.",
      commands: [
        "gh run view RUN_ID --repo OWNER/REPO --log-failed",
        "docker login --help",
        "npm config get registry"
      ],
      interpretOutput: [
        "A registry login failure can indicate a missing credential, wrong registry endpoint, expired token or insufficient package permissions.",
        "Do not put passwords or tokens directly in docker login command arguments.",
        "Use a supported stdin-based login method or the official action's secret inputs.",
        "Verify that the identity has pull or push permission for the specific image/package.",
        "A successful login does not prove that the target repository or package namespace is writable."
      ],
      nextAction: "Correct the registry endpoint, credential scope or package permissions and verify the intended read/write operation."
    },
    {
      step: 11,
      title: "Investigate secret rotation and expiration",
      objective: "Determine whether a credential was changed, revoked or expired.",
      commands: [
        "gh run list --repo OWNER/REPO --limit 50",
        "gh run view LAST_GOOD_RUN_ID --repo OWNER/REPO",
        "gh run view RUN_ID --repo OWNER/REPO --log-failed"
      ],
      interpretOutput: [
        "Compare the first failure timestamp with approved secret-rotation or identity-policy changes.",
        "A masked value in logs does not reveal whether the underlying credential is current.",
        "Credential validity must be confirmed by the authorized issuer or a safe authentication operation.",
        "Do not attempt to recover the old secret value from GitHub; GitHub does not reveal saved secret values after storage.",
        "A newly rotated credential may need to be updated in the correct scope and propagated to all authorized consumers."
      ],
      nextAction: "Coordinate with the credential owner to confirm validity, rotate if needed, update the correct scope and validate consumers one at a time."
    },
    {
      step: 12,
      title: "Check organization policies and audit evidence",
      objective: "Find repository access restrictions or administrative changes that affected secret availability.",
      commands: [
        "gh secret list --org ORG",
        "gh api repos/OWNER/REPO/actions/permissions",
        "gh run list --repo OWNER/REPO --limit 50"
      ],
      interpretOutput: [
        "Organization secrets may be limited to selected repositories.",
        "A repository transfer or organization policy change can affect the intended access path.",
        "Secret-list commands expose metadata only and require sufficient permissions.",
        "The above commands are not a complete audit-log query.",
        "Use the organization's authorized audit-log interface/API to inspect administrative changes where supported.",
        "A lack of access to audit data does not prove that no change occurred."
      ],
      nextAction: "Ask the organization or security administrator to verify the applicable access policy and any recent change events."
    },
    {
      step: 13,
      title: "Assess partial deployment and rollback requirements",
      objective: "Ensure a credential failure did not leave production in an inconsistent state.",
      commands: [
        "gh run view RUN_ID --repo OWNER/REPO",
        "gh run list --repo OWNER/REPO --limit 20"
      ],
      interpretOutput: [
        "Inspect which steps completed before the authentication failure.",
        "Determine whether infrastructure, application files, database schema or cloud resources were modified.",
        "A failure before authentication usually differs from a failure after some deployment steps have completed.",
        "Do not rerun a non-idempotent migration or deployment without checking the current target state.",
        "Use the service-specific deployment and rollback runbooks to inspect the target environment."
      ],
      nextAction: "Establish actual target state, reconcile partial changes and follow the approved recovery or rollback plan."
    },
    {
      step: 14,
      title: "Perform a controlled recovery validation",
      objective: "Prove the secret is available and authentication works without exposing sensitive data.",
      commands: [
        "gh run view RUN_ID --repo OWNER/REPO",
        "gh pr checks PR_NUMBER --repo OWNER/REPO",
        "gh run list --repo OWNER/REPO --limit 20"
      ],
      interpretOutput: [
        "Use a test workflow or approved deployment run with the intended secret scope.",
        "Confirm authentication succeeds and the expected identity is used.",
        "Confirm the identity has only the necessary access.",
        "Verify that the current PR commit receives its required checks.",
        "For production, verify the environment approval and change authorization before deploying.",
        "Do not declare recovery solely because the missing-secret error disappeared."
      ],
      nextAction: "Monitor the deployment and service health, record the evidence, and close the incident only when the intended outcome is confirmed."
    }
  ],

  rootCauseMatrix: [
    {
      symptom: "Secret expression resolves to an empty value",
      likelyCause: "Wrong secret name, wrong scope, unavailable event context or missing secret forwarding.",
      evidence: "Safe empty/non-empty check plus workflow, scope and event inspection.",
      resolution: "Correct the reference or scope and ensure the consuming job has authorized access."
    },
    {
      symptom: "Secret exists but authentication returns 401",
      likelyCause: "Expired, revoked, malformed or incorrect credential, or wrong authentication endpoint.",
      evidence: "Issuer-side validity check and redacted authentication error.",
      resolution: "Correct the endpoint or rotate the credential through the authorized owner."
    },
    {
      symptom: "Authentication succeeds but API returns 403",
      likelyCause: "Insufficient role, repository access, cloud policy or token permissions.",
      evidence: "Authenticated identity and denied operation from the target service.",
      resolution: "Grant the minimum required permission or correct the target resource/policy."
    },
    {
      symptom: "Secret unavailable only on fork PRs",
      likelyCause: "Expected GitHub Actions security restrictions on untrusted pull requests.",
      evidence: "Run event and head repository indicate a fork.",
      resolution: "Run unprivileged validation separately from trusted secret-consuming workflows."
    },
    {
      symptom: "Environment secret is missing",
      likelyCause: "Wrong environment name, absent environment declaration or unsatisfied protection rules.",
      evidence: "Job environment configuration and environment metadata/protection status.",
      resolution: "Correct the environment association or complete the required approval and deployment conditions."
    },
    {
      symptom: "Caller workflow has a secret but reusable workflow does not",
      likelyCause: "Secret was not declared, explicitly passed or forwarded to a nested workflow.",
      evidence: "Caller mapping and workflow_call secret declarations.",
      resolution: "Add the required explicit mapping or supported inheritance configuration."
    },
    {
      symptom: "Cloud deployment fails after a credential migration",
      likelyCause: "Workflow still expects static keys after the team moved to OIDC, or the OIDC trust policy is wrong.",
      evidence: "Workflow authentication configuration and cloud identity-provider/role trust configuration.",
      resolution: "Align the workflow with the approved authentication model and correct trust conditions."
    },
    {
      symptom: "Registry push fails but login succeeds",
      likelyCause: "Identity has authentication access but lacks write permission to the target package/image.",
      evidence: "Successful login followed by a denied push to a specific namespace.",
      resolution: "Grant the correct package/repository write permission or use the intended publishing identity."
    },
    {
      symptom: "All workflows fail after secret rotation",
      likelyCause: "New credential was not propagated to all consumers or an issuer-side trust/permission changed.",
      evidence: "Failure timing and common credential dependencies across workflows.",
      resolution: "Update the authoritative secret scope and validate each consumer using a controlled rollout."
    },
    {
      symptom: "Deployment stops after some resources changed",
      likelyCause: "Authentication failure occurred partway through a multi-step deployment.",
      evidence: "Completed steps, target resource state and deployment logs.",
      resolution: "Reconcile target state and follow the application's rollback or forward-recovery runbook."
    },
    {
      symptom: "A secret is unexpectedly exposed in logs",
      likelyCause: "Debug printing, shell tracing, command-line arguments or unsafe artifact capture.",
      evidence: "Restricted log review and the exact step that emitted sensitive output.",
      resolution: "Restrict access, revoke/rotate the exposed credential, remove unsafe logging and follow incident-response procedures."
    },
    {
      symptom: "OIDC token cannot be requested",
      likelyCause: "Missing id-token permission, unsupported workflow context or incorrect OIDC integration.",
      evidence: "Workflow permissions and the provider's redacted error.",
      resolution: "Enable the minimum required id-token permission and validate the identity-provider trust configuration."
    }
  ],

  recoveryProcedures: [
    {
      scenario: "Secret was renamed or stored in the wrong scope",
      actions: [
        "Confirm the authoritative secret name and intended scope with the credential owner.",
        "Update the workflow reference or configure the secret in the approved scope.",
        "Check organization repository-access restrictions and environment association.",
        "Keep the credential value out of source code and logs."
      ],
      validation: [
        "A safe availability check confirms the expected expression is non-empty.",
        "The intended authentication operation succeeds.",
        "The resulting identity has the expected minimum permissions.",
        "Required PR checks and deployment protections remain enabled."
      ],
      rollbackDecision: "If the new configuration breaks other consumers, restore the approved previous reference or mapping while coordinating a controlled credential update."
    },
    {
      scenario: "Credential is expired, revoked or invalid",
      actions: [
        "Confirm invalidity with the authorized credential issuer or service owner.",
        "Create or rotate the credential through the approved process.",
        "Update the authoritative secret location.",
        "Update all dependent workflows according to the rotation plan.",
        "Revoke the old credential when safe and required."
      ],
      validation: [
        "The intended service accepts the new credential.",
        "The workflow performs the expected operation without logging sensitive values.",
        "Other consumers using the same credential are verified."
      ],
      rollbackDecision: "Do not restore a compromised or revoked credential. If rotation causes an outage, use the approved issuer-side recovery process and maintain the incident response."
    },
    {
      scenario: "Fork PR cannot access a required secret",
      actions: [
        "Confirm that the run originates from an untrusted fork.",
        "Separate safe build/test jobs from privileged publishing and deployment steps.",
        "Keep untrusted PR code away from privileged credentials and deployment runners.",
        "Use a trusted post-review or approved release event for privileged operations."
      ],
      validation: [
        "Fork PR validation completes without privileged secrets.",
        "Trusted deployment workflows receive only their intended credentials.",
        "Required checks still report the expected results."
      ],
      rollbackDecision: "If a proposed workflow change grants secrets to untrusted code, revert it immediately and follow security incident procedures if exposure may have occurred."
    },
    {
      scenario: "OIDC cloud authentication fails",
      actions: [
        "Verify id-token: write is declared at the appropriate workflow/job level.",
        "Verify the cloud identity provider, audience and role trust conditions.",
        "Confirm the workflow repository, branch, environment or other identity claims match the trust policy.",
        "Avoid adding static cloud keys merely as a quick workaround without security approval."
      ],
      validation: [
        "The workflow obtains the expected federated identity.",
        "The cloud identity query confirms the intended role/account.",
        "The role can perform only the approved deployment actions."
      ],
      rollbackDecision: "Restore the last known-good OIDC trust configuration through change control. If static credentials are formally approved as an emergency alternative, use least privilege, a short validity window where possible and a documented migration back to OIDC."
    },
    {
      scenario: "Credential may have leaked into a log or artifact",
      actions: [
        "Treat the credential as compromised; do not rely on log masking alone.",
        "Restrict access to the affected logs/artifacts and follow the organization's evidence-preservation process.",
        "Revoke or rotate the credential with its issuer.",
        "Identify affected systems and inspect relevant audit records for unauthorized use.",
        "Remove unsafe debug output and prevent the same artifact/logging path from recurring.",
        "Notify the security incident owner according to policy."
      ],
      validation: [
        "The exposed credential is no longer valid.",
        "The replacement credential is stored in the correct scope.",
        "The intended workflow works without disclosing the value.",
        "Relevant audit evidence has been reviewed and incident actions recorded."
      ],
      rollbackDecision: "Never roll back to the exposed credential. Restore service with a new credential or approved identity mechanism."
    },
    {
      scenario: "Production deployment partially completed before authentication failed",
      actions: [
        "Pause additional deployments to the affected target if safe and authorized.",
        "Inspect the deployment logs and actual resource state.",
        "Determine which changes completed and which did not.",
        "Choose the approved rollback or forward-recovery strategy based on application and data consistency.",
        "Restore credentials and rerun only after the target state is understood."
      ],
      validation: [
        "Infrastructure and application state are consistent.",
        "Health checks and smoke tests pass.",
        "The intended release version is confirmed.",
        "No unexpected partial migration or duplicate deployment remains."
      ],
      rollbackDecision: "Rollback if established service-health or consistency criteria require it. For irreversible database migrations, use the documented recovery procedure rather than assuming a simple revert is safe."
    }
  ],

  advancedScenarios: [
    {
      title: "Secret works in one job but not another",
      symptoms: [
        "The build job authenticates successfully.",
        "The deploy job receives an empty value.",
        "The workflow uses multiple jobs or reusable workflows."
      ],
      investigation: [
        "Inspect each job's environment declaration and secret expression.",
        "Check whether the secret is repository-, organization- or environment-scoped.",
        "Inspect caller-to-reusable-workflow mappings.",
        "Verify that the successful job and failing job use the same intended authentication method."
      ],
      resolution: [
        "Associate the correct environment with the consuming job.",
        "Pass the secret explicitly to reusable workflows where required.",
        "Keep access limited to jobs that actually need the credential."
      ]
    },
    {
      title: "Secret disappears after moving to an environment",
      symptoms: [
        "A repository-scoped secret previously worked.",
        "The secret was moved to the production environment.",
        "A workflow step now receives an empty value."
      ],
      investigation: [
        "Inspect the consuming job's environment declaration.",
        "Check the exact environment name and protection status.",
        "Inspect the environment's secret metadata with an authorized account.",
        "Check whether the failing step runs in a different job from the environment-bound deployment job."
      ],
      resolution: [
        "Declare the intended environment on the correct job.",
        "Complete required approvals and branch restrictions.",
        "Remove obsolete repository-level copies only after all consumers are verified."
      ]
    },
    {
      title: "Secret is unavailable in a reusable workflow",
      symptoms: [
        "The caller workflow starts successfully.",
        "A called workflow fails at authentication.",
        "The same secret works in a non-reusable workflow."
      ],
      investigation: [
        "Inspect the called workflow's workflow_call secret declarations.",
        "Check the caller's explicit secret mappings.",
        "Inspect nested reusable workflow forwarding.",
        "Confirm the called workflow is executing in the intended repository and environment context."
      ],
      resolution: [
        "Declare and map the required secret correctly.",
        "Use secrets: inherit only where supported and appropriate.",
        "Prefer explicit mapping for sensitive production credentials when it improves least-privilege review."
      ]
    },
    {
      title: "Dependabot workflow fails due to unavailable credentials",
      symptoms: [
        "Normal dependency update PRs or trusted branch runs succeed.",
        "Dependabot-triggered runs fail during authentication.",
        "The step expects a private registry or API credential."
      ],
      investigation: [
        "Confirm the actor and event type.",
        "Inspect the workflow's secret requirements and Dependabot configuration.",
        "Check the supported Dependabot secret mechanism and organization policies.",
        "Ensure the workflow is not granting privileged credentials to untrusted code."
      ],
      resolution: [
        "Configure the supported Dependabot secret mechanism when the dependency operation genuinely requires it.",
        "Separate privileged deployment/publishing from dependency PR validation.",
        "Validate with a controlled dependency update PR."
      ]
    },
    {
      title: "AWS static credentials were replaced by OIDC",
      symptoms: [
        "The old AWS key secret is no longer configured.",
        "The workflow still references AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY.",
        "Authentication fails even though the cloud role exists."
      ],
      investigation: [
        "Inspect the workflow authentication steps.",
        "Confirm the intended AWS role and OIDC provider.",
        "Check id-token permissions and the trust policy's subject/audience conditions.",
        "Verify that the job runs under the expected repository, branch or environment claims."
      ],
      resolution: [
        "Update the workflow to use the approved OIDC action/configuration.",
        "Remove obsolete static-key references after migration validation.",
        "Confirm the resulting AWS identity and required permissions."
      ]
    },
    {
      title: "Secret is present but cloud access is denied",
      symptoms: [
        "Authentication returns an identity successfully.",
        "A deployment command receives AccessDenied.",
        "The workflow reports a permission error rather than a missing-secret error."
      ],
      investigation: [
        "Identify the actual authenticated cloud identity.",
        "Inspect the denied action and target resource.",
        "Review role policies, resource policies, permission boundaries and organization-level controls.",
        "Confirm the workflow is targeting the intended account and region."
      ],
      resolution: [
        "Grant the minimum necessary permission to the intended identity.",
        "Correct account/region/resource targeting if wrong.",
        "Re-run the narrow operation before rerunning the entire deployment."
      ]
    },
    {
      title: "Production environment waits for approval",
      symptoms: [
        "The workflow is waiting rather than failing authentication.",
        "The job targets a protected environment.",
        "The deployment cannot access environment secrets yet."
      ],
      investigation: [
        "Inspect job status and environment protection rules.",
        "Confirm required reviewers, branch restrictions and any configured wait period.",
        "Verify that the deployment is approved by an eligible reviewer."
      ],
      resolution: [
        "Complete the configured approval process.",
        "Do not bypass the protection requirement just to expose the secret sooner.",
        "Confirm the job resumes and authenticates after approval."
      ]
    },
    {
      title: "Secret accidentally printed in CI logs",
      symptoms: [
        "A debug step printed an environment variable or command output.",
        "A credential may be present in logs or artifacts.",
        "The secret appears masked in some places but not others."
      ],
      investigation: [
        "Restrict access to the run and affected artifacts.",
        "Identify the credential issuer and all systems where the credential is valid.",
        "Review authorized logs and audit events without spreading the exposed value.",
        "Determine whether the value appeared in transformed, encoded or derived form."
      ],
      resolution: [
        "Revoke or rotate the credential immediately through the approved incident process.",
        "Remove the unsafe logging step and any unnecessary artifact containing sensitive material.",
        "Review usage/audit evidence and replace the credential in the intended scope."
      ]
    },
    {
      title: "Secret missing after repository transfer or organization policy change",
      symptoms: [
        "A workflow fails after repository ownership changes.",
        "An organization secret no longer appears available.",
        "The secret access policy refers to an old repository or selected repository list."
      ],
      investigation: [
        "Confirm the repository's current owner and identity.",
        "Inspect organization secret access policy and repository visibility.",
        "Review approved administrative change/audit evidence.",
        "Check organization and environment access restrictions."
      ],
      resolution: [
        "Update authorized repository access to the correct repository.",
        "Verify that the intended workflow receives the secret.",
        "Review other consumers affected by the ownership or policy change."
      ]
    }
  ],

  prevention: [
    "Use clear, documented naming conventions for repository, organization and environment secrets.",
    "Document each secret's owner, purpose, consumers, scope, rotation process and expiry where applicable.",
    "Prefer OIDC federation and short-lived cloud credentials over long-lived access keys when supported.",
    "Use least-privilege GITHUB_TOKEN and cloud role permissions.",
    "Separate untrusted PR validation from privileged deployment and publishing workflows.",
    "Never print secret values or dump the entire process environment in CI logs.",
    "Use protected environments and required reviewers for production credentials.",
    "Declare required secrets explicitly in reusable workflows and validate their forwarding.",
    "Test credential rotation in a controlled environment before production rollout.",
    "Maintain a credential inventory and an approved emergency revocation procedure.",
    "Alert on failed authentication and unauthorized credential use where the provider supports it.",
    "Review organization secret repository-access policies after repository transfers or visibility changes.",
    "Use dedicated service identities instead of personal accounts for automation.",
    "Keep secret-consuming steps limited to jobs that require those credentials.",
    "Avoid putting credentials into container build arguments or image layers.",
    "Use supported secret managers or workload identity for systems requiring more advanced credential lifecycle controls.",
    "Test deployment rollback and partial-failure recovery procedures.",
    "Review workflow changes for unsafe logging, untrusted code execution and excessive permissions."
  ],

  monitoring: [
    "Track authentication failure rates by workflow, target service and environment.",
    "Alert on sudden increases in 401, 403, expired-token and missing-credential errors.",
    "Monitor cloud identity failures separately from cloud authorization failures.",
    "Track credential rotation dates and expiry where the credential provider exposes that metadata.",
    "Monitor environment approval wait time and deployment queue delays.",
    "Track failed deployments that may have partially changed resources.",
    "Use cloud/provider audit logs to detect unexpected credential use.",
    "Monitor secret scope and repository access-policy changes where audit capabilities support them.",
    "Alert when a workflow begins failing after a secret rotation or repository transfer.",
    "Ensure monitoring records secret names or credential identifiers only when appropriate, never secret values."
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Start/end time (UTC):",
    "Repository and organization:",
    "Workflow, run ID and job:",
    "Target environment and service:",
    "Secret identifier and configured scope (never its value):",
    "Authentication method:",
    "Exact redacted error:",
    "Production/deployment impact:",
    "Evidence and relevant audit records:",
    "Root cause and proof:",
    "Credential exposure suspected/confirmed:",
    "Rotation/revocation action:",
    "Recovery validation:",
    "Partial deployment and rollback decision:",
    "Prevention action, owner and due date:",
    "Lessons learned:"
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Diagnose a misspelled secret reference",
      objective: "Identify an empty secret expression without revealing credentials.",
      steps: [
        "Create a disposable repository and configure a harmless test secret.",
        "Reference the correct secret in a test workflow and verify only that it is non-empty.",
        "Introduce a deliberate spelling mismatch.",
        "Observe the safe empty-value diagnostic.",
        "Correct the name and confirm the test succeeds."
      ],
      successCriteria: [
        "The failure is identified without printing the value.",
        "The workflow references the intended secret.",
        "No production credential is used."
      ]
    },
    {
      title: "Lab 2 — Environment-scoped secret",
      objective: "Understand environment association and approval behavior.",
      steps: [
        "Create a disposable test environment and a harmless test secret.",
        "Create a workflow job that references the environment.",
        "Configure a test approval rule where supported.",
        "Observe the job's waiting state before approval.",
        "Approve the job and verify the secret is available without printing it."
      ],
      successCriteria: [
        "The workflow uses the intended environment.",
        "The approval gate behaves as configured.",
        "The secret remains undisclosed in logs."
      ]
    },
    {
      title: "Lab 3 — Reusable workflow secret forwarding",
      objective: "Validate caller-to-called-workflow secret mapping.",
      steps: [
        "Create a reusable test workflow with a declared secret input.",
        "Call it from another workflow and pass a harmless test secret.",
        "Run a safe non-empty check in the called workflow.",
        "Remove the mapping in the test branch and observe the failure.",
        "Restore the mapping and validate the run."
      ],
      successCriteria: [
        "The missing forwarding is identified.",
        "The corrected reusable workflow receives the expected input.",
        "No real production credential is exposed."
      ]
    },
    {
      title: "Lab 4 — OIDC authentication design",
      objective: "Understand federated cloud identity without hard-coded cloud keys.",
      steps: [
        "Use a dedicated non-production cloud account or sandbox.",
        "Configure an OIDC provider and a least-privilege test role.",
        "Declare the required id-token permission.",
        "Run the approved cloud authentication action.",
        "Verify the resulting identity using the provider's identity command."
      ],
      successCriteria: [
        "The workflow authenticates through federation.",
        "The identity is the intended test role.",
        "The role cannot access unrelated production resources."
      ]
    },
    {
      title: "Lab 5 — Secret exposure response drill",
      objective: "Practice the response to a simulated credential disclosure.",
      steps: [
        "Use a disposable test credential only.",
        "Simulate a controlled disclosure in an isolated test environment.",
        "Follow the credential issuer's revocation/rotation procedure.",
        "Remove the unsafe logging step.",
        "Verify the old test credential is invalid and the replacement works."
      ],
      successCriteria: [
        "The response avoids spreading the credential further.",
        "The old credential is revoked.",
        "The replacement is validated without being logged."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "Why might a GitHub Actions secret be missing even though it exists?",
      answer: "The workflow may reference the wrong name or scope, run under a restricted event, omit the correct environment, fail to forward a reusable-workflow secret, or be restricted by organization policy."
    },
    {
      question: "How do you debug a secret without printing it?",
      answer: "Check the secret identifier and scope, use a safe non-empty test in a trusted workflow, and validate it through the intended authentication operation. Never echo, encode or dump the credential."
    },
    {
      question: "What is the difference between authentication and authorization?",
      answer: "Authentication establishes which identity is being used. Authorization determines what that identity can do. A successful login followed by AccessDenied is usually an authorization or policy problem."
    },
    {
      question: "Why are secrets usually unavailable to forked pull requests?",
      answer: "Forked code is untrusted. Restricting secrets and write permissions prevents contributors from using a PR to steal credentials or modify protected resources."
    },
    {
      question: "What is the difference between repository and environment secrets?",
      answer: "Repository secrets are scoped to a repository. Environment secrets are associated with a named deployment environment and are made available to jobs that target that environment subject to its protection rules."
    },
    {
      question: "How do you troubleshoot a secret in a reusable workflow?",
      answer: "Inspect the workflow_call declaration, the caller's secret mapping, nested workflow forwarding and the job that consumes the secret."
    },
    {
      question: "What should you do when a secret is exposed in logs?",
      answer: "Treat it as compromised, restrict access to the affected evidence, revoke or rotate it through the issuer, investigate possible misuse, remove unsafe logging and validate the replacement."
    },
    {
      question: "Why use OIDC instead of long-lived cloud access keys?",
      answer: "OIDC can exchange a trusted workflow identity for short-lived cloud credentials, reducing the need to store long-lived cloud keys in GitHub."
    },
    {
      question: "What does a 403 error mean in a deployment workflow?",
      answer: "It commonly indicates an authorization or policy problem, but the complete response must be inspected. Verify the authenticated identity, requested operation, target resource and applicable policies."
    },
    {
      question: "Why might a deployment fail after authentication succeeds?",
      answer: "The identity may lack permissions, target the wrong account or region, encounter a resource policy restriction, or fail during a later deployment step."
    },
    {
      question: "How should production credential rotation be performed?",
      answer: "Use the approved issuer-side rotation process, update the authoritative secret scope, validate consumers in a controlled rollout, revoke the old credential when safe and monitor the result."
    },
    {
      question: "How do you investigate a partial deployment after a secret failure?",
      answer: "Identify completed steps, inspect actual infrastructure/application state and follow the service-specific rollback or forward-recovery runbook before retrying."
    },
    {
      question: "Why is dumping all environment variables dangerous?",
      answer: "The environment may contain tokens, passwords, private endpoints and other sensitive configuration. Logs and artifacts can retain that information beyond the workflow run."
    },
    {
      question: "How can a missing-secret incident be prevented?",
      answer: "Use consistent naming and scope, explicit reusable-workflow mappings, protected environments, least privilege, OIDC where supported, safe rotation practices and monitoring."
    },
    {
      question: "What evidence proves that a missing-secret incident is resolved?",
      answer: "The correct workflow receives the intended credential, authentication succeeds as the expected identity, the required operation is authorized, deployment state is validated and no credential value is exposed."
    }
  ],

  officialReferences: [
    "https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions",
    "https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions",
    "https://docs.github.com/en/actions/security-for-github-actions/security-guides/automatic-token-authentication",
    "https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments",
    "https://docs.github.com/en/actions/using-workflows/reusing-workflows",
    "https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/about-security-hardening-with-openid-connect",
    "https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows",
    "https://cli.github.com/manual/gh_secret_list",
    "https://cli.github.com/manual/gh_run_view",
    "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html"
  ]
};
