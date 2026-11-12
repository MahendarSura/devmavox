export interface InterviewQA {
  question: string;
  answer: string;
}
export const eksQuestions: InterviewQA[] = [
  {
    "question": "1. What is Amazon EKS?",
    "answer": "Amazon Elastic Kubernetes Service (EKS) is a managed Kubernetes service provided by AWS. It allows organizations to run Kubernetes workloads without manually installing and maintaining the Kubernetes control plane. AWS manages important control-plane components such as the API server and etcd, while customers manage worker nodes, applications, networking configuration, and workloads. In a real-time environment, an organization can use EKS to deploy containerized microservices across multiple Availability Zones. This improves application availability and reduces the operational effort required to maintain Kubernetes infrastructure."
  },
  {
    "question": "2. Why is Amazon EKS used in DevOps?",
    "answer": "Amazon EKS is used in DevOps to automate the deployment, scaling, and management of containerized applications on AWS. It provides Kubernetes orchestration capabilities and integrates with AWS services such as IAM, VPC, CloudWatch, and Elastic Load Balancing. DevOps teams can connect EKS with CI/CD tools to deploy application updates automatically after successful builds and tests. For example, a team can build a Docker image, push it to Amazon ECR, and deploy the new version to an EKS cluster through a pipeline."
  },
  {
    "question": "3. What is a Kubernetes cluster in EKS?",
    "answer": "An EKS cluster is a Kubernetes environment that contains the control plane and the compute resources used to run applications. The control plane manages Kubernetes objects and makes scheduling decisions, while worker nodes provide CPU and memory for application pods. An EKS cluster is associated with an AWS VPC and uses networking components to allow communication between workloads. In production, teams commonly distribute worker nodes across multiple Availability Zones so that applications can continue running when an individual zone experiences infrastructure problems."
  },
  {
    "question": "4. What is the EKS control plane?",
    "answer": "The EKS control plane is the management layer responsible for operating the Kubernetes cluster. It includes components such as the Kubernetes API server, scheduler, controller manager, and etcd data store. These components maintain the desired cluster state and coordinate workload scheduling. AWS operates the EKS control plane across multiple Availability Zones within a region. Administrators interact with it through the Kubernetes API using tools such as kubectl. For example, when a deployment is created, the control plane processes the request and coordinates the creation of the required pods."
  },
  {
    "question": "5. What are worker nodes in EKS?",
    "answer": "Worker nodes are compute machines that run application containers inside an EKS cluster. They are commonly implemented using Amazon EC2 instances or managed through AWS Fargate. Each EC2 worker node runs components such as kubelet and a container runtime, allowing it to communicate with the Kubernetes control plane and execute scheduled pods. In a production application, worker nodes may be distributed across several Availability Zones and instance types to improve availability and capacity management. Teams monitor node utilization to ensure sufficient CPU and memory are available."
  },
  {
    "question": "6. What is an EKS managed node group?",
    "answer": "A managed node group is an AWS-managed way to create and operate a group of EC2 worker nodes for an EKS cluster. EKS helps manage the node group's Auto Scaling group, instance replacement, and integration with the cluster. Administrators can select instance types, desired capacity, minimum capacity, maximum capacity, and subnets. For example, a production team can create one managed node group for general application workloads and another for memory-intensive services. This separation makes it easier to control capacity, maintenance, and workload placement."
  },
  {
    "question": "7. What is an unmanaged node group in EKS?",
    "answer": "An unmanaged node group is a set of worker nodes whose underlying EC2 infrastructure and lifecycle are managed directly by the customer rather than through the EKS managed node group feature. Teams configure resources such as Auto Scaling groups, launch templates, and node bootstrap settings themselves. This provides greater control over infrastructure configuration but increases operational responsibility. An organization may use self-managed nodes when it needs specialized operating-system settings or customized instance lifecycle behavior that is not covered by its managed node group configuration."
  },
  {
    "question": "8. What is AWS Fargate in EKS?",
    "answer": "AWS Fargate is a serverless compute engine that allows Kubernetes pods to run without customers provisioning or managing EC2 worker nodes. In EKS, administrators configure Fargate profiles to determine which pods should run on Fargate. AWS provisions the required compute capacity for matching pods. This is useful for workloads that need isolation and simpler infrastructure management. For example, a team can run selected background jobs on Fargate while keeping other workloads on EC2 nodes that require specialized instance configurations."
  },
  {
    "question": "9. What is a Fargate profile?",
    "answer": "A Fargate profile defines which Kubernetes pods should be scheduled onto AWS Fargate. It uses selectors based on Kubernetes namespaces and optionally pod labels. When a pod matches a Fargate profile, EKS schedules it to run using Fargate instead of an EC2 worker node. Profiles also specify the subnets used for the pod networking. In a real-time environment, an organization may create a profile for the payments namespace so that selected payment workloads run independently from applications hosted on general-purpose EC2 nodes."
  },
  {
    "question": "10. What is the AWS VPC requirement for EKS?",
    "answer": "An EKS cluster uses an Amazon Virtual Private Cloud to provide network connectivity for the Kubernetes control plane and worker nodes. The VPC contains subnets, route tables, security groups, and other networking resources required by the cluster. Worker nodes are generally deployed into private subnets, while public subnets may contain internet-facing load balancers. Correct subnet and routing configuration is important for pod communication, image downloads, and access to AWS services. In production, teams commonly use multiple Availability Zones to improve resilience."
  },
  {
    "question": "11. What is the Amazon VPC CNI plugin?",
    "answer": "The Amazon VPC Container Network Interface plugin provides networking for Kubernetes pods running on EKS. It assigns VPC IP addresses to pods and configures the network interfaces required for pod communication. This allows pods to communicate with other resources inside the VPC using AWS networking. The number of available pod IP addresses depends on subnet capacity and instance networking limits. In production, insufficient subnet IP addresses can prevent new pods from starting, so DevOps engineers monitor IP utilization and plan subnet capacity carefully."
  },
  {
    "question": "12. What is the purpose of kubectl in EKS?",
    "answer": "kubectl is the Kubernetes command-line tool used to communicate with a Kubernetes API server. Engineers use it to inspect cluster resources, deploy applications, view logs, troubleshoot pods, and manage Kubernetes objects. In EKS, kubectl uses a kubeconfig file containing the cluster endpoint and authentication configuration. For example, an engineer can run kubectl get pods -A to inspect pods across all namespaces. It is one of the most frequently used tools for daily Kubernetes administration and production troubleshooting."
  },
  {
    "question": "13. How do you connect kubectl to an EKS cluster?",
    "answer": "To connect kubectl to an EKS cluster, an engineer first needs AWS CLI credentials with the required permissions and a compatible kubectl installation. The AWS CLI update-kubeconfig command retrieves cluster connection information and adds a context to the local kubeconfig file. The user must also have authorization to access the Kubernetes cluster. After configuration, kubectl get nodes can be used to verify connectivity. If access fails, engineers check AWS identity, IAM permissions, cluster access configuration, network reachability, and kubeconfig context."
  },
  {
    "question": "14. What is Amazon ECR and how is it used with EKS?",
    "answer": "Amazon Elastic Container Registry is a managed container image registry used to store Docker and OCI-compatible images. EKS workloads can retrieve images from ECR when Kubernetes creates pods. A typical CI/CD workflow builds an image, tags it with a version, pushes it to an ECR repository, and updates the Kubernetes deployment to use that image. Worker nodes or pod execution identities need the appropriate permissions to pull images. Using ECR provides a private and integrated image storage solution for AWS-based container platforms."
  },
  {
    "question": "15. What is a Kubernetes pod in EKS?",
    "answer": "A pod is the smallest deployable unit in Kubernetes and can contain one or more closely related containers. Containers inside the same pod share networking and can share configured storage volumes. In EKS, pods run on EC2 worker nodes or on Fargate when they match a Fargate profile. For example, a web application may run inside a pod managed by a Deployment. Kubernetes monitors the desired number of replicas and creates replacement pods when existing pods fail or are terminated."
  },
  {
    "question": "16. What is a Deployment in EKS?",
    "answer": "A Kubernetes Deployment manages the lifecycle and desired replica count of stateless application pods. It maintains the requested number of replicas and supports controlled updates and rollbacks. Engineers define the container image, resource requirements, labels, and replica count in a YAML manifest. When a new application version is released, the Deployment performs a rolling update according to its update strategy. In production, this allows teams to release application changes gradually while maintaining service availability."
  },
  {
    "question": "17. What is a Kubernetes Service?",
    "answer": "A Kubernetes Service provides a stable network endpoint for accessing a group of pods. Pod IP addresses can change when pods are recreated, so applications should not depend on individual pod addresses. A Service selects pods using labels and distributes network traffic to the matching endpoints. Common Service types include ClusterIP, NodePort, and LoadBalancer. For example, a frontend application can communicate with a backend Service using its DNS name without needing to know which backend pod handles each request."
  },
  {
    "question": "18. What is an Ingress in EKS?",
    "answer": "Ingress is a Kubernetes API resource that defines HTTP and HTTPS routing rules for external access to services inside a cluster. It can route requests based on hostnames and URL paths. In AWS environments, the AWS Load Balancer Controller can interpret Ingress resources and provision or configure an Application Load Balancer. For example, requests to api.example.com can be routed to an API service while requests to shop.example.com reach a frontend service. TLS certificates can be integrated to secure external application traffic."
  },
  {
    "question": "19. What is the AWS Load Balancer Controller?",
    "answer": "The AWS Load Balancer Controller is a Kubernetes controller that manages AWS Elastic Load Balancing resources for workloads running on EKS. It watches Kubernetes resources such as Ingress and Service objects and creates or updates the corresponding AWS load balancers and target groups. It supports Application Load Balancers for HTTP and HTTPS routing and Network Load Balancers for suitable network-level use cases. In production, the controller helps automate external traffic management rather than requiring engineers to manually configure every load balancer."
  },
  {
    "question": "20. What is Cluster Autoscaler in EKS?",
    "answer": "Cluster Autoscaler automatically adjusts the number of worker nodes in a Kubernetes cluster based on pod scheduling requirements and available capacity. When pods cannot be scheduled because existing nodes lack sufficient resources, it can increase node group capacity. When nodes remain underutilized and workloads can be moved safely, it may reduce the number of nodes. It must be configured with suitable node group limits and permissions. This helps organizations balance application availability with infrastructure cost, especially when workload demand changes throughout the day."
  },
  {
    "question": "21. What is Karpenter in EKS?",
    "answer": "Karpenter is a Kubernetes node provisioning system that launches compute capacity in response to unscheduled pod requirements. It evaluates workload resource requests and provisioning constraints, then selects suitable EC2 capacity based on configured NodePools and related settings. Compared with traditional fixed node groups, Karpenter can offer flexible instance selection and faster capacity provisioning. For example, a cluster running variable batch workloads can use Karpenter to launch appropriate instances when demand increases and consolidate unused capacity when workloads decrease."
  },
  {
    "question": "22. What is Horizontal Pod Autoscaler?",
    "answer": "Horizontal Pod Autoscaler, commonly called HPA, automatically changes the number of pod replicas based on observed metrics. It commonly uses CPU and memory utilization and can also use custom or external metrics when configured. The HPA controller compares current metrics with the configured target and adjusts the replica count of a Deployment or another supported workload. For example, an online shopping application can increase frontend replicas during a traffic spike. Appropriate resource requests and metrics availability are important for reliable autoscaling."
  },
  {
    "question": "23. What is a Kubernetes namespace?",
    "answer": "A namespace provides a logical separation for resources inside a Kubernetes cluster. It allows teams to organize applications and apply different access controls, quotas, and policies. For example, an organization may create development, testing, staging, and production namespaces within one cluster. Namespaces help avoid naming conflicts and make resource management easier. However, namespaces alone do not provide complete security isolation, so production environments should also use suitable RBAC permissions, network policies, and admission controls."
  },
  {
    "question": "24. What is RBAC in EKS?",
    "answer": "Role-Based Access Control is the Kubernetes authorization mechanism that determines what users and service accounts are allowed to do with cluster resources. RBAC uses Roles or ClusterRoles to define permissions and RoleBindings or ClusterRoleBindings to associate those permissions with identities. In EKS, AWS identity authentication and Kubernetes authorization or EKS access policies work together to control cluster access. A production team should provide developers only the permissions required for their responsibilities instead of granting unrestricted cluster administrator access."
  },
  {
    "question": "25. What is an EKS access entry?",
    "answer": "An EKS access entry is an AWS-managed mechanism for associating an IAM principal with access to an EKS cluster. Administrators can use access entries to configure which IAM users or roles are recognized for cluster access and can associate suitable EKS access policies. Kubernetes RBAC can also be used for more granular permissions where appropriate. This provides a clearer way to manage cluster access than relying exclusively on manually editing the legacy aws-auth ConfigMap. Access should be reviewed regularly in production environments."
  },
  {
    "question": "26. What is a ConfigMap in Kubernetes?",
    "answer": "A ConfigMap stores non-sensitive configuration data as key-value pairs that can be consumed by pods. It separates application configuration from the container image, allowing the same image to be deployed into multiple environments with different settings. A ConfigMap can be exposed as environment variables, command arguments, or mounted files. For example, a service can read its application endpoint or feature configuration from a ConfigMap. Sensitive values such as passwords and API keys should be stored using an appropriate secret-management solution instead."
  },
  {
    "question": "27. What is a Kubernetes Secret?",
    "answer": "A Kubernetes Secret stores sensitive configuration data such as passwords, tokens, and certificates. Pods can consume secrets through environment variables or mounted volumes, depending on the application requirements. In EKS, organizations should carefully configure encryption, IAM permissions, Kubernetes RBAC, and secret access auditing. Integration with AWS Secrets Manager or other secret-management systems can improve centralized rotation and governance. A Secret should not be treated as automatically secure merely because its Kubernetes resource type is named Secret."
  },
  {
    "question": "28. How do you troubleshoot a CrashLoopBackOff pod in EKS?",
    "answer": "CrashLoopBackOff means a container repeatedly starts, exits, and is restarted by Kubernetes with increasing delay between attempts. Engineers begin by checking kubectl describe pod to inspect events, restart counts, probes, and scheduling details. They then use kubectl logs and kubectl logs --previous to inspect current and previous container output. Common causes include incorrect application configuration, missing secrets, invalid commands, dependency failures, and memory limits. The correct fix depends on the container exit reason and application logs rather than simply restarting the pod."
  },
  {
    "question": "29. How do you troubleshoot ImagePullBackOff in EKS?",
    "answer": "ImagePullBackOff indicates that Kubernetes cannot successfully retrieve a container image from its registry. Engineers inspect pod events using kubectl describe pod and verify the image repository, tag, and registry location. They also check whether the worker node or Fargate execution role has permission to pull the image, and whether network connectivity and registry access are available. Common causes include an incorrect image tag, missing ECR repository, insufficient IAM permissions, or unavailable registry credentials. Correcting the image reference or access configuration usually resolves the issue."
  },
  {
    "question": "30. How do you upgrade an EKS cluster?",
    "answer": "An EKS upgrade involves moving the Kubernetes control plane to a supported version and ensuring that worker nodes and cluster add-ons are compatible. Before upgrading, teams review Kubernetes version compatibility, deprecated APIs, add-on versions, application manifests, and backup or recovery requirements. They then upgrade the control plane and update managed node groups or other compute capacity using a controlled rollout. Production upgrades should be tested in a non-production cluster first, monitored carefully, and performed with a rollback or recovery plan."
  },
  {
    "question": "31. What are EKS add-ons?",
    "answer": "EKS add-ons are packaged Kubernetes components that provide important cluster functionality and can be managed through AWS. Examples include the VPC CNI plugin, CoreDNS, and kube-proxy. Add-ons are responsible for networking, DNS resolution, and service networking behavior within the cluster. EKS supports version management and compatibility checks for supported add-ons. In production, administrators should monitor add-on health and upgrade versions in coordination with Kubernetes cluster upgrades to avoid compatibility problems."
  },
  {
    "question": "32. What is CoreDNS in EKS?",
    "answer": "CoreDNS is the DNS service commonly used inside Kubernetes clusters. It allows pods to resolve Kubernetes Service names and other configured DNS records. When an application communicates with a service using a name such as backend.default.svc.cluster.local, CoreDNS helps resolve that name to the appropriate service address. If CoreDNS pods are unhealthy or overloaded, applications may experience DNS resolution failures even when their own containers are running. Engineers troubleshoot CoreDNS by inspecting pod health, logs, resource usage, and network connectivity."
  },
  {
    "question": "33. How is monitoring implemented in EKS?",
    "answer": "EKS monitoring combines Kubernetes metrics, application metrics, infrastructure metrics, logs, and AWS service monitoring. Teams may use Amazon CloudWatch Container Insights, Prometheus, Grafana, and other observability platforms to monitor nodes, pods, containers, and application behavior. Important indicators include CPU usage, memory consumption, pod restarts, node pressure, request latency, and error rates. Alerts should identify actionable conditions before they affect users. For example, an alert can notify the operations team when a production service repeatedly restarts or cluster capacity becomes insufficient."
  },
  {
    "question": "34. How do you secure an EKS cluster?",
    "answer": "Securing EKS requires controls across identity, networking, workloads, images, and the Kubernetes API. Teams should apply least-privilege IAM and RBAC permissions, restrict public API access where possible, encrypt sensitive data, and use private networking for worker nodes when appropriate. Container images should be scanned and sourced from trusted registries. Network policies, pod security controls, patching, audit logging, and secret rotation provide additional protection. Security should be integrated into the deployment pipeline instead of being treated as a final production activity."
  },
  {
    "question": "35. Explain a real-time EKS deployment workflow.",
    "answer": "A typical EKS deployment begins when a developer pushes application code to a Git repository. A CI pipeline runs tests, builds a Docker image, scans it, and pushes the approved image to Amazon ECR. The deployment stage updates Kubernetes manifests or Helm values with the new image version and applies them to the EKS cluster. Kubernetes creates the required pods and gradually replaces older replicas according to the Deployment strategy. The team then verifies rollout status, service health, logs, metrics, and application behavior before considering the release complete."
  }
];

