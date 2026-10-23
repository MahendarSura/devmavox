```ts
export interface KubernetesQuestion {
  question: string;
  options: string[];
  answer: number;
}

export const kubernetesQuestions: KubernetesQuestion[] = [
  {
    question: "1. A Pod is stuck in Pending. What should you check first?",
    options: [
      "Pod logs only",
      "Pod events using kubectl describe pod",
      "Container image history",
      "Service endpoints only"
    ],
    answer: 1
  },
  {
    question: "2. A Pod is repeatedly restarting with CrashLoopBackOff. What is the best first step?",
    options: [
      "Delete the namespace",
      "Increase the NodePort range",
      "Check container logs and Pod events",
      "Reinstall Kubernetes"
    ],
    answer: 2
  },
  {
    question: "3. A container exits immediately after starting. Which configuration is most likely responsible?",
    options: [
      "Its command or entrypoint",
      "The Service ClusterIP",
      "The Ingress hostname",
      "The StorageClass name"
    ],
    answer: 0
  },
  {
    question: "4. Which command displays logs from a container in a Pod?",
    options: [
      "kubectl describe node",
      "kubectl get events",
      "kubectl get services",
      "kubectl logs <pod-name>"
    ],
    answer: 3
  },
  {
    question: "5. A container restarted and its previous logs are needed. Which command helps?",
    options: [
      "kubectl logs <pod-name> --all",
      "kubectl logs <pod-name> --previous",
      "kubectl get logs <pod-name>",
      "kubectl describe logs <pod-name>"
    ],
    answer: 1
  },
  {
    question: "6. A Deployment has 3 desired replicas but only 1 Pod is running. What should you investigate?",
    options: [
      "Only the cluster DNS name",
      "Only the Service type",
      "Deployment status, ReplicaSet events, and scheduling failures",
      "Only the container registry password"
    ],
    answer: 2
  },
  {
    question: "7. Which Kubernetes object maintains the desired number of Pod replicas?",
    options: [
      "ReplicaSet",
      "ConfigMap",
      "Ingress",
      "ServiceAccount"
    ],
    answer: 0
  },
  {
    question: "8. You need to roll back a Deployment to its previous revision. Which command is appropriate?",
    options: [
      "kubectl delete deployment",
      "kubectl rollout pause deployment/<name>",
      "kubectl scale deployment/<name> --replicas=0",
      "kubectl rollout undo deployment/<name>"
    ],
    answer: 3
  },
  {
    question: "9. How can you check whether a Deployment rollout has completed?",
    options: [
      "kubectl get namespaces",
      "kubectl rollout status deployment/<name>",
      "kubectl get storageclass",
      "kubectl logs deployment/<name> --previous"
    ],
    answer: 1
  },
  {
    question: "10. What is a key benefit of a Deployment in production?",
    options: [
      "It replaces the container runtime",
      "It removes the need for health checks",
      "It supports declarative updates and rollout management",
      "It automatically encrypts all application traffic"
    ],
    answer: 2
  },
  {
    question: "11. A Service cannot reach application Pods. What should you verify first?",
    options: [
      "Service selector matches the Pod labels",
      "The namespace has a different name",
      "The Deployment has no revision history",
      "The Node has a unique hostname"
    ],
    answer: 0
  },
  {
    question: "12. Which Service type is commonly used to expose an application externally through a node port?",
    options: [
      "ExternalName",
      "ClusterIP",
      "Headless",
      "NodePort"
    ],
    answer: 3
  },
  {
    question: "13. Which Service type commonly exposes an application using a cloud-provider load balancer?",
    options: [
      "ClusterIP",
      "LoadBalancer",
      "ExternalName",
      "Headless"
    ],
    answer: 1
  },
  {
    question: "14. A Service exists but has no endpoints. What is a likely cause?",
    options: [
      "The API server has too many namespaces",
      "The Node has a hostname",
      "No ready Pods match the Service selector",
      "The Deployment uses a container image"
    ],
    answer: 2
  },
  {
    question: "15. What does a ClusterIP Service provide by default?",
    options: [
      "Internal cluster network access",
      "A public DNS record automatically",
      "A dedicated physical server",
      "A public IP on every Pod"
    ],
    answer: 0
  },
  {
    question: "16. What is the main purpose of an Ingress resource?",
    options: [
      "Store container logs",
      "Allocate persistent disk space",
      "Schedule Pods onto Nodes",
      "Define HTTP/HTTPS routing rules to Services through an Ingress controller"
    ],
    answer: 3
  },
  {
    question: "17. An Ingress resource exists, but the application is unreachable. What should you check?",
    options: [
      "Only the Pod restart count",
      "Ingress controller, routing rules, DNS, and backend Service",
      "Only the Secret creation timestamp",
      "Only the Node operating system version"
    ],
    answer: 1
  },
  {
    question: "18. What is a headless Service commonly used for?",
    options: [
      "Creating a public load balancer",
      "Restarting failed containers",
      "Direct service discovery of individual Pod endpoints",
      "Encrypting container images"
    ],
    answer: 2
  },
  {
    question: "19. Which resource is intended to store non-sensitive configuration data?",
    options: [
      "ConfigMap",
      "Secret",
      "PersistentVolume",
      "NetworkPolicy"
    ],
    answer: 0
  },
  {
    question: "20. What is an important security consideration for Kubernetes Secrets?",
    options: [
      "Secrets are always stored encrypted regardless of configuration",
      "Base64 encoding is equivalent to encryption",
      "Anyone with Pod access automatically has no Secret access",
      "Configure encryption at rest and restrict access with RBAC"
    ],
    answer: 3
  },
  {
    question: "21. A ConfigMap was updated, but an application's environment variable did not change. Why?",
    options: [
      "ConfigMaps cannot contain strings",
      "Environment variables in existing containers do not update automatically",
      "Services cache every environment variable permanently",
      "Nodes cannot read ConfigMaps"
    ],
    answer: 1
  },
  {
    question: "22. What is a common way to apply updated configuration to Pods using environment variables?",
    options: [
      "Delete the entire cluster",
      "Change the NodePort",
      "Trigger a controlled Pod rollout",
      "Delete the ServiceAccount"
    ],
    answer: 2
  },
  {
    question: "23. Which command displays detailed information and recent events for a Pod?",
    options: [
      "kubectl describe pod <pod-name>",
      "kubectl rollout history node/<node-name>",
      "kubectl get secret --watch-only",
      "kubectl expose namespace"
    ],
    answer: 0
  },
  {
    question: "24. A Pod reports ImagePullBackOff. What is the most relevant investigation?",
    options: [
      "Check the application's readiness probe only",
      "Increase the Pod replica count",
      "Change the Service ClusterIP",
      "Verify image name, tag, registry access, and imagePullSecrets"
    ],
    answer: 3
  },
  {
    question: "25. What does a readiness probe control?",
    options: [
      "Whether the Node can join the cluster",
      "Whether a Pod is considered ready to receive Service traffic",
      "Whether the container image can be downloaded",
      "Whether the PersistentVolume is encrypted"
    ],
    answer: 1
  },
  {
    question: "26. What is the primary purpose of a liveness probe?",
    options: [
      "Assign an external IP address",
      "Check whether a Service has a selector",
      "Detect an unhealthy container and potentially restart it",
      "Resize a PersistentVolume automatically"
    ],
    answer: 2
  },
  {
    question: "27. When is a startup probe especially useful?",
    options: [
      "When an application takes a long time to initialize",
      "When a Service needs a public IP",
      "When a Namespace is being deleted",
      "When a Secret needs a new name"
    ],
    answer: 0
  },
  {
    question: "28. A readiness probe fails while the container continues running. What usually happens?",
    options: [
      "The Node is automatically deleted",
      "The container image is rebuilt",
      "The Namespace is recreated",
      "The Pod is marked unready and normally removed from ready Service endpoints"
    ],
    answer: 3
  },
  {
    question: "29. A liveness probe is configured too aggressively. What problem can result?",
    options: [
      "PersistentVolumes become Services",
      "Healthy containers restart repeatedly",
      "RBAC permissions expand automatically",
      "Deployments stop creating ReplicaSets permanently"
    ],
    answer: 1
  },
  {
    question: "30. A Pod is OOMKilled. What is a likely explanation?",
    options: [
      "Its Service selector is incorrect",
      "Its DNS record is missing",
      "It exceeded its memory limit or was affected by memory pressure",
      "Its Ingress path is incorrect"
    ],
    answer: 2
  },
  {
    question: "31. Which field specifies a container's memory limit?",
    options: [
      "resources.limits.memory",
      "resources.requests.cpu",
      "spec.nodeName",
      "metadata.generation"
    ],
    answer: 0
  },
  {
    question: "32. What do CPU requests help Kubernetes determine?",
    options: [
      "The public IP of a Pod",
      "The number of namespaces to create",
      "The size of every container image",
      "Scheduling resource requirements and CPU allocation guarantees"
    ],
    answer: 3
  },
  {
    question: "33. A Pod remains Pending because of insufficient CPU. What is a sensible fix?",
    options: [
      "Change its application hostname",
      "Review resource requests and available Node capacity",
      "Delete all ConfigMaps",
      "Expose the Pod with NodePort"
    ],
    answer: 1
  },
  {
    question: "34. What does a HorizontalPodAutoscaler commonly scale?",
    options: [
      "The number of API servers directly",
      "The size of a container image",
      "The replica count of a supported workload based on metrics",
      "The number of Kubernetes namespaces automatically"
    ],
    answer: 2
  },
  {
    question: "35. A CPU-based HPA shows unknown metrics. What should you investigate?",
    options: [
      "Metrics Server, resource requests, and metrics API availability",
      "Only the Ingress TLS certificate",
      "Only the image tag",
      "Only the Namespace labels"
    ],
    answer: 0
  },
  {
    question: "36. What is the main purpose of a PodDisruptionBudget?",
    options: [
      "Prevent all voluntary maintenance permanently",
      "Guarantee every Pod runs on a separate cluster",
      "Automatically scale Nodes in every environment",
      "Limit simultaneous voluntary disruptions to preserve availability"
    ],
    answer: 3
  },
  {
    question: "37. Which Kubernetes feature helps spread replicas across failure domains?",
    options: [
      "ConfigMap volume mounts",
      "Topology spread constraints",
      "Container image tags",
      "ServiceAccount token projection only"
    ],
    answer: 1
  },
  {
    question: "38. What is the purpose of node affinity?",
    options: [
      "Expose a Service externally",
      "Store sensitive application data",
      "Express rules or preferences for scheduling Pods onto Nodes",
      "Define HTTP path routing"
    ],
    answer: 2
  },
  {
    question: "39. What does a taint on a Node generally do?",
    options: [
      "Repels Pods that do not have a matching toleration",
      "Forces every Pod onto that Node",
      "Changes all Pods to privileged mode",
      "Automatically creates a LoadBalancer Service"
    ],
    answer: 0
  },
  {
    question: "40. What does a toleration do?",
    options: [
      "Guarantees a Pod is scheduled on a specific Node",
      "Removes every Node taint in the cluster",
      "Overrides all affinity rules",
      "Allows a Pod to tolerate a matching taint but does not guarantee placement"
    ],
    answer: 3
  },
  {
    question: "41. Which command lists Nodes and their readiness status?",
    options: [
      "kubectl get deployments",
      "kubectl get nodes",
      "kubectl get ingresses",
      "kubectl get configmaps"
    ],
    answer: 1
  },
  {
    question: "42. A Node is NotReady. What should you investigate?",
    options: [
      "Only the application's HTTP route",
      "Only the ConfigMap contents",
      "Node conditions, kubelet, container runtime, networking, and resource pressure",
      "Only the Deployment revision number"
    ],
    answer: 2
  },
  {
    question: "43. What does cordoning a Node do?",
    options: [
      "Marks the Node unschedulable for new Pods",
      "Immediately deletes all Pods and the Node",
      "Restarts every container on the Node",
      "Changes the Node into a Service"
    ],
    answer: 0
  },
  {
    question: "44. What does kubectl drain primarily do during maintenance?",
    options: [
      "Delete the cluster control plane",
      "Rotate every Secret automatically",
      "Increase Node memory",
      "Evict eligible Pods and mark the Node unschedulable"
    ],
    answer: 3
  },
  {
    question: "45. A drain operation is blocked by a PodDisruptionBudget. What should you do?",
    options: [
      "Force-delete every Pod immediately",
      "Review available replicas, the disruption budget, and maintenance requirements",
      "Disable authentication on the API server",
      "Delete all PersistentVolumes"
    ],
    answer: 1
  },
  {
    question: "46. Which object provides stable network access to a changing set of Pods?",
    options: [
      "ReplicaSet",
      "PersistentVolumeClaim",
      "Service",
      "ResourceQuota"
    ],
    answer: 2
  },
  {
    question: "47. A Pod cannot resolve a Kubernetes Service DNS name. What should you check?",
    options: [
      "CoreDNS health, DNS configuration, Service name, and namespace",
      "Only the container image build number",
      "Only the HPA minimum replica count",
      "Only the Node label format"
    ],
    answer: 0
  },
  {
    question: "48. What is a NetworkPolicy used for?",
    options: [
      "Automatically encrypting all container files",
      "Assigning CPU requests to Pods",
      "Defining Deployment rollout history",
      "Controlling Pod network traffic when supported by the networking implementation"
    ],
    answer: 3
  },
  {
    question: "49. A NetworkPolicy has been created, but traffic remains unrestricted. What is a possible reason?",
    options: [
      "NetworkPolicies only work with StatefulSets",
      "The cluster's network plugin does not enforce NetworkPolicies",
      "Services cannot use labels",
      "The API server requires NodePort for every Pod"
    ],
    answer: 1
  },
  {
    question: "50. What does the Kubernetes control plane API server do?",
    options: [
      "Run every application container itself",
      "Provide all application databases",
      "Expose the Kubernetes API and validate/process API requests",
      "Replace the cluster's container runtime"
    ],
    answer: 2
  },
  {
    question: "51. What is the role of the scheduler?",
    options: [
      "Select suitable Nodes for Pods that need scheduling",
      "Build Docker images",
      "Store application passwords in plaintext",
      "Act as the default Ingress controller"
    ],
    answer: 0
  },
  {
    question: "52. What does the kubelet do?",
    options: [
      "Manage source-code repositories",
      "Issue TLS certificates for every website",
      "Replace the Kubernetes API server",
      "Ensure assigned Pods are running as specified on a Node"
    ],
    answer: 3
  },
  {
    question: "53. What is the role of the container runtime?",
    options: [
      "Select application business rules",
      "Run and manage containers on a Node",
      "Create Kubernetes RBAC policies automatically",
      "Provide the Kubernetes dashboard in every cluster"
    ],
    answer: 1
  },
  {
    question: "54. Which component maintains desired cluster state by reconciling actual state?",
    options: [
      "Ingress controller only",
      "Container image registry",
      "Kubernetes controllers",
      "External DNS server only"
    ],
    answer: 2
  },
  {
    question: "55. What is etcd used for in a Kubernetes control plane?",
    options: [
      "Storing Kubernetes cluster state",
      "Serving application HTML pages",
      "Building application containers",
      "Routing all external HTTP requests"
    ],
    answer: 0
  },
  {
    question: "56. Why are etcd backups important?",
    options: [
      "They eliminate the need for application monitoring",
      "They guarantee every Node stays healthy",
      "They automatically repair faulty application code",
      "They help recover cluster state after certain failures or data loss"
    ],
    answer: 3
  },
  {
    question: "57. What is the recommended approach for granting an application limited Kubernetes API permissions?",
    options: [
      "Use cluster-admin for every workload",
      "Use a dedicated ServiceAccount with least-privilege RBAC",
      "Disable API authentication",
      "Store administrator credentials in the container image"
    ],
    answer: 1
  },
  {
    question: "58. What is the difference between Role and ClusterRole?",
    options: [
      "Role only works with Pods; ClusterRole only works with Nodes",
      "Role grants cloud IAM permissions automatically",
      "Role is namespaced; ClusterRole can define cluster-wide permissions or reusable rules",
      "There is no difference"
    ],
    answer: 2
  },
  {
    question: "59. A user receives Forbidden when running kubectl. What should you check?",
    options: [
      "RBAC bindings, the granted rules, and the requested resource or verb",
      "Only the application's liveness probe",
      "Only the Dockerfile base image",
      "Only the Service's external IP"
    ],
    answer: 0
  },
  {
    question: "60. What does a Kubernetes ServiceAccount represent?",
    options: [
      "A physical server account",
      "A Docker Hub organization",
      "A storage disk account",
      "An identity for processes or workloads that access the Kubernetes API"
    ],
    answer: 3
  },
  {
    question: "61. What is a PersistentVolumeClaim (PVC)?",
    options: [
      "A rule for external HTTP traffic",
      "A request for persistent storage resources",
      "A container restart policy",
      "A Kubernetes user identity"
    ],
    answer: 1
  },
  {
    question: "62. A PVC is stuck in Pending. What should you investigate?",
    options: [
      "Only the Pod's application logs",
      "Only the Ingress controller version",
      "StorageClass, provisioner, capacity, access modes, and volume binding events",
      "Only the ServiceAccount name"
    ],
    answer: 2
  },
  {
    question: "63. What is the relationship between a PersistentVolume and a PVC?",
    options: [
      "The PV represents storage; the PVC requests storage and may bind to a suitable PV",
      "The PVC is always a public network endpoint",
      "The PV defines container CPU limits",
      "They are both types of Kubernetes Ingress"
    ],
    answer: 0
  },
  {
    question: "64. Which workload controller is often suitable for applications requiring stable Pod identities and persistent storage?",
    options: [
      "Job",
      "DaemonSet",
      "ReplicaSet only",
      "StatefulSet"
    ],
    answer: 3
  },
  {
    question: "65. What is a common use case for a DaemonSet?",
    options: [
      "Run exactly one application replica across the entire cluster",
      "Run a Pod on each eligible Node, such as a log or monitoring agent",
      "Create one-time database migration jobs only",
      "Expose an application through an HTTP path"
    ],
    answer: 1
  },
  {
    question: "66. What is a Kubernetes Job intended to do?",
    options: [
      "Maintain a permanent HTTP load balancer",
      "Keep exactly one Pod on every Node",
      "Run tasks to completion, potentially with retries",
      "Manage long-lived application rollout revisions"
    ],
    answer: 2
  },
  {
    question: "67. When is a CronJob appropriate?",
    options: [
      "For scheduled tasks such as periodic cleanup or backups",
      "For assigning a ClusterIP to every Pod",
      "For replacing the Kubernetes scheduler",
      "For permanently disabling failed Nodes"
    ],
    answer: 0
  },
  {
    question: "68. A CronJob runs a task more than once around a scheduled time. What should the application ideally support?",
    options: [
      "A different ServiceAccount on every retry",
      "Disabling all logs",
      "Deleting its namespace after each run",
      "Idempotent processing or safeguards against duplicate execution"
    ],
    answer: 3
  },
  {
    question: "69. What is the purpose of a Namespace?",
    options: [
      "Encrypt every network packet automatically",
      "Organize and scope namespaced resources within a cluster",
      "Replace Node resource limits",
      "Provide a separate physical control plane for every workload"
    ],
    answer: 1
  },
  {
    question: "70. What does a ResourceQuota help enforce?",
    options: [
      "HTTP route priorities",
      "Container image signing",
      "Aggregate resource consumption limits within a Namespace",
      "The number of control-plane Nodes in every cluster"
    ],
    answer: 2
  },
  {
    question: "71. A Pod cannot be created because of a ResourceQuota error. What should you do?",
    options: [
      "Inspect quota usage and adjust resource requests or quota with authorization",
      "Disable the API server",
      "Delete every Node",
      "Switch the Pod to HostNetwork without investigation"
    ],
    answer: 0
  },
  {
    question: "72. What does LimitRange do?",
    options: [
      "Control external DNS records",
      "Set cluster-wide etcd backup schedules",
      "Replace NetworkPolicy",
      "Define default or minimum/maximum resource constraints for resources in a Namespace"
    ],
    answer: 3
  },
  {
    question: "73. What is a rolling update designed to achieve?",
    options: [
      "Delete every old replica before starting any new replica",
      "Gradually replace old application Pods with new ones",
      "Update the operating system on every Node automatically",
      "Convert a Deployment into a StatefulSet"
    ],
    answer: 1
  },
  {
    question: "74. During a rolling update, users experience downtime. What should you investigate?",
    options: [
      "Only the Namespace name",
      "Only the Git branch name",
      "Readiness probes, replica availability, rollout strategy, and application capacity",
      "Only the Secret's creation timestamp"
    ],
    answer: 2
  },
  {
    question: "75. What does maxUnavailable control in a Deployment rolling update?",
    options: [
      "The maximum number or proportion of desired Pods that can be unavailable during the rollout",
      "The maximum size of an application image",
      "The number of Kubernetes API requests per user",
      "The total number of cluster namespaces"
    ],
    answer: 0
  },
  {
    question: "76. Why should production Deployments generally define resource requests and limits?",
    options: [
      "To disable scheduling",
      "To guarantee the application has no bugs",
      "To make every Pod use the same Node",
      "To improve scheduling predictability and constrain resource consumption"
    ],
    answer: 3
  },
  {
    question: "77. What does kubectl apply -f manifest.yaml do?",
    options: [
      "Always deletes and recreates the entire cluster",
      "Creates or updates resources from the manifest using apply semantics",
      "Only displays the manifest without changing resources",
      "Builds a container image from the manifest"
    ],
    answer: 1
  },
  {
    question: "78. How can you validate many manifest changes before applying them to a cluster?",
    options: [
      "Delete all running Pods first",
      "Run kubectl logs on every Node",
      "Use kubectl apply --dry-run=server -f <file-or-directory> where supported",
      "Change every resource to privileged mode"
    ],
    answer: 2
  },
  {
    question: "79. What is the benefit of Helm in Kubernetes deployments?",
    options: [
      "It packages Kubernetes resources into charts and supports release management",
      "It replaces the Kubernetes API server",
      "It automatically fixes all application defects",
      "It eliminates the need for container images"
    ],
    answer: 0
  },
  {
    question: "80. A Helm upgrade fails. What is a useful first investigation?",
    options: [
      "Delete etcd immediately",
      "Reinstall the operating system on every Node",
      "Remove all namespaces",
      "Inspect Helm output, release status/history, rendered manifests, and Kubernetes events"
    ],
    answer: 3
  },
  {
    question: "81. What is GitOps in a Kubernetes environment?",
    options: [
      "Manually changing production resources without tracking",
      "Using version-controlled desired state and reconciliation to manage deployments",
      "Storing application passwords in source control",
      "Disabling monitoring during deployments"
    ],
    answer: 1
  },
  {
    question: "82. In a GitOps workflow, a manual cluster change is reverted by a controller. Why?",
    options: [
      "The Node automatically resets every file",
      "The application container rebuilds the control plane",
      "The live state differs from the Git-defined desired state",
      "Kubernetes does not support Services"
    ],
    answer: 2
  },
  {
    question: "83. What is a safe practice for deploying database changes with Kubernetes applications?",
    options: [
      "Plan backward-compatible migrations and coordinate rollout and rollback procedures",
      "Assume rolling back the Deployment also reverses every database change",
      "Run migrations on every application request",
      "Store production database passwords in the image"
    ],
    answer: 0
  },
  {
    question: "84. Why might a Kubernetes application use an init container?",
    options: [
      "To act as the permanent cluster scheduler",
      "To replace every readiness probe",
      "To expose a LoadBalancer Service",
      "To complete prerequisite setup before application containers start"
    ],
    answer: 3
  },
  {
    question: "85. What is a sidecar container pattern?",
    options: [
      "A container that must run on a different cluster",
      "An additional container that supports the main application, such as with logging or proxying",
      "A container image stored only in etcd",
      "A Node scheduling policy"
    ],
    answer: 1
  },
  {
    question: "86. A Pod can reach an IP address but cannot connect using a Service DNS name. Which area is most relevant?",
    options: [
      "PersistentVolume reclaim policy only",
      "Deployment rollout history only",
      "Cluster DNS resolution and DNS/network configuration",
      "PodDisruptionBudget minimum availability only"
    ],
    answer: 2
  },
  {
    question: "87. An application is slow, and Pods show no restarts. What should you investigate?",
    options: [
      "CPU and memory utilization, latency, dependencies, network, and application metrics",
      "Only the Pod name format",
      "Only the Namespace creation date",
      "Only the number of ConfigMaps"
    ],
    answer: 0
  },
  {
    question: "88. Which approach is useful for investigating high memory usage across Kubernetes workloads?",
    options: [
      "Delete every Secret",
      "Change all Services to NodePort",
      "Disable resource monitoring",
      "Compare container metrics with requests/limits and inspect application memory behavior"
    ],
    answer: 3
  },
  {
    question: "89. What is the purpose of centralized logging in a Kubernetes production cluster?",
    options: [
      "It removes the need for health probes",
      "It aggregates logs from changing Pods and Nodes for search and troubleshooting",
      "It automatically resolves every failed rollout",
      "It guarantees persistent application storage"
    ],
    answer: 1
  },
  {
    question: "90. Why is monitoring only Pod status insufficient for production reliability?",
    options: [
      "Pod status is never useful",
      "Kubernetes does not expose metrics",
      "A Pod can be Running while the application is unhealthy or slow",
      "Monitoring can only be done outside Kubernetes"
    ],
    answer: 2
  },
  {
    question: "91. A Pod uses a PVC, and the data must survive Pod replacement. What is essential?",
    options: [
      "Use appropriate persistent storage and ensure the replacement Pod mounts the intended claim",
      "Write all important data only to the container writable layer",
      "Use emptyDir as the only persistent storage",
      "Increase the Service's NodePort"
    ],
    answer: 0
  },
  {
    question: "92. What does a PersistentVolume reclaim policy influence?",
    options: [
      "How often a Deployment rolls out",
      "Which DNS server Pods use",
      "How much CPU a container receives",
      "What happens to the PV or underlying storage after its claim is released"
    ],
    answer: 3
  },
  {
    question: "93. A StatefulSet Pod is stuck mounting storage. What should you check?",
    options: [
      "Only the Ingress hostname",
      "PVC/PV binding, attachment or mount events, storage driver, and Node conditions",
      "Only the container image label",
      "Only the Deployment revision"
    ],
    answer: 1
  },
  {
    question: "94. What is a common reason to use anti-affinity for application replicas?",
    options: [
      "To put every replica on the same Node",
      "To disable automatic scheduling",
      "To reduce the risk of replicas sharing the same failure domain",
      "To turn a ClusterIP into a public IP"
    ],
    answer: 2
  },
  {
    question: "95. Which is a good practice for Kubernetes production secrets?",
    options: [
      "Use least privilege, avoid committing secrets to Git, and use suitable secret-management controls",
      "Place credentials in public container images",
      "Grant every developer cluster-admin",
      "Assume base64 encoding alone protects credentials"
    ],
    answer: 0
  },
  {
    question: "96. Why should privileged containers be restricted?",
    options: [
      "They cannot use container images",
      "They always fail readiness probes",
      "They prevent all network communication",
      "They can gain extensive host-level capabilities and increase the impact of compromise"
    ],
    answer: 3
  },
  {
    question: "97. A cluster upgrade is planned. What is a good preparation step?",
    options: [
      "Upgrade all components without checking compatibility",
      "Review version-skew rules, deprecated APIs, backups, add-ons, and upgrade procedures",
      "Delete every PersistentVolume",
      "Disable all monitoring and alerts permanently"
    ],
    answer: 1
  },
  {
    question: "98. What is a practical disaster-recovery strategy for a production Kubernetes application?",
    options: [
      "Keep the only backup on the same failing disk",
      "Rely only on restarting Pods",
      "Back up persistent application data and required cluster configuration, and test restoration",
      "Assume etcd contains every external database backup"
    ],
    answer: 2
  },
  {
    question: "99. A production rollout introduces errors, but the Pods are Ready. What is the best response?",
    options: [
      "Use application-level signals and rollout history to assess impact, then roll back if appropriate",
      "Assume readiness guarantees business functionality",
      "Delete the entire Kubernetes cluster immediately",
      "Disable all application monitoring"
    ],
    answer: 0
  },
  {
    question: "100. What is the strongest approach to troubleshooting a production Kubernetes incident?",
    options: [
      "Randomly delete Pods until the issue disappears",
      "Restart every Node before checking evidence",
      "Change several unrelated settings simultaneously",
      "Check symptoms, events, logs, metrics, dependencies, and recent changes; test fixes systematically"
    ],
    answer: 3
  }
];
```
