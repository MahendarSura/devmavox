# Kubernetes Real-Time Application Delivery Workflow

**Workflow 02 | Container Orchestration, Deployment and Production Operations**

This workflow explains how a containerized application moves from source code into a Kubernetes cluster. It uses Amazon EKS as the managed Kubernetes example, Docker for image creation and Amazon ECR as the container registry. The same Kubernetes resources can be adapted to other managed or self-managed clusters.

## 1. Production Architecture and Request Flow

A production application commonly contains a frontend, backend API and database. Kubernetes manages application workloads through Pods and controllers. Services provide stable network access to changing Pods. An Ingress Controller or Gateway can route external requests into the cluster.

Typical request flow:

1. A user accesses the application through a DNS name.
2. DNS resolves to the public load balancer or ingress endpoint.
3. The Ingress Controller routes the request to a Kubernetes Service.
4. The Service selects healthy backend Pods using labels.
5. A backend Pod processes the request.
6. The backend accesses the database through its configured endpoint.
7. The response returns through the same application path.

A Deployment manages the desired number of application replicas. A ReplicaSet maintains the required Pod count. Pods are replaceable units, so persistent state should not be stored only in a container's writable filesystem.

## 2. Prerequisites and Tool Installation

Prepare access to the cloud account and cluster. Install the required tools and configure credentials with least-privilege access.

### Tools

- AWS CLI for AWS account operations.
- kubectl for Kubernetes API operations.
- eksctl or approved infrastructure-as-code tooling for EKS provisioning.
- Docker or another OCI-compatible image builder.
- Helm for packaging and installing Kubernetes applications.
- Git for source control.

### Verification commands

```bash
aws --version
kubectl version --client
docker --version
helm version
git --version
aws sts get-caller-identity
```

Confirm that the AWS identity is the intended deployment identity. Do not use root credentials for routine deployment tasks.

## 3. Git Repository and Kubernetes Manifests

Keep application source code and deployment configuration version-controlled.

```text
application/
├── frontend/
│   └── Dockerfile
├── backend/
│   └── Dockerfile
├── k8s/
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── secret-example.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   └── ingress.yaml
├── helm/
│   └── application/
├── Jenkinsfile
└── README.md
```

Separate reusable manifests from environment-specific values. Use a review process for changes to production deployment configuration. Never commit actual credentials in Kubernetes Secret manifests.

## 4. Build and Test Application Images

The CI pipeline should test the source before packaging it into images. Use versioned tags that identify the source revision.

### Commands

```bash
docker build -t myapp-backend:v1 ./backend
docker build -t myapp-frontend:v1 ./frontend
docker image ls
docker image inspect myapp-backend:v1
```

Validate that the image starts locally and exposes the expected application port. Confirm that the health endpoint works and that required runtime configuration is provided externally.

Use multi-stage builds, minimal approved base images, non-root users and `.dockerignore` files. Scan image layers and application dependencies before publishing.

## 5. Create an Amazon ECR Repository

Amazon Elastic Container Registry stores container images that EKS worker nodes can retrieve.

### Example commands

```bash
aws sts get-caller-identity

aws ecr create-repository \
  --repository-name myapp-backend \
  --image-scanning-configuration scanOnPush=true

aws ecr create-repository \
  --repository-name myapp-frontend \
  --image-scanning-configuration scanOnPush=true
```

Authenticate Docker to ECR. Replace the account ID, region and repository values with the actual environment values.

```bash
aws ecr get-login-password --region REGION |
docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com
```

Tag and push the images:

```bash
docker tag myapp-backend:v1 ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/myapp-backend:v1
docker push ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/myapp-backend:v1

docker tag myapp-frontend:v1 ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/myapp-frontend:v1
docker push ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/myapp-frontend:v1
```

Verify that the expected tags exist in ECR. Ensure the worker-node IAM role or configured image-pull identity has the required repository permissions.

## 6. Provision and Connect to an EKS Cluster

Create an EKS cluster using approved infrastructure-as-code or your organization's cluster provisioning process. Plan the VPC, subnets, security groups, cluster endpoint access, node capacity, IAM roles and availability zones before provisioning.

A simplified `eksctl` example:

```bash
eksctl create cluster \
  --name devmavox-production \
  --region REGION \
  --nodes 3 \
  --managed
```

This is an example, not a complete production network design. Review the selected Kubernetes version, subnet placement, node instance types, access model and cost before creating a real cluster.

Configure kubectl:

```bash
aws eks update-kubeconfig \
  --region REGION \
  --name devmavox-production

kubectl config current-context
kubectl get nodes -o wide
kubectl cluster-info
```

Confirm that the current context points to the intended cluster. Restrict production cluster access and use named identities with auditable permissions.

## 7. Create a Namespace and Application Configuration

Namespaces separate application resources and help teams organize access and resource policies.

### namespace.yaml

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
```

### configmap.yaml

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: backend-config
  namespace: production
data:
  DATABASE_HOST: database.production.svc.cluster.local
  DATABASE_PORT: "5432"
  LOG_LEVEL: info
```

ConfigMaps are intended for non-sensitive configuration. Use a Kubernetes Secret or an external secret manager for credentials. Kubernetes Secrets are base64-encoded in their standard representation; base64 is not encryption. Configure encryption at rest, access restrictions and secret rotation.

## 8. Deploy the Backend Using a Deployment

A Deployment describes the desired application state. Kubernetes creates or updates ReplicaSets to maintain the configured number of Pods.

### backend-deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
        - name: backend
          image: ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com/myapp-backend:v1
          ports:
            - containerPort: 8080
          envFrom:
            - configMapRef:
                name: backend-config
          readinessProbe:
            httpGet:
              path: /health
              port: 8080
            periodSeconds: 10
            timeoutSeconds: 3
          livenessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 20
            periodSeconds: 20
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
```

Replace the example registry image with the real image URI. Add the required secret reference and ensure the application actually supports the health endpoint. A startup probe may be appropriate for applications that need a long initialization period.

## 9. Configure Kubernetes Services

A Service gives a stable virtual IP and DNS name to a group of matching Pods.

### backend-service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: backend
  namespace: production
spec:
  type: ClusterIP
  selector:
    app: backend
  ports:
    - name: http
      port: 80
      targetPort: 8080
```

The selector must match the Pod labels. `port` is the Service port; `targetPort` is the port on the application container.

### Validation commands

```bash
kubectl get services -n production
kubectl get endpoints -n production
kubectl get pods -n production --show-labels
kubectl describe service backend -n production
```

If the Service has no endpoints, compare its selector with the labels on ready Pods.

## 10. Configure Frontend and External Access

Deploy the frontend using its own Deployment and Service. Use ClusterIP for internal communication. Expose external traffic through a supported Ingress Controller or Gateway implementation.

### Example Ingress resource

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: application-ingress
  namespace: production
spec:
  ingressClassName: nginx
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend
                port:
                  number: 80
```

An Ingress object alone does not create a working ingress controller. Install and configure the controller, load balancer integration, DNS and TLS certificates. The `nginx` ingress class must match the controller installed in the cluster.

## 11. Health Checks and Resource Management

- **Readiness probe:** Determines whether a Pod should receive Service traffic.
- **Liveness probe:** Determines whether a container should be restarted.
- **Startup probe:** Gives a slow-starting application time to initialize before liveness checks take effect.
- **Requests:** Help the scheduler decide where a Pod can fit.
- **Limits:** Restrict resource consumption.

Choose probe paths and timings based on application behavior. A liveness probe should not fail simply because a temporary downstream dependency is unavailable, unless restarting the application is the correct recovery action.

Inspect resource usage:

```bash
kubectl top nodes
kubectl top pods -n production
kubectl describe pod POD_NAME -n production
```

Metrics Server or another compatible metrics provider must be installed for `kubectl top` to work.

## 12. Persistent Storage

Use PersistentVolumes and PersistentVolumeClaims for workloads that require durable storage. In EKS, storage may be provided through an appropriate CSI driver and a StorageClass backed by a supported AWS storage service.

### Example PVC

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: application-data
  namespace: production
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```

Verify that the cluster has a suitable StorageClass and CSI driver. Select access modes and storage behavior based on the application's architecture. Stateful databases often require managed database services or carefully designed StatefulSets and backup processes.

## 13. Autoscaling and Availability

A HorizontalPodAutoscaler adjusts the number of replicas based on metrics. It requires resource requests and a working metrics API for CPU-based scaling.

### Example HPA

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend
  minReplicas: 3
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

For node-level capacity, configure an approved node autoscaling solution. Use multiple availability zones where appropriate, PodDisruptionBudgets and topology spread constraints to reduce the impact of node or zone failures.

## 14. CI/CD with Jenkins

A typical Jenkins pipeline for Kubernetes delivery contains:

1. Checkout the approved Git branch.
2. Run code quality checks and unit tests.
3. Build application artifacts.
4. Build frontend and backend images.
5. Scan dependencies and images.
6. Push immutable image tags to ECR.
7. Update the deployment manifest or Helm values with the new image tag.
8. Deploy to a test namespace.
9. Wait for rollout completion.
10. Run smoke tests and promote through an approval-controlled production stage.

### Deployment commands

```bash
kubectl apply -f k8s/
kubectl rollout status deployment/backend -n production
kubectl get pods -n production -o wide
kubectl get services -n production
```

Use a dedicated Jenkins deployment identity with only the permissions required for its target namespace. Do not place long-lived cloud keys directly in a Jenkinsfile.

## 15. Helm-Based Deployment

Helm packages Kubernetes manifests into reusable charts. A chart can define Deployments, Services, Ingress, ConfigMaps and other resources with configurable values.

### Commands

```bash
helm create myapp
helm lint ./myapp
helm template myapp ./myapp -n production
helm upgrade --install myapp ./myapp \
  --namespace production \
  --create-namespace \
  --values values-production.yaml

helm list -n production
helm status myapp -n production
```

Review rendered manifests before applying them. Keep production values under review and do not store plaintext credentials in chart values.

## 16. Monitoring and Logging

Monitor cluster and application health using Prometheus, Grafana and an appropriate logging platform.

Important signals include:

- Pod restarts and readiness failures.
- Deployment availability and rollout status.
- CPU and memory utilization.
- Node pressure and capacity.
- Request latency and error rates.
- Service and ingress availability.
- Database connectivity and connection usage.

### Diagnostic commands

```bash
kubectl get pods -n production
kubectl get events -n production --sort-by=.metadata.creationTimestamp
kubectl logs deployment/backend -n production --tail=100
kubectl logs POD_NAME -n production --previous
kubectl describe pod POD_NAME -n production
```

Centralize logs where possible and include request identifiers so engineers can correlate application logs with metrics and traces.

## 17. Security and Access Control

Use least-privilege RBAC for Kubernetes users and service accounts. Use cloud IAM integration for workloads that need AWS permissions. Restrict network traffic with NetworkPolicies where the cluster networking implementation supports them.

Production controls should include:

- Private or restricted cluster API access where appropriate.
- IAM roles and short-lived credentials.
- Approved container registries and image scanning.
- Non-root containers and restricted Linux capabilities.
- Secret encryption, access control and rotation.
- Resource quotas and namespace limits.
- Audit logging and change review.
- Regular Kubernetes and node security updates.

## 18. Production Deployment Validation

Before promoting a release:

1. Confirm the image tag and source commit.
2. Validate the Kubernetes manifests.
3. Confirm ConfigMaps and Secret references.
4. Apply changes to the intended namespace.
5. Wait for Deployment rollout completion.
6. Confirm all desired replicas are ready.
7. Verify Service endpoints and ingress routing.
8. Run application smoke tests.
9. Check logs, latency and error rates.
10. Confirm monitoring alerts remain healthy.

### Commands

```bash
kubectl diff -f k8s/
kubectl apply -f k8s/
kubectl rollout status deployment/backend -n production
kubectl get deployment backend -n production
kubectl get pods -n production -o wide
kubectl get endpoints -n production
```

## 19. Common Production Issues and Troubleshooting

**ImagePullBackOff**

Check the image name, tag, registry availability, node network access and ECR image-pull permissions. Inspect Pod events for the exact pull failure.

**CrashLoopBackOff**

Inspect current and previous container logs, exit code, startup command, configuration, missing secrets, probes and memory limits.

**Pending Pods**

Check scheduler events, node capacity, resource requests, taints, tolerations, node selectors, affinity and PVC binding.

**Deployment does not become Ready**

Inspect Pod readiness conditions, application health endpoint, startup time, image version, dependencies and resource constraints.

**Service has no endpoints**

Compare Service selectors with Pod labels. Confirm Pods are ready and that the target port matches the container's listening port.

**Ingress returns 404 or 502**

Check Ingress class, controller status, host/path rules, backend Service, endpoints, target port, DNS and TLS configuration.

**Node becomes NotReady**

Inspect node conditions, kubelet status, networking, disk pressure, memory pressure and cloud instance health. Follow the cluster's node replacement and workload recovery process.

## 20. Rollback and Incident Recovery

If a release causes production failures, stop further rollout and establish the customer impact. Inspect deployment history and identify the last known healthy revision.

### Rollback commands

```bash
kubectl rollout history deployment/backend -n production
kubectl rollout undo deployment/backend -n production
kubectl rollout status deployment/backend -n production
kubectl get pods -n production
```

After rollback, validate application behavior, Service endpoints, error rates and latency. Remember that rolling back a Deployment does not automatically reverse database schema changes. Use backward-compatible database migrations and a tested recovery plan.

## 21. End-to-End Delivery Checklist

- Source code is reviewed and merged.
- Automated tests pass.
- Images are built, scanned and tagged.
- Images are available in ECR.
- Cluster and namespace are correct.
- Configuration and secrets are available.
- Deployments and Services are healthy.
- Ingress and DNS work as expected.
- Monitoring and logging are operational.
- Rollback procedures have been tested.
- Deployment evidence and release details are documented.

The objective is a repeatable, secure and observable Kubernetes delivery process that can be operated and recovered safely.
