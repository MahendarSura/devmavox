```typescript
/**
 * Argo CD Deployment Errors — Real Production Troubleshooting Guide
 *
 * Suggested path:
 * app/troubleshooting-center/argocd/DeploymentErrors.ts
 *
 * Purpose:
 * Teach DevOps engineers to investigate failed, unhealthy, stuck, or
 * unexpectedly synchronized Argo CD applications using evidence-driven
 * production troubleshooting.
 *
 * Safety:
 * - Begin with read-only diagnostics.
 * - Confirm the cluster, namespace, application, and environment.
 * - Do not blindly sync, prune, delete, force-push, or roll back.
 * - Follow production approval and change-management procedures.
 */

export interface DeploymentDiagnostic {
  title: string;
  purpose: string;
  command: string;
  expectedResult: string;
  failureMeaning: string;
  nextStep: string;
}

export interface DeploymentRootCause {
  cause: string;
  evidence: string[];
  investigation: string[];
  resolution: string[];
  verification: string[];
}

export interface DeploymentIncidentStage {
  stage: string;
  objective: string;
  actions: string[];
  exitCriteria: string[];
}

export interface DeploymentInterviewQuestion {
  question: string;
  answer: string;
}

export const deploymentErrorsGuide = {
  id: "argocd-deployment-errors",
  title: "Argo CD Deployment Errors",
  category: "Argo CD",
  difficulty: "Intermediate to Advanced",
  estimatedTime: "60–90 minutes",
  description:
    "Investigate failed GitOps deployments, unhealthy workloads, " +
    "sync failures, Helm rendering errors, and production rollout incidents.",

  learningObjectives: [
    "Understand Argo CD Application sync and health states.",
    "Trace a failed deployment from Git commit to Kubernetes workload.",
    "Distinguish Git, rendering, synchronization, scheduling, and runtime failures.",
    "Use Argo CD, Kubernetes, and container diagnostics in the correct order.",
    "Recover deployments safely without creating additional production incidents.",
    "Build preventive checks, alerts, runbooks, and incident reports.",
  ],

  prerequisites: [
    "Basic Git and GitHub knowledge.",
    "Basic Kubernetes Pods, Deployments, Services, and Namespaces.",
    "Familiarity with Helm charts and Kubernetes YAML.",
    "Access to an authorized Argo CD environment.",
    "Read-only permissions for initial troubleshooting.",
  ],

  overview: {
    definition:
      "Argo CD is a declarative GitOps continuous delivery tool for Kubernetes. " +
      "It compares the desired configuration in Git with the live Kubernetes " +
      "resources and reports differences. Depending on application settings and " +
      "permissions, it can synchronize changes from Git to the cluster.",

    whyDeploymentErrorsMatter: [
      "New application versions may not reach users.",
      "A failed rollout may leave an application partially updated.",
      "A successful sync does not guarantee that the application works.",
      "An unhealthy workload can cause elevated errors or downtime.",
      "Unexpected pruning or configuration changes can remove important resources.",
      "A Git commit can be valid while its application configuration is operationally wrong.",
    ],

    criticalConcept:
      "Argo CD synchronization status and Kubernetes application health are different. " +
      "An application may be Synced but Degraded, or OutOfSync while the currently " +
      "running application continues serving traffic.",

    applicationStates: [
      {
        state: "Synced",
        meaning:
          "The live resources match the desired configuration that Argo CD compares.",
        importantNote:
          "Synced does not mean that the application is healthy or user requests succeed.",
      },
      {
        state: "OutOfSync",
        meaning:
          "A difference exists between desired and live resources.",
        importantNote:
          "Investigate the diff before syncing. The difference may be expected, unsafe, or caused by another controller.",
      },
      {
        state: "Unknown",
        meaning:
          "Argo CD cannot reliably determine the synchronization state.",
        importantNote:
          "Investigate repository access, resource comparison, controller health, and API errors.",
      },
      {
        state: "Healthy",
        meaning:
          "Argo CD health assessment considers the application resources healthy.",
        importantNote:
          "Confirm application-level behavior and monitoring as well.",
      },
      {
        state: "Progressing",
        meaning:
          "One or more resources are still progressing toward their desired state.",
        importantNote:
          "Check rollout progress, scheduling, readiness, and resource events.",
      },
      {
        state: "Degraded",
        meaning:
          "A resource has failed or its health assessment indicates an unhealthy state.",
        importantNote:
          "Inspect the affected resource and identify the underlying Kubernetes failure.",
      },
      {
        state: "Missing",
        meaning:
          "An expected resource is absent from the live cluster.",
        importantNote:
          "Determine whether it was never created, failed during sync, or was deleted.",
      },
    ],
  },

  productionScenario: {
    title: "Incident: Production Deployment Stuck After a Git Merge",

    scenario:
      "A developer merges a release branch into the production GitOps repository. " +
      "Argo CD detects the commit, but the application does not reach the expected " +
      "version. The Application reports OutOfSync and Degraded. Several Pods are " +
      "restarting, and the deployment dashboard shows an incomplete rollout.",

    timeline: [
      {
        time: "T+00 min",
        event: "Deployment alert fires.",
        investigation:
          "Confirm the affected application, environment, release, and user impact.",
      },
      {
        time: "T+03 min",
        event: "Application status is inspected.",
        investigation:
          "Check sync status, health status, operation state, and recent sync errors.",
      },
      {
        time: "T+07 min",
        event: "The failed resource is identified.",
        investigation:
          "Inspect Deployment status, ReplicaSets, Pods, events, and container logs.",
      },
      {
        time: "T+12 min",
        event: "The deployment cause is isolated.",
        investigation:
          "Compare the desired image and configuration with live resources and runtime evidence.",
      },
      {
        time: "T+18 min",
        event: "An approved recovery is applied.",
        investigation:
          "Correct the Git source or use the approved rollback procedure, then monitor recovery.",
      },
      {
        time: "T+30 min",
        event: "Service recovery is verified.",
        investigation:
          "Confirm ready replicas, application health, service connectivity, and error rates.",
      },
    ],

    possibleCauses: [
      "The Git revision contains an invalid Kubernetes manifest.",
      "Helm rendering fails because a required value is missing.",
      "The container image tag does not exist in the registry.",
      "A readiness probe fails after the new image starts.",
      "The cluster lacks CPU or memory capacity.",
      "A required Secret or ConfigMap is missing.",
      "Argo CD lacks permission to create or update a resource.",
      "A webhook or admission policy rejects the resource.",
      "A CRD or dependent resource is missing.",
      "The Service selector no longer matches the Pods.",
    ],

    severityGuidance: [
      {
        level: "SEV-1 / Critical",
        condition:
          "A production deployment causes a major outage, broad customer impact, " +
          "data-integrity risk, or a critical service failure.",
        response:
          "Activate the incident process, assign an incident commander, protect " +
          "customer impact, and use the approved recovery plan.",
      },
      {
        level: "SEV-2 / High",
        condition:
          "A critical deployment is blocked or a significant user-facing feature is degraded.",
        response:
          "Assign an owner, assess the release risk, and prioritize a controlled recovery.",
      },
      {
        level: "SEV-3 / Moderate",
        condition:
          "A non-critical environment or service is affected with limited user impact.",
        response:
          "Investigate within the team SLA and prevent unsafe promotion to production.",
      },
      {
        level: "SEV-4 / Low",
        condition:
          "A development or test deployment has a recoverable issue without production impact.",
        response:
          "Collect evidence, correct the configuration, and add preventive validation.",
      },
    ],

    severityWarning:
      "Severity must be assigned according to the organization's incident policy, " +
      "actual customer impact, and business criticality. A deployment error alone " +
      "does not automatically determine incident severity.",
  },

  productionWorkflow: [
    {
      stage: "1. Detect and acknowledge",
      objective: "Understand what failed and when.",
      actions: [
        "Record the alert time, deployment time, application name, and environment.",
        "Identify the release commit and the last known healthy revision.",
        "Check whether the problem is ongoing or has already recovered.",
        "Assign an incident owner and communicate the current impact.",
      ],
      exitCriteria: [
        "The incident has an owner.",
        "The affected application and environment are known.",
        "The impact and incident timeline are documented.",
      ],
    },
    {
      stage: "2. Assess customer and service impact",
      objective: "Determine the scope before changing infrastructure.",
      actions: [
        "Check application availability, HTTP errors, latency, and request volume.",
        "Determine whether all users or only one region or feature is affected.",
        "Identify whether the old version is still serving traffic.",
        "Check whether the release changes database schemas, persistent data, or APIs.",
        "Determine whether other applications share the affected cluster or dependency.",
      ],
      exitCriteria: [
        "The affected services and users are identified.",
        "The risk of additional changes is understood.",
        "The incident response priority is agreed upon.",
      ],
    },
    {
      stage: "3. Perform safety checks",
      objective: "Prevent troubleshooting from affecting the wrong environment.",
      actions: [
        "Confirm the Argo CD server and application name.",
        "Confirm the Kubernetes context and namespace.",
        "Verify the repository URL, branch, target revision, and path.",
        "Check whether the Application is production, staging, or development.",
        "Check active deployment approvals and change freeze restrictions.",
        "Identify whether automated sync, self-heal, or pruning is enabled.",
        "Check whether another operator or pipeline is changing the same resources.",
      ],
      exitCriteria: [
        "The intended cluster and application are verified.",
        "The current desired revision is recorded.",
        "The recovery action is permitted by change-management policy.",
      ],
    },
    {
      stage: "4. Collect evidence",
      objective: "Build a reliable picture before changing anything.",
      actions: [
        "Capture Argo CD Application status and recent operation messages.",
        "Record the repository commit and manifest or Helm values diff.",
        "Capture Deployment, ReplicaSet, Pod, and Service state.",
        "Collect recent Kubernetes events and container logs.",
        "Record image tags or digests and configuration versions.",
        "Record timestamps and relevant monitoring graphs.",
        "Save evidence in the incident ticket without exposing credentials or Secret values.",
      ],
      exitCriteria: [
        "The failure is reproducible or its recent evidence is available.",
        "The failing layer is narrowed down.",
        "Sensitive information is not included in logs or tickets.",
      ],
    },
    {
      stage: "5. Run ordered diagnostics",
      objective: "Trace the release from Git to the running application.",
      actions: [
        "Inspect Argo CD sync and health status.",
        "Check whether the Git revision and source path are correct.",
        "Inspect rendering and synchronization errors.",
        "Inspect Deployment rollout and ReplicaSet status.",
        "Inspect Pod scheduling, events, container state, and logs.",
        "Check Service selectors, endpoints, probes, and network dependencies.",
        "Use the evidence to select the next diagnostic step rather than running every command blindly.",
      ],
      exitCriteria: [
        "A specific failed resource or configuration is identified.",
        "The observed evidence supports the proposed root cause.",
      ],
    },
    {
      stage: "6. Isolate the root cause",
      objective: "Distinguish symptoms from the actual failure.",
      actions: [
        "Separate Git/rendering problems from Kubernetes apply problems.",
        "Separate API authorization errors from admission-policy errors.",
        "Separate image-pull failures from application startup failures.",
        "Separate readiness failures from Service routing failures.",
        "Compare the desired configuration, live configuration, and known-good release.",
        "Check dependencies before concluding that a single Pod is the entire problem.",
      ],
      exitCriteria: [
        "The root cause has supporting evidence.",
        "Alternative explanations have been checked.",
        "The proposed correction addresses the actual cause.",
      ],
    },
    {
      stage: "7. Recover and verify",
      objective: "Restore service with the smallest safe change.",
      actions: [
        "Choose the approved configuration correction or rollback.",
        "Use a reviewed Git commit for Git-managed resources.",
        "Validate manifests and render templates before promotion.",
        "Run synchronization only after reviewing the expected diff.",
        "Monitor the rollout, readiness, service health, and user-facing metrics.",
        "Confirm that no unexpected resources were deleted or replaced.",
        "Record the recovery time and final release revision.",
      ],
      exitCriteria: [
        "The intended release is running.",
        "Readiness and service-level checks pass.",
        "Customer impact has ended or is explicitly documented.",
        "The incident owner approves closure.",
      ],
    },
    {
      stage: "8. Prevent recurrence",
      objective: "Make the same class of failure less likely.",
      actions: [
        "Add CI validation for manifests, Helm templates, and policies.",
        "Add deployment alerts based on health and rollout conditions.",
        "Document the failure signature and exact recovery procedure.",
        "Add progressive delivery or canary checks where appropriate.",
        "Review whether resource requests, probes, policies, and dependencies were adequate.",
        "Track action items with owners and due dates.",
      ],
      exitCriteria: [
        "The incident report is completed.",
        "Preventive actions have owners.",
        "Monitoring and runbook gaps are recorded.",
      ],
    },
  ] as DeploymentIncidentStage[],

  diagnosticCommands: [
    {
      title: "1. Confirm the current Kubernetes context",
      purpose:
        "Prevent commands from accidentally targeting the wrong cluster.",
      command: "kubectl config current-context",
      expectedResult:
        "The expected cluster context is displayed.",
      failureMeaning:
        "A missing or unexpected context means the current Kubernetes target is not yet verified.",
      nextStep:
        "Inspect available contexts and use the organization's approved context-selection procedure.",
    },
    {
      title: "2. Inspect the Argo CD Application",
      purpose:
        "Identify synchronization status, health, revision, and target namespace.",
      command:
        "argocd app get <app-name> --show-operation",
      expectedResult:
        "Application details, sync status, health status, source, destination, and operation information are shown.",
      failureMeaning:
        "A connection, authentication, or application lookup error may indicate the wrong Argo CD server, account, or application name.",
      nextStep:
        "Confirm the Argo CD server, authentication, and exact application name.",
    },
    {
      title: "3. Inspect application resources",
      purpose:
        "Find which resource is OutOfSync, Missing, or unhealthy.",
      command:
        "argocd app resources <app-name>",
      expectedResult:
        "The application's tracked resources and their statuses are displayed.",
      failureMeaning:
        "A failed resource can indicate a rendering, synchronization, Kubernetes, or health-assessment problem.",
      nextStep:
        "Identify the first failing resource and inspect it directly.",
    },
    {
      title: "4. Inspect the synchronization diff",
      purpose:
        "Understand what Argo CD wants to change before synchronizing.",
      command:
        "argocd app diff <app-name>",
      expectedResult:
        "Differences between desired and live resources are shown when a diff exists.",
      failureMeaning:
        "Unexpected image tags, replica counts, selectors, policies, or resource deletions can indicate a risky change.",
      nextStep:
        "Review the diff with the release owner. Do not sync blindly.",
    },
    {
      title: "5. Inspect recent application events",
      purpose:
        "Find scheduling, admission, image-pull, mount, and controller errors.",
      command:
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
      expectedResult:
        "Recent events are listed with reasons and messages.",
      failureMeaning:
        "Warnings such as FailedScheduling, FailedMount, FailedCreate, or BackOff identify possible failure areas.",
      nextStep:
        "Inspect the event for the affected resource and correlate it with Pod and Deployment status.",
    },
    {
      title: "6. Inspect Deployment status",
      purpose:
        "Check desired replicas, updated replicas, ready replicas, and rollout progress.",
      command:
        "kubectl get deployment <deployment-name> -n <namespace>",
      expectedResult:
        "The Deployment's READY, UP-TO-DATE, and AVAILABLE columns are displayed.",
      failureMeaning:
        "A gap between desired and ready replicas indicates that the rollout has not reached its intended state.",
      nextStep:
        "Inspect the Deployment description, ReplicaSets, and Pods.",
    },
    {
      title: "7. Inspect Deployment conditions",
      purpose:
        "Find rollout failure messages and stalled progress conditions.",
      command:
        "kubectl describe deployment <deployment-name> -n <namespace>",
      expectedResult:
        "Deployment conditions, events, replica information, and configuration are displayed.",
      failureMeaning:
        "ProgressDeadlineExceeded, failed ReplicaSet creation, or replica shortages point to different causes.",
      nextStep:
        "Use the condition message to select the next diagnostic branch.",
    },
    {
      title: "8. Inspect Pods",
      purpose:
        "Identify Pending, CrashLoopBackOff, ImagePullBackOff, or other abnormal states.",
      command:
        "kubectl get pods -n <namespace> -o wide",
      expectedResult:
        "Pod readiness, restart counts, node placement, and status are displayed.",
      failureMeaning:
        "A Pod status describes a symptom, not necessarily the root cause.",
      nextStep:
        "Describe the specific Pod and inspect its events and logs.",
    },
    {
      title: "9. Inspect a failing Pod",
      purpose:
        "Investigate scheduling, image pulls, mounts, probes, and container failures.",
      command:
        "kubectl describe pod <pod-name> -n <namespace>",
      expectedResult:
        "Pod conditions, container state, image information, and recent events are displayed.",
      failureMeaning:
        "FailedScheduling, FailedMount, ErrImagePull, or probe failures narrow the investigation.",
      nextStep:
        "Follow the diagnostic branch corresponding to the actual event.",
    },
    {
      title: "10. Read current container logs",
      purpose:
        "Inspect application startup errors and runtime failures.",
      command:
        "kubectl logs <pod-name> -n <namespace> --all-containers=true --tail=200 --timestamps",
      expectedResult:
        "Recent container logs are displayed for containers that provide logs.",
      failureMeaning:
        "Missing logs may indicate that the container has not started, logs are written elsewhere, or the wrong container was selected.",
      nextStep:
        "Inspect Pod status, container names, events, and the application's logging configuration.",
    },
    {
      title: "11. Read logs from the previous container instance",
      purpose:
        "Investigate the crash that occurred before a container restarted.",
      command:
        "kubectl logs <pod-name> -n <namespace> -c <container-name> --previous --timestamps",
      expectedResult:
        "Logs from the previous container instance are displayed if available.",
      failureMeaning:
        "No previous logs may mean the container has not restarted or the previous container logs are unavailable.",
      nextStep:
        "Check restart counts, termination state, exit code, and application startup configuration.",
    },
    {
      title: "12. Inspect ReplicaSets",
      purpose:
        "Determine which revision created the current Pods.",
      command:
        "kubectl get replicasets -n <namespace>",
      expectedResult:
        "ReplicaSets and their replica counts are listed.",
      failureMeaning:
        "An old ReplicaSet may still be serving while the new ReplicaSet cannot become ready.",
      nextStep:
        "Compare ReplicaSet revisions and the owning Deployment's rollout history.",
    },
    {
      title: "13. Inspect Service and endpoints",
      purpose:
        "Determine whether a Service selects ready application Pods.",
      command:
        "kubectl get service,endpoints -n <namespace>",
      expectedResult:
        "Services and, where applicable, endpoint information are displayed.",
      failureMeaning:
        "A Service with no usable endpoints may have selector mismatches or no ready matching Pods.",
      nextStep:
        "Compare Service selectors with Pod labels and inspect readiness.",
    },
    {
      title: "14. Inspect rollout history",
      purpose:
        "Review Deployment revisions before selecting a recovery strategy.",
      command:
        "kubectl rollout history deployment/<deployment-name> -n <namespace>",
      expectedResult:
        "Available rollout revisions are displayed.",
      failureMeaning:
        "Missing or limited history may make a Deployment rollback unavailable or incomplete.",
      nextStep:
        "Identify a known-good revision and review whether rollback is safe for the current application and data schema.",
    },
    {
      title: "15. Check rollout status",
      purpose:
        "Wait for a rollout and determine whether the Deployment reaches completion.",
      command:
        "kubectl rollout status deployment/<deployment-name> -n <namespace> --timeout=120s",
      expectedResult:
        "The command reports rollout completion if the Deployment becomes ready within the timeout.",
      failureMeaning:
        "A timeout indicates the rollout did not finish in the allotted time; it does not explain the cause by itself.",
      nextStep:
        "Inspect Deployment conditions, Pods, events, and readiness failures.",
    },
    {
      title: "16. Validate a Helm chart",
      purpose:
        "Detect template or values problems before deployment.",
      command:
        "helm lint <chart-path> -f <values-file>",
      expectedResult:
        "The chart passes lint checks or reports chart issues.",
      failureMeaning:
        "A lint failure may indicate invalid templates, missing metadata, or chart problems.",
      nextStep:
        "Correct the chart and then render it to inspect the generated Kubernetes manifests.",
    },
    {
      title: "17. Render Helm manifests",
      purpose:
        "Inspect the resources Helm generates from chart values.",
      command:
        "helm template <release-name> <chart-path> -f <values-file>",
      expectedResult:
        "Rendered Kubernetes YAML is printed.",
      failureMeaning:
        "Rendering errors can indicate invalid templates, absent required values, or incompatible chart configuration.",
      nextStep:
        "Compare the rendered resources with the intended environment configuration.",
    },
    {
      title: "18. Validate Kubernetes YAML",
      purpose:
        "Check whether the API server accepts a manifest without persisting the change.",
      command:
        "kubectl apply --dry-run=server -f <manifest-file>",
      expectedResult:
        "The API server validates the manifest without persisting it.",
      failureMeaning:
        "Schema, authorization, admission, or dependency errors may be reported.",
      nextStep:
        "Resolve the specific validation error. Remember that validation is not a guarantee that a rollout or application will succeed.",
    },
    {
      title: "19. Inspect Argo CD application details as JSON",
      purpose:
        "Capture structured status for incident analysis.",
      command:
        "argocd app get <app-name> -o json",
      expectedResult:
        "Application information is returned as JSON when supported by the installed CLI version.",
      failureMeaning:
        "An error can indicate authentication, application lookup, or client-version issues.",
      nextStep:
        "Capture the status, source, destination, and operation fields required for the incident report.",
    },
  ] as DeploymentDiagnostic[],

  diagnosticSafetyNotes: [
    "Replace every placeholder before running a command.",
    "Use an approved Kubernetes context and namespace.",
    "Confirm that the installed Argo CD CLI supports the selected command and flags.",
    "Some CLI output depends on the installed Argo CD version.",
    "The kubectl commands above are intended for diagnosis unless explicitly stated otherwise.",
    "Server-side dry-run does not guarantee that the application will start or become healthy.",
    "Do not paste Secret values, access tokens, private keys, or credentials into incident tickets.",
    "Avoid dumping entire production resource configurations into public logs.",
  ],

  rootCauseBranches: [
    {
      cause: "Incorrect Git repository, revision, or application path",
      evidence: [
        "The Application points to an unexpected repository, branch, tag, or directory.",
        "The expected commit is not present in the resolved revision.",
        "The application renders resources from an older directory or release branch.",
      ],
      investigation: [
        "Run argocd app get <app-name>.",
        "Confirm the repository URL, target revision, and path.",
        "Compare the resolved revision with the approved release commit.",
        "Review the Git commit history and relevant manifest changes.",
      ],
      resolution: [
        "Correct the source configuration through the approved GitOps workflow.",
        "Confirm the intended commit exists and the repository is accessible.",
        "Validate the source path and application configuration before retrying synchronization.",
      ],
      verification: [
        "The Application resolves the intended revision.",
        "The diff contains the expected resources.",
        "No unrelated application changes are included.",
      ],
    },
    {
      cause: "Git authentication or repository access failure",
      evidence: [
        "Argo CD reports repository authentication or fetch errors.",
        "The repository URL works for an authorized developer but not for Argo CD.",
        "A credential rotation or repository permission change occurred near the incident.",
      ],
      investigation: [
        "Inspect the repository error in Argo CD application status and controller logs.",
        "Confirm repository connectivity and the configured authentication method.",
        "Check whether the repository credential has expired or been revoked.",
        "Review recent access-control changes.",
      ],
      resolution: [
        "Restore the approved repository credential or access permission.",
        "Use the organization's secret-management process to update credentials.",
        "Avoid placing credentials in Git, command history, or incident reports.",
      ],
      verification: [
        "Argo CD can fetch the intended revision.",
        "Manifest generation completes.",
        "The resolved revision matches the release commit.",
      ],
    },
    {
      cause: "Invalid Kubernetes YAML or API schema",
      evidence: [
        "Manifest generation or validation reports parsing errors.",
        "A resource has an invalid field, unsupported API version, or incorrect data type.",
        "The failure began after a manifest or chart change.",
      ],
      investigation: [
        "Inspect the exact error and resource path.",
        "Review the changed YAML and the rendered Helm output.",
        "Check API versions supported by the target Kubernetes cluster.",
        "Validate the manifest using the appropriate CI checks and API server dry-run.",
      ],
      resolution: [
        "Correct the field name, data type, indentation, or supported API version.",
        "Render and validate the complete resource set.",
        "Commit the corrected configuration and pass required review checks.",
      ],
      verification: [
        "Manifest generation succeeds.",
        "API validation succeeds.",
        "Argo CD can compare and synchronize the intended configuration.",
      ],
    },
    {
      cause: "Helm template or values failure",
      evidence: [
        "The Application reports a Helm rendering error.",
        "A required value is absent or a template references the wrong value path.",
        "The issue occurs only for a particular environment's values file.",
      ],
      investigation: [
        "Identify the exact chart version and values file used by Argo CD.",
        "Run helm lint against the chart and selected values.",
        "Render the chart with the same values and release configuration.",
        "Compare the failing environment values with the last known-good release.",
      ],
      resolution: [
        "Correct the template or environment values.",
        "Ensure required values have explicit defaults or validation.",
        "Render and review the result before promoting the change.",
      ],
      verification: [
        "Helm rendering completes successfully.",
        "Generated resource names, images, ports, and selectors are correct.",
        "Argo CD reports successful manifest generation.",
      ],
    },
    {
      cause: "Kubernetes authorization or admission rejection",
      evidence: [
        "Argo CD reports Forbidden or an admission webhook rejection.",
        "A resource type or namespace was introduced recently.",
        "A new policy, role, or cluster restriction was deployed.",
      ],
      investigation: [
        "Identify the rejected resource and exact API error.",
        "Determine whether the error is an RBAC authorization failure or an admission-policy denial.",
        "Review the Argo CD service account permissions and applicable policy.",
        "Check whether the resource requires cluster-scoped permissions or a prerequisite.",
      ],
      resolution: [
        "Request the minimum required permission through the approved access process.",
        "Correct the resource to satisfy the admission policy.",
        "Do not grant broad cluster-admin access merely to bypass the failure.",
      ],
      verification: [
        "The intended resource passes authorization and admission checks.",
        "Required permissions remain limited to the necessary scope.",
        "The resource becomes healthy after synchronization.",
      ],
    },
    {
      cause: "ImagePullBackOff or ErrImagePull",
      evidence: [
        "Pod events show ErrImagePull, ImagePullBackOff, or registry access errors.",
        "The desired image tag or digest cannot be retrieved.",
        "The registry credential or network configuration changed.",
      ],
      investigation: [
        "Inspect the Pod's image reference and event messages.",
        "Confirm the tag or digest exists in the intended registry.",
        "Check image pull secret references and registry permissions.",
        "Check node-to-registry connectivity and registry availability.",
      ],
      resolution: [
        "Correct the image reference to an existing approved artifact.",
        "Restore the required registry credentials through the approved process.",
        "Resolve the network or registry permission issue.",
        "Prefer immutable image digests for controlled releases when supported by the delivery process.",
      ],
      verification: [
        "The image is pulled successfully.",
        "The container starts without image retrieval errors.",
        "The new Pod passes readiness checks.",
      ],
    },
    {
      cause: "CrashLoopBackOff or application startup failure",
      evidence: [
        "Pod restart counts increase.",
        "Previous container logs show startup errors or unhandled exceptions.",
        "The process exits because of configuration, dependency, or runtime errors.",
      ],
      investigation: [
        "Inspect the Pod description and container termination state.",
        "Read current and previous container logs.",
        "Check required environment variables, Secret references, and ConfigMaps without exposing their values.",
        "Check startup dependencies, application ports, and resource limits.",
      ],
      resolution: [
        "Correct the actual startup configuration or application defect.",
        "Ensure required dependencies and configuration are available.",
        "Rebuild and publish an approved image if the application code is defective.",
        "Avoid repeatedly restarting a container without understanding why it exits.",
      ],
      verification: [
        "Restart counts stop increasing.",
        "The container remains running.",
        "Startup and readiness checks succeed.",
      ],
    },
    {
      cause: "Readiness or liveness probe failure",
      evidence: [
        "Pod events report failed probes.",
        "The application starts but never becomes Ready.",
        "The configured probe path, port, or timing does not match application behavior.",
      ],
      investigation: [
        "Inspect the configured probe path, port, scheme, and timing.",
        "Check whether the application listens on the expected interface and port.",
        "Inspect application logs and startup duration.",
        "Determine whether the endpoint correctly represents readiness or liveness.",
      ],
      resolution: [
        "Correct the probe configuration or application health endpoint.",
        "Use startupProbe when slow initialization requires protection from premature liveness failures.",
        "Adjust thresholds based on measured startup and recovery behavior.",
        "Do not simply disable probes to force a rollout to pass.",
      ],
      verification: [
        "The Pod becomes Ready.",
        "Readiness failures stop.",
        "The Service routes traffic only to suitable endpoints.",
      ],
    },
    {
      cause: "Insufficient CPU, memory, or cluster capacity",
      evidence: [
        "Pods remain Pending.",
        "Events show FailedScheduling.",
        "Nodes have insufficient allocatable resources or relevant scheduling constraints.",
      ],
      investigation: [
        "Inspect Pod events and resource requests.",
        "Check node capacity, allocatable resources, and existing workloads.",
        "Review node selectors, affinity, taints, and tolerations.",
        "Check quota restrictions and autoscaler activity.",
      ],
      resolution: [
        "Right-size resource requests based on observed usage and workload requirements.",
        "Add capacity through the approved cluster-scaling process when necessary.",
        "Correct scheduling constraints only when the intended placement is understood.",
        "Do not lower resource requests blindly to make a Pod schedule.",
      ],
      verification: [
        "The Pod is scheduled onto an appropriate node.",
        "The container starts and becomes Ready.",
        "Cluster capacity and workload performance remain acceptable.",
      ],
    },
    {
      cause: "Missing Secret, ConfigMap, or mounted dependency",
      evidence: [
        "Events report FailedMount or missing referenced resources.",
        "The application fails to start because required configuration is absent.",
        "The release introduced a new configuration reference.",
      ],
      investigation: [
        "Inspect Pod events and volume references.",
        "Check whether the referenced object exists in the correct namespace.",
        "Verify resource names and deployment ordering.",
        "Check the approved external secret-management integration where applicable.",
      ],
      resolution: [
        "Restore or create the required configuration using the approved source of truth.",
        "Correct namespace and resource references.",
        "Ensure secret delivery and dependency ordering are reliable.",
        "Never commit plaintext credentials to Git.",
      ],
      verification: [
        "Volumes mount successfully.",
        "The container starts with the required configuration.",
        "No secret values are exposed in logs.",
      ],
    },
    {
      cause: "Service selector mismatch or missing endpoints",
      evidence: [
        "Pods are Ready but Service requests fail.",
        "The Service selector does not match the Pod labels.",
        "Endpoint information is empty or does not contain the expected backends.",
      ],
      investigation: [
        "Inspect the Service selector.",
        "Inspect labels on the intended Pods.",
        "Check readiness and endpoint publication.",
        "Inspect the application's listening port and the Service targetPort.",
      ],
      resolution: [
        "Correct the Service selector or Pod labels in the source configuration.",
        "Correct port mappings where the evidence shows a mismatch.",
        "Review any Ingress or Gateway configuration if the Service itself is healthy.",
      ],
      verification: [
        "Expected ready endpoints are present.",
        "Requests succeed through the Service.",
        "Ingress or Gateway health checks pass where applicable.",
      ],
    },
    {
      cause: "Missing CRD or custom resource dependency",
      evidence: [
        "The API server reports that a custom resource type is unknown.",
        "A custom resource is introduced before its CRD is available.",
        "A controller required to reconcile the resource is unhealthy or absent.",
      ],
      investigation: [
        "Inspect the exact API group, version, and kind in the error.",
        "Check whether the CRD exists in the target cluster.",
        "Confirm that the responsible controller is installed and healthy.",
        "Review the intended ordering and ownership of platform dependencies.",
      ],
      resolution: [
        "Install or restore the required CRD and controller through the approved platform workflow.",
        "Ensure the CRD is established before dependent resources are applied.",
        "Avoid deleting and recreating production CRDs without assessing stored custom resources and data risk.",
      ],
      verification: [
        "The API server recognizes the custom resource type.",
        "The responsible controller reconciles the resource.",
        "Dependent application resources become healthy.",
      ],
    },
    {
      cause: "OutOfSync caused by another controller or manual change",
      evidence: [
        "A live field differs from Git even though the application was previously Synced.",
        "Another controller manages the same field.",
        "A manual change was made outside the GitOps workflow.",
      ],
      investigation: [
        "Inspect the Argo CD diff and identify the exact changed fields.",
        "Check field ownership and relevant controllers.",
        "Review recent operator actions and audit logs.",
        "Determine whether the difference is intentional or an unauthorized drift.",
      ],
      resolution: [
        "Decide which controller or Git source should own the field.",
        "Correct ownership conflicts in the configuration.",
        "Use an approved Git commit to restore intended configuration when appropriate.",
        "Configure narrowly scoped diff exceptions only when there is a documented reason.",
      ],
      verification: [
        "The ownership model is clear.",
        "Unintended drift is corrected.",
        "Expected controller-managed fields do not cause endless reconciliation.",
      ],
    },
    {
      cause: "Pruning or automated synchronization creates risk",
      evidence: [
        "A sync plan includes resource deletions.",
        "A resource disappears after a Git change.",
        "Automated sync or pruning is enabled for the application.",
      ],
      investigation: [
        "Inspect the diff and identify every resource proposed for deletion.",
        "Check whether the resource was intentionally removed from Git.",
        "Review finalizers, resource ownership, and dependencies.",
        "Determine whether deletion could affect persistent data or production traffic.",
      ],
      resolution: [
        "Stop and obtain the required approval when a deletion is unexpected or high risk.",
        "Correct the source configuration if a resource was accidentally removed.",
        "Use explicit pruning policies and protection for resources requiring special handling.",
        "Do not enable broad automated deletion to work around synchronization errors.",
      ],
      verification: [
        "The final resource plan matches the approved change.",
        "Persistent data and required dependencies remain protected.",
        "No unintended deletion occurred.",
      ],
    },
    {
      cause: "Application appears Synced but remains Degraded",
      evidence: [
        "The Application sync status is Synced.",
        "The health status remains Degraded or Progressing.",
        "One or more workloads are not ready or application checks fail.",
      ],
      investigation: [
        "Inspect the resource health details.",
        "Check Deployment conditions, Pod events, and application logs.",
        "Verify Service endpoints and application health checks.",
        "Review external dependencies and service-level monitoring.",
      ],
      resolution: [
        "Correct the underlying workload, configuration, dependency, or probe failure.",
        "Do not repeatedly sync an already synchronized application without a justified change.",
        "Use the approved rollback process if the release caused user impact.",
      ],
      verification: [
        "Argo CD reports the expected health state.",
        "The application passes real service checks.",
        "Monitoring shows recovery.",
      ],
    },
    {
      cause: "Rollout stuck or ProgressDeadlineExceeded",
      evidence: [
        "Deployment conditions indicate ProgressDeadlineExceeded.",
        "Updated replicas do not become available.",
        "The new ReplicaSet exists but cannot complete the rollout.",
      ],
      investigation: [
        "Inspect Deployment conditions and ReplicaSet counts.",
        "Check new Pods for image, startup, scheduling, and probe errors.",
        "Review maxSurge, maxUnavailable, and cluster capacity.",
        "Check whether the new application version is compatible with its dependencies.",
      ],
      resolution: [
        "Correct the specific cause preventing new replicas from becoming ready.",
        "Adjust rollout strategy only after evaluating availability and capacity requirements.",
        "Use a reviewed rollback if the new version is unsafe or service impact requires recovery.",
      ],
      verification: [
        "The Deployment reaches the expected replica counts.",
        "The rollout completes.",
        "The application remains stable under normal traffic.",
      ],
    },
    {
      cause: "Argo CD controller or repository-server problem",
      evidence: [
        "Multiple unrelated Applications fail at the same time.",
        "Repository generation, reconciliation, or API requests show widespread errors.",
        "Argo CD components are unhealthy or resource constrained.",
      ],
      investigation: [
        "Check Argo CD component health in the relevant namespace.",
        "Review controller and repository-server logs using approved access.",
        "Inspect resource usage, restarts, queue pressure, and API connectivity.",
        "Determine whether the failure is application-specific or platform-wide.",
      ],
      resolution: [
        "Address the demonstrated resource, connectivity, or component configuration problem.",
        "Use the platform team's established Argo CD recovery procedure.",
        "Avoid restarting components repeatedly without collecting evidence.",
      ],
      verification: [
        "Argo CD components become healthy.",
        "Applications reconcile normally.",
        "The affected Applications report their expected states.",
      ],
    },
  ] as DeploymentRootCause[],

  recoveryStrategies: [
    {
      strategy: "Correct the Git configuration",
      useWhen:
        "The desired state in Git is wrong and the corrected configuration is the intended release.",
      steps: [
        "Create a focused fix in a feature branch.",
        "Render and validate the manifests.",
        "Run security and policy checks.",
        "Obtain the required review and approval.",
        "Merge the correction into the intended release branch.",
        "Confirm Argo CD resolves the corrected revision.",
        "Review the sync diff before applying the change.",
        "Monitor the resulting rollout.",
      ],
      caution:
        "A Git correction may not automatically reverse database changes or external side effects.",
    },
    {
      strategy: "Synchronize a validated application",
      useWhen:
        "The desired state is correct, the diff has been reviewed, and the change is approved.",
      steps: [
        "Confirm the Application and target cluster.",
        "Review all planned resource updates and deletions.",
        "Confirm required dependencies are available.",
        "Execute the approved synchronization procedure.",
        "Monitor the operation and affected resources.",
        "Verify application health and service-level behavior.",
      ],
      caution:
        "A sync is not a universal repair. It can apply destructive changes if the desired state is wrong.",
    },
    {
      strategy: "Rollback a failed release",
      useWhen:
        "The release is responsible for service impact and a known-good recovery path exists.",
      steps: [
        "Identify the last known-good application revision.",
        "Review the differences between the current and previous release.",
        "Check database schema compatibility, migrations, and external side effects.",
        "Confirm the rollback is approved.",
        "Revert the GitOps source to the approved known-good configuration or use the organization's documented rollback procedure.",
        "Verify that Argo CD is reconciling the intended revision.",
        "Monitor rollout, service availability, and error rates.",
      ],
      caution:
        "For GitOps-managed Applications, a manual kubectl rollback can be overwritten by Argo CD reconciliation. Prefer restoring the desired state in Git unless the incident procedure explicitly requires another approach.",
    },
    {
      strategy: "Recover from an accidental resource deletion",
      useWhen:
        "A required resource was removed unexpectedly.",
      steps: [
        "Identify the resource and the deletion mechanism.",
        "Determine whether the resource contains persistent data.",
        "Review backups, finalizers, and dependent resources.",
        "Restore the intended resource through the approved source of truth.",
        "Verify data integrity and dependent application health.",
      ],
      caution:
        "Do not recreate persistent resources blindly. A recreated object may not point to the original data.",
    },
  ],

  prevention: {
    gitAndCi: [
      "Validate Kubernetes YAML before merge.",
      "Run Helm lint and render checks for every environment values file.",
      "Run schema and policy validation against supported Kubernetes APIs.",
      "Use pull requests and required review for production changes.",
      "Pin critical dependencies and review chart or image upgrades.",
      "Promote the same immutable artifact through environments where practical.",
      "Prevent unreviewed changes from entering protected release branches.",
    ],

    argocd: [
      "Monitor Application sync and health status.",
      "Set appropriate sync policies for each environment.",
      "Use automated sync and self-heal only with a clear ownership and recovery model.",
      "Enable pruning only when deletion behavior is understood and approved.",
      "Protect critical resources using appropriate deletion policies and operational controls.",
      "Use narrowly scoped ignore-difference rules with documented reasons.",
      "Keep Argo CD access permissions least-privilege.",
      "Monitor repository-server, application-controller, and API connectivity.",
    ],

    kubernetes: [
      "Configure readiness, liveness, and startup probes appropriately.",
      "Set resource requests and limits based on workload behavior.",
      "Monitor Pending Pods, restart counts, and failed rollouts.",
      "Use safe rolling-update strategies.",
      "Validate Service selectors, ports, and ingress routing.",
      "Manage Secrets through an approved secret-management system.",
      "Test application compatibility with dependency and schema changes.",
    ],

    releaseSafety: [
      "Use canary or progressive delivery for high-risk releases when appropriate.",
      "Define automated promotion and rollback criteria.",
      "Run smoke tests after deployment.",
      "Check latency, error rate, saturation, and availability.",
      "Document the last known-good release and rollback procedure.",
      "Require explicit approval for high-risk production changes.",
    ],

    alerting: [
      "Alert on sustained production availability failures.",
      "Alert when a critical Application becomes Degraded.",
      "Alert on deployment failures and prolonged Progressing states.",
      "Alert on repeated container restarts and unavailable replicas.",
      "Alert on elevated HTTP 5xx responses and latency.",
      "Alert when Argo CD cannot fetch a required repository.",
      "Route alerts to the responsible service owner with runbook links.",
    ],
  },

  commonMistakes: [
    {
      mistake: "Treating Synced as proof that the application works.",
      betterApproach:
        "Check both Argo CD health and real application behavior.",
    },
    {
      mistake: "Repeatedly pressing Sync without reading the error.",
      betterApproach:
        "Inspect the operation result, diff, failed resource, and Kubernetes events first.",
    },
    {
      mistake: "Deleting a failing Pod as the first troubleshooting step.",
      betterApproach:
        "Inspect logs, termination state, events, and the owning controller before restarting anything.",
    },
    {
      mistake: "Using kubectl edit to fix a GitOps-managed resource without a recovery plan.",
      betterApproach:
        "Fix the source of truth in Git, or use a documented emergency procedure that accounts for reconciliation.",
    },
    {
      mistake: "Granting cluster-admin to resolve a Forbidden error.",
      betterApproach:
        "Identify the exact rejected action and request the minimum required permission.",
    },
    {
      mistake: "Disabling probes because they block a deployment.",
      betterApproach:
        "Determine why the probe fails and correct the endpoint, port, timing, or startup behavior.",
    },
    {
      mistake: "Rolling back an application without checking database compatibility.",
      betterApproach:
        "Review schema changes, migrations, persistent data, and external side effects before recovery.",
    },
    {
      mistake: "Enabling automatic pruning without assessing deletion risk.",
      betterApproach:
        "Review the deletion plan and protect critical resources.",
    },
    {
      mistake: "Changing several settings at once.",
      betterApproach:
        "Make the smallest justified change and verify its effect before proceeding.",
    },
    {
      mistake: "Closing the incident as soon as Pods become Ready.",
      betterApproach:
        "Verify application traffic, error rates, dependencies, and customer impact.",
    },
  ],

  incidentReportTemplate: {
    incidentId: "",
    summary: "",
    environment: "",
    affectedApplication: "",
    affectedNamespace: "",
    affectedCluster: "",
    releaseRevision: "",
    firstObservedAt: "",
    serviceRestoredAt: "",
    severity: "",
    customerImpact: "",
    detectedBy: "",
    timeline: [] as string[],
    observedSymptoms: [] as string[],
    diagnosticEvidence: [] as string[],
    rootCause: "",
    correctiveAction: "",
    rollbackPerformed: false,
    verificationResults: [] as string[],
    contributingFactors: [] as string[],
    preventionActions: [
      {
        action: "",
        owner: "",
        dueDate: "",
        status: "Open",
      },
    ],
    lessonsLearned: [] as string[],
  },

  runbookChecklist: [
    "Confirm the incident owner and severity.",
    "Identify affected services, users, and environment.",
    "Verify the Argo CD server, Application, repository, revision, and target cluster.",
    "Record the last known-good release.",
    "Check sync status, health status, and the latest operation error.",
    "Review the desired-versus-live diff.",
    "Inspect Deployment and ReplicaSet status.",
    "Inspect Pod events, container state, and logs.",
    "Check image availability, configuration references, and resource capacity.",
    "Check Service endpoints, probes, and application health.",
    "Identify the root cause using evidence.",
    "Select the approved correction or rollback.",
    "Review potentially destructive changes before synchronization.",
    "Monitor rollout and application metrics.",
    "Verify customer-facing recovery.",
    "Document the timeline, cause, and corrective actions.",
    "Assign preventive actions with owners and due dates.",
  ],

  interviewQuestions: [
    {
      question: "What is the difference between Synced and Healthy in Argo CD?",
      answer:
        "Synced indicates that the live resources match the desired configuration " +
        "Argo CD compares. Healthy represents the health assessment of application " +
        "resources. An application can be Synced but Degraded.",
    },
    {
      question: "How do you troubleshoot an Application that is OutOfSync?",
      answer:
        "Inspect the Application status, resolved revision, and diff. Determine " +
        "whether the difference is expected, caused by manual drift, or produced " +
        "by another controller. Review the change before synchronizing.",
    },
    {
      question: "What do you do when a deployment is Degraded?",
      answer:
        "Identify the unhealthy resource, inspect its status and events, examine " +
        "container logs, isolate the cause, apply a controlled correction, and " +
        "verify the application and its monitoring signals.",
    },
    {
      question: "What causes ImagePullBackOff?",
      answer:
        "Common causes include an incorrect image name or tag, unavailable registry, " +
        "authentication failure, missing pull secret, or network connectivity problems.",
    },
    {
      question: "How do you troubleshoot a stuck Deployment rollout?",
      answer:
        "Inspect Deployment conditions, ReplicaSets, Pods, events, scheduling, image " +
        "pulls, readiness probes, resource capacity, and application startup logs.",
    },
    {
      question: "Why can a manual kubectl fix be reverted?",
      answer:
        "Argo CD may reconcile the live cluster toward the desired state stored in Git. " +
        "A manual change that conflicts with Git can be overwritten, depending on the " +
        "application's reconciliation and sync configuration.",
    },
    {
      question: "What is pruning in Argo CD?",
      answer:
        "Pruning removes resources that Argo CD determines are no longer part of the " +
        "desired application state, subject to the sync operation and its configuration. " +
        "Deletion behavior must be reviewed carefully for production resources.",
    },
    {
      question: "How do you investigate a Helm rendering failure?",
      answer:
        "Confirm the chart version and values, inspect the error, run Helm lint, render " +
        "the chart with the same values, and validate the generated resources.",
    },
    {
      question: "What is the safest way to roll back a GitOps release?",
      answer:
        "Identify a known-good revision, review application and data compatibility, " +
        "follow the approved recovery procedure, restore the intended Git state, and " +
        "verify the reconciled application.",
    },
    {
      question: "What is the difference between a Pod being Running and Ready?",
      answer:
        "Running indicates that the Pod has been assigned to a node and its containers " +
        "are running or starting according to Kubernetes state. Ready indicates that " +
        "the Pod is considered ready to serve traffic under its readiness conditions.",
    },
    {
      question: "How would you investigate an Argo CD failure affecting many applications?",
      answer:
        "Determine whether the issue is platform-wide, inspect Argo CD component health, " +
        "repository-server and controller logs, API connectivity, resource pressure, " +
        "and repository access before investigating each application independently.",
    },
    {
      question: "What evidence should be collected before a production rollback?",
      answer:
        "Collect the release revision, application status, relevant diff, failing resource " +
        "events and logs, impact assessment, last known-good version, dependency and " +
        "database compatibility information, and required approval.",
    },
  ] as DeploymentInterviewQuestion[],

  finalLearningOutcome: [
    "Read Argo CD Application status confidently.",
    "Trace deployment failures from Git to Kubernetes runtime.",
    "Differentiate sync, rendering, scheduling, and application failures.",
    "Use diagnostic commands safely and interpret their output.",
    "Choose evidence-based recovery actions.",
    "Verify recovery through both Kubernetes health and application behavior.",
    "Write an incident report and propose preventive improvements.",
  ],
};

export default deploymentErrorsGuide;
```
