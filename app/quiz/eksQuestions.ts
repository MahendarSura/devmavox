export interface EKSQuestion {
  question: string;
  options: string[];
  answer: number;
}

export const eksQuestions: EKSQuestion[] = [
  {
    question: "1. What does Amazon EKS stand for?",
    options: [
      "Amazon Elastic Kubernetes Service",
      "Amazon Enterprise Kernel System",
      "Amazon Elastic Key Storage",
      "Amazon Engine Kubernetes Software"
    ],
    answer: 0
  },
  {
    question: "2. What is Amazon EKS primarily used for?",
    options: [
      "Managing relational databases only",
      "Running and managing Kubernetes clusters on AWS",
      "Creating DNS records only",
      "Storing files in object storage"
    ],
    answer: 1
  },
  {
    question: "3. What is Kubernetes?",
    options: [
      "A programming language",
      "A relational database",
      "A platform for orchestrating containerized applications",
      "A physical server"
    ],
    answer: 2
  },
  {
    question: "4. Which component manages the Kubernetes cluster's control plane in Amazon EKS?",
    options: [
      "Amazon S3",
      "The application container",
      "The worker node's kubelet",
      "AWS-managed EKS control plane"
    ],
    answer: 3
  },
  {
    question: "5. What is a Kubernetes Pod?",
    options: [
      "The smallest deployable Kubernetes unit, containing one or more containers",
      "A physical EC2 server",
      "A Docker registry",
      "An AWS IAM policy"
    ],
    answer: 0
  },
  {
    question: "6. What is an EKS worker node?",
    options: [
      "A Kubernetes Service",
      "A compute machine that runs Kubernetes Pods",
      "A Route 53 hosted zone",
      "An S3 bucket"
    ],
    answer: 1
  },
  {
    question: "7. Which command displays the current kubectl client version?",
    options: [
      "kubectl status",
      "kubectl check",
      "kubectl version --client",
      "kubectl client-info"
    ],
    answer: 2
  },
  {
    question: "8. Which command lists Pods in the current Kubernetes namespace?",
    options: [
      "kubectl nodes",
      "kubectl services",
      "kubectl images",
      "kubectl get pods"
    ],
    answer: 3
  },
  {
    question: "9. Which command lists Pods across all namespaces?",
    options: [
      "kubectl get pods -A",
      "kubectl get pods --current",
      "kubectl get nodes",
      "kubectl get pods --all-nodes-only"
    ],
    answer: 0
  },
  {
    question: "10. Which AWS CLI command updates kubeconfig for an EKS cluster?",
    options: [
      "aws eks start-cluster",
      "aws eks update-kubeconfig --region region --name cluster-name",
      "aws eks connect-node",
      "aws configure-cluster"
    ],
    answer: 1
  },
  {
    question: "11. What is kubeconfig used for?",
    options: [
      "Storing container images",
      "Defining Dockerfile instructions",
      "Configuring Kubernetes cluster access, users, and contexts",
      "Creating EC2 AMIs"
    ],
    answer: 2
  },
  {
    question: "12. Which command shows the Kubernetes nodes in a cluster?",
    options: [
      "kubectl show servers",
      "kubectl list machines",
      "kubectl get containers",
      "kubectl get nodes"
    ],
    answer: 3
  },
  {
    question: "13. What is the Kubernetes API server responsible for?",
    options: [
      "Exposing the Kubernetes API and processing cluster requests",
      "Storing application files in S3",
      "Building container images",
      "Replacing the worker node operating system"
    ],
    answer: 0
  },
  {
    question: "14. What is etcd used for in Kubernetes?",
    options: [
      "Running application containers",
      "Storing Kubernetes cluster state and configuration data",
      "Distributing internet traffic",
      "Building Helm charts"
    ],
    answer: 1
  },
  {
    question: "15. What is the Kubernetes scheduler responsible for?",
    options: [
      "Creating IAM access keys",
      "Building container images",
      "Selecting suitable nodes for Pods",
      "Managing S3 lifecycle rules"
    ],
    answer: 2
  },
  {
    question: "16. What does the kubelet do on a Kubernetes node?",
    options: [
      "Creates AWS accounts",
      "Acts as the Kubernetes DNS server in every configuration",
      "Manages AWS billing",
      "Ensures assigned Pods are running as expected on the node"
    ],
    answer: 3
  },
  {
    question: "17. What is a Kubernetes Deployment used for?",
    options: [
      "Managing replicated application Pods through ReplicaSets",
      "Creating AWS IAM users",
      "Storing container images",
      "Configuring VPC route tables"
    ],
    answer: 0
  },
  {
    question: "18. What does a ReplicaSet ensure?",
    options: [
      "Every Pod uses a different cluster",
      "The desired number of matching Pod replicas is maintained",
      "All nodes use the same public IP",
      "Every container has root access"
    ],
    answer: 1
  },
  {
    question: "19. Which command creates or updates Kubernetes resources from a YAML file?",
    options: [
      "kubectl build -f app.yaml",
      "kubectl upload -f app.yaml",
      "kubectl apply -f app.yaml",
      "kubectl image -f app.yaml"
    ],
    answer: 2
  },
  {
    question: "20. Which command displays detailed information about a Pod?",
    options: [
      "kubectl show pod",
      "kubectl pod-info",
      "kubectl inspect-pod",
      "kubectl describe pod pod-name"
    ],
    answer: 3
  },
  {
    question: "21. Which command displays logs from a container in a Pod?",
    options: [
      "kubectl logs pod-name",
      "kubectl images pod-name",
      "kubectl get logs-only",
      "kubectl events pod-name"
    ],
    answer: 0
  },
  {
    question: "22. Which command opens a shell inside a running container?",
    options: [
      "kubectl start pod-name",
      "kubectl exec -it pod-name -- sh",
      "kubectl build pod-name",
      "kubectl login pod-name"
    ],
    answer: 1
  },
  {
    question: "23. What is a Kubernetes Namespace?",
    options: [
      "A container image",
      "An AWS Availability Zone",
      "A logical way to organize and separate resources within a cluster",
      "A physical worker node"
    ],
    answer: 2
  },
  {
    question: "24. Which command creates a Kubernetes Namespace?",
    options: [
      "kubectl namespace create dev",
      "kubectl add namespace dev",
      "kubectl apply namespace dev",
      "kubectl create namespace dev"
    ],
    answer: 3
  },
  {
    question: "25. What is a Kubernetes Service?",
    options: [
      "A stable network endpoint for accessing a set of Pods",
      "A container image",
      "An AWS billing report",
      "A Kubernetes control-plane database"
    ],
    answer: 0
  },
  {
    question: "26. Which Kubernetes Service type exposes a service on a port on each node?",
    options: [
      "ExternalName",
      "NodePort",
      "ClusterOnly",
      "PodPort"
    ],
    answer: 1
  },
  {
    question: "27. Which Kubernetes Service type is commonly used to provision an AWS load balancer through supported integrations?",
    options: [
      "ExternalName",
      "ClusterIP",
      "LoadBalancer",
      "HeadlessOnly"
    ],
    answer: 2
  },
  {
    question: "28. What is the default Kubernetes Service type?",
    options: [
      "NodePort",
      "LoadBalancer",
      "ExternalName",
      "ClusterIP"
    ],
    answer: 3
  },
  {
    question: "29. What is an Ingress used for in Kubernetes?",
    options: [
      "Managing HTTP and HTTPS routing to Services through an Ingress controller",
      "Creating container images",
      "Managing IAM users",
      "Storing persistent data"
    ],
    answer: 0
  },
  {
    question: "30. What is the AWS Load Balancer Controller used for in EKS?",
    options: [
      "Installing the Linux kernel",
      "Provisioning and managing supported AWS load-balancing resources for Kubernetes workloads",
      "Creating S3 buckets",
      "Replacing the Kubernetes API server"
    ],
    answer: 1
  },
  {
    question: "31. What is the purpose of a Kubernetes ConfigMap?",
    options: [
      "Storing encrypted passwords by default",
      "Managing EC2 instance types",
      "Providing non-sensitive configuration data to workloads",
      "Creating AWS access keys"
    ],
    answer: 2
  },
  {
    question: "32. What is a Kubernetes Secret used for?",
    options: [
      "Storing Docker image layers",
      "Creating worker nodes",
      "Managing public DNS records",
      "Holding sensitive configuration data, subject to appropriate access and encryption controls"
    ],
    answer: 3
  },
  {
    question: "33. What is a PersistentVolume (PV)?",
    options: [
      "A cluster storage resource representing persistent storage",
      "A container registry",
      "A Kubernetes namespace",
      "A load-balancer listener"
    ],
    answer: 0
  },
  {
    question: "34. What is a PersistentVolumeClaim (PVC)?",
    options: [
      "An AWS IAM group",
      "A request for storage by a Kubernetes workload",
      "A Kubernetes Service type",
      "A Dockerfile instruction"
    ],
    answer: 1
  },
  {
    question: "35. What is a StorageClass used for?",
    options: [
      "Defining application environment variables",
      "Managing Kubernetes user passwords",
      "Defining classes of storage and how storage can be provisioned",
      "Configuring load-balancer DNS records"
    ],
    answer: 2
  },
  {
    question: "36. Which AWS storage service is commonly used for persistent block storage for EKS Pods?",
    options: [
      "Amazon Route 53",
      "Amazon CloudFront",
      "Amazon SNS",
      "Amazon EBS"
    ],
    answer: 3
  },
  {
    question: "37. Which AWS storage service provides shared file storage that can be mounted by multiple compatible workloads?",
    options: [
      "Amazon EFS",
      "Amazon SQS",
      "Amazon Route 53",
      "AWS CloudTrail"
    ],
    answer: 0
  },
  {
    question: "38. What is the Amazon EBS CSI driver used for in EKS?",
    options: [
      "Managing Kubernetes DNS records",
      "Integrating EBS volume provisioning and attachment with Kubernetes storage",
      "Creating container registries",
      "Managing IAM password policies"
    ],
    answer: 1
  },
  {
    question: "39. What is the Amazon EFS CSI driver used for in EKS?",
    options: [
      "Managing AWS billing",
      "Building Docker images",
      "Integrating Amazon EFS file systems with Kubernetes workloads",
      "Replacing Kubernetes Services"
    ],
    answer: 2
  },
  {
    question: "40. What does a Kubernetes readiness probe determine?",
    options: [
      "Whether the container image exists in Docker Hub",
      "Whether the EC2 instance has a public IP",
      "Whether the Pod has been deleted",
      "Whether a container is ready to receive traffic"
    ],
    answer: 3
  },
  {
    question: "41. What does a Kubernetes liveness probe help determine?",
    options: [
      "Whether a container should be restarted because it is unhealthy",
      "Whether an IAM user exists",
      "Whether a VPC has an internet gateway",
      "Whether an S3 bucket is public"
    ],
    answer: 0
  },
  {
    question: "42. What is a startup probe used for?",
    options: [
      "Checking AWS billing status",
      "Allowing an application time to start before liveness or readiness checks take effect",
      "Scaling the EKS cluster automatically",
      "Creating a Kubernetes Service"
    ],
    answer: 1
  },
  {
    question: "43. What does a Pod in CrashLoopBackOff usually indicate?",
    options: [
      "The cluster has no namespaces",
      "The Docker image has been uploaded successfully",
      "A container repeatedly exits and Kubernetes is backing off before restarting it",
      "The Service has no ClusterIP"
    ],
    answer: 2
  },
  {
    question: "44. What does ImagePullBackOff indicate?",
    options: [
      "A successful rolling update",
      "A Pod has enough memory",
      "A Service is publicly accessible",
      "Kubernetes cannot pull the required container image and is retrying with backoff"
    ],
    answer: 3
  },
  {
    question: "45. Which command lists recent Kubernetes events in the current namespace?",
    options: [
      "kubectl get events",
      "kubectl get images",
      "kubectl show nodes-only",
      "kubectl events build"
    ],
    answer: 0
  },
  {
    question: "46. Which command shows CPU and memory usage when Kubernetes Metrics Server is available?",
    options: [
      "kubectl get usage",
      "kubectl top pods",
      "kubectl describe metrics",
      "kubectl resource list"
    ],
    answer: 1
  },
  {
    question: "47. What does a Kubernetes Resource Request specify?",
    options: [
      "The maximum memory a container can ever use",
      "The number of Kubernetes namespaces",
      "The amount of a resource used for scheduling and resource allocation decisions",
      "The AWS account's monthly cost limit"
    ],
    answer: 2
  },
  {
    question: "48. What does a container Resource Limit specify?",
    options: [
      "The number of replicas in a Deployment",
      "The number of VPC subnets",
      "The number of cluster namespaces",
      "An upper bound on a resource such as CPU or memory usage"
    ],
    answer: 3
  },
  {
    question: "49. What can happen when a container exceeds its memory limit?",
    options: [
      "It may be terminated with an OOMKilled reason",
      "It automatically receives unlimited memory",
      "It creates another AWS account",
      "It changes its image tag"
    ],
    answer: 0
  },
  {
    question: "50. What is a Horizontal Pod Autoscaler (HPA)?",
    options: [
      "A tool that automatically creates AWS Regions",
      "A Kubernetes resource that adjusts workload replica counts based on configured metrics",
      "A tool that encrypts EBS volumes",
      "A service that manages IAM users"
    ],
    answer: 1
  },
  {
    question: "51. What is the Cluster Autoscaler used for in EKS?",
    options: [
      "Automatically changing application source code",
      "Creating DNS records for every Pod",
      "Adjusting node group capacity based on unschedulable Pods and node utilization",
      "Replacing Kubernetes Deployments"
    ],
    answer: 2
  },
  {
    question: "52. What is Karpenter used for in EKS?",
    options: [
      "Managing relational database backups",
      "Creating S3 lifecycle policies",
      "Replacing IAM permissions with passwords",
      "Provisioning and consolidating compute capacity for Kubernetes workloads"
    ],
    answer: 3
  },
  {
    question: "53. What is an EKS managed node group?",
    options: [
      "A group of worker nodes whose provisioning and lifecycle are managed by EKS",
      "A collection of S3 buckets",
      "A Kubernetes Secret",
      "A Docker image repository"
    ],
    answer: 0
  },
  {
    question: "54. What is AWS Fargate used for with Amazon EKS?",
    options: [
      "Managing physical data-center switches",
      "Running supported Pods without managing the underlying EC2 worker nodes",
      "Replacing the Kubernetes API",
      "Creating Route 53 hosted zones"
    ],
    answer: 1
  },
  {
    question: "55. What is an EKS self-managed node group?",
    options: [
      "A group of Lambda functions",
      "A Kubernetes ConfigMap",
      "Worker nodes whose provisioning and lifecycle the customer manages",
      "An AWS-managed relational database"
    ],
    answer: 2
  },
  {
    question: "56. What is the purpose of an EKS cluster endpoint?",
    options: [
      "To store container logs only",
      "To create EBS snapshots",
      "To manage Docker Hub accounts",
      "To provide access to the Kubernetes API server"
    ],
    answer: 3
  },
  {
    question: "57. What is a private EKS cluster endpoint?",
    options: [
      "An endpoint accessed through private network connectivity rather than requiring public internet access",
      "A public S3 bucket",
      "A Kubernetes namespace",
      "A Docker image tag"
    ],
    answer: 0
  },
  {
    question: "58. What does enabling the public EKS cluster endpoint allow?",
    options: [
      "Every user to access the cluster without authentication",
      "The API endpoint to be reachable through public networking, subject to endpoint access controls",
      "All worker nodes to become publicly accessible",
      "All cluster resources to become public"
    ],
    answer: 1
  },
  {
    question: "59. Which AWS service commonly provides the VPC networking foundation for EKS?",
    options: [
      "Amazon CloudFront",
      "Amazon SQS",
      "Amazon VPC",
      "Amazon SES"
    ],
    answer: 2
  },
  {
    question: "60. What does the Amazon VPC CNI plugin do in EKS?",
    options: [
      "Builds application Docker images",
      "Manages relational database queries",
      "Creates IAM passwords",
      "Provides Kubernetes Pod networking using AWS VPC networking resources"
    ],
    answer: 3
  },
  {
    question: "61. What is a Kubernetes CNI plugin responsible for?",
    options: [
      "Implementing container networking for Kubernetes Pods",
      "Building Helm charts",
      "Managing AWS invoices",
      "Creating container image tags"
    ],
    answer: 0
  },
  {
    question: "62. What is CoreDNS commonly used for in Kubernetes?",
    options: [
      "Building container images",
      "Providing cluster DNS resolution for Services and other configured names",
      "Creating EC2 AMIs",
      "Managing AWS billing"
    ],
    answer: 1
  },
  {
    question: "63. What is a NetworkPolicy used for in Kubernetes?",
    options: [
      "Automatically upgrading EKS control planes",
      "Creating AWS IAM access keys",
      "Defining rules for allowed Pod network traffic when supported by the networking implementation",
      "Creating EBS snapshots"
    ],
    answer: 2
  },
  {
    question: "64. What is the purpose of IRSA in Amazon EKS?",
    options: [
      "Providing public IP addresses to all Pods",
      "Replacing Kubernetes namespaces",
      "Automatically making all S3 buckets private",
      "Associating Kubernetes service accounts with IAM roles using OIDC federation"
    ],
    answer: 3
  },
  {
    question: "65. What is EKS Pod Identity used for?",
    options: [
      "Associating Kubernetes service accounts with IAM roles so workloads can obtain AWS credentials",
      "Changing a Pod's container image automatically",
      "Creating public subnets",
      "Replacing all Kubernetes Services"
    ],
    answer: 0
  },
  {
    question: "66. Why should EKS applications avoid using long-term AWS access keys stored in container images?",
    options: [
      "Access keys cannot be used by applications",
      "They can be exposed and are harder to rotate securely than role-based temporary credentials",
      "They disable Kubernetes networking",
      "They prevent containers from starting"
    ],
    answer: 1
  },
  {
    question: "67. What is an EKS cluster IAM role used for during cluster creation?",
    options: [
      "Providing every application with database passwords",
      "Creating Docker image layers",
      "Allowing EKS to perform required AWS control-plane operations",
      "Replacing all worker node roles"
    ],
    answer: 2
  },
  {
    question: "68. What is an EKS node IAM role used for?",
    options: [
      "Providing administrator access to every human user",
      "Managing public DNS hosting",
      "Encrypting every application response automatically",
      "Granting worker nodes the AWS permissions they require"
    ],
    answer: 3
  },
  {
    question: "69. What is Kubernetes RBAC used for?",
    options: [
      "Controlling which users or service accounts can perform actions on Kubernetes resources",
      "Creating AWS Regions",
      "Building Docker images",
      "Changing EC2 instance families"
    ],
    answer: 0
  },
  {
    question: "70. What is the difference between a Role and a ClusterRole in Kubernetes?",
    options: [
      "A Role always grants cluster-admin access",
      "A Role is namespace-scoped, while a ClusterRole can define permissions at cluster scope or be reused through bindings",
      "A ClusterRole is only for Docker Hub",
      "There is no difference in scope"
    ],
    answer: 1
  },
  {
    question: "71. What is the purpose of a Kubernetes ServiceAccount?",
    options: [
      "Creating EC2 instance types",
      "Storing application database tables",
      "Providing an identity for processes running in Pods",
      "Creating AWS billing alerts"
    ],
    answer: 2
  },
  {
    question: "72. What is a Kubernetes admission controller?",
    options: [
      "A container image registry",
      "A DNS server only",
      "An AWS load balancer",
      "A component that can validate or mutate API requests before resources are persisted"
    ],
    answer: 3
  },
  {
    question: "73. What is a Helm chart?",
    options: [
      "A package containing Kubernetes resource templates and related configuration",
      "An EC2 security group",
      "An S3 bucket policy",
      "A Docker daemon"
    ],
    answer: 0
  },
  {
    question: "74. Which command installs a Helm chart?",
    options: [
      "helm create-install",
      "helm install release-name chart-name",
      "helm start chart-name",
      "kubectl helm-build"
    ],
    answer: 1
  },
  {
    question: "75. What is a Helm values.yaml file commonly used for?",
    options: [
      "Storing EC2 private keys",
      "Defining VPC CIDR blocks only",
      "Customizing chart configuration values",
      "Storing Kubernetes audit logs"
    ],
    answer: 2
  },
  {
    question: "76. What is a Kubernetes rolling update?",
    options: [
      "Deleting all cluster nodes at once",
      "Replacing the AWS Region",
      "Deleting all persistent volumes",
      "Gradually replacing old application Pods with new ones"
    ],
    answer: 3
  },
  {
    question: "77. Which command rolls back a Kubernetes Deployment to a previous revision?",
    options: [
      "kubectl rollout undo deployment/myapp",
      "kubectl delete revision/myapp",
      "kubectl rollback-node myapp",
      "kubectl restore-image myapp"
    ],
    answer: 0
  },
  {
    question: "78. What does a PodDisruptionBudget help control?",
    options: [
      "The number of AWS accounts",
      "How many matching Pods may be voluntarily disrupted at a time",
      "The size of a Docker image",
      "The number of VPC route tables"
    ],
    answer: 1
  },
  {
    question: "79. What is a DaemonSet used for?",
    options: [
      "Creating one relational database per namespace",
      "Replacing every Kubernetes Service",
      "Running a Pod on all or selected eligible nodes",
      "Managing AWS account billing"
    ],
    answer: 2
  },
  {
    question: "80. What is a Kubernetes StatefulSet best suited for?",
    options: [
      "Stateless applications with no identity requirements only",
      "Creating public load balancers only",
      "Storing AWS access keys in images",
      "Applications needing stable Pod identities and ordered deployment or scaling"
    ],
    answer: 3
  },
  {
    question: "81. What is a Kubernetes Job used for?",
    options: [
      "Running tasks that complete successfully and then terminate",
      "Maintaining a fixed number of always-running replicas only",
      "Creating VPC subnets",
      "Building container images automatically"
    ],
    answer: 0
  },
  {
    question: "82. What is a CronJob in Kubernetes?",
    options: [
      "A node networking plugin",
      "A resource that creates Jobs on a scheduled basis",
      "An AWS IAM role",
      "A container image repository"
    ],
    answer: 1
  },
  {
    question: "83. What is a taint used for on a Kubernetes node?",
    options: [
      "Increasing the size of an EBS volume",
      "Creating a Service endpoint",
      "Restricting Pod scheduling unless the Pod has a matching toleration",
      "Granting IAM permissions"
    ],
    answer: 2
  },
  {
    question: "84. What is a toleration used for in Kubernetes?",
    options: [
      "Automatically moving all Pods to a new cluster",
      "Creating a Docker image",
      "Granting all Pods administrator access",
      "Allowing a Pod to be scheduled onto nodes with matching taints, subject to other scheduling rules"
    ],
    answer: 3
  },
  {
    question: "85. What does node affinity help control?",
    options: [
      "Which nodes a Pod prefers or is required to run on based on node labels",
      "Which AWS account owns an S3 bucket",
      "Which Dockerfile instruction runs first",
      "Which user can register a domain"
    ],
    answer: 0
  },
  {
    question: "86. What is a Kubernetes label?",
    options: [
      "An encrypted database password",
      "A key-value pair used to organize and select Kubernetes objects",
      "An AWS Region name",
      "A container runtime"
    ],
    answer: 1
  },
  {
    question: "87. What is a Kubernetes selector used for?",
    options: [
      "Creating EC2 key pairs",
      "Encrypting container images",
      "Matching resources using labels",
      "Changing the Kubernetes API version automatically"
    ],
    answer: 2
  },
  {
    question: "88. Which command scales a Deployment to five replicas?",
    options: [
      "kubectl resize deployment/myapp 5",
      "kubectl replicas deployment/myapp 5",
      "kubectl set-nodes deployment/myapp 5",
      "kubectl scale deployment/myapp --replicas=5"
    ],
    answer: 3
  },
  {
    question: "89. A Pod remains in Pending state. What should you investigate first?",
    options: [
      "Pod events, scheduling constraints, resource requests, node capacity, and storage requirements",
      "Only the Docker image tag",
      "Only the AWS account name",
      "Only the application's HTML styling"
    ],
    answer: 0
  },
  {
    question: "90. A Pod shows CrashLoopBackOff. What is a useful troubleshooting approach?",
    options: [
      "Delete the entire EKS cluster immediately",
      "Inspect logs, previous container logs, exit codes, probes, and application configuration",
      "Disable all health checks permanently",
      "Make every container privileged"
    ],
    answer: 1
  },
  {
    question: "91. A Pod shows ImagePullBackOff in EKS. What should you check?",
    options: [
      "Only the Kubernetes namespace description",
      "Only the EC2 instance name",
      "Image name and tag, registry connectivity, credentials, and ECR permissions where applicable",
      "Only the Deployment creation timestamp"
    ],
    answer: 2
  },
  {
    question: "92. Pods cannot resolve service names in EKS. What should you investigate?",
    options: [
      "Only the AWS billing dashboard",
      "Only the Helm release name",
      "Only the Dockerfile comments",
      "CoreDNS health, cluster networking, Service DNS names, and relevant network policies"
    ],
    answer: 3
  },
  {
    question: "93. An EKS workload receives AccessDenied when calling an AWS API. What should you check?",
    options: [
      "The workload identity configuration, IAM role trust, permissions, and service account association",
      "Only the Pod's display name",
      "Only the Deployment replica count",
      "Only the node's Kubernetes version"
    ],
    answer: 0
  },
  {
    question: "94. An EKS Pod cannot mount an EBS volume. What should you investigate?",
    options: [
      "Only the Ingress hostname",
      "PVC and PV events, StorageClass, CSI driver health, IAM permissions, and volume topology",
      "Only the container's log format",
      "Only the Helm chart description"
    ],
    answer: 1
  },
  {
    question: "95. A Service has no working backend endpoints. What should you check?",
    options: [
      "Only the AWS account alias",
      "Only the image repository's logo",
      "Service selectors, Pod labels, Pod readiness, and target ports",
      "Only the number of Kubernetes namespaces"
    ],
    answer: 2
  },
  {
    question: "96. An EKS cluster runs out of available Pod IP addresses. What should you investigate?",
    options: [
      "Only the container's environment variable names",
      "Only the number of Helm releases",
      "Only the Kubernetes Service display name",
      "VPC subnet IP capacity, VPC CNI configuration, and available networking capacity"
    ],
    answer: 3
  },
  {
    question: "97. Which AWS service is commonly used to collect EKS control-plane logs when logging is enabled?",
    options: [
      "Amazon CloudWatch Logs",
      "Amazon Route 53",
      "Amazon EBS",
      "AWS Artifact"
    ],
    answer: 0
  },
  {
    question: "98. Which tools can be used to monitor Kubernetes workloads and cluster metrics in EKS?",
    options: [
      "Only a text editor",
      "CloudWatch Container Insights and supported Prometheus-based monitoring solutions",
      "Only Amazon Route 53",
      "Only an S3 lifecycle policy"
    ],
    answer: 1
  },
  {
    question: "99. What is a good approach for upgrading an EKS cluster in production?",
    options: [
      "Upgrade every component without testing or checking compatibility",
      "Delete all persistent data before upgrading",
      "Review version compatibility, test workloads, plan node and add-on upgrades, and prepare rollback or recovery procedures",
      "Disable monitoring and backups before every upgrade"
    ],
    answer: 2
  },
  {
    question: "100. What should be considered when operating Amazon EKS in production?",
    options: [
      "Only the number of Pods",
      "Only the Kubernetes cluster name",
      "Only the EC2 instance type",
      "Security, networking, IAM, scaling, observability, availability, upgrades, backups, and cost"
    ],
    answer: 3
  }
];
