import type { GlossaryTerm } from "./glossary-data";

export const kubernetesGlossaryDetails: Record<string, Partial<GlossaryTerm>> = {
  "Pod": {
    purpose: "A Pod is the smallest deployable unit in Kubernetes. It provides the execution environment for one or more closely related containers that share the same network namespace, IP address, and mounted volumes. Applications are normally deployed as Pods through higher-level controllers rather than by creating standalone Pods.",
    project: "In an online shopping application, the product-catalog API runs in a Pod. The Pod contains the application container and can optionally include a log-collection or service-mesh sidecar. Kubernetes assigns the Pod an IP address and schedules it onto a suitable worker node. If the Pod becomes unhealthy, its owning Deployment creates a replacement.",
    workflow: [
      "A developer defines a Pod template in a Deployment manifest, including the container image, ports, resource requests, limits, probes, and volume mounts.",
      "The manifest is submitted to the Kubernetes API server. Authentication, authorization, and admission controls are applied before the object is stored in etcd.",
      "The scheduler selects a worker node that satisfies resource requests, node selectors, affinity rules, taints, and tolerations.",
      "The kubelet on the selected node asks the container runtime to pull the image and create the container. The configured CNI plugin provides Pod networking.",
      "The kubelet executes startup, readiness, and liveness probes. A readiness failure removes the Pod from ready Service endpoints; a liveness failure can cause the container to restart.",
      "The Pod receives an ephemeral lifecycle. If it is deleted or the node fails, a controller such as a Deployment creates a replacement rather than restoring the same Pod identity."
    ],
    commands: [
      "kubectl get pods -n production -o wide",
      "kubectl describe pod <pod-name> -n production",
      "kubectl logs <pod-name> -n production",
      "kubectl logs <pod-name> -c <container-name> -n production",
      "kubectl logs <pod-name> --previous -n production",
      "kubectl exec -it <pod-name> -n production -- sh",
      "kubectl get pod <pod-name> -n production -o yaml"
    ],
    mistakes: [
      "Creating standalone Pods for applications that need automatic replacement. Use a Deployment or StatefulSet for workloads that require controller-managed lifecycle.",
      "Setting CPU and memory limits without understanding application behavior, which can cause CPU throttling or OOMKilled containers.",
      "Using liveness probes as dependency checks. A temporary database outage should not necessarily restart every application Pod.",
      "Assuming a Pod IP remains stable after recreation. Use a Service for stable network access.",
      "Running multiple unrelated application containers in one Pod instead of separating independently scalable workloads.",
      "Ignoring Pending events, image-pull errors, volume mount failures, and probe failures when diagnosing startup problems."
    ],
    configuration: [
      'Basic Pod manifest: apiVersion: v1; kind: Pod; metadata: { name: catalog-api, namespace: production, labels: { app: catalog-api } }; spec: { containers: [{ name: catalog-api, image: registry.example.com/catalog-api:1.0.0, ports: [{ containerPort: 8080 }], resources: { requests: { cpu: 100m, memory: 128Mi }, limits: { cpu: 500m, memory: 512Mi } }, readinessProbe: { httpGet: { path: /ready, port: 8080 }, initialDelaySeconds: 5, periodSeconds: 10 }, livenessProbe: { httpGet: { path: /health, port: 8080 }, initialDelaySeconds: 15, periodSeconds: 20 } }] }',
      "Use immutable image tags or image digests for predictable deployments. Avoid relying on the mutable latest tag in production.",
      "Define resource requests so the scheduler can place Pods correctly. Set limits based on measured workload requirements.",
      "Use a dedicated ServiceAccount and explicitly disable token automounting when the workload does not need Kubernetes API access."
    ],
    troubleshooting: [
      "Pending: run kubectl describe pod and inspect scheduling events, insufficient CPU or memory, taints, affinity, and PVC binding.",
      "ImagePullBackOff: verify image name, tag, registry availability, imagePullSecrets, and node network access.",
      "CrashLoopBackOff: inspect kubectl logs --previous, container exit codes, startup configuration, secrets, and dependency connectivity.",
      "Unready Pod: inspect readiness probe path, port, response code, startup duration, and application logs.",
      "OOMKilled: inspect container memory usage and limits; profile memory consumption before changing limits.",
      "Container cannot reach another workload: verify Service selectors, endpoints, DNS resolution, NetworkPolicy, and application listening address."
    ],
    bestPractices: [
      "Manage production Pods through Deployments, StatefulSets, DaemonSets, or Jobs instead of manually maintained standalone Pods.",
      "Configure readiness and liveness probes according to the actual application health model.",
      "Set resource requests and limits using load-test and production metrics.",
      "Use labels consistently so Services, policies, monitoring, and deployment automation can select the intended Pods.",
      "Keep containers focused on one main application process and use sidecars only when their lifecycle should be coupled.",
      "Use non-root containers, read-only root filesystems where possible, and restricted Linux capabilities."
    ],
    securityConsiderations: [
      "Run containers with a non-root user and apply an appropriate Pod Security Standard.",
      "Do not place passwords or API keys directly in Pod environment values or committed manifests; use Kubernetes Secrets with suitable encryption and access controls.",
      "Apply least-privilege RBAC to the Pod ServiceAccount and avoid mounting API tokens unnecessarily.",
      "Use NetworkPolicies to restrict inbound and outbound Pod communication where the CNI supports enforcement.",
      "Use trusted images, vulnerability scanning, image-signature verification, and controlled registry access."
    ]
  },

  "Deployment": {
    purpose: "A Deployment is a Kubernetes workload controller for stateless applications. It maintains the desired number of interchangeable Pod replicas and manages declarative updates through ReplicaSets. It supports rolling updates, rollout status checks, pause and resume, and rollback to a previous revision.",
    project: "For a customer-facing catalog API, the team declares three replicas using a Deployment. When version 2.1 is released, Kubernetes gradually replaces version 2.0 Pods while monitoring readiness. If the new version fails its readiness checks, the team can stop the rollout and return to a previous revision.",
    workflow: [
      "The team commits a Deployment manifest containing the application image, replica count, selector, Pod template, resource settings, and rollout strategy.",
      "The API server validates and stores the desired Deployment state.",
      "The Deployment controller creates a ReplicaSet for the Pod template. The ReplicaSet creates Pods until the desired replica count is reached.",
      "The scheduler assigns eligible Pods to worker nodes and kubelets start their containers.",
      "When the Pod template changes, the Deployment controller creates a new ReplicaSet and scales old and new ReplicaSets according to the rolling update strategy.",
      "The rollout is considered available as updated Pods pass readiness checks and satisfy the Deployment availability requirements.",
      "If a release is faulty, an operator can inspect rollout history and undo to a previous Deployment revision."
    ],
    commands: [
      "kubectl get deployments -n production",
      "kubectl describe deployment catalog-api -n production",
      "kubectl rollout status deployment/catalog-api -n production",
      "kubectl rollout history deployment/catalog-api -n production",
      "kubectl rollout undo deployment/catalog-api -n production",
      "kubectl scale deployment/catalog-api --replicas=5 -n production",
      "kubectl set image deployment/catalog-api catalog-api=registry.example.com/catalog-api:2.1.0 -n production",
      "kubectl apply -f deployment.yaml"
    ],
    mistakes: [
      "Changing a Deployment selector after creation. Selectors are immutable and must match the Pod template labels.",
      "Using a mutable image tag and assuming every node will run the same image version.",
      "Setting maxUnavailable and maxSurge without considering capacity, availability, and application startup time.",
      "Skipping readiness probes, allowing new Pods to receive traffic before they can serve requests.",
      "Assuming a Deployment rollback also restores database schema or external infrastructure changes. Those require separate rollback plans.",
      "Manually editing generated ReplicaSets instead of changing the Deployment Pod template."
    ],
    configuration: [
      'Deployment example: apiVersion: apps/v1; kind: Deployment; metadata: { name: catalog-api, namespace: production }; spec: { replicas: 3, strategy: { type: RollingUpdate, rollingUpdate: { maxSurge: 1, maxUnavailable: 0 } }, selector: { matchLabels: { app: catalog-api } }, template: { metadata: { labels: { app: catalog-api } }, spec: { containers: [{ name: catalog-api, image: registry.example.com/catalog-api:2.1.0, ports: [{ containerPort: 8080 }], readinessProbe: { httpGet: { path: /ready, port: 8080 } }, resources: { requests: { cpu: 200m, memory: 256Mi }, limits: { cpu: 1, memory: 512Mi } } }] } } }',
      "Use a rolling update strategy for gradual replacement. maxUnavailable: 0 prioritizes keeping the configured number of available replicas during the update, subject to cluster capacity and readiness.",
      "Use revisionHistoryLimit to control how many old ReplicaSets are retained for rollback.",
      "Use progressDeadlineSeconds and monitor rollout status so stalled releases are detected."
    ],
    troubleshooting: [
      "Deployment has fewer available replicas: inspect its ReplicaSet and Pods using kubectl describe deployment, kubectl get rs, and kubectl get pods.",
      "Rollout is stuck: inspect readiness probe failures, image pulls, scheduling events, quota limits, and maxSurge capacity.",
      "New Pods are not created: verify the Deployment selector, namespace quota, admission policies, and controller events.",
      "Service still sends traffic to old Pods: inspect Service selectors and EndpointSlices, and verify readiness on the new Pods.",
      "Rollback does not fix the incident: check whether the failure comes from a database migration, ConfigMap, Secret, Service, or external dependency rather than the container image."
    ],
    bestPractices: [
      "Keep Deployment manifests in version control and apply them through a controlled delivery pipeline.",
      "Use immutable image versions and explicit resource requests, limits, and health probes.",
      "Set an update strategy that matches the application's availability and capacity requirements.",
      "Monitor rollout status and application-level error rates before declaring a release successful.",
      "Use PodDisruptionBudgets for appropriate workloads to help protect availability during voluntary disruptions.",
      "Separate application rollback from database and infrastructure migration procedures."
    ],
    securityConsiderations: [
      "Restrict who can create, update, or scale production Deployments using namespace-scoped RBAC.",
      "Use trusted, scanned images and avoid privileged containers.",
      "Apply Pod Security controls, non-root execution, and least-privilege ServiceAccounts in the Pod template.",
      "Protect configuration and credentials referenced by the Deployment through appropriate Secret access policies.",
      "Review admission policies to prevent unsafe images, host access, and excessive privileges."
    ]
  },

  "ReplicaSet": {
    purpose: "A ReplicaSet ensures that a specified number of matching Pods are running at a given time. It compares the desired replica count with the actual matching Pods and creates or deletes Pods to correct the difference. In normal application delivery, a Deployment manages ReplicaSets so that updates and rollbacks can be coordinated.",
    project: "A catalog API Deployment requests three replicas. Its active ReplicaSet continuously checks the matching Pods. If one Pod is deleted or a worker node fails, the ReplicaSet creates a replacement to return the workload to three replicas.",
    workflow: [
      "A ReplicaSet specification defines a selector, Pod template, and desired replica count.",
      "The ReplicaSet controller observes matching Pods in the same namespace.",
      "If fewer Pods exist than requested, it creates Pods from its template.",
      "If too many matching Pods exist, it removes excess Pods according to controller behavior.",
      "When managed by a Deployment, a new ReplicaSet is created for a changed Pod template and old ReplicaSets are scaled during rollout.",
      "The ReplicaSet does not perform application-aware traffic routing; a Service selects ready Pods independently."
    ],
    commands: [
      "kubectl get replicasets -n production",
      "kubectl describe replicaset <replicaset-name> -n production",
      "kubectl get rs -l app=catalog-api -n production",
      "kubectl get pods -o wide -n production",
      "kubectl get rs <replicaset-name> -n production -o yaml",
      "kubectl rollout history deployment/catalog-api -n production"
    ],
    mistakes: [
      "Creating a standalone ReplicaSet when a Deployment is required for controlled application updates.",
      "Using overlapping selectors that cause multiple controllers to manage the same Pods.",
      "Changing a Deployment-managed ReplicaSet directly and expecting the Deployment to preserve the manual change.",
      "Assuming a ReplicaSet provides stable networking or load balancing; use a Service for that purpose.",
      "Ignoring failed Pods while checking only the ReplicaSet desired and current replica numbers."
    ],
    configuration: [
      'ReplicaSet example for learning: apiVersion: apps/v1; kind: ReplicaSet; metadata: { name: catalog-api-rs, namespace: production }; spec: { replicas: 3, selector: { matchLabels: { app: catalog-api } }, template: { metadata: { labels: { app: catalog-api } }, spec: { containers: [{ name: catalog-api, image: registry.example.com/catalog-api:2.1.0, ports: [{ containerPort: 8080 }] }] } } }',
      "The selector matchLabels must match the labels on the Pod template. A mismatch causes API validation failure.",
      "For normal stateless application delivery, put the Pod template and replica count in a Deployment rather than managing a ReplicaSet directly."
    ],
    troubleshooting: [
      "Replica count remains below desired: inspect Pod events, image pull errors, resource availability, admission failures, and namespace quotas.",
      "ReplicaSet creates unexpected Pods: verify selector labels and check for overlapping controllers.",
      "Pods are repeatedly replaced: inspect container crashes, node health, eviction events, and probe configuration.",
      "Old ReplicaSets remain after a release: inspect Deployment revision history and revisionHistoryLimit.",
      "ReplicaSet shows desired replicas but application is unavailable: check Pod readiness and Service endpoints; replica count alone does not prove application health."
    ],
    bestPractices: [
      "Use Deployments for stateless application workloads and let them manage ReplicaSets.",
      "Keep selectors unique and stable for each workload.",
      "Monitor desired, current, ready, and available replica counts.",
      "Use resource requests and health probes in the Pod template.",
      "Understand ReplicaSets when investigating Deployment rollouts and revision history."
    ],
    securityConsiderations: [
      "Limit direct ReplicaSet creation and mutation permissions in production namespaces.",
      "Apply the same image, ServiceAccount, security context, and network restrictions used for production Pods.",
      "Use admission policies to prevent privileged or untrusted Pod templates.",
      "Do not treat a ReplicaSet as a security boundary; Pod security and namespace policies must be configured separately."
    ]
  },

  "Service": {
    purpose: "A Service provides a stable virtual IP address and DNS name for accessing a changing set of Pods. It selects Pods using labels and routes traffic to eligible endpoints. Common types include ClusterIP for internal access, NodePort for node-level exposure, and LoadBalancer for an external load balancer supplied by the environment.",
    project: "The checkout API needs to call the payment API even while payment Pods are replaced during deployments. A ClusterIP Service named payment-service gives the checkout application a stable DNS name. Kubernetes updates the Service endpoints as matching Pods become ready or unavailable.",
    workflow: [
      "A Service manifest defines a type, selector, port, and targetPort.",
      "The API server stores the Service object.",
      "EndpointSlice controllers identify Pods matching the Service selector and publish eligible endpoints.",
      "The cluster networking implementation programs traffic forwarding for the Service virtual IP and ports.",
      "Clients connect through the Service DNS name or virtual IP rather than tracking individual Pod IP addresses.",
      "When Pods are added, removed, or fail readiness, the endpoint set is updated to reflect eligible backends."
    ],
    commands: [
      "kubectl get services -n production",
      "kubectl describe service payment-service -n production",
      "kubectl get endpointslices -n production -l kubernetes.io/service-name=payment-service",
      "kubectl get pods -l app=payment-api -n production --show-labels",
      "kubectl port-forward service/payment-service 8080:80 -n production",
      "kubectl get service payment-service -n production -o yaml",
      "kubectl run network-test --rm -it --image=busybox:1.36 -n production -- nslookup payment-service"
    ],
    mistakes: [
      "Service selector labels do not match Pod labels, resulting in no endpoints.",
      "Confusing Service port with container targetPort and sending traffic to the wrong application port.",
      "Expecting ClusterIP to be reachable directly from the public internet.",
      "Using NodePort or LoadBalancer without understanding firewall, cloud load balancer, and network exposure implications.",
      "Assuming a Service automatically makes an application healthy; readiness probes and application health still matter.",
      "Using headless Services without understanding that DNS can return Pod addresses rather than a virtual Service IP."
    ],
    configuration: [
      'Internal ClusterIP example: apiVersion: v1; kind: Service; metadata: { name: payment-service, namespace: production }; spec: { type: ClusterIP, selector: { app: payment-api }, ports: [{ name: http, port: 80, targetPort: 8080, protocol: TCP }] }',
      "The selector app: payment-api must match the labels on the target Pods.",
      "For external cloud access, use a LoadBalancer Service only when direct Layer 4 exposure is appropriate and supported by the environment.",
      "For a headless Service, set clusterIP: None and define the required DNS and endpoint behavior deliberately."
    ],
    troubleshooting: [
      "Service has no endpoints: compare Service selectors with Pod labels and check Pod readiness.",
      "Connection refused: verify targetPort, application listening port, container process, and protocol.",
      "DNS lookup fails: inspect CoreDNS Pods, namespace DNS name, and cluster DNS configuration.",
      "Service is reachable inside the cluster but not externally: inspect Service type, cloud load balancer provisioning, firewall rules, and network routes.",
      "Intermittent connection failures: inspect endpoint readiness transitions, application capacity, connection handling, and network policies."
    ],
    bestPractices: [
      "Use ClusterIP for internal service-to-service communication unless external exposure is required.",
      "Name Service ports and use consistent application labels.",
      "Use readiness probes so unready Pods are not selected as normal Service endpoints.",
      "Restrict public exposure and prefer an approved ingress or gateway architecture for HTTP applications.",
      "Monitor EndpointSlices, traffic failures, latency, and backend health.",
      "Use NetworkPolicies to control which workloads can communicate with a Service's Pods."
    ],
    securityConsiderations: [
      "Expose only required ports and avoid unnecessary NodePort or public LoadBalancer services.",
      "Use NetworkPolicies to restrict access to sensitive backend Pods.",
      "Apply cloud firewall and load balancer security controls for externally reachable Services.",
      "Use TLS at the appropriate ingress, gateway, or application layer.",
      "Review DNS and service discovery permissions as part of the cluster threat model."
    ]
  },

  "Ingress": {
    purpose: "Ingress is a Kubernetes API resource that describes HTTP and HTTPS routing rules from outside a cluster to Services inside the cluster. An Ingress resource does not implement traffic routing by itself; an Ingress controller must be installed and configured to observe the resource and provision or configure the data plane.",
    project: "A retail application exposes catalog.example.com and checkout.example.com through one HTTPS entry point. The Ingress controller terminates TLS and routes each host or path to its corresponding ClusterIP Service. Internal APIs remain private and are not exposed as separate public load balancers.",
    workflow: [
      "The platform team installs and operates an Ingress controller appropriate for the cluster, such as an NGINX-based controller or a cloud-provider controller.",
      "The developer creates an Ingress resource containing host rules, paths, backend Service names, and TLS references.",
      "The controller watches Ingress resources and related Services, Secrets, and configuration.",
      "The controller configures its proxy or cloud load balancer according to the declared rules.",
      "External clients resolve the application hostname and connect to the controller entry point.",
      "The controller matches the host and path, then forwards traffic to the configured Service backend.",
      "Changes to rules or certificates are reconciled by the controller."
    ],
    commands: [
      "kubectl get ingress -A",
      "kubectl describe ingress storefront-ingress -n production",
      "kubectl get ingressclass",
      "kubectl get pods -n ingress-nginx",
      "kubectl get service -n ingress-nginx",
      "kubectl get secret storefront-tls -n production",
      "kubectl get events -n production --sort-by=.metadata.creationTimestamp"
    ],
    mistakes: [
      "Creating an Ingress resource without installing a compatible Ingress controller.",
      "Using a backend Service name or port that does not exist in the same namespace.",
      "Referencing a TLS Secret from another namespace; the TLS Secret must be in the Ingress resource namespace.",
      "Assuming every controller supports the same annotations and configuration options.",
      "Forgetting DNS records, load balancer health checks, firewall rules, or TLS certificate validity.",
      "Treating the Ingress API as a complete replacement for every advanced gateway capability. Evaluate Gateway API or a dedicated gateway when richer traffic management is required."
    ],
    configuration: [
      'Ingress example: apiVersion: networking.k8s.io/v1; kind: Ingress; metadata: { name: storefront-ingress, namespace: production }; spec: { ingressClassName: nginx, tls: [{ hosts: [shop.example.com], secretName: storefront-tls }], rules: [{ host: shop.example.com, http: { paths: [{ path: /, pathType: Prefix, backend: { service: { name: storefront-service, port: { number: 80 } } } }] } }] }',
      "The storefront-tls Secret must contain a valid TLS certificate and private key and exist in the production namespace.",
      "Use ingressClassName to select the intended controller when multiple controllers are installed.",
      "Controller-specific annotations must be reviewed against the exact controller version and its security documentation."
    ],
    troubleshooting: [
      "Ingress has no address: inspect Ingress controller Pods, controller Service, cloud load balancer provisioning, and controller logs.",
      "404 response: verify hostname, path, pathType, Ingress class, and controller routing configuration.",
      "502 or 503 response: verify backend Service endpoints, target ports, application health, and controller-to-backend connectivity.",
      "TLS certificate warning: inspect the Secret type, certificate SANs, expiration, key match, and hostname.",
      "Rules are ignored: verify ingressClassName and controller watch scope, and inspect controller events and logs.",
      "External DNS does not resolve: verify the DNS record points to the correct controller or load balancer address."
    ],
    bestPractices: [
      "Operate the Ingress controller as a separately managed, monitored platform component.",
      "Use TLS for public application traffic and automate certificate renewal.",
      "Keep backend Services private and expose only the required host and path combinations.",
      "Validate controller-specific annotations before production rollout.",
      "Apply request size, timeout, rate-limit, and access controls according to application requirements.",
      "Evaluate Gateway API for advanced routing, traffic splitting, and role-oriented configuration needs."
    ],
    securityConsiderations: [
      "Enforce HTTPS and redirect or reject insecure HTTP according to application policy.",
      "Protect TLS private keys through namespace-scoped RBAC and Secret encryption at rest.",
      "Restrict access to the Ingress controller administration and metrics endpoints.",
      "Apply WAF, authentication, rate limiting, and network controls where required.",
      "Avoid exposing internal administration paths and sensitive services through broad path rules."
    ]
  },

  "Namespace": {
    purpose: "A Namespace partitions namespaced Kubernetes resources within a cluster. It helps teams separate environments, applications, and ownership boundaries and provides a scope for names, RBAC permissions, quotas, and policies. A Namespace is not a complete security boundary by itself.",
    project: "A company uses development, staging, and production namespaces to separate application deployments. Each team receives permissions only in its assigned namespace, while ResourceQuotas limit CPU and memory consumption to prevent one environment from exhausting shared cluster capacity.",
    workflow: [
      "A platform administrator creates a Namespace for an application, team, or environment.",
      "Workloads and namespaced resources are created with metadata.namespace or through kubectl -n.",
      "RBAC Role and RoleBinding objects grant selected users or ServiceAccounts access within the namespace.",
      "ResourceQuota and LimitRange objects establish resource consumption controls.",
      "NetworkPolicies and admission controls can enforce additional workload boundaries when supported and configured.",
      "Cluster-scoped resources such as Nodes, PersistentVolumes, and ClusterRoles remain outside normal namespace ownership."
    ],
    commands: [
      "kubectl get namespaces",
      "kubectl create namespace staging",
      "kubectl get pods -n staging",
      "kubectl config set-context --current --namespace=staging",
      "kubectl describe namespace staging",
      "kubectl get resourcequota -n staging",
      "kubectl get limitrange -n staging",
      "kubectl delete namespace staging"
    ],
    mistakes: [
      "Assuming namespaces isolate network traffic automatically. NetworkPolicy enforcement must be configured and supported by the CNI.",
      "Creating a RoleBinding in one namespace and expecting it to grant access in another namespace.",
      "Forgetting to set the namespace in commands and applying changes to the current context namespace unintentionally.",
      "Trying to create cluster-scoped resources such as Nodes inside a namespace.",
      "Deleting a namespace without checking the namespaced resources and workloads that will be removed.",
      "Using namespaces as a substitute for separate clusters when strong isolation or compliance boundaries are required."
    ],
    configuration: [
      'Namespace example: apiVersion: v1; kind: Namespace; metadata: { name: staging, labels: { environment: staging, team: platform } }',
      'ResourceQuota example: apiVersion: v1; kind: ResourceQuota; metadata: { name: staging-quota, namespace: staging }; spec: { hard: { requests.cpu: "8", requests.memory: 16Gi, limits.cpu: "16", limits.memory: 32Gi, pods: "50" } }',
      "Use LimitRange to define default requests and limits for containers that omit them.",
      "Apply Role and RoleBinding objects to grant namespace-scoped permissions rather than giving every team cluster-admin access."
    ],
    troubleshooting: [
      "Forbidden response: inspect the active identity, Role or ClusterRole rules, and RoleBinding or ClusterRoleBinding subjects.",
      "Resource creation rejected: inspect ResourceQuota, LimitRange, admission policies, and namespace status.",
      "Workload cannot discover another namespace Service: use the fully qualified Service DNS name and inspect NetworkPolicies.",
      "Namespace stuck Terminating: inspect remaining resources, API discovery failures, and finalizers before considering any finalizer changes.",
      "Resources appear missing: verify kubectl config current-context and the namespace selected by the command."
    ],
    bestPractices: [
      "Use consistent namespace naming for environments, teams, and applications.",
      "Apply RBAC, ResourceQuota, and LimitRange controls to shared clusters.",
      "Set the namespace explicitly in automation and production deployment manifests.",
      "Use NetworkPolicies and admission policies for additional isolation.",
      "Review cluster-scoped versus namespaced resource ownership before designing access controls.",
      "Use separate clusters when the required trust or compliance boundary cannot be achieved safely with namespaces."
    ],
    securityConsiderations: [
      "Do not treat namespace separation alone as tenant-grade security isolation.",
      "Grant least-privilege permissions with RoleBindings and avoid broad cluster-admin grants.",
      "Apply default-deny NetworkPolicies where supported, then explicitly allow required traffic.",
      "Use Pod Security Admission or an equivalent policy system to enforce workload security standards.",
      "Protect Secrets and service accounts separately within each namespace."
    ]
  },

  "ConfigMap": {
    purpose: "A ConfigMap stores non-confidential configuration data as key-value pairs or text files. Pods can consume ConfigMap values as environment variables, command arguments, or mounted files. ConfigMaps separate application configuration from container images, but they are not designed to store passwords, tokens, or other confidential values.",
    project: "The catalog API uses different feature flags and log levels in staging and production. The same container image is deployed in both environments, while a ConfigMap supplies environment-specific non-sensitive settings such as LOG_LEVEL and FEATURE_SEARCH_V2.",
    workflow: [
      "An administrator or deployment pipeline creates a ConfigMap from a manifest, literal values, or configuration files.",
      "The Pod specification references the ConfigMap using env, envFrom, or a volume.",
      "The kubelet obtains the configuration needed for the Pod on its node.",
      "Environment-variable values are set when the container starts and do not update automatically inside an already running process.",
      "Mounted ConfigMap volumes are updated eventually when the ConfigMap changes, subject to the mount and application behavior.",
      "Applications must reload mounted configuration or be restarted when they cannot observe configuration changes safely."
    ],
    commands: [
      "kubectl get configmaps -n production",
      "kubectl describe configmap catalog-config -n production",
      "kubectl get configmap catalog-config -n production -o yaml",
      "kubectl create configmap catalog-config --from-literal=LOG_LEVEL=info -n production",
      "kubectl create configmap catalog-config --from-file=./config.properties -n production",
      "kubectl apply -f configmap.yaml"
    ],
    mistakes: [
      "Storing passwords, API tokens, or private keys in ConfigMaps.",
      "Assuming environment variables update in a running container after the ConfigMap changes.",
      "Assuming every application automatically reloads mounted configuration files.",
      "Exceeding the Kubernetes object size limit; ConfigMaps are intended for relatively small configuration data.",
      "Overwriting a shared ConfigMap without coordinating application compatibility and rollout behavior.",
      "Using inconsistent key names between ConfigMap data and the Pod environment references."
    ],
    configuration: [
      'ConfigMap example: apiVersion: v1; kind: ConfigMap; metadata: { name: catalog-config, namespace: production }; data: { LOG_LEVEL: info, FEATURE_SEARCH_V2: "true", API_TIMEOUT_SECONDS: "5" }',
      'Consume a key as an environment variable: env: [{ name: LOG_LEVEL, valueFrom: { configMapKeyRef: { name: catalog-config, key: LOG_LEVEL } } }]',
      'Mount a ConfigMap as files: volumes: [{ name: app-config, configMap: { name: catalog-config } }]; volumeMounts: [{ name: app-config, mountPath: /etc/catalog, readOnly: true }]',
      "Use versioned ConfigMap names or a checksum annotation in the Pod template when a controlled rollout is required after configuration changes."
    ],
    troubleshooting: [
      "CreateContainerConfigError: inspect ConfigMap existence, namespace, referenced key names, and Pod events.",
      "Application sees an old value: determine whether the value is an environment variable or mounted file and whether the application reloads it.",
      "Mounted file is missing: inspect volume and volumeMount names, mount path, items mapping, and file permissions.",
      "Configuration is malformed: validate the file format and application-specific schema before applying it.",
      "A configuration update does not trigger a rollout: change the Pod template or use a deployment mechanism that updates a checksum or version reference."
    ],
    bestPractices: [
      "Keep non-sensitive configuration outside container images.",
      "Version configuration changes and review them through source control.",
      "Use separate ConfigMaps for distinct applications or environments.",
      "Validate configuration syntax and application compatibility in CI before deployment.",
      "Use immutable ConfigMaps where supported by the workflow to reduce accidental mutation.",
      "Document whether applications consume settings at startup or dynamically reload mounted files."
    ],
    securityConsiderations: [
      "Never store credentials or confidential values in ConfigMaps.",
      "Use RBAC to limit who can read or modify configuration objects.",
      "Avoid exposing sensitive operational details through broadly readable ConfigMaps.",
      "Review mounted configuration permissions and prevent unintended write access from containers.",
      "Use Secrets or an external secret manager for confidential data."
    ]
  },

  "Secret": {
    purpose: "A Kubernetes Secret stores sensitive values such as passwords, API tokens, and TLS key material for use by Pods and other Kubernetes components. Secret data is base64-encoded in the API representation, but base64 is not encryption. Strong RBAC, encryption at rest, secure delivery, and careful handling are required to protect confidential values.",
    project: "A payment API needs a database password and a third-party payment token. The platform team stores these values in a Secret or integrates an external secret manager, then exposes only the required keys to the payment Pod. Access is restricted to the workload ServiceAccount and authorized operators.",
    workflow: [
      "An authorized pipeline or administrator creates a Secret using a secure process rather than committing plaintext credentials to source control.",
      "The API server validates and stores the Secret object, with encryption at rest configured separately where required.",
      "A Pod references the Secret as an environment variable or a mounted volume.",
      "The kubelet retrieves the Secret needed by the Pod on its assigned node and makes it available to the container.",
      "The application reads the credential and uses it to authenticate to the external system.",
      "When credentials rotate, the Secret is updated and the application or Pod is reloaded according to the credential-consumption method.",
      "Access is audited and old credentials are revoked after successful rotation."
    ],
    commands: [
      "kubectl get secrets -n production",
      "kubectl describe secret payment-credentials -n production",
      "kubectl create secret generic payment-credentials --from-file=./db-password.txt -n production",
      "kubectl create secret generic payment-credentials --from-literal=DB_USER=appuser -n production",
      "kubectl get secret payment-credentials -n production -o jsonpath='{.data.DB_USER}'",
      "kubectl get secret payment-credentials -n production -o jsonpath='{.data.DB_USER}' | base64 -d"
    ],
    mistakes: [
      "Believing base64 encoding protects Secret data. Anyone with access to decode the value can recover the original content.",
      "Committing plaintext credentials or base64-encoded Secret manifests to a public or broadly accessible repository.",
      "Granting every developer or application broad permission to read all Secrets in a namespace.",
      "Printing Secret values in CI logs, shell history, debug output, or application logs.",
      "Assuming environment variables update automatically in an existing process after Secret rotation.",
      "Using a single shared credential across unrelated applications and environments.",
      "Forgetting that Secret access by a Pod depends on its ServiceAccount permissions and the platform's security configuration."
    ],
    configuration: [
      'Secret manifest structure: apiVersion: v1; kind: Secret; metadata: { name: payment-credentials, namespace: production }; type: Opaque; stringData: { DB_USER: appuser, DB_PASSWORD: replace-through-secure-secret-delivery }',
      'Reference a Secret key as an environment variable: env: [{ name: DB_PASSWORD, valueFrom: { secretKeyRef: { name: payment-credentials, key: DB_PASSWORD } } }]',
      'Mount selected Secret keys as files: volumes: [{ name: payment-secret, secret: { secretName: payment-credentials } }]; volumeMounts: [{ name: payment-secret, mountPath: /var/run/payment-secrets, readOnly: true }]',
      "For production, prefer an external secret manager or encrypted GitOps secret workflow when appropriate. Do not put real credentials in sample manifests or source control."
    ],
    troubleshooting: [
      "CreateContainerConfigError: verify Secret name, namespace, key name, and Pod event details.",
      "Application authentication fails: validate credential version, target system username, permissions, and whether the application loaded the latest value.",
      "Mounted credential file is missing: inspect volume references, items mapping, mount path, and Secret type.",
      "Credential rotation has no effect: check whether the application reads a mounted file dynamically or requires a restart to reload environment variables.",
      "Access denied: inspect ServiceAccount identity, RBAC permissions, admission policy, and API audit events.",
      "Unexpectedly exposed credential: rotate and revoke it immediately, review logs and repository history, and investigate the exposure path."
    ],
    bestPractices: [
      "Use an external secret manager or approved encrypted secret delivery process for production credentials.",
      "Enable encryption at rest for Secrets in the cluster datastore.",
      "Restrict Secret read permissions using least-privilege RBAC.",
      "Rotate credentials regularly and automate revocation of old credentials.",
      "Mount only the keys required by each container and use read-only mounts.",
      "Prevent secret values from appearing in logs, command history, build artifacts, and diagnostic output."
    ],
    securityConsiderations: [
      "Treat Secret values as plaintext after decoding; base64 is only an encoding format.",
      "Enable and verify encryption at rest for Kubernetes Secrets.",
      "Limit etcd, API, backup, and node-level access because each can expose Secret data.",
      "Use dedicated ServiceAccounts and tightly scoped RBAC permissions.",
      "Audit Secret reads and changes and rotate credentials after suspected exposure.",
      "Use external secret stores, short-lived credentials, and workload identity where supported."
    ]
  },

  "Persistent Volume": {
    purpose: "A PersistentVolume (PV) represents storage provisioned for use by a Kubernetes workload. It has a lifecycle independent of an individual Pod and can be backed by cloud block storage, network filesystems, or other supported storage systems. A PersistentVolumeClaim (PVC) is the workload request that binds to suitable persistent storage.",
    project: "A PostgreSQL database running in Kubernetes needs data to survive Pod replacement. The application requests storage through a PVC. A StorageClass provisions a cloud disk, Kubernetes binds the claim to a PersistentVolume, and the database mounts it at its data directory.",
    workflow: [
      "A storage administrator or CSI provisioner makes storage available through a StorageClass or a manually created PersistentVolume.",
      "The application team creates a PersistentVolumeClaim specifying storage size, access mode, and optionally a StorageClass.",
      "Kubernetes binds the PVC to a compatible PV or dynamically provisions a volume through the storage provisioner.",
      "A Pod references the PVC in its volumes section and mounts it into the container.",
      "The CSI driver and kubelet coordinate volume attachment, formatting where needed, and mounting on the worker node.",
      "The application writes data to the mounted filesystem or block device according to its storage requirements.",
      "When a Pod is replaced, a new Pod can mount the same claim when the storage backend and access mode permit it."
    ],
    commands: [
      "kubectl get pv",
      "kubectl get pvc -A",
      "kubectl describe pv <pv-name>",
      "kubectl describe pvc database-data -n production",
      "kubectl get storageclass",
      "kubectl get pods -n production -o wide",
      "kubectl get events -n production --sort-by=.metadata.creationTimestamp"
    ],
    mistakes: [
      "Confusing PV with PVC. The PV represents storage capacity; the PVC is the application's request for that storage.",
      "Assuming deleting a Pod deletes its persistent data. The volume lifecycle depends on the claim, PV reclaim policy, and storage backend.",
      "Choosing ReadWriteOnce and assuming it means only one Pod can ever access the volume; its semantics concern read-write mounting by a single node, not necessarily a single Pod.",
      "Expecting a single-node block volume to attach simultaneously to Pods on multiple nodes.",
      "Deleting a PVC without understanding its PV reclaim policy and the resulting data-retention behavior.",
      "Treating persistent storage as a backup. Volume persistence does not replace tested backups and disaster recovery.",
      "Ignoring zone and topology constraints that can prevent a Pod from mounting a volume on a different node."
    ],
    configuration: [
      'PVC example: apiVersion: v1; kind: PersistentVolumeClaim; metadata: { name: database-data, namespace: production }; spec: { accessModes: [ReadWriteOnce], storageClassName: fast-ssd, resources: { requests: { storage: 20Gi } } }',
      'Pod volume reference: volumes: [{ name: database-storage, persistentVolumeClaim: { claimName: database-data } }]; volumeMounts: [{ name: database-storage, mountPath: /var/lib/postgresql/data }]',
      "Use a StorageClass to define the provisioner, parameters, volume binding mode, and reclaim behavior for dynamically provisioned storage.",
      "Use StatefulSet volumeClaimTemplates when each database replica needs its own stable PVC."
    ],
    troubleshooting: [
      "PVC Pending: inspect StorageClass, provisioner health, requested capacity, access modes, quota, and storage topology.",
      "FailedMount or FailedAttachVolume: inspect CSI controller and node plugin logs, cloud volume state, node attachment limits, and events.",
      "Pod cannot schedule with volume: inspect volume zone constraints, node affinity, and volumeBindingMode.",
      "Permission denied inside the mounted directory: inspect filesystem ownership, container UID/GID, fsGroup behavior, and storage driver support.",
      "Data appears missing: verify the mounted claim and mount path, then check whether the application is writing to another directory.",
      "PVC deletion risks data loss: inspect PV reclaim policy, storage snapshots, backups, and application consistency before deletion."
    ],
    bestPractices: [
      "Use PVCs rather than hard-coding infrastructure-specific storage paths into application Pods.",
      "Select StorageClass, access mode, filesystem, and capacity based on workload requirements.",
      "Define reclaim policies deliberately and test recovery procedures.",
      "Monitor capacity, latency, IOPS, attachment failures, and storage growth.",
      "Use snapshots and application-consistent backups for databases and critical state.",
      "Validate restore procedures regularly; a successful volume mount is not proof of recoverability."
    ],
    securityConsiderations: [
      "Restrict access to PVs, PVCs, snapshots, and storage administration through RBAC.",
      "Use encryption at rest and in transit where supported by the storage backend.",
      "Apply filesystem permissions and non-root workload settings carefully.",
      "Protect snapshots and backups with separate access controls and retention policies.",
      "Securely erase or sanitize storage when required by the data classification and provider lifecycle."
    ]
  },

  "Horizontal Pod Autoscaler": {
    purpose: "The Horizontal Pod Autoscaler (HPA) automatically adjusts the replica count of a scalable workload such as a Deployment or StatefulSet. It periodically compares observed metrics with configured target values and updates the workload scale. HPA can use CPU, memory, and custom or external metrics when the required metrics APIs and adapters are available.",
    project: "During a product sale, catalog API traffic increases sharply. An HPA monitors average CPU utilization and scales the Deployment from two replicas toward a configured maximum of ten. When demand falls, it scales down gradually while respecting configured stabilization and scaling behavior.",
    workflow: [
      "The team configures resource requests on application containers because CPU utilization targets are calculated relative to requested CPU.",
      "The cluster runs Metrics Server for resource metrics, or an appropriate adapter for custom and external metrics.",
      "An HPA resource targets a scalable workload and defines minimum replicas, maximum replicas, and metric targets.",
      "The HPA controller periodically reads current metrics and compares them with desired target values.",
      "It calculates a recommended replica count and updates the target workload scale within the configured limits and behavior policies.",
      "The Deployment or StatefulSet controller creates or removes Pods to match the new replica count.",
      "The scheduler places additional Pods and the application must have sufficient cluster capacity to serve the increased workload."
    ],
    commands: [
      "kubectl get hpa -n production",
      "kubectl describe hpa catalog-api-hpa -n production",
      "kubectl top pods -n production",
      "kubectl top nodes",
      "kubectl get deployment catalog-api -n production",
      "kubectl get apiservices | findstr metrics",
      "kubectl get events -n production --sort-by=.metadata.creationTimestamp"
    ],
    mistakes: [
      "Configuring CPU utilization targets without setting CPU requests on the relevant containers.",
      "Assuming HPA itself creates worker nodes. Node autoscaling is a separate cluster capacity mechanism.",
      "Setting minReplicas too low for the application's baseline availability requirements.",
      "Setting maxReplicas higher than available cluster, database, or downstream service capacity can support.",
      "Using noisy or delayed custom metrics without stabilization, which can cause frequent scaling changes.",
      "Expecting HPA to scale a standalone Pod; it needs a scalable target such as a Deployment or StatefulSet.",
      "Assuming CPU scaling alone handles queue depth, request rate, or latency-driven workloads."
    ],
    configuration: [
      'HPA example: apiVersion: autoscaling/v2; kind: HorizontalPodAutoscaler; metadata: { name: catalog-api-hpa, namespace: production }; spec: { scaleTargetRef: { apiVersion: apps/v1, kind: Deployment, name: catalog-api }, minReplicas: 2, maxReplicas: 10, metrics: [{ type: Resource, resource: { name: cpu, target: { type: Utilization, averageUtilization: 70 } } }], behavior: { scaleDown: { stabilizationWindowSeconds: 300 } } }',
      "Define CPU requests in the Deployment Pod template; without requests, CPU utilization-based scaling may be undefined for the affected containers.",
      "Install and verify Metrics Server for resource metrics. Custom or external metrics require a compatible metrics adapter and API.",
      "Set minimum and maximum replicas according to availability, budget, downstream limits, and tested capacity."
    ],
    troubleshooting: [
      "HPA shows unknown metrics: inspect Metrics Server, metrics API availability, Pod resource requests, and adapter configuration.",
      "HPA does not scale up: inspect current metrics, target values, maxReplicas, scaling behavior, and HPA events.",
      "Desired replicas increase but Pods remain Pending: inspect node capacity, quotas, affinity, taints, PVC constraints, and cluster autoscaler behavior.",
      "Scaling oscillates: review metric noise, stabilization windows, scaling policies, and application startup time.",
      "CPU remains high after scaling: inspect per-Pod CPU usage, request settings, application bottlenecks, and downstream dependencies.",
      "Memory-based scaling does not behave as expected: verify memory metrics, target type, requests, and whether memory usage decreases when load falls."
    ],
    bestPractices: [
      "Set realistic CPU and memory requests based on load tests and observed production behavior.",
      "Choose scaling metrics that reflect the real bottleneck, such as CPU, queue depth, or request rate.",
      "Use minReplicas and maxReplicas that reflect service availability and downstream capacity.",
      "Configure scale-up and scale-down behavior to avoid harmful oscillation.",
      "Coordinate HPA with cluster autoscaling so additional Pods can obtain worker capacity.",
      "Monitor desired replicas, current replicas, metric availability, pending Pods, and application latency."
    ],
    securityConsiderations: [
      "Restrict who can modify HPA resources and the workloads they target.",
      "Protect custom metrics adapters and their credentials using least-privilege access.",
      "Prevent untrusted users from setting extreme replica limits that could create unexpected infrastructure cost.",
      "Use resource quotas and admission policies to constrain workload resource consumption.",
      "Monitor scaling events for unexpected load patterns that may indicate abuse or denial-of-service activity."
    ]
  }
};
