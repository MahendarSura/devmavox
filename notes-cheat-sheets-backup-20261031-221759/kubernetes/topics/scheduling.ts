import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Scheduling",
  description: "Detailed Kubernetes notes covering scheduling, practical operations, troubleshooting and production scenarios.",
  sections: [
    {
          heading: "12. Scheduling – Requests, Limits, Taints, Tolerations and Affinity",
          explanation: `
    The Kubernetes Scheduler selects a suitable node for each unscheduled Pod.
    
    RESOURCE REQUESTS:
    Tell Kubernetes how much CPU and memory a container requests for scheduling decisions.
    
    RESOURCE LIMITS:
    Set upper resource limits for supported resources.
    
    CPU:
    CPU limits can cause throttling when the container tries to use more than its quota.
    
    MEMORY:
    Memory limits can result in an OOM kill if the container exceeds its allowed memory.
    
    TAINTS:
    A node taint repels Pods unless they have a matching toleration.
    
    TOLERATIONS:
    Allow a Pod to be scheduled onto a node with a matching taint. A toleration does not force scheduling onto that node.
    
    NODE SELECTOR:
    A simple way to constrain Pods to nodes with matching labels.
    
    NODE AFFINITY:
    Provides more expressive node selection rules.
    
    POD AFFINITY:
    Can influence placement near other Pods.
    
    POD ANTI-AFFINITY:
    Can spread or separate Pods based on labels and topology.
    
    COMMON SCHEDULING PROBLEMS:
    
    - Insufficient CPU.
    - Insufficient memory.
    - Untolerated taint.
    - Node selector mismatch.
    - Affinity rules cannot be satisfied.
    - PVC cannot bind.
    - Node is NotReady.
    - Pod topology constraints cannot be satisfied.
    
    The scheduler events usually provide the first useful explanation.
          `,
          steps: [
            "Describe the Pending Pod.",
            "Read scheduler events.",
            "Inspect node resource capacity and allocated requests.",
            "Check node labels and taints.",
            "Check Pod selectors, affinity and tolerations.",
            "Check PVC binding if storage is involved.",
            "Correct the constraint or provide appropriate capacity.",
            "Verify that the Pod is scheduled and becomes Ready."
          ],
          commands: `
    kubectl describe pod <pod-name> -n <namespace>
    
    kubectl get nodes --show-labels
    
    kubectl describe node <node-name>
    
    kubectl top nodes
    
    kubectl top pods -A
    
    kubectl get events -A --sort-by=.lastTimestamp
          `,
          config: `
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: api
    spec:
      replicas: 2
      selector:
        matchLabels:
          app: api
      template:
        metadata:
          labels:
            app: api
        spec:
          containers:
            - name: api
              image: my-api:v1
              resources:
                requests:
                  cpu: "250m"
                  memory: "256Mi"
                limits:
                  cpu: "1"
                  memory: "512Mi"
          `,
          problems: [
            {
              issue: "Pod remains Pending with Insufficient CPU.",
              rootCause:
                "No eligible node has enough unallocated CPU capacity to satisfy the Pod's CPU request.",
              solution:
                "Review CPU requests, node capacity and workload placement. Right-size requests based on actual usage or add capacity."
            },
            {
              issue: "Pod is not scheduled because of an untolerated taint.",
              rootCause:
                "The node has a taint that the Pod does not tolerate.",
              solution:
                "Review whether the Pod should run on that node. Add an appropriate toleration only when the workload is intended to use it."
            },
            {
              issue: "Pod cannot schedule due to node affinity.",
              rootCause:
                "The required node labels or affinity constraints cannot be satisfied.",
              solution:
                "Compare Pod affinity rules with actual node labels. Correct the selector or node configuration."
            }
          ]
        },
    {
          heading: "23. Production Incident – Pod Stuck in Pending",
          explanation: `
    SCENARIO:
    
    A Deployment requests five replicas, but two Pods remain Pending.
    
    The application has fewer available replicas than expected.
    
    COMMON REASONS:
    
    - Insufficient CPU.
    - Insufficient memory.
    - Untolerated node taints.
    - Node selector mismatch.
    - Affinity constraints.
    - PVC not bound.
    - Node not ready.
    - Pod topology restrictions.
    
    INVESTIGATION:
    
    1. Describe the Pending Pod.
    2. Read scheduler events.
    3. Check node capacity.
    4. Check allocated resource requests.
    5. Inspect taints and tolerations.
    6. Inspect node labels and affinity.
    7. Check PVC status if the Pod needs storage.
    
    EXAMPLE:
    
    Pod requests:
    CPU: 4 cores.
    Memory: 8Gi.
    
    But available eligible nodes do not have sufficient unallocated capacity.
    
    The scheduler cannot place the Pod.
    
    FIX:
    
    Review resource requests and actual workload needs, or provide additional suitable capacity.
    
    Do not simply reduce requests below safe application requirements.
          `,
          steps: [
            "Identify all Pending Pods.",
            "Describe each affected Pod.",
            "Read FailedScheduling events.",
            "Check node CPU and memory capacity.",
            "Check Pod requests and limits.",
            "Check node labels and taints.",
            "Check PVC binding.",
            "Resolve the exact scheduling constraint.",
            "Verify the Pod is assigned to a node."
          ],
          commands: `
    kubectl get pods -n production -o wide
    
    kubectl describe pod <pod-name> -n production
    
    kubectl get nodes
    
    kubectl describe nodes
    
    kubectl top nodes
    
    kubectl get pvc -n production
    
    kubectl get events -n production --sort-by=.lastTimestamp
          `,
          problems: [
            {
              issue: "0/N nodes are available: Insufficient cpu.",
              rootCause:
                "No eligible node has enough unallocated CPU to satisfy the Pod request.",
              solution:
                "Review requests, capacity and placement constraints. Right-size the workload or add suitable node capacity."
            },
            {
              issue: "0/N nodes are available: node(s) had untolerated taint.",
              rootCause:
                "The Pod does not tolerate a taint on the available nodes.",
              solution:
                "Check whether the workload is intended to run on those nodes and add only the appropriate toleration."
            }
          ]
        }
  ]
};

export default data;
