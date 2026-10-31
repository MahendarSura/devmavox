import type { NoteData } from "../../types";

const data: NoteData = {
  title: "Kubernetes Architecture",
  description: "Detailed Kubernetes notes covering kubernetes architecture, practical operations, troubleshooting and production scenarios.",
  sections: [
    {
          heading: "02. Kubernetes Architecture – Control Plane and Worker Nodes",
          explanation: `
    Kubernetes architecture has two major areas:
    
    1. Control Plane.
    2. Worker Nodes.
    
    CONTROL PLANE COMPONENTS:
    
    API SERVER:
    The API Server is the main entry point to the Kubernetes control plane.
    
    kubectl sends requests to the API Server.
    
    The API Server validates requests, authenticates and authorizes users, and processes Kubernetes API operations.
    
    ETCD:
    etcd is a distributed key-value store used to store Kubernetes cluster state.
    
    It stores information about resources such as:
    - Pods.
    - Deployments.
    - Services.
    - Configurations.
    - Cluster metadata.
    
    Important:
    Protect etcd carefully. Its data is critical to cluster recovery.
    
    SCHEDULER:
    The Scheduler selects a suitable worker node for a newly created Pod that has not yet been assigned to a node.
    
    It considers factors such as:
    - Available resources.
    - Resource requests.
    - Node selectors.
    - Affinity and anti-affinity.
    - Taints and tolerations.
    - Scheduling constraints.
    
    CONTROLLER MANAGER:
    Runs controllers that continuously compare actual cluster state with desired state.
    
    Example:
    If a Deployment requires three replicas but only two matching Pods exist, the relevant controllers work to restore the desired state.
    
    CLOUD CONTROLLER MANAGER:
    Integrates Kubernetes with supported cloud infrastructure where applicable.
    
    WORKER NODE COMPONENTS:
    
    KUBELET:
    An agent running on each node. It communicates with the API Server and ensures assigned Pods are running as expected.
    
    CONTAINER RUNTIME:
    Runs containers. Examples include containerd and CRI-O.
    
    KUBE-PROXY:
    Provides Service networking behavior on many cluster configurations. Some networking implementations replace or do not use kube-proxy.
    
    CNI:
    Container Network Interface plugins provide Pod networking.
    
    HOW A POD GETS CREATED:
    
    1. Engineer submits a Deployment YAML.
    2. API Server validates the request.
    3. Desired state is stored in etcd.
    4. Deployment controller creates or updates a ReplicaSet.
    5. ReplicaSet controller creates Pods.
    6. Scheduler assigns Pods to suitable nodes.
    7. Kubelet on each node receives the assigned Pod specification.
    8. Container runtime pulls images and starts containers.
    9. CNI configures Pod networking.
    10. Pod status is reported back to the API Server.
    
    TROUBLESHOOTING:
    If a Pod is Pending, investigate scheduling and storage.
    If a Pod is ContainerCreating, investigate image, volume, sandbox and runtime setup.
    If a Pod is Running but application requests fail, investigate application and networking.
          `,
          steps: [
            "Check API Server connectivity.",
            "Check node readiness.",
            "Inspect Pod events.",
            "Identify whether failure is control-plane, node, runtime or application related.",
            "Check kubelet and runtime logs when node-level investigation is required.",
            "Correlate timestamps across Kubernetes events and node logs."
          ],
          commands: `
    kubectl cluster-info
    
    kubectl get nodes -o wide
    
    kubectl get componentstatuses
    
    kubectl get pods -n kube-system
    
    kubectl get events -A --sort-by=.lastTimestamp
    
    # On a Linux worker node
    sudo systemctl status kubelet
    
    sudo journalctl -u kubelet --since "30 minutes ago"
    
    sudo systemctl status containerd
          `,
          problems: [
            {
              issue: "Worker node becomes NotReady.",
              rootCause:
                "The kubelet may be unavailable, node resources may be exhausted, container runtime may have failed or network connectivity to the control plane may be broken.",
              solution:
                "Inspect node conditions and events. Check kubelet, container runtime, disk, memory and node-to-control-plane connectivity."
            },
            {
              issue: "New Pods remain Pending.",
              rootCause:
                "The scheduler may not find a node satisfying resource requests, affinity, taints, storage or other scheduling requirements.",
              solution:
                "Use kubectl describe pod and inspect scheduler events to identify the exact scheduling constraint."
            }
          ]
        }
  ]
};

export default data;
