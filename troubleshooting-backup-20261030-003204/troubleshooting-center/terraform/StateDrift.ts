
export const stateDriftGuide = {
  title: "Terraform State Drift",
  category: "Terraform",
  filePath: "app/troubleshooting-center/terraform/StateDrift.ts",
  difficulty: "Advanced / Production SRE",
  summary:
    "Detect, investigate, classify, reconcile, and prevent Terraform state drift without accidentally overwriting valid production changes or replacing critical infrastructure.",

  incidentScenario: {
    title: "Production infrastructure changed outside Terraform",
    scenario:
      "A production Terraform pipeline worked yesterday. Today, terraform plan shows unexpected updates and resource replacements. An engineer recently changed a security group through the cloud console, another team modified an instance size, and a previous apply timed out after creating a resource.",
    symptoms: [
      "Terraform plan shows unexpected in-place updates",
      "Terraform proposes replacing a production resource",
      "A manually created resource is not tracked in state",
      "A resource exists in Terraform state but no longer exists in the cloud",
      "The cloud resource has different attributes from the configuration",
      "A failed apply may have partially changed infrastructure",
      "Different workspaces or pipelines report conflicting changes",
      "Refresh-only plan detects changes even though Git has not changed",
      "A resource was imported under the wrong address or identifier",
      "The state serial or resource inventory changed unexpectedly",
    ],
    objective:
      "Determine whether the mismatch is configuration drift, out-of-band infrastructure change, stale or incorrect state, a provider read issue, or an incomplete previous deployment. Restore a safe and explainable relationship between configuration, state, and actual infrastructure.",
  },

  coreConcepts: {
    configuration:
      "The desired infrastructure described by Terraform configuration and module inputs.",
    state:
      "Terraform's recorded mapping between configuration resource addresses and real infrastructure objects, including provider-specific identifiers and attributes.",
    actualInfrastructure:
      "The resources and attributes currently observed in the cloud provider or external system.",
    drift:
      "A difference between the desired configuration and actual infrastructure, or an observed remote change relative to previously recorded state.",
    importantDistinction:
      "Terraform state is not the infrastructure itself, and a state mismatch does not automatically mean the state file is corrupt.",
    threeWayComparison: [
      {
        comparison: "Configuration vs actual infrastructure",
        meaning: "Shows whether reality matches the intended configuration.",
      },
      {
        comparison: "State vs actual infrastructure",
        meaning: "Shows whether Terraform's recorded information is stale or inconsistent with remote reality.",
      },
      {
        comparison: "Configuration vs state",
        meaning: "Shows what Terraform may propose changing, but the plan and provider refresh behavior must be interpreted in context.",
      },
    ],
  },

  impactAndSeverity: {
    SEV1: [
      "Drift has caused an active production outage or security exposure",
      "Critical resources may be destroyed, replaced, or rendered inaccessible",
      "State integrity is uncertain and concurrent changes could cause data loss",
    ],
    SEV2: [
      "Production resources differ materially from the approved baseline",
      "Security groups, IAM permissions, network routes, encryption, or backups have changed unexpectedly",
      "Multiple production workspaces are affected",
    ],
    SEV3: [
      "A non-production environment has drift or an isolated production resource needs controlled reconciliation",
    ],
    SEV4: [
      "A documented, low-risk difference has no material service or security impact",
    ],
    assessmentQuestions: [
      "Which account, subscription, project, region, workspace, and resources are affected?",
      "Is the mismatch creating an outage, security exposure, cost increase, or compliance violation?",
      "Was the change approved, and who or what made it?",
      "Did a recent apply, import, destroy, migration, or provider upgrade occur?",
      "Is another team or pipeline currently changing the same infrastructure?",
      "Does the proposed plan include deletion or replacement of stateful resources?",
      "Is the actual infrastructure currently serving production traffic?",
    ],
  },

  safetyChecks: {
    beforeInvestigation: [
      "Confirm repository, Git branch, commit SHA, root module, backend, and workspace.",
      "Confirm the cloud account, project, subscription, and region.",
      "Pause or coordinate conflicting applies to the same state using the team's incident procedure.",
      "Capture the current pipeline logs and exact Terraform plan output.",
      "Check the last successful apply and any failed or interrupted runs.",
      "Preserve state recovery information through the approved backend procedure.",
      "Check cloud audit logs for manual changes and identify the responsible principal where available.",
      "Obtain production approval before changes that modify, delete, replace, or import resources.",
    ],
    prohibitedShortcuts: [
      "Do not run terraform apply simply to make the plan disappear.",
      "Do not delete the state file or remove resources from state just because drift exists.",
      "Do not manually edit state JSON as the first recovery option.",
      "Do not restore an old state backup without checking changes made since that backup.",
      "Do not use -target as a routine drift-repair strategy.",
      "Do not use -refresh=false to hide drift and then assume the plan is safe.",
      "Do not force-unlock a state lock unless it is verified stale and the owner approves.",
      "Do not blindly run terraform import against an address already managed in state.",
    ],
    sensitiveData:
      "State files and saved plans can contain sensitive information. Store, transfer, inspect, and share them only through approved protected workflows. Redact secrets and sensitive identifiers from incident evidence.",
  },

  evidenceCollection: {
    requiredEvidence: [
      "Incident ID, severity, detection time, and affected services",
      "Repository URL, commit SHA, Terraform CLI version, and provider selections",
      "Backend identity and workspace",
      "Sanitized terraform plan output and the exact resource addresses involved",
      "Last successful plan/apply and failed-run logs",
      "Cloud audit events, API request IDs, actor identity, and timestamps",
      "Actual remote resource IDs and relevant attributes",
      "Terraform configuration and module changes",
      "Provider version, schema, and upgrade history",
      "State lineage and serial from approved state metadata where available",
      "Recent imports, moves, replacements, manual changes, and recovery operations",
      "Change ticket, approval record, and known maintenance activity",
    ],
    evidenceRules: [
      "Use timestamps and request IDs to correlate Terraform and cloud audit logs.",
      "Preserve the original failure before retrying or changing infrastructure.",
      "Never upload raw state or plan files to public issue trackers.",
      "Do not print complete environment variables or cloud credentials.",
    ],
  },

  diagnosticWorkflow: [
    {
      step: 1,
      name: "Verify the execution context",
      commands: [
        "terraform version",
        "git status --short",
        "git rev-parse --show-toplevel",
        "git rev-parse HEAD",
        "terraform workspace show",
      ],
      interpretation: [
        "If the repository, commit, or root module is wrong, correct the execution context before interpreting drift.",
        "If the workspace is unexpected, stop before any operation that can modify infrastructure.",
        "A correct workspace name alone does not prove the backend points to the intended environment.",
      ],
      next:
        "Confirm the backend configuration and target account using the organization's approved procedure.",
    },
    {
      step: 2,
      name: "Capture the current plan safely",
      commands: [
        "terraform plan -detailed-exitcode",
      ],
      interpretation: [
        "Exit code 0: no changes are proposed by this plan.",
        "Exit code 2: changes are proposed; inspect the complete plan.",
        "Exit code 1: planning failed; investigate the error before making changes.",
        "A plan with changes does not by itself prove the cause is manual drift.",
        "Do not apply a plan merely because it completed successfully.",
      ],
      next:
        "Identify the exact resource addresses, changed attributes, replacement indicators, and any refresh diagnostics.",
    },
    {
      step: 3,
      name: "Inspect resource ownership and provider mapping",
      commands: [
        "terraform state list",
        "terraform providers",
      ],
      interpretation: [
        "Confirm the affected resource address exists in the expected state.",
        "Check module paths, for_each keys, count indices, and provider aliases.",
        "A changed address may indicate a refactor or missing moved/import workflow rather than a remote resource change.",
        "Do not expose the full state in logs or tickets.",
      ],
      next:
        "Determine whether the resource is tracked, untracked, missing remotely, or associated with an unexpected address.",
    },
    {
      step: 4,
      name: "Compare the real resource",
      actions: [
        "Inspect the resource through the cloud console, approved CLI, API, or audit tooling.",
        "Verify resource ID, account, region, important attributes, dependencies, and service health.",
        "Check whether the resource is active and serving traffic.",
        "Compare the actual values with configuration and the plan's proposed actions.",
      ],
      interpretation: [
        "If the actual value differs from configuration, determine whether the difference is approved or unauthorized.",
        "If the actual resource is absent, verify the account, region, identifier, deletion event, and permissions.",
        "If Terraform reports a change but the actual resource appears unchanged, investigate provider normalization, computed attributes, eventual consistency, and provider defects.",
      ],
    },
    {
      step: 5,
      name: "Correlate cloud audit history",
      actions: [
        "Search audit logs around the first known mismatch.",
        "Identify the actor, API operation, resource ID, timestamp, and change request.",
        "Correlate the event with pipeline runs, console activity, automated controllers, and deployment systems.",
        "Check whether the operation succeeded, partially succeeded, or was later reversed.",
      ],
      interpretation: [
        "A matching audit event supports an out-of-band change hypothesis.",
        "No matching event does not prove no change occurred; audit retention, permissions, and service coverage may be incomplete.",
        "A change made by another automation system may be intentional and should be coordinated with its owner.",
      ],
    },
    {
      step: 6,
      name: "Classify the mismatch",
      categories: [
        "Approved manual change: update configuration if the new value is intended.",
        "Unauthorized manual change: assess security and service impact, then restore the approved baseline or formally adopt the change.",
        "Stale state after partial apply: inspect actual resources and reconcile state using supported workflows.",
        "Untracked resource: determine ownership and use import if Terraform should manage it.",
        "Missing remote resource: verify deletion and decide whether recreation is intended.",
        "Configuration refactor: review resource address moves and module changes.",
        "Provider behavior change: investigate version differences, computed fields, and schema changes.",
        "Wrong workspace or account: stop and correct the target context.",
      ],
      next:
        "Record the evidence supporting the selected category before making changes.",
    },
    {
      step: 7,
      name: "Choose a recovery strategy",
      actions: [
        "If the actual change is intended, update configuration and review the resulting plan.",
        "If the actual change is unauthorized, follow the security/change-management procedure to restore the approved configuration.",
        "If the resource is untracked, consider a supported import workflow.",
        "If state mapping is wrong, use supported state move/import/removal commands only after reviewing their exact semantics and obtaining approval.",
        "If state integrity is uncertain, stop and follow the backend's documented recovery procedure.",
      ],
      next:
        "Create a fresh plan after the correction and inspect every destructive or replacement action.",
    },
    {
      step: 8,
      name: "Validate recovery",
      actions: [
        "Run the relevant configuration validation checks.",
        "Generate a fresh plan against the intended backend and workspace.",
        "Review all create, update, delete, and replacement actions.",
        "Obtain required production approval before apply.",
        "Verify cloud resource health, Terraform state consistency, application behavior, security controls, and monitoring.",
        "Record the final plan result and recovery evidence.",
      ],
    },
  ],

  refreshOnlyWorkflow: {
    purpose:
      "A refresh-only plan evaluates how Terraform's state would be updated to reflect observed remote changes without proposing configuration-driven infrastructure changes.",
    commands: [
      "terraform plan -refresh-only",
      "terraform plan -refresh-only -out=refresh-only.tfplan",
      "terraform show refresh-only.tfplan",
    ],
    safeProcedure: [
      "Verify the backend, workspace, account, and provider credentials.",
      "Inspect the refresh-only plan and confirm that the observed values correspond to real infrastructure.",
      "Determine whether the changes are approved and whether configuration should also be updated.",
      "Protect any saved plan file because it may contain sensitive information.",
      "Only apply the reviewed refresh-only plan if the state update is intended and approved.",
      "After reconciliation, run a normal terraform plan to discover remaining configuration drift.",
    ],
    criticalDistinction:
      "A refresh-only operation updates Terraform's recorded knowledge of remote objects; it does not make the configuration match those objects. A subsequent normal plan may still propose changes.",
    avoidWhen: [
      "The target account or workspace is uncertain.",
      "The provider is returning unreliable or incomplete reads.",
      "The resource identity is wrong or remote ownership is unclear.",
      "The state is potentially corrupted and backend recovery is required.",
    ],
  },

  rootCauseMatrix: [
    {
      symptom: "Unexpected in-place update",
      likelyCauses: [
        "Manual console/API change",
        "Changed module variable or configuration",
        "Provider normalization or computed attribute change",
      ],
      evidence: [
        "Plan attribute diff",
        "Cloud audit history",
        "Git diff and provider release notes",
      ],
      fix:
        "Decide whether to adopt the real value or restore the approved baseline, then verify the fresh plan.",
    },
    {
      symptom: "Unexpected resource replacement",
      likelyCauses: [
        "An immutable attribute changed",
        "Resource identifier or provider behavior changed",
        "A module refactor changed resource identity",
      ],
      evidence: [
        "Replacement markers in plan",
        "Configuration diff",
        "Provider version and resource documentation",
      ],
      fix:
        "Determine the exact replacement trigger; do not apply until service impact and replacement approval are clear.",
    },
    {
      symptom: "Resource exists remotely but not in state",
      likelyCauses: [
        "Interrupted apply",
        "Manual creation",
        "State migration or wrong workspace",
      ],
      evidence: [
        "Cloud resource ID",
        "Previous pipeline logs",
        "Workspace/backend identity",
      ],
      fix:
        "Verify ownership and identity; use the supported import or state recovery workflow if appropriate.",
    },
    {
      symptom: "Resource is in state but missing remotely",
      likelyCauses: [
        "Manual deletion",
        "Wrong account or region",
        "Incomplete permissions or failed provider read",
      ],
      evidence: [
        "Cloud audit event",
        "Target account and region",
        "Provider read diagnostics",
      ],
      fix:
        "Confirm absence and intent before allowing Terraform to recreate or remove its state mapping.",
    },
    {
      symptom: "Plan repeatedly shows the same changes",
      likelyCauses: [
        "Provider normalization or eventual consistency",
        "Another controller continuously changes the resource",
        "Incorrect configuration or provider defect",
      ],
      evidence: [
        "Repeated plan diffs",
        "Remote API values",
        "Audit logs and provider release notes",
      ],
      fix:
        "Find the recurring writer or provider behavior; do not repeatedly apply without explaining the loop.",
    },
    {
      symptom: "Unexpected changes across many resources",
      likelyCauses: [
        "Wrong workspace or cloud account",
        "Provider upgrade",
        "Changed shared module defaults",
        "State/backend mismatch",
      ],
      evidence: [
        "Identity and backend checks",
        "Lock-file diff",
        "Module changes",
        "Resource IDs and regions",
      ],
      fix:
        "Stop production apply, correct the execution context or dependency issue, and regenerate the plan.",
    },
    {
      symptom: "Refresh-only plan reports surprising values",
      likelyCauses: [
        "Actual remote changes",
        "Provider read or normalization behavior",
        "Incomplete permissions or stale API responses",
      ],
      evidence: [
        "Direct remote inspection",
        "Provider version",
        "API diagnostics",
      ],
      fix:
        "Validate the remote values before accepting them into state.",
    },
  ],

  recoveryPatterns: {
    approvedOutOfBandChange: [
      "Confirm the change has formal approval.",
      "Update Terraform configuration to represent the intended desired state.",
      "Review module inputs, policies, and dependent resources.",
      "Generate a fresh plan and confirm no unintended replacements or deletions.",
      "Apply through the approved deployment pipeline when necessary.",
    ],
    unauthorizedOutOfBandChange: [
      "Assess outage, security, compliance, and data-integrity impact.",
      "Preserve cloud audit evidence and follow the incident-response process.",
      "Coordinate with service owners before restoring the approved baseline.",
      "Use the appropriate cloud/API or Terraform workflow with approval.",
      "Validate service health and verify the unauthorized change is contained.",
    ],
    untrackedResource: [
      "Verify the remote resource's owner, ID, account, region, and configuration.",
      "Confirm the resource should be managed by this Terraform root module.",
      "Review the resource type's import documentation and required identifier format.",
      "Import using the supported workflow into the intended resource address.",
      "Inspect state mapping and run a plan before any apply.",
      "Correct configuration until the plan reflects the intended ownership and lifecycle.",
    ],
    partialApply: [
      "Stop blind retries and identify the last run that may have made changes.",
      "Inspect actual cloud resources and audit events.",
      "Inspect Terraform state through the approved backend process.",
      "Determine which resources were successfully created, updated, or deleted.",
      "Reconcile using supported import or state recovery workflows where needed.",
      "Generate a fresh plan and obtain approval before applying remaining changes.",
    ],
    stateRecovery: [
      "Restrict concurrent writes to the affected state according to incident procedures.",
      "Preserve the current state and available protected backups.",
      "Identify the last known-good state snapshot and the changes made since then.",
      "Follow backend-specific documented restoration or recovery steps.",
      "Verify resource mappings, lineage/serial metadata where applicable, and actual cloud infrastructure.",
      "Run a reviewed plan and validate the application before closing the incident.",
    ],
  },

  importantCommandNotes: [
    {
      command: "terraform plan -refresh-only",
      purpose:
        "Review how state would be updated to reflect remote observations.",
      warning:
        "It does not change remote infrastructure and does not guarantee configuration will match afterward.",
    },
    {
      command: "terraform plan -refresh=false",
      purpose:
        "Skip normal refresh behavior for a specialized, informed workflow.",
      warning:
        "Can hide current remote changes and produce an incomplete or misleading plan; not a general drift fix.",
    },
    {
      command: "terraform state list",
      purpose:
        "List resource addresses tracked in the selected state.",
      warning:
        "Verify the correct backend and workspace first.",
    },
    {
      command: "terraform state show ADDRESS",
      purpose:
        "Inspect attributes for a tracked resource.",
      warning:
        "Output can contain sensitive values. Handle it as sensitive data.",
    },
    {
      command: "terraform import ADDRESS ID",
      purpose:
        "Associate an existing supported remote object with a Terraform resource address.",
      warning:
        "Import does not automatically generate correct configuration or guarantee a no-op plan. Confirm the exact ID and address first.",
    },
    {
      command: "terraform state rm ADDRESS",
      purpose:
        "Remove a resource binding from state without deleting the remote object.",
      warning:
        "This changes state and may cause Terraform to treat the remote resource as unmanaged; never use it as a generic drift repair.",
    },
    {
      command: "terraform state mv SOURCE DESTINATION",
      purpose:
        "Move a state address during supported refactors or ownership changes.",
      warning:
        "Review address semantics and coordinate state operations. Use configuration moved blocks where appropriate for tracked refactors.",
    },
  ],

  prevention: {
    governance: [
      "Define whether manual production changes are prohibited, restricted, or permitted under emergency procedures.",
      "Document ownership for shared resources and avoid competing Terraform roots managing the same object.",
      "Use least-privilege roles and separate human access from deployment identities.",
      "Record change tickets, approvals, and emergency changes.",
      "Maintain a tested state-backend backup and recovery procedure.",
    ],
    ciCd: [
      "Run Terraform plans on pull requests and require review for destructive changes.",
      "Pin Terraform CLI and provider selections using a reviewed dependency lock file.",
      "Serialize applies against the same state.",
      "Validate the target workspace and cloud identity before deployment.",
      "Use policy-as-code to block prohibited changes.",
      "Run scheduled drift detection with approved read permissions.",
      "Separate drift alerts from automatic remediation unless the resource class has an explicitly approved auto-remediation policy.",
    ],
    monitoring: [
      "Monitor cloud audit events for out-of-band changes to critical resources.",
      "Alert on security group, IAM, network route, encryption, backup, and logging changes.",
      "Track repeated drift, failed refreshes, plan replacements, and state lock failures.",
      "Correlate Terraform runs with cloud audit logs and change tickets.",
      "Review drift exceptions periodically and assign owners and expiry dates.",
    ],
  },

  scheduledDriftDetection: {
    workflow: [
      "Run on a schedule using the approved CI identity and correct backend/workspace.",
      "Initialize the exact committed dependency selections.",
      "Generate a normal plan with refresh enabled.",
      "Classify exit status: no changes, changes detected, or planning error.",
      "Store protected evidence and send a redacted summary to the owning team.",
      "Require human review before remediation of production drift.",
    ],
    operationalNotes: [
      "A plan with changes may reflect configuration changes, remote drift, provider behavior, or other differences; investigate before labeling it a manual change.",
      "Read permissions, provider API availability, and data-source behavior affect detection reliability.",
      "Do not automatically apply every detected drift because some emergency or externally managed changes may be intentional.",
    ],
  },

  incidentReportTemplate: {
    incidentId: "",
    severity: "",
    detectedAtUtc: "",
    repositoryAndCommit: "",
    terraformVersion: "",
    providerVersions: "",
    backendAndWorkspace: "",
    affectedAccountProjectRegion: "",
    affectedResourceAddresses: [],
    desiredConfiguration: "",
    recordedState: "",
    actualInfrastructure: "",
    driftClassification: "",
    auditEvidence: "",
    impactAndRisk: "",
    rootCause: "",
    actionsTaken: [],
    stateReconciliation: "",
    approvedPlanAndApply: "",
    postRecoveryValidation: "",
    preventionActions: [],
    ownersAndDueDates: [],
  },

  practicalLabs: [
    {
      title: "Manual security group change",
      task:
        "In a disposable cloud account, modify a non-critical security group outside Terraform and run a plan.",
      expectedLearning:
        "Identify the changed attribute, inspect the plan, and choose whether to adopt the change or restore configuration.",
    },
    {
      title: "Refresh-only reconciliation",
      task:
        "Change a test resource attribute remotely, inspect terraform plan -refresh-only, and compare it with a normal plan.",
      expectedLearning:
        "Understand the difference between updating Terraform's knowledge of reality and changing infrastructure to match configuration.",
    },
    {
      title: "Import an existing resource",
      task:
        "Create a supported test resource outside Terraform and import it into a disposable root module.",
      expectedLearning:
        "Verify the identifier, state address, configuration, and post-import plan before applying.",
    },
    {
      title: "Interrupted apply simulation",
      task:
        "In a sandbox, simulate a controlled failure after a resource has been created.",
      expectedLearning:
        "Inspect remote resources, audit history, and state rather than assuming Terraform rolled back.",
    },
    {
      title: "Unexpected replacement",
      task:
        "Change an immutable attribute in a disposable resource and inspect the replacement plan.",
      expectedLearning:
        "Recognize destructive actions and assess impact before approval.",
    },
    {
      title: "Recurring drift",
      task:
        "Use a test automation process that repeatedly changes a managed attribute.",
      expectedLearning:
        "Identify the competing writer and stop the drift loop instead of repeatedly applying.",
    },
  ],

  interviewQuestions: [
    {
      question: "What is Terraform state drift?",
      expectedAnswer:
        "A mismatch involving desired configuration, recorded state, and actual infrastructure. The exact cause must be classified rather than assuming every difference is a manual change.",
    },
    {
      question: "What does terraform plan -refresh-only do?",
      expectedAnswer:
        "It proposes state updates based on observed remote objects without proposing configuration-driven infrastructure changes. It does not make configuration match reality.",
    },
    {
      question: "Does terraform apply automatically roll back after a failure?",
      expectedAnswer:
        "No. Some operations may have succeeded before the failure. Inspect remote resources, state, and audit logs before retrying.",
    },
    {
      question: "What is the difference between terraform import and terraform state mv?",
      expectedAnswer:
        "Import associates an existing remote object with a state address. State mv changes an existing state binding's address, commonly during refactoring.",
    },
    {
      question: "Why should you not use -refresh=false as a drift fix?",
      expectedAnswer:
        "It skips normal refresh behavior and may hide remote changes, producing an incomplete view of infrastructure.",
    },
    {
      question: "How do you investigate an unexpected resource replacement?",
      expectedAnswer:
        "Inspect the plan, changed attributes, provider version, resource schema, configuration history, and remote object before approving the replacement.",
    },
    {
      question: "Why might a resource show drift repeatedly after every apply?",
      expectedAnswer:
        "Another controller or team may be changing it, or provider normalization, eventual consistency, or configuration may cause a recurring difference.",
    },
    {
      question: "How should state be recovered after corruption?",
      expectedAnswer:
        "Preserve evidence and backups, stop conflicting writes, follow the backend-specific recovery procedure, reconcile remote resources, and validate with a reviewed plan.",
    },
    {
      question: "How can production drift be detected automatically?",
      expectedAnswer:
        "Run scheduled plans using a controlled identity, classify results, alert resource owners, and require approval before production remediation.",
    },
  ],

  completionChecklist: [
    "Correct repository, commit, backend, workspace, and cloud target verified",
    "Impact and severity documented",
    "Failed and successful pipeline history preserved",
    "Configuration, state, and actual infrastructure compared",
    "Audit events and responsible change identified where possible",
    "Wrong workspace, provider behavior, and partial apply ruled out",
    "Destructive and replacement actions explicitly reviewed",
    "Recovery strategy selected based on evidence",
    "State changes and imports reviewed and approved",
    "Fresh plan generated after correction",
    "Application health, security, and infrastructure validated",
    "Incident report and preventive owners assigned",
  ],
} as const;

export default stateDriftGuide;
