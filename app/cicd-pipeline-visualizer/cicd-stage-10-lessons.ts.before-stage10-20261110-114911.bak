const makeLesson = (
  overview: string,
  purpose: string,
  architecture: string,
  workflow: string[],
  example: string,
  commands: string[],
  configuration: string,
  failures: string[],
  recovery: string[],
  bestPractices: string[],
  exercise: string
) => ({
  overview,
  purpose,
  architecture,
  workflow,
  example,
  commands,
  configuration,
  failures,
  recovery,
  bestPractices,
  exercise,
});

export const stageTenLessonOverrides = {
  "10|Kubernetes Fundamentals": makeLesson(
    "Kubernetes is a container orchestration platform that manages containerized applications across a cluster of machines. It automates scheduling, scaling, service discovery, health monitoring, and application recovery.",
    "Instead of manually starting containers on individual servers, teams declare the desired application state. Kubernetes continuously works to make the actual cluster state match that declaration.",
    "A Kubernetes cluster contains a control plane and worker nodes. The API server accepts requests, etcd stores cluster state, the scheduler selects nodes, and kubelets run workloads through a container runtime. Controllers continuously reconcile resources.",
    ["Package the Spring Boot payment service as a container image.", "Create Kubernetes Deployment and Service manifests.", "Submit manifests to the API server.", "Allow the scheduler to place pods on worker nodes.", "Expose the application through a Service or Ingress.", "Monitor health and desired versus actual replicas."],
    "A payment-service Deployment requests three replicas. Kubernetes schedules three pods, monitors them, and replaces a failed pod to maintain the desired replica count.",
    ["kubectl version --client", "kubectl cluster-info", "kubectl get nodes", "kubectl get pods -A", "kubectl apply -f payment-deployment.yaml", "kubectl get deployment payment-service"],
    "Kubernetes manifests are declarative YAML files. A Deployment specifies pod templates and replica count, while a Service provides a stable network endpoint for matching pods.",
    ["kubectl cannot connect to the API server.", "Pods remain Pending because resources are unavailable.", "Pods enter CrashLoopBackOff.", "Service selectors do not match pod labels."],
    ["Check kubeconfig and API endpoint connectivity.", "Inspect pod events and node capacity.", "Read container logs and verify application startup.", "Compare Service selectors with pod labels."],
    ["Store manifests in version control.", "Use readiness and liveness probes.", "Define CPU and memory requests and limits.", "Use rolling updates and controlled rollbacks.", "Monitor cluster and application health."],
    "Deploy a three-replica payment-service application and verify its pods, Deployment status, Service endpoint, and recovery behavior."
  ),

  "10|Kubernetes Architecture": makeLesson(
    "Kubernetes architecture separates cluster management from application execution. The control plane makes scheduling and state decisions, while worker nodes execute application pods.",
    "Understanding the architecture helps engineers identify whether a failure belongs to API access, scheduling, node execution, networking, or storage.",
    "The API server is the main entry point. etcd stores cluster data. Scheduler assigns unscheduled pods to nodes. Controller manager runs reconciliation controllers. Worker nodes contain kubelet, a container runtime, and networking components.",
    ["Send a resource request using kubectl.", "API server authenticates, authorizes, and validates the request.", "The desired state is stored in etcd.", "Controllers observe the new resource.", "Scheduler assigns pods to eligible nodes.", "Kubelet starts containers and reports status."],
    "When a developer applies a payment-service Deployment, the API server stores the desired replica count and controllers create ReplicaSets and pods.",
    ["kubectl cluster-info", "kubectl get componentstatuses", "kubectl get nodes -o wide", "kubectl get pods -n kube-system", "kubectl get events -A --sort-by=.metadata.creationTimestamp"],
    "Control-plane components may be managed by the Kubernetes provider. In EKS, AWS operates the managed control plane while customers manage worker capacity, workloads, and cluster configuration.",
    ["API server is unavailable.", "Scheduler cannot place pods.", "Worker node is NotReady.", "Control-plane and node versions are incompatible."],
    ["Check API endpoint health and access.", "Inspect scheduler and controller events where accessible.", "Check node conditions and kubelet health.", "Review cluster version compatibility and recent changes."],
    ["Understand control-plane and worker responsibilities.", "Avoid direct changes to managed control-plane components.", "Monitor node conditions and Kubernetes events.", "Maintain supported version compatibility."],
    "Draw the request flow from kubectl to API server, etcd, scheduler, kubelet, and the running payment-service container."
  ),

  "10|EKS Architecture": makeLesson(
    "Amazon Elastic Kubernetes Service (EKS) is AWS's managed Kubernetes service. AWS operates the Kubernetes control plane, while customers configure worker nodes, networking, identity, storage, and application workloads.",
    "EKS reduces the operational burden of maintaining control-plane servers and integrates Kubernetes with AWS networking, IAM, load balancing, storage, and monitoring services.",
    "An EKS cluster has an AWS-managed control plane and customer-managed data-plane capacity. Worker capacity can use managed node groups, self-managed nodes, or Fargate profiles. VPC networking connects nodes and pods.",
    ["Create or select an AWS VPC with appropriate subnets.", "Create an EKS cluster and control-plane endpoint.", "Configure node groups or Fargate profiles.", "Configure IAM access and the kubeconfig context.", "Deploy application workloads.", "Integrate load balancing, storage, and monitoring."],
    "A Spring Boot payment service runs on an EKS managed node group. The cluster control plane is managed by AWS, while the team manages Deployment manifests, resource limits, and application releases.",
    ["aws eks list-clusters --region ap-south-1", "aws eks describe-cluster --name devmavox-eks --region ap-south-1", "aws eks update-kubeconfig --region ap-south-1 --name devmavox-eks", "kubectl get nodes -o wide", "kubectl get pods -A"],
    "Cluster configuration includes VPC, subnet selection, endpoint access, IAM roles, Kubernetes version, node capacity, and add-ons. Replace example cluster names and regions with your environment values.",
    ["Unable to connect after creating the cluster.", "Node group remains unhealthy.", "IAM authentication succeeds but Kubernetes authorization fails.", "Nodes cannot join because of subnet or security-group configuration."],
    ["Inspect EKS cluster and node-group status.", "Verify AWS identity and kubeconfig context.", "Check cluster endpoint access and VPC networking.", "Review node role, access entries, and required permissions."],
    ["Use private subnets for worker nodes where appropriate.", "Enable control-plane logging according to policy.", "Use managed node groups where suitable.", "Plan cluster upgrades and add-on compatibility.", "Use IAM roles rather than static credentials."],
    "Connect to an EKS cluster, inspect its control plane and node groups, and deploy the payment-service workload."
  ),

  "10|Control Plane Components": makeLesson(
    "The Kubernetes control plane manages cluster state and coordinates workload placement. Its main components are API server, etcd, scheduler, and controller manager.",
    "When a Deployment is created or scaled, control-plane components process the request, store desired state, schedule pods, and continuously reconcile actual state.",
    "The API server exposes the Kubernetes API. etcd stores cluster data. The scheduler selects nodes for pending pods. Controller manager runs controllers such as Deployment, Node, and ReplicaSet controllers. In EKS, AWS manages these control-plane components.",
    ["Submit a Deployment manifest.", "API server validates and accepts the request.", "Desired state is persisted.", "Deployment controller creates a ReplicaSet.", "ReplicaSet controller creates pods.", "Scheduler assigns eligible nodes and kubelets start containers."],
    "Changing payment-service replicas from two to four causes controllers to create additional pods and the scheduler to place them on available nodes.",
    ["kubectl get deployments", "kubectl get replicasets", "kubectl get pods -o wide", "kubectl get events -A --sort-by=.metadata.creationTimestamp", "aws eks describe-cluster --name devmavox-eks --region ap-south-1"],
    "Customers cannot directly administer the managed EKS control-plane hosts. They interact through Kubernetes APIs and supported EKS configuration and logging features.",
    ["Deployment changes are not reflected in pods.", "API requests time out.", "Pods remain unscheduled.", "Controllers repeatedly report reconciliation errors."],
    ["Inspect API response and resource events.", "Compare desired and actual replica counts.", "Check available node resources and scheduling constraints.", "Review EKS control-plane logs when enabled."],
    ["Understand which component owns each action.", "Use supported APIs rather than modifying managed control-plane hosts.", "Monitor API availability and scheduling events.", "Keep resource specifications valid."],
    "Trace how a change to payment-service replica count moves through the Deployment controller, ReplicaSet controller, scheduler, and kubelet."
  ),

  "10|Worker Nodes": makeLesson(
    "Worker nodes are the compute machines where Kubernetes schedules and runs application pods. In EKS, worker capacity commonly comes from managed node groups, self-managed nodes, or Fargate.",
    "A cluster needs healthy worker capacity to run application containers. Node health, available resources, networking, and runtime configuration directly affect workload availability.",
    "Each traditional worker node runs kubelet, a container runtime, and networking components. The node registers with the API server and reports conditions, capacity, and pod status.",
    ["Provision worker nodes in suitable subnets.", "Allow nodes to authenticate and join the cluster.", "Verify node readiness.", "Schedule payment-service pods.", "Monitor CPU, memory, disk, and network pressure.", "Replace or scale unhealthy capacity."],
    "A managed node group provides three EC2 worker nodes. Kubernetes spreads payment-service replicas across the available nodes according to scheduling rules.",
    ["kubectl get nodes -o wide", "kubectl describe node NODE_NAME", "kubectl get pods -A -o wide", "aws eks list-nodegroups --cluster-name devmavox-eks --region ap-south-1", "aws eks describe-nodegroup --cluster-name devmavox-eks --nodegroup-name workers --region ap-south-1"],
    "Node groups require appropriate instance types, subnets, security groups, IAM node roles, and compatible AMIs. Use actual node names and node-group names in commands.",
    ["Node remains NotReady.", "Node does not join the cluster.", "DiskPressure or MemoryPressure appears.", "Pods cannot be scheduled due to insufficient capacity."],
    ["Inspect node conditions and events.", "Check node-group health and EC2 instance status.", "Verify IAM permissions, network routes, and cluster access.", "Scale or replace unhealthy nodes after checking workload disruption."],
    ["Use multiple nodes and appropriate availability zones.", "Set resource requests and limits.", "Monitor node pressure and capacity.", "Plan safe node replacement and upgrades."],
    "Inspect all worker nodes in an EKS cluster and identify their instance type, readiness, pod count, and resource pressure."
  ),

  "10|API Server and etcd": makeLesson(
    "The Kubernetes API server is the central interface for cluster operations. etcd is the consistent key-value store that holds Kubernetes cluster state and configuration.",
    "Every kubectl operation communicates with the API server. Reliable API access and durable cluster state are essential for deployments, scheduling, and recovery.",
    "The API server authenticates and authorizes requests, validates resources, and coordinates persistence. etcd stores objects such as Deployments, Services, Secrets, and cluster metadata. In EKS, AWS manages the control-plane etcd service.",
    ["Configure kubectl with the correct cluster context.", "Send a request to the API server.", "Authenticate and authorize the caller.", "Validate the requested Kubernetes object.", "Persist accepted state through the control-plane storage layer.", "Return resource status to the client."],
    "A developer applies a payment-service Deployment YAML. The API server validates the manifest and stores the accepted desired state, after which controllers reconcile the workload.",
    ["kubectl config current-context", "kubectl cluster-info", "kubectl get --raw=/readyz", "kubectl get --raw=/livez", "kubectl get deployments -A"],
    "Do not attempt direct etcd administration in an EKS managed control plane. Use supported Kubernetes APIs, AWS control-plane logging, and managed service recovery procedures.",
    ["The API server endpoint cannot be reached.", "kubectl reports unauthorized or forbidden.", "API requests time out.", "Resource changes are rejected by validation."],
    ["Verify kubeconfig endpoint and context.", "Check IAM authentication and Kubernetes authorization.", "Check network access to the cluster endpoint.", "Read API validation errors and correct the manifest."],
    ["Protect API access with least-privilege permissions.", "Enable suitable EKS control-plane audit logs.", "Avoid exposing cluster endpoints unnecessarily.", "Use backups and provider-supported recovery practices."],
    "Use kubectl to inspect API readiness and explain why application developers should interact with etcd through the Kubernetes API rather than directly."
  ),

  "10|Scheduler and Kubelet": makeLesson(
    "The scheduler assigns pending pods to suitable worker nodes. Kubelet runs on each node and ensures the containers described by assigned pod specifications are running.",
    "Scheduling determines where workloads run, while kubelet turns the assigned pod specification into actual containers and reports their status to the control plane.",
    "The scheduler evaluates resource requests, node selectors, affinity, taints, tolerations, and other constraints. Kubelet communicates with the API server and container runtime to create and monitor pod containers.",
    ["Create a pod through a Deployment.", "Scheduler evaluates eligible nodes.", "Scheduler binds the pod to a selected node.", "Kubelet observes the assigned pod.", "Kubelet asks the container runtime to start containers.", "Kubelet reports readiness and container status."],
    "A payment-service pod requests 500m CPU and 512Mi memory. The scheduler chooses a node with sufficient allocatable resources, and kubelet starts the container.",
    ["kubectl get pods -o wide", "kubectl describe pod POD_NAME", "kubectl describe node NODE_NAME", "kubectl get events --sort-by=.metadata.creationTimestamp", "kubectl get pods -n kube-system"],
    "Use requests to influence scheduling and limits to constrain resource consumption. Node affinity, taints, and tolerations should be designed intentionally.",
    ["Pod remains Pending with FailedScheduling.", "Container does not start on the selected node.", "Kubelet reports image or runtime errors.", "Pod is assigned but never becomes Ready."],
    ["Inspect scheduling events and resource requests.", "Check node labels, taints, and available capacity.", "Inspect kubelet-related node events and container runtime status through approved access.", "Check image access, volumes, and container logs."],
    ["Set realistic resource requests.", "Avoid unnecessary node constraints.", "Monitor kubelet and node health.", "Use readiness probes to control traffic."],
    "Create a pod with CPU and memory requests, inspect which node receives it, and explain the scheduler and kubelet responsibilities."
  ),

  "10|Pods": makeLesson(
    "A Pod is the smallest deployable unit in Kubernetes. It contains one or more closely related containers that share networking and can share mounted storage.",
    "Applications run inside pods rather than being scheduled as individual standalone containers. Deployments manage pod replicas and replace pods when required.",
    "A pod receives a cluster network identity and contains containers with shared localhost networking. Pod specifications define images, ports, environment variables, volumes, security context, and health probes.",
    ["Build and publish the payment-service image.", "Define a pod template in a Deployment.", "Apply the Deployment manifest.", "Inspect created pods and their node placement.", "Read logs and pod events.", "Test readiness and application connectivity."],
    "A payment-service pod runs one Spring Boot application container. It exposes port 8080 and uses a readiness probe to determine when it can receive traffic.",
    ["kubectl get pods -n default -o wide", "kubectl describe pod POD_NAME", "kubectl logs POD_NAME", "kubectl logs POD_NAME --previous", "kubectl exec -it POD_NAME -- sh", "kubectl get pod POD_NAME -o yaml"],
    "A pod manifest defines apiVersion, kind, metadata, and spec. In production, use Deployments for stateless application replicas instead of manually managing individual pods.",
    ["Pending due to scheduling constraints.", "ImagePullBackOff due to image access problems.", "CrashLoopBackOff due to application startup failure.", "Container is Running but pod is not Ready."],
    ["Inspect describe output and events.", "Check image URI, registry access, and pull permissions.", "Review current and previous container logs.", "Validate environment variables, probes, and application dependencies."],
    ["Use Deployments for replicated applications.", "Configure health probes.", "Avoid storing persistent application data in the writable container layer.", "Set resource requests and limits.", "Use non-root containers where possible."],
    "Deploy a payment-service pod, inspect its status and logs, and deliberately diagnose a failed readiness probe."
  ),

  "10|Deployments and ReplicaSets": makeLesson(
    "A Deployment manages stateless application rollouts and desired replica counts. It creates and manages ReplicaSets, which maintain the requested number of matching pods.",
    "Deployments provide controlled updates, scaling, rollout status, and rollback capabilities without manually deleting and recreating application pods.",
    "The Deployment controller creates a ReplicaSet for a pod template. The ReplicaSet controller maintains the replica count. When the pod template changes, a new ReplicaSet is created and the Deployment performs the configured rollout strategy.",
    ["Create a Deployment manifest with image and replica count.", "Apply the manifest to the cluster.", "Observe the ReplicaSet and pods.", "Change the image to a new release.", "Monitor rollout progress.", "Rollback if the release fails."],
    "The payment-service Deployment runs three replicas. A new image version is rolled out gradually, and the previous ReplicaSet remains available for a possible rollback.",
    ["kubectl apply -f payment-deployment.yaml", "kubectl get deployments", "kubectl get replicasets", "kubectl rollout status deployment/payment-service", "kubectl set image deployment/payment-service payment-service=123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:1.4.1", "kubectl rollout history deployment/payment-service", "kubectl rollout undo deployment/payment-service"],
    "Set replicas, selector, pod-template labels, image, rollout strategy, and revision history appropriately. The Deployment selector must match labels in its pod template.",
    ["Deployment reports unavailable replicas.", "Rollout gets stuck waiting for readiness.", "Selector does not match pod labels.", "New image causes application startup failures."],
    ["Inspect Deployment conditions and ReplicaSets.", "Read pod events and application logs.", "Verify image and probe configuration.", "Rollback to the last healthy revision when required."],
    ["Use rolling updates for stateless workloads.", "Configure readiness probes and rollout limits.", "Use immutable image tags or digests.", "Keep rollout history according to operational needs."],
    "Deploy three payment-service replicas, update the container image, monitor the rollout, and perform a controlled rollback."
  ),

  "10|Services and Service Discovery": makeLesson(
    "A Kubernetes Service provides a stable network endpoint for a changing group of pods. It selects pods using labels and supports communication between application components.",
    "Pod IP addresses can change during restarts and deployments. Services provide a stable DNS name and virtual IP so clients do not need to track individual pod addresses.",
    "A ClusterIP Service routes traffic to matching pod endpoints. Other common types include NodePort and LoadBalancer. CoreDNS provides service-name resolution inside the cluster.",
    ["Label payment-service pods consistently.", "Create a Service with a matching selector.", "Verify the Service ClusterIP and endpoints.", "Resolve its DNS name from another pod.", "Send a test request to the application.", "Inspect endpoint changes during pod replacement."],
    "The payment API Service exposes port 80 and forwards traffic to payment-service pods listening on targetPort 8080.",
    ["kubectl get services", "kubectl describe service payment-service", "kubectl get endpoints payment-service", "kubectl get endpointslices", "kubectl run dns-test --image=busybox:1.36 --restart=Never --command -- sleep 3600", "kubectl exec dns-test -- nslookup payment-service", "kubectl delete pod dns-test"],
    "Service selectors must match pod labels. Define port, targetPort, protocol, and type carefully. A LoadBalancer Service can provision an external AWS load balancer depending on the installed integration.",
    ["Service has no endpoints.", "DNS lookup fails.", "Service forwards to the wrong container port.", "Traffic reaches only unhealthy pods because readiness is incorrect."],
    ["Compare Service selectors with pod labels.", "Inspect EndpointSlices and pod readiness.", "Check CoreDNS health and DNS configuration.", "Validate targetPort against the application listening port."],
    ["Use stable Service names for internal communication.", "Avoid hardcoding pod IP addresses.", "Use readiness probes to manage eligible endpoints.", "Restrict externally exposed Services."],
    "Create an internal payment-service Service and verify that another pod can resolve its DNS name and reach port 80."
  ),

  "10|ConfigMaps and Secrets": makeLesson(
    "ConfigMaps store non-confidential configuration, while Kubernetes Secrets are intended for sensitive values such as passwords, tokens, and certificates.",
    "Separating configuration from container images allows the same payment-service image to run in development, staging, and production with environment-specific settings.",
    "ConfigMaps and Secrets can be exposed to pods as environment variables or mounted files. Kubernetes stores these objects in the API data store; Secret data is base64 encoded, not automatically encrypted merely because it is encoded.",
    ["Create a ConfigMap for non-sensitive application settings.", "Create a Secret using a secure process.", "Reference both objects from the Deployment.", "Roll out the updated pod template.", "Verify the application receives the expected configuration.", "Rotate sensitive values when required."],
    "The payment-service uses a ConfigMap for application profile and a Secret for a database password. The image contains neither environment-specific value.",
    ["kubectl create configmap payment-config --from-literal=SPRING_PROFILES_ACTIVE=production", "kubectl create secret generic payment-db --from-literal=DB_PASSWORD='REPLACE_WITH_SECURE_VALUE'", "kubectl describe configmap payment-config", "kubectl describe secret payment-db", "kubectl get pods"],
    "Do not commit real secrets into Git or terminal history. Use an approved secret manager integration, encryption at rest, and least-privilege RBAC. Environment variables from Secrets may require pod recreation to consume updates.",
    ["Pod reports missing ConfigMap or Secret.", "Environment variable is empty or incorrect.", "Application continues using an old secret value.", "Secret is exposed in logs or source control."],
    ["Verify object names and namespace.", "Inspect Deployment references and pod events.", "Restart or roll out pods when required to load changed values.", "Rotate exposed credentials and review access."],
    ["Use ConfigMaps only for non-sensitive data.", "Restrict Secret access with RBAC.", "Enable encryption at rest and consider external secret management.", "Never print secret values in diagnostic output."],
    "Create a payment-service ConfigMap and Secret, reference them in a Deployment, and explain how you would rotate the database credential safely."
  ),

  "10|Health Probes": makeLesson(
    "Kubernetes health probes allow kubelet to evaluate container health. Liveness probes detect containers that should be restarted, readiness probes control traffic eligibility, and startup probes protect slow-starting applications.",
    "Correct probes prevent traffic from reaching an application before it is ready and help recover from processes that become unhealthy after startup.",
    "Kubelet executes configured HTTP, TCP, or command checks. A failed liveness probe can restart a container. A failed readiness probe removes the pod from ready Service endpoints. Startup probes delay other probe checks until startup succeeds.",
    ["Identify reliable health endpoints in the Spring Boot application.", "Configure a startup probe for slow initialization.", "Configure readiness to represent traffic readiness.", "Configure liveness to detect unrecoverable process health.", "Deploy and inspect probe status.", "Test behavior during startup and failure."],
    "The payment-service exposes /actuator/health/readiness and /actuator/health/liveness. Kubernetes uses these endpoints to decide when to send traffic and when to restart the container.",
    ["kubectl describe pod POD_NAME", "kubectl get pods -w", "kubectl get deployment payment-service -o yaml", "kubectl logs POD_NAME"],
    "Set initialDelaySeconds, periodSeconds, timeoutSeconds, failureThreshold, and successThreshold based on real application startup and response behavior. Do not make liveness depend on a temporary external database outage unless restarting the process is appropriate.",
    ["Readiness probe fails continuously.", "Liveness probe causes repeated restarts.", "Startup probe threshold is too short.", "Health endpoint returns an authentication error."],
    ["Check probe path, port, protocol, and response status.", "Compare configured thresholds with actual startup time.", "Review application health endpoint behavior.", "Separate readiness checks from liveness checks."],
    ["Use startup probes for slow applications.", "Keep liveness checks lightweight.", "Do not report ready before critical initialization completes.", "Test probe behavior during real deployment conditions."],
    "Configure startup, readiness, and liveness probes for a Spring Boot payment-service and verify the resulting pod conditions."
  ),

  "10|Requests and Limits": makeLesson(
    "Kubernetes resource requests describe the minimum CPU and memory capacity a container needs for scheduling. Limits define maximum resource consumption enforced by the container runtime and kernel mechanisms.",
    "Correct resource values improve scheduling, reduce noisy-neighbor problems, and protect nodes from uncontrolled application resource consumption.",
    "The scheduler considers requests when selecting nodes. CPU limits constrain CPU usage through throttling. Memory limits can cause a container to be terminated with an OOMKilled status if it exceeds its limit.",
    ["Measure application CPU and memory usage.", "Define realistic container requests.", "Set appropriate CPU and memory limits.", "Deploy the updated workload.", "Inspect pod resource configuration.", "Monitor throttling, memory pressure, and restarts."],
    "The payment-service container requests 250m CPU and 512Mi memory, with a CPU limit of 1 core and memory limit of 1Gi as an initial example to be validated against real workload measurements.",
    ["kubectl describe pod POD_NAME", "kubectl top pods", "kubectl top nodes", "kubectl get pod POD_NAME -o yaml", "kubectl get events --sort-by=.metadata.creationTimestamp"],
    "CPU quantities such as 500m represent half a CPU core. Memory quantities such as 512Mi use binary units. Values must be tuned using load tests and production observations.",
    ["Pending pods due to insufficient requested resources.", "OOMKilled containers.", "High CPU throttling.", "Node memory pressure caused by overcommitment."],
    ["Inspect requests, limits, and node allocatable capacity.", "Review previous container termination reason.", "Measure actual resource usage under representative load.", "Adjust requests and limits based on evidence."],
    ["Set requests and limits for application containers.", "Use metrics to tune values.", "Avoid arbitrarily large requests.", "Load-test before production capacity changes."],
    "Configure CPU and memory requests and limits for payment-service, then identify the difference between Pending and OOMKilled symptoms."
  ),

  "10|Namespaces and RBAC": makeLesson(
    "Namespaces logically separate Kubernetes resources within a cluster. Role-Based Access Control (RBAC) controls which users, groups, and service accounts can perform actions on resources.",
    "Namespaces support environment and team separation, while RBAC prevents users and automation from accessing resources beyond their responsibilities.",
    "A Namespace scopes namespaced resources. Roles and RoleBindings grant permissions within a namespace. ClusterRoles and ClusterRoleBindings grant cluster-wide or reusable permissions. Authentication identifies a principal; RBAC authorizes API actions.",
    ["Create a namespace for payment workloads.", "Create a service account for an automation component.", "Define the minimum required Role.", "Bind the Role to the service account.", "Inspect effective permissions.", "Test allowed and denied operations."],
    "A deployment automation service account can update Deployments in the payments namespace but cannot read Secrets or modify resources in unrelated namespaces.",
    ["kubectl create namespace payments", "kubectl get namespaces", "kubectl create serviceaccount payment-deployer -n payments", "kubectl get roles,rolebindings -n payments", "kubectl auth can-i get pods -n payments --as=system:serviceaccount:payments:payment-deployer"],
    "Use explicit apiGroups, resources, verbs, and namespace scope. Avoid granting cluster-admin to application service accounts or CI pipelines.",
    ["Forbidden errors during deployment.", "RoleBinding references the wrong service account.", "Automation can access more resources than required.", "Namespace mismatch causes resource lookup failures."],
    ["Check the caller identity and namespace.", "Inspect Role, ClusterRole, and binding subjects.", "Use kubectl auth can-i to test permissions.", "Grant only the missing required verb and resource."],
    ["Follow least privilege.", "Use dedicated service accounts.", "Separate namespaces according to ownership and policy.", "Review RBAC changes and audit access."],
    "Create a payments namespace and a read-only service account role, then verify which Kubernetes actions are allowed and denied."
  ),

  "10|Ingress and Load Balancing": makeLesson(
    "Ingress defines HTTP and HTTPS routing rules for services inside a Kubernetes cluster. An Ingress controller or compatible gateway implementation processes those rules and connects external traffic to application Services.",
    "Ingress provides a controlled entry point for application traffic, including host-based routing, path routing, TLS termination, and integration with cloud load balancers.",
    "An Ingress resource describes routing intent. A controller such as the AWS Load Balancer Controller watches resources and provisions or configures AWS load-balancing infrastructure according to its configuration.",
    ["Install and configure a supported Ingress controller.", "Create a Kubernetes Service for payment-service.", "Define host and path routing rules.", "Configure DNS and TLS where required.", "Apply the Ingress resource.", "Test the external endpoint and backend routing."],
    "Requests to payments.example.com/api are routed through an AWS Application Load Balancer to the payment-service Service and its ready pods.",
    ["kubectl get ingress -A", "kubectl describe ingress payment-ingress", "kubectl get services -n payments", "kubectl get pods -n kube-system", "kubectl get events -A --sort-by=.metadata.creationTimestamp"],
    "Ingress behavior depends on the installed controller and its annotations or Gateway API support. In EKS, verify controller IAM permissions, subnet discovery, security groups, target type, and health-check configuration.",
    ["Ingress has no address.", "Load balancer provisioning fails.", "Target groups show unhealthy targets.", "DNS resolves but requests return 404 or 502."],
    ["Check controller pods and logs.", "Inspect Ingress events and controller permissions.", "Verify subnet tags, security groups, and target health.", "Check Service endpoints, health-check path, and DNS records."],
    ["Use HTTPS and managed certificates.", "Restrict public exposure to required services.", "Use health checks that reflect application readiness.", "Keep controller versions and configuration supported."],
    "Expose payment-service through an EKS Ingress implementation and trace a request from DNS to load balancer, Service, and pod."
  ),

  "10|Networking and CNI": makeLesson(
    "Kubernetes networking connects pods, Services, nodes, and external systems. In Amazon EKS, the Amazon VPC CNI commonly assigns pod IP addresses from VPC networking resources.",
    "Correct networking is essential for pod-to-pod communication, service discovery, external access, and communication with AWS resources.",
    "The CNI plugin configures pod network interfaces. The VPC CNI allocates VPC addresses to pods based on available subnet and ENI capacity. Kubernetes Services provide virtual service addresses, while network policies or security controls restrict traffic.",
    ["Inspect node and pod IP addresses.", "Verify the VPC CNI add-on health.", "Check subnet IP availability.", "Test pod-to-pod and Service communication.", "Inspect routes, security groups, and network policies.", "Monitor IP allocation during scale-out."],
    "When payment-service scales from three to twenty pods, the VPC CNI must have sufficient IP capacity in the worker subnets for new pod network interfaces.",
    ["kubectl get pods -o wide", "kubectl get nodes -o wide", "kubectl get pods -n kube-system", "kubectl describe daemonset aws-node -n kube-system", "aws eks describe-addon --cluster-name devmavox-eks --addon-name vpc-cni --region ap-south-1", "kubectl get events -A --sort-by=.metadata.creationTimestamp"],
    "EKS networking depends on VPC CIDR planning, subnet sizes, ENI limits, CNI configuration, security groups, routes, and DNS. Use supported EKS add-on management for CNI updates.",
    ["FailedCreatePodSandBox.", "Pods cannot obtain IP addresses.", "Pod-to-pod traffic times out.", "Insufficient subnet IP capacity.", "VPC CNI daemon pods are unhealthy."],
    ["Inspect aws-node pods and logs.", "Check free subnet addresses and ENI capacity.", "Review security groups, route tables, and network policies.", "Validate CNI version and configuration."],
    ["Plan sufficient pod IP capacity.", "Spread nodes across appropriate subnets and availability zones.", "Monitor CNI health and subnet utilization.", "Test network changes before production rollout."],
    "Inspect the VPC CNI on an EKS cluster and diagnose a scenario where new payment-service pods cannot obtain IP addresses."
  ),

  "10|Persistent Storage": makeLesson(
    "Kubernetes persistent storage allows application data to survive pod replacement. PersistentVolumes represent storage resources, PersistentVolumeClaims request storage, and StorageClasses define dynamic provisioning behavior.",
    "Container filesystems are temporary. Databases and stateful applications need storage that remains available across pod restarts and rescheduling.",
    "A PVC requests storage from a StorageClass. A provisioner creates or selects a PersistentVolume and binds it to the claim. In EKS, the EBS CSI driver can provision Amazon EBS volumes for supported workloads.",
    ["Install or verify the required CSI driver.", "Create a StorageClass or use an approved one.", "Create a PersistentVolumeClaim.", "Mount the claim in the workload.", "Write and verify test data.", "Test pod replacement and storage reattachment."],
    "A payment database uses a PVC backed by an EBS volume. When its pod is rescheduled to a compatible node, the volume can be attached again subject to availability-zone and access-mode constraints.",
    ["kubectl get storageclass", "kubectl get pvc -A", "kubectl get pv", "kubectl describe pvc payment-data", "kubectl get pods -n payments", "kubectl describe pod POD_NAME"],
    "Select volume size, access mode, filesystem, StorageClass, reclaim policy, and availability-zone behavior carefully. EBS volumes are typically zonal block storage and do not behave like shared multi-node filesystems.",
    ["PVC remains Pending.", "EBS volume cannot attach to the selected node.", "CSI driver is unhealthy.", "Data is lost because the wrong reclaim policy was used."],
    ["Inspect PVC events and StorageClass configuration.", "Verify CSI controller and node plugin health.", "Check volume availability zone and attachment limits.", "Review reclaim policy and backup recovery options."],
    ["Use persistent storage for stateful data.", "Back up important data and test restores.", "Understand access modes and zone constraints.", "Use suitable reclaim policies and encryption."],
    "Create an EBS-backed PVC for a sample stateful payment component and verify that data remains after pod replacement."
  ),

  "10|Horizontal Pod Autoscaling": makeLesson(
    "Horizontal Pod Autoscaling (HPA) automatically adjusts the number of pod replicas based on observed metrics such as CPU or memory utilization.",
    "HPA helps an application respond to changing demand without requiring operators to manually change replica counts for every traffic increase.",
    "The HPA controller periodically reads metrics from the Kubernetes metrics API and compares current usage with target values. It updates the target Deployment or ReplicaSet replica count within configured minimum and maximum limits.",
    ["Install and verify a metrics provider.", "Set CPU and memory requests on containers.", "Create an HPA for payment-service.", "Generate representative workload.", "Observe metric values and replica changes.", "Verify scale-down behavior after load decreases."],
    "The payment-service HPA maintains between two and ten replicas and targets average CPU utilization of 60 percent, provided the metrics provider reports usable data.",
    ["kubectl top pods", "kubectl top nodes", "kubectl autoscale deployment payment-service --cpu-percent=60 --min=2 --max=10", "kubectl get hpa", "kubectl describe hpa payment-service", "kubectl get deployment payment-service -w"],
    "CPU utilization targets are calculated relative to requested CPU. HPA requires resource requests for utilization-based scaling. Production configurations should also consider stabilization windows and scaling behavior.",
    ["HPA displays unknown metrics.", "Replicas do not increase under load.", "Pods cannot schedule after scaling.", "Scaling oscillates rapidly."],
    ["Check metrics-server or the configured metrics adapter.", "Verify resource requests and HPA target references.", "Inspect HPA events and node capacity.", "Tune thresholds and stabilization behavior."],
    ["Load-test scaling policies.", "Set realistic minimum and maximum replicas.", "Ensure cluster capacity can support scale-out.", "Use custom metrics when CPU alone does not represent demand."],
    "Configure an HPA for payment-service, generate test load, and observe how Kubernetes adjusts replicas."
  ),

  "10|Rolling Updates and Rollbacks": makeLesson(
    "Rolling updates replace old application pods with new pods gradually. Rollbacks restore a previous Deployment revision when the new release causes failures.",
    "Controlled releases reduce downtime and provide a recovery path when a new payment-service version fails health checks or introduces unexpected behavior.",
    "Deployment rollout strategy controls maxSurge and maxUnavailable. Kubernetes creates pods from the new ReplicaSet, waits for readiness, and scales down old replicas as the rollout progresses.",
    ["Publish a new immutable application image.", "Update the Deployment image reference.", "Monitor rollout status and available replicas.", "Run smoke tests against the updated application.", "Rollback if health or business checks fail.", "Record release and rollback evidence."],
    "Version 1.4.1 of payment-service is deployed gradually. If readiness checks fail, the operator restores the last healthy Deployment revision.",
    ["kubectl rollout status deployment/payment-service", "kubectl rollout history deployment/payment-service", "kubectl set image deployment/payment-service payment-service=123456789012.dkr.ecr.ap-south-1.amazonaws.com/payment-service:1.4.1", "kubectl rollout undo deployment/payment-service", "kubectl rollout status deployment/payment-service"],
    "Use a rollingUpdate strategy with deliberate maxSurge and maxUnavailable values. Keep enough capacity for temporary overlap and use readiness probes to prevent premature traffic routing.",
    ["Rollout remains stuck.", "New pods fail readiness checks.", "Insufficient cluster capacity prevents surge pods.", "Rollback does not restore an external database schema change."],
    ["Inspect rollout status and Deployment conditions.", "Check new pod events and logs.", "Verify capacity and image availability.", "Rollback the application revision and separately handle incompatible data changes."],
    ["Use backward-compatible database migrations.", "Deploy immutable image references.", "Run smoke tests after rollout.", "Keep a tested rollback procedure and release history."],
    "Release a new payment-service version using a rolling update, detect a failed readiness probe, and perform a rollback."
  ),

  "10|EKS Cluster Operations": makeLesson(
    "EKS cluster operations cover day-to-day management of cluster access, node groups, add-ons, upgrades, scaling, logging, and operational health.",
    "A production EKS cluster needs routine maintenance and controlled changes to remain secure, available, and compatible with Kubernetes workloads.",
    "Operators use the AWS EKS API for cluster and node-group management and Kubernetes APIs for workloads. Managed add-ons provide components such as VPC CNI, CoreDNS, and kube-proxy.",
    ["Inspect cluster and node-group status.", "Verify Kubernetes version and add-on versions.", "Review node capacity and cluster events.", "Check control-plane logging and access.", "Plan add-on and Kubernetes upgrades.", "Validate workloads after each change."],
    "Before upgrading the payment-service production cluster, the team reviews deprecated APIs, node-group compatibility, add-on versions, and workload disruption requirements.",
    ["aws eks list-clusters --region ap-south-1", "aws eks describe-cluster --name devmavox-eks --region ap-south-1", "aws eks list-nodegroups --cluster-name devmavox-eks --region ap-south-1", "aws eks list-addons --cluster-name devmavox-eks --region ap-south-1", "kubectl get nodes", "kubectl get pods -A"],
    "Use a maintenance plan for cluster version upgrades, add-on upgrades, node AMI replacement, access changes, and backup verification. Follow the supported EKS version and add-on compatibility guidance.",
    ["Node group update fails.", "Add-on becomes degraded after upgrade.", "Cluster access is lost after IAM changes.", "Workloads become unavailable during node replacement."],
    ["Inspect EKS cluster and node-group update status.", "Check add-on health and Kubernetes events.", "Verify IAM access entries and kubeconfig.", "Use a controlled node replacement strategy and validate application availability."],
    ["Automate repeatable infrastructure changes.", "Maintain a cluster inventory and upgrade calendar.", "Test upgrades in a non-production cluster.", "Monitor workloads throughout maintenance."],
    "Prepare an EKS maintenance checklist covering cluster version, node groups, add-ons, IAM access, workload health, and post-upgrade verification."
  ),

  "10|Troubleshooting": makeLesson(
    "Kubernetes troubleshooting is a structured process for locating failures across API access, scheduling, containers, networking, storage, identity, and application health.",
    "A pod status alone rarely explains the complete problem. Engineers must combine resource descriptions, events, logs, metrics, and dependency checks to find the actual root cause.",
    "Start at the affected workload and follow its dependencies: Deployment, ReplicaSet, Pod, Node, Service, Ingress, ConfigMap, Secret, PVC, and external AWS resources. Use timestamps to correlate events and logs.",
    ["Identify the affected namespace and workload.", "Check Deployment and pod status.", "Describe unhealthy pods and read events.", "Inspect current and previous container logs.", "Verify Service endpoints and DNS.", "Check node capacity, storage, IAM, and network dependencies.", "Apply the smallest safe recovery action and verify."],
    "A payment-service rollout reports unavailable replicas. The engineer discovers ImagePullBackOff, checks the ECR image URI and node permissions, corrects the image access issue, and confirms the rollout completes.",
    ["kubectl get deployments,pods,services -n payments", "kubectl describe pod POD_NAME -n payments", "kubectl logs POD_NAME -n payments", "kubectl logs POD_NAME -n payments --previous", "kubectl get events -n payments --sort-by=.metadata.creationTimestamp", "kubectl get nodes", "kubectl get endpointslices -n payments", "kubectl top pods -n payments"],
    "Collect evidence before changing resources. Avoid deleting pods, nodes, or persistent volume claims without understanding the controller, disruption, and data implications.",
    ["Pending: inspect scheduling events and resource requests.", "CrashLoopBackOff: inspect current and previous logs and probe configuration.", "ImagePullBackOff: verify image reference, ECR permissions, and network access.", "Service unreachable: inspect selectors, endpoints, DNS, and network rules.", "PVC Pending: inspect StorageClass and CSI events.", "Node NotReady: inspect node conditions and infrastructure health."],
    ["Identify the failing layer using events and logs.", "Correct the specific configuration or permission.", "Use rollout restart only when appropriate.", "Rollback a bad release when service health is affected.", "Verify pod readiness, endpoint registration, and application behavior after recovery."],
    ["Follow evidence before assumptions.", "Use read-only commands first.", "Preserve logs and timestamps for incident review.", "Avoid broad permissions and destructive fixes.", "Document root cause and preventive action."],
    "Troubleshoot a payment-service incident with Pending pods, failed image pulls, and missing Service endpoints. Document evidence, root cause, recovery, and prevention."
  ),

  "10|Production Hands-on Lab": makeLesson(
    "This lab deploys a production-style Spring Boot payment service on Amazon EKS using ECR images, Kubernetes Deployments, Services, configuration, probes, resource limits, and autoscaling.",
    "The lab connects the earlier CI/CD stages into a real deployment workflow: a tested image is published to ECR and then deployed to a Kubernetes cluster with health and availability controls.",
    "Jenkins publishes an immutable image to ECR. EKS worker nodes pull it using IAM permissions. Kubernetes Deployments maintain replicas, Services provide stable access, probes control readiness, and HPA adjusts capacity based on metrics.",
    ["Confirm the EKS cluster and worker nodes are healthy.", "Verify the payment-service image exists in ECR.", "Configure namespace, ConfigMap, and Secret references.", "Create Deployment with resource requests and health probes.", "Create an internal Service and external routing where required.", "Verify pod readiness and application connectivity.", "Configure HPA and observe scaling.", "Perform a rolling update and validate rollback readiness."],
    "Jenkins builds payment-service, publishes image git-a82f91c to ECR, and updates the EKS Deployment. Three healthy replicas serve traffic through a Service, while monitoring confirms application health.",
    ["aws eks update-kubeconfig --region ap-south-1 --name devmavox-eks", "kubectl get nodes -o wide", "kubectl create namespace payments", "kubectl apply -f payment-config.yaml", "kubectl apply -f payment-secret-reference.yaml", "kubectl apply -f payment-deployment.yaml", "kubectl apply -f payment-service.yaml", "kubectl rollout status deployment/payment-service -n payments", "kubectl get pods,svc -n payments", "kubectl describe hpa payment-service -n payments"],
    "Replace sample account IDs, regions, cluster names, image tags, and resource values. Store real credentials in an approved secret manager. Confirm ECR pull access, VPC CNI capacity, subnet routing, and load-balancer controller requirements before exposing traffic.",
    ["EKS API endpoint is unreachable.", "Worker nodes are NotReady.", "ImagePullBackOff prevents pod startup.", "Readiness probes prevent traffic routing.", "Service has no endpoints.", "HPA cannot read metrics.", "PVC remains Pending.", "Ingress or load balancer targets are unhealthy."],
    ["Verify AWS identity, kubeconfig, and endpoint access.", "Check node-group health and node conditions.", "Correct ECR repository permissions and image reference.", "Fix health endpoints and probe thresholds.", "Match Service selectors with ready pod labels.", "Repair metrics or storage add-on configuration.", "Inspect load balancer controller events and target health."],
    ["Use immutable image tags or digests.", "Set requests, limits, and health probes.", "Use RBAC and managed secrets.", "Keep workloads distributed across available nodes.", "Test rollouts and rollback procedures.", "Monitor logs, metrics, events, and service-level indicators.", "Document deployment and recovery steps."],
    "Deploy the payment-service image from ECR to EKS, expose it through a Service, verify all replicas are healthy, test a rolling update, and document how to recover from an image pull or readiness failure."
  ),
};