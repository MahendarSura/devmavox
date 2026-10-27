
export const stateLocksGuide = {
  title: "Terraform State Locking Errors",
  category: "Terraform",
  filePath: "app/troubleshooting-center/terraform/StateLocks.ts",
  difficulty: "Advanced / Production SRE",

  summary:
    "Investigate Terraform state lock acquisition failures, active concurrent runs, stale locks, backend access errors, interrupted applies, and safe state recovery using evidence-driven production workflows.",

  incidentScenario: {
    title: "Production pipeline blocked by a Terraform state lock",
    scenario:
      "A production deployment pipeline fails with Error acquiring the state lock. The team sees an existing lock ID and considers force-unlocking it. Meanwhile, another CI runner may still be applying infrastructure, a previous run may have been cancelled, or the backend may be experiencing connectivity or permission problems.",
    symptoms: [
      "Error acquiring the state lock",
      "ConditionalCheckFailedException from a locking mechanism",
      "Failed to acquire state lock",
      "Error releasing the state lock",
      "State snapshot was created by a newer Terraform version",
      "Failed to read or write remote state",
      "Terraform Cloud/HCP Terraform workspace is locked",
      "Pipeline remains queued or blocked after cancellation",
      "A lock remains after a runner crashes or loses network connectivity",
      "An apply fails after making some infrastructure changes",
      "Lock acquisition works locally but fails in CI",
      "State operations fail because of backend IAM, encryption, or network problems",
    ],
    objective:
      "Identify whether the lock is protecting an active operation, is stale, or is a symptom of a backend failure. Restore safe access without allowing competing writers or losing state changes.",
  },

  coreConcepts: {
    stateLock:
      "A coordination mechanism that prevents multiple Terraform operations from simultaneously modifying the same state.",
    backend:
      "The configured state storage and coordination mechanism. Locking behavior depends on the selected backend and its configuration.",
    lockId:
      "An identifier associated with a lock. It is not proof that the lock is stale or safe to remove.",
    staleLock:
      "A lock left behind after its owning operation has ended or failed, where the backend's ownership and current execution status have been verified.",
    criticalDistinction:
      "A lock error can be a healthy safety mechanism, a stale-lock incident, or a backend access failure. Determine which case applies before changing the lock.",
    concurrency:
      "Terraform locking protects operations sharing the same state/backend locking mechanism. It does not automatically coordinate unrelated state files that manage overlapping real infrastructure.",
  },

  impactAndSeverity: {
    SEV1: [
      "Concurrent operations have already caused production infrastructure damage",
      "State may be corrupted or critical resources may be missing from state",
      "A lock was removed while another production operation was active",
    ],
    SEV2: [
      "Production deployment is blocked during an incident or critical change window",
      "Multiple teams or pipelines are competing for a shared state",
      "Backend access failures prevent critical infrastructure recovery",
    ],
    SEV3: [
      "A single workspace or non-production pipeline is blocked",
      "A stale lock requires controlled operator recovery",
    ],
    SEV4: [
      "A short-lived lock contention event resolves without impact",
    ],
    assessmentQuestions: [
      "Which repository, backend, workspace, account, and environment are affected?",
      "Is the owning apply, plan, refresh, import, or state operation still running?",
      "Did the pipeline time out, get cancelled, or lose its runner?",
      "Did the operation make any infrastructure changes before stopping?",
      "Is the failure a lock conflict or a storage, IAM, encryption, or network error?",
      "Are other teams using the same state or managing overlapping resources?",
      "Has anyone already attempted force-unlock or manual state recovery?",
    ],
  },

  safetyChecks: {
    mandatoryBeforeRecovery: [
      "Confirm the exact root module, backend, workspace, and target environment.",
      "Record the full sanitized error, lock ID, operation type, owner metadata, and timestamp.",
      "Check the CI/CD platform for active, queued, cancelled, or retrying runs.",
      "Contact the lock owner or owning team when identifiable.",
      "Check cloud audit logs and backend activity around the failure.",
      "Determine whether an apply could have partially changed remote infrastructure.",
      "Coordinate a deployment pause if multiple writers are competing for the same state.",
      "Preserve state recovery information through the approved backend procedure.",
      "Obtain the required approval before force-unlocking or restoring state.",
    ],
    neverDo: [
      "Never force-unlock merely because a pipeline is waiting.",
      "Never delete an S3 lock object manually as a routine fix.",
      "Never delete or overwrite the Terraform state file to clear a lock.",
      "Never run two applies against the same state to test whether the lock works.",
      "Never use -lock=false for normal production troubleshooting.",
      "Never assume a cancelled CI job means its Terraform process has stopped.",
      "Never restore an older state snapshot without reconciling subsequent infrastructure changes.",
      "Never expose state files, saved plans, credentials, or sensitive lock metadata in public logs.",
    ],
  },

  evidenceCollection: {
    capture: [
      "Incident ID, UTC timestamps, severity, and deployment run URL",
      "Terraform CLI version, runner image, repository, and commit SHA",
      "Backend type, workspace, state key or workspace identifier",
      "Lock ID and available lock metadata",
      "Operation type and the process or pipeline that initiated it",
      "CI runner status, cancellation history, retries, and process exit code",
      "Backend storage/API status, request IDs, and relevant audit events",
      "IAM/RBAC policy changes, encryption/KMS errors, and network diagnostics",
      "Last successful apply and last known-good state recovery point",
      "Cloud resources changed during any failed or interrupted apply",
    ],
    redaction:
      "Remove secrets, tokens, credentials, and sensitive resource attributes. Share lock and state metadata only through approved internal channels.",
  },

  diagnosticDecisionTree: [
    {
      stage: "1. Confirm the execution context",
      commands: [
        "terraform version",
        "git status --short",
        "git rev-parse --show-toplevel",
        "git rev-parse HEAD",
        "terraform workspace show",
      ],
      interpretation: [
        "If the root module or commit is wrong, stop and correct the execution context.",
        "If the workspace is unexpected, do not run state-changing commands.",
        "Workspace output alone does not prove that the intended backend or production account is selected.",
      ],
      next:
        "Verify backend configuration and target cloud identity using the organization's approved procedure.",
    },
    {
      stage: "2. Identify the locking backend",
      actions: [
        "Inspect the backend configuration and Terraform CLI configuration.",
        "Determine whether state is stored in an S3 backend, HCP Terraform/Terraform Cloud, Azure Storage, GCS, or another supported backend.",
        "Confirm the configured locking mechanism and any organization-specific state service.",
        "Check whether multiple repositories or pipelines share the same state.",
      ],
      interpretation: [
        "Different backends use different locking and recovery mechanisms.",
        "Do not apply S3-specific lock recovery instructions to Terraform Cloud or another backend.",
        "A state key or workspace mismatch can make an operator investigate the wrong lock.",
      ],
    },
    {
      stage: "3. Determine whether the lock owner is active",
      actions: [
        "Inspect CI/CD runs and identify the run that acquired the lock.",
        "Check whether the runner or Terraform process is still running.",
        "Inspect run timestamps, cancellation status, retries, and logs.",
        "Contact the owning team if the owner cannot be determined from available metadata.",
      ],
      decision: [
        "If the operation is active, allow it to finish or coordinate an approved cancellation.",
        "If the run was cancelled, verify that the underlying Terraform process actually stopped.",
        "If the operation has ended, investigate whether a stale lock remains.",
        "If the owner cannot be confirmed, escalate rather than force-unlocking blindly.",
      ],
    },
    {
      stage: "4. Separate contention from backend failure",
      symptoms: [
        "Lock already held",
        "Permission denied",
        "AccessDenied",
        "Timeout connecting to backend",
        "KMS or encryption error",
        "State read/write failure",
      ],
      actions: [
        "Read the complete sanitized error and identify the exact failing backend operation.",
        "Check the backend service, permissions, encryption key access, network path, and relevant audit logs.",
        "Compare with a known-good runner using the same backend and workspace.",
      ],
      interpretation: [
        "A lock held by another operation is different from an inability to access the locking service.",
        "A storage permission failure is not repaired by force-unlock.",
        "A network timeout does not prove that a previous state write or cloud operation failed.",
      ],
    },
    {
      stage: "5. Check for partial infrastructure changes",
      actions: [
        "Review the interrupted run's logs to determine the last completed resource operation.",
        "Inspect cloud audit history and actual remote resource status.",
        "Read the current state using the approved backend procedure.",
        "Compare resource addresses and remote IDs without exposing sensitive state contents.",
      ],
      decision: [
        "If the apply is still active, coordinate with its owner.",
        "If the apply stopped after changing resources, reconcile actual infrastructure and state before retrying.",
        "If state integrity is uncertain, stop writes and follow the backend-specific recovery procedure.",
      ],
    },
    {
      stage: "6. Select the safest resolution",
      actions: [
        "Active operation: wait or coordinate controlled cancellation.",
        "Backend outage or permission issue: repair backend access.",
        "Stale lock: follow the backend-specific stale-lock recovery procedure.",
        "Partially completed apply: reconcile remote resources and state.",
        "Suspected state corruption: preserve backups and escalate to the state/backend owner.",
      ],
      next:
        "After recovery, run a reviewed plan and verify that the state and actual infrastructure are consistent.",
    },
  ],

  backendSpecificGuidance: {
    s3: {
      title: "Amazon S3 backend",
      checks: [
        "Verify the configured bucket, key, workspace path, and AWS account.",
        "Check S3 permissions for the state object and configured lock mechanism.",
        "If S3 native lockfile locking is enabled, verify access to the corresponding lock object.",
        "If a legacy DynamoDB locking configuration is in use, verify the table, permissions, and relevant conditional-write errors.",
        "Check KMS permissions if the state or lock object uses customer-managed encryption.",
        "Review CloudTrail and S3/backend errors around the failure.",
      ],
      guidance: [
        "Use the locking configuration actually defined by the backend.",
        "S3 native lockfile support is available in modern Terraform versions; DynamoDB-based S3 locking is deprecated in current Terraform documentation. Verify your deployed version and migration plan before changing backend settings.",
        "Do not delete an S3 lock object or DynamoDB lock record manually as the first-line response.",
        "Ensure all pipelines use a compatible, consistently configured backend.",
      ],
    },
    terraformCloud: {
      title: "HCP Terraform / Terraform Cloud",
      checks: [
        "Inspect the workspace's current and queued runs.",
        "Identify whether a run is planning, applying, waiting for approval, or cancelling.",
        "Review workspace permissions and run-task or policy-check failures.",
        "Check whether an operator or another pipeline owns the current run.",
      ],
      guidance: [
        "Use the platform's supported run cancellation and workspace recovery controls.",
        "Resolve the owning run through the workspace interface or approved API workflow.",
        "Do not attempt to delete remote state or manipulate backend internals to unlock a workspace.",
        "Check workspace queue behavior and automation concurrency controls.",
      ],
    },
    azureStorage: {
      title: "Azure Storage backend",
      checks: [
        "Verify storage account, container, state key, and subscription.",
        "Check the approved authentication method and blob permissions.",
        "Inspect lease-related errors, network restrictions, and storage availability.",
        "Check Azure activity logs and relevant storage diagnostics.",
      ],
      guidance: [
        "Follow the backend's documented lease and state recovery procedure.",
        "Do not break a storage lease without verifying the owner and active operation.",
        "Restore authentication, connectivity, or permissions before retrying.",
      ],
    },
    gcs: {
      title: "Google Cloud Storage backend",
      checks: [
        "Verify the bucket, prefix, workspace, and project.",
        "Check the identity used by the runner and its required storage permissions.",
        "Inspect network, bucket access, and backend errors.",
        "Review audit logs for concurrent state operations where available.",
      ],
      guidance: [
        "Follow the documented GCS backend locking and recovery behavior for the Terraform version in use.",
        "Do not manually remove backend objects to clear an apparent lock.",
        "Verify state integrity and ownership before retrying.",
      ],
    },
  },

  safeCommandSequence: {
    note:
      "These commands help confirm context and configuration. Backend-specific recovery steps must be selected only after identifying the backend and confirming the owner is inactive.",
    commands: [
      {
        command: "terraform version",
        purpose: "Record Terraform CLI version.",
        risk: "Low",
      },
      {
        command: "git status --short",
        purpose: "Check uncommitted configuration changes.",
        risk: "Low",
      },
      {
        command: "git rev-parse HEAD",
        purpose: "Record the exact commit.",
        risk: "Low",
      },
      {
        command: "terraform workspace show",
        purpose: "Identify the selected workspace.",
        risk: "Low; does not independently prove backend identity.",
      },
      {
        command: "terraform providers",
        purpose: "Inspect provider requirements across modules.",
        risk: "Low; does not diagnose every backend locking problem.",
      },
      {
        command: "terraform plan",
        purpose: "Review proposed infrastructure changes after the lock/backend issue is resolved.",
        risk: "Read-only with respect to intended resource changes, but it can query APIs and refresh observed values.",
      },
    ],
    warning:
      "Do not repeatedly run plan or apply as a lock test. Resolve ownership and backend health first.",
  },

  forceUnlockProcedure: {
    purpose:
      "Force-unlock is a recovery operation for a lock known to belong to an operation that is no longer running. It is not a method to bypass a healthy lock.",
    prerequisites: [
      "Confirm the correct backend, workspace, and lock ID.",
      "Confirm the owning Terraform operation has terminated.",
      "Check all relevant CI runners, local processes, queued retries, and remote runs.",
      "Coordinate with the state owner and obtain required production approval.",
      "Check whether the interrupted operation may have partially changed infrastructure.",
      "Preserve state recovery information and incident evidence.",
    ],
    commandTemplate:
      "terraform force-unlock LOCK_ID",
    commandNotes: [
      "Replace LOCK_ID with the exact lock ID reported by Terraform.",
      "Run only from the correct root module and backend context.",
      "The command prompts for confirmation unless -force is used; do not use -force merely to skip that safeguard.",
      "Do not run this command if an active operation may still own the lock.",
      "Some remote backends have their own run/workspace controls; use those controls where required.",
    ],
    afterUnlock: [
      "Verify that the lock is released using the supported backend mechanism.",
      "Confirm no other operation acquired the lock unexpectedly.",
      "Inspect remote infrastructure and current state if the previous operation was interrupted.",
      "Run a fresh plan and review every proposed action.",
      "Apply only through the approved deployment process.",
      "Record who authorized and performed the recovery and why it was safe.",
    ],
  },

  rootCauseMatrix: [
    {
      symptom: "Lock is already held",
      likelyCauses: [
        "Another active Terraform run",
        "Concurrent pipelines",
        "A stale lock after a crashed process",
      ],
      evidence: [
        "CI run status",
        "Lock metadata",
        "Runner/process status",
      ],
      resolution:
        "Wait for the active operation or follow the verified stale-lock recovery process.",
    },
    {
      symptom: "Lock acquisition fails with permission denied",
      likelyCauses: [
        "Missing backend permissions",
        "Incorrect role or identity",
        "Encryption key permissions",
      ],
      evidence: [
        "Backend API error",
        "Identity metadata",
        "IAM/RBAC and KMS policy",
      ],
      resolution:
        "Repair the minimum required backend permissions; do not remove the lock to bypass access controls.",
    },
    {
      symptom: "Lock acquisition times out",
      likelyCauses: [
        "Backend service or network problem",
        "Active lock contention",
        "Runner cannot reach the backend endpoint",
      ],
      evidence: [
        "Backend service health",
        "Network diagnostics",
        "Active run history",
      ],
      resolution:
        "Identify whether the request is blocked by contention or connectivity before retrying.",
    },
    {
      symptom: "Lock remains after cancellation",
      likelyCauses: [
        "Terraform process did not stop",
        "Runner was terminated unexpectedly",
        "Backend cleanup did not complete",
      ],
      evidence: [
        "Process and runner status",
        "Cancellation logs",
        "Backend lock metadata",
      ],
      resolution:
        "Confirm the owner is inactive, inspect possible partial changes, then use the backend-specific recovery procedure.",
    },
    {
      symptom: "State write fails after apply operations",
      likelyCauses: [
        "Backend outage",
        "Permission or encryption failure",
        "Network interruption",
        "State storage problem",
      ],
      evidence: [
        "Apply logs",
        "Backend API/audit logs",
        "Actual cloud resource status",
      ],
      resolution:
        "Preserve evidence and reconcile remote resources and state before any retry or restoration.",
    },
    {
      symptom: "Only CI fails to acquire locks",
      likelyCauses: [
        "Different backend configuration",
        "Different credentials or permissions",
        "Multiple pipeline runs",
        "Different workspace or state key",
      ],
      evidence: [
        "Runner configuration",
        "Backend settings",
        "Workspace and key",
        "Concurrent run history",
      ],
      resolution:
        "Standardize backend configuration and pipeline concurrency controls.",
    },
    {
      symptom: "State appears inconsistent after force-unlock",
      likelyCauses: [
        "Another operation was still active",
        "An apply partially completed",
        "State writes or remote operations overlapped",
      ],
      evidence: [
        "Run timelines",
        "Audit events",
        "Current state and remote resources",
      ],
      resolution:
        "Stop further writes, preserve state snapshots, escalate to the backend/state owner, and perform controlled reconciliation.",
    },
  ],

  recoveryAndRollback: {
    principle:
      "Terraform state locking prevents concurrent operations; it is not a transactional rollback mechanism. Clearing a lock does not reverse infrastructure changes.",
    procedure: [
      "Stop uncontrolled retries and identify the owning run.",
      "Confirm that the owner has stopped before any stale-lock recovery.",
      "Inspect backend health, permissions, and lock metadata.",
      "Inspect actual infrastructure if the previous operation was interrupted.",
      "Use the backend's documented recovery method.",
      "Preserve and validate state backups before any restoration.",
      "Generate a fresh plan and inspect destructive actions.",
      "Obtain approval, run the controlled deployment, and verify service health.",
    ],
    neverDo: [
      "Do not delete the state file.",
      "Do not restore an old snapshot blindly.",
      "Do not use -lock=false as a production workaround.",
      "Do not repeatedly force-unlock and retry.",
      "Do not assume the lock was the only failure when state writes or apply operations also failed.",
    ],
  },

  prevention: {
    pipelineControls: [
      "Serialize production applies for each state using CI/CD concurrency controls.",
      "Use consistent backend and workspace configuration across runners.",
      "Prevent automatic retries from starting duplicate Terraform processes while an earlier run may still be active.",
      "Pin the Terraform CLI version and use reviewed provider lock files.",
      "Require approval for production applies and state recovery operations.",
      "Make cancellation handling wait for or verify process termination.",
    ],
    backendOperations: [
      "Monitor backend availability, authorization failures, lock contention, and state write errors.",
      "Use least-privilege backend identities.",
      "Maintain protected state backups and test recovery procedures.",
      "Document backend-specific lock behavior and escalation contacts.",
      "Review Terraform CLI and backend upgrade notes before changing locking configuration.",
      "Avoid manual modifications to backend lock objects.",
    ],
    observability: [
      "Record run ID, workspace, backend identifier, start time, and outcome for each operation.",
      "Alert on repeated lock contention or unusually long-running applies.",
      "Correlate state lock incidents with runner failures and backend API errors.",
      "Track force-unlock operations and require a reason and approval record.",
    ],
  },

  incidentReportTemplate: {
    incidentId: "",
    severity: "",
    detectedAtUtc: "",
    repositoryAndCommit: "",
    terraformVersion: "",
    backendType: "",
    workspaceAndStateKey: "",
    lockId: "",
    owningRunAndOperator: "",
    activeOperationConfirmed: "",
    backendErrorAndRequestId: "",
    infrastructureChangesDuringFailure: "",
    rootCause: "",
    recoveryAction: "",
    forceUnlockApprovalAndReason: "",
    stateIntegrityValidation: "",
    postRecoveryPlan: "",
    applicationHealthValidation: "",
    preventionActions: [],
    ownerAndDueDate: "",
  },

  practicalLabs: [
    {
      title: "Concurrent state operations",
      task:
        "In a disposable backend, start a controlled long-running Terraform operation and attempt a second operation against the same state.",
      expectedLearning:
        "Understand how locking protects state and how pipeline concurrency controls reduce collisions.",
    },
    {
      title: "Stale lock simulation",
      task:
        "Use a disposable workspace and a controlled interruption to study the documented stale-lock recovery procedure.",
      expectedLearning:
        "Verify the owner has stopped before recovery and document the decision process.",
    },
    {
      title: "Backend permission failure",
      task:
        "In a sandbox, remove a narrowly scoped backend permission and observe the error.",
      expectedLearning:
        "Distinguish backend access failure from a healthy lock held by another operation.",
    },
    {
      title: "Runner cancellation",
      task:
        "Cancel a controlled test pipeline and verify whether the underlying Terraform process actually terminated.",
      expectedLearning:
        "Understand why a cancelled job does not always prove that all work stopped.",
    },
    {
      title: "Interrupted apply reconciliation",
      task:
        "In a sandbox, interrupt a controlled apply and inspect remote resources, state, and audit logs.",
      expectedLearning:
        "Reconcile partial changes rather than assuming automatic rollback.",
    },
  ],

  interviewQuestions: [
    {
      question: "Why does Terraform lock state?",
      expectedAnswer:
        "To prevent concurrent operations from modifying the same state and causing conflicting state writes.",
    },
    {
      question: "What causes Error acquiring the state lock?",
      expectedAnswer:
        "An active competing operation, stale lock, backend access problem, or locking-service failure. The exact error and backend must be investigated.",
    },
    {
      question: "When is terraform force-unlock safe?",
      expectedAnswer:
        "Only when the lock is confirmed stale, the owning operation is no longer active, the backend/workspace is correct, and the recovery is approved.",
    },
    {
      question: "Does force-unlock undo infrastructure changes?",
      expectedAnswer:
        "No. It removes a lock; it does not roll back remote resources or reconcile state.",
    },
    {
      question: "Why is -lock=false dangerous in production?",
      expectedAnswer:
        "It bypasses normal locking and can allow competing operations to modify the same state concurrently.",
    },
    {
      question: "What should you do after a runner crashes during apply?",
      expectedAnswer:
        "Confirm process termination, inspect the lock and backend, determine which infrastructure operations succeeded, and reconcile state before retrying.",
    },
    {
      question: "Does Terraform locking prevent two state files from managing the same resource?",
      expectedAnswer:
        "Not necessarily. Separate state files may each have their own locks while still managing overlapping real infrastructure.",
    },
    {
      question: "How do you prevent recurring lock contention?",
      expectedAnswer:
        "Serialize applies per state, standardize backend configuration, prevent duplicate retries, monitor long-running jobs, and improve cancellation handling.",
    },
  ],

  completionChecklist: [
    "Correct repository, root module, backend, workspace, and target environment confirmed",
    "Severity and deployment impact documented",
    "Lock ID and sanitized error evidence captured",
    "Owning operation and runner status checked",
    "Lock contention distinguished from backend access failure",
    "Partial infrastructure changes assessed",
    "Backend-specific recovery procedure selected",
    "Force-unlock used only if stale ownership is verified and approved",
    "State integrity and actual infrastructure checked",
    "Fresh plan reviewed before any apply",
    "Application health and infrastructure validated",
    "Incident report and prevention actions assigned",
  ],
} as const;

export default stateLocksGuide;
