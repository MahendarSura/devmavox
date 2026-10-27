
export interface DeploymentErrorDiagnosticStep {
  id: string;
  title: string;
  objective: string;
  commands: string[];
  interpretResults: string[];
  nextDecision: string;
  safetyNote?: string;
}

export interface DeploymentErrorFailureCase {
  symptom: string;
  likelyCauses: string[];
  proveTheCause: string[];
  fix: string[];
  validate: string[];
  prevention: string[];
}

export interface DeploymentErrorProductionIncident {
  scenario: string;
  impact: string;
  investigation: string[];
  recovery: string[];
  prevention: string[];
}

export interface DeploymentErrorsGuide {
  title: string;
  slug: string;
  category: string;
  overview: string;
  severity: string[];
  symptoms: string[];
  safetyChecks: string[];
  diagnosticWorkflow: DeploymentErrorDiagnosticStep[];
  failureCases: DeploymentErrorFailureCase[];
  productionIncidents: DeploymentErrorProductionIncident[];
  recoveryRunbook: string[];
  preventionChecklist: string[];
  ciPipelineChecks: string[];
  interviewQuestions: { question: string; answer: string }[];
  officialReferences: { title: string; url: string }[];
}

export const deploymentErrorsGuide: DeploymentErrorsGuide = {
  title: "Argo CD Deployment Errors — Production Troubleshooting",
  slug: "deployment-errors",
  category: "Argo CD",
  overview:
    "Argo CD continuously compares the desired Kubernetes state in Git with the live cluster state. Deployment incidents can originate in Git, manifest generation, repository access, sync configuration, Kubernetes admission, workload scheduling, container startup, networking, or application dependencies. Troubleshooting must identify the failing layer before changing manifests or triggering another sync.",
  severity: [
    "SEV-1: Customer-facing production outage, widespread failed rollouts, or an unsafe change affecting critical services.",
    "SEV-2: A critical service is degraded, production promotion is blocked, or rollback is time-sensitive.",
    "SEV-3: A single application or non-production deployment is blocked without broad customer impact.",
    "SEV-4: A warning, non-critical drift, or preventive configuration issue."
  ],
  symptoms: [
    "Application is OutOfSync and will not sync.",
    "Application is Synced but Degraded.",
    "Sync operation failed or remains Running for an unusually long time.",
    "ComparisonError or manifest generation error.",
    "Repository authentication, Git fetch, Helm dependency, or Kustomize build failure.",
    "Permission denied while applying a resource.",
    "Deployment rollout is stuck or pods are unavailable.",
    "Immutable field or resource already exists error.",
    "Prune operation fails or resources are unexpectedly retained.",
    "Application remains Progressing after resources appear healthy.",
    "Automated sync repeatedly retries or the application keeps becoming OutOfSync.",
    "Ingress, service, DNS, storage, or application health fails after a successful sync."
  ],
  safetyChecks: [
    "Confirm Argo CD application name, project, destination cluster, namespace, Git repository, target revision, and environment.",
    "Record the current Git commit, last successful sync revision, operation state, and application health before changing anything.",
    "Check whether the affected application is managed by ApplicationSet, an app-of-apps pattern, or another controller.",
    "Identify automated sync, prune, selfHeal, sync waves, hooks, and deletion finalizers before attempting recovery.",
    "Do not disable selfHeal, enable prune, force replace, delete resources, or change ownership annotations as a first response.",
    "Do not run sync repeatedly while the underlying error remains unidentified.",
    "Check whether a production approval or change freeze applies.",
    "Protect Kubernetes Secret data, repository credentials, tokens, and private keys from logs.",
    "Use read-only diagnosis first. For write actions, verify the exact destination and blast radius.",
    "A Git revert is not always a complete rollback when database migrations, external resources, or irreversible hooks have already run."
  ],
  diagnosticWorkflow: [
    {
      id: "1",
      title: "Establish application status and incident impact",
      objective: "Determine the affected application, cluster, revision, and customer impact.",
      commands: [
        "argocd app get <app-name>",
        "argocd app history <app-name>",
        "kubectl config current-context",
        "kubectl get applications -n argocd"
      ],
      interpretResults: [
        "OutOfSync indicates a difference between desired and live state; it does not alone prove an outage.",
        "Degraded indicates at least one health problem according to Argo CD's health assessment.",
        "ComparisonError means Argo CD could not reliably compare desired and live state.",
        "An operation failure can be distinct from the current sync status.",
        "Confirm the application destination before running any mutating command."
      ],
      nextDecision: "If customer traffic is impacted, follow incident severity and mitigation procedures in parallel with diagnosis. Otherwise begin with the first failing Argo CD operation or resource.",
      safetyNote: "CLI access and command flags vary by Argo CD version and RBAC configuration."
    },
    {
      id: "2",
      title: "Capture the failed operation and resource-level conditions",
      objective: "Find the first failing resource instead of treating the entire application as one error.",
      commands: [
        "argocd app get <app-name> --show-operation",
        "argocd app resources <app-name>",
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
        "kubectl get pods -n <namespace> -o wide"
      ],
      interpretResults: [
        "A specific resource may have failed even if other resources synchronized successfully.",
        "Failed scheduling, image pulls, admission denial, mount errors, and readiness failures occur at different layers.",
        "Events are time-limited and may no longer contain the original cause; retain central event and controller logs.",
        "Check the operation's exact error before retrying."
      ],
      nextDecision: "Classify the first failure as source generation, repository, sync/apply, controller health, workload runtime, or application/networking."
    },
    {
      id: "3",
      title: "Verify Git revision and desired source",
      objective: "Prove which source configuration Argo CD is attempting to deploy.",
      commands: [
        "argocd app get <app-name>",
        "git log -n 10 --oneline",
        "git diff <last-good-commit>..HEAD",
        "git status --short"
      ],
      interpretResults: [
        "The configured target revision may be a branch, tag, or commit; establish which commit was actually resolved.",
        "A successful local test against a different commit does not validate the deployed source.",
        "A values file, overlay, chart version, or path change can alter the generated manifests.",
        "A mutable branch can move after approval unless the release process pins an immutable revision."
      ],
      nextDecision: "Compare the resolved revision and application source settings with the approved release artifact. Correct the source only after confirming the intended release."
    },
    {
      id: "4",
      title: "Diagnose manifest generation and repository failures",
      objective: "Separate Git connectivity from Helm, Kustomize, plugin, and manifest errors.",
      commands: [
        "argocd app manifests <app-name>",
        "argocd repo list",
        "argocd app get <app-name>",
        "helm lint ./chart",
        "kustomize build <overlay-path>"
      ],
      interpretResults: [
        "If manifests cannot be generated, the problem is upstream of Kubernetes apply.",
        "Repository failures can be caused by credentials, DNS, TLS certificates, network egress, or repository availability.",
        "Helm or Kustomize may behave differently inside the repo-server image than on a developer workstation.",
        "Custom config-management plugins may need their own logs and runtime dependencies inspected."
      ],
      nextDecision: "Reproduce with the same source revision and repo-server toolchain. Repair credentials or generation inputs without exposing secrets.",
      safetyNote: "Repository listings and diagnostic output may reveal private repository names or internal URLs."
    },
    {
      id: "5",
      title: "Inspect Argo CD controller and repo-server health",
      objective: "Determine whether a platform component is causing failures across multiple applications.",
      commands: [
        "kubectl get pods -n argocd",
        "kubectl get events -n argocd --sort-by=.metadata.creationTimestamp",
        "kubectl logs -n argocd deploy/argocd-application-controller --since=30m",
        "kubectl logs -n argocd deploy/argocd-repo-server --since=30m"
      ],
      interpretResults: [
        "Controller errors affecting many applications suggest a platform-level issue rather than an individual chart defect.",
        "Repo-server errors can point to Git, TLS, credential, plugin, or manifest-generation problems.",
        "Resource names and workload types may differ in HA or customized installations; inspect actual deployments before using logs commands.",
        "A restarted pod may have lost the logs needed to diagnose the initial failure."
      ],
      nextDecision: "If several unrelated apps fail at the same time, investigate shared Argo CD services, repository access, network, resource pressure, and recent platform changes before editing each application."
    },
    {
      id: "6",
      title: "Check Kubernetes authorization and admission",
      objective: "Identify whether the API server is rejecting Argo CD's operation.",
      commands: [
        "kubectl auth can-i get deployments -n <namespace>",
        "kubectl auth can-i patch deployments -n <namespace>",
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
        "kubectl describe <resource-type> <resource-name> -n <namespace>"
      ],
      interpretResults: [
        "Permission errors indicate the identity performing the operation lacks required access or is restricted by policy.",
        "Admission webhooks, Pod Security rules, quotas, and schema validation can reject otherwise generated manifests.",
        "The operator's kubectl permissions are not necessarily the same as the Argo CD controller's effective permissions.",
        "An auth check using your own kubeconfig proves only your identity's permissions."
      ],
      nextDecision: "Use the approved method to verify the Argo CD service account or impersonated identity. Grant only the missing least-privilege permission after review.",
      safetyNote: "Do not broaden cluster-admin permissions to resolve a single namespace-level error."
    },
    {
      id: "7",
      title: "Inspect the workload rollout",
      objective: "Determine why a successfully applied Deployment is not becoming available.",
      commands: [
        "kubectl rollout status deployment/<deployment-name> -n <namespace> --timeout=120s",
        "kubectl describe deployment <deployment-name> -n <namespace>",
        "kubectl get rs,pods -n <namespace> -o wide",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl logs <pod-name> -n <namespace> --all-containers=true --tail=200",
        "kubectl logs <pod-name> -n <namespace> --previous"
      ],
      interpretResults: [
        "ProgressDeadlineExceeded often indicates a rollout failed to make progress; inspect ReplicaSets, events, and pod conditions for the actual cause.",
        "ImagePullBackOff suggests image reference, registry credentials, or network problems.",
        "CrashLoopBackOff indicates repeated container exits; inspect current and previous logs and termination status.",
        "Pending pods can indicate resource shortage, affinity, taints, PVC binding, or scheduling constraints.",
        "Readiness probe failures prevent pods from becoming available even if the container process is running."
      ],
      nextDecision: "Fix the evidenced workload-level issue. A green Argo CD sync alone is not sufficient to declare recovery."
    },
    {
      id: "8",
      title: "Check services, ingress, DNS, and dependencies",
      objective: "Investigate cases where pods run but the application remains unreachable.",
      commands: [
        "kubectl get svc,endpoints,endpointslices -n <namespace>",
        "kubectl get ingress -n <namespace>",
        "kubectl describe ingress <ingress-name> -n <namespace>",
        "kubectl get networkpolicy -n <namespace>",
        "kubectl get pods -n <namespace> -o wide"
      ],
      interpretResults: [
        "Empty endpoints can mean pods are not ready or Service selectors do not match pod labels.",
        "Ingress errors may originate from controller configuration, TLS, DNS, backend port mismatch, or unhealthy endpoints.",
        "Network policies can block traffic even when workloads are healthy.",
        "A healthy pod does not prove that a database, external API, DNS service, or authentication provider is reachable."
      ],
      nextDecision: "Test connectivity from the correct network boundary and correlate ingress/controller logs with application logs and service-level metrics."
    },
    {
      id: "9",
      title: "Investigate OutOfSync, drift, and repeated sync loops",
      objective: "Identify why desired and live state continue to differ.",
      commands: [
        "argocd app diff <app-name>",
        "argocd app get <app-name>",
        "kubectl get <resource-type> <resource-name> -n <namespace> -o yaml"
      ],
      interpretResults: [
        "Differences may be caused by a manual edit, another controller, mutating admission, defaulted fields, generated values, or an incorrect ignore-differences rule.",
        "selfHeal may repeatedly reapply desired state when live changes are detected.",
        "A broad ignoreDifferences rule can hide important configuration drift.",
        "A controller-managed field should not be forcefully managed by GitOps without understanding field ownership."
      ],
      nextDecision: "Decide whether Git should own the field, another controller should own it, or a narrowly scoped ignore rule is justified. Review the diff before syncing."
    },
    {
      id: "10",
      title: "Resolve ordering, hooks, and CRD dependencies",
      objective: "Diagnose resources that fail because prerequisites are not ready.",
      commands: [
        "argocd app get <app-name> --show-operation",
        "kubectl get crd",
        "kubectl get jobs -n <namespace>",
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp"
      ],
      interpretResults: [
        "A custom resource may fail if its CRD has not been installed or established.",
        "A hook Job can fail because of image, RBAC, scheduling, timeout, or application-specific errors.",
        "Sync waves order resources but do not guarantee that every external dependency is healthy.",
        "Hooks and migrations can have side effects; repeating them blindly may duplicate work."
      ],
      nextDecision: "Verify prerequisite readiness and hook semantics, then correct ordering or health checks with an explicit retry/rollback plan."
    },
    {
      id: "11",
      title: "Review resource replacement, pruning, and ownership",
      objective: "Prevent data loss or disruption while correcting resource conflicts.",
      commands: [
        "argocd app diff <app-name>",
        "kubectl get <resource-type> <resource-name> -n <namespace> -o yaml",
        "kubectl get pvc -n <namespace>",
        "kubectl get pv"
      ],
      interpretResults: [
        "Immutable field changes may require a controlled replacement, but deleting and recreating a resource can cause downtime or data loss.",
        "Prune removes resources that are no longer in desired state when pruning is enabled and the operation permits it.",
        "PVCs, persistent data, and externally managed resources need special handling.",
        "Existing resources may have ownership expectations or labels that differ from the desired manifests."
      ],
      nextDecision: "Review the exact resource diff, dependencies, data retention requirements, and ownership before approving replace or prune."
    },
    {
      id: "12",
      title: "Recover and validate the service",
      objective: "Return the application to a known-good state and prove service recovery.",
      commands: [
        "argocd app get <app-name>",
        "argocd app diff <app-name>",
        "kubectl rollout status deployment/<deployment-name> -n <namespace> --timeout=120s",
        "kubectl get pods,svc,endpoints -n <namespace>"
      ],
      interpretResults: [
        "A healthy Argo CD application should have the expected sync state and resource health.",
        "A successful rollout should be accompanied by healthy endpoints and successful application-level checks.",
        "Watch error rate, latency, saturation, logs, and synthetic checks during the post-deployment observation period.",
        "If impact increases, stop further changes and follow the approved mitigation or rollback process."
      ],
      nextDecision: "Close only after desired state, workload health, and critical user-facing flows have been verified. Record unresolved risks and follow-up actions.",
      safetyNote: "Run mutating sync or rollback commands only after verifying application, destination, revision, and change approval."
    }
  ],
  failureCases: [
    {
      symptom: "Application is OutOfSync immediately after sync",
      likelyCauses: [
        "A controller or admission webhook modifies live fields.",
        "A manual edit or external automation changes a Git-managed resource.",
        "Generated manifests differ due to values, plugin, or toolchain inputs.",
        "An overly broad or incorrect diff configuration obscures the real issue."
      ],
      proveTheCause: [
        "Run argocd app diff and inspect the exact resource and fields.",
        "Compare Git-generated manifests with live YAML.",
        "Identify the field manager or controller responsible for the live mutation where available."
      ],
      fix: [
        "Correct the source manifest if Git should own the field.",
        "Coordinate ownership with the external controller.",
        "Use a narrowly scoped ignore rule only when the field is intentionally externally managed."
      ],
      validate: [
        "Re-render manifests and review the diff.",
        "Sync through the approved process and verify the application remains stable."
      ],
      prevention: [
        "Define clear field ownership.",
        "Avoid manual production edits outside the GitOps process.",
        "Test ignoreDifferences rules."
      ]
    },
    {
      symptom: "Application is Synced but Degraded",
      likelyCauses: [
        "Deployment has unavailable replicas.",
        "Pods are crashing, pending, or failing probes.",
        "A custom resource health assessment reports a problem.",
        "The application depends on an unavailable external service."
      ],
      proveTheCause: [
        "Inspect resource-level health with argocd app get and argocd app resources.",
        "Run kubectl describe on the failing workload and pods.",
        "Review events, current and previous logs, and application metrics."
      ],
      fix: [
        "Fix the proven scheduling, image, configuration, probe, storage, or dependency problem.",
        "Use a reviewed forward fix or rollback if the release is causing user impact."
      ],
      validate: [
        "Verify rollout completion, pod readiness, healthy endpoints, and application-level requests.",
        "Check service-level indicators during the observation period."
      ],
      prevention: [
        "Use realistic health checks and resource requests.",
        "Add release smoke tests and service-level alerts.",
        "Test dependency failure scenarios."
      ]
    },
    {
      symptom: "ComparisonError or manifest generation failure",
      likelyCauses: [
        "Git repository unavailable or credentials invalid.",
        "Incorrect source path or target revision.",
        "Invalid Helm values, chart dependencies, or Kustomize configuration.",
        "Repo-server plugin or toolchain failure."
      ],
      proveTheCause: [
        "Inspect application source configuration and repo-server logs.",
        "Run argocd app manifests and capture the first generation error.",
        "Reproduce using the same immutable commit and toolchain."
      ],
      fix: [
        "Repair the repository path, credentials, certificate trust, or network access.",
        "Correct invalid chart or overlay configuration.",
        "Restore required dependencies and pin the toolchain."
      ],
      validate: [
        "Confirm manifests generate successfully from the intended revision.",
        "Review the diff before allowing a sync."
      ],
      prevention: [
        "Validate manifests in CI.",
        "Monitor repository and repo-server availability.",
        "Use immutable revisions for release candidates."
      ]
    },
    {
      symptom: "Sync fails with permission denied",
      likelyCauses: [
        "Argo CD controller identity lacks a required verb or resource permission.",
        "The destination namespace or cluster is incorrect.",
        "Kubernetes admission policy rejects the object.",
        "The application project restricts the destination or resource kind."
      ],
      proveTheCause: [
        "Capture the exact API error and resource kind.",
        "Inspect Argo CD project restrictions and destination settings.",
        "Verify effective controller permissions using the approved identity and method."
      ],
      fix: [
        "Grant the minimum required permissions after security review.",
        "Correct project allow/deny rules or destination configuration.",
        "Modify manifests to comply with admission policies where appropriate."
      ],
      validate: [
        "Repeat a controlled sync after the access or policy correction.",
        "Verify no broader permissions were granted than necessary."
      ],
      prevention: [
        "Manage RBAC and projects as reviewed code.",
        "Test least-privilege permissions.",
        "Alert on repeated permission failures."
      ]
    },
    {
      symptom: "Deployment remains Progressing or rollout times out",
      likelyCauses: [
        "Readiness probes fail.",
        "Image pull or application startup fails.",
        "Insufficient CPU or memory, scheduling constraints, or PVC issues.",
        "The application is waiting on a dependency or a hook."
      ],
      proveTheCause: [
        "Run kubectl rollout status and describe the Deployment.",
        "Inspect ReplicaSets, pod conditions, events, and logs.",
        "Check node capacity, PVC binding, probe configuration, and dependency health."
      ],
      fix: [
        "Correct the evidenced image, configuration, capacity, probe, or storage issue.",
        "Adjust rollout strategy or timeout only when the application's startup behavior justifies it.",
        "Use the approved rollback plan if service health is deteriorating."
      ],
      validate: [
        "Confirm desired replicas are available.",
        "Check endpoints and perform application smoke tests."
      ],
      prevention: [
        "Set realistic probes and resource requests.",
        "Test cold startup and dependency outages.",
        "Alert on rollout duration and unavailable replicas."
      ]
    },
    {
      symptom: "Resource apply fails because a field is immutable",
      likelyCauses: [
        "A change modifies an immutable field such as a selector.",
        "A resource was designed for replacement rather than in-place mutation.",
        "Desired manifests do not match the existing resource lifecycle."
      ],
      proveTheCause: [
        "Capture the API server's exact immutable-field error.",
        "Compare live and desired manifests.",
        "Assess dependencies, data retention, downtime, and ownership."
      ],
      fix: [
        "Prefer a compatible in-place change where possible.",
        "If replacement is necessary, use a reviewed migration plan with readiness gates and a rollback strategy.",
        "Never delete a production PVC or stateful resource simply to make sync succeed."
      ],
      validate: [
        "Test replacement in staging.",
        "Verify service continuity, data integrity, and recovery steps."
      ],
      prevention: [
        "Review immutable fields during CI diff checks.",
        "Design safe migration strategies for stateful resources."
      ]
    },
    {
      symptom: "Automated sync repeatedly applies changes or causes a sync loop",
      likelyCauses: [
        "selfHeal is correcting live drift.",
        "Another controller modifies the same fields.",
        "A generated manifest is nondeterministic.",
        "Automated sync or prune settings do not match the intended operating model."
      ],
      proveTheCause: [
        "Inspect sync policy and repeated operation history.",
        "Compare diffs over time and identify which fields change.",
        "Correlate changes with external controllers and deployment jobs."
      ],
      fix: [
        "Resolve competing ownership or nondeterministic rendering.",
        "Change sync policy only through approved configuration review.",
        "Avoid disabling selfHeal as a permanent substitute for fixing drift."
      ],
      validate: [
        "Observe several reconciliation cycles.",
        "Confirm the diff remains stable and no unexpected resources are removed."
      ],
      prevention: [
        "Define one owner per managed field.",
        "Make manifest generation deterministic.",
        "Monitor repeated sync attempts and unexpected pruning."
      ]
    },
    {
      symptom: "Sync hook or migration Job fails",
      likelyCauses: [
        "The Job cannot start, pull its image, or obtain permissions.",
        "A database migration fails or exceeds its timeout.",
        "A hook is retriggered or retained in an unexpected lifecycle state.",
        "The prerequisite service is not ready."
      ],
      proveTheCause: [
        "Inspect hook operation details, Job status, pod events, and logs.",
        "Confirm the migration's idempotency and side effects.",
        "Check the ordering and readiness of prerequisites."
      ],
      fix: [
        "Correct the actual Job, image, permissions, or dependency failure.",
        "Do not rerun a non-idempotent migration until its current state is known.",
        "Use the approved database recovery procedure if schema changes partially completed."
      ],
      validate: [
        "Confirm migration state and application compatibility.",
        "Verify the next deployment can complete without repeating unsafe side effects."
      ],
      prevention: [
        "Make migration operations idempotent where possible.",
        "Test failed and interrupted migration recovery.",
        "Set appropriate timeouts and observable completion conditions."
      ]
    },
    {
      symptom: "Prune or resource deletion fails",
      likelyCauses: [
        "Finalizers or dependent resources prevent deletion.",
        "The resource is protected or externally managed.",
        "The application source removed an object unintentionally.",
        "A storage or data-bearing resource is being pruned."
      ],
      proveTheCause: [
        "Inspect the diff, resource owner, finalizers, and dependencies.",
        "Confirm whether the deletion is intentional and whether data is involved.",
        "Check the exact API error and controller logs."
      ],
      fix: [
        "Restore the resource to desired state if deletion was unintended.",
        "Resolve finalizer or dependency problems through the owning controller's documented process.",
        "Obtain explicit approval for destructive changes."
      ],
      validate: [
        "Confirm the resource's intended lifecycle and dependent services.",
        "Verify application health and data retention after recovery."
      ],
      prevention: [
        "Review prune diffs.",
        "Protect critical data resources.",
        "Use separate lifecycle management for externally managed infrastructure."
      ]
    },
    {
      symptom: "Ingress or Service syncs successfully but traffic fails",
      likelyCauses: [
        "Service selector does not match ready pod labels.",
        "Target port or ingress backend port is wrong.",
        "Ingress controller, DNS, TLS, or network policy is misconfigured.",
        "Application process is running but not listening on the expected interface or port."
      ],
      proveTheCause: [
        "Inspect Services, EndpointSlices, Ingress, pod labels, and events.",
        "Correlate controller logs with DNS resolution and application request logs.",
        "Test connectivity from the correct network boundary."
      ],
      fix: [
        "Correct selector, port mapping, ingress route, TLS, DNS, or network policy based on evidence.",
        "Avoid exposing internal services publicly as a diagnostic shortcut."
      ],
      validate: [
        "Run approved in-cluster and external smoke tests.",
        "Verify HTTP status, latency, TLS, and application-level success."
      ],
      prevention: [
        "Add post-deployment smoke tests.",
        "Alert on endpoint loss, ingress errors, and service-level indicators."
      ]
    }
  ],
  productionIncidents: [
    {
      scenario: "Argo CD reports Synced, but users receive HTTP 502 after release.",
      impact: "Customer-facing requests fail even though desired manifests appear applied.",
      investigation: [
        "Record the deployment revision and start time of the HTTP errors.",
        "Check ingress/controller logs and the backend Service's EndpointSlices.",
        "Inspect Deployment rollout status, pod readiness, application logs, and listening ports.",
        "Determine whether the cause is empty endpoints, an incorrect target port, startup failure, or an upstream dependency."
      ],
      recovery: [
        "Apply the smallest fix that addresses the proven cause.",
        "If the new revision caused the outage, use the approved rollback or mitigation process.",
        "Verify external requests, endpoints, latency, error rate, and critical user flows."
      ],
      prevention: [
        "Add post-sync smoke tests and readiness gates.",
        "Alert on HTTP 5xx, endpoint loss, and rollout duration.",
        "Require service-level validation before marking the release complete."
      ]
    },
    {
      scenario: "A production Application remains OutOfSync and self-healing repeatedly overwrites a manual fix.",
      impact: "Repeated reconciliation creates operational confusion and may undo an emergency mitigation.",
      investigation: [
        "Capture the diff and identify the exact fields being reverted.",
        "Check selfHeal configuration and identify whether another controller owns the same fields.",
        "Establish whether the manual change was an approved emergency mitigation or unauthorized drift."
      ],
      recovery: [
        "Coordinate the desired state with the incident owner.",
        "Commit the approved permanent correction to Git or follow the documented temporary mitigation process.",
        "Avoid repeatedly editing the live object while self-healing is active.",
        "Verify the diff stabilizes after reconciliation."
      ],
      prevention: [
        "Define an emergency change workflow.",
        "Establish explicit field ownership and review ignore rules.",
        "Alert on repeated reconciliation and drift."
      ]
    },
    {
      scenario: "A release fails because a custom resource is applied before its CRD is available.",
      impact: "The application sync cannot complete; dependent workloads may remain unavailable.",
      investigation: [
        "Capture the API server error for the custom resource.",
        "Verify that the required CRD exists and is established.",
        "Inspect sync waves, hook behavior, and the CRD installation process.",
        "Confirm whether the CRD is managed by another application or platform team."
      ],
      recovery: [
        "Install or restore the prerequisite CRD using the approved ownership model.",
        "Wait for the API to become available before syncing dependent resources.",
        "Validate the custom resource and dependent workload health."
      ],
      prevention: [
        "Model CRD prerequisites and ownership explicitly.",
        "Test clean-cluster installation and upgrade paths.",
        "Avoid unmanaged duplicate ownership of shared CRDs."
      ]
    },
    {
      scenario: "Many Argo CD applications fail to refresh or generate manifests at the same time.",
      impact: "Multiple releases are blocked and incident scope may extend beyond one application.",
      investigation: [
        "Compare failure timestamps across affected applications.",
        "Inspect repo-server and application-controller health and logs.",
        "Check repository availability, credentials, certificates, DNS, network egress, and recent platform changes.",
        "Determine whether one repository or every repository is affected."
      ],
      recovery: [
        "Restore the shared dependency that has been proven faulty.",
        "Avoid changing individual application manifests if the common platform service is failing.",
        "Validate manifest generation and reconciliation on a small set of representative applications."
      ],
      prevention: [
        "Monitor repo-server/controller health and queue depth.",
        "Test repository connectivity and credential rotation.",
        "Document platform-level recovery and escalation."
      ]
    },
    {
      scenario: "A deployment is blocked by an immutable field change in a stateful workload.",
      impact: "The desired release cannot apply; an unsafe replacement could cause downtime or data loss.",
      investigation: [
        "Inspect the exact immutable-field error and live-versus-desired diff.",
        "Identify PVCs, data retention requirements, traffic routing, and dependent resources.",
        "Determine whether an in-place migration, parallel replacement, or rollback is feasible."
      ],
      recovery: [
        "Stop destructive retries and obtain change approval.",
        "Use a tested migration or replacement strategy with explicit data protection.",
        "Validate data integrity, workload readiness, and traffic before completing the change."
      ],
      prevention: [
        "Add immutable-field and destructive-change review to CI.",
        "Test stateful migrations and rollback limitations.",
        "Keep backup and restore procedures current."
      ]
    }
  ],
  recoveryRunbook: [
    "Declare severity, identify the application owner, and determine whether users are affected.",
    "Record the application name, destination cluster, namespace, source revision, last successful revision, and operation status.",
    "Capture the first failure and resource-level conditions before retrying.",
    "Classify the failure: source generation, repository access, sync/apply, authorization/admission, workload runtime, or networking/application.",
    "Use read-only commands to prove the root cause.",
    "Review the desired-versus-live diff and assess the blast radius of the proposed fix.",
    "Make the smallest reviewed correction in the correct source of truth.",
    "Run CI validation and inspect the rendered manifests.",
    "Perform the approved sync or recovery operation only after verifying destination and revision.",
    "Validate Argo CD sync state, resource health, rollout completion, endpoints, application requests, and service-level indicators.",
    "Use the approved rollback or mitigation plan if the service deteriorates.",
    "Write the incident timeline, root-cause evidence, recovery details, and preventive actions."
  ],
  preventionChecklist: [
    "Pin release revisions and use reviewed Git changes.",
    "Validate Helm and Kustomize output in CI.",
    "Use separate least-privilege projects and destination permissions.",
    "Define ownership for resources shared with operators and other controllers.",
    "Review pruning, self-healing, hooks, waves, and deletion finalizers.",
    "Test CRD installation, fresh-cluster installation, upgrades, and rollback.",
    "Use realistic readiness and liveness probes.",
    "Validate resource requests, limits, storage, ingress, DNS, and network policies.",
    "Alert on repeated sync failures, degraded health, rollout duration, and service-level errors.",
    "Keep immutable chart artifacts, release history, and tested recovery procedures.",
    "Add post-deployment smoke tests.",
    "Document non-idempotent jobs, database migrations, and irreversible side effects."
  ],
  ciPipelineChecks: [
    "Validate the intended source revision and application path.",
    "Run Helm lint/render or Kustomize build using pinned tool versions.",
    "Validate YAML, Kubernetes schemas, and policy requirements.",
    "Check for removed API versions and unsafe immutable-field changes.",
    "Review destructive diffs and prune candidates before production promotion.",
    "Use staged promotion and explicit approval for production.",
    "Run post-deployment rollout and application smoke tests.",
    "Publish release metadata without exposing credentials or secrets.",
    "Promote the same tested artifact or immutable Git revision.",
    "Retain logs, revision identifiers, and the last known good release reference."
  ],
  interviewQuestions: [
    {
      question: "What is the difference between OutOfSync and Degraded?",
      answer: "OutOfSync indicates desired and live state differ. Degraded indicates a health assessment reports a problem. An application can be Synced but Degraded, so both synchronization and runtime health must be checked."
    },
    {
      question: "Why can an Argo CD sync succeed while users still receive HTTP 502?",
      answer: "Sync success does not prove the application serves traffic. Check rollout health, readiness, Service selectors, EndpointSlices, target ports, ingress/controller logs, DNS, and application dependencies."
    },
    {
      question: "How do you troubleshoot ComparisonError?",
      answer: "Inspect the exact application source and revision, repository access, repo-server logs, and manifest generation. Reproduce with the same chart/overlay and toolchain before changing live resources."
    },
    {
      question: "What does selfHeal do, and how can it affect incident response?",
      answer: "When enabled for automated sync, self-healing can reconcile live drift back to desired state. An emergency manual edit may therefore be reverted. Coordinate the permanent correction through Git or the documented emergency procedure."
    },
    {
      question: "How do you troubleshoot a Deployment stuck in Progressing?",
      answer: "Inspect rollout status, Deployment conditions, ReplicaSets, pod events, image pulls, logs, probes, scheduling, storage, and dependencies. Fix the evidenced cause and verify available replicas and service-level health."
    },
    {
      question: "What is the risk of enabling prune?",
      answer: "Prune can remove live resources that no longer exist in desired state. Review the exact diff and ownership, especially for PVCs, stateful workloads, and externally managed resources."
    },
    {
      question: "How do you diagnose a CRD ordering issue?",
      answer: "Confirm the CRD exists and is established before applying its custom resources. Review sync waves, hook behavior, and ownership of the CRD, then test a clean installation."
    },
    {
      question: "How do you safely recover a production Argo CD deployment?",
      answer: "Establish impact and revision, capture evidence, prove the failure layer, review the diff and rollback risks, apply a reviewed correction, and validate resource health and user-facing service indicators."
    },
    {
      question: "Why should you avoid repeatedly clicking Sync during an incident?",
      answer: "Retries do not fix a persistent root cause and may repeat hooks, migrations, or destructive actions. Identify the failing resource and determine whether the operation is safe to retry first."
    },
    {
      question: "How do you troubleshoot many applications failing simultaneously?",
      answer: "Look for shared dependencies: repo-server, application-controller, Git availability, credentials, certificates, DNS, network, cluster access, or platform changes. A shared failure should be addressed centrally rather than patched separately in every app."
    }
  ],
  officialReferences: [
    {
      title: "Argo CD User Guide",
      url: "https://argo-cd.readthedocs.io/en/stable/user-guide/"
    },
    {
      title: "Argo CD Application Health",
      url: "https://argo-cd.readthedocs.io/en/stable/operator-manual/health/"
    },
    {
      title: "Argo CD Automated Sync Policy",
      url: "https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/"
    },
    {
      title: "Argo CD Diff Customization",
      url: "https://argo-cd.readthedocs.io/en/stable/user-guide/diffing/"
    },
    {
      title: "Argo CD Sync Phases and Waves",
      url: "https://argo-cd.readthedocs.io/en/stable/user-guide/sync-waves/"
    },
    {
      title: "Argo CD CLI Reference",
      url: "https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd/"
    }
  ]
};
