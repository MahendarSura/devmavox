export interface PodDiagnosticStep {
  id: string;
  title: string;
  purpose: string;
  commands: string[];
  interpret: string[];
  nextAction: string;
  risk: "low" | "medium" | "high";
}

export interface PodFailureCase {
  title: string;
  symptoms: string[];
  likelyCauses: string[];
  evidence: string[];
  diagnosticCommands: string[];
  decisionLogic: string[];
  resolution: string[];
  verification: string[];
  prevention: string[];
}

export interface PodIncidentScenario {
  title: string;
  severity: string;
  situation: string;
  impact: string[];
  investigation: string[];
  rootCause: string;
  recovery: string[];
  rollbackDecision: string;
  verification: string[];
}

export interface PodInterviewQuestion {
  question: string;
  answer: string;
  followUp?: string;
}

export interface PodFailuresGuide {
  title: string;
  slug: string;
  category: string;
  description: string;
  symptoms: string[];
  severityMatrix: { severity: string; condition: string; response: string }[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: PodDiagnosticStep[];
  failureCases: PodFailureCase[];
  incidentScenarios: PodIncidentScenario[];
  commandReference: { command: string; purpose: string; interpretation: string }[];
  recoveryRunbook: string[];
  prevention: string[];
  monitoring: string[];
  cicdValidation: string[];
  incidentReportTemplate: string[];
  labs: { title: string; objective: string; steps: string[] }[];
  interviewQuestions: PodInterviewQuestion[];
  references: { title: string; url: string }[];
}

export const podFailuresGuide: PodFailuresGuide = {
  title: "Kubernetes Pod Failures: Production Troubleshooting Runbook",
  slug: "pod-failures",
  category: "Kubernetes",
  description:
    "An end-to-end production troubleshooting guide for Pending Pods, scheduling failures, image pulls, container startup errors, crashes, OOMKilled containers, probes, networking, persistent storage, security restrictions, node failures and rollout incidents.",

  symptoms: [
    "Pod remains Pending for several minutes.",
    "Pod displays ContainerCreating indefinitely.",
    "Container enters CrashLoopBackOff.",
    "ImagePullBackOff or ErrImagePull appears.",
    "Container terminates with OOMKilled.",
    "CreateContainerConfigError appears.",
    "Pod is Running but never becomes Ready.",
    "Liveness or startup probes repeatedly fail.",
    "Pod repeatedly restarts after a deployment.",
    "Pod cannot resolve DNS or connect to a dependency.",
    "Pod cannot mount its PVC or write to a mounted directory.",
    "Pod is evicted because of node pressure.",
    "Pod is stuck terminating.",
    "A new ReplicaSet cannot reach its desired replica count.",
    "Pods fail only on one node, namespace or availability zone.",
    "The application works locally but fails inside Kubernetes."
  ],

  severityMatrix: [
    {
      severity: "SEV-1 / Critical",
      condition:
        "Critical production service is unavailable, widespread failures occur, or data corruption/loss is suspected.",
      response:
        "Declare an incident, identify the incident lead, preserve evidence, stop risky changes, engage application and platform owners, and follow the approved recovery plan."
    },
    {
      severity: "SEV-2 / High",
      condition:
        "A production workload has no healthy replicas, a critical rollout is stalled, or error rates are materially elevated.",
      response:
        "Check service endpoints, replica health, recent changes, dependency health and rollback readiness. Restore service through the least risky approved action."
    },
    {
      severity: "SEV-3 / Medium",
      condition:
        "A non-critical workload has a failed Pod, repeated restarts or reduced capacity while the service remains available.",
      response:
        "Collect events and logs, isolate the cause, and apply a targeted correction with post-change validation."
    },
    {
      severity: "SEV-4 / Low",
      condition:
        "An isolated development workload fails or an early warning fires without user impact.",
      response:
        "Document evidence, fix the underlying issue and add automated validation where appropriate."
    }
  ],

  safetyChecks: [
    "Confirm kubectl context, cluster, namespace, environment and account before running commands.",
    "Identify the affected workload, owner, service, incident ticket and change window.",
    "Determine the number of desired, available, ready and unavailable replicas.",
    "Check whether the issue started after a deployment, configuration update, secret rotation, node change or infrastructure modification.",
    "Preserve Pod descriptions, events, current logs and previous-container logs before restarting anything.",
    "Check whether the workload is stateless or stateful and whether it owns important data.",
    "Check PodDisruptionBudgets and the effect of removing an additional replica.",
    "Confirm readiness of replacement Pods before removing healthy replicas.",
    "Avoid deleting Pods blindly when the controller, scheduling constraint or underlying dependency is still broken.",
    "Do not scale workloads to zero without approval and an understanding of service impact.",
    "Do not increase memory limits or CPU requests arbitrarily; review actual usage and node capacity.",
    "Do not disable probes, security controls or NetworkPolicies as a first response.",
    "Do not print Secret values, tokens, passwords or credentials into incident logs.",
    "Use read-only diagnostics first and get approval for production-impacting changes.",
    "Confirm a known-good image, configuration revision and rollback path before changing the workload."
  ],

  evidenceCollection: [
    "Incident start time and time of the first failing Pod.",
    "Cluster context, namespace, workload name and affected node.",
    "Pod phase, conditions, container state, exit code and restart count.",
    "Current logs and previous-container logs, with secrets redacted.",
    "Pod, ReplicaSet, Deployment and namespace events.",
    "Image name, immutable digest if available, pull policy and registry error.",
    "CPU and memory requests, limits and recent usage metrics.",
    "Readiness, liveness and startup probe definitions and failure messages.",
    "ConfigMap and Secret references without exposing their values.",
    "ServiceAccount, security context, volume mounts and PVC references.",
    "Node conditions, resource pressure, taints, allocatable capacity and recent node events.",
    "Recent Git commits, Helm values, manifest changes and rollout history.",
    "Dependency health, DNS, NetworkPolicy, service endpoints and external service status.",
    "Timestamped before-and-after evidence for every production change."
  ],

  diagnosticWorkflow: [
    {
      id: "1",
      title: "Confirm the incident scope",
      purpose:
        "Determine whether the issue affects one Pod, one workload, one namespace, a node or the whole cluster.",
      commands: [
        "kubectl config current-context",
        "kubectl get pods -A -o wide",
        "kubectl get deployments,statefulsets,daemonsets -A",
        "kubectl get nodes",
        "kubectl get events -A --sort-by=.metadata.creationTimestamp"
      ],
      interpret: [
        "One Pod failing may indicate an application, configuration or placement-specific problem.",
        "All Pods for one Deployment failing may indicate a shared image, configuration or application regression.",
        "Unrelated workloads failing on the same node suggest a node or runtime problem.",
        "Many workloads failing together may indicate a cluster, network, storage or shared dependency incident."
      ],
      nextAction:
        "Record affected namespaces, workload names, nodes, start time and the number of healthy replicas.",
      risk: "low"
    },
    {
      id: "2",
      title: "Inspect the Pod state and conditions",
      purpose:
        "Identify the current lifecycle stage and the first useful failure signal.",
      commands: [
        "kubectl get pod <pod-name> -n <namespace> -o wide",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get pod <pod-name> -n <namespace> -o yaml"
      ],
      interpret: [
        "Pending may mean scheduling has not completed or a required setup stage is blocked.",
        "ContainerCreating often points toward image preparation, volume mounting or runtime setup.",
        "CrashLoopBackOff means repeated container failures are being followed by restart backoff.",
        "Running does not mean Ready or that the application is serving traffic.",
        "Pod conditions, container states and Events help distinguish these cases."
      ],
      nextAction:
        "Follow the branch matching the actual state and event. Do not assume the displayed Pod phase alone explains the cause.",
      risk: "low"
    },
    {
      id: "3",
      title: "Inspect events in chronological order",
      purpose:
        "Find the earliest failure rather than focusing only on repeated downstream symptoms.",
      commands: [
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get rs -n <namespace>",
        "kubectl describe deployment <deployment-name> -n <namespace>"
      ],
      interpret: [
        "FailedScheduling points toward resource, affinity, taint, topology or claim constraints.",
        "FailedMount points toward volume setup or storage access.",
        "Failed to pull image points toward registry, image reference or credentials.",
        "BackOff and repeated container termination point toward a startup or runtime failure.",
        "Events expire and may be aggregated, so collect them early."
      ],
      nextAction:
        "Correlate the earliest relevant event with the first failing log timestamp and latest deployment change.",
      risk: "low"
    },
    {
      id: "4",
      title: "Collect current and previous container logs",
      purpose:
        "Find application startup failures, fatal exceptions and termination reasons.",
      commands: [
        "kubectl logs <pod-name> -n <namespace> --all-containers=true --timestamps",
        "kubectl logs <pod-name> -n <namespace> -c <container-name> --previous --timestamps",
        "kubectl get pod <pod-name> -n <namespace> -o jsonpath='{.status.containerStatuses[*].lastState.terminated.reason}'"
      ],
      interpret: [
        "Previous logs are especially useful when a container has restarted.",
        "An empty log does not prove the application had no error; it may have failed before logging started.",
        "An exit code is a clue, not a complete root-cause diagnosis.",
        "Check all relevant containers, including init containers and sidecars."
      ],
      nextAction:
        "Match the last log line and exit timestamp to Pod events, configuration changes and dependency failures.",
      risk: "low"
    },
    {
      id: "5",
      title: "Inspect the controller and rollout",
      purpose:
        "Determine whether the workload controller is creating the expected Pods and whether the latest revision is healthy.",
      commands: [
        "kubectl get deployment <deployment-name> -n <namespace> -o wide",
        "kubectl describe deployment <deployment-name> -n <namespace>",
        "kubectl rollout status deployment/<deployment-name> -n <namespace>",
        "kubectl rollout history deployment/<deployment-name> -n <namespace>",
        "kubectl get rs -n <namespace> -o wide"
      ],
      interpret: [
        "A Deployment may have the desired replica count but insufficient available replicas.",
        "A new ReplicaSet with zero available replicas may indicate a bad image, config or startup regression.",
        "A rollout can stall because of readiness failures, scheduling constraints or progress deadlines.",
        "A Deployment rollback does not necessarily undo external database schema changes or data migrations."
      ],
      nextAction:
        "Compare the current and last known-good revisions. Assess rollback safety before changing production.",
      risk: "low"
    },
    {
      id: "6",
      title: "Check scheduling and node health",
      purpose:
        "Identify resource shortages, taints, affinity constraints, topology restrictions and unhealthy nodes.",
      commands: [
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get nodes -o wide",
        "kubectl describe node <node-name>",
        "kubectl top nodes",
        "kubectl top pods -n <namespace>"
      ],
      interpret: [
        "Insufficient cpu or memory can prevent scheduling even if some resources appear idle elsewhere.",
        "Node allocatable capacity and scheduler requests differ from instantaneous CPU or memory usage.",
        "Taints, node selectors, affinity and topology spread can restrict eligible nodes.",
        "NotReady, MemoryPressure, DiskPressure or PIDPressure may indicate node-level issues.",
        "kubectl top requires a working metrics pipeline and may not be available."
      ],
      nextAction:
        "Compare Pod requests with eligible-node allocatable capacity and inspect node conditions before changing scheduling policy.",
      risk: "low"
    },
    {
      id: "7",
      title: "Validate image and registry access",
      purpose:
        "Separate invalid image references from authentication, network and registry availability issues.",
      commands: [
        "kubectl get pod <pod-name> -n <namespace> -o jsonpath='{.spec.containers[*].image}'",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get serviceaccount <service-account> -n <namespace> -o yaml",
        "kubectl get pod <pod-name> -n <namespace> -o yaml"
      ],
      interpret: [
        "Manifest inspection confirms the requested image and imagePullPolicy.",
        "NotFound often indicates an invalid repository, tag or image path.",
        "Unauthorized or denied errors suggest registry credentials or permissions.",
        "Timeouts can indicate registry reachability, DNS, proxy or firewall issues.",
        "Do not expose pull-secret contents while collecting evidence."
      ],
      nextAction:
        "Validate the image reference and approved registry credentials. Check registry health and network access from the relevant environment.",
      risk: "low"
    },
    {
      id: "8",
      title: "Check configuration and secrets references",
      purpose:
        "Determine whether environment variables, mounted configuration or Secret references prevent startup.",
      commands: [
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get configmap -n <namespace>",
        "kubectl get secret -n <namespace>",
        "kubectl get pod <pod-name> -n <namespace> -o yaml",
        "kubectl describe deployment <deployment-name> -n <namespace>"
      ],
      interpret: [
        "CreateContainerConfigError commonly indicates a missing or invalid referenced configuration object or key.",
        "A missing required Secret or ConfigMap key can block container creation.",
        "A configuration object may exist but contain an incorrect endpoint, port or setting.",
        "Avoid printing decoded Secret values or full environment dumps into shared logs."
      ],
      nextAction:
        "Compare object names and required key names with the manifest and known-good revision. Validate configuration changes through the approved secret-management process.",
      risk: "low"
    },
    {
      id: "9",
      title: "Inspect storage and mounts",
      purpose:
        "Identify volume setup failures and distinguish them from application-level file access problems.",
      commands: [
        "kubectl get pvc -n <namespace>",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl describe pvc <pvc-name> -n <namespace>",
        "kubectl get pv"
      ],
      interpret: [
        "Unbound claims may block scheduling.",
        "FailedAttachVolume and FailedMount indicate different storage lifecycle stages.",
        "A mounted volume can still fail application writes because of capacity, ownership or read-only configuration.",
        "Stateful workloads require special care because volume changes may risk data integrity."
      ],
      nextAction:
        "Follow the persistent-storage runbook for PVC binding, CSI, attachment, filesystem, permissions and backup checks.",
      risk: "medium"
    },
    {
      id: "10",
      title: "Check probes and application readiness",
      purpose:
        "Determine whether Kubernetes is restarting the container or simply withholding traffic because the application is not ready.",
      commands: [
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get pod <pod-name> -n <namespace> -o yaml",
        "kubectl logs <pod-name> -n <namespace> --all-containers=true --since=15m",
        "kubectl get endpointslices -n <namespace>"
      ],
      interpret: [
        "Readiness failure normally prevents a Pod from serving traffic through the associated Service.",
        "Liveness failure can trigger container restarts.",
        "Startup probes provide time for slow-starting applications before liveness checks become active.",
        "An incorrect probe path, port, timeout or startup threshold can cause false failures.",
        "A successful probe does not guarantee all application functions are healthy."
      ],
      nextAction:
        "Compare probe configuration with the application's actual startup and health behavior. Fix the underlying issue before relaxing thresholds.",
      risk: "medium"
    },
    {
      id: "11",
      title: "Investigate CPU, memory and process pressure",
      purpose:
        "Determine whether the workload is crashing, throttled, evicted or unable to start because of resource pressure.",
      commands: [
        "kubectl top pod <pod-name> -n <namespace> --containers",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl describe node <node-name>",
        "kubectl get pod <pod-name> -n <namespace> -o yaml"
      ],
      interpret: [
        "OOMKilled indicates a container was terminated due to memory exhaustion; inspect limits and usage history.",
        "CPU throttling can cause slow responses and probe timeouts without an OOM event.",
        "Evicted points toward node pressure or eviction policy rather than an ordinary application crash.",
        "A container may exceed its memory limit even when node-wide memory appears available.",
        "Current metrics may not capture the peak immediately before a crash."
      ],
      nextAction:
        "Correlate termination reasons, historical metrics, application behavior, requests, limits and node pressure before changing resources.",
      risk: "medium"
    },
    {
      id: "12",
      title: "Check network and dependency health",
      purpose:
        "Investigate failures that occur after the container starts but before the application becomes healthy.",
      commands: [
        "kubectl get services -n <namespace>",
        "kubectl get endpointslices -n <namespace>",
        "kubectl get networkpolicy -n <namespace>",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl logs <pod-name> -n <namespace> --since=15m"
      ],
      interpret: [
        "No ready endpoints may indicate Pods are not Ready or the Service selector is wrong.",
        "DNS failures can prevent access to internal or external dependencies.",
        "NetworkPolicy may block traffic even when a Pod is Running.",
        "Connection refused, timeout and name-resolution failures indicate different network stages.",
        "An unhealthy database or API dependency can cause application startup failures."
      ],
      nextAction:
        "Test the exact destination, port and protocol from an approved diagnostic container. Check DNS, routing, policy and dependency health separately.",
      risk: "low"
    },
    {
      id: "13",
      title: "Investigate security and runtime restrictions",
      purpose:
        "Determine whether admission, identity, permissions or runtime restrictions prevent startup.",
      commands: [
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get pod <pod-name> -n <namespace> -o yaml",
        "kubectl get serviceaccount <service-account> -n <namespace> -o yaml",
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp"
      ],
      interpret: [
        "Admission rejection may prevent a Pod from being created at all.",
        "Permission denied can indicate filesystem ownership, Linux capabilities, security context or policy restrictions.",
        "Image signature or policy enforcement may reject an image before it runs.",
        "ServiceAccount identity and RBAC affect Kubernetes API access, not arbitrary network access to every service."
      ],
      nextAction:
        "Identify the exact policy or permission denial. Request the minimum approved permission or configuration correction rather than disabling controls.",
      risk: "medium"
    },
    {
      id: "14",
      title: "Compare affected and healthy workloads",
      purpose:
        "Find environment-specific differences without making speculative changes.",
      commands: [
        "kubectl get pod <healthy-pod> -n <namespace> -o yaml",
        "kubectl get pod <failing-pod> -n <namespace> -o yaml",
        "kubectl get deployment <deployment-name> -n <namespace> -o yaml",
        "kubectl rollout history deployment/<deployment-name> -n <namespace>"
      ],
      interpret: [
        "Compare image digests, environment variable references, resources, probes, ServiceAccount, security context, mounts and scheduling rules.",
        "Redact Secret values and sensitive environment data before comparing or sharing outputs.",
        "A healthy Pod on another node may indicate a node-specific problem, but the difference must be confirmed.",
        "A healthy old ReplicaSet and failing new ReplicaSet suggest a revision-specific regression."
      ],
      nextAction:
        "Create an evidence-backed difference list and validate the suspected cause in staging or a controlled canary.",
      risk: "low"
    }
  ],

  failureCases: [
    {
      title: "Pod stuck in Pending",
      symptoms: [
        "Pod has no assigned node.",
        "Events show FailedScheduling.",
        "Deployment cannot reach its desired available replica count."
      ],
      likelyCauses: [
        "Insufficient CPU or memory requests.",
        "Node taints without matching tolerations.",
        "Node selector or affinity matches no nodes.",
        "PVC is unbound.",
        "Topology constraints or quota prevent placement.",
        "Pod has an invalid or unsatisfiable scheduling configuration."
      ],
      evidence: [
        "Pod description shows scheduler events.",
        "Node descriptions show taints, conditions and allocatable resources.",
        "PVC status and events show whether storage blocks scheduling.",
        "Namespace quota and workload requests explain resource constraints."
      ],
      diagnosticCommands: [
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get nodes -o wide",
        "kubectl describe node <node-name>",
        "kubectl get pvc -n <namespace>",
        "kubectl describe resourcequota -n <namespace>"
      ],
      decisionLogic: [
        "If the event says Insufficient cpu or memory, compare requests against eligible-node allocatable capacity.",
        "If it reports untolerated taints, verify whether the workload is intended to run on those nodes.",
        "If no nodes match affinity or selector rules, compare required labels with actual node labels.",
        "If a PVC is unbound, follow the storage branch rather than repeatedly recreating the Pod.",
        "If quota is exceeded, review namespace usage and approved quota limits."
      ],
      resolution: [
        "Correct incorrect selectors or affinity rules after validating intended placement.",
        "Right-size requests using measured workload behavior.",
        "Add capacity or adjust placement only through an approved capacity plan.",
        "Correct storage provisioning or quota configuration when proven to be the blocker.",
        "Do not remove taints or increase quotas indiscriminately."
      ],
      verification: [
        "Pod receives a node assignment.",
        "Container starts and reaches Ready.",
        "The workload reaches the required available replica count.",
        "No new scheduling failures appear."
      ],
      prevention: [
        "Validate requests, affinity, topology and quota in CI.",
        "Alert on long-running Pending Pods.",
        "Forecast capacity and test scale-out behavior.",
        "Document special node pools and taint requirements."
      ]
    },
    {
      title: "CrashLoopBackOff",
      symptoms: [
        "Container repeatedly starts and exits.",
        "Restart count increases.",
        "Pod status shows CrashLoopBackOff."
      ],
      likelyCauses: [
        "Application exception or invalid startup command.",
        "Missing configuration or required environment variable.",
        "Dependency unavailable during startup.",
        "Incorrect file path, permissions or mounted configuration.",
        "Liveness probe repeatedly terminates the container.",
        "Memory exhaustion or another runtime termination."
      ],
      evidence: [
        "Previous-container logs show the last startup attempt.",
        "Pod description includes exit code, termination reason and probe events.",
        "Deployment history identifies recent image or configuration changes.",
        "Dependency logs show whether an upstream service failed."
      ],
      diagnosticCommands: [
        "kubectl logs <pod-name> -n <namespace> --all-containers=true",
        "kubectl logs <pod-name> -n <namespace> -c <container-name> --previous",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get pod <pod-name> -n <namespace> -o yaml",
        "kubectl rollout history deployment/<deployment-name> -n <namespace>"
      ],
      decisionLogic: [
        "If logs show a fatal exception, trace the application error and its configuration.",
        "If the exit reason is OOMKilled, investigate memory usage and limits.",
        "If probe failures precede restarts, validate probe configuration and application startup time.",
        "If logs show a missing key or file, inspect the corresponding ConfigMap, Secret reference or mount.",
        "If a new revision introduced the failure, compare it with the last known-good revision."
      ],
      resolution: [
        "Fix the verified application or configuration defect.",
        "Correct the startup command or file permissions if evidence identifies them.",
        "Restore a known-good image or configuration if rollback is safe and approved.",
        "Adjust probe timing only when it reflects measured startup behavior.",
        "Avoid repeated manual Pod deletion; the controller may simply recreate the same failure."
      ],
      verification: [
        "Restart count stops increasing.",
        "Application logs show successful initialization.",
        "Pod becomes Ready and receives traffic.",
        "Service error rate and dependency health return to baseline."
      ],
      prevention: [
        "Add startup and configuration validation to CI.",
        "Use startup probes for slow-starting applications.",
        "Use immutable image digests and reviewed configuration changes.",
        "Alert on restart spikes and sustained CrashLoopBackOff."
      ]
    },
    {
      title: "ImagePullBackOff or ErrImagePull",
      symptoms: [
        "Container cannot start because the image is unavailable.",
        "Pod events report pull failures.",
        "New replicas fail while old replicas may remain healthy."
      ],
      likelyCauses: [
        "Incorrect image repository, name or tag.",
        "Image tag was never published or has been removed.",
        "Registry authentication or authorization failure.",
        "Registry DNS, network, proxy or TLS problem.",
        "Architecture mismatch or registry-side outage."
      ],
      evidence: [
        "Pod events include the registry's actual response.",
        "Manifest shows the requested image and pull policy.",
        "Image publication pipeline confirms whether the tag or digest exists.",
        "Registry audit logs may show permission failures."
      ],
      diagnosticCommands: [
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get pod <pod-name> -n <namespace> -o jsonpath='{.spec.containers[*].image}'",
        "kubectl get serviceaccount <service-account> -n <namespace> -o yaml",
        "kubectl rollout history deployment/<deployment-name> -n <namespace>"
      ],
      decisionLogic: [
        "NotFound: verify repository, image name, tag or digest.",
        "Unauthorized or denied: verify registry identity, pull secret reference and repository permissions.",
        "Timeout or TLS errors: investigate registry reachability, certificates, DNS and proxy configuration.",
        "If the image exists but only one node fails, investigate that node's runtime, network and registry access."
      ],
      resolution: [
        "Publish the intended image and reference the verified tag or digest.",
        "Correct registry credentials using the approved secret-management process.",
        "Restore trusted registry connectivity or certificate configuration.",
        "Roll back to a verified image if the new release is unavailable and rollback is approved."
      ],
      verification: [
        "The image pulls successfully.",
        "Container starts without new pull errors.",
        "Pod reaches Ready and rollout progress resumes."
      ],
      prevention: [
        "Verify image publication before deployment.",
        "Prefer immutable image digests for production releases.",
        "Validate registry permissions and credentials before rotation.",
        "Monitor registry availability and image-pull failure rates."
      ]
    },
    {
      title: "OOMKilled",
      symptoms: [
        "Container exits with termination reason OOMKilled.",
        "Restart count increases or Pod becomes unavailable.",
        "Memory usage rises sharply before termination."
      ],
      likelyCauses: [
        "Container memory limit is too low for actual workload peaks.",
        "Memory leak or unbounded cache.",
        "Large request batch, startup load or concurrency spike.",
        "Native memory or runtime overhead exceeds expectations.",
        "Node memory pressure may also be involved."
      ],
      evidence: [
        "Container termination reason and previous logs.",
        "Historical memory metrics and usage immediately before the failure.",
        "Container memory requests and limits.",
        "Application heap, garbage collection or memory profiling evidence.",
        "Node conditions and related eviction events."
      ],
      diagnosticCommands: [
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl top pod <pod-name> -n <namespace> --containers",
        "kubectl get pod <pod-name> -n <namespace> -o yaml",
        "kubectl describe node <node-name>"
      ],
      decisionLogic: [
        "If usage approaches the container limit, investigate workload peaks and memory allocation.",
        "If OOM occurs during large requests, check payload sizes, concurrency and buffering.",
        "If multiple Pods fail on one node, investigate node memory pressure as well.",
        "If current metrics are low, retrieve historical telemetry because the peak may have occurred before termination."
      ],
      resolution: [
        "Fix leaks, unbounded buffers or excessive concurrency where confirmed.",
        "Right-size requests and limits using workload measurements and node capacity.",
        "Use runtime-specific heap and garbage collection settings when applicable.",
        "Scale out only if the workload can distribute load safely and capacity exists."
      ],
      verification: [
        "Memory usage remains within an agreed operating range under representative load.",
        "Restart count remains stable.",
        "Latency and error rates remain healthy during peak traffic."
      ],
      prevention: [
        "Load-test realistic peaks.",
        "Alert on memory trends and repeated OOM termination.",
        "Use application memory profiling and capacity forecasts.",
        "Review memory requests and limits during release changes."
      ]
    },
    {
      title: "CreateContainerConfigError",
      symptoms: [
        "Container does not start.",
        "Pod events mention a missing Secret, ConfigMap or key.",
        "The error appears immediately after a configuration change."
      ],
      likelyCauses: [
        "Referenced Secret or ConfigMap does not exist.",
        "Required key is missing.",
        "Wrong namespace or object name.",
        "A manifest refers to a renamed configuration object.",
        "Invalid container configuration."
      ],
      evidence: [
        "Pod description shows the missing object or key.",
        "Pod YAML shows exact references.",
        "Deployment revision shows the recent manifest change.",
        "Configuration deployment logs show whether the object was created."
      ],
      diagnosticCommands: [
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get configmap -n <namespace>",
        "kubectl get secret -n <namespace>",
        "kubectl get deployment <deployment-name> -n <namespace> -o yaml"
      ],
      decisionLogic: [
        "If an object is missing, check its namespace and deployment order.",
        "If a key is missing, compare required key names without revealing values.",
        "If references changed during a rollout, compare the old and new revisions.",
        "If the object exists, inspect the exact Pod event for another configuration error."
      ],
      resolution: [
        "Restore the correct object or key using the approved configuration pipeline.",
        "Correct the reference in the workload manifest.",
        "Validate configuration dependencies before releasing the workload.",
        "Roll back the reference change if the previous version is known-good and safe."
      ],
      verification: [
        "Container creation succeeds.",
        "Application initializes with the expected configuration.",
        "Pod reaches Ready and the rollout completes."
      ],
      prevention: [
        "Validate configuration references in CI.",
        "Deploy dependent configuration before workloads that require it.",
        "Use secret-management automation and controlled rotation.",
        "Avoid exposing Secret values in logs or debugging output."
      ]
    },
    {
      title: "Liveness, readiness or startup probe failures",
      symptoms: [
        "Pod remains NotReady.",
        "Traffic does not reach the Pod.",
        "Container restarts after repeated liveness failures.",
        "Slow-starting applications never become healthy."
      ],
      likelyCauses: [
        "Incorrect probe path or port.",
        "Application listens on a different interface or port.",
        "Startup takes longer than the configured allowance.",
        "Probe timeout is too short for observed behavior.",
        "Health endpoint depends on an unhealthy external service.",
        "Application is overloaded or deadlocked."
      ],
      evidence: [
        "Pod events show the failing probe and response.",
        "Probe configuration is available in the Pod specification.",
        "Application logs and metrics show startup and health timing.",
        "Service endpoints show whether the Pod is ready for traffic."
      ],
      diagnosticCommands: [
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get pod <pod-name> -n <namespace> -o yaml",
        "kubectl logs <pod-name> -n <namespace> --since=15m",
        "kubectl get endpointslices -n <namespace>"
      ],
      decisionLogic: [
        "If startup is slow but succeeds, compare startup duration with the startup probe allowance.",
        "If the endpoint returns an error, inspect the application's actual listener, route and health dependencies.",
        "If liveness fails under load, investigate latency, resource pressure and deadlocks.",
        "If only readiness fails, check whether the Pod is intentionally withheld from traffic."
      ],
      resolution: [
        "Correct the health endpoint, port or probe type.",
        "Tune thresholds based on measured behavior rather than hiding real failures.",
        "Separate process liveness from readiness to serve traffic.",
        "Fix the application or dependency that makes the health check fail."
      ],
      verification: [
        "Probe results match actual application health.",
        "Restart frequency stabilizes.",
        "Ready endpoints match the healthy replica count.",
        "Traffic is restored without an increase in error rate."
      ],
      prevention: [
        "Test probes during startup, load and dependency degradation.",
        "Use startup probes for slow initialization.",
        "Keep health endpoints predictable and appropriately scoped.",
        "Monitor probe failures alongside application latency."
      ]
    },
    {
      title: "ContainerCreating or FailedMount",
      symptoms: [
        "Pod remains in ContainerCreating.",
        "Pod events show FailedMount or FailedAttachVolume.",
        "Application never reaches its entrypoint."
      ],
      likelyCauses: [
        "PVC is unbound.",
        "CSI driver or node plugin is unhealthy.",
        "Volume is attached to another node.",
        "Secret or ConfigMap volume reference is invalid.",
        "Mount options, filesystem or node-level operations fail."
      ],
      evidence: [
        "Pod and PVC events identify the failing stage.",
        "PV and StorageClass show binding and topology.",
        "VolumeAttachment and CSI logs show attachment status.",
        "Configuration references show missing projected resources."
      ],
      diagnosticCommands: [
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get pvc -n <namespace>",
        "kubectl describe pvc <pvc-name> -n <namespace>",
        "kubectl get volumeattachments",
        "kubectl get csidrivers"
      ],
      decisionLogic: [
        "If the claim is Pending, follow the persistent-storage provisioning branch.",
        "If attachment fails, inspect the CSI and backend attachment state.",
        "If the volume is mounted but application writes fail later, investigate permissions and capacity instead.",
        "If a projected Secret or ConfigMap volume fails, validate its reference."
      ],
      resolution: [
        "Fix the evidenced binding, CSI, attachment, mount or configuration problem.",
        "Follow the provider's documented recovery procedure for stale attachments.",
        "Do not force-detach a volume while another writer may still be active.",
        "Preserve important data and verify application consistency after recovery."
      ],
      verification: [
        "Volume mount succeeds.",
        "Container starts and reaches Ready.",
        "Application reads and writes the expected data safely."
      ],
      prevention: [
        "Monitor CSI components and volume attachment failures.",
        "Test node and storage recovery in non-production.",
        "Validate required volume and configuration references before release."
      ]
    },
    {
      title: "Pod is Running but not Ready",
      symptoms: [
        "Pod phase is Running but Ready condition is False.",
        "Service has fewer ready endpoints than expected.",
        "Application traffic fails despite running containers."
      ],
      likelyCauses: [
        "Readiness probe fails.",
        "Application initialization is incomplete.",
        "A required dependency is unavailable.",
        "Service selector does not match intended Pods.",
        "Application listener or port configuration is incorrect."
      ],
      evidence: [
        "Pod conditions and probe events.",
        "Application logs and health endpoint results.",
        "Service selector and EndpointSlice contents.",
        "Dependency health and recent configuration changes."
      ],
      diagnosticCommands: [
        "kubectl get pod <pod-name> -n <namespace>",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get service <service-name> -n <namespace> -o yaml",
        "kubectl get endpointslices -n <namespace>",
        "kubectl logs <pod-name> -n <namespace> --since=15m"
      ],
      decisionLogic: [
        "If readiness fails, investigate the probe and application health.",
        "If the Pod is Ready but absent from the expected EndpointSlice, inspect Service selectors and ports.",
        "If endpoints exist but requests fail, investigate network policy, routing and dependency behavior."
      ],
      resolution: [
        "Fix the health endpoint or actual application initialization problem.",
        "Correct the Service selector or target port when the mismatch is proven.",
        "Restore the missing dependency through its approved recovery path."
      ],
      verification: [
        "The expected ready endpoints are present.",
        "Application requests succeed from the correct network path.",
        "Error rates and latency return to baseline."
      ],
      prevention: [
        "Test readiness and Service selection in CI.",
        "Monitor ready replicas against desired replicas.",
        "Include dependency and traffic-path checks in release verification."
      ]
    },
    {
      title: "Pod evicted or node becomes unhealthy",
      symptoms: [
        "Pod status reports Evicted.",
        "Node condition shows MemoryPressure or DiskPressure.",
        "Several unrelated Pods fail on the same node."
      ],
      likelyCauses: [
        "Node memory or ephemeral storage pressure.",
        "Container writable layers, logs or temporary files consume disk.",
        "Node becomes NotReady.",
        "Kubelet or container runtime is unhealthy.",
        "A workload exceeds node-level resource capacity."
      ],
      evidence: [
        "Pod termination reason and node events.",
        "Node conditions and allocatable capacity.",
        "Ephemeral-storage requests and limits.",
        "Kubelet and runtime logs from the approved node access path."
      ],
      diagnosticCommands: [
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get nodes -o wide",
        "kubectl describe node <node-name>",
        "kubectl top nodes",
        "kubectl get pods -A -o wide"
      ],
      decisionLogic: [
        "If DiskPressure appears, inspect ephemeral storage, image layers and logs.",
        "If MemoryPressure appears, inspect node-level memory use and workload requests.",
        "If the node is NotReady, investigate kubelet, runtime, network and underlying infrastructure.",
        "If unrelated workloads fail on the same node, treat it as a possible node-level incident."
      ],
      resolution: [
        "Follow the infrastructure team's node recovery procedure.",
        "Use approved node drain or replacement procedures when appropriate.",
        "Ensure replacement capacity exists before removing a node from service.",
        "Do not manually delete system files or kill unknown processes on a production node."
      ],
      verification: [
        "Node returns to the expected Ready state.",
        "Affected workloads recover on healthy nodes.",
        "Resource pressure and eviction rates return to acceptable levels."
      ],
      prevention: [
        "Set appropriate resource requests and ephemeral-storage limits.",
        "Monitor node pressure and runtime health.",
        "Plan node capacity and disruption budgets.",
        "Test node replacement and rescheduling procedures."
      ]
    },
    {
      title: "Pod stuck in Terminating",
      symptoms: [
        "Pod remains Terminating beyond its expected shutdown time.",
        "Deployment rollout is blocked.",
        "Volume detach or finalization does not complete."
      ],
      likelyCauses: [
        "Application ignores termination signals or exceeds its shutdown window.",
        "A preStop hook does not complete.",
        "Node or kubelet is unreachable.",
        "Volume unmount or CSI operation is blocked.",
        "A finalizer or controller is waiting for cleanup."
      ],
      evidence: [
        "Pod metadata shows deletion timestamp and finalizers.",
        "Pod events and controller logs show the blocked lifecycle stage.",
        "Node status identifies reachability problems.",
        "Application logs show shutdown behavior."
      ],
      diagnosticCommands: [
        "kubectl get pod <pod-name> -n <namespace> -o yaml",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get nodes -o wide",
        "kubectl get volumeattachments",
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp"
      ],
      decisionLogic: [
        "If the application is shutting down, compare termination behavior with grace-period and preStop settings.",
        "If the node is unreachable, follow the node recovery and fencing procedure.",
        "If storage unmount is blocked, investigate CSI and backend state.",
        "If a finalizer remains, identify its owning controller and reason before changing it."
      ],
      resolution: [
        "Fix graceful shutdown or hook behavior where confirmed.",
        "Restore node or CSI health through the approved process.",
        "Remove finalizers only under an approved, documented recovery procedure after understanding the cleanup they protect.",
        "Avoid force deletion when a stateful workload may still be writing."
      ],
      verification: [
        "Old workload termination completes safely.",
        "Replacement Pods become healthy.",
        "Storage attachment and application state are consistent."
      ],
      prevention: [
        "Test graceful termination and preStop hooks.",
        "Set realistic termination grace periods.",
        "Monitor stuck terminating Pods and finalizer age.",
        "Document node fencing and storage detach procedures."
      ]
    },
    {
      title: "Pod starts but DNS or network access fails",
      symptoms: [
        "Application reports DNS lookup errors or connection timeouts.",
        "Pod is Running but dependency connections fail.",
        "Only some namespaces or nodes experience the problem."
      ],
      likelyCauses: [
        "CoreDNS or upstream DNS issue.",
        "NetworkPolicy blocks traffic.",
        "Service selector or target port is incorrect.",
        "Routing, CNI or node networking failure.",
        "The dependency itself is unavailable."
      ],
      evidence: [
        "Application logs show lookup, timeout or connection-refused errors.",
        "Service and EndpointSlice data show backend availability.",
        "NetworkPolicies and DNS configuration show restrictions.",
        "Failures correlate with a particular node, namespace or destination."
      ],
      diagnosticCommands: [
        "kubectl get services -n <namespace>",
        "kubectl get endpointslices -n <namespace>",
        "kubectl get networkpolicy -n <namespace>",
        "kubectl get pods -n kube-system -o wide",
        "kubectl describe pod <pod-name> -n <namespace>"
      ],
      decisionLogic: [
        "Name-resolution failure: investigate CoreDNS, resolver settings and the requested DNS name.",
        "Connection refused: verify destination service, listener and target port.",
        "Timeout: investigate routing, policy, firewall and dependency health.",
        "No Service endpoints: inspect readiness and Service selectors before blaming the network."
      ],
      resolution: [
        "Follow the CoreDNS and networking runbooks for the evidenced failure.",
        "Correct selectors, ports or NetworkPolicy rules through reviewed changes.",
        "Restore the dependency or approved network path.",
        "Do not disable namespace-wide network security to test a single connection."
      ],
      verification: [
        "The expected DNS name resolves.",
        "The intended port is reachable from the workload network path.",
        "Application dependency checks and request success rates recover."
      ],
      prevention: [
        "Test DNS and dependency access during releases.",
        "Version-control NetworkPolicies.",
        "Monitor CoreDNS, CNI and dependency health.",
        "Document expected service names, ports and protocols."
      ]
    }
  ],

  incidentScenarios: [
    {
      title: "Production Deployment suddenly has zero available replicas",
      severity: "SEV-1 if the service is unavailable",
      situation:
        "A deployment was released and the new Pods repeatedly crash or fail readiness. The rollout cannot provide healthy replicas.",
      impact: [
        "Customer requests may fail or time out.",
        "A rollout may remain incomplete.",
        "If old replicas were removed, there may be no healthy service endpoints."
      ],
      investigation: [
        "Confirm cluster, namespace, Deployment and incident start time.",
        "Check desired, ready and available replica counts.",
        "Inspect Pod events and current plus previous-container logs.",
        "Compare image digest, ConfigMap references, Secret references, probes and resource settings with the last known-good revision.",
        "Check Service EndpointSlices and dependency health.",
        "Review the Git commit, Helm release and deployment pipeline logs."
      ],
      rootCause:
        "Example: a new application revision references a required environment variable that is absent from the production configuration. Confirm the actual root cause from logs and events before applying this fix.",
      recovery: [
        "Declare the incident and pause unrelated rollout changes.",
        "Preserve the failing revision's logs and configuration references.",
        "Confirm the last known-good revision and whether a rollback is safe.",
        "If the issue is isolated to the new revision, perform the approved rollback or correct the configuration through the release pipeline.",
        "Wait for replacement Pods to become Ready and verify Service endpoints.",
        "Confirm that the application and its dependencies are healthy."
      ],
      rollbackDecision:
        "Rollback is appropriate when the previous revision is known-good and compatible with current data and infrastructure. Do not assume a Deployment rollback reverses database migrations or external side effects.",
      verification: [
        "Required replicas are available.",
        "EndpointSlices contain the expected ready backends.",
        "Application smoke tests pass.",
        "Error rate and latency return to baseline.",
        "The incident timeline and preventive action are documented."
      ]
    },
    {
      title: "CrashLoopBackOff begins immediately after a Secret rotation",
      severity: "SEV-2 or SEV-1 depending on impact",
      situation:
        "A credential rotation was performed, after which the application repeatedly fails to authenticate to a database or external API.",
      impact: [
        "Requests fail because the application cannot authenticate.",
        "Containers repeatedly restart.",
        "Repeated retries may increase load on the dependency."
      ],
      investigation: [
        "Confirm the rotation time and affected workload.",
        "Inspect previous-container logs for authentication errors without exposing credentials.",
        "Check whether the Secret object and required key names exist.",
        "Determine whether the application reads environment variables at startup or reloads mounted files.",
        "Check whether the dependency accepts the new credential and whether old credentials were revoked.",
        "Compare the deployment revision and secret-management audit logs."
      ],
      rootCause:
        "Example: the application reads a credential from an environment variable at startup, but the rollout did not replace all affected Pods after rotation.",
      recovery: [
        "Coordinate with the credential owner and dependency owner.",
        "Verify the intended credential version through the approved secret-management system.",
        "Trigger a controlled rollout only after the configuration path is corrected.",
        "Avoid printing Secret values or copying credentials into shell history.",
        "Restore a valid credential through the approved rotation procedure if the new credential is invalid."
      ],
      rollbackDecision:
        "Do not blindly restore an old credential if it has already been revoked or compromised. Choose a valid credential state with the security and application owners.",
      verification: [
        "Application authentication succeeds.",
        "Pods remain Ready without repeated restarts.",
        "Dependency errors return to baseline.",
        "Secret rotation and rollout automation are documented."
      ]
    },
    {
      title: "Pods fail only on one node",
      severity: "SEV-2 or SEV-3 depending on capacity and impact",
      situation:
        "Several Pods fail on one worker node while equivalent workloads remain healthy elsewhere.",
      impact: [
        "Workload capacity may decrease.",
        "Pods may fail to start or mount storage.",
        "Node-local runtime, CNI or CSI issues may affect multiple applications."
      ],
      investigation: [
        "Map failing Pods to nodes using kubectl get pods -A -o wide.",
        "Inspect node conditions, events and allocatable capacity.",
        "Compare affected and healthy Pod events and specifications.",
        "Check CSI and CNI components on the affected node.",
        "Review kubelet, container runtime and infrastructure logs through approved access.",
        "Confirm whether the node hosts stateful workloads or unique local data."
      ],
      rootCause:
        "Example: a node-specific storage plugin failure prevents volume mounts. Confirm from CSI node-plugin logs and Pod events.",
      recovery: [
        "Engage the node/platform owner.",
        "Preserve evidence before attempting node repair.",
        "Confirm sufficient healthy capacity and disruption-budget constraints.",
        "Cordon or drain only through the approved procedure when appropriate.",
        "For stateful workloads, confirm volume detach and fencing requirements before rescheduling.",
        "Repair or replace the node according to the platform runbook."
      ],
      rollbackDecision:
        "Rolling back an application revision is unlikely to fix a node-local runtime, CNI or CSI fault unless evidence links the failure to that revision.",
      verification: [
        "Affected workloads run on healthy eligible nodes.",
        "The node or replacement node meets readiness checks.",
        "Storage and network operations succeed.",
        "Unrelated workloads remain healthy."
      ]
    },
    {
      title: "OOMKilled during a traffic spike",
      severity: "SEV-2 or SEV-1 depending on service availability",
      situation:
        "Memory usage rises during a traffic spike and one or more containers are terminated by the runtime.",
      impact: [
        "Requests may fail or latency may increase.",
        "Restarts can reduce available capacity further.",
        "Repeated crashes may create a feedback loop under load."
      ],
      investigation: [
        "Record affected Pods, container termination reasons and restart counts.",
        "Review historical container memory metrics before each OOM.",
        "Check requests, limits, concurrency, batch sizes, caches and runtime memory settings.",
        "Compare the affected revision with earlier healthy revisions.",
        "Inspect node memory pressure and cluster capacity.",
        "Check whether autoscaling is responding and whether the workload can scale horizontally."
      ],
      rootCause:
        "Example: unbounded in-memory buffering causes memory usage to exceed the container limit under peak load.",
      recovery: [
        "Stabilize traffic using the approved rate-limiting or load-shedding controls if needed.",
        "Reduce unbounded memory use or concurrency where the evidence supports it.",
        "Adjust resource settings only after checking node capacity and workload measurements.",
        "Use a known-good revision if the regression is release-specific and rollback is safe.",
        "Load-test the corrected configuration before broad rollout."
      ],
      rollbackDecision:
        "Rollback if a recent release introduced the memory regression and the prior revision is compatible with current state. Otherwise, address the resource or workload cause directly.",
      verification: [
        "Memory usage remains within the expected range under representative load.",
        "OOM termination stops.",
        "Latency and errors recover.",
        "Autoscaling and capacity alerts behave as expected."
      ]
    }
  ],

  commandReference: [
    {
      command: "kubectl get pods -A -o wide",
      purpose: "List Pods across namespaces with node placement.",
      interpretation: "Use it to identify failure scope, restart counts, phases and node concentration."
    },
    {
      command: "kubectl describe pod <pod-name> -n <namespace>",
      purpose: "Inspect Pod conditions, events and container states.",
      interpretation: "Look for the first meaningful warning and exact container termination reason."
    },
    {
      command: "kubectl logs <pod-name> -n <namespace> --all-containers=true",
      purpose: "Collect logs from all containers in the Pod.",
      interpretation: "Identify startup exceptions, dependency errors and sidecar failures."
    },
    {
      command: "kubectl logs <pod-name> -n <namespace> -c <container-name> --previous",
      purpose: "Read logs from the previous terminated container instance.",
      interpretation: "Useful for CrashLoopBackOff when the current instance has little or no output."
    },
    {
      command: "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
      purpose: "View namespace events in time order.",
      interpretation: "Correlate scheduling, image, mount, probe and container failures."
    },
    {
      command: "kubectl get deployment <deployment-name> -n <namespace> -o wide",
      purpose: "Inspect rollout and replica status.",
      interpretation: "Compare desired, current, ready and available replicas."
    },
    {
      command: "kubectl rollout status deployment/<deployment-name> -n <namespace>",
      purpose: "Wait for Deployment rollout progress.",
      interpretation: "A timeout or stalled rollout requires inspecting ReplicaSets, Pods and events."
    },
    {
      command: "kubectl rollout history deployment/<deployment-name> -n <namespace>",
      purpose: "Review Deployment revision history.",
      interpretation: "Use revision history alongside source control and release records when assessing rollback."
    },
    {
      command: "kubectl top pods -n <namespace> --containers",
      purpose: "Inspect current container CPU and memory usage.",
      interpretation: "Current metrics may miss the peak before a crash; use historical telemetry as well."
    },
    {
      command: "kubectl describe node <node-name>",
      purpose: "Inspect node health, conditions, taints and events.",
      interpretation: "Look for NotReady, resource pressure, allocatable capacity and scheduling constraints."
    },
    {
      command: "kubectl get endpointslices -n <namespace>",
      purpose: "Inspect Service backend endpoint information.",
      interpretation: "Missing ready endpoints may explain why a running workload receives no traffic."
    },
    {
      command: "kubectl get networkpolicy -n <namespace>",
      purpose: "List namespace network policies.",
      interpretation: "Use policy configuration with network evidence to identify blocked traffic."
    },
    {
      command: "kubectl get pvc -n <namespace>",
      purpose: "Check persistent claim status.",
      interpretation: "Pending claims may prevent scheduling or volume setup."
    },
    {
      command: "kubectl get pod <pod-name> -n <namespace> -o yaml",
      purpose: "Inspect the Pod's effective configuration and status.",
      interpretation: "Check image, probes, requests, limits, references, mounts and container termination details. Redact sensitive information before sharing."
    }
  ],

  recoveryRunbook: [
    "1. Declare the incident and appoint an incident lead.",
    "2. Confirm context, cluster, namespace, environment, workload owner and customer impact.",
    "3. Establish the blast radius and current healthy replica count.",
    "4. Capture Pod descriptions, events, current logs, previous logs and relevant metrics.",
    "5. Identify the earliest failure and classify it as scheduling, image, configuration, startup, probe, resource, node, network or storage.",
    "6. Correlate the symptom with the latest release, infrastructure change or dependency incident.",
    "7. Build a short list of evidence-supported root-cause candidates.",
    "8. Choose the smallest safe correction that addresses the confirmed cause.",
    "9. Check rollback readiness, PodDisruptionBudgets, storage/data implications and approval requirements.",
    "10. Apply the correction through the approved deployment or platform workflow.",
    "11. Verify Pod conditions, restart count, replica availability, Service endpoints and application health.",
    "12. Run smoke tests and monitor latency, errors, saturation and dependency behavior.",
    "13. Confirm the fix persists through the relevant load or rescheduling scenario.",
    "14. Record root cause, commands, evidence, change reference, recovery timeline and preventive actions."
  ],

  prevention: [
    "Use immutable image digests or a controlled image promotion process.",
    "Validate manifests, resource requests, limits, probes and configuration references in CI.",
    "Use startup probes for applications that require extended initialization.",
    "Keep readiness and liveness checks separate according to their purpose.",
    "Set realistic resource requests and limits based on load testing and production metrics.",
    "Monitor restart spikes, OOMKilled containers, pending Pods and unavailable replicas.",
    "Test graceful shutdown, termination hooks and disruption handling.",
    "Use PodDisruptionBudgets appropriately, while remembering they do not protect against every involuntary failure.",
    "Keep ConfigMaps, Secrets and application releases versioned and coordinated.",
    "Use least-privilege ServiceAccounts and approved security policies.",
    "Test scheduling, node loss, volume mounts and dependency failures in non-production.",
    "Maintain a known-good release and a documented rollback procedure.",
    "Add smoke tests for DNS, dependency connectivity, storage writes and application readiness.",
    "Keep Kubernetes, CNI, CSI and container runtime versions within supported compatibility ranges.",
    "Run post-incident reviews and turn recurring failure patterns into automated checks."
  ],

  monitoring: [
    "Alert on desired versus available replicas for critical Deployments.",
    "Alert on sustained Pending Pods and unschedulable workloads.",
    "Monitor CrashLoopBackOff, restart counts and container termination reasons.",
    "Alert on ImagePullBackOff and repeated registry errors.",
    "Monitor OOMKilled events, memory usage, CPU throttling and node pressure.",
    "Track readiness, liveness and startup probe failures.",
    "Monitor Pod eviction, node NotReady conditions and kubelet/runtime health.",
    "Monitor PVC Pending, FailedMount and FailedAttachVolume events.",
    "Monitor Service ready endpoints, DNS health and dependency error rates.",
    "Correlate alerts with deployment timestamps and configuration changes.",
    "Track error rate, latency, throughput and saturation at application level.",
    "Ensure alert thresholds distinguish transient startup delays from sustained production impact."
  ],

  cicdValidation: [
    "Run YAML parsing and Kubernetes schema validation before deployment.",
    "Use policy checks for image sources, security context, resource requests and limits.",
    "Validate that referenced ConfigMaps, Secrets, ServiceAccounts and PVCs are defined or provisioned in the target environment.",
    "Validate probe paths, ports, timeouts and startup allowances.",
    "Verify the image exists and passed the build, test and security pipeline.",
    "Run application unit, integration and smoke tests.",
    "Test startup with required dependencies and realistic configuration.",
    "Use canary or progressive delivery for high-impact services where appropriate.",
    "Gate production rollout on readiness and health checks.",
    "Keep release metadata, image digests, manifests and rollback instructions.",
    "Require review for production changes to probes, resource limits, network policies and storage.",
    "Test rollback compatibility, especially when database migrations or persistent data formats change."
  ],

  incidentReportTemplate: [
    "Incident ID and severity:",
    "Start, detection, mitigation and recovery timestamps:",
    "Cluster, environment, namespace and affected service:",
    "Deployment, ReplicaSet, Pod and node identifiers:",
    "Customer impact and duration:",
    "Desired, ready and available replica counts:",
    "First observed event and exact error messages:",
    "Logs, metrics, events and recent changes collected:",
    "Diagnostic sequence and results:",
    "Confirmed root cause and supporting evidence:",
    "Corrective change and approval/change reference:",
    "Rollback decision and data compatibility assessment:",
    "Post-recovery smoke test results:",
    "Monitoring status and remaining risks:",
    "Contributing factors:",
    "Preventive actions, owners and due dates:"
  ],

  labs: [
    {
      title: "Lab 1: Diagnose a Pending Pod",
      objective:
        "Distinguish resource scheduling problems from taint, affinity and PVC issues.",
      steps: [
        "Use a disposable non-production namespace.",
        "Create a test Pod with an intentionally unsatisfiable node selector.",
        "Run kubectl describe pod and capture the FailedScheduling event.",
        "Compare the selector with actual node labels.",
        "Correct the selector or test manifest.",
        "Verify the Pod schedules and reaches Ready.",
        "Delete only the lab resources."
      ]
    },
    {
      title: "Lab 2: Investigate CrashLoopBackOff",
      objective:
        "Practice collecting previous logs and diagnosing a deterministic application exit.",
      steps: [
        "Create a disposable test workload using a harmless command that exits with a non-zero code.",
        "Inspect Pod status, restart count and events.",
        "Collect current and previous-container logs.",
        "Identify the configured command and exit reason.",
        "Correct the test workload command.",
        "Verify the restart loop stops and the Pod reaches the expected state.",
        "Remove the test workload."
      ]
    },
    {
      title: "Lab 3: Diagnose a failed readiness probe",
      objective:
        "Learn how a running Pod can be excluded from Service traffic.",
      steps: [
        "Deploy a test application with a deliberately incorrect readiness path.",
        "Inspect the Pod condition and probe events.",
        "Inspect the Service EndpointSlices.",
        "Correct the path to match the application's actual health endpoint.",
        "Verify the Pod becomes Ready and the endpoint is published.",
        "Delete the lab resources."
      ]
    },
    {
      title: "Lab 4: Investigate memory termination",
      objective:
        "Understand OOMKilled and distinguish it from an ordinary application exit.",
      steps: [
        "Use an isolated cluster and a disposable workload with a controlled memory test.",
        "Set conservative resource limits and avoid running the test on a shared production node.",
        "Inspect termination reason and events.",
        "Compare resource settings with available metrics.",
        "Adjust the test configuration within the lab's capacity limits.",
        "Verify the workload stays within its intended memory envelope.",
        "Delete the test resources."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What is the difference between Pod phase and container state?",
      answer:
        "Pod phase summarizes the Pod's overall lifecycle. Container states such as Waiting, Running and Terminated describe individual containers. A Pod's phase alone does not explain why an application is failing."
    },
    {
      question: "How do you troubleshoot a Pod stuck in Pending?",
      answer:
        "Start with kubectl describe pod and scheduler events. Check requests versus eligible-node capacity, taints, affinity, topology, quotas and PVC binding."
    },
    {
      question: "What is CrashLoopBackOff?",
      answer:
        "It indicates repeated container failures followed by restart backoff. Inspect previous logs, exit reason, events, configuration, dependencies, probes and memory termination."
    },
    {
      question: "What is the difference between ErrImagePull and ImagePullBackOff?",
      answer:
        "ErrImagePull represents an image-pull failure. ImagePullBackOff indicates Kubernetes is backing off before retrying after repeated failures."
    },
    {
      question: "How do you investigate OOMKilled?",
      answer:
        "Check termination reason, historical memory metrics, container limits, runtime memory, concurrency, application behavior and node pressure. Current metrics may miss the peak."
    },
    {
      question: "What is the difference between readiness and liveness probes?",
      answer:
        "Readiness controls whether the Pod is considered ready to serve traffic. Liveness determines whether a container should be restarted when it is considered unhealthy."
    },
    {
      question: "What is a startup probe?",
      answer:
        "It gives a slow-starting container time to initialize before liveness and readiness checks that are gated by the startup probe begin."
    },
    {
      question: "How do you troubleshoot CreateContainerConfigError?",
      answer:
        "Inspect Pod events and configuration references. Validate ConfigMaps, Secrets, required keys, namespaces and recent manifest changes without exposing secret values."
    },
    {
      question: "Why can a Running Pod receive no traffic?",
      answer:
        "It may not be Ready, the Service selector or target port may be wrong, EndpointSlices may be empty, or network policy and routing may block traffic."
    },
    {
      question: "How do you troubleshoot FailedScheduling?",
      answer:
        "Inspect the exact scheduler event, eligible nodes, requests, allocatable capacity, taints, affinity, topology constraints, quotas and PVC state."
    },
    {
      question: "What is the difference between kubectl logs and kubectl logs --previous?",
      answer:
        "The ordinary logs command reads the current container instance. --previous reads the preceding terminated instance when available, which is useful for restart loops."
    },
    {
      question: "How do you investigate a Pod that fails only on one node?",
      answer:
        "Compare affected and healthy Pods, inspect node conditions, CSI/CNI components, kubelet and runtime health, and check for node-specific storage or networking issues."
    },
    {
      question: "How do you safely troubleshoot a stuck Terminating Pod?",
      answer:
        "Inspect deletion timestamp, finalizers, events, node reachability, shutdown hooks and volume detach state. Avoid force deletion until stateful and storage risks are understood."
    },
    {
      question: "When should you roll back a Deployment?",
      answer:
        "When evidence links the incident to a new revision and the prior revision is known-good and compatible with current data and infrastructure. A rollback does not automatically reverse external side effects."
    },
    {
      question: "What does a PodDisruptionBudget protect?",
      answer:
        "It limits voluntary disruptions to help preserve availability. It does not prevent every involuntary failure, such as a node crash."
    },
    {
      question: "How do ConfigMaps and Secrets cause Pod startup failures?",
      answer:
        "A required referenced object or key may be missing or incorrect. Applications may also start with invalid configuration values even when the object exists."
    },
    {
      question: "How do you diagnose CPU throttling?",
      answer:
        "Inspect CPU usage, throttling metrics, requests and limits, latency and concurrency. CPU throttling can slow health checks without necessarily causing an OOM or container exit."
    },
    {
      question: "How do you troubleshoot node pressure and evictions?",
      answer:
        "Inspect Pod termination reason, node conditions, ephemeral storage, memory, requests, limits and node events. Follow the platform runbook for node repair or replacement."
    },
    {
      question: "Why should Pods not be deleted as the first troubleshooting step?",
      answer:
        "Deletion may remove evidence, interrupt healthy capacity, trigger the same failure again or affect stateful workloads. Diagnose the root cause before choosing a recovery action."
    },
    {
      question: "What should a production Pod incident report contain?",
      answer:
        "Impact, timeline, affected workloads, evidence, diagnostic steps, confirmed root cause, corrective action, rollback decision, validation results and preventive actions."
    }
  ],

  references: [
    {
      title: "Debug Pods",
      url: "https://kubernetes.io/docs/tasks/debug/debug-application/debug-pods/"
    },
    {
      title: "Troubleshooting Applications",
      url: "https://kubernetes.io/docs/tasks/debug/debug-application/"
    },
    {
      title: "Pod Lifecycle",
      url: "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/"
    },
    {
      title: "Container Probes",
      url: "https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/"
    },
    {
      title: "Resource Management for Pods and Containers",
      url: "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/"
    },
    {
      title: "Deployments and Rollbacks",
      url: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/"
    },
    {
      title: "Kubernetes Persistent Volumes",
      url: "https://kubernetes.io/docs/concepts/storage/persistent-volumes/"
    },
    {
      title: "Kubernetes Network Policies",
      url: "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
    }
  ]
};

export default podFailuresGuide;
