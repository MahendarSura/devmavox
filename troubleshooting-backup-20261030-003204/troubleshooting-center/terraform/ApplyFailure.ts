
export const applyFailureGuide = {
  id: "terraform-apply-failure",
  title: "Terraform Apply Failure",
  category: "Terraform",
  summary:
    "Investigate failed Terraform applies, identify partial changes and state " +
    "risks, recover safely, and prevent recurring infrastructure incidents.",

  incidentScenario: {
    title: "Production pipeline fails during terraform apply",
    symptoms: [
      "CI/CD job exits with a non-zero status",
      "Some cloud resources were created or modified before the failure",
      "Terraform reports AccessDenied, quota, timeout, conflict, or API errors",
      "A subsequent plan shows unexpected drift or resource replacement",
      "The remote state backend reports a lock or state-write problem",
      "The deployment is blocked while application infrastructure is partially updated",
    ],
    possibleTriggers: [
      "Invalid resource configuration or provider/API validation error",
      "IAM permission removed or deployment identity changed",
      "Cloud quota, subnet IP, regional capacity, or service limit exhausted",
      "Remote backend access, locking, encryption, or state persistence failure",
      "Concurrent Terraform pipelines modifying the same state",
      "Provider version or lock-file change",
      "Out-of-band infrastructure changes",
      "Dependency ordering, eventual consistency, or API throttling",
      "Expired credentials or incorrect account/region",
      "A resource replacement interrupted by a failed dependent operation",
    ],
  },

  impactAndSeverity: {
    questions: [
      "Which account, region, workspace, backend key, and environment are affected?",
      "Did the failure happen during planning, refreshing, creating, updating, or deleting?",
      "Which resources completed before the failure?",
      "Is a customer-facing service degraded or unavailable?",
      "Were networking, IAM, databases, DNS, load balancers, or security rules changed?",
      "Is the pipeline still running, retrying, or holding a state lock?",
      "Are other pipelines applying against the same state?",
      "Does the current Terraform state still represent the real infrastructure?",
    ],
    severity: {
      SEV1:
        "Critical production outage, data-loss risk, exposed security boundary, " +
        "or major infrastructure unavailable.",
      SEV2:
        "Significant degradation, partially applied critical infrastructure, " +
        "or blocked recovery/deployment.",
      SEV3:
        "Non-production failure or isolated resource error with no meaningful " +
        "customer impact and safe capacity remaining.",
    },
    rule:
      "Set severity according to customer impact, security risk, data risk, and " +
      "recovery complexity—not solely the Terraform exit code.",
  },

  safetyChecks: [
    "Verify the CI run, repository, commit SHA, working directory, and Terraform version.",
    "Verify AWS/Azure/GCP account or subscription, region, identity, workspace, and backend key.",
    "Pause competing applies to the same state using the approved pipeline control.",
    "Preserve logs, plan artifacts, state-backend metadata, and timestamps.",
    "Do not expose state files or saved plan files; they may contain sensitive values.",
    "Do not delete or manually edit remote state to make the pipeline green.",
    "Do not force-unlock until the lock owner and active-run status are verified.",
    "Do not run destroy, broad replacement, or unreviewed apply as a recovery shortcut.",
    "Require production approval and a reviewed recovery plan for risky changes.",
  ],

  evidenceCollection: {
    capture: [
      "Full CI/CD logs including the first error and final exit code",
      "Commit SHA, pull request, branch, and recent infrastructure changes",
      "Terraform CLI and provider versions",
      "Terraform workspace and backend configuration (redacted)",
      "Exact resource address and provider/API error",
      "Timestamp, request ID, operation ID, and cloud audit-log entry",
      "State lock metadata and lock owner, if present",
      "Current plan output and resource actions",
      "Cloud resource status and recent changes",
      "Relevant quota, IAM, network, and service-health evidence",
    ],
    commands: [
      "terraform version",
      "terraform workspace show",
      "terraform providers",
      "git status --short",
      "git rev-parse HEAD",
      "git diff --stat",
      "git diff --check",
    ],
    caution:
      "Review backend configuration without printing credentials. Redact account identifiers " +
      "where required by policy, access tokens, secret variables, and sensitive plan/state data.",
  },

  diagnosticSequence: [
    {
      step: 1,
      name: "Freeze the incident safely and confirm the target",
      actions: [
        "Stop duplicate or competing deployment runs using CI/CD controls.",
        "Check whether another legitimate apply is still running.",
        "Confirm the environment and cloud identity with the approved credentials.",
        "Record the exact failing pipeline run and commit.",
      ],
      commands: [
        "terraform version",
        "terraform workspace show",
        "git rev-parse HEAD",
        "git status --short",
      ],
      interpretation: {
        wrongWorkspaceOrCommit:
          "Stop. Correct the pipeline target before further Terraform operations.",
        anotherApplyActive:
          "Do not start another apply against the same state.",
        productionTarget:
          "Follow production approval and incident/change-management requirements.",
      },
    },
    {
      step: 2,
      name: "Classify the failure stage",
      categories: [
        {
          type: "Initialization",
          clues: [
            "Backend initialization failed",
            "Provider installation or registry errors",
            "State backend access or lock errors",
          ],
          investigate:
            "Backend configuration, credentials, network access, provider lock file, and lock owner.",
        },
        {
          type: "Validation or planning",
          clues: [
            "Invalid argument or unsupported attribute",
            "Provider schema errors",
            "Invalid index, unknown reference, or failed data source",
          ],
          investigate:
            "Configuration, module inputs, provider versions, data source permissions, and dependency values.",
        },
        {
          type: "Provider operation",
          clues: [
            "AccessDenied or Forbidden",
            "QuotaExceeded or rate limiting",
            "Conflict, timeout, or service API error",
          ],
          investigate:
            "The specific cloud API operation, identity, quota, resource state, and audit logs.",
        },
        {
          type: "State persistence",
          clues: [
            "State upload or write failure",
            "Backend connectivity lost during apply",
            "Lock acquisition or release failure",
          ],
          investigate:
            "Backend health, lock ownership, state object versioning, and whether resource changes already completed.",
        },
      ],
    },
    {
      step: 3,
      name: "Identify completed and incomplete resource operations",
      actions: [
        "Read the first meaningful provider error, not just the final summary.",
        "Identify the exact resource address, action, and dependency chain.",
        "Compare pipeline logs with cloud audit logs and resource status.",
        "Separate confirmed changes from operations with unknown outcomes.",
      ],
      note:
        "A timeout does not prove that the cloud API operation failed. The service may " +
        "have completed the request even though Terraform did not receive the response.",
    },
    {
      step: 4,
      name: "Check Terraform state and backend health",
      commands: [
        "terraform state list",
        "terraform state show RESOURCE_ADDRESS",
        "terraform state pull",
      ],
      inspect: [
        "Whether the resource address exists in state",
        "Whether state attributes match the observed cloud resource",
        "Whether the backend is reachable and the state is readable",
        "Whether another run owns a lock",
        "Whether state object versioning or backups are available",
      ],
      caution:
        "terraform state pull may expose sensitive information in terminal output or saved files. " +
        "Run only in an approved secure environment; do not paste raw state into tickets or chat.",
      interpretation: {
        resourceInCloudAndInState:
          "Inspect drift and the next plan before making changes.",
        resourceInCloudButMissingFromState:
          "Do not recreate blindly. Determine whether controlled import is appropriate.",
        resourceInStateButMissingInCloud:
          "Verify the cloud resource really is absent before planning recreation.",
        stateUnreadable:
          "Stop state-changing operations and restore backend access first.",
      },
    },
    {
      step: 5,
      name: "Verify cloud identity and permissions",
      awsCommands: [
        "aws sts get-caller-identity",
        "aws configure get region",
      ],
      checks: [
        "Confirm the identity used by the pipeline, not only the engineer's local identity.",
        "Check the exact denied API action and resource ARN from the error or audit log.",
        "Check role trust, session duration, permission boundaries, and SCPs where applicable.",
        "Check KMS and backend permissions separately from infrastructure permissions.",
        "Verify that a recent policy change did not remove a required permission.",
      ],
      rule:
        "Grant only the minimum required permission. Do not solve AccessDenied by attaching broad administrator access.",
    },
    {
      step: 6,
      name: "Check quotas, capacity, and networking",
      checks: [
        "Cloud service quotas and regional capacity",
        "Subnet free IP addresses and network interface limits",
        "API throttling and retry-after guidance",
        "Private endpoint, DNS, proxy, route, and firewall access",
        "Dependency readiness and cloud API eventual consistency",
      ],
      interpretation: {
        throttling:
          "Use bounded retries/backoff where supported and reduce concurrent requests if appropriate.",
        quota:
          "Confirm the exact quota and current usage before requesting an increase or reducing demand.",
        timeout:
          "Determine whether the remote operation completed before retrying.",
      },
    },
    {
      step: 7,
      name: "Review provider, module, and configuration changes",
      commands: [
        "terraform providers",
        "git diff -- .",
        "git diff -- .terraform.lock.hcl",
      ],
      checks: [
        "Provider version changed unexpectedly",
        "Module source or version changed",
        "Resource arguments changed to force replacement",
        "Lifecycle settings or dependency references changed",
        "Variable files differ between CI and local runs",
        "The CI working directory is different from the expected root module",
      ],
      note:
        "Keep .terraform.lock.hcl changes intentional and reviewed. Do not use an unrestricted " +
        "provider upgrade as a first-line fix for an unexplained apply failure.",
    },
    {
      step: 8,
      name: "Run safe diagnostic commands",
      commands: [
        "terraform fmt -check -recursive",
        "terraform validate",
        "terraform plan -out=tfplan",
        "terraform show tfplan",
      ],
      safety: [
        "Use the correct backend, workspace, variables, and identity.",
        "Review the plan before any new apply.",
        "Protect tfplan because saved plans can contain sensitive values.",
        "Do not treat a new plan as proof that a previous operation did not happen.",
        "Do not automatically apply a newly generated plan during incident triage.",
      ],
    },
    {
      step: 9,
      name: "Compare intended state with actual infrastructure",
      actions: [
        "Inspect affected cloud resources through read-only APIs or the console.",
        "Compare resource IDs, configuration, status, and timestamps.",
        "Use the current Terraform plan to identify create, update, delete, or replace actions.",
        "Investigate unexpected drift before approving further changes.",
      ],
      caution:
        "Avoid refreshing or changing state manually without understanding the installed Terraform " +
        "version and the organization's state-management procedure.",
    },
    {
      step: 10,
      name: "Select a cause-specific recovery",
      rule:
        "Fix the confirmed cause first. Then create and review a fresh plan, validate its actions, " +
        "obtain required approval, and apply only the reviewed recovery plan.",
    },
  ],

  rootCauseMatrix: [
    {
      symptom: "AccessDenied or Forbidden",
      causes: [
        "Missing provider permission",
        "Wrong role or account",
        "Permission boundary, SCP, trust, or resource policy restriction",
      ],
      evidence: [
        "Exact API action and resource ARN",
        "Pipeline identity",
        "Cloud audit event",
      ],
      recovery:
        "Correct the identity or narrowly scoped permission, then review a fresh plan.",
    },
    {
      symptom: "QuotaExceeded or insufficient capacity",
      causes: [
        "Service quota exhausted",
        "Regional or instance capacity unavailable",
        "Subnet or network-interface limit reached",
      ],
      evidence: [
        "Provider error and request ID",
        "Quota usage",
        "Subnet and capacity metrics",
      ],
      recovery:
        "Resolve the specific capacity constraint or request an approved quota increase.",
    },
    {
      symptom: "State lock already held",
      causes: [
        "Another apply is running",
        "A previous run terminated unexpectedly",
        "Lock cleanup did not complete",
      ],
      evidence: [
        "Lock metadata and owner",
        "CI run status",
        "Backend activity",
      ],
      recovery:
        "Confirm no active owner before following the backend's documented lock-recovery procedure.",
    },
    {
      symptom: "Resource created but apply failed",
      causes: [
        "A later dependent operation failed",
        "Provider timed out after the remote operation completed",
        "State persistence failed",
      ],
      evidence: [
        "Cloud resource ID and status",
        "Audit log timestamps",
        "Terraform state and plan",
      ],
      recovery:
        "Reconcile the existing resource and state safely; consider import only if appropriate.",
    },
    {
      symptom: "Resource replacement appears unexpectedly",
      causes: [
        "Immutable field changed",
        "Provider or module behavior changed",
        "Drift or configuration difference",
      ],
      evidence: [
        "Plan diff",
        "Provider version and lock file",
        "Recent code changes",
      ],
      recovery:
        "Understand the replacement trigger and assess downtime/data risk before approval.",
    },
    {
      symptom: "Provider API timeout or throttling",
      causes: [
        "Cloud API throttling",
        "Network interruption",
        "Long-running asynchronous operation",
      ],
      evidence: [
        "Request ID and audit logs",
        "Resource status",
        "Provider debug logs collected securely",
      ],
      recovery:
        "Check remote operation status first, then use bounded retries or provider-supported wait behavior.",
    },
    {
      symptom: "Backend cannot read or write state",
      causes: [
        "Backend outage or connectivity issue",
        "Backend IAM/KMS permission change",
        "State object conflict or write failure",
      ],
      evidence: [
        "Backend error and timestamp",
        "Object versioning or backup metadata",
        "Backend service health",
      ],
      recovery:
        "Restore backend access and verify the latest valid state before another apply.",
    },
  ],

  recoveryAndRollback: {
    rules: [
      "Stop concurrent applies against the same state.",
      "Confirm whether each uncertain cloud operation succeeded.",
      "Preserve the last known-good state version and incident evidence.",
      "Fix the confirmed configuration, permission, quota, or backend problem.",
      "Generate a fresh plan and review every create, update, delete, and replace action.",
      "Obtain required production approval.",
      "Apply only the reviewed plan and monitor the operation.",
      "Verify infrastructure, application health, state consistency, and drift afterward.",
    ],
    recoveryOptions: [
      {
        condition: "Configuration or input error",
        action:
          "Correct the code or variable, validate, and review the resulting plan.",
      },
      {
        condition: "IAM or policy error",
        action:
          "Correct the narrow permission or intended identity and rerun after plan review.",
      },
      {
        condition: "Quota or capacity error",
        action:
          "Resolve the specific limit, then retry only after checking for partial resources.",
      },
      {
        condition: "Resource exists but is not tracked",
        action:
          "Evaluate terraform import or the supported import block workflow. Confirm the exact " +
          "resource address and ID first; review the resulting plan.",
      },
      {
        condition: "Backend state write problem",
        action:
          "Restore backend connectivity and reconcile the current state with actual infrastructure. " +
          "Use documented state recovery/version restoration procedures only with appropriate review.",
      },
      {
        condition: "Bad infrastructure change already applied",
        action:
          "Create a reviewed corrective change or use a tested rollback procedure. A previous " +
          "configuration is not automatically safe to reapply.",
      },
    ],
    neverDo: [
      "Do not delete the remote state object to clear an error.",
      "Do not remove resources from state merely to silence a plan.",
      "Do not force-unlock while an apply may still be active.",
      "Do not run terraform destroy as a generic recovery.",
      "Do not assume Ctrl+C rolls back completed cloud operations.",
      "Do not blindly retry after timeout or partial success.",
      "Do not restore an old state snapshot without checking newer real-world changes.",
    ],
  },

  postRecoveryValidation: [
    "The intended pipeline run completes successfully.",
    "The final plan contains no unexplained destructive or replacement actions.",
    "Terraform state reflects the actual cloud resources.",
    "Critical endpoints, networking, IAM, and application health checks pass.",
    "No duplicate resources or orphaned resources remain.",
    "Cloud audit logs show no unexpected follow-up changes.",
    "No other pipeline is waiting on or competing for the same state.",
    "Monitor the environment for an agreed observation window.",
  ],

  prevention: [
    "Pin Terraform and provider versions; review lock-file changes.",
    "Run fmt, validate, lint, and policy checks in CI.",
    "Use reviewed plan artifacts and approval gates for production.",
    "Restrict production state and plan access because they may contain secrets.",
    "Use remote state with locking, versioning, encryption, and access controls.",
    "Serialize applies per state/workspace using pipeline controls.",
    "Use least-privilege deployment identities and short-lived credentials.",
    "Monitor cloud quotas, backend errors, API throttling, and deployment failure rates.",
    "Test module and provider upgrades in a non-production environment.",
    "Keep runbooks for state recovery, imports, lock recovery, and partial apply incidents.",
    "Document resource ownership and avoid unmanaged concurrent changes.",
  ],

  incidentReportTemplate: {
    title: "Terraform Apply Failure Incident",
    fields: [
      "Incident ID, severity, incident commander, and timestamps",
      "Environment, cloud account/subscription, region, workspace, and backend key",
      "Repository, commit SHA, Terraform version, and provider versions",
      "First error, failing resource address, and cloud request ID",
      "Resources changed before failure and customer impact",
      "State and backend findings",
      "Confirmed root cause and evidence",
      "Recovery plan, approvals, and changes applied",
      "Post-recovery plan and infrastructure validation",
      "Preventive actions, owners, and due dates",
    ],
  },

  interviewQuestions: [
    {
      question: "Does a failed terraform apply roll back all changes?",
      answer:
        "No. Operations completed before the failure may remain in the cloud. Inspect real resources and state.",
    },
    {
      question: "What do you do if a resource exists but is missing from state?",
      answer:
        "Confirm ownership and resource identity, then evaluate a supported import workflow and review the plan.",
    },
    {
      question: "When is force-unlock appropriate?",
      answer:
        "Only after confirming the lock belongs to a terminated or abandoned operation and no apply is active.",
    },
    {
      question: "How do you troubleshoot AccessDenied?",
      answer:
        "Verify the pipeline identity, exact denied API action, resource scope, audit log, and policy restrictions.",
    },
    {
      question: "Why is a timeout dangerous to retry blindly?",
      answer:
        "The remote API operation may have succeeded even though Terraform did not receive confirmation.",
    },
    {
      question: "What is the safest way to recover from a partial apply?",
      answer:
        "Inventory completed changes, verify state and backend health, fix the cause, generate a fresh plan, " +
        "review all actions, obtain approval, and apply the reviewed recovery.",
    },
    {
      question: "Can a saved Terraform plan contain secrets?",
      answer:
        "Yes. Treat saved plans and state as sensitive artifacts and restrict access and retention.",
    },
    {
      question: "How do you prove the incident is resolved?",
      answer:
        "Verify the final plan, real infrastructure, state consistency, application health, and stable monitoring.",
    },
  ],
} as const;

export default applyFailureGuide;
