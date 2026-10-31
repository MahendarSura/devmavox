import type { NoteData } from "../../types";

const data: NoteData = {
  title: "StatefulSets, DaemonSets and Jobs",
  description: "Detailed Kubernetes notes covering statefulsets, daemonsets and jobs, practical operations, troubleshooting and production scenarios.",
  sections: [
    {
          heading: "16. DaemonSets, StatefulSets, Jobs and CronJobs",
          explanation: `
    Kubernetes provides different workload controllers for different application patterns.
    
    DAEMONSET:
    Runs a Pod on each eligible node or selected nodes.
    
    Common uses:
    - Log collectors.
    - Monitoring agents.
    - Node-level networking components.
    
    STATEFULSET:
    Manages stateful applications that need stable identities and often persistent storage.
    
    Common uses:
    - Distributed databases.
    - Stateful services.
    - Systems requiring stable Pod identities.
    
    JOB:
    Runs Pods to completion for a task.
    
    Common uses:
    - Data processing.
    - Database migration.
    - One-time maintenance tasks.
    
    CRONJOB:
    Creates Jobs on a scheduled basis.
    
    Common uses:
    - Scheduled backups.
    - Reports.
    - Cleanup tasks.
    
    IMPORTANT:
    StatefulSets do not automatically make an application highly available. The application and storage architecture must also support the required availability and recovery model.
    
    CronJobs can overlap depending on scheduling and execution duration. Use suitable concurrency policies and application-level safeguards.
          `,
          steps: [
            "Choose the correct workload controller for the application.",
            "Check the controller status.",
            "Inspect the Pods it manages.",
            "Read logs and events.",
            "Check scheduling and storage requirements.",
            "For Jobs, inspect completion status and failed attempts.",
            "For CronJobs, verify schedule and concurrency behavior."
          ],
          commands: `
    kubectl get daemonsets -A
    
    kubectl get statefulsets -A
    
    kubectl get jobs -A
    
    kubectl get cronjobs -A
    
    kubectl describe job <job-name> -n <namespace>
    
    kubectl logs job/<job-name> -n <namespace>
    
    kubectl describe cronjob <cronjob-name> -n <namespace>
          `,
          problems: [
            {
              issue: "DaemonSet does not run on every expected node.",
              rootCause:
                "Node selectors, affinity, taints or tolerations may prevent scheduling.",
              solution:
                "Inspect the DaemonSet template and node conditions, labels and taints."
            },
            {
              issue: "StatefulSet Pod remains Pending.",
              rootCause:
                "Its PVC may be unbound, storage may be unavailable or scheduling constraints may not be satisfied.",
              solution:
                "Inspect the Pod and PVC events, StorageClass and node scheduling conditions."
            },
            {
              issue: "CronJob does not execute as expected.",
              rootCause:
                "The schedule, timezone assumptions, suspend setting, concurrency policy or Job execution may be incorrect.",
              solution:
                "Inspect CronJob configuration, recent Jobs, events and Job logs. Verify schedule behavior in the cluster version being used."
            }
          ]
        }
  ]
};

export default data;
