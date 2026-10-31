export type Problem = {
  issue: string;
  rootCause: string;
  solution: string;
};

export type NoteSection = {
  heading: string;
  explanation: string;
  steps: string[];
  commands?: string;
  config?: string;
  problems: Problem[];
};

export type NoteData = {
  title: string;
  description: string;
  sections: NoteSection[];
};

export const kubernetesTroubleshooting: NoteData = {
  title: "Kubernetes A–Z Complete Practical and Production Troubleshooting Notes",

  description:
    "Detailed Kubernetes notes covering architecture, cluster components, Pods, Deployments, ReplicaSets, Services, networking, DNS, Ingress, ConfigMaps, Secrets, storage, scheduling, probes, RBAC, security, autoscaling, monitoring, logs and real-world production troubleshooting.",

  sections: [
    {
      heading: "01. Kubernetes Fundamentals – What is Kubernetes?",
      explanation: `
Kubernetes is an open-source container orchestration platform.

Docker helps us build and run containers.

But imagine a company running 200 containers across 20 servers. Engineers must manage:

- Container deployment.
- Container failures.
- Application scaling.
- Network communication.
- Load balancing.
- Storage.
- Application updates.
- Rollbacks.
- Resource allocation.
- Service availability.

Managing all these manually becomes difficult.

Kubernetes automates many of these operations.

IMPORTANT CONCEPTS:

1. Cluster:
A Kubernetes cluster is a group of machines managed together.

2. Node:
A node is a machine that runs Kubernetes workloads.

3. Pod:
A Pod is the smallest deployable unit in Kubernetes. It can contain one or more closely related containers.

4. Deployment:
A Deployment manages the desired number of application replicas and supports controlled application updates.

5. ReplicaSet:
A ReplicaSet maintains the required number of matching Pods.

6. Service:
A Service provides a stable network endpoint for accessing a group of Pods.

7. Namespace:
A Namespace logically separates resources inside a cluster.

8. ConfigMap:
Stores non-sensitive application configuration.

9. Secret:
Stores sensitive configuration data. Kubernetes Secrets require suitable encryption, access controls and secure handling.

10. Ingress:
Provides HTTP/HTTPS routing into cluster services through an Ingress controller.

11. PersistentVolume:
Represents storage available to the cluster.

12. PersistentVolumeClaim:
A request for storage by an application.

REAL-TIME EXAMPLE:

A company has an online shopping application.

It contains:
- Frontend.
- Backend API.
- Payment service.
- Database.
- Redis cache.

Kubernetes can run these workloads, maintain their desired replicas, provide service discovery and help roll out new application versions.

IMPORTANT:
Kubernetes does not automatically fix every application problem. If application code is broken, Kubernetes may repeatedly restart the broken application.
      `,
      steps: [
        "Understand the application and its container images.",
        "Create Kubernetes Deployment definitions.",
        "Create Services for internal communication.",
        "Configure storage and application settings.",
        "Deploy resources to the cluster.",
        "Check Pod status and application logs.",
        "Verify service connectivity.",
        "Monitor the application after deployment."
      ],
      commands: `
kubectl version --client

kubectl cluster-info

kubectl get nodes

kubectl get namespaces

kubectl get pods -A

kubectl get deployments -A

kubectl get services -A
      `,
      problems: [
        {
          issue: "Application works in Docker but fails in Kubernetes.",
          rootCause:
            "Kubernetes introduces additional configuration such as Pod networking, service discovery, probes, security contexts, scheduling and resource limits.",
          solution:
            "Inspect Pod events, container logs, Deployment configuration, Services, networking and resource settings separately."
        },
        {
          issue: "Kubernetes cluster is available but application is unavailable.",
          rootCause:
            "The control plane may be healthy while application Pods, Services or external routing are failing.",
          solution:
            "Check workload health, Service endpoints, DNS, Ingress and the application itself."
        }
      ]
    },

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
    },

    {
      heading: "03. Kubernetes Installation and Cluster Access – kubeadm, Managed Clusters and kubeconfig",
      explanation: `
Kubernetes clusters can be created using different approaches.

SELF-MANAGED CLUSTER:
An organization manages control-plane and worker-node infrastructure.

KUBEADM:
A tool used to bootstrap Kubernetes clusters on supported Linux systems.

MANAGED KUBERNETES:
A cloud provider manages some or most control-plane operations.

Examples:
- Amazon EKS.
- Azure AKS.
- Google GKE.

LOCAL LEARNING CLUSTERS:
Tools such as Minikube and kind are commonly used for learning and local development.

KUBECONFIG:

kubectl uses kubeconfig to identify:
- Cluster endpoint.
- Authentication information.
- User.
- Context.
- Default namespace.

A context combines cluster, user and optional namespace information.

COMMON COMMANDS:

kubectl config get-contexts:
Lists available contexts.

kubectl config current-context:
Shows the active context.

kubectl config use-context:
Selects another context.

IMPORTANT PRODUCTION WARNING:

Always verify the active context before running destructive commands.

A command executed against production instead of a development cluster can cause serious impact.

Do not share kubeconfig files containing credentials or tokens.
      `,
      steps: [
        "Install a supported kubectl version.",
        "Obtain the correct cluster credentials.",
        "Check the kubeconfig location and permissions.",
        "List available contexts.",
        "Select the intended context.",
        "Verify the cluster endpoint and node list.",
        "Confirm permissions before changing resources."
      ],
      commands: `
kubectl version --client

kubectl config view

kubectl config get-contexts

kubectl config current-context

kubectl config use-context development

kubectl cluster-info

kubectl get nodes
      `,
      problems: [
        {
          issue: "The connection to the server was refused.",
          rootCause:
            "The API Server may be unavailable, kubeconfig may point to an incorrect endpoint or network access may be blocked.",
          solution:
            "Verify the current context, API Server endpoint, cluster status, DNS and network connectivity."
        },
        {
          issue: "You must be logged in to the server.",
          rootCause:
            "Authentication credentials may be missing, expired or incorrectly configured.",
          solution:
            "Refresh credentials through the approved cluster authentication process and verify the selected user."
        },
        {
          issue: "kubectl commands affect the wrong cluster.",
          rootCause:
            "The active kubeconfig context is not the intended environment.",
          solution:
            "Check kubectl config current-context and explicitly select the correct context before making changes."
        }
      ]
    },

    {
      heading: "04. Pods – Creation, Lifecycle and Troubleshooting",
      explanation: `
A Pod is the smallest deployable unit in Kubernetes.

A Pod usually contains one application container, but it can contain multiple containers that need to share resources.

Containers inside the same Pod share:
- Network namespace.
- Pod IP address.
- Localhost networking.
- Configured shared volumes.

Each container in a Pod has its own container filesystem and process environment.

POD LIFECYCLE:

Pending:
Pod has been accepted but is not fully running. It may be waiting for scheduling, image pulling or other setup.

Running:
At least one container is running or starting. This does not guarantee application readiness.

Succeeded:
All containers completed successfully.

Failed:
All containers terminated and at least one failed.

Unknown:
Kubernetes cannot determine the Pod state.

COMMON POD ISSUES:

CrashLoopBackOff:
Container repeatedly exits and Kubernetes delays subsequent restart attempts.

ImagePullBackOff:
Image pull attempts are failing and Kubernetes is backing off before retrying.

ErrImagePull:
An image pull attempt failed.

Pending:
Pod has not been scheduled or is waiting for required resources.

ContainerCreating:
Container setup is still in progress or blocked.

OOMKilled:
A container process was killed due to an out-of-memory condition.

CreateContainerConfigError:
Container configuration could not be prepared, often because a referenced ConfigMap or Secret is missing or invalid.

IMPORTANT:
Pod names are not stable across Deployment replacements. Use labels and higher-level controllers to manage applications.
      `,
      steps: [
        "List Pods in the correct namespace.",
        "Check Pod status and node assignment.",
        "Describe the affected Pod.",
        "Read current and previous container logs.",
        "Inspect container exit codes and restart counts.",
        "Check referenced images, ConfigMaps, Secrets and volumes.",
        "Check resource requests and limits.",
        "Fix the root cause and verify the replacement Pod."
      ],
      commands: `
kubectl get pods

kubectl get pods -A

kubectl get pods -o wide

kubectl describe pod <pod-name> -n <namespace>

kubectl logs <pod-name> -n <namespace>

kubectl logs <pod-name> -n <namespace> --previous

kubectl get pod <pod-name> -n <namespace> -o yaml

kubectl get events -n <namespace> --sort-by=.lastTimestamp
      `,
      problems: [
        {
          issue: "Pod is in CrashLoopBackOff.",
          rootCause:
            "The application process repeatedly exits because of startup errors, invalid configuration, failed dependencies or resource problems.",
          solution:
            "Read current and previous logs, inspect exit status and events, then correct the application or configuration issue."
        },
        {
          issue: "Pod remains in ContainerCreating.",
          rootCause:
            "Image pulling, volume mounting, CNI setup or container runtime preparation may be blocked.",
          solution:
            "Inspect Pod events and node health. Investigate the exact FailedMount, image, sandbox or runtime error."
        },
        {
          issue: "Pod is in OOMKilled state.",
          rootCause:
            "The container exceeded its effective memory allowance or was killed during host memory pressure.",
          solution:
            "Inspect container limits, memory usage and application behavior. Fix leaks or excessive allocation and set appropriate resource limits."
        }
      ]
    },

    {
      heading: "05. Deployments and ReplicaSets – Scaling and Rollouts",
      explanation: `
A Deployment manages stateless application Pods through ReplicaSets.

Instead of creating individual Pods manually, engineers define the desired number of replicas.

Example:
replicas: 3

Kubernetes attempts to maintain three matching Pods.

REPLICASET:
Maintains the requested number of matching Pods.

DEPLOYMENT:
Manages ReplicaSets and provides declarative updates and rollback capabilities.

DEPLOYMENT STRATEGIES:

RollingUpdate:
Gradually replaces old Pods with new Pods.

Recreate:
Terminates existing Pods before creating new ones.

IMPORTANT ROLLING UPDATE SETTINGS:

maxSurge:
Maximum additional Pods allowed above the desired replica count during an update.

maxUnavailable:
Maximum number of Pods allowed to be unavailable during an update.

READINESS:
A Pod should be ready before it receives normal Service traffic.

ROLLOUT COMMANDS:

rollout status:
Checks update progress.

rollout history:
Displays rollout history.

rollout undo:
Rolls back to a previous revision where available.

scale:
Changes the desired replica count.

IMPORTANT:
A successful rollout does not guarantee every business workflow works. Perform application-level smoke tests.
      `,
      steps: [
        "Create a Deployment with the correct image and replicas.",
        "Verify Pod creation.",
        "Check readiness and availability.",
        "Update the image or configuration.",
        "Monitor rollout progress.",
        "Investigate unavailable replicas or failed updates.",
        "Roll back if the new version is unsafe.",
        "Verify the application after rollout."
      ],
      commands: `
kubectl get deployments

kubectl describe deployment api

kubectl get replicasets

kubectl scale deployment api --replicas=5

kubectl set image deployment/api api=my-api:v2

kubectl rollout status deployment/api

kubectl rollout history deployment/api

kubectl rollout undo deployment/api
      `,
      config: `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
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
          image: nginx:1.27
          ports:
            - containerPort: 80
          readinessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 5
            periodSeconds: 10
      `,
      problems: [
        {
          issue: "Deployment rollout is stuck.",
          rootCause:
            "New Pods may fail to start, fail readiness checks, lack resources or be unable to pull the required image.",
          solution:
            "Check rollout status, Deployment conditions, ReplicaSets, Pod events and logs. Correct the failure or roll back."
        },
        {
          issue: "Deployment has fewer available replicas than expected.",
          rootCause:
            "Pods may be Pending, crashing, unready or unable to schedule.",
          solution:
            "Inspect all matching Pods and their events. Fix resource, image, application or scheduling issues."
        },
        {
          issue: "New version causes application errors.",
          rootCause:
            "The release may contain a regression or incompatible configuration.",
          solution:
            "Stop further rollout, verify the impact and roll back to a known-good revision when appropriate."
        }
      ]
    },

    {
      heading: "06. Kubernetes Services – ClusterIP, NodePort and LoadBalancer",
      explanation: `
A Kubernetes Service provides a stable network endpoint for accessing a changing set of Pods.

Pods can be replaced and their IP addresses can change. A Service provides a stable way to reach matching Pods.

SERVICE TYPES:

ClusterIP:
The default Service type. Exposes the Service inside the cluster.

NodePort:
Exposes the Service on a port on each node, subject to cluster networking configuration.

LoadBalancer:
Requests an external load balancer integration where supported.

ExternalName:
Maps a Service name to an external DNS name.

SELECTOR:
A Service uses label selectors to identify matching Pods.

ENDPOINTS:
The Service's backend endpoints show which Pods are selected and eligible for traffic.

PORT FIELDS:

port:
The port exposed by the Service.

targetPort:
The port on the selected Pod.

nodePort:
The node-level port used by NodePort Services.

IMPORTANT:
containerPort in a Pod specification documents a container port. It does not itself publish that port outside the Pod.

If the Service selector does not match Pod labels, the Service may have no backends.
      `,
      steps: [
        "Inspect the Service definition.",
        "Check the Service selector.",
        "Compare selector labels with Pod labels.",
        "Inspect EndpointSlices or endpoints.",
        "Verify port and targetPort.",
        "Test connectivity from another Pod.",
        "Check external load balancer integration if required."
      ],
      commands: `
kubectl get services

kubectl describe service api

kubectl get endpoints api

kubectl get endpointslices

kubectl get pods --show-labels

kubectl get service api -o yaml
      `,
      config: `
apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  type: ClusterIP
  selector:
    app: api
  ports:
    - name: http
      port: 80
      targetPort: 8080
      protocol: TCP
      `,
      problems: [
        {
          issue: "Service is not reaching Pods.",
          rootCause:
            "The Service selector may not match Pod labels, or the selected Pods may not be ready.",
          solution:
            "Compare Service selectors with Pod labels, inspect EndpointSlices and verify Pod readiness."
        },
        {
          issue: "Service returns connection refused.",
          rootCause:
            "The targetPort may be incorrect or the application may not be listening on that port.",
          solution:
            "Verify the application listening port and Service targetPort. Test from inside the cluster."
        },
        {
          issue: "LoadBalancer Service remains pending.",
          rootCause:
            "The cluster environment may not have a supported cloud load balancer integration or required permissions.",
          solution:
            "Inspect Service events and cloud integration configuration. Verify the cluster's load balancer implementation."
        }
      ]
    },

    {
      heading: "07. Kubernetes Networking – Pod IP, CNI and NetworkPolicy",
      explanation: `
Kubernetes networking provides communication between Pods and Services.

Important networking concepts:

POD NETWORK:
Each Pod receives an IP address through the cluster networking implementation.

CNI:
Container Network Interface plugins provide network configuration for Pods.

SERVICE NETWORK:
Services provide stable virtual access to selected backend Pods.

CLUSTER DNS:
Provides name resolution for Services and other cluster resources.

NETWORK POLICY:
Controls permitted network traffic when supported and enforced by the installed network plugin.

COMMON NETWORKING FLOW:

Client Pod
   |
   v
Kubernetes Service
   |
   v
Selected backend Pod
   |
   v
Application container

COMMON NETWORKING ISSUES:

1. Pod cannot reach another Pod.
2. Service has no endpoints.
3. DNS lookup fails.
4. NetworkPolicy blocks traffic.
5. CNI plugin has failed.
6. Application listens only on localhost.
7. Firewall or routing rules block traffic.

IMPORTANT:
A NetworkPolicy resource has no effect unless the cluster network implementation supports and enforces it.

Use the actual cluster CNI documentation when diagnosing plugin-specific behavior.
      `,
      steps: [
        "Check Pod IP addresses.",
        "Check whether the source and destination Pods are healthy.",
        "Inspect the Service and EndpointSlices.",
        "Test DNS resolution.",
        "Test TCP connectivity.",
        "Inspect NetworkPolicies.",
        "Investigate CNI and node networking if Pod-level connectivity fails."
      ],
      commands: `
kubectl get pods -o wide -A

kubectl get services -A

kubectl get endpointslices -A

kubectl get networkpolicies -A

kubectl describe networkpolicy <policy-name> -n <namespace>

kubectl exec -it <pod-name> -- sh
      `,
      config: `
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-api-from-frontend
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend
      ports:
        - protocol: TCP
          port: 8080
      `,
      problems: [
        {
          issue: "One Pod cannot connect to another Pod.",
          rootCause:
            "The application may not be listening, the destination Pod may be unhealthy, or CNI and network policy rules may block traffic.",
          solution:
            "Check Pod IPs, application listening address, NetworkPolicies and CNI health."
        },
        {
          issue: "NetworkPolicy blocks application traffic.",
          rootCause:
            "The policy may select the destination Pod but fail to allow the intended source or port.",
          solution:
            "Inspect policy selectors and allowed traffic. Add only the required ingress or egress rule."
        }
      ]
    },

    {
      heading: "08. Kubernetes DNS – CoreDNS and Service Name Resolution",
      explanation: `
Kubernetes provides DNS-based service discovery.

Applications can access Services using DNS names rather than hardcoded Pod IP addresses.

Example:
database.production.svc.cluster.local

For a Service in the same namespace, the short name may be sufficient:

database

CORE DNS:
CoreDNS is commonly used to provide DNS services inside Kubernetes clusters.

COMMON DNS ISSUES:

- CoreDNS Pods are not running.
- CoreDNS cannot reach the Kubernetes API.
- Pod DNS configuration is incorrect.
- Network policies block DNS traffic.
- Incorrect Service name.
- Incorrect namespace.
- Upstream DNS problems.

TROUBLESHOOTING:
First determine whether the failure is specific to one Pod, one namespace or the entire cluster.

If every Pod has DNS problems, investigate cluster DNS and networking.

If only one application fails, inspect its DNS settings and the hostname it uses.
      `,
      steps: [
        "Check CoreDNS Pods.",
        "Check the kube-system namespace events.",
        "Inspect CoreDNS logs.",
        "Run a DNS lookup from an affected Pod.",
        "Verify the Service name and namespace.",
        "Check network policy rules for DNS traffic.",
        "Verify external DNS forwarding if external names fail."
      ],
      commands: `
kubectl get pods -n kube-system -l k8s-app=kube-dns

kubectl get services -n kube-system

kubectl logs -n kube-system deployment/coredns

kubectl get configmap coredns -n kube-system

kubectl exec -it <pod-name> -- nslookup kubernetes.default

kubectl exec -it <pod-name> -- cat /etc/resolv.conf
      `,
      problems: [
        {
          issue: "Temporary failure in name resolution.",
          rootCause:
            "DNS service may be unavailable, blocked or incorrectly configured.",
          solution:
            "Check CoreDNS health, DNS traffic permissions, Pod resolver configuration and the CNI network."
        },
        {
          issue: "Service name does not resolve.",
          rootCause:
            "The application may use the wrong Service name or namespace.",
          solution:
            "Verify the Service exists and use the correct service DNS name."
        }
      ]
    },

    {
      heading: "09. Ingress – HTTP Routing and Ingress Controller",
      explanation: `
Ingress manages HTTP and HTTPS routing rules for services inside a Kubernetes cluster.

An Ingress resource describes routing rules.

An Ingress Controller implements those rules.

IMPORTANT:
Creating an Ingress resource alone does not make traffic work. A compatible Ingress Controller must be installed and configured.

COMMON INGRESS CONCEPTS:

Host:
The DNS hostname used for routing.

Path:
The URL path used to select a backend.

Backend:
The Service receiving the traffic.

TLS:
Configuration for HTTPS termination.

Ingress Controller:
The software that watches Ingress resources and configures routing.

COMMON ERRORS:

404:
The requested host or path may not match a configured route, or the application may return its own 404.

502:
The proxy may be unable to obtain a valid response from the backend.

503:
The backend may be unavailable or have no usable endpoints.

TLS errors:
The certificate may be missing, expired or incorrectly configured.

Always determine whether an error originates from the Ingress Controller or the backend application.
      `,
      steps: [
        "Check that the Ingress Controller is running.",
        "Inspect the Ingress resource.",
        "Verify host and path rules.",
        "Verify backend Service name and port.",
        "Check Service EndpointSlices.",
        "Inspect Ingress Controller logs.",
        "Check DNS and TLS configuration.",
        "Test the route from inside and outside the cluster."
      ],
      commands: `
kubectl get ingress -A

kubectl describe ingress <ingress-name> -n <namespace>

kubectl get pods -A

kubectl get services -A

kubectl get endpointslices -A

kubectl logs <ingress-controller-pod> -n <controller-namespace>
      `,
      config: `
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
spec:
  ingressClassName: nginx
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: api
                port:
                  number: 80
      `,
      problems: [
        {
          issue: "Ingress returns 404.",
          rootCause:
            "The host or path may not match the configured rule, the Ingress class may be incorrect or the backend application may return its own 404.",
          solution:
            "Inspect the route, controller logs and backend response. Verify host, path, IngressClass and Service configuration."
        },
        {
          issue: "Ingress returns 502.",
          rootCause:
            "The controller may be unable to connect to the backend or receive a valid response.",
          solution:
            "Check Service endpoints, target port, application readiness and backend logs."
        },
        {
          issue: "Ingress returns 503.",
          rootCause:
            "The controller may have no available backend endpoints or the backend service may be unavailable.",
          solution:
            "Inspect EndpointSlices and Pod readiness. Restore healthy backend replicas."
        }
      ]
    },

    {
      heading: "10. ConfigMaps and Secrets – Application Configuration",
      explanation: `
Applications need configuration such as:
- Database host.
- Application mode.
- Feature flags.
- External service URLs.
- API credentials.

ConfigMap:
Stores non-sensitive configuration.

Secret:
Stores sensitive configuration data such as passwords, tokens and certificates.

Kubernetes Secrets are not automatically a complete secret-management solution.

By default, Secret data is base64 encoded, which is not encryption.

Production security should include:
- Encryption at rest.
- RBAC restrictions.
- Secure secret delivery.
- Access auditing.
- Secret rotation.
- Avoiding secret exposure in logs.

CONFIGURATION DELIVERY:

Environment variables:
Configuration can be exposed to a container as environment variables.

Volume mounts:
ConfigMaps and Secrets can be mounted as files.

IMPORTANT:
A Pod generally needs to be recreated or restarted for environment-variable values sourced from an updated ConfigMap or Secret to take effect. Mounted ConfigMap and Secret files can update eventually, subject to mount and application behavior.

Do not print Secret values into terminal logs or commit them to Git.
      `,
      steps: [
        "Identify the required application configuration.",
        "Decide whether the value is sensitive.",
        "Store non-sensitive values in ConfigMaps.",
        "Store sensitive values in approved Secret mechanisms.",
        "Reference the correct names and keys in the Pod specification.",
        "Check Pod events for missing references.",
        "Roll out a controlled update when required.",
        "Verify application configuration without exposing credentials."
      ],
      commands: `
kubectl get configmaps -n production

kubectl describe configmap app-config -n production

kubectl get secrets -n production

kubectl describe secret app-secret -n production

kubectl rollout restart deployment/api -n production

kubectl describe pod <pod-name> -n production
      `,
      config: `
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: production
data:
  APP_MODE: production
  DATABASE_HOST: database
---
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
  namespace: production
type: Opaque
stringData:
  DATABASE_PASSWORD: replace-with-secret-managed-value
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  namespace: production
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
          envFrom:
            - configMapRef:
                name: app-config
          env:
            - name: DATABASE_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: app-secret
                  key: DATABASE_PASSWORD
      `,
      problems: [
        {
          issue: "CreateContainerConfigError occurs.",
          rootCause:
            "A referenced ConfigMap, Secret or required key may be missing or incorrectly named.",
          solution:
            "Describe the Pod and inspect events. Verify the referenced resource and key exist in the same namespace."
        },
        {
          issue: "Application still uses an old environment variable value.",
          rootCause:
            "The Pod may still be using the previous environment configuration.",
          solution:
            "Perform a controlled rollout restart after updating the configuration and verify the new Pod configuration."
        },
        {
          issue: "Secret value is exposed in a Git repository.",
          rootCause:
            "Sensitive data was committed as plain configuration.",
          solution:
            "Revoke or rotate the exposed credential, remove it from active configuration and history as appropriate, and move secret delivery to an approved secure mechanism."
        }
      ]
    },

    {
      heading: "11. Persistent Volumes and Persistent Volume Claims",
      explanation: `
Kubernetes storage is used when application data must survive Pod replacement.

IMPORTANT STORAGE CONCEPTS:

PersistentVolume (PV):
A cluster storage resource.

PersistentVolumeClaim (PVC):
A request for storage by an application.

StorageClass:
Defines how storage can be dynamically provisioned.

CSI:
Container Storage Interface. It provides a standard interface for storage systems to integrate with Kubernetes.

ACCESS MODES:

ReadWriteOnce:
The volume can be mounted read-write by a single node at a time, subject to the storage implementation's behavior.

ReadOnlyMany:
The volume can be mounted read-only by many nodes where supported.

ReadWriteMany:
The volume can be mounted read-write by many nodes where supported.

ReadWriteOncePod:
Restricts read-write mounting to a single Pod where supported.

IMPORTANT:
Access modes do not guarantee every storage system supports the same behavior. Verify the StorageClass and CSI driver capabilities.

COMMON PVC PROBLEMS:

- PVC remains Pending.
- No matching StorageClass.
- Insufficient storage capacity.
- Access mode unsupported.
- CSI driver failure.
- Volume attach failure.
- Volume mount failure.
- Permission denied inside the container.

Production databases need tested backup and restore procedures. A PVC is persistent storage, not a backup.
      `,
      steps: [
        "Check PVC status.",
        "Describe the PVC and inspect events.",
        "Check available PVs and StorageClasses.",
        "Check storage provisioner or CSI driver health.",
        "Check requested capacity and access mode.",
        "Inspect Pod mount events.",
        "Verify filesystem permissions inside the container.",
        "Test backup and restore separately."
      ],
      commands: `
kubectl get pv

kubectl get pvc -A

kubectl describe pvc <pvc-name> -n <namespace>

kubectl get storageclass

kubectl get pods -n kube-system

kubectl describe pod <pod-name> -n <namespace>
      `,
      config: `
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: database-pvc
  namespace: production
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: standard
  resources:
    requests:
      storage: 20Gi
      `,
      problems: [
        {
          issue: "PersistentVolumeClaim remains Pending.",
          rootCause:
            "No suitable storage provisioner or PV may be available, or the StorageClass, capacity or access mode may be incorrect.",
          solution:
            "Inspect PVC events, StorageClass configuration, PV availability and CSI provisioner health."
        },
        {
          issue: "Pod reports FailedMount.",
          rootCause:
            "The volume may not attach or mount because of storage driver, node, filesystem or permission problems.",
          solution:
            "Inspect Pod events, CSI driver logs, node conditions and storage backend status."
        },
        {
          issue: "Application cannot write to mounted storage.",
          rootCause:
            "The container process may not have the required filesystem permissions.",
          solution:
            "Check UID/GID, filesystem ownership and securityContext settings. Apply the minimum required permission changes."
        }
      ]
    },

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
      heading: "13. Liveness, Readiness and Startup Probes",
      explanation: `
Kubernetes probes check different aspects of application health.

LIVENESS PROBE:
Checks whether the container should be restarted because the application is unhealthy.

READINESS PROBE:
Checks whether the application is ready to receive normal Service traffic.

STARTUP PROBE:
Allows slow-starting applications time to initialize before liveness and readiness checks become active.

IMPORTANT DIFFERENCE:

Liveness failure:
Can cause the container to be restarted.

Readiness failure:
Removes the Pod from normal Service traffic while it is not ready.

Startup failure:
After the configured failure threshold is reached, the container can be restarted.

PROBE TYPES:

HTTP GET:
Requests an HTTP endpoint.

TCP Socket:
Checks whether a TCP connection can be established.

Exec:
Runs a command inside the container.

gRPC:
Checks a gRPC health endpoint when supported and configured.

COMMON PROBE MISTAKES:

- Wrong port.
- Wrong path.
- Health endpoint requires authentication.
- Probe starts too early.
- Timeout too short.
- Application startup takes longer than expected.
- Probe checks an external dependency unnecessarily.

A liveness probe should not restart an application simply because a temporary external dependency is unavailable, unless that behavior is deliberately required.
      `,
      steps: [
        "Identify which probe is failing.",
        "Read Pod events.",
        "Check probe path, port and command.",
        "Test the health endpoint from inside the Pod.",
        "Measure actual application startup time.",
        "Adjust thresholds and timing based on evidence.",
        "Verify Pod readiness and restart behavior."
      ],
      commands: `
kubectl describe pod <pod-name> -n <namespace>

kubectl get pod <pod-name> -n <namespace> -o yaml

kubectl logs <pod-name> -n <namespace>

kubectl get events -n <namespace> --sort-by=.lastTimestamp
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
          ports:
            - containerPort: 8080
          startupProbe:
            httpGet:
              path: /health
              port: 8080
            periodSeconds: 5
            failureThreshold: 30
          readinessProbe:
            httpGet:
              path: /ready
              port: 8080
            periodSeconds: 10
            timeoutSeconds: 3
          livenessProbe:
            httpGet:
              path: /health
              port: 8080
            periodSeconds: 20
            timeoutSeconds: 3
      `,
      problems: [
        {
          issue: "Liveness probe keeps restarting the application.",
          rootCause:
            "The endpoint may fail during normal startup or temporary load, or the probe may use incorrect timing.",
          solution:
            "Inspect probe events and application startup time. Configure a startup probe when appropriate and correct liveness thresholds."
        },
        {
          issue: "Pod is Running but not Ready.",
          rootCause:
            "The readiness check is failing, so Kubernetes does not consider the Pod ready for normal Service traffic.",
          solution:
            "Check readiness endpoint, application dependencies and probe configuration. Fix the readiness condition."
        },
        {
          issue: "Application is killed before completing startup.",
          rootCause:
            "Liveness checks may start before the application has completed initialization.",
          solution:
            "Configure a startup probe with a suitable startup window."
        }
      ]
    },

    {
      heading: "14. Namespaces and RBAC – Users, Roles and Permissions",
      explanation: `
Namespaces logically separate resources inside a Kubernetes cluster.

Example namespaces:
- development.
- testing.
- staging.
- production.

Namespaces help organize workloads and apply access controls, quotas and policies.

RBAC:
Role-Based Access Control manages who can perform which actions.

IMPORTANT RBAC OBJECTS:

Role:
Defines permissions within a namespace.

ClusterRole:
Defines permissions at cluster scope or reusable permissions.

RoleBinding:
Grants a Role or ClusterRole to a subject within a namespace.

ClusterRoleBinding:
Grants permissions at cluster scope.

ServiceAccount:
An identity used by workloads running inside the cluster.

COMMON RBAC VERBS:

get:
Read a single resource or resource details.

list:
List resources.

watch:
Watch resource changes.

create:
Create resources.

update:
Update resources.

patch:
Partially modify resources.

delete:
Delete resources.

IMPORTANT SECURITY PRINCIPLE:
Grant the minimum permissions required. Avoid using cluster-admin for ordinary application operations.
      `,
      steps: [
        "Identify the user or ServiceAccount.",
        "Identify the namespace and resource.",
        "Determine the required action.",
        "Inspect existing Roles and Bindings.",
        "Use kubectl auth can-i to test permissions.",
        "Grant only the required access.",
        "Verify the action using the intended identity."
      ],
      commands: `
kubectl get namespaces

kubectl get roles -A

kubectl get rolebindings -A

kubectl get clusterroles

kubectl get clusterrolebindings

kubectl auth can-i get pods -n production

kubectl auth can-i create deployments -n production
      `,
      config: `
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
  namespace: production
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["get", "list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: pod-reader-binding
  namespace: production
subjects:
  - kind: ServiceAccount
    name: monitoring
    namespace: production
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: pod-reader
      `,
      problems: [
        {
          issue: "User receives Forbidden when accessing a resource.",
          rootCause:
            "The user may be authenticated but does not have the required RBAC permission.",
          solution:
            "Check the identity and use kubectl auth can-i. Grant the minimum required permission through the appropriate RoleBinding or ClusterRoleBinding."
        },
        {
          issue: "Application cannot access Kubernetes API resources.",
          rootCause:
            "The Pod's ServiceAccount may lack the required RBAC permissions or may not be the intended identity.",
          solution:
            "Inspect the Pod ServiceAccount and its RoleBindings. Grant only the required API permissions."
        }
      ]
    },

    {
      heading: "15. Resource Quotas, LimitRanges and Autoscaling",
      explanation: `
Kubernetes provides resource management at different levels.

RESOURCE REQUESTS:
Used by the scheduler to decide whether a Pod can fit on a node.

RESOURCE LIMITS:
Restrict resource usage for containers.

RESOURCEQUOTA:
Limits aggregate resource consumption within a namespace.

LIMITRANGE:
Defines default or maximum/minimum resource constraints for resources in a namespace.

HORIZONTAL POD AUTOSCALER (HPA):
Adjusts the number of Pod replicas based on configured metrics.

VERTICAL POD AUTOSCALER (VPA):
Can recommend or adjust resource requests based on observed usage, depending on its configuration and operating mode.

CLUSTER AUTOSCALER:
Can add or remove cluster nodes in supported environments when capacity requirements change.

IMPORTANT:
HPA requires suitable metrics. CPU-based scaling commonly depends on resource requests because utilization is calculated relative to them.

Autoscaling does not fix inefficient application code or an unavailable dependency.
      `,
      steps: [
        "Inspect current resource requests and limits.",
        "Check namespace quota usage.",
        "Check LimitRange configuration.",
        "Check HPA status and current metrics.",
        "Verify metrics pipeline availability.",
        "Check node capacity and cluster autoscaling behavior.",
        "Tune requests and scaling thresholds using measured workloads."
      ],
      commands: `
kubectl get resourcequota -A

kubectl describe resourcequota <quota-name> -n <namespace>

kubectl get limitrange -A

kubectl describe limitrange <name> -n <namespace>

kubectl get hpa -A

kubectl describe hpa <hpa-name> -n <namespace>

kubectl top pods -A

kubectl top nodes
      `,
      config: `
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
      `,
      problems: [
        {
          issue: "HPA does not scale Pods.",
          rootCause:
            "Metrics may be unavailable, CPU requests may be missing or the scaling target may be incorrect.",
          solution:
            "Inspect HPA events and current metrics. Verify the metrics pipeline, resource requests and scaleTargetRef."
        },
        {
          issue: "Pod creation fails due to ResourceQuota.",
          rootCause:
            "The namespace has reached a configured resource or object-count quota.",
          solution:
            "Inspect quota usage and request capacity changes through the approved process. Right-size workloads where appropriate."
        }
      ]
    },

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
    },

    {
      heading: "17. Kubernetes Security – SecurityContext, Pod Security and Image Policies",
      explanation: `
Kubernetes security protects cluster resources, workloads and application data.

IMPORTANT SECURITY CONTROLS:

runAsNonRoot:
Requires a non-root process where applicable.

runAsUser:
Sets the process user ID.

runAsGroup:
Sets the primary group ID.

readOnlyRootFilesystem:
Makes the container root filesystem read-only.

allowPrivilegeEscalation:
Controls whether a process can gain additional privileges.

capabilities:
Controls Linux capabilities.

seccomp:
Applies system-call restrictions.

serviceAccountName:
Selects the ServiceAccount used by a Pod.

imagePullSecrets:
Provides registry credentials through Kubernetes Secret references.

POD SECURITY STANDARDS:
Kubernetes defines security profiles such as:
- Privileged.
- Baseline.
- Restricted.

A namespace can enforce an appropriate Pod Security Admission policy.

IMPORTANT:
Security configuration can break an application if it depends on root privileges or writable filesystem paths. Identify the exact requirement and provide the minimum safe permission.
      `,
      steps: [
        "Review image provenance and vulnerability status.",
        "Run workloads as non-root where possible.",
        "Set an appropriate ServiceAccount.",
        "Restrict Linux capabilities.",
        "Use read-only filesystems where practical.",
        "Configure resource and network restrictions.",
        "Protect Secrets and API credentials.",
        "Verify the workload still functions under the restricted configuration."
      ],
      commands: `
kubectl get pods -n production

kubectl get serviceaccounts -n production

kubectl describe pod <pod-name> -n production

kubectl get pod <pod-name> -n production -o yaml

kubectl auth can-i --list -n production
      `,
      config: `
apiVersion: v1
kind: Pod
metadata:
  name: secure-app
spec:
  serviceAccountName: app-service-account
  securityContext:
    runAsNonRoot: true
    runAsUser: 10001
    runAsGroup: 10001
  containers:
    - name: app
      image: my-app:v1
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop:
            - ALL
      volumeMounts:
        - name: tmp
          mountPath: /tmp
  volumes:
    - name: tmp
      emptyDir: {}
      `,
      problems: [
        {
          issue: "Pod fails after enabling runAsNonRoot.",
          rootCause:
            "The image may require root or may not have a suitable non-root user configuration.",
          solution:
            "Build the image to support a non-root user and provide appropriate ownership for writable paths."
        },
        {
          issue: "Container cannot write after enabling readOnlyRootFilesystem.",
          rootCause:
            "The application writes temporary files or runtime data into the container root filesystem.",
          solution:
            "Mount dedicated writable volumes or emptyDir paths only where required."
        }
      ]
    },

    {
      heading: "18. Kubernetes Monitoring and Logging – Metrics, Events and Application Logs",
      explanation: `
Monitoring helps engineers understand cluster and application health.

IMPORTANT SIGNALS:

CPU:
Shows processor usage and possible throttling.

Memory:
Shows memory usage and possible OOM conditions.

Pod restarts:
Can indicate application crashes, failed probes or resource issues.

Node readiness:
Shows whether nodes are healthy from Kubernetes' perspective.

API latency:
Shows how quickly application requests are served.

Error rate:
Shows how frequently requests fail.

Logs:
Provide application and component-level diagnostic information.

Events:
Show Kubernetes resource lifecycle and warning messages.

METRICS SERVER:
Provides resource metrics commonly used by kubectl top and HPA resource metrics.

PROMETHEUS:
Commonly used for collecting and querying metrics.

GRAFANA:
Commonly used for dashboards and visualizing metrics.

CENTRALIZED LOGGING:
Systems such as Loki or Elasticsearch-based solutions can collect logs from multiple workloads.

IMPORTANT:
Metrics, logs and events answer different questions. Use them together to build an incident timeline.
      `,
      steps: [
        "Identify the affected application and time window.",
        "Check Pod and node status.",
        "Check resource usage.",
        "Read application logs.",
        "Inspect Kubernetes events.",
        "Compare metrics before and during the incident.",
        "Correlate application errors with deployments and infrastructure changes.",
        "Add alerts for repeated or high-impact failures."
      ],
      commands: `
kubectl top nodes

kubectl top pods -A

kubectl get events -A --sort-by=.lastTimestamp

kubectl logs <pod-name> -n <namespace>

kubectl logs <pod-name> -n <namespace> --previous

kubectl describe node <node-name>

kubectl get pods -A -o wide
      `,
      problems: [
        {
          issue: "kubectl top returns metrics unavailable.",
          rootCause:
            "Metrics Server may be missing, unhealthy or unable to collect node metrics.",
          solution:
            "Inspect Metrics Server Pods and logs, check its APIService and resolve node metrics connectivity."
        },
        {
          issue: "Application logs disappear after Pod replacement.",
          rootCause:
            "Logs may exist only in the container's local runtime storage and are not being collected centrally.",
          solution:
            "Configure a cluster-level log collection system with appropriate retention and access controls."
        }
      ]
    },

    {
      heading: "19. Helm – Kubernetes Package Management",
      explanation: `
Helm is a package manager for Kubernetes.

It helps teams package and manage Kubernetes resources using charts.

IMPORTANT HELM CONCEPTS:

Chart:
A package containing Kubernetes templates and metadata.

Release:
An installed instance of a chart.

Values:
Configuration supplied to chart templates.

Templates:
Files used to generate Kubernetes resource manifests.

values.yaml:
Default chart configuration.

Chart.yaml:
Chart metadata and version information.

COMMON HELM OPERATIONS:

install:
Installs a chart.

upgrade:
Updates a release.

rollback:
Returns a release to a previous revision.

list:
Lists releases.

history:
Shows release history.

template:
Renders templates locally without installing.

IMPORTANT:
Helm release history and Kubernetes Deployment rollout history are different mechanisms. A Helm rollback can change multiple chart-managed resources, while a Deployment rollback applies to that Deployment's revisions.
      `,
      steps: [
        "Inspect chart metadata and default values.",
        "Review the values file.",
        "Render templates before deployment.",
        "Install or upgrade the release.",
        "Check release status.",
        "Inspect Kubernetes resources created by the chart.",
        "Rollback when a release is unsafe.",
        "Verify application behavior."
      ],
      commands: `
helm version

helm repo list

helm search repo nginx

helm list -A

helm show values <chart-name>

helm template my-release <chart-name> -f values.yaml

helm install my-release <chart-name> -f values.yaml

helm upgrade my-release <chart-name> -f values.yaml

helm history my-release

helm rollback my-release 1

helm status my-release
      `,
      problems: [
        {
          issue: "Helm upgrade fails.",
          rootCause:
            "Templates may be invalid, values may be incorrect, resources may conflict or the user may lack permissions.",
          solution:
            "Render templates, inspect Helm output and Kubernetes events, validate values and correct the resource or permission issue."
        },
        {
          issue: "Helm release is stuck in pending state.",
          rootCause:
            "A previous install or upgrade may not have completed successfully or release operations may be blocked.",
          solution:
            "Inspect Helm history and status, review Kubernetes resources and events, then follow a controlled recovery or rollback procedure."
        }
      ]
    },

    {
      heading: "20. Production Deployment Workflow – CI/CD to Kubernetes",
      explanation: `
A common production workflow:

1. Developer pushes code to Git.
2. CI pipeline starts.
3. Tests and code checks run.
4. Docker image is built.
5. Image is scanned.
6. Image is pushed to a container registry.
7. Deployment pipeline updates Kubernetes manifests or Helm values.
8. Kubernetes Deployment creates a new ReplicaSet.
9. Scheduler assigns Pods to nodes.
10. Kubelet starts containers.
11. Readiness checks determine when Pods can receive traffic.
12. Monitoring verifies application behavior.

IMPORTANT RELEASE PRACTICES:

- Use immutable image versions or digests.
- Keep deployment manifests in version control.
- Review configuration changes.
- Use separate configuration for environments.
- Protect production credentials.
- Use readiness and startup probes.
- Configure resource requests and limits.
- Use a safe rollout strategy.
- Monitor after deployment.
- Maintain a tested rollback process.

Kubernetes can manage the desired state of resources, but it cannot guarantee that a new application release is logically correct.
      `,
      steps: [
        "Commit application changes.",
        "Run tests and quality checks.",
        "Build and scan the container image.",
        "Push the approved image to the registry.",
        "Update the Deployment image or Helm values.",
        "Apply the approved configuration.",
        "Monitor rollout status.",
        "Verify Pods, Services and application endpoints.",
        "Monitor errors and latency.",
        "Rollback if the new release causes unacceptable impact."
      ],
      commands: `
kubectl apply -f deployment.yaml

kubectl get deployments -n production

kubectl rollout status deployment/api -n production

kubectl get pods -n production -o wide

kubectl get services -n production

kubectl logs deployment/api -n production

kubectl rollout undo deployment/api -n production
      `,
      problems: [
        {
          issue: "New deployment causes production downtime.",
          rootCause:
            "Readiness checks, rollout settings, capacity or application compatibility may be incorrect.",
          solution:
            "Stop further rollout, inspect unavailable replicas and application errors, then roll back or apply the verified fix."
        },
        {
          issue: "New image is deployed but old application behavior remains.",
          rootCause:
            "The Deployment may still reference an old image, a mutable tag may resolve unexpectedly or the rollout may not have completed.",
          solution:
            "Inspect the Deployment's image reference, Pod image IDs and rollout status. Prefer immutable release tags or digests."
        }
      ]
    },

    {
      heading: "21. Production Incident – CrashLoopBackOff",
      explanation: `
SCENARIO:

After a new release, the backend API Pod enters CrashLoopBackOff.

USER IMPACT:

API requests fail because the application does not stay running.

INVESTIGATION:

Step 1:
Identify the affected Pod.

Step 2:
Describe the Pod and inspect events.

Step 3:
Read the current logs.

Step 4:
Read previous container logs because the container may have already restarted.

Step 5:
Inspect exit code and restart count.

Step 6:
Check ConfigMaps, Secrets, environment variables and dependency connectivity.

Step 7:
Check whether a liveness probe is terminating the process.

EXAMPLE ROOT CAUSE:

The new application version requires DATABASE_HOST, but the Deployment does not provide it.

The application exits during startup.

Kubernetes repeatedly restarts the container.

FIX:

Add the required configuration through the correct ConfigMap or Secret reference and perform a controlled rollout.

VERIFICATION:

- New Pod starts.
- Restart count stops increasing.
- Readiness probe succeeds.
- API responds successfully.
- Database connection works.
      `,
      steps: [
        "Check Pod status and restart count.",
        "Run kubectl describe pod.",
        "Read current and previous logs.",
        "Inspect the exit code.",
        "Check probes and environment configuration.",
        "Verify dependency connectivity.",
        "Fix the identified root cause.",
        "Monitor the replacement Pod.",
        "Verify the application endpoint."
      ],
      commands: `
kubectl get pods -n production

kubectl describe pod <pod-name> -n production

kubectl logs <pod-name> -n production

kubectl logs <pod-name> -n production --previous

kubectl get pod <pod-name> -n production -o yaml

kubectl get events -n production --sort-by=.lastTimestamp

kubectl rollout status deployment/api -n production
      `,
      problems: [
        {
          issue: "Pod repeatedly enters CrashLoopBackOff.",
          rootCause:
            "The main process repeatedly exits because of an application error, missing configuration, dependency failure or failed probe.",
          solution:
            "Inspect previous logs, Pod events, exit status, probes and configuration. Fix the underlying issue before relying on restarts."
        }
      ]
    },

    {
      heading: "22. Production Incident – ImagePullBackOff and ErrImagePull",
      explanation: `
SCENARIO:

A new Deployment is created, but its Pods show ImagePullBackOff.

The application never starts because Kubernetes cannot download the container image.

COMMON ERROR REASONS:

- Image name is incorrect.
- Image tag does not exist.
- Private registry authentication is missing.
- imagePullSecrets is incorrect.
- Registry is unavailable.
- DNS or firewall blocks registry access.
- Host architecture is incompatible with the image.

INVESTIGATION:

1. Describe the Pod.
2. Read the exact image-pull error.
3. Verify the image repository and tag.
4. Check registry authentication.
5. Check imagePullSecrets.
6. Check node connectivity to the registry.
7. Verify image platform compatibility.

IMPORTANT:
ImagePullBackOff is a retry/backoff state. The actual cause is usually explained in the Pod events.
      `,
      steps: [
        "Identify the affected Pod.",
        "Run kubectl describe pod.",
        "Read the exact Failed to pull image event.",
        "Verify repository and tag.",
        "Verify registry permissions.",
        "Check imagePullSecrets.",
        "Check registry DNS and network access.",
        "Verify image architecture.",
        "Confirm that the Pod starts after correction."
      ],
      commands: `
kubectl describe pod <pod-name> -n production

kubectl get pods -n production

kubectl get secrets -n production

kubectl get serviceaccount default -n production -o yaml

kubectl get events -n production --sort-by=.lastTimestamp
      `,
      config: `
apiVersion: v1
kind: Pod
metadata:
  name: private-api
  namespace: production
spec:
  imagePullSecrets:
    - name: registry-credentials
  containers:
    - name: api
      image: registry.example.com/team/api:v2
      imagePullPolicy: IfNotPresent
      `,
      problems: [
        {
          issue: "ErrImagePull: repository does not exist or may require authorization.",
          rootCause:
            "The repository path may be wrong, the repository may be private or authentication may be missing.",
          solution:
            "Verify the exact image path and configure valid registry credentials with the correct pull permissions."
        },
        {
          issue: "ImagePullBackOff after using a new tag.",
          rootCause:
            "The requested tag may not have been pushed to the registry.",
          solution:
            "Verify the tag in the registry and correct the Deployment image reference."
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
    },

    {
      heading: "24. Production Incident – Service Not Reaching Pods",
      explanation: `
SCENARIO:

The backend Pod is Running and Ready, but requests through the Kubernetes Service fail.

COMMON ROOT CAUSES:

- Service selector does not match Pod labels.
- Service has no endpoints.
- targetPort is wrong.
- Application listens on a different port.
- Application binds only to localhost.
- NetworkPolicy blocks traffic.
- Application is not ready.

INVESTIGATION:

1. Inspect Service YAML.
2. Inspect Pod labels.
3. Compare selector and labels.
4. Inspect EndpointSlices.
5. Check targetPort.
6. Test connectivity directly from a diagnostic Pod.
7. Inspect NetworkPolicies.

EXAMPLE:

Service selector:
app: backend

Pod label:
app: api

These do not match.

The Service cannot select the Pod.

FIX:

Correct the selector or Pod labels using a controlled deployment change.
      `,
      steps: [
        "Check Service configuration.",
        "Check Pod labels.",
        "Compare selector and labels.",
        "Inspect EndpointSlices.",
        "Check application listening port.",
        "Test connectivity from another Pod.",
        "Inspect NetworkPolicies.",
        "Verify requests through the Service."
      ],
      commands: `
kubectl get svc api -n production -o yaml

kubectl get pods -n production --show-labels

kubectl get endpointslices -n production

kubectl describe svc api -n production

kubectl get networkpolicies -n production

kubectl get pods -n production -o wide
      `,
      problems: [
        {
          issue: "Service has no endpoints.",
          rootCause:
            "The Service selector does not match eligible Pods, or matching Pods are not ready.",
          solution:
            "Correct selector labels and readiness configuration. Confirm EndpointSlices contain the expected backend addresses."
        },
        {
          issue: "Service forwards to the wrong port.",
          rootCause:
            "Service targetPort does not match the application's actual listening port.",
          solution:
            "Verify the application port and update targetPort to the correct value."
        }
      ]
    },

    {
      heading: "25. Production Incident – Node NotReady",
      explanation: `
SCENARIO:

A worker node changes to NotReady.

Pods on that node may become unavailable or experience disruption.

POSSIBLE CAUSES:

- Kubelet stopped.
- Container runtime failed.
- Node memory pressure.
- Node disk pressure.
- Network connectivity failure.
- API Server communication failure.
- Node operating system problem.

INVESTIGATION:

1. Check node conditions.
2. Describe the node.
3. Inspect node events.
4. Check kubelet service.
5. Check container runtime.
6. Check memory and disk.
7. Check node network connectivity.

IMPORTANT:
Do not immediately delete all Pods on the node. Understand workload controllers, storage attachments and disruption requirements before recovery actions.

Managed Kubernetes providers may restrict direct access to control-plane and worker components. Use provider-supported node diagnostics where applicable.
      `,
      steps: [
        "Identify the NotReady node.",
        "Describe node conditions.",
        "Inspect node events.",
        "Check kubelet status.",
        "Check container runtime status.",
        "Check memory, disk and filesystem.",
        "Investigate node network connectivity.",
        "Restore node health or follow the node replacement process.",
        "Verify affected workloads recover."
      ],
      commands: `
kubectl get nodes -o wide

kubectl describe node <node-name>

kubectl get pods -A -o wide

# Linux worker node
sudo systemctl status kubelet

sudo journalctl -u kubelet --since "30 minutes ago"

sudo systemctl status containerd

free -h

df -h
      `,
      problems: [
        {
          issue: "Node condition shows Ready=False.",
          rootCause:
            "Kubelet may be unhealthy, the node may be disconnected or a critical node component may have failed.",
          solution:
            "Inspect node conditions and kubelet logs, restore runtime or network health and verify the node becomes Ready."
        },
        {
          issue: "Node shows DiskPressure.",
          rootCause:
            "Node storage is approaching configured pressure thresholds.",
          solution:
            "Identify filesystem usage, container image storage, logs and local data. Perform controlled cleanup and expand capacity if necessary."
        }
      ]
    },

    {
      heading: "26. Production Incident – CoreDNS and Cluster DNS Failure",
      explanation: `
SCENARIO:

Applications cannot resolve Kubernetes Service names.

Example error:
Temporary failure in name resolution.

IMPACT:

Backend services cannot connect to databases or internal APIs using service DNS names.

INVESTIGATION:

1. Check CoreDNS Pod status.
2. Check CoreDNS logs.
3. Check the kube-dns Service.
4. Test DNS from an affected Pod.
5. Inspect /etc/resolv.conf.
6. Check DNS network policy.
7. Check CNI and node networking.

If all namespaces are affected, investigate cluster DNS and network infrastructure.

If only one Pod is affected, check its Pod configuration, DNS policy and local network restrictions.
      `,
      steps: [
        "Check CoreDNS Pods.",
        "Check kube-dns Service.",
        "Read CoreDNS logs.",
        "Run nslookup from an affected Pod.",
        "Inspect Pod DNS configuration.",
        "Check network policies and CNI health.",
        "Verify internal and external name resolution."
      ],
      commands: `
kubectl get pods -n kube-system -l k8s-app=kube-dns

kubectl get svc kube-dns -n kube-system

kubectl logs -n kube-system deployment/coredns

kubectl get configmap coredns -n kube-system

kubectl exec -it <pod-name> -- nslookup kubernetes.default

kubectl exec -it <pod-name> -- cat /etc/resolv.conf
      `,
      problems: [
        {
          issue: "CoreDNS Pods are CrashLoopBackOff.",
          rootCause:
            "CoreDNS configuration, permissions, API connectivity or resource constraints may be causing startup failure.",
          solution:
            "Inspect CoreDNS logs and events, validate the Corefile and investigate API connectivity and resources."
        }
      ]
    },

    {
      heading: "27. Kubernetes Troubleshooting Command Reference",
      explanation: `
A production engineer should know how to use kubectl effectively.

GET:
Lists resources.

DESCRIBE:
Shows detailed resource information and events.

LOGS:
Reads container logs.

EXEC:
Runs a command inside a container.

APPLY:
Creates or updates resources from configuration files.

DELETE:
Deletes resources.

EDIT:
Opens a live resource for editing. Use carefully in production.

PATCH:
Applies a targeted change.

DIFF:
Shows the differences between the live configuration and a proposed configuration.

ROLLOUT:
Manages Deployment rollout operations.

TOP:
Displays resource usage when metrics are available.

OUTPUT FORMATS:

-o wide:
Shows additional columns.

-o yaml:
Prints resource YAML.

-o json:
Prints resource JSON.

-o name:
Prints resource names.

--all-namespaces:
Includes resources from all namespaces.

-n:
Selects a namespace.

-l:
Selects resources by label.

--watch:
Watches for changes.

IMPORTANT:
kubectl delete, apply, patch and rollout operations can affect production. Confirm context, namespace and resource before executing.
      `,
      steps: [
        "Check the current context.",
        "Select the correct namespace.",
        "List the affected resources.",
        "Describe the resource.",
        "Read logs and events.",
        "Inspect the YAML configuration.",
        "Apply the smallest verified change.",
        "Check status and verify the application."
      ],
      commands: `
kubectl config current-context

kubectl get pods -A

kubectl get pods -n production -o wide

kubectl describe pod <pod-name> -n production

kubectl logs <pod-name> -n production

kubectl logs <pod-name> -n production --previous

kubectl exec -it <pod-name> -n production -- sh

kubectl get deployment api -n production -o yaml

kubectl diff -f deployment.yaml

kubectl apply -f deployment.yaml

kubectl rollout status deployment/api -n production

kubectl get events -A --sort-by=.lastTimestamp

kubectl top nodes

kubectl top pods -A
      `,
      problems: [
        {
          issue: "Engineer changes the wrong resource or namespace.",
          rootCause:
            "The active context or namespace was not verified before running a command.",
          solution:
            "Check the active context and namespace before every production change. Use explicit -n values for important operations."
        }
      ]
    },

    {
      heading: "28. Production Engineer RCA – Complete Incident Investigation Method",
      explanation: `
A Kubernetes production engineer should not randomly restart Pods.

Follow a repeatable incident investigation process.

1. UNDERSTAND IMPACT:
Which application is failing? How many users are affected? Is the issue total or partial?

2. RECORD THE TIME:
Record when the incident started and identify recent deployments or configuration changes.

3. IDENTIFY THE FAILURE LAYER:
- Cluster.
- Node.
- Pod.
- Container.
- Service.
- DNS.
- Ingress.
- Storage.
- Application dependency.

4. COLLECT EVIDENCE:
- Pod status.
- Events.
- Container logs.
- Previous logs.
- Node conditions.
- Resource usage.
- Service endpoints.
- Network policies.
- Deployment history.

5. FORM A HYPOTHESIS:
Use actual error messages and evidence.

6. TEST THE HYPOTHESIS:
Use safe, targeted commands.

7. RECOVER:
Apply the approved fix or rollback.

8. VERIFY:
Check readiness, traffic, error rate and business functionality.

9. PREVENT:
Improve monitoring, configuration validation, deployment testing and recovery procedures.

10. DOCUMENT:
Record impact, timeline, root cause, recovery and preventive action.

IMPORTANT:
A Pod being Running does not prove the application is healthy.
A Deployment being Available does not prove every business workflow is working.
A successful rollout does not prove the release is free of bugs.
      `,
      steps: [
        "Confirm incident impact and severity.",
        "Record incident start time.",
        "Check cluster and node status.",
        "Identify affected resources.",
        "Collect events, logs and resource metrics.",
        "Compare the current release with the last known-good release.",
        "Test the suspected root cause.",
        "Apply the smallest safe fix or rollback.",
        "Verify application and business functionality.",
        "Document the incident and prevention actions."
      ],
      commands: `
kubectl config current-context

kubectl get nodes

kubectl get pods -A -o wide

kubectl get deployments -A

kubectl get services -A

kubectl get events -A --sort-by=.lastTimestamp

kubectl logs <pod-name> -n <namespace> --previous

kubectl describe pod <pod-name> -n <namespace>

kubectl top nodes

kubectl top pods -A

kubectl get endpointslices -A
      `,
      problems: [
        {
          issue: "Engineer repeatedly deletes and recreates failing Pods.",
          rootCause:
            "The actual application, configuration, storage or infrastructure problem is not being investigated.",
          solution:
            "Collect evidence first, identify the root cause and correct the controller-managed workload configuration."
        },
        {
          issue: "Incident returns after recovery.",
          rootCause:
            "The immediate symptom was removed, but the underlying failure condition remains.",
          solution:
            "Complete root-cause analysis and add preventive controls such as alerts, tests, resource tuning or configuration validation."
        }
      ]
    }
  ]
};
