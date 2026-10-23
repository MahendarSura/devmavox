export interface kubernetesAdvancedQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export const kubernetesAdvancedQuestions: kubernetesAdvancedQuestion[] = [
  {
    id: "kubernetes-advanced-1",
    question: "Why is a PodDisruptionBudget (PDB) used?",
    options: [
      "It limits voluntary disruptions to an application",
      "It limits CPU usage of each Pod",
      "It automatically scales worker nodes",
      "It restricts network traffic"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-2",
    question: "Which probe determines whether a container should be restarted?",
    options: [
      "Readiness probe",
      "Startup probe only",
      "Liveness probe",
      "Ingress probe"
    ],
    answer: 2
  },
  {
    id: "kubernetes-advanced-3",
    question: "What happens when a readiness probe fails?",
    options: [
      "The container is always restarted immediately",
      "The Pod is removed from ready Service endpoints",
      "The node is drained",
      "The Deployment is deleted"
    ],
    answer: 1
  },
  {
    id: "kubernetes-advanced-4",
    question: "What is the main purpose of a StatefulSet?",
    options: [
      "Run only short-lived batch tasks",
      "Expose Pods outside the cluster",
      "Provide stable identities and storage for stateful workloads",
      "Replace the Kubernetes scheduler"
    ],
    answer: 2
  },
  {
    id: "kubernetes-advanced-5",
    question: "Which resource is commonly used to run a task to completion?",
    options: [
      "DaemonSet",
      "Job",
      "Ingress",
      "ReplicaSet"
    ],
    answer: 1
  },
  {
    id: "kubernetes-advanced-6",
    question: "Why is a DaemonSet used?",
    options: [
      "It ensures a Pod runs on selected or all eligible nodes",
      "It creates one external load balancer per Pod",
      "It stores cluster credentials",
      "It scales replicas based on HTTP requests"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-7",
    question: "What does a Kubernetes Service provide?",
    options: [
      "A stable network endpoint for a set of Pods",
      "Persistent storage for containers",
      "A node operating system upgrade",
      "A container image registry"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-8",
    question: "Which Service type commonly exposes an application through a cloud load balancer?",
    options: [
      "ClusterIP",
      "ExternalName",
      "LoadBalancer",
      "Headless"
    ],
    answer: 2
  },
  {
    id: "kubernetes-advanced-9",
    question: "Why is a NetworkPolicy used?",
    options: [
      "It controls allowed network traffic to and/or from Pods",
      "It sets container memory requests",
      "It chooses the node for every Pod",
      "It rotates TLS certificates automatically"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-10",
    question: "What does a container resource request specify?",
    options: [
      "The maximum CPU it can ever use",
      "The amount used for scheduling decisions",
      "The number of replicas to create",
      "The storage class for its volume"
    ],
    answer: 1
  },
  {
    id: "kubernetes-advanced-11",
    question: "What does a CPU limit generally enforce?",
    options: [
      "A guaranteed minimum CPU allocation",
      "A maximum CPU usage rate",
      "A fixed number of Pods per node",
      "A persistent CPU reservation after exit"
    ],
    answer: 1
  },
  {
    id: "kubernetes-advanced-12",
    question: "What can happen when a container exceeds its memory limit?",
    options: [
      "It may be terminated with an OOM kill",
      "It is automatically moved to another cluster",
      "Its memory limit is increased automatically",
      "The Deployment becomes a StatefulSet"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-13",
    question: "Which controller manages a desired number of interchangeable Pod replicas?",
    options: [
      "Deployment",
      "Secret",
      "IngressClass",
      "StorageClass"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-14",
    question: "What is the main purpose of a ReplicaSet?",
    options: [
      "Maintain a specified number of matching Pod replicas",
      "Create persistent volumes",
      "Manage API server certificates",
      "Route traffic based on URL paths"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-15",
    question: "How does a Deployment typically perform a rolling update?",
    options: [
      "It deletes all Pods and waits indefinitely",
      "It gradually replaces old replicas with new ones",
      "It changes the node operating system directly",
      "It updates only ConfigMaps"
    ],
    answer: 1
  },
  {
    id: "kubernetes-advanced-16",
    question: "Which command is useful for inspecting a Pod's events and configuration?",
    options: [
      "kubectl describe pod POD_NAME",
      "kubectl config view",
      "kubectl api-resources",
      "kubectl version"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-17",
    question: "Which command displays logs from a container?",
    options: [
      "kubectl logs POD_NAME",
      "kubectl label nodes",
      "kubectl cordon NODE_NAME",
      "kubectl get storageclass"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-18",
    question: "A Pod is stuck in Pending. What should you investigate first?",
    options: [
      "Delete the namespace immediately",
      "Inspect Pod events and scheduling constraints",
      "Restart every worker node",
      "Remove all resource requests"
    ],
    answer: 1
  },
  {
    id: "kubernetes-advanced-19",
    question: "A Pod shows ImagePullBackOff. What should you check first?",
    options: [
      "The image name/tag and registry credentials",
      "The Service's ClusterIP only",
      "The PodDisruptionBudget",
      "The Ingress path"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-20",
    question: "A Pod is in CrashLoopBackOff. What is the most useful first step?",
    options: [
      "Check current and previous container logs and termination details",
      "Increase replicas without inspecting anything",
      "Delete all Services",
      "Change the cluster DNS domain"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-21",
    question: "What does kubectl rollout status deployment/APP report?",
    options: [
      "The progress of a Deployment rollout",
      "Network connections on every node",
      "The full container filesystem",
      "Cloud billing totals"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-22",
    question: "What does kubectl rollout undo deployment/APP do?",
    options: [
      "Rolls back to a previous Deployment revision when available",
      "Deletes all historical ReplicaSets",
      "Restarts the API server",
      "Removes a namespace finalizer"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-23",
    question: "What does a node taint do?",
    options: [
      "Repels Pods without a matching toleration",
      "Forces every Pod to run on that node",
      "Creates a persistent volume",
      "Sets the Pod's DNS policy"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-24",
    question: "What does a toleration do?",
    options: [
      "Guarantees that a Pod will schedule on a tainted node",
      "Allows a Pod to tolerate a matching taint but does not guarantee scheduling",
      "Disables resource limits",
      "Makes a Service externally reachable"
    ],
    answer: 1
  },
  {
    id: "kubernetes-advanced-25",
    question: "Why is node affinity used?",
    options: [
      "To express node-selection preferences or requirements for Pods",
      "To define HTTP routes to Services",
      "To store application secrets",
      "To limit requests per user"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-26",
    question: "What is the difference between required and preferred node affinity?",
    options: [
      "Required is a hard rule; preferred is a soft preference",
      "Preferred always overrides required",
      "Required applies only after a Pod starts",
      "There is no difference"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-27",
    question: "What does kubectl drain NODE_NAME generally do?",
    options: [
      "Safely evicts eligible Pods from a node for maintenance",
      "Deletes the entire cluster",
      "Adds a new worker node",
      "Changes all Pods to privileged mode"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-28",
    question: "What does kubectl cordon NODE_NAME do?",
    options: [
      "Marks a node unschedulable for new Pods",
      "Evicts all existing Pods immediately",
      "Deletes the node object",
      "Restarts kubelet"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-29",
    question: "Why can a PodDisruptionBudget affect node draining?",
    options: [
      "It may block eviction if the disruption budget would be violated",
      "It automatically doubles replicas",
      "It disables health probes",
      "It converts Pods to Jobs"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-30",
    question: "What is a headless Service's cluster IP set to?",
    options: [
      "A fixed external IP",
      "None",
      "The node gateway IP",
      "The API server IP"
    ],
    answer: 1
  },
  {
    id: "kubernetes-advanced-31",
    question: "Which workload commonly benefits from a headless Service?",
    options: [
      "A StatefulSet needing discovery of individual Pods",
      "A one-time Job with no network",
      "A ConfigMap-only application",
      "A node-level kernel module"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-32",
    question: "What is the purpose of an Ingress resource?",
    options: [
      "Define HTTP/HTTPS routing rules into cluster Services",
      "Create a persistent disk",
      "Choose container CPU limits",
      "Replace CoreDNS"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-33",
    question: "Does creating an Ingress resource alone guarantee that traffic will be routed?",
    options: [
      "Yes, every cluster routes it automatically",
      "No, an Ingress controller must implement the rules",
      "Yes, even without a controller",
      "Only in the kube-system namespace"
    ],
    answer: 1
  },
  {
    id: "kubernetes-advanced-34",
    question: "What is a ConfigMap intended to store?",
    options: [
      "Non-confidential configuration data",
      "Encrypted passwords by default",
      "Scheduled tasks",
      "Node affinity rules"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-35",
    question: "What is a Kubernetes Secret intended to store?",
    options: [
      "Sensitive values such as tokens or passwords",
      "Every application file automatically",
      "Public Pod endpoints",
      "CPU allocations"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-36",
    question: "Are Kubernetes Secret values automatically protected from every unauthorized reader?",
    options: [
      "Yes, they are always encrypted at rest by default in every cluster",
      "No, RBAC and appropriate encryption/configuration matter",
      "Yes, anyone can read them safely",
      "Secrets cannot be read through the API"
    ],
    answer: 1
  },
  {
    id: "kubernetes-advanced-37",
    question: "What is the purpose of a ServiceAccount?",
    options: [
      "Provide an identity for processes running in a Pod",
      "Reserve a node's CPU",
      "Create a public DNS domain",
      "Store persistent application files"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-38",
    question: "What does Kubernetes RBAC control?",
    options: [
      "Who can perform which actions on which resources",
      "How container images are built",
      "How many CPUs exist on a node",
      "Which cloud region is cheapest"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-39",
    question: "Which RBAC object defines permissions within a namespace?",
    options: [
      "Role",
      "StorageClass",
      "Ingress",
      "RuntimeClass"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-40",
    question: "What is a ClusterRole used for?",
    options: [
      "Define permissions at cluster scope or reusable permissions for bindings",
      "Create a separate control plane",
      "Store one namespace's logs only",
      "Configure container probes"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-41",
    question: "What does the principle of least privilege mean?",
    options: [
      "Grant only the permissions needed for required tasks",
      "Give every user cluster-admin access",
      "Share one administrator token with all workloads",
      "Disable audit logs"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-42",
    question: "What does a PersistentVolumeClaim (PVC) represent?",
    options: [
      "A workload's request for storage",
      "A container image pull policy",
      "A network firewall rule",
      "A node upgrade plan"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-43",
    question: "What is a StorageClass commonly used for?",
    options: [
      "Describe storage classes and dynamic provisioning parameters",
      "Store Kubernetes API credentials",
      "Define HTTP path routing",
      "Set Pod priority"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-44",
    question: "What is dynamic volume provisioning?",
    options: [
      "Automatically create storage for a qualifying PVC",
      "Copy every image to every node",
      "Increase CPU limits when overloaded",
      "Create a Service for every volume"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-45",
    question: "Why might a PVC remain Pending?",
    options: [
      "No suitable provisioner, StorageClass, or matching volume is available",
      "The Pod has too many labels",
      "The Ingress controller is missing",
      "The Service uses TCP"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-46",
    question: "What does ReadWriteOnce generally mean for a PersistentVolume?",
    options: [
      "Read-write mounting by one node at a time",
      "Read-only mounting on every node",
      "Read-write sharing across all nodes in every storage system",
      "Automatic backups are enabled"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-47",
    question: "Why use persistent volumes for durable application data?",
    options: [
      "Container writable layers are not a reliable durable store across replacement",
      "They make every application stateless",
      "They remove the need for backups",
      "They guarantee zero latency"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-48",
    question: "What does a namespace provide?",
    options: [
      "A way to scope and organize namespaced resources",
      "A separate physical cluster in every case",
      "An independent kernel for each Pod",
      "A replacement for RBAC"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-49",
    question: "What does a ResourceQuota help enforce?",
    options: [
      "Aggregate resource or object-count limits within a namespace",
      "A maximum global network latency",
      "A fixed node scheduling order",
      "Automatic image signing"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-50",
    question: "What is the purpose of a LimitRange?",
    options: [
      "Set defaults and/or minimum and maximum resource constraints in a namespace",
      "Route requests between regions",
      "Back up all volumes",
      "Configure external DNS records"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-51",
    question: "What is the purpose of a HorizontalPodAutoscaler (HPA)?",
    options: [
      "Adjust workload replica count based on configured metrics",
      "Add physical worker nodes directly in every environment",
      "Rewrite application code",
      "Manage volume snapshots only"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-52",
    question: "What is a common prerequisite for CPU-utilization-based HPA scaling?",
    options: [
      "CPU requests should be set for containers whose utilization is measured",
      "Every Pod must use hostNetwork",
      "All nodes must be tainted",
      "Ingress must be disabled"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-53",
    question: "What does the Cluster Autoscaler typically do in a supported environment?",
    options: [
      "Adjust node group size when Pods cannot schedule or nodes are underutilized",
      "Change a Deployment image on every release",
      "Scale replicas directly from HTTP headers",
      "Replace the Kubernetes API"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-54",
    question: "How does HPA differ from Cluster Autoscaler?",
    options: [
      "HPA changes workload replicas; Cluster Autoscaler changes node capacity",
      "HPA changes nodes; Cluster Autoscaler changes container images",
      "They always perform identical actions",
      "HPA only manages Secrets"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-55",
    question: "What is the purpose of Pod priority and preemption?",
    options: [
      "Influence scheduling priority and potentially evict lower-priority Pods",
      "Encrypt Pod logs",
      "Create a new namespace for each request",
      "Set DNS TTL"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-56",
    question: "What do Pod topology spread constraints help achieve?",
    options: [
      "Distribute Pods across topology domains such as zones or nodes",
      "Force every Pod onto one node",
      "Store credentials in etcd",
      "Expose the API server publicly"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-57",
    question: "What is Pod anti-affinity used for?",
    options: [
      "Avoid placing selected Pods together according to topology rules",
      "Guarantee that all Pods share a volume",
      "Allow all network traffic",
      "Disable readiness checks"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-58",
    question: "What is a sidecar container pattern?",
    options: [
      "Run a helper container alongside the main application container in a Pod",
      "Run one Pod on every node only",
      "Use a second cluster for DNS",
      "Replace kubelet with a container"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-59",
    question: "What is an init container used for?",
    options: [
      "Complete setup tasks before application containers start",
      "Run continuously after every application container exits",
      "Expose a LoadBalancer Service",
      "Store cluster-wide RBAC rules"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-60",
    question: "What are ephemeral containers mainly useful for?",
    options: [
      "Debug a running Pod when normal containers lack debugging tools",
      "Provide permanent database storage",
      "Replace a Deployment controller",
      "Scale nodes automatically"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-61",
    question: "What is the purpose of a startup probe?",
    options: [
      "Give a slow-starting container time to initialize before liveness checks take effect",
      "Check external DNS records only",
      "Determine whether a PVC can expand",
      "Scale the Deployment based on memory"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-62",
    question: "Why can an overly aggressive liveness probe be harmful?",
    options: [
      "It can repeatedly restart a healthy but slow or temporarily busy application",
      "It always increases throughput",
      "It prevents all Pod scheduling",
      "It disables the Service"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-63",
    question: "What is the effect of a failed readiness probe on traffic?",
    options: [
      "The Pod is generally removed from ready Service endpoints",
      "The node is automatically deleted",
      "The image is rebuilt",
      "The Secret is rotated"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-64",
    question: "What is a lifecycle preStop hook used for?",
    options: [
      "Run a command or HTTP action before container termination proceeds",
      "Run only before the image is pulled",
      "Increase replica count during startup",
      "Change the node's taints"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-65",
    question: "Why is graceful termination important for an HTTP service?",
    options: [
      "It allows in-flight requests to finish where possible before shutdown",
      "It guarantees no failures under every condition",
      "It removes the need for readiness probes",
      "It prevents all node failures"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-66",
    question: "What does terminationGracePeriodSeconds control?",
    options: [
      "The grace period allowed for Pod termination before forceful killing",
      "The time a PVC waits before binding",
      "The maximum age of a Secret",
      "The time before HPA is enabled"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-67",
    question: "What is a Kubernetes EndpointSlice used for?",
    options: [
      "Represent backend network endpoints for Services in scalable slices",
      "Store container environment variables",
      "Track Helm chart versions only",
      "Create a storage snapshot"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-68",
    question: "What is CoreDNS commonly responsible for?",
    options: [
      "Providing DNS-based service discovery inside the cluster",
      "Scheduling Pods onto nodes",
      "Enforcing CPU quotas",
      "Building container images"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-69",
    question: "A Service name does not resolve inside a Pod. What should you check?",
    options: [
      "DNS Pod health, Service name/namespace, and DNS configuration",
      "Only the Deployment's rollout history",
      "Only the PVC access mode",
      "The node's image cache first"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-70",
    question: "What is a CNI plugin responsible for?",
    options: [
      "Implement Pod networking and related network connectivity",
      "Manage Deployment revision history",
      "Encrypt every Secret automatically",
      "Create container images"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-71",
    question: "What is kube-proxy commonly responsible for?",
    options: [
      "Implement Service virtual-IP traffic forwarding rules in supported modes",
      "Build application binaries",
      "Schedule Pods based on CPU requests",
      "Rotate application passwords"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-72",
    question: "What does a NetworkPolicy require to be enforced?",
    options: [
      "A network plugin that supports NetworkPolicy enforcement",
      "A LoadBalancer for every Pod",
      "A StatefulSet in every namespace",
      "A public IP on each node"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-73",
    question: "What is a default-deny NetworkPolicy commonly used for?",
    options: [
      "Block selected traffic unless explicitly allowed by other policies",
      "Allow every connection from the internet",
      "Disable Pod networking permanently",
      "Increase CPU scheduling priority"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-74",
    question: "What is the purpose of Pod Security Admission?",
    options: [
      "Apply configured Pod security standards to Pod creation and updates",
      "Scan application logs for errors only",
      "Provide persistent storage",
      "Manage Service IP allocation"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-75",
    question: "Why should privileged containers be restricted?",
    options: [
      "They can gain extensive host access and increase security risk",
      "They always use less memory",
      "They cannot access host resources",
      "They make RBAC unnecessary"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-76",
    question: "What are imagePullSecrets used for?",
    options: [
      "Provide credentials for pulling images from a private registry",
      "Encrypt all images after they start",
      "Set image CPU limits",
      "Create a container registry"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-77",
    question: "How can you test whether an identity can perform an RBAC-protected action?",
    options: [
      "Use kubectl auth can-i with the relevant verb and resource",
      "Grant cluster-admin to every user permanently",
      "Disable authentication",
      "Delete all Roles"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-78",
    question: "What is etcd in a Kubernetes control plane?",
    options: [
      "A consistent key-value store for cluster state",
      "The default container runtime in every cluster",
      "A Pod network overlay",
      "The built-in metrics dashboard"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-79",
    question: "Why are etcd backups important?",
    options: [
      "They can help recover cluster state after certain failures or data loss",
      "They automatically restore every application database",
      "They replace all workload backups",
      "They eliminate the need for access control"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-80",
    question: "What is the Kubernetes scheduler responsible for?",
    options: [
      "Select a suitable node for an unscheduled Pod",
      "Build container images",
      "Route external HTTP requests",
      "Encrypt application data at rest"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-81",
    question: "What is the API server's primary role?",
    options: [
      "Expose and validate the Kubernetes API and coordinate access to cluster state",
      "Run every application container itself",
      "Provide all persistent disks directly",
      "Replace the scheduler"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-82",
    question: "What does the controller manager generally do?",
    options: [
      "Run controllers that reconcile observed state toward desired state",
      "Serve every application's web traffic",
      "Build container images",
      "Provide node kernel networking"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-83",
    question: "What does declarative configuration mean in Kubernetes?",
    options: [
      "Specify desired state and let controllers reconcile toward it",
      "Manually SSH to each node for every change",
      "Store all configuration only in container images",
      "Disable reconciliation loops"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-84",
    question: "What is the purpose of a CustomResourceDefinition (CRD)?",
    options: [
      "Extend the Kubernetes API with a custom resource type",
      "Create a physical worker node",
      "Replace all built-in resources",
      "Automatically build container images"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-85",
    question: "What is a Kubernetes operator designed to do?",
    options: [
      "Use controllers and domain-specific logic to manage an application lifecycle",
      "Replace the container runtime on every node",
      "Expose every Pod directly to the internet",
      "Disable reconciliation"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-86",
    question: "Why should production workloads define resource requests and limits carefully?",
    options: [
      "To improve scheduling predictability and reduce resource contention risks",
      "To guarantee the application has no bugs",
      "To eliminate the need for monitoring",
      "To make all Pods run on one node"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-87",
    question: "What is a common cause of a Pod entering the Evicted state?",
    options: [
      "Node pressure such as insufficient memory or ephemeral storage",
      "A successful readiness probe",
      "A correctly configured Service",
      "A valid ConfigMap"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-88",
    question: "What does a node condition MemoryPressure indicate?",
    options: [
      "The node is under memory pressure",
      "The node has no network interface",
      "The API server has been deleted",
      "All Pods are healthy"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-89",
    question: "What is the purpose of kubectl top pods?",
    options: [
      "Show available Pod CPU and memory usage metrics",
      "Display all Pod YAML manifests",
      "List all container image layers",
      "Show RBAC bindings only"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-90",
    question: "What is the purpose of a Pod's securityContext?",
    options: [
      "Configure security-related settings such as user IDs and privilege controls",
      "Define external HTTP routes",
      "Set Service endpoint IP addresses",
      "Create node autoscaling groups"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-91",
    question: "Why should containers run as non-root when practical?",
    options: [
      "It reduces the impact of some container compromises",
      "It automatically encrypts all network traffic",
      "It guarantees zero vulnerabilities",
      "It removes the need for RBAC"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-92",
    question: "What is the purpose of a read-only root filesystem for a container?",
    options: [
      "Reduce unwanted writes to the container's root filesystem",
      "Make every mounted volume read-only automatically",
      "Prevent the container from reading files",
      "Disable all network connections"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-93",
    question: "Why should Kubernetes API access from a Pod be restricted when it is not needed?",
    options: [
      "It reduces the impact of a compromised workload",
      "It automatically improves DNS resolution",
      "It guarantees that the Pod never restarts",
      "It increases the node's CPU capacity"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-94",
    question: "What is the purpose of an admission controller?",
    options: [
      "Validate or mutate API requests before resources are persisted",
      "Schedule every Pod onto a node",
      "Build and push container images",
      "Replace kubelet on worker nodes"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-95",
    question: "What should you check if a Deployment rollout is stuck?",
    options: [
      "Deployment conditions, ReplicaSet status, Pod events, and readiness",
      "Only the cluster name",
      "Only the local shell theme",
      "The number of namespaces without inspecting Pods"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-96",
    question: "What is a safe first response when a new release causes production errors?",
    options: [
      "Assess impact, inspect rollout and metrics, then roll back if appropriate",
      "Delete the entire cluster immediately",
      "Disable all monitoring",
      "Grant every Pod privileged access"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-97",
    question: "Why are readiness probes important during a rolling deployment?",
    options: [
      "They help keep unready Pods out of ready Service endpoints",
      "They build the container image",
      "They automatically back up etcd",
      "They replace resource requests"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-98",
    question: "What is the purpose of a canary deployment strategy?",
    options: [
      "Release a change to a small subset of traffic or instances before wider rollout",
      "Deploy every change to all users at once",
      "Disable health checks during deployment",
      "Replace all monitoring with logs"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-99",
    question: "Why should Kubernetes workloads be monitored with metrics, logs, and events?",
    options: [
      "They provide complementary evidence for detecting and diagnosing failures",
      "They guarantee that failures cannot occur",
      "They remove the need for testing",
      "They automatically fix every application bug"
    ],
    answer: 0
  },
  {
    id: "kubernetes-advanced-100",
    question: "What is the main benefit of using declarative manifests in version control?",
    options: [
      "Changes can be reviewed, tracked, and applied consistently",
      "They eliminate the need for access control",
      "They guarantee every deployment succeeds",
      "They prevent all configuration mistakes automatically"
    ],
    answer: 0
  }
];
