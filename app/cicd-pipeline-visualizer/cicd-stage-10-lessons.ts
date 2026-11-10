export type KubernetesSection = {
  title: string;
  content: string;
  code?: string;
  practicalNotes?: string[];
};

export type KubernetesLesson = {
  title: string;
  description: string;
  sections: KubernetesSection[];
  exercise: string;
};

const section = (
  title: string,
  content: string,
  code?: string,
  practicalNotes?: string[]
): KubernetesSection => ({
  title,
  content,
  ...(code ? { code } : {}),
  ...(practicalNotes ? { practicalNotes } : {})
});

export const stageTenLessonOverrides: Record<string, KubernetesLesson> = {
  "Kubernetes Fundamentals": {
    title: "Kubernetes Fundamentals",
    description: "Understand container orchestration, desired state, reconciliation, and the Kubernetes resources used to operate production applications.",
    sections: [
      section("What Kubernetes Solves", "Kubernetes orchestrates containers across a cluster of machines. It schedules workloads, restarts failed containers, maintains replica counts, provides service discovery, and coordinates application rollouts. It does not automatically make an application highly available: replicas, topology, storage, probes, and capacity must be designed correctly."),
      section("Declarative Desired State", "Operators describe the state they want through Kubernetes API objects. Controllers continuously compare actual state with desired state and take corrective action. For example, a Deployment requesting three replicas causes the ReplicaSet controller to create Pods until three suitable replicas exist."),
      section("Core Workload and Network Resources", "Pods are the smallest schedulable workload units. Deployments manage stateless replicas and rollouts. StatefulSets provide stable identities for stateful workloads. Services provide stable network endpoints, while ConfigMaps and Secrets supply configuration."),
      section("Cluster Interaction with kubectl", "kubectl communicates with the Kubernetes API server using the active kubeconfig context. Always verify the current context before applying changes, especially when a workstation has development, staging, and production clusters configured.", "kubectl config get-contexts\nkubectl config current-context\nkubectl get nodes\nkubectl get namespaces\nkubectl get pods -A"),
      section("Desired State in a Deployment", "A Deployment manifest records the requested replica count, container image, labels, ports, and rollout strategy. Store manifests in version control so production changes can be reviewed and reproduced.", "kubectl apply -f deployment.yaml\nkubectl get deployments\nkubectl rollout status deployment/payment-api\nkubectl describe deployment payment-api"),
      section("Operational Boundaries", "Kubernetes manages infrastructure-level workload state, but application correctness remains the responsibility of the application and its delivery process. Database migrations, backward-compatible APIs, graceful shutdown, and external dependency health need separate engineering controls.")
    ],
    exercise: "Deploy a sample stateless application with three replicas. Inspect its Pods and Deployment, delete one Pod, and observe how Kubernetes restores the desired replica count. Record the commands and explain which controller performed the recovery."
  },

  "Kubernetes Architecture": {
    title: "Kubernetes Architecture",
    description: "Explore the control plane, worker-node components, API communication, controllers, and the reconciliation model.",
    sections: [
      section("Control Plane and Data Plane", "The control plane exposes the Kubernetes API and makes cluster-level decisions. Worker nodes provide compute capacity and run application Pods. Separating these responsibilities helps operators understand whether a failure affects cluster management, workload execution, or both."),
      section("API-driven Architecture", "Most Kubernetes operations are API operations. kubectl, controllers, operators, and automation clients submit requests to the API server. Authentication, authorization, admission control, validation, and persistence determine whether an object change is accepted."),
      section("Controller Reconciliation", "Controllers watch API objects and reconcile observed state toward desired state. A Deployment controller creates or updates ReplicaSets; a ReplicaSet controller maintains Pod replicas. Reconciliation is continuous, so a successful API request does not necessarily mean the workload is already healthy."),
      section("Node-level Components", "The kubelet manages Pods assigned to its node. The container runtime starts and stops containers. kube-proxy or the cluster networking implementation helps implement Service traffic behavior. Node health and resource pressure influence workload scheduling and eviction."),
      section("Architecture Inspection", "Use cluster and node inspection commands to understand the environment before troubleshooting. Component visibility varies between managed and self-managed Kubernetes installations.", "kubectl get nodes -o wide\nkubectl get pods -n kube-system -o wide\nkubectl get componentstatuses\nkubectl cluster-info"),
      section("Failure Domains", "A control-plane outage can prevent new API changes while existing containers may continue running. A worker-node failure affects workloads placed on that node. A network or DNS failure can make healthy Pods unreachable. Diagnose the failure domain before restarting components.")
    ],
    exercise: "Draw a request path from kubectl to the API server, persistence layer, scheduler, kubelet, and container runtime. Explain what happens when a Deployment is scaled from two replicas to four."
  },

  "EKS Architecture": {
    title: "EKS Architecture",
    description: "Understand Amazon EKS managed control planes, worker capacity options, AWS integrations, and cluster connectivity.",
    sections: [
      section("Managed Kubernetes Control Plane", "Amazon EKS operates the Kubernetes control plane across AWS-managed infrastructure. AWS manages control-plane availability and maintenance responsibilities, while the customer remains responsible for worker capacity, workloads, access policies, networking, and application operations."),
      section("EKS Cluster Building Blocks", "An EKS environment includes a cluster control plane, Kubernetes API endpoint, VPC networking, worker nodes or serverless compute, cluster identity, and integrations such as IAM, load balancing, storage, and observability."),
      section("Worker Capacity Choices", "Managed node groups simplify EC2 worker provisioning and lifecycle management. Self-managed nodes provide more direct control but require more operational ownership. Fargate runs eligible Pods without customer-managed worker nodes. Select capacity based on workload requirements, DaemonSet needs, privileged access, and cost."),
      section("VPC and Subnet Design", "EKS networking depends on VPC subnets, route tables, security groups, and the Amazon VPC CNI. Place cluster resources across appropriate Availability Zones. Private worker subnets commonly use controlled outbound connectivity through NAT or VPC endpoints."),
      section("AWS Identity Integration", "IAM controls AWS API permissions. Kubernetes RBAC controls Kubernetes API permissions. EKS access entries or configured identity mappings connect IAM identities to Kubernetes access. Avoid assuming that an IAM policy alone grants unrestricted Kubernetes permissions."),
      section("Inspecting an EKS Cluster", "Use AWS CLI to inspect cluster status, endpoint configuration, version, and node groups. Confirm the AWS account and region before making changes.", "aws sts get-caller-identity\naws eks list-clusters --region ap-south-1\naws eks describe-cluster --name production-eks --region ap-south-1\naws eks list-nodegroups --cluster-name production-eks --region ap-south-1"),
      section("Production EKS Design", "Use multiple Availability Zones, private worker subnets where appropriate, restricted API access, managed node-group update planning, cluster logging, workload autoscaling, and tested recovery procedures. Plan Kubernetes and add-on version compatibility before upgrades.")
    ],
    exercise: "Inspect an existing EKS cluster using AWS CLI. Document its Kubernetes version, endpoint access settings, VPC, subnet configuration, and node groups. Produce a simple architecture diagram showing the control plane and worker networking."
  },

  "Control Plane Components": {
    title: "Control Plane Components",
    description: "Learn how the API server, scheduler, controller manager, and cluster state services coordinate Kubernetes operations.",
    sections: [
      section("API Server Responsibilities", "The API server is the front door to the Kubernetes control plane. It authenticates clients, authorizes requests, applies admission policies, validates objects, and coordinates persistence. A successful API response confirms acceptance, not application readiness."),
      section("Scheduler Responsibilities", "The scheduler evaluates unscheduled Pods and selects suitable nodes based on resource requests, constraints, affinity, taints, tolerations, and topology requirements. A Pod that cannot fit any node remains Pending with scheduling events explaining the reason."),
      section("Controller Manager", "The controller manager runs reconciliation controllers that maintain resources such as Deployments, ReplicaSets, Nodes, and Jobs. Controllers react to observed state changes and repeatedly attempt to satisfy desired state."),
      section("Cluster State and etcd", "etcd is the consistent key-value store used by Kubernetes to persist cluster state. In EKS, AWS operates the managed control-plane infrastructure. Customers should still protect workload manifests, configuration, and recovery procedures in version control and backups."),
      section("Control Plane Observability", "In managed EKS, control-plane component access differs from a self-managed cluster. Enable supported EKS control-plane logs and use CloudWatch, Kubernetes events, and API metrics available to the environment.", "aws eks update-cluster-config --name production-eks --region ap-south-1 --logging '{\"clusterLogging\":[{\"types\":[\"api\",\"audit\",\"authenticator\",\"controllerManager\",\"scheduler\"],\"enabled\":true}]}'\nkubectl get events -A --sort-by=.metadata.creationTimestamp"),
      section("Control Plane Failure Symptoms", "API timeouts, authentication failures, admission webhook timeouts, and delayed reconciliation can have different causes. Check endpoint reachability, IAM authentication, control-plane logs, webhook availability, and AWS service health before changing workloads.")
    ],
    exercise: "Enable the appropriate EKS control-plane log types in a test cluster. Generate a harmless Deployment update and locate the corresponding API or audit activity. Explain which control-plane component is responsible for each observed action."
  },

  "Worker Nodes": {
    title: "Worker Nodes",
    description: "Operate Kubernetes compute nodes, understand node lifecycle, and diagnose readiness and resource-pressure conditions.",
    sections: [
      section("Worker Node Responsibilities", "Worker nodes provide CPU, memory, storage, and network capacity for Pods. The kubelet registers the node and manages assigned workloads. The container runtime executes containers, while node networking enables Pod and Service communication."),
      section("Node Registration and Readiness", "A node must register with the cluster and report healthy conditions before it can reliably host workloads. NotReady can result from kubelet failures, networking problems, disk pressure, memory pressure, or cloud infrastructure issues.", "kubectl get nodes -o wide\nkubectl describe node <node-name>\nkubectl get events -A --sort-by=.metadata.creationTimestamp"),
      section("Managed Node Groups", "EKS managed node groups coordinate EC2 Auto Scaling infrastructure and Kubernetes node lifecycle. Node-group configuration includes instance types, scaling settings, subnets, AMI release versions, and update behavior. Verify Pod disruption and spare capacity before updates."),
      section("Node Labels and Scheduling", "Labels describe node characteristics such as workload class, architecture, or storage capability. nodeSelector and node affinity constrain placement. Use labels consistently and avoid relying on accidental node names for workload placement.", "kubectl label nodes <node-name> workload=payments\nkubectl get nodes --show-labels"),
      section("Drain and Maintenance", "Draining marks a node unschedulable and evicts eligible Pods so maintenance can proceed. PodDisruptionBudgets can limit voluntary disruptions. DaemonSet Pods and certain unmanaged Pods require special consideration.", "kubectl cordon <node-name>\nkubectl drain <node-name> --ignore-daemonsets --delete-emptydir-data\nkubectl uncordon <node-name>"),
      section("Node Capacity and Scaling", "Monitor allocatable CPU and memory, Pod density, ephemeral storage, and actual workload consumption. Cluster autoscaling mechanisms can add nodes when Pods cannot schedule, but they cannot solve every constraint such as incompatible instance types or unavailable subnet IPs.")
    ],
    exercise: "In a non-production cluster, inspect node conditions and allocatable resources. Cordon and drain a worker node with a safe workload, verify replacement Pods become healthy, and uncordon the node after maintenance."
  },

  "API Server and etcd": {
    title: "API Server and etcd",
    description: "Understand Kubernetes API requests, object persistence, resource versions, and safe state-management practices.",
    sections: [
      section("Kubernetes API Resources", "Kubernetes exposes versioned API resources such as Pods, Deployments, Services, and ConfigMaps. Each object has metadata, a specification describing desired state, and status describing observed state. API discovery reveals supported resource types and versions."),
      section("Request Processing", "A client sends an authenticated API request. The API server performs authorization and admission checks, validates the object, and coordinates persistence. Controllers then observe changes and reconcile dependent resources."),
      section("etcd Persistence Model", "etcd stores Kubernetes cluster data with consistency guarantees. In self-managed clusters, etcd health, quorum, backups, and restore procedures are critical control-plane responsibilities. In EKS, AWS manages the underlying control-plane etcd service."),
      section("Object Versions and Concurrency", "Kubernetes resourceVersion supports change tracking and optimistic concurrency. A stale update can be rejected because another actor changed the object. Re-read the current object and apply a deliberate patch rather than blindly repeating an outdated replacement."),
      section("Inspect API Resources", "Use API discovery, explain, and raw API inspection to understand schemas and object fields.", "kubectl api-resources\nkubectl api-versions\nkubectl explain deployment.spec\nkubectl get deployment payment-api -o yaml\nkubectl get --raw /version"),
      section("Safe State Changes", "Prefer declarative manifests and reviewed changes. Avoid direct etcd edits in normal operations. Store critical manifests outside the cluster and document recovery dependencies such as secrets, persistent volumes, external databases, and IAM configuration.")
    ],
    exercise: "Inspect a Deployment's YAML and resourceVersion. Update one replica field using a declarative manifest, retrieve the object again, and explain how the API server and Deployment controller process the change."
  },

  "Scheduler and Kubelet": {
    title: "Scheduler and Kubelet",
    description: "Understand Pod placement decisions and the node agent's role in preparing and maintaining containers.",
    sections: [
      section("Scheduling Lifecycle", "A newly created Pod without a node assignment enters the scheduling queue. The scheduler filters nodes that cannot satisfy requirements, scores feasible nodes, and binds the Pod to a selected node."),
      section("Scheduling Constraints", "Resource requests, node selectors, affinity, anti-affinity, topology spread, taints, and tolerations influence placement. Overly strict constraints can leave Pods Pending even when the cluster appears to have free CPU."),
      section("Kubelet Responsibilities", "The kubelet watches Pods assigned to its node, prepares volumes, asks the container runtime to create containers, executes probes, and reports Pod and node status to the API server."),
      section("Diagnosing Pending Pods", "Describe the Pod and inspect events before changing node capacity. FailedScheduling messages often identify insufficient CPU, insufficient memory, untolerated taints, node affinity conflicts, or volume topology constraints.", "kubectl describe pod <pod-name> -n production\nkubectl get events -n production --sort-by=.metadata.creationTimestamp\nkubectl get nodes"),
      section("Diagnosing Container Startup", "If a Pod is scheduled but containers do not start, inspect image pull events, volume mount errors, runtime conditions, security context, and node health. A scheduling success does not guarantee a successful container startup."),
      section("Placement Design Example", "Separate latency-sensitive payment workloads from batch processing using node labels and affinity. Combine placement rules with topology spread so replicas are not unnecessarily concentrated on a single failure domain.")
    ],
    exercise: "Create a Pod with a nodeSelector that matches no node. Inspect its scheduling events, add a suitable label to a test node, and observe scheduling. Explain the scheduler and kubelet responsibilities."
  },

  "Pods": {
    title: "Pods",
    description: "Create and operate Pods, understand container sharing, lifecycle, probes, and ephemeral workload behavior.",
    sections: [
      section("Pod as the Workload Unit", "A Pod groups one or more tightly coupled containers that share a network namespace and can share mounted volumes. Containers in the same Pod communicate through localhost and are scheduled together onto one node."),
      section("Pod Lifecycle", "Pods progress through lifecycle phases such as Pending, Running, Succeeded, Failed, and Unknown. These phases summarize Pod state; individual container states provide more precise information about waiting, running, and terminated containers."),
      section("Multi-container Patterns", "Sidecars support tightly coupled tasks such as log forwarding, proxying, or configuration refresh. Init containers complete setup before application containers start. Avoid adding containers to a Pod when independent scaling and deployment are required."),
      section("Pod Manifest and Labels", "Pod manifests define containers, images, ports, environment variables, resources, volumes, and security settings. Labels connect Pods to higher-level controllers and Services.", "kubectl run debug-shell --image=busybox:1.36 --restart=Never -- sleep 3600\nkubectl get pod debug-shell -o wide\nkubectl describe pod debug-shell\nkubectl delete pod debug-shell"),
      section("Container Logs and Execution", "Use logs to inspect application output and exec only when an interactive shell is necessary and permitted. For a restarted container, use previous logs to inspect the prior termination.", "kubectl logs <pod-name> -n production\nkubectl logs <pod-name> -c <container-name> --previous\nkubectl exec -it <pod-name> -n production -- sh"),
      section("Pod Reliability", "Do not rely on manually created Pods for production replica management. Use Deployments, StatefulSets, or Jobs. Configure graceful termination, resource requests, probes, and appropriate disruption handling.")
    ],
    exercise: "Create a Pod manifest with labels, a resource request, and a container port. Inspect its status and logs, execute a read-only diagnostic command, and delete the Pod."
  },

  "Deployments and ReplicaSets": {
    title: "Deployments and ReplicaSets",
    description: "Manage stateless application replicas, rollout strategies, scaling, and declarative release updates.",
    sections: [
      section("Deployment Responsibilities", "A Deployment manages ReplicaSets and provides declarative updates for stateless applications. It maintains the requested replica count and records rollout history. A ReplicaSet ensures that the required number of matching Pods exists."),
      section("Selector and Template Relationship", "The Deployment selector must match the labels in its Pod template. Incorrect or overlapping selectors can cause ownership conflicts. Treat selectors as stable identifiers and avoid changing them casually after creation."),
      section("Replica Management", "Scaling changes the desired replica count. The ReplicaSet controller creates or removes Pods to match that count. Capacity, quota, Pod scheduling constraints, and readiness determine whether the requested replicas become available.", "kubectl scale deployment payment-api --replicas=4 -n production\nkubectl get deployment payment-api -n production\nkubectl get rs -n production\nkubectl get pods -n production -l app=payment-api"),
      section("Rolling Update Strategy", "RollingUpdate gradually replaces old Pods with new Pods according to maxSurge and maxUnavailable. Readiness probes determine when new replicas are considered available. Set strategy values based on application capacity and availability requirements."),
      section("Release Inspection", "Use rollout status, history, and describe to verify deployment progress. Inspect the ReplicaSets and Pod images to confirm that the intended version is running.", "kubectl rollout status deployment/payment-api -n production\nkubectl rollout history deployment/payment-api -n production\nkubectl describe deployment payment-api -n production"),
      section("Production Deployment Practices", "Use immutable image tags or digests, resource requests, readiness probes, disruption budgets, and progressive delivery where needed. Ensure the application supports overlapping old and new versions during a rolling update.")
    ],
    exercise: "Deploy a sample application with two replicas. Update its image to a new version, watch the rollout, inspect old and new ReplicaSets, and verify that all available replicas use the intended image."
  },

  "Services and Service Discovery": {
    title: "Services and Service Discovery",
    description: "Provide stable network endpoints for dynamic Pods using ClusterIP, NodePort, LoadBalancer, and DNS.",
    sections: [
      section("Why Services Are Needed", "Pod IP addresses can change when Pods are recreated. A Service provides a stable virtual endpoint and selects backend Pods using labels. Clients can use the Service name instead of tracking individual Pod addresses."),
      section("ClusterIP Service", "ClusterIP exposes an application inside the cluster and is the common choice for internal service-to-service communication. Kubernetes DNS creates a stable name for the Service within its namespace."),
      section("NodePort and LoadBalancer", "NodePort exposes a port on eligible nodes. LoadBalancer requests an external load balancer integration, commonly through the cloud provider or AWS Load Balancer Controller in EKS. Choose exposure deliberately and restrict public access."),
      section("Selectors and Endpoints", "A Service selector must match the intended Pod labels. If endpoints are empty, check selector labels, Pod readiness, namespace, and target port. EndpointSlice resources show the backend addresses associated with a Service.", "kubectl get svc -n production\nkubectl get endpoints -n production\nkubectl get endpointslices -n production\nkubectl describe service payment-api -n production"),
      section("Cluster DNS Resolution", "CoreDNS provides cluster DNS. A Service can generally be reached by its short name inside the same namespace or by a fully qualified service DNS name across namespaces. DNS failures require checking CoreDNS health and Pod DNS configuration."),
      section("Service Port Mapping", "port is the Service-facing port; targetPort is the destination port on the selected Pod. A mismatch can produce connection failures even when the Service has healthy endpoints. Verify application listening addresses and container ports.")
    ],
    exercise: "Deploy two application replicas and expose them using a ClusterIP Service. Resolve the Service DNS name from a temporary diagnostic Pod and verify traffic reaches the backend replicas."
  },

  "ConfigMaps and Secrets": {
    title: "ConfigMaps and Secrets",
    description: "Manage application configuration and sensitive values while understanding mounting, environment injection, and security boundaries.",
    sections: [
      section("Configuration Separation", "ConfigMaps store non-sensitive configuration separately from container images. Secrets store sensitive values such as credentials and tokens. Keeping configuration outside images makes deployments portable across environments."),
      section("ConfigMap Delivery Methods", "Applications can consume ConfigMaps as environment variables, command arguments, or mounted files. Environment variables are generally fixed when the container starts; mounted files may update eventually, depending on how they are consumed."),
      section("Secret Delivery Methods", "Secrets can be exposed as environment variables or mounted files. Base64 encoding in a Secret manifest is not encryption. Restrict access through RBAC and configure appropriate encryption at rest and external secret-management integrations."),
      section("Create and Inspect Configuration", "Avoid printing real credentials in terminal output or committing them to Git. Use placeholder values in examples and secure deployment pipelines for production secret injection.", "kubectl create configmap payment-config --from-literal=APP_MODE=production -n production\nkubectl get configmap payment-config -n production -o yaml\nkubectl create secret generic payment-db --from-literal=DB_PASSWORD='REPLACE_ME' -n production"),
      section("Mounted Configuration", "Mount configuration files at explicit paths and ensure application file permissions are appropriate. Applications should validate required keys at startup and handle configuration changes safely."),
      section("Configuration Change Rollouts", "Updating a ConfigMap does not automatically restart Pods using environment variables. Use a controlled rollout or checksum-based Pod template change when configuration updates must trigger application restarts. Rotate secrets using a documented procedure.")
    ],
    exercise: "Create a ConfigMap and a test Secret with non-sensitive placeholder values. Mount each into a sample Pod, verify the application can read them, then remove the resources and document the RBAC permissions required."
  },

  "Health Probes": {
    title: "Health Probes",
    description: "Configure startup, readiness, and liveness probes to control application startup, traffic eligibility, and recovery.",
    sections: [
      section("Probe Types and Intent", "Startup probes protect slow-starting applications from premature liveness failures. Readiness probes determine whether a Pod should receive Service traffic. Liveness probes detect an application that should be restarted."),
      section("Readiness Probe Design", "Readiness should verify that the application can safely serve requests. It may check local initialization and essential dependencies, but avoid making transient downstream failures remove every application replica from service without careful design."),
      section("Liveness Probe Design", "Liveness should detect a process that cannot recover without restart. Do not make liveness depend on external databases or APIs unless restarting the application is genuinely the correct recovery action."),
      section("Startup Probe Tuning", "A startup probe allows an application a defined startup window. Its failure threshold multiplied by its period provides an approximate maximum startup allowance. Configure values based on measured startup behavior, not guesswork."),
      section("HTTP Probe Example", "Probe paths and ports must match the application's actual listener. An HTTP endpoint returning an unexpected status code causes probe failure. Use named ports where that improves clarity.", "startupProbe:\n  httpGet:\n    path: /health/startup\n    port: 8080\n  periodSeconds: 10\n  failureThreshold: 30\nreadinessProbe:\n  httpGet:\n    path: /health/ready\n    port: 8080\n  periodSeconds: 5\nlivenessProbe:\n  httpGet:\n    path: /health/live\n    port: 8080\n  periodSeconds: 10\n  failureThreshold: 3"),
      section("Probe Failure Diagnosis", "Inspect Pod events, container restarts, probe configuration, application logs, and endpoint behavior. Connection refused may indicate a wrong port or listener binding. Timeout may indicate a slow endpoint or overloaded application.", "kubectl describe pod <pod-name> -n production\nkubectl logs <pod-name> -n production --previous\nkubectl get pods -n production -o wide"),
      section("Production Probe Practices", "Use separate endpoints when startup, readiness, and liveness have different meanings. Set realistic timeouts and thresholds. Test probes under slow startup, CPU pressure, dependency degradation, and rolling deployments.")
    ],
    exercise: "Add startup, readiness, and liveness probes to a sample Deployment. Simulate a readiness failure and observe Service endpoint behavior. Explain why a readiness failure should not automatically restart the container."
  },

  "Requests and Limits": {
    title: "Requests and Limits",
    description: "Control workload resource scheduling and runtime consumption with CPU, memory, and ephemeral storage settings.",
    sections: [
      section("Requests Versus Limits", "Requests represent resources Kubernetes uses when scheduling Pods and calculating resource allocation. Limits cap resource usage at runtime. A missing request can make scheduling and capacity planning unpredictable, especially in shared production clusters."),
      section("CPU Resource Behavior", "CPU requests influence scheduling and relative CPU allocation under contention. CPU limits can throttle a container when it exceeds its allowed CPU quota. CPU is measured in cores or millicores; 500m represents half a CPU core."),
      section("Memory Resource Behavior", "Memory limits are enforced differently from CPU limits. A container exceeding its memory limit can be terminated with an OOMKilled reason. Set memory requests and limits using measured working-set behavior and realistic peak demand."),
      section("Resource Configuration", "Define resource values per container. A Pod's scheduling requirement is affected by its containers and init-container resource requirements. Include sidecars in capacity calculations.", "resources:\n  requests:\n    cpu: 250m\n    memory: 256Mi\n  limits:\n    cpu: '1'\n    memory: 512Mi"),
      section("Resource Diagnosis", "Inspect Pod resource configuration, node allocatable capacity, metrics, and termination reasons. Pending Pods may indicate insufficient requested resources; OOMKilled indicates memory pressure or an undersized limit.", "kubectl describe pod <pod-name> -n production\nkubectl top pods -n production\nkubectl top nodes\nkubectl describe node <node-name>"),
      section("Namespace Quotas and Defaults", "ResourceQuota limits aggregate namespace consumption. LimitRange can provide default requests and limits or constrain individual workloads. These controls help prevent one team from consuming unbounded shared capacity."),
      section("Right-sizing Workloads", "Use historical CPU and memory metrics, load tests, peak traffic, and restart data to right-size resources. Avoid blindly copying requests from another application. Revisit settings after major traffic or runtime changes.")
    ],
    exercise: "Deploy a test application with explicit CPU and memory requests and limits. Inspect its resource configuration and metrics, then explain how an insufficient request differs from a memory limit violation."
  },

  "Namespaces and RBAC": {
    title: "Namespaces and RBAC",
    description: "Separate cluster resources and implement least-privilege access using Roles, ClusterRoles, and bindings.",
    sections: [
      section("Namespace Isolation", "Namespaces provide logical grouping for namespaced resources and support team, environment, and application boundaries. They do not provide complete network or security isolation by themselves."),
      section("RBAC Authorization Model", "Kubernetes RBAC grants permissions through Roles or ClusterRoles and assigns them through RoleBindings or ClusterRoleBindings. Permissions are additive; RBAC does not provide explicit deny rules."),
      section("Role and RoleBinding", "A Role defines permissions within one namespace. A RoleBinding grants those permissions to a user, group, or ServiceAccount in that namespace. Prefer namespace-scoped access when cluster-wide permissions are unnecessary."),
      section("Least-Privilege Example", "This example grants read-only access to Pods in the production namespace. Expand permissions only when a documented workflow requires additional resources or verbs.", "apiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  name: pod-reader\n  namespace: production\nrules:\n- apiGroups: ['']\n  resources: ['pods']\n  verbs: ['get', 'list', 'watch']\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata:\n  name: pod-reader-binding\n  namespace: production\nsubjects:\n- kind: ServiceAccount\n  name: support-reader\n  namespace: production\nroleRef:\n  apiGroup: rbac.authorization.k8s.io\n  kind: Role\n  name: pod-reader"),
      section("Permission Verification", "Use auth can-i to test effective permissions. Inspect bindings and roles to identify where access is granted. In EKS, also verify the IAM identity and its mapping or access entry.", "kubectl auth can-i list pods -n production\nkubectl auth can-i create deployments -n production\nkubectl get roles,rolebindings -n production\nkubectl get clusterroles,clusterrolebindings"),
      section("ServiceAccount Security", "Use dedicated ServiceAccounts for workloads that call the Kubernetes API. Avoid granting the default ServiceAccount broad permissions. Disable automatic token mounting when a workload does not need Kubernetes API access."),
      section("EKS Access Governance", "Combine IAM identity controls with Kubernetes RBAC. Review EKS access entries, access policies, namespace bindings, and audit logs. Remove obsolete access and periodically verify that automation identities retain only required permissions.")
    ],
    exercise: "Create a namespace, a ServiceAccount, and a Role that allows listing Pods only. Bind the role, verify allowed and denied operations with kubectl auth can-i, and explain why a ClusterRoleBinding would be broader."
  },

  "Ingress and Load Balancing": {
    title: "Ingress and Load Balancing",
    description: "Expose HTTP and HTTPS workloads using Ingress resources and the AWS Load Balancer Controller.",
    sections: [
      section("Ingress Resource Purpose", "Ingress defines HTTP and HTTPS routing rules from external clients to Kubernetes Services. An Ingress resource requires an Ingress controller to implement those rules; creating the object alone does not create a functioning load balancer."),
      section("AWS Load Balancer Controller", "In EKS, the AWS Load Balancer Controller can provision and manage Application Load Balancers for supported Ingress resources and Network Load Balancers for supported Service configurations. Its IAM permissions, subnet discovery, and controller health are essential."),
      section("Ingress Routing Rules", "Host-based and path-based rules route requests to backend Services. The backend Service must exist and expose the expected port. DNS records must point clients to the provisioned load balancer."),
      section("Example Ingress", "This example illustrates an ALB-backed Ingress. Confirm that the controller is installed and that the referenced Service and certificate configuration exist before applying it.", "apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: payment-ingress\n  namespace: production\n  annotations:\n    alb.ingress.kubernetes.io/scheme: internet-facing\n    alb.ingress.kubernetes.io/target-type: ip\nspec:\n  ingressClassName: alb\n  rules:\n  - host: payments.example.com\n    http:\n      paths:\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: payment-api\n            port:\n              number: 80"),
      section("TLS and Certificate Handling", "Terminate HTTPS at the selected load balancer using a correctly provisioned certificate. Verify certificate domain coverage, renewal, listener configuration, and backend protocol. Do not place private certificate keys in ordinary ConfigMaps."),
      section("Load Balancer Troubleshooting", "Check Ingress events, controller logs, subnet tags, security groups, IAM permissions, target health, Service endpoints, and application readiness. A provisioned ALB with unhealthy targets usually requires investigation beyond DNS.", "kubectl describe ingress payment-ingress -n production\nkubectl get svc,endpoints -n production\nkubectl logs -n kube-system deployment/aws-load-balancer-controller"),
      section("Exposure and Cost Controls", "Choose internal or internet-facing schemes intentionally. Restrict listener access, use appropriate WAF and security controls where required, and remove unused load balancer resources. Account for cross-zone traffic and load balancer hourly and capacity costs.")
    ],
    exercise: "In a test EKS environment, expose a sample Service through an ALB-backed Ingress. Verify DNS, listener configuration, target health, and HTTPS behavior. Document the controller and IAM prerequisites."
  },

  "Networking and CNI": {
    title: "Networking and CNI",
    description: "Understand Pod networking, the Amazon VPC CNI, IP allocation, network policies, and connectivity troubleshooting.",
    sections: [
      section("Kubernetes Networking Model", "Kubernetes expects Pods to communicate using Pod IP connectivity and Services to provide stable virtual endpoints. The actual implementation depends on the cluster network plugin and cloud integration."),
      section("Amazon VPC CNI", "The Amazon VPC CNI assigns VPC network addresses to Pods using ENIs and available subnet IP capacity. Pod density and address availability depend on instance type, CNI configuration, and networking mode."),
      section("Subnet IP Exhaustion", "A cluster can have available EC2 compute but still fail to schedule Pods because subnet IP addresses or ENI capacity are exhausted. Monitor subnet free addresses and CNI allocation behavior before increasing workload replicas."),
      section("Network Policy", "NetworkPolicy resources express Pod traffic rules, but enforcement depends on a compatible network policy implementation and configuration. Do not assume a policy object provides protection unless the installed networking stack enforces it."),
      section("DNS and Connectivity Checks", "Separate DNS resolution failures from routing, security-group, NetworkPolicy, and application-listener failures. Test from the same namespace and network location as the affected workload.", "kubectl get pods -n kube-system\nkubectl get nodes -o wide\nkubectl get networkpolicies -A\nkubectl run netcheck --image=busybox:1.36 -it --rm --restart=Never -- nslookup kubernetes.default"),
      section("CNI Troubleshooting", "Inspect VPC CNI DaemonSet health, node events, CNI logs, subnet capacity, ENI limits, and security groups. A Pod sandbox creation failure can point to CNI or IP allocation issues rather than an application image problem."),
      section("Production Network Design", "Plan VPC CIDR size, subnet distribution, Pod density, security groups, routing, DNS, and network policy before large-scale deployment. Monitor IP consumption and validate connectivity across Availability Zones and external dependencies.")
    ],
    exercise: "Inspect the VPC CNI Pods and node networking configuration in a test EKS cluster. Check subnet free IP capacity and perform DNS and Service connectivity tests from a diagnostic Pod."
  },

  "Persistent Storage": {
    title: "Persistent Storage",
    description: "Provision durable volumes with PersistentVolumes, PersistentVolumeClaims, StorageClasses, and the EBS CSI driver.",
    sections: [
      section("Ephemeral and Persistent Data", "Container writable layers and emptyDir volumes are not substitutes for durable application storage. PersistentVolumes provide storage whose lifecycle can outlive an individual Pod, subject to the underlying storage and reclaim configuration."),
      section("PV and PVC Relationship", "A PersistentVolume represents storage capacity available to the cluster. A PersistentVolumeClaim requests storage with a required size and access mode. Kubernetes binds a suitable volume or dynamically provisions one through a StorageClass."),
      section("StorageClass and Dynamic Provisioning", "StorageClasses define provisioner and parameters for dynamic volume creation. In EKS, the Amazon EBS CSI driver provisions EBS volumes for supported workloads. Verify driver installation and IAM permissions."),
      section("EBS-backed Claim Example", "This example requests a small volume using a StorageClass named gp3. Confirm that the class exists and that the selected topology supports the workload.", "apiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: payment-data\n  namespace: production\nspec:\n  accessModes:\n  - ReadWriteOnce\n  storageClassName: gp3\n  resources:\n    requests:\n      storage: 20Gi"),
      section("Mounting Storage in a Pod", "Reference a PVC from a Pod or workload template and mount it at the application's data directory. Ensure file ownership, permissions, filesystem behavior, and application shutdown procedures are compatible with the volume."),
      section("Volume Lifecycle and Access Modes", "ReadWriteOnce commonly restricts a volume to read-write attachment by one node, not necessarily one Pod. Reclaim policies determine what happens to a PV after claim deletion. Stateful workloads need deliberate backup and restore plans."),
      section("Storage Troubleshooting", "PVC Pending may indicate a missing StorageClass, unavailable CSI driver, topology mismatch, or capacity issue. Multi-Attach errors can occur when an EBS volume is still attached elsewhere. Inspect PVC events, PV details, CSI controller logs, and node attachment state.")
    ],
    exercise: "Install or verify the EBS CSI driver in a test EKS cluster. Create a PVC, mount it into a Pod, write a test file, recreate the Pod, and verify the data remains available."
  },

  "Horizontal Pod Autoscaling": {
    title: "Horizontal Pod Autoscaling",
    description: "Scale application replicas using observed resource or custom metrics and understand the metrics pipeline.",
    sections: [
      section("HPA Purpose", "Horizontal Pod Autoscaler adjusts the replica count of a scalable workload based on observed metrics. It can react to CPU, memory, or supported custom and external metrics, but it does not create worker-node capacity by itself."),
      section("Metrics Server Dependency", "Resource-based HPA commonly relies on the Kubernetes Metrics Server. If metrics are unavailable, HPA may show unknown values and cannot calculate the desired replica count. Verify the metrics API before debugging the workload."),
      section("CPU Utilization Target", "CPU utilization is calculated relative to requested CPU. If CPU requests are missing, utilization-based scaling may not behave as expected. Set meaningful requests and validate the target under realistic traffic."),
      section("HPA Manifest", "The autoscaler targets a scalable resource and defines minimum and maximum replicas plus metric targets. Configure scale behavior to reduce oscillation and avoid excessive rapid scale changes.", "apiVersion: autoscaling/v2\nkind: HorizontalPodAutoscaler\nmetadata:\n  name: payment-api\n  namespace: production\nspec:\n  scaleTargetRef:\n    apiVersion: apps/v1\n    kind: Deployment\n    name: payment-api\n  minReplicas: 2\n  maxReplicas: 10\n  metrics:\n  - type: Resource\n    resource:\n      name: cpu\n      target:\n        type: Utilization\n        averageUtilization: 65"),
      section("HPA Observation", "Inspect current metrics, desired replicas, minimum and maximum limits, and HPA events. If desired replicas increase but Pods remain Pending, investigate node capacity and cluster autoscaling.", "kubectl get hpa -n production\nkubectl describe hpa payment-api -n production\nkubectl top pods -n production\nkubectl get deployment payment-api -n production"),
      section("Scaling Interaction", "HPA changes workload replica count. Cluster autoscaling may add nodes when those replicas cannot fit. These systems have different inputs and delays, so test end-to-end scaling from incoming load to available application capacity."),
      section("Production Autoscaling Practices", "Use realistic resource requests, suitable metric targets, scale stabilization, adequate minimum replicas, and load testing. Monitor scale events and downstream capacity such as database connections, queue throughput, and external API quotas.")
    ],
    exercise: "Configure an HPA for a test Deployment. Generate controlled CPU load, observe replica changes, and explain what happens when the desired replicas exceed available worker capacity."
  },

  "Rolling Updates and Rollbacks": {
    title: "Rolling Updates and Rollbacks",
    description: "Release new application versions safely and recover from unhealthy deployments.",
    sections: [
      section("Rolling Update Mechanics", "A Deployment creates a new ReplicaSet and gradually shifts replicas from the old version to the new version. Readiness determines whether new Pods are available. Strategy settings control how many Pods can be added or unavailable during the rollout."),
      section("Release Preconditions", "Validate image availability, configuration compatibility, resource capacity, readiness probes, database migration safety, and rollback compatibility before deployment. A healthy Pod does not guarantee that the application is functionally correct."),
      section("Controlled Image Update", "Update the Deployment image through a reviewed manifest or controlled patch. Prefer immutable image tags or digests so the release can be identified and reproduced.", "kubectl set image deployment/payment-api payment-api=123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-api:v2 -n production\nkubectl rollout status deployment/payment-api -n production"),
      section("Rollout History", "Deployment revision history records changes to the Pod template. Inspect history and the relevant revision before rollback. Revision history is not a replacement for source control or a complete release record.", "kubectl rollout history deployment/payment-api -n production\nkubectl rollout history deployment/payment-api --revision=2 -n production"),
      section("Rollback Procedure", "Rollback restores a previous Deployment revision. Verify that the previous image and configuration remain available and that database changes are backward compatible. After rollback, verify Pod readiness and application behavior.", "kubectl rollout undo deployment/payment-api -n production\nkubectl rollout status deployment/payment-api -n production\nkubectl get pods -n production -l app=payment-api"),
      section("Paused and Failed Rollouts", "A rollout can stall because new Pods fail readiness, cannot pull images, lack resources, or fail admission policies. Inspect Deployment conditions, ReplicaSets, Pod events, and application logs before deciding whether to pause, fix forward, or roll back."),
      section("Production Release Controls", "Use deployment approvals, health checks, progressive traffic shifting, automated smoke tests, and release observability. For critical systems, consider canary or blue-green delivery rather than relying only on a standard rolling update.")
    ],
    exercise: "Deploy version one of a sample application, update it to a deliberately unhealthy test version, identify the rollout failure, roll back to the previous revision, and verify the healthy version is restored."
  },

  "EKS Cluster Operations": {
    title: "EKS Cluster Operations",
    description: "Manage EKS cluster access, versions, node groups, add-ons, upgrades, and operational readiness.",
    sections: [
      section("Cluster Context and Account Safety", "Before any operation, verify AWS account identity, region, cluster name, and kubectl context. A correct command against the wrong production account can cause a serious incident.", "aws sts get-caller-identity\naws configure list\nkubectl config current-context\naws eks list-clusters --region ap-south-1"),
      section("Cluster Version Lifecycle", "EKS Kubernetes versions have support lifecycles. Plan upgrades by checking version skew, deprecated APIs, add-on compatibility, workload disruption, and node AMI support. Do not upgrade production without a tested compatibility plan."),
      section("Managed Add-ons", "EKS add-ons such as VPC CNI, CoreDNS, and kube-proxy have version compatibility requirements. Review recommended versions and configuration overrides before updating. Validate networking and DNS after an add-on change."),
      section("Node Group Updates", "Managed node-group updates replace or update worker instances according to update settings. Review PodDisruptionBudgets, spare capacity, node selectors, and stateful storage behavior before beginning an update.", "aws eks describe-nodegroup --cluster-name production-eks --nodegroup-name general-workers --region ap-south-1\naws eks update-nodegroup-version --cluster-name production-eks --nodegroup-name general-workers --region ap-south-1"),
      section("Access and Endpoint Operations", "Review public and private endpoint access, allowed CIDRs, IAM identities, access entries, and RBAC. For private endpoint access, ensure operator networks have correct routing and DNS resolution."),
      section("Cluster Health Checks", "Review node readiness, system Pods, workload availability, events, API connectivity, and AWS resource status. Monitor subnet IP capacity, node utilization, failed scheduling, and storage provisioning.", "kubectl get nodes\nkubectl get pods -A\nkubectl get events -A --sort-by=.metadata.creationTimestamp\nkubectl get pvc -A"),
      section("Upgrade and Change Runbook", "Use a staged process: review release notes, test in non-production, back up manifests and critical data, validate add-ons, upgrade control plane, update node groups, verify workloads, and retain a recovery plan. EKS control-plane upgrades are not a substitute for application-level validation.")
    ],
    exercise: "Prepare an EKS upgrade runbook for a test cluster. Record the current version, add-on versions, node groups, deprecated API checks, PodDisruptionBudgets, and post-upgrade validation commands."
  },

  "Troubleshooting": {
    title: "Troubleshooting",
    description: "Use a structured diagnostic process for Kubernetes and EKS failures instead of making random configuration changes.",
    sections: [
      section("Start with Scope and Impact", "Identify affected applications, namespaces, nodes, Availability Zones, and customer impact. Determine whether the issue began after a deployment, node update, configuration change, or infrastructure event. Preserve timestamps and evidence."),
      section("Pending Pods", "Inspect scheduling events, resource requests, node taints, affinity, quota, PVC binding, and subnet IP capacity. Do not immediately increase node count until the actual scheduling constraint is understood.", "kubectl get pods -A --field-selector=status.phase=Pending\nkubectl describe pod <pod-name> -n <namespace>\nkubectl get events -A --sort-by=.metadata.creationTimestamp"),
      section("CrashLoopBackOff and ImagePullBackOff", "CrashLoopBackOff usually indicates repeated container termination. Inspect current and previous logs, exit code, probes, configuration, and resource limits. ImagePullBackOff requires checking image name, tag, registry authentication, network access, and pull permissions.", "kubectl logs <pod-name> -n <namespace> --previous\nkubectl describe pod <pod-name> -n <namespace>\nkubectl get pod <pod-name> -n <namespace> -o jsonpath='{.status.containerStatuses[*].state}'"),
      section("Service and Ingress Failures", "Check Service selectors, EndpointSlices, Pod readiness, target ports, DNS, Ingress controller health, load balancer target health, security groups, and routing. Test each network hop independently."),
      section("Node and CNI Failures", "NotReady nodes, failed Pod sandbox creation, and IP allocation errors may indicate kubelet, runtime, CNI, subnet, ENI, or node pressure problems. Compare affected nodes and inspect system DaemonSets."),
      section("Storage Failures", "PVC Pending, mount errors, and volume attachment conflicts require checking StorageClass, CSI controller and node Pods, topology, access mode, and underlying storage state. Avoid deleting claims or volumes during investigation."),
      section("Recovery and Verification", "Apply the smallest safe corrective change, monitor recovery, and verify user-facing functionality. Capture before-and-after evidence and record the root cause, contributing conditions, and preventive actions.")
    ],
    exercise: "Use a non-production cluster to investigate three controlled failures: an unschedulable Pod, an incorrect Service selector, and a failing readiness probe. For each, record symptoms, evidence, root cause, fix, and verification."
  },

  "Production Hands-on Lab": {
    title: "Production Hands-on Lab",
    description: "Build a production-style EKS application deployment with secure configuration, networking, storage, scaling, and operational validation.",
    sections: [
      section("Lab Architecture and Prerequisites", "Build a test environment with an EKS cluster, worker capacity across Availability Zones, an application image in ECR, a namespace, and a deployment pipeline. Use a non-production AWS account and budget controls."),
      section("Namespace and Workload Identity", "Create a dedicated application namespace and ServiceAccount. Apply least-privilege RBAC and workload IAM permissions where required. Keep application identity separate from human operator access."),
      section("Application Deployment", "Deploy the application with multiple replicas, immutable image reference, resource requests and limits, readiness and liveness probes, and a controlled rolling update strategy. Store manifests in version control."),
      section("Configuration and Secrets", "Create non-sensitive configuration using ConfigMaps. Use a secure secret-management method for credentials. Validate that sensitive values are not committed to Git, printed in build logs, or exposed through unnecessary environment inspection."),
      section("Service and External Access", "Expose the application internally with a ClusterIP Service. If external access is required, configure an Ingress through the AWS Load Balancer Controller with appropriate scheme, security controls, DNS, and TLS."),
      section("Storage and Persistence", "If the application needs persistent data, configure an EBS CSI-backed PVC with suitable access mode and StorageClass. Validate data persistence across Pod recreation and document backup and restore requirements."),
      section("Autoscaling and Resilience", "Configure an HPA using a supported metric, validate node capacity, and test Pod replacement. Consider PodDisruptionBudgets and topology spread to reduce the impact of voluntary disruptions and node failures."),
      section("Observability and Incident Validation", "Collect application logs, Kubernetes events, node metrics, and relevant EKS control-plane logs. Create alerts for unavailable replicas, repeated restarts, resource pressure, and failed scheduling."),
      section("Release, Rollback, and Evidence", "Deploy a new application version, verify rollout health, introduce a controlled test failure, and perform a rollback. Capture commands, manifests, events, and validation results as a repeatable operational runbook."),
      section("Production Readiness Review", "Review IAM, RBAC, network exposure, encryption, image scanning, resource sizing, storage recovery, availability, monitoring, cost, and ownership. A production-ready cluster requires documented operational responsibility, not just successful Pod creation.")
    ],
    exercise: "Complete the end-to-end EKS lab: deploy a multi-replica application from ECR, configure RBAC and secure configuration, expose it through a Service and optional Ingress, add probes and resource controls, configure HPA, test Pod recovery, perform a rolling update and rollback, and submit a production-readiness report."
  }
};
