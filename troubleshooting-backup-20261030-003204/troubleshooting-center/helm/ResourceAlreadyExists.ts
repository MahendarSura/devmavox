
export interface ResourceAlreadyExistsDiagnosticStep {
  id: string;
  title: string;
  objective: string;
  commands: string[];
  interpretResults: string[];
  nextAction: string;
  risk: "low" | "medium" | "high";
}

export interface ResourceAlreadyExistsFailureCase {
  id: string;
  symptom: string;
  likelyCauses: string[];
  confirmWith: string[];
  fix: string[];
  validate: string[];
  prevention: string[];
}

export interface ResourceAlreadyExistsProductionIncident {
  scenario: string;
  impact: string;
  evidence: string[];
  investigation: string[];
  recovery: string[];
  closureCriteria: string[];
}

export interface ResourceAlreadyExistsGuide {
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
  diagnosticWorkflow: ResourceAlreadyExistsDiagnosticStep[];
  failureCases: ResourceAlreadyExistsFailureCase[];
  productionIncidents: ResourceAlreadyExistsProductionIncident[];
  commandReference: {
    command: string;
    purpose: string;
    caution: string;
  }[];
  recoveryRunbook: string[];
  ownershipDecisionGuide: string[];
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

export const resourceAlreadyExistsGuide: ResourceAlreadyExistsGuide = {
  title: "Helm Resource Already Exists — Production Troubleshooting Guide",
  slug: "resource-already-exists",
  category: "Helm / Kubernetes / Resource Ownership",

  overview: `
The Helm ResourceAlreadyExists failure occurs when a chart attempts to create
a Kubernetes object whose name and namespace are already occupied by an
existing object, or when a resource already exists at cluster scope.

Typical errors include:
- services "my-service" already exists
- configmaps "my-config" already exists
- secrets "my-secret" already exists
- customresourcedefinitions.apiextensions.k8s.io "widgets.example.com" already exists
- rendered manifests contain a resource that already exists
- resource exists and cannot be imported into the current release

The resource may have been created manually, by another Helm release,
by an operator, by Argo CD, by Terraform, by a previous failed installation,
or by a platform provisioning process.

The key distinction is that Kubernetes object existence and Helm release
ownership are separate concepts. Kubernetes can contain an object that Helm
does not manage. Helm may also refuse to adopt an existing object whose
ownership metadata does not match the current release.

Never assume the resource is safe to delete or adopt just because its name
matches the chart. First establish its identity, scope, owner, purpose,
dependencies, and production impact.
`,

  objectives: [
    "Understand why Helm cannot create an already-existing Kubernetes resource.",
    "Distinguish namespaced resources from cluster-scoped resources.",
    "Identify the resource's actual owner and lifecycle manager.",
    "Inspect Helm release metadata and Kubernetes labels and annotations.",
    "Diagnose collisions between Helm, Argo CD, operators, Terraform, and manual changes.",
    "Recover without accidental deletion, service interruption, or data loss.",
    "Understand when controlled adoption may be appropriate.",
    "Prevent resource naming collisions through CI validation and ownership policies."
  ],

  severityMatrix: [
    {
      severity: "SEV-1 / Critical",
      criteria:
        "An attempted cleanup or ownership change has affected critical production services, persistent storage, cluster-wide resources, or security controls.",
      response:
        "Stop further modifications, declare the incident, preserve evidence, identify the last known-good state, and involve the service/platform owner."
    },
    {
      severity: "SEV-2 / High",
      criteria:
        "A production release is blocked and an urgent deployment, recovery, or security fix cannot proceed.",
      response:
        "Pause conflicting deployments, identify the existing resource owner, and agree on a safe recovery path with the change owner."
    },
    {
      severity: "SEV-3 / Moderate",
      criteria:
        "A staging deployment or non-critical release fails because a resource name is already occupied.",
      response:
        "Collect resource metadata, compare release manifests, and correct the naming or ownership configuration."
    },
    {
      severity: "SEV-4 / Low",
      criteria:
        "A local rendering, test, or pre-deployment validation detects a naming collision before production changes occur.",
      response:
        "Fix the chart or test fixture and add a preventive CI check."
    }
  ],

  safetyChecks: [
    "Confirm the correct Kubernetes context, cluster, namespace, Helm release, and environment.",
    "Capture the exact error and identify the resource kind, name, API group, and namespace or cluster scope.",
    "Do not run kubectl delete simply to clear the error.",
    "Do not overwrite Helm labels or annotations until the actual resource owner is established.",
    "Check whether Helm, Argo CD, an operator, Terraform, or another pipeline manages the resource.",
    "Determine whether the resource contains persistent data or security-sensitive configuration.",
    "For PVCs, Secrets, CRDs, webhooks, RBAC objects, and cluster-scoped resources, require additional impact assessment.",
    "Check whether another deployment is currently creating or updating the same object.",
    "Preserve the resource YAML and Helm revision history before modifying anything.",
    "Redact Secret data, tokens, certificates, and credentials from logs and shared evidence.",
    "Confirm the production change approval and rollback strategy.",
    "Remember that deleting a Kubernetes object can trigger controller recreation, traffic interruption, or data loss.",
    "Remember that removing an object from Helm's release manifest does not automatically establish a safe ownership transfer.",
    "Do not use --force, manual Helm storage edits, or mass label changes as a first response."
  ],

  diagnosticWorkflow: [
    {
      id: "step-01",
      title: "Confirm incident scope and exact error",
      objective:
        "Identify the resource that collided and the environment in which the collision occurred.",
      commands: [
        "kubectl config current-context",
        "helm list -A",
        "helm status <release> -n <namespace>",
        "helm history <release> -n <namespace>"
      ],
      interpretResults: [
        "A context mismatch means the investigation may be targeting the wrong cluster.",
        "A failed first-time installation differs from an upgrade of an established release.",
        "A resource collision may affect only the deployment pipeline, or it may be part of a wider incident.",
        "A FAILED or pending Helm release does not by itself identify who owns the conflicting object."
      ],
      nextAction:
        "Record the pipeline run, timestamp, release name, namespace, resource kind, resource name, and complete error message.",
      risk: "low"
    },
    {
      id: "step-02",
      title: "Identify the exact Kubernetes object",
      objective:
        "Resolve the API resource type and determine whether the object is namespaced or cluster-scoped.",
      commands: [
        "kubectl api-resources",
        "kubectl get <resource-type> <resource-name> -n <namespace> -o yaml",
        "kubectl get <resource-type> <resource-name> -o yaml"
      ],
      interpretResults: [
        "The namespaced query is appropriate for namespaced objects such as Services, ConfigMaps, and Deployments.",
        "The command without a namespace may still use the current namespace for namespaced resources; it does not automatically prove cluster scope.",
        "Cluster-scoped objects such as CRDs and ClusterRoles do not belong to an application namespace.",
        "NotFound can mean the resource is absent, the resource type or namespace is wrong, or the current identity cannot see it."
      ],
      nextAction:
        "Resolve the exact API resource type with kubectl api-resources -o wide and use the correct scope for subsequent checks.",
      risk: "low"
    },
    {
      id: "step-03",
      title: "Capture resource metadata and current state",
      objective:
        "Preserve evidence of how the object is configured and which ownership clues it exposes.",
      commands: [
        "kubectl get <resource-type> <resource-name> -n <namespace> -o yaml",
        "kubectl describe <resource-type> <resource-name> -n <namespace>",
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp"
      ],
      interpretResults: [
        "Labels and annotations may identify a Helm release, Argo CD application, operator, or provisioning process.",
        "Managed fields can provide clues about which field managers updated an object, but they do not prove the complete lifecycle owner.",
        "Creation timestamps can help correlate the object with an earlier deployment.",
        "An object may have multiple field managers even though only one controller should own its lifecycle.",
        "Secret YAML can expose credentials or other sensitive values."
      ],
      nextAction:
        "Store a protected copy of the object's metadata and configuration, redact sensitive data, and record the current operational state.",
      risk: "low"
    },
    {
      id: "step-04",
      title: "Inspect Helm ownership metadata",
      objective:
        "Check whether the existing object is associated with the intended Helm release.",
      commands: [
        "kubectl get <resource-type> <resource-name> -n <namespace> -o jsonpath='{.metadata.labels.app\\.kubernetes\\.io/managed-by}'",
        "kubectl get <resource-type> <resource-name> -n <namespace> -o jsonpath='{.metadata.annotations.meta\\.helm\\.sh/release-name}'",
        "kubectl get <resource-type> <resource-name> -n <namespace> -o jsonpath='{.metadata.annotations.meta\\.helm\\.sh/release-namespace}'",
        "helm get manifest <release> -n <namespace>"
      ],
      interpretResults: [
        "Helm-managed resources commonly use app.kubernetes.io/managed-by=Helm.",
        "Helm ownership annotations commonly identify the release name and release namespace.",
        "Missing or mismatched metadata may explain an ownership conflict, but metadata alone is not sufficient to prove that adoption is safe.",
        "The resource may be listed in another release's manifest or be managed outside Helm entirely."
      ],
      nextAction:
        "Compare the live object's metadata with all relevant release manifests and identify the current lifecycle owner before changing ownership.",
      risk: "low"
    },
    {
      id: "step-05",
      title: "Search for other Helm releases using the resource",
      objective:
        "Find whether another release already declares the same object.",
      commands: [
        "helm list -A",
        "helm get manifest <candidate-release> -n <candidate-namespace>",
        "helm history <candidate-release> -n <candidate-namespace>",
        "helm status <candidate-release> -n <candidate-namespace>"
      ],
      interpretResults: [
        "The same object name can appear in different namespaces for namespaced resource kinds.",
        "Cluster-scoped resources are not isolated by namespace, so a collision can occur across releases in different namespaces.",
        "A resource can remain in the cluster after a previous failed installation or manual cleanup.",
        "Helm history can reveal a release that previously created the object."
      ],
      nextAction:
        "Inspect the candidate release manifests and confirm whether the object is actively required before proposing adoption, migration, or deletion.",
      risk: "low"
    },
    {
      id: "step-06",
      title: "Check Argo CD and other lifecycle managers",
      objective:
        "Identify whether another GitOps or infrastructure tool is reconciling the object.",
      commands: [
        "kubectl get applications.argoproj.io -A",
        "kubectl get <resource-type> <resource-name> -n <namespace> -o yaml",
        "kubectl get <resource-type> <resource-name> -n <namespace> --show-managed-fields -o yaml"
      ],
      interpretResults: [
        "An Argo CD Application may declare the object in its desired manifests.",
        "An operator may continuously recreate or reconcile a resource.",
        "Terraform or another infrastructure pipeline may own cluster-level resources.",
        "Managed fields provide evidence about field updates, but a field manager is not necessarily the authoritative lifecycle owner.",
        "If two controllers continuously reconcile the same resource, a manual fix may be overwritten."
      ],
      nextAction:
        "Identify the authoritative desired-state source and coordinate a single ownership plan before changing the resource.",
      risk: "medium"
    },
    {
      id: "step-07",
      title: "Compare the chart's rendered object with the live object",
      objective:
        "Determine whether the collision is caused by a name, namespace, scope, or configuration mismatch.",
      commands: [
        "helm lint ./<chart-directory>",
        "helm template <release> ./<chart-directory> -n <namespace> -f <values-file.yaml>",
        "helm get manifest <release> -n <namespace>",
        "kubectl get <resource-type> <resource-name> -n <namespace> -o yaml"
      ],
      interpretResults: [
        "A fixed resource name may collide when multiple releases install the same chart.",
        "A wrong namespace value may target an object belonging to another application.",
        "A chart may render a cluster-scoped object that another release already installed.",
        "A template may generate the same name for multiple components.",
        "A successful render does not guarantee the resource can be adopted or updated safely."
      ],
      nextAction:
        "Identify the exact rendered object and compare its identity and intended configuration with the live object.",
      risk: "low"
    },
    {
      id: "step-08",
      title: "Inspect release history and failed-install leftovers",
      objective:
        "Determine whether the collision came from a previous incomplete or interrupted operation.",
      commands: [
        "helm list -A --all",
        "helm history <release> -n <namespace>",
        "helm status <release> -n <namespace>",
        "kubectl get <resource-type> <resource-name> -n <namespace> -o yaml"
      ],
      interpretResults: [
        "A previous installation may have created some resources before a later step failed.",
        "A failed release may still have associated resources or hook side effects.",
        "An absent Helm release does not prove that its former resources were deleted.",
        "A release history record and the current live object must be investigated separately."
      ],
      nextAction:
        "Establish whether the existing object is a legitimate leftover, an actively used resource, or a resource owned by another system.",
      risk: "low"
    },
    {
      id: "step-09",
      title: "Check for naming collisions in multi-environment deployments",
      objective:
        "Determine whether multiple releases or pipeline runs are generating the same object name.",
      commands: [
        "helm template <release> ./<chart-directory> -n <namespace> -f <values-file.yaml>",
        "git diff --",
        "helm list -A"
      ],
      interpretResults: [
        "A shared fixed name for a ServiceAccount, Secret, ConfigMap, or cluster-scoped resource can collide.",
        "Two concurrent pipeline runs may attempt to create the same resource.",
        "Different release names do not isolate cluster-scoped resources.",
        "A release-specific suffix can solve some namespaced collisions but may be inappropriate for shared infrastructure."
      ],
      nextAction:
        "Decide whether the object should be unique per release or intentionally shared and managed by a separate owner.",
      risk: "low"
    },
    {
      id: "step-10",
      title: "Evaluate adoption and migration options",
      objective:
        "Choose an ownership strategy that preserves existing behavior and avoids data loss.",
      commands: [
        "helm upgrade --help",
        "helm show values ./<chart-directory>",
        "helm template <release> ./<chart-directory> -n <namespace> -f <values-file.yaml>"
      ],
      interpretResults: [
        "Helm versions that support --take-ownership may allow Helm to take ownership of existing resources, bypassing some ownership checks.",
        "That flag does not prove the object is compatible with the chart or safe to transfer.",
        "Ownership changes can conflict with Argo CD, operators, or other lifecycle managers.",
        "A naming change or separate platform-managed release may be safer than adopting a shared object."
      ],
      nextAction:
        "Document the current owner, target owner, compatibility checks, approval, rollback plan, and post-change validation before making any ownership change.",
      risk: "high"
    },
    {
      id: "step-11",
      title: "Execute the approved recovery plan",
      objective:
        "Resolve the collision without disrupting unrelated applications.",
      commands: [
        "helm history <release> -n <namespace>",
        "helm status <release> -n <namespace>",
        "kubectl get <resource-type> <resource-name> -n <namespace> -o yaml"
      ],
      interpretResults: [
        "If the object belongs to another active application, the new chart should not simply take it over.",
        "If the object is obsolete, verify that no consumer or controller still depends on it.",
        "If the object is shared infrastructure, separate its lifecycle from the application release when appropriate.",
        "If controlled adoption is approved, confirm that the chart's desired configuration is compatible with the existing object."
      ],
      nextAction:
        "Apply only the approved naming, ownership, migration, or cleanup change. Record the exact action and avoid broad deletion commands.",
      risk: "high"
    },
    {
      id: "step-12",
      title: "Validate the release and its consumers",
      objective:
        "Confirm that the release completed and that existing applications remain healthy.",
      commands: [
        "helm status <release> -n <namespace>",
        "helm history <release> -n <namespace>",
        "kubectl get deployments,pods,services -n <namespace>",
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp"
      ],
      interpretResults: [
        "Helm success does not independently prove application health.",
        "Existing consumers may fail if a shared ServiceAccount, Secret, ConfigMap, or other resource changed.",
        "Cluster-scoped changes may affect workloads in multiple namespaces.",
        "A successful upgrade must be followed by rollout and application validation."
      ],
      nextAction:
        "Run the service smoke tests, verify dependencies and existing consumers, review logs and metrics, and document the final ownership state.",
      risk: "medium"
    }
  ],

  failureCases: [
    {
      id: "case-01",
      symptom: "Service already exists",
      likelyCauses: [
        "A previous release created a Service with the same name.",
        "The Service was created manually or by GitOps.",
        "The chart uses a fixed Service name across releases.",
        "A previous failed installation left the Service behind."
      ],
      confirmWith: [
        "kubectl get service <service> -n <namespace> -o yaml",
        "helm list -A",
        "helm get manifest <candidate-release> -n <candidate-namespace>",
        "helm template <release> ./<chart-directory> -n <namespace> -f <values-file.yaml>"
      ],
      fix: [
        "Confirm whether the Service is actively serving traffic.",
        "If it belongs to another application, choose a distinct name or retain its current owner.",
        "If it is intended to be shared, manage it through a clearly defined shared-resource lifecycle.",
        "Consider controlled adoption only after compatibility and ownership approval."
      ],
      validate: [
        "Confirm Service selectors and ports.",
        "Verify endpoints and ready backend Pods.",
        "Run HTTP smoke tests.",
        "Check that the original application remains healthy."
      ],
      prevention: [
        "Use release-aware naming for per-application Services.",
        "Test chart installation more than once in CI.",
        "Document shared Services and their lifecycle owner."
      ]
    },
    {
      id: "case-02",
      symptom: "ConfigMap or Secret already exists",
      likelyCauses: [
        "Another release or external secret controller owns the object.",
        "A resource is intentionally shared.",
        "A previous installation created it.",
        "The chart generates a name already used by another environment or application."
      ],
      confirmWith: [
        "kubectl get configmap <name> -n <namespace> -o yaml",
        "kubectl get secret <name> -n <namespace> -o jsonpath='{.metadata.labels}'",
        "helm get manifest <release> -n <namespace>",
        "kubectl get externalsecrets -n <namespace>"
      ],
      fix: [
        "Determine whether the Secret is managed by External Secrets Operator, a secret manager integration, or another owner.",
        "Avoid printing Secret data in logs.",
        "Use a unique name for release-specific configuration.",
        "For intentionally shared configuration, define one authoritative owner and update process."
      ],
      validate: [
        "Confirm Pods reference the intended object.",
        "Verify the expected configuration is loaded without exposing its contents.",
        "Check application startup and dependency connectivity."
      ],
      prevention: [
        "Use a dedicated secret-management process.",
        "Avoid creating duplicate Secret ownership in application charts.",
        "Validate expected resource names and external secret dependencies before deployment."
      ]
    },
    {
      id: "case-03",
      symptom: "ServiceAccount already exists",
      likelyCauses: [
        "A platform team created a shared ServiceAccount.",
        "Another release manages the identity.",
        "The chart uses a fixed ServiceAccount name.",
        "IAM role or workload identity annotations differ from the intended configuration."
      ],
      confirmWith: [
        "kubectl get serviceaccount <serviceaccount> -n <namespace> -o yaml",
        "kubectl get rolebindings,clusterrolebindings -A",
        "helm get manifest <release> -n <namespace>"
      ],
      fix: [
        "Confirm the ServiceAccount's consumers and identity configuration.",
        "Use the intended existing ServiceAccount only if its permissions and identity are correct.",
        "Otherwise create a release-specific identity through the approved process.",
        "Do not overwrite workload identity annotations or RBAC configuration without review."
      ],
      validate: [
        "Verify the Pod uses the intended ServiceAccount.",
        "Test required permissions using least-privilege checks.",
        "Confirm cloud identity or workload identity works as expected."
      ],
      prevention: [
        "Document ServiceAccount ownership.",
        "Separate platform identity provisioning from application release lifecycle.",
        "Test RBAC and identity configuration in CI."
      ]
    },
    {
      id: "case-04",
      symptom: "ClusterRole or ClusterRoleBinding already exists",
      likelyCauses: [
        "A cluster-wide resource is shared across namespaces.",
        "Another Helm release owns the resource.",
        "A platform chart or operator created it.",
        "Multiple installations use the same fixed name."
      ],
      confirmWith: [
        "kubectl get clusterrole <name> -o yaml",
        "kubectl get clusterrolebinding <name> -o yaml",
        "helm list -A",
        "helm get manifest <candidate-release> -n <candidate-namespace>"
      ],
      fix: [
        "Confirm the permissions granted and every binding or consumer.",
        "Keep shared cluster-level resources in one authoritative platform release where appropriate.",
        "Use a unique resource name when independent installations are intended.",
        "Require security review before modifying permissions or ownership."
      ],
      validate: [
        "Check the resulting rules and subjects.",
        "Test the required access with kubectl auth can-i.",
        "Verify existing workloads and controllers still function."
      ],
      prevention: [
        "Document cluster-scoped resource ownership.",
        "Avoid duplicate RBAC definitions in application charts.",
        "Add policy checks for cluster-scoped objects."
      ]
    },
    {
      id: "case-05",
      symptom: "CustomResourceDefinition already exists",
      likelyCauses: [
        "A different operator installation created the CRD.",
        "The CRD is intentionally shared across namespaces.",
        "Another chart version owns the CRD lifecycle.",
        "The new chart is attempting to manage a CRD that should be installed separately."
      ],
      confirmWith: [
        "kubectl get crd <crd-name> -o yaml",
        "kubectl get crd",
        "kubectl api-resources",
        "helm list -A"
      ],
      fix: [
        "Identify the operator and CRD lifecycle owner.",
        "Check version compatibility and existing custom resources.",
        "Use the vendor's documented CRD upgrade procedure.",
        "Do not delete the CRD as a shortcut; deletion may remove associated custom resources."
      ],
      validate: [
        "Verify the CRD is established.",
        "Check the served and storage versions.",
        "Verify the operator reconciles existing custom resources."
      ],
      prevention: [
        "Manage CRDs as platform prerequisites where appropriate.",
        "Version CRDs and operators deliberately.",
        "Test fresh installation and upgrade paths."
      ]
    },
    {
      id: "case-06",
      symptom: "Helm refuses an existing object because ownership metadata does not match",
      likelyCauses: [
        "The object belongs to another Helm release.",
        "The resource was created manually.",
        "The object is managed by GitOps or an operator.",
        "The release name or namespace changed."
      ],
      confirmWith: [
        "kubectl get <resource-type> <resource-name> -n <namespace> -o yaml",
        "helm list -A",
        "helm get manifest <candidate-release> -n <candidate-namespace>",
        "helm history <candidate-release> -n <candidate-namespace>"
      ],
      fix: [
        "Establish the authoritative owner before changing metadata.",
        "Prefer correcting the resource name or ownership architecture when the object belongs to another active application.",
        "Use a supported adoption workflow only after a reviewed ownership transfer.",
        "Do not assume adding Helm annotations is sufficient to make the transfer safe."
      ],
      validate: [
        "Verify the object is managed by the intended release.",
        "Confirm competing controllers no longer fight over the resource.",
        "Verify live configuration, dependent workloads, and release history."
      ],
      prevention: [
        "Define a single lifecycle owner for each object.",
        "Keep release names and namespaces stable where possible.",
        "Review resource ownership when migrating between Helm and GitOps."
      ]
    },
    {
      id: "case-07",
      symptom: "A resource remains after a failed Helm installation",
      likelyCauses: [
        "The install created some resources before another resource failed.",
        "A hook created a resource with independent lifecycle behavior.",
        "A resource has retention or deletion policies.",
        "A controller recreated the object after it was removed."
      ],
      confirmWith: [
        "helm list -A --all",
        "helm history <release> -n <namespace>",
        "kubectl get <resource-type> <resource-name> -n <namespace> -o yaml",
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp"
      ],
      fix: [
        "Determine which resources the failed installation created and whether they are still used.",
        "Inspect hooks and external side effects.",
        "Remove only confirmed obsolete resources under an approved cleanup plan.",
        "If the release is still valid, prefer a deliberate recovery operation over manually deleting everything."
      ],
      validate: [
        "Confirm the expected release state.",
        "Verify remaining resources are intentionally managed.",
        "Ensure no controllers are continuously recreating unwanted objects."
      ],
      prevention: [
        "Test install and failure-cleanup paths.",
        "Document hook behavior and resource retention policies.",
        "Add ownership checks to deployment automation."
      ]
    },
    {
      id: "case-08",
      symptom: "Two Helm releases collide on the same fixed resource name",
      likelyCauses: [
        "The chart hardcodes a resource name.",
        "Multiple environments share a namespace.",
        "A release-name template helper is not used.",
        "A cluster-scoped resource is defined by multiple releases."
      ],
      confirmWith: [
        "helm template <release-a> ./<chart-directory> -n <namespace>",
        "helm template <release-b> ./<chart-directory> -n <namespace>",
        "helm list -A"
      ],
      fix: [
        "Use a release-aware name for independent application resources.",
        "For shared cluster-scoped resources, define a separate platform owner.",
        "Check dependent resources before changing the name.",
        "Plan a migration if changing the resource name affects traffic or persistent state."
      ],
      validate: [
        "Render both releases and compare resource identities.",
        "Verify independent releases can coexist.",
        "Confirm services and workloads resolve the intended resource."
      ],
      prevention: [
        "Add multi-release chart tests.",
        "Validate rendered resource identity in CI.",
        "Document which objects are intentionally shared."
      ]
    },
    {
      id: "case-09",
      symptom: "Argo CD and Helm repeatedly overwrite each other's changes",
      likelyCauses: [
        "Both systems are attempting to manage the same object.",
        "Helm is used to deploy a chart that Argo CD also reconciles.",
        "Live edits are overwritten by the GitOps controller.",
        "The resource has multiple desired-state sources."
      ],
      confirmWith: [
        "kubectl get applications.argoproj.io -A",
        "kubectl get <resource-type> <resource-name> -n <namespace> -o yaml",
        "kubectl get <resource-type> <resource-name> -n <namespace> --show-managed-fields -o yaml"
      ],
      fix: [
        "Identify whether Argo CD or the Helm pipeline is the intended release manager.",
        "Choose one authoritative desired-state workflow.",
        "Migrate ownership through a documented process.",
        "Do not repeatedly patch live objects if a controller will immediately revert them."
      ],
      validate: [
        "Observe reconciliation after the change.",
        "Confirm the intended desired state remains stable.",
        "Verify both application health and GitOps sync status."
      ],
      prevention: [
        "Define ownership boundaries between CI and GitOps.",
        "Avoid independent deployment paths to the same release.",
        "Monitor repeated reconciliation drift."
      ]
    },
    {
      id: "case-10",
      symptom: "ResourceAlreadyExists occurs intermittently during parallel pipeline runs",
      likelyCauses: [
        "Two runs deploy the same release at the same time.",
        "Both runs attempt to create the same shared object.",
        "The pipeline lacks a concurrency lock.",
        "A previous run is still active."
      ],
      confirmWith: [
        "helm list -A",
        "helm history <release> -n <namespace>",
        "Review pipeline run timestamps and concurrency logs.",
        "kubectl get <resource-type> <resource-name> -n <namespace> -o yaml"
      ],
      fix: [
        "Stop duplicate deployment attempts.",
        "Serialize deployments by environment and release.",
        "Reassess the release and object state before rerunning.",
        "Avoid deleting the object to resolve a race condition."
      ],
      validate: [
        "Confirm only one deployment operation is active.",
        "Verify the final release revision and resource state.",
        "Repeat the deployment in a controlled test."
      ],
      prevention: [
        "Configure CI concurrency controls.",
        "Use deployment locks with clear failure recovery.",
        "Make pipeline retries state-aware."
      ]
    },
    {
      id: "case-11",
      symptom: "ResourceAlreadyExists occurs for a PersistentVolumeClaim",
      likelyCauses: [
        "A previous release created the PVC.",
        "The PVC is intentionally retained.",
        "A different workload uses the claim.",
        "The chart generates a duplicate claim name."
      ],
      confirmWith: [
        "kubectl get pvc <pvc-name> -n <namespace> -o yaml",
        "kubectl describe pvc <pvc-name> -n <namespace>",
        "kubectl get pods -n <namespace> -o wide",
        "kubectl get pv"
      ],
      fix: [
        "Identify the PVC's bound volume and all workloads using it.",
        "Confirm retention and backup policies.",
        "Use the intended existing claim only if the data and access mode are correct.",
        "Never delete a PVC simply to allow a Helm installation to proceed."
      ],
      validate: [
        "Confirm the claim remains bound as expected.",
        "Verify the workload mounts the correct volume.",
        "Validate application data integrity and read/write behavior."
      ],
      prevention: [
        "Document persistent storage ownership.",
        "Use deliberate PVC naming and retention policies.",
        "Test reinstall and recovery procedures with persistent data."
      ]
    },
    {
      id: "case-12",
      symptom: "ResourceAlreadyExists occurs for a webhook configuration",
      likelyCauses: [
        "Another controller installation created the webhook.",
        "Two operator versions use the same webhook name.",
        "The webhook configuration is shared cluster-wide.",
        "A stale configuration remains after an incomplete uninstall."
      ],
      confirmWith: [
        "kubectl get validatingwebhookconfigurations",
        "kubectl get mutatingwebhookconfigurations",
        "kubectl get validatingwebhookconfiguration <name> -o yaml",
        "kubectl get mutatingwebhookconfiguration <name> -o yaml"
      ],
      fix: [
        "Identify the webhook service, operator, and affected API operations.",
        "Review failurePolicy, rules, service references, and TLS configuration.",
        "Coordinate operator migration or controlled cleanup with the platform owner.",
        "Do not delete a production webhook without assessing admission impact."
      ],
      validate: [
        "Verify the webhook service and certificate are healthy.",
        "Test expected admission behavior.",
        "Confirm normal resource creation and updates work."
      ],
      prevention: [
        "Document cluster-wide webhook ownership.",
        "Test operator upgrade and uninstall paths.",
        "Alert on admission webhook failures."
      ]
    },
    {
      id: "case-13",
      symptom: "ResourceAlreadyExists appears after changing release name or namespace",
      likelyCauses: [
        "The new release name points to resources created by the old release.",
        "A namespace migration is being treated as a fresh installation.",
        "Cluster-scoped resources remain shared across namespaces.",
        "The migration plan omitted existing dependencies."
      ],
      confirmWith: [
        "helm list -A",
        "helm history <old-release> -n <old-namespace>",
        "helm get manifest <old-release> -n <old-namespace>",
        "kubectl get <resource-type> <resource-name> -n <namespace> -o yaml"
      ],
      fix: [
        "Create a migration plan for the old and new release.",
        "Separate namespaced-resource migration from cluster-scoped-resource ownership.",
        "Verify traffic, storage, identity, and dependent workloads.",
        "Avoid uninstalling the old release until its resource deletion and retention behavior is understood."
      ],
      validate: [
        "Confirm the new release manages the intended objects.",
        "Verify the old application no longer requires transferred resources.",
        "Check traffic, data, and dependent services."
      ],
      prevention: [
        "Document release identity and namespace migration procedures.",
        "Test migration in a non-production cluster.",
        "Define cluster-wide resource ownership separately."
      ]
    },
    {
      id: "case-14",
      symptom: "Helm install fails because a manually created resource already exists",
      likelyCauses: [
        "An operator created the object outside Helm.",
        "A previous engineer created the resource manually.",
        "The chart overlaps with a platform provisioning process.",
        "The chart's expected resource differs from the live object."
      ],
      confirmWith: [
        "kubectl get <resource-type> <resource-name> -n <namespace> -o yaml",
        "kubectl get <resource-type> <resource-name> -n <namespace> --show-managed-fields -o yaml",
        "helm template <release> ./<chart-directory> -n <namespace>"
      ],
      fix: [
        "Identify why the manual object exists and who depends on it.",
        "Compare its configuration with the chart's desired state.",
        "Choose a supported adoption or migration plan only after review.",
        "If it should remain externally managed, configure the chart and architecture so both systems do not compete."
      ],
      validate: [
        "Verify the final owner is explicit.",
        "Check live configuration against the approved desired state.",
        "Run application smoke tests and monitor for reconciliation drift."
      ],
      prevention: [
        "Prefer declarative infrastructure management.",
        "Document manual emergency changes.",
        "Reconcile emergency changes back into the authoritative source."
      ]
    },
    {
      id: "case-15",
      symptom: "Helm reports an existing resource, but the resource is not visible in the expected namespace",
      likelyCauses: [
        "The resource is cluster-scoped.",
        "The command is using the wrong Kubernetes context.",
        "The object belongs to another namespace.",
        "The resource kind or API group was misidentified.",
        "The deployment identity lacks permission to view the object."
      ],
      confirmWith: [
        "kubectl config current-context",
        "kubectl api-resources -o wide",
        "kubectl get <resource-type> -A",
        "kubectl auth can-i get <resource-type> -n <namespace>"
      ],
      fix: [
        "Verify the target context and the exact API resource.",
        "Use cluster-scoped queries for cluster-scoped resources.",
        "Use the correct namespace for namespaced resources.",
        "Request authorized read access if needed."
      ],
      validate: [
        "Repeat the query against the confirmed context and scope.",
        "Verify the object's identity and owner before changing anything."
      ],
      prevention: [
        "Log context, namespace, release, and resource scope in CI.",
        "Add preflight environment validation.",
        "Use explicit namespace flags in deployment commands."
      ]
    }
  ],

  productionIncidents: [
    {
      scenario:
        "A production Helm release fails because a Service named api-service already exists.",
      impact:
        "The deployment pipeline is blocked. The existing Service may be serving production traffic, and deleting or replacing it could interrupt customer requests.",
      evidence: [
        "Pipeline logs and exact Helm error.",
        "Kubernetes context, namespace, release name, and timestamp.",
        "Service YAML, labels, annotations, selectors, ports, and endpoints.",
        "Helm history and manifests for candidate releases.",
        "Argo CD Applications and relevant controller ownership.",
        "Current application error rate and traffic."
      ],
      investigation: [
        "Pause further deployments to the affected release.",
        "Confirm context and namespace.",
        "Inspect the existing Service and its endpoints.",
        "Check Helm ownership metadata and release manifests.",
        "Determine whether another application or GitOps controller manages the Service.",
        "Render the intended chart and compare the Service definition.",
        "Identify whether the collision is a duplicate name or an intended shared Service."
      ],
      recovery: [
        "If the Service belongs to another application, retain its ownership and correct the new chart's naming or architecture.",
        "If it is a shared Service, define a single lifecycle owner and avoid duplicate management.",
        "If adoption is required, obtain approval and verify compatibility before transferring ownership.",
        "Perform a controlled upgrade and verify the Service endpoints and application behavior."
      ],
      closureCriteria: [
        "The release is in the expected state.",
        "The Service has the intended selectors, ports, and healthy endpoints.",
        "Existing consumers remain healthy.",
        "Production traffic and application smoke tests succeed.",
        "The ownership decision is documented."
      ]
    },
    {
      scenario:
        "A cluster-wide CRD already exists when a second Helm release is installed in another namespace.",
      impact:
        "The new installation is blocked. Deleting the CRD may affect every application using that custom resource type across the cluster.",
      evidence: [
        "CRD YAML and served/storage versions.",
        "Custom resources using the CRD.",
        "Operator installation and release history.",
        "Chart manifests and CRD lifecycle documentation.",
        "Current operator and custom-resource health."
      ],
      investigation: [
        "Confirm that the CRD is cluster-scoped.",
        "Identify the operator and release that installed it.",
        "List the relevant custom resources and inspect their health.",
        "Check whether the new release requires the same or a compatible CRD version.",
        "Review the vendor's documented CRD lifecycle procedure."
      ],
      recovery: [
        "Keep the existing CRD if it is valid and compatible.",
        "Separate CRD provisioning from the application release if the architecture requires shared ownership.",
        "Upgrade CRDs only through the documented procedure.",
        "Never delete the CRD as a quick way to clear the installation error."
      ],
      closureCriteria: [
        "The intended operator and CRD versions are compatible.",
        "Existing custom resources remain available.",
        "The operator continues reconciling resources.",
        "The new application release deploys successfully."
      ]
    },
    {
      scenario:
        "A pipeline fails because a Secret already exists and the team considers deleting it.",
      impact:
        "Deleting the Secret could break running workloads, remove externally managed credentials, or trigger an outage.",
      evidence: [
        "Secret metadata and ownership annotations.",
        "Pod and Deployment references to the Secret.",
        "External Secrets or secret-manager controller configuration.",
        "Helm release manifests and pipeline values.",
        "Application authentication errors and recent credential rotation history."
      ],
      investigation: [
        "Identify all workloads referencing the Secret.",
        "Determine whether the Secret is externally managed.",
        "Compare metadata and the intended chart configuration without printing its data.",
        "Verify whether the new release requires a distinct Secret or should reference the existing one."
      ],
      recovery: [
        "Retain the existing Secret if another system owns it.",
        "Correct the chart to reference the approved secret-management workflow.",
        "If a rotation is needed, follow the approved rotation process and coordinate application restarts.",
        "Never publish Secret values in pipeline logs."
      ],
      closureCriteria: [
        "The intended Secret reference is configured.",
        "Application authentication succeeds.",
        "No sensitive values were exposed.",
        "The resource's lifecycle owner is documented."
      ]
    },
    {
      scenario:
        "Two parallel deployment pipelines attempt to create the same Kubernetes object.",
      impact:
        "One deployment may fail while the other is creating or modifying the object. Retrying without state checks can cause repeated collisions or unexpected release state.",
      evidence: [
        "Pipeline run IDs and timestamps.",
        "Helm release history and status.",
        "Resource creation timestamp and metadata.",
        "Deployment concurrency settings.",
        "The chart and values used by both runs."
      ],
      investigation: [
        "Identify all active deployment runs for the release and environment.",
        "Confirm whether the resource is shared or release-specific.",
        "Inspect the final release and object state after the competing operations.",
        "Check whether a previous run remains active or was interrupted."
      ],
      recovery: [
        "Stop duplicate deployment attempts.",
        "Serialize deployments by environment and release.",
        "Reassess release history and live resource state.",
        "Run one controlled deployment after confirming the correct desired state."
      ],
      closureCriteria: [
        "Only one deployment operation is active.",
        "The expected release revision is healthy.",
        "The object has one clearly defined lifecycle owner.",
        "Pipeline concurrency controls are tested."
      ]
    }
  ],

  commandReference: [
    {
      command: "kubectl config current-context",
      purpose: "Confirm which Kubernetes context is active.",
      caution: "Do not continue with resource changes until the target environment is confirmed."
    },
    {
      command: "kubectl api-resources -o wide",
      purpose: "Identify resource names, API groups, and scope.",
      caution: "Use the correct API resource type when querying the existing object."
    },
    {
      command: "kubectl get <resource-type> <name> -n <namespace> -o yaml",
      purpose: "Inspect a namespaced resource and its metadata.",
      caution: "YAML may contain sensitive configuration, especially for Secrets."
    },
    {
      command: "kubectl get <resource-type> <name> -o yaml",
      purpose: "Inspect a cluster-scoped resource when the resource type is cluster-scoped.",
      caution: "Omitting -n does not prove a resource is cluster-scoped."
    },
    {
      command: "kubectl get <resource-type> <name> -n <namespace> --show-managed-fields -o yaml",
      purpose: "Inspect managedFields to help investigate field management.",
      caution: "Field managers provide clues but do not independently establish lifecycle ownership."
    },
    {
      command: "helm list -A --all",
      purpose: "Inspect Helm releases across namespaces, including supported non-deployed states.",
      caution: "A resource may remain even if its former release is no longer listed."
    },
    {
      command: "helm history <release> -n <namespace>",
      purpose: "Inspect release revision history.",
      caution: "Use the exact release and namespace associated with the incident."
    },
    {
      command: "helm get manifest <release> -n <namespace>",
      purpose: "Inspect resources recorded in a release manifest.",
      caution: "It is not a complete inventory of every external or controller-created resource."
    },
    {
      command: "helm template <release> ./<chart-directory> -n <namespace> -f <values-file.yaml>",
      purpose: "Render the intended chart and values.",
      caution: "Rendering does not prove that an existing resource can safely be adopted."
    },
    {
      command: "kubectl auth can-i get <resource-type> -n <namespace>",
      purpose: "Check whether the current identity is authorized to perform a selected operation.",
      caution: "Run relevant checks with the deployment identity; a single permission check does not prove all required access."
    },
    {
      command: "kubectl get applications.argoproj.io -A",
      purpose: "Inspect Argo CD Applications when the CRD is installed and the identity has access.",
      caution: "An Application listing alone does not prove ownership of every resource."
    },
    {
      command: "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
      purpose: "Inspect events that may explain resource creation or reconciliation behavior.",
      caution: "Events may expire and may not contain the complete incident history."
    }
  ],

  recoveryRunbook: [
    "1. Declare the incident and pause conflicting deployment attempts.",
    "2. Confirm context, cluster, namespace, release, and resource scope.",
    "3. Capture the exact error and identify the resource kind, name, and API group.",
    "4. Save the live object metadata and relevant Helm release history.",
    "5. Determine whether the object is namespaced or cluster-scoped.",
    "6. Inspect labels, annotations, managed fields, creation time, and consumers.",
    "7. Check candidate Helm releases, Argo CD Applications, operators, Terraform, and manual provisioning records.",
    "8. Render the intended chart and compare the object identity and configuration.",
    "9. Decide whether the object should remain externally managed, become release-specific, or be transferred through an approved ownership migration.",
    "10. Obtain the required production approval.",
    "11. Apply only the minimal, reviewed correction.",
    "12. Run the Helm operation once the desired state and ownership are clear.",
    "13. Verify Helm status, release history, workloads, endpoints, and application smoke tests.",
    "14. Confirm other consumers of shared resources remain healthy.",
    "15. Record root cause, recovery action, final owner, and preventive tasks."
  ],

  ownershipDecisionGuide: [
    "Question 1: Is the object used by an existing production application? If yes, do not delete it merely to clear the error.",
    "Question 2: Is the object cluster-scoped? If yes, investigate every relevant namespace and consumer.",
    "Question 3: Is it managed by another Helm release, Argo CD, an operator, Terraform, or a secret-management controller? If yes, coordinate with that owner.",
    "Question 4: Should the object be unique to this release? If yes, consider a release-aware name and migrate references carefully.",
    "Question 5: Is the object intentionally shared? If yes, define one authoritative lifecycle owner and make other charts consume it without independently managing it.",
    "Question 6: Is controlled adoption required? Verify compatibility, permissions, dependencies, ownership metadata, approval, and rollback limitations first.",
    "Question 7: Is the object truly obsolete? Confirm that no workloads, controllers, or external systems depend on it before any approved cleanup.",
    "Important: Kubernetes labels, Helm annotations, and managedFields are useful evidence, but no single metadata field proves that deleting or adopting a resource is safe."
  ],

  validationChecklist: [
    "Correct cluster, context, namespace, and release confirmed.",
    "Exact conflicting resource and its scope identified.",
    "Existing object metadata preserved.",
    "Current lifecycle owner identified.",
    "Consumers and dependencies checked.",
    "Helm release history and manifest reviewed.",
    "Argo CD, operator, Terraform, or external-secret ownership checked where relevant.",
    "The final ownership and naming strategy approved.",
    "No unintended resource deletion or credential exposure occurred.",
    "Helm release completed in the expected state.",
    "Workloads, Services, endpoints, and application smoke tests are healthy.",
    "Shared and cluster-scoped resource consumers remain healthy.",
    "The incident report and preventive actions are recorded."
  ],

  preventionChecklist: [
    "Define one authoritative lifecycle owner per Kubernetes object.",
    "Separate shared platform resources from application-specific resources.",
    "Use release-aware naming for resources that must be unique per release.",
    "Document cluster-scoped resource ownership.",
    "Test repeated chart installation in CI.",
    "Render charts with representative environment values.",
    "Detect duplicate resource identities in rendered manifests.",
    "Serialize pipelines targeting the same release.",
    "Keep release names, namespaces, and chart versions explicit.",
    "Document adoption, migration, and uninstall procedures.",
    "Test failed-install cleanup and retained-resource behavior.",
    "Protect PVCs, Secrets, CRDs, webhooks, and cluster-wide RBAC resources from casual cleanup.",
    "Reconcile emergency manual changes into the authoritative source.",
    "Monitor repeated reconciliation drift and deployment collisions.",
    "Maintain an approved rollback and recovery runbook."
  ],

  monitoringAndAlerting: [
    "Alert on repeated Helm install or upgrade failures.",
    "Track ResourceAlreadyExists errors by resource kind, release, namespace, and environment.",
    "Monitor failed release revisions and repeated pending states.",
    "Alert on unexpected recreation or changes to critical shared resources.",
    "Monitor Argo CD sync failures and persistent reconciliation drift.",
    "Monitor operator errors and failed reconciliation loops.",
    "Alert on production endpoint loss or increased HTTP 5xx rates after a release.",
    "Monitor PVC and workload health after any approved ownership migration.",
    "Include pipeline run ID, chart version, Git SHA, release, namespace, and resource identity in logs.",
    "Redact Secrets, credentials, and sensitive rendered manifests from alerts.",
    "Assign an owner and response runbook to each production alert."
  ],

  cicdIntegration: [
    "Step 1: Verify the repository path, Git commit, target environment, and Kubernetes context.",
    "Step 2: Pin the Helm version and chart artifact.",
    "Step 3: Run helm lint and render the chart with the exact environment values.",
    "Step 4: Extract rendered resource identities: API group, kind, namespace, and name.",
    "Step 5: Detect duplicate identities within the same rendered release.",
    "Step 6: Flag unexpected cluster-scoped resources for review.",
    "Step 7: Where authorized, compare target resource identities with existing cluster resources.",
    "Step 8: Treat existing-resource collisions as an investigation requirement, not an automatic deletion instruction.",
    "Step 9: Check approved ownership and shared-resource declarations.",
    "Step 10: Serialize deployments targeting the same release.",
    "Step 11: Require approval for adoption, cluster-wide changes, or destructive cleanup.",
    "Step 12: Execute the approved Helm operation.",
    "Step 13: Verify release status, rollout health, endpoints, and application smoke tests.",
    "Step 14: Publish a redacted report with release metadata and validation results.",
    "Step 15: Stop promotion if ownership or resource identity remains ambiguous."
  ],

  incidentReportTemplate: [
    "Incident ID:",
    "Service and Helm release:",
    "Environment and namespace:",
    "Incident start and end time:",
    "Severity and customer impact:",
    "Pipeline run ID:",
    "Git SHA and chart version:",
    "Exact ResourceAlreadyExists error:",
    "Resource kind, API group, name, and scope:",
    "Resource creation timestamp:",
    "Existing labels and annotations:",
    "Current lifecycle owner:",
    "Related Helm release or Argo CD Application:",
    "Other controllers or provisioning tools involved:",
    "Evidence collected:",
    "Confirmed root cause:",
    "Ownership or naming decision:",
    "Approval and recovery operation:",
    "Post-recovery validation:",
    "Impact on existing consumers:",
    "Preventive actions, owners, and due dates:"
  ],

  handsOnLabs: [
    {
      title: "Lab 1 — Duplicate Service name",
      objective: "Reproduce and diagnose a namespaced resource collision.",
      steps: [
        "Create a disposable Kubernetes namespace.",
        "Create a test Service in that namespace.",
        "Create a test Helm chart that tries to create a Service with the same name.",
        "Run helm template and inspect the rendered Service identity.",
        "Attempt the installation only in the disposable environment.",
        "Inspect the error and live Service metadata.",
        "Correct the test chart's naming strategy and repeat."
      ],
      expectedLearning:
        "A name collision should be solved through resource identity and ownership analysis, not blind deletion."
    },
    {
      title: "Lab 2 — Cluster-scoped CRD collision",
      objective: "Understand why namespace isolation does not prevent cluster-scoped collisions.",
      steps: [
        "Use a disposable cluster.",
        "Install a test CRD using the documented test procedure.",
        "Attempt a second test release that declares the same CRD.",
        "Inspect the CRD and both release manifests.",
        "Review the documented CRD lifecycle strategy.",
        "Repeat using a design with one authoritative CRD owner."
      ],
      expectedLearning:
        "Cluster-scoped resources require cluster-wide ownership planning."
    },
    {
      title: "Lab 3 — Helm ownership metadata",
      objective: "Learn to inspect ownership evidence without changing production metadata.",
      steps: [
        "Create a disposable test resource.",
        "Inspect its labels, annotations, and managed fields.",
        "Compare its metadata with a test Helm release manifest.",
        "Identify what the metadata proves and what remains uncertain.",
        "Document a safe ownership decision without changing a production object."
      ],
      expectedLearning:
        "Metadata helps investigate ownership but does not independently prove safe adoption."
    },
    {
      title: "Lab 4 — Simulated competing deployment managers",
      objective: "Understand why live changes can be overwritten by a reconciler.",
      steps: [
        "Use a disposable cluster with a test GitOps application.",
        "Observe the desired and live resource configuration.",
        "Make a controlled test-only change and observe reconciliation.",
        "Inspect the application sync state and resource metadata.",
        "Choose one authoritative desired-state workflow for the test."
      ],
      expectedLearning:
        "Repeated live patching is not a durable fix when another controller owns reconciliation."
    },
    {
      title: "Lab 5 — Duplicate release names",
      objective: "Test resource naming across independent Helm releases.",
      steps: [
        "Render a chart using two release names.",
        "Compare API group, kind, namespace, and object name.",
        "Identify fixed names and cluster-scoped resources.",
        "Update the test chart to use release-aware naming where appropriate.",
        "Render both releases again and compare identities."
      ],
      expectedLearning:
        "Resource identity testing can detect collisions before deployment."
    }
  ],

  interviewQuestions: [
    {
      question: "What does ResourceAlreadyExists mean in Helm?",
      answer:
        "Helm or Kubernetes encountered an object with the same identity as a resource the release attempted to create. The existing object may belong to another release, controller, or provisioning process."
    },
    {
      question: "What is the first thing you do when a production resource already exists?",
      answer:
        "Confirm the context and namespace, identify the exact object and scope, preserve its metadata, inspect release history, and determine its lifecycle owner before changing anything."
    },
    {
      question: "Does a matching resource name mean that the existing object belongs to the new Helm release?",
      answer:
        "No. Kubernetes object identity is based on the API resource identity and scope, while Helm release ownership is separate."
    },
    {
      question: "How do you inspect Helm ownership metadata?",
      answer:
        "Inspect app.kubernetes.io/managed-by and Helm release annotations, then compare the object with release manifests and other controllers. Metadata is evidence, not complete proof of safe ownership."
    },
    {
      question: "Why can resources collide across different namespaces?",
      answer:
        "Namespaced resources are scoped to their namespaces, but cluster-scoped resources such as CRDs and ClusterRoles are shared across the cluster."
    },
    {
      question: "Should you delete an existing Service to fix the error?",
      answer:
        "Not automatically. First identify its owner, traffic, endpoints, and consumers. Deletion may interrupt an application or trigger controller recreation."
    },
    {
      question: "What happens when two Helm releases declare the same CRD?",
      answer:
        "They may collide because the CRD is cluster-scoped. CRD lifecycle should be managed through a documented platform or operator process."
    },
    {
      question: "Can a failed Helm installation leave resources behind?",
      answer:
        "Yes. Depending on the failure stage, hooks, cleanup behavior, and resource policies, objects or external side effects may remain."
    },
    {
      question: "What is Helm resource adoption?",
      answer:
        "It is a controlled process for making a release manage an existing resource. It requires compatibility checks, a clear owner, and a recovery plan."
    },
    {
      question: "Does --take-ownership make adoption safe?",
      answer:
        "No. On Helm versions that support it, the flag can bypass ownership checks and take ownership of existing resources. It does not verify that the resource is compatible or that other controllers will stop managing it."
    },
    {
      question: "How do you handle an existing Secret?",
      answer:
        "Identify whether Helm, an external secret controller, or another owner manages it. Avoid exposing its data and avoid deletion or adoption without an approved plan."
    },
    {
      question: "How can Argo CD conflict with Helm?",
      answer:
        "If both systems manage the same object, one may overwrite the other's changes. Define one authoritative desired-state workflow and migrate ownership deliberately."
    },
    {
      question: "What does managedFields tell you?",
      answer:
        "It provides information about field managers and field ownership. It does not independently identify the complete lifecycle owner of the resource."
    },
    {
      question: "How do you troubleshoot an intermittent resource collision?",
      answer:
        "Correlate pipeline timestamps, release history, resource metadata, and active runs. Add concurrency controls and avoid blindly deleting the object."
    },
    {
      question: "Why are PersistentVolumeClaims especially sensitive?",
      answer:
        "They can reference persistent data. Deletion or replacement may disrupt workloads or risk data loss, depending on storage and retention configuration."
    },
    {
      question: "How should a shared ServiceAccount be managed?",
      answer:
        "Define an authoritative owner, verify identity annotations and permissions, and let application releases reference it without independently competing to manage it."
    },
    {
      question: "How do you prevent duplicate resource names?",
      answer:
        "Use release-aware naming for independent resources, define explicit shared-resource ownership, test rendered resource identities, and serialize concurrent deployments."
    },
    {
      question: "What should you do when the object is not visible in the expected namespace?",
      answer:
        "Verify the context, API resource type, namespace, cluster scope, and read permissions. Do not assume the object does not exist."
    },
    {
      question: "How do you verify recovery after the collision is resolved?",
      answer:
        "Check Helm status and history, workload readiness, Service endpoints, application smoke tests, and the health of existing consumers."
    },
    {
      question: "What should a production postmortem include?",
      answer:
        "Include the exact error, object identity and scope, lifecycle owner, evidence, root cause, recovery decision, impact, validation results, and preventive actions."
    }
  ],

  officialReferences: [
    {
      title: "Helm Upgrade Command",
      url: "https://helm.sh/docs/helm/helm_upgrade/"
    },
    {
      title: "Helm Install Command",
      url: "https://helm.sh/docs/helm/helm_install/"
    },
    {
      title: "Helm Get Manifest Command",
      url: "https://helm.sh/docs/helm/helm_get_manifest/"
    },
    {
      title: "Helm History Command",
      url: "https://helm.sh/docs/helm/helm_history/"
    },
    {
      title: "Helm Chart Best Practices",
      url: "https://helm.sh/docs/chart_best_practices/"
    },
    {
      title: "Kubernetes Objects",
      url: "https://kubernetes.io/docs/concepts/overview/working-with-objects/"
    },
    {
      title: "Kubernetes Names",
      url: "https://kubernetes.io/docs/concepts/overview/working-with-objects/names/"
    },
    {
      title: "Kubernetes API Access Control",
      url: "https://kubernetes.io/docs/reference/access-authn-authz/authorization/"
    },
    {
      title: "Argo CD Documentation",
      url: "https://argo-cd.readthedocs.io/en/stable/"
    }
  ]
};
