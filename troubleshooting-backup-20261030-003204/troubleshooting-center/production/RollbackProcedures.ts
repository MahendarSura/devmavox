
export const rollbackProceduresGuide = {
  title: "Production Rollback Procedures — End-to-End Incident Runbook",
  fileName: "RollbackProcedures.ts",
  category: "production",
  difficulty: "advanced",
  estimatedTime: "120–240 minutes",

  description:
    "A production-grade runbook for deciding, preparing, executing, and verifying application and infrastructure rollbacks across CI/CD, Kubernetes, Argo CD, Helm, Ansible, and database-backed services.",

  objectives: [
    "Decide whether rollback is safer than forward-fix or traffic mitigation.",
    "Determine the exact release, artifact, configuration, and infrastructure changes involved.",
    "Preserve incident evidence and establish an approved recovery plan.",
    "Execute a controlled rollback using the deployment platform's supported mechanism.",
    "Prevent data loss, incompatible schema changes, duplicate jobs, and external side effects.",
    "Troubleshoot rollback failures, partial deployments, and zero-host deployment runs.",
    "Verify customer recovery and document preventive actions.",
  ],

  incidentScenario: {
    title: "Production release causes errors and the rollback pipeline reports zero hosts",
    timeline: [
      {
        time: "14:00 UTC",
        event:
          "A new application release completes on the deployment platform.",
      },
      {
        time: "14:04 UTC",
        event:
          "HTTP 5xx errors and latency rise on a critical customer workflow.",
      },
      {
        time: "14:06 UTC",
        event:
          "The team approves rollback, but the automation reports that zero hosts matched the deployment target.",
      },
      {
        time: "14:08 UTC",
        event:
          "The team pauses further changes, checks the actual production release state, and captures pipeline and inventory evidence.",
      },
      {
        time: "14:12 UTC",
        event:
          "The team determines whether the failed rollback changed any hosts, whether the new version remains active, and whether a separate recovery action is needed.",
      },
      {
        time: "14:20 UTC",
        event:
          "A controlled recovery is executed against verified targets, followed by customer-facing validation.",
      },
    ],
    possibleCauses: [
      "The new release introduced a runtime regression.",
      "A feature flag or configuration change caused the incident.",
      "The database migration is incompatible with the previous application version.",
      "The rollback pipeline uses the wrong environment, inventory, workspace, or release identifier.",
      "Ansible inventory resolution returned zero eligible hosts.",
      "The previous image or artifact is missing or cannot be pulled.",
      "The rollback fails because of RBAC, registry credentials, quotas, or scheduling.",
      "Kubernetes rollback succeeds but readiness checks fail.",
      "Argo CD reconciles a manual rollback back to the Git-declared revision.",
      "A partially completed deployment leaves mixed versions across replicas.",
      "A migration, queue consumer, or background job has already performed irreversible work.",
    ],
    principle:
      "A rollback command succeeding is not the same as the service recovering. Verify the actual deployed version, data compatibility, dependencies, customer workflows, and sustained health.",
  },

  impactAndSeverity: {
    note:
      "Severity levels are illustrative. Follow the organization's incident classification and escalation policy.",
    levels: [
      {
        severity: "SEV1",
        criteria:
          "Critical customer workflows are unavailable, widespread data integrity is at risk, or the incident is rapidly cascading.",
        actions: [
          "Declare an incident and appoint an incident commander.",
          "Stop unsafe rollout activity and coordinate service owners.",
          "Prioritize customer safety and data integrity.",
          "Choose a recovery action with explicit approval and verification.",
        ],
      },
      {
        severity: "SEV2",
        criteria:
          "A major service violates its SLO or a significant portion of customers is affected.",
        actions: [
          "Identify affected versions, regions, workloads, and dependencies.",
          "Compare rollback, mitigation, and forward-fix risks.",
          "Assign recovery and verification owners.",
        ],
      },
      {
        severity: "SEV3",
        criteria:
          "A limited workload or feature is degraded with manageable impact.",
        actions: [
          "Contain the regression and prepare a controlled recovery.",
          "Record evidence and check whether the issue is recurring.",
        ],
      },
      {
        severity: "SEV4",
        criteria:
          "A deployment issue has limited or no customer impact.",
        actions: [
          "Resolve the pipeline or release issue through the normal change process.",
          "Improve pre-deployment checks and rollback readiness.",
        ],
      },
    ],
    questions: [
      "Which environment, region, cluster, service, and customer workflow are affected?",
      "What exact release and artifact are currently running?",
      "Did the rollout partially succeed?",
      "Have any database, infrastructure, or persistent-data changes occurred?",
      "Is the previous release compatible with the current schema and data?",
      "Is the rollback automation targeting the correct hosts or workloads?",
      "Did the rollback command actually change production state?",
      "Are there ongoing jobs, messages, or external side effects that cannot be reversed?",
    ],
  },

  rolesAndResponsibilities: [
    {
      role: "Incident Commander",
      responsibility:
        "Owns severity, priorities, approvals, communications, and the recovery decision.",
    },
    {
      role: "Application Owner",
      responsibility:
        "Checks release behavior, compatibility, feature flags, and customer workflows.",
    },
    {
      role: "Platform / SRE",
      responsibility:
        "Checks routing, workloads, deployment controller state, capacity, and observability.",
    },
    {
      role: "Database Owner",
      responsibility:
        "Assesses schema compatibility, data integrity, migration status, and recovery options.",
    },
    {
      role: "Release / CI-CD Owner",
      responsibility:
        "Verifies artifact provenance, pipeline execution, target selection, and deployment history.",
    },
    {
      role: "Scribe",
      responsibility:
        "Records timestamps, evidence, approvals, actions, results, and unresolved risks.",
    },
  ],

  safetyChecks: [
    "Confirm the account, environment, region, cluster, namespace, service, and release identifier.",
    "Confirm the active artifact digest or immutable artifact identifier; do not rely on a mutable tag alone.",
    "Check whether the release is still deploying or another pipeline is modifying the same target.",
    "Pause or serialize conflicting deployment jobs through the approved deployment process.",
    "Capture current release state, pipeline logs, health metrics, and relevant events before changing state when safe.",
    "Confirm the target previous version is a known-good, approved, available artifact.",
    "Review database migrations, schema compatibility, data writes, and external side effects.",
    "Check whether rollback changes routing, traffic weights, configuration, or persistent infrastructure.",
    "Obtain the required production approval and identify the operator executing recovery.",
    "Define success criteria, observation window, and a stop condition before execution.",
    "Prepare a recovery path if rollback itself fails.",
    "Do not expose secrets, credentials, tokens, or customer data in logs or incident notes.",
  ],

  rollbackDecisionFramework: {
    principle:
      "Choose the lowest-risk action that restores customer service without corrupting data or amplifying the incident.",
    options: [
      {
        option: "Rollback the application release",
        chooseWhen:
          "Evidence strongly links the regression to the new version and the prior version remains compatible with current data, schema, and dependencies.",
        avoidWhen:
          "The previous version cannot safely read current data, or the release introduced an irreversible change that has not been assessed.",
      },
      {
        option: "Disable a feature flag",
        chooseWhen:
          "The regression is isolated to a feature with a tested, safe disablement path.",
        avoidWhen:
          "The feature flag controls required security, authorization, consistency, or data-integrity behavior.",
      },
      {
        option: "Shift traffic away from an unhealthy target",
        chooseWhen:
          "A healthy compatible target exists and the routing layer supports controlled traffic management.",
        avoidWhen:
          "Remaining targets lack capacity or use incompatible schemas or protocol versions.",
      },
      {
        option: "Apply a forward-fix",
        chooseWhen:
          "Rollback is unsafe, the old version is incompatible, or a small verified fix is lower risk.",
        avoidWhen:
          "The proposed fix is untested, poorly understood, or adds changes during uncontrolled incident response.",
      },
      {
        option: "Restore data from backup",
        chooseWhen:
          "Data corruption or loss requires a formally planned restoration.",
        avoidWhen:
          "A simple application rollback would suffice, or the backup restore would overwrite valid writes without a reconciliation plan.",
      },
      {
        option: "Revert infrastructure changes",
        chooseWhen:
          "A specific infrastructure change caused the incident and the provider/resource supports a safe, understood reversal.",
        avoidWhen:
          "The operation could destroy stateful resources, remove required dependencies, or cause irreversible side effects.",
      },
    ],
    decisionQuestions: [
      "Is the incident caused by the release, configuration, infrastructure, data, or a dependency?",
      "Can the old application safely operate with the current database schema and data?",
      "Are external side effects already committed?",
      "Can traffic be shifted safely without overloading remaining targets?",
      "Would rollback remove required security fixes or compatibility changes?",
      "Is a forward-fix safer than reversing the release?",
      "What measurable signal will prove the selected action worked?",
    ],
  },

  evidenceCollection: {
    deploymentEvidence: [
      "Incident start time, deployment time, and first abnormal signal.",
      "Release ID, Git commit, image digest, package version, and build provenance.",
      "Pipeline run ID, job logs, approval history, and rollback output.",
      "Deployment strategy, current rollout status, and desired target revision.",
      "Previous known-good release and artifact availability.",
      "Current and previous configuration, feature flags, and environment variables with secrets redacted.",
    ],
    runtimeEvidence: [
      "HTTP 5xx, latency percentiles, request rate, and SLO status.",
      "Pod readiness, restart count, events, and per-replica version.",
      "Load balancer target health and traffic distribution.",
      "Application startup errors, dependency failures, and representative trace IDs.",
      "Database connection, query, lock, and migration status where relevant.",
      "Queue depth, consumer lag, scheduled jobs, and duplicate-processing signals.",
    ],
    automationEvidence: [
      "Working directory and repository revision.",
      "Inventory source, resolved hosts, host patterns, and environment selection.",
      "Ansible configuration and playbook target declarations where Ansible is used.",
      "Credential identity, permissions, and target connectivity.",
      "Pipeline variables, job conditions, approval gates, and artifact references.",
      "Whether the failed rollback job changed any hosts before failing.",
    ],
    collectionRules: [
      "Use consistent timestamps and correlate pipeline logs with service telemetry.",
      "Separate intended state from actual deployed state.",
      "Capture bounded logs and avoid dumping secrets.",
      "Do not assume that a failed pipeline performed no changes; inspect actual target state.",
      "Do not assume that a successful pipeline restored customer service.",
    ],
  },

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Confirm incident scope and stop unsafe rollout activity",
      actions: [
        "Confirm the affected customer journey, environment, region, and service.",
        "Check whether deployment is still in progress or a second pipeline is active.",
        "Pause additional rollout steps using the approved deployment controls.",
        "Record the active release and incident start time.",
        "Check whether the incident is worsening or stable.",
      ],
      decisions: [
        {
          if: "Deployment is still progressing and impact is increasing",
          then:
            "Stop or pause the rollout using the platform's supported control, then inspect the actual state of every affected target.",
        },
        {
          if: "Multiple pipelines are changing the same service",
          then:
            "Coordinate one recovery owner and serialize conflicting changes.",
        },
        {
          if: "Production is unavailable but a healthy compatible target exists",
          then:
            "Evaluate a controlled traffic shift or rollback under the incident process.",
        },
      ],
    },

    {
      step: 2,
      title: "Determine what is actually deployed",
      actions: [
        "Inspect the deployment controller and runtime rather than trusting only the pipeline status.",
        "Compare desired version with the version running on each target.",
        "Identify mixed-version replicas and partially completed deployment batches.",
        "Check the image digest or immutable artifact identifier.",
        "Confirm that the previous release artifact is available and approved.",
      ],
      commands: [
        {
          command:
            "kubectl rollout status deployment/<deployment> -n <namespace>",
          purpose:
            "Checks the rollout status of a Kubernetes Deployment.",
          caution:
            "This command observes rollout status; it does not itself roll back the deployment.",
        },
        {
          command:
            "kubectl get deployment <deployment> -n <namespace> -o wide",
          purpose:
            "Inspects Deployment summary and replica state.",
        },
        {
          command:
            "kubectl get pods -n <namespace> -o wide",
          purpose:
            "Lists pods and their node placement for comparison.",
        },
        {
          command:
            "kubectl describe deployment <deployment> -n <namespace>",
          purpose:
            "Shows Deployment conditions, replica sets, rollout configuration, and events.",
        },
      ],
      decisions: [
        {
          if: "All targets run the new version and health is degraded",
          then:
            "Assess application rollback compatibility and choose the approved recovery mechanism.",
        },
        {
          if: "Only some targets run the new version",
          then:
            "Inspect rollout state and compatibility before changing traffic or reverting versions.",
        },
        {
          if: "Runtime already runs the previous version but users remain affected",
          then:
            "Investigate configuration, database, infrastructure, dependency, and routing changes that the application rollback did not reverse.",
        },
      ],
    },

    {
      step: 3,
      title: "Establish whether rollback is safe",
      actions: [
        "Review schema and data changes introduced by the release.",
        "Determine whether the old application version supports the current schema.",
        "Identify data writes, event publications, payments, notifications, and other external side effects.",
        "Check background workers and message consumers for mixed-version compatibility.",
        "Confirm whether rollback requires a configuration or feature flag change as well.",
        "Document the expected result and failure/stop condition.",
      ],
      decisions: [
        {
          if: "Schema changes are backward compatible and old application support is confirmed",
          then:
            "Proceed with the approved application rollback plan.",
        },
        {
          if: "The new version wrote data that the old version cannot understand",
          then:
            "Do not blindly roll back. Coordinate a compatible forward-fix or an explicit data reconciliation plan.",
        },
        {
          if: "A migration or external operation is irreversible",
          then:
            "Treat application rollback and data recovery as separate decisions; involve the owning team.",
        },
      ],
      caution:
        "A database restore is not a routine application rollback. It can discard valid writes and requires a separately approved recovery plan.",
    },

    {
      step: 4,
      title: "Check deployment automation and target selection",
      objective:
        "Determine whether the rollback mechanism is targeting the intended production resources.",
      actions: [
        "Inspect the exact pipeline job and command that failed.",
        "Confirm the repository revision and working directory.",
        "Confirm environment, inventory, namespace, cluster, workspace, and release variables.",
        "Check credentials and permissions using approved identity tooling.",
        "Check whether the automation uses a stale artifact or the wrong release identifier.",
        "Determine whether any changes occurred before the error.",
      ],
      decisions: [
        {
          if: "The target environment or release identifier is wrong",
          then:
            "Correct the selection through the approved change path and repeat read-only verification before execution.",
        },
        {
          if: "The rollback job did not start because approval or policy failed",
          then:
            "Resolve the approval or policy issue rather than bypassing the gate.",
        },
        {
          if: "The job ran but changed no resources",
          then:
            "Inspect target discovery, permissions, filters, and platform-specific selection rules.",
        },
        {
          if: "The job changed some resources before failure",
          then:
            "Inventory the actual state of changed and unchanged resources before any retry.",
        },
      ],
    },

    {
      step: 5,
      title: "Troubleshoot an Ansible rollback that matched zero hosts",
      objective:
        "Diagnose the specific case where a deployment or rollback playbook reports zero eligible hosts.",
      commands: [
        {
          command: "pwd",
          purpose:
            "Confirms the current working directory.",
        },
        {
          command: "git rev-parse --show-toplevel",
          purpose:
            "Confirms the Git repository root.",
        },
        {
          command:
            "ansible-inventory -i <inventory> --graph",
          purpose:
            "Displays the inventory group structure.",
        },
        {
          command:
            "ansible-inventory -i <inventory> --list",
          purpose:
            "Displays resolved inventory data; review carefully for sensitive values.",
        },
        {
          command:
            "ansible-playbook -i <inventory> <rollback-playbook.yml> --list-hosts",
          purpose:
            "Shows hosts matched by the playbook's patterns without executing its tasks.",
        },
        {
          command:
            "ansible-playbook -i <inventory> <rollback-playbook.yml> --syntax-check",
          purpose:
            "Checks playbook syntax without executing its tasks.",
        },
      ],
      possibleCauses: [
        "Wrong inventory file or inventory plugin configuration.",
        "Wrong environment or host pattern.",
        "Missing or renamed host group.",
        "Dynamic inventory cannot access its API or cloud credentials.",
        "A play-level condition or limit excludes every intended host.",
        "The pipeline runs from an unexpected working directory.",
        "Inventory data resolves correctly but does not contain the intended production hosts.",
        "Permissions or connectivity fail after host matching.",
      ],
      decisions: [
        {
          if: "Inventory graph does not show the expected production group",
          then:
            "Fix inventory source, group membership, or environment selection and re-check the graph.",
        },
        {
          if: "Inventory is correct but --list-hosts matches zero hosts",
          then:
            "Inspect playbook hosts patterns, --limit, variables, and job parameters.",
        },
        {
          if: "Hosts are matched but connection tasks fail",
          then:
            "Investigate authentication, network reachability, privilege escalation, and target availability.",
        },
        {
          if: "Zero hosts matched and the pipeline is green",
          then:
            "Treat this as a potentially false-successful deployment. Require explicit target-count validation and verify actual runtime state.",
        },
      ],
      caution:
        "Do not execute the rollback playbook just to test host matching. Use --list-hosts and --syntax-check first. Inventory output may contain sensitive information.",
    },

    {
      step: 6,
      title: "Check Kubernetes rollback state",
      commands: [
        {
          command:
            "kubectl rollout history deployment/<deployment> -n <namespace>",
          purpose:
            "Lists available rollout revisions for the Deployment.",
        },
        {
          command:
            "kubectl rollout history deployment/<deployment> -n <namespace> --revision=<revision>",
          purpose:
            "Inspects details available for a specific Deployment revision.",
        },
        {
          command:
            "kubectl get replicasets -n <namespace> -o wide",
          purpose:
            "Helps identify ReplicaSets associated with the Deployment's rollout history.",
        },
      ],
      recoveryCommand:
        "kubectl rollout undo deployment/<deployment> -n <namespace> --to-revision=<revision>",
      recoveryCaution: [
        "Run the undo command only after confirming the Deployment, namespace, and intended revision.",
        "The command changes Kubernetes workload state and is not read-only.",
        "The Deployment controller must be the appropriate owner of the workload.",
        "GitOps reconciliation, such as Argo CD, may restore the Git-declared desired state after a manual change.",
        "A Deployment rollback does not reverse database migrations, external side effects, or unrelated infrastructure changes.",
        "Verify rollout status and customer health after execution.",
      ],
      decisions: [
        {
          if: "The desired old revision is available and compatibility is confirmed",
          then:
            "Execute the approved rollback and monitor rollout progress.",
        },
        {
          if: "The rollout undo is blocked by readiness or scheduling failures",
          then:
            "Investigate image availability, resource quotas, scheduling, readiness probes, and dependencies.",
        },
        {
          if: "A GitOps controller owns the workload",
          then:
            "Prefer reverting the Git-declared desired state through the approved GitOps workflow, unless the incident procedure explicitly permits another method.",
        },
      ],
    },

    {
      step: 7,
      title: "Check Argo CD and Helm rollback behavior",
      argoCd: [
        "Inspect application sync status, health, target revision, and deployed revision.",
        "Check repository rendering, manifest generation, permissions, and destination cluster.",
        "Determine whether the controller will reconcile a manual rollback back to Git state.",
        "For a GitOps-managed application, prefer a reviewed Git revert or a new commit restoring the intended desired state.",
        "Check hooks, sync waves, migrations, and resources that may not be safely reversible.",
      ],
      helm: [
        "Inspect release history and the current release status.",
        "Verify the intended previous revision and its chart/application compatibility.",
        "Check hooks and any database migration side effects.",
        "Use the approved release rollback process and verify actual workload state afterward.",
      ],
      commands: [
        {
          command:
            "helm history <release> -n <namespace>",
          purpose:
            "Lists Helm release revisions.",
        },
        {
          command:
            "helm status <release> -n <namespace>",
          purpose:
            "Shows current Helm release status.",
        },
        {
          command:
            "helm rollback <release> <revision> -n <namespace>",
          purpose:
            "Changes the Helm release to a selected revision.",
          caution:
            "This is a mutating operation. Confirm the revision, hooks, schema compatibility, and change approval before execution.",
        },
      ],
      caution:
        "Argo CD and Helm are not interchangeable rollback mechanisms. Choose the mechanism that owns the desired state and understand how reconciliation will behave.",
    },

    {
      step: 8,
      title: "Troubleshoot rollback failures",
      failureModes: [
        {
          symptom: "Previous artifact cannot be found or pulled",
          checks: [
            "Verify the immutable image digest or package identifier.",
            "Check registry retention, authentication, network access, and architecture compatibility.",
            "Confirm that the artifact is approved and available in the required region.",
          ],
          response:
            "Restore access to the verified artifact or use an approved known-good artifact. Do not substitute an unverified image.",
        },
        {
          symptom: "Pods remain Pending",
          checks: [
            "Inspect pod events, resource requests, quotas, node capacity, and scheduling constraints.",
            "Check image pull errors and storage/network prerequisites.",
          ],
          response:
            "Resolve the specific scheduling or artifact issue before retrying the rollout.",
        },
        {
          symptom: "Pods start but fail readiness",
          checks: [
            "Inspect startup logs, readiness probes, dependency connectivity, and configuration.",
            "Check whether the old application expects a different schema or environment variable.",
          ],
          response:
            "Do not force traffic to an unhealthy target. Restore a compatible configuration or use the approved forward-fix.",
        },
        {
          symptom: "Rollback completes but 5xx errors remain",
          checks: [
            "Verify actual running versions and routing.",
            "Check schema, feature flags, infrastructure, and dependency changes.",
            "Inspect connection pools, queues, and cached state.",
          ],
          response:
            "Treat the rollback as incomplete recovery; identify the remaining cause and choose a separate mitigation.",
        },
        {
          symptom: "GitOps controller re-deploys the bad version",
          checks: [
            "Compare live state with Git target revision.",
            "Inspect sync policy and active reconciliation.",
          ],
          response:
            "Correct the declared desired state through the approved GitOps workflow and verify reconciliation.",
        },
        {
          symptom: "Only some hosts or replicas are reverted",
          checks: [
            "Inspect deployment batches, target inventory, ReplicaSets, and pipeline execution records.",
            "Compare versions across all intended targets.",
          ],
          response:
            "Stop conflicting changes, establish the actual state, and complete a controlled recovery without assuming uniform state.",
        },
        {
          symptom: "Database or persistent data is incompatible",
          checks: [
            "Identify the migration and data writes that occurred.",
            "Determine whether the old version can safely read current data.",
            "Consult the database and application owners.",
          ],
          response:
            "Use a compatible forward-fix or an approved data recovery/reconciliation plan. Avoid destructive schema reversal or blind restore.",
        },
      ],
    },

    {
      step: 9,
      title: "Verify customer-facing recovery",
      actions: [
        "Confirm the intended artifact/version is running on all intended targets.",
        "Check rollout or deployment-controller health.",
        "Run approved health checks and critical business workflow tests.",
        "Compare error rate and latency with the pre-incident baseline.",
        "Verify database connectivity, migration compatibility, and data integrity signals.",
        "Check queues, background workers, scheduled jobs, and external dependencies.",
        "Confirm that no controller or pipeline is reverting the recovery action.",
        "Observe the system for the required stabilization window.",
      ],
      decisions: [
        {
          if: "The release is reverted but the service remains unhealthy",
          then:
            "Investigate configuration, data, dependencies, infrastructure, and routing; do not repeatedly roll back without a new hypothesis.",
        },
        {
          if: "Health recovers but errors or queue backlog remain elevated",
          then:
            "Keep the incident open and verify that backlog drains safely without duplicate processing.",
        },
        {
          if: "Service metrics stabilize and business checks pass",
          then:
            "Record recovery evidence, communicate status, and proceed to post-incident review.",
        },
      ],
    },
  ],

  rootCauseMatrix: [
    {
      cause: "Application regression",
      evidence:
        "Error or latency increase aligns with the release and affected-version comparison confirms regression.",
      fix:
        "Roll back to a verified compatible artifact or deploy a tested forward-fix.",
    },
    {
      cause: "Configuration or feature flag",
      evidence:
        "The issue begins after a config/flag change while the binary is unchanged.",
      fix:
        "Restore the known-good configuration or disable the implicated feature through the approved process.",
    },
    {
      cause: "Database schema incompatibility",
      evidence:
        "The old version fails against the new schema or data format.",
      fix:
        "Use a compatible application fix or a planned data/schema recovery; do not assume schema reversal is safe.",
    },
    {
      cause: "Zero Ansible hosts",
      evidence:
        "Inventory and host-selection output show no eligible target.",
      fix:
        "Correct the inventory source, group, environment, pattern, or limit and validate host matching before execution.",
    },
    {
      cause: "Missing previous artifact",
      evidence:
        "The registry or package repository cannot provide the approved prior artifact.",
      fix:
        "Restore access or use an independently verified artifact through the approved process.",
    },
    {
      cause: "GitOps reconciliation",
      evidence:
        "The controller restores the Git-declared release after a manual live-state change.",
      fix:
        "Revert the desired state in Git and verify controller reconciliation.",
    },
    {
      cause: "Capacity or scheduling issue",
      evidence:
        "Previous-version pods cannot schedule, pull images, or become ready.",
      fix:
        "Resolve the measured resource, artifact, or readiness issue and retry under controlled conditions.",
    },
    {
      cause: "Partial rollback",
      evidence:
        "Runtime inspection shows mixed versions or only a subset of targets changed.",
      fix:
        "Reconcile actual state across all intended targets using one coordinated recovery owner.",
    },
    {
      cause: "Infrastructure change",
      evidence:
        "Network, IAM, routing, DNS, capacity, or resource behavior remains broken after application rollback.",
      fix:
        "Use the infrastructure owner's approved recovery plan; do not blindly revert stateful or irreversible resources.",
    },
  ],

  prevention: {
    beforeDeployment: [
      "Keep immutable artifacts and retain known-good release identifiers.",
      "Require production approval and explicit target/environment selection.",
      "Validate deployment configuration and host matching.",
      "Use canary or progressive delivery where suitable.",
      "Check schema compatibility with old and new application versions.",
      "Separate expand and contract database migrations.",
      "Define health checks, rollback triggers, and stop conditions before rollout.",
      "Verify artifact provenance and required permissions.",
      "Test rollback in staging using production-like deployment and data compatibility conditions.",
    ],
    duringDeployment: [
      "Monitor error rate, latency, saturation, and business-level success.",
      "Use small rollout batches and stop when health gates fail.",
      "Serialize conflicting deployment jobs.",
      "Track actual deployed artifact versions, not just pipeline completion.",
      "Use explicit checks for zero targets and partial success.",
      "Make retries idempotent where possible and avoid duplicate side effects.",
    ],
    afterIncident: [
      "Automate detection of mixed or unexpected deployed versions.",
      "Add a deployment gate that fails if zero production targets match unexpectedly.",
      "Add artifact availability and schema compatibility checks.",
      "Record rollback owner, approval, result, and recovery evidence.",
      "Practice rollback and forward-fix scenarios in non-production.",
      "Create alerts for rollback failure, prolonged unhealthy rollout, and false-successful pipeline runs.",
      "Review whether rollback was the correct action or whether a forward-fix would have been safer.",
    ],
  },

  incidentReportTemplate: {
    incidentId: "",
    severity: "",
    service: "",
    environment: "production",
    region: "",
    affectedCustomersOrWorkflows: [],
    incidentStartUtc: "",
    detectionUtc: "",
    rollbackDecisionUtc: "",
    rollbackStartUtc: "",
    recoveryUtc: "",
    releaseBeforeIncident: "",
    releaseDuringIncident: "",
    intendedRollbackRelease: "",
    actualReleaseAfterRecovery: "",
    artifactDigest: "",
    pipelineRunId: "",
    deploymentController: "",
    databaseMigrationStatus: "",
    schemaCompatibilityAssessment: "",
    externalSideEffects: "",
    inventoryOrTargetSelectionEvidence: "",
    deploymentLogs: [],
    customerImpact: "",
    errorRateBeforeAndDuring: "",
    latencyBeforeAndDuring: "",
    mitigation: "",
    rollbackOutcome: "",
    recoveryVerification: [],
    rootCause: "",
    contributingFactors: [],
    dataIntegrityAssessment: "",
    whatWorked: [],
    whatDidNotWork: [],
    correctiveActions: [
      {
        action: "",
        owner: "",
        priority: "",
        dueDate: "",
        measurableSuccessCriteria: "",
      },
    ],
    blamelessSummary:
      "Describe the release, system conditions, detection gaps, and safeguards that would prevent recurrence. Focus on improving the system rather than blaming individuals.",
  },

  handsOnLabs: [
    {
      lab: 1,
      title: "Diagnose an Ansible zero-host rollback",
      environment: "Disposable lab inventory",
      tasks: [
        "Create a test inventory with multiple groups.",
        "Run ansible-inventory --graph and --list.",
        "Compare expected host groups with playbook --list-hosts output.",
        "Introduce a wrong host pattern in the lab and observe the mismatch.",
        "Restore the intended pattern and validate without executing production actions.",
      ],
      success:
        "Identify whether the problem comes from inventory, environment selection, or host-pattern matching.",
    },
    {
      lab: 2,
      title: "Roll back a Kubernetes Deployment",
      environment: "Non-production cluster",
      tasks: [
        "Deploy two harmless application revisions.",
        "Inspect rollout history and current ReplicaSets.",
        "Use the approved lab rollback procedure to select the previous revision.",
        "Wait for rollout status and verify the actual running image.",
      ],
      success:
        "Demonstrate the difference between requesting rollback and verifying a healthy recovered deployment.",
    },
    {
      lab: 3,
      title: "Practice a GitOps rollback",
      environment: "Non-production Argo CD application",
      tasks: [
        "Commit a harmless configuration change.",
        "Observe reconciliation and application health.",
        "Revert the Git change using the approved workflow.",
        "Confirm that Argo CD reconciles the intended revision.",
      ],
      success:
        "Explain why changing live Kubernetes state alone may not persist under GitOps.",
    },
    {
      lab: 4,
      title: "Test schema compatibility",
      environment: "Disposable database and test application",
      tasks: [
        "Create a backward-compatible schema addition.",
        "Run both the old and new application versions in the test environment.",
        "Test whether the old version can operate against the expanded schema.",
        "Document a safe contract-migration sequence without destructive production changes.",
      ],
      success:
        "Explain why database compatibility must be evaluated separately from application artifact rollback.",
    },
    {
      lab: 5,
      title: "Write a rollback incident report",
      environment: "Synthetic incident timeline",
      tasks: [
        "Correlate release time, customer impact, pipeline output, and runtime evidence.",
        "Record the rollback decision and approval.",
        "Document recovery verification and residual risks.",
        "Create corrective actions with owners and measurable outcomes.",
      ],
      success:
        "Produce an evidence-based, blameless incident report.",
    },
  ],

  interviewQuestions: [
    {
      question: "What is a production rollback?",
      answer:
        "A controlled recovery that restores a previously known-good application or configuration state while accounting for data, infrastructure, and external side effects.",
    },
    {
      question: "When should you not roll back?",
      answer:
        "When the previous version is incompatible with current schema or data, the change is irreversible, or a verified forward-fix is safer.",
    },
    {
      question: "Why can a successful rollback command still leave the service unhealthy?",
      answer:
        "The command may only change one resource or application version. Configuration, routing, schema, dependencies, queues, or infrastructure may remain broken.",
    },
    {
      question: "How do you investigate an Ansible playbook that matches zero hosts?",
      answer:
        "Confirm the working directory and inventory source, inspect the inventory graph, run --list-hosts, and review host patterns, limits, variables, and environment selection before execution.",
    },
    {
      question: "How does Kubernetes Deployment rollback work?",
      answer:
        "The Deployment controller can switch to a prior rollout revision, but runtime health and compatibility still need verification. Database changes are not automatically reversed.",
    },
    {
      question: "How should an Argo CD application be rolled back?",
      answer:
        "For GitOps-managed desired state, normally revert the intended change in Git and verify reconciliation. Understand the application's sync policy and rollback constraints.",
    },
    {
      question: "Why is a database rollback dangerous?",
      answer:
        "New writes may depend on the new schema, and destructive reversal or restoring an old backup can lose valid data. Expand-contract migrations and compatibility testing reduce risk.",
    },
    {
      question: "What is the difference between rollback and roll forward?",
      answer:
        "Rollback returns to a prior compatible state. Roll forward applies a corrective change when reversal is unsafe or unavailable.",
    },
    {
      question: "How do you handle a partial rollback?",
      answer:
        "Stop conflicting changes, inspect actual state across all targets, identify completed and incomplete operations, and execute one coordinated recovery plan.",
    },
    {
      question: "What is required before restoring a database backup?",
      answer:
        "A data recovery plan, impact assessment, restore point, validation process, owner approval, and a strategy for reconciling writes after the restore point.",
    },
    {
      question: "How do you prevent rollback failures?",
      answer:
        "Retain immutable artifacts, test rollback, verify targets, enforce health gates, keep migrations compatible, monitor deployment state, and document recovery criteria.",
    },
    {
      question: "How do you prove production recovery?",
      answer:
        "Verify the actual release, deployment health, customer workflows, error and latency metrics, data integrity, dependency health, and sustained stability.",
    },
  ],

  completionChecklist: [
    "Incident severity and customer impact are recorded.",
    "Unsafe deployment activity is paused or coordinated.",
    "Actual deployed versions and artifact identifiers are verified.",
    "Rollback safety and database compatibility are assessed.",
    "Production approval and recovery ownership are recorded.",
    "Pipeline and runtime evidence are captured.",
    "Target selection and zero-host conditions are checked when applicable.",
    "A specific rollback or forward-fix plan is approved.",
    "The intended recovery action is executed in a controlled manner.",
    "All intended targets reach the expected state.",
    "Health checks and critical customer workflows pass.",
    "Latency, error rate, queue depth, and dependency health stabilize.",
    "Data integrity and background processing are checked.",
    "Residual risks and temporary changes are documented.",
    "A blameless incident report and preventive actions are assigned.",
  ],

  officialReferences: [
    {
      title: "Kubernetes — Deployments",
      url: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/",
    },
    {
      title: "Kubernetes — kubectl rollout",
      url: "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_rollout/",
    },
    {
      title: "Argo CD — Application Specification",
      url: "https://argo-cd.readthedocs.io/en/stable/user-guide/application-specification/",
    },
    {
      title: "Argo CD — Automated Sync",
      url: "https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/",
    },
    {
      title: "Helm — Rollback",
      url: "https://helm.sh/docs/helm/helm_rollback/",
    },
    {
      title: "Helm — History",
      url: "https://helm.sh/docs/helm/helm_history/",
    },
    {
      title: "Ansible — Inventory",
      url: "https://docs.ansible.com/ansible/latest/inventory_guide/intro_inventory.html",
    },
    {
      title: "Ansible — Patterns",
      url: "https://docs.ansible.com/ansible/latest/inventory_guide/intro_patterns.html",
    },
    {
      title: "Ansible — Playbook CLI",
      url: "https://docs.ansible.com/ansible/latest/cli/ansible-playbook.html",
    },
    {
      title: "Ansible — Inventory CLI",
      url: "https://docs.ansible.com/ansible/latest/cli/ansible-inventory.html",
    },
    {
      title: "Google SRE Book — Release Engineering",
      url: "https://sre.google/sre-book/release-engineering/",
    },
    {
      title: "Google SRE Book — Addressing Cascading Failures",
      url: "https://sre.google/sre-book/addressing-cascading-failures/",
    },
  ],

  notes: [
    "Rollback commands mutate live systems. Confirm the target, revision, compatibility, and approval before execution.",
    "Kubernetes Deployment undo does not reverse database migrations, persistent-data writes, or unrelated infrastructure changes.",
    "For GitOps-managed workloads, the Git-declared desired state and reconciliation policy must be considered.",
    "Database recovery, destructive schema changes, and backup restores require separate planning and authorization.",
    "Ansible --list-hosts and --syntax-check are preflight diagnostics; they do not prove that targets are reachable or that a real rollback will succeed.",
    "Exact commands and capabilities vary by platform version and deployment ownership model.",
    "This runbook is a framework, not permission to bypass production change controls.",
  ],
} as const;

export default rollbackProceduresGuide;
