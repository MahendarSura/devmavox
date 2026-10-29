
export interface PodSchedulingStep {
  title: string;
  purpose: string;
  commands: string[];
  expectedEvidence: string[];
  nextAction: string;
}

export interface PodSchedulingCase {
  title: string;
  symptoms: string[];
  rootCauses: string[];
  diagnostics: PodSchedulingStep[];
  resolution: string[];
  verification: string[];
  prevention: string[];
}

export interface PodSchedulingIncident {
  title: string;
  severity: string;
  scenario: string;
  investigation: string[];
  rootCause: string;
  recovery: string[];
  rollback: string;
  verification: string[];
}

export interface PodSchedulingGuide {
  title: string;
  slug: string;
  category: string;
  description: string;
  symptoms: string[];
  safetyChecks: string[];
  evidenceCollection: string[];
  diagnosticWorkflow: PodSchedulingStep[];
  failureCases: PodSchedulingCase[];
  incidentScenarios: PodSchedulingIncident[];
  commandReference: {
    command: string;
    purpose: string;
    interpretation: string;
  }[];
  recoveryRunbook: string[];
  prevention: string[];
  monitoring: string[];
  cicdValidation: string[];
  incidentReportTemplate: string[];
  labs: {
    title: string;
    objective: string;
    steps: string[];
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

export const podSchedulingGuide: PodSchedulingGuide = {
  title: "Kubernetes Pod Scheduling - Production Troubleshooting",
  slug: "pod-scheduling",
  category: "Kubernetes",
  description:
    "Complete production troubleshooting for Pending Pods, FailedScheduling, CPU and memory shortages, taints, tolerations, node affinity, topology spread, PVC binding, quotas, autoscaling, node pressure, rollout capacity, scheduler health, safe recovery, and prevention.",

  symptoms: [
    "Pod remains Pending for several minutes.",
    "FailedScheduling events repeatedly appear.",
    "Deployment rollout is stuck because new Pods cannot schedule.",
    "HPA increases replicas but the additional Pods remain Pending.",
    "Cluster autoscaler does not add nodes.",
    "Insufficient CPU or memory prevents scheduling.",
    "Node selector or affinity matches no eligible nodes.",
    "Taints prevent a workload from using nodes.",
    "Pod anti-affinity prevents additional replicas from scheduling.",
    "Topology spread constraints cannot be satisfied.",
    "PersistentVolumeClaim remains Pending.",
    "Namespace quota prevents new resources.",
    "Nodes are NotReady or under resource pressure.",
    "Rolling-update surge replicas exceed available capacity.",
    "Scheduling gates or admission policies block workload progress.",
  ],

  safetyChecks: [
    "Confirm the correct cluster, context, namespace, and environment.",
    "Identify production impact and count healthy replicas.",
    "Preserve Pod YAML, events, controller status, and node information.",
    "Review recent deployment, Helm, GitOps, storage, and node-pool changes.",
    "Use read-only diagnostics before changing production resources.",
    "Confirm the actual scheduling error instead of assuming a CPU shortage.",
    "Obtain required production approval before making changes.",
    "Check PodDisruptionBudgets and stateful workloads before node maintenance.",
    "Do not delete PVCs, PVs, or production nodes as a first troubleshooting step.",
    "Do not remove security-related taints merely to force scheduling.",
    "Do not lower resource requests without performance and capacity evidence.",
    "Apply fixes through the owning Deployment, StatefulSet, Helm, or GitOps source.",
  ],

  evidenceCollection: [
    "Incident ID, start time, cluster, namespace, and workload.",
    "Pod phase, nodeName, schedulerName, conditions, and events.",
    "Desired, updated, ready, and available replicas.",
    "CPU and memory requests, limits, init-container requests, and injected sidecars.",
    "Node labels, taints, conditions, allocatable capacity, and allocated requests.",
    "Node-pool size, configured maximum, and autoscaler events.",
    "Node affinity, pod affinity, anti-affinity, and topology spread constraints.",
    "PVC, PV, StorageClass, CSI events, and storage topology.",
    "ResourceQuota, LimitRange, scheduling gates, and admission errors.",
    "Recent commits, rendered manifests, rollout revisions, and infrastructure changes.",
    "Recovery actions, approvals, verification results, and rollback decisions.",
  ],

  diagnosticWorkflow: [
    {
      title: "1. Confirm the cluster and incident scope",
      purpose:
        "Determine whether the issue affects one Pod, one workload, a node pool, or the cluster.",
      commands: [
        "kubectl config current-context",
        "kubectl get pods -A -o wide",
        "kubectl get nodes -o wide",
        "kubectl get events -A --sort-by=.metadata.creationTimestamp",
      ],
      expectedEvidence: [
        "A single Pending Pod may indicate a workload-specific constraint.",
        "Many unrelated Pending Pods may indicate shared capacity or infrastructure failure.",
        "NotReady nodes may explain a sudden reduction in eligible capacity.",
      ],
      nextAction:
        "Record the affected workload, healthy replica count, incident timestamp, and recent changes.",
    },
    {
      title: "2. Inspect the affected Pod",
      purpose:
        "Read the scheduler's actual reason before choosing a recovery action.",
      commands: [
        "kubectl get pods -n <namespace> -o wide",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get pod <pod-name> -n <namespace> -o yaml",
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
      ],
      expectedEvidence: [
        "FailedScheduling may identify insufficient CPU, memory, taints, affinity, or volume binding.",
        "An empty nodeName usually means the Pod has not been assigned to a node.",
        "A populated nodeName means image pulling, volume mounting, or container startup may be the actual problem.",
      ],
      nextAction:
        "Follow the exact event message into the relevant failure case below.",
    },
    {
      title: "3. Check resource requests and node capacity",
      purpose:
        "Determine whether an eligible node has enough allocatable resources for the Pod.",
      commands: [
        "kubectl describe nodes",
        "kubectl describe node <node-name>",
        "kubectl get pod <pod-name> -n <namespace> -o yaml",
        "kubectl top nodes",
        "kubectl top pods -A",
      ],
      expectedEvidence: [
        "Node Allocatable shows the resources available for Pods.",
        "Allocated resources show requests and limits already assigned.",
        "Low actual CPU usage does not prove that sufficient scheduling capacity exists.",
        "Metrics commands require a working metrics source such as Metrics Server.",
      ],
      nextAction:
        "Compare effective Pod requests against eligible-node capacity. Inspect init containers, sidecars, and Pod overhead where applicable.",
    },
    {
      title: "4. Validate taints, tolerations, and placement",
      purpose:
        "Check whether the workload is allowed and configured to use the available nodes.",
      commands: [
        "kubectl get nodes --show-labels",
        "kubectl describe node <node-name>",
        "kubectl get pod <pod-name> -n <namespace> -o yaml",
      ],
      expectedEvidence: [
        "Node descriptions show taints and conditions.",
        "Pod YAML shows tolerations, nodeSelector, affinity, and topology constraints.",
        "Required affinity is a hard constraint; preferred affinity is a scheduling preference.",
      ],
      nextAction:
        "Compare exact label keys, values, taint effects, and affinity expressions. Correct only a proven mismatch.",
    },
    {
      title: "5. Inspect storage prerequisites",
      purpose:
        "Find PVC binding or storage-topology problems that prevent scheduling.",
      commands: [
        "kubectl get pvc -n <namespace>",
        "kubectl describe pvc <pvc-name> -n <namespace>",
        "kubectl get pv",
        "kubectl get storageclass",
      ],
      expectedEvidence: [
        "A Pending claim may indicate provisioning, capacity, access-mode, or topology problems.",
        "A PV may restrict use to a particular zone.",
        "Storage events can identify an unavailable provisioner or failed volume provisioning.",
      ],
      nextAction:
        "Validate the StorageClass, CSI provisioner, access mode, capacity, and compatible node topology.",
    },
    {
      title: "6. Inspect quota and admission constraints",
      purpose:
        "Distinguish a Pod that cannot schedule from a Pod that cannot be created.",
      commands: [
        "kubectl describe resourcequota -n <namespace>",
        "kubectl get limitrange -n <namespace> -o yaml",
        "kubectl describe deployment <deployment-name> -n <namespace>",
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
      ],
      expectedEvidence: [
        "Quota exhaustion may prevent new Pods or resource allocation.",
        "LimitRange defaults may affect effective resource requests.",
        "Admission webhook errors may reject Pod creation before scheduling begins.",
      ],
      nextAction:
        "Resolve the actual quota, policy, or admission failure through the owning platform team.",
    },
    {
      title: "7. Inspect autoscaling and node health",
      purpose:
        "Determine why expected capacity is not becoming available.",
      commands: [
        "kubectl get nodes -o wide",
        "kubectl describe node <node-name>",
        "kubectl get events -A --sort-by=.metadata.creationTimestamp",
      ],
      expectedEvidence: [
        "Nodes may be NotReady, cordoned, or affected by resource pressure.",
        "Autoscaler events may reveal node-pool limits or unsatisfied Pod constraints.",
        "Cloud quota, subnet IP exhaustion, or instance availability may prevent new nodes.",
      ],
      nextAction:
        "Inspect autoscaler logs and cloud-provider diagnostics using approved operational access.",
    },
    {
      title: "8. Confirm the root cause before fixing",
      purpose:
        "Avoid making a change based on a misleading or incomplete event.",
      commands: [
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl describe nodes",
        "kubectl get pvc -n <namespace>",
        "kubectl get events -A --sort-by=.metadata.creationTimestamp",
      ],
      expectedEvidence: [
        "The proposed cause is supported by scheduler events or live configuration.",
        "The same evidence explains why eligible nodes or prerequisites are unavailable.",
        "Alternative causes have been checked where appropriate.",
      ],
      nextAction:
        "Select the smallest safe corrective action, validate it, and follow change-control requirements.",
    },
  ],

  failureCases: [
    {
      title: "Insufficient CPU or memory",
      symptoms: [
        "Pod remains Pending.",
        "Events mention insufficient CPU or memory.",
        "New replicas cannot schedule after a rollout or scale-out.",
      ],
      rootCauses: [
        "Requests increased in a recent release.",
        "Existing workloads reserve most allocatable resources.",
        "Node allocatable capacity is lower than raw machine capacity.",
        "Placement constraints restrict the eligible node pool.",
        "Init containers or injected sidecars change effective scheduling requirements.",
      ],
      diagnostics: [
        {
          title: "Inspect the scheduler event",
          purpose: "Identify the resource that blocks placement.",
          commands: [
            "kubectl describe pod <pod-name> -n <namespace>",
          ],
          expectedEvidence: [
            "FailedScheduling identifies insufficient CPU, memory, or another constraint.",
          ],
          nextAction:
            "Compare the request with allocatable resources on eligible nodes.",
        },
        {
          title: "Inspect node resource reservations",
          purpose: "Review allocatable resources and existing requests.",
          commands: [
            "kubectl describe node <node-name>",
            "kubectl describe nodes",
          ],
          expectedEvidence: [
            "The Allocated resources section shows scheduled workload requests.",
          ],
          nextAction:
            "Decide whether the shortage requires suitable additional capacity or a justified request correction.",
        },
      ],
      resolution: [
        "If requests accurately reflect application needs, add suitable capacity through the approved process.",
        "If requests are demonstrably oversized, right-size them using historical peaks and load-test evidence.",
        "Review hard placement constraints that unnecessarily reduce eligible capacity.",
        "Do not lower memory requests blindly to force placement.",
      ],
      verification: [
        "Confirm that the Pod receives a node assignment.",
        "Confirm the Pod becomes Ready.",
        "Check that existing critical workloads remain healthy.",
        "Verify the original scheduling error does not recur.",
      ],
      prevention: [
        "Review resource requests in pull requests.",
        "Monitor allocatable capacity and requested-resource headroom.",
        "Test production-like rollout surge capacity.",
      ],
    },
    {
      title: "Untolerated node taint",
      symptoms: [
        "FailedScheduling mentions an untolerated taint.",
        "Dedicated nodes exist but the workload cannot use them.",
      ],
      rootCauses: [
        "The Pod lacks a matching toleration.",
        "The toleration key, value, or effect is incorrect.",
        "The workload is not authorized for a dedicated node pool.",
      ],
      diagnostics: [
        {
          title: "Inspect node taints",
          purpose: "Read the exact taint configuration.",
          commands: [
            "kubectl describe node <node-name>",
          ],
          expectedEvidence: [
            "The Taints section lists taint keys, values, and effects.",
          ],
          nextAction:
            "Compare the taint with the Pod tolerations and intended placement policy.",
        },
        {
          title: "Inspect Pod placement rules",
          purpose: "Check the live tolerations and node selectors.",
          commands: [
            "kubectl get pod <pod-name> -n <namespace> -o yaml",
            "kubectl get nodes --show-labels",
          ],
          expectedEvidence: [
            "The toleration may be missing or may not match the taint.",
            "The intended pool may also require a nodeSelector or node affinity.",
          ],
          nextAction:
            "Confirm the workload is intended for that node pool before changing its template.",
        },
      ],
      resolution: [
        "Add a narrowly scoped toleration only if the workload is authorized for the pool.",
        "If the taint is intentional, keep it and provide suitable nodes for the workload.",
        "Do not remove a cluster-wide taint simply to make one Pod schedule.",
      ],
      verification: [
        "Confirm the Pod schedules onto an intended node.",
        "Verify the node pool's security and isolation requirements remain intact.",
      ],
      prevention: [
        "Version-control taints, tolerations, labels, and affinity together.",
        "Add placement-policy checks to CI.",
      ],
    },
    {
      title: "Node selector or required node affinity mismatch",
      symptoms: [
        "Events mention node selector or affinity mismatch.",
        "Ready nodes exist but no eligible node is found.",
      ],
      rootCauses: [
        "Required node labels are missing.",
        "The Pod template references an obsolete label.",
        "Required affinity expressions conflict.",
        "The required architecture, zone, or hardware is unavailable.",
      ],
      diagnostics: [
        {
          title: "Compare live labels and requirements",
          purpose: "Find the exact mismatch.",
          commands: [
            "kubectl get nodes --show-labels",
            "kubectl get pod <pod-name> -n <namespace> -o yaml",
            "kubectl describe pod <pod-name> -n <namespace>",
          ],
          expectedEvidence: [
            "Actual node labels do not satisfy one or more required expressions.",
          ],
          nextAction:
            "Determine whether the node configuration or the workload requirement is incorrect.",
        },
      ],
      resolution: [
        "Restore an accidentally removed label through approved infrastructure configuration.",
        "Correct an obsolete selector in the owning workload template.",
        "Provision suitable nodes if the placement requirement is valid.",
        "Do not add arbitrary labels without understanding their security and hardware meaning.",
      ],
      verification: [
        "Confirm the new Pod template matches the intended eligible nodes.",
        "Verify actual placement and application health.",
      ],
      prevention: [
        "Use documented, stable node labels.",
        "Validate affinity against supported node pools in CI.",
      ],
    },
    {
      title: "PersistentVolumeClaim remains Pending",
      symptoms: [
        "Events mention an unbound PVC.",
        "The claim remains Pending.",
        "Storage zone and compute placement conflict.",
      ],
      rootCauses: [
        "StorageClass is missing or incorrect.",
        "CSI provisioning fails.",
        "Requested capacity or access mode cannot be satisfied.",
        "Storage topology conflicts with node placement.",
      ],
      diagnostics: [
        {
          title: "Inspect the claim and storage class",
          purpose: "Find provisioning and binding errors.",
          commands: [
            "kubectl get pvc -n <namespace>",
            "kubectl describe pvc <pvc-name> -n <namespace>",
            "kubectl get storageclass",
            "kubectl get pv",
          ],
          expectedEvidence: [
            "PVC events may identify provisioning, access-mode, capacity, or topology failures.",
          ],
          nextAction:
            "Correct the specific storage configuration or provisioning failure.",
        },
      ],
      resolution: [
        "Confirm the intended StorageClass before changing a claim reference.",
        "Resolve CSI, permissions, capacity, or topology failures based on actual events.",
        "Review whether WaitForFirstConsumer is appropriate for topology-aware provisioning.",
        "Never delete a production PVC or PV as a generic troubleshooting action.",
      ],
      verification: [
        "Verify the PVC reaches Bound when expected.",
        "Confirm the Pod schedules and the volume mounts.",
        "Validate application data integrity for stateful workloads.",
      ],
      prevention: [
        "Test storage provisioning in every supported zone.",
        "Monitor Pending PVCs and CSI errors.",
        "Validate storage requirements in CI.",
      ],
    },
    {
      title: "Pod anti-affinity blocks additional replicas",
      symptoms: [
        "One replica schedules but additional replicas remain Pending.",
        "Events mention required pod anti-affinity.",
      ],
      rootCauses: [
        "Hard anti-affinity requires more distinct nodes than are available.",
        "The selector matches more Pods than intended.",
        "The topologyKey does not match the intended failure domain.",
      ],
      diagnostics: [
        {
          title: "Inspect anti-affinity and placement",
          purpose: "Determine why existing Pods exclude candidate nodes.",
          commands: [
            "kubectl get pods -n <namespace> --show-labels -o wide",
            "kubectl get pod <pod-name> -n <namespace> -o yaml",
            "kubectl get nodes --show-labels",
          ],
          expectedEvidence: [
            "Existing matching Pods may occupy every eligible node or topology domain.",
          ],
          nextAction:
            "Confirm whether hard separation is required or merely preferred.",
        },
      ],
      resolution: [
        "Add enough eligible nodes when strict separation is required.",
        "Consider preferred anti-affinity if strict separation is not a requirement.",
        "Do not weaken failure-domain requirements without reviewing availability objectives.",
      ],
      verification: [
        "Verify replicas are distributed as intended.",
        "Test service availability during a node failure.",
      ],
      prevention: [
        "Test scale-out with production replica counts.",
        "Review hard anti-affinity during capacity planning.",
      ],
    },
    {
      title: "Topology spread constraints block scheduling",
      symptoms: [
        "Pods remain Pending after a zone becomes unavailable.",
        "Events mention topology spread constraints.",
      ],
      rootCauses: [
        "maxSkew cannot be satisfied across eligible domains.",
        "Some nodes lack the required topology label.",
        "The selector or whenUnsatisfiable policy is incorrect for the workload.",
      ],
      diagnostics: [
        {
          title: "Inspect topology and matching Pods",
          purpose: "Compare required distribution with current placement.",
          commands: [
            "kubectl get pod <pod-name> -n <namespace> -o yaml",
            "kubectl get nodes --show-labels",
            "kubectl get pods -n <namespace> --show-labels -o wide",
          ],
          expectedEvidence: [
            "The required topology domain may be missing or the allowed skew may be exceeded.",
          ],
          nextAction:
            "Calculate whether another Pod can be placed without violating the constraint.",
        },
      ],
      resolution: [
        "Restore missing topology labels through approved infrastructure configuration.",
        "Add capacity in the required domain if the distribution requirement is valid.",
        "Change maxSkew or whenUnsatisfiable only after reviewing availability and failure-domain requirements.",
      ],
      verification: [
        "Verify the actual distribution across eligible domains.",
        "Confirm application availability after scheduling recovers.",
      ],
      prevention: [
        "Validate topology labels across node pools.",
        "Test zone-loss and scale-out scenarios.",
      ],
    },
    {
      title: "Cluster autoscaler fails to add nodes",
      symptoms: [
        "Pods remain Pending because of insufficient capacity.",
        "Node count does not increase after a scale-up trigger.",
      ],
      rootCauses: [
        "Node-pool maximum size has been reached.",
        "Cloud quota, subnet IPs, or instance availability blocks provisioning.",
        "No node group can satisfy the Pod constraints.",
        "Autoscaler permissions or configuration are incorrect.",
      ],
      diagnostics: [
        {
          title: "Inspect the Pod and node pools",
          purpose: "Determine whether any configured pool could host the Pod.",
          commands: [
            "kubectl describe pod <pod-name> -n <namespace>",
            "kubectl get nodes -o wide",
            "kubectl get events -A --sort-by=.metadata.creationTimestamp",
          ],
          expectedEvidence: [
            "Scheduling events identify the constraints preventing placement.",
            "Autoscaler or cloud events may show a pool limit or provisioning failure.",
          ],
          nextAction:
            "Inspect autoscaler logs and cloud-provider diagnostics using approved access.",
        },
      ],
      resolution: [
        "Increase pool limits only after reviewing cost, quota, and capacity requirements.",
        "Resolve subnet IP exhaustion or cloud quota problems at the infrastructure layer.",
        "Provide a node type that satisfies the workload's real requirements.",
        "Verify new nodes join, become Ready, and have the correct labels and taints.",
      ],
      verification: [
        "Confirm the autoscaler successfully provisions capacity.",
        "Confirm Pending Pods schedule and become Ready.",
      ],
      prevention: [
        "Monitor autoscaler scale-up failures.",
        "Test node-pool scaling before major releases.",
        "Track cloud quota and subnet IP headroom.",
      ],
    },
    {
      title: "Node NotReady or resource pressure",
      symptoms: [
        "Candidate nodes are NotReady.",
        "Node conditions report MemoryPressure, DiskPressure, or PIDPressure.",
        "A node failure leaves insufficient eligible capacity.",
      ],
      rootCauses: [
        "Kubelet or container runtime is unhealthy.",
        "Disk space or inode exhaustion.",
        "Memory pressure or PID exhaustion.",
        "Network, CNI, or underlying infrastructure failure.",
      ],
      diagnostics: [
        {
          title: "Inspect node health",
          purpose: "Identify the node condition that reduces capacity.",
          commands: [
            "kubectl get nodes",
            "kubectl describe node <node-name>",
            "kubectl get pods -A -o wide",
          ],
          expectedEvidence: [
            "Node conditions and events identify readiness or pressure problems.",
          ],
          nextAction:
            "Use the platform's node-health runbook and evaluate workload availability before maintenance.",
        },
      ],
      resolution: [
        "Diagnose kubelet, runtime, disk, network, or infrastructure issues using approved tools.",
        "Drain a node only after checking PodDisruptionBudgets, replicas, and stateful workloads.",
        "Repair or replace the node through the approved infrastructure workflow.",
      ],
      verification: [
        "Verify node readiness and allocatable capacity.",
        "Confirm critical workloads remain available.",
      ],
      prevention: [
        "Monitor node conditions and resource headroom.",
        "Maintain tested node replacement and recovery procedures.",
      ],
    },
    {
      title: "Rolling update surge exceeds capacity",
      symptoms: [
        "Old replicas remain healthy but new replicas stay Pending.",
        "Deployment rollout stops progressing.",
      ],
      rootCauses: [
        "maxSurge temporarily increases resource demand.",
        "The new Pod template has larger resource requests.",
        "Hard anti-affinity prevents old and new replicas from sharing eligible nodes.",
      ],
      diagnostics: [
        {
          title: "Inspect rollout and replica sets",
          purpose: "Compare temporary rollout demand with available capacity.",
          commands: [
            "kubectl rollout status deployment/<deployment-name> -n <namespace>",
            "kubectl get deployment <deployment-name> -n <namespace> -o yaml",
            "kubectl get replicasets -n <namespace> -o wide",
          ],
          expectedEvidence: [
            "New ReplicaSet Pods may remain Pending while old replicas stay available.",
          ],
          nextAction:
            "Inspect scheduling events and determine whether capacity or placement constraints block rollout.",
        },
      ],
      resolution: [
        "Add suitable capacity when the surge is necessary to preserve availability.",
        "Review maxSurge and maxUnavailable against the service's availability objectives.",
        "Roll back through the approved release workflow if the new template introduced invalid constraints.",
      ],
      verification: [
        "Verify rollout completion and available replicas.",
        "Check application health and error rates.",
      ],
      prevention: [
        "Include surge capacity in planning.",
        "Test rollout behavior at production scale.",
      ],
    },
    {
      title: "ResourceQuota or admission policy blocks Pod creation",
      symptoms: [
        "Deployment events show failed Pod creation.",
        "Errors mention quota, policy, or an admission webhook.",
        "Expected Pods do not exist.",
      ],
      rootCauses: [
        "Namespace quota has been exhausted.",
        "LimitRange defaults affect resource settings.",
        "An admission policy rejects the Pod.",
        "A webhook is unavailable or times out.",
      ],
      diagnostics: [
        {
          title: "Inspect namespace policy and controller events",
          purpose: "Determine whether creation is rejected before scheduling.",
          commands: [
            "kubectl describe resourcequota -n <namespace>",
            "kubectl get limitrange -n <namespace> -o yaml",
            "kubectl describe deployment <deployment-name> -n <namespace>",
            "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
          ],
          expectedEvidence: [
            "The error may identify exhausted quota, invalid settings, or a failing webhook.",
          ],
          nextAction:
            "Resolve the responsible quota or admission issue before returning to scheduler diagnostics.",
        },
      ],
      resolution: [
        "Correct invalid resource requests or configuration.",
        "Request a reviewed quota increase if approved workload demand requires it.",
        "Repair the responsible webhook or policy through the platform team's change process.",
        "Do not broadly disable admission or security controls to bypass an incident.",
      ],
      verification: [
        "Verify Pod creation succeeds.",
        "Then inspect node assignment and application readiness.",
      ],
      prevention: [
        "Alert before quota exhaustion.",
        "Test admission policy changes in staging.",
        "Validate rendered manifests in CI.",
      ],
    },
  ],

  incidentScenarios: [
    {
      title: "Production Deployment has zero new replicas scheduled",
      severity: "High; escalate if production availability is threatened.",
      scenario:
        "A release changes resource requests and placement rules. The Deployment starts creating replicas, but the new Pods remain Pending while the old version continues serving traffic.",
      investigation: [
        "Check Deployment and ReplicaSet counts.",
        "Capture Pod describe output and FailedScheduling events.",
        "Compare the new Pod template with the last working release.",
        "Inspect node allocatable resources and required affinity.",
        "Check whether the rollout's maxSurge creates additional capacity demand.",
      ],
      rootCause:
        "Confirm from scheduler events and the effective Pod template. Do not assume resource shortage without checking placement constraints.",
      recovery: [
        "Preserve the old healthy replicas while investigating.",
        "Correct the proven request or placement error through the source-controlled manifest.",
        "If the new release is unsafe and rollback is approved, use the established release or GitOps rollback process.",
        "Monitor the rollout and application health.",
      ],
      rollback:
        "Roll back if the release threatens service availability or violates the approved recovery criteria. Confirm that the previous version can still schedule and use its required dependencies.",
      verification: [
        "New Pods receive node assignments.",
        "The expected number of replicas becomes Ready.",
        "Deployment rollout completes.",
        "Service endpoints and application error rates recover.",
      ],
    },
    {
      title: "HPA scales out but Pods remain Pending",
      severity: "Medium to High depending on capacity and SLO impact.",
      scenario:
        "Traffic rises and the Horizontal Pod Autoscaler requests additional replicas, but the cluster cannot schedule them.",
      investigation: [
        "Check HPA desired and current replicas.",
        "Inspect Pending Pods and FailedScheduling events.",
        "Compare requested CPU and memory with eligible-node allocatable capacity.",
        "Inspect autoscaler events, pool limits, cloud quotas, and subnet IP capacity.",
        "Check affinity, anti-affinity, and topology spread restrictions.",
      ],
      rootCause:
        "The workload replica count increased faster than eligible compute capacity, or a hard scheduling constraint prevents the available nodes from hosting the new replicas.",
      recovery: [
        "Follow the approved capacity-expansion procedure when additional nodes are required.",
        "Resolve autoscaler or infrastructure limits if scale-up is failing.",
        "Correct unjustified placement constraints only after reviewing availability and security requirements.",
        "Use approved traffic-management or load-shedding procedures if service demand exceeds safe capacity.",
      ],
      rollback:
        "Do not disable HPA or reduce replicas blindly. Use the service's approved traffic and capacity strategy if scaling worsens the incident.",
      verification: [
        "Autoscaler successfully provisions suitable nodes where required.",
        "Pending Pods schedule and become Ready.",
        "Application latency, errors, and saturation return to acceptable levels.",
      ],
    },
    {
      title: "Stateful workload blocked by volume topology",
      severity: "High when a critical stateful service cannot recover.",
      scenario:
        "A StatefulSet Pod remains Pending because its PVC is not bound or the existing volume is restricted to a zone without eligible compute capacity.",
      investigation: [
        "Inspect Pod events and PVC status.",
        "Read the StorageClass binding mode and provisioner.",
        "Inspect PV node affinity where a volume already exists.",
        "Compare volume topology with node affinity and eligible node zones.",
        "Check CSI controller and cloud storage events.",
      ],
      rootCause:
        "Storage provisioning or topology restrictions prevent the Pod and its volume from obtaining a compatible placement.",
      recovery: [
        "Correct the StorageClass or provisioner problem when confirmed.",
        "Restore suitable compute capacity in the required topology if that is the intended design.",
        "Follow the storage team's recovery procedure for existing volumes.",
        "Preserve production data and avoid deleting claims as a workaround.",
      ],
      rollback:
        "Use the approved application and storage recovery plan. Never delete a production PVC or PV merely to clear Pending status.",
      verification: [
        "The PVC reaches the expected binding state.",
        "The Pod is scheduled and the volume mounts.",
        "The application passes its data-integrity and readiness checks.",
      ],
    },
  ],

  commandReference: [
    {
      command: "kubectl config current-context",
      purpose: "Confirm the current cluster context.",
      interpretation: "Stop if the target cluster is not the intended environment.",
    },
    {
      command: "kubectl get pods -n <namespace> -o wide",
      purpose: "Inspect Pod status and node assignment.",
      interpretation: "An empty node assignment indicates that scheduling may not have completed.",
    },
    {
      command: "kubectl describe pod <pod-name> -n <namespace>",
      purpose: "Inspect conditions, scheduling information, and events.",
      interpretation: "Use the exact event message to choose the next diagnostic branch.",
    },
    {
      command: "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp",
      purpose: "Review recent namespace events.",
      interpretation: "Correlate scheduling failures with deployment and infrastructure changes.",
    },
    {
      command: "kubectl describe nodes",
      purpose: "Inspect node capacity, allocatable resources, taints, and allocated requests.",
      interpretation: "Compare eligible-node capacity with the effective Pod requests.",
    },
    {
      command: "kubectl get nodes --show-labels",
      purpose: "Inspect labels used by selectors and affinity.",
      interpretation: "Check exact key and value matches.",
    },
    {
      command: "kubectl get pvc -n <namespace>",
      purpose: "Check claim status.",
      interpretation: "A Pending claim requires storage provisioning and binding investigation.",
    },
    {
      command: "kubectl describe resourcequota -n <namespace>",
      purpose: "Inspect quota usage.",
      interpretation: "Determine whether namespace limits block new resources.",
    },
    {
      command: "kubectl rollout status deployment/<deployment-name> -n <namespace>",
      purpose: "Check Deployment rollout progress.",
      interpretation: "A stalled rollout requires inspection of the latest ReplicaSet and its Pods.",
    },
    {
      command: "kubectl top nodes",
      purpose: "Inspect actual CPU and memory usage when metrics are available.",
      interpretation: "Usage is useful context but does not replace scheduler request accounting.",
    },
  ],

  recoveryRunbook: [
    "Confirm the affected cluster, namespace, workload, severity, and customer impact.",
    "Preserve Pod YAML, events, ReplicaSet status, node information, and recent change history.",
    "Identify whether the Pod lacks nodeName or has already been assigned to a node.",
    "Follow the exact scheduling event to the appropriate failure case.",
    "Confirm the root cause with live configuration and relevant infrastructure evidence.",
    "Select the smallest safe correction and obtain required approval.",
    "Validate the source manifest and review its impact before applying.",
    "Deploy through the approved Helm, GitOps, or CI/CD workflow.",
    "Verify node assignment, Pod readiness, replica availability, and application health.",
    "Execute the approved rollback if recovery criteria fail.",
    "Record the confirmed root cause, corrective action, and preventive work.",
  ],

  prevention: [
    "Set realistic CPU and memory requests using production metrics and load tests.",
    "Maintain sufficient capacity for expected peak load and rolling-update surge.",
    "Version-control node labels, taints, tolerations, affinity, and topology spread.",
    "Review hard anti-affinity against maximum replicas and eligible node counts.",
    "Validate StorageClass, CSI, access modes, and zone topology.",
    "Monitor namespace quotas and LimitRange defaults.",
    "Test autoscaler scale-up and node-pool replacement before production changes.",
    "Maintain node-health and node-drain runbooks.",
    "Test production-like rollout and zone-failure scenarios.",
    "Use source-controlled manifests as the configuration source of truth.",
    "Document service-specific scheduling requirements and recovery criteria.",
  ],

  monitoring: [
    "Alert on prolonged Pending Pods for critical workloads.",
    "Monitor FailedScheduling event rates and recurring scheduling reasons.",
    "Track Deployment available replicas against the required minimum.",
    "Monitor requested resources against node allocatable capacity.",
    "Alert on autoscaler scale-up failures and node-pool maximums.",
    "Monitor node NotReady, MemoryPressure, DiskPressure, and PIDPressure.",
    "Alert on PVC Pending duration and storage provisioning errors.",
    "Track rollout duration and prolonged replica unavailability.",
    "Monitor scheduler latency and health through available control-plane observability.",
    "Correlate scheduling events with deployment and infrastructure changes.",
  ],

  cicdValidation: [
    "Parse and schema-validate Kubernetes manifests.",
    "Run kubectl apply --dry-run=server against an appropriate test environment.",
    "Review CPU and memory requests for each workload.",
    "Validate node selectors, affinity, tolerations, and topology spread.",
    "Check StorageClass references and storage assumptions.",
    "Estimate expected replica and maxSurge capacity requirements.",
    "Test admission policies and webhooks in staging.",
    "Test representative scale-out and rolling-update scenarios.",
    "Verify rollout status and available replicas after deployment.",
    "Remember that dry-run validation cannot guarantee actual scheduling success because live capacity and topology can change.",
  ],

  incidentReportTemplate: [
    "Incident ID and timestamps",
    "Cluster, environment, namespace, and workload",
    "Severity and customer impact",
    "Desired replicas versus available replicas",
    "First FailedScheduling event",
    "Recent deployment or infrastructure changes",
    "Evidence collected and commands executed",
    "Confirmed root cause",
    "Corrective action and approval",
    "Recovery verification results",
    "Rollback decision and outcome",
    "Monitoring gaps",
    "Preventive actions, owners, and due dates",
    "Lessons learned",
  ],

  labs: [
    {
      title: "Lab 1: Reproduce insufficient capacity",
      objective:
        "Understand how resource requests affect scheduling.",
      steps: [
        "Use a disposable cluster or isolated test namespace.",
        "Deploy a test Pod with deliberately unsatisfiable resource requests.",
        "Inspect Pod events and node allocatable resources.",
        "Correct the test manifest or provide suitable test capacity.",
        "Verify node assignment and readiness.",
      ],
    },
    {
      title: "Lab 2: Reproduce node selector mismatch",
      objective:
        "Learn to compare actual node labels with Pod requirements.",
      steps: [
        "Create a test workload whose selector matches no nodes.",
        "Inspect FailedScheduling events.",
        "Compare the selector with actual node labels.",
        "Correct the test configuration.",
        "Verify scheduling succeeds.",
      ],
    },
    {
      title: "Lab 3: Taints and tolerations",
      objective:
        "Understand how node taints affect workload eligibility.",
      steps: [
        "Use a disposable cluster or isolated test node.",
        "Apply a test NoSchedule taint.",
        "Deploy a test Pod without a matching toleration.",
        "Inspect the scheduling event.",
        "Add the intended test toleration and verify placement.",
      ],
    },
    {
      title: "Lab 4: PVC scheduling dependency",
      objective:
        "Understand storage binding and topology.",
      steps: [
        "Create a test PVC using a supported test StorageClass.",
        "Inspect PVC events and binding status.",
        "Compare storage topology with eligible nodes.",
        "Resolve the issue in the test environment.",
        "Verify the claim binds and the Pod starts.",
      ],
    },
    {
      title: "Lab 5: Rolling-update capacity",
      objective:
        "Understand why surge replicas can remain Pending.",
      steps: [
        "Deploy a small test Deployment.",
        "Observe a controlled rolling update.",
        "Inspect old and new ReplicaSets.",
        "Compare maxSurge with eligible capacity.",
        "Recover and verify available replicas.",
      ],
    },
  ],

  interviewQuestions: [
    {
      question: "What does Pending mean in Kubernetes?",
      answer:
        "The Pod has not completed the steps needed to reach Running. It may be waiting for node assignment or prerequisites. Check nodeName, conditions, and events.",
    },
    {
      question: "What is FailedScheduling?",
      answer:
        "A common Warning event indicating that the scheduler could not find a node satisfying the Pod's scheduling requirements.",
    },
    {
      question: "How do you troubleshoot a Pending Pod in production?",
      answer:
        "Confirm the cluster and namespace, inspect the Pod YAML and events, check nodeName, follow the scheduler's exact reason, validate the root cause, and apply the smallest safe correction.",
    },
    {
      question: "What is the difference between capacity and allocatable?",
      answer:
        "Capacity describes total node resources. Allocatable describes resources available to Pods after node-level reservations.",
    },
    {
      question: "Why can scheduling fail when CPU usage is low?",
      answer:
        "The scheduler considers resource requests and eligible-node constraints. Existing requests can reserve allocatable capacity even when current CPU usage is low.",
    },
    {
      question: "What is the difference between requests and limits?",
      answer:
        "Requests influence scheduling. Limits cap resource usage for supported resources, with behavior depending on the resource and runtime.",
    },
    {
      question: "Do tolerations force a Pod onto a node?",
      answer:
        "No. A toleration allows a Pod to tolerate a matching taint. Other scheduling requirements must still be satisfied.",
    },
    {
      question: "What is the difference between nodeSelector and node affinity?",
      answer:
        "nodeSelector is a simple required label match. Node affinity supports richer required and preferred expressions.",
    },
    {
      question: "How can anti-affinity block a Deployment?",
      answer:
        "Required anti-affinity may require each replica to occupy a distinct eligible node or topology domain, but insufficient nodes can make additional replicas unschedulable.",
    },
    {
      question: "How can a PVC block scheduling?",
      answer:
        "An unbound claim, failed provisioning, or incompatible storage topology can prevent the Pod from obtaining a compatible placement.",
    },
    {
      question: "Why might the cluster autoscaler not add nodes?",
      answer:
        "It may be at its configured limit, unable to find a compatible node group, or blocked by cloud quota, instance capacity, subnet IP exhaustion, permissions, or Pod constraints.",
    },
    {
      question: "Can preemption solve every scheduling problem?",
      answer:
        "No. Preemption can free resources but cannot fix every hard constraint, such as incompatible labels, untolerated taints, or unavailable topology domains.",
    },
    {
      question: "How do you distinguish scheduling failure from container startup failure?",
      answer:
        "Check nodeName. If it is empty, investigate scheduling. If populated, inspect image pulling, volume mounting, sandbox creation, kubelet, and container startup.",
    },
    {
      question: "How can maxSurge cause Pending Pods?",
      answer:
        "A rolling update may create temporary extra replicas whose requests exceed currently available eligible capacity.",
    },
    {
      question: "What is the safest first step in a production scheduling incident?",
      answer:
        "Confirm the correct cluster and namespace, assess impact, preserve evidence, and start with read-only diagnostics.",
    },
    {
      question: "What should be checked after the fix?",
      answer:
        "Verify node assignment, Pod readiness, available replicas, service endpoints, application health, error rates, and whether the original failure recurs.",
    },
  ],

  references: [
    {
      title: "Kubernetes Scheduling, Preemption and Eviction",
      url: "https://kubernetes.io/docs/concepts/scheduling-eviction/",
    },
    {
      title: "Assigning Pods to Nodes",
      url: "https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/",
    },
    {
      title: "Taints and Tolerations",
      url: "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/",
    },
    {
      title: "Resource Management for Pods and Containers",
      url: "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
    },
    {
      title: "Pod Topology Spread Constraints",
      url: "https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/",
    },
    {
      title: "Persistent Volumes",
      url: "https://kubernetes.io/docs/concepts/storage/persistent-volumes/",
    },
    {
      title: "Storage Classes",
      url: "https://kubernetes.io/docs/concepts/storage/storage-classes/",
    },
    {
      title: "Resource Quotas",
      url: "https://kubernetes.io/docs/concepts/policy/resource-quotas/",
    },
    {
      title: "Pod Priority and Preemption",
      url: "https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/",
    },
    {
      title: "Deployments",
      url: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/",
    },
  ],
};
