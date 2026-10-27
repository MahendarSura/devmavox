```typescript
export interface StorageDiagnosticStep {
  id: string;
  title: string;
  purpose: string;
  commands: string[];
  interpret: string[];
  nextAction: string;
  risk: "low" | "medium" | "high";
}

export interface StorageRootCause {
  symptom: string;
  likelyCauses: string[];
  evidence: string[];
  resolution: string[];
  prevention: string[];
}

export interface StorageIncidentScenario {
  title: string;
  severity: string;
  situation: string;
  impact: string[];
  investigation: string[];
  rootCause: string;
  recovery: string[];
  verification: string[];
}

export interface StorageInterviewQuestion {
  question: string;
  answer: string;
  followUp?: string;
}

export interface PersistentStorageGuide {
  title: string;
  slug: string;
  category: string;
  description: string;
  symptoms: string[];
  severityMatrix: { severity: string; condition: string; response: string }[];
  safetyChecks: string[];
  diagnosticWorkflow: StorageDiagnosticStep[];
  rootCauses: StorageRootCause[];
  incidentScenarios: StorageIncidentScenario[];
  commandReference: { command: string; purpose: string; interpretation: string }[];
  recoveryRunbook: string[];
  prevention: string[];
  monitoring: string[];
  cicdValidation: string[];
  incidentReportTemplate: string[];
  labs: { title: string; objective: string; steps: string[] }[];
  interviewQuestions: StorageInterviewQuestion[];
  references: { title: string; url: string }[];
}

export const persistentStorageGuide: PersistentStorageGuide = {
  title: "Kubernetes Persistent Storage: Production Troubleshooting",
  slug: "persistent-storage",
  category: "Kubernetes",
  description:
    "A production-focused troubleshooting runbook for PersistentVolumeClaims, PersistentVolumes, StorageClasses, CSI drivers, volume provisioning and attachment, filesystem capacity, permissions, cloud block and shared file storage, data protection, backup and recovery.",

  symptoms: [
    "PVC remains Pending.",
    "Pod remains Pending because its PVC is unbound.",
    "Pod is stuck in ContainerCreating.",
    "FailedMount or FailedAttachVolume events appear.",
    "Multi-Attach error occurs when a volume is already attached to another node.",
    "A CSI provisioner cannot create a volume.",
    "A volume works in one availability zone but not another.",
    "The filesystem is full although the cloud volume has free capacity.",
    "The application receives Permission denied when writing to a mounted directory.",
    "A PVC is Bound but the application cannot read or write files.",
    "A volume resize remains incomplete.",
    "A database becomes read-only or reports I/O errors.",
    "A StatefulSet Pod cannot recover after rescheduling.",
    "A deleted PVC appears to have caused unexpected storage deletion.",
    "A backup exists but restoration fails or produces inconsistent application data."
  ],

  severityMatrix: [
    {
      severity: "SEV-1 / Critical",
      condition:
        "Production database or critical application data is inaccessible, data loss is suspected, or multiple production workloads are affected.",
      response:
        "Declare an incident, stop risky storage changes, preserve logs and events, engage the storage/database owner, and follow the approved recovery and backup procedure."
    },
    {
      severity: "SEV-2 / High",
      condition:
        "A critical application is unavailable, a database is read-only, or a stateful workload cannot be rescheduled.",
      response:
        "Identify affected PVCs, PVs, Pods, nodes and storage backend. Use a controlled recovery plan with explicit data-integrity checks."
    },
    {
      severity: "SEV-3 / Medium",
      condition:
        "A non-critical workload has a provisioning, mount, capacity or permission issue.",
      response:
        "Collect evidence, isolate the failing storage layer, and validate the fix before rolling it out more broadly."
    },
    {
      severity: "SEV-4 / Low",
      condition:
        "Capacity is approaching a threshold, a backup job failed without immediate production impact, or a non-critical storage alert is firing.",
      response:
        "Create a tracked remediation task, check capacity trends and backup recovery readiness, and define an escalation threshold."
    }
  ],

  safetyChecks: [
    "Confirm the Kubernetes context, cluster, namespace, environment and account before running commands.",
    "Identify the application owner, data owner, on-call contact and incident/change ticket.",
    "Record the affected PVC name, PV name, StorageClass, CSI driver, Pod, node and volume identifier.",
    "Determine whether the workload is a database, queue, object store, filesystem workload or disposable cache.",
    "Check the PV reclaimPolicy: Retain and Delete have different consequences.",
    "Check PVC volumeName, accessModes, volumeMode, requested capacity and StorageClass.",
    "Confirm the cloud account, region, availability zone and volume ID using the approved cloud access method.",
    "Check whether the volume is mounted or attached elsewhere before attempting a detach or recovery.",
    "Confirm the latest successful backup, backup location, retention and restore-test status.",
    "Do not delete a PVC or PV as a first diagnostic action.",
    "Do not manually detach a live database volume just because an attachment event is visible.",
    "Do not run filesystem repair on a mounted filesystem unless the filesystem and vendor procedure explicitly support that operation.",
    "Do not change reclaimPolicy, force-delete storage objects or edit CSI-managed resources without an approved recovery plan.",
    "Capture baseline outputs and timestamps before making a change.",
    "Use read-only investigation first. Obtain approval before production writes, failovers, volume replacement or data migration."
  ],

  diagnosticWorkflow: [
    {
      id: "1",
      title: "Establish the blast radius",
      purpose:
        "Determine whether the issue affects one PVC, one node, one StorageClass, one availability zone or the whole storage backend.",
      commands: [
        "kubectl config current-context",
        "kubectl get namespaces",
        "kubectl get pods -n <namespace> -o wide",
        "kubectl get pvc -A",
        "kubectl get pv",
        "kubectl get storageclass"
      ],
      interpret: [
        "One PVC failing suggests a claim, provisioning, attachment or application-specific issue.",
        "Many PVCs using one StorageClass failing together suggests a provisioner, cloud API, quota or backend incident.",
        "Failures concentrated on one node suggest node plugins, mount state, networking or node health.",
        "Failures across multiple applications may indicate a shared storage backend outage."
      ],
      nextAction:
        "Record the affected namespace, workload, PVC, PV, node, StorageClass and first observed failure time.",
      risk: "low"
    },
    {
      id: "2",
      title: "Inspect the PVC",
      purpose:
        "Find the claim state, requested capacity, access mode, selected StorageClass and binding details.",
      commands: [
        "kubectl get pvc <pvc-name> -n <namespace> -o wide",
        "kubectl describe pvc <pvc-name> -n <namespace>",
        "kubectl get pvc <pvc-name> -n <namespace> -o yaml"
      ],
      interpret: [
        "Pending with no volumeName: binding or dynamic provisioning has not completed.",
        "Pending with a WaitForFirstConsumer StorageClass: provisioning may wait for a schedulable consuming Pod.",
        "Bound: the claim has a PV binding, but the volume may still fail attachment, mount or application writes.",
        "Events such as ProvisioningFailed or failed binding narrow the next investigation.",
        "Check for a wrong namespace, claim name, StorageClass or incompatible access mode."
      ],
      nextAction:
        "Use the PVC events and YAML to choose the binding/provisioning branch or the attachment/mount branch.",
      risk: "low"
    },
    {
      id: "3",
      title: "Inspect the consuming workload",
      purpose:
        "Find whether the Pod references the expected claim and why scheduling or startup is blocked.",
      commands: [
        "kubectl get pods -n <namespace> -o wide",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl get pod <pod-name> -n <namespace> -o yaml",
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp"
      ],
      interpret: [
        "FailedScheduling with an unbound PVC indicates a scheduling/binding dependency.",
        "FailedAttachVolume indicates an attachment stage problem.",
        "FailedMount indicates the volume is not mounted successfully.",
        "A Running Pod with application write errors points toward filesystem capacity, ownership, mount options or application behavior.",
        "Check the Pod's volumes and volumeMounts, including subPath and readOnly."
      ],
      nextAction:
        "Correlate Pod events with PVC events and identify the exact failed lifecycle stage.",
      risk: "low"
    },
    {
      id: "4",
      title: "Inspect the PV and binding",
      purpose:
        "Verify the claim-to-volume relationship and the volume's lifecycle policy.",
      commands: [
        "kubectl get pv <pv-name> -o wide",
        "kubectl describe pv <pv-name>",
        "kubectl get pv <pv-name> -o yaml"
      ],
      interpret: [
        "Confirm claimRef namespace and name match the intended claim.",
        "Check capacity, accessModes, volumeMode, StorageClass and node affinity.",
        "Released can mean a claim was removed while the PV still retains a prior claim reference.",
        "A Retain policy normally preserves the backing asset after claim deletion; it does not automatically make the volume ready for reuse.",
        "A Delete policy can allow the storage asset to be deleted when the claim lifecycle triggers it, depending on the provisioner."
      ],
      nextAction:
        "If the binding is correct, continue to the StorageClass and CSI layer. If it is not, preserve the current objects and investigate the mismatch before changing them.",
      risk: "low"
    },
    {
      id: "5",
      title: "Validate the StorageClass and provisioning mode",
      purpose:
        "Determine whether dynamic provisioning, topology, capacity or class parameters explain a Pending claim.",
      commands: [
        "kubectl get storageclass",
        "kubectl describe storageclass <storage-class>",
        "kubectl get storageclass <storage-class> -o yaml",
        "kubectl get events -A --sort-by=.metadata.creationTimestamp"
      ],
      interpret: [
        "provisioner identifies the storage plugin expected to create the volume.",
        "volumeBindingMode Immediate attempts provisioning/binding without waiting for a consuming Pod.",
        "WaitForFirstConsumer coordinates provisioning with Pod scheduling and topology.",
        "Check allowedTopologies, parameters, expansion support and default StorageClass configuration.",
        "An absent or incorrect StorageClass can prevent dynamic provisioning."
      ],
      nextAction:
        "Compare the requested class with a known-good claim and the approved platform configuration. Do not change a production StorageClass blindly.",
      risk: "low"
    },
    {
      id: "6",
      title: "Check CSI controller and node components",
      purpose:
        "Investigate provisioning, attach, detach, mount and node-plugin failures.",
      commands: [
        "kubectl get pods -A -o wide | grep -Ei 'csi|ebs|efs|storage|provisioner|attacher'",
        "kubectl get csidrivers",
        "kubectl get csinodes",
        "kubectl get volumeattachments",
        "kubectl describe volumeattachment <volume-attachment-name>"
      ],
      interpret: [
        "A missing or unhealthy CSI controller may prevent provisioning or attachment operations.",
        "A missing node plugin on the target node may prevent mount operations.",
        "A VolumeAttachment can show whether Kubernetes is requesting an attachment and any reported error.",
        "A VolumeAttachment object is evidence, not proof that manually deleting it is safe.",
        "The exact component names vary by CSI driver and distribution."
      ],
      nextAction:
        "Inspect the relevant controller or node-plugin logs using the actual namespace and Pod names. Escalate to the platform/storage owner if the plugin is unhealthy.",
      risk: "medium"
    },
    {
      id: "7",
      title: "Read storage driver logs and events",
      purpose:
        "Connect Kubernetes events to the actual CSI or cloud API failure.",
      commands: [
        "kubectl logs -n <csi-namespace> <csi-controller-pod> --all-containers --since=30m",
        "kubectl logs -n <csi-namespace> <csi-node-pod> --all-containers --since=30m",
        "kubectl describe pod <csi-controller-pod> -n <csi-namespace>",
        "kubectl get events -A --sort-by=.metadata.creationTimestamp"
      ],
      interpret: [
        "AccessDenied or Unauthorized suggests identity, role, policy or credential problems.",
        "Throttling or quota errors suggest cloud API limits or account capacity constraints.",
        "NotFound may indicate a wrong region, deleted backing volume or stale reference.",
        "Timeouts may indicate a backend, network or API availability problem.",
        "Mount errors may point to device discovery, filesystem type, mount options or node-level issues."
      ],
      nextAction:
        "Capture the exact error, timestamp, resource ID and request/correlation ID where available. Follow the driver-specific recovery procedure.",
      risk: "low"
    },
    {
      id: "8",
      title: "Validate scheduling and topology",
      purpose:
        "Determine whether a volume is compatible with the node where the Pod is scheduled.",
      commands: [
        "kubectl get pod <pod-name> -n <namespace> -o wide",
        "kubectl get nodes --show-labels",
        "kubectl describe node <node-name>",
        "kubectl describe pv <pv-name>",
        "kubectl describe pod <pod-name> -n <namespace>"
      ],
      interpret: [
        "PV nodeAffinity may restrict a volume to a particular zone or node topology.",
        "A zonal block volume generally cannot be attached as if it were a multi-zone shared filesystem.",
        "WaitForFirstConsumer helps coordinate provisioning with Pod scheduling but does not remove topology constraints.",
        "A Pod may be unschedulable because its eligible nodes have insufficient resources, taints or affinity restrictions."
      ],
      nextAction:
        "Check zone compatibility, node labels, node health, tolerations and workload scheduling constraints before changing placement.",
      risk: "low"
    },
    {
      id: "9",
      title: "Check attachment limits and multi-attach conflicts",
      purpose:
        "Investigate volume attachment failures after a Pod moves between nodes or another workload uses the volume.",
      commands: [
        "kubectl get volumeattachments",
        "kubectl get pods -A -o wide",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl describe volumeattachment <volume-attachment-name>",
        "kubectl describe node <node-name>"
      ],
      interpret: [
        "Multi-Attach may mean a single-node block volume is still attached to another node.",
        "A previous node may be unreachable and the old attachment may not yet be safely released.",
        "Node volume limits can prevent new attachments even when the volume itself is healthy.",
        "ReadWriteOnce means read-write mounting by one node, not necessarily one Pod; it is not a universal single-Pod guarantee.",
        "ReadWriteMany requires a compatible backend and driver; the access mode alone does not make a block volume shareable."
      ],
      nextAction:
        "Confirm which node owns the live attachment and whether the previous workload has stopped safely. Use the cloud provider and CSI driver's documented detach/recovery procedure.",
      risk: "high"
    },
    {
      id: "10",
      title: "Verify the mount inside the container",
      purpose:
        "Separate Kubernetes mount success from application-level access problems.",
      commands: [
        "kubectl exec -n <namespace> <pod-name> -- sh -c 'df -hT; df -i'",
        "kubectl exec -n <namespace> <pod-name> -- sh -c 'mount | grep -E \" /data | /var/lib\"'",
        "kubectl exec -n <namespace> <pod-name> -- sh -c 'id; ls -ldn /data'",
        "kubectl describe pod <pod-name> -n <namespace>"
      ],
      interpret: [
        "df -hT reports filesystem capacity and type; df -i reports inode usage.",
        "100% block usage and 100% inode usage are different failure modes.",
        "A mount path missing from mount output may indicate the wrong path or a failed mount.",
        "Numeric ownership helps compare the directory UID/GID with the container's effective identity.",
        "The example paths are placeholders; substitute the actual mount path. The container must include the required diagnostic tools."
      ],
      nextAction:
        "If mount and capacity are healthy, investigate UID/GID, security context, readOnly, subPath and application-specific file locking or permissions.",
      risk: "low"
    },
    {
      id: "11",
      title: "Investigate filesystem capacity and I/O health",
      purpose:
        "Determine whether writes fail due to space, inodes, read-only remounts or storage latency.",
      commands: [
        "kubectl exec -n <namespace> <pod-name> -- sh -c 'df -hT; df -i'",
        "kubectl logs -n <namespace> <pod-name> --since=30m",
        "kubectl describe pod <pod-name> -n <namespace>",
        "kubectl describe node <node-name>"
      ],
      interpret: [
        "No space left on device can indicate full blocks or exhausted inodes.",
        "Read-only filesystem errors may indicate filesystem or underlying storage problems; do not immediately remount read-write.",
        "I/O errors and timeouts warrant backend, node kernel and CSI investigation.",
        "A cloud disk's provisioned capacity, filesystem capacity and application quota may differ."
      ],
      nextAction:
        "Check backend capacity, filesystem expansion state, inode use, application retention and storage latency. Preserve data before filesystem repair or replacement.",
      risk: "medium"
    },
    {
      id: "12",
      title: "Check filesystem ownership and security context",
      purpose:
        "Explain why a mounted volume is visible but the application cannot write to it.",
      commands: [
        "kubectl get pod <pod-name> -n <namespace> -o yaml",
        "kubectl exec -n <namespace> <pod-name> -- id",
        "kubectl exec -n <namespace> <pod-name> -- sh -c 'ls -ldn /data'",
        "kubectl logs -n <namespace> <pod-name> --since=30m"
      ],
      interpret: [
        "Compare the runtime UID/GID with the directory ownership and mode bits.",
        "Check runAsUser, runAsGroup, fsGroup, readOnlyRootFilesystem and mount readOnly.",
        "Some CSI drivers or filesystems do not implement ownership changes in the same way.",
        "Security mechanisms and filesystem ACLs may deny access even if basic mode bits appear permissive."
      ],
      nextAction:
        "Apply the minimum required ownership or security-context correction using the application and storage team's approved approach. Avoid broad chmod 777.",
      risk: "medium"
    },
    {
      id: "13",
      title: "Validate volume expansion",
      purpose:
        "Find why a PVC size change has not reached the filesystem.",
      commands: [
        "kubectl get pvc <pvc-name> -n <namespace> -o yaml",
        "kubectl describe pvc <pvc-name> -n <namespace>",
        "kubectl get storageclass <storage-class> -o yaml",
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp"
      ],
      interpret: [
        "Check allowVolumeExpansion on the StorageClass and whether the CSI driver supports the requested operation.",
        "The backing volume may have expanded while filesystem expansion is still pending.",
        "File system expansion may require a supported online operation or a controlled remount, depending on the driver and filesystem.",
        "PVC shrinking is generally not supported by the normal Kubernetes volume expansion workflow."
      ],
      nextAction:
        "Follow the CSI driver's supported expansion procedure. Verify both the backend capacity and filesystem capacity before closing the incident.",
      risk: "medium"
    },
    {
      id: "14",
      title: "Check backup and restore readiness",
      purpose:
        "Protect the recovery path before destructive remediation.",
      commands: [
        "kubectl get pvc <pvc-name> -n <namespace> -o yaml",
        "kubectl get pv <pv-name> -o yaml",
        "kubectl get pods -n <namespace> -o wide",
        "kubectl get events -n <namespace> --sort-by=.metadata.creationTimestamp"
      ],
      interpret: [
        "Kubernetes object manifests are not a backup of the volume's application data.",
        "A snapshot's existence does not prove it is application-consistent or restorable.",
        "Databases may require native backup, quiescing, transaction-log recovery or a coordinated snapshot workflow.",
        "Confirm RPO, RTO, encryption keys, backup account access and restore testing."
      ],
      nextAction:
        "Before replacement, restore or repair, record the recovery point and obtain the required owner approval. Never overwrite the only known-good copy.",
      risk: "high"
    }
  ],

  rootCauses: [
    {
      symptom: "PVC remains Pending",
      likelyCauses: [
        "StorageClass is missing or incorrect.",
        "CSI provisioner is unhealthy.",
        "Cloud quota or permissions prevent volume creation.",
        "WaitForFirstConsumer is waiting for a consumer Pod.",
        "Requested size, access mode or topology is unsupported.",
        "Static PV does not match the claim."
      ],
      evidence: [
        "PVC events show provisioning or binding errors.",
        "StorageClass provisioner and parameters do not match the platform configuration.",
        "CSI controller logs show a failed create-volume request.",
        "The consuming Pod is unschedulable or no compatible PV exists."
      ],
      resolution: [
        "Confirm the claim's namespace, class, capacity and access mode.",
        "Check the actual CSI controller health and logs.",
        "Check cloud quota, IAM/role permissions and backend capacity.",
        "Correct the manifest or platform configuration through the approved change process.",
        "Reapply only the corrected manifest and monitor the claim state."
      ],
      prevention: [
        "Validate StorageClass names and parameters in CI.",
        "Alert on prolonged Pending PVCs.",
        "Test provisioning in every supported topology.",
        "Document supported access modes and capacity limits."
      ]
    },
    {
      symptom: "Pod stuck in ContainerCreating with FailedMount",
      likelyCauses: [
        "CSI node plugin is unhealthy.",
        "Filesystem type or mount options are unsupported.",
        "The backing volume is unavailable.",
        "Device discovery or node-level mount operations fail.",
        "Permissions or node security controls block the mount."
      ],
      evidence: [
        "Pod events show FailedMount.",
        "CSI node logs contain mount or device errors.",
        "Other claims on the same node may show similar failures.",
        "The PVC may already be Bound."
      ],
      resolution: [
        "Identify the precise failed mount and target node.",
        "Check CSI node plugin health and node events.",
        "Compare the mount configuration with a known-good workload.",
        "Use the driver-specific remediation procedure.",
        "Revalidate application data access after the mount succeeds."
      ],
      prevention: [
        "Monitor CSI node components.",
        "Test mount options and filesystem compatibility.",
        "Keep node and driver versions within the supported compatibility matrix."
      ]
    },
    {
      symptom: "Multi-Attach error after rescheduling",
      likelyCauses: [
        "The volume is still attached to the previous node.",
        "The previous node is unreachable.",
        "The workload has not stopped cleanly.",
        "The selected access mode or backend does not support the intended sharing pattern."
      ],
      evidence: [
        "VolumeAttachment status and events identify the old and requested attachment.",
        "Pod history shows a move between nodes.",
        "The cloud provider reports the volume attached to an existing instance."
      ],
      resolution: [
        "Confirm whether the old workload is still running or writing.",
        "Check node reachability and cloud attachment state.",
        "Coordinate with the application owner to prevent simultaneous writers.",
        "Follow the documented CSI/provider detach or node recovery procedure.",
        "Validate data integrity before starting the replacement workload."
      ],
      prevention: [
        "Use supported access modes and workload topology.",
        "Test node failure and rescheduling procedures.",
        "Monitor stale attachments and node health.",
        "Document fencing requirements for stateful workloads."
      ]
    },
    {
      symptom: "PVC is Bound but application writes fail",
      likelyCauses: [
        "Filesystem or inode capacity is exhausted.",
        "Mount is read-only.",
        "Container UID/GID does not have write permission.",
        "Volume mount is configured readOnly.",
        "Application-level quota, file lock or database issue exists."
      ],
      evidence: [
        "PVC is Bound and Pod is Running.",
        "Application logs show permission, capacity or I/O errors.",
        "df -hT and df -i show filesystem utilization.",
        "Pod YAML shows mount and security-context configuration."
      ],
      resolution: [
        "Confirm the exact application path and error.",
        "Check block and inode usage.",
        "Compare runtime identity with ownership and security context.",
        "Check mount flags and filesystem health.",
        "Make the smallest supported correction and test an application write safely."
      ],
      prevention: [
        "Alert on capacity and inode thresholds.",
        "Use correct UID/GID and security context.",
        "Add storage write/read checks to application health diagnostics.",
        "Test capacity exhaustion and permission scenarios in non-production."
      ]
    },
    {
      symptom: "PVC expansion does not increase usable filesystem capacity",
      likelyCauses: [
        "StorageClass does not support expansion.",
        "CSI controller expansion failed.",
        "Node-side filesystem expansion is incomplete.",
        "The application is checking a different mount or filesystem.",
        "Filesystem or driver restrictions apply."
      ],
      evidence: [
        "PVC status and events show expansion progress or failure.",
        "StorageClass and driver documentation describe supported expansion behavior.",
        "Cloud volume capacity differs from the size reported inside the container."
      ],
      resolution: [
        "Verify requested size, StorageClass capability and CSI support.",
        "Inspect PVC events and CSI logs.",
        "Follow the driver-supported expansion procedure.",
        "Confirm actual filesystem capacity inside the consuming workload."
      ],
      prevention: [
        "Test expansion in staging.",
        "Alert on expansion operations that exceed expected duration.",
        "Document filesystem and CSI expansion constraints."
      ]
    },
    {
      symptom: "Volume is unavailable after node or zone failure",
      likelyCauses: [
        "Zonal volume cannot attach to the selected node's zone.",
        "Old attachment has not been released.",
        "Node plugin or cloud control plane is unhealthy.",
        "The workload requires a single-writer recovery or fencing process."
      ],
      evidence: [
        "PV nodeAffinity and node labels show a topology mismatch.",
        "VolumeAttachment and cloud API show the current attachment.",
        "Pod events report topology or attachment errors."
      ],
      resolution: [
        "Confirm the volume's zone and eligible nodes.",
        "Verify the former node is stopped or safely fenced before permitting another writer.",
        "Use the provider and CSI recovery procedure.",
        "Run application-level consistency checks after recovery."
      ],
      prevention: [
        "Design StatefulSets around the storage backend's failure domains.",
        "Test zone failure and recovery.",
        "Document fencing, backup and recovery-time objectives."
      ]
    }
  ],

  incidentScenarios: [
    {
      title: "Production database Pod is Pending after node replacement",
      severity: "SEV-1 / SEV-2 depending on service impact",
      situation:
        "A node becomes unhealthy. Kubernetes schedules the database replacement Pod, but the Pod cannot attach the existing persistent volume.",
      impact: [
        "Database service may be unavailable.",
        "Application requests may fail or queue.",
        "Repeated restarts or forced detach operations may increase recovery risk."
      ],
      investigation: [
        "Confirm the affected cluster, namespace, StatefulSet, Pod and PVC.",
        "Inspect Pod events, PVC/PV state and VolumeAttachment.",
        "Identify the volume ID and its actual cloud attachment and zone.",
        "Check whether the previous node is still running or can write to the volume.",
        "Review database logs and the last successful backup."
      ],
      rootCause:
        "Example root cause: the volume is still attached to the old node, and the new Pod cannot safely acquire it. This must be proven from Kubernetes and backend evidence.",
      recovery: [
        "Declare the incident and pause unrelated deployment changes.",
        "Do not force-detach the volume while the previous writer may still be active.",
        "Coordinate with the node, storage and database owners.",
        "Fence or recover the old node using the approved provider procedure.",
        "Release the attachment only through the documented safe workflow.",
        "Allow the supported CSI attach and mount process to complete."
      ],
      verification: [
        "PVC remains Bound to the intended PV.",
        "Volume is attached to the intended node only.",
        "Pod becomes Ready and database logs show normal recovery.",
        "Run application-level read/write and consistency checks.",
        "Confirm replication, backup and monitoring health."
      ]
    },
    {
      title: "PVC Pending after a deployment change",
      severity: "SEV-2 if a critical rollout is blocked",
      situation:
        "A new workload revision references a storage class that does not exist in the target cluster.",
      impact: [
        "New Pods cannot start.",
        "A rollout may stall while old replicas continue running.",
        "If old replicas were already scaled down, service availability may be affected."
      ],
      investigation: [
        "Inspect the new Pod and PVC events.",
        "Compare the new manifest with the last known-good revision.",
        "Check StorageClass names in the target cluster.",
        "Review the Git change and deployment timestamp.",
        "Confirm whether the old application version remains healthy."
      ],
      rootCause:
        "Example root cause: an environment-specific StorageClass name was copied from another cluster.",
      recovery: [
        "Restore the correct environment-specific value through a reviewed manifest change.",
        "Validate the YAML and policy checks in CI.",
        "Deploy the corrected claim/workload configuration.",
        "Do not delete a Bound production claim merely to force a rollout."
      ],
      verification: [
        "PVC reaches Bound.",
        "New Pods mount the expected claim.",
        "The rollout completes without unexpected replica loss.",
        "Application health checks and storage writes succeed."
      ]
    },
    {
      title: "Application reports No space left on device",
      severity: "SEV-2 or SEV-3 depending on workload",
      situation:
        "A production service can read existing files but fails to write new records, uploads or database data.",
      impact: [
        "Requests may fail.",
        "Database or queue operations may stop.",
        "Logs and temporary files may also be affected."
      ],
      investigation: [
        "Inspect application logs and exact write path.",
        "Check df -hT and df -i inside the relevant container.",
        "Compare filesystem capacity with the cloud volume size.",
        "Check application quotas, retention jobs and recent data growth.",
        "Determine whether the filesystem has become read-only."
      ],
      rootCause:
        "Example root cause: the filesystem has exhausted inodes due to a large number of small files, even though block capacity remains.",
      recovery: [
        "Follow application-specific retention and cleanup procedures.",
        "Do not remove unknown database files, WAL files or active data files.",
        "If expansion is appropriate, verify CSI and filesystem support and follow the approved expansion process.",
        "If integrity is in doubt, stop writes only through the approved application procedure and engage the data owner."
      ],
      verification: [
        "Block and inode utilization are below agreed thresholds.",
        "The application can safely write and read a test record.",
        "Database consistency and background jobs are healthy.",
        "Capacity alerts and retention controls are functioning."
      ]
    },
    {
      title: "PVC deleted and backing volume is at risk",
      severity: "SEV-1 if data loss is possible",
      situation:
        "A claim was removed during cleanup and the team is unsure whether the underlying storage asset still exists.",
      impact: [
        "The volume may be retained, released or already deleted depending on lifecycle state and provisioner behavior.",
        "Creating a replacement claim may allocate a new empty volume rather than restore the original data."
      ],
      investigation: [
        "Stop further cleanup and preserve audit events and change history.",
        "Check PV state, reclaimPolicy, claimRef and storage-provisioner events.",
        "Search the approved cloud account and region for the original volume or snapshot.",
        "Confirm the most recent backup and any application-consistent snapshot.",
        "Contact the storage and data owners before attempting rebind or restore."
      ],
      rootCause:
        "The storage lifecycle policy and the claim deletion sequence were not verified before cleanup.",
      recovery: [
        "Do not create repeated replacement claims in an attempt to recover the original data.",
        "If the volume still exists, preserve it and follow the documented reclaim/rebind process.",
        "If the asset was deleted, use the approved snapshot or backup restoration procedure.",
        "Restore into an isolated target first when possible.",
        "Validate application data before switching production traffic."
      ],
      verification: [
        "The recovered volume maps to the intended source or approved recovery point.",
        "The application passes integrity and consistency checks.",
        "The recovery owner confirms data freshness and acceptable data loss.",
        "Backup and retention controls are corrected."
      ]
    }
  ],

  commandReference: [
    {
      command: "kubectl get pvc -A",
      purpose: "List claims across namespaces.",
      interpretation: "Use the STATUS and STORAGECLASS columns to find claims that are Pending or use an unexpected class."
    },
    {
      command: "kubectl describe pvc <pvc> -n <namespace>",
      purpose: "Inspect binding events and provisioning errors.",
      interpretation: "Look at Events, volume name, requested capacity and access modes."
    },
    {
      command: "kubectl get pv",
      purpose: "Review cluster-level PV state.",
      interpretation: "Pending, Bound, Released and Failed indicate different lifecycle stages."
    },
    {
      command: "kubectl get storageclass",
      purpose: "List available StorageClasses.",
      interpretation: "Confirm the requested class exists and is the intended one for the environment."
    },
    {
      command: "kubectl get volumeattachments",
      purpose: "Inspect CSI attachment objects.",
      interpretation: "Correlate the volume and node; do not treat object deletion as a normal fix."
    },
    {
      command: "kubectl get csidrivers",
      purpose: "Inspect registered CSI drivers.",
      interpretation: "Confirm the expected driver is registered."
    },
    {
      command: "kubectl get csinodes",
      purpose: "Inspect CSI node registration.",
      interpretation: "Check whether expected drivers are registered for relevant nodes."
    },
    {
      command: "kubectl get events -A --sort-by=.metadata.creationTimestamp",
      purpose: "Correlate storage events across namespaces.",
      interpretation: "Use timestamps to connect Pod, PVC, PV and CSI failures."
    },
    {
      command: "kubectl logs -n <csi-namespace> <csi-pod> --all-containers --since=30m",
      purpose: "Inspect recent CSI logs.",
      interpretation: "Look for the first error, resource ID, API response and retry pattern."
    },
    {
      command: "kubectl exec -n <namespace> <pod> -- sh -c 'df -hT; df -i'",
      purpose: "Inspect filesystem blocks and inodes.",
      interpretation: "Full blocks and full inodes require different remediation."
    },
    {
      command: "kubectl get pvc <pvc> -n <namespace> -o yaml",
      purpose: "Inspect the actual claim manifest and status.",
      interpretation: "Check accessModes, volumeMode, storageClassName, resources, volumeName and conditions."
    },
    {
      command: "kubectl get pv <pv> -o yaml",
      purpose: "Inspect PV lifecycle and topology.",
      interpretation: "Check reclaimPolicy, claimRef, nodeAffinity and CSI volumeHandle."
    }
  ],

  recoveryRunbook: [
    "1. Declare the incident and establish a single incident lead.",
    "2. Freeze unrelated changes to the affected workload and storage configuration.",
    "3. Confirm cluster context, namespace, PVC, PV, StorageClass, CSI driver, node and backing volume ID.",
    "4. Preserve the initial PVC/PV YAML, Pod events, VolumeAttachment state and relevant logs.",
    "5. Determine the failed stage: binding, provisioning, scheduling, attachment, mount, filesystem or application access.",
    "6. Confirm whether any writer is still active before changing attachment state.",
    "7. Check the approved backup, snapshot, restore point, data owner and RPO/RTO.",
    "8. Select the smallest corrective action that addresses the evidence-backed cause.",
    "9. Obtain approval for production-impacting operations such as failover, detach, restore, replacement or filesystem repair.",
    "10. Apply the correction using the supported Kubernetes, CSI and storage-provider procedure.",
    "11. Verify claim binding, volume attachment, mount, filesystem capacity and application-level data access.",
    "12. Run application consistency checks and confirm replication or quorum health where applicable.",
    "13. Monitor errors, latency, retries, capacity and application health after recovery.",
    "14. Document the root cause, exact change, data-integrity checks, recovery point and follow-up actions."
  ],

  prevention: [
    "Use reviewed, version-controlled PVC, PV and StorageClass manifests.",
    "Avoid environment-specific StorageClass names hard-coded into shared manifests.",
    "Document which workloads require block storage, shared filesystem storage or object storage.",
    "Choose access modes based on backend capabilities and workload concurrency requirements.",
    "Test node failure, zone failure, CSI recovery, volume expansion and backup restoration in staging.",
    "Monitor Pending PVC duration, FailedMount events, attachment failures and CSI component health.",
    "Track filesystem block usage, inode usage, cloud volume utilization and storage latency.",
    "Use workload-appropriate retention policies; never clean up unknown database files automatically.",
    "Review reclaimPolicy and PVC deletion behavior for each production StorageClass.",
    "Use application-consistent backups for databases and validate restores regularly.",
    "Set storage quotas, capacity forecasts and escalation thresholds.",
    "Maintain a supported Kubernetes, CSI driver, node image and storage backend compatibility matrix.",
    "Use least-privilege cloud identities for CSI components.",
    "Keep a documented process for stale attachments and failed-node fencing.",
    "Run post-incident reviews for data loss, unexpected deletion, repeated mount failures and backup failures."
  ],

  monitoring: [
    "Alert on PVCs remaining Pending beyond a workload-specific threshold.",
    "Alert on repeated FailedMount and FailedAttachVolume events.",
    "Monitor CSI controller and node-plugin availability, restarts and error rates.",
    "Monitor volume attachment failures, cloud API throttling and quota errors.",
    "Monitor filesystem capacity and inode utilization inside the workload.",
    "Monitor storage read/write latency, throughput, queue depth and I/O errors where metrics are available.",
    "Monitor snapshot and backup job success, age of last successful backup and restore-test status.",
    "Monitor database write failures, read-only transitions, replication lag and recovery status.",
    "Correlate storage alerts with node failures, deployments and infrastructure changes.",
    "Set thresholds according to workload growth, recovery objectives and the backend's operational limits."
  ],

  cicdValidation: [
    "Validate YAML syntax and Kubernetes schemas before deployment.",
    "Check that referenced StorageClasses exist in the target environment.",
    "Check requested capacity, accessModes, volumeMode and mount paths.",
    "Run policy checks for forbidden reclaim policies or unapproved storage parameters.",
    "Verify security contexts and required write permissions in integration tests.",
    "Test PVC creation and deletion behavior in an isolated non-production cluster.",
    "Test volume expansion and restore procedures for supported storage backends.",
    "Require review for production changes affecting PVCs, PVs, StorageClasses, StatefulSets or backup policies.",
    "Do not automatically delete production claims as part of a routine deployment cleanup.",
    "Use canary or controlled rollout strategies for application changes that alter storage layout."
  ],

  incidentReportTemplate: [
    "Incident ID and severity:",
    "Start time, detection time and recovery time:",
    "Cluster, environment, namespace and affected application:",
    "PVC, PV, StorageClass, CSI driver and backing volume identifier:",
    "Customer and service impact:",
    "Initial symptoms and exact error messages:",
    "Evidence collected and timestamps:",
    "Diagnostic steps performed and their results:",
    "Confirmed root cause and supporting evidence:",
    "Changes made and approval/reference:",
    "Backup or snapshot used and recovery point:",
    "Data-integrity and application verification results:",
    "Monitoring status after recovery:",
    "What went well and what did not:",
    "Preventive actions, owners and due dates:"
  ],

  labs: [
    {
      title: "Lab 1: Diagnose a PVC stuck in Pending",
      objective:
        "Learn to distinguish an invalid StorageClass, missing PV and WaitForFirstConsumer scheduling dependency.",
      steps: [
        "Use a non-production cluster or isolated namespace.",
        "Create a test PVC with a deliberately invalid StorageClass name.",
        "Run kubectl describe pvc and capture the exact event.",
        "Check kubectl get storageclass and compare with the intended class.",
        "Correct the manifest and reapply it.",
        "Verify the PVC reaches Bound and the consuming Pod mounts it.",
        "Delete only the lab resources after confirming they contain no important data."
      ]
    },
    {
      title: "Lab 2: Diagnose a mounted-volume permission failure",
      objective:
        "Separate mount failures from filesystem ownership and container identity problems.",
      steps: [
        "Create a disposable test volume and a test Pod.",
        "Mount the volume at /data and run the container with a non-root UID.",
        "Inspect id, ls -ldn /data and the application error.",
        "Compare runAsUser, runAsGroup and fsGroup behavior with the chosen CSI driver.",
        "Apply a minimum-permission correction.",
        "Verify the test container can write and read a test file.",
        "Remove only the disposable lab resources."
      ]
    },
    {
      title: "Lab 3: Exercise volume expansion",
      objective:
        "Verify the complete path from PVC request to filesystem capacity.",
      steps: [
        "Use a storage class and CSI driver that support expansion.",
        "Record the initial PVC size and df -hT output.",
        "Increase the test claim size according to the lab provider's instructions.",
        "Watch PVC conditions and events.",
        "Check backend volume size and filesystem size independently.",
        "Confirm the new capacity is usable from the Pod.",
        "Document any online expansion or remount requirement."
      ]
    },
    {
      title: "Lab 4: Practice backup restoration",
      objective:
        "Demonstrate a verified restore rather than assuming a successful backup is sufficient.",
      steps: [
        "Create disposable test data in a test volume.",
        "Use the organization's approved backup or snapshot tool.",
        "Restore to a separate target volume without overwriting the source.",
        "Compare known test records and file checksums where appropriate.",
        "Run application-level integrity checks.",
        "Measure the recovery duration and record the recovery point.",
        "Document gaps in the restore process."
      ]
    }
  ],

  interviewQuestions: [
    {
      question: "What is the difference between a PV and a PVC?",
      answer:
        "A PersistentVolume represents a storage resource available to the cluster. A PersistentVolumeClaim is a workload's request for storage. Kubernetes binds a compatible claim to a volume or dynamically provisions one through a StorageClass."
    },
    {
      question: "Why can a PVC remain Pending?",
      answer:
        "Possible causes include a missing StorageClass, no compatible static PV, provisioning failure, unsupported access mode, capacity or quota constraints, topology restrictions, or WaitForFirstConsumer waiting for a consuming Pod."
    },
    {
      question: "A PVC is Bound but the Pod is stuck in ContainerCreating. What do you check?",
      answer:
        "Inspect Pod events, FailedAttachVolume and FailedMount messages, VolumeAttachment state, CSI controller and node-plugin health, node topology, mount options and backend availability."
    },
    {
      question: "What does WaitForFirstConsumer do?",
      answer:
        "It delays binding or dynamic provisioning until a consuming Pod is considered for scheduling, helping Kubernetes coordinate storage provisioning with topology and placement constraints."
    },
    {
      question: "What is the difference between ReadWriteOnce and ReadWriteMany?",
      answer:
        "ReadWriteOnce generally allows read-write mounting by one node, while ReadWriteMany permits read-write mounting by multiple nodes when the backend and driver support it. These modes do not override backend limitations or guarantee application-level safe concurrent writes."
    },
    {
      question: "What is a Multi-Attach error?",
      answer:
        "It commonly indicates that a volume restricted to one-node attachment is still attached to another node. Confirm the old writer is safely stopped or fenced before following the documented detach/recovery process."
    },
    {
      question: "What is the difference between Retain and Delete reclaim policies?",
      answer:
        "Retain preserves the backing storage asset for manual recovery or reuse. Delete permits deletion of the backing asset as part of the storage lifecycle. Exact behavior depends on the provisioner and resource lifecycle."
    },
    {
      question: "How do you troubleshoot No space left on device?",
      answer:
        "Check df -hT and df -i, confirm the actual mount path, inspect application quotas and retention, and compare filesystem capacity with backend capacity. Avoid deleting unknown database files."
    },
    {
      question: "Why can a container fail to write to a correctly mounted volume?",
      answer:
        "Possible causes include UID/GID mismatch, directory ownership, read-only mount settings, filesystem ACLs, security context restrictions, exhausted capacity or application-level constraints."
    },
    {
      question: "How do you investigate a failed CSI provisioning operation?",
      answer:
        "Inspect PVC events, StorageClass parameters, CSI controller logs, cloud API errors, identity permissions, quota, backend capacity and topology."
    },
    {
      question: "How do you troubleshoot volume expansion?",
      answer:
        "Confirm StorageClass expansion support, inspect PVC conditions and events, check CSI expansion errors, and verify both backend and filesystem capacity."
    },
    {
      question: "Why is deleting a PVC dangerous?",
      answer:
        "Its lifecycle may affect the bound PV and backing asset, depending on reclaim policy and provisioner behavior. It can also remove a workload's reference to important data. Verify recovery options first."
    },
    {
      question: "What is the difference between a snapshot and an application-consistent backup?",
      answer:
        "A storage snapshot captures a point-in-time storage state, but application consistency depends on the workload and snapshot process. Databases may require coordinated quiescing, native backups or log recovery."
    },
    {
      question: "How do availability zones affect persistent volumes?",
      answer:
        "A zonal block volume is usually constrained to a particular zone. The Pod must be scheduled to a compatible node, and recovery requires honoring the volume's topology."
    },
    {
      question: "What is the purpose of a VolumeAttachment?",
      answer:
        "It represents a Kubernetes request to attach a volume to a node through the storage driver. Its status and events help diagnose attachment problems, but it should not be manually removed as a routine fix."
    },
    {
      question: "How do you safely recover a volume after node failure?",
      answer:
        "Confirm the previous writer is stopped or fenced, verify backend attachment state, follow the CSI/provider recovery procedure, then validate the mount and application data integrity."
    },
    {
      question: "How should production storage alerts be designed?",
      answer:
        "Monitor pending claims, mount and attachment failures, CSI health, capacity, inodes, latency, I/O errors and backup freshness. Set thresholds based on workload impact and recovery objectives."
    },
    {
      question: "What should be verified after storage recovery?",
      answer:
        "Verify claim binding, correct volume attachment, mount state, capacity, permissions, application read/write behavior, database consistency, replication, backups and monitoring."
    }
  ],

  references: [
    {
      title: "Kubernetes Persistent Volumes",
      url: "https://kubernetes.io/docs/concepts/storage/persistent-volumes/"
    },
    {
      title: "Kubernetes Storage Classes",
      url: "https://kubernetes.io/docs/concepts/storage/storage-classes/"
    },
    {
      title: "Kubernetes Volume Snapshots",
      url: "https://kubernetes.io/docs/concepts/storage/volume-snapshots/"
    },
    {
      title: "Kubernetes Storage Capacity",
      url: "https://kubernetes.io/docs/concepts/storage/storage-capacity/"
    },
    {
      title: "Kubernetes Debugging Applications",
      url: "https://kubernetes.io/docs/tasks/debug/debug-application/"
    },
    {
      title: "Container Storage Interface (CSI)",
      url: "https://kubernetes-csi.github.io/docs/"
    }
  ]
};

export default persistentStorageGuide;
```
