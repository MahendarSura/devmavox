
export interface HelmDiagnosticStep {
  id: string;
  title: string;
  objective: string;
  commands: string[];
  interpretResults: string[];
  nextDecision: string;
  safetyNote?: string;
}

export interface HelmFailureCase {
  id: string;
  title: string;
  symptoms: string[];
  likelyCauses: string[];
  diagnosticSteps: string[];
  resolution: string[];
  validation: string[];
  prevention: string[];
}

export interface HelmProductionIncident {
  title: string;
  severity: string;
  scenario: string;
  impact: string[];
  immediateActions: string[];
  investigation: string[];
  recovery: string[];
  closureCriteria: string[];
}

export interface HelmChartInstallationGuide {
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  overview: string;
  objectives: string[];
  incidentWorkflow: HelmDiagnosticStep[];
  failureCases: HelmFailureCase[];
  productionIncidents: HelmProductionIncident[];
  commandReference: {
    title: string;
    commands: string[];
    warning?: string;
  }[];
  recoveryRunbook: string[];
  rollbackStrategy: string[];
  preventionChecklist: string[];
  monitoringAndAlerting: string[];
  ciValidation: string[];
  incidentReportTemplate: string[];
  handsOnLabs: {
    title: string;
    objective: string;
    steps: string[];
    expectedOutcome: string;
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

export const chartInstallationFailureGuide: HelmChartInstallationGuide = {
  title: "Helm Chart Installation and Upgrade Failures",
  slug: "chart-installation-failure",
  category: "Helm",
  difficulty: "Advanced",

  overview: `
Helm packages Kubernetes resources into charts and manages their installation
and upgrade lifecycle as releases.

A chart installation failure can happen before Helm contacts Kubernetes,
during template rendering, during API validation, while creating resources,
or after some resources have already been created.

A failed command does not automatically mean that nothing changed.

Production troubleshooting must determine:
- Which cluster, namespace, release, chart, and chart version are involved.
- Whether the failure occurred during dependency resolution, rendering, API validation,
  resource creation, readiness, hook execution, or a later rollout.
- Whether the release is new, deployed, failed, pending, or already partially applied.
- Whether shared resources, persistent data, or existing workloads could be affected.
- Whether rollback is safe and whether it can restore the actual application state.

The workflow is evidence-driven:
incident assessment -> safety checks -> release-state inspection -> chart validation
-> Kubernetes events and resource inspection -> root-cause isolation
-> targeted fix -> controlled recovery -> verification -> prevention.
`,

  objectives: [
    "Diagnose helm install, helm upgrade, and helm upgrade --install failures.",
    "Identify chart, repository, version, dependency, and values-file errors.",
    "Troubleshoot template rendering and Kubernetes API validation errors.",
    "Investigate RBAC, namespace, quota, admission policy, and resource conflicts.",
    "Diagnose ImagePullBackOff, Pending pods, failed hooks, and readiness failures.",
    "Understand Helm release states, revisions, history, and rollback limitations.",
    "Recover safely from partial installations and failed upgrades.",
    "Validate charts in CI and monitor production deployments."
  ],

  incidentWorkflow: [
    {
      id: "01",
      title: "Establish the incident and deployment timeline",
      objective:
        "Determine exactly which Helm operation failed and which environment is affected.",
      commands: [
        "date -Is",
        "helm version",
        "kubectl config current-context",
        "kubectl cluster-info",
        "git status --short",
        "git rev-parse HEAD"
      ],
      interpretResults: [
        "Record the incident timestamp, pipeline run ID, operator, release name, namespace, chart version, and expected image version.",
        "Confirm the current Kubernetes context and cluster identity before running any mutating command.",
        "Record whether the command was helm install, helm upgrade, helm upgrade --install, or a pipeline wrapper.",
        "Inspect recent Git changes to Chart.yaml, values files, templates, dependencies, and pipeline scripts.",
        "Compare the failed deployment with the last successful release and identify the first failing step.",
        "A successful kubectl cluster-info does not prove that every namespace or Kubernetes API operation is authorized."
      ],
      nextDecision:
        "If the wrong cluster or namespace is selected, stop immediately and correct the deployment target before further investigation. Otherwise continue with release-state inspection.",
      safetyNote:
        "Never run helm uninstall, delete resources, or rerun an upgrade before confirming the target environment and the existing release state."
    },
    {
      id: "02",
      title: "Assess impact and deployment severity",
      objective:
        "Determine whether production is unavailable, partially updated, or merely blocked from receiving a new release.",
      commands: [
        "kubectl get deployments,statefulsets,daemonsets,pods,services -n <namespace>",
        "kubectl get events -n <namespace> --sort-by=.lastTimestamp",
        "kubectl rollout status deployment/<deployment-name> -n <namespace> --timeout=60s"
      ],
      interpretResults: [
        "Run rollout status only when the target deployment exists; a missing deployment is a different condition from an unhealthy rollout.",
        "Check desired replicas, ready replicas, restart counts, pod conditions, and application health.",
        "A failed Helm upgrade may leave an earlier workload running, partially updated, or unavailable.",
        "Identify whether database migrations, persistent-volume changes, or external integrations were involved.",
        "A Helm release marked failed does not by itself prove that all Kubernetes resources are unhealthy."
      ],
      nextDecision:
        "For customer impact or an uncertain production state, engage the incident owner and release approver. Avoid further changes until the current state is understood.",
      safetyNote:
        "Do not assume rollback is safe when a chart changes database schemas, persistent storage, or external systems."
    },
    {
      id: "03",
      title: "Inspect Helm release status and history",
      objective:
        "Determine whether the release exists and what happened during its latest revision.",
      commands: [
        "helm list -n <namespace> --all",
        "helm status <release> -n <namespace>",
        "helm history <release> -n <namespace>",
        "helm get values <release> -n <namespace>",
        "helm get values <release> -n <namespace> --all",
        "helm get manifest <release> -n <namespace>"
      ],
      interpretResults: [
        "If the release is absent, investigate install failures, the selected namespace, and whether a different release name was used.",
        "A failed or pending release needs investigation before retrying an install or upgrade.",
        "Compare the latest revision with the last known good revision.",
        "helm get values without --all primarily shows user-supplied values; --all also includes computed values and may expose sensitive configuration.",
        "helm get manifest helps inspect resources recorded for a release but does not prove every resource currently matches that manifest.",
        "Check hooks and release history when an operation failed after resource changes began."
      ],
      nextDecision:
        "Classify the release state and determine whether the operation is safe to retry, requires a targeted repair, or needs a controlled rollback.",
      safetyNote:
        "Treat release values and rendered manifests as potentially sensitive. Do not paste credentials, tokens, or Secret contents into tickets."
    },
    {
      id: "04",
      title: "Validate chart structure, dependencies, and versions",
      objective:
        "Find packaging or dependency problems before contacting the production cluster.",
      commands: [
        "helm lint ./<chart-directory>",
        "helm dependency list ./<chart-directory>",
        "helm dependency build ./<chart-directory>",
        "helm show chart <repository>/<chart> --version <chart-version>",
        "helm repo list",
        "helm repo update"
      ],
      interpretResults: [
        "helm lint checks common chart problems but does not guarantee Kubernetes API compatibility or successful runtime startup.",
        "Missing dependencies or incompatible dependency versions can prevent rendering or installation.",
        "An incorrect chart repository or chart version may select a different package than expected.",
        "helm dependency build uses the chart's dependency declarations and lock information where available; review resulting changes.",
        "Repository update failures may be caused by DNS, authentication, TLS, or repository availability.",
        "Do not silently switch to a newer chart version just because the intended version cannot be downloaded."
      ],
      nextDecision:
        "Fix the verified chart, repository, or dependency problem and repeat validation using the exact chart version intended for the environment.",
      safetyNote:
        "Use the same chart artifact and dependency lock information that the release pipeline expects. Avoid changing dependency versions during incident recovery without review."
    },
    {
      id: "05",
      title: "Render templates with the exact deployment values",
      objective:
        "Determine whether Helm produces valid Kubernetes manifests for the intended configuration.",
      commands: [
        "helm template <release> ./<chart-directory> -n <namespace> -f values.yaml",
        "helm template <release> ./<chart-directory> -n <namespace> -f values.yaml --debug",
        "helm show values <repository>/<chart> --version <chart-version>",
        "helm lint ./<chart-directory> -f values.yaml"
      ],
      interpretResults: [
        "A nil pointer, missing required value, invalid template function, or incorrect value type often fails before resource creation.",
        "Inspect indentation, YAML types, conditional blocks, required values, and values-file precedence.",
        "Compare the exact values files and --set arguments used by CI with the local reproduction.",
        "Rendering locally does not reproduce every server-side admission policy or API validation rule.",
        "Do not assume values.yaml is the only configuration file; pipelines may use environment-specific overrides."
      ],
      nextDecision:
        "If rendering fails, fix the chart or input values before attempting another cluster operation. If rendering succeeds, continue with API and runtime checks.",
      safetyNote:
        "Debug rendering can expose embedded secrets. Use sanitized values and store output securely."
    },
    {
      id: "06",
      title: "Validate Kubernetes API compatibility",
      objective:
        "Identify unsupported API versions, invalid fields, and resources rejected by the target cluster.",
      commands: [
        "kubectl version",
        "kubectl api-resources",
        "kubectl get crd",
        "helm template <release> ./<chart-directory> -n <namespace> -f values.yaml | kubectl apply --dry-run=server -f -"
      ],
      interpretResults: [
        "Server-side dry-run can identify schema and admission problems for supported resources, but it is not identical to a Helm installation.",
        "Some Helm charts contain hooks or CRDs whose lifecycle differs from ordinary rendered resources.",
        "An API removed from a newer Kubernetes version can make an older chart fail.",
        "A custom resource may fail if its CRD is not installed or the required API version is unavailable.",
        "Admission webhooks and policy engines may reject otherwise valid manifests.",
        "The final command requires authorization and cluster connectivity; it should not apply changes when server-side dry-run is supported."
      ],
      nextDecision:
        "Match chart APIs and CRDs to the actual cluster version. Validate the fix against the target cluster's API and policy configuration.",
      safetyNote:
        "Do not install CRDs or alter admission policies in production simply to bypass a validation error. Review compatibility and ownership first."
    },
    {
      id: "07",
      title: "Check namespace, RBAC, and Kubernetes quotas",
      objective:
        "Determine whether the deploying identity can create the required resources.",
      commands: [
        "kubectl get namespace <namespace>",
        "kubectl auth can-i create deployments -n <namespace>",
        "kubectl auth can-i create services -n <namespace>",
        "kubectl auth can-i create secrets -n <namespace>",
        "kubectl get resourcequota,limitrange -n <namespace>",
        "kubectl describe resourcequota -n <namespace>"
      ],
      interpretResults: [
        "A missing namespace may cause installation failure when namespace creation is not requested.",
        "The current kubectl identity may differ from the identity used by Jenkins.",
        "A forbidden error indicates an authorization boundary; check the exact resource, verb, namespace, and service account.",
        "Quota exhaustion may prevent pods, services, PVCs, or other resources from being created.",
        "LimitRange defaults and constraints can affect resource configuration.",
        "kubectl auth can-i is useful only for the identity currently configured; validate the actual pipeline identity too."
      ],
      nextDecision:
        "Correct the namespace or grant only the required permissions. If quota is exhausted, identify safe capacity remediation with the namespace owner.",
      safetyNote:
        "Do not grant cluster-admin as a shortcut. Avoid deleting other workloads to free quota without assessing ownership and impact."
    },
    {
      id: "08",
      title: "Inspect failed resources and Kubernetes events",
      objective:
        "Determine whether resources were created and why pods or controllers are unhealthy.",
      commands: [
        "kubectl get all -n <namespace>",
        "kubectl get pods -n <namespace> -o wide",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl logs <pod-name> -n <namespace> --all-containers=true --tail=200",
        "kubectl logs <pod-name> -n <namespace> --previous --all-containers=true --tail=200",
        "kubectl get events -n <namespace> --sort-by=.lastTimestamp"
      ],
      interpretResults: [
        "ImagePullBackOff points toward image name, tag, registry reachability, or pull credentials.",
        "Pending pods can indicate insufficient capacity, affinity rules, taints, PVC problems, or quota.",
        "CrashLoopBackOff indicates repeated container failures; inspect current and previous logs.",
        "CreateContainerConfigError may indicate missing Secrets, ConfigMaps, or invalid container configuration.",
        "Readiness failures may prevent rollout completion even when Helm successfully created the resources.",
        "Events expire and may be aggregated; combine them with pod conditions, logs, and deployment history."
      ],
      nextDecision:
        "Fix the demonstrated resource-level cause before repeating the Helm operation. Confirm whether Helm's wait behavior was the failure point.",
      safetyNote:
        "Collect logs from the affected workload without dumping sensitive environment variables or secret contents."
    },
    {
      id: "09",
      title: "Investigate image registry and artifact availability",
      objective:
        "Verify that the chart references a real image and that the cluster can pull it.",
      commands: [
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get serviceaccount <service-account> -n <namespace> -o yaml",
        "helm get values <release> -n <namespace>",
        "helm get manifest <release> -n <namespace>"
      ],
      interpretResults: [
        "Check image repository, tag, digest, registry hostname, and imagePullSecrets configuration.",
        "A tag that exists in one registry or environment may not exist in another.",
        "A successful local docker pull does not prove that Kubernetes nodes have the same network path or credentials.",
        "A recent image publication or registry policy change can explain a previously healthy chart failing.",
        "Do not expose registry credentials when inspecting service accounts or rendered configuration."
      ],
      nextDecision:
        "Correct the image reference or registry access configuration, then verify that a pod can pull the intended immutable image.",
      safetyNote:
        "Prefer a verified image digest for reproducibility where the release process supports it. Never replace a production image with an unverified latest tag."
    },
    {
      id: "10",
      title: "Investigate hooks, Jobs, and readiness timeouts",
      objective:
        "Determine whether Helm failed because a hook or workload did not complete in time.",
      commands: [
        "helm get hooks <release> -n <namespace>",
        "kubectl get jobs,pods -n <namespace>",
        "kubectl describe job <job-name> -n <namespace>",
        "kubectl logs job/<job-name> -n <namespace>",
        "kubectl rollout status deployment/<deployment-name> -n <namespace> --timeout=60s"
      ],
      interpretResults: [
        "A pre-install, post-install, pre-upgrade, or post-upgrade hook can fail independently of ordinary workload creation.",
        "A migration Job may complete partially or make irreversible database changes.",
        "Helm --wait may fail when deployments, StatefulSets, PVCs, or other supported resources do not become ready in time.",
        "Increasing --timeout only helps when the operation needs more time and is otherwise healthy.",
        "A stuck hook or failed Job needs root-cause analysis rather than automatic timeout increases."
      ],
      nextDecision:
        "Inspect hook logs and side effects. Repair the actual failure and determine whether the hook is safe to retry before another install or upgrade.",
      safetyNote:
        "Never delete or rerun migration Jobs blindly. Confirm database and external-system state first."
    },
    {
      id: "11",
      title: "Resolve existing resources and ownership conflicts",
      objective:
        "Determine why Helm cannot adopt or modify resources already present in the cluster.",
      commands: [
        "kubectl get <resource-type> <resource-name> -n <namespace> -o yaml",
        "helm list -A",
        "helm status <existing-release> -n <namespace>",
        "helm get manifest <existing-release> -n <namespace>"
      ],
      interpretResults: [
        "A resource may already exist but not belong to the release being installed.",
        "Conflicting Helm ownership metadata can prevent installation or upgrade.",
        "A shared resource may be intentionally managed by another release or by a separate platform team.",
        "A release-name collision or namespace mismatch can produce confusing ownership errors.",
        "Existing resources must be traced to their actual owner before deciding whether adoption is appropriate."
      ],
      nextDecision:
        "Use the documented ownership or migration procedure. If the resource is shared, coordinate with its owner instead of deleting it or changing ownership annotations blindly.",
      safetyNote:
        "Never force ownership changes or delete an existing production resource just to make Helm install succeed."
    },
    {
      id: "12",
      title: "Choose recovery, rollback, or forward-fix",
      objective:
        "Restore service without creating a second failure.",
      commands: [
        "helm status <release> -n <namespace>",
        "helm history <release> -n <namespace>",
        "helm diff upgrade <release> <chart> -n <namespace> -f values.yaml",
        "helm rollback <release> <revision> -n <namespace> --wait --timeout 5m"
      ],
      interpretResults: [
        "The helm diff command requires the Helm Diff plugin; it is not built into every Helm installation.",
        "Review the diff for deleted resources, immutable field changes, PVC changes, and service or ingress modifications.",
        "A rollback command is a mutating operation and should be executed only after approval and state inspection.",
        "Rollback can restore Kubernetes manifests but cannot necessarily reverse database migrations, external API actions, or persistent-data changes.",
        "If a release is stuck in a pending state, investigate the operation that left it pending before attempting recovery."
      ],
      nextDecision:
        "Use a rollback when the previous revision is known to be safe and rollback semantics are understood. Otherwise use an approved forward-fix or manual recovery plan.",
      safetyNote:
        "Do not copy and run the rollback example without selecting the correct release, namespace, and revision. Confirm the target cluster first."
    }
  ],

  failureCases: [
    {
      id: "HCF-01",
      title: "Chart repository or chart version not found",
      symptoms: [
        "Helm cannot locate the requested chart.",
        "The installation pipeline fails before creating resources.",
        "A chart that worked earlier is no longer downloadable."
      ],
      likelyCauses: [
        "Incorrect repository alias or URL.",
        "Wrong chart name or version.",
        "Repository credentials or TLS problems.",
        "Chart version removed or repository metadata stale."
      ],
      diagnosticSteps: [
        "Run helm repo list and verify the configured repository.",
        "Inspect the requested chart name and pinned version.",
        "Check repository connectivity and authentication.",
        "Compare the requested version with the release pipeline configuration.",
        "Inspect repository metadata and relevant pipeline logs."
      ],
      resolution: [
        "Correct the repository URL or chart name.",
        "Refresh metadata when appropriate.",
        "Restore authorized repository access.",
        "Select an approved, available chart version rather than silently choosing latest."
      ],
      validation: [
        "The exact approved chart version can be retrieved.",
        "Chart metadata and dependencies are correct.",
        "Rendering succeeds with the intended values."
      ],
      prevention: [
        "Pin chart versions.",
        "Use controlled chart repositories or OCI registries.",
        "Monitor artifact availability and authentication."
      ]
    },
    {
      id: "HCF-02",
      title: "Missing chart dependency",
      symptoms: [
        "Helm reports missing dependencies.",
        "Template rendering fails.",
        "The pipeline works on one machine but not in a clean workspace."
      ],
      likelyCauses: [
        "Dependency was not downloaded.",
        "Chart.yaml and Chart.lock are inconsistent.",
        "Dependency repository is unavailable.",
        "A required dependency version is missing."
      ],
      diagnosticSteps: [
        "Run helm dependency list.",
        "Inspect Chart.yaml and Chart.lock.",
        "Run helm dependency build in a clean non-production workspace.",
        "Inspect repository access and dependency version availability."
      ],
      resolution: [
        "Restore the intended dependency declaration and lock file.",
        "Build dependencies using the approved process.",
        "Commit required dependency metadata where appropriate.",
        "Validate the packaged chart."
      ],
      validation: [
        "A clean checkout can build dependencies.",
        "helm lint and template rendering succeed.",
        "The resulting chart contains the expected dependencies."
      ],
      prevention: [
        "Pin dependency versions.",
        "Test chart packaging in CI.",
        "Avoid unreviewed dependency upgrades during incidents."
      ]
    },
    {
      id: "HCF-03",
      title: "Template rendering or values error",
      symptoms: [
        "Helm reports a template execution error.",
        "A required value is missing or has the wrong type.",
        "The deployment fails before Kubernetes resources are created."
      ],
      likelyCauses: [
        "Incorrect values-file path.",
        "Invalid YAML or wrong value type.",
        "Missing required value.",
        "Incorrect conditional or template expression.",
        "Unexpected values-file precedence."
      ],
      diagnosticSteps: [
        "Inspect the exact Helm command from the pipeline.",
        "Verify every -f path and --set argument.",
        "Run helm lint with the intended values.",
        "Render with helm template and --debug in a safe environment.",
        "Compare environment-specific values with the last successful release."
      ],
      resolution: [
        "Correct the value, type, path, or template expression.",
        "Add schema validation or required-value checks where suitable.",
        "Keep environment-specific configuration separate and reviewed."
      ],
      validation: [
        "The chart renders with the intended values.",
        "Generated manifests match the intended environment.",
        "Server-side validation passes where supported."
      ],
      prevention: [
        "Use values.schema.json where appropriate.",
        "Lint and render charts in CI.",
        "Test every supported environment configuration."
      ]
    },
    {
      id: "HCF-04",
      title: "Kubernetes API version or schema incompatibility",
      symptoms: [
        "The API server rejects a rendered resource.",
        "An older chart fails after a Kubernetes upgrade.",
        "A custom resource kind is unknown."
      ],
      likelyCauses: [
        "Removed or unsupported API version.",
        "Invalid field for the cluster version.",
        "Required CRD is absent.",
        "Admission policy rejects the resource."
      ],
      diagnosticSteps: [
        "Check Kubernetes server version and available APIs.",
        "Inspect the rejected resource kind and API version.",
        "Check CRD existence and served versions.",
        "Review admission webhook and policy errors.",
        "Compare the chart's compatibility requirements with the cluster."
      ],
      resolution: [
        "Use a chart version compatible with the target Kubernetes version.",
        "Update manifests to supported APIs through a reviewed change.",
        "Install or upgrade CRDs using the approved lifecycle procedure.",
        "Correct the demonstrated policy violation."
      ],
      validation: [
        "Rendered resources use supported APIs.",
        "Required CRDs are available.",
        "Server-side validation and a staging deployment succeed."
      ],
      prevention: [
        "Test chart compatibility against supported cluster versions.",
        "Track deprecated APIs.",
        "Include CRD migration plans in upgrades."
      ]
    },
    {
      id: "HCF-05",
      title: "Forbidden: insufficient Kubernetes permissions",
      symptoms: [
        "Helm reports forbidden while creating or updating a resource.",
        "A release works locally but fails in Jenkins.",
        "Only particular resource types fail."
      ],
      likelyCauses: [
        "Pipeline service account lacks required verbs.",
        "Incorrect namespace or identity.",
        "Cluster-scoped resources require separate permissions.",
        "Admission policy blocks the operation."
      ],
      diagnosticSteps: [
        "Identify the exact resource, verb, and namespace from the error.",
        "Confirm the identity used by Jenkins.",
        "Run kubectl auth can-i with the relevant identity.",
        "Check whether the resource is namespaced or cluster-scoped.",
        "Inspect admission policy errors separately from RBAC errors."
      ],
      resolution: [
        "Grant only the required permissions to the deployment identity.",
        "Correct the target namespace or credentials.",
        "Use an approved platform process for cluster-scoped resources."
      ],
      validation: [
        "The pipeline identity has only the permissions it needs.",
        "The intended operation succeeds.",
        "Unrelated namespaces and resources remain protected."
      ],
      prevention: [
        "Review RBAC in CI and security audits.",
        "Use dedicated deployment identities.",
        "Avoid cluster-admin credentials for routine deployments."
      ]
    },
    {
      id: "HCF-06",
      title: "Resource quota or capacity exhaustion",
      symptoms: [
        "Pods or other resources cannot be created.",
        "Pods remain Pending.",
        "The namespace reports quota exceeded."
      ],
      likelyCauses: [
        "CPU or memory quota exhausted.",
        "PVC quota exhausted.",
        "Insufficient schedulable node capacity.",
        "LimitRange or admission constraints."
      ],
      diagnosticSteps: [
        "Inspect resourcequota and limitrange.",
        "Describe pending pods.",
        "Inspect scheduler events and node capacity.",
        "Check existing workloads and recent resource requests.",
        "Compare requested capacity with namespace policy."
      ],
      resolution: [
        "Right-size resource requests only when supported by measurements.",
        "Request an approved quota increase or capacity change.",
        "Resolve stale resources only after confirming ownership and safety."
      ],
      validation: [
        "Required resources can be created and scheduled.",
        "Workloads reach readiness.",
        "Existing services remain healthy."
      ],
      prevention: [
        "Monitor quota utilization.",
        "Set realistic requests and limits.",
        "Capacity-test high-impact chart upgrades."
      ]
    },
    {
      id: "HCF-07",
      title: "ImagePullBackOff after chart installation",
      symptoms: [
        "Helm creates a deployment but pods cannot start.",
        "Pods report ImagePullBackOff or ErrImagePull.",
        "The previous application version worked."
      ],
      likelyCauses: [
        "Wrong repository or image tag.",
        "Image was not published.",
        "Missing registry credentials.",
        "Registry network or rate-limit issue."
      ],
      diagnosticSteps: [
        "Describe the affected pod and inspect events.",
        "Inspect the image reference in the rendered manifest.",
        "Check imagePullSecrets and service-account configuration.",
        "Verify the intended artifact exists in the registry.",
        "Compare the new image reference with the last known good release."
      ],
      resolution: [
        "Correct the verified image reference.",
        "Restore authorized registry access.",
        "Publish or promote the intended immutable artifact.",
        "Reconcile the release using the approved deployment procedure."
      ],
      validation: [
        "Pods pull the expected image.",
        "Containers start and become ready.",
        "The running image digest matches the release record."
      ],
      prevention: [
        "Verify image availability before deployment.",
        "Use immutable tags or digests.",
        "Monitor registry and image-pull failures."
      ]
    },
    {
      id: "HCF-08",
      title: "Helm --wait or readiness timeout",
      symptoms: [
        "Helm reports that a release failed to become ready.",
        "Resources exist but the command times out.",
        "The application remains unhealthy."
      ],
      likelyCauses: [
        "Readiness or startup probe failure.",
        "Image pull or scheduling problem.",
        "Application startup takes longer than expected.",
        "Dependency service unavailable.",
        "Incorrect health-check configuration."
      ],
      diagnosticSteps: [
        "Inspect release status and history.",
        "Check rollout status and pod conditions.",
        "Read current and previous container logs.",
        "Inspect readiness/startup probe events.",
        "Check dependency connectivity and application metrics."
      ],
      resolution: [
        "Fix the actual application, probe, scheduling, or dependency failure.",
        "Adjust timeouts only when measurements prove they are too short.",
        "Use a controlled rollback or forward-fix according to release risk."
      ],
      validation: [
        "Required replicas become ready.",
        "Readiness and application health checks pass.",
        "Helm operation completes within an expected duration."
      ],
      prevention: [
        "Set meaningful probes and startup budgets.",
        "Monitor rollout duration.",
        "Test cold starts and dependency failures."
      ]
    },
    {
      id: "HCF-09",
      title: "Existing resource ownership conflict",
      symptoms: [
        "Helm refuses to install because a resource already exists.",
        "Ownership metadata does not match the expected release.",
        "A shared resource is managed outside the chart."
      ],
      likelyCauses: [
        "Resource created manually.",
        "Another Helm release owns the resource.",
        "Release name or namespace changed.",
        "Resource ownership migration was incomplete."
      ],
      diagnosticSteps: [
        "Inspect the existing resource YAML and metadata.",
        "Search Helm releases and manifests for the resource.",
        "Identify the actual owner and intended lifecycle.",
        "Review recent release-name or namespace changes."
      ],
      resolution: [
        "Use a documented resource migration or adoption process.",
        "Coordinate with the current owner.",
        "Refactor shared resources into an explicitly owned component when appropriate."
      ],
      validation: [
        "One clear owner manages the resource.",
        "The chart installs or upgrades without ownership ambiguity.",
        "Other releases continue to function."
      ],
      prevention: [
        "Document shared-resource ownership.",
        "Avoid uncontrolled manual creation of chart-managed resources.",
        "Test release-name and namespace migrations."
      ]
    },
    {
      id: "HCF-10",
      title: "Hook Job or migration failure",
      symptoms: [
        "Helm fails while executing a pre-install or upgrade hook.",
        "A Job fails or never completes.",
        "The application release remains unsuccessful."
      ],
      likelyCauses: [
        "Migration script error.",
        "Hook image or permissions issue.",
        "External dependency unavailable.",
        "Hook timeout or non-idempotent retry.",
        "Database state incompatible with the migration."
      ],
      diagnosticSteps: [
        "Inspect helm get hooks and release history.",
        "Find the hook Job and inspect events and logs.",
        "Determine whether the hook started and changed external state.",
        "Check migration logs and database state with the responsible owner.",
        "Verify whether retrying the hook is safe."
      ],
      resolution: [
        "Fix the verified script, permission, or dependency issue.",
        "Use a reviewed migration repair or forward-fix procedure.",
        "Re-run only after confirming side effects and idempotency."
      ],
      validation: [
        "The hook completes successfully.",
        "Database or external state is consistent.",
        "The workload becomes healthy."
      ],
      prevention: [
        "Test migrations against production-like data.",
        "Design hooks for safe failure handling.",
        "Document irreversible operations and recovery steps."
      ]
    },
    {
      id: "HCF-11",
      title: "Helm release stuck in pending state",
      symptoms: [
        "Release status shows a pending operation.",
        "A subsequent install or upgrade refuses to proceed.",
        "A previous deployment command timed out or was interrupted."
      ],
      likelyCauses: [
        "An interrupted Helm operation.",
        "Pipeline cancellation during an upgrade.",
        "Controller or client process failure.",
        "An operation still running elsewhere."
      ],
      diagnosticSteps: [
        "Inspect helm status and helm history.",
        "Check pipeline logs and determine whether another Helm process is active.",
        "Inspect current Kubernetes resources and application health.",
        "Determine whether the previous operation partially applied changes.",
        "Check release storage and access errors only with the platform owner's guidance."
      ],
      resolution: [
        "Wait if the operation is genuinely still running.",
        "Use the documented recovery procedure for the installed Helm version and storage driver.",
        "Avoid deleting Helm release Secrets or ConfigMaps without a reviewed recovery plan.",
        "Use an approved rollback or forward-fix after state reconciliation."
      ],
      validation: [
        "Release status is understood and no conflicting operation remains.",
        "Resources match the intended release state.",
        "A controlled follow-up operation succeeds."
      ],
      prevention: [
        "Avoid overlapping deployment jobs.",
        "Use pipeline timeouts and cancellation handling.",
        "Document recovery from interrupted Helm operations."
      ]
    },
    {
      id: "HCF-12",
      title: "Helm upgrade succeeds but application is broken",
      symptoms: [
        "Helm reports deployed status.",
        "The application returns errors or fails health checks.",
        "New pods run but business functionality is degraded."
      ],
      likelyCauses: [
        "Invalid application configuration.",
        "Incompatible application and dependency versions.",
        "Database migration incompatibility.",
        "Service routing or ingress misconfiguration.",
        "A health check does not cover the failing user journey."
      ],
      diagnosticSteps: [
        "Verify the deployed image and chart revision.",
        "Inspect pod logs, events, service endpoints, and ingress routing.",
        "Run approved application health and smoke tests.",
        "Compare configuration and dependency versions with the last healthy release.",
        "Assess database and external-system compatibility."
      ],
      resolution: [
        "Follow the incident's approved forward-fix or rollback plan.",
        "Check compatibility before reverting application code or schema changes.",
        "Validate the full user-facing workflow after recovery."
      ],
      validation: [
        "Technical health checks pass.",
        "Key business transactions succeed.",
        "Error rates and latency return to acceptable levels."
      ],
      prevention: [
        "Add release smoke tests.",
        "Use staged rollout strategies where appropriate.",
        "Track application health after Helm reports deployment success."
      ]
    }
  ],

  productionIncidents: [
    {
      title: "Incident A: Production Helm upgrade fails after resources change",
      severity: "SEV-1 or SEV-2 based on customer impact",
      scenario:
        "A production helm upgrade starts creating resources but fails because the new pods cannot become ready. The previous release may still be partially running.",
      impact: [
        "New release is blocked.",
        "Application capacity may be reduced.",
        "Some workloads may run old and new configurations simultaneously."
      ],
      immediateActions: [
        "Stop additional release attempts.",
        "Confirm cluster context, namespace, release name, and change approval.",
        "Inspect release status and history.",
        "Check current replica availability and application health.",
        "Determine whether any database or persistent-data changes occurred."
      ],
      investigation: [
        "Inspect the failed revision and compare it with the last successful revision.",
        "Read pod events and current/previous logs.",
        "Check image availability, probes, resource requests, and dependencies.",
        "Determine whether the failure occurred during rendering, API operations, readiness, or hooks.",
        "Review the rendered manifest and chart values for the failed revision."
      ],
      recovery: [
        "Fix the verified root cause or select an approved known-good revision.",
        "Evaluate rollback risks, especially database migrations and PVC changes.",
        "Execute rollback only after approval and state verification.",
        "Verify application health, traffic routing, and deployed image versions.",
        "Record the revision, commands, evidence, and outcome."
      ],
      closureCriteria: [
        "The application is healthy and serves traffic.",
        "The deployed revision is known and approved.",
        "No conflicting rollout remains active.",
        "Persistent data and migrations are consistent.",
        "The root cause and prevention actions are documented."
      ]
    },
    {
      title: "Incident B: Helm installation fails with forbidden errors",
      severity: "SEV-2 or SEV-3",
      scenario:
        "A pipeline identity can read the cluster but cannot create one of the resources required by the chart.",
      impact: [
        "Release cannot complete.",
        "Resources may already have been created before the forbidden operation.",
        "A broad permissions workaround could increase security risk."
      ],
      immediateActions: [
        "Capture the exact forbidden error and resource name.",
        "Confirm the deployment identity and namespace.",
        "Inspect whether the failed release has already created resources."
      ],
      investigation: [
        "Check the precise resource, verb, namespace, and identity.",
        "Distinguish Kubernetes RBAC from admission-policy denial.",
        "Inspect chart resources for unexpected cluster-scoped permissions.",
        "Compare the current role bindings with the approved deployment permissions."
      ],
      recovery: [
        "Grant only the missing permission through the normal review process.",
        "Avoid cluster-admin as a workaround.",
        "Reconcile any resources created by the failed attempt.",
        "Repeat the deployment after permissions are validated."
      ],
      closureCriteria: [
        "The intended deployment identity has least-privilege access.",
        "The release succeeds.",
        "Unrelated namespaces and resources remain protected."
      ]
    },
    {
      title: "Incident C: Helm release stuck pending after pipeline cancellation",
      severity: "SEV-2",
      scenario:
        "A CI job is cancelled during an upgrade. A subsequent pipeline reports that the Helm release is still pending.",
      impact: [
        "New releases are blocked.",
        "Current resources may not match the last successful manifest.",
        "Repeated commands may compound the problem."
      ],
      immediateActions: [
        "Confirm no other Helm operation is running.",
        "Inspect release history and the cancelled pipeline log.",
        "Check application health and actual resource state."
      ],
      investigation: [
        "Determine where the original command was interrupted.",
        "Inspect the last revision and current resource state.",
        "Check whether hooks or external migrations were active.",
        "Review storage-driver and release-record errors if present."
      ],
      recovery: [
        "Follow the documented procedure for the installed Helm version and release storage.",
        "Do not delete release records blindly.",
        "Choose a controlled rollback or forward-fix after reconciling actual state.",
        "Run one controlled operation after the release state is understood."
      ],
      closureCriteria: [
        "No conflicting operation remains.",
        "The release state and resources are consistent.",
        "The next controlled upgrade or rollback completes successfully."
      ]
    },
    {
      title: "Incident D: Helm reports deployed but users experience errors",
      severity: "SEV-1 if critical user journeys are broken",
      scenario:
        "Helm reports a successful upgrade, but users see HTTP errors or critical functionality fails.",
      impact: [
        "Release appears successful while application service is degraded.",
        "Monitoring based only on deployment status may miss the incident."
      ],
      immediateActions: [
        "Assess customer impact and affected endpoints.",
        "Verify the release revision and image digest.",
        "Inspect application metrics and logs.",
        "Determine whether the issue is caused by the new release or an unrelated dependency."
      ],
      investigation: [
        "Check service endpoints, ingress routing, readiness, and application logs.",
        "Compare new configuration and dependency versions with the last healthy release.",
        "Run safe smoke tests and inspect key business transactions.",
        "Assess database and external-service compatibility."
      ],
      recovery: [
        "Apply the approved forward-fix or rollback decision.",
        "Account for schema and persistent-data compatibility.",
        "Verify recovery using user-facing health checks."
      ],
      closureCriteria: [
        "Critical user journeys succeed.",
        "Error rates and latency are acceptable.",
        "The deployed revision and any rollback are recorded.",
        "Monitoring covers the failure mode."
      ]
    }
  ],

  commandReference: [
    {
      title: "Helm release investigation",
      commands: [
        "helm list -n <namespace> --all",
        "helm status <release> -n <namespace>",
        "helm history <release> -n <namespace>",
        "helm get values <release> -n <namespace>",
        "helm get manifest <release> -n <namespace>",
        "helm get hooks <release> -n <namespace>"
      ],
      warning:
        "Values, manifests, and hook definitions may expose sensitive information. Sanitize output before sharing it."
    },
    {
      title: "Chart validation",
      commands: [
        "helm lint ./<chart-directory>",
        "helm dependency list ./<chart-directory>",
        "helm dependency build ./<chart-directory>",
        "helm template <release> ./<chart-directory> -n <namespace> -f values.yaml",
        "helm show values <repository>/<chart> --version <chart-version>"
      ],
      warning:
        "Use the same chart version and values files as the pipeline. Local rendering does not guarantee that admission policies or runtime dependencies will pass."
    },
    {
      title: "Kubernetes runtime investigation",
      commands: [
        "kubectl config current-context",
        "kubectl get deployments,statefulsets,daemonsets,pods -n <namespace>",
        "kubectl get events -n <namespace> --sort-by=.lastTimestamp",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl logs <pod-name> -n <namespace> --all-containers=true --tail=200",
        "kubectl logs <pod-name> -n <namespace> --previous --all-containers=true --tail=200",
        "kubectl get resourcequota,limitrange -n <namespace>"
      ],
      warning:
        "Confirm cluster context and namespace before any mutating operation. Use --previous only when a previous container instance exists."
    },
    {
      title: "Upgrade preview and controlled rollback",
      commands: [
        "helm diff upgrade <release> <chart> -n <namespace> -f values.yaml",
        "helm history <release> -n <namespace>",
        "helm rollback <release> <revision> -n <namespace> --wait --timeout 5m"
      ],
      warning:
        "helm diff requires the Helm Diff plugin. Rollback mutates the cluster and may not reverse database migrations, persistent-data changes, or external side effects."
    }
  ],

  recoveryRunbook: [
    "1. Declare the incident and record the environment, cluster, namespace, release, chart version, and pipeline run.",
    "2. Confirm the Kubernetes context and the approved deployment target.",
    "3. Record the exact Helm command, exit code, error message, timestamp, and pipeline log reference.",
    "4. Inspect release status and history before retrying or rolling back.",
    "5. Determine whether resources were created, updated, deleted, or left partially applied.",
    "6. Assess application health, user impact, persistent storage, and migration side effects.",
    "7. Reproduce chart or values errors with lint and template rendering in a safe environment.",
    "8. Use Kubernetes events, resource conditions, and logs to isolate API, RBAC, quota, image, scheduling, hook, or readiness failures.",
    "9. Select one evidence-supported fix and review its expected resource changes.",
    "10. Apply the fix under the required approval and change-control process.",
    "11. Use rollback only when the previous revision and rollback semantics are understood.",
    "12. Run a controlled install or upgrade and verify release status, workload readiness, image version, and application health.",
    "13. Capture the final release revision, validation evidence, and incident report.",
    "14. Add prevention actions to chart CI, deployment monitoring, and the runbook."
  ],

  rollbackStrategy: [
    "Confirm the release name, namespace, cluster, and target revision before running rollback.",
    "Use helm history and inspect the prior revision's chart, values, and manifest.",
    "Review the intended rollback diff where tooling is available.",
    "Check whether the failed release changed PVCs, database schemas, CRDs, or external systems.",
    "Do not assume Helm rollback restores persistent data or reverses external side effects.",
    "For database changes, use the database owner's tested recovery plan.",
    "For a failed first installation, decide whether targeted cleanup is needed; do not blindly run helm uninstall.",
    "After rollback, verify pods, services, ingress, application health, and the actual deployed image.",
    "Record who approved the rollback, which revision was selected, and the evidence confirming recovery."
  ],

  preventionChecklist: [
    "Pin Helm chart and dependency versions.",
    "Keep environment-specific values files reviewed and version controlled.",
    "Use values.schema.json to validate chart inputs where appropriate.",
    "Run helm lint and helm template in CI.",
    "Validate manifests against supported Kubernetes APIs.",
    "Test charts against every supported cluster version.",
    "Use dedicated least-privilege deployment identities.",
    "Monitor resource quotas and cluster capacity.",
    "Validate image existence and registry permissions before deployment.",
    "Use readiness and startup probes that reflect actual application readiness.",
    "Test hooks and migrations with production-like data.",
    "Use controlled concurrency to prevent overlapping upgrades.",
    "Keep release history and immutable artifact provenance.",
    "Document rollback limitations for database and persistent-data changes.",
    "Test recovery from failed upgrades and interrupted pipeline runs.",
    "Review chart changes for ownership conflicts and shared-resource impact."
  ],

  monitoringAndAlerting: [
    "Alert on failed Helm releases and repeated failed upgrade attempts.",
    "Track deployment duration and time spent waiting for resources to become ready.",
    "Monitor Kubernetes pod readiness, restarts, image-pull failures, and pending scheduling.",
    "Track resource quota utilization and node capacity.",
    "Monitor PVC binding, mount failures, and storage capacity.",
    "Track failed hook Jobs and migration duration.",
    "Monitor application error rate, latency, and key user journeys after deployment.",
    "Alert on repeated rollback operations or releases stuck in pending states.",
    "Record chart version, release revision, image digest, commit SHA, and pipeline run ID.",
    "Correlate Helm events with Kubernetes events and application telemetry."
  ],

  ciValidation: [
    "Run helm lint on every chart change.",
    "Build chart dependencies deterministically.",
    "Render charts using each supported environment's values files.",
    "Validate YAML and Kubernetes schemas.",
    "Use server-side dry-run where appropriate and supported.",
    "Test charts against supported Kubernetes versions.",
    "Verify required values and reject accidental production defaults.",
    "Scan images and dependencies using the organization's security tooling.",
    "Check rendered manifests for unintended privileged settings and exposed secrets.",
    "Review diffs for deleted resources, PVC changes, immutable fields, and service routing changes.",
    "Test install, upgrade, failure, and rollback paths in a staging cluster.",
    "Verify that required approvals and production protections cannot be bypassed.",
    "Record chart artifact, image digest, and commit SHA for every release."
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Detection time / start time / recovery time:",
    "Severity and customer impact:",
    "Cluster context and environment:",
    "Namespace and Helm release:",
    "Chart name, version, and revision:",
    "Pipeline run ID and commit SHA:",
    "Exact Helm operation and sanitized error:",
    "Last known good revision:",
    "Resources already changed before failure:",
    "Evidence: events, pod conditions, logs, and rendered diff:",
    "Confirmed root cause:",
    "Corrective action and approval:",
    "Rollback or forward-fix decision:",
    "Application health and deployed image verification:",
    "Persistent-data or migration impact:",
    "Prevention actions, owners, and due dates:"
  ],

  handsOnLabs: [
    {
      title: "Lab 1: Diagnose a chart rendering failure",
      objective:
        "Identify an incorrect value or template expression before cluster changes occur.",
      steps: [
        "Use a disposable chart in a local development environment.",
        "Run helm lint and render with helm template.",
        "Introduce a missing required value or incorrect type.",
        "Capture the exact template error.",
        "Correct the input and re-render the chart.",
        "Compare the resulting manifest with the intended configuration."
      ],
      expectedOutcome:
        "You can distinguish a rendering failure from a Kubernetes API or runtime failure."
    },
    {
      title: "Lab 2: Investigate ImagePullBackOff",
      objective:
        "Trace a failed image pull from the rendered manifest to registry access.",
      steps: [
        "Use a non-production namespace and disposable workload.",
        "Deploy a chart referencing a deliberately unavailable test image.",
        "Inspect the pod's events and image reference.",
        "Verify registry access and imagePullSecrets without exposing credentials.",
        "Correct the image reference or test credentials.",
        "Verify the pod starts and the expected image is running."
      ],
      expectedOutcome:
        "You can isolate image reference problems from scheduling, RBAC, and application startup failures."
    },
    {
      title: "Lab 3: Practice a failed upgrade investigation",
      objective:
        "Learn to inspect release history and application state before deciding on recovery.",
      steps: [
        "Use a staging cluster and a disposable Helm release.",
        "Install a known-good chart revision.",
        "Introduce a controlled invalid configuration in a new revision.",
        "Inspect helm status, history, pod events, and logs.",
        "Decide whether a forward-fix or rollback is safer.",
        "Verify the final release and application state."
      ],
      expectedOutcome:
        "You can explain why a failed Helm command does not necessarily mean that no resources changed."
    },
    {
      title: "Lab 4: Diagnose a Kubernetes permission failure",
      objective:
        "Identify the missing permission without granting excessive privileges.",
      steps: [
        "Use a disposable service account and test namespace.",
        "Attempt a harmless operation that the account is not allowed to perform.",
        "Inspect the forbidden error and the exact resource/verb.",
        "Use kubectl auth can-i with the test identity.",
        "Add the minimum approved permission.",
        "Verify the intended operation succeeds and unrelated permissions remain restricted."
      ],
      expectedOutcome:
        "You can distinguish an RBAC failure from an admission-policy failure and avoid cluster-admin workarounds."
    },
    {
      title: "Lab 5: Recover from a failed hook Job",
      objective:
        "Investigate hook execution without blindly rerunning a potentially non-idempotent operation.",
      steps: [
        "Use a disposable chart with a harmless test hook.",
        "Trigger a controlled hook failure.",
        "Inspect helm get hooks, Job status, events, and logs.",
        "Determine whether the hook produced any side effects.",
        "Correct the cause and establish whether retry is safe.",
        "Re-run the test and verify release completion."
      ],
      expectedOutcome:
        "You can distinguish hook failure from ordinary workload readiness failure and design safe retry behavior."
    }
  ],

  interviewQuestions: [
    {
      question: "What is the first thing you check when a production Helm upgrade fails?",
      answer:
        "Confirm cluster context, namespace, release name, exact command, error, and incident impact. Then inspect helm status and history and determine whether resources were already changed before attempting recovery."
    },
    {
      question: "Does a failed Helm command mean that no Kubernetes resources were created?",
      answer:
        "No. The operation may fail during resource creation, readiness checks, or hooks after some changes have already occurred. Inspect actual resources, events, release state, and side effects."
    },
    {
      question: "How do you debug a Helm template error?",
      answer:
        "Use helm lint and helm template with the exact values files and chart version. Inspect the first template error, value types, required values, YAML structure, and values-file precedence."
    },
    {
      question: "What is the difference between helm lint and helm template?",
      answer:
        "helm lint checks chart structure and common chart issues. helm template renders Kubernetes manifests. Neither alone proves that the target cluster will accept or successfully run the resources."
    },
    {
      question: "Why might helm install fail with a forbidden error?",
      answer:
        "The deployment identity may lack the required permission, the namespace may be wrong, or an admission policy may reject the resource. Identify the exact resource, verb, identity, and denying layer before changing access."
    },
    {
      question: "How do you troubleshoot ImagePullBackOff after Helm installation?",
      answer:
        "Inspect pod events and the rendered image reference, then verify the image tag or digest, registry availability, imagePullSecrets, service account, and node-to-registry connectivity."
    },
    {
      question: "What does Helm --wait do, and why can it time out?",
      answer:
        "It waits for supported resources to reach their expected readiness conditions. It can time out when pods cannot schedule, images cannot be pulled, probes fail, hooks or dependencies stall, or the timeout is too short for an otherwise healthy workload."
    },
    {
      question: "Should you always increase the Helm timeout when an upgrade fails?",
      answer:
        "No. First identify the underlying cause. A longer timeout cannot fix invalid manifests, missing permissions, broken images, or failing application health checks."
    },
    {
      question: "How do you troubleshoot a Helm resource ownership conflict?",
      answer:
        "Inspect the existing resource's metadata, release history, and manifests to identify its owner. Follow an approved adoption or migration procedure rather than deleting the resource or changing ownership metadata blindly."
    },
    {
      question: "Can helm rollback undo a database migration?",
      answer:
        "Not automatically. Helm can restore release manifests, but it cannot guarantee reversal of database schema changes, persistent-data modifications, or external side effects. Use a tested data recovery or migration plan."
    },
    {
      question: "What causes a Helm release to remain in a pending state?",
      answer:
        "An interrupted or concurrent operation, client cancellation, controller failure, or release-storage problem may leave a pending state. Confirm whether another operation is running and reconcile actual resources before using the documented recovery process."
    },
    {
      question: "What is the purpose of helm history?",
      answer:
        "It lists release revisions and statuses so an engineer can compare the failed revision with a known-good revision and make an informed recovery decision."
    },
    {
      question: "Why might a chart work locally but fail in Jenkins?",
      answer:
        "The pipeline may use different credentials, Kubernetes context, values files, chart version, environment variables, dependency artifacts, or permissions. Reproduce the exact pipeline command and identity."
    },
    {
      question: "How do you investigate a missing CRD?",
      answer:
        "Check available APIs and installed CRDs, confirm the required version, and inspect the chart's CRD lifecycle. Apply CRD changes only through the approved ownership and upgrade process."
    },
    {
      question: "What is a Helm hook?",
      answer:
        "A hook is a chart resource associated with a lifecycle event, such as pre-install or post-upgrade. Hook failures can stop the operation and may have side effects that need investigation before retrying."
    },
    {
      question: "How do you investigate a PVC-related installation failure?",
      answer:
        "Inspect PVC status, storage class, provisioning events, capacity, access modes, and node or storage constraints. Avoid deleting PVCs because doing so may risk persistent data."
    },
    {
      question: "Why is a successful Helm status not enough to prove production health?",
      answer:
        "Helm release status reflects the Helm operation, not every business-level health condition. Verify workload readiness, application telemetry, routing, critical user journeys, and deployed artifact identity."
    },
    {
      question: "How do you prevent overlapping Helm upgrades?",
      answer:
        "Use pipeline concurrency controls or release-level locking appropriate to the deployment system, while ensuring cancelled operations are investigated before another operation begins."
    },
    {
      question: "How do you safely recover from a failed first installation?",
      answer:
        "Inspect release state and actual resources, identify partial changes and ownership, and determine whether cleanup is safe. Use a reviewed recovery procedure rather than blindly uninstalling or deleting resources."
    },
    {
      question: "What should a Helm production incident report contain?",
      answer:
        "Include impact, cluster and namespace, release revision, chart version, command and error, actual resource state, evidence, root cause, corrective action, rollback decision, validation, and preventive actions with owners."
    }
  ],

  references: [
    {
      title: "Helm documentation",
      url: "https://helm.sh/docs/"
    },
    {
      title: "Helm install",
      url: "https://helm.sh/docs/helm/helm_install/"
    },
    {
      title: "Helm upgrade",
      url: "https://helm.sh/docs/helm/helm_upgrade/"
    },
    {
      title: "Helm rollback",
      url: "https://helm.sh/docs/helm/helm_rollback/"
    },
    {
      title: "Helm status",
      url: "https://helm.sh/docs/helm/helm_status/"
    },
    {
      title: "Helm chart best practices",
      url: "https://helm.sh/docs/chart_best_practices/"
    },
    {
      title: "Kubernetes debugging applications",
      url: "https://kubernetes.io/docs/tasks/debug/debug-application/"
    },
    {
      title: "Kubernetes probes",
      url: "https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/"
    },
    {
      title: "Kubernetes RBAC",
      url: "https://kubernetes.io/docs/reference/access-authn-authz/rbac/"
    },
    {
      title: "Kubernetes resource quotas",
      url: "https://kubernetes.io/docs/concepts/policy/resource-quotas/"
    }
  ]
};

export default chartInstallationFailureGuide;
