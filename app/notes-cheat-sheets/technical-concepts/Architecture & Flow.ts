
export interface NoteProblem {
  issue: string;
  solution: string;
}

export interface NoteSection {
  heading: string;
  explanation: string;
  steps: string[];
  commands?: string;
  config?: string;
  problems: NoteProblem[];
}

export interface NoteData {
  title: string;
  description: string;
  sections: NoteSection[];
}

const architectureFlowData: NoteData = {
  title: "Architecture & Flow",
  description:
    "Explore production-grade DevOps architectures, understand component responsibilities and communication paths, and learn how enterprise applications are built, deployed, operated and monitored.",

  sections: [
    {
      heading: "1. End-to-End CI/CD Architecture – Enterprise Application Delivery",
      explanation: `OVERVIEW:

An enterprise CI/CD architecture connects source-code management, automated build systems, quality and security validation, artifact storage, deployment platforms and production monitoring.

The objective is to create a controlled and repeatable path from developer changes to production releases.

A typical architecture uses GitHub or GitLab for source control, Jenkins or GitHub Actions for automation, Maven or npm for builds, SonarQube for code-quality analysis, Docker for container packaging, Nexus or Amazon ECR for artifact storage, Kubernetes for orchestration, ArgoCD for GitOps deployment and Prometheus/Grafana for observability.

ARCHITECTURE COMPONENTS AND RESPONSIBILITIES:

1. Developer Workstation:
Developers write application code, run local tests, manage dependencies and commit changes. They should validate code before creating a pull request.

2. Git Repository:
GitHub, GitLab or Bitbucket stores source code, branches, tags, pull requests and commit history. Branch protection and review policies control how changes reach protected branches.

3. Webhook / Event Integration:
A repository event can notify the CI/CD platform when a commit, pull request or release is created. The platform validates the event and identifies the required pipeline.

4. CI/CD Orchestrator:
Jenkins controller or another CI platform schedules pipeline execution. Build agents execute checkout, compilation, testing, scanning and packaging tasks.

5. Build System:
Maven, Gradle, npm or another build tool resolves dependencies and generates the application artifact. Build reproducibility depends on controlled tool versions and dependency management.

6. Automated Testing:
Unit tests validate individual components. Integration tests validate interactions with dependencies. End-to-end tests validate complete workflows. Test reports should be retained for investigation.

7. Code Quality and Security:
SonarQube analyzes code quality and configured rules. Dependency scanners, secret scanners and static security testing tools identify additional risks. A quality gate can prevent an unsafe artifact from progressing.

8. Container Build:
Docker or BuildKit packages the application and runtime dependencies into an image. Multi-stage builds separate build-time dependencies from runtime contents.

9. Artifact Registry:
Nexus Repository, Amazon ECR, Harbor or another registry stores versioned artifacts and container images. Production should deploy an exact tested image rather than rebuild a different artifact.

10. Deployment Configuration:
Kubernetes manifests, Helm charts or Kustomize overlays describe the desired application state. Environment-specific configuration should be managed separately from the application binary.

11. GitOps Controller:
ArgoCD continuously compares the desired configuration stored in Git with the live Kubernetes state. It can synchronize changes according to configured policies and permissions.

12. Kubernetes Cluster:
The cluster schedules Pods, maintains desired replica counts, exposes Services and supports application rollout and recovery.

13. Observability:
Prometheus collects metrics, Grafana visualizes them, Alertmanager routes alerts and logging systems collect application and infrastructure logs.

14. Incident Response:
Operations teams investigate alerts, inspect logs and traces, identify affected releases, mitigate impact and use a tested recovery or rollback procedure.

COMPLETE RELEASE FLOW:

Developer writes code
    |
    v
GitHub Pull Request
    |
    v
Code Review and Approval
    |
    v
Merge to Protected Branch
    |
    v
Webhook / CI Trigger
    |
    v
Jenkins Build Agent
    |
    +----> Checkout
    |
    +----> Dependency Resolution
    |
    +----> Compile / Build
    |
    +----> Unit / Integration Tests
    |
    +----> SonarQube Quality Gate
    |
    +----> Security and Dependency Scans
    |
    v
Docker Image Build
    |
    v
Image Registry
    |
    v
GitOps Deployment Configuration Update
    |
    v
ArgoCD Synchronization
    |
    v
Kubernetes Deployment
    |
    v
Readiness / Smoke Tests
    |
    v
Production Traffic
    |
    +----> Metrics
    +----> Logs
    +----> Traces
    +----> Alerts

IMPORTANT ARCHITECTURE DECISIONS:

CI versus CD:
CI validates changes and produces trusted artifacts. CD delivers those artifacts to environments. Keep deployment permissions and approval policies separate where required.

CI versus GitOps:
CI builds and publishes artifacts. A GitOps controller such as ArgoCD reconciles Kubernetes configuration from Git. ArgoCD is not a replacement for the build and test stages.

Artifact Promotion:
Build once and promote the same immutable artifact through Development, QA, Staging and Production. Use release metadata to identify exactly which source commit produced the image.

Configuration Management:
Application configuration, secrets, certificates and environment-specific values should not be embedded in container images. Use a secure configuration and secrets-management approach.

Release Strategy:
Rolling updates, blue-green deployment and canary deployment are different release strategies. Choose based on application architecture, traffic controls, state compatibility and recovery requirements.

HIGH AVAILABILITY:
Run critical CI/CD and registry services with appropriate backups and recovery plans. Kubernetes applications should use suitable replicas, resource capacity, disruption budgets and multi-zone placement where the platform supports it.

SECURITY BOUNDARIES:
Developers should not automatically receive unrestricted production access. Use scoped credentials, workload identities, RBAC, protected branches, signed or verified artifacts where appropriate, and auditable approvals.

PRODUCTION SUCCESS CRITERIA:
A pipeline is not complete merely because a build is green. The release should be verified using deployment status, readiness, smoke tests, error rate, latency and service-level objectives.`,

      steps: [
        "Step 1 – Developer creates a feature branch and implements the application change. Local tests and static checks should run before submitting a pull request.",
        "Step 2 – Developer pushes the branch to GitHub and opens a pull request. Reviewers inspect code, tests, configuration changes and security implications.",
        "Step 3 – After the required checks and approvals pass, the change is merged into the protected branch. The repository sends a webhook event to Jenkins.",
        "Step 4 – Jenkins validates the event, checks out the exact commit and schedules the build on an agent with the required tools.",
        "Step 5 – The build stage resolves dependencies using a lock file or controlled dependency versions and creates the application artifact.",
        "Step 6 – Unit and integration tests execute. Failed tests should stop the pipeline and publish useful reports.",
        "Step 7 – SonarQube and security tools analyze the code. The pipeline checks the configured quality gate and vulnerability policy before continuing.",
        "Step 8 – Docker builds the runtime image. Use a multi-stage Dockerfile, a non-root runtime user and a minimal trusted base image.",
        "Step 9 – The pipeline tags the image with a release version and commit identifier, authenticates securely and pushes it to the registry.",
        "Step 10 – The deployment configuration repository is updated with the exact image reference. Keep environment-specific configuration and approval controls in that repository.",
        "Step 11 – ArgoCD detects the desired-state change in Git. It compares the desired configuration with the live Kubernetes resources and synchronizes according to its configured policy.",
        "Step 12 – Kubernetes creates or updates ReplicaSets and Pods. The scheduler assigns Pods to nodes and kubelet starts the containers.",
        "Step 13 – Readiness probes and deployment health checks determine whether the new Pods can receive traffic. A smoke test verifies the application endpoint.",
        "Step 14 – Prometheus collects metrics and Grafana displays service health. Alertmanager routes configured alerts to the responsible team.",
        "Step 15 – If production health degrades, the team investigates the release, traffic, logs and dependencies. Recovery may involve reverting the Git configuration, rolling back the application version or applying a separate data-recovery plan."
      ],

      commands: `GIT – REPOSITORY OPERATIONS

git clone https://github.com/ORG/APP.git

git checkout -b feature/payment-api

git add .

git commit -m "Add payment API"

git push origin feature/payment-api

JENKINS – PIPELINE INSPECTION

# Open Jenkins dashboard.
# Select the application pipeline.
# Inspect the latest build and stage results.
# Open Console Output for detailed logs.

# Jenkins CLI example, if CLI access is enabled:
java -jar jenkins-cli.jar -s http://JENKINS_URL/ -auth USER:TOKEN get-job my-pipeline

SONARQUBE – QUALITY CHECK

# Example Maven analysis command.
mvn clean verify sonar:sonar \
  -Dsonar.projectKey=my-application \
  -Dsonar.host.url=https://SONAR_HOST

# Supply the SonarQube token through a secure CI credential.
# Do not place access tokens directly in source code or shell history.

DOCKER – BUILD AND PUSH

docker build -t REGISTRY_HOST/myapp:1.0 .

docker image inspect REGISTRY_HOST/myapp:1.0

docker login REGISTRY_HOST

docker push REGISTRY_HOST/myapp:1.0

KUBERNETES – DEPLOYMENT STATUS

kubectl get deployments -n production

kubectl get pods -n production -o wide

kubectl rollout status deployment/myapp -n production

kubectl get services -n production

kubectl get endpointslices -n production

ARGOCD – APPLICATION STATUS

argocd app list

argocd app get myapp

argocd app diff myapp

argocd app sync myapp

argocd app history myapp

PROMETHEUS AND GRAFANA

# Verify monitoring resources.
kubectl get pods -n monitoring

kubectl get services -n monitoring

kubectl get servicemonitors -A

# Open the configured Prometheus and Grafana interfaces.
# Check target health, dashboards, alert rules and application metrics.

IMPORTANT:
Replace ORG, APP, JENKINS_URL, SONAR_HOST, REGISTRY_HOST, namespace and application names with actual environment values. Commands require the relevant CLI tools, permissions and credentials. Do not expose tokens in terminal history or CI logs.`,

      config: `EXAMPLE 1 – ENTERPRISE CI/CD ARCHITECTURE

                    DEVELOPER
                        |
                        v
                 GITHUB / GITLAB
                        |
                 Pull Request Review
                        |
                        v
                   JENKINS CI
                        |
           +------------+------------+
           |            |            |
           v            v            v
         BUILD         TEST       SECURITY
           |            |            |
           +------------+------------+
                        |
                        v
                    SONARQUBE
                        |
                   Quality Gate
                        |
                        v
                  DOCKER BUILD
                        |
                        v
                 IMAGE REGISTRY
                   (ECR / Nexus)
                        |
                        v
              GITOPS CONFIG REPOSITORY
                        |
                        v
                     ARGOCD
                        |
                        v
                 KUBERNETES CLUSTER
                        |
             +----------+----------+
             |          |          |
             v          v          v
           Pod 1      Pod 2      Pod 3
             |          |          |
             +----------+----------+
                        |
                        v
                PRODUCTION SERVICE
                        |
          +-------------+-------------+
          |             |             |
          v             v             v
      PROMETHEUS      LOGGING       TRACING
          |
          v
       GRAFANA
          |
          v
     ALERTMANAGER
          |
          v
      OPERATIONS TEAM

EXAMPLE 2 – JENKINS PIPELINE

pipeline {
    agent any

    environment {
        REGISTRY = "registry.example.com"
        IMAGE = "myapp"
        IMAGE_TAG = "\${GIT_COMMIT}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }

        stage('Quality Analysis') {
            steps {
                withSonarQubeEnv('sonarqube-server') {
                    sh 'mvn sonar:sonar'
                }
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t $REGISTRY/$IMAGE:$IMAGE_TAG .'
            }
        }

        stage('Publish Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'registry-credentials',
                        usernameVariable: 'REG_USER',
                        passwordVariable: 'REG_PASS'
                    )
                ]) {
                    sh '''
                        echo "$REG_PASS" |
                        docker login "$REGISTRY" \
                          -u "$REG_USER" --password-stdin
                        docker push "$REGISTRY/$IMAGE:$IMAGE_TAG"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Build and image publishing completed'
        }
        failure {
            echo 'Pipeline failed. Review stage logs.'
        }
        always {
            cleanWs()
        }
    }
}

This example demonstrates CI and image publishing. Configure Jenkins tools, SonarQube server, credentials, registry permissions and the agent. A separate controlled process should update the GitOps deployment repository.

EXAMPLE 3 – GITOPS APPLICATION CONFIGURATION

apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: argocd

spec:
  project: default

  source:
    repoURL: https://github.com/ORG/gitops-config.git
    targetRevision: main
    path: environments/production/myapp

  destination:
    server: https://kubernetes.default.svc
    namespace: production

  syncPolicy:
    automated:
      prune: false
      selfHeal: true

    syncOptions:
      - CreateNamespace=true

This example assumes ArgoCD is installed and has access to the Git repository. Automated sync should be enabled only when repository protection, review, permissions and recovery procedures are appropriate. Keeping prune disabled avoids automatic deletion of resources removed from Git until the team explicitly approves that behavior.

EXAMPLE 4 – RELEASE TRACEABILITY

For every production release, retain:

- Git repository and commit SHA.
- Pull request and approval reference.
- Pipeline run ID.
- Build and test reports.
- Code-quality and security scan results.
- Container image repository and immutable digest.
- Deployment configuration commit.
- Kubernetes rollout revision.
- Release timestamp and responsible identity.
- Smoke-test and production verification results.

PRODUCTION BEST PRACTICES:

- Build once and promote the same tested artifact.
- Use immutable image digests for critical production releases.
- Protect deployment configuration repositories.
- Separate CI credentials from production deployment credentials.
- Apply least-privilege RBAC.
- Use environment approvals where required.
- Store secrets outside Git.
- Use signed artifacts and image verification where supported.
- Configure deployment health checks and smoke tests.
- Retain build, deployment and audit history.
- Define rollback and database migration compatibility procedures.
- Monitor release health against service-level objectives.`,

      problems: [
        {
          issue: "Jenkins pipeline is successful but ArgoCD does not deploy the new version.",
          solution: "Check whether the GitOps configuration repository was updated with the new image tag or digest. Run argocd app get and argocd app diff. Verify the repository URL, target branch, path, credentials and sync policy. CI publishing an image does not automatically update GitOps configuration."
        },
        {
          issue: "ArgoCD application shows OutOfSync.",
          solution: "Inspect the desired-versus-live difference using argocd app diff. Identify whether the change is intentional, caused by manual cluster modification, generated fields or incorrect manifests. Correct the Git source or use a controlled synchronization process."
        },
        {
          issue: "SonarQube quality gate blocks the pipeline.",
          solution: "Inspect the analysis report and quality-gate conditions. Review bugs, vulnerabilities, security hotspots, coverage and duplication. Fix the underlying issues or request a documented policy exception through the approved process."
        },
        {
          issue: "Container registry rejects the image push.",
          solution: "Verify registry hostname, repository existence, authentication, token permissions, image naming and network access. Confirm that the pipeline identity has push permission and that the target repository policy permits the image."
        },
        {
          issue: "Kubernetes deployment is updated but Pods are not becoming Ready.",
          solution: "Inspect the new ReplicaSet, Pod events, container logs and readiness probe responses. Verify image pull access, resource availability, application configuration, dependencies and Service selectors."
        },
        {
          issue: "Production release has increased error rates.",
          solution: "Correlate the error increase with the release timestamp, image digest and deployment revision. Check application logs, traces, dependency health and traffic changes. Stop further rollout and execute the approved rollback or mitigation procedure."
        },
        {
          issue: "Production environment uses a different image from the one tested in staging.",
          solution: "Use the same immutable image digest across environments. Track artifact provenance and verify the deployed digest with kubectl describe pod or the container runtime tooling."
        },
        {
          issue: "Pipeline secrets appear in logs.",
          solution: "Rotate exposed credentials immediately. Use Jenkins credential bindings or a secrets manager, restrict job permissions, avoid shell tracing around secrets and audit pipeline logs for additional exposure."
        },
        {
          issue: "ArgoCD repeatedly changes resources back after manual kubectl edits.",
          solution: "This may be expected when self-heal is enabled. Treat Git as the source of truth, make intended changes in the GitOps repository and use approved emergency procedures for temporary production interventions."
        },
        {
          issue: "Rollback restores the old image but the application still fails.",
          solution: "Inspect database migrations, external configuration, secrets, persistent data and dependent services. Application rollback alone cannot reverse incompatible database schema changes or external state changes. Use backward-compatible migration and recovery plans."
        }
      ]
    },

    {
      heading: "2. Kubernetes Cluster Architecture – Control Plane, Worker Nodes and Request Flow",
      explanation: `OVERVIEW:

A Kubernetes cluster consists of a control plane and worker nodes. The control plane manages cluster state and workload scheduling. Worker nodes execute application Pods.

Kubernetes uses a declarative architecture. Users submit desired configuration to the API Server. Controllers continuously observe the cluster and reconcile actual state with the desired state.

CONTROL PLANE ARCHITECTURE:

1. API Server:
The API Server is the central interface for Kubernetes resources. kubectl, controllers, operators and other clients communicate with it through the Kubernetes API.

It performs authentication, authorization and admission processing. Accepted resource changes are persisted through the configured storage layer.

2. etcd:
etcd is a distributed consistent key-value store. Kubernetes stores API resource state and cluster configuration in etcd.

etcd is critical infrastructure. Protect it with encryption, access restrictions, reliable storage, backups and tested restoration procedures.

3. Scheduler:
The Scheduler watches for Pods that do not yet have a Node assignment. It filters nodes that cannot satisfy the Pod's requirements and scores eligible nodes.

Scheduling decisions may consider:
- CPU and memory requests.
- Node selectors and node affinity.
- Pod affinity and anti-affinity.
- Taints and tolerations.
- Topology spread constraints.
- Volume topology and storage requirements.
- Scheduling policies and resource availability.

The scheduler assigns a Pod to a Node. It does not start the container itself.

4. Controller Manager:
The controller manager runs control loops that watch resource state and make corrective changes.

Examples:
- Deployment controller manages Deployment rollout.
- ReplicaSet controller maintains the desired number of matching Pods.
- Node controller monitors Node health.
- Job controller manages Job execution.

5. Cloud Controller Manager:
When configured for a cloud environment, this component integrates Kubernetes with cloud APIs. It may manage cloud load balancers, routes and node-related information.

WORKER NODE ARCHITECTURE:

1. Kubelet:
Kubelet is the node agent. It watches Pods assigned to its Node and ensures the containers are running according to the Pod specification.

It communicates with the container runtime through the Container Runtime Interface (CRI).

2. Container Runtime:
The runtime downloads images, creates containers and manages their execution. Common examples include containerd and CRI-O.

3. kube-proxy:
In clusters that use kube-proxy, it maintains node-level network rules that implement Service traffic forwarding. Some modern dataplanes provide Service functionality without kube-proxy.

4. CNI Plugin:
The Container Network Interface plugin configures Pod networking. It provides Pod connectivity according to the cluster network implementation. Examples of CNI-based solutions include Cilium, Calico and Flannel.

5. Node Resources:
Worker nodes provide CPU, memory, local storage and network resources. Scheduler decisions depend on available capacity and Pod resource requests.

POD NETWORKING:

Each Pod receives its own cluster network identity according to the cluster networking implementation. Containers within the same Pod share the Pod network namespace and can communicate through localhost.

Pod-to-Pod communication is implemented by the cluster networking layer. Service discovery and routing allow workloads to communicate without depending on changing Pod IP addresses.

DNS AND SERVICE DISCOVERY:

CoreDNS commonly provides cluster DNS. Kubernetes Services create stable service identities and DNS names for workloads.

For example, a Service called backend in the production namespace can be addressed by its service DNS name from other Pods.

SERVICE TYPES:

ClusterIP:
Exposes a Service inside the cluster.

NodePort:
Exposes a Service on a port on each Node, subject to the cluster's networking configuration.

LoadBalancer:
Requests an external load balancer through a supported implementation or cloud integration.

ExternalName:
Maps a Service name to an external DNS name.

INGRESS AND GATEWAY:

Ingress provides HTTP and HTTPS routing rules. It requires an Ingress controller to implement the routing behavior.

Gateway API provides a more expressive resource model for traffic management when supported by the cluster and its Gateway implementation.

STORAGE ARCHITECTURE:

PersistentVolumes represent storage resources. PersistentVolumeClaims request storage. StorageClasses describe dynamic provisioning policies. CSI drivers integrate external storage systems.

A Pod can be recreated on a different Node, so storage behavior depends on the access mode, topology, volume implementation and application design.

SECURITY ARCHITECTURE:

- RBAC controls API permissions.
- ServiceAccounts provide workload identities.
- NetworkPolicies restrict network traffic when supported by the CNI.
- Pod Security Admission enforces configured Pod security standards.
- Secrets store sensitive configuration, but encryption and access controls must be configured appropriately.
- Admission controllers and policy engines can enforce additional rules.

COMPLETE REQUEST FLOW:

External client
    |
    v
DNS resolution
    |
    v
Load Balancer
    |
    v
Ingress / Gateway
    |
    v
Kubernetes Service
    |
    v
Service Dataplane
    |
    +------> Pod A
    |
    +------> Pod B
    |
    +------> Pod C

A Service provides stable access to eligible backends. The exact packet path depends on the cluster's CNI, dataplane, cloud integration and traffic policy.

CONTROL PLANE RECONCILIATION FLOW:

kubectl apply
    |
    v
API Server
    |
    +----> Authentication
    +----> Authorization
    +----> Admission
    |
    v
etcd
    |
    v
Controllers
    |
    v
ReplicaSet / Pod Objects
    |
    v
Scheduler
    |
    v
Node Assignment
    |
    v
Kubelet
    |
    v
Container Runtime
    |
    v
Running Container

HIGH AVAILABILITY:

Production control planes commonly use multiple control-plane instances and a highly available API endpoint. Worker workloads should be distributed across suitable failure domains.

Use PodDisruptionBudgets, topology spread constraints, readiness probes, capacity planning and tested recovery procedures where appropriate.

IMPORTANT:
Kubernetes is a reconciliation system, not simply a command that starts containers. Its controllers, scheduler, kubelet, runtime and networking components cooperate continuously to maintain the requested state.`,

      steps: [
        "Step 1 – Configure kubectl with the correct cluster context and verify the API Server endpoint. Confirm the user or service identity has the required RBAC permissions.",
        "Step 2 – Submit a Deployment manifest. The API Server authenticates the request, authorizes the action, applies admission processing and persists the accepted state.",
        "Step 3 – The Deployment controller observes the resource and creates or updates a ReplicaSet to represent the required Pod template and replica count.",
        "Step 4 – The ReplicaSet controller creates Pod objects until the desired replica count is represented.",
        "Step 5 – The Scheduler watches unscheduled Pods, filters unsuitable nodes and selects an eligible Node based on scheduling constraints and available resources.",
        "Step 6 – The kubelet on the selected Node observes the Pod assignment and coordinates the container runtime through CRI.",
        "Step 7 – The runtime pulls the required image, prepares the container filesystem and starts the container process.",
        "Step 8 – The CNI plugin configures the Pod's network connectivity. DNS and Service mechanisms make communication between workloads possible.",
        "Step 9 – Kubelet evaluates startup, readiness and liveness probes. Pod readiness determines whether it should receive normal Service traffic.",
        "Step 10 – A Service selects matching Pod endpoints using labels and provides a stable network identity.",
        "Step 11 – Ingress or Gateway routing directs external HTTP/HTTPS requests to the appropriate Service.",
        "Step 12 – Controllers continue reconciliation. If a Pod is deleted, a ReplicaSet can create a replacement. If a Node becomes unavailable, recovery depends on node health detection, scheduling capacity, storage and workload configuration.",
        "Step 13 – Monitoring systems observe API Server health, node capacity, Pod restarts, scheduling delays, network behavior and application performance.",
        "Step 14 – Cluster administrators review audit logs, security policies, etcd backups and upgrade status to maintain the cluster."
      ],

      commands: `CONTROL PLANE AND CLUSTER

kubectl cluster-info
# Display cluster endpoint information

kubectl get nodes -o wide
# List Nodes and their addresses

kubectl describe node NODE_NAME
# Inspect Node conditions, capacity and allocated resources

kubectl get componentstatuses
# Deprecated in modern Kubernetes; do not depend on this command for health checks.

kubectl get --raw='/readyz?verbose'
# Inspect API Server readiness checks, if authorized

kubectl get namespaces
# List namespaces

POD AND DEPLOYMENT

kubectl get deployments -A

kubectl get replicasets -A

kubectl get pods -A -o wide

kubectl describe pod POD_NAME -n NAMESPACE

kubectl logs POD_NAME -n NAMESPACE

kubectl logs POD_NAME -c CONTAINER_NAME -n NAMESPACE

kubectl get events -n NAMESPACE --sort-by=.metadata.creationTimestamp

SCHEDULING

kubectl describe pod POD_NAME -n NAMESPACE

kubectl get nodes --show-labels

kubectl get pods -o wide -n NAMESPACE

# Inspect Pending Pod events for scheduling failures.
# Check requests, taints, tolerations, selectors and volume constraints.

NETWORKING

kubectl get services -A

kubectl get endpointslices -A

kubectl get ingress -A

kubectl get networkpolicies -A

kubectl get pods -n kube-system -o wide

kubectl get services -n kube-system

DNS TEST FROM A DEBUG POD

kubectl run dns-test \
  --image=busybox:1.36 \
  --restart=Never \
  --rm -it \
  -- nslookup kubernetes.default.svc.cluster.local

STORAGE

kubectl get persistentvolumes

kubectl get persistentvolumeclaims -A

kubectl get storageclasses

kubectl describe pvc PVC_NAME -n NAMESPACE

RESOURCE USAGE

kubectl top nodes

kubectl top pods -A

# Metrics Server or a compatible metrics provider must be available.

SECURITY

kubectl auth can-i get pods -n production

kubectl auth can-i create deployments -n production

kubectl get serviceaccounts -A

kubectl get roles,rolebindings -A

kubectl get clusterroles,clusterrolebindings

IMPORTANT:
Use cluster-specific administration tools for etcd health, backups, certificates and control-plane processes. Managed Kubernetes services may not expose control-plane hosts directly. Some commands require additional permissions or installed components.`,

      config: `EXAMPLE 1 – KUBERNETES DEPLOYMENT

apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: production
  labels:
    app: frontend

spec:
  replicas: 3

  selector:
    matchLabels:
      app: frontend

  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0

  template:
    metadata:
      labels:
        app: frontend

    spec:
      containers:
        - name: frontend
          image: registry.example.com/frontend:1.0

          ports:
            - name: http
              containerPort: 3000

          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"

          startupProbe:
            httpGet:
              path: /health
              port: http
            failureThreshold: 30
            periodSeconds: 5

          readinessProbe:
            httpGet:
              path: /ready
              port: http
            periodSeconds: 5

          livenessProbe:
            httpGet:
              path: /health
              port: http
            periodSeconds: 10

This assumes the application listens on port 3000 and exposes the configured health endpoints.

EXAMPLE 2 – CLUSTERIP SERVICE

apiVersion: v1
kind: Service
metadata:
  name: frontend
  namespace: production

spec:
  type: ClusterIP

  selector:
    app: frontend

  ports:
    - name: http
      port: 80
      targetPort: http
      protocol: TCP

EXAMPLE 3 – INGRESS ROUTING

apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: frontend-ingress
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

This assumes a compatible NGINX Ingress controller is installed and configured. DNS for app.example.com must resolve to the relevant ingress endpoint. TLS configuration should be added for HTTPS.

EXAMPLE 4 – NODE SELECTOR

apiVersion: v1
kind: Pod
metadata:
  name: workload
  namespace: production

spec:
  nodeSelector:
    workload-type: application

  containers:
    - name: app
      image: nginx:1.27

The selected Node must have the workload-type=application label. Node selectors constrain scheduling; they do not create or label Nodes.

EXAMPLE 5 – NETWORK POLICY

apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: frontend-ingress
  namespace: production

spec:
  podSelector:
    matchLabels:
      app: frontend

  policyTypes:
    - Ingress

  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: production
          podSelector:
            matchLabels:
              app: gateway
      ports:
        - protocol: TCP
          port: 3000

NetworkPolicy enforcement depends on the installed CNI implementation. Validate policy behavior before applying restrictive rules in production.

EXAMPLE 6 – ARCHITECTURE LAYERS

CONTROL PLANE
- API Server
- etcd
- Scheduler
- Controller Manager
- Cloud Controller Manager, where applicable

WORKER NODE
- Kubelet
- Container Runtime
- kube-proxy or replacement dataplane
- CNI
- Application Pods

CLUSTER SERVICES
- CoreDNS
- Service discovery
- Service routing
- Ingress / Gateway
- Storage integrations
- Metrics and logging

PRODUCTION BEST PRACTICES:

- Maintain multiple control-plane instances where required by the cluster architecture.
- Protect and regularly back up etcd.
- Use RBAC and secure API Server access.
- Define resource requests and appropriate limits.
- Configure probes based on application behavior.
- Spread replicas across suitable nodes and failure domains.
- Use PodDisruptionBudgets for availability-sensitive workloads.
- Use NetworkPolicies where supported.
- Monitor node pressure, scheduling failures and Pod restarts.
- Validate storage topology and backup/restore procedures.
- Upgrade Kubernetes and node components through a tested compatibility plan.
- Keep workload images trusted, scanned and versioned.`,

      problems: [
        {
          issue: "Pods remain Pending because no suitable Node is available.",
          solution: "Inspect kubectl describe pod output and scheduling events. Check resource requests, node capacity, node selectors, affinity, taints, tolerations, topology constraints and PersistentVolume availability."
        },
        {
          issue: "API Server requests fail or cluster operations time out.",
          solution: "Verify API endpoint connectivity, DNS, certificates, authentication, authorization and API Server readiness. In self-managed clusters inspect control-plane process health and etcd connectivity. For managed clusters inspect provider health and service events."
        },
        {
          issue: "Pods are running but cannot communicate with each other.",
          solution: "Check Pod IPs, CNI health, routing, NetworkPolicies, DNS and firewall rules. Validate whether the CNI supports the expected network policy and address-management behavior."
        },
        {
          issue: "CoreDNS is unhealthy or service names do not resolve.",
          solution: "Inspect CoreDNS Pods, logs, ConfigMap, Service endpoints and upstream DNS connectivity. Test resolution from a temporary Pod and verify that the Pod DNS policy is correct."
        },
        {
          issue: "Service has no endpoints.",
          solution: "Compare Service selectors with Pod labels. Check whether matching Pods are Ready, inspect EndpointSlices and verify the target port. A Service selector that matches no eligible Pods cannot route normal traffic."
        },
        {
          issue: "Ingress returns 404 or 502.",
          solution: "Inspect Ingress class, controller logs, host/path rules, backend Service, Service port and EndpointSlices. Confirm DNS points to the correct ingress endpoint and the backend application is healthy."
        },
        {
          issue: "Worker Node enters NotReady.",
          solution: "Inspect Node conditions and events. Check kubelet, container runtime, disk pressure, memory pressure, network connectivity, certificates and cloud-provider integration. Use the cluster distribution's supported node-recovery process."
        },
        {
          issue: "Pods are repeatedly terminated with OOMKilled.",
          solution: "Inspect Pod termination status, memory requests and limits, and node memory pressure. Profile the application, identify memory leaks or workload spikes and adjust capacity based on measurements."
        },
        {
          issue: "PersistentVolumeClaim remains Pending.",
          solution: "Inspect the PVC events, StorageClass provisioner, access mode, capacity request, CSI controller and topology requirements. Verify that the storage backend can provision the requested volume."
        },
        {
          issue: "Cluster becomes unstable after a Kubernetes upgrade.",
          solution: "Check version-skew compatibility, removed API versions, CNI/CSI compatibility, node readiness and admission policies. Use staged upgrades, backups and a documented recovery plan instead of upgrading all components without validation."
        }
      ]
    },

    {
      heading: "3. Monitoring & Alerting Architecture – Prometheus, Grafana and Production Observability",
      explanation: `OVERVIEW:

Monitoring and observability provide information about the health, performance and behavior of applications and infrastructure.

A production monitoring architecture should help teams answer:

- Is the application available?
- How many requests are being processed?
- Are users experiencing high latency?
- Are requests failing?
- Is the system running out of CPU, memory or storage?
- Which dependency is causing the problem?
- Did the problem begin after a deployment?
- Is the service meeting its reliability objectives?

THE THREE MAIN TELEMETRY SIGNALS:

Metrics:
Numerical measurements over time, such as request rate, CPU usage, memory consumption, latency and error count.

Logs:
Timestamped records of application or infrastructure events. Logs provide details about what happened and the relevant context.

Traces:
Records of a request's path through multiple services. Distributed tracing helps identify where latency or failures occur in a distributed application.

PROMETHEUS ARCHITECTURE:

1. Application Instrumentation:
Applications expose metrics through an HTTP endpoint, commonly /metrics. Client libraries can record counters, gauges, histograms and summaries.

2. Exporters:
Exporters expose metrics from systems that do not natively provide Prometheus-format metrics. Examples include Node Exporter for Linux host metrics and suitable database exporters.

3. Service Discovery:
Prometheus can discover scrape targets through static configuration, Kubernetes service discovery or other supported discovery mechanisms.

4. Scrape Engine:
Prometheus periodically sends HTTP requests to configured targets and retrieves metric samples.

5. Time-Series Database:
Prometheus stores timestamped metric samples in its local TSDB. Data is organized as time series identified by metric names and label sets.

6. PromQL:
Prometheus Query Language retrieves and aggregates time-series data. Engineers use it for dashboards, alerts and investigation.

7. Recording Rules:
Recording rules precompute frequently used expressions and store their results as new time series.

8. Alerting Rules:
Prometheus evaluates alert expressions at configured intervals. Matching alerts are sent to Alertmanager.

ALERTMANAGER ARCHITECTURE:

Alertmanager receives alerts and groups related events, deduplicates repeated notifications, applies inhibition rules and routes notifications to configured receivers.

Receivers may include email, chat systems, incident-management platforms or webhooks.

A useful alert should identify:
- What is failing.
- Which service or environment is affected.
- How severe the impact is.
- When the issue began.
- Which dashboard or runbook can help.
- What action the responder should take.

GRAFANA ARCHITECTURE:

Grafana connects to data sources such as Prometheus and log or trace platforms. Dashboards visualize service health and operational behavior.

Dashboards should be organized around services, environments, infrastructure components and service-level indicators.

KUBERNETES MONITORING:

A Kubernetes monitoring architecture may collect:
- Node metrics through Node Exporter.
- Cluster object metrics through kube-state-metrics.
- Application metrics through instrumented workloads.
- Container resource metrics through the configured node metrics pipeline.
- Control-plane metrics where the cluster exposes them.

Prometheus Operator installations commonly use ServiceMonitor and PodMonitor custom resources to define scrape targets. These resources require the relevant CRDs and a correctly configured Prometheus instance.

LOGGING ARCHITECTURE:

Application containers write logs to stdout and stderr. A node-level log collector or agent gathers container logs and forwards them to a central logging backend.

A typical architecture can use Fluent Bit or another collector, OpenSearch or Elasticsearch for storage and search, and Grafana or a dedicated UI for visualization.

Logs should include structured fields such as timestamp, service, environment, severity, request ID and trace ID. Avoid writing secrets or sensitive user data into logs.

DISTRIBUTED TRACING:

OpenTelemetry SDKs instrument applications and produce traces. Collectors receive telemetry and export it to a tracing backend.

Trace context propagation connects spans across service boundaries. This helps engineers identify which service or dependency contributes to end-to-end latency.

PRODUCTION OBSERVABILITY FLOW:

Application / Infrastructure
       |
       +------> Metrics Endpoint
       |              |
       |              v
       |          Prometheus
       |              |
       |              +----> PromQL
       |              |
       |              +----> Alert Rules
       |                        |
       |                        v
       |                   Alertmanager
       |                        |
       |                        v
       |                  Notification Team
       |
       +------> stdout / stderr
       |              |
       |              v
       |         Log Collector
       |              |
       |              v
       |        Central Log Store
       |
       +------> OpenTelemetry
                      |
                      v
                Trace Collector
                      |
                      v
                 Trace Backend

Grafana queries configured data sources to provide dashboards and investigation views.

GOLDEN SIGNALS:

1. Latency – Time taken to serve requests.
2. Traffic – Amount of work handled by the system.
3. Errors – Failed requests or operations.
4. Saturation – How close a resource is to its practical capacity.

SLI, SLO AND SLA:

SLI:
A Service Level Indicator is a measured reliability signal, such as the percentage of successful requests.

SLO:
A Service Level Objective is the target value for an SLI over a defined period.

SLA:
A Service Level Agreement is a formal commitment with defined terms and consequences.

Example:
A service may define an SLO of 99.9% successful requests over a rolling 30-day window. The exact measurement, exclusions and calculation must be clearly specified.

ALERT DESIGN:

Avoid alerting on every small fluctuation. Use meaningful thresholds, sustained conditions, severity levels and runbook links. Alert on user impact and actionable failure conditions rather than creating excessive noise.

MONITORING RETENTION AND SCALING:

Prometheus local storage is not automatically a long-term, highly available global metrics system. Retention, storage sizing, backups, remote-write architecture and high availability should be planned based on workload and operational needs.

SECURITY:

Restrict access to Prometheus, Grafana and exporters. Protect dashboards and query interfaces, use authentication and TLS where appropriate, and prevent metrics labels from containing secrets or high-cardinality user identifiers.`,

      steps: [
        "Step 1 – Identify the critical services and define what needs to be measured. Start with request rate, latency, error rate, resource usage and availability.",
        "Step 2 – Instrument the application using a Prometheus client library or OpenTelemetry SDK. Expose metrics through a protected or appropriately network-restricted endpoint.",
        "Step 3 – Install the required exporters for infrastructure components. For Linux hosts, Node Exporter can expose CPU, memory, filesystem and network metrics.",
        "Step 4 – Configure Prometheus scrape targets or Kubernetes service discovery. Verify that each expected target appears as UP in the Prometheus Targets page.",
        "Step 5 – Create useful PromQL queries and validate their results. Use recording rules for expressions that are expensive or reused frequently.",
        "Step 6 – Define alert rules based on sustained conditions and service impact. Include useful labels, annotations, descriptions and runbook links.",
        "Step 7 – Configure Alertmanager routes, grouping, inhibition and notification receivers. Test notifications and ensure alerts reach the correct on-call team.",
        "Step 8 – Configure Grafana with Prometheus as a data source. Create dashboards for application health, Kubernetes workloads, node capacity and critical dependencies.",
        "Step 9 – Deploy a log collector such as Fluent Bit or another supported agent. Forward structured application and infrastructure logs to the central logging platform.",
        "Step 10 – Instrument distributed applications with OpenTelemetry where tracing is required. Configure trace propagation and an appropriate trace backend.",
        "Step 11 – Define SLIs and SLOs for important services. Monitor error-budget consumption and use the results to prioritize reliability work.",
        "Step 12 – Test monitoring by generating controlled failures in a non-production environment. Verify metric collection, dashboard visibility, alert evaluation and notification delivery.",
        "Step 13 – Document incident runbooks. Include service ownership, dashboards, logs, dependency maps, safe mitigation commands and escalation details.",
        "Step 14 – Review alert quality, retention, storage consumption, scrape performance and dashboard usefulness regularly."
      ],

      commands: `PROMETHEUS – TARGET HEALTH

# Open the Prometheus UI at the configured address.
# Navigate to Status > Targets.
# Check that expected scrape targets are UP.

PROMQL – BASIC QUERIES

up
# Target availability

process_cpu_seconds_total
# Process CPU time counter, if exposed

process_resident_memory_bytes
# Process resident memory, if exposed

node_memory_MemAvailable_bytes
# Available host memory, if Node Exporter is configured

rate(http_requests_total[5m])
# Per-second request rate over five minutes

sum(rate(http_requests_total[5m]))
# Aggregate request rate across matching time series

sum(rate(http_requests_total{status=~"5.."}[5m]))
# Server error rate for matching HTTP metrics

100 *
sum(rate(http_requests_total{status=~"5.."}[5m]))
/
sum(rate(http_requests_total[5m]))
# Percentage of server-error requests.
# Protect against division by zero in production alert expressions.

KUBERNETES MONITORING

kubectl get pods -n monitoring

kubectl get services -n monitoring

kubectl get servicemonitors -A

kubectl get podmonitors -A

kubectl get events -A --sort-by=.metadata.creationTimestamp

kubectl top nodes

kubectl top pods -A

# Metrics Server is required for kubectl top.
# ServiceMonitor and PodMonitor require their respective CRDs.

NODE EXPORTER

# Verify that Node Exporter is listening on its configured port.
curl http://NODE_EXPORTER_HOST:9100/metrics

# Restrict access to the exporter endpoint in production.

APPLICATION METRICS

curl http://APPLICATION_HOST:PORT/metrics

# Inspect whether expected application metric names are present.

ALERTMANAGER

# Open the Alertmanager UI and inspect active alerts.
# Verify routing configuration and receiver delivery.
# Test changes in a non-production environment.

GRAFANA

# Open Grafana and inspect:
# 1. Data sources
# 2. Dashboard queries
# 3. Time range and timezone
# 4. Alert rules
# 5. Dashboard variables

LOG INVESTIGATION

kubectl logs POD_NAME -n NAMESPACE

kubectl logs POD_NAME -n NAMESPACE --previous

kubectl logs -f deployment/myapp -n production

# Use the central logging interface for historical and cross-service searches.

IMPORTANT:
Replace hostnames, ports, metric names, namespaces and service labels with actual values. Not every application exposes the example metrics. Confirm metric names and label dimensions before writing production queries.`,

      config: `EXAMPLE 1 – PROMETHEUS SCRAPE CONFIGURATION

global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets:
          - "localhost:9090"

  - job_name: node-exporter
    static_configs:
      - targets:
          - "node-exporter:9100"

  - job_name: application
    metrics_path: /metrics
    static_configs:
      - targets:
          - "myapp:3000"

This example uses static targets. In Kubernetes, service discovery or Prometheus Operator resources are often more suitable than manually maintaining Pod IP addresses.

EXAMPLE 2 – PROMETHEUS ALERT RULES

groups:
  - name: application-alerts
    rules:
      - alert: ApplicationTargetDown
        expr: up{job="application"} == 0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Application metrics target is down"
          description: "The application target has been unavailable for more than two minutes."

      - alert: HighServerErrorRate
        expr: |
          (
            sum(rate(http_requests_total{status=~"5.."}[5m]))
            /
            clamp_min(sum(rate(http_requests_total[5m])), 0.001)
          ) > 0.05
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High server error rate"
          description: "More than five percent of requests are returning server errors."

These rules assume the application exports http_requests_total with a status label. Validate the metric and label names before applying them. Thresholds should be aligned with service SLOs and traffic patterns.

EXAMPLE 3 – ALERTMANAGER ROUTING

global:
  resolve_timeout: 5m

route:
  receiver: default-team

  group_by:
    - alertname
    - service
    - environment

  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h

  routes:
    - matchers:
        - severity="critical"
      receiver: critical-team
      continue: false

receivers:
  - name: default-team
    # Configure a supported receiver such as email or webhook.

  - name: critical-team
    # Configure the critical on-call notification destination.

This is a routing skeleton. Add the appropriate receiver integration, credentials, TLS and notification settings for your environment.

EXAMPLE 4 – KUBERNETES SERVICE MONITOR

apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: myapp
  namespace: monitoring
  labels:
    release: prometheus

spec:
  namespaceSelector:
    matchNames:
      - production

  selector:
    matchLabels:
      app: myapp

  endpoints:
    - port: metrics
      path: /metrics
      interval: 30s

This requires Prometheus Operator CRDs and a Prometheus instance whose serviceMonitorSelector matches the ServiceMonitor labels. The selected Service must expose a named port called metrics.

EXAMPLE 5 – GRAFANA DASHBOARD DESIGN

Dashboard: Application Production Overview

ROW 1 – SERVICE HEALTH
- Availability
- Request rate
- Error percentage
- P95 request latency

ROW 2 – APPLICATION PERFORMANCE
- Requests by endpoint
- HTTP response status
- Dependency latency
- Active application connections

ROW 3 – KUBERNETES
- Pod readiness
- Container restarts
- CPU utilization
- Memory utilization
- Node capacity

ROW 4 – INCIDENT INVESTIGATION
- Deployment timeline
- Recent alerts
- Error logs
- Trace links

EXAMPLE 6 – OBSERVABILITY ARCHITECTURE

APPLICATIONS
    |
    +------> Prometheus Metrics
    |               |
    |               v
    |           Prometheus TSDB
    |               |
    |               +----> PromQL
    |               |
    |               +----> Alert Rules
    |                          |
    |                          v
    |                     Alertmanager
    |                          |
    |                          v
    |                    On-Call Team
    |
    +------> Application Logs
    |               |
    |               v
    |          Log Collector
    |               |
    |               v
    |          Log Backend
    |
    +------> OpenTelemetry Traces
                    |
                    v
              OTel Collector
                    |
                    v
               Trace Backend

Grafana connects to the configured metrics, log and trace data sources.

PRODUCTION BEST PRACTICES:

- Monitor user-visible service health, not just infrastructure CPU.
- Define SLIs and SLOs before creating large alert collections.
- Keep alerts actionable and avoid duplicate notifications.
- Use consistent labels such as service, environment and region.
- Avoid high-cardinality metric labels such as raw user IDs and request IDs.
- Do not put secrets or sensitive personal information in metric labels or logs.
- Configure authentication and network restrictions for monitoring interfaces.
- Define scrape intervals and retention based on actual requirements.
- Use recording rules for expensive and frequently reused queries.
- Test Alertmanager notification routes.
- Keep dashboards linked to runbooks and service ownership.
- Use trace IDs to correlate logs and traces where possible.
- Monitor Prometheus itself, including ingestion, storage, scrape failures and rule evaluation.
- Test monitoring and alerting with controlled failures.
- Maintain a documented incident response and escalation process.`,

      problems: [
        {
          issue: "Prometheus target appears DOWN.",
          solution: "Inspect the target's scrape error. Verify DNS, network reachability, firewall rules, target port, metrics path, TLS configuration and authentication. Confirm the application or exporter is listening and returning valid Prometheus metrics."
        },
        {
          issue: "Prometheus dashboard shows no data.",
          solution: "Check whether the target is UP, the metric exists, the selected time range is correct and the query labels match actual data. Verify scrape configuration and rule evaluation before changing Grafana panels."
        },
        {
          issue: "Prometheus query returns an empty result.",
          solution: "Search for the metric name without filters first. Inspect available labels and sample timestamps. Check whether the application emits the metric and whether the scrape interval and query time range include data."
        },
        {
          issue: "Prometheus storage grows too quickly.",
          solution: "Inspect time-series cardinality and retention. Remove unnecessary labels, avoid unbounded values such as request IDs, review scrape intervals and configure retention and storage capacity based on actual usage."
        },
        {
          issue: "Alertmanager does not send notifications.",
          solution: "Inspect active alerts, Alertmanager routes, receiver configuration, grouping and inhibition rules. Verify SMTP or webhook connectivity, credentials, TLS settings and notification delivery logs."
        },
        {
          issue: "Too many alerts are generated for one incident.",
          solution: "Use grouping, deduplication, inhibition and carefully designed alert conditions. Consolidate alerts that represent the same underlying failure and alert on meaningful service impact."
        },
        {
          issue: "Grafana dashboard shows No Data.",
          solution: "Verify the data source connection, Prometheus URL, query syntax, dashboard time range, variables and label filters. Test the query directly in Explore before modifying the dashboard."
        },
        {
          issue: "Kubernetes ServiceMonitor is ignored.",
          solution: "Confirm Prometheus Operator CRDs are installed, the ServiceMonitor selects the correct Service labels and namespace, the Prometheus serviceMonitorSelector matches the resource labels, and the named Service port exists."
        },
        {
          issue: "Metrics show high CPU but application performance appears normal.",
          solution: "Check whether CPU is measured as a rate, utilization percentage or accumulated CPU time. Compare CPU usage with requests, limits, node capacity, traffic and application latency before declaring a performance incident."
        },
        {
          issue: "Monitoring reports the application is healthy but users cannot access it.",
          solution: "A metrics endpoint may be healthy while the user-facing path is broken. Add synthetic checks from outside the cluster, verify DNS, TLS, Ingress, load balancer, Service endpoints and real application transactions."
        },
        {
          issue: "Logs cannot be correlated across multiple microservices.",
          solution: "Use structured logs with consistent timestamps, service names, environment and trace IDs. Configure trace-context propagation and ensure the log collector preserves correlation fields."
        },
        {
          issue: "Alert triggers only after users have already reported the outage.",
          solution: "Review scrape intervals, alert evaluation periods, threshold selection and monitoring coverage. Add external availability checks and user-facing SLI alerts. Test detection time through controlled failure simulations."
        }
      ]
    }
  ]
};

export default architectureFlowData;
