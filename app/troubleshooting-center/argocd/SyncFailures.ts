export interface SyncDiagnostic {
  title: string;
  purpose: string;
  command: string;
  interpretOutput: string[];
  nextStep: string;
  safetyNote?: string;
}

export interface SyncRootCause {
  cause: string;
  symptoms: string[];
  verification: string[];
  resolution: string[];
  prevention: string[];
}

export interface SyncIncidentScenario {
  title: string;
  situation: string;
  impact: string[];
  investigation: string[];
  resolution: string[];
  verification: string[];
}

export interface SyncInterviewQuestion {
  question: string;
  answer: string;
}

export const syncFailuresGuide = {
  title: "Argo CD Synchronization Failures",
  slug: "sync-failures",
  category: "Argo CD",
  difficulty: "Advanced",
  estimatedTime: "60–90 minutes",

  description:
    "A production-focused troubleshooting guide for Argo CD synchronization failures, including Kubernetes API errors, RBAC, admission policies, resource conflicts, immutable fields, CRDs, pruning, hooks, sync waves, health checks, partial deployments, and safe recovery.",

  overview: {
    whatIsTheProblem:
      "Argo CD synchronization attempts to apply the desired Kubernetes resources generated from an application's configured source. A synchronization can fail because the Kubernetes API rejects a resource, the destination is unavailable, permissions are insufficient, a resource conflicts with existing state, a hook fails, or a dependency is not ready.",

    importantDistinction:
      "Repository retrieval, manifest rendering, synchronization, and application runtime health are separate stages. A successful repository connection does not guarantee that resources can be applied. A failed sync also does not prove that nothing changed: some resources may already have been created or updated before a later operation failed.",

    systemFlow: [
      "1. Argo CD identifies the configured source and target revision.",
      "2. The source is retrieved and manifests are generated.",
      "3. Argo CD compares the desired state with the live cluster state.",
      "4. The sync operation selects resources and applies the required changes.",
      "5. Kubernetes authentication and authorization are evaluated.",
      "6. API validation, admission webhooks, policies, and resource constraints may accept or reject changes.",
      "7. Hooks, sync waves, and resource dependencies may affect operation progress.",
      "8. Argo CD monitors resource status and reports sync and health results.",
    ],

    statusDistinction: [
      {
        status: "Synced",
        meaning:
          "Argo CD considers the tracked live resources consistent with the desired state. This does not guarantee that the application is healthy or that every external dependency works.",
      },
      {
        status: "OutOfSync",
        meaning:
          "The live state differs from the desired state, or a required change has not been applied. The reason must be investigated.",
      },
      {
        status: "Sync Failed",
        meaning:
          "A sync operation failed. Inspect the operation result and individual resource errors to identify what happened.",
      },
      {
        status: "Progressing",
        meaning:
          "A resource is still progressing or has not reached its expected state. It is not automatically proof of an API apply failure.",
      },
      {
        status: "Degraded",
        meaning:
          "A resource or application health assessment indicates a problem. Sync status and health status must be investigated separately.",
      },
    ],

    commonErrors: [
      "one or more objects failed to apply",
      "forbidden: User cannot create, update, patch, or delete resource",
      "the server could not find the requested resource",
      "no matches for kind",
      "the object has been modified; please apply your changes to the latest version",
      "field is immutable",
      "admission webhook denied the request",
      "failed calling webhook",
      "context deadline exceeded",
      "timed out waiting for the condition",
      "another operation is already in progress",
      "ComparisonError",
      "SyncError",
      "hook failed",
      "BackoffLimitExceeded",
      "resource already exists",
      "invalid value",
      "exceeded quota",
      "too many requests",
      "connection refused",
      "failed to prune",
      "waiting for healthy state",
    ],

    keyPrinciple:
      "First determine which resource failed, what operation was attempted, and whether earlier resources were already changed. Fix the verified cause and recover through a controlled deployment process.",
  },

  learningObjectives: [
    "Understand the Argo CD sync lifecycle.",
    "Differentiate comparison, apply, prune, hook, health, and runtime failures.",
    "Investigate partial deployments safely.",
    "Read Argo CD operation status and Kubernetes events.",
    "Diagnose RBAC, admission webhook, quota, and API validation errors.",
    "Troubleshoot immutable fields and existing-resource conflicts.",
    "Understand CRDs, sync waves, hooks, and dependency ordering.",
    "Use dry-run and server-side validation appropriately.",
    "Choose a safe recovery strategy and verify the result.",
    "Create production incident reports and prevention controls.",
  ],

  productionWorkflow: [
    {
      step: 1,
      name: "Detect and acknowledge",
      actions: [
        "Record the alert time, Application name, destination cluster, and exact error.",
        "Identify the failed sync operation and the resource associated with the first meaningful error.",
        "Determine whether the operation is still running, failed, or completed with warnings.",
        "Preserve the operation details before starting another sync.",
      ],
      decision:
        "Do not start another sync while the existing operation is still running or while the state of a partial deployment is unknown.",
    },
    {
      step: 2,
      name: "Assess production impact",
      actions: [
        "Confirm whether the affected environment is development, staging, or production.",
        "Identify customer-facing services and workloads affected by the change.",
        "Determine whether any resources were successfully created, patched, replaced, or deleted.",
        "Check rollout status, replica availability, service endpoints, and relevant alerts.",
        "Identify whether the change involves networking, authentication, storage, or another critical dependency.",
      ],
      decision:
        "A failed sync can leave some changes applied. Treat the live cluster as the source of evidence for what actually changed.",
    },
    {
      step: 3,
      name: "Perform safety checks",
      actions: [
        "Confirm the Kubernetes context and Argo CD namespace.",
        "Confirm the Application, destination cluster, namespace, source revision, and requested operation.",
        "Check whether the change has production approval.",
        "Identify destructive changes, pruning, resource replacement, and schema migrations.",
        "Check whether an incident response or deployment freeze is active.",
        "Use read-only diagnostics before attempting corrections.",
      ],
      decision:
        "Do not blindly retry, prune, delete resources, or roll back a database or storage change.",
    },
    {
      step: 4,
      name: "Collect evidence",
      actions: [
        "Capture Application status and operation details.",
        "Record the exact failing resource, API group, kind, namespace, and name.",
        "Inspect relevant Kubernetes events and resource descriptions.",
        "Capture the source commit and desired manifest for the affected resource.",
        "Record timestamps and recent changes to RBAC, admission policies, CRDs, quotas, and cluster configuration.",
        "Redact tokens, credentials, internal sensitive data, and other secrets before sharing logs.",
      ],
      decision:
        "Use the first meaningful failure and its surrounding events to guide the next diagnostic step.",
    },
    {
      step: 5,
      name: "Run ordered diagnostics",
      actions: [
        "Check Application sync status and operation result.",
        "Identify the exact failed resource.",
        "Confirm the destination cluster and namespace.",
        "Inspect the live resource and Kubernetes events.",
        "Check RBAC, API validation, admission policies, quota, and CRDs as indicated by the error.",
        "Validate the desired manifest and compare it with live state.",
        "Review resource dependencies, hooks, and sync waves if the operation is waiting.",
      ],
      decision:
        "Choose diagnostics according to the observed error instead of running every command indiscriminately.",
    },
    {
      step: 6,
      name: "Isolate the root cause",
      actions: [
        "Determine whether the failure is caused by authorization, validation, admission, conflict, quota, missing API resources, dependency ordering, or a rollout problem.",
        "Compare the desired manifest with the actual live object.",
        "Check whether the error started after a source commit or cluster configuration change.",
        "Distinguish the first failure from secondary errors caused by it.",
      ],
      decision:
        "Identify the smallest correction that addresses the evidence-supported cause.",
    },
    {
      step: 7,
      name: "Recover safely",
      actions: [
        "Apply the approved correction through the appropriate source of truth.",
        "Validate the corrected manifest and required permissions.",
        "Confirm that any earlier partial changes are understood.",
        "Retry only when the operation state is known and the fix has been reviewed.",
        "Follow the approved sync policy and production change process.",
        "Use the documented rollback plan if the change has caused unacceptable impact.",
      ],
      decision:
        "A sync retry is not a rollback. A rollback is not automatically safe for persistent data, database migrations, or externally visible changes.",
    },
    {
      step: 8,
      name: "Verify recovery",
      actions: [
        "Confirm the sync operation completed successfully.",
        "Confirm the intended resources exist and have the expected configuration.",
        "Check Deployment rollout status and pod readiness.",
        "Verify Service endpoints and application health.",
        "Check logs, metrics, alerts, and customer-facing behavior.",
        "Confirm that no unexpected resource deletions or drift remain.",
      ],
      decision:
        "Do not close the incident based only on a green sync status. Verify the application's real operational health.",
    },
    {
      step: 9,
      name: "Prevent recurrence",
      actions: [
        "Document the evidence-supported root cause.",
        "Add CI validation for manifests and policies.",
        "Review RBAC, admission policies, quotas, CRD lifecycle, and dependency ordering.",
        "Improve alerts and runbooks for recurring errors.",
        "Assign owners and due dates for corrective actions.",
      ],
      decision:
        "Record what failed, why it failed, what recovered it, and how the same failure will be detected or prevented earlier.",
    },
  ],

  diagnostics: [
    {
      title: "1. Confirm the current Kubernetes context",
      purpose:
        "Prevent diagnosing or changing the wrong cluster.",
      command: "kubectl config current-context",
      interpretOutput: [
        "Confirm that the displayed context matches the intended environment.",
        "A correct context does not prove that the Argo CD Application targets the same cluster.",
        "Argo CD may manage a destination cluster different from the cluster used by your local kubectl context.",
      ],
      nextStep:
        "Confirm the Application's destination and use the correct authorized context for any cluster-level diagnostics.",
      safetyNote:
        "Do not run mutating commands until the destination is confirmed.",
    },
    {
      title: "2. Inspect the Application summary",
      purpose:
        "Identify the sync status, health status, destination, and reported errors.",
      command: "argocd app get <app-name>",
      interpretOutput: [
        "Review the Sync Status and Health Status independently.",
        "Check the destination cluster and namespace.",
        "Look for operation errors, comparison errors, or failed resources.",
        "OutOfSync alone does not identify the reason for a failed sync.",
      ],
      nextStep:
        "Use the operation error to identify the relevant resource and diagnostic branch.",
    },
    {
      title: "3. Inspect the last sync operation",
      purpose:
        "Determine which operation failed and what happened before the failure.",
      command:
        "kubectl get application <app-name> -n <argocd-namespace> -o yaml",
      interpretOutput: [
        "Inspect status.operationState.phase and status.operationState.message.",
        "Inspect status.operationState.syncResult.resources for per-resource results where available.",
        "Review the operation start and finish timestamps.",
        "Check whether some resources succeeded before another resource failed.",
        "Field availability can vary by Argo CD version and the operation's state.",
      ],
      nextStep:
        "Identify the first relevant failing resource, its operation, and the associated error before attempting another sync.",
      safetyNote:
        "The output can contain internal configuration details. Redact sensitive values before sharing.",
    },
    {
      title: "4. List Application resources",
      purpose:
        "See which resources Argo CD associates with the Application.",
      command: "argocd app resources <app-name>",
      interpretOutput: [
        "Identify the resource kind, name, namespace, and current status.",
        "Look for resources that remain OutOfSync, Missing, or unhealthy.",
        "A resource list is not a complete audit trail of every change made during a failed operation.",
      ],
      nextStep:
        "Inspect the affected live resources and operation results individually.",
    },
    {
      title: "5. Inspect the failing resource",
      purpose:
        "Read the live object and compare its configuration with the desired manifest.",
      command:
        "kubectl get <resource-type> <resource-name> -n <namespace> -o yaml",
      interpretOutput: [
        "Check whether the resource exists.",
        "Compare relevant spec fields, labels, annotations, ownership, and generation.",
        "Review status conditions where applicable.",
        "Not all resources are namespaced. Cluster-scoped resources must be queried without -n.",
        "The live object may include defaulted fields or controller-managed values that are absent from the source manifest.",
      ],
      nextStep:
        "Use the exact resource type and scope. Compare the live object with the intended manifest and the original operation error.",
    },
    {
      title: "6. Inspect namespace events",
      purpose:
        "Find scheduling, admission, quota, storage, and controller errors.",
      command:
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
      interpretOutput: [
        "Look for FailedCreate, FailedScheduling, FailedMount, FailedAttachVolume, BackOff, and admission-related events.",
        "Events can expire or be aggregated, so the absence of an event does not prove that nothing failed.",
        "Some errors occur before an object exists and may not appear in that object's event history.",
      ],
      nextStep:
        "Use the event's involved object, timestamp, and message to select the next diagnostic step.",
    },
    {
      title: "7. Describe a failing Deployment",
      purpose:
        "Investigate rollout failures after the Deployment resource was accepted.",
      command:
        "kubectl describe deployment <deployment-name> -n <namespace>",
      interpretOutput: [
        "Review desired, updated, available, and unavailable replica counts.",
        "Inspect conditions such as Progressing and Available.",
        "Look for ReplicaSet creation failures, insufficient capacity, and rollout timeouts.",
        "An accepted Deployment can still fail to become healthy because pods cannot start or become ready.",
      ],
      nextStep:
        "Inspect the corresponding ReplicaSet, pods, events, and application logs.",
    },
    {
      title: "8. Inspect pod status and restarts",
      purpose:
        "Determine whether a sync succeeded but the resulting workload failed at runtime.",
      command:
        "kubectl get pods -n <namespace> -o wide",
      interpretOutput: [
        "Look for Pending, ImagePullBackOff, CrashLoopBackOff, and repeated restarts.",
        "Check node placement and readiness.",
        "A pod runtime problem is different from an API apply failure.",
      ],
      nextStep:
        "Use describe, events, and logs to troubleshoot the pod failure separately.",
    },
    {
      title: "9. Check pod logs",
      purpose:
        "Find application startup or runtime failures following a deployment.",
      command:
        "kubectl logs <pod-name> -n <namespace> --all-containers=true --tail=200",
      interpretOutput: [
        "Look for startup exceptions, missing configuration, failed connections, and application-level errors.",
        "If the container restarted, inspect previous logs when available.",
        "Logs from the new version may need to be compared with the previous stable version.",
      ],
      nextStep:
        "Correlate the log timestamps with the rollout and determine whether the failure is caused by the deployed change or an external dependency.",
      safetyNote:
        "Redact credentials, personal data, and tokens before sharing logs.",
    },
    {
      title: "10. Verify Kubernetes permissions",
      purpose:
        "Determine whether the relevant identity can perform the required operation.",
      command:
        "kubectl auth can-i patch deployments.apps -n <namespace>",
      interpretOutput: [
        "yes indicates that the identity used for this kubectl check is authorized for the tested action.",
        "no indicates that the tested identity lacks permission under the current authorization configuration.",
        "Your local kubectl identity may differ from the identity Argo CD uses for the destination cluster.",
        "A successful check for patch does not prove permission to create, delete, update, or manage every resource kind.",
      ],
      nextStep:
        "Inspect the actual Argo CD destination identity and test the specific verb, resource, namespace, and API group involved.",
      safetyNote:
        "Grant only the required permission. Do not solve an RBAC problem by assigning broad cluster-admin access.",
    },
    {
      title: "11. Inspect ResourceQuota",
      purpose:
        "Check whether namespace resource limits block object creation or pod scheduling.",
      command:
        "kubectl get resourcequota -n <namespace>",
      interpretOutput: [
        "Review used and hard values for relevant resource quotas.",
        "A quota can block creation of pods, CPU or memory requests, storage claims, and other supported resources.",
        "A quota failure often identifies the constrained resource in the API error.",
      ],
      nextStep:
        "Inspect the relevant quota and current usage before requesting an approved quota or workload adjustment.",
    },
    {
      title: "12. Inspect LimitRanges",
      purpose:
        "Check whether namespace defaults or minimum and maximum resource constraints affect workloads.",
      command: "kubectl get limitrange -n <namespace> -o yaml",
      interpretOutput: [
        "Review default CPU and memory requests and limits.",
        "Check minimum and maximum values for the resource type.",
        "An invalid resource request may be rejected or may create a workload that cannot schedule.",
      ],
      nextStep:
        "Correct the manifest or namespace policy according to the approved resource requirements.",
    },
    {
      title: "13. Validate a manifest locally",
      purpose:
        "Catch syntax and basic schema issues before attempting another sync.",
      command:
        "kubectl apply --dry-run=client -f <manifest.yaml>",
      interpretOutput: [
        "This performs client-side dry-run processing.",
        "It can catch some local validation problems but does not reproduce all server-side validation or admission behavior.",
        "It does not prove that the Argo CD identity has permission to apply the resource.",
      ],
      nextStep:
        "If client-side validation passes but the API rejects the resource, use server-side validation and investigate authorization or admission.",
      safetyNote:
        "Use a reviewed manifest from the intended revision. Avoid testing unknown or untrusted YAML against production credentials.",
    },
    {
      title: "14. Validate against the Kubernetes API",
      purpose:
        "Check server-side validation and admission behavior without persisting the requested change.",
      command:
        "kubectl apply --dry-run=server -f <manifest.yaml>",
      interpretOutput: [
        "Server-side dry-run requests API validation and compatible admission processing without persisting the object.",
        "The command requires suitable permissions.",
        "Some admission webhooks or API implementations may not support dry-run requests.",
        "The identity used by kubectl may differ from Argo CD's destination identity.",
        "Passing dry-run does not guarantee that a later apply will succeed because live state, concurrency, or external conditions can change.",
      ],
      nextStep:
        "Investigate any validation or webhook error. Use the actual Argo CD identity and operation evidence to confirm authorization differences.",
    },
    {
      title: "15. Check API resources and CRDs",
      purpose:
        "Identify missing API groups, custom resource definitions, or API discovery problems.",
      command: "kubectl api-resources",
      interpretOutput: [
        "Check whether the required resource kind and API group are available.",
        "A missing custom resource may indicate that its CRD has not been installed or is not established.",
        "The cluster may support a different API version from the one in the manifest.",
      ],
      nextStep:
        "Verify CRD installation and establishment, supported versions, and dependency ordering before applying custom resources.",
    },
    {
      title: "16. Check a CRD's establishment status",
      purpose:
        "Verify that a custom resource definition has become available.",
      command:
        "kubectl get crd <crd-name> -o yaml",
      interpretOutput: [
        "Inspect status.conditions for Established and NamesAccepted where applicable.",
        "Check the CRD's spec.group, names, scope, and versions.",
        "A CRD object existing does not necessarily mean the API is already ready for every immediate operation.",
      ],
      nextStep:
        "Wait for the documented readiness condition or correct the CRD before retrying dependent custom resources.",
    },
    {
      title: "17. Inspect admission webhook configuration",
      purpose:
        "Find webhooks that may reject or block resource operations.",
      command: "kubectl get validatingwebhookconfigurations,mutatingwebhookconfigurations",
      interpretOutput: [
        "Identify webhook configurations associated with the failing API operation.",
        "Review the webhook service, rules, namespace selectors, and failure policy through authorized inspection.",
        "A timeout can indicate an unavailable webhook service, networking issue, TLS problem, or slow handler.",
        "A denial can indicate that the submitted object violates an enforced policy.",
      ],
      nextStep:
        "Inspect the specific webhook service, endpoints, events, logs, and policy message. Do not disable admission controls as an unreviewed workaround.",
    },
    {
      title: "18. Inspect webhook service endpoints",
      purpose:
        "Determine whether a webhook service has ready backend endpoints.",
      command:
        "kubectl get svc,endpoints,endpointslices -n <webhook-namespace>",
      interpretOutput: [
        "Confirm the webhook Service exists.",
        "Check whether the expected endpoint addresses are available.",
        "An empty endpoint set may indicate unavailable pods, selector mismatch, or readiness failure.",
        "Some clusters use EndpointSlices as the primary representation of service backends.",
      ],
      nextStep:
        "Inspect the webhook Deployment, pod readiness, service selectors, TLS configuration, and network path.",
    },
    {
      title: "19. Inspect the desired-state diff",
      purpose:
        "Understand which fields Argo CD wants to change.",
      command: "argocd app diff <app-name>",
      interpretOutput: [
        "Review the proposed differences between desired and live state.",
        "Pay particular attention to immutable fields, selectors, service cluster settings, storage configuration, and deletions.",
        "A diff is evidence of intended changes, not proof that every change is safe.",
      ],
      nextStep:
        "Review destructive or replacement-prone changes with the owning team before attempting a production sync.",
      safetyNote:
        "Do not blindly apply a diff. Verify that it matches the approved source revision and intended change.",
    },
    {
      title: "20. Check sync operation status",
      purpose:
        "Determine whether an operation is running, failed, or waiting.",
      command:
        "kubectl get application <app-name> -n <argocd-namespace> -o jsonpath='{.status.operationState.phase}'",
      interpretOutput: [
        "The returned phase reflects the recorded operation state when available.",
        "An absent value may mean there is no recorded operation or the field is not populated.",
        "A terminal failure and an operation still in progress require different responses.",
      ],
      nextStep:
        "Inspect the full operation state and resource results before deciding whether a retry is safe.",
    },
    {
      title: "21. Check recent events for a workload",
      purpose:
        "Correlate scheduling and startup errors with a failed sync.",
      command:
        "kubectl describe pod <pod-name> -n <namespace>",
      interpretOutput: [
        "Review the Events section and container state.",
        "Look for failed image pulls, failed mounts, insufficient CPU or memory, and readiness probe failures.",
        "A successful API apply may still produce a workload that never becomes ready.",
      ],
      nextStep:
        "Correct the verified runtime issue, then reassess the Application's health independently of sync status.",
    },
    {
      title: "22. Inspect the Application controller and repo-server logs",
      purpose:
        "Distinguish sync orchestration errors from source or rendering problems.",
      command:
        "kubectl logs -n <argocd-namespace> deploy/argocd-application-controller --since=30m",
      interpretOutput: [
        "Look for the Application name, timestamp, operation phase, and exact error.",
        "Controller logs may explain operation coordination and reconciliation.",
        "Repo-server logs are more relevant when the failure occurs during source retrieval or manifest generation.",
        "Log content and deployment names vary by Argo CD version and installation method.",
      ],
      nextStep:
        "Inspect the component responsible for the failing stage. Avoid restarting components merely because a sync failed.",
      safetyNote:
        "Redact sensitive values before sharing logs.",
    },
  ] satisfies SyncDiagnostic[],

  rootCauses: [
    {
      cause: "Insufficient Kubernetes RBAC permissions",
      symptoms: [
        "Forbidden errors during create, patch, update, or delete.",
        "Only certain resource kinds fail.",
        "A deployment identity can read resources but cannot modify them.",
      ],
      verification: [
        "Identify the exact API group, resource, verb, and namespace from the error.",
        "Confirm which identity Argo CD uses for the destination cluster.",
        "Inspect the relevant Role, ClusterRole, RoleBinding, and ClusterRoleBinding.",
        "Distinguish the Argo CD destination identity from the identity used for local kubectl commands.",
      ],
      resolution: [
        "Grant the minimum required permissions through the approved access-control process.",
        "Use namespace-scoped permissions where possible.",
        "Revalidate the exact operation after the policy change.",
      ],
      prevention: [
        "Maintain reviewed RBAC policies.",
        "Test deployment permissions in a nonproduction environment.",
        "Audit privilege changes and avoid broad cluster-admin grants.",
      ],
    },
    {
      cause: "Admission webhook rejects the resource",
      symptoms: [
        "The API returns an admission denial.",
        "The error identifies a policy, webhook, or invalid configuration.",
        "Resources of a particular type fail while unrelated resources succeed.",
      ],
      verification: [
        "Read the full API error and identify the named webhook or policy.",
        "Inspect relevant admission configurations and policy-controller logs.",
        "Compare the submitted manifest with the enforced policy.",
        "Determine whether the denial is intentional security enforcement or a configuration defect.",
      ],
      resolution: [
        "Correct the resource to comply with the policy when appropriate.",
        "If the policy is incorrect, request a reviewed policy change from its owner.",
        "Do not bypass admission controls without explicit security approval and a documented emergency procedure.",
      ],
      prevention: [
        "Validate policy requirements in CI.",
        "Test policy changes before production rollout.",
        "Document policy owners and escalation paths.",
      ],
    },
    {
      cause: "Admission webhook unavailable or timing out",
      symptoms: [
        "Failed calling webhook.",
        "Webhook request timeouts.",
        "Several unrelated resources fail when the same webhook is involved.",
      ],
      verification: [
        "Identify the webhook and its Service.",
        "Check ready endpoints, pod events, logs, TLS configuration, and network policies.",
        "Check webhook latency and failure rate during the incident.",
        "Determine whether the webhook service itself or a downstream dependency is unavailable.",
      ],
      resolution: [
        "Restore the webhook's approved service, network, certificate, or capacity configuration.",
        "Coordinate with the policy owner before changing failure policy or admission behavior.",
        "Retry only after the webhook is verified healthy.",
      ],
      prevention: [
        "Monitor webhook availability and latency.",
        "Test webhook upgrades and certificate rotation.",
        "Document the impact of fail-open and fail-closed behavior.",
      ],
    },
    {
      cause: "Immutable field changed",
      symptoms: [
        "The API rejects an update because a field cannot be changed.",
        "The error identifies an immutable field.",
        "A change to a selector or storage configuration triggers a failure.",
      ],
      verification: [
        "Compare the live object and desired manifest.",
        "Identify the exact immutable field in the API error.",
        "Check the Kubernetes resource's API documentation and lifecycle constraints.",
        "Assess whether replacement would cause downtime or data loss.",
      ],
      resolution: [
        "Revert the unsupported field change when appropriate.",
        "If replacement is required, plan it as a reviewed migration.",
        "For stateful workloads, verify backup, retention, data migration, and recovery procedures before replacement.",
      ],
      prevention: [
        "Review immutable fields during code review.",
        "Use migration plans for resources requiring replacement.",
        "Test upgrades against representative live-state fixtures.",
      ],
    },
    {
      cause: "Resource already exists or ownership conflict",
      symptoms: [
        "A resource already exists.",
        "The desired resource conflicts with an object managed by another tool or Application.",
        "Ownership or tracking metadata differs from the expected configuration.",
      ],
      verification: [
        "Inspect the existing resource and its labels and annotations.",
        "Determine which controller or Application manages it.",
        "Check whether the resource was created manually or by another deployment system.",
        "Review the desired-state diff and ownership policy.",
      ],
      resolution: [
        "Choose an explicit ownership-adoption or migration procedure.",
        "Coordinate with the existing owner before transferring management.",
        "Avoid deleting the resource merely to make the sync pass.",
      ],
      prevention: [
        "Define ownership for shared and cluster-scoped resources.",
        "Avoid multiple independent owners for the same resource.",
        "Review resource names and tracking configuration during onboarding.",
      ],
    },
    {
      cause: "ResourceQuota or policy limit exceeded",
      symptoms: [
        "The API rejects object creation due to quota.",
        "Pods cannot be created because resource limits are exceeded.",
        "A deployment fails after adding replicas or additional resources.",
      ],
      verification: [
        "Inspect the exact quota error.",
        "Check ResourceQuota usage and LimitRange constraints.",
        "Check the requested CPU, memory, storage, and object count.",
        "Compare recent workload changes with current namespace usage.",
      ],
      resolution: [
        "Right-size the workload if requests are incorrect.",
        "Request an approved quota change if additional capacity is justified.",
        "Verify cluster capacity before increasing resource limits.",
      ],
      prevention: [
        "Monitor quota consumption.",
        "Set realistic resource requests and limits.",
        "Alert before critical quota thresholds are reached.",
      ],
    },
    {
      cause: "Missing CRD or unsupported API version",
      symptoms: [
        "No matches for kind.",
        "The server cannot find the requested API resource.",
        "A custom resource fails while its CRD is missing or not established.",
      ],
      verification: [
        "Check whether the required API group and kind exist.",
        "Inspect the CRD and its establishment conditions.",
        "Verify that the cluster supports the manifest's API version.",
        "Check whether the CRD and custom resource are managed in a safe dependency order.",
      ],
      resolution: [
        "Install or upgrade the required CRD through its approved lifecycle process.",
        "Wait for the API to become available before applying dependent resources.",
        "Use a supported API version.",
      ],
      prevention: [
        "Version and test CRDs with dependent applications.",
        "Document CRD ownership and upgrade sequencing.",
        "Validate API compatibility before production rollout.",
      ],
    },
    {
      cause: "Resource conflict or concurrent modification",
      symptoms: [
        "The object has been modified.",
        "A resource update conflicts with a concurrent change.",
        "Another controller or operator modifies the same fields.",
      ],
      verification: [
        "Inspect the current live object and resourceVersion.",
        "Review recent changes from other controllers or automation.",
        "Check whether multiple systems manage the same fields.",
        "Determine whether the error is transient or caused by competing ownership.",
      ],
      resolution: [
        "Reconcile the desired state with the current live state.",
        "Remove conflicting ownership where appropriate.",
        "Retry only after confirming the intended result and current resource state.",
      ],
      prevention: [
        "Define clear field and resource ownership.",
        "Avoid competing automation for the same resources.",
        "Monitor repeated conflict errors.",
      ],
    },
    {
      cause: "Kubernetes API server unavailable or overloaded",
      symptoms: [
        "Connection refused, timeout, or server errors.",
        "Several unrelated resources fail simultaneously.",
        "API requests become slow or throttled.",
      ],
      verification: [
        "Check cluster health and API availability through approved platform monitoring.",
        "Compare failures across different resources and namespaces.",
        "Inspect API server and control-plane metrics where available.",
        "Check network reachability and authentication independently.",
      ],
      resolution: [
        "Escalate control-plane issues to the cluster platform owner.",
        "Restore connectivity or capacity through the supported platform process.",
        "Avoid repeated high-volume retries during an outage.",
      ],
      prevention: [
        "Monitor API latency and error rates.",
        "Review request volume and controller concurrency.",
        "Maintain a documented cluster incident procedure.",
      ],
    },
    {
      cause: "Sync hook failed",
      symptoms: [
        "A PreSync, Sync, or PostSync hook reports failure.",
        "A Job exits unsuccessfully.",
        "A hook exceeds its configured retry or deadline.",
      ],
      verification: [
        "Identify the hook type, name, and phase.",
        "Inspect the hook Job, pod events, and logs.",
        "Check image availability, service account permissions, dependencies, and command exit status.",
        "Determine whether the hook partially changed external state.",
      ],
      resolution: [
        "Correct the verified hook failure.",
        "Assess whether the hook is safe to retry and whether it is idempotent.",
        "Follow the approved recovery procedure for any external side effects.",
      ],
      prevention: [
        "Make hooks idempotent where practical.",
        "Set appropriate resource requests, deadlines, and retry behavior.",
        "Test failure and recovery paths.",
      ],
    },
    {
      cause: "Sync wave or dependency ordering problem",
      symptoms: [
        "Dependent resources fail because prerequisites are not ready.",
        "A custom resource is applied before its CRD is available.",
        "A hook or resource remains waiting for a dependency.",
      ],
      verification: [
        "Inspect sync-wave annotations and hook phases.",
        "Confirm the required prerequisite exists and is ready.",
        "Review the operation timeline and the first failed resource.",
        "Check whether readiness depends on a controller or external service.",
      ],
      resolution: [
        "Correct the intended ordering and dependency configuration.",
        "Use explicit waves or hooks only where necessary.",
        "Verify prerequisite readiness before applying dependent resources.",
      ],
      prevention: [
        "Document dependencies between platform and application resources.",
        "Test ordering with a clean nonproduction environment.",
        "Avoid relying on arbitrary timing delays when a readiness condition is available.",
      ],
    },
    {
      cause: "Pruning deletes a resource unexpectedly",
      symptoms: [
        "A resource is marked for deletion because it is no longer in desired state.",
        "A namespace, workload, or configuration resource disappears during sync.",
        "A source refactor changes which resources are generated.",
      ],
      verification: [
        "Review the exact source revision and generated manifests.",
        "Inspect the Application diff and prune-related settings.",
        "Confirm whether the resource was intentionally removed or renamed.",
        "Determine whether deletion affects persistent data, traffic, or dependent resources.",
      ],
      resolution: [
        "Stop and review the deletion if its safety is unclear.",
        "Restore the intended resource definition through the approved source change if appropriate.",
        "Follow a reviewed recovery plan for resources already deleted.",
      ],
      prevention: [
        "Review deletion diffs carefully.",
        "Use resource-preservation and pruning controls according to documented requirements.",
        "Require extra review for stateful or critical resources.",
      ],
    },
    {
      cause: "Application source renders different resources than expected",
      symptoms: [
        "Unexpected resources are created or removed.",
        "The Application is OutOfSync after a source change.",
        "A wrong branch, revision, path, or values file changes the desired state.",
      ],
      verification: [
        "Confirm source repository, path, revision, and renderer configuration.",
        "Review the exact generated manifest set.",
        "Compare the intended release commit with the Application's configured revision.",
        "Check Helm values and Kustomize overlays.",
      ],
      resolution: [
        "Correct the source or revision through the reviewed GitOps process.",
        "Revalidate the generated manifests and diff.",
        "Do not sync until the intended desired state is confirmed.",
      ],
      prevention: [
        "Require source and diff review.",
        "Validate manifests in CI.",
        "Protect production deployment references.",
      ],
    },
    {
      cause: "Workload applies but never becomes healthy",
      symptoms: [
        "Sync completes but Application health is degraded or progressing.",
        "Pods are not ready or deployments cannot reach the desired replica count.",
        "Services have no ready endpoints.",
      ],
      verification: [
        "Check Deployment conditions, ReplicaSets, pods, and events.",
        "Inspect startup and readiness probe failures.",
        "Check configuration, secrets, image access, scheduling, and external dependencies.",
        "Determine whether the new revision introduced the runtime failure.",
      ],
      resolution: [
        "Correct the identified workload or dependency problem.",
        "Use the approved rollout or rollback procedure.",
        "Verify actual service health after the correction.",
      ],
      prevention: [
        "Use health checks that reflect service readiness.",
        "Validate application configuration and images in CI.",
        "Monitor rollout progress and customer-facing service indicators.",
      ],
    },
  ] satisfies SyncRootCause[],

  incidentScenarios: [
    {
      title: "Scenario 1: Production sync fails halfway through",
      situation:
        "A production Application contains several resources. Some resources apply successfully, but a later resource fails admission validation. The overall sync reports failure.",

      impact: [
        "The cluster may contain a partially applied release.",
        "Different components may temporarily run different versions.",
        "Automatic retry may repeat some operations.",
        "Customer impact depends on which resources changed and whether the service remains compatible.",
      ],

      investigation: [
        "Record the sync operation ID and timestamps.",
        "Inspect the operation's per-resource results.",
        "Identify which resources succeeded, failed, or were not attempted.",
        "Compare the live state with the intended source revision.",
        "Check the exact admission error and the policy owner.",
        "Assess service health and compatibility before deciding whether to continue or roll back.",
      ],

      resolution: [
        "Correct the manifest or policy issue through the approved process.",
        "Confirm the current live state and identify any partial changes.",
        "Review the resulting diff before retrying the sync.",
        "Follow the approved deployment or rollback plan.",
      ],

      verification: [
        "All intended resources reach the expected state.",
        "No unintended deletions or replacements remain.",
        "Application health and customer-facing behavior are verified.",
        "The incident timeline records the partial deployment and recovery.",
      ],
    },
    {
      title: "Scenario 2: Deployment sync fails with Forbidden",
      situation:
        "A new resource cannot be created because the identity used by Argo CD lacks the required permission.",

      impact: [
        "The affected resource is not applied.",
        "Dependent resources may remain pending or unhealthy.",
        "A partial deployment may already exist.",
      ],

      investigation: [
        "Capture the complete redacted Forbidden error.",
        "Identify the resource kind, API group, namespace, and requested verb.",
        "Confirm the actual destination identity.",
        "Inspect the relevant RBAC bindings.",
        "Check whether only the new resource kind fails or all writes fail.",
      ],

      resolution: [
        "Request the minimum required permission.",
        "Have the authorized owner update RBAC through the reviewed process.",
        "Revalidate the permission and retry only after reviewing the current state.",
      ],

      verification: [
        "The intended operation is authorized.",
        "The sync completes without granting excessive privileges.",
        "The affected resource and dependent workload become healthy.",
      ],
    },
    {
      title: "Scenario 3: CRD is missing during deployment",
      situation:
        "A custom resource is included in the Application, but the destination cluster does not yet expose its API.",

      impact: [
        "The custom resource cannot be created.",
        "Dependent workloads may remain undeployed.",
        "A sync can fail even when the repository and manifest syntax are correct.",
      ],

      investigation: [
        "Identify the missing API group and kind.",
        "Check available API resources.",
        "Inspect the CRD and its establishment conditions.",
        "Check whether the CRD belongs to a separate platform Application.",
        "Review sync ordering and controller readiness.",
      ],

      resolution: [
        "Install or upgrade the required CRD through the approved lifecycle process.",
        "Wait for the API to become established.",
        "Verify that the controller responsible for the custom resource is ready.",
        "Retry the dependent sync after validating the desired state.",
      ],

      verification: [
        "The API kind is available.",
        "The CRD is established.",
        "The custom resource is accepted.",
        "The operator and dependent workload reach the expected health state.",
      ],
    },
    {
      title: "Scenario 4: Immutable field change blocks a rollout",
      situation:
        "A source change modifies a field Kubernetes does not permit to be updated on an existing resource.",

      impact: [
        "The resource update is rejected.",
        "The old workload may continue running.",
        "A replacement could cause downtime or data loss if performed carelessly.",
      ],

      investigation: [
        "Identify the exact immutable field from the API error.",
        "Compare the desired and live objects.",
        "Review resource ownership and the reason for the change.",
        "Determine whether replacement is required and what depends on the resource.",
        "For stateful resources, check data preservation and recovery requirements.",
      ],

      resolution: [
        "Revert the unsupported field change if appropriate.",
        "If replacement is required, design and approve a migration.",
        "Back up and verify critical data before any destructive action.",
        "Execute the reviewed replacement plan in a controlled window.",
      ],

      verification: [
        "The intended configuration is applied.",
        "The workload reaches readiness.",
        "Persistent data and dependencies remain intact.",
        "No unexpected service interruption remains.",
      ],
    },
    {
      title: "Scenario 5: Sync succeeds but the application is unavailable",
      situation:
        "Argo CD reports a successful sync, but pods fail readiness checks or the service has no healthy endpoints.",

      impact: [
        "The deployment operation succeeded, but users may experience errors.",
        "The problem may be caused by the new version or an external dependency.",
      ],

      investigation: [
        "Check Application health separately from sync status.",
        "Inspect Deployment conditions and pod readiness.",
        "Review recent container logs and Kubernetes events.",
        "Check image availability, configuration, secrets, probes, and dependencies.",
        "Inspect Service selectors and ready endpoints.",
        "Compare service-level indicators before and after the release.",
      ],

      resolution: [
        "Correct the demonstrated configuration or runtime issue.",
        "If the release is causing unacceptable impact, follow the approved rollback procedure.",
        "Do not assume that reverting a manifest automatically reverses database migrations or external side effects.",
      ],

      verification: [
        "Pods are ready and stable.",
        "Service endpoints are available.",
        "Application health checks pass.",
        "Customer-facing metrics recover.",
      ],
    },
  ] satisfies SyncIncidentScenario[],

  troubleshootingDecisionTree: [
    {
      observation: "Manifest generation fails before sync begins.",
      likelyCauses: [
        "Invalid Helm or Kustomize configuration.",
        "Missing source file or values file.",
        "Config-management plugin failure.",
      ],
      nextAction:
        "Troubleshoot repository retrieval and manifest rendering first. Do not treat this as a Kubernetes apply failure.",
    },
    {
      observation: "The API returns Forbidden.",
      likelyCauses: [
        "Insufficient RBAC.",
        "Wrong destination identity.",
        "Policy or provider-specific authorization restrictions.",
      ],
      nextAction:
        "Identify the exact resource and verb, then verify the actual Argo CD destination identity and its permissions.",
    },
    {
      observation: "The API returns Invalid or a validation error.",
      likelyCauses: [
        "Invalid field or value.",
        "Unsupported API version.",
        "Schema mismatch.",
        "Admission policy rejection.",
      ],
      nextAction:
        "Validate the manifest against the API schema and inspect the complete error message.",
    },
    {
      observation: "The error contains failed calling webhook or webhook timeout.",
      likelyCauses: [
        "Webhook service unavailable.",
        "No ready endpoints.",
        "TLS or networking failure.",
        "Slow policy evaluation.",
      ],
      nextAction:
        "Inspect the webhook configuration, service endpoints, pod health, logs, TLS, and network path.",
    },
    {
      observation: "The error mentions an immutable field.",
      likelyCauses: [
        "Unsupported in-place field change.",
        "A replacement or migration is required.",
      ],
      nextAction:
        "Review the live object and intended change. Assess downtime and data-loss risks before deciding on replacement.",
    },
    {
      observation: "The error contains no matches for kind.",
      likelyCauses: [
        "Missing CRD.",
        "Unsupported API version.",
        "CRD not established yet.",
      ],
      nextAction:
        "Check the API resource, CRD conditions, and dependency ordering.",
    },
    {
      observation: "A hook Job fails.",
      likelyCauses: [
        "Application-level hook error.",
        "Missing permissions or configuration.",
        "Unavailable dependency.",
        "Resource limit or timeout.",
      ],
      nextAction:
        "Inspect the hook Job, pod logs, events, and external side effects before deciding whether to retry.",
    },
    {
      observation: "The operation is waiting for health.",
      likelyCauses: [
        "Pods are not ready.",
        "Insufficient cluster capacity.",
        "Readiness probe failure.",
        "Dependency or sync-wave ordering issue.",
      ],
      nextAction:
        "Inspect resource health, events, rollout progress, and the dependency that is preventing readiness.",
    },
    {
      observation: "Resources are being deleted unexpectedly.",
      likelyCauses: [
        "Pruning.",
        "Wrong revision or path.",
        "Resource renamed or removed from generated manifests.",
      ],
      nextAction:
        "Review the diff, desired resource set, and deletion impact before allowing further changes.",
    },
    {
      observation: "The sync operation failed but some resources changed.",
      likelyCauses: [
        "A later resource failed after earlier resources were applied.",
        "Hook failure.",
        "Admission or dependency failure.",
      ],
      nextAction:
        "Inspect per-resource results and current live state before retrying or rolling back.",
    },
    {
      observation: "Sync is successful but the application is unhealthy.",
      likelyCauses: [
        "Runtime configuration problem.",
        "Image or startup failure.",
        "Readiness probe failure.",
        "Service or external dependency issue.",
      ],
      nextAction:
        "Troubleshoot Deployment, pods, logs, Service endpoints, and application metrics separately.",
    },
  ],

  safeRecoveryProcedure: [
    {
      step: 1,
      action: "Freeze uncontrolled retries",
      details:
        "If the sync operation is still running or the live state is unclear, do not start another operation until the current state is understood.",
    },
    {
      step: 2,
      action: "Capture operation evidence",
      details:
        "Record the exact error, failed resource, operation timestamps, per-resource results, and relevant events.",
    },
    {
      step: 3,
      action: "Determine partial changes",
      details:
        "Compare the intended manifest with the live cluster. Identify which resources changed, failed, were skipped, or were deleted.",
    },
    {
      step: 4,
      action: "Identify the verified root cause",
      details:
        "Classify the failure as authorization, validation, admission, quota, CRD, conflict, hook, dependency, or runtime health related.",
    },
    {
      step: 5,
      action: "Prepare the correction",
      details:
        "Make the smallest justified change in the correct source of truth. Obtain the required production approval.",
    },
    {
      step: 6,
      action: "Validate the correction",
      details:
        "Review the manifest and desired-state diff. Use appropriate client-side or server-side validation and understand the identity limitations of each test.",
    },
    {
      step: 7,
      action: "Reassess the current state",
      details:
        "Check whether partial changes have already occurred and whether dependent systems remain compatible with the intended next step.",
    },
    {
      step: 8,
      action: "Retry through the approved workflow",
      details:
        "Retry only after the cause is addressed, the current operation state is known, and the resulting change is approved.",
    },
    {
      step: 9,
      action: "Verify service recovery",
      details:
        "Confirm sync completion, resource state, workload readiness, service endpoints, application health, and relevant customer-facing indicators.",
    },
    {
      step: 10,
      action: "Document the incident",
      details:
        "Record the root cause, evidence, approved correction, partial changes, verification, rollback decision, and prevention actions.",
    },
  ],

  verificationChecklist: [
    "Correct cluster, Argo CD instance, namespace, and Application confirmed.",
    "Source revision and destination confirmed.",
    "Exact failed resource and API error captured.",
    "Current sync operation state identified.",
    "Partial resource changes assessed.",
    "Relevant events and operation logs reviewed.",
    "RBAC and destination identity checked where relevant.",
    "Admission webhook or policy checked where relevant.",
    "Quota and capacity checked where relevant.",
    "CRDs and API versions checked where relevant.",
    "Hooks and sync waves checked where relevant.",
    "Destructive changes and pruning reviewed.",
    "Correction approved and validated.",
    "Desired-state diff reviewed.",
    "Sync operation completed.",
    "Intended live resources verified.",
    "Deployment and pod readiness verified.",
    "Service endpoints and application health verified.",
    "No unexpected resource deletion or replacement remains.",
    "Sensitive information redacted.",
    "Incident report and preventive actions completed.",
  ],

  prevention: [
    {
      area: "Source control and CI",
      actions: [
        "Validate manifests and schemas before merging.",
        "Use policy checks for security, naming, required fields, and resource configuration.",
        "Review production diffs and destructive changes.",
        "Protect production branches and deployment revisions.",
        "Test representative deployment changes in nonproduction.",
      ],
    },
    {
      area: "RBAC and security",
      actions: [
        "Use least-privilege deployment identities.",
        "Test required permissions for supported resource types.",
        "Review RBAC changes before production rollout.",
        "Keep admission policies enabled and test their behavior.",
        "Avoid broad privileges as a shortcut for sync failures.",
      ],
    },
    {
      area: "CRDs and dependencies",
      actions: [
        "Document CRD ownership and lifecycle.",
        "Test CRD upgrades with dependent custom resources.",
        "Use explicit dependency ordering where required.",
        "Verify readiness conditions rather than relying only on fixed delays.",
      ],
    },
    {
      area: "Resource management",
      actions: [
        "Set appropriate CPU, memory, and storage requests.",
        "Monitor namespace quota consumption.",
        "Test immutable-field changes before production deployment.",
        "Use reviewed migration procedures for stateful resources.",
      ],
    },
    {
      area: "Hooks and orchestration",
      actions: [
        "Make hooks idempotent where practical.",
        "Use meaningful hook deadlines and retry policies.",
        "Document external side effects performed by hooks.",
        "Test failure and recovery paths.",
        "Avoid unnecessary hook and sync-wave complexity.",
      ],
    },
    {
      area: "Monitoring",
      actions: [
        "Alert on sustained sync failures for critical Applications.",
        "Monitor rollout progress and application health separately.",
        "Track admission webhook errors and latency.",
        "Monitor quota usage and cluster capacity.",
        "Correlate failures with source commits and cluster configuration changes.",
      ],
    },
    {
      area: "Incident readiness",
      actions: [
        "Maintain a sync-failure runbook.",
        "Document platform and application escalation contacts.",
        "Test recovery and rollback procedures in nonproduction.",
        "Record incident root causes and follow-up owners.",
        "Practice partial-deployment recovery scenarios.",
      ],
    },
  ],

  commonMistakes: [
    {
      mistake: "Blindly retrying the sync",
      whyItIsWrong:
        "The original failure may remain, and some resources may already have changed. Repeating an operation can create additional risk.",
      betterApproach:
        "Inspect operation results, current live state, and the root cause before retrying.",
    },
    {
      mistake: "Assuming a failed sync changed nothing",
      whyItIsWrong:
        "A sync may successfully apply earlier resources before a later resource fails.",
      betterApproach:
        "Inspect per-resource results and compare the current cluster state with the desired state.",
    },
    {
      mistake: "Granting cluster-admin to fix Forbidden",
      whyItIsWrong:
        "It creates excessive privilege and can conceal an incorrectly designed permission model.",
      betterApproach:
        "Grant the minimum required resource and verb permissions to the correct identity.",
    },
    {
      mistake: "Deleting a resource to fix an immutable field",
      whyItIsWrong:
        "Deletion can cause downtime, data loss, or disruption to dependent resources.",
      betterApproach:
        "Review replacement and migration requirements before any destructive action.",
    },
    {
      mistake: "Disabling admission webhooks",
      whyItIsWrong:
        "It may bypass security and compliance controls and expose the cluster to invalid or unsafe resources.",
      betterApproach:
        "Investigate the webhook's policy, health, service, and network dependencies.",
    },
    {
      mistake: "Treating sync success as application success",
      whyItIsWrong:
        "The Kubernetes API may accept resources while pods fail to start or services remain unavailable.",
      betterApproach:
        "Verify resource health, workload readiness, service endpoints, and application metrics.",
    },
    {
      mistake: "Ignoring pruning",
      whyItIsWrong:
        "Resources removed from generated manifests may be deleted during synchronization, depending on the configuration.",
      betterApproach:
        "Review deletions and resource ownership before allowing a destructive sync.",
    },
    {
      mistake: "Using local dry-run as proof that Argo CD will succeed",
      whyItIsWrong:
        "The local identity, live state, admission behavior, and destination configuration may differ.",
      betterApproach:
        "Understand the limits of client-side and server-side dry-run and validate the actual deployment path.",
    },
    {
      mistake: "Rolling back without checking data migrations",
      whyItIsWrong:
        "A manifest rollback does not necessarily reverse database migrations, persistent-data changes, or external side effects.",
      betterApproach:
        "Follow the documented application and data recovery plan.",
    },
  ],

  runbook: {
    title: "Production Argo CD Sync Failure Runbook",
    steps: [
      "Acknowledge the alert and record the incident timestamp.",
      "Confirm the cluster, Argo CD namespace, Application, and destination.",
      "Assess impact and determine whether a partial deployment occurred.",
      "Capture Application status and operation details.",
      "Identify the first failing resource and exact error.",
      "Inspect the current live state and relevant events.",
      "Check RBAC, admission, quota, CRDs, and dependencies according to the error.",
      "Review source revision, generated manifests, and the desired-state diff.",
      "Determine the root cause using evidence.",
      "Prepare and approve the smallest safe correction.",
      "Validate the correction.",
      "Confirm partial changes and retry safely.",
      "Verify sync completion and resource state.",
      "Verify workload readiness, service endpoints, and application health.",
      "Document root cause, recovery, and preventive actions.",
    ],
    exitCriteria: [
      "The root cause is identified or clearly escalated with supporting evidence.",
      "The intended resources are in the expected state.",
      "No unexpected destructive changes remain.",
      "The sync operation is in the expected terminal state.",
      "Application health and customer impact are verified.",
      "The incident report and follow-up actions are recorded.",
    ],
  },

  incidentReportTemplate: {
    incidentId: "<incident-id>",
    title: "Argo CD Sync Failure",
    environment: "<development / staging / production>",
    application: "<application-name>",
    destinationCluster: "<destination-cluster>",
    namespace: "<namespace>",
    sourceRevision: "<commit-or-tag>",
    startedAt: "<timestamp-with-timezone>",
    detectedBy: "<alert / pipeline / user report>",
    severity: "<severity>",
    customerImpact: "<verified-impact>",
    failedResource: "<api-group-kind-namespace-name>",
    errorMessage: "<redacted-exact-error>",
    partialChanges: "<resources changed before failure>",
    evidence: [
      "<Application operation status>",
      "<per-resource operation results>",
      "<Kubernetes events>",
      "<resource descriptions and logs>",
      "<desired-state diff>",
    ],
    rootCause: "<evidence-supported-cause>",
    correction: "<approved-correction>",
    rollbackDecision: "<not-required / executed / planned>",
    verification: [
      "<sync operation verified>",
      "<resources verified>",
      "<workload health verified>",
      "<service behavior verified>",
    ],
    preventionActions: [
      "<action, owner, due date>",
    ],
  },

  interviewQuestions: [
    {
      question: "What is an Argo CD sync failure?",
      answer:
        "It occurs when an attempted synchronization cannot complete successfully. Causes include API validation, RBAC, admission, conflicts, missing CRDs, hooks, quotas, and dependency or runtime readiness problems.",
    },
    {
      question: "Does a failed sync mean no resources were changed?",
      answer:
        "No. Some resources may have been applied before a later resource failed. Inspect operation results and current live state.",
    },
    {
      question: "What is the difference between Synced and Healthy?",
      answer:
        "Synced describes consistency between desired and tracked live state. Healthy describes the assessed operational state of resources. An application can be Synced but unhealthy.",
    },
    {
      question: "How do you troubleshoot a Forbidden error?",
      answer:
        "Identify the exact API group, resource, verb, and namespace, then verify the actual Argo CD destination identity and its RBAC permissions.",
    },
    {
      question: "How do you troubleshoot a failed admission webhook?",
      answer:
        "Identify the webhook, read the denial or timeout message, inspect the configuration and service endpoints, and check webhook pod health, logs, TLS, and network connectivity.",
    },
    {
      question: "What is an immutable field?",
      answer:
        "It is a field that Kubernetes does not allow to be changed through an ordinary update for that resource. A correction may require reverting the field or performing a carefully planned replacement.",
    },
    {
      question: "How do you troubleshoot no matches for kind?",
      answer:
        "Check whether the API group and kind are registered, whether the required CRD exists and is established, and whether the manifest uses a supported API version.",
    },
    {
      question: "Why can ResourceQuota cause a sync failure?",
      answer:
        "The API may reject resource creation when the namespace exceeds its configured limits for resource usage or object counts.",
    },
    {
      question: "What are sync waves?",
      answer:
        "Sync waves provide ordering between resources during synchronization. They can help manage dependencies but do not automatically guarantee that every external dependency is ready.",
    },
    {
      question: "What are sync hooks?",
      answer:
        "Hooks are resources used for lifecycle operations such as PreSync, Sync, or PostSync tasks. Hook failures can block or fail an operation, and their side effects must be considered during recovery.",
    },
    {
      question: "What is pruning?",
      answer:
        "Pruning removes tracked resources that are no longer present in the desired resource set when the applicable sync configuration permits it.",
    },
    {
      question: "Why is blindly retrying a failed sync dangerous?",
      answer:
        "The cluster may already contain partial changes, the original failure may still exist, and repeated operations can increase the impact.",
    },
    {
      question: "How do you investigate a failed rollout after sync succeeds?",
      answer:
        "Inspect Deployment conditions, ReplicaSets, pods, events, logs, probes, service endpoints, and application metrics.",
    },
    {
      question: "What is the difference between client-side and server-side dry-run?",
      answer:
        "Client-side dry-run performs local validation and processing. Server-side dry-run sends a non-persisting request to the API server and can expose server validation or admission problems, subject to API and webhook support.",
    },
    {
      question: "How should you recover from a partial production deployment?",
      answer:
        "Capture the operation results, determine which resources changed, assess compatibility and impact, fix the verified cause, and follow an approved retry or rollback plan.",
    },
    {
      question: "When should a resource be deleted to resolve a sync problem?",
      answer:
        "Only when a reviewed recovery or migration plan explicitly requires deletion and the data-loss, downtime, and dependency risks are understood.",
    },
    {
      question: "How do you prevent repeated sync failures?",
      answer:
        "Use CI validation, least-privilege RBAC, policy testing, CRD lifecycle management, quota monitoring, dependency checks, diff review, and tested recovery runbooks.",
    },
    {
      question: "What should be included in a sync incident report?",
      answer:
        "Include the environment, source revision, exact error, failed resource, partial changes, evidence, root cause, correction, verification, rollback decision, and prevention actions.",
    },
  ] satisfies SyncInterviewQuestion[],

  practicalExercises: [
    {
      title: "Exercise 1: Diagnose a validation failure",
      objective:
        "Learn to distinguish invalid manifests from authorization failures.",
      steps: [
        "Use a disposable nonproduction Application.",
        "Introduce an invalid field into a test manifest.",
        "Run appropriate client-side validation.",
        "Use server-side dry-run where supported.",
        "Inspect the exact API validation error.",
        "Correct the manifest and verify the result.",
      ],
      successCriteria:
        "Explain which validation stage rejected the resource and how the output identifies the correction.",
    },
    {
      title: "Exercise 2: Diagnose an RBAC failure",
      objective:
        "Identify the specific permission required by a failed operation.",
      steps: [
        "Use an authorized nonproduction cluster and test identity.",
        "Create a controlled permission failure.",
        "Record the exact resource and verb.",
        "Inspect the relevant RBAC binding.",
        "Grant the minimum required permission through the approved process.",
        "Verify the operation.",
      ],
      successCriteria:
        "Explain why granting cluster-admin is not an appropriate default fix.",
    },
    {
      title: "Exercise 3: Diagnose a missing CRD",
      objective:
        "Understand CRD establishment and resource dependencies.",
      steps: [
        "Use a nonproduction cluster with a test custom resource.",
        "Check whether its CRD and API are available.",
        "Observe the failure when the prerequisite is absent.",
        "Install the required CRD through the approved test procedure.",
        "Verify establishment before applying the dependent resource.",
      ],
      successCriteria:
        "Explain why source syntax can be valid while the Kubernetes API still rejects an unknown kind.",
    },
    {
      title: "Exercise 4: Investigate a partial deployment",
      objective:
        "Practice evidence-based recovery without assuming that a failed sync changed nothing.",
      steps: [
        "Use a disposable test Application with several resources.",
        "Introduce a controlled failure in one resource.",
        "Inspect operation results and current live state.",
        "Identify which resources were applied and which failed.",
        "Correct the test manifest.",
        "Review the diff and retry using the approved test workflow.",
      ],
      successCriteria:
        "Produce a clear list of partial changes and explain why the recovery action is safe.",
    },
    {
      title: "Exercise 5: Separate sync status from runtime health",
      objective:
        "Understand why a successful sync may still produce an unhealthy application.",
      steps: [
        "Deploy a simple test workload.",
        "Introduce a controlled readiness-probe or configuration failure.",
        "Inspect Application sync and health status.",
        "Review pod events and logs.",
        "Correct the test configuration and verify service readiness.",
      ],
      successCriteria:
        "Explain why sync success is not sufficient proof of application availability.",
    },
  ],

  bestPractices: [
    "Confirm the correct destination before every production operation.",
    "Capture the operation result before retrying.",
    "Determine whether a failed sync partially changed the cluster.",
    "Use read-only diagnostics first.",
    "Validate manifests and review the desired-state diff.",
    "Use least-privilege deployment identities.",
    "Do not bypass admission controls to hide an error.",
    "Review pruning and replacement risks.",
    "Treat stateful resources and database migrations carefully.",
    "Verify CRDs and dependencies before dependent resources.",
    "Use explicit ordering only where it solves a real dependency.",
    "Check runtime health independently of sync status.",
    "Avoid repeated retries against an unhealthy API server or webhook.",
    "Record incident timestamps and recent changes.",
    "Document and test recovery procedures.",
  ],

  summary: [
    "Argo CD sync failures can originate in Kubernetes authorization, validation, admission, resource conflicts, quota, CRDs, hooks, pruning, and dependencies.",
    "A failed sync may leave some resources applied, so inspect per-resource results and the live cluster.",
    "Client-side validation, server-side dry-run, and a real sync answer different questions.",
    "A successful sync does not guarantee that the application is healthy.",
    "Fix the evidence-supported root cause and use an approved recovery plan.",
    "Verify resource state, rollout readiness, service behavior, and customer impact.",
    "Use CI checks, monitoring, least privilege, and incident reviews to prevent recurrence.",
  ],
} satisfies {
  title: string;
  slug: string;
  category: string;
  difficulty: string;
  estimatedTime: string;
  description: string;
  overview: {
    whatIsTheProblem: string;
    importantDistinction: string;
    systemFlow: string[];
    statusDistinction: {
      status: string;
      meaning: string;
    }[];
    commonErrors: string[];
    keyPrinciple: string;
  };
  learningObjectives: string[];
  productionWorkflow: {
    step: number;
    name: string;
    actions: string[];
    decision: string;
  }[];
  diagnostics: SyncDiagnostic[];
  rootCauses: SyncRootCause[];
  incidentScenarios: SyncIncidentScenario[];
  troubleshootingDecisionTree: {
    observation: string;
    likelyCauses: string[];
    nextAction: string;
  }[];
  safeRecoveryProcedure: {
    step: number;
    action: string;
    details: string;
  }[];
  verificationChecklist: string[];
  prevention: {
    area: string;
    actions: string[];
  }[];
  commonMistakes: {
    mistake: string;
    whyItIsWrong: string;
    betterApproach: string;
  }[];
  runbook: {
    title: string;
    steps: string[];
    exitCriteria: string[];
  };
  incidentReportTemplate: {
    incidentId: string;
    title: string;
    environment: string;
    application: string;
    destinationCluster: string;
    namespace: string;
    sourceRevision: string;
    startedAt: string;
    detectedBy: string;
    severity: string;
    customerImpact: string;
    failedResource: string;
    errorMessage: string;
    partialChanges: string;
    evidence: string[];
    rootCause: string;
    correction: string;
    rollbackDecision: string;
    verification: string[];
    preventionActions: string[];
  };
  interviewQuestions: SyncInterviewQuestion[];
  practicalExercises: {
    title: string;
    objective: string;
    steps: string[];
    successCriteria: string;
  }[];
  bestPractices: string[];
  summary: string[];
};

export default syncFailuresGuide;
