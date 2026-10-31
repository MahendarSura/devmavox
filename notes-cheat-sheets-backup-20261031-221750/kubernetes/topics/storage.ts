import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Persistent Storage",
  description: "Detailed Kubernetes notes covering persistent storage, practical operations, troubleshooting and production scenarios.",
  sections: [
    {
          heading: "11. Persistent Volumes and Persistent Volume Claims",
          explanation: `
    Kubernetes storage is used when application data must survive Pod replacement.
    
    IMPORTANT STORAGE CONCEPTS:
    
    PersistentVolume (PV):
    A cluster storage resource.
    
    PersistentVolumeClaim (PVC):
    A request for storage by an application.
    
    StorageClass:
    Defines how storage can be dynamically provisioned.
    
    CSI:
    Container Storage Interface. It provides a standard interface for storage systems to integrate with Kubernetes.
    
    ACCESS MODES:
    
    ReadWriteOnce:
    The volume can be mounted read-write by a single node at a time, subject to the storage implementation's behavior.
    
    ReadOnlyMany:
    The volume can be mounted read-only by many nodes where supported.
    
    ReadWriteMany:
    The volume can be mounted read-write by many nodes where supported.
    
    ReadWriteOncePod:
    Restricts read-write mounting to a single Pod where supported.
    
    IMPORTANT:
    Access modes do not guarantee every storage system supports the same behavior. Verify the StorageClass and CSI driver capabilities.
    
    COMMON PVC PROBLEMS:
    
    - PVC remains Pending.
    - No matching StorageClass.
    - Insufficient storage capacity.
    - Access mode unsupported.
    - CSI driver failure.
    - Volume attach failure.
    - Volume mount failure.
    - Permission denied inside the container.
    
    Production databases need tested backup and restore procedures. A PVC is persistent storage, not a backup.
          `,
          steps: [
            "Check PVC status.",
            "Describe the PVC and inspect events.",
            "Check available PVs and StorageClasses.",
            "Check storage provisioner or CSI driver health.",
            "Check requested capacity and access mode.",
            "Inspect Pod mount events.",
            "Verify filesystem permissions inside the container.",
            "Test backup and restore separately."
          ],
          commands: `
    kubectl get pv
    
    kubectl get pvc -A
    
    kubectl describe pvc <pvc-name> -n <namespace>
    
    kubectl get storageclass
    
    kubectl get pods -n kube-system
    
    kubectl describe pod <pod-name> -n <namespace>
          `,
          config: `
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: database-pvc
      namespace: production
    spec:
      accessModes:
        - ReadWriteOnce
      storageClassName: standard
      resources:
        requests:
          storage: 20Gi
          `,
          problems: [
            {
              issue: "PersistentVolumeClaim remains Pending.",
              rootCause:
                "No suitable storage provisioner or PV may be available, or the StorageClass, capacity or access mode may be incorrect.",
              solution:
                "Inspect PVC events, StorageClass configuration, PV availability and CSI provisioner health."
            },
            {
              issue: "Pod reports FailedMount.",
              rootCause:
                "The volume may not attach or mount because of storage driver, node, filesystem or permission problems.",
              solution:
                "Inspect Pod events, CSI driver logs, node conditions and storage backend status."
            },
            {
              issue: "Application cannot write to mounted storage.",
              rootCause:
                "The container process may not have the required filesystem permissions.",
              solution:
                "Check UID/GID, filesystem ownership and securityContext settings. Apply the minimum required permission changes."
            }
          ]
        }
  ]
};

export default data;
