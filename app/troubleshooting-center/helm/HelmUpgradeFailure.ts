
export interface HelmUpgradeDiagnosticStep {
  id: string;
  title: string;
  objective: string;
  commands: string[];
  interpretResults: string[];
  nextAction: string;
  risk: "low" | "medium" | "high";
}

export interface HelmUpgradeFailureCase {
  id: string;
  symptom: string;
  likelyCauses: string[];
  confirmWith: string[];
  fix: string[];
  validate: string[];
  prevention: string[];
}

export interface HelmUpgradeProductionIncident {
  scenario: string;
  impact: string;
  evidence: string[];
  investigation: string[];
  recovery: string[];
  closureCriteria: string[];
}

export interface HelmUpgradeFailureGuide {
  title: string;
  slug: string;
  category: string;
  overview: string;
  objectives: string[];
  severityMatrix: {
    severity: string;
    criteria: string;
    response: string;
  }[];
  safetyChecks: string[];
  diagnosticWorkflow: HelmUpgradeDiagnosticStep[];
  failureCases: HelmUpgradeFailureCase[];
  productionIncidents: HelmUpgradeProductionIncident[];
  commandReference: {
    command: string;
    purpose: string;
    caution: string;
  }[];
  recoveryRunbook: string[];
  rollbackRunbook: string[];
  validationChecklist: string[];
  preventionChecklist: string[];
  monitoringAndAlerting: string[];
  cicdIntegration: string[];
  incidentReportTemplate: string[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    expectedLearning: string;
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

export const helmUpgradeFailureGuide: HelmUpgradeFailureGuide = {
  title: "Helm Upgrade Failure — Production Troubleshooting Guide",
  slug: "helm-upgrade-failure",
  category: "Helm / Kubernetes / Release Management",

  overview: `
A Helm upgrade failure occurs when Helm cannot complete an application release
update as expected. The cause may be invalid chart templates, missing values,
Kubernetes API validation errors, admission webhook failures, insufficient
RBAC permissions, immutable fields, image pull failures, scheduling problems,
readiness probe failures, hook failures, or a timeout while waiting for
resources to become ready.

A failed Helm command does not automatically mean that every Kubernetes
resource remained unchanged. Depending on the Helm version, command flags,
failure stage, hooks, and resource operations, some changes may already have
occurred.

Production engineers must distinguish between:
1. Helm could not render the chart.
2. Kubernetes rejected the requested resources.
3. Kubernetes accepted resources but workloads failed to become healthy.
4. Helm timed out while waiting for readiness.
5. A hook or external dependency failed.
6. Helm reported an error even though some application changes were applied.
7. Helm completed successfully, but application-level validation failed.

The objective is to identify the exact failure boundary, preserve evidence,
restore service safely, and prevent recurrence.
`,

  objectives: [
    "Understand Helm release revisions and upgrade lifecycle.",
    "Determine whether a release failed before or after resources changed.",
    "Separate Helm errors from Kubernetes and application errors.",
    "Collect logs, events, manifests, revision history, and timestamps.",
    "Diagnose template, values, API, RBAC, hook, image, probe, and timeout failures.",
    "Choose between a corrected upgrade, rollback, or controlled forward fix.",
    "Validate application health after recovery.",
    "Build automated checks and reliable deployment runbooks."
  ],

  severityMatrix: [
    {
      severity: "SEV-1 / Critical",
      criteria:
        "Production outage, widespread failed requests, critical workloads unavailable, or data integrity at risk.",
      response:
        "Declare incident, stop further deployments, engage the service owner, preserve evidence, and prioritize safe restoration."
    },
    {
      severity: "SEV-2 / High",
      criteria:
        "Major feature unavailable, replicas substantially reduced, or a customer-facing service degraded.",
      response:
        "Pause the release pipeline, identify the failed revision, investigate workload health, and agree on rollback or forward fix."
    },
    {
      severity: "SEV-3 / Moderate",
      criteria:
        "Upgrade failed in staging or a non-critical service while the previous release remains healthy.",
      response:
        "Capture evidence, reproduce in a safe environment, correct the chart or configuration, and rerun validation."
    },
    {
      severity: "SEV-4 / Low",
      criteria:
        "A pre-deployment validation or rendering step failed before any cluster changes occurred.",
      response:
        "Fix the chart, values, dependency, or pipeline configuration before attempting deployment again."
    }
  ],

  safetyChecks: [
    "Confirm the incident, affected service, environment, namespace, and deployment window.",
    "Verify the Kubernetes context using kubectl config current-context.",
    "Verify the intended namespace and Helm release name.",
    "Confirm the target cluster is the intended staging or production cluster.",
    "Check whether the application is currently serving traffic and whether the previous revision is healthy.",
    "Check Helm history before retrying an upgrade.",
    "Check whether the failed command used --atomic, --wait, --wait-for-jobs, --force, or --install.",
    "Confirm whether pre-upgrade, post-upgrade, or other hooks executed.",
    "Determine whether database migrations, external API changes, or persistent-volume changes occurred.",
    "Review Git commit, chart version, image digest, values file, and pipeline run ID.",
    "Check whether another pipeline or engineer is modifying the same release.",
    "Obtain required production approval before rollback or forward changes.",
    "Never expose Kubernetes Secrets, registry credentials, tokens, or sensitive values in shared logs.",
    "Do not delete production resources merely to make Helm accept the next upgrade.",
    "Do not disable TLS verification or admission security controls as a shortcut."
  ],

  diagnosticWorkflow: [
    {
      id: "step-01",
      title: "Confirm the incident and deployment scope",
      objective:
        "Establish exactly which release failed and whether the failure is customer-impacting.",
      commands: [
        "kubectl config current-context",
        "kubectl get namespaces",
        "helm list -A",
        "kubectl get pods -n <namespace> -o wide"
      ],
      interpretResults: [
        "A wrong context means all further cluster-level investigation could target the wrong environment.",
        "A missing release may indicate a wrong namespace, wrong release name, different cluster, or an installation that never completed.",
        "CrashLoopBackOff, ImagePullBackOff, Pending, or unavailable replicas suggest workload-level symptoms requiring further investigation.",
        "A healthy existing workload may mean the failed upgrade did not interrupt the previous application."
      ],
      nextAction:
        "Record the context, namespace, release, deployment timestamp, pipeline run, and customer impact before modifying anything.",
      risk: "low"
    },
    {
      id: "step-02",
      title: "Inspect Helm release status and history",
      objective:
        "Identify the deployed revision and determine how the latest upgrade ended.",
      commands: [
        "helm status <release> -n <namespace>",
        "helm history <release> -n <namespace>",
        "helm list -n <namespace> --all"
      ],
      interpretResults: [
        "DEPLOYED indicates a deployed revision, but does not prove the application is functionally healthy.",
        "FAILED indicates a failed release revision; inspect its description and associated Kubernetes resources.",
        "PENDING_UPGRADE or another pending state may indicate an incomplete operation or a release operation that needs investigation.",
        "A new revision after the incident helps correlate the failed pipeline with the release history.",
        "If a release is absent, investigate whether the operation was an installation, whether the namespace was correct, or whether release creation failed."
      ],
      nextAction:
        "Record the latest and previous revision numbers, status, chart version, application version, and description. Do not immediately retry.",
      risk: "low"
    },
    {
      id: "step-03",
      title: "Preserve evidence before changing the release",
      objective:
        "Keep enough information to diagnose the failure even if a later operation changes the current state.",
      commands: [
        "helm get values <release> -n <namespace> -o yaml",
        "helm get values <release> -n <namespace> --all -o yaml",
        "helm get manifest <release> -n <namespace>",
        "helm get hooks <release> -n <namespace>",
        "helm history <release> -n <namespace>"
      ],
      interpretResults: [
        "The first values command normally shows user-supplied values; the --all form includes computed values.",
        "The release manifest shows resources recorded by Helm, not every possible external or controller-created resource.",
        "Hook manifests help identify migration jobs or lifecycle actions that may have run.",
        "Compare the intended chart and values with the revision that was deployed before the incident."
      ],
      nextAction:
        "Save approved, access-controlled copies of logs, manifests, revision history, relevant events, and Git metadata. Redact secrets before sharing.",
      risk: "low"
    },
    {
      id: "step-04",
      title: "Inspect the exact deployment command and pipeline inputs",
      objective:
        "Determine which chart, values, flags, and artifact were actually used.",
      commands: [
        "git status --short",
        "git rev-parse HEAD",
        "helm version",
        "helm upgrade --help"
      ],
      interpretResults: [
        "Uncommitted changes may explain differences between a local chart and the chart built in CI.",
        "A different Git SHA or chart package may mean the pipeline deployed an unexpected artifact.",
        "Helm client version differences can change supported flags or behavior.",
        "The actual pipeline command may differ from the command documented in the repository."
      ],
      nextAction:
        "Collect the exact command, working directory, Git SHA, chart version, values-file paths, image tag or digest, Helm version, and relevant flags.",
      risk: "low"
    },
    {
      id: "step-05",
      title: "Reproduce chart rendering without modifying the cluster",
      objective:
        "Check whether templates and values can produce valid manifests before another deployment attempt.",
      commands: [
        "helm lint ./<chart-directory>",
        "helm template <release> ./<chart-directory> -n <namespace> -f <values-file.yaml>",
        "helm template <release> ./<chart-directory> -n <namespace> --debug -f <values-file.yaml>"
      ],
      interpretResults: [
        "A template parse error points toward chart syntax, template functions, or malformed YAML.",
        "A missing required value may indicate a values schema or environment configuration problem.",
        "Unexpected rendered names, namespaces, selectors, ports, or image tags may indicate incorrect values.",
        "Successful rendering does not prove Kubernetes will accept the manifests or that workloads will become healthy.",
        "Rendered output may contain sensitive values; store and share it carefully."
      ],
      nextAction:
        "Correct the chart or values in version control, then rerun linting and rendering with the exact production inputs.",
      risk: "low"
    },
    {
      id: "step-06",
      title: "Validate the Kubernetes API and permissions",
      objective:
        "Identify API validation, schema, admission, or authorization failures before another upgrade.",
      commands: [
        "kubectl auth can-i get deployments -n <namespace>",
        "kubectl auth can-i patch deployments -n <namespace>",
        "kubectl auth can-i create jobs -n <namespace>",
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
        "kubectl api-resources"
      ],
      interpretResults: [
        "A 'no' result from kubectl auth can-i points to a permissions gap for the checked operation.",
        "Forbidden errors may involve the CI identity, service account, namespace scope, or cluster policy.",
        "Unknown field or unsupported API errors may indicate an outdated apiVersion or a chart incompatible with the target cluster.",
        "Admission webhook denial may indicate policy violations, unavailable webhook services, or invalid resource configuration.",
        "The commands above check selected permissions only; they do not prove the deployment identity has every required permission."
      ],
      nextAction:
        "Use the pipeline identity and target cluster to reproduce the relevant checks. Request the minimum required permission or fix the manifest or policy.",
      risk: "low"
    },
    {
      id: "step-07",
      title: "Inspect workload readiness and Kubernetes events",
      objective:
        "Determine whether resources were accepted but the application failed to become healthy.",
      commands: [
        "kubectl get deployments,statefulsets,daemonsets -n <namespace>",
        "kubectl get pods -n <namespace> -o wide",
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
        "kubectl describe deployment <deployment> -n <namespace>",
        "kubectl describe pod <pod> -n <namespace>"
      ],
      interpretResults: [
        "ProgressDeadlineExceeded suggests the Deployment did not make progress within its configured deadline.",
        "FailedScheduling suggests insufficient resources, node constraints, taints, affinity, or volume-related scheduling constraints.",
        "ImagePullBackOff suggests an image reference, registry access, or authentication problem.",
        "Readiness probe failures can prevent new replicas from becoming available.",
        "Mount failures can point to a missing Secret, ConfigMap, volume, or storage problem.",
        "Old replicas remaining healthy while new replicas fail may indicate a rollout problem rather than a total service outage."
      ],
      nextAction:
        "Identify the first failing resource and the earliest relevant event. Follow that failure branch rather than changing unrelated settings.",
      risk: "low"
    },
    {
      id: "step-08",
      title: "Inspect application and container logs",
      objective:
        "Separate infrastructure-level failures from application startup or runtime failures.",
      commands: [
        "kubectl logs <pod> -n <namespace> --all-containers=true --tail=200",
        "kubectl logs <pod> -n <namespace> --all-containers=true --previous --tail=200",
        "kubectl get replicasets -n <namespace>",
        "kubectl get pods -n <namespace> -o json"
      ],
      interpretResults: [
        "The --previous option can expose logs from a terminated container instance.",
        "Missing configuration, invalid environment variables, dependency connection errors, and application exceptions may explain failed readiness.",
        "A new ReplicaSet with failing Pods and an older healthy ReplicaSet can help isolate a bad application release.",
        "An empty log result does not prove the application is healthy; the container may not have started or logs may be collected elsewhere."
      ],
      nextAction:
        "Correlate application logs with the image digest, release revision, Pod events, and rollout timestamp. Avoid dumping Secrets or full environment variables.",
      risk: "low"
    },
    {
      id: "step-09",
      title: "Investigate Helm hooks and migration Jobs",
      objective:
        "Determine whether a lifecycle hook or database migration blocked or complicated the upgrade.",
      commands: [
        "helm get hooks <release> -n <namespace>",
        "kubectl get jobs,pods -n <namespace>",
        "kubectl describe job <job> -n <namespace>",
        "kubectl logs job/<job> -n <namespace> --all-containers=true"
      ],
      interpretResults: [
        "A failed pre-upgrade hook may prevent the normal upgrade from completing.",
        "A post-upgrade hook can fail after workload changes have already occurred.",
        "A migration Job may have changed database schema even if Helm ultimately reported failure.",
        "Hook deletion policies may mean completed hook resources are no longer present."
      ],
      nextAction:
        "Confirm the hook execution result and migration state with the application or database owner. Do not rerun a non-idempotent migration without verifying its safety.",
      risk: "medium"
    },
    {
      id: "step-10",
      title: "Determine whether the upgrade timed out",
      objective:
        "Find out whether Helm failed because workloads or Jobs were not ready before the configured timeout.",
      commands: [
        "kubectl get pods -n <namespace> -w",
        "kubectl rollout status deployment/<deployment> -n <namespace> --timeout=120s",
        "kubectl describe deployment <deployment> -n <namespace>",
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp"
      ],
      interpretResults: [
        "If Pods are still progressing, inspect image pulls, scheduling, probes, resource limits, and dependencies.",
        "If workloads are healthy but Helm timed out, compare the actual readiness duration with the configured Helm timeout.",
        "If Pods remain unhealthy after the timeout, increasing the timeout alone will not fix the underlying cause.",
        "The kubectl timeout is independent of Helm's timeout and should be selected for the investigation."
      ],
      nextAction:
        "Fix the actual readiness blocker first. Increase timeout only when evidence shows that normal, safe startup legitimately takes longer.",
      risk: "low"
    },
    {
      id: "step-11",
      title: "Compare the previous and intended release",
      objective:
        "Find the specific chart or configuration change associated with the failure.",
      commands: [
        "helm get values <release> -n <namespace> --revision <previous-revision> -o yaml",
        "helm get manifest <release> -n <namespace> --revision <previous-revision>",
        "helm get manifest <release> -n <namespace> --revision <failed-revision>",
        "git diff <previous-commit>..<current-commit> --"
      ],
      interpretResults: [
        "A changed image digest or image tag can identify a new application build.",
        "A changed Service selector may disconnect traffic from healthy Pods.",
        "Changes to probes, ports, resources, affinity, or configuration can explain readiness or scheduling failures.",
        "Immutable-field changes may require a carefully planned resource migration rather than an automatic replacement.",
        "Revision-specific Helm commands depend on the release history still being available."
      ],
      nextAction:
        "Build a minimal evidence-backed explanation of the change that caused the failure and identify the safest correction.",
      risk: "low"
    },
    {
      id: "step-12",
      title: "Choose a controlled recovery strategy",
      objective:
        "Restore service without losing track of release state or creating additional risk.",
      commands: [
        "helm history <release> -n <namespace>",
        "helm status <release> -n <namespace>",
        "kubectl get deployments,pods,services -n <namespace>"
      ],
      interpretResults: [
        "A corrected forward upgrade is often suitable when the cause is understood and the desired state is safe.",
        "Rollback may be appropriate when the previous revision is known to be healthy and compatible with current external state.",
        "A failed installation may require a different recovery plan from a failed upgrade of an established release.",
        "Database changes, persistent storage, CRDs, external systems, and hook side effects may not be reversed by Helm rollback."
      ],
      nextAction:
        "Obtain required approval, choose forward fix or rollback, preserve evidence, execute one controlled operation, and verify service health.",
      risk: "high"
    }
  ],

  failureCases: [
    {
      id: "case-01",
      symptom: "Error: UPGRADE FAILED: template or YAML rendering error",
      likelyCauses: [
        "Invalid Go template syntax.",
        "Incorrect indentation or malformed YAML.",
        "Missing required values.",
        "Incorrect use of include, tpl, or a template function.",
        "Unexpected type in a values field."
      ],
      confirmWith: [
        "helm lint ./<chart-directory>",
        "helm template <release> ./<chart-directory> -n <namespace> -f <values-file.yaml> --debug",
        "Review the exact template line and values supplied by CI."
      ],
      fix: [
        "Correct the template syntax or indentation.",
        "Supply the expected values with the correct types.",
        "Add values.schema.json validation where appropriate.",
        "Re-render using the same chart artifact and values as the pipeline."
      ],
      validate: [
        "Run helm lint.",
        "Render the chart successfully.",
        "Inspect the changed rendered resources.",
        "Deploy to a safe environment before production."
      ],
      prevention: [
        "Run helm lint and helm template in CI.",
        "Version-control environment values.",
        "Add chart schema validation and review template changes."
      ]
    },
    {
      id: "case-02",
      symptom: "UPGRADE FAILED: Kubernetes resource validation or API version error",
      likelyCauses: [
        "Deprecated or unsupported Kubernetes API version.",
        "Invalid resource field or data type.",
        "Chart incompatible with the target Kubernetes version.",
        "Admission policy rejecting the resource."
      ],
      confirmWith: [
        "kubectl version",
        "kubectl api-resources",
        "helm template <release> ./<chart-directory> -n <namespace> -f <values-file.yaml>",
        "Inspect the full API server or admission error."
      ],
      fix: [
        "Use a supported apiVersion and valid resource schema.",
        "Update the chart for the supported Kubernetes version.",
        "Adjust the manifest to meet admission policy.",
        "Do not bypass production security policy merely to complete the release."
      ],
      validate: [
        "Render the updated chart.",
        "Use server-side dry-run where supported and authorized.",
        "Deploy in a compatible test cluster.",
        "Verify the API server accepts the actual resources."
      ],
      prevention: [
        "Test charts against supported Kubernetes versions.",
        "Track Kubernetes API deprecations.",
        "Include manifest validation in CI."
      ]
    },
    {
      id: "case-03",
      symptom: "Error: UPGRADE FAILED: forbidden",
      likelyCauses: [
        "The CI identity lacks create, patch, update, or delete permission.",
        "The release includes resources outside the identity's namespace scope.",
        "A cluster-scoped resource requires additional authorization.",
        "A policy or admission webhook denied the operation."
      ],
      confirmWith: [
        "kubectl auth can-i patch deployments -n <namespace>",
        "kubectl auth can-i create jobs -n <namespace>",
        "kubectl auth can-i create serviceaccounts -n <namespace>",
        "Inspect the exact denied verb, resource, namespace, and identity."
      ],
      fix: [
        "Grant only the required permissions to the deployment identity.",
        "Separate namespace-scoped application releases from privileged cluster administration.",
        "Correct the resource scope or policy when the chart targets the wrong namespace.",
        "Follow the organization's approval process for production RBAC changes."
      ],
      validate: [
        "Repeat the permission check using the actual deployment identity.",
        "Verify both normal resources and required hooks can be managed.",
        "Run a controlled deployment and confirm the release completes."
      ],
      prevention: [
        "Use dedicated CI identities.",
        "Maintain reviewed, least-privilege RBAC.",
        "Test permissions before the deployment window."
      ]
    },
    {
      id: "case-04",
      symptom: "UPGRADE FAILED: cannot patch or field is immutable",
      likelyCauses: [
        "An immutable Service field changed.",
        "A StatefulSet field cannot be updated in place.",
        "A selector or other immutable field changed.",
        "The chart attempts to replace a resource in an unsafe order."
      ],
      confirmWith: [
        "helm get manifest <release> -n <namespace>",
        "kubectl get service <service> -n <namespace> -o yaml",
        "kubectl get statefulset <statefulset> -n <namespace> -o yaml",
        "Compare the existing live object with the rendered manifest."
      ],
      fix: [
        "Identify the exact immutable field from the API error.",
        "Prefer a compatible in-place change where possible.",
        "If replacement is required, design a migration with traffic, storage, and downtime considerations.",
        "Do not use --force without understanding which resources could be replaced."
      ],
      validate: [
        "Review the migration plan.",
        "Confirm storage and traffic preservation.",
        "Test the resource migration in a representative environment.",
        "Verify endpoints and application health afterward."
      ],
      prevention: [
        "Review rendered manifest diffs.",
        "Avoid unnecessary selector changes.",
        "Use explicit migration plans for immutable resource changes."
      ]
    },
    {
      id: "case-05",
      symptom: "UPGRADE FAILED: timed out waiting for the condition",
      likelyCauses: [
        "Pods cannot schedule.",
        "Image downloads are slow or failing.",
        "Readiness or startup probes fail.",
        "The application takes longer to initialize.",
        "A required dependency is unavailable.",
        "A Job or hook has not completed."
      ],
      confirmWith: [
        "kubectl get pods -n <namespace> -o wide",
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
        "kubectl describe deployment <deployment> -n <namespace>",
        "kubectl logs <pod> -n <namespace> --all-containers=true --tail=200",
        "helm history <release> -n <namespace>"
      ],
      fix: [
        "Resolve the actual scheduling, image, probe, application, or dependency failure.",
        "Correct readiness probes if they do not represent actual readiness.",
        "Increase the timeout only if healthy startup legitimately requires more time.",
        "Check whether the release already changed before retrying."
      ],
      validate: [
        "Confirm desired replicas become available.",
        "Run rollout status checks.",
        "Test application endpoints and dependencies.",
        "Verify Helm status and release history."
      ],
      prevention: [
        "Track deployment duration percentiles.",
        "Use realistic readiness probes and timeouts.",
        "Alert on stalled rollouts and repeated failed upgrades."
      ]
    },
    {
      id: "case-06",
      symptom: "New Pods are in ImagePullBackOff or ErrImagePull",
      likelyCauses: [
        "Image tag does not exist.",
        "Wrong registry or repository.",
        "Image pull credentials are missing or expired.",
        "Registry rate limits or network connectivity issues.",
        "Incorrect architecture-specific image."
      ],
      confirmWith: [
        "kubectl describe pod <pod> -n <namespace>",
        "helm get values <release> -n <namespace> --all",
        "Inspect the rendered image reference.",
        "Check the registry and image digest using approved registry tooling."
      ],
      fix: [
        "Use a valid, approved image reference.",
        "Restore the correct image pull secret or workload identity configuration.",
        "Resolve registry access or rate limiting.",
        "Prefer immutable image digests for reproducible production deployments."
      ],
      validate: [
        "Confirm the image pulls successfully.",
        "Check Pod readiness and rollout status.",
        "Verify the running image matches the approved artifact."
      ],
      prevention: [
        "Validate image existence before deployment.",
        "Use registry authentication tests.",
        "Promote the same immutable artifact between environments."
      ]
    },
    {
      id: "case-07",
      symptom: "New Pods fail readiness or startup probes",
      likelyCauses: [
        "Incorrect probe path or port.",
        "Application startup exceeds the configured probe timing.",
        "Missing configuration or Secret.",
        "Dependency connection failure.",
        "The application is running but not ready to receive traffic."
      ],
      confirmWith: [
        "kubectl describe pod <pod> -n <namespace>",
        "kubectl logs <pod> -n <namespace> --all-containers=true --tail=200",
        "kubectl get configmap -n <namespace>",
        "kubectl get endpoints <service> -n <namespace>"
      ],
      fix: [
        "Correct probe configuration based on the application's real health behavior.",
        "Restore required configuration using approved secret-management processes.",
        "Resolve the failing dependency or application startup error.",
        "Avoid weakening readiness checks so far that unhealthy Pods receive traffic."
      ],
      validate: [
        "Check probe success and available replicas.",
        "Confirm Service endpoints include ready Pods.",
        "Run application smoke tests."
      ],
      prevention: [
        "Test probes with representative startup times.",
        "Validate required configuration in CI.",
        "Monitor readiness failures and restart rates."
      ]
    },
    {
      id: "case-08",
      symptom: "A Helm pre-upgrade or post-upgrade hook fails",
      likelyCauses: [
        "Migration Job exits unsuccessfully.",
        "Hook ServiceAccount lacks permissions.",
        "Hook image or configuration is invalid.",
        "A dependency is unavailable.",
        "Hook ordering or deletion policies are incorrect."
      ],
      confirmWith: [
        "helm get hooks <release> -n <namespace>",
        "kubectl get jobs,pods -n <namespace>",
        "kubectl describe job <job> -n <namespace>",
        "kubectl logs job/<job> -n <namespace> --all-containers=true"
      ],
      fix: [
        "Correct the hook's image, configuration, permissions, or dependency.",
        "Verify migration idempotency and database state before rerunning.",
        "Review hook annotations and lifecycle ordering.",
        "Determine whether normal release resources changed before the hook failed."
      ],
      validate: [
        "Verify hook exit status.",
        "Verify database or external migration state with the owning team.",
        "Confirm application compatibility with the resulting schema.",
        "Run the upgrade in a controlled environment."
      ],
      prevention: [
        "Test hooks independently.",
        "Use bounded Job retries and timeouts.",
        "Make migration behavior safe and observable.",
        "Document hook side effects and recovery requirements."
      ]
    },
    {
      id: "case-09",
      symptom: "UPGRADE FAILED: another operation is in progress",
      likelyCauses: [
        "Concurrent pipelines target the same release.",
        "A previous deployment was interrupted.",
        "A release is in a pending state.",
        "An automation process is still operating on the release."
      ],
      confirmWith: [
        "helm history <release> -n <namespace>",
        "helm status <release> -n <namespace>",
        "Review pipeline run history and deployment locks.",
        "Check whether another operator or controller is changing the release."
      ],
      fix: [
        "Stop duplicate deployment attempts.",
        "Wait for a confirmed active operation to finish.",
        "Determine the actual state of the pending or failed release before recovery.",
        "Escalate release-storage repair to an experienced operator if the state remains inconsistent."
      ],
      validate: [
        "Confirm only one deployment operation is active.",
        "Verify the release status and revision history.",
        "Run one controlled operation after the cause is resolved."
      ],
      prevention: [
        "Serialize deployments per release and environment.",
        "Use pipeline concurrency controls.",
        "Keep deployment locks observable and recoverable."
      ]
    },
    {
      id: "case-10",
      symptom: "The release reports failure but application changes appear to be applied",
      likelyCauses: [
        "A later resource failed after earlier resources changed.",
        "A hook failed after workloads were updated.",
        "Helm timed out while workloads continued progressing.",
        "A rollback or cleanup operation did not restore all external side effects."
      ],
      confirmWith: [
        "helm status <release> -n <namespace>",
        "helm history <release> -n <namespace>",
        "helm get manifest <release> -n <namespace>",
        "kubectl get deployments,replicasets,pods -n <namespace>",
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp"
      ],
      fix: [
        "Reconcile the Helm release record with the actual live Kubernetes state.",
        "Determine which resources changed and which remain healthy.",
        "Choose a deliberate forward fix or rollback based on the actual state.",
        "Avoid repeated blind upgrades that may compound the difference."
      ],
      validate: [
        "Verify release revision and status.",
        "Verify the live workload image and configuration.",
        "Confirm traffic, dependencies, and application behavior.",
        "Document any remaining drift between Helm and live resources."
      ],
      prevention: [
        "Capture release history in deployment logs.",
        "Use readiness checks and post-deployment smoke tests.",
        "Build explicit recovery procedures for partial failures."
      ]
    },
    {
      id: "case-11",
      symptom: "Upgrade fails due to a database schema or application compatibility problem",
      likelyCauses: [
        "A new application version requires a schema that is not yet available.",
        "A migration partially completed.",
        "The old application cannot work with the new schema.",
        "A migration Job ran even though the overall upgrade failed."
      ],
      confirmWith: [
        "helm get hooks <release> -n <namespace>",
        "kubectl get jobs,pods -n <namespace>",
        "Inspect migration logs and database migration history.",
        "Check application compatibility requirements for both versions."
      ],
      fix: [
        "Coordinate recovery with the database and application owners.",
        "Use a documented expand-and-contract migration strategy where possible.",
        "Do not assume Helm rollback reverses database schema changes.",
        "Prefer a compatible forward fix when reverting the application would break the updated schema."
      ],
      validate: [
        "Verify migration state directly with approved database tooling.",
        "Test the application against the current schema.",
        "Verify data integrity and critical business operations.",
        "Complete smoke tests before reopening full traffic."
      ],
      prevention: [
        "Version and test database migrations.",
        "Make migration steps observable and recoverable.",
        "Test rollback compatibility.",
        "Require explicit approval for destructive schema changes."
      ]
    },
    {
      id: "case-12",
      symptom: "Service returns 502 or 503 after an apparently successful upgrade",
      likelyCauses: [
        "No ready Service endpoints.",
        "Service selector no longer matches Pod labels.",
        "Application container port changed.",
        "Ingress or gateway configuration changed.",
        "New Pods are running but application dependencies are unavailable."
      ],
      confirmWith: [
        "kubectl get service <service> -n <namespace> -o yaml",
        "kubectl get endpoints <service> -n <namespace>",
        "kubectl get endpointslices -n <namespace>",
        "kubectl get pods -n <namespace> --show-labels",
        "kubectl describe ingress <ingress> -n <namespace>"
      ],
      fix: [
        "Correct Service selectors, ports, target ports, or chart values.",
        "Restore the last known-good application configuration when appropriate.",
        "Check gateway and ingress controller logs.",
        "Confirm that ready endpoints serve the expected application."
      ],
      validate: [
        "Check endpoints and endpoint readiness.",
        "Run HTTP smoke tests from inside and outside the cluster as appropriate.",
        "Verify response codes, latency, and error rates."
      ],
      prevention: [
        "Validate Service selectors and ports in CI.",
        "Run post-upgrade HTTP smoke tests.",
        "Alert on sudden endpoint loss and 5xx spikes."
      ]
    },
    {
      id: "case-13",
      symptom: "Upgrade fails because a required CRD or custom resource is unavailable",
      likelyCauses: [
        "The custom resource definition was never installed.",
        "The CRD is not established yet.",
        "The operator version is incompatible.",
        "The chart incorrectly assumes a CRD upgrade is automatically handled."
      ],
      confirmWith: [
        "kubectl get crd",
        "kubectl get crd <crd-name> -o yaml",
        "kubectl get pods -A",
        "kubectl api-resources",
        "helm get manifest <release> -n <namespace>"
      ],
      fix: [
        "Follow the operator vendor's CRD installation and upgrade procedure.",
        "Verify the required CRD version and operator compatibility.",
        "Install or upgrade CRDs using the documented lifecycle process.",
        "Do not delete a production CRD without understanding the effect on custom resources."
      ],
      validate: [
        "Wait for the CRD to become established.",
        "Confirm the API resource is discoverable.",
        "Validate custom resources and operator reconciliation.",
        "Retry the application upgrade only after prerequisites are ready."
      ],
      prevention: [
        "Manage CRD lifecycle explicitly.",
        "Document dependencies between platform and application releases.",
        "Test fresh-cluster installation and in-place upgrade paths."
      ]
    },
    {
      id: "case-14",
      symptom: "Upgrade succeeds but the wrong configuration or image is deployed",
      likelyCauses: [
        "Incorrect values file or values-file ordering.",
        "Wrong environment selected in CI.",
        "A stale chart package or cached artifact was used.",
        "The intended image tag was overridden.",
        "Pipeline variables were empty or incorrectly mapped."
      ],
      confirmWith: [
        "git rev-parse HEAD",
        "helm get values <release> -n <namespace> --all",
        "helm get manifest <release> -n <namespace>",
        "kubectl get deployment <deployment> -n <namespace> -o yaml"
      ],
      fix: [
        "Correct the values-file order and environment mapping.",
        "Pin the chart version and image digest.",
        "Rebuild or select the correct immutable artifact.",
        "Review the rendered manifest before deployment."
      ],
      validate: [
        "Compare desired image digest with the running image.",
        "Verify environment-specific configuration.",
        "Run the application smoke tests."
      ],
      prevention: [
        "Use explicit environment inputs.",
        "Record chart version, Git SHA, and image digest.",
        "Reject empty or invalid pipeline variables.",
        "Promote the same artifact across environments."
      ]
    },
    {
      id: "case-15",
      symptom: "Upgrade fails because a dependency or external service is unavailable",
      likelyCauses: [
        "A required database or API is unreachable.",
        "DNS or network policy blocks connectivity.",
        "A Secret or certificate has expired.",
        "A service endpoint changed.",
        "An external dependency is degraded."
      ],
      confirmWith: [
        "kubectl logs <pod> -n <namespace> --all-containers=true --tail=200",
        "kubectl describe pod <pod> -n <namespace>",
        "kubectl get networkpolicy -n <namespace>",
        "Review approved application dependency health checks."
      ],
      fix: [
        "Restore connectivity or credentials through approved processes.",
        "Correct DNS, endpoint, network policy, or certificate configuration.",
        "Use bounded retries and timeouts for transient failures.",
        "Do not hard-code credentials or bypass network security."
      ],
      validate: [
        "Verify the dependency from the application's actual network context.",
        "Check application readiness and error rates.",
        "Confirm the release is stable after the dependency recovers."
      ],
      prevention: [
        "Monitor dependency availability and certificate expiry.",
        "Add dependency health checks.",
        "Document retry, timeout, and recovery behavior."
      ]
    }
  ],

  productionIncidents: [
    {
      scenario:
        "Production Helm upgrade fails at 14:05, while the deployment pipeline reports UPGRADE FAILED.",
      impact:
        "Some new Pods may have started while others are unavailable. The old ReplicaSet may still have healthy replicas. Customer impact is not known until traffic and service health are checked.",
      evidence: [
        "Pipeline run ID, command, exit code, and timestamp.",
        "Helm history and status before recovery.",
        "Chart version, Git SHA, values inputs, and image digest.",
        "Deployment, ReplicaSet, Pod, and Service state.",
        "Kubernetes events and container logs.",
        "Ingress or gateway error rates and application health."
      ],
      investigation: [
        "Pause additional releases to the affected service.",
        "Confirm cluster context and namespace.",
        "Inspect helm history and status.",
        "Compare the last known-good revision with the failed revision.",
        "Inspect Pods, rollout status, events, and readiness probes.",
        "Check whether a migration or hook ran.",
        "Determine whether the problem is template rendering, Kubernetes rejection, workload readiness, or application behavior."
      ],
      recovery: [
        "If the failure is a harmless chart validation issue before cluster changes, fix the chart and validate it before rerunning.",
        "If new Pods are unhealthy but the previous revision is compatible and healthy, evaluate a controlled rollback.",
        "If a database migration or external side effect occurred, verify compatibility before rollback.",
        "If a forward fix is safer, correct the exact root cause and execute one approved upgrade.",
        "Verify endpoints, application smoke tests, error rates, and release status."
      ],
      closureCriteria: [
        "The intended release is deployed and its status is understood.",
        "Desired replicas are available and no rollout is stuck.",
        "Critical user journeys and health checks pass.",
        "Error rate and latency have returned to acceptable levels.",
        "The incident timeline, root cause, corrective actions, and prevention tasks are documented."
      ]
    },
    {
      scenario:
        "Helm reports a timeout because the new application version cannot pass readiness checks.",
      impact:
        "The deployment may be stuck, traffic may continue reaching old replicas, or capacity may be reduced if the rollout has already changed the workload.",
      evidence: [
        "Deployment rollout status.",
        "New and old ReplicaSet replica counts.",
        "Pod events, readiness probe results, and application logs.",
        "Rendered probe configuration and container ports.",
        "Resource requests, limits, and scheduling events."
      ],
      investigation: [
        "Determine whether the new Pods were scheduled and started.",
        "Inspect the first readiness or startup probe failure.",
        "Check application startup logs and dependency errors.",
        "Compare probes, ports, and configuration with the previous release.",
        "Check whether CPU or memory pressure is slowing initialization."
      ],
      recovery: [
        "Correct the probe, port, configuration, or application dependency based on evidence.",
        "If recovery requires rollback, verify compatibility and obtain approval.",
        "Do not increase timeout merely to hide a permanently failing health check.",
        "Re-run the upgrade once the specific blocker is fixed."
      ],
      closureCriteria: [
        "New replicas pass readiness checks.",
        "Rollout completes within the expected window.",
        "Service endpoints contain ready Pods.",
        "Application smoke tests succeed."
      ]
    },
    {
      scenario:
        "Helm upgrade fails after a database migration hook runs.",
      impact:
        "The application release may be on the old version while the database schema has already changed. A simple Helm rollback may leave an incompatible application/database combination.",
      evidence: [
        "Helm hook manifests and hook execution logs.",
        "Database migration history from the approved database tooling.",
        "Old and new application compatibility requirements.",
        "Release revision history and application errors."
      ],
      investigation: [
        "Identify whether the hook ran before or after the main upgrade.",
        "Determine whether the migration completed, failed, or partially applied.",
        "Check whether the previous application version supports the current schema.",
        "Engage the database owner before any destructive remediation."
      ],
      recovery: [
        "Use a documented migration recovery plan.",
        "Prefer a compatible forward fix when reverting the application would be unsafe.",
        "Do not manually edit Helm release storage to hide the failure.",
        "Do not rerun non-idempotent migrations until their state is confirmed."
      ],
      closureCriteria: [
        "Database migration state is verified.",
        "Application and schema versions are compatible.",
        "Critical reads and writes pass validation.",
        "The recovery decision and remaining risks are recorded."
      ]
    },
    {
      scenario:
        "The pipeline reports success, but users receive HTTP 503 immediately after deployment.",
      impact:
        "The Helm release may be deployed successfully while the application is not reachable through the Service or ingress.",
      evidence: [
        "Helm release status and revision.",
        "Service selectors, ports, and endpoint addresses.",
        "Pod readiness and labels.",
        "Ingress or gateway logs and HTTP response codes.",
        "Application smoke-test output."
      ],
      investigation: [
        "Confirm the Service has ready endpoints.",
        "Compare Service selectors with Pod labels.",
        "Verify target ports and the application listening port.",
        "Check ingress routing and backend health.",
        "Check whether the application starts but fails on dependency requests."
      ],
      recovery: [
        "Correct the exact selector, port, readiness, or routing mismatch.",
        "If traffic must be restored immediately, consider the approved rollback or traffic-shift procedure.",
        "Recheck endpoint health and external HTTP behavior."
      ],
      closureCriteria: [
        "Service endpoints are healthy.",
        "External requests return expected status codes.",
        "Error rate and latency return to baseline.",
        "Post-deployment smoke tests run automatically."
      ]
    }
  ],

  commandReference: [
    {
      command: "helm list -A",
      purpose: "List Helm releases across namespaces.",
      caution: "Use it to identify scope; do not assume the displayed status proves application health."
    },
    {
      command: "helm status <release> -n <namespace>",
      purpose: "Inspect the current release status and release information.",
      caution: "A release status alone does not show every live Kubernetes resource or external side effect."
    },
    {
      command: "helm history <release> -n <namespace>",
      purpose: "Inspect release revisions and their statuses.",
      caution: "Confirm the correct release and namespace before choosing a rollback target."
    },
    {
      command: "helm get values <release> -n <namespace> -o yaml",
      purpose: "Inspect user-supplied release values.",
      caution: "Values may contain sensitive configuration."
    },
    {
      command: "helm get values <release> -n <namespace> --all -o yaml",
      purpose: "Inspect computed release values.",
      caution: "Review the output for secrets before storing or sharing it."
    },
    {
      command: "helm get manifest <release> -n <namespace>",
      purpose: "Inspect the Kubernetes manifest recorded for a release.",
      caution: "This is not a complete inventory of every controller-created or external resource."
    },
    {
      command: "helm get hooks <release> -n <namespace>",
      purpose: "Inspect Helm lifecycle hook manifests.",
      caution: "Hook execution history may require Kubernetes Jobs, logs, and external system evidence."
    },
    {
      command: "helm lint ./<chart-directory>",
      purpose: "Check chart structure and common chart errors.",
      caution: "A successful lint does not guarantee runtime readiness."
    },
    {
      command: "helm template <release> ./<chart-directory> -n <namespace> -f <values-file.yaml>",
      purpose: "Render chart templates locally.",
      caution: "Rendered output may contain sensitive data and is not proof of server-side acceptance."
    },
    {
      command: "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
      purpose: "Inspect time-ordered Kubernetes events.",
      caution: "Events have retention limits and may no longer include the earliest incident evidence."
    },
    {
      command: "kubectl rollout status deployment/<deployment> -n <namespace> --timeout=120s",
      purpose: "Wait for Deployment rollout status.",
      caution: "The timeout here is independent of the Helm timeout."
    },
    {
      command: "helm upgrade <release> ./<chart-directory> -n <namespace> -f <values-file.yaml> --dry-run=server",
      purpose: "Request a server-connected Helm dry run when supported by the installed Helm version.",
      caution: "Dry-run behavior and server interaction depend on the Helm version. It does not prove the full rollout will succeed."
    }
  ],

  recoveryRunbook: [
    "1. Declare the incident and stop duplicate deployment attempts.",
    "2. Confirm the exact context, namespace, release name, and environment.",
    "3. Check service impact, healthy replicas, traffic, and customer-facing errors.",
    "4. Capture Helm history, status, pipeline logs, Git SHA, chart version, values, and image digest.",
    "5. Determine whether the failure happened during rendering, API submission, workload readiness, a hook, or application validation.",
    "6. Identify the first failing resource and confirm its cause using events, logs, manifests, and live state.",
    "7. Check whether database migrations, persistent storage changes, or external side effects occurred.",
    "8. Choose a corrected forward upgrade or a controlled rollback with the appropriate owner approval.",
    "9. Validate the candidate change with lint, rendering, and appropriate API checks.",
    "10. Execute one controlled recovery operation and record the exact command and revision.",
    "11. Verify Helm status, rollout completion, ready replicas, Service endpoints, and application smoke tests.",
    "12. Monitor error rate, latency, restart counts, and dependency health.",
    "13. Keep the incident open until recovery criteria are satisfied.",
    "14. Document root cause, contributing factors, recovery actions, and preventive work."
  ],

  rollbackRunbook: [
    "1. Verify that the previous revision is the intended known-good release.",
    "2. Review helm history and identify the exact revision number.",
    "3. Compare the previous chart, values, image, and application compatibility.",
    "4. Confirm whether database migrations, CRDs, storage, and external side effects are reversible or backward-compatible.",
    "5. Obtain the required approval and confirm the rollback target.",
    "6. Execute the rollback only after evaluating its consequences: helm rollback <release> <revision> -n <namespace>.",
    "7. Watch the resulting workload rollout and inspect events and logs.",
    "8. Verify Service endpoints, application health, and critical business operations.",
    "9. Confirm the final Helm status and record the resulting revision.",
    "10. If rollback fails, stop repeated attempts and reassess the live state before further changes.",
    "Important: Helm rollback is not a universal undo for database changes, external APIs, persistent data, CRD lifecycle, or arbitrary hook side effects."
  ],

  validationChecklist: [
    "Correct Kubernetes context and namespace confirmed.",
    "Expected Helm release revision and status confirmed.",
    "Expected chart version, Git SHA, and image digest deployed.",
    "Deployment or StatefulSet rollout completed.",
    "Desired replicas are available.",
    "No unexplained CrashLoopBackOff, ImagePullBackOff, or Pending Pods remain.",
    "Readiness and startup probes pass.",
    "Service endpoints and ingress backends are healthy.",
    "Critical application smoke tests pass.",
    "Database migrations and schema compatibility are verified.",
    "Error rate, latency, and restart counts are acceptable.",
    "Security and access controls remain enabled.",
    "Incident evidence and recovery actions are documented."
  ],

  preventionChecklist: [
    "Pin Helm chart and dependency versions.",
    "Promote immutable image digests between environments.",
    "Run helm lint in CI.",
    "Run helm template with the exact target environment values.",
    "Validate values schemas and required pipeline variables.",
    "Test supported Kubernetes versions and API compatibility.",
    "Check required permissions using the deployment identity.",
    "Validate image existence and registry access before deployment.",
    "Test hooks and migrations independently.",
    "Make migration operations idempotent or provide a documented recovery strategy.",
    "Serialize deployments to the same release.",
    "Use a deliberate timeout based on observed startup duration.",
    "Review resource and immutable-field changes before deployment.",
    "Require approvals for production and destructive changes.",
    "Run post-deployment smoke tests.",
    "Store deployment metadata, logs, and artifact identifiers.",
    "Maintain a tested rollback and forward-recovery runbook.",
    "Practice failed-upgrade recovery in a non-production environment."
  ],

  monitoringAndAlerting: [
    "Alert when a deployment pipeline fails for a production release.",
    "Alert when a Deployment has unavailable replicas beyond an agreed threshold.",
    "Alert on prolonged rollout duration or repeated rollout failures.",
    "Monitor Pod restarts, CrashLoopBackOff, ImagePullBackOff, and Pending states.",
    "Monitor readiness probe failures and failed Job counts.",
    "Monitor application HTTP 5xx rate, latency, and critical transaction success.",
    "Monitor Service endpoint count and gateway backend health.",
    "Track deployment duration and failure rate by service, environment, and chart version.",
    "Include release name, namespace, revision, Git SHA, image digest, and pipeline run ID in deployment events.",
    "Avoid putting credentials, Secret values, or sensitive rendered manifests into alerts.",
    "Define a clear owner and response runbook for every production deployment alert."
  ],

  cicdIntegration: [
    "Step 1: Check out the approved commit and verify the expected working directory.",
    "Step 2: Set the exact Helm version and verify the Kubernetes context.",
    "Step 3: Validate chart dependencies and ensure the expected lock file is committed.",
    "Step 4: Run helm lint.",
    "Step 5: Render templates using the exact environment values.",
    "Step 6: Validate required values, image references, and chart version.",
    "Step 7: Run security and policy checks on rendered manifests.",
    "Step 8: Perform supported API dry-run validation where appropriate.",
    "Step 9: Require production approval and serialize deployments per release.",
    "Step 10: Execute the approved upgrade with reviewed timeout and wait behavior.",
    "Step 11: Capture command exit status, release history, and deployment metadata.",
    "Step 12: Wait for rollout completion and run application smoke tests.",
    "Step 13: Stop promotion if the rollout or smoke tests fail.",
    "Step 14: Trigger the documented recovery process instead of blindly rerunning the pipeline.",
    "Step 15: Publish a redacted deployment report and monitoring links."
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Service and Helm release:",
    "Environment and namespace:",
    "Incident start and end time:",
    "Severity and customer impact:",
    "Pipeline run ID:",
    "Git SHA and chart version:",
    "Previous and failed revision:",
    "Deployment command and relevant flags:",
    "Observed error message:",
    "First failing resource or hook:",
    "Evidence collected:",
    "Confirmed root cause:",
    "Contributing factors:",
    "Recovery decision and approval:",
    "Recovery commands and resulting revision:",
    "Application and data validation:",
    "Customer impact and duration:",
    "Preventive actions, owners, and due dates:",
    "Runbook or monitoring improvements:"
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Invalid chart template",
      objective: "Learn to identify a failure before touching the cluster.",
      steps: [
        "Create a test copy of a sample Helm chart.",
        "Introduce a template syntax error in the test copy.",
        "Run helm lint ./<chart-directory>.",
        "Run helm template test-release ./<chart-directory> -n test.",
        "Correct the syntax and rerun both commands.",
        "Compare the rendered manifests before and after the fix."
      ],
      expectedLearning:
        "A rendering failure can be isolated before a cluster upgrade, reducing production risk."
    },
    {
      title: "Lab 2 — Readiness failure and Helm timeout",
      objective: "Distinguish a timeout from the actual application failure.",
      steps: [
        "Deploy a sample application into a disposable test namespace.",
        "Use an intentionally incorrect readiness probe in the test chart.",
        "Perform a test upgrade with an appropriately short timeout.",
        "Inspect helm history and status.",
        "Inspect Pods, events, and application logs.",
        "Correct the probe and perform a controlled recovery."
      ],
      expectedLearning:
        "Increasing the timeout does not fix an incorrect readiness probe."
    },
    {
      title: "Lab 3 — Image pull failure",
      objective: "Diagnose invalid image references without exposing credentials.",
      steps: [
        "Use a test chart with a deliberately invalid image tag.",
        "Perform an upgrade only in a disposable cluster or namespace.",
        "Inspect Pod events and the rendered image reference.",
        "Correct the image tag or digest.",
        "Verify the resulting Pod becomes ready."
      ],
      expectedLearning:
        "The Kubernetes event identifies the pull failure, while the chart and pipeline reveal why the incorrect image was selected."
    },
    {
      title: "Lab 4 — Failed hook Job",
      objective: "Understand hook failures and their effect on recovery.",
      steps: [
        "Create a test-only hook Job that exits unsuccessfully.",
        "Run the upgrade in a disposable environment.",
        "Inspect helm get hooks, Helm history, Job events, and logs.",
        "Determine whether the hook runs before or after the main upgrade.",
        "Correct the hook and verify the lifecycle behavior."
      ],
      expectedLearning:
        "A failed hook may have different recovery implications depending on when it runs and what side effects it creates."
    },
    {
      title: "Lab 5 — Controlled rollback",
      objective: "Practice revision-based recovery.",
      steps: [
        "Deploy a known-good test release.",
        "Upgrade to a second test revision.",
        "Inspect helm history and record the revision numbers.",
        "Evaluate the previous revision before rollback.",
        "Execute helm rollback only in the disposable environment.",
        "Verify the resulting status, rollout, endpoints, and application behavior."
      ],
      expectedLearning:
        "Rollback is a deliberate release operation, and application health must be verified independently of Helm status."
    }
  ],

  interviewQuestions: [
    {
      question: "What is a Helm upgrade failure?",
      answer:
        "It occurs when Helm cannot complete the requested release update. The failure can happen during template rendering, Kubernetes API operations, readiness waiting, hook execution, or related release processing."
    },
    {
      question: "Does UPGRADE FAILED mean that no resources changed?",
      answer:
        "No. Depending on the failure stage and command behavior, some resources or external side effects may already have changed. Inspect release history and live resources."
    },
    {
      question: "What is your first action after a production Helm upgrade fails?",
      answer:
        "Confirm the target context and namespace, assess service impact, stop duplicate deployment attempts, inspect Helm status and history, and preserve evidence before changing the release."
    },
    {
      question: "What is the difference between helm status and helm history?",
      answer:
        "helm status shows information about a release's current status and resources. helm history lists its revisions and their statuses."
    },
    {
      question: "How do you troubleshoot a Helm template error?",
      answer:
        "Run helm lint and helm template using the same chart and values as CI. Inspect the exact template error and correct the template or input values."
    },
    {
      question: "What does a Helm timeout mean?",
      answer:
        "Helm did not finish the required operation within the configured timeout. Investigate scheduling, image pulls, probes, hooks, and application startup before deciding whether a longer timeout is appropriate."
    },
    {
      question: "What is the role of --wait?",
      answer:
        "It asks Helm to wait for supported resources to become ready before considering the operation complete. It does not replace application-specific smoke tests."
    },
    {
      question: "What does --atomic do?",
      answer:
        "It enables rollback behavior on failure for an upgrade; for an install, failure can trigger uninstall behavior. Its exact effects and supported options depend on the Helm version. It cannot universally reverse database changes or external side effects."
    },
    {
      question: "Should we always use --force when an upgrade fails?",
      answer:
        "No. Forceful replacement can disrupt resources or cause downtime. Identify the immutable field and design a safe migration instead."
    },
    {
      question: "How do you troubleshoot a forbidden error?",
      answer:
        "Identify the exact denied operation, resource, namespace, and deployment identity. Check the relevant permissions and correct least-privilege RBAC or policy configuration."
    },
    {
      question: "How do you investigate a failed hook?",
      answer:
        "Inspect helm get hooks, Job status, Pod events, logs, hook annotations, and the external side effects of the hook."
    },
    {
      question: "Why can a rollback be dangerous after a database migration?",
      answer:
        "The database schema may already have changed, while the old application may not support that schema. Verify migration state and compatibility before rolling back."
    },
    {
      question: "How do you investigate ImagePullBackOff after an upgrade?",
      answer:
        "Inspect Pod events, rendered image references, registry access, image tags or digests, and image pull authentication."
    },
    {
      question: "What does ProgressDeadlineExceeded indicate?",
      answer:
        "The Deployment failed to make sufficient progress within its configured progress deadline. Inspect the ReplicaSets, Pods, events, probes, and resource constraints."
    },
    {
      question: "How do you distinguish Helm failure from application failure?",
      answer:
        "Check whether rendering and API operations succeeded, whether workloads became ready, and whether application-level smoke tests pass. Helm status alone cannot establish business functionality."
    },
    {
      question: "What causes another operation to be in progress?",
      answer:
        "Concurrent pipelines, an interrupted release operation, or a pending release state can be responsible. Stop duplicate operations and investigate the actual release state."
    },
    {
      question: "How do you compare two Helm revisions?",
      answer:
        "Inspect history and revision-specific manifests and values, then compare the chart, image, and Git changes associated with each revision."
    },
    {
      question: "Why can Helm report success while users see HTTP 503?",
      answer:
        "The workload may not serve traffic correctly because of missing endpoints, selectors, ports, ingress configuration, readiness, or application dependency problems."
    },
    {
      question: "How do you prevent repeated upgrade failures?",
      answer:
        "Use chart linting, template and policy validation, artifact pinning, permission checks, serialized deployments, smoke tests, monitoring, and a tested recovery runbook."
    },
    {
      question: "What evidence belongs in a production postmortem?",
      answer:
        "Include the timeline, impact, release revisions, chart and image identifiers, commands, logs, first failing resource, verified root cause, recovery decision, validation results, and preventive actions."
    }
  ],

  officialReferences: [
    {
      title: "Helm Upgrade Command",
      url: "https://helm.sh/docs/helm/helm_upgrade/"
    },
    {
      title: "Helm Rollback Command",
      url: "https://helm.sh/docs/helm/helm_rollback/"
    },
    {
      title: "Helm Status Command",
      url: "https://helm.sh/docs/helm/helm_status/"
    },
    {
      title: "Helm History Command",
      url: "https://helm.sh/docs/helm/helm_history/"
    },
    {
      title: "Helm Get Manifest Command",
      url: "https://helm.sh/docs/helm/helm_get_manifest/"
    },
    {
      title: "Helm Template Command",
      url: "https://helm.sh/docs/helm/helm_template/"
    },
    {
      title: "Helm Chart Tests",
      url: "https://helm.sh/docs/topics/chart_tests/"
    },
    {
      title: "Kubernetes Deployments",
      url: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/"
    },
    {
      title: "Kubernetes Debugging Pods",
      url: "https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/"
    }
  ]
};
